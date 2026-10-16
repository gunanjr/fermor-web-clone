'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
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

/* ─── Log-scale salary slider helpers ─────────────────────────── */
const SAL_LOG_MIN  = 100_000;
const SAL_MAX      = 50_000_000;
const SAL_LOG_BASE = Math.log(SAL_MAX / SAL_LOG_MIN);

function salaryToPos(v: number): number {
  if (v <= 0) return 0;
  if (v >= SAL_MAX) return 1000;
  if (v <= SAL_LOG_MIN) return Math.round((v / SAL_LOG_MIN) * 50);
  return Math.round(50 + 950 * (Math.log(v / SAL_LOG_MIN) / SAL_LOG_BASE));
}

function posToSalary(pos: number): number {
  if (pos <= 0) return 0;
  if (pos >= 1000) return SAL_MAX;
  if (pos <= 50) return Math.round(((pos / 50) * SAL_LOG_MIN) / 10_000) * 10_000;
  const raw = SAL_LOG_MIN * Math.exp(((pos - 50) / 950) * SAL_LOG_BASE);
  if (raw < 2_000_000)  return Math.round(raw / 25_000) * 25_000;
  if (raw < 10_000_000) return Math.round(raw / 100_000) * 100_000;
  return Math.round(raw / 500_000) * 500_000;
}

/* ─── Slabs & Tax computation ────────────────────────────────── */
function calcTaxOld(
  grossSalary: number, otherIncome: number, ageGroup: string, fy: string,
  d80C: number, d80D: number, d80CCD1B: number,
  basicSalary: number, hraReceived: number, rentPaid: number, cityType: string, homeLoanInt: number
) {
  // HRA exemption calculation
  let hraExemption = 0;
  if (hraReceived > 0 && rentPaid > 0 && basicSalary > 0) {
    const limit1 = hraReceived;
    const limit2 = cityType === 'metro' ? basicSalary * 0.50 : basicSalary * 0.40;
    const limit3 = Math.max(0, rentPaid - basicSalary * 0.10);
    hraExemption = Math.min(limit1, limit2, limit3);
  }

  // Net Salary & Gross Income
  const netSalary = Math.max(0, grossSalary - hraExemption);
  const totalIncome = netSalary + otherIncome;

  // Deductions
  const stdDeduction = grossSalary > 0 ? 50000 : 0;
  const ded80C = Math.min(d80C, 150000);
  const ded80CCD1B = Math.min(d80CCD1B, 50000);
  
  // Section 80D capped at 100,000 maximum (Rs 50k self if senior + Rs 50k parents if senior)
  const ded80D = Math.min(d80D, 100000);
  const dedHomeLoan = Math.min(homeLoanInt, 200000);

  const totalDeductions = stdDeduction + ded80C + ded80CCD1B + ded80D + dedHomeLoan;
  const taxable = Math.max(0, totalIncome - totalDeductions);

  let slabTax = 0;
  const hits: { label: string; rate: number; tax: number }[] = [];

  // Age-based Slabs
  if (ageGroup === 'supersenior') {
    // 0-5L: 0%, 5-10L: 20%, above 10L: 30%
    if (taxable > 500000) {
      const slice = Math.min(taxable, 1000000) - 500000;
      const t = slice * 0.20;
      if (t > 0) hits.push({ label: 'Rs 5L - Rs 10L', rate: 0.20, tax: Math.round(t) });
      slabTax += t;
    }
    if (taxable > 1000000) {
      const slice = taxable - 1000000;
      const t = slice * 0.30;
      if (t > 0) hits.push({ label: 'Above Rs 10L', rate: 0.30, tax: Math.round(t) });
      slabTax += t;
    }
  } else if (ageGroup === 'senior') {
    // 0-3L: 0%, 3-5L: 5%, 5-10L: 20%, above 10L: 30%
    if (taxable > 300000) {
      const slice = Math.min(taxable, 500000) - 300000;
      const t = slice * 0.05;
      if (t > 0) hits.push({ label: 'Rs 3L - Rs 5L', rate: 0.05, tax: Math.round(t) });
      slabTax += t;
    }
    if (taxable > 500000) {
      const slice = Math.min(taxable, 1000000) - 500000;
      const t = slice * 0.20;
      if (t > 0) hits.push({ label: 'Rs 5L - Rs 10L', rate: 0.20, tax: Math.round(t) });
      slabTax += t;
    }
    if (taxable > 1000000) {
      const slice = taxable - 1000000;
      const t = slice * 0.30;
      if (t > 0) hits.push({ label: 'Above Rs 10L', rate: 0.30, tax: Math.round(t) });
      slabTax += t;
    }
  } else {
    // below60: 0-2.5L: 0%, 2.5-5L: 5%, 5-10L: 20%, above 10L: 30%
    if (taxable > 250000) {
      const slice = Math.min(taxable, 500000) - 250000;
      const t = slice * 0.05;
      if (t > 0) hits.push({ label: 'Rs 2.5L - Rs 5L', rate: 0.05, tax: Math.round(t) });
      slabTax += t;
    }
    if (taxable > 500000) {
      const slice = Math.min(taxable, 1000000) - 500000;
      const t = slice * 0.20;
      if (t > 0) hits.push({ label: 'Rs 5L - Rs 10L', rate: 0.20, tax: Math.round(t) });
      slabTax += t;
    }
    if (taxable > 1000000) {
      const slice = taxable - 1000000;
      const t = slice * 0.30;
      if (t > 0) hits.push({ label: 'Above Rs 10L', rate: 0.30, tax: Math.round(t) });
      slabTax += t;
    }
  }

  // Section 87A Rebate u/s 87A for Old Regime
  let rebate = 0;
  if (taxable <= 500000) {
    rebate = Math.min(slabTax, 12500);
  }
  const taxAfterRebate = Math.max(0, slabTax - rebate);

  // Surcharge (Old regime goes up to 37% above Rs 5 crore)
  let surcharge = 0;
  if (taxable > 5000000 && taxable <= 10000000) surcharge = taxAfterRebate * 0.10;
  else if (taxable > 10000000 && taxable <= 20000000) surcharge = taxAfterRebate * 0.15;
  else if (taxable > 20000000 && taxable <= 50000000) surcharge = taxAfterRebate * 0.25;
  else if (taxable > 50000000) surcharge = taxAfterRebate * 0.37;

  const cess = (taxAfterRebate + surcharge) * 0.04;
  const totalTax = Math.round(taxAfterRebate + surcharge + cess);
  const monthlyTDS = Math.round(totalTax / 12);
  const takeHome = totalIncome - totalTax;
  const effectiveRate = totalIncome > 0 ? (totalTax / totalIncome) * 100 : 0;

  const deductionBreakdown = [
    { label: 'Standard Deduction', amount: stdDeduction },
    { label: 'Section 80C', amount: ded80C },
    { label: 'Section 80D', amount: ded80D },
    { label: 'NPS 80CCD(1B)', amount: ded80CCD1B },
    { label: 'Home Loan Interest 24(b)', amount: dedHomeLoan },
    { label: 'HRA Exemption', amount: hraExemption },
  ].filter(d => d.amount > 0);

  return {
    grossIncome: totalIncome,
    stdDeduction,
    totalDeductions,
    taxableIncome: taxable,
    slabTax: Math.round(slabTax),
    rebate: Math.round(rebate),
    surcharge: Math.round(surcharge),
    cess: Math.round(cess),
    totalTax,
    monthlyTDS,
    takeHome,
    effectiveRate,
    slabHits: hits,
    deductionBreakdown,
    hraExemption,
  };
}

/* ─── Slider ──────────────────────────────────────────────────── */
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

/* ─── Log-scale salary slider ─────────────────────────────────── */
function SalarySlider({ label, value, onChange, compact, id }: {
  label: string; value: number; onChange: (v: number) => void; compact?: boolean; id?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pos = salaryToPos(value);
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtC = (n: number) => formatCurrency(convertCurrency(n));
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(SAL_MAX, Math.max(0, n)));
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
            aria-label={`${label}: ${fmtC(value)}. Click to edit.`}
            style={{ fontSize: compact ? 13 : 14, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: compact ? '5px 12px' : '6px 14px', cursor: 'pointer', fontFamily: INTER, minWidth: compact ? 88 : 105, textAlign: 'center', transition: 'border-color 0.15s' }}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}>
            {fmtC(value)}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pos / 10}%, ${C.border} ${pos / 10}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pos / 10}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 18, height: 18, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 1px 6px rgba(16,18,20,0.18)', pointerEvents: 'none', zIndex: 1 }} />
        <input type="range" min={0} max={1000} step={1} value={pos}
          onChange={e => onChange(posToSalary(+e.target.value))}
          aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={SAL_MAX}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">Rs 0</span>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">Rs 10L</span>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">Rs 1Cr</span>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">Rs 5Cr</span>
      </div>
    </div>
  );
}

/* ─── Age toggle ──────────────────────────────────────────────── */
const AGE_OPTIONS = [
  { value: 'below60', label: 'Below 60' },
  { value: 'senior', label: '60 - 80' },
  { value: 'superSenior', label: '80+' },
] as const;

function AgeToggle({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <p style={{ fontSize: 14, color: C.ink2, fontWeight: 400, margin: '0 0 12px' }}>Age Category</p>
      <div role="radiogroup" aria-label="Age category" style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
        {AGE_OPTIONS.map(opt => (
          <button key={opt.value}
            role="radio" aria-checked={value === opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              flex: 1, padding: '10px 6px', fontFamily: INTER, fontSize: 13, cursor: 'pointer',
              border: 'none', background: value === opt.value ? C.white : 'transparent',
              color: value === opt.value ? C.ink : C.ink3,
              fontWeight: value === opt.value ? 600 : 400,
              transition: 'all 0.12s',
            }}>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Metro toggle ────────────────────────────────────────────── */
function MetroToggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <p style={{ fontSize: 14, color: C.ink2, fontWeight: 400, margin: '0 0 12px' }}>City Type</p>
      <div role="radiogroup" aria-label="Metro or non-metro city" style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
        {[{ v: false, l: 'Non-Metro' }, { v: true, l: 'Metro' }].map(opt => (
          <button key={opt.l}
            role="radio" aria-checked={value === opt.v}
            onClick={() => onChange(opt.v)}
            style={{
              flex: 1, padding: '10px 6px', fontFamily: INTER, fontSize: 13, cursor: 'pointer',
              border: 'none', background: value === opt.v ? C.white : 'transparent',
              color: value === opt.v ? C.ink : C.ink3,
              fontWeight: value === opt.v ? 600 : 400,
              transition: 'all 0.12s',
            }}>
            {opt.l}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Donut Chart ─────────────────────────────────────────────── */
function DonutChart({ tax, takeHome }: { tax: number; takeHome: number }) {
  const total = tax + takeHome;
  if (total === 0) return null;
  const taxPct = Math.round((tax / total) * 100);
  const takePct = 100 - taxPct;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const tArc = (tax / total) * circ;
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Tax ${taxPct}% of gross income, take-home ${takePct}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${tArc} ${circ - tArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Tax</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{taxPct}%</text>
    </svg>
  );
}

/* ─── Sidebar list ────────────────────────────────────────────── */
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
  { href: '/calculators/income-tax-calculator',            label: 'Income Tax Calculator' },
  { href: '/calculators/old-vs-new-tax-regime-calculator', label: 'Old vs New Tax Regime' },
  { href: '/calculators/in-hand-salary-calculator',        label: 'In-Hand Salary Calculator' },
  { href: '/calculators/hra-calculator',                   label: 'HRA Calculator' },
  { href: '/calculators/gratuity-calculator',              label: 'Gratuity Calculator' },
  { href: '/calculators/tax-saving-calculator',            label: 'Tax Saving Calculator' },
  { href: '/calculators/home-loan-calculator',             label: 'Home Loan Calculator' },
];
const MORE = [
  { href: '/calculators/emi-calculator',                   label: 'EMI Calculator' },
  { href: '/calculators/sip-calculator',                   label: 'SIP Calculator' },
  { href: '/calculators/gst-calculator',                   label: 'GST Calculator' },
  { href: '/calculators/ppf-calculator',                   label: 'PPF Calculator' },
  { href: '/calculators/compound-interest-calculator',     label: 'Compound Interest Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
const FAQS = [
  { q: 'What is the old tax regime in India?', a: 'The old tax regime is the traditional income tax system under the Income Tax Act that allows taxpayers to claim various deductions and exemptions in exchange for higher slab rates. It includes deductions under Section 80C (up to Rs 1.5 lakh), 80D (health insurance), HRA exemption under Section 10(13A), home loan interest under Section 24(b), NPS under 80CCD(1B), and several other exemptions that reduce taxable income.' },
  { q: 'What are the old tax regime slabs for FY 2026-27?', a: 'The old tax regime slabs for FY 2026-27 depend on age. For individuals below 60: up to Rs 2.5 lakh (nil), Rs 2.5-5 lakh (5%), Rs 5-10 lakh (20%), above Rs 10 lakh (30%). For senior citizens (60-80): up to Rs 3 lakh (nil), Rs 3-5 lakh (5%), Rs 5-10 lakh (20%), above Rs 10 lakh (30%). For super senior citizens (80+): up to Rs 5 lakh (nil), Rs 5-10 lakh (20%), above Rs 10 lakh (30%).' },
  { q: 'What deductions are available under the old tax regime?', a: 'The old tax regime offers a wide range of deductions: Section 80C up to Rs 1.5 lakh (PPF, ELSS, EPF, life insurance, NSC, tax-saving FDs, tuition fees, home loan principal), 80D for health insurance (up to Rs 25,000 for self/family, Rs 50,000 for senior citizens), 80CCD(1B) for NPS (up to Rs 50,000), Section 24(b) for home loan interest (up to Rs 2 lakh), HRA exemption, standard deduction of Rs 50,000, and others like 80E (education loan), 80G (donations), and 80TTA (savings account interest).' },
  { q: 'How is tax calculated under the old tax regime?', a: 'Tax under the old regime is calculated by computing gross total income from salary, business, capital gains, house property, and other sources, subtracting exemptions like HRA and standard deduction of Rs 50,000, subtracting Chapter VI-A deductions (80C, 80D, 80CCD(1B), 80E, 80G, etc.), subtracting home loan interest under Section 24(b) up to Rs 2 lakh, applying the applicable slab rates based on age, applying Section 87A rebate if taxable income is Rs 5 lakh or less, adding surcharge if income exceeds Rs 50 lakh, and adding 4% health and education cess.' },
  { q: 'Is the old tax regime better for salaried employees?', a: 'The old tax regime is generally better for salaried employees who have significant deductions and exemptions. If your total deductions (80C, 80D, HRA, home loan interest, NPS) exceed approximately Rs 3-4 lakh, the old regime typically results in lower tax. It is especially beneficial for those paying HRA in metro cities, paying home loan interest, or making full use of Section 80C and 80D limits.' },
  { q: 'Can I claim HRA exemption under the old tax regime?', a: 'Yes, HRA exemption under Section 10(13A) is available under the old tax regime. The exemption is the minimum of three amounts: actual HRA received from employer, 50% of basic salary for metro cities (40% for non-metros), and actual rent paid minus 10% of basic salary. This can substantially reduce taxable income for salaried employees living in rented accommodation.' },
  { q: 'What is Section 87A rebate under the old tax regime?', a: 'Under the old tax regime, Section 87A provides a rebate of up to Rs 12,500 if the total taxable income does not exceed Rs 5 lakh. The rebate equals the lower of the actual tax payable or Rs 12,500. This effectively makes income up to Rs 5 lakh tax-free under the old regime. Note that the rebate limit is significantly lower than the Rs 60,000 rebate available under the new regime for incomes up to Rs 12 lakh.' },
  { q: 'What is the maximum 80C deduction under the old regime?', a: 'The maximum deduction under Section 80C is Rs 1.5 lakh per financial year. This covers investments in PPF, ELSS mutual funds, EPF, tax-saving fixed deposits (5-year), NSC, life insurance premiums, Sukanya Samriddhi Yojana, tuition fees for up to two children, and principal repayment of home loan. An additional Rs 50,000 deduction is available under Section 80CCD(1B) for NPS contributions, over and above the Rs 1.5 lakh 80C limit.' },
  { q: 'Can I switch from the old regime to the new regime?', a: 'Yes, salaried individuals can switch between the old and new tax regimes each financial year. The choice is made at the time of filing the ITR. However, if you have business or professional income, the choice is a one-time decision and you cannot switch back once you opt for the new regime, unless you cease to have business income.' },
  { q: 'What is the standard deduction under the old tax regime?', a: 'The standard deduction under the old tax regime is Rs 50,000 for salaried employees and pensioners. This replaces the earlier transport allowance (Rs 19,200) and medical reimbursement (Rs 15,000). The standard deduction under the new regime is higher at Rs 75,000 for FY 2026-27.' },
  { q: 'How does home loan tax benefit work under the old regime?', a: 'Under the old tax regime, home loan borrowers get two tax benefits: principal repayment up to Rs 1.5 lakh is deductible under Section 80C, and interest payment up to Rs 2 lakh is deductible under Section 24(b) for a self-occupied property. For let-out properties, the entire interest is deductible without any upper limit, though it is subject to the house property income computation rules.' },
  { q: 'What is the maximum income to pay zero tax under the old regime?', a: 'Under the old regime, taxable income up to Rs 5 lakh results in zero tax liability after the Section 87A rebate of Rs 12,500. For salaried employees with the standard deduction of Rs 50,000 and some 80C investments, the actual salary that results in zero tax can be higher. For example, a salaried individual earning Rs 7.5 lakh with Rs 1.5 lakh in 80C investments and Rs 50,000 standard deduction would have a taxable income of Rs 5.5 lakh, resulting in tax of approximately Rs 15,600 after rebate, which is still relatively low.' },
  { q: 'Is Section 80C available under the old tax regime?', a: 'Yes, Section 80C is available only under the old tax regime. You can claim up to Rs 1.5 lakh for EPF, PPF, ELSS, life insurance, tuition fees and home loan principal. NPS adds a separate Rs 50,000 under Section 80CCD(1B).' },
  { q: 'How much tax do I pay on Rs 10 lakh income under the old regime?', a: 'With only the Rs 50,000 standard deduction, tax on Rs 10 lakh is Rs 1,06,600 including cess. Taxable income is Rs 9.5 lakh, slab tax is Rs 1,02,500 and cess adds Rs 4,100. Every extra deduction you claim lowers this figure.' },
  { q: 'How much tax do I pay on Rs 12 lakh income under the old regime?', a: 'With only the standard deduction, tax on Rs 12 lakh is Rs 1,63,800 including cess. Adding a Rs 1.5 lakh Section 80C investment cuts it to Rs 1,17,000. That is a saving of Rs 46,800 at the 30 per cent slab.' },
  { q: 'What is the basic exemption limit under the old tax regime?', a: 'The basic exemption limit under the old regime depends on age. It is Rs 2.5 lakh below 60, Rs 3 lakh for senior citizens aged 60 to 80, and Rs 5 lakh for those above 80. Income up to the limit attracts no tax.' },
  { q: 'Is the Section 87A rebate available above Rs 5 lakh under the old regime?', a: 'No, the Section 87A rebate is lost once taxable income crosses Rs 5 lakh under the old regime. The rebate is capped at Rs 12,500 and there is no marginal relief above the limit. Deductions can bring taxable income back under Rs 5 lakh.' },
  { q: 'Does health and education cess apply under the old tax regime?', a: 'Yes, a 4 per cent health and education cess applies to the total of slab tax and surcharge. It is added after the Section 87A rebate. The calculator shows cess as a separate line in the result panel.' },
  { q: 'How does surcharge work under the old tax regime?', a: 'Surcharge applies only when total income exceeds Rs 50 lakh under the old regime. The rates are 10 per cent above Rs 50 lakh, 15 per cent above Rs 1 crore, 25 per cent above Rs 2 crore and 37 per cent above Rs 5 crore. Cess is then charged on tax plus surcharge.' },
  { q: 'Can senior citizens claim extra deductions under the old regime?', a: 'Yes, senior citizens get a higher exemption limit and a few extra deductions under the old regime. Section 80TTB allows up to Rs 50,000 on interest from deposits, and Section 80D allows a higher health insurance limit. These benefits are not available under the new regime.' },
  { q: 'Do I need to tell my employer which regime I choose?', a: 'Yes, you should declare your regime to your employer at the start of the financial year so TDS is deducted correctly. Salaried taxpayers can still switch regimes when filing the return. The final tax is settled in the ITR.' },
  { q: 'Can I claim HRA on rent paid to my parents under the old regime?', a: 'Yes, rent paid to parents qualifies for HRA exemption if the payment is genuine and documented. Your parents must declare the rent as income in their own return. Keep rent receipts and bank transfer proofs ready.' },
  { q: 'What is Fermor?', a: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product connects real financial accounts through the Account Aggregator framework and automates financial decisions. All calculators on Fermor are free to use.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ─── CA CTA ─────────────────────────────────────────────────── */

/* ─── Main Client ────────────────────────────────────────────── */
export default function OldTaxRegimeClient({ region = 'in' }: { region?: string }) {
  const [mobile, setMobile] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const defaultSettings = {
    grossSalary: 1200000,
    otherIncome: 0,
    ageGroup: 'below60' as 'below60' | 'senior' | 'superSenior',
    fy: '2026-27' as '2026-27' | '2025-26',
    d80C: 150000,
    d80D: 25000,
    d80CCD1B: 0,
    basicSalary: 600000,
    hraReceived: 240000,
    rentPaid: 0,
    cityType: 'metro' as 'metro' | 'nonmetro',
    homeLoanInt: 0,
  };

  const { settings, updateSettings } = useCalculatorSettings('old-tax-regime-calculator', defaultSettings);
  const {
    grossSalary, otherIncome, ageGroup, fy,
    d80C, d80D, d80CCD1B,
    basicSalary, hraReceived, rentPaid, cityType, homeLoanInt,
  } = settings;

  const setGrossSalary = (v: any) => updateSettings({ grossSalary: typeof v === 'function' ? v(settings.grossSalary) : v });
  const setOtherIncome = (v: any) => updateSettings({ otherIncome: typeof v === 'function' ? v(settings.otherIncome) : v });
  const setAgeGroup    = (v: any) => updateSettings({ ageGroup: typeof v === 'function' ? v(settings.ageGroup) : v });
  const setFy          = (v: any) => updateSettings({ fy: typeof v === 'function' ? v(settings.fy) : v });
  
  const setD80C        = (v: any) => updateSettings({ d80C: typeof v === 'function' ? v(settings.d80C) : v });
  const setD80D        = (v: any) => updateSettings({ d80D: typeof v === 'function' ? v(settings.d80D) : v });
  const setD80CCD1B    = (v: any) => updateSettings({ d80CCD1B: typeof v === 'function' ? v(settings.d80CCD1B) : v });
  
  const setBasicSalary = (v: any) => updateSettings({ basicSalary: typeof v === 'function' ? v(settings.basicSalary) : v });
  const setHraReceived = (v: any) => updateSettings({ hraReceived: typeof v === 'function' ? v(settings.hraReceived) : v });
  const setRentPaid    = (v: any) => updateSettings({ rentPaid: typeof v === 'function' ? v(settings.rentPaid) : v });
  const setCityType    = (v: any) => updateSettings({ cityType: typeof v === 'function' ? v(settings.cityType) : v });
  const setHomeLoanInt = (v: any) => updateSettings({ homeLoanInt: typeof v === 'function' ? v(settings.homeLoanInt) : v });

  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-old-tax-regime-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (typeof d.grossSalary === 'number') setGrossSalary(d.grossSalary);
      if (typeof d.otherIncome === 'number') setOtherIncome(d.otherIncome);
      if (d.ageGroup === 'senior' || d.ageGroup === 'superSenior' || d.ageGroup === 'below60') setAgeGroup(d.ageGroup);
      if (d.fy === '2025-26' || d.fy === '2026-27') setFy(d.fy);
      if (typeof d.d80C === 'number') setD80C(d.d80C);
      if (typeof d.d80D === 'number') setD80D(d.d80D);
      if (typeof d.d80CCD1B === 'number') setD80CCD1B(d.d80CCD1B);
      if (typeof d.basicSalary === 'number') setBasicSalary(d.basicSalary);
      if (typeof d.hraReceived === 'number') setHraReceived(d.hraReceived);
      if (typeof d.rentPaid === 'number') setRentPaid(d.rentPaid);
      if (d.cityType === 'metro' || d.cityType === 'nonmetro') setCityType(d.cityType);
      if (typeof d.homeLoanInt === 'number') setHomeLoanInt(d.homeLoanInt);
    } catch { /* fail silently */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('fermor-old-tax-regime-v1', JSON.stringify({
        grossSalary, otherIncome, ageGroup, fy,
        d80C, d80D, d80CCD1B,
        basicSalary, hraReceived, rentPaid, cityType, homeLoanInt,
      }));
    } catch { /* ignore */ }
  }, [grossSalary, otherIncome, ageGroup, fy, d80C, d80D, d80CCD1B, basicSalary, hraReceived, rentPaid, cityType, homeLoanInt]);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtC = (n: number) => formatCurrency(convertCurrency(n));

  const result = useMemo(() => {
    return calcTaxOld(
      grossSalary, otherIncome, ageGroup, fy,
      d80C, d80D, d80CCD1B,
      basicSalary, hraReceived, rentPaid, cityType, homeLoanInt
    );
  }, [grossSalary, otherIncome, ageGroup, fy, d80C, d80D, d80CCD1B, basicSalary, hraReceived, rentPaid, cityType, homeLoanInt]);

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'middle' as const } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'middle' as const } as React.CSSProperties;

  const taxPct = result.grossIncome > 0 ? Math.round((result.totalTax / result.grossIncome) * 100) : 0;
  const takePct = 100 - taxPct;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Old Tax Regime Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Compute your total income tax liability under the traditional old tax regime with deductions, exemptions, slabs, surcharge, and cess
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="Old Tax Regime Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
                      {showAdvanced ? 'Advanced Settings' : 'Basic Inputs'}
                    </p>
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <SalarySlider label="Gross Annual Salary" id="tax-gross-salary" value={grossSalary} onChange={setGrossSalary} compact={mobile} />

                      <Slider label="Other Income (Interest, Rent, etc.)" id="tax-other-income" value={otherIncome}
                        min={0} max={10000000} step={10000}
                        fmt={v => v === 0 ? 'Rs 0' : fmtC(v)} onChange={setOtherIncome} compact={mobile} />

                      <Slider label="Section 80C Deductions (PPF, ELSS, EPF)" id="tax-80c" value={d80C}
                        min={0} max={150000} step={5000}
                        fmt={v => v === 0 ? 'Rs 0' : fmtC(v)} onChange={setD80C} compact={mobile} />

                      <Slider label="Section 80D Deductions (Health Insurance)" id="tax-80d" value={d80D}
                        min={0} max={100000} step={2000}
                        fmt={v => v === 0 ? 'Rs 0' : fmtC(v)} onChange={setD80D} compact={mobile} />

                      <Slider label="Section 80CCD(1B) Deductions (Additional NPS)" id="tax-nps" value={d80CCD1B}
                        min={0} max={50000} step={5000}
                        fmt={v => v === 0 ? 'Rs 0' : fmtC(v)} onChange={setD80CCD1B} compact={mobile} />

                      <AgeToggle value={ageGroup} onChange={setAgeGroup} />

                      {/* FY Toggle */}
                      <div style={{ marginBottom: 36 }}>
                        <p style={{ fontSize: 14, color: C.ink2, fontWeight: 400, margin: '0 0 10px' }}>Financial Year</p>
                        <div role="radiogroup" aria-label="Financial year" style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                          {(['2026-27', '2025-26'] as const).map(f => (
                            <button key={f} onClick={() => setFy(f)}
                              role="radio" aria-checked={fy === f}
                              style={{
                                flex: 1, padding: '9px 6px', fontFamily: INTER, fontSize: 13, cursor: 'pointer',
                                border: 'none', background: fy === f ? C.white : 'transparent',
                                color: fy === f ? C.ink : C.ink3,
                                fontWeight: fy === f ? 600 : 400,
                                transition: 'all 0.12s',
                              }}>
                              FY {f}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                        <button onClick={() => setShowAdvanced(true)}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: INTER, fontSize: 13.5, fontWeight: 700, color: C.dark }}>
                          More settings
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                          </svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 28 }}>
                        <button onClick={() => setShowAdvanced(false)}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: INTER, fontSize: 13.5, fontWeight: 700, color: C.dark }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                          </svg>
                          Back
                        </button>
                      </div>

                      <Slider label="Basic Salary (for HRA)" id="tax-basic-salary" value={basicSalary}
                        min={0} max={10000000} step={10000}
                        fmt={v => v === 0 ? 'Rs 0' : fmtC(v)} onChange={setBasicSalary} compact={mobile} />

                      <Slider label="HRA Received" id="tax-hra-received" value={hraReceived}
                        min={0} max={5000000} step={5000}
                        fmt={v => v === 0 ? 'Rs 0' : fmtC(v)} onChange={setHraReceived} compact={mobile} />

                      <Slider label="Rent Paid (Annual)" id="tax-rent-paid" value={rentPaid}
                        min={0} max={5000000} step={5000}
                        fmt={v => v === 0 ? 'Rs 0' : fmtC(v)} onChange={setRentPaid} compact={mobile} />

                      <MetroToggle value={cityType === 'metro'} onChange={v => setCityType(v ? 'metro' : 'nonmetro')} />

                      <Slider label="Home Loan Interest u/s 24(b)" id="tax-homeloan" value={homeLoanInt}
                        min={0} max={500000} step={5000}
                        fmt={v => v === 0 ? 'Rs 0' : fmtC(v)} onChange={setHomeLoanInt} compact={mobile} />
                    </>
                  )}
                </div>

                {/* Result Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* Dark hero box */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'stretch' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                      <div style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Total Tax</div>
                      <div style={{ fontSize: mobile ? 12 : 13, color: '#7A8087' }}>Effective Rate</div>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                      <div style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', lineHeight: 1 }}
                        aria-live="polite" aria-label={`Total tax: ${fmtC(result.totalTax)}`}>
                        {fmtC(result.totalTax)}
                      </div>
                      <div style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: '#101214', lineHeight: 1 }}>{result.effectiveRate.toFixed(1)}%</div>
                    </div>
                  </div>

                  {/* Donut chart atop output */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, order: mobile ? 1 : -1 }}>
                    <DonutChart tax={result.totalTax} takeHome={result.takeHome} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1, width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Tax {taxPct}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Take-Home {takePct}%</span>
                    </div>
                  </div>

                  {/* Stats rows */}
                  {[
                    { label: 'Gross Income', value: fmtC(result.grossIncome) },
                    ...(result.hraExemption > 0 ? [{ label: 'HRA Exemption', value: `-${fmtC(result.hraExemption)}` }] : []),
                    { label: 'Standard Deduction', value: fmtC(result.stdDeduction) },
                    { label: 'Total Deductions', value: fmtC(result.totalDeductions) },
                    { label: 'Taxable Income', value: fmtC(result.taxableIncome) },
                    { label: 'Slab Tax', value: fmtC(result.slabTax) },
                    { label: '87A Rebate', value: result.rebate > 0 ? `-${fmtC(result.rebate)}` : fmtC(0) },
                    { label: 'Surcharge', value: fmtC(result.surcharge) },
                    { label: 'Health & Education Cess', value: fmtC(result.cess) },
                    { label: 'Monthly TDS', value: fmtC(result.monthlyTDS) },
                    { label: 'Annual Take-Home', value: fmtC(result.takeHome) },
                    { label: 'Monthly Take-Home', value: fmtC(Math.round(result.takeHome / 12)) },
                    { label: 'Highest Slab Rate', value: result.slabHits.length > 0 ? `${(result.slabHits[result.slabHits.length - 1].rate * 100).toFixed(0)}%` : '0%' },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '8px 0' : '10px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12 : 13, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12 : 13.5, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}



                  {/* Tax vs take-home percentage bar */}
                  <div style={{ width: '100%', marginTop: mobile ? 16 : 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Tax {taxPct}%</span>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Take-Home {takePct}%</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 99, background: C.lime2, overflow: 'hidden' }} role="img" aria-label={`Tax is ${taxPct}% of gross income, take-home is ${takePct}%`}>
                      <div style={{ height: '100%', width: `${taxPct}%`, background: C.dark, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>

                </div>
              </div>

              {/* Slab & Deduction breakdown (collapsible strip) */}
              {(result.slabHits.length > 0 || result.deductionBreakdown.length > 0) && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowBreakdown(v => !v)}
                    aria-expanded={showBreakdown} aria-controls="slab-deduction-breakdown"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Slab-Wise Tax and Deductions</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>How your tax is built</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#F4F5F6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {result.slabHits.length} slabs · {result.effectiveRate.toFixed(1)}% effective
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showBreakdown ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showBreakdown && (
                    <div id="slab-deduction-breakdown" style={{ borderTop: `1px solid ${C.border}`, overflowX: 'auto' }}>
                      <table style={{ width: '100%', minWidth: 460, borderCollapse: 'collapse', fontSize: 13 }}>
                        <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, padding: mobile ? '8px 20px 12px' : '8px 44px 12px' }}>Tax charged in each slab on your taxable income</caption>
                        <thead>
                          <tr style={{ background: '#F4F5F6' }}>
                            <th scope="col" style={{ padding: mobile ? '10px 20px' : '10px 44px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>Slab</th>
                            <th scope="col" style={{ padding: mobile ? '10px 20px' : '10px 44px', textAlign: 'right', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>Income in Slab</th>
                            <th scope="col" style={{ padding: mobile ? '10px 20px' : '10px 44px', textAlign: 'right', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>Rate</th>
                            <th scope="col" style={{ padding: mobile ? '10px 20px' : '10px 44px', textAlign: 'right', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>Tax</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.slabHits.map((hit, i) => (
                            <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#FAFAFA' }}>
                              <td style={{ padding: mobile ? '12px 20px' : '12px 44px', fontWeight: 700, color: C.ink }}>{hit.label}</td>
                              <td style={{ padding: mobile ? '12px 20px' : '12px 44px', textAlign: 'right', color: C.ink2 }}>{fmtC(Math.round(hit.tax / hit.rate))}</td>
                              <td style={{ padding: mobile ? '12px 20px' : '12px 44px', textAlign: 'right', color: C.ink2 }}>{(hit.rate * 100).toFixed(0)}%</td>
                              <td style={{ padding: mobile ? '12px 20px' : '12px 44px', textAlign: 'right', fontWeight: 700, color: C.dark }}>{fmtC(hit.tax)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {result.deductionBreakdown.length > 0 && (
                        <table style={{ width: '100%', minWidth: 460, borderCollapse: 'collapse', fontSize: 13, borderTop: `1px solid ${C.border}` }}>
                          <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, padding: mobile ? '8px 20px 14px' : '8px 44px 16px' }}>Deductions applied before slab tax</caption>
                          <thead>
                            <tr style={{ background: '#F4F5F6' }}>
                              <th scope="col" style={{ padding: mobile ? '10px 20px' : '10px 44px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>Deduction</th>
                              <th scope="col" style={{ padding: mobile ? '10px 20px' : '10px 44px', textAlign: 'right', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>Amount Claimed</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.deductionBreakdown.map((d, i) => (
                              <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#FAFAFA' }}>
                                <td style={{ padding: mobile ? '12px 20px' : '12px 44px', fontWeight: 700, color: C.ink }}>{d.label}</td>
                                <td style={{ padding: mobile ? '12px 20px' : '12px 44px', textAlign: 'right', fontWeight: 700, color: C.dark }}>{fmtC(d.amount)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Waitlist Card */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              {/* What Is the Old Tax Regime? */}
              <section id="what-is-old-tax-regime" style={{ marginBottom: 44 }}>
                <h2 style={h2}>What Is the Old Tax Regime?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    The old tax regime is the traditional income tax system under the Income Tax Act, 1961 that allows taxpayers to claim a wide range of deductions and exemptions before computing their tax liability. It has been the default tax structure for decades and remains available to all individual and HUF taxpayers in India.
                  </p>
                </div>
                <p style={p}>
                  Under the old regime, taxpayers can claim Chapter VI-A deductions (Sections 80C, 80D, 80E, 80G, 80TTA, 80CCD), the Rs 50,000 standard deduction, HRA exemption, and home loan interest up to Rs 2 lakh under Section 24(b).
                </p>
                <p style={p}>
                  The trade-off is higher tax rates compared to the new regime introduced in Budget 2020.
                </p>
                <p style={p}>
                  From FY 2023-24 onwards, the new tax regime became the default regime, but taxpayers can still choose the old regime by formally opting out of the new regime at the time of filing their income tax return. The choice between regimes is available every year for salaried individuals. Use the <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</Link> to compare both regimes side by side.
                </p>
              </section>

              {/* Old Tax Regime Slabs FY 2026-27 */}
              <section id="old-regime-slabs" style={{ marginBottom: 44 }}>
                <h2 style={h2}>Old Tax Regime Slabs FY 2026-27</h2>
                <p style={p}>The old tax regime has four income slabs with rates of 0%, 5%, 20%, and 30% where the basic exemption limit depends on the taxpayer age category, making it more beneficial for senior and super senior citizens.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Old tax regime income tax slabs by age category for FY 2026-27</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Income Slab</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Below 60 Years</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Senior (60-80)</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Super Senior (80+)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Up to Rs 2.5L',     '0%',    '0%',    '0%'],
                        ['Rs 2.5L - Rs 3L',   '5%',    '0%',    '0%'],
                        ['Rs 3L - Rs 5L',     '5%',    '5%',    '0%'],
                        ['Rs 5L - Rs 10L',    '20%',   '20%',   '20%'],
                        ['Above Rs 10L',      '30%',   '30%',   '30%'],
                      ].map(([slab, y, s, ss]) => (
                        <tr key={slab as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{slab}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{y}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{s}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{ss}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Senior citizens (60 to 80 years) get a higher basic exemption of Rs 3 lakh compared to Rs 2.5 lakh for those below 60. Super senior citizens (80+ years) have the highest exemption of Rs 5 lakh, meaning their first Rs 5 lakh of income is entirely tax-free under the old regime. The 30 per cent rate kicks in above Rs 10 lakh for all age groups.
                </p>
              </section>

              {/* Section 87A Rebate Under Old Regime */}
              <section id="section-87a-rebate" style={{ marginBottom: 44 }}>
                <h2 style={h2}>Section 87A Rebate Under Old Regime</h2>
                <p style={p}>Section 87A provides a full tax rebate for resident individuals whose total taxable income does not exceed Rs 5 lakh in a financial year, with the rebate amount being the lower of actual tax payable or Rs 12,500.</p>
                <p style={p}>
                  For example, if your gross salary is Rs 8 lakh and you claim Rs 3.5 lakh in deductions (80C of Rs 1.5 lakh, 80D of Rs 50,000, NPS of Rs 50,000, standard deduction of Rs 50,000, and HRA of Rs 50,000), your taxable income drops to Rs 4.5 lakh. The slab tax on Rs 4.5 lakh is Rs 12,500, and the Section 87A rebate of Rs 12,500 brings it to zero.
                </p>
                <p style={p}>
                  The Section 87A rebate applies to all age categories. Super senior citizens already have a Rs 5 lakh exemption and rarely need it. The rebate limit under the old regime (Rs 12,500) is significantly lower than the rebate available under the new regime (Rs 60,000 for income up to Rs 12 lakh).
                </p>
              </section>

              {/* Old Regime Deductions Overview */}
              <section id="old-regime-deductions" style={{ marginBottom: 44 }}>
                <h2 style={h2}>Old Regime Deductions Overview</h2>
                <p style={p}>The old tax regime offers a comprehensive set of deductions covering investments, insurance, housing, education, and health expenses that can collectively reduce taxable income by Rs 4-6 lakh or more per year.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Key deductions available under the old tax regime for FY 2026-27</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Section</th>
                        <th style={thS} scope="col">Purpose</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Maximum Deduction</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['80C',       'EPF, PPF, ELSS, Life Insurance, Tuition Fees, Home Loan Principal',       'Rs 1.5 lakh'],
                        ['80D',       'Health Insurance Premiums (Self, Family, Parents)',                       'Up to Rs 25K / Rs 50K'],
                        ['80CCD(1B)', 'Additional NPS Contribution',                                             'Rs 50,000'],
                        ['24(b)',     'Home Loan Interest (Self-Occupied Property)',                             'Rs 2 lakh'],
                        ['80E',       'Education Loan Interest Repayment',                                       'No limit (10 years)'],
                        ['80G',       'Donations to Approved Charitable Funds',                                  '50% or 100% of donation'],
                        ['80TTA',     'Savings Account Interest',                                                'Rs 10,000'],
                        ['HRA',       'House Rent Allowance Exemption',                                          'Actual HRA / 50% basic'],
                        ['Standard',  'Standard Deduction for Salaried Employees',                               'Rs 50,000'],
                      ].map(([sec, purpose, maxDed]) => (
                        <tr key={sec as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 700, color: C.dark, whiteSpace: 'nowrap' }}>{sec}</td>
                          <td style={tdL}>{purpose}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const, fontWeight: 600, whiteSpace: 'nowrap' }}>{maxDed}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  A salaried employee using EPF, health insurance, NPS, home loan interest, and HRA can cut taxable income by Rs 4-6 lakh a year. Use the <Link href="/calculators/tax-saving-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Tax Saving Calculator</Link> to see how each deduction impacts your final tax liability.
                </p>
              </section>

              {/* Tax Calculation Under Old Regime */}
              <section id="tax-calculation" style={{ marginBottom: 44 }}>
                <h2 style={h2}>Tax Calculation Under Old Regime</h2>
                <p style={p}>Tax under the old regime is calculated by first determining gross total income, subtracting exemptions and deductions, applying age-based slab rates, then adding surcharge and 4 per cent health and education cess.</p>
                <p style={p}>
                  Consider a salaried employee earning a gross salary of Rs 15 lakh per year with the following deductions: basic salary of Rs 6 lakh, HRA received of Rs 2.4 lakh, actual rent paid of Rs 2.8 lakh in a metro city, 80C investments of Rs 1.5 lakh, health insurance of Rs 30,000, NPS contribution of Rs 50,000, and home loan interest of Rs 1.8 lakh.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Worked example: tax calculation under old regime for FY 2026-27</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Component</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Gross Salary', 'Rs 15,00,000'],
                        ['HRA Exemption', 'Rs 1,80,000'],
                        ['Gross Total Income', 'Rs 13,20,000'],
                        ['Total Deductions (80C, 80D, NPS, Home Loan, Standard)', 'Rs 4,60,000'],
                        ['Taxable Income', 'Rs 8,60,000'],
                        ['Total Slab Tax (5% + 20% slabs)', 'Rs 84,500'],
                        ['Section 87A Rebate', 'Rs 0 (income > Rs 5L)'],
                        ['Surcharge', 'Rs 0 (income < Rs 50L)'],
                        ['Cess at 4%', 'Rs 3,380'],
                        ['Total Tax Liability', 'Rs 87,880'],
                        ['Effective Tax Rate', '5.9%'],
                      ].map(([comp, amt]) => (
                        <tr key={comp as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: comp === 'Total Tax Liability' || comp === 'Taxable Income' ? 700 : 400, color: comp === 'Total Tax Liability' ? C.dark : C.ink2 }}>{comp}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const, fontWeight: comp === 'Total Tax Liability' || comp === 'Taxable Income' ? 700 : 500, color: comp === 'Total Tax Liability' ? C.dark : C.ink }}>{amt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  This example shows how the old regime deductions reduce taxable income from Rs 15 lakh to Rs 8.6 lakh, resulting in an effective tax rate of only 5.9 per cent. Under the new regime without these deductions, the same income would attract approximately Rs 97,500 in tax including cess. The old regime saves roughly Rs 10,000 in this scenario.
                </p>
              </section>

              {/* In-Content Promo Bar */}
              <div style={{ marginBottom: 44, display: 'flex', background: '#f6f7f8', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ flex: 1, padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: C.ink, margin: '0 0 2px', fontFamily: INTER }}>
                      Compare with the new regime
                    </p>
                    <p style={{ fontSize: 13, color: C.ink3, margin: 0, fontFamily: INTER }}>
                      See how your tax changes under the new tax regime with lower slab rates.
                    </p>
                  </div>
                  <Link href="/calculators/new-tax-regime-calculator" target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 12.5, fontWeight: 700, color: C.dark, background: C.lime, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', fontFamily: INTER, whiteSpace: 'nowrap' }}>
                    Open calculator
                  </Link>
                </div>
              </div>

              {/* Old Regime vs New Regime Comparison */}
              <section id="new-vs-old-regime" style={{ marginBottom: 44 }}>
                <h2 style={h2}>Old Regime vs New Regime Comparison</h2>
                <p style={p}>The choice between old and new regimes depends entirely on your deduction profile where the new regime offers lower tax rates with no deductions while the old regime has higher rates but extensive deduction options.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Old regime vs new regime comparison for FY 2026-27</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Feature</th>
                        <th style={thS} scope="col">Old Regime</th>
                        <th style={thS} scope="col">New Regime</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Number of Slabs', '4 slabs: 0%, 5%, 20%, 30%', '7 slabs: 0-30%'],
                        ['Basic Exemption', 'Rs 2.5L / Rs 3L / Rs 5L', 'Rs 4 lakh (all ages)'],
                        ['Standard Deduction', 'Rs 50,000', 'Rs 75,000'],
                        ['Section 80C Deductions', 'Up to Rs 1.5 lakh', 'Not available'],
                        ['Section 80D Health Insurance', 'Up to Rs 25K/50K', 'Not available'],
                        ['NPS 80CCD(1B)', 'Up to Rs 50,000 additional', 'Employer NPS only'],
                        ['HRA Exemption', 'Available', 'Not available'],
                        ['Home Loan Interest 24(b)', 'Up to Rs 2 lakh', 'Not available'],
                        ['Section 87A Rebate', 'Up to Rs 12,500 (income Rs 5L)', 'Up to Rs 60,000 (income Rs 12L)'],
                        ['Zero Tax Limit (Salaried)', '~Rs 5.5L (with deductions)', '~Rs 12.75L gross salary'],
                        ['Surcharge', 'Up to 37% (income > Rs 5Cr)', 'Up to 25% (income > Rs 5Cr)'],
                      ].map(([feat, old, nw]) => (
                        <tr key={feat as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{feat}</td>
                          <td style={tdR}>{old}</td>
                          <td style={tdL}>{nw}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  As a general rule: if your total deductions exceed Rs 3-4 lakh per year, the old regime likely saves you more tax. If you have minimal deductions or prefer simplicity, the new regime is usually better. Use the <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Old vs New Tax Regime Calculator</Link> to compare both regimes with your specific numbers.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  For a detailed breakdown of your tax under the new regime alone, use the <Link href="/calculators/new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>New Tax Regime Calculator</Link>.
                </p>
              </section>

              {/* How to Maximize Old Regime Tax Savings */}
              <section id="maximize-savings" style={{ marginBottom: 44 }}>
                <h2 style={h2}>How to Maximize Old Regime Tax Savings</h2>
                <p style={p}>Maximising your tax savings under the old regime requires a strategic approach to using every available deduction and exemption, starting with the Rs 1.5 lakh Section 80C limit and layering additional deductions on top.</p>
                <div style={{ marginBottom: 16 }}>
                  {[
                    ['Max out Section 80C', 'Invest the full Rs 1.5 lakh limit in EPF, PPF, ELSS, or life insurance. ELSS mutual funds offer the shortest 3-year lock-in with potential market-linked returns, while PPF provides tax-free interest backed by the government. Together with your mandatory EPF contribution, filling the 80C limit is usually straightforward for most salaried employees.'],
                    ['Claim HRA strategically', 'If you live in rented accommodation, ensure your rent exceeds 10 per cent of your basic salary to maximise the HRA exemption. In metro cities, you can claim up to 50 per cent of basic salary as HRA exemption. For non-metro cities, the limit is 40 per cent. Paying rent to parents (with their PAN for the landlord declaration) is also a valid way to claim HRA.'],
                    ['Use NPS additional deduction', 'Contribute Rs 50,000 to NPS under Section 80CCD(1B) on top of your 80C limit. This is an extra deduction that many taxpayers overlook. For maximum impact, combine employer NPS contributions under 80CCD(2) which has no upper limit. The NPS also offers market-linked returns with low fund management charges.'],
                    ['Cover health insurance under 80D', 'Pay health insurance premiums for yourself, your spouse, children, and parents. You can claim up to Rs 25,000 for self and family plus Rs 50,000 for senior citizen parents for a total of Rs 75,000. Preventive health check-ups up to Rs 5,000 are also covered within this limit.'],
                    ['Claim home loan interest', 'If you have a home loan, the interest component up to Rs 2 lakh is deductible under Section 24(b). The principal repayment also counts under Section 80C within the Rs 1.5 lakh limit. For a let-out property, the entire interest is deductible with no upper limit, making real estate investment particularly tax-efficient under the old regime.'],
                  ].map(([title, text], i) => (
                    <div key={i} style={{ marginBottom: 14 }}>
                      <strong style={{ fontSize: 15, color: C.ink, marginBottom: 4, display: 'block' }}>{title}</strong>
                      <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </section>

              

              {/* How to Use the Old Tax Regime Calculator */}
              <section id="how-to-use-calculator" style={{ marginBottom: 44 }}>
                <h2 style={h2}>How to Use the Old Tax Regime Calculator</h2>
                <p style={p}>This calculator computes your total income tax under the old tax regime including all major deductions, cess, and surcharge by following these five steps.</p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter your gross annual salary:</strong> Use the salary slider to enter your total annual salary including basic, allowances, bonuses, and perquisites. Add any other income from interest, rental income, or freelance earnings.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select your age category:</strong> Choose below 60, senior (60-80), or super senior (80+) to apply the correct slab rates for your age group.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter basic deductions:</strong> enter your Section 80C investments (EPF, PPF, ELSS, life insurance), 80D health insurance premiums, and NPS contributions under 80CCD(1B) on the main input panel.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Click More settings for HRA and home loan:</strong> Click "More settings" to input HRA details (basic salary, HRA received, rent paid, city type) and home loan interest u/s 24(b). The calculator computes HRA exemption automatically.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Review your complete tax summary:</strong> The result panel shows total tax, effective rate, monthly TDS, taxable income, Section 87A rebate, cess, surcharge, slab-by-slab breakdown, and a deduction breakdown showing how much each deduction saved you.
                  </li>
                </ol>
                <p style={p}>
                  Click any input value to type a precise number instead of using the slider. The currency selector converts amounts to USD, EUR, GBP, or other currencies. Your inputs are saved automatically and restored the next time you visit.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Use the <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Old vs New Tax Regime Calculator</Link> to compare both regimes side by side with your specific income and deduction amounts.
                </p>
              </section>

              {/* FAQ */}
              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              {/* Disclaimer */}
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations are indicative only and use old regime rules for FY 2026-27, which may change with the Union Budget. Consult a qualified chartered accountant for personalised advice.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.otr-sidebar::-webkit-scrollbar{width:5px}.otr-sidebar::-webkit-scrollbar-track{background:transparent}.otr-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.otr-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside
            className="otr-sidebar"
            aria-label="Related calculators"
            style={{
              position: mobile ? 'static' : 'sticky',
              top: 20,
              alignSelf: 'start',
              maxHeight: mobile ? 'none' : 'calc(100vh - 40px)',
              overflowY: mobile ? 'visible' : 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              paddingRight: mobile ? 0 : 2,
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
            } as React.CSSProperties}
          >
            <div style={{ flexShrink: 0 }}><SidebarList title="Popular Calculators" items={POPULAR} /></div>
            <div style={{ flexShrink: 0 }}><SidebarList title="More Calculators" items={MORE} /></div>
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

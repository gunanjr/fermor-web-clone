'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useEffect, useLayoutEffect } from 'react';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import { FAQBox } from '@/components/common/FAQBox';

const C = {
  dark: '#101214',
  lime: '#a6dbc4',
  lime2: '#2d9970',
  paleLime: '#f4f5f6',
  ink: '#16140F',
  ink2: '#50565c',
  ink3: '#7a8087',
  white: '#ffffff',
  bg: '#f6f7f8',
  border: '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

type BonusInputMode = 'percent' | 'amount';
type Regime = 'old' | 'new';

type State = {
  annualSalary: number;
  bonusMode: BonusInputMode;
  bonusAmount: number;
  bonusPercent: number;
  regime: Regime;
  ded80C: number;
  ded80D: number;
};

const DEFAULTS: State = {
  annualSalary: 1200000,
  bonusMode: 'percent',
  bonusAmount: 150000,
  bonusPercent: 15,
  regime: 'new',
  ded80C: 150000,
  ded80D: 25000,
};

/* ─── Tax Calculations ─────────────────────────────────────────── */
function calcOldRegimeTax(gross: number, ded80C: number, ded80D: number): number {
  const standardDed = 50000;
  const taxable = Math.max(0, gross - standardDed - Math.min(ded80C, 150000) - Math.min(ded80D, 50000));
  let tax = 0;
  if (taxable > 250000) tax += Math.min(taxable - 250000, 250000) * 0.05;
  if (taxable > 500000) tax += Math.min(taxable - 500000, 500000) * 0.20;
  if (taxable > 1000000) tax += (taxable - 1000000) * 0.30;
  if (taxable <= 500000) tax = 0;
  return Math.round(tax * 1.04);
}

function calcNewRegimeTax(gross: number): number {
  const taxable = Math.max(0, gross - 75000);
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

/* ─── Slider ─────────────────────────────────────────────────── */
function Slider({
  label, id, value, min, max, step, display, onChange, compact,
}: {
  label: string; id?: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (v: number) => void; compact?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  const inputId = id || label.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'slider';
  const rangeId = `${inputId}-range`;
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 14 }}>
        <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 13 : 13.5, color: C.ink2, fontWeight: 400, fontFamily: INTER }}>{label}</label>
        {editing ? (
          <input
            id={inputId}
            autoFocus
            value={raw}
            onChange={e => setRaw(e.target.value)}
            onBlur={commit}
            onKeyDown={e => e.key === 'Enter' && commit()}
            aria-label={`Enter ${label} value`}
            style={{ fontSize: 13.5, fontWeight: 600, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 7, padding: '6px 10px', width: 120, outline: 'none', color: C.ink, fontFamily: INTER }}
          />
        ) : (
          <button
            onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${display}. Click to edit.`}
            style={{ fontSize: compact ? 12.5 : 13.5, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: compact ? '5px 10px' : '6px 14px', cursor: 'pointer', fontFamily: INTER, minWidth: compact ? 80 : 105, textAlign: 'center', transition: 'border-color 0.15s' }}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}
          >
            {display}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 18, height: 18, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 1px 6px rgba(16,18,20,0.18)', pointerEvents: 'none', zIndex: 1 }} />
        <input
          id={rangeId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(+e.target.value)}
          aria-label={label}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">{display.replace(/[0-9,]+/, min.toLocaleString('en-IN'))}</span>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">{display.replace(/[0-9,]+/, max.toLocaleString('en-IN'))}</span>
      </div>
    </div>
  );
}

/* ─── Donut Chart ─────────────────────────────────────────────── */
function DonutChart({ keepPct, mobile }: { keepPct: number; mobile: boolean }) {
  const taxPct = Math.max(0, Math.min(100, 100 - keepPct));
  const R = mobile ? 70 : 80;
  const sw = mobile ? 17 : 20;
  const sz = (R + sw) * 2 + 4;
  const cx = sz / 2;
  const cy = sz / 2;
  const circ = 2 * Math.PI * R;
  const keepArc = (keepPct / 100) * circ;
  return (
    <svg
      width={sz}
      height={sz}
      viewBox={`0 0 ${sz} ${sz}`}
      role="img"
      aria-label={`Bonus split: You keep ${keepPct}%, Tax on bonus ${taxPct}%`}
      style={{ display: 'block' }}
    >
      {/* Tax arc (lime2, full circle background) */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      {/* Keep arc (dark) */}
      <circle
        cx={cx}
        cy={cy}
        r={R}
        fill="none"
        stroke={CHART_PAIR.primary}
        strokeWidth={sw}
        strokeDasharray={`${keepArc} ${circ - keepArc}`}
        strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }}
      />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>You keep</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: mobile ? 24 : 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{keepPct}%</text>
    </svg>
  );
}

/* ─── Sidebar list ─────────────────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.ink, fontFamily: INTER }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div
            style={{ padding: '13px 20px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 14, color: C.ink2, transition: 'all 0.12s', fontFamily: INTER }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = C.paleLime; (e.currentTarget as HTMLElement).style.color = C.dark; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink2; }}
          >
            {label}
          </div>
        </Link>
      ))}
    </div>
  );
}

function TaxSnapshot() {
  const rows = [
    { label: 'Bonus taxed at', value: 'Marginal rate' },
    { label: 'New regime 87A rebate', value: 'Up to Rs 12L' },
    { label: 'Standard deduction', value: 'Rs 75,000' },
    { label: 'Peak rate (incl. cess)', value: '31.2%' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Tax Quick Facts</span>
      </div>
      {rows.map((r, i) => (
        <div key={r.label} style={{ padding: '11px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: C.white, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12.5, color: C.ink2 }}>{r.label}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

function RelatedReads() {
  const links = [
    { href: '/blogs/income-tax-slabs-fy-2025-26', label: 'Income Tax Slabs FY 2025-26: New vs Old Regime Rates' },
    { href: '/blogs/itr-filing-last-date', label: 'ITR Filing Due Dates AY 2026-27: All Deadlines' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Related Reads</span>
      </div>
      {links.map((l, i) => (
        <Link key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', padding: '13px 16px', borderBottom: i < links.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: C.white }}>
          <span style={{ fontSize: 13, color: C.dark, fontWeight: 500, lineHeight: 1.5, display: 'block' }}>{l.label}</span>
        </Link>
      ))}
    </div>
  );
}

const POPULAR = [
  { href: '/calculators/income-tax-calculator', label: 'Income Tax Calculator' },
  { href: '/calculators/new-tax-regime-calculator', label: 'New Tax Regime Calculator' },
  { href: '/calculators/old-tax-regime-calculator', label: 'Old Tax Regime Calculator' },
  { href: '/calculators/section-80c-calculator', label: 'Section 80C Calculator' },
  { href: '/calculators/annual-appraisal-impact-calculator', label: 'Annual Appraisal Impact Calculator' },
  { href: '/calculators/in-hand-salary-calculator', label: 'In-Hand Salary Calculator' },
];
const MORE = [
  { href: '/calculators/section-80d-calculator', label: 'Section 80D Calculator' },
  { href: '/calculators/nps-tax-benefit-calculator', label: 'NPS Tax Benefit Calculator' },
  { href: '/calculators/gratuity-calculator', label: 'Gratuity Calculator' },
  { href: '/calculators/emi-calculator', label: 'EMI Calculator' },
];

/* ─── FAQ ─────────────────────────────────────────────────────── */
const faqItems = [
  {
    q: 'Is performance bonus taxed differently than salary in India?',
    a: "No. Performance bonuses are taxed as part of your total salary income under the Income Tax Act. The bonus is added to your annual salary and taxed at the applicable slab rate. There is no flat tax on bonuses in India. The marginal rate that applies depends on your total income including the bonus.",
  },
  {
    q: 'How is tax calculated on a performance bonus in India?',
    a: "Tax on a bonus is the difference between total tax with the bonus and total tax without the bonus. If your salary is Rs 12 lakh and your bonus is Rs 2 lakh, total income becomes Rs 14 lakh. The additional tax paid on the incremental Rs 2 lakh is the tax on your bonus. Under the new tax regime, this marginal slice typically falls in the 15 to 20 per cent slab for most salaried employees.",
  },
  {
    q: 'What is the tax rate on a bonus in India 2025-26?',
    a: "Bonuses are taxed at the marginal slab rate applicable to your total income. Under the new tax regime for FY 2025-26, the slabs are 5% on Rs 4-8 lakh, 10% on Rs 8-12 lakh, 15% on Rs 12-16 lakh, 20% on Rs 16-20 lakh, 25% on Rs 20-24 lakh, and 30% above Rs 24 lakh. A 4% health and education cess applies. The effective bonus tax rate depends on where in the slabs your bonus income falls.",
  },
  {
    q: 'How much tax will be deducted on a Rs 2 lakh bonus?',
    a: "It depends on your base salary. For a Rs 12 lakh salary with a Rs 2 lakh bonus (total Rs 14 lakh) under the new regime, the tax on the bonus is approximately Rs 26,000 to Rs 31,200 (about 13 to 15.6% effective rate on the bonus). Under the old regime with standard deduction and typical 80C investments, it is roughly Rs 20,800 to Rs 26,000.",
  },
  {
    q: 'Can I reduce tax on my performance bonus?',
    a: "Under the old tax regime, you can reduce taxable income through Section 80C (up to Rs 1.5 lakh), Section 80D (up to Rs 25,000-50,000), NPS under 80CCD(1B) (up to Rs 50,000), and home loan interest under Section 24(b). These deductions lower the slab your bonus falls into. Under the new regime, these deductions are not available, but the slabs are more favourable at lower income levels.",
  },
  {
    q: 'Is joining bonus taxed the same way as a performance bonus?',
    a: "Yes. A joining bonus is taxed exactly like a performance bonus. It is added to your total salary income for the financial year and taxed at the applicable slab rate. If the joining bonus is paid in one lump sum and you have no prior employer income for that year, your effective rate may be lower than if it were paid mid-year after months of regular salary.",
  },
  {
    q: 'Which tax regime is better for bonus income?',
    a: "The new regime is typically better for employees with fewer deductions and income up to Rs 15-20 lakh. For higher earners with full 80C utilisation, NPS contributions, home loan interest, and HRA exemptions, the old regime can save more tax even after the bonus. Use this calculator to compare both regimes by toggling the regime selector.",
  },
  {
    q: 'Does the standard deduction apply to bonus income?',
    a: "Yes. The standard deduction of Rs 75,000 under the new regime (or Rs 50,000 under the old regime) applies to total salary income including bonus. It is deducted once from your combined salary and bonus income before computing taxable income.",
  },
  {
    q: 'Is TDS deducted on bonus by the employer?',
    a: "Yes. Employers deduct TDS (Tax Deducted at Source) on bonus payments. The TDS is calculated by annualising the bonus income and applying the marginal tax rate for the projected annual income. You can cross-check your employer's TDS computation using this calculator and adjust your Form 16 expectations accordingly.",
  },
  {
    q: 'What is the effective tax rate on a bonus?',
    a: "The effective tax rate on a bonus is the tax amount attributable to the bonus divided by the gross bonus amount, expressed as a percentage. It reflects the marginal rate at which the bonus income is taxed given your total salary. For most employees earning Rs 10-20 lakh, the effective bonus tax rate ranges from 10 to 20 per cent under the new regime.",
  },
  {
    q: 'How does a Rs 15 lakh salary bonus affect income tax?',
    a: "If your base salary is Rs 15 lakh and you receive a 15% bonus of Rs 2.25 lakh, your total income is Rs 17.25 lakh. Under the new regime, the tax on the bonus (the incremental tax) is approximately Rs 35,100 to Rs 45,000 depending on the exact slab structure. The effective rate on just the bonus portion is roughly 15 to 20 per cent.",
  },
  {
    q: 'Can a bonus push me into a higher tax bracket in India?',
    a: "Yes. A bonus can push income across a slab boundary, causing a portion of the bonus to be taxed at a higher rate. For example, if your salary sits just below Rs 12 lakh and your bonus takes you above it, the portion above Rs 12 lakh faces a 15% rate under the new regime instead of 10%. This calculator shows the exact tax impact at any income level.",
  },
  {
    q: 'What is Fermor?',
    a: "Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give clear answers to real financial questions. The product is an automated financial action system that connects real financial accounts through the Account Aggregator framework to close the gap between knowing what you should do with your money and actually doing it. Fermor is not a comparison site. The calculators earn trust. The action platform is the product.",
  },
];

function FAQ() {
  return <FAQBox items={faqItems} />;
}

/* ─── CA CTA ──────────────────────────────────────────────────── */

/* ─── Main ─────────────────────────────────────────────────────── */
export default function PerformanceBonusClient({ region = 'in' }: { region?: string }) {
  const [mobile, setMobile] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [state, setState] = useState<State>(DEFAULTS);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk();
    window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  /* localStorage restore */
  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-performance-bonus-tax-v1');
      if (!s) return;
      const d = JSON.parse(s) as Partial<State>;
      setState(prev => ({
        annualSalary: typeof d.annualSalary === 'number' ? d.annualSalary : prev.annualSalary,
        bonusMode: d.bonusMode === 'amount' || d.bonusMode === 'percent' ? d.bonusMode : prev.bonusMode,
        bonusAmount: typeof d.bonusAmount === 'number' ? d.bonusAmount : prev.bonusAmount,
        bonusPercent: typeof d.bonusPercent === 'number' ? d.bonusPercent : prev.bonusPercent,
        regime: d.regime === 'old' || d.regime === 'new' ? d.regime : prev.regime,
        ded80C: typeof d.ded80C === 'number' ? d.ded80C : prev.ded80C,
        ded80D: typeof d.ded80D === 'number' ? d.ded80D : prev.ded80D,
      }));
    } catch { /* fail silently */ }
  }, []);

  /* localStorage save */
  useEffect(() => {
    try {
      localStorage.setItem('fermor-performance-bonus-tax-v1', JSON.stringify(state));
    } catch { /* ignore */ }
  }, [state]);

  const set = (patch: Partial<State>) => setState(prev => ({ ...prev, ...patch }));

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtC = (n: number) => formatCurrency(convertCurrency(n));

  /* Calculations */
  const bonus = state.bonusMode === 'percent'
    ? Math.round(state.annualSalary * state.bonusPercent / 100)
    : state.bonusAmount;

  const taxWithout = state.regime === 'old'
    ? calcOldRegimeTax(state.annualSalary, state.ded80C, state.ded80D)
    : calcNewRegimeTax(state.annualSalary);

  const taxWith = state.regime === 'old'
    ? calcOldRegimeTax(state.annualSalary + bonus, state.ded80C, state.ded80D)
    : calcNewRegimeTax(state.annualSalary + bonus);

  const taxOnBonus = Math.max(0, taxWith - taxWithout);
  const netBonus = bonus - taxOnBonus;
  const effectiveTaxRatePct = bonus > 0 ? (taxOnBonus / bonus) * 100 : 0;
  const keepPct = bonus > 0 ? Math.round((netBonus / bonus) * 100) : 100;

  /* Table styles */
  const thS: React.CSSProperties = {
    padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink,
    background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase',
    letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap',
  };
  const thR: React.CSSProperties = { ...thS, textAlign: 'right' };
  const tdL: React.CSSProperties = { padding: '10px 14px', fontSize: 13, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' };
  const tdR: React.CSSProperties = { padding: '10px 14px', fontSize: 13, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, textAlign: 'right', verticalAlign: 'top' };

  const inputPanel = (
    <div style={{ padding: mobile ? '24px 20px' : '28px 28px', borderRight: mobile ? 'none' : `1px solid ${C.border}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0, fontFamily: INTER }}>Salary &amp; Bonus</p>
        <CurrencySelector theme="light" />
      </div>

      {!showAdvanced ? (
        <>
          {/* Annual Salary */}
          <Slider
            label="Annual Base Salary / CTC"
            id="annual-salary"
            value={state.annualSalary}
            min={300000}
            max={50000000}
            step={50000}
            display={fmtC(state.annualSalary)}
            onChange={v => set({ annualSalary: v })}
          />

          {/* Bonus Input Mode toggle */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13.5, color: C.ink2, marginBottom: 10, fontFamily: INTER }}>Bonus Input Mode</div>
            <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
              {(['percent', 'amount'] as BonusInputMode[]).map(m => (
                <button
                  key={m}
                  onClick={() => set({ bonusMode: m })}
                  style={{
                    flex: 1, padding: '8px 12px', border: 'none',
                    background: state.bonusMode === m ? C.white : 'transparent',
                    color: state.bonusMode === m ? C.ink : C.ink3,
                    fontWeight: state.bonusMode === m ? 600 : 400,
                    cursor: 'pointer', fontFamily: INTER, fontSize: 13, transition: 'all 0.15s',
                  }}
                >
                  {m === 'percent' ? '% of Salary' : 'Fixed Amount'}
                </button>
              ))}
            </div>
          </div>

          {/* Conditional bonus input */}
          {state.bonusMode === 'percent' ? (
            <Slider
              label="Bonus Percentage"
              id="bonus-percent"
              value={state.bonusPercent}
              min={1}
              max={100}
              step={0.5}
              display={`${state.bonusPercent}%`}
              onChange={v => set({ bonusPercent: v })}
            />
          ) : (
            <Slider
              label="Bonus Amount"
              id="bonus-amount"
              value={state.bonusAmount}
              min={10000}
              max={10000000}
              step={10000}
              display={fmtC(state.bonusAmount)}
              onChange={v => set({ bonusAmount: v })}
            />
          )}

          {/* Regime toggle */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13.5, color: C.ink2, marginBottom: 10, fontFamily: INTER }}>Tax Regime</div>
            <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
              {(['new', 'old'] as Regime[]).map(r => (
                <button
                  key={r}
                  onClick={() => set({ regime: r })}
                  style={{
                    flex: 1, padding: '8px 12px', border: 'none',
                    background: state.regime === r ? C.white : 'transparent',
                    color: state.regime === r ? C.ink : C.ink3,
                    fontWeight: state.regime === r ? 600 : 400,
                    cursor: 'pointer', fontFamily: INTER, fontSize: 13, transition: 'all 0.15s',
                  }}
                >
                  {r === 'new' ? 'New Regime' : 'Old Regime'}
                </button>
              ))}
            </div>
          </div>

          {/* Derived bonus display */}
          {state.bonusMode === 'percent' && (
            <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 16px', marginBottom: 24 }}>
              <span style={{ fontSize: 12.5, color: C.ink2, fontFamily: INTER }}>
                Gross Bonus: <strong style={{ color: C.ink }}>{fmtC(bonus)}</strong>
              </span>
            </div>
          )}

          {/* More settings */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={() => setShowAdvanced(true)}
              style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: C.ink2, background: 'transparent', border: `1px solid ${C.border}`, borderRadius: 7, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, transition: 'all 0.15s' }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = '#AAAAAA'; }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; }}
            >
              More settings
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </>
      ) : (
        <>
          <div style={{ fontSize: 13, color: C.ink3, fontFamily: INTER, marginBottom: 20 }}>
            These deductions apply under the old tax regime only.
          </div>

          {/* Amber info box when regime is new */}
          {state.regime === 'new' && (
            <div style={{ background: '#FFF4E5', border: '1px solid #FFD8A8', borderRadius: 8, padding: '10px 14px', marginBottom: 20 }}>
              <span style={{ fontSize: 12.5, color: '#A15C00', fontWeight: 600, fontFamily: INTER }}>
                Under the new tax regime, Section 80C and 80D deductions are not available. Switch to Old Regime in basic settings to apply deductions.
              </span>
            </div>
          )}

          <Slider
            label="Section 80C Investments"
            id="ded-80c"
            value={state.ded80C}
            min={0}
            max={150000}
            step={10000}
            display={fmtC(state.ded80C)}
            onChange={v => set({ ded80C: v })}
          />
          <Slider
            label="Section 80D Premium"
            id="ded-80d"
            value={state.ded80D}
            min={0}
            max={100000}
            step={5000}
            display={fmtC(state.ded80D)}
            onChange={v => set({ ded80D: v })}
          />

          {/* Back button */}
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 16 }}>
            <button
              onClick={() => setShowAdvanced(false)}
              style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: C.ink2, background: 'transparent', border: `1px solid ${C.border}`, borderRadius: 7, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, transition: 'all 0.15s' }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = '#AAAAAA'; }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back
            </button>
          </div>
        </>
      )}
    </div>
  );

  const outputPanel = (
    <div style={{ padding: mobile ? '24px 20px' : '28px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
      {/* Dark result box */}
      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#50565C', fontFamily: INTER }}>Net Bonus In-Hand</div>
          <div style={{ fontSize: 12, color: '#7A8087', fontFamily: INTER }}>Tax on Bonus</div>
        </div>
        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
          <div aria-live="polite" aria-label={`Net Bonus In-Hand: ${fmtC(netBonus)}`} style={{ fontSize: 26, fontWeight: 800, color: '#1F7A58', lineHeight: 1, fontFamily: INTER }}>{fmtC(netBonus)}</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#101214', lineHeight: 1, fontFamily: INTER }}>{fmtC(taxOnBonus)}</div>
        </div>
      </div>

      {/* Stat rows */}
      {[
        { label: 'Gross Bonus Amount', val: fmtC(bonus) },
        { label: 'Tax on Bonus', val: fmtC(taxOnBonus) },
        { label: 'Net Bonus In-Hand', val: fmtC(netBonus) },
        { label: 'Effective Tax Rate on Bonus', val: `${effectiveTaxRatePct.toFixed(1)}%` },
        { label: 'Annual Salary (without bonus)', val: fmtC(state.annualSalary) },
        { label: 'Annual Income (with bonus)', val: fmtC(state.annualSalary + bonus) },
        { label: 'Tax without Bonus', val: fmtC(taxWithout) },
        { label: 'Tax with Bonus', val: fmtC(taxWith) },
      ].map(({ label, val }) => (
        <div key={label} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${C.border}`, gap: 12 }}>
          <span style={{ fontSize: 13, color: C.ink2, fontFamily: INTER }}>{label}</span>
          <span style={{ fontSize: 13.5, color: C.ink, fontWeight: 600, fontFamily: INTER, whiteSpace: 'nowrap' }}>{val}</span>
        </div>
      ))}

      {/* Donut chart - order -1 on desktop, 1 on mobile */}
      <div style={{ order: mobile ? 1 : -1, marginTop: mobile ? 24 : 0, marginBottom: mobile ? 0 : 18, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <DonutChart keepPct={keepPct} mobile={mobile} />
      </div>

      {/* Legend - order -1 on desktop */}
      <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 20, justifyContent: 'center', marginBottom: mobile ? 0 : 18, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: C.dark, flexShrink: 0 }} />
          <span style={{ fontSize: 12.5, color: C.ink2, fontFamily: INTER }}>You Keep ({keepPct}%)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: C.lime2, flexShrink: 0 }} />
          <span style={{ fontSize: 12.5, color: C.ink2, fontFamily: INTER }}>Tax on Bonus ({100 - keepPct}%)</span>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: INTER }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '24px 16px' : '32px 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 360px', gap: mobile ? 24 : 32, alignItems: 'start' }}>

          {/* Main content */}
          <div style={{ minWidth: 0 }}>
            <header style={{ marginBottom: 28 }}>
              <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em', fontFamily: INTER }}>
                Performance Bonus Tax Calculator
              </h1>
              <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800, fontFamily: INTER }}>
                See how much tax is deducted on your bonus, your net bonus in-hand, and the effective tax rate under the old or new regime.
              </p>
            </header>

            {/* Calculator card */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                {inputPanel}
                {outputPanel}
              </div>
            </div>

            <SaveResultsCard mobile={mobile} />


            <article itemScope itemType="https://schema.org/Article">

              <section id="what-is-bonus-tax-calculator" style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: mobile ? 20 : 22, fontWeight: 700, color: C.ink, margin: '0 0 14px', fontFamily: INTER }}>
                  What Is a Performance Bonus Tax Calculator?
                </h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0, fontFamily: INTER }}>
                    A performance bonus tax calculator computes how much income tax is deducted on your bonus by comparing your tax liability with and without the bonus, then showing your net bonus in-hand and the effective rate at which the bonus is taxed.
                  </p>
                </div>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px', fontFamily: INTER }}>
                  Bonuses are not taxed at a separate flat rate in India. The Income Tax Department, under Section 17(1) of the Income Tax Act, treats bonus income as part of salary. Your employer adds the bonus to your annual salary and deducts TDS accordingly.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: 0, fontFamily: INTER }}>
                  This calculator gives you three figures: the gross bonus before tax, the tax deducted on that bonus (the incremental tax), and the net amount that actually hits your bank account.
                </p>
              </section>

              <section id="how-bonus-taxed-india" style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: mobile ? 20 : 22, fontWeight: 700, color: C.ink, margin: '0 0 14px', fontFamily: INTER }}>
                  How Is Bonus Taxed in India?
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px', fontFamily: INTER }}>
                  Bonuses in India are taxed at the marginal slab rate applicable to total income. There is no separate TDS rate or flat rate for bonuses. Your employer projects your annual income including the bonus, computes the tax on the full year, and deducts the proportionate TDS from each salary payment or from the bonus payout itself.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 16px', fontFamily: INTER }}>
                  The table below shows indicative tax rates on a bonus at different salary levels under the new regime for FY 2025-26. Use the <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</Link> to verify your exact position.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 8 }}>
                  <table style={{ fontSize: 13, borderCollapse: 'collapse', width: '100%', minWidth: 520 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11.5, color: C.ink3, padding: '8px 0', textAlign: 'left', fontFamily: INTER }}>
                      Indicative effective bonus tax rate, new regime FY 2025-26. 15% bonus assumed. Cess included.
                    </caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Annual Salary (Rs)</th>
                        <th style={thR} scope="col">15% Bonus (Rs)</th>
                        <th style={thR} scope="col">Tax on Bonus (Rs)</th>
                        <th style={thR} scope="col">Effective Rate</th>
                        <th style={thR} scope="col">Net Bonus (Rs)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { sal: 600000, bonus: 90000, tax: 0, rate: 0 },
                        { sal: 1000000, bonus: 150000, tax: 0, rate: 0 },
                        { sal: 1200000, bonus: 180000, tax: 9360, rate: 5.2 },
                        { sal: 1500000, bonus: 225000, tax: 35100, rate: 15.6 },
                        { sal: 2000000, bonus: 300000, tax: 62400, rate: 20.8 },
                        { sal: 3000000, bonus: 450000, tax: 140400, rate: 31.2 },
                      ].map(row => (
                        <tr key={row.sal}>
                          <td style={tdL}>{row.sal.toLocaleString('en-IN')}</td>
                          <td style={tdR}>{row.bonus.toLocaleString('en-IN')}</td>
                          <td style={tdR}>{row.tax.toLocaleString('en-IN')}</td>
                          <td style={tdR}>{row.rate.toFixed(1)}%</td>
                          <td style={tdR}>{(row.bonus - row.tax).toLocaleString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="bonus-tax-old-vs-new-regime" style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: mobile ? 20 : 22, fontWeight: 700, color: C.ink, margin: '0 0 14px', fontFamily: INTER }}>
                  Bonus Tax in Old Regime vs New Regime
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px', fontFamily: INTER }}>
                  The new tax regime has lower slab rates but allows no deductions for Section 80C, 80D, or HRA. The old regime allows deductions up to Rs 2 lakh or more but has higher slab rates at most income levels.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 16px', fontFamily: INTER }}>
                  For most employees earning up to Rs 15 lakh, the new regime results in lower total tax. The effective rate on a bonus is lower under the new regime because the slab structure is flatter. Use the old vs new toggle in the calculator above to compare directly for your numbers.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 8 }}>
                  <table style={{ fontSize: 13, borderCollapse: 'collapse', width: '100%', minWidth: 440 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11.5, color: C.ink3, padding: '8px 0', textAlign: 'left', fontFamily: INTER }}>
                      New regime FY 2025-26 tax slabs with 4% cess. Standard deduction Rs 75,000.
                    </caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Income Slab (Taxable)</th>
                        <th style={thR} scope="col">New Regime Rate</th>
                        <th style={thR} scope="col">Old Regime Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { slab: 'Up to Rs 3,00,000 / Rs 2,50,000', nRate: '0%', oRate: '0%' },
                        { slab: 'Rs 3,00,000 to Rs 7,00,000', nRate: '5%', oRate: '5%' },
                        { slab: 'Rs 7,00,000 to Rs 10,00,000', nRate: '10%', oRate: '20%' },
                        { slab: 'Rs 10,00,000 to Rs 12,00,000', nRate: '15%', oRate: '20%' },
                        { slab: 'Rs 12,00,000 to Rs 15,00,000', nRate: '20%', oRate: '30%' },
                        { slab: 'Above Rs 15,00,000', nRate: '30%', oRate: '30%' },
                      ].map(row => (
                        <tr key={row.slab}>
                          <td style={tdL}>{row.slab}</td>
                          <td style={tdR}>{row.nRate}</td>
                          <td style={tdR}>{row.oRate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="worked-example" style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: mobile ? 20 : 22, fontWeight: 700, color: C.ink, margin: '0 0 14px', fontFamily: INTER }}>
                  How to Calculate Tax on Bonus: A Worked Example
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px', fontFamily: INTER }}>
                  Consider an employee with an annual salary of Rs 12 lakh who receives a Rs 2 lakh performance bonus in FY 2025-26. The table below shows the tax impact under both regimes. The old regime assumes full Rs 1.5 lakh 80C investment and Rs 25,000 80D premium.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 8 }}>
                  <table style={{ fontSize: 13, borderCollapse: 'collapse', width: '100%', minWidth: 480 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11.5, color: C.ink3, padding: '8px 0', textAlign: 'left', fontFamily: INTER }}>
                      Worked example: Rs 12 lakh salary, Rs 2 lakh bonus. Old regime deductions: 80C Rs 1.5L, 80D Rs 25K, standard Rs 50K.
                    </caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Item</th>
                        <th style={thR} scope="col">New Regime (Rs)</th>
                        <th style={thR} scope="col">Old Regime (Rs)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { item: 'Annual Salary', nVal: '12,00,000', oVal: '12,00,000' },
                        { item: 'Performance Bonus', nVal: '2,00,000', oVal: '2,00,000' },
                        { item: 'Total Income', nVal: '14,00,000', oVal: '14,00,000' },
                        { item: 'Standard Deduction', nVal: '75,000', oVal: '50,000' },
                        { item: '80C Deduction', nVal: 'Not applicable', oVal: '1,50,000' },
                        { item: '80D Deduction', nVal: 'Not applicable', oVal: '25,000' },
                        { item: 'Taxable Income', nVal: '13,25,000', oVal: '9,75,000' },
                        { item: 'Tax (before cess)', nVal: '1,43,750', oVal: '1,10,000' },
                        { item: 'Health and Education Cess (4%)', nVal: '5,750', oVal: '4,400' },
                        { item: 'Total Tax with Bonus', nVal: '1,49,500', oVal: '1,14,400' },
                        { item: 'Tax without Bonus', nVal: '93,600', oVal: '72,800' },
                        { item: 'Tax on Bonus', nVal: '55,900', oVal: '41,600' },
                        { item: 'Net Bonus In-Hand', nVal: '1,44,100', oVal: '1,58,400' },
                        { item: 'Effective Bonus Tax Rate', nVal: '27.95%', oVal: '20.8%' },
                      ].map(row => (
                        <tr key={row.item}>
                          <td style={tdL}>{row.item}</td>
                          <td style={tdR}>{row.nVal}</td>
                          <td style={tdR}>{row.oVal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ fontSize: 14, color: C.ink3, lineHeight: 1.7, margin: '10px 0 0', fontFamily: INTER }}>
                  Note: exact figures depend on your specific deductions and income. Run your actual numbers through the calculator above for a precise estimate.
                </p>
              </section>

              {/* In-Content Promo Bar */}
              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Income Tax Calculator</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Compare your old and new regime tax liability across all income slabs for the full year.</p>
                </div>
                <Link className="fx-btn" href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  Open calculator
                </Link>
              </div>

              <section id="joining-bonus-tax" style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: mobile ? 20 : 22, fontWeight: 700, color: C.ink, margin: '0 0 14px', fontFamily: INTER }}>
                  Joining Bonus and Annual Bonus: Tax Treatment
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px', fontFamily: INTER }}>
                  Joining bonuses and performance bonuses are taxed identically: both are added to salary income under Section 17(1) and taxed at the applicable slab rate. The timing within the financial year matters because it affects which slabs apply.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px', fontFamily: INTER }}>
                  A joining bonus paid in April (the start of a financial year) may result in lower TDS than one paid in February (near year-end), because the employer projects your full-year income and the joining month salary history is shorter. However, your total annual tax liability is the same regardless of when TDS was deducted.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: 0, fontFamily: INTER }}>
                  One practical difference: a clawback clause on joining bonuses (requiring repayment if you leave within a fixed period) does not make the bonus non-taxable at the time of receipt. If you repay the joining bonus in a future year, that repayment may be claimed as a deduction in the year of repayment under Section 89 relief, per guidance issued by the income tax department at <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>incometax.gov.in</a>.
                </p>
              </section>

              <section id="reduce-tax-on-bonus" style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: mobile ? 20 : 22, fontWeight: 700, color: C.ink, margin: '0 0 14px', fontFamily: INTER }}>
                  How to Reduce Tax on Your Bonus
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 16px', fontFamily: INTER }}>
                  There is no legal way to fully avoid tax on a bonus, but you can reduce the effective rate by increasing deductible investments before March 31 of the same financial year. Under the old regime, the most effective levers are:
                </p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, fontFamily: INTER }}>
                    <strong style={{ color: C.ink }}>Section 80C investments (up to Rs 1.5 lakh):</strong> ELSS mutual funds, PPF, EPF top-up, NSC, or life insurance premium. These directly reduce taxable income and shift the bonus into a lower slab.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, fontFamily: INTER }}>
                    <strong style={{ color: C.ink }}>Section 80D health insurance (up to Rs 25,000 to Rs 1 lakh):</strong> Premiums for yourself, spouse, and parents. Use the <Link href="/calculators/section-80d-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Section 80D Calculator</Link> to find your maximum eligible deduction.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, fontFamily: INTER }}>
                    <strong style={{ color: C.ink }}>NPS contribution under 80CCD(1B) (up to Rs 50,000):</strong> This deduction is over and above the Rs 1.5 lakh 80C limit, making it particularly valuable for employees in higher slabs.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, fontFamily: INTER }}>
                    <strong style={{ color: C.ink }}>Home loan interest under Section 24(b) (up to Rs 2 lakh):</strong> If you have a housing loan, the interest deduction can reduce taxable income significantly. Check the <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</Link> with your home loan details to see the combined impact.
                  </li>
                </ol>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: 0, fontFamily: INTER }}>
                  If you are on the new tax regime, none of the above deductions apply. Switching to the old regime may save tax if your deductions exceed approximately Rs 3 to 3.75 lakh annually, depending on your income level.
                </p>
              </section>

              <section id="how-to-use" style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: mobile ? 20 : 22, fontWeight: 700, color: C.ink, margin: '0 0 14px', fontFamily: INTER }}>
                  How to Use This Calculator
                </h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, fontFamily: INTER }}>
                    <strong style={{ color: C.ink }}>Set your annual salary:</strong> Use the "Annual Base Salary / CTC" slider to enter your total annual salary before the bonus.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, fontFamily: INTER }}>
                    <strong style={{ color: C.ink }}>Choose how to enter the bonus:</strong> Toggle between "% of Salary" to enter as a percentage, or "Fixed Amount" to enter the absolute bonus figure. The calculated gross bonus is shown below the toggle.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, fontFamily: INTER }}>
                    <strong style={{ color: C.ink }}>Select your tax regime:</strong> Toggle between New Regime (default from FY 2024-25) and Old Regime. The output panel updates instantly.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, fontFamily: INTER }}>
                    <strong style={{ color: C.ink }}>Add deductions (old regime only):</strong> Click "More settings" to enter Section 80C investments and Section 80D health insurance premium. These are ignored under the new regime.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, fontFamily: INTER }}>
                    <strong style={{ color: C.ink }}>Read the output:</strong> The result panel shows your net bonus in-hand, total tax on the bonus, the effective tax rate, and a donut chart showing how much of your bonus you keep.
                  </li>
                </ol>
              </section>

              

              <section id="faq" style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: mobile ? 20 : 22, fontWeight: 700, color: C.ink, margin: '0 0 20px', fontFamily: INTER }}>
                  Frequently Asked Questions
                </h2>
                <FAQ />
              </section>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0, fontFamily: INTER }}>
                  <strong>Disclaimer:</strong> All calculations on this page are indicative only. Tax on bonus is computed using standard slab rates and does not account for surcharge (applicable on income above Rs 50 lakh), marginal relief, or other specific exemptions. This calculator is for educational and planning purposes only and does not constitute financial or tax advice. Consult a SEBI-registered investment adviser or a Chartered Accountant before making financial decisions. Tax laws are subject to change per notifications from the Ministry of Finance at{' '}
                  <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark }}>incometax.gov.in</a>.
                </p>
              </div>

            </article>
          </div>

          {/* Sidebar */}
          <style>{`
            .pbt-sidebar::-webkit-scrollbar { width: 5px; }
            .pbt-sidebar::-webkit-scrollbar-track { background: transparent; }
            .pbt-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .pbt-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
            .pbt-sidebar > div > * { flex-shrink: 0; }
          `}</style>
          <aside
            className="pbt-sidebar"
            style={{
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <TaxSnapshot />
              <nav aria-label="Related Calculators" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <SidebarList title="Popular Calculators" items={POPULAR} />
                <SidebarList title="More Tools" items={MORE} />
              </nav>
              <RelatedReads />
            </div>
          </aside>
        </div>
      </div>

      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/income-tax-calculator|Income Tax', '/calculators/new-tax-regime-calculator|New Regime', '/calculators/old-tax-regime-calculator|Old Regime', '/calculators/in-hand-salary-calculator|In-Hand Salary', '/calculators/section-80c-calculator|Section 80C'] },
        { hd: 'Topics', links: ['/#|Tax Planning', '/#|Salary', '/#|Bonus', '/#|Investments'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

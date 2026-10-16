'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect } from 'react';
import Link from 'next/link';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { useCurrency } from '../../../src/hooks/useCurrency';
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

type Regime = 'old' | 'new';

/* ─── Tax functions ─────────────────────────────────────────── */
function calcOldRegimeTax(gross: number, ded80C: number, ded80D: number): number {
  const standardDed = 50000;
  const taxable = Math.max(0, gross - standardDed - Math.min(ded80C, 150000) - Math.min(ded80D, 50000));
  let tax = 0;
  if (taxable > 250000) tax += Math.min(taxable - 250000, 250000) * 0.05;
  if (taxable > 500000) tax += Math.min(taxable - 500000, 500000) * 0.20;
  if (taxable > 1000000) tax += (taxable - 1000000) * 0.30;
  if (taxable <= 500000) tax = 0; // 87A rebate
  return Math.round(tax * 1.04); // 4% cess
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
  if (taxable <= 1200000) tax = 0; // 87A rebate
  return Math.round(tax * 1.04);
}

/* ─── Slider ─────────────────────────────────────────────────── */
function Slider({ label, id, value, min, max, step, display, onChange, compact }: {
  label: string; id: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (v: number) => void; compact?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  const rangeId = `${id}-range`;
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 36 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 14 }}>
        <label htmlFor={editing ? id : rangeId} style={{ fontSize: compact ? 13.5 : 14, color: C.ink2, fontWeight: 400 }}>{label}</label>
        {editing ? (
          <input id={id} autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            aria-label={`Enter ${label} value`}
            style={{ fontSize: 14, fontWeight: 600, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 7, padding: compact ? '6px 10px' : '7px 12px', width: 130, outline: 'none', color: C.ink, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${display}. Click to edit.`}
            style={{ fontSize: compact ? 13 : 14, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: compact ? '5px 12px' : '6px 14px', cursor: 'pointer', fontFamily: INTER, minWidth: compact ? 88 : 110, textAlign: 'center', transition: 'border-color 0.15s' }}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}>
            {display}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 18, height: 18, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 1px 6px rgba(16,18,20,0.18)', pointerEvents: 'none', zIndex: 1 }} />
        <input id={rangeId} type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(+e.target.value)}
          aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">{min.toLocaleString('en-IN')}</span>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">{max.toLocaleString('en-IN')}</span>
      </div>
    </div>
  );
}

/* ─── Donut ──────────────────────────────────────────────────── */
function DonutChart({ keepPct }: { keepPct: number }) {
  const taxPct = 100 - keepPct;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const keepArc = (keepPct / 100) * circ;
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`You keep ${keepPct}% of the increment, ${taxPct}% goes to tax`}
      style={{ display: 'block' }}>
      {/* lime2 arc = tax portion */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      {/* dark arc = kept portion */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${keepArc} ${circ - keepArc}`}
        strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>You keep</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{keepPct}%</text>
    </svg>
  );
}

/* ─── Sidebar list ───────────────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
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
    </div>
  );
}

function TaxSnapshot() {
  const rows = [
    { label: 'Hike taxed at', value: 'Marginal rate' },
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
  { href: '/calculators/income-tax-calculator',          label: 'Income Tax Calculator' },
  { href: '/calculators/new-tax-regime-calculator',      label: 'New Tax Regime Calculator' },
  { href: '/calculators/old-tax-regime-calculator',      label: 'Old Tax Regime Calculator' },
  { href: '/calculators/section-80c-calculator',         label: 'Section 80C Calculator' },
  { href: '/calculators/section-80d-calculator',         label: 'Section 80D Calculator' },
  { href: '/calculators/in-hand-salary-calculator',      label: 'In-Hand Salary Calculator' },
];
const MORE = [
  { href: '/calculators/nps-tax-benefit-calculator',     label: 'NPS Tax Benefit Calculator' },
  { href: '/calculators/gratuity-calculator',            label: 'Gratuity Calculator' },
  { href: '/calculators/emi-calculator',                 label: 'EMI Calculator' },
  { href: '/calculators/ppf-calculator',                 label: 'PPF Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What is an annual appraisal impact calculator?',
    a: "An annual appraisal impact calculator shows the real take-home increase from a salary hike after accounting for income tax. When your CTC goes up, a portion of the increment falls in a higher tax slab, so the actual monthly benefit in your bank account is always lower than the gross increment. This calculator computes the exact tax on the increment and shows your effective monthly gain.",
  },
  {
    q: 'Why is my effective hike lower than the announced percentage?',
    a: "The announced hike percentage applies to your gross CTC. But your increment is taxed at the marginal rate, which is the rate applicable to the highest slice of your income. If your total income crosses Rs 10 lakh, the top portion is taxed at 30% plus 4% cess under the old regime. So a 15% hike on a Rs 12 lakh CTC adds Rs 1.8 lakh gross, but after 30% tax on the incremental slice, you actually pocket significantly less. The effective hike percentage is always lower than the announced figure.",
  },
  {
    q: 'How does a salary hike affect my income tax?',
    a: "A salary hike increases your taxable income. The additional tax depends entirely on which tax slab the increment falls into. Income between Rs 7 lakh and Rs 10 lakh (new regime) is taxed at 10 to 15%. Income above Rs 10 lakh gets taxed at higher rates up to 30%. Only the portion of the increment that crosses a slab boundary gets taxed at the higher rate. The tax on your pre-hike income stays the same.",
  },
  {
    q: "Should I choose old regime or new regime after an appraisal?",
    a: "The new tax regime is usually better after an appraisal if your 80C and 80D investments are small or fully utilized. If you have significant deductions (Rs 1.5 lakh in 80C, home loan interest, HRA), the old regime can still come out ahead. The key rule: if your total deductions and the standard deduction together exceed the regime's break-even point (roughly Rs 3.75 lakh in deductions for someone in the 30% slab), stick to old regime. Use this calculator with both regime options to compare.",
  },
  {
    q: 'How is tax calculated on a salary increment?',
    a: "Tax on the increment is calculated as the difference between your new CTC's annual tax and your current CTC's annual tax. Both figures are computed after applying the relevant standard deduction, Section 80C, and Section 80D deductions if you are on old regime. The difference is the additional tax you will pay because of the hike. Dividing this by 12 gives the monthly TDS increase.",
  },
  {
    q: 'What is the standard deduction in the new tax regime?',
    a: 'The standard deduction in the new tax regime is Rs 75,000 per year for salaried employees. Under the old regime, the standard deduction is Rs 50,000. The new regime does not allow additional deductions for 80C, 80D, HRA, or home loan interest beyond the standard deduction.',
  },
  {
    q: 'What is the Section 87A rebate and does it apply to my hike?',
    a: "The Section 87A rebate is a full tax waiver for incomes up to a certain threshold. Under the new tax regime, if your taxable income (after standard deduction) is Rs 12 lakh or below, you pay zero tax. Under the old regime, the rebate applies if taxable income is Rs 5 lakh or below. After an appraisal, if your income crosses these thresholds, you lose the rebate entirely and your tax jumps significantly. This calculator accounts for the 87A rebate correctly.",
  },
  {
    q: 'How do Section 80C and 80D deductions affect my post-appraisal tax?',
    a: 'Under the old regime, 80C allows up to Rs 1.5 lakh in deductions for ELSS, PPF, EPF, life insurance, and similar instruments. Section 80D allows up to Rs 25,000 for health insurance (Rs 50,000 for senior citizens). These deductions lower your taxable income, which reduces both the tax before and after the hike. If your investments already max out 80C, an additional rupee of income after the hike is fully taxable at your marginal rate.',
  },
  {
    q: 'What is the effective hike percentage after tax?',
    a: "The effective hike percentage is the net annual take-home benefit as a percentage of your current CTC. It is always lower than the announced hike. For example, if your CTC goes from Rs 12 lakh to Rs 13.8 lakh (a 15% hike) and Rs 45,000 of the Rs 1.8 lakh increment goes to tax, your net benefit is Rs 1.35 lakh. As a percentage of the original Rs 12 lakh CTC, that's an effective hike of 11.25%.",
  },
  {
    q: 'How does appraisal affect my monthly TDS?',
    a: "Your employer calculates TDS (Tax Deducted at Source) monthly based on your projected annual income. After an appraisal takes effect, the employer recalculates TDS from the effective month. The monthly TDS increases by approximately one-twelfth of the additional annual tax. This calculator shows both the annual additional tax and the monthly take-home change so you can plan your cash flow.",
  },
  {
    q: 'Can I negotiate my salary structure to reduce the tax on my hike?',
    a: "Yes. Requesting a higher component for tax-free allowances (LTA, meal coupons, NPS employer contribution) instead of raw basic pay can reduce the taxable portion of the increment. The employer's NPS contribution under Section 80CCD(2) is deductible up to 10% of basic salary under both regimes. Structuring the hike partly through NPS rather than basic can meaningfully reduce the tax bite on the increment.",
  },
  {
    q: 'What is the tax rate on increments above Rs 10 lakh (new regime)?',
    a: 'Under the new regime for FY 2025-26, income between Rs 12 lakh and Rs 16 lakh is taxed at 15%. Income between Rs 16 lakh and Rs 20 lakh is taxed at 20%. Income between Rs 20 lakh and Rs 24 lakh is taxed at 25%. Income above Rs 24 lakh is taxed at 30%. All tax is subject to 4% health and education cess. The calculator applies these slabs correctly to determine tax on the incremental income.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it. Fermor is not a comparison site. The calculators earn trust. The action platform is the product.',
  },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ─── CA CTA ─────────────────────────────────────────────────── */

/* ─── Main ───────────────────────────────────────────────────── */
export default function AnnualAppraisalClient({ region = 'in' }: { region?: string }) {
  const [mobile, setMobile]           = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // State
  const [currentCTC,  setCurrentCTC]  = useState(1200000);
  const [hikePercent, setHikePercent] = useState(15);
  const [regime,      setRegime]      = useState<Regime>('new');
  const [ded80C,      setDed80C]      = useState(150000);
  const [ded80D,      setDed80D]      = useState(25000);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  // localStorage restore
  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-annual-appraisal-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (typeof d.currentCTC === 'number') setCurrentCTC(d.currentCTC);
      if (typeof d.hikePercent === 'number') setHikePercent(d.hikePercent);
      if (d.regime === 'old' || d.regime === 'new') setRegime(d.regime);
      if (typeof d.ded80C === 'number') setDed80C(d.ded80C);
      if (typeof d.ded80D === 'number') setDed80D(d.ded80D);
    } catch { /* fail silently */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // localStorage save
  useEffect(() => {
    try {
      localStorage.setItem('fermor-annual-appraisal-v1', JSON.stringify({ currentCTC, hikePercent, regime, ded80C, ded80D }));
    } catch { /* ignore */ }
  }, [currentCTC, hikePercent, regime, ded80C, ded80D]);

  // Core calculation
  const result = useMemo(() => {
    const newCTC = Math.round(currentCTC * (1 + hikePercent / 100));
    const increment = newCTC - currentCTC;
    const oldTax = regime === 'old'
      ? calcOldRegimeTax(currentCTC, ded80C, ded80D)
      : calcNewRegimeTax(currentCTC);
    const newTax = regime === 'old'
      ? calcOldRegimeTax(newCTC, ded80C, ded80D)
      : calcNewRegimeTax(newCTC);
    const additionalTax = newTax - oldTax;
    const netAnnualBenefit = increment - additionalTax;
    const monthlyBenefit = Math.round(netAnnualBenefit / 12);
    const effectiveHikePct = (netAnnualBenefit / currentCTC) * 100;
    const taxOnIncrementPct = additionalTax > 0 && increment > 0 ? Math.round((additionalTax / increment) * 100) : 0;
    const keepPct = increment > 0 ? Math.max(0, Math.min(100, Math.round((netAnnualBenefit / increment) * 100))) : 100;
    return {
      newCTC,
      increment,
      oldTax,
      newTax,
      additionalTax,
      netAnnualBenefit,
      monthlyBenefit,
      effectiveHikePct,
      taxOnIncrementPct,
      keepPct,
      currentTakeHome: currentCTC - oldTax,
      newTakeHome: newCTC - newTax,
    };
  }, [currentCTC, hikePercent, regime, ded80C, ded80D]);

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
            Annual Appraisal Impact Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            See how much of your salary hike actually reaches your bank account after income tax. Compare old and new regime, see monthly take-home increase, and your effective hike percentage.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <section aria-label="Annual Appraisal Impact Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

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
                      <Slider label="Current Annual CTC" id="appraisal-ctc" value={currentCTC} min={300000} max={50000000} step={50000}
                        display={fmtC(currentCTC)} onChange={setCurrentCTC} compact={mobile} />

                      <Slider label="Appraisal Hike" id="appraisal-hike" value={hikePercent} min={1} max={100} step={0.5}
                        display={`${hikePercent}%`} onChange={setHikePercent} compact={mobile} />

                      {/* Tax Regime Toggle */}
                      <div style={{ marginBottom: mobile ? 18 : 28 }}>
                        <p style={{ fontSize: 14, color: C.ink2, fontWeight: 400, margin: '0 0 10px' }}>Tax Regime</p>
                        <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                          {(['new', 'old'] as const).map(r => (
                            <button key={r} onClick={() => setRegime(r)}
                              aria-pressed={regime === r}
                              style={{
                                flex: 1, padding: '9px 0', border: 'none',
                                background: regime === r ? C.white : 'transparent',
                                color: regime === r ? C.ink : C.ink3,
                                fontSize: 13, fontWeight: regime === r ? 600 : 400,
                                cursor: 'pointer', fontFamily: INTER, transition: 'all 0.15s',
                              }}>
                              {r === 'new' ? 'New Regime' : 'Old Regime'}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* New CTC derived display */}
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', marginBottom: 24 }}>
                        <span style={{ fontSize: 12.5, color: C.ink3, fontFamily: INTER }}>
                          New CTC after hike: <strong style={{ color: C.ink }}>{fmtIN(result.newCTC)}</strong>
                          <span style={{ marginLeft: 6, color: C.ink2 }}>({fmtIN(result.increment)} increase)</span>
                        </span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button onClick={() => setShowAdvanced(true)}
                          style={{ fontSize: 12, fontWeight: 700, color: C.ink2, background: 'none', border: `1px solid ${C.border}`, borderRadius: 7, padding: '6px 14px', cursor: 'pointer', fontFamily: INTER, display: 'flex', alignItems: 'center', gap: 5 }}>
                          More settings
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {regime === 'old' ? (
                        <>
                          <Slider label="Section 80C Investments" id="appraisal-80c" value={ded80C} min={0} max={150000} step={10000}
                            display={fmtC(ded80C)} onChange={setDed80C} compact={mobile} />
                          <Slider label="Section 80D Premium" id="appraisal-80d" value={ded80D} min={0} max={100000} step={5000}
                            display={fmtC(ded80D)} onChange={setDed80D} compact={mobile} />
                        </>
                      ) : (
                        <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.ink3}`, borderRadius: 8, padding: '14px 16px', marginBottom: 24 }}>
                          <p style={{ fontSize: 13.5, color: C.ink2, margin: 0, lineHeight: 1.6, fontFamily: INTER }}>
                            80C and 80D deductions are not available under the new tax regime. Switch to old regime to enter deductions.
                          </p>
                        </div>
                      )}

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
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

                  {/* Primary: monthly benefit */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 8 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                      <div style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Monthly Take-Home Increase</div>
                      <div style={{ fontSize: mobile ? 12 : 13, color: '#7A8087' }}>{regime === 'new' ? 'New Regime' : 'Old Regime'}</div>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                      <div
                        style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', lineHeight: 1 }}
                        aria-live="polite"
                        aria-label={`Monthly take-home increase: ${fmtIN(result.monthlyBenefit)}`}>
                        {fmtIN(result.monthlyBenefit)}
                      </div>
                      <div style={{ fontSize: mobile ? 12 : 13, fontWeight: 600, color: '#101214', lineHeight: 1 }}>
                        {fmtIN(result.netAnnualBenefit)} per year
                      </div>
                    </div>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: 'Current CTC', value: fmtIN(currentCTC) },
                    { label: 'New CTC', value: fmtIN(result.newCTC) },
                    { label: 'Current Annual Tax', value: fmtIN(result.oldTax) },
                    { label: 'New Annual Tax', value: fmtIN(result.newTax) },
                    { label: 'Tax on Increment', value: fmtIN(result.additionalTax) },
                    { label: `Effective Hike`, value: `${result.effectiveHikePct.toFixed(1)}% (vs ${hikePercent}% announced)` },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '9px 0' : '11px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12 : 13, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12 : 13.5, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  {/* Donut: order -1 on desktop = top, order 1 on mobile = below stats */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 0, order: mobile ? 1 : -1 }}>
                    <DonutChart keepPct={result.keepPct} />
                  </div>

                  {/* Legend: order -1 on desktop, order 2 on mobile */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 4, order: mobile ? 2 : -1, width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>You keep {result.keepPct}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Tax {result.taxOnIncrementPct}%</span>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* WaitlistCard + CA CTA */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>


            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              {/* 1. What Is */}
              <div style={sec}>
                <h2 style={h2} id="what-is-appraisal-impact">What Is an Annual Appraisal Impact Calculator?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    An annual appraisal impact calculator computes the actual monthly take-home increase from a salary hike after income tax. It separates the announced gross hike from the net amount that reaches your bank account, showing exactly how much of the increment goes to taxes.
                  </p>
                </div>
                <p style={p}>
                  Every appraisal season in India, employees receive a hike percentage. The number sounds straightforward: a 15% hike on a Rs 12 lakh CTC means a Rs 1.8 lakh annual increase. But the Rs 1.8 lakh falls into your marginal tax slab, not your average slab. If you are in the 30% band, Rs 54,000 of that increment goes directly to the government. Your real monthly benefit is not Rs 15,000 but closer to Rs 10,500.
                </p>
                <p style={p}>
                  This calculator applies the correct Indian tax tables (FY 2025-26) under both the old and new tax regimes to give you the real number. Use the{' '}
                  <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</Link>{' '}
                  to see your full annual liability, and this tool to understand the incremental impact of your appraisal specifically.
                </p>
              </div>

              {/* 2. How hike affects tax */}
              <div style={sec}>
                <h2 style={h2} id="how-hike-affects-tax">How a Salary Hike Affects Your Income Tax</h2>
                <p style={p}>
                  A salary hike increases your total taxable income, and the additional income is taxed at the marginal rate, not your average rate. Marginal rate is the rate applicable to the last rupee of your income: the slab your total income falls into at the top.
                </p>
                <p style={p}>
                  Under the new regime for FY 2025-26, the slabs that apply to increments are:
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>
                      New Regime Tax Slabs FY 2025-26. Standard deduction Rs 75,000 applies. Tax on slabs above Rs 12 lakh taxable.
                    </caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Taxable Income Range</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Tax Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Up to Rs 4 lakh', '0%'],
                        ['Rs 4 lakh to Rs 8 lakh', '5%'],
                        ['Rs 8 lakh to Rs 12 lakh', '10%'],
                        ['Rs 12 lakh to Rs 16 lakh', '15%'],
                        ['Rs 16 lakh to Rs 20 lakh', '20%'],
                        ['Rs 20 lakh to Rs 24 lakh', '25%'],
                        ['Above Rs 24 lakh', '30%'],
                      ].map(([range, rate]) => (
                        <tr key={range}>
                          <td style={tdL}>{range}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{rate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  All figures are subject to 4% health and education cess. Incomes up to Rs 12 lakh taxable (after standard deduction of Rs 75,000, so gross income up to Rs 12.75 lakh) attract zero tax under the Section 87A rebate in the new regime.
                </p>
              </div>

              {/* 3. Effective vs announced */}
              <div style={sec}>
                <h2 style={h2} id="effective-vs-announced-hike">Why Your Effective Hike Is Less Than the Announced Percentage</h2>
                <p style={p}>
                  The effective hike is always lower than the announced percentage because the increment is taxed at the marginal rate while the entire CTC is compared. Consider this worked example:
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>
                      Example: Rs 12 lakh CTC, 15% hike, new tax regime FY 2025-26. Annual figures.
                    </caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Item</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Before Appraisal</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">After Appraisal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Annual CTC', 'Rs 12,00,000', 'Rs 13,80,000'],
                        ['Gross Increment', '', 'Rs 1,80,000'],
                        ['Annual Income Tax', 'Rs 42,500', 'Rs 81,100'],
                        ['Additional Tax on Increment', '', 'Rs 38,600'],
                        ['Net Annual Take-Home', 'Rs 11,57,500', 'Rs 12,98,900'],
                        ['Net Monthly Take-Home Increase', '', 'Rs 11,783'],
                        ['Announced Hike', '15.0%', ''],
                        ['Effective Hike (after tax)', '11.7%', ''],
                      ].map(([item, before, after]) => (
                        <tr key={item}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{item}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{before}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{after}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The announced hike is 15%. The effective hike, after the Rs 38,600 additional tax, is approximately 11.7%. The gap between the two is entirely due to income tax on the incremental income.
                </p>
              </div>

              {/* 4. Tax slab */}
              <div style={sec}>
                <h2 style={h2} id="tax-slab-and-hike">How Your Tax Slab Determines the Real Value of Your Hike</h2>
                <p style={p}>
                  The higher your current CTC, the more of your increment falls in the higher tax slabs, and the smaller your effective hike. An employee earning Rs 6 lakh CTC gets most of a 15% hike at zero or 5%, while an employee earning Rs 20 lakh loses 20-25% of the increment to tax.
                </p>
                <p style={p}>
                  For this reason, two employees with the same announced hike percentage can have very different effective hikes depending on where their income lands in the slab structure.
                </p>
                <p style={p}>
                  Use the{' '}
                  <Link href="/calculators/new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>New Tax Regime Calculator</Link>{' '}
                  to see your marginal slab clearly, or the{' '}
                  <Link href="/calculators/old-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Old Tax Regime Calculator</Link>{' '}
                  if you have significant deductions. Your marginal rate is the percentage to apply to any new income, including the increment from an appraisal.
                </p>
              </div>

              {/* 5. Old vs new */}
              <div style={sec}>
                <h2 style={h2} id="old-vs-new-regime-hike">Old Regime vs New Regime After an Appraisal</h2>
                <p style={p}>
                  After an appraisal, the question of regime choice becomes more pressing because the higher income may change the break-even point. The old regime allows deductions (80C, 80D, HRA, home loan) that reduce taxable income. The new regime offers lower slab rates but no additional deductions beyond the Rs 75,000 standard deduction.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>
                      Old Regime deduction limits applicable when you opt for old tax regime.
                    </caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Deduction</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Section</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Maximum Limit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Standard Deduction', '16(ia)', 'Rs 50,000'],
                        ['ELSS, PPF, LIC, ULIP, EPF, tuition', '80C', 'Rs 1,50,000'],
                        ['Health Insurance (self + family)', '80D', 'Rs 25,000 (Rs 50,000 for seniors)'],
                        ['NPS employer contribution', '80CCD(2)', '10% of basic salary'],
                        ['Home Loan Interest', '24(b)', 'Rs 2,00,000 (self-occupied)'],
                        ['HRA exemption', '10(13A)', 'Least of: actual HRA, 50%/40% of basic, rent minus 10% basic'],
                      ].map(([ded, section, limit]) => (
                        <tr key={ded}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{ded}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{section}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{limit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The general rule: if your deductions under the old regime total more than Rs 3.75 lakh (at the 30% slab) or more than Rs 1.87 lakh (at the 15% new-regime slab), the old regime saves more tax. Below these thresholds, the new regime wins. Toggle the regime in this calculator to compare your specific situation.
                </p>
              </div>

              {/* 6. TDS */}
              <div style={sec}>
                <h2 style={h2} id="appraisal-tds">How Appraisal Affects Your Monthly TDS</h2>
                <p style={p}>
                  TDS (Tax Deducted at Source) is deducted monthly by your employer based on your projected annual income and the regime you have declared. After an appraisal, the employer recalculates TDS from the month the revised salary is effective.
                </p>
                <p style={p}>
                  The additional monthly TDS is approximately one-twelfth of the additional annual tax. If your appraisal adds Rs 48,000 in annual tax, your monthly TDS increases by Rs 4,000. The actual deduction depends on how many months remain in the financial year when the hike takes effect, since the employer spreads remaining tax across the balance months.
                </p>
                <p style={p}>
                  If your appraisal is effective from October, the employer needs to recover the additional tax for the full year from October to March. That means higher-than-expected monthly TDS deductions for six months. Plan your liquid cash for the months immediately after the hike letter, not just the month after the increment credit.
                </p>
              </div>

              {/* In-Content Promo Bar */}
              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Income Tax Calculator</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>See your full annual tax liability under both regimes, including all deductions and surcharges.</p>
                </div>
                <Link className="fx-btn" href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
              </div>

              {/* 7. Maximize take-home */}
              <div style={sec}>
                <h2 style={h2} id="maximize-take-home">How to Maximize Take-Home After an Appraisal</h2>
                <p style={p}>
                  Three strategies reduce the tax cost on your increment without reducing your gross income.
                </p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Request an NPS employer contribution:</strong> Under Section 80CCD(2), your employer can contribute up to 10% of basic salary to your NPS account. This deduction is available under both old and new regimes, reducing taxable income without touching your 80C limit.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Restructure the increment toward flexible pay components:</strong> LTA (Leave Travel Allowance) is exempt up to actual travel expenditure twice in four years. Meal coupons are exempt up to Rs 50 per meal. Food coupons (sodexo-style) reduce taxable pay. Negotiate these components into the revised pay structure.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Maximize 80C before year-end if on old regime:</strong> ELSS investments can be made as late as March 31. A Rs 1.5 lakh 80C investment at 30% marginal rate saves Rs 46,800 in tax. Time the investment to offset the additional tax from the increment.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Compare regimes with the new income level:</strong> The break-even point shifts when your income rises. What was optimal last year may no longer be optimal after the hike. Use this calculator to test both regimes at your new CTC.
                  </li>
                </ol>
                <p style={p}>
                  The{' '}
                  <Link href="/calculators/section-80c-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Section 80C Calculator</Link>{' '}
                  shows which instruments to invest in to maximize your deduction, and the{' '}
                  <Link href="/calculators/section-80d-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Section 80D Calculator</Link>{' '}
                  covers health insurance premium planning for the old regime.
                </p>
              </div>

              {/* 8. How to use */}
              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter your current annual CTC:</strong> Use the slider or click the value to type. Enter the CTC before the appraisal.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set your hike percentage:</strong> Enter the announced hike percentage from your appraisal letter (e.g., 15%). The calculator shows your new CTC immediately.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select your tax regime:</strong> Toggle between old regime and new regime. The result updates instantly. If you are on old regime, click More settings to enter your 80C and 80D investments.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Read the result panel:</strong> The large lime number is your monthly take-home increase. Below it: tax on the increment, effective hike percentage, and the donut chart showing what fraction of the gross increment you actually keep.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Compare regimes:</strong> Toggle between old and new regime to see which gives you a higher effective take-home at your new income level. The calculator recalculates both tax amounts and the net benefit instantly.
                  </li>
                </ol>
              </div>

              

              {/* 9. FAQ */}
              <div style={sec}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              {/* Disclaimer */}
              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All calculations on this page are indicative only and based on FY 2025-26 tax slabs. Tax laws change each year with the Union Budget. Actual tax liability depends on your full income, deductions, exemptions, and HRA structure. This calculator does not account for surcharges applicable above Rs 50 lakh or Rs 1 crore income, NPS employer contribution deductions, or other regime-specific nuances. Consult a SEBI-registered investment adviser or qualified CA before making financial decisions.
                </p>
              </div>

            </article>
          </div>

          {/* ── SIDEBAR ── */}
          <style>{`.aa-sidebar::-webkit-scrollbar{width:5px}.aa-sidebar::-webkit-scrollbar-track{background:transparent}.aa-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.aa-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside
            className="aa-sidebar"
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

      {/* ── FOOTER ── */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/income-tax-calculator|Income Tax', '/calculators/new-tax-regime-calculator|New Regime', '/calculators/old-tax-regime-calculator|Old Regime', '/calculators/in-hand-salary-calculator|In-Hand Salary', '/calculators/section-80c-calculator|Section 80C'] },
        { hd: 'Topics', links: ['/#|Tax Planning', '/#|Salary', '/#|Investments', '/#|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

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

/* ─── Tax Calculation ─────────────────────────────────────────── */
function calcTaxOld(income: number, d80C: number, d80CCD1B: number, d80D: number, homeLoanInt: number, ageGroup: string): number {
  const standardDed = 50000;
  const totalDed = standardDed + Math.min(d80C, 150000) + Math.min(d80CCD1B, 50000) + Math.min(d80D, 25000) + Math.min(homeLoanInt, 200000);
  const taxable = Math.max(0, income - totalDed);
  
  let basicExemption = 250000;
  if (ageGroup === 'senior') basicExemption = 300000;
  else if (ageGroup === 'superSenior') basicExemption = 500000;
  
  let tax = 0;
  if (ageGroup === 'superSenior') {
    // 0-5L: 0%, 5L-10L: 20%, above 10L: 30%
    if (taxable > 500000) tax += (Math.min(taxable, 1000000) - 500000) * 0.20;
    if (taxable > 1000000) tax += (taxable - 1000000) * 0.30;
  } else if (ageGroup === 'senior') {
    // 0-3L: 0%, 3L-5L: 5%, 5L-10L: 20%, above 10L: 30%
    if (taxable > 300000) tax += (Math.min(taxable, 500000) - 300000) * 0.05;
    if (taxable > 500000) tax += (Math.min(taxable, 1000000) - 500000) * 0.20;
    if (taxable > 1000000) tax += (taxable - 1000000) * 0.30;
  } else {
    // below60: 0-2.5L: 0%, 2.5L-5L: 5%, 5L-10L: 20%, above 10L: 30%
    if (taxable > 250000) tax += (Math.min(taxable, 500000) - 250000) * 0.05;
    if (taxable > 500000) tax += (Math.min(taxable, 1000000) - 500000) * 0.20;
    if (taxable > 1000000) tax += (taxable - 1000000) * 0.30;
  }
  
  // Section 87A rebate for Old Regime (income <= 5L, tax becomes nil)
  if (taxable <= 500000) tax = 0;
  
  return Math.round(tax * 1.04);
}

/* ─── Slider ─────────────────────────────────────────────────── */
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

/* ─── Age Category toggle ─────────────────────────────────────── */
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

/* ─── Donut Chart ─────────────────────────────────────────────── */
function DonutChart({ savedPct }: { savedPct: number }) {
  const paidPct = 100 - savedPct;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const sArc = (savedPct / 100) * circ;
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Tax saved ${savedPct.toFixed(0)}% of total tax without 80C, tax paid ${paidPct.toFixed(0)}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${sArc} ${circ - sArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Saved</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{savedPct.toFixed(0)}%</text>
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
  { href: '/calculators/old-tax-regime-calculator',       label: 'Old Tax Regime Calculator' },
  { href: '/calculators/new-tax-regime-calculator',       label: 'New Tax Regime Calculator' },
  { href: '/calculators/old-vs-new-tax-regime-calculator', label: 'Old vs New Tax Regime' },
  { href: '/calculators/in-hand-salary-calculator',        label: 'In-Hand Salary Calculator' },
  { href: '/calculators/hra-calculator',                   label: 'HRA Calculator' },
  { href: '/calculators/nps-calculator',                   label: 'NPS Calculator' },
];
const MORE = [
  { href: '/calculators/ppf-calculator',                   label: 'PPF Calculator' },
  { href: '/calculators/elss-calculator',                  label: 'ELSS Calculator' },
  { href: '/calculators/epf-calculator',                   label: 'EPF Calculator' },
  { href: '/calculators/nsc-calculator',                   label: 'NSC Calculator' },
  { href: '/calculators/ssy-calculator',                   label: 'Sukanya Samriddhi Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
const FAQS = [
  { q: 'What is Section 80C of the Income Tax Act?', a: 'Section 80C of the Income Tax Act, 1961 allows individual taxpayers to claim a deduction of up to Rs 1.5 lakh per financial year for specified investments and expenses including EPF, PPF, ELSS, NSC, tax-saving fixed deposits, life insurance premiums, Sukanya Samriddhi Yojana, tuition fees for children, and principal repayment of home loans. The deduction is only available under the old tax regime.' },
  { q: 'What is the maximum deduction under Section 80C?', a: 'The maximum deduction under Section 80C is Rs 1.5 lakh (Rs 1,50,000) per financial year. This limit covers all 80C-eligible investments and expenses combined. An additional Rs 50,000 deduction is available under Section 80CCD(1B) for NPS contributions, taking the total potential deduction from retirement contributions to Rs 2 lakh.' },
  { q: 'Which investments are eligible under Section 80C?', a: 'Eligible investments under Section 80C include EPF, PPF, ELSS, tax-saving fixed deposits with 5-year lock-in, NSC, life insurance premiums, Sukanya Samriddhi Yojana, Senior Citizens Savings Scheme, 5-year post office time deposit, and principal repayment of home loan. Tuition fees for up to two children are also eligible. Each instrument has its own lock-in period and return profile.' },
  { q: 'Can I claim Section 80C deduction under the new tax regime?', a: 'No. Section 80C deductions are not available under the new tax regime. The Section 80C deduction is only available under the old tax regime, which allows taxpayers to claim deductions for specified investments and expenses up to Rs 1.5 lakh per year.' },
  { q: 'What is Section 80CCD(1B) and how is it different from 80C?', a: 'Section 80CCD(1B) is an additional deduction specifically for NPS contributions, over and above the Rs 1.5 lakh limit of Section 80C. You can claim up to Rs 50,000 per year. Combined with Section 80C, an individual investing in NPS can claim total deductions of up to Rs 2 lakh per year. It is only available under the old tax regime.' },
  { q: 'How much tax can I save by investing Rs 1.5 lakh under Section 80C?', a: 'The tax saved depends on your marginal tax rate. At the 5% slab, investing Rs 1.5 lakh saves Rs 7,800 (including 4% cess). At the 20% slab, it saves Rs 31,200. At the 30% slab, it saves Rs 46,800. If you also claim Rs 50,000 under Section 80CCD(1B), the total saving at the 30% slab increases to Rs 62,400.' },
  { q: 'What is the lock-in period for ELSS under Section 80C?', a: 'ELSS has the shortest lock-in period among all Section 80C investments at just 3 years, making it the most liquid 80C-eligible option. After 3 years, you can withdraw the entire amount with no further lock-in. Historically, ELSS has delivered 10-15% CAGR over long periods, though returns are market-linked and not guaranteed.' },
  { q: 'Can I claim home loan principal repayment under Section 80C?', a: 'Yes, the principal portion of your home loan EMI qualifies for deduction under Section 80C, subject to the overall limit of Rs 1.5 lakh. This is separate from the interest deduction under Section 24(b), which allows up to Rs 2 lakh for self-occupied property. To claim principal repayment, you must not transfer the property within 5 years of possession.' },
  { q: 'Is PPF a good investment for Section 80C tax saving?', a: 'PPF is one of the most popular Section 80C investments because it offers a government-guaranteed return (currently 7.1%), tax-free interest, and tax-free maturity proceeds under the EEE category. The lock-in period is 15 years with partial withdrawals allowed from year 7. PPF interest is set by the government quarterly along with other small savings schemes.' },
  { q: 'Does tuition fee for children qualify under Section 80C?', a: 'Yes, tuition fees paid for the education of up to two children qualify for deduction under Section 80C. This includes fees paid to any school, college, university, or educational institution in India. The deduction is limited to actual fees paid, not exceeding the overall Section 80C limit of Rs 1.5 lakh. Admission fees and examination fees are included, but donations or capitation fees are not eligible.' },
  { q: 'What happens if I invest more than Rs 1.5 lakh under Section 80C?', a: 'If your total 80C-eligible investments and expenses exceed Rs 1.5 lakh, the excess amount does not qualify for any additional tax deduction. The deduction is capped at Rs 1.5 lakh regardless of how much you invest above this limit. Any surplus investments still earn their regular returns but provide no extra tax benefit.' },
  { q: 'Can NRIs claim Section 80C deductions?', a: 'Yes, NRIs can claim Section 80C deductions on their income that is taxable in India. Eligible investments include NRE/NRO fixed deposits with 5-year lock-in, life insurance policies issued in India, PPF (if opened while resident), and EPF contributions. Tuition fees paid for children in Indian institutions also qualify.' },
  { q: 'What is the difference between Section 80C and 80G?', a: 'Section 80C provides deductions for investments and specified expenses like PPF, ELSS, and tuition fees up to Rs 1.5 lakh per year. Section 80G provides deductions for donations made to specified charitable funds and institutions, with varying deduction rates of 50% or 100% and qualifying limits. Unlike 80C, 80G donations have no overall cap of Rs 1.5 lakh, but individual donation limits apply based on the specific fund.' },
  { q: 'Which investment is best under Section 80C?', a: 'The best Section 80C investment depends on your time horizon and risk appetite. PPF and tax-saving fixed deposits suit guaranteed returns, while ELSS suits long-term equity exposure with the shortest 3-year lock-in. Compare each option against your goal before choosing.' },
  { q: 'Can I claim Section 80C for both EPF and PPF in the same year?', a: 'Yes, you can invest in EPF and PPF together, but the combined deduction is capped at Rs 1.5 lakh. Your EPF contribution usually uses up part of the limit before you invest anything else. Check your salary slip to see how much is already covered.' },
  { q: 'Is life insurance premium eligible under Section 80C?', a: 'Yes, life insurance premiums qualify under Section 80C within limits. For policies issued after 1 April 2012, the premium must not exceed 10 per cent of the sum assured. Term plans, endowment plans and ULIPs can all qualify if the condition is met.' },
  { q: 'Is a 5-year tax-saving fixed deposit eligible under Section 80C?', a: 'Yes, a 5-year tax-saving fixed deposit with a bank or post office qualifies under Section 80C. The deposit is locked in for 5 years with no premature withdrawal. The interest earned is fully taxable each year.' },
  { q: 'Can I claim Section 80C for my spouse or children?', a: 'Yes, for certain investments made in their names. PPF, life insurance and Sukanya Samriddhi deposits for your spouse or children qualify, and so do tuition fees for up to two children. Investments made for your parents do not qualify.' },
  { q: 'Is Sukanya Samriddhi Yojana eligible under Section 80C?', a: 'Yes, deposits into a Sukanya Samriddhi account qualify under Section 80C. The account is opened for a girl child, and deposits are allowed up to Rs 1.5 lakh a year. The interest and maturity amount are tax-free.' },
  { q: 'Does my employer EPF contribution count under Section 80C?', a: 'No, only your own contribution to the Employees Provident Fund counts under Section 80C. The employer share is not part of your deduction. Voluntary contributions through VPF are eligible within the Rs 1.5 lakh cap.' },
  { q: 'How do I show Section 80C investments to my employer?', a: 'Submit investment proofs to your employer when asked, usually between December and February. Employers adjust TDS based on the proofs you give. If you miss the deadline, you can still claim the deduction when filing your ITR.' },
  { q: 'Are stamp duty and registration charges eligible under Section 80C?', a: 'Yes, stamp duty and registration fees paid to buy a house qualify under Section 80C. The deduction is allowed in the year of payment and counts toward the Rs 1.5 lakh limit. It applies only to residential property.' },
  { q: 'Is the Section 80C limit higher for senior citizens?', a: 'No, the Section 80C limit is Rs 1.5 lakh for every individual regardless of age. Senior citizens can use the Senior Citizens Savings Scheme as an eligible instrument. Their higher benefits come from the exemption limit and other sections.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform built for India. The calculators are free tools that give real answers to real financial questions. A free account is available to save results and access them any time. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ─── CA CTA ─────────────────────────────────────────────────── */

/* ─── Main Client Component ───────────────────────────────────── */
export default function Section80CClient({ region = 'in' }: { region?: string }) {
  const defaultSettings = {
    income: 1200000,
    d80C: 100000,
    d80CCD1B: 0,
    d80D: 0,
    homeLoanInt: 0,
    ageGroup: 'below60' as 'below60' | 'senior' | 'superSenior',
  };
  const { settings, updateSettings } = useCalculatorSettings('section-80c', defaultSettings);
  const { income, d80C, d80CCD1B, d80D, homeLoanInt, ageGroup } = settings;
  
  const setIncome = (v: any) => updateSettings({ income: typeof v === 'function' ? v(settings.income) : v });
  const setD80C = (v: any) => updateSettings({ d80C: typeof v === 'function' ? v(settings.d80C) : v });
  const setD80CCD1B = (v: any) => updateSettings({ d80CCD1B: typeof v === 'function' ? v(settings.d80CCD1B) : v });
  const setD80D = (v: any) => updateSettings({ d80D: typeof v === 'function' ? v(settings.d80D) : v });
  const setHomeLoanInt = (v: any) => updateSettings({ homeLoanInt: typeof v === 'function' ? v(settings.homeLoanInt) : v });
  const setAgeGroup = (v: any) => updateSettings({ ageGroup: typeof v === 'function' ? v(settings.ageGroup) : v });

  const [mobile, setMobile] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-section-80c-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (typeof d.income === 'number') setIncome(d.income);
      if (typeof d.d80C === 'number') setD80C(d.d80C);
      if (typeof d.d80CCD1B === 'number') setD80CCD1B(d.d80CCD1B);
      if (typeof d.d80D === 'number') setD80D(d.d80D);
      if (typeof d.homeLoanInt === 'number') setHomeLoanInt(d.homeLoanInt);
      if (d.ageGroup === 'below60' || d.ageGroup === 'senior' || d.ageGroup === 'superSenior') setAgeGroup(d.ageGroup);
    } catch { /* ignore */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('fermor-section-80c-v1', JSON.stringify({ income, d80C, d80CCD1B, d80D, homeLoanInt, ageGroup }));
    } catch { /* ignore */ }
  }, [income, d80C, d80CCD1B, d80D, homeLoanInt, ageGroup]);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const result = useMemo(() => {
    const actual80C = Math.min(d80C, 150000);
    const max80C = 150000;
    const maxNPS = 50000;

    const taxNo80C = calcTaxOld(income, 0, 0, d80D, homeLoanInt, ageGroup);
    const taxActual = calcTaxOld(income, actual80C, d80CCD1B, d80D, homeLoanInt, ageGroup);
    const taxMax80C = calcTaxOld(income, max80C, maxNPS, d80D, homeLoanInt, ageGroup);
    const taxSaved = Math.max(0, taxNo80C - taxActual);
    const maxTaxSaved = Math.max(0, taxNo80C - taxMax80C);
    
    // Marginal rate estimation based on old regime slabs
    let marginalRate = 30;
    const standardDed = 50000;
    const dedNo80C = standardDed + Math.min(d80D, 25000) + Math.min(homeLoanInt, 200000);
    const taxableNo80C = Math.max(0, income - dedNo80C);
    if (taxableNo80C <= 250000) marginalRate = 0;
    else if (taxableNo80C <= 500000) marginalRate = 5;
    else if (taxableNo80C <= 1000000) marginalRate = 20;

    const optimalAmount = Math.min(150000, Math.max(0, Math.round((income - 500000 - 50000 - d80D - homeLoanInt) / 100) * 100));

    return { taxNo80C, taxActual, taxMax80C, taxSaved, maxTaxSaved, marginalRate, optimalAmount, actual80C };
  }, [income, d80C, d80CCD1B, d80D, homeLoanInt, ageGroup]);

  const savedPct = result && result.taxNo80C > 0 ? (result.taxSaved / result.taxNo80C) * 100 : 0;

  const eligibleInstruments = [
    { name: 'Public Provident Fund (PPF)', lockIn: '15 years', returnRate: '7.1% p.a.', maxBenefit: 'EEE (tax-free)' },
    { name: 'Employee Provident Fund (EPF)', lockIn: 'Retirement', returnRate: '8.25% (FY 25-26)', maxBenefit: 'EEE (tax-free)' },
    { name: 'Equity Linked Savings Scheme (ELSS)', lockIn: '3 years', returnRate: 'Market-linked', maxBenefit: 'Shortest lock-in' },
    { name: 'Tax-Saving Fixed Deposit (5yr)', lockIn: '5 years', returnRate: '6-7.5% p.a.', maxBenefit: 'Guaranteed return' },
    { name: 'National Savings Certificate (NSC)', lockIn: '5 years', returnRate: '7.7% p.a.', maxBenefit: 'Govt-backed' },
    { name: 'Life Insurance Premium', lockIn: 'Policy term', returnRate: 'N/A', maxBenefit: 'Insurance + tax save' },
    { name: 'Sukanya Samriddhi Yojana (SSY)', lockIn: '21 years / until marriage', returnRate: '8.2% p.a.', maxBenefit: 'Highest small-saving rate' },
    { name: 'Senior Citizens Savings Scheme (SCSS)', lockIn: '5 years', returnRate: '8.2% p.a.', maxBenefit: 'Quarterly payouts' },
    { name: 'Tuition Fees (2 children)', lockIn: 'N/A', returnRate: 'N/A', maxBenefit: 'Expense deduction' },
    { name: 'Home Loan Principal Repayment', lockIn: 'Loan tenure', returnRate: 'N/A', maxBenefit: 'Reduces principal' },
    { name: '5-Year Post Office Time Deposit', lockIn: '5 years', returnRate: '7.5% p.a.', maxBenefit: 'Govt-backed' },
  ];

  const h2 = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const p = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'middle' as const } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'middle' as const } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Section 80C Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Find how much tax you save by investing in PPF, ELSS, EPF, NSC, and other 80C-eligible instruments under the old regime
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="Section 80C Tax Savings Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  <Slider label="Annual Gross Income" id="sec80c-income" value={income} min={300000} max={50000000} step={50000} fmt={fmtC} onChange={setIncome} compact={mobile} />
                  <Slider label="Current 80C Investments" id="sec80c-amount" value={d80C} min={0} max={150000} step={5000} fmt={fmtC} onChange={setD80C} compact={mobile} />
                  <Slider label="NPS 80CCD(1B) Contribution" id="sec80c-nps" value={d80CCD1B} min={0} max={50000} step={1000} fmt={fmtC} onChange={setD80CCD1B} compact={mobile} />
                  <Slider label="Other Deductions (80D, Home Loan)" id="sec80c-other" value={d80D + homeLoanInt} min={0} max={250000} step={5000} fmt={fmtC}
                    onChange={(v) => { updateSettings({ d80D: Math.min(25000, v), homeLoanInt: Math.max(0, v - 25000) }); }} compact={mobile} />
                  
                  <AgeToggle value={ageGroup} onChange={setAgeGroup} />
                </div>

                {/* Result panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {result ? (
                    <>
                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <div>
                          <span style={{ fontSize: mobile ? 12 : 13, fontWeight: 600, color: '#50565C' }}>Tax Saved</span>
                          <p style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', margin: '2px 0 0', letterSpacing: '-0.02em' }}
                            aria-live="polite" aria-label={`You save ${fmtIN(result.taxSaved)} in tax`}>
                            {fmtIN(result.taxSaved)}
                          </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: mobile ? 12 : 13, fontWeight: 600, color: '#50565C' }}>Total Tax (with 80C)</span>
                          <p style={{ fontSize: mobile ? 18 : 22, fontWeight: 700, color: '#101214', margin: '2px 0 0', opacity: 0.9 }}
                            aria-live="polite" aria-label={`Your total tax is ${fmtIN(result.taxActual)}`}>
                            {fmtIN(result.taxActual)}
                          </p>
                        </div>
                      </div>

                      {[
                        { label: 'Tax without 80C deductions', value: fmtIN(result.taxNo80C) },
                        { label: 'Tax with max 80C (Rs 1.5L + NPS)', value: fmtIN(result.taxMax80C) },
                        { label: 'Maximum possible savings', value: fmtIN(result.maxTaxSaved) },
                        { label: 'Optimal 80C amount', value: fmtIN(result.optimalAmount) },
                        { label: 'Your marginal tax rate', value: `${result.marginalRate}% + 4% cess` },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                        </div>
                      ))}

                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                        <DonutChart savedPct={savedPct} />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                          <span style={{ fontSize: 12, color: C.ink2 }}>Saved {savedPct.toFixed(0)}%</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                          <span style={{ fontSize: 12, color: C.ink2 }}>Paid {(100 - savedPct).toFixed(0)}%</span>
                        </div>
                      </div>

                      <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 11.5, color: C.ink3 }}>Saved {savedPct.toFixed(0)}%</span>
                          <span style={{ fontSize: 11.5, color: C.ink3 }}>Paid {(100 - savedPct).toFixed(0)}%</span>
                        </div>
                        <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`Tax saved is ${savedPct.toFixed(0)}% of tax without 80C`}>
                          <div style={{ height: '100%', width: `${savedPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                        </div>
                      </div>

                    </>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, color: C.ink3, fontSize: 14 }}>
                      Adjust inputs to see result
                    </div>
                  )}
                </div>
              </div>

              {/* Investment-wise tax saving (collapsible strip) */}
              {result && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowSchedule(v => !v)}
                    aria-expanded={showSchedule} aria-controls="invest-wise-table"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Investment-Wise Tax Saving</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>Tax saved at each 80C amount</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#F4F5F6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {result.marginalRate}% + 4% cess
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showSchedule ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showSchedule && (
                    <div id="invest-wise-table" style={{ borderTop: `1px solid ${C.border}`, overflowX: 'auto' }}>
                      <table style={{ width: '100%', minWidth: 420, borderCollapse: 'collapse', fontSize: 13 }}>
                        <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, padding: mobile ? '8px 20px 14px' : '8px 44px 16px' }}>Tax saved at each Section 80C investment amount, using your income, regime and other deductions</caption>
                        <thead>
                          <tr style={{ background: '#F4F5F6' }}>
                            {['80C Investment', 'Total Tax', 'Tax Saved'].map((h, i) => (
                              <th key={h} scope="col" style={{ padding: mobile ? '10px 20px' : '10px 44px', textAlign: i === 0 ? 'left' : 'right', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {[25000, 50000, 75000, 100000, 125000, 150000].map((amt, i) => {
                            const tax = calcTaxOld(income, amt, d80CCD1B, d80D, homeLoanInt, ageGroup);
                            const saved = Math.max(0, result.taxNo80C - tax);
                            return (
                              <tr key={amt} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#FAFAFA' }}>
                                <td style={{ padding: mobile ? '12px 20px' : '12px 44px', fontWeight: 700, color: C.ink }}>{fmtIN(amt)}</td>
                                <td style={{ padding: mobile ? '12px 20px' : '12px 44px', textAlign: 'right', color: C.ink2 }}>{fmtIN(tax)}</td>
                                <td style={{ padding: mobile ? '12px 20px' : '12px 44px', textAlign: 'right', fontWeight: 700, color: C.dark }}>{fmtIN(saved)}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Save Results Card */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-section-80c">What Is Section 80C?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Section 80C of the Income Tax Act, 1961 allows individual and HUF taxpayers to claim a deduction of up to Rs 1.5 lakh per financial year for specified investments, expenditures, and contributions. It is the most widely used tax-saving provision in India.
                  </p>
                </div>
                <p style={p}>
                  Every year, millions of salaried employees and self-employed individuals use Section 80C to reduce their taxable income. The section covers a broad range of financial instruments and qualifying expenses, from long-term savings products like EPF and PPF to growth-oriented options like ELSS and even children&apos;s tuition fees.
                </p>
                <p style={p}>
                  The deduction is available only under the old tax regime. Taxpayers who opt for the new tax regime cannot claim Section 80C benefits. The section is administered by the Central Board of Direct Taxes (CBDT) under the Ministry of Finance, Government of India.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  For official text, refer to the <a href="https://incometaxindia.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Department</a> website.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="section-80c-limit">Section 80C Deduction Limit: Rs 1.5 Lakh Explained</h2>
                <p style={p}>
                  The Section 80C deduction limit is Rs 1.5 lakh (Rs 1,50,000) per financial year. This is an overall cap that covers all eligible investments and expenses combined. You cannot claim more than Rs 1.5 lakh under Section 80C regardless of how much you invest across different instruments.
                </p>
                <p style={p}>
                  An additional deduction of up to Rs 50,000 is available under Section 80CCD(1B) specifically for contributions to the National Pension System (NPS). This is over and above the Rs 1.5 lakh 80C limit, meaning an individual investing in NPS can claim total deductions of up to Rs 2 lakh per year from these two sections combined.
                </p>
                <p style={p}>
                  The limit applies per person, not per family. If you invest Rs 1.5 lakh in PPF and also pay Rs 50,000 in tuition fees in the same year, only Rs 1.5 lakh qualifies for deduction.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  The remaining Rs 50,000 provides no additional tax benefit, so plan your investments to fill the Rs 1.5 lakh limit optimally.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="eligible-investments">Eligible Investments Under Section 80C</h2>
                <p style={p}>
                  Section 80C covers a wide range of investment instruments and qualifying expenses. Each option has its own lock-in period, return profile, and risk level. Choose based on your financial goals, time horizon, and risk appetite.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Complete list of Section 80C-eligible investment instruments and expenses for FY 2026-27</caption>
                    <thead>
                      <tr style={{ background: '#f4f5f6' }}>
                        <th style={thS} scope="col">Investment</th>
                        <th style={thS} scope="col">Lock-in Period</th>
                        <th style={thS} scope="col">Return</th>
                        <th style={thS} scope="col">Key Benefit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {eligibleInstruments.map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r.name}</td>
                          <td style={tdL}>{r.lockIn}</td>
                          <td style={tdR}>{r.returnRate}</td>
                          <td style={tdL}>{r.maxBenefit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  ELSS has the shortest lock-in at 3 years, making it ideal for investors who want liquidity with equity exposure. PPF and EPF offer tax-free returns under the EEE (Exempt-Exempt-Exempt) category. SCSS and post office deposits suit conservative investors seeking regular income.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Home loan principal repayment and tuition fees are expense-based deductions that do not require a separate investment.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="section-80c-vs-80ccd">Section 80C vs 80CCD(1B) vs 80CCD(2)</h2>
                <p style={p}>
                  These three sections are related but distinct. Understanding the difference helps you maximise your total tax deduction.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Section 80C, 80CCD(1B), and 80CCD(2) deduction limits and overlap rules</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Provision</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Maximum Deduction</th>
                        <th style={thS} scope="col">Eligible Instruments</th>
                        <th style={thS} scope="col">Overlap</th>
                      </tr>
                    </thead>
                    <tbody>
                      {([
                        ['Section 80C', 'Rs 1.5 lakh', 'PPF, EPF, ELSS, NSC, FD, Life Insurance, SSY, SCSS, Tuition, Home Loan Principal', 'Primary section, covers most instruments'],
                        ['Section 80CCD(1B)', 'Rs 50,000', 'NPS Tier-I contributions only', 'Additional, over 80C limit'],
                        ['Section 80CCD(2)', 'Up to 10% of salary (employer NPS)', 'Employer NPS contribution (up to 14% for govt)', 'Separate from personal deductions'],
                      ] as [string, string, string, string][]).map(([provision, limit, instruments, overlap], i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{provision}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const, fontWeight: 600 }}>{limit}</td>
                          <td style={tdL}>{instruments}</td>
                          <td style={tdL}>{overlap}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  If you invest Rs 1.5 lakh in PPF and ELSS, plus Rs 50,000 in NPS Tier-I, your total deduction is Rs 2 lakh (Rs 1.5 lakh under 80C + Rs 50,000 under 80CCD(1B)). Employer NPS contributions under 80CCD(2) are separate and do not count toward your 80C or 80CCD(1B) limits.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="tax-savings-calculation">Tax Savings Calculation Under Section 80C</h2>
                <p style={p}>
                  Take an annual income of Rs 12 lakh with only the Rs 50,000 standard deduction. Here is how Section 80C reduces the tax under the old regime.
                </p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <p style={{ fontSize: 14, color: C.ink, lineHeight: 1.8, margin: 0 }}>
                    <strong>Without 80C:</strong> Taxable income = Rs 11.5 lakh. Tax = Rs 1,57,500 (before cess) = Rs 1,63,800 (with 4% cess).<br />
                    <strong>With Rs 1.5 lakh 80C investment:</strong> Taxable income = Rs 10 lakh. Tax = Rs 1,12,500 (before cess) = Rs 1,17,000 (with cess).<br />
                    <strong>Tax saved:</strong> Rs 1,63,800 minus Rs 1,17,000 = Rs 46,800.
                  </p>
                </div>
                <p style={p}>
                  The actual savings depend on your income slab. At the 30% tax bracket, every Rs 1 lakh invested under 80C saves Rs 31,200 in tax (including cess). At the 20% bracket, the same Rs 1 lakh saves Rs 20,800.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  The savings scale linearly with your investment up to the Rs 1.5 lakh cap.
                </p>
                <p style={p}>
                  Add NPS under 80CCD(1B) for additional savings. At the 30% slab, Rs 50,000 in NPS saves another Rs 15,600, taking your total tax saving to Rs 67,600 with the combined Rs 2 lakh deduction.
                </p>
              </div>

              {/* In-Content Promo Bar */}
              <div style={{ marginBottom: 44, display: 'flex', background: '#f6f7f8', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ flex: 1, padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: C.ink, margin: '0 0 2px', fontFamily: INTER }}>
                      Old regime vs new regime: which saves more?
                    </p>
                    <p style={{ fontSize: 13, color: C.ink3, margin: 0, fontFamily: INTER }}>
                      Compare both regimes side by side with your actual deductions.
                    </p>
                  </div>
                  <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 12.5, fontWeight: 700, color: C.dark, background: C.lime, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', fontFamily: INTER, whiteSpace: 'nowrap' }}>
                    Open calculator
                  </Link>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-maximize">How to Maximize Your Section 80C Tax Savings</h2>
                <p style={p}>
                  Filling the full Rs 1.5 lakh 80C limit should be a priority for every taxpayer in the old regime. Here is a strategic approach:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>1</div>
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 600, color: C.ink, margin: '0 0 4px' }}>Start with mandatory contributions</p>
                      <p style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.7, margin: 0 }}>
                        Your EPF contribution already counts toward 80C. Check your salary slip to see how much of the Rs 1.5 lakh limit is already filled by your EPF deduction. Most employees with a basic salary above Rs 75,000 per month have at least Rs 90,000 covered by EPF alone.
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>2</div>
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 600, color: C.ink, margin: '0 0 4px' }}>Add PPF for the gap</p>
                      <p style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.7, margin: 0 }}>
                        If your EPF leaves a gap in the Rs 1.5 lakh limit, open a PPF account and contribute the remaining amount. PPF offers tax-free returns and is government-backed, making it the safest way to fill unused 80C capacity.
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>3</div>
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 600, color: C.ink, margin: '0 0 4px' }}>Use ELSS for shorter lock-in</p>
                      <p style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.7, margin: 0 }}>
                        If you want liquidity with equity exposure, invest in ELSS. The 3-year lock-in is the shortest among all 80C options. ELSS also has the potential for market-linked returns, historically 10-15% CAGR over the long term.
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>4</div>
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 600, color: C.ink, margin: '0 0 4px' }}>Dont forget NPS under 80CCD(1B)</p>
                      <p style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.7, margin: 0 }}>
                        After filling Rs 1.5 lakh under 80C, contribute up to Rs 50,000 to NPS Tier-I for the additional deduction. NPS also has the lowest expense ratio among retirement products in India, regulated by PFRDA.
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>5</div>
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 600, color: C.ink, margin: '0 0 4px' }}>Invest early in the financial year</p>
                      <p style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.7, margin: 0 }}>
                        Dont wait until March. Investing at the start of the financial year gives your money more time to grow. ELSS funds started in April have an extra 11 months of compounding vs a March investment, with the same 3-year lock-in ending date.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use the Section 80C Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter your annual gross income:</strong> Your total income from salary, business, capital gains, interest, rent, and other sources before any deductions.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Add your current 80C investments:</strong> Include all contributions to EPF, PPF, ELSS, NSC, life insurance premiums, SSY, SCSS, tuition fees, and home loan principal repayment up to Rs 1.5 lakh.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter NPS contribution:</strong> Your Tier-I NPS contribution qualifies for the additional Rs 50,000 deduction under Section 80CCD(1B).
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Add other deductions:</strong> Include health insurance premiums (80D) and home loan interest (Section 24) for a more accurate marginal rate calculation.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Review your tax savings:</strong> The result panel shows your tax saved, total tax with 80C deductions, and a donut chart visualising the proportion of tax saved vs paid.
                  </li>
                </ol>
                <p style={{ ...p, margin: 0 }}>
                  Review the dark result box for your tax saved and total tax. The donut chart visualises the proportion of tax saved vs tax paid with your current 80C investments. The stats below show your tax at different 80C investment levels, helping you decide how much to invest.
                </p>
              </div>

              

              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations are indicative only and tax laws change with each Union Budget. Section 80C deductions apply only under the old tax regime. Consult a qualified Chartered Accountant for personalised advice.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <aside className="sec80c-sidebar" aria-label="Related calculators" style={{
            display: mobile ? 'none' : 'flex', flexDirection: 'column', gap: 16,
            overflowY: 'auto', position: 'sticky', top: 24,
            maxHeight: 'calc(100vh - 100px)',
          } as React.CSSProperties}>
            <style>{`
              .sec80c-sidebar::-webkit-scrollbar { width: 5px; }
              .sec80c-sidebar::-webkit-scrollbar-track { background: transparent; }
              .sec80c-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
              .sec80c-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
            `}</style>
            <div className="sec80c-sidebar" style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
              display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0,
            }}>
              <SidebarList title="Tax & Investment Calculators" items={POPULAR} />
              <SidebarList title="80C Instrument Calculators" items={MORE} />
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

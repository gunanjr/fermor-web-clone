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

/* ─── PT Slabs by State ────────────────────────────────────── */
const PT_SLABS: Record<string, { name: string; slabs: { min: number; max: number; amount: number }[] }> = {
  karnataka: {
    name: 'Karnataka',
    slabs: [
      { min: 0, max: 15000, amount: 0 },
      { min: 15001, max: 25000, amount: 150 },
      { min: 25001, max: Infinity, amount: 200 },
    ],
  },
  maharashtra: {
    name: 'Maharashtra',
    slabs: [
      { min: 0, max: 10000, amount: 175 },
      { min: 10001, max: Infinity, amount: 200 },
    ],
  },
  'tamil-nadu': {
    name: 'Tamil Nadu',
    slabs: [
      { min: 0, max: 3500, amount: 0 },
      { min: 3501, max: 5000, amount: 10 },
      { min: 5001, max: 7500, amount: 35 },
      { min: 7501, max: 10500, amount: 70 },
      { min: 10501, max: 15000, amount: 105 },
      { min: 15001, max: Infinity, amount: 182 },
    ],
  },
  'andhra-pradesh': {
    name: 'Andhra Pradesh',
    slabs: [
      { min: 0, max: 15000, amount: 0 },
      { min: 15001, max: 20000, amount: 80 },
      { min: 20001, max: Infinity, amount: 173 },
    ],
  },
  telangana: {
    name: 'Telangana',
    slabs: [
      { min: 0, max: 15000, amount: 0 },
      { min: 15001, max: 20000, amount: 80 },
      { min: 20001, max: Infinity, amount: 173 },
    ],
  },
  gujarat: {
    name: 'Gujarat',
    slabs: [
      { min: 0, max: 5999, amount: 0 },
      { min: 6000, max: 8999, amount: 10 },
      { min: 9000, max: 11999, amount: 30 },
      { min: 12000, max: Infinity, amount: 100 },
    ],
  },
  'west-bengal': {
    name: 'West Bengal',
    slabs: [
      { min: 0, max: 10000, amount: 0 },
      { min: 10001, max: 15000, amount: 55 },
      { min: 15001, max: 25000, amount: 80 },
      { min: 25001, max: 35000, amount: 110 },
      { min: 35001, max: Infinity, amount: 210 },
    ],
  },
  'madhya-pradesh': {
    name: 'Madhya Pradesh',
    slabs: [
      { min: 0, max: 20000, amount: 0 },
      { min: 20001, max: Infinity, amount: 175 },
    ],
  },
  assam: {
    name: 'Assam',
    slabs: [
      { min: 0, max: 10000, amount: 0 },
      { min: 10001, max: Infinity, amount: 150 },
    ],
  },
  kerala: {
    name: 'Kerala',
    slabs: [
      { min: 0, max: 1999, amount: 0 },
      { min: 2000, max: 4999, amount: 20 },
      { min: 5000, max: 9999, amount: 50 },
      { min: 10000, max: 14999, amount: 100 },
      { min: 15000, max: Infinity, amount: 125 },
    ],
  },
  odisha: {
    name: 'Odisha',
    slabs: [
      { min: 0, max: 0, amount: 0 },
      { min: 1, max: Infinity, amount: 100 },
    ],
  },
  bihar: {
    name: 'Bihar',
    slabs: [
      { min: 0, max: 4167, amount: 0 },
      { min: 4168, max: 10000, amount: 40 },
      { min: 10001, max: Infinity, amount: 83 },
    ],
  },
  jharkhand: {
    name: 'Jharkhand',
    slabs: [
      { min: 0, max: 10000, amount: 0 },
      { min: 10001, max: Infinity, amount: 150 },
    ],
  },
};

function getPTAmount(state: string, monthlySalary: number): number {
  const stateData = PT_SLABS[state];
  if (!stateData) return 0;
  for (const slab of stateData.slabs) {
    if (monthlySalary >= slab.min && monthlySalary <= slab.max) {
      return slab.amount;
    }
  }
  return 0;
}

/* ─── State Select ─────────────────────────────────────────── */
function StateSelect({ value, onChange, compact }: { value: string; onChange: (v: string) => void; compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const stateList = Object.entries(PT_SLABS).map(([k, v]) => ({ key: k, name: v.name }));
  const selectedName = PT_SLABS[value]?.name || 'Select State';
  return (
    <div style={{ marginBottom: compact ? 18 : 36, position: 'relative' }}>
      <label style={{ fontSize: compact ? 13.5 : 14, color: C.ink2, fontWeight: 400, display: 'block', marginBottom: compact ? 10 : 14 }}>State</label>
      <button onClick={() => setOpen(v => !v)} onBlur={() => setTimeout(() => setOpen(false), 180)}
        aria-haspopup="listbox" aria-expanded={open} aria-label="Select your state"
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: compact ? 13 : 14, fontWeight: 600, color: C.ink,
          background: C.white, border: `1px solid ${C.border}`, borderRadius: 8,
          padding: compact ? '7px 12px' : '9px 14px', cursor: 'pointer', fontFamily: INTER,
          textAlign: 'left', transition: 'border-color 0.15s',
        }}
        onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
        onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}>
        <span>{selectedName}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div role="listbox" aria-label="States"
          style={{
            position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 20,
            background: C.white, border: `1px solid ${C.border}`, borderRadius: 8,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginTop: 4,
            maxHeight: 240, overflowY: 'auto',
          }}>
          {stateList.map(s => (
            <button key={s.key} role="option" aria-selected={s.key === value}
              onClick={() => { onChange(s.key); setOpen(false); }}
              style={{
                width: '100%', display: 'block', textAlign: 'left',
                padding: '10px 14px', border: 'none', background: s.key === value ? C.paleLime : 'transparent',
                fontSize: 13.5, fontWeight: s.key === value ? 600 : 400,
                color: s.key === value ? C.dark : C.ink2, cursor: 'pointer', fontFamily: INTER,
                borderBottom: `1px solid ${C.border}`,
              }}>
              {s.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Donut Chart ──────────────────────────────────────────── */
function DonutChart({ principal, interest }: { principal: number; interest: number }) {
  const total = principal + interest;
  if (total === 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const pArc = (principal / total) * circ;
  const pPct = Math.round((principal / total) * 100);
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Take-home ${pPct}% of salary, professional tax ${100 - pPct}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Take-home</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
  );
}

/* ─── Slider ───────────────────────────────────────────────── */
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

/* ─── Sidebar list ─────────────────────────────────────────── */
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
  { href: '/calculators/income-tax-calculator',           label: 'Income Tax Calculator' },
  { href: '/calculators/hra-calculator',                  label: 'HRA Calculator' },
  { href: '/calculators/in-hand-salary-calculator',       label: 'In-Hand Salary Calculator' },
  { href: '/calculators/ctc-calculator',                  label: 'CTC Calculator' },
  { href: '/calculators/old-vs-new-tax-regime-calculator', label: 'Old vs New Tax Regime Calculator' },
  { href: '/calculators/gratuity-calculator',             label: 'Gratuity Calculator' },
  { href: '/calculators/epf-calculator',                  label: 'EPF Calculator' },
];
const MORE = [
  { href: '/calculators/sip-calculator',                  label: 'SIP Calculator' },
  { href: '/calculators/lumpsum-calculator',              label: 'Lumpsum Calculator' },
  { href: '/calculators/fd-calculator',                   label: 'FD Calculator' },
  { href: '/calculators/ppf-calculator',                  label: 'PPF Calculator' },
  { href: '/calculators/retirement-calculator',           label: 'Retirement Calculator' },
];

/* ─── FAQ ──────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What is professional tax in India?',
    a: 'Professional tax is a state-level tax levied on individuals earning income through employment, profession, or trade. It is collected by the state government and the rate varies by state. The maximum professional tax payable in any state is Rs 2,500 per year as per Article 276 of the Constitution of India.',
  },
  {
    q: 'Which states levy professional tax in India?',
    a: 'Professional tax is levied by Andhra Pradesh, Karnataka, Maharashtra, Tamil Nadu, Telangana, Gujarat, West Bengal, Madhya Pradesh, Assam, Kerala, Meghalaya, Odisha, Tripura, Bihar, Jharkhand, and Sikkim. Union territories and states like Delhi, Haryana, Punjab, Rajasthan, Uttar Pradesh do not levy professional tax.',
  },
  {
    q: 'What is the maximum professional tax per year?',
    a: 'The maximum professional tax per financial year is Rs 2,500 as per Article 276 of the Constitution of India. Karnataka levies up to Rs 2,400, Maharashtra up to Rs 2,500, Tamil Nadu up to Rs 2,185, Andhra Pradesh and Telangana up to Rs 2,080, Gujarat up to Rs 1,200, and West Bengal up to Rs 2,500.',
  },
  {
    q: 'Who is exempt from paying professional tax?',
    a: 'Exemptions vary by state but typically include: individuals earning below the threshold (e.g., below Rs 15,000/month in Karnataka, Rs 7,500/month in Maharashtra), senior citizens, physically disabled persons, women in some states, parents of children with disabilities, and defence personnel in some states.',
  },
  {
    q: 'How is professional tax deducted from salary?',
    a: 'Employers deduct professional tax from the employee\'s monthly salary and deposit it with the state government. The deduction happens at source, similar to TDS. The employer is responsible for registration and timely payment to the state tax department, typically monthly or annually depending on the state.',
  },
  {
    q: 'Is professional tax applicable on pension income?',
    a: 'Professional tax is generally not applicable on pension income since pensioners are not engaged in any profession, employment, or trade. However, if a pensioner takes up re-employment or consultancy work, professional tax may apply on that income.',
  },
  {
    q: 'Is professional tax applicable for freelancers and self-employed?',
    a: 'Yes, freelancers and self-employed professionals are liable to pay professional tax in states where it is applicable. They must register themselves with the state commercial tax department and pay the tax directly.',
  },
  {
    q: 'Is professional tax deductible under the Income Tax Act?',
    a: 'Yes, professional tax paid during the financial year is deductible from gross salary income under Section 16(iii) of the Income Tax Act, 1961. This deduction is available under both the old and new tax regimes. There is no upper limit, the actual amount paid is deductible.',
  },
  {
    q: 'What happens if an employee works in a different state than the employer?',
    a: 'Professional tax is typically deducted based on the state where the employee works (the place of posting), not where the employer is headquartered. If the employee works in Karnataka but the company is registered in Maharashtra, Karnataka PT rules apply.',
  },
  {
    q: 'What is the penalty for non-payment of professional tax?',
    a: 'Penalties vary by state. Generally, late payment attracts interest of 1-2% per month. Non-registration can result in a penalty of Rs 5,000 to Rs 10,000. Employers who fail to deduct or deposit PT on time face higher penalties, including potential legal action.',
  },
  {
    q: 'What is the professional tax for Karnataka for 2025-26?',
    a: 'Karnataka has three slabs: up to Rs 15,000/month salary nil PT, Rs 15,001 to Rs 25,000 Rs 150/month (Rs 1,800/year), above Rs 25,000 Rs 200/month (Rs 2,400/year). The annual maximum is Rs 2,400.',
  },
  {
    q: 'What is the professional tax for Maharashtra for 2025-26?',
    a: 'For salaried employees earning above Rs 10,000/month, Maharashtra professional tax is Rs 200/month (Rs 2,500/year). Those earning below Rs 10,000/month pay Rs 175/month in the first 6 months and Rs 200/month thereafter.',
  },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ─── Main ─────────────────────────────────────────────────── */
export default function ProfessionalTaxCalculatorClient({ region = 'in' }: { region?: string }) {
  const defaultSettings = {
    monthlySalary: 50000,
    selectedState: 'karnataka' as string,
  };
  const { settings, updateSettings } = useCalculatorSettings('professional-tax-calculator', defaultSettings);
  const { monthlySalary, selectedState } = settings;

  const setMonthlySalary = (v: number) => updateSettings({ monthlySalary: v });
  const setSelectedState = (v: string) => updateSettings({ selectedState: v });

  const [mobile, setMobile] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const monthlyPT = useMemo(() => getPTAmount(selectedState, monthlySalary), [selectedState, monthlySalary]);
  const annualPT = monthlyPT * 12;
  const annualSalary = monthlySalary * 12;
  const effectiveRate = annualSalary > 0 ? (annualPT / annualSalary) * 100 : 0;
  const takeHome = annualSalary - annualPT;

  const takeHomePct = annualSalary > 0 ? Math.round((takeHome / annualSalary) * 100) : 100;
  const ptPct = 100 - takeHomePct;

  const stateName = PT_SLABS[selectedState]?.name || selectedState;

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const h3  = { fontSize: 15.5, fontWeight: 600, color: C.ink, margin: '0 0 6px' } as React.CSSProperties;
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
            Professional Tax Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate professional tax for all Indian states. Select your state and enter your monthly salary to see the applicable PT amount.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="Professional Tax Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div role="tabpanel" style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  <Slider label="Monthly Gross Salary" id="pt-salary" value={monthlySalary} min={0} max={500000} step={1000} fmt={fmtC} onChange={setMonthlySalary} compact={mobile} />
                  <StateSelect value={selectedState} onChange={setSelectedState} compact={mobile} />

                  <div style={{ marginTop: 16, padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: C.ink, fontWeight: 700 }}>
                      <span>Annual Salary</span>
                      <span>{fmtC(annualSalary)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.ink2, marginTop: 4 }}>
                      <span>Monthly PT: {fmtC(monthlyPT)}</span>
                      <span>Annual PT: {fmtC(annualPT)}</span>
                    </div>
                  </div>
                </div>

                {/* Result panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>
                      Monthly Professional Tax
                    </span>
                    <span aria-live="polite" aria-label={`Monthly professional tax: ${fmtIN(monthlyPT)}`}
                      style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {fmtIN(monthlyPT)}
                    </span>
                  </div>

                  {[
                    { label: 'Annual Professional Tax', value: fmtC(annualPT) },
                    { label: 'Annual Salary (Gross)', value: fmtC(annualSalary) },
                    { label: 'Annual Take-Home (after PT)', value: fmtC(takeHome) },
                    { label: 'Effective Tax Rate', value: `${effectiveRate.toFixed(3)}%` },
                    { label: 'Section 16(iii) Deduction', value: fmtC(annualPT) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    <DonutChart principal={takeHome} interest={annualPT} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Take-home {takeHomePct}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Professional Tax {ptPct}%</span>
                    </div>
                  </div>

                  <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Take-home {takeHomePct}%</span>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>PT {ptPct}%</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`Take-home is ${takeHomePct}% of salary`}>
                      <div style={{ height: '100%', width: `${takeHomePct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>
                </div>
              </div>

            </section>

            {/* Waitlist */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-professional-tax">What Is Professional Tax?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Professional tax is a state-level tax levied by state governments on individuals earning income through employment, profession, trade, or calling. The maximum professional tax payable in any state is Rs 2,500 per year, as per Article 276 of the Constitution of India.
                  </p>
                </div>
                <p style={p}>
                  Professional tax is collected by the Commercial Tax Department of each state. Employers deduct it from employee salaries and deposit it with the state government. The tax applies to salaried employees, professionals (lawyers, doctors, chartered accountants), and business owners in states where it is levied.
                </p>
                <p style={p}>
                  Unlike income tax which is collected by the central government, professional tax is a state subject. This means each state sets its own slab rates and collection rules, within the constitutional cap of Rs 2,500 per year. Some states do not levy professional tax at all, including Delhi, Haryana, Punjab, Rajasthan, and Uttar Pradesh.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="professional-tax-by-state">Professional Tax by State</h2>
                <p style={p}>Professional tax rates vary significantly across Indian states. The table below shows monthly and annual professional tax amounts for each levying state at a monthly salary of Rs 50,000.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">State</th><th style={thS} scope="col">Monthly PT (Rs)</th><th style={thS} scope="col">Annual PT (Rs)</th><th style={thS} scope="col">Slab Basis</th></tr></thead>
                    <tbody>
                      {[
                        ['Karnataka', '200', '2,400', 'Above Rs 25,000/month'],
                        ['Maharashtra', '200', '2,500', 'Above Rs 10,000/month'],
                        ['Tamil Nadu', '182', '2,185', 'Above Rs 15,000/month'],
                        ['Andhra Pradesh', '173', '2,080', 'Above Rs 20,000/month'],
                        ['Telangana', '173', '2,080', 'Above Rs 20,000/month'],
                        ['Gujarat', '100', '1,200', 'Above Rs 12,000/month'],
                        ['West Bengal', '210', '2,500', 'Above Rs 35,000/month'],
                        ['Madhya Pradesh', '175', '2,100', 'Above Rs 20,000/month'],
                        ['Assam', '150', '1,800', 'Above Rs 10,000/month'],
                        ['Kerala', '125', '1,500', 'Above Rs 15,000/month'],
                        ['Odisha', '100', '1,200', 'Flat for all earners'],
                        ['Bihar', '83', '1,000', 'Above Rs 10,000/month'],
                        ['Jharkhand', '150', '1,800', 'Above Rs 10,000/month'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={tdR}>{r[1]}</td>
                          <td style={tdR}>{r[2]}</td>
                          <td style={tdL}>{r[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Professional tax is not levied in Delhi, Haryana, Punjab, Rajasthan, Uttar Pradesh, Uttarakhand, Himachal Pradesh, Jammu and Kashmir, and all union territories. If you work from home in a non-PT state, no professional tax is deducted even if your employer is based in a PT-levying state.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="pt-calculation">How Professional Tax Is Calculated</h2>
                <p style={p}>Professional tax is calculated based on the slab system defined by each state government. Your monthly gross salary determines which slab applies, and the corresponding PT amount is deducted every month.</p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark }}>
                    Monthly PT = Slab Amount (based on monthly salary and state rules)<br />
                    Annual PT = Monthly PT × 12<br />
                    Deduction under Section 16(iii) = Annual PT (deducted from gross salary)
                  </code>
                </div>
                <p style={p}>
                  <strong>Worked example:</strong> Monthly salary Rs 50,000 in Karnataka. The slab for above Rs 25,000/month is Rs 200/month. Annual PT = Rs 200 × 12 = Rs 2,400. The effective tax rate is (Rs 2,400 / Rs 6,00,000) × 100 = 0.40% of annual salary. Under Section 16(iii), the full Rs 2,400 is deductible from gross salary for income tax purposes.
                </p>
                <p style={p}>
                  Use the <Link href="/calculators/in-hand-salary-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>In-Hand Salary Calculator</Link> to see how professional tax affects your take-home pay alongside other deductions.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="pt-exemptions">Professional Tax Exemptions</h2>
                <p style={p}>Professional tax exemptions vary by state, but common exempt categories include:</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Common professional tax exemptions across states</caption>
                    <thead><tr><th style={thS} scope="col">Exemption Category</th><th style={thS} scope="col">Typical Condition</th><th style={thS} scope="col">Applicable States</th></tr></thead>
                    <tbody>
                      {[
                        ['Low Income Threshold', 'Salary below state-specific limit (e.g., Rs 15,000/month in Karnataka)', 'All PT-levying states'],
                        ['Senior Citizens', 'Above 60 or 65 years depending on state', 'Maharashtra, Karnataka, Tamil Nadu, Gujarat, West Bengal'],
                        ['Physically Disabled', 'Permanent disability above 40-60%', 'Most PT states'],
                        ['Women', 'May be exempt in specific slabs or entirely', 'Gujarat (women in certain categories), Tamil Nadu'],
                        ['Defence Personnel', 'Armed forces personnel', 'Karnataka, Maharashtra, West Bengal'],
                        ['Parents of Disabled Children', 'Child with permanent disability', 'Tamil Nadu, Karnataka'],
                        ['Pensioners', 'No active employment or trade', 'All states (generally)'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={tdR}>{r[1]}</td>
                          <td style={tdL}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Check your state's commercial tax department website for the exact exemption criteria applicable to your situation. Exemption rules change periodically through state budget announcements.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="pt-tax-benefits">Tax Benefits Under Section 16(iii)</h2>
                <p style={p}>Professional tax paid during the financial year is deductible from gross salary income under Section 16(iii) of the Income Tax Act, 1961. This deduction is available under both the old and new tax regimes.</p>
                <p style={p}>
                  <strong>How it works:</strong> The amount of professional tax paid during the year is subtracted from your gross salary before arriving at your net taxable salary. For example, if your annual gross salary is Rs 8,00,000 and you paid Rs 2,400 in professional tax, your taxable salary reduces to Rs 7,97,600.
                </p>
                <p style={p}>
                  Unlike many other deductions, Section 16(iii) has no upper limit. You can deduct the actual professional tax paid, up to the constitutional maximum of Rs 2,500 per year. This makes it one of the simplest deductions to claim since it requires no separate investment or documentation beyond your salary slip.
                </p>
                <p style={p}>
                  Compare how PT deductions affect your overall tax liability using the <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Old vs New Tax Regime Calculator</Link>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This Professional Tax Calculator</h2>
                <p style={p}>Enter your salary and select your state to see your professional tax liability in three simple steps:</p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter your monthly gross salary:</strong> Move the slider or type your monthly gross salary. The calculator works for any salary from Rs 0 to Rs 5,00,000 per month.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select your state:</strong> Choose the state where you work from the dropdown. The calculator applies the correct slab rates for your state. The tool covers all 14 states that levy professional tax.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>View your professional tax breakdown:</strong> The results show your monthly PT, annual PT, effective tax rate, and the Section 16(iii) deduction available on your income tax return.
                  </li>
                </ol>
                <p style={{ ...p, margin: 0 }}>
                  Use the currency selector to view results in USD, EUR, GBP, or other currencies. This is useful if you want to compare professional tax costs in terms of other currencies for international tax planning.
                </p>
              </div>

              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> Professional tax rates shown on this page are based on current state government regulations and may change after state budget announcements. The calculator provides indicative amounts only. Actual professional tax liability depends on your specific state, salary, and applicable exemptions. Consult a qualified tax professional for advice specific to your situation. For official information, refer to your state's commercial tax department website.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.prof-tax-sidebar::-webkit-scrollbar{width:5px}.prof-tax-sidebar::-webkit-scrollbar-track{background:transparent}.prof-tax-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.prof-tax-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="prof-tax-sidebar" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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

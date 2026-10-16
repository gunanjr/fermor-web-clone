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

/* ─── Slabs & Tax Calculations ───────────────────────────────── */
function calcTaxNew(income: number): number {
  const taxable = Math.max(0, income - 75000); // Standard deduction Rs 75,000
  if (taxable <= 1200000) return 0; // Rebate 87A for FY 2026-27 new regime
  let tax = 0;
  if (taxable > 300000) tax += (Math.min(taxable, 700000) - 300000) * 0.05;
  if (taxable > 700000) tax += (Math.min(taxable, 1000000) - 700000) * 0.10;
  if (taxable > 1000000) tax += (Math.min(taxable, 1200000) - 1000000) * 0.15;
  if (taxable > 1200000) tax += (Math.min(taxable, 1500000) - 1200000) * 0.20;
  if (taxable > 1500000) tax += (taxable - 1500000) * 0.30;
  return Math.round(tax * 1.04);
}

function calcTaxOld(income: number, pf: number): number {
  const standardDed = 50000; // Standard deduction Rs 50,000
  const totalDed = standardDed + Math.min(150000, pf); // Standard deduction + 80C PF
  const taxable = Math.max(0, income - totalDed);
  if (taxable <= 500000) return 0; // Rebate 87A for old regime
  let tax = 0;
  if (taxable > 250000) tax += (Math.min(taxable, 500000) - 250000) * 0.05;
  if (taxable > 500000) tax += (Math.min(taxable, 1000000) - 500000) * 0.20;
  if (taxable > 1000000) tax += (taxable - 1000000) * 0.30;
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

/* ─── ToggleGroup Component ─────────────────────────────────── */
function ToggleGroup({ label, options, value, onChange }: {
  label: string; options: { value: string; label: string }[]; value: string; onChange: (v: any) => void;
}) {
  return (
    <div style={{ marginBottom: 32 }}>
      <p style={{ fontSize: 14, color: C.ink2, fontWeight: 400, margin: '0 0 12px' }}>{label}</p>
      <div role="radiogroup" aria-label={label} style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
        {options.map(opt => (
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
function DonutChart({ takeHomePct, dedPct }: { takeHomePct: number; dedPct: number }) {
  const benefitPct = 100 - takeHomePct - dedPct;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  
  const thArc = (takeHomePct / 100) * circ;
  const dedArc = (dedPct / 100) * circ;
  
  const thOffset = circ / 4;
  const dedOffset = thOffset - thArc;
  
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`In-Hand Salary ${takeHomePct.toFixed(0)}%, Deductions ${dedPct.toFixed(0)}%, Employer Benefits ${benefitPct.toFixed(0)}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.paleLime} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw}
        strokeDasharray={`${dedArc} ${circ - dedArc}`} strokeDashoffset={dedOffset}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${thArc} ${circ - thArc}`} strokeDashoffset={thOffset}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>In-Hand</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{takeHomePct.toFixed(0)}%</text>
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
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item, i) => (
          <li key={i} style={{ borderBottom: i === items.length - 1 ? 'none' : `1px solid ${C.border}` }}>
            <Link href={item.href} style={{ display: 'block', padding: '12px 20px', fontSize: 14, color: C.ink2, textDecoration: 'none' }}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const POPULAR = [
  { href: '/calculators/ctc-calculator',          label: 'CTC Calculator' },
  { href: '/calculators/in-hand-salary-calculator', label: 'In-Hand Salary Calculator' },
  { href: '/calculators/salary-hike-calculator',   label: 'Salary Hike Calculator' },
  { href: '/calculators/hra-calculator',           label: 'HRA Calculator' },
];

const MORE = [
  { href: '/calculators/gratuity-calculator',      label: 'Gratuity Calculator' },
  { href: '/calculators/income-tax-calculator',    label: 'Income Tax Calculator' },
  { href: '/calculators/lta-calculator',           label: 'LTA Calculator' },
  { href: '/calculators/leave-encashment-tax-calculator', label: 'Leave Encashment Calculator' },
];

const FAQS = [
  { q: 'What is Cost to Company (CTC)?', a: 'Cost to Company (CTC) is the total annual amount an employer spends on hiring and maintaining an employee. It includes direct payouts like basic salary and allowances, indirect benefits like employer PF contributions, and statutory components like gratuity.' },
  { q: 'What is the difference between CTC and in-hand salary?', a: 'CTC is the total expenditure of the employer, whereas in-hand salary is the actual take-home money you receive in your bank account each month. In-hand is computed by subtracting employer benefits (PF, gratuity) and deductions (employee PF, professional tax, income tax) from the CTC.' },
  { q: 'What is Basic Salary and how is it decided?', a: 'Basic Salary is the core component of your salary structure, typically forming 40 per cent to 50 per cent of your total CTC. Most other salary allowances, dearness allowance, and retirement benefits like EPF and gratuity are calculated as a direct percentage of basic salary.' },
  { q: 'How is HRA structured in the CTC?', a: 'House Rent Allowance (HRA) is typically set at 40 per cent of basic salary for non-metro cities and 50 per cent of basic salary for metro cities. HRA qualifies for tax exemptions under Section 10(13A) of the Income Tax Act if you live in rented accommodation and pay rent.' },
  { q: 'What is the employer EPF contribution cap?', a: 'Under EPFO rules, employers contribute 12 per cent of basic salary to the employee pension and provident fund. This contribution can optionally be capped at 12 per cent of the statutory basic salary ceiling of Rs 15,000 per month (which equals Rs 1,800 per month).' },
  { q: 'How is gratuity calculated inside CTC?', a: 'Employers accrue gratuity at 4.81 per cent of basic salary (equivalent to 15 days of salary for every year of completed service). Even though gratuity is only payable after 5 years of continuous service, it is shown as an annual benefit deduction in your CTC structure.' },
  { q: 'What is Special Allowance?', a: 'Special Allowance is a balancing component in your CTC structure. After accounting for basic, HRA, employer PF, and gratuity, the remaining portion of the CTC is designated as special allowance, which is fully taxable for the employee.' },
  { q: 'What is Professional Tax (PT)?', a: 'Professional Tax is a state-level tax levied on salaried employees, capped by the Constitution of India at a maximum of Rs 2,500 per year (typically Rs 200 per month). States like Maharashtra, Karnataka, and West Bengal levy PT, while others do not.' },
  { q: 'Which tax regime is used to calculate tax in this breakdown?', a: 'The calculator estimates income tax based on either the new regime (the default regime with Rs 75,000 standard deduction and rebate up to Rs 12 lakh) or the old regime (with Rs 50,000 standard deduction and Rs 1.5 lakh 80C PF deduction).' },
  { q: 'How does uncapping PF affect in-hand salary?', a: 'Uncapping PF means contributing 12 per cent of your actual basic salary rather than capping it at Rs 1,800. This increases your retirement savings but reduces your monthly in-hand take-home salary.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. The calculators are free tools that give real answers to real financial questions. A free account is available to save results and access them any time. The product is an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ─── CA CTA ─────────────────────────────────────────────────── */

/* ─── Main Client Component ───────────────────────────────────── */

export default function SalaryBreakdownCalculatorClient() {
  const defaultSettings = {
    ctc: 1200000,
    basicPct: 50,
    hraPct: 50,
    pfMode: 'capped' as 'capped' | 'uncapped',
    ptState: 'maharashtra' as 'maharashtra' | 'karnataka' | 'none',
    taxRegime: 'new' as 'new' | 'old',
  };
  const { settings, updateSettings } = useCalculatorSettings('salary-breakdown', defaultSettings);
  const { ctc, basicPct, hraPct, pfMode, ptState, taxRegime } = settings;

  const setCtc = (v: any) => updateSettings({ ctc: typeof v === 'function' ? v(settings.ctc) : v });
  const setBasicPct = (v: any) => updateSettings({ basicPct: typeof v === 'function' ? v(settings.basicPct) : v });
  const setHraPct = (v: any) => updateSettings({ hraPct: typeof v === 'function' ? v(settings.hraPct) : v });
  const setPfMode = (v: any) => updateSettings({ pfMode: typeof v === 'function' ? v(settings.pfMode) : v });
  const setPtState = (v: any) => updateSettings({ ptState: typeof v === 'function' ? v(settings.ptState) : v });
  const setTaxRegime = (v: any) => updateSettings({ taxRegime: typeof v === 'function' ? v(settings.taxRegime) : v });

  const [mobile, setMobile] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-salary-breakdown-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (typeof d.ctc === 'number') setCtc(d.ctc);
      if (typeof d.basicPct === 'number') setBasicPct(d.basicPct);
      if (typeof d.hraPct === 'number') setHraPct(d.hraPct);
      if (d.pfMode === 'capped' || d.pfMode === 'uncapped') setPfMode(d.pfMode);
      if (d.ptState === 'maharashtra' || d.ptState === 'karnataka' || d.ptState === 'none') setPtState(d.ptState);
      if (d.taxRegime === 'new' || d.taxRegime === 'old') setTaxRegime(d.taxRegime);
    } catch { /* ignore */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('fermor-salary-breakdown-v1', JSON.stringify({ ctc, basicPct, hraPct, pfMode, ptState, taxRegime }));
    } catch { /* ignore */ }
  }, [ctc, basicPct, hraPct, pfMode, ptState, taxRegime]);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const result = useMemo(() => {
    // Annualized Basic and HRA
    const basicAnnual = ctc * (basicPct / 100);
    const hraAnnual = basicAnnual * (hraPct / 100);

    // Employer PF
    let employerPFAnnual = basicAnnual * 0.12;
    if (pfMode === 'capped') {
      employerPFAnnual = Math.min(1800 * 12, employerPFAnnual);
    }

    // Gratuity (4.81% of basic)
    const gratuityAnnual = Math.round(basicAnnual * 0.0481);

    // Special Allowance (balancing component)
    const specialAllowanceAnnual = Math.max(0, ctc - basicAnnual - hraAnnual - employerPFAnnual - gratuityAnnual);

    // Monthly components
    const basicMonthly = Math.round(basicAnnual / 12);
    const hraMonthly = Math.round(hraAnnual / 12);
    const specialAllowanceMonthly = Math.round(specialAllowanceAnnual / 12);
    const employerPFMonthly = Math.round(employerPFAnnual / 12);
    const gratuityMonthly = Math.round(gratuityAnnual / 12);

    const grossMonthly = basicMonthly + hraMonthly + specialAllowanceMonthly;
    const grossAnnual = grossMonthly * 12;

    // Deductions
    const employeePFMonthly = employerPFMonthly; // standard PF match
    const employeePFAnnual = employeePFMonthly * 12;

    let ptMonthly = 0;
    if (ptState === 'maharashtra' || ptState === 'karnataka') {
      ptMonthly = 200; // Maharashtra/Karnataka average
    }
    const ptAnnual = ptMonthly * 12;

    // Tax calculation
    const annualTax = taxRegime === 'new' ? calcTaxNew(grossAnnual) : calcTaxOld(grossAnnual, employeePFAnnual);
    const taxMonthly = Math.round(annualTax / 12);

    // In hand salary
    const inHandMonthly = Math.max(0, grossMonthly - employeePFMonthly - ptMonthly - taxMonthly);
    const inHandAnnual = inHandMonthly * 12;

    const totalDeductionsMonthly = employeePFMonthly + ptMonthly + taxMonthly;
    const totalDeductionsAnnual = totalDeductionsMonthly * 12;

    const employerBenefitsMonthly = employerPFMonthly + gratuityMonthly;
    const employerBenefitsAnnual = employerBenefitsMonthly * 12;

    // Donut chart percentages
    const takeHomePct = ctc > 0 ? (inHandAnnual / ctc) * 100 : 0;
    const dedPct = ctc > 0 ? (totalDeductionsAnnual / ctc) * 100 : 0;

    return {
      basicMonthly, basicAnnual,
      hraMonthly, hraAnnual,
      specialAllowanceMonthly, specialAllowanceAnnual,
      employerPFMonthly, employerPFAnnual,
      gratuityMonthly, gratuityAnnual,
      grossMonthly, grossAnnual,
      employeePFMonthly, employeePFAnnual,
      ptMonthly, ptAnnual,
      taxMonthly, annualTax,
      inHandMonthly, inHandAnnual,
      totalDeductionsMonthly, totalDeductionsAnnual,
      employerBenefitsMonthly, employerBenefitsAnnual,
      takeHomePct, dedPct,
    };
  }, [ctc, basicPct, hraPct, pfMode, ptState, taxRegime]);

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
            Salary Breakdown Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Generate a detailed monthly salary component breakdown from your annual CTC, including EPF, HRA, and tax estimates
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="CTC Salary Breakdown Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                
                {/* Inputs */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  <Slider label="Annual CTC" id="sb-ctc" value={ctc} min={300000} max={10000000} step={50000} fmt={fmtC} onChange={setCtc} compact={mobile} />
                  <Slider label="Basic Salary (% of CTC)" id="sb-basic-pct" value={basicPct} min={30} max={60} step={5} fmt={v => `${v}%`} onChange={setBasicPct} compact={mobile} />
                  <Slider label="HRA (% of Basic)" id="sb-hra-pct" value={hraPct} min={30} max={50} step={5} fmt={v => `${v}%`} onChange={setHraPct} compact={mobile} />

                  <ToggleGroup label="EPF Employer Contribution"
                    options={[
                      { value: 'capped', label: 'Capped (Rs 1,800/mo)' },
                      { value: 'uncapped', label: 'Uncapped (12% of Basic)' },
                    ]}
                    value={pfMode} onChange={setPfMode} />

                  <ToggleGroup label="Professional Tax (PT) State"
                    options={[
                      { value: 'maharashtra', label: 'MH / KA (Rs 200/mo)' },
                      { value: 'none', label: 'None' },
                    ]}
                    value={ptState} onChange={setPtState} />

                  <ToggleGroup label="Tax Regime Mode"
                    options={[
                      { value: 'new', label: 'New Tax Regime' },
                      { value: 'old', label: 'Old Tax Regime' },
                    ]}
                    value={taxRegime} onChange={setTaxRegime} />
                </div>

                {/* Outputs */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                      <span style={{ fontSize: mobile ? 12 : 13, fontWeight: 600, color: '#50565C' }}>Monthly In-Hand</span>
                      <p style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', margin: '2px 0 0', letterSpacing: '-0.02em' }}
                        aria-live="polite" aria-label={`Monthly take home is ${fmtIN(result.inHandMonthly)}`}>
                        {fmtIN(result.inHandMonthly)}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: mobile ? 12 : 13, fontWeight: 600, color: '#50565C' }}>Annual Take-Home</span>
                      <p style={{ fontSize: mobile ? 18 : 22, fontWeight: 700, color: '#101214', margin: '2px 0 0', opacity: 0.9 }}>
                        {fmtIN(result.inHandAnnual)}
                      </p>
                    </div>
                  </div>

                  {[
                    { label: 'Basic Salary (Monthly)', value: fmtIN(result.basicMonthly) },
                    { label: 'HRA (Monthly)', value: fmtIN(result.hraMonthly) },
                    { label: 'Special Allowance (Monthly)', value: fmtIN(result.specialAllowanceMonthly) },
                    { label: 'Monthly Gross Salary', value: fmtIN(result.grossMonthly) },
                    { label: 'Total Deductions (Monthly)', value: fmtIN(result.totalDeductionsMonthly) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    <DonutChart takeHomePct={result.takeHomePct} dedPct={result.dedPct} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap', marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>In-Hand {result.takeHomePct.toFixed(0)}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Deductions {result.dedPct.toFixed(0)}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: C.paleLime }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Benefits {(100 - result.takeHomePct - result.dedPct).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Component-wise detailed breakdown table */}
            <section aria-label="Detailed Salary Component Breakdown" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: mobile ? '20px 18px' : '36px 40px', marginBottom: 40 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: C.ink, margin: '0 0 16px' }}>Detailed CTC Breakdown Table</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: '#f4f5f6' }}>
                      <th style={thS} scope="col">Salary Component</th>
                      <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Monthly Amount</th>
                      <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Annual Amount</th>
                      <th style={thS} scope="col">Component Nature</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                      <td style={{ ...tdL, fontWeight: 600 }}>Basic Salary</td>
                      <td style={{ ...tdR, textAlign: 'right' as const }}>{fmtIN(result.basicMonthly)}</td>
                      <td style={{ ...tdR, textAlign: 'right' as const }}>{fmtIN(result.basicAnnual)}</td>
                      <td style={tdL}>Direct Pay (Core taxable)</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                      <td style={{ ...tdL, fontWeight: 600 }}>House Rent Allowance (HRA)</td>
                      <td style={{ ...tdR, textAlign: 'right' as const }}>{fmtIN(result.hraMonthly)}</td>
                      <td style={{ ...tdR, textAlign: 'right' as const }}>{fmtIN(result.hraAnnual)}</td>
                      <td style={tdL}>Direct Pay (Exempt under Sec 10(13A))</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                      <td style={{ ...tdL, fontWeight: 600 }}>Special Allowance</td>
                      <td style={{ ...tdR, textAlign: 'right' as const }}>{fmtIN(result.specialAllowanceMonthly)}</td>
                      <td style={{ ...tdR, textAlign: 'right' as const }}>{fmtIN(result.specialAllowanceAnnual)}</td>
                      <td style={tdL}>Direct Pay (Fully taxable balancing component)</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                      <td style={{ ...tdL, fontWeight: 600 }}>Employer PF Contribution</td>
                      <td style={{ ...tdR, textAlign: 'right' as const }}>{fmtIN(result.employerPFMonthly)}</td>
                      <td style={{ ...tdR, textAlign: 'right' as const }}>{fmtIN(result.employerPFAnnual)}</td>
                      <td style={tdL}>Retirement Benefit (Paid to EPFO)</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                      <td style={{ ...tdL, fontWeight: 600 }}>Gratuity Accrual (4.81% of Basic)</td>
                      <td style={{ ...tdR, textAlign: 'right' as const }}>{fmtIN(result.gratuityMonthly)}</td>
                      <td style={{ ...tdR, textAlign: 'right' as const }}>{fmtIN(result.gratuityAnnual)}</td>
                      <td style={tdL}>Retirement Benefit (Statutory accrual)</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${C.border}`, background: '#f4f5f6', fontWeight: 700 }}>
                      <td style={tdL}>Total Cost to Company (CTC)</td>
                      <td style={{ ...tdR, textAlign: 'right' as const }}>{fmtIN(result.basicMonthly + result.hraMonthly + result.specialAllowanceMonthly + result.employerPFMonthly + result.gratuityMonthly)}</td>
                      <td style={{ ...tdR, textAlign: 'right' as const }}>{fmtIN(ctc)}</td>
                      <td style={tdL}>Total Employer Cost</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${C.border}`, background: '#FFFDF9' }}>
                      <td style={{ ...tdL, fontWeight: 600 }}>Employee PF Deduction (Retirement)</td>
                      <td style={{ ...tdR, textAlign: 'right' as const }}>{fmtIN(result.employeePFMonthly)}</td>
                      <td style={{ ...tdR, textAlign: 'right' as const }}>{fmtIN(result.employeePFAnnual)}</td>
                      <td style={tdL}>Deduction (Invested in PF)</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${C.border}`, background: '#FFFDF9' }}>
                      <td style={{ ...tdL, fontWeight: 600 }}>Professional Tax (PT)</td>
                      <td style={{ ...tdR, textAlign: 'right' as const }}>{fmtIN(result.ptMonthly)}</td>
                      <td style={{ ...tdR, textAlign: 'right' as const }}>{fmtIN(result.ptAnnual)}</td>
                      <td style={tdL}>Deduction (State tax)</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${C.border}`, background: '#FFFDF9' }}>
                      <td style={{ ...tdL, fontWeight: 600 }}>Estimated Income Tax (TDS)</td>
                      <td style={{ ...tdR, textAlign: 'right' as const }}>{fmtIN(result.taxMonthly)}</td>
                      <td style={{ ...tdR, textAlign: 'right' as const }}>{fmtIN(result.annualTax)}</td>
                      <td style={tdL}>Deduction (TDS paid to Govt)</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${C.border}`, background: '#E2F1E0', fontWeight: 800 }}>
                      <td style={tdL}>Net Monthly In-Hand (Take-Home)</td>
                      <td style={{ ...tdR, textAlign: 'right' as const }}>{fmtIN(result.inHandMonthly)}</td>
                      <td style={{ ...tdR, textAlign: 'right' as const }}>{fmtIN(result.inHandAnnual)}</td>
                      <td style={tdL}>Final Disposable Income</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Save Results Card */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-salary-breakdown">What Is a Salary Breakdown Calculator?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    A salary breakdown calculator is an interactive tool that decomposes your annual Cost to Company (CTC) into monthly payouts, tax deductions, and retirement benefits. It is also known as a paycheck breakdown calculator or payroll breakdown calculator.
                  </p>
                </div>
                <p style={p}>
                  Salaried professionals in India often find a mismatch between their official salary package and their actual bank credits. By using this online calculator to break down salary package structures, you can view your core basic pay, House Rent Allowance (HRA), special allowance, and retirement savings (EPF, gratuity). This transparency helps you plan monthly expenditures and optimize tax-saving investments.
                </p>
                <p style={p}>
                  To see how HRA tax deductions operate in detail, check our specialized <a href="/calculators/hra-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>HRA Calculator</a>, or verify your total tax liabilities using the <a href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</a>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="ctc-vs-gross-vs-net">Difference between CTC, Gross Salary, and Net In-Hand Salary</h2>
                <p style={p}>
                  When you break down my salary, you must distinguish between three distinct terms:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Cost to Company (CTC):</strong> The total annual expenditure incurred by the employer. It includes your gross pay plus employer contributions to retirement funds (EPF, Gratuity) and non-cash benefits.</li>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Gross Salary:</strong> The total amount shown on your payslip before tax deductions. It excludes employer-paid benefits like employer EPF and gratuity.</li>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Net In-Hand Salary:</strong> The actual cash credited to your bank account. This represents your gross salary minus employee deductions like employee EPF, professional tax, and TDS income tax.</li>
                </ul>
              </div>

              <div style={sec}>
                <h2 style={h2} id="basic-component">Basic Salary Component in Your Payroll Breakdown Calculator</h2>
                <p style={p}>
                  The basic salary is the core taxable block of your salary package, typically set at 40% or 50% of the total CTC. It forms the base for other statutory calculations. For example, your employee EPF contribution (12% of basic) and gratuity accrual (4.81% of basic) are derived directly from this component. A higher basic pay improves long-term retirement savings but also increases your taxable base.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="hra-calculation">Understanding House Rent Allowance (HRA) Calculations</h2>
                <p style={p}>
                  House Rent Allowance (HRA) is structured to cover rental accommodation costs. It is typically set at 50% of basic salary for metro cities (Delhi, Mumbai, Kolkata, Chennai) and 40% for non-metros. Under Section 10(13A) of the Income Tax Act, you can claim HRA tax exemptions by submitting rent receipts.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="epf-rules">Employer vs Employee EPF Contribution Rules</h2>
                <p style={p}>
                  The Employees&apos; Provident Fund (EPF) is a mandatory savings scheme for salaried individuals in India. Both the employer and employee contribute 12% of the basic salary to the fund.
                </p>
                <p style={p}>
                  In your cost to company salary breakdown, the employer&apos;s contribution is shown as a benefit and subtracted from the CTC. The employee&apos;s contribution is shown as a payroll deduction from your gross salary. You can select between capped EPF (limited to a basic salary of Rs 15,000 per month, resulting in a Rs 1,800 monthly contribution) or uncapped EPF (12% of your actual basic salary).
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="gratuity-accrual">Accruing Gratuity in the Cost to Company Salary Breakdown</h2>
                <p style={p}>
                  Gratuity is a statutory retirement benefit payable under the Payment of Gratuity Act, 1972. It is accrued by employers at 4.81% of your basic salary. Although gratuity is only legally payable after 5 years of continuous service, companies show it as an annual benefit deduction in your salary package. To estimate your gratuity payout upon retirement, use our <a href="/calculators/gratuity-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Gratuity Calculator</a>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="special-allowance">Role of Special Allowance as a Balancing Component</h2>
                <p style={p}>
                  Special allowance is a balancing figure in your salary structure. Once your basic salary, HRA, employer EPF, and gratuity are defined, the remaining portion of your CTC is placed under special allowance. Unlike HRA or LTA, special allowance is fully taxable. To see how this component affects your tax liability, you can read our guide on the <a href="/calculators/lta-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>LTA Calculator</a>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="professional-tax">Professional Tax Slabs by State in India</h2>
                <p style={p}>
                  Professional Tax (PT) is a state-level tax levied on individuals practicing a profession or employment. It is capped at a maximum of Rs 2,500 per year by the Constitution of India. States like Maharashtra and Karnataka levy a flat Rs 200 per month (MH charges Rs 300 in February), which is deducted directly from your gross salary. Some states do not levy this tax.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="tax-slabs">Estimated Income Tax Slabs: Old vs New Tax Regime</h2>
                <p style={p}>
                  Your final take-home salary is highly dependent on your chosen tax regime. Under the New Tax Regime, tax slabs are lower, and standard deduction is Rs 75,000, with a rebate that makes incomes up to Rs 12 lakh tax-free in FY 2026-27. Under the Old Tax Regime, tax slabs are higher, but you can claim deductions for HRA, Section 80C (including your EPF contribution), and other investments.
                </p>
                <p style={p}>
                  To analyze which regime saves you more money and increases your net paycheck, check our <a href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Old vs New Tax Regime Calculator</a>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="yearly-to-monthly">How to Break Down Yearly Salary into Monthly Take-Home</h2>
                <p style={p}>
                  To convert an annual CTC into a monthly paycheck, a wage breakdown calculator must process several deductions. First, it converts the annual CTC into a monthly CTC. Next, it subtracts employer benefits (EPF, gratuity) to find your monthly gross salary. Finally, it deducts employee EPF, professional tax, and income tax TDS to arrive at your monthly take-home salary.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="customizing-settings">Customizing Your Paycheck Breakdown Calculator Settings</h2>
                <p style={p}>
                  Every company follows a slightly different payroll structure. Our ctc breakdown calculator allows you to adjust the basic salary percentage (from 30% to 60%) and HRA percentage (from 30% to 50%) to match your actual employment letter. You can also toggle between capped and uncapped EPF modes to match your company&apos;s PF policy.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="deductions-and-benefits">Common Payroll Deductions and Benefits inside CTC</h2>
                <p style={p}>
                  To visualize how your salary is split, our tool displays your net take-home salary, total tax deductions, and company benefits. Company benefits represent the non-cash portion of your CTC that accumulates for your future retirement. Monthly deductions represent the portion paid as taxes or mandatory savings during the month.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This CTC Breakdown Calculator Online</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Input Annual CTC:</strong> Drag the slider to set your annual Cost to Company (CTC).
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Adjust Basic and HRA Percentages:</strong> Modify the basic salary share and HRA share to match your payroll structure.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select EPF Contribution Mode:</strong> Choose capped (Rs 1,800/month) or uncapped (12% of basic).
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select State PT and Tax Regime:</strong> Select your state for professional tax and select your tax regime.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Review Detailed CTC Table:</strong> View the monthly and annual salary components, deductions, and final disposable income in the breakdown table.
                  </li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative estimates. Actual monthly take-home salary depends on specific allowances (such as food coupons, LTA, medical insurance), employer verify rules, and your direct tax declarations. Consult a qualified Chartered Accountant or your company HR manager for exact figures. 
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <aside className="sb-sidebar" aria-label="Related calculators" style={{
            display: mobile ? 'none' : 'flex', flexDirection: 'column', gap: 16,
            overflowY: 'auto', position: 'sticky', top: 24,
            maxHeight: 'calc(100vh - 100px)',
          } as React.CSSProperties}>
            <style>{`
              .sb-sidebar::-webkit-scrollbar { width: 5px; }
              .sb-sidebar::-webkit-scrollbar-track { background: transparent; }
              .sb-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
              .sb-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
            `}</style>
            <div className="sb-sidebar" style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
              display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0,
            }}>
              <SidebarList title="Salary Tools" items={POPULAR} />
              <SidebarList title="Tax & Savings" items={MORE} />
            </div>
          </aside>

        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/sip-calculator|SIP', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/cagr-calculator|CAGR', '/calculators/swp-calculator|SWP', '/calculators/emi-calculator|EMI', '/calculators/fd-calculator|FD', '/calculators/ppf-calculator|PPF', '/calculators/xirr-calculator|XIRR', '/calculators/compound-interest-calculator|Compound Int.'] },
        { hd: 'Topics', links: ['/calculators/sip-calculator|Mutual Funds', '/calculators/home-loan-calculator|Home Loans', '/calculators/fd-calculator|Fixed Deposits', '/calculators/retirement-calculator|Retirement'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

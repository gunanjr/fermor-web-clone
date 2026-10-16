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

/* ─── Tax Math ───────────────────────────────────────────────── */
function calcTaxOld(income: number): number {
  if (income <= 250000) return 0;
  if (income <= 500000) return (income - 250000) * 0.05;
  if (income <= 1000000) return 12500 + (income - 500000) * 0.2;
  return 12500 + 100000 + (income - 1000000) * 0.3;
}

function calcTaxNew(income: number): number {
  if (income <= 300000) return 0;
  if (income <= 700000) return (income - 300000) * 0.05;
  if (income <= 1000000) return 20000 + (income - 700000) * 0.1;
  if (income <= 1200000) return 50000 + (income - 1000000) * 0.15;
  if (income <= 1500000) return 80000 + (income - 1200000) * 0.2;
  return 140000 + (income - 1500000) * 0.3;
}

/* ─── Year-by-Year Bar Chart ─────────────────────────────────── */
function BarChart({ rows }: { rows: { year: number; taxPaid: number; taxSaved: number }[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxAnnual = Math.max(...rows.map(r => r.taxPaid + r.taxSaved));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;
  return (
    <svg role="img" aria-label="Year-by-year tax paid and tax saved breakdown"
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {rows.map((row, i) => {
        const total = row.taxPaid + row.taxSaved;
        const totalH = maxAnnual > 0 ? (total / maxAnnual) * H : 0;
        const paidH = total > 0 ? (row.taxPaid / total) * totalH : 0;
        const savedH = totalH - paidH;
        const x = PADL + i * slot + gap;
        return (
          <g key={row.year}>
            <rect x={x} y={H - totalH} width={barW} height={savedH} fill={CHART_PAIR.secondary} rx={2} />
            <rect x={x} y={H - paidH} width={barW} height={paidH} fill={CHART_PAIR.primary} rx={2} />
            {rows.length <= 30 && (
              <text x={x + barW / 2} y={H + 14} textAnchor="middle"
                style={{ fontSize: rows.length > 20 ? 7 : 9, fill: C.ink3, fontFamily: INTER }}>
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

/* ─── Donut Chart ────────────────────────────────────────────── */
function DonutChart({ principal, interest }: { principal: number; interest: number }) {
  const total = principal + interest;
  if (total === 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const pArc = (principal / total) * circ;
  const pPct = Math.round((principal / total) * 100);
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Take-home ${pPct}% of income, tax paid ${100 - pPct}%`}
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
  { href: '/calculators/old-vs-new-tax-regime-calculator',   label: 'Old vs New Tax Regime Calculator' },
  { href: '/calculators/hra-calculator',                     label: 'HRA Calculator' },
  { href: '/calculators/capital-gains-calculator',           label: 'Capital Gains Calculator' },
  { href: '/calculators/epf-calculator',                     label: 'EPF Calculator' },
  { href: '/calculators/ppf-calculator',                     label: 'PPF Calculator' },
  { href: '/calculators/elss-calculator',                    label: 'ELSS Calculator' },
];
const MORE = [
  { href: '/calculators/sip-calculator',                     label: 'SIP Calculator' },
  { href: '/calculators/lumpsum-calculator',                 label: 'Lumpsum Calculator' },
  { href: '/calculators/fd-calculator',                      label: 'FD Calculator' },
  { href: '/calculators/nps-calculator',                     label: 'NPS Calculator' },
  { href: '/calculators/retirement-calculator',              label: 'Retirement Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'How much tax can I save under Section 80C?',
    a: 'The maximum deduction under Section 80C is Rs 1.5 lakh per financial year. Investing the full amount in eligible instruments reduces your taxable income, saving up to Rs 46,800 in tax under the old regime at the 30% slab plus 4% cess.',
  },
  {
    q: 'What investments qualify for Section 80C deduction?',
    a: 'Section 80C covers: EPF, PPF, ELSS, tax-saving fixed deposits (5-year lock-in), NSC, life insurance premiums, Sukanya Samriddhi Yojana, Senior Citizens Savings Scheme, tuition fees for children, principal repayment on home loan, and stamp duty on property purchase.',
  },
  {
    q: 'What is the tax saving under Section 80D for health insurance?',
    a: 'Section 80D allows deductions for health insurance premiums: up to Rs 25,000 for self/family (under 60), up to Rs 25,000 for parents (Rs 50,000 if parents are senior citizens), and up to Rs 50,000 for senior citizens. Preventive health check-ups up to Rs 5,000 are included.',
  },
  {
    q: 'How much can I save with NPS under Section 80CCD?',
    a: 'Section 80CCD(1B) provides an additional deduction of up to Rs 50,000 exclusively for NPS contributions, over and above the Rs 1.5 lakh Section 80C limit. Total tax-saving through retirement contributions can reach Rs 2 lakh per year.',
  },
  {
    q: 'What is the difference between old and new tax regime for tax saving?',
    a: 'The old regime allows deductions and exemptions (80C, 80D, HRA, LTA) to reduce taxable income. The new regime offers lower tax rates but disallows most deductions. The old regime is generally better if you have total deductions exceeding Rs 2.5-3 lakh.',
  },
  {
    q: 'Can I claim both 80C and 80CCD(1B) deductions?',
    a: 'Yes. Section 80C provides up to Rs 1.5 lakh deduction and Section 80CCD(1B) provides an additional up to Rs 50,000 deduction for NPS. These are separate limits and can be claimed together in the same financial year.',
  },
  {
    q: 'What is the tax saving on home loan interest?',
    a: 'Section 24(b) allows deduction of up to Rs 2 lakh per year on home loan interest for self-occupied property (no limit for let-out properties). Section 80EEA provides an additional Rs 1.5 lakh for first-time home buyers. Principal repayment qualifies under Section 80C.',
  },
  {
    q: 'How much tax can I save by investing in ELSS?',
    a: 'ELSS qualifies for Section 80C deduction up to Rs 1.5 lakh. At the 30% tax slab, investing Rs 1.5 lakh in ELSS saves Rs 46,800 in tax. ELSS has the shortest lock-in period of 3 years among all 80C options.',
  },
  {
    q: 'Can NRIs claim tax-saving deductions in India?',
    a: 'Yes, NRIs can claim Section 80C (through PPF, ELSS, NPS, life insurance), Section 80D (health insurance for parents in India), and Section 80CCD(1B) (NPS). Only Indian-source income qualifies for these deductions.',
  },
  {
    q: 'What happens if I do not invest in tax-saving instruments?',
    a: 'Under the old regime, you pay higher tax on full income. Under the new regime, you do not need to invest in tax-saving instruments since deductions are not available. The new regime offers lower rates without requiring any tax-saving investments.',
  },
  {
    q: 'What is the maximum total tax deduction possible in India?',
    a: 'Under the old regime, maximum deductions can reach approximately Rs 5-6 lakh per year: Rs 1.5 lakh under 80C, Rs 50,000 under 80CCD(1B), Rs 50,000 under 80D, Rs 2 lakh under Section 24(b) home loan interest, and other deductions like 80E and 80G.',
  },
  {
    q: 'How is the deduction under Section 80E for education loans?',
    a: 'Section 80E allows deduction for interest paid on education loans for higher studies with no upper limit. The deduction is available for a maximum of 8 years or until interest is fully paid. The loan must be for the individual, spouse, children, or legal guardian.',
  },
  {
    q: 'What is the tax saving if my annual salary is Rs 25 lakh?',
    a: 'At Rs 25 lakh salary under the old regime, your tax is Rs 4.70 lakh (30% slab + 4% cess). With maximum deductions of Rs 5-6 lakh, your tax reduces to approximately Rs 2.74 lakh, saving Rs 1.96 lakh. Under the new regime (no deductions), you pay Rs 3.52 lakh. The old regime saves more if you have substantial investments.',
  },
  {
    q: 'When is the deadline to invest for tax saving deductions?',
    a: 'Tax-saving investments must be made before March 31 of the financial year to claim deductions for that fiscal year. For example, investments made up to March 31, 2026 qualify for deductions in FY 2025-26. ITR must be filed by the due date (usually July 31) with proof of investment.',
  },
  {
    q: 'Can salaried employees claim higher tax deductions than business owners?',
    a: 'No, Section 80C, 80D, and 80CCD deductions are available to both salaried employees and business owners. Business owners also deduct business expenses under Section 37. Salaried employees get HRA and LTA exemptions (if eligible). Section 80C limit is Rs 1.5 lakh for all individuals regardless of profession.',
  },
  {
    q: 'Is tax saving investment mandatory if I use the new tax regime?',
    a: 'No, tax-saving investments are not mandatory under the new regime since deductions like 80C and 80D are not allowed. You simply pay tax at specified slabs. Most taxpayers fall under the new regime by default (since FY 2023-24), but you can choose the old regime if you have substantial deductions.',
  },
  {
    q: 'What is the best tax-saving investment if I have Rs 1.5 lakh to invest?',
    a: 'The best choice depends on your risk appetite. PPF (15-year lock-in, 7.1% return, safe) suits conservative investors. ELSS (3-year lock-in, equity-based, 10-15% historical return) suits growth investors. NPS provides additional deduction of Rs 50,000. A mix of PPF (60%) and ELSS (40%) balances safety and growth. Consult a SEBI-registered adviser.',
  },
  {
    q: 'Can self-employed professionals claim tax-saving deductions?',
    a: 'Yes, self-employed professionals can claim all Section 80C, 80D, 80CCD(1B), and other deductions like salaried employees. They also benefit from additional business expense deductions under Section 37. Deductions are taken before calculating taxable income, separate from personal deductions.',
  },
  {
    q: 'What is the tax saving if I invest only Rs 50,000 in Section 80C?',
    a: 'At the 30% tax slab, investing Rs 50,000 in Section 80C saves Rs 15,600 in tax (including 4% cess). At the 20% slab, the saving is Rs 10,400. At the 5% slab, the saving is Rs 2,600. Actual tax saved depends on your income level and applicable tax slab.',
  },
  {
    q: 'Is NPS better than PPF for tax-saving and returns?',
    a: 'Both serve different purposes. PPF offers fixed 7.1% return and full withdrawal at age 60 tax-free. NPS offers market-linked returns (7-10% historical average). At maturity, NPS requires 40% annuity purchase (taxable), while 60% can be withdrawn tax-free. For higher earners, NPS + PPF combination is optimal.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product connects real financial accounts through the Account Aggregator framework and automates financial decisions.',
  },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ─── Main ───────────────────────────────────────────────────── */

export default function TaxSavingCalculatorClient({ region = 'in' }: { region?: string }) {
  const defaultSettings = {
    annualIncome: 1000000,
    investment80C: 50000,
    investment80D: 10000,
    npsContribution: 0,
    homeLoanInterest: 0,
    useOldRegime: true,
    currentAge: 30,
    retirementAge: 60,
    annualIncomeGrowth: 8,
  };
  const { settings, updateSettings } = useCalculatorSettings('tax-saving-calculator', defaultSettings);
  const { annualIncome, investment80C, investment80D, npsContribution, homeLoanInterest, useOldRegime, currentAge, retirementAge, annualIncomeGrowth } = settings;

  const setAnnualIncome = (v: number) => updateSettings({ annualIncome: v });
  const setInvestment80C = (v: number) => updateSettings({ investment80C: v });
  const setInvestment80D = (v: number) => updateSettings({ investment80D: v });
  const setNpsContribution = (v: number) => updateSettings({ npsContribution: v });
  const setHomeLoanInterest = (v: number) => updateSettings({ homeLoanInterest: v });
  const setUseOldRegime = (v: boolean) => updateSettings({ useOldRegime: v });
  const setCurrentAge = (v: number) => updateSettings({ currentAge: v });
  const setRetirementAge = (v: number) => updateSettings({ retirementAge: v });
  const setAnnualIncomeGrowth = (v: number) => updateSettings({ annualIncomeGrowth: v });

  const [mobile, setMobile] = useState(false);
  const [showGrowth, setShowGrowth] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const totalDeductions = investment80C + investment80D + npsContribution + homeLoanInterest;
  const taxableIncomeOld = Math.max(0, annualIncome - totalDeductions);
  const taxableIncomeNew = annualIncome;

  const taxOldOnFull = calcTaxOld(annualIncome);
  const taxOldOnDeducted = calcTaxOld(taxableIncomeOld);
  const taxNew = calcTaxNew(taxableIncomeNew);

  const taxLiability = useOldRegime ? taxOldOnDeducted : taxNew;
  const regimeDiff = Math.abs(taxOldOnDeducted - taxNew);
  const betterRegime = taxNew < taxOldOnDeducted ? 'New Regime' : 'Old Regime';
  const taxSaved = useOldRegime ? taxOldOnFull - taxOldOnDeducted : 0;
  const effectiveTaxRate = annualIncome > 0 ? (taxLiability / annualIncome) * 100 : 0;

  const takeHome = annualIncome - taxLiability;
  const takeHomePct = annualIncome > 0 ? Math.round((takeHome / annualIncome) * 100) : 0;
  const taxPct = 100 - takeHomePct;

  const oldTaxWithFullDeductions = calcTaxOld(Math.max(0, annualIncome - 450000));

  const growthYears = useMemo(() => {
    const years = Math.max(0, retirementAge - currentAge);
    const startYear = new Date().getFullYear();
    const rows: { year: number; income: number; taxWithoutDeductions: number; taxableIncome: number; taxPaid: number; taxSaved: number; cumulativeSaved: number }[] = [];
    let cumulativeSaved = 0;
    for (let y = 0; y < years; y++) {
      const incomeY = annualIncome * Math.pow(1 + annualIncomeGrowth / 100, y);
      const taxWithoutDeductions = calcTaxOld(incomeY);
      const taxableIncomeY = Math.max(0, incomeY - totalDeductions);
      const taxPaid = calcTaxOld(taxableIncomeY);
      const taxSavedY = taxWithoutDeductions - taxPaid;
      cumulativeSaved += taxSavedY;
      rows.push({ year: startYear + y, income: incomeY, taxWithoutDeductions, taxableIncome: taxableIncomeY, taxPaid, taxSaved: taxSavedY, cumulativeSaved });
    }
    return rows;
  }, [annualIncome, totalDeductions, currentAge, retirementAge, annualIncomeGrowth]);

  const totalCumulativeSaved = growthYears[growthYears.length - 1]?.cumulativeSaved || 0;
  const finalYearIncome = growthYears[growthYears.length - 1]?.income || annualIncome;

  const h2 = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const h3 = { fontSize: 15.5, fontWeight: 600, color: C.ink, margin: '0 0 6px' } as React.CSSProperties;
  const p = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;

  const regimeLabel = useOldRegime ? 'Old Regime' : 'New Regime';

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Tax Saving Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate how much you can save on taxes under Section 80C, 80D, NPS, and home loan deductions. Compare savings across income slabs.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="Tax Saving Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

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
                      <Slider label="Annual Taxable Income" id="tax-inc" value={annualIncome} min={500000} max={10000000} step={50000} fmt={v => fmtC(v)} onChange={setAnnualIncome} compact={mobile} />
                      <Slider label="Section 80C Investments" id="tax-80c" value={investment80C} min={0} max={150000} step={10000} fmt={v => fmtC(v)} onChange={setInvestment80C} compact={mobile} />
                      <Slider label="Section 80D Health Insurance Premium" id="tax-80d" value={investment80D} min={0} max={100000} step={5000} fmt={v => fmtC(v)} onChange={setInvestment80D} compact={mobile} />
                      <Slider label="NPS Contribution (80CCD(1B))" id="tax-nps" value={npsContribution} min={0} max={50000} step={5000} fmt={v => fmtC(v)} onChange={setNpsContribution} compact={mobile} />
                      <Slider label="Home Loan Interest (Section 24b)" id="tax-home" value={homeLoanInterest} min={0} max={500000} step={10000} fmt={v => fmtC(v)} onChange={setHomeLoanInterest} compact={mobile} />

                      <button onClick={() => setShowAdvanced(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600, marginBottom: 24 }}>
                        More settings
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <Slider label="Current Age" id="tax-age" value={currentAge} min={18} max={59} step={1} fmt={v => `${v} yr`} onChange={setCurrentAge} compact={mobile} />
                      <Slider label="Retirement Age" id="tax-retire" value={retirementAge} min={50} max={70} step={1} fmt={v => `${v} yr`} onChange={setRetirementAge} compact={mobile} />
                      <Slider label="Expected Annual Income Growth" id="tax-growth" value={annualIncomeGrowth} min={0} max={20} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={setAnnualIncomeGrowth} compact={mobile} />
                      <div style={{ padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: C.ink, fontWeight: 700, marginBottom: 4 }}>
                          <span>Tax Saved Till Retirement</span>
                          <span>{useOldRegime ? fmtC(Math.round(totalCumulativeSaved)) : 'Old Regime only'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.ink2, marginBottom: 2 }}>
                          <span>Projection period</span>
                          <span>{growthYears.length} years</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.ink2 }}>
                          <span>Income in final year</span>
                          <span>{fmtC(Math.round(finalYearIncome))}</span>
                        </div>
                      </div>
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: '0 0 24px' }}>
                        These power the Year-by-Year Tax Savings Growth chart below, projecting your cumulative tax saved from now until retirement as your income grows.
                      </p>

                      <div style={{ marginBottom: 24 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                          <label style={{ fontSize: mobile ? 13.5 : 14, color: C.ink2, fontWeight: 400 }}>Tax Regime</label>
                          <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: C.ink }}>{regimeLabel}</span>
                        </div>
                        <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                          {['Old Regime', 'New Regime'].map(o => {
                            const active = (o === 'Old Regime') === useOldRegime;
                            return (
                              <button key={o} onClick={() => setUseOldRegime(o === 'Old Regime')}
                                aria-pressed={active}
                                style={{
                                  flex: 1, padding: '10px 0', fontSize: 13.5,
                                  fontWeight: active ? 600 : 400,
                                  color: active ? C.ink : C.ink3,
                                  background: active ? C.white : 'transparent',
                                  border: 'none', cursor: 'pointer', fontFamily: INTER,
                                  transition: 'all 0.12s',
                                }}>
                                {o}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <button onClick={() => setShowAdvanced(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600, marginBottom: 24 }}>
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        Back
                      </button>
                    </>
                  )}

                  {!showAdvanced && (
                    <div style={{ marginBottom: 24 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                        <label style={{ fontSize: mobile ? 13.5 : 14, color: C.ink2, fontWeight: 400 }}>Tax Regime</label>
                        <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: C.ink }}>{regimeLabel}</span>
                      </div>
                      <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                        {['Old Regime', 'New Regime'].map(o => {
                          const active = (o === 'Old Regime') === useOldRegime;
                          return (
                            <button key={o} onClick={() => setUseOldRegime(o === 'Old Regime')}
                              aria-pressed={active}
                              style={{
                                flex: 1, padding: '10px 0', fontSize: 13.5,
                                fontWeight: active ? 600 : 400,
                                color: active ? C.ink : C.ink3,
                                background: active ? C.white : 'transparent',
                                border: 'none', cursor: 'pointer', fontFamily: INTER,
                                transition: 'all 0.12s',
                              }}>
                              {o}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div style={{ padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: C.ink, fontWeight: 700 }}>
                      <span>Total Deductions</span>
                      <span>{fmtC(totalDeductions)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.ink2, marginTop: 4 }}>
                      <span>Taxable Income after Deductions</span>
                      <span>{fmtC(taxableIncomeOld)}</span>
                    </div>
                    {showAdvanced && (
                      <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 8, paddingTop: 6 }}>
                        {[
                          { label: 'Section 80C', value: investment80C },
                          { label: 'Section 80D', value: investment80D },
                          { label: 'NPS 80CCD(1B)', value: npsContribution },
                          { label: 'Home Loan Interest 24(b)', value: homeLoanInterest },
                        ].map(({ label, value }) => (
                          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.ink2, marginTop: 2 }}>
                            <span>{label}</span>
                            <span>{fmtC(value)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Result panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>
                        Total Tax Liability
                      </div>
                      <div style={{ fontSize: mobile ? 11 : 12, color: '#7A8087', marginTop: 2 }}>{regimeLabel}</div>
                    </div>
                    <span aria-live="polite" aria-label={`Total tax liability: ${fmtIN(Math.round(taxLiability))}`}
                      style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {fmtIN(Math.round(taxLiability))}
                    </span>
                  </div>

                  {[
                    { label: 'Annual Income', value: fmtC(annualIncome) },
                    { label: 'Total Deductions', value: fmtC(totalDeductions) },
                    { label: 'Taxable Income', value: fmtC(useOldRegime ? taxableIncomeOld : taxableIncomeNew) },
                    { label: 'Tax Saved', value: `${fmtC(Math.round(taxSaved))}` },
                    { label: 'Effective Tax Rate', value: `${effectiveTaxRate.toFixed(1)}%` },
                    { label: 'Years to Retirement', value: `${growthYears.length} years` },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  {useOldRegime && taxSaved > 0 && (
                    <div style={{ width: '100%', marginTop: 12, padding: '10px 14px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, color: C.ink2, lineHeight: 1.6 }}>
                      You save <strong style={{ color: '#1f7a58' }}>{fmtC(Math.round(taxSaved))}</strong> in tax by claiming {fmtC(totalDeductions)} in deductions under the old regime.
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    <DonutChart principal={takeHome} interest={taxLiability} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Take-home {takeHomePct}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Tax Paid {taxPct}%</span>
                    </div>
                  </div>

                  <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Take-home {takeHomePct}%</span>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Tax Paid {taxPct}%</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`Take-home is ${takeHomePct}% of income`}>
                      <div style={{ height: '100%', width: `${takeHomePct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>

                  <div style={{ width: '100%', marginTop: mobile ? 20 : 28 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 2px' }}>Old vs New Regime</p>
                    {[
                      { label: 'Old Regime Tax (with deductions)', value: fmtC(Math.round(taxOldOnDeducted)) },
                      { label: 'New Regime Tax', value: fmtC(Math.round(taxNew)) },
                      {
                        label: 'Lower Tax For You',
                        value: regimeDiff === 0
                          ? 'Same in both'
                          : `${betterRegime} (${fmtC(Math.round(regimeDiff))} less)`,
                      },
                    ].map(({ label, value }) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                        <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                        <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink, textAlign: 'right' }}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Year-by-Year Tax Savings Growth dropdown */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowGrowth(v => !v)}
                  aria-expanded={showGrowth} aria-controls="growth-table"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Year-by-Year Tax Savings Growth</span>
                    {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>Projected to retirement at {annualIncomeGrowth.toFixed(1)}% income growth</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {growthYears.length} yr · {regimeLabel}
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      aria-hidden="true" style={{ transform: showGrowth ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {showGrowth && (
                  <div id="growth-table" style={{ borderTop: `1px solid ${C.border}` }}>
                    {!useOldRegime || totalDeductions === 0 ? (
                      <div style={{ padding: mobile ? '20px' : '24px 44px' }}>
                        <p style={{ fontSize: 13.5, color: C.ink2, lineHeight: 1.7, margin: 0 }}>
                          {!useOldRegime
                            ? 'Deductions only reduce tax under the Old Regime. Switch to Old Regime above to see your projected tax savings grow year by year.'
                            : 'Add at least one deduction (Section 80C, 80D, NPS, or home loan interest) above to see your projected tax savings grow year by year.'}
                        </p>
                      </div>
                    ) : (
                      <>
                        <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                          <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} aria-hidden="true" />
                              <span style={{ fontSize: 11.5, color: C.ink2 }}>Tax Paid</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} aria-hidden="true" />
                              <span style={{ fontSize: 11.5, color: C.ink2 }}>Tax Saved</span>
                            </div>
                          </div>
                          <BarChart rows={growthYears} />
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
                          <table style={{ minWidth: 700, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                            <thead>
                              <tr style={{ background: '#f4f5f6' }}>
                                {['Year', 'Income', 'Tax Without Deductions', 'Taxable Income', 'Tax Paid', 'Tax Saved', 'Cumulative Saved'].map(h => (
                                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }} scope="col">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {growthYears.map((row, i) => (
                                <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                  <td style={{ padding: '11px 14px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                                  <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtIN(row.income)}</td>
                                  <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtIN(row.taxWithoutDeductions)}</td>
                                  <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtIN(row.taxableIncome)}</td>
                                  <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtIN(row.taxPaid)}</td>
                                  <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtIN(row.taxSaved)}</td>
                                  <td style={{ padding: '11px 14px', color: C.ink, fontWeight: 600 }}>{fmtIN(row.cumulativeSaved)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* Waitlist */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-tax-saving">What Is Tax Saving in India?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Tax saving in India refers to legally reducing your income tax liability by investing in government-approved instruments and claiming deductions under various sections of the Income Tax Act, 1961. The most common tax-saving route is Section 80C, which offers deductions up to Rs 1.5 lakh per year.
                  </p>
                </div>
                <p style={p}>
                  The Indian tax system offers multiple deduction avenues beyond 80C. Section 80D covers health insurance premiums. Section 80CCD(1B) provides an additional Rs 50,000 deduction for NPS contributions. Home loan borrowers can claim up to Rs 2 lakh in interest under Section 24(b). These deductions can significantly reduce your taxable income and, consequently, your tax outgo.
                </p>
                <p style={p}>
                  Tax planning is most effective when done at the start of the financial year. The earlier you invest, the longer your money grows while also saving tax. Use this <Link href="/calculators/in-hand-salary-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>In-Hand Salary Calculator</Link> to see how tax deductions affect your monthly take-home pay.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="section-80c">Section 80C Deductions</h2>
                <p style={p}>
                  Section 80C is the most widely used tax-saving provision in India. It allows a deduction of up to Rs 1.5 lakh per financial year for investments and specified expenses. The deduction is available only under the old tax regime.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Eligible investments under Section 80C</caption>
                    <thead><tr><th style={thS} scope="col">Investment</th><th style={thS} scope="col">Lock-in Period</th><th style={thS} scope="col">Estimated Return</th></tr></thead>
                    <tbody>
                      {[
                        ['Employee Provident Fund (EPF)', 'Until retirement', '8.25% (FY 2025-26)'],
                        ['Public Provident Fund (PPF)', '15 years', '7.1% (current)'],
                        ['Equity Linked Savings Scheme (ELSS)', '3 years', 'Market-linked (10-15% historical)'],
                        ['Tax-Saving Fixed Deposit', '5 years', '6-7.5% (bank-dependent)'],
                        ['National Savings Certificate (NSC)', '5 years', '7.7% (current)'],
                        ['Life Insurance Premium', 'Policy-dependent', 'N/A (insurance cover)'],
                        ['Sukanya Samriddhi Yojana (SSY)', '21 years / until marriage', '8.2% (current)'],
                        ['Senior Citizens Savings Scheme (SCSS)', '5 years', '8.2% (current)'],
                        ['Tuition Fees (children)', 'N/A', 'N/A (expense deduction)'],
                        ['Home Loan Principal Repayment', 'Loan tenure', 'N/A (principal repayment)'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={tdR}>{r[1]}</td>
                          <td style={tdR}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="section-80d">Section 80D Health Insurance Deduction</h2>
                <p style={p}>
                  Section 80D of the Income Tax Act allows deductions for health insurance premiums paid for yourself, your spouse, children, and parents. The deduction limits depend on the age of the insured persons.
                </p>
                <p style={p}>
                  For individuals below 60 years: up to Rs 25,000 for self, spouse, and children. An additional Rs 25,000 for parents below 60 (Rs 50,000 if parents are senior citizens). Preventive health check-ups up to Rs 5,000 are included within the overall limit. For senior citizens, the limit is Rs 50,000 for self and Rs 50,000 for parents.
                </p>
                <p style={p}>
                  Use the <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</Link> to see how 80D deductions reduce your total tax liability.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="nps-tax-benefit">NPS Tax Benefit Under Section 80CCD(1B)</h2>
                <p style={p}>
                  The National Pension System (NPS) offers a unique additional deduction under Section 80CCD(1B). You can claim up to Rs 50,000 per year over and above the Rs 1.5 lakh limit of Section 80C. This means total retirement contribution deductions can reach Rs 2 lakh per year.
                </p>
                <p style={p}>
                  NPS is regulated by the Pension Fund Regulatory and Development Authority (PFRDA). Subscribers can choose between Active Choice (equity/debt allocation) and Auto Choice (lifecycle-based allocation). At the 30% tax slab, the additional Rs 50,000 NPS deduction saves Rs 15,600 in tax (including 4% cess).
                </p>
                <p style={p}>
                  Unlike EPF, NPS has a 60% lump sum withdrawal (tax-free) and 40% annuity (taxable) structure at maturity. The <Link href="/calculators/nps-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>NPS Calculator</Link> can project your full NPS corpus at retirement.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="home-loan-tax-benefit">Home Loan Tax Benefits</h2>
                <p style={p}>
                  Home loan borrowers get tax benefits under three sections. Under Section 24(b), interest paid on home loan for a self-occupied property is deductible up to Rs 2 lakh per year. For let-out properties, there is no upper limit and the entire interest is deductible.
                </p>
                <p style={p}>
                  Principal repayment qualifies for deduction under Section 80C, up to Rs 1.5 lakh combined with other 80C investments. First-time home buyers in affordable housing can claim an additional Rs 1.5 lakh under Section 80EEA, subject to conditions including a loan amount up to Rs 45 lakh and property value up to Rs 50 lakh.
                </p>
                <p style={p}>
                  Combined, a home loan can save substantial tax. For example, a Rs 50 lakh loan at 9% for 20 years generates approximately Rs 4.5 lakh in interest in the first year. Under the old regime, Rs 2 lakh is deductible under Section 24(b), Rs 1.5 lakh of principal under 80C, and Rs 1.5 lakh under 80EEA if eligible: total deduction of Rs 5 lakh, saving up to Rs 1.56 lakh in tax at the 30% slab.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="tax-calculation-formula">Tax Saving Calculation Formula with Worked Examples</h2>
                <p style={p}>
                  The tax-saving calculation is straightforward: deduct all eligible deductions from your gross income, apply the applicable tax slab, and compare the result against the new regime tax.
                </p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontSize: 13.5, color: C.ink, lineHeight: 1.9, fontFamily: 'monospace' }}>
                    Taxable Income = Gross Income − Total Deductions<br />
                    Tax Saved = Tax(Gross Income) − Tax(Taxable Income)
                  </code>
                </div>
                <h3 style={h3}>Worked Example 1: Salaried Employee with Maximum 80C Deductions</h3>
                <p style={p}>
                  Consider Priya, a software engineer earning Rs 30 lakh annually. She invests Rs 1.5 lakh in Section 80C (PPF + ELSS), pays Rs 30,000 health insurance under 80D, and contributes Rs 30,000 NPS under 80CCD(1B).
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Tax calculation example: Rs 30L salary with maximum deductions</caption>
                    <thead><tr><th style={thS} scope="col">Category</th><th style={thS} scope="col">Amount (Rs)</th></tr></thead>
                    <tbody>
                      {[
                        ['Gross Annual Income', '30,00,000'],
                        ['Section 80C Deduction', '-1,50,000'],
                        ['Section 80D Deduction', '-30,000'],
                        ['Section 80CCD(1B) Deduction', '-30,000'],
                        ['Taxable Income (Old Regime)', '27,90,000'],
                        ['Old Regime Tax incl. 4% cess (on taxable income)', '6,75,480'],
                        ['Old Regime Tax incl. 4% cess (if no deductions claimed)', '7,41,000'],
                        ['Tax Saved by Claiming Deductions', '65,520'],
                        ['New Regime Tax incl. 4% cess (for comparison)', '6,13,600'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdL}>{r[0]}</td>
                          <td style={tdR}>{r[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <h3 style={h3}>Worked Example 2: Home Loan Borrower</h3>
                <p style={p}>
                  Rahul owns a home with a Rs 50 lakh loan at 9% interest, and earns Rs 18 lakh annually. First-year interest is Rs 4.5 lakh, but Section 24(b) caps the deduction at Rs 2 lakh for a self-occupied property.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Tax calculation example: Rs 18L salary with home loan deductions</caption>
                    <thead><tr><th style={thS} scope="col">Category</th><th style={thS} scope="col">Amount (Rs)</th></tr></thead>
                    <tbody>
                      {[
                        ['Gross Annual Income', '18,00,000'],
                        ['Section 24(b) Home Loan Interest (capped)', '-2,00,000'],
                        ['Section 80C Principal Repayment', '-50,000'],
                        ['Taxable Income (Old Regime)', '15,50,000'],
                        ['Old Regime Tax incl. 4% cess (on taxable income)', '2,88,600'],
                        ['Old Regime Tax incl. 4% cess (if no deductions claimed)', '3,66,600'],
                        ['Tax Saved by Claiming Deductions', '78,000'],
                        ['New Regime Tax incl. 4% cess (for comparison)', '2,39,200'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdL}>{r[0]}</td>
                          <td style={tdR}>{r[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="tax-by-income">Comparing Tax Savings Across Income Brackets</h2>
                <p style={p}>
                  The benefit of tax-saving deductions increases with higher income slabs. At lower incomes (5% slab), each rupee deducted saves only 5 paise. At higher incomes (30% slab), the same deduction saves 30 paise (plus 4% cess).
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Tax savings from Rs 1.5 lakh Section 80C deduction across income brackets</caption>
                    <thead><tr><th style={thS} scope="col">Annual Income</th><th style={thS} scope="col">Applicable Slab</th><th style={thS} scope="col">Tax Saved (Rs 1.5L Ded.)</th><th style={thS} scope="col">% Effective Saving</th></tr></thead>
                    <tbody>
                      {[
                        ['₹5 - 10 Lakhs', '5%', '7,800', '0.52%'],
                        ['₹10 - 15 Lakhs', '5-20%', '15,600 (avg)', '1.04%'],
                        ['₹15 - 25 Lakhs', '20%', '31,200', '2.08%'],
                        ['₹25 - 50 Lakhs', '30%', '46,800', '3.12%'],
                        ['₹50+ Lakhs', '30-45%', '46,800+', '3.12%+'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdL}>{r[0]}</td>
                          <td style={tdL}>{r[1]}</td>
                          <td style={tdR}>{r[2]}</td>
                          <td style={tdR}>{r[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="tax-strategies">Tax Saving Strategies by Age & Life Stage</h2>
                <h3 style={h3}>Young Professionals (Age 25-35)</h3>
                <p style={p}>
                  Focus on long-term instruments: ELSS (3-year lock-in, market-linked growth), PPF (15-year horizon), and NPS (highest tax-free withdrawal flexibility at retirement). Consider investing in ELSS first, then PPF, then NPS to maximize compounding and tax-free withdrawals.
                </p>
                <h3 style={h3}>Mid-Career Professionals (Age 35-50)</h3>
                <p style={p}>
                  Diversify across Section 80C, home loan deductions, and health insurance. If you own a home, prioritize home loan principal repayment (80C) to reduce debt while saving tax. Increase NPS contributions to catch up on retirement planning. Consider life insurance as dual benefit: insurance cover plus 80C deduction.
                </p>
                <h3 style={h3}>Pre-Retirement (Age 50-60)</h3>
                <p style={p}>
                  Maximize NPS contributions under 80CCD(1B) for additional deduction. Increase health insurance coverage (80D limit increases to Rs 50,000 for seniors from age 60). Consolidate investments in low-volatility instruments like PPF and NSC to protect capital as retirement approaches.
                </p>
                <h3 style={h3}>Senior Citizens (Age 60+)</h3>
                <p style={p}>
                  Avail higher health insurance deduction limits (Rs 50,000). Senior Citizens Savings Scheme (SCSS) offers 8.2% return with quarterly interest. Regular income from NPS annuity: 40% mandatory annuity purchase provides steady income. Repatriation of NPS benefits: 60% lump sum withdrawal is tax-free after age 60.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="budget-2026">Budget 2026 Tax Updates & Changes</h2>
                <p style={p}>
                  The Union Budget 2026 introduced significant changes to tax deductions and limits. The new regime saw further rate reductions, making it increasingly attractive for middle-income taxpayers without substantial investments. The old regime remained beneficial for high earners with substantial deductions.
                </p>
                <h3 style={h3}>Key Changes in FY 2025-26</h3>
                <p style={p}>
                  Standard deduction: Rs 75,000 (for salaried employees). Family Pension deduction under Section 57: No limit applies now (previously capped). TDS on e-commerce transactions: 1% TDS on sale of goods, 2% on services (effective for sellers with turnover above Rs 5 crore). Medical treatment deduction: Medical expenses up to Rs 10 lakh for senior citizens with no income limit.
                </p>
                <p style={p}>
                  Section 80C limits: Remain unchanged at Rs 1.5 lakh. NPS 80CCD(1B) deduction: Still Rs 50,000 additional. Home loan benefits: Section 24(b) interest deduction Rs 2 lakh unchanged. These provisions are expected to continue into FY 2026-27 unless changed in future budgets.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="regime-slabs">Old vs New Tax Regime: Full Slab Comparison</h2>
                <p style={p}>
                  Deductions only reduce tax under the Old Regime. The New Regime offers lower rates but does not allow Section 80C, 80D, NPS, or home loan interest deductions.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Income tax slabs used by this calculator, both regimes</caption>
                    <thead><tr><th style={thS} scope="col">Old Regime Slab</th><th style={thS} scope="col">Rate</th><th style={thS} scope="col">New Regime Slab</th><th style={thS} scope="col">Rate</th></tr></thead>
                    <tbody>
                      {[
                        ['Up to ₹2.5 Lakh', 'Nil', 'Up to ₹3 Lakh', 'Nil'],
                        ['₹2.5L - ₹5 Lakh', '5%', '₹3L - ₹7 Lakh', '5%'],
                        ['₹5L - ₹10 Lakh', '20%', '₹7L - ₹10 Lakh', '10%'],
                        ['Above ₹10 Lakh', '30%', '₹10L - ₹12 Lakh', '15%'],
                        ['N/A', 'N/A', '₹12L - ₹15 Lakh', '20%'],
                        ['N/A', 'N/A', 'Above ₹15 Lakh', '30%'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdL}>{r[0]}</td>
                          <td style={tdR}>{r[1]}</td>
                          <td style={tdL}>{r[2]}</td>
                          <td style={tdR}>{r[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  This calculator applies these slabs before any surcharge, marginal relief, or Section 87A rebate, as noted in the disclaimer below.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="section-80d-limits">Section 80D Limits at a Glance</h2>
                <p style={p}>
                  The health insurance deduction under Section 80D depends on the age of the people covered. Self and parent limits are separate and can be combined.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Section 80D deduction limits by category</caption>
                    <thead><tr><th style={thS} scope="col">Category</th><th style={thS} scope="col">Deduction Limit</th></tr></thead>
                    <tbody>
                      {[
                        ['Self, spouse, children (below 60)', 'Rs 25,000'],
                        ['Parents, below 60 (additional)', 'Rs 25,000'],
                        ['Parents, senior citizens 60+ (additional, replaces the 25,000 limit)', 'Rs 50,000'],
                        ['Self, senior citizen 60+ (replaces the 25,000 limit)', 'Rs 50,000'],
                        ['Preventive health check-up (sub-limit within the above)', 'Rs 5,000'],
                        ['Maximum possible (self 60+ and parents 60+)', 'Rs 1,00,000'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdL}>{r[0]}</td>
                          <td style={tdR}>{r[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="key-limits">Key Deduction Limits at a Glance</h2>
                <ul style={{ margin: '0 0 16px', paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Section 80C:</strong> Up to Rs 1.5 lakh combined across PPF, EPF, ELSS, life insurance, NSC, tax-saving FDs, and home loan principal.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Section 80D:</strong> Rs 25,000 to Rs 1,00,000 depending on age, for health insurance premiums.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Section 80CCD(1B):</strong> An extra Rs 50,000 exclusively for NPS, on top of the 80C limit.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Section 24(b):</strong> Up to Rs 2 lakh on home loan interest for a self-occupied property.
                  </li>
                </ul>
                <p style={{ ...p, margin: 0 }}>
                  Combined, these four sections can shelter up to roughly Rs 4.5 lakh of income a year from tax under the old regime, before accounting for any additional sections like 80E or 80G.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="documents-checklist">Documents Required to Claim These Deductions</h2>
                <p style={p}>
                  Keep these documents ready before filing your ITR or submitting proof to your employer's payroll team.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Deduction</th><th style={thS} scope="col">Proof Document</th><th style={thS} scope="col">When to Submit</th></tr></thead>
                    <tbody>
                      {[
                        ['Section 80C (PPF/ELSS/insurance)', 'Passbook, mutual fund statement, or premium receipt', 'To employer by January-February; keep for ITR filing'],
                        ['Section 80D (health insurance)', 'Premium payment receipt from insurer', 'To employer during investment declaration; keep for ITR'],
                        ['Section 24(b) (home loan interest)', 'Interest certificate from the lending bank', 'To employer or at ITR filing time'],
                        ['Section 80CCD(1B) (NPS)', 'NPS contribution statement (Tier I)', 'To employer or at ITR filing time'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={tdR}>{r[1]}</td>
                          <td style={tdR}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="common-mistakes">Common Mistakes in Tax Planning</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <p style={p}>
                    <strong style={{ color: C.ink }}>Missing the investment-proof submission deadline.</strong> Employers usually need proof by January or February to adjust TDS for the year. Missing this means claiming the deduction only at ITR filing, with excess tax already deducted and refunded later.
                  </p>
                  <p style={p}>
                    <strong style={{ color: C.ink }}>Double-counting employer EPF under Section 80C.</strong> Only the employee's own EPF contribution counts toward the Rs 1.5 lakh limit. The employer's matching contribution is not a deduction; it is simply not taxed as salary in the first place.
                  </p>
                  <p style={p}>
                    <strong style={{ color: C.ink }}>Locking a declaration without comparing regimes.</strong> Some employers require a regime choice early in the year. Run both scenarios through this calculator before declaring, since switching later can mean a mismatch between declared and actual tax.
                  </p>
                  <p style={p}>
                    <strong style={{ color: C.ink }}>Over-investing in low-return instruments purely to exhaust 80C.</strong> Tax saved is a one-time benefit; a poor-return investment held for 5-15 years can cost more in lost growth than the tax it saved.
                  </p>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This Tax Saving Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter your annual taxable income:</strong> This is your gross total income from all sources (salary, business, capital gains, interest, rent) before any deductions.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter 80C investments:</strong> Add up your EPF, PPF, ELSS, life insurance premiums, tuition fees, and other 80C-eligible investments. The maximum is Rs 1.5 lakh.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter 80D health insurance:</strong> Add health insurance premiums paid for self, family, and parents. The maximum is Rs 25,000-50,000 depending on age.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Add NPS and home loan interest:</strong> Enter additional NPS contributions under 80CCD(1B) and home loan interest under Section 24(b).
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Toggle tax regime:</strong> Switch between Old Regime (with deductions) and New Regime (lower rates, no deductions) to compare which saves more.
                  </li>
                </ol>
                <p style={{ ...p, margin: 0 }}>
                  All amounts can be viewed in INR, USD, EUR, GBP, or other currencies using the currency selector. Results update instantly as you adjust the sliders.
                </p>
              </div>


              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only. Tax liability depends on individual circumstances, applicable exemptions, and specific provisions of the Income Tax Act. This calculator uses simplified tax slab rates and does not account for cess, surcharge, marginal relief, or Section 87A rebate. Results are for educational and planning purposes only and do not constitute financial advice. Consult a SEBI-registered investment adviser or a qualified chartered accountant before making tax decisions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.tax-saving-sidebar::-webkit-scrollbar{width:5px}.tax-saving-sidebar::-webkit-scrollbar-track{background:transparent}.tax-saving-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.tax-saving-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="tax-saving-sidebar" aria-label="Related calculators" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
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

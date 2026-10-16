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

/* ─── VPF Math ───────────────────────────────────────────────── */
interface YearRow {
  year: number;
  openingBal: number;
  epfEmployee: number;
  epfEmployer: number;
  vpfContrib: number;
  interest: number;
  closingBal: number;
}

const EPF_RATE = 8.25;
const EMPLOYEE_RATE = 12;
const EMPLOYER_EPF_RATE = 3.67;

function buildVPFSchedule(
  basicMonthly: number,
  vpfPct: number,
  currentAge: number,
  retirementAge: number,
  currentBalance: number,
  annualIncrement: number
): YearRow[] {
  const rows: YearRow[] = [];
  let balance = currentBalance;
  const monthlyRate = EPF_RATE / 12 / 100;
  const years = retirementAge - currentAge;
  const startYear = new Date().getFullYear();

  for (let y = 0; y < years; y++) {
    const opening = balance;
    const basicForYear = basicMonthly * Math.pow(1 + annualIncrement / 100, y);
    const annualEmployee = basicForYear * EMPLOYEE_RATE / 100 * 12;
    const annualEmployerEPF = basicForYear * EMPLOYER_EPF_RATE / 100 * 12;
    const annualVPF = basicForYear * vpfPct / 100 * 12;
    const annualContrib = annualEmployee + annualEmployerEPF + annualVPF;

    let yearInterest = 0;
    let monthlyBal = balance;
    for (let m = 0; m < 12; m++) {
      const monthlyContrib = annualContrib / 12;
      monthlyBal += monthlyContrib;
      const intPart = monthlyBal * monthlyRate;
      yearInterest += intPart;
      monthlyBal += intPart;
    }
    balance = monthlyBal;

    rows.push({
      year: startYear + y,
      openingBal: opening,
      epfEmployee: annualEmployee,
      epfEmployer: annualEmployerEPF,
      vpfContrib: annualVPF,
      interest: yearInterest,
      closingBal: balance,
    });
  }
  return rows;
}

/* ─── Bar Chart ──────────────────────────────────────────────── */
function BarChart({ rows }: { rows: YearRow[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxAnnual = Math.max(...rows.map(r => r.epfEmployee + r.epfEmployer + r.vpfContrib + r.interest));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;
  return (
    <svg role="img" aria-label="Year-by-year contributions and interest breakdown"
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {rows.map((row, i) => {
        const contrib = row.epfEmployee + row.epfEmployer + row.vpfContrib;
        const total = contrib + row.interest;
        const totalH = maxAnnual > 0 ? (total / maxAnnual) * H : 0;
        const contribH = total > 0 ? (contrib / total) * totalH : 0;
        const intH = totalH - contribH;
        const x = PADL + i * slot + gap;
        return (
          <g key={row.year}>
            <rect x={x} y={H - totalH} width={barW} height={intH} fill={CHART_PAIR.secondary} rx={2} />
            <rect x={x} y={H - contribH} width={barW} height={contribH} fill={CHART_PAIR.primary} rx={2} />
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
function DonutChart({ contributions, interest }: { contributions: number; interest: number }) {
  const total = contributions + interest;
  if (total === 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const pArc = (contributions / total) * circ;
  const pPct = Math.round((contributions / total) * 100);
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Contributions ${pPct}% of maturity value, interest ${100 - pPct}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Contributions</text>
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
  { href: '/calculators/epf-calculator',                  label: 'EPF Calculator' },
  { href: '/calculators/ppf-calculator',                  label: 'PPF Calculator' },
  { href: '/calculators/nps-calculator',                  label: 'NPS Calculator' },
  { href: '/calculators/retirement-calculator',           label: 'Retirement Calculator' },
  { href: '/calculators/gratuity-calculator',             label: 'Gratuity Calculator' },
  { href: '/calculators/sip-calculator',                  label: 'SIP Calculator' },
  { href: '/calculators/fd-calculator',                   label: 'FD Calculator' },
];
const MORE = [
  { href: '/calculators/lumpsum-calculator',              label: 'Lumpsum Calculator' },
  { href: '/calculators/compound-interest-calculator',    label: 'Compound Interest Calculator' },
  { href: '/calculators/wealth-growth-calculator',        label: 'Wealth Growth Calculator' },
  { href: '/calculators/tax-saving-calculator',           label: 'Tax Saving Calculator' },
  { href: '/calculators/pension-calculator',              label: 'Pension Calculator' },
  { href: '/calculators/inflation-calculator',            label: 'Inflation Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What is VPF and how does it differ from EPF?',
    a: 'VPF (Voluntary Provident Fund) allows employees to contribute more than the mandatory 12% of basic salary to their EPF account, up to 100% of basic salary. Unlike EPF, the employer does not match VPF contributions. VPF earns the same interest rate as EPF (currently 8.25%) and follows the same withdrawal and tax rules.',
  },
  {
    q: 'What is the maximum VPF contribution allowed?',
    a: 'You can contribute up to 100% of your basic salary (plus dearness allowance) to VPF voluntarily. This is in addition to the mandatory 12% EPF contribution. There is no separate upper limit for VPF other than the 100% of basic salary cap.',
  },
  {
    q: 'Does the employer contribute to VPF?',
    a: 'No. The employer does not match VPF contributions. The employer\'s 12% contribution is fixed: 3.67% goes to EPF and 8.33% goes to EPS (capped at Rs 1,250/month). VPF is entirely funded by the employee.',
  },
  {
    q: 'What is the current VPF interest rate?',
    a: 'VPF earns the same interest rate as EPF, which is 8.25% per annum for FY 2025-26, as declared by the EPFO. The rate is reviewed annually by the government.',
  },
  {
    q: 'Is VPF eligible for Section 80C deduction?',
    a: 'Yes, VPF contributions are eligible for deduction under Section 80C up to the overall limit of Rs 1.5 lakh per financial year. This limit is combined with EPF employee contribution, PPF, ELSS, life insurance premiums, and other 80C investments.',
  },
  {
    q: 'Can I withdraw VPF before retirement?',
    a: 'Yes, VPF follows the same withdrawal rules as EPF. Partial withdrawals are allowed for medical emergencies, home purchase, marriage, education, and unemployment. Full withdrawal is allowed at retirement (age 58) or after 2 months of unemployment. TDS applies if withdrawn before 5 years of continuous service.',
  },
  {
    q: 'Is VPF better than PPF?',
    a: 'VPF currently offers 8.25% interest vs PPF\'s 7.1%, and both have EEE tax status. However, PPF has a 15-year lock-in with partial withdrawal from year 7, while VPF is linked to employment and can be withdrawn on job change or unemployment. VPF has no separate limit beyond 100% of basic, while PPF is capped at Rs 1.5 lakh/year. For salaried employees with high basic salary, VPF often allows larger contributions.',
  },
  {
    q: 'How to start VPF contribution?',
    a: 'Submit a written request to your employer/HR department specifying the VPF contribution percentage (above 12% of basic). The employer will deduct the additional amount from your salary and deposit it in your EPF account. You can start, stop, or modify VPF contributions at the beginning of any financial year, subject to employer policy.',
  },
  {
    q: 'What happens to VPF when changing jobs?',
    a: 'VPF is part of your EPF account and transfers along with it using your UAN (Universal Account Number). The accumulated VPF balance, along with EPF balance, moves to the new employer. You can also withdraw the full amount if unemployed for 2+ months, subject to tax rules.',
  },
  {
    q: 'Can NRI invest in VPF?',
    a: 'NRIs cannot open new VPF/EPF accounts. If you were a member before becoming an NRI, your existing account continues to earn interest but no fresh contributions can be made. The corpus can be withdrawn or left to compound at the declared rate.',
  },
  {
    q: 'What is the difference between VPF and PPF?',
    a: 'VPF is linked to employment and has the same rate as EPF (8.25%). PPF is a separate government savings scheme with a 15-year lock-in, current rate 7.1%, and annual contribution cap of Rs 1.5 lakh. VPF can be withdrawn on job change or unemployment, while PPF allows partial withdrawal from year 7. Both are EEE tax status.',
  },
  {
    q: 'Can I use a regular EPF calculator for VPF, or do I need a separate tool?',
    a: 'A plain EPF calculator only projects the mandatory 12% employee and 3.67% employer contribution, so it will understate your actual balance if you have elected VPF. This calculator adds the voluntary VPF percentage on top of standard EPF and shows both the combined maturity and the separate employee, employer, and voluntary contribution figures in one projection.',
  },
  {
    q: 'How is VPF interest calculated month by month?',
    a: 'EPFO calculates interest monthly on the running balance but credits it once a year. Each month, the opening balance plus that month\'s contribution earns interest at one-twelfth of the annual declared rate. The current rate of 8.25% works out to roughly 0.688% per month. This calculator compounds on that same monthly basis rather than approximating with a flat annual formula.',
  },
  {
    q: 'What was the VPF interest rate in 2020, 2021, and 2022?',
    a: 'EPFO declared 8.50% for FY 2019-20 and FY 2020-21, then cut the rate to 8.10% for FY 2021-22, the lowest since 1977-78. FY 2022-23 was 8.15%. The rate has held at 8.25% since FY 2023-24. See the year-wise interest rate history table above for the full record back to FY 2015-16.',
  },
  {
    q: 'Is there a separate VPF tax calculator?',
    a: 'A dedicated VPF tax calculator is not necessary for most employees, since VPF interest is fully tax-free (EEE status) as long as combined EPF and VPF employee contribution stays under Rs 2.5 lakh a year, and the account has 5 years of continuous service. Above that threshold, interest on the excess becomes taxable at your income tax slab rate with TDS deducted. Use the Income Tax Calculator linked above to see the exact impact on your total liability.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
  },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ─── Main ───────────────────────────────────────────────────── */
export default function VPFCalculatorClient({ region = 'in' }: { region?: string }) {
  const defaultSettings = {
    basicSalary: 50000,
    vpfPct: 20,
    currentAge: 30,
    retirementAge: 58,
    currentBalance: 0,
    annualIncrement: 5,
  };
  const { settings, updateSettings } = useCalculatorSettings('vpf-calculator', defaultSettings);
  const { basicSalary, vpfPct, currentAge, retirementAge, currentBalance, annualIncrement } = settings;

  const setBasicSalary     = (v: number) => updateSettings({ basicSalary: v });
  const setVpfPct          = (v: number) => updateSettings({ vpfPct: v });
  const setCurrentAge      = (v: number) => updateSettings({ currentAge: v });
  const setRetirementAge   = (v: number) => updateSettings({ retirementAge: v });
  const setCurrentBalance  = (v: number) => updateSettings({ currentBalance: v });
  const setAnnualIncrement = (v: number) => updateSettings({ annualIncrement: v });

  const [mobile, setMobile] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const schedule = useMemo(() =>
    buildVPFSchedule(basicSalary, vpfPct, currentAge, retirementAge, currentBalance, annualIncrement),
    [basicSalary, vpfPct, currentAge, retirementAge, currentBalance, annualIncrement]
  );

  const totalEmployeeContrib = schedule.reduce((s, r) => s + r.epfEmployee, 0);
  const totalEmployerContrib = schedule.reduce((s, r) => s + r.epfEmployer, 0);
  const totalVPFContrib = schedule.reduce((s, r) => s + r.vpfContrib, 0);
  const totalContributions = totalEmployeeContrib + totalEmployerContrib + totalVPFContrib;
  const totalInterest = schedule.reduce((s, r) => s + r.interest, 0);
  const maturityValue = schedule[schedule.length - 1]?.closingBal || currentBalance;

  const contribPct = maturityValue > 0 ? Math.round((totalContributions / maturityValue) * 100) : 0;
  const interestPct = 100 - contribPct;

  const years = retirementAge - currentAge;

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
            VPF Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate your Voluntary Provident Fund maturity with additional contributions above the mandatory 12% EPF. Current rate: 8.25%.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            <section aria-label="VPF Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div role="tabpanel" style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{showAdvanced ? 'More Settings' : 'Inputs'}</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider label="Monthly Basic Salary" id="vpf-basic" value={basicSalary} min={15000} max={500000} step={1000} fmt={fmtC} onChange={setBasicSalary} compact={mobile} />
                      <Slider label="VPF Contribution (% of Basic)" id="vpf-pct" value={vpfPct} min={0} max={88} step={1} fmt={v => `${v}%`} onChange={setVpfPct} compact={mobile} />
                      <Slider label="Current Age" id="vpf-age" value={currentAge} min={18} max={57} step={1} fmt={v => `${v} yr`} onChange={setCurrentAge} compact={mobile} />
                      <Slider label="Retirement Age" id="vpf-retire" value={retirementAge} min={50} max={70} step={1} fmt={v => `${v} yr`} onChange={setRetirementAge} compact={mobile} />

                      <div style={{ marginTop: 8, padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 24 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: C.ink, fontWeight: 700, marginBottom: 4 }}>
                          <span>Total Monthly Contribution (EPF + VPF)</span>
                          <span>{fmtC(basicSalary * (15.67 + vpfPct) / 100)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.ink2, marginBottom: 2 }}>
                          <span>Mandatory EPF: {fmtC(basicSalary * 15.67 / 100)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: vpfPct > 0 ? '#1f7a58' : C.ink3, fontWeight: vpfPct > 0 ? 600 : 400 }}>
                          <span>Voluntary VPF: {fmtC(basicSalary * vpfPct / 100)}</span>
                        </div>
                      </div>

                      <button onClick={() => setShowAdvanced(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        More settings
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <Slider label="Current EPF+VPF Balance" id="vpf-balance" value={currentBalance} min={0} max={10000000} step={10000} fmt={fmtC} onChange={setCurrentBalance} compact={mobile} />
                      <Slider label="Expected Annual Increment" id="vpf-increment" value={annualIncrement} min={0} max={20} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={setAnnualIncrement} compact={mobile} />
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: '0 0 24px' }}>
                        Add your current EPF balance to see a more accurate total corpus. Salary increment compounds contributions over time and has a large impact on the final maturity value.
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
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>
                      Combined EPF + VPF Maturity
                    </span>
                    <span aria-live="polite" aria-label={`Maturity value: ${fmtIN(maturityValue)}`}
                      style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {fmtIN(maturityValue)}
                    </span>
                  </div>

                  {[
                    { label: 'Total Contributions', value: fmtC(totalContributions) },
                    { label: 'Employee EPF (12%)', value: fmtC(totalEmployeeContrib) },
                    { label: 'Employer EPF (3.67%)', value: fmtC(totalEmployerContrib) },
                    { label: 'Voluntary VPF (additional)', value: fmtC(totalVPFContrib) },
                    { label: 'Total Interest Earned', value: fmtC(totalInterest) },
                    { label: 'Investment Period', value: `${years} years` },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    <DonutChart contributions={totalContributions} interest={totalInterest} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Contributions {contribPct}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Interest {interestPct}%</span>
                    </div>
                  </div>

                  <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Contributions {contribPct}%</span>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Interest {interestPct}%</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`Contributions are ${contribPct}% of maturity value`}>
                      <div style={{ height: '100%', width: `${contribPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Year-by-year table */}
              {schedule.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowTable(v => !v)}
                    aria-expanded={showTable} aria-controls="growth-table"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Year-by-Year VPF Growth</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>Compounding at {EPF_RATE}%</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {years} yr · {EPF_RATE}% rate
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showTable && (
                    <div id="growth-table" style={{ borderTop: `1px solid ${C.border}` }}>
                      {/* Stacked bar chart */}
                      <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                        <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>Contributions</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>Interest</span>
                          </div>
                        </div>
                        <BarChart rows={schedule} />
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
                        <table style={{ minWidth: 600, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              {['Year', 'Opening', 'Employee EPF', 'Employer EPF', 'VPF(Voluntary)', 'Interest', 'Closing'].map(h => (
                                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }} scope="col">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {schedule.map((row, i) => (
                              <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ padding: '11px 14px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                                <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtIN(row.openingBal)}</td>
                                <td style={{ padding: '11px 14px', color: '#1f7a58', fontWeight: 600 }}>{fmtIN(row.epfEmployee)}</td>
                                <td style={{ padding: '11px 14px', color: '#1f7a58', fontWeight: 600 }}>{fmtIN(row.epfEmployer)}</td>
                                <td style={{ padding: '11px 14px', color: '#166534', fontWeight: 700 }}>{fmtIN(row.vpfContrib)}</td>
                                <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtIN(row.interest)}</td>
                                <td style={{ padding: '11px 14px', color: C.ink, fontWeight: 600 }}>{fmtIN(row.closingBal)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Waitlist */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-vpf">What Is VPF?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    VPF (Voluntary Provident Fund) is a voluntary extension of EPF that allows employees to contribute more than the mandatory 12% of basic salary to their provident fund account, up to 100% of basic salary. The additional contribution earns the same interest rate as EPF, currently 8.25% for FY 2025-26.
                  </p>
                </div>
                <p style={p}>
                  Unlike the mandatory EPF contribution where the employer matches with 3.67% to EPF and 8.33% to EPS, VPF contributions come entirely from the employee. The employer does not contribute any additional amount on top of VPF. However, the employee gets the benefit of the full EPF interest rate on the entire VPF corpus.
                </p>
                <p style={p}>
                  VPF is regulated under the same EPF Scheme, 1952, and managed by the <a href="https://epfindia.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>EPFO</a>. The same Universal Account Number (UAN) is used, and the VPF balance is part of your overall provident fund account.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="vpf-formula">VPF Formula and Calculation</h2>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark }}>
                    Total Monthly EPF+VPF Contribution = Basic Salary × (12% + 3.67% + VPF%) / 100<br />
                    Monthly Compounding: Interest = Balance × Annual Rate / 12 / 100
                  </code>
                </div>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Contribution breakdown on basic salary of Rs 50,000 with 20% VPF</caption>
                    <thead><tr><th style={thS} scope="col">Component</th><th style={thS} scope="col">Rate</th><th style={thS} scope="col">Monthly Amount</th></tr></thead>
                    <tbody>
                      {[
                        ['Employee EPF (mandatory)', '12%', 'Rs 6,000'],
                        ['Employer EPF (to EPF account)', '3.67%', 'Rs 1,835'],
                        ['VPF (voluntary, extra)', '20%', 'Rs 10,000'],
                        ['Total monthly contribution', '35.67%', 'Rs 17,835'],
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
                <p style={p}>
                  <strong>Worked example:</strong> Basic salary Rs 50,000/month. With 20% VPF, the monthly contribution is Rs 10,000 extra. Combined with EPF (Rs 7,835), total monthly deposit is Rs 17,835. Over 28 years at 8.25% with monthly compounding, adding 20% VPF on top of plain EPF raises the maturity corpus from Rs 1.03 crore to Rs 2.35 crore, a gain of approximately Rs 1.32 crore from the voluntary contribution alone.
                </p>
              </div>

              <div style={sec} id="vpf-interest-rate-history">
                <h2 style={h2}>VPF Interest Rate History: Year-Wise EPFO Rates</h2>
                <p style={p}>
                  VPF earns the same interest rate as EPF because both sit in the same EPFO account. The rate is set once a year by EPFO&apos;s Central Board of Trustees and ratified by the Ministry of Finance, so it moves with government bond yields rather than the stock market.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>EPF/VPF interest rate declared by EPFO, financial year 2015-16 to 2025-26.</caption>
                    <thead><tr><th style={thS} scope="col">Financial Year</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Rate</th></tr></thead>
                    <tbody>
                      {[
                        ['2015-16', '8.80%'],
                        ['2016-17', '8.65%'],
                        ['2017-18', '8.55%'],
                        ['2018-19', '8.65%'],
                        ['2019-20', '8.50%'],
                        ['2020-21', '8.50%'],
                        ['2021-22', '8.10%'],
                        ['2022-23', '8.15%'],
                        ['2023-24', '8.25%'],
                        ['2024-25', '8.25%'],
                        ['2025-26', '8.25%'],
                      ].map((r, i, arr) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i === arr.length - 1 ? '#f4f5f6' : i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: i === arr.length - 1 ? 700 : 600, color: C.ink }}>{r[0]}{i === arr.length - 1 ? ' (current)' : ''}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const, fontWeight: i === arr.length - 1 ? 700 : 500 }}>{r[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  8.25% has now held for three straight years, FY 2023-24 through FY 2025-26. The FY 2021-22 rate of 8.10% was the lowest EPFO had declared since 1977-78, and FY 2022-23&apos;s 8.15% was the lowest in four decades at the time, before rates recovered. The calculator above always uses the current 8.25% rate for future years since EPFO does not publish a forward guidance figure. A change in the declared rate changes the projection for every year after the change takes effect, not retroactively.
                </p>
              </div>

              <div style={sec} id="vpf-by-salary">
                <h2 style={h2}>VPF Maturity by Monthly Salary</h2>
                <p style={p}>
                  The table below shows combined EPF and VPF corpus at retirement for different salary levels with a 20% VPF election. Figures assume 8.25% interest compounded monthly, 28 years to retirement, and no salary increment. Your actual corpus will be higher with annual salary growth.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>
                      Combined EPF + VPF corpus at 8.25% with 20% voluntary contribution. 28-year horizon, no salary growth.
                    </caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Monthly Basic</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Monthly VPF</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">10-Year Corpus</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">20-Year Corpus</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">28-Year Corpus</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Rs 20,000', 'Rs 4,000', 'Rs 13.2 L', 'Rs 43.4 L', 'Rs 93.5 L'],
                        ['Rs 30,000', 'Rs 6,000', 'Rs 19.9 L', 'Rs 65.0 L', 'Rs 1.40 Cr'],
                        ['Rs 50,000', 'Rs 10,000', 'Rs 33.1 L', 'Rs 1.08 Cr', 'Rs 2.34 Cr'],
                        ['Rs 75,000', 'Rs 15,000', 'Rs 49.7 L', 'Rs 1.63 Cr', 'Rs 3.50 Cr'],
                        ['Rs 1,00,000', 'Rs 20,000', 'Rs 66.2 L', 'Rs 2.17 Cr', 'Rs 4.67 Cr'],
                        ['Rs 1,50,000', 'Rs 30,000', 'Rs 99.3 L', 'Rs 3.25 Cr', 'Rs 7.00 Cr'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{r[1]}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{r[2]}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{r[3]}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const, fontWeight: 700, color: C.dark }}>{r[4]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Numbers rise sharply with a 5-7% annual salary increment. A Rs 50,000 basic salary with 5% annual increment grows the 28-year corpus past Rs 4 crore. Use the calculator above to enter your actual increment rate.
                </p>
              </div>

              <div style={sec} id="vpf-calculator-excel">
                <h2 style={h2}>VPF Calculator in Excel: Formula and Steps</h2>
                <p style={p}>
                  Building a VPF projection in Excel takes six columns and one interest formula, repeated down as many rows as the years left to retirement.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Column layout for a year-wise VPF sheet in Excel or Google Sheets.</caption>
                    <thead><tr><th style={thS} scope="col">Column</th><th style={thS} scope="col">Content</th><th style={thS} scope="col">Formula</th></tr></thead>
                    <tbody>
                      {[
                        ['A: Year', 'Year number, 1 to N', 'Fill down'],
                        ['B: Opening balance', 'Closing balance from previous row', '=F1 (previous row)'],
                        ['C: Annual contribution', 'Basic x (12% + 3.67% + VPF%) x 12', '=Basic*(0.1567+VPF%)*12'],
                        ['D: Monthly rate', 'Annual rate / 12', '=8.25%/12'],
                        ['E: Interest', 'Compounded monthly on opening balance plus monthly deposits', '=FV(D1,12,-C1/12,-B1)-B1-C1'],
                        ['F: Closing balance', 'Opening + contribution + interest', '=B1+C1+E1'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={tdL}>{r[1]}</td>
                          <td style={{ ...tdR, fontFamily: 'monospace', fontSize: 12 }}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The Excel <code style={{ fontFamily: 'monospace', background: '#f4f5f6', padding: '1px 5px', borderRadius: 4 }}>FV()</code> function handles monthly compounding on a recurring deposit directly, which avoids writing a 12-row inner loop for every year. Set the rate argument to the monthly rate (annual rate divided by 12), the number of periods to 12, the payment to the negative monthly contribution, and the present value to the negative opening balance. Drag column F down to column B of the next row to chain each year&apos;s closing balance into the next year&apos;s opening balance. This is exactly the calculation the tool above runs automatically, so a spreadsheet built this way should match the calculator&apos;s output to within rounding.
                </p>
              </div>

              <div style={sec} id="reverse-vpf-calculator">
                <h2 style={h2}>Reverse VPF Calculator: How Much to Contribute for a Target Corpus</h2>
                <p style={p}>
                  A reverse VPF calculation answers a different question from the forward one above: instead of asking what a chosen VPF percentage grows into, it asks what percentage is needed to reach a specific retirement number.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>
                      VPF percentage needed to reach a target corpus. Basic salary Rs 50,000/month, 28 years to retirement, 8.25% rate, no salary increment.
                    </caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Target Corpus</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">VPF Needed</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Monthly VPF Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Rs 1 crore', '0% (EPF alone reaches Rs 1.03 Cr)', 'Rs 0'],
                        ['Rs 2 crore', '14.7%', 'Rs 7,347'],
                        ['Rs 3 crore', '29.9%', 'Rs 14,938'],
                        ['Rs 5 crore', '60.2%', 'Rs 30,119'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{r[1]}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const, fontWeight: 700, color: C.dark }}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  On a Rs 50,000 basic salary over a 28-year horizon, mandatory EPF alone already compounds to just over Rs 1 crore. Reaching Rs 3 crore needs roughly 30% VPF on top of that, close to Rs 15,000 a month in voluntary contribution. Enter a target and adjust the VPF Contribution slider in the calculator above until the maturity figure matches your goal. This is the fastest way to reverse-solve without a spreadsheet.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="vpf-vs-epf">VPF vs EPF: Key Differences</h2>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Comparison between EPF and VPF</caption>
                    <thead><tr><th style={thS} scope="col">Feature</th><th style={thS} scope="col">EPF</th><th style={thS} scope="col">VPF</th></tr></thead>
                    <tbody>
                      {[
                        ['Nature', 'Mandatory (if eligible)', 'Voluntary'],
                        ['Employee Contribution', '12% of basic', 'Up to 100% of basic (in addition to 12% EPF)'],
                        ['Employer Contribution', '3.67% EPF + 8.33% EPS', 'None'],
                        ['Interest Rate', '8.25% (FY 2025-26)', 'Same as EPF: 8.25%'],
                        ['Tax Benefit (80C)', 'Up to Rs 1.5 lakh combined with other 80C investments', 'Same combined limit. VPF + EPF employee share counted together.'],
                        ['Withdrawal Rules', 'Same as EPF', 'Same as EPF'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={tdR}>{r[1]}</td>
                          <td style={{ ...tdR, color: '#1f7a58', fontWeight: 600 }}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Use the <Link href="/calculators/epf-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>EPF Calculator</Link> to see the base EPF projection without VPF.
                </p>
              </div>

              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>EPF Calculator</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>See your EPF-only projection without the voluntary VPF top-up.</p>
                </div>
                <Link className="fx-btn" href="/calculators/epf-calculator" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
              </div>

              <div style={sec}>
                <h2 style={h2} id="vpf-vs-ppf">VPF vs PPF: Which Is Better?</h2>
                <p style={p}>
                  Both VPF and PPF offer EEE (Exempt-Exempt-Exempt) tax status, but the choice depends on your employment status and savings capacity:
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>VPF vs PPF comparison</caption>
                    <thead><tr><th style={thS} scope="col">Feature</th><th style={thS} scope="col">VPF</th><th style={thS} scope="col">PPF</th></tr></thead>
                    <tbody>
                      {[
                        ['Current Interest Rate', '8.25%', '7.1%'],
                        ['Lock-in Period', 'Employment-linked (withdrawable on job change)', '15 years'],
                        ['Annual Contribution Limit', 'Up to 100% of basic salary (no fixed cap)', 'Rs 1.5 lakh maximum'],
                        ['Tax Status', 'EEE (after 5 years service)', 'EEE'],
                        ['Eligibility', 'Only salaried employees with EPF account', 'Any individual'],
                        ['Employer Involvement', 'Requires employer approval', 'None (open with bank/post office)'],
                        ['Partial Withdrawal', 'Medical, home, education, unemployment', 'From year 7, up to 50% of balance at end of year 6'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={{ ...tdR, fontWeight: 600, color: '#1f7a58' }}>{r[1]}</td>
                          <td style={tdR}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Use the <Link href="/calculators/ppf-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>PPF Calculator</Link> to model the PPF corpus for the same contribution amount and compare directly with VPF.
                </p>
              </div>

              <div style={sec} id="vpf-vs-nps">
                <h2 style={h2}>VPF vs NPS: Which Is Better for Retirement?</h2>
                <p style={p}>
                  VPF and NPS target the same long-term retirement goal but differ in risk, flexibility, and tax treatment. Salaried employees with an EPF account can use both simultaneously.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>VPF vs NPS Tier 1 comparison. NPS returns are market-linked and not guaranteed.</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Feature</th>
                        <th style={thS} scope="col">VPF</th>
                        <th style={thS} scope="col">NPS Tier 1</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Return', '8.25% fixed (EPFO-declared)', '10-12% CAGR (market-linked, not guaranteed)'],
                        ['Risk', 'Zero. Government-backed.', 'Market risk on equity portion (max 75% equity)'],
                        ['Tax Deduction', 'Section 80C: Rs 1.5 lakh combined limit', '80CCD(1): Rs 1.5L limit + 80CCD(1B): Rs 50,000 extra'],
                        ['Maturity Tax', 'EEE after 5 years continuous service', '60% tax-free lump sum. 40% annuity taxed as income.'],
                        ['Lock-in', 'Employment-linked. Withdraw on job change.', 'Locked until age 60. Exit is strict.'],
                        ['Withdrawal (partial)', 'Medical, home, education, marriage', '25% partial after 3 years for specific reasons'],
                        ['Who Can Invest', 'EPF members only (salaried)', 'Any Indian resident aged 18-65'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={{ ...tdR, color: '#166534', fontWeight: 600 }}>{r[1]}</td>
                          <td style={tdR}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  VPF gives guaranteed 8.25% with complete EEE status and greater flexibility. NPS offers potentially higher returns over 20-30 years but with market risk and mandatory annuity at maturity. The additional Rs 50,000 deduction under 80CCD(1B) is NPS's strongest advantage over VPF for high-income earners who have already exhausted the Rs 1.5 lakh 80C limit.
                </p>
                <p style={p}>
                  For most salaried employees, the optimal strategy is to use VPF to top up the 80C limit and then use NPS for the additional Rs 50,000 deduction. Use the <Link href="/calculators/nps-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>NPS Calculator</Link> to model the NPS corpus alongside your VPF projection.
                </p>
              </div>

              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>NPS Calculator</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Model NPS Tier 1 returns alongside your VPF to plan the combined retirement corpus.</p>
                </div>
                <Link className="fx-btn" href="/calculators/nps-calculator" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
              </div>

              <div style={sec}>
                <h2 style={h2} id="vpf-tax-benefits">VPF Tax Benefits</h2>
                <p style={p}>
                  VPF enjoys the same tax benefits as EPF, making it one of the most tax-efficient savings vehicles in India:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 20, listStyleType: 'disc' }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, marginBottom: 8 }}>
                    <strong style={{ color: C.ink }}>Section 80C deduction:</strong> VPF contributions qualify for deduction under Section 80C, subject to the overall limit of Rs 1.5 lakh per year (combined with EPF employee share, PPF, ELSS, life insurance, etc.).
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, marginBottom: 8 }}>
                    <strong style={{ color: C.ink }}>Tax-free interest:</strong> Interest earned on VPF is tax-free, provided the account has been active for 5 years of continuous service.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, marginBottom: 8 }}>
                    <strong style={{ color: C.ink }}>Tax-free maturity:</strong> The entire VPF corpus is tax-free on withdrawal after 5 years of continuous service. No capital gains tax applies.
                  </li>
                </ul>
                <p style={p}>
                  <strong style={{ color: C.ink }}>Taxable interest above Rs 2.5 lakh:</strong> Since Budget 2021 (effective 1 April 2021), interest on an employee&apos;s own EPF plus VPF contribution above Rs 2.5 lakh in a financial year is taxable as income under Section 194A, with 10% TDS deducted on the taxable portion. The threshold is Rs 5 lakh for accounts with no employer contribution, such as government employee GPF accounts. High-basic-salary employees who elect a large VPF percentage are the ones most likely to cross this limit.
                </p>
                <p style={p}>
                  Employer contributions are never counted toward this Rs 2.5 lakh limit, only the employee&apos;s own EPF and VPF share. Use the <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</Link> to see the full impact on your annual tax liability.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="vpf-withdrawal">VPF Withdrawal Rules</h2>
                <p style={p}>
                  VPF follows the exact same withdrawal rules as EPF, as both are part of the same provident fund account:
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>VPF withdrawal conditions</caption>
                    <thead><tr><th style={thS} scope="col">Withdrawal Type</th><th style={thS} scope="col">Condition</th><th style={thS} scope="col">Tax Treatment</th></tr></thead>
                    <tbody>
                      {[
                        ['Full withdrawal (retirement)', 'Age 58', 'Tax-free after 5 years continuous service'],
                        ['Full withdrawal (unemployment)', '1+ month unemployed', '75% after 1 month, 25% after 2 months. TDS if before 5 years.'],
                        ['Partial withdrawal (medical)', 'Self, spouse, children, parents', 'Up to 6 months basic + DA or lower of corpus'],
                        ['Partial withdrawal (home)', '5+ years service', 'Up to 24-36 months basic + DA'],
                        ['Partial withdrawal (education/marriage)', '7+ years service', 'Up to 50% of employee share'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={tdR}>{r[1]}</td>
                          <td style={{ ...tdR, fontWeight: 600, color: '#166534' }}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec} id="vpf-limitations">
                <h2 style={h2}>Limitations of VPF</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <p style={p}>
                    <strong style={{ color: C.ink }}>The rate is not guaranteed year to year.</strong> EPFO declares the rate annually based on its own portfolio returns, mostly government bonds and a smaller equity allocation via ETFs. The rate fell for two straight years, from 8.50% in FY 2020-21 to 8.10% in FY 2021-22, so a VPF plan built on today&apos;s 8.25% can understate or overstate the real outcome years out.
                  </p>
                  <p style={p}>
                    <strong style={{ color: C.ink }}>Money is tied to employment, not a fixed term.</strong> Unlike a fixed deposit or PPF with a known maturity date, VPF stays locked to an active EPF account. Full, tax-free access requires either retirement at 58 or 2 months of continuous unemployment, so VPF is not a good fit for a goal with a hard, near-term deadline.
                  </p>
                  <p style={p}>
                    <strong style={{ color: C.ink }}>Interest above Rs 2.5 lakh a year becomes taxable.</strong> High earners who elect a large VPF percentage can cross the threshold covered above, at which point the excess interest is taxed as regular income with TDS deducted. Above that point, VPF stops behaving like a pure EEE instrument.
                  </p>
                  <p style={p}>
                    <strong style={{ color: C.ink }}>No equity exposure and no way to add any.</strong> The entire VPF corpus sits in EPFO&apos;s debt-heavy portfolio. NPS Tier 1 allows up to 75% equity allocation for materially higher long-term growth potential, at the cost of taking on market risk that VPF does not carry.
                  </p>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This VPF Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12, listStyleType: 'decimal' }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Basic Salary:</strong> Enter your monthly basic salary. This is the base for all calculations.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>VPF Percentage:</strong> Set how much extra (above 12% EPF) you want to contribute, from 0% to 88% of basic salary.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Age and Tenure:</strong> Enter current age and expected retirement age. The difference determines contribution years.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>View Combined Maturity:</strong> The calculator shows combined EPF + VPF maturity with contribution split and interest earned.
                  </li>
                </ol>
              </div>


              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only. The EPF/VPF interest rate is declared annually by the EPFO and may change. The current rate of 8.25% applies to FY 2025-26. Actual maturity value will depend on future interest rate declarations, salary increments, and withdrawal timing. This calculator is for educational and planning purposes only and does not constitute financial advice. Consult a SEBI-registered investment adviser before making investment decisions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .vpf-sidebar::-webkit-scrollbar { width: 5px; }
            .vpf-sidebar::-webkit-scrollbar-track { background: transparent; }
            .vpf-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .vpf-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            aria-label="Related calculators"
            className="vpf-sidebar"
            style={{
              display: 'flex', flexDirection: 'column', gap: 16,
              position: mobile ? 'static' : 'sticky',
              top: 20, alignSelf: 'start',
              maxHeight: mobile ? 'none' : 'calc(100vh - 40px)',
              overflowY: mobile ? 'visible' : 'auto',
              paddingRight: mobile ? 0 : 2,
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
            } as React.CSSProperties}
          >
            <SidebarList title="Popular Calculators" items={POPULAR} />
            <SidebarList title="More Calculators" items={MORE} />
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
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

/* ─── EPF Math ───────────────────────────────────────────────── */
interface YearRow {
  year: number;
  openingBal: number;
  employeeContrib: number;
  employerContrib: number;
  interest: number;
  closingBal: number;
}

const EPF_RATE = 8.25;
const EMPLOYEE_RATE = 12;
const EMPLOYER_EPF_RATE = 3.67;
const EMPLOYER_EPS_RATE = 8.33;
const EPS_CAP = 15000;

function buildEPFSchedule(
  basicMonthly: number,
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
    const annualEmployerEPF = Math.min(basicForYear, EPS_CAP / 12) * EMPLOYER_EPF_RATE / 100 * 12;
    const annualContrib = annualEmployee + annualEmployerEPF;

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
      employeeContrib: annualEmployee,
      employerContrib: annualEmployerEPF,
      interest: yearInterest,
      closingBal: balance,
    });
  }
  return rows;
}

function calculateEPSPension(basicSalary: number, yearsOfService: number): number {
  const pensionableSalary = Math.min(basicSalary, EPS_CAP);
  const monthlyPension = (pensionableSalary * Math.min(yearsOfService, 35)) / 70;
  return Math.min(monthlyPension, 7500);
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

/* ─── EPF Bar Chart ──────────────────────────────────────────── */
function EPFBarChart({ rows }: { rows: YearRow[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxAnnual = Math.max(...rows.map(r => r.employeeContrib + r.employerContrib + r.interest));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;
  return (
    <svg role="img" aria-label="Year-by-year EPF contributions and interest breakdown"
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {rows.map((row, i) => {
        const contrib = row.employeeContrib + row.employerContrib;
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
  { href: '/calculators/vpf-calculator',                  label: 'VPF Calculator' },
  { href: '/calculators/retirement-calculator',           label: 'Retirement Calculator' },
  { href: '/calculators/nps-calculator',                  label: 'NPS Calculator' },
  { href: '/calculators/ppf-calculator',                  label: 'PPF Calculator' },
  { href: '/calculators/gratuity-calculator',             label: 'Gratuity Calculator' },
  { href: '/calculators/pension-calculator',              label: 'Pension Calculator' },
];
const MORE = [
  { href: '/calculators/sip-calculator',                  label: 'SIP Calculator' },
  { href: '/calculators/lumpsum-calculator',              label: 'Lumpsum Calculator' },
  { href: '/calculators/fd-calculator',                   label: 'FD Calculator' },
  { href: '/calculators/compound-interest-calculator',    label: 'Compound Interest Calculator' },
  { href: '/calculators/wealth-growth-calculator',        label: 'Wealth Growth Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'How do I calculate my EPF pension amount after retirement?',
    a: 'EPF pension comes from the EPS (Employee Pension Scheme) portion. Formula: Monthly Pension = (Pensionable Salary × Pensionable Service) / 70. Pensionable salary is capped at Rs 15,000 per month. If you have 20 years of service at Rs 50,000 salary, your monthly pension would be (Rs 15,000 × 20) / 70 = Rs 4,286.',
  },
  {
    q: 'What is the current EPF interest rate for 2025-26?',
    a: 'The current EPF interest rate for FY 2025-26 is 8.25% per annum, declared by the EPFO. This rate applies to all EPF accounts for the financial year ending March 2026. The EPFO reviews and declares this rate annually based on market conditions.',
  },
  {
    q: 'How is EPF maturity amount calculated?',
    a: 'EPF maturity uses monthly compounding. Employee contributes 12% of basic salary, employer contributes 3.67% to EPF. Total monthly contribution is 15.67% of basic salary. Interest at 8.25% is calculated on the monthly running balance, making the effective annual rate approximately 8.57% with compounding.',
  },
  {
    q: 'How much pension will I get from EPF at retirement?',
    a: 'You receive a monthly pension from the EPS portion plus a lump sum from your EPF account. Maximum monthly pension is Rs 7,500. The pension is lifelong and your family receives a portion if you pass away. Maximum pensionable service is 35 years.',
  },
  {
    q: 'What is the employee contribution to EPF?',
    a: 'The employee contribution to EPF is 12% of basic salary (plus dearness allowance if applicable). This is deducted from your salary every month. You get a tax deduction under Section 80C up to Rs 1.5 lakh per year.',
  },
  {
    q: 'Can I withdraw my EPF before retirement?',
    a: 'Yes, partial withdrawals are allowed for medical emergencies, home purchase, marriage, education, and unemployment exceeding 2 months. Full withdrawal is allowed after retirement at age 58. Withdrawal before 5 years of continuous service attracts TDS at 10%.',
  },
  {
    q: 'Is EPF taxable on withdrawal?',
    a: 'EPF withdrawal is tax-free if you have completed 5 years of continuous service. Before 5 years, the employer share and interest are taxed as salary. TDS at 10% is deducted on premature withdrawals above Rs 50,000 (or 20% without PAN).',
  },
  {
    q: 'What is the difference between EPF and VPF?',
    a: 'EPF is mandatory 12% contribution from both employee and employer. VPF allows additional voluntary contributions up to 100% of basic salary without employer match. Both earn the same 8.25% interest rate. VPF gives you complete flexibility and higher corpus at retirement.',
  },
  {
    q: 'Can private employees get EPF pension?',
    a: 'Yes, private employees in registered establishments get EPF pension. The EPS is part of the EPF system. However, establishments with fewer than 20 employees may not be covered under EPS. Verify your employer registration on the EPFO portal.',
  },
  {
    q: 'What happens to EPF when changing jobs?',
    a: 'Your EPF account can be transferred to the new employer using your UAN (Universal Account Number). The transfer is done online through the EPFO portal. Your service history and accumulated balance are preserved without any loss of interest.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework. Fermor is not a comparison site or content platform.',
  },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ─── Main ───────────────────────────────────────────────────── */
export default function EPFCalculatorClient({ region = 'in' }: { region?: string }) {
  const defaultSettings = {
    basicSalary: 50000,
    currentAge: 30,
    retirementAge: 58,
    currentBalance: 0,
    annualIncrement: 5,
  };
  const { settings, updateSettings } = useCalculatorSettings('epf-calculator', defaultSettings);
  const { basicSalary, currentAge, retirementAge, currentBalance, annualIncrement } = settings;

  const setBasicSalary     = (v: number) => updateSettings({ basicSalary: v });
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
    buildEPFSchedule(basicSalary, currentAge, retirementAge, currentBalance, annualIncrement),
    [basicSalary, currentAge, retirementAge, currentBalance, annualIncrement]
  );

  const totalEmployeeContrib = schedule.reduce((s, r) => s + r.employeeContrib, 0);
  const totalEmployerContrib = schedule.reduce((s, r) => s + r.employerContrib, 0);
  const totalContributions = totalEmployeeContrib + totalEmployerContrib;
  const totalInterest = schedule.reduce((s, r) => s + r.interest, 0);
  const maturityValue = schedule[schedule.length - 1]?.closingBal || currentBalance;

  const contribPct = maturityValue > 0 ? Math.round((totalContributions / maturityValue) * 100) : 0;
  const interestPct = 100 - contribPct;

  const years = retirementAge - currentAge;
  const yearsOfServiceAtRetirement = Math.max(5, years);
  const monthlyPension = calculateEPSPension(basicSalary * Math.pow(1 + annualIncrement / 100, years - 1), yearsOfServiceAtRetirement);

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const h3  = { fontSize: 15.5, fontWeight: 600, color: C.ink, margin: '0 0 6px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: C.bg, textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            EPF Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate your EPF maturity amount, monthly pension at retirement, and total interest earned with current EPF rate 8.25%.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="EPF Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

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
                      <Slider label="Monthly Basic Salary" id="epf-basic" value={basicSalary} min={15000} max={500000} step={1000} fmt={fmtC} onChange={setBasicSalary} compact={mobile} />
                      <Slider label="Current Age" id="epf-age" value={currentAge} min={18} max={57} step={1} fmt={v => `${v} yr`} onChange={setCurrentAge} compact={mobile} />
                      <Slider label="Retirement Age" id="epf-retire" value={retirementAge} min={50} max={70} step={1} fmt={v => `${v} yr`} onChange={setRetirementAge} compact={mobile} />

                      <div style={{ marginTop: 8, padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 24 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: C.ink, fontWeight: 700, marginBottom: 4 }}>
                          <span>Monthly Contribution (Employee + Employer EPF)</span>
                          <span>{fmtC(basicSalary * 15.67 / 100)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.ink2 }}>
                          <span>Employee (12%): {fmtC(basicSalary * 12 / 100)}</span>
                          <span>Employer EPF (3.67%): {fmtC(basicSalary * 3.67 / 100)}</span>
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
                      <Slider label="Current EPF Balance" id="epf-balance" value={currentBalance} min={0} max={10000000} step={10000} fmt={fmtC} onChange={setCurrentBalance} compact={mobile} />
                      <Slider label="Expected Annual Salary Increment" id="epf-increment" value={annualIncrement} min={0} max={20} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={setAnnualIncrement} compact={mobile} />
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: '0 0 24px' }}>
                        Enter your existing EPF balance for an accurate projection.
                        Annual salary increment compounds contributions over time.
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
                      EPF Maturity Value
                    </span>
                    <span aria-live="polite" aria-label={`Maturity value: ${fmtIN(maturityValue)}`}
                      style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {fmtIN(maturityValue)}
                    </span>
                  </div>

                  <div style={{ width: '100%', background: '#F0F7F3', borderRadius: 8, padding: mobile ? '10px 14px' : '12px 16px', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: mobile ? 12.5 : 13, color: C.ink, fontWeight: 600 }}>Monthly Pension at Retirement</span>
                    <span style={{ fontSize: mobile ? 16 : 18, fontWeight: 700, color: C.dark }}>{fmtC(monthlyPension)}</span>
                  </div>

                  {[
                    { label: 'Total Contributions', value: fmtC(totalContributions) },
                    { label: 'Employee Contribution', value: fmtC(totalEmployeeContrib) },
                    { label: 'Employer EPF Contribution', value: fmtC(totalEmployerContrib) },
                    { label: 'Total Interest Earned', value: fmtC(totalInterest) },
                    { label: 'Investment Period', value: `${years} years` },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    <DonutChart principal={totalContributions} interest={totalInterest} />
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
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Year-by-Year EPF Growth</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>Compounding breakdown at {EPF_RATE}%</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: C.bg, border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
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
                        <EPFBarChart rows={schedule} />
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
                        <table style={{ minWidth: 500, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <thead>
                            <tr style={{ background: C.bg }}>
                              {['Year', 'Opening Balance', 'Employee Contrib.', 'Employer EPF Contrib.', 'Interest', 'Closing Balance'].map(h => (
                                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }} scope="col">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {schedule.map((row, i) => (
                              <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ padding: '11px 14px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                                <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtIN(row.openingBal)}</td>
                                <td style={{ padding: '11px 14px', color: C.dark, fontWeight: 600 }}>{fmtIN(row.employeeContrib)}</td>
                                <td style={{ padding: '11px 14px', color: C.dark, fontWeight: 600 }}>{fmtIN(row.employerContrib)}</td>
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
                <h2 style={h2} id="what-is-epf">What Is EPF?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    EPF (Employee Provident Fund) is a mandatory retirement savings scheme where employees and employers contribute percentages of salary that earn 8.25% interest annually. The corpus is managed by the EPFO under the Ministry of Labour and Employment.
                  </p>
                </div>
                <p style={p}>
                  Every establishment with 20+ employees must register under the EPF Act, 1952.
                  Each employee gets a Universal Account Number (UAN) that remains the same across jobs.
                  EPF is one of India's most popular retirement vehicles because it offers sovereign-backed interest, tax-free maturity after 5 years of continuous service, and automatic payroll deduction that enforces disciplined saving.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="epf-pension-calculation">How to Calculate EPF Pension Amount</h2>
                <p style={p}>
                  Your EPF pension comes from the EPS (Employee Pension Scheme) portion of your employer's contribution.
                  The monthly pension is calculated using a fixed formula based on your pensionable salary and years of service.
                </p>
                <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark, display: 'block', lineHeight: 1.6 }}>
                    Monthly Pension = (Pensionable Salary × Pensionable Service) / 70<br />
                    Maximum Pensionable Service = 35 years<br />
                    Maximum Monthly Pension = Rs 7,500<br />
                    Maximum Pensionable Salary = Rs 15,000
                  </code>
                </div>
                <p style={p}>
                  Pensionable salary is your basic salary capped at Rs 15,000 per month.
                  If you have 20 years of service at a Rs 50,000 basic salary, your monthly pension would be (Rs 15,000 × 20) / 70 = Rs 4,286.
                  This pension is lifelong and your family receives a survivor portion if you pass away.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="epf-formula">EPF Maturity Formula: How to Calculate EPF Corpus</h2>
                <p style={p}>EPF maturity uses monthly compounding on your running balance throughout your service period.</p>
                <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark, display: 'block', lineHeight: 1.6 }}>
                    Monthly Rate = Annual EPF Rate / 12 / 100<br />
                    Monthly Interest = Opening Balance × Monthly Rate<br />
                    Closing Balance = Opening Balance + Monthly Contribution + Monthly Interest
                  </code>
                </div>
                <p style={p}>
                  Employee contributes 12% of basic salary, employer contributes 3.67% to EPF.
                  Total monthly contribution is 15.67% of basic salary earning 8.25% at current rates.
                  With annual salary increments, your contributions grow each year, accelerating maturity corpus.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="epf-contributions">EPF Contributions Breakdown</h2>
                <p style={p}>
                  The total 12% employer contribution is split between EPF and EPS (Employee Pension Scheme).
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}` }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Employer contribution split (12% of basic salary)</caption>
                    <thead><tr><th style={thS} scope="col">Component</th><th style={thS} scope="col">Rate</th><th style={thS} scope="col">Monthly Amount (on Rs 50,000 basic)</th><th style={thS} scope="col">Notes</th></tr></thead>
                    <tbody>
                      {[
                        ['Employee EPF', '12%', 'Rs 6,000', 'Deducted from salary, goes to EPF account'],
                        ['Employer EPF', '3.67%', 'Rs 1,835', 'Goes to EPF account (part of 12% employer share)'],
                        ['Employer EPS', '8.33%', 'Rs 4,165 (capped at Rs 1,250)', 'Goes to Pension Scheme, capped at Rs 15,000 salary'],
                        ['Total Employer', '12%', 'Rs 6,000', 'Employer bears full 12%'],
                        ['Total to EPF Account', '15.67%', 'Rs 7,835', 'Employee 12% + Employer EPF 3.67%'],
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
              </div>

              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>VPF Calculator</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Voluntary contributions earn the same 8.25% EPF rate with full tax benefits under Section 80C.</p>
                </div>
                <Link className="fx-btn" href="/calculators/vpf-calculator" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
              </div>

              <div style={sec}>
                <h2 style={h2} id="epf-vs-vpf">EPF vs VPF: What Is the Difference?</h2>
                <p style={p}>
                  VPF (Voluntary Provident Fund) allows you to contribute more than the mandatory 12% of basic salary to your EPF account, up to 100% of basic salary.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}` }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Key differences between EPF and VPF</caption>
                    <thead><tr><th style={thS} scope="col">Feature</th><th style={thS} scope="col">EPF</th><th style={thS} scope="col">VPF</th></tr></thead>
                    <tbody>
                      {[
                        ['Contribution Rate', 'Fixed 12% of basic (employee)', 'Voluntary, up to 100% of basic'],
                        ['Employer Match', 'Yes, 3.67% to EPF + 8.33% to EPS', 'No employer match'],
                        ['Interest Rate', '8.25% (FY 2025-26)', 'Same as EPF: 8.25%'],
                        ['Tax Benefit (80C)', 'Up to Rs 1.5 lakh/year', 'Up to Rs 1.5 lakh/year (combined with EPF)'],
                        ['Withdrawal Rules', 'Same as EPF', 'Same as EPF'],
                        ['Mandatory', 'Yes, for eligible employees', 'No, completely voluntary'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={tdR}>{r[1]}</td>
                          <td style={{ ...tdR, color: C.dark, fontWeight: 600 }}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="epf-withdrawal-rules">EPF Withdrawal Rules and Limits</h2>
                <p style={p}>
                  EPF withdrawals are governed by the EPF Scheme, 1952.
                  Partial withdrawals are allowed only for specific purposes and with service requirements.
                  Full withdrawal is possible after retirement at age 58 or in case of job loss.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}` }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>EPF withdrawal purposes and limits</caption>
                    <thead><tr><th style={thS} scope="col">Purpose</th><th style={thS} scope="col">Eligibility</th><th style={thS} scope="col">Limit</th></tr></thead>
                    <tbody>
                      {[
                        ['Medical Emergency', 'Self, spouse, children, parents', 'Up to 6 months basic + DA or total corpus, whichever is lower'],
                        ['Home Purchase/Construction', '5 years service', 'Up to 24 months basic + DA for purchase, 36 months for construction'],
                        ['Home Loan Repayment', '10 years service', 'Up to 36 months basic + DA'],
                        ['Marriage', '7 years service (self/siblings/children)', 'Up to 50% of employee share'],
                        ['Education', '7 years service (self/children)', 'Up to 50% of employee share'],
                        ['Unemployment', '1 month unemployed', '75% after 1 month, 25% after 2 months'],
                        ['Retirement', 'Age 58', '100% of corpus'],
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
              </div>

              <div style={sec}>
                <h2 style={h2} id="epf-taxation">EPF Tax Treatment at Retirement and Withdrawal</h2>
                <p style={p}>
                  EPF enjoys EEE (Exempt-Exempt-Exempt) tax treatment under specific conditions.
                  This means contributions, interest, and maturity are all tax-free if withdrawal conditions are met.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}` }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>EPF tax treatment at different stages</caption>
                    <thead><tr><th style={thS} scope="col">Stage</th><th style={thS} scope="col">Tax Treatment</th><th style={thS} scope="col">Condition</th></tr></thead>
                    <tbody>
                      {[
                        ['Employee Contribution', 'Exempt under Section 80C', 'Up to Rs 1.5 lakh/year'],
                        ['Employer Contribution', 'Exempt', 'Up to 12% of basic salary'],
                        ['Interest Earned', 'Exempt', 'If withdrawal after 5 years continuous service'],
                        ['Maturity/Withdrawal', 'Exempt', 'After 5 years continuous service'],
                        ['Premature Withdrawal', 'Taxable', 'Before 5 years: employer share + interest taxed as salary'],
                        ['TDS on Premature Withdrawal', '10%', 'If amount Rs 50,000+ and PAN provided; 20% without PAN'],
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
              </div>

              <div style={sec}>
                <h2 style={h2} id="epf-interest-calculation">How EPF Interest Is Calculated and Compounded</h2>
                <p style={p}>
                  EPF interest is calculated on a monthly running balance basis but credited annually at the end of the financial year (March 31).
                </p>
                <p style={p}>
                  For each month, the interest is calculated on the opening balance plus the monthly contribution.
                  Interest for the full year is the sum of 12 monthly calculations, meaning earlier contributions earn more interest than later ones.
                  This monthly compounding makes the effective annual rate approximately 8.57% instead of the stated 8.25%.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="epf-private-employees">Can Private Employees Get EPF Pension?</h2>
                <p style={p}>
                  Yes, private employees in registered establishments get EPF pension.
                  The EPS (Employee Pension Scheme) is part of the EPF system and applies to all registered private sector employees.
                  However, establishments with fewer than 20 employees may not be covered under EPS rules.
                  Verify your employer registration status on the EPFO portal using your UAN.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="epf-benefits">Key Benefits of EPF for Retirement Planning</h2>
                <p style={p}>
                  Sovereign guarantee backs your EPF corpus.
                  The interest rate is declared by the government and is not subject to market fluctuations like equity investments.
                </p>
                <p style={p}>
                  Tax-free maturity is a major advantage.
                  After 5 years of continuous service, your entire corpus (contributions plus interest) is tax-free on withdrawal.
                  This makes EPF superior to many other savings vehicles for retirement corpus building.
                </p>
                <p style={p}>
                  Automatic discipline through payroll deduction ensures consistent saving.
                  You cannot accidentally skip contributions because they are deducted before salary credit.
                  Over 28 years (age 30 to 58), this automatic discipline compounds into a substantial retirement corpus.
                </p>
                <p style={p}>
                  Portability via your UAN (Universal Account Number) means your account stays intact across job changes.
                  You can transfer your balance online when changing employers without losing service history or interest accrual.
                </p>
                <p style={p}>
                  Insurance cover is automatic for all EPF members.
                  The Employees' Deposit Linked Insurance (EDLI) scheme provides life cover up to Rs 7 lakh at no additional cost to you.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This EPF Pension Calculator</h2>
                <p style={p}>Enter your monthly basic salary to calculate your contributions and interest growth.</p>
                <p style={p}>
                  Set your current age and expected retirement age (typically 58 in India).
                  The calculator computes your contribution period and projects maturity corpus with year-by-year breakdown.
                </p>
                <p style={p}>
                  Enter your current EPF balance if you have one from previous employment.
                  Add your expected annual salary increment percentage to account for growing contributions over time.
                  The calculator automatically computes your monthly pension at retirement along with the lump-sum maturity amount.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Use the currency selector to view amounts in USD, EUR, GBP, or other currencies if you are planning NRI retirement.
                  The calculator stores your inputs locally so your data returns when you revisit.
                </p>
              </div>


              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only. The EPF interest rate is declared annually by the EPFO and may change. The current rate of 8.25% applies to FY 2025-26. Actual maturity value and pension will depend on future interest rate declarations, salary increments, and withdrawal timing. This calculator is for educational and planning purposes only and does not constitute financial advice. Consult a SEBI-registered investment adviser before making investment decisions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .epf-sidebar::-webkit-scrollbar { width: 5px; }
            .epf-sidebar::-webkit-scrollbar-track { background: transparent; }
            .epf-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .epf-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside className="epf-sidebar" aria-label="Related calculators" style={{
            position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start',
            maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto',
            display: 'flex', flexDirection: 'column', gap: 16,
            scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent',
          } as React.CSSProperties}>
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

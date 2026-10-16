'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect, useId } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { FAQBox } from '@/components/common/FAQBox';

/* ── Palette ───────────────────────────────────────────── */
const C = {
  dark: '#101214', lime: '#a6dbc4', lime2: '#2d9970', paleLime: '#f4f5f6',
  ink: '#16140F', ink2: '#50565c', ink3: '#7a8087', white: '#ffffff',
  bg: '#f6f7f8', border: '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

/* ── Math Functions ────────────────────────────────────── */
function calcMaxLoanForEMI(maxEmi: number, rate: number, months: number) {
  if (months === 0 || maxEmi <= 0) return 0;
  if (rate === 0) return maxEmi * months;
  const m = rate / 12 / 100;
  return maxEmi * (Math.pow(1 + m, months) - 1) / (m * Math.pow(1 + m, months));
}

function calcEMI(p: number, r: number, n: number) {
  if (n === 0 || p === 0) return 0;
  if (r === 0) return p / n;
  const m = r / 12 / 100;
  return (p * m * Math.pow(1 + m, n)) / (Math.pow(1 + m, n) - 1);
}

const BANK_BENCHMARKS = [
  { name: 'SBI', rate: 8.40, maxFoir: 55, type: 'Public Bank' },
  { name: 'HDFC Bank', rate: 8.35, maxFoir: 60, type: 'Private Bank' },
  { name: 'ICICI Bank', rate: 8.40, maxFoir: 55, type: 'Private Bank' },
  { name: 'Axis Bank', rate: 8.75, maxFoir: 60, type: 'Private Bank' },
  { name: 'Bank of Baroda', rate: 8.40, maxFoir: 55, type: 'Public Bank' },
  { name: 'LIC Housing Finance', rate: 8.50, maxFoir: 55, type: 'NBFC' },
];

/* ── Slider Component ─────────────────────────────────── */
function Slider({ label, id: idProp, value, min, max, step, display, onChange, compact, suffix }: {
  label: string; id?: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (v: number) => void; compact?: boolean; suffix?: string;
}) {
  const autoId = useId();
  const inputId = idProp || autoId;
  const rangeId = `${inputId}-range`;
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const commit = () => { setEditing(false); const n = parseFloat(raw.replace(/[^0-9.]/g, '')); if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n))); };
  return (
    <div style={{ marginBottom: compact ? 18 : 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 8 : 12 }}>
        {label ? <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 13.5 : 14, color: C.ink2, fontWeight: 400 }}>{label}</label> : <span />}
        {editing ? (
          <div style={{ position: 'relative' }}>
            <input id={inputId} autoFocus value={raw} aria-label={`Enter ${label} value`}
              onChange={e => setRaw(e.target.value)} onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
              style={{ fontSize: 14, fontWeight: 700, textAlign: suffix ? 'left' : 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 130, outline: 'none', color: C.dark, fontFamily: INTER }} />
            {suffix && <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: C.ink3, pointerEvents: 'none', fontWeight: 700 }}>{suffix}</span>}
          </div>
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${display}. Click to edit.`}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}
            style={{ fontSize: compact ? 13 : 14.5, fontWeight: 700, color: C.dark, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '5px 12px' : '7px 16px', cursor: 'pointer', fontFamily: INTER, minWidth: compact ? 85 : 105, textAlign: 'center', transition: 'border-color 0.15s' }}>
            {display}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 18, height: 18, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 1px 6px rgba(16,18,20,0.18)', pointerEvents: 'none', zIndex: 1 }} />
        <input id={rangeId} type="range" min={min} max={max} step={step} value={value}
          aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
          onChange={e => onChange(+e.target.value)}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{ fontSize: 11, color: C.ink3 }}>{min}{suffix || ''}</span>
        <span style={{ fontSize: 11, color: C.ink3 }}>{max}{suffix || ''}</span>
      </div>
    </div>
  );
}

/* ── Sidebar Components ────────────────────────────────── */
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

function PropertySnapshot() {
  const rows = [
    { label: 'Standard Down Payment', value: '15% - 20%' },
    { label: 'RBI LTV Ceiling', value: '75% - 90%' },
    { label: 'Stamp Duty & Reg.', value: '5% - 7%' },
    { label: 'Typical FOIR Limit', value: '50% - 60%' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Property Market Snapshot</span>
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
    { href: '/blogs/world-gdp-ranking-2026', label: 'World GDP Ranking 2026: Impact on Indian Real Estate & Rates' },
    { href: '/blogs/itr-filing-last-date-fy-2025-26', label: 'ITR Filing Due Dates AY 2026-27: Tax Exemptions on Home Loans' },
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
  { href: '/calculators/home-loan-eligibility-calculator',label: 'Home Loan Eligibility Calculator' },
  { href: '/calculators/home-down-payment-calculator',    label: 'Home Down Payment Calculator' },
  { href: '/calculators/mortgage-calculator',             label: 'Home Loan EMI Calculator' },
  { href: '/calculators/stamp-duty-calculator',           label: 'Stamp Duty Calculator' },
  { href: '/calculators/property-registration-calculator', label: 'Property Registration Cost' },
];
const MORE = [
  { href: '/calculators/rent-vs-buy-calculator',           label: 'Rent vs Buy Calculator' },
  { href: '/calculators/rental-yield-calculator',         label: 'Rental Yield Calculator' },
  { href: '/calculators/debt-to-income-ratio-calculator',  label: 'Debt-to-Income Ratio' },
  { href: '/calculators/income-tax-calculator',            label: 'Income Tax Calculator' },
];

/* ── FAQ Accordion Component ───────────────────────────── */
const FAQS = [
  { q: 'How is property affordability calculated in India?', a: 'Property affordability is calculated by adding your maximum eligible home loan amount (derived from monthly income and FOIR) to your total upfront down payment savings.' },
  { q: 'What is the 3x or 4x income rule for home buying?', a: 'The general rule of thumb suggests buying a property priced at no more than 3 to 4 times your gross annual income, ensuring home loan EMIs remain comfortably within 40% to 50% of take-home pay.' },
  { q: 'How much property can I afford on a Rs 1 lakh salary?', a: 'On a Rs 1 lakh monthly salary with no existing EMIs, 50% FOIR, 8.4% rate for 20 years, and Rs 15 lakh down payment, you can afford a property priced at approximately Rs 73.1 lakh.' },
  { q: 'How much cash is needed upfront besides the down payment?', a: 'Besides the 10% to 20% down payment, buyers must budget 5% to 7% for stamp duty and registration fees, 1% for legal/processing charges, and 5% to 10% for interiors.' },
  { q: 'How do existing EMIs affect property buying budget?', a: 'Every Rs 10,000 in existing monthly EMIs reduces your home loan capacity by approximately Rs 11.5 lakh at 8.4% interest for 20 years, lowering your maximum property budget by the same amount.' },
  { q: 'What is RBI\'s LTV norm for home loans?', a: 'Per RBI norms, banks fund up to 90% for property loans up to Rs 30 lakh, 80% for loans between Rs 30 lakh and Rs 75 lakh, and 75% for loans exceeding Rs 75 lakh.' },
  { q: 'How does a joint applicant increase property affordability?', a: 'Adding a working spouse or parent as a co-applicant combines your monthly incomes, increasing your available EMI capacity and raising property budget by 40% to 70%.' },
  { q: 'What is FOIR and how does it restrict house budget?', a: 'FOIR (Fixed Obligation to Income Ratio) caps total monthly EMI payments at 50% to 60% of take-home salary, limiting the maximum home loan you can qualify for.' },
  { q: 'Can self-employed individuals calculate property affordability here?', a: 'Yes. Self-employed applicants should enter monthly net profit from recent ITRs. Banks typically apply a 40% to 50% FOIR for self-employed borrowers.' },
  { q: 'What CIBIL score is required for maximum property loan approval?', a: 'A CIBIL score of 750 or above qualifies for headline home loan rates (around 8.35% to 8.40%), maximizing your eligible loan and overall property budget.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ── Donut Chart ──────────────────────────────────────── */
function DonutChart({ loan, savings }: { loan: number; savings: number }) {
  const total = loan + savings;
  if (total === 0) return null;
  const R = 80, sw = 22, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const loanArc = (loan / total) * circ;
  const loanPct = Math.round((loan / total) * 100);

  return (
    <svg role="img" aria-label={`Property funding split: ${loanPct}% home loan, ${100 - loanPct}% down payment savings`}
      width="212" height="212" viewBox="0 0 212 212" style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${loanArc} ${circ - loanArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Home Loan</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{loanPct}%</text>
    </svg>
  );
}

/* ── Amortization Schedule Data Helper ─────────────────── */
type YearRow = { year: number; principal: number; interest: number; balance: number };
function buildAmortization(loan: number, annualRate: number, months: number): YearRow[] {
  if (loan <= 0 || months <= 0) return [];
  const emi = calcEMI(loan, annualRate, months);
  const m = annualRate / 12 / 100;
  let balance = loan;
  const rows: YearRow[] = [];
  let year = 1, yPrincipal = 0, yInterest = 0;
  for (let month = 1; month <= months; month++) {
    const interest = balance * m;
    const principal = emi - interest;
    balance = Math.max(0, balance - principal);
    yPrincipal += principal;
    yInterest += interest;
    if (month % 12 === 0 || month === months) {
      rows.push({ year, principal: Math.round(yPrincipal), interest: Math.round(yInterest), balance: Math.round(balance) });
      year++; yPrincipal = 0; yInterest = 0;
    }
  }
  return rows;
}

function BarChart({ rows }: { rows: YearRow[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxAnnual = Math.max(...rows.map(r => r.principal + r.interest));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;
  return (
    <svg role="img" aria-label="Year-by-year principal and interest breakdown for your eligible loan"
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {rows.map((row, i) => {
        const total = row.principal + row.interest;
        const totalH = maxAnnual > 0 ? (total / maxAnnual) * H : 0;
        const prinH = total > 0 ? (row.principal / total) * totalH : 0;
        const intH = totalH - prinH;
        const x = PADL + i * slot + gap;
        return (
          <g key={row.year}>
            <rect x={x} y={H - totalH} width={barW} height={intH} fill={CHART_PAIR.secondary} rx={2} />
            <rect x={x} y={H - prinH} width={barW} height={prinH} fill={CHART_PAIR.primary} rx={2} />
            {rows.length <= 30 && (
              <text x={x + barW / 2} y={H + 14} textAnchor="middle" style={{ fontSize: rows.length > 20 ? 7 : 9, fill: C.ink3, fontFamily: INTER }}>
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

/* ── Article Style Constants ──────────────────────────── */
const h2S: React.CSSProperties = { fontSize: 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' };
const pS: React.CSSProperties = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' };
const secS: React.CSSProperties = { margin: '0 0 40px' };
const bulletS: React.CSSProperties = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 };
const thS: React.CSSProperties = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', verticalAlign: 'middle', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' };
const tdL: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'left', border: `1px solid ${C.border}`, verticalAlign: 'middle' };
const tdR: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, textAlign: 'left', border: `1px solid ${C.border}`, verticalAlign: 'middle' };
const tdC: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'center', border: `1px solid ${C.border}`, verticalAlign: 'middle' };

/* ════════════════════════════════════════════════════════ */
export default function PropertyAffordabilityClient() {
  const defaultSettings = {
    monthlyIncome: 120000,
    coIncome: 0,
    hasCoApplicant: false,
    existingEmi: 10000,
    downPaymentSavings: 1500000,
    rate: 8.4,
    tenureYr: 20,
    foir: 50,
  };
  const { settings, updateSettings } = useCalculatorSettings('property-affordability', defaultSettings);
  const { monthlyIncome, coIncome, hasCoApplicant, existingEmi, downPaymentSavings, rate, tenureYr, foir } = settings;

  const [mobile, setMobile] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showAmortization, setShowAmortization] = useState(false);
  useLayoutEffect(() => { const chk = () => setMobile(window.innerWidth < 1024); chk(); window.addEventListener('resize', chk); return () => window.removeEventListener('resize', chk); }, []);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  // Math Calculations
  const totalIncome = monthlyIncome + (hasCoApplicant ? coIncome : 0);
  const maxEmiCapacity = (totalIncome * foir) / 100;
  const availableEmi = Math.max(0, maxEmiCapacity - existingEmi);
  const tenureMo = tenureYr * 12;
  const eligibleLoan = Math.round(calcMaxLoanForEMI(availableEmi, rate, tenureMo));
  const maxPropertyBudget = eligibleLoan + downPaymentSavings;
  const monthlyEmiOnLoan = Math.round(calcEMI(eligibleLoan, rate, tenureMo));
  const stampDutyEstimate = Math.round(maxPropertyBudget * 0.06); // ~6% average stamp duty + reg
  const totalUpfrontCashNeeded = downPaymentSavings + stampDutyEstimate;

  const isDeficit = availableEmi <= 0;
  const amortRows = useMemo(() => buildAmortization(eligibleLoan, rate, tenureMo), [eligibleLoan, rate, tenureMo]);

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>Property Affordability Calculator</h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate the maximum property price you can afford based on your monthly income, down payment savings, existing EMIs, and bank FOIR limits.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Inputs Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '36px 36px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Income & Savings</p>
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider id="monthly-income" label="Net Monthly Salary" value={monthlyIncome} min={25000} max={1000000} step={1000}
                        display={fmtIN(monthlyIncome)} onChange={v => updateSettings({ monthlyIncome: v })} compact />

                      <Slider id="down-payment-savings" label="Down Payment Savings" value={downPaymentSavings} min={100000} max={20000000} step={50000}
                        display={fmtIN(downPaymentSavings)} onChange={v => updateSettings({ downPaymentSavings: v })} compact />

                      <Slider id="existing-emi" label="Existing Monthly EMIs" value={existingEmi} min={0} max={300000} step={500}
                        display={fmtIN(existingEmi)} onChange={v => updateSettings({ existingEmi: v })} compact />

                      <Slider id="tenure" label="Loan Tenure (Years)" value={tenureYr} min={1} max={30} step={1}
                        display={`${tenureYr} yrs`} onChange={v => updateSettings({ tenureYr: v })} compact />

                      <Slider id="rate" label="Interest Rate (% p.a.)" value={rate} min={7.0} max={14.0} step={0.1}
                        display={`${rate.toFixed(2)}%`} onChange={v => updateSettings({ rate: v })} compact />

                      <button onClick={() => setShowAdvanced(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        More settings
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Co-applicant Toggle */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, border: `1px solid ${C.border}`, padding: '10px 14px', borderRadius: 8, overflow: 'hidden' }}>
                        <span style={{ fontSize: 13, fontWeight: 400, color: C.ink2 }}>Add Co-applicant Income?</span>
                        <button onClick={() => updateSettings({ hasCoApplicant: !hasCoApplicant })}
                          aria-pressed={hasCoApplicant}
                          style={{ width: 40, height: 22, borderRadius: 11, background: hasCoApplicant ? C.ink : C.border, border: 'none', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
                          <div style={{ width: 18, height: 18, borderRadius: 9, background: C.white, position: 'absolute', top: 2, left: hasCoApplicant ? 20 : 2, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                        </button>
                      </div>

                      {hasCoApplicant && (
                        <Slider id="co-income" label="Co-applicant Net Monthly Salary" value={coIncome} min={0} max={1000000} step={1000}
                          display={fmtIN(coIncome)} onChange={v => updateSettings({ coIncome: v })} compact />
                      )}

                      <Slider id="foir-limit" label="Bank FOIR Cap (%)" value={foir} min={30} max={65} step={5}
                        display={`${foir}%`} onChange={v => updateSettings({ foir: v })} compact />

                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: 14, marginBottom: 20 }}>
                        <div style={{ fontSize: 12, color: C.ink3, marginBottom: 4 }}>Est. Stamp Duty & Registration (~6%)</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{fmtC(stampDutyEstimate)}</div>
                      </div>

                      <button onClick={() => setShowAdvanced(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        Back
                      </button>
                    </>
                  )}
                </div>

                {/* Output Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '36px 36px', background: '#fafafa', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Donut Chart - Desktop order -1 */}
                    <div style={{ order: mobile ? 1 : -1, marginBottom: 16 }}>
                      <DonutChart loan={eligibleLoan} savings={downPaymentSavings} />
                    </div>

                    {/* Donut Legend - Desktop order -1 */}
                    <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 14, marginBottom: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                        <span style={{ fontSize: 12, color: C.ink2 }}>Home Loan</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                        <span style={{ fontSize: 12, color: C.ink2 }}>Down Payment</span>
                      </div>
                    </div>

                    {/* Dark Result Box */}
                    <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 14, padding: '20px 24px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'stretch' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#50565C' }}>Max Affordable Property Price</div>
                        <div style={{ fontSize: 12, color: '#7A8087' }}>Monthly Home Loan EMI</div>
                      </div>
                      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                        <div style={{ fontSize: 24, fontWeight: 800, color: '#1F7A58', lineHeight: 1 }}>
                          <span aria-live="polite" aria-label={`Maximum property price: ${fmtIN(maxPropertyBudget)}`}>{fmtIN(maxPropertyBudget)}</span>
                        </div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: '#101214', lineHeight: 1 }}>
                          {fmtIN(monthlyEmiOnLoan)}/mo
                        </div>
                      </div>
                    </div>

                    {/* Breakdown Stat Rows */}
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, borderBottom: `1px solid ${C.border}`, paddingBottom: 6 }}>
                        <span style={{ color: C.ink2 }}>Max Eligible Home Loan</span>
                        <span style={{ fontWeight: 600, color: C.ink }}>{fmtC(eligibleLoan)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, borderBottom: `1px solid ${C.border}`, paddingBottom: 6 }}>
                        <span style={{ color: C.ink2 }}>Down Payment (Savings)</span>
                        <span style={{ fontWeight: 600, color: '#166534' }}>{fmtC(downPaymentSavings)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, borderBottom: `1px solid ${C.border}`, paddingBottom: 6 }}>
                        <span style={{ color: C.ink2 }}>Est. Upfront Stamp Duty (~6%)</span>
                        <span style={{ fontWeight: 600, color: C.ink }}>{fmtC(stampDutyEstimate)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                        <span style={{ color: C.ink2 }}>Total Upfront Cash Needed</span>
                        <span style={{ fontWeight: 600, color: C.ink }}>{fmtC(totalUpfrontCashNeeded)}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div style={{ marginBottom: 24 }}><SaveResultsCard mobile={mobile} /></div>

            {/* ── Bank FOIR & Rate Comparison Table ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', marginBottom: 32, boxShadow: '0 1px 12px rgba(16,18,20,0.05)' }}>
              <div style={{ padding: '16px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>Bank-wise Max Property Budget</div>
                  <div style={{ fontSize: 12, color: C.ink3, marginTop: 3 }}>Property budget across 6 lenders for your current income & down payment</div>
                </div>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 20px 12px' }}>Max property budget based on each lender's headline rate and typical FOIR cap.</caption>
                  <thead>
                    <tr>
                      <th scope="col" style={thS}>Lender</th>
                      <th scope="col" style={{ ...thS, textAlign: 'center' }}>Type</th>
                      <th scope="col" style={{ ...thS, textAlign: 'center' }}>Rate</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Max Eligible Loan</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Max Property Budget</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isDeficit ? (
                      <tr><td colSpan={5} style={{ ...tdC, padding: '24px' }}>No loan eligibility: existing EMIs exceed FOIR limit</td></tr>
                    ) : BANK_BENCHMARKS.map((b, i) => {
                      const bankCapacity = Math.max(0, (totalIncome * b.maxFoir / 100) - existingEmi);
                      const bankLoan = Math.round(calcMaxLoanForEMI(bankCapacity, b.rate, tenureMo));
                      const bankPropertyBudget = bankLoan + downPaymentSavings;
                      const isHighest = bankPropertyBudget === Math.max(...BANK_BENCHMARKS.map(x => Math.round(calcMaxLoanForEMI(Math.max(0, (totalIncome * x.maxFoir / 100) - existingEmi), x.rate, tenureMo)) + downPaymentSavings));
                      return (
                        <tr key={b.name} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>{b.name}</td>
                          <td style={tdC}>{b.type}</td>
                          <td style={tdC}>{b.rate}%</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>{fmtC(bankLoan)}</td>
                          <td style={{ ...tdR, textAlign: 'right', color: isHighest ? '#1f7a58' : C.ink }}>{fmtC(bankPropertyBudget)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── Amortization Schedule for Eligible Loan ── */}
            {!isDeficit && amortRows.length > 0 && (
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', marginBottom: 32, boxShadow: '0 1px 12px rgba(16,18,20,0.05)' }}>
                <button onClick={() => setShowAmortization(v => !v)} aria-expanded={showAmortization} aria-controls="prop-amort-panel"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: INTER }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>Amortization Schedule for Eligible Loan ({fmtC(eligibleLoan)})</div>
                    <div style={{ fontSize: 12, color: C.ink3, marginTop: 3 }}>Year-by-year principal and interest breakdown over {tenureYr} years</div>
                  </div>
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transform: showAmortization ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}><polyline points="6 9 12 15 18 9" /></svg>
                </button>
                {showAmortization && (
                  <div id="prop-amort-panel" style={{ padding: '4px 24px 24px' }}>
                    <div style={{ marginBottom: 18 }}><BarChart rows={amortRows} /></div>
                    <div style={{ display: 'flex', gap: 20, marginBottom: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                        <span style={{ fontSize: 13, color: C.ink2 }}>Principal</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                        <span style={{ fontSize: 13, color: C.ink2 }}>Interest</span>
                      </div>
                    </div>
                    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                          Year-by-year repayment schedule for a {fmtC(eligibleLoan)} home loan at {rate.toFixed(2)}%.
                        </caption>
                        <thead>
                          <tr>
                            <th scope="col" style={thS}>Year</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' }}>Principal Paid</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' }}>Interest Paid</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' }}>Balance Remaining</th>
                          </tr>
                        </thead>
                        <tbody>
                          {amortRows.map((r, i) => (
                            <tr key={r.year} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                              <td style={tdR}>{r.year}</td>
                              <td style={{ ...tdL, textAlign: 'right', color: '#166534' }}>{fmtC(r.principal)}</td>
                              <td style={{ ...tdL, textAlign: 'right' }}>{fmtC(r.interest)}</td>
                              <td style={{ ...tdL, textAlign: 'right' }}>{fmtC(r.balance)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            

            {/* ════════════════════ ARTICLE ════════════════════ */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={secS} id="what-is-affordability">
                <h2 style={h2S}>What Is Property Affordability?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Property Affordability is the maximum purchase price of a home you can buy by combining your maximum eligible home loan with your available upfront liquid cash savings.
                  </p>
                </div>
                <p style={pS}>First-time home buyers in India often make the mistake of looking only at the property price without evaluating bank FOIR limits or hidden transaction costs like stamp duty, registration, and interior expenses.</p>
                <p style={pS}>This calculator connects your net monthly salary, existing monthly loan obligations, down payment savings, and bank interest rates to establish an absolute, bankable property budget.</p>
                <p style={pS}>Already have a home loan quote or checking raw eligibility? Explore the dedicated <Link href="/calculators/home-loan-eligibility-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Home Loan Eligibility Calculator</Link> or plan your down payment savings goal with the <Link href="/calculators/home-down-payment-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Home Down Payment Calculator</Link>.</p>
              </div>

              <div style={secS} id="affordability-formula">
                <h2 style={h2S}>Property Affordability Formula</h2>
                <p style={pS}>The calculation adds your FOIR-based home loan borrowing capacity to your liquid savings reserved for down payment.</p>
                <div style={{ background: '#f8f9f9', border: `1px solid ${C.border}`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, margin: '0 0 8px' }}>Step 1: Calculate Eligible Loan Amount</p>
                  <code style={{ fontSize: 13 }}>Available EMI = (Monthly Salary × FOIR%) - Existing EMIs</code>
                  <br />
                  <code style={{ fontSize: 13 }}>Eligible Loan = Available EMI × [ (1+r)^n - 1 ] / [ r × (1+r)^n ]</code>

                  <p style={{ fontSize: 14, fontWeight: 700, margin: '16px 0 8px' }}>Step 2: Calculate Max Property Budget</p>
                  <code style={{ fontSize: 13 }}>Max Property Budget = Eligible Loan + Down Payment Savings</code>
                </div>
                <p style={{ ...pS, fontWeight: 600 }}>Worked example: Rs 1,20,000 salary, Rs 10,000 existing EMI, 50% FOIR, Rs 15,00,000 down payment savings, 8.4% for 20 years</p>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Available EMI capacity: 50% of Rs 1,20,000 = Rs 60,000 minus Rs 10,000 = <strong>Rs 50,000/mo</strong></span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Eligible home loan: <strong>Rs 58,10,771</strong></span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Max property price: Rs 58,10,771 + Rs 15,00,000 = <strong>Rs 73,10,771</strong></span></div>
              </div>

              <div style={secS} id="affordability-by-salary">
                <h2 style={h2S}>Property Budget by Salary (Rs 15 Lakh Down Payment)</h2>
                <p style={pS}>The table below shows maximum affordable property prices across monthly salary levels at 8.4% interest, 20-year tenure, 50% FOIR, and Rs 15 lakh down payment savings with zero existing EMIs.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>Max property budget by monthly take-home salary at 8.4% interest for 20 years.</caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Monthly Take-Home Salary</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Max Eligible Loan</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Down Payment Savings</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Max Property Budget</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { s: 50000, l: 2905386, d: 1500000, b: 4405386 },
                        { s: 75000, l: 4358079, d: 1500000, b: 5858079 },
                        { s: 100000, l: 5810771, d: 1500000, b: 7310771 },
                        { s: 120000, l: 6972926, d: 1500000, b: 8472926 },
                        { s: 150000, l: 8716157, d: 1500000, b: 10216157 },
                        { s: 200000, l: 11621543, d: 1500000, b: 13121543 },
                      ].map((row, i) => (
                        <tr key={row.s} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>Rs {row.s.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>Rs {row.l.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>Rs {row.d.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdR, textAlign: 'right', color: '#166534' }}>Rs {row.b.toLocaleString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={secS} id="ltv-and-down-payment">
                <h2 style={h2S}>RBI LTV Norms and Minimum Down Payment</h2>
                <p style={pS}>Reserve Bank of India (RBI) guidelines mandate strict Loan-to-Value (LTV) limits for Indian lenders based on property valuation bands.</p>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Loans up to Rs 30 Lakh:</strong> maximum LTV 90% (minimum 10% down payment required).</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Loans Rs 30 Lakh to Rs 75 Lakh:</strong> maximum LTV 80% (minimum 20% down payment required).</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Loans above Rs 75 Lakh:</strong> maximum LTV 75% (minimum 25% down payment required).</span></div>
              </div>

              <div style={secS} id="bank-comparison">
                <h2 style={h2S}>Bank FOIR & Loan Limits</h2>
                <p style={pS}>Lenders apply different FOIR caps based on salary levels. Public sector banks like SBI apply 50% to 55% FOIR, while private banks like HDFC Bank stretch up to 60% or 65% for high-salaried applicants earning above Rs 1.5 lakh monthly.</p>
              </div>

              <div style={secS} id="stamp-duty-costs">
                <h2 style={h2S}>Stamp Duty and Hidden Property Purchase Costs</h2>
                <p style={pS}>The property agreement value is not your total out-of-pocket cost. Indian property acquisitions involve significant upfront fees that must be funded from personal savings, as banks do not include them in the loan amount.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>Typical upfront transaction costs on property purchase.</caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Expense Head</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Typical Cost %</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Cost on Rs 75 Lakh Property</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { h: 'Stamp Duty & Registration', p: '5% - 7%', c: 450000 },
                        { h: 'Legal & Valuation Fees', p: '0.5% - 1%', c: 37500 },
                        { h: 'Home Loan Processing Fee', p: '0.25% - 0.5%', c: 25000 },
                        { h: 'Basic Interior & Furnishing', p: '5% - 10%', c: 500000 },
                      ].map((row, i) => (
                        <tr key={row.h} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>{row.h}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>{row.p}</td>
                          <td style={{ ...tdR, textAlign: 'right', color: C.ink }}>Rs {row.c.toLocaleString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={secS} id="excel-formula">
                <h2 style={h2S}>Property Affordability Formula in Excel</h2>
                <p style={pS}>Calculate property affordability in Excel using the PV function for home loan eligibility.</p>
                <div style={{ background: '#f8f9f9', border: `1px solid ${C.border}`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  <code style={{ fontSize: 13, display: 'block', marginBottom: 8 }}>A1: Salary | B1: FOIR % | C1: Existing EMI | D1: Rate % | E1: Tenure Yrs | F1: Savings</code>
                  <code style={{ fontSize: 13, color: '#166534' }}>=PV(D1/12, E1*12, -((A1*B1)-C1)) + F1</code>
                </div>
              </div>

              <div style={secS} id="common-mistakes">
                <h2 style={h2S}>Common Mistakes in House Budgeting</h2>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Exhausting 100% of emergency savings for down payment:</strong> leaving zero liquid reserve after property purchase creates severe liquidity risk.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Forgetting maintenance and GST:</strong> under-construction properties carry 5% GST, and society maintenance adds Rs 3,000 to Rs 10,000 monthly.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Overestimating future salary growth:</strong> stretching EMI capacity to 60% assuming rapid salary hikes leads to loan distress if increments slow.</span></div>
              </div>

              <div style={secS} id="how-to-improve">
                <h2 style={h2S}>How to Improve Property Affordability</h2>
                <ol style={{ paddingLeft: 24, margin: '0 0 16px', listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Clear short-term personal or car loans:</strong> closing a Rs 15,000 EMI increases your property budget by over Rs 17 lakh.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Add a working co-applicant:</strong> combining income with a spouse or parent boosts total loan eligibility significantly.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Improve CIBIL score above 750:</strong> securing the lowest interest slab saves lakhs in total interest, expanding loan capacity.</li>
                </ol>
              </div>

              <div style={secS} id="how-to-use">
                <h2 style={h2S}>How to Use This Calculator</h2>
                <ol style={{ paddingLeft: 24, margin: '0 0 16px', listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Enter net monthly salary:</strong> set take-home monthly income after tax and EPF deductions.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Set down payment savings:</strong> enter liquid cash available for down payment.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Add existing monthly EMIs:</strong> include running car, personal, or credit card EMIs.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Review property budget:</strong> see maximum property price, home loan amount, and bank comparison table.</li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All figures on this page are indicative estimates based on standard bank FOIR assumptions and LTV norms. Actual property loan approval depends on individual bank underwriting policy, property legal verification, and borrower credit checks. This tool is for educational purposes only and does not constitute financial advice. Consult your bank or SEBI-registered financial adviser before committing to property purchases.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .prop-afford-sidebar::-webkit-scrollbar { width: 5px; }
            .prop-afford-sidebar::-webkit-scrollbar-track { background: transparent; }
            .prop-afford-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .prop-afford-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            className="prop-afford-sidebar"
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
              <PropertySnapshot />
              <SidebarList title="Related Calculators" items={POPULAR} />
              <SidebarList title="More Tools" items={MORE} />
              <RelatedReads />
            </div>
          </aside>
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/personal-loan-calculator|Personal Loan', '/calculators/home-loan-calculator|Home Loan', '/calculators/emi-calculator|EMI', '/calculators/sip-calculator|SIP', '/calculators/fd-calculator|FD', '/calculators/gst-calculator|GST'] },
        { hd: 'Topics', links: ['/#|Mutual Funds', '/#|Home Loans', '/#|Fixed Deposits', '/#|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} />
    </div>
  );
}

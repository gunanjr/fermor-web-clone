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

/* ── Math ──────────────────────────────────────────────── */
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

const BANK_RATES = [
  { name: 'Union Bank of India', rate: 7.50, maxFoir: 55, type: 'Public Bank' },
  { name: 'Bank of India', rate: 8.25, maxFoir: 55, type: 'Public Bank' },
  { name: 'Canara Bank', rate: 8.45, maxFoir: 55, type: 'Public Bank' },
  { name: 'Indian Bank', rate: 8.50, maxFoir: 55, type: 'Public Bank' },
  { name: 'SBI', rate: 8.70, maxFoir: 55, type: 'Public Bank' },
  { name: 'Axis Bank', rate: 8.60, maxFoir: 55, type: 'Private Bank' },
  { name: 'ICICI Bank', rate: 8.85, maxFoir: 55, type: 'Private Bank' },
  { name: 'HDFC Bank', rate: 9.00, maxFoir: 55, type: 'Private Bank' },
];

/* ── Slider ────────────────────────────────────────────── */
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
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 36 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 8 : 14 }}>
        {label ? <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400 }}>{label}</label> : <span />}
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
            style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: C.dark, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 18px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 90 : 110, textAlign: 'center', transition: 'border-color 0.15s' }}>
            {display}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 20, height: 20, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 2px 8px rgba(16,18,20,0.22)', pointerEvents: 'none', zIndex: 1 }} />
        <input id={rangeId} type="range" min={min} max={max} step={step} value={value}
          aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
          onChange={e => onChange(+e.target.value)}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontSize: 11, color: C.ink3 }}>{min.toLocaleString('en-IN')}{suffix || ''}</span>
        <span style={{ fontSize: 11, color: C.ink3 }}>{max.toLocaleString('en-IN')}{suffix || ''}</span>
      </div>
    </div>
  );
}

/* ── SidebarList ───────────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <nav aria-label="Related Calculators" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
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
    </nav>
  );
}

/* ── CarLoanSnapshot (white facts box) ───────────────────── */
function CarLoanSnapshot() {
  const rows = [
    { label: 'Typical FOIR cap', value: '45% - 55%' },
    { label: 'Min CIBIL for prime rate', value: '750' },
    { label: 'Max loan-to-value (LTV)', value: '85% - 90%' },
    { label: 'Max tenure (new cars)', value: '7 years' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Car Loan Snapshot</span>
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

/* ── DonutChart ────────────────────────────────────────── */
function DonutChart({ loanAmount, downPayment }: { loanAmount: number; downPayment: number }) {
  const total = loanAmount + downPayment;
  if (total === 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const pArc = (loanAmount / total) * circ;
  const pPct = Math.round((loanAmount / total) * 100);
  return (
    <svg role="img" aria-label={`Affordability split: ${pPct}% loan, ${100 - pPct}% down payment`}
      width="216" height="216" viewBox="0 0 216 216" style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Loan Share</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
  );
}

const POPULAR = [
  { href: '/calculators/car-loan-calculator', label: 'Car Loan EMI Calculator' },
  { href: '/calculators/debt-to-income-ratio-calculator', label: 'Debt-to-Income Ratio Calculator' },
  { href: '/calculators/loan-eligibility-calculator', label: 'Loan Eligibility Calculator' },
  { href: '/calculators/personal-loan-eligibility-calculator', label: 'Personal Loan Eligibility' },
  { href: '/calculators/business-loan-eligibility-calculator', label: 'Business Loan Eligibility' },
  { href: '/calculators/home-loan-eligibility-calculator', label: 'Home Loan Eligibility Calculator' },
  { href: '/calculators/emi-calculator', label: 'EMI Calculator' },
];
const MORE = [
  { href: '/calculators/bike-loan-emi-calculator', label: 'Bike Loan EMI Calculator' },
  { href: '/calculators/loan-amortization-calculator', label: 'Loan Amortization Calculator' },
  { href: '/calculators/loan-prepayment-calculator', label: 'Loan Prepayment Calculator' },
  { href: '/calculators/balance-transfer-savings-calculator', label: 'Balance Transfer Savings' },
  { href: '/calculators/gold-loan-calculator', label: 'Gold Loan Calculator' },
];

/* ── Article styles ────────────────────────────────────── */
const h2S: React.CSSProperties = { fontSize: 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' };
const pS: React.CSSProperties = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' };
const secS: React.CSSProperties = { margin: '0 0 40px' };
const thS: React.CSSProperties = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', verticalAlign: 'middle', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' };
const tdL: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'left', border: `1px solid ${C.border}`, verticalAlign: 'middle' };
const tdR: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, textAlign: 'left', border: `1px solid ${C.border}`, verticalAlign: 'middle' };
const tdC: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'center', border: `1px solid ${C.border}`, verticalAlign: 'middle' };

const FAQS = [
  { q: 'How is car loan eligibility calculated?', a: 'Lenders use the Fixed Obligation to Income Ratio, or FOIR, method. They cap your total monthly debt payments, including the new car EMI and any existing EMIs, at 45% to 55% of net monthly income. Whatever capacity remains is reverse calculated into a maximum loan amount at the chosen interest rate and tenure.' },
  { q: 'What is the car loan eligibility formula?', a: 'Eligible Loan = Available EMI x [1 - (1 + r)^-n] / r, where r is the monthly interest rate and n is the tenure in months. Available EMI is your FOIR-based EMI capacity minus any existing EMIs you already pay.' },
  { q: 'How much car loan can I get on Rs 30,000 salary?', a: 'On a Rs 30,000 monthly salary with no existing EMIs, at 8.75% interest for 5 years and 50% FOIR, the eligible EMI capacity is Rs 15,000 a month, which works out to a maximum car loan of approximately Rs 7.27 lakh.' },
  { q: 'How much car loan can I get on Rs 40,000 salary?', a: 'On a Rs 40,000 monthly salary with no existing EMIs, at 8.75% interest for 5 years and 50% FOIR, the EMI capacity is Rs 20,000 a month, which qualifies for a maximum car loan of approximately Rs 9.69 lakh.' },
  { q: 'How much car loan can I get on Rs 50,000 salary?', a: 'On a Rs 50,000 monthly salary with no existing EMIs, at 8.75% interest for 5 years and 50% FOIR, the EMI capacity is Rs 25,000 a month, which qualifies for a maximum car loan of approximately Rs 12.11 lakh.' },
  { q: 'How does a car loan eligibility calculator based on salary work?', a: "It takes your net monthly salary, applies the bank's FOIR cap (typically 50%), subtracts any existing EMIs, and reverse calculates the loan amount that fits inside the remaining EMI capacity at your chosen interest rate and tenure." },
  { q: 'What is the minimum salary required for a car loan in India?', a: 'Most public and private banks need a net monthly income of Rs 20,000 to Rs 25,000 for salaried applicants, and annual ITR of Rs 3 lakh to Rs 4 lakh for self-employed applicants.' },
  { q: 'How can I check my car loan eligibility online?', a: 'Enter your net monthly income, existing EMIs, preferred tenure, and interest rate into a calculator like this one. It applies the FOIR formula instantly and shows your eligible loan amount, no paperwork or bank visit required at this stage.' },
  { q: 'What CIBIL score is required for a car loan?', a: 'A CIBIL score of 750 or above gets you the lowest interest rates and fastest approval. A score of 650 to 749 still qualifies but at a higher rate, while scores below 650 make approval difficult without a co-applicant.' },
  { q: 'Does existing loan EMI reduce my car loan eligibility?', a: 'Yes. Existing EMIs are subtracted directly from your FOIR-based EMI capacity. If your income supports a Rs 20,000 EMI but you already pay Rs 5,000 toward a personal loan, only the remaining Rs 15,000 counts toward your car loan eligibility.' },
  { q: 'What is the maximum tenure for a car loan in India?', a: 'New car loans typically go up to 7 years, or 84 months. Used car loans are usually capped at 5 years, or tied to the age of the vehicle, whichever comes first.' },
  { q: 'Can self-employed individuals get a car loan?', a: 'Yes. Lenders assess net profit from the last two years of ITR, business bank statement cash flows, and business vintage, and typically apply a slightly tighter FOIR of 45% to 50% than they do for salaried applicants.' },
  { q: 'What is the loan-to-value (LTV) ratio for a car loan?', a: 'For new cars, banks finance 85% to 90% of the on-road price. The remaining 10% to 15% has to come from your own down payment.' },
  { q: 'How does age affect car loan eligibility?', a: 'You need to be at least 21 years old to apply, and the loan tenure must end before you turn 60 if salaried, or 65 if self-employed. A borrower closer to that age ceiling gets offered a shorter tenure, which lowers the eligible loan amount.' },
  { q: 'What is a car loan FOIR calculator?', a: "FOIR stands for Fixed Obligation to Income Ratio. A FOIR calculator applies the bank's debt-to-income cap to your salary and existing EMIs to work out how much more EMI, and therefore how much more loan, you can take on. This calculator applies that same FOIR logic automatically." },
  { q: 'Is used car loan eligibility calculated differently from a new car loan?', a: "The FOIR formula stays the same, but used car loans carry shorter tenures (3 to 5 years), interest rates 2 to 4 percentage points higher, and a lower LTV cap of 70% to 80% of the vehicle's assessed value. All three reduce the eligible loan amount compared to a new car at the same salary." },
  { q: 'How much car loan can I get on Rs 1 lakh salary?', a: 'On a Rs 1,00,000 monthly salary with no existing EMIs, at 8.75% interest for 5 years and 50% FOIR, the EMI capacity is Rs 50,000 a month, which qualifies for a maximum car loan of approximately Rs 24.23 lakh.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account lets you save your results and revisit them later. Fermor is building an automated financial action system on top of the Account Aggregator framework to connect real accounts to real decisions.' },
];

export default function CarLoanEligibilityClient() {
  const defaultSettings = {
    monthlyIncome: 60000,
    existingEmi: 0,
    rate: 8.75,
    tenureYr: 5,
    foir: 50,
    age: 30,
    downPaymentPct: 20,
    employmentType: 'salaried' as 'salaried' | 'self-employed',
    cibilBand: null as string | null,
  };

  const { settings, updateSettings } = useCalculatorSettings('car-loan-eligibility', defaultSettings);
  const { monthlyIncome, existingEmi, rate, tenureYr, foir, age, downPaymentPct, employmentType, cibilBand } = settings;

  const setIncome = (v: number) => updateSettings({ monthlyIncome: v });
  const setExistingEmi = (v: number) => updateSettings({ existingEmi: v });
  const setRate = (v: number) => updateSettings({ rate: v, cibilBand: null });
  const setTenure = (v: number) => updateSettings({ tenureYr: v });
  const setFoir = (v: number) => updateSettings({ foir: v });
  const setAge = (v: number) => {
    const maxTenure = Math.max(1, 60 - v);
    updateSettings({ age: v, tenureYr: Math.min(tenureYr, maxTenure) });
  };
  const setDownPaymentPct = (v: number) => updateSettings({ downPaymentPct: v });
  const setEmploymentType = (v: 'salaried' | 'self-employed') => {
    updateSettings({ employmentType: v, foir: v === 'self-employed' ? 45 : 50 });
  };

  const CIBIL_BANDS = [
    { band: '750+', rate: 8.50 },
    { band: '700-749', rate: 9.15 },
    { band: '650-699', rate: 10.25 },
    { band: '<650', rate: 12.50 },
  ];
  const setCibilBand = (band: string, r: number) => updateSettings({ cibilBand: band, rate: r });

  const [mobile, setMobile] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk();
    window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));

  // Calculations
  const maxEmiCapacity = (monthlyIncome * foir) / 100;
  const availableEmi = Math.max(0, maxEmiCapacity - existingEmi);
  const tenureMo = tenureYr * 12;
  const eligibleLoan = Math.round(calcMaxLoanForEMI(availableEmi, rate, tenureMo));
  const totalInterest = Math.round(calcEMI(eligibleLoan, rate, tenureMo) * tenureMo - eligibleLoan);

  const isDeficit = availableEmi <= 0;
  const maxAffordableCarOnRoad = isDeficit ? 0 : Math.round(eligibleLoan / (1 - downPaymentPct / 100));
  const downPaymentAmount = isDeficit ? 0 : maxAffordableCarOnRoad - eligibleLoan;

  const totalCost = eligibleLoan + totalInterest;


  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Car Loan Eligibility Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Check how much car loan you qualify for based on salary, existing EMIs, and CIBIL score. Compare rates across SBI, HDFC, ICICI, and six other lenders.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>
            {/* ── CALCULATOR CARD ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                {/* Inputs Panel (Colorless) */}
                <div style={{ padding: mobile ? '20px 18px' : '36px 36px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Input Parameters</p>
                    <CurrencySelector theme="light" />
                  </div>

                  {/* Salaried / Self-Employed toggle */}
                  <div style={{ marginBottom: 24 }}>
                    <span style={{ display: 'block', fontSize: 13, color: C.ink2, marginBottom: 8 }}>Employment Profile</span>
                    <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                      {(['salaried', 'self-employed'] as const).map(mode => (
                        <button key={mode} onClick={() => setEmploymentType(mode)}
                          style={{
                            flex: 1, padding: '8px 14px', border: 'none', background: employmentType === mode ? C.white : 'transparent',
                            color: employmentType === mode ? C.ink : C.ink3, fontWeight: employmentType === mode ? 600 : 400,
                            cursor: 'pointer', fontFamily: INTER, fontSize: 13, transition: 'all 0.15s'
                          }}>
                          {mode === 'salaried' ? 'Salaried' : 'Self-employed'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider id="monthly-income" label="Net Monthly Income" value={monthlyIncome} min={20000} max={500000} step={1000}
                        display={fmtIN(monthlyIncome)} onChange={setIncome} compact />

                      <Slider id="existing-emi" label="Existing Monthly EMIs" value={existingEmi} min={0} max={200000} step={500}
                        display={fmtIN(existingEmi)} onChange={setExistingEmi} compact />

                      <Slider id="loan-tenure" label="Loan Tenure" value={tenureYr} min={1} max={7} step={1}
                        display={`${tenureYr} Years`} onChange={setTenure} compact suffix="Y" />

                      {/* Tenure presets */}
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: -8, marginBottom: 20 }}>
                        {[3, 5, 7].map(y => (
                          <button key={y} onClick={() => setTenure(y)}
                            style={{
                              padding: '4px 10px', fontSize: 12, background: C.white,
                              color: tenureYr === y ? C.ink : C.ink3,
                              border: `${tenureYr === y ? 1.5 : 1}px solid ${tenureYr === y ? C.ink : C.border}`,
                              fontWeight: tenureYr === y ? 700 : 500, borderRadius: 6, cursor: 'pointer',
                              fontFamily: INTER, transition: 'all 0.15s'
                            }}>
                            {y}Y
                          </button>
                        ))}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
                        <button onClick={() => setShowAdvanced(true)}
                          style={{ background: 'none', border: 'none', color: C.ink, fontWeight: 700, cursor: 'pointer', fontSize: 13.5, display: 'flex', alignItems: 'center', gap: 6, fontFamily: INTER }}>
                          More settings <span style={{ fontSize: 16 }}>→</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Slider id="interest-rate" label="Interest Rate" value={rate} min={7} max={18} step={0.05}
                        display={`${rate}%`} onChange={setRate} compact suffix="%" />

                      {/* CIBIL presets */}
                      <div style={{ marginBottom: 24 }}>
                        <span style={{ display: 'block', fontSize: 13, color: C.ink2, marginBottom: 8 }}>Or set rate by CIBIL band:</span>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {CIBIL_BANDS.map(b => (
                            <button key={b.band} onClick={() => setCibilBand(b.band, b.rate)}
                              style={{
                                padding: '6px 12px', fontSize: 12, background: C.white,
                                color: cibilBand === b.band ? C.ink : C.ink3,
                                border: `${cibilBand === b.band ? 1.5 : 1}px solid ${cibilBand === b.band ? C.ink : C.border}`,
                                fontWeight: cibilBand === b.band ? 700 : 500, borderRadius: 6, cursor: 'pointer',
                                fontFamily: INTER, transition: 'all 0.15s'
                              }}>
                              {b.band} ({b.rate}%)
                            </button>
                          ))}
                        </div>
                      </div>

                      <Slider id="down-payment-pct" label="Down Payment Percentage" value={downPaymentPct} min={0} max={50} step={5}
                        display={`${downPaymentPct}%`} onChange={setDownPaymentPct} compact suffix="%" />

                      <Slider id="applicant-age" label="Applicant Age" value={age} min={21} max={60} step={1}
                        display={`${age} Years`} onChange={setAge} compact suffix="Y" />

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
                        <button onClick={() => setShowAdvanced(false)}
                          style={{ background: 'none', border: 'none', color: C.ink, fontWeight: 700, cursor: 'pointer', fontSize: 13.5, display: 'flex', alignItems: 'center', gap: 6, fontFamily: INTER }}>
                          <span>←</span> Back
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Outputs Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {isDeficit ? (
                    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.ink3}`, padding: 20, borderRadius: 12, width: '100%' }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: C.ink, marginBottom: 8 }}>EMI Capacity Exceeded</div>
                      <div style={{ color: C.ink2, fontSize: 14, lineHeight: 1.5 }}>
                        Your existing EMIs ({fmtIN(existingEmi)}) exceed your FOIR capacity ({fmtIN(maxEmiCapacity)}). Close an existing loan or improve your income.
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Donut */}
                      <div style={{ order: mobile ? 1 : -1, marginBottom: mobile ? 16 : 20 }}>
                        <DonutChart loanAmount={eligibleLoan} downPayment={downPaymentAmount} />
                      </div>

                      {/* Legend */}
                      <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 20, marginBottom: mobile ? 12 : 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                          <span style={{ fontSize: 13, color: C.ink2 }}>Car Loan</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                          <span style={{ fontSize: 13, color: C.ink2 }}>Down Payment</span>
                        </div>
                      </div>

                      {/* Primary result: Eligible Car Loan */}
                      <div style={{ width: '100%', background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 12, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 700, color: C.dark }}>Eligible Car Loan</span>
                        <span aria-live="polite" style={{ fontSize: mobile ? 20 : 26, fontWeight: 800, color: C.dark, letterSpacing: '-0.02em' }}>
                          {fmtIN(eligibleLoan)}
                        </span>
                      </div>

                      {/* Stat rows */}
                      {[
                        { label: 'Monthly EMI', value: fmtIN(availableEmi) },
                        { label: 'Max Affordable Car (On-Road)', value: fmtIN(maxAffordableCarOnRoad) },
                        { label: 'Down Payment Needed', value: fmtIN(downPaymentAmount) },
                        { label: 'Total Interest Cost', value: fmtIN(totalInterest) },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                        </div>
                      ))}

                      {/* Split bar */}
                      {eligibleLoan + downPaymentAmount > 0 && (
                        <div style={{ width: '100%', marginTop: 16 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                            <span style={{ fontSize: 12, color: C.ink3 }}>Car Loan {Math.round((eligibleLoan / (eligibleLoan + downPaymentAmount)) * 100)}%</span>
                            <span style={{ fontSize: 12, color: C.ink3 }}>Down Payment {100 - Math.round((eligibleLoan / (eligibleLoan + downPaymentAmount)) * 100)}%</span>
                          </div>
                          <div style={{ height: 6, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${Math.round((eligibleLoan / (eligibleLoan + downPaymentAmount)) * 100)}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* ── WaitlistCard ── */}
            <div style={{ marginBottom: 32 }}>
              <SaveResultsCard mobile={mobile} />
            </div>

            

            {/* ── EDUCATIONAL CONTENT ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>
              {/* 1. What Is */}
              <section id="what-is-car-loan-eligibility" style={secS}>
                <h2 style={h2S}>What Is Car Loan Eligibility?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Car loan eligibility is the maximum amount a bank or NBFC is willing to lend you to buy a vehicle. It is a rupee figure, not a percentage or a score.
                  </p>
                </div>
                <p style={pS}>
                  When you apply for auto financing in India, lenders evaluate repayment capacity rather than just the price of the car. They check whether your monthly cash flows can cover the <Link href="/calculators/emi-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>EMI</Link> after every other financial obligation is already accounted for.
                </p>
                <p style={pS}>
                  That check protects the lender from default risk. It also gives you a realistic budget before you walk into a showroom, so you do not fall for a car model that quietly overstretches your monthly finances.
                </p>
              </section>

              {/* 2. Formula */}
              <section id="how-banks-calculate" style={secS}>
                <h2 style={h2S}>Car Loan Eligibility Formula: How Banks Calculate Your Limit</h2>
                <p style={pS}>
                  Lenders rely on the Fixed Obligation to Income Ratio, or FOIR, to calculate vehicle loan eligibility. It limits your total monthly loan obligations so you keep a safety cushion for basic living expenses.
                </p>
                <p style={pS}>
                  The standard FOIR cap for vehicle finance in India runs from 45% to 55% of net monthly income, depending on income tier and employment type. Here is the calculation used to find your available EMI and maximum eligible loan:
                </p>
                <pre style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '16px 20px', borderRadius: 8, fontSize: 13.5, color: C.ink, overflowX: 'auto', marginBottom: 20, fontFamily: 'monospace' }}>
{`// 1. Calculate maximum allowable monthly debt obligations
Max EMI Capacity = Net Monthly Income × FOIR

// 2. Determine available EMI capacity for the new car loan
Available EMI = Max EMI Capacity - Existing Total EMIs

// 3. Compute eligible loan amount (Present Value of Annuity)
Eligible Loan = Available EMI × [1 - (1 + r)^(-n)] / r
where:
r = Monthly interest rate (Annual Rate / 12 / 100)
n = Tenure in months (Years × 12)`}
                </pre>
                <p style={pS}>
                  Take a salaried professional with a net monthly take-home salary of Rs 60,000 and an existing bike loan EMI of Rs 5,000. Assume a bank FOIR limit of 50%, a car loan rate of 8.75%, and a 5-year (60-month) tenure.
                </p>
                <p style={pS}>
                  The Max EMI Capacity works out to Rs 30,000, which is 50% of Rs 60,000. Subtracting the existing Rs 5,000 EMI leaves an available EMI of Rs 25,000. Run through the PV annuity formula for Rs 25,000 at 8.75% over 60 months and the maximum eligible loan comes to approximately Rs 12.11 lakh.
                </p>
              </section>

              {/* 3. Salary Table */}
              <section id="eligibility-by-salary" style={secS}>
                <h2 style={h2S}>Car Loan Eligibility Calculator Based on Salary: Quick Reference Table</h2>
                <p style={pS}>
                  Net monthly income is the primary factor that decides the loan bracket you qualify for. This table shows eligible loan amounts across common salary levels, including Rs 40,000, with no existing EMIs at an illustrative rate of 8.75% p.a. for 5 years:
                </p>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 20 }}>
                  <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, marginTop: 8, textAlign: 'left' }}>
                    Eligible car loan amounts by salary band, calculated at 8.75% rate, 5-year tenure, and 50% FOIR with zero existing debts.
                  </caption>
                  <thead>
                    <tr>
                      <th style={thS} scope="col">Net Monthly Salary</th>
                      <th style={{ ...thS, textAlign: 'right' }} scope="col">Max EMI Capacity (50% FOIR)</th>
                      <th style={{ ...thS, textAlign: 'right' }} scope="col">Eligible Car Loan (5 Years)</th>
                      <th style={{ ...thS, textAlign: 'right' }} scope="col">Approx. Affordable Car Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[20000, 30000, 40000, 50000, 75000, 100000, 150000, 200000].map(sal => {
                      const maxEmi = (sal * 50) / 100;
                      const loan = Math.round(calcMaxLoanForEMI(maxEmi, 8.75, 60));
                      const carPrice = Math.round(loan / 0.8);
                      return (
                        <tr key={sal}>
                          <td style={tdL}>{fmtIN(sal)}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>{fmtIN(maxEmi)}</td>
                          <td style={{ ...tdR, textAlign: 'right' }}>{fmtIN(loan)}</td>
                          <td style={{ ...tdR, textAlign: 'right' }}>{fmtIN(carPrice)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </section>

              {/* In-Content Promo Bar 1 */}
              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Car Loan EMI Calculator</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Already know the loan amount? See the exact monthly EMI and interest breakup.</p>
                </div>
                <Link className="fx-btn" href="/calculators/car-loan-calculator" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
              </div>

              {/* 4. Self-employed */}
              <section id="self-employed-criteria" style={secS}>
                <h2 style={h2S}>Car Loan Eligibility for Self-Employed Applicants</h2>
                <p style={pS}>
                  Lenders check business stability and net income records to verify repayment capacity for self-employed applicants. They compute net monthly equivalent income by averaging net profit from the last 2 to 3 years of Income Tax Returns (ITR).
                </p>
                <p style={pS}>
                  A conservative FOIR of 45% is typical for self-employed applicants, against 50% to 55% for salaried professionals. Business bank statements are also reviewed for average balances and cash flow consistency. If your business also needs financing alongside the personal purchase, the <Link href="/calculators/business-loan-eligibility-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Business Loan Eligibility Calculator</Link> uses the same ITR-based method.
                </p>
              </section>

              {/* 5. Bank Table */}
              <section id="lender-comparison" style={secS}>
                <h2 style={h2S}>Car Loan Eligibility Comparison by Lender</h2>
                <p style={pS}>
                  Each bank sets its own interest rate and FOIR policy. Below is a comparison of published rates and typical FOIR limits across 8 major Indian lenders as of September 2026:
                </p>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 20 }}>
                  <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, marginTop: 8, textAlign: 'left' }}>
                    Interest rates and maximum FOIR parameters for top vehicle finance lenders in India, per lender-published rate cards as of September 2026. Actual rate depends on your credit profile.
                  </caption>
                  <thead>
                    <tr>
                      <th style={thS} scope="col">Lender Name</th>
                      <th style={{ ...thS, textAlign: 'right' }} scope="col">Starting Interest Rate</th>
                      <th style={{ ...thS, textAlign: 'right' }} scope="col">Typical FOIR Cap</th>
                      <th style={thS} scope="col">Lender Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BANK_RATES.map(b => (
                      <tr key={b.name}>
                        <td style={tdL}>{b.name}</td>
                        <td style={{ ...tdL, textAlign: 'right' }}>{b.rate}% p.a.</td>
                        <td style={{ ...tdL, textAlign: 'right' }}>{b.maxFoir}%</td>
                        <td style={tdC}>{b.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              {/* 6. CIBIL Score Impact */}
              <section id="cibil-score-impact" style={secS}>
                <h2 style={h2S}>How CIBIL Score Affects Car Loan Eligibility</h2>
                <p style={pS}>
                  Your CIBIL score is the key metric banks check to evaluate creditworthiness. Lenders offer preferential rates and faster processing to applicants scoring 750 or above.
                </p>
                <p style={pS}>
                  A lower score raises the perceived risk of default, so the bank charges a higher rate markup. A higher rate increases the monthly interest component, which lowers the maximum principal you can borrow for the same EMI capacity.
                </p>
              </section>

              {/* In-Content Promo Bar 2 */}
              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Debt-to-Income Ratio Calculator</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Check your full DTI across every loan you carry, not just this one car EMI.</p>
                </div>
                <Link className="fx-btn" href="/calculators/debt-to-income-ratio-calculator" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
              </div>

              {/* 7. New vs Used */}
              <section id="new-vs-used-car" style={secS}>
                <h2 style={h2S}>New Car vs Used Car Loan Eligibility</h2>
                <p style={pS}>
                  Banks treat new and pre-owned vehicle purchases differently. New car loans offer longer tenures up to 7 years, lower interest rates in the 7.5% to 9.5% band, and higher loan-to-value (LTV) ratios.
                </p>
                <p style={pS}>
                  Used car loans carry more risk since the underlying vehicle depreciates fast. Lenders cap used car loan tenures at 3 to 5 years, charge interest rates 2% to 4% higher, and limit LTV to 70% or 80% of the vehicle's assessed value, all of which lower the eligible loan amount for a used car loan eligibility check versus a new car at the same salary.
                </p>
              </section>

              {/* 8. RBI Guidelines */}
              <section id="rbi-guidelines" style={secS}>
                <h2 style={h2S}>RBI Guidelines on Vehicle Finance</h2>
                <p style={pS}>
                  The Reserve Bank of India (RBI) regulates auto finance limits to ensure banking safety. Under RBI directives, lenders cannot issue 100% on-road financing for all borrowers. Lenders must maintain a risk-aligned loan-to-value (LTV) ratio, requiring a minimum equity down payment of 10% to 15% from the buyer.
                </p>
                <p style={pS}>
                  Lenders are also required to secure the vehicle through hypothecation, registered under the Regional Transport Office (RTO). The hypothecation remains active until the entire loan is paid off and the borrower obtains a No Objection Certificate (NOC) from the bank.
                </p>
              </section>

              {/* 9. Excel Method */}
              <section id="excel-method" style={secS}>
                <h2 style={h2S}>How to Calculate Car Loan Eligibility in Excel</h2>
                <p style={pS}>
                  You can compute your maximum vehicle funding limit in Microsoft Excel using financial functions. The standard formula uses the Present Value (PV) function to reverse-calculate the loan size.
                </p>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 20 }}>
                  <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, marginTop: 8, textAlign: 'left' }}>
                    Excel functions and parameters used to determine eligible auto loan limits.
                  </caption>
                  <thead>
                    <tr>
                      <th style={thS} scope="col">Scenario</th>
                      <th style={thS} scope="col">Excel Formula</th>
                      <th style={thS} scope="col">Parameter Explanation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={tdL}>Calculate Eligible Loan</td>
                      <td style={tdR}><code>=PV(Rate/12, Months, -Available_EMI)</code></td>
                      <td style={tdL}>Returns the maximum loan amount that can be paid off using the monthly EMI capacity.</td>
                    </tr>
                    <tr>
                      <td style={tdL}>Calculate Monthly EMI</td>
                      <td style={tdR}><code>=PMT(Rate/12, Months, -Loan_Amount)</code></td>
                      <td style={tdL}>Computes the exact monthly payment required to clear a specific loan size.</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* 10. Down Payment */}
              <section id="down-payment-affects" style={secS}>
                <h2 style={h2S}>How Down Payment Affects Your Affordability</h2>
                <p style={pS}>
                  The size of your down payment plays a vital role in determining the price tier of the vehicle you can purchase. Contributing a larger down payment reduces the principal loan amount, which reduces your monthly interest costs.
                </p>
                <p style={pS}>
                  A lower loan amount also improves your chances of bank approval, as the lender has lower credit exposure. It can also help you secure a lower interest rate class from competitive private lenders.
                </p>
              </section>

              {/* 11. Common Mistakes */}
              <section id="common-mistakes" style={secS}>
                <h2 style={h2S}>Common Eligibility Mistakes</h2>
                <p style={pS}>
                  Borrowers often make mistakes that lead to loan rejection or reduced funding limits. Here are four common mistakes:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Ignoring Credit Report Errors:</strong> Stale defaults or wrong unpaid statuses on your credit report can ruin your CIBIL score.
                  </li>
                  <li style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Filing Multiple Applications:</strong> Applying to several lenders in a short window triggers multiple hard enquiries, which drags down your credit score. Run the numbers once on a <Link href="/calculators/loan-eligibility-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Loan Eligibility Calculator</Link> before you apply anywhere.
                  </li>
                  <li style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Underestimating On-Road Costs:</strong> Auto insurance, RTO road tax, and dealer handling charges add 10% to 20% to the ex-showroom price.
                  </li>
                  <li style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Maintaining High Short-Term Debt:</strong> Carrying active balances on credit cards reduces your available EMI capacity.
                  </li>
                </ul>
              </section>

              {/* 12. How to Improve */}
              <section id="how-to-improve" style={secS}>
                <h2 style={h2S}>How to Improve Your Car Loan Eligibility</h2>
                <p style={pS}>
                  If your eligible limit falls short of the car model you want, you can take steps to improve your capacity. Consider adding a joint applicant, such as a working spouse or parent, to combine incomes and raise the combined FOIR cap.
                </p>
                <p style={pS}>
                  Paying off credit cards or a short-term <Link href="/calculators/personal-loan-eligibility-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>personal loan</Link> also frees up monthly cash flow. Opting for a longer tenure, such as 7 years, cuts the monthly EMI requirement and helps you qualify for a higher loan principal.
                </p>
              </section>

              {/* 13. How to Use */}
              <section id="how-to-use" style={secS}>
                <h2 style={h2S}>How to Use This Car Loan Eligibility Calculator</h2>
                <p style={pS}>
                  This tool calculates your maximum auto financing limit and helps you select an affordable budget. Follow these steps:
                </p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Provide Income Details:</strong> Select your profile (Salaried or Self-Employed) and input your Net Monthly Income.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Add Active Debts:</strong> Enter any current monthly EMI payments in the Existing Monthly EMIs field.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set Tenure and Rate:</strong> Adjust the tenure slider and target interest rate, or choose a CIBIL score band to apply rate presets.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Review affordable levels:</strong> Check the max loan size, required down payment, and affordable on-road vehicle price.
                  </li>
                </ol>
              </section>

              

              {/* 14. FAQ Accordion */}
              <section id="faq" style={secS}>
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQBox items={FAQS} />
              </section>

              {/* 15. Disclaimer */}
              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All calculations on this page are indicative only. Auto loan eligibility is a mathematical estimate based on policy caps and does not guarantee sanction. Actual loan approvals are subject to credit profile audits, valuation of the vehicle, and policies of the respective lenders. Fermor is not a lender and does not issue credit. Consult a SEBI-registered advisor before planning financial liabilities.
                </p>
              </div>
            </article>
          </div>

          {/* Sticky Sidebar */}
          <aside className="car-elig-sidebar" style={{
            position: mobile ? 'static' : 'sticky',
            top: 20,
            alignSelf: 'start',
            maxHeight: mobile ? 'none' : 'calc(100vh - 40px)',
            overflowY: mobile ? 'visible' : 'auto',
            paddingRight: mobile ? 0 : 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            scrollbarWidth: 'thin',
            scrollbarColor: '#C4C9C4 transparent',
          } as React.CSSProperties}>
            <style>{`
              .car-elig-sidebar::-webkit-scrollbar { width: 5px; }
              .car-elig-sidebar::-webkit-scrollbar-track { background: transparent; }
              .car-elig-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
              .car-elig-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
            `}</style>

            <div style={{ flexShrink: 0 }}>
              <CarLoanSnapshot />
            </div>

            <div style={{ flexShrink: 0 }}>
              <SidebarList title="Popular Calculators" items={POPULAR} />
            </div>

            <div style={{ flexShrink: 0 }}>
              <SidebarList title="More Calculators" items={MORE} />
            </div>
          </aside>
        </div>
      </div>
      <SiteFooter columns={pipeColumns([
          {
            hd: 'Calculators',
            links: [
              '/calculators/car-loan-calculator|Car Loan EMI',
              '/calculators/car-insurance-calculator|Car Insurance',
              '/calculators/bike-loan-emi-calculator|Bike Loan EMI',
              '/calculators/personal-loan-calculator|Personal Loan',
              '/calculators/emi-calculator|EMI',
            ],
          },
          { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
        ])} />
    </div>
  );
}

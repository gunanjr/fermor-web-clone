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

const LENDER_DATA = [
  { name: 'SBI', rate: 8.15, maxNonCollateral: 'Rs 7.5 Lakh', type: 'Public Bank' },
  { name: 'Bank of Baroda', rate: 8.40, maxNonCollateral: 'Rs 7.5 Lakh', type: 'Public Bank' },
  { name: 'Canara Bank', rate: 8.50, maxNonCollateral: 'Rs 7.5 Lakh', type: 'Public Bank' },
  { name: 'PNB', rate: 8.55, maxNonCollateral: 'Rs 7.5 Lakh', type: 'Public Bank' },
  { name: 'Central Bank', rate: 8.50, maxNonCollateral: 'Rs 7.5 Lakh', type: 'Public Bank' },
  { name: 'HDFC Credila', rate: 9.50, maxNonCollateral: 'Rs 20 Lakh', type: 'NBFC' },
  { name: 'Avanse', rate: 10.50, maxNonCollateral: 'Rs 20 Lakh', type: 'NBFC' },
  { name: 'InCred', rate: 11.75, maxNonCollateral: 'Rs 15 Lakh', type: 'NBFC' },
  { name: 'Prodigy Finance', rate: 9.50, maxNonCollateral: 'Rs 40 Lakh', type: 'Foreign NBFC' },
  { name: 'MPOWER Financing', rate: 12.99, maxNonCollateral: 'Rs 35 Lakh', type: 'Foreign NBFC' },
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

/* ── EducationLoanSnapshot (white facts box) ────────────── */
function EducationLoanSnapshot() {
  const rows = [
    { label: 'Collateral-free Limit (RBI)', value: 'Rs 7.5 Lakh' },
    { label: 'Moratorium Period', value: 'Course + 1 Year' },
    { label: 'Repayment Tenure', value: 'Up to 15 Years' },
    { label: 'CSIS Subsidy Limit (EWS)', value: 'Family Income < 4.5L' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Education Loan Snapshot</span>
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
function DonutChart({ eligibleLoan, fundingGap }: { eligibleLoan: number; fundingGap: number }) {
  const total = eligibleLoan + fundingGap;
  if (total === 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const pArc = (eligibleLoan / total) * circ;
  const pPct = Math.round((eligibleLoan / total) * 100);
  return (
    <svg role="img" aria-label={`Funding split: ${pPct}% eligible loan, ${100 - pPct}% funding gap`}
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

const POPULAR_LINKS = [
  { href: '/calculators/emi-calculator', label: 'EMI Calculator' },
  { href: '/calculators/education-loan-emi-calculator', label: 'Education Loan EMI Calculator' },
  { href: '/calculators/home-loan-eligibility-calculator', label: 'Home Loan Eligibility Calculator' },
  { href: '/calculators/sip-calculator', label: 'SIP Calculator' },
  { href: '/calculators/cagr-calculator', label: 'CAGR Calculator' },
  { href: '/calculators/income-tax-calculator', label: 'Income Tax Calculator' },
  { href: '/calculators/loan-eligibility-calculator', label: 'Loan Eligibility Calculator' },
];
const MORE_LINKS = [
  { href: '/calculators/personal-loan-eligibility-calculator', label: 'Personal Loan Eligibility' },
  { href: '/calculators/car-loan-eligibility-calculator', label: 'Car Loan Eligibility Calculator' },
  { href: '/calculators/business-loan-eligibility-calculator', label: 'Business Loan Eligibility' },
  { href: '/calculators/fd-calculator', label: 'FD Calculator' },
  { href: '/calculators/ppf-calculator', label: 'PPF Calculator' },
];

const FAQS = [
  { q: 'How is education loan eligibility calculated?', a: 'Education loan eligibility is calculated based on three primary factors: the total course cost (fees and living expenses), the co-applicant\'s repayment capacity (monthly income and existing debts using the FOIR method), and whether collateral is offered. For loans above Rs 7.5 lakh, banks typically require collateral like property, fixed deposits, or liquid securities.' },
  { q: 'What is the limit for an education loan without collateral in India?', a: 'Under Indian Banks\' Association (IBA) guidelines, education loans up to Rs 7.5 lakh do not require collateral or a third-party guarantee, and are backed by the Credit Guarantee Fund Scheme for Education Loans (CGFSEL). Lenders may extend higher non-collateral limits (up to Rs 20 lakh to Rs 40 lakh) for premier institutions like IITs, IIMs, or top global universities.' },
  { q: 'Who can be a co-applicant for an education loan?', a: 'A co-applicant (or co-borrower) must be a close relative who has a stable income source. Eligible co-applicants include parents, siblings, spouse, or parent-in-law. The lender evaluates their monthly salary or business income to check repayment capability.' },
  { q: 'How does the moratorium period work for education loans?', a: 'The moratorium period (or repayment holiday) spans the course duration plus an additional 6 months to 1 year, during which the student is not required to pay EMIs. However, simple interest is charged by the bank during this period and added to the principal before regular monthly EMIs begin.' },
  { q: 'What interest rates apply to education loans in India?', a: 'Education loan interest rates generally range from 8.0% to 13.0% p.a. depending on the institution, course location, co-applicant\'s CIBIL score, and collateral provided. Public sector banks like SBI usually offer rates near 8.15% to 9.5%, while NBFCs range from 10.5% to 13%.' },
  { q: 'Is there any interest subsidy scheme for education loans?', a: 'Yes. The Central Sector Interest Subsidy Scheme (CSIS) offers full interest subsidies during the moratorium period for students from Economically Weaker Sections (EWS) with annual family income up to Rs 4.5 lakh, pursuing professional or technical courses in India.' },
  { q: 'What expenses are covered under a study loan?', a: 'Education loans cover tuition fees, hostel or accommodation rent, exam fees, laboratory fees, cost of books/equipment, travel expenses for study abroad, and purchase of a computer required for the course.' },
  { q: 'What is the maximum repayment tenure for education loans?', a: 'Per IBA norms, the maximum repayment tenure after the moratorium period ends is up to 15 years, regardless of the loan amount.' },
  { q: 'Can I get an education loan for studying abroad?', a: 'Yes. Lenders fund up to Rs 1.5 crore or more for studies abroad, covering tuition fees and international living costs. Secured options are preferred, but non-collateral products exist for top-tier global universities.' },
  { q: 'What is Vidya Lakshmi portal?', a: 'Vidya Lakshmi is a single-window portal developed by the Ministry of Finance and NSDL, enabling students to view, compare, and apply for education loans across multiple banks with a single Common Education Loan Application Form (CELAF).' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts.' },
];

/* ── Article styles ────────────────────────────────────── */
const h2S: React.CSSProperties = { fontSize: 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' };
const pS: React.CSSProperties = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' };
const secS: React.CSSProperties = { margin: '0 0 40px' };
const thS: React.CSSProperties = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', verticalAlign: 'middle', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' };
const tdL: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'left', border: `1px solid ${C.border}`, verticalAlign: 'middle' };
const tdR: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, textAlign: 'left', border: `1px solid ${C.border}`, verticalAlign: 'middle' };
const tdC: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'center', border: `1px solid ${C.border}`, verticalAlign: 'middle' };

export default function EducationLoanEligibilityClient() {
  const defaultSettings = {
    location: 'domestic' as 'domestic' | 'abroad',
    courseFee: 1500000,
    durationYr: 4,
    coIncome: 80000,
    coExistingEmi: 0,
    rate: 8.5,
    cibilBand: null as string | null,
    moratoriumMo: 54, // 4yr course (48mo) + 6mo
    hasCollateral: false,
  };

  const { settings, updateSettings } = useCalculatorSettings('education-loan-eligibility', defaultSettings);
  const { location, courseFee, durationYr, coIncome, coExistingEmi, rate, cibilBand, moratoriumMo, hasCollateral } = settings;

  const setLocation = (v: 'domestic' | 'abroad') => {
    updateSettings({ location: v, rate: v === 'abroad' ? 10.5 : 8.5 });
  };
  const setCourseFee = (v: number) => updateSettings({ courseFee: v });
  const setDurationYr = (v: number) => {
    updateSettings({ durationYr: v, moratoriumMo: v * 12 + 6 });
  };
  const setCoIncome = (v: number) => updateSettings({ coIncome: v });
  const setCoExistingEmi = (v: number) => updateSettings({ coExistingEmi: v });
  const setRate = (v: number) => updateSettings({ rate: v, cibilBand: null });
  const setMoratoriumMo = (v: number) => updateSettings({ moratoriumMo: v });
  const setHasCollateral = (v: boolean) => updateSettings({ hasCollateral: v });

  const CIBIL_BANDS = [
    { band: '750+', rate: 8.20 },
    { band: '700-749', rate: 8.70 },
    { band: '650-699', rate: 9.95 },
    { band: '<650', rate: 11.50 },
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
  // Co-applicant capacity determines max EMI bank will accept post-course
  const foir = 50; // typical 50% FOIR cap
  const maxEmiCapacity = (coIncome * foir) / 100;
  const availableEmi = Math.max(0, maxEmiCapacity - coExistingEmi);
  const isDeficit = maxEmiCapacity <= coExistingEmi;

  // Education loans typically have a 15 year repayment tenure (180 months)
  const repaymentMonths = 180;
  const theoreticalLoanCap = Math.round(calcMaxLoanForEMI(availableEmi, rate, repaymentMonths));

  // Regulatory collateral cap (RBI norms)
  // Up to Rs 7.5L domestic, up to Rs 20L abroad without collateral.
  // Above that requires collateral. If hasCollateral is false, we cap the eligible loan.
  const maxCollateralFree = location === 'abroad' ? 2000000 : 750000;
  const rawEligibleLoan = Math.min(courseFee, theoreticalLoanCap);
  const eligibleLoan = hasCollateral ? rawEligibleLoan : Math.min(rawEligibleLoan, maxCollateralFree);

  // Interest during moratorium period (simple interest)
  const moratoriumYr = moratoriumMo / 12;
  const moratoriumInterest = Math.round(eligibleLoan * (rate / 100) * moratoriumYr);
  const totalLoanRepaymentStart = eligibleLoan + moratoriumInterest;

  const finalMonthlyEmi = Math.round(calcEMI(totalLoanRepaymentStart, rate, repaymentMonths));
  const totalInterestRepayment = Math.round(finalMonthlyEmi * repaymentMonths - totalLoanRepaymentStart);
  const totalCost = totalLoanRepaymentStart + totalInterestRepayment;

  const fundingGap = Math.max(0, courseFee - eligibleLoan);

  // Check if co-applicant capacity is capped by lack of collateral
  const isCappedByCollateral = !hasCollateral && theoreticalLoanCap > maxCollateralFree && courseFee > maxCollateralFree;


  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Education Loan Eligibility Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Estimate your study loan limit, moratorium interest, and post-study EMI for courses in India or abroad.
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
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Course & Co-applicant</p>
                    <CurrencySelector theme="light" />
                  </div>

                  {/* Location toggle */}
                  <div style={{ marginBottom: 24 }}>
                    <span style={{ display: 'block', fontSize: 13, color: C.ink2, marginBottom: 8 }}>Course Destination</span>
                    <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                      {(['domestic', 'abroad'] as const).map(mode => (
                        <button key={mode} onClick={() => setLocation(mode)}
                          style={{
                            flex: 1, padding: '8px 14px', border: 'none', background: location === mode ? C.white : 'transparent',
                            color: location === mode ? C.ink : C.ink3, fontWeight: location === mode ? 600 : 400,
                            cursor: 'pointer', fontFamily: INTER, fontSize: 13, transition: 'all 0.15s'
                          }}>
                          {mode === 'domestic' ? 'India' : 'Abroad'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider id="course-fee" label="Total Course Cost" value={courseFee} min={100000} max={5000000} step={50000}
                        display={fmtIN(courseFee)} onChange={setCourseFee} compact />

                      <Slider id="course-duration" label="Course Duration" value={durationYr} min={1} max={6} step={1}
                        display={`${durationYr} Years`} onChange={setDurationYr} compact suffix="Y" />

                      <Slider id="co-income" label="Co-applicant Net Salary" value={coIncome} min={20000} max={500000} step={1000}
                        display={fmtIN(coIncome)} onChange={setCoIncome} compact />

                      {/* Collateral Toggle */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, border: `1px solid ${C.border}`, padding: '10px 14px', borderRadius: 8, overflow: 'hidden' }}>
                        <span style={{ fontSize: 13, fontWeight: 400, color: C.ink2 }}>Providing Collateral? (Property/FD)</span>
                        <button onClick={() => setHasCollateral(!hasCollateral)}
                          aria-pressed={hasCollateral}
                          style={{ width: 40, height: 22, borderRadius: 11, background: hasCollateral ? C.ink : C.border, border: 'none', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
                          <div style={{ width: 18, height: 18, borderRadius: 9, background: C.white, position: 'absolute', top: 2, left: hasCollateral ? 20 : 2, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                        </button>
                      </div>

                      {/* Collateral Warning strip */}
                      {isCappedByCollateral && (
                        <div style={{ background: '#FFF4E5', border: '1px solid #FFD8A8', borderRadius: 8, padding: '10px 14px', marginBottom: 20 }}>
                          <span style={{ fontSize: 12.5, color: '#A15C00', fontWeight: 600, display: 'block', lineHeight: 1.5 }}>
                            Notice: Your loan is capped at {fmtIN(maxCollateralFree)} because you selected No Collateral. Turn on the collateral toggle to unlock your full eligible limit of {fmtIN(theoreticalLoanCap)}.
                          </span>
                        </div>
                      )}

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
                        <button onClick={() => setShowAdvanced(true)}
                          style={{ background: 'none', border: 'none', color: C.ink, fontWeight: 700, cursor: 'pointer', fontSize: 13.5, display: 'flex', alignItems: 'center', gap: 6, fontFamily: INTER }}>
                          Advanced Settings <span style={{ fontSize: 16 }}>→</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Slider id="co-existing-emi" label="Co-applicant Existing EMIs" value={coExistingEmi} min={0} max={200000} step={500}
                        display={fmtIN(coExistingEmi)} onChange={setCoExistingEmi} compact />

                      <Slider id="interest-rate" label="Interest Rate" value={rate} min={6} max={16} step={0.05}
                        display={`${rate}%`} onChange={setRate} compact suffix="%" />

                      {/* CIBIL presets */}
                      <div style={{ marginBottom: 24 }}>
                        <span style={{ display: 'block', fontSize: 13, color: C.ink2, marginBottom: 8 }}>Co-applicant CIBIL score band:</span>
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

                      <Slider id="moratorium-period" label="Total Moratorium Period" value={moratoriumMo} min={1} max={84} step={1}
                        display={`${moratoriumMo} Months`} onChange={setMoratoriumMo} compact suffix="Mo" />

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
                        <button onClick={() => setShowAdvanced(false)}
                          style={{ background: 'none', border: 'none', color: C.ink, fontWeight: 700, cursor: 'pointer', fontSize: 13.5, display: 'flex', alignItems: 'center', gap: 6, fontFamily: INTER }}>
                          <span>←</span> Basic Settings
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Outputs Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {isDeficit ? (
                    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.ink3}`, padding: 20, borderRadius: 12, width: '100%' }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: C.ink, marginBottom: 8 }}>Repayment Capacity Exceeded</div>
                      <div style={{ color: C.ink2, fontSize: 14, lineHeight: 1.5 }}>
                        Your co-applicant&apos;s existing EMIs ({fmtIN(coExistingEmi)}) exceed their capacity ({fmtIN(maxEmiCapacity)}). Try adding a co-applicant with higher income or reducing existing debts.
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Donut */}
                      <div style={{ order: mobile ? 1 : -1, marginBottom: mobile ? 16 : 20 }}>
                        <DonutChart eligibleLoan={eligibleLoan} fundingGap={fundingGap} />
                      </div>

                      {/* Legend */}
                      <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 20, marginBottom: mobile ? 12 : 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                          <span style={{ fontSize: 13, color: C.ink2 }}>Eligible Loan</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                          <span style={{ fontSize: 13, color: C.ink2 }}>Funding Gap</span>
                        </div>
                      </div>

                      {/* Primary result: Max Eligible Loan */}
                      <div style={{ width: '100%', background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 12, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 700, color: C.dark }}>Max Eligible Loan</span>
                        <span aria-live="polite" style={{ fontSize: mobile ? 20 : 26, fontWeight: 800, color: C.dark, letterSpacing: '-0.02em' }}>
                          {fmtIN(eligibleLoan)}
                        </span>
                      </div>

                      {/* Stat rows */}
                      {[
                        { label: 'Accrued Moratorium Interest', value: fmtIN(moratoriumInterest) },
                        { label: 'Repayment Balance (Start)', value: fmtIN(totalLoanRepaymentStart) },
                        { label: 'Post-Study Monthly EMI', value: fmtIN(finalMonthlyEmi) },
                        { label: 'Personal Funding Gap', value: fmtIN(fundingGap) },
                        { label: 'Total Post-Study Interest', value: fmtIN(totalInterestRepayment) },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                        </div>
                      ))}

                      {/* Split bar */}
                      {eligibleLoan + fundingGap > 0 && (
                        <div style={{ width: '100%', marginTop: 16 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                            <span style={{ fontSize: 12, color: C.ink3 }}>Eligible Loan {Math.round((eligibleLoan / (eligibleLoan + fundingGap)) * 100)}%</span>
                            <span style={{ fontSize: 12, color: C.ink3 }}>Funding Gap {100 - Math.round((eligibleLoan / (eligibleLoan + fundingGap)) * 100)}%</span>
                          </div>
                          <div style={{ height: 6, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${Math.round((eligibleLoan / (eligibleLoan + fundingGap)) * 100)}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
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
              <section id="what-is-education-loan-eligibility" style={secS}>
                <h2 style={h2S}>What Is Education Loan Eligibility?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Education loan eligibility is the maximum loan limit that commercial banks or financial companies will approve to fund a student's academic course. It is expressed in absolute currency terms.
                  </p>
                </div>
                <p style={pS}>
                  Unlike business or home loans, education loan check parameters do not rely solely on the student's current earning history. Lenders evaluate the future income potential of the student based on their chosen field of study, alongside the present salary of the co-applicant.
                </p>
                <p style={pS}>
                  Repayment capabilities are audited to prevent post-study defaults, which helps families verify if the academic degree provides a viable return on investment. The calculator performs this checking process automatically using key regulatory caps.
                </p>
              </section>

              {/* 2. Criteria */}
              <section id="eligibility-criteria" style={secS}>
                <h2 style={h2S}>Education Loan Eligibility Criteria in India</h2>
                <p style={pS}>
                  Lenders apply clear criteria to screen candidates applying for academic financing. For a student to secure approval, both the academic candidate and the co-borrower must satisfy specific requirements:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Nationality:</strong> The student must be an Indian citizen or a Non-Resident Indian (NRI).
                  </li>
                  <li style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Academic Admission:</strong> Secure admission to a recognized college or university in India or abroad through entrance exams or merit lists.
                  </li>
                  <li style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Co-borrower Profile:</strong> A co-applicant must have a steady income source (salaried or self-employed) and a clean credit profile.
                  </li>
                </ul>
              </section>

              {/* 3. How Banks Decide */}
              <section id="how-banks-decide" style={secS}>
                <h2 style={h2S}>How Banks Decide Education Loan Limits</h2>
                <p style={pS}>
                  Banks evaluate education loan applications using a mix of asset backing, course credentials, and co-applicant cash flows. The math leverages the Fixed Obligation to Income Ratio (FOIR) of the parent:
                </p>
                <pre style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '16px 20px', borderRadius: 8, fontSize: 13.5, color: C.ink, overflowX: 'auto', marginBottom: 20, fontFamily: 'monospace' }}>
{`// 1. Calculate parent's monthly payment room
Available EMI = (Co-applicant Income × FOIR%) - Co-applicant Existing EMIs

// 2. Assess maximum principal limit based on 15-year repayment schedule
Theoretical Principal = Available EMI × [1 - (1 + r)^(-180)] / r

// 3. Apply collateral caps:
// Non-collateral caps typically Rs 7.5L (India) or Rs 20L (Abroad)`}
                </pre>
                <p style={pS}>
                  If the parent earns Rs 80,000 monthly with no debts, at a 50% FOIR, their available capacity is Rs 40,000. At an 8.5% rate, this supports a repayment principal of approximately Rs 40.6 lakh. However, if no collateral is offered, the loan remains capped at Rs 7.5 lakh (India) or Rs 20 lakh (Abroad).
                </p>
              </section>

              {/* 4. Fee Table */}
              <section id="eligibility-by-fee" style={secS}>
                <h2 style={h2S}>Education Loan Eligibility by Fee</h2>
                <p style={pS}>
                  The total course fee structure dictates the borrowing requirements. The table below illustrates the maximum loan limits, moratorium interest, and resulting post-moratorium monthly EMIs across different course cost bands (assuming no collateral, at an 8.5% rate and a 4-year course duration):
                </p>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 20 }}>
                  <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, marginTop: 8, textAlign: 'left' }}>
                    Eligible non-collateral loan limits and moratorium interest by total course cost (domestic India limits).
                  </caption>
                  <thead>
                    <tr>
                      <th style={thS} scope="col">Total Course Cost</th>
                      <th style={{ ...thS, textAlign: 'right' }} scope="col">Eligible Loan (Capped)</th>
                      <th style={{ ...thS, textAlign: 'right' }} scope="col">Moratorium Interest (4.5Y)</th>
                      <th style={{ ...thS, textAlign: 'right' }} scope="col">Post-Study Monthly EMI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[500000, 750000, 1000000, 1500000, 2000000, 3000000].map(fee => {
                      const loan = Math.min(fee, 750000);
                      const morInterest = Math.round(loan * 0.085 * 4.5);
                      const totalStart = loan + morInterest;
                      const emi = Math.round(calcEMI(totalStart, 8.5, 180));
                      return (
                        <tr key={fee}>
                          <td style={tdL}>{fmtIN(fee)}</td>
                          <td style={{ ...tdR, textAlign: 'right' }}>{fmtIN(loan)}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>{fmtIN(morInterest)}</td>
                          <td style={{ ...tdR, textAlign: 'right' }}>{fmtIN(emi)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </section>

              {/* 5. Lender Comparison */}
              <section id="lender-rates-comparison" style={secS}>
                <h2 style={h2S}>Education Loan Eligibility by Bank: Rate and Limit Comparison</h2>
                <p style={pS}>
                  Interest rates vary significantly between public sector banks, private banks, and specialized NBFCs. Below is a comparison table showing standard rates and non-collateral guidelines for 10 leading lenders:
                </p>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 20 }}>
                  <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, marginTop: 8, textAlign: 'left' }}>
                    Education loan interest rates and non-collateral limits across key Indian lenders.
                  </caption>
                  <thead>
                    <tr>
                      <th style={thS} scope="col">Lender Name</th>
                      <th style={{ ...thS, textAlign: 'right' }} scope="col">Base Interest Rate</th>
                      <th style={{ ...thS, textAlign: 'right' }} scope="col">Non-Collateral Limit</th>
                      <th style={thS} scope="col">Lender Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {LENDER_DATA.map(l => (
                      <tr key={l.name}>
                        <td style={tdL}>{l.name}</td>
                        <td style={{ ...tdL, textAlign: 'right' }}>{l.rate}% p.a.</td>
                        <td style={{ ...tdL, textAlign: 'right' }}>{l.maxNonCollateral}</td>
                        <td style={tdC}>{l.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              {/* 6. SBI Scholar Loan */}
              <section id="sbi-scholar-loan" style={secS}>
                <h2 style={h2S}>SBI Education Loan: Vidya Lakshmi and Scholar Loan</h2>
                <p style={pS}>
                  State Bank of India (SBI) is a primary provider of student finance. Under its SBI Scholar Loan program, SBI offers collateral-free loans up to Rs 40 lakh for students securing admission to premier institutions like IIMs, IITs, and BITS Pilani.
                </p>
                <p style={pS}>
                  For regular colleges, students apply through the Vidya Lakshmi portal under the CELAF guidelines. SBI applies simple interest during the moratorium and offers a maximum repayment tenure of 15 years.
                </p>
              </section>

              {/* 7. Study Abroad */}
              <section id="studying-abroad-eligibility" style={secS}>
                <h2 style={h2S}>Education Loan for Studying Abroad</h2>
                <p style={pS}>
                  Securing finance for study abroad requires checking foreign living cost components. Lenders evaluate the tuition fee and the currency conversion rate for the destination country (such as the US, UK, Canada, or Germany).
                </p>
                <p style={pS}>
                  Private lenders and NBFCs offer non-collateral loans up to Rs 40 lakh for selected global universities based on co-applicant incomes. However, secured options remain the primary channel to obtain funding limits above Rs 50 lakh.
                </p>
              </section>

              {/* 8. Collateral vs Non-collateral */}
              <section id="collateral-vs-non-collateral" style={secS}>
                <h2 style={h2S}>Collateral vs Non-Collateral Education Loans</h2>
                <p style={pS}>
                  The presence of collateral shifts the interest rate and borrowing limit class of the loan. Non-collateral loans are unsecured, carrying higher rates and strict limit caps based on the institution rating.
                </p>
                <p style={pS}>
                  Secured loans require pledging tangibles like residential properties, commercial offices, land plots, or liquid assets (like FDs or insurance policies). Pledging assets unlocks rates that are 1.5% to 3% lower and enables limits exceeding Rs 1 crore.
                </p>
              </section>

              {/* 9. CSIS Scheme */}
              <section id="csis-scheme" style={secS}>
                <h2 style={h2S}>Central Government Interest Subsidy Scheme (CSIS)</h2>
                <p style={pS}>
                  The Government of India supports EWS students through the CSIS subsidy. Under Ministry of Education guidelines, the scheme covers the interest accrued during the course and moratorium periods.
                </p>
                <p style={pS}>
                  To qualify, the student\'s annual parental income must be less than Rs 4.5 lakh. The student must pursue professional or technical degrees in India from recognized institutions.
                </p>
              </section>

              {/* 10. Excel Formula */}
              <section id="excel-formula" style={secS}>
                <h2 style={h2S}>Education Loan Eligibility in Excel</h2>
                <p style={pS}>
                  You can build a basic education loan projection in Excel using standard formulas to check the moratorium interest buildup.
                </p>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 20 }}>
                  <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, marginTop: 8, textAlign: 'left' }}>
                    Excel methods for education loan moratorium and repayment tracking.
                  </caption>
                  <thead>
                    <tr>
                      <th style={thS} scope="col">Calculation Type</th>
                      <th style={thS} scope="col">Excel Formula</th>
                      <th style={thS} scope="col">Usage Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={tdL}>Moratorium Interest</td>
                      <td style={tdR}><code>=Loan_Amount * Rate * (Moratorium_Months / 12)</code></td>
                      <td style={tdL}>Computes the simple interest accumulated during study and grace periods.</td>
                    </tr>
                    <tr>
                      <td style={tdL}>Post-Moratorium EMI</td>
                      <td style={tdR}><code>=PMT(Rate/12, 180, -(Loan_Amount + Mor_Interest))</code></td>
                      <td style={tdL}>Calculates monthly EMI over 15 years using the compounded loan balance.</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* 11. Moratorium mechanics */}
              <section id="moratorium-mechanics" style={secS}>
                <h2 style={h2S}>Education Loan Moratorium Period: How It Works</h2>
                <p style={pS}>
                  The moratorium period is a structured grace phase designed to let students focus on studies and job placement. It begins on the first day of the course and extends until 6 months or 1 year after graduation.
                </p>
                <p style={pS}>
                  While borrowers are not forced to pay EMIs, banks still accumulate interest on the disbursed loan balance. This accrued interest is added to the principal at the end of the moratorium, increasing the net loan balance on which monthly EMIs are calculated.
                </p>
              </section>

              {/* 12. Documents Checklist */}
              <section id="documents-checklist" style={secS}>
                <h2 style={h2S}>Documents Required for Education Loan</h2>
                <p style={pS}>
                  Applying for vehicle or education finance requires submitting academic, identity, and income proofs. Here is a checklist of necessary documents:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Academic Proofs:</strong> College admission letter, fee structure certificate, SSC, HSC, and graduation marksheets.
                  </li>
                  <li style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>KYC Documents:</strong> PAN card, Aadhaar card, and passport-size photographs of the student and co-applicant.
                  </li>
                  <li style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Co-borrower Income Proof:</strong> Last 3 months of salary slips, 2 years of Form 16, and 6 months of bank statement showing salary credits.
                  </li>
                </ul>
              </section>

              {/* 13. How to Improve */}
              <section id="how-to-improve-eligibility" style={secS}>
                <h2 style={h2S}>How to Improve Education Loan Eligibility</h2>
                <p style={pS}>
                  If your co-applicant\'s income is insufficient to cover the entire course fee, you can enhance eligibility. Consider adding a secondary co-applicant, such as an earning sibling, to raise the combined FOIR.
                </p>
                <p style={pS}>
                  Choosing top-rated universities or courses (such as STEM fields) also reduces risk, prompting banks to approve higher unsecured limits. Pledging a small fixed deposit or mutual fund portfolio as partial collateral can also lower rates and raise loan caps.
                </p>
              </section>

              {/* 14. How to Use */}
              <section id="how-to-use" style={secS}>
                <h2 style={h2S}>How to Use This Calculator</h2>
                <p style={pS}>
                  This tool estimates your educational funding limits and helps you calculate post-study EMIs. Follow these steps:
                </p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select Destination:</strong> Toggle between India and Abroad to adjust target rate defaults and non-collateral limits.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Course Details:</strong> Provide the total course cost and duration.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Provide Co-applicant Income:</strong> Input the co-borrower\'s net monthly salary and active loan EMIs.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Indicate Collateral Status:</strong> Toggle the collateral indicator to see how it affects your eligible loan cap.
                  </li>
                </ol>
              </section>

              

              {/* FAQ Section */}
              <section id="faq" style={secS}>
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQBox items={FAQS} />
              </section>

              {/* 15. Disclaimer */}
              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All calculations on this page are indicative only. Education loan eligibility is a mathematical estimate based on credit profiling and course credentials, and does not guarantee sanction. Actual loan approvals are subject to credit profile audits, co-applicant documentation, and policies of the respective lenders. Fermor is not a lender and does not issue credit. Consult a SEBI-registered advisor before planning financial liabilities.
                </p>
              </div>
            </article>
          </div>

          {/* Sticky Sidebar */}
          <aside className="edu-elig-sidebar" style={{
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
              .edu-elig-sidebar::-webkit-scrollbar { width: 5px; }
              .edu-elig-sidebar::-webkit-scrollbar-track { background: transparent; }
              .edu-elig-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
              .edu-elig-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
            `}</style>

            <div style={{ flexShrink: 0 }}>
            </div>

            <div style={{ flexShrink: 0 }}>
              <EducationLoanSnapshot />
            </div>

            <div style={{ flexShrink: 0 }}>
              <SidebarList title="Popular Calculators" items={POPULAR_LINKS} />
            </div>

            <div style={{ flexShrink: 0 }}>
              <SidebarList title="More Calculators" items={MORE_LINKS} />
            </div>
          </aside>
        </div>
      </div>
      <SiteFooter columns={pipeColumns([
          {
            hd: 'Calculators',
            links: [
              '/calculators/education-loan-emi-calculator|Education Loan EMI',
              '/calculators/loan-eligibility-calculator|Loan Eligibility',
              '/calculators/home-loan-eligibility-calculator|Home Loan Eligibility',
              '/calculators/personal-loan-eligibility-calculator|Personal Loan Eligibility',
              '/calculators/emi-calculator|EMI',
            ],
          },
          { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
        ])} />
    </div>
  );
}

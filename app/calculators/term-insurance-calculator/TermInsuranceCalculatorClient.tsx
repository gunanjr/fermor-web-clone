'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect } from 'react';
import Link from 'next/link';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { FAQS } from './termInsuranceData';
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

type Mode = 'cover' | 'premium';
type Gender = 'male' | 'female';
type SmokerStatus = 'non-smoker' | 'smoker';
type PaymentMode = 'monthly' | 'quarterly' | 'half-yearly' | 'yearly';
type EmploymentType = 'salaried' | 'self-employed';

interface YearScheduleRow {
  year: number;
  age: number;
  annualPremium: number;
  cumulativePremium: number;
  taxSaved: number;
  netCost: number;
  activeCover: number;
}

function getActuarialRate(age: number, isSmoker: boolean, isFemale: boolean, sumAssured: number): number {
  let rate = 0.55 * Math.pow(1.064, Math.max(0, age - 20));
  if (isFemale) rate *= 0.85;
  if (isSmoker) rate *= 1.75;
  if (sumAssured >= 20000000) rate *= 0.90;
  else if (sumAssured >= 10000000) rate *= 0.95;
  return Math.round(rate * 100) / 100;
}

/* ─── Donut Chart (VPF Parity: R=80, sw=20, cx=106, cy=106, viewBox="0 0 212 212") ─── */
function DonutChart({
  valueA,
  valueB,
  labelA,
  labelB,
  centerLabel,
  centerValue,
}: {
  valueA: number;
  valueB: number;
  labelA: string;
  labelB: string;
  centerLabel?: string;
  centerValue?: string;
}) {
  const total = valueA + valueB;
  if (total <= 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const pArc = Math.min(circ, Math.max(0, (valueA / total) * circ));
  const pPct = Math.round((valueA / total) * 100);
  return (
    <svg
      width="212"
      height="212"
      viewBox="0 0 212 212"
      role="img"
      aria-label={`${labelA} ${pPct}%, ${labelB} ${100 - pPct}%`}
      style={{ display: 'block' }}
    >
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle
        cx={cx}
        cy={cy}
        r={R}
        fill="none"
        stroke={CHART_PAIR.primary}
        strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`}
        strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }}
      />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>
        {centerLabel || labelA}
      </text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>
        {centerValue || `${pPct}%`}
      </text>
    </svg>
  );
}

/* ─── Stacked Bar Chart for Policy Schedule (Simplified) ─────── */
function BarChart({ rows }: { rows: YearScheduleRow[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 140, PADL = 12, PADB = 16;
  const maxAnnual = Math.max(...rows.map(r => r.annualPremium + r.taxSaved));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(3, Math.min(28, slot * 0.65));
  const gap = (slot - barW) / 2;
  return (
    <svg
      role="img"
      aria-label="Year-by-year premium and tax savings"
      viewBox={`0 0 ${W} ${H + PADB}`}
      width="100%"
      style={{ display: 'block', overflow: 'visible' }}
    >
      {rows.map((row, i) => {
        const total = row.annualPremium + row.taxSaved;
        const totalH = maxAnnual > 0 ? (total / maxAnnual) * H : 0;
        const premH = total > 0 ? (row.annualPremium / total) * totalH : 0;
        const taxH = totalH - premH;
        const x = PADL + i * slot + gap;
        return (
          <g key={row.year}>
            <rect x={x} y={H - totalH} width={barW} height={taxH} fill={CHART_PAIR.secondary} rx={1} />
            <rect x={x} y={H - premH} width={barW} height={premH} fill={CHART_PAIR.primary} rx={1} />
          </g>
        );
      })}
      <line x1={PADL} y1={H} x2={W} y2={H} stroke={C.border} strokeWidth={1} />
    </svg>
  );
}

/* ─── Slider (VPF Exact Architecture) ────────────────────────── */
function Slider({
  label,
  value,
  min,
  max,
  step,
  fmt,
  onChange,
  compact,
  id,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  fmt: (v: number) => string;
  onChange: (v: number) => void;
  compact?: boolean;
  id?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 36 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 14 }}>
        <label htmlFor={inputId} style={{ fontSize: compact ? 13.5 : 14, color: C.ink2, fontWeight: 400 }}>
          {label}
        </label>
        {editing ? (
          <input
            id={inputId}
            autoFocus
            value={raw}
            onChange={e => setRaw(e.target.value)}
            onBlur={commit}
            onKeyDown={e => e.key === 'Enter' && commit()}
            aria-label={`Enter ${label} value`}
            style={{
              fontSize: 14,
              fontWeight: 600,
              textAlign: 'right',
              background: C.white,
              border: `1.5px solid ${C.dark}`,
              borderRadius: 7,
              padding: compact ? '6px 10px' : '7px 12px',
              width: 120,
              outline: 'none',
              color: C.ink,
              fontFamily: INTER,
            }}
          />
        ) : (
          <button
            onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${fmt(value)}. Click to edit.`}
            style={{
              fontSize: compact ? 13 : 14,
              fontWeight: 600,
              color: C.ink,
              background: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: 7,
              padding: compact ? '5px 12px' : '6px 14px',
              cursor: 'pointer',
              fontFamily: INTER,
              minWidth: compact ? 88 : 105,
              textAlign: 'center',
              transition: 'border-color 0.15s',
            }}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}
          >
            {fmt(value)}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            position: 'absolute',
            inset: 'auto 0',
            height: 4,
            borderRadius: 99,
            background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: `${pct}%`,
            top: '50%',
            transform: 'translate(-50%,-50%)',
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: C.white,
            border: `2.5px solid ${C.dark}`,
            boxShadow: '0 1px 6px rgba(16,18,20,0.18)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(+e.target.value)}
          aria-label={label}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">{fmt(min)}</span>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">{fmt(max)}</span>
      </div>
    </div>
  );
}

/* ─── Insurance Quick Facts Sidebar (VPF Parity) ─────────────── */
function InsuranceQuickFacts() {
  const rows = [
    { label: 'LIC Individual CSR (FY25)', value: '98.5%' },
    { label: 'Max Life Paid Claims Ratio', value: '99.8%' },
    { label: 'HDFC Life Click 2 Protect', value: 'from Rs 590/mo' },
    { label: 'Section 45 Moratorium', value: '3 Years' },
    { label: '80C Premium Limit', value: 'Rs 1.5 Lakh' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', fontFamily: INTER, background: C.white }}>
      <div style={{ background: '#f4f5f6', padding: '12px 18px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink }}>
          Insurance Quick Facts
        </span>
      </div>
      {rows.map((r, i) => (
        <div
          key={r.label}
          style={{
            padding: '11px 18px',
            borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 12.5, color: C.ink2 }}>{r.label}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Sidebar Navigation Lists ───────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <div style={{ padding: '14px 20px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 13.5, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', display: 'block' }}
        >
          <div
            style={{
              padding: '12px 20px',
              borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none',
              fontSize: 13.5,
              color: C.ink2,
              transition: 'all 0.12s',
            }}
            onMouseOver={e => {
              (e.currentTarget as HTMLElement).style.background = C.paleLime;
              (e.currentTarget as HTMLElement).style.color = C.dark;
            }}
            onMouseOut={e => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.color = C.ink2;
            }}
          >
            {label}
          </div>
        </Link>
      ))}
    </nav>
  );
}

const POPULAR = [
  { href: '/calculators/life-insurance-calculator',          label: 'Life Insurance Calculator' },
  { href: '/calculators/family-floater-coverage-calculator', label: 'Family Floater Health Insurance' },
  { href: '/calculators/child-insurance-calculator',          label: 'Child Insurance Calculator' },
  { href: '/calculators/home-insurance-coverage-calculator', label: 'Home Insurance Calculator' },
  { href: '/calculators/income-tax-calculator',              label: 'Income Tax Calculator' },
  { href: '/calculators/ppf-calculator',                     label: 'PPF Calculator' },
  { href: '/calculators/nps-calculator',                     label: 'NPS Calculator' },
];

const MORE = [
  { href: '/calculators/sip-calculator',                     label: 'SIP Calculator' },
  { href: '/calculators/emi-calculator',                     label: 'EMI Calculator' },
  { href: '/calculators/retirement-calculator',              label: 'Retirement Calculator' },
  { href: '/calculators/emergency-fund-calculator',          label: 'Emergency Fund Calculator' },
  { href: '/calculators/goal-planning-calculator',           label: 'Goal Planning Calculator' },
  { href: '/calculators/in-hand-salary-calculator',          label: 'In-Hand Salary Calculator' },
];

/* ─── FAQ Component ──────────────────────────────────────────── */
function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function TermInsuranceCalculatorClient({ region = 'in' }: { region?: string }) {
  const [mode, setModeState] = useState<Mode>('premium');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  /* Mode 1: Cover Needed State */
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [annualIncome, setAnnualIncome] = useState(1200000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [outstandingLoans, setOutstandingLoans] = useState(3000000);
  const [existingInvestments, setExistingInvestments] = useState(1500000);
  const [futureGoals, setFutureGoals] = useState(2500000);
  const [expectedInflation, setExpectedInflation] = useState(6);

  /* Mode 2: Premium Estimator State */
  const [premiumSumAssured, setPremiumSumAssured] = useState(10000000);
  const [premiumAge, setPremiumAge] = useState(28);
  const [policyTerm, setPolicyTerm] = useState(35);
  const [gender, setGender] = useState<Gender>('male');
  const [smokerStatus, setSmokerStatus] = useState<SmokerStatus>('non-smoker');
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('monthly');
  const [employmentType, setEmploymentType] = useState<EmploymentType>('salaried');
  const [includeCriticalIllness, setIncludeCriticalIllness] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk();
    window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  /* LocalStorage persistence */
  useEffect(() => {
    try {
      const saved = localStorage.getItem('fermor-term-insurance-v1');
      if (saved) {
        const p = JSON.parse(saved);
        if (p.mode !== undefined) setModeState(p.mode);
        if (p.currentAge !== undefined) setCurrentAge(p.currentAge);
        if (p.retirementAge !== undefined) setRetirementAge(p.retirementAge);
        if (p.annualIncome !== undefined) setAnnualIncome(p.annualIncome);
        if (p.monthlyExpenses !== undefined) setMonthlyExpenses(p.monthlyExpenses);
        if (p.outstandingLoans !== undefined) setOutstandingLoans(p.outstandingLoans);
        if (p.existingInvestments !== undefined) setExistingInvestments(p.existingInvestments);
        if (p.futureGoals !== undefined) setFutureGoals(p.futureGoals);
        if (p.expectedInflation !== undefined) setExpectedInflation(p.expectedInflation);
        if (p.premiumSumAssured !== undefined) setPremiumSumAssured(p.premiumSumAssured);
        if (p.premiumAge !== undefined) setPremiumAge(p.premiumAge);
        if (p.policyTerm !== undefined) setPolicyTerm(p.policyTerm);
        if (p.gender !== undefined) setGender(p.gender);
        if (p.smokerStatus !== undefined) setSmokerStatus(p.smokerStatus);
        if (p.paymentMode !== undefined) setPaymentMode(p.paymentMode);
        if (p.employmentType !== undefined) setEmploymentType(p.employmentType);
        if (p.includeCriticalIllness !== undefined) setIncludeCriticalIllness(p.includeCriticalIllness);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        'fermor-term-insurance-v1',
        JSON.stringify({
          mode,
          currentAge,
          retirementAge,
          annualIncome,
          monthlyExpenses,
          outstandingLoans,
          existingInvestments,
          futureGoals,
          expectedInflation,
          premiumSumAssured,
          premiumAge,
          policyTerm,
          gender,
          smokerStatus,
          paymentMode,
          employmentType,
          includeCriticalIllness,
        })
      );
    } catch {}
  }, [
    hydrated,
    mode,
    currentAge,
    retirementAge,
    annualIncome,
    monthlyExpenses,
    outstandingLoans,
    existingInvestments,
    futureGoals,
    expectedInflation,
    premiumSumAssured,
    premiumAge,
    policyTerm,
    gender,
    smokerStatus,
    paymentMode,
    employmentType,
    includeCriticalIllness,
  ]);

  const setMode = (v: Mode) => {
    setModeState(v);
    setShowAdvanced(false);
  };

  /* ─── Mode 1 Calculation: Cover Needed (HLV & Expense Replacement) ─── */
  const coverResult = useMemo(() => {
    const workingYears = Math.max(1, retirementAge - currentAge);
    const annualFamilyExpense = monthlyExpenses * 12;
    const incomeReplacementNeed = annualFamilyExpense * workingYears;
    const grossNeed = incomeReplacementNeed + outstandingLoans + futureGoals;
    const recommendedCover = Math.max(2500000, Math.round((grossNeed - existingInvestments) / 500000) * 500000);
    const inflationFactor = Math.pow(1 + expectedInflation / 100, Math.min(workingYears, 20));
    const inflationAdjustedCover = Math.round((recommendedCover * inflationFactor) / 500000) * 500000;
    const ratePerThousand = getActuarialRate(currentAge, false, false, recommendedCover);
    const estAnnualPremium = Math.round(((recommendedCover * ratePerThousand) / 1000) * 1.18);
    const estMonthlyPremium = Math.round(estAnnualPremium / 12);
    const incomeMultiplier = annualIncome > 0 ? Number((recommendedCover / annualIncome).toFixed(1)) : 0;
    return {
      workingYears,
      incomeReplacementNeed,
      grossNeed,
      recommendedCover,
      inflationAdjustedCover,
      estAnnualPremium,
      estMonthlyPremium,
      incomeMultiplier,
    };
  }, [
    currentAge,
    retirementAge,
    annualIncome,
    monthlyExpenses,
    outstandingLoans,
    existingInvestments,
    futureGoals,
    expectedInflation,
  ]);

  /* ─── Mode 2 Calculation: Premium Estimator ─── */
  const premiumResult = useMemo(() => {
    const isSmoker = smokerStatus === 'smoker';
    const isFemale = gender === 'female';
    const baseRatePerThousand = getActuarialRate(premiumAge, isSmoker, isFemale, premiumSumAssured);
    const riderRate = includeCriticalIllness ? 0.45 : 0;
    const totalRatePerThousand = Math.round((baseRatePerThousand + riderRate) * 100) / 100;
    const modeFactors: Record<PaymentMode, number> = {
      yearly: 1.0,
      'half-yearly': 1.02,
      quarterly: 1.04,
      monthly: 1.056,
    };
    const annualBasePremium = Math.round((premiumSumAssured * totalRatePerThousand) / 1000);
    const annualWithMode = Math.round(annualBasePremium * modeFactors[paymentMode]);
    const gstAmount = Math.round(annualWithMode * 0.18);
    const annualTotalPremium = annualWithMode + gstAmount;
    const monthlyPremium = Math.round(annualTotalPremium / 12);
    const totalPaidOverTerm = annualTotalPremium * policyTerm;
    const annual80cSaving = Math.round(Math.min(annualTotalPremium, 150000) * 0.312);
    const totalTaxSaved = annual80cSaving * policyTerm;
    const netEffectiveCost = Math.max(0, totalPaidOverTerm - totalTaxSaved);
    const coverToCostRatio = totalPaidOverTerm > 0 ? Math.round(premiumSumAssured / totalPaidOverTerm) : 0;

    return {
      baseRatePerThousand,
      totalRatePerThousand,
      annualBasePremium,
      annualTotalPremium,
      monthlyPremium,
      totalPaidOverTerm,
      annual80cSaving,
      totalTaxSaved,
      netEffectiveCost,
      coverToCostRatio,
    };
  }, [
    premiumAge,
    policyTerm,
    premiumSumAssured,
    gender,
    smokerStatus,
    paymentMode,
    includeCriticalIllness,
  ]);

  /* ─── Year-by-Year Schedule Generation ─── */
  const scheduleRows = useMemo((): YearScheduleRow[] => {
    const rows: YearScheduleRow[] = [];
    const termYears = mode === 'premium' ? policyTerm : coverResult.workingYears;
    const startAge = mode === 'premium' ? premiumAge : currentAge;
    const annualCost = mode === 'premium' ? premiumResult.annualTotalPremium : coverResult.estAnnualPremium;
    const taxSavingYear = mode === 'premium' ? premiumResult.annual80cSaving : Math.round(Math.min(annualCost, 150000) * 0.312);
    const activeCover = mode === 'premium' ? premiumSumAssured : coverResult.recommendedCover;

    let cumPrem = 0;
    let cumTax = 0;
    for (let y = 1; y <= termYears; y++) {
      cumPrem += annualCost;
      cumTax += taxSavingYear;
      rows.push({
        year: y,
        age: startAge + y - 1,
        annualPremium: annualCost,
        cumulativePremium: cumPrem,
        taxSaved: taxSavingYear,
        netCost: Math.max(0, cumPrem - cumTax),
        activeCover,
      });
    }
    return rows;
  }, [mode, policyTerm, premiumAge, premiumResult, coverResult, currentAge, premiumSumAssured]);

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const bul = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 } as React.CSSProperties;
  const thS = {
    padding: '9px 14px',
    fontSize: 11.5,
    fontWeight: 700,
    color: C.ink,
    background: '#f4f5f6',
    textAlign: 'left' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    border: `1px solid ${C.border}`,
    whiteSpace: 'nowrap' as const,
  } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;

  /* Donut values calculation */
  const donutA = mode === 'premium' ? premiumResult.totalPaidOverTerm : coverResult.recommendedCover;
  const donutB = mode === 'premium' ? Math.max(0, premiumSumAssured - premiumResult.totalPaidOverTerm) : existingInvestments;
  const donutLabelA = mode === 'premium' ? 'Total Premiums' : 'Recommended Cover';
  const donutLabelB = mode === 'premium' ? 'Risk Cover Value' : 'Existing Assets';
  const donutPctA = Math.round((donutA / (donutA + donutB || 1)) * 100);
  const donutPctB = 100 - donutPctA;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        {/* Header */}
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Term Insurance Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate your term plan premium, recommended sum assured, and coverage adequacy using actuarial formulas and income replacement methods.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>
            {/* ── CALCULATOR MAIN CARD ── */}
            <section
              aria-label="Term Insurance Calculator"
              style={{
                background: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 1px 16px rgba(16,18,20,0.06)',
                marginBottom: 40,
              }}
            >
              {/* VPF Tabs Inside Card */}
              <div
                role="tablist"
                aria-label="Calculator mode"
                style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}
              >
                {([
                  { id: 'premium', label: 'Premium Estimator', desc: 'Calculate premium for 50 Lakh, 1 Crore, 2 Crore, or custom cover' },
                  { id: 'cover',   label: 'Cover Needed (HLV)', desc: 'Determine recommended life cover using human life value and expense replacement' },
                ] as { id: Mode; label: string; desc: string }[]).map(tab => (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={mode === tab.id}
                    aria-controls={`panel-${tab.id}`}
                    onClick={() => setMode(tab.id)}
                    title={tab.desc}
                    style={{
                      flex: 1,
                      padding: mobile ? '13px 6px' : '15px 20px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: mobile ? 12.5 : 13.5,
                      fontWeight: mode === tab.id ? 700 : 400,
                      color: mode === tab.id ? C.dark : C.ink3,
                      borderBottom: mode === tab.id ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                      transition: 'all 0.15s',
                      fontFamily: INTER,
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* 50/50 Grid Layout */}
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                {/* ── INPUT PANEL (Strict Rule 17 Colorless) ── */}
                <div
                  role="tabpanel"
                  id={`panel-${mode}`}
                  style={{
                    padding: mobile ? '20px 18px' : '40px 44px',
                    borderRight: mobile ? 'none' : `1px solid ${C.border}`,
                    borderBottom: mobile ? `1px solid ${C.border}` : 'none',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                    {!mobile && (
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
                        {showAdvanced ? 'More Settings' : 'Inputs'}
                      </p>
                    )}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  {/* Mode 2: Premium Estimator Inputs */}
                  {mode === 'premium' && (
                    <>
                      {!showAdvanced ? (
                        <>
                          {/* Quick Sum Assured Presets (Rule 17 Colorless) */}
                          <div style={{ marginBottom: 20 }}>
                            <label style={{ fontSize: 12, fontWeight: 600, color: C.ink3, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: 8 }}>
                              Popular Cover Presets
                            </label>
                            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                              {[
                                { val: 5000000, label: '50 Lakh' },
                                { val: 10000000, label: '1 Crore' },
                                { val: 20000000, label: '2 Crore' },
                                { val: 30000000, label: '3 Crore' },
                                { val: 50000000, label: '5 Crore' },
                              ].map(pill => {
                                const active = premiumSumAssured === pill.val;
                                return (
                                  <button
                                    key={pill.val}
                                    type="button"
                                    onClick={() => setPremiumSumAssured(pill.val)}
                                    style={{
                                      padding: '6px 12px',
                                      borderRadius: 6,
                                      cursor: 'pointer',
                                      fontFamily: INTER,
                                      fontSize: 12.5,
                                      transition: 'all 0.12s',
                                      background: active ? C.white : 'transparent',
                                      border: active ? `1.5px solid ${C.ink}` : `1px solid ${C.border}`,
                                      color: active ? C.ink : C.ink3,
                                      fontWeight: active ? 700 : 500,
                                    }}
                                  >
                                    {pill.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <Slider
                            label="Desired Sum Assured"
                            id="prem-sa"
                            value={premiumSumAssured}
                            min={2500000}
                            max={50000000}
                            step={500000}
                            fmt={fmtC}
                            onChange={setPremiumSumAssured}
                            compact={mobile}
                          />

                          <Slider
                            label="Your Current Age"
                            id="prem-age"
                            value={premiumAge}
                            min={18}
                            max={65}
                            step={1}
                            fmt={v => `${v} yr`}
                            onChange={setPremiumAge}
                            compact={mobile}
                          />

                          <Slider
                            label="Policy Coverage Term"
                            id="prem-term"
                            value={policyTerm}
                            min={10}
                            max={50}
                            step={1}
                            fmt={v => `${v} yr (Up to age ${premiumAge + v})`}
                            onChange={setPolicyTerm}
                            compact={mobile}
                          />

                          {/* Gender and Smoker Toggles (Strict Rule 17 Colorless) */}
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 22 }}>
                            <div>
                              <label style={{ fontSize: 13, color: C.ink2, fontWeight: 400, display: 'block', marginBottom: 6 }}>
                                Gender
                              </label>
                              <div
                                role="radiogroup"
                                aria-label="Gender"
                                style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}
                              >
                                {(['male', 'female'] as Gender[]).map(g => {
                                  const active = gender === g;
                                  return (
                                    <button
                                      key={g}
                                      type="button"
                                      role="radio"
                                      aria-checked={active}
                                      onClick={() => setGender(g)}
                                      style={{
                                        flex: 1,
                                        padding: '7px 10px',
                                        fontSize: 12.5,
                                        cursor: 'pointer',
                                        fontFamily: INTER,
                                        border: 'none',
                                        background: active ? C.white : 'transparent',
                                        color: active ? C.ink : C.ink3,
                                        fontWeight: active ? 600 : 400,
                                        transition: 'all 0.1s',
                                        textTransform: 'capitalize',
                                      }}
                                    >
                                      {g === 'female' ? 'Female (-15%)' : 'Male'}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            <div>
                              <label style={{ fontSize: 13, color: C.ink2, fontWeight: 400, display: 'block', marginBottom: 6 }}>
                                Smoker Status
                              </label>
                              <div
                                role="radiogroup"
                                aria-label="Smoker status"
                                style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}
                              >
                                {(['non-smoker', 'smoker'] as SmokerStatus[]).map(s => {
                                  const active = smokerStatus === s;
                                  return (
                                    <button
                                      key={s}
                                      type="button"
                                      role="radio"
                                      aria-checked={active}
                                      onClick={() => setSmokerStatus(s)}
                                      style={{
                                        flex: 1,
                                        padding: '7px 8px',
                                        fontSize: 12.5,
                                        cursor: 'pointer',
                                        fontFamily: INTER,
                                        border: 'none',
                                        background: active ? C.white : 'transparent',
                                        color: active ? C.ink : C.ink3,
                                        fontWeight: active ? 600 : 400,
                                        transition: 'all 0.1s',
                                      }}
                                    >
                                      {s === 'non-smoker' ? 'Non-smoker' : 'Smoker'}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>


                          {/* Derived summary box before More Settings (VPF pattern) */}
                          <div style={{ marginTop: 8, padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 24 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: C.ink, fontWeight: 700, marginBottom: 4 }}>
                              <span>Estimated Annual Premium (incl. 18% GST)</span>
                              <span>{fmtC(premiumResult.annualTotalPremium)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.ink2, marginBottom: 2 }}>
                              <span>Base Rate per Rs 1,000 Sum Assured: Rs {premiumResult.baseRatePerThousand.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.ink2, fontWeight: 600 }}>
                              <span>Annual Tax Saved (80C @ 30% slab): {fmtC(premiumResult.annual80cSaving)}</span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => setShowAdvanced(true)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 6,
                              fontSize: 13,
                              color: C.dark,
                              background: 'none',
                              border: `1px solid ${C.border}`,
                              borderRadius: 8,
                              padding: '7px 14px',
                              cursor: 'pointer',
                              fontFamily: INTER,
                              fontWeight: 600,
                            }}
                          >
                            More settings
                            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="9 18 15 12 9 6" />
                            </svg>
                          </button>
                        </>
                      ) : (
                        <>
                          <div style={{ marginBottom: 24 }}>
                            <label style={{ fontSize: 13, color: C.ink2, fontWeight: 400, display: 'block', marginBottom: 6 }}>
                              Employment Type
                            </label>
                            <div
                              role="radiogroup"
                              aria-label="Employment type"
                              style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}
                            >
                              {(['salaried', 'self-employed'] as EmploymentType[]).map(et => {
                                const active = employmentType === et;
                                return (
                                  <button
                                    key={et}
                                    type="button"
                                    role="radio"
                                    aria-checked={active}
                                    onClick={() => setEmploymentType(et)}
                                    style={{
                                      flex: 1,
                                      padding: '7px 10px',
                                      fontSize: 12.5,
                                      cursor: 'pointer',
                                      fontFamily: INTER,
                                      border: 'none',
                                      background: active ? C.white : 'transparent',
                                      color: active ? C.ink : C.ink3,
                                      fontWeight: active ? 600 : 400,
                                      transition: 'all 0.1s',
                                      textTransform: 'capitalize',
                                    }}
                                  >
                                    {et === 'salaried' ? 'Salaried (Form 16)' : 'Self-Employed (ITR)'}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Payment Mode in Advanced Settings */}
                          <div style={{ marginBottom: 24 }}>
                            <label style={{ fontSize: 13, color: C.ink2, fontWeight: 400, display: 'block', marginBottom: 6 }}>
                              Payment Mode
                            </label>
                            <div
                              role="radiogroup"
                              aria-label="Payment frequency"
                              style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}
                            >
                              {(['monthly', 'quarterly', 'half-yearly', 'yearly'] as PaymentMode[]).map(m => {
                                const active = paymentMode === m;
                                return (
                                  <button
                                    key={m}
                                    type="button"
                                    role="radio"
                                    aria-checked={active}
                                    onClick={() => setPaymentMode(m)}
                                    style={{
                                      flex: 1,
                                      padding: '7px 6px',
                                      fontSize: 11.5,
                                      cursor: 'pointer',
                                      fontFamily: INTER,
                                      border: 'none',
                                      background: active ? C.white : 'transparent',
                                      color: active ? C.ink : C.ink3,
                                      fontWeight: active ? 600 : 400,
                                      transition: 'all 0.1s',
                                      textTransform: 'capitalize',
                                    }}
                                  >
                                    {m === 'half-yearly' ? 'Half-Year' : m}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div style={{ marginBottom: 24, padding: '14px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10 }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 13.5, color: C.ink, fontWeight: 600 }}>
                              <input
                                type="checkbox"
                                checked={includeCriticalIllness}
                                onChange={e => setIncludeCriticalIllness(e.target.checked)}
                                style={{ width: 16, height: 16, accentColor: C.dark }}
                              />
                              Add Critical Illness Rider (Rs 25 Lakh)
                            </label>
                            <p style={{ fontSize: 12, color: C.ink3, margin: '6px 0 0', lineHeight: 1.5 }}>
                              Adds comprehensive protection against 64 listed critical illnesses with a lump-sum payout upon diagnosis.
                            </p>
                          </div>

                          <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: '0 0 24px' }}>
                            Indian life insurers require standard medical check-ups for sum assured above Rs 50 lakh. Salaried applicants can submit 3 months salary slips or Form 16, while self-employed applicants submit ITR with computation of income for the last 2 to 3 years.
                          </p>

                          <button
                            type="button"
                            onClick={() => setShowAdvanced(false)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 6,
                              fontSize: 13,
                              color: C.dark,
                              background: 'none',
                              border: `1px solid ${C.border}`,
                              borderRadius: 8,
                              padding: '7px 14px',
                              cursor: 'pointer',
                              fontFamily: INTER,
                              fontWeight: 600,
                            }}
                          >
                            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="15 18 9 12 15 6" />
                            </svg>
                            Back
                          </button>
                        </>
                      )}
                    </>
                  )}

                  {/* Mode 1: Cover Needed Inputs */}
                  {mode === 'cover' && (
                    <>
                      {!showAdvanced ? (
                        <>
                          <Slider
                            label="Annual Income"
                            id="cov-inc"
                            value={annualIncome}
                            min={300000}
                            max={10000000}
                            step={50000}
                            fmt={fmtC}
                            onChange={setAnnualIncome}
                            compact={mobile}
                          />

                          <Slider
                            label="Monthly Household Expenses"
                            id="cov-exp"
                            value={monthlyExpenses}
                            min={15000}
                            max={500000}
                            step={5000}
                            fmt={fmtC}
                            onChange={setMonthlyExpenses}
                            compact={mobile}
                          />

                          <Slider
                            label="Current Age"
                            id="cov-curage"
                            value={currentAge}
                            min={18}
                            max={60}
                            step={1}
                            fmt={v => `${v} yr`}
                            onChange={setCurrentAge}
                            compact={mobile}
                          />

                          <Slider
                            label="Target Coverage Age (Retirement)"
                            id="cov-retage"
                            value={retirementAge}
                            min={currentAge + 5}
                            max={75}
                            step={1}
                            fmt={v => `${v} yr (${retirementAge - currentAge} yrs left)`}
                            onChange={setRetirementAge}
                            compact={mobile}
                          />

                          <div style={{ marginTop: 8, padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 24 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: C.ink, fontWeight: 700, marginBottom: 4 }}>
                              <span>Gross Protection Need</span>
                              <span>{fmtC(coverResult.grossNeed)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.ink2, marginBottom: 2 }}>
                              <span>Income Replacement ({coverResult.workingYears} yrs): {fmtC(coverResult.incomeReplacementNeed)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.ink2, fontWeight: 600 }}>
                              <span>Existing Assets Deducted: {fmtC(existingInvestments)}</span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => setShowAdvanced(true)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 6,
                              fontSize: 13,
                              color: C.dark,
                              background: 'none',
                              border: `1px solid ${C.border}`,
                              borderRadius: 8,
                              padding: '7px 14px',
                              cursor: 'pointer',
                              fontFamily: INTER,
                              fontWeight: 600,
                            }}
                          >
                            More settings
                            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="9 18 15 12 9 6" />
                            </svg>
                          </button>
                        </>
                      ) : (
                        <>
                          <Slider
                            label="Outstanding Liabilities (Home & Auto Loans)"
                            id="cov-loans"
                            value={outstandingLoans}
                            min={0}
                            max={20000000}
                            step={100000}
                            fmt={fmtC}
                            onChange={setOutstandingLoans}
                            compact={mobile}
                          />

                          <Slider
                            label="Existing Investments & Savings (PF, MF, FD)"
                            id="cov-inv"
                            value={existingInvestments}
                            min={0}
                            max={20000000}
                            step={100000}
                            fmt={fmtC}
                            onChange={setExistingInvestments}
                            compact={mobile}
                          />

                          <Slider
                            label="Future Goals (Children Higher Education)"
                            id="cov-goals"
                            value={futureGoals}
                            min={0}
                            max={20000000}
                            step={100000}
                            fmt={fmtC}
                            onChange={setFutureGoals}
                            compact={mobile}
                          />

                          <Slider
                            label="Expected Long-Term Inflation Rate"
                            id="cov-infl"
                            value={expectedInflation}
                            min={3}
                            max={10}
                            step={0.5}
                            fmt={v => `${v.toFixed(1)}%`}
                            onChange={setExpectedInflation}
                            compact={mobile}
                          />

                          <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: '0 0 24px' }}>
                            Future goals and outstanding loans increase your insurance need, while existing liquid assets decrease it. Inflation compounding illustrates how purchasing power degrades over your working life.
                          </p>

                          <button
                            type="button"
                            onClick={() => setShowAdvanced(false)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 6,
                              fontSize: 13,
                              color: C.dark,
                              background: 'none',
                              border: `1px solid ${C.border}`,
                              borderRadius: 8,
                              padding: '7px 14px',
                              cursor: 'pointer',
                              fontFamily: INTER,
                              fontWeight: 600,
                            }}
                          >
                            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="15 18 9 12 15 6" />
                            </svg>
                            Back
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>

                {/* ── RESULT PANEL (VPF Exact Parity) ── */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* Top Dark Banner Card */}
                  <div
                    style={{
                      width: '100%',
                      background: '#F4F5F6', border: '1px solid #E3E6E8',
                      borderRadius: 10,
                      padding: mobile ? '12px 16px' : '16px 20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}
                  >
                    <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>
                      {mode === 'premium' ? 'Estimated Monthly Premium' : 'Recommended Life Cover'}
                    </span>
                    <span
                      aria-live="polite"
                      aria-label={
                        mode === 'premium'
                          ? `Monthly premium: ${fmtIN(premiumResult.monthlyPremium)}`
                          : `Recommended cover: ${fmtIN(coverResult.recommendedCover)}`
                      }
                      style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                    >
                      {mode === 'premium' ? fmtIN(premiumResult.monthlyPremium) : fmtIN(coverResult.recommendedCover)}
                    </span>
                  </div>

                  {/* Output Metric Rows */}
                  {mode === 'premium' ? (
                    [
                      { label: 'Sum Assured (Life Cover)', value: fmtC(premiumSumAssured) },
                      { label: 'Annual Premium (incl. 18% GST)', value: fmtC(premiumResult.annualTotalPremium) },
                      { label: 'Total Premium Paid Over Term', value: fmtC(premiumResult.totalPaidOverTerm) },
                      { label: 'Section 80C Tax Saved (Total)', value: fmtC(premiumResult.totalTaxSaved) },
                      { label: 'Net Outgo After Tax Savings', value: fmtC(premiumResult.netEffectiveCost) },
                      { label: 'Coverage Period', value: `${policyTerm} years (to age ${premiumAge + policyTerm})` },
                      { label: 'Risk Cover Multiple', value: `${premiumResult.coverToCostRatio}x total cost` },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: mobile ? '10px 0' : '13px 0',
                          borderBottom: `1px solid ${C.border}`,
                          width: '100%',
                        }}
                      >
                        <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                        <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                      </div>
                    ))
                  ) : (
                    [
                      { label: 'Recommended Sum Assured', value: fmtC(coverResult.recommendedCover) },
                      { label: 'Income Multiplier', value: `${coverResult.incomeMultiplier}x annual income` },
                      { label: 'Estimated Starting Monthly Premium', value: fmtC(coverResult.estMonthlyPremium) },
                      { label: 'Estimated Starting Annual Premium', value: fmtC(coverResult.estAnnualPremium) },
                      { label: 'Working Years to Protect', value: `${coverResult.workingYears} years` },
                      { label: 'Inflation-Adjusted Target Need', value: fmtC(coverResult.inflationAdjustedCover) },
                      { label: 'Existing Net Liquid Assets', value: fmtC(existingInvestments) },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: mobile ? '10px 0' : '13px 0',
                          borderBottom: `1px solid ${C.border}`,
                          width: '100%',
                        }}
                      >
                        <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                        <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                      </div>
                    ))
                  )}

                  {/* Donut Chart (Desktop: above progress bar, Mobile: ordered) */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: mobile ? 16 : 0,
                      marginBottom: mobile ? 0 : 16,
                      order: mobile ? 1 : -1,
                    }}
                  >
                    <DonutChart
                      valueA={donutA}
                      valueB={donutB}
                      labelA={donutLabelA}
                      labelB={donutLabelB}
                      centerLabel={mode === 'premium' ? 'Premiums Paid' : 'Cover Gap'}
                      centerValue={`${donutPctA}%`}
                    />
                  </div>

                  {/* Donut Legend */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: 20,
                      marginBottom: mobile ? 8 : 16,
                      order: mobile ? 2 : -1,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>
                        {donutLabelA} {donutPctA}%
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>
                        {donutLabelB} {donutPctB}%
                      </span>
                    </div>
                  </div>

                  {/* Dual-Color Progress Bar */}
                  <div style={{ width: '100%', marginTop: 6 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>
                        {donutLabelA} {donutPctA}%
                      </span>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>
                        {donutLabelB} {donutPctB}%
                      </span>
                    </div>
                    <div
                      style={{ height: 5, borderRadius: 99, background: C.lime2, overflow: 'hidden' }}
                      role="img"
                      aria-label={`${donutLabelA} is ${donutPctA}%`}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${donutPctA}%`,
                          background: C.dark,
                          borderRadius: 99,
                          transition: 'width 0.4s ease',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── COLLAPSIBLE YEAR-BY-YEAR SCHEDULE (VPF Parity) ── */}
              {scheduleRows.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button
                    onClick={() => setShowTable(v => !v)}
                    aria-expanded={showTable}
                    aria-controls="policy-schedule"
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: mobile ? '14px 20px' : '18px 44px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: INTER,
                      gap: 12,
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>
                        Year-by-Year Policy Schedule
                      </span>
                      {!mobile && (
                        <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>
                          {mode === 'premium' ? `Annual premium and Section 80C tax relief breakdown` : `Protection timeline to retirement`}
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span
                        style={{
                          fontSize: 11.5,
                          fontWeight: 600,
                          color: C.dark,
                          background: '#f4f5f6',
                          border: `1px solid ${C.border}`,
                          padding: '3px 9px',
                          borderRadius: 20,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {scheduleRows.length} yr · Policy Schedule
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={C.ink3}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showTable && (
                    <div id="policy-schedule" style={{ borderTop: `1px solid ${C.border}` }}>
                      {/* Stacked Bar Chart */}
                      <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                        <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>Annual Premium</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>80C Tax Saved (30% Bracket)</span>
                          </div>
                        </div>
                        <BarChart rows={scheduleRows} />
                      </div>

                      {mobile && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '6px 0 4px' }}>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={C.ink3}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            style={{ animation: 'swipeHint 1.6s ease-in-out infinite' }}
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                          <p style={{ fontSize: 11.5, color: C.ink3, margin: 0, fontFamily: INTER }}>Swipe to see all columns</p>
                        </div>
                      )}
                      <style>{`@keyframes swipeHint { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }`}</style>

                      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
                        <table style={{ minWidth: 640, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              {['Policy Year', 'Attained Age', 'Annual Outgo', 'Cumulative Premium', '80C Tax Saved', 'Net Effective Cost', 'Active Life Cover'].map(h => (
                                <th
                                  key={h}
                                  style={{
                                    padding: '10px 14px',
                                    textAlign: 'left',
                                    fontWeight: 700,
                                    color: C.ink,
                                    fontSize: 11,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    whiteSpace: 'nowrap',
                                  }}
                                  scope="col"
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {scheduleRows.map((row, i) => (
                              <tr
                                key={row.year}
                                style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}
                              >
                                <td style={{ padding: '11px 14px', fontWeight: 600, color: C.ink2 }}>Year {row.year}</td>
                                <td style={{ padding: '11px 14px', color: C.ink2 }}>{row.age} yrs</td>
                                <td style={{ padding: '11px 14px', color: C.ink2, fontWeight: 600 }}>{fmtIN(row.annualPremium)}</td>
                                <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtIN(row.cumulativePremium)}</td>
                                <td style={{ padding: '11px 14px', color: C.ink2, fontWeight: 600 }}>{fmtIN(row.taxSaved)}</td>
                                <td style={{ padding: '11px 14px', color: C.ink2, fontWeight: 600 }}>{fmtIN(row.netCost)}</td>
                                <td style={{ padding: '11px 14px', color: C.ink2, fontWeight: 600 }}>{fmtIN(row.activeCover)}</td>
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

            {/* ── WAITLIST CARD ── */}
            <div style={{ marginBottom: 40 }}>
              <SaveResultsCard mobile={mobile} />
            </div>

            

            {/* ── ARTICLE CONTENT (Zero Em Dashes, Max 3 Sentences / Short Lines) ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>
              {/* Section 1 */}
              <div style={sec}>
                <h2 style={h2} id="what-is-term-insurance">
                  What Is Term Insurance and How Does It Work in India?
                </h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Term insurance is a pure life insurance contract where the insurer guarantees to pay a defined sum assured to the nominee if the policyholder dies during the policy term.
                  </p>
                </div>
                <p style={p}>
                  Unlike endowment policies or ULIPs, a standard term plan carries no investment or maturity component. Every single rupee paid toward the premium goes directly toward underwriting mortality risk. Because no cash value accumulates, insurers offer substantial coverage amounts at affordable premium rates.
                </p>
                <p style={p}>
                  The Insurance Regulatory and Development Authority of India (<a href="https://irdai.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>IRDAI</a>) governs all term insurance products issued by Indian life insurers under the Insurance Act, 1938. Regulated life insurers include Life Insurance Corporation of India (LIC), Max Life Insurance, HDFC Life, ICICI Prudential, and SBI Life.
                </p>
              </div>

              {/* Section 2 */}
              <div style={sec}>
                <h2 style={h2} id="term-insurance-formula">
                  How to Calculate Term Insurance Premium (Actuarial Formula)
                </h2>
                <p style={p}>
                  Term insurance premiums are calculated using actuarial mortality tables that determine the statistical probability of death at each age bracket.
                </p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14.5, fontWeight: 700, color: C.dark }}>
                    Annual Premium = [(Sum Assured x Rate per Thousand) / 1000] x Mode Factor x (1 + GST 18%)
                  </code>
                </div>
                <p style={p}>
                  The base rate per thousand increases with entry age and lifestyle risk factors. Non-smokers pay lower rates because actuarial data establishes lower cardiovascular and respiratory mortality. The table below outlines benchmark market rates across standard Indian age brackets.
                </p>

                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Entry Age</th>
                        <th style={thS} scope="col">Male Non-Smoker Rate</th>
                        <th style={thS} scope="col">Female Non-Smoker Rate</th>
                        <th style={thS} scope="col">Smoker Rate (Male)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['18 to 25', 'Rs 0.65 to Rs 0.75 / 1k', 'Rs 0.55 to Rs 0.65 / 1k', 'Rs 1.15 to Rs 1.35 / 1k'],
                        ['26 to 30', 'Rs 0.85 to Rs 1.05 / 1k', 'Rs 0.72 to Rs 0.89 / 1k', 'Rs 1.50 to Rs 1.85 / 1k'],
                        ['31 to 35', 'Rs 1.15 to Rs 1.45 / 1k', 'Rs 0.98 to Rs 1.23 / 1k', 'Rs 2.05 to Rs 2.55 / 1k'],
                        ['36 to 40', 'Rs 1.65 to Rs 2.15 / 1k', 'Rs 1.40 to Rs 1.83 / 1k', 'Rs 2.90 to Rs 3.75 / 1k'],
                        ['41 to 45', 'Rs 2.50 to Rs 3.35 / 1k', 'Rs 2.12 to Rs 2.85 / 1k', 'Rs 4.40 to Rs 5.85 / 1k'],
                        ['46 to 50', 'Rs 3.90 to Rs 5.40 / 1k', 'Rs 3.31 to Rs 4.59 / 1k', 'Rs 6.80 to Rs 9.45 / 1k'],
                      ].map(([age, mns, fns, sm]) => (
                        <tr key={age as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{age}</td>
                          <td style={tdR}>{mns}</td>
                          <td style={tdR}>{fns}</td>
                          <td style={tdR}>{sm}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  <strong>Worked Example:</strong> A 28-year-old non-smoker male selects Rs 1 crore cover for 35 years. The base rate is Rs 0.85 per thousand. The annual base premium equals (1,00,00,000 x 0.85) / 1,000 = Rs 8,500. With 18% GST (Rs 1,530), total annual premium is Rs 10,030, or roughly Rs 836 per month.
                </p>
              </div>

              {/* Section 3 */}
              <div style={sec}>
                <h2 style={h2} id="premium-rates-comparison">
                  1 Crore, 2 Crore, and 50 Lakh Term Insurance Premium Rates
                </h2>
                <p style={p}>
                  Term insurance premiums scale efficiently because insurers offer substantial volume discounts on higher sum assured amounts.
                </p>
                <p style={p}>
                  A policyholder buying Rs 2 crore of coverage does not pay twice the premium of a Rs 1 crore policy. Underwriting administrative costs remain fixed regardless of policy size, resulting in lower per-unit cost for larger policies.
                </p>

                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Age</th>
                        <th style={thS} scope="col">50 Lakh Cover (Mo.)</th>
                        <th style={thS} scope="col">1 Crore Cover (Mo.)</th>
                        <th style={thS} scope="col">2 Crore Cover (Mo.)</th>
                        <th style={thS} scope="col">Annual Savings vs 2 Policies</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Age 25', 'Rs 380 to Rs 440', 'Rs 595 to Rs 720', 'Rs 1,070 to Rs 1,290', 'Rs 2,500 to Rs 3,400 / yr'],
                        ['Age 30', 'Rs 490 to Rs 580', 'Rs 790 to Rs 950', 'Rs 1,420 to Rs 1,710', 'Rs 3,400 to Rs 4,600 / yr'],
                        ['Age 35', 'Rs 690 to Rs 820', 'Rs 1,120 to Rs 1,350', 'Rs 2,010 to Rs 2,430', 'Rs 4,800 to Rs 6,500 / yr'],
                        ['Age 40', 'Rs 1,020 to Rs 1,210', 'Rs 1,650 to Rs 1,980', 'Rs 2,970 to Rs 3,560', 'Rs 7,100 to Rs 9,600 / yr'],
                        ['Age 45', 'Rs 1,550 to Rs 1,840', 'Rs 2,510 to Rs 3,010', 'Rs 4,520 to Rs 5,420', 'Rs 10,800 to Rs 14,500 / yr'],
                      ].map(([age, p50, p1c, p2c, sav]) => (
                        <tr key={age as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{age}</td>
                          <td style={tdR}>{p50}</td>
                          <td style={tdR}>{p1c}</td>
                          <td style={tdR}>{p2c}</td>
                          <td style={{ ...tdR, color: C.ink2, fontWeight: 600 }}>{sav}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 4 */}
              <div style={sec}>
                <h2 style={h2} id="how-much-cover">
                  How Much Term Insurance Cover Do You Need? (HLV vs Multiplier)
                </h2>
                <p style={p}>
                  Calculating your required term insurance cover involves balancing two proven methodologies: the Human Life Value (HLV) approach and the Income Multiplier rule.
                </p>
                <p style={p}>
                  The Human Life Value method calculates the net present value of all future earnings you will contribute to your household until retirement.
                </p>
                <p style={p}>
                  From your gross annual salary, subtract personal taxes and maintenance expenses (typically 25% to 30%). The remaining cash flow represents your family's dependency number.
                </p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark }}>
                    Recommended Cover = (Annual Household Expenses x Working Years) + Outstanding Debts + Future Major Goals - Liquid Financial Assets
                  </code>
                </div>
                <p style={p}>
                  Consider a 30-year-old software engineer earning Rs 15 lakh per year. Monthly household expenses are Rs 60,000, with a Rs 40 lakh home loan, Rs 20 lakh for child education, and Rs 15 lakh in savings.
                </p>
                <p style={p}>
                  Income replacement needed: Rs 2.16 crore (Rs 7.2 lakh x 30 years) + Rs 40 lakh debt + Rs 20 lakh education - Rs 15 lakh assets = Rs 2.61 crore. Rounding to standard increments: Rs 2.5 to Rs 3 crore recommended cover.
                </p>
              </div>

              {/* Section 5 */}
              <div style={sec}>
                <h2 style={h2} id="salaried-vs-self-employed">
                  Term Insurance for Salaried vs Self-Employed Individuals
                </h2>
                <p style={p}>
                  Indian life insurance companies underwrite salaried and self-employed applicants under distinct income assessment standards.
                </p>
                <p style={p}>
                  Salaried individuals demonstrate regular cash flow using Form 16 and 3-6 months of salary bank credits. Because employment is steady, insurers permit coverage up to 25x gross income for applicants under age 35.
                </p>
                <p style={p}>
                  Self-employed professionals submit Income Tax Returns (ITR) with audited P&L and balance sheets for 2-3 years. Insurers assess average taxable income after business expenses.
                </p>
                <p style={p}>
                  Self-employed earners can also use surrogate proofs: car ownership, GST returns, and active housing loan statements.
                </p>
              </div>

              {/* Section 6 */}
              <div style={sec}>
                <h2 style={h2} id="term-plan-riders">
                  Term Plan Riders: Critical Illness, Accidental Death, and Waiver of Premium
                </h2>
                <p style={p}>
                  Policy riders are optional add-on benefits that enhance the core life cover by providing financial compensation during specific life events.
                </p>
                <p style={p}>
                  The Critical Illness Rider provides a lump-sum payout upon diagnosis of covered conditions: cancer, stroke, kidney failure, coronary bypass surgery, etc.
                </p>
                <p style={p}>
                  Unlike health insurance which reimburses hospital bills, this lump sum covers living costs, alternative treatments, and income loss during recovery.
                </p>
                <p style={p}>
                  The Accidental Death Benefit Rider pays an additional sum assured if death is accidental, doubling total claim payout.
                </p>
                <p style={p}>
                  The Waiver of Premium Rider waives all future premiums if you become permanently disabled, keeping full cover intact without further cost.
                </p>
              </div>

              {/* Section 7 */}
              <div style={sec}>
                <h2 style={h2} id="term-vs-endowment-ulip">
                  Term Insurance vs Endowment vs ULIP vs Return of Premium (TROP)
                </h2>
                <p style={p}>
                  Comparing traditional life insurance vehicles demonstrates why pure term insurance provides superior financial efficiency for family risk protection.
                </p>

                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Feature</th>
                        <th style={thS} scope="col">Pure Term Insurance</th>
                        <th style={thS} scope="col">Term Return of Premium (TROP)</th>
                        <th style={thS} scope="col">Endowment Plan</th>
                        <th style={thS} scope="col">ULIP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Primary Purpose', 'Pure financial protection', 'Protection with return of basic premium', 'Guaranteed savings + life cover', 'Market-linked investment + cover'],
                        ['Monthly Cost for Rs 1 Cr (Age 30)', 'Rs 700 to Rs 950', 'Rs 1,800 to Rs 2,500', 'Rs 6,000 to Rs 10,000', 'Rs 5,000 to Rs 8,000'],
                        ['Maturity / Survival Benefit', 'Zero payout', 'Refund of total base premiums paid', 'Sum assured + declared bonuses', 'Total accumulated fund value'],
                        ['Internal Rate of Return (IRR)', 'Not applicable (pure cost)', '0% to 1.5% nominal return', '4.5% to 5.8% tax-free', '8% to 12% (market-linked)'],
                        ['Best Suited For', 'All income earners with dependents', 'Buyers seeking psychological comfort', 'Conservative capital preservation', 'Long-term equity wealth building'],
                      ].map((row, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{row[0]}</td>
                          <td style={tdR}>{row[1]}</td>
                          <td style={tdR}>{row[2]}</td>
                          <td style={tdR}>{row[3]}</td>
                          <td style={tdR}>{row[4]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Buying pure term insurance and investing the saved premium difference in diversified index mutual funds or Public Provident Fund (PPF) consistently builds a larger corpus than bundled endowment plans.
                </p>

                {/* In-Content Promo Bar */}
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', margin: '24px 0' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 700, color: C.dark, margin: '0 0 3px' }}>
                      Life Insurance Calculator
                    </p>
                    <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>
                      Compare your life insurance cover across term, endowment, and ULIP vehicles, and calculate exact capital growth under each scenario.
                    </p>
                  </div>
                  <Link className="fx-btn"
                    href="/calculators/life-insurance-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: '#E9ECEE', border: '1px solid #D3D7DA',
                      color: '#101214',
                      fontFamily: INTER,
                      fontSize: 13,
                      fontWeight: 600,
                      padding: '9px 18px',
                      borderRadius: 8,
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    Open calculator
                  </Link>
                </div>
              </div>

              {/* Section 8 */}
              <div style={sec}>
                <h2 style={h2} id="tax-benefits">
                  Tax Benefits Under Section 80C and Section 10(10D)
                </h2>
                <p style={p}>
                  Term insurance policies enjoy double tax benefits under the Indian Income Tax Act, 1961, covering both the premium payment phase and the claim settlement phase.
                </p>
                <p style={p}>
                  Annual premiums qualify for deduction under Section 80C up to Rs 1.5 lakh per year (old tax regime). Policies for yourself, spouse, or dependent children all qualify.
                </p>
                <p style={p}>
                  At 30% tax bracket with 4% cess, Rs 20,000 annual premium saves Rs 6,240 in taxes.
                </p>
                <p style={p}>
                  Death benefits paid to nominees are 100% exempt under Section 10(10D). For policies after April 2012, annual premiums must not exceed 10% of sum assured.
                </p>
                <p style={p}>
                  Term premiums are less than 1.5% of sum assured, so all payouts automatically satisfy this criterion.
                </p>
              </div>

              {/* Section 9 */}
              <div style={sec}>
                <h2 style={h2} id="claim-settlement-ratio">
                  Claim Settlement Ratio (CSR) and the Section 45 3-Year Rule
                </h2>
                <p style={p}>
                  The Claim Settlement Ratio (CSR) is the primary metric evaluated by financial analysts to assess an insurer reliability when settling death claims.
                </p>
                <p style={p}>
                  CSR is the percentage of claims paid vs. total claims received in a financial year. Top insurers maintain CSR between 98.0% and 99.8% per IRDAI records.
                </p>
                <p style={p}>
                  Also check: claim repudiation rate and average settlement turnaround time.
                </p>
                <p style={p}>
                  Section 45 of the Insurance Act, 1938 shields policyholders: no policy can be repudiated after 3 years from issuance or revival.
                </p>
                <p style={p}>
                  Even if non-disclosure or misstatement occurred in the proposal, claims must be honored in full after 36 months.
                </p>
              </div>

              {/* Section 10 */}
              <div style={sec}>
                <h2 style={h2} id="how-to-use">
                  How to Use This Term Insurance Calculator
                </h2>
                <p style={p}>
                  This tool operates across two dedicated calculation modes to help you plan adequate life protection and estimate premium outgo.
                </p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12, listStyleType: 'decimal' }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Premium Estimator:</strong> Choose sum assured using presets or slider. Enter age, term, gender, smoker status, and payment frequency for exact quotes.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Cover Needed (HLV):</strong> Enter salary, expenses, age, and retirement horizon. Use More Settings for debts and assets. Gets your recommended cover.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Policy Schedule:</strong> Expand the year-by-year table to see bar chart, premiums, Section 80C tax savings, and net costs.
                  </li>
                </ol>
                <p style={{ ...p, margin: 0 }}>
                  Click any slider value display to type numbers directly into the calculator. The multi-currency selector allows NRIs to view all figures converted into USD, EUR, or GBP seamlessly.
                </p>
              </div>

              {/* Section 11: When to Buy Term Insurance */}
              <div style={sec}>
                <h2 style={h2} id="when-to-buy-term-insurance">
                  When to Buy Term Insurance
                </h2>
                <p style={p}>
                  The best time to buy term insurance is now — specifically, while you are young, healthy, and insurable. Premiums at age 25 are roughly one-third the cost at age 35 for identical coverage. A 30-year policy bought today locks in that cheaper rate for your entire working life.
                </p>
                <p style={p}>
                  Buy before any health diagnosis. Once diagnosed with diabetes, hypertension, or heart disease, insurers either reject applications or charge 50-100% higher premiums. Similarly, buy before dependents arrive (spouse, children, home loan) — retroactively protecting them costs more than protecting them from day one.
                </p>
              </div>

              {/* Section 12: Age-Based Coverage Strategy */}
              <div style={sec}>
                <h2 style={h2} id="term-insurance-by-age">
                  Term Insurance Coverage by Age Group
                </h2>
                <p style={p}>
                  Your life coverage requirement evolves across career stages. Age-based strategies balance affordable premiums early in life with adequate protection at each stage.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>Recommended term insurance coverage and premium estimates by age</caption>
                    <thead><tr><th style={thS} scope="col">Age Range</th><th style={thS} scope="col">Recommended Cover</th><th style={thS} scope="col">Monthly Premium (1 Cr)</th><th style={thS} scope="col">Strategy</th></tr></thead>
                    <tbody>
                      {[
                        ['22-30 (Entry career)', 'Rs 50 Lakh - Rs 1 Cr', 'Rs 500-650', 'Lock in lowest premiums. Build 20-30 year coverage. Start with 50 Lakh, upgrade as income grows.'],
                        ['30-40 (Mid-career)', 'Rs 1 Cr - Rs 2 Cr', 'Rs 700-900', 'Add coverage for home loan, growing dependents. Consider term increase riders or buy additional policies.'],
                        ['40-50 (Peak earning)', 'Rs 1.5 Cr - Rs 3 Cr', 'Rs 1,200-1,600', 'Maximize existing coverage before insurability declines. Add premium protection for remaining liabilities.'],
                        ['50-55 (Pre-retirement)', 'Rs 50 Lakh - Rs 1.5 Cr', 'Rs 2,500-4,500', 'Lock refinanced home loan tenure. Reduce cover as loans pay down. Critical last window for new policies.'],
                      ].map(([age, cover, premium, strategy]) => (
                        <tr key={age as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{age}</td>
                          <td style={tdR}>{cover}</td>
                          <td style={tdR}>{premium}</td>
                          <td style={tdL}>{strategy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The cost advantage of buying term insurance young is massive. A 25-year-old paying Rs 600/month for 30 years costs Rs 2.16 lakh total. A 35-year-old buying the same cover pays Rs 1,000/month — Rs 3.6 lakh over 30 years — despite identical coverage. Delaying 10 years costs an extra Rs 1.44 lakh.
                </p>
              </div>

              {/* Section 12: Income-Based Coverage Strategy */}
              <div style={sec}>
                <h2 style={h2} id="term-insurance-by-income">
                  Term Insurance Strategy by Monthly Income
                </h2>
                <p style={p}>
                  A common rule: carry life cover of 10-15x annual income. But this changes based on actual household expenses, existing debts, and financial dependents.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>Coverage adequacy and premium allocation by income level</caption>
                    <thead><tr><th style={thS} scope="col">Monthly Income</th><th style={thS} scope="col">Annual Income</th><th style={thS} scope="col">Recommended Cover</th><th style={thS} scope="col">Est. Monthly Premium</th><th style={thS} scope="col">Premium % of Income</th></tr></thead>
                    <tbody>
                      {[
                        ['Rs 30,000', 'Rs 3.6L', 'Rs 30-50L', 'Rs 200-300', '0.7-1%'],
                        ['Rs 50,000', 'Rs 6L', 'Rs 60-90L', 'Rs 350-500', '0.7-1%'],
                        ['Rs 75,000', 'Rs 9L', 'Rs 90L-1.25Cr', 'Rs 600-800', '0.8-1%'],
                        ['Rs 1,00,000', 'Rs 12L', 'Rs 1.2-1.8Cr', 'Rs 900-1,200', '0.9-1.2%'],
                        ['Rs 1,50,000', 'Rs 18L', 'Rs 1.8-2.5Cr', 'Rs 1,500-2,000', '1-1.3%'],
                        ['Rs 2,00,000+', 'Rs 24L+', 'Rs 2.5-5Cr', 'Rs 2,500-5,000', '1.2-2.5%'],
                      ].map(([monthly, annual, cover, premium, percent]) => (
                        <tr key={monthly as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{monthly}</td>
                          <td style={tdR}>{annual}</td>
                          <td style={tdR}>{cover}</td>
                          <td style={tdR}>{premium}</td>
                          <td style={tdR}>{percent}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 13: Self-Employed and NRI-Specific */}
              <div style={sec}>
                <h2 style={h2} id="term-insurance-self-employed-nri">
                  Term Insurance for Self-Employed and NRI Investors
                </h2>
                <p style={p}>
                  Self-employed business owners and NRIs face distinct coverage challenges. Income proof requirements, tax optimization opportunities, and repatriation rules differ significantly from salaried employees.
                </p>
                <p style={p}>
                  <strong>For Self-Employed:</strong> Insurers require 2-3 years of Income Tax Returns with audited financials to verify income. Cover requirements are higher because business interruption during illness also affects family income. Recommended coverage: 15-20x annual net income. Some advisers recommend buying multiple small policies (Rs 50 Lakh each) from different insurers to optimize underwriting acceptance and claim payout coordination.
                </p>
                <p style={p}>
                  <strong>For NRIs:</strong> Indian-sourced income (rental, pension, dividend) is taxable in India and must be covered under an Indian term policy. Foreign-earned income is covered under NRE/NRO banking and typically does not require a separate Indian policy, though many NRIs maintain dual coverage for convenience. Death claim payouts are fully repatriable under FEMA rules without any upper limit. Premiums can be paid from NRE accounts, and many insurers offer tele-medical underwriting for overseas applicants.
                </p>
              </div>

              {/* Section 14: Common Term Insurance Mistakes */}
              <div style={sec}>
                <h2 style={h2} id="term-insurance-mistakes">
                  Common Term Insurance Mistakes to Avoid
                </h2>
                <div>
                  {[
                    ['Underestimating cover needs', 'Using only the 10x income rule without accounting for existing debt, inflation, and remaining working years. A Rs 1 Cr cover bought at age 25 has similar purchasing power to roughly Rs 20-30 Lakh by age 45 due to 5-6% inflation. Re-evaluate cover every 5 years.'],
                    ['Lying about smoking status', 'Insurers conduct cotinine urine tests during underwriting. Hiding tobacco use is material non-disclosure, leading to automatic claim rejection under Section 45 (even within the 3-year window if caught). Pay the smoker premium honestly.'],
                    ['Choosing 10-year terms on home loans', 'If you buy a 30-year home loan, buy a 30-year term plan, not 10-year. A 10-year policy expiring while you still owe Rs 2 Cr is worthless to your family. Match the tenure to outstanding liabilities, not current comfort with premium.'],
                    ['Not locking in a policy before health declines', 'Health conditions diagnosed after age 40 (diabetes, hypertension, high cholesterol) can either block insurance approval or spike premiums by 50-100%. Buy coverage while young and healthy, well before any diagnosis.'],
                    ['Ignoring rider options', 'Critical Illness Rider (CSR) adds Rs 40-80/month for a Rs 1 Cr cover but covers 40+ diseases. Waiver of Premium Rider covers premiums during disability. These are cheap relative to standalone CI policies and should be standard.'],
                    ['Buying too small a policy to save premium', 'Rs 25 Lakh cover at Rs 200/month feels "affordable" but leaves a family in genuine hardship. Buy coverage you actually need, or buy smaller amounts spread across multiple policies. Do not sacrifice adequacy to feel cheap.'],
                  ].map(([title, text], i) => (
                    <div key={i} style={{ ...bul, marginBottom: 14, gap: 0, flexDirection: 'column' as const }}>
                      <strong style={{ fontSize: 15, color: C.ink, marginBottom: 4 }}>{title}</strong>
                      <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              

              {/* FAQ Section */}
              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">
                  Frequently Asked Questions
                </h2>
                <FAQ />
              </div>

              {/* Disclaimer */}
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations, premium estimations, and tax projections on this page are indicative and meant solely for financial planning and educational purposes. Actual term insurance premiums are determined by individual underwriting, comprehensive medical evaluations, family health history, and official rate filings approved by IRDAI. Past claim settlement ratios do not guarantee future claim settlements. Consult an IRDAI-licensed insurance adviser or SEBI-registered investment adviser before purchasing insurance policies.
                </p>
              </div>
            </article>
          </div>

          {/* ── SIDEBAR (VPF Parity: Sticky, Custom Scrollbar, No Ad Box) ── */}
          <style>{`
            .tic-sidebar::-webkit-scrollbar { width: 5px; }
            .tic-sidebar::-webkit-scrollbar-track { background: transparent; }
            .tic-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .tic-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            aria-label="Related calculators and insurance facts"
            className="tic-sidebar"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
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
            <InsuranceQuickFacts />
            <SidebarList title="Popular Calculators" items={POPULAR} />
            <SidebarList title="More Calculators" items={MORE} />
          </aside>
        </div>
      </div>

      {/* ── FOOTER (VPF Parity with all calculator links opening in new tab) ── */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: [ '/calculators/term-insurance-calculator|Term Insurance', '/calculators/life-insurance-calculator|Life Insurance', '/calculators/sip-calculator|SIP Calculator', '/calculators/emi-calculator|EMI Calculator', '/calculators/ppf-calculator|PPF Calculator', '/calculators/nps-calculator|NPS Calculator', '/calculators/cagr-calculator|CAGR Calculator', ], },
        { hd: 'Topics', links: [ '/calculators/term-insurance-calculator|Term Insurance', '/calculators/life-insurance-calculator|Human Life Value', '/calculators/income-tax-calculator|80C Deductions', '/calculators/retirement-calculator|Retirement', ], },
        { hd: 'Company', links: [ '/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact', ], },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

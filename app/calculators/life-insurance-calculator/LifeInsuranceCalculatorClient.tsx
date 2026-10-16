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
import { FAQS } from './lifeInsuranceData';
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

type Mode = 'cover' | 'premium' | 'comparison';
type PlanType = 'term' | 'endowment' | 'ulip' | 'wholeLife';
type Gender = 'male' | 'female';
type SmokerStatus = 'non-smoker' | 'smoker';
type PaymentMode = 'monthly' | 'quarterly' | 'half-yearly' | 'yearly';

interface YearScheduleRow {
  year: number;
  age: number;
  annualPremium: number;
  cumulativePremium: number;
  taxSaved: number;
  netCost: number;
  activeCover: number;
}

function getActuarialRate(plan: PlanType, age: number, isSmoker: boolean, isFemale: boolean, sumAssured: number): number {
  let baseRate = 0.55 * Math.pow(1.064, Math.max(0, age - 20));
  if (isFemale) baseRate *= 0.85;
  if (isSmoker) baseRate *= 1.75;

  if (plan === 'term') {
    if (sumAssured >= 20000000) baseRate *= 0.90;
    else if (sumAssured >= 10000000) baseRate *= 0.95;
    return Math.round(baseRate * 100) / 100;
  }
  if (plan === 'endowment') {
    const endowmentBase = 42 + (age - 20) * 0.45;
    return Math.round(endowmentBase * (isSmoker ? 1.15 : 1.0) * 100) / 100;
  }
  if (plan === 'ulip') {
    const ulipMortality = baseRate + 2.5;
    return Math.round(ulipMortality * 100) / 100;
  }
  if (plan === 'wholeLife') {
    const wlBase = 16 + (age - 20) * 0.35;
    return Math.round(wlBase * (isSmoker ? 1.35 : 1.0) * (isFemale ? 0.9 : 1.0) * 100) / 100;
  }
  return baseRate;
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

/* ─── Stacked Bar Chart for Policy Schedule (VPF Parity) ─────── */
function BarChart({ rows }: { rows: YearScheduleRow[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxAnnual = Math.max(...rows.map(r => r.annualPremium + r.taxSaved));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;
  return (
    <svg
      role="img"
      aria-label="Year-by-year premium and tax savings breakdown"
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
            <rect x={x} y={H - totalH} width={barW} height={taxH} fill={CHART_PAIR.secondary} rx={2} />
            <rect x={x} y={H - premH} width={barW} height={premH} fill={CHART_PAIR.primary} rx={2} />
            {rows.length <= 35 && (i % 2 === 0 || rows.length <= 20) && (
              <text
                x={x + barW / 2}
                y={H + 14}
                textAnchor="middle"
                style={{ fontSize: rows.length > 20 ? 8 : 9, fill: C.ink3, fontFamily: INTER }}
              >
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
    { label: 'Tata AIA Claim Ratio', value: '99.1%' },
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
  { href: '/calculators/term-insurance-calculator',         label: 'Term Insurance Calculator' },
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
export default function LifeInsuranceCalculatorClient({ region = 'in' }: { region?: string }) {
  const [mode, setModeState] = useState<Mode>('cover');
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
  const [childrenEducationCost, setChildrenEducationCost] = useState(2500000);
  const [expectedInflation, setExpectedInflation] = useState(6);

  /* Mode 2: Premium Estimator State */
  const [sumAssured, setSumAssured] = useState(10000000);
  const [planType, setPlanType] = useState<PlanType>('term');
  const [premiumAge, setPremiumAge] = useState(28);
  const [policyTerm, setPolicyTerm] = useState(30);
  const [gender, setGender] = useState<Gender>('male');
  const [smokerStatus, setSmokerStatus] = useState<SmokerStatus>('non-smoker');
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('monthly');

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
      const saved = localStorage.getItem('fermor-life-insurance-v1');
      if (saved) {
        const p = JSON.parse(saved);
        if (p.mode !== undefined) setModeState(p.mode);
        if (p.currentAge !== undefined) setCurrentAge(p.currentAge);
        if (p.retirementAge !== undefined) setRetirementAge(p.retirementAge);
        if (p.annualIncome !== undefined) setAnnualIncome(p.annualIncome);
        if (p.monthlyExpenses !== undefined) setMonthlyExpenses(p.monthlyExpenses);
        if (p.outstandingLoans !== undefined) setOutstandingLoans(p.outstandingLoans);
        if (p.existingInvestments !== undefined) setExistingInvestments(p.existingInvestments);
        if (p.childrenEducationCost !== undefined) setChildrenEducationCost(p.childrenEducationCost);
        if (p.expectedInflation !== undefined) setExpectedInflation(p.expectedInflation);
        if (p.sumAssured !== undefined) setSumAssured(p.sumAssured);
        if (p.planType !== undefined) setPlanType(p.planType);
        if (p.premiumAge !== undefined) setPremiumAge(p.premiumAge);
        if (p.policyTerm !== undefined) setPolicyTerm(p.policyTerm);
        if (p.gender !== undefined) setGender(p.gender);
        if (p.smokerStatus !== undefined) setSmokerStatus(p.smokerStatus);
        if (p.paymentMode !== undefined) setPaymentMode(p.paymentMode);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        'fermor-life-insurance-v1',
        JSON.stringify({
          mode,
          currentAge,
          retirementAge,
          annualIncome,
          monthlyExpenses,
          outstandingLoans,
          existingInvestments,
          childrenEducationCost,
          expectedInflation,
          sumAssured,
          planType,
          premiumAge,
          policyTerm,
          gender,
          smokerStatus,
          paymentMode,
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
    childrenEducationCost,
    expectedInflation,
    sumAssured,
    planType,
    premiumAge,
    policyTerm,
    gender,
    smokerStatus,
    paymentMode,
  ]);

  const setMode = (v: Mode) => {
    setModeState(v);
    setShowAdvanced(false);
  };

  /* ─── Mode 1 Calculation: Cover Needed (Needs & HLV Method) ─── */
  const coverResult = useMemo(() => {
    const workingYears = Math.max(1, retirementAge - currentAge);
    const annualFamilyExpense = monthlyExpenses * 12;
    const incomeReplacementNeed = annualFamilyExpense * workingYears;
    const grossNeed = incomeReplacementNeed + outstandingLoans + childrenEducationCost;
    const recommendedCover = Math.max(2500000, Math.round((grossNeed - existingInvestments) / 500000) * 500000);
    const inflationFactor = Math.pow(1 + expectedInflation / 100, Math.min(workingYears, 20));
    const inflationAdjustedCover = Math.round((recommendedCover * inflationFactor) / 500000) * 500000;
    const ratePerThousand = getActuarialRate('term', currentAge, false, false, recommendedCover);
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
    childrenEducationCost,
    expectedInflation,
  ]);

  /* ─── Mode 2 Calculation: Premium & Plan Estimator ─── */
  const premiumResult = useMemo(() => {
    const isSmoker = smokerStatus === 'smoker';
    const isFemale = gender === 'female';
    const ratePerThousand = getActuarialRate(planType, premiumAge, isSmoker, isFemale, sumAssured);
    const modeFactors: Record<PaymentMode, number> = {
      yearly: 1.0,
      'half-yearly': 1.02,
      quarterly: 1.04,
      monthly: 1.056,
    };
    const annualBasePremium = Math.round((sumAssured * ratePerThousand) / 1000);
    const annualWithMode = Math.round(annualBasePremium * modeFactors[paymentMode]);
    const gstRate = planType === 'term' ? 0.18 : 0.045;
    const gstAmount = Math.round(annualWithMode * gstRate);
    const annualTotalPremium = annualWithMode + gstAmount;
    const monthlyPremium = Math.round(annualTotalPremium / 12);
    const totalPaidOverTerm = annualTotalPremium * policyTerm;
    const annual80cSaving = Math.round(Math.min(annualTotalPremium, 150000) * 0.312);
    const totalTaxSaved = annual80cSaving * policyTerm;
    const netEffectiveCost = Math.max(0, totalPaidOverTerm - totalTaxSaved);

    let estimatedMaturityValue = 0;
    if (planType === 'term') {
      estimatedMaturityValue = 0;
    } else if (planType === 'endowment') {
      const bonusPerYear = (sumAssured * 45) / 1000;
      estimatedMaturityValue = Math.round(sumAssured + bonusPerYear * policyTerm);
    } else if (planType === 'ulip') {
      const annualInvested = annualBasePremium * 0.95;
      const r = 0.10;
      estimatedMaturityValue = Math.round(annualInvested * (((Math.pow(1 + r, policyTerm) - 1) / r) * (1 + r)));
    } else if (planType === 'wholeLife') {
      estimatedMaturityValue = sumAssured;
    }

    return {
      ratePerThousand,
      annualBasePremium,
      annualTotalPremium,
      monthlyPremium,
      totalPaidOverTerm,
      annual80cSaving,
      totalTaxSaved,
      netEffectiveCost,
      estimatedMaturityValue,
    };
  }, [
    planType,
    premiumAge,
    policyTerm,
    sumAssured,
    gender,
    smokerStatus,
    paymentMode,
  ]);

  /* ─── Mode 3 Calculation: Side-by-Side Comparison ─── */
  const comparisonList = useMemo(() => {
    const plans: { type: PlanType; label: string }[] = [
      { type: 'term', label: 'Term Insurance' },
      { type: 'endowment', label: 'Endowment Plan' },
      { type: 'ulip', label: 'ULIP (Market Linked)' },
      { type: 'wholeLife', label: 'Whole Life Plan' },
    ];
    const isSmoker = smokerStatus === 'smoker';
    const isFemale = gender === 'female';

    return plans.map(p => {
      const rate = getActuarialRate(p.type, premiumAge, isSmoker, isFemale, sumAssured);
      const basePrem = Math.round((sumAssured * rate) / 1000);
      const gst = p.type === 'term' ? 0.18 : 0.045;
      const annPrem = Math.round(basePrem * (1 + gst));
      const totalPrem = annPrem * policyTerm;
      let maturity = 0;
      if (p.type === 'endowment') {
        maturity = Math.round(sumAssured + ((sumAssured * 45) / 1000) * policyTerm);
      } else if (p.type === 'ulip') {
        const inv = basePrem * 0.95;
        const r = 0.10;
        maturity = Math.round(inv * (((Math.pow(1 + r, policyTerm) - 1) / r) * (1 + r)));
      } else if (p.type === 'wholeLife') {
        maturity = sumAssured;
      }
      return {
        type: p.type,
        label: p.label,
        rate,
        annualPremium: annPrem,
        monthlyPremium: Math.round(annPrem / 12),
        totalPremium: totalPrem,
        maturityValue: maturity,
      };
    });
  }, [sumAssured, premiumAge, policyTerm, gender, smokerStatus]);

  /* ─── Year-by-Year Schedule Generation ─── */
  const scheduleRows = useMemo((): YearScheduleRow[] => {
    const rows: YearScheduleRow[] = [];
    const termYears = mode === 'cover' ? coverResult.workingYears : policyTerm;
    const startAge = mode === 'cover' ? currentAge : premiumAge;
    const annualCost = mode === 'cover' ? coverResult.estAnnualPremium : premiumResult.annualTotalPremium;
    const taxSavingYear = mode === 'cover' ? Math.round(Math.min(annualCost, 150000) * 0.312) : premiumResult.annual80cSaving;
    const activeCover = mode === 'cover' ? coverResult.recommendedCover : sumAssured;

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
  }, [mode, policyTerm, premiumAge, premiumResult, coverResult, currentAge, sumAssured]);

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const h3  = { fontSize: mobile ? 14.5 : 16.5, fontWeight: 700, color: C.ink, margin: '18px 0 10px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 14px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;

  /* Colorless table styles per explicit user constraint */
  const thNeutral = {
    padding: '10px 14px',
    fontSize: 11.5,
    fontWeight: 700,
    color: C.ink,
    background: 'transparent',
    textAlign: 'left' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    border: `1px solid ${C.border}`,
    whiteSpace: 'nowrap' as const,
  } as React.CSSProperties;

  const tdNeutralL = {
    padding: '10px 14px',
    fontSize: 13.5,
    color: C.ink2,
    border: `1px solid ${C.border}`,
    background: 'transparent',
    verticalAlign: 'top' as const,
  } as React.CSSProperties;

  const tdNeutralR = {
    padding: '10px 14px',
    fontSize: 13.5,
    color: C.ink,
    fontWeight: 500,
    border: `1px solid ${C.border}`,
    background: 'transparent',
    verticalAlign: 'top' as const,
  } as React.CSSProperties;

  /* Donut values calculation */
  const donutA = mode === 'cover' ? coverResult.recommendedCover : premiumResult.totalPaidOverTerm;
  const donutB = mode === 'cover' ? existingInvestments : Math.max(0, sumAssured - premiumResult.totalPaidOverTerm);
  const donutLabelA = mode === 'cover' ? 'Recommended Cover' : 'Premiums Paid';
  const donutLabelB = mode === 'cover' ? 'Existing Assets' : 'Risk Cover Value';
  const donutPctA = Math.round((donutA / (donutA + donutB || 1)) * 100);
  const donutPctB = 100 - donutPctA;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        {/* Header */}
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Life Insurance Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate your recommended life cover, compare plan premiums, and evaluate policy maturity benefits using actuarial methods.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>
            {/* ── CALCULATOR MAIN CARD ── */}
            <section
              aria-label="Life Insurance Calculator"
              style={{
                background: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 1px 16px rgba(16,18,20,0.06)',
                marginBottom: 40,
              }}
            >
              {/* VPF Underlined Tabs */}
              <div
                role="tablist"
                aria-label="Calculator mode"
                style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}
              >
                {([
                  { id: 'cover',      label: 'Cover Needed',     desc: 'Calculate recommended life insurance cover using income and expense methods' },
                  { id: 'premium',    label: 'Plan Estimator',   desc: 'Estimate premium and maturity across Term, Endowment, ULIP, and Whole Life' },
                  { id: 'comparison', label: 'Plan Comparison',  desc: 'Side-by-side cost and benefit comparison across plan types' },
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

                  {/* Mode 1: Cover Needed Inputs */}
                  {mode === 'cover' && (
                    <>
                      {!showAdvanced ? (
                        <>
                          <Slider
                            label="Annual Income (Salary or Profits)"
                            id="lic-inc"
                            value={annualIncome}
                            min={300000}
                            max={10000000}
                            step={50000}
                            fmt={fmtC}
                            onChange={setAnnualIncome}
                            compact={mobile}
                          />

                          <Slider
                            label="Monthly Family Living Expenses"
                            id="lic-exp"
                            value={monthlyExpenses}
                            min={15000}
                            max={500000}
                            step={5000}
                            fmt={fmtC}
                            onChange={setMonthlyExpenses}
                            compact={mobile}
                          />

                          <Slider
                            label="Your Current Age"
                            id="lic-age"
                            value={currentAge}
                            min={18}
                            max={60}
                            step={1}
                            fmt={v => `${v} yr`}
                            onChange={setCurrentAge}
                            compact={mobile}
                          />

                          <Slider
                            label="Retirement Age (Coverage Horizon)"
                            id="lic-retage"
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
                              <span>Gross Protection Requirement</span>
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
                            id="lic-loans"
                            value={outstandingLoans}
                            min={0}
                            max={20000000}
                            step={100000}
                            fmt={fmtC}
                            onChange={setOutstandingLoans}
                            compact={mobile}
                          />

                          <Slider
                            label="Existing Investments (PF, Mutual Funds, FD)"
                            id="lic-inv"
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
                            id="lic-edu"
                            value={childrenEducationCost}
                            min={0}
                            max={20000000}
                            step={100000}
                            fmt={fmtC}
                            onChange={setChildrenEducationCost}
                            compact={mobile}
                          />

                          <Slider
                            label="Expected Long-Term Inflation Rate"
                            id="lic-infl"
                            value={expectedInflation}
                            min={3}
                            max={10}
                            step={0.5}
                            fmt={v => `${v.toFixed(1)}%`}
                            onChange={setExpectedInflation}
                            compact={mobile}
                          />

                          <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.6, margin: '0 0 24px' }}>
                            Outstanding loans and education goals enlarge your cover need, whereas existing savings reduce the net protection gap.
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

                  {/* Mode 2: Premium & Plan Estimator Inputs */}
                  {mode === 'premium' && (
                    <>
                      {/* Plan Type Selector (Rule 17 Colorless) */}
                      <div style={{ marginBottom: 20 }}>
                        <label style={{ fontSize: 12, fontWeight: 600, color: C.ink3, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: 8 }}>
                          Insurance Plan Type
                        </label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                          {[
                            { type: 'term' as PlanType, label: 'Term Insurance' },
                            { type: 'endowment' as PlanType, label: 'Endowment Plan' },
                            { type: 'ulip' as PlanType, label: 'ULIP (Market)' },
                            { type: 'wholeLife' as PlanType, label: 'Whole Life' },
                          ].map(pItem => {
                            const active = planType === pItem.type;
                            return (
                              <button
                                key={pItem.type}
                                type="button"
                                onClick={() => setPlanType(pItem.type)}
                                style={{
                                  padding: '8px 10px',
                                  borderRadius: 7,
                                  cursor: 'pointer',
                                  fontFamily: INTER,
                                  fontSize: 12.5,
                                  transition: 'all 0.12s',
                                  background: active ? C.white : 'transparent',
                                  border: active ? `1.5px solid ${C.ink}` : `1px solid ${C.border}`,
                                  color: active ? C.ink : C.ink3,
                                  fontWeight: active ? 700 : 500,
                                  textAlign: 'center',
                                }}
                              >
                                {pItem.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Quick Presets for Sum Assured */}
                      <div style={{ marginBottom: 20 }}>
                        <label style={{ fontSize: 12, fontWeight: 600, color: C.ink3, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: 8 }}>
                          Cover Presets
                        </label>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {[
                            { val: 5000000, label: '50 Lakh' },
                            { val: 10000000, label: '1 Crore' },
                            { val: 20000000, label: '2 Crore' },
                            { val: 30000000, label: '3 Crore' },
                            { val: 50000000, label: '5 Crore' },
                          ].map(pill => {
                            const active = sumAssured === pill.val;
                            return (
                              <button
                                key={pill.val}
                                type="button"
                                onClick={() => setSumAssured(pill.val)}
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
                        label="Sum Assured (Life Cover)"
                        id="lic-sa"
                        value={sumAssured}
                        min={1000000}
                        max={50000000}
                        step={500000}
                        fmt={fmtC}
                        onChange={setSumAssured}
                        compact={mobile}
                      />

                      <Slider
                        label="Your Current Age"
                        id="lic-page"
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
                        id="lic-pterm"
                        value={policyTerm}
                        min={10}
                        max={45}
                        step={1}
                        fmt={v => `${v} yr (Up to age ${premiumAge + v})`}
                        onChange={setPolicyTerm}
                        compact={mobile}
                      />

                      {/* Gender and Smoker Toggles */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
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

                      {/* Payment Frequency Toggle */}
                      <div style={{ marginBottom: 20 }}>
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

                      {/* Derived box before more settings */}
                      <div style={{ padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: C.ink, fontWeight: 700, marginBottom: 4 }}>
                          <span>Annual Premium Outgo</span>
                          <span>{fmtC(premiumResult.annualTotalPremium)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.ink2, marginBottom: 2 }}>
                          <span>Rate per Rs 1,000 Sum Assured: Rs {premiumResult.ratePerThousand.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.ink2, fontWeight: 600 }}>
                          <span>Tax Saved (80C @ 30% slab): {fmtC(premiumResult.annual80cSaving)}</span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Mode 3: Plan Comparison Inputs */}
                  {mode === 'comparison' && (
                    <>
                      <div style={{ marginBottom: 20 }}>
                        <label style={{ fontSize: 12, fontWeight: 600, color: C.ink3, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: 8 }}>
                          Cover Presets
                        </label>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {[
                            { val: 5000000, label: '50 Lakh' },
                            { val: 10000000, label: '1 Crore' },
                            { val: 20000000, label: '2 Crore' },
                          ].map(pill => {
                            const active = sumAssured === pill.val;
                            return (
                              <button
                                key={pill.val}
                                type="button"
                                onClick={() => setSumAssured(pill.val)}
                                style={{
                                  padding: '6px 12px',
                                  borderRadius: 6,
                                  cursor: 'pointer',
                                  fontFamily: INTER,
                                  fontSize: 12.5,
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
                        label="Compare Sum Assured"
                        id="lic-cmp-sa"
                        value={sumAssured}
                        min={1000000}
                        max={50000000}
                        step={500000}
                        fmt={fmtC}
                        onChange={setSumAssured}
                        compact={mobile}
                      />

                      <Slider
                        label="Your Current Age"
                        id="lic-cmp-age"
                        value={premiumAge}
                        min={18}
                        max={65}
                        step={1}
                        fmt={v => `${v} yr`}
                        onChange={setPremiumAge}
                        compact={mobile}
                      />

                      <Slider
                        label="Comparison Term"
                        id="lic-cmp-term"
                        value={policyTerm}
                        min={10}
                        max={40}
                        step={1}
                        fmt={v => `${v} yr`}
                        onChange={setPolicyTerm}
                        compact={mobile}
                      />

                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.6, margin: '8px 0 0' }}>
                        This comparison models how pure risk protection in Term insurance compares against savings accumulation in Endowment and ULIP products.
                      </p>
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
                      {mode === 'cover'
                        ? 'Recommended Life Cover'
                        : mode === 'premium'
                        ? 'Estimated Monthly Premium'
                        : 'Lowest Monthly Outgo (Term)'}
                    </span>
                    <span
                      aria-live="polite"
                      aria-label={
                        mode === 'cover'
                          ? `Recommended cover: ${fmtIN(coverResult.recommendedCover)}`
                          : mode === 'premium'
                          ? `Monthly premium: ${fmtIN(premiumResult.monthlyPremium)}`
                          : `Lowest premium: ${fmtIN(comparisonList[0]?.monthlyPremium || 0)}`
                      }
                      style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                    >
                      {mode === 'cover'
                        ? fmtIN(coverResult.recommendedCover)
                        : mode === 'premium'
                        ? fmtIN(premiumResult.monthlyPremium)
                        : fmtIN(comparisonList[0]?.monthlyPremium || 0)}
                    </span>
                  </div>

                  {/* Output Metric Rows */}
                  {mode === 'cover' && (
                    [
                      { label: 'Recommended Sum Assured', value: fmtC(coverResult.recommendedCover) },
                      { label: 'Income Multiplier', value: `${coverResult.incomeMultiplier}x annual income` },
                      { label: 'Estimated Starting Monthly Premium', value: fmtC(coverResult.estMonthlyPremium) },
                      { label: 'Estimated Starting Annual Premium', value: fmtC(coverResult.estAnnualPremium) },
                      { label: 'Protection Horizon', value: `${coverResult.workingYears} working years` },
                      { label: 'Inflation-Adjusted Target Need', value: fmtC(coverResult.inflationAdjustedCover) },
                      { label: 'Existing Liquid Assets', value: fmtC(existingInvestments) },
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

                  {mode === 'premium' && (
                    [
                      { label: 'Plan Chosen', value: planType === 'term' ? 'Term Insurance' : planType === 'endowment' ? 'Endowment Plan' : planType === 'ulip' ? 'ULIP' : 'Whole Life' },
                      { label: 'Sum Assured (Death Benefit)', value: fmtC(sumAssured) },
                      { label: 'Estimated Maturity Payout', value: fmtC(premiumResult.estimatedMaturityValue) },
                      { label: 'Annual Premium Outgo', value: fmtC(premiumResult.annualTotalPremium) },
                      { label: 'Total Premium Over Term', value: fmtC(premiumResult.totalPaidOverTerm) },
                      { label: 'Section 80C Tax Saved', value: fmtC(premiumResult.totalTaxSaved) },
                      { label: 'Net Effective Cost', value: fmtC(premiumResult.netEffectiveCost) },
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

                  {mode === 'comparison' && (
                    comparisonList.map(item => (
                      <div
                        key={item.type}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: mobile ? '10px 0' : '12px 0',
                          borderBottom: `1px solid ${C.border}`,
                          width: '100%',
                        }}
                      >
                        <div>
                          <span style={{ fontSize: 13.5, fontWeight: 700, color: C.ink, display: 'block' }}>{item.label}</span>
                          <span style={{ fontSize: 12, color: C.ink3 }}>Maturity: {fmtC(item.maturityValue)}</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>{fmtIN(item.monthlyPremium)}/mo</span>
                          <span style={{ fontSize: 11.5, color: C.ink3, display: 'block' }}>{fmtC(item.annualPremium)}/yr</span>
                        </div>
                      </div>
                    ))
                  )}

                  {/* VPF Donut Chart (Desktop: above progress bar, Mobile: ordered) */}
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
                      centerLabel={mode === 'cover' ? 'Cover Gap' : 'Cost Multiple'}
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
                  <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
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
                    aria-controls="life-schedule"
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
                          Annual premium outgo and cumulative Section 80C tax relief
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
                    <div id="life-schedule" style={{ borderTop: `1px solid ${C.border}` }}>
                      {/* Stacked Bar Chart */}
                      <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                        <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>Annual Outgo</span>
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
                        <table style={{ minWidth: 640, width: '100%', borderCollapse: 'collapse', fontSize: 13, background: C.white }}>
                          <thead>
                            <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                              {['Policy Year', 'Attained Age', 'Annual Outgo', 'Cumulative Premium', '80C Tax Saved', 'Net Cost', 'Active Life Cover'].map(h => (
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
                                    border: `1px solid ${C.border}`,
                                    background: 'transparent',
                                  }}
                                  scope="col"
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {scheduleRows.map(row => (
                              <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: 'transparent' }}>
                                <td style={{ padding: '11px 14px', fontWeight: 700, color: C.dark, border: `1px solid ${C.border}` }}>Year {row.year}</td>
                                <td style={{ padding: '11px 14px', color: C.ink2, border: `1px solid ${C.border}` }}>{row.age} yrs</td>
                                <td style={{ padding: '11px 14px', color: C.ink, fontWeight: 600, border: `1px solid ${C.border}` }}>{fmtIN(row.annualPremium)}</td>
                                <td style={{ padding: '11px 14px', color: C.ink2, border: `1px solid ${C.border}` }}>{fmtIN(row.cumulativePremium)}</td>
                                <td style={{ padding: '11px 14px', color: C.ink2, fontWeight: 600, border: `1px solid ${C.border}` }}>{fmtIN(row.taxSaved)}</td>
                                <td style={{ padding: '11px 14px', color: C.ink2, fontWeight: 600, border: `1px solid ${C.border}` }}>{fmtIN(row.netCost)}</td>
                                <td style={{ padding: '11px 14px', color: C.ink2, fontWeight: 600, border: `1px solid ${C.border}` }}>{fmtIN(row.activeCover)}</td>
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

            

                        {/* ── ARTICLE CONTENT (Strict Rules: Max 3 lines per paragraph, Zero table colors, Zero em dashes) ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>
              {/* Section 1 */}
              <div style={sec}>
                <h2 style={h2} id="what-is-life-insurance">
                  What Is Life Insurance and How Does It Work in India?
                </h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 14 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.65, margin: 0 }}>
                    Life insurance is a binding legal contract where an insurer guarantees a designated lump-sum payout to your nominees if you pass away during the policy term.
                  </p>
                </div>
                <p style={p}>
                  Our free life insurance calculator india helps you estimate adequate financial protection without agent commission markups or pushy phone calls.
                </p>
                <p style={p}>
                  In exchange for regular premium payments, the life insurance company absorbs your household financial risk. Certain policies also provide guaranteed survival or maturity payouts.
                </p>
                <p style={p}>
                  All life insurance companies in India operate under the strict statutory supervision of the Insurance Regulatory and Development Authority of India (IRDAI) under the Insurance Act, 1938.
                </p>
                <p style={p}>
                  Every life insurance policy involves four core entities: the policyholder who pays premiums, the insured life whose mortality is covered, the nominee who receives proceeds, and the insurer.
                </p>
                <p style={p}>
                  Two fundamental legal doctrines govern all policies: Insurable Interest, requiring a demonstrable financial loss upon death, and Utmost Good Faith, requiring complete medical disclosure.
                </p>

                {/* Terminology Table: strictly NO background colors */}
                <div style={{ overflowX: 'auto', marginBottom: 14 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13, background: C.white }}>
                    <thead>
                      <tr>
                        <th style={thNeutral} scope="col">Term</th>
                        <th style={thNeutral} scope="col">Definition & Practical Meaning</th>
                        <th style={thNeutral} scope="col">Regulatory Rule in India</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Sum Assured', 'The guaranteed tax-free amount paid to nominees upon death', 'Must be at least 10x annual premium for tax exemptions'],
                        ['Policy Term', 'The duration of active life insurance protection in years', 'Available from 5 years up to age 85 or whole life (age 99)'],
                        ['Grace Period', 'Extra time allowed to pay overdue premiums without policy lapse', '15 days for monthly modes; 30 days for quarterly and annual'],
                        ['Free-Look Period', 'Window to cancel policy for full refund minus stamp charges', '30 days for policies purchased online under IRDAI norms'],
                        ['Paid-Up Value', 'Reduced cover when premiums cease after completing 2 to 3 years', 'Policy continues with benefits reduced proportionately'],
                        ['Surrender Value', 'Cash paid by insurer if you voluntarily terminate before maturity', 'Guaranteed surrender value scales with elapsed policy years'],
                      ].map(([t, d, r]) => (
                        <tr key={t} style={{ borderBottom: `1px solid ${C.border}`, background: 'transparent' }}>
                          <td style={{ ...tdNeutralL, fontWeight: 700, color: C.ink }}>{t}</td>
                          <td style={tdNeutralL}>{d}</td>
                          <td style={tdNeutralL}>{r}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Understanding these structural terms ensures you maximize policy rights, avoid involuntary lapses, and exercise free-look cancellation if policy terms differ from expectations.
                </p>
              </div>

              {/* Section 2 */}
              <div style={sec}>
                <h2 style={h2} id="how-much-cover">
                  How Much Life Insurance Cover Do You Need? (HLV vs Expense Method)
                </h2>
                <p style={p}>
                  Using a life insurance requirement calculator prevents underinsuring your family or overspending on redundant protection.
                </p>
                <p style={p}>
                  Whether you use a life cover calculator or a life cover amount calculator, financial planners rely on two primary actuarial techniques: Human Life Value and Expense Replacement.
                </p>

                <h3 style={h3}>Method 1: Human Life Value (HLV) Calculation</h3>
                <p style={p}>
                  Human Life Value measures the present monetary value of your future net earnings until retirement, accounting for annual salary growth and investment discounting.
                </p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '12px 16px', marginBottom: 14 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 13.5, fontWeight: 700, color: C.dark }}>
                    HLV = (Annual Income - Personal Taxes & Expenses) x Present Value Factor (r, n)
                  </code>
                </div>
                <p style={p}>
                  For example, a 30-year-old earning Rs 15 lakh spending Rs 3 lakh on personal maintenance leaves Rs 12 lakh annual dependency. Over 30 working years at 4% net discount, HLV equals Rs 2.1 Crore.
                </p>

                <h3 style={h3}>Method 2: Need-Based Expense Replacement (D.I.M.E.)</h3>
                <p style={p}>
                  The Need-Based approach aggregates four tangible liabilities: Debts and loans, Income replacement for living expenses, Mortality and transition costs, and Education or marriage goals.
                </p>
                <p style={p}>
                  From this gross requirement, subtract all existing liquid investments including mutual funds, fixed deposits, and PF balances to derive your true net requirement.
                </p>

                {/* Coverage Matrix Table */}
                <div style={{ overflowX: 'auto', marginBottom: 14 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13, background: C.white }}>
                    <thead>
                      <tr>
                        <th style={thNeutral} scope="col">Household Profile</th>
                        <th style={thNeutral} scope="col">Gross Family Need</th>
                        <th style={thNeutral} scope="col">Existing Assets</th>
                        <th style={thNeutral} scope="col">Net Recommended Cover</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Single earner, no loans, 1 child', 'Rs 1.8 Crore (15 yrs expenses)', 'Rs 30 Lakh liquid savings', 'Rs 1.5 Crore Sum Assured'],
                        ['Dual income, Rs 50L home loan, 2 kids', 'Rs 3.2 Crore (loan + education)', 'Rs 70 Lakh PF & mutual funds', 'Rs 2.5 Crore Sum Assured'],
                        ['Single earner, Rs 80L debt, parents dependent', 'Rs 4.5 Crore (loan + living costs)', 'Rs 50 Lakh emergency fund', 'Rs 4.0 Crore Sum Assured'],
                        ['Young professional, unmarried, starting out', 'Rs 1.0 Crore (income replacement)', 'Rs 10 Lakh bank deposits', 'Rs 1.0 Crore Sum Assured'],
                      ].map(([prof, need, ast, rec]) => (
                        <tr key={prof} style={{ borderBottom: `1px solid ${C.border}`, background: 'transparent' }}>
                          <td style={{ ...tdNeutralL, fontWeight: 700, color: C.ink }}>{prof}</td>
                          <td style={tdNeutralL}>{need}</td>
                          <td style={tdNeutralL}>{ast}</td>
                          <td style={{ ...tdNeutralR, color: C.ink2, fontWeight: 600 }}>{rec}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  A comprehensive life insurance needs calculator and life insurance coverage calculator ensures college inflation and debt do not compromise your family lifestyle.
                </p>
              </div>

              {/* Section 3 */}
              <div style={sec}>
                <h2 style={h2} id="calculator-by-salary">
                  Life Insurance Calculator Based on Salary and Income (Comprehensive Matrix)
                </h2>
                <p style={p}>
                  Testing a life insurance calculator based on salary or life insurance calculator based on income gives you realistic coverage limits based on underwriting limits.
                </p>
                <p style={p}>
                  Whether using a life insurance calculator by income or life insurance calculator by salary, underwriters allow multiples indexed to age: up to 25x under 35, 20x for 36 to 45, and 15x up to 55.
                </p>

                {/* Salary Matrix Table */}
                <div style={{ overflowX: 'auto', marginBottom: 14 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13, background: C.white }}>
                    <thead>
                      <tr>
                        <th style={thNeutral} scope="col">Annual Salary</th>
                        <th style={thNeutral} scope="col">Underwriting Multiplier</th>
                        <th style={thNeutral} scope="col">Recommended Cover</th>
                        <th style={thNeutral} scope="col">Term Premium (Age 28)</th>
                        <th style={thNeutral} scope="col">Endowment Premium</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Rs 4 Lakh / yr', '20x to 25x earnings', 'Rs 75 Lakh to 1 Crore', 'Rs 490 to Rs 620 / mo', 'Rs 2,800 to Rs 3,600 / mo'],
                        ['Rs 8 Lakh / yr', '20x to 25x earnings', 'Rs 1.5 to 2 Crore', 'Rs 880 to Rs 1,150 / mo', 'Rs 5,500 to Rs 7,200 / mo'],
                        ['Rs 15 Lakh / yr', '15x to 20x earnings', 'Rs 2.5 to 3 Crore', 'Rs 1,520 to Rs 1,890 / mo', 'Rs 9,800 to Rs 12,500 / mo'],
                        ['Rs 25 Lakh / yr', '15x to 20x earnings', 'Rs 4 to 5 Crore', 'Rs 2,450 to Rs 3,100 / mo', 'Rs 16,000 to Rs 21,000 / mo'],
                        ['Rs 50 Lakh / yr', '12x to 15x earnings', 'Rs 6 to 7.5 Crore', 'Rs 3,950 to Rs 5,200 / mo', 'Rs 28,000 to Rs 38,000 / mo'],
                        ['Rs 1 Crore / yr', '10x to 12x earnings', 'Rs 10 to 12 Crore', 'Rs 7,200 to Rs 9,800 / mo', 'Rs 52,000 to Rs 72,000 / mo'],
                      ].map(([sal, mul, cov, tprem, eprem]) => (
                        <tr key={sal} style={{ borderBottom: `1px solid ${C.border}`, background: 'transparent' }}>
                          <td style={{ ...tdNeutralL, fontWeight: 700, color: C.ink }}>{sal}</td>
                          <td style={tdNeutralL}>{mul}</td>
                          <td style={tdNeutralL}>{cov}</td>
                          <td style={{ ...tdNeutralR, color: C.ink2, fontWeight: 600 }}>{tprem}</td>
                          <td style={tdNeutralR}>{eprem}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Our life insurance sum assured calculator india confirms that salaried employees with annual packages above Rs 15 lakh frequently opt for high sum assured pure term plans.
                </p>
                <p style={p}>
                  Self-employed earners can use a life insurance sum assured calculator and life insurance amount calculator with three years of audited accounts and ITR returns.
                </p>
              </div>

              {/* Section 4 */}
              <div style={sec}>
                <h2 style={h2} id="calculator-by-age">
                  Life Insurance Calculator by Age: The Cost of Postponing Cover
                </h2>
                <p style={p}>
                  Running a life insurance calculator by age or life insurance calculator with age demonstrates why age is the most influential determinant of life insurance cost.
                </p>
                <p style={p}>
                  Our 1 crore life insurance premium calculator models how mortality rates escalate with age, proving that locking in a policy in your twenties secures the lowest lifetime cost.
                </p>

                {/* Cost of Delay Table */}
                <div style={{ overflowX: 'auto', marginBottom: 14 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13, background: C.white }}>
                    <thead>
                      <tr>
                        <th style={thNeutral} scope="col">Entry Age</th>
                        <th style={thNeutral} scope="col">Monthly Premium (1 Cr Cover)</th>
                        <th style={thNeutral} scope="col">Annual Premium</th>
                        <th style={thNeutral} scope="col">30-Year Cumulative Cost</th>
                        <th style={thNeutral} scope="col">Lifetime Cost Increase</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Age 25', 'Rs 620 / mo', 'Rs 7,100 / yr', 'Rs 2,13,000', 'Baseline (Lowest cost)'],
                        ['Age 30', 'Rs 840 / mo', 'Rs 9,600 / yr', 'Rs 2,88,000', '+35% higher cost (+Rs 75,000)'],
                        ['Age 35', 'Rs 1,220 / mo', 'Rs 13,900 / yr', 'Rs 4,17,000', '+96% higher cost (+Rs 2,04,000)'],
                        ['Age 40', 'Rs 1,890 / mo', 'Rs 21,500 / yr', 'Rs 6,45,000', '+203% higher cost (+Rs 4,32,000)'],
                        ['Age 45', 'Rs 3,050 / mo', 'Rs 34,800 / yr', 'Rs 10,44,000', '+390% higher cost (+Rs 8,31,000)'],
                      ].map(([age, mprem, yprem, ctot, inc]) => (
                        <tr key={age} style={{ borderBottom: `1px solid ${C.border}`, background: 'transparent' }}>
                          <td style={{ ...tdNeutralL, fontWeight: 700, color: C.ink }}>{age}</td>
                          <td style={{ ...tdNeutralR, color: C.ink2, fontWeight: 600 }}>{mprem}</td>
                          <td style={tdNeutralR}>{yprem}</td>
                          <td style={tdNeutralR}>{ctot}</td>
                          <td style={{ ...tdNeutralL, fontSize: 12.5 }}>{inc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  A life insurance affordability calculator confirms that delaying cover from age 25 to age 35 doubles lifetime outgo, while exposing you to medical loading from lifestyle conditions.
                </p>
                <p style={p}>
                  Our life insurance cost calculator helps you plan insurance across life stages: maximum protection during debt and child-rearing years, tapering after retirement.
                </p>
              </div>

              {/* Section 5 */}
              <div style={sec}>
                <h2 style={h2} id="plan-types-compared">
                  Comparing Life Insurance Plans: Term vs Endowment vs ULIP vs Whole Life
                </h2>
                <p style={p}>
                  A versatile life insurance plan calculator and life insurance policy calculator lets you evaluate tradeoffs between pure protection, guaranteed bonuses, and market-linked wealth.
                </p>

                {/* 6 Plan Comparison Table */}
                <div style={{ overflowX: 'auto', marginBottom: 14 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13, background: C.white }}>
                    <thead>
                      <tr>
                        <th style={thNeutral} scope="col">Plan Category</th>
                        <th style={thNeutral} scope="col">Core Objective</th>
                        <th style={thNeutral} scope="col">Maturity Benefit</th>
                        <th style={thNeutral} scope="col">Typical Returns (IRR)</th>
                        <th style={thNeutral} scope="col">Annual Cost (1 Cr Cover)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Pure Term Insurance', 'Maximum family protection', 'Zero survival benefit', 'N/A (Pure risk hedge)', 'Rs 7,500 to Rs 12,000'],
                        ['Term with Return of Premium (TROP)', 'Capital refund if alive', '100% of base premiums returned', 'Negative real return (inflation)', 'Rs 18,000 to Rs 28,000'],
                        ['Endowment Plan', 'Guaranteed savings + cover', 'Sum assured plus accrued bonuses', '4.0% to 5.5% tax-free', 'Rs 45,000 to Rs 65,000'],
                        ['Unit Linked Insurance Plan (ULIP)', 'Market equity participation', 'Fund NAV balance at maturity', '8% to 12% (Market linked)', 'Rs 35,000 to Rs 60,000'],
                        ['Whole Life Insurance', 'Lifelong family legacy', 'Sum assured paid at age 100', '4.5% to 6.0% long-term', 'Rs 22,000 to Rs 34,000'],
                        ['Money Back Policy', 'Periodic liquidity cashflow', 'Survival installments + terminal bonus', '3.5% to 4.5% annualized', 'Rs 55,000 to Rs 75,000'],
                      ].map(([cat, obj, mat, irr, cst]) => (
                        <tr key={cat} style={{ borderBottom: `1px solid ${C.border}`, background: 'transparent' }}>
                          <td style={{ ...tdNeutralL, fontWeight: 700, color: C.ink }}>{cat}</td>
                          <td style={tdNeutralL}>{obj}</td>
                          <td style={tdNeutralL}>{mat}</td>
                          <td style={tdNeutralL}>{irr}</td>
                          <td style={{ ...tdNeutralR, color: C.ink2, fontWeight: 600 }}>{cst}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p style={p}>
                  Using a life insurance investment calculator or life insurance maturity calculator reveals that traditional endowment plans generate modest returns of 4% to 5.5%.
                </p>
                <p style={p}>
                  Our life insurance return calculator and life insurance benefit calculator support the "Buy Term and Invest the Difference" strategy: buy term cover and invest the savings in index funds.
                </p>

                {/* In-Content Promo Bar */}
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', margin: '20px 0' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 700, color: C.dark, margin: '0 0 2px' }}>
                      Term Insurance Calculator
                    </p>
                    <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>
                      Calculate exact quotes for 1 Crore and 2 Crore pure term plans with smoker and gender rate adjustments.
                    </p>
                  </div>
                  <Link className="fx-btn"
                    href="/calculators/term-insurance-calculator"
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

              {/* Section 6 */}
              <div style={sec}>
                <h2 style={h2} id="premium-calculation-formula">
                  Life Insurance Premium Calculation Formula and Actuarial Rate Tables
                </h2>
                <p style={p}>
                  Our life insurance premium calculator and life insurance quote calculator rely on official mortality tables published for Indian Assured Lives (IALM 2012-14).
                </p>
                <p style={p}>
                  An automated life insurance premium calculation calculator computes risk charges, overheads, investment discount rates, and solvency margins.
                </p>

                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '12px 16px', marginBottom: 14 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 13.5, fontWeight: 700, color: C.dark }}>
                    Annual Premium = [(Sum Assured x Mortality Rate q_x) / 1,000] x Policy Loading + Expenses + GST
                  </code>
                </div>

                <p style={p}>
                  A life insurance plan premium calculator and life insurance policy premium calculator apply gender adjustments: women enjoy a 15% discount for longer average longevity.
                </p>
                <p style={p}>
                  Conversely, our life insurance premium calculator india applies a 60% to 90% mortality surcharge for tobacco users, verified through urine cotinine medical tests.
                </p>

                {/* Actuarial Rate Table */}
                <div style={{ overflowX: 'auto', marginBottom: 14 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13, background: C.white }}>
                    <thead>
                      <tr>
                        <th style={thNeutral} scope="col">Age Bracket</th>
                        <th style={thNeutral} scope="col">Non-Smoker Male</th>
                        <th style={thNeutral} scope="col">Non-Smoker Female (-15%)</th>
                        <th style={thNeutral} scope="col">Smoker Male (+75%)</th>
                        <th style={thNeutral} scope="col">Smoker Female</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Age 20 - 25', 'Rs 6,800 / yr', 'Rs 5,780 / yr', 'Rs 11,900 / yr', 'Rs 10,115 / yr'],
                        ['Age 26 - 30', 'Rs 8,200 / yr', 'Rs 6,970 / yr', 'Rs 14,350 / yr', 'Rs 12,198 / yr'],
                        ['Age 31 - 35', 'Rs 11,500 / yr', 'Rs 9,775 / yr', 'Rs 20,125 / yr', 'Rs 17,106 / yr'],
                        ['Age 36 - 40', 'Rs 16,800 / yr', 'Rs 14,280 / yr', 'Rs 29,400 / yr', 'Rs 24,990 / yr'],
                        ['Age 41 - 45', 'Rs 25,500 / yr', 'Rs 21,675 / yr', 'Rs 44,625 / yr', 'Rs 37,931 / yr'],
                        ['Age 46 - 50', 'Rs 39,000 / yr', 'Rs 33,150 / yr', 'Rs 68,250 / yr', 'Rs 58,013 / yr'],
                      ].map(([brk, nsm, nsf, sm, sf]) => (
                        <tr key={brk} style={{ borderBottom: `1px solid ${C.border}`, background: 'transparent' }}>
                          <td style={{ ...tdNeutralL, fontWeight: 700, color: C.ink }}>{brk}</td>
                          <td style={tdNeutralR}>{nsm}</td>
                          <td style={{ ...tdNeutralR, color: C.ink2, fontWeight: 600 }}>{nsf}</td>
                          <td style={tdNeutralR}>{sm}</td>
                          <td style={tdNeutralR}>{sf}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  GST applies at 18% on pure term insurance premiums in India, but qualifies for tax deduction alongside base premiums under Section 80C.
                </p>
              </div>

              {/* Section 6.5: Affordability & Premium Pricing */}
              <div style={sec}>
                <h2 style={h2} id="affordability-premium-pricing">
                  Life Insurance Affordability & Premium Pricing: What You'll Actually Pay
                </h2>
                <p style={p}>
                  Term insurance is highly affordable. A 30-year-old non-smoker pays Rs 700-1,000 per month for Rs 1 crore cover. At 45, costs rise to Rs 2,000-3,000. Women receive 15% discount across all plans.
                </p>
                <p style={p}>
                  Endowment and whole life are 5-10x more expensive for the same coverage, but include guaranteed maturity payouts. The right plan depends on your budget and whether you want permanent or temporary cover.
                </p>

                <h3 style={h3}>Monthly Premium Examples: Rs 1 Crore Term Insurance Cover</h3>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>
                      Estimated monthly premiums for 30-year term, 18% GST included, based on Indian actuarial rates
                    </caption>
                    <thead>
                      <tr>
                        <th style={thNeutral} scope="col">Age</th>
                        <th style={thNeutral} scope="col">Male (Non-Smoker)</th>
                        <th style={thNeutral} scope="col">Female (Non-Smoker)</th>
                        <th style={thNeutral} scope="col">Male (Smoker)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['25', 'Rs 550-650', 'Rs 450-550', 'Rs 900-1,100'],
                        ['30', 'Rs 700-850', 'Rs 600-720', 'Rs 1,200-1,450'],
                        ['35', 'Rs 950-1,150', 'Rs 800-980', 'Rs 1,600-1,950'],
                        ['40', 'Rs 1,400-1,700', 'Rs 1,150-1,450', 'Rs 2,400-2,900'],
                        ['45', 'Rs 2,000-2,450', 'Rs 1,650-2,050', 'Rs 3,500-4,200'],
                        ['50', 'Rs 3,200-3,900', 'Rs 2,600-3,200', 'Rs 5,500-6,700'],
                      ].map(([age, male, female, smoker]) => (
                        <tr key={age} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdNeutralL, fontWeight: 700, color: C.ink }}>{age}</td>
                          <td style={tdNeutralR}>{male}</td>
                          <td style={tdNeutralR}>{female}</td>
                          <td style={tdNeutralR}>{smoker}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h3 style={h3}>Affordability by Income Level</h3>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>
                      Recommended cover and monthly premium cost as % of salary
                    </caption>
                    <thead>
                      <tr>
                        <th style={thNeutral} scope="col">Monthly Income</th>
                        <th style={thNeutral} scope="col">Recommended Cover</th>
                        <th style={thNeutral} scope="col">Est. Monthly Premium</th>
                        <th style={thNeutral} scope="col">% of Income</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Rs 30,000', 'Rs 30-45 Lakh', 'Rs 300-450', '1-1.5%'],
                        ['Rs 50,000', 'Rs 50-75 Lakh', 'Rs 450-700', '0.9-1.4%'],
                        ['Rs 75,000', 'Rs 75-1.1 Cr', 'Rs 700-1,050', '0.9-1.4%'],
                        ['Rs 1 Lakh', 'Rs 1-1.5 Cr', 'Rs 1,000-1,500', '1-1.5%'],
                        ['Rs 1.5 Lakh', 'Rs 1.5-2.2 Cr', 'Rs 1,500-2,200', '1-1.5%'],
                        ['Rs 2+ Lakh', 'Rs 2-3 Cr+', 'Rs 2,000-3,000+', '1-1.5%'],
                      ].map(([income, cover, premium, pct]) => (
                        <tr key={income} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdNeutralL, fontWeight: 700, color: C.ink }}>{income}</td>
                          <td style={tdNeutralR}>{cover}</td>
                          <td style={tdNeutralR}>{premium}</td>
                          <td style={tdNeutralR}>{pct}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p style={p}>
                  Most financial advisors recommend spending 1-1.5% of gross monthly income on life insurance. This keeps coverage affordable while meeting family protection needs. Use quarterly or annual payment modes to reduce effective cost by 2-5%.
                </p>
              </div>

              {/* Section 6.75: Life Stage Strategy */}
              <div style={sec}>
                <h2 style={h2} id="life-stage-strategy">
                  Life Insurance Strategy by Life Stage: When & How Much to Buy
                </h2>
                <p style={p}>
                  Optimal life insurance needs change as your career, income, and responsibilities evolve. Early action locks in lower rates and builds protection before major liabilities arise.
                </p>

                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>
                      Life insurance strategy and coverage needs by career stage
                    </caption>
                    <thead>
                      <tr>
                        <th style={thNeutral} scope="col">Life Stage</th>
                        <th style={thNeutral} scope="col">Primary Need</th>
                        <th style={thNeutral} scope="col">Recommended Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Age 20-25 (Start career)', 'Establish emergency coverage at lowest rates', 'Buy Rs 50-75 lakh term, 30-40 year term. Lock in youth rates.'],
                        ['Age 25-35 (Growing family)', 'Cover rising expenses and home loans', 'Increase to Rs 1-1.5 Cr term. Top-up if loan taken. Add critical illness rider.'],
                        ['Age 35-45 (Peak responsibility)', 'Child education + home loan protection', 'Maintain Rs 1.5-2.5 Cr term. Reduce term to 15-20 years if approaching 50.'],
                        ['Age 45-55 (Pre-retirement)', 'Bridge gap until retirement corpus', 'Rs 1-1.5 Cr cover. Shift surplus to endowment/whole life if budget allows.'],
                        ['Age 55+ (Retirement)', 'Protect spouse & legacy goals', 'Maintain Rs 50-75 lakh cover. Switch to whole life for guaranteed maturity.'],
                      ].map(([stage, need, action]) => (
                        <tr key={stage} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdNeutralL, fontWeight: 700, color: C.ink }}>{stage}</td>
                          <td style={tdNeutralR}>{need}</td>
                          <td style={tdNeutralL}>{action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p style={p}>
                  Key insight: Term insurance costs least when purchased young. A 25-year-old buying Rs 1 crore cover pays Rs 600-700/month; a 40-year-old pays Rs 1,400-1,700/month for the same cover. Buying early saves thousands over your lifetime.
                </p>
              </div>

              {/* Section 7 */}
              <div style={sec}>
                <h2 style={h2} id="salaried-vs-self-employed">
                  Financial & Medical Underwriting: How Insurers Determine Eligibility
                </h2>
                <p style={p}>
                  Our life insurance eligibility calculator logic reflects formal underwriting guidelines insurers use to assess financial capacity and medical risk.
                </p>

                <h3 style={h3}>Financial Underwriting Protocols</h3>
                <p style={p}>
                  Salaried applicants substantiate income with their latest three months salary slips, bank statements displaying salary credits, and latest Form 16.
                </p>
                <p style={p}>
                  Self-employed professionals, traders, and business owners provide audited profit and loss accounts, balance sheets, and Income Tax Returns (ITR-3, ITR-4, or ITR-5) with tax computation sheets.
                </p>

                <h3 style={h3}>Medical Underwriting Protocols</h3>
                <p style={p}>
                  Depending on age and sum assured, insurers offer Non-Medical approval via tele-interview or mandate a comprehensive medical examination at an empanelled diagnostic laboratory.
                </p>
                <p style={p}>
                  Standard medical screening includes Blood Glucose (HbA1c), Complete Blood Count, Liver Function (LFT), Kidney Function (KFT), Lipid Profile, Resting ECG, and Urine Cotinine.
                </p>
                <p style={p}>
                  Underwriters issue standard rates, apply medical loadings for conditions like diabetes or hypertension, or add specific exclusion clauses for hazardous occupations and hobbies.
                </p>
              </div>

              {/* Section 8 */}
              <div style={sec}>
                <h2 style={h2} id="policy-riders">
                  Life Insurance Policy Riders: Which Ones Are Worth Buying?
                </h2>
                <p style={p}>
                  Policy riders are supplementary contractual add-ons that attach to your base life insurance policy, broadening financial protection against life-altering emergencies.
                </p>

                {/* Rider Comparison Table */}
                <div style={{ overflowX: 'auto', marginBottom: 14 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13, background: C.white }}>
                    <thead>
                      <tr>
                        <th style={thNeutral} scope="col">Rider Name</th>
                        <th style={thNeutral} scope="col">Claim Trigger & Payout</th>
                        <th style={thNeutral} scope="col">Typical Cost Impact</th>
                        <th style={thNeutral} scope="col">Fermor Recommendation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Accidental Death Benefit (ADB)', 'Pays an additional 100% sum assured if demise results from an accident', 'Rs 500 to Rs 800 per 25 Lakh cover', 'Recommended for daily commuters'],
                        ['Waiver of Premium (WOP)', 'Waives all future premiums if you suffer permanent disability or illness', 'Rs 200 to Rs 500 per year', 'Highly Recommended (Essential)'],
                        ['Critical Illness Rider (CI)', 'Lump-sum cash on diagnosis of listed diseases (cancer, heart attack, stroke)', 'Rs 2,500 to Rs 6,000 per 25 Lakh', 'Useful, but standalone health CI is better'],
                        ['Accidental Total Disability (ATPD)', 'Pays monthly income or lump sum upon loss of limbs, sight, or speech', 'Rs 400 to Rs 700 per year', 'Recommended for field professionals'],
                        ['Terminal Illness Benefit', 'Accelerates up to 100% sum assured if diagnosed with <6 months to live', 'Usually bundled free with base term plan', 'Included automatically by top insurers'],
                      ].map(([rname, trig, cost, rec]) => (
                        <tr key={rname} style={{ borderBottom: `1px solid ${C.border}`, background: 'transparent' }}>
                          <td style={{ ...tdNeutralL, fontWeight: 700, color: C.ink }}>{rname}</td>
                          <td style={tdNeutralL}>{trig}</td>
                          <td style={tdNeutralL}>{cost}</td>
                          <td style={{ ...tdNeutralR, color: C.ink2, fontWeight: 600 }}>{rec}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The Waiver of Premium rider is widely considered the most vital add-on because it guarantees that financial hardship from disability will never compromise family life cover.
                </p>
              </div>

              {/* Section 9 */}
              <div style={sec}>
                <h2 style={h2} id="tax-benefits">
                  Tax Benefits Under Section 80C, Section 10(10D), and Budget Amendments
                </h2>
                <p style={p}>
                  A built-in life insurance tax benefit calculator lets you evaluate deductions on premiums and verify tax exemptions on maturity and death payouts.
                </p>

                <h3 style={h3}>Premium Deductions Under Section 80C</h3>
                <p style={p}>
                  Under the Old Tax Regime, premiums paid for life insurance policies covering yourself, your spouse, or dependent children qualify for tax deductions up to Rs 1.5 lakh annually.
                </p>
                <p style={p}>
                  To qualify for deduction, the annual premium must not exceed 10% of the guaranteed sum assured for policies issued on or after April 1, 2012 (15% for individuals with severe disability).
                </p>

                <h3 style={h3}>Maturity & Death Proceeds Under Section 10(10D)</h3>
                <p style={p}>
                  Our life insurance payout calculator confirms that death claim proceeds paid to nominees are 100% tax-free under Section 10(10D) without any upper limit.
                </p>
                <p style={p}>
                  However, recent Finance Acts have introduced taxation caps on maturity proceeds from high-value investment-linked policies to prevent tax avoidance by high-net-worth individuals.
                </p>

                {/* Tax Caps Table */}
                <div style={{ overflowX: 'auto', marginBottom: 14 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13, background: C.white }}>
                    <thead>
                      <tr>
                        <th style={thNeutral} scope="col">Policy Category</th>
                        <th style={thNeutral} scope="col">Statutory Rule & Threshold</th>
                        <th style={thNeutral} scope="col">Tax Treatment on Maturity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Pure Term Insurance', '100% death benefit payout', 'Completely tax-free under Section 10(10D) with no upper limit'],
                        ['ULIPs (Finance Act 2021)', 'Annual premium up to Rs 2.5 Lakh per year', 'Tax-free maturity; premiums above Rs 2.5L taxed as equity capital gains'],
                        ['Endowment & Money Back (Finance Act 2023)', 'Aggregate annual premium up to Rs 5 Lakh', 'Tax-free maturity; excess taxed under Income from Other Sources'],
                        ['New Tax Regime (Section 115BAC)', 'No 80C deductions permitted', 'Death benefits remain 100% tax-free under Section 10(10D)'],
                      ].map(([pcat, rule, treat]) => (
                        <tr key={pcat} style={{ borderBottom: `1px solid ${C.border}`, background: 'transparent' }}>
                          <td style={{ ...tdNeutralL, fontWeight: 700, color: C.ink }}>{pcat}</td>
                          <td style={tdNeutralL}>{rule}</td>
                          <td style={tdNeutralL}>{treat}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Consulting a certified tax advisor ensures your insurance portfolio is structured to preserve tax efficiency under prevailing Union Budget regulations.
                </p>
              </div>

              {/* Section 10 */}
              <div style={sec}>
                <h2 style={h2} id="claim-settlement-ratio">
                  Claim Settlement Ratio (CSR), Amount Settlement Ratio, and Section 45
                </h2>
                <p style={p}>
                  Evaluating an insurance company historical claim settlement track record is critical to guaranteeing that your family claim will be honored swiftly and without friction.
                </p>

                <h3 style={h3}>Claim Settlement Ratio (CSR) vs Amount Settlement Ratio (ASR)</h3>
                <p style={p}>
                  CSR measures the percentage of reported death claims an insurer paid out during a financial year. Leading Indian life insurers maintain CSR figures exceeding 98%.
                </p>
                <p style={p}>
                  Amount Settlement Ratio (ASR) indicates the proportion of total claim value paid out, confirming that an insurer does not routinely settle small claims while disputing high sum assured policies.
                </p>

                <h3 style={h3}>Section 45 of the Insurance Act: 3-Year Protection Moratorium</h3>
                <p style={p}>
                  Section 45 mandates that no life insurance policy can be called into question, disputed, or repudiated on any ground whatsoever after three full years from policy issuance.
                </p>
                <p style={p}>
                  Once you have diligently paid premiums for 36 consecutive months, the insurer is legally bound by statute to pay the death claim in full without contestation.
                </p>

                <h3 style={h3}>The Married Women Property Act (MWPA), 1874</h3>
                <p style={p}>
                  Endorsing your life insurance policy under Section 6 of the MWPA creates an irrevocable trust where claim proceeds belong solely and exclusively to your wife and children.
                </p>
                <p style={p}>
                  MWPA policy proceeds can never be attached by business creditors, tax authorities, banks, or civil courts, safeguarding your family legacy against debt recovery.
                </p>
              </div>

              {/* Section 11 */}
              <div style={sec}>
                <h2 style={h2} id="claim-settlement-process">
                  Step-by-Step Guide to Filing and Settling a Death Claim in India
                </h2>
                <p style={p}>
                  In the unfortunate event of a policyholder passing away, nominees must follow a structured procedure to ensure rapid, hassle-free claim settlement.
                </p>

                {/* Steps List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '14px 0' }}>
                  {[
                    ['1. Claim Intimation', 'Inform the insurer immediately via their online portal, toll-free customer helpline, or local branch office with the policy number, date of death, and cause.'],
                    ['2. Submit Mandatory Documentation', 'Provide the original policy bond, certified Municipal Death Certificate, Claimant Statement (Form 812), and nominee photo ID and bank details.'],
                    ['3. Medical & Hospital Records', 'For death due to illness, submit the Attending Physician Statement (Form 814), hospital discharge summaries, and medical diagnostic test reports.'],
                    ['4. Police & Legal Reports (Accidental Deaths)', 'For unnatural or accidental deaths, submit copies of the police First Information Report (FIR), inquest report, and post-mortem examination report.'],
                    ['5. Verification and Payout', 'IRDAI mandates that insurers must settle claims within 30 days of receiving all required documents. Funds are credited directly via NEFT into the nominee bank account.'],
                  ].map(([step, desc]) => (
                    <div key={step} style={{ border: `1px solid ${C.border}`, borderRadius: 8, padding: '12px 16px', background: C.white }}>
                      <p style={{ fontSize: 14, fontWeight: 700, color: C.ink, margin: '0 0 4px', fontFamily: INTER }}>
                        {step}
                      </p>
                      <p style={{ fontSize: 13.5, color: C.ink2, margin: 0, lineHeight: 1.6, fontFamily: INTER }}>
                        {`${desc}`}
                      </p>
                    </div>
                  ))}
                </div>
                <p style={p}>
                  If an insurer delays claim settlement beyond 30 days without valid justification, IRDAI regulations mandate payment of penal interest at 2% above the prevailing bank rate.
                </p>
              </div>

              {/* Section 12 */}
              <div style={sec}>
                <h2 style={h2} id="how-to-use">
                  How to Use This Life Insurance Calculator
                </h2>
                <p style={p}>
                  The Fermor life insurance online calculator is engineered to deliver institutional-grade actuarial clarity without sales calls, agent bias, or registration friction.
                </p>
                <p style={p}>
                  Step 1: In Cover Needed mode, enter your annual income, retirement age, outstanding debts, and existing investments to determine your true Human Life Value protection gap.
                </p>
                <p style={p}>
                  Step 2: In Premium Estimator mode, toggle your age, smoker status, gender, and policy term to view real-time premium quotes for Term, Endowment, ULIP, and Whole Life plans.
                </p>
                <p style={p}>
                  Step 3: In Plan Comparison mode, contrast the maturity benefits, annual outgo, and long-term liquidity across all four insurance plan types side by side.
                </p>
                <p style={p}>
                  Step 4: Expand the Year-by-Year Policy Schedule to inspect cumulative premiums paid, annual Section 80C tax relief, net cost, and your visual Stacked Bar Chart timeline.
                </p>
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
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.6, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations, premium estimations, and tax projections on this page are indicative and meant solely for financial planning. Actual policy terms depend on medical underwriting, lifestyle evaluation, and IRDAI-approved product filings. Consult a licensed insurance advisor or SEBI-registered planner before buying.
                </p>
              </div>
            </article>
          </div>

          {/* ── SIDEBAR (VPF Parity: Sticky, Custom Scrollbar, No Ad Box) ── */}
          <style>{`
            .lic-sidebar::-webkit-scrollbar { width: 5px; }
            .lic-sidebar::-webkit-scrollbar-track { background: transparent; }
            .lic-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .lic-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            aria-label="Related calculators and insurance facts"
            className="lic-sidebar"
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
        { hd: 'Calculators', links: [ '/calculators/life-insurance-calculator|Life Insurance', '/calculators/term-insurance-calculator|Term Insurance', '/calculators/sip-calculator|SIP Calculator', '/calculators/emi-calculator|EMI Calculator', '/calculators/ppf-calculator|PPF Calculator', '/calculators/nps-calculator|NPS Calculator', '/calculators/cagr-calculator|CAGR Calculator', ], },
        { hd: 'Topics', links: [ '/calculators/life-insurance-calculator|Life Insurance Cover', '/calculators/term-insurance-calculator|Term Plans', '/calculators/income-tax-calculator|80C Deductions', '/calculators/retirement-calculator|Retirement Planning', ], },
        { hd: 'Company', links: [ '/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact', ], },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

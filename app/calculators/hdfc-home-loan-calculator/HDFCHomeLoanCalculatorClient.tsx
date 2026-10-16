'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect, useCallback } from 'react';
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
  dark: '#101214', lime: '#a6dbc4', lime2: '#2d9970', paleLime: '#f4f5f6',
  ink: '#16140F', ink2: '#50565c', ink3: '#7a8087', white: '#ffffff',
  bg: '#f6f7f8', border: '#e3e6e8', green: '#166534',
};
const INTER = 'var(--font-inter), Inter, sans-serif';
const STORAGE_KEY = 'fermor-hdfc-home-loan-v1';

const BANKS = [
  { name: 'HDFC Bank', rate: 8.50 },
  { name: 'SBI', rate: 8.40 },
  { name: 'ICICI Bank', rate: 8.45 },
  { name: 'Axis Bank', rate: 8.60 },
  { name: 'Kotak Bank', rate: 8.70 },
  { name: 'LIC Housing Finance', rate: 8.50 },
];

function calcEMI(p: number, annualRate: number, months: number): number {
  if (months === 0 || p <= 0) return 0;
  if (annualRate === 0) return p / months;
  const r = annualRate / 12 / 100;
  return (p * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

function calcMaxLoan(emi: number, annualRate: number, months: number): number {
  if (months === 0 || emi <= 0) return 0;
  if (annualRate === 0) return emi * months;
  const r = annualRate / 12 / 100;
  return emi * (Math.pow(1 + r, months) - 1) / (r * Math.pow(1 + r, months));
}

function calcMonthsSaved(principal: number, annualRate: number, origMonths: number, emi: number, prepay: number): number {
  if (prepay <= 0 || prepay >= principal) return origMonths;
  const newP = principal - prepay;
  if (annualRate === 0) return Math.ceil(newP / emi);
  const r = annualRate / 12 / 100;
  if (emi <= newP * r) return origMonths;
  const n = -Math.log(1 - newP * r / emi) / Math.log(1 + r);
  return Math.ceil(n);
}

interface YearRow { year: number; openingBal: number; principal: number; interest: number; closingBal: number }
interface MonthRow { month: number; year: number; openingBal: number; emi: number; principal: number; interest: number; closingBal: number }

function buildYearly(p: number, annualRate: number, months: number, emi: number): YearRow[] {
  const rows: YearRow[] = [];
  let balance = p;
  const r = annualRate / 12 / 100;
  const startYear = new Date().getFullYear();
  for (let y = 0; y < Math.ceil(months / 12); y++) {
    const opening = balance;
    let yPrin = 0, yInt = 0;
    const mo = Math.min(12, months - y * 12);
    for (let m = 0; m < mo; m++) {
      const intPart = balance * r;
      const prinPart = Math.min(emi - intPart, balance);
      yInt += intPart;
      yPrin += prinPart;
      balance = Math.max(0, balance - prinPart);
    }
    rows.push({ year: startYear + y, openingBal: opening, principal: yPrin, interest: yInt, closingBal: balance });
    if (balance <= 0) break;
  }
  return rows;
}

function buildMonthly(p: number, annualRate: number, months: number, emi: number): MonthRow[] {
  const rows: MonthRow[] = [];
  let balance = p;
  const r = annualRate / 12 / 100;
  const now = new Date();
  for (let m = 0; m < months; m++) {
    const opening = balance;
    const intPart = balance * r;
    const prinPart = Math.min(emi - intPart, balance);
    balance = Math.max(0, balance - prinPart);
    rows.push({ month: m + 1, year: now.getFullYear() + Math.floor(m / 12), openingBal: opening, emi, principal: prinPart, interest: intPart, closingBal: balance });
    if (balance <= 0) break;
  }
  return rows;
}

const EMI_TABLE = {
  tenures: [10, 15, 20, 25, 30],
  amounts: [1500000, 2000000, 2500000, 3000000, 4000000, 5000000, 7500000, 10000000],
  labels: ['₹15 Lakh', '₹20 Lakh', '₹25 Lakh', '₹30 Lakh', '₹40 Lakh', '₹50 Lakh', '₹75 Lakh', '₹1 Crore'],
  rate: 8.50,
  values: [
    [18598, 14768, 13010, 12071, 11534],
    [24797, 19690, 17347, 16095, 15378],
    [30996, 24613, 21684, 20119, 19223],
    [37195, 29535, 26021, 24143, 23067],
    [49593, 39380, 34694, 32190, 30756],
    [61992, 49225, 43368, 40238, 38446],
    [92988, 73838, 65052, 60357, 57669],
    [123985, 98450, 86730, 80475, 76890],
  ],
};

const ELIGIBILITY_TABLE = [
  { salary: 30000, maxEmi: 15000, loan20: 1729000, loan30: 1951000 },
  { salary: 50000, maxEmi: 25000, loan20: 2882000, loan30: 3251000 },
  { salary: 75000, maxEmi: 37500, loan20: 4323000, loan30: 4877000 },
  { salary: 100000, maxEmi: 50000, loan20: 5764000, loan30: 6503000 },
  { salary: 150000, maxEmi: 75000, loan20: 8646000, loan30: 9755000 },
  { salary: 200000, maxEmi: 100000, loan20: 11528000, loan30: 13007000 },
];

function fmt(n: number): string {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${Math.round(n).toLocaleString('en-IN')}`;
}

function fmtEmi(n: number): string {
  return `₹${Math.round(n).toLocaleString('en-IN')}`;
}

const thS = {
  padding: '10px 16px', fontSize: 11, fontWeight: 700, color: C.ink,
  background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const,
  letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const,
  verticalAlign: 'middle' as const,
};

const tdL = {
  padding: '11px 16px', fontSize: 13, color: C.ink, fontWeight: 500,
  border: `1px solid ${C.border}`, verticalAlign: 'middle' as const,
  textAlign: 'left' as const,
};

const tdR = {
  padding: '11px 16px', fontSize: 13, color: C.ink2,
  border: `1px solid ${C.border}`, verticalAlign: 'middle' as const,
  textAlign: 'right' as const,
};

function Slider({ label, id, value, min, max, step, display, onChange, compact }: {
  label: string; id?: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (v: number) => void; compact?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const inputId = id || label.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'slider';
  const rangeId = `${inputId}-range`;
  const pct = ((value - min) / (max - min)) * 100;
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 38 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 14 }}>
        {label
          ? <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: 14, color: C.ink2, fontWeight: 400 }}>{label}</label>
          : <span />
        }
        {editing ? (
          <input id={inputId} autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            aria-label={label ? `Enter ${label} value` : 'Enter value'}
            style={{ fontSize: 14, fontWeight: 600, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 7, padding: '6px 10px', width: 120, outline: 'none', color: C.ink, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={label ? `${label}: ${display}. Click to edit.` : `${display}. Click to edit.`}
            style={{ fontSize: compact ? 13 : 14, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: compact ? '5px 12px' : '6px 14px', cursor: 'pointer', fontFamily: INTER, minWidth: compact ? 88 : 100, textAlign: 'center', transition: 'border-color 0.15s' }}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}>
            {display}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 20, height: 20, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 2px 8px rgba(16,18,20,0.22)', pointerEvents: 'none', zIndex: 1 }} />
        <input id={rangeId} type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(+e.target.value)}
          aria-label={label || 'Slider'}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
        <span style={{ fontSize: 11, color: C.ink3 }}>{min}</span>
        <span style={{ fontSize: 11, color: C.ink3 }}>{max}</span>
      </div>
    </div>
  );
}

function DonutChart({ principal, interest }: { principal: number; interest: number }) {
  const total = principal + interest;
  if (total === 0) return null;
  const R = 78, sw = 20, cx = 104, cy = 104;
  const circ = 2 * Math.PI * R;
  const pArc = (principal / total) * circ;
  const pPct = Math.round((principal / total) * 100);
  return (
    <svg width="208" height="208" viewBox="0 0 208 208" style={{ display: 'block' }}
      role="img" aria-label={`Loan breakdown: ${pPct}% principal, ${100 - pPct}% interest`}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Principal</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 26, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
  );
}

function BarChart({ rows }: { rows: YearRow[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxAnnual = Math.max(...rows.map(r => r.principal + r.interest));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;

  return (
    <svg role="img" aria-label="Annual principal and interest breakdown bar chart"
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
              <text x={x + barW / 2} y={H + 14} textAnchor="middle"
                style={{ fontSize: rows.length > 20 ? 8 : 10, fill: C.ink3, fontFamily: INTER }}>
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


type Tab = 'emi' | 'eligibility' | 'table';

export default function HDFCHomeLoanCalculatorClient() {
  const [mobile, setMobile] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('emi');

  const defaultSettings = { propertyPrice: 7500000, downPaymentPct: 20, rate: 8.50, tenureYr: 20, tenureMode: 'yr', tenureMo: 240, prepayAmt: 0, grossSalary: 100000, otherEMIs: 0, eligRate: 8.50, eligTenure: 20 };
  const { settings, updateSettings } = useCalculatorSettings('hdfc-home-loan-calculator', defaultSettings);
  const { propertyPrice, downPaymentPct, rate, tenureYr, tenureMode, tenureMo, prepayAmt, grossSalary, otherEMIs, eligRate, eligTenure } = settings;

  const setPropertyPrice = (v: any) => updateSettings({ propertyPrice: typeof v === 'function' ? v(settings.propertyPrice) : v });
  const setDownPaymentPct = (v: any) => updateSettings({ downPaymentPct: typeof v === 'function' ? v(settings.downPaymentPct) : v });
  const setRate = (v: any) => updateSettings({ rate: typeof v === 'function' ? v(settings.rate) : v });
  const setTenureYr = (v: any) => updateSettings({ tenureYr: typeof v === 'function' ? v(settings.tenureYr) : v });
  const setTenureMode = (v: any) => updateSettings({ tenureMode: typeof v === 'function' ? v(settings.tenureMode) : v });
  const setTenureMo = (v: any) => updateSettings({ tenureMo: typeof v === 'function' ? v(settings.tenureMo) : v });
  const setPrepayAmt = (v: any) => updateSettings({ prepayAmt: typeof v === 'function' ? v(settings.prepayAmt) : v });
  const setGrossSalary = (v: any) => updateSettings({ grossSalary: typeof v === 'function' ? v(settings.grossSalary) : v });
  const setOtherEMIs = (v: any) => updateSettings({ otherEMIs: typeof v === 'function' ? v(settings.otherEMIs) : v });
  const setEligRate = (v: any) => updateSettings({ eligRate: typeof v === 'function' ? v(settings.eligRate) : v });
  const setEligTenure = (v: any) => updateSettings({ eligTenure: typeof v === 'function' ? v(settings.eligTenure) : v });

  const [showAmort, setShowAmort] = useState(false);
  const [amortView, setAmortView] = useState<'yearly' | 'monthly'>('yearly');
  const [showPrepay, setShowPrepay] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = useCallback((n: number) => formatCurrency(convertCurrency(n)), [formatCurrency, convertCurrency]);
  const fmtC = useCallback((n: number) => formatCurrency(convertCurrency(n), true), [formatCurrency, convertCurrency]);


  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const d = JSON.parse(saved);
        if (d.propertyPrice) setPropertyPrice(d.propertyPrice);
        if (d.downPaymentPct) setDownPaymentPct(d.downPaymentPct);
        if (d.rate) setRate(d.rate);
        if (d.tenureYr) { setTenureYr(d.tenureYr); setTenureMo(d.tenureYr * 12); }
      }
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ propertyPrice, downPaymentPct, rate, tenureYr })); } catch {}
  }, [propertyPrice, downPaymentPct, rate, tenureYr]);

  const downPayment = propertyPrice * downPaymentPct / 100;
  const loanAmount = propertyPrice - downPayment;
  const months = tenureMode === 'yr' ? tenureYr * 12 : tenureMo;
  const emi = useMemo(() => calcEMI(loanAmount, rate, months), [loanAmount, rate, months]);
  const totalPayable = emi * months;
  const totalInterest = totalPayable - loanAmount;
  const principalPct = totalPayable > 0 ? Math.round((loanAmount / totalPayable) * 100) : 0;

  const yearlyRows = useMemo(() => buildYearly(loanAmount, rate, months, emi), [loanAmount, rate, months, emi]);
  const prepayMonths = useMemo(() => calcMonthsSaved(loanAmount, rate, months, emi, prepayAmt), [loanAmount, rate, months, emi, prepayAmt]);
  const prepayMonthsSaved = months - prepayMonths;
  const prepayInterestSaved = emi * prepayMonthsSaved;

  const bankComparisons = useMemo(() =>
    BANKS.map(b => {
      const e = calcEMI(loanAmount, b.rate, months);
      const tp = e * months;
      return { ...b, emi: e, totalPayable: tp, totalInterest: tp - loanAmount };
    }), [loanAmount, months]);

  const netSalary = grossSalary * 0.85;
  const maxEmi = netSalary * 0.50 - otherEMIs;
  const maxLoan = useMemo(() => calcMaxLoan(Math.max(0, maxEmi), eligRate, eligTenure * 12), [maxEmi, eligRate, eligTenure]);
  const propertyBudget = maxLoan / 0.80;

  const h2 = { fontSize: mobile ? 18 : 21, fontWeight: 700, color: C.ink, margin: '0 0 12px', letterSpacing: '-0.015em' } as React.CSSProperties;
  const p = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;

  const faqItems = [
    { q: 'What is the current HDFC home loan interest rate?', a: 'HDFC Bank home loan interest rates start at 8.50% per annum for salaried borrowers as of 2026. The rate is linked to HDFC Bank\'s External Benchmark Lending Rate (EBLR) and is subject to quarterly resets based on policy rate shifts.' },
    { q: 'How is HDFC home loan EMI calculated?', a: 'HDFC home loan EMI is calculated using the standard reducing-balance amortization formula: EMI = P x r x (1+r)^n / ((1+r)^n - 1), where P is the principal, r is the monthly interest rate, and n is the tenure in months.' },
    { q: 'What is the EMI for a Rs 50 lakh HDFC home loan for 20 years?', a: 'At the standard rate of 8.50% per annum for a 20-year tenure, the monthly EMI for a Rs 50 lakh HDFC home loan is approximately Rs 43,391. The total interest paid over the tenure is Rs 54.14 lakh.' },
    { q: 'What is the minimum down payment for HDFC home loan?', a: 'HDFC Bank requires a minimum down payment of 10% for property values up to Rs 30 lakh, 15% for values between Rs 30 lakh and Rs 75 lakh, and 20% for property values above Rs 75 lakh.' },
    { q: 'How much salary is required for a Rs 40 lakh home loan at HDFC Bank?', a: 'HDFC Bank uses a Fixed Obligation to Income Ratio (FOIR) of 50%. For a Rs 40 lakh loan at 8.50% for 20 years, the monthly EMI is Rs 34,713. To qualify, your net monthly take-home income must be at least Rs 69,426, assuming zero other outstanding obligations.' },
    { q: 'Does HDFC Bank charge a prepayment penalty?', a: 'No, HDFC Bank charges zero prepayment penalties on floating-rate home loans for individual borrowers, in compliance with RBI regulations. Prepayment charges are only applicable for corporate borrowers or fixed-rate loans.' },
    { q: 'Can NRIs apply for an HDFC home loan?', a: 'Yes, Non-Resident Indians (NRIs) can apply for HDFC home loans to purchase residential properties in India. The maximum tenure is typically capped at 15 years for NRIs, and repayment must be done via NRE or NRO accounts.' },
    { q: 'What is the maximum tenure for an HDFC home loan?', a: 'The maximum tenure offered by HDFC Bank for a regular home loan is 30 years for salaried individuals, subject to the borrower\'s age not exceeding 60 years or retirement age at maturity.' },
    { q: 'What is the difference between HDFC retail prime lending rate and EBLR?', a: 'Following HDFC\'s merger with HDFC Bank, loans are linked to the External Benchmark Lending Rate (EBLR) based on the RBI Repo Rate. Older loans linked to the Retail Prime Lending Rate (RPLR) are transitionable to EBLR for a nominal conversion fee.' },
    { q: 'How long does HDFC Bank take to sanction a home loan?', a: 'HDFC Bank typically takes 3 to 7 working days to issue a digital pre-approval sanction letter after document verification. Final disbursement depends on legal and technical clearance of the property, which can take an additional 10 to 15 days.' },
    { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' },
  ];

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <style>{`
        .hdfc-sidebar::-webkit-scrollbar { width: 5px; }
        .hdfc-sidebar::-webkit-scrollbar-track { background: transparent; }
        .hdfc-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .hdfc-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
      `}</style>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            HDFC Home Loan Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 15, color: C.ink2, margin: 0, lineHeight: 1.6, maxWidth: mobile ? '100%' : 800 }}>
            Calculate monthly EMI at HDFC Bank&apos;s current 8.50% base rate, check your eligibility based on salary, and view the complete amortization schedule.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>
              {/* Tab Navigation */}
              <div role="tablist" aria-label="Calculator mode" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                {([['emi', 'EMI Calculator'], ['eligibility', 'Eligibility Check'], ['table', 'EMI Table']] as [Tab, string][]).map(([t, label]) => (
                  <button key={t} id={`tab-${t}`} role="tab" aria-selected={activeTab === t} aria-controls={`panel-${t}`}
                    onClick={() => setActiveTab(t)}
                    style={{ flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer', fontSize: mobile ? 12.5 : 13.5, fontWeight: activeTab === t ? 700 : 400, color: activeTab === t ? C.dark : C.ink3, borderBottom: activeTab === t ? `2.5px solid ${C.dark}` : '2.5px solid transparent', transition: 'all 0.15s', fontFamily: INTER }}>
                    {label}
                  </button>
                ))}
              </div>

              {/* Tab 1: EMI Calculator */}
              {activeTab === 'emi' && (
                <div id="panel-emi" role="tabpanel" aria-labelledby="tab-emi">
                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                    <div style={{ padding: mobile ? '20px 18px' : '44px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                        <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>HDFC Home Loan Details</p>
                        <CurrencySelector theme="light" />
                      </div>

                      <Slider label="Property Price" value={propertyPrice} min={500000} max={100000000} step={100000}
                        display={fmtC(propertyPrice)} onChange={setPropertyPrice} compact={mobile} />

                      <Slider label="Down Payment" value={downPaymentPct} min={10} max={60} step={1}
                        display={`${downPaymentPct}%`} onChange={setDownPaymentPct} compact={mobile} />

                      <div style={{ marginBottom: 28, padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 13, color: C.ink2, fontWeight: 500 }}>Loan Amount (P)</span>
                        <span style={{ fontSize: 13, color: C.ink, fontWeight: 700 }}>{fmtC(loanAmount)}</span>
                      </div>

                      <Slider label="Interest Rate (p.a.)" value={rate} min={5} max={18} step={0.05}
                        display={`${rate.toFixed(2)}%`} onChange={setRate} compact={mobile} />

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                          <label style={{ fontSize: 14, color: C.ink2, fontWeight: 400 }}>Loan Tenure</label>
                          <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                            {(['yr', 'mo'] as const).map(m => (
                              <button key={m} onClick={() => setTenureMode(m)} style={{ padding: '6px 14px', border: 'none', background: tenureMode === m ? C.white : 'transparent', color: tenureMode === m ? C.ink : C.ink3, fontWeight: tenureMode === m ? 600 : 400, cursor: 'pointer', fontFamily: INTER, fontSize: 13, transition: 'all 0.15s' }}>
                                {m === 'yr' ? 'Years' : 'Months'}
                              </button>
                            ))}
                          </div>
                        </div>
                        {tenureMode === 'yr'
                          ? <Slider label="" value={tenureYr} min={1} max={30} step={1} display={`${tenureYr} yr`} onChange={v => { setTenureYr(v); setTenureMo(v * 12); }} compact={mobile} />
                          : <Slider label="" value={tenureMo} min={12} max={360} step={1} display={`${tenureMo} mo`} onChange={v => { setTenureMo(v); setTenureYr(Math.round(v / 12)); }} compact={mobile} />}
                      </div>
                    </div>

                    {/* Results Panel */}
                    <div style={{ padding: mobile ? '20px 18px' : '44px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#50565C' }}>Monthly EMI</span>
                        <span aria-live="polite" aria-label={`Monthly EMI: ${fmtIN(emi)}`}
                          style={{ fontSize: mobile ? 24 : 30, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>{fmtIN(emi)}</span>
                      </div>

                      {[
                        { label: 'Principal loan amount', value: fmtC(loanAmount) },
                        { label: 'Total interest payable', value: fmtC(totalInterest) },
                        { label: 'Down payment', value: fmtC(downPayment) },
                        { label: 'Total amount payable', value: fmtC(totalPayable) },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: 13, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{value}</span>
                        </div>
                      ))}

                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 12, order: mobile ? 1 : -1 }}>
                        <DonutChart principal={loanAmount} interest={totalInterest} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 12, order: mobile ? 2 : -1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" /><span style={{ fontSize: 12, color: C.ink2 }}>Principal {principalPct}%</span></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" /><span style={{ fontSize: 12, color: C.ink2 }}>Interest {100 - principalPct}%</span></div>
                      </div>
                    </div>
                  </div>

                  {/* Prepayment Panel */}
                  <div style={{ borderTop: `1px solid ${C.border}` }}>
                    <button onClick={() => setShowPrepay(v => !v)} aria-expanded={showPrepay} aria-controls="prepay-panel"
                      style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 18px' : '16px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>Prepayment Impact</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: showPrepay ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    {showPrepay && (
                      <div id="prepay-panel" style={{ padding: mobile ? '0 18px 20px' : '0 44px 24px' }}>
                        <p style={{ fontSize: 13, color: C.ink3, marginBottom: 16, lineHeight: 1.6 }}>
                          Calculate how a one-time principal prepayment reduces your remaining home loan tenure.
                        </p>
                        <Slider label="Lump sum prepayment" value={prepayAmt} min={0} max={Math.round(loanAmount * 0.5 / 100000) * 100000} step={50000}
                          display={fmtC(prepayAmt)} onChange={setPrepayAmt} compact />
                        {prepayAmt > 0 && (
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 4 }}>
                            <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 10, padding: '14px 16px' }}>
                              <div style={{ fontSize: 11, color: C.ink3, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Months saved</div>
                              <div style={{ fontSize: 20, fontWeight: 800, color: C.green }}>{prepayMonthsSaved > 0 ? `${Math.floor(prepayMonthsSaved / 12)}yr ${prepayMonthsSaved % 12}mo` : '0'}</div>
                            </div>
                            <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 10, padding: '14px 16px' }}>
                              <div style={{ fontSize: 11, color: C.ink3, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Interest saved</div>
                              <div style={{ fontSize: 20, fontWeight: 800, color: C.green }}>{fmtC(prepayInterestSaved)}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Bank rate comparisons */}
                  <div style={{ borderTop: `1px solid ${C.border}`, padding: mobile ? '20px 18px' : '28px 44px' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: 16 }}>Compare Home Loan Rates Across Lenders</div>
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 480 }}>
                        <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, paddingTop: 8, textAlign: 'left' }}>
                          EMI comparison for the same loan amount and tenure at each bank&apos;s indicative rate.
                        </caption>
                        <thead>
                          <tr style={{ background: '#f4f5f6' }}>
                            {['Bank', 'Rate', 'Monthly EMI', 'Total Interest', 'Total Payable'].map(h => {
                              const isRight = h !== 'Bank';
                              return (
                                <th key={h} scope="col" style={isRight ? { ...thS, textAlign: 'right' } : thS}>{h}</th>
                              );
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          {bankComparisons.map((b, i) => {
                            const isHDFC = b.name === 'HDFC Bank';
                            return (
                              <tr key={b.name} style={{ borderTop: `1px solid ${C.border}`, background: isHDFC ? C.paleLime : (i % 2 === 0 ? C.white : '#fafafa'), fontWeight: isHDFC ? 700 : 400 }}>
                                <td style={tdL}>
                                  {isHDFC && <span style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontSize: 9, fontWeight: 700, padding: '2px 5px', borderRadius: 3, marginRight: 6 }}>HDFC</span>}
                                  {b.name}
                                </td>
                                <td style={tdR}>{b.rate.toFixed(2)}%</td>
                                <td style={tdR}>{fmtIN(b.emi)}</td>
                                <td style={{ ...tdR, color: C.green, fontWeight: 600 }}>{fmtC(b.totalInterest)}</td>
                                <td style={tdR}>{fmtC(b.totalPayable)}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Amortization (Collapsible stacked bar chart + table) */}
                  <div style={{ borderTop: `1px solid ${C.border}` }}>
                    <button onClick={() => setShowAmort(v => !v)} aria-expanded={showAmort} aria-controls="amort-panel"
                      style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 18px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                      <div>
                        <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>Amortization Schedule</span>
                        {!mobile && <span style={{ fontSize: 12, color: C.ink3, marginLeft: 8 }}>({yearlyRows.length} years, {months} months)</span>}
                      </div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: showAmort ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>

                    {showAmort && (
                      <div id="amort-panel" style={{ borderTop: `1px solid ${C.border}`, padding: mobile ? '18px 18px' : '24px 44px' }}>
                        <p style={{ fontSize: 13, color: C.ink3, marginBottom: 16, lineHeight: 1.6 }}>
                          Yearly principal and interest distribution schedule.
                        </p>

                        <div style={{ marginBottom: 24 }}>
                          <BarChart rows={yearlyRows} />
                        </div>

                        <div style={{ display: 'flex', gap: 20, marginBottom: 24, justifyContent: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} />
                            <span style={{ fontSize: 12, color: C.ink2 }}>Principal Paid</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} />
                            <span style={{ fontSize: 12, color: C.ink2 }}>Interest Paid</span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                          {(['yearly', 'monthly'] as const).map(v => (
                            <button key={v} onClick={() => setAmortView(v)} style={{ padding: '6px 14px', borderRadius: 8, border: `1px solid ${amortView === v ? C.dark : C.border}`, background: amortView === v ? C.dark : C.white, color: amortView === v ? C.white : C.ink2, fontFamily: INTER, fontSize: 12, fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }}>
                              {v}
                            </button>
                          ))}
                        </div>

                        <div style={{ overflowX: 'auto', maxHeight: 400, overflowY: 'auto' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                            <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, paddingTop: 8, textAlign: 'left' }}>
                              Detailed amortization schedule showing principal and interest components per period.
                            </caption>
                            <thead style={{ position: 'sticky', top: 0 }}>
                              <tr style={{ background: '#f4f5f6' }}>
                                {amortView === 'yearly'
                                  ? ['Year', 'Opening Balance', 'Principal Paid', 'Interest Paid', 'Closing Balance'].map((h, idx) => (
                                      <th key={h} scope="col" style={idx > 0 ? { ...thS, textAlign: 'right' } : thS}>{h}</th>
                                    ))
                                  : ['Month', 'Year', 'Opening Balance', 'EMI', 'Principal', 'Interest', 'Closing Balance'].map((h, idx) => (
                                      <th key={h} scope="col" style={idx > 1 ? { ...thS, textAlign: 'right' } : thS}>{h}</th>
                                    ))
                                }
                              </tr>
                            </thead>
                            <tbody>
                              {amortView === 'yearly'
                                ? yearlyRows.map((row, i) => (
                                    <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                      <td style={tdL}>{row.year}</td>
                                      <td style={tdR}>{fmtIN(row.openingBal)}</td>
                                      <td style={{ ...tdR, color: C.green, fontWeight: 600 }}>{fmtIN(row.principal)}</td>
                                      <td style={tdR}>{fmtIN(row.interest)}</td>
                                      <td style={tdR}>{fmtIN(row.closingBal)}</td>
                                    </tr>
                                  ))
                                : buildMonthly(loanAmount, rate, months, emi).map((row, i) => (
                                    <tr key={row.month} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                      <td style={tdL}>{row.month}</td>
                                      <td style={tdL}>{row.year}</td>
                                      <td style={tdR}>{fmtIN(row.openingBal)}</td>
                                      <td style={tdR}>{fmtIN(row.emi)}</td>
                                      <td style={{ ...tdR, color: C.green, fontWeight: 600 }}>{fmtIN(row.principal)}</td>
                                      <td style={tdR}>{fmtIN(row.interest)}</td>
                                      <td style={tdR}>{fmtIN(row.closingBal)}</td>
                                    </tr>
                                  ))
                              }
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 2: Eligibility Check */}
              {activeTab === 'eligibility' && (
                <div id="panel-eligibility" role="tabpanel" aria-labelledby="tab-eligibility">
                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                    <div style={{ padding: mobile ? '20px 18px' : '44px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 28px' }}>Your Income and Obligations</p>

                      <Slider label="Gross monthly salary" value={grossSalary} min={20000} max={1000000} step={5000}
                        display={fmtEmi(grossSalary)} onChange={setGrossSalary} compact={mobile} />

                      <Slider label="Existing EMIs per month" value={otherEMIs} min={0} max={100000} step={1000}
                        display={fmtEmi(otherEMIs)} onChange={setOtherEMIs} compact={mobile} />

                      <Slider label="Expected interest rate (%)" value={eligRate} min={5} max={18} step={0.05}
                        display={`${eligRate.toFixed(2)}%`} onChange={setEligRate} compact={mobile} />

                      <Slider label="Preferred tenure (years)" value={eligTenure} min={5} max={30} step={1}
                        display={`${eligTenure} yr`} onChange={setEligTenure} compact={mobile} />

                      <div style={{ padding: '12px 16px', background: '#FFF9F0', border: '1px solid #FDE68A', borderRadius: 10 }}>
                        <p style={{ fontSize: 12, color: '#92400E', lineHeight: 1.6, margin: 0 }}>
                          HDFC Bank uses a FOIR (Fixed Obligation to Income Ratio) of 50% of net monthly income. Net monthly income is estimated at 85% of gross salary.
                        </p>
                      </div>
                    </div>

                    <div style={{ padding: mobile ? '20px 18px' : '44px 44px' }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 24px' }}>Your Loan Eligibility</p>

                      <div style={{ background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '20px 22px', marginBottom: 20 }}>
                        <div style={{ fontSize: 12, color: '#7A8087', marginBottom: 4 }}>Maximum loan eligible</div>
                        <div style={{ fontSize: mobile ? 28 : 34, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>{fmtC(maxLoan)}</div>
                        <div style={{ fontSize: 12, color: '#7A8087', marginTop: 6 }}>at {eligRate}% for {eligTenure} years</div>
                      </div>

                      {[
                        { label: 'Estimated net monthly income', value: fmtEmi(netSalary) },
                        { label: 'Max eligible EMI (50% FOIR)', value: fmtEmi(Math.max(0, maxEmi)) },
                        { label: 'Existing EMIs committed', value: fmtEmi(otherEMIs) },
                        { label: 'Property budget (80% LTV)', value: fmtC(propertyBudget) },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: `1px solid ${C.border}` }}>
                          <span style={{ fontSize: 13, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Eligibility reference table */}
                  <div style={{ borderTop: `1px solid ${C.border}`, padding: mobile ? '20px 18px' : '28px 44px' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: 16 }}>HDFC Home Loan Eligibility Reference Table</div>
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 480 }}>
                        <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, paddingTop: 8, textAlign: 'left' }}>
                          Calculated at HDFC base rate of 8.50%. Net salary at 85% of gross. Actual eligibility varies by credit profile.
                        </caption>
                        <thead>
                          <tr style={{ background: '#f4f5f6' }}>
                            {['Gross Monthly Salary', 'Max EMI (50% FOIR)', 'Max Loan (20 yr)', 'Max Loan (30 yr)'].map((h, idx) => (
                              <th key={h} scope="col" style={idx > 0 ? { ...thS, textAlign: 'right' } : thS}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {ELIGIBILITY_TABLE.map((row, i) => (
                            <tr key={row.salary} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                              <td style={tdL}>{fmtEmi(row.salary)}</td>
                              <td style={tdR}>{fmtEmi(row.maxEmi)}</td>
                              <td style={{ ...tdR, color: C.green, fontWeight: 600 }}>{fmt(row.loan20)}</td>
                              <td style={{ ...tdR, color: C.green, fontWeight: 600 }}>{fmt(row.loan30)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: EMI Reference Table */}
              {activeTab === 'table' && (
                <div id="panel-table" role="tabpanel" aria-labelledby="tab-table">
                  <div style={{ padding: mobile ? '20px 18px' : '32px 44px', borderBottom: `1px solid ${C.border}` }}>
                    <h2 style={{ fontSize: mobile ? 17 : 19, fontWeight: 700, color: C.ink, margin: '0 0 8px' }}>HDFC Home Loan EMI Table at 8.50%</h2>
                    <p style={{ fontSize: 13, color: C.ink2, margin: 0, lineHeight: 1.6 }}>
                      Pre-computed monthly EMI for common loan amounts at HDFC Bank&apos;s current base rate of 8.50% p.a.
                    </p>
                  </div>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, paddingTop: 8, textAlign: 'left', padding: '8px 20px 0' }}>
                        Monthly EMI at 8.50% p.a. calculated using the reducing-balance method.
                      </caption>
                      <thead>
                        <tr style={{ background: '#f4f5f6' }}>
                          <th scope="col" style={thS}>Loan Amount</th>
                          {EMI_TABLE.tenures.map(t => (
                            <th key={t} scope="col" style={{ ...thS, textAlign: 'right' }}>{t} Years</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {EMI_TABLE.labels.map((label, ri) => (
                          <tr key={label} style={{ borderTop: `1px solid ${C.border}`, background: ri % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={tdL}>{label}</td>
                            {EMI_TABLE.values[ri].map((v, ci) => (
                              <td key={ci} style={{ ...tdR, color: C.green, fontWeight: 600 }}>
                                {fmtEmi(v)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Save results and standard CTAs */}
            <div style={{ marginBottom: 24 }}><SaveResultsCard mobile={mobile} /></div>

            {/* Article prose */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>
              <div style={sec} id="hdfc-home-loan-rate">
                <h2 style={h2}>What Is HDFC Home Loan Interest Rate Today?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    HDFC Bank home loan interest rates start at 8.50% per annum for salaried borrowers as of 2026.
                  </p>
                </div>
                <p style={p}>
                  The home loan interest rate is linked directly to the Reserve Bank of India repo rate through HDFC Bank&apos;s External Benchmark Lending Rate (EBLR). Rates are reviewed quarterly, and special concessions of approximately 0.05% are offered to women co-applicants.
                </p>
                <p style={p}>
                  Borrowers can track their current rate structure on their loan statement. If you are on an older Retail Prime Lending Rate (RPLR) scheme, transferring to the EBLR-linked interest rate schedule can reduce your net interest burden.
                </p>
              </div>

              <div style={sec} id="hdfc-emi-by-amount">
                <h2 style={h2}>HDFC Home Loan EMI for Rs 30 Lakh, Rs 50 Lakh, and Rs 75 Lakh</h2>
                <p style={p}>
                  HDFC home loan EMIs vary directly with the principal amount borrowed and the repayment tenure. For a Rs 30 lakh loan at 8.50% for 20 years, the monthly instalment is Rs 26,021, and the total interest payable is Rs 32.45 lakh.
                </p>
                <p style={p}>
                  If the loan amount increases to Rs 50 lakh at the same 8.50% interest rate and 20-year tenure, the monthly payment rises to Rs 43,368. The total repayment over the tenure reaches Rs 1.04 crore, consisting of Rs 50 lakh principal and Rs 54.08 lakh interest.
                </p>
                <p style={p}>
                  For a larger home loan of Rs 75 lakh over 20 years at 8.50%, the EMI is Rs 65,052 per month, and the total interest payable is Rs 81.12 lakh. Shortening the tenure to 15 years increases the monthly payment to Rs 73,838, but reduces the interest outgo to Rs 57.91 lakh.
                </p>
              </div>

              <div style={sec} id="hdfc-eligibility">
                <h2 style={h2}>How HDFC Bank Determines Your Home Loan Eligibility</h2>
                <p style={p}>
                  HDFC Bank determines your maximum home loan eligibility by assessing your net monthly income, existing debts, age, and credit score. The primary parameter used is the Fixed Obligation to Income Ratio (FOIR), which is typically capped at 50% of your net monthly take-home salary.
                </p>
                <p style={p}>
                  Lenders also apply a Loan-to-Value (LTV) ratio to the property. HDFC Bank funds up to 90% of the property value for loans up to Rs 30 lakh, up to 80% for loans between Rs 30 lakh and Rs 75 lakh, and up to 75% for loans exceeding Rs 75 lakh.
                </p>
              </div>

              <div style={sec} id="hdfc-emi-formula">
                <h2 style={h2}>HDFC Home Loan EMI Formula</h2>
                <p style={p}>
                  The mathematical formula used to calculate HDFC home loan instalments is:
                </p>
                <div style={{ background: '#f4f5f6', padding: '16px 20px', border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 16, fontFamily: 'monospace', fontSize: 14, overflowX: 'auto' }}>
                  EMI = [P x r x (1 + r)^n] / [(1 + r)^n - 1]
                </div>
                <p style={p}>
                  Where P is the loan principal, r is the monthly interest rate (annual rate divided by 12 and then divided by 100), and n is the total number of monthly payments. This reducing-balance method recalculates the interest portion every month based on the remaining outstanding principal.
                </p>
              </div>

              <div style={sec} id="hdfc-excel-formula">
                <h2 style={h2}>HDFC Home Loan Amortization in Excel</h2>
                <p style={p}>
                  You can calculate your HDFC Bank home loan EMI in Excel using the PMT function. The syntax is:
                </p>
                <div style={{ background: '#f4f5f6', padding: '16px 20px', border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 16, fontFamily: 'monospace', fontSize: 14, overflowX: 'auto' }}>
                  =PMT(rate / 12, tenure_years * 12, -loan_amount)
                </div>
                <p style={p}>
                  For a Rs 50 lakh loan at 8.50% for 20 years, the formula is `=PMT(8.5%/12, 240, -5000000)`. To find the principal portion of a specific payment, use the PPMT function, and for the interest portion, use the IPMT function.
                </p>
              </div>

              <div style={sec} id="reverse-hdfc-calculator">
                <h2 style={h2}>Reverse HDFC Home Loan Calculator</h2>
                <p style={p}>
                  A reverse home loan calculation helps you determine the maximum property budget you can afford based on your preferred monthly EMI. If you can afford an EMI of Rs 40,000 per month, at HDFC Bank&apos;s 8.50% interest rate for 20 years, the maximum loan amount you can qualify for is approximately Rs 46.11 lakh.
                </p>
                <p style={p}>
                  Assuming a 20% down payment, this loan eligibility allows you to target a property priced at Rs 57.63 lakh. This method ensures you search for properties that fit within your pre-determined repayment capacity.
                </p>
              </div>

              <div style={sec} id="hdfc-monthly-calculation">
                <h2 style={h2}>Monthly HDFC Home Loan Calculation and Reducing Balance</h2>
                <p style={p}>
                  Under the reducing balance method, the outstanding loan principal decreases with every monthly payment, reducing the interest charged in subsequent months. During the initial years, the principal outstanding is high, so the major portion of your EMI goes toward interest.
                </p>
                <p style={p}>
                  As you progress through the tenure, the principal portion of the EMI increases, and the interest component drops. This amortization schedule ensures that the loan is fully paid off by the end of the selected tenure.
                </p>
              </div>

              <div style={sec} id="hdfc-lumpsum-vs-sip">
                <h2 style={h2}>Lumpsum Down Payment vs Home Loan EMI</h2>
                <p style={p}>
                  Increasing your down payment reduces the principal loan amount, which lowers your monthly EMI and saves total interest. For a Rs 60 lakh property, paying a 20% down payment (Rs 12 lakh) leaves a Rs 48 lakh loan, resulting in an EMI of Rs 41,652 and total interest of Rs 51.96 lakh over 20 years.
                </p>
                <p style={p}>
                  If you increase the down payment to 30% (Rs 18 lakh), the loan amount drops to Rs 42 lakh. The monthly EMI decreases to Rs 36,446, and the total interest payable drops to Rs 45.47 lakh, saving you Rs 6.49 lakh in net interest costs.
                </p>
              </div>

              <div style={sec} id="hdfc-vs-sbi">
                <h2 style={h2}>HDFC Bank vs SBI Home Loan</h2>
                <p style={p}>
                  HDFC Bank and State Bank of India (SBI) are the two largest home loan lenders in India, offering competitive rates linked directly to external benchmarks. SBI loans are linked to the repo rate through the External Benchmark Lending Rate (EBLR), while HDFC Bank links its loans to its own EBLR.
                </p>
                <p style={p}>
                  While interest rates are closely aligned, SBI often offers slightly lower rates for women borrowers, while HDFC Bank is known for faster digital processing and property valuation approvals.
                </p>
              </div>

              <div style={sec} id="hdfc-good-cibil">
                <h2 style={h2}>What Is a Good CIBIL Score for HDFC Home Loan?</h2>
                <p style={p}>
                  HDFC Bank requires a minimum CIBIL score of 700 for home loan approval, with scores above 750 attracting the lowest interest rates. A credit score below 700 may result in a higher risk premium being added to your interest rate, increasing your monthly EMI.
                </p>
                <p style={p}>
                  Maintaining a clean repayment history on credit cards and existing loans is essential to secure the best loan terms. Avoid applying for multiple new credit cards or personal loans right before submitting your home loan application.
                </p>
              </div>

              <div style={sec} id="hdfc-reach">
                <h2 style={h2}>HDFC Home Loan for NRI Borrowers</h2>
                <p style={p}>
                  Non-Resident Indians (NRIs) can apply for HDFC home loans to purchase residential property in India under liberalized RBI guidelines. The application requires proof of foreign employment, income statements, and a local co-applicant or power of attorney holder.
                </p>
                <p style={p}>
                  Repayment of NRI home loans must be processed in Indian Rupees through Non-Resident External (NRE) or Non-Resident Ordinary (NRO) bank accounts. The maximum tenure for NRI borrowers is typically capped at 15 years.
                </p>
              </div>

              <div style={sec} id="hdfc-charges">
                <h2 style={h2}>HDFC Home Loan Processing Fees and Charges</h2>
                <p style={p}>
                  HDFC Bank levies a processing fee of up to 0.50% of the loan amount, subject to a minimum of Rs 3,000 and a maximum cap depending on the scheme. Technical and legal evaluation charges are also applicable to verify the property documents.
                </p>
                <p style={p}>
                  Additional costs include stamp duty, registration charges, and home insurance. Individual borrowers on floating rates face zero prepayment charges, but fixed-rate loans may attract a fee of 2.0% on prepayments.
                </p>
              </div>

              <div style={sec} id="hdfc-limitations">
                <h2 style={h2}>Limitations of HDFC Home Loan EMI Calculators</h2>
                <p style={p}>
                  Home loan calculators provide indicative estimates based on flat default inputs and cannot predict future benchmark rate fluctuations. Since HDFC home loans are linked to floating EBLR rates, your actual interest rate and EMI may change over the tenure.
                </p>
                <p style={p}>
                  Calculators also exclude additional costs like processing fees, stamp duty, property tax, and maintenance charges. Use these tools as planning guides and confirm the final terms with an HDFC Bank loan officer before proceeding.
                </p>
              </div>

              <div style={sec} id="how-to-use">
                <h2 style={h2}>How to Use This HDFC Home Loan Calculator</h2>
                <p style={p}>
                  This calculator helps you estimate monthly instalments, eligibility, and interest outgo in three simple steps:
                </p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Property Price & Down Payment:</strong> Set the property price and down payment sliders. The loan amount is computed automatically.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Interest Rate & Tenure:</strong> Set HDFC&apos;s expected interest rate and tenure. The tool instantly displays your monthly EMI.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Amortization:</strong> Expand the amortization schedule to see a stacked bar chart of principal vs interest over the years.
                  </li>
                </ol>
              </div>


              <div style={sec} id="faq">
                <h2 style={h2}>Frequently Asked Questions</h2>
                <FAQBox items={faqItems} />
              </div>

              <hr style={{ border: 'none', borderTop: `1px solid ${C.border}`, margin: '40px 0 24px' }} />
              <div style={{ fontSize: 11.5, color: C.ink3, lineHeight: 1.6 }} id="disclaimer">
                <strong>Disclaimer:</strong> Calculations are indicative and based on market rates as of 2026. HDFC Bank determines interest rates and loan sanctions based on individual credit profiles, income verification, and legal property clearance. Consult HDFC Bank directly for formal loan quotations.
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <aside className="hdfc-sidebar" style={{ display: mobile ? 'none' : 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto', maxHeight: 'calc(100vh - 120px)', position: 'sticky', top: 20 }}>
            <nav aria-label="Related Calculators" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>Related Calculators</span>
              </div>
              {[
                { href: '/calculators/home-loan-calculator', label: 'Home Loan Calculator' },
                { href: '/calculators/emi-calculator', label: 'EMI Calculator' },
                { href: '/calculators/mortgage-calculator', label: 'Mortgage Calculator' },
                { href: '/calculators/loan-calculator', label: 'Loan Calculator' },
                { href: '/calculators/sbi-home-loan-calculator', label: 'SBI Home Loan Calculator' },
                { href: '/calculators/income-tax-calculator', label: 'Income Tax Calculator' },
              ].map(({ href, label }, i, arr) => (
                <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{ padding: '12px 18px', borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 13, color: C.ink2, transition: 'all 0.12s' }}
                    onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = C.paleLime; (e.currentTarget as HTMLElement).style.color = C.dark; }}
                    onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink2; }}>
                    {label}
                  </div>
                </Link>
              ))}
            </nav>

            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 20px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 12 }}>HDFC Bank Details</div>
              {[
                { label: 'Base interest rate', value: '8.50% p.a.' },
                { label: 'Max tenure', value: '30 years' },
                { label: 'Min down payment', value: '10-20%' },
                { label: 'FOIR cap', value: '50%' },
                { label: 'Min CIBIL score', value: '700' },
                { label: 'Processing fee', value: '0.50% cap' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${C.border}`, fontSize: 12 }}>
                  <span style={{ color: C.ink3 }}>{label}</span>
                  <span style={{ color: C.dark, fontWeight: 600 }}>{value}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>

      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/home-loan-calculator|Home Loan', '/calculators/emi-calculator|EMI', '/calculators/sip-calculator|SIP', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/fd-calculator|FD', '/calculators/ppf-calculator|PPF', '/calculators/nps-calculator|NPS', '/calculators/income-tax-calculator|Income Tax', '/calculators/cagr-calculator|CAGR'] },
        { hd: 'More Tools', links: ['/calculators/capital-gains-calculator|Capital Gains', '/calculators/mortgage-calculator|Mortgage', '/calculators/investment-comparison-calculator|Comparison', '/calculators/retirement-calculator|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/blogs|Blogs', '/privacy|Privacy Policy', '/terms|Terms', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

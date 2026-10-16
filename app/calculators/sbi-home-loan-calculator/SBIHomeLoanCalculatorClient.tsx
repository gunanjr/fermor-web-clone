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
const STORAGE_KEY = 'fermor-sbi-home-loan-v1';

const BANKS = [
  { name: 'SBI', rate: 8.40 },
  { name: 'HDFC Bank', rate: 8.50 },
  { name: 'ICICI Bank', rate: 8.45 },
  { name: 'PNB', rate: 8.55 },
  { name: 'Axis Bank', rate: 8.60 },
  { name: 'Kotak', rate: 8.70 },
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
  rate: 8.40,
  values: [
    [18521, 14684, 12920, 11978, 11429],
    [24694, 19578, 17226, 15970, 15238],
    [30868, 24473, 21533, 19963, 19048],
    [37041, 29367, 25839, 23955, 22857],
    [49388, 39156, 34452, 31940, 30476],
    [61735, 48945, 43065, 39925, 38095],
    [92603, 73418, 64598, 59888, 57143],
    [123470, 97890, 86130, 79850, 76190],
  ],
};

const ELIGIBILITY_TABLE = [
  { salary: 30000, maxEmi: 15000, loan20: 1741500, loan30: 1968900 },
  { salary: 50000, maxEmi: 25000, loan20: 2902500, loan30: 3281500 },
  { salary: 75000, maxEmi: 37500, loan20: 4353750, loan30: 4922250 },
  { salary: 100000, maxEmi: 50000, loan20: 5805000, loan30: 6563000 },
  { salary: 150000, maxEmi: 75000, loan20: 8707500, loan30: 9844500 },
  { salary: 200000, maxEmi: 100000, loan20: 11610000, loan30: 13126000 },
];

function fmt(n: number): string {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${Math.round(n).toLocaleString('en-IN')}`;
}

function fmtEmi(n: number): string {
  return `₹${Math.round(n).toLocaleString('en-IN')}`;
}

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
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const pArc = (principal / total) * circ;
  const pPct = Math.round((principal / total) * 100);
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" style={{ display: 'block' }}
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

function YearPresets({ current, onChange }: { current: number; onChange: (value: number) => void }) {
  return (
    <div role="group" aria-label="Loan tenure presets" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: -18, marginBottom: 20 }}>
      {[5, 10, 15, 20, 25, 30].map(value => {
        const active = current === value;
        return (
          <button key={value} onClick={() => onChange(value)} aria-pressed={active} aria-label={`Set loan tenure to ${value} years`}
            style={{ fontSize: 11.5, fontWeight: active ? 700 : 500, color: active ? C.ink : C.ink3, background: active ? C.white : 'transparent', border: `1px solid ${active ? C.ink : C.border}`, borderRadius: 99, padding: '3px 9px', cursor: 'pointer', fontFamily: INTER }}>
            {value}Y
          </button>
        );
      })}
    </div>
  );
}

function PrepaymentPanel({ loanAmount, prepayAmt, setPrepayAmt, prepayMonthsSaved, prepayInterestSaved, fmtC, mobile, showPrepay, setShowPrepay }: {
  loanAmount: number; prepayAmt: number; setPrepayAmt: (v: number) => void;
  prepayMonthsSaved: number; prepayInterestSaved: number; fmtC: (n: number) => string;
  mobile: boolean; showPrepay: boolean; setShowPrepay: (fn: (v: boolean) => boolean) => void;
}) {
  return (
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
            See how a one-time lump sum prepayment on the loan configured in the EMI Calculator tab reduces your tenure at the same EMI.
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
  );
}

function AmortizationChart({ rows }: { rows: YearRow[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxTotal = Math.max(...rows.map(row => row.principal + row.interest));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;
  return (
    <svg role="img" aria-label="Year-by-year home loan principal and interest repayment" viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {rows.map((row, index) => {
        const total = row.principal + row.interest;
        const totalH = maxTotal > 0 ? (total / maxTotal) * H : 0;
        const principalH = total > 0 ? (row.principal / total) * totalH : 0;
        const x = PADL + index * slot + gap;
        return <g key={row.year}>
          <rect x={x} y={H - totalH} width={barW} height={totalH - principalH} fill={CHART_PAIR.secondary} rx={2} />
          <rect x={x} y={H - principalH} width={barW} height={principalH} fill={CHART_PAIR.primary} rx={2} />
          {rows.length <= 30 && <text x={x + barW / 2} y={H + 14} textAnchor="middle" style={{ fontSize: rows.length > 20 ? 7 : 9, fill: C.ink3, fontFamily: INTER }}>{row.year}</text>}
        </g>;
      })}
      <line x1={PADL} y1={H} x2={W} y2={H} stroke={C.border} strokeWidth={1} />
    </svg>
  );
}

const FAQS = [
  { q: "What is SBI's current home loan interest rate?", a: "SBI home loan rates start at 8.40% p.a. for salaried borrowers as of June 2026. Rates are linked to the RBI External Benchmark Lending Rate and are reviewed every quarter. Women borrowers receive an additional 0.05% concession." },
  { q: 'How is SBI home loan EMI calculated?', a: "SBI uses the reducing-balance formula: EMI = P x R x (1+R)^N / [(1+R)^N - 1], where P is the loan amount, R is the monthly interest rate (annual rate / 1200), and N is the total months. For a Rs 30 lakh loan at 8.40% for 20 years, the monthly EMI is approximately Rs 25,839." },
  { q: "What is the EMI for a Rs 20 lakh SBI home loan for 20 years?", a: "At 8.40%, the EMI for a Rs 20 lakh SBI home loan for 20 years is Rs 17,226 per month. Total interest paid over 20 years is approximately Rs 21.3 lakh, making total repayment Rs 41.3 lakh." },
  { q: "What is the EMI for a Rs 25 lakh SBI home loan for 10 years?", a: "At 8.40%, the EMI for a Rs 25 lakh SBI home loan for 10 years is Rs 30,868 per month. For a 20-year tenure on the same amount, the EMI drops to Rs 21,533 but total interest increases." },
  { q: 'How much home loan can I get based on my salary at SBI?', a: "SBI uses a FOIR of 50% of net monthly income as the maximum allowable EMI. For a net salary of Rs 1 lakh per month, maximum EMI eligibility is Rs 50,000. At 8.40% for 20 years, this means a loan eligibility of approximately Rs 58 lakh." },
  { q: "What is SBI's minimum down payment requirement?", a: "For properties up to Rs 75 lakh, SBI requires 10-15% down payment. Properties above Rs 75 lakh and up to Rs 5 crore require 20% down. Plot loans need 25-35% down payment." },
  { q: 'What is SBI MaxGain home loan and who should use it?', a: "SBI MaxGain is an overdraft home loan where parking surplus funds in the account reduces the principal on which daily interest accrues. It is best for borrowers who receive annual bonuses or have irregular income. Parking Rs 5 lakh on a Rs 50 lakh MaxGain loan at 8.40% saves approximately Rs 42,000 in annual interest." },
  { q: 'What are the tax benefits on an SBI home loan?', a: "Under Section 24(b), you can claim up to Rs 2 lakh per year on home loan interest for a self-occupied property. Under Section 80C, principal repayment up to Rs 1.5 lakh is deductible annually. First-time buyers of properties up to Rs 45 lakh can also claim Rs 1.5 lakh under Section 80EEA." },
  { q: "What CIBIL score does SBI require?", a: "SBI requires a minimum CIBIL score of 700 for home loan approval. Scores above 750 qualify for the best rates and fastest processing. Below 700 typically results in rejection or a significantly higher interest rate." },
  { q: 'What happens if I prepay my SBI home loan?', a: "SBI charges no prepayment penalty on floating-rate home loans per RBI guidelines. On a Rs 30 lakh loan at 8.40%, prepaying Rs 2 lakh in year one typically saves Rs 7-8 lakh in total interest and cuts 3-4 years off the tenure." },
  { q: 'What is pre-EMI on an SBI home loan?', a: "Pre-EMI is the interest paid on the disbursed amount during under-construction phases. It covers only interest, not principal, so it is lower than the full EMI. Once full disbursement happens and possession is given, the full EMI covering principal and interest begins." },
  { q: 'Can I transfer my existing home loan to SBI?', a: "Yes, SBI accepts balance transfers from all major banks and NBFCs. You need 12 months of EMI statements, original loan documents, and property papers. SBI charges a processing fee of 0.25% of the outstanding loan amount." },
  { q: "What is SBI's home loan processing fee?", a: "SBI charges 0.35% of the loan amount for regular home loans (minimum Rs 2,000, maximum Rs 10,000). Balance transfer loans attract 0.25%. SBI periodically waives this fee during festive campaigns." },
  { q: 'Does SBI offer home loans for plot purchase?', a: "Yes, under its Real Estate Loan scheme, covering up to 75% of the plot cost. Rates are slightly higher than regular home loans, typically 8.70-9.00% p.a. Available only for residential plots." },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

type Tab = 'emi' | 'eligibility' | 'table';

export default function SBIHomeLoanCalculatorClient() {
  const [mobile, setMobile] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('emi');

  // EMI tab state
  const defaultSettings = { propertyPrice: 7500000, downPaymentPct: 20, rate: 8.40, tenureYr: 20, tenureMode: 'yr', tenureMo: 240, prepayAmt: 0, grossSalary: 100000, otherEMIs: 0, eligRate: 8.40, eligTenure: 20 };
  const { settings, updateSettings } = useCalculatorSettings('sbi-home-loan-calculator', defaultSettings);
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
  const [showAdvancedEmi, setShowAdvancedEmi] = useState(false);

  // Eligibility tab state
  const [showAdvancedElig, setShowAdvancedElig] = useState(false);
  const { formatCurrency, convertCurrency, selectedCurrency } = useCurrency();
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

  // EMI calculations
  const downPayment = propertyPrice * downPaymentPct / 100;
  const loanAmount = propertyPrice - downPayment;
  const months = tenureMode === 'yr' ? tenureYr * 12 : tenureMo;
  const emi = useMemo(() => calcEMI(loanAmount, rate, months), [loanAmount, rate, months]);
  const totalPayable = emi * months;
  const totalInterest = totalPayable - loanAmount;
  const principalPct = totalPayable > 0 ? Math.round((loanAmount / totalPayable) * 100) : 0;
  const emiPerLakh = loanAmount > 0 ? emi / (loanAmount / 100000) : 0;
  const ltvPct = propertyPrice > 0 ? Math.round((loanAmount / propertyPrice) * 100) : 0;

  const yearlyRows = useMemo(() => buildYearly(loanAmount, rate, months, emi), [loanAmount, rate, months, emi]);
  const monthlyRows = useMemo(() => amortView === 'monthly' ? buildMonthly(loanAmount, rate, months, emi) : [], [loanAmount, rate, months, emi, amortView]);

  const prepayMonths = useMemo(() => calcMonthsSaved(loanAmount, rate, months, emi, prepayAmt), [loanAmount, rate, months, emi, prepayAmt]);
  const prepayMonthsSaved = months - prepayMonths;
  const prepayInterestSaved = emi * prepayMonthsSaved;

  const bankComparisons = useMemo(() =>
    BANKS.map(b => {
      const e = calcEMI(loanAmount, b.rate, months);
      const tp = e * months;
      return { ...b, emi: e, totalPayable: tp, totalInterest: tp - loanAmount };
    }), [loanAmount, months]);

  // Eligibility calculations
  const netSalary = grossSalary * 0.85;
  const maxEmi = netSalary * 0.50 - otherEMIs;
  const maxLoan = useMemo(() => calcMaxLoan(Math.max(0, maxEmi), eligRate, eligTenure * 12), [maxEmi, eligRate, eligTenure]);
  const propertyBudget = maxLoan / 0.80;
  const annualIncomeMultiple = grossSalary > 0 ? maxLoan / (grossSalary * 12) : 0;

  const h2 = { fontSize: mobile ? 18 : 21, fontWeight: 700, color: C.ink, margin: '0 0 12px', letterSpacing: '-0.015em' } as React.CSSProperties;
  const p = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            SBI Home Loan Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 15, color: C.ink2, margin: 0, lineHeight: 1.6, maxWidth: mobile ? '100%' : 800 }}>
            Calculate your SBI home loan EMI, check eligibility by salary, compare interest rates, and see the full repayment schedule.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>

              {/* Tab navigation: inside card, CAGR underline style */}
              <div role="tablist" aria-label="Calculator mode" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                {([['emi', 'EMI Calculator'], ['eligibility', 'Eligibility Check'], ['table', 'EMI Table']] as [Tab, string][]).map(([t, label]) => (
                  <button key={t} id={`tab-${t}`} role="tab" aria-selected={activeTab === t} aria-controls={`panel-${t}`}
                    onClick={() => setActiveTab(t)}
                    style={{ flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer', fontSize: mobile ? 12.5 : 13.5, fontWeight: activeTab === t ? 700 : 400, color: activeTab === t ? C.dark : C.ink3, borderBottom: activeTab === t ? `2.5px solid ${C.dark}` : '2.5px solid transparent', transition: 'all 0.15s', fontFamily: INTER }}>
                    {label}
                  </button>
                ))}
              </div>

              {/* ===== TAB 1: EMI CALCULATOR ===== */}
              {activeTab === 'emi' && (
                <div id="panel-emi" role="tabpanel" aria-labelledby="tab-emi">

                <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                  <div style={{ padding: mobile ? '20px 18px' : '44px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>SBI Home Loan Details</p>
                      <CurrencySelector theme="light" />
                    </div>

                    {!showAdvancedEmi ? (
                      <>
                        <Slider label="Property Price" value={propertyPrice} min={500000} max={100000000} step={100000}
                          display={fmtC(propertyPrice)} onChange={setPropertyPrice} compact={mobile} />

                        <div style={{ marginBottom: 28, padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: 13, color: C.ink2, fontWeight: 500 }}>Loan Amount (P)</span>
                          <span style={{ fontSize: 13, color: C.ink, fontWeight: 700 }}>{fmtC(loanAmount)}</span>
                        </div>

                        <Slider label="Interest Rate (p.a.)" value={rate} min={5} max={18} step={0.05}
                          display={`${rate.toFixed(2)}%`} onChange={setRate} compact={mobile} />

                        <div style={{ marginBottom: 12 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                            <label style={{ fontSize: 14, color: C.ink2, fontWeight: 400 }}>Loan Tenure</label>
                            <div style={{ display: 'flex', background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                              {(['yr', 'mo'] as const).map(m => (
                                <button key={m} onClick={() => setTenureMode(m)} aria-pressed={tenureMode === m} style={{ padding: '6px 12px', border: 'none', borderRight: m === 'yr' ? `1px solid ${C.border}` : 'none', background: tenureMode === m ? C.white : 'transparent', color: tenureMode === m ? C.ink : C.ink3, fontFamily: INTER, fontSize: 12, fontWeight: tenureMode === m ? 600 : 400, cursor: 'pointer', transition: 'all 0.15s' }}>
                                  {m === 'yr' ? 'Years' : 'Months'}
                                </button>
                              ))}
                            </div>
                          </div>
                          {tenureMode === 'yr'
                            ? <Slider label="" value={tenureYr} min={1} max={30} step={1} display={`${tenureYr} yr`} onChange={v => { setTenureYr(v); setTenureMo(v * 12); }} compact={mobile} />
                            : <Slider label="" value={tenureMo} min={12} max={360} step={1} display={`${tenureMo} mo`} onChange={v => { setTenureMo(v); setTenureYr(Math.round(v / 12)); }} compact={mobile} />}
                          {tenureMode === 'yr' && <YearPresets current={tenureYr} onChange={value => { setTenureYr(value); setTenureMo(value * 12); }} />}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <button onClick={() => setShowAdvancedEmi(true)} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', color: C.ink2, fontFamily: INTER, fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: '6px 2px' }}>
                            More settings
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.ink2} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 6 15 12 9 18" /></svg>
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Slider label="Down Payment" value={downPaymentPct} min={10} max={60} step={1}
                          display={`${downPaymentPct}%`} onChange={setDownPaymentPct} compact={mobile} />

                        <div style={{ marginBottom: 28, padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: 13, color: C.ink2, fontWeight: 500 }}>Down Payment Amount</span>
                          <span style={{ fontSize: 13, color: C.ink, fontWeight: 700 }}>{fmtC(downPayment)}</span>
                        </div>

                        <p style={{ fontSize: 12.5, color: C.ink3, lineHeight: 1.6, margin: '0 0 20px' }}>
                          SBI requires 10-15% down payment for properties up to Rs 75 lakh, and 20% above that. The default of 20% works for most cases.
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                          <button onClick={() => setShowAdvancedEmi(false)} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', color: C.ink2, fontFamily: INTER, fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: '6px 2px' }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.ink2} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 6 9 12 15 18" /></svg>
                            Back
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Results panel */}
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
                      { label: 'EMI per lakh borrowed', value: `₹${Math.round(emiPerLakh).toLocaleString('en-IN')}` },
                      { label: 'Loan-to-value (LTV)', value: `${ltvPct}%` },
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

                <PrepaymentPanel loanAmount={loanAmount} prepayAmt={prepayAmt} setPrepayAmt={setPrepayAmt}
                  prepayMonthsSaved={prepayMonthsSaved} prepayInterestSaved={prepayInterestSaved} fmtC={fmtC}
                  mobile={mobile} showPrepay={showPrepay} setShowPrepay={setShowPrepay} />

                {/* Bank comparison */}
                <div style={{ borderTop: `1px solid ${C.border}`, padding: mobile ? '20px 18px' : '28px 44px' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: 16 }}>Compare Home Loan Rates Across Banks</div>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 480 }}>
                      <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, paddingTop: 8, textAlign: 'left' }}>
                        EMI comparison for the same loan amount and tenure at each bank&apos;s indicative rate
                      </caption>
                      <thead>
                        <tr style={{ background: '#f4f5f6' }}>
                          {['Bank', 'Rate', 'Monthly EMI', 'Total Interest', 'Total Payable'].map(h => (
                            <th key={h} scope="col" style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {bankComparisons.map((b, i) => {
                          const isSBI = b.name === 'SBI';
                          return (
                            <tr key={b.name} style={{ borderTop: `1px solid ${C.border}`, background: isSBI ? C.paleLime : (i % 2 === 0 ? C.white : '#fafafa'), fontWeight: isSBI ? 700 : 400 }}>
                              <td style={{ padding: '11px 16px', color: isSBI ? C.dark : C.ink, fontWeight: isSBI ? 700 : 500 }}>
                                {isSBI && <span style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontSize: 9, fontWeight: 700, padding: '2px 5px', borderRadius: 3, marginRight: 6 }}>SBI</span>}
                                {b.name}
                              </td>
                              <td style={{ padding: '11px 16px', color: isSBI ? C.dark : C.ink2, fontWeight: isSBI ? 700 : 400 }}>{b.rate.toFixed(2)}%</td>
                              <td style={{ padding: '11px 16px', color: isSBI ? C.dark : C.ink2, fontWeight: isSBI ? 700 : 400 }}>{fmtIN(b.emi)}</td>
                              <td style={{ padding: '11px 16px', color: C.green, fontWeight: 600 }}>{fmtC(b.totalInterest)}</td>
                              <td style={{ padding: '11px 16px', color: isSBI ? C.dark : C.ink2, fontWeight: isSBI ? 700 : 400 }}>{fmtC(b.totalPayable)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <p style={{ fontSize: 11, color: C.ink3, marginTop: 10, lineHeight: 1.5 }}>
                    Rates are indicative as of {new Date().toLocaleString('en-IN', { month: 'long', year: 'numeric' })}. Actual rates depend on your CIBIL score, loan amount, and relationship with the bank.
                  </p>
                </div>

                {/* Amortization */}
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
                    <div id="amort-panel" style={{ borderTop: `1px solid ${C.border}` }}>
                      <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                        <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} /><span style={{ fontSize: 11.5, color: C.ink2 }}>Principal paid</span></div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} /><span style={{ fontSize: 11.5, color: C.ink2 }}>Interest paid</span></div>
                        </div>
                        <AmortizationChart rows={yearlyRows} />
                      </div>
                      <div style={{ display: 'flex', gap: 4, padding: mobile ? '12px 18px' : '14px 44px', paddingBottom: 0 }}>
                        {(['yearly', 'monthly'] as const).map(v => (
                          <button key={v} onClick={() => setAmortView(v)} style={{ padding: '6px 14px', borderRadius: 8, border: `1px solid ${amortView === v ? C.dark : C.border}`, background: amortView === v ? C.dark : C.white, color: amortView === v ? C.white : C.ink2, fontFamily: INTER, fontSize: 12, fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }}>
                            {v}
                          </button>
                        ))}
                      </div>
                      {mobile && <div style={{ textAlign: 'center', padding: '8px 0 4px', fontSize: 11.5, color: C.ink3 }}>Swipe to see all columns</div>}
                      <div style={{ overflowX: 'auto', maxHeight: 400, overflowY: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                          <thead style={{ position: 'sticky', top: 0 }}>
                            <tr style={{ background: '#f4f5f6' }}>
                              {amortView === 'yearly'
                                ? ['Year', 'Opening Balance', 'Principal Paid', 'Interest Paid', 'Closing Balance'].map(h => (
                                    <th key={h} scope="col" style={{ padding: '10px 20px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                                  ))
                                : ['Month', 'Year', 'Opening Balance', 'EMI', 'Principal', 'Interest', 'Closing Balance'].map(h => (
                                    <th key={h} scope="col" style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: C.ink3, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                                  ))
                              }
                            </tr>
                          </thead>
                          <tbody>
                            {amortView === 'yearly'
                              ? yearlyRows.map((row, i) => (
                                  <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                    <td style={{ padding: '11px 20px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                                    <td style={{ padding: '11px 20px', color: C.ink2 }}>{fmtIN(row.openingBal)}</td>
                                    <td style={{ padding: '11px 20px', color: C.green, fontWeight: 600 }}>{fmtIN(row.principal)}</td>
                                    <td style={{ padding: '11px 20px', color: C.ink2 }}>{fmtIN(row.interest)}</td>
                                    <td style={{ padding: '11px 20px', color: C.ink2 }}>{fmtIN(row.closingBal)}</td>
                                  </tr>
                                ))
                              : buildMonthly(loanAmount, rate, months, emi).map((row, i) => (
                                  <tr key={row.month} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                    <td style={{ padding: '9px 14px', fontWeight: 600, color: C.dark }}>{row.month}</td>
                                    <td style={{ padding: '9px 14px', color: C.ink3 }}>{row.year}</td>
                                    <td style={{ padding: '9px 14px', color: C.ink2 }}>{fmtIN(row.openingBal)}</td>
                                    <td style={{ padding: '9px 14px', color: C.ink }}>{fmtIN(row.emi)}</td>
                                    <td style={{ padding: '9px 14px', color: C.green, fontWeight: 600 }}>{fmtIN(row.principal)}</td>
                                    <td style={{ padding: '9px 14px', color: C.ink2 }}>{fmtIN(row.interest)}</td>
                                    <td style={{ padding: '9px 14px', color: C.ink2 }}>{fmtIN(row.closingBal)}</td>
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

              {/* ===== TAB 2: ELIGIBILITY CALCULATOR ===== */}
              {activeTab === 'eligibility' && (
                <div id="panel-eligibility" role="tabpanel" aria-labelledby="tab-eligibility">
                <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                  <div style={{ padding: mobile ? '20px 18px' : '44px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 28px' }}>Your Income and Obligations</p>

                    {!showAdvancedElig ? (
                      <>
                        <Slider label="Gross monthly salary" value={grossSalary} min={20000} max={1000000} step={5000}
                          display={fmtEmi(grossSalary)} onChange={setGrossSalary} compact={mobile} />

                        <Slider label="Existing EMIs per month" value={otherEMIs} min={0} max={100000} step={1000}
                          display={fmtEmi(otherEMIs)} onChange={setOtherEMIs} compact={mobile} />

                        <div style={{ padding: '12px 16px', background: '#FFF4E5', border: '1px solid #FFD8A8', borderRadius: 10, marginBottom: 20 }}>
                          <p style={{ fontSize: 12, color: '#A15C00', lineHeight: 1.6, margin: 0 }}>
                            SBI uses a FOIR (Fixed Obligation to Income Ratio) of 50% of net income. Net income is estimated at 85% of gross salary. A CIBIL score above 700 is required.
                          </p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <button onClick={() => setShowAdvancedElig(true)} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', color: C.ink2, fontFamily: INTER, fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: '6px 2px' }}>
                            More settings
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.ink2} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 6 15 12 9 18" /></svg>
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Slider label="Expected interest rate (%)" value={eligRate} min={5} max={18} step={0.05}
                          display={`${eligRate.toFixed(2)}%`} onChange={setEligRate} compact={mobile} />

                        <Slider label="Preferred tenure (years)" value={eligTenure} min={5} max={30} step={1}
                          display={`${eligTenure} yr`} onChange={setEligTenure} compact={mobile} />

                        <p style={{ fontSize: 12.5, color: C.ink3, lineHeight: 1.6, margin: '0 0 20px' }}>
                          These are assumptions for the eligibility estimate, not your actual sanctioned rate. SBI confirms the exact rate after credit assessment.
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                          <button onClick={() => setShowAdvancedElig(false)} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', color: C.ink2, fontFamily: INTER, fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: '6px 2px' }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.ink2} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 6 9 12 15 18" /></svg>
                            Back
                          </button>
                        </div>
                      </>
                    )}
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
                      { label: 'Loan as multiple of annual income', value: `${annualIncomeMultiple.toFixed(1)}x` },
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
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: 16 }}>SBI Home Loan Eligibility Based on Salary</div>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 480 }}>
                      <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, paddingTop: 8, textAlign: 'left' }}>
                        Calculated at 8.40% p.a. Net salary at 85% of gross. Actual eligibility varies by CIBIL score and existing obligations.
                      </caption>
                      <thead>
                        <tr style={{ background: '#f4f5f6' }}>
                          {['Net Monthly Salary', 'Max EMI (50%)', 'Max Loan (20 yr)', 'Max Loan (30 yr)'].map(h => (
                            <th key={h} scope="col" style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {ELIGIBILITY_TABLE.map((row, i) => (
                          <tr key={row.salary} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={{ padding: '11px 16px', fontWeight: 600, color: C.ink }}>{fmtEmi(row.salary)}</td>
                            <td style={{ padding: '11px 16px', color: C.ink2 }}>{fmtEmi(row.maxEmi)}</td>
                            <td style={{ padding: '11px 16px', color: C.green, fontWeight: 600 }}>{fmt(row.loan20)}</td>
                            <td style={{ padding: '11px 16px', color: C.green, fontWeight: 600 }}>{fmt(row.loan30)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p style={{ fontSize: 11, color: C.ink3, marginTop: 10 }}>Calculated at 8.40% p.a. Net salary assumed at 85% of gross. Actual eligibility varies by CIBIL score, employer category, and existing obligations.</p>
                </div>
                <PrepaymentPanel loanAmount={loanAmount} prepayAmt={prepayAmt} setPrepayAmt={setPrepayAmt}
                  prepayMonthsSaved={prepayMonthsSaved} prepayInterestSaved={prepayInterestSaved} fmtC={fmtC}
                  mobile={mobile} showPrepay={showPrepay} setShowPrepay={setShowPrepay} />
              </div>
            )}

              {/* ===== TAB 3: EMI REFERENCE TABLE ===== */}
              {activeTab === 'table' && (
                <div id="panel-table" role="tabpanel" aria-labelledby="tab-table">
                <div style={{ padding: mobile ? '20px 18px' : '32px 44px', borderBottom: `1px solid ${C.border}` }}>
                  <h2 style={{ fontSize: mobile ? 17 : 19, fontWeight: 700, color: C.ink, margin: '0 0 8px' }}>SBI Home Loan EMI Table at 8.40%</h2>
                  <p style={{ fontSize: 13, color: C.ink2, margin: 0, lineHeight: 1.6 }}>
                    Pre-computed monthly EMI for common loan amounts at SBI&apos;s current base rate of 8.40% p.a. Figures are indicative; actual EMI may vary by 1-2% based on exact rate applied.
                  </p>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, paddingTop: 8, textAlign: 'left', padding: '8px 20px 0' }}>
                      Monthly EMI at 8.40% p.a. (SBI base rate for salaried borrowers). Calculated using the reducing-balance method.
                    </caption>
                    <thead>
                      <tr style={{ background: '#f4f5f6' }}>
                        <th scope="col" style={{ padding: '12px 20px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>Loan Amount</th>
                        {EMI_TABLE.tenures.map(t => (
                          <th key={t} scope="col" style={{ padding: '12px 20px', textAlign: 'right', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{t} Years</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {EMI_TABLE.labels.map((label, ri) => (
                        <tr key={label} style={{ borderTop: `1px solid ${C.border}`, background: ri % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ padding: '12px 20px', fontWeight: 700, color: C.ink, whiteSpace: 'nowrap' }}>{label}</td>
                          {EMI_TABLE.values[ri].map((v, ci) => (
                            <td key={ci} style={{ padding: '12px 20px', textAlign: 'right', color: C.green, fontWeight: 600 }}>
                              {fmtEmi(v)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ padding: mobile ? '16px 18px' : '16px 44px', borderTop: `1px solid ${C.border}` }}>
                  <p style={{ fontSize: 11, color: C.ink3, margin: 0 }}>
                    Rate: 8.40% p.a. (SBI base rate for salaried borrowers as of June 2026). EMI calculated using the reducing-balance method. Figures rounded to nearest rupee.
                  </p>
                </div>
                <PrepaymentPanel loanAmount={loanAmount} prepayAmt={prepayAmt} setPrepayAmt={setPrepayAmt}
                  prepayMonthsSaved={prepayMonthsSaved} prepayInterestSaved={prepayInterestSaved} fmtC={fmtC}
                  mobile={mobile} showPrepay={showPrepay} setShowPrepay={setShowPrepay} />
                </div>
              )}

            </div>{/* end outer calculator card */}

            

            {/* ===== ARTICLE CONTENT ===== */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>
            <article itemScope itemType="https://schema.org/Article">
              <div style={sec}>
                <h2 id="sbi-home-loan-rate" style={h2}>What Is SBI Home Loan Interest Rate Today?</h2>
                <p style={p}>
                  SBI home loan interest rates start at 8.40% p.a. for salaried borrowers as of June 2026. The rate is linked to the RBI&apos;s repo rate through the External Benchmark Lending Rate (EBLR) and is reviewed every quarter.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                      <tr style={{ background: '#f4f5f6' }}>
                        {['Loan Category', 'Interest Rate', 'Processing Fee'].map(h => (
                          <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { category: 'Regular Home Loan (up to Rs 75L)', rate: '8.40% onward', fee: '0.35% (min Rs 2,000)' },
                        { category: 'Home Loan (Rs 75L to Rs 5 Cr)', rate: '8.45% onward', fee: '0.35%' },
                        { category: 'Women Borrowers (all slabs)', rate: '0.05% concession', fee: 'Same as above' },
                        { category: 'PMAY Scheme Eligible', rate: '8.15% onward', fee: 'Nil' },
                        { category: 'Balance Transfer', rate: '8.40% onward', fee: '0.25%' },
                        { category: 'Plot Loan', rate: '8.70% onward', fee: '0.35%' },
                      ].map((row, i) => (
                        <tr key={row.category} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ padding: '11px 16px', fontWeight: 500, color: C.ink }}>{row.category}</td>
                          <td style={{ padding: '11px 16px', color: C.green, fontWeight: 600 }}>{row.rate}</td>
                          <td style={{ padding: '11px 16px', color: C.ink2 }}>{row.fee}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.5 }}>
                  Rates are indicative and subject to change. Per <Link href="https://homeloans.sbi.co.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SBI Home Loans</Link>, actual rates depend on the borrower&apos;s CIBIL score, loan amount, and employment category.
                </p>
              </div>

              <div style={sec}>
                <h2 id="sbi-emi-by-amount" style={h2}>SBI Home Loan EMI for Rs 20 Lakh, Rs 25 Lakh, and Rs 30 Lakh</h2>
                <p style={p}>
                  At 8.40%, a Rs 20 lakh SBI home loan for 20 years costs Rs 17,226 per month; for 10 years, it costs Rs 24,694 per month. The EMI Table tab above shows pre-computed values for all common amounts from Rs 15 lakh to Rs 1 crore.
                </p>
                <p style={p}>
                  Comparing tenures is important because a lower EMI does not mean a cheaper loan. A Rs 30 lakh loan at 8.40% for 20 years has an EMI of Rs 25,839 and total interest of Rs 32 lakh. The same loan for 10 years has an EMI of Rs 37,041 but total interest of only Rs 14.4 lakh.
                </p>
                <p style={p}>
                  Use the <Link href="/calculators/emi-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>EMI Calculator</Link> to compare any loan amount and tenure side-by-side.
                </p>
                <p style={p}>
                  The <Link href="/calculators/mortgage-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Home Loan EMI Calculator</Link> runs the same reducing-balance math for any lender, useful when you want to weigh an SBI offer against a private bank&apos;s quote.
                </p>
                <p style={p}>
                  Use the <Link href="/calculators/investment-comparison-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Investment Comparison Calculator</Link> to see whether paying a higher EMI and clearing the loan early beats investing the surplus instead.
                </p>
              </div>

              <div style={sec}>
                <h2 id="sbi-eligibility" style={h2}>How to Check SBI Home Loan Eligibility Based on Salary</h2>
                <p style={p}>
                  SBI approves a maximum monthly EMI equal to 50% of your net monthly take-home salary, after deducting existing loan obligations. This ratio is called the FOIR (Fixed Obligation to Income Ratio).
                </p>
                <p style={p}>
                  For a gross salary of Rs 1 lakh per month, net take-home is approximately Rs 85,000 after PF and tax. SBI&apos;s maximum allowable EMI is 50% of Rs 85,000, which is Rs 42,500. At 8.40% for 20 years, this translates to a loan eligibility of approximately Rs 49 lakh.
                </p>
                <p style={p}>
                  Switch to the Eligibility Check tab above for an instant calculation. A CIBIL score above 700 is mandatory; above 750 gets you the best rate and fastest approval.
                </p>
                <p style={p}>
                  For a deeper check that accounts for FOIR, age-based tenure capping, and salary slabs from Rs 20,000 to Rs 2 lakh, use the <Link href="/calculators/home-loan-eligibility-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Home Loan Eligibility Calculator</Link>.
                </p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Home Loan Eligibility Calculator</p>
                    <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Check your exact borrowing capacity across FOIR, age, and tenure before you shop for a property.</p>
                  </div>
                  <Link className="fx-btn" href="/calculators/home-loan-eligibility-calculator" target="_blank" rel="noopener noreferrer"
                    style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                </div>
              </div>

              <div style={sec}>
                <h2 id="sbi-emi-formula" style={h2}>SBI Home Loan EMI Formula</h2>
                <p style={p}>
                  The formula is: EMI = P x R x (1+R)^N divided by [(1+R)^N minus 1]. P is the loan principal, R is the monthly interest rate (annual rate divided by 1200), and N is the total number of monthly instalments.
                </p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 20px', marginBottom: 14, fontFamily: 'monospace', fontSize: 14, color: C.dark, lineHeight: 1.8 }}>
                  EMI = P x R x (1+R)^N / [(1+R)^N - 1]<br />
                  where R = Annual Rate / 1200<br />
                  <br />
                  Example: Rs 30L at 8.40% for 20 years<br />
                  R = 8.40 / 1200 = 0.007<br />
                  N = 240 months<br />
                  EMI = 30,00,000 x 0.007 x (1.007)^240 / [(1.007)^240 - 1]<br />
                  EMI = Rs 25,839 per month
                </div>
                <p style={p}>
                  The reducing-balance method means each month&apos;s interest is calculated on the outstanding principal, not the original loan. This is why the interest component decreases and the principal component increases with every EMI.
                </p>
              </div>

              <div style={sec}>
                <h2 id="sbi-maxgain" style={h2}>What Is SBI MaxGain Home Loan?</h2>
                <p style={p}>
                  SBI MaxGain is an overdraft home loan account: your loan works like an OD facility against your property. Any surplus funds you park in the MaxGain account reduce the outstanding principal on which daily interest is calculated, while remaining fully accessible at any time.
                </p>
                <p style={p}>
                  On a Rs 50 lakh MaxGain loan at 8.40%, parking Rs 5 lakh in the account saves approximately Rs 42,000 in annual interest, equivalent to earning 8.40% tax-free on that Rs 5 lakh. MaxGain is most valuable for borrowers who receive large annual bonuses, business owners with seasonal income, or anyone who holds significant liquid savings.
                </p>
                <p style={p}>
                  The processing fee and documentation for MaxGain are the same as a regular SBI home loan. The interest rate is also the same. The only difference is the overdraft structure.
                </p>
              </div>

              <div style={sec}>
                <h2 id="sbi-tax-benefits" style={h2}>Tax Benefits on Your SBI Home Loan</h2>
                <p style={p}>
                  Under Section 24(b) of the Income Tax Act, you can claim a deduction of up to Rs 2 lakh per year on home loan interest for a self-occupied property. For a Rs 30 lakh loan at 8.40% in year one, interest paid is approximately Rs 2.48 lakh, so you hit the Rs 2 lakh cap almost immediately.
                </p>
                <p style={p}>
                  Under Section 80C, principal repayment of up to Rs 1.5 lakh per year is deductible. This is part of the broader Rs 1.5 lakh 80C bucket that also includes PPF, ELSS, and life insurance premiums. Use the <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</Link> to see the exact impact on your tax liability.
                </p>
                <p style={p}>
                  First-time buyers of properties valued up to Rs 45 lakh may also claim an additional Rs 1.5 lakh under Section 80EEA. All three benefits combined can reduce your effective loan cost by 1.5-2% p.a. for taxpayers in the 30% bracket.
                </p>
              </div>

              <div style={sec}>
                <h2 id="sbi-prepayment" style={h2}>How to Prepay Your SBI Home Loan</h2>
                <p style={p}>
                  SBI charges no prepayment penalty on floating-rate home loans, per RBI circular RBI/2011-12/540 issued in 2012. You can make partial or full prepayments at any time without any charges.
                </p>
                <p style={p}>
                  A prepayment of Rs 2 lakh on a Rs 30 lakh loan at 8.40% in the first year reduces the outstanding principal immediately and lowers the tenure by 3-4 years at the same EMI. The interest saved over the remaining life of the loan is typically 3-4 times the prepayment amount.
                </p>
                <p style={p}>
                  Use the Prepayment Impact section in the EMI Calculator tab above to see the exact months saved and interest saved for any prepayment amount you enter.
                </p>
                <p style={p}>
                  If a competing lender is quoting a meaningfully lower rate than your current SBI loan, run the numbers through the <Link href="/calculators/balance-transfer-savings-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Balance Transfer Savings Calculator</Link> before switching, since transfer fees and a new processing fee eat into the saving.
                </p>
              </div>


              <div style={sec}>
                <h2 id="faq" style={h2}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All calculations on this page are indicative only. EMI figures are based on the reducing-balance method at the rate entered and do not account for processing fees, insurance, or other charges. SBI interest rates are subject to change based on RBI repo rate revisions. Eligibility estimates are based on the FOIR guideline and may differ from actual SBI credit assessments. This calculator is for educational and planning purposes only and does not constitute financial advice. Consult a SEBI-registered investment adviser before making borrowing or investment decisions.
                </p>
              </div>
            </article>

          </div>

          {/* Sidebar */}
          <style>{`
            .sbi-sidebar::-webkit-scrollbar { width: 5px; }
            .sbi-sidebar::-webkit-scrollbar-track { background: transparent; }
            .sbi-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .sbi-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            className="sbi-sidebar"
            style={{
              display: mobile ? 'none' : 'flex',
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
            <nav aria-label="Related Calculators" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
              <div style={{ background: C.bg, padding: '10px 18px', borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Popular Calculators</span>
              </div>
              {[
                { href: '/calculators/home-loan-eligibility-calculator', label: 'Home Loan Eligibility Calculator' },
                { href: '/calculators/mortgage-calculator', label: 'Home Loan EMI Calculator' },
                { href: '/calculators/balance-transfer-savings-calculator', label: 'Balance Transfer Savings Calculator' },
                { href: '/calculators/emi-calculator', label: 'EMI Calculator' },
                { href: '/calculators/income-tax-calculator', label: 'Income Tax Calculator' },
                { href: '/calculators/investment-comparison-calculator', label: 'Investment Comparison Calculator' },
                { href: '/calculators/loan-calculator', label: 'Loan Calculator' },
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

            <nav aria-label="More Calculators" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
              <div style={{ background: C.bg, padding: '10px 18px', borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>More Calculators</span>
              </div>
              {[
                { href: '/calculators/home-loan-calculator', label: 'Home Loan Calculator' },
                { href: '/calculators/home-loan-prepayment-calculator', label: 'Home Loan Prepayment Calculator' },
                { href: '/calculators/hdfc-home-loan-calculator', label: 'HDFC Home Loan Calculator' },
                { href: '/calculators/icici-home-loan-calculator', label: 'ICICI Home Loan Calculator' },
                { href: '/calculators/personal-loan-calculator', label: 'Personal Loan Calculator' },
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

            <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
              <div style={{ background: C.bg, padding: '10px 18px', borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Quick Facts</span>
              </div>
              <div style={{ background: C.white, padding: '4px 18px' }}>
                {[
                  { label: 'SBI base rate', value: '8.40% p.a.' },
                  { label: 'Max tenure', value: '30 years' },
                  { label: 'Min down payment', value: '10-20%' },
                  { label: 'FOIR cap', value: '50% of net income' },
                  { label: 'Min CIBIL score', value: '700' },
                  { label: 'Processing fee', value: '0.35% (max Rs 10K)' },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${C.border}`, fontSize: 12 }}>
                    <span style={{ color: C.ink3 }}>{label}</span>
                    <span style={{ color: C.dark, fontWeight: 600 }}>{value}</span>
                  </div>
                ))}
              </div>
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

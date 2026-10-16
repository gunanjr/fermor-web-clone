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
const STORAGE_KEY = 'fermor-home-down-payment-v1';

function calcEMI(p: number, annualRate: number, years: number): number {
  const months = years * 12;
  if (months === 0 || p <= 0) return 0;
  if (annualRate === 0) return p / months;
  const r = annualRate / 12 / 100;
  return (p * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

interface YearRow { year: number; openingBal: number; savingsAdded: number; interestEarned: number; closingBal: number }
interface MonthRow { month: number; year: number; openingBal: number; savingsAdded: number; interestEarned: number; closingBal: number }

function buildSavingsYearly(current: number, monthlyGoal: number, rate: number, totalMonths: number): YearRow[] {
  const rows: YearRow[] = [];
  let balance = current;
  const r = rate / 12 / 100;
  const startYear = new Date().getFullYear();
  const totalYears = Math.ceil(totalMonths / 12);
  for (let y = 0; y < totalYears; y++) {
    const opening = balance;
    let ySavings = 0, yInt = 0;
    const mo = Math.min(12, totalMonths - y * 12);
    for (let m = 0; m < mo; m++) {
      const intEarned = balance * r;
      balance += monthlyGoal + intEarned;
      ySavings += monthlyGoal;
      yInt += intEarned;
    }
    rows.push({ year: startYear + y, openingBal: opening, savingsAdded: ySavings, interestEarned: yInt, closingBal: balance });
  }
  return rows;
}

function buildSavingsMonthly(current: number, monthlyGoal: number, rate: number, totalMonths: number): MonthRow[] {
  const rows: MonthRow[] = [];
  let balance = current;
  const r = rate / 12 / 100;
  const now = new Date();
  for (let m = 0; m < totalMonths; m++) {
    const opening = balance;
    const intEarned = balance * r;
    balance += monthlyGoal + intEarned;
    rows.push({ month: m + 1, year: now.getFullYear() + Math.floor(m / 12), openingBal: opening, savingsAdded: monthlyGoal, interestEarned: intEarned, closingBal: balance });
  }
  return rows;
}

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
    <div style={{ marginBottom: compact ? 18 : 34 }}>
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

function DonutChart({ downPayment, loanAmount }: { downPayment: number; loanAmount: number }) {
  const total = downPayment + loanAmount;
  if (total === 0) return null;
  const R = 78, sw = 20, cx = 104, cy = 104;
  const circ = 2 * Math.PI * R;
  const dpArc = (downPayment / total) * circ;
  const dpPct = Math.round((downPayment / total) * 100);
  return (
    <svg width="208" height="208" viewBox="0 0 208 208" style={{ display: 'block' }}
      role="img" aria-label={`Property cost split: ${dpPct}% down payment, ${100 - dpPct}% loan amount`}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${dpArc} ${circ - dpArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Down Payment</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 26, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{dpPct}%</text>
    </svg>
  );
}

function BarChart({ rows }: { rows: YearRow[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxAnnual = Math.max(...rows.map(r => r.closingBal));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;

  return (
    <svg role="img" aria-label="Accumulated savings progression chart"
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {rows.map((row, i) => {
        const h = maxAnnual > 0 ? (row.closingBal / maxAnnual) * H : 0;
        const x = PADL + i * slot + gap;
        return (
          <g key={row.year}>
            <rect x={x} y={H - h} width={barW} height={h} fill={CHART_PAIR.primary} rx={2} />
            {rows.length <= 15 && (
              <text x={x + barW / 2} y={H + 14} textAnchor="middle"
                style={{ fontSize: 10, fill: C.ink3, fontFamily: INTER }}>
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


export default function HomeDownPaymentCalculatorClient() {
  const [mobile, setMobile] = useState(false);
  const [stampDutyActive, setStampDutyActive] = useState(true);

  const defaultSettings = { propertyPrice: 5000000, targetDpPct: 20, timelineMonths: 24, currentSavings: 200000, expectedReturn: 7.0, loanRate: 8.50, loanTenure: 20 };
  const { settings, updateSettings } = useCalculatorSettings('home-down-payment-calculator', defaultSettings);
  const { propertyPrice, targetDpPct, timelineMonths, currentSavings, expectedReturn, loanRate, loanTenure } = settings;

  const setPropertyPrice = (v: any) => updateSettings({ propertyPrice: typeof v === 'function' ? v(settings.propertyPrice) : v });
  const setTargetDpPct = (v: any) => updateSettings({ targetDpPct: typeof v === 'function' ? v(settings.targetDpPct) : v });
  const setTimelineMonths = (v: any) => updateSettings({ timelineMonths: typeof v === 'function' ? v(settings.timelineMonths) : v });
  const setCurrentSavings = (v: any) => updateSettings({ currentSavings: typeof v === 'function' ? v(settings.currentSavings) : v });
  const setExpectedReturn = (v: any) => updateSettings({ expectedReturn: typeof v === 'function' ? v(settings.expectedReturn) : v });
  const setLoanRate = (v: any) => updateSettings({ loanRate: typeof v === 'function' ? v(settings.loanRate) : v });
  const setLoanTenure = (v: any) => updateSettings({ loanTenure: typeof v === 'function' ? v(settings.loanTenure) : v });

  const [showAmort, setShowAmort] = useState(false);
  const [amortView, setAmortView] = useState<'yearly' | 'monthly'>('yearly');

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
        if (d.targetDpPct) setTargetDpPct(d.targetDpPct);
        if (d.timelineMonths) setTimelineMonths(d.timelineMonths);
        if (d.currentSavings) setCurrentSavings(d.currentSavings);
        if (d.expectedReturn) setExpectedReturn(d.expectedReturn);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ propertyPrice, targetDpPct, timelineMonths, currentSavings, expectedReturn }));
    } catch {}
  }, [propertyPrice, targetDpPct, timelineMonths, currentSavings, expectedReturn]);

  // Stamp Duty (estimated at 6% of property price)
  const stampDutyCost = stampDutyActive ? propertyPrice * 0.06 : 0;
  const downPaymentNeeded = (propertyPrice * targetDpPct / 100) + stampDutyCost;
  const loanAmountNeeded = propertyPrice - (propertyPrice * targetDpPct / 100);

  // Future Value of current savings: FV = Current * (1 + r)^n
  const rSavings = expectedReturn / 12 / 100;
  const fvCurrentSavings = currentSavings * Math.pow(1 + rSavings, timelineMonths);
  const remainingGap = Math.max(0, downPaymentNeeded - fvCurrentSavings);

  // Monthly savings needed: Gap = M * [(1+r)^n - 1] / r
  const monthlySavingsNeeded = useMemo(() => {
    if (remainingGap <= 0) return 0;
    if (rSavings === 0) return remainingGap / timelineMonths;
    return remainingGap / ((Math.pow(1 + rSavings, timelineMonths) - 1) / rSavings);
  }, [remainingGap, rSavings, timelineMonths]);

  // Future loan EMI estimation
  const expectedEmi = useMemo(() => calcEMI(loanAmountNeeded, loanRate, loanTenure), [loanAmountNeeded, loanRate, loanTenure]);

  const yearlyRows = useMemo(() => buildSavingsYearly(currentSavings, monthlySavingsNeeded, expectedReturn, timelineMonths), [currentSavings, monthlySavingsNeeded, expectedReturn, timelineMonths]);

  const h2 = { fontSize: mobile ? 18 : 21, fontWeight: 700, color: C.ink, margin: '0 0 12px', letterSpacing: '-0.015em' } as React.CSSProperties;
  const p = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;

  const faqItems = [
    { q: 'What is a home down payment?', a: 'A home down payment is the upfront cash amount a homebuyer pays toward the purchase price of a property. The remaining balance is typically financed through a mortgage or home loan.' },
    { q: 'What is the minimum down payment required in India?', a: 'Per RBI guidelines, the minimum down payment is 10% for property values up to Rs 30 lakh, 15% for values between Rs 30 lakh and Rs 75 lakh, and 20% for property values above Rs 75 lakh.' },
    { q: 'How do you calculate down payment savings targets?', a: 'Calculate the total target (Property Price x Down Payment %) plus transaction costs (stamp duty and registration, usually 5% to 8%). Subtract your current savings to find the net savings gap.' },
    { q: 'Where should I save money for a down payment?', a: 'For timelines under 2 years, low-risk debt instruments like fixed deposits (FDs), recurring deposits (RDs), or arbitrage funds are recommended. For timelines over 3 years, conservative hybrid funds or equity savings mutual funds can be considered.' },
    { q: 'Does the down payment include stamp duty and registration?', a: 'No, banks do not include stamp duty, registration, or brokerage fees in the property value for loan calculations. You must fund these additional transaction costs (typically 6% to 10% of the property value) entirely out of pocket.' },
    { q: 'Can I withdraw my EPF balance for a down payment?', a: 'Yes, EPFO rules allow you to withdraw up to 90% of your accumulated EPF balance for housing acquisition, provided you have completed at least 3 years of membership.' },
    { q: 'How does compound interest help save for a down payment?', a: 'Investing your monthly savings in return-generating assets compound your capital over time, meaning a significant portion of your final down payment target is funded by interest earnings rather than active savings.' },
    { q: 'What happens if I pay a larger down payment?', a: 'A larger down payment reduces the required loan principal, which decreases your monthly EMI and substantially lowers the total interest paid over the life of the loan.' },
    { q: 'Can a home down payment be paid using personal loans?', a: 'It is highly discouraged. Borrowing your down payment using high-interest personal loans increases your debt-to-income ratio, which can lead banks to reject your primary home loan application.' },
    { q: 'Is PMAY down payment subsidy still active?', a: 'The Credit Linked Subsidy Scheme (CLSS) under PMAY for MIG categories has expired, but state-level subsidies and benefits for Economically Weaker Sections (EWS) and LIG categories remain active under modified terms.' },
    { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' },
  ];

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <style>{`
        .dp-sidebar::-webkit-scrollbar { width: 5px; }
        .dp-sidebar::-webkit-scrollbar-track { background: transparent; }
        .dp-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .dp-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
      `}</style>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Home Down Payment Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 15, color: C.ink2, margin: 0, lineHeight: 1.6, maxWidth: mobile ? '100%' : 800 }}>
            Plan your house savings goal. Compute monthly deposits needed with compound interest, stamp duty, and estimate your future home loan EMI.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                <div style={{ padding: mobile ? '20px 18px' : '44px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Savings Target Details</p>
                    <CurrencySelector theme="light" />
                  </div>

                  <Slider label="Property Price" value={propertyPrice} min={500000} max={50000000} step={100000}
                    display={fmtC(propertyPrice)} onChange={setPropertyPrice} compact={mobile} />

                  <Slider label="Target Down Payment (%)" value={targetDpPct} min={10} max={100} step={5}
                    display={`${targetDpPct}%`} onChange={setTargetDpPct} compact={mobile} />

                  <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10 }}>
                    <label htmlFor="stamp-duty-toggle" style={{ fontSize: 13, color: C.ink2, fontWeight: 500 }}>Include Stamp Duty & Registration (6%)</label>
                    <input id="stamp-duty-toggle" type="checkbox" checked={stampDutyActive} onChange={e => setStampDutyActive(e.target.checked)}
                      aria-label="Include 6 percent stamp duty and registration fee in target down payment"
                      style={{ width: 18, height: 18, accentColor: C.dark, cursor: 'pointer' }} />
                  </div>

                  <Slider label="Savings Timeline" value={timelineMonths} min={1} max={120} step={1}
                    display={`${timelineMonths} months (${(timelineMonths / 12).toFixed(1)} yr)`} onChange={setTimelineMonths} compact={mobile} />

                  <Slider label="Current Savings" value={currentSavings} min={0} max={10000000} step={50000}
                    display={fmtC(currentSavings)} onChange={setCurrentSavings} compact={mobile} />

                  <Slider label="Expected Return on Savings (p.a.)" value={expectedReturn} min={1} max={18} step={0.25}
                    display={`${expectedReturn.toFixed(2)}%`} onChange={setExpectedReturn} compact={mobile} />

                  <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 12 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 16 }}>Expected Future Loan Details</p>
                    <Slider label="Loan Interest Rate (p.a.)" value={loanRate} min={5} max={15} step={0.05} display={`${loanRate.toFixed(2)}%`} onChange={setLoanRate} compact />
                    <Slider label="Loan Tenure (Years)" value={loanTenure} min={5} max={30} step={1} display={`${loanTenure} yr`} onChange={setLoanTenure} compact />
                  </div>
                </div>

                {/* Results Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '44px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#50565C' }}>Monthly Savings Needed</span>
                      <span aria-live="polite" aria-label={`Monthly Savings Needed: ${fmtIN(monthlySavingsNeeded)}`}
                        style={{ fontSize: mobile ? 22 : 26, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>{fmtIN(monthlySavingsNeeded)}</span>
                    </div>
                    <div style={{ borderTop: '1px solid #E3E6E8', paddingTop: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 11, color: '#7A8087' }}>Total target down payment</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#101214' }}>{fmtC(downPaymentNeeded)}</span>
                    </div>
                  </div>

                  {[
                    { label: 'Ex-showroom property price', value: fmtC(propertyPrice) },
                    { label: 'Down payment needed (principal)', value: fmtC(propertyPrice * targetDpPct / 100) },
                    { label: 'Stamp duty & registration (6%)', value: stampDutyCost > 0 ? fmtC(stampDutyCost) : 'Excluded' },
                    { label: 'Current savings value at purchase', value: fmtC(fvCurrentSavings) },
                    { label: 'Net savings gap remaining', value: fmtC(remainingGap) },
                    { label: 'Expected loan amount needed', value: fmtC(loanAmountNeeded) },
                    { label: 'Estimated monthly loan EMI', value: fmtEmi(expectedEmi) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: 13, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 12, order: mobile ? 1 : -1 }}>
                    <DonutChart downPayment={downPaymentNeeded} loanAmount={loanAmountNeeded} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 12, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} /><span style={{ fontSize: 12, color: C.ink2 }}>Down Payment {Math.round((downPaymentNeeded / (downPaymentNeeded + loanAmountNeeded)) * 100)}%</span></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} /><span style={{ fontSize: 12, color: C.ink2 }}>Loan {Math.round((loanAmountNeeded / (downPaymentNeeded + loanAmountNeeded)) * 100)}%</span></div>
                  </div>
                </div>
              </div>

              {/* Savings timeline breakdown */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowAmort(v => !v)} aria-expanded={showAmort} aria-controls="savings-timeline"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 18px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>Savings Timeline Schedule</span>
                    {!mobile && <span style={{ fontSize: 12, color: C.ink3, marginLeft: 8 }}>({yearlyRows.length} years progression)</span>}
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: showAmort ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {showAmort && (
                  <div id="savings-timeline" style={{ borderTop: `1px solid ${C.border}`, padding: mobile ? '18px 18px' : '24px 44px' }}>
                    <p style={{ fontSize: 13, color: C.ink3, marginBottom: 16, lineHeight: 1.6 }}>
                      Accumulated balance growth with compound returns over time.
                    </p>

                    <div style={{ marginBottom: 24 }}>
                      <BarChart rows={yearlyRows} />
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
                          Detailed savings plan showing compound interest earnings and target closing balances.
                        </caption>
                        <thead style={{ position: 'sticky', top: 0 }}>
                          <tr style={{ background: '#f4f5f6' }}>
                            {amortView === 'yearly'
                              ? ['Year', 'Opening Balance', 'Savings Deposited', 'Interest Earned', 'Closing Balance'].map((h, idx) => (
                                  <th key={h} scope="col" style={idx > 0 ? { ...thS, textAlign: 'right' } : thS}>{h}</th>
                                ))
                              : ['Month', 'Year', 'Opening Balance', 'Deposit', 'Interest Earned', 'Closing Balance'].map((h, idx) => (
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
                                  <td style={{ ...tdR, color: C.green, fontWeight: 600 }}>{fmtIN(row.savingsAdded)}</td>
                                  <td style={tdR}>{fmtIN(row.interestEarned)}</td>
                                  <td style={tdR}>{fmtIN(row.closingBal)}</td>
                                </tr>
                              ))
                            : buildSavingsMonthly(currentSavings, monthlySavingsNeeded, expectedReturn, timelineMonths).map((row, i) => (
                                <tr key={row.month} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                  <td style={tdL}>{row.month}</td>
                                  <td style={tdL}>{row.year}</td>
                                  <td style={tdR}>{fmtIN(row.openingBal)}</td>
                                  <td style={tdR}>{fmtIN(row.savingsAdded)}</td>
                                  <td style={{ ...tdR, color: C.green, fontWeight: 600 }}>{fmtIN(row.interestEarned)}</td>
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

            {/* Save results and standard CTAs */}
            <div style={{ marginBottom: 24 }}><SaveResultsCard mobile={mobile} /></div>

            {/* Article prose */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>
              <div style={sec} id="dp-requirements">
                <h2 style={h2}>Minimum Down Payment Requirements in India</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Per RBI regulations, the minimum down payment is 10% for property values up to Rs 30 lakh, 15% for values between Rs 30 lakh and Rs 75 lakh, and 20% for property values above Rs 75 lakh.
                  </p>
                </div>
                <p style={p}>
                  These rules are codified in the Loan-to-Value (LTV) limits set by the Reserve Bank of India to restrict financial exposure in real estate lending. Banks and housing finance companies are prohibited from funding more than 90% of the property value for small loans, ensuring that borrowers maintain a minimum equity stake in their home.
                </p>
                <p style={p}>
                  If you purchase a property worth Rs 1 Crore, the minimum down payment required is 20% (Rs 20 Lakh), and the maximum loan amount HDFC Bank or SBI can approve is Rs 80 Lakh. Any property evaluation differences must also be covered in cash.
                </p>
              </div>

              <div style={sec} id="dp-target-calculation">
                <h2 style={h2}>How to Calculate Your Target Down Payment</h2>
                <p style={p}>
                  Calculating your target savings requires adding transaction costs to the minimum cash component. Lenders do not finance stamp duty, registration charges, or brokerage costs in the principal loan amount.
                </p>
                <p style={p}>
                  For a property priced at Rs 50 lakh with a 20% down payment goal (Rs 10 lakh), stamp duty and registration add an average of 6% to the purchase price (Rs 3 lakh). Therefore, your actual cash down payment target is Rs 13 lakh.
                </p>
                <p style={p}>
                  Subtracting your current liquid savings of Rs 2 lakh leaves a net savings gap of Rs 11 lakh. If you want to purchase the property in 24 months, this gap must be funded through monthly deposits.
                </p>
              </div>

              <div style={sec} id="dp-vs-loan-amount">
                <h2 style={h2}>Down Payment vs Loan Amount</h2>
                <p style={p}>
                  Choosing between a larger down payment and a larger loan amount involves balancing immediate liquidity against long-term interest costs. A larger down payment reduces the principal loan amount, which lowers your monthly EMI and saves substantial interest over the tenure.
                </p>
                <p style={p}>
                  For a Rs 50 lakh property, paying a 20% down payment (Rs 10 lakh) leaves a Rs 40 lakh loan. At an 8.50% interest rate for 20 years, the monthly EMI is Rs 34,713, and the total interest paid is Rs 43.31 lakh.
                </p>
                <p style={p}>
                  If you increase the down payment to 30% (Rs 15 lakh), the loan amount drops to Rs 35 lakh. The monthly EMI decreases to Rs 30,374, and the total interest paid drops to Rs 37.90 lakh, saving you Rs 5.41 lakh in interest outgo.
                </p>
              </div>

              <div style={sec} id="how-much-dp">
                <h2 style={h2}>How Much Should You Put Down on a House?</h2>
                <p style={p}>
                  Financial planners generally recommend putting down 20% to 30% of the property value. While paying a 100% cash down payment avoids all interest outgo, it depletes your liquid asset reserves and eliminates the opportunity to leverage cheap home loan debt.
                </p>
                <p style={p}>
                  Maintaining a liquid cushion is critical for home buyers to cover emergency repairs, furnishing, and initial EMI payments if income is temporarily disrupted. Avoid empty-nesting your equity to hit a down payment target.
                </p>
              </div>

              <div style={sec} id="savings-strategies">
                <h2 style={h2}>Down Payment Savings Strategies for Indian Buyers</h2>
                <p style={p}>
                  Selecting the right investment instrument depends directly on your purchase timeline. For short-term targets under 2 years, safety is the primary concern. Fixed deposits (FDs), recurring deposits (RDs), or arbitrage funds provide stable returns without the risk of principal loss.
                </p>
                <p style={p}>
                  For medium-term timelines between 3 and 5 years, conservative hybrid mutual funds or equity savings funds can help beat inflation. Equity investments are highly volatile and should be avoided if you plan to buy a home within the next 12 months.
                </p>
              </div>

              <div style={sec} id="compound-advantage">
                <h2 style={h2}>The Compound Interest Advantage in Savings</h2>
                <p style={p}>
                  Investing your monthly savings in return-generating assets significantly reduces the active saving burden. If you need to save a gap of Rs 10 lakh in 3 years, saving in a zero-interest locker requires saving Rs 27,778 per month.
                </p>
                <p style={p}>
                  By investing the same monthly savings in a conservative debt portfolio generating a 7% annual return, your money compounds. The monthly deposit required drops to Rs 25,057, and compound interest funds Rs 97,948 of your final down payment target.
                </p>
              </div>

              <div style={sec} id="dp-timeline-table">
                <h2 style={h2}>Home Down Payment Timeline Table</h2>
                <p style={p}>
                  This reference table outlines the monthly savings required to hit target down payments over 12, 24, and 36 months, assuming a conservative 7% annual growth rate:
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                      <tr style={{ background: '#f4f5f6' }}>
                        <th scope="col" style={thS}>Target Down Payment</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>12 Months</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>24 Months</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>36 Months</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { target: 500000, m12: 39900, m24: 19400, m36: 12600 },
                        { target: 1000000, m12: 79800, m24: 38800, m36: 25100 },
                        { target: 1500000, m12: 119700, m24: 58200, m36: 37600 },
                        { target: 2000000, m12: 159600, m24: 77600, m36: 50100 },
                      ].map((row, i) => (
                        <tr key={row.target} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdL}>{fmt(row.target)}</td>
                          <td style={tdR}>{fmtEmi(row.m12)} / mo</td>
                          <td style={tdR}>{fmtEmi(row.m24)} / mo</td>
                          <td style={tdR}>{fmtEmi(row.m36)} / mo</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec} id="dp-affects-loan-rate">
                <h2 style={h2}>How Your Down Payment Affects Home Loan Interest Rates</h2>
                <p style={p}>
                  Paying a higher down payment reduces the risk profile of your mortgage application, which can help you secure a lower interest rate. Lenders add a risk premium to home loans with high LTV ratios (e.g., 90% funding).
                </p>
                <p style={p}>
                  By reducing the LTV to 70% or 60% via a larger cash down payment, you qualify for the bank&apos;s lowest rate tier. This slight rate decrease (usually 0.05% to 0.15%) compounds into substantial savings over a 20-year tenure.
                </p>
              </div>

              <div style={sec} id="hidden-costs">
                <h2 style={h2}>Hidden Costs of Buying a Home in India</h2>
                <p style={p}>
                  Home buyers must budget for several auxiliary transaction fees that are not included in the basic property price quotation. These charges can add 10% to 15% to the final cost:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.7 }}>
                    <strong style={{ color: C.ink }}>Stamp Duty:</strong> Charged by state governments, ranging from 4% to 7% of the agreement value.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.7 }}>
                    <strong style={{ color: C.ink }}>Registration Fees:</strong> Typically 1% of the property value, capped at Rs 30,000 in several states.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.7 }}>
                    <strong style={{ color: C.ink }}>GST:</strong> Applicable only to under-construction properties, charging 1% for affordable housing and 5% for luxury segments.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.7 }}>
                    <strong style={{ color: C.ink }}>Brokerage & Society Charges:</strong> Broker commission (1% to 2%) and society share transfer fees.
                  </li>
                </ul>
              </div>

              <div style={sec} id="gov-schemes">
                <h2 style={h2}>Government Schemes Supporting First-Time Buyers</h2>
                <p style={p}>
                  Various government schemes offer financial support to affordable housing buyers. Under the Pradhan Mantri Awas Yojana (PMAY), credit-linked interest subsidies were designed to help LIG and EWS categories fund their purchase.
                </p>
                <p style={p}>
                  While PMAY MIG subsidies have expired, many state governments offer concessions on stamp duty for female buyers (often a 1% reduction) and lower registration fees for first-time buyers.
                </p>
              </div>

              <div style={sec} id="epf-withdrawal">
                <h2 style={h2}>Using Your Employee Provident Fund (EPF) for Down Payment</h2>
                <p style={p}>
                  You can withdraw from your Employee Provident Fund (EPF) balance to fund your home down payment under EPFO regulations. The rules allow a one-time withdrawal of up to 90% of your accumulated EPF balance for buying or constructing a house.
                </p>
                <p style={p}>
                  To qualify, you must have completed at least 3 years of membership in the EPF scheme. The funds are disbursed directly to the builder or housing society upon submitting the required property purchase agreements.
                </p>
              </div>

              <div style={sec} id="pitfalls">
                <h2 style={h2}>Common Pitfalls to Avoid When Saving for a Down Payment</h2>
                <p style={p}>
                  A common mistake is investing down payment savings in high-risk equity markets. If the market undergoes a correction right before your property purchase, you may be forced to postpone your purchase or take out expensive short-term loans.
                </p>
                <p style={p}>
                  Another pitfall is borrowing the down payment using high-interest personal loans. Lenders evaluate your total Debt-to-Income ratio, and having an active personal loan can reduce your eligible home loan amount or lead to rejection.
                </p>
              </div>

              <div style={sec} id="how-to-use">
                <h2 style={h2}>How to Use This Down Payment Calculator</h2>
                <p style={p}>
                  This calculator simplifies your savings roadmap in three simple steps:
                </p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set Target & Costs:</strong> Enter the property price and choose a down payment percentage. Toggle stamp duty to include auxiliary transaction costs.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Timeline & Returns:</strong> Specify your savings timeline in months, current savings, and expected rate of return on your savings portfolio.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Evaluate Results:</strong> Review the calculated monthly savings goal and the estimated home loan EMI you will face after purchase.
                  </li>
                </ol>
              </div>


              <div style={sec} id="faq">
                <h2 style={h2}>Frequently Asked Questions</h2>
                <FAQBox items={faqItems} />
              </div>

              <hr style={{ border: 'none', borderTop: `1px solid ${C.border}`, margin: '40px 0 24px' }} />
              <div style={{ fontSize: 11.5, color: C.ink3, lineHeight: 1.6 }} id="disclaimer">
                <strong>Disclaimer:</strong> Calculations are indicative and based on user inputs. Investment returns are subject to market risks. Confirm stamp duty, registration charges, and home loan terms with local authorities and financial institutions before final property acquisition.
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <aside className="dp-sidebar" style={{ display: mobile ? 'none' : 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto', maxHeight: 'calc(100vh - 120px)', position: 'sticky', top: 20 }}>
            <nav aria-label="Related Calculators" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>Related Calculators</span>
              </div>
              {[
                { href: '/calculators/home-loan-calculator', label: 'Home Loan Calculator' },
                { href: '/calculators/sbi-home-loan-calculator', label: 'SBI Home Loan Calculator' },
                { href: '/calculators/hdfc-home-loan-calculator', label: 'HDFC Home Loan Calculator' },
                { href: '/calculators/icici-home-loan-calculator', label: 'ICICI Home Loan Calculator' },
                { href: '/calculators/emi-calculator', label: 'EMI Calculator' },
                { href: '/calculators/sip-calculator', label: 'SIP Calculator' },
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
              <div style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 12 }}>Down Payment Guidelines</div>
              {[
                { label: 'Min down payment %', value: '10% - 20%' },
                { label: 'Stamp duty estimate', value: '5% - 8%' },
                { label: 'Registration fee', value: '1% approx' },
                { label: 'Timeline range', value: '1 - 120 months' },
                { label: 'Return expectation', value: '1% - 18%' },
                { label: 'Home loan rate', value: '8.5% avg' },
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

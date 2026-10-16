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
const STORAGE_KEY = 'fermor-loan-balance-transfer-v1';

function calcEMI(p: number, annualRate: number, months: number): number {
  if (months === 0 || p <= 0) return 0;
  if (annualRate === 0) return p / months;
  const r = annualRate / 12 / 100;
  return (p * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

interface YearComparison { year: number; curBal: number; curInterest: number; newBal: number; newInterest: number }

function buildYearlyComparison(p: number, curRate: number, newRate: number, months: number, curEmi: number, newEmi: number): YearComparison[] {
  const rows: YearComparison[] = [];
  let curBal = p;
  let newBal = p;
  const rCur = curRate / 12 / 100;
  const rNew = newRate / 12 / 100;
  const startYear = new Date().getFullYear();
  const totalYears = Math.ceil(months / 12);
  for (let y = 0; y < totalYears; y++) {
    let curYInt = 0, newYInt = 0;
    const mo = Math.min(12, months - y * 12);
    for (let m = 0; m < mo; m++) {
      const curInt = curBal * rCur;
      const curPrin = Math.min(curEmi - curInt, curBal);
      curYInt += curInt;
      curBal = Math.max(0, curBal - curPrin);

      const newInt = newBal * rNew;
      const newPrin = Math.min(newEmi - newInt, newBal);
      newYInt += newInt;
      newBal = Math.max(0, newBal - newPrin);
    }
    rows.push({ year: startYear + y, curBal, curInterest: curYInt, newBal, newInterest: newYInt });
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

function DonutChart({ savings, fees }: { savings: number; fees: number }) {
  const total = savings + fees;
  if (total === 0) return null;
  const R = 78, sw = 20, cx = 104, cy = 104;
  const circ = 2 * Math.PI * R;
  const savArc = (savings / total) * circ;
  const savPct = Math.round((savings / total) * 100);
  return (
    <svg width="208" height="208" viewBox="0 0 208 208" style={{ display: 'block' }}
      role="img" aria-label={`Savings split: ${savPct}% net interest saved, ${100 - savPct}% transfer fees`}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${savArc} ${circ - savArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Net Savings</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 26, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{savPct}%</text>
    </svg>
  );
}

function ComparisonChart({ rows }: { rows: YearComparison[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxInterest = Math.max(...rows.map(r => Math.max(r.curInterest, r.newInterest)));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(15, slot * 0.35));
  const gap = (slot - barW * 2) / 2;

  return (
    <svg role="img" aria-label="Yearly interest comparison bar chart"
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {rows.map((row, i) => {
        const curH = maxInterest > 0 ? (row.curInterest / maxInterest) * H : 0;
        const newH = maxInterest > 0 ? (row.newInterest / maxInterest) * H : 0;
        const xCur = PADL + i * slot + gap;
        const xNew = xCur + barW + 2;
        return (
          <g key={row.year}>
            <rect x={xCur} y={H - curH} width={barW} height={curH} fill={CHART_PAIR.secondary} rx={1.5} />
            <rect x={xNew} y={H - newH} width={barW} height={newH} fill={CHART_PAIR.primary} rx={1.5} />
            {rows.length <= 15 && (
              <text x={xCur + barW} y={H + 14} textAnchor="middle"
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


export default function LoanBalanceTransferCalculatorClient() {
  const [mobile, setMobile] = useState(false);
  const [tenureMode, setTenureMode] = useState<'yr' | 'mo'>('yr');

  const defaultSettings = { outstandingPrincipal: 3000000, existingRate: 9.50, remainingTenureYr: 15, remainingTenureMo: 180, newRate: 8.50, newProcessingFeePct: 0.50, foreclosureFeePct: 0 };
  const { settings, updateSettings } = useCalculatorSettings('loan-balance-transfer-calculator', defaultSettings);
  const { outstandingPrincipal, existingRate, remainingTenureYr, remainingTenureMo, newRate, newProcessingFeePct, foreclosureFeePct } = settings;

  const setOutstandingPrincipal = (v: any) => updateSettings({ outstandingPrincipal: typeof v === 'function' ? v(settings.outstandingPrincipal) : v });
  const setExistingRate = (v: any) => updateSettings({ existingRate: typeof v === 'function' ? v(settings.existingRate) : v });
  const setRemainingTenureYr = (v: any) => updateSettings({ remainingTenureYr: typeof v === 'function' ? v(settings.remainingTenureYr) : v });
  const setRemainingTenureMo = (v: any) => updateSettings({ remainingTenureMo: typeof v === 'function' ? v(settings.remainingTenureMo) : v });
  const setNewRate = (v: any) => updateSettings({ newRate: typeof v === 'function' ? v(settings.newRate) : v });
  const setNewProcessingFeePct = (v: any) => updateSettings({ newProcessingFeePct: typeof v === 'function' ? v(settings.newProcessingFeePct) : v });
  const setForeclosureFeePct = (v: any) => updateSettings({ foreclosureFeePct: typeof v === 'function' ? v(settings.foreclosureFeePct) : v });

  const [showAmort, setShowAmort] = useState(false);

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
        if (d.outstandingPrincipal) setOutstandingPrincipal(d.outstandingPrincipal);
        if (d.existingRate) setExistingRate(d.existingRate);
        if (d.remainingTenureYr) { setRemainingTenureYr(d.remainingTenureYr); setRemainingTenureMo(d.remainingTenureYr * 12); }
        if (d.newRate) setNewRate(d.newRate);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ outstandingPrincipal, existingRate, remainingTenureYr, newRate }));
    } catch {}
  }, [outstandingPrincipal, existingRate, remainingTenureYr, newRate]);

  const months = tenureMode === 'yr' ? remainingTenureYr * 12 : remainingTenureMo;

  const currentEmi = useMemo(() => calcEMI(outstandingPrincipal, existingRate, months), [outstandingPrincipal, existingRate, months]);
  const newEmi = useMemo(() => calcEMI(outstandingPrincipal, newRate, months), [outstandingPrincipal, newRate, months]);

  const currentTotalInterest = (currentEmi * months) - outstandingPrincipal;
  const newTotalInterest = (newEmi * months) - outstandingPrincipal;

  const processingFeeCost = outstandingPrincipal * (newProcessingFeePct / 100);
  const foreclosureFeeCost = outstandingPrincipal * (foreclosureFeePct / 100);
  const totalTransferFees = processingFeeCost + foreclosureFeeCost;

  const grossInterestSavings = currentTotalInterest - newTotalInterest;
  const netSavings = grossInterestSavings - totalTransferFees;

  const monthlyEmiSavings = Math.max(0, currentEmi - newEmi);
  const breakEvenMonths = monthlyEmiSavings > 0 ? Math.ceil(totalTransferFees / monthlyEmiSavings) : 0;

  const yearlyRows = useMemo(() => buildYearlyComparison(outstandingPrincipal, existingRate, newRate, months, currentEmi, newEmi), [outstandingPrincipal, existingRate, newRate, months, currentEmi, newEmi]);

  const h2 = { fontSize: mobile ? 18 : 21, fontWeight: 700, color: C.ink, margin: '0 0 12px', letterSpacing: '-0.015em' } as React.CSSProperties;
  const p = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;

  const faqItems = [
    { q: 'What is a loan balance transfer?', a: 'A loan balance transfer is a process where a borrower transfers their outstanding loan principal from an existing bank to a new lender offering a lower interest rate or better repayment terms.' },
    { q: 'Does RBI permit foreclosure charges on home loan transfers?', a: 'Per RBI guidelines, banks and housing finance companies are prohibited from charging foreclosure or prepayment penalties on floating-rate home loans for individual borrowers.' },
    { q: 'What fees are involved in a home loan balance transfer?', a: 'Borrowers must pay processing fees to the new bank (usually 0.25% to 1% of the loan amount), legal and valuation charges, stamp duty on the new mortgage deed, and document retrieval fees to the old bank.' },
    { q: 'How do you calculate net savings from a balance transfer?', a: 'Calculate the difference in total interest payable between the current loan and the new loan over the remaining tenure. Subtract all transaction costs (processing fees, legal fees, stamp duty) to find the net savings.' },
    { q: 'What is the break-even period for a loan transfer?', a: 'The break-even period is the number of months required for your monthly EMI savings to recover the upfront fees and charges paid for the transfer.' },
    { q: 'Can I transfer a personal loan to another bank?', a: 'Yes, personal loans can be transferred to another lender. However, unlike home loans, existing banks often levy foreclosure charges (typically 2% to 5%) on personal loans, which must be factored into your savings calculation.' },
    { q: 'When is a home loan balance transfer worth it?', a: 'A balance transfer is generally worth it if the interest rate difference is at least 0.50%, the remaining loan tenure is more than 5 years, and the upfront transfer fees are recovered in under 12 to 18 months.' },
    { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' },
  ];

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <style>{`
        .lbt-sidebar::-webkit-scrollbar { width: 5px; }
        .lbt-sidebar::-webkit-scrollbar-track { background: transparent; }
        .lbt-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .lbt-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
      `}</style>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Loan Balance Transfer Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 15, color: C.ink2, margin: 0, lineHeight: 1.6, maxWidth: mobile ? '100%' : 800 }}>
            Calculate the exact savings from transferring an existing loan to a new bank. Compare EMIs, total interest outgo, processing fees, and find the break-even timeline.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                <div style={{ padding: mobile ? '20px 18px' : '44px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Current Loan Details</p>
                    <CurrencySelector theme="light" />
                  </div>

                  <Slider label="Outstanding Principal" value={outstandingPrincipal} min={100000} max={100000000} step={100000}
                    display={fmtC(outstandingPrincipal)} onChange={setOutstandingPrincipal} compact={mobile} />

                  <Slider label="Existing Interest Rate (% p.a.)" value={existingRate} min={5} max={22} step={0.1}
                    display={`${existingRate.toFixed(2)}%`} onChange={setExistingRate} compact={mobile} />

                  <div style={{ marginBottom: 28 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                      <label style={{ fontSize: 14, color: C.ink2, fontWeight: 400 }}>Remaining Tenure</label>
                      <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                        {(['yr', 'mo'] as const).map(m => (
                          <button key={m} onClick={() => setTenureMode(m)} style={{ padding: '6px 14px', border: 'none', background: tenureMode === m ? C.white : 'transparent', color: tenureMode === m ? C.ink : C.ink3, fontWeight: tenureMode === m ? 600 : 400, cursor: 'pointer', fontFamily: INTER, fontSize: 13 }}>
                            {m === 'yr' ? 'Years' : 'Months'}
                          </button>
                        ))}
                      </div>
                    </div>
                    {tenureMode === 'yr'
                      ? <Slider label="" value={remainingTenureYr} min={1} max={30} step={1} display={`${remainingTenureYr} yr`} onChange={v => { setRemainingTenureYr(v); setRemainingTenureMo(v * 12); }} compact={mobile} />
                      : <Slider label="" value={remainingTenureMo} min={12} max={360} step={1} display={`${remainingTenureMo} mo`} onChange={v => { setRemainingTenureMo(v); setRemainingTenureYr(Math.round(v / 12)); }} compact={mobile} />}
                  </div>

                  <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 12 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 16 }}>New Loan Offer Details</p>
                    <Slider label="New Interest Rate (% p.a.)" value={newRate} min={5} max={18} step={0.05} display={`${newRate.toFixed(2)}%`} onChange={setNewRate} compact />
                    <Slider label="New Processing Fee (%)" value={newProcessingFeePct} min={0} max={3} step={0.05} display={`${newProcessingFeePct.toFixed(2)}%`} onChange={setNewProcessingFeePct} compact />
                    <Slider label="Existing Bank Foreclosure Fee (%)" value={foreclosureFeePct} min={0} max={5} step={0.25} display={`${foreclosureFeePct.toFixed(2)}%`} onChange={setForeclosureFeePct} compact />
                  </div>
                </div>

                {/* Results Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '44px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#50565C' }}>Monthly EMI Savings</span>
                      <span aria-live="polite" aria-label={`Monthly EMI Savings: ${fmtIN(monthlyEmiSavings)}`}
                        style={{ fontSize: mobile ? 22 : 26, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>{fmtIN(monthlyEmiSavings)}</span>
                    </div>
                    <div style={{ borderTop: '1px solid #E3E6E8', paddingTop: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 11, color: '#7A8087' }}>Net interest saved (after fees)</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#101214' }}>{fmtC(netSavings)}</span>
                    </div>
                  </div>

                  {[
                    { label: 'Current monthly EMI', value: fmtEmi(currentEmi) },
                    { label: 'New monthly EMI', value: fmtEmi(newEmi) },
                    { label: 'Gross interest saved', value: fmtC(grossInterestSavings) },
                    { label: 'Upfront transfer fees', value: fmtC(totalTransferFees) },
                    { label: 'Break-even timeline', value: breakEvenMonths > 0 ? `${breakEvenMonths} months` : 'Immediate' },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: 13, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 12, order: mobile ? 1 : -1 }}>
                    <DonutChart savings={Math.max(0, netSavings)} fees={totalTransferFees} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 12, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} /><span style={{ fontSize: 12, color: C.ink2 }}>Net Savings</span></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} /><span style={{ fontSize: 12, color: C.ink2 }}>Transfer Fees</span></div>
                  </div>
                </div>
              </div>

              {/* Amortization (Collapsible stacked bar chart + table) */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowAmort(v => !v)} aria-expanded={showAmort} aria-controls="comparison-schedule"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 18px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>Comparison Schedule</span>
                    {!mobile && <span style={{ fontSize: 12, color: C.ink3, marginLeft: 8 }}>({yearlyRows.length} years comparison)</span>}
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: showAmort ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {showAmort && (
                  <div id="comparison-schedule" style={{ borderTop: `1px solid ${C.border}`, padding: mobile ? '18px 18px' : '24px 44px' }}>
                    <p style={{ fontSize: 13, color: C.ink3, marginBottom: 16, lineHeight: 1.6 }}>
                      Yearly interest outgo comparison between current and new loan schedules.
                    </p>

                    <div style={{ marginBottom: 24 }}>
                      <ComparisonChart rows={yearlyRows} />
                    </div>

                    <div style={{ display: 'flex', gap: 20, marginBottom: 24, justifyContent: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} />
                        <span style={{ fontSize: 12, color: C.ink2 }}>Current Interest</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} />
                        <span style={{ fontSize: 12, color: C.ink2 }}>New Interest</span>
                      </div>
                    </div>

                    <div style={{ overflowX: 'auto', maxHeight: 400, overflowY: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                        <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, paddingTop: 8, textAlign: 'left' }}>
                          Yearly side-by-side comparison of closing balances and interest paid components.
                        </caption>
                        <thead style={{ position: 'sticky', top: 0 }}>
                          <tr style={{ background: '#f4f5f6' }}>
                            {['Year', 'Current Bal', 'Current Interest', 'New Bal', 'New Interest', 'Net Year Savings'].map((h, idx) => (
                              <th key={h} scope="col" style={idx > 0 ? { ...thS, textAlign: 'right' } : thS}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {yearlyRows.map((row, i) => {
                            const yrSavings = row.curInterest - row.newInterest;
                            return (
                              <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={tdL}>{row.year}</td>
                                <td style={tdR}>{fmtIN(row.curBal)}</td>
                                <td style={tdR}>{fmtIN(row.curInterest)}</td>
                                <td style={tdR}>{fmtIN(row.newBal)}</td>
                                <td style={tdR}>{fmtIN(row.newInterest)}</td>
                                <td style={{ ...tdR, color: yrSavings > 0 ? C.green : C.ink, fontWeight: yrSavings > 0 ? 600 : 400 }}>{fmtIN(yrSavings)}</td>
                              </tr>
                            );
                          })}
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
              <div style={sec} id="transfer-basics">
                <h2 style={h2}>What Is a Loan Balance Transfer?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    A loan balance transfer is a process where a borrower transfers their outstanding loan principal from an existing bank to a new lender offering a lower interest rate or better repayment terms.
                  </p>
                </div>
                <p style={p}>
                  Refinancing your loan allows you to take advantage of competitive interest rates in the market. Since home loans represent long-term commitments, even a minor rate reduction of 0.50% can compound into significant financial savings over 15 to 20 years.
                </p>
                <p style={p}>
                  During the transfer process, the new bank pays off the outstanding balance of your loan directly to your current bank. Your old loan account is closed, and you begin paying monthly EMIs to the new bank under their revised interest rate and tenure terms.
                </p>
              </div>

              <div style={sec} id="savings-formula">
                <h2 style={h2}>How to Calculate Loan Transfer Savings</h2>
                <p style={p}>
                  Calculating your net balance transfer savings requires comparing the remaining cost of both loan structures after deducting upfront charges.
                </p>
                <p style={p}>
                  For a Rs 30 lakh outstanding principal with 15 years remaining, transferring from 9.50% to 8.50% reduces your monthly instalment from Rs 31,327 to Rs 29,542, saving you Rs 1,785 per month.
                </p>
                <p style={p}>
                  Over the 15-year tenure, the gross interest saved is Rs 3.21 lakh. If the new bank charges a 0.50% processing fee (Rs 15,000) and stamp duty adds Rs 5,000, the total transfer cost is Rs 20,000. Your net savings over the tenure is Rs 3.01 lakh.
                </p>
              </div>

              <div style={sec} id="rbi-guidelines">
                <h2 style={h2}>RBI Guidelines on Foreclosure and Transfer Charges</h2>
                <p style={p}>
                  The Reserve Bank of India has issued clear guidelines to protect retail borrowers from punitive foreclosure penalties. Under current RBI regulations, banks and housing finance companies are prohibited from charging foreclosure or prepayment fees on floating-rate home loans.
                </p>
                <p style={p}>
                  This policy ensures that borrowers can freely refinance their home loans to a new bank without facing penalty hurdles. However, note that these penalty caps do not apply to fixed-rate loans or loans borrowed under business/non-individual categories.
                </p>
              </div>

              <div style={sec} id="breakeven-analysis">
                <h2 style={h2}>Understanding the Break-Even Timeline</h2>
                <p style={p}>
                  The break-even timeline is the period required to recover your upfront transfer costs through monthly EMI savings. If you pay Rs 25,000 in processing fees and legal charges, and your new loan saves you Rs 2,500 per month, your break-even period is 10 months.
                </p>
                <p style={p}>
                  If you plan to sell the property or close the loan in under 12 months, a balance transfer may not be financially viable. Aim for a transfer where the break-even period is under 18 months to ensure you capture meaningful net value.
                </p>
              </div>

              <div style={sec} id="fees-involved">
                <h2 style={h2}>All Hidden Fees in a Loan Balance Transfer</h2>
                <p style={p}>
                  A balance transfer involves multiple transactional costs that must be factored into your decision checklist:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.7 }}>
                    <strong style={{ color: C.ink }}>Processing Fees:</strong> Charged by the new lender, ranging from a flat fee of Rs 5,000 up to 1.00% of the loan principal.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.7 }}>
                    <strong style={{ color: C.ink }}>MODT/Stamp Duty:</strong> Memorandum of Deposit of Title Deeds charges, which vary state-wise from 0.10% to 0.50% of the loan amount.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.7 }}>
                    <strong style={{ color: C.ink }}>Legal & Valuation Charges:</strong> Levied by the new bank to evaluate the property files and check title deeds.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.7 }}>
                    <strong style={{ color: C.ink }}>Document Retrieval Fees:</strong> Charges levied by the existing lender to retrieve and courier your property deed documents.
                  </li>
                </ul>
              </div>

              <div style={sec} id="home-vs-personal">
                <h2 style={h2}>Home Loan vs Personal Loan Balance Transfer</h2>
                <p style={p}>
                  Home loan transfers enjoy lower rates and zero foreclosure fees under RBI guidelines. In contrast, personal loan transfers are subject to foreclosure penalties by the existing bank, often ranging from 2.0% to 5.0% of the outstanding balance.
                </p>
                <p style={p}>
                  Because personal loans carry shorter tenures (typically 1 to 5 years), the interest savings are smaller. Make sure you subtract the foreclosure penalty of your old bank from your calculations when evaluating a personal loan transfer.
                </p>
              </div>

              <div style={sec} id="when-to-transfer">
                <h2 style={h2}>When Does a Loan Balance Transfer Make Sense?</h2>
                <p style={p}>
                  A balance transfer is most effective during the initial years of your loan tenure. During this phase, your outstanding principal is high, and a major portion of your monthly EMI consists of interest.
                </p>
                <p style={p}>
                  If you have already paid off 15 years of a 20-year home loan, the remaining interest outgo is low. In such cases, the upfront processing fees and stamp duty of a new loan can outweigh the interest savings, rendering the transfer counter-productive.
                </p>
              </div>

              <div style={sec} id="transfer-step-by-step">
                <h2 style={h2}>Step-by-Step Loan Transfer Process in India</h2>
                <p style={p}>
                  Refinancing your loan involves a structured pathway between both banks:
                </p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Check rate quotes:</strong> Evaluate offers from competitive banks and run your savings calculation.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Apply to old bank:</strong> Submit a request for an outstanding balance statement and a list of documents held by them.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Submit to new bank:</strong> Apply to the new lender with your salary proofs, property files, and outstanding statement.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Disbursal:</strong> The new bank issues a cheque in favor of your old bank to clear your account. Property documents are transferred directly between lenders.
                  </li>
                </ol>
              </div>

              <div style={sec} id="document-checklist">
                <h2 style={h2}>Documents Required for a Loan Balance Transfer</h2>
                <p style={p}>
                  To ensure a smooth transition, assemble the required documents beforehand. You will need your latest 3 months salary slips, 6 months bank statements, ITR filings (for self-employed), copy of property title deeds, outstanding balance letter, and the document tracker list from your current bank.
                </p>
              </div>

              <div style={sec} id="cibil-impact">
                <h2 style={h2}>How Balance Transfer Affects Your CIBIL Score</h2>
                <p style={p}>
                  A balance transfer requires submitting a new loan application, prompting the new bank to run a hard inquiry on your CIBIL profile. This inquiry causes a temporary, minor reduction in your credit score.
                </p>
                <p style={p}>
                  However, once the transfer is finalized and you consistently pay your new EMIs on time, your CIBIL score will improve. Avoid submitting multiple loan applications to different banks simultaneously, as it signals credit-hungry behavior.
                </p>
              </div>

              <div style={sec} id="topup-benefit">
                <h2 style={h2}>Top-Up Loan Benefits During Balance Transfer</h2>
                <p style={p}>
                  One of the key benefits of transferring your loan is the option to secure a top-up loan. New banks often offer top-up funding at competitive home loan interest rates.
                </p>
                <p style={p}>
                  This additional cash facility is cheaper than personal loans or business loans and can be used to fund home extensions, children&apos;s higher education, or consolidate expensive credit card bills.
                </p>
              </div>

              <div style={sec} id="limitations">
                <h2 style={h2}>Limitations of Loan Balance Transfer Calculators</h2>
                <p style={p}>
                  Calculators assume a constant interest rate schedule over the remaining tenure. Since most home loans are floating-rate loans linked to external benchmarks (EBLR/RLLR), future changes in RBI repo rates can alter your actual savings.
                </p>
                <p style={p}>
                  Always request a personalized term sheet from the new bank detailing the exact margins, reset frequency, and processing caps before making a final decision.
                </p>
              </div>

              <div style={sec} id="how-to-use">
                <h2 style={h2}>How to Use This Loan Balance Transfer Calculator</h2>
                <p style={p}>
                  This calculator helps you estimate monthly savings, net benefits, and break-even timelines in three simple steps:
                </p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Outstanding Principal & Existing Rate:</strong> Input the remaining principal balance, your current interest rate, and the remaining tenure.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>New Offer Details:</strong> Set the interest rate offered by the new bank, expected processing fees, and foreclosure fees of the old bank if applicable.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Evaluate Comparison:</strong> Review the monthly EMI savings and expand the comparison schedule to see side-by-side yearly interest components.
                  </li>
                </ol>
              </div>


              <div style={sec} id="faq">
                <h2 style={h2}>Frequently Asked Questions</h2>
                <FAQBox items={faqItems} />
              </div>

              <hr style={{ border: 'none', borderTop: `1px solid ${C.border}`, margin: '40px 0 24px' }} />
              <div style={{ fontSize: 11.5, color: C.ink3, lineHeight: 1.6 }} id="disclaimer">
                <strong>Disclaimer:</strong> Calculations are indicative. Actual savings depend on the new bank&apos;s credit score assessment, property valuation clearance, and prevailing benchmark repo rates. Consult bank officials for formal terms.
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <aside className="lbt-sidebar" style={{ display: mobile ? 'none' : 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto', maxHeight: 'calc(100vh - 120px)', position: 'sticky', top: 20 }}>
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
                { href: '/calculators/loan-prepayment-calculator', label: 'Loan Prepayment Calculator' },
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
              <div style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 12 }}>Refinancing Checkpoints</div>
              {[
                { label: 'Min rate delta suggested', value: '0.50%' },
                { label: 'Home loan foreclosure', value: '0% (Floating)' },
                { label: 'Stamp duty on MODT', value: '0.1% - 0.5%' },
                { label: 'Avg processing fee', value: '0.25% - 0.50%' },
                { label: 'Max tenure allowed', value: '30 years' },
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

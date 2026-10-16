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
const STORAGE_KEY = 'fermor-overdraft-interest-v1';

interface LedgerItem { id: string; day: number; desc: string; type: 'deposit' | 'withdrawal'; amount: number }
interface DailyRecord { day: number; closingBalance: number; interest: number }

function buildDailySchedule(limit: number, rate: number, startBal: number, txs: LedgerItem[]): DailyRecord[] {
  const schedule: DailyRecord[] = [];
  let runningBal = startBal;
  const dailyRate = rate / 100 / 365;

  for (let d = 1; d <= 30; d++) {
    // Find all transactions on this day
    const dayTxs = txs.filter(t => t.day === d);
    for (const tx of dayTxs) {
      if (tx.type === 'deposit') {
        runningBal = Math.max(0, runningBal - tx.amount);
      } else {
        runningBal = Math.min(limit, runningBal + tx.amount);
      }
    }
    const dayInterest = runningBal * dailyRate;
    schedule.push({ day: d, closingBalance: runningBal, interest: dayInterest });
  }
  return schedule;
}

function fmt(n: number): string {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
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

function DonutChart({ utilized, available }: { utilized: number; available: number }) {
  const total = utilized + available;
  if (total === 0) return null;
  const R = 78, sw = 20, cx = 104, cy = 104;
  const circ = 2 * Math.PI * R;
  const utiArc = (utilized / total) * circ;
  const utiPct = Math.round((utilized / total) * 100);
  return (
    <svg width="208" height="208" viewBox="0 0 208 208" style={{ display: 'block' }}
      role="img" aria-label={`OD Limit split: ${utiPct}% utilized balance, ${100 - utiPct}% available limit`}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${utiArc} ${circ - utiArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Utilized</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 26, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{utiPct}%</text>
    </svg>
  );
}

function DailyBalanceChart({ schedule }: { schedule: DailyRecord[] }) {
  if (schedule.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxBal = Math.max(...schedule.map(s => s.closingBalance));
  const slot = (W - PADL) / schedule.length;
  const barW = Math.max(2, Math.min(10, slot * 0.4));
  const gap = (slot - barW) / 2;

  return (
    <svg role="img" aria-label="Daily outstanding overdraft balances chart"
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {schedule.map((rec, i) => {
        const balH = maxBal > 0 ? (rec.closingBalance / maxBal) * H : 0;
        const xPos = PADL + i * slot + gap;
        return (
          <g key={rec.day}>
            <rect x={xPos} y={H - balH} width={barW} height={balH} fill={CHART_PAIR.primary} rx={1} />
            <text x={xPos + barW / 2} y={H + 14} textAnchor="middle"
              style={{ fontSize: 9, fill: C.ink3, fontFamily: INTER }}>
              {rec.day}
            </text>
          </g>
        );
      })}
      <line x1={PADL} y1={H} x2={W} y2={H} stroke={C.border} strokeWidth={1} />
    </svg>
  );
}


export default function OverdraftInterestCalculatorClient() {
  const [mobile, setMobile] = useState(false);

  const defaultSettings = { odLimit: 1000000, annualRate: 12.00, avgUtilization: 600000, daysUtilized: 30 };
  const { settings, updateSettings } = useCalculatorSettings('overdraft-interest-calculator', defaultSettings);
  const { odLimit, annualRate, avgUtilization, daysUtilized } = settings;

  const setOdLimit = (v: any) => updateSettings({ odLimit: typeof v === 'function' ? v(settings.odLimit) : v });
  const setAnnualRate = (v: any) => updateSettings({ annualRate: typeof v === 'function' ? v(settings.annualRate) : v });
  const setAvgUtilization = (v: any) => updateSettings({ avgUtilization: typeof v === 'function' ? v(settings.avgUtilization) : v });
  const setDaysUtilized = (v: any) => updateSettings({ daysUtilized: typeof v === 'function' ? v(settings.daysUtilized) : v });

  const [activeTab, setActiveTab] = useState<'util' | 'ledger'>('util');
  const [startBalance, setStartBalance] = useState(400000);
  const [transactions, setTransactions] = useState<LedgerItem[]>([
    { id: 't1', day: 5, desc: 'Supplier Payment', type: 'withdrawal', amount: 200000 },
    { id: 't2', day: 12, desc: 'Client Deposit', type: 'deposit', amount: 350000 },
    { id: 't3', day: 20, desc: 'Salary Payouts', type: 'withdrawal', amount: 150000 },
    { id: 't4', day: 25, desc: 'GST Payment', type: 'withdrawal', amount: 80000 },
  ]);

  const [txDay, setTxDay] = useState(1);
  const [txDesc, setTxDesc] = useState('');
  const [txType, setTxType] = useState<'deposit' | 'withdrawal'>('withdrawal');
  const [txAmt, setTxAmt] = useState(50000);

  const [showLedgerAmort, setShowLedgerAmort] = useState(false);

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
        if (d.odLimit) setOdLimit(d.odLimit);
        if (d.annualRate) setAnnualRate(d.annualRate);
        if (d.avgUtilization) setAvgUtilization(d.avgUtilization);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ odLimit, annualRate, avgUtilization }));
    } catch {}
  }, [odLimit, annualRate, avgUtilization]);

  // Dynamically cap average utilization if limit changes
  useEffect(() => {
    if (avgUtilization > odLimit) {
      setAvgUtilization(odLimit);
    }
  }, [odLimit, avgUtilization]);

  // Average mode math
  const monthlyInterestAvg = useMemo(() => {
    return (avgUtilization * (annualRate / 100) * daysUtilized) / 365;
  }, [avgUtilization, annualRate, daysUtilized]);

  const availableLimitAvg = Math.max(0, odLimit - avgUtilization);

  // Ledger mode math
  const ledgerSchedule = useMemo(() => {
    return buildDailySchedule(odLimit, annualRate, startBalance, transactions);
  }, [odLimit, annualRate, startBalance, transactions]);

  const totalInterestLedger = useMemo(() => {
    return ledgerSchedule.reduce((acc, curr) => acc + curr.interest, 0);
  }, [ledgerSchedule]);

  const avgUtilizationLedger = useMemo(() => {
    const sum = ledgerSchedule.reduce((acc, curr) => acc + curr.closingBalance, 0);
    return sum / ledgerSchedule.length;
  }, [ledgerSchedule]);

  const availableLimitLedger = Math.max(0, odLimit - avgUtilizationLedger);

  const addTransaction = () => {
    if (!txDesc) return;
    const newItem: LedgerItem = {
      id: `tx-${Date.now()}`,
      day: Math.max(1, Math.min(30, txDay)),
      desc: txDesc,
      type: txType,
      amount: txAmt,
    };
    setTransactions(prev => [...prev, newItem].sort((a, b) => a.day - b.day));
    setTxDesc('');
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const currentInterest = activeTab === 'util' ? monthlyInterestAvg : totalInterestLedger;
  const currentUtilized = activeTab === 'util' ? avgUtilization : avgUtilizationLedger;
  const currentAvailable = activeTab === 'util' ? availableLimitAvg : availableLimitLedger;

  const h2 = { fontSize: mobile ? 18 : 21, fontWeight: 700, color: C.ink, margin: '0 0 12px', letterSpacing: '-0.015em' } as React.CSSProperties;
  const p = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;

  const faqItems = [
    { q: 'What is an overdraft (OD) limit?', a: 'An overdraft limit is a credit facility offered by banks that allows account holders to withdraw funds beyond their actual balance, up to a pre-approved credit ceiling.' },
    { q: 'How is overdraft interest calculated?', a: 'Overdraft interest is calculated daily on the closing balance of the utilized amount using the formula: Daily Interest = (Utilized Amount x Annual Interest Rate) / (365 x 100). The accumulated daily interest is debited from the account at the end of the month.' },
    { q: 'What is the difference between overdraft and a term loan?', a: 'Unlike term loans where interest is charged on the entire sanctioned principal from day one, overdraft interest is only charged on the exact amount you withdraw and for the specific days you utilize it.' },
    { q: 'Does cash deposit reduce interest instantly?', a: 'Yes, because overdraft interest is calculated on the daily closing balance, depositing funds instantly reduces the outstanding utilized balance for that day, thereby reducing your interest outgo.' },
    { q: 'Are there hidden fees on overdraft lines?', a: 'Yes, banks may levy annual renewal fees, processing charges, and non-utilization fees if average usage falls below a certain percentage of the limit.' },
    { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' },
  ];

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <style>{`
        .od-sidebar::-webkit-scrollbar { width: 5px; }
        .od-sidebar::-webkit-scrollbar-track { background: transparent; }
        .od-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .od-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
      `}</style>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Overdraft Interest Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 15, color: C.ink2, margin: 0, lineHeight: 1.6, maxWidth: mobile ? '100%' : 800 }}>
            Calculate monthly interest on daily overdraft limit utilization. Simulate deposits, withdrawals, and transactions to see how they impact your working capital interest costs.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>
              <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                <button onClick={() => setActiveTab('util')} style={{ flex: 1, padding: '16px 20px', border: 'none', background: activeTab === 'util' ? C.white : 'transparent', color: activeTab === 'util' ? C.dark : C.ink3, fontWeight: activeTab === 'util' ? 700 : 500, borderBottom: activeTab === 'util' ? `3px solid ${C.dark}` : 'none', cursor: 'pointer', fontFamily: INTER, fontSize: 14 }}>
                  Average Utilization Mode
                </button>
                <button onClick={() => setActiveTab('ledger')} style={{ flex: 1, padding: '16px 20px', border: 'none', background: activeTab === 'ledger' ? C.white : 'transparent', color: activeTab === 'ledger' ? C.dark : C.ink3, fontWeight: activeTab === 'ledger' ? 700 : 500, borderBottom: activeTab === 'ledger' ? `3px solid ${C.dark}` : 'none', cursor: 'pointer', fontFamily: INTER, fontSize: 14 }}>
                  Daily Transaction Simulator
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                <div style={{ padding: mobile ? '20px 18px' : '44px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Sanctioned Limit & Rates</p>
                    <CurrencySelector theme="light" />
                  </div>

                  <Slider label="Sanctioned OD Limit" value={odLimit} min={100000} max={10000000} step={50000}
                    display={fmtC(odLimit)} onChange={setOdLimit} compact={mobile} />

                  <Slider label="Annual Interest Rate (% p.a.)" value={annualRate} min={6} max={24} step={0.25}
                    display={`${annualRate.toFixed(2)}%`} onChange={setAnnualRate} compact={mobile} />

                  {activeTab === 'util' ? (
                    <div>
                      <Slider label="Average Daily Utilization" value={avgUtilization} min={10000} max={odLimit} step={10000}
                        display={fmtC(avgUtilization)} onChange={setAvgUtilization} compact={mobile} />
                      <Slider label="Days Utilized in Month" value={daysUtilized} min={1} max={31} step={1}
                        display={`${daysUtilized} Days`} onChange={setDaysUtilized} compact={mobile} />
                    </div>
                  ) : (
                    <div>
                      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 12 }}>
                        <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 16 }}>Start Balance & Ledger Entries</p>
                        <Slider label="Opening Utilized Balance (Day 1)" value={startBalance} min={0} max={odLimit} step={10000} display={fmtC(startBalance)} onChange={setStartBalance} compact />
                      </div>

                      <div style={{ background: '#fafafa', border: `1px solid ${C.border}`, borderRadius: 8, padding: 14 }}>
                        <p style={{ fontSize: 12, fontWeight: 700, color: C.dark, margin: '0 0 10px' }}>Add Transaction</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                          <input type="number" min={1} max={30} value={txDay} onChange={e => setTxDay(Math.max(1, Math.min(30, +e.target.value)))} placeholder="Day" aria-label="Transaction Day of Month"
                            style={{ padding: '6px 8px', border: `1px solid ${C.border}`, borderRadius: 5, fontSize: 13, color: C.ink, width: '100%' }} />
                          <select value={txType} onChange={e => setTxType(e.target.value as any)} aria-label="Transaction Type"
                            style={{ padding: '6px 8px', border: `1px solid ${C.border}`, borderRadius: 5, fontSize: 13, color: C.ink, width: '100%' }}>
                            <option value="withdrawal">Withdrawal</option>
                            <option value="deposit">Deposit</option>
                          </select>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 10, marginBottom: 12 }}>
                          <input type="text" placeholder="Description (e.g. Sales)" value={txDesc} onChange={e => setTxDesc(e.target.value)} aria-label="Transaction Description"
                            style={{ padding: '6px 8px', border: `1px solid ${C.border}`, borderRadius: 5, fontSize: 13, color: C.ink, width: '100%' }} />
                          <input type="number" step={5000} value={txAmt} onChange={e => setTxAmt(Math.max(0, +e.target.value))} placeholder="Amount" aria-label="Transaction Amount"
                            style={{ padding: '6px 8px', border: `1px solid ${C.border}`, borderRadius: 5, fontSize: 13, color: C.ink, width: '100%' }} />
                        </div>
                        <button className="fx-btn" onClick={addTransaction}
                          style={{ width: '100%', background: '#E9ECEE', color: '#101214', border: '1px solid #D3D7DA', borderRadius: 6, padding: '8px 10px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: INTER }}>
                          Add to Ledger
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Results Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '44px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#50565C' }}>Interest for the Month</span>
                      <span aria-live="polite" aria-label={`Interest Accrued: ${fmtIN(currentInterest)}`}
                        style={{ fontSize: mobile ? 22 : 26, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>{fmtIN(currentInterest)}</span>
                    </div>
                    <div style={{ borderTop: '1px solid #E3E6E8', paddingTop: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 11, color: '#7A8087' }}>Estimated Daily Interest</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#101214' }}>
                        {activeTab === 'util' ? fmtIN(monthlyInterestAvg / daysUtilized) : fmtIN(totalInterestLedger / 30)}
                      </span>
                    </div>
                  </div>

                  {[
                    { label: 'Sanctioned limit', value: fmtC(odLimit) },
                    { label: 'Average utilization', value: fmtC(currentUtilized) },
                    { label: 'Average utilization %', value: `${((currentUtilized / odLimit) * 100).toFixed(1)}%` },
                    { label: 'Available limit', value: fmtC(currentAvailable) },
                    { label: 'Interest rate p.a.', value: `${annualRate.toFixed(2)}%` },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: 13, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 12, order: mobile ? 1 : -1 }}>
                    <DonutChart utilized={currentUtilized} available={currentAvailable} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 12, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} /><span style={{ fontSize: 12, color: C.ink2 }}>Utilized</span></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} /><span style={{ fontSize: 12, color: C.ink2 }}>Available</span></div>
                  </div>
                </div>
              </div>

              {/* Transactions list and schedule (activeTab === 'ledger') */}
              {activeTab === 'ledger' && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowLedgerAmort(v => !v)} aria-expanded={showLedgerAmort} aria-controls="ledger-schedule"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 18px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div>
                      <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>Transaction Ledger & Daily Schedule</span>
                      <span style={{ fontSize: 12, color: C.ink3, marginLeft: 8 }}>({transactions.length} custom transactions)</span>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: showLedgerAmort ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {showLedgerAmort && (
                    <div id="ledger-schedule" style={{ borderTop: `1px solid ${C.border}`, padding: mobile ? '18px 18px' : '24px 44px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1.2fr 1.8fr', gap: 24, alignItems: 'start' }}>
                        {/* Transaction List */}
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 12 }}>Ledger Entries</p>
                          {transactions.length === 0 ? (
                            <p style={{ fontSize: 12, color: C.ink3 }}>No transaction entries. Add one above.</p>
                          ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 300, overflowY: 'auto', paddingRight: 6 }}>
                              {transactions.map(t => (
                                <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, padding: '8px 12px' }}>
                                  <div>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: C.dark }}>{t.desc}</div>
                                    <div style={{ fontSize: 11, color: C.ink3 }}>Day {t.day} &bull; {t.type}</div>
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: t.type === 'deposit' ? C.green : C.dark }}>
                                      {t.type === 'deposit' ? '-' : '+'}{fmtIN(t.amount)}
                                    </span>
                                    <button onClick={() => deleteTransaction(t.id)} aria-label={`Delete ${t.desc}`}
                                      style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>
                                      &times;
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Schedule Table and Chart */}
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 12 }}>Daily Outstanding Balance Schedule</p>
                          <div style={{ marginBottom: 20 }}>
                            <DailyBalanceChart schedule={ledgerSchedule} />
                          </div>

                          <div style={{ overflowX: 'auto', maxHeight: 250, overflowY: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                              <thead>
                                <tr style={{ background: '#f4f5f6' }}>
                                  {['Day', 'Closing Balance', 'Interest Accrued'].map((h, idx) => (
                                    <th key={h} scope="col" style={idx > 0 ? { ...thS, textAlign: 'right' } : thS}>{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {ledgerSchedule.map(rec => (
                                  <tr key={rec.day} style={{ borderTop: `1px solid ${C.border}` }}>
                                    <td style={tdL}>Day {rec.day}</td>
                                    <td style={tdR}>{fmtIN(rec.closingBalance)}</td>
                                    <td style={tdR}>{fmtIN(rec.interest)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Save results and standard CTAs */}
            <div style={{ marginBottom: 24 }}><SaveResultsCard mobile={mobile} /></div>

            {/* Article prose */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>
              <div style={sec} id="od-basics">
                <h2 style={h2}>What Is an Overdraft Interest Calculator?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.dark, lineHeight: 1.7, margin: 0 }}>
                    An overdraft interest calculator is a financial tool designed to estimate interest charged on bank overdraft (OD) accounts based on daily closing balances and utilization periods.
                  </p>
                </div>
                <p style={p}>
                  Overdraft accounts serve as a critical tool for businesses and individuals managing short-term cash flow gaps. Unlike standard loans that charge interest on the entire sanctioned principal, an overdraft account only levies interest on the specific amount you utilize, calculated on a daily basis.
                </p>
                <p style={p}>
                  For instance, if your bank sanctions an overdraft limit of Rs 10 lakh, but you only withdraw Rs 2 lakh for 10 days to pay suppliers, you will only owe interest on Rs 2 lakh for those 10 days, not the full Rs 10 lakh limit.
                </p>
              </div>

              <div style={sec} id="od-formula">
                <h2 style={h2}>Overdraft Account Interest Calculation Formula</h2>
                <p style={p}>
                  Overdraft interest is computed daily on the closing balance using a standard reducing balance formula.
                </p>
                <p style={p}>
                  The exact daily interest calculation formula is:
                </p>
                <div style={{ background: '#fafafa', border: `1px solid ${C.border}`, borderRadius: 10, padding: 18, margin: '16px 0', fontFamily: 'monospace', fontSize: 14, color: C.dark }}>
                  Daily Interest = (Daily Closing Utilized Balance &times; Annual Interest Rate) / (365 &times; 100)
                </div>
                <p style={p}>
                  The daily interest amounts accrued over the course of the billing cycle (typically a month) are summed up. This accumulated interest sum is debited directly from your account on the last day of the month.
                </p>
              </div>

              <div style={sec} id="od-vs-loan">
                <h2 style={h2}>Difference Between Overdraft and Term Loan</h2>
                <p style={p}>
                  While both term loans and overdrafts provide access to debt, their interest charging structures are fundamentally different:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.7 }}>
                    <strong style={{ color: C.ink }}>Interest Application:</strong> Term loans charge interest on the full sanctioned principal from the day of disbursal. Overdrafts charge interest only on the utilized credit balance.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.7 }}>
                    <strong style={{ color: C.ink }}>Repayment Flexibility:</strong> Term loans are repaid through structured monthly EMIs (comprising principal and interest components). Overdrafts allow flexible deposits at any time, instantly reducing the outstanding interest-bearing balance.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.7 }}>
                    <strong style={{ color: C.ink }}>Reusability:</strong> Once a term loan is repaid, the account is closed. Overdrafts act as a revolving credit line: as you deposit funds, the available credit limit is restored and can be reused repeatedly.
                  </li>
                </ul>
              </div>

              <div style={sec} id="daily-closing-balance">
                <h2 style={h2}>Why Daily Closing Balance Matters</h2>
                <p style={p}>
                  Because overdraft interest is calculated on your daily closing balance, the timing of your transactions has a direct impact on your interest costs.
                </p>
                <p style={p}>
                  If you withdraw Rs 5 lakh in the morning to pay a supplier but receive an customer payment deposit of Rs 4 lakh in the afternoon, your daily closing utilized balance is only Rs 1 lakh. Your interest for that day is calculated on Rs 1 lakh, saving you interest on the Rs 4 lakh difference.
                </p>
              </div>

              <div style={sec} id="od-types">
                <h2 style={h2}>Types of Overdraft Facilities in India</h2>
                <p style={p}>
                  Banks in India offer several forms of overdraft lines categorized by the underlying security:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.7 }}>
                    <strong style={{ color: C.ink }}>OD against Fixed Deposits:</strong> The most common form, typically offering limits up to 90% of your FD value. The interest rate is usually pegged at 1.00% to 2.00% above the FD return rate.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.7 }}>
                    <strong style={{ color: C.ink }}>OD against Property:</strong> Secured credit lines designed for businesses against residential or commercial properties.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.7 }}>
                    <strong style={{ color: C.ink }}>OD against Securities:</strong> Offered against mutual funds, shares, or LIC insurance policies.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.7 }}>
                    <strong style={{ color: C.ink }}>Salary Overdrafts:</strong> Unsecured lines for salaried individuals, typically capped at 2x to 3x of their net monthly salary.
                  </li>
                </ul>
              </div>

              <div style={sec} id="cc-vs-od">
                <h2 style={h2}>Cash Credit (CC) vs Overdraft (OD) Accounts</h2>
                <p style={p}>
                  Cash Credit and Overdraft accounts are similar revolving facilities but differ in target audience. Cash Credit accounts are primary business lines backed by current assets such as stock, raw materials, and inventory. Overdrafts can be unsecured or backed by fixed financial assets.
                </p>
              </div>

              <div style={sec} id="od-rates">
                <h2 style={h2}>Overdraft Interest Rates Today</h2>
                <p style={p}>
                  Interest rates on overdraft accounts depend on the underlying collateral. Secured OD lines against fixed deposits carry the lowest rates (e.g., 7.50% to 8.50% p.a.). Unsecured overdraft lines for individuals or businesses can range higher, from 12.00% to 18.00% p.a.
                </p>
              </div>

              <div style={sec} id="fd-od-benefit">
                <h2 style={h2}>Overdraft Against Fixed Deposits (FD)</h2>
                <p style={p}>
                  Securing an overdraft against a Fixed Deposit is a smart strategy to meet short-term cash requirements without breaking the deposit. If you break the FD, you lose accumulated interest and pay premature withdrawal penalties.
                </p>
                <p style={p}>
                  An OD against FD allows you to access immediate liquidity at a low rate while the underlying deposit continues to earn compound interest.
                </p>
              </div>

              <div style={sec} id="hidden-costs">
                <h2 style={h2}>Hidden Fees and Non-Utilization Charges</h2>
                <p style={p}>
                  Borrowers must read the bank agreement to identify hidden costs. These include annual renewal fees, processing fees, documentation fees, and non-utilization charges which apply if you utilize less than a specified percentage of your sanctioned limit during a quarter.
                </p>
              </div>

              <div style={sec} id="avoid-overlimit">
                <h2 style={h2}>Common Overdraft Account Mistakes to Avoid</h2>
                <p style={p}>
                  Avoid using overdraft accounts to fund long-term capital acquisitions like buying heavy machinery. Overdraft interest rates are typically higher than long-term commercial term loan rates. Additionally, ensure you never exceed your sanctioned limit as it results in severe over-limit penalties.
                </p>
              </div>

              <div style={sec} id="reducing-interest">
                <h2 style={h2}>Tips to Reduce Your Overdraft Interest Outgo</h2>
                <p style={p}>
                  To minimize interest, deposit any excess daily business revenue directly into your overdraft account immediately rather than keeping it in a current account. Every rupee deposited reduces the closing balance on which daily interest is calculated.
                </p>
              </div>

              <div style={sec} id="limitations">
                <h2 style={h2}>Limitations of Overdraft Interest Calculators</h2>
                <p style={p}>
                  Calculators provide estimates based on constant outstanding balances or static transaction schedules. Since actual business operations involve multiple unpredictable daily receipts and payments, the interest charged by the bank may vary slightly depending on their exact end-of-day ledger timing.
                </p>
              </div>

              <div style={sec} id="how-to-use">
                <h2 style={h2}>How to Use This Overdraft Interest Calculator</h2>
                <p style={p}>
                  This calculator supports two modes of interest calculation:
                </p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Average Utilization Mode:</strong> Simply input your sanctioned limit, annual rate, and your estimated average daily utilized amount to find your monthly interest outgo.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Daily Transaction Simulator:</strong> Switch tabs, set your opening balance, and add individual deposits and withdrawals. The calculator computes the exact daily closing balance and displays a detailed interest schedule.
                  </li>
                </ol>
              </div>


              <div style={sec} id="faq">
                <h2 style={h2}>Frequently Asked Questions</h2>
                <FAQBox items={faqItems} />
              </div>

              <hr style={{ border: 'none', borderTop: `1px solid ${C.border}`, margin: '40px 0 24px' }} />
              <div style={{ fontSize: 11.5, color: C.ink3, lineHeight: 1.6 }} id="disclaimer">
                <strong>Disclaimer:</strong> Overdraft interest is calculated using daily rest cycles. Actual interest debits depend on the bank&apos;s transaction posting timeline and holiday calendar. Consult your account manager for verified billing statements.
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <aside className="od-sidebar" style={{ display: mobile ? 'none' : 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto', maxHeight: 'calc(100vh - 120px)', position: 'sticky', top: 20 }}>
            <nav aria-label="Related Calculators" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>Related Calculators</span>
              </div>
              {[
                { href: '/calculators/business-loan-eligibility-calculator', label: 'Business Loan Eligibility' },
                { href: '/calculators/loan-amortization-calculator', label: 'Loan Amortization' },
                { href: '/calculators/outstanding-loan-calculator', label: 'Outstanding Loan Balance' },
                { href: '/calculators/emi-calculator', label: 'EMI Calculator' },
                { href: '/calculators/personal-loan-eligibility-calculator', label: 'Personal Loan Eligibility' },
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
              <div style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 12 }}>Working Capital Guidelines</div>
              {[
                { label: 'Calculation frequency', value: 'Daily basis' },
                { label: 'Debiting schedule', value: 'Monthly cycle' },
                { label: 'FD OD rate delta', value: '+1.0% to +2.0%' },
                { label: 'Usual renewal frequency', value: 'Yearly basis' },
                { label: 'CC stock audits', value: 'Quarterly' },
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

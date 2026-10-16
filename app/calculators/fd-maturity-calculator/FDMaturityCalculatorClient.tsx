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
const STORAGE_KEY = 'fermor-fd-maturity-v1';

type CompoundingFreq = 'monthly' | 'quarterly' | 'half-yearly' | 'yearly' | 'simple';
type CustomerCategory = 'regular' | 'senior' | 'super-senior';

interface FdYearRecord { year: number; openingBalance: number; interestAccrued: number; tdsDeducted: number; closingBalance: number }

function calculateFDMaturity(principal: number, rate: number, years: number, months: number, days: number, freq: CompoundingFreq, category: CustomerCategory, hasPan: boolean, exemptForm: boolean): { maturityValue: number; totalInterest: number; tds: number; schedule: FdYearRecord[] } {
  // Rate boost based on category
  let actualRate = rate;
  if (category === 'senior') actualRate += 0.50;
  if (category === 'super-senior') actualRate += 0.75;

  const totalTenureInYears = years + (months / 12) + (days / 365);
  if (totalTenureInYears <= 0 || principal <= 0) {
    return { maturityValue: principal, totalInterest: 0, tds: 0, schedule: [] };
  }

  let maturityValue = principal;
  let totalInterest = 0;

  if (freq === 'simple') {
    totalInterest = principal * (actualRate / 100) * totalTenureInYears;
    maturityValue = principal + totalInterest;
  } else {
    let n = 4; // default quarterly
    if (freq === 'monthly') n = 12;
    if (freq === 'half-yearly') n = 2;
    if (freq === 'yearly') n = 1;

    maturityValue = principal * Math.pow(1 + (actualRate / 100) / n, n * totalTenureInYears);
    totalInterest = maturityValue - principal;
  }

  // Calculate TDS (10% standard, 20% if no PAN. Exemption limit: 40k for regular, 50k for senior/super-senior)
  let tds = 0;
  if (!exemptForm) {
    const limit = (category === 'regular') ? 40000 : 50000;
    if (totalInterest > limit) {
      const tdsRate = hasPan ? 0.10 : 0.20;
      tds = totalInterest * tdsRate;
    }
  }

  // Build year-by-year schedule
  const schedule: FdYearRecord[] = [];
  const totalYears = Math.max(1, Math.ceil(totalTenureInYears));
  let runningPrincipal = principal;
  const startYear = new Date().getFullYear();

  const limitForTds = (category === 'regular') ? 40000 : 50000;
  const tdsFactor = exemptForm ? 0 : (hasPan ? 0.10 : 0.20);

  for (let y = 0; y < totalYears; y++) {
    const yrFraction = Math.min(1, totalTenureInYears - y);
    if (yrFraction <= 0) break;

    let yrClosing = runningPrincipal;
    if (freq === 'simple') {
      const yrInt = principal * (actualRate / 100) * yrFraction;
      yrClosing = runningPrincipal + yrInt;
    } else {
      let n = 4;
      if (freq === 'monthly') n = 12;
      if (freq === 'half-yearly') n = 2;
      if (freq === 'yearly') n = 1;
      yrClosing = runningPrincipal * Math.pow(1 + (actualRate / 100) / n, n * yrFraction);
    }

    const yrInterest = yrClosing - runningPrincipal;
    
    // Distribute TDS across years if interest > threshold
    let yrTds = 0;
    if (totalInterest > limitForTds) {
      yrTds = yrInterest * tdsFactor;
    }

    schedule.push({
      year: startYear + y,
      openingBalance: runningPrincipal,
      interestAccrued: yrInterest,
      tdsDeducted: yrTds,
      closingBalance: yrClosing - yrTds,
    });

    runningPrincipal = yrClosing - yrTds;
  }

  return { maturityValue, totalInterest, tds, schedule };
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

function DonutChart({ principal, interest }: { principal: number; interest: number }) {
  const total = principal + interest;
  if (total === 0) return null;
  const R = 78, sw = 20, cx = 104, cy = 104;
  const circ = 2 * Math.PI * R;
  const priArc = (principal / total) * circ;
  const priPct = Math.round((principal / total) * 100);
  return (
    <svg width="208" height="208" viewBox="0 0 208 208" style={{ display: 'block' }}
      role="img" aria-label={`Maturity split: ${priPct}% principal deposit, ${100 - priPct}% interest earned`}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${priArc} ${circ - priArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Principal</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 26, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{priPct}%</text>
    </svg>
  );
}

function GrowthChart({ schedule }: { schedule: FdYearRecord[] }) {
  if (schedule.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxBal = Math.max(...schedule.map(s => s.closingBalance));
  const slot = (W - PADL) / schedule.length;
  const barW = Math.max(4, Math.min(15, slot * 0.35));
  const gap = (slot - barW) / 2;

  return (
    <svg role="img" aria-label="Year-by-year Fixed Deposit growth bar chart"
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {schedule.map((rec, i) => {
        const balH = maxBal > 0 ? (rec.closingBalance / maxBal) * H : 0;
        const xPos = PADL + i * slot + gap;
        return (
          <g key={rec.year}>
            <rect x={xPos} y={H - balH} width={barW} height={balH} fill={CHART_PAIR.primary} rx={1.5} />
            {schedule.length <= 15 && (
              <text x={xPos + barW / 2} y={H + 14} textAnchor="middle"
                style={{ fontSize: 10, fill: C.ink3, fontFamily: INTER }}>
                {rec.year}
              </text>
            )}
          </g>
        );
      })}
      <line x1={PADL} y1={H} x2={W} y2={H} stroke={C.border} strokeWidth={1} />
    </svg>
  );
}


export default function FDMaturityCalculatorClient() {
  const [mobile, setMobile] = useState(false);

  const defaultSettings = { depositPrincipal: 100000, interestRate: 7.00, years: 3, months: 0, days: 0, freq: 'quarterly' as CompoundingFreq, category: 'regular' as CustomerCategory, hasPan: true, exemptForm: false };
  const { settings, updateSettings } = useCalculatorSettings('fd-maturity-calculator', defaultSettings);
  const { depositPrincipal, interestRate, years, months, days, freq, category, hasPan, exemptForm } = settings;

  const setDepositPrincipal = (v: any) => updateSettings({ depositPrincipal: typeof v === 'function' ? v(settings.depositPrincipal) : v });
  const setInterestRate = (v: any) => updateSettings({ interestRate: typeof v === 'function' ? v(settings.interestRate) : v });
  const setYears = (v: any) => updateSettings({ years: typeof v === 'function' ? v(settings.years) : v });
  const setMonths = (v: any) => updateSettings({ months: typeof v === 'function' ? v(settings.months) : v });
  const setDays = (v: any) => updateSettings({ days: typeof v === 'function' ? v(settings.days) : v });
  const setFreq = (v: any) => updateSettings({ freq: typeof v === 'function' ? v(settings.freq) : v });
  const setCategory = (v: any) => updateSettings({ category: typeof v === 'function' ? v(settings.category) : v });
  const setHasPan = (v: any) => updateSettings({ hasPan: typeof v === 'function' ? v(settings.hasPan) : v });
  const setExemptForm = (v: any) => updateSettings({ exemptForm: typeof v === 'function' ? v(settings.exemptForm) : v });

  const [showSchedule, setShowSchedule] = useState(false);

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
        if (d.depositPrincipal) setDepositPrincipal(d.depositPrincipal);
        if (d.interestRate) setInterestRate(d.interestRate);
        if (d.years) setYears(d.years);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ depositPrincipal, interestRate, years }));
    } catch {}
  }, [depositPrincipal, interestRate, years]);

  const results = useMemo(() => {
    return calculateFDMaturity(depositPrincipal, interestRate, years, months, days, freq, category, hasPan, exemptForm);
  }, [depositPrincipal, interestRate, years, months, days, freq, category, hasPan, exemptForm]);

  const postTaxMaturity = results.maturityValue - results.tds;

  const h2 = { fontSize: mobile ? 18 : 21, fontWeight: 700, color: C.ink, margin: '0 0 12px', letterSpacing: '-0.015em' } as React.CSSProperties;
  const p = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;

  const faqItems = [
    { q: 'How is FD maturity value calculated?', a: 'For compound interest FDs, maturity value is calculated using the formula: A = P x (1 + r/n)^(n x t), where P is the principal, r is the annual rate, n is the compounding frequency per year, and t is the tenure in years. In India, most bank FDs compound quarterly (n = 4).' },
    { q: 'What is the compounding frequency for Indian bank FDs?', a: 'By default, Indian banks calculate compound interest on Fixed Deposits on a quarterly basis. However, banks also offer options for monthly payout (discounted interest rate), half-yearly payout, or simple interest payouts for tenures under 6 months.' },
    { q: 'Is interest earned on Fixed Deposits taxable?', a: 'Yes, interest earned on Fixed Deposits is fully taxable under the head "Income from Other Sources" at your applicable income tax slab rates.' },
    { q: 'What are the TDS rules for Fixed Deposit interest?', a: 'Banks deduct Tax Deducted at Source (TDS) at 10% if your annual FD interest income exceeds Rs 40,000 (Rs 50,000 for senior citizens). If you have not submitted your PAN card, TDS is deducted at a penalty rate of 20%.' },
    { q: 'How can I avoid TDS deductions on my FD?', a: 'If your total annual taxable income is below the exemption limit, you can submit Form 15G (for individuals under 60) or Form 15H (for senior citizens aged 60 and above) to the bank at the start of the financial year to request zero TDS.' },
    { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' },
  ];

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <style>{`
        .fd-sidebar::-webkit-scrollbar { width: 5px; }
        .fd-sidebar::-webkit-scrollbar-track { background: transparent; }
        .fd-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .fd-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
      `}</style>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Fixed Deposit (FD) Maturity Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 15, color: C.ink2, margin: 0, lineHeight: 1.6, maxWidth: mobile ? '100%' : 800 }}>
            Calculate the maturity value and interest earned on your bank Fixed Deposit. Plan with quarterly compounding, senior citizen rate boosts, and TDS tax rules.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                <div style={{ padding: mobile ? '20px 18px' : '44px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>FD Parameters</p>
                    <CurrencySelector theme="light" />
                  </div>

                  <Slider label="Deposit Principal Amount" value={depositPrincipal} min={10000} max={10000000} step={10000}
                    display={fmtC(depositPrincipal)} onChange={setDepositPrincipal} compact={mobile} />

                  <Slider label="Base Interest Rate (% p.a.)" value={interestRate} min={3} max={12} step={0.05}
                    display={`${interestRate.toFixed(2)}%`} onChange={setInterestRate} compact={mobile} />

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: 10, marginBottom: 24 }}>
                    <div>
                      <label style={{ fontSize: 12, color: C.ink3, display: 'block', marginBottom: 6 }}>Years</label>
                      <input type="number" min={0} max={10} value={years} onChange={e => setYears(Math.max(0, Math.min(10, +e.target.value)))} aria-label="Tenure in Years"
                        style={{ width: '100%', padding: '8px 10px', border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 13, color: C.ink, fontFamily: INTER }} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, color: C.ink3, display: 'block', marginBottom: 6 }}>Months</label>
                      <input type="number" min={0} max={11} value={months} onChange={e => setMonths(Math.max(0, Math.min(11, +e.target.value)))} aria-label="Tenure in Months"
                        style={{ width: '100%', padding: '8px 10px', border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 13, color: C.ink, fontFamily: INTER }} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, color: C.ink3, display: 'block', marginBottom: 6 }}>Days</label>
                      <input type="number" min={0} max={30} value={days} onChange={e => setDays(Math.max(0, Math.min(30, +e.target.value)))} aria-label="Tenure in Days"
                        style={{ width: '100%', padding: '8px 10px', border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 13, color: C.ink, fontFamily: INTER }} />
                    </div>
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label style={{ fontSize: 13, color: C.ink2, display: 'block', marginBottom: 8 }}>Compounding Frequency</label>
                    <select value={freq} onChange={e => setFreq(e.target.value as CompoundingFreq)} aria-label="Compounding Frequency"
                      style={{ width: '100%', padding: '10px 12px', border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, color: C.ink, background: C.white, fontFamily: INTER }}>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly (Standard)</option>
                      <option value="half-yearly">Half-Yearly</option>
                      <option value="yearly">Yearly</option>
                      <option value="simple">Simple Interest (No compounding)</option>
                    </select>
                  </div>

                  <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 12 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 14 }}>Depositor Category & Tax</p>
                    
                    <div style={{ marginBottom: 20 }}>
                      <label style={{ fontSize: 13, color: C.ink2, display: 'block', marginBottom: 8 }}>Depositor Age Bracket</label>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {([
                          { key: 'regular', lbl: 'Regular' },
                          { key: 'senior', lbl: 'Senior (+0.5%)' },
                          { key: 'super-senior', lbl: 'Super (+0.75%)' },
                        ] as const).map(c => (
                          <button key={c.key} onClick={() => setCategory(c.key)}
                            style={{ flex: 1, padding: '8px 10px', border: `1px solid ${category === c.key ? C.dark : C.border}`, borderRadius: 8, background: category === c.key ? C.dark : C.white, color: category === c.key ? C.lime : C.ink2, fontWeight: 600, fontSize: 12, cursor: 'pointer', fontFamily: INTER }}>
                            {c.lbl}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 13, color: C.ink2 }}>PAN card submitted?</span>
                        <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                          <button onClick={() => setHasPan(true)} style={{ padding: '4px 12px', border: 'none', background: hasPan ? C.dark : 'transparent', color: hasPan ? C.lime : C.ink3, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: INTER }}>Yes</button>
                          <button onClick={() => setHasPan(false)} style={{ padding: '4px 12px', border: 'none', background: !hasPan ? C.dark : 'transparent', color: !hasPan ? C.lime : C.ink3, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: INTER }}>No</button>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 13, color: C.ink2 }}>Submit Form 15G / 15H?</span>
                        <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                          <button onClick={() => setExemptForm(true)} style={{ padding: '4px 12px', border: 'none', background: exemptForm ? C.dark : 'transparent', color: exemptForm ? C.lime : C.ink3, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: INTER }}>Yes</button>
                          <button onClick={() => setExemptForm(false)} style={{ padding: '4px 12px', border: 'none', background: !exemptForm ? C.dark : 'transparent', color: !exemptForm ? C.lime : C.ink3, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: INTER }}>No</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '44px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#50565C' }}>Maturity Amount</span>
                      <span aria-live="polite" aria-label={`Maturity Value: ${fmtC(results.maturityValue)}`}
                        style={{ fontSize: mobile ? 22 : 26, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>{fmtC(results.maturityValue)}</span>
                    </div>
                    <div style={{ borderTop: '1px solid #E3E6E8', paddingTop: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 11, color: '#7A8087' }}>Total Interest Earned</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#101214' }}>{fmtC(results.totalInterest)}</span>
                    </div>
                  </div>

                  {[
                    { label: 'Principal deposit', value: fmtC(depositPrincipal) },
                    { label: 'Interest rate applied', value: `${(interestRate + (category === 'senior' ? 0.50 : category === 'super-senior' ? 0.75 : 0)).toFixed(2)}% p.a.` },
                    { label: 'Estimated TDS tax', value: results.tds > 0 ? fmtC(results.tds) : '₹0 (Exempt)' },
                    { label: 'Post-tax maturity value', value: fmtC(postTaxMaturity) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: 13, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 12, order: mobile ? 1 : -1 }}>
                    <DonutChart principal={depositPrincipal} interest={results.totalInterest} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 12, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} /><span style={{ fontSize: 12, color: C.ink2 }}>Principal</span></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} /><span style={{ fontSize: 12, color: C.ink2 }}>Interest</span></div>
                  </div>
                </div>
              </div>

              {/* Compounding Schedule (Collapsible growth table + bar chart) */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowSchedule(v => !v)} aria-expanded={showSchedule} aria-controls="compounding-schedule"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 18px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>Compounding Growth Schedule</span>
                    {!mobile && <span style={{ fontSize: 12, color: C.ink3, marginLeft: 8 }}>({results.schedule.length} years details)</span>}
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: showSchedule ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {showSchedule && (
                  <div id="compounding-schedule" style={{ borderTop: `1px solid ${C.border}`, padding: mobile ? '18px 18px' : '24px 44px' }}>
                    <p style={{ fontSize: 13, color: C.ink3, marginBottom: 16, lineHeight: 1.6 }}>
                      Year-by-year accumulation of compound interest and estimated TDS deductions.
                    </p>

                    <div style={{ marginBottom: 24 }}>
                      <GrowthChart schedule={results.schedule} />
                    </div>

                    <div style={{ overflowX: 'auto', maxHeight: 350, overflowY: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                        <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, paddingTop: 8, textAlign: 'left' }}>
                          Growth table showing opening balance, yearly accrued interest, TDS deductions, and closing net balance.
                        </caption>
                        <thead style={{ position: 'sticky', top: 0 }}>
                          <tr style={{ background: '#f4f5f6' }}>
                            {['Year', 'Opening Principal', 'Interest Accrued', 'TDS Deducted', 'Closing Balance'].map((h, idx) => (
                              <th key={h} scope="col" style={idx > 0 ? { ...thS, textAlign: 'right' } : thS}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {results.schedule.map((row, i) => (
                            <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                              <td style={tdL}>{row.year}</td>
                              <td style={tdR}>{fmtIN(row.openingBalance)}</td>
                              <td style={tdR}>{fmtIN(row.interestAccrued)}</td>
                              <td style={tdR}>{row.tdsDeducted > 0 ? fmtIN(row.tdsDeducted) : '₹0'}</td>
                              <td style={tdR}>{fmtIN(row.closingBalance)}</td>
                            </tr>
                          ))}
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
              <div style={sec} id="fd-basics">
                <h2 style={h2}>What Is an FD Maturity Calculator?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.dark, lineHeight: 1.7, margin: 0 }}>
                    An FD maturity calculator is an online tool that helps depositors compute the total maturity amount and compound interest earned on Fixed Deposits based on the principal, tenure, and bank rates.
                  </p>
                </div>
                <p style={p}>
                  Fixed Deposits represent one of the most reliable and popular savings instruments in India. They offer guaranteed returns, capital protection, and flexible payout timelines.
                </p>
                <p style={p}>
                  By depositing a lump sum amount for a fixed period at a set interest rate, you lock in your returns regardless of future market fluctuations. This calculator helps you compare return rates and evaluate TDS tax implications before opening an account.
                </p>
              </div>

              <div style={sec} id="fd-formula">
                <h2 style={h2}>Fixed Deposit Maturity Value Formulas</h2>
                <p style={p}>
                  The maturity amount of a Fixed Deposit is calculated based on whether interest compounding is cumulative or simple.
                </p>
                <p style={p}>
                  For cumulative deposits, interest compounds quarterly. The compounding formula used by banks in India is:
                </p>
                <div style={{ background: '#fafafa', border: `1px solid ${C.border}`, borderRadius: 10, padding: 18, margin: '16px 0', fontFamily: 'monospace', fontSize: 14, color: C.dark }}>
                  A = P &times; (1 + r / n) ^ (n &times; t)
                </div>
                <p style={p}>
                  Where:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <li style={{ fontSize: 14, color: C.ink2 }}><strong style={{ color: C.ink }}>A:</strong> Maturity value of the deposit</li>
                  <li style={{ fontSize: 14, color: C.ink2 }}><strong style={{ color: C.ink }}>P:</strong> Principal deposit amount</li>
                  <li style={{ fontSize: 14, color: C.ink2 }}><strong style={{ color: C.ink }}>r:</strong> Annual interest rate (in decimals)</li>
                  <li style={{ fontSize: 14, color: C.ink2 }}><strong style={{ color: C.ink }}>n:</strong> Compounding frequency per year (4 for quarterly)</li>
                  <li style={{ fontSize: 14, color: C.ink2 }}><strong style={{ color: C.ink }}>t:</strong> Total tenure in years</li>
                </ul>
              </div>

              <div style={sec} id="compounding-frequency">
                <h2 style={h2}>Impact of Compounding Frequency</h2>
                <p style={p}>
                  Compounding frequency dictates how often interest is calculated and added back to your principal. The higher the compounding frequency, the higher your effective yield.
                </p>
                <p style={p}>
                  Standard deposits in India compound quarterly. For short-term deposits (under 6 months), banks apply simple interest. For non-cumulative FDs, depositors can opt for monthly or quarterly interest payouts to serve as regular income.
                </p>
              </div>

              <div style={sec} id="senior-citizen-boost">
                <h2 style={h2}>Senior Citizen FD Rates and Benefits</h2>
                <p style={p}>
                  Banks offer a standard interest rate premium of 0.50% p.a. to senior citizens (aged 60 and above) to support their retirement income.
                </p>
                <p style={p}>
                  For super senior citizens (aged 80 and above), several banks offer a higher boost (up to 0.75% p.a.). Select the corresponding age bracket in our calculator to automatically apply these rate boosts to your calculations.
                </p>
              </div>

              <div style={sec} id="tds-rules">
                <h2 style={h2}>Income Tax and TDS Rules on FD Interest</h2>
                <p style={p}>
                  Interest earned on Fixed Deposits is fully taxable under the head &quot;Income from Other Sources&quot; at your applicable income tax slab rates.
                </p>
                <p style={p}>
                  Under Section 194A, banks deduct Tax Deducted at Source (TDS) at 10% if your annual FD interest income exceeds Rs 40,000 (Rs 50,000 for senior citizens). If you have not submitted your PAN card to the bank, TDS is deducted at a penalty rate of 20%.
                </p>
              </div>

              <div style={sec} id="avoid-tds">
                <h2 style={h2}>How to Avoid TDS: Form 15G and 15H</h2>
                <p style={p}>
                  If your total annual taxable income is below the basic exemption threshold, you can submit Form 15G (for individuals under 60) or Form 15H (for senior citizens) to request zero TDS deductions.
                </p>
                <p style={p}>
                  These forms must be submitted to the bank at the start of every financial year for each bank where you hold deposits exceeding the threshold.
                </p>
              </div>

              <div style={sec} id="tax-saving-fd">
                <h2 style={h2}>5-Year Tax Saving Fixed Deposits</h2>
                <p style={p}>
                  Tax-saving Fixed Deposits have a mandatory lock-in period of 5 years. Deposits up to Rs 1.5 lakh per financial year qualify for tax deductions under Section 80C of the Income Tax Act. Note that premature withdrawals or loans against tax-saving FDs are not permitted.
                </p>
              </div>

              <div style={sec} id="premature-withdrawal">
                <h2 style={h2}>Premature Withdrawal Penalties</h2>
                <p style={p}>
                  If you withdraw your Fixed Deposit before the maturity date, banks levy a premature penalty, typically 0.50% to 1.00% of the interest rate.
                </p>
                <p style={p}>
                  The bank will pay interest calculated at the rate applicable for the actual period the deposit remained with the bank, minus the penalty percentage.
                </p>
              </div>

              <div style={sec} id="post-office-fd">
                <h2 style={h2}>Post Office Fixed Deposits (POTD)</h2>
                <p style={p}>
                  The India Post Office offers Time Deposits (POTD) for tenures of 1, 2, 3, and 5 years. Unlike bank FDs which compound quarterly, Post Office Time Deposit interest compounds annually, which results in slightly lower effective yields compared to quarterly compounding bank FDs of the same rate.
                </p>
              </div>

              <div style={sec} id="fd-vs-debt-fund">
                <h2 style={h2}>Fixed Deposit vs Debt Mutual Funds</h2>
                <p style={p}>
                  Fixed Deposits offer guaranteed returns with zero capital risk up to Rs 5 lakh (insured by DICGC). Debt mutual funds do not guarantee returns and carry market risks. Since the removal of indexation benefits, both FD interest and debt fund capital gains are taxed at your slab rate.
                </p>
              </div>

              <div style={sec} id="reinvestment-scheme">
                <h2 style={h2}>Reinvestment Deposit Schemes vs Cumulative FDs</h2>
                <p style={p}>
                  Reinvestment deposit schemes are standard cumulative FDs where interest earned is automatically reinvested back into the principal. Non-cumulative FDs pay out interest at regular intervals (monthly or quarterly) and do not benefit from compound growth.
                </p>
              </div>

              <div style={sec} id="limitations">
                <h2 style={h2}>Limitations of FD Maturity Calculators</h2>
                <p style={p}>
                  Calculators assume the compounding frequency remains uniform throughout the tenure. In practice, premature withdrawals, split tenures, and changes in TDS tax rates during the financial year can alter the final payout amount.
                </p>
              </div>

              <div style={sec} id="how-to-use">
                <h2 style={h2}>How to Use This FD Maturity Calculator</h2>
                <p style={p}>
                  This calculator helps you estimate Fixed Deposit returns, TDS, and yearly balance schedules:
                </p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Deposit Amount & Rate:</strong> Input the principal amount you wish to invest, and set the interest rate.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Tenure & Compounding:</strong> Select your tenure in years, months, and days, and choose your preferred compounding frequency.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Age bracket & TDS:</strong> Pick regular or senior citizen category to apply rate premiums, and select your PAN availability status to view tax estimates.
                  </li>
                </ol>
              </div>


              <div style={sec} id="faq">
                <h2 style={h2}>Frequently Asked Questions</h2>
                <FAQBox items={faqItems} />
              </div>

              

              <hr style={{ border: 'none', borderTop: `1px solid ${C.border}`, margin: '40px 0 24px' }} />
              <div style={{ fontSize: 11.5, color: C.ink3, lineHeight: 1.6 }} id="disclaimer">
                <strong>Disclaimer:</strong> Fixed Deposit calculations are indicative and subject to change based on the bank&apos;s compounding days convention (e.g., 365 vs 366 days in leap years). Consult a qualified CA or advisor before making major investment or tax optimization decisions.
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <aside className="fd-sidebar" style={{ display: mobile ? 'none' : 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto', maxHeight: 'calc(100vh - 120px)', position: 'sticky', top: 20 }}>
            <div style={{ flexShrink: 0 }}>
              <nav aria-label="Related Calculators" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ padding: '14px 18px', borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>Related Calculators</span>
                </div>
                {[
                  { href: '/calculators/fd-laddering-calculator', label: 'FD Laddering Calculator' },
                  { href: '/calculators/sip-calculator', label: 'SIP Calculator' },
                  { href: '/calculators/lumpsum-calculator', label: 'Lumpsum Calculator' },
                  { href: '/calculators/ppf-calculator', label: 'PPF Calculator' },
                  { href: '/calculators/cagr-calculator', label: 'CAGR Calculator' },
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
            </div>

            <div style={{ flexShrink: 0 }}>
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 20px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 12 }}>Deposit Specifications</div>
                {[
                  { label: 'Standard compounding', value: 'Quarterly basis' },
                  { label: 'Regular TDS threshold', value: '₹40,000 p.a.' },
                  { label: 'Senior TDS threshold', value: '₹50,000 p.a.' },
                  { label: 'Regular TDS rate', value: '10.00%' },
                  { label: 'TDS rate without PAN', value: '20.00%' },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${C.border}`, fontSize: 12 }}>
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

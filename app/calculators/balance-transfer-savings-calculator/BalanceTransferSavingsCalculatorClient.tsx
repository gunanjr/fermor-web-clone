'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import { balanceTransferFaqs } from './faqData';
import { BalanceTransferGuide, RelatedBalanceTransferCalculators } from './BalanceTransferGuide';
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

type Mode = 'savings' | 'breakeven';
type LoanType = 'home' | 'personal' | 'credit-card';

/* ─── Slider ─────────────────────────────────────────────────── */
function Slider({ label, value, min, max, step, fmt, onChange, compact, id }: {
  label: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void; compact?: boolean; id?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = ((value - min) / (max - min)) * 100;
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 36 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 14 }}>
        <label htmlFor={inputId} style={{ fontSize: compact ? 13.5 : 14, color: C.ink2, fontWeight: 400 }}>{label}</label>
        {editing ? (
          <input id={inputId} autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            aria-label={`Enter ${label} value`}
            style={{ fontSize: 14, fontWeight: 600, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 7, padding: compact ? '6px 10px' : '7px 12px', width: 120, outline: 'none', color: C.ink, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${fmt(value)}. Click to edit.`}
            style={{ fontSize: compact ? 13 : 14, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: compact ? '5px 12px' : '6px 14px', cursor: 'pointer', fontFamily: INTER, minWidth: compact ? 88 : 105, textAlign: 'center', transition: 'border-color 0.15s' }}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}>
            {fmt(value)}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 18, height: 18, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 1px 6px rgba(16,18,20,0.18)', pointerEvents: 'none', zIndex: 1 }} />
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(+e.target.value)}
          aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">{fmt(min)}</span>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">{fmt(max)}</span>
      </div>
    </div>
  );
}

/* ─── Year presets ───────────────────────────────────────────── */
function YearPresets({ current, onChange }: { current: number; onChange: (v: number) => void }) {
  const presets = [1, 3, 5, 10, 15, 20, 30];
  return (
    <div role="group" aria-label="Tenure presets" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: -22, marginBottom: 20 }}>
      {presets.map(y => {
        const active = current === y;
        return (
          <button key={y} onClick={() => onChange(y)} aria-pressed={active} aria-label={`Set tenure to ${y} year${y > 1 ? 's' : ''}`}
            style={{ fontSize: 11.5, fontWeight: active ? 700 : 500, color: active ? C.white : C.ink3, background: active ? C.dark : 'transparent', border: `1px solid ${active ? C.dark : C.border}`, borderRadius: 99, padding: '3px 9px', cursor: 'pointer', fontFamily: INTER, transition: 'all 0.12s' }}>
            {y}Y
          </button>
        );
      })}
    </div>
  );
}

/* ─── Donut ──────────────────────────────────────────────────── */
function DonutChart({ currentInterest, newInterest, saved }: { currentInterest: number; newInterest: number; saved: number }) {
  const total = currentInterest;
  if (total === 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const savedArc = (saved / total) * circ;
  const savedPct = Math.round((saved / total) * 100);
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Interest saved ${savedPct}% of current total interest, new interest ${100 - savedPct}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${savedArc} ${circ - savedArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Interest Saved</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{savedPct}%</text>
    </svg>
  );
}

/* ─── Sidebar list ───────────────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <div style={{ padding: '14px 20px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 13.5, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ padding: '12px 20px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 13.5, color: C.ink2, transition: 'all 0.12s' }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = C.paleLime; (e.currentTarget as HTMLElement).style.color = C.dark; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink2; }}>
            {label}
          </div>
        </Link>
      ))}
    </nav>
  );
}

const POPULAR = [
  { href: '/calculators/home-loan-calculator',        label: 'Home Loan Calculator' },
  { href: '/calculators/personal-loan-calculator',     label: 'Personal Loan Calculator' },
  { href: '/calculators/emi-calculator',               label: 'EMI Calculator' },
  { href: '/calculators/loan-calculator',              label: 'Loan Eligibility Calculator' },
  { href: '/calculators/car-loan-calculator',          label: 'Car Loan Calculator' },
];
const MORE = [
  { href: '/calculators/credit-card-emi-calculator',  label: 'Credit Card EMI Calculator' },
  { href: '/calculators/education-loan-emi-calculator', label: 'Education Loan Calculator' },
  { href: '/calculators/mortgage-calculator',          label: 'Mortgage Calculator' },
  { href: '/calculators/debt-to-income-calculator',    label: 'Debt-to-Income Calculator' },
  { href: '/calculators/ppf-calculator',               label: 'PPF Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
function FAQ() {
  return <FAQBox items={balanceTransferFaqs} />;
}

/* ─── Main ───────────────────────────────────────────────────── */

export default function BalanceTransferSavingsCalculatorClient({ region = 'in' }: { region?: string }) {
  const defaultSettings = {
    mode: 'savings' as Mode,
    outstandingBalance: 5000000,
    currentRate: 9.5,
    newRate: 8.0,
    remainingTenure: 15,
    processingFeePct: 0.5,
    loanType: 'home' as LoanType,
    gstRate: 18,
  };
  const { settings, updateSettings } = useCalculatorSettings('balance-transfer-savings-calculator', defaultSettings);
  const { mode, outstandingBalance, currentRate, newRate, remainingTenure, processingFeePct, loanType, gstRate } = settings;
  const setMode = (v: any) => updateSettings({ mode: typeof v === 'function' ? v(settings.mode) : v });
  const setOutstandingBalance = (v: any) => updateSettings({ outstandingBalance: typeof v === 'function' ? v(settings.outstandingBalance) : v });
  const setCurrentRate = (v: any) => updateSettings({ currentRate: typeof v === 'function' ? v(settings.currentRate) : v });
  const setNewRate = (v: any) => updateSettings({ newRate: typeof v === 'function' ? v(settings.newRate) : v });
  const setRemainingTenure = (v: any) => updateSettings({ remainingTenure: typeof v === 'function' ? v(settings.remainingTenure) : v });
  const setProcessingFeePct = (v: any) => updateSettings({ processingFeePct: typeof v === 'function' ? v(settings.processingFeePct) : v });
  const setLoanType = (v: any) => updateSettings({ loanType: typeof v === 'function' ? v(settings.loanType) : v });
  const setGstRate = (v: any) => updateSettings({ gstRate: typeof v === 'function' ? v(settings.gstRate) : v });
  const [mobile, setMobile] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const result = useMemo(() => {
    const P = outstandingBalance;
    const r1 = currentRate / 12 / 100;
    const r2 = newRate / 12 / 100;
    const n = remainingTenure * 12;
    if (P <= 0 || remainingTenure <= 0 || currentRate <= 0 || newRate <= 0) return null;
    if (r1 <= 0 || r2 <= 0 || n <= 0) return null;

    const currentEMI = P * r1 * Math.pow(1 + r1, n) / (Math.pow(1 + r1, n) - 1);
    const newEMI = P * r2 * Math.pow(1 + r2, n) / (Math.pow(1 + r2, n) - 1);
    if (!isFinite(currentEMI) || !isFinite(newEMI)) return null;

    const currentTotalInterest = (currentEMI * n) - P;
    const newTotalInterest = (newEMI * n) - P;
    const processingFeeAmount = P * processingFeePct / 100;
    const processingFeeTotal = processingFeeAmount * (1 + gstRate / 100);
    const totalInterestSaved = currentTotalInterest - newTotalInterest;
    const netSavings = totalInterestSaved - processingFeeTotal;
    const newTotalCost = newTotalInterest + processingFeeTotal;
    const monthlySaving = currentEMI - newEMI;
    const breakEvenMonths = monthlySaving > 0 ? processingFeeTotal / monthlySaving : Infinity;
    const savingsPct = currentTotalInterest > 0 ? (totalInterestSaved / currentTotalInterest) * 100 : 0;

    return {
      currentEMI, newEMI,
      currentTotalInterest, newTotalInterest,
      processingFeeAmount, processingFeeTotal,
      totalInterestSaved, netSavings,
      newTotalCost, monthlySaving,
      breakEvenMonths, savingsPct,
      currentTotalRepayment: currentEMI * n,
      newTotalRepayment: newEMI * n + processingFeeTotal,
      n,
    };
  }, [outstandingBalance, currentRate, newRate, remainingTenure, processingFeePct, gstRate]);

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const h3  = { fontSize: 15.5, fontWeight: 600, color: C.ink, margin: '0 0 6px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } as React.CSSProperties;
  const bul = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 } as React.CSSProperties;

  const loanTypeLabels: Record<LoanType, string> = { 'home': 'Home Loan', 'personal': 'Personal Loan', 'credit-card': 'Credit Card' };

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Balance Transfer Savings Calculator
          </h1>
          <p style={{ fontSize: 14.5, color: C.ink3, margin: 0 }}>
            Compare your current loan against a balance transfer option: calculate interest savings, EMI reduction, processing fee impact, and break-even period
          </p>
          <p style={{ fontSize: 12, color: C.ink3, margin: '8px 0 0' }}>
            Last updated: 28 September 2026. Example calculations reviewed against the calculator formula.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="Balance Transfer Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              {/* Tabs */}
              <div role="tablist" aria-label="Calculator mode" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                {([
                  { id: 'savings' as Mode,  label: 'Balance Transfer Savings', desc: 'Calculate interest savings and net benefit of balance transfer' },
                  { id: 'breakeven' as Mode, label: 'Break-even Calculator',    desc: 'Find how many months to recover the processing fee' },
                ]).map(tab => (
                  <button key={tab.id}
                    role="tab" aria-selected={mode === tab.id} aria-controls={`panel-${tab.id}`}
                    onClick={() => setMode(tab.id)}
                    title={tab.desc}
                    style={{
                      flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: mobile ? 12.5 : 13.5, fontWeight: mode === tab.id ? 700 : 400,
                      color: mode === tab.id ? C.dark : C.ink3,
                      borderBottom: mode === tab.id ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                      transition: 'all 0.15s', fontFamily: INTER,
                    }}>
                    {tab.label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div role="tabpanel" id={`panel-${mode}`} style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  {/* Loan Type selector */}
                  <div style={{ marginBottom: 28 }}>
                    <label style={{ fontSize: 14, color: C.ink2, fontWeight: 400, display: 'block', marginBottom: 10 }}>Loan Type</label>
                    <div role="radiogroup" aria-label="Loan type" style={{ display: 'flex', gap: 8 }}>
                      {(['home', 'personal', 'credit-card'] as LoanType[]).map(t => (
                        <button key={t} role="radio" aria-checked={loanType === t}
                          onClick={() => setLoanType(t)}
                          style={{
                            flex: 1, padding: '8px 6px', background: loanType === t ? C.dark : 'transparent',
                            color: loanType === t ? C.lime : C.ink3, border: `1px solid ${loanType === t ? C.dark : C.border}`,
                            borderRadius: 8, cursor: 'pointer', fontSize: 11.5, fontWeight: loanType === t ? 700 : 400,
                            fontFamily: INTER, transition: 'all 0.12s', whiteSpace: 'nowrap' as const,
                          }}>
                          {loanTypeLabels[t]}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Slider label="Outstanding Loan Balance" id="outstanding-balance"
                    value={outstandingBalance} min={100000} max={50000000} step={100000}
                    fmt={fmtC} onChange={setOutstandingBalance} compact={mobile} />

                  <Slider label="Current Interest Rate" id="current-rate"
                    value={currentRate} min={5} max={24} step={0.25}
                    fmt={v => `${v.toFixed(2)}%`} onChange={setCurrentRate} compact={mobile} />

                  <Slider label="New Interest Rate" id="new-rate"
                    value={newRate} min={4} max={24} step={0.25}
                    fmt={v => `${v.toFixed(2)}%`} onChange={setNewRate} compact={mobile} />

                  <Slider label="Remaining Tenure" id="remaining-tenure"
                    value={remainingTenure} min={1} max={30} step={1}
                    fmt={v => `${v} Yr`} onChange={setRemainingTenure} compact={mobile} />

                  <YearPresets current={remainingTenure} onChange={setRemainingTenure} />

                  <Slider label="Processing Fees" id="processing-fee"
                    value={processingFeePct} min={0} max={5} step={0.25}
                    fmt={v => `${v.toFixed(2)}%`} onChange={setProcessingFeePct} compact={mobile} />

                  {mode === 'breakeven' && (
                    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 16px', marginTop: -8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 13, color: C.ink2, fontWeight: 400 }}>GST on Processing Fee</span>
                        <span style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{gstRate}%</span>
                      </div>
                      <input type="range" min={0} max={28} step={1} value={gstRate}
                        onChange={e => setGstRate(+e.target.value)}
                        aria-label="GST on processing fee"
                        style={{ width: '100%', marginTop: 8, cursor: 'pointer' }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                        <span style={{ fontSize: 10, color: C.ink3 }}>0%</span>
                        <span style={{ fontSize: 10, color: C.ink3 }}>28%</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Result panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {result ? (
                    <>
                      {/* Dark result box with 2 metrics */}
                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '14px 16px' : '18px 20px', marginBottom: 16 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                          <div>
                            <span style={{ fontSize: mobile ? 11.5 : 12, fontWeight: 600, color: '#7A8087', display: 'block', marginBottom: 2 }}>Total Interest Saved</span>
                            <span style={{ fontSize: mobile ? 20 : 26, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                              aria-live="polite" aria-label={`Total interest saved: ${fmtIN(result.totalInterestSaved)}`}>
                              {fmtIN(result.totalInterestSaved)}
                            </span>
                          </div>
                          <div style={{ width: '100%', height: 1, background: 'rgba(16,18,20,0.05)' }} />
                          <div>
                            <span style={{ fontSize: mobile ? 11.5 : 12, fontWeight: 600, color: '#7A8087', display: 'block', marginBottom: 2 }}>Net Savings (after fees)</span>
                            <span style={{ fontSize: mobile ? 20 : 26, fontWeight: 800, color: result.netSavings >= 0 ? C.lime : '#FF6B6B', letterSpacing: '-0.02em' }}
                              aria-live="polite" aria-label={`Net savings after fees: ${fmtIN(result.netSavings)}`}>
                              {result.netSavings >= 0 ? fmtIN(result.netSavings) : `-${fmtIN(Math.abs(result.netSavings))}`}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Current EMI vs New EMI */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, width: '100%', marginBottom: 16 }}>
                        <div style={{ background: '#f4f5f6', borderRadius: 8, padding: mobile ? '10px 12px' : '12px 14px' }}>
                          <span style={{ fontSize: mobile ? 10.5 : 11, color: C.ink3, fontWeight: 500, display: 'block', marginBottom: 2 }}>Current EMI</span>
                          <span style={{ fontSize: mobile ? 15 : 18, fontWeight: 700, color: C.ink }}>{fmtIN(result.currentEMI)}</span>
                        </div>
                        <div style={{ background: '#f4f5f6', borderRadius: 8, padding: mobile ? '10px 12px' : '12px 14px' }}>
                          <span style={{ fontSize: mobile ? 10.5 : 11, color: C.ink3, fontWeight: 500, display: 'block', marginBottom: 2 }}>New EMI</span>
                          <span style={{ fontSize: mobile ? 15 : 18, fontWeight: 700, color: '#1f7a58' }}>{fmtIN(result.newEMI)}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                        <DonutChart currentInterest={result.currentTotalInterest} newInterest={result.newTotalInterest} saved={result.totalInterestSaved} />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                          <span style={{ fontSize: 12, color: C.ink2 }}>Interest Saved {Math.round(result.savingsPct)}%</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                          <span style={{ fontSize: 12, color: C.ink2 }}>New Interest {100 - Math.round(result.savingsPct)}%</span>
                        </div>
                      </div>

                      {[
                        { label: 'Current Total Interest',   value: fmtIN(result.currentTotalInterest) },
                        { label: 'New Total Interest',        value: fmtIN(result.newTotalInterest) },
                        { label: 'Processing Fee (incl. GST)', value: fmtIN(result.processingFeeTotal) },
                        { label: 'Monthly Savings',          value: fmtIN(result.monthlySaving) },
                        { label: mode === 'breakeven' ? 'Break-even Period' : 'Savings', value: mode === 'breakeven' ? `${Math.ceil(result.breakEvenMonths)} months` : `${result.savingsPct.toFixed(1)}%` },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '12px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                        </div>
                      ))}

                    </>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, color: C.ink3, fontSize: 14 }}>
                      Adjust inputs to see result
                    </div>
                  )}
                </div>
              </div>

            </section>

            <div id="quick-answer" style={{ margin: '0 0 28px' }}>
              <p style={{ ...p, marginBottom: 10 }}>
                <strong style={{ color: C.ink }}>Quick answer:</strong> A balance transfer is worth considering when the interest saved exceeds the processing fee, GST and other transfer costs, and the break-even period is shorter than the time you expect to keep the loan.
              </p>
              <p style={{ ...p, margin: 0 }}>
                In the worked example below, transferring ₹50 lakh from 9.50% to 8.00% over 15 years saves about ₹7.68 lakh after a 0.50% fee and 18% GST. The figures are illustrative, not a lender quote.
              </p>
            </div>

            {/* Waitlist Card */}
            <div style={{ marginBottom: 32 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-balance-transfer">What Is a Balance Transfer?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    A balance transfer shifts your outstanding loan balance from your current lender to a different lender offering a lower interest rate or better terms. It is available for home loans, personal loans, and credit card balances.
                  </p>
                </div>
                <p style={p}>
                  The new lender assesses your application and, if approved, settles the eligible balance with your current lender. You then repay under the new lender's sanctioned rate, tenure and terms. Fees and other charges vary, so use a written offer for the comparison.
                </p>
                <p style={p}>
                  A 0.5 percentage-point rate reduction from 9% to 8.5% on ₹50 lakh over 20 years lowers the EMI by about ₹1,595 a month and saves roughly ₹3.8 lakh in total interest, before transfer costs. Actual savings depend on the outstanding balance, remaining tenure and lender terms.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-balance-transfer-works">How Balance Transfer Works</h2>
                <p style={p}>
                  A lender first checks your eligibility, credit profile and documents. If it approves the transfer, it arranges settlement of the existing balance and issues a new repayment schedule. Your new rate, tenure and fees are set by the sanction terms.
                </p>
                <p style={p}>
                  Ask both lenders for the documents and steps they require. For a home loan, this can include the account statement, income and identity records, sanction terms and property papers.
                </p>
                <p style={p}>
                  Prepayment-charge rules depend on the loan type, borrower and applicable RBI directions. Check the <a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>latest RBI directions</a> and ask your current lender for a written foreclosure quote before applying elsewhere.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="balance-transfer-savings">Balance Transfer Savings Calculation</h2>
                <p style={p}>
                  The savings from a balance transfer come from the difference between what you would have paid on your current loan and what you will pay on the new loan. The calculator on this page performs this comparison in three steps.
                </p>
                <p style={p}>
                  Step one: it computes your current EMI using the standard reducing-balance formula and sums up the total interest you would pay over the remaining tenure. Step two: it does the same calculation with the new interest rate. Step three: it subtracts the processing fee (plus GST) from the interest savings to arrive at the net benefit.
                </p>
                <p style={p}>
                  A positive net savings means the transfer saves you money overall. A negative net savings means the processing fee outweighs the interest benefit, and you are better off staying with your current lender.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="when-to-transfer">When to Consider a Balance Transfer</h2>
                <p style={p}>Balance transfer is most beneficial in these scenarios:</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Scenario</th><th style={thS} scope="col">Recommendation</th></tr></thead>
                    <tbody>
                      {[
                        ['The new offer reduces total repayment', 'Compare interest saved with processing charges, GST and every other quoted cost.'],
                        ['Break-even fits your plans', 'Check how long you expect to keep the loan, including any planned sale or prepayment.'],
                        ['Only the EMI appears lower', 'Check the new tenure and total repayment. A longer term can reduce EMI while increasing interest.'],
                        ['The remaining tenure is short', 'Run the numbers carefully because fewer instalments remain to recover transfer costs.'],
                        ['Your current lender offers a rate reset', 'Compare its written fee and revised schedule with a full transfer.'],
                        ['You need additional funds', 'Compare a top-up separately. It does not necessarily lower the rate on the existing balance.'],
                      ].map(([scenario, rec]) => (
                        <tr key={scenario as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink, minWidth: 200 }}>{scenario}</td>
                          <td style={tdR}>{rec}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="transfer-fees">Balance Transfer Fees and Charges</h2>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>Typical balance transfer charges for different loan types in India</caption>
                    <thead><tr><th style={thS} scope="col">Loan Type</th><th style={thS} scope="col">Processing Fee</th><th style={thS} scope="col">Prepayment Penalty</th><th style={thS} scope="col">GST</th></tr></thead>
                    <tbody>
                      {[
                        ['Home loan', 'Check written lender quote', 'Check current loan terms and applicable RBI directions', 'Confirm on quote'],
                        ['Personal loan', 'Check written lender quote', 'Check current loan agreement', 'Confirm on quote'],
                        ['Credit card', 'Check card issuer offer', 'Check card terms', 'Confirm on offer'],
                      ].map(([loan, fee, penalty, gst]) => (
                        <tr key={loan as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{loan}</td>
                          <td style={tdR}>{fee}</td>
                          <td style={tdR}>{penalty}</td>
                          <td style={tdR}>{gst}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  This calculator includes the processing fee percentage and GST rate entered in its inputs. It does not include legal, valuation, mortgage documentation, insurance or foreclosure costs, so subtract those separately from the displayed net savings.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="balance-transfer-vs-top-up">Balance Transfer vs Loan Top-Up</h2>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Factor</th><th style={thS} scope="col">Balance Transfer</th><th style={thS} scope="col">Top-Up Loan</th></tr></thead>
                    <tbody>
                      {[
                        ['Purpose', 'Reduce interest rate on existing loan', 'Get additional funds beyond existing loan'],
                        ['Lender', 'New lender takes over the loan', 'Same lender extends additional credit'],
                        ['Interest Rate', 'Lower than existing rate', 'Same or slightly above existing rate'],
                        ['Charges', 'Ask for processing and other transfer costs', 'Ask for fees on the additional borrowing'],
                        ['Documentation', 'Full loan application process', 'Minimal documentation'],
                        ['Best For', 'Borrowers with high existing rates', 'Borrowers who need extra funds'],
                        ['Impact on EMI', 'Reduces EMI or shortens tenure', 'Increases EMI due to higher principal'],
                      ].map(([factor, bt, topup]) => (
                        <tr key={factor as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{factor}</td>
                          <td style={tdR}>{bt}</td>
                          <td style={tdR}>{topup}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  If your goal is to lower your interest cost, a balance transfer is the right move. If you need additional funds and are happy with your current rate, a top-up loan from your existing lender is simpler and cheaper in terms of processing costs.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  A lender may offer a top-up alongside a transfer, subject to its assessment. Compare the additional borrowing separately from savings on the existing balance.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="limitations">Limitations of Balance Transfer</h2>
                <div>
                  {[
                    ['Processing fees eat into savings', 'A balance transfer is not free. The processing fee, GST, and possible prepayment penalty on your existing loan can consume a significant portion of the interest savings. Always calculate the net savings, not just the gross interest saved.'],
                    ['Rate terms can change', 'Check the benchmark, spread and reset clauses in the sanction letter. A quoted rate alone does not explain how a floating-rate EMI may change.'],
                    ['Not suitable for short remaining tenure', 'If you have only a few years left on your loan, the monthly EMI savings may not accumulate enough to recover the processing fee before the loan ends. The break-even period must be shorter than the remaining tenure.'],
                    ['Credit assessment', 'The new lender assesses your application under its own credit and eligibility rules. Ask what checks it will make before submitting multiple applications.'],
                    ['Documentation and time', 'A transfer can require fresh verification, legal review and property checks. Request the expected process and document list from the new lender.'],
                  ].map(([title, text], i) => (
                    <div key={i} style={{ ...bul, marginBottom: 14, gap: 0, flexDirection: 'column' as const }}>
                      <strong style={{ fontSize: 15, color: C.ink, marginBottom: 4 }}>{title}</strong>
                      <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This Balance Transfer Savings Calculator</h2>
                <p style={p}>Use these four steps to compare your current loan with the written transfer offer.</p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter your current loan details:</strong> add your outstanding balance, current rate and remaining tenure, then select the loan type.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter the new offer:</strong> add the proposed rate and processing fee percentage.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Review the comparison:</strong> check the current and new EMI, total interest saved and net savings after the entered fee and GST.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Check break-even:</strong> open the Break-even Calculator tab and compare the fee recovery period with your remaining tenure and plans.
                  </li>
                </ol>
                <p style={{ ...p, margin: 0 }}>
                  Click any input value to type a precise number. Use the year preset buttons for quick tenure selection. The currency selector converts all amounts to your preferred currency.
                </p>
              </div>

              <BalanceTransferGuide />

              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <RelatedBalanceTransferCalculators />

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only. Actual loan terms, interest rates and charges vary by lender, loan type and applicant. This calculator is for educational purposes and is not financial advice or a loan offer. Rates and tax rules may change. Verify current terms with your lender and official sources such as the <a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>RBI</a> and <a href="https://www.incometax.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Department</a>, and consult a qualified financial adviser or CA before deciding.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.balance-transfer-sidebar::-webkit-scrollbar{width:5px}.balance-transfer-sidebar::-webkit-scrollbar-track{background:transparent}.balance-transfer-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.balance-transfer-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="balance-transfer-sidebar" aria-label="Related calculators" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <SidebarList title="Popular Calculators" items={POPULAR} />
              <SidebarList title="More Calculators" items={MORE} />
            </div>
          </aside>

        </div>
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

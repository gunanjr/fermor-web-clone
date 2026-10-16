'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import Link from 'next/link';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import { FAQBox } from '@/components/common/FAQBox';

const INTER = 'var(--font-inter), Inter, -apple-system, BlinkMacSystemFont, sans-serif';

const C = {
  dark: '#101214',
  lime: '#a6dbc4',
  lime2: '#2d9970',
  paleLime: '#f4f5f6',
  ink: '#16140F',
  ink2: '#50565c',
  ink3: '#7a8087',
  white: '#ffffff',
  bg: '#f6f7f8',
  border: '#e3e6e8',
};

const thS: React.CSSProperties = {
  padding: '10px 14px',
  fontSize: 12,
  fontWeight: 700,
  color: C.ink,
  background: '#f4f5f6',
  textAlign: 'left',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  border: `1px solid ${C.border}`,
  whiteSpace: 'nowrap',
  verticalAlign: 'middle',
};

const tdL: React.CSSProperties = {
  padding: '10px 14px',
  fontSize: 13.5,
  color: C.ink2,
  border: `1px solid ${C.border}`,
  verticalAlign: 'middle',
  textAlign: 'left',
};

const tdR: React.CSSProperties = {
  padding: '10px 14px',
  fontSize: 13.5,
  color: C.ink,
  fontWeight: 500,
  border: `1px solid ${C.border}`,
  verticalAlign: 'middle',
  textAlign: 'right',
};

const tdC: React.CSSProperties = {
  padding: '10px 14px',
  fontSize: 13.5,
  color: C.ink2,
  border: `1px solid ${C.border}`,
  verticalAlign: 'middle',
  textAlign: 'center',
};

/* ─── Custom Slider (Colorless Input Panel) ──────────────────── */
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
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const inputId = id || label.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'slider';
  const rangeId = `${inputId}-range`;

  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };

  return (
    <div style={{ marginBottom: compact ? 18 : 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 8 : 12 }}>
        <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 13.5 : 14, color: C.ink2, fontWeight: 500, fontFamily: INTER }}>
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
              padding: compact ? '5px 10px' : '6px 12px',
              width: 120,
              outline: 'none',
              color: C.ink,
              fontFamily: INTER,
            }}
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              setRaw(String(value));
              setEditing(true);
            }}
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
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 18, height: 18, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 1px 6px rgba(16,18,20,0.18)', pointerEvents: 'none', zIndex: 1 }} />
        <input
          id={rangeId}
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
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">{fmt(min)}</span>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">{fmt(max)}</span>
      </div>
    </div>
  );
}

/* ─── Donut Chart (Output Panel) ─────────────────────────────── */
function DonutChart({ principal, totalInterest, principalPct }: { principal: number; totalInterest: number; principalPct: number }) {
  const total = principal + Math.abs(totalInterest);
  if (total === 0) return null;
  const R = 75, sw = 18, cx = 100, cy = 100;
  const circ = 2 * Math.PI * R;
  const pArc = (principal / total) * circ;

  return (
    <svg width="200" height="200" viewBox="0 0 200 200" role="img" aria-label={`Principal ${principalPct}% of total payback, interest ${100 - principalPct}%`}>
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
      <text x={cx} y={cy - 6} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Principal Share</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 26, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{principalPct}%</text>
    </svg>
  );
}

// Amortization schedule calculation
interface ScheduleYear {
  year: number;
  openingBalance: number;
  principalPaid: number;
  interestPaid: number;
  totalPayment: number;
  closingBalance: number;
}

function calculateSchedule(principal: number, annualRate: number, years: number): ScheduleYear[] {
  if (principal <= 0 || annualRate <= 0 || years <= 0) return [];
  const monthlyRate = annualRate / 12 / 100;
  const totalMonths = years * 12;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);

  let currentBalance = principal;
  const schedule: ScheduleYear[] = [];

  for (let y = 1; y <= years; y++) {
    const openingBalance = currentBalance;
    let yearlyInterest = 0;
    let yearlyPrincipal = 0;

    for (let m = 1; m <= 12; m++) {
      const monthInterest = currentBalance * monthlyRate;
      const monthPrincipal = Math.min(currentBalance, emi - monthInterest);
      yearlyInterest += monthInterest;
      yearlyPrincipal += monthPrincipal;
      currentBalance -= monthPrincipal;
      if (currentBalance < 0) currentBalance = 0;
    }

    schedule.push({
      year: y,
      openingBalance: Math.round(openingBalance),
      principalPaid: Math.round(yearlyPrincipal),
      interestPaid: Math.round(yearlyInterest),
      totalPayment: Math.round(yearlyPrincipal + yearlyInterest),
      closingBalance: Math.round(currentBalance),
    });
  }

  return schedule;
}

// Stacked Bar Chart Component
function AmortizationBarChart({ schedule }: { schedule: ScheduleYear[] }) {
  if (!schedule || schedule.length === 0) return null;
  const maxPayment = Math.max(...schedule.map(s => s.totalPayment));

  return (
    <div style={{ margin: '20px 0', padding: '16px', background: '#fafafa', border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: C.ink, margin: '0 0 12px', fontFamily: INTER }}>
        Annual Repayment Breakdown (Principal vs Interest)
      </p>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, fontSize: 12, color: C.ink2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 12, height: 12, background: C.dark, borderRadius: 3, display: 'inline-block' }} />
          <span>Principal Repayment</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 12, height: 12, background: C.lime2, borderRadius: 3, display: 'inline-block' }} />
          <span>Interest Paid</span>
        </div>
      </div>
      <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: schedule.length > 15 ? 6 : 12, height: 160, minWidth: schedule.length * 32, padding: '10px 0 0' }}>
          {schedule.map(s => {
            const pPct = (s.principalPaid / maxPayment) * 100;
            const iPct = (s.interestPaid / maxPayment) * 100;
            return (
              <div key={s.year} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column-reverse', height: `${((s.totalPayment) / maxPayment) * 100}%`, borderRadius: '4px 4px 0 0', overflow: 'hidden' }}>
                  <div style={{ height: `${(pPct / (pPct + iPct)) * 100}%`, background: C.dark, transition: 'height 0.3s' }} title={`Yr ${s.year} Principal: Rs ${s.principalPaid.toLocaleString('en-IN')}`} />
                  <div style={{ height: `${(iPct / (pPct + iPct)) * 100}%`, background: C.lime2, transition: 'height 0.3s' }} title={`Yr ${s.year} Interest: Rs ${s.interestPaid.toLocaleString('en-IN')}`} />
                </div>
                <span style={{ fontSize: 10, color: C.ink3, marginTop: 6, fontWeight: 500 }}>Y{s.year}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Default Settings ───────────────────────────────────────── */
const defaultSettings = {
  activeTab: 'lap',
  propertyValue: 10000000,
  ltvPct: 60,
  interestRate: 9.5,
  tenureYrs: 15,
  propertyType: 'residential',
  existingLoanBalance: 0,
  processingFeePct: 1.0,
  showAdvanced: false,
  showAmortization: false,
};

export default function LoanAgainstPropertyClient() {
  const [mobile, setMobile] = useState<boolean>(false);
  useLayoutEffect(() => {
    const check = () => setMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { settings, updateSettings } = useCalculatorSettings('loan-against-property-calculator', defaultSettings);
  const { formatCurrency, selectedCurrency } = useCurrency();

  const {
    activeTab,
    propertyValue,
    ltvPct,
    interestRate,
    tenureYrs,
    propertyType,
    existingLoanBalance,
    processingFeePct,
    showAdvanced,
    showAmortization,
  } = settings;

  const setActiveTab = (v: string) => updateSettings({ activeTab: v });
  const setPropertyValue = (v: number) => updateSettings({ propertyValue: v });
  const setLtvPct = (v: number) => updateSettings({ ltvPct: v });
  const setInterestRate = (v: number) => updateSettings({ interestRate: v });
  const setTenureYrs = (v: number) => updateSettings({ tenureYrs: v });
  const setPropertyType = (v: string) => updateSettings({ propertyType: v });
  const setExistingLoanBalance = (v: number) => updateSettings({ existingLoanBalance: v });
  const setProcessingFeePct = (v: number) => updateSettings({ processingFeePct: v });
  const setShowAdvanced = (v: boolean) => updateSettings({ showAdvanced: v });
  const setShowAmortization = (v: boolean) => updateSettings({ showAmortization: v });

  // Derived Calculations
  const maxLtvSanction = Math.round(propertyValue * (ltvPct / 100));
  const netLoanSanction = Math.max(0, maxLtvSanction - existingLoanBalance);

  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYrs * 12;

  const emi =
    netLoanSanction > 0 && monthlyRate > 0 && totalMonths > 0
      ? Math.round(
          (netLoanSanction * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1)
        )
      : 0;

  const totalPayback = emi * totalMonths;
  const totalInterest = Math.max(0, totalPayback - netLoanSanction);
  const principalPct = totalPayback > 0 ? Math.round((netLoanSanction / totalPayback) * 100) : 100;
  const interestPct = 100 - principalPct;

  const processingFee = Math.round(netLoanSanction * (processingFeePct / 100));
  const processingFeeGst = Math.round(processingFee * 0.18);
  const totalProcessingCost = processingFee + processingFeeGst;

  const schedule = calculateSchedule(netLoanSanction, interestRate, tenureYrs);

  return (
    <div style={{ minHeight: '100vh', background: C.bg, fontFamily: INTER, paddingBottom: 60 }}>
      {/* NAVIGATION */}
      <PageNav />

      {/* CONTAINER WITH MAX-WIDTH 1280 */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        {/* HEADER SECTION */}
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 8px', letterSpacing: '-0.025em' }}>
            Loan Against Property Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800, lineHeight: 1.6 }}>
            Calculate monthly LAP EMI, maximum Loan-to-Value (LTV) borrowing limit (50-70%), total interest payable, and year-wise amortization schedule for residential, commercial, or industrial properties.
          </p>
        </header>

        {/* MAIN PAGE LAYOUT GRID (LEFT: CALCULATOR + ARTICLE, RIGHT: SIDEBAR) */}
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          {/* LEFT COLUMN: CALCULATOR CARD + WAITLIST + CA CTA + ARTICLE */}
          <div style={{ minWidth: 0 }}>
            {/* ── CALCULATOR WIDGET CARD ── */}
            <div
              style={{
                background: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 1px 16px rgba(16,18,20,0.06)',
                marginBottom: 36,
              }}
            >
              {/* Tabs at top of card (Underline style) */}
              <div role="tablist" aria-label="Calculator Mode" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                {[
                  { id: 'lap', label: 'LAP EMI & Sanction Calculator' },
                  { id: 'ltv', label: 'Property LTV Capacity Estimator' },
                ].map(t => (
                  <button
                    key={t.id}
                    id={`tab-${t.id}`}
                    role="tab"
                    aria-selected={activeTab === t.id}
                    aria-controls={`panel-${t.id}`}
                    onClick={() => setActiveTab(t.id)}
                    style={{
                      flex: 1,
                      padding: mobile ? '13px 8px' : '15px 20px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: mobile ? 12.5 : 13.5,
                      fontWeight: activeTab === t.id ? 700 : 400,
                      color: activeTab === t.id ? C.dark : C.ink3,
                      borderBottom: activeTab === t.id ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                      transition: 'all 0.15s',
                      fontFamily: INTER,
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* TAB CONTENT PANEL: 1fr 1fr Grid inside the ~900px left column */}
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                {/* LEFT: INPUT PANEL (Colorless) */}
                <div
                  role="tabpanel"
                  id={`panel-${activeTab}`}
                  style={{
                    padding: mobile ? '20px 18px' : '36px 36px',
                    borderRight: mobile ? 'none' : `1px solid ${C.border}`,
                    borderBottom: mobile ? `1px solid ${C.border}` : 'none',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {showAdvanced ? 'Advanced Inputs' : 'Property & Loan Details'}
                    </span>
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      {/* Property Type Toggle (Neutral Colorless Styling) */}
                      <div style={{ marginBottom: 24 }}>
                        <label style={{ fontSize: 14, color: C.ink2, fontWeight: 500, display: 'block', marginBottom: 8, fontFamily: INTER }}>
                          Property Collateral Type
                        </label>
                        <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                          {(['residential', 'commercial', 'industrial'] as const).map(type => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => {
                                setPropertyType(type);
                                if (type === 'commercial' && ltvPct > 55) setLtvPct(50);
                                if (type === 'industrial' && ltvPct > 45) setLtvPct(40);
                                if (type === 'residential' && ltvPct < 50) setLtvPct(60);
                              }}
                              style={{
                                flex: 1,
                                padding: '8px 4px',
                                border: 'none',
                                background: propertyType === type ? C.white : 'transparent',
                                color: propertyType === type ? C.ink : C.ink3,
                                fontWeight: propertyType === type ? 600 : 400,
                                fontSize: 13,
                                cursor: 'pointer',
                                fontFamily: INTER,
                                transition: 'all 0.15s',
                                textTransform: 'capitalize',
                              }}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      <Slider
                        id="prop-val"
                        label="Property Market Valuation"
                        value={propertyValue}
                        min={1000000}
                        max={250000000}
                        step={500000}
                        fmt={formatCurrency}
                        onChange={setPropertyValue}
                        compact={mobile}
                      />

                      <Slider
                        id="ltv-pct"
                        label="Sanction Loan-to-Value (LTV %)"
                        value={ltvPct}
                        min={30}
                        max={75}
                        step={1}
                        fmt={v => `${v}%`}
                        onChange={setLtvPct}
                        compact={mobile}
                      />

                      <Slider
                        id="rate"
                        label="LAP Interest Rate (p.a.)"
                        value={interestRate}
                        min={8.5}
                        max={16.0}
                        step={0.1}
                        fmt={v => `${v.toFixed(2)}%`}
                        onChange={setInterestRate}
                        compact={mobile}
                      />

                      <Slider
                        id="tenure"
                        label="Loan Tenure (Years)"
                        value={tenureYrs}
                        min={1}
                        max={20}
                        step={1}
                        fmt={v => `${v} Years`}
                        onChange={setTenureYrs}
                        compact={mobile}
                      />

                      {/* Year Presets (Neutral Pill Buttons) */}
                      <div role="group" aria-label="Tenure presets" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: -14, marginBottom: 20 }}>
                        {[5, 10, 15, 20].map(y => (
                          <button
                            key={y}
                            type="button"
                            onClick={() => setTenureYrs(y)}
                            aria-pressed={tenureYrs === y}
                            aria-label={`Set duration to ${y} years`}
                            style={{
                              fontSize: 11.5,
                              fontWeight: tenureYrs === y ? 700 : 500,
                              color: tenureYrs === y ? C.ink : C.ink3,
                              background: tenureYrs === y ? C.white : 'transparent',
                              border: `${tenureYrs === y ? 1.5 : 1}px solid ${tenureYrs === y ? C.ink : C.border}`,
                              borderRadius: 99,
                              padding: '3px 12px',
                              cursor: 'pointer',
                              fontFamily: INTER,
                              transition: 'all 0.12s',
                            }}
                          >
                            {y}Y
                          </button>
                        ))}
                      </div>

                      {/* Neutral Info Display Box: Derived Sanction Limit */}
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '12px 14px', marginBottom: 24 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 13, color: C.ink2 }}>Max Sanction Limit ({ltvPct}% LTV):</span>
                          <strong style={{ fontSize: 14, color: C.ink }}>{formatCurrency(maxLtvSanction)}</strong>
                        </div>
                      </div>

                      {/* More Settings Button (Bottom-Right) */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          onClick={() => setShowAdvanced(true)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: C.ink2,
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            fontFamily: INTER,
                          }}
                        >
                          <span>More settings (existing loans, processing fees)</span>
                          <span aria-hidden="true">&rarr;</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Slider
                        id="exist-loan"
                        label="Existing Home Loan / Top-up Balance"
                        value={existingLoanBalance}
                        min={0}
                        max={maxLtvSanction}
                        step={100000}
                        fmt={formatCurrency}
                        onChange={setExistingLoanBalance}
                        compact={mobile}
                      />

                      <Slider
                        id="proc-fee"
                        label="Bank Processing Fee (%)"
                        value={processingFeePct}
                        min={0.25}
                        max={2.0}
                        step={0.05}
                        fmt={v => `${v.toFixed(2)}%`}
                        onChange={setProcessingFeePct}
                        compact={mobile}
                      />

                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '12px 14px', marginBottom: 24 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 12.5, color: C.ink2 }}>Net Loan Sanctioned:</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{formatCurrency(netLoanSanction)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: 12.5, color: C.ink2 }}>Processing Fee + 18% GST:</span>
                          <span style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{formatCurrency(totalProcessingCost)}</span>
                        </div>
                      </div>

                      {/* Back Button (Bottom-Left, label is "Back", not "Basic") */}
                      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <button
                          type="button"
                          onClick={() => setShowAdvanced(false)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: C.ink2,
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            fontFamily: INTER,
                          }}
                        >
                          <span aria-hidden="true">&larr;</span>
                          <span>Back</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* RIGHT: RESULT PANEL (Prominent Dark Box & Donut Chart Top) */}
                <div style={{ padding: mobile ? '20px 18px' : '36px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* Donut Chart (order: -1 on desktop, 1 on mobile) */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: mobile ? 12 : 16, order: mobile ? 1 : -1 }}>
                    <DonutChart
                      principal={netLoanSanction}
                      totalInterest={totalInterest}
                      principalPct={principalPct}
                    />
                  </div>

                  {/* Legend (order: -1 on desktop, 2 on mobile) */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 20, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Principal {principalPct}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Interest {interestPct}%</span>
                    </div>
                  </div>

                  {/* Primary Result Dark Box */}
                  <div
                    style={{
                      width: '100%',
                      background: '#F4F5F6', border: '1px solid #E3E6E8',
                      borderRadius: 12,
                      padding: mobile ? '16px 18px' : '20px 24px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'stretch',
                      marginBottom: 12,
                      boxShadow: '0 4px 20px rgba(16,18,20,0.2)',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 600, color: '#50565C', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Monthly LAP EMI
                      </div>
                      <div style={{ fontSize: 12, color: '#7A8087' }}>
                        Max Sanction ({ltvPct}% LTV)
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                      <span
                        aria-live="polite"
                        aria-label={`Monthly LAP EMI: ${formatCurrency(emi)}`}
                        style={{ fontSize: mobile ? 24 : 28, fontWeight: 800, color: '#1F7A58', lineHeight: 1, letterSpacing: '-0.02em' }}
                      >
                        {formatCurrency(emi)}
                      </span>
                      <span style={{ fontSize: 15, fontWeight: 700, color: '#101214', lineHeight: 1 }}>
                        {formatCurrency(netLoanSanction)}
                      </span>
                    </div>
                  </div>

                  {/* Breakdown Stat Rows */}
                  {[
                    { label: 'Property Market Valuation', value: formatCurrency(propertyValue) },
                    { label: 'Total Interest Payable', value: formatCurrency(totalInterest) },
                    { label: 'Total Payback (Principal + Interest)', value: formatCurrency(totalPayback) },
                    { label: 'Est. Processing Fee (+18% GST)', value: formatCurrency(totalProcessingCost) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '12px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 600, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  {/* Horizontal Progress Bar */}
                  <div style={{ width: '100%', marginTop: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Principal {principalPct}%</span>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Interest {interestPct}%</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`Principal is ${principalPct}% of total loan payback`}>
                      <div style={{ height: '100%', width: `${principalPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>

                  {/* Amber Advisory warning notice if commercial/industrial LTV exceeds recommended bank caps */}
                  {propertyType === 'commercial' && ltvPct > 55 && (
                    <div style={{ background: '#FFF4E5', border: '1px solid #FFD8A8', borderRadius: 8, padding: '10px 14px', marginTop: 16, width: '100%' }}>
                      <span style={{ fontSize: 12.5, color: '#A15C00', fontWeight: 600 }}>
                        Note: Most Indian banks cap commercial property LAP at 50% to 55% LTV. Sanction above 55% requires high personal net worth.
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* COLLAPSIBLE AMORTIZATION SCHEDULE AT BOTTOM OF CARD */}
              <div style={{ borderTop: `1px solid ${C.border}`, padding: mobile ? 18 : 24 }}>
                <button
                  type="button"
                  aria-expanded={showAmortization}
                  aria-controls="lap-amortization-panel"
                  onClick={() => setShowAmortization(!showAmortization)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: C.dark,
                    fontSize: 14.5,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontFamily: INTER,
                    padding: 0,
                  }}
                >
                  <span>{showAmortization ? '▲ Hide' : '▼ View'} Year-by-Year Amortization Schedule &amp; Chart</span>
                </button>

                {showAmortization && (
                  <div id="lap-amortization-panel" style={{ marginTop: 16 }}>
                    {/* Stacked Bar Chart */}
                    <AmortizationBarChart schedule={schedule} />

                    {/* Schedule Table */}
                    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, marginTop: 8 }}>
                          Yearly Loan Against Property repayment breakdown with principal and interest components.
                        </caption>
                        <thead>
                          <tr>
                            <th scope="col" style={thS}>Year</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' }}>Opening Balance</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' }}>Principal Paid</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' }}>Interest Paid</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' }}>Total Payment</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' }}>Closing Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {schedule.map((row, idx) => (
                            <tr key={row.year} style={{ background: idx % 2 === 0 ? C.white : '#fafafa' }}>
                              <td style={{ ...tdL, fontWeight: 600 }}>Year {row.year}</td>
                              <td style={tdR}>{formatCurrency(row.openingBalance)}</td>
                              <td style={{ ...tdR, color: '#166534' }}>{formatCurrency(row.principalPaid)}</td>
                              <td style={{ ...tdR, color: '#B45309' }}>{formatCurrency(row.interestPaid)}</td>
                              <td style={tdR}>{formatCurrency(row.totalPayment)}</td>
                              <td style={tdR}>{formatCurrency(row.closingBalance)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* WAITLIST CARD COMPONENT */}
            <WaitlistCard mobile={mobile} />

            

            {/* MAIN ARTICLE & CONTENT SECTION */}
            <article itemScope itemType="https://schema.org/Article" style={{ minWidth: 0 }}>
              {/* Section 1: What is LAP */}
              <section id="what-is-lap" style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                  What Is a Loan Against Property (LAP)?
                </h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    A Loan Against Property (LAP) is a high-value multi-purpose secured loan where an individual or business pledges a fully constructed residential house, commercial office space, or industrial plot as collateral to secure credit at interest rates lower than personal loans.
                  </p>
                </div>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 16px' }}>
                  Per official <a href="https://rbi.org.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Reserve Bank of India (RBI)</a> guidelines on secured credit, commercial banks and Housing Finance Companies (HFCs) determine the loan sanction limit based on two parameters: the Loan-to-Value (LTV) ratio of the collateralized property and the borrower's Fixed Obligation to Income Ratio (FOIR).
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: 0 }}>
                  Unlike home loans, which can only be used to purchase or construct a house, LAP proceeds have no end-use restrictions. Borrowers commonly use LAP for business expansion, working capital, debt consolidation, medical emergencies, higher education, or commercial real estate acquisition.
                </p>
              </section>

              {/* Section 2: LAP Formula */}
              <section id="lap-formula" style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                  Loan Against Property EMI and LTV Formula
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 16px' }}>
                  Calculating a Loan Against Property requires two distinct mathematical steps: determining the maximum sanction limit using the LTV ratio, and computing the monthly EMI using the standard reducing-balance formula.
                </p>
                <div style={{ background: '#f8f9f9', border: `1px solid ${C.border}`, borderRadius: 10, padding: 18, marginBottom: 20 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: C.ink, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    1. Maximum LTV Sanction Formula
                  </p>
                  <div style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark, fontWeight: 700, padding: '8px 12px', background: C.white, border: `1px solid ${C.border}`, borderRadius: 6, marginBottom: 16 }}>
                    Max Loan Sanction = Property Market Value x (LTV % / 100) - Existing Encumbrances
                  </div>

                  <p style={{ fontSize: 13, fontWeight: 700, color: C.ink, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    2. Monthly LAP EMI Reducing-Balance Formula
                  </p>
                  <div style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark, fontWeight: 700, padding: '8px 12px', background: C.white, border: `1px solid ${C.border}`, borderRadius: 6 }}>
                    EMI = [ P x r x (1 + r)^n ] / [ (1 + r)^n - 1 ]
                  </div>
                  <p style={{ fontSize: 12, color: C.ink3, margin: '10px 0 0' }}>
                    Where P = Net Loan Sanction Amount, r = Monthly Interest Rate (Annual Rate / 12 / 100), and n = Loan Tenure in Months.
                  </p>
                </div>

                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 16px' }}>
                  <strong>Worked Example:</strong> Suppose you own a residential flat in Mumbai evaluated at Rs 1.50 Crore. The bank approves a 60% LTV ratio with an interest rate of 9.50% p.a. for a 15-year (180-month) tenure.
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14.5, color: C.ink2, listStyleType: 'disc' }}>
                  <li><strong>Max Sanction Limit:</strong> Rs 1.50 Crore x 60% = Rs 90 Lakh</li>
                  <li><strong>Monthly Interest Rate (r):</strong> 9.50% / 12 / 100 = 0.0079167</li>
                  <li><strong>Tenure (n):</strong> 15 years x 12 = 180 months</li>
                  <li><strong>Monthly EMI:</strong> Rs 93,975 per month</li>
                  <li><strong>Total Interest Paid:</strong> (Rs 93,975 x 180) - Rs 90 Lakh = Rs 79.15 Lakh</li>
                </ul>
              </section>

              {/* Section 3: LTV Limits Table */}
              <section id="ltv-limits-table" style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                  Loan-to-Value (LTV) Limits by Property Type in India
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 16px' }}>
                  Indian banks and Housing Finance Companies apply strict LTV caps depending on whether the collateral is self-occupied, rented out, commercial, or industrial real estate.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, marginTop: 8 }}>
                      Standard bank LTV limits and maximum borrowing parameters across property types in India.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Property Collateral Category</th>
                        <th scope="col" style={{ ...thS, textAlign: 'center' }}>Typical LTV Ratio %</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Max Sanction on Rs 1 Cr Property</th>
                        <th scope="col" style={thS}>Lender Underwriting Criteria</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { cat: 'Self-Occupied Residential House/Flat', ltv: '60% - 75%', maxLoan: 'Rs 60L - Rs 75L', notes: 'Highest LTV tier; clear clear title and OC mandatory' },
                        { cat: 'Rented Residential Property', ltv: '55% - 65%', maxLoan: 'Rs 55L - Rs 65L', notes: 'Rental income added to eligibility calculations' },
                        { cat: 'Commercial Office Space / Retail Shop', ltv: '45% - 55%', maxLoan: 'Rs 45L - Rs 55L', notes: 'Requires approved commercial land usage permit' },
                        { cat: 'Industrial Building / Factory Premises', ltv: '35% - 45%', maxLoan: 'Rs 35L - Rs 45L', notes: 'Strict technical valuation and environmental clearance' },
                        { cat: 'Vacant Residential Plot (Constructed Wall)', ltv: '30% - 40%', maxLoan: 'Rs 30L - Rs 40L', notes: 'Offered by select NBFCs; excluded by major public banks' },
                      ].map((row, i) => (
                        <tr key={row.cat} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{row.cat}</td>
                          <td style={tdC}>{row.ltv}</td>
                          <td style={{ ...tdR, color: '#166534', fontWeight: 700 }}>{row.maxLoan}</td>
                          <td style={tdL}>{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 4: Bank Interest Rates Comparison */}
              <section id="bank-rates-table" style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                  Top Indian Bank LAP Interest Rates &amp; Processing Fees
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 16px' }}>
                  Comparing interest rates, processing charges, and maximum tenure across major public sector banks, private lenders, and NBFCs helps optimize overall borrowing costs.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, marginTop: 8 }}>
                      Current LAP interest rate benchmarks and fee structures across top Indian lenders.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Lender Name</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Interest Rate Range (p.a.)</th>
                        <th scope="col" style={{ ...thS, textAlign: 'center' }}>Max Tenure</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Processing Fee</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { bank: 'State Bank of India (SBI)', rate: '9.30% - 10.45%', tenure: '15 Years', fee: '1.00% (Max Rs 50,000)' },
                        { bank: 'HDFC Bank', rate: '9.25% - 11.00%', tenure: '15 Years', fee: '1.00% or Rs 10,000 min' },
                        { bank: 'ICICI Bank', rate: '9.50% - 11.25%', tenure: '15 Years', fee: '1.00% + GST' },
                        { bank: 'Axis Bank', rate: '9.75% - 11.50%', tenure: '20 Years', fee: '1.00% (Min Rs 10,000)' },
                        { bank: 'Bajaj Housing Finance', rate: '9.50% - 12.50%', tenure: '20 Years', fee: 'Up to 1.50%' },
                        { bank: 'Bank of Baroda', rate: '9.15% - 10.65%', tenure: '15 Years', fee: '0.50% (Max Rs 25,000)' },
                        { bank: 'Punjab National Bank (PNB)', rate: '9.40% - 10.80%', tenure: '15 Years', fee: '0.90% + GST' },
                      ].map((r, i) => (
                        <tr key={r.bank} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r.bank}</td>
                          <td style={tdR}>{r.rate}</td>
                          <td style={tdC}>{r.tenure}</td>
                          <td style={tdR}>{r.fee}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 5: LAP vs Home Loan vs Personal Loan */}
              <section id="lap-vs-home-vs-personal" style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                  LAP vs Home Loan vs Personal Loan: Key Differences
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 16px' }}>
                  Understanding how LAP compares to home loans and unsecured personal loans clarifies which credit product fits your financial objective.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, marginTop: 8 }}>
                      Comparative analysis of Loan Against Property versus Home Loan and Personal Loan.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Feature / Parameter</th>
                        <th scope="col" style={thS}>Loan Against Property (LAP)</th>
                        <th scope="col" style={thS}>Home Loan</th>
                        <th scope="col" style={thS}>Personal Loan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Collateral Required', 'Existing Owned Property', 'Property Being Purchased', 'None (Unsecured)'],
                        ['Interest Rate (p.a.)', '9.15% - 12.50%', '8.35% - 9.50%', '10.50% - 24.00%'],
                        ['Max Loan Amount', 'Up to Rs 10 Cr - 25 Cr', 'Up to Rs 10 Cr', 'Up to Rs 40 Lakh - 50 Lakh'],
                        ['Max Tenure', '15 - 20 Years', '30 Years', '5 - 7 Years'],
                        ['LTV Ratio', '50% - 70% of Market Value', '80% - 90% of Cost', 'N/A (Income based)'],
                        ['End-Use Restrictions', 'None (Business/Personal)', 'Purchase/Construct Only', 'None (Personal/Business)'],
                        ['Processing Time', '10 - 21 Days (Valuation needed)', '7 - 14 Days', '24 Hours - 3 Days'],
                      ].map(([feat, lap, hl, pl], i) => (
                        <tr key={feat} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{feat}</td>
                          <td style={tdL}>{lap}</td>
                          <td style={tdL}>{hl}</td>
                          <td style={tdL}>{pl}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: 0 }}>
                  For borrowers who need high-value capital above Rs 25 Lakh for business or debt consolidation, LAP offers significantly lower EMIs than a personal loan. To verify EMI costs for unencumbered new house financing, test our <Link href="/calculators/home-loan-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Home Loan Calculator</Link> or evaluate borrowing eligibility with our <Link href="/calculators/home-loan-eligibility-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Home Loan Eligibility Calculator</Link>.
                </p>
              </section>

              {/* In-Content Promo Bar */}
              <div
                style={{
                  margin: '32px 0',
                  background: C.paleLime,
                  border: `1px solid ${C.border}`,
                  borderRadius: 12,
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: C.dark, margin: '0 0 4px', fontFamily: INTER }}>
                    Evaluating Borrowing Options Against Property Equity?
                  </p>
                  <p style={{ fontSize: 13, color: C.ink2, margin: 0, fontFamily: INTER }}>
                    Compare top-up home loans vs LAP borrowing limits with our Home Equity Calculator.
                  </p>
                </div>
                <Link className="fx-btn"
                  href="/calculators/home-equity-calculator"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    background: '#E9ECEE', border: '1px solid #D3D7DA',
                    color: '#101214',
                    padding: '10px 20px',
                    borderRadius: 8,
                    textDecoration: 'none',
                    fontFamily: INTER,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Open calculator
                </Link>
              </div>

              {/* Section 6: Tax Benefits */}
              <section id="tax-benefits-lap" style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                  Tax Treatment of Loan Against Property Under Income Tax Act
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 16px' }}>
                  Unlike home loans, which automatically offer Section 80C principal deductions and Section 24(b) interest tax relief, LAP tax deductions depend strictly on how loan proceeds are deployed.
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15, color: C.ink2, listStyleType: 'disc' }}>
                  <li>
                    <strong style={{ color: C.ink }}>Business Expense Under Section 37(1):</strong> If LAP proceeds are used for business expansion, inventory purchase, or office machinery, the entire annual interest paid can be claimed as a deductible business expense from gross turnover, reducing corporate/individual income tax liability.
                  </li>
                  <li>
                    <strong style={{ color: C.ink }}>Housing Purchase Under Section 24(b):</strong> If LAP proceeds are utilized to purchase or construct another residential house property, interest paid up to Rs 2 Lakh per fiscal year can be claimed as a tax deduction under Section 24(b) in the old tax regime.
                  </li>
                  <li>
                    <strong style={{ color: C.ink }}>Personal Use (No Tax Benefit):</strong> If LAP funds are spent on personal expenses like weddings, vacations, or debt repayment for personal loans, no income tax deduction is allowed on principal or interest payments.
                  </li>
                </ul>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: 0 }}>
                  Calculate net tax savings across regimes using our <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</Link> or evaluate rental property offsets with our <Link href="/calculators/rental-income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Rental Income Tax Calculator</Link>.
                </p>
              </section>

              {/* Section 7: Eligibility Criteria */}
              <section id="eligibility-criteria" style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                  LAP Eligibility Requirements &amp; Document List
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 16px' }}>
                  To secure a Loan Against Property, Indian banks evaluate four core qualification criteria:
                </p>
                <ol style={{ paddingLeft: 24, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: 12, listStyleType: 'decimal' }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Property Title &amp; Clear Chain:</strong> The property must be free from legal disputes, with a clear search report for 30 years and approved building plans from local municipal authorities.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Borrower Income &amp; FOIR:</strong> Banks cap total monthly debt obligations (including the new LAP EMI) at 50% to 60% of net monthly take-home income. Check debt capacity with our <Link href="/calculators/debt-to-income-ratio-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Debt-to-Income Ratio Calculator</Link>.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>CIBIL Credit Score:</strong> A credit score of 750 or higher ensures faster sanction and lower interest rates. Check score factors with our <Link href="/calculators/credit-health-score-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Credit Health Score Calculator</Link>.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Occupancy &amp; Structural Valuation:</strong> Independent bank empanelled valuers inspect the site to issue a Technical Valuation Report (TVR) that anchors the LTV sanction.
                  </li>
                </ol>
              </section>

              {/* Section 8: How to Use */}
              <section id="how-to-use" style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                  How to Use This Loan Against Property Calculator
                </h2>
                <ol style={{ paddingLeft: 24, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: 12, listStyleType: 'decimal' }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select Property Collateral Type:</strong> Choose Residential, Commercial, or Industrial property to apply typical LTV caps.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Input Property Market Valuation:</strong> Drag the slider or click the value button to enter your property market value.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set LTV % and Interest Rate:</strong> Adjust Loan-to-Value (default 60%) and expected interest rate (default 9.50% p.a.).
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select Tenure &amp; Analyze Results:</strong> Pick tenure in years (e.g. 15Y) and review your monthly EMI, total interest, donut chart split, and year-by-year amortization schedule.
                  </li>
                </ol>
              </section>

              

              {/* Section 9: FAQ */}
              <section id="faq" style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 20px', letterSpacing: '-0.02em' }}>
                  Frequently Asked Questions
                </h2>
                <FAQAccordion />
              </section>

              {/* Disclaimer */}
              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> LAP EMI and LTV calculations are indicative estimates based on standard bank parameters and reducing-balance interest formulas. Actual loan sanction amounts, interest rates, and technical property valuations depend on individual bank underwriting guidelines from lenders like State Bank of India, HDFC Bank, ICICI Bank, or Axis Bank. Consult a qualified property advocate and a CA before executing mortgage deeds.
                </p>
              </div>
            </article>
          </div>

          {/* RIGHT COLUMN: STICKY SIDEBAR */}
          <aside
            className="lap-sidebar"
            style={{
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
            <style>{`
              .lap-sidebar::-webkit-scrollbar { width: 5px; }
              .lap-sidebar::-webkit-scrollbar-track { background: transparent; }
              .lap-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
              .lap-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
            `}</style>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ flexShrink: 0 }}>
                <SidebarList
                  title="Popular Loan Tools"
                  items={[
                    { href: '/calculators/home-loan-calculator', label: 'Home Loan Calculator' },
                    { href: '/calculators/personal-loan-calculator', label: 'Personal Loan Calculator' },
                    { href: '/calculators/mortgage-calculator', label: 'Mortgage Calculator' },
                    { href: '/calculators/gold-loan-calculator', label: 'Gold Loan Calculator' },
                    { href: '/calculators/home-equity-calculator', label: 'Home Equity Calculator' },
                  ]}
                />
              </div>

              <div style={{ flexShrink: 0 }}>
                <SidebarList
                  title="More Debt &amp; Property Tools"
                  items={[
                    { href: '/calculators/home-loan-eligibility-calculator', label: 'Home Loan Eligibility' },
                    { href: '/calculators/debt-to-income-ratio-calculator', label: 'Debt-to-Income Ratio' },
                    { href: '/calculators/balance-transfer-savings-calculator', label: 'Balance Transfer Savings' },
                    { href: '/calculators/property-affordability-calculator', label: 'Property Affordability' },
                    { href: '/calculators/state-wise-stamp-duty-calculator', label: 'State-Wise Stamp Duty' },
                  ]}
                />
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: [ '/calculators/home-loan-calculator|Home Loan', '/calculators/mortgage-calculator|Mortgage', '/calculators/gold-loan-calculator|Gold Loan', '/calculators/emi-calculator|EMI Calculator', '/calculators/sip-calculator|SIP Calculator', '/calculators/fd-calculator|FD Calculator', ], },
        { hd: 'Topics', links: ['/#|Loans & Debt', '/#|Property & Real Estate', '/#|Income Tax', '/#|Mutual Funds'], },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'], },
      ])} />
    </div>
  );
}

// Sidebar list helper component
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <div style={{ padding: '14px 20px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 13.5, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div
            style={{
              padding: '12px 20px',
              borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none',
              fontSize: 13.5,
              color: C.ink2,
              transition: 'all 0.12s',
              fontFamily: INTER,
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
            {label} &rarr;
          </div>
        </Link>
      ))}
    </nav>
  );
}

// FAQ Accordion Component
function FAQAccordion() {

  const faqs = [
    {
      q: 'What is a Loan Against Property (LAP)?',
      a: 'A Loan Against Property (LAP) is a secured loan offered by banks and Housing Finance Companies (HFCs) where you pledge a fully constructed residential, commercial, or industrial property as collateral. Lenders sanction 50% to 70% of the property market value as a loan amount at lower interest rates than personal loans.',
    },
    {
      q: 'How much loan can I get against a property worth 1 Crore?',
      a: 'For a property with a market value of Rs 1 Crore, Indian banks typically sanction 50% to 65% for residential properties (Rs 50 Lakh to Rs 65 Lakh) and 40% to 50% for commercial properties (Rs 40 Lakh to Rs 50 Lakh), subject to income eligibility and FOIR limits.',
    },
    {
      q: 'What is the current Loan Against Property interest rate in India?',
      a: 'LAP interest rates in India currently range between 8.75% and 12.50% per annum for salaried individuals and self-employed borrowers, depending on lender policy, CIBIL score (750+ gets best rates), and property type.',
    },
    {
      q: 'What is the maximum tenure for a Loan Against Property?',
      a: 'The maximum tenure for LAP in India is typically 15 to 20 years (or up to age 65 for salaried borrowers and age 70 for self-employed individuals). Longer tenure lowers monthly EMI but increases overall interest costs.',
    },
    {
      q: 'How is LAP EMI calculated?',
      a: 'LAP EMI is calculated using the reducing-balance formula: EMI = [P x r x (1+r)^n] / [(1+r)^n - 1], where P is principal loan amount, r is monthly interest rate, and n is tenure in months.',
    },
    {
      q: 'Is tax benefit available on Loan Against Property?',
      a: 'Tax benefit on LAP depends on end-use. If LAP proceeds are used for business expansion, interest paid can be claimed as a business expense under Section 37(1). If used to purchase or construct another residential house, interest up to Rs 2 Lakh can be claimed under Section 24(b). No tax benefit applies if used for personal expenses.',
    },
    {
      q: 'What property documents are required for LAP?',
      a: 'Key property documents include original title deed, approved building plan, occupancy certificate (OC), possession letter, latest property tax receipts, and NOC from the housing society or authority.',
    },
    {
      q: 'What is the difference between Home Loan and Loan Against Property?',
      a: 'A home loan is taken to buy or construct a new house (LTV up to 80-90%, lower interest rates, 30-year tenure). A Loan Against Property pledges an existing owned property to raise funds for any end-use (LTV 50-70%, slightly higher interest, 15-20 year tenure).',
    },
    {
      q: 'Can I get LAP on a plot of land or vacant land?',
      a: 'Most major banks do not offer LAP on vacant agricultural or unapproved residential plots. LAPs are primarily offered on fully constructed residential houses, apartments, office spaces, and commercial shops with clear title deeds.',
    },
    {
      q: 'What CIBIL score is required for Loan Against Property?',
      a: 'A CIBIL score of 750 or above is ideal for LAP approval at competitive interest rates starting around 8.75% to 9.50%. Scores between 650 and 749 may still qualify but at higher interest rates (10.5% to 13%).',
    },
    {
      q: 'What is the processing fee for LAP in India?',
      a: 'Processing fees for LAP generally range between 0.50% and 1.50% of the loan amount, plus applicable GST (18%). Some banks cap processing fees at Rs 25,000 to Rs 50,000.',
    },
    {
      q: 'What is Fermor?',
      a: 'Fermor is a financial platform for India. All calculators are free to use, and a free account is available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.',
    },
  ];

  return <FAQBox items={faqs} />;
}

// Waitlist Card Component
function WaitlistCard({ mobile }: { mobile: boolean }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    try {
      if (localStorage.getItem('fermor-waitlist-joined')) {
        setStatus('success');
      }
    } catch {
      /* ignore */
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'loan-against-property-calculator' }),
      });
      if (res.ok) {
        localStorage.setItem('fermor-waitlist-joined', '1');
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div
      style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        padding: mobile ? '20px 16px' : '24px 28px',
        marginBottom: 36,
        boxShadow: '0 1px 12px rgba(16,18,20,0.04)',
      }}
    >
      <p style={{ color: C.ink, fontWeight: 600, fontSize: 14, margin: '0 0 4px', fontFamily: INTER }}>Save your results</p>
      <p style={{ color: C.ink3, fontSize: 13, margin: '0 0 14px', lineHeight: 1.6, fontFamily: INTER }}>
        Sign up to save this calculation and access your results any time.
      </p>

      {status === 'success' ? (
        <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', color: C.dark, fontSize: 13, fontWeight: 600 }}>
          ✓ Your calculation was saved to your Fermor account.
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, flexDirection: mobile ? 'column' : 'row' }}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            aria-label="Enter your email to save calculation"
            required
            style={{
              flex: 1,
              padding: '10px 14px',
              fontSize: 13.5,
              borderRadius: 8,
              border: `1px solid ${C.border}`,
              background: C.white,
              color: C.ink,
              outline: 'none',
              fontFamily: INTER,
            }}
          />
          <button className="fx-btn"
            type="submit"
            disabled={status === 'loading'}
            style={{
              padding: '10px 20px',
              fontSize: 13.5,
              fontWeight: 700,
              borderRadius: 8,
              border: '1px solid #D3D7DA',
              background: '#E9ECEE',
              color: '#101214',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontFamily: INTER,
            }}
          >
            {status === 'loading' ? 'Saving...' : 'Sign up free'}
          </button>
        </form>
      )}
    </div>
  );
}

'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import React, { useState, useEffect, useLayoutEffect, useMemo } from 'react';
import Link from 'next/link';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
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
function DonutChart({ taxPaid, totalInterest }: { taxPaid: number; totalInterest: number }) {
  const total = taxPaid + totalInterest;
  if (total === 0) return null;
  const R = 75, sw = 18, cx = 100, cy = 100;
  const circ = 2 * Math.PI * R;
  const paidArc = (taxPaid / total) * circ;
  const paidPct = Math.round((taxPaid / total) * 100);

  return (
    <svg width="200" height="200" viewBox="0 0 200 200" role="img" aria-label={`Tax paid ${paidPct}% of total, interest penalty ${100 - paidPct}%`}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle
        cx={cx}
        cy={cy}
        r={R}
        fill="none"
        stroke={CHART_PAIR.primary}
        strokeWidth={sw}
        strokeDasharray={`${paidArc} ${circ - paidArc}`}
        strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }}
      />
      <text x={cx} y={cy - 6} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Tax Paid Share</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 26, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{paidPct}%</text>
    </svg>
  );
}

// Stacked Bar Chart Component for Quarterly Installments
function InstallmentBarChart({ schedule }: { schedule: { name: string; required: number; paid: number }[] }) {
  if (!schedule || schedule.length === 0) return null;
  const maxVal = Math.max(...schedule.map(s => Math.max(s.required, s.paid)));

  return (
    <div style={{ margin: '20px 0', padding: '16px', background: '#fafafa', border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: C.ink, margin: '0 0 12px', fontFamily: INTER }}>
        Quarterly Advance Tax Paid vs Required Threshold
      </p>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, fontSize: 12, color: C.ink2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 12, height: 12, background: C.dark, borderRadius: 3, display: 'inline-block' }} />
          <span>Cumulative Tax Paid</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 12, height: 12, background: C.lime2, borderRadius: 3, display: 'inline-block' }} />
          <span>Required Target</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, height: 150, padding: '10px 0 0' }}>
        {schedule.map(s => {
          const paidPct = maxVal > 0 ? (s.paid / maxVal) * 100 : 0;
          const reqPct = maxVal > 0 ? (s.required / maxVal) * 100 : 0;
          return (
            <div key={s.name} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
              <div style={{ width: '100%', display: 'flex', gap: 4, alignItems: 'flex-end', height: '100%' }}>
                <div style={{ flex: 1, height: `${paidPct}%`, background: C.dark, borderRadius: '4px 4px 0 0', transition: 'height 0.3s' }} title={`${s.name} Paid: Rs ${s.paid.toLocaleString('en-IN')}`} />
                <div style={{ flex: 1, height: `${reqPct}%`, background: C.lime2, borderRadius: '4px 4px 0 0', transition: 'height 0.3s' }} title={`${s.name} Required: Rs ${s.required.toLocaleString('en-IN')}`} />
              </div>
              <span style={{ fontSize: 11, color: C.ink3, marginTop: 6, fontWeight: 600 }}>{s.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Default Settings ───────────────────────────────────────── */
const defaultSettings = {
  regime: 'regular', // 'regular' | 'presumptive'
  isSeniorCitizen: false,
  estimatedTax: 200000,
  tdsCredits: 50000,
  paidQ1: 22500, // 15% by 15 June
  paidQ2: 45000, // 30% by 15 Sept
  paidQ3: 45000, // 30% by 15 Dec
  paidQ4: 37500, // 25% by 15 March
  showPaidInputs: false,
  showSchedule: false,
};

export default function AdvanceTaxClient() {
  const [mobile, setMobile] = useState<boolean>(false);
  useLayoutEffect(() => {
    const check = () => setMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { settings, updateSettings } = useCalculatorSettings('advance-tax-calculator', defaultSettings);
  const { formatCurrency } = useCurrency();

  const {
    regime,
    isSeniorCitizen,
    estimatedTax,
    tdsCredits,
    paidQ1,
    paidQ2,
    paidQ3,
    paidQ4,
    showPaidInputs,
    showSchedule,
  } = settings;

  const setRegime = (v: string) => updateSettings({ regime: v });
  const setIsSeniorCitizen = (v: boolean) => updateSettings({ isSeniorCitizen: v });
  const setEstimatedTax = (v: number) => updateSettings({ estimatedTax: v });
  const setTdsCredits = (v: number) => updateSettings({ tdsCredits: v });
  const setPaidQ1 = (v: number) => updateSettings({ paidQ1: v });
  const setPaidQ2 = (v: number) => updateSettings({ paidQ2: v });
  const setPaidQ3 = (v: number) => updateSettings({ paidQ3: v });
  const setPaidQ4 = (v: number) => updateSettings({ paidQ4: v });
  const setShowPaidInputs = (v: boolean) => updateSettings({ showPaidInputs: v });
  const setShowSchedule = (v: boolean) => updateSettings({ showSchedule: v });

  // Core Math
  const netAdvanceTaxLiability = Math.max(0, estimatedTax - tdsCredits);
  const isExempt = netAdvanceTaxLiability < 10000 || isSeniorCitizen;

  // Quarterly Required Amounts (Section 211)
  const q1Req = isExempt ? 0 : regime === 'presumptive' ? 0 : Math.round(netAdvanceTaxLiability * 0.15);
  const q2Req = isExempt ? 0 : regime === 'presumptive' ? 0 : Math.round(netAdvanceTaxLiability * 0.45);
  const q3Req = isExempt ? 0 : regime === 'presumptive' ? 0 : Math.round(netAdvanceTaxLiability * 0.75);
  const q4Req = isExempt ? 0 : Math.round(netAdvanceTaxLiability * 1.00);

  // Cumulative Paid Amounts
  const cumPaidQ1 = paidQ1;
  const cumPaidQ2 = paidQ1 + paidQ2;
  const cumPaidQ3 = paidQ1 + paidQ2 + paidQ3;
  const cumPaidQ4 = paidQ1 + paidQ2 + paidQ3 + paidQ4;

  // Section 234C Interest Calculation (Quarterly Deferment)
  const safeHarborQ1 = Math.round(netAdvanceTaxLiability * 0.12);
  const safeHarborQ2 = Math.round(netAdvanceTaxLiability * 0.36);

  const sfQ1 = !isExempt && regime === 'regular' && cumPaidQ1 < safeHarborQ1 ? q1Req - cumPaidQ1 : 0;
  const int234c_Q1 = sfQ1 > 0 ? Math.round(sfQ1 * 0.01 * 3) : 0;

  const sfQ2 = !isExempt && regime === 'regular' && cumPaidQ2 < safeHarborQ2 ? q2Req - cumPaidQ2 : 0;
  const int234c_Q2 = sfQ2 > 0 ? Math.round(sfQ2 * 0.01 * 3) : 0;

  const sfQ3 = !isExempt && regime === 'regular' && cumPaidQ3 < q3Req ? q3Req - cumPaidQ3 : 0;
  const int234c_Q3 = sfQ3 > 0 ? Math.round(sfQ3 * 0.01 * 3) : 0;

  const sfQ4 = !isExempt && cumPaidQ4 < q4Req ? q4Req - cumPaidQ4 : 0;
  const int234c_Q4 = sfQ4 > 0 ? Math.round(sfQ4 * 0.01 * 1) : 0;

  const totalInt234C = int234c_Q1 + int234c_Q2 + int234c_Q3 + int234c_Q4;

  // Section 234B Interest Calculation (Default < 90% paid before 31st March)
  const req90Pct = Math.round(netAdvanceTaxLiability * 0.90);
  const is234BApplicable = !isExempt && cumPaidQ4 < req90Pct;
  const shortfall234B = is234BApplicable ? netAdvanceTaxLiability - cumPaidQ4 : 0;
  const months234B = 4; // April to July (Standard 4 months)
  const totalInt234B = is234BApplicable ? Math.round(shortfall234B * 0.01 * months234B) : 0;

  const totalInterestPenalty = totalInt234C + totalInt234B;

  const chartSchedule = [
    { name: '15 Jun (Q1)', required: q1Req, paid: cumPaidQ1 },
    { name: '15 Sep (Q2)', required: q2Req, paid: cumPaidQ2 },
    { name: '15 Dec (Q3)', required: q3Req, paid: cumPaidQ3 },
    { name: '15 Mar (Q4)', required: q4Req, paid: cumPaidQ4 },
  ];

  return (
    <div style={{ minHeight: '100vh', background: C.bg, fontFamily: INTER, paddingBottom: 60 }}>
      {/* NAVIGATION */}
      <PageNav />

      {/* MAIN CONTAINER 1280 */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        {/* PAGE HEADER */}
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
            Advance Tax Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800, lineHeight: 1.6 }}>
            Calculate quarterly advance tax installment due dates (15%, 45%, 75%, 100%), TDS credits, Section 234C deferment interest, and Section 234B shortfall penalties for FY 2025-26 &amp; FY 2026-27.
          </p>
        </header>

        {/* 2-COLUMN PAGE GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          {/* LEFT COLUMN */}
          <div style={{ minWidth: 0 }}>
            {/* CALCULATOR WIDGET CARD */}
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
              {/* Tab Strip inside card */}
              <div role="tablist" aria-label="Tax Scheme" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                {[
                  { id: 'regular', label: 'Regular Taxpayer (4 Installments)' },
                  { id: 'presumptive', label: 'Presumptive Scheme Sec 44AD/44ADA' },
                ].map(t => (
                  <button
                    key={t.id}
                    id={`tab-${t.id}`}
                    role="tab"
                    aria-selected={regime === t.id}
                    aria-controls={`panel-${t.id}`}
                    onClick={() => setRegime(t.id)}
                    style={{
                      flex: 1,
                      padding: mobile ? '13px 8px' : '15px 20px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: mobile ? 12.5 : 13.5,
                      fontWeight: regime === t.id ? 700 : 400,
                      color: regime === t.id ? C.dark : C.ink3,
                      borderBottom: regime === t.id ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                      transition: 'all 0.15s',
                      fontFamily: INTER,
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* 1fr 1fr Grid inside Card */}
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                {/* LEFT: INPUT PANEL (Colorless) */}
                <div
                  role="tabpanel"
                  id={`panel-${regime}`}
                  style={{
                    padding: mobile ? '20px 18px' : '36px 36px',
                    borderRight: mobile ? 'none' : `1px solid ${C.border}`,
                    borderBottom: mobile ? `1px solid ${C.border}` : 'none',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {showPaidInputs ? 'Challan Paid Inputs' : 'Tax Details'}
                    </span>
                    <CurrencySelector theme="light" />
                  </div>

                  {!showPaidInputs ? (
                    <>
                      {/* Senior Citizen Checkbox Toggle */}
                      <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <input
                          type="checkbox"
                          id="senior-citizen-check"
                          checked={isSeniorCitizen}
                          onChange={e => setIsSeniorCitizen(e.target.checked)}
                          style={{ width: 18, height: 18, accentColor: C.dark, cursor: 'pointer' }}
                        />
                        <label htmlFor="senior-citizen-check" style={{ fontSize: 13.5, color: C.ink2, cursor: 'pointer', fontFamily: INTER }}>
                          Senior Citizen (60+ yrs without business income)
                        </label>
                      </div>

                      <Slider
                        id="est-tax"
                        label="Estimated Gross Income Tax Payable"
                        value={estimatedTax}
                        min={0}
                        max={10000000}
                        step={10000}
                        fmt={formatCurrency}
                        onChange={setEstimatedTax}
                        compact={mobile}
                      />

                      <Slider
                        id="tds-credits"
                        label="Total TDS / TCS Credits Deducted"
                        value={tdsCredits}
                        min={0}
                        max={estimatedTax}
                        step={5000}
                        fmt={formatCurrency}
                        onChange={setTdsCredits}
                        compact={mobile}
                      />

                      {/* Derived Net Tax Liability Neutral Info Box */}
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '12px 14px', marginBottom: 24 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 13, color: C.ink2 }}>Net Advance Tax Liability:</span>
                          <strong style={{ fontSize: 14, color: C.ink }}>{formatCurrency(netAdvanceTaxLiability)}</strong>
                        </div>
                        {isExempt && (
                          <div style={{ marginTop: 6, fontSize: 12, color: '#166534', fontWeight: 600 }}>
                            {netAdvanceTaxLiability < 10000
                              ? '✓ Net tax liability is under Rs 10,000. Advance Tax is not applicable.'
                              : '✓ Exempt as Senior Citizen without business income.'}
                          </div>
                        )}
                      </div>

                      {/* Enter Paid Challans Button (Bottom-Right) */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          onClick={() => setShowPaidInputs(true)}
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
                          <span>Enter actual paid challans &amp; check interest</span>
                          <span aria-hidden="true">&rarr;</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Slider
                        id="q1-paid"
                        label="Q1 Paid by 15 June"
                        value={paidQ1}
                        min={0}
                        max={netAdvanceTaxLiability}
                        step={5000}
                        fmt={formatCurrency}
                        onChange={setPaidQ1}
                        compact={mobile}
                      />
                      <Slider
                        id="q2-paid"
                        label="Q2 Paid by 15 Sept"
                        value={paidQ2}
                        min={0}
                        max={netAdvanceTaxLiability}
                        step={5000}
                        fmt={formatCurrency}
                        onChange={setPaidQ2}
                        compact={mobile}
                      />
                      <Slider
                        id="q3-paid"
                        label="Q3 Paid by 15 Dec"
                        value={paidQ3}
                        min={0}
                        max={netAdvanceTaxLiability}
                        step={5000}
                        fmt={formatCurrency}
                        onChange={setPaidQ3}
                        compact={mobile}
                      />
                      <Slider
                        id="q4-paid"
                        label="Q4 Paid by 15 March"
                        value={paidQ4}
                        min={0}
                        max={netAdvanceTaxLiability}
                        step={5000}
                        fmt={formatCurrency}
                        onChange={setPaidQ4}
                        compact={mobile}
                      />

                      {/* Back Button (Bottom-Left) */}
                      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 12 }}>
                        <button
                          type="button"
                          onClick={() => setShowPaidInputs(false)}
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
                    <DonutChart taxPaid={cumPaidQ4} totalInterest={totalInterestPenalty} />
                  </div>

                  {/* Legend (order: -1 on desktop, 2 on mobile) */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 20, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Advance Tax Paid</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Interest / Pending</span>
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
                        Net Advance Tax Due
                      </div>
                      <div style={{ fontSize: 12, color: '#7A8087' }}>
                        Sec 234B/234C Interest
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                      <span
                        aria-live="polite"
                        aria-label={`Net advance tax due: ${formatCurrency(netAdvanceTaxLiability)}`}
                        style={{ fontSize: mobile ? 24 : 28, fontWeight: 800, color: '#1F7A58', lineHeight: 1, letterSpacing: '-0.02em' }}
                      >
                        {formatCurrency(netAdvanceTaxLiability)}
                      </span>
                      <span style={{ fontSize: 15, fontWeight: 700, color: totalInterestPenalty > 0 ? '#FCA5A5' : C.lime, lineHeight: 1 }}>
                        {formatCurrency(totalInterestPenalty)}
                      </span>
                    </div>
                  </div>

                  {/* Breakdown Stat Rows */}
                  {[
                    { label: 'Estimated Gross Tax', value: formatCurrency(estimatedTax) },
                    { label: 'Less: TDS / TCS Credits', value: `- ${formatCurrency(tdsCredits)}` },
                    { label: 'Total Advance Tax Paid', value: formatCurrency(cumPaidQ4) },
                    { label: 'Sec 234C Deferment Interest', value: formatCurrency(totalInt234C) },
                    { label: 'Sec 234B Shortfall Interest', value: formatCurrency(totalInt234B) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '12px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 600, color: C.ink }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLLAPSIBLE QUARTERLY SCHEDULE */}
              <div style={{ borderTop: `1px solid ${C.border}`, padding: mobile ? 18 : 24 }}>
                <button
                  type="button"
                  aria-expanded={showSchedule}
                  aria-controls="advance-tax-schedule-panel"
                  onClick={() => setShowSchedule(!showSchedule)}
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
                  <span>{showSchedule ? '▲ Hide' : '▼ View'} Quarterly Due Dates Schedule &amp; Section 234C Chart</span>
                </button>

                {showSchedule && (
                  <div id="advance-tax-schedule-panel" style={{ marginTop: 16 }}>
                    <InstallmentBarChart schedule={chartSchedule} />

                    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, marginTop: 8 }}>
                          Quarterly advance tax due dates, mandatory threshold percentages, and Section 234C interest penalties.
                        </caption>
                        <thead>
                          <tr>
                            <th scope="col" style={thS}>Installment Due Date</th>
                            <th scope="col" style={{ ...thS, textAlign: 'center' }}>Required %</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' }}>Target Amount</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' }}>Cum. Paid</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' }}>Shortfall</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' }}>Sec 234C Interest</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { name: '15th June (Q1)', reqPct: '15%', target: q1Req, paid: cumPaidQ1, sf: sfQ1, int: int234c_Q1 },
                            { name: '15th September (Q2)', reqPct: '45%', target: q2Req, paid: cumPaidQ2, sf: sfQ2, int: int234c_Q2 },
                            { name: '15th December (Q3)', reqPct: '75%', target: q3Req, paid: cumPaidQ3, sf: sfQ3, int: int234c_Q3 },
                            { name: '15th March (Q4)', reqPct: '100%', target: q4Req, paid: cumPaidQ4, sf: sfQ4, int: int234c_Q4 },
                          ].map((row, idx) => (
                            <tr key={row.name} style={{ background: idx % 2 === 0 ? C.white : '#fafafa' }}>
                              <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{row.name}</td>
                              <td style={tdC}>{row.reqPct}</td>
                              <td style={tdR}>{formatCurrency(row.target)}</td>
                              <td style={tdR}>{formatCurrency(row.paid)}</td>
                              <td style={{ ...tdR, color: row.sf > 0 ? '#B45309' : C.ink }}>{formatCurrency(row.sf)}</td>
                              <td style={{ ...tdR, color: row.int > 0 ? '#B45309' : C.ink, fontWeight: row.int > 0 ? 700 : 500 }}>
                                {formatCurrency(row.int)}
                              </td>
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

            

            {/* ARTICLE SECTION */}
            <article itemScope itemType="https://schema.org/Article" style={{ minWidth: 0 }}>
              {/* Section 1: What is Advance Tax */}
              <section id="what-is-advance-tax" style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                  What Is Advance Tax in India?
                </h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Advance tax is income tax paid in quarterly installments during the financial year in which income is earned, rather than as a lump sum payment at the time of filing the Income Tax Return (ITR).
                  </p>
                </div>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 16px' }}>
                  Under Section 208 of the Income Tax Act 1961, per official regulations from the <a href="https://incometaxindia.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Department of India</a>, every taxpayer whose estimated net tax liability for the year (after deducting TDS and TCS) is Rs 10,000 or more must pay advance tax.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: 0 }}>
                  Resident senior citizens aged 60 years or above who do not have any income from business or profession are fully exempt from paying advance tax under Section 207.
                </p>
              </section>

              {/* Section 2: Due Dates Table */}
              <section id="due-dates-table" style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                  Quarterly Advance Tax Due Dates &amp; Mandatory Thresholds
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 16px' }}>
                  Under Section 211 of the Income Tax Act, advance tax must be remitted across four quarterly installments for regular taxpayers, or in a single installment for presumptive taxpayers.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, marginTop: 8 }}>
                      Quarterly due dates, mandatory percentage targets, and safe harbor thresholds under Section 211.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Installment Due Date</th>
                        <th scope="col" style={{ ...thS, textAlign: 'center' }}>Mandatory Cum. % Target</th>
                        <th scope="col" style={{ ...thS, textAlign: 'center' }}>Safe Harbor Threshold %</th>
                        <th scope="col" style={thS}>Applicability &amp; Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { date: '15th June', target: '15% of Net Tax', safe: '12% of Net Tax', notes: 'First quarter installment; 234C interest waived if 12% paid' },
                        { date: '15th September', target: '45% of Net Tax', safe: '36% of Net Tax', notes: 'Second quarter cumulative; 234C interest waived if 36% paid' },
                        { date: '15th December', target: '75% of Net Tax', safe: '75% of Net Tax', notes: 'Third quarter cumulative target' },
                        { date: '15th March', target: '100% of Net Tax', safe: '100% of Net Tax', notes: 'Final quarter cumulative target (100% for Sec 44AD/44ADA)' },
                      ].map((row, idx) => (
                        <tr key={row.date} style={{ background: idx % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{row.date}</td>
                          <td style={tdC}>{row.target}</td>
                          <td style={{ ...tdC, color: '#166534', fontWeight: 600 }}>{row.safe}</td>
                          <td style={tdL}>{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 3: Section 234C Interest Formula */}
              <section id="section-234c-formula" style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                  Section 234C Deferment Interest Formula
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 16px' }}>
                  Section 234C levies simple interest at 1% per month for deferment of quarterly advance tax installments.
                </p>
                <div style={{ background: '#f8f9f9', border: `1px solid ${C.border}`, borderRadius: 10, padding: 18, marginBottom: 20 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: C.ink, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Section 234C Deferment Interest Formula
                  </p>
                  <div style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark, fontWeight: 700, padding: '8px 12px', background: C.white, border: `1px solid ${C.border}`, borderRadius: 6 }}>
                    Interest = Shortfall Amount x 1% x Months (3 Months for Q1-Q3, 1 Month for Q4)
                  </div>
                  <p style={{ fontSize: 12, color: C.ink3, margin: '10px 0 0' }}>
                    Where Shortfall = Mandatory Target % of Net Tax minus Cumulative Advance Tax Paid by the due date.
                  </p>
                </div>
              </section>

              {/* Section 4: Section 234B Interest Formula */}
              <section id="section-234b-formula" style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                  Section 234B Default Interest Formula
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 16px' }}>
                  Section 234B charges simple interest at 1% per month if total advance tax paid before 31st March is less than 90% of assessed net tax liability.
                </p>
                <div style={{ background: '#f8f9f9', border: `1px solid ${C.border}`, borderRadius: 10, padding: 18, marginBottom: 20 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: C.ink, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Section 234B Default Interest Formula
                  </p>
                  <div style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark, fontWeight: 700, padding: '8px 12px', background: C.white, border: `1px solid ${C.border}`, borderRadius: 6 }}>
                    Section 234B Interest = (Assessed Tax - Advance Tax Paid) x 1% x Number of Months
                  </div>
                  <p style={{ fontSize: 12, color: C.ink3, margin: '10px 0 0' }}>
                    Calculated from 1st April of the assessment year until the date of ITR filing or self-assessment tax payment.
                  </p>
                </div>
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
                    Estimating Annual Income Tax Liability?
                  </p>
                  <p style={{ fontSize: 13, color: C.ink2, margin: 0, fontFamily: INTER }}>
                    Compare New vs Old Tax Regime slabs and calculate gross tax payable with our Income Tax Calculator.
                  </p>
                </div>
                <Link className="fx-btn"
                  href="/calculators/income-tax-calculator"
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
                  Open Income Tax calculator
                </Link>
              </div>

              {/* Section 5: Taxpayers Comparison */}
              <section id="taxpayers-comparison" style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                  Salaried vs Freelancer vs Presumptive Taxpayers
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 16px' }}>
                  Advance tax rules apply differently depending on your employment type and tax scheme:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15, color: C.ink2, listStyleType: 'disc' }}>
                  <li>
                    <strong style={{ color: C.ink }}>Salaried Employees:</strong> If employer deducts 100% TDS on salary, no advance tax is needed. However, if interest, rental, or stock market gains create tax due over Rs 10,000, advance tax must be paid.
                  </li>
                  <li>
                    <strong style={{ color: C.ink }}>Freelancers &amp; Professionals:</strong> Must estimate net income and pay advance tax in 4 quarterly installments (15%, 45%, 75%, 100%).
                  </li>
                  <li>
                    <strong style={{ color: C.ink }}>Presumptive Taxation (Sec 44AD / 44ADA):</strong> Small businesses and professionals under presumptive schemes can pay 100% of advance tax in a single installment on or before 15th March.
                  </li>
                </ul>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: 0 }}>
                  Calculate rental tax offsets with our <Link href="/calculators/rental-income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Rental Income Tax Calculator</Link> or estimate property transaction tax with our <Link href="/calculators/property-tax-estimator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Property Tax Estimator</Link>.
                </p>
              </section>

              {/* Section 6: How to Use */}
              <section id="how-to-use" style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                  How to Use This Advance Tax Calculator
                </h2>
                <ol style={{ paddingLeft: 24, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: 12, listStyleType: 'decimal' }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select Tax Regime Type:</strong> Choose Regular Taxpayer or Presumptive Scheme (Section 44AD/44ADA).
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Input Estimated Tax &amp; TDS:</strong> Enter gross estimated tax liability and subtract total TDS/TCS credits.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Input Paid Challans &amp; Analyze:</strong> Enter actual paid amounts across Q1-Q4 to calculate Section 234C and 234B interest penalties.
                  </li>
                </ol>
              </section>

              

              {/* FAQ SECTION */}
              <section id="faq" style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 20px', letterSpacing: '-0.02em' }}>
                  Frequently Asked Questions
                </h2>
                <FAQAccordion />
              </section>

              {/* Disclaimer */}
              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> Advance tax calculations and Section 234B/234C interest estimates are for guidance based on the Income Tax Act 1961. Final tax liability and interest charges depend on actual Income Tax Department assessment and Form 26AS verification. Consult a qualified Chartered Accountant before submitting Challan 280 tax payments.
                </p>
              </div>
            </article>
          </div>

          {/* RIGHT COLUMN: STICKY SIDEBAR */}
          <aside
            className="advance-tax-sidebar"
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
              .advance-tax-sidebar::-webkit-scrollbar { width: 5px; }
              .advance-tax-sidebar::-webkit-scrollbar-track { background: transparent; }
              .advance-tax-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
              .advance-tax-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
            `}</style>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ flexShrink: 0 }}>
                <SidebarList
                  title="Popular Tax Calculators"
                  items={[
                    { href: '/calculators/income-tax-calculator', label: 'Income Tax Calculator' },
                    { href: '/calculators/rental-income-tax-calculator', label: 'Rental Income Tax' },
                    { href: '/calculators/property-tax-estimator', label: 'Property Tax Estimator' },
                    { href: '/calculators/cagr-calculator', label: 'Capital Gains CAGR' },
                    { href: '/calculators/sip-vs-lumpsum-calculator', label: 'SIP vs Lumpsum' },
                  ]}
                />
              </div>

              <div style={{ flexShrink: 0 }}>
                <SidebarList
                  title="More Loan &amp; Wealth Tools"
                  items={[
                    { href: '/calculators/home-loan-calculator', label: 'Home Loan Calculator' },
                    { href: '/calculators/loan-against-property-calculator', label: 'Loan Against Property' },
                    { href: '/calculators/sip-calculator', label: 'SIP Calculator' },
                    { href: '/calculators/fd-calculator', label: 'FD Calculator' },
                    { href: '/calculators/debt-to-income-ratio-calculator', label: 'Debt-to-Income Ratio' },
                  ]}
                />
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: [ '/calculators/advance-tax-calculator|Advance Tax', '/calculators/income-tax-calculator|Income Tax', '/calculators/rental-income-tax-calculator|Rental Tax', '/calculators/sip-vs-lumpsum-calculator|SIP vs Lumpsum', '/calculators/home-loan-calculator|Home Loan', '/calculators/fd-calculator|FD Calculator', ], },
        { hd: 'Topics', links: ['/#|Income Tax', '/#|Investing & Wealth', '/#|Loans & Debt', '/#|Property & Real Estate'], },
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
      q: 'Who is liable to pay Advance Tax in India?',
      a: 'Under Section 208 of the Income Tax Act, any taxpayer (salaried, self-employed, freelancer, business, or company) whose estimated net tax liability for the financial year after deducting TDS/TCS is Rs 10,000 or more must pay advance tax.',
    },
    {
      q: 'What are the quarterly advance tax due dates and percentage limits?',
      a: 'Advance tax must be paid in 4 quarterly installments: 15% of estimated tax by 15th June, 45% cumulative by 15th September, 75% cumulative by 15th December, and 100% cumulative by 15th March. Taxpayers under presumptive scheme Section 44AD/44ADA pay 100% in a single installment by 15th March.',
    },
    {
      q: 'How is Section 234C interest penalty calculated?',
      a: 'Section 234C levies simple interest at 1% per month for deferment of quarterly installments. Interest is charged on the shortfall between the required mandatory percentage and actual tax paid for 3 months each for Q1, Q2, and Q3, and for 1 month for Q4. No 234C interest applies if payment reaches 12% by June 15 or 36% by September 15.',
    },
    {
      q: 'How is Section 234B interest penalty calculated?',
      a: 'Section 234B charges 1% per month simple interest if total advance tax paid before 31st March is less than 90% of assessed net tax liability. Interest is calculated from 1st April of the assessment year until the date of actual tax payment or ITR filing.',
    },
    {
      q: 'Are senior citizens exempt from advance tax?',
      a: 'Yes. Resident senior citizens aged 60 years or above who do not have any income from business or profession are fully exempt from paying advance tax.',
    },
    {
      q: 'Do salaried employees need to pay advance tax?',
      a: 'Salaried employees generally do not need to pay advance tax if their employer deducts full TDS under Section 192. However, if a salaried employee has extra income from interest, capital gains, dividend, or rental income where TDS was not deducted, and net tax liability exceeds Rs 10,000, advance tax must be paid.',
    },
    {
      q: 'How to pay advance tax online?',
      a: 'Advance tax can be paid online through the Income Tax e-filing portal (e-Pay Tax service) or net banking using Challan 280 (Minor Head 100: Advance Tax) under Assessment Year 2026-27 or FY 2025-26.',
    },
    {
      q: 'What happens if capital gains occur after advance tax due dates?',
      a: 'If unexpected capital gains or dividend income arise after the 15th June or 15th September due dates, no Section 234C interest penalty applies provided the taxpayer pays full advance tax on such capital gains in the remaining subsequent installments or by 31st March.',
    },
    {
      q: 'Is advance tax paid credited during ITR filing?',
      a: 'Yes. Advance tax payments reflect in Form 26AS and Annual Information Statement (AIS). During ITR filing, total advance tax paid is deducted from gross tax payable.',
    },
    {
      q: 'Can advance tax be paid after 15th March?',
      a: 'Any tax paid on or before 31st March of the financial year is treated as advance tax. Payments made after 31st March are treated as self-assessment tax under Section 140A.',
    },
    {
      q: 'What is the penalty for not paying advance tax at all?',
      a: 'Failing to pay advance tax attracts interest under Section 234B (1% per month for overall shortfall under 90%) and Section 234C (1% per month for quarterly deferments), adding 3% to 12% in extra interest cost upon filing ITR.',
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
        body: JSON.stringify({ email, source: 'advance-tax-calculator' }),
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

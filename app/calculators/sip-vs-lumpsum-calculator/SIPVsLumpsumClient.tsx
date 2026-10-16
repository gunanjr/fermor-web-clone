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
function DonutChart({ sipCorpus, lumpsumCorpus }: { sipCorpus: number; lumpsumCorpus: number }) {
  const total = sipCorpus + lumpsumCorpus;
  if (total === 0) return null;
  const R = 75, sw = 18, cx = 100, cy = 100;
  const circ = 2 * Math.PI * R;
  const sipArc = (sipCorpus / total) * circ;
  const sipPct = Math.round((sipCorpus / total) * 100);

  return (
    <svg width="200" height="200" viewBox="0 0 200 200" role="img" aria-label={`SIP share ${sipPct}% vs Lumpsum share ${100 - sipPct}%`}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle
        cx={cx}
        cy={cy}
        r={R}
        fill="none"
        stroke={CHART_PAIR.primary}
        strokeWidth={sw}
        strokeDasharray={`${sipArc} ${circ - sipArc}`}
        strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }}
      />
      <text x={cx} y={cy - 6} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>SIP Corpus Share</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 26, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{sipPct}%</text>
    </svg>
  );
}

// Year-wise schedule calculation
interface YearRow {
  year: number;
  sipInvested: number;
  sipCorpus: number;
  sipGain: number;
  lumpsumInvested: number;
  lumpsumCorpus: number;
  lumpsumGain: number;
}

function calculateComparisonSchedule(
  monthlySip: number,
  lumpsumAmount: number,
  annualRate: number,
  years: number
): YearRow[] {
  const i = annualRate / 12 / 100;
  const schedule: YearRow[] = [];

  for (let y = 1; y <= years; y++) {
    const months = y * 12;
    // SIP FV formula
    const sipCorpus = monthlySip > 0 && i > 0
      ? Math.round(monthlySip * (((Math.pow(1 + i, months) - 1) / i) * (1 + i)))
      : monthlySip * months;
    const sipInvested = Math.round(monthlySip * months);
    const sipGain = Math.max(0, sipCorpus - sipInvested);

    // Lumpsum FV formula
    const lumpsumCorpus = Math.round(lumpsumAmount * Math.pow(1 + annualRate / 100, y));
    const lumpsumInvested = Math.round(lumpsumAmount);
    const lumpsumGain = Math.max(0, lumpsumCorpus - lumpsumInvested);

    schedule.push({
      year: y,
      sipInvested,
      sipCorpus,
      sipGain,
      lumpsumInvested,
      lumpsumCorpus,
      lumpsumGain,
    });
  }

  return schedule;
}

// Stacked Bar Chart Component
function ComparisonBarChart({ schedule }: { schedule: YearRow[] }) {
  if (!schedule || schedule.length === 0) return null;
  const maxCorpus = Math.max(...schedule.map(s => Math.max(s.sipCorpus, s.lumpsumCorpus)));

  return (
    <div style={{ margin: '20px 0', padding: '16px', background: '#fafafa', border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: C.ink, margin: '0 0 12px', fontFamily: INTER }}>
        Annual Corpus Growth (SIP vs Lumpsum)
      </p>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, fontSize: 12, color: C.ink2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 12, height: 12, background: C.dark, borderRadius: 3, display: 'inline-block' }} />
          <span>SIP Final Corpus</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 12, height: 12, background: C.lime2, borderRadius: 3, display: 'inline-block' }} />
          <span>Lumpsum Final Corpus</span>
        </div>
      </div>
      <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: schedule.length > 15 ? 8 : 14, height: 160, minWidth: schedule.length * 36, padding: '10px 0 0' }}>
          {schedule.map(s => {
            const sipPct = maxCorpus > 0 ? (s.sipCorpus / maxCorpus) * 100 : 0;
            const lumpPct = maxCorpus > 0 ? (s.lumpsumCorpus / maxCorpus) * 100 : 0;
            return (
              <div key={s.year} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '100%', display: 'flex', gap: 2, alignItems: 'flex-end', height: '100%' }}>
                  <div style={{ flex: 1, height: `${sipPct}%`, background: C.dark, borderRadius: '3px 3px 0 0', transition: 'height 0.3s' }} title={`Y${s.year} SIP Corpus: Rs ${s.sipCorpus.toLocaleString('en-IN')}`} />
                  <div style={{ flex: 1, height: `${lumpPct}%`, background: C.lime2, borderRadius: '3px 3px 0 0', transition: 'height 0.3s' }} title={`Y${s.year} Lumpsum Corpus: Rs ${s.lumpsumCorpus.toLocaleString('en-IN')}`} />
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
  mode: 'equal_capital', // 'equal_capital' | 'custom'
  totalCapital: 1200000,
  monthlySip: 10000,
  lumpsumAmount: 500000,
  expectedRate: 12.0,
  tenureYrs: 10,
  showSchedule: false,
};

export default function SIPVsLumpsumClient() {
  const [mobile, setMobile] = useState<boolean>(false);
  useLayoutEffect(() => {
    const check = () => setMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { settings, updateSettings } = useCalculatorSettings('sip-vs-lumpsum-calculator', defaultSettings);
  const { formatCurrency } = useCurrency();

  const {
    mode,
    totalCapital,
    monthlySip,
    lumpsumAmount,
    expectedRate,
    tenureYrs,
    showSchedule,
  } = settings;

  const setMode = (v: string) => updateSettings({ mode: v });
  const setTotalCapital = (v: number) => updateSettings({ totalCapital: v });
  const setMonthlySip = (v: number) => updateSettings({ monthlySip: v });
  const setLumpsumAmount = (v: number) => updateSettings({ lumpsumAmount: v });
  const setExpectedRate = (v: number) => updateSettings({ expectedRate: v });
  const setTenureYrs = (v: number) => updateSettings({ tenureYrs: v });
  const setShowSchedule = (v: boolean) => updateSettings({ showSchedule: v });

  // Effective amounts depending on mode
  const effMonthlySip = mode === 'equal_capital' ? Math.round(totalCapital / (tenureYrs * 12)) : monthlySip;
  const effLumpsum = mode === 'equal_capital' ? totalCapital : lumpsumAmount;

  // Calculation formulas
  const i = expectedRate / 12 / 100;
  const n = tenureYrs * 12;

  const sipCorpus = useMemo(() => {
    if (effMonthlySip <= 0 || n <= 0) return 0;
    if (i <= 0) return effMonthlySip * n;
    return Math.round(effMonthlySip * (((Math.pow(1 + i, n) - 1) / i) * (1 + i)));
  }, [effMonthlySip, i, n]);

  const sipInvested = effMonthlySip * n;
  const sipGain = Math.max(0, sipCorpus - sipInvested);

  const lumpsumCorpus = useMemo(() => {
    if (effLumpsum <= 0 || tenureYrs <= 0) return 0;
    return Math.round(effLumpsum * Math.pow(1 + expectedRate / 100, tenureYrs));
  }, [effLumpsum, expectedRate, tenureYrs]);

  const lumpsumInvested = effLumpsum;
  const lumpsumGain = Math.max(0, lumpsumCorpus - lumpsumInvested);

  const differenceCorpus = lumpsumCorpus - sipCorpus;
  const lumpsumOutperforms = differenceCorpus >= 0;

  const schedule = useMemo(
    () => calculateComparisonSchedule(effMonthlySip, effLumpsum, expectedRate, tenureYrs),
    [effMonthlySip, effLumpsum, expectedRate, tenureYrs]
  );

  return (
    <div style={{ minHeight: '100vh', background: C.bg, fontFamily: INTER, paddingBottom: 60 }}>
      {/* NAVIGATION */}
      <PageNav />

      {/* MAIN CONTAINER 1280 */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        {/* PAGE HEADER */}
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 8px', letterSpacing: '-0.025em' }}>
            SIP vs Lumpsum Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800, lineHeight: 1.6 }}>
            Compare monthly Systematic Investment Plan (SIP) growth against one-time lumpsum mutual fund returns side by side for the same investment capital, tenure, and CAGR rate.
          </p>
        </header>

        {/* 2-COLUMN PAGE GRID (LEFT: CALCULATOR & ARTICLE, RIGHT: SIDEBAR) */}
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
              <div role="tablist" aria-label="Comparison Mode" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                {[
                  { id: 'equal_capital', label: 'Equal Total Outlay (SIP vs Lumpsum)' },
                  { id: 'custom', label: 'Custom SIP vs Lumpsum Amount' },
                ].map(t => (
                  <button
                    key={t.id}
                    id={`tab-${t.id}`}
                    role="tab"
                    aria-selected={mode === t.id}
                    aria-controls={`panel-${t.id}`}
                    onClick={() => setMode(t.id)}
                    style={{
                      flex: 1,
                      padding: mobile ? '13px 8px' : '15px 20px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: mobile ? 12.5 : 13.5,
                      fontWeight: mode === t.id ? 700 : 400,
                      color: mode === t.id ? C.dark : C.ink3,
                      borderBottom: mode === t.id ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
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
                  id={`panel-${mode}`}
                  style={{
                    padding: mobile ? '20px 18px' : '36px 36px',
                    borderRight: mobile ? 'none' : `1px solid ${C.border}`,
                    borderBottom: mobile ? `1px solid ${C.border}` : 'none',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      Investment Inputs
                    </span>
                    <CurrencySelector theme="light" />
                  </div>

                  {mode === 'equal_capital' ? (
                    <>
                      <Slider
                        id="total-cap"
                        label="Total Capital to Invest"
                        value={totalCapital}
                        min={100000}
                        max={50000000}
                        step={100000}
                        fmt={formatCurrency}
                        onChange={setTotalCapital}
                        compact={mobile}
                      />
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '12px 14px', marginBottom: 24 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ fontSize: 12.5, color: C.ink2 }}>Calculated Monthly SIP:</span>
                          <strong style={{ fontSize: 13.5, color: C.ink }}>{formatCurrency(effMonthlySip)} / mo</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: 12.5, color: C.ink2 }}>One-Time Lumpsum:</span>
                          <strong style={{ fontSize: 13.5, color: C.ink }}>{formatCurrency(effLumpsum)}</strong>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Slider
                        id="monthly-sip"
                        label="Monthly SIP Amount"
                        value={monthlySip}
                        min={500}
                        max={500000}
                        step={500}
                        fmt={formatCurrency}
                        onChange={setMonthlySip}
                        compact={mobile}
                      />
                      <Slider
                        id="lumpsum-amt"
                        label="One-Time Lumpsum Deposit"
                        value={lumpsumAmount}
                        min={10000}
                        max={25000000}
                        step={10000}
                        fmt={formatCurrency}
                        onChange={setLumpsumAmount}
                        compact={mobile}
                      />
                    </>
                  )}

                  <Slider
                    id="rate"
                    label="Expected Annual CAGR (%)"
                    value={expectedRate}
                    min={1.0}
                    max={30.0}
                    step={0.5}
                    fmt={v => `${v.toFixed(1)}%`}
                    onChange={setExpectedRate}
                    compact={mobile}
                  />

                  <Slider
                    id="tenure"
                    label="Investment Tenure (Years)"
                    value={tenureYrs}
                    min={1}
                    max={30}
                    step={1}
                    fmt={v => `${v} Years`}
                    onChange={setTenureYrs}
                    compact={mobile}
                  />

                  {/* Year Presets (Neutral Pill Buttons) */}
                  <div role="group" aria-label="Tenure presets" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: -14, marginBottom: 20 }}>
                    {[1, 3, 5, 10, 15, 20, 30].map(y => (
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
                </div>

                {/* RIGHT: RESULT PANEL (Prominent Dark Box & Donut Chart Top) */}
                <div style={{ padding: mobile ? '20px 18px' : '36px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* Donut Chart (order: -1 on desktop, 1 on mobile) */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: mobile ? 12 : 16, order: mobile ? 1 : -1 }}>
                    <DonutChart sipCorpus={sipCorpus} lumpsumCorpus={lumpsumCorpus} />
                  </div>

                  {/* Legend (order: -1 on desktop, 2 on mobile) */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 20, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>SIP Corpus</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Lumpsum Corpus</span>
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
                        Lumpsum Final Corpus
                      </div>
                      <div style={{ fontSize: 12, color: '#7A8087' }}>
                        SIP Final Corpus
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                      <span
                        aria-live="polite"
                        aria-label={`Lumpsum final corpus: ${formatCurrency(lumpsumCorpus)}`}
                        style={{ fontSize: mobile ? 24 : 28, fontWeight: 800, color: '#1F7A58', lineHeight: 1, letterSpacing: '-0.02em' }}
                      >
                        {formatCurrency(lumpsumCorpus)}
                      </span>
                      <span style={{ fontSize: 15, fontWeight: 700, color: '#101214', lineHeight: 1 }}>
                        {formatCurrency(sipCorpus)}
                      </span>
                    </div>
                  </div>

                  {/* Stat Breakdown Rows */}
                  {[
                    { label: 'SIP Total Capital Invested', value: formatCurrency(sipInvested) },
                    { label: 'SIP Total Gain (Interest)', value: formatCurrency(sipGain) },
                    { label: 'Lumpsum Capital Invested', value: formatCurrency(lumpsumInvested) },
                    { label: 'Lumpsum Total Gain (Interest)', value: formatCurrency(lumpsumGain) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '12px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 600, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  {/* Outperformance Summary Banner */}
                  <div
                    style={{
                      width: '100%',
                      background: lumpsumOutperforms ? '#f4f5f6' : '#EFF6FF',
                      border: `1px solid ${lumpsumOutperforms ? C.border : '#BFDBFE'}`,
                      borderRadius: 8,
                      padding: '12px 14px',
                      marginTop: 16,
                      textAlign: 'center',
                    }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>
                      {lumpsumOutperforms
                        ? `Lumpsum yields ${formatCurrency(Math.abs(differenceCorpus))} more total wealth than SIP (+${(((lumpsumCorpus - sipCorpus) / Math.max(1, sipCorpus)) * 100).toFixed(1)}%)`
                        : `SIP yields ${formatCurrency(Math.abs(differenceCorpus))} more total wealth than Lumpsum (+${(((sipCorpus - lumpsumCorpus) / Math.max(1, lumpsumCorpus)) * 100).toFixed(1)}%)`}
                    </span>
                  </div>
                </div>
              </div>

              {/* COLLAPSIBLE YEAR-BY-YEAR SCHEDULE */}
              <div style={{ borderTop: `1px solid ${C.border}`, padding: mobile ? 18 : 24 }}>
                <button
                  type="button"
                  aria-expanded={showSchedule}
                  aria-controls="sip-vs-lumpsum-schedule-panel"
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
                  <span>{showSchedule ? '▲ Hide' : '▼ View'} Year-by-Year Growth Schedule &amp; Comparison Chart</span>
                </button>

                {showSchedule && (
                  <div id="sip-vs-lumpsum-schedule-panel" style={{ marginTop: 16 }}>
                    <ComparisonBarChart schedule={schedule} />

                    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, marginTop: 8 }}>
                          Yearly side-by-side growth comparison of SIP vs Lumpsum mutual fund portfolio.
                        </caption>
                        <thead>
                          <tr>
                            <th scope="col" style={thS}>Year</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' }}>SIP Invested</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' }}>SIP Final Value</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' }}>Lumpsum Invested</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' }}>Lumpsum Final Value</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' }}>Wealth Difference</th>
                          </tr>
                        </thead>
                        <tbody>
                          {schedule.map((row, idx) => {
                            const diff = row.lumpsumCorpus - row.sipCorpus;
                            return (
                              <tr key={row.year} style={{ background: idx % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ ...tdL, fontWeight: 600 }}>Year {row.year}</td>
                                <td style={tdR}>{formatCurrency(row.sipInvested)}</td>
                                <td style={{ ...tdR, color: C.dark, fontWeight: 600 }}>{formatCurrency(row.sipCorpus)}</td>
                                <td style={tdR}>{formatCurrency(row.lumpsumInvested)}</td>
                                <td style={{ ...tdR, color: '#166534', fontWeight: 700 }}>{formatCurrency(row.lumpsumCorpus)}</td>
                                <td style={{ ...tdR, color: diff >= 0 ? '#166534' : '#B45309', fontWeight: 600 }}>
                                  {diff >= 0 ? `+${formatCurrency(diff)}` : formatCurrency(diff)}
                                </td>
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

            {/* WAITLIST CARD COMPONENT */}
            <WaitlistCard mobile={mobile} />

            

            {/* ARTICLE SECTION */}
            <article itemScope itemType="https://schema.org/Article" style={{ minWidth: 0 }}>
              {/* Section 1: What is SIP vs Lumpsum */}
              <section id="what-is-sip-vs-lumpsum" style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                  What Is SIP vs Lumpsum Investment in Mutual Funds?
                </h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    A Systematic Investment Plan (SIP) is a disciplined method where an investor deploys fixed monthly capital into a mutual fund over time, whereas a Lumpsum investment deposits a single one-time capital sum upfront into the fund scheme.
                  </p>
                </div>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 16px' }}>
                  Per official guidelines from the <a href="https://www.sebi.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Securities and Exchange Board of India (SEBI)</a>, mutual fund investors can choose between these two execution routes based on market valuation, income stability, and liquidity requirements.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: 0 }}>
                  While Lumpsum investments maximize compounding returns in steady bull markets because 100% of the capital starts earning interest on day one, SIPs insulate investors from market volatility through rupee cost averaging during market dips.
                </p>
              </section>

              {/* Section 2: Mathematical Formulas Compared */}
              <section id="formulas-compared" style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                  SIP and Lumpsum Return Formulas Compared
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 16px' }}>
                  The core reason Lumpsum generates higher numerical wealth than SIP for the exact same capital and interest rate is that SIP capital is deployed gradually over time, resulting in a lower average dollar-years of compounding.
                </p>
                <div style={{ background: '#f8f9f9', border: `1px solid ${C.border}`, borderRadius: 10, padding: 18, marginBottom: 20 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: C.ink, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    1. One-Time Lumpsum Compound Interest Formula
                  </p>
                  <div style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark, fontWeight: 700, padding: '8px 12px', background: C.white, border: `1px solid ${C.border}`, borderRadius: 6, marginBottom: 16 }}>
                    FV = L x (1 + r / 100)^y
                  </div>

                  <p style={{ fontSize: 13, fontWeight: 700, color: C.ink, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    2. Monthly SIP Future Value Formula
                  </p>
                  <div style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark, fontWeight: 700, padding: '8px 12px', background: C.white, border: `1px solid ${C.border}`, borderRadius: 6 }}>
                    FV = P x [ ((1 + i)^n - 1) / i ] x (1 + i)
                  </div>
                  <p style={{ fontSize: 12, color: C.ink3, margin: '10px 0 0' }}>
                    Where L = Lumpsum Deposit, P = Monthly SIP Amount, r = Annual CAGR %, i = Monthly Interest Rate (r / 12 / 100), and n = Total Months (Years x 12).
                  </p>
                </div>
              </section>

              {/* Section 3: Comparison Table */}
              <section id="comparison-table" style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                  SIP vs Lumpsum Return Comparison Breakdown Table (12% CAGR)
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 16px' }}>
                  The table below illustrates the final wealth gap between a monthly SIP and a one-time Lumpsum investment assuming a constant annual return of 12% p.a. across various tenures for equal total capital outlay.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, marginTop: 8 }}>
                      Comparative wealth accumulation of SIP vs Lumpsum for equal total invested capital at 12% p.a.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Tenure</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Total Capital Outlay</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Monthly SIP Amount</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>SIP Final Corpus</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Lumpsum Final Corpus</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Lumpsum Wealth Gain Margin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { yr: '3 Years', cap: 'Rs 3,60,000', sip: 'Rs 10,000', sipFv: 'Rs 4,35,076', lumpFv: 'Rs 5,05,774', gap: '+Rs 70,698 (+16.2%)' },
                        { yr: '5 Years', cap: 'Rs 6,00,000', sip: 'Rs 10,000', sipFv: 'Rs 8,24,864', lumpFv: 'Rs 10,57,406', gap: '+Rs 2,32,542 (+28.2%)' },
                        { yr: '10 Years', cap: 'Rs 12,00,000', sip: 'Rs 10,000', sipFv: 'Rs 23,23,391', lumpFv: 'Rs 37,27,018', gap: '+Rs 14,03,627 (+60.4%)' },
                        { yr: '15 Years', cap: 'Rs 18,00,000', sip: 'Rs 10,000', sipFv: 'Rs 50,45,760', lumpFv: 'Rs 98,52,382', gap: '+Rs 48,06,622 (+95.3%)' },
                        { yr: '20 Years', cap: 'Rs 24,00,000', sip: 'Rs 10,000', sipFv: 'Rs 99,91,479', lumpFv: 'Rs 2,31,51,157', gap: '+Rs 1,31,59,678 (+131.7%)' },
                      ].map((row, idx) => (
                        <tr key={row.yr} style={{ background: idx % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{row.yr}</td>
                          <td style={tdR}>{row.cap}</td>
                          <td style={tdR}>{row.sip}</td>
                          <td style={{ ...tdR, color: C.dark, fontWeight: 600 }}>{row.sipFv}</td>
                          <td style={{ ...tdR, color: '#166534', fontWeight: 700 }}>{row.lumpFv}</td>
                          <td style={{ ...tdR, color: '#166534', fontWeight: 600 }}>{row.gap}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                    Planning Monthly Mutual Fund SIP Investments?
                  </p>
                  <p style={{ fontSize: 13, color: C.ink2, margin: 0, fontFamily: INTER }}>
                    Calculate exact compounding schedules and inflation-adjusted targets with our dedicated SIP Calculator.
                  </p>
                </div>
                <Link className="fx-btn"
                  href="/calculators/sip-calculator"
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
                  Open SIP calculator
                </Link>
              </div>

              {/* Section 4: Market Cycles */}
              <section id="market-cycles" style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                  SIP vs Lumpsum in Bull and Bear Markets
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 16px' }}>
                  The ideal choice between SIP and Lumpsum depends heavily on prevailing stock market valuations:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15, color: C.ink2, listStyleType: 'disc' }}>
                  <li>
                    <strong style={{ color: C.ink }}>Bull Market (Trending Upward):</strong> Lumpsum outperforms SIP by a substantial margin because all capital is deployed at the start, capturing 100% of upside price momentum.
                  </li>
                  <li>
                    <strong style={{ color: C.ink }}>Bear Market or High Volatility:</strong> SIP outperforms Lumpsum because rupee cost averaging purchases more mutual fund units at discounted NAVs during market corrections, lowering the breakeven cost.
                  </li>
                </ul>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: 0 }}>
                  To project fixed-income alternatives without market volatility, check our <Link href="/calculators/fd-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>FD Calculator</Link> or evaluate money market liquidity with our <Link href="/calculators/liquid-fund-vs-fd-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Liquid Fund vs FD Calculator</Link>.
                </p>
              </section>

              {/* Section 5: Tax Rules */}
              <section id="tax-rules" style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                  Tax Treatment Differences Under Section 112A
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 16px' }}>
                  Under current Indian income tax rules, Long-Term Capital Gains (LTCG) tax of 12.5% applies to equity mutual fund gains exceeding Rs 1.25 Lakh per fiscal year (Section 112A). However, the holding period calculation differs significantly between SIP and Lumpsum:
                </p>
                <ol style={{ paddingLeft: 24, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: 12, listStyleType: 'decimal' }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Lumpsum Tax Holding Period:</strong> The entire investment has a single purchase date. After holding units for 12 months, all capital gains qualify for 12.5% LTCG tax.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>SIP First-In First-Out (FIFO) Taxing:</strong> Each monthly SIP installment is treated as an independent investment transaction with its own 12-month holding clock. Redemption triggers tax using FIFO logic.
                  </li>
                </ol>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: 0 }}>
                  Calculate tax impact across income brackets with our <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</Link> or estimate capital gains tax with our <Link href="/calculators/cagr-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>CAGR Calculator</Link>.
                </p>
              </section>

              {/* Section 6: How to Use */}
              <section id="how-to-use" style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                  How to Use This SIP vs Lumpsum Calculator
                </h2>
                <ol style={{ paddingLeft: 24, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: 12, listStyleType: 'decimal' }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select Mode:</strong> Choose Equal Total Outlay mode or Custom Amounts mode.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Input Capital &amp; Rates:</strong> Adjust sliders for total capital or monthly SIP, expected CAGR return %, and tenure years.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Analyze Side-by-Side Corpus:</strong> Review the donut chart, primary dark box result, total wealth gain split, and year-by-year comparison table.
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
                  <strong>Disclaimer:</strong> SIP vs Lumpsum return calculations are indicative projections based on compound interest and mathematical formulas assuming constant annual growth rates. Mutual fund investments are subject to market risks. Past performance does not guarantee future returns. Consult a SEBI-registered Investment Adviser and a qualified CA before making investment decisions.
                </p>
              </div>
            </article>
          </div>

          {/* RIGHT COLUMN: STICKY SIDEBAR */}
          <aside
            className="sip-vs-lumpsum-sidebar"
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
              .sip-vs-lumpsum-sidebar::-webkit-scrollbar { width: 5px; }
              .sip-vs-lumpsum-sidebar::-webkit-scrollbar-track { background: transparent; }
              .sip-vs-lumpsum-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
              .sip-vs-lumpsum-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
            `}</style>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ flexShrink: 0 }}>
                <SidebarList
                  title="Popular Wealth Calculators"
                  items={[
                    { href: '/calculators/sip-calculator', label: 'SIP Calculator' },
                    { href: '/calculators/lumpsum-calculator', label: 'Lumpsum Calculator' },
                    { href: '/calculators/cagr-calculator', label: 'CAGR Calculator' },
                    { href: '/calculators/fd-calculator', label: 'FD Calculator' },
                    { href: '/calculators/liquid-fund-vs-fd-calculator', label: 'Liquid Fund vs FD' },
                  ]}
                />
              </div>

              <div style={{ flexShrink: 0 }}>
                <SidebarList
                  title="More Tax &amp; Loan Tools"
                  items={[
                    { href: '/calculators/income-tax-calculator', label: 'Income Tax Calculator' },
                    { href: '/calculators/advance-tax-calculator', label: 'Advance Tax Calculator' },
                    { href: '/calculators/home-loan-calculator', label: 'Home Loan Calculator' },
                    { href: '/calculators/loan-against-property-calculator', label: 'Loan Against Property' },
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
        { hd: 'Calculators', links: [ '/calculators/sip-calculator|SIP Calculator', '/calculators/sip-vs-lumpsum-calculator|SIP vs Lumpsum', '/calculators/cagr-calculator|CAGR Calculator', '/calculators/fd-calculator|FD Calculator', '/calculators/home-loan-calculator|Home Loan', '/calculators/advance-tax-calculator|Advance Tax', ], },
        { hd: 'Topics', links: ['/#|Investing & Wealth', '/#|Income Tax', '/#|Loans & Debt', '/#|Property & Real Estate'], },
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
      q: 'Is SIP better than Lumpsum investment?',
      a: 'Neither is universally better; it depends on market conditions and capital availability. Lumpsum investments generate higher total returns in rising bull markets because 100% of capital compounds immediately. SIP is superior during volatile or falling markets due to rupee cost averaging, which buys more units when prices fall and lowers risk.',
    },
    {
      q: 'What is the main difference between SIP and Lumpsum?',
      a: 'In a Lumpsum investment, you deposit a single one-time capital amount upfront. In a SIP (Systematic Investment Plan), you invest a fixed amount regularly at monthly or quarterly intervals. Lumpsum returns are measured using CAGR, while SIP returns are measured using XIRR to account for multiple cash flows.',
    },
    {
      q: 'Which generates higher returns over 10 years, SIP or Lumpsum?',
      a: 'Assuming a constant annual compound growth rate of 12% p.a. over 10 years, a one-time Lumpsum of Rs 12 Lakh grows to Rs 37.27 Lakh (a gain of Rs 25.27 Lakh). A monthly SIP of Rs 10,000 (totaling Rs 12 Lakh invested over 10 years) grows to Rs 23.23 Lakh (a gain of Rs 11.23 Lakh). Lumpsum yields higher absolute wealth because all capital earns compound interest from day one.',
    },
    {
      q: 'Should I invest a large bonus as Lumpsum or via STP?',
      a: 'When receiving a large lump sum (such as an annual bonus or property sale proceeds), financial advisors recommend investing the amount in a liquid or overnight mutual fund and setting up a Systematic Transfer Plan (STP) to transfer fixed monthly amounts into equity funds over 6 to 12 months. This mitigates market timing risk.',
    },
    {
      q: 'How does rupee cost averaging work in a SIP?',
      a: 'Rupee cost averaging means you buy more mutual fund units when Net Asset Value (NAV) falls during market dips and fewer units when NAV rises during market highs. Over time, this lowers your average cost per unit without needing to time the market.',
    },
    {
      q: 'How is SIP return calculated compared to Lumpsum return?',
      a: 'Lumpsum return is calculated using the CAGR formula: (Final / Initial)^(1/Years) - 1. SIP return is calculated using XIRR (Extended Internal Rate of Return), which solves for the discount rate that makes the net present value of all monthly cash outflows equal to the final corpus value.',
    },
    {
      q: 'Are tax rules different for SIP vs Lumpsum?',
      a: 'Yes. For equity mutual funds in India, Long-Term Capital Gains (LTCG) tax of 12.5% applies to gains above Rs 1.25 Lakh per fiscal year. In a Lumpsum investment, the 1-year holding period for LTCG is counted from the single purchase date. In a SIP, each monthly installment is treated as an independent investment with its own 1-year holding period.',
    },
    {
      q: 'Can I do both SIP and Lumpsum in the same mutual fund folio?',
      a: 'Yes. Investors can maintain an active monthly SIP in a mutual fund scheme and simultaneously make lump-sum top-up investments into the same scheme whenever market corrections occur.',
    },
    {
      q: 'What happens to SIP vs Lumpsum during a market crash?',
      a: 'If a market crash occurs right after investing, a Lumpsum investment suffers an immediate paper loss on the full principal. A SIP continues investing at lower NAV levels during the crash, lowering the overall break-even price and generating faster recovery when markets bounce back.',
    },
    {
      q: 'What is the minimum amount for SIP and Lumpsum in India?',
      a: 'Most Indian mutual fund houses allow monthly SIPs starting at Rs 100 or Rs 500 per month. Minimum initial Lumpsum investment limits typically range from Rs 1,000 to Rs 5,000.',
    },
    {
      q: 'Which mutual fund category is best for SIP vs Lumpsum?',
      a: 'SIP is highly recommended for volatile high-beta categories like small-cap funds, mid-cap funds, and sectoral equity funds. Lumpsum is suitable for large-cap index funds, hybrid funds, and debt funds during high interest rate cycles.',
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
        body: JSON.stringify({ email, source: 'sip-vs-lumpsum-calculator' }),
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

'use client';

import { seriesColor } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { assetAllocationFaqItems } from './assetAllocationFaq';
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

const fmtIN = (n: number) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(Math.max(0, n)));

const fmtC = (n: number) => {
  if (n === 0) return 'Rs 0';
  if (n >= 1e7) return `Rs ${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `Rs ${(n / 1e5).toFixed(2)} L`;
  return `Rs ${fmtIN(n)}`;
};

const fmtPct = (n: number) => `${n.toFixed(1)}%`;

// Asset class definitions
const ASSET_CLASSES = [
  { key: 'equity',        label: 'Equity',             sublabel: 'Indian stocks + equity mutual funds', color: seriesColor(0), expectedReturn: 12 },
  { key: 'debt',          label: 'Debt',               sublabel: 'Bonds, FDs, debt MFs, EPF',          color: seriesColor(1), expectedReturn: 7  },
  { key: 'gold',          label: 'Gold',               sublabel: 'Physical + SGB + gold ETFs',          color: seriesColor(2), expectedReturn: 8  },
  { key: 'international', label: 'International Equity', sublabel: 'US stocks, international MFs',     color: seriesColor(3), expectedReturn: 11 },
  { key: 'realEstate',    label: 'Real Estate',        sublabel: 'REITs + property',                    color: seriesColor(4), expectedReturn: 8  },
  { key: 'cash',          label: 'Cash',               sublabel: 'Savings account + liquid funds',      color: seriesColor(5), expectedReturn: 4  },
] as const;

type AssetKey = typeof ASSET_CLASSES[number]['key'];

interface AllocationState {
  age: number;
  risk: 'conservative' | 'moderate' | 'aggressive';
  portfolioSize: number;
  equity: number;
  debt: number;
  gold: number;
  international: number;
  realEstate: number;
  cash: number;
}

const DEFAULT_STATE: AllocationState = {
  age: 32,
  risk: 'moderate',
  portfolioSize: 1000000,
  equity: 600000,
  debt: 250000,
  gold: 80000,
  international: 50000,
  realEstate: 0,
  cash: 20000,
};

// ---- Calculation logic ----

function calcRecommended(age: number, risk: 'conservative' | 'moderate' | 'aggressive') {
  const baseEquity = Math.max(20, 110 - age);
  let equityPct: number;
  if (risk === 'conservative') {
    equityPct = Math.round(baseEquity * 0.7);
  } else if (risk === 'aggressive') {
    equityPct = Math.min(80, Math.round(baseEquity * 1.3));
  } else {
    equityPct = baseEquity;
  }
  // Remaining 100 - equityPct split: debt heavy, gold 7%, international 7%, cash 5%
  const remaining = 100 - equityPct;
  const goldPct          = Math.min(10, Math.round(remaining * 0.10));
  const internationalPct = Math.min(10, Math.round(remaining * 0.10));
  const cashPct          = Math.round(remaining * 0.06);
  const realEstatePct    = 0;
  const debtPct          = 100 - equityPct - goldPct - internationalPct - cashPct - realEstatePct;
  return {
    equity:        Math.max(0, equityPct),
    debt:          Math.max(0, debtPct),
    gold:          goldPct,
    international: internationalPct,
    realEstate:    realEstatePct,
    cash:          cashPct,
  };
}

function calcWeightedReturn(pcts: Record<AssetKey, number>) {
  let ret = 0;
  for (const ac of ASSET_CLASSES) {
    ret += (pcts[ac.key] / 100) * ac.expectedReturn;
  }
  return ret;
}

function calcRiskScore(pcts: Record<AssetKey, number>) {
  // High-risk assets: equity, international. Medium: gold, realEstate. Low: debt, cash.
  const highRisk = (pcts.equity + pcts.international);
  if (highRisk >= 75) return 'Very High';
  if (highRisk >= 55) return 'High';
  if (highRisk >= 35) return 'Moderate';
  return 'Low';
}

// ---- Sub-components ----

function Slider({ label, value, min, max, step, fmt, onChange }: {
  label: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const fill = ((value - min) / (max - min)) * 100;
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <label style={{ fontSize: 14, color: C.ink2, fontWeight: 400, fontFamily: INTER }}>{label}</label>
        {editing ? (
          <input autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            aria-label={`Enter ${label} value`}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.white, border: `1.5px solid ${C.ink}`, borderRadius: 8, padding: '7px 12px', width: 130, outline: 'none', color: C.ink, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${fmt(value)}. Click to edit.`}
            style={{ fontSize: 14, fontWeight: 700, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 16px', cursor: 'pointer', fontFamily: INTER, minWidth: 100, textAlign: 'center' }}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}>
            {fmt(value)}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${fill}%, ${C.border} ${fill}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${fill}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 20, height: 20, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 2px 8px rgba(16,18,20,0.22)', pointerEvents: 'none', zIndex: 1 }} />
        <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(+e.target.value)}
          aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
        <span style={{ fontSize: 11, color: C.ink3, fontFamily: INTER }}>{fmt(min)}</span>
        <span style={{ fontSize: 11, color: C.ink3, fontFamily: INTER }}>{fmt(max)}</span>
      </div>
    </div>
  );
}

function NumInput({ label, sublabel, value, onChange }: {
  label: string; sublabel: string; value: number; onChange: (v: number) => void;
}) {
  const [raw, setRaw] = useState('');
  const [focus, setFocus] = useState(false);
  const display = focus ? raw : (value > 0 ? fmtIN(value) : '');
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <label style={{ fontSize: 13, color: C.ink2, fontWeight: 500, fontFamily: INTER }}>{label}</label>
        <span style={{ fontSize: 11, color: C.ink3, fontFamily: INTER }}>{sublabel}</span>
      </div>
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: C.ink3, pointerEvents: 'none', fontFamily: INTER }}>Rs</span>
        <input type="text" inputMode="numeric" value={display} placeholder="0"
          onFocus={() => { setRaw(value > 0 ? String(value) : ''); setFocus(true); }}
          onChange={e => setRaw(e.target.value.replace(/[^0-9]/g, ''))}
          onBlur={() => {
            setFocus(false);
            const n = parseInt(raw || '0', 10);
            onChange(isNaN(n) ? 0 : n);
          }}
          aria-label={`${label} amount`}
          style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px 8px 34px', border: `1.5px solid ${focus ? C.ink : C.border}`, borderRadius: 8, fontSize: 13, fontWeight: 600, color: C.ink, outline: 'none', fontFamily: INTER, background: C.white, transition: 'all 0.15s' }} />
      </div>
    </div>
  );
}

function AllocationDonut({ currentPcts }: { currentPcts: Record<AssetKey, number> }) {
  const R = 76, cx = 100, cy = 100, sw = 22;
  const circ = 2 * Math.PI * R;
  let offset = circ / 4;
  const segments: { key: AssetKey; dash: number; offsetVal: number; color: string; pct: number }[] = [];
  for (const ac of ASSET_CLASSES) {
    const pct = currentPcts[ac.key];
    const dash = (pct / 100) * circ;
    segments.push({ key: ac.key, dash, offsetVal: offset, color: ac.color, pct });
    offset += dash;
  }
  const total = Object.values(currentPcts).reduce((a, b) => a + b, 0);
  const isEmpty = total === 0;
  return (
    <svg width={200} height={200} viewBox="0 0 200 200"
      role="img"
      aria-label={`Current portfolio allocation: ${ASSET_CLASSES.map(ac => `${ac.label} ${fmtPct(currentPcts[ac.key])}`).join(', ')}`}
      style={{ display: 'block' }}>
      {isEmpty ? (
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.border} strokeWidth={sw} />
      ) : (
        segments.map(seg => (
          seg.pct > 0 ? (
            <circle key={seg.key} cx={cx} cy={cy} r={R} fill="none"
              stroke={seg.color}
              strokeWidth={sw}
              strokeDasharray={`${seg.dash} ${circ - seg.dash}`}
              strokeDashoffset={-seg.offsetVal + circ / 4}
              style={{ transition: 'stroke-dasharray 0.4s ease' }} />
          ) : null
        ))
      )}
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Portfolio</text>
      <text x={cx} y={cy + 12} textAnchor="middle" style={{ fontSize: 14, fontWeight: 700, fill: C.ink, fontFamily: INTER }}>Allocation</text>
    </svg>
  );
}

function YearByYearImpactChart({ values }: {
  values: { year: number; currentValue: number; recommendedValue: number }[];
}) {
  const chartWidth = 820;
  const chartHeight = 220;
  const plotLeft = 58;
  const plotTop = 16;
  const plotHeight = 164;
  const plotWidth = chartWidth - plotLeft - 12;
  const maximum = Math.max(...values.map(row => Math.max(row.currentValue, row.recommendedValue)), 1);
  const groupWidth = plotWidth / values.length;
  const barWidth = Math.min(8, groupWidth * 0.34);
  const yearLabels = new Set([1, 5, 10, 15, 20, 25, 30]);

  return (
    <figure style={{ margin: '4px 0 20px' }}>
      <div style={{ display: 'flex', gap: 18, alignItems: 'center', marginBottom: 8, fontFamily: INTER, fontSize: 11, color: C.ink2 }}>
        {[
          { label: 'Current mix', color: '#101214' },
          { label: 'Recommended mix', color: '#2d9970' },
        ].map(series => (
          <span key={series.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span aria-hidden="true" style={{ width: 9, height: 9, borderRadius: 2, background: series.color }} />
            {series.label}
          </span>
        ))}
      </div>
      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} width="100%" role="img"
          aria-label="Grouped bar chart showing projected portfolio values by year for the current and recommended asset allocations"
          style={{ display: 'block', minWidth: 620, fontFamily: INTER }}>
          {[0, 0.5, 1].map(fraction => {
            const y = plotTop + plotHeight * (1 - fraction);
            return <line key={fraction} x1={plotLeft} x2={chartWidth - 12} y1={y} y2={y} stroke={C.border} strokeWidth="1" />;
          })}
          <text x="2" y={plotTop + 4} fill={C.ink3} fontSize="9">{fmtC(maximum)}</text>
          <text x="34" y={plotTop + plotHeight + 3} fill={C.ink3} fontSize="9">0</text>
          {values.map((row, index) => {
            const center = plotLeft + index * groupWidth + groupWidth / 2;
            const currentHeight = (row.currentValue / maximum) * plotHeight;
            const recommendedHeight = (row.recommendedValue / maximum) * plotHeight;
            return (
              <g key={row.year}>
                <rect x={center - barWidth - 1} y={plotTop + plotHeight - currentHeight} width={barWidth} height={currentHeight} fill="#101214">
                  <title>Year {row.year}, current mix: {fmtC(row.currentValue)}</title>
                </rect>
                <rect x={center + 1} y={plotTop + plotHeight - recommendedHeight} width={barWidth} height={recommendedHeight} fill="#2d9970">
                  <title>Year {row.year}, recommended mix: {fmtC(row.recommendedValue)}</title>
                </rect>
                {yearLabels.has(row.year) && <text x={center} y={plotTop + plotHeight + 17} textAnchor="middle" fill={C.ink3} fontSize="9">{row.year}</text>}
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption style={{ fontFamily: INTER, fontSize: 11, color: C.ink3, marginTop: 5 }}>Projected portfolio value by year. Hover over a bar for its value.</figcaption>
    </figure>
  );
}

function FAQ() {
  return <FAQBox items={assetAllocationFaqItems} />;
}

// ---- Main Component ----

export default function AssetAllocationClient() {
  const defaultSettings = {
    age: DEFAULT_STATE.age,
    risk: DEFAULT_STATE.risk,
    portfolioSize: DEFAULT_STATE.portfolioSize,
    equity: DEFAULT_STATE.equity,
    debt: DEFAULT_STATE.debt,
    gold: DEFAULT_STATE.gold,
    international: DEFAULT_STATE.international,
    realEstate: DEFAULT_STATE.realEstate,
    cash: DEFAULT_STATE.cash,
  };

  const { settings, updateSettings } = useCalculatorSettings('asset-allocation', defaultSettings);

  const age           = settings.age          ?? DEFAULT_STATE.age;
  const risk          = settings.risk         ?? DEFAULT_STATE.risk;
  const portfolioSize = settings.portfolioSize ?? DEFAULT_STATE.portfolioSize;
  const equity        = settings.equity        ?? DEFAULT_STATE.equity;
  const debt          = settings.debt          ?? DEFAULT_STATE.debt;
  const gold          = settings.gold          ?? DEFAULT_STATE.gold;
  const international = settings.international ?? DEFAULT_STATE.international;
  const realEstate    = settings.realEstate    ?? DEFAULT_STATE.realEstate;
  const cash          = settings.cash          ?? DEFAULT_STATE.cash;

  const set = (k: string, v: number | string) => updateSettings({ [k]: v });

  const [inputPage, setInputPage] = useState<'basic' | 'advanced'>('basic');
  const [mobile, setMobile] = useState(false);
  const [showImpactTable, setShowImpactTable] = useState(false);
  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  // Derived: current total and percentages
  const currentTotal = useMemo(
    () => equity + debt + gold + international + realEstate + cash,
    [equity, debt, gold, international, realEstate, cash]
  );

  const currentPcts = useMemo<Record<AssetKey, number>>(() => {
    const total = currentTotal || 1;
    return {
      equity:        (equity / total) * 100,
      debt:          (debt / total) * 100,
      gold:          (gold / total) * 100,
      international: (international / total) * 100,
      realEstate:    (realEstate / total) * 100,
      cash:          (cash / total) * 100,
    };
  }, [equity, debt, gold, international, realEstate, cash, currentTotal]);

  const recommended = useMemo(() => calcRecommended(age, risk), [age, risk]);

  // Recommended Rs amounts from portfolioSize
  const recommendedAmounts = useMemo<Record<AssetKey, number>>(() => ({
    equity:        (recommended.equity / 100) * portfolioSize,
    debt:          (recommended.debt / 100) * portfolioSize,
    gold:          (recommended.gold / 100) * portfolioSize,
    international: (recommended.international / 100) * portfolioSize,
    realEstate:    (recommended.realEstate / 100) * portfolioSize,
    cash:          (recommended.cash / 100) * portfolioSize,
  }), [recommended, portfolioSize]);

  // Current amounts as-entered (not scaled to portfolioSize for rebalancing purposes)
  const currentAmounts = useMemo<Record<AssetKey, number>>(() => ({
    equity, debt, gold, international, realEstate, cash,
  }), [equity, debt, gold, international, realEstate, cash]);

  // Rebalancing: based on portfolio size as the target
  const rebalancingActions = useMemo<Record<AssetKey, number>>(() => ({
    equity:        recommendedAmounts.equity - equity,
    debt:          recommendedAmounts.debt - debt,
    gold:          recommendedAmounts.gold - gold,
    international: recommendedAmounts.international - international,
    realEstate:    recommendedAmounts.realEstate - realEstate,
    cash:          recommendedAmounts.cash - cash,
  }), [recommendedAmounts, equity, debt, gold, international, realEstate, cash]);

  const currentReturn   = useMemo(() => calcWeightedReturn(currentPcts), [currentPcts]);
  const recommendedReturn = useMemo(() => calcWeightedReturn(recommended as Record<AssetKey, number>), [recommended]);
  const riskScore       = useMemo(() => calcRiskScore(currentPcts), [currentPcts]);
  const yearByYearValues = useMemo(() => Array.from({ length: 30 }, (_, index) => {
    const year = index + 1;
    const currentValue = portfolioSize * (1 + currentReturn / 100) ** year;
    const recommendedValue = portfolioSize * (1 + recommendedReturn / 100) ** year;
    return { year, currentValue, recommendedValue, difference: recommendedValue - currentValue };
  }), [portfolioSize, currentReturn, recommendedReturn]);

  const riskColor = C.ink;

  const p: React.CSSProperties   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px', fontFamily: INTER };
  const h2s: React.CSSProperties = { fontSize: mobile ? 18 : 22, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em', fontFamily: INTER };
  const h3s: React.CSSProperties = { fontSize: 16, fontWeight: 600, color: C.ink, margin: '0 0 10px', fontFamily: INTER };
  const sec: React.CSSProperties = { margin: '0 0 48px' };
  const thS: React.CSSProperties = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' };
  const tdL: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' };
  const tdR: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top' };

  const riskLabels: Record<typeof risk, string> = {
    conservative: 'Conservative',
    moderate: 'Moderate',
    aggressive: 'Aggressive',
  };

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 24px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em', fontFamily: INTER }}>
            Asset Allocation Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800, fontFamily: INTER }}>
            Portfolio allocation by age and risk profile &nbsp;&middot;&nbsp; 110 minus age rule &nbsp;&middot;&nbsp; Rebalancing action plan &nbsp;&middot;&nbsp; Weighted expected return
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* CALCULATOR CARD */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 28 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 0 }}>

                {/* INPUT PANEL */}
                <div style={{ padding: mobile ? '18px' : '28px 32px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none', display: 'flex', flexDirection: 'column' }}>

                  {inputPage === 'basic' ? (
                    <>
                      {/* Age slider */}
                      <Slider label="Your Age" value={age} min={18} max={70} step={1}
                        fmt={v => `${v} yrs`} onChange={v => set('age', v)} />

                      {/* Risk profile toggle */}
                      <div style={{ marginBottom: 28 }}>
                        <div style={{ fontSize: 14, color: C.ink2, fontWeight: 400, marginBottom: 12, fontFamily: INTER }}>Risk Profile</div>
                        <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                          {(['conservative', 'moderate', 'aggressive'] as const).map((r, idx) => (
                            <button key={r} onClick={() => set('risk', r)}
                              style={{ flex: 1, padding: '9px 4px', border: 'none', borderRight: idx < 2 ? `1px solid ${C.border}` : 'none', background: risk === r ? C.white : 'transparent', color: risk === r ? C.ink : C.ink3, fontFamily: INTER, fontSize: 11.5, fontWeight: risk === r ? 600 : 400, cursor: 'pointer', transition: 'all 0.15s' }}>
                              {riskLabels[r]}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Portfolio size slider */}
                      <Slider label="Total Portfolio Size" value={portfolioSize} min={100000} max={50000000} step={100000}
                        fmt={fmtC} onChange={v => set('portfolioSize', v)} />

                      {/* Recommended allocation info box */}
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '12px 14px', marginBottom: 8 }}>
                        <div style={{ fontSize: 11, color: C.ink3, marginBottom: 6, fontFamily: INTER, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Recommended Equity Allocation</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: C.ink, fontFamily: INTER }}>{recommended.equity}%</div>
                        <div style={{ fontSize: 12, color: C.ink3, marginTop: 2, fontFamily: INTER }}>Based on 110 minus age ({risk} profile)</div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto', paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
                        <button onClick={() => setInputPage('advanced')}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: C.ink2, background: 'none', border: `1px solid ${C.border}`, borderRadius: 7, padding: '6px 14px', cursor: 'pointer', fontFamily: INTER }}>
                          Current holdings
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 18, fontFamily: INTER }}>Current Holdings (Rs Amount Each)</div>

                      <NumInput label="Equity" sublabel="Stocks + equity MFs" value={equity} onChange={v => set('equity', v)} />
                      <NumInput label="Debt" sublabel="FDs, bonds, debt MFs, EPF" value={debt} onChange={v => set('debt', v)} />
                      <NumInput label="Gold" sublabel="Physical + SGB + gold ETF" value={gold} onChange={v => set('gold', v)} />
                      <NumInput label="International Equity" sublabel="US stocks, intl MFs" value={international} onChange={v => set('international', v)} />
                      <NumInput label="Real Estate" sublabel="REITs + property" value={realEstate} onChange={v => set('realEstate', v)} />
                      <NumInput label="Cash" sublabel="Savings + liquid funds" value={cash} onChange={v => set('cash', v)} />

                      {/* Current total display */}
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', marginTop: 4, marginBottom: 12 }}>
                        <div style={{ fontSize: 11, color: C.ink3, marginBottom: 2, fontFamily: INTER }}>Current Portfolio Total</div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: C.ink, fontFamily: INTER }}>{fmtC(currentTotal)}</div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 4, paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
                        <button onClick={() => setInputPage('basic')}
                          style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: C.ink2, background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, padding: 0 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
                          Back
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* RESULTS PANEL */}
                <div style={{ padding: mobile ? '18px' : '28px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  {/* Primary dark result box */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 8 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#50565C', fontFamily: INTER }}>Recommended Equity</div>
                      <div style={{ fontSize: 12, color: '#7A8087', fontFamily: INTER }}>{riskLabels[risk]} profile, age {age}</div>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                      <div style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', lineHeight: 1, fontFamily: INTER }}
                        aria-live="polite" aria-label={`Recommended equity allocation: ${recommended.equity}%`}>
                        {recommended.equity}%
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#101214', lineHeight: 1, fontFamily: INTER }}>of {fmtC(portfolioSize)}</div>
                    </div>
                  </div>

                  {/* Risk score strip */}
                  <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 14px', textAlign: 'center', marginBottom: 8, width: '100%' }}>
                    <span style={{ fontSize: 12.5, color: C.ink2, fontFamily: INTER }}>Current Portfolio Risk: <strong style={{ color: riskColor }}>{riskScore}</strong></span>
                  </div>

                  {/* Donut chart: order -1 on desktop, 1 on mobile */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, order: mobile ? 1 : -1 }}>
                    <AllocationDonut currentPcts={currentPcts} />
                  </div>

                  {/* Legend: order -1 on desktop, 2 on mobile */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', justifyContent: 'center', marginBottom: 12, order: mobile ? 2 : -1 }}>
                    {ASSET_CLASSES.map(ac => (
                      <div key={ac.key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: ac.color, flexShrink: 0 }} aria-hidden="true" />
                        <span style={{ fontSize: 11.5, color: C.ink2, fontFamily: INTER }}>{ac.label}: {fmtPct(currentPcts[ac.key])}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stat rows */}
                  {([
                    ['Current Return (Indicative)', `${currentReturn.toFixed(1)}% p.a.`],
                    ['Recommended Return (Indicative)', `${recommendedReturn.toFixed(1)}% p.a.`],
                    ['Recommended Equity', `${recommended.equity}%`],
                    ['Recommended Debt', `${recommended.debt}%`],
                    ['Recommended Gold', `${recommended.gold}%`],
                  ] as [string, string][]).map(([label, val]) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: 13, color: C.ink2, fontFamily: INTER }}>{label}</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: C.ink, fontFamily: INTER }}>{val}</span>
                    </div>
                  ))}

                  <div style={{ fontSize: 10.5, color: C.ink3, marginTop: 10, lineHeight: 1.55, fontFamily: INTER, textAlign: 'center' }}>
                    Expected returns are indicative based on long-run historical data. Not guaranteed.
                  </div>
                </div>
              </div>

              {/* REBALANCING TABLE */}
              <div style={{ borderTop: `1px solid ${C.border}`, padding: mobile ? '18px' : '24px 32px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 14, fontFamily: INTER }}>Rebalancing Action Plan</div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, textAlign: 'left', paddingTop: 6, fontFamily: INTER }}>
                      Rebalancing based on target portfolio size of {fmtC(portfolioSize)}. Current holdings may differ.
                    </caption>
                    <thead>
                      <tr style={{ background: '#f4f5f6' }}>
                        <th scope="col" style={thS}>Asset Class</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Current %</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Target %</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ASSET_CLASSES.map((ac, i) => {
                        const diff = rebalancingActions[ac.key];
                        const action = Math.abs(diff) < portfolioSize * 0.005 ? 'Hold'
                          : diff > 0 ? `Buy ${fmtC(diff)}`
                          : `Reduce ${fmtC(Math.abs(diff))}`;
                        const actionColor = action === 'Hold' ? C.ink3 : diff > 0 ? '#166534' : C.ink;
                        return (
                          <tr key={ac.key} style={{ background: i % 2 === 0 ? C.white : '#fafafa', borderTop: `1px solid ${C.border}` }}>
                            <td style={{ ...tdL, display: 'flex', alignItems: 'center', gap: 8 }}>
                              <div style={{ width: 8, height: 8, borderRadius: 2, background: ac.color, flexShrink: 0 }} aria-hidden="true" />
                              {ac.label}
                            </td>
                            <td style={{ ...tdR, textAlign: 'right' as const }}>{fmtPct(currentPcts[ac.key])}</td>
                            <td style={{ ...tdR, textAlign: 'right' as const }}>{recommended[ac.key]}%</td>
                            <td style={{ ...tdR, textAlign: 'right' as const, color: actionColor, fontWeight: 700 }}>{action}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <section style={{ border: `1px solid ${C.border}`, borderRadius: 12, background: C.white, marginBottom: 28, overflow: 'hidden' }}>
              <button id="asset-impact-toggle" type="button" aria-expanded={showImpactTable} aria-controls="asset-impact-panel"
                onClick={() => setShowImpactTable(value => !value)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '16px 20px', background: C.white, border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: INTER }}>
                <span>
                  <strong style={{ display: 'block', color: C.ink, fontSize: 14 }}>Year-by-Year Asset Allocation Impact</strong>
                  <span style={{ display: 'block', color: C.ink3, fontSize: 12, marginTop: 4 }}>Compare projected values for your current and recommended mix</span>
                </span>
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: showImpactTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              {showImpactTable && (
                <div id="asset-impact-panel" role="region" aria-labelledby="asset-impact-toggle" style={{ borderTop: `1px solid ${C.border}`, padding: mobile ? '16px' : '20px 24px' }}>
                  <p style={{ ...p, fontSize: 13, marginBottom: 12 }}>Both projections start with {fmtC(portfolioSize)} and compound the displayed weighted return once a year. They assume no new investments, withdrawals, fees, taxes or inflation, so they are illustrations rather than forecasts.</p>
                  <YearByYearImpactChart values={yearByYearValues} />
                  <div className="asset-allocation-swipe-hint" aria-hidden="true">Swipe to view all columns <span>→</span></div>
                  <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                    <table style={{ width: '100%', minWidth: 580, borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                      <caption style={{ captionSide: 'bottom', textAlign: 'left', paddingTop: 8, color: C.ink3, fontSize: 11, fontFamily: INTER }}>Illustrative annual compounding from the same starting portfolio value.</caption>
                      <thead><tr style={{ background: '#f4f5f6' }}>
                        <th scope="col" style={thS}>Year</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Current mix</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Recommended mix</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Difference</th>
                      </tr></thead>
                      <tbody>{yearByYearValues.map((row, index) => (
                        <tr key={row.year} style={{ background: index % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdL}>{row.year}</td>
                          <td style={{ ...tdR, textAlign: 'right' }}>{fmtC(row.currentValue)}</td>
                          <td style={{ ...tdR, textAlign: 'right' }}>{fmtC(row.recommendedValue)}</td>
                          <td style={{ ...tdR, textAlign: 'right' }}>{row.difference >= 0 ? '+' : '-'}{fmtC(Math.abs(row.difference))}</td>
                        </tr>
                      ))}</tbody>
                    </table>
                  </div>
                  <style>{`@keyframes assetAllocationSwipeHint{0%,100%{transform:translateX(0)}50%{transform:translateX(5px)}}.asset-allocation-swipe-hint{display:none}@media(max-width:767px){.asset-allocation-swipe-hint{display:flex;align-items:center;justify-content:flex-end;gap:8px;margin:0 0 8px;color:#777;font-size:11px}.asset-allocation-swipe-hint span{animation:assetAllocationSwipeHint 1.2s ease-in-out infinite}}`}</style>
                </div>
              )}
            </section>

            {/* Save Results Card */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ARTICLE */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <section style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', margin: '0 0 28px', background: C.white }} aria-labelledby="key-takeaways">
                <h2 id="key-takeaways" style={{ ...h2s, fontSize: 17, marginBottom: 10 }}>Key Takeaways</h2>
                <ul style={{ margin: 0, paddingLeft: 20, listStyleType: 'disc', display: 'grid', gap: 6 }}>
                  <li style={{ ...p, margin: 0 }}>Asset allocation sets the broad mix; diversification spreads holdings within that mix.</li>
                  <li style={{ ...p, margin: 0 }}>The 110 minus age rule is a starting point, not a personal recommendation.</li>
                  <li style={{ ...p, margin: 0 }}>Rebalancing through new contributions may reduce the need to sell, but selling can create tax and transaction costs.</li>
                  <li style={{ ...p, margin: 0 }}>The calculator's return figures use fixed illustrative assumptions and do not predict future results.</li>
                </ul>
              </section>

              <nav aria-label="On this page" style={{ margin: '0 0 40px', borderBottom: `1px solid ${C.border}`, paddingBottom: 20 }}>
                <h2 id="on-this-page" style={{ ...h2s, fontSize: 17 }}>On this page</h2>
                <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(3, minmax(0, 1fr))', gap: '8px 14px' }}>
                  {[
                    ['what-is-asset-allocation', 'What asset allocation means'],
                    ['110-minus-age-rule', '110 minus age rule'],
                    ['asset-classes-india', 'Asset classes in India'],
                    ['risk-profiles', 'Risk profiles'],
                    ['asset-allocation-formula', 'Formula and example'],
                    ['asset-allocation-by-age-india', 'Allocation by age'],
                    ['asset-allocation-goal-horizon', 'Allocation by goal horizon'],
                    ['best-investment-instruments', 'Investment instruments'],
                    ['tax-treatment-rebalancing', 'Tax and rebalancing'],
                    ['rebalancing-example', 'Rebalancing example'],
                    ['allocation-diversification-location', 'Allocation vs diversification'],
                    ['asset-allocation-strategies', 'Strategies compared'],
                    ['life-events-review', 'When to review'],
                    ['how-to-rebalance', 'How to rebalance'],
                    ['diversification-benefits', 'Why diversification matters'],
                    ['common-mistakes', 'Common mistakes'],
                    ['model-portfolios-by-age', 'Model portfolios by age'],
                    ['how-to-use-calculator', 'How to use the calculator'],
                    ['faq', 'Frequently asked questions'],
                    ['related-calculators', 'Related calculators'],
                  ].map(([id, label]) => <a key={id} href={`#${id}`} target="_blank" rel="noopener noreferrer" style={{ color: C.ink2, fontFamily: INTER, fontSize: 13, lineHeight: 1.5, textDecorationColor: C.border }}>{label}</a>)}
                </div>
              </nav>

              {/* SECTION 1 */}
              <div style={sec}>
                <h2 id="what-is-asset-allocation" style={h2s}>What Is Asset Allocation?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0, fontFamily: INTER }}>
                    Asset allocation is the process of dividing a portfolio across distinct asset classes such as equity, debt, gold, international equity, real estate, and cash to balance risk and expected return according to your investment horizon and tolerance for volatility.
                  </p>
                </div>
                <p style={p}>Equity, debt, gold and cash have different sources of return and different risks. Their values do not move in a dependable pattern, so diversification can reduce reliance on any one holding but cannot prevent losses.</p>
                <p style={p}>The right allocation is personal. A 30-year-old with a stable salary, no dependents, and a 25-year investment horizon can hold far more equity than a 55-year-old with children in college and retirement three years away. The purpose of an asset allocation calculator is to translate these personal circumstances into specific percentages.</p>
              </div>

              {/* SECTION 2 */}
              <div style={sec}>
                <h2 id="110-minus-age-rule" style={h2s}>The 110 Minus Age Rule: How It Works and Its Limitations</h2>
                <p style={p}>The 110 minus age rule says your equity allocation should equal 110 minus your current age. A 30-year-old holds 80% equity. A 50-year-old holds 60% equity. The rest goes to debt and other stable assets. The rule captures the fundamental principle that younger investors have more time to recover from a market crash and can therefore bear more equity volatility.</p>
                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', fontSize: 13 }}>
                    <caption style={{ fontFamily: INTER, fontSize: 12, color: C.ink3, textAlign: 'left', captionSide: 'bottom', paddingTop: 6 }}>Equity Allocation by Age: 110 Minus Age Rule</caption>
                    <thead>
                      <tr style={{ background: '#f4f5f6' }}>
                        <th scope="col" style={thS}>Age</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Recommended Equity</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Remaining (Debt + Gold + Cash)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[[25,85,15],[30,80,20],[35,75,25],[40,70,30],[45,65,35],[50,60,40],[55,55,45],[60,50,50]].map(([a,eq,rem], i) => (
                        <tr key={a} style={{ background: i % 2 === 0 ? C.white : '#fafafa', borderTop: `1px solid ${C.border}` }}>
                          <td style={tdL}>{a} years</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{eq}%</td>
                          <td style={{ ...tdL, textAlign: 'right' as const }}>{rem}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>The rule ignores income stability, liabilities, existing savings and the date each goal needs the money. This calculator applies a 0.7 multiplier to the baseline for conservative users and 1.3 for aggressive users, capped at 80% equity.</p>
                <p style={p}>Some planners now use 120 minus age, arguing that with life expectancy rising and returns needed for longer, a higher equity allocation is justified. The Retirement Calculator lets you project how different equity allocations affect your final corpus over a 25-30 year period.</p>
              </div>

              {/* SECTION 3 */}
              <div style={sec}>
                <h2 id="asset-classes-india" style={h2s}>Six Major Asset Classes in India: Role and Illustrative Returns</h2>
                <p style={p}>Each asset class serves a different role, but no category has a fixed or guaranteed return.</p>
                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', fontSize: 13 }}>
                    <caption style={{ fontFamily: INTER, fontSize: 12, color: C.ink3, textAlign: 'left', captionSide: 'bottom', paddingTop: 6 }}>Asset Classes in India: Indicative Returns and Role</caption>
                    <thead>
                      <tr style={{ background: '#f4f5f6' }}>
                        <th scope="col" style={thS}>Asset Class</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Indicative Return</th>
                        <th scope="col" style={thS}>Data Basis</th>
                        <th scope="col" style={thS}>Role in Portfolio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Equity (Nifty 50 / large-cap)', '12% illustrative input', 'Calculator assumption, not a forecast', 'Long-term growth exposure with market risk'],
                        ['Debt (G-Secs, FDs, debt MFs)', '7% illustrative input', 'Calculator assumption, not a quote', 'Income and portfolio stability, with product-specific risks'],
                        ['Gold (SGB, gold ETF)', '8% illustrative input', 'Calculator assumption, not a forecast', 'A distinct source of exposure, with price and product risks'],
                        ['International Equity', '11% illustrative input', 'Calculator assumption, not a forecast', 'Geographic and currency exposure'],
                        ['Real Estate', '8% illustrative input', 'Calculator assumption, not a forecast', 'Property or listed real estate exposure, with liquidity and valuation limits'],
                        ['Cash (savings, liquid funds)', '4% illustrative input', 'Calculator assumption, not a current rate', 'Liquidity for near-term needs'],
                      ].map(([asset, ret, basis, role], i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa', borderTop: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600 }}>{asset}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const, fontWeight: 700 }}>{ret}</td>
                          <td style={{ ...tdL, fontSize: 12, color: C.ink3 }}>{basis}</td>
                          <td style={tdL}>{role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>The calculator uses fixed assumptions of 12% for equity, 7% for debt, 8% for gold, 11% for international equity, 8% for real estate and 4% for cash. These values make the weighted-return comparison possible; they are not current market rates or verified historical averages. For current market and policy information, use the official <a href="https://www.nseindia.com/" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>NSE India</a> and <a href="https://www.rbi.org.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>RBI</a> sources.</p>
              </div>

              {/* SECTION 4 */}
              <div style={sec}>
                <h2 id="risk-profiles" style={h2s}>Conservative, Moderate, and Aggressive: Which Profile Fits You?</h2>
                <p style={p}>Your risk profile reflects both how much loss you can financially absorb and how you might react during a market decline. The labels below are simplified, not a suitability assessment.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
                  {[
                    { title: 'Conservative:', desc: 'You prefer smaller portfolio swings and may need the money sooner or have limited capacity to absorb losses. The calculator sets equity at 70% of the age-based baseline.' },
                    { title: 'Moderate:', desc: 'You accept that a diversified portfolio can fall in value and can leave long-term investments untouched through a downturn. The calculator uses the age-based baseline.' },
                    { title: 'Aggressive:', desc: 'You can tolerate larger market movements and have a long time horizon for this money. The calculator sets equity at 130% of the baseline, capped at 80%.' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <div style={{ flexShrink: 0, width: 8, height: 8, borderRadius: '50%', background: C.dark, marginTop: 7 }} aria-hidden="true" />
                      <p style={{ fontFamily: INTER, fontSize: 14.5, color: C.ink2, margin: 0, lineHeight: 1.7 }}>
                        <strong style={{ color: C.ink }}>{item.title}</strong> {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
                <p style={p}>A simple test: Imagine your portfolio of Rs 20 lakh drops to Rs 14 lakh (30% fall) in six months. Do you (a) feel relieved you can buy more at lower prices, (b) feel nervous but hold on, or (c) feel you need to move money to safety? Answer (a) suggests aggressive, (b) moderate, (c) conservative. Use the <Link href="/calculators/nps-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>NPS Calculator</Link> to model how a conservative vs aggressive NPS allocation affects your retirement corpus.</p>
              </div>

              <div style={sec}>
                <h2 id="asset-allocation-formula" style={h2s}>Asset Allocation Formula: A Worked Example</h2>
                <p style={p}>The weighted expected return is the sum of each asset's portfolio weight multiplied by its assumed annual return. For a 32-year-old moderate investor with Rs 10 lakh, the calculator assigns Rs 7.8 lakh to equity, Rs 1.7 lakh to debt, Rs 20,000 each to gold and international equity, and Rs 10,000 to cash.</p>
                <p style={p}>Using the illustrative rates built into the tool, the calculation is: (78% x 12%) + (17% x 7%) + (2% x 8%) + (2% x 11%) + (1% x 4%) = 10.97% a year. This is a mathematical estimate, not a forecast.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', paddingTop: 6, color: C.ink3, fontSize: 11 }}>Terms used in the weighted-return calculation.</caption>
                    <thead><tr style={{ background: '#f4f5f6' }}><th scope="col" style={thS}>Symbol</th><th scope="col" style={thS}>Meaning</th><th scope="col" style={thS}>Example</th></tr></thead>
                    <tbody>
                      {[
                        ['w_i', 'Weight of asset i: its value divided by total portfolio value', '0.78'],
                        ['r_i', 'Assumed annual return for asset i', '12%'],
                        ['R_p', 'Portfolio weighted expected return', '10.97%'],
                      ].map(([symbol, meaning, example], index) => <tr key={symbol} style={{ background: index % 2 === 0 ? C.white : '#fafafa' }}><td style={tdL}>{symbol}</td><td style={tdL}>{meaning}</td><td style={tdR}>{example}</td></tr>)}
                    </tbody>
                  </table>
                </div>
                <p style={p}><strong>Formula:</strong> R_p = sum of (w_i x r_i). An asset's contribution to the portfolio return is (w_i x r_i) divided by R_p, multiplied by 100. A weighted average must fall between the lowest and highest return assumptions entered.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', paddingTop: 6, color: C.ink3, fontSize: 11 }}>Illustrative profile comparison using the calculator's risk multipliers and return assumptions.</caption>
                    <thead><tr style={{ background: '#f4f5f6' }}><th scope="col" style={thS}>Profile</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>Equity</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>Debt</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>Gold</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>International</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>Cash</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>Weighted return</th></tr></thead>
                    <tbody>
                      {[
                        ['Conservative', '55%', '32%', '5%', '5%', '3%', '9.91%'],
                        ['Moderate', '78%', '17%', '2%', '2%', '1%', '10.97%'],
                        ['Aggressive', '80%', '15%', '2%', '2%', '1%', '11.07%'],
                      ].map((row, index) => <tr key={row[0]} style={{ background: index % 2 === 0 ? C.white : '#fafafa' }}>{row.map((value, cell) => <td key={cell} style={cell === 0 ? tdL : { ...tdR, textAlign: 'right' }}>{value}</td>)}</tr>)}
                    </tbody>
                  </table>
                </div>
                    <p style={p}>The calculator assigns 2% to gold in this moderate example because its rule allocates a fixed share of the remaining portfolio. Treat that as a baseline, not a recommended maximum. If a separate plan calls for 5% to 8% gold, the extra allocation can come from debt, but the current calculator does not let you edit its target weights directly.</p>
              </div>

              <div style={sec}>
                <h2 id="asset-allocation-by-age-india" style={h2s}>Asset Allocation by Age in India: 20s, 30s, 40s, 50s and 60+</h2>
                <p style={p}>Age can inform an allocation, but the date you need the money and your capacity to absorb losses matter just as much. These ranges are illustrative discussion points, not prescribed portfolios.</p>
                {[
                  { title: 'In your 20s: build the base', mix: 'Illustrative equity range: 70% to 85%; debt and cash: 10% to 25%; gold: 0% to 10%.', goal: 'Build an emergency reserve, repay expensive debt and begin long-term investing.', mistake: 'Taking more market risk than you can sustain because retirement feels far away.' },
                  { title: 'In your 30s: balance growth with commitments', mix: 'Illustrative equity range: 65% to 80%; debt and cash: 15% to 30%; gold: 5% to 10%.', goal: 'Plan for a home, children, family protection and retirement at the same time.', mistake: 'Treating the home down payment or emergency reserve as long-term equity money.' },
                  { title: 'In your 40s: protect goal money', mix: 'Illustrative equity range: 50% to 70%; debt and cash: 25% to 45%; gold: 5% to 10%.', goal: 'Fund education and retirement while keeping near-term goals out of volatile assets.', mistake: 'Leaving every goal in one portfolio without separating dates and required amounts.' },
                  { title: 'In your 50s: manage the transition', mix: 'Illustrative equity range: 35% to 60%; debt and cash: 35% to 60%; gold: 5% to 10%.', goal: 'Reduce the chance that a market fall coincides with the first years of withdrawals.', mistake: 'Making a sudden, all-at-once shift based only on a birthday or market headline.' },
                  { title: 'At 60 and beyond: match assets to withdrawals', mix: 'Illustrative equity range: 20% to 45%; debt and cash: 45% to 75%; gold: 0% to 10%.', goal: 'Keep planned near-term spending accessible while retaining growth for a long retirement.', mistake: 'Assuming retirement means every rupee should move to low-growth assets.' },
                ].map(item => <div key={item.title} style={{ marginBottom: 14 }}><h3 style={h3s}>{item.title}</h3><p style={{ ...p, marginBottom: 5 }}><strong>Illustrative mix:</strong> {item.mix}</p><p style={{ ...p, marginBottom: 5 }}><strong>Common goals:</strong> {item.goal}</p><p style={{ ...p, marginBottom: 0 }}><strong>Watch for:</strong> {item.mistake}</p></div>)}
              </div>

              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Planning for retirement?</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Estimate a retirement corpus separately from this allocation comparison.</p>
                </div>
                <Link className="fx-btn" href="/calculators/retirement-calculator" target="_blank" rel="noopener noreferrer" style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
              </div>

              <div style={sec}>
                <h2 id="asset-allocation-goal-horizon" style={h2s}>Asset Allocation by Goal Horizon</h2>
                <p style={p}>A goal's time horizon should shape the amount of equity risk you take with its money. The shorter the time until a required withdrawal, the less room there is to wait through a market decline.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', textAlign: 'left', paddingTop: 6, color: C.ink3, fontSize: 11 }}>Illustrative ranges only. Select instruments based on the goal date and ability to accept losses.</caption>
                  <thead><tr style={{ background: '#f4f5f6' }}><th scope="col" style={thS}>Time to goal</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>Equity</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>Debt and cash</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>Gold</th><th scope="col" style={thS}>Examples to research</th></tr></thead>
                  <tbody>{[
                    ['Under 3 years', '0% to 20%', '75% to 100%', '0% to 10%', 'Savings, short-duration deposits, liquid instruments'],
                    ['3 to 5 years', '20% to 40%', '55% to 75%', '0% to 10%', 'High-quality deposits and short-duration debt'],
                    ['5 to 10 years', '40% to 65%', '30% to 55%', '5% to 10%', 'Diversified equity and debt investments'],
                    ['Over 10 years', '55% to 80%', '15% to 40%', '5% to 10%', 'Diversified equity, EPF/PPF where suitable, debt'],
                  ].map((row, index) => <tr key={row[0]} style={{ background: index % 2 === 0 ? C.white : '#fafafa' }}>{row.map((value, cell) => <td key={cell} style={cell === 0 || cell === 4 ? tdL : { ...tdR, textAlign: 'right' }}>{value}</td>)}</tr>)}</tbody>
                </table></div>
              </div>

              <div style={sec}>
                <h2 id="best-investment-instruments" style={h2s}>Investment Instruments for Each Asset Class in India</h2>
                <p style={p}>An asset class can be held through products with different costs, liquidity, tax treatment and risks. Compare the product's terms, not just its category name.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', textAlign: 'left', paddingTop: 6, color: C.ink3, fontSize: 11 }}>Examples are broad product categories, not recommendations for specific funds or securities.</caption>
                  <thead><tr style={{ background: '#f4f5f6' }}><th scope="col" style={thS}>Class</th><th scope="col" style={thS}>Common instruments</th><th scope="col" style={thS}>Trade-off to check</th></tr></thead>
                  <tbody>{[
                    ['Equity', 'Broad-market index funds, diversified active funds, ETFs, direct shares', 'Market falls, concentration, tracking difference, fund costs and dealing discipline.'],
                    ['Debt', 'EPF, PPF, deposits, high-quality debt funds, government securities', 'Lock-ins, liquidity, interest-rate risk, credit quality and tax treatment.'],
                    ['Gold', 'Sovereign Gold Bonds, gold ETFs, physical gold', 'Liquidity and product terms, storage or fund costs, price volatility and applicable tax rules.'],
                    ['International equity', 'International mutual funds, fund-of-funds and ETFs where available', 'Currency movements, product access, costs and current investment limits. Check guidance from the <a href="https://www.sebi.gov.in/" target="_blank" rel="noopener noreferrer">SEBI</a> and <a href="https://www.rbi.org.in/" target="_blank" rel="noopener noreferrer">RBI</a>.'],
                    ['Cash', 'Savings accounts and liquid funds', 'Access, return after tax, deposit terms and underlying fund risks.'],
                  ].map((row, index) => <tr key={row[0]} style={{ background: index % 2 === 0 ? C.white : '#fafafa' }}><td style={tdL}>{row[0]}</td><td style={tdL}>{row[1]}</td><td style={tdL} dangerouslySetInnerHTML={{ __html: row[2] }} /></tr>)}</tbody>
                </table></div>
                <p style={p}>Use the <a href="https://www.amfiindia.com/" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>AMFI investor resources</a> to understand mutual fund categories and disclosures. Product rules and access can change, so verify current documents before investing.</p>
              </div>

              <div style={sec}>
                <h2 id="tax-treatment-rebalancing" style={h2s}>Tax Treatment of Portfolio Rebalancing in India</h2>
                <p style={p}>Rebalancing can create a taxable event when an investment is sold, and the result depends on the product, acquisition date, holding period and tax rules for that year. The table below is a general checklist, not a tax calculation.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', textAlign: 'left', paddingTop: 6, color: C.ink3, fontSize: 11 }}>Tax categories are simplified. Verify the rules for your transaction and assessment year.</caption>
                  <thead><tr style={{ background: '#f4f5f6' }}><th scope="col" style={thS}>Holding</th><th scope="col" style={thS}>What to verify before selling</th></tr></thead>
                  <tbody>{[
                    ['Listed equity and equity-oriented funds', 'Holding period classification, applicable rate, threshold or exemption, and transaction-specific conditions.'],
                    ['Debt mutual funds', 'Acquisition date and the tax provisions applicable to that fund and holding.'],
                    ['Gold and international funds', 'Product structure, acquisition date, holding period and current capital-gains classification.'],
                    ['SGBs and property', 'Issue or purchase terms, transfer route, holding period and any conditions for exemptions.'],
                    ['EPF and PPF', 'Contribution limits, account rules, withdrawal conditions and the tax treatment that applies to the investor.'],
                  ].map((row, index) => <tr key={row[0]} style={{ background: index % 2 === 0 ? C.white : '#fafafa' }}><td style={tdL}>{row[0]}</td><td style={tdL}>{row[1]}</td></tr>)}</tbody>
                </table></div>
                <p style={p}>For example, selling an investment for Rs 1.8 lakh does not mean the taxable gain is Rs 1.8 lakh. If its documented purchase cost were Rs 1.5 lakh, the simple gain before fees would be Rs 30,000. The tax cost depends on the asset, applicable exemptions and current law, so calculate it using the rules for the relevant tax year.</p>
                <p style={p}>Redirecting fresh contributions to underweight assets can reduce the need to sell. Verify each transaction against the current <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Department guidance</a> and the applicable Finance Act before rebalancing.</p>
              </div>

              <div style={sec}>
                <h2 id="rebalancing-example" style={h2s}>Rebalancing Example with Numbers</h2>
                <p style={p}>A Rs 10 lakh portfolio at 60% equity, 25% debt, 8% gold, 5% international equity and 2% cash can drift from a target of 55%, 30%, 8%, 5% and 2%. The example below moves Rs 50,000 from equity to debt to restore that target.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', textAlign: 'left', paddingTop: 6, color: C.ink3, fontSize: 11 }}>Illustrative rebalancing for a portfolio valued at Rs 10 lakh.</caption>
                  <thead><tr style={{ background: '#f4f5f6' }}><th scope="col" style={thS}>Asset</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>Current</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>Target</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>Target value</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>Change</th></tr></thead>
                  <tbody>{[
                    ['Equity', '60%', '55%', 'Rs 5,50,000', '-Rs 50,000'],
                    ['Debt', '25%', '30%', 'Rs 3,00,000', '+Rs 50,000'],
                    ['Gold', '8%', '8%', 'Rs 80,000', 'No change'],
                    ['International equity', '5%', '5%', 'Rs 50,000', 'No change'],
                    ['Real estate', '0%', '0%', 'Rs 0', 'No change'],
                    ['Cash', '2%', '2%', 'Rs 20,000', 'No change'],
                  ].map((row, index) => <tr key={row[0]} style={{ background: index % 2 === 0 ? C.white : '#fafafa' }}>{row.map((value, cell) => <td key={cell} style={cell === 0 ? tdL : { ...tdR, textAlign: 'right' }}>{value}</td>)}</tr>)}</tbody>
                </table></div>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', textAlign: 'left', paddingTop: 6, color: C.ink3, fontSize: 11 }}>Two ways to move closer to target. Selling may create tax and transaction costs.</caption>
                  <thead><tr style={{ background: '#f4f5f6' }}><th scope="col" style={thS}>Method</th><th scope="col" style={thS}>How it works</th><th scope="col" style={thS}>Main trade-off</th></tr></thead>
                  <tbody>
                    <tr><td style={tdL}>Redirect contributions</td><td style={tdL}>Direct new SIPs or deposits to debt until the portfolio moves nearer its target.</td><td style={tdL}>Avoids selling now, but takes time and the allocation can keep moving with markets.</td></tr>
                    <tr><td style={tdL}>Sell and buy</td><td style={tdL}>Sell the overweight holding and use proceeds to buy the underweight asset.</td><td style={tdL}>Restores the target faster, but may incur tax, exit loads or dealing costs.</td></tr>
                  </tbody>
                </table></div>
              </div>

              <div style={sec}>
                <h2 id="allocation-diversification-location" style={h2s}>Asset Allocation vs Diversification vs Asset Location</h2>
                <p style={p}>These terms describe different portfolio decisions: what broad assets to own, how widely to spread holdings, and which account or product should hold them.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', textAlign: 'left', paddingTop: 6, color: C.ink3, fontSize: 11 }}>Three related decisions in portfolio construction.</caption>
                  <thead><tr style={{ background: '#f4f5f6' }}><th scope="col" style={thS}>Decision</th><th scope="col" style={thS}>Question answered</th><th scope="col" style={thS}>Example</th></tr></thead>
                  <tbody>
                    <tr><td style={tdL}>Asset allocation</td><td style={tdL}>How much belongs in each asset class?</td><td style={tdL}>60% equity, 30% debt, 10% gold.</td></tr>
                    <tr><td style={tdL}>Diversification</td><td style={tdL}>How widely are holdings spread?</td><td style={tdL}>A broad-market fund rather than one company share.</td></tr>
                    <tr><td style={tdL}>Asset location</td><td style={tdL}>Which eligible account or product holds an asset?</td><td style={tdL}>Choosing between a taxable account and a tax-advantaged account where available.</td></tr>
                  </tbody>
                </table></div>
              </div>

              <div style={sec}>
                <h2 id="asset-allocation-strategies" style={h2s}>Asset Allocation Strategies Compared</h2>
                <p style={p}>A strategy sets how and when you will change the portfolio mix. A written rule can prevent short-term market moves from dictating every decision.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', textAlign: 'left', paddingTop: 6, color: C.ink3, fontSize: 11 }}>Strategy descriptions are general and do not imply a guaranteed outcome.</caption>
                  <thead><tr style={{ background: '#f4f5f6' }}><th scope="col" style={thS}>Approach</th><th scope="col" style={thS}>Rule</th><th scope="col" style={thS}>Consideration</th></tr></thead>
                  <tbody>{[
                    ['Strategic', 'Set a long-term target and rebalance when it drifts.', 'Requires a target that reflects goals and risk capacity.'],
                    ['Tactical', 'Make limited, short-term deviations from the target.', 'Needs clear limits; repeated market calls can add costs and risk.'],
                    ['Dynamic or age-based', 'Adjust the mix as age, horizon or circumstances change.', 'Age alone may not show how much risk an investor can tolerate.'],
                    ['Core-satellite', 'Use a broad diversified core with smaller focused holdings.', 'The satellite portion can raise concentration and costs.'],
                    ['Glide path', 'Reduce risk gradually as a known goal date approaches.', 'The path should reflect withdrawal timing, not a generic calendar.'],
                  ].map((row, index) => <tr key={row[0]} style={{ background: index % 2 === 0 ? C.white : '#fafafa' }}>{row.map((value, cell) => <td key={cell} style={tdL}>{value}</td>)}</tr>)}</tbody>
                </table></div>
              </div>

              <div style={sec}>
                <h2 id="life-events-review" style={h2s}>Life Events That Should Trigger an Allocation Review</h2>
                <p style={p}>Review your asset allocation when a life change alters your income, liabilities, dependants or the date you need invested money.</p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 22, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li style={{ ...p, margin: 0 }}><strong>Job change:</strong> Recheck income stability, employer-linked benefits and emergency savings.</li>
                  <li style={{ ...p, margin: 0 }}><strong>Marriage or a child:</strong> Revisit dependants, insurance and shared goals.</li>
                  <li style={{ ...p, margin: 0 }}><strong>Home loan:</strong> Account for the EMI and the amount of liquid savings available.</li>
                  <li style={{ ...p, margin: 0 }}><strong>Inheritance:</strong> Decide how the money fits existing goals before investing it.</li>
                  <li style={{ ...p, margin: 0 }}><strong>Retirement:</strong> Match accessible assets to the timing and size of planned withdrawals.</li>
                </ul>
              </div>

              {/* SECTION 5 */}
              <div style={sec}>
                <h2 id="how-to-rebalance" style={h2s}>How to Rebalance a Portfolio: Timing and Method</h2>
                <p style={p}>Rebalancing restores the portfolio to its target allocation after market movements push asset classes away from their targets. Without rebalancing, a 70% equity portfolio that benefits from a three-year bull market can drift to 85% equity, taking on significantly more risk than intended.</p>
                <p style={p}>Two common approaches: Annual rebalancing (once per year on a fixed date, regardless of market conditions) and threshold rebalancing (whenever any asset class drifts more than 5 percentage points from its target). Annual rebalancing is sufficient for most investors and minimises transaction costs and tax events. Threshold rebalancing adds a market-timing element that can improve returns in volatile markets.</p>
                <p style={p}>Redirecting new contributions toward underweight assets can reduce the need to sell holdings, though it may take time to restore the target. A redemption may create a taxable gain depending on the product, purchase date, holding period and rules for the relevant tax year. Check the current Income Tax Department guidance before selling. The <Link href="/calculators/cagr-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>CAGR Calculator</Link> can help compare growth rates, but it does not calculate tax.</p>
              </div>

              {/* SECTION 6 */}
              <div style={sec}>
                <h2 id="diversification-benefits" style={h2s}>Why Diversification Reduces Risk Without Proportionally Reducing Returns</h2>
                <p style={p}>Diversification spreads money across assets that can respond differently to the same events. It can reduce dependence on a single company, asset class or market, but it cannot remove market risk or guarantee a smoother result.</p>
                <p style={p}>The benefit depends on the assets held and how their prices move together. Correlations change over time, so a historical relationship should not be treated as a permanent feature of a portfolio.</p>
                <p style={p}>Gold may add another source of exposure, but its share should reflect the investor's goals and risk capacity. The <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SIP Calculator</Link> can model regular contributions; it does not compare portfolio risk.</p>
              </div>

              {/* SECTION 7 */}
              <div style={sec}>
                <h2 id="common-mistakes" style={h2s}>Common Asset Allocation Mistakes Indian Investors Make</h2>
                <p style={p}>Common mistakes include treating age as the only input, overlooking liquidity and assuming that diversification prevents losses.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 16 }}>
                  {[
                    { title: 'Investing before setting aside emergency money:', text: 'Money set aside for a job loss or urgent expense should remain accessible. Keep that reserve separate from long-term investments so a market fall does not force you to sell at a difficult time.' },
                    { title: 'Counting EPF or PPF as fully accessible debt:', text: 'These products have their own account, contribution and withdrawal rules. Include them in a broad household balance sheet, but do not treat every rupee as liquid or available for near-term rebalancing.' },
                    { title: 'Treating gold as a guaranteed hedge:', text: 'Gold prices can fall and may not rise when another asset falls. A gold holding also has product-specific liquidity, cost and tax considerations. Choose its portfolio share deliberately rather than assuming it will always protect against inflation.' },
                    { title: 'Ignoring international diversification:', text: 'An India-only portfolio concentrates market and currency exposure. International investments add other markets and currencies, but can also fall and have product-specific access and tax rules. The <a href="/calculators/investment-comparison-calculator" target="_blank" rel="noopener noreferrer" style="color:#101214;font-weight:600">Investment Comparison Calculator</a> lets you compare investment scenarios.' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <div style={{ flexShrink: 0, width: 24, height: 24, borderRadius: '50%', background: C.lime2, color: C.dark, fontFamily: INTER, fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>{i + 1}</div>
                      <div>
                        <p style={{ fontFamily: INTER, fontSize: 14.5, fontWeight: 600, color: C.ink, margin: '0 0 3px', lineHeight: 1.3 }}>{item.title}</p>
                        <p style={{ fontFamily: INTER, fontSize: 14, color: C.ink2, margin: 0, lineHeight: 1.65 }} dangerouslySetInnerHTML={{ __html: item.text }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 8 */}
              <div style={sec}>
                <h2 id="model-portfolios-by-age" style={h2s}>Model Portfolios by Age: 25, 35, 45, and 55 Years</h2>
                <p style={p}>The following model portfolios assume a moderate risk profile, stable employment income and an existing emergency fund. This model table follows a more conservative glide path than the base 110 minus age rule. Its total-equity row includes international equity.</p>
                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', fontSize: 13 }}>
                    <caption style={{ fontFamily: INTER, fontSize: 12, color: C.ink3, textAlign: 'left', captionSide: 'bottom', paddingTop: 6 }}>Model Asset Allocation by Age: Moderate Risk Profile</caption>
                    <thead>
                      <tr style={{ background: '#f4f5f6' }}>
                        <th scope="col" style={thS}>Asset Class</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Age 25</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Age 35</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Age 45</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Age 55</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Equity (Indian)', '65%', '55%', '45%', '35%'],
                        ['International Equity', '20%', '15%', '10%', '8%'],
                        ['Debt', '7%', '20%', '33%', '45%'],
                        ['Gold', '5%', '7%', '8%', '8%'],
                        ['Cash', '3%', '3%', '4%', '4%'],
                        ['Total Equity (Incl. Intl)', '85%', '70%', '55%', '43%'],
                      ].map(([asset, ...vals], i) => (
                        <tr key={i} style={{ background: asset === 'Total Equity (Incl. Intl)' ? '#f4f5f6' : i % 2 === 0 ? C.white : '#fafafa', borderTop: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: asset === 'Total Equity (Incl. Intl)' ? 700 : 400, borderLeft: asset === 'Total Equity (Incl. Intl)' ? `3px solid ${C.lime2}` : '3px solid transparent' }}>{asset}</td>
                          {vals.map((v, j) => (
                            <td key={j} style={{ ...tdR, textAlign: 'right' as const, fontWeight: asset === 'Total Equity (Incl. Intl)' ? 700 : 500 }}>{v}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>Using the calculator's illustrative assumptions, the age-25 model mix has a weighted return of about 11.0% and the age-55 mix about 9.0%. These are arithmetic results from the assumptions, not historical averages or a promise of future growth. Plan the retirement trajectory using the <Link href="/calculators/retirement-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Retirement Calculator</Link>.</p>
              </div>

              {/* SECTION 9 */}
              <div style={sec}>
                <h2 id="how-to-use-calculator" style={h2s}>How to Use This Asset Allocation Calculator</h2>
                <p style={p}>Use this asset allocation calculator to compare your current holdings with an age- and risk-based target, then review the indicative return and rebalancing amounts.</p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, fontFamily: INTER }}>
                    <strong style={{ color: C.ink }}>Set age and risk profile:</strong> Use the age slider and risk profile toggle on the first input page. The calculator immediately shows the recommended equity percentage using the 110 minus age rule adjusted for your chosen risk profile.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, fontFamily: INTER }}>
                    <strong style={{ color: C.ink }}>Enter portfolio size:</strong> The portfolio size input converts recommended percentages into rupee amounts. If your target portfolio is Rs 25 lakh, the recommended allocation for each asset class appears in rupees.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, fontFamily: INTER }}>
                    <strong style={{ color: C.ink }}>Enter current holdings:</strong> Click "Current holdings" to go to the second input page and enter the current rupee amount in each asset class. The donut chart updates instantly to show your current allocation breakdown.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, fontFamily: INTER }}>
                    <strong style={{ color: C.ink }}>Review the rebalancing plan:</strong> The rebalancing table shows Buy, Hold, or Reduce for each asset class based on your current holdings versus the recommended target amounts. A positive amount means increase the holding; a negative amount means reduce it.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, fontFamily: INTER }}>
                    <strong style={{ color: C.ink }}>Compare expected returns:</strong> The results panel shows the weighted expected annual return for both your current allocation and the recommended allocation. This is an indicative planning figure, not a guarantee.
                  </li>
                </ol>
                <p style={p}>Your inputs are saved automatically in your browser. Refreshing the page restores your last calculation.</p>
              </div>


              {/* FAQ SECTION */}
              <div style={{ margin: '0 0 40px' }}>
                <h2 id="faq" style={h2s}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <section id="related-calculators" style={{ ...sec, marginBottom: 40 }}>
                <h2 id="related-calculators-heading" style={h2s}>Related Calculators</h2>
                <p style={p}>Use a related tool when you need to project contributions, compare returns or assess inflation's effect on purchasing power.</p>
                <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 10 }}>
                  {[
                    ['/calculators/sip-calculator', 'SIP Calculator', 'Estimate the future value of monthly investments.'],
                    ['/calculators/retirement-calculator', 'Retirement Calculator', 'Estimate a retirement corpus and income requirement.'],
                    ['/calculators/nps-calculator', 'NPS Calculator', 'Model National Pension System contributions and corpus.'],
                    ['/calculators/cagr-calculator', 'CAGR Calculator', 'Measure annualised growth between two values.'],
                    ['/calculators/investment-comparison-calculator', 'Investment Comparison Calculator', 'Compare illustrative investment outcomes.'],
                    ['/calculators/fd-calculator', 'FD Calculator', 'Estimate fixed-deposit maturity value.'],
                    ['/calculators/ppf-calculator', 'PPF Calculator', 'Project a Public Provident Fund balance.'],
                    ['/calculators/inflation-calculator', 'Inflation Calculator', 'Compare purchasing power across years.'],
                  ].map(([href, title, description]) => <Link key={href} href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '14px 16px', border: `1px solid ${C.border}`, borderRadius: 8, color: C.ink, background: C.white, textDecoration: 'none' }}><strong style={{ display: 'block', fontSize: 14, marginBottom: 4 }}>{title}</strong><span style={{ fontSize: 12, color: C.ink2, lineHeight: 1.5 }}>{description}</span></Link>)}
                </div>
              </section>

              {/* DISCLAIMER */}
              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0, fontFamily: INTER }}>
                  <strong>Disclaimer:</strong> All calculations and return assumptions on this page are illustrative and do not predict future performance. The age-based allocation is a simplified rule, not personalised advice. Tax rules and investment terms may change; verify current requirements with <a href="https://www.epfindia.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.ink }}>EPFO</a>, <a href="https://www.rbi.org.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.ink }}>RBI</a>, <a href="https://www.sebi.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.ink }}>SEBI</a> and the <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" style={{ color: C.ink }}>Income Tax Department</a> before making decisions. This page is for education only and is not investment advice. Consult a SEBI-registered investment adviser before making portfolio decisions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.asset-alloc-sidebar::-webkit-scrollbar{width:5px}.asset-alloc-sidebar::-webkit-scrollbar-track{background:transparent}.asset-alloc-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.asset-alloc-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="asset-alloc-sidebar" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {!mobile && (
                <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 20px' }}>
                  <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dark, marginBottom: 14 }}>Portfolio Summary</div>
                  {([
                    ['Recommended Equity', `${recommended.equity}%`, true],
                    ['Recommended Debt', `${recommended.debt}%`, false],
                    ['Recommended Gold', `${recommended.gold}%`, false],
                    ['Recommended Intl', `${recommended.international}%`, false],
                    ['Indicative Return', `${recommendedReturn.toFixed(1)}% p.a.`, true],
                  ] as [string, string, boolean][]).map(([label, val, highlight], i) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: i < 4 ? `1px solid ${C.border}` : 'none' }}>
                      <span style={{ fontFamily: INTER, fontSize: 12.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontFamily: INTER, fontSize: 12.5, fontWeight: 600, color: C.dark }}>{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Quick reference */}
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 20px' }}>
                <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dark, marginBottom: 14 }}>Indicative Return Assumptions</div>
                {([
                  ['Equity (Nifty 50)',      '12% p.a.'],
                  ['International Equity',  '11% p.a.'],
                  ['Debt',                  '7% p.a.'],
                  ['Gold',                  '8% p.a.'],
                  ['Real Estate',           '8% p.a.'],
                  ['Cash / Liquid',         '4% p.a.'],
                ] as [string, string][]).map(([label, val], i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: `1px solid ${C.border}` }}>
                    <span style={{ fontFamily: INTER, fontSize: 12.5, color: C.ink2 }}>{label}</span>
                    <span style={{ fontFamily: INTER, fontSize: 12.5, fontWeight: 600, color: C.dark }}>{val}</span>
                  </div>
                ))}
                <div style={{ fontSize: 11, color: C.ink3, marginTop: 10, lineHeight: 1.55, fontFamily: INTER }}>Historical averages only. Not guaranteed future returns.</div>
              </div>

              {/* Related calculators */}
              <nav aria-label="Related Calculators">
                <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 20px' }}>
                  <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dark, marginBottom: 14 }}>Related Calculators</div>
                  {[
                    { href: '/calculators/sip-calculator', label: 'SIP Calculator' },
                    { href: '/calculators/retirement-calculator', label: 'Retirement Calculator' },
                    { href: '/calculators/nps-calculator', label: 'NPS Calculator' },
                    { href: '/calculators/cagr-calculator', label: 'CAGR Calculator' },
                    { href: '/calculators/investment-comparison-calculator', label: 'Investment Comparison' },
                    { href: '/calculators/lumpsum-calculator', label: 'Lumpsum Calculator' },
                    { href: '/calculators/goal-planning-calculator', label: 'Goal Planning Calculator' },
                  ].map(({ href, label }, i, arr) => (
                    <Link key={href} href={href} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none' }}>
                      <span style={{ fontFamily: INTER, fontSize: 12.5, color: C.ink2 }}>{label}</span>
                      <span style={{ color: C.ink3, fontSize: 16 }}>&#8250;</span>
                    </Link>
                  ))}
                </div>
              </nav>

              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: '14px 18px' }}>
                <div style={{ fontSize: 11, color: C.ink3, marginBottom: 4, fontFamily: INTER }}>Last Updated</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.ink, fontFamily: INTER }}>September 2026</div>
                <div style={{ fontSize: 11, color: C.ink3, marginTop: 6, lineHeight: 1.6, fontFamily: INTER }}>Returns are indicative. Consult a SEBI-registered adviser before investing.</div>
              </div>

            </div>
          </aside>
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/sip-calculator|SIP','/calculators/lumpsum-calculator|Lumpsum','/calculators/nps-calculator|NPS','/calculators/ppf-calculator|PPF','/calculators/fd-calculator|FD','/calculators/emi-calculator|EMI','/calculators/income-tax-calculator|Income Tax','/calculators/cagr-calculator|CAGR','/calculators/retirement-calculator|Retirement','/calculators/capital-gains-calculator|Capital Gains'] },
        { hd: 'Topics', links: ['/calculators/sip-calculator|Mutual Funds','/calculators/home-loan-calculator|Home Loans','/calculators/fd-calculator|Fixed Deposits','/calculators/nps-calculator|Retirement'] },
        { hd: 'Company', links: ['/about|About','/privacy|Privacy Policy','/terms|Terms of Use','/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice. Consult a SEBI-registered adviser." />
    </div>
  );
}

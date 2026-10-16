'use client';

import { CHART_PAIR, seriesColor } from '../../../src/theme/chartPalette';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { PageNav } from '../../../src/components/common/PageNav';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import { FAQBox } from '@/components/common/FAQBox';

const C = {
  dark: '#101214', lime: '#a6dbc4', lime2: '#2d9970', paleLime: '#f4f5f6',
  ink: '#16140F', ink2: '#50565c', ink3: '#7a8087',
  white: '#ffffff', bg: '#f6f7f8', border: '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

function fmtN(n: number, d = 0) { return n.toLocaleString('en-IN', { maximumFractionDigits: d, minimumFractionDigits: d }); }
function fmtPct(n: number) { return n.toFixed(2) + '%'; }

interface FaqItem { q: string; a: string; }

// ---- MultiDonutChart ----
function MultiDonutChart({
  segments,
  centerLabel = 'Total',
  centerValue = '',
}: {
  segments: { value: number; color: string; label: string }[];
  centerLabel?: string;
  centerValue?: string;
}) {
  const total = segments.reduce((sum, s) => sum + Math.max(0, s.value), 0);
  if (total <= 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  
  let currentOffset = circ / 4;
  const renderedArcs = segments.map(s => {
    const pct = Math.max(0, s.value) / total;
    const arcLen = pct * circ;
    const offset = currentOffset;
    currentOffset -= arcLen;
    return {
      color: s.color,
      label: s.label,
      pct: Math.round(pct * 100),
      dashArray: `${arcLen} ${circ - arcLen}`,
      dashOffset: offset,
    };
  });

  const topPct = renderedArcs.length > 0 ? renderedArcs[0].pct : 0;

  return (
    <svg role="img" aria-label={segments.map(s => `${s.label}: ${Math.round((s.value / total) * 100)}%`).join(', ')}
      width="216" height="216" viewBox="0 0 216 216" style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.border} strokeWidth={sw} />
      {renderedArcs.map((arc, i) => (
        <circle key={i} cx={cx} cy={cy} r={R} fill="none" stroke={arc.color} strokeWidth={sw}
          strokeDasharray={arc.dashArray} strokeDashoffset={arc.dashOffset}
          style={{ transition: 'stroke-dasharray 0.4s ease, stroke-dashoffset 0.4s ease' }} />
      ))}
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>
        {centerLabel}
      </text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 22, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>
        {centerValue || `${topPct}%`}
      </text>
    </svg>
  );
}

// ---- Slider ----
function Slider({ label, id, value, min, max, step, display, onChange }: {
  label: string; id: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (v: number) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <label htmlFor={`${id}-range`} style={{ fontSize: 13, color: C.ink2, fontFamily: INTER }}>{label}</label>
        {editing ? (
          <input id={id} type="number" value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={() => { const v = parseFloat(raw); if (!isNaN(v)) onChange(Math.min(max, Math.max(min, v))); setEditing(false); }}
            onKeyDown={e => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
            style={{ fontSize: 13, fontWeight: 600, color: C.ink, background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 6, padding: '3px 8px', width: 110, textAlign: 'right', fontFamily: INTER }}
            autoFocus />
        ) : (
          <button aria-label={`${label}: ${display}. Click to edit.`} onClick={() => { setRaw(String(value)); setEditing(true); }}
            style={{ fontSize: 13, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 6, padding: '3px 8px', cursor: 'pointer', fontFamily: INTER }}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')} onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}>
            {display}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 18, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, height: 4, borderRadius: 2, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)` }} />
        <input id={`${id}-range`} type="range" min={min} max={max} step={step} value={value}
          aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
          onChange={e => onChange(parseFloat(e.target.value))}
          style={{ position: 'relative', width: '100%', appearance: 'none', background: 'transparent', cursor: 'pointer', zIndex: 1 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: C.ink3, marginTop: 2 }}>
        <span>{min.toLocaleString('en-IN')}</span><span>{max.toLocaleString('en-IN')}</span>
      </div>
    </div>
  );
}

// ---- Core calculation ----
interface YearRow {
  yr: number;
  openingBalance: number;
  contribution: number;         // total deposited this year
  interestEarned: number;
  closingBalance: number;
  totalContributions: number;
  totalInterest: number;
  realValue: number;             // inflation-adjusted
  goalCrossed: boolean;
}

function calcSavingsGrowth(params: {
  startingBalance: number;
  monthlyDeposit: number;
  annualRate: number;
  years: number;
  compFreq: number;              // 12=monthly, 4=quarterly, 1=annual
  stepUpPct: number;             // 0 = no step-up
  inflationPct: number;
  goalAmt: number;
}): YearRow[] {
  const { startingBalance, monthlyDeposit, annualRate, years, compFreq, stepUpPct, inflationPct, goalAmt } = params;
  const ratePerPeriod = annualRate / 100 / compFreq;
  const monthsPerPeriod = 12 / compFreq;
  const rows: YearRow[] = [];
  let balance = startingBalance;
  let totalContributions = startingBalance;
  let currentMonthlyDeposit = monthlyDeposit;
  let goalCrossedYet = false;

  for (let yr = 1; yr <= years; yr++) {
    const openingBalance = balance;
    // Each period, compound once and add deposits
    let yearInterest = 0;
    let yearContribution = 0;
    for (let p = 0; p < compFreq; p++) {
      // Add monthly deposits for this period
      const depositThisPeriod = currentMonthlyDeposit * monthsPerPeriod;
      balance += depositThisPeriod;
      yearContribution += depositThisPeriod;
      // Compound
      const interest = balance * ratePerPeriod;
      balance += interest;
      yearInterest += interest;
    }
    totalContributions += yearContribution;
    const totalInterest = balance - totalContributions;
    const realValue = balance / Math.pow(1 + inflationPct / 100, yr);
    const goalCrossed = !goalCrossedYet && goalAmt > 0 && balance >= goalAmt;
    if (goalCrossed) goalCrossedYet = true;
    rows.push({
      yr, openingBalance, contribution: yearContribution, interestEarned: yearInterest,
      closingBalance: balance, totalContributions, totalInterest, realValue, goalCrossed,
    });
    // Step-up deposit at start of each new year
    if (stepUpPct > 0) {
      currentMonthlyDeposit = currentMonthlyDeposit * (1 + stepUpPct / 100);
    }
  }
  return rows;
}

const COMP_OPTIONS = [
  { label: 'Monthly', value: 12 },
  { label: 'Quarterly', value: 4 },
  { label: 'Annual', value: 1 },
];

const YEAR_PRESETS = [5, 10, 15, 20, 25, 30];

export default function SavingsGrowthCalculatorClient({ faqItems }: { faqItems: FaqItem[] }) {
  const { formatCurrency, convertCurrency, selectedCurrency } = useCurrency();
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setMobile(mq.matches);
    const h = () => setMobile(mq.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  const [startingBalance, setStartingBalance] = useState(50000);
  const [monthlyDeposit, setMonthlyDeposit] = useState(10000);
  const [annualRate, setAnnualRate] = useState(7.0);
  const [years, setYears] = useState(10);
  const [compIdx, setCompIdx] = useState(0); // monthly default
  const [stepUpEnabled, setStepUpEnabled] = useState(false);
  const [stepUpPct, setStepUpPct] = useState(10);
  const [inflationPct, setInflationPct] = useState(5);
  const [showInflation, setShowInflation] = useState(false);
  const [goalEnabled, setGoalEnabled] = useState(false);
  const [goalAmt, setGoalAmt] = useState(5000000);
  const [showTable, setShowTable] = useState(false);

  // Restore from localStorage
  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-savings-growth-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (d.startingBalance != null) setStartingBalance(d.startingBalance);
      if (d.monthlyDeposit != null) setMonthlyDeposit(d.monthlyDeposit);
      if (d.annualRate != null) setAnnualRate(d.annualRate);
      if (d.years != null) setYears(d.years);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('fermor-savings-growth-v1', JSON.stringify({ startingBalance, monthlyDeposit, annualRate, years }));
    } catch { /* ignore */ }
  }, [startingBalance, monthlyDeposit, annualRate, years]);

  const rows = useMemo(() => calcSavingsGrowth({
    startingBalance: convertCurrency(startingBalance),
    monthlyDeposit: convertCurrency(monthlyDeposit),
    annualRate,
    years,
    compFreq: COMP_OPTIONS[compIdx].value,
    stepUpPct: stepUpEnabled ? stepUpPct : 0,
    inflationPct: showInflation ? inflationPct : 0,
    goalAmt: goalEnabled ? convertCurrency(goalAmt) : 0,
  }), [startingBalance, monthlyDeposit, annualRate, years, compIdx, stepUpEnabled, stepUpPct, inflationPct, showInflation, goalEnabled, goalAmt, convertCurrency]);

  const finalRow = rows[rows.length - 1];
  const totalDeposited = finalRow?.totalContributions ?? 0;
  const totalInterest = finalRow?.totalInterest ?? 0;
  const finalCorpus = finalRow?.closingBalance ?? 0;
  const realValue = finalRow?.realValue ?? 0;
  const goalYear = rows.find(r => r.goalCrossed)?.yr;

  const sym = selectedCurrency.symbol;
  const fmt = (n: number) => formatCurrency(n);

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <style>{`
        .sgt-sidebar::-webkit-scrollbar { width: 5px; }
        .sgt-sidebar::-webkit-scrollbar-track { background: transparent; }
        .sgt-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        input[type=range]::-webkit-slider-thumb { appearance: none; width: 18px; height: 18px; border-radius: 50%; background: ${C.dark}; border: 2px solid ${C.white}; box-shadow: 0 1px 4px rgba(0,0,0,0.2); cursor: pointer; }
        input[type=range]::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: ${C.dark}; border: 2px solid ${C.white}; cursor: pointer; }
      `}</style>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '16px 16px' : '32px 32px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Savings Growth Tracker
          </h1>
          <p style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Project how your savings grow with regular deposits, step-up contributions, and compound interest. See year-by-year breakdown and track a savings goal.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 32, alignItems: 'start' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
              <CurrencySelector />
            </div>

            {/* Calculator card */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                {/* Input panel */}
                <div style={{ padding: mobile ? 20 : 28, borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <Slider label="Starting Balance" id="starting-balance" value={startingBalance} min={0} max={5000000} step={5000}
                    display={`${sym}${fmtN(startingBalance)}`} onChange={setStartingBalance} />
                  <Slider label="Monthly Deposit" id="monthly-deposit" value={monthlyDeposit} min={500} max={200000} step={500}
                    display={`${sym}${fmtN(monthlyDeposit)}`} onChange={setMonthlyDeposit} />
                  <Slider label="Annual Interest Rate" id="annual-rate" value={annualRate} min={0.5} max={20} step={0.1}
                    display={`${annualRate.toFixed(1)}%`} onChange={setAnnualRate} />

                  {/* Tenure presets */}
                  <div style={{ marginBottom: 18 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: 13, color: C.ink2 }}>Tenure</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{years} Year{years > 1 ? 's' : ''}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {YEAR_PRESETS.map(y => (
                        <button key={y} onClick={() => setYears(y)} aria-pressed={years === y}
                          style={{ padding: '4px 10px', fontSize: 12, background: C.white, color: years === y ? C.ink : C.ink3, border: `${years === y ? 1.5 : 1}px solid ${years === y ? C.ink : C.border}`, fontWeight: years === y ? 700 : 500, borderRadius: 6, cursor: 'pointer', fontFamily: INTER }}>
                          {y}Y
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Compounding frequency */}
                  <div style={{ marginBottom: 18 }}>
                    <div style={{ fontSize: 13, color: C.ink2, marginBottom: 8 }}>Compounding Frequency</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {COMP_OPTIONS.map((o, i) => (
                        <button key={o.label} onClick={() => setCompIdx(i)} aria-pressed={compIdx === i}
                          style={{ flex: 1, padding: '7px 4px', fontSize: 12, background: compIdx === i ? C.dark : C.white, color: compIdx === i ? C.lime : C.ink2, border: `${compIdx === i ? 1.5 : 1}px solid ${compIdx === i ? C.dark : C.border}`, fontWeight: compIdx === i ? 700 : 500, borderRadius: 8, cursor: 'pointer', fontFamily: INTER }}>
                          {o.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step-Up toggle */}
                  <div style={{ marginBottom: 16, background: C.bg, borderRadius: 10, padding: '12px 14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: stepUpEnabled ? 12 : 0 }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>Step-Up Savings</div>
                        <div style={{ fontSize: 11, color: C.ink3 }}>Increase deposit % each year</div>
                      </div>
                      <button onClick={() => setStepUpEnabled(!stepUpEnabled)} role="switch" aria-checked={stepUpEnabled}
                        aria-label="Toggle step-up savings"
                        style={{ width: 40, height: 22, borderRadius: 11, background: stepUpEnabled ? C.dark : C.border, border: 'none', cursor: 'pointer', position: 'relative', transition: '0.2s' }}>
                        <span style={{ position: 'absolute', top: 3, left: stepUpEnabled ? 21 : 3, width: 16, height: 16, borderRadius: '50%', background: stepUpEnabled ? C.lime : C.white, transition: '0.2s' }} />
                      </button>
                    </div>
                    {stepUpEnabled && (
                      <Slider label="Annual Step-Up %" id="step-up-pct" value={stepUpPct} min={1} max={30} step={1}
                        display={`${stepUpPct}%`} onChange={setStepUpPct} />
                    )}
                  </div>

                  {/* Inflation toggle */}
                  <div style={{ marginBottom: 16, background: C.bg, borderRadius: 10, padding: '12px 14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: showInflation ? 12 : 0 }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>Inflation Adjustment</div>
                        <div style={{ fontSize: 11, color: C.ink3 }}>Show real purchasing power</div>
                      </div>
                      <button onClick={() => setShowInflation(!showInflation)} role="switch" aria-checked={showInflation}
                        aria-label="Toggle inflation adjustment"
                        style={{ width: 40, height: 22, borderRadius: 11, background: showInflation ? C.dark : C.border, border: 'none', cursor: 'pointer', position: 'relative', transition: '0.2s' }}>
                        <span style={{ position: 'absolute', top: 3, left: showInflation ? 21 : 3, width: 16, height: 16, borderRadius: '50%', background: showInflation ? C.lime : C.white, transition: '0.2s' }} />
                      </button>
                    </div>
                    {showInflation && (
                      <Slider label="Inflation Rate %" id="inflation-pct" value={inflationPct} min={1} max={15} step={0.5}
                        display={`${inflationPct}%`} onChange={setInflationPct} />
                    )}
                  </div>

                  {/* Goal toggle */}
                  <div style={{ marginBottom: 0, background: C.bg, borderRadius: 10, padding: '12px 14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: goalEnabled ? 12 : 0 }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>Savings Goal</div>
                        <div style={{ fontSize: 11, color: C.ink3 }}>Track when you hit your target</div>
                      </div>
                      <button onClick={() => setGoalEnabled(!goalEnabled)} role="switch" aria-checked={goalEnabled}
                        aria-label="Toggle savings goal"
                        style={{ width: 40, height: 22, borderRadius: 11, background: goalEnabled ? C.dark : C.border, border: 'none', cursor: 'pointer', position: 'relative', transition: '0.2s' }}>
                        <span style={{ position: 'absolute', top: 3, left: goalEnabled ? 21 : 3, width: 16, height: 16, borderRadius: '50%', background: goalEnabled ? C.lime : C.white, transition: '0.2s' }} />
                      </button>
                    </div>
                    {goalEnabled && (
                      <Slider label="Goal Amount" id="goal-amt" value={goalAmt} min={100000} max={50000000} step={100000}
                        display={`${sym}${fmtN(goalAmt)}`} onChange={setGoalAmt} />
                    )}
                  </div>
                </div>

                {/* Output panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ order: mobile ? 1 : -1, marginBottom: mobile ? 16 : 20 }}>
                    <MultiDonutChart segments={[
                      { value: convertCurrency(startingBalance), color: seriesColor(2), label: 'Starting Balance' },
                      { value: Math.max(0, totalDeposited - convertCurrency(startingBalance)), color: CHART_PAIR.primary, label: 'Deposits' },
                      { value: totalInterest, color: CHART_PAIR.secondary, label: 'Interest' },
                    ]} centerLabel="Corpus" centerValue={fmt(finalCorpus)} />
                  </div>
                  <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 20, marginBottom: mobile ? 12 : 20, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {[
                      { color: seriesColor(2), label: 'Starting Balance' },
                      { color: C.dark, label: 'Deposits' },
                      { color: C.lime2, label: 'Interest' },
                    ].map(l => (
                      <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <div style={{ width: 11, height: 11, borderRadius: 3, background: l.color }} aria-hidden="true" />
                        <span style={{ fontSize: 13, color: C.ink2 }}>{l.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Dark result box */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 12 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#50565C' }}>Total Corpus</div>
                      <div style={{ fontSize: 12, color: '#7A8087' }}>Interest Earned</div>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <div aria-live="polite" style={{ fontSize: 22, fontWeight: 800, color: '#1F7A58', lineHeight: 1 }}>{fmt(finalCorpus)}</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#101214', lineHeight: 1 }}>{fmt(totalInterest)}</div>
                    </div>
                  </div>

                  {/* Stats */}
                  {[
                    { label: 'Total Deposited', val: fmt(totalDeposited) },
                    { label: 'Interest Earned', val: fmt(totalInterest) },
                    { label: 'Return on Deposits', val: totalDeposited > 0 ? fmtPct((totalInterest / totalDeposited) * 100) : '0%' },
                    ...(showInflation ? [{ label: `Real Value (at ${inflationPct}% inflation)`, val: fmt(realValue) }] : []),
                    ...(goalEnabled ? [{ label: goalYear ? `Goal reached in Year ${goalYear}` : 'Goal not reached', val: goalYear ? '' : fmt(finalCorpus) + ' vs ' + fmt(convertCurrency(goalAmt)) }] : []),
                  ].map(r => (
                    <div key={r.label} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, fontSize: 13, fontFamily: INTER }}>
                      <span style={{ color: C.ink2 }}>{r.label}</span>
                      <span style={{ color: C.ink, fontWeight: 600 }}>{r.val}</span>
                    </div>
                  ))}

                  {/* Goal reached banner */}
                  {goalEnabled && goalYear && (
                    <div style={{ width: '100%', marginTop: 12, background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 18 }} aria-hidden="true">🎯</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.dark }}>
                        Goal of {fmt(convertCurrency(goalAmt))} reached in Year {goalYear}!
                      </span>
                    </div>
                  )}
                  {goalEnabled && !goalYear && (
                    <div style={{ width: '100%', marginTop: 12, background: '#FFF4E5', border: '1px solid #FFD8A8', borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 18 }} aria-hidden="true">📊</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#A15C00' }}>
                        Goal of {fmt(convertCurrency(goalAmt))} not reached in {years} years. Try a higher deposit or longer tenure.
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Year-by-year table */}
              <div style={{ padding: mobile ? '0 20px 20px' : '0 28px 28px' }}>
                <button onClick={() => setShowTable(!showTable)} aria-expanded={showTable} aria-controls="sgt-table"
                  style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: C.ink, fontFamily: INTER }}>
                  Year-by-Year Breakdown
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: '0.2s' }}>
                    <path d="M2 4l5 5 5-5" stroke={C.ink} strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </svg>
                </button>
                {showTable && (
                  <div id="sgt-table" style={{ marginTop: 12, overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                    {mobile && <p style={{ fontSize: 11, color: C.ink3, marginBottom: 6 }}>Swipe to scroll</p>}
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5, fontFamily: INTER }}>
                      <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '6px 0', textAlign: 'left' }}>
                        Year-by-year savings growth at {annualRate}% p.a., {COMP_OPTIONS[compIdx].label.toLowerCase()} compounding
                      </caption>
                      <thead>
                        <tr>
                          {['Year', 'Opening', 'Deposited', 'Interest', 'Closing', 'Total Interest', ...(showInflation ? ['Real Value'] : [])].map((h, i) => (
                            <th key={h} scope="col" style={{ padding: '8px 10px', fontSize: 10.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: i === 0 ? 'left' : 'right', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map(row => (
                          <tr key={row.yr} style={{ background: row.goalCrossed ? '#f4f5f6' : C.white }}>
                            <td style={{ padding: '8px 10px', fontSize: 12.5, color: C.ink2, border: `1px solid ${C.border}`, textAlign: 'left' }}>
                              {row.yr}{row.goalCrossed && <span title="Goal reached" style={{ marginLeft: 4, fontSize: 12 }}>🎯</span>}
                            </td>
                            <td style={{ padding: '8px 10px', fontSize: 12.5, color: C.ink2, border: `1px solid ${C.border}`, textAlign: 'right' }}>{fmt(row.openingBalance)}</td>
                            <td style={{ padding: '8px 10px', fontSize: 12.5, color: C.ink2, border: `1px solid ${C.border}`, textAlign: 'right' }}>{fmt(row.contribution)}</td>
                            <td style={{ padding: '8px 10px', fontSize: 12.5, color: '#166534', fontWeight: 500, border: `1px solid ${C.border}`, textAlign: 'right' }}>{fmt(row.interestEarned)}</td>
                            <td style={{ padding: '8px 10px', fontSize: 12.5, color: C.ink, fontWeight: 600, border: `1px solid ${C.border}`, textAlign: 'right' }}>{fmt(row.closingBalance)}</td>
                            <td style={{ padding: '8px 10px', fontSize: 12.5, color: '#B45309', border: `1px solid ${C.border}`, textAlign: 'right' }}>{fmt(row.totalInterest)}</td>
                            {showInflation && <td style={{ padding: '8px 10px', fontSize: 12.5, color: C.ink3, border: `1px solid ${C.border}`, textAlign: 'right' }}>{fmt(row.realValue)}</td>}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* WaitlistCard */}
            <SaveResultsCard mobile={mobile} />

            

            {/* Article */}
            <article itemScope itemType="https://schema.org/Article">
              <h2 id="how-savings-grow" style={{ fontSize: 22, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>How Savings Grow with Compound Interest</h2>
              <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                  Compound interest earns interest on previously earned interest, creating exponential growth over time. The longer your time horizon, the more dramatic the compounding effect becomes relative to the principal you deposit.
                </p>
              </div>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 12 }}>
                The savings growth formula combines two components: the future value of your existing lump sum (P x (1 + r)^n) and the future value of monthly contributions (PMT x ((1 + r)^n - 1) / r). Together, they produce the total corpus at any future date.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 24 }}>
                In India, savings account interest uses the daily balance method mandated by the <a href="https://rbi.org.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Reserve Bank of India</a> since 2010. Fixed deposits use quarterly compounding. This tracker defaults to monthly compounding, which mirrors most savings account and recurring deposit behavior.
              </p>

              {/* Monthly savings table */}
              <h2 id="monthly-savings-corpus" style={{ fontSize: 22, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>Monthly Savings Corpus at Different Rates and Tenures</h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 12 }}>
                The following table shows how Rs 10,000 per month grows at different annual interest rates across time horizons. Monthly compounding applied.
              </p>
              <div style={{ overflowX: 'auto', marginBottom: 24 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '4px 0', textAlign: 'left' }}>
                    Corpus from Rs 10,000 per month with monthly compounding. Starting balance: zero.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" style={{ padding: '9px 14px', fontSize: 11, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}` }}>Rate / Tenure</th>
                      {['5Y', '10Y', '15Y', '20Y', '25Y', '30Y'].map(h => (
                        <th key={h} scope="col" style={{ padding: '9px 14px', fontSize: 11, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'right', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[4, 6, 7, 8, 10, 12].map(rate => (
                      <tr key={rate}>
                        <td style={{ padding: '10px 14px', fontWeight: 600, color: C.ink, border: `1px solid ${C.border}` }}>{rate}% p.a.</td>
                        {[5, 10, 15, 20, 25, 30].map(yr => {
                          const rows2 = calcSavingsGrowth({ startingBalance: 0, monthlyDeposit: 10000, annualRate: rate, years: yr, compFreq: 12, stepUpPct: 0, inflationPct: 0, goalAmt: 0 });
                          const corpus = rows2[rows2.length - 1]?.closingBalance ?? 0;
                          return (
                            <td key={yr} style={{ padding: '10px 14px', fontSize: 13, color: '#166534', fontWeight: rate === 12 ? 700 : 400, border: `1px solid ${C.border}`, textAlign: 'right' }}>
                              Rs {fmtN(corpus / 100000, 1)}L
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Promo bar */}
              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>SIP Calculator</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>See how equity SIP at 12% CAGR compares to savings account growth at 7%.</p>
                </div>
                <Link className="fx-btn" href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  Open calculator
                </Link>
              </div>

              <h2 id="step-up-savings" style={{ fontSize: 22, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>What Is a Step-Up Savings Plan?</h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 12 }}>
                A step-up savings plan increases your monthly deposit by a fixed percentage each year. This mirrors salary growth and allows compounding to accelerate on a growing base.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 12 }}>
                Example: Rs 5,000 monthly at 7% for 20 years without step-up gives Rs 26.2 lakh. With a 10% annual step-up starting at Rs 5,000 (reaching Rs 30,588 by year 20), the corpus grows to approximately Rs 66.3 lakh -- 153% more from the same strategy applied with growing contributions.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 24 }}>
                Enable the Step-Up toggle in the calculator to model this. The table shows the increasing annual deposit alongside compounding interest to see exactly how the corpus accelerates.
              </p>

              <h2 id="savings-vs-sip" style={{ fontSize: 22, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>Savings Account vs SIP: Which Grows Faster?</h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 12 }}>
                A savings account at 7% offers guaranteed, risk-free growth. An equity <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SIP calculator</Link> at 12% CAGR offers higher long-term returns but with market volatility. The right choice depends on your goal horizon and risk tolerance.
              </p>
              <div style={{ overflowX: 'auto', marginBottom: 24 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr>
                      {['', 'Savings Account (7%)', 'SIP (12% CAGR)'].map((h, i) => (
                        <th key={h} scope="col" style={{ padding: '9px 14px', fontSize: 11, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: i === 0 ? 'left' : 'right', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Returns', 'Guaranteed, fixed', 'Market-linked, variable'],
                      ['Risk', 'Zero (DICGC insured up to Rs 5L)', 'Market risk, volatility'],
                      ['Liquidity', 'Full anytime', 'Full after 1 year (3 years for ELSS)'],
                      ['Tax on returns', '80TTA: Rs 10,000 exempt, rest as income', 'LTCG at 12.5% above Rs 1.25L per year'],
                      ['10-year corpus on Rs 10,000/month', 'Rs 17.4 lakh', 'Rs 23.2 lakh'],
                      ['20-year corpus on Rs 10,000/month', 'Rs 52.4 lakh', 'Rs 99.9 lakh'],
                      ['Suitable for', 'Emergency fund, short-term goals', 'Long-term wealth (5+ years)'],
                    ].map(row => (
                      <tr key={row[0]}>
                        <td style={{ padding: '10px 14px', fontSize: 13.5, fontWeight: 600, color: C.ink, border: `1px solid ${C.border}` }}>{row[0]}</td>
                        <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, textAlign: 'right' }}>{row[1]}</td>
                        <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, textAlign: 'right' }}>{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 id="inflation-savings" style={{ fontSize: 22, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>How Inflation Affects Your Savings</h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 12 }}>
                At 5% annual inflation (India's average over the past decade), Rs 52.4 lakh accumulated in 20 years has the purchasing power of only Rs 19.7 lakh in today's rupees. This is why saving at a 7% guaranteed rate in a savings account or FD barely keeps ahead of inflation after tax.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 24 }}>
                Enable the Inflation Adjustment toggle in this calculator to see your corpus in real (today's) rupees. For long-term goals like retirement, always plan using inflation-adjusted targets. Use the <Link href="/calculators/inflation-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Inflation Calculator</Link> to see what today's Rs 1 crore goal costs in future rupees.
              </p>

              <h2 id="savings-goals-india" style={{ fontSize: 22, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>Common Savings Goals for Indians</h2>
              <div style={{ overflowX: 'auto', marginBottom: 24 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '4px 0', textAlign: 'left' }}>
                    Target amounts and suggested monthly savings to reach each goal in time, at 7% p.a.
                  </caption>
                  <thead>
                    <tr>
                      {['Goal', 'Target Amount', 'Timeline', 'Monthly Saving Needed at 7%'].map((h, i) => (
                        <th key={h} scope="col" style={{ padding: '9px 14px', fontSize: 11, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: i > 0 ? 'right' : 'left', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['House down payment (Tier-1 city)', 'Rs 20-25 lakh', '5 years', 'Rs 27,000-34,000'],
                      ['Child higher education', 'Rs 30-50 lakh', '15 years', 'Rs 9,300-15,500'],
                      ['Foreign vacation', 'Rs 5 lakh', '2 years', 'Rs 19,000'],
                      ['Emergency fund (6 months expenses)', 'Rs 3-6 lakh', '1-2 years', 'Rs 14,000-25,000'],
                      ['Car purchase (no loan)', 'Rs 10-15 lakh', '3-5 years', 'Rs 20,000-28,000'],
                      ['Retirement corpus (Rs 5 crore)', 'Rs 5 crore', '25 years', 'Rs 66,500 (at 12%)'],
                    ].map(row => (
                      <tr key={row[0]}>
                        <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}` }}>{row[0]}</td>
                        <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, textAlign: 'right' }}>{row[1]}</td>
                        <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, textAlign: 'right' }}>{row[2]}</td>
                        <td style={{ padding: '10px 14px', fontSize: 13.5, color: '#166534', fontWeight: 600, border: `1px solid ${C.border}`, textAlign: 'right' }}>{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Promo bar 2 */}
              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Savings Account Interest Calculator</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Calculate exact interest on your savings account using the RBI daily balance method.</p>
                </div>
                <Link className="fx-btn" href="/calculators/savings-account-interest-calculator" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  Open calculator
                </Link>
              </div>

              <h2 id="how-to-use" style={{ fontSize: 22, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>How to Use This Savings Growth Tracker</h2>
              <ol style={{ margin: '0 0 24px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Enter your starting balance</strong> -- any existing savings amount. If you are starting from zero, leave it at 0.</li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Set your monthly deposit</strong> and the annual interest rate from your savings account or FD.</li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Choose compounding frequency</strong>: monthly for savings accounts and RDs; quarterly for FDs; annual for PPF and NSC.</li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Enable Step-Up</strong> to model annual increases in your deposit amount as your salary grows.</li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Enable Goal Tracker</strong> to see whether you hit your target amount within the selected tenure, and in which year you cross the goal.</li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Expand the Year-by-Year table</strong> to see opening balance, deposits, interest earned, and closing balance for every year.</li>
              </ol>

              {/* FAQ */}
              <h2 id="faq-section" style={{ fontSize: 22, fontWeight: 700, color: C.ink, margin: '0 0 16px' }}>Frequently Asked Questions</h2>
              <FAQBox items={faqItems} />

              {/* Disclaimer */}
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All projections in this calculator are illustrative only and assume a constant annual interest rate throughout the tenure. Actual savings account and FD rates change with RBI monetary policy. Equity SIP returns are not comparable to guaranteed savings rates. This calculator is for educational and planning purposes only and does not constitute financial advice. Consult a SEBI-registered investment adviser before making investment decisions.
                </p>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <style>{`
            .sgt-sidebar::-webkit-scrollbar { width: 5px; }
            .sgt-sidebar::-webkit-scrollbar-track { background: transparent; }
            .sgt-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .sgt-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside className="sgt-sidebar" style={{
            position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start',
            maxHeight: mobile ? 'none' : 'calc(100vh - 40px)',
            overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2,
            scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent',
            display: 'flex', flexDirection: 'column', gap: 16,
          } as React.CSSProperties}>
            <nav aria-label="Related Calculators" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
                <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Popular Calculators</span>
                </div>
                {[
                  { slug: 'savings-account-interest-calculator', title: 'Savings Account Interest', desc: 'Daily balance method' },
                  { slug: 'sip-calculator', title: 'SIP Calculator', desc: 'Monthly SIP growth' },
                  { slug: 'apy-calculator', title: 'APY Calculator', desc: 'Annual percentage yield' },
                  { slug: 'fd-calculator', title: 'FD Calculator', desc: 'Fixed deposit returns' },
                  { slug: 'bank-interest-comparison-calculator', title: 'Bank Interest Comparison', desc: 'Compare 12 banks' },
                  { slug: 'rd-calculator', title: 'RD Calculator', desc: 'Recurring deposit' },
                  { slug: 'ppf-calculator', title: 'PPF Calculator', desc: '15-year growth' },
                ].map(c => (
                  <Link key={c.slug} href={`/calculators/${c.slug}`} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'block', padding: '10px 16px', borderBottom: `1px solid ${C.border}`, textDecoration: 'none' }}
                    onMouseOver={e => (e.currentTarget.style.background = C.bg)}
                    onMouseOut={e => (e.currentTarget.style.background = 'transparent')}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.ink, fontFamily: INTER }}>{c.title}</div>
                    <div style={{ fontSize: 11.5, color: C.ink3, fontFamily: INTER }}>{c.desc}</div>
                  </Link>
                ))}
              </div>
              <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>More Calculators</span>
                </div>
                {[
                  { slug: 'monthly-budget-calculator', title: 'Monthly Budget', desc: '50/30/20 rule planner' },
                  { slug: 'emergency-fund-calculator', title: 'Emergency Fund', desc: '3-12 months of expenses' },
                  { slug: 'goal-planning-calculator', title: 'Goal Planning', desc: 'SIP for any goal' },
                  { slug: 'inflation-calculator', title: 'Inflation Calculator', desc: 'Purchasing power over time' },
                  { slug: 'compound-interest-calculator', title: 'Compound Interest', desc: 'Multiple compounding options' },
                ].map(c => (
                  <Link key={c.slug} href={`/calculators/${c.slug}`} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'block', padding: '10px 16px', borderBottom: `1px solid ${C.border}`, textDecoration: 'none' }}
                    onMouseOver={e => (e.currentTarget.style.background = C.bg)}
                    onMouseOut={e => (e.currentTarget.style.background = 'transparent')}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.ink, fontFamily: INTER }}>{c.title}</div>
                    <div style={{ fontSize: 11.5, color: C.ink3, fontFamily: INTER }}>{c.desc}</div>
                  </Link>
                ))}
              </div>
            </nav>
          </aside>
        </div>
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

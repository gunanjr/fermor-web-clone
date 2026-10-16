'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import { FAQBox } from '@/components/common/FAQBox';

const C = {
  dark: '#101214', lime: '#a6dbc4', lime2: '#2d9970', paleLime: '#f4f5f6',
  ink: '#16140F', ink2: '#50565c', ink3: '#7a8087',
  white: '#ffffff', bg: '#f6f7f8', border: '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

function fmtN(n: number, digits = 0) {
  return n.toLocaleString('en-IN', { maximumFractionDigits: digits, minimumFractionDigits: digits });
}
function fmtPct(n: number) {
  return n.toFixed(3) + '%';
}

interface FaqItem { q: string; a: string; }

// ---- Donut Chart ----
function DonutChart({ val1, val2, label1 = 'Principal', label2 = 'Interest', color1 = CHART_PAIR.primary, color2 = CHART_PAIR.secondary }: {
  val1: number; val2: number; label1?: string; label2?: string; color1?: string; color2?: string;
}) {
  const total = val1 + val2;
  if (total <= 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const pct1 = Math.round((val1 / total) * 100);
  const pArc1 = (val1 / total) * circ;

  return (
    <svg role="img" aria-label={`${label1} vs ${label2}: ${pct1}% ${label1}, ${100 - pct1}% ${label2}`}
      width="216" height="216" viewBox="0 0 216 216" style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={color2} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={color1} strokeWidth={sw}
        strokeDasharray={`${pArc1} ${circ - pArc1}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>{label1}</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pct1}%</text>
    </svg>
  );
}

// ---- Slider ----
function Slider({ label, id, value, min, max, step, display, onChange }: {
  label: string; id?: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (v: number) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const inputId = id || label.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'slider';
  const rangeId = `${inputId}-range`;
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        {label ? <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: 13, color: C.ink2, fontFamily: INTER }}>{label}</label> : <span />}
        {editing ? (
          <input
            id={inputId}
            aria-label={`Enter ${label} value`}
            value={raw}
            onChange={e => setRaw(e.target.value)}
            onBlur={() => {
              const v = parseFloat(raw.replace(/,/g, ''));
              if (!isNaN(v)) onChange(Math.min(max, Math.max(min, v)));
              setEditing(false);
            }}
            onKeyDown={e => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
            style={{ fontSize: 13, fontWeight: 600, color: C.ink, background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 6, padding: '3px 8px', width: 110, textAlign: 'right', fontFamily: INTER }}
            autoFocus
          />
        ) : (
          <button
            aria-label={`${label}: ${display}. Click to edit.`}
            onClick={() => { setRaw(String(value)); setEditing(true); }}
            style={{ fontSize: 13, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 6, padding: '3px 8px', cursor: 'pointer', fontFamily: INTER }}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}
          >{display}</button>
        )}
      </div>
      <div style={{ position: 'relative', height: 18, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, height: 4, borderRadius: 2, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)` }} />
        <input
          id={rangeId} type="range" min={min} max={max} step={step} value={value}
          aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
          onChange={e => onChange(parseFloat(e.target.value))}
          style={{ position: 'relative', width: '100%', appearance: 'none', background: 'transparent', cursor: 'pointer', zIndex: 1 }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: C.ink3, marginTop: 2, fontFamily: INTER }}>
        <span>{min.toLocaleString('en-IN')}</span><span>{max.toLocaleString('en-IN')}</span>
      </div>
    </div>
  );
}

// ---- APY Core Calc ----
function calcAPY(principal: number, apyPct: number, years: number): {
  interest: number; total: number; monthly: number; daily: number;
  effectiveMonthlyRate: number;
} {
  const apy = apyPct / 100;
  const total = principal * Math.pow(1 + apy, years);
  const interest = total - principal;
  const monthly = principal * (Math.pow(1 + apy, 1 / 12) - 1);
  const daily = principal * (apy / 365);
  const effectiveMonthlyRate = (Math.pow(1 + apy, 1 / 12) - 1) * 100;
  return { interest, total, monthly, daily, effectiveMonthlyRate };
}

function buildGrowthTable(principal: number, apyPct: number, years: number) {
  const apy = apyPct / 100;
  return Array.from({ length: years }, (_, i) => {
    const yr = i + 1;
    const startBal = principal * Math.pow(1 + apy, i);
    const endBal = principal * Math.pow(1 + apy, yr);
    const interest = endBal - startBal;
    const totalInterest = endBal - principal;
    return { yr, startBal, interest, endBal, totalInterest };
  });
}

const COMPOUNDING: { label: string; n: number }[] = [
  { label: 'Daily (365)', n: 365 },
  { label: 'Monthly (12)', n: 12 },
  { label: 'Quarterly (4)', n: 4 },
  { label: 'Semi-Annual (2)', n: 2 },
  { label: 'Annual (1)', n: 1 },
];

export default function APYCalculatorClient({ faqItems }: { faqItems: FaqItem[] }) {
  const { formatCurrency, convertCurrency, selectedCurrency } = useCurrency();
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setMobile(mq.matches);
    const h = () => setMobile(mq.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  const [activeTab, setActiveTab] = useState<'calc' | 'apy2apr' | 'apr2apy' | 'compare'>('calc');
  const [principal, setPrincipal] = useState(100000);
  const [apyRate, setApyRate] = useState(4.5);
  const [years, setYears] = useState(5);
  const [compIdx, setCompIdx] = useState(0); // daily default for APY->APR tab
  const [aprRate, setAprRate] = useState(4.402);
  const [aprCompIdx, setAprCompIdx] = useState(0);
  const [showTable, setShowTable] = useState(false);

  // Comparison tab rates
  const [compRates, setCompRates] = useState([3.0, 3.5, 4.0, 4.5, 5.0, 5.5]);
  const [compPrincipal, setCompPrincipal] = useState(100000);
  const [compYears, setCompYears] = useState(5);

  // Persist state
  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-apy-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (d.principal) setPrincipal(d.principal);
      if (d.apyRate) setApyRate(d.apyRate);
      if (d.years) setYears(d.years);
    } catch { /* fail silently */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('fermor-apy-v1', JSON.stringify({ principal, apyRate, years }));
    } catch { /* ignore */ }
  }, [principal, apyRate, years]);

  const result = calcAPY(convertCurrency(principal), apyRate, years);
  const tableData = buildGrowthTable(convertCurrency(principal), apyRate, years);

  // APY -> APR conversion
  const apyToApr = useCallback((apy: number, n: number) => {
    return n * (Math.pow(1 + apy / 100, 1 / n) - 1) * 100;
  }, []);

  // APR -> APY conversion
  const aprToApy = useCallback((apr: number, n: number) => {
    return (Math.pow(1 + apr / (100 * n), n) - 1) * 100;
  }, []);

  const tabs = [
    { id: 'calc' as const, label: 'APY Calculator' },
    { id: 'apy2apr' as const, label: 'APY to APR' },
    { id: 'apr2apy' as const, label: 'APR to APY' },
    { id: 'compare' as const, label: 'Rate Comparison' },
  ];

  const yearPresets = [1, 3, 5, 10, 20, 30];

  const fmt = (n: number) => formatCurrency(n);

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <style>{`
        .apy-sidebar::-webkit-scrollbar { width: 5px; }
        .apy-sidebar::-webkit-scrollbar-track { background: transparent; }
        .apy-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .apy-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
        input[type=range]::-webkit-slider-thumb { appearance: none; width: 18px; height: 18px; border-radius: 50%; background: ${C.dark}; border: 2px solid ${C.white}; box-shadow: 0 1px 4px rgba(0,0,0,0.2); cursor: pointer; }
        input[type=range]::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: ${C.dark}; border: 2px solid ${C.white}; cursor: pointer; }
      `}</style>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '16px 16px' : '32px 32px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            APY Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate annual percentage yield, convert between APY and APR, and compare savings rates across different compounding frequencies.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 32, alignItems: 'start' }}>
          <div>
            {/* Currency selector */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
              <CurrencySelector />
            </div>

            {/* Calculator card */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>
              {/* Tabs */}
              <div role="tablist" aria-label="Calculator mode" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa', overflowX: 'auto' }}>
                {tabs.map(t => (
                  <button key={t.id} id={`tab-${t.id}`} role="tab"
                    aria-selected={activeTab === t.id} aria-controls={`panel-${t.id}`}
                    onClick={() => setActiveTab(t.id)}
                    style={{
                      flex: 1, minWidth: mobile ? 90 : 'auto',
                      padding: mobile ? '12px 6px' : '15px 20px',
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: mobile ? 11.5 : 13,
                      fontWeight: activeTab === t.id ? 700 : 400,
                      color: activeTab === t.id ? C.dark : C.ink3,
                      borderBottom: activeTab === t.id ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                      transition: 'all 0.15s', fontFamily: INTER, whiteSpace: 'nowrap',
                    }}>
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tab: APY Calculator */}
              {activeTab === 'calc' && (
                <div id="panel-calc" role="tabpanel" aria-labelledby="tab-calc">
                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                    {/* Input */}
                    <div style={{ padding: mobile ? 20 : 28, borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                      <Slider label="Principal Amount" id="principal" value={principal} min={10000} max={5000000} step={5000}
                        display={`${selectedCurrency.symbol}${fmtN(principal)}`} onChange={setPrincipal} />
                      <Slider label="APY Rate (%)" id="apy-rate" value={apyRate} min={0.01} max={15} step={0.01}
                        display={`${apyRate.toFixed(2)}%`} onChange={setApyRate} />
                      <div style={{ marginBottom: 18 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                          <span style={{ fontSize: 13, color: C.ink2, fontFamily: INTER }}>Tenure</span>
                          <span style={{ fontSize: 13, fontWeight: 600, color: C.ink, fontFamily: INTER }}>{years} Year{years > 1 ? 's' : ''}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {yearPresets.map(y => (
                            <button key={y} onClick={() => setYears(y)} aria-pressed={years === y}
                              style={{
                                padding: '4px 10px', fontSize: 12, background: C.white,
                                color: years === y ? C.ink : C.ink3,
                                border: `${years === y ? 1.5 : 1}px solid ${years === y ? C.ink : C.border}`,
                                fontWeight: years === y ? 700 : 500, borderRadius: 6, cursor: 'pointer',
                                fontFamily: INTER, transition: 'all 0.15s',
                              }}>
                              {y}Y
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Output */}
                    <div style={{ padding: mobile ? '20px 18px' : '40px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      {/* Donut */}
                      <div style={{ order: mobile ? 1 : -1, marginBottom: mobile ? 16 : 20 }}>
                        <DonutChart val1={convertCurrency(principal)} val2={result.interest} label1="Principal" label2="Interest" color1={C.dark} color2={C.lime2} />
                      </div>
                      {/* Legend */}
                      <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 20, marginBottom: mobile ? 12 : 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                          <span style={{ fontSize: 13, color: C.ink2 }}>Principal</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                          <span style={{ fontSize: 13, color: C.ink2 }}>Interest</span>
                        </div>
                      </div>

                      {/* Dark result box */}
                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 12 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#50565C' }}>Interest Earned</div>
                          <div style={{ fontSize: 12, color: '#7A8087' }}>Total Amount</div>
                        </div>
                        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                          <div aria-live="polite" aria-label={`Interest Earned: ${fmt(result.interest)}`}
                            style={{ fontSize: 22, fontWeight: 800, color: '#1F7A58', lineHeight: 1 }}>
                            {fmt(result.interest)}
                          </div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#101214', lineHeight: 1 }}>{fmt(result.total)}</div>
                        </div>
                      </div>

                      {[
                        { label: 'Monthly Interest', val: fmt(result.monthly) },
                        { label: 'Effective Monthly Rate', val: `${result.effectiveMonthlyRate.toFixed(4)}%` },
                        { label: 'Daily Interest (approx.)', val: fmt(result.daily) },
                        { label: 'APY Rate', val: `${apyRate.toFixed(2)}%` },
                      ].map(r => (
                        <div key={r.label} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, fontSize: 13, fontFamily: INTER }}>
                          <span style={{ color: C.ink2 }}>{r.label}</span>
                          <span style={{ color: C.ink, fontWeight: 600 }}>{r.val}</span>
                        </div>
                      ))}

                      {/* Split bar */}
                      {(() => {
                        const total = convertCurrency(principal) + result.interest;
                        const pPct = total > 0 ? Math.round((convertCurrency(principal) / total) * 100) : 100;
                        const iPct = 100 - pPct;
                        return (
                          <div style={{ width: '100%', marginTop: 16 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                              <span style={{ fontSize: 12, color: C.ink3 }}>Principal {pPct}%</span>
                              <span style={{ fontSize: 12, color: C.ink3 }}>Interest {iPct}%</span>
                            </div>
                            <div style={{ height: 6, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }}>
                              <div style={{ height: '100%', width: `${pPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Year-by-year table */}
                  <div style={{ padding: mobile ? '0 20px 20px' : '0 28px 28px' }}>
                    <button onClick={() => setShowTable(!showTable)} aria-expanded={showTable} aria-controls="apy-growth-table"
                      style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: C.ink, fontFamily: INTER }}>
                      Year-by-Year Growth
                      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: '0.2s' }}>
                        <path d="M2 4l5 5 5-5" stroke={C.ink} strokeWidth="1.5" fill="none" strokeLinecap="round" />
                      </svg>
                    </button>
                    {showTable && (
                      <div id="apy-growth-table" style={{ marginTop: 12, overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                        {mobile && <p style={{ fontSize: 11, color: C.ink3, marginBottom: 6, fontFamily: INTER }}>Swipe to scroll</p>}
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: INTER }}>
                          <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '6px 0', textAlign: 'left' }}>
                            Year-by-year growth at {apyRate}% APY on {selectedCurrency.code} {fmtN(principal)} principal
                          </caption>
                          <thead>
                            <tr>
                              {['Year', 'Opening Balance', 'Interest Earned', 'Closing Balance', 'Total Interest'].map(h => (
                                <th key={h} scope="col" style={{ padding: '9px 12px', fontSize: 11, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: h === 'Year' ? 'left' : 'right', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {tableData.map(row => (
                              <tr key={row.yr}>
                                <td style={{ padding: '9px 12px', fontSize: 13, color: C.ink2, border: `1px solid ${C.border}`, textAlign: 'left' }}>{row.yr}</td>
                                <td style={{ padding: '9px 12px', fontSize: 13, color: C.ink2, border: `1px solid ${C.border}`, textAlign: 'right' }}>{fmt(row.startBal)}</td>
                                <td style={{ padding: '9px 12px', fontSize: 13, color: '#166534', fontWeight: 500, border: `1px solid ${C.border}`, textAlign: 'right' }}>{fmt(row.interest)}</td>
                                <td style={{ padding: '9px 12px', fontSize: 13, color: C.ink, fontWeight: 600, border: `1px solid ${C.border}`, textAlign: 'right' }}>{fmt(row.endBal)}</td>
                                <td style={{ padding: '9px 12px', fontSize: 13, color: '#B45309', border: `1px solid ${C.border}`, textAlign: 'right' }}>{fmt(row.totalInterest)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab: APY to APR */}
              {activeTab === 'apy2apr' && (
                <div id="panel-apy2apr" role="tabpanel" aria-labelledby="tab-apy2apr" style={{ padding: mobile ? 20 : 28 }}>
                  <Slider label="APY Rate (%)" id="apy-rate-2" value={apyRate} min={0.01} max={20} step={0.01}
                    display={`${apyRate.toFixed(2)}%`} onChange={setApyRate} />
                  <div style={{ background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '16px 20px', marginBottom: 20 }}>
                    <div style={{ fontSize: 12, color: '#7A8087', marginBottom: 4 }}>Selected Compounding</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#1F7A58' }}>
                      APR = {fmtPct(apyToApr(apyRate, COMPOUNDING[compIdx].n))}
                    </div>
                    <div style={{ fontSize: 12, color: '#7A8087', marginTop: 4 }}>
                      Formula: n × ((1 + APY/100)^(1/n) - 1)
                    </div>
                  </div>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '4px 0', textAlign: 'left' }}>
                        Equivalent APR for {apyRate}% APY across compounding frequencies
                      </caption>
                      <thead>
                        <tr>
                          {['Compounding', 'Periods/Year', 'Equivalent APR'].map((h, i) => (
                            <th key={h} scope="col" style={{ padding: '9px 12px', fontSize: 11, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: i === 2 ? 'right' : 'left', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}` }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {COMPOUNDING.map((c, i) => (
                          <tr key={c.label} onClick={() => setCompIdx(i)} style={{ cursor: 'pointer', background: compIdx === i ? C.bg : C.white }}>
                            <td style={{ padding: '9px 12px', border: `1px solid ${C.border}`, color: C.ink, fontWeight: compIdx === i ? 700 : 400 }}>{c.label}</td>
                            <td style={{ padding: '9px 12px', border: `1px solid ${C.border}`, color: C.ink2 }}>{c.n}</td>
                            <td style={{ padding: '9px 12px', border: `1px solid ${C.border}`, color: '#166534', fontWeight: 600, textAlign: 'right' }}>{fmtPct(apyToApr(apyRate, c.n))}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab: APR to APY */}
              {activeTab === 'apr2apy' && (
                <div id="panel-apr2apy" role="tabpanel" aria-labelledby="tab-apr2apy" style={{ padding: mobile ? 20 : 28 }}>
                  <Slider label="APR Rate (%)" id="apr-rate" value={aprRate} min={0.01} max={20} step={0.01}
                    display={`${aprRate.toFixed(2)}%`} onChange={setAprRate} />
                  <div style={{ background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '16px 20px', marginBottom: 20 }}>
                    <div style={{ fontSize: 12, color: '#7A8087', marginBottom: 4 }}>Selected Compounding</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#1F7A58' }}>
                      APY = {fmtPct(aprToApy(aprRate, COMPOUNDING[aprCompIdx].n))}
                    </div>
                    <div style={{ fontSize: 12, color: '#7A8087', marginTop: 4 }}>
                      Formula: (1 + APR/(100×n))^n - 1
                    </div>
                  </div>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '4px 0', textAlign: 'left' }}>
                        Equivalent APY for {aprRate}% APR across compounding frequencies
                      </caption>
                      <thead>
                        <tr>
                          {['Compounding', 'Periods/Year', 'Equivalent APY'].map((h, i) => (
                            <th key={h} scope="col" style={{ padding: '9px 12px', fontSize: 11, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: i === 2 ? 'right' : 'left', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}` }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {COMPOUNDING.map((c, i) => (
                          <tr key={c.label} onClick={() => setAprCompIdx(i)} style={{ cursor: 'pointer', background: aprCompIdx === i ? C.bg : C.white }}>
                            <td style={{ padding: '9px 12px', border: `1px solid ${C.border}`, color: C.ink, fontWeight: aprCompIdx === i ? 700 : 400 }}>{c.label}</td>
                            <td style={{ padding: '9px 12px', border: `1px solid ${C.border}`, color: C.ink2 }}>{c.n}</td>
                            <td style={{ padding: '9px 12px', border: `1px solid ${C.border}`, color: '#166534', fontWeight: 600, textAlign: 'right' }}>{fmtPct(aprToApy(aprRate, c.n))}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab: Rate Comparison */}
              {activeTab === 'compare' && (
                <div id="panel-compare" role="tabpanel" aria-labelledby="tab-compare" style={{ padding: mobile ? 20 : 28 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 16, marginBottom: 20 }}>
                    <Slider label="Principal" id="comp-principal" value={compPrincipal} min={10000} max={5000000} step={5000}
                      display={`${selectedCurrency.symbol}${fmtN(compPrincipal)}`} onChange={setCompPrincipal} />
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, fontSize: 13, color: C.ink2 }}>
                        <span>Tenure</span><span style={{ fontWeight: 600, color: C.ink }}>{compYears}Y</span>
                      </div>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {yearPresets.map(y => (
                          <button key={y} onClick={() => setCompYears(y)} aria-pressed={compYears === y}
                            style={{ padding: '4px 10px', fontSize: 12, background: C.white, color: compYears === y ? C.ink : C.ink3, border: `${compYears === y ? 1.5 : 1}px solid ${compYears === y ? C.ink : C.border}`, fontWeight: compYears === y ? 700 : 500, borderRadius: 6, cursor: 'pointer', fontFamily: INTER }}>
                            {y}Y
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '4px 0', textAlign: 'left' }}>
                        Comparison of APY rates on {selectedCurrency.code} {fmtN(compPrincipal)} over {compYears} years
                      </caption>
                      <thead>
                        <tr>
                          {['APY Rate', 'Annual Interest', 'Monthly Interest', 'Total Corpus', 'Total Interest'].map((h, i) => (
                            <th key={h} scope="col" style={{ padding: '9px 12px', fontSize: 11, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: i === 0 ? 'left' : 'right', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {compRates.map((rate, i) => {
                          const r = calcAPY(convertCurrency(compPrincipal), rate, compYears);
                          const isBest = i === compRates.reduce((bi, r2, j) => r2 > compRates[bi] ? j : bi, 0);
                          return (
                            <tr key={i} style={{ background: isBest ? '#f4f5f6' : C.white }}>
                              <td style={{ padding: '9px 12px', border: `1px solid ${C.border}`, color: C.ink, fontWeight: 700 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                  <input
                                    type="number" step="0.1" min="0.01" max="20" value={rate}
                                    aria-label={`APY rate ${i + 1}`}
                                    onChange={e => { const v = parseFloat(e.target.value); if (!isNaN(v)) setCompRates(rs => { const n = [...rs]; n[i] = v; return n; }); }}
                                    style={{ width: 64, fontSize: 13, fontWeight: 700, color: C.ink, border: `1px solid ${C.border}`, borderRadius: 4, padding: '2px 6px', fontFamily: INTER }}
                                  />
                                  <span style={{ fontSize: 12, color: C.ink2 }}>%</span>
                                  {isBest && <span style={{ fontSize: 10, background: C.lime, color: C.dark, borderRadius: 4, padding: '1px 6px', fontWeight: 700 }}>BEST</span>}
                                </div>
                              </td>
                              <td style={{ padding: '9px 12px', border: `1px solid ${C.border}`, color: '#166534', fontWeight: 500, textAlign: 'right' }}>{fmt(r.interest / compYears)}</td>
                              <td style={{ padding: '9px 12px', border: `1px solid ${C.border}`, color: C.ink2, textAlign: 'right' }}>{fmt(r.monthly)}</td>
                              <td style={{ padding: '9px 12px', border: `1px solid ${C.border}`, color: C.ink, fontWeight: 600, textAlign: 'right' }}>{fmt(r.total)}</td>
                              <td style={{ padding: '9px 12px', border: `1px solid ${C.border}`, color: '#0a0a0a', textAlign: 'right' }}>{fmt(r.interest)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* WaitlistCard */}
            <SaveResultsCard mobile={mobile} />

            

            {/* Article */}
            <article itemScope itemType="https://schema.org/Article">
              <h2 id="what-is-apy" style={{ fontSize: 22, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>What Is APY (Annual Percentage Yield)?</h2>
              <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                  APY (Annual Percentage Yield) is the real annual return on a deposit after accounting for compound interest. It is always equal to or greater than the nominal interest rate, because it captures the interest earned on previously credited interest.
                </p>
              </div>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 12 }}>
                The key distinction from a simple interest rate: APY tells you exactly how much your money will grow in one year, regardless of how often the bank credits interest. Two accounts offering the same 4.5% nominal rate will have different APYs if one compounds daily and the other compounds quarterly.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 24 }}>
                In India, savings account interest is calculated using the daily balance method as mandated by the <a href="https://rbi.org.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Reserve Bank of India</a> since 2010. Fixed deposits use quarterly compounding under RBI guidelines.
              </p>

              {/* Promo bar 1 */}
              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Savings Account Interest Calculator</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>See exact daily interest earned using the RBI daily balance method.</p>
                </div>
                <Link className="fx-btn" href="/calculators/savings-account-interest-calculator" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  Open calculator
                </Link>
              </div>

              <h2 id="apy-formula" style={{ fontSize: 22, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>APY Formula: How to Calculate Annual Percentage Yield</h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 12 }}>
                The APY formula converts any nominal interest rate and compounding frequency into a single comparable annual figure.
              </p>
              <pre style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', fontSize: 13, color: C.ink, overflowX: 'auto', marginBottom: 16, fontFamily: 'monospace' }}>
                {`APY = (1 + r/n)^n - 1

Where:
  r = nominal annual interest rate (as decimal, e.g. 0.045 for 4.5%)
  n = number of compounding periods per year`}
              </pre>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 12 }}>
                <strong style={{ color: C.ink }}>Worked example:</strong> Rs 1,00,000 at 4.5% nominal rate, compounded daily (n=365).
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 12 }}>
                APY = (1 + 0.045/365)^365 - 1 = (1.0001233)^365 - 1 = 1.04603 - 1 = 4.603%. At the end of one year, the balance is Rs 1,04,603 versus Rs 1,04,500 under simple interest -- a difference of Rs 103.
              </p>
              <div style={{ overflowX: 'auto', marginBottom: 24 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '4px 0', textAlign: 'left' }}>
                    APY at 4.5% nominal interest across compounding frequencies
                  </caption>
                  <thead>
                    <tr>
                      {['Compounding', 'Periods/Year (n)', 'Effective APY', 'Rs 1L grows to'].map((h, i) => (
                        <th key={h} scope="col" style={{ padding: '9px 14px', fontSize: 11, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: i < 2 ? 'left' : 'right', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPOUNDING.map(c => {
                      const apy = aprToApy(4.5, c.n);
                      return (
                        <tr key={c.label}>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}` }}>{c.label}</td>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}` }}>{c.n}</td>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, textAlign: 'right' }}>{fmtPct(apy)}</td>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: '#166534', fontWeight: 500, border: `1px solid ${C.border}`, textAlign: 'right' }}>Rs {fmtN(100000 * (1 + apy / 100))}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <h2 id="apy-vs-apr" style={{ fontSize: 22, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>APY vs APR: What Is the Difference?</h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 12 }}>
                APY (Annual Percentage Yield) measures what you earn on deposits. APR (Annual Percentage Rate) measures the cost of borrowing. Both are annual percentages, but only APY includes the full effect of compounding.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 12 }}>
                The <a href="https://rbi.org.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Reserve Bank of India</a> mandates APR disclosure on all retail loans under the Fair Lending Practices Code, making it the standard cost-of-credit metric in Indian banking.
              </p>
              <div style={{ overflowX: 'auto', marginBottom: 24 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '4px 0', textAlign: 'left' }}>APY vs APR: side-by-side comparison</caption>
                  <thead>
                    <tr>
                      {['Feature', 'APY', 'APR'].map(h => (
                        <th key={h} scope="col" style={{ padding: '9px 14px', fontSize: 11, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['What it measures', 'Earnings on deposits', 'Cost of a loan'],
                      ['Includes compounding?', 'Yes', 'No (usually)'],
                      ['Higher is better when', 'You are depositing', 'You are borrowing'],
                      ['Example at 4.5%', '4.603% effective (daily)', '4.5% stated (no compounding)'],
                      ['India regulation', 'RBI daily balance method', 'RBI Fair Lending Practices Code'],
                    ].map(row => (
                      <tr key={row[0]}>
                        <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}` }}>{row[0]}</td>
                        <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}` }}>{row[1]}</td>
                        <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}` }}>{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 id="compounding-effect" style={{ fontSize: 22, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>How Compounding Frequency Affects APY</h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 12 }}>
                More frequent compounding raises the effective APY for any given nominal rate. The difference between annual and daily compounding at typical savings rates is small in absolute terms but compounds meaningfully over decades.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 24 }}>
                For Rs 10,00,000 at 6% nominal rate held 20 years: annual compounding produces Rs 32,07,135 while daily compounding produces Rs 33,20,117 -- a Rs 1,12,982 difference from compounding alone.
              </p>

              <h2 id="india-savings-rates" style={{ fontSize: 22, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>Best APY for Savings Accounts in India</h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 12 }}>
                Savings account interest rates in India range from 2.70% at SBI to 7.25% at select small finance banks as of July 2026. The higher rates from newer banks reflect their deposit-gathering strategy.
              </p>
              <div style={{ overflowX: 'auto', marginBottom: 24 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '4px 0', textAlign: 'left' }}>Savings account interest rates as of July 2026. Verify on each bank's official site before depositing.</caption>
                  <thead>
                    <tr>
                      {['Bank', 'Rate (p.a.)', 'Balance Tier', 'Type'].map((h, i) => (
                        <th key={h} scope="col" style={{ padding: '9px 14px', fontSize: 11, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: i > 0 ? 'right' : 'left', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Yes Bank', '7.00%', 'Up to Rs 1 crore', 'Private'],
                      ['IDFC First Bank', '7.00%', 'Up to Rs 1 crore', 'Private'],
                      ['AU Small Finance Bank', '7.25%', 'Above Rs 10 lakh', 'SFB'],
                      ['Equitas SFB', '7.00%', 'Select tiers', 'SFB'],
                      ['Kotak Mahindra Bank', '4.00%', 'Above Rs 1 lakh', 'Private'],
                      ['IndusInd Bank', '4.00%', 'Flat', 'Private'],
                      ['Axis Bank', '3.50%', 'Above Rs 50 lakh', 'Private'],
                      ['ICICI Bank', '3.00%', 'Above Rs 50 lakh', 'Private'],
                      ['HDFC Bank', '3.00%', 'Above Rs 50 lakh', 'Private'],
                      ['SBI', '2.70%', 'Below Rs 50 crore', 'PSB'],
                      ['PNB', '2.70%', 'Flat', 'PSB'],
                    ].map(row => (
                      <tr key={row[0]}>
                        <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}` }}>{row[0]}</td>
                        <td style={{ padding: '10px 14px', fontSize: 13.5, color: '#166534', fontWeight: 600, border: `1px solid ${C.border}`, textAlign: 'right' }}>{row[1]}</td>
                        <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, textAlign: 'right' }}>{row[2]}</td>
                        <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, textAlign: 'right' }}>{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 id="fd-apy" style={{ fontSize: 22, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>APY for Fixed Deposits in India</h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 12 }}>
                Indian fixed deposits use quarterly compounding under RBI guidelines. A 7.00% FD rate therefore has an effective APY of approximately 7.186%, not 7.00%.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 12 }}>
                Use the <Link href="/calculators/bank-interest-comparison-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Bank Interest Rate Comparison Calculator</Link> to compare FD rates across 12 banks and see the effective APY and maturity amount for any deposit.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 24 }}>
                For calculating FD maturity with compounding: use the <Link href="/calculators/fd-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>FD Calculator</Link> which applies the exact quarterly compounding formula and shows year-by-year FD growth.
              </p>

              {/* Promo bar 2 */}
              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Bank Interest Rate Comparison</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Compare FD rates, savings rates, and loan rates across 12 Indian banks in one table.</p>
                </div>
                <Link className="fx-btn" href="/calculators/bank-interest-comparison-calculator" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  Open calculator
                </Link>
              </div>

              <h2 id="how-to-use" style={{ fontSize: 22, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>How to Use This APY Calculator</h2>
              <ol style={{ margin: '0 0 24px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>APY Calculator tab:</strong> enter your principal, APY rate, and investment tenure. The calculator shows total interest, monthly interest, effective monthly rate, and a year-by-year growth table.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>APY to APR tab:</strong> enter your APY and select a compounding frequency. The table shows the equivalent APR for all five compounding periods simultaneously.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>APR to APY tab:</strong> enter the stated APR on your loan or deposit. The calculator converts it to effective APY for each compounding frequency, so you can compare apples to apples.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Rate Comparison tab:</strong> set your principal and tenure once, then compare up to 6 different APY rates side by side. Edit any rate cell directly. The best rate is highlighted.
                </li>
              </ol>

              <h2 id="apy-limitations" style={{ fontSize: 22, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>Limitations of APY as a Measure</h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 12 }}>
                <strong style={{ color: C.ink }}>Rates change without notice.</strong> Banks can revise savings account rates any time the RBI changes the repo rate or at their discretion. An APY that looks attractive today may drop within months.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 12 }}>
                <strong style={{ color: C.ink }}>APY does not account for taxes.</strong> Savings account interest above Rs 10,000 per year is taxable as income under Section 80TTA. FD interest above Rs 40,000 attracts 10% TDS. The after-tax return is what you actually keep.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 12 }}>
                <strong style={{ color: C.ink }}>APY ignores deposit insurance limits.</strong> DICGC insures bank deposits up to Rs 5 lakh per depositor per bank. Small finance banks offering high APYs may carry higher credit risk than PSBs.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 24 }}>
                <strong style={{ color: C.ink }}>APY does not compare across asset classes.</strong> A 7% APY savings account and a 7% CAGR mutual fund are not equivalent. The mutual fund return includes market risk and is not guaranteed. Use the <Link href="/calculators/compound-interest-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Compound Interest Calculator</Link> to model riskier compounding scenarios.
              </p>

              

              {/* FAQ */}
              <h2 id="faq-section" style={{ fontSize: 22, fontWeight: 700, color: C.ink, margin: '0 0 16px' }}>Frequently Asked Questions</h2>
              <FAQBox items={faqItems} />

              {/* Disclaimer */}
              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All calculations on this page are indicative only. APY is a mathematical measure of the effect of compounding on a stated interest rate and does not predict future returns. Bank interest rates change without prior notice. This calculator is for educational and planning purposes only and does not constitute financial advice. Verify all rates on the respective bank's official website before making any deposit decision. Consult a SEBI-registered investment adviser before making investment decisions.
                </p>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <style>{`
            .apy-sidebar::-webkit-scrollbar { width: 5px; }
            .apy-sidebar::-webkit-scrollbar-track { background: transparent; }
            .apy-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .apy-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside className="apy-sidebar" style={{
            position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start',
            maxHeight: mobile ? 'none' : 'calc(100vh - 40px)',
            overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2,
            scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent',
          } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <nav aria-label="Related Calculators" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
                  <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Popular Calculators</span>
                  </div>
                  {[
                    { slug: 'savings-account-interest-calculator', title: 'Savings Account Interest', desc: 'Daily balance method' },
                    { slug: 'bank-interest-comparison-calculator', title: 'Bank Interest Comparison', desc: 'Compare 12 banks' },
                    { slug: 'fd-calculator', title: 'FD Calculator', desc: 'Fixed deposit returns' },
                    { slug: 'compound-interest-calculator', title: 'Compound Interest', desc: 'Multiple compounding options' },
                    { slug: 'fd-laddering-calculator', title: 'FD Laddering', desc: 'Liquidity strategy' },
                    { slug: 'rd-calculator', title: 'RD Calculator', desc: 'Recurring deposit' },
                    { slug: 'ppf-calculator', title: 'PPF Calculator', desc: 'Year-by-year growth' },
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
                    { slug: 'sip-calculator', title: 'SIP Calculator', desc: 'Monthly SIP growth' },
                    { slug: 'fd-maturity-calculator', title: 'FD Maturity', desc: 'TDS and compounding' },
                    { slug: 'investment-comparison-calculator', title: 'Investment Comparison', desc: 'FD vs SIP vs PPF' },
                    { slug: 'savings-growth-calculator', title: 'Savings Growth Tracker', desc: 'Project savings growth' },
                    { slug: 'cagr-calculator', title: 'CAGR Calculator', desc: 'Annualised growth rate' },
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
            </div>
          </aside>
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: [ '/calculators/fd-calculator|FD Calculator', '/calculators/mortgage-calculator|Mortgage', '/calculators/sip-calculator|SIP', '/calculators/gold-loan-calculator|Gold Loan', '/calculators/income-tax-calculator|Income Tax', '/calculators/emi-calculator|EMI', ]},
        { hd: 'Topics', links: ['/#|Fixed Deposits', '/#|Home Loans', '/#|Savings', '/#|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Rates are indicative. Not financial advice." />
    </div>
  );
}

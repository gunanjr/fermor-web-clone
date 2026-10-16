'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useLayoutEffect } from 'react';
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
  dark:      '#101214',
  lime:      '#a6dbc4',
  lime2:     '#2d9970',
  paleLime:  '#f4f5f6',
  ink:       '#16140F',
  ink2:      '#50565c',
  ink3:      '#7a8087',
  white:     '#ffffff',
  bg:        '#f6f7f8',
  border:    '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

/* ─── Types & Defaults ───────────────────────────────────────── */
type InvType = 'FD' | 'SIP' | 'PPF' | 'NPS' | 'Gold' | 'Real Estate' | 'Custom';

const INVESTMENTS: { id: InvType; label: string; color: string; defaultRate: number }[] = [
  { id: 'FD', label: 'Fixed Deposit (FD)', color: '#7a8087', defaultRate: 7 },
  { id: 'SIP', label: 'Mutual Fund (SIP)', color: '#1f7a58', defaultRate: 12 },
  { id: 'PPF', label: 'PPF', color: '#50565c', defaultRate: 7.1 },
  { id: 'NPS', label: 'NPS', color: '#101214', defaultRate: 10 },
  { id: 'Gold', label: 'Gold', color: '#D4AF37', defaultRate: 8 },
  { id: 'Real Estate', label: 'Real Estate', color: '#A0522D', defaultRate: 9 },
  { id: 'Custom', label: 'Custom Investment', color: '#a6dbc4', defaultRate: 15 },
];

/* ─── Math ──────────────────────────────────────────────────── */
function calcFutureValue(principal: number, annualRate: number, years: number): number {
  return principal * Math.pow(1 + annualRate / 100, years);
}

interface GrowthRow {
  year: number;
  [key: string]: number; // Will hold value for each InvType
}

function buildGrowthData(principal: number, rates: Record<InvType, number>, years: number): GrowthRow[] {
  const rows: GrowthRow[] = [];
  const startYear = new Date().getFullYear();
  for (let y = 1; y <= years; y++) {
    const row: GrowthRow = { year: startYear + y - 1 };
    INVESTMENTS.forEach(inv => {
      row[inv.id] = calcFutureValue(principal, rates[inv.id], y);
    });
    rows.push(row);
  }
  return rows;
}

/* ─── UI Components ─────────────────────────────────────────── */
function Slider({ label, value, min, max, step, fmt, onChange, compact, dotColor }: {
  label: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void; compact?: boolean; dotColor?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = ((value - min) / (max - min)) * 100;
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 30 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 16 }}>
        <label style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400, display: 'flex', alignItems: 'center', gap: 8 }}>
          {dotColor && <span style={{ width: 8, height: 8, borderRadius: 2, background: dotColor, flexShrink: 0 }} />}
          {label}
        </label>
        {editing ? (
          <input autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            style={{ fontSize: 14, fontWeight: 600, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 7, padding: compact ? '6px 10px' : '7px 12px', width: 100, outline: 'none', color: C.ink, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            style={{ fontSize: compact ? 13 : 14, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: compact ? '5px 12px' : '6px 14px', cursor: 'pointer', fontFamily: INTER, minWidth: compact ? 80 : 90, textAlign: 'center', transition: 'border-color 0.15s' }}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}>
            {fmt(value)}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 20, height: 20, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 2px 8px rgba(16,18,20,0.22)', pointerEvents: 'none', zIndex: 1 }} />
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(+e.target.value)}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
    </div>
  );
}

function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={label} href={href} style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ padding: '13px 20px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 14, color: C.ink2, transition: 'all 0.12s' }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = C.paleLime; (e.currentTarget as HTMLElement).style.color = C.dark; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink2; }}>
            {label}
          </div>
        </Link>
      ))}
    </div>
  );
}

const POPULAR = [
  { href: '/calculators/sip-calculator',     label: 'SIP Calculator' },
  { href: '/calculators/lumpsum-calculator', label: 'Lumpsum Calculator' },
  { href: '/calculators/fd-calculator',      label: 'FD Calculator' },
  { href: '/calculators/ppf-calculator',     label: 'PPF Calculator' },
  { href: '/calculators/nps-calculator',     label: 'NPS Calculator' },
  { href: '/calculators/rd-calculator',      label: 'RD Calculator' },
  { href: '/calculators/sip-vs-lumpsum-calculator', label: 'SIP vs Lumpsum Calculator' },
];
const MORE = [
  { href: '/calculators/real-return-calculator',        label: 'Real Return Calculator' },
  { href: '/calculators/compound-interest-calculator',  label: 'Compound Interest Calculator' },
  { href: '/calculators/wealth-growth-calculator',       label: 'Wealth Growth Calculator' },
  { href: '/calculators/step-up-sip-calculator',         label: 'Step-Up SIP Calculator' },
  { href: '/calculators/goal-planning-calculator',       label: 'Goal Planning Calculator' },
  { href: '/calculators/inflation-calculator',           label: 'Inflation Calculator' },
];

function FAQ({ faqs }: { faqs: {q: string, a: string}[] }) {
  return <FAQBox items={faqs} />;
}

/* ─── Multi-Series Line Chart ───────────────────────────────── */
function MultiSeriesChart({ data, selectedTypes, fmtIN, mobile }: { data: GrowthRow[], selectedTypes: InvType[], fmtIN: (v: number) => string, mobile: boolean }) {
  if (data.length === 0 || selectedTypes.length === 0) return null;
  const w = mobile ? 300 : 600;
  const h = 280;
  const pad = { t: 20, r: 20, b: 30, l: mobile ? 60 : 80 };
  
  const minX = data[0].year;
  const maxX = data[data.length - 1].year;
  
  let maxY = 0;
  data.forEach(d => {
    selectedTypes.forEach(t => {
      if (d[t] > maxY) maxY = d[t];
    });
  });
  
  // Create round ticks for Y axis
  const yTicks = 4;
  
  return (
    <div style={{ width: '100%', overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
      <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible', fontFamily: INTER }}>
        {/* Y-axis ticks & grid lines */}
        {Array.from({ length: yTicks + 1 }).map((_, i) => {
          const val = (maxY / yTicks) * i;
          const y = h - pad.b - (val / maxY) * (h - pad.t - pad.b);
          return (
            <g key={`y-${i}`}>
              <line x1={pad.l} y1={y} x2={w - pad.r} y2={y} stroke={C.border} strokeWidth="1" strokeDasharray="4 4" />
              <text x={pad.l - 8} y={y + 4} fontSize="10" fill={C.ink3} textAnchor="end">{fmtIN(val)}</text>
            </g>
          );
        })}
        {/* X-axis labels */}
        {data.map((d, i) => {
          if (i === 0 || i === data.length - 1 || i % Math.ceil(data.length / 5) === 0) {
            const x = pad.l + ((d.year - minX) / Math.max(1, (maxX - minX))) * (w - pad.l - pad.r);
            return (
              <text key={`x-${i}`} x={x} y={h - 5} fontSize="10" fill={C.ink3} textAnchor="middle">{d.year}</text>
            );
          }
          return null;
        })}
        {/* Lines */}
        {selectedTypes.map(t => {
          const color = INVESTMENTS.find(inv => inv.id === t)?.color || C.dark;
          const points = data.map((d, i) => {
            const x = pad.l + ((d.year - minX) / Math.max(1, (maxX - minX))) * (w - pad.l - pad.r);
            const y = h - pad.b - (d[t] / maxY) * (h - pad.t - pad.b);
            return `${x},${y}`;
          }).join(' ');
          
          return (
            <g key={`line-${t}`}>
              <polyline points={points} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function InvestmentComparisonClient({ region = 'in', faqs }: { region?: string, faqs: any[] }) {
  const defaultSettings = { amount: 500000, years: 10 };
  const { settings, updateSettings } = useCalculatorSettings('investment-comparison-calculator', defaultSettings);
  const { amount, years } = settings;
  const setAmount = (v: any) => updateSettings({ amount: typeof v === 'function' ? v(settings.amount) : v });
  const setYears = (v: any) => updateSettings({ years: typeof v === 'function' ? v(settings.years) : v });
    
  // Expected Annual Return Rates state
  const [rates, setRates] = useState<Record<InvType, number>>(() => {
    const initRates: any = {};
    INVESTMENTS.forEach(inv => { initRates[inv.id] = inv.defaultRate; });
    return initRates;
  });

  const [mobile, setMobile] = useState(false);
  const [activeTypes, setActiveTypes] = useState<Set<InvType>>(new Set(INVESTMENTS.map(i => i.id)));
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [showResults, setShowResults] = useState(true);
  const [showMatrix, setShowMatrix] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);
  const fmtShort = (n: number) => {
    const v = convertCurrency(n);
    if (v >= 10000000) return `₹${(v / 10000000).toFixed(2)} Cr`;
    if (v >= 100000) return `₹${(v / 100000).toFixed(2)} L`;
    return formatCurrency(v, true);
  };

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const toggleType = (id: InvType) => {
    setActiveTypes(prev => {
      const n = new Set(prev);
      if (n.has(id)) {
        if (n.size > 1) n.delete(id); // Keep at least one
      } else {
        n.add(id);
      }
      return n;
    });
  };

  const updateRate = (id: InvType, val: number) => {
    setRates(prev => ({ ...prev, [id]: val }));
  };

  // Calculate results for all investments
  const results = useMemo(() => {
    return INVESTMENTS.map(inv => {
      const rate = rates[inv.id];
      const finalVal = calcFutureValue(amount, rate, years);
      return {
        ...inv,
        rate,
        invested: amount,
        finalValue: finalVal,
        gain: finalVal - amount
      };
    }).sort((a, b) => b.finalValue - a.finalValue);
  }, [amount, years, rates]);

  const growthData = useMemo(() => buildGrowthData(amount, rates, years), [amount, rates, years]);

  const winner = results[0];
  const second = results.length > 1 ? results[1] : null;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 28px', letterSpacing: '-0.025em' }}>Investment Comparison Calculator</h1>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          {/* LEFT CONTENT */}
          <div style={{ minWidth: 0 }}>
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* INPUT PANEL */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{showAdvanced ? 'More Settings' : 'Base Investment Details'}</p>
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider label="Initial Investment (Lumpsum)" value={amount} min={10000} max={10000000} step={10000} fmt={v => fmtC(v)} onChange={setAmount} compact={mobile} />
                      <Slider label="Investment Duration" value={years} min={1} max={40} step={1} fmt={v => `${v} Yr`} onChange={setYears} compact={mobile} />

                      <button onClick={() => setShowAdvanced(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        More settings
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <p style={{ fontSize: 13, color: C.ink2, margin: '0 0 20px', lineHeight: 1.6 }}>Expected annual return for each instrument, used to project its future wealth.</p>
                      {INVESTMENTS.map(inv => (
                        <Slider
                          key={inv.id}
                          label={inv.label}
                          dotColor={inv.color}
                          value={rates[inv.id]}
                          min={0}
                          max={25}
                          step={0.1}
                          fmt={v => `${v.toFixed(1)}%`}
                          onChange={v => updateRate(inv.id, v)}
                          compact
                        />
                      ))}

                      <button onClick={() => setShowAdvanced(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        Back
                      </button>
                    </>
                  )}
                </div>

                {/* RESULTS PANEL */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  {/* Winner Highlight */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>
                      Highest Projected Wealth
                    </span>
                    <span aria-live="polite" aria-label={`Highest projected wealth: ${fmtIN(winner.finalValue)} with ${winner.label}`}
                      style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {fmtIN(winner.finalValue)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                    <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>Best option</span>
                    <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{winner.label}</span>
                  </div>
                  {second && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>Ahead of {second.label} by</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{fmtIN(winner.finalValue - second.finalValue)}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                    <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>Total gain</span>
                    <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{fmtIN(winner.gain)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                    <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>Investment period</span>
                    <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{years} years</span>
                  </div>

                  {/* Donut Chart */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    {(() => {
                      const total = winner.finalValue;
                      if (total === 0) return null;
                      const invested = amount;
                      const R = 80, sw = 20, cx = 106, cy = 106;
                      const circ = 2 * Math.PI * R;
                      const pArc = (invested / total) * circ;
                      const pPct = Math.round((invested / total) * 100);
                      return (
                        <svg width="212" height="212" viewBox="0 0 212 212" role="img" aria-label="Invested vs Returns donut chart" style={{ display: 'block' }}>
                          <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
                          <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
                            strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
                            style={{ transition: 'stroke-dasharray 0.4s ease' }} />
                          <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Invested</text>
                          <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
                        </svg>
                      );
                    })()}
                  </div>

                  {/* Legend */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Invested ({fmtC(amount)})</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Returns ({fmtC(winner.gain)})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comparison Results dropdown */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowResults(v => !v)}
                  aria-expanded={showResults} aria-controls="comparison-results-panel"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Comparison Results</span>
                    {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>Top 3 ranked, with quick insights</span>}
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    aria-hidden="true" style={{ transform: showResults ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {showResults && (
                  <div id="comparison-results-panel" style={{ borderTop: `1px solid ${C.border}`, padding: mobile ? '16px 16px 24px' : '24px 44px 32px' }}>
                    {/* Comparison Summary Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
                      {results.slice(0, 3).map((res, i) => (
                        <div key={res.id} style={{ background: C.white, border: `1px solid ${i === 0 ? C.lime2 : C.border}`, borderRadius: 12, padding: 16, position: 'relative' }}>
                          {i === 0 && <div style={{ position: 'absolute', top: -10, left: 16, background: C.lime2, color: C.dark, fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 10, textTransform: 'uppercase' }}>Rank 1</div>}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, marginTop: i === 0 ? 8 : 0 }}>
                            <div style={{ width: 12, height: 12, borderRadius: '50%', background: res.color }} />
                            <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{res.label}</span>
                          </div>
                          <div style={{ fontSize: 22, fontWeight: 800, color: C.dark, marginBottom: 4 }}>{fmtShort(res.finalValue)}</div>
                          <div style={{ fontSize: 12, color: C.ink2 }}>Gain: <span style={{ fontWeight: 600, color: '#1f7a58' }}>+{fmtShort(res.gain)}</span></div>
                          <div style={{ fontSize: 11, color: C.ink3, marginTop: 8, paddingTop: 8, borderTop: `1px dashed ${C.border}` }}>At {res.rate}% p.a.</div>
                        </div>
                      ))}
                    </div>

                    {/* Insights Box */}
                    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 16px' }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px' }}>Insights</p>
                      <ul style={{ margin: 0, paddingLeft: 18, color: C.ink2, fontSize: 13, lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <li><strong style={{ color: C.ink, fontWeight: 700 }}>{results[0].label}</strong> outperforms <strong style={{ color: C.ink, fontWeight: 700 }}>{results[results.length-1].label}</strong> by <strong style={{ color: C.ink, fontWeight: 700 }}>{((results[0].finalValue / results[results.length-1].finalValue - 1) * 100).toFixed(0)}%</strong> over {years} years.</li>
                        <li>Extending your investment by just 5 more years would increase your top return by <strong style={{ color: C.ink, fontWeight: 700 }}>{fmtIN(calcFutureValue(amount, results[0].rate, years + 5) - results[0].finalValue)}</strong>.</li>
                        <li>A {(results[0].rate - results[results.length-1].rate).toFixed(1)}% rate difference translates to a {fmtIN(results[0].finalValue - results[results.length-1].finalValue)} wealth gap over {years} years.</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Detailed Comparison Matrix dropdown */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowMatrix(v => !v)}
                  aria-expanded={showMatrix} aria-controls="comparison-matrix-panel"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Detailed Comparison Matrix</span>
                    {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>All {results.length} instruments, full breakdown</span>}
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    aria-hidden="true" style={{ transform: showMatrix ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {showMatrix && (
                  <div id="comparison-matrix-panel" style={{ borderTop: `1px solid ${C.border}`, overflowX: 'auto', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600, fontSize: 13 }}>
                      <thead>
                        <tr style={{ background: '#f4f5f6' }}>
                          <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: C.ink, textTransform: 'uppercase', letterSpacing: '0.05em' }} scope="col">Rank</th>
                          <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: C.ink, textTransform: 'uppercase', letterSpacing: '0.05em' }} scope="col">Investment</th>
                          <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: 11, fontWeight: 700, color: C.ink, textTransform: 'uppercase', letterSpacing: '0.05em' }} scope="col">Rate (p.a.)</th>
                          <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: 11, fontWeight: 700, color: C.ink, textTransform: 'uppercase', letterSpacing: '0.05em' }} scope="col">Total Gain</th>
                          <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: 11, fontWeight: 700, color: C.ink, textTransform: 'uppercase', letterSpacing: '0.05em' }} scope="col">Final Wealth</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.map((res, i) => (
                          <tr key={res.id} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 600, color: C.ink2, whiteSpace: 'nowrap' }}>#{i + 1}</td>
                            <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 600, color: C.ink, display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
                              <div style={{ width: 10, height: 10, borderRadius: '50%', background: res.color, flexShrink: 0 }} />
                              {res.label}
                            </td>
                            <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 500, color: C.ink2, textAlign: 'right', whiteSpace: 'nowrap' }}>{res.rate}%</td>
                            <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 600, color: '#1f7a58', textAlign: 'right', whiteSpace: 'nowrap' }}>+{fmtIN(res.gain)}</td>
                            <td style={{ padding: '14px 16px', fontSize: 15, fontWeight: 800, color: C.dark, textAlign: 'right', whiteSpace: 'nowrap' }}>{fmtIN(res.finalValue)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Wealth Growth Trajectory dropdown */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowChart(v => !v)}
                  aria-expanded={showChart} aria-controls="growth-trajectory-chart"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Wealth Growth Trajectory</span>
                    {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>Year-by-year across selected instruments</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {years} yr
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      aria-hidden="true" style={{ transform: showChart ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {showChart && (
                  <div id="growth-trajectory-chart" style={{ borderTop: `1px solid ${C.border}`, padding: mobile ? '16px 16px 24px' : '24px 44px 32px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
                      {INVESTMENTS.map(inv => (
                        <button key={inv.id} onClick={() => toggleType(inv.id)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: activeTypes.has(inv.id) ? C.white : 'transparent', border: `1px solid ${activeTypes.has(inv.id) ? C.border : 'transparent'}`, padding: '4px 8px', borderRadius: 20, cursor: 'pointer', opacity: activeTypes.has(inv.id) ? 1 : 0.4 }}>
                          <div style={{ width: 8, height: 8, borderRadius: '50%', background: inv.color }} />
                          <span style={{ fontSize: 11, fontWeight: 600, color: C.ink }}>{inv.label}</span>
                        </button>
                      ))}
                    </div>
                    <MultiSeriesChart data={growthData} selectedTypes={Array.from(activeTypes)} fmtIN={fmtShort} mobile={mobile} />

                    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'], marginTop: 24 }}>
                      <table style={{ minWidth: 440, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead>
                          <tr style={{ background: '#f4f5f6' }}>
                            <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }} scope="col">Year</th>
                            {INVESTMENTS.filter(inv => activeTypes.has(inv.id)).map(inv => (
                              <th key={inv.id} style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }} scope="col">{inv.label}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {growthData.map((row, i) => (
                            <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                              <td style={{ padding: '11px 16px', fontWeight: 700, color: C.dark, whiteSpace: 'nowrap' }}>{row.year}</td>
                              {INVESTMENTS.filter(inv => activeTypes.has(inv.id)).map(inv => (
                                <td key={inv.id} style={{ padding: '11px 16px', textAlign: 'right', color: C.ink2, whiteSpace: 'nowrap' }}>{fmtShort(row[inv.id])}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* SEO ARTICLE & FAQ */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            <article style={{ fontFamily: INTER }}>
              {(() => {
                const h2 = { fontSize: mobile ? 18 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
                const h3 = { fontSize: 16, fontWeight: 600, color: C.ink, margin: '0 0 6px' } as React.CSSProperties;
                const p  = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
                const sec = { margin: '0 0 40px' } as React.CSSProperties;
                return (
                  <>
                    <div style={sec}>
                      <h2 style={h2}>Introduction</h2>
                      <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                        <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                          Investment comparison means projecting the same lumpsum amount forward across different asset classes at their respective assumed return rates, so you can see the actual rupee gap between options like FD, SIP, PPF, NPS, gold, and real estate side by side.
                        </p>
                      </div>
                      <p style={p}>
                        Choosing the right investment avenue can be daunting. With numerous options like Fixed Deposits (FD), Systematic Investment Plans (SIP) in mutual funds, Public Provident Fund (PPF), National Pension System (NPS), Gold, and Real Estate, it is crucial to understand how your money will grow in each. This calculator lets you evaluate these asset classes side-by-side.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 style={h2}>How Investment Comparison Works</h2>
                      <p style={p}>
                        This calculator uses the principle of compound interest to project future wealth. By inputting your initial lumpsum investment amount, your desired time horizon, and the expected annual return rate for each asset class, the calculator extrapolates the future value. We use annual compounding as a standard baseline to ensure an apples-to-apples comparison across different financial instruments.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 style={h2}>FD vs SIP Comparison</h2>
                      <p style={p}>
                        Fixed Deposits offer guaranteed returns and capital protection, making them ideal for short-term goals and risk-averse investors. However, their post-tax returns often fail to beat inflation. SIPs in equity mutual funds, while subject to market risks, historically deliver higher inflation-beating returns (12-15% p.a.) over a 7-10 year horizon. When you compare the two over 15 years, the wealth gap becomes substantial due to compounding.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 style={h2}>SIP vs PPF Comparison</h2>
                      <p style={p}>
                        PPF is a government-backed, completely tax-free (EEE) retirement savings scheme currently offering around 7.1% p.a. It has a strict 15-year lock-in. SIPs offer higher potential returns and high liquidity but are subject to a 12.5% Long Term Capital Gains (LTCG) tax. PPF provides a rock-solid debt foundation, while SIPs provide aggressive growth.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 style={h2}>Gold vs Mutual Funds</h2>
                      <p style={p}>
                        Gold is universally recognized as a hedge against inflation and economic instability, historically returning 8-9% annually. Mutual Funds (equities) are growth assets representing ownership in businesses. While gold preserves purchasing power, equities are generally required to significantly compound wealth and achieve financial independence.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 style={h2}>Factors Affecting Investment Returns</h2>
                      <ul style={{ ...p, paddingLeft: 20 }}>
                        <li><strong>Inflation:</strong> Always calculate the "real return" by subtracting inflation from your expected return.</li>
                        <li><strong>Taxation:</strong> Different assets are taxed differently. PPF is tax-free, FDs are taxed at slab rates, and equities have LTCG tax.</li>
                        <li><strong>Time Horizon:</strong> The longer you stay invested, the more compound interest works in your favor.</li>
                        <li><strong>Risk Tolerance:</strong> Higher returns almost always necessitate enduring higher volatility.</li>
                      </ul>
                    </div>

                    <div style={sec}>
                      <h2 style={h2}>Safety, regulation, and who protects your money</h2>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <p style={p}>
                          <strong style={{ color: C.ink }}>Bank deposits are insured up to a limit.</strong> Fixed deposits and savings balances at an insured bank are covered by DICGC (a wholly-owned RBI subsidiary) up to Rs 5 lakh per depositor per bank, combining principal and interest. Amounts above that limit at a single bank are not protected if the bank fails.
                        </p>
                        <p style={p}>
                          <strong style={{ color: C.ink }}>Mutual funds are regulated by SEBI.</strong> SEBI sets the rules for how mutual funds operate, and AMFI is the industry body that mutual fund registrars work under. Unlike a bank deposit, a mutual fund's value is not insured. It is market-linked and can fall, though the fund itself is not permitted to use your money for anything other than the stated investment strategy.
                        </p>
                        <p style={p}>
                          <strong style={{ color: C.ink }}>Combined tax deduction limit across these instruments.</strong> Contributions to PPF and the mandatory 12 percent EPF already use up part of the Rs 1.5 lakh Section 80C limit, and NPS adds a further Rs 50,000 under Section 80CCD(1B) for a combined maximum of Rs 2 lakh. This applies only under the old tax regime.
                        </p>
                      </div>
                    </div>

                    <div style={sec}>
                      <h2 style={h2}>Choosing by time horizon</h2>
                      <p style={p}>
                        The right instrument depends more on when you need the money than on which one has the highest headline return.
                      </p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                          <thead>
                            <tr>
                              <th style={{ padding: '10px 16px', fontSize: 12, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: `1px solid ${C.border}` }} scope="col">Time Horizon</th>
                              <th style={{ padding: '10px 16px', fontSize: 12, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: `1px solid ${C.border}` }} scope="col">Better Suited Options</th>
                              <th style={{ padding: '10px 16px', fontSize: 12, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: `1px solid ${C.border}` }} scope="col">Why</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['Under 3 years', 'FD, liquid funds', 'Capital protection matters more than growth over a short window, and equity can be volatile in the short term.'],
                              ['3 to 7 years', 'FD, short-duration debt funds, a smaller SIP allocation', 'Enough time to smooth out some equity volatility, but still short enough that a market downturn near the goal date is a real risk.'],
                              ['7 to 15 years', 'SIP, PPF', 'Long enough for equity market cycles to average out, and PPF\'s 15-year lock-in fits naturally.'],
                              ['15+ years, retirement-focused', 'SIP, NPS', 'The longest horizons can absorb the most volatility, and NPS is specifically structured to lock in until retirement.'],
                            ].map((row, i) => (
                              <tr key={row[0]} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ padding: '11px 16px', fontSize: 14, fontWeight: 600, color: C.ink, verticalAlign: 'top' }}>{row[0]}</td>
                                <td style={{ padding: '11px 16px', fontSize: 14, color: C.ink2, verticalAlign: 'top' }}>{row[1]}</td>
                                <td style={{ padding: '11px 16px', fontSize: 14, color: C.ink2, verticalAlign: 'top' }}>{row[2]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div style={sec}>
                      <h2 style={h2}>Benefits of Comparing Investments Before Investing</h2>
                      <p style={p}>
                        Comparing investments helps you avoid the "opportunity cost" of placing long-term money into short-term, low-yield instruments. By visualizing the projected wealth trajectory, you can build a diversified portfolio that balances the high returns of SIPs and NPS with the stability of PPF and FDs.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 style={h2}>Example Calculation</h2>
                      <p style={p}>
                        If you invest ₹5,00,000 for 15 years:
                        <br/>- In an <strong>FD at 7%</strong>, it grows to approximately ₹13.7 Lakhs.
                        <br/>- In a <strong>SIP at 12%</strong>, it grows to approximately ₹27.3 Lakhs.
                        <br/>The difference of ₹13.6 Lakhs illustrates why choosing the right asset class for your long-term goals is vital.
                      </p>
                    </div>

                    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>SIP Calculator</p>
                        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Decided SIP is the right fit? Plan the exact monthly amount instead of a lumpsum.</p>
                      </div>
                      <Link className="fx-btn" href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer"
                        style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                    </div>

                    <div style={sec}>
                      <h2 style={h2}>Liquidity and lock-in compared</h2>
                      <p style={p}>
                        Return rate is only half the decision. How easily you can get your money back matters just as much, especially for a goal with a fixed deadline.
                      </p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                          <thead>
                            <tr>
                              <th style={{ padding: '10px 16px', fontSize: 12, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: `1px solid ${C.border}` }} scope="col">Instrument</th>
                              <th style={{ padding: '10px 16px', fontSize: 12, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: `1px solid ${C.border}` }} scope="col">Lock-in</th>
                              <th style={{ padding: '10px 16px', fontSize: 12, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: `1px solid ${C.border}` }} scope="col">Getting money out early</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['Fixed Deposit', 'None, but tenure is fixed at opening', 'Premature withdrawal allowed with a reduced interest rate'],
                              ['Mutual Fund (SIP)', 'None for regular open-ended funds', 'Redeem any business day, proceeds in 1 to 3 days'],
                              ['PPF', '15 years', 'Partial withdrawal allowed from year 7 only'],
                              ['NPS', 'Until age 60', 'Limited partial withdrawal for specific reasons only'],
                              ['Gold', 'None for physical gold or gold ETFs', 'Sell anytime, though Sovereign Gold Bonds have a multi-year term with fixed exit windows'],
                              ['Real Estate', 'None formally, but practically illiquid', 'Can take months to sell, with significant transaction costs'],
                            ].map((row, i) => (
                              <tr key={row[0]} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ padding: '11px 16px', fontSize: 14, fontWeight: 600, color: C.ink, verticalAlign: 'top' }}>{row[0]}</td>
                                <td style={{ padding: '11px 16px', fontSize: 14, color: C.ink2, verticalAlign: 'top' }}>{row[1]}</td>
                                <td style={{ padding: '11px 16px', fontSize: 14, color: C.ink2, verticalAlign: 'top' }}>{row[2]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div style={sec}>
                      <h2 style={h2}>Limitations of this calculator</h2>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <p style={p}>
                          <strong style={{ color: C.ink }}>It assumes a flat, constant return for the full period.</strong> Real equity, gold, and real estate returns vary year to year. A single average rate smooths over that volatility, which understates how different the actual journey could look.
                        </p>
                        <p style={p}>
                          <strong style={{ color: C.ink }}>It models a one-time lumpsum, not ongoing contributions.</strong> Most SIP or NPS investors contribute monthly rather than investing the full amount upfront. Use the SIP Calculator or NPS Calculator for a recurring-contribution projection instead.
                        </p>
                        <p style={p}>
                          <strong style={{ color: C.ink }}>Taxes and exit costs are not deducted from the final figures.</strong> Each instrument here has different tax treatment and exit costs, covered in the sections above, none of which are subtracted from the projected numbers automatically.
                        </p>
                      </div>
                    </div>

                    

                    <div style={sec}>
                      <h2 style={h2}>Frequently Asked Questions</h2>
                      <FAQ faqs={faqs} />
                    </div>
                  </>
                );
              })()}
            </article>
          </div>

          {/* RIGHT SIDEBAR */}
          <style>{`.inv-comp-sidebar::-webkit-scrollbar{width:5px}.inv-comp-sidebar::-webkit-scrollbar-track{background:transparent}.inv-comp-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.inv-comp-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="inv-comp-sidebar" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <SidebarList title="Popular Calculators" items={POPULAR} />
                <SidebarList title="More Calculators" items={MORE} />
            </div>
          </aside>

        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/investment-comparison-calculator|Investment Compare', '/calculators/sip-calculator|SIP', '/calculators/fd-calculator|FD', '/calculators/ppf-calculator|PPF', '/calculators/lumpsum-calculator|Lumpsum'] },
        { hd: 'Topics', links: ['/#|Mutual Funds', '/#|Home Loans', '/#|Fixed Deposits', '/#|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}


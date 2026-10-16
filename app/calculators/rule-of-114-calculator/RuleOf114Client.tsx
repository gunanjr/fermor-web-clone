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

/* ─── UI Components ─────────────────────────────────────────── */
function Slider({ label, value, min, max, step, fmt, onChange, compact, suffix }: {
  label: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void; compact?: boolean; suffix?: string;
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
        <label style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400 }}>
          {label} {suffix && <span style={{ fontSize: 12, color: C.ink3 }}>{suffix}</span>}
        </label>
        {editing ? (
          <input autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 100, outline: 'none', color: C.ink, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            style={{ fontSize: compact ? 13 : 14, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 16px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 80 : 90, textAlign: 'center', transition: 'border-color 0.15s' }}>
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

/* ─── Donut ──────────────────────────────────────────────────── */
function DonutChart({ invested, returns, investedPct }: { invested: number; returns: number; investedPct: number }) {
  const total = invested + Math.abs(returns);
  if (total === 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const iArc = (invested / total) * circ;
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Invested amount ${investedPct}% of tripled value, returns ${100 - investedPct}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${iArc} ${circ - iArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Invested</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{investedPct}%</text>
    </svg>
  );
}

function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, flexShrink: 0 }}>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
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

function FAQ({ faqs }: { faqs: {q: string, a: string}[] }) {
  return <FAQBox items={faqs} />;
}

function SimpleGrowthChart({ yearsToTriple, amount, rate, fmtIN, mobile, viewYears }: { yearsToTriple: number, amount: number, rate: number, fmtIN: (v: number) => string, mobile: boolean, viewYears?: number }) {
  const w = mobile ? 300 : 600;
  const h = 240;
  const pad = { t: 20, r: 20, b: 30, l: mobile ? 60 : 80 };

  const pointsData = [];
  const totalYears = viewYears ? viewYears : Math.ceil(yearsToTriple * 1.3);
  for (let i = 0; i <= totalYears; i++) {
    pointsData.push({ year: i, val: amount * Math.pow(1 + rate / 100, i) });
  }

  const finalVal = amount * Math.pow(1 + rate / 100, totalYears);
  const maxY = Math.max(amount * 3.5, finalVal * 1.15);
  const minX = 0;
  const maxX = totalYears;
  
  const yTicks = 4;
  
  return (
    <div style={{ width: '100%', overflowX: 'auto', display: 'flex', justifyContent: 'center', marginTop: 24 }}>
      <svg suppressHydrationWarning width="100%" height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible', fontFamily: INTER }}>
        {Array.from({ length: yTicks + 1 }).map((_, i) => {
          const val = (maxY / yTicks) * i;
          const y = h - pad.b - (val / maxY) * (h - pad.t - pad.b);
          return (
            <g key={`y-${i}`}>
              <line suppressHydrationWarning x1={pad.l} y1={y.toFixed(1)} x2={w - pad.r} y2={y.toFixed(1)} stroke={C.border} strokeWidth="1" strokeDasharray="4 4" />
              <text suppressHydrationWarning x={pad.l - 8} y={(y + 4).toFixed(1)} fontSize="10" fill={C.ink3} textAnchor="end">{fmtIN(val)}</text>
            </g>
          );
        })}
        {pointsData.map((d, i) => {
          if (i === 0 || i === pointsData.length - 1 || i % Math.ceil(pointsData.length / 5) === 0) {
            const x = pad.l + ((d.year - minX) / Math.max(1, (maxX - minX))) * (w - pad.l - pad.r);
            return (
              <text suppressHydrationWarning key={`x-${i}`} x={x.toFixed(1)} y={h - 5} fontSize="10" fill={C.ink3} textAnchor="middle">{d.year === 0 ? 'Today' : `Yr ${d.year}`}</text>
            );
          }
          return null;
        })}
        <polyline suppressHydrationWarning
          points={pointsData.map(d => `${(pad.l + ((d.year - minX) / (maxX - minX)) * (w - pad.l - pad.r)).toFixed(1)},${(h - pad.b - (d.val / maxY) * (h - pad.t - pad.b)).toFixed(1)}`).join(' ')} 
          fill="none" stroke={C.dark} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
        />
        {yearsToTriple <= maxX && (() => {
          const x = pad.l + ((yearsToTriple - minX) / (maxX - minX)) * (w - pad.l - pad.r);
          const y = h - pad.b - ((amount * 3) / maxY) * (h - pad.t - pad.b);
          return (
            <g>
              <line suppressHydrationWarning x1={x.toFixed(1)} y1={h - pad.b} x2={x.toFixed(1)} y2={y.toFixed(1)} stroke={C.lime2} strokeWidth="2" strokeDasharray="4 4" />
              <circle suppressHydrationWarning cx={x.toFixed(1)} cy={y.toFixed(1)} r="6" fill={C.lime} stroke={C.dark} strokeWidth="2" />
              <text suppressHydrationWarning x={x.toFixed(1)} y={(y - 12).toFixed(1)} fontSize="12" fontWeight="700" fill={C.dark} textAnchor="middle">Tripled!</text>
            </g>
          );
        })()}
      </svg>
    </div>
  );
}


const TIMELINE_OPTIONS = [
  { value: 'auto', label: 'Until Tripled' },
  { value: '10', label: '10 Years' },
  { value: '20', label: '20 Years' },
  { value: '30', label: '30 Years' },
  { value: '40', label: '40 Years' },
];

const POPULAR = [
  { href: '/calculators/sip-calculator',     label: 'SIP Calculator' },
  { href: '/calculators/rule-of-72-calculator', label: 'Rule of 72 Calculator' },
  { href: '/calculators/nps-calculator',     label: 'NPS Calculator' },
  { href: '/calculators/ppf-calculator',     label: 'PPF Calculator' },
  { href: '/calculators/lumpsum-calculator', label: 'Lumpsum Calculator' },
];
const MORE = [
  { href: '/calculators/fd-calculator',                label: 'FD Calculator' },
  { href: '/calculators/compound-interest-calculator', label: 'Compound Interest Calculator' },
  { href: '/calculators/income-tax-calculator',        label: 'Income Tax Calculator' },
  { href: '/calculators/emi-calculator',               label: 'EMI Calculator' },
];

export default function RuleOf114Client({ region = 'in', faqs }: { region?: string, faqs: any[] }) {
  const defaultSettings = { rate: 8, amountInput: '', timelineView: 'auto' };
  const { settings, updateSettings } = useCalculatorSettings('rule-of-114-calculator', defaultSettings);
  const { rate, amountInput, timelineView } = settings;
  const setRate = (v: any) => updateSettings({ rate: typeof v === 'function' ? v(settings.rate) : v });
  const setAmountInput = (v: any) => updateSettings({ amountInput: typeof v === 'function' ? v(settings.amountInput) : v });
  const setTimelineView = (v: string) => updateSettings({ timelineView: v });

  const [mobile, setMobile] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const yearsToTriple = rate > 0 ? 114 / rate : 0;
  const exactYears = rate > 0 ? Math.log(3) / Math.log(1 + rate / 100) : 0;
  
  const parsedAmount = parseFloat(amountInput);
  const amount = isNaN(parsedAmount) || parsedAmount <= 0 ? 100000 : parsedAmount;
  const tripledAmount = amount * 3;
  const investedPct = Math.round((1 / 3) * 100);
  const returnsPct = 100 - investedPct;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>Rule of 114 Calculator</h1>
        <p style={{ fontSize: 14.5, color: C.ink3, margin: '0 0 28px' }}>
          Estimate how many years it takes for your investment to triple at any annual return rate
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          <div style={{ minWidth: 0 }}>
            {/* CALCULATOR CARD */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 40 }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                {/* Input panel */}
                <div style={{ padding: mobile ? '20px' : '36px 48px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Investment Assumptions</p>
                    <CurrencySelector theme="light" />
                  </div>
                  
                  <Slider label="Annual Return Rate" value={rate} min={1} max={30} step={0.5} fmt={v => `${v}%`} onChange={setRate} compact={mobile} />
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                    <label style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400 }}>
                      Current Investment Amount <span style={{ fontSize: 12, color: C.ink3 }}>(Optional)</span>
                    </label>
                    <input 
                      type="number" 
                      placeholder="e.g. 100000"
                      value={amountInput} 
                      onChange={e => setAmountInput(e.target.value)}
                      style={{ fontSize: 16, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', outline: 'none', width: '100%', fontFamily: INTER }}
                    />
                  </div>
                </div>

                {/* Results panel */}
                <div style={{ padding: mobile ? '20px' : '36px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 16, padding: mobile ? '20px' : '28px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, boxShadow: '0 8px 30px rgba(16,18,20,0.15)' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#101214', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Time to Triple</span>
                    <div style={{ fontSize: mobile ? 36 : 48, fontWeight: 900, color: '#101214', letterSpacing: '-0.02em', textAlign: 'center', lineHeight: 1 }}>
                      {yearsToTriple.toFixed(1)} <span style={{ fontSize: 20, fontWeight: 700, color: '#50565C' }}>Years</span>
                    </div>
                  </div>

                  {/* Donut chart */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, marginBottom: 8, order: mobile ? 1 : -1 }}>
                    <DonutChart invested={amount} returns={tripledAmount - amount} investedPct={investedPct} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 16, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Invested {investedPct}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Returns {returnsPct}%</span>
                    </div>
                  </div>

                  <div style={{ width: '100%', marginTop: 8, padding: '16px 20px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 12 }}>
                    <p style={{ fontSize: 15, color: C.ink2, margin: 0, lineHeight: 1.6, fontWeight: 500 }}>
                      At an <strong style={{ fontWeight: 800, color: C.dark }}>{rate}%</strong> annual return, your investment could triple in about <strong style={{ fontWeight: 800, color: C.dark }}>{yearsToTriple.toFixed(1)} years</strong>.
                      {!isNaN(parsedAmount) && parsedAmount > 0 && (
                        <span> Your {fmtIN(parsedAmount)} will grow to <strong style={{ fontWeight: 800, color: C.dark }}>{fmtIN(tripledAmount)}</strong>.</span>
                      )}
                    </p>
                  </div>
                  
                  <div style={{ width: '100%', marginTop: 16, display: 'flex', justifyContent: 'space-between', fontSize: 13, color: C.ink2, borderTop: `1px dashed ${C.border}`, paddingTop: 16 }}>
                    <span>Rule of 114: <strong>{yearsToTriple.toFixed(2)} yrs</strong></span>
                    <span>Exact math: <strong>{exactYears.toFixed(2)} yrs</strong></span>
                  </div>
                </div>
              </div>

              {/* Chart Section: collapsible */}
              <div style={{ borderTop: `1px solid ${C.border}`, background: '#fafafa' }}>
                <button
                  onClick={() => setShowTimeline(s => !s)}
                  aria-expanded={showTimeline}
                  aria-controls="growth-timeline-panel"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: mobile ? '18px 20px' : '20px 48px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: INTER }}
                >
                  <div>
                    <p style={{ fontSize: 16, fontWeight: 700, color: C.ink, margin: '0 0 4px' }}>Projected Growth Timeline</p>
                    <p style={{ fontSize: 13, color: C.ink3, margin: 0 }}>
                      {showTimeline
                        ? (timelineView === 'auto' ? 'Showing monetary growth over time until the investment triples.' : `Showing monetary growth over ${timelineView} years.`)
                        : 'Click to see a year-by-year chart of how your investment grows.'}
                    </p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transform: showTimeline ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {showTimeline && (
                  <div id="growth-timeline-panel" style={{ padding: mobile ? '0 20px 20px' : '0 48px 24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 4 }}>
                      <select
                        value={timelineView}
                        onChange={e => setTimelineView(e.target.value)}
                        aria-label="Select projected growth timeline range"
                        style={{ fontSize: 13, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 12px', outline: 'none', fontFamily: INTER, cursor: 'pointer' }}
                      >
                        {TIMELINE_OPTIONS.map(o => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>
                    <SimpleGrowthChart
                      yearsToTriple={yearsToTriple}
                      amount={amount}
                      rate={rate}
                      fmtIN={fmtC}
                      mobile={mobile}
                      viewYears={timelineView === 'auto' ? undefined : parseInt(timelineView, 10)}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* QUICK REFERENCE TABLE */}
            <div style={{ marginBottom: 40 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: C.ink, margin: '0 0 16px' }}>Rule of 114 Quick Reference</h3>
              <div style={{ overflowX: 'auto', border: `1px solid ${C.border}`, borderRadius: 12 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: '#f4f5f6', borderBottom: `1px solid ${C.border}` }}>
                      <th style={{ padding: '12px 16px', fontSize: 12, fontWeight: 700, color: C.ink }}>Interest Rate</th>
                      <th style={{ padding: '12px 16px', fontSize: 12, fontWeight: 700, color: C.ink }}>Years to Triple (Rule of 114)</th>
                      <th style={{ padding: '12px 16px', fontSize: 12, fontWeight: 700, color: C.ink }}>Actual Years (Exact Math)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[4, 6, 8, 10, 12, 15, 20].map((r, i) => (
                      <tr key={r} style={{ borderBottom: i < 6 ? `1px solid ${C.border}` : 'none', background: i % 2 === 0 ? C.white : '#fafafa' }}>
                        <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 700, color: C.dark }}>{r}%</td>
                        <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 600, color: C.ink2 }}>{(114/r).toFixed(1)}</td>
                        <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 500, color: C.ink3 }}>{(Math.log(3)/Math.log(1+r/100)).toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* PRIMARY CA CTA + SAVE RESULTS + ARTICLE */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>
            <article style={{ fontFamily: INTER }}>
              {(() => {
                const h2 = { fontSize: mobile ? 18 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
                const p  = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
                const sec = { margin: '0 0 40px' } as React.CSSProperties;
                return (
                  <>
                    <div style={sec}>
                      <h2 style={h2} id="what-is-rule-of-114">What Is the Rule of 114?</h2>
                      <p style={p}>
                        The Rule of 114 is a mental math shortcut that estimates how many years it takes for a lumpsum investment to triple in value. Divide 114 by your expected annual rate of return and you get the approximate number of years required.
                      </p>
                      <p style={p}>
                        At 10%, 114 / 10 = 11.4 years. At 12%, 114 / 12 = 9.5 years. The rule works because ln(3) is approximately 1.0986, and 114 is a close linear approximation for the logarithmic compounding formula across typical interest rates.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 style={h2} id="where-the-number-comes-from">Where the Rule of 114 Number Comes From</h2>
                      <p style={p}>
                        The exact tripling time equals the natural logarithm of 3 divided by the natural logarithm of one plus the return. The Rule of 114 replaces that logarithmic formula with a simple division, which is what makes it usable without a calculator.
                      </p>
                      <p style={p}>
                        The natural log of 3 is about 1.0986, so at very low rates the pure interest constant is close to 109.9, not 114. The number is nudged up to 114 because that value gives better accuracy across the middle range of returns where most Indian investors actually operate, roughly 8 to 15 percent on equity mutual funds and balanced portfolios.
                      </p>
                      <p style={p}>
                        This is the same design choice behind the Rule of 72 for doubling and the Rule of 144 for quadrupling: each constant is a rounded stand-in for a curve, not the curve itself. The true constant that gives an exact tripling time actually drifts with the return rate, sitting near 110 at low single-digit rates and climbing past 119 at high double-digit rates. This drift is predictable rather than random, which is why the calculator above shows both the Rule of 114 shortcut and the exact compounded answer side by side rather than just one number.
                      </p>
                      <p style={p}>
                        Like all rules of this kind, the Rule of 114 ignores taxes on withdrawal, expense ratios, and rupee-cost averaging. Your real tripling time depends on the actual product you hold and how it is taxed.
                      </p>
                      <p style={p}>
                        Before locking in a return assumption for planning, check it against the <a href="https://www.sebi.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SEBI investor education resources</a>, which cover realistic return ranges for regulated Indian investment products.
                      </p>
                      <p style={p}>
                        Historical category returns published by <a href="https://www.amfiindia.com" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>AMFI</a> are a useful cross-check for mutual fund return assumptions specifically.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 style={h2} id="rule-of-114-formula">Rule of 114 Formula</h2>
                      <p style={{ ...p, fontSize: 18, fontWeight: 700, color: C.dark }}>
                        Years to Triple = 114 / Annual Interest Rate
                      </p>
                      <p style={p}>
                        If you expect a 10% annual return from an index fund, 114 / 10 = 11.4 years to triple. Invest Rs 1,00,000 and it grows to Rs 3,00,000 in roughly 11.5 years. The exact formula using natural logarithms is: Years = ln(3) / ln(1 + rate). The calculator above shows both numbers.
                      </p>
                      <p style={p}>
                        The Rule of 114 is most accurate between 6% and 12% annual returns. Above 15%, the approximation starts to drift and the exact logarithmic formula is preferable.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 style={h2} id="rule-72-vs-114">Difference Between Rule of 72 and Rule of 114</h2>
                      <p style={p}>
                        Both rules are shortcuts for compound interest calculations:
                      </p>
                      <ul style={{ ...p, paddingLeft: 20 }}>
                        <li><strong>The Rule of 72</strong> tells you how long it takes to <strong>double</strong> your money (72 / rate).</li>
                        <li><strong>The Rule of 114</strong> tells you how long it takes to <strong>triple</strong> your money (114 / rate).</li>
                        <li><strong>The Rule of 144</strong> tells you how long it takes to <strong>quadruple</strong> your money (144 / rate).</li>
                      </ul>
                      <p style={p}>
                        At 10%: double in 7.2 years, triple in 11.4 years, quadruple in 14.4 years. These rules help you compare investment avenues and understand wealth creation timelines without a spreadsheet.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 style={h2} id="tripling-time-by-investment">Tripling Time by Investment Type</h2>
                      <p style={p}>
                        The table below applies the Rule of 114 to common Indian investment products at typical return assumptions for 2025-26. A savings account triples slowly because the rate is low, while an aggressive equity fund can triple in well under a decade, assuming the return holds over the full period, which is never guaranteed for market-linked products.
                      </p>
                      <div style={{ overflowX: 'auto', border: `1px solid ${C.border}`, borderRadius: 12, marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <thead>
                            <tr style={{ background: '#f4f5f6', borderBottom: `1px solid ${C.border}` }}>
                              <th style={{ padding: '12px 16px', fontWeight: 700, color: C.ink, textAlign: 'left' }}>Investment Type (Typical Return)</th>
                              <th style={{ padding: '12px 16px', fontWeight: 700, color: C.ink, textAlign: 'center' }}>Rule of 114</th>
                              <th style={{ padding: '12px 16px', fontWeight: 700, color: C.ink, textAlign: 'center' }}>Exact Years</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { label: 'Savings account (3.5%)', r: 3.5 },
                              { label: 'Fixed deposit (7%)', r: 7 },
                              { label: 'PPF (7.1%)', r: 7.1 },
                              { label: 'Balanced fund (10%)', r: 10 },
                              { label: 'Equity fund (12%)', r: 12 },
                              { label: 'Aggressive equity (15%)', r: 15 },
                            ].map((row, i, arr) => (
                              <tr key={row.label} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none', background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ padding: '13px 16px', fontWeight: 600, color: C.ink2 }}>{row.label}</td>
                                <td style={{ padding: '13px 16px', textAlign: 'center', fontWeight: 700, color: C.dark }}>{(114 / row.r).toFixed(1)} years</td>
                                <td style={{ padding: '13px 16px', textAlign: 'center', fontWeight: 500, color: C.ink3 }}>{(Math.log(3) / Math.log(1 + row.r / 100)).toFixed(1)} years</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={{ ...p, margin: 0 }}>
                        Notice how the gap between the Rule of 114 estimate and the exact figure widens as the return rises. Below 8 percent the two numbers are close enough to plan around directly. Above 12 percent, lean on the exact column, since that is where the shortcut increasingly understates how long tripling actually takes.
                      </p>
                    </div>

                    <div style={{ margin: '0 0 8px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Compound Interest Calculator</p>
                        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>See the full year-by-year growth curve behind any tripling estimate, not just the endpoint.</p>
                      </div>
                      <Link className="fx-btn" href="/calculators/compound-interest-calculator" target="_blank" rel="noopener noreferrer"
                        style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                    </div>

                    <div style={{ ...sec, marginTop: 32 }}>
                      <h2 style={h2} id="how-to-use">How to Use This Calculator</h2>
                      <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Set the annual return rate:</strong> move the slider or type your expected annual return. Common assumptions: 8% for balanced funds, 10% for large-cap equity, 12% for diversified equity.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Enter your investment amount (optional):</strong> type the lumpsum amount you plan to invest. The calculator projects the tripled value. Leave blank to see only the time estimate.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Read the result:</strong> the dark result box shows the Rule of 114 estimate. Below it, the calculator shows the exact mathematical answer for comparison, plus a summary sentence with the projection.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Review the chart and table:</strong> the growth timeline chart visualises compounding over time. The quick reference table shows years to triple for rates from 4% to 20%.
                        </li>
                      </ol>
                      <p style={{ ...p, margin: 0 }}>
                        Click any input value to type a precise number. The currency selector converts all displayed amounts to USD, EUR, GBP, or other currencies for NRI investors.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 style={h2} id="real-world-examples">Real Rule of 114 Examples From India</h2>
                      <p style={p}>
                        Numbers make more sense against a real goal, not just a percentage. The three scenarios below apply the Rule of 114 to common planning situations across different cities and return assumptions.
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <div>
                          <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, margin: '0 0 6px' }}>An IT professional in Pune saving for a child's education</p>
                          <p style={{ ...p, margin: 0 }}>
                            He set aside Rs 8 lakh and wants it to reach Rs 24 lakh in about 10 years, roughly tripling, for his daughter's college fund. Dividing 114 by his expected 12 percent return gives 9.5 years, comfortably inside his 10-year horizon. With his existing corpus alone, without any additional monthly contributions, the exact figure confirms the estimate at 9.7 years, a difference of only a few months.
                          </p>
                        </div>
                        <div>
                          <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, margin: '0 0 6px' }}>A doctor in Hyderabad evaluating an aggressive equity portfolio</p>
                          <p style={{ ...p, margin: 0 }}>
                            She is evaluating an aggressive portfolio that expects 18 percent returns and used the Rule of 114 to get a 6.3-year tripling estimate. At 18 percent, the true tripling constant runs closer to 119, so the exact tripling time is about 6.6 years, roughly four months longer than the shortcut suggested. This mattered because she was making a real planning decision: relying on the rounded 6.3 years would have made her slightly overoptimistic.
                          </p>
                        </div>
                        <div>
                          <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, margin: '0 0 6px' }}>A schoolteacher in Kolkata planning for retirement</p>
                          <p style={{ ...p, margin: 0 }}>
                            His equity investments, at 12 percent, would triple in just 9.5 years on paper. His real return, 12 percent minus 6 percent inflation, is only 6 percent, so his purchasing power would actually take about 19 years to triple, twice as long as the nominal figure suggested. After factoring in capital gains tax on withdrawal, the real tripling time stretched further still.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div style={sec}>
                      <h2 style={h2} id="ways-to-use-well">Six Ways to Use the Rule of 114 Well</h2>
                      <p style={p}>
                        The Rule of 114 is most useful as a planning shortcut, not a promise. These six habits keep it accurate enough to act on.
                      </p>
                      <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Plan big goals around tripling:</strong> if your money triples in 9.5 years at 12 percent and your goal is 10 years away, you know you are on track without opening a spreadsheet.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Always check the exact figure at high returns:</strong> the Rule of 114 is most accurate between 8 and 12 percent. Above 15 percent, use the exact compounded answer this calculator provides instead of dividing by 114 in your head.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Compare tripling times across options:</strong> divide 114 by each investment's expected return to see the tripling times side by side, the same way the table above compares a savings account against an equity fund.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Think in the full multiple ladder:</strong> do not stop at tripling. Use the Rule of 72 for doubling and the Rule of 144 for quadrupling alongside 114 to see the full compounding journey. At 12 percent, money doubles in about 6 years, triples in about 9.5, and quadruples in about 12, so the jump from triple to quadruple takes only a few more years past a triple milestone.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Always weigh real against nominal:</strong> nominal tripling flatters your return. What matters is how fast your purchasing power triples, which depends on your real return after inflation.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Use it for realistic return targets:</strong> run the rule in reverse to set sensible expectations. If you want to triple your money in 10 years, you need about a 11.4 percent return, achievable with only some risk. If you want to triple it in 3 years, you would need around 38 percent, which is unrealistic and a warning sign for any unregulated product that promises it.
                        </li>
                      </ol>
                    </div>

                    <div style={sec}>
                      <h2 style={h2} id="key-facts">What Are the Key Rule of 114 Facts?</h2>
                      <p style={p}>
                        Use this quick reference for the Rule of 114 and its sister rules. All figures are indicative for the 2025-26 Indian context.
                      </p>
                      <div style={{ overflowX: 'auto', border: `1px solid ${C.border}`, borderRadius: 12 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <thead>
                            <tr style={{ background: '#f4f5f6', borderBottom: `1px solid ${C.border}` }}>
                              <th style={{ padding: '12px 16px', fontWeight: 700, color: C.ink, textAlign: 'left' }}>Item</th>
                              <th style={{ padding: '12px 16px', fontWeight: 700, color: C.ink, textAlign: 'left' }}>Value or Rule</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['Rule of 114 formula', 'Years to triple = 114 divided by return'],
                              ['Reverse formula', 'Return needed = 114 divided by years'],
                              ['Most accurate range', '8 to 12 percent'],
                              ['True constant drift', 'About 110 at low rates, 119 at high rates'],
                              ['Purest number', '109.9, from the natural log of 3'],
                              ['Triples at 12%', 'About 9.5 years'],
                              ['Triples at 10%', 'About 11.4 years'],
                              ['Triples at 7%', 'About 16 years'],
                              ['Rule of 72', 'Time to double your money'],
                              ['Rule of 144', 'Time to quadruple your money'],
                            ].map(([k, v], i, arr) => (
                              <tr key={k} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none', background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ padding: '13px 16px', fontWeight: 600, color: C.ink }}>{k}</td>
                                <td style={{ padding: '13px 16px', color: C.ink2 }}>{v}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* SECONDARY CA CTA before FAQ */}

                    <div style={{ margin: '0 0 40px' }}>
                      <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                      <FAQ faqs={faqs} />
                    </div>

                    <div style={sec}>
                      <h2 style={h2} id="pairs-with-calculators">Which Calculators Pair With the Rule of 114?</h2>
                      <p style={p}>
                        These tools use the same compounding math from different angles: doubling, quadrupling, SIP timing, and inflation-adjusted planning.
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 12 }}>
                        {[
                          { href: '/calculators/rule-of-72-calculator', label: 'Rule of 72 Calculator', sub: 'Time to double your money' },
                          { href: '/calculators/compound-interest-calculator', label: 'Compound Interest Calculator', sub: 'See the full growth curve' },
                          { href: '/calculators/sip-calculator', label: 'SIP Calculator', sub: 'Project a monthly investment' },
                          { href: '/calculators/cagr-calculator', label: 'CAGR Calculator', sub: 'Find your actual annual return' },
                          { href: '/calculators/lumpsum-calculator', label: 'Lumpsum Calculator', sub: 'Grow a one-time investment' },
                          { href: '/calculators/inflation-calculator', label: 'Inflation Calculator', sub: 'See how inflation erodes value' },
                          { href: '/calculators/ppf-calculator', label: 'PPF Calculator', sub: 'Project 15-year PPF growth' },
                          { href: '/calculators/fd-calculator', label: 'FD Calculator', sub: 'Fixed deposit maturity value' },
                        ].map(item => (
                          <Link key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 16px', height: '100%', transition: 'border-color 0.15s' }}
                              onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = C.dark; }}
                              onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; }}>
                              <p style={{ fontSize: 13.5, fontWeight: 700, color: C.ink, margin: '0 0 4px' }}>{item.label}</p>
                              <p style={{ fontSize: 12, color: C.ink3, margin: 0 }}>{item.sub}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                        <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only. The Rule of 114 is a mathematical approximation and does not predict actual investment returns. Past performance does not guarantee future results. This calculator is for educational and planning purposes and does not constitute financial advice. Consult a SEBI-registered investment adviser before making investment decisions.
                      </p>
                    </div>
                  </>
                );
              })()}
            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.r114-sidebar::-webkit-scrollbar{width:5px}.r114-sidebar::-webkit-scrollbar-track{background:transparent}.r114-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.r114-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="r114-sidebar" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <SidebarList title="Popular Calculators" items={POPULAR} />
              <SidebarList title="More Calculators" items={MORE} />
            </div>
          </aside>

        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/sip-calculator|SIP', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/rule-of-72-calculator|Rule of 72', '/calculators/cagr-calculator|CAGR', '/calculators/emi-calculator|EMI', '/calculators/fd-calculator|FD', '/calculators/ppf-calculator|PPF', '/calculators/xirr-calculator|XIRR', '/calculators/compound-interest-calculator|Compound Int.'] },
        { hd: 'Topics', links: ['/calculators/sip-calculator|Mutual Funds', '/calculators/home-loan-calculator|Home Loans', '/calculators/fd-calculator|Fixed Deposits', '/calculators/retirement-calculator|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

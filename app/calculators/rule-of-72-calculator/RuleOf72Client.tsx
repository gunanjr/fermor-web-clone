'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useLayoutEffect } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
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
function Slider({ label, value, min, max, step, fmt, onChange, compact }: {
  label: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void; compact?: boolean;
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
          {label}
        </label>
        {editing ? (
          <input autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 100, outline: 'none', color: C.dark, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            style={{ fontSize: compact ? 13 : 14, fontWeight: 700, color: C.dark, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 16px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 80 : 90, textAlign: 'center' }}>
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

function SimpleGrowthChart({ yearsToTarget, amount, rate, multiple, fmtIN, mobile }: { yearsToTarget: number, amount: number, rate: number, multiple: number, fmtIN: (v: number) => string, mobile: boolean }) {
  const w = mobile ? 300 : 600;
  const h = 240;
  const pad = { t: 20, r: 20, b: 30, l: mobile ? 60 : 80 };

  // Calculate data points
  const pointsData = [];
  const totalYears = Math.max(1, Math.ceil(yearsToTarget * 1.5)); // Show slightly past the target
  for (let i = 0; i <= totalYears; i++) {
    pointsData.push({ year: i, val: amount * Math.pow(1 + rate / 100, i) });
  }

  const maxY = amount * multiple * 1.25; // Cap Y axis for better view
  const minX = 0;
  const maxX = totalYears;

  const yTicks = 4;
  
  return (
    <div style={{ width: '100%', overflowX: 'auto', display: 'flex', justifyContent: 'center', marginTop: 24 }}>
      <svg suppressHydrationWarning width="100%" height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible', fontFamily: INTER }}>
        {/* Y-axis ticks */}
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
        {/* X-axis labels */}
        {pointsData.map((d, i) => {
          if (i === 0 || i === pointsData.length - 1 || i % Math.ceil(pointsData.length / 5) === 0) {
            const x = pad.l + ((d.year - minX) / Math.max(1, (maxX - minX))) * (w - pad.l - pad.r);
            return (
              <text suppressHydrationWarning key={`x-${i}`} x={x.toFixed(1)} y={h - 5} fontSize="10" fill={C.ink3} textAnchor="middle">{d.year === 0 ? 'Today' : `Yr ${d.year}`}</text>
            );
          }
          return null;
        })}
        {/* Line */}
        <polyline suppressHydrationWarning
          points={pointsData.map(d => `${(pad.l + ((d.year - minX) / (maxX - minX)) * (w - pad.l - pad.r)).toFixed(1)},${(h - pad.b - (d.val / maxY) * (h - pad.t - pad.b)).toFixed(1)}`).join(' ')} 
          fill="none" stroke={C.dark} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
        />
        {/* Target Multiple Indicator */}
        {(() => {
          const x = pad.l + ((yearsToTarget - minX) / (maxX - minX)) * (w - pad.l - pad.r);
          const y = h - pad.b - ((amount * multiple) / maxY) * (h - pad.t - pad.b);
          const label = multiple === 2 ? 'Doubled!' : multiple === 3 ? 'Tripled!' : 'Quadrupled!';
          return (
            <g>
              <line suppressHydrationWarning x1={x.toFixed(1)} y1={h - pad.b} x2={x.toFixed(1)} y2={y.toFixed(1)} stroke={C.lime2} strokeWidth="2" strokeDasharray="4 4" />
              <circle suppressHydrationWarning cx={x.toFixed(1)} cy={y.toFixed(1)} r="6" fill={C.lime} stroke={C.dark} strokeWidth="2" />
              <text suppressHydrationWarning x={x.toFixed(1)} y={(y - 12).toFixed(1)} fontSize="12" fontWeight="700" fill={C.dark} textAnchor="middle">{label}</text>
            </g>
          );
        })()}
      </svg>
    </div>
  );
}

export default function RuleOf72Client({ region = 'in', faqs }: { region?: string, faqs: { q: string; a: string }[] }) {
  const defaultSettings = { rate: 8, amountInput: '', mode: 'time' as 'time' | 'rate', multiple: 2 as 2 | 3 | 4, years: 10 };
  const { settings, updateSettings } = useCalculatorSettings('rule-of-72-calculator', defaultSettings);
  const { rate, amountInput, mode, multiple, years } = settings;
  const setRate = (v: any) => updateSettings({ rate: typeof v === 'function' ? v(settings.rate) : v });
  const setAmountInput = (v: any) => updateSettings({ amountInput: typeof v === 'function' ? v(settings.amountInput) : v });
  const setMode = (v: 'time' | 'rate') => updateSettings({ mode: v });
  const setMultiple = (v: 2 | 3 | 4) => updateSettings({ multiple: v });
  const setYears = (v: any) => updateSettings({ years: typeof v === 'function' ? v(settings.years) : v });
  const [mobile, setMobile] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [showChart, setShowChart] = useState(true);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const divisor = multiple === 2 ? 72 : multiple === 3 ? 114 : 144;
  const multipleLabel = multiple === 2 ? 'double' : multiple === 3 ? 'triple' : 'quadruple';

  // Time mode: given rate, find years. Rate mode: given years, find required rate.
  const yearsToDouble = mode === 'time' ? (rate > 0 ? divisor / rate : 0) : (years > 0 ? divisor / years : 0);
  const exactYears = mode === 'time' ? (rate > 0 ? Math.log(multiple) / Math.log(1 + rate / 100) : 0) : years;
  const requiredRate = mode === 'rate' ? (years > 0 ? divisor / years : 0) : rate;
  const exactRequiredRate = mode === 'rate' ? (years > 0 ? (Math.pow(multiple, 1 / years) - 1) * 100 : 0) : rate;

  // Display amount is user input or a default of 100,000 for chart projection
  const parsedAmount = parseFloat(amountInput);
  const amount = isNaN(parsedAmount) || parsedAmount <= 0 ? 100000 : parsedAmount;
  const finalAmount = amount * multiple;
  const chartRate = mode === 'time' ? rate : requiredRate;
  const chartYears = mode === 'time' ? yearsToDouble : years;

  const POPULAR = [
    { href: '/calculators/sip-calculator',     label: 'SIP Calculator' },
    { href: '/calculators/cagr-calculator',    label: 'CAGR Calculator' },
    { href: '/calculators/nps-calculator',     label: 'NPS Calculator' },
    { href: '/calculators/ppf-calculator',     label: 'PPF Calculator' },
    { href: '/calculators/swp-calculator',     label: 'SWP Calculator' },
    { href: '/calculators/lumpsum-calculator', label: 'Lumpsum Calculator' },
  ];
  const MORE = [
    { href: '/calculators/fd-calculator',                label: 'FD Calculator' },
    { href: '/calculators/compound-interest-calculator', label: 'Compound Interest Calculator' },
    { href: '/calculators/inflation-calculator',         label: 'Inflation Calculator' },
    { href: '/calculators/rd-calculator',                label: 'RD Calculator' },
    { href: '/calculators/income-tax-calculator',        label: 'Income Tax Calculator' },
    { href: '/calculators/emi-calculator',               label: 'EMI Calculator' },
  ];

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 28px', letterSpacing: '-0.025em' }}>Rule of 72 Calculator</h1>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          <div style={{ minWidth: 0 }}>
            {/* CALCULATOR CARD */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 20 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                {/* Input panel */}
                <div style={{ padding: mobile ? '20px' : '36px 48px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Investment Assumptions</p>
                    <CurrencySelector theme="light" />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400, display: 'block', marginBottom: 10 }}>Calculate</label>
                    <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                      {([
                        { v: 'time', label: 'Time Needed' },
                        { v: 'rate', label: 'Rate Needed' },
                      ] as { v: 'time' | 'rate'; label: string }[]).map(({ v, label }) => (
                        <button key={v} onClick={() => setMode(v)}
                          style={{ flex: 1, padding: '9px 12px', fontSize: 13, fontFamily: INTER, border: 'none', cursor: 'pointer', background: mode === v ? C.white : 'transparent', color: mode === v ? C.ink : C.ink3, fontWeight: mode === v ? 600 : 400 }}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400, display: 'block', marginBottom: 10 }}>Multiple</label>
                    <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                      {([
                        { v: 2, label: 'Double (72)' },
                        { v: 3, label: 'Triple (114)' },
                        { v: 4, label: 'Quadruple (144)' },
                      ] as { v: 2 | 3 | 4; label: string }[]).map(({ v, label }) => (
                        <button key={v} onClick={() => setMultiple(v)}
                          style={{ flex: 1, padding: '9px 8px', fontSize: 12.5, fontFamily: INTER, border: 'none', cursor: 'pointer', background: multiple === v ? C.white : 'transparent', color: multiple === v ? C.ink : C.ink3, fontWeight: multiple === v ? 600 : 400 }}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {mode === 'time' ? (
                    <Slider label="Annual Return Rate" value={rate} min={1} max={30} step={0.5} fmt={v => `${v}%`} onChange={setRate} compact={mobile} />
                  ) : (
                    <Slider label="Time Horizon" value={years} min={1} max={40} step={1} fmt={v => `${v} Yr`} onChange={setYears} compact={mobile} />
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                    <label style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400 }}>
                      Current Investment Amount <span style={{ fontSize: 12, color: C.ink3 }}>(Optional)</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 100000"
                      value={amountInput}
                      onChange={e => setAmountInput(e.target.value)}
                      style={{ fontSize: 16, fontWeight: 600, color: C.dark, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', outline: 'none', width: '100%', fontFamily: INTER }}
                    />
                  </div>
                </div>

                {/* Results panel */}
                <div style={{ padding: mobile ? '20px' : '36px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  {/* Donut chart */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, order: mobile ? 1 : -1 }}>
                    {(() => {
                      const R = 80, sw = 20, cx = 106, cy = 106;
                      const circ = 2 * Math.PI * R;
                      const invested = (1 / multiple) * 100;
                      const investedDash = (invested / 100) * circ;
                      const label = mode === 'time' ? yearsToDouble.toFixed(1) : requiredRate.toFixed(1);
                      const sub = mode === 'time' ? 'years' : '% p.a.';
                      return (
                        <svg role="img" aria-label={`Original investment ${invested.toFixed(0)}%, growth earned ${(100 - invested).toFixed(0)}% at the point the investment reaches ${multiple}x`}
                          width="212" height="212" viewBox="0 0 212 212" style={{ display: 'block' }}>
                          <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
                          <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
                            strokeDasharray={`${investedDash.toFixed(2)} ${(circ - investedDash).toFixed(2)}`} strokeDashoffset={circ / 4}
                            style={{ transition: 'stroke-dasharray 0.4s ease' }} />
                          <text x={cx} y={cy - 12} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>{mode === 'time' ? 'Time to' : 'Rate to'}</text>
                          <text x={cx} y={cy + 16} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{label}</text>
                          <text x={cx} y={cy + 34} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>{multipleLabel} ({sub})</text>
                        </svg>
                      );
                    })()}
                  </div>
                  <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginBottom: 20, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Original ({(100 / multiple).toFixed(0)}%)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Growth ({(100 - 100 / multiple).toFixed(0)}%)</span>
                    </div>
                  </div>

                  {mode === 'time' ? (
                    <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Time to {multipleLabel[0].toUpperCase() + multipleLabel.slice(1)}</span>
                      <span aria-live="polite" style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                        {yearsToDouble.toFixed(1)} Years
                      </span>
                    </div>
                  ) : (
                    <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Rate Needed to {multipleLabel[0].toUpperCase() + multipleLabel.slice(1)}</span>
                      <span aria-live="polite" style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                        {requiredRate.toFixed(2)}% p.a.
                      </span>
                    </div>
                  )}

                  <div style={{ marginTop: 24, padding: '16px 20px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 12 }}>
                    <p style={{ fontSize: 15, color: C.dark, margin: 0, lineHeight: 1.6, fontWeight: 500 }}>
                      {mode === 'time' ? (
                        <>At an <strong style={{ fontWeight: 800 }}>{rate}%</strong> annual return, your investment could {multipleLabel} in about <strong style={{ fontWeight: 800 }}>{yearsToDouble.toFixed(1)} years</strong>.</>
                      ) : (
                        <>To {multipleLabel} your money in <strong style={{ fontWeight: 800 }}>{years} years</strong>, you need an annual return of about <strong style={{ fontWeight: 800 }}>{requiredRate.toFixed(2)}%</strong>.</>
                      )}
                      {!isNaN(parsedAmount) && parsedAmount > 0 && (
                        <span> Your {fmtIN(parsedAmount)} will grow to <strong style={{ fontWeight: 800 }}>{fmtIN(finalAmount)}</strong>.</span>
                      )}
                    </p>
                  </div>

                  <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', fontSize: 13, color: C.ink2, borderTop: `1px dashed ${C.border}`, paddingTop: 16 }}>
                    {mode === 'time' ? (
                      <>
                        <span>Rule of {divisor} Estimate: <strong>{yearsToDouble.toFixed(2)} yrs</strong></span>
                        <span>Exact Math: <strong>{exactYears.toFixed(2)} yrs</strong></span>
                      </>
                    ) : (
                      <>
                        <span>Rule of {divisor} Estimate: <strong>{requiredRate.toFixed(2)}%</strong></span>
                        <span>Exact Math: <strong>{exactRequiredRate.toFixed(2)}%</strong></span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* CHART SECTION */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', marginBottom: 20, boxShadow: '0 2px 16px rgba(16,18,20,0.06)' }}>
              <button onClick={() => setShowChart(v => !v)}
                aria-expanded={showChart} aria-controls="r72-growth-chart"
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 18px' : '18px 28px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, textAlign: 'left', gap: 12 }}>
                <div style={{ minWidth: 0 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: C.ink }}>Projected Growth Timeline</span>
                  {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>Growth until the investment reaches {multiple}x</span>}
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  aria-hidden="true" style={{ transform: showChart ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {showChart && (
                <div id="r72-growth-chart" style={{ padding: mobile ? '0 18px 20px' : '0 28px 24px', borderTop: `1px solid ${C.border}` }}>
                  <SimpleGrowthChart yearsToTarget={chartYears} amount={amount} rate={chartRate} multiple={multiple} fmtIN={fmtC} mobile={mobile} />
                </div>
              )}
            </div>

            {/* QUICK REFERENCE TABLE */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', marginBottom: 20, boxShadow: '0 2px 16px rgba(16,18,20,0.06)' }}>
              <button onClick={() => setShowTable(v => !v)}
                aria-expanded={showTable} aria-controls="r72-quick-reference"
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 18px' : '18px 28px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, textAlign: 'left', gap: 12 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: C.ink }}>Rule of {divisor} Quick Reference</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  aria-hidden="true" style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {showTable && (
                <div id="r72-quick-reference" style={{ padding: mobile ? '0 18px 18px' : '0 28px 22px', borderTop: `1px solid ${C.border}` }}>
                  <div style={{ overflowX: 'auto', marginTop: 16 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: 13 }}>
                      <thead>
                        <tr style={{ background: '#f4f5f6', borderBottom: `1px solid ${C.border}` }}>
                          <th style={{ padding: '12px 16px', fontSize: 12.5, fontWeight: 700, color: C.ink, whiteSpace: 'nowrap' as const }}>Interest Rate</th>
                          <th style={{ padding: '12px 16px', fontSize: 12.5, fontWeight: 700, color: C.ink, whiteSpace: 'nowrap' as const }}>Years to {multipleLabel[0].toUpperCase() + multipleLabel.slice(1)} (Rule of {divisor})</th>
                          <th style={{ padding: '12px 16px', fontSize: 12.5, fontWeight: 700, color: C.ink, whiteSpace: 'nowrap' as const }}>Actual Years (Exact Math)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[4, 6, 8, 10, 12, 15, 20].map((r, i) => (
                          <tr key={r} style={{ borderBottom: i < 6 ? `1px solid ${C.border}` : 'none', background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 700, color: C.dark, whiteSpace: 'nowrap' as const }}>{r}%</td>
                            <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 600, color: C.ink2, whiteSpace: 'nowrap' as const }}>{(divisor / r).toFixed(1)}</td>
                            <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 500, color: C.ink3, whiteSpace: 'nowrap' as const }}>{(Math.log(multiple) / Math.log(1 + r / 100)).toFixed(1)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* ARTICLE & FAQ */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>


            <article style={{ fontFamily: INTER }}>
              {(() => {
                const h2 = { fontSize: mobile ? 18 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
                const p  = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
                const sec = { margin: '0 0 40px' } as React.CSSProperties;
                const thS = { padding: '12px 16px', fontSize: 12.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const };
                const tdL = { padding: '11px 16px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const };
                const tdR = { padding: '11px 16px', fontSize: 13.5, color: C.ink, fontWeight: 600, border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const };
                const promoBar = (href: string, title: string, desc: string) => (
                  <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>{title}</p>
                      <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>{desc}</p>
                    </div>
                    <Link className="fx-btn" href={href} target="_blank" rel="noopener noreferrer"
                      style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      Open calculator
                    </Link>
                  </div>
                );
                return (
                  <>
                    <div style={sec} id="what-is-rule-of-72">
                      <h2 style={h2}>What Is the Rule of 72?</h2>
                      <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                        <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                          The Rule of 72 estimates how many years an investment takes to double at a fixed annual compound rate, by dividing 72 by that rate.
                        </p>
                      </div>
                      <p style={p}>
                        Instead of a financial calculator or logarithm formulas, you just divide 72 by your expected annual return.
                      </p>
                      <p style={p}>
                        The same shortcut extends to tripling (Rule of 114) and quadrupling (Rule of 144), both available as toggles above.
                      </p>
                    </div>

                    <div style={sec} id="how-formula-works">
                      <h2 style={h2}>How the Rule of 72 Formula Works</h2>
                      <p style={p}>The formula divides 72 by the annual interest rate to estimate the doubling time in years:</p>
                      <p style={{ ...p, fontSize: 18, fontWeight: 700, color: C.dark }}>
                        Years to Double = 72 ÷ Annual Interest Rate
                      </p>
                      <p style={p}>
                        At an 8% return, 72 ÷ 8 = 9. Your money doubles in roughly 9 years.
                      </p>
                      <p style={p}>
                        Rs 5,00,000 invested at 8% would reach about Rs 10,00,000 in 9 years, with no further contributions.
                      </p>
                    </div>

                    {promoBar('/calculators/compound-interest-calculator', 'Compound Interest Calculator', 'See the exact year-by-year compounding math behind the Rule of 72 estimate.')}

                    <div style={sec} id="reverse-rule-of-72">
                      <h2 style={h2}>Finding the Return Rate You Need (Reverse Rule of 72)</h2>
                      <p style={p}>
                        The Rule of 72 also works in reverse. Divide 72 by the years you have to find the return rate required.
                      </p>
                      <p style={p}>
                        Switch the calculator above to Rate Needed to try this directly.
                      </p>
                      <p style={{ ...p, fontSize: 18, fontWeight: 700, color: C.dark }}>
                        Required Annual Return = 72 ÷ Years Available
                      </p>
                      <p style={p}>
                        To double your money in exactly 8 years, you need 72 ÷ 8 = 9% annual return.
                      </p>
                      <p style={p}>
                        With 15 years to retirement, doubling once needs only 4.8% return, well within reach of conservative debt instruments.
                      </p>
                    </div>

                    <div style={sec} id="when-useful">
                      <h2 style={h2}>When the Rule of 72 Is Useful</h2>
                      <p style={p}>
                        The Rule of 72 is useful for quick portfolio checks, comparing assets, and gauging inflation&apos;s impact.
                      </p>
                      <p style={p}>
                        At 6% inflation, your purchasing power halves in about 12 years (72 ÷ 6).
                      </p>
                      <p style={p}>
                        It also applies to debt, not just investments. Indian credit card issuers typically charge 36 to 45% APR on unpaid balances, disclosed under the <a href="https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12300" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>RBI Master Direction on Credit Card and Debit Card Issuance</a>.
                      </p>
                      <p style={p}>
                        At 42% APR, an unpaid balance roughly doubles in under 2 years (72 ÷ 42), which is why revolving debt compounds against you just as fast as an investment compounds for you.
                      </p>
                    </div>

                    <div style={sec} id="rule-of-114-144">
                      <h2 style={h2}>Rule of 72 vs Rule of 114 vs Rule of 144</h2>
                      <p style={p}>
                        The Rule of 72 estimates doubling time. The Rule of 114 estimates tripling time, and the Rule of 144 estimates quadrupling time.
                      </p>
                      <p style={p}>
                        All three use the same divide-by-rate logic, just scaled to a different target multiple.
                      </p>
                      <div style={{ overflowX: 'auto', marginBottom: 8 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <thead>
                            <tr>
                              <th style={thS}>Rule</th>
                              <th style={thS}>Multiple</th>
                              <th style={thS}>Formula</th>
                              <th style={thS}>At 12% Return</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr><td style={tdR}>Rule of 72</td><td style={tdL}>2x (double)</td><td style={tdL}>72 ÷ rate</td><td style={tdL}>72 ÷ 12 = 6.0 years</td></tr>
                            <tr><td style={tdR}>Rule of 114</td><td style={tdL}>3x (triple)</td><td style={tdL}>114 ÷ rate</td><td style={tdL}>114 ÷ 12 = 9.5 years</td></tr>
                            <tr><td style={tdR}>Rule of 144</td><td style={tdL}>4x (quadruple)</td><td style={tdL}>144 ÷ rate</td><td style={tdL}>144 ÷ 12 = 12.0 years</td></tr>
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>
                        These shortcuts let you map out financial timelines without spreadsheets.
                      </p>
                      <p style={p}>
                        Try the Multiple toggle above to compare your own doubling, tripling, and quadrupling timelines.
                      </p>
                    </div>

                    <div style={sec} id="accuracy">
                      <h2 style={h2}>How Accurate Is the Rule of 72?</h2>
                      <p style={p}>
                        The Rule of 72 is most accurate between roughly 6% and 10%, matching the exact calculation within weeks.
                      </p>
                      <p style={p}>
                        Outside that band it drifts, since 72 approximates 100 x ln(2), which is actually 69.3.
                      </p>
                      <div style={{ overflowX: 'auto', marginBottom: 8 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <thead>
                            <tr>
                              <th style={thS}>Rate</th>
                              <th style={thS}>Rule of 72 Estimate</th>
                              <th style={thS}>Exact Years</th>
                              <th style={thS}>Difference</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[2, 4, 6, 8, 10, 15, 20, 25].map((r, i) => {
                              const est = 72 / r;
                              const exact = Math.log(2) / Math.log(1 + r / 100);
                              return (
                                <tr key={r}>
                                  <td style={tdR}>{r}%</td>
                                  <td style={tdL}>{est.toFixed(2)} yrs</td>
                                  <td style={tdL}>{exact.toFixed(2)} yrs</td>
                                  <td style={tdL}>{(est - exact >= 0 ? '+' : '')}{(est - exact).toFixed(2)} yrs</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>
                        At very low rates (2-4%) it overestimates the doubling time by several months. At very high rates (20%+) it starts to underestimate slightly.
                      </p>
                      <p style={p}>
                        For typical Indian investment return rates, the gap is small enough to ignore.
                      </p>
                    </div>

                    <div style={sec} id="indian-investments">
                      <h2 style={h2}>Doubling Time for Common Indian Investments</h2>
                      <p style={p}>
                        Applying the Rule of 72 to typical rates for major Indian instruments shows how each compares on doubling speed.
                      </p>
                      <p style={p}>
                        These are indicative long-term averages, not guaranteed returns, and market-linked products can underperform them.
                      </p>
                      <div style={{ overflowX: 'auto', marginBottom: 8 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <thead>
                            <tr>
                              <th style={thS}>Instrument</th>
                              <th style={thS}>Typical Rate</th>
                              <th style={thS}>Doubling Time (Rule of 72)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr><td style={tdR}>Public Provident Fund (PPF)</td><td style={tdL}>7.1% (govt notified, Jul-Sep 2026)</td><td style={tdL}>{(72 / 7.1).toFixed(1)} years</td></tr>
                            <tr><td style={tdR}>Bank Fixed Deposit</td><td style={tdL}>6.0-7.5% (general public)</td><td style={tdL}>{(72 / 6.75).toFixed(1)} years (at 6.75% midpoint)</td></tr>
                            <tr><td style={tdR}>EPF</td><td style={tdL}>8.25% (EPFO notified)</td><td style={tdL}>{(72 / 8.25).toFixed(1)} years</td></tr>
                            <tr><td style={tdR}>NPS Tier I (historical)</td><td style={tdL}>8-10% CAGR</td><td style={tdL}>{(72 / 9).toFixed(1)} years (at 9% midpoint)</td></tr>
                            <tr><td style={tdR}>Equity Mutual Funds (historical)</td><td style={tdL}>10-12% CAGR</td><td style={tdL}>{(72 / 11).toFixed(1)} years (at 11% midpoint)</td></tr>
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>
                        PPF and EPF rates are set by the government and revised periodically.
                      </p>
                      <p style={p}>
                        Equity and NPS figures are historical averages, not assured. Use Rate Needed mode above with your own target years instead.
                      </p>
                    </div>

                    <div style={sec} id="sip-vs-lumpsum">
                      <h2 style={h2}>Does the Rule of 72 Work for SIPs?</h2>
                      <p style={p}>
                        No, not directly. The Rule of 72 assumes a single lump sum invested once and left to compound.
                      </p>
                      <p style={p}>
                        A SIP spreads contributions across the period, so most rupees are invested later with far less time to grow.
                      </p>
                      <p style={p}>
                        At 12% return, a lump sum doubles in 6 years (72 / 12).
                      </p>
                      <p style={p}>
                        A SIP of the same amount over those 6 years grows to only about 1.47x the total contributed, not 2x, since later contributions barely compound.
                      </p>
                      <p style={p}>
                        Use the <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SIP Calculator</Link> for an exact monthly-contribution projection instead.
                      </p>
                    </div>

                    {promoBar('/calculators/sip-calculator', 'SIP Calculator', 'The Rule of 72 assumes a lump sum. For regular monthly investments, project your SIP corpus here.')}

                    <div style={sec} id="taxation">
                      <h2 style={h2}>Pre-Tax vs Post-Tax Doubling Time</h2>
                      <p style={p}>
                        Your post-tax doubling time can be meaningfully longer than the pre-tax figure, depending on the instrument.
                      </p>
                      <p style={p}>
                        Bank FD interest is fully taxable at your slab rate every year.
                      </p>
                      <p style={p}>
                        At a 7% FD rate and 30% tax slab, post-tax return drops to about 4.9%, stretching doubling time from 10.3 to roughly 14.7 years.
                      </p>
                      <p style={p}>
                        Equity mutual fund gains are taxed only on sale, at 12.5% above Rs 1.25 lakh per year under the Finance (No. 2) Act, 2024, a much smaller drag.
                      </p>
                      <p style={p}>
                        PPF and EPF are Exempt-Exempt-Exempt (EEE): contributions, interest, and maturity are all tax-free, so their quoted rate is already the real doubling rate.
                      </p>
                    </div>

                    <div style={sec} id="limitations">
                      <h2 style={h2}>Limitations of the Rule of 72</h2>
                      <p style={p}>
                        The Rule of 72 assumes a single fixed return every year, which almost no real investment delivers.
                      </p>
                      <p style={p}>
                        Equity and NPS returns vary yearly, and poor early years change the real doubling time even if the long-run average matches your input.
                      </p>
                      <p style={p}>
                        It also ignores taxes, expense ratios, exit loads, and inflation entirely.
                      </p>
                      <p style={p}>
                        Treat it as a planning heuristic, not a guarantee, and cross-check important goals with a full projection tool or a SEBI-registered adviser.
                      </p>
                    </div>

                    <div style={sec} id="history">
                      <h2 style={h2}>The History of the Rule of 72</h2>
                      <p style={p}>
                        The earliest known reference to the Rule of 72 appears in Luca Pacioli&apos;s 1494 book Summa de Arithmetica.
                      </p>
                      <p style={p}>
                        Pacioli stated the rule without deriving it, suggesting it was already known informally before he wrote it down.
                      </p>
                      <p style={p}>
                        Pacioli, regarded as the father of modern accounting, favored 72 over the exact 69.3 because it divides evenly by 1, 2, 3, 4, 6, 8, 9, and 12.
                      </p>
                      <p style={p}>
                        Five centuries later, that same convenience is why the Rule of 72 remains the standard shortcut today.
                      </p>
                    </div>

                    <div style={sec} id="investing-lifetime">
                      <h2 style={h2}>How Many Times Will Your Money Double in Your Lifetime?</h2>
                      <p style={p}>
                        The Rule of 72 also shows how many separate doublings your money can go through over a full investing career.
                      </p>
                      <p style={p}>
                        At 12% return, money doubles roughly every 6 years (72 ÷ 12). Investing from age 25 to 60 gives you 35 years, or about 5.8 doublings.
                      </p>
                      <p style={p}>
                        Each doubling compounds on the last, so 5.8 doublings is not 5.8x growth, it is roughly 57x growth (2 raised to the power 5.8).
                      </p>
                      <p style={p}>
                        This is why starting even 6 years earlier, one full doubling cycle, can matter more than almost any other decision in long-term investing.
                      </p>
                    </div>

                    <div style={sec} id="vs-cagr">
                      <h2 style={h2}>Rule of 72 vs CAGR: Which Should You Use?</h2>
                      <p style={p}>
                        CAGR (Compound Annual Growth Rate) is the actual, exact annual return realized between a start and end value. The Rule of 72 is a forward-looking estimate assuming a constant rate.
                      </p>
                      <p style={p}>
                        Use CAGR to measure how an investment actually performed. Use the Rule of 72 to plan forward from an assumed future rate, such as a long-run equity average.
                      </p>
                      <p style={p}>
                        If you already know your investment&apos;s CAGR, the <Link href="/calculators/cagr-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>CAGR Calculator</Link> can compute it precisely, and you can feed that rate into the Rule of 72 above to estimate future doubling time.
                      </p>
                    </div>

                    <div style={sec} id="how-to-use">
                      <h2 style={h2}>How to Use This Calculator</h2>
                      <p style={p}>
                        Choose Time Needed to enter a return rate and see your doubling, tripling, or quadrupling time.
                      </p>
                      <p style={p}>
                        Choose Rate Needed to enter a time horizon instead and see the return rate required.
                      </p>
                      <p style={p}>
                        Switch the Multiple toggle and optionally enter an amount to see the growth chart and exact rupee figures.
                      </p>
                    </div>


                    <div style={sec} id="faq">
                      <h2 style={h2}>Frequently Asked Questions</h2>
                      <FAQ faqs={faqs} />
                    </div>
                  </>
                );
              })()}
            </article>
          </div>

          {/* SIDEBAR */}
          <>
            <style>{`.r72-sidebar::-webkit-scrollbar{width:5px}.r72-sidebar::-webkit-scrollbar-track{background:transparent}.r72-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.r72-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
            <aside
              className="r72-sidebar"
              style={{
                display: 'flex', flexDirection: 'column', gap: 14,
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
              <div style={{ flexShrink: 0 }}><SidebarList title="Popular Calculators" items={POPULAR} /></div>
              <div style={{ flexShrink: 0 }}><SidebarList title="More Calculators" items={MORE} /></div>
            </aside>
          </>

        </div>
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}


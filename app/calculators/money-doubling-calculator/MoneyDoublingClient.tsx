'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useEffect, useLayoutEffect, useMemo } from 'react';
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
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.paleLime, border: `1.5px solid ${C.lime2}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 100, outline: 'none', color: C.dark, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            style={{ fontSize: compact ? 13 : 14, fontWeight: 700, color: C.dark, background: C.paleLime, border: `1.5px solid ${C.lime2}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 16px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 80 : 90, textAlign: 'center' }}>
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

function GrowthChart({ data, mobile, fmtIN }: { data: {year: number, value: number}[], mobile: boolean, fmtIN: (v: number) => string }) {
  const w = mobile ? 300 : 600;
  const h = 240;
  const pad = { t: 30, r: 20, b: 30, l: mobile ? 60 : 80 };
  
  const minX = 0;
  const maxX = Math.max(...data.map(d => d.year), 1);
  const maxY = Math.max(...data.map(d => d.value), 1) * 1.1;
  const yTicks = 4;
  
  const pts = data.map(d => `${(pad.l + (d.year/maxX)*(w-pad.l-pad.r)).toFixed(1)},${(h - pad.b - (d.value/maxY)*(h-pad.t-pad.b)).toFixed(1)}`).join(' ');
  
  return (
    <div style={{ width: '100%', overflowX: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 24 }}>
      <svg suppressHydrationWarning width="100%" height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible', fontFamily: INTER }}>
        {/* Y-axis */}
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
        
        <path suppressHydrationWarning d={`M ${pad.l},${(h-pad.b).toFixed(1)} L ${pts} L ${(pad.l + w - pad.l - pad.r).toFixed(1)},${(h-pad.b).toFixed(1)} Z`} fill={C.paleLime} opacity="0.6" />
        <polyline suppressHydrationWarning points={pts} fill="none" stroke={C.dark} strokeWidth="4" />
        
        {/* X-axis */}
        {data.filter((_, i) => i % (maxX > 15 ? 5 : maxX > 8 ? 2 : 1) === 0).map(d => {
          const x = pad.l + (d.year/maxX)*(w-pad.l-pad.r);
          return (
            <text suppressHydrationWarning key={`x-${d.year}`} x={x.toFixed(1)} y={h - 5} fontSize="10" fill={C.ink3} textAnchor="middle">{d.year.toFixed(1)} Yr</text>
          );
        })}
      </svg>
    </div>
  );
}

export default function MoneyDoublingClient({ faqs, referenceTable }: { faqs: { q: string; a: string }[], referenceTable: { rate: string; years: string }[] }) {
  const defaultSettings = { amount: 100000, rate: 12, freq: 1, targetMultiple: 2, inflationRate: 0, taxRate: 0, realReturnToggle: false };
  const { settings, updateSettings } = useCalculatorSettings('money-doubling-calculator', defaultSettings);
  const { amount, rate, freq, targetMultiple, inflationRate, taxRate, realReturnToggle } = settings;
  const setAmount = (v: any) => updateSettings({ amount: typeof v === 'function' ? v(settings.amount) : v });
  const setRate = (v: any) => updateSettings({ rate: typeof v === 'function' ? v(settings.rate) : v });
  const setFreq = (v: any) => updateSettings({ freq: typeof v === 'function' ? v(settings.freq) : v });
  const setTargetMultiple = (v: any) => updateSettings({ targetMultiple: typeof v === 'function' ? v(settings.targetMultiple) : v });
  const setInflationRate = (v: any) => updateSettings({ inflationRate: typeof v === 'function' ? v(settings.inflationRate) : v });
  const setTaxRate = (v: any) => updateSettings({ taxRate: typeof v === 'function' ? v(settings.taxRate) : v });
  const setRealReturnToggle = (v: any) => updateSettings({ realReturnToggle: typeof v === 'function' ? v(settings.realReturnToggle) : v });
     // 1=Annual, 2=Semi, 4=Quarterly, 12=Monthly
   // 2x default

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showChart, setShowChart] = useState(true);
  const [showMilestones, setShowMilestones] = useState(true);
  const [showReference, setShowReference] = useState(true);

  const [mobile, setMobile] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  // Calculations
  const calc = useMemo(() => {
    let effectiveRate = rate * (1 - taxRate / 100);
    if (realReturnToggle) {
      // Fisher equation
      effectiveRate = ((1 + effectiveRate / 100) / (1 + inflationRate / 100) - 1) * 100;
    }

    const n = freq; // Compounding periods per year
    const rDec = effectiveRate / 100;
    
    // exact math
    let exactYears = 0;
    if (rDec > 0) {
      exactYears = Math.log(targetMultiple) / (n * Math.log(1 + rDec / n));
    } else {
      exactYears = Infinity;
    }

    // Rule of 72 / 114 / 144
    // 2x -> 72, 3x -> 114, 4x -> 144
    let ruleEstimate = 0;
    if (rDec > 0) {
      const ruleNum = targetMultiple === 2 ? 72 : targetMultiple === 3 ? 114 : targetMultiple === 4 ? 144 : (72 * Math.log(targetMultiple)/Math.log(2));
      ruleEstimate = ruleNum / (effectiveRate || 0.0001); // Use effective nominal/real rate, typical approximation
    }

    // Generate timeline data
    const data = [];
    if (isFinite(exactYears) && exactYears > 0) {
      for (let i = 0; i <= Math.ceil(exactYears); i++) {
        const val = amount * Math.pow(1 + rDec / n, n * i);
        data.push({ year: i, value: val });
      }
      // Add exact point
      if (data[data.length-1].year !== exactYears) {
        data.push({ year: exactYears, value: amount * targetMultiple });
        data.sort((a,b) => a.year - b.year);
      }
    }

    // Milestones (25%, 50%, 75%, 100%) of the growth from amount to target
    const milestones = [
      { pct: 25, val: amount + (amount * targetMultiple - amount) * 0.25 },
      { pct: 50, val: amount + (amount * targetMultiple - amount) * 0.50 },
      { pct: 75, val: amount + (amount * targetMultiple - amount) * 0.75 },
      { pct: 100, val: amount * targetMultiple },
    ].map(m => {
      const yr = rDec > 0 ? Math.log(m.val / amount) / (n * Math.log(1 + rDec / n)) : Infinity;
      return { ...m, years: yr };
    });

    return {
      exactYears, ruleEstimate, data, milestones, targetValue: amount * targetMultiple, effectiveRate
    };
  }, [amount, rate, freq, targetMultiple, inflationRate, taxRate, realReturnToggle]);

  const POPULAR = [
    { href: '/calculators/rule-of-72-calculator',     label: 'Rule of 72 Calculator' },
    { href: '/calculators/rule-of-114-calculator',    label: 'Rule of 114 Calculator' },
    { href: '/calculators/monthly-investment-calculator', label: 'Monthly Investment Calculator' },
    { href: '/calculators/sip-calculator',            label: 'SIP Calculator' },
    { href: '/calculators/compound-interest-calculator', label: 'Compound Interest Calculator' },
    { href: '/calculators/lumpsum-calculator',        label: 'Lumpsum Calculator' },
    { href: '/calculators/step-up-sip-calculator',    label: 'Step-Up SIP Calculator' },
  ];
  const MORE = [
    { href: '/calculators/cagr-calculator',                label: 'CAGR Calculator' },
    { href: '/calculators/investment-comparison-calculator',label: 'Investment Comparison' },
    { href: '/calculators/inflation-calculator',           label: 'Inflation Calculator' },
    { href: '/calculators/fd-calculator',                  label: 'FD Calculator' },
    { href: '/calculators/real-return-calculator',         label: 'Real Return Calculator' },
    { href: '/calculators/ppf-calculator',                 label: 'PPF Calculator' },
    { href: '/calculators/wealth-growth-calculator',       label: 'Wealth Growth Calculator' },
  ];

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 28px', letterSpacing: '-0.025em' }}>Money Doubling Calculator</h1>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          <div style={{ minWidth: 0 }}>
            {/* CALCULATOR CARD */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 40 }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                {/* Input panel */}
                <div style={{ padding: mobile ? '20px' : '36px 48px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: C.ink }}>Inputs</h2>
                    <CurrencySelector theme="light" />
                  </div>
                  
                  <Slider label="Initial Investment" value={amount} min={1000} max={10000000} step={1000} fmt={fmtC} onChange={setAmount} compact={mobile} />
                  <Slider label="Expected Annual Return" value={rate} min={1} max={30} step={0.5} fmt={v => `${v}%`} onChange={setRate} compact={mobile} />
                  
                  <div style={{ marginTop: 24 }}>
                    <label style={{ fontSize: 14, color: C.ink2, fontWeight: 600, display: 'block', marginBottom: 12 }}>Target Multiple</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                      {[2, 3, 4, 10].map(m => (
                        <button key={m} onClick={() => setTargetMultiple(m)}
                          style={{ padding: '10px 0', borderRadius: 8, border: `1.5px solid ${targetMultiple === m ? C.lime2 : C.border}`, background: targetMultiple === m ? C.paleLime : C.white, color: targetMultiple === m ? C.dark : C.ink3, fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s' }}>
                          {m}x
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: 24 }}>
                    <label style={{ fontSize: 14, color: C.ink2, fontWeight: 600, display: 'block', marginBottom: 12 }}>Compounding Frequency</label>
                    <select value={freq} onChange={e => setFreq(Number(e.target.value) as any)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: `1.5px solid ${C.border}`, fontSize: 14, fontFamily: INTER, color: C.dark, fontWeight: 600, background: '#fff', outline: 'none' }}>
                      <option value={1}>Annually</option>
                      <option value={2}>Semi-Annually</option>
                      <option value={4}>Quarterly</option>
                      <option value={12}>Monthly</option>
                    </select>
                  </div>
                  
                  {/* ADVANCED SETTINGS */}
                  <div style={{ marginTop: 24, borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
                    <button 
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: INTER, color: C.ink2, fontWeight: 600, fontSize: 14 }}
                    >
                      <span>Advanced Settings</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: showAdvanced ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    
                    {showAdvanced && (
                      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16, animation: 'fadeIn 0.2s ease-in-out' }}>
                        <Slider label="Tax Rate on Gains" value={taxRate} min={0} max={30} step={1} fmt={v => `${v}%`} onChange={setTaxRate} compact={mobile} />
                        
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: realReturnToggle ? C.paleLime : '#F8FAFB', border: `1px solid ${realReturnToggle ? C.lime2 : C.border}`, padding: '12px 16px', borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => setRealReturnToggle(!realReturnToggle)}>
                          <div>
                            <span style={{ fontSize: 13, fontWeight: 600, color: C.ink, display: 'block' }}>Real Return Analysis</span>
                            <span style={{ fontSize: 11, color: C.ink3 }}>Adjust for inflation</span>
                          </div>
                          <div style={{ width: 44, height: 24, borderRadius: 12, background: realReturnToggle ? C.lime2 : '#d3d7da', position: 'relative', transition: 'background 0.2s' }}>
                            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: realReturnToggle ? 22 : 2, transition: 'left 0.2s' }} />
                          </div>
                        </div>

                        {realReturnToggle && (
                          <div style={{ marginTop: 8 }}>
                            <Slider label="Expected Inflation Rate" value={inflationRate} min={0} max={12} step={0.5} fmt={v => `${v}%`} onChange={setInflationRate} compact={mobile} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Results panel */}
                <div style={{ padding: mobile ? '20px' : '36px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Time to reach {targetMultiple}x</span>
                    <span aria-live="polite" aria-label={`Time to reach ${targetMultiple}x: ${isFinite(calc.exactYears) ? calc.exactYears.toFixed(2) + ' years' : 'never'}`}
                      style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {isFinite(calc.exactYears) ? `${calc.exactYears.toFixed(2)} Years` : 'Never'}
                    </span>
                  </div>

                  <div style={{ marginTop: 16, background: '#F8FAFB', border: `1px solid ${C.border}`, borderRadius: 12, padding: '16px 20px', textAlign: 'center' }}>
                    <div style={{ fontSize: 13, color: C.ink2, fontWeight: 600 }}>Target Future Value</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: C.dark, marginTop: 4 }}>{fmtIN(calc.targetValue)}</div>
                  </div>

                  {/* Summary Cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
                    <div style={{ background: C.white, borderRadius: 12, padding: 16, border: `1px solid ${C.border}` }}>
                      <span style={{ fontSize: 12, color: C.ink2, fontWeight: 700, display: 'block', marginBottom: 4 }}>Nominal Return</span>
                      <span style={{ fontSize: 18, color: C.ink, fontWeight: 800 }}>{rate}%</span>
                    </div>
                    <div style={{ background: C.white, borderRadius: 12, padding: 16, border: `1px solid ${C.border}` }}>
                      <span style={{ fontSize: 12, color: C.ink2, fontWeight: 700, display: 'block', marginBottom: 4 }}>Effective Return</span>
                      <span style={{ fontSize: 18, color: '#2d9970', fontWeight: 800 }}>{calc.effectiveRate.toFixed(2)}%</span>
                    </div>
                  </div>

                  {/* Comparison Card */}
                  <div style={{ marginTop: 16, background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: '16px 20px' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 12 }}>Method Comparison</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 13, color: C.ink2 }}>Exact Compound Math:</span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>{isFinite(calc.exactYears) ? calc.exactYears.toFixed(2) : '---'} yrs</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 13, color: C.ink2 }}>Rule of {targetMultiple === 2 ? 72 : targetMultiple === 3 ? 114 : targetMultiple === 4 ? 144 : 'Estimate'}:</span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{isFinite(calc.ruleEstimate) ? calc.ruleEstimate.toFixed(2) : '---'} yrs</span>
                      </div>
                    </div>
                  </div>

                  {/* Donut Chart */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 20 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 6 : -1 }}>
                    {(() => {
                      const principal = amount;
                      const returns = calc.targetValue - amount;
                      const total = principal + returns;
                      if (total === 0) return null;
                      const R = 80, sw = 20, cx = 106, cy = 106;
                      const circ = 2 * Math.PI * R;
                      const pArc = (principal / total) * circ;
                      const pPct = Math.round((principal / total) * 100);
                      return (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                          <svg width="212" height="212" viewBox="0 0 212 212" role="img" aria-label="Principal vs Returns donut chart" style={{ display: 'block' }}>
                            <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
                            <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
                              strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
                              style={{ transition: 'stroke-dasharray 0.4s ease' }} />
                            <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Principal</text>
                            <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
                          </svg>
                          <div style={{ display: 'flex', gap: 20, fontSize: 12, color: C.ink2 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} />
                              <span>Principal ({fmtC(principal)})</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} />
                              <span>Returns ({fmtC(returns)})</span>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  <p style={{ fontSize: 13, color: C.ink2, lineHeight: 1.5, marginTop: 16, padding: '0 4px', textAlign: 'center' }}>
                    At an effective return of <strong>{calc.effectiveRate.toFixed(2)}%</strong> compounding {freq === 1 ? 'annually' : freq === 2 ? 'semi-annually' : freq === 4 ? 'quarterly' : 'monthly'}, your {fmtC(amount)} could potentially grow to {fmtC(calc.targetValue)} in approximately <strong>{isFinite(calc.exactYears) ? calc.exactYears.toFixed(1) : '---'} years</strong>.
                  </p>
                </div>
              </div>

              {/* Chart Section */}
              {isFinite(calc.exactYears) && (
                <div style={{ padding: mobile ? '14px 20px' : '16px 28px', borderTop: `1px solid ${C.border}`, background: '#fafafa' }}>
                  <button
                    onClick={() => setShowChart(!showChart)}
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: INTER, color: C.ink, fontWeight: 800, fontSize: 18 }}
                  >
                    <span>Growth Trajectory</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: showChart ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {showChart && (
                    <div style={{ marginTop: 16 }}>
                      <GrowthChart data={calc.data} mobile={mobile} fmtIN={fmtC} />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* MILESTONE TABLE */}
            {isFinite(calc.exactYears) && (
              <div style={{ marginBottom: 16, background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: mobile ? '14px 20px' : '16px 28px' }}>
                <button
                  onClick={() => setShowMilestones(!showMilestones)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: INTER, color: C.ink, fontWeight: 800, fontSize: 18 }}
                >
                  <span>Growth Milestones</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: showMilestones ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {showMilestones && (
                  <>
                    <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.6, margin: '16px 0 24px' }}>
                      Track your journey towards the {targetMultiple}x multiple. The power of compounding means the later milestones are achieved significantly faster than the earlier ones.
                    </p>

                    <div style={{ overflowX: 'auto', border: `1px solid ${C.border}`, borderRadius: 12 }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 400, fontSize: 13 }}>
                        <thead style={{ background: '#f4f5f6', borderBottom: `1px solid ${C.border}` }}>
                          <tr>
                            <th style={{ padding: '16px', fontSize: 13, fontWeight: 700, color: C.ink }}>Milestone</th>
                            <th style={{ padding: '16px', fontSize: 13, fontWeight: 700, color: C.ink }}>Value</th>
                            <th style={{ padding: '16px', fontSize: 13, fontWeight: 700, color: C.ink }}>Time Required</th>
                          </tr>
                        </thead>
                        <tbody>
                          {calc.milestones.map((m, i) => (
                            <tr key={i} style={{ borderBottom: i === calc.milestones.length - 1 ? 'none' : `1px solid ${C.border}` }}>
                              <td style={{ padding: '16px', fontSize: 14, fontWeight: 600, color: C.ink }}>{m.pct}% to Target</td>
                              <td style={{ padding: '16px', fontSize: 14, fontWeight: 700, color: C.lime2 }}>{fmtC(m.val)}</td>
                              <td style={{ padding: '16px', fontSize: 14, color: C.ink2 }}>{m.years.toFixed(2)} Years</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* REFERENCE TABLE */}
            <div style={{ marginBottom: 24, background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: mobile ? '14px 20px' : '16px 28px' }}>
              <button
                onClick={() => setShowReference(!showReference)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: INTER, color: C.ink, fontWeight: 800, fontSize: 18 }}
              >
                <span>Money Doubling Reference Table</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: showReference ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {showReference && (
                <>
                  <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.6, margin: '16px 0 24px' }}>
                    Quick reference guide showing how long it takes to double your money across various standard return rates (assuming annual compounding).
                  </p>

                  <div style={{ overflowX: 'auto', border: `1px solid ${C.border}`, borderRadius: 12 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 400, fontSize: 13 }}>
                      <thead style={{ background: '#f4f5f6', borderBottom: `1px solid ${C.border}` }}>
                        <tr>
                          <th style={{ padding: '16px', fontSize: 13, fontWeight: 700, color: C.ink }}>Return Rate</th>
                          <th style={{ padding: '16px', fontSize: 13, fontWeight: 700, color: C.ink }}>Years to Double</th>
                        </tr>
                      </thead>
                      <tbody>
                        {referenceTable.map((r, i) => (
                          <tr key={i} style={{ borderBottom: i === referenceTable.length - 1 ? 'none' : `1px solid ${C.border}` }}>
                            <td style={{ padding: '16px', fontSize: 14, fontWeight: 600, color: C.ink }}>{r.rate}</td>
                            <td style={{ padding: '16px', fontSize: 14, fontWeight: 700, color: C.ink2 }}>{r.years}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>

            {/* ARTICLE & FAQ */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>


            <article style={{ fontFamily: INTER }}>
              {(() => {
                const h2 = { fontSize: mobile ? 18 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
                const p  = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
                const sec = { margin: '0 0 40px' } as React.CSSProperties;
                const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const };
                const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' as const };
                const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top' as const, textAlign: 'right' as const };
                return (
                  <>
                    <div style={sec} id="what-is-money-doubling-calculator">
                      <h2 style={h2}>What Is a Money Doubling Calculator?</h2>
                      <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                        <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                          A money doubling calculator works out exactly how long an investment takes to reach 2x, 3x, 4x, or any target multiple, using the exact compound growth formula rather than a mental-math shortcut.
                        </p>
                      </div>
                      <p style={p}>
                        Shortcuts like the Rule of 72 are useful for a quick estimate in your head, but they are an approximation. This calculator solves the exact logarithmic equation for whatever compounding frequency, return rate, and target multiple you enter, giving a precise answer in years rather than a rounded rule of thumb.
                      </p>
                    </div>

                    <div style={sec} id="doubling-time-formula">
                      <h2 style={h2}>Doubling Time Formula: How It Is Calculated</h2>
                      <p style={p}>
                        The exact time to reach any target multiple follows directly from the compound interest formula, solved for the number of years using logarithms.
                      </p>
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 20px', margin: '0 0 16px', fontFamily: 'monospace', fontSize: 15, color: C.dark, fontWeight: 700, overflowX: 'auto' }}>
                        Years = ln(Target Multiple) / [n × ln(1 + r/n)]
                      </div>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Doubling time formula variables</caption>
                          <thead><tr><th scope="col" style={thS}>Variable</th><th scope="col" style={thS}>Meaning</th></tr></thead>
                          <tbody>
                            <tr><td style={tdL}>Target Multiple</td><td style={tdL}>2 for doubling, 3 for tripling, and so on</td></tr>
                            <tr><td style={tdL}>r</td><td style={tdL}>Effective annual return, as a decimal</td></tr>
                            <tr><td style={tdL}>n</td><td style={tdL}>Compounding periods per year (1 annual, 12 monthly, and so on)</td></tr>
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>
                        Worked example: at a 12% annual return compounding annually, doubling your money takes ln(2) / ln(1.12) = approximately 6.12 years, not the 6.00 years the Rule of 72 shortcut estimates.
                      </p>
                    </div>

                    <div style={sec} id="rule-of-72-vs-exact">
                      <h2 style={h2}>Rule of 72 vs Exact Calculation</h2>
                      <p style={p}>
                        The Rule of 72 divides 72 by the annual interest rate to estimate doubling time. It is a genuinely useful shortcut, accurate to within a few weeks around an 8% return, since 72 is chosen as a round number close to the true constant at that rate. Away from 8%, the gap between the estimate and the exact answer widens in both directions.
                      </p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Rule of 72 estimate vs exact doubling time, annual compounding</caption>
                          <thead><tr><th scope="col" style={thS}>Annual Rate</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>Rule of 72 Estimate</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>Exact Years</th></tr></thead>
                          <tbody>
                            <tr><td style={tdL}>4%</td><td style={tdR}>18.00 yrs</td><td style={tdR}>17.67 yrs</td></tr>
                            <tr><td style={tdL}>6%</td><td style={tdR}>12.00 yrs</td><td style={tdR}>11.90 yrs</td></tr>
                            <tr><td style={tdL}>8%</td><td style={tdR}>9.00 yrs</td><td style={tdR}>9.01 yrs</td></tr>
                            <tr><td style={tdL}>10%</td><td style={tdR}>7.20 yrs</td><td style={tdR}>7.27 yrs</td></tr>
                            <tr><td style={tdL}>12%</td><td style={tdR}>6.00 yrs</td><td style={tdR}>6.12 yrs</td></tr>
                            <tr><td style={tdL}>15%</td><td style={tdR}>4.80 yrs</td><td style={tdR}>4.96 yrs</td></tr>
                            <tr><td style={tdL}>20%</td><td style={tdR}>3.60 yrs</td><td style={tdR}>3.80 yrs</td></tr>
                          </tbody>
                        </table>
                      </div>
                      <p style={{ fontSize: 12.5, color: C.ink3, margin: 0 }}>
                        The <Link href="/calculators/rule-of-72-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Rule of 72 Calculator</Link> and{' '}
                        <Link href="/calculators/rule-of-114-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Rule of 114 Calculator</Link> cover the mental-math shortcut versions of this same question for doubling and tripling specifically.
                      </p>
                    </div>

                    <div style={sec} id="compounding-frequency-impact">
                      <h2 style={h2}>Impact of Compounding Frequency</h2>
                      <p style={p}>
                        The frequency at which interest is calculated and added back to the principal changes doubling time even at an identical stated annual rate. An investment compounding monthly, common in SIPs and some savings products, reaches its target multiple slightly faster than one compounding annually, because interest starts earning its own interest sooner.
                      </p>
                      <p style={p}>
                        At a 10% annual rate, money doubles in about 7.27 years compounding annually, versus about 6.96 years compounding monthly, a difference of roughly 4 months purely from how often the interest is credited.
                      </p>
                    </div>

                    <div style={sec} id="inflation-and-real-returns">
                      <h2 style={h2}>Inflation and Real Returns</h2>
                      <p style={p}>
                        Doubling your money in nominal terms is not the same as doubling your purchasing power. Turning on Real Return Analysis in the advanced settings converts the nominal return to a real return using the Fisher equation, then calculates doubling time against that inflation-adjusted rate instead. At a 10% nominal return and 6% inflation, the real return works out to about 3.77%, and real doubling time stretches to around 18.7 years rather than the 7.3 years the nominal figure alone would suggest.
                      </p>
                    </div>

                    <div style={sec} id="doubling-time-by-investment-type">
                      <h2 style={h2}>How Long It Takes to Double Money in Popular Indian Investments</h2>
                      <p style={p}>
                        Doubling time varies sharply by asset class because the underlying return varies. Guaranteed, government-backed instruments take longer but carry no market risk, while equity gets there faster on average with year-to-year volatility along the way.
                      </p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Doubling time by Indian investment type</caption>
                          <thead><tr><th scope="col" style={thS}>Investment</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>Typical Rate</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>Time to Double</th></tr></thead>
                          <tbody>
                            <tr><td style={tdL}>PPF</td><td style={tdR}>7.1% (Q2 FY27, govt-set)</td><td style={tdR}>~10.1 years</td></tr>
                            <tr><td style={tdL}>Bank FD (general public)</td><td style={tdR}>~6.5%</td><td style={tdR}>~11.0 years</td></tr>
                            <tr><td style={tdL}>Debt mutual funds</td><td style={tdR}>~7-8% (approx)</td><td style={tdR}>~9.5 years</td></tr>
                            <tr><td style={tdL}>Gold</td><td style={tdR}>~9% (long-term historical avg)</td><td style={tdR}>~8.0 years</td></tr>
                            <tr><td style={tdL}>Equity mutual funds</td><td style={tdR}>~12% (long-term historical avg)</td><td style={tdR}>~6.1 years</td></tr>
                          </tbody>
                        </table>
                      </div>
                      <p style={{ fontSize: 12.5, color: C.ink3, margin: 0 }}>
                        The PPF rate is fixed quarterly by the Ministry of Finance and was held at 7.1% for the July-September 2026 quarter, per <a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>RBI</a>-aligned small savings scheme announcements. Bank FD and debt mutual fund figures are indicative ranges, not guarantees. Equity and gold figures are long-term historical averages, not assured returns, and neither is bank-guaranteed the way PPF and FDs are.
                      </p>
                    </div>

                    <div style={sec} id="tripling-quadrupling-money">
                      <h2 style={h2}>Time to Triple or Quadruple Your Money</h2>
                      <p style={p}>
                        Doubling is just one target multiple. The same logarithmic formula extends directly to tripling (3x) or quadrupling (4x) money, using mental-math shortcuts of their own: divide 114 by the rate to estimate tripling time, and divide 144 by the rate to estimate quadrupling time.
                      </p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Time to double, triple, and quadruple at common return rates</caption>
                          <thead><tr><th scope="col" style={thS}>Rate</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>2x (Double)</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>3x (Triple)</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>4x (Quadruple)</th></tr></thead>
                          <tbody>
                            <tr><td style={tdL}>8%</td><td style={tdR}>9.01 yrs</td><td style={tdR}>14.27 yrs</td><td style={tdR}>18.01 yrs</td></tr>
                            <tr><td style={tdL}>10%</td><td style={tdR}>7.27 yrs</td><td style={tdR}>11.53 yrs</td><td style={tdR}>14.55 yrs</td></tr>
                            <tr><td style={tdL}>12%</td><td style={tdR}>6.12 yrs</td><td style={tdR}>9.69 yrs</td><td style={tdR}>12.23 yrs</td></tr>
                            <tr><td style={tdL}>15%</td><td style={tdR}>4.96 yrs</td><td style={tdR}>7.86 yrs</td><td style={tdR}>9.92 yrs</td></tr>
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>
                        Notice that quadrupling does not take twice as long as doubling. At 12%, doubling takes 6.12 years, but quadrupling, which is really just doubling twice in a row, takes 12.23 years, almost exactly 2x the doubling time, since compound growth doubles from the already-doubled base.
                      </p>
                    </div>

                    <div style={sec} id="capital-gains-tax-effect">
                      <h2 style={h2}>How Capital Gains Tax Changes Your Doubling Time</h2>
                      <p style={p}>
                        Tax is charged on the gain, not the doubling target itself, but it still slows down how fast you get there because it reduces the return that gets reinvested and compounded each year.
                      </p>
                      <p style={p}>
                        For equity and equity mutual funds, long-term capital gains (holding period over one year) above Rs 1.25 lakh in a financial year are taxed at 12.5% without indexation, while short-term gains (under one year) are taxed at 20%. Debt mutual funds bought after April 2023 lose LTCG indexation entirely: gains are added to income and taxed at the investor&apos;s slab rate regardless of how long the fund is held.
                      </p>
                      <p style={p}>
                        Worked example: a 12% pre-tax return taxed at a flat 12.5% (the Advanced Settings tax slider models this as a uniform haircut) works out to roughly a 10.5% effective return, stretching doubling time from 6.12 years to around 6.94 years, nearly 10 months longer purely from tax drag.
                      </p>
                    </div>

                    <div style={sec} id="sip-vs-lumpsum-doubling">
                      <h2 style={h2}>SIP vs Lumpsum: Which Doubles Faster</h2>
                      <p style={p}>
                        This calculator answers the lumpsum question: how long does one investment made today take to double. A SIP is a different mathematical problem, since each monthly instalment starts compounding from a different date, so no single instalment doubles at the same time as the others.
                      </p>
                      <p style={p}>
                        In practice, a SIP&apos;s <em>total corpus</em> reaches 2x the total amount invested sooner than a lumpsum doubles, because later instalments have less time to grow while earlier ones have already grown well past 2x, and the blended effect front-loads the doubling point. To model a recurring monthly investment directly rather than a single lumpsum, use the <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SIP Calculator</Link> or the <Link href="/calculators/step-up-sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Step-Up SIP Calculator</Link>.
                      </p>
                    </div>

                    <div style={sec} id="limitations">
                      <h2 style={h2}>Limitations of This Calculator</h2>
                      <p style={p}>
                        <strong style={{ color: C.ink }}>Assumes a constant return every year:</strong> real investments, especially equities, do not grow at a smooth, unchanging rate. Actual doubling time for a market-linked investment will differ from this projection.
                      </p>
                      <p style={p}>
                        <strong style={{ color: C.ink }}>Tax is applied as a flat haircut:</strong> the tax-rate input reduces the return uniformly, which is a simplification of India&apos;s actual capital gains rules, where tax treatment depends on holding period and asset type.
                      </p>
                      <p style={p}>
                        <strong style={{ color: C.ink }}>No withdrawals or additional contributions:</strong> this tool assumes a single lumpsum left untouched. For a monthly contribution scenario, use the <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SIP Calculator</Link> instead.
                      </p>
                    </div>

                    <div style={sec} id="how-to-use">
                      <h2 style={h2}>How to Use This Money Doubling Calculator</h2>
                      <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Enter your initial investment:</strong> the lumpsum amount you are starting with.</li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Set the expected annual return:</strong> and choose the target multiple: 2x, 3x, 4x, or 10x.</li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Pick the compounding frequency:</strong> annually, semi-annually, quarterly, or monthly, matching how your actual investment compounds.</li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Open Advanced Settings for tax and inflation:</strong> to see the effective, after-tax, inflation-adjusted time to your target.</li>
                      </ol>
                    </div>


                    <div style={sec} id="faq">
                      <h2 style={h2}>Frequently Asked Questions</h2>
                      <FAQ faqs={faqs} />
                    </div>

                    <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                        <strong>Disclaimer:</strong> This calculator projects doubling time using a constant assumed return, which real investments, particularly market-linked ones, do not deliver year after year. Tax and inflation adjustments are simplified estimates, not a substitute for actual tax computation. This calculator is for educational and planning purposes only and does not constitute financial advice. Consult a SEBI-registered investment adviser before making investment decisions.
                      </p>
                    </div>
                  </>
                );
              })()}
            </article>
          </div>

          {/* SIDEBAR */}
          <aside className="md-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: 14, position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ flexShrink: 0 }}><SidebarList title="Popular Calculators" items={POPULAR} /></div>
            <div style={{ flexShrink: 0 }}><SidebarList title="More Calculators" items={MORE} /></div>
          </aside>

        </div>
      </div>

      <style>{`.md-sidebar::-webkit-scrollbar{width:5px}.md-sidebar::-webkit-scrollbar-track{background:transparent}.md-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.md-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>

      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

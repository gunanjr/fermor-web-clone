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

function StackedGrowthChart({ data, mobile, fmtIN }: { data: {year: number, invested: number, returns: number}[], mobile: boolean, fmtIN: (v: number) => string }) {
  const w = mobile ? 300 : 600;
  const h = 240;
  const pad = { t: 30, r: 20, b: 30, l: mobile ? 60 : 80 };
  
  const minX = 0;
  const maxX = Math.max(...data.map(d => d.year), 1);
  const maxY = Math.max(...data.map(d => d.invested + d.returns), 1) * 1.1;
  const yTicks = 4;
  
  const investedPts = data.map(d => `${(pad.l + (d.year/maxX)*(w-pad.l-pad.r)).toFixed(1)},${(h - pad.b - (d.invested/maxY)*(h-pad.t-pad.b)).toFixed(1)}`).join(' ');
  const corpusPts = data.map(d => `${(pad.l + (d.year/maxX)*(w-pad.l-pad.r)).toFixed(1)},${(h - pad.b - ((d.invested+d.returns)/maxY)*(h-pad.t-pad.b)).toFixed(1)}`).join(' ');
  
  return (
    <div style={{ width: '100%', overflowX: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 24 }}>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, fontSize: 12, fontWeight: 600 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 12, height: 12, borderRadius: 2, background: C.border }} /> Invested Amount</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 12, height: 12, borderRadius: 2, background: C.dark }} /> Total Wealth</div>
      </div>
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
        
        <path suppressHydrationWarning d={`M ${pad.l},${(h-pad.b).toFixed(1)} L ${corpusPts} L ${(pad.l + w - pad.l - pad.r).toFixed(1)},${(h-pad.b).toFixed(1)} Z`} fill={C.paleLime} opacity="0.6" />
        <polyline suppressHydrationWarning points={investedPts} fill="none" stroke={C.ink3} strokeWidth="3" strokeDasharray="6 6" />
        <polyline suppressHydrationWarning points={corpusPts} fill="none" stroke={C.dark} strokeWidth="4" />
        
        {/* X-axis */}
        {data.filter((_, i) => i % (maxX > 15 ? 5 : maxX > 8 ? 2 : 1) === 0).map(d => {
          const x = pad.l + (d.year/maxX)*(w-pad.l-pad.r);
          return (
            <text suppressHydrationWarning key={`x-${d.year}`} x={x.toFixed(1)} y={h - 5} fontSize="10" fill={C.ink3} textAnchor="middle">{d.year} Yr</text>
          );
        })}
      </svg>
    </div>
  );
}

// Binary search utility for SIP
const findRequiredSip = (target: number, durationYears: number, annReturn: number, annStepUp: number, currentSavingsVal: number) => {
  const remainingTarget = target - currentSavingsVal;
  if (remainingTarget <= 0 || durationYears <= 0) return 0;

  let low = 0;
  let high = remainingTarget;
  let ans = 0;
  const mRate = annReturn / 12 / 100;

  for (let i = 0; i < 60; i++) {
    let mid = (low + high) / 2;
    let FV = 0;
    let currentSip = mid;
    for (let y = 1; y <= durationYears; y++) {
      for (let m = 1; m <= 12; m++) {
        FV = (FV + currentSip) * (1 + mRate);
      }
      currentSip *= (1 + annStepUp / 100);
    }
    if (FV >= remainingTarget) {
      ans = mid;
      high = mid;
    } else {
      low = mid;
    }
  }
  return ans;
};

export default function MonthlyInvestmentClient({ faqs }: { faqs: { q: string; a: string }[] }) {
  const defaultSettings = { targetCorpus: 10000000, years: 10, rate: 12, currentSavings: 0, stepUp: 0, inflationRate: 6, goalInflationToggle: false };
  const { settings, updateSettings } = useCalculatorSettings('monthly-investment-calculator', defaultSettings);
  const { targetCorpus, years, rate, currentSavings, stepUp, inflationRate, goalInflationToggle } = settings;
  const setTargetCorpus = (v: any) => updateSettings({ targetCorpus: typeof v === 'function' ? v(settings.targetCorpus) : v });
  const setYears = (v: any) => updateSettings({ years: typeof v === 'function' ? v(settings.years) : v });
  const setRate = (v: any) => updateSettings({ rate: typeof v === 'function' ? v(settings.rate) : v });
  const setCurrentSavings = (v: any) => updateSettings({ currentSavings: typeof v === 'function' ? v(settings.currentSavings) : v });
  const setStepUp = (v: any) => updateSettings({ stepUp: typeof v === 'function' ? v(settings.stepUp) : v });
  const setInflationRate = (v: any) => updateSettings({ inflationRate: typeof v === 'function' ? v(settings.inflationRate) : v });
  const setGoalInflationToggle = (v: any) => updateSettings({ goalInflationToggle: typeof v === 'function' ? v(settings.goalInflationToggle) : v }); // 1 Crore
    
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showChart, setShowChart] = useState(true);
  const [showScenarios, setShowScenarios] = useState(true);
  const [showGoalTable, setShowGoalTable] = useState(true);

  const [mobile, setMobile] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const PRESETS = [
    { label: '₹10L', val: 1000000 },
    { label: '₹50L', val: 5000000 },
    { label: '₹1Cr', val: 10000000 },
    { label: '₹5Cr', val: 50000000 },
  ];

  // Core Calculations
  const calc = useMemo(() => {
    // Goal inflation
    const actualTarget = goalInflationToggle ? targetCorpus * Math.pow(1 + inflationRate / 100, years) : targetCorpus;
    
    // Future value of current savings
    const currentSavingsFV = currentSavings * Math.pow(1 + rate / 100, years);

    // Required SIP
    const requiredSip = findRequiredSip(actualTarget, years, rate, stepUp, currentSavingsFV);

    // Generate timeline data
    const data = [{ year: 0, invested: currentSavings, returns: 0 }];
    let runningInvested = currentSavings;
    let runningCorpus = currentSavings;
    let currentSip = requiredSip;
    const mRate = rate / 12 / 100;

    for (let y = 1; y <= years; y++) {
      let yrInvested = 0;
      for (let m = 1; m <= 12; m++) {
        yrInvested += currentSip;
        runningCorpus = (runningCorpus + currentSip) * (1 + mRate);
      }
      runningInvested += yrInvested;
      // also compound the current savings part
      // wait, the runningCorpus already includes current savings compounding if we seeded it.
      data.push({ year: y, invested: runningInvested, returns: runningCorpus - runningInvested });
      currentSip *= (1 + stepUp / 100);
    }

    // Scenarios
    const sip8 = findRequiredSip(actualTarget, years, 8, stepUp, currentSavings * Math.pow(1 + 8 / 100, years));
    const sip12 = findRequiredSip(actualTarget, years, 12, stepUp, currentSavings * Math.pow(1 + 12 / 100, years));
    const sip15 = findRequiredSip(actualTarget, years, 15, stepUp, currentSavings * Math.pow(1 + 15 / 100, years));

    // Delay Impact (1 year)
    let delaySip = 0;
    if (years > 1) {
      const delayCurrentSavingsFV = currentSavings * Math.pow(1 + rate / 100, years - 1);
      delaySip = findRequiredSip(actualTarget, years - 1, rate, stepUp, delayCurrentSavingsFV);
    }

    // Goal Table (5, 10, 15, 20 yrs)
    const goalTable = [5, 10, 15, 20].map(y => {
      const tgt = goalInflationToggle ? targetCorpus * Math.pow(1 + inflationRate / 100, y) : targetCorpus;
      const savFv = currentSavings * Math.pow(1 + rate / 100, y);
      return { years: y, sip: findRequiredSip(tgt, y, rate, stepUp, savFv) };
    });

    return {
      actualTarget, requiredSip, totalInvested: runningInvested, totalReturns: runningCorpus - runningInvested,
      data, sip8, sip12, sip15, delaySip, goalTable
    };
  }, [targetCorpus, years, rate, currentSavings, stepUp, inflationRate, goalInflationToggle]);

  // Feasibility (assuming average SIP affordability bounds, rough heuristic)
  let feasibilityStr = 'Realistic Goal';
  let feasibilityCol = C.lime2;
  if (calc.requiredSip === 0) {
    feasibilityStr = 'Goal Reached!';
    feasibilityCol = C.lime2;
  } else if (calc.requiredSip > 500000) {
    feasibilityStr = 'Very Aggressive Goal';
    feasibilityCol = '#E59113';
  } else if (calc.requiredSip > 100000) {
    feasibilityStr = 'Challenging Goal';
    feasibilityCol = '#E59113'; // warning orange
  }

  const POPULAR = [
    { href: '/calculators/sip-calculator',            label: 'SIP Calculator' },
    { href: '/calculators/retirement-calculator',     label: 'Retirement Calculator' },
    { href: '/calculators/inflation-calculator',      label: 'Inflation Calculator' },
    { href: '/calculators/elss-calculator',           label: 'ELSS Calculator' },
    { href: '/calculators/step-up-sip-calculator',    label: 'Step-Up SIP Calculator' },
    { href: '/calculators/lumpsum-calculator',        label: 'Lumpsum Calculator' },
    { href: '/calculators/compound-interest-calculator', label: 'Compound Interest Calculator' },
  ];
  const MORE = [
    { href: '/calculators/investment-comparison-calculator',label: 'Investment Comparison' },
    { href: '/calculators/money-doubling-calculator',      label: 'Money Doubling Calculator' },
    { href: '/calculators/goal-planning-calculator',       label: 'Goal Planning Calculator' },
    { href: '/calculators/education-corpus-calculator',    label: 'Education Corpus Calculator' },
    { href: '/calculators/ppf-calculator',                 label: 'PPF Calculator' },
    { href: '/calculators/wealth-growth-calculator',       label: 'Wealth Growth Calculator' },
    { href: '/calculators/real-return-calculator',         label: 'Real Return Calculator' },
  ];

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <style>{`.mi-sidebar::-webkit-scrollbar{width:5px}.mi-sidebar::-webkit-scrollbar-track{background:transparent}.mi-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.mi-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 28px', letterSpacing: '-0.025em' }}>Monthly Investment Calculator</h1>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          <div style={{ minWidth: 0 }}>
            {/* CALCULATOR CARD */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 16 }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                {/* Input panel */}
                <div style={{ padding: mobile ? '20px' : '36px 48px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: C.ink }}>Inputs</h2>
                    <CurrencySelector theme="light" />
                  </div>
                  
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ fontSize: 14, color: C.ink2, fontWeight: 600, display: 'block', marginBottom: 12 }}>Target Corpus (Goal)</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 16 }}>
                      {PRESETS.map(p => (
                        <button key={p.label} onClick={() => setTargetCorpus(p.val)}
                          style={{ padding: '8px 0', borderRadius: 8, border: `1.5px solid ${targetCorpus === p.val ? C.lime2 : C.border}`, background: targetCorpus === p.val ? C.paleLime : C.white, color: targetCorpus === p.val ? C.dark : C.ink3, fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s' }}>
                          {p.label}
                        </button>
                      ))}
                    </div>
                    <Slider label="" value={targetCorpus} min={100000} max={100000000} step={100000} fmt={fmtC} onChange={setTargetCorpus} compact={mobile} />
                  </div>

                  <Slider label="Investment Duration" value={years} min={1} max={40} step={1} fmt={v => `${v} yrs`} onChange={setYears} compact={mobile} />
                  <Slider label="Expected Annual Return" value={rate} min={1} max={30} step={0.5} fmt={v => `${v}%`} onChange={setRate} compact={mobile} />
                  
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
                        <Slider label="Current Savings" value={currentSavings} min={0} max={5000000} step={10000} fmt={fmtC} onChange={setCurrentSavings} compact={mobile} />
                        <Slider label="Annual Step-Up" value={stepUp} min={0} max={20} step={1} fmt={v => `${v}%`} onChange={setStepUp} compact={mobile} />
                        
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: goalInflationToggle ? C.paleLime : '#F8FAFB', border: `1px solid ${goalInflationToggle ? C.lime2 : C.border}`, padding: '12px 16px', borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => setGoalInflationToggle(!goalInflationToggle)}>
                          <div>
                            <span style={{ fontSize: 13, fontWeight: 600, color: C.ink, display: 'block' }}>Goal Inflation Adjustment</span>
                            <span style={{ fontSize: 11, color: C.ink3 }}>Inflate target corpus automatically</span>
                          </div>
                          <div style={{ width: 44, height: 24, borderRadius: 12, background: goalInflationToggle ? C.lime2 : '#d3d7da', position: 'relative', transition: 'background 0.2s' }}>
                            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: goalInflationToggle ? 22 : 2, transition: 'left 0.2s' }} />
                          </div>
                        </div>

                        {goalInflationToggle && (
                          <div style={{ marginTop: 8 }}>
                            <Slider label="Expected Inflation Rate" value={inflationRate} min={0} max={12} step={0.5} fmt={v => `${v}%`} onChange={setInflationRate} compact={mobile} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Results panel */}
                <div style={{ padding: mobile ? '20px' : '36px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                    <div style={{ background: '#fafafa', border: `1px solid ${feasibilityCol}`, padding: '4px 12px', borderRadius: 16, fontSize: 11, fontWeight: 700, color: feasibilityCol }}>
                      {feasibilityStr}
                    </div>
                  </div>

                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>
                      {stepUp > 0 ? 'Starting Monthly Investment' : 'Required Monthly Investment'}
                    </span>
                    <span aria-live="polite" aria-label={`${stepUp > 0 ? 'Starting' : 'Required'} monthly investment: ${fmtIN(calc.requiredSip)}`}
                      style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {fmtIN(calc.requiredSip)}
                    </span>
                  </div>

                  {/* Summary Cards */}
                  <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
                    <div style={{ background: C.white, borderRadius: 12, padding: 16, border: `1px solid ${C.border}` }}>
                      <span style={{ fontSize: 12, color: C.ink2, fontWeight: 700, display: 'block', marginBottom: 4 }}>Total Invested</span>
                      <span style={{ fontSize: 18, color: C.ink, fontWeight: 800 }}>{fmtC(calc.totalInvested)}</span>
                    </div>
                    <div style={{ background: C.white, borderRadius: 12, padding: 16, border: `1px solid ${C.border}` }}>
                      <span style={{ fontSize: 12, color: C.ink2, fontWeight: 700, display: 'block', marginBottom: 4 }}>Wealth Growth</span>
                      <span style={{ fontSize: 18, color: '#2d9970', fontWeight: 800 }}>{fmtC(calc.totalReturns)}</span>
                    </div>
                  </div>

                  {/* Donut Chart */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 20 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 6 : -1 }}>
                    {(() => {
                      const total = calc.totalInvested + calc.totalReturns;
                      if (total === 0) return null;
                      const R = 80, sw = 20, cx = 106, cy = 106;
                      const circ = 2 * Math.PI * R;
                      const pArc = (calc.totalInvested / total) * circ;
                      const pPct = Math.round((calc.totalInvested / total) * 100);
                      return (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                          <svg width="212" height="212" viewBox="0 0 212 212" role="img" aria-label="Invested vs Returns donut chart" style={{ display: 'block' }}>
                            <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
                            <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
                              strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
                              style={{ transition: 'stroke-dasharray 0.4s ease' }} />
                            <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Invested</text>
                            <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
                          </svg>
                          <div style={{ display: 'flex', gap: 20, fontSize: 12, color: C.ink2 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} />
                              <span>Invested ({fmtC(calc.totalInvested)})</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} />
                              <span>Returns ({fmtC(calc.totalReturns)})</span>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Delay Impact Card */}
                  {calc.delaySip > 0 && (
                    <div style={{ width: '100%', marginTop: 16, background: '#FFFDF9', border: '1px solid #F1DEC0', borderRadius: 12, padding: '16px 20px', textAlign: 'center' }}>
                      <div style={{ fontSize: 13, color: C.ink2, fontWeight: 600 }}>The Cost of Delay</div>
                      <div style={{ fontSize: 14, color: C.ink, marginTop: 4, lineHeight: 1.5 }}>
                        Delaying this investment by just 1 year increases your required monthly investment to <strong>{fmtIN(calc.delaySip)}</strong>.
                      </div>
                    </div>
                  )}

                  {goalInflationToggle && (
                    <div style={{ width: '100%', marginTop: 16, fontSize: 12, color: C.ink2, textAlign: 'center', background: '#F8FAFB', padding: '10px', borderRadius: 8, border: `1px solid ${C.border}` }}>
                      Inflation-Adjusted Target Corpus: <strong style={{ color: C.ink }}>{fmtC(calc.actualTarget)}</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Chart Section */}
              <div style={{ padding: mobile ? '14px 20px' : '16px 28px', borderTop: `1px solid ${C.border}`, background: '#fafafa' }}>
                <button
                  onClick={() => setShowChart(!showChart)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: INTER, color: C.ink, fontWeight: 800, fontSize: 18 }}
                >
                  <span>Goal Achievement Timeline</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: showChart ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {showChart && (
                  <div style={{ marginTop: 16 }}>
                    <StackedGrowthChart data={calc.data} mobile={mobile} fmtIN={fmtC} />
                  </div>
                )}
              </div>
            </div>

            {/* SCENARIO ANALYSIS */}
            <div style={{ marginBottom: 16, background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: mobile ? '14px 20px' : '16px 28px' }}>
              <button
                onClick={() => setShowScenarios(!showScenarios)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: INTER, color: C.ink, fontWeight: 800, fontSize: 18 }}
              >
                <span>Return Rate Scenarios</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: showScenarios ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {showScenarios && (
                <>
                  <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.6, margin: '16px 0 24px' }}>
                    See how different market conditions affect your required monthly investment to reach {fmtC(targetCorpus)}.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
                    <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, textAlign: 'center', background: '#F8FAFB' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: C.ink3, textTransform: 'uppercase', marginBottom: 8 }}>Conservative</div>
                      <div style={{ fontSize: 28, fontWeight: 800, color: C.ink, marginBottom: 4 }}>8%</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: C.dark }}>{fmtIN(calc.sip8)} / mo</div>
                    </div>
                    <div style={{ border: `2px solid ${C.lime2}`, borderRadius: 12, padding: 20, textAlign: 'center', background: C.paleLime }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: C.ink2, textTransform: 'uppercase', marginBottom: 8 }}>Moderate</div>
                      <div style={{ fontSize: 28, fontWeight: 800, color: C.dark, marginBottom: 4 }}>12%</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: C.dark }}>{fmtIN(calc.sip12)} / mo</div>
                    </div>
                    <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, textAlign: 'center', background: '#F8FAFB' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: C.ink3, textTransform: 'uppercase', marginBottom: 8 }}>Aggressive</div>
                      <div style={{ fontSize: 28, fontWeight: 800, color: C.ink, marginBottom: 4 }}>15%</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: C.dark }}>{fmtIN(calc.sip15)} / mo</div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* GOAL COMPARISON TABLE */}
            <div style={{ marginBottom: 24, background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: mobile ? '14px 20px' : '16px 28px' }}>
              <button
                onClick={() => setShowGoalTable(!showGoalTable)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: INTER, color: C.ink, fontWeight: 800, fontSize: 18 }}
              >
                <span>Impact of Time on Goals</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: showGoalTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {showGoalTable && (
                <>
                  <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.6, margin: '16px 0 24px' }}>
                    The longer your investment horizon, the less you need to invest every month. The magic of compounding does the heavy lifting in the later years.
                  </p>

                  <div style={{ overflowX: 'auto', border: `1px solid ${C.border}`, borderRadius: 12 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 400 }}>
                      <thead style={{ background: '#f4f5f6', borderBottom: `1px solid ${C.border}` }}>
                        <tr>
                          <th style={{ padding: '16px', fontSize: 13, fontWeight: 700, color: C.ink }}>Time Horizon</th>
                          <th style={{ padding: '16px', fontSize: 13, fontWeight: 700, color: C.dark }}>Required Monthly Investment</th>
                        </tr>
                      </thead>
                      <tbody>
                        {calc.goalTable.map((g, i) => (
                          <tr key={i} style={{ borderBottom: i === calc.goalTable.length - 1 ? 'none' : `1px solid ${C.border}` }}>
                            <td style={{ padding: '16px', fontSize: 14, fontWeight: 600, color: C.ink }}>{g.years} Years</td>
                            <td style={{ padding: '16px', fontSize: 14, fontWeight: 700, color: C.lime2 }}>{fmtC(g.sip)} / month</td>
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
                    <div style={sec} id="what-is-monthly-investment-calculator">
                      <h2 style={h2}>What Is a Monthly Investment Calculator?</h2>
                      <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                        <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                          A monthly investment calculator works backward from a target amount to tell you the fixed monthly SIP needed to reach it, given a tenure and an assumed rate of return.
                        </p>
                      </div>
                      <p style={p}>
                        A traditional SIP calculator asks "how much will my monthly investment grow into?" This tool asks the reverse question: "how much do I need to invest every month to reach my target corpus?" Both use the same underlying compounding math, just solved for a different variable.
                      </p>
                    </div>

                    <div style={sec} id="required-sip-formula">
                      <h2 style={h2}>Required SIP Formula: How It Is Calculated</h2>
                      <p style={p}>
                        The calculator starts from the standard SIP future value formula and rearranges it to solve for the monthly instalment (P) instead of the maturity value (M).
                      </p>
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 20px', margin: '0 0 16px', fontFamily: 'monospace', fontSize: 14, color: C.dark, fontWeight: 700, overflowX: 'auto', whiteSpace: 'nowrap' as const }}>
                        P = M / {'{'}[((1 + i)^n − 1) / i] × (1 + i){'}'}
                      </div>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Required SIP formula variables</caption>
                          <thead><tr><th scope="col" style={thS}>Variable</th><th scope="col" style={thS}>Meaning</th></tr></thead>
                          <tbody>
                            <tr><td style={tdL}>P</td><td style={tdL}>Required monthly investment (what this calculator solves for)</td></tr>
                            <tr><td style={tdL}>M</td><td style={tdL}>Target corpus you want to reach</td></tr>
                            <tr><td style={tdL}>n</td><td style={tdL}>Number of monthly instalments (years × 12)</td></tr>
                            <tr><td style={tdL}>i</td><td style={tdL}>Monthly rate, the annual rate divided by 12 and by 100</td></tr>
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>
                        Worked example: to reach a ₹1 crore goal in 10 years assuming a 12% annual return, solving this formula gives a required monthly SIP of approximately ₹43,041, with no existing savings and no step-up.
                      </p>
                    </div>

                    <div style={sec} id="required-sip-for-common-goals">
                      <h2 style={h2}>Monthly Investment Required for Common Goals</h2>
                      <p style={p}>Assuming a 12% expected annual return over 10 years, with no existing savings and no step-up:</p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Monthly SIP required for common goal amounts</caption>
                          <thead><tr><th scope="col" style={thS}>Goal Amount</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>Required Monthly SIP</th></tr></thead>
                          <tbody>
                            <tr><td style={tdL}>₹10 Lakh</td><td style={tdR}>~₹4,304</td></tr>
                            <tr><td style={tdL}>₹25 Lakh</td><td style={tdR}>~₹10,760</td></tr>
                            <tr><td style={tdL}>₹50 Lakh</td><td style={tdR}>~₹21,520</td></tr>
                            <tr><td style={tdL}>₹1 Crore</td><td style={tdR}>~₹43,041</td></tr>
                            <tr><td style={tdL}>₹2 Crore</td><td style={tdR}>~₹86,082</td></tr>
                            <tr><td style={tdL}>₹5 Crore</td><td style={tdR}>~₹2,15,206</td></tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div style={sec} id="return-rate-sensitivity">
                      <h2 style={h2}>How Sensitive Is the Required SIP to Your Return Assumption?</h2>
                      <p style={p}>
                        The assumed rate of return has a large effect on the required monthly SIP, since a higher return means each rupee invested does more compounding work over the same tenure. For a ₹1 crore goal over 10 years, with no existing savings:
                      </p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Required monthly SIP by assumed annual return, Rs 1 crore goal over 10 years</caption>
                          <thead><tr><th scope="col" style={thS}>Assumed Annual Return</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>Required Monthly SIP</th></tr></thead>
                          <tbody>
                            <tr><td style={tdL}>8% (conservative, debt-leaning)</td><td style={tdR}>~₹54,299</td></tr>
                            <tr><td style={tdL}>12% (balanced equity assumption)</td><td style={tdR}>~₹43,041</td></tr>
                            <tr><td style={tdL}>15% (aggressive equity assumption)</td><td style={tdR}>~₹35,886</td></tr>
                          </tbody>
                        </table>
                      </div>
                      <p style={{ fontSize: 12.5, color: C.ink3, margin: 0 }}>
                        A higher assumed return lowers the required SIP on paper, but assuming a rate you cannot realistically sustain is the most common way this kind of calculation goes wrong. Use the <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SIP Calculator</Link> to sanity-check a rate against a fund&apos;s own real historical returns before committing to it.
                      </p>
                    </div>

                    <div style={sec} id="how-duration-impacts-contributions">
                      <h2 style={h2}>How Investment Duration Impacts Contributions</h2>
                      <p style={p}>
                        Delaying your investment journey increases the monthly burden non-linearly, not just proportionally. As shown in the &quot;Cost of Delay&quot; card above, missing just one year of early compounding forces a meaningfully larger monthly contribution later, since the money that would have been invested and compounding is simply gone from the timeline. Starting early lets the market fund a larger share of the goal instead of your salary.
                      </p>
                    </div>

                    <div style={sec} id="step-up-and-inflation">
                      <h2 style={h2}>Step-Up SIP and Inflation-Adjusted Goals</h2>
                      <p style={p}>
                        The Step-Up option increases your monthly instalment by a fixed percentage every year, typically matching expected salary growth, which lowers the starting SIP amount compared to a flat contribution for the same goal. The Inflation Adjustment toggle instead scales up the target corpus itself, so a ₹1 crore goal 15 years from now is treated as needing to be worth ₹1 crore in today&apos;s purchasing power, not ₹1 crore in nominal, inflation-eroded rupees. Run the target through the <Link href="/calculators/inflation-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Inflation Calculator</Link> first if you are unsure what inflation rate to assume.
                      </p>
                    </div>

                    <div style={sec} id="step-up-sip-worked-example">
                      <h2 style={h2}>How Much a Step-Up SIP Lowers Your Starting Investment</h2>
                      <p style={p}>
                        A step-up SIP raises the monthly instalment by a fixed percentage every year, so the starting contribution can be meaningfully lower than a flat SIP for the exact same goal, since later, larger instalments make up the difference.
                      </p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Required starting SIP with and without annual step-up, Rs 1 crore goal, 10 years, 12% return</caption>
                          <thead><tr><th scope="col" style={thS}>Annual Step-Up</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>Starting Monthly SIP</th></tr></thead>
                          <tbody>
                            <tr><td style={tdL}>0% (flat SIP)</td><td style={tdR}>~₹43,041</td></tr>
                            <tr><td style={tdL}>10% per year</td><td style={tdR}>~₹29,636</td></tr>
                          </tbody>
                        </table>
                      </div>
                      <p style={{ fontSize: 12.5, color: C.ink3, margin: 0 }}>
                        A 10% annual step-up cuts the starting SIP by roughly 31% for the same 10-year, 12% return goal, since the instalment keeps growing every year alongside a typical salary increment.
                      </p>
                    </div>

                    <div style={sec} id="existing-savings-offset">
                      <h2 style={h2}>How Existing Savings Reduce Your Required Monthly Investment</h2>
                      <p style={p}>
                        Any lumpsum you already hold gets compounded forward to the end of your tenure at your expected return rate, and that future value is subtracted from your target before the required SIP is calculated. A larger head start means a meaningfully smaller monthly burden.
                      </p>
                      <p style={p}>
                        Worked example: for the same ₹1 crore goal over 10 years at 12%, ₹10 lakh in existing savings grows to roughly ₹31.06 lakh by year 10, cutting the required monthly SIP from ₹43,041 to about ₹29,673, a reduction of nearly 31%.
                      </p>
                    </div>

                    <div style={sec} id="goal-inflation-worked-example">
                      <h2 style={h2}>Why Ignoring Inflation Understates Your Real Requirement</h2>
                      <p style={p}>
                        A goal that costs ₹1 crore today will cost more by the time you actually need the money, since prices rise every year. Turning off the Goal Inflation Adjustment toggle silently assumes the target never changes in nominal terms, which understates what you will actually need to save.
                      </p>
                      <p style={p}>
                        Worked example: a ₹1 crore goal 15 years away, inflated at 6% a year, is really a ₹2.4 crore goal in future rupees. That changes the required monthly SIP from ₹19,819 (ignoring inflation) to roughly ₹47,496 (inflation-adjusted), a difference large enough to derail a plan that never accounted for it.
                      </p>
                    </div>

                    <div style={sec} id="monthly-investment-by-goal-type">
                      <h2 style={h2}>Monthly Investment Required for Common Life Goals</h2>
                      <p style={p}>
                        Different goals suit different time horizons and risk levels, which changes the realistic return assumption to use. These are illustrative starting points, not fixed rules.
                      </p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Typical time horizon and return assumption by financial goal type</caption>
                          <thead><tr><th scope="col" style={thS}>Goal</th><th scope="col" style={thS}>Typical Horizon</th><th scope="col" style={thS}>Common Return Assumption</th></tr></thead>
                          <tbody>
                            <tr><td style={tdL}>House down payment</td><td style={tdL}>3-7 years</td><td style={tdL}>7-9% (debt-leaning)</td></tr>
                            <tr><td style={tdL}>Child&apos;s higher education</td><td style={tdL}>10-18 years</td><td style={tdL}>10-12% (balanced)</td></tr>
                            <tr><td style={tdL}>Wedding expenses</td><td style={tdL}>3-8 years</td><td style={tdL}>7-9% (debt-leaning)</td></tr>
                            <tr><td style={tdL}>Retirement corpus</td><td style={tdL}>15-30 years</td><td style={tdL}>10-13% (equity-heavy, early years)</td></tr>
                            <tr><td style={tdL}>Emergency fund top-up</td><td style={tdL}>1-3 years</td><td style={tdL}>5-6.5% (liquid/debt fund)</td></tr>
                          </tbody>
                        </table>
                      </div>
                      <p style={{ fontSize: 12.5, color: C.ink3, margin: 0 }}>
                        A shorter horizon calls for a more conservative return assumption since there is less time to recover from a bad market year. For education and retirement specifically, the <Link href="/calculators/education-corpus-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Education Corpus Calculator</Link> and <Link href="/calculators/retirement-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Retirement Calculator</Link> add goal-specific detail this general-purpose tool does not.
                      </p>
                    </div>

                    <div style={sec} id="limitations">
                      <h2 style={h2}>Limitations of This Calculator</h2>
                      <p style={p}>
                        <strong style={{ color: C.ink }}>Assumes a constant return rate:</strong> real markets do not deliver the same return every year. The final corpus from an actual SIP will differ from this projection based on the sequence of returns, not just the average.
                      </p>
                      <p style={p}>
                        <strong style={{ color: C.ink }}>Ignores tax on gains:</strong> the target corpus shown is pre-tax. Equity mutual fund gains are taxed on redemption, which reduces the amount actually available to spend.
                      </p>
                      <p style={p}>
                        <strong style={{ color: C.ink }}>Step-up assumes uninterrupted increases:</strong> a career break, job loss, or pay cut would mean the step-up percentage is not actually sustained every year as modelled.
                      </p>
                    </div>

                    <div style={sec} id="how-to-use">
                      <h2 style={h2}>How to Use This Monthly Investment Calculator</h2>
                      <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Enter your target corpus:</strong> the amount you want to have by the end of the tenure.</li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Set the tenure and expected return:</strong> how many years you have and the annual return you are assuming.</li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Add any existing savings:</strong> a lumpsum you already have reduces the monthly SIP needed.</li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Turn on step-up or inflation adjustment if relevant:</strong> and read the required monthly SIP in the result panel.</li>
                      </ol>
                    </div>


                    <div style={sec} id="faq">
                      <h2 style={h2}>Frequently Asked Questions</h2>
                      <FAQ faqs={faqs} />
                    </div>

                    <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                        <strong>Disclaimer:</strong> This calculator solves for the monthly SIP required to reach a target corpus, assuming a constant annual return sustained every year of the tenure. Actual investment returns fluctuate year to year and are not guaranteed. Figures shown are pre-tax and do not account for fund expense ratios. This calculator is for educational and planning purposes only and does not constitute financial advice. Consult a SEBI-registered investment adviser before making investment decisions.
                      </p>
                    </div>
                  </>
                );
              })()}
            </article>
          </div>

          {/* SIDEBAR */}
          <aside className="mi-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: 14, position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <SidebarList title="Popular Calculators" items={POPULAR} />
            <SidebarList title="More Calculators" items={MORE} />
          </aside>

        </div>
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

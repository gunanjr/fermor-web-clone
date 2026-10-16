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
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { faqItems } from './faqData';
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

type InputMode = 'percentage' | 'amount' | 'newSalary';

function Slider({ label, value, min, max, step, fmt, onChange, compact, id }: {
  label: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void; compact?: boolean; id?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = ((value - min) / (max - min)) * 100;
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 36 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 14 }}>
        <label htmlFor={inputId} style={{ fontSize: compact ? 13.5 : 14, color: C.ink2, fontWeight: 400 }}>{label}</label>
        {editing ? (
          <input id={inputId} autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            aria-label={`Enter ${label} value`}
            style={{ fontSize: 14, fontWeight: 600, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 7, padding: compact ? '6px 10px' : '7px 12px', width: 120, outline: 'none', color: C.ink, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${fmt(value)}. Click to edit.`}
            style={{ fontSize: compact ? 13 : 14, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: compact ? '5px 12px' : '6px 14px', cursor: 'pointer', fontFamily: INTER, minWidth: compact ? 88 : 105, textAlign: 'center', transition: 'border-color 0.15s' }}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}>
            {fmt(value)}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 18, height: 18, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 1px 6px rgba(16,18,20,0.18)', pointerEvents: 'none', zIndex: 1 }} />
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(+e.target.value)}
          aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">{fmt(min)}</span>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">{fmt(max)}</span>
      </div>
    </div>
  );
}

/* ─── Donut Chart: Original Salary vs Hike Amount (VPF geometry: one track, one overlay arc) ─── */
function DonutChart({ hikePctOfNew }: { hikePctOfNew: number }) {
  const originalPct = 100 - hikePctOfNew;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const hArc = (hikePctOfNew / 100) * circ;
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Hike amount is ${hikePctOfNew}% of new salary, original salary is ${originalPct}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#2d9970" strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${hArc} ${circ - hArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Hike is</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{hikePctOfNew}%</text>
    </svg>
  );
}

/* ─── Growth Projection Bar Chart (VPF pattern: base salary + cumulative growth, stacked) ─── */
interface GrowthYear { year: number; salary: number; cumulativeIncrease: number; pctGrowth: number; }

function buildGrowthSchedule(currentSalary: number, annualRatePct: number, years: number): GrowthYear[] {
  const rows: GrowthYear[] = [];
  let salary = currentSalary;
  const rate = Math.max(0, annualRatePct) / 100;
  for (let y = 1; y <= years; y++) {
    salary = salary * (1 + rate);
    rows.push({
      year: y,
      salary,
      cumulativeIncrease: salary - currentSalary,
      pctGrowth: currentSalary > 0 ? ((salary - currentSalary) / currentSalary) * 100 : 0,
    });
  }
  return rows;
}

function GrowthBarChart({ rows, baseSalary }: { rows: GrowthYear[]; baseSalary: number }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxVal = Math.max(...rows.map(r => r.salary));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;
  return (
    <svg role="img" aria-label={`Projected salary growth over ${rows.length} years`}
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {rows.map((row, i) => {
        const baseH = maxVal > 0 ? (Math.min(baseSalary, row.salary) / maxVal) * H : 0;
        const totalH = maxVal > 0 ? (row.salary / maxVal) * H : 0;
        const growthH = totalH - baseH;
        const x = PADL + i * slot + gap;
        return (
          <g key={row.year}>
            <rect x={x} y={H - totalH} width={barW} height={growthH} fill={CHART_PAIR.secondary} rx={2} />
            <rect x={x} y={H - baseH} width={barW} height={baseH} fill={CHART_PAIR.primary} rx={2} />
            {rows.length <= 30 && (
              <text x={x + barW / 2} y={H + 14} textAnchor="middle"
                style={{ fontSize: rows.length > 20 ? 7 : 9, fill: C.ink3, fontFamily: INTER }}>
                Y{row.year}
              </text>
            )}
          </g>
        );
      })}
      <line x1={PADL} y1={H} x2={W} y2={H} stroke={C.border} strokeWidth={1} />
    </svg>
  );
}

function FAQ() {
  return <FAQBox items={faqItems} />;
}

function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <div style={{ padding: '14px 20px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 13.5, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ padding: '12px 20px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 13.5, color: C.ink2, transition: 'all 0.12s' }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = C.paleLime; (e.currentTarget as HTMLElement).style.color = C.dark; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink2; }}>
            {label}
          </div>
        </Link>
      ))}
    </nav>
  );
}

const POPULAR = [
  { href: '/calculators/ctc-calculator',            label: 'CTC Calculator' },
  { href: '/calculators/in-hand-salary-calculator', label: 'In-Hand Salary Calculator' },
  { href: '/calculators/income-tax-calculator',     label: 'Income Tax Calculator' },
  { href: '/calculators/hra-calculator',            label: 'HRA Calculator' },
  { href: '/calculators/gratuity-calculator',       label: 'Gratuity Calculator' },
  { href: '/calculators/inflation-calculator',      label: 'Inflation Calculator' },
  { href: '/calculators/percentage-calculator',     label: 'Percentage Calculator' },
];
const MORE = [
  { href: '/calculators/old-vs-new-tax-regime-calculator', label: 'Old vs New Tax Regime' },
  { href: '/calculators/real-return-calculator',           label: 'Real Return Calculator' },
  { href: '/calculators/xirr-calculator',                  label: 'XIRR Calculator' },
  { href: '/calculators/compound-interest-calculator',     label: 'Compound Interest Calculator' },
];

export default function SalaryHikeCalculatorClient({ region = 'in' }: { region?: string }) {
  const [mobile, setMobile] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showGrowthTable, setShowGrowthTable] = useState(false);

  const defaultSettings = {
    inputMode: 'percentage' as InputMode,
    currentSalary: 600000, hikePct: 10, hikeAmount: 60000, newSalaryInput: 660000,
    inflation: 6, taxBracket: 20, projectionYears: 10,
  };
  const { settings, updateSettings } = useCalculatorSettings('salary-hike-calculator', defaultSettings);
  const { inputMode, currentSalary, hikePct, hikeAmount, newSalaryInput, inflation, taxBracket, projectionYears } = settings;

  const setInputMode      = (v: InputMode) => updateSettings({ inputMode: v });
  const setCurrentSalary  = (v: number) => updateSettings({ currentSalary: v });
  const setHikePct        = (v: number) => updateSettings({ hikePct: v });
  const setHikeAmount     = (v: number) => updateSettings({ hikeAmount: v });
  const setNewSalaryInput = (v: number) => updateSettings({ newSalaryInput: v });
  const setInflation      = (v: number) => updateSettings({ inflation: v });
  const setTaxBracket     = (v: number) => updateSettings({ taxBracket: v });
  const setProjectionYears = (v: number) => updateSettings({ projectionYears: v });

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const actualHikeAmount =
    inputMode === 'percentage' ? (currentSalary * hikePct) / 100 :
    inputMode === 'amount' ? hikeAmount :
    newSalaryInput - currentSalary;
  const actualHikePct = currentSalary > 0 ? (actualHikeAmount / currentSalary) * 100 : 0;

  const newSalary = currentSalary + actualHikeAmount;
  const monthlyIncrease = actualHikeAmount / 12;
  const oldMonthly = currentSalary / 12;
  const newMonthly = newSalary / 12;

  const realGrowthPct = actualHikePct - inflation;

  const estimatedTaxOnHike = (actualHikeAmount * taxBracket) / 100;
  const netInHandIncreaseAnnual = actualHikeAmount - estimatedTaxOnHike;
  const netInHandIncreaseMonthly = netInHandIncreaseAnnual / 12;
  const yearsToDouble = actualHikePct > 0 ? 72 / actualHikePct : null;

  const hikePctOfNew = newSalary > 0 ? Math.max(0, Math.min(100, Math.round((actualHikeAmount / newSalary) * 100))) : 0;
  const growthSchedule = buildGrowthSchedule(currentSalary, actualHikePct, projectionYears);

  const Row = ({ label, value }: { label: string; value: string }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
      <span style={{ fontSize: 13, color: C.ink2 }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{value}</span>
    </div>
  );

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top' as const, textAlign: 'right' as const } as React.CSSProperties;

  const modeLabel = { percentage: '% Hike', amount: 'Fixed Amount', newSalary: 'New Salary' };

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>Salary Hike Calculator</h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate your new salary from a hike percentage or amount, or work out the exact hike percentage from your old and new salary, with inflation-adjusted real growth.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>
            <section aria-label="Salary Hike Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{showAdvanced ? 'More Settings' : 'Inputs'}</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider label="Current Annual Salary" id="hike-current" value={currentSalary} min={200000} max={20000000} step={10000} fmt={fmtC} onChange={setCurrentSalary} compact={mobile} />

                      <div role="group" aria-label="Calculation mode" style={{ display: 'flex', gap: 6, marginBottom: 20, background: '#fafafa', padding: 4, borderRadius: 8, border: `1px solid ${C.border}` }}>
                        {(['percentage', 'amount', 'newSalary'] as InputMode[]).map(m => (
                          <button key={m} onClick={() => setInputMode(m)} aria-pressed={inputMode === m}
                            style={{ flex: 1, padding: '8px 4px', fontSize: mobile ? 11.5 : 12.5, fontWeight: inputMode === m ? 700 : 400, color: inputMode === m ? C.lime : C.ink2, background: inputMode === m ? C.dark : 'transparent', border: 'none', borderRadius: 6, cursor: 'pointer', transition: 'all 0.15s', fontFamily: INTER }}>
                            {modeLabel[m]}
                          </button>
                        ))}
                      </div>

                      {inputMode === 'percentage' && (
                        <Slider label="Hike Percentage" id="hike-pct" value={hikePct} min={-20} max={100} step={1} fmt={v => `${v}%`} onChange={setHikePct} compact={mobile} />
                      )}
                      {inputMode === 'amount' && (
                        <Slider label="Annual Increase Amount" id="hike-amount" value={hikeAmount} min={-500000} max={5000000} step={10000} fmt={fmtC} onChange={setHikeAmount} compact={mobile} />
                      )}
                      {inputMode === 'newSalary' && (
                        <Slider label="New Annual Salary" id="hike-new-salary" value={newSalaryInput} min={100000} max={20000000} step={10000} fmt={fmtC} onChange={setNewSalaryInput} compact={mobile} />
                      )}

                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button onClick={() => setShowAdvanced(true)}
                          style={{ fontSize: 12, fontWeight: 700, color: C.dark, background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 7, padding: '6px 14px', cursor: 'pointer', fontFamily: INTER, display: 'flex', alignItems: 'center', gap: 5 }}>
                          More settings
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Slider label="Expected Inflation Rate" id="hike-inflation" value={inflation} min={0} max={15} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={setInflation} compact={mobile} />
                      <Slider label="Tax Bracket Estimate" id="hike-tax" value={taxBracket} min={0} max={30} step={5} fmt={v => `${v}%`} onChange={setTaxBracket} compact={mobile} />
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: '0 0 20px' }}>
                        Inflation and tax bracket feed the Reality Check section below: an approximate, inflation-adjusted real growth figure and a rough estimate of tax on the incremental hike amount.
                      </p>
                      <Slider label="Projection Years" id="hike-years" value={projectionYears} min={5} max={30} step={1} fmt={v => `${v} yr`} onChange={setProjectionYears} compact={mobile} />
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: '0 0 20px' }}>
                        Sets how many years the Salary Growth Projection section below runs, assuming your current hike percentage repeats every year.
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <button onClick={() => setShowAdvanced(false)}
                          style={{ fontSize: 12, fontWeight: 600, color: C.ink2, background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, display: 'flex', alignItems: 'center', gap: 5, padding: 0 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
                          Back
                        </button>
                      </div>
                    </>
                  )}
                </div>

                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '14px 16px' : '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>New Annual Salary</span>
                    <span aria-live="polite" aria-label={`New Annual Salary: ${fmtIN(newSalary)}`} style={{ fontSize: mobile ? 22 : 30, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>{fmtIN(newSalary)}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, order: mobile ? 1 : -1 }}>
                    <DonutChart hikePctOfNew={hikePctOfNew} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 4, order: mobile ? 2 : -1, width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Hike {hikePctOfNew}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: '#2d9970' }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Original Salary {100 - hikePctOfNew}%</span>
                    </div>
                  </div>

                  <Row label="Current Annual Salary" value={fmtC(currentSalary)} />
                  <Row label="Annual Increase" value={`${actualHikeAmount >= 0 ? '+' : ''}${fmtC(actualHikeAmount)}`} />
                  <Row label="Hike Percentage" value={`${actualHikePct >= 0 ? '+' : ''}${actualHikePct.toFixed(1)}%`} />
                  <Row label="New Monthly Salary" value={fmtIN(newMonthly)} />
                </div>
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, background: '#fafafa' }}>
                <div style={{ padding: mobile ? '16px 18px' : '24px 44px' }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: C.ink, marginBottom: 16 }}>Monthly Impact</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 13.5, color: C.ink2 }}>Old Monthly Salary</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{fmtIN(oldMonthly)} / mo</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 13.5, color: C.dark, fontWeight: 600 }}>New Monthly Salary</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: C.dark }}>{fmtIN(newMonthly)} / mo</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: C.white, border: `1px dashed ${C.border}`, borderRadius: 8 }}>
                    <span style={{ fontSize: 13.5, color: C.ink2 }}>Gross Monthly Difference</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>{monthlyIncrease >= 0 ? '+' : ''}{fmtIN(monthlyIncrease)} / mo</span>
                  </div>
                </div>
              </div>

              {/* Salary Growth Projection: VPF-style collapsible year-by-year section */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowGrowthTable(v => !v)}
                  aria-expanded={showGrowthTable} aria-controls="growth-table"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Salary Growth Projection</span>
                    {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>If your hike repeats every year</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {projectionYears} yr &middot; {Math.max(0, actualHikePct).toFixed(1)}%/yr
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      aria-hidden="true" style={{ transform: showGrowthTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {showGrowthTable && (
                  <div id="growth-table" style={{ borderTop: `1px solid ${C.border}` }}>
                    {actualHikePct <= 0 && (
                      <p style={{ margin: 0, padding: mobile ? '14px 16px 0' : '20px 44px 0', fontSize: 12.5, color: C.ink3, lineHeight: 1.6 }}>
                        Your current inputs give a zero or negative hike, so this projection assumes a flat 0% annual growth until you enter a positive hike above.
                      </p>
                    )}
                    <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                      <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} aria-hidden="true" />
                          <span style={{ fontSize: 11.5, color: C.ink2 }}>Starting Salary</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} aria-hidden="true" />
                          <span style={{ fontSize: 11.5, color: C.ink2 }}>Cumulative Hike Growth</span>
                        </div>
                      </div>
                      <GrowthBarChart rows={growthSchedule} baseSalary={currentSalary} />
                    </div>
                    {mobile && (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '6px 0 4px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                          style={{ animation: 'swipeHint 1.6s ease-in-out infinite' }}>
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                        <p style={{ fontSize: 11.5, color: C.ink3, margin: 0, fontFamily: INTER }}>Swipe to see all columns</p>
                      </div>
                    )}
                    <style>{`@keyframes swipeHint { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }`}</style>
                    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
                      <table style={{ minWidth: 500, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <caption style={{ captionSide: 'bottom', padding: '12px 44px', fontSize: 12, color: C.ink3, textAlign: 'left' }}>
                          Projected salary assuming a flat {Math.max(0, actualHikePct).toFixed(1)}% hike every year for {projectionYears} years. A real career rarely has the exact same hike every year; use this as a rough compounding illustration, not a forecast.
                        </caption>
                        <thead>
                          <tr style={{ background: '#f4f5f6' }}>
                            {['Year', 'Projected Salary', 'Increase from Today', 'Growth from Today'].map(h => (
                              <th key={h} style={{ padding: '10px 14px', textAlign: h === 'Year' ? 'left' : 'right', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }} scope="col">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {growthSchedule.map((row, i) => (
                            <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                              <td style={{ padding: '11px 14px', fontWeight: 700, color: C.dark }}>Year {row.year}</td>
                              <td style={{ padding: '11px 14px', textAlign: 'right', color: C.ink }}>{fmtIN(row.salary)}</td>
                              <td style={{ padding: '11px 14px', textAlign: 'right', color: '#166534', fontWeight: 600 }}>+{fmtIN(row.cumulativeIncrease)}</td>
                              <td style={{ padding: '11px 14px', textAlign: 'right', color: C.ink2 }}>+{row.pctGrowth.toFixed(1)}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {showAdvanced && (
                <div style={{ borderTop: `1px solid ${C.border}`, padding: mobile ? '16px 18px' : '24px 44px', background: '#FDFBFA' }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: C.ink, marginBottom: 16 }}>Reality Check: Real Growth &amp; Taxes</h3>

                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div style={{ background: C.white, padding: 16, borderRadius: 8, border: `1px solid ${C.border}` }}>
                      <p style={{ fontSize: 12, color: C.ink3, margin: '0 0 4px' }}>Real Salary Growth (Inflation Adj.)</p>
                      <div style={{ fontSize: 20, fontWeight: 700, color: C.dark }}>
                        {realGrowthPct > 0 ? '+' : ''}{realGrowthPct.toFixed(1)}%
                      </div>
                      <p style={{ fontSize: 12, color: C.ink2, margin: '8px 0 0', lineHeight: 1.5 }}>
                        A {actualHikePct.toFixed(1)}% hike with {inflation}% inflation leaves your purchasing power roughly {realGrowthPct >= 0 ? 'up' : 'down'} {Math.abs(realGrowthPct).toFixed(1)}%. This is an approximation (nominal hike minus inflation), not an exact inflation-linked calculation.
                      </p>
                    </div>

                    <div style={{ background: C.white, padding: 16, borderRadius: 8, border: `1px solid ${C.border}` }}>
                      <p style={{ fontSize: 12, color: C.ink3, margin: '0 0 4px' }}>Est. Net In-Hand Hike</p>
                      <div style={{ fontSize: 20, fontWeight: 700, color: C.dark }}>
                        {netInHandIncreaseMonthly >= 0 ? '+' : ''}{fmtIN(netInHandIncreaseMonthly)} <span style={{ fontSize: 13, fontWeight: 500, color: C.ink3 }}>/ mo</span>
                      </div>
                      <p style={{ fontSize: 12, color: C.ink2, margin: '8px 0 0', lineHeight: 1.5 }}>
                        After an estimated {taxBracket}% tax on the incremental amount, your actual take-home increase is likely lower than the gross increase of {fmtIN(monthlyIncrease)}.
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link href="/calculators/ctc-calculator" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: C.dark, fontWeight: 600, textDecoration: 'underline' }}>Calculate exact in-hand salary with the CTC Calculator</Link>
                  </div>
                </div>
              )}
            </section>

            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>
              <div style={sec}>
                <h2 style={h2} id="what-is-salary-hike">What Is a Salary Hike?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    A salary hike is the percentage or fixed amount by which your compensation increases during an appraisal, promotion, or job change. It is the primary metric used to measure career financial growth year over year.
                  </p>
                </div>
                <p style={p}>
                  A gross hike and a net in-hand hike are not the same thing. A 15% hike on your CTC might translate to only a 10% increase in your net take-home pay if it pushes you into a higher tax bracket, or if a large share of the hike is loaded into variable pay rather than fixed salary.
                </p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>CTC Calculator</p>
                    <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Break your new CTC into basic, HRA, PF, and gratuity to see the actual salary structure behind the hike.</p>
                  </div>
                  <Link className="fx-btn" href="/calculators/ctc-calculator" target="_blank" rel="noopener noreferrer"
                    style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="when-to-use">When to Use This Calculator</h2>
                <p style={p}>A salary hike calculation comes up at a handful of specific moments, and the right mode above depends on which one you are in.</p>
                {[
                  ['Appraisal season:', 'HR announces a hike percentage. Use "By % Hike" to see your exact new salary and monthly increase before it shows up on a payslip.'],
                  ['Comparing a new job offer:', 'You have your current CTC and a new offer letter. Use "By New Salary" to see the real hike percentage behind the offer, not just the headline CTC number.'],
                  ['Negotiating before you accept:', 'Run a few "what if" percentages in "By % Hike" mode to know what counter-offer to ask for before you reply to HR or a recruiter.'],
                  ['Planning your finances after a raise:', 'Once your new salary is confirmed, use "By Fixed Amount" with your exact revised CTC to update your monthly budget and see the real, inflation-adjusted growth in the Reality Check section.'],
                  ['Projecting your career trajectory:', 'Open the Salary Growth Projection section to see where a similar annual hike would take your salary over the next 5 to 20 years.'],
                ].map(([title, text]) => (
                  <div key={title} style={{ marginBottom: 14 }}>
                    <strong style={{ fontSize: 15, color: C.ink }}>{title}</strong>{' '}
                    <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                  </div>
                ))}
              </div>

              <div style={sec}>
                <h2 style={h2} id="salary-hike-formula">Salary Hike Formula: New Salary and Hike Percentage</h2>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 13.5, color: C.dark, lineHeight: 1.8, display: 'block' }}>
                    New Salary = Current Salary &times; (1 + Hike % / 100)<br />
                    Hike % = [(New Salary minus Current Salary) / Current Salary] &times; 100
                  </code>
                </div>
                <p style={p}>
                  <strong>Example (forward):</strong> current salary Rs 6,00,000, hike 15%. New salary = 6,00,000 &times; 1.15 = Rs 6,90,000. Annual increase = Rs 90,000, or Rs 7,500 a month before tax and PF changes.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  <strong>Example (reverse):</strong> current salary Rs 5,00,000, new offer Rs 6,50,000. Hike % = [(6,50,000 minus 5,00,000) / 5,00,000] &times; 100 = 30%. Switch to the &quot;By New Salary&quot; mode above to run this calculation on your own numbers.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="partial-year-hike">Partial-Year and Mid-Cycle Hikes: How to Calculate Correctly</h2>
                <p style={p}>
                  A hike that takes effect partway through the financial year does not simply multiply your old annual salary by the new percentage. Your actual gross income for that year is a blend of the old and new monthly figures.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Worked example: Rs 6,00,000 salary, a 15% hike effective October 1, six months at each rate.</caption>
                    <thead><tr><th style={thS} scope="col">Period</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Monthly Salary</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">6-Month Total</th></tr></thead>
                    <tbody>
                      <tr style={{ background: C.white }}>
                        <td style={{ ...tdL, textAlign: 'left' }}>April to September (old salary)</td>
                        <td style={tdR}>{fmtIN(50000)}</td>
                        <td style={tdR}>{fmtIN(300000)}</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={{ ...tdL, textAlign: 'left' }}>October to March (new salary, +15%)</td>
                        <td style={tdR}>{fmtIN(57500)}</td>
                        <td style={tdR}>{fmtIN(345000)}</td>
                      </tr>
                      <tr style={{ background: C.white }}>
                        <td style={{ ...tdL, fontWeight: 700, color: C.dark, textAlign: 'left' }}>Actual gross for the year</td>
                        <td style={{ ...tdR }}>-</td>
                        <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>{fmtIN(645000)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  The actual gross for the year, Rs 6,45,000, is Rs 45,000 less than the naive shortcut of just multiplying the old annual salary by 1.15 (which gives Rs 6,90,000). That naive figure is what your salary looks like on an annualized, ongoing basis from the hike date onward, useful for comparing offers, but it is not what shows up on that specific year&apos;s Form 16. Use the calculator above to compute the new monthly and annual rate, then blend it with the old rate manually for the partial year it actually applies.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="salary-hike-excel">Salary Hike Formula in Excel</h2>
                <p style={p}>
                  All three common ways to do this in a spreadsheet give the same answer. Pick whichever matches the layout of your salary sheet.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Three ways to calculate salary hike in Excel or Google Sheets, assuming current salary is in cell A2 and hike percentage in B2.</caption>
                    <thead><tr><th style={thS} scope="col">Method</th><th style={thS} scope="col">Formula</th><th style={thS} scope="col">Use When</th></tr></thead>
                    <tbody>
                      {[
                        ['New salary from hike %', '=A2*(1+B2/100)', 'You know the current salary and the hike percentage.'],
                        ['Hike % from old and new salary', '=(C2-A2)/A2*100', 'You know both salaries and want the exact percentage (new salary in C2).'],
                        ['Annual increase amount', '=A2*B2/100', 'You just need the rupee amount of the raise, not the new total.'],
                      ].map((r, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink, textAlign: 'left' }}>{r[0]}</td>
                          <td style={{ ...tdL, textAlign: 'left', fontFamily: 'monospace' }}>{r[1]}</td>
                          <td style={{ ...tdL, textAlign: 'left' }}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  Format the hike-percentage cell as a plain number (10, not 10%) unless your formula already divides by 100, since mixing a percentage-formatted cell with a raw divide-by-100 formula is a common source of a 100x error in salary sheets.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="hike-impact-breakdown">How a Salary Hike Actually Reaches Your Bank Account</h2>
                <p style={p}>
                  A hike announced on CTC is not the amount that lands in your account every month. Employer PF and gratuity provisioning absorb part of the increase before it becomes a payslip number, and your own PF deduction and tax take a further share of what is left.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>
                      Illustrative example: a Rs 1,20,000 annual CTC increase, assuming Basic is 50% of CTC, employer PF and gratuity are provisioned at 12% and 4.81% of Basic, and a flat 20% tax on the incremental amount. Your own structure will differ; use More Settings above to match your own tax bracket.
                    </caption>
                    <thead><tr><th style={thS} scope="col">Step</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Amount</th></tr></thead>
                    <tbody>
                      <tr style={{ background: C.white }}>
                        <td style={{ ...tdL, textAlign: 'left' }}>Headline CTC increase</td>
                        <td style={{ ...tdR, fontWeight: 600 }}>{fmtIN(120000)}</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={{ ...tdL, textAlign: 'left' }}>Less: extra employer PF provisioning (12% of Basic increase)</td>
                        <td style={tdR}>-{fmtIN(7200)}</td>
                      </tr>
                      <tr style={{ background: C.white }}>
                        <td style={{ ...tdL, textAlign: 'left' }}>Less: extra gratuity provisioning (4.81% of Basic increase)</td>
                        <td style={tdR}>-{fmtIN(2886)}</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={{ ...tdL, textAlign: 'left', fontWeight: 700, color: C.dark }}>= Extra gross salary that reaches your payslip</td>
                        <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>{fmtIN(109914)}</td>
                      </tr>
                      <tr style={{ background: C.white }}>
                        <td style={{ ...tdL, textAlign: 'left' }}>Less: extra employee PF deduction (12% of Basic increase, still yours, just not in hand)</td>
                        <td style={tdR}>-{fmtIN(7200)}</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={{ ...tdL, textAlign: 'left' }}>Less: estimated tax on the incremental amount (20%)</td>
                        <td style={tdR}>-{fmtIN(20543)}</td>
                      </tr>
                      <tr style={{ background: C.white }}>
                        <td style={{ ...tdL, textAlign: 'left', fontWeight: 700, color: C.dark }}>= Net in-hand increase (about 68% of the headline CTC hike)</td>
                        <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>{fmtIN(82171)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  Your own PF contribution is not lost. It accumulates in your PF account and is still your money, just not available as monthly cash flow until withdrawal or retirement.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="epf-wage-ceiling-hike">Does a Hike Always Increase Your PF Contribution?</h2>
                <p style={p}>
                  Not necessarily, and this depends on a detail most employees never check: the statutory EPF wage ceiling of Rs 15,000 a month.
                </p>
                <p style={p}>
                  By law, mandatory 12% employer and employee PF contribution applies only up to Rs 15,000 of basic salary. Above that, an employer can choose to keep contributing 12% of your full, higher basic (the common practice at most mid-size and large companies), or cap it at 12% of Rs 15,000, or Rs 1,800 a month, regardless of how high your basic actually is.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  If your employer caps PF at the statutory ceiling and your basic salary was already above Rs 15,000 before the hike, a raise increases your gross and taxable salary as usual but does not increase your PF contribution at all, since it was already capped. If your employer contributes on full basic instead, PF rises in direct proportion to the hike, exactly as the breakdown above assumes. Check your payslip's actual employer PF line before and after a hike to see which policy your company follows.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="good-salary-hike">What Is a Good Salary Hike in India?</h2>
                <p style={p}>
                  What counts as a good hike depends heavily on context: staying in the same role, getting promoted, or switching companies each has a different typical range.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Commonly cited hike ranges by scenario in Indian corporate and IT roles. Actual figures vary by company, sector, and individual performance.</caption>
                    <thead><tr><th style={thS} scope="col">Scenario</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Typical Range</th></tr></thead>
                    <tbody>
                      {[
                        ['Cost-of-living adjustment only', '3-5%'],
                        ['Average annual appraisal, same role', '8-11%'],
                        ['Strong performer, annual appraisal', '12-18%'],
                        ['Internal promotion', '15-25%'],
                        ['Switching companies', '25-40%'],
                        ['Rare / exceptional (top performer, hot skill, or market correction)', '40%+'],
                      ].map((r, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, textAlign: 'left' }}>{r[0]}</td>
                          <td style={tdR}>{r[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  A hike below roughly 6-7% in a typical inflation year barely preserves your purchasing power. Anything below the prevailing inflation rate is a real pay cut even though the nominal number went up.
                </p>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Commonly cited hike ranges by career stage for an annual appraisal (not a job switch). Actual figures vary by company, sector, and individual performance.</caption>
                    <thead><tr><th style={thS} scope="col">Career Stage</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Typical Appraisal Hike</th></tr></thead>
                    <tbody>
                      {[
                        ['Fresher / 0-2 years experience', '10-15%'],
                        ['Mid-level / 3-7 years experience', '8-12%'],
                        ['Senior / 8-15 years experience', '6-10%'],
                        ['Leadership / 15+ years experience', '5-8%'],
                      ].map((r, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, textAlign: 'left' }}>{r[0]}</td>
                          <td style={tdR}>{r[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: '16px 0 0' }}>
                  Percentage hikes tend to shrink as base salary grows, since the same percentage represents a much larger rupee amount at a senior level. A 15% hike on a Rs 6 lakh fresher salary is Rs 90,000, while 6% on a Rs 40 lakh leadership salary is Rs 2,40,000, a far bigger absolute increase despite the smaller percentage.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-companies-decide">How Companies Decide Your Salary Hike</h2>
                <p style={p}>
                  Your hike percentage is rarely a single formula. It usually comes from a mix of factors that HR and your manager weigh together during the appraisal cycle.
                </p>
                {[
                  ['Performance rating:', 'Most companies map a performance rating (or a forced-ranking bucket) to a hike band. A top rating might unlock a 15-20% band while an average rating unlocks 6-10%, within the same appraisal cycle.'],
                  ['Compensation budget (the "hike pool"):', 'Finance sets an overall annual increment budget as a percentage of total payroll cost, often 8-10% company-wide. Managers then distribute that pool across their team, so one person\'s bigger hike can mean a smaller one for a teammate.'],
                  ['Market benchmarking (compa-ratio):', 'If your current salary sits below the market rate for your role and experience, a larger hike may be used to close that gap rather than as a reward for one year of performance.'],
                  ['Retention risk:', 'An employee seen as a flight risk, especially one with an in-demand skill, is more likely to receive an above-band hike or an off-cycle correction than someone considered less likely to leave.'],
                  ['Tenure and internal parity:', 'Companies also check internal parity: whether your hike keeps you reasonably in line with peers at the same level, so one very large jump does not create a visible pay gap on the same team.'],
                ].map(([title, text]) => (
                  <div key={title} style={{ marginBottom: 14 }}>
                    <strong style={{ fontSize: 15, color: C.ink }}>{title}</strong>{' '}
                    <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                  </div>
                ))}
              </div>

              <div style={sec}>
                <h2 style={h2} id="appraisal-cycles">Appraisal Cycles in India: When Companies Give Hikes</h2>
                <p style={p}>
                  Most Indian companies do not review salaries randomly through the year. The cycle your employer follows decides when to expect a hike letter and how far back the increase applies.
                </p>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Common appraisal cycle types followed by Indian employers.</caption>
                    <thead><tr><th style={thS} scope="col">Cycle Type</th><th style={thS} scope="col">Typical Timing</th><th style={thS} scope="col">Common In</th></tr></thead>
                    <tbody>
                      {[
                        ['Annual, financial year aligned', 'Reviewed around March-April, effective from April 1', 'Large Indian corporates, IT services, PSUs'],
                        ['Annual, calendar year aligned', 'Reviewed around December-January, effective from January 1', 'MNCs and global-parent companies following a global HR calendar'],
                        ['Half-yearly (H1/H2)', 'Reviewed around April and October', 'Some IT services firms and startups with faster performance cycles'],
                        ['Off-cycle / ad hoc', 'Any time during the year, outside the standard cycle', 'Promotions, retention counters, internal transfers, market corrections'],
                      ].map((r) => (
                        <tr key={r[0]} style={{ background: C.white }}>
                          <td style={{ ...tdL, fontWeight: 600, textAlign: 'left' }}>{r[0]}</td>
                          <td style={{ ...tdL, textAlign: 'left' }}>{r[1]}</td>
                          <td style={{ ...tdL, textAlign: 'left' }}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: '16px 0 0' }}>
                  A hike letter dated after your review month often carries arrears, a lump-sum back-payment covering the gap between the effective date and the date HR actually processes it in payroll.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="da-vs-private-hike">Dearness Allowance vs a Private-Sector Salary Hike</h2>
                <p style={p}>
                  Government and PSU employees see their pay rise through a different mechanism than a private-sector appraisal, and the two are easy to confuse.
                </p>
                {[
                  ['Dearness Allowance (DA):', 'A cost-of-living adjustment paid on top of Basic Pay to central and state government employees and pensioners, revised twice a year based on the All India Consumer Price Index for Industrial Workers (AICPI-IW). It is not a performance-linked hike, it moves with inflation data regardless of individual performance.'],
                  ['Private-sector appraisal hike:', 'A percentage increase to CTC decided once (or twice) a year based on a mix of performance rating, company budget, and market benchmarking, as covered above. It is not automatically linked to any inflation index.'],
                  ['Pay Commission revisions:', 'Central government Basic Pay itself is revised only periodically through a Pay Commission, roughly once a decade, unlike a private-sector employee\'s annual increment cycle.'],
                ].map(([title, text]) => (
                  <div key={title} style={{ marginBottom: 14 }}>
                    <strong style={{ fontSize: 15, color: C.ink }}>{title}</strong>{' '}
                    <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                  </div>
                ))}
                <p style={{ ...p, margin: 0 }}>
                  This calculator is built for a private-sector CTC-style hike. If you are estimating a DA revision, apply the announced DA percentage directly to your Basic Pay rather than to your full CTC.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="inflation-growth">Inflation and Real Salary Growth</h2>
                <p style={p}>
                  If your salary increases by 8% but inflation runs at 6%, your real salary growth is only about 2%, meaning your actual purchasing power has barely moved. If your hike is lower than inflation, you are effectively taking a pay cut in real terms, even though your bank balance shows a bigger number.
                </p>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Approximate real salary growth at common hike and inflation combinations (nominal hike minus inflation).</caption>
                    <thead><tr><th style={thS} scope="col">Nominal Hike</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">At 5% Inflation</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">At 7% Inflation</th></tr></thead>
                    <tbody>
                      {[6, 8, 10, 15, 20, 30].map((h, i) => (
                        <tr key={h} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600 }}>{h}%</td>
                          <td style={tdR}>{(h - 5) > 0 ? '+' : ''}{(h - 5).toFixed(0)}%</td>
                          <td style={tdR}>{(h - 7) > 0 ? '+' : ''}{(h - 7).toFixed(0)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  Use the <Link href="/calculators/inflation-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Inflation Calculator</Link> to check the actual current inflation rate rather than assuming a flat 6%, and the <Link href="/calculators/real-return-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Real Return Calculator</Link> for the same inflation-adjustment logic applied to investment returns.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="switch-vs-stay">Job Switch vs Staying: A Multi-Year Comparison</h2>
                <p style={p}>
                  A job switch usually front-loads a bigger one-time jump, while staying put means smaller but more frequent increases. Which one leaves you ahead depends on how many years you look at.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>
                      Illustrative comparison starting from Rs 10,00,000. &quot;Stay&quot; assumes a flat 10% annual appraisal hike every year. &quot;Switch&quot; assumes a one-time 30% jump when changing companies, followed by a more typical 8% annual hike at the new company. Real outcomes vary by role, company, and market conditions.
                    </caption>
                    <thead><tr><th style={thS} scope="col">Year</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Stay (10%/yr)</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Switch (30% then 8%/yr)</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Switch Advantage</th></tr></thead>
                    <tbody>
                      {[
                        [1, 1100000, 1300000],
                        [2, 1210000, 1404000],
                        [3, 1331000, 1516320],
                        [4, 1464100, 1637626],
                        [5, 1610510, 1768636],
                      ].map(([yr, stay, sw], i) => (
                        <tr key={yr} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600 }}>Year {yr}</td>
                          <td style={tdR}>{fmtIN(stay)}</td>
                          <td style={tdR}>{fmtIN(sw)}</td>
                          <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>+{fmtIN(sw - stay)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  The switch path stays ahead in absolute rupees through year 5 in this example, but the gap narrows every year (from Rs 2,00,000 in year 1 to Rs 1,58,126 by year 5) because 10% compounding on a growing base eventually catches up to a bigger but slower-growing number. Run your own numbers in the calculator above under &quot;By New Salary&quot; for a switch offer, then open Salary Growth Projection to see how a stay path compounds over more years.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="common-mistakes">Common Mistakes When Calculating a Salary Hike</h2>
                {[
                  ['Comparing hike percentage on different bases:', 'A 20% hike on CTC and a 20% hike on fixed pay are different numbers if the CTC includes variable pay. Always confirm whether a quoted percentage applies to CTC, fixed pay, or basic salary before comparing two offers.'],
                  ['Ignoring the one-time joining bonus:', 'Adding a signing bonus into the first year\'s CTC inflates the apparent hike percentage. Strip it out and calculate the hike on recurring pay only for an honest year-over-year comparison.'],
                  ['Treating gross hike as net hike:', 'A higher CTC increases employer PF and gratuity provisioning too, which never reach your bank account. The in-hand increase is almost always a smaller percentage than the CTC increase.'],
                  ['Forgetting tax slab movement:', 'A large hike can push part of your income into a higher slab. The extra tax on just that slice is easy to miss if you only look at the average tax rate on your old salary.'],
                  ['Assuming last year\'s hike percentage repeats indefinitely:', 'Appraisal budgets and market benchmarks change every year. The Salary Growth Projection above is a compounding illustration for planning, not a guarantee that the same percentage will repeat.'],
                ].map(([title, text]) => (
                  <div key={title} style={{ marginBottom: 14 }}>
                    <strong style={{ fontSize: 15, color: C.ink }}>{title}</strong>{' '}
                    <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                  </div>
                ))}
              </div>

              <div style={sec}>
                <h2 style={h2} id="reading-increment-letter">How to Read Your Increment or Offer Letter</h2>
                <p style={p}>
                  The headline hike percentage on the first page is the easiest number to misread. Check these details before comparing it to your current salary or accepting an offer.
                </p>
                {[
                  ['Effective date, not letter date:', 'The hike often applies from a date earlier than the letter itself, which is when arrears (see above) come in. Confirm the effective date before calculating your first revised payslip.'],
                  ['Fixed vs variable split:', 'A letter can show one CTC number that includes a variable or bonus component. Find the fixed pay line separately, since that is what actually changes your guaranteed monthly cash flow.'],
                  ['Revised component breakup:', 'Basic, HRA, and other allowances are usually restructured, not just scaled up proportionally. Check the new Basic figure directly, since PF and gratuity are calculated on it.'],
                  ['Any bond or notice period change:', 'Some hike or promotion letters add a service bond or extend your notice period. This does not affect the calculator above but affects your flexibility to switch jobs soon after.'],
                  ['ESOPs or deferred components:', 'A grant of stock options is sometimes bundled into the hike narrative but is not guaranteed cash and vests over years. Keep it out of your fixed-pay hike percentage calculation.'],
                ].map(([title, text]) => (
                  <div key={title} style={{ marginBottom: 14 }}>
                    <strong style={{ fontSize: 15, color: C.ink }}>{title}</strong>{' '}
                    <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                  </div>
                ))}
              </div>

              <div style={sec}>
                <h2 style={h2} id="salary-negotiation">Tips for Negotiating a Salary Hike</h2>
                {[
                  ['Anchor on fixed pay, not total CTC:', 'A headline CTC number can be inflated with variable bonus, RSUs, or a one-time joining bonus. Ask for the exact fixed pay figure before comparing offers or appraisal numbers.'],
                  ['Research the market rate for your role:', 'Use salary benchmarks for your specific role, experience level, and city rather than a generic industry-wide average before entering a negotiation.'],
                  ['Time the conversation well:', 'Annual review cycles, right after a major project delivery, or when taking on new responsibilities are the strongest moments to ask.'],
                  ['Quantify your contribution:', 'Bring specific numbers: revenue influenced, cost saved, or scope of ownership. A documented case is harder to negotiate down than a general request.'],
                ].map(([title, text]) => (
                  <div key={title} style={{ marginBottom: 14 }}>
                    <strong style={{ fontSize: 15, color: C.ink }}>{title}</strong>{' '}
                    <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                  </div>
                ))}
                <p style={{ ...p, margin: 0 }}>
                  Once you have a number to compare, run it through the <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Old vs New Tax Regime Calculator</Link> to see which regime keeps more of the increase, since a bigger hike can shift which regime wins for you.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="compa-ratio-example">Using Compa-Ratio to Argue for a Bigger Hike: A Worked Example</h2>
                <p style={p}>
                  Compa-ratio compares your current salary to the market midpoint for your role, and it turns a vague "I think I&apos;m underpaid" into a specific number HR can act on.
                </p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 13.5, color: C.dark, lineHeight: 1.8, display: 'block' }}>
                    Compa-Ratio = Current Salary / Market Midpoint for Your Role
                  </code>
                </div>
                <p style={p}>
                  <strong>Example:</strong> your current salary is Rs 8,00,000. Independent salary benchmarking data puts the market midpoint for your exact role, experience level, and city at Rs 10,00,000. Compa-ratio = 8,00,000 / 10,00,000 = 0.80, meaning you are paid at 80% of the market rate for your role.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Target</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">New Salary</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Hike Needed</th></tr></thead>
                    <tbody>
                      <tr style={{ background: C.white }}>
                        <td style={{ ...tdL, textAlign: 'left' }}>Close the gap to 90% of market</td>
                        <td style={tdR}>{fmtIN(900000)}</td>
                        <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>12.5%</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={{ ...tdL, textAlign: 'left' }}>Close the gap to 100% of market</td>
                        <td style={tdR}>{fmtIN(1000000)}</td>
                        <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>25.0%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  A compa-ratio below roughly 0.85 to 0.90 is the range where a market-correction argument tends to land well with HR, since it frames the ask as closing a measurable gap rather than an open-ended request. Enter either target salary above in &quot;By New Salary&quot; mode to get the exact hike percentage to ask for.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="raise-ask-script">How to Ask for a Raise: A Sample Script</h2>
                <p style={p}>
                  Having the right number from the calculator above is only half the conversation. How you frame the ask matters almost as much as the figure itself.
                </p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 16 }}>
                  <p style={{ fontSize: 14, color: C.ink2, lineHeight: 1.8, margin: 0, fontStyle: 'italic' }}>
                    &quot;Over the past [period], I&apos;ve [specific contribution: led X project, grew Y metric by Z%, taken on additional scope]. Based on my research into market rates for this role at my experience level, and my current compa-ratio of [X], I&apos;d like to discuss bringing my compensation to [target salary or hike %]. Can we find a time to go through this in detail?&quot;
                  </p>
                </div>
                {[
                  ['Lead with contribution, not tenure:', '"I\'ve been here three years" is weaker than a specific, quantified achievement. Time served is not the same as value delivered.'],
                  ['State a number, don\'t just hint:', 'Asking "do you think there\'s room for a raise" invites a vague answer. Naming a specific target salary or percentage, backed by the calculator and compa-ratio work above, moves the conversation faster.'],
                  ['Send it in writing first when possible:', 'A short email or message ahead of the actual conversation gives your manager time to prepare a real answer instead of reacting on the spot.'],
                  ['Have a fallback ready:', 'If the full number is not approved immediately, ask about a shorter review cycle, a defined path to the target over two quarters, or a one-time bonus as an interim step.'],
                ].map(([title, text]) => (
                  <div key={title} style={{ marginBottom: 14 }}>
                    <strong style={{ fontSize: 15, color: C.ink }}>{title}</strong>{' '}
                    <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                  </div>
                ))}
              </div>

              <div style={sec}>
                <h2 style={h2} id="calculator-limitations">Limitations of This Calculator</h2>
                {[
                  ['It does not model variable pay restructuring:', 'If a hike is delivered partly as a higher bonus target rather than fixed salary, this calculator treats the full amount as a guaranteed increase. Check your actual fixed-pay change separately if variable pay is involved.'],
                  ['Tax and PF figures in the Reality Check are estimates:', 'The net in-hand hike uses a single flat tax bracket you enter, not your actual slab-by-slab tax calculation. Use the CTC Calculator or Income Tax Calculator for an exact TDS figure on your new salary.'],
                  ['Real growth is an approximation, not an exact inflation-linked calculation:', 'Subtracting the inflation rate from your nominal hike is a widely used shorthand, but it is not the same as a compounding, CPI-linked purchasing-power calculation. Treat the Real Growth figure as directional.'],
                  ['The Salary Growth Projection assumes a constant repeat rate:', 'Real annual hikes vary year to year with company performance, market conditions, and your own career moves. The projection is a compounding illustration for planning, not a forecast of your actual future salary.'],
                ].map(([title, text]) => (
                  <div key={title} style={{ marginBottom: 14 }}>
                    <strong style={{ fontSize: 15, color: C.ink }}>{title}</strong>{' '}
                    <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                  </div>
                ))}
              </div>

              <div style={sec}>
                <h2 style={h2} id="key-takeaways">Key Takeaways</h2>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>A headline CTC hike and your actual net in-hand increase are different numbers. Roughly two-thirds of a typical CTC hike reaches your bank account monthly, the rest goes into employer PF, gratuity, your own PF, and tax.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>Below roughly 6-7% in a normal inflation year, a hike barely preserves purchasing power. Compare your hike to the current inflation rate, not just to zero, before calling it a real increase.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>A mid-year hike does not fully show up in that financial year's gross income. The full annualized rate only applies from the next full cycle onward, so budget off the actual blended figure, not the naive multiplication.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>A specific number, backed by a compa-ratio or market benchmark, moves a negotiation further than a general request. The calculator above and the compa-ratio worked example give you that number before you ask.</li>
                </ul>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-calculate">How to Use This Salary Hike Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter your Current Annual Salary:</strong> input your current annual CTC or gross salary.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Pick a calculation mode:</strong> use &quot;By % Hike&quot; or &quot;By Fixed Amount&quot; to find your new salary, or &quot;By New Salary&quot; to work out the exact hike percentage from an offer or appraisal letter.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Open More Settings:</strong> add an inflation rate, a rough tax bracket, and how many years to project for the Reality Check and Salary Growth Projection sections.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Review the results:</strong> check the new annual salary, the donut split of original salary versus hike, and the inflation-adjusted real growth.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Open Salary Growth Projection:</strong> see a year-by-year chart and table of where your salary lands if the same hike percentage repeats every year.
                  </li>
                </ol>
              </div>

              <div style={sec}>
                <h2 style={h2} id="salary-hike-matrix">Salary Hike Examples by CTC Level</h2>
                <p style={p}>
                  Quick reference for the new annual salary at common current-salary levels across typical hike percentages.
                </p>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', padding: '12px 0', fontSize: 12, color: C.ink3, textAlign: 'left' }}>
                      Table: new annual salary at common current-salary levels across five hike percentages.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Current Salary</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>+ 8% Hike</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>+ 15% Hike</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>+ 20% Hike</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>+ 30% Hike</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[300000, 500000, 800000, 1000000, 1500000, 2000000].map((c, i) => (
                        <tr key={c} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600 }}>{fmtC(c)}</td>
                          <td style={tdR}>{fmtC(c * 1.08)}</td>
                          <td style={tdR}>{fmtC(c * 1.15)}</td>
                          <td style={{ ...tdR, fontWeight: 600, color: C.dark }}>{fmtC(c * 1.20)}</td>
                          <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>{fmtC(c * 1.30)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="salary-hike-glossary">Salary Hike Glossary: Key Terms Explained</h2>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Term</th><th style={thS} scope="col">Meaning</th></tr></thead>
                    <tbody>
                      {[
                        ['CTC (Cost to Company)', 'The total annual cost an employer bears for an employee, including fixed pay, variable pay, employer PF, gratuity provisioning, and other benefits.'],
                        ['Fixed Pay', 'The guaranteed portion of CTC paid every month, excluding bonus, variable pay, or one-time components.'],
                        ['Basic Salary', 'The core, non-allowance component of salary that HRA, PF, and gratuity are typically calculated as a percentage of.'],
                        ['Variable Pay', 'A performance-linked bonus component that is part of CTC but not guaranteed, often paid quarterly or annually against targets.'],
                        ['Net / In-Hand Salary', 'The amount actually credited to your bank account after PF, tax, and other deductions are subtracted from gross salary.'],
                        ['Increment', 'A routine, usually annual, increase in salary within the same role, distinct from a promotion.'],
                        ['Arrears', 'A lump-sum back-payment covering the gap between a hike\'s effective date and the date it is actually processed in payroll.'],
                        ['Compa-ratio', 'Your current salary divided by the market midpoint salary for your role and experience level, used by some companies to guide hike size.'],
                        ['Dearness Allowance (DA)', 'A cost-of-living adjustment on Basic Pay for government and PSU employees, revised twice a year against an inflation index.'],
                      ].map((r) => (
                        <tr key={r[0]} style={{ background: C.white }}>
                          <td style={{ ...tdL, fontWeight: 600, textAlign: 'left', whiteSpace: 'nowrap' }}>{r[0]}</td>
                          <td style={{ ...tdL, textAlign: 'left' }}>{r[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              

              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All calculations on this page are indicative only. The Salary Hike Calculator estimates your revised gross salary, monthly increase, and an approximate inflation-adjusted real growth figure. Your actual net take-home pay depends on tax slabs, provident fund contributions, and how your employer restructures your salary components. This tool is for educational and planning purposes only and does not constitute financial or tax advice. Consult a qualified professional before making financial decisions.
                </p>
              </div>
            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.salary-hike-sidebar::-webkit-scrollbar{width:5px}.salary-hike-sidebar::-webkit-scrollbar-track{background:transparent}.salary-hike-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.salary-hike-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="salary-hike-sidebar" aria-label="Related calculators" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER, background: C.white }}>
                <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Quick Facts</span>
                </div>
                <div style={{ padding: '4px 16px' }}>
                  {[
                    ['Average annual appraisal hike', '8-11%'],
                    ['Promotion hike', '15-25%'],
                    ['Job-switch hike', '25-40%'],
                    ['Rule of 72 (years to double)', '72 / hike %'],
                    ...(yearsToDouble ? [['Your salary doubles in', `~${yearsToDouble.toFixed(1)} yrs`]] : []),
                  ].map(([label, val], i, arr) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, padding: '9px 0', borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                      <span style={{ fontSize: 12.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: C.dark, textAlign: 'right' }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
              <SidebarList title="Popular Calculators" items={POPULAR} />
              <SidebarList title="More Calculators" items={MORE} />
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/ctc-calculator|CTC Calculator', '/calculators/in-hand-salary-calculator|In-Hand Salary', '/calculators/hra-calculator|HRA', '/calculators/gratuity-calculator|Gratuity', '/calculators/income-tax-calculator|Income Tax', '/calculators/sip-calculator|SIP', '/calculators/emi-calculator|EMI', '/calculators/fd-calculator|FD', '/calculators/ppf-calculator|PPF'] },
        { hd: 'Topics', links: ['/calculators/sip-calculator|Mutual Funds', '/calculators/home-loan-calculator|Home Loans', '/calculators/fd-calculator|Fixed Deposits', '/calculators/retirement-calculator|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

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
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
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

function MonthPresets({ current, onChange }: { current: number; onChange: (v: number) => void }) {
  const presets = [3, 6, 9, 12];
  return (
    <div role="group" aria-label="Coverage period presets" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: -22, marginBottom: 20 }}>
      {presets.map(m => {
        const active = current === m;
        return (
          <button key={m} onClick={() => onChange(m)} aria-pressed={active}
            style={{ fontSize: 11.5, fontWeight: active ? 700 : 500, color: active ? C.white : C.ink3, background: active ? C.dark : 'transparent', border: `1px solid ${active ? C.dark : C.border}`, borderRadius: 99, padding: '3px 9px', cursor: 'pointer', fontFamily: INTER, transition: 'all 0.12s' }}>
            {m}M
          </button>
        );
      })}
    </div>
  );
}

function DonutChart({ saved, total }: { saved: number; total: number }) {
  if (total === 0) return null;
  const savedPct = Math.min(100, Math.round((saved / total) * 100));
  const gapPct = 100 - savedPct;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const sArc = Math.min(1, saved / total) * circ;
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Saved ${savedPct}% of target, gap ${gapPct}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${sArc} ${circ - sArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Saved</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{savedPct}%</text>
    </svg>
  );
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
  { href: '/calculators/retirement-corpus-calculator', label: 'Retirement Corpus Calculator' },
  { href: '/calculators/net-worth-calculator',            label: 'Net Worth Calculator' },
  { href: '/calculators/goal-planning-calculator',       label: 'Goal Planning Calculator' },
  { href: '/calculators/in-hand-salary-calculator',      label: 'In-Hand Salary Calculator' },
  { href: '/calculators/sip-calculator',                 label: 'SIP Calculator' },
  { href: '/calculators/inflation-calculator',           label: 'Inflation Calculator' },
  { href: '/calculators/retirement-calculator',           label: 'Retirement Calculator' },
];
const MORE = [
  { href: '/calculators/emi-calculator',                 label: 'EMI Calculator' },
  { href: '/calculators/percentage-calculator',          label: 'Percentage Calculator' },
  { href: '/calculators/gratuity-calculator',            label: 'Gratuity Calculator' },
  { href: '/calculators/future-value-calculator',        label: 'Future Value Calculator' },
  { href: '/calculators/present-value-calculator',       label: 'Present Value Calculator' },
];

function FAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  return <FAQBox items={faqs} />;
}

export default function EmergencyFundCalculatorClient({ faqs }: { faqs: { q: string; a: string }[] }) {
  const defaultSettings = {
    monthlyExpense: 50000,
    currentSavings: 100000,
    months: 6,
    numEarners: 1,
    jobSearchMonths: 6,
    monthlyContribution: 5000,
  };
  const { settings, updateSettings } = useCalculatorSettings('emergency-fund-calculator', defaultSettings);
  const { monthlyExpense, currentSavings, months, numEarners, jobSearchMonths, monthlyContribution } = settings;
  const setMonthlyExpense = (v: any) => updateSettings({ monthlyExpense: typeof v === 'function' ? v(settings.monthlyExpense) : v });
  const setCurrentSavings = (v: any) => updateSettings({ currentSavings: typeof v === 'function' ? v(settings.currentSavings) : v });
  const setMonths = (v: any) => updateSettings({ months: typeof v === 'function' ? v(settings.months) : v });
  const setNumEarners = (v: any) => updateSettings({ numEarners: typeof v === 'function' ? v(settings.numEarners) : v });
  const setJobSearchMonths = (v: any) => updateSettings({ jobSearchMonths: typeof v === 'function' ? v(settings.jobSearchMonths) : v });
  const setMonthlyContribution = (v: any) => updateSettings({ monthlyContribution: typeof v === 'function' ? v(settings.monthlyContribution) : v });
  const [mobile, setMobile] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const targetFund = useMemo(() => monthlyExpense * months, [monthlyExpense, months]);
  const gap = useMemo(() => Math.max(0, targetFund - currentSavings), [targetFund, currentSavings]);
  const surplus = useMemo(() => Math.max(0, currentSavings - targetFund), [targetFund, currentSavings]);
  const savedPct = useMemo(() => targetFund > 0 ? Math.min(100, Math.round((currentSavings / targetFund) * 100)) : 0, [currentSavings, targetFund]);

  const recommendedMonths = useMemo(() => {
    if (numEarners <= 1 && jobSearchMonths >= 6) return 12;
    if (numEarners <= 1 && jobSearchMonths < 6) return 9;
    if (numEarners > 1 && jobSearchMonths >= 6) return 6;
    return 3;
  }, [numEarners, jobSearchMonths]);

  /* Savings account rate used for the month-by-month progress table. Fixed at 6% p.a.,
     a conservative representative rate for a high-interest savings account or sweep-in FD. */
  const SAVINGS_RATE = 6;
  const monthlyRows = useMemo(() => {
    if (gap <= 0 || monthlyContribution <= 0) return [];
    const rows: { month: number; opening: number; contribution: number; interest: number; closing: number }[] = [];
    const monthlyRate = SAVINGS_RATE / 100 / 12;
    let balance = currentSavings;
    for (let i = 1; i <= 60 && balance < targetFund; i++) {
      const opening = balance;
      balance += monthlyContribution;
      const interest = balance * monthlyRate;
      balance += interest;
      rows.push({ month: i, opening: Math.round(opening), contribution: monthlyContribution, interest: Math.round(interest), closing: Math.round(balance) });
    }
    return rows;
  }, [gap, currentSavings, monthlyContribution, targetFund]);

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const h3  = { fontSize: 15.5, fontWeight: 600, color: C.ink, margin: '0 0 6px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } as React.CSSProperties;
  const mono = { fontFamily: 'monospace', background: '#f4f5f6', padding: '2px 7px', borderRadius: 4, fontSize: 13.5, color: C.dark } as React.CSSProperties;

  const fmtExpense = (v: number) => fmtC(v);
  const fmtSavings = (v: number) => fmtC(v);
  const fmtMonths = (v: number) => `${v} Mo`;
  const fmtEarners = (v: number) => `${v}`;
  const fmtJobSearch = (v: number) => `${v} Mo`;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Emergency Fund Calculator
          </h1>
          <p style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate your emergency fund target based on monthly expenses, current savings, and coverage period
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            <section aria-label="Emergency Fund Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Your Expenses</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider label="Monthly Essential Expenses" id="ef-exp" value={monthlyExpense} min={5000} max={500000} step={1000} fmt={fmtExpense} onChange={setMonthlyExpense} compact={mobile} />
                      <Slider label="Current Emergency Savings" id="ef-sav" value={currentSavings} min={0} max={5000000} step={1000} fmt={fmtSavings} onChange={setCurrentSavings} compact={mobile} />
                      <Slider label="Desired Months of Coverage" id="ef-months" value={months} min={1} max={24} step={1} fmt={v => `${v} Mo`} onChange={setMonths} compact={mobile} />
                      <MonthPresets current={months} onChange={setMonths} />
                      <Slider label="Number of Income Earners" id="ef-earn" value={numEarners} min={1} max={5} step={1} fmt={fmtEarners} onChange={setNumEarners} compact={mobile} />
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
                        <button onClick={() => setShowAdvanced(true)} style={{ background: 'none', border: 'none', color: C.dark, fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: INTER }}>
                          More settings
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.dark} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Slider label="Months to Find New Job" id="ef-job" value={jobSearchMonths} min={1} max={12} step={1} fmt={fmtJobSearch} onChange={setJobSearchMonths} compact={mobile} />
                      <Slider label="Monthly Contribution to Fund" id="ef-contrib" value={monthlyContribution} min={500} max={100000} step={500} fmt={fmtC} onChange={setMonthlyContribution} compact={mobile} />
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 7, padding: '12px 16px', marginBottom: 24 }}>
                        <p style={{ fontSize: 12.5, color: C.ink3, margin: 0, lineHeight: 1.6 }}>
                          Based on <strong style={{ color: C.ink }}>{numEarners === 1 ? '1 earner' : `${numEarners} earners`}</strong> and <strong style={{ color: C.ink }}>{jobSearchMonths} months</strong> estimated job search, we recommend a <strong style={{ color: C.ink }}>{recommendedMonths}-month</strong> emergency fund.
                        </p>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 20 }}>
                        <button onClick={() => setShowAdvanced(false)} style={{ background: 'none', border: 'none', color: C.ink3, fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: INTER }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                          Back
                        </button>
                      </div>
                    </>
                  )}
                </div>

                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Target Emergency Fund</span>
                    <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                      aria-live="polite" aria-label={`Target emergency fund: ${fmtIN(targetFund)}`}>
                      {fmtIN(targetFund)}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    <DonutChart saved={currentSavings} total={targetFund} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Saved {savedPct}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Gap {100 - savedPct}%</span>
                    </div>
                  </div>

                  {[
                    { label: 'Monthly expenses', value: fmtIN(monthlyExpense) },
                    { label: 'Coverage period', value: `${months} Mo` },
                    { label: 'Current savings', value: fmtIN(currentSavings) },
                    ...(gap > 0
                      ? [{ label: 'Additional savings needed', value: fmtIN(gap) }]
                      : [{ label: 'Surplus (above target)', value: fmtIN(surplus) }]),
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Saved {savedPct}%</span>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Gap {100 - savedPct}%</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`${savedPct}% of emergency fund target saved`}>
                      <div style={{ height: '100%', width: `${savedPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>

                  <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 7, padding: '12px 16px', marginTop: 12, width: '100%' }}>
                    <p style={{ fontSize: 12.5, color: C.ink3, margin: 0, lineHeight: 1.6 }}>
                      Recommended: <strong style={{ color: C.dark }}>{recommendedMonths}-month</strong> fund based on {numEarners === 1 ? 'single income' : `${numEarners} earners`} and ~{jobSearchMonths}mo job search
                    </p>
                  </div>

                  {gap > 0 ? (
                    <p style={{ fontSize: 13, color: C.ink2, textAlign: 'center', margin: '16px 0 0', lineHeight: 1.6 }}>
                      You need <strong style={{ color: C.dark }}>{fmtIN(gap)}</strong> more to reach your {months}-month emergency fund target.
                    </p>
                  ) : (
                    <p style={{ fontSize: 13, color: C.lime2, textAlign: 'center', margin: '16px 0 0', lineHeight: 1.6, fontWeight: 600 }}>
                      You have met your emergency fund target with a surplus of {fmtIN(surplus)}.
                    </p>
                  )}
                </div>
              </div>

              {monthlyRows.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowTable(v => !v)}
                    aria-expanded={showTable} aria-controls="ef-progress-table"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Month-by-Month Progress to Target</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>At {fmtC(monthlyContribution)}/mo, 6% p.a.</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {monthlyRows.length} mo to target
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showTable && (
                    <div id="ef-progress-table" style={{ borderTop: `1px solid ${C.border}`, overflowX: 'auto', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
                      <p style={{ fontSize: 12, color: C.ink3, margin: 0, padding: mobile ? '12px 20px 0' : '16px 44px 0', lineHeight: 1.6 }}>
                        Assumes the contribution above is saved every month into a high-interest savings account or sweep-in FD earning 6% p.a., compounded monthly.
                      </p>
                      <table style={{ minWidth: 500, width: '100%', borderCollapse: 'collapse', fontSize: 13, marginTop: 8 }}>
                        <thead>
                          <tr style={{ background: '#f4f5f6' }}>
                            {['Month', 'Opening', 'Contribution', 'Interest', 'Closing'].map(h => (
                              <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }} scope="col">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {monthlyRows.map((row, i) => (
                            <tr key={row.month} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                              <td style={{ padding: '11px 14px', fontWeight: 700, color: C.dark }}>{row.month}</td>
                              <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtIN(row.opening)}</td>
                              <td style={{ padding: '11px 14px', color: '#1f7a58', fontWeight: 600 }}>{fmtIN(row.contribution)}</td>
                              <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtIN(row.interest)}</td>
                              <td style={{ padding: '11px 14px', fontWeight: 700, color: C.dark }}>{fmtIN(row.closing)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </section>

            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>


            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-emergency-fund">What Is an Emergency Fund?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    An emergency fund is a readily accessible corpus set aside to cover unexpected expenses or income disruptions: job loss, medical emergencies, urgent home repairs, or any unplanned financial shock. It is not an investment. It is insurance against financial distress.
                  </p>
                </div>
                <p style={p}>
                  Financial planners universally recommend 3 to 6 months of essential living expenses as the baseline. For Indian households, this typically ranges from Rs 1.5 lakh to Rs 10 lakh depending on lifestyle, location, and family size. The fund should be held in instruments that offer instant liquidity with zero risk of capital loss.
                </p>
                <p style={p}>
                  Unlike investments where you optimise for returns, an emergency fund optimises for access. The interest it earns is secondary to the security it provides. Building this fund is the first financial goal every person should complete before starting to invest for retirement, a home, or other long-term objectives.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-much-emergency-fund">How Much Emergency Fund Do You Need</h2>
                <p style={p}>
                  The right emergency fund size depends on three variables: your monthly essential expenses, the number of months you want to be covered, and the stability of your income. The calculator above uses these factors to give a personalised target.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Your Situation</th><th style={thS} scope="col">Recommended Coverage</th><th style={thS} scope="col">Reason</th></tr></thead>
                    <tbody>
                      <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>Single earner, stable job</td>
                        <td style={tdR}>6 months</td>
                        <td style={tdL}>One income source, but low risk of job loss</td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>Single earner, volatile industry</td>
                        <td style={tdR}>9 to 12 months</td>
                        <td style={tdL}>Higher risk of income disruption</td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>Dual income, no dependents</td>
                        <td style={tdR}>3 months</td>
                        <td style={tdL}>Second income provides a buffer</td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>Self-employed or freelancer</td>
                        <td style={tdR}>9 to 12 months</td>
                        <td style={tdL}>Irregular income, longer to replace</td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>Retiree</td>
                        <td style={tdR}>12 to 24 months</td>
                        <td style={tdL}>No employment income to fall back on</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The <strong>rule of thumb</strong> is simple: multiply your monthly essential expenses by the number of months you want to cover. If your monthly expenses are Rs 50,000 and you are a single-earner household with a stable salaried job, your target is Rs 50,000 x 6 = Rs 3 lakh. Use the <Link href="/calculators/goal-planning-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Goal Planning Calculator</Link> to plan your monthly savings toward this target.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="where-to-keep-emergency-fund">Where to Keep Your Emergency Fund in India</h2>
                <p style={p}>
                  The best place for your emergency fund balances three factors: instant access, zero risk of capital loss, and some interest income. No single product is perfect on all three, but the options below are the most suitable for Indian investors.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Option</th><th style={thS} scope="col">Liquidity</th><th style={thS} scope="col">Interest Rate</th><th style={thS} scope="col">Best For</th></tr></thead>
                    <tbody>
                      <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>Savings Account</td>
                        <td style={tdR}>Instant</td>
                        <td style={tdR}>3 to 7%</td>
                        <td style={tdL}>Full corpus, quickest access</td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>Sweep-in FD</td>
                        <td style={tdR}>Instant</td>
                        <td style={tdR}>5 to 7.5%</td>
                        <td style={tdL}>Higher interest, auto-sweep feature</td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>Liquid Mutual Fund</td>
                        <td style={tdR}>Same day</td>
                        <td style={tdR}>5 to 7%</td>
                        <td style={tdL}>Better post-tax returns for higher brackets</td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>Overnight Fund</td>
                        <td style={tdR}>Same day</td>
                        <td style={tdR}>4.5 to 6%</td>
                        <td style={tdL}>Lowest risk among mutual funds</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Avoid equity-linked instruments, long-term fixed deposits with high premature withdrawal penalties, and real estate for your emergency fund. These assets either lose value at the wrong time or take too long to convert to cash. For more on inflation-adjusted returns across different instruments, use the <Link href="/calculators/real-return-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Real Return Calculator</Link>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="emergency-fund-vs-savings">Emergency Fund vs Other Savings Goals</h2>
                <p style={p}>
                  Your emergency fund is the foundation of your financial plan. It should be built before you start investing for retirement, buying a home, or saving for your child education. The reason is simple: without an emergency fund, an unexpected expense forces you to liquidate long-term investments at a loss or take on high-interest debt.
                </p>
                <p style={p}>
                  Once your emergency fund is fully built, you can redirect the same monthly savings toward other goals. A common sequence is: build a 3 to 6 month emergency fund first, then start investing 15 to 20% of income for retirement, then save for shorter-term goals like a home down payment. The <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SIP Calculator</Link> can help you plan the next phase of your investment journey after the emergency fund is in place.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-build-emergency-fund">How to Build an Emergency Fund</h2>
                <p style={p}>Building a 3 to 6 month emergency fund takes time, but a systematic approach makes it achievable.</p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set a monthly auto-transfer:</strong> move 10 to 20% of your salary to a dedicated savings account on payday before you spend on anything else. Automating the transfer removes the temptation to skip the month.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Use windfalls:</strong> bonus, tax refund, or gift money should go directly to the emergency fund. One annual bonus of Rs 50,000 can cover 1 to 2 months of expenses for a modest lifestyle.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Cut discretionary spending temporarily:</strong> reduce dining out, OTT subscriptions, and travel for 3 to 6 months to accelerate the fund building. Even saving an extra Rs 5,000 per month adds Rs 30,000 to Rs 60,000 to your corpus in a year.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Start small and increase:</strong> even Rs 2,000 per month adds up. Use the <Link href="/calculators/future-value-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Future Value Calculator</Link> to see how your regular savings grow toward the target.
                  </li>
                </ol>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>RD Calculator</p>
                    <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>A recurring deposit locks in a fixed monthly commitment toward your emergency fund. See how much a monthly RD grows over your target timeline.</p>
                  </div>
                  <Link className="fx-btn" href="/calculators/rd-calculator" target="_blank" rel="noopener noreferrer"
                    style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    Open calculator
                  </Link>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="dicgc-insurance">Is Your Emergency Fund Safe in a Bank</h2>
                <p style={p}>
                  Yes, up to Rs 5 lakh per depositor per bank. The <a href="https://www.dicgc.org.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Deposit Insurance and Credit Guarantee Corporation (DICGC)</a>, a wholly owned RBI subsidiary, insures both principal and interest up to this limit if a bank fails.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  If your emergency fund exceeds Rs 5 lakh, split it across two banks so the full amount stays covered rather than holding it all in one account.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="epf-emergency-access">Can You Use Your EPF as an Emergency Fund</h2>
                <p style={p}>
                  Partially, but it should be a last resort. Under the <a href="https://www.epfindia.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>EPFO</a>'s revised unemployment withdrawal rules effective from the Central Board of Trustees' October 2025 decision, members can withdraw up to 75% of their EPF balance after one month of unemployment.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  The remaining 25% stays locked until 12 months of continued unemployment. Because EPF withdrawal takes days to process and interrupts retirement compounding, it works better as a backup layer behind a liquid emergency fund, not a replacement for one.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="tax-on-emergency-fund-interest">Is Interest on Your Emergency Fund Taxable</h2>
                <p style={p}>
                  Yes, but a portion is deductible under the old tax regime. <a href="https://www.incometax.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Section 80TTA</a> allows individuals below 60 to deduct up to Rs 10,000 of savings account interest each financial year, while Section 80TTB raises this to Rs 50,000 for senior citizens and covers FD and RD interest too.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Neither deduction is available under the new tax regime, so factor this in when deciding where to park your fund if you have switched regimes.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="emergency-fund-vs-overdraft">Emergency Fund vs Overdraft Against Fixed Deposit</h2>
                <p style={p}>
                  An overdraft against FD lets you borrow up to 90% of your fixed deposit value without breaking it, at roughly 1 to 2% above the FD rate, with interest charged only on the amount actually used. It is a useful backup, but not a substitute for a dedicated emergency fund.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  An OD still requires an existing FD to lien against and involves a same-day but not instant approval step, while a liquid emergency fund in a savings account is accessible the moment you need it, with no bank approval or lien involved.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This Emergency Fund Calculator</h2>
                <p style={p}>
                  Enter your monthly essential expenses, current emergency savings, and desired months of coverage into the calculator. Use the preset buttons (3M, 6M, 9M, 12M) to quickly test different coverage periods. The number of income earners and estimated months to find a new job help the calculator recommend an appropriate coverage duration.
                </p>
                <p style={p}>
                  The output panel shows your target emergency fund, what percentage you have already saved, and the gap you need to fill. The progress bar and donut chart give a visual snapshot of your savings status. Click any input value to type a precise number. The currency selector converts all amounts to your preferred currency.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Before building your emergency fund, ensure you have adequate health insurance and, if you have dependents, adequate life cover. A medical emergency is one of the most common reasons people deplete their savings. Use the <Link href="/calculators/term-insurance-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Term Insurance Calculator</Link> to check whether your life cover is adequate alongside your emergency fund.
                </p>
              </div>


              <div style={sec}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ faqs={faqs} />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative estimates based on the inputs you provide. This calculator is for educational and planning purposes only and does not constitute financial advice. Consult a SEBI-registered financial adviser before making significant financial decisions. 
                </p>
              </div>

            </article>
          </div>

          <style>{`.emergency-fund-sidebar::-webkit-scrollbar{width:5px}.emergency-fund-sidebar::-webkit-scrollbar-track{background:transparent}.emergency-fund-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.emergency-fund-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="emergency-fund-sidebar" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <SidebarList title="Popular Calculators" items={POPULAR} />
              <SidebarList title="More Calculators" items={MORE} />
            </div>
          </aside>

        </div>
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

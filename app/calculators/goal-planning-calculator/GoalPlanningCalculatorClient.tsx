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
  dark: '#101214', lime: '#a6dbc4', lime2: '#2d9970', paleLime: '#f4f5f6',
  ink: '#16140F', ink2: '#50565c', ink3: '#7a8087', white: '#ffffff',
  bg: '#f6f7f8', border: '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

type Mode = 'sip' | 'lumpsum';

/* ─── Slider (colorless input panel per CLAUDE.md rule 17) ─────── */
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
    <div style={{ marginBottom: compact ? 18 : 30 }}>
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

/* ─── Year presets (rule 17: colorless, white active pill) ─────── */
function YearPresets({ current, onChange }: { current: number; onChange: (v: number) => void }) {
  const presets = [3, 5, 10, 15, 20, 25];
  return (
    <div role="group" aria-label="Time horizon presets" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: -18, marginBottom: 22 }}>
      {presets.map(y => {
        const active = current === y;
        return (
          <button key={y} onClick={() => onChange(y)} aria-pressed={active} aria-label={`Set time horizon to ${y} years`}
            style={{
              fontSize: 11.5, fontWeight: active ? 700 : 500,
              color: active ? C.ink : C.ink3,
              background: active ? C.white : 'transparent',
              border: active ? `1.5px solid ${C.ink}` : `1px solid ${C.border}`,
              borderRadius: 99, padding: '4px 10px', cursor: 'pointer', fontFamily: INTER, transition: 'all 0.12s',
            }}>
            {y}Y
          </button>
        );
      })}
    </div>
  );
}

/* ─── Donut ──────────────────────────────────────────────────── */
function DonutChart({ invested, returns, investedPct }: { invested: number; returns: number; investedPct: number }) {
  const total = invested + Math.abs(returns);
  if (total <= 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const pArc = (invested / total) * circ;
  return (
    <svg width="216" height="216" viewBox="0 0 216 216" role="img"
      aria-label={`Invested amount ${investedPct}% of goal, returns ${100 - investedPct}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Invested</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{investedPct}%</text>
    </svg>
  );
}

/* ─── CA CTA (exact standard component) ─────────────────────────── */

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
  { href: '/calculators/sip-calculator', label: 'SIP Calculator' },
  { href: '/calculators/lumpsum-calculator', label: 'Lumpsum Calculator' },
  { href: '/calculators/step-up-sip-calculator', label: 'Step-Up SIP Calculator' },
  { href: '/calculators/sip-vs-lumpsum-calculator', label: 'SIP vs Lumpsum Calculator' },
  { href: '/calculators/future-value-calculator', label: 'Future Value Calculator' },
  { href: '/calculators/retirement-calculator', label: 'Retirement Calculator' },
  { href: '/calculators/cagr-calculator', label: 'CAGR Calculator' },
];
const MORE = [
  { href: '/calculators/present-value-calculator', label: 'Present Value Calculator' },
  { href: '/calculators/inflation-calculator', label: 'Inflation Calculator' },
  { href: '/calculators/xirr-calculator', label: 'XIRR Calculator' },
  { href: '/calculators/fd-calculator', label: 'FD Calculator' },
  { href: '/calculators/ppf-calculator', label: 'PPF Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
const FAQS = [
  { q: 'What is a goal planning calculator?', a: 'A goal planning calculator, also called a financial goal planner or goal-based SIP calculator, works out the monthly SIP or lumpsum needed today to reach a target amount by a future date. Enter the target, an expected return, and a time horizon, and it solves for the missing number.' },
  { q: 'How is the required monthly SIP calculated?', a: 'The calculator uses the annuity-due formula: Monthly SIP = Target / [((1 + i)^n minus 1) / i times (1 + i)], where i is the monthly return rate and n is the number of months. This assumes each instalment compounds monthly and is invested at the start of the month.' },
  { q: 'What if I already have some savings toward this goal?', a: 'Enter the amount in the Existing Savings slider. The calculator projects that amount forward at your assumed return rate, subtracts it from the target, and solves the SIP or lumpsum only for the remaining gap. This is different from ignoring existing savings, which overstates the SIP you actually need.' },
  { q: 'Should I use a monthly SIP or a one-time lumpsum for my goal?', a: 'Use the SIP tab if you are investing from ongoing income. Use the Lumpsum tab if you have a bonus, inheritance, or sale proceeds to deploy today. The Lumpsum tab shows what a one-time investment needs to be for the same goal, rate, and time horizon.' },
  { q: 'Can I plan for more than one financial goal at a time?', a: 'This calculator solves one goal at a time. For multiple goals such as a house down payment and a child\'s education, run the calculation separately for each goal at its own target, return rate, and horizon, then add the resulting monthly SIP figures together for your combined monthly commitment.' },
  { q: 'What return rate should I assume for goal planning?', a: 'For equity mutual funds, 10 to 12 percent is a common long-term assumption. For debt funds, PPF, or FDs, use 6 to 8 percent. For a balanced portfolio, 8 to 10 percent is reasonable. These are historical ranges, not guaranteed returns.' },
  { q: 'Does this calculator account for inflation?', a: 'No. The target amount is treated in today\'s rupees. If your goal is several years away, inflate the target first using the Inflation Calculator, since a goal worth Rs 10 lakh today needs roughly Rs 18 lakh in 10 years at 6 percent inflation.' },
  { q: 'How much SIP do I need for Rs 1 crore in 15 years?', a: 'At a 12 percent assumed annual return, reaching Rs 1 crore in 15 years needs a monthly SIP of roughly Rs 21,000. At 10 percent, the same goal needs about Rs 24,900 a month. Enter your own numbers in the calculator above for an exact figure.' },
  { q: 'What is the difference between a goal calculator and a regular SIP calculator?', a: 'A regular SIP calculator starts from a fixed monthly amount and projects what it grows to. A goal-based SIP calculator works backward from a fixed target amount and solves for the monthly investment required to reach it.' },
  { q: 'Can I use this calculator for retirement planning?', a: 'Yes. Enter your desired retirement corpus as the target, your expected long-term return, and the years remaining until retirement. For a dedicated retirement worksheet that also factors in post-retirement withdrawals, use the Retirement Calculator.' },
  { q: 'Can I use this for a child\'s education or wedding goal?', a: 'Yes. Education and wedding costs both rise with inflation, so estimate the future cost first rather than using today\'s fee or cost figure as the target. A private engineering degree costing Rs 15 lakh today, for instance, could cost over Rs 28.5 lakh in 12 years at 5.5 percent education inflation.' },
  { q: 'What is a step-up SIP and does this calculator support it?', a: 'A step-up SIP increases the monthly instalment every year, usually in line with salary growth, which reaches the same goal with a lower starting SIP. This calculator assumes a flat monthly SIP throughout. For a step-up projection, use the dedicated Step-Up SIP Calculator.' },
  { q: 'Why does the required SIP change so much with the return rate?', a: 'A goal further out gives compounding more years to work, and a higher return rate compounds faster within those years. For a Rs 50 lakh goal in 10 years, the required SIP is about Rs 27,600 a month at 8 percent but only about Rs 22,300 a month at 12 percent, purely from the extra compounding.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform built for India. All calculators are free to use, with a free account available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ─── Main ───────────────────────────────────────────────────── */
export default function GoalPlanningCalculatorClient() {
  const [mobile, setMobile] = useState(false);
  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const defaultSettings = { mode: 'sip' as Mode, target: 10000000, rate: 12, years: 10, existingSavings: 0, showTable: false };
  const { settings, updateSettings } = useCalculatorSettings('goal-planning-calculator', defaultSettings);
  const { mode, target, rate, years, existingSavings, showTable } = settings;
  const setMode = (v: Mode) => updateSettings({ mode: v });
  const setTarget = (v: number) => updateSettings({ target: v });
  const setRate = (v: number) => updateSettings({ rate: v });
  const setYears = (v: number) => updateSettings({ years: v });
  const setExistingSavings = (v: number) => updateSettings({ existingSavings: v });
  const setShowTable = (v: boolean | ((p: boolean) => boolean)) => updateSettings({ showTable: typeof v === 'function' ? v(showTable) : v });

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  const result = useMemo(() => {
    const months = years * 12;
    const monthlyRate = rate > 0 ? Math.pow(1 + rate / 100, 1 / 12) - 1 : 0;
    const fvExisting = existingSavings * Math.pow(1 + rate / 100, years);
    const remainingTarget = Math.max(0, target - fvExisting);

    let monthlySIP = 0;
    if (remainingTarget > 0 && months > 0) {
      monthlySIP = rate === 0
        ? remainingTarget / months
        : (remainingTarget * monthlyRate) / ((Math.pow(1 + monthlyRate, months) - 1) * (1 + monthlyRate));
    }
    const sipTotalInvestment = monthlySIP * months;
    const sipInvested = existingSavings + sipTotalInvestment;
    const sipReturns = target - sipInvested;

    const lumpsumNeeded = remainingTarget > 0 ? remainingTarget / Math.pow(1 + rate / 100, years) : 0;
    const lsInvested = existingSavings + lumpsumNeeded;
    const lsReturns = target - lsInvested;

    return { fvExisting, remainingTarget, monthlySIP, sipInvested, sipReturns, lumpsumNeeded, lsInvested, lsReturns };
  }, [target, rate, years, existingSavings]);

  const invested = mode === 'sip' ? result.sipInvested : result.lsInvested;
  const returns = mode === 'sip' ? result.sipReturns : result.lsReturns;
  const investedPct = target > 0 ? Math.round((invested / target) * 100) : 0;

  const growthRows = useMemo(() => {
    if (mode !== 'sip' || result.monthlySIP <= 0) return [];
    const months = years * 12;
    const monthlyRate = rate > 0 ? Math.pow(1 + rate / 100, 1 / 12) - 1 : 0;
    const startYear = new Date().getFullYear();
    const totalYears = Math.min(years, 40);
    return Array.from({ length: totalYears }, (_, idx) => {
      const y = idx + 1;
      const m = y * 12;
      const existingAtY = existingSavings * Math.pow(1 + rate / 100, y);
      const sipAtY = rate === 0
        ? result.monthlySIP * m
        : result.monthlySIP * ((Math.pow(1 + monthlyRate, Math.min(m, months)) - 1) / monthlyRate) * (1 + monthlyRate);
      const corpus = existingAtY + sipAtY;
      const invested = existingSavings + result.monthlySIP * Math.min(m, months);
      return { year: startYear + y, corpus, invested, gain: corpus - invested };
    });
  }, [mode, result.monthlySIP, years, rate, existingSavings]);

  const h2 = { fontSize: mobile ? 18 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const p = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 40px' } as React.CSSProperties;
  const thS = { padding: '10px 16px', fontSize: 12, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const };
  const tdL = { padding: '11px 16px', fontSize: 13.5, color: C.ink2, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
  const tdR = { padding: '11px 16px', fontSize: 13.5, color: C.ink, fontWeight: 500, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
  const bullet = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Goal Planning Calculator
          </h1>
          <p style={{ fontSize: 14.5, color: C.ink3, margin: 0 }}>
            Find the monthly SIP or lumpsum needed to reach any financial goal, accounting for savings you already have
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            <section aria-label="Goal Planning Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              <div role="tablist" aria-label="Calculator mode" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                {([
                  { id: 'sip', label: 'Monthly SIP', desc: 'Find the monthly SIP needed to reach your goal' },
                  { id: 'lumpsum', label: 'Lumpsum', desc: 'Find the one-time investment needed to reach your goal' },
                ] as { id: Mode; label: string; desc: string }[]).map(tab => (
                  <button key={tab.id} role="tab" aria-selected={mode === tab.id} aria-controls={`panel-${tab.id}`}
                    onClick={() => setMode(tab.id)} title={tab.desc}
                    style={{
                      flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: mobile ? 12.5 : 13.5, fontWeight: mode === tab.id ? 700 : 400,
                      color: mode === tab.id ? C.dark : C.ink3,
                      borderBottom: mode === tab.id ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                      transition: 'all 0.15s', fontFamily: INTER,
                    }}>
                    {tab.label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                <div role="tabpanel" id={`panel-${mode}`} style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Goal Details</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  <Slider label="Target Amount" id="target" value={target} min={100000} max={100000000} step={50000} fmt={fmtC} onChange={setTarget} compact={mobile} />
                  <Slider label="Expected Return (p.a.)" id="rate" value={rate} min={1} max={30} step={0.25} fmt={v => `${v.toFixed(2)}%`} onChange={setRate} compact={mobile} />
                  <Slider label="Time Horizon" id="years" value={years} min={1} max={40} step={1} fmt={v => `${v} Yr`} onChange={setYears} compact={mobile} />
                  <YearPresets current={years} onChange={setYears} />
                  <Slider label="Existing Savings (optional)" id="existing" value={existingSavings} min={0} max={target} step={10000} fmt={fmtC} onChange={setExistingSavings} compact={mobile} />
                  <p style={{ fontSize: 12.5, color: C.ink3, lineHeight: 1.6, margin: '-8px 0 0', fontStyle: 'italic' }}>
                    Existing savings are projected forward at the same expected return and netted off the target before solving for the {mode === 'sip' ? 'monthly SIP' : 'lumpsum'}.
                  </p>
                </div>

                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>
                      {mode === 'sip' ? 'Monthly SIP Needed' : 'Lumpsum Needed'}
                    </span>
                    <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                      aria-live="polite">
                      {mode === 'sip' ? fmtIN(result.monthlySIP) : fmtIN(result.lumpsumNeeded)}
                    </span>
                  </div>

                  {[
                    { label: 'Goal amount', value: fmtC(target) },
                    { label: 'Existing savings today', value: fmtC(existingSavings) },
                    { label: 'Existing savings, future value', value: fmtC(result.fvExisting) },
                    { label: mode === 'sip' ? 'Total new SIP investment' : 'Lumpsum invested', value: fmtC(mode === 'sip' ? result.monthlySIP * years * 12 : result.lumpsumNeeded) },
                    { label: 'Total returns', value: fmtC(returns) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '9px 0' : '12px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    <DonutChart invested={invested} returns={returns} investedPct={investedPct} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Invested {investedPct}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Returns {100 - investedPct}%</span>
                    </div>
                  </div>

                  <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                    <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`Invested is ${investedPct}% of the goal`}>
                      <div style={{ height: '100%', width: `${investedPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>
                </div>
              </div>

              {mode === 'sip' && growthRows.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowTable(v => !v)} aria-expanded={showTable} aria-controls="goal-progress-table"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Year-by-Year Goal Progress</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>How the corpus builds toward the target</span>}
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      aria-hidden="true" style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {showTable && (
                    <div id="goal-progress-table" style={{ borderTop: `1px solid ${C.border}`, overflowX: 'auto' }}>
                      <table style={{ minWidth: 440, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead>
                          <tr style={{ background: '#f4f5f6' }}>
                            {['Year', 'Corpus So Far', 'Invested So Far', '% of Goal'].map(h => (
                              <th key={h} style={{ padding: '10px 20px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }} scope="col">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {growthRows.map((row, i) => (
                            <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                              <td style={{ padding: '11px 20px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                              <td style={{ padding: '11px 20px', color: C.ink2 }}>{fmtIN(row.corpus)}</td>
                              <td style={{ padding: '11px 20px', color: C.ink2 }}>{fmtIN(row.invested)}</td>
                              <td style={{ padding: '11px 20px', color: '#1f7a58', fontWeight: 600 }}>{target > 0 ? Math.min(100, Math.round((row.corpus / target) * 100)) : 0}%</td>
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
                <h2 style={h2} id="what-is-goal-planning">What is a goal planning calculator?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    A goal planning calculator, also called a goal-based SIP calculator or financial goal planner, works backward from a target amount to find the monthly SIP or lumpsum needed today to reach it.
                  </p>
                </div>
                <p style={p}>
                  Most SIP calculators start from a monthly amount and project what it grows to. Goal planning reverses the question. You already know the number you need, whether it is a child&apos;s college fee, a home down payment, or a retirement corpus.
                </p>
                <p style={p}>
                  The calculator finds the monthly SIP, or a one-time lumpsum, that reaches that number given an expected rate of return and a time horizon.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="goal-planning-formula">The goal planning formula</h2>
                <p style={p}>This calculator solves the SIP annuity formula and the present value formula for the amount unknown, after netting off any existing savings.</p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 13.5, color: C.dark, display: 'block', marginBottom: 8 }}>
                    Monthly SIP = Remaining Target / [((1 + i)^n minus 1) / i &times; (1 + i)]
                  </code>
                  <code style={{ fontFamily: 'monospace', fontSize: 13.5, color: C.dark, display: 'block' }}>
                    Lumpsum = Remaining Target / (1 + r)^years
                  </code>
                </div>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={{ ...thS, width: 90 }} scope="col">Variable</th><th style={thS} scope="col">Meaning</th></tr></thead>
                    <tbody>
                      {[
                        ['Remaining Target', 'The goal amount minus the future value of any existing savings'],
                        ['i', 'Monthly return rate: (1 + annual rate)^(1/12) minus 1'],
                        ['n', 'Number of months in the time horizon'],
                        ['r', 'Annual return rate as a decimal'],
                      ].map(([v, m]) => (
                        <tr key={v}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{v}</td><td style={tdR}>{m}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  A Rs 1 crore goal in 10 years at 12 percent needs a monthly SIP of roughly Rs 44,600. At 8 percent, the same goal needs about Rs 55,200 a month. The return rate is the single most consequential input in any goal plan.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="existing-savings">How existing savings reduce your required SIP</h2>
                <p style={p}>
                  Most goal calculators assume you start from zero, which overstates the SIP anyone with existing savings actually needs. This calculator projects your existing savings forward at the same assumed return and subtracts that future value from the goal first.
                </p>
                <p style={p}>
                  Take a Rs 50 lakh goal in 10 years at 10 percent, with Rs 5 lakh already saved. That Rs 5 lakh grows to roughly Rs 12.97 lakh on its own over 10 years, leaving a remaining target of about Rs 37 lakh.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  The monthly SIP for that remaining Rs 37 lakh works out to roughly Rs 18,400, compared with about Rs 24,800 a month if the existing savings were ignored entirely.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="worked-examples">Monthly SIP needed for common goal amounts</h2>
                <p style={p}>
                  These figures assume no existing savings and a 12 percent annual return, a standard equity mutual fund assumption used across Indian financial planning.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Goal Amount</th><th style={thS} scope="col">5 Years</th><th style={thS} scope="col">10 Years</th><th style={thS} scope="col">15 Years</th><th style={thS} scope="col">20 Years</th></tr></thead>
                    <tbody>
                      {[
                        ['Rs 10 lakh', 'Rs 12,330', 'Rs 4,460', 'Rs 2,100', 'Rs 1,090'],
                        ['Rs 25 lakh', 'Rs 30,800', 'Rs 11,150', 'Rs 5,250', 'Rs 2,720'],
                        ['Rs 50 lakh', 'Rs 61,650', 'Rs 22,300', 'Rs 10,500', 'Rs 5,440'],
                        ['Rs 1 crore', 'Rs 1,23,300', 'Rs 44,600', 'Rs 21,000', 'Rs 10,900'],
                      ].map(row => (
                        <tr key={row[0]} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{row[0]}</td>
                          <td style={tdR}>{row[1]}</td>
                          <td style={tdR}>{row[2]}</td>
                          <td style={tdR}>{row[3]}</td>
                          <td style={tdR}>{row[4]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  Use the calculator above for your own target, return assumption, and time horizon. These figures are rounded and meant only to show how the required SIP shrinks as the time horizon extends.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="return-rate">Choosing the right return rate for your goal</h2>
                <p style={p}>The return assumption should match the asset class you actually plan to invest in, not the highest number you have seen quoted.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Asset Class</th><th style={thS} scope="col">Typical Long-Term Return</th><th style={thS} scope="col">Suited For</th></tr></thead>
                    <tbody>
                      {[
                        ['Fixed deposit / PPF', '6 to 7.1%', 'Goals under 3 years, capital protection'],
                        ['Debt mutual funds', '6 to 8%', 'Goals 3 to 5 years away'],
                        ['Balanced / hybrid funds', '8 to 10%', 'Goals 5 to 8 years away'],
                        ['Large-cap equity funds', '10 to 12%', 'Goals 8 years or more away'],
                        ['Diversified / flexicap equity', '12 to 15%', 'Long-term goals 10 years or more away'],
                      ].map(row => (
                        <tr key={row[0]} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{row[0]}</td>
                          <td style={tdR}>{row[1]}</td>
                          <td style={tdL}>{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  A goal less than three years away should not assume equity returns, since a market downturn right before you need the money can permanently impair the plan. Shorten the assumed return as the goal date approaches.
                </p>
              </div>

              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>SIP vs Lumpsum Calculator</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Compare which approach reaches a goal faster for your specific numbers.</p>
                </div>
                <Link className="fx-btn" href="/calculators/sip-vs-lumpsum-calculator" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
              </div>

              <div style={sec}>
                <h2 style={h2} id="goal-planning-india">Goal planning for common life goals in India</h2>
                <p style={p}>Every goal needs its own target, since inflation affects each cost differently and the time horizon changes how much risk you can afford to take.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Goal</th><th style={thS} scope="col">Typical Horizon</th><th style={thS} scope="col">Suggested Return Assumption</th></tr></thead>
                    <tbody>
                      {[
                        ['Emergency fund', '0 to 1 year', '4 to 6% (liquid fund / savings account)'],
                        ['Wedding', '2 to 5 years', '6 to 9% (debt-to-hybrid mix)'],
                        ['Home down payment', '3 to 7 years', '8 to 10% (hybrid to equity mix)'],
                        ['Child\'s education', '10 to 18 years', '10 to 12% (equity, de-risked near the goal)'],
                        ['Retirement corpus', '15 to 30 years', '10 to 12% (equity, de-risked near retirement)'],
                      ].map(row => (
                        <tr key={row[0]} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{row[0]}</td>
                          <td style={tdL}>{row[1]}</td>
                          <td style={tdL}>{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  For more than one goal, run this calculator once per goal with its own target, horizon, and return assumption, then add the resulting monthly SIP figures for your combined monthly commitment.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="common-mistakes">Common mistakes in goal planning</h2>
                <div>
                  {[
                    ['Ignoring inflation on the target', 'Entering today\'s cost of a goal that is 10 or 15 years away understates what you actually need. Inflate the target first, especially for education and medical goals, which tend to run above general inflation.'],
                    ['Using one return rate for every goal', 'A retirement goal 25 years away and a wedding fund 2 years away should not use the same assumed return. Match the return rate to the time horizon, since a short horizon cannot absorb equity market volatility.'],
                    ['Forgetting existing savings', 'Not counting money already set aside for a goal overstates the monthly SIP required. Use the Existing Savings input in the calculator above to correct for this.'],
                    ['Treating the assumed return as guaranteed', 'The SIP figure the calculator returns depends entirely on actually earning the assumed rate every year. Review the plan periodically and adjust the SIP if actual returns fall short.'],
                  ].map(([title, text], i) => (
                    <div key={i} style={{ ...bullet, marginBottom: 14, gap: 0, flexDirection: 'column' as const }}>
                      <strong style={{ fontSize: 15, color: C.ink, marginBottom: 4 }}>{title}</strong>
                      <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to use this goal planning calculator</h2>
                <p style={p}>Choose the Monthly SIP tab or the Lumpsum tab depending on how you plan to invest.</p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Target Amount:</strong> the corpus you need at the end of the horizon, in today&apos;s rupees or already inflation-adjusted.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Expected Return:</strong> the annual return you expect from the asset class you plan to invest in.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Time Horizon:</strong> the number of years until you need the money. Use the preset pills to jump to common durations.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Existing Savings:</strong> money already set aside for this goal. Leave at zero if starting fresh.</li>
                </ol>
                <p style={{ ...p, margin: 0 }}>
                  The result, donut chart, and progress bar update instantly as any input changes. Expand the Year-by-Year Goal Progress table under the Monthly SIP tab to see how the corpus builds each year, and switch currency using the selector in the input panel if planning from outside India.
                </p>
              </div>

              <div style={{ margin: '0 0 40px' }}>
                <h2 style={h2} id="faq">Frequently asked questions</h2>
                <FAQ />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only, based on the inputs and assumed rate of return you provide. Mutual funds do not have a fixed rate of return, and past performance does not guarantee future results. This calculator does not constitute financial advice. Consult a SEBI-registered investment adviser before making investment decisions.
                </p>
              </div>

            </article>
          </div>

          <style>{`.goal-plan-sidebar::-webkit-scrollbar{width:5px}.goal-plan-sidebar::-webkit-scrollbar-track{background:transparent}.goal-plan-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.goal-plan-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="goal-plan-sidebar" aria-label="Related calculators" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <SidebarList title="Popular Calculators" items={POPULAR} />
              <SidebarList title="More Calculators" items={MORE} />
            </div>
          </aside>
        </div>
      </div>

      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/percentage-calculator|%', '/calculators/gst-calculator|GST', '/calculators/loan-calculator|Loan', '/calculators/sip-calculator|SIP', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/swp-calculator|SWP', '/calculators/emi-calculator|EMI', '/calculators/home-loan-calculator|Home Loan', '/calculators/mortgage-calculator|Mortgage', '/calculators/car-loan-calculator|Car Loan', '/calculators/fd-calculator|FD', '/calculators/compound-interest-calculator|Compound Int.', '/calculators/gratuity-calculator|Gratuity', '/calculators/goal-planning-calculator|Goal Planning', '/calculators/future-value-calculator|Future Value', '/calculators/present-value-calculator|Present Value'] },
        { hd: 'Topics', links: ['/#|Mutual Funds', '/#|Home Loans', '/#|Fixed Deposits', '/#|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

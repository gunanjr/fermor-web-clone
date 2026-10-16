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

/* ─── Palette: identical to EMI / CAGR calculators ─────────── */
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

type Freq = 'monthly' | 'quarterly' | 'half-yearly' | 'yearly';

const FREQ: Record<Freq, { label: string; short: string; ppy: number }> = {
  monthly:       { label: 'Monthly',     short: 'Mo',    ppy: 12 },
  quarterly:     { label: 'Quarterly',   short: 'Qtr',   ppy: 4  },
  'half-yearly': { label: 'Half-Yearly', short: '6 Mo',  ppy: 2  },
  yearly:        { label: 'Yearly',      short: 'Yr',    ppy: 1  },
};

/* ─── XIRR: Newton-Raphson ──────────────────────────────────── */
function calcXIRR(flows: { amount: number; dayOffset: number }[]): number | null {
  let rate = 0.1;
  for (let iter = 0; iter < 300; iter++) {
    let f = 0, df = 0;
    for (const cf of flows) {
      const t = cf.dayOffset / 365;
      if (t < 1e-10) { f += cf.amount; continue; }
      const base = Math.pow(1 + rate, t);
      f  += cf.amount / base;
      df -= (t * cf.amount) / ((1 + rate) * base);
    }
    if (Math.abs(df) < 1e-12) break;
    const nr = rate - f / df;
    if (Math.abs(nr - rate) < 1e-8) return parseFloat((nr * 100).toFixed(2));
    rate = nr;
    if (rate < -0.9999) rate = -0.9999;
    if (rate > 500) return null;
  }
  return null;
}

/* ─── Slider ─────────────────────────────────────────────────── */
function Slider({ label, value, min, max, step, fmt, onChange, compact }: {
  label: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void; compact?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 40 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 16 }}>
        {label ? <label style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400 }}>{label}</label> : <div />}
        {editing ? (
          <input autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.paleLime, border: `1.5px solid ${C.lime2}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 120, outline: 'none', color: C.dark, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: C.dark, background: C.paleLime, border: `1.5px solid ${C.lime2}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 18px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 90 : 110, textAlign: 'center' }}>
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
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontSize: 11, color: C.ink3 }}>{fmt(min)}</span>
        <span style={{ fontSize: 11, color: C.ink3 }}>{fmt(max)}</span>
      </div>
    </div>
  );
}

/* ─── Donut ───────────────────────────────────────────────────── */
function DonutChart({ principal, gains }: { principal: number; gains: number }) {
  const total = principal + Math.abs(gains);
  if (total === 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const pArc = (principal / total) * circ;
  const pPct = Math.round((principal / total) * 100);
  return (
    <svg width="216" height="216" viewBox="0 0 216 216" style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Invested</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
  );
}

/* ─── Sidebar list ────────────────────────────────────────────── */
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

/* ─── CA CTA ─────────────────────────────────────────────────── */

const POPULAR = [
  { href: '/calculators/sip-calculator',    label: 'SIP Calculator' },
  { href: '/calculators/lumpsum-calculator',label: 'Lumpsum Calculator' },
  { href: '/calculators/cagr-calculator',   label: 'CAGR Calculator' },
  { href: '/calculators/swp-calculator',    label: 'SWP Calculator' },
  { href: '/calculators/fd-calculator',     label: 'FD Calculator' },
  { href: '/calculators/step-up-sip-calculator',    label: 'Step-Up SIP Calculator' },
  { href: '/calculators/sip-vs-lumpsum-calculator', label: 'SIP vs Lumpsum Calculator' },
  { href: '/calculators/real-return-calculator',    label: 'Real Return Calculator' },
];
const MORE = [
  { href: '/calculators/wealth-growth-calculator',    label: 'Wealth Growth Calculator' },
  { href: '/calculators/emi-calculator',              label: 'EMI Calculator' },
  { href: '/calculators/ppf-calculator',              label: 'PPF Calculator' },
  { href: '/calculators/compound-interest-calculator',label: 'Compound Interest Calculator' },
  { href: '/calculators/inflation-adjusted-return-calculator', label: 'Inflation-Adjusted Return Calculator' },
  { href: '/calculators/nps-calculator',                        label: 'NPS Calculator' },
  { href: '/calculators/net-worth-calculator',                  label: 'Net Worth Calculator' },
];

/* ─── FAQ ─────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What is XIRR?',
    a: 'XIRR stands for Extended Internal Rate of Return. It is the single annualised rate of return that, when applied to each individual cash flow on its specific date, produces a net present value of zero across all transactions. XIRR is used to measure the actual return on investments where cash flows occur at multiple, different points in time, such as monthly SIP instalments and systematic withdrawal plans.',
  },
  {
    q: 'What is the difference between XIRR and CAGR?',
    a: 'CAGR measures the annualised return of a single lumpsum investment between one fixed start date and one fixed end date. It is only valid when there is a single cash inflow and a single cash outflow. XIRR handles multiple cash flows on different dates. For any SIP portfolio where investments are made monthly or quarterly over several years, XIRR is the correct measure of return. CAGR would give an inaccurate answer in that scenario.',
  },
  {
    q: 'What is the difference between XIRR and IRR?',
    a: 'IRR assumes cash flows occur at evenly spaced, regular intervals, typically at the end of each year. XIRR removes that restriction and allows cash flows to occur on any specific calendar date. For SIP investments where the exact transaction date matters, XIRR is more precise than IRR. In Microsoft Excel, XIRR requires both a values column and a corresponding dates column, while IRR only requires a values column.',
  },
  {
    q: 'Why do mutual fund returns use XIRR and not CAGR?',
    a: 'Because each SIP instalment is invested on a different date, it has a different time horizon. A monthly SIP running for five years has 60 different investment dates. CAGR cannot account for this timing because it is designed for a single initial investment. XIRR accounts for every instalment date individually, making it the only mathematically accurate way to measure the total return on a multi-instalment portfolio.',
  },
  {
    q: 'Is a higher XIRR always better?',
    a: 'Generally yes, a higher XIRR indicates a better annualised return. However, XIRR does not measure risk or volatility. A portfolio with a high XIRR may have experienced sharp drawdowns during the holding period. When comparing two investments, XIRR should be evaluated alongside other metrics such as standard deviation and maximum drawdown to assess risk-adjusted performance.',
  },
  {
    q: 'Can XIRR be negative?',
    a: 'Yes. If the final portfolio value is less than what you would have earned at a zero percent return, the XIRR will be negative. This occurs when your portfolio has declined in value and the current worth is lower than the present value of all the invested amounts. Negative XIRR indicates that the investment has destroyed value on an annualised basis after accounting for the timing of each instalment.',
  },
  {
    q: 'What XIRR is considered good for a SIP in India?',
    a: 'For equity mutual fund SIPs in India, an XIRR of 12 to 15 percent over a 10-year period is generally considered good. The Nifty 50 has delivered approximately 11 to 13 percent annualised returns over 10-year periods. Smallcap and midcap fund SIPs have historically produced 15 to 20 percent XIRR over long periods, accompanied by higher volatility. Debt fund SIPs typically generate 6 to 8 percent XIRR.',
  },
  {
    q: 'How do mutual fund CAS statements calculate XIRR?',
    a: 'Consolidated Account Statements from CAMS or KFintech calculate XIRR by treating every purchase transaction, including SIP instalments, switch-ins, and additional lumpsum purchases, as a negative cash flow on its transaction date. The current portfolio value is treated as a positive cash flow on the date of the statement. The XIRR function then finds the single rate that makes the net present value of all those cash flows equal to zero.',
  },
  {
    q: 'Can XIRR be calculated without a calculator?',
    a: 'XIRR cannot be solved algebraically for portfolios with more than a few cash flows. It requires iterative numerical computation using methods such as Newton-Raphson. In practice, investors use the XIRR function in Microsoft Excel, Google Sheets, or an online calculator to compute the result. The formula in Excel is =XIRR(values, dates), where values is a column of cash flows with investments as negative numbers and the current value as a positive number.',
  },
  {
    q: 'What is the XIRR formula in Excel?',
    a: 'The Excel syntax is =XIRR(values, dates, [guess]). The values range must contain the investment amounts as negative numbers and the final portfolio value as a positive number. The dates range must contain the corresponding date for each cash flow in the format DD-MM-YYYY or DD/MM/YYYY. The optional guess parameter is the starting estimate for the rate, defaulting to 0.1 (10 percent). Example: =XIRR(B2:B38, C2:C38) calculates the XIRR for 37 cash flows listed in column B with corresponding dates in column C.',
  },
  {
    q: 'Does SEBI require mutual funds to send me a statement showing my actual returns?',
    a: 'Yes. SEBI mandates a Consolidated Account Statement for every investor who has made at least one transaction in a month, sent by the registrar on or before the 10th of the following month. If no transaction occurred, a statement is still sent half-yearly. This statement is the official, regulator-mandated record of your holdings and returns across all your mutual fund folios.',
  },
  {
    q: 'Is the XIRR shown in my mutual fund CAS the same as this calculator\'s result?',
    a: 'It should match closely if you enter the same instalment amount, frequency, duration, and current value. Small differences can appear if your actual SIP amount changed partway through, if you made additional lumpsum purchases or partial withdrawals, or if your registrar rounds the exact transaction dates slightly differently than the evenly spaced dates this calculator assumes.',
  },
  {
    q: 'Does a mutual fund scheme\'s risk level affect how I should read its XIRR?',
    a: 'Yes. SEBI requires every scheme to disclose a Riskometer rating, updated monthly, ranging up to "Very High Risk." A scheme with a high XIRR but a Very High risk rating carried more volatility to get there than one with a similar XIRR at a lower risk level. XIRR alone does not show that difference, so check the scheme\'s current risk label alongside its return.',
  },
  {
    q: 'Can I compare the XIRR of two different types of mutual funds fairly?',
    a: 'Only within the same category. SEBI\'s scheme categorisation rules group every mutual fund into one of five broad categories (equity, debt, hybrid, solution-oriented, and other) and standardised sub-categories within them, specifically so similar schemes can be compared on a like-for-like basis. Comparing the XIRR of an equity fund against a debt fund is not a fair comparison, since they carry fundamentally different risk and return profiles.',
  },
  {
    q: 'Who regulates how mutual funds in India calculate and report returns?',
    a: 'The Securities and Exchange Board of India (SEBI) is the statutory regulator for mutual funds, setting the rules for account statements, risk disclosure, and scheme categorisation. The Association of Mutual Funds in India (AMFI) is the industry body that mutual fund registrars like CAMS and KFintech operate under when generating the statements investors receive.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. All calculators are free to use, with a free account available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.',
  },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ─── Main component ──────────────────────────────────────────── */

export default function XIRRCalculatorClient({ region = 'in' }: { region?: string }) {
  const defaultSettings = { sipAmount: 10000, frequency: 'monthly' as Freq, durationYears: 3, finalValue: 450000, showTable: false };
  const { settings, updateSettings } = useCalculatorSettings('xirr-calculator', defaultSettings);
  const { sipAmount, frequency, durationYears, finalValue, showTable } = settings;
  const setSipAmount = (v: any) => updateSettings({ sipAmount: typeof v === 'function' ? v(settings.sipAmount) : v });
  const setFrequency = (v: Freq) => updateSettings({ frequency: v });
  const setDurationYears = (v: any) => updateSettings({ durationYears: typeof v === 'function' ? v(settings.durationYears) : v });
  const setFinalValue = (v: any) => updateSettings({ finalValue: typeof v === 'function' ? v(settings.finalValue) : v });
  const setShowTable = (v: boolean | ((prev: boolean) => boolean)) => updateSettings({ showTable: typeof v === 'function' ? v(settings.showTable) : v });
        const [mobile,        setMobile]        = useState(false);
  
  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const { ppy } = FREQ[frequency];
  const periodsCount  = durationYears * ppy;
  const daysPerPeriod = 365 / ppy;
  const totalInvested = periodsCount * sipAmount;
  const gain          = finalValue - totalInvested;
  const absReturn     = totalInvested > 0 ? (gain / totalInvested) * 100 : 0;
  const prinPct       = finalValue > 0 ? Math.round((totalInvested / finalValue) * 100) : 50;
  const returnsPct    = 100 - prinPct;

  /* ─── Cash flows ────────────────────────────────────────────── */
  const cashflows = useMemo(() => [
    ...Array.from({ length: periodsCount }, (_, i) => ({
      amount:    -sipAmount,
      dayOffset: i * daysPerPeriod,
    })),
    { amount: finalValue, dayOffset: periodsCount * daysPerPeriod },
  ], [sipAmount, periodsCount, daysPerPeriod, finalValue]);

  /* ─── XIRR ──────────────────────────────────────────────────── */
  const xirr = useMemo(() => calcXIRR(cashflows), [cashflows]);

  /* ─── Year-by-year projection ───────────────────────────────── */
  const growthRows = useMemo(() => {
    if (!xirr) return [];
    const startYear = new Date().getFullYear();
    return Array.from({ length: durationYears }, (_, idx) => {
      const yr        = idx + 1;
      const targetDay = yr * 365;
      const investedSoFar = Math.min(
        Math.ceil(targetDay / daysPerPeriod),
        periodsCount
      ) * sipAmount;
      const value = yr === durationYears
        ? finalValue
        : cashflows
            .filter(cf => cf.amount < 0 && cf.dayOffset <= targetDay)
            .reduce((sum, cf) => {
              const t = (targetDay - cf.dayOffset) / 365;
              return sum + Math.abs(cf.amount) * Math.pow(1 + xirr / 100, t);
            }, 0);
      return { year: startYear + yr, invested: investedSoFar, value, gain: value - investedSoFar };
    });
  }, [xirr, durationYears, cashflows, sipAmount, periodsCount, daysPerPeriod, finalValue]);

  /* ─── Article style constants ───────────────────────────────── */
  const h2    = { fontSize: mobile ? 18 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const h3    = { fontSize: 16, fontWeight: 600, color: C.ink, margin: '0 0 6px' } as React.CSSProperties;
  const p     = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec   = { margin: '0 0 40px' } as React.CSSProperties;
  const tdL   = { padding: '11px 16px', fontSize: 14, color: C.ink2, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
  const tdR   = { padding: '11px 16px', fontSize: 14, color: C.ink, fontWeight: 500, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
  const thS   = { padding: '10px 16px', fontSize: 12, fontWeight: 600, color: C.ink3, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const };
  const bullet = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 28px', letterSpacing: '-0.025em' }}>
          XIRR Calculator
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          {/* LEFT */}
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
                    {!mobile ? (
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Investment Details</p>
                    ) : <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  <Slider label="Instalment Amount" value={sipAmount} min={500} max={500000} step={500}
                    fmt={v => fmtC(v)} onChange={setSipAmount} compact={mobile} />

                  {/* Frequency toggle */}
                  <div style={{ marginBottom: mobile ? 18 : 40 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: mobile ? 10 : 16 }}>
                      <label style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400 }}>Investment Frequency</label>
                    </div>
                    <div style={{ display: 'flex', background: '#f4f5f6', borderRadius: 8, padding: 3 }}>
                      {(Object.entries(FREQ) as [Freq, typeof FREQ[Freq]][]).map(([f, meta]) => (
                        <button key={f} onClick={() => setFrequency(f)}
                          style={{
                            flex: 1, padding: mobile ? '5px 3px' : '5px 10px', borderRadius: 6, border: 'none',
                            background: frequency === f ? C.white : 'transparent',
                            color: frequency === f ? C.ink : C.ink3,
                            fontFamily: INTER, fontSize: mobile ? 11 : 13, fontWeight: 600,
                            cursor: 'pointer',
                            boxShadow: frequency === f ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                            transition: 'all 0.15s', whiteSpace: 'nowrap',
                          }}>
                          {mobile ? meta.short : meta.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Slider label="Investment Duration" value={durationYears} min={1} max={20} step={1}
                    fmt={v => `${v} Yr`} onChange={setDurationYears} compact={mobile} />

                  <Slider label="Final Portfolio Value" value={finalValue} min={10000} max={30000000} step={10000}
                    fmt={v => fmtC(v)} onChange={setFinalValue} compact={mobile} />
                </div>

                {/* Results panel */}
                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  {/* XIRR highlight */}
                  <div style={{ width: '100%', background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 12, padding: mobile ? '12px 16px' : '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.dark }}>Your XIRR</span>
                    <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: C.dark, letterSpacing: '-0.02em' }}>
                      {xirr !== null ? `${xirr}%` : 'N/A'}
                    </span>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: 'Total invested',  value: fmtC(totalInvested) },
                    { label: 'Final value',      value: fmtC(finalValue) },
                    { label: 'Total gain',       value: fmtC(Math.abs(gain)) },
                    { label: 'Absolute return',  value: `${absReturn.toFixed(1)}%` },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '15px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  {/* Donut: below stats on mobile, above on desktop */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 24, order: mobile ? 1 : -1 }}>
                    <DonutChart principal={totalInvested} gains={gain} />
                  </div>

                  {/* Legend */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 22, marginBottom: mobile ? 8 : 28, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Total invested</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Returns</span>
                    </div>
                  </div>

                  {/* Split bar */}
                  <div style={{ width: '100%', marginTop: mobile ? 8 : 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Invested {prinPct}%</span>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Returns {returnsPct}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${prinPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Year-by-year growth table */}
              {growthRows.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowTable(v => !v)}
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '20px 48px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.ink }}>Year-by-Year Growth</span>
                      {!mobile && <span style={{ fontSize: 13, color: C.ink3, marginLeft: 10 }}>(Compounding breakdown)</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 8 : 12, flexShrink: 0 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: C.dark, background: C.paleLime, border: `1px solid ${C.lime2}`, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {periodsCount} {FREQ[frequency].short} · {xirr !== null ? `${xirr}% XIRR` : ''}
                      </span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showTable && (
                    <div style={{ borderTop: `1px solid ${C.border}`, overflowX: 'auto', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
                      <table style={{ minWidth: 440, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead>
                          <tr style={{ background: '#f4f5f6' }}>
                            {['Year', 'Total Invested', 'Portfolio Value', 'Total Gain'].map(h => (
                              <th key={h} style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {growthRows.map((row, i) => (
                            <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                              <td style={{ padding: '13px 24px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                              <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.invested)}</td>
                              <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.value)}</td>
                              <td style={{ padding: '13px 24px', color: '#1f7a58', fontWeight: 600 }}>{fmtIN(Math.abs(row.gain))}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── ARTICLE ── */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>
            <article style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-xirr">What is XIRR?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    XIRR (Extended Internal Rate of Return) is the single annualised rate of return that makes the present value of every cash flow in a portfolio, each dated precisely, net to zero. It is the standard measure mutual fund apps and brokers use to show your SIP or recurring investment return.
                  </p>
                </div>
                <p style={p}>
                  XIRR stands for Extended Internal Rate of Return. It is the single annualised rate of return that, when applied to each individual investment on its specific date, makes the total present value of all cash flows equal to zero. In simpler terms, XIRR tells you how much your money grew per year on average, after accounting for the exact timing of every investment you made.
                </p>
                <p style={p}>
                  Every mutual fund <a href="https://investor.sebi.gov.in/consolidated_account_statement.html" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Consolidated Account Statement</a> mandated by SEBI shows an "Annualised Return" figure. That figure is XIRR, not CAGR.
                </p>
                <p style={p}>
                  <a href="https://www.amfiindia.com" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>AMFI</a>-registered registrars CAMS and KFintech compute this XIRR from every dated transaction in your account before issuing the statement.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-xirr-helps">How can this XIRR calculator help you?</h2>
                <p style={p}>
                  This calculator is designed for investors who want to evaluate the actual return on their SIP or recurring investment portfolio. It accepts four inputs: the amount invested per instalment, the investment frequency, the total duration, and the current portfolio value. The XIRR is then computed instantly using the Newton-Raphson method, which is the same algorithm used by Microsoft Excel.
                </p>
                <div>
                  {[
                    'It calculates your actual annualised return, accounting for the timing of every instalment rather than treating all investments as a single lumpsum.',
                    'It shows you the year-by-year growth of your portfolio, so you can see the compounding effect at each annual milestone.',
                    'It works for any investment frequency, whether you invest monthly, quarterly, half-yearly, or yearly.',
                    'It runs entirely in your browser, free to use, with an optional free account if you want to save your results.',
                  ].map((t, i) => (
                    <div key={i} style={bullet}>
                      <span style={{ flexShrink: 0, marginTop: 3 }}>&#8226;</span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="xirr-formula">The XIRR formula</h2>
                <p style={p}>XIRR is the value of rate r that satisfies the following equation:</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, fontFamily: 'monospace', margin: '0 0 16px', padding: '12px 0' }}>
                  {String.fromCharCode(931)} [C{String.fromCharCode(8560)} / (1 + r) ^ ((d{String.fromCharCode(8560)} - d{String.fromCharCode(8320)}) / 365)] = 0
                </p>
                <p style={{ ...p, margin: '0 0 16px' }}>The variables represent the following:</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}` }}>
                    <thead>
                      <tr>
                        <th style={{ ...thS, width: 80 }}>Variable</th>
                        <th style={thS}>Meaning</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['r',  'XIRR: the annualised rate being solved for'],
                        ['Ci', 'The cash flow amount at period i (negative for investments, positive for the final value)'],
                        ['di', 'The date of cash flow i'],
                        ['d0', 'The date of the first cash flow (start of the investment)'],
                      ].map(([v, m]) => (
                        <tr key={v}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink, fontFamily: 'monospace' }}>{v}</td>
                          <td style={tdR}>{m}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  There is no closed-form solution for r when there are more than two cash flows. The equation must be solved iteratively. Excel and this calculator use the Newton-Raphson method, which converges to the answer in a few hundred iterations.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="xirr-worked-example">Worked example of XIRR calculation</h2>
                <p style={p}>
                  Suppose an investor makes three yearly investments of Rs. 10,000 beginning on 1 January 2021, and receives Rs. 60,000 on 1 January 2024. The cash flows are:
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}` }}>
                    <thead>
                      <tr>
                        <th style={thS}>Date</th>
                        <th style={thS}>Cash Flow</th>
                        <th style={thS}>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['01 Jan 2021', 'Rs. 10,000', 'Investment (outflow)'],
                        ['01 Jan 2022', 'Rs. 10,000', 'Investment (outflow)'],
                        ['01 Jan 2023', 'Rs. 10,000', 'Investment (outflow)'],
                        ['01 Jan 2024', 'Rs. 60,000', 'Maturity amount (inflow)'],
                      ].map(([date, amt, type]) => (
                        <tr key={date} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={tdL}>{date}</td>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{amt}</td>
                          <td style={tdR}>{type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Total invested is Rs. 30,000. Final value is Rs. 60,000. Absolute return is 100 percent. The XIRR for this scenario works out to approximately 39 percent per annum. The high XIRR reflects the fact that the earliest investment of Rs. 10,000 had only three years to grow, while the last investment had only one year. Each instalment contributed differently based on when it was deployed.
                </p>
                <p style={{ ...p, fontFamily: 'monospace', fontWeight: 600, color: C.ink }}>
                  XIRR in Excel: =XIRR(B2:B5, C2:C5)
                </p>
                <p style={p}>
                  B2:B5 holds the four cash flows (10000, 10000, 10000, -60000), and C2:C5 holds the four dates above in the same row order.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="xirr-vs-cagr">XIRR versus CAGR</h2>
                <p style={p}>
                  CAGR measures the annualised return between two fixed points in time for a single investment. If Rs. 1 lakh grew to Rs. 2 lakh in 5 years, the CAGR is 14.87 percent per annum. This is straightforward when there is only one initial cash flow.
                </p>
                <p style={p}>
                  For a SIP, using CAGR produces an incorrect result. If you invested Rs. 5,000 per month for 5 years and your portfolio is now worth Rs. 4 lakh, a naive CAGR calculation treating Rs. 3 lakh as the starting amount and Rs. 4 lakh as the end would give a misleading figure. The first instalment had 5 years to compound, but the last instalment was deployed just one month ago. XIRR accounts for every single instalment date, making it the accurate measure for SIP returns.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}` }}>
                    <thead>
                      <tr>
                        <th style={{ ...thS, width: '33%' }}></th>
                        <th style={thS}>XIRR</th>
                        <th style={thS}>CAGR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Designed for',            'Multiple cash flows at different dates', 'Single lumpsum investment'],
                        ['Accounts for timing',      'Yes: each cash flow dated precisely', 'No: single start and end date'],
                        ['Used for SIP returns',     'Yes: the correct measure', 'No: gives inaccurate result'],
                        ['Used for lumpsum returns', 'Works but same as CAGR',   'Yes: the standard measure'],
                        ['Solvable by hand',         'No: requires iteration',  'Yes: simple formula'],
                      ].map((row, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{row[0]}</td>
                          <td style={tdL}>{row[1]}</td>
                          <td style={tdL}>{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Once you know your actual annualised return from XIRR, use that figure as the return rate in the <Link href="/calculators/wealth-growth-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Wealth Growth Calculator</Link> to project your corpus forward at that same pace, combined with any existing wealth.
                </p>
              </div>

              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>CAGR Calculator</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Made a single lumpsum investment instead of a SIP? Get the annualised return for that instead.</p>
                </div>
                <Link className="fx-btn" href="/calculators/cagr-calculator" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
              </div>

              <div style={sec}>
                <h2 style={h2} id="when-to-use-xirr">When should you use XIRR?</h2>
                <p style={p}>
                  Use XIRR any time your money went in or came out on more than one date, such as a SIP, a portfolio with top-ups or partial withdrawals, or two investments made months apart.
                </p>
                <h3 style={h3}>SIP and recurring investments</h3>
                <p style={p}>
                  Use XIRR whenever you are evaluating a portfolio built through regular investments over time. Monthly SIPs, quarterly contributions, or any recurring investment plan requires XIRR to measure returns accurately. The <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SIP Calculator</Link> uses the XIRR-equivalent formula internally to project returns.
                </p>
                <h3 style={h3}>Checking your mutual fund portfolio return</h3>
                <p style={p}>
                  When your fund house or broker app shows your portfolio return as a percentage, that number is XIRR. To verify or recalculate it independently, enter the total amount invested per instalment, the frequency, the duration, and your current portfolio value into this calculator.
                </p>
                <h3 style={h3}>Comparing two SIP investments</h3>
                <p style={p}>
                  If you want to compare two funds where you made the same SIP amount and duration but received different final values, XIRR gives you a like-for-like annualised return for each, making the comparison accurate.
                </p>
                <h3 style={h3}>When to use CAGR instead</h3>
                <p style={{ ...p, margin: 0 }}>
                  Use the <Link href="/calculators/cagr-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>CAGR Calculator</Link> when you made a single lumpsum investment at one point in time and want the annualised return up to today or a future date, with no interim investments or withdrawals.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="xirr-in-excel">How to calculate XIRR in Microsoft Excel</h2>
                <p style={p}>
                  Excel has a built-in XIRR function that calculates the result directly. The following steps apply to any SIP portfolio:
                </p>
                <div>
                  {[
                    'In column A, list all your investment dates in chronological order, followed by today\'s date in the last row.',
                    'In column B, enter each investment amount as a negative number (outflow). In the last row, enter your current portfolio value as a positive number (inflow).',
                    'In an empty cell, type the formula: =XIRR(B1:B37, A1:A37) where B1:B37 are your cash flow amounts and A1:A37 are the corresponding dates. Adjust the range to match your actual number of rows.',
                    'Press Enter. Excel returns the XIRR as a decimal. Multiply by 100 or format the cell as a percentage to display it correctly.',
                    'If Excel returns a #NUM! error, the cash flows may not have a valid solution or the guess rate needs adjustment. Try adding a third argument such as =XIRR(B1:B37, A1:A37, 0.15) to provide a starting estimate.',
                  ].map((t, i) => (
                    <div key={i} style={bullet}>
                      <span style={{ flexShrink: 0, marginTop: 3 }}>&#8226;</span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to use this XIRR calculator</h2>
                <p style={p}>The calculator requires four inputs:</p>
                <div>
                  {[
                    { label: 'Instalment Amount', text: 'The fixed amount you invest in each instalment. Use the slider or click the value to type directly.' },
                    { label: 'Investment Frequency', text: 'Select how often you make each investment: Monthly, Quarterly, Half-Yearly, or Yearly.' },
                    { label: 'Investment Duration', text: 'The total number of years you have been investing.' },
                    { label: 'Final Portfolio Value', text: 'The current or maturity value of your portfolio. This is the amount you received or your portfolio is worth today.' },
                  ].map((it, i) => (
                    <div key={i} style={bullet}>
                      <span style={{ flexShrink: 0, marginTop: 3 }}>&#8226;</span>
                      <span><strong>{it.label}:</strong> {it.text}</span>
                    </div>
                  ))}
                </div>
                <p style={{ ...p, margin: '12px 0 0' }}>
                  The XIRR, total gain, absolute return, and donut chart update instantly as you adjust any input. Expand the year-by-year growth table to see how your portfolio compounded at the calculated XIRR rate across each year.
                </p>
              </div>


              <div style={{ margin: '0 0 40px' }}>
                <h2 style={h2} id="faq">Frequently asked questions</h2>
            <FAQ />
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.xirr-sidebar::-webkit-scrollbar{width:5px}.xirr-sidebar::-webkit-scrollbar-track{background:transparent}.xirr-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.xirr-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="xirr-sidebar" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <SidebarList title="Popular Calculators" items={POPULAR} />
                <SidebarList title="More Calculators" items={MORE} />
            </div>
          </aside>

        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/sip-calculator|SIP', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/cagr-calculator|CAGR', '/calculators/xirr-calculator|XIRR', '/calculators/swp-calculator|SWP', '/calculators/emi-calculator|EMI', '/calculators/fd-calculator|FD', '/calculators/ppf-calculator|PPF', '/calculators/compound-interest-calculator|Compound Int.'] },
        { hd: 'Topics', links: ['/#|Mutual Funds', '/#|Home Loans', '/#|Fixed Deposits', '/#|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

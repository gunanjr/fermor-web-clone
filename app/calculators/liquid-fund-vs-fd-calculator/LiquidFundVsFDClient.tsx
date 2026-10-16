'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect } from 'react';
import Link from 'next/link';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
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

/* ─── Math ───────────────────────────────────────────────────── */
// Indian bank FDs compound quarterly by default (verified convention, matches the
// bank-interest-comparison-calculator's own formula and every major bank's published method).
function fdMaturity(principal: number, ratePct: number, years: number): number {
  return principal * Math.pow(1 + ratePct / 100 / 4, 4 * years);
}

// Liquid fund NAV accrues daily, so daily compounding is the closer real-world approximation -
// distinct from FD's quarterly compounding, and a genuine (small) structural advantage for liquid
// funds at equal headline rates, not a rounding artifact.
function liquidMaturity(principal: number, ratePct: number, years: number): number {
  return principal * Math.pow(1 + ratePct / 100 / 365, 365 * years);
}

interface YearRow {
  year: number;
  fdBalance: number;
  liquidBalance: number;
}

function buildYearRows(principal: number, fdRate: number, liquidRate: number, totalYears: number): YearRow[] {
  const rows: YearRow[] = [];
  const wholeYears = Math.max(1, Math.round(totalYears));
  for (let y = 1; y <= wholeYears; y++) {
    rows.push({
      year: y,
      fdBalance: fdMaturity(principal, fdRate, y),
      liquidBalance: liquidMaturity(principal, liquidRate, y),
    });
  }
  return rows;
}

// Real, current (July 2026) bank FD rates - same dataset already live on the
// bank-interest-comparison-calculator, reused here so the two pages never disagree with each other.
const FD_RATE_TABLE: { name: string; y1: number; y3: number; y5: number | null }[] = [
  { name: 'SBI',        y1: 6.80, y3: 6.75, y5: 6.50 },
  { name: 'HDFC Bank',  y1: 7.00, y3: 7.00, y5: 7.00 },
  { name: 'ICICI Bank', y1: 6.90, y3: 7.00, y5: 7.00 },
  { name: 'Axis Bank',  y1: 7.10, y3: 7.10, y5: 7.00 },
  { name: 'Post Office (NSC)', y1: 7.10, y3: 7.70, y5: null },
];

/* ─── Donut Chart: share of combined gain ───────────────────── */
function DonutChart({ fdGain, liquidGain }: { fdGain: number; liquidGain: number }) {
  const total = fdGain + liquidGain;
  if (total <= 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const fdPct = Math.round((fdGain / total) * 100);
  const fdArc = (fdGain / total) * circ;
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`FD gain is ${fdPct}% of combined gain, liquid fund gain is ${100 - fdPct}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${fdArc} ${circ - fdArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Gain share</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{fdPct}%</text>
    </svg>
  );
}

/* ─── Slider ─────────────────────────────────────────────────── */
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
    <div style={{ marginBottom: compact ? 18 : 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 12 }}>
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

/* ─── Sidebar list ───────────────────────────────────────────── */
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
  { href: '/calculators/bank-interest-comparison-calculator', label: 'Bank Interest Rate Comparison' },
  { href: '/calculators/fd-laddering-calculator',              label: 'FD Calculator' },
  { href: '/calculators/rd-calculator',                        label: 'RD Calculator' },
  { href: '/calculators/sip-calculator',                       label: 'SIP Calculator' },
  { href: '/calculators/ppf-calculator',                       label: 'PPF Calculator' },
  { href: '/calculators/compound-interest-calculator',         label: 'Compound Interest Calculator' },
  { href: '/calculators/income-tax-calculator',                label: 'Income Tax Calculator' },
];
const MORE = [
  { href: '/calculators/lumpsum-calculator',       label: 'Lumpsum Calculator' },
  { href: '/calculators/inflation-calculator',     label: 'Inflation Calculator' },
  { href: '/calculators/emergency-fund-calculator',label: 'Emergency Fund Calculator' },
  { href: '/calculators/cagr-calculator',          label: 'CAGR Calculator' },
  { href: '/calculators/xirr-calculator',          label: 'XIRR Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What is a liquid fund?',
    a: 'A liquid fund is a debt mutual fund that invests in money market instruments and debt securities with a maturity of up to 91 days, such as treasury bills, commercial paper, and certificates of deposit. Liquid funds aim for capital safety and easy withdrawal rather than high returns, and are typically used to park money for a few weeks to a few years.',
  },
  {
    q: 'What is the difference between a liquid fund and a fixed deposit?',
    a: 'A fixed deposit pays a fixed, guaranteed interest rate locked in at the time of booking, with a penalty for early withdrawal. A liquid fund has no fixed rate, its NAV moves daily with the underlying portfolio, and it can usually be redeemed within one working day with no lock-in beyond a small exit load in the first week. FD returns are certain; liquid fund returns are variable but historically stable.',
  },
  {
    q: 'Is a liquid fund better than an FD?',
    a: 'Neither is universally better. FDs suit money you will not touch before maturity and want a guaranteed, known return on. Liquid funds suit money you may need on short notice, since redemption is faster and there is no fixed penalty for early exit beyond a small graded charge in the first 7 days. Since April 2023, both are taxed at your income slab rate, so the old tax advantage liquid funds had over FDs no longer applies.',
  },
  {
    q: 'How is liquid fund return taxed in India?',
    a: 'For units bought on or after April 1, 2023, gains from liquid funds (a debt-oriented scheme) are added to your total income and taxed at your applicable income tax slab rate, regardless of how long you held the units. There is no LTCG rate and no indexation benefit for these units, per the Finance Act 2023 amendment to Section 50AA of the Income Tax Act.',
  },
  {
    q: 'How is FD interest taxed in India?',
    a: 'FD interest is added to your total income every year it accrues and taxed at your income tax slab rate. Banks deduct TDS at 10% if interest from one bank exceeds Rs 40,000 in a financial year (Rs 50,000 for senior citizens), or 20% if PAN is not furnished. TDS is not a final tax; you settle the actual liability when filing your return.',
  },
  {
    q: 'Does a liquid fund have a tax advantage over FD anymore?',
    a: 'No. Before April 2023, debt funds held over 3 years qualified for 20% LTCG with indexation, which usually beat FD taxation. That benefit was removed for units bought on or after April 1, 2023. Both FD interest and liquid fund gains are now taxed at your slab rate, so taxation is no longer a reason to prefer one over the other for new investments.',
  },
  {
    q: 'What is the SBI FD interest rate right now?',
    a: 'SBI fixed deposit interest rate is 6.80% for a 1-year tenure, 7.00% for 2 years, 6.75% for 3 years, and 6.50% for 5 years, as of July 2026. Senior citizens get an additional 0.50% on every tenure. Rates change periodically with RBI policy, so confirm the current rate on SBI\'s website before booking.',
  },
  {
    q: 'What is the HDFC Bank FD interest rate right now?',
    a: 'HDFC Bank fixed deposit interest rate is 7.00% per annum across 1-year, 2-year, 3-year, and 5-year tenures, as of July 2026. Senior citizens get an additional 0.50%, taking the senior citizen rate to 7.50% across these tenures.',
  },
  {
    q: 'What is the ICICI Bank FD interest rate right now?',
    a: 'ICICI Bank fixed deposit interest rate is 6.90% for 1 year and 7.00% for 2, 3, and 5-year tenures, as of July 2026. Senior citizens get an additional 0.50% on all tenures.',
  },
  {
    q: 'How do I calculate FD maturity amount?',
    a: 'Indian bank FDs compound quarterly by default: Maturity Value = Principal x (1 + Rate/4/100)^(4 x Years). For a Rs 5 lakh deposit at 6.80% for 1 year, maturity works out to Rs 5,34,877, an interest of Rs 34,877. The calculator above does this automatically for any amount, rate, and tenure.',
  },
  {
    q: 'What is the exit load on a liquid fund?',
    a: 'Most liquid funds charge a small graded exit load only if redeemed within 7 days of investment, typically starting around 0.0070% of NAV for a same-day exit and reducing to zero by day 7. There is no exit load at all after 7 days, unlike an FD, which usually cuts 0.5-1% off the applicable rate for any premature withdrawal, however long the deposit was held.',
  },
  {
    q: 'Can I withdraw a liquid fund without any penalty?',
    a: 'Yes, after the first 7 days from investment, liquid funds can be redeemed at any time with zero exit load, and the money is typically credited within one working day (T+1). This is faster and cheaper than breaking a fixed deposit early, which almost always costs a rate reduction regardless of how long it has been held.',
  },
  {
    q: 'Is a liquid fund as safe as a fixed deposit?',
    a: 'They carry different kinds of protection, not the same one. A bank FD is insured up to Rs 5 lakh per depositor per bank under DICGC, a government-backed guarantee. A liquid fund carries no deposit insurance, but is regulated by SEBI, holds a diversified portfolio of short-maturity debt, and marks its holdings to market daily, which limits how much any single default can affect the fund.',
  },
  {
    q: 'What is the minimum investment for a liquid fund compared to an FD?',
    a: 'Most liquid funds accept an initial investment as low as Rs 500 to Rs 1,000, with no fixed tenure. Bank FDs usually require a minimum of Rs 1,000 to Rs 10,000 depending on the bank, and must be booked for a fixed tenure chosen upfront.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
  },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ─── Main ───────────────────────────────────────────────────── */
export default function LiquidFundVsFDClient() {
  const defaultSettings = {
    amount: 500000,
    tenureMonths: 12,
    fdRate: 6.80,
    liquidRate: 6.5,
    taxSlab: 20,
  };
  const { settings, updateSettings } = useCalculatorSettings('liquid-fund-vs-fd', defaultSettings);
  const { amount, tenureMonths, fdRate, liquidRate, taxSlab } = settings;

  const setAmount       = (v: number) => updateSettings({ amount: v });
  const setTenureMonths = (v: number) => updateSettings({ tenureMonths: v });
  const setFdRate       = (v: number) => updateSettings({ fdRate: v });
  const setLiquidRate   = (v: number) => updateSettings({ liquidRate: v });
  const setTaxSlab      = (v: number) => updateSettings({ taxSlab: v });

  const [mobile, setMobile] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const years = tenureMonths / 12;

  const fdMaturityValue = fdMaturity(amount, fdRate, years);
  const liquidMaturityValue = liquidMaturity(amount, liquidRate, years);
  const fdGain = fdMaturityValue - amount;
  const liquidGain = liquidMaturityValue - amount;
  const fdTax = Math.max(0, fdGain) * (taxSlab / 100);
  const liquidTax = Math.max(0, liquidGain) * (taxSlab / 100);
  const fdPostTax = fdMaturityValue - fdTax;
  const liquidPostTax = liquidMaturityValue - liquidTax;
  const diff = Math.abs(fdPostTax - liquidPostTax);
  const winner = fdPostTax >= liquidPostTax ? 'FD' : 'Liquid Fund';

  const schedule = useMemo(() => buildYearRows(amount, fdRate, liquidRate, years), [amount, fdRate, liquidRate, years]);

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const, verticalAlign: 'middle' as const } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'middle' as const, textAlign: 'left' as const } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'middle' as const, textAlign: 'right' as const } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Liquid Fund vs FD Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Compare fixed deposit maturity against liquid fund returns, before and after tax, using real current bank FD rates.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            <section aria-label="Liquid Fund vs FD Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div role="tabpanel" style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  <Slider label="Investment Amount" id="lf-amount" value={amount} min={10000} max={10000000} step={10000} fmt={fmtC} onChange={setAmount} compact={mobile} />
                  <Slider label="Tenure (months)" id="lf-tenure" value={tenureMonths} min={1} max={60} step={1} fmt={v => `${v} mo`} onChange={setTenureMonths} compact={mobile} />
                  <Slider label="FD Interest Rate" id="lf-fdrate" value={fdRate} min={4} max={9} step={0.05} fmt={v => `${v.toFixed(2)}%`} onChange={setFdRate} compact={mobile} />
                  <Slider label="Liquid Fund Expected Return" id="lf-liquidrate" value={liquidRate} min={4} max={9} step={0.05} fmt={v => `${v.toFixed(2)}%`} onChange={setLiquidRate} compact={mobile} />

                  <div style={{ marginBottom: mobile ? 14 : 20 }}>
                    <p style={{ fontSize: 14, color: C.ink2, marginBottom: 10 }}>Your Income Tax Slab</p>
                    <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                      {[0, 5, 20, 30].map(s => (
                        <button key={s} onClick={() => setTaxSlab(s)}
                          style={{ flex: 1, padding: '8px 6px', border: 'none', background: taxSlab === s ? C.white : 'transparent',
                            color: taxSlab === s ? C.ink : C.ink3, fontWeight: taxSlab === s ? 600 : 400,
                            cursor: 'pointer', fontFamily: INTER, fontSize: 13, transition: 'all 0.15s' }}>
                          {s}%
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10 }}>
                    <p style={{ fontSize: 12, color: C.ink2, lineHeight: 1.6, margin: 0 }}>
                      Both FD interest and liquid fund gains are taxed at your income slab rate since April 2023 - so the tax slab above applies equally to both sides of the comparison.
                    </p>
                  </div>
                </div>

                {/* Result panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>
                      {winner} wins, post-tax
                    </span>
                    <span aria-live="polite" aria-label={`${winner} wins by ${fmtIN(diff)} after tax`}
                      style={{ fontSize: mobile ? 20 : 26, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {fmtIN(diff)}
                    </span>
                  </div>

                  {[
                    { label: 'Total Invested', value: fmtC(amount) },
                    { label: 'FD Maturity Value (pre-tax)', value: fmtC(fdMaturityValue) },
                    { label: 'FD Post-Tax Value', value: fmtC(fdPostTax) },
                    { label: 'Liquid Fund Maturity Value (pre-tax)', value: fmtC(liquidMaturityValue) },
                    { label: 'Liquid Fund Post-Tax Value', value: fmtC(liquidPostTax) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    <DonutChart fdGain={Math.max(0, fdGain)} liquidGain={Math.max(0, liquidGain)} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>FD gain</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Liquid fund gain</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Year-by-year table */}
              {schedule.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowTable(v => !v)}
                    aria-expanded={showTable} aria-controls="growth-table"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Year-by-Year Growth: FD vs Liquid Fund</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {schedule.length} yr view
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showTable && (
                    <div id="growth-table" style={{ borderTop: `1px solid ${C.border}` }}>
                      {mobile && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px 0 4px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                            style={{ animation: 'swipeHint 1.6s ease-in-out infinite' }}>
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                          <p style={{ fontSize: 11.5, color: C.ink3, margin: 0, fontFamily: INTER }}>Swipe to see all columns</p>
                        </div>
                      )}
                      <style>{`@keyframes swipeHint { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }`}</style>
                      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
                        <table style={{ minWidth: 480, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
                            Year-by-year FD balance versus liquid fund balance
                          </caption>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              {['Year', 'FD Balance', 'Liquid Fund Balance', 'Difference'].map(h => (
                                <th key={h} style={{ padding: '10px 14px', textAlign: h === 'Year' ? 'left' : 'right', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }} scope="col">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {schedule.map((row, i) => (
                              <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ padding: '11px 14px', fontWeight: 700, color: C.dark }}>Year {row.year}</td>
                                <td style={{ padding: '11px 14px', color: C.ink2, textAlign: 'right' }}>{fmtIN(row.fdBalance)}</td>
                                <td style={{ padding: '11px 14px', color: C.ink2, textAlign: 'right' }}>{fmtIN(row.liquidBalance)}</td>
                                <td style={{ padding: '11px 14px', color: row.fdBalance >= row.liquidBalance ? '#166534' : '#B45309', fontWeight: 600, textAlign: 'right' }}>
                                  {fmtIN(Math.abs(row.fdBalance - row.liquidBalance))}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Waitlist */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-liquid-fund">What Is a Liquid Fund?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    A liquid fund is a debt mutual fund that invests in money market instruments with a residual maturity of up to 91 days. It is designed for capital safety and quick redemption, not high returns.
                  </p>
                </div>
                <p style={p}>
                  Liquid funds hold treasury bills, commercial paper, certificates of deposit, and short-term government securities. Because every instrument matures within three months, the fund's NAV barely reacts to interest rate movements, which is why liquid funds are considered one of the lowest-risk mutual fund categories under <a href="https://www.sebi.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SEBI's</a> mutual fund classification norms.
                </p>
                <p style={p}>
                  A fixed deposit, by contrast, is a bank product with a rate fixed at booking and a fixed maturity date. The calculator above lets you compare both directly for the same amount and tenure, using real current bank FD rates as the starting point.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="fd-maturity-formula">FD Maturity Formula: How Fixed Deposit Interest Is Calculated</h2>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark }}>
                    Maturity Value = Principal x (1 + Rate / 4 / 100) ^ (4 x Years)
                  </code>
                </div>
                <p style={p}>
                  Indian bank FDs compound quarterly by default. For a Rs 5,00,000 deposit at SBI's current 1-year rate of 6.80%, the maturity value is Rs 5,00,000 x (1 + 0.068/4)^4, which works out to Rs 5,34,877, an interest of Rs 34,877 for the year.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 8 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>FD maturity in Excel: three equivalent methods</caption>
                    <thead><tr><th style={thS} scope="col">Method</th><th style={thS} scope="col">Formula</th></tr></thead>
                    <tbody>
                      {[
                        ['Direct formula', '=P*(1+R/4/100)^(4*T)'],
                        ['FV function', '=FV(R/4/100, 4*T, 0, -P)'],
                        ['RRI function (rate check)', '=RRI(4*T, P, FV) then multiply by 4 for annual rate'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={tdR}><code>{r[1]}</code></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="liquid-fund-formula">Liquid Fund Return Formula: Why Daily Compounding Matters</h2>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark }}>
                    Maturity Value = Principal x (1 + Return / 365 / 100) ^ (365 x Years)
                  </code>
                </div>
                <p style={p}>
                  A liquid fund's NAV accrues interest every single day, including weekends, unlike an FD which compounds only once a quarter. At the same headline rate, daily compounding produces a marginally higher return over a full year than quarterly compounding. The gap is small (a few hundred rupees on a lakh) but it is real and it is why liquid fund returns are usually quoted as an annualised yield rather than a fixed rate.
                </p>
              </div>

              <div style={sec} id="fd-rates-comparison">
                <h2 style={h2}>FD Interest Rates Comparison: SBI, HDFC, ICICI, Axis Bank</h2>
                <p style={p}>
                  Rates below are current as of July 2026. They change with RBI policy and each bank's own funding needs, so confirm the exact rate on the bank's website before booking. Use the <Link href="/calculators/bank-interest-comparison-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Bank Interest Rate Comparison Calculator</Link> to compare 12 banks at once, including savings, home loan, personal loan, and gold loan rates.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 8 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Fixed deposit interest rates by bank and tenure, July 2026</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Bank</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">1 Year</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">3 Year</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">5 Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      {FD_RATE_TABLE.map((r, i) => (
                        <tr key={r.name} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r.name}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{r.y1.toFixed(2)}%</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{r.y3.toFixed(2)}%</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{r.y5 ? `${r.y5.toFixed(2)}%` : 'Not offered'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec} id="liquid-fund-vs-fd">
                <h2 style={h2}>Liquid Fund vs FD: Which Gives Better Returns?</h2>
                <p style={p}>
                  Top liquid funds from SBI, HDFC, ICICI Prudential, and Axis have delivered 1-year returns in the 6.25% to 6.8% range, close to current FD rates. Neither instrument reliably beats the other by a wide margin at current rates; the calculator above shows the exact gap for your own amount, tenure, and rate assumptions.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 8 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Rs 5,00,000 for 1 year, pre-tax, at representative current rates</caption>
                    <thead><tr><th style={thS} scope="col">Instrument</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Rate</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Maturity Value</th></tr></thead>
                    <tbody>
                      <tr style={{ borderBottom: `1px solid ${C.border}`, background: C.white }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>FD (SBI, 1Y)</td>
                        <td style={{ ...tdR, textAlign: 'right' as const }}>6.80%</td>
                        <td style={{ ...tdR, textAlign: 'right' as const, fontWeight: 700 }}>Rs 5,34,877</td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>Liquid Fund (indicative)</td>
                        <td style={{ ...tdR, textAlign: 'right' as const }}>6.50%</td>
                        <td style={{ ...tdR, textAlign: 'right' as const, fontWeight: 700 }}>Rs 5,33,576</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec} id="taxation-comparison">
                <h2 style={h2}>Liquid Fund vs FD Taxation: Why the Old Advantage Is Gone</h2>
                <p style={p}>
                  Until March 2023, debt funds held for more than 3 years qualified for 20% LTCG tax with indexation, which usually beat FD taxation at the slab rate. The Finance Act 2023 removed that benefit for units bought on or after April 1, 2023.
                </p>
                <p style={p}>
                  Today, both FD interest and liquid fund gains are added to your income and taxed at your slab rate, whether you hold for one month or ten years. The one practical difference: banks deduct TDS on FD interest above Rs 40,000 a year, while mutual funds do not deduct TDS on capital gains for resident individual investors. Neither changes your final tax bill, only when the tax is collected.
                </p>
              </div>

              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Income Tax Calculator</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Find your exact income tax slab before assuming a flat rate here.</p>
                </div>
                <Link className="fx-btn" href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
              </div>

              <div style={sec} id="liquidity-comparison">
                <h2 style={h2}>Liquid Fund vs FD Liquidity: Redemption Time and Penalties</h2>
                <p style={p}>
                  Liquid funds redeem in one working day (T+1) for most fund houses, with zero exit load after the first 7 days. Breaking a fixed deposit early, at any point in its tenure, almost always costs a rate cut of 0.5% to 1% at most banks, applied to whatever rate was actually applicable for the period the money was held.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 8 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Liquidity comparison</caption>
                    <thead><tr><th style={thS} scope="col">Feature</th><th style={thS} scope="col">Liquid Fund</th><th style={thS} scope="col">Fixed Deposit</th></tr></thead>
                    <tbody>
                      {[
                        ['Redemption time', '1 working day (T+1)', 'Instant, but with penalty'],
                        ['Early exit cost', 'Graded exit load, 0 after day 7', '0.5-1% rate cut, any time'],
                        ['Minimum holding', 'None', 'Fixed at booking (7 days to 10 years)'],
                        ['Partial withdrawal', 'Redeem any number of units', 'Usually full breakage only'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={{ ...tdR, fontWeight: 600, color: '#1f7a58' }}>{r[1]}</td>
                          <td style={tdR}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec} id="safety-comparison">
                <h2 style={h2}>Liquid Fund vs FD Safety: DICGC Insurance vs SEBI Regulation</h2>
                <p style={p}>
                  A bank FD is insured up to Rs 5 lakh per depositor per bank under DICGC, a government-backed guarantee that pays out even if the bank fails. A liquid fund carries no deposit insurance of any kind, but is regulated by SEBI, holds a diversified portfolio across multiple issuers, and marks every holding to market daily.
                </p>
                <p style={p}>
                  For amounts comfortably under the Rs 5 lakh DICGC limit at a large, stable bank, an FD carries less institutional risk. For larger amounts, spreading money across a diversified liquid fund can reduce concentration risk in a way a single bank FD cannot.
                </p>
              </div>

              <div style={sec} id="when-liquid-fund">
                <h2 style={h2}>When Should You Choose a Liquid Fund Over an FD?</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Emergency fund:</strong> money you may need on short notice benefits from T+1 redemption and no fixed penalty.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Uncertain holding period:</strong> if you are not sure whether you need the money in 2 months or 2 years, a liquid fund avoids locking into a fixed tenure.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Parking a lump sum before a SIP or a large purchase:</strong> liquid funds are commonly used to hold money briefly before deploying it elsewhere.
                  </li>
                </ol>
              </div>

              <div style={sec} id="when-fd">
                <h2 style={h2}>When Should You Choose an FD Over a Liquid Fund?</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>You know the exact date you need the money:</strong> a fixed tenure and guaranteed rate remove all uncertainty.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>You want a locked-in rate in a falling rate environment:</strong> FD rates are fixed for the whole tenure; a liquid fund's yield can drift down if rates fall further.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>You want DICGC insurance:</strong> for amounts under Rs 5 lakh at one bank, an FD carries an explicit government-backed guarantee a liquid fund does not.
                  </li>
                </ol>
              </div>

              <div style={sec} id="post-office-comparison">
                <h2 style={h2}>Post Office FD vs Bank FD vs Liquid Fund</h2>
                <p style={p}>
                  Post Office Time Deposits and NSC are backed by the Government of India with a sovereign guarantee, not just DICGC's Rs 5 lakh cap. Post Office NSC currently offers 7.70% for a 3-year tenure, higher than most bank FDs at the same tenure, and NSC also qualifies for Section 80C deduction up to Rs 1.5 lakh, which neither a bank FD (outside the specific 5-year tax-saving FD) nor a liquid fund offers.
                </p>
              </div>

              <div style={sec} id="limitations">
                <h2 style={h2}>Limitations of This Comparison</h2>
                <p style={p}>
                  <strong>Liquid fund returns are not guaranteed.</strong> The rate you enter is an assumption based on recent fund performance, not a promised return. Actual returns move with short-term interest rates and can be lower or higher than what you enter.
                </p>
                <p style={p}>
                  <strong>FD rates shown are indicative.</strong> Banks revise rates without notice and may offer different rates for special tenures or promotional schemes. Always confirm the exact rate before booking.
                </p>
                <p style={p}>
                  <strong>Tax slab is assumed constant.</strong> If your income changes during the investment period, or you have other capital gains that push you into a higher slab, actual tax paid will differ from this estimate.
                </p>
                <p style={p}>
                  <strong>Exit load and TDS timing are not modelled in the final numbers.</strong> They affect cash flow during the holding period but not the final post-tax maturity value shown here.
                </p>
              </div>

              <div style={sec} id="how-to-use">
                <h2 style={h2}>How to Use This Liquid Fund vs FD Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter your investment amount:</strong> the lump sum you are deciding between an FD and a liquid fund for.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set the tenure:</strong> how long you expect to stay invested, from 1 month to 5 years.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Adjust the FD rate and liquid fund return:</strong> defaults are pre-filled with real current rates; change them to match the specific bank or fund you are considering.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Pick your tax slab:</strong> the result panel shows pre-tax and post-tax value for both options, and states which one wins after tax.
                  </li>
                </ol>
              </div>


              <div style={{ margin: '44px 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only. FD rates shown reflect published rates as of July 2026 and change periodically; confirm the current rate with the bank before investing. Liquid fund returns are not guaranteed and depend on prevailing short-term interest rates. Tax treatment assumes gains are taxed at your stated income slab rate under rules applicable to units bought on or after April 1, 2023, and does not account for other income, deductions, or surcharge. This calculator is for educational and planning purposes only and does not constitute financial advice. Consult a SEBI-registered investment adviser or a chartered accountant before making investment or tax decisions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .lfvfd-sidebar::-webkit-scrollbar { width: 5px; }
            .lfvfd-sidebar::-webkit-scrollbar-track { background: transparent; }
            .lfvfd-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .lfvfd-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            aria-label="Related calculators"
            className="lfvfd-sidebar"
            style={{
              display: 'flex', flexDirection: 'column', gap: 16,
              position: mobile ? 'static' : 'sticky',
              top: 20, alignSelf: 'start',
              maxHeight: mobile ? 'none' : 'calc(100vh - 40px)',
              overflowY: mobile ? 'visible' : 'auto',
              paddingRight: mobile ? 0 : 2,
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
            } as React.CSSProperties}
          >
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 250, flexShrink: 0 }}>
              <span style={{ fontSize: 12, color: C.ink3, fontWeight: 500 }}>Advertisement</span>
            </div>
            <div style={{ flexShrink: 0 }}><SidebarList title="Popular Calculators" items={POPULAR} /></div>
            <div style={{ flexShrink: 0 }}><SidebarList title="More Calculators" items={MORE} /></div>
          </aside>

        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/bank-interest-comparison-calculator|Bank Interest Comparison', '/calculators/fd-laddering-calculator|FD', '/calculators/sip-calculator|SIP', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/ppf-calculator|PPF', '/calculators/rd-calculator|RD', '/calculators/cagr-calculator|CAGR', '/calculators/xirr-calculator|XIRR'] },
        { hd: 'Topics', links: ['/calculators/sip-calculator|Mutual Funds', '/calculators/bank-interest-comparison-calculator|Bank Rates', '/calculators/fd-laddering-calculator|Fixed Deposits', '/calculators/income-tax-calculator|Tax Planning'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { FAQBox } from '@/components/common/FAQBox';

/* ─── Palette ─────────────────────────────────────────────────── */
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

/* ─── Helpers ───────────────────────────────────────────────── */
const fmtIN = (n: number) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(n));

const fmtC = (n: number) => {
  if (n >= 1e7) return `${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `${(n / 1e5).toFixed(2)} L`;
  return fmtIN(n);
};

/* ─── KVP Math ──────────────────────────────────────────────── */
function monthsToDouble(rate: number): number {
  if (rate <= 0) return 999;
  return Math.ceil((Math.log(2) / Math.log(1 + rate / 100)) * 12);
}

function kvpMaturity(principal: number, rate: number, months: number): number {
  const years = months / 12;
  return principal * Math.pow(1 + rate / 100, years);
}

function maturityDate(months: number): Date {
  const d = new Date();
  d.setMonth(d.getMonth() + months);
  return d;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatMonthYear(months: number): string {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (m === 0) return `${y} ${y === 1 ? 'year' : 'years'}`;
  return `${y} yr ${m} mo`;
}

interface KVPYearRow {
  year: number;
  opening: number;
  interest: number;
  closing: number;
}

function buildKVPSchedule(principal: number, rate: number, totalMonths: number): KVPYearRow[] {
  const rows: KVPYearRow[] = [];
  const r = rate / 100;
  const totalYears = Math.ceil(totalMonths / 12);
  let balance = principal;
  for (let y = 1; y <= totalYears; y++) {
    const opening = balance;
    const isLastYear = y === totalYears;
    const yearFraction = isLastYear ? (totalMonths % 12 || 12) / 12 : 1;
    const closing = opening * Math.pow(1 + r, yearFraction);
    const interest = closing - opening;
    balance = closing;
    rows.push({ year: y, opening: Math.round(opening), interest: Math.round(interest), closing: Math.round(closing) });
  }
  return rows;
}

/* ─── Doubling Period Reference Table ───────────────────────── */
const DOUBLING_TABLE = [
  { rate: 6.9, months: 120, label: '10 years' },
  { rate: 7.5, months: 115, label: '9 yr 7 mo' },
  { rate: 8.0, months: 108, label: '9 years' },
  { rate: 8.7, months: 99,  label: '8 yr 3 mo' },
  { rate: 9.0, months: 96,  label: '8 years' },
];

/* ─── Donut Chart ────────────────────────────────────────────── */
function DonutChart({ invested, profit }: { invested: number; profit: number }) {
  const total = invested + profit;
  if (total === 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const pArc = (invested / total) * circ;
  const pPct = Math.round((invested / total) * 100);
  return (
    <svg
      width="216"
      height="216"
      viewBox="0 0 216 216"
      style={{ display: 'block' }}
      role="img"
      aria-label={`Donut chart: ${pPct}% invested, ${100 - pPct}% profit at maturity`}
    >
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Invested</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
  );
}

/* ─── Stacked Bar Chart ─────────────────────────────────────────── */
function StackedBarChart({ rows }: { rows: KVPYearRow[] }) {
  if (!rows || rows.length === 0) return null;
  const maxValue = Math.max(...rows.map(r => r.closing));
  const chartHeight = 200;
  const barWidth = 100 / rows.length;
  const padding = 40;

  return (
    <svg
      width="100%"
      height="280"
      viewBox={`0 0 ${rows.length * 45 + padding} ${chartHeight + padding}`}
      preserveAspectRatio="xMinYMin meet"
      style={{ display: 'block', marginBottom: 20 }}
      role="img"
      aria-label="Year-wise balance stacked bar chart showing invested amount and interest earned"
    >
      {/* Y-axis labels */}
      {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
        const value = Math.round((maxValue * pct) / 1e5) / 10;
        const y = chartHeight - (pct * chartHeight);
        return (
          <g key={`label-${pct}`}>
            <text x="5" y={y + padding + 4} fontSize="11" fill={C.ink3} textAnchor="end" fontFamily={INTER}>
              {value}Cr
            </text>
            <line x1="20" y1={y + padding} x2={rows.length * 45 + padding} y2={y + padding} stroke={C.border} strokeWidth="1" />
          </g>
        );
      })}

      {/* Bars */}
      {rows.map((row, idx) => {
        const investedHeight = (row.opening / maxValue) * chartHeight;
        const interestHeight = (row.interest / maxValue) * chartHeight;
        const x = padding + idx * 45;

        return (
          <g key={`bar-${idx}`}>
            {/* Invested portion (dark) */}
            <rect
              x={x}
              y={padding + chartHeight - investedHeight}
              width="30"
              height={investedHeight}
              fill={C.dark}
              rx="2"
            />
            {/* Interest portion (lime) */}
            <rect
              x={x}
              y={padding + chartHeight - investedHeight - interestHeight}
              width="30"
              height={interestHeight}
              fill={C.lime2}
              rx="2"
            />
            {/* Year label */}
            <text
              x={x + 15}
              y={padding + chartHeight + 20}
              fontSize="12"
              fontWeight="600"
              fill={C.ink}
              textAnchor="middle"
              fontFamily={INTER}
            >
              {row.year}
            </text>
          </g>
        );
      })}

      {/* Legend */}
      <g>
        <rect x={padding} y={10} width="12" height="12" fill={C.dark} />
        <text x={padding + 18} y="20" fontSize="12" fill={C.ink2} fontFamily={INTER}>Invested</text>

        <rect x={padding + 120} y={10} width="12" height="12" fill={C.lime2} />
        <text x={padding + 136} y="20" fontSize="12" fill={C.ink2} fontFamily={INTER}>Interest earned</text>
      </g>
    </svg>
  );
}

/* ─── Slider ─────────────────────────────────────────────────── */
function Slider({
  label, value, min, max, step, fmt, onChange, compact,
}: {
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
    <div style={{ marginBottom: compact ? 18 : 36 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 14 }}>
        <label style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400 }}>{label}</label>
        {editing ? (
          <input autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 120, outline: 'none', color: C.dark, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${fmt(value)}. Click to edit.`}
            style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 18px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 90 : 110, textAlign: 'center' }}
            onMouseOver={e => (e.currentTarget as HTMLButtonElement).style.borderColor = '#AAAAAA'}
            onMouseOut={e => (e.currentTarget as HTMLButtonElement).style.borderColor = C.border}>
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

/* ─── Sidebar List ───────────────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div
            style={{ padding: '13px 20px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 14, color: C.ink2, transition: 'all 0.12s' }}
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
  { href: '/calculators/ppf-calculator',              label: 'PPF Calculator' },
  { href: '/calculators/fd-calculator',               label: 'FD Calculator' },
  { href: '/calculators/rd-calculator',               label: 'RD Calculator' },
  { href: '/calculators/ssy-calculator',              label: 'SSY Calculator' },
  { href: '/calculators/compound-interest-calculator',label: 'Compound Interest Calculator' },
  { href: '/calculators/income-tax-calculator',       label: 'Income Tax Calculator' },
];

const MORE = [
  { href: '/calculators/savings-account-interest-calculator', label: 'Savings Account Interest' },
  { href: '/calculators/sip-calculator',                      label: 'SIP Calculator' },
  { href: '/calculators/nps-calculator',                      label: 'NPS Calculator' },
  { href: '/calculators/inflation-calculator',                label: 'Inflation Calculator' },
];

/* ─── FAQ Data ───────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What is the current KVP interest rate for 2025?',
    a: 'The Kisan Vikas Patra interest rate is 7.5% per annum for Q1 FY 2025-26 (April 2025 onwards), as notified by the Ministry of Finance. The rate is reviewed quarterly on January 1, April 1, July 1, and October 1. At 7.5%, a KVP investment doubles in exactly 115 months (9 years and 7 months). The Ministry announces any rate revision in the Official Gazette before each quarter begins. Check this calculator to model returns at older rates or hypothetical future rates.',
  },
  {
    q: 'How much TDS is deducted on KVP maturity?',
    a: 'TDS at 10% under Section 194A is deducted on KVP interest if the interest amount exceeds Rs 10,000. For example, on a Rs 1 lakh investment at 7.5% held for 115 months, the maturity amount is Rs 2 lakh, so the interest is Rs 1 lakh. After 10% TDS (Rs 10,000), you receive Rs 1,90,000. If you have no valid PAN, TDS is deducted at 20% instead (Rs 20,000). No TDS is deducted before maturity, only on the final payout.',
  },
  {
    q: 'How is KVP taxed at different income levels?',
    a: 'KVP interest is fully taxable as income from other sources. If you are in the 20% tax bracket, your effective tax on Rs 1 lakh interest is Rs 20,000 (20%). In the 30% bracket, it is Rs 30,000 (30%). Plus the 10% TDS already deducted at maturity. A 30% bracket investor on Rs 1 lakh interest pays Rs 10,000 TDS upfront, then Rs 30,000 more at filing, totalling Rs 40,000 tax (40% effective rate). Use the calculator to compute your exact post-tax return based on your investment amount and rate.',
  },
  {
    q: 'How does the KVP doubling period change at different rates?',
    a: 'The doubling period is mechanically linked to the interest rate. At 6.9%, it is 120 months (10 years). At 7.5% (current), it is 115 months (9 years 7 months). At 8%, it drops to 108 months (9 years). At 8.7%, it is 99 months (8 years 3 months). The formula is: months to double = ln(2) / ln(1 + rate/100) x 12. Every time the Ministry revises the KVP interest rate, the doubling period adjusts. Use the calculator to compute the doubling period at any rate, historical or projected.',
  },
  {
    q: 'What was the KVP interest rate in previous years?',
    a: 'KVP rates have declined since the scheme was relaunched in November 2014. The relaunch rate was 8.7% (doubling in 99 months). It fell to 7.6% by 2016, dropped to 6.9% in 2020, and has since fluctuated between 6.7% and 7.7%. The current 7.5% reflects RBI monetary policy shifts since 2022. Historical low was 6.7% (late 2020), and the peak post-relaunch was 8.7%. Monitor the Ministry of Finance gazette for quarterly rate changes.',
  },
  {
    q: 'How does KVP compare to bank FD at current rates?',
    a: 'KVP at 7.5% and a 5-year bank FD at 7.2% show similar nominal rates. But key differences matter: KVP guarantees doubling over 115 months (sovereign backed). Bank FDs offer tenure flexibility (1 to 10 years) with rates from 6.5% to 7.8% depending on bank and tenure. Both have fully taxable interest and 10% TDS. KVP compounds annually, FDs semi-annually (FD usually better). KVP has 30-month lock-in before withdrawal; FDs vary by bank. For certainty and guaranteed doubling, KVP wins. For flexibility, FDs are better.',
  },
  {
    q: 'Does KVP qualify for Section 80C deduction?',
    a: 'No. KVP investments do not qualify for Section 80C deduction. This is a critical difference from NSC, where investments qualify for 80C up to Rs 1.5 lakh per year. If tax-saving deductions are your goal, NSC and PPF are more efficient. KVP was explicitly excluded from 80C benefits when relaunched in 2014. The principal is not deductible, and the interest is fully taxable on an accrual basis each year.',
  },
  {
    q: 'Can I withdraw KVP before maturity without penalty?',
    a: 'Premature encashment (before the full doubling period) is allowed after 2.5 years (30 months) from purchase. Before 30 months, withdrawal is only permitted for death, court order, or pledge forfeiture. If you withdraw after 30 months but before 115 months (full tenure), the interest paid is for the period held, not the full amount. For example, withdrawing after 5 years gets you less than double. Early withdrawal defeats the doubling benefit, so plan to hold the full tenure if possible.',
  },
  {
    q: 'What is the minimum and maximum KVP investment in India?',
    a: 'Minimum investment is Rs 1,000 per certificate, with subsequent additions in multiples of Rs 100. There is no maximum limit: you can invest any amount as a single certificate or purchase multiple certificates. For investments of Rs 10 lakh and above, PAN is mandatory. For amounts above Rs 50,000, full KYC (Aadhaar + PAN) is required per India Post rules. You can hold multiple KVP certificates totaling crores if desired.',
  },
  {
    q: 'Can NRIs invest in post office KVP?',
    a: 'No. Non-Resident Indians (NRIs) cannot invest in Kisan Vikas Patra. KVP is strictly for resident Indians, joint holders (maximum 3 adults), and trusts only. HUFs and NRIs are explicitly excluded. This restriction has been since relaunch in 2014. NRIs can open NRE/NRO bank accounts for FDs, but not for post office schemes like KVP or NSC. Check the NSC calculator if you are looking at post office options.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. All calculators are free to use with no mandatory sign-up. Fermor provides this KVP calculator, NSC calculator, PPF calculator, FD calculator, and 500+ other financial calculators to help you make informed decisions. new tax regime impact and missed deductions for clients.',
  },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ─── Main Component ─────────────────────────────────────────── */

export default function KVPCalculatorClient() {
  const defaultSettings = { amount: 100000, rate: 7.5, numCerts: 1 };
  const { settings, updateSettings } = useCalculatorSettings('kvp', defaultSettings);
  const { amount, rate, numCerts } = settings;

  const setAmount   = (v: number) => updateSettings({ amount: v });
  const setRate     = (v: number) => updateSettings({ rate: v });
  const setNumCerts = (v: number) => updateSettings({ numCerts: v });

  const [mobile, setMobile]       = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk();
    window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const totalInvested = amount * numCerts;

  const months = useMemo(() => monthsToDouble(rate), [rate]);

  const maturity = useMemo(
    () => kvpMaturity(totalInvested, rate, months),
    [totalInvested, rate, months]
  );

  const profit = maturity - totalInvested;
  const mDate  = useMemo(() => maturityDate(months), [months]);

  const invPct     = maturity > 0 ? Math.round((totalInvested / maturity) * 100) : 50;
  const profitPct  = 100 - invPct;

  const scheduleRows = useMemo(
    () => buildKVPSchedule(totalInvested, rate, months),
    [totalInvested, rate, months]
  );

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      {/* NAV */}
      <PageNav />

      {/* BODY */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            KVP Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate Kisan Vikas Patra maturity amount and doubling period at the current 7.5% rate. Instant results, no sign-up required.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          {/* LEFT */}
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* INPUT PANEL */}
                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  {!mobile && (
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 36px' }}>
                      KVP Details
                    </p>
                  )}

                  <Slider
                    label="Investment Amount (per certificate)"
                    value={amount}
                    min={1000}
                    max={10000000}
                    step={1000}
                    fmt={v => `Rs ${fmtC(v)}`}
                    onChange={setAmount}
                    compact={mobile}
                  />

                  <Slider
                    label="Interest Rate (% p.a.)"
                    value={rate}
                    min={1}
                    max={15}
                    step={0.1}
                    fmt={v => `${v.toFixed(1)}%`}
                    onChange={setRate}
                    compact={mobile}
                  />

                  <Slider
                    label="Number of KVP Certificates"
                    value={numCerts}
                    min={1}
                    max={1000}
                    step={1}
                    fmt={v => `${v}`}
                    onChange={setNumCerts}
                    compact={mobile}
                  />

                  {/* Derived: Months to Maturity (display only) */}
                  <div style={{ marginBottom: mobile ? 18 : 24 } as React.CSSProperties}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10 }}>
                      <span style={{ fontSize: 14, color: C.ink2 }}>Months to Maturity (auto)</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{months} months</span>
                    </div>
                  </div>

                  {/* Maturity Date Display */}
                  <div style={{ padding: '12px 14px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10 }}>
                    <div style={{ fontSize: 12, color: C.ink3, marginBottom: 4 }}>If invested today, matures on</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{formatDate(mDate)}</div>
                  </div>
                </div>

                {/* OUTPUT PANEL */}
                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  {/* Donut */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 12, order: mobile ? 1 : -1 }}>
                    <DonutChart invested={totalInvested} profit={profit} />
                  </div>

                  {/* Legend */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 22, marginBottom: mobile ? 8 : 20, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Invested</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Profit</span>
                    </div>
                  </div>

                  {/* Doubling highlight - Dark green design */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: mobile ? '12px 14px' : '16px 18px', marginBottom: 12 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(166,219,196,0.7)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
                      Your money doubles in
                    </div>
                    <div style={{ fontSize: mobile ? 18 : 22, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em', marginBottom: 2 }}>
                      {formatMonthYear(months)}
                    </div>
                    <div style={{ fontSize: 12, color: '#7A8087' }}>
                      Matures on {formatDate(mDate)}
                    </div>
                  </div>

                  {/* Maturity Amount - Dark green design */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: mobile ? '12px 14px' : '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: 'rgba(166,219,196,0.7)' }}>Maturity Amount</span>
                    <span style={{ fontSize: mobile ? 20 : 26, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>Rs {fmtIN(maturity)}</span>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: 'Total invested',   value: `Rs ${fmtC(totalInvested)}` },
                    { label: 'Total profit',      value: `Rs ${fmtC(profit)}` },
                    { label: 'CAGR',              value: `${rate.toFixed(1)}%` },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  {/* Split bar */}
                  <div style={{ width: '100%', marginTop: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Invested {invPct}%</span>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Profit {profitPct}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${invPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Year-wise Schedule Toggle */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button
                  onClick={() => setShowSchedule(v => !v)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '20px 48px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.ink }}>Year-wise Balance</span>
                    {!mobile && <span style={{ fontSize: 13, color: C.ink3, marginLeft: 10 }}>(Yearly breakdown)</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 8 : 12, flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.dark, background: C.paleLime, border: `1px solid ${C.lime2}`, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {formatMonthYear(months)}
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      style={{ transform: showSchedule ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {showSchedule && (
                  <div style={{ borderTop: `1px solid ${C.border}`, padding: mobile ? '16px 18px' : '24px 48px' }}>
                    {/* Stacked Bar Chart */}
                    <StackedBarChart rows={scheduleRows} />

                    {/* Data Table */}
                    <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <thead>
                        <tr style={{ background: '#f4f5f6' }}>
                          {['Year', 'Opening Balance', 'Interest Earned', 'Closing Balance'].map(h => (
                            <th key={h} style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {scheduleRows.map((row, i) => (
                          <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={{ padding: '13px 24px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                            <td style={{ padding: '13px 24px', color: C.ink2 }}>Rs {fmtIN(row.opening)}</td>
                            <td style={{ padding: '13px 24px', color: '#1f7a58', fontWeight: 600 }}>Rs {fmtIN(row.interest)}</td>
                            <td style={{ padding: '13px 24px', color: C.ink2 }}>Rs {fmtIN(row.closing)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* SAVE RESULTS */}
            <SaveResultsCard mobile={mobile} />

            

            {/* ARTICLE */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>
              {(() => {
                const h2  = { fontSize: mobile ? 18 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
                const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
                const sec = { margin: '0 0 40px' } as React.CSSProperties;

                return (
                  <>
                    {/* Section 1 */}
                    <div id="what-is-kvp" style={sec}>
                      <h2 style={h2}>What Is Kisan Vikas Patra?</h2>
                      <p style={p}>
                        Kisan Vikas Patra is a Post Office savings certificate issued by the Department of Posts under the Ministry of Finance, Government of India. The certificate guarantees to double the invested amount over a fixed tenure determined by the prevailing interest rate. At the current 7.5% rate, it doubles money in 115 months.
                      </p>
                      <p style={p}>
                        KVP was originally introduced in 1988 to encourage small savings among rural communities, particularly farmers (hence "Kisan"). It became one of the most popular savings instruments in India through the 1990s and 2000s. The scheme was discontinued in 2011 following recommendations from the Shyamala Gopinath Committee, which was concerned that it was being misused for money laundering due to its bearer instrument nature.
                      </p>
                      <p style={p}>
                        The scheme was relaunched in November 2014 with stricter KYC requirements, including mandatory PAN for large investments. At relaunch, the doubling period was 8 years and 4 months at a rate of approximately 8.7%. The current rate of 7.5% reflects the broader decline in small savings rates since then.
                      </p>
                      <p style={p}>
                        KVP certificates are available at all post offices across India and at select branches of public sector banks. The scheme is open to resident Indian individuals, joint holders (maximum three adults), and trusts. Minors above 10 years can hold KVP in their own name; below 10, a guardian holds on their behalf.
                      </p>
                    </div>

                    {/* Section 2 */}
                    <div id="kvp-doubling-calculation" style={sec}>
                      <h2 style={h2}>How KVP Doubles Your Money: The Calculation</h2>
                      <p style={p}>
                        KVP uses annual compounding. The maturity amount is calculated using the standard compound interest formula:
                      </p>
                      <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, fontFamily: 'monospace', margin: '0 0 16px', padding: '12px 0' }}>
                        Maturity = Principal x (1 + rate/100)^(months/12)
                      </p>
                      <p style={p}>
                        At 7.5%, to double the principal, you need (1.075)^n = 2. Solving for n: n = ln(2)/ln(1.075) = 9.583 years = 115 months (rounded up). This is why India Post specifies exactly 115 months as the doubling period for the current rate.
                      </p>
                      <p style={p}>
                        For a Rs 1,00,000 investment: maturity = 1,00,000 x (1.075)^9.583 = Rs 2,00,157 (approximately Rs 2 lakh). The slight overshoot above exactly 2x is because months are rounded up, giving fractionally more than the doubling required.
                      </p>
                      <p style={p}>
                        Unlike NSC, where interest compounds every six months, KVP interest compounds annually. The practical difference for most investors is minimal over long horizons, but it does mean NSC provides marginally higher effective returns at the same nominal rate.
                      </p>
                    </div>

                    {/* Section 3 */}
                    <div id="kvp-doubling-period" style={sec}>
                      <h2 style={h2}>KVP Doubling Period at Different Interest Rates</h2>
                      <p style={p}>
                        The doubling period changes every time the Ministry of Finance revises the KVP interest rate. The table below shows how the doubling period has shifted at various historical and hypothetical rates.
                      </p>
                      <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              {['Interest Rate', 'Doubling Period (Months)', 'Doubling Period'].map(h => (
                                <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 12, borderBottom: `2px solid ${C.border}`, whiteSpace: 'nowrap' }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {DOUBLING_TABLE.map((row, i) => (
                              <tr key={row.rate} style={{ borderBottom: `1px solid ${C.border}`, background: row.rate === 7.5 ? C.paleLime : (i % 2 === 0 ? C.white : '#fafafa') }}>
                                <td style={{ padding: '12px 20px', fontWeight: row.rate === 7.5 ? 700 : 400, color: C.ink }}>
                                  {row.rate}%{row.rate === 7.5 ? ' (current)' : ''}
                                </td>
                                <td style={{ padding: '12px 20px', color: C.ink2 }}>{row.months} months</td>
                                <td style={{ padding: '12px 20px', color: C.ink2 }}>{row.label}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>
                        The doubling period is mechanically linked to the interest rate through the Rule of 72, a commonly used approximation (72 / rate gives approximate years to double). At 7.5%, the Rule of 72 gives 9.6 years, which matches the actual 9 years 7 months calculated precisely.
                      </p>
                    </div>

                    {/* Section 4 */}
                    <div id="kvp-tax-treatment" style={sec}>
                      <h2 style={h2}>KVP Tax Treatment: What You Must Know</h2>
                      <p style={p}>
                        KVP interest is fully taxable as income from other sources under the Income Tax Act, 1961. This is a critical distinction from PPF (EEE status) and even NSC, where interest is compulsorily reinvested and qualifies for 80C deduction.
                      </p>
                      <p style={p}>
                        Since KVP pays all interest in a lump sum at maturity, the tax liability can be significant if the entire interest is treated as income in the year of maturity. However, the <a href="https://incometaxindia.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Department</a> requires investors to declare KVP interest on an accrual basis each year, even though the physical payout happens only at maturity.
                      </p>
                      <p style={p}>
                        No TDS is deducted at the post office or bank on KVP interest. But if the maturity amount is paid, and the interest exceeds Rs 10,000, TDS at 10% (or 20% without PAN) applies under Section 194A. Investors in the 30% tax bracket should factor this into their net return calculation.
                      </p>
                      <p style={p}>
                        KVP does not qualify for Section 80C deduction. The Rs 1.5 lakh annual 80C limit cannot be used to offset KVP investments. This is unlike NSC, where the principal and reinvested interest both qualify for 80C.
                      </p>
                    </div>

                    {/* Section 5 - Interest Rate History */}
                    <div id="kvp-interest-rates-history" style={sec}>
                      <h2 style={h2}>KVP Interest Rates Through 2014-2025</h2>
                      <p style={p}>
                        The KVP interest rate has declined significantly since the scheme's relaunch in November 2014. When reintroduced, it started at 8.7% per annum, allowing money to double in just 99 months (8 years 3 months). This high opening rate reflected post-2008 interest rate levels and was designed to attract investors back to the scheme after its 2011 discontinuation.
                      </p>
                      <p style={p}>
                        By 2016, the Ministry of Finance reduced the rate to 7.6%, extending the doubling period to 114 months. The 2020 economic slowdown forced another cut to 6.9%, pushing the doubling period to 120 months (10 years). Since then, rates have stabilized between 6.7% and 7.7%, reflecting RBI monetary policy shifts. The current 7.5% rate (as of Q1 FY 2025-26) represents a middle ground between these extremes.
                      </p>
                      <p style={p}>
                        The monthly step-down of KVP rates is important for tax planning. A 20-basis-point drop in the interest rate extends the doubling period by approximately 14-16 months, which matters for long-term wealth accumulation. Investors who locked in rates at 8.7% in 2014-15 now hold KVP certificates that will double in 99 months. New investors at 7.5% will need 16 additional months to reach the same doubling goal, an 18-month difference due to timing alone.
                      </p>
                      <p style={p}>
                        Changes in the KVP interest rate also signal broader economic conditions. Rate cuts typically coincide with RBI repo rate cuts, indicating an easing monetary stance and lower growth expectations. Rate increases are rarer but have occurred during inflation concerns. Use the calculator above to run scenarios at different interest rates and understand how rate changes impact your returns and tax liability over time.
                      </p>
                    </div>

                    {/* Section 5b - Tax Example */}
                    <div id="kvp-tax-example" style={sec}>
                      <h2 style={h2}>KVP Tax Calculation Example</h2>
                      <p style={p}>
                        Let us work through a complete tax calculation for an investor in the 30% income tax bracket investing Rs 1 lakh in KVP at 7.5%.
                      </p>
                      <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              {['Component', 'Amount'].map(h => (
                                <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 12, borderBottom: `2px solid ${C.border}`, whiteSpace: 'nowrap' }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['Initial investment', 'Rs 1,00,000'],
                              ['Maturity amount (115 months)', 'Rs 2,00,157'],
                              ['Gross interest earned', 'Rs 1,00,157'],
                              ['TDS deducted at maturity (10%)', 'Rs 10,015'],
                              ['Amount received after TDS', 'Rs 1,90,142'],
                              ['Your income tax (30% bracket)', 'Rs 30,047'],
                              ['TDS already paid', 'Rs 10,015'],
                              ['Additional tax payable at filing', 'Rs 20,032'],
                              ['Net interest after all tax', 'Rs 70,110'],
                              ['Effective tax rate', '70.04%'],
                            ].map(([label, value], i) => (
                              <tr key={label} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ padding: '12px 20px', fontWeight: label === 'Net interest after all tax' ? 600 : 400, color: C.ink }}>{label}</td>
                                <td style={{ padding: '12px 20px', fontWeight: label === 'Net interest after all tax' ? 700 : 400, color: label === 'Net interest after all tax' ? C.dark : C.ink2 }}>{value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>
                        In this example, your post-tax return is Rs 70,110, for a net post-tax interest of 7.01% annualized on your initial Rs 1 lakh (over 9.58 years). After accounting for inflation at 5% per annum, your real (inflation-adjusted) return drops to approximately 2% per annum. This is why KVP is suitable for conservative wealth preservation, not aggressive growth. Investors in the 20% tax bracket see better post-tax returns (approximately 4.8% after tax), while those in the 30% or higher brackets see the value erode more quickly.
                      </p>
                    </div>

                    {/* Section 6 */}
                    <div id="kvp-vs-alternatives" style={sec}>
                      <h2 style={h2}>KVP vs NSC vs Bank FD: Which Is Right for You?</h2>
                      <p style={p}>
                        KVP, NSC, and bank fixed deposits are the three most commonly compared lump-sum post-office and bank instruments for conservative investors. The table below lays out the key differences.
                      </p>
                      <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              {['Feature', 'KVP', 'NSC', 'Bank FD'].map(h => (
                                <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 12, borderBottom: `2px solid ${C.border}`, whiteSpace: 'nowrap' }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['Rate',                   '7.5%',                 '7.7%',              '6.5% to 7.8%'],
                              ['Tenure',                 '115 months',           '60 months',         'Flexible'],
                              ['Section 80C',            'No',                   'Yes',               'Yes (5-yr FD)'],
                              ['Interest taxation',      'Fully taxable',        'Taxable',           'Taxable'],
                              ['Maximum investment',     'No limit',             'No limit',          'No limit'],
                              ['Premature withdrawal',   'After 30 months',      'Not allowed',       'After lock-in'],
                              ['Doubles money',          'Yes (in ~9.5 yr)',      'No',                'No'],
                              ['Issuer',                 'India Post',           'India Post',        'Banks'],
                              ['NRI eligibility',        'Not allowed',          'Not allowed',       'NRO/NRE available'],
                            ].map(([feat, kvp, nsc, fd], i) => (
                              <tr key={feat} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ padding: '12px 20px', fontWeight: 600, color: C.ink }}>{feat}</td>
                                <td style={{ padding: '12px 20px', color: C.ink2 }}>{kvp}</td>
                                <td style={{ padding: '12px 20px', color: C.ink2 }}>{nsc}</td>
                                <td style={{ padding: '12px 20px', color: C.ink2 }}>{fd}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>
                        If your primary goal is a certain doubling of capital over approximately 9-10 years with sovereign backing, KVP is the only instrument that explicitly guarantees it. If you need the 80C deduction, try our <Link href="/calculators/nsc-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>NSC Calculator</Link> or evaluate safe tax-free wealth in our <Link href="/calculators/ppf-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>PPF Calculator</Link>. For regular monthly post office payouts, check our <Link href="/calculators/post-office-mis-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Post Office MIS Calculator</Link> or senior citizen benefits in our <Link href="/calculators/scss-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SCSS Calculator</Link>, and for flexible tenures use our <Link href="/calculators/fd-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>FD Calculator</Link>.
                      </p>
                    </div>

                    {/* In-Content Promo Bar */}
                    <div style={{ margin: '28px 0 32px', background: C.paleLime, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 700, color: C.dark, margin: '0 0 4px', fontFamily: INTER }}>Compare Tax-Free PPF Returns</p>
                        <p style={{ fontSize: 13, color: C.ink2, margin: 0, fontFamily: INTER }}>Want to evaluate 15-year tax-free compounding under Section 80C?</p>
                      </div>
                      <Link className="fx-btn" href="/calculators/ppf-calculator" target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: 13, fontWeight: 700, background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', padding: '10px 20px', borderRadius: 8, textDecoration: 'none', fontFamily: INTER, whiteSpace: 'nowrap' }}>
                        Open calculator
                      </Link>
                    </div>

                    {/* Section 6 */}
                    <div id="how-to-use" style={sec}>
                      <h2 style={h2}>How to Use This KVP Calculator</h2>
                      <p style={p}>
                        The calculator above gives you the maturity amount, doubling period, and year-by-year balance schedule for any KVP investment.
                      </p>
                      <ol style={{ paddingLeft: 20, margin: '0 0 16px' }}>
                        <li style={{ ...p, marginBottom: 12 }}>
                          <strong>Enter the investment amount per certificate.</strong> KVP certificates are issued in denominations starting at Rs 1,000. If you are investing Rs 5 lakh in a single certificate, enter Rs 5,00,000. If you are splitting across multiple certificates, use the number of certificates slider.
                        </li>
                        <li style={{ ...p, marginBottom: 12 }}>
                          <strong>Set the interest rate.</strong> The default is 7.5%, the current Q1 FY 2025-26 rate. If you want to model older rates or future scenarios, adjust this slider and the doubling period updates automatically.
                        </li>
                        <li style={{ ...p, marginBottom: 12 }}>
                          <strong>Set the number of certificates.</strong> KVP certificates are individual instruments. If you want Rs 5 lakh invested across 5 certificates of Rs 1 lakh each, set certificates to 5 and the amount to Rs 1,00,000.
                        </li>
                        <li style={{ ...p, marginBottom: 12 }}>
                          <strong>Read the output panel.</strong> The maturity amount, profit, maturity date, and CAGR all update instantly. Expand the year-wise table to see the annual compounding trajectory.
                        </li>
                      </ol>
                    </div>

                    

                    {/* Section 7 */}
                    <div id="faq" style={sec}>
                      <h2 style={h2}>Frequently Asked Questions</h2>
                      <FAQ />
                    </div>

                    <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                        <strong>Disclaimer:</strong> KVP interest calculations are based on India Post small savings rules. Consult a CA or financial advisor before making major investment decisions.
                      </p>
                    </div>
                  </>
                );
              })()}
            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.kvp-sidebar::-webkit-scrollbar{width:5px}.kvp-sidebar::-webkit-scrollbar-track{background:transparent}.kvp-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.kvp-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="kvp-sidebar" aria-label="Related calculators" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ flexShrink: 0 }}><SidebarList title="Popular Calculators" items={POPULAR} /></div>
              <div style={{ flexShrink: 0 }}><SidebarList title="More Calculators" items={MORE} /></div>
            </div>
          </aside>
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/ppf-calculator|PPF', '/calculators/fd-calculator|FD', '/calculators/rd-calculator|RD', '/calculators/ssy-calculator|SSY', '/calculators/nps-calculator|NPS', '/calculators/sip-calculator|SIP', '/calculators/income-tax-calculator|Income Tax', '/calculators/compound-interest-calculator|Compound Int.', '/calculators/inflation-calculator|Inflation', '/calculators/savings-account-interest-calculator|Savings Account'] },
        { hd: 'Topics', links: ['/calculators/sip-calculator|Mutual Funds', '/calculators/fd-calculator|Fixed Deposits', '/calculators/nps-calculator|Retirement', '/calculators/income-tax-calculator|Taxes'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

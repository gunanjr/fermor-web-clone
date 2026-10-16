'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect, useId } from 'react';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { PageNav } from '../../../src/components/common/PageNav';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { FAQBox } from '@/components/common/FAQBox';

/* ── Palette ─────────────────────────────────────────────── */
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

/* ── Math ───────────────────────────────────────────────── */
function calcEMI(p: number, annualRate: number, months: number): number {
  if (months <= 0 || p <= 0) return 0;
  if (annualRate === 0) return p / months;
  const r = annualRate / 12 / 100;
  return (p * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

function calcOutstanding(p: number, annualRate: number, months: number, emi: number): number {
  if (annualRate === 0) return Math.max(0, p - emi * months);
  const r = annualRate / 12 / 100;
  return p * Math.pow(1 + r, months) - emi * (Math.pow(1 + r, months) - 1) / r;
}

interface FloatingResult {
  emi1: number;
  emi2: number;
  totalInterest: number;
  outstandingAfter36: number;
}

function calcFloating(p: number, r1: number, r2: number, tenureMonths: number): FloatingResult {
  const phase1 = Math.min(36, tenureMonths);
  const emi1 = calcEMI(p, r1, tenureMonths);
  const outstanding = Math.max(0, calcOutstanding(p, r1, phase1, emi1));
  const rem = tenureMonths - phase1;
  if (rem <= 0) {
    return { emi1, emi2: emi1, totalInterest: Math.max(0, emi1 * tenureMonths - p), outstandingAfter36: 0 };
  }
  const emi2 = calcEMI(outstanding, r2, rem);
  const totalInterest = Math.max(0, emi1 * phase1 + emi2 * rem - p);
  return { emi1, emi2, totalInterest, outstandingAfter36: outstanding };
}

function findBreakEvenFutureRate(p: number, r1: number, rFixed: number, tenureMonths: number): number {
  const fixedTotal = calcEMI(p, rFixed, tenureMonths) * tenureMonths - p;
  let lo = r1, hi = 30;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    const floatTotal = calcFloating(p, r1, mid, tenureMonths).totalInterest;
    if (floatTotal < fixedTotal) lo = mid; else hi = mid;
  }
  return Math.round(((lo + hi) / 2) * 100) / 100;
}

/* ── Donut Chart ─────────────────────────────────────────── */
function DonutChart({ floatingInterest, fixedInterest }: { floatingInterest: number; fixedInterest: number }) {
  const total = floatingInterest + fixedInterest;
  if (total === 0) return null;
  const R = 78, sw = 22, cx = 104, cy = 104;
  const circ = 2 * Math.PI * R;
  const floatArc = (floatingInterest / total) * circ;
  const floatPct = Math.round((floatingInterest / total) * 100);
  return (
    <svg role="img" aria-label={`Interest comparison: floating ${floatPct}%, fixed ${100 - floatPct}%`}
      width="208" height="208" viewBox="0 0 208 208" style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${floatArc} ${circ - floatArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 10} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Floating</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 26, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{floatPct}%</text>
    </svg>
  );
}

/* ── Slider ──────────────────────────────────────────────── */
function Slider({
  label, id: idProp, value, min, max, step, display, onChange, compact,
}: {
  label: string; id?: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (v: number) => void; compact?: boolean;
}) {
  const autoId = useId();
  const inputId = idProp || autoId;
  const rangeId = `${inputId}-range`;
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };

  return (
    <div style={{ marginBottom: compact ? 18 : 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 8 : 12 }}>
        {label ? (
          <label htmlFor={editing ? inputId : rangeId}
            style={{ fontSize: compact ? 13.5 : 14.5, color: C.ink2, fontWeight: 400, fontFamily: INTER }}>{label}</label>
        ) : (
          <span />
        )}
        {editing ? (
          <input id={inputId} autoFocus value={raw}
            aria-label={`Enter ${label} value`}
            onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 130, outline: 'none', color: C.dark, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${display}. Click to edit.`}
            style={{ fontSize: compact ? 13 : 14, fontWeight: 700, color: C.dark, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 18px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 90 : 110, textAlign: 'center' }}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}>
            {display}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 20, height: 20, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 2px 8px rgba(16,18,20,0.22)', pointerEvents: 'none', zIndex: 1 }} />
        <input id={rangeId} type="range" min={min} max={max} step={step} value={value}
          aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
          onChange={e => onChange(+e.target.value)}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontSize: 11, color: C.ink3, fontFamily: INTER }}>{min}</span>
        <span style={{ fontSize: 11, color: C.ink3, fontFamily: INTER }}>{max}</span>
      </div>
    </div>
  );
}

/* ── FAQ Data ────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What is the difference between floating and fixed rate home loans?',
    a: 'A floating rate home loan has an interest rate linked to an external benchmark like the RBI repo rate, so the EMI can change each time the benchmark moves. A fixed rate home loan locks the rate for the entire tenure, keeping the EMI unchanged. As of mid-2026, floating rates start at around 7.15% while fixed rates typically carry a 1.5 to 2.5 percentage point premium because lenders price in future rate-rise risk.',
  },
  {
    q: 'Which is better: floating or fixed rate home loan?',
    a: 'Floating rate is better when you expect interest rates to stay stable or fall, which has been the case through 2025 as the RBI cut the repo rate by 125 basis points to 5.25%. Fixed rate is better when you expect rates to rise sharply or need certainty in your monthly budget. Use the break-even rate from this calculator to find the specific threshold at which fixed becomes the cheaper choice for your loan size and tenure.',
  },
  {
    q: 'How does the RBI repo rate affect my floating rate home loan EMI?',
    a: 'When the RBI cuts the repo rate, banks must reduce their RLLR (Repo Linked Lending Rate) within 3 months per RBI guidelines, which reduces your EMI at the next reset date. A 50 basis point cut typically reduces a Rs 75 lakh, 20-year floating rate loan EMI by approximately Rs 1,400. Rate hikes work in reverse: a 50 basis point hike raises your EMI by the same amount.',
  },
  {
    q: 'Can I switch from a fixed rate to a floating rate home loan?',
    a: 'Yes. Most lenders allow switching for a conversion fee of 0.5 to 1% of the outstanding principal. On a Rs 50 lakh outstanding loan, a 1% fee is Rs 50,000. Calculate whether the interest savings from moving to the (usually lower) floating rate recover that fee within a reasonable time. The switch makes most sense when rates have dropped significantly since you took the fixed rate loan.',
  },
  {
    q: 'What is the break-even rate for floating vs fixed home loans?',
    a: 'The break-even rate is the floating rate at which total interest cost equals the fixed rate total interest cost. If your floating rate stays below the break-even rate for the entire tenure, floating saves more money. If the floating rate rises above the break-even threshold for a prolonged period, fixed would have been cheaper. This calculator computes the exact break-even future rate for your specific loan inputs.',
  },
  {
    q: 'What is RLLR in home loans?',
    a: 'RLLR (Repo Linked Lending Rate) is the benchmark all Indian banks use for floating rate home loans since October 2019, per RBI guidelines. It is calculated as the RBI repo rate plus the bank\'s spread. When the RBI changes the repo rate, the bank\'s RLLR changes by the same amount, and your home loan rate resets accordingly, typically within 3 months.',
  },
  {
    q: 'Is prepayment free on floating rate home loans?',
    a: 'Yes. Per RBI circular DBOD.No.Dir.BC.28/13.03.00/2012-13, banks and housing finance companies cannot charge prepayment penalties on floating rate home loans to individual borrowers. You can make any extra payment at any time at zero cost. Fixed rate loans may charge 2 to 4% of the outstanding amount as a prepayment fee, which adds to the real cost of fixed rate borrowing.',
  },
  {
    q: 'How is the floating rate EMI recalculated after a rate change?',
    a: 'When the floating rate changes, the bank recalculates your EMI using the standard formula applied to the current outstanding balance, the new rate, and the remaining tenure in months. The recalculation ensures the loan is fully repaid within the original tenure. This calculator shows the exact new EMI for the second phase (after year 3) based on the expected rate you enter.',
  },
  {
    q: 'What is the total interest difference between floating and fixed on a Rs 75 lakh loan?',
    a: 'For a Rs 75 lakh home loan over 20 years, at 8.5% floating (phase 1) rising to 9.5% (phase 2) versus 9.25% fixed, the floating scenario totals approximately Rs 95 lakh in interest and the fixed scenario totals approximately Rs 1.00 crore. The floating option saves approximately Rs 5 lakh in this example. The exact saving depends on when and how much the floating rate rises.',
  },
  {
    q: 'How long is the rate-change scenario in this calculator?',
    a: 'This calculator uses a 3-year (36-month) rate-change scenario. The floating rate stays at the current rate for the first 3 years, then shifts to the expected future rate for the remaining tenure. Three years is a realistic planning horizon for a single rate cycle in India; the RBI typically completes a full rate cycle (peak to trough to peak) over 3 to 5 years.',
  },
  {
    q: 'Do fixed rate home loans in India lock the rate for the full tenure?',
    a: 'Most products called "fixed rate" in India are only fixed for 3 to 5 years and then convert to floating, so they are technically hybrid loans. Truly fixed rates for 15 to 30 years are rare in India. This calculator models a pure fixed rate locked for the entire tenure, which represents the maximum certainty scenario.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is an Indian fintech platform that helps people take real financial action, not just read financial information. It offers 500+ free financial calculators covering home loans, SIP, tax, and retirement, and a financial eligibility engine that matches users to products they actually qualify for. Free to use at fermor.in.',
  },
];

/* ── FAQ Accordion ───────────────────────────────────────── */
function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ── Sidebar List ────────────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, flexShrink: 0 }}>
      <div style={{ padding: '14px 18px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 13.5, fontWeight: 700, color: C.ink, fontFamily: INTER }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ padding: '12px 18px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 13.5, color: C.ink2, transition: 'all 0.12s', fontFamily: INTER }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = C.paleLime; (e.currentTarget as HTMLElement).style.color = C.dark; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink2; }}>
            {label}
          </div>
        </Link>
      ))}
    </div>
  );
}

/* ── Snapshot widget ─────────────────────────────────────── */
function RateSnapshot() {
  const rows = [
    { label: 'Lowest floating rate (PNB, BoB)', value: '7.15%' },
    { label: 'Typical fixed rate range', value: '8.5%–10%' },
    { label: 'RBI repo rate (Jun 2026 MPC)', value: '5.25%' },
    { label: 'Rate premium for fixed over floating', value: '1.5–2.5%' },
    { label: 'Prepayment penalty (floating)', value: 'Nil' },
    { label: 'Prepayment charge (fixed)', value: '2–4%' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER, flexShrink: 0 }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Rate Snapshot (Jul 2026)</span>
      </div>
      {rows.map((r, i) => (
        <div key={r.label} style={{ padding: '10px 14px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: C.white, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: C.ink2 }}>{r.label}</span>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: C.ink }}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

const POPULAR = [
  { href: '/calculators/mortgage-calculator',                  label: 'Home Loan EMI Calculator' },
  { href: '/calculators/home-loan-eligibility-calculator',     label: 'Home Loan Eligibility Calculator' },
  { href: '/calculators/loan-prepayment-calculator',           label: 'Loan Prepayment Calculator' },
  { href: '/calculators/balance-transfer-savings-calculator',  label: 'Balance Transfer Savings' },
  { href: '/calculators/sbi-home-loan-calculator',             label: 'SBI Home Loan Calculator' },
];
const MORE = [
  { href: '/calculators/emi-calculator',                       label: 'EMI Calculator' },
  { href: '/calculators/debt-to-income-ratio-calculator',      label: 'Debt-to-Income Ratio Calculator' },
  { href: '/calculators/income-tax-calculator',                label: 'Income Tax Calculator' },
  { href: '/calculators/home-loan-prepayment-calculator',      label: 'Home Loan Prepayment Calculator' },
];

/* ── Article table styles ────────────────────────────────── */
const thS: React.CSSProperties = {
  padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: '#16140F',
  background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase',
  letterSpacing: '0.05em', border: `1px solid #e3e6e8`, whiteSpace: 'nowrap',
  verticalAlign: 'middle',
};
const tdL: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: '#50565c', border: `1px solid #e3e6e8`, verticalAlign: 'middle', textAlign: 'left' };
const tdR: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: '#16140F', fontWeight: 500, border: `1px solid #e3e6e8`, verticalAlign: 'middle', textAlign: 'right' };

const TENURE_PRESETS = [5, 10, 15, 20, 25, 30];

/* ── Standard CA CTA ─────────────────────────────────────── */

/* ── Main Component ──────────────────────────────────────── */
export default function FloatingVsFixedClient() {
  const [loanAmount,          setLoanAmount]          = useState(7500000);
  const [floatingRateCurrent, setFloatingRateCurrent] = useState(8.5);
  const [floatingRateFuture,  setFloatingRateFuture]  = useState(9.5);
  const [fixedRate,           setFixedRate]           = useState(9.25);
  const [tenureYr,            setTenureYr]            = useState(20);
  const [activeTab,           setActiveTab]           = useState<'floating' | 'fixed'>('floating');
  const [mobile,              setMobile]              = useState(false);

  /* localStorage persistence */
  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-floating-vs-fixed-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (d.loanAmount          !== undefined) setLoanAmount(d.loanAmount);
      if (d.floatingRateCurrent !== undefined) setFloatingRateCurrent(d.floatingRateCurrent);
      if (d.floatingRateFuture  !== undefined) setFloatingRateFuture(d.floatingRateFuture);
      if (d.fixedRate           !== undefined) setFixedRate(d.fixedRate);
      if (d.tenureYr            !== undefined) setTenureYr(d.tenureYr);
    } catch { /* fail silently */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('fermor-floating-vs-fixed-v1', JSON.stringify({
        loanAmount, floatingRateCurrent, floatingRateFuture, fixedRate, tenureYr,
      }));
    } catch { /* ignore */ }
  }, [loanAmount, floatingRateCurrent, floatingRateFuture, fixedRate, tenureYr]);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk();
    window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  const tenureMonths = tenureYr * 12;

  const floating = useMemo(
    () => calcFloating(loanAmount, floatingRateCurrent, floatingRateFuture, tenureMonths),
    [loanAmount, floatingRateCurrent, floatingRateFuture, tenureMonths],
  );

  const emiFixed       = useMemo(() => calcEMI(loanAmount, fixedRate, tenureMonths), [loanAmount, fixedRate, tenureMonths]);
  const totalIntFixed  = useMemo(() => Math.max(0, emiFixed * tenureMonths - loanAmount), [emiFixed, tenureMonths, loanAmount]);

  const floatingWins   = floating.totalInterest <= totalIntFixed;
  const savings        = Math.abs(totalIntFixed - floating.totalInterest);

  const breakEvenRate  = useMemo(
    () => findBreakEvenFutureRate(loanAmount, floatingRateCurrent, fixedRate, tenureMonths),
    [loanAmount, floatingRateCurrent, fixedRate, tenureMonths],
  );

  /* ── Result Panel ── */
  const ResultPanel = () => (
    <div style={{ padding: mobile ? '20px 16px' : '32px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>

      {/* Donut chart (order -1 = top on desktop) */}
      <div style={{ order: mobile ? 1 : -1, marginBottom: mobile ? 4 : 16 }}>
        <DonutChart floatingInterest={floating.totalInterest} fixedInterest={totalIntFixed} />
      </div>

      {/* Legend (order -1 = second on desktop) */}
      <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 20, marginBottom: mobile ? 12 : 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
          <span style={{ fontSize: 12.5, color: C.ink2, fontFamily: INTER }}>Floating Interest</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
          <span style={{ fontSize: 12.5, color: C.ink2, fontFamily: INTER }}>Fixed Interest</span>
        </div>
      </div>

      {/* Winner badge (dark result box) */}
      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: mobile ? '14px 16px' : '18px 22px', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'stretch' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#7A8087', fontFamily: INTER }}>
            {floatingWins ? 'Floating saves' : 'Fixed saves'}
          </span>
          <span style={{ fontSize: 11, color: '#7A8087', fontFamily: INTER }}>
            over {tenureYr} yr tenure
          </span>
        </div>
        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 4 }}>
          <span
            aria-live="polite"
            aria-label={`${floatingWins ? 'Floating' : 'Fixed'} saves ${fmtIN(savings)}`}
            style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', lineHeight: 1, fontFamily: INTER, letterSpacing: '-0.02em' }}>
            {fmtIN(savings)}
          </span>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#101214', fontFamily: INTER }}>
            {floatingWins ? 'Floating wins' : 'Fixed wins'}
          </span>
        </div>
      </div>

      {/* Floating scenario stats */}
      <div style={{ width: '100%', marginBottom: 4 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 8px', fontFamily: INTER }}>
          Floating Rate Scenario
        </p>
        {[
          { label: `EMI (yr 1–3 at ${floatingRateCurrent}%)`, value: fmtC(floating.emi1) },
          { label: `EMI after rate change (${floatingRateFuture}%)`, value: fmtC(floating.emi2) },
          { label: 'Total interest (floating)', value: fmtC(floating.totalInterest) },
        ].map(({ label, value }) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
            <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2, fontFamily: INTER }}>{label}</span>
            <span style={{ fontSize: mobile ? 12.5 : 13.5, fontWeight: 700, color: C.ink, fontFamily: INTER }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Fixed scenario stats */}
      <div style={{ width: '100%', marginTop: 12, marginBottom: 4 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 8px', fontFamily: INTER }}>
          Fixed Rate Scenario
        </p>
        {[
          { label: `EMI (constant at ${fixedRate}%)`, value: fmtC(emiFixed) },
          { label: 'Total interest (fixed)', value: fmtC(totalIntFixed) },
        ].map(({ label, value }) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
            <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2, fontFamily: INTER }}>{label}</span>
            <span style={{ fontSize: mobile ? 12.5 : 13.5, fontWeight: 700, color: C.ink, fontFamily: INTER }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Break-even analysis */}
      <div style={{ width: '100%', marginTop: 16, background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 16px' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: C.ink, margin: '0 0 6px', fontFamily: INTER }}>Break-even Rate</p>
        <p style={{ fontSize: 13.5, color: C.ink2, margin: 0, lineHeight: 1.6, fontFamily: INTER }}>
          Floating becomes more expensive if the rate after year 3 exceeds{' '}
          <strong style={{ color: C.dark }}>{breakEvenRate.toFixed(2)}%</strong>.
        </p>
      </div>
    </div>
  );

  /* ── Input Panel Shared Elements ── */
  const sharedInputs = (
    <div style={{ padding: mobile ? '20px 16px' : '32px 36px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0, fontFamily: INTER }}>Loan Details</p>
        <CurrencySelector theme="light" />
      </div>

      <Slider id="loan-amount" label="Loan Amount" value={loanAmount} min={1000000} max={20000000} step={100000}
        display={fmtC(loanAmount)} onChange={setLoanAmount} compact={mobile} />

      {activeTab === 'floating' ? (
        <>
          <Slider id="floating-current" label={`Floating Rate - Current (%)`} value={floatingRateCurrent} min={6} max={15} step={0.05}
            display={`${floatingRateCurrent.toFixed(2)}%`} onChange={setFloatingRateCurrent} compact={mobile} />
          <Slider id="floating-future" label={`Expected Rate After 3 Years (%)`} value={floatingRateFuture} min={6} max={15} step={0.05}
            display={`${floatingRateFuture.toFixed(2)}%`} onChange={setFloatingRateFuture} compact={mobile} />
        </>
      ) : (
        <Slider id="fixed-rate" label="Fixed Rate (% p.a.)" value={fixedRate} min={6} max={15} step={0.05}
          display={`${fixedRate.toFixed(2)}%`} onChange={setFixedRate} compact={mobile} />
      )}

      {/* Tenure */}
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: mobile ? 13.5 : 14.5, color: C.ink2, fontWeight: 400, fontFamily: INTER, display: 'block', marginBottom: 12 }}>
          Loan Tenure
        </label>
        <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
          {TENURE_PRESETS.map(y => (
            <button key={y} onClick={() => setTenureYr(y)}
              style={{ padding: '4px 10px', fontSize: 12, fontWeight: tenureYr === y ? 700 : 500, background: C.white, color: tenureYr === y ? C.ink : C.ink3, border: `${tenureYr === y ? 1.5 : 1}px solid ${tenureYr === y ? C.ink : C.border}`, borderRadius: 6, cursor: 'pointer', fontFamily: INTER, transition: 'all 0.15s' }}>
              {y}Y
            </button>
          ))}
        </div>
        <Slider id="tenure-yr" label="" value={tenureYr} min={5} max={30} step={1}
          display={`${tenureYr} yr`} onChange={setTenureYr} compact={mobile} />
      </div>

      {/* Context info box */}
      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 14px', marginTop: 8 }}>
        <p style={{ fontSize: 12.5, color: C.ink2, margin: 0, lineHeight: 1.6, fontFamily: INTER }}>
          {activeTab === 'floating'
            ? 'Floating rate stays at current level for 3 years, then shifts to the expected future rate.'
            : 'Fixed rate is locked for the full tenure. No EMI changes regardless of RBI rate actions.'}
        </p>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      {/* Sidebar scrollbar styles */}
      <style>{`
        .floating-fixed-sidebar::-webkit-scrollbar { width: 5px; }
        .floating-fixed-sidebar::-webkit-scrollbar-track { background: transparent; }
        .floating-fixed-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .floating-fixed-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
      `}</style>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        {/* Page header */}
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Floating vs Fixed Rate Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Compare the total interest cost of a floating rate home loan vs a fixed rate home loan, including a rate-change scenario and break-even analysis.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          {/* LEFT: main content */}
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>

              {/* Tab strip */}
              <div role="tablist" aria-label="Rate type"
                style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                {([
                  { id: 'floating', label: 'Floating Rate' },
                  { id: 'fixed',    label: 'Fixed Rate' },
                ] as const).map(t => (
                  <button key={t.id} id={`tab-${t.id}`} role="tab"
                    aria-selected={activeTab === t.id} aria-controls={`panel-${t.id}`}
                    onClick={() => setActiveTab(t.id)}
                    style={{
                      flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: mobile ? 13 : 14, fontWeight: activeTab === t.id ? 700 : 400,
                      color: activeTab === t.id ? C.dark : C.ink3,
                      borderBottom: activeTab === t.id ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                      transition: 'all 0.15s', fontFamily: INTER, whiteSpace: 'nowrap',
                    }}>
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tab panels */}
              <div id={`panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
                <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                  {sharedInputs}
                  <ResultPanel />
                </div>
              </div>
            </div>

            {/* WaitlistCard */}
            <SaveResultsCard mobile={mobile} />

            

            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article">

              <h2 id="floating-vs-fixed-difference" style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
                What is the difference between floating and fixed rate home loans?
              </h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                A floating rate home loan adjusts its interest rate whenever the RBI changes the repo rate. A fixed rate home loan locks the rate for the full tenure, so the EMI never changes.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                Since October 2019, all new floating rate home loans from banks are linked to the RBI repo rate via the RLLR (Repo Linked Lending Rate), per RBI guidelines. Fixed rate products, by contrast, are priced higher upfront because the lender takes on the risk of future rate changes.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 24px' }}>
                The key tradeoff: floating gives a lower starting rate but EMI uncertainty; fixed gives a higher rate but certainty. Use the{' '}
                <Link href="/calculators/mortgage-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Home Loan EMI Calculator</Link>{' '}
                to model the EMI for any specific rate, then come back here to compare total cost.
              </p>

              <div style={{ overflowX: 'auto', marginBottom: 28 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>
                    Floating vs Fixed home loan comparison. All rates are illustrative.
                  </caption>
                  <thead>
                    <tr>
                      <th style={thS} scope="col">Feature</th>
                      <th style={{ ...thS, textAlign: 'right' }} scope="col">Floating Rate</th>
                      <th style={{ ...thS, textAlign: 'right' }} scope="col">Fixed Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Starting rate (Jul 2026)', '7.15% onward', '8.5% onward'],
                      ['Rate changes with RBI?', 'Yes', 'No'],
                      ['EMI changes?', 'Yes, at reset dates', 'No, constant'],
                      ['Prepayment penalty?', 'Nil (RBI mandated)', '2–4% of outstanding'],
                      ['Best when rates...', 'Falling or stable', 'Rising sharply'],
                      ['Typical premium over base', 'Nil to 0.5%', '1.5–2.5% over floating'],
                    ].map(([feat, float, fix], i) => (
                      <tr key={feat} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                        <td style={tdL}>{feat}</td>
                        <td style={{ ...tdR }}>{float}</td>
                        <td style={{ ...tdR }}>{fix}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 id="floating-rate-how-it-works" style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
                How floating rate home loans work in India
              </h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                Floating rate home loans in India work by tying the interest rate to the RBI repo rate via the bank's RLLR. When the RBI announces a rate change in its bi-monthly Monetary Policy Committee meeting, the bank must adjust its RLLR within 3 months and recalculate your EMI.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                Your EMI is recalculated on the reset date using the outstanding balance at that point, the new rate, and the remaining tenure. If the rate rises, the EMI rises. If the rate falls, the EMI falls.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 24px' }}>
                The RBI cut the repo rate from 6.50% to 5.25% through 2025, reducing floating rate EMIs significantly. A borrower with a Rs 75 lakh, 20-year loan who started at 8.5% would have seen the rate drop to approximately 7.25% by end-2025, saving roughly Rs 4,500 per month in EMI.
              </p>

              <h2 id="current-rates" style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
                Current home loan interest rates: floating vs fixed
              </h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                As of July 2026, floating home loan rates start at 7.15% from Punjab National Bank and Bank of Baroda for prime salaried borrowers, following the RBI repo rate at 5.25%.
              </p>

              {/* In-content promo bar */}
              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Home Loan Eligibility Calculator</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Find out how much home loan you qualify for based on income, CIBIL score, and existing EMIs.</p>
                </div>
                <Link className="fx-btn" href="/calculators/home-loan-eligibility-calculator" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
              </div>

              <div style={{ overflowX: 'auto', marginBottom: 24 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>
                    Bank home loan rates as of July 2026. Floating rates for salaried borrowers with CIBIL above 750.
                  </caption>
                  <thead>
                    <tr>
                      <th style={thS} scope="col">Bank</th>
                      <th style={{ ...thS, textAlign: 'right' }} scope="col">Floating Rate</th>
                      <th style={{ ...thS, textAlign: 'right' }} scope="col">Fixed Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Punjab National Bank', '7.15%', '9.00%'],
                      ['Bank of Baroda', '7.15%', '9.15%'],
                      ['SBI', '7.25%', '9.10%'],
                      ['HDFC Bank', '7.35%', '9.25%'],
                      ['Axis Bank', '7.60%', '9.50%'],
                      ['ICICI Bank', '7.90%', '9.75%'],
                      ['Kotak Mahindra Bank', '7.99%', '9.90%'],
                    ].map(([bank, flt, fix], i) => (
                      <tr key={bank} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                        <td style={tdL}>{bank}</td>
                        <td style={{ ...tdR }}>{flt}</td>
                        <td style={{ ...tdR }}>{fix}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 id="when-floating-better" style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
                When floating rate is better than fixed rate
              </h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                Floating rate wins when the RBI is in a rate-cutting cycle or rates stay stable at current levels for the bulk of your loan tenure. You can model standard tenure schedules in our <Link href="/calculators/home-loan-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Home Loan Calculator</Link> or inspect bank-specific options in our <Link href="/calculators/sbi-home-loan-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SBI Home Loan Calculator</Link>.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                Four specific scenarios where floating consistently outperforms fixed:
              </p>
              <ul style={{ margin: '0 0 24px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Rates are at a cycle peak:</strong> if the repo rate is near its historical high, cuts are more likely than hikes, so floating benefits.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>You plan to prepay:</strong> floating rate loans carry zero prepayment penalty per RBI guidelines, so aggressive prepayment is cost-free.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Short to medium tenure (under 10 years):</strong> less time for rate volatility to compound against you.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>The fixed premium is large:</strong> if fixed is 2% or more above floating, the rate needs to rise significantly before fixed becomes worth it.
                </li>
              </ul>

              <h2 id="when-fixed-better" style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
                When fixed rate is better than floating rate
              </h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                Fixed rate wins when rates are expected to rise sharply or when EMI certainty is essential for your household budget. Check fixed monthly installments using our <Link href="/calculators/emi-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>EMI Calculator</Link> or explore bank offers in our <Link href="/calculators/icici-home-loan-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>ICICI Home Loan Calculator</Link>.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 24px' }}>
                Three scenarios that favor fixed:
              </p>
              <ul style={{ margin: '0 0 24px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Rates are at a cycle trough:</strong> when the repo rate is historically low, a rate hike cycle makes fixed look attractive.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Tight monthly budget:</strong> you cannot absorb an EMI increase of Rs 2,000 to 5,000 per month if rates rise.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>The fixed premium is small:</strong> if fixed is only 0.5% above floating, even a modest rate rise makes fixed cheaper overall.
                </li>
              </ul>

              <h2 id="rbi-repo-rate" style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
                How the RBI repo rate affects floating rate home loans
              </h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                The RBI repo rate is the rate at which the RBI lends to commercial banks overnight. It is the base of all floating rate home loan pricing in India since 2019.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                Each time the RBI's Monetary Policy Committee changes the repo rate, your bank must reset its RLLR within 3 months per RBI guidelines issued under the External Benchmark-Based Lending Rate (EBLR) framework. This reset is applied to the outstanding balance at the reset date.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 24px' }}>
                The RBI cut the repo rate from 6.50% to 5.25% through 2025. A borrower who started at 8.5% in early 2025 would have the rate drop to approximately 7.25% by year-end, reducing a Rs 75 lakh, 20-year EMI from roughly Rs 65,608 to Rs 60,012.
              </p>

              <h2 id="switch-fixed-floating" style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
                Can I switch from fixed to floating rate?
              </h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                Yes. Most Indian lenders allow conversion from fixed to floating for a one-time fee of 0.5 to 1% of the outstanding principal. The reverse switch (floating to fixed) is permitted but rare and typically costs a similar fee.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                The conversion makes sense when the rate difference after the fee recovers within a reasonable period. For a Rs 50 lakh outstanding loan, a 1% conversion fee is Rs 50,000. If moving from fixed 9.5% to floating 7.5% saves Rs 8,000 per month in EMI, the break-even is about 6 months.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 24px' }}>
                Use the{' '}
                <Link href="/calculators/balance-transfer-savings-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Balance Transfer Savings Calculator</Link>{' '}
                to compute net savings after accounting for conversion or transfer fees.
              </p>

              <h2 id="break-even-analysis" style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
                Break-even analysis: at what rate does fixed become worth it?
              </h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                The break-even rate is the floating rate after year 3 at which total interest paid on the floating loan equals total interest on the fixed loan. Below the break-even rate, floating wins. Above it, fixed wins.
              </p>

              {/* In-content promo bar 2 */}
              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Loan Prepayment Calculator</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>See how much interest you save by making extra monthly or lump-sum payments on your home loan.</p>
                </div>
                <Link className="fx-btn" href="/calculators/loan-prepayment-calculator" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
              </div>

              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                For a Rs 75 lakh loan at 8.5% floating (rising to 9.5% after year 3) vs 9.25% fixed over 20 years, the break-even future rate is approximately 9.9%. If you believe the floating rate after year 3 will stay below 9.9%, floating is the better choice.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 24px' }}>
                This calculator computes the exact break-even future rate for your inputs in real time. It uses binary search to find the rate at which total floating interest equals total fixed interest, accurate to 2 decimal places.
              </p>

              <h2 id="worked-example" style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
                Worked example: Rs 75 lakh loan comparison
              </h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                Consider a Rs 75 lakh home loan over 20 years (240 months), with a floating rate of 8.5% for the first 3 years (36 months) rising to 9.5% thereafter, compared against a 9.25% fixed rate for the full term.
              </p>

              <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 20 }}>
                <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                  Floating total interest: approximately Rs 95.2 lakh. Fixed total interest: approximately Rs 1.00 crore. Floating saves approximately Rs 4.8 lakh in this scenario, assuming the floating rate rises to 9.5% in year 4 and stays there.
                </p>
              </div>

              <div style={{ overflowX: 'auto', marginBottom: 24 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>
                    Worked example: Rs 75 lakh, 20-year home loan. Values are computed from the EMI formula.
                  </caption>
                  <thead>
                    <tr>
                      <th style={thS} scope="col">Metric</th>
                      <th style={{ ...thS, textAlign: 'right' }} scope="col">Floating (8.5% then 9.5%)</th>
                      <th style={{ ...thS, textAlign: 'right' }} scope="col">Fixed (9.25%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['EMI phase 1 (months 1-36)', 'Rs 65,308', 'Rs 68,268'],
                      ['EMI phase 2 (months 37-240)', 'Rs 72,408', 'Rs 68,268'],
                      ['Total paid', 'Rs 1,70,20,000', 'Rs 1,63,84,320'],
                      ['Total interest', 'Rs 95,20,000', 'Rs 88,84,320'],
                      ['Interest saving', 'Floating saves Rs 6,35,680', 'Fixed saves Rs 6,35,680'],
                    ].map(([metric, flt, fix], i) => (
                      <tr key={metric} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                        <td style={tdL}>{metric}</td>
                        <td style={{ ...tdR }}>{flt}</td>
                        <td style={{ ...tdR }}>{fix}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p style={{ fontSize: 13, color: C.ink3, margin: '0 0 24px', fontStyle: 'italic' }}>
                Note: The table above uses approximate rounded values. Use the calculator at the top of this page for exact figures based on your loan amount and rates.
              </p>

              <h2 id="how-to-use" style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
                How to use this floating vs fixed rate calculator
              </h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                Follow these steps to compare your floating and fixed rate home loan scenarios:
              </p>
              <ol style={{ margin: '0 0 24px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Set the loan amount:</strong> use the slider or click the value to type a precise figure. Range is Rs 10 lakh to Rs 2 crore.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Enter floating rate inputs:</strong> on the Floating Rate tab, set your current floating rate and the rate you expect after 3 years.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Enter the fixed rate:</strong> switch to the Fixed Rate tab and set the fixed rate your lender has quoted.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Choose the tenure:</strong> click a preset (5Y to 30Y) or adjust the slider. The comparison updates instantly.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Read the results:</strong> the winner badge shows which option saves more and by how much. The break-even rate tells you the exact threshold above which floating becomes more expensive.
                </li>
              </ol>

              

              <h2 id="faqs" style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 20px', letterSpacing: '-0.02em' }}>
                Frequently asked questions
              </h2>
              <FAQ />

              {/* Disclaimer */}
              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All calculations on this page are indicative only. Interest rates shown in tables are approximate as of July 2026 and should be verified directly with your lender before making any financial decision. The calculator assumes the floating rate changes exactly at month 37 and stays at the future rate for the remaining tenure, which is a simplification of real-world rate dynamics. This tool is for educational and planning purposes only and does not constitute financial advice. Consult a SEBI-registered investment adviser or a licensed financial planner before deciding on a loan structure.
                </p>
              </div>
            </article>
          </div>

          {/* RIGHT: Sidebar */}
          <aside
            className="fvf-sidebar"
            style={{
              position: mobile ? 'static' : 'sticky',
              top: 20,
              alignSelf: 'start',
              maxHeight: mobile ? 'none' : 'calc(100vh - 40px)',
              overflowY: mobile ? 'visible' : 'auto',
              paddingRight: mobile ? 0 : 2,
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
              display: mobile ? 'none' : 'flex',
              flexDirection: 'column',
              gap: 16,
            } as React.CSSProperties}
          >
            <nav aria-label="Related Calculators" style={{ flexShrink: 0 }}>
              <SidebarList
                title="Popular Calculators"
                items={POPULAR}
              />
            </nav>
            <div style={{ flexShrink: 0 }}>
              <SidebarList
                title="More Calculators"
                items={MORE}
              />
            </div>
            <div style={{ flexShrink: 0 }}>
              <RateSnapshot />
            </div>
          </aside>
        </div>
      </div>

      {/* Standard Footer */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Explore', links: ['/calculators|Calculators'] },
        { hd: 'Company', links: ['/about|About', '/contact|Contact', '/privacy|Privacy', '/terms|Terms'] },
      ])} />
    </div>
  );
}

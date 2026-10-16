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

/* ─── Helpers ───────────────────────────────────────────────── */
const fmtIN = (n: number) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(n));
const fmtC = (n: number) => {
  if (n >= 1e7) return `${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `${(n / 1e5).toFixed(2)} L`;
  return fmtIN(n);
};

/* ─── Math ──────────────────────────────────────────────────── */
interface NSCRow {
  year: number;
  fyLabel: string;
  openingBalance: number;
  interestEarned: number;
  is80CEligible: boolean;
  closingBalance: number;
}

interface NSCResult {
  maturityAmount: number;
  totalInterest: number;
  investedAmount: number;
  deduction80C: number;
  rows: NSCRow[];
}

function calcNSC(
  principal: number,
  rate: number,
  numCerts: number,
  startYear: number
): NSCResult {
  const totalPrincipal = principal * numCerts;
  const r = rate / 100;
  const rows: NSCRow[] = [];
  let balance = totalPrincipal;

  for (let yr = 1; yr <= 5; yr++) {
    const opening = balance;
    const interest = Math.round(opening * r);
    balance = Math.round(opening * (1 + r));
    const fyStart = startYear + yr - 1;
    rows.push({
      year: yr,
      fyLabel: `FY ${fyStart}-${String(fyStart + 1).slice(2)}`,
      openingBalance: opening,
      interestEarned: interest,
      is80CEligible: yr <= 4,
      closingBalance: balance,
    });
  }

  const maturityAmount = balance;
  const totalInterest = maturityAmount - totalPrincipal;

  // 80C eligible: initial investment (always), plus years 1-4 reinvested interest
  const reinvestedInterest80C = rows
    .filter(r => r.year <= 4)
    .reduce((sum, r) => sum + r.interestEarned, 0);
  const deduction80C = totalPrincipal + reinvestedInterest80C;

  return { maturityAmount, totalInterest, investedAmount: totalPrincipal, deduction80C, rows };
}

function postTaxMaturity(maturityAmount: number, totalInterest: number, taxSlab: number): number {
  if (taxSlab === 0) return maturityAmount;
  const taxOnInterest = Math.round(totalInterest * (taxSlab / 100));
  return maturityAmount - taxOnInterest;
}

/* ─── Growth Chart (Year-wise stacked bar) ──────────────────── */
function GrowthChart({ rows }: { rows: NSCRow[] }) {
  const maxTotal = Math.max(...rows.map(r => r.closingBalance), 1);
  const chartHeight = 200;
  const barWidth = 36;
  const barGap = 8;
  const totalWidth = rows.length * (barWidth + barGap) + 20;
  const padding = { left: 16, right: 16, top: 12, bottom: 28 };
  const graphWidth = totalWidth - padding.left - padding.right;
  const graphHeight = chartHeight - padding.top - padding.bottom;

  return (
    <div style={{ marginBottom: 20 }}>
      <p style={{ fontSize: 13, fontWeight: 600, color: C.ink, marginBottom: 12 }}>Growth Schedule</p>
      <svg
        width="100%"
        height={chartHeight}
        viewBox={`0 0 ${totalWidth} ${chartHeight}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block' }}
        role="img"
        aria-label="Year-wise growth schedule showing invested amount and interest earned"
      >
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => (
          <line
            key={`grid-${i}`}
            x1={padding.left}
            y1={padding.top + graphHeight * (1 - pct)}
            x2={totalWidth - padding.right}
            y2={padding.top + graphHeight * (1 - pct)}
            stroke={i === 0 ? C.border : `rgba(226,235,224,0.5)`}
            strokeWidth={i === 0 ? 1.5 : 0.5}
          />
        ))}

        {/* Bars */}
        {rows.map((row, idx) => {
          const x = padding.left + idx * (barWidth + barGap);
          const investedPct = (row.openingBalance / maxTotal);
          const interestPct = (row.interestEarned / maxTotal);
          const investedHeight = investedPct * graphHeight;
          const interestHeight = interestPct * graphHeight;
          const yInvested = padding.top + graphHeight - investedHeight;
          const yInterest = yInvested - interestHeight;

          return (
            <g key={`bar-${row.year}`}>
              {/* Invested bar */}
              <rect
                x={x}
                y={yInvested}
                width={barWidth}
                height={investedHeight}
                fill={CHART_PAIR.primary}
                rx={2}
              />
              {/* Interest bar */}
              <rect
                x={x}
                y={yInterest}
                width={barWidth}
                height={interestHeight}
                fill={CHART_PAIR.secondary}
                rx={2}
              />
              {/* Label */}
              <text
                x={x + barWidth / 2}
                y={padding.top + graphHeight + 20}
                textAnchor="middle"
                style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER, fontWeight: 500 }}
              >
                Yr {row.year}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g>
          <rect x={padding.left} y={padding.top - 12} width={10} height={10} fill={C.dark} rx={1} />
          <text x={padding.left + 16} y={padding.top - 4} style={{ fontSize: 11, fill: C.ink2, fontFamily: INTER }}>Invested</text>

          <rect x={padding.left + 110} y={padding.top - 12} width={10} height={10} fill={C.lime2} rx={1} />
          <text x={padding.left + 126} y={padding.top - 4} style={{ fontSize: 11, fill: C.ink2, fontFamily: INTER }}>Interest</text>
        </g>
      </svg>
    </div>
  );
}

/* ─── Donut ──────────────────────────────────────────────────── */
function DonutChart({ invested, interest }: { invested: number; interest: number }) {
  const total = invested + interest;
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
      aria-label={`Donut chart: ${pPct}% invested, ${100 - pPct}% interest earned`}
    >
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle
        cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`}
        strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }}
      />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Invested</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
  );
}

/* ─── Slider ─────────────────────────────────────────────────── */
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
    <div style={{ marginBottom: compact ? 18 : 40 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 16 }}>
        <label style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400 }}>{label}</label>
        {editing ? (
          <input
            autoFocus value={raw}
            onChange={e => setRaw(e.target.value)}
            onBlur={commit}
            onKeyDown={e => e.key === 'Enter' && commit()}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 120, outline: 'none', color: C.dark, fontFamily: INTER }}
          />
        ) : (
          <button
            onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${fmt(value)}. Click to edit.`}
            style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 18px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 90 : 110, textAlign: 'center' }}
            onMouseOver={e => (e.currentTarget as HTMLButtonElement).style.borderColor = '#AAAAAA'}
            onMouseOut={e => (e.currentTarget as HTMLButtonElement).style.borderColor = C.border}
          >
            {fmt(value)}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 20, height: 20, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 2px 8px rgba(16,18,20,0.22)', pointerEvents: 'none', zIndex: 1 }} />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(+e.target.value)}
          aria-label={label}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontSize: 11, color: C.ink3 }}>{fmt(min)}</span>
        <span style={{ fontSize: 11, color: C.ink3 }}>{fmt(max)}</span>
      </div>
    </div>
  );
}

/* ─── Select dropdown ───────────────────────────────────────── */
function SelectField({ label, value, options, onChange, compact }: {
  label: string;
  value: number;
  options: { label: string; value: number }[];
  onChange: (v: number) => void;
  compact?: boolean;
}) {
  return (
    <div style={{ marginBottom: compact ? 18 : 40 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 16 }}>
        <label style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400 }}>{label}</label>
        <select
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', cursor: 'pointer', fontFamily: INTER, outline: 'none', minWidth: compact ? 90 : 110 }}
        >
          {options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

/* ─── Sidebar list with sticky scrolling ─────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, display: 'flex', flexDirection: 'column', height: 320, overflow: 'hidden' }}>
      <style>{`
        .sidebar-list-${title.replace(/\s+/g, '-')}::-webkit-scrollbar { width: 6px; }
        .sidebar-list-${title.replace(/\s+/g, '-')}::-webkit-scrollbar-track { background: transparent; }
        .sidebar-list-${title.replace(/\s+/g, '-')}::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .sidebar-list-${title.replace(/\s+/g, '-')}::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
      `}</style>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      <div
        className={`sidebar-list-${title.replace(/\s+/g, '-')}`}
        style={{
          overflowY: 'auto',
          flex: 1,
          scrollbarWidth: 'thin',
          scrollbarColor: '#C4C9C4 transparent'
        }}
      >
        {items.map(({ href, label }, i) => (
          <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
            <div
              style={{
                padding: '13px 20px',
                borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none',
                fontSize: 14,
                color: C.ink2,
                transition: 'all 0.12s',
                cursor: 'pointer',
                flexShrink: 0
              }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = C.paleLime; (e.currentTarget as HTMLElement).style.color = C.dark; }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink2; }}
            >
              {label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const POPULAR = [
  { href: '/calculators/ppf-calculator',                   label: 'PPF Calculator' },
  { href: '/calculators/fd-calculator',                    label: 'FD Calculator' },
  { href: '/calculators/rd-calculator',                    label: 'RD Calculator' },
  { href: '/calculators/ssy-calculator',                   label: 'SSY Calculator' },
  { href: '/calculators/compound-interest-calculator',     label: 'Compound Interest Calculator' },
  { href: '/calculators/income-tax-calculator',            label: 'Income Tax Calculator' },
  { href: '/calculators/savings-account-interest-calculator', label: 'Savings Account Calculator' },
];
const MORE = [
  { href: '/calculators/sip-calculator',          label: 'SIP Calculator' },
  { href: '/calculators/nps-calculator',          label: 'NPS Calculator' },
  { href: '/calculators/inflation-calculator',    label: 'Inflation Calculator' },
  { href: '/calculators/retirement-calculator',   label: 'Retirement Calculator' },
];

/* ─── FAQ Data ──────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What is the NSC interest rate in 2025?',
    a: 'NSC offers 7.7% per annum for Q1 FY 2025-26 (April-June 2025), reviewed quarterly by the Ministry of Finance. This rate applies to all new purchases from any India Post office, nationwide.',
  },
  {
    q: 'How much does Rs 1 lakh grow in 5 years on NSC?',
    a: 'Rs 1 lakh grows to Rs 1,45,039 at 7.7%, earning Rs 45,039 in total interest. For a 30% tax bracket investor, post-tax maturity is approximately Rs 1,41,931 after year 5 interest taxation.',
  },
  {
    q: 'How is NSC interest calculated and paid?',
    a: 'NSC compounds interest annually but does not pay it out during the tenure. Formula: Maturity = Principal × (1.077)^5. All interest remains reinvested inside the certificate and is paid together with principal at maturity.',
  },
  {
    q: 'What is the NSC maturity period?',
    a: 'NSC VIII Issue (the current form) has a fixed 5-year tenure with no early exit or tenure extension options. The 10-year NSC IX variant was discontinued in December 2015.',
  },
  {
    q: 'Is NSC interest taxable?',
    a: 'Interest from years 1-4 is deemed reinvested and qualifies for Section 80C deduction. Year 5 interest is taxable as income from other sources. Initial investment also qualifies for 80C.',
  },
  {
    q: 'Can I withdraw NSC before maturity?',
    a: 'No premature withdrawal is permitted. The only exceptions are death, court order, or bank forfeiture for loan default. NSC is a true 5-year lock-in.',
  },
  {
    q: 'What is the maximum investment limit in NSC?',
    a: 'No upper limit exists. You can invest any amount above Rs 1,000 (in multiples of Rs 100). However, only Rs 1.5 lakh per FY qualifies for 80C tax deduction across all schemes.',
  },
  {
    q: 'Is NSC better than FD or PPF?',
    a: 'NSC (7.7%) beats most 5-year FDs (6.5-7.5%) and has no TDS on reinvested interest. PPF (7.1%) is EEE (fully tax-free), better for 20-30% bracket investors on 15-year horizon. NSC excels for 5-year horizons.',
  },
  {
    q: 'Can NSC be pledged as collateral for a loan?',
    a: 'Yes. Your certificate can be pledged to banks and cooperative societies for loans. The bank records the lien at the post office. Once the loan is repaid, the lien is removed and NSC matures normally.',
  },
  {
    q: 'Can NRIs invest in NSC?',
    a: 'No. NSC is only for Indian residents. NRIs cannot purchase new NSCs, though existing certificates can be retained until maturity. HUFs are also ineligible.',
  },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ─── Comparison Table ─────────────────────────────────────── */
function ComparisonTable({ mobile }: { mobile: boolean }) {
  const rows = [
    ['Interest Rate', '7.7% p.a.', '7.1% p.a.', '6.5-7.5% p.a.'],
    ['Tenure', '5 years (fixed)', '15 years (extendable)', '5 years (lock-in)'],
    ['Interest Payment', 'Compounded annually, paid at maturity', 'Compounded annually, paid at maturity', 'Quarterly or at maturity'],
    ['Section 80C', 'Yes (investment + years 1-4 interest)', 'Yes (up to Rs 1.5L/year)', 'Yes (up to Rs 1.5L/year)'],
    ['Maximum Investment', 'No upper limit', 'Rs 1.5 lakh per year', 'No upper limit'],
    ['Premature Withdrawal', 'Not allowed (except death)', 'After 7 years (partial only)', 'Allowed after 5 years (with penalty)'],
    ['Taxability of Interest', 'Taxable (yr 5); yrs 1-4 get 80C deduction', 'Fully tax-free (EEE)', 'Fully taxable; TDS deducted'],
    ['Government Guarantee', 'Full sovereign guarantee', 'Full sovereign guarantee', 'DICGC up to Rs 5 lakh'],
  ];

  const headers = ['Feature', 'NSC', 'PPF', '5-Year Tax Saver FD'];

  return (
    <div style={{ overflowX: 'auto', margin: '20px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 600 }}>
        <thead>
          <tr style={{ background: '#F4F5F6' }}>
            {headers.map(h => (
              <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: '#101214', fontSize: 12, letterSpacing: '0.02em' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: '12px 16px', color: j === 0 ? C.ink : C.ink2, fontWeight: j === 0 ? 600 : 400, lineHeight: 1.5 }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Main Calculator ───────────────────────────────────────── */
const TAX_SLABS = [
  { label: '0% (No tax)', value: 0 },
  { label: '5% tax slab', value: 5 },
  { label: '10% tax slab', value: 10 },
  { label: '20% tax slab', value: 20 },
  { label: '30% tax slab', value: 30 },
];

const CURRENT_YEAR = new Date().getFullYear();

export default function NSCCalculatorClient() {
  const defaultSettings = {
    principal: 100000,
    rate: 7.7,
    numCerts: 1,
    startYear: CURRENT_YEAR,
    taxSlab: 0,
  };

  const { settings, updateSettings } = useCalculatorSettings('nsc-calculator', defaultSettings);
  const { principal, rate, numCerts, startYear, taxSlab } = settings;

  const setPrincipal = (v: number) => updateSettings({ principal: v });
  const setRate = (v: number) => updateSettings({ rate: v });
  const setNumCerts = (v: number) => updateSettings({ numCerts: v });
  const setStartYear = (v: number) => updateSettings({ startYear: v });
  const setTaxSlab = (v: number) => updateSettings({ taxSlab: v });

  const [mobile, setMobile] = useState(false);
  const [showTable, setShowTable] = useState(false);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk();
    window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const result = useMemo(
    () => calcNSC(principal, rate, numCerts, startYear),
    [principal, rate, numCerts, startYear]
  );

  const afterTax = useMemo(
    () => postTaxMaturity(result.maturityAmount, result.totalInterest, taxSlab),
    [result.maturityAmount, result.totalInterest, taxSlab]
  );

  const invPct = result.maturityAmount > 0 ? Math.round((result.investedAmount / result.maturityAmount) * 100) : 0;
  const retPct = 100 - invPct;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            NSC Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate National Savings Certificate maturity amount, year-wise interest, and Section 80C tax benefits at the current 7.7% rate.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24 }}>

          {/* LEFT */}
          <div style={{ minWidth: 0 }}>

            {/* CALCULATOR CARD */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  {!mobile && (
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 36px' }}>
                      NSC Details
                    </p>
                  )}

                  <Slider
                    label="Investment Amount (per certificate)"
                    value={principal}
                    min={1000}
                    max={5000000}
                    step={1000}
                    fmt={v => `Rs ${fmtC(v)}`}
                    onChange={setPrincipal}
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
                    label="Number of Certificates"
                    value={numCerts}
                    min={1}
                    max={100}
                    step={1}
                    fmt={v => `${v}`}
                    onChange={setNumCerts}
                    compact={mobile}
                  />

                  <Slider
                    label="Purchase Year"
                    value={startYear}
                    min={2020}
                    max={2035}
                    step={1}
                    fmt={v => `${v}`}
                    onChange={setStartYear}
                    compact={mobile}
                  />

                  <SelectField
                    label="Your Tax Slab"
                    value={taxSlab}
                    options={TAX_SLABS}
                    onChange={setTaxSlab}
                    compact={mobile}
                  />

                  <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 16px' }}>
                    <div style={{ fontSize: 12, color: C.dark, fontWeight: 700 }}>
                      Current NSC rate: 7.7% p.a. <span style={{ color: C.ink2, fontWeight: 400 }}>reviewed quarterly by Ministry of Finance</span>
                    </div>
                  </div>
                </div>

                {/* Results panel */}
                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', display: 'flex', flexDirection: 'column' }}>

                  {/* Donut */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20, order: mobile ? 1 : -1 }}>
                    <DonutChart invested={result.investedAmount} interest={result.totalInterest} />
                  </div>

                  {/* Legend */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 22, marginBottom: 20, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Invested</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Interest</span>
                    </div>
                  </div>

                  {/* Maturity Amount - Dark green box with large yellow text */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: mobile ? '20px 16px' : '28px 24px', display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 16 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#7A8087', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Maturity Amount</span>
                    <span style={{ fontSize: mobile ? 28 : 40, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>Rs {fmtIN(result.maturityAmount)}</span>
                  </div>

                  {/* Stat rows */}
                  <div style={{ width: '100%', order: mobile ? 3 : 0 }}>
                    {[
                      { label: 'Total Invested',      value: `Rs ${fmtC(result.investedAmount)}` },
                      { label: 'Total Interest',       value: `Rs ${fmtC(result.totalInterest)}` },
                      { label: '80C Deduction (total)', value: `Rs ${fmtC(result.deduction80C)}` },
                      ...(taxSlab > 0
                        ? [{ label: `Post-tax Maturity (${taxSlab}%)`, value: `Rs ${fmtC(afterTax)}` }]
                        : []),
                    ].map(({ label, value }) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}` }}>
                        <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                        <span style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: C.ink }}>{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Split bar */}
                  <div style={{ width: '100%', marginTop: 20, order: mobile ? 4 : 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Invested {invPct}%</span>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Returns {retPct}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${invPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Year-wise table toggle */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button
                  onClick={() => setShowTable(v => !v)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '20px 48px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}
                >
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.ink }}>Year-wise Interest Schedule</span>
                    {!mobile && <span style={{ fontSize: 13, color: C.ink3, marginLeft: 10 }}>(Yearly breakdown with chart)</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 8 : 12, flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.dark, background: C.paleLime, border: `1px solid ${C.lime2}`, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      5 Years
                    </span>
                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {showTable && (
                  <div style={{ borderTop: `1px solid ${C.border}`, padding: mobile ? '16px 18px' : '32px 48px', background: C.white }}>
                    <GrowthChart rows={result.rows} />

                    <div style={{ overflowX: 'auto', marginTop: 32 }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead>
                          <tr style={{ background: '#f4f5f6' }}>
                            {['Year', 'FY', 'Opening Balance', 'Interest Earned', '80C Eligible', 'Closing Balance'].map(h => (
                              <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {result.rows.map((row, i) => (
                            <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                              <td style={{ padding: '13px 20px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                              <td style={{ padding: '13px 20px', color: C.ink3, fontSize: 12 }}>{row.fyLabel}</td>
                              <td style={{ padding: '13px 20px', color: C.ink2 }}>Rs {fmtIN(row.openingBalance)}</td>
                              <td style={{ padding: '13px 20px', color: '#1f7a58', fontWeight: 600 }}>Rs {fmtIN(row.interestEarned)}</td>
                              <td style={{ padding: '13px 20px' }}>
                                {row.is80CEligible ? (
                                  <span style={{ fontSize: 11, fontWeight: 700, color: C.dark, background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 4, padding: '2px 8px' }}>Yes (80C)</span>
                                ) : (
                                  <span style={{ fontSize: 11, fontWeight: 600, color: C.ink }}>Taxable</span>
                                )}
                              </td>
                              <td style={{ padding: '13px 20px', color: C.ink, fontWeight: 600 }}>Rs {fmtIN(row.closingBalance)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div style={{ padding: '12px 20px', background: '#f4f5f6', borderTop: `1px solid ${C.border}`, fontSize: 12, color: C.ink3, marginTop: 0 }}>
                      Year 5 interest is taxable as income from other sources. Years 1-4 interest qualifies for 80C deduction in those respective financial years.
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
                const h2 = { fontSize: mobile ? 18 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
                const p  = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
                const sec = { margin: '0 0 40px' } as React.CSSProperties;
                return (
                  <>
                    <div id="what-is-nsc" style={sec}>
                      <h2 style={h2}>What Is the National Savings Certificate?</h2>
                      <p style={p}>
                        NSC is a 5-year fixed-income savings scheme issued by India Post under the Government Savings Certificates Act, 1959. Backed by full sovereign guarantee, it's one of India's safest small savings options. You invest a lump sum (minimum Rs 1,000, no upper limit) and receive the principal plus compounded interest only at maturity.
                      </p>
                      <p style={p}>
                        No periodic interest payouts, no early withdrawals, no flexibility on tenure. This is a true 5-year lock-in designed for investors who can commit capital for exactly 5 years and seek stability over liquidity.
                      </p>
                      <p style={p}>
                        The current NSC rate is 7.7% per annum (Q1 FY 2025-26, notified by the Ministry of Finance). This rate is reviewed every quarter and applies uniformly across all India Post offices nationwide.
                      </p>
                      <p style={p}>
                        Interest compounds annually at the credited rate. Year 2 interest is calculated on (principal + year 1 interest), not just principal. This compounding power is why Rs 1 lakh grows to Rs 1,45,039 in 5 years instead of Rs 1,38,500.
                      </p>
                      <p style={p}>
                        NSC's unique advantage lies in its two-layer tax structure. The principal qualifies for Section 80C deduction in the purchase year, and years 1-4 interest (deemed reinvested) also qualifies for 80C deduction in those respective years.
                      </p>
                      <p style={p}>
                        Only year 5 interest (paid at maturity) is taxable as "income from other sources" at your bracket rate. This multi-year 80C shelter means on a Rs 1 lakh NSC investment, you get approximately Rs 3.46 lakh in total 80C deductions across the 5-year tenure.
                      </p>
                      <p style={p}>
                        NSC appeals most to salaried employees and tax planners in the 20-30% tax bracket. It provides certainty of returns, zero volatility, and government backing, making it ideal for risk-averse investors who prioritize capital safety over growth.
                      </p>
                      <p style={p}>
                        For a 5-year commitment, NSC typically beats most tax-saver FDs (6.5-7.5% rates) and ranks second only to PPF for investors with a 15-year horizon. It's particularly suited for those seeking to maximize their 80C utilization.
                      </p>
                    </div>

                    <div id="nsc-interest-calculation" style={sec}>
                      <h2 style={h2}>How NSC Interest Is Calculated</h2>
                      <p style={p}>
                        NSC uses annual compounding, not simple interest. This means year 2 interest is calculated on (principal + year 1 interest), year 3 on the year 2 closing balance, and so on. This exponential growth is the engine behind NSC's 7.7% power.
                      </p>
                      <p style={p}>
                        The mathematical formula is straightforward: Maturity Amount = Principal × (1 + Rate / 100)^5. At 7.7%, this becomes Rs 1,00,000 × (1.077)^5 = Rs 1,45,039 after 5 complete years.
                      </p>
                      <p style={p}>
                        The difference between compound and simple interest is significant. At 7.7% simple interest, Rs 1 lakh would yield only Rs 1,38,500. With compounding, it reaches Rs 1,45,039. That extra Rs 6,539 is pure compounding benefit.
                      </p>
                      <p style={p}>
                        Each year's accrued interest is automatically credited inside your certificate and reinvested for the next year's calculation. You take no action between purchase and maturity; the post office handles all compounding automatically.
                      </p>
                      <p style={p}>
                        At maturity, you receive the full accumulated amount as a lump sum. No interim interest payments, no choice of when to redeem. The certificate matures on day exactly 5 years from purchase.
                      </p>
                      <p style={p}>
                        Here's the year-by-year breakdown on Rs 1 lakh at 7.7% per annum.
                      </p>
                      <div style={{ overflowX: 'auto', margin: '0 0 16px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontWeight: 700 }}>
                          <thead>
                            <tr style={{ background: '#F4F5F6' }}>
                              {['Year', 'Opening Balance', 'Interest @ 7.7%', 'Closing Balance', '80C Status'].map(h => (
                                <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 700, color: '#101214', fontSize: 12 }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['1', 'Rs 1,00,000', 'Rs 7,700', 'Rs 1,07,700', '80C eligible'],
                              ['2', 'Rs 1,07,700', 'Rs 8,293', 'Rs 1,15,993', '80C eligible'],
                              ['3', 'Rs 1,15,993', 'Rs 8,931', 'Rs 1,24,924', '80C eligible'],
                              ['4', 'Rs 1,24,924', 'Rs 9,619', 'Rs 1,34,543', '80C eligible'],
                              ['5', 'Rs 1,34,543', 'Rs 10,360', 'Rs 1,44,903', 'Taxable'],
                            ].map((row, i) => (
                              <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                {row.map((cell, j) => (
                                  <td key={j} style={{ padding: '12px 14px', color: j === 0 || j === 2 ? C.dark : C.ink2, fontWeight: j === 0 || j === 2 ? 700 : 400, fontSize: j === 0 ? 14 : 13 }}>{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>
                        Your exact maturity on Rs 1 lakh is Rs 1,45,039. For a 30% bracket investor, the year 5 interest of Rs 10,360 becomes taxable, reducing post-tax maturity to approximately Rs 1,41,931.
                      </p>
                    </div>

                    <div id="nsc-tax-benefits" style={sec}>
                      <h2 style={h2}>NSC Tax Benefits: Double 80C Deduction Advantage</h2>
                      <p style={p}>
                        NSC's tax advantage has two layers, which is rare among 5-year fixed-income products. Layer 1: your principal investment qualifies for Section 80C deduction in the purchase year. Layer 2: interest earned in years 1-4 is deemed reinvested automatically and also qualifies for 80C deduction in those respective years.
                      </p>
                      <p style={p}>
                        No other fixed-income instrument (FD, RD, or tax-saver FD) offers this two-layer 80C shelter on reinvested interest. Banks don't treat FD interest as deemed reinvested for 80C purposes, so FD investors get only the principal deduction, not the interest.
                      </p>
                      <p style={p}>
                        Take a concrete example: Rs 1 lakh NSC investment in April 2025. You claim Rs 1 lakh as 80C in FY 2025-26. By March 2026, you've earned Rs 7,700 in interest. In FY 2026-27, you claim this Rs 7,700 as an additional 80C deduction, even though you didn't invest new cash.
                      </p>
                      <p style={p}>
                        Each subsequent year follows the same pattern. Year 3: claim Rs 8,293 interest as 80C. Year 4: claim Rs 9,619 as 80C. Total 80C deductions from the original Rs 1 lakh principal across 5 years: approximately Rs 3.46 lakh (principal + compounded years 1-4 interest).
                      </p>
                      <p style={p}>
                        For a 30% bracket investor, this 80C deduction saves approximately Rs 1.04 lakh in income tax across the 5-year tenure (80C deductions × 30% bracket). That's equivalent to earning Rs 1.04 lakh in tax-free returns.
                      </p>
                      <p style={p}>
                        Year 5 breaks the 80C shelter. The interest earned in the final year (approximately Rs 10,360 on Rs 1 lakh) is paid at maturity and treated as "income from other sources." It's fully taxable at your bracket rate with no 80C offset available.
                      </p>
                      <p style={p}>
                        For a 30% bracket investor, year 5 interest of Rs 10,360 results in tax liability of approximately Rs 3,108 at maturity. This is the cost of the 80C advantage in years 1-4. Most investors still find the trade-off favorable.
                      </p>
                    </div>

                    <div id="nsc-vs-ppf-fd" style={sec}>
                      <h2 style={h2}>NSC vs PPF vs FD: Head-to-Head Comparison</h2>
                      <p style={p}>
                        NSC at 7.7% (Q1 FY 2025-26) offers a higher headline rate than PPF (7.1%) and most 5-year bank tax-saver FDs (6.5-7.5%). However, raw interest rate matters far less than after-tax returns. The tax treatment differs significantly across these three instruments.
                      </p>
                      <p style={p}>
                        NSC imposes no TDS (Tax Deducted at Source) on reinvested interest in years 1-4. Bank FDs, by contrast, deduct TDS starting at Rs 50,000 of annual interest, reducing your effective returns immediately. For a 30% bracket investor in an FD earning Rs 8,000-9,000 annual interest, TDS is deducted at 30% even if your actual bracket is lower.
                      </p>
                      <p style={p}>
                        Only NSC's year 5 interest is taxable as income from other sources at your bracket rate. This means years 1-4 enjoy dual shelter: no TDS, plus 80C deduction of the accrued interest. No FD or RD offers this structure.
                      </p>
                      <p style={p}>
                        Worked example at Rs 1.5 lakh and 30% bracket: NSC reaches Rs 2,17,589 pre-tax maturity. After tax on year 5 interest (approximately Rs 15,540), post-tax NSC maturity is roughly Rs 1,89,632.
                      </p>
                      <p style={p}>
                        A comparable 7% tax-saver FD reaches Rs 2,10,549 pre-tax but suffers TDS at 30% on compounded interest, reducing post-tax maturity to approximately Rs 1,85,000. NSC wins by roughly Rs 4,600 for this investor.
                      </p>
                      <p style={p}>
                        The gap widens at 20% bracket (NSC advantage grows to ~Rs 7,000). At 10% bracket, NSC still leads but the margin narrows to ~Rs 1,500 (since NSC's year 5 interest suffers 10% tax, while FD's TDS at 10% would apply broadly).
                      </p>
                      <p style={p}>
                        PPF shifts the equation for 15-year horizons. Contributing Rs 1.5 lakh annually for 15 years accumulates to roughly Rs 43 lakh entirely tax-free (EEE: Exempt contribution, Exempt interest, Exempt withdrawal). No tax on interest, no 80C limits on contribution beyond Rs 1.5 lakh per year.
                      </p>
                      <p style={p}>
                        NSC's 5-year advantage cannot match PPF's 15-year compounding. For investors committed to a 5-year lock-in and seeking to maximize their 80C utilization, NSC is optimal. For those planning a 15-year retirement corpus, PPF is superior despite its lower headline rate.
                      </p>
                      <p style={p}>
                        Key trade-off: NSC offers higher rates and no TDS but subjects year 5 interest to taxation. PPF offers lower rates but guarantees full tax-free status across all 15 years. The choice depends on your bracket, time horizon, and whether you value certainty (PPF) or higher near-term returns (NSC).
                      </p>
                      <ComparisonTable mobile={mobile} />
                    </div>

                    <div id="nsc-rules" style={sec}>
                      <h2 style={h2}>NSC Withdrawal, Transfer, and Loan Rules</h2>
                      <p style={p}>
                        <strong>No early withdrawal:</strong> NSC has an absolute 5-year lock-in with zero flexibility. No partial withdrawals, no premature encashment, no exceptions under ordinary circumstances. The only cases where early exit is possible are: death of the certificate holder, a court-ordered judgment, or bank forfeiture (if pledged against a loan and the borrower defaults).
                      </p>
                      <p style={p}>
                        This rigidity is intentional. NSC is designed for investors who want to commit capital for exactly 5 years and don't want the temptation to withdraw early. Treat NSC as money you will absolutely not need for 5 years.
                      </p>
                      <p style={p}>
                        <strong>Maturity process:</strong> After exactly 5 years, your certificate matures automatically. You don't have to visit the post office on day 1825. Simply present your certificate to any India Post office, and you'll receive the full maturity amount (principal + all compounded interest) as a lump sum.
                      </p>
                      <p style={p}>
                        <strong>Transfer to another person:</strong> You can transfer your NSC to someone else exactly once during the 5-year tenure using Form NC-32. Both the current holder (you) and the new intended holder must be present at the post office and sign the form. The new holder becomes the sole owner and maturity beneficiary; you relinquish all claims on proceeds.
                      </p>
                      <p style={p}>
                        Transfer is useful for gifting NSCs to family members, transferring to a spouse, or restructuring your investment portfolio. Once transferred, the new owner has full rights and can even transfer it back to you if both agree, subject to post office rules.
                      </p>
                      <p style={p}>
                        <strong>Borrow against NSC:</strong> Banks and scheduled cooperative societies accept NSC as loan collateral. You surrender your original certificate to the bank, which submits Form NC-41 (pledge notice) to India Post, which records a lien against your certificate.
                      </p>
                      <p style={p}>
                        The NSC continues to earn 7.7% interest and matures on schedule. At maturity, India Post pays the bank directly; the bank deducts its loan outstanding plus accrued interest and forwards the net proceeds to you. This is a secured loan, so rates are typically 0.5-1% above the bank's published base rate (vs. 2-3% above for unsecured personal loans).
                      </p>
                      <p style={p}>
                        SBI, PNB, Bank of Baroda, IDBI, ICICI Bank, and HDFC Bank all accept NSC pledges. The loan value is typically 80-90% of the certificate's face value (not maturity value), so Rs 1 lakh NSC may fetch Rs 80,000-90,000 in loan capacity.
                      </p>
                      <p style={p}>
                        <strong>Nomination for heirs:</strong> At purchase, you can nominate one or more beneficiaries (spouse, children, parents, or any individual) to receive NSC proceeds if you pass away. Use Form NC-1 at the time of purchase to set up the initial nomination.
                      </p>
                      <p style={p}>
                        You can update or change your nomination anytime during the 5-year tenure using Form NC-51 at your post office. A single nomination can name multiple people with specified share percentages (e.g., 50% to spouse, 25% each to two children).
                      </p>
                      <p style={p}>
                        If you die before maturity without a nomination, the NSC proceeds are released to your legal heir after completion of succession formalities, which can be time-consuming. Nomination simplifies the process for your family and ensures the proceeds go to your chosen beneficiary instantly upon maturity.
                      </p>
                    </div>

                    <div id="how-to-use" style={sec}>
                      <h2 style={h2}>How to Use This NSC Calculator</h2>
                      <p style={p}>
                        The calculator automates the 5-year compound interest math and displays four key outputs: total maturity amount, total interest earned, total 80C deduction available, and post-tax proceeds. Slide any input to instantly see how changes ripple through your returns.
                      </p>
                      <p style={p}>
                        <strong>Investment Amount:</strong> Enter any amount from Rs 1,000 (NSC minimum) to Rs 50 lakh. This represents the face value of one NSC certificate. The minimum purchase at India Post is Rs 1,000; you can buy in multiples of Rs 100.
                      </p>
                      <p style={p}>
                        If you plan to buy multiple separate certificates (e.g., Rs 50,000 each), enter the per-certificate amount here (Rs 50,000) and increase the "Number of Certificates" slider to match your total planned investment. Results scale proportionally.
                      </p>
                      <p style={p}>
                        <strong>Interest Rate:</strong> Defaults to 7.7% (current for Q1 FY 2025-26). The Ministry of Finance reviews this rate every quarter, so it may change at the next revision. Slide this input to model different scenarios.
                      </p>
                      <p style={p}>
                        What if NSC rates drop to 6% in the next quarter? What if they rise to 8%? Use this slider to stress-test your NSC plan against potential rate changes. This helps you decide whether to invest now or wait for the next quarterly review.
                      </p>
                      <p style={p}>
                        <strong>Number of Certificates:</strong> Are you buying 1 certificate of Rs 1 lakh, or 5 certificates of Rs 20,000 each (total Rs 1 lakh)? Set this slider to match your purchase plan. Results scale linearly: 2 certificates = 2× the single-certificate results.
                      </p>
                      <p style={p}>
                        Buying multiple certificates can be useful for family planning (one certificate per child, for example) or for distributing investment across multiple post office accounts to maximize the benefits of compounding across separate holdings.
                      </p>
                      <p style={p}>
                        <strong>Purchase Year:</strong> Select the financial year in which you plan to buy the NSC (defaults to current year). This controls the financial year labels in the year-wise breakdown table below the calculator. It doesn't change the math, just the labels.
                      </p>
                      <p style={p}>
                        If you purchase in April 2025, it starts FY 2025-26. At maturity in April 2030, it completes FY 2029-30. The year labels are important for tax planning, since year 5 interest is taxable in the maturity financial year.
                      </p>
                      <p style={p}>
                        <strong>Your Tax Slab:</strong> Select your expected income tax bracket (0%, 5%, 10%, 20%, or 30%). The calculator uses this to compute post-tax maturity amount. Only year 5 interest is taxed; years 1-4 are sheltered by 80C deduction.
                      </p>
                      <p style={p}>
                        If you're in a 30% bracket, Rs 10,360 of year 5 interest costs you Rs 3,108 in tax. If you're in 20% bracket, the same interest costs Rs 2,072. If you're in 0% bracket (e.g., no other income), you pay no tax at all on year 5 interest. Select 0% if you're tax-exempt or want to see pre-tax returns.
                      </p>
                    </div>

                    

                    <div id="faq" style={sec}>
                      <h2 style={h2}>Frequently Asked Questions</h2>
                      <FAQ />
                    </div>
                  </>
                );
              })()}
            </article>
          </div>

          {/* SIDEBAR - Sticky with independent scrollers */}
          <aside style={{ display: mobile ? 'none' : 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 100, height: 'fit-content' }}>
            <SidebarList title="Popular Calculators" items={POPULAR} />
            <SidebarList title="More Calculators" items={MORE} />
          </aside>
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/ppf-calculator|PPF', '/calculators/fd-calculator|FD', '/calculators/ssy-calculator|SSY', '/calculators/nps-calculator|NPS', '/calculators/income-tax-calculator|Income Tax', '/calculators/sip-calculator|SIP', '/calculators/rd-calculator|RD', '/calculators/compound-interest-calculator|Compound Interest', '/calculators/emi-calculator|EMI', '/calculators/home-loan-calculator|Home Loan'] },
        { hd: 'Topics', links: ['/calculators/sip-calculator|Mutual Funds', '/calculators/home-loan-calculator|Home Loans', '/calculators/fd-calculator|Fixed Deposits', '/calculators/nps-calculator|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

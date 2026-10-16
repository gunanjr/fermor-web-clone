'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useLayoutEffect } from 'react';
import Link from 'next/link';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
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

/* ─── Amortization Math ──────────────────────────────────────── */
type MorMode = 'capitalise' | 'interest';

interface MonthRow {
  n: number;            // month number from the first month of the loan
  emiNo: number;        // 0 during the moratorium, then 1, 2, 3...
  payment: number;      // everything paid this month
  principal: number;    // principal portion of the EMI
  interest: number;     // interest paid this month
  extra: number;        // extra monthly payment + one-time prepayment
  balance: number;      // balance after this month
}

interface YearRow {
  year: number;
  opening: number;
  principal: number;
  interest: number;
  paid: number;
  closing: number;
  repaidPct: number;
}

function calcEMI(p: number, annualRate: number, months: number): number {
  if (months <= 0 || p <= 0) return 0;
  if (annualRate === 0) return p / months;
  const r = annualRate / 12 / 100;
  const f = Math.pow(1 + r, months);
  return (p * r * f) / (f - 1);
}

function buildSchedule(p: number, annualRate: number, tenureMonths: number, opts: {
  extraMonthly?: number; lumpSum?: number; lumpMonth?: number; moratorium?: number; morMode?: MorMode;
}) {
  const { extraMonthly = 0, lumpSum = 0, lumpMonth = 1, moratorium = 0, morMode = 'capitalise' } = opts;
  const r = annualRate / 12 / 100;
  const rows: MonthRow[] = [];
  let capitalised = 0;

  // Moratorium: simple interest on the disbursed amount, either paid monthly or added to the loan when EMIs begin.
  for (let m = 1; m <= moratorium; m++) {
    const interest = p * r;
    if (morMode === 'interest') {
      rows.push({ n: m, emiNo: 0, payment: interest, principal: 0, interest, extra: 0, balance: p });
    } else {
      capitalised += interest;
      rows.push({ n: m, emiNo: 0, payment: 0, principal: 0, interest: 0, extra: 0, balance: p + capitalised });
    }
  }

  let bal = p + capitalised;
  const emi = calcEMI(bal, annualRate, tenureMonths);
  for (let k = 1; k <= tenureMonths && bal > 0.005; k++) {
    const interest = bal * r;
    const principal = Math.min(emi - interest, bal);
    bal -= principal;
    let extra = 0;
    if (bal > 0.005) {
      extra = Math.min(extraMonthly + (k === lumpMonth ? lumpSum : 0), bal);
      bal -= extra;
    }
    if (bal < 0.005) bal = 0;
    rows.push({ n: moratorium + k, emiNo: k, payment: principal + interest + extra, principal, interest, extra, balance: bal });
  }
  return { emi, capitalised, rows };
}

function toYearRows(rows: MonthRow[], p: number, capitalised: number): YearRow[] {
  const out: YearRow[] = [];
  const toRepay = p + capitalised;
  let opening = p;
  let cumPrincipal = 0;
  for (let i = 0; i < rows.length; i += 12) {
    const chunk = rows.slice(i, i + 12);
    const principal = chunk.reduce((s, r) => s + r.principal + r.extra, 0);
    const interest = chunk.reduce((s, r) => s + r.interest, 0);
    const closing = chunk[chunk.length - 1].balance;
    cumPrincipal += principal;
    out.push({ year: i / 12 + 1, opening, principal, interest, paid: principal + interest, closing, repaidPct: toRepay > 0 ? (cumPrincipal / toRepay) * 100 : 0 });
    opening = closing;
  }
  return out;
}

function totalsOf(rows: MonthRow[], p: number) {
  const totalPaid = rows.reduce((s, r) => s + r.payment, 0);
  return { totalPaid, totalInterest: Math.max(0, totalPaid - p), emiCount: rows.filter(r => r.emiNo > 0).length };
}

/* ─── Bar Chart ──────────────────────────────────────────────── */
function BarChart({ rows }: { rows: YearRow[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxAnnual = Math.max(...rows.map(r => r.principal + r.interest));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;
  return (
    <svg role="img" aria-label="Principal and interest paid in each loan year"
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {rows.map((row, i) => {
        const total = row.principal + row.interest;
        const totalH = maxAnnual > 0 ? (total / maxAnnual) * H : 0;
        const prinH = total > 0 ? (row.principal / total) * totalH : 0;
        const intH = totalH - prinH;
        const x = PADL + i * slot + gap;
        return (
          <g key={row.year}>
            <rect x={x} y={H - totalH} width={barW} height={intH} fill={CHART_PAIR.secondary} rx={2} />
            <rect x={x} y={H - prinH} width={barW} height={prinH} fill={CHART_PAIR.primary} rx={2} />
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

/* ─── Donut Chart ────────────────────────────────────────────── */
function DonutChart({ principal, interest }: { principal: number; interest: number }) {
  const total = principal + interest;
  if (total === 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const pArc = (principal / total) * circ;
  const pPct = Math.round((principal / total) * 100);
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Principal ${pPct}% of total amount payable, interest ${100 - pPct}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Principal</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
  );
}

/* ─── Slider ─────────────────────────────────────────────────── */
function Slider({ label, value, min, max, step, fmt, onChange, compact, id, extra }: {
  label: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void; compact?: boolean; id: string;
  extra?: React.ReactNode;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = max > min ? Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100)) : 0;
  const rangeId = `${id}-range`;
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 36 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 14 }}>
        <label htmlFor={editing ? id : rangeId} style={{ fontSize: compact ? 13.5 : 14, color: C.ink2, fontWeight: 400 }}>{label}</label>
        {editing ? (
          <input id={id} autoFocus value={raw} onChange={e => setRaw(e.target.value)}
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
      {extra}
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 18, height: 18, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 1px 6px rgba(16,18,20,0.18)', pointerEvents: 'none', zIndex: 1 }} />
        <input id={rangeId} type="range" min={min} max={max} step={step} value={value}
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

/* ─── Segmented toggle (colorless, per input-panel rules) ────── */
function Toggle<T extends string>({ options, value, onChange, label }: {
  options: { value: T; label: string }[]; value: T; onChange: (v: T) => void; label: string;
}) {
  return (
    <div role="group" aria-label={label} style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
      {options.map((o, i) => {
        const active = o.value === value;
        return (
          <button key={o.value} onClick={() => onChange(o.value)} aria-pressed={active}
            style={{ padding: '5px 12px', border: 'none', borderRight: i < options.length - 1 ? `1px solid ${C.border}` : 'none', background: active ? C.white : 'transparent', color: active ? C.ink : C.ink3, fontWeight: active ? 600 : 400, fontSize: 12.5, cursor: 'pointer', fontFamily: INTER, transition: 'all 0.15s', whiteSpace: 'nowrap' }}>
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Small whole-number field (commits valid values as you type) ── */
function NumberField({ id, label, value, min, max, prefix, onChange }: {
  id: string; label: string; value: number; min: number; max: number; prefix: string; onChange: (v: number) => void;
}) {
  const [raw, setRaw] = useState<string | null>(null);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <label htmlFor={id} style={{ fontSize: 12, color: C.ink3 }}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${C.border}`, borderRadius: 7, background: C.white, padding: '0 8px' }}>
        <span style={{ fontSize: 12.5, color: C.ink3 }} aria-hidden="true">{prefix}</span>
        <input id={id} type="number" inputMode="numeric" min={min} max={max} step={1}
          value={raw ?? String(value)}
          onChange={e => {
            setRaw(e.target.value);
            const n = parseInt(e.target.value, 10);
            if (!isNaN(n) && n >= min && n <= max) onChange(n);
          }}
          onBlur={() => setRaw(null)}
          style={{ width: 52, border: 'none', outline: 'none', background: 'transparent', fontSize: 13, fontWeight: 600, color: C.ink, textAlign: 'right', padding: '5px 0 5px 4px', fontFamily: INTER }} />
      </div>
    </div>
  );
}

/* ─── Sidebar: Quick Facts ───────────────────────────────────── */
function AmortizationQuickFacts() {
  const rows = [
    { label: 'Interest method',                 value: 'Reducing balance' },
    { label: 'Interest rests in this tool',     value: 'Monthly' },
    { label: 'Prepayment fee, floating loans*', value: 'Nil' },
    { label: 'Schedule in KFS (RBI)',           value: 'Since Oct 2024' },
    { label: 'Excel EMI function',              value: '=PMT()' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', fontFamily: INTER, background: C.white }}>
      <div style={{ background: '#f4f5f6', padding: '12px 18px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink }}>Amortization Quick Facts</span>
      </div>
      {rows.map((r, i) => (
        <div key={r.label} style={{ padding: '11px 18px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12.5, color: C.ink2 }}>{r.label}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.ink, whiteSpace: 'nowrap' }}>{r.value}</span>
        </div>
      ))}
      <p style={{ fontSize: 11, color: C.ink3, lineHeight: 1.55, margin: 0, padding: '0 18px 12px' }}>
        *Individuals, non-business loans, per RBI.
      </p>
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
  { href: '/calculators/loan-prepayment-calculator',    label: 'Loan Prepayment Calculator' },
  { href: '/calculators/emi-calculator',                label: 'EMI Calculator' },
  { href: '/calculators/outstanding-loan-calculator',   label: 'Outstanding Loan Calculator' },
  { href: '/calculators/home-loan-calculator',          label: 'Home Loan Calculator' },
  { href: '/calculators/personal-loan-calculator',      label: 'Personal Loan EMI Calculator' },
  { href: '/calculators/car-loan-calculator',           label: 'Car Loan Calculator' },
  { href: '/calculators/education-loan-emi-calculator', label: 'Education Loan EMI Calculator' },
];
const MORE = [
  { href: '/calculators/emi-reduction-calculator',         label: 'EMI Reduction Calculator' },
  { href: '/calculators/home-loan-prepayment-calculator',  label: 'Home Loan Prepayment Calculator' },
  { href: '/calculators/loan-balance-transfer-calculator', label: 'Loan Balance Transfer Calculator' },
  { href: '/calculators/floating-vs-fixed-rate-calculator', label: 'Floating vs Fixed Rate Calculator' },
  { href: '/calculators/debt-to-income-ratio-calculator',  label: 'Debt-to-Income Ratio Calculator' },
];

/* ─── Table of contents ──────────────────────────────────────── */
const TOC_ITEMS = [
  { id: 'what-is-loan-amortization',  label: 'What is loan amortization' },
  { id: 'when-to-use',                label: 'When to use this calculator' },
  { id: 'amortization-formula',       label: 'Amortization formula' },
  { id: 'worked-example',             label: 'Worked example' },
  { id: 'yearly-schedule',            label: '5-year schedule' },
  { id: 'first-emi-breakup',          label: 'First EMI breakup' },
  { id: 'read-amortization-schedule', label: 'Reading a schedule' },
  { id: 'amortization-by-loan-type',  label: 'By loan type' },
  { id: 'tenure-vs-interest',         label: 'Tenure vs interest' },
  { id: 'emi-per-lakh',               label: 'EMI per Rs 1 lakh' },
  { id: 'extra-payments',             label: 'Extra payments' },
  { id: 'reduce-emi-or-tenure',       label: 'Reduce EMI or tenure' },
  { id: 'moratorium-pre-emi',         label: 'Moratorium and pre-EMI' },
  { id: 'reducing-vs-flat',           label: 'Reducing vs flat rate' },
  { id: 'amortization-excel',         label: 'Schedule in Excel' },
  { id: 'home-loan-tax',              label: 'Home loan tax' },
  { id: 'rbi-rules',                  label: 'RBI rules' },
  { id: 'common-mistakes',            label: 'Common mistakes' },
  { id: 'limitations',                label: 'Limitations' },
  { id: 'how-to-use',                 label: 'How to use' },
  { id: 'faq',                        label: 'FAQs' },
];

function TableOfContents() {
  return (
    <nav aria-label="Table of contents" style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', margin: '0 0 40px', fontFamily: INTER, background: C.white }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: C.ink3 }}>On this page</span>
      </div>
      <div style={{ padding: '10px 8px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
        {TOC_ITEMS.map((item, i) => (
          <a key={item.id} href={`#${item.id}`} style={{ fontSize: 13, color: C.ink2, textDecoration: 'none', padding: '6px 10px', borderRadius: 6, display: 'flex', gap: 8 }}>
            <span style={{ color: C.ink3, fontWeight: 600, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

/* ─── CA CTA ─────────────────────────────────────────────────── */

/* ─── In-content promo bar ───────────────────────────────────── */
function PromoBar({ href, title, text }: { href: string; title: string; text: string }) {
  return (
    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>{title}</p>
        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>{text}</p>
      </div>
      <Link className="fx-btn" href={href} target="_blank" rel="noopener noreferrer"
        style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
    </div>
  );
}

/* ─── Article tables (one shared style system) ───────────────── */
const thS: React.CSSProperties = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', verticalAlign: 'middle', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' };
const tdL: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, textAlign: 'left', verticalAlign: 'middle' };
const tdR: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, textAlign: 'left', verticalAlign: 'middle' };
const right: React.CSSProperties = { textAlign: 'right', whiteSpace: 'nowrap' };

function DataTable({ caption, head, rows, numCols = [], minWidth }: {
  caption: string; head: string[]; rows: string[][]; numCols?: number[]; minWidth?: number;
}) {
  return (
    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginBottom: 16 } as React.CSSProperties}>
      <table style={{ width: '100%', minWidth, borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
        <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '6px 2px 0' }}>{caption}</caption>
        <thead>
          <tr>{head.map((h, i) => <th key={h} scope="col" style={numCols.includes(i) ? { ...thS, ...right } : thS}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
              {r.map((cell, j) => (
                <td key={j} style={j === 0 ? { ...tdL, fontWeight: 600, color: C.ink } : numCols.includes(j) ? { ...tdR, ...right } : tdR}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── FAQ ────────────────────────────────────────────────────── */
function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return <FAQBox items={items} />;
}

/* ─── Main ───────────────────────────────────────────────────── */
export default function LoanAmortizationCalculatorClient({ faqs }: { faqs: { q: string; a: string }[] }) {
  const defaultSettings = {
    loanAmount: 1000000,
    interestRate: 9,
    tenureYr: 5,
    tenureMode: 'yr',
    tenureMo: 60,
    extraMonthly: 0,
    lumpSum: 0,
    lumpMonth: 12,
    moratorium: 0,
    morMode: 'capitalise' as MorMode,
  };
  const { settings, updateSettings } = useCalculatorSettings('loan-amortization-calculator', defaultSettings);
  const { loanAmount, interestRate, tenureYr, tenureMode, tenureMo, extraMonthly, lumpSum, lumpMonth, moratorium, morMode } = settings;

  const setLoanAmount   = (v: number) => updateSettings({ loanAmount: v });
  const setInterestRate = (v: number) => updateSettings({ interestRate: v });
  const setTenureYr     = (v: number) => updateSettings({ tenureYr: v, tenureMo: v * 12 });
  const setTenureMo     = (v: number) => updateSettings({ tenureMo: v, tenureYr: Math.max(1, Math.round(v / 12)) });
  const setTenureMode   = (v: 'yr' | 'mo') => updateSettings({ tenureMode: v });
  const setExtraMonthly = (v: number) => updateSettings({ extraMonthly: v });
  const setLumpSum      = (v: number) => updateSettings({ lumpSum: v });
  const setLumpMonth    = (v: number) => updateSettings({ lumpMonth: v });
  const setMoratorium   = (v: number) => updateSettings({ moratorium: v });
  const setMorMode      = (v: MorMode) => updateSettings({ morMode: v });

  const [mobile, setMobile] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleView, setScheduleView] = useState<'yearly' | 'monthly'>('yearly');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const { formatCurrency, convertCurrency, selectedCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const months = tenureMode === 'yr' ? tenureYr * 12 : tenureMo;
  const lumpAt = Math.min(Math.max(1, lumpMonth), months);
  const lumpAmt = Math.min(lumpSum, loanAmount);
  const hasPrepay = extraMonthly > 0 || lumpAmt > 0;

  const schedule = useMemo(
    () => buildSchedule(loanAmount, interestRate, months, { extraMonthly, lumpSum: lumpAmt, lumpMonth: lumpAt, moratorium, morMode }),
    [loanAmount, interestRate, months, extraMonthly, lumpAmt, lumpAt, moratorium, morMode]
  );
  const baseSchedule = useMemo(
    () => hasPrepay ? buildSchedule(loanAmount, interestRate, months, { moratorium, morMode }) : null,
    [hasPrepay, loanAmount, interestRate, months, moratorium, morMode]
  );

  const { emi, capitalised, rows } = schedule;
  const { totalPaid, totalInterest, emiCount } = totalsOf(rows, loanAmount);
  const base = baseSchedule ? totalsOf(baseSchedule.rows, loanAmount) : null;
  const interestSaved = base ? Math.max(0, base.totalInterest - totalInterest) : 0;
  const emisSaved = base ? base.emiCount - emiCount : 0;

  const yearRows = useMemo(() => toYearRows(rows, loanAmount, capitalised), [rows, loanAmount, capitalised]);

  const firstEmi = rows.find(r => r.emiNo > 0);
  const firstInt = firstEmi ? firstEmi.interest : 0;
  const firstIntPct = emi > 0 ? (firstInt / emi) * 100 : 0;
  const moratoriumInterest = morMode === 'capitalise' ? capitalised : loanAmount * (interestRate / 1200) * moratorium;

  const halfEmi = useMemo(() => {
    const target = (loanAmount + capitalised) / 2;
    let cum = 0;
    for (const r of rows) {
      cum += r.principal + r.extra;
      if (r.emiNo > 0 && cum >= target) return r.emiNo;
    }
    return 0;
  }, [rows, loanAmount, capitalised]);

  const principalPct = totalPaid > 0 ? Math.round((loanAmount / totalPaid) * 100) : 0;
  const interestPct = 100 - principalPct;
  const hasExtraCol = rows.some(r => r.extra > 0);
  const currencyCode = selectedCurrency?.code || 'INR';

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const h3  = { fontSize: 15.5, fontWeight: 600, color: C.ink, margin: '0 0 8px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const li  = { fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 8 } as React.CSSProperties;
  const ulS = { margin: '0 0 16px', paddingLeft: 22, listStyleType: 'disc' } as React.CSSProperties;
  const olS = { margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 10 } as React.CSSProperties;
  const lnk = { color: C.dark, fontWeight: 600 } as React.CSSProperties;
  const codeBox = { background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16, overflowX: 'auto' } as React.CSSProperties;
  const code = { fontFamily: 'monospace', fontSize: 14, color: C.dark, lineHeight: 1.9, whiteSpace: 'pre' } as React.CSSProperties;
  const strong = { color: C.ink } as React.CSSProperties;

  const cellTd: React.CSSProperties = { ...tdR, padding: '10px 14px', fontSize: 13 };
  const cellNum: React.CSSProperties = { ...cellTd, ...right };
  const stickyTh = (numeric: boolean): React.CSSProperties => ({ ...thS, ...(numeric ? right : {}), position: 'sticky', top: 0, zIndex: 1 });

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Loan Amortization Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            See how every EMI splits into principal and interest, with a yearly and monthly amortization schedule, first EMI breakup, prepayment savings and moratorium interest.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            <section aria-label="Loan Amortization Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{showAdvanced ? 'More Settings' : 'Inputs'}</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider label="Loan Amount" id="la-amount" value={loanAmount} min={10000} max={50000000} step={10000} fmt={fmtC} onChange={setLoanAmount} compact={mobile} />
                      <Slider label="Interest Rate (p.a.)" id="la-rate" value={interestRate} min={1} max={30} step={0.05} fmt={v => `${v.toFixed(2)}%`} onChange={setInterestRate} compact={mobile} />
                      <Slider label="Loan Tenure" id="la-tenure" compact={mobile}
                        value={tenureMode === 'yr' ? tenureYr : tenureMo}
                        min={tenureMode === 'yr' ? 1 : 6} max={tenureMode === 'yr' ? 30 : 360} step={1}
                        fmt={v => tenureMode === 'yr' ? `${v} yr` : `${v} mo`}
                        onChange={tenureMode === 'yr' ? setTenureYr : setTenureMo}
                        extra={
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                            <div role="group" aria-label="Tenure presets" style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                              {tenureMode === 'yr' && [1, 3, 5, 10, 15, 20, 30].map(y => (
                                <button key={y} onClick={() => setTenureYr(y)} aria-pressed={tenureYr === y}
                                  style={{ padding: '3px 8px', fontSize: 12, background: C.white, color: tenureYr === y ? C.ink : C.ink3, border: `${tenureYr === y ? 1.5 : 1}px solid ${tenureYr === y ? C.ink : C.border}`, fontWeight: tenureYr === y ? 700 : 500, borderRadius: 6, cursor: 'pointer', fontFamily: INTER, transition: 'all 0.15s' }}>
                                  {y}Y
                                </button>
                              ))}
                            </div>
                            <Toggle label="Tenure unit" value={tenureMode === 'mo' ? 'mo' : 'yr'} onChange={setTenureMode}
                              options={[{ value: 'yr', label: 'Years' }, { value: 'mo', label: 'Months' }]} />
                          </div>
                        } />

                      <div style={{ padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 24 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: C.ink, fontWeight: 700, marginBottom: 4 }}>
                          <span>Monthly Interest Rate (R)</span>
                          <span>{(interestRate / 12).toFixed(3)}%</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.ink2, marginBottom: 2 }}>
                          <span>Number of EMIs (N)</span>
                          <span>{months}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.ink2 }}>
                          <span>Half the loan repaid by</span>
                          <span>{halfEmi > 0 ? `EMI ${halfEmi}` : 'N/A'}</span>
                        </div>
                      </div>

                      <button onClick={() => setShowAdvanced(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        More settings
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <Slider label="Extra Payment Every Month" id="la-extra" value={extraMonthly} min={0} max={100000} step={500} fmt={fmtC} onChange={setExtraMonthly} compact={mobile} />
                      <Slider label="One-Time Prepayment" id="la-lump" value={lumpAmt} min={0} max={loanAmount} step={loanAmount >= 100000 ? 10000 : 1000} fmt={fmtC} onChange={setLumpSum} compact={mobile}
                        extra={
                          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
                            <NumberField id="la-lump-month" label="Paid with" prefix="EMI" value={lumpAt} min={1} max={months} onChange={setLumpMonth} />
                          </div>
                        } />
                      <Slider label="Moratorium Period" id="la-moratorium" value={moratorium} min={0} max={60} step={1} fmt={v => `${v} mo`} onChange={setMoratorium} compact={mobile}
                        extra={
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                            <span style={{ fontSize: 12, color: C.ink3 }}>Interest during moratorium</span>
                            <Toggle label="Interest during moratorium" value={morMode} onChange={setMorMode}
                              options={[{ value: 'capitalise', label: 'Add to loan' }, { value: 'interest', label: 'Pay monthly' }]} />
                          </div>
                        } />
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: '0 0 24px' }}>
                        Extra payments cut principal and shorten the loan; the EMI stays the same. No EMI is due during a moratorium.
                      </p>
                      <button onClick={() => setShowAdvanced(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        Back
                      </button>
                    </>
                  )}
                </div>

                {/* Result panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>
                      Monthly EMI
                    </span>
                    <span aria-live="polite" aria-label={`Monthly EMI: ${fmtIN(emi)}`}
                      style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {fmtIN(emi)}
                    </span>
                  </div>

                  {[
                    { label: 'Principal Amount', value: fmtC(loanAmount) },
                    { label: 'Total Interest', value: fmtC(totalInterest) },
                    { label: 'Total Amount Payable', value: fmtC(totalPaid) },
                    { label: 'Interest in First EMI', value: `${fmtC(firstInt)} (${firstIntPct.toFixed(1)}%)` },
                    { label: 'Number of EMIs', value: emisSaved > 0 ? `${emiCount} (${emisSaved} fewer)` : `${emiCount}` },
                    { label: 'Interest Saved by Prepaying', value: fmtC(interestSaved) },
                    ...(moratorium > 0 ? [{ label: morMode === 'capitalise' ? 'Moratorium Interest Added' : 'Moratorium Interest Paid', value: fmtC(moratoriumInterest) }] : []),
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink, textAlign: 'right' }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    <DonutChart principal={loanAmount} interest={totalInterest} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Principal {principalPct}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Interest {interestPct}%</span>
                    </div>
                  </div>

                  <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Principal {principalPct}%</span>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Interest {interestPct}%</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`Principal is ${principalPct}% of the total amount payable`}>
                      <div style={{ height: '100%', width: `${principalPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Amortization schedule */}
              {yearRows.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowSchedule(v => !v)}
                    aria-expanded={showSchedule} aria-controls="amortization-schedule"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0, textAlign: 'left' }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Loan Amortization Schedule</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>Yearly and monthly breakdown</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {emiCount} EMIs · {interestRate.toFixed(2)}%
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showSchedule ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showSchedule && (
                    <div id="amortization-schedule" style={{ borderTop: `1px solid ${C.border}` }}>
                      <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 10 }}>
                          <div style={{ display: 'flex', gap: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} aria-hidden="true" />
                              <span style={{ fontSize: 11.5, color: C.ink2 }}>Principal</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} aria-hidden="true" />
                              <span style={{ fontSize: 11.5, color: C.ink2 }}>Interest</span>
                            </div>
                          </div>
                          <Toggle label="Schedule view" value={scheduleView} onChange={setScheduleView}
                            options={[{ value: 'yearly', label: 'Yearly' }, { value: 'monthly', label: 'Monthly' }]} />
                        </div>
                        <BarChart rows={yearRows} />
                        <p style={{ fontSize: 11.5, color: C.ink3, margin: '6px 0 14px' }}>Principal and interest paid in each loan year (Y1 = first 12 months of the loan).</p>
                      </div>
                      {mobile && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '0 0 6px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                            style={{ animation: 'swipeHint 1.6s ease-in-out infinite' }}>
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                          <p style={{ fontSize: 11.5, color: C.ink3, margin: 0, fontFamily: INTER }}>Swipe to see all columns</p>
                        </div>
                      )}
                      <style>{`@keyframes swipeHint { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }`}</style>

                      {scheduleView === 'yearly' ? (
                        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
                          <table style={{ minWidth: 680, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                            <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: mobile ? '8px 16px 14px' : '8px 44px 16px' }}>
                              Year-by-year loan amortization schedule. Principal includes any extra payments. All values in {currencyCode}.
                            </caption>
                            <thead>
                              <tr>
                                {['Year', 'Opening Balance', 'Principal', 'Interest', 'Total Paid', 'Closing Balance', 'Repaid'].map((h, i) => (
                                  <th key={h} scope="col" style={i === 0 ? thS : { ...thS, ...right }}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {yearRows.map((r, i) => (
                                <tr key={r.year} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                  <td style={{ ...cellTd, fontWeight: 600 }}>{r.year}</td>
                                  <td style={cellNum}>{fmtIN(r.opening)}</td>
                                  <td style={cellNum}>{fmtIN(r.principal)}</td>
                                  <td style={cellNum}>{fmtIN(r.interest)}</td>
                                  <td style={cellNum}>{fmtIN(r.paid)}</td>
                                  <td style={cellNum}>{fmtIN(r.closing)}</td>
                                  <td style={cellNum}>{r.repaidPct.toFixed(1)}%</td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot>
                              <tr style={{ background: '#f4f5f6' }}>
                                <th scope="row" style={{ ...cellTd, fontWeight: 700, background: '#f4f5f6' }}>Total</th>
                                <td style={cellNum}></td>
                                <td style={{ ...cellNum, fontWeight: 700 }}>{fmtIN(yearRows.reduce((s, r) => s + r.principal, 0))}</td>
                                <td style={{ ...cellNum, fontWeight: 700 }}>{fmtIN(yearRows.reduce((s, r) => s + r.interest, 0))}</td>
                                <td style={{ ...cellNum, fontWeight: 700 }}>{fmtIN(totalPaid)}</td>
                                <td style={cellNum}></td>
                                <td style={cellNum}></td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      ) : (
                        <div style={{ overflow: 'auto', maxHeight: 480, WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
                          <table style={{ minWidth: hasExtraCol ? 640 : 540, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                            <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: mobile ? '8px 16px 14px' : '8px 44px 16px' }}>
                              Month-by-month loan amortization schedule. All values in {currencyCode}.
                            </caption>
                            <thead>
                              <tr>
                                <th scope="col" style={stickyTh(false)}>Month</th>
                                <th scope="col" style={stickyTh(true)}>Payment</th>
                                <th scope="col" style={stickyTh(true)}>Principal</th>
                                <th scope="col" style={stickyTh(true)}>Interest</th>
                                {hasExtraCol && <th scope="col" style={stickyTh(true)}>Prepayment</th>}
                                <th scope="col" style={stickyTh(true)}>Balance</th>
                              </tr>
                            </thead>
                            <tbody>
                              {rows.map((r, i) => (
                                <tr key={r.n} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                  <td style={{ ...cellTd, fontWeight: 600, whiteSpace: 'nowrap' }}>
                                    {r.n}{r.emiNo === 0 ? ' (moratorium)' : ''}
                                  </td>
                                  <td style={cellNum}>{fmtIN(r.payment)}</td>
                                  <td style={cellNum}>{fmtIN(r.principal)}</td>
                                  <td style={cellNum}>{fmtIN(r.interest)}</td>
                                  {hasExtraCol && <td style={cellNum}>{fmtIN(r.extra)}</td>}
                                  <td style={cellNum}>{fmtIN(r.balance)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {capitalised > 0 && (
                        <p style={{ fontSize: 12, color: C.ink2, lineHeight: 1.65, margin: 0, padding: mobile ? '0 16px 16px' : '0 44px 20px' }}>
                          {fmtIN(capitalised)} of moratorium interest was added to the balance when EMIs began. It is repaid inside the principal column, so total interest in the results ({fmtIN(totalInterest)}) equals the interest column plus this amount.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Waitlist */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <TableOfContents />

              <div style={sec}>
                <h2 style={h2} id="what-is-loan-amortization">What Is Loan Amortization?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Loan amortization is the repayment of a loan through equal monthly instalments (EMIs). Each EMI pays that month&apos;s interest and uses the rest to reduce the principal, until the balance reaches zero on the last EMI.
                  </p>
                </div>
                <p style={p}>
                  The EMI stays the same from the first month to the last. What changes is the split inside it: interest is charged on the outstanding balance, so the interest share falls every month and the principal share rises.
                </p>
                <p style={p}>
                  An amortization schedule is the table that lists this split for every EMI. Each row shows the payment number, the interest portion, the principal portion and the balance left after that payment.
                </p>
                <p style={p}>
                  Every EMI-based loan in India follows this structure: home loans, car loans, personal loans, education loans, two-wheeler loans and loans against property. Only the amount, the rate and the tenure differ.
                </p>
                <h3 style={h3}>How loan amortization works, month by month</h3>
                <ol style={olS}>
                  <li style={li}><strong style={strong}>Interest for the month:</strong> outstanding balance multiplied by the monthly rate (annual rate divided by 12).</li>
                  <li style={li}><strong style={strong}>Principal repaid:</strong> the EMI minus that month&apos;s interest.</li>
                  <li style={li}><strong style={strong}>New balance:</strong> the old balance minus the principal repaid. Next month&apos;s interest is charged on this lower figure.</li>
                </ol>
                <p style={p}>
                  Because the balance only moves down, the interest in each EMI keeps shrinking. That is why the last few EMIs of any loan are almost entirely principal.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="when-to-use">When to Use a Loan Amortization Calculator</h2>
                <p style={p}>
                  Use a loan amortization calculator whenever a decision depends on how much interest you will pay in total, not just on the size of the EMI.
                </p>
                <ul style={ulS}>
                  <li style={li}><strong style={strong}>Before signing a loan:</strong> compare tenures and offers by total interest, and check the lender&apos;s schedule in the Key Facts Statement against your own.</li>
                  <li style={li}><strong style={strong}>Before a prepayment:</strong> see how much interest and how many EMIs a bonus or lump sum would actually cut.</li>
                  <li style={li}><strong style={strong}>At a floating-rate reset:</strong> rebuild the schedule at the new rate to see the higher EMI or the longer tenure.</li>
                  <li style={li}><strong style={strong}>For home loan tax planning:</strong> split each year&apos;s EMIs into interest and principal for Section 24(b) and Section 80C.</li>
                  <li style={li}><strong style={strong}>During a moratorium or pre-EMI phase:</strong> decide whether paying interest monthly is worth it before EMIs begin.</li>
                  <li style={li}><strong style={strong}>When refinancing:</strong> compare the interest left on your current loan with a new offer in the <Link href="/calculators/loan-balance-transfer-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Loan Balance Transfer Calculator</Link>.</li>
                </ul>
              </div>

              <div style={sec}>
                <h2 style={h2} id="amortization-formula">Loan Amortization Formula: How EMI Is Calculated</h2>
                <p style={p}>
                  The EMI on an amortizing loan is calculated with the reducing-balance formula EMI = P × R × (1 + R)^N ÷ [(1 + R)^N − 1].
                </p>
                <div style={codeBox}>
                  <code style={code}>
                    EMI = P × R × (1 + R)^N / [(1 + R)^N − 1]{'\n'}
                    Interest in month k  = Opening balance × R{'\n'}
                    Principal in month k = EMI − Interest in month k{'\n'}
                    Closing balance      = Opening balance − Principal
                  </code>
                </div>
                <DataTable
                  caption="EMI formula variables, with the values used in the worked example below."
                  head={['Symbol', 'Meaning', 'Example']}
                  rows={[
                    ['P', 'Loan amount (principal)', 'Rs 10,00,000'],
                    ['R', 'Monthly interest rate = annual rate ÷ 12 ÷ 100', '9 ÷ 12 ÷ 100 = 0.0075'],
                    ['N', 'Number of monthly EMIs', '5 years × 12 = 60'],
                  ]} />
                <p style={p}>
                  The formula assumes interest is charged monthly on the reducing balance, which is how Indian banks and NBFCs price EMI loans. If the rate is zero, the EMI is simply P ÷ N.
                </p>
                <h3 style={h3}>How to calculate loan payments by hand</h3>
                <ol style={olS}>
                  <li style={li}><strong style={strong}>Monthly rate:</strong> divide the annual rate by 12, then by 100. At 9%, R = 0.0075.</li>
                  <li style={li}><strong style={strong}>Number of EMIs:</strong> multiply the tenure in years by 12. Five years is 60 EMIs.</li>
                  <li style={li}><strong style={strong}>Growth factor:</strong> compute (1 + R)^N on a scientific calculator or with =POWER(1.0075, 60) in Excel.</li>
                  <li style={li}><strong style={strong}>EMI:</strong> multiply P × R × growth factor, then divide by (growth factor − 1).</li>
                </ol>
              </div>

              <div style={sec}>
                <h2 style={h2} id="worked-example">Worked Example: Rs 10 Lakh Loan at 9% for 5 Years</h2>
                <p style={p}>
                  A Rs 10 lakh loan at 9% a year for 5 years has an EMI of Rs 20,758 and a total interest cost of Rs 2,45,501.
                </p>
                <div style={codeBox}>
                  <code style={code}>
                    P = Rs 10,00,000{'\n'}
                    R = 9 ÷ 12 ÷ 100 = 0.0075{'\n'}
                    N = 5 × 12 = 60{'\n'}
                    (1.0075)^60 = 1.565681{'\n'}
                    EMI = 10,00,000 × 0.0075 × 1.565681 ÷ (1.565681 − 1){'\n'}
                    EMI = 11,742.61 ÷ 0.565681 = Rs 20,758.36
                  </code>
                </div>
                <p style={p}>
                  Over 60 EMIs you pay Rs 12,45,501 in total. Rs 10,00,000 of that is principal and Rs 2,45,501 is interest, about 24.6% of the amount borrowed.
                </p>
                <h3 style={h3}>The first three EMIs and the last one</h3>
                <DataTable
                  caption="EMI split for a Rs 10 lakh loan at 9% for 60 months. Rounded to the nearest rupee."
                  head={['EMI No.', 'EMI', 'Interest', 'Principal', 'Balance After']}
                  numCols={[1, 2, 3, 4]}
                  rows={[
                    ['1', 'Rs 20,758', 'Rs 7,500', 'Rs 13,258', 'Rs 9,86,742'],
                    ['2', 'Rs 20,758', 'Rs 7,401', 'Rs 13,358', 'Rs 9,73,384'],
                    ['3', 'Rs 20,758', 'Rs 7,300', 'Rs 13,458', 'Rs 9,59,926'],
                    ['60 (last)', 'Rs 20,758', 'Rs 155', 'Rs 20,604', 'Rs 0'],
                  ]} />
                <p style={p}>
                  Month 1 interest is 10,00,000 × 0.0075 = Rs 7,500. The remaining Rs 13,258 of the EMI cuts the balance to Rs 9,86,742, and month 2 interest is charged on that lower figure.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="yearly-schedule">5-Year Loan Amortization Schedule (Yearly)</h2>
                <p style={p}>
                  For the same Rs 10 lakh loan at 9%, the yearly schedule shows interest falling from Rs 83,270 in year 1 to Rs 11,730 in year 5, while the yearly outgo stays at Rs 2,49,100.
                </p>
                <DataTable
                  caption="Yearly amortization schedule, Rs 10 lakh at 9% for 5 years. Rounded to the nearest rupee, so a row can differ by Re 1."
                  head={['Year', 'Opening Balance', 'Principal', 'Interest', 'Total Paid', 'Closing Balance']}
                  numCols={[1, 2, 3, 4, 5]}
                  minWidth={620}
                  rows={[
                    ['Year 1', 'Rs 10,00,000', 'Rs 1,65,830', 'Rs 83,270', 'Rs 2,49,100', 'Rs 8,34,170'],
                    ['Year 2', 'Rs 8,34,170', 'Rs 1,81,386', 'Rs 67,714', 'Rs 2,49,100', 'Rs 6,52,784'],
                    ['Year 3', 'Rs 6,52,784', 'Rs 1,98,401', 'Rs 50,699', 'Rs 2,49,100', 'Rs 4,54,383'],
                    ['Year 4', 'Rs 4,54,383', 'Rs 2,17,013', 'Rs 32,088', 'Rs 2,49,100', 'Rs 2,37,370'],
                    ['Year 5', 'Rs 2,37,370', 'Rs 2,37,370', 'Rs 11,730', 'Rs 2,49,100', 'Rs 0'],
                    ['Total', '', 'Rs 10,00,000', 'Rs 2,45,501', 'Rs 12,45,501', ''],
                  ]} />
                <p style={p}>
                  Half the loan is repaid by EMI 34, a little past the midpoint of the tenure. On a short loan the tilt toward interest is mild. On a 20-year home loan it is far steeper, as the next section shows.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="first-emi-breakup">First EMI Breakup: Why Early EMIs Are Mostly Interest</h2>
                <p style={p}>
                  The first EMI of a loan carries the highest interest share, because interest is charged on the full amount borrowed.
                </p>
                <p style={p}>
                  How high that share goes depends on the rate and, far more, on the tenure. A long loan spreads the principal thinly across many EMIs, so interest dominates the early years.
                </p>
                <DataTable
                  caption="Rates are illustrative inputs, not lender quotes. Calculated with the reducing-balance EMI formula."
                  head={['Loan', 'Amount', 'Rate', 'Tenure', 'EMI', 'Interest in 1st EMI', 'Principal Overtakes Interest']}
                  numCols={[1, 2, 3, 4, 5, 6]}
                  minWidth={760}
                  rows={[
                    ['Home loan', 'Rs 50 lakh', '8.5%', '20 yr', 'Rs 43,391', 'Rs 35,417 (81.6%)', 'EMI 143'],
                    ['Home loan', 'Rs 30 lakh', '8.5%', '15 yr', 'Rs 29,542', 'Rs 21,250 (71.9%)', 'EMI 83'],
                    ['Loan against property', 'Rs 25 lakh', '10%', '15 yr', 'Rs 26,865', 'Rs 20,833 (77.5%)', 'EMI 98'],
                    ['Education loan', 'Rs 10 lakh', '10.5%', '10 yr', 'Rs 13,493', 'Rs 8,750 (64.8%)', 'EMI 42'],
                    ['Car loan', 'Rs 8 lakh', '9%', '5 yr', 'Rs 16,607', 'Rs 6,000 (36.1%)', 'From EMI 1'],
                    ['Personal loan', 'Rs 5 lakh', '12%', '3 yr', 'Rs 16,607', 'Rs 5,000 (30.1%)', 'From EMI 1'],
                    ['Two-wheeler loan', 'Rs 1 lakh', '12%', '2 yr', 'Rs 4,707', 'Rs 1,000 (21.2%)', 'From EMI 1'],
                  ]} />
                <p style={p}>
                  On the Rs 50 lakh home loan, you pay Rs 42,20,075 in interest before principal finally overtakes it at EMI 143, almost 12 years in.
                </p>
                <p style={p}>
                  This is the strongest argument for prepaying early. A rupee of principal cleared in year 2 stops attracting interest for the remaining 18 years of the loan.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="read-amortization-schedule">How to Read an Amortization Schedule</h2>
                <p style={p}>
                  An amortization schedule has five working columns: EMI number, opening balance, interest, principal and closing balance.
                </p>
                <ul style={ulS}>
                  <li style={li}><strong style={strong}>Opening balance:</strong> what you owe at the start of the month. Interest is charged on this figure.</li>
                  <li style={li}><strong style={strong}>Interest:</strong> opening balance multiplied by the monthly rate. This is the lender&apos;s income for the month.</li>
                  <li style={li}><strong style={strong}>Principal:</strong> the EMI minus the interest. Only this part reduces your debt.</li>
                  <li style={li}><strong style={strong}>Closing balance:</strong> opening balance minus principal. It becomes the next month&apos;s opening balance.</li>
                  <li style={li}><strong style={strong}>Cumulative figures:</strong> running totals of interest and principal, useful for tax and for judging a prepayment.</li>
                </ul>
                <p style={p}>
                  Two checks catch most errors. The principal column must add up to the loan amount, and interest plus principal must equal the EMI in every row, apart from rounding on the last EMI.
                </p>
                <p style={p}>
                  Lender schedules can differ from this calculator by a few rupees. Lenders often round the EMI up to the next rupee, and some compute interest on the actual days in each month.
                </p>
                <p style={p}>
                  The balance after any EMI is your outstanding principal on that date. For a running loan, the <Link href="/calculators/outstanding-loan-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Outstanding Loan Calculator</Link> gives the balance, interest paid so far and EMIs left.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="amortization-by-loan-type">Amortization Schedule by Loan Type: Home, Personal, Car and Education</h2>
                <p style={p}>
                  The same amortization math applies to every EMI loan, but the tenure and rate make each loan type behave very differently.
                </p>
                <h3 style={h3}>Home loan amortization</h3>
                <p style={p}>
                  Home loans run 15 to 30 years, so the schedule stays interest-heavy for a long time. On a Rs 50 lakh loan at 8.5% for 20 years, the first year&apos;s EMIs pay Rs 4,21,182 in interest and only Rs 99,511 in principal.
                </p>
                <p style={p}>
                  Half the principal is cleared only at EMI 166, nearly 14 years in. The <Link href="/calculators/home-loan-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Home Loan Calculator</Link> covers down payment and eligibility alongside the EMI.
                </p>
                <h3 style={h3}>Personal loan amortization</h3>
                <p style={p}>
                  Personal loans are shorter, usually 1 to 5 years, and priced higher. A Rs 5 lakh loan at 12% for 3 years costs Rs 97,858 in interest, and principal outweighs interest from the very first EMI.
                </p>
                <p style={p}>
                  Because the tenure is short, a personal loan repays evenly. The <Link href="/calculators/personal-loan-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Personal Loan EMI Calculator</Link> is built for comparing offers by amount and rate.
                </p>
                <h3 style={h3}>Car and auto loan amortization</h3>
                <p style={p}>
                  A Rs 8 lakh car loan at 9% for 5 years has an EMI of Rs 16,607 and total interest of Rs 1,96,401. Stretching it to 7 years cuts the EMI to Rs 12,871 but raises interest to Rs 2,81,186.
                </p>
                <p style={p}>
                  A car also loses value while you repay, so a longer car loan can leave the balance above the resale price for longer. The <Link href="/calculators/car-loan-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Car Loan Calculator</Link> adds on-road price and down payment.
                </p>
                <h3 style={h3}>Education loan amortization</h3>
                <p style={p}>
                  Education loans usually start with a moratorium covering the course, so interest builds up before the first EMI. The moratorium section below shows how much that adds and how to limit it.
                </p>
                <h3 style={h3}>Term loans for business</h3>
                <p style={p}>
                  A business term loan repaid in equal monthly instalments amortizes exactly like the loans above. Some term loans instead repay equal principal each month, so the total payment falls over time; this calculator models equal EMIs only.
                </p>
              </div>

              <PromoBar href="/calculators/outstanding-loan-calculator" title="Outstanding Loan Calculator"
                text="Already repaying a loan? Check the balance, interest paid so far and the EMIs left." />

              <div style={sec}>
                <h2 style={h2} id="tenure-vs-interest">Loan Tenure vs Total Interest</h2>
                <p style={p}>
                  A longer tenure lowers the EMI but raises total interest, often by more than borrowers expect.
                </p>
                <DataTable
                  caption="Rs 10 lakh at 9% a year, reducing balance."
                  head={['Tenure', 'EMI', 'Total Interest', 'Interest as % of Loan']}
                  numCols={[1, 2, 3]}
                  rows={[
                    ['1 year', 'Rs 87,451', 'Rs 49,418', '4.9%'],
                    ['3 years', 'Rs 31,800', 'Rs 1,44,790', '14.5%'],
                    ['5 years', 'Rs 20,758', 'Rs 2,45,501', '24.6%'],
                    ['7 years', 'Rs 16,089', 'Rs 3,51,483', '35.1%'],
                    ['10 years', 'Rs 12,668', 'Rs 5,20,109', '52.0%'],
                  ]} />
                <DataTable
                  caption="Rs 50 lakh home loan at 8.5% a year, reducing balance."
                  head={['Tenure', 'EMI', 'Total Interest', 'Interest as % of Loan']}
                  numCols={[1, 2, 3]}
                  rows={[
                    ['10 years', 'Rs 61,993', 'Rs 24,39,141', '48.8%'],
                    ['15 years', 'Rs 49,237', 'Rs 38,62,656', '77.3%'],
                    ['20 years', 'Rs 43,391', 'Rs 54,13,879', '108.3%'],
                    ['25 years', 'Rs 40,261', 'Rs 70,78,406', '141.6%'],
                    ['30 years', 'Rs 38,446', 'Rs 88,40,443', '176.8%'],
                  ]} />
                <p style={p}>
                  Going from 20 to 30 years on the home loan cuts the EMI by Rs 4,945 a month but adds Rs 34.27 lakh of interest.
                </p>
                <p style={p}>
                  A practical middle path is to take the longer tenure for EMI safety and prepay whenever you can. You keep the lower EMI as a cushion without paying the full cost of the longer term.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="emi-per-lakh">Monthly Loan Payment per Rs 1 Lakh</h2>
                <p style={p}>
                  To estimate the monthly payment on any loan, multiply the EMI per Rs 1 lakh below by the loan amount in lakh.
                </p>
                <DataTable
                  caption="EMI in rupees for every Rs 1 lakh borrowed, reducing balance."
                  head={['Rate', '1 yr', '3 yr', '5 yr', '10 yr', '15 yr', '20 yr']}
                  numCols={[1, 2, 3, 4, 5, 6]}
                  minWidth={560}
                  rows={[
                    ['8%', '8,699', '3,134', '2,028', '1,213', '956', '836'],
                    ['9%', '8,745', '3,180', '2,076', '1,267', '1,014', '900'],
                    ['10%', '8,792', '3,227', '2,125', '1,322', '1,075', '965'],
                    ['12%', '8,885', '3,321', '2,224', '1,435', '1,200', '1,101'],
                    ['14%', '8,979', '3,418', '2,327', '1,553', '1,332', '1,244'],
                    ['16%', '9,073', '3,516', '2,432', '1,675', '1,469', '1,391'],
                  ]} />
                <p style={p}>
                  For example, Rs 25 lakh at 9% for 20 years works out to about 25 × 900 = Rs 22,500 a month. The exact EMI is Rs 22,493; the calculator above gives the precise figure and the full schedule.
                </p>
                <p style={p}>
                  The <Link href="/calculators/emi-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>EMI Calculator</Link> is the quicker tool when you only need the monthly payment and not the schedule.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="extra-payments">Extra Payments and Early Loan Payoff</h2>
                <p style={p}>
                  Every rupee paid above the EMI goes straight to principal, so extra payments shorten the loan and cut total interest without changing the EMI.
                </p>
                <DataTable
                  caption="Rs 50 lakh at 8.5% for 20 years, EMI Rs 43,391, total interest without prepayment Rs 54,13,879."
                  head={['Prepayment Plan', 'EMIs to Close', 'Time Saved', 'Interest Saved']}
                  numCols={[1, 2, 3]}
                  minWidth={560}
                  rows={[
                    ['EMI only', '240', 'Nil', 'Nil'],
                    ['Rs 2,000 extra every month', '215', '25 months', 'Rs 6,69,292'],
                    ['Rs 3,616 extra every month (one extra EMI a year)', '199', '41 months', 'Rs 10,89,367'],
                    ['Rs 5,000 extra every month', '187', '53 months', 'Rs 13,89,250'],
                    ['Rs 10,000 extra every month', '155', '85 months', 'Rs 21,78,721'],
                    ['Rs 5 lakh once, with EMI 12', '192', '48 months', 'Rs 16,03,691'],
                    ['Rs 5 lakh once, with EMI 36', '199', '41 months', 'Rs 13,19,639'],
                    ['Rs 5 lakh once, with EMI 120', '216', '24 months', 'Rs 5,71,382'],
                  ]} />
                <p style={p}>
                  Timing matters as much as the amount. The same Rs 5 lakh saves Rs 16.04 lakh when paid with EMI 12, but only Rs 5.71 lakh when paid with EMI 120, because less interest is left to cut.
                </p>
                <p style={p}>
                  Set Extra Payment Every Month or One-Time Prepayment under More settings in the calculator above. The results show the interest saved and how many fewer EMIs you pay.
                </p>
              </div>

              <PromoBar href="/calculators/loan-prepayment-calculator" title="Loan Prepayment Calculator"
                text="Compare your original and prepaid schedules side by side, with monthly and lump-sum modes." />

              <div style={sec}>
                <h2 style={h2} id="reduce-emi-or-tenure">Prepayment: Reduce EMI or Reduce Tenure?</h2>
                <p style={p}>
                  Reducing tenure saves far more interest than reducing EMI after a prepayment, though a lower EMI frees up monthly cash flow.
                </p>
                <p style={p}>
                  Take the Rs 50 lakh, 20-year loan at 8.5%. After 36 EMIs the balance is Rs 46,74,300. A Rs 5 lakh prepayment brings it to Rs 41,74,300, and the lender asks how to apply it.
                </p>
                <DataTable
                  caption="Rs 5 lakh prepaid after EMI 36 on Rs 50 lakh at 8.5% for 20 years."
                  head={['Option', 'EMI After', 'Loan Ends', 'Total Interest', 'Interest Saved']}
                  numCols={[1, 2, 3, 4]}
                  minWidth={600}
                  rows={[
                    ['No prepayment', 'Rs 43,391', 'EMI 240', 'Rs 54,13,879', 'Nil'],
                    ['Keep EMI, reduce tenure', 'Rs 43,391', 'EMI 199', 'Rs 40,94,240', 'Rs 13,19,639'],
                    ['Keep tenure, reduce EMI', 'Rs 38,750', 'EMI 240', 'Rs 49,67,021', 'Rs 4,46,858'],
                  ]} />
                <p style={p}>
                  Reducing tenure saves about three times as much here. Reducing the EMI suits a borrower whose budget is under strain; the <Link href="/calculators/emi-reduction-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>EMI Reduction Calculator</Link> models that choice.
                </p>
                <h3 style={h3}>Prepayment charges in India</h3>
                <p style={p}>
                  RBI has barred banks from charging foreclosure charges or prepayment penalties on floating-rate term loans to individual borrowers since <a href="https://www.rbi.org.in/commonman/english/scripts/Notification.aspx?Id=1381" target="_blank" rel="noopener noreferrer" style={lnk}>May 2014</a>.
                </p>
                <p style={p}>
                  The <a href="https://www.rbi.org.in/scripts/NotificationUser.aspx?Id=12878&Mode=0" target="_blank" rel="noopener noreferrer" style={lnk}>RBI Pre-payment Charges on Loans Directions, 2025</a> cover loans sanctioned or renewed from 1 January 2026. Floating-rate loans to individuals for non-business purposes carry no prepayment charge, for part or full prepayment.
                </p>
                <p style={p}>
                  Fixed-rate loans can still carry a charge under the lender&apos;s policy. Check the Key Facts Statement before prepaying a fixed-rate personal or car loan.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="moratorium-pre-emi">Moratorium, Pre-EMI and Broken Period Interest</h2>
                <p style={p}>
                  A moratorium is a period at the start of a loan when no EMI is due, but interest still accrues on the amount disbursed.
                </p>
                <p style={p}>
                  Education loans usually carry one, covering the course and a short grace period. Home loans for under-construction property often have a pre-EMI phase, when the borrower pays interest only until possession.
                </p>
                <p style={p}>
                  The interest can be handled two ways. It can be added to the loan when EMIs begin (capitalised), or paid every month as interest-only pre-EMI.
                </p>
                <DataTable
                  caption="Rs 10 lakh at 10.5%, 10-year EMI tenure after a 24-month moratorium."
                  head={['Option', 'Paid During Moratorium', 'EMI Afterwards', 'Total Interest']}
                  numCols={[1, 2, 3]}
                  minWidth={560}
                  rows={[
                    ['No moratorium', 'Nil', 'Rs 13,493', 'Rs 6,19,220'],
                    ['Interest added to loan', 'Nil', 'Rs 16,327', 'Rs 9,59,256'],
                    ['Interest paid monthly', 'Rs 8,750 a month', 'Rs 13,493', 'Rs 8,29,220'],
                  ]} />
                <p style={p}>
                  Paying the interest monthly saves Rs 1,30,036 here. The Rs 2,10,000 of accrued interest never joins the balance, so it never attracts interest of its own.
                </p>
                <p style={p}>
                  This calculator applies simple interest on the disbursed amount during the moratorium. A lender that compounds monthly in this phase will show a slightly higher capitalised figure.
                </p>
                <p style={p}>
                  For course-linked loans, the <Link href="/calculators/education-loan-emi-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Education Loan EMI Calculator</Link> sets the moratorium around the study period.
                </p>
                <h3 style={h3}>Broken period interest</h3>
                <p style={p}>
                  Broken period interest (BPI) is the interest for the days between disbursement and the start of your first full EMI cycle. Lenders usually collect it upfront or add it to the first EMI.
                </p>
                <p style={p}>
                  It is commonly calculated as loan amount × annual rate × days ÷ 365. A Rs 30 lakh loan at 8.5% disbursed 24 days before the EMI cycle begins carries BPI of Rs 16,767.
                </p>
                <p style={p}>
                  RBI&apos;s <a href="https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12678&Mode=0" target="_blank" rel="noopener noreferrer" style={lnk}>April 2024 circular on charging of interest</a> requires lenders to charge interest from the actual disbursement date, and only for the days the loan is outstanding.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="reducing-vs-flat">Reducing Balance vs Flat Rate Amortization</h2>
                <p style={p}>
                  A reducing-balance rate charges interest only on what you still owe, while a flat rate charges it on the original amount for the full tenure. The same headline rate therefore costs far more on a flat basis.
                </p>
                <DataTable
                  caption="Rs 5 lakh repaid over 3 years."
                  head={['Method', 'Rate', 'EMI', 'Total Interest']}
                  numCols={[1, 2, 3]}
                  rows={[
                    ['Reducing balance', '10%', 'Rs 16,134', 'Rs 80,809'],
                    ['Flat rate', '10%', 'Rs 18,056', 'Rs 1,50,000'],
                  ]} />
                <p style={p}>
                  The flat 10% loan costs the same as a reducing-balance loan at about 17.92%. Convert any flat rate before comparing offers.
                </p>
                <DataTable
                  caption="Reducing-balance rate that gives the same EMI as each flat rate."
                  head={['Flat Rate', 'Equivalent Reducing Rate (3 yr)', 'Equivalent Reducing Rate (5 yr)']}
                  numCols={[1, 2]}
                  rows={[
                    ['7%', '12.83%', '12.50%'],
                    ['8%', '14.55%', '14.13%'],
                    ['9%', '16.24%', '15.71%'],
                    ['12%', '21.20%', '20.31%'],
                  ]} />
                <p style={p}>
                  RBI&apos;s Key Facts Statement rules require lenders to disclose the Annual Percentage Rate (APR), which includes fees. The <Link href="/calculators/apr-to-monthly-rate-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>APR to Monthly Rate Calculator</Link> converts an annual rate into the monthly rate that drives a schedule.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="amortization-excel">Loan Amortization Schedule in Excel</h2>
                <p style={p}>
                  Excel builds an amortization schedule with five functions: PMT for the EMI, IPMT and PPMT for each month&apos;s split, and CUMIPMT and CUMPRINC for totals over a range of EMIs.
                </p>
                <DataTable
                  caption="Excel results for Rs 10 lakh at 9% for 60 months. CUMIPMT and CUMPRINC return negative values because of Excel's cash-flow sign convention."
                  head={['Function', 'Returns', 'Example Formula', 'Result']}
                  numCols={[3]}
                  minWidth={680}
                  rows={[
                    ['PMT', 'EMI', '=PMT(9%/12, 60, -1000000)', '20,758.36'],
                    ['IPMT', 'Interest in EMI n', '=IPMT(9%/12, 1, 60, -1000000)', '7,500.00'],
                    ['PPMT', 'Principal in EMI n', '=PPMT(9%/12, 1, 60, -1000000)', '13,258.36'],
                    ['CUMIPMT', 'Interest over a range of EMIs', '=CUMIPMT(9%/12, 60, 1000000, 1, 12, 0)', '-83,270.24'],
                    ['CUMPRINC', 'Principal over a range of EMIs', '=CUMPRINC(9%/12, 60, 1000000, 1, 12, 0)', '-1,65,830.02'],
                  ]} />
                <h3 style={h3}>Build the schedule in five columns</h3>
                <ol style={olS}>
                  <li style={li}><strong style={strong}>Column A, EMI number:</strong> 1 to N, filled down.</li>
                  <li style={li}><strong style={strong}>Column B, opening balance:</strong> the loan amount in row 1, then the previous row&apos;s closing balance.</li>
                  <li style={li}><strong style={strong}>Column C, interest:</strong> =B2*rate/12.</li>
                  <li style={li}><strong style={strong}>Column D, principal:</strong> =EMI-C2, with the EMI from PMT in a fixed cell.</li>
                  <li style={li}><strong style={strong}>Column E, closing balance:</strong> =B2-D2. Fill down; the last row should reach zero.</li>
                </ol>
                <p style={p}>
                  For a moratorium, add rows before EMI 1 where the balance grows by the monthly interest, or stays flat if interest is paid. Then run PMT on the balance at the end of the moratorium.
                </p>
                <p style={p}>
                  The monthly view of the schedule above produces the same figures, so a sheet built this way should match it to the rupee, apart from rounding.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="home-loan-tax">Home Loan Amortization and Income Tax</h2>
                <p style={p}>
                  The amortization schedule tells you how much of each year&apos;s home loan EMIs is interest and how much is principal, the two figures you claim separately for tax.
                </p>
                <p style={p}>
                  Under the old tax regime, interest on a self-occupied home is deductible up to Rs 2 lakh a year under Section 24(b). Principal counts toward the Rs 1.5 lakh Section 80C limit. The new regime allows neither for a self-occupied home.
                </p>
                <DataTable
                  caption="Rs 50 lakh at 8.5% for 20 years, by loan year. The 80C limit is shared with EPF, PPF, ELSS and other eligible items."
                  head={['Loan Year', 'Interest Paid', 'Principal Paid', 'Max 24(b) Claim', 'Max 80C Claim']}
                  numCols={[1, 2, 3, 4]}
                  minWidth={600}
                  rows={[
                    ['Year 1', 'Rs 4,21,182', 'Rs 99,511', 'Rs 2,00,000', 'Rs 99,511'],
                    ['Year 5', 'Rs 3,81,053', 'Rs 1,39,641', 'Rs 2,00,000', 'Rs 1,39,641'],
                    ['Year 10', 'Rs 3,07,420', 'Rs 2,13,274', 'Rs 2,00,000', 'Rs 1,50,000'],
                    ['Year 15', 'Rs 1,94,961', 'Rs 3,25,733', 'Rs 1,94,961', 'Rs 1,50,000'],
                    ['Year 20', 'Rs 23,202', 'Rs 4,97,492', 'Rs 23,202', 'Rs 1,50,000'],
                  ]} />
                <p style={p}>
                  Interest stays above the Rs 2 lakh cap for the first 14 years of this loan. Prepaying in that window mostly cuts interest you could not have claimed anyway, which strengthens the case for early prepayment.
                </p>
                <p style={p}>
                  Tax is claimed by financial year (April to March), not loan year, so use the interest certificate your lender issues. From tax year 2026-27 the Income-tax Act, 2025 renumbers these provisions; Section 80C, for example, becomes Section 123 with the same Rs 1.5 lakh limit.
                </p>
                <p style={p}>
                  Details are on the <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" style={lnk}>Income Tax Department e-filing portal</a>. Run the <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Income Tax Calculator</Link> with your interest and principal figures to see the actual saving.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="rbi-rules">RBI Rules That Shape Your Repayment Schedule</h2>
                <p style={p}>
                  RBI requires lenders to show you the amortization schedule before you sign, and it regulates how that schedule can change afterwards.
                </p>
                <ul style={ulS}>
                  <li style={li}><strong style={strong}>Key Facts Statement:</strong> for retail and MSME term loans sanctioned on or after 1 October 2024, lenders must give a KFS with the APR and the amortisation schedule for the full tenure, under the <a href="https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12663&Mode=0" target="_blank" rel="noopener noreferrer" style={lnk}>RBI circular of 15 April 2024</a>.</li>
                  <li style={li}><strong style={strong}>Quarterly statements:</strong> for floating-rate EMI personal loans, lenders must share a statement each quarter with principal and interest recovered, the EMI, EMIs left and the annualised rate, under the <a href="https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12529&Mode=0" target="_blank" rel="noopener noreferrer" style={lnk}>RBI circular of 18 August 2023</a>.</li>
                  <li style={li}><strong style={strong}>Choice at a rate reset:</strong> the same circular lets borrowers choose a higher EMI, a longer tenure or both, and prepay in part or in full at any point. A longer tenure must not cause negative amortization.</li>
                  <li style={li}><strong style={strong}>Interest only from disbursement:</strong> interest can be charged only from the actual disbursement date and only for the days the loan is outstanding.</li>
                  <li style={li}><strong style={strong}>No prepayment charge on floating-rate personal-use loans:</strong> applies to individuals under the 2025 Directions for loans sanctioned or renewed from 1 January 2026.</li>
                </ul>
                <p style={p}>
                  A rate rise hits long loans hardest. On the Rs 50 lakh, 20-year loan at 8.5%, a 0.5% increase after 36 EMIs raises the EMI by Rs 1,426 if the tenure is kept, or adds about 17 EMIs if the EMI is kept.
                </p>
                <p style={p}>
                  The <Link href="/calculators/floating-vs-fixed-rate-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Floating vs Fixed Rate Calculator</Link> tests how rate changes would move your total cost.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="common-mistakes">Common Loan Amortization Mistakes to Avoid</h2>
                <p style={p}>
                  The costliest amortization mistake is judging a loan by its EMI instead of its total interest.
                </p>
                <ul style={ulS}>
                  <li style={li}><strong style={strong}>Comparing EMIs, not total cost:</strong> a lower EMI from a longer tenure can cost lakhs more. Compare the total interest in the schedule.</li>
                  <li style={li}><strong style={strong}>Treating a flat rate like a reducing rate:</strong> 10% flat on a 3-year loan costs about the same as 17.92% reducing.</li>
                  <li style={li}><strong style={strong}>Prepaying late:</strong> the same prepayment saves the most in the first few years, when the balance and the interest share are highest.</li>
                  <li style={li}><strong style={strong}>Not saying how a prepayment should be applied:</strong> ask the lender in writing to reduce the tenure if cutting total interest is the goal.</li>
                  <li style={li}><strong style={strong}>Ignoring moratorium interest:</strong> capitalised interest raises both the EMI and the total cost, while paying it monthly avoids interest on interest.</li>
                  <li style={li}><strong style={strong}>Relying on an old schedule after a reset:</strong> a floating-rate schedule changes with every reset, so check the new EMI or tenure on the lender&apos;s statement.</li>
                </ul>
              </div>

              <div style={sec}>
                <h2 style={h2} id="limitations">Limitations of This Calculator</h2>
                <p style={p}>
                  <strong style={strong}>The rate is fixed for the whole tenure.</strong> Floating rates reset with the lender&apos;s benchmark, so the schedule is exact only while the rate holds.
                </p>
                <p style={p}>
                  <strong style={strong}>Interest uses monthly rests at one-twelfth of the annual rate.</strong> Lenders that charge interest on actual days in each month can differ by a few rupees per EMI.
                </p>
                <p style={p}>
                  <strong style={strong}>Fees and charges are excluded.</strong> Processing fees, insurance added to the loan, GST on charges and broken period interest are not part of the schedule, which is why the APR in your KFS is higher.
                </p>
                <p style={p}>
                  <strong style={strong}>Only equal EMIs are modelled.</strong> Step-up, step-down, bullet and equal-principal repayment structures need a different schedule.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This Loan Amortization Calculator</h2>
                <ol style={olS}>
                  <li style={li}><strong style={strong}>Loan Amount:</strong> set the amount borrowed, from Rs 10,000 to Rs 5 crore. Click the value to type an exact figure.</li>
                  <li style={li}><strong style={strong}>Interest Rate:</strong> enter the annual rate from your sanction letter or offer, between 1% and 30%.</li>
                  <li style={li}><strong style={strong}>Loan Tenure:</strong> pick years or months, or tap a preset from 1Y to 30Y.</li>
                  <li style={li}><strong style={strong}>More settings:</strong> add an extra monthly payment, a one-time prepayment with the EMI it is paid with, or a moratorium with interest added to the loan or paid monthly.</li>
                  <li style={li}><strong style={strong}>Results:</strong> read the EMI, total interest, total payable, interest in the first EMI, number of EMIs and interest saved.</li>
                  <li style={li}><strong style={strong}>Schedule:</strong> open Loan Amortization Schedule for the bar chart, then switch between the yearly and monthly tables.</li>
                </ol>
              </div>


              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ items={faqs} />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only and based on the inputs provided. Actual EMIs and schedules can differ because of rounding, day-count conventions, broken period interest, fees, GST on charges and floating-rate resets. Interest rates in examples are illustrative, not lender quotes. Tax rules are summarised for general information. This calculator is for educational and planning purposes only and does not constitute financial, tax or legal advice. Consult your lender or a qualified CA before making borrowing or prepayment decisions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .loan-amort-sidebar::-webkit-scrollbar { width: 5px; }
            .loan-amort-sidebar::-webkit-scrollbar-track { background: transparent; }
            .loan-amort-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .loan-amort-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            aria-label="Related calculators"
            className="loan-amort-sidebar"
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
            <div style={{ flexShrink: 0 }}><AmortizationQuickFacts /></div>
            <div style={{ flexShrink: 0 }}><SidebarList title="Popular Calculators" items={POPULAR} /></div>
            <div style={{ flexShrink: 0 }}><SidebarList title="More Calculators" items={MORE} /></div>
          </aside>

        </div>
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

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

/* ─── Prepayment Math ────────────────────────────────────────── */
type PrepayMode = 'monthly' | 'lumpsum';
type Strategy = 'tenure' | 'emi';

interface MonthRow { n: number; interest: number; principal: number; extra: number; balance: number; emi: number; }
interface YearRow { year: number; opening: number; principal: number; interest: number; closing: number; }

function calcEMI(p: number, annualRate: number, months: number): number {
  if (months <= 0 || p <= 0) return 0;
  if (annualRate === 0) return p / months;
  const r = annualRate / 12 / 100;
  const f = Math.pow(1 + r, months);
  return (p * r * f) / (f - 1);
}

/** Runs `count` months of an existing loan at a given EMI. Used for the elapsed part of a running loan, where the EMI must stay the original one rather than be re-derived from the shorter window. */
function runMonths(balance: number, annualRate: number, emi: number, count: number): MonthRow[] {
  const r = annualRate / 12 / 100;
  const rows: MonthRow[] = [];
  let bal = balance;
  for (let k = 1; k <= count && bal > 0.005; k++) {
    const interest = bal * r;
    const principal = Math.min(emi - interest, bal);
    bal = Math.max(0, bal - principal);
    rows.push({ n: k, interest, principal, extra: 0, balance: bal, emi });
  }
  return rows;
}

/** Plain schedule, fixed EMI throughout, no prepayment. */
function plainSchedule(p: number, annualRate: number, months: number): MonthRow[] {
  const r = annualRate / 12 / 100;
  const emi = calcEMI(p, annualRate, months);
  const rows: MonthRow[] = [];
  let bal = p;
  for (let k = 1; k <= months && bal > 0.005; k++) {
    const interest = bal * r;
    const principal = Math.min(emi - interest, bal);
    bal = Math.max(0, bal - principal);
    rows.push({ n: k, interest, principal, extra: 0, balance: bal, emi });
  }
  return rows;
}

/** Reduce-tenure schedule: EMI fixed at the original amount, extra payments cut the balance faster. */
function reduceTenureSchedule(p: number, annualRate: number, months: number, extraMonthly: number, lumpSum: number, lumpMonth: number): MonthRow[] {
  const r = annualRate / 12 / 100;
  const emi = calcEMI(p, annualRate, months);
  const rows: MonthRow[] = [];
  let bal = p;
  for (let k = 1; k <= months && bal > 0.005; k++) {
    const interest = bal * r;
    const principal = Math.min(emi - interest, bal);
    bal -= principal;
    let extra = 0;
    if (bal > 0.005) {
      extra = Math.min(extraMonthly + (k === lumpMonth ? lumpSum : 0), bal);
      bal -= extra;
    }
    if (bal < 0.005) bal = 0;
    rows.push({ n: k, interest, principal, extra, balance: bal, emi });
  }
  return rows;
}

/** Reduce-EMI schedule: a single lump sum at lumpMonth, then the EMI is recalculated for the remaining months so the loan still ends on schedule. */
function reduceEMISchedule(p: number, annualRate: number, months: number, lumpSum: number, lumpMonth: number): { rows: MonthRow[]; newEmi: number } {
  const r = annualRate / 12 / 100;
  const emi1 = calcEMI(p, annualRate, months);
  const rows: MonthRow[] = [];
  let bal = p;
  const phase1End = Math.min(lumpMonth, months);
  for (let k = 1; k <= phase1End; k++) {
    const interest = bal * r;
    const principal = Math.min(emi1 - interest, bal);
    bal -= principal;
    rows.push({ n: k, interest, principal, extra: 0, balance: bal, emi: emi1 });
  }
  const lumpApplied = Math.min(lumpSum, bal);
  bal -= lumpApplied;
  if (rows.length > 0) { rows[rows.length - 1].extra = lumpApplied; rows[rows.length - 1].balance = bal; }
  const remaining = months - phase1End;
  const emi2 = remaining > 0 ? calcEMI(bal, annualRate, remaining) : 0;
  for (let k = phase1End + 1; k <= months && bal > 0.005; k++) {
    const interest = bal * r;
    const principal = Math.min(emi2 - interest, bal);
    bal = Math.max(0, bal - principal);
    rows.push({ n: k, interest, principal, extra: 0, balance: bal, emi: emi2 });
  }
  return { rows, newEmi: emi2 || emi1 };
}

function toYearRows(rows: MonthRow[], opening0: number): YearRow[] {
  const out: YearRow[] = [];
  let opening = opening0;
  for (let i = 0; i < rows.length; i += 12) {
    const chunk = rows.slice(i, i + 12);
    const principal = chunk.reduce((s, r) => s + r.principal + r.extra, 0);
    const interest = chunk.reduce((s, r) => s + r.interest, 0);
    const closing = chunk[chunk.length - 1].balance;
    out.push({ year: i / 12 + 1, opening, principal, interest, closing });
    opening = closing;
  }
  return out;
}

function totalInterestOf(rows: MonthRow[]): number {
  return rows.reduce((s, r) => s + r.interest, 0);
}

/* ─── Donut Chart ────────────────────────────────────────────── */
function DonutChart({ paid, saved }: { paid: number; saved: number }) {
  const total = paid + saved;
  if (total === 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const pArc = (paid / total) * circ;
  const pPct = Math.round((paid / total) * 100);
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Interest still paid ${pPct}%, interest saved ${100 - pPct}% of original interest`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Interest Paid</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
  );
}

/* ─── Bar Chart: original vs prepaid, one pair of bars per year ── */
function CompareBarChart({ original, prepaid }: { original: YearRow[]; prepaid: YearRow[] }) {
  const years = Math.max(original.length, prepaid.length);
  if (years === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxAnnual = Math.max(
    ...original.map(r => r.principal + r.interest),
    ...prepaid.map(r => r.principal + r.interest)
  );
  const slot = (W - PADL) / years;
  const pairW = Math.max(6, Math.min(34, slot * 0.72));
  const barW = pairW / 2 - 1;
  const gap = (slot - pairW) / 2;

  const bar = (row: YearRow | undefined, x: number) => {
    if (!row) return null;
    const total = row.principal + row.interest;
    const totalH = maxAnnual > 0 ? (total / maxAnnual) * H : 0;
    const prinH = total > 0 ? (row.principal / total) * totalH : 0;
    const intH = totalH - prinH;
    return (
      <g key={x}>
        <rect x={x} y={H - totalH} width={barW} height={intH} fill={CHART_PAIR.secondary} rx={2} />
        <rect x={x} y={H - prinH} width={barW} height={prinH} fill={CHART_PAIR.primary} rx={2} />
      </g>
    );
  };

  return (
    <svg role="img" aria-label="Original schedule (left bar) vs prepaid schedule (right bar) principal and interest by year"
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {Array.from({ length: years }, (_, i) => {
        const x = PADL + i * slot + gap;
        return (
          <g key={i}>
            {bar(original[i], x)}
            {bar(prepaid[i], x + barW + 2)}
            <text x={x + pairW / 2} y={H + 14} textAnchor="middle" style={{ fontSize: years > 20 ? 7 : 9, fill: C.ink3, fontFamily: INTER }}>Y{i + 1}</text>
          </g>
        );
      })}
      <line x1={PADL} y1={H} x2={W} y2={H} stroke={C.border} strokeWidth={1} />
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

/* ─── Segmented toggle ───────────────────────────────────────── */
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
function PrepaymentQuickFacts() {
  const rows = [
    { label: 'Floating loan penalty (individuals)', value: 'Nil' },
    { label: 'Bank rule effective since',           value: 'May 2014' },
    { label: 'NBFC rule effective since',            value: 'Aug 2019' },
    { label: 'RBI 2025 Directions apply from',        value: '1 Jan 2026' },
    { label: 'Typical fixed-rate charge',             value: '2-5%' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', fontFamily: INTER, background: C.white }}>
      <div style={{ background: '#f4f5f6', padding: '12px 18px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink }}>Prepayment Quick Facts</span>
      </div>
      {rows.map((r, i) => (
        <div key={r.label} style={{ padding: '11px 18px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12.5, color: C.ink2 }}>{r.label}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.ink, whiteSpace: 'nowrap' }}>{r.value}</span>
        </div>
      ))}
      <p style={{ fontSize: 11, color: C.ink3, lineHeight: 1.55, margin: 0, padding: '0 18px 12px' }}>
        Floating-rate, non-business loans to individuals, per RBI.
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
  { href: '/calculators/loan-amortization-calculator',      label: 'Loan Amortization Calculator' },
  { href: '/calculators/home-loan-prepayment-calculator',   label: 'Home Loan Prepayment Calculator' },
  { href: '/calculators/emi-reduction-calculator',          label: 'EMI Reduction Calculator' },
  { href: '/calculators/emi-calculator',                    label: 'EMI Calculator' },
  { href: '/calculators/outstanding-loan-calculator',       label: 'Outstanding Loan Calculator' },
  { href: '/calculators/balance-transfer-savings-calculator', label: 'Balance Transfer Savings Calculator' },
  { href: '/calculators/home-loan-eligibility-calculator',  label: 'Home Loan Eligibility Calculator' },
];
const MORE = [
  { href: '/calculators/loan-balance-transfer-calculator',  label: 'Loan Balance Transfer Calculator' },
  { href: '/calculators/debt-to-income-ratio-calculator',   label: 'Debt-to-Income Ratio Calculator' },
  { href: '/calculators/personal-loan-eligibility-calculator', label: 'Personal Loan Eligibility Calculator' },
  { href: '/calculators/sip-calculator',                    label: 'SIP Calculator' },
  { href: '/calculators/fd-calculator',                     label: 'FD Calculator' },
];

/* ─── Table of contents ──────────────────────────────────────── */
const TOC_ITEMS = [
  { id: 'what-is-prepayment',        label: 'What is loan prepayment' },
  { id: 'prepayment-vs-preclosure',  label: 'Prepayment vs preclosure' },
  { id: 'how-prepayment-saves-interest', label: 'How it saves interest' },
  { id: 'worked-example',            label: 'Worked example' },
  { id: 'prepayment-benefits',       label: 'Benefits by scenario' },
  { id: 'reduce-tenure-vs-emi',      label: 'Reduce tenure vs reduce EMI' },
  { id: 'best-time-to-prepay',       label: 'Best time to prepay' },
  { id: 'prepayment-charges',        label: 'Prepayment charges' },
  { id: 'personal-vs-home-loan',     label: 'Personal vs home loan' },
  { id: 'prepayment-vs-investment',  label: 'Prepayment vs investment' },
  { id: 'prepayment-by-loan-type',   label: 'By loan type' },
  { id: 'common-mistakes',           label: 'Common mistakes' },
  { id: 'limitations',               label: 'Limitations' },
  { id: 'how-to-use',                label: 'How to use' },
  { id: 'faq',                       label: 'FAQs' },
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
                <td key={j} style={j === 0 ? { ...tdR, fontWeight: 600, color: C.ink } : numCols.includes(j) ? { ...tdR, ...right } : tdR}>{cell}</td>
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
export default function LoanPrepaymentCalculatorClient({ faqs }: { faqs: { q: string; a: string }[] }) {
  const defaultSettings = {
    loanAmount: 3000000,
    interestRate: 8.5,
    tenureYr: 20,
    loanAgeYr: 0,
    chargePct: 0,
    prepayMode: 'monthly' as PrepayMode,
    extraMonthly: 5000,
    lumpSum: 500000,
    lumpEmiNumber: 25,
    strategy: 'tenure' as Strategy,
  };
  const { settings, updateSettings } = useCalculatorSettings('loan-prepayment-calculator', defaultSettings);
  const { loanAmount, interestRate, tenureYr, loanAgeYr, chargePct, prepayMode, extraMonthly, lumpSum, lumpEmiNumber, strategy } = settings;

  const setLoanAmount   = (v: number) => updateSettings({ loanAmount: v });
  const setInterestRate = (v: number) => updateSettings({ interestRate: v });
  const setTenureYr     = (v: number) => updateSettings({ tenureYr: v });
  const setLoanAgeYr    = (v: number) => updateSettings({ loanAgeYr: v });
  const setChargePct    = (v: number) => updateSettings({ chargePct: v });
  const setPrepayMode   = (v: PrepayMode) => updateSettings({ prepayMode: v });
  const setExtraMonthly = (v: number) => updateSettings({ extraMonthly: v });
  const setLumpSum      = (v: number) => updateSettings({ lumpSum: v });
  const setLumpEmiNumber = (v: number) => updateSettings({ lumpEmiNumber: v });
  const setStrategy     = (v: Strategy) => updateSettings({ strategy: v });

  const [mobile, setMobile] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const { formatCurrency, convertCurrency, selectedCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const months = tenureYr * 12;
  const emi = useMemo(() => calcEMI(loanAmount, interestRate, months), [loanAmount, interestRate, months]);
  const loanAgeMonths = Math.min(loanAgeYr * 12, months - 1);
  const remainingMonths = months - loanAgeMonths;

  const elapsedRows = useMemo(
    () => (loanAgeMonths > 0 ? runMonths(loanAmount, interestRate, emi, loanAgeMonths) : []),
    [loanAmount, interestRate, emi, loanAgeMonths]
  );
  const remainingBalance = elapsedRows.length > 0 ? elapsedRows[elapsedRows.length - 1].balance : loanAmount;
  const interestAlreadyPaid = totalInterestOf(elapsedRows);

  const originalRows = useMemo(() => plainSchedule(remainingBalance, interestRate, remainingMonths), [remainingBalance, interestRate, remainingMonths]);
  const originalInterest = totalInterestOf(originalRows);

  const lumpAt = Math.min(Math.max(1, lumpEmiNumber), remainingMonths);
  const lumpAmt = Math.min(lumpSum, remainingBalance);

  const hasPrepay = prepayMode === 'monthly' ? extraMonthly > 0 : lumpAmt > 0;

  const prepaidRows = useMemo(() => {
    if (!hasPrepay) return originalRows;
    if (prepayMode === 'monthly') return reduceTenureSchedule(remainingBalance, interestRate, remainingMonths, extraMonthly, 0, 0);
    if (strategy === 'tenure') return reduceTenureSchedule(remainingBalance, interestRate, remainingMonths, 0, lumpAmt, lumpAt);
    return reduceEMISchedule(remainingBalance, interestRate, remainingMonths, lumpAmt, lumpAt).rows;
  }, [hasPrepay, prepayMode, remainingBalance, interestRate, remainingMonths, extraMonthly, lumpAmt, lumpAt, strategy, originalRows]);

  const newEmiValue = prepayMode === 'lumpsum' && strategy === 'emi'
    ? reduceEMISchedule(remainingBalance, interestRate, remainingMonths, lumpAmt, lumpAt).newEmi
    : emi;

  const prepaidInterest = totalInterestOf(prepaidRows);
  const interestSaved = Math.max(0, originalInterest - prepaidInterest);
  const isReduceEmi = prepayMode === 'lumpsum' && strategy === 'emi';
  const monthsSaved = isReduceEmi ? 0 : Math.max(0, remainingMonths - prepaidRows.length);
  const emiDrop = isReduceEmi ? Math.max(0, emi - newEmiValue) : 0;
  const totalPrepaid = prepaidRows.reduce((s, r) => s + r.extra, 0);
  // RBI's 2025 Directions: where a charge is allowed, it is levied on the amount being prepaid.
  const prepayCharge = totalPrepaid * (chargePct / 100);
  const netSaving = interestSaved - prepayCharge;

  const originalYearRows = useMemo(() => toYearRows(originalRows, remainingBalance), [originalRows, remainingBalance]);
  const prepaidYearRows = useMemo(() => toYearRows(prepaidRows, remainingBalance), [prepaidRows, remainingBalance]);

  const principalPct = originalInterest + loanAmount > 0 ? Math.round((prepaidInterest / (originalInterest || 1)) * 100) : 0;
  const savedPct = 100 - principalPct;
  const currencyCode = selectedCurrency?.code || 'INR';

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const h3  = { fontSize: 15.5, fontWeight: 600, color: C.ink, margin: '0 0 8px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const li  = { fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 8 } as React.CSSProperties;
  const ulS = { margin: '0 0 16px', paddingLeft: 22, listStyleType: 'disc' } as React.CSSProperties;
  const olS = { margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 10 } as React.CSSProperties;
  const lnk = { color: C.dark, fontWeight: 600 } as React.CSSProperties;
  const strong = { color: C.ink } as React.CSSProperties;

  const cellTd: React.CSSProperties = { ...tdR, padding: '10px 14px', fontSize: 13 };
  const cellNum: React.CSSProperties = { ...cellTd, ...right };

  const fmtYM = (m: number) => `${Math.floor(m / 12)}y ${m % 12}m`;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Loan Prepayment Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            See how much interest a monthly extra payment or lump sum prepayment saves, and compare reducing your tenure against reducing your EMI.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            <section aria-label="Loan Prepayment Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              {/* Prepayment mode tabs */}
              <div role="tablist" aria-label="Prepayment mode" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                {([{ id: 'monthly', label: 'Monthly Extra' }, { id: 'lumpsum', label: 'Lump Sum' }] as const).map(t => (
                  <button key={t.id} id={`tab-${t.id}`} role="tab" aria-selected={prepayMode === t.id} aria-controls={`panel-${t.id}`}
                    onClick={() => setPrepayMode(t.id)}
                    style={{ flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer', fontSize: mobile ? 12.5 : 13.5, fontWeight: prepayMode === t.id ? 700 : 400, color: prepayMode === t.id ? C.dark : C.ink3, borderBottom: prepayMode === t.id ? `2.5px solid ${C.dark}` : '2.5px solid transparent', transition: 'all 0.15s', fontFamily: INTER }}>
                    {t.label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div id={`panel-${prepayMode}`} role="tabpanel" style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{showAdvanced ? 'More Settings' : 'Loan Details'}</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider label="Loan Amount" id="lp-amount" value={loanAmount} min={50000} max={50000000} step={50000} fmt={fmtC} onChange={setLoanAmount} compact={mobile} />
                      <Slider label="Interest Rate (p.a.)" id="lp-rate" value={interestRate} min={1} max={30} step={0.05} fmt={v => `${v.toFixed(2)}%`} onChange={setInterestRate} compact={mobile} />
                      <Slider label="Original Loan Tenure" id="lp-tenure" value={tenureYr} min={1} max={30} step={1} fmt={v => `${v} yr`} onChange={setTenureYr} compact={mobile} />

                      {prepayMode === 'monthly' ? (
                        <Slider label="Extra Payment Every Month" id="lp-extra" value={extraMonthly} min={0} max={100000} step={500} fmt={fmtC} onChange={setExtraMonthly} compact={mobile} />
                      ) : (
                        <>
                          <Slider label="Lump Sum Amount" id="lp-lump" value={lumpAmt} min={0} max={remainingBalance} step={remainingBalance >= 100000 ? 10000 : 1000} fmt={fmtC} onChange={setLumpSum} compact={mobile}
                            extra={
                              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
                                <NumberField id="lp-lump-month" label="Paid with EMI" prefix="#" value={lumpAt} min={1} max={remainingMonths} onChange={setLumpEmiNumber} />
                              </div>
                            } />
                          <div style={{ marginBottom: 24 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                              <label style={{ fontSize: mobile ? 13.5 : 14, color: C.ink2, fontWeight: 400 }}>After Prepayment</label>
                              <Toggle label="After prepayment" value={strategy} onChange={setStrategy}
                                options={[{ value: 'tenure', label: 'Reduce Tenure' }, { value: 'emi', label: 'Reduce EMI' }]} />
                            </div>
                            <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.6, margin: 0 }}>
                              {strategy === 'tenure' ? 'EMI stays the same; the loan closes sooner.' : 'Tenure stays the same; the EMI drops instead.'}
                            </p>
                          </div>
                        </>
                      )}

                      {prepayMode === 'monthly' && (
                        <div style={{ padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 24 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: C.ink, fontWeight: 700, marginBottom: 4 }}>
                            <span>New monthly outgo</span>
                            <span>{fmtC(emi + extraMonthly)}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.ink2 }}>
                            <span>{loanAgeYr > 0 ? 'Balance remaining today' : 'Loan amount'}</span>
                            <span>{fmtC(remainingBalance)}</span>
                          </div>
                        </div>
                      )}

                      <button onClick={() => setShowAdvanced(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        More settings
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <Slider label="Loan Age (Years Already Paid)" id="lp-age" value={loanAgeYr} min={0} max={Math.max(0, tenureYr - 1)} step={1} fmt={v => `${v} yr`} onChange={setLoanAgeYr} compact={mobile} />
                      <Slider label="Prepayment Charge (% of Amount Prepaid)" id="lp-charge" value={chargePct} min={0} max={6} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={setChargePct} compact={mobile} />
                      <div style={{ padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: C.ink, fontWeight: 700, marginBottom: 4 }}>
                          <span>Balance today</span>
                          <span>{fmtC(remainingBalance)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.ink2, marginBottom: 2 }}>
                          <span>Interest already paid</span>
                          <span>{fmtC(interestAlreadyPaid)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.ink2 }}>
                          <span>Tenure left without prepayment</span>
                          <span>{fmtYM(remainingMonths)}</span>
                        </div>
                      </div>
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: '0 0 24px' }}>
                        Floating-rate loans to individuals carry no prepayment charge. For a fixed-rate loan, enter the charge from your Key Facts Statement; GST may apply on top.
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
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 8 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                      <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Interest Saved</span>
                      <span style={{ fontSize: 12, color: '#7A8087' }}>{isReduceEmi ? 'EMI Reduced By' : 'Tenure Reduced By'}</span>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                      <span aria-live="polite" aria-label={`Interest saved: ${fmtIN(interestSaved)}`} style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                        {fmtIN(interestSaved)}
                      </span>
                      <span style={{ fontSize: 15, fontWeight: 700, color: '#101214' }}>
                        {isReduceEmi ? fmtC(emiDrop) : fmtYM(monthsSaved)}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 10, width: '100%', marginBottom: 8 }}>
                    <div style={{ flex: 1, background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 14px' }}>
                      <div style={{ fontSize: 11.5, color: C.ink3, marginBottom: 6 }}>Without prepayment</div>
                      <div style={{ fontSize: 12.5, color: C.ink2 }}>Interest: <strong style={{ color: C.ink }}>{fmtC(originalInterest)}</strong></div>
                      <div style={{ fontSize: 12.5, color: C.ink2 }}>Tenure: <strong style={{ color: C.ink }}>{fmtYM(remainingMonths)}</strong></div>
                    </div>
                    <div style={{ flex: 1, background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 14px' }}>
                      <div style={{ fontSize: 11.5, color: C.ink3, marginBottom: 6 }}>With prepayment</div>
                      <div style={{ fontSize: 12.5, color: C.ink2 }}>Interest: <strong style={{ color: C.dark }}>{fmtC(prepaidInterest)}</strong></div>
                      <div style={{ fontSize: 12.5, color: C.ink2 }}>{isReduceEmi ? 'EMI: ' : 'Tenure: '}<strong style={{ color: C.dark }}>{isReduceEmi ? fmtC(newEmiValue) : fmtYM(prepaidRows.length)}</strong></div>
                    </div>
                  </div>

                  {[
                    { label: 'Current EMI', value: fmtIN(emi) },
                    ...(isReduceEmi ? [{ label: 'New EMI', value: fmtIN(newEmiValue) }] : []),
                    { label: 'Total prepaid', value: fmtC(totalPrepaid) },
                    { label: 'Interest without prepayment', value: fmtC(originalInterest) },
                    { label: 'Interest with prepayment', value: fmtC(prepaidInterest) },
                    { label: isReduceEmi ? 'Tenure (unchanged)' : 'New tenure', value: fmtYM(prepaidRows.length) },
                    ...(chargePct > 0 ? [
                      { label: `Prepayment charge (${chargePct}%)`, value: `-${fmtC(prepayCharge)}` },
                      { label: 'Net saving after charge', value: netSaving < 0 ? `-${fmtC(Math.abs(netSaving))}` : fmtC(netSaving) },
                    ] : []),
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink, textAlign: 'right' }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    <DonutChart paid={prepaidInterest} saved={interestSaved} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Interest Paid {principalPct}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Interest Saved {savedPct}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Amortization comparison */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowCompare(v => !v)} aria-expanded={showCompare} aria-controls="prepay-compare"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0, textAlign: 'left' }}>
                    <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Amortization Comparison</span>
                    {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>Original vs prepaid, year by year</span>}
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    aria-hidden="true" style={{ transform: showCompare ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {showCompare && (
                  <div id="prepay-compare" style={{ borderTop: `1px solid ${C.border}` }}>
                    <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                      <div style={{ display: 'flex', gap: 16, marginBottom: 10, flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} aria-hidden="true" />
                          <span style={{ fontSize: 11.5, color: C.ink2 }}>Principal</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} aria-hidden="true" />
                          <span style={{ fontSize: 11.5, color: C.ink2 }}>Interest</span>
                        </div>
                        <span style={{ fontSize: 11.5, color: C.ink3, marginLeft: 'auto' }}>Left bar: original. Right bar: with prepayment.</span>
                      </div>
                      <CompareBarChart original={originalYearRows} prepaid={prepaidYearRows} />
                      <p style={{ fontSize: 11.5, color: C.ink3, margin: '6px 0 14px' }}>Each pair of bars is one loan year from today (Y1 = the next 12 EMIs).</p>
                    </div>
                    {mobile && (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '0 0 6px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                          style={{ animation: 'swipeHint 1.6s ease-in-out infinite' }}>
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                        <p style={{ fontSize: 11.5, color: C.ink3, margin: 0, fontFamily: INTER }}>Swipe to see full table</p>
                      </div>
                    )}
                    <style>{`@keyframes swipeHint { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }`}</style>
                    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
                      <table style={{ minWidth: 760, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: mobile ? '8px 16px 14px' : '8px 44px 16px' }}>
                          Year-by-year comparison from today. All values in {currencyCode}.
                        </caption>
                        <thead>
                          <tr>
                            <th rowSpan={2} scope="col" style={{ ...thS, verticalAlign: 'bottom' }}>Year</th>
                            <th colSpan={2} scope="colgroup" style={{ ...thS, textAlign: 'center' }}>Original</th>
                            <th colSpan={2} scope="colgroup" style={{ ...thS, textAlign: 'center' }}>With Prepayment</th>
                          </tr>
                          <tr>
                            <th scope="col" style={{ ...thS, ...right }}>Interest</th>
                            <th scope="col" style={{ ...thS, ...right }}>Closing Balance</th>
                            <th scope="col" style={{ ...thS, ...right }}>Interest</th>
                            <th scope="col" style={{ ...thS, ...right }}>Closing Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({ length: Math.max(originalYearRows.length, prepaidYearRows.length) }, (_, i) => {
                            const o = originalYearRows[i];
                            const pr = prepaidYearRows[i];
                            return (
                              <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ ...cellTd, fontWeight: 600 }}>{i + 1}</td>
                                <td style={cellNum}>{o ? fmtIN(o.interest) : '-'}</td>
                                <td style={cellNum}>{o ? fmtIN(o.closing) : '-'}</td>
                                <td style={cellNum}>{pr ? fmtIN(pr.interest) : '-'}</td>
                                <td style={cellNum}>{pr ? fmtIN(pr.closing) : '-'}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Waitlist */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <TableOfContents />

              <div style={sec}>
                <h2 style={h2} id="what-is-prepayment">What Is Loan Prepayment?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Loan prepayment is any payment made toward a loan above the scheduled EMI. It reduces the outstanding principal directly, which lowers the interest charged on every EMI after it and either shortens the loan or reduces the EMI itself.
                  </p>
                </div>
                <p style={p}>
                  A normal EMI splits into two parts: interest on the balance you still owe, and principal that reduces that balance. A prepayment skips straight to reducing the balance, without waiting for the EMI schedule to get there.
                </p>
                <p style={p}>
                  Since interest is recalculated every month on whatever balance remains, a lower balance means less interest for every single EMI that follows, not just the next one. That effect compounds for the rest of the loan.
                </p>
                <p style={p}>
                  Prepayment applies to any EMI-based loan in India: home loans, personal loans, car loans, education loans and business term loans. The calculator above works the same way for all of them; only the amount, rate and tenure change.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="prepayment-vs-preclosure">Prepayment vs Preclosure vs Foreclosure</h2>
                <p style={p}>
                  Prepayment and part payment mean the same thing: paying extra toward principal while the loan keeps running. Preclosure and foreclosure also mean the same thing as each other: paying the entire remaining balance at once and closing the loan.
                </p>
                <DataTable
                  caption="Terminology used interchangeably by Indian lenders for the same underlying actions."
                  head={['Term', 'What It Means', 'Loan Continues?']}
                  rows={[
                    ['Prepayment / Part payment', 'Extra amount paid toward principal, on top of the regular EMI', 'Yes, at a lower balance'],
                    ['Preclosure / Foreclosure', 'The full outstanding balance is paid off in one payment', 'No, the loan ends'],
                    ['Balance transfer', 'The full outstanding balance is paid off by a new lender at a lower rate', 'No, replaced by a new loan'],
                  ]} />
                <p style={p}>
                  This calculator models prepayment and part payment: an extra monthly amount or a lump sum that reduces the balance without ending the loan. For a full payoff calculation, set the prepayment amount equal to the remaining balance shown in the calculator.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-prepayment-saves-interest">How Prepayment Saves Interest</h2>
                <p style={p}>Every prepayment removes a rupee from the balance that interest is calculated on, for every month that rupee would otherwise have stayed in the loan.</p>
                <ol style={olS}>
                  <li style={li}><strong style={strong}>Interest this month:</strong> outstanding balance multiplied by the monthly rate (annual rate divided by 12).</li>
                  <li style={li}><strong style={strong}>Principal from the EMI:</strong> the EMI minus that month&apos;s interest, same as any amortizing loan.</li>
                  <li style={li}><strong style={strong}>Prepayment:</strong> applied on top, cutting the balance further before next month&apos;s interest is calculated.</li>
                </ol>
                <p style={p}>
                  Because this repeats every month for the rest of the loan, a prepayment made early saves more than the same amount paid later. It has more months left in which it would otherwise have kept generating interest.
                </p>
                <p style={p}>
                  The full mechanics of how an EMI splits into principal and interest are covered in detail in the <Link href="/calculators/loan-amortization-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Loan Amortization Calculator</Link>, including the exact formula and a month-by-month schedule.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="worked-example">Worked Example: Rs 30 Lakh Loan at 8.5% for 20 Years</h2>
                <p style={p}>
                  A Rs 30 lakh loan at 8.5% for 20 years has an EMI of Rs 26,035 and would cost Rs 32,48,327 in interest if paid exactly on schedule.
                </p>
                <p style={p}>
                  Adding Rs 5,000 extra every month from the start saves Rs 11,73,056 in interest and closes the loan in 13 years 8 months instead of 20, a reduction of 6 years 4 months.
                </p>
                <p style={p}>
                  Doubling that to Rs 10,000 extra a month saves Rs 17,00,094 and finishes the loan in 10 years 7 months. The saving does not double with the payment.
                </p>
                <p style={p}>
                  A large part of the extra Rs 5,000 in the second scenario only removes interest from years that the first scenario had already avoided.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="prepayment-benefits">Benefits of Loan Prepayment by Scenario</h2>
                <p style={p}>The table below shows five prepayment strategies on the same Rs 30 lakh, 8.5%, 20-year loan, each independently recomputed from the loan&apos;s own amortization schedule.</p>
                <DataTable
                  caption="Rs 30 lakh loan at 8.5% for 20 years. EMI 25 falls at the start of loan year 3; EMI 109 at the start of year 10."
                  head={['Prepayment Scenario', 'Interest Saved', 'Tenure Cut', 'New Tenure']}
                  numCols={[1, 2, 3]}
                  minWidth={680}
                  rows={[
                    ['Rs 5,000/mo extra, from month 1', 'Rs 11,73,056', '6y 4m', '13y 8m'],
                    ['Rs 10,000/mo extra, from month 1', 'Rs 17,00,094', '9y 5m', '10y 7m'],
                    ['Rs 2 lakh lump sum, with EMI 25', 'Rs 6,17,685', '2y 7m', '17y 5m'],
                    ['Rs 5 lakh lump sum, with EMI 25', 'Rs 12,80,463', '5y 8m', '14y 4m'],
                    ['Rs 5 lakh lump sum, with EMI 109', 'Rs 5,87,588', '3y 5m', '16y 7m'],
                  ]} />
                <p style={p}>
                  The same Rs 5 lakh lump sum saves more than double when paid with EMI 25 versus EMI 109. Earlier and larger prepayments always win; the calculator above lets you test your own amount and timing.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="reduce-tenure-vs-emi">Reduce Tenure vs Reduce EMI</h2>
                <p style={p}>
                  After a lump sum prepayment, a lender applies it one of two ways: keep the EMI the same and shorten the loan, or keep the original end date and lower the EMI.
                </p>
                <DataTable
                  caption="Rs 5 lakh prepaid with EMI 25 on a Rs 30 lakh loan at 8.5% for 20 years."
                  head={['Option', 'EMI After', 'Loan Ends', 'Interest Saved']}
                  numCols={[1, 2, 3]}
                  rows={[
                    ['No prepayment', 'Rs 26,035', 'EMI 240', 'Nil'],
                    ['Reduce tenure', 'Rs 26,035 (unchanged)', 'EMI 172', 'Rs 12,80,463'],
                    ['Reduce EMI', 'Rs 21,498 (down Rs 4,536)', 'EMI 240 (unchanged)', 'Rs 4,75,289'],
                  ]} />
                <p style={p}>
                  Reduce tenure saves close to three times as much interest here, because it keeps applying the higher EMI to a shrinking balance.
                </p>
                <p style={p}>
                  Reduce EMI is the better choice only when a lower monthly payment matters more than the total interest saved, for example if the household budget is genuinely tight.
                </p>
                <p style={p}>
                  Set the toggle in the Lump Sum tab of the calculator above to compare both outcomes on your own numbers. For a home loan specifically, with support for bank-published rates, use the <Link href="/calculators/home-loan-prepayment-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Home Loan Prepayment Calculator</Link>.
                </p>
              </div>

              <PromoBar href="/calculators/home-loan-prepayment-calculator" title="Home Loan Prepayment Calculator"
                text="Bank-specific reduce-tenure vs reduce-EMI comparison for SBI, HDFC and ICICI home loans." />

              <div style={sec}>
                <h2 style={h2} id="best-time-to-prepay">Best Time to Prepay a Loan</h2>
                <p style={p}>
                  The earlier a loan is prepaid, the more interest it saves, because interest makes up the largest share of an EMI in the first few years.
                </p>
                <DataTable
                  caption="Interest as a share of each EMI, by loan year. Rs 30 lakh loan at 8.5% for 20 years."
                  head={['Loan Year', 'Interest Share of EMI']}
                  numCols={[1]}
                  rows={[
                    ['Year 1', '80.9%'],
                    ['Year 2', '79.2%'],
                    ['Year 3', '77.4%'],
                    ['Year 4', '75.4%'],
                    ['Year 5', '73.2%'],
                  ]} />
                <p style={p}>
                  Across those first five years, roughly 77% of every EMI paid is interest. A prepayment in year 3 of this loan saves Rs 12,80,463 for Rs 5 lakh, more than double the Rs 5,87,588 the identical prepayment saves if made in year 10 instead.
                </p>
                <p style={p}>
                  This is also why paying down a personal or car loan, which usually runs 3 to 7 years, has a shorter early-advantage window than a 20-year home loan; there are simply fewer years left in which an early prepayment can still avoid interest.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="prepayment-charges">Prepayment and Foreclosure Charges in India</h2>
                <p style={p}>
                  RBI has removed prepayment penalties on most retail loans over the last decade, but the rule applies by rate type, not by loan type.
                </p>
                <ul style={ulS}>
                  <li style={li}><strong style={strong}>Banks, since May 2014:</strong> no foreclosure charge or prepayment penalty on floating-rate term loans to individual borrowers.</li>
                  <li style={li}><strong style={strong}>NBFCs, since August 2019:</strong> RBI clarified the same rule applies to NBFC floating-rate loans to individuals, for non-business purposes.</li>
                  <li style={li}><strong style={strong}>RBI (Pre-payment Charges on Loans) Directions, 2025:</strong> for loans sanctioned or renewed on or after 1 January 2026, no prepayment charge on floating-rate loans to individuals and to Micro and Small Enterprises, for part or full prepayment, from any source of funds.</li>
                </ul>
                <p style={p}>
                  Fixed-rate loans fall outside this protection. A personal loan, which is usually fixed-rate in India, commonly carries a foreclosure charge of around 2% to 5% of the outstanding principal plus GST.
                </p>
                <p style={p}>
                  As one published example, SBI has charged 3% of the outstanding principal for personal loan foreclosure within the first 2 years.
                </p>
                <p style={p}>
                  HDFC Bank&apos;s published car loan foreclosure charge steps down with time: around 6% of the outstanding principal within the first year, 5% between 13 and 24 months, and 3% after 24 months.
                </p>
                <p style={p}>
                  Always confirm the current charge in your own loan&apos;s Key Facts Statement, since these change and vary by lender.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="personal-vs-home-loan">Personal Loan vs Home Loan: Which to Prepay First</h2>
                <p style={p}>
                  The usual advice is to prepay the highest-rate loan first, since that rupee earns the highest guaranteed return. That holds when the two loans have a similar remaining tenure.
                </p>
                <p style={p}>
                  It gets more nuanced when tenures are very different. A Rs 1 lakh prepayment on a 5 lakh, 14%, 4-year personal loan saves Rs 61,836 in interest.
                </p>
                <p style={p}>
                  The identical Rs 1 lakh on a 30 lakh, 8.5%, 20-year home loan saves Rs 4,05,854, over six times more, purely because the home loan has 16 more years left for that rupee to keep avoiding interest.
                </p>
                <DataTable
                  caption="Rs 1 lakh prepaid on day one of each loan."
                  head={['Loan', 'Rate', 'Remaining Tenure', 'Interest Saved']}
                  numCols={[3]}
                  rows={[
                    ['Personal loan, Rs 5 lakh', '14%', '4 years', 'Rs 61,836'],
                    ['Home loan, Rs 30 lakh', '8.5%', '20 years', 'Rs 4,05,854'],
                  ]} />
                <p style={p}>
                  So the higher rate does not automatically mean the bigger rupee saving; the remaining tenure matters just as much.
                </p>
                <p style={p}>
                  What the higher rate does guarantee is a better return per year the money stays committed, so a personal loan is still usually the right priority when both loans have years left to run.
                </p>
                <p style={p}>
                  Run both loans through the calculator above with the same prepayment amount to see which produces the bigger saving for your specific numbers, rather than assuming the answer from the rate alone.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="prepayment-vs-investment">Prepayment vs Investment</h2>
                <p style={p}>
                  Prepaying is a guaranteed, risk-free return equal to the loan&apos;s interest rate. Investing the same amount can earn more, but only with market risk attached, and the fair comparison is the investment&apos;s gain, not its full value.
                </p>
                <DataTable
                  caption="Same Rs 5,000 a month, 15 years, comparing the gain from investing against the interest saved from prepaying a 30 lakh, 8.5%, 20-year loan."
                  head={['Strategy', 'Gain Over 15 Years', 'Risk']}
                  numCols={[1]}
                  rows={[
                    ['Prepay the home loan', 'Rs 11,73,056 interest saved', 'None, guaranteed'],
                    ['SIP in equity at a 12% CAGR', 'Rs 16,22,880 gain (before tax)', 'Market risk'],
                    ['SIP in debt at a 7.5% return', 'Rs 7,65,909 gain (before tax)', 'Low'],
                    ['Split: half prepay, half equity SIP', 'Rs 15,40,092 combined gain', 'Partial market risk'],
                  ]} />
                <p style={p}>
                  At a 12% assumed equity return, investing beats prepaying by roughly Rs 4.5 lakh over 15 years, before tax on the gains and before accounting for market risk. At a 7.5% debt return, prepaying wins outright, since 8.5% guaranteed beats 7.5% guaranteed every time.
                </p>
                <p style={p}>
                  For borrowers who have exhausted their Section 80C and 24(b) limits, prepaying also reduces future deductions, which trims its effective benefit slightly under the old tax regime. Use the <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>SIP Calculator</Link> to model the investment side with your own expected return.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="prepayment-by-loan-type">Prepayment by Loan Type</h2>
                <h3 style={h3}>Home loans</h3>
                <p style={p}>
                  The longest tenures and the biggest absolute savings. No prepayment charge on floating-rate home loans to individuals. Some lenders set a minimum part-payment amount, so check the loan agreement first.
                </p>
                <h3 style={h3}>Personal loans</h3>
                <p style={p}>
                  Usually fixed-rate, so a foreclosure charge of roughly 2% to 5% often applies. Because the tenure is short, the early-prepayment advantage window closes faster than on a home loan.
                </p>
                <h3 style={h3}>Car and two-wheeler loans</h3>
                <p style={p}>
                  Lenders often limit part payments. HDFC Bank, for example, allows two over the car loan, no more than one a year, each up to 25% of the outstanding principal. Fixed-rate vehicle loans typically carry a foreclosure charge that steps down after the first year or two.
                </p>
                <h3 style={h3}>Education loans</h3>
                <p style={p}>
                  Prepayment is most valuable right after the moratorium ends, since interest has usually already accrued through the study period. See the <Link href="/calculators/education-loan-emi-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Education Loan EMI Calculator</Link> for the moratorium-specific math.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="common-mistakes">Common Prepayment Mistakes to Avoid</h2>
                <ul style={ulS}>
                  <li style={li}><strong style={strong}>Not telling the lender how to apply it:</strong> ask explicitly for tenure reduction if minimising total interest is the goal, since some lenders default to reducing the EMI instead.</li>
                  <li style={li}><strong style={strong}>Prepaying a fixed-rate loan without checking the charge:</strong> a 3-5% foreclosure charge can offset much of the interest saved on a small prepayment made late in the loan. Enter it under More settings to see the net figure.</li>
                  <li style={li}><strong style={strong}>Ignoring an emergency fund:</strong> a lump sum locked into a loan cannot be withdrawn back out if an emergency comes up.</li>
                  <li style={li}><strong style={strong}>Waiting too long:</strong> the same amount saves far less once most of the interest has already been paid.</li>
                  <li style={li}><strong style={strong}>Comparing raw amounts instead of guaranteed rate:</strong> a bigger rupee saving on a low-rate loan does not mean it was the better use of that money; check the effective return, not just the number.</li>
                </ul>
              </div>

              <div style={sec}>
                <h2 style={h2} id="limitations">Limitations of This Calculator</h2>
                <p style={p}>
                  <strong style={strong}>Assumes a constant interest rate.</strong> A floating-rate reset changes the EMI or tenure independently of any prepayment, so results are exact only while the rate holds.
                </p>
                <p style={p}>
                  <strong style={strong}>Charges are applied as a flat percentage, before GST.</strong> The Prepayment Charge setting takes a single rate on the amount prepaid. Lenders whose charge steps down over time, or who add GST and fees on top, will show a slightly different net figure.
                </p>
                <p style={p}>
                  <strong style={strong}>One lump sum or one recurring extra amount at a time.</strong> Multiple separate lump sums across different years need to be modelled one at a time, using the balance after the previous one as the new starting point.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This Loan Prepayment Calculator</h2>
                <ol style={olS}>
                  <li style={li}><strong style={strong}>Loan details:</strong> enter the loan amount, interest rate and original tenure. If the loan is already running, open More settings and set Loan Age.</li>
                  <li style={li}><strong style={strong}>Fixed-rate loan?</strong> In More settings, enter the prepayment charge from your Key Facts Statement to see the net saving after the charge.</li>
                  <li style={li}><strong style={strong}>Choose a mode:</strong> Monthly Extra for a recurring additional payment, or Lump Sum for a one-time payment tied to a specific EMI number.</li>
                  <li style={li}><strong style={strong}>For a lump sum, pick a strategy:</strong> Reduce Tenure to keep the EMI and finish sooner, or Reduce EMI to keep the end date and pay less each month.</li>
                  <li style={li}><strong style={strong}>Read the results:</strong> interest saved, the new tenure or new EMI, and the original-vs-prepaid comparison.</li>
                  <li style={li}><strong style={strong}>Amortization Comparison:</strong> expand it for the year-by-year bar chart and table.</li>
                </ol>
              </div>


              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ items={faqs} />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only and based on the inputs provided. Actual savings can differ because of rounding, day-count conventions, prepayment or foreclosure charges, fees, GST on charges and floating-rate resets. Interest rates and bank charge examples cited are illustrative and subject to change; confirm current charges with your lender. Tax rules are summarised for general information. This calculator is for educational and planning purposes only and does not constitute financial, tax or legal advice. Consult your lender or a qualified CA before making prepayment decisions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .loan-prepay-sidebar::-webkit-scrollbar { width: 5px; }
            .loan-prepay-sidebar::-webkit-scrollbar-track { background: transparent; }
            .loan-prepay-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .loan-prepay-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            aria-label="Related calculators"
            className="loan-prepay-sidebar"
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
            <div style={{ flexShrink: 0 }}><PrepaymentQuickFacts /></div>
            <div style={{ flexShrink: 0 }}><SidebarList title="Popular Calculators" items={POPULAR} /></div>
            <div style={{ flexShrink: 0 }}><SidebarList title="More Calculators" items={MORE} /></div>
          </aside>

        </div>
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect, useId } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import { FAQBox } from '@/components/common/FAQBox';

/* ── Palette ───────────────────────────────────────────── */
const C = {
  dark: '#101214', lime: '#a6dbc4', lime2: '#2d9970', paleLime: '#f4f5f6',
  ink: '#16140F', ink2: '#50565c', ink3: '#7a8087', white: '#ffffff',
  bg: '#f6f7f8', border: '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';
const MAX_MONTHS = 600;

/* ── Types ─────────────────────────────────────────────── */
interface Debt {
  id: string;
  name: string;
  balance: number;
  rate: number;
  minPayment: number;
}

interface DebtResult {
  id: string;
  name: string;
  rate: number;
  startingBalance: number;
  monthsToPayoff: number;
  interestPaid: number;
  neverPaidOff: boolean;
  payoffMonth: number; // index in overall plan, 1-based
}

interface YearRow {
  year: number; // plan year, 1-based
  month: number; // plan month at this snapshot
  remainingBalance: number;
}

interface MonthPoint {
  month: number; // 0 = today, before any payment
  byDebt: number[]; // remaining balance per debt, in avalanche order
}

interface SimResult {
  debtResults: DebtResult[];
  totalMonths: number;
  totalInterest: number;
  totalPrincipal: number;
  totalPaid: number;
  yearRows: YearRow[];
  monthPoints: MonthPoint[];
  capped: boolean;
  payoffOrder: { id: string; name: string; rate: number; month: number }[];
}

/* ── Simulation ────────────────────────────────────────── */
function simulateAvalanche(debts: Debt[], extraMonthly: number): SimResult {
  const valid = debts.filter(d => d.balance > 0);
  if (valid.length === 0) {
    return { debtResults: [], totalMonths: 0, totalInterest: 0, totalPrincipal: 0, totalPaid: 0, yearRows: [], monthPoints: [], capped: false, payoffOrder: [] };
  }

  // Working state, sorted by rate descending (avalanche order). Ties broken by original index.
  const order = [...valid].sort((a, b) => b.rate - a.rate);
  const balances: Record<string, number> = {};
  const interestPaid: Record<string, number> = {};
  const monthsToPayoff: Record<string, number> = {};
  const payoffMonth: Record<string, number> = {};
  order.forEach(d => { balances[d.id] = d.balance; interestPaid[d.id] = 0; monthsToPayoff[d.id] = 0; payoffMonth[d.id] = 0; });

  const totalPrincipal = order.reduce((s, d) => s + d.balance, 0);
  const yearRows: YearRow[] = [];
  const monthPoints: MonthPoint[] = [{ month: 0, byDebt: order.map(d => d.balance) }];
  let month = 0;
  let capped = false;

  while (order.some(d => balances[d.id] > 0.01) && month < MAX_MONTHS) {
    month++;

    // 1. Apply interest to every outstanding debt.
    order.forEach(d => {
      if (balances[d.id] > 0.01) {
        const monthlyRate = d.rate / 12 / 100;
        const interest = balances[d.id] * monthlyRate;
        balances[d.id] += interest;
        interestPaid[d.id] += interest;
      }
    });

    // 2. Pay minimum on every debt (capped at remaining balance).
    let freedUp = extraMonthly;
    order.forEach(d => {
      if (balances[d.id] > 0.01) {
        const pay = Math.min(d.minPayment, balances[d.id]);
        balances[d.id] -= pay;
      } else {
        // Already paid off in a previous month: its minimum is permanently freed.
        freedUp += d.minPayment;
      }
    });

    // 3. Direct all freed-up extra budget at the current highest-rate debt still owing.
    const target = order.find(d => balances[d.id] > 0.01);
    if (target && freedUp > 0) {
      const pay = Math.min(freedUp, balances[target.id]);
      balances[target.id] -= pay;
    }

    // 4. Record payoff month for any debt that just hit zero.
    order.forEach(d => {
      if (balances[d.id] <= 0.01 && payoffMonth[d.id] === 0) {
        payoffMonth[d.id] = month;
        monthsToPayoff[d.id] = month;
        balances[d.id] = 0;
      }
    });

    monthPoints.push({ month, byDebt: order.map(d => Math.max(0, balances[d.id])) });

    // Plan-year snapshot (every 12 months, plus a final snapshot at the end).
    if (month % 12 === 0) {
      const remaining = order.reduce((s, d) => s + balances[d.id], 0);
      yearRows.push({ year: month / 12, month, remainingBalance: Math.round(remaining) });
    }

    if (month >= MAX_MONTHS) capped = true;
  }

  // Final partial-year snapshot if simulation ended mid-year.
  if (month % 12 !== 0 && month > 0) {
    const remaining = order.reduce((s, d) => s + balances[d.id], 0);
    yearRows.push({ year: Math.ceil(month / 12), month, remainingBalance: Math.round(Math.max(0, remaining)) });
  }

  const debtResults: DebtResult[] = order.map(d => ({
    id: d.id,
    name: d.name,
    rate: d.rate,
    startingBalance: d.balance,
    monthsToPayoff: monthsToPayoff[d.id] || 0,
    interestPaid: Math.round(interestPaid[d.id]),
    neverPaidOff: balances[d.id] > 0.01,
    payoffMonth: payoffMonth[d.id] || 0,
  }));

  const payoffOrder = debtResults
    .filter(d => d.payoffMonth > 0)
    .sort((a, b) => a.payoffMonth - b.payoffMonth)
    .map(d => ({ id: d.id, name: d.name, rate: d.rate, month: d.payoffMonth }));

  const totalInterest = Math.round(order.reduce((s, d) => s + interestPaid[d.id], 0));
  const totalMonths = order.every(d => payoffMonth[d.id] > 0) ? Math.max(...order.map(d => payoffMonth[d.id])) : month;
  const totalPaid = Math.round(totalPrincipal + totalInterest);

  return { debtResults, totalMonths, totalInterest, totalPrincipal: Math.round(totalPrincipal), totalPaid, yearRows, monthPoints, capped, payoffOrder };
}

/* ── Slider (input panel, no fill colors) ─────────────────────────── */
function Slider({ label, id: idProp, value, min, max, step, display, onChange, compact, suffix }: {
  label: string; id?: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (v: number) => void; compact?: boolean; suffix?: string;
}) {
  const autoId = useId();
  const inputId = idProp || autoId;
  const rangeId = `${inputId}-range`;
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const commit = () => { setEditing(false); const n = parseFloat(raw.replace(/[^0-9.]/g, '')); if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n))); };
  return (
    <div style={{ marginBottom: compact ? 18 : 36 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 14 }}>
        {label ? <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 13.5 : 14, color: C.ink2, fontWeight: 400 }}>{label}</label> : <span />}
        {editing ? (
          <div style={{ position: 'relative' }}>
            <input id={inputId} autoFocus value={raw} aria-label={`Enter ${label} value`}
              onChange={e => setRaw(e.target.value)} onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
              style={{ fontSize: 14, fontWeight: 600, textAlign: suffix ? 'left' : 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 7, padding: compact ? '6px 10px' : '7px 12px', width: 120, outline: 'none', color: C.ink, fontFamily: INTER }} />
            {suffix && <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: C.ink3, pointerEvents: 'none', fontWeight: 700 }}>{suffix}</span>}
          </div>
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${display}. Click to edit.`}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}
            style={{ fontSize: compact ? 13 : 14, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: compact ? '5px 12px' : '6px 14px', cursor: 'pointer', fontFamily: INTER, minWidth: compact ? 88 : 105, textAlign: 'center', transition: 'border-color 0.15s' }}>
            {display}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 18, height: 18, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 1px 6px rgba(16,18,20,0.18)', pointerEvents: 'none', zIndex: 1 }} />
        <input id={rangeId} type="range" min={min} max={max} step={step} value={value}
          aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
          onChange={e => onChange(+e.target.value)}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">{min}{suffix || ''}</span>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">{max}{suffix || ''}</span>
      </div>
    </div>
  );
}

/* ── DonutChart ────────────────────────────────────────── */
function DonutChart({ principal, interest }: { principal: number; interest: number }) {
  const total = principal + interest;
  if (total === 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const pArc = (principal / total) * circ;
  const pPct = Math.round((principal / total) * 100);
  return (
    <svg role="img" aria-label={`Payoff split: ${pPct}% principal, ${100 - pPct}% interest`}
      width="212" height="212" viewBox="0 0 212 212" style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Principal</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
  );
}

/* ── Stacked balance chart: remaining balance per debt over time ── */
const DEBT_COLORS = ['#101214', '#2d9970', '#5edda2', '#a6dbc4', '#0b4a34', '#c4c9cd'];

function payoffStep(totalMonths: number) {
  return totalMonths <= 36 ? 1 : totalMonths <= 120 ? 3 : 12;
}

function PayoffChart({ points, names, mobile, fmt }: {
  points: MonthPoint[]; names: string[]; mobile: boolean; fmt: (n: number) => string;
}) {
  const lastMonth = points[points.length - 1]?.month ?? 0;
  const step = payoffStep(lastMonth);
  // Sample every `step` months and drop the final all-zero point (debt-free).
  const bars = points.filter(p => p.month % step === 0 && p.byDebt.some(b => b > 0.5));
  if (bars.length === 0) return null;

  const W = mobile ? 400 : 800, H = 160, PADL = 4, PADB = 20;
  const maxBal = Math.max(...bars.map(p => p.byDebt.reduce((s, b) => s + b, 0)), 1);
  const slot = (W - PADL) / bars.length;
  const barW = Math.max(3, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;
  const labelEvery = Math.max(1, Math.ceil(bars.length / (mobile ? 6 : 12)));
  const label = (m: number) => m === 0 ? 'Now' : step === 1 ? `M${m}` : `Y${m / 12}`;
  // Quarterly bars are labelled at whole years only, so ticks read cleanly.
  const showLabel = (m: number, i: number) => step === 3 ? m % 12 === 0 : i % labelEvery === 0;

  return (
    <svg role="img" aria-label={`Remaining balance of each debt over ${lastMonth} months under the avalanche plan`}
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {bars.map((p, i) => {
        const x = PADL + i * slot + gap;
        const total = p.byDebt.reduce((s, b) => s + b, 0);
        let y = H;
        return (
          <g key={p.month}>
            <title>{`${p.month === 0 ? 'Today' : `Month ${p.month}`}: ${fmt(total)} remaining`}</title>
            {p.byDebt.map((b, j) => {
              const h = (b / maxBal) * H;
              if (h <= 0) return null;
              y -= h;
              return <rect key={j} x={x} y={y} width={barW} height={h} fill={DEBT_COLORS[j % DEBT_COLORS.length]} aria-label={names[j]} />;
            })}
            {showLabel(p.month, i) && (
              <text x={x + barW / 2} y={H + 14} textAnchor="middle"
                style={{ fontSize: 9, fill: C.ink3, fontFamily: INTER }}>
                {label(p.month)}
              </text>
            )}
          </g>
        );
      })}
      <line x1={PADL} y1={H} x2={W} y2={H} stroke={C.border} strokeWidth={1} />
    </svg>
  );
}

/* ── Quick Facts ───────────────────────────────────────── */
function AvalancheQuickFacts() {
  const rows = [
    { label: 'Typical credit card rate (India)', value: '36-42%' },
    { label: 'Sort order',                        value: 'Highest rate first' },
    { label: 'Optimizes for',                     value: 'Lowest total interest' },
    { label: 'Debts supported',                   value: 'Up to 6' },
    { label: 'Simulation cap',                     value: `${MAX_MONTHS / 12} years` },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', fontFamily: INTER, background: C.white }}>
      <div style={{ background: '#f4f5f6', padding: '12px 18px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink }}>Avalanche Quick Facts</span>
      </div>
      {rows.map((r, i) => (
        <div key={r.label} style={{ padding: '11px 18px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12.5, color: C.ink2 }}>{r.label}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.ink, whiteSpace: 'nowrap' }}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Table of contents ────────────────────────────────── */
const TOC_ITEMS = [
  { id: 'what-is-avalanche',        label: 'What is avalanche' },
  { id: 'how-avalanche-works',      label: 'How it works' },
  { id: 'avalanche-formula',        label: 'Formula and simulation' },
  { id: 'avalanche-vs-snowball',    label: 'Avalanche vs snowball' },
  { id: 'who-should-use',           label: 'Who should use which' },
  { id: 'credit-card-avalanche',    label: 'Credit card avalanche' },
  { id: 'extra-payment-impact',     label: 'Extra payment impact' },
  { id: 'minimum-payment-trap',     label: 'Minimum payment trap' },
  { id: 'common-mistakes',          label: 'Common mistakes' },
  { id: 'excel-vs-calculator',      label: 'Excel vs calculator' },
  { id: 'limitations',              label: 'Limitations' },
  { id: 'how-to-use',               label: 'How to use' },
  { id: 'faq',                      label: 'FAQs' },
];

function TableOfContents() {
  return (
    <nav aria-label="Table of contents" style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', margin: '0 0 40px', fontFamily: INTER, background: C.white }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: C.ink3 }}>On this page</span>
      </div>
      <div style={{ padding: '10px 8px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 2 }}>
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

/* ── SidebarList ───────────────────────────────────────── */
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
  { href: '/calculators/debt-snowball-calculator', label: 'Debt Snowball Calculator' },
  { href: '/calculators/debt-to-income-ratio-calculator', label: 'Debt-to-Income Ratio Calculator' },
  { href: '/calculators/credit-card-emi-calculator', label: 'Credit Card EMI Calculator' },
  { href: '/calculators/emi-calculator', label: 'EMI Calculator' },
  { href: '/calculators/loan-eligibility-calculator', label: 'Loan Eligibility Calculator' },
  { href: '/calculators/balance-transfer-savings-calculator', label: 'Loan Balance Transfer Savings' },
  { href: '/calculators/net-worth-calculator', label: 'Net Worth Calculator' },
];
const MORE = [
  { href: '/calculators/personal-loan-eligibility-calculator', label: 'Personal Loan Eligibility' },
  { href: '/calculators/car-loan-calculator', label: 'Car Loan Calculator' },
  { href: '/calculators/education-loan-emi-calculator', label: 'Education Loan EMI Calculator' },
  { href: '/calculators/compound-interest-calculator', label: 'Compound Interest Calculator' },
  { href: '/calculators/income-tax-calculator', label: 'Income Tax Calculator' },
];

/* ── FAQ (single-sourced via props from page.tsx) ────────── */
function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return <FAQBox items={items} />;
}

/* ── Article style helpers ──────────────────────────────── */
const h2S: React.CSSProperties = { fontSize: 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' };
const pS: React.CSSProperties = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' };
const secS: React.CSSProperties = { margin: '0 0 40px' };
const bulletS: React.CSSProperties = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 };
const thS: React.CSSProperties = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' };
const tdL: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' };
const tdR: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top' };
const linkS: React.CSSProperties = { color: C.dark, fontWeight: 600 };

let idCounter = 0;
function nextId() { idCounter += 1; return `debt-${Date.now()}-${idCounter}`; }

const DEFAULT_DEBTS: Debt[] = [
  { id: 'd1', name: 'Credit Card', balance: 80000, rate: 36, minPayment: 2400 },
  { id: 'd2', name: 'Personal Loan', balance: 200000, rate: 14, minPayment: 5000 },
  { id: 'd3', name: 'Car Loan', balance: 150000, rate: 10, minPayment: 4000 },
];

/* ════════════════════════════════════════════════════════ */
export default function DebtAvalancheClient({ faqs }: { faqs: { q: string; a: string }[] }) {
  const defaultSettings = { debts: DEFAULT_DEBTS, extraMonthly: 10000 };
  const { settings, updateSettings } = useCalculatorSettings('debt-avalanche', defaultSettings);
  const { debts, extraMonthly } = settings as { debts: Debt[]; extraMonthly: number };

  const [mobile, setMobile] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showYearTable, setShowYearTable] = useState(false);
  useLayoutEffect(() => { const chk = () => setMobile(window.innerWidth < 1024); chk(); window.addEventListener('resize', chk); return () => window.removeEventListener('resize', chk); }, []);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  const setDebts = (next: Debt[]) => updateSettings({ debts: next });
  const setExtraMonthly = (v: number) => updateSettings({ extraMonthly: v });

  const updateDebt = (id: string, patch: Partial<Debt>) => {
    setDebts(debts.map(d => d.id === id ? { ...d, ...patch } : d));
  };
  const addDebt = () => {
    if (debts.length >= 6) return;
    setDebts([...debts, { id: nextId(), name: `Debt ${debts.length + 1}`, balance: 50000, rate: 18, minPayment: 1500 }]);
  };
  const removeDebt = (id: string) => {
    if (debts.length <= 1) return;
    setDebts(debts.filter(d => d.id !== id));
  };

  const sim = useMemo(() => simulateAvalanche(debts, extraMonthly), [debts, extraMonthly]);

  const hasNeverPaidOff = sim.debtResults.some(d => d.neverPaidOff);
  const years = Math.floor(sim.totalMonths / 12);
  const remMonths = sim.totalMonths % 12;
  const totalMonthsDisplay = sim.totalMonths > 0
    ? `${years > 0 ? `${years}y ` : ''}${remMonths}m`
    : '0m';

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>Debt Avalanche Calculator</h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Add every debt you owe and see the avalanche payoff order: highest interest rate first, minimum total interest paid, and the exact month you become debt-free.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <section aria-label="Debt Avalanche Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* ───── INPUT PANEL (no fill colors) ───── */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{showAdvanced ? 'More Settings' : 'Your Debts'}</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 18 }}>
                        {debts.map((debt, i) => (
                          <div key={debt.id} style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                              <input
                                value={debt.name}
                                onChange={e => updateDebt(debt.id, { name: e.target.value })}
                                aria-label={`Debt ${i + 1} name`}
                                style={{ fontSize: 14, fontWeight: 700, color: C.ink, background: 'transparent', border: 'none', outline: 'none', fontFamily: INTER, padding: 0, width: '60%' }}
                              />
                              {debts.length > 1 && (
                                <button onClick={() => removeDebt(debt.id)} aria-label={`Remove ${debt.name || 'debt'}`}
                                  style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: 6, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: C.ink3, fontSize: 14, lineHeight: 1, padding: 0 }}>
                                  &times;
                                </button>
                              )}
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                              <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                <span style={{ fontSize: 11, color: C.ink3 }}>Balance</span>
                                <input
                                  type="number" min={0} value={debt.balance}
                                  onChange={e => updateDebt(debt.id, { balance: Math.max(0, parseFloat(e.target.value) || 0) })}
                                  aria-label={`${debt.name || 'Debt'} outstanding balance`}
                                  style={{ fontSize: 13, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 6, padding: '6px 8px', outline: 'none', fontFamily: INTER, width: '100%' }}
                                />
                              </label>
                              <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                <span style={{ fontSize: 11, color: C.ink3 }}>Rate (% p.a.)</span>
                                <input
                                  type="number" min={0} step={0.1} value={debt.rate}
                                  onChange={e => updateDebt(debt.id, { rate: Math.max(0, parseFloat(e.target.value) || 0) })}
                                  aria-label={`${debt.name || 'Debt'} annual interest rate`}
                                  style={{ fontSize: 13, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 6, padding: '6px 8px', outline: 'none', fontFamily: INTER, width: '100%' }}
                                />
                              </label>
                              <label style={{ display: 'flex', flexDirection: 'column', gap: 4, gridColumn: '1 / -1' }}>
                                <span style={{ fontSize: 11, color: C.ink3 }}>Minimum monthly payment</span>
                                <input
                                  type="number" min={0} value={debt.minPayment}
                                  onChange={e => updateDebt(debt.id, { minPayment: Math.max(0, parseFloat(e.target.value) || 0) })}
                                  aria-label={`${debt.name || 'Debt'} minimum monthly payment`}
                                  style={{ fontSize: 13, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 6, padding: '6px 8px', outline: 'none', fontFamily: INTER, width: '100%' }}
                                />
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>

                      {debts.length < 6 && (
                        <button onClick={addDebt}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.ink, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600, marginBottom: 18, width: '100%', justifyContent: 'center' }}>
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                          Add another debt
                        </button>
                      )}

                      <button onClick={() => setShowAdvanced(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.ink, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        More settings
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <Slider id="extra-monthly" label="Extra Monthly Payment" value={extraMonthly} min={0} max={100000} step={500}
                        display={fmtIN(extraMonthly)} onChange={setExtraMonthly} compact />
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: '0 0 24px' }}>
                        This is the amount you can put toward debt every month, beyond the combined minimum payments. The avalanche method directs all of it at your highest-rate debt first.
                      </p>
                      <button onClick={() => setShowAdvanced(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.ink, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        Back
                      </button>
                    </>
                  )}
                </div>

                {/* ───── RESULTS PANEL ───── */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  {sim.debtResults.length === 0 ? (
                    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.ink3}`, padding: 20, borderRadius: 12, width: '100%' }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: C.ink, marginBottom: 8 }}>No debts entered</div>
                      <div style={{ color: C.ink2, fontSize: 14, lineHeight: 1.5 }}>Add at least one debt with a balance greater than zero to see your avalanche payoff plan.</div>
                    </div>
                  ) : (
                    <>
                      {/* Donut */}
                      <div style={{ order: mobile ? 1 : -1, marginBottom: mobile ? 16 : 20 }}>
                        <DonutChart principal={sim.totalPrincipal} interest={sim.totalInterest} />
                      </div>
                      {/* Legend */}
                      <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 20, marginBottom: mobile ? 12 : 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                          <span style={{ fontSize: 13, color: C.ink2 }}>Principal</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                          <span style={{ fontSize: 13, color: C.ink2 }}>Interest</span>
                        </div>
                      </div>

                      {hasNeverPaidOff && (
                        <div style={{ width: '100%', background: C.white, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.ink3}`, padding: '14px 16px', borderRadius: 10, marginBottom: 16 }}>
                          <div style={{ fontWeight: 700, fontSize: 13.5, color: C.ink, marginBottom: 4 }}>Some debts will never be paid off</div>
                          <div style={{ color: C.ink2, fontSize: 12.5, lineHeight: 1.5 }}>
                            At least one minimum payment does not cover the monthly interest charge. Increase that minimum payment or add more extra monthly budget.
                          </div>
                        </div>
                      )}

                      {/* Primary dark result box: two metrics */}
                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 8 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#50565C' }}>Debt-free in</div>
                          <div style={{ fontSize: 12, color: '#7A8087' }}>Total interest paid</div>
                        </div>
                        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                          <div aria-live="polite" aria-label={`Debt free in ${totalMonthsDisplay}`} style={{ fontSize: mobile ? 22 : 26, fontWeight: 800, color: '#1F7A58', lineHeight: 1 }}>
                            {sim.capped ? `${MAX_MONTHS}+ months` : totalMonthsDisplay}
                          </div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#101214', lineHeight: 1 }}>{fmtC(sim.totalInterest)}</div>
                        </div>
                      </div>

                      {/* Stat rows */}
                      {[
                        { label: 'Total principal', value: fmtC(sim.totalPrincipal) },
                        { label: 'Total amount paid', value: fmtC(sim.totalPaid) },
                        { label: 'Extra monthly payment', value: fmtIN(extraMonthly) },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                        </div>
                      ))}

                      {/* Payoff order */}
                      <div style={{ width: '100%', marginTop: 18 }}>
                        <p style={{ fontSize: 12, fontWeight: 700, color: C.ink3, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>Payoff order (highest rate first)</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {sim.payoffOrder.map((d, i) => (
                            <div key={d.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 12px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ fontSize: 11, fontWeight: 700, color: '#101214', background: '#E9ECEE', border: '1px solid #D3D7DA', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
                                <span style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{d.name || 'Debt'}</span>
                                <span style={{ fontSize: 11, color: C.ink3 }}>{d.rate}%</span>
                              </div>
                              <span style={{ fontSize: 12, color: C.ink2 }}>Month {d.month}</span>
                            </div>
                          ))}
                          {sim.debtResults.filter(d => d.neverPaidOff).map(d => (
                            <div key={d.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 12px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{d.name || 'Debt'}</span>
                                <span style={{ fontSize: 11, color: C.ink3 }}>{d.rate}%</span>
                              </div>
                              <span style={{ fontSize: 12, color: C.ink3 }}>Never pays off</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* ── Payoff schedule: chart + tables, inside the calculator card ── */}
              {sim.yearRows.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowYearTable(v => !v)} aria-expanded={showYearTable} aria-controls="payoff-schedule-panel"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0, textAlign: 'left' }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Payoff Schedule</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>Balance decline and per-debt breakdown</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {sim.yearRows.length} yr
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showYearTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showYearTable && (
                    <div id="payoff-schedule-panel" style={{ borderTop: `1px solid ${C.border}` }}>
                      <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: mobile ? 'flex-start' : 'center', flexDirection: mobile ? 'column' : 'row', gap: 10, marginBottom: 14 }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>
                            Remaining balance {payoffStep(sim.totalMonths) === 1 ? 'by month' : payoffStep(sim.totalMonths) === 3 ? 'by quarter' : 'by year'}
                          </span>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px' }}>
                            {sim.debtResults.map((d, j) => (
                              <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <div style={{ width: 10, height: 10, borderRadius: 2, background: DEBT_COLORS[j % DEBT_COLORS.length] }} aria-hidden="true" />
                                <span style={{ fontSize: 11.5, color: C.ink2 }}>{d.name || 'Debt'}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <PayoffChart points={sim.monthPoints} names={sim.debtResults.map(d => d.name || 'Debt')} mobile={mobile} fmt={fmtC} />
                        <p style={{ fontSize: 11.5, color: C.ink3, margin: '8px 0 14px', lineHeight: 1.6 }}>
                          Each bar stacks what you still owe on every debt. The highest-rate debt shrinks first, then its payment rolls to the next one.
                        </p>
                      </div>

                      <div style={{ padding: mobile ? '0 16px 16px' : '0 44px 24px' }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: C.ink, display: 'block', marginBottom: 10 }}>Per-debt payoff breakdown</span>
                      </div>
                      {mobile && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '0 0 8px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                            style={{ animation: 'swipeHint 1.6s ease-in-out infinite' }}>
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                          <p style={{ fontSize: 11.5, color: C.ink3, margin: 0, fontFamily: INTER }}>Swipe to see all columns</p>
                          <style>{`@keyframes swipeHint { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }`}</style>
                        </div>
                      )}
                      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
                        <table style={{ minWidth: 560, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: mobile ? '8px 16px 16px' : '8px 44px 20px' }}>
                            Months to pay off and interest paid on each debt, in avalanche order.
                          </caption>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              <th scope="col" style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: C.ink, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Debt</th>
                              <th scope="col" style={{ padding: '10px 14px', textAlign: 'right', fontSize: 11, fontWeight: 700, color: C.ink, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Rate</th>
                              <th scope="col" style={{ padding: '10px 14px', textAlign: 'right', fontSize: 11, fontWeight: 700, color: C.ink, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Starting Balance</th>
                              <th scope="col" style={{ padding: '10px 14px', textAlign: 'right', fontSize: 11, fontWeight: 700, color: C.ink, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Months to Pay Off</th>
                              <th scope="col" style={{ padding: '10px 14px', textAlign: 'right', fontSize: 11, fontWeight: 700, color: C.ink, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Interest Paid</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sim.debtResults.map((d, i) => (
                              <tr key={d.id} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ padding: '11px 14px', fontWeight: 600, color: C.ink }}>{d.name || 'Debt'}</td>
                                <td style={{ padding: '11px 14px', textAlign: 'right', color: C.ink2 }}>{d.rate}%</td>
                                <td style={{ padding: '11px 14px', textAlign: 'right', color: C.ink2 }}>{fmtC(d.startingBalance)}</td>
                                <td style={{ padding: '11px 14px', textAlign: 'right', color: C.ink2 }}>{d.neverPaidOff ? 'Never' : d.monthsToPayoff}</td>
                                <td style={{ padding: '11px 14px', textAlign: 'right', fontWeight: 700, color: C.ink }}>{fmtC(d.interestPaid)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', borderTop: `1px solid ${C.border}` } as React.CSSProperties}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: mobile ? '8px 16px 16px' : '8px 44px 20px' }}>
                            Total remaining balance across all debts at the end of each plan year.
                          </caption>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              <th scope="col" style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: C.ink, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Year</th>
                              <th scope="col" style={{ padding: '10px 14px', textAlign: 'right', fontSize: 11, fontWeight: 700, color: C.ink, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Remaining Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sim.yearRows.map((row, i) => (
                              <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ padding: '11px 14px', color: C.ink2 }}>
                                  Year {row.year}{row.month % 12 !== 0 && <span style={{ color: C.ink3 }}> (month {row.month})</span>}
                                </td>
                                <td style={{ padding: '11px 14px', textAlign: 'right', fontWeight: 600, color: C.ink }}>{fmtC(row.remainingBalance)}</td>
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

            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ════════════════════ ARTICLE ════════════════════ */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <TableOfContents />

              <div style={secS} id="what-is-avalanche">
                <h2 style={h2S}>What Is the Debt Avalanche Method?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    The debt avalanche method pays the minimum on every debt and directs all spare money toward the debt charging the highest interest rate first. It is the strategy that produces the lowest total interest cost of any fixed-order repayment plan.
                  </p>
                </div>
                <p style={pS}>Once the highest-rate debt is cleared, its full payment, including the freed-up minimum, moves to whichever debt now carries the highest remaining rate. The process repeats until every balance reaches zero.</p>
                <p style={pS}>This calculator runs that exact simulation month by month using your real balances, rates, and minimum payments, the same logic used to model an <Link href="/calculators/emi-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>EMI calculator</Link> schedule, applied across multiple debts at once.</p>
              </div>

              <div style={secS} id="how-avalanche-works">
                <h2 style={h2S}>How the Debt Avalanche Method Works, Step by Step</h2>
                <p style={pS}>The avalanche method follows a fixed sequence every month until every debt is cleared.</p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Sort by rate:</strong> List every debt from the highest annual interest rate to the lowest. Balance size does not affect the order.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Pay every minimum:</strong> Make the minimum payment on each debt so none of them go into default.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Attack the top debt:</strong> Send 100% of your extra monthly budget to the debt with the highest rate, on top of its minimum.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Roll the payment forward:</strong> When the top debt hits zero, its old minimum plus the extra budget shifts to the next highest-rate debt still outstanding.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Repeat until debt-free:</strong> Continue the cycle until the last balance reaches zero.</li>
                </ol>
                <p style={pS}>Because the highest-rate balance always gets the extra money, less interest accrues across the whole portfolio of debts than under any other fixed ordering, which is what makes avalanche mathematically optimal.</p>
              </div>

              <div style={secS} id="avalanche-formula">
                <h2 style={h2S}>Debt Avalanche Formula and Simulation Logic</h2>
                <p style={pS}>There is no single closed-form formula for multi-debt avalanche payoff because the target debt changes every time one is cleared. Instead, the calculation runs as a month-by-month simulation.</p>
                <div style={{ background: '#f8f9f9', border: `1px solid ${C.border}`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, margin: '0 0 8px' }}>Each month, for every debt:</p>
                  <code style={{ fontSize: 13 }}>Interest = Balance &times; (Annual Rate / 12 / 100)</code>
                  <p style={{ fontSize: 14, fontWeight: 700, margin: '16px 0 8px' }}>Then minimums are paid, and the extra budget goes to the top debt:</p>
                  <code style={{ fontSize: 13 }}>Extra Payment to Top Debt = User Extra + Sum of Minimums from Paid-Off Debts</code>
                </div>
                <p style={pS}>The simulation repeats until every balance is zero or the plan is capped at {MAX_MONTHS} months (50 years), the point at which a debt with a minimum payment too low to cover its own interest charge would otherwise loop forever.</p>
              </div>

              <div style={secS} id="avalanche-vs-snowball">
                <h2 style={h2S}>Debt Avalanche vs Debt Snowball: What Is the Difference?</h2>
                <p style={pS}>Avalanche and snowball both pay minimums on every debt and direct extra money at one target debt at a time. The difference is purely in how that target is chosen.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead><tr>
                      <th scope="col" style={thS}>Factor</th>
                      <th scope="col" style={thS}>Debt Avalanche</th>
                      <th scope="col" style={thS}>Debt Snowball</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ['Sort order', 'Highest interest rate first', 'Smallest balance first'],
                        ['Total interest paid', 'Lowest possible', 'Higher than avalanche'],
                        ['Time to first debt cleared', 'Can be slower', 'Usually faster'],
                        ['Best for', 'Disciplined, numbers-focused borrowers', 'Borrowers who need quick wins to stay motivated'],
                        ['Math outcome', 'Mathematically optimal', 'Behaviorally optimal for many people'],
                      ].map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>{row[0]}</td>
                          <td style={tdL}>{row[1]}</td>
                          <td style={tdL}>{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={pS}>On the default example above, Rs 4.3 lakh across three debts at 36%, 14% and 9% with Rs 10,000 extra a month, avalanche pays Rs 62,488 in total interest against Rs 65,969 for snowball, a saving of Rs 3,481. Both plans finish in the same 24 months.</p>
                <p style={pS}>That last point surprises most people: total payoff time is usually almost identical between the two methods. It is driven mainly by total balance, total minimum payments and extra budget, not by the order debts are attacked in. What changes is total interest, and which single debt disappears first.</p>
                <p style={pS}>The interest gap widens as rates spread out further. A 40% card, a 16% personal loan and a 9% car loan with Rs 8,000 extra a month saves about Rs 13,700 more under avalanche than snowball, roughly four times the saving in the closer-rates example above.</p>
                <p style={pS}>Run the same set of debts through the <Link href="/calculators/debt-snowball-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Debt Snowball Calculator</Link> to compare both payoff orders side by side using your own numbers.</p>
              </div>

              <div style={secS} id="who-should-use">
                <h2 style={h2S}>Who Should Use Avalanche vs Snowball?</h2>
                <p style={pS}>The right method depends more on behavior than on math, since both strategies use the same extra budget each month.</p>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Use avalanche if:</strong> you already track your finances closely, want the lowest possible total interest cost, and do not need frequent wins to stay on track.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Use snowball if:</strong> you have abandoned debt payoff plans before, want the motivation of clearing a full account quickly, and are willing to pay somewhat more total interest for that consistency.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Use a hybrid if:</strong> you have one very small debt and one very high-rate debt; clearing the small one first for a quick win, then switching to avalanche order, is a reasonable middle ground.</span></div>
                <p style={pS}>Before choosing either method, check your overall debt load against your income using the <Link href="/calculators/debt-to-income-ratio-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Debt-to-Income Ratio Calculator</Link>. If single loan prepayments make sense for specific home or personal loans, try our <Link href="/calculators/loan-prepayment-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Loan Prepayment Calculator</Link> or calculate fixed installment options with our <Link href="/calculators/emi-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>EMI Calculator</Link>.</p>
              </div>

              <div style={secS} id="credit-card-avalanche">
                <h2 style={h2S}>Credit Card Avalanche: Why It Matters Most for Cards</h2>
                <p style={pS}>Credit card avalanche delivers the biggest savings of any avalanche application because Indian credit card revolving rates typically run 36% to 42% annually, far above personal loans, car loans, or education loans.</p>
                <p style={pS}>If you are carrying a balance on more than one card, run them through the <Link href="/calculators/credit-card-emi-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Credit Card EMI Calculator</Link> first to see what each card costs you on its own, or check standard installment rates with our <Link href="/calculators/personal-loan-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Personal Loan Calculator</Link>.</p>
                <p style={pS}>In practice, every card you hold should sit above almost any other debt type in the avalanche order, since few other consumer loans in India charge a comparable rate.</p>
              </div>

              <div style={secS} id="extra-payment-impact">
                <h2 style={h2S}>How Extra Payment Changes Your Payoff</h2>
                <p style={pS}>The extra amount you add each month has a large, non-linear effect on both total interest and time to debt-free. Small increases compound into big differences.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>Rs 4.3 lakh across three debts (36%, 14%, 9%), avalanche order. Independently simulated month by month.</caption>
                    <thead><tr>
                      <th scope="col" style={thS}>Extra Monthly Payment</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Months to Debt-Free</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Total Interest Paid</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ['Rs 5,000', '32 months', 'Rs 88,347'],
                        ['Rs 10,000', '24 months', 'Rs 62,488'],
                        ['Rs 15,000', '19 months', 'Rs 47,553'],
                        ['Rs 20,000', '16 months', 'Rs 40,064'],
                        ['Rs 25,000', '14 months', 'Rs 35,899'],
                      ].map((row, i) => (
                        <tr key={row[0]} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdR, fontWeight: 600 }}>{row[0]}</td>
                          <td style={{ ...tdL, textAlign: 'right' as const }}>{row[1]}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={pS}>Doubling the extra payment from Rs 5,000 to Rs 10,000 cuts total interest by nearly Rs 26,000 and payoff time by 8 months. Past a point, each further increase saves less in percentage terms, since less interest is left to avoid.</p>
              </div>

              <div style={secS} id="minimum-payment-trap">
                <h2 style={h2S}>The Minimum Payment Trap</h2>
                <p style={pS}>A minimum payment that does not cover a month&apos;s interest is not slow progress, it is negative progress: the balance grows even though a payment was made.</p>
                <p style={pS}>A Rs 1 lakh balance at 42% charges about Rs 3,500 of interest every month. A Rs 2,000 minimum payment does not even cover that interest, so the balance rises by roughly Rs 1,500 a month with no extra spending at all.</p>
                <p style={pS}>This calculator checks every debt for exactly this condition and flags any account that will never reach zero at its current minimum payment, so it cannot hide inside a longer multi-debt plan.</p>
              </div>

              <div style={secS} id="common-mistakes">
                <h2 style={h2S}>Common Debt Avalanche Mistakes</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Splitting the extra budget:</strong> Spreading spare money across multiple debts instead of concentrating it on the top-rate debt slows the whole plan down and increases total interest paid.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Forgetting to roll payments forward:</strong> Once a debt is cleared, its entire payment, not just the leftover extra, must move to the next debt. Leaving that money unallocated wastes months of progress.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Ignoring a minimum payment that does not cover interest:</strong> If a balance grows every month under its minimum payment, no amount of avalanche discipline on other debts will fix that account. It needs direct attention or a higher minimum.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Taking on new high-rate debt mid-plan:</strong> A new credit card balance opened during a payoff plan resets the avalanche order and usually becomes the new top priority, delaying everything already in progress.</li>
                </ol>
              </div>

              <div style={secS} id="excel-vs-calculator">
                <h2 style={h2S}>Debt Avalanche Calculator vs Excel</h2>
                <p style={pS}>A debt avalanche calculator in Excel typically needs a separate amortization block for every debt, plus manual logic to re-rank balances and redirect freed-up payments as each debt closes out.</p>
                <p style={pS}>That works, but it breaks the moment a rate changes or a new debt is added mid-sheet. This calculator runs the identical simulation logic automatically in the browser and updates instantly when you edit any balance, rate, or payment, with no formulas to maintain. Compare long-term home loan schedules with our <Link href="/calculators/home-loan-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Home Loan Calculator</Link> to see how debt payoff order impacts overall family net worth.</p>
              </div>

              <div style={{ margin: '28px 0 32px', background: C.paleLime, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: C.dark, margin: '0 0 4px', fontFamily: INTER }}>Considering one lower-rate loan instead?</p>
                  <p style={{ fontSize: 13, color: C.ink2, margin: 0, fontFamily: INTER }}>Compare avalanche against consolidating everything into a single EMI.</p>
                </div>
                <Link className="fx-btn" href="/calculators/debt-consolidation-calculator" target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 13, fontWeight: 700, background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', padding: '10px 20px', borderRadius: 8, textDecoration: 'none', fontFamily: INTER, whiteSpace: 'nowrap' }}>
                  Open calculator
                </Link>
              </div>

              <div style={secS} id="limitations">
                <h2 style={h2S}>Limitations of This Calculator</h2>
                <p style={pS}><strong>Interest rates are held constant.</strong> A floating-rate loan or a promotional card rate that expires mid-plan will change your real numbers partway through.</p>
                <p style={pS}><strong>Minimum payments are fixed rupee amounts.</strong> Many Indian credit cards set the minimum as a percentage of the outstanding balance, so it falls as the balance falls; this simulation keeps whatever fixed value you enter.</p>
                <p style={pS}><strong>No fees or charges are modelled.</strong> Late fees, annual card fees and any prepayment charges on fixed-rate loans are not included in total interest paid.</p>
                <p style={pS}><strong>Extra budget is assumed constant every month.</strong> A one-time bonus payment or a month where the extra budget drops to zero will shift the real payoff date from what is shown here.</p>
              </div>

              <div style={secS} id="how-to-use">
                <h2 style={h2S}>How to Use This Debt Avalanche Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Add your debts:</strong> Enter the name, outstanding balance, annual interest rate, and minimum monthly payment for each debt you owe, up to six at a time.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Set your extra budget:</strong> Under "More settings", enter how much extra you can put toward debt every month beyond the combined minimums.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Review the payoff order:</strong> See which debt clears first, the month each one finishes, total months to debt-free, and total interest paid.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Open the payoff schedule:</strong> Expand Payoff Schedule to watch each debt shrink over time, with the highest-rate debt clearing first, alongside the per-debt breakdown table.</li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQ items={faqs} />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All calculations on this page are indicative only, based on the balances, rates, and payments you enter. Actual payoff timelines depend on exact billing cycles, fee structures, and any rate changes your lenders apply. This calculator is for educational and planning purposes only and does not constitute financial advice. Consult a SEBI-registered investment adviser or a licensed credit counsellor before making debt repayment decisions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.debt-avalanche-sidebar::-webkit-scrollbar{width:5px}.debt-avalanche-sidebar::-webkit-scrollbar-track{background:transparent}.debt-avalanche-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.debt-avalanche-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside
            aria-label="Related calculators"
            className="debt-avalanche-sidebar"
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
            <AvalancheQuickFacts />
            <SidebarList title="Popular Calculators" items={POPULAR} />
            <SidebarList title="More Calculators" items={MORE} />
          </aside>
        </div>
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

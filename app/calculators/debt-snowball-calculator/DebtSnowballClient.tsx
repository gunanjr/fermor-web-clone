'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect, useId } from 'react';
import Link from 'next/link';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
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
const MAX_MONTHS = 600; // 50-year simulation cap
const MAX_DEBTS = 6;

/* ── Types ─────────────────────────────────────────────── */
interface Debt {
  id: string;
  name: string;
  balance: number;
  rate: number;
  minPayment: number;
}

type Method = 'snowball' | 'avalanche' | 'minimum';

interface DebtResult {
  id: string;
  name: string;
  rate: number;
  minPayment: number;
  startingBalance: number;
  payoffMonth: number | null; // null = not cleared within the cap
  interestPaid: number;
}

interface YearRow {
  year: number;      // plan year, 1-based
  month: number;     // plan month at this snapshot
  paid: number;
  interest: number;
  remaining: number;
  cleared: string[];
}

interface MonthPoint {
  month: number;     // 0 = today, before any payment
  byDebt: number[];  // remaining balance per debt, in payoff-priority order
}

interface SimResult {
  debts: DebtResult[];
  totalMonths: number;
  capped: boolean;
  totalInterest: number;
  totalPaid: number;
  totalPrincipal: number;
  budget: number;
  firstCleared: number | null;
  years: YearRow[];
  points: MonthPoint[];
}

/* ── Simulation ────────────────────────────────────────── */
// Snowball: smallest balance first (equal balances: higher rate first).
// Avalanche: highest rate first (equal rates: smaller balance first).
function sortDebts(debts: Debt[], method: Method) {
  const valid = debts.filter(d => d.balance > 0).map((d, idx) => ({ d, idx }));
  valid.sort((a, b) => method === 'avalanche'
    ? b.d.rate - a.d.rate || a.d.balance - b.d.balance || a.idx - b.idx
    : a.d.balance - b.d.balance || b.d.rate - a.d.rate || a.idx - b.idx);
  return valid.map(v => v.d);
}

// Every month: interest accrues on each open debt, every open debt gets its minimum,
// and whatever is left of the fixed monthly budget (all minimums + extra) goes to the
// priority debts in order. Freed minimums roll forward the same month a debt clears.
// 'minimum' is the baseline: each debt pays only its own minimum, nothing rolls over.
function simulateDebts(debts: Debt[], extraMonthly: number, method: Method): SimResult {
  const list = sortDebts(debts, method);
  const rollover = method !== 'minimum';
  const bal = list.map(d => d.balance);
  const interestPaid = list.map(() => 0);
  const payoff: (number | null)[] = list.map(() => null);
  const budget = list.reduce((s, d) => s + d.minPayment, 0) + (rollover ? extraMonthly : 0);
  const years: YearRow[] = [];
  const points: MonthPoint[] = [{ month: 0, byDebt: [...bal] }];
  let yr = { paid: 0, interest: 0, cleared: [] as string[] };
  let month = 0, totalInterest = 0, totalPaid = 0;

  while (bal.some(b => b > 0.01) && month < MAX_MONTHS) {
    month++;
    list.forEach((d, i) => {
      if (bal[i] > 0.01) {
        const interest = bal[i] * d.rate / 12 / 100;
        bal[i] += interest;
        interestPaid[i] += interest;
        totalInterest += interest;
        yr.interest += interest;
      }
    });

    let spent = 0;
    list.forEach((d, i) => {
      if (bal[i] > 0.01) {
        const pay = Math.min(d.minPayment, bal[i]);
        bal[i] -= pay;
        spent += pay;
      }
    });

    let pool = rollover ? Math.max(0, budget - spent) : 0;
    for (let i = 0; i < list.length && pool > 0.001; i++) {
      if (bal[i] > 0.01) {
        const pay = Math.min(pool, bal[i]);
        bal[i] -= pay;
        pool -= pay;
        spent += pay;
      }
    }
    totalPaid += spent;
    yr.paid += spent;

    list.forEach((d, i) => {
      if (bal[i] <= 0.01 && payoff[i] === null) {
        bal[i] = 0;
        payoff[i] = month;
        yr.cleared.push(d.name || 'Debt');
      }
    });

    points.push({ month, byDebt: bal.map(b => Math.max(0, b)) });
    const done = !bal.some(b => b > 0.01);
    if (month % 12 === 0 || done || month === MAX_MONTHS) {
      years.push({ year: Math.ceil(month / 12), month, paid: yr.paid, interest: yr.interest, remaining: bal.reduce((s, b) => s + Math.max(0, b), 0), cleared: yr.cleared });
      yr = { paid: 0, interest: 0, cleared: [] };
    }
  }

  const cleared = payoff.filter((p): p is number => p !== null);
  return {
    debts: list.map((d, i) => ({
      id: d.id, name: d.name || 'Debt', rate: d.rate, minPayment: d.minPayment,
      startingBalance: d.balance, payoffMonth: payoff[i], interestPaid: Math.round(interestPaid[i]),
    })),
    totalMonths: month,
    capped: bal.some(b => b > 0.01),
    totalInterest: Math.round(totalInterest),
    totalPaid: Math.round(totalPaid),
    totalPrincipal: Math.round(list.reduce((s, d) => s + d.balance, 0)),
    budget,
    firstCleared: cleared.length ? Math.min(...cleared) : null,
    years,
    points,
  };
}

function fmtMonths(m: number) {
  const y = Math.floor(m / 12), r = m % 12;
  if (y === 0) return `${r} mo`;
  return r === 0 ? `${y} yr` : `${y} yr ${r} mo`;
}

/* ── Slider (input panel, no fill colors) ─────────────────────────── */
function Slider({ label, id: idProp, value, min, max, step, fmt, onChange, compact }: {
  label: string; id?: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void; compact?: boolean;
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
        <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 13.5 : 14, color: C.ink2, fontWeight: 400 }}>{label}</label>
        {editing ? (
          <input id={inputId} autoFocus value={raw} aria-label={`Enter ${label} value`}
            onChange={e => setRaw(e.target.value)} onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            style={{ fontSize: 14, fontWeight: 600, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 7, padding: compact ? '6px 10px' : '7px 12px', width: 120, outline: 'none', color: C.ink, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${fmt(value)}. Click to edit.`}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}
            style={{ fontSize: compact ? 13 : 14, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: compact ? '5px 12px' : '6px 14px', cursor: 'pointer', fontFamily: INTER, minWidth: compact ? 88 : 105, textAlign: 'center', transition: 'border-color 0.15s' }}>
            {fmt(value)}
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
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">{fmt(min)}</span>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">{fmt(max)}</span>
      </div>
    </div>
  );
}

/* ── Donut Chart (VPF geometry: one track + one overlay arc) ── */
function DonutChart({ principal, interest }: { principal: number; interest: number }) {
  const total = principal + interest;
  if (total === 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const pArc = (principal / total) * circ;
  const pPct = Math.round((principal / total) * 100);
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Total repayment split: principal ${pPct}%, interest ${100 - pPct}%`}
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

/* ── Stacked balance chart: what is left on each debt over time ── */
const DEBT_COLORS = ['#101214', '#2d9970', '#5edda2', '#a6dbc4', '#0b4a34', '#c4c9cd'];

function payoffStep(totalMonths: number) {
  return totalMonths <= 36 ? 1 : totalMonths <= 120 ? 3 : 12;
}

function PayoffChart({ points, names, mobile, fmt }: {
  points: MonthPoint[]; names: string[]; mobile: boolean; fmt: (n: number) => string;
}) {
  const lastMonth = points[points.length - 1]?.month ?? 0;
  const step = payoffStep(lastMonth);
  const bars = points.filter(p => p.month % step === 0 && p.byDebt.some(b => b > 0.5));
  if (bars.length === 0) return null;

  const W = mobile ? 400 : 800, H = 160, PADL = 4, PADB = 20;
  const maxBal = Math.max(...bars.map(p => p.byDebt.reduce((s, b) => s + b, 0)), 1);
  const slot = (W - PADL) / bars.length;
  const barW = Math.max(3, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;
  const labelEvery = Math.max(1, Math.ceil(bars.length / (mobile ? 6 : 12)));
  const label = (m: number) => m === 0 ? 'Now' : step === 1 ? `M${m}` : `Y${m / 12}`;
  const showLabel = (m: number, i: number) => step === 3 ? m % 12 === 0 : i % labelEvery === 0;

  return (
    <svg role="img" aria-label={`Remaining balance of each debt over ${lastMonth} months under the snowball plan`}
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
              <text x={x + barW / 2} y={H + 14} textAnchor="middle" style={{ fontSize: 9, fill: C.ink3, fontFamily: INTER }}>
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
function SnowballQuickFacts() {
  const rows = [
    { label: 'Payoff order',                    value: 'Smallest balance first' },
    { label: 'Optimizes for',                   value: 'Early wins, momentum' },
    { label: 'Monthly payment',                 value: 'Stays constant' },
    { label: 'Typical card rate (India)',       value: '30-45% a year' },
    { label: 'Debts supported',                 value: `Up to ${MAX_DEBTS}` },
    { label: 'Simulation cap',                  value: `${MAX_MONTHS / 12} years` },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', fontFamily: INTER, background: C.white, flexShrink: 0 }}>
      <div style={{ background: '#f4f5f6', padding: '12px 18px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink }}>Snowball Quick Facts</span>
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
  { id: 'what-is-debt-snowball',  label: 'What is the debt snowball' },
  { id: 'how-snowball-works',     label: 'How it works' },
  { id: 'snowball-formula',       label: 'Formula and calculation' },
  { id: 'worked-example',         label: 'Worked example' },
  { id: 'snowball-vs-avalanche',  label: 'Snowball vs avalanche' },
  { id: 'does-snowball-work',     label: 'Does it actually work' },
  { id: 'how-to-pay-off-debt',    label: 'How to pay off debt' },
  { id: 'credit-card-snowball',   label: 'Credit card debt payoff' },
  { id: 'extra-payment-impact',   label: 'Extra payment impact' },
  { id: 'debts-to-include',       label: 'Which debts to include' },
  { id: 'snowball-excel',         label: 'Excel and Google Sheets' },
  { id: 'credit-score-impact',    label: 'Effect on CIBIL score' },
  { id: 'common-mistakes',        label: 'Common mistakes' },
  { id: 'limitations',            label: 'Limitations' },
  { id: 'how-to-use',             label: 'How to use' },
  { id: 'faq',                    label: 'FAQs' },
];

function TableOfContents() {
  return (
    <nav aria-label="Table of contents" style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', margin: '0 0 44px', fontFamily: INTER, background: C.white }}>
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

/* ── Sidebar list ─────────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, flexShrink: 0 }}>
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
  { href: '/calculators/debt-avalanche-calculator',          label: 'Debt Avalanche Calculator' },
  { href: '/calculators/debt-consolidation-calculator',      label: 'Debt Consolidation Calculator' },
  { href: '/calculators/credit-card-interest-calculator',    label: 'Credit Card Interest Calculator' },
  { href: '/calculators/credit-card-emi-calculator',         label: 'Credit Card EMI Calculator' },
  { href: '/calculators/debt-to-income-ratio-calculator',    label: 'Debt-to-Income Ratio Calculator' },
  { href: '/calculators/loan-prepayment-calculator',         label: 'Loan Prepayment Calculator' },
  { href: '/calculators/emergency-fund-calculator',          label: 'Emergency Fund Calculator' },
];
const MORE = [
  { href: '/calculators/monthly-budget-calculator',          label: 'Monthly Budget Calculator' },
  { href: '/calculators/credit-utilization-calculator',      label: 'Credit Utilization Calculator' },
  { href: '/calculators/personal-loan-calculator',           label: 'Personal Loan Calculator' },
  { href: '/calculators/balance-transfer-savings-calculator', label: 'Balance Transfer Savings' },
  { href: '/calculators/net-worth-calculator',               label: 'Net Worth Calculator' },
];

/* ── FAQ (single-sourced via props from page.tsx) ────────── */
function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return <FAQBox items={items} />;
}

/* ── In-content promo bar (CALCULATOR_STANDARDS pattern) ── */
function PromoBar({ title, text, href }: { title: string; text: string; href: string }) {
  return (
    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 44, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>{title}</p>
        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>{text}</p>
      </div>
      <Link className="fx-btn" href={href} target="_blank" rel="noopener noreferrer"
        style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
    </div>
  );
}

/* ── Standard CA CTA (CLAUDE.md block) ──────────────────── */

let idCounter = 0;
function nextId() { idCounter += 1; return `debt-${Date.now()}-${idCounter}`; }

const DEFAULT_DEBTS: Debt[] = [
  { id: 'd1', name: 'Credit Card', balance: 45000, rate: 36, minPayment: 2250 },
  { id: 'd2', name: 'Bike Loan', balance: 70000, rate: 12, minPayment: 3300 },
  { id: 'd3', name: 'Personal Loan', balance: 180000, rate: 14, minPayment: 6200 },
  { id: 'd4', name: 'Car Loan', balance: 300000, rate: 9.5, minPayment: 7800 },
];

/* ════════════════════════════════════════════════════════ */
export default function DebtSnowballClient({ faqs }: { faqs: { q: string; a: string }[] }) {
  const defaultSettings = { debts: DEFAULT_DEBTS, extraMonthly: 5000 };
  const { settings, updateSettings } = useCalculatorSettings('debt-snowball', defaultSettings);
  const { debts, extraMonthly } = settings as { debts: Debt[]; extraMonthly: number };

  const [mobile, setMobile] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  useLayoutEffect(() => { const chk = () => setMobile(window.innerWidth < 1024); chk(); window.addEventListener('resize', chk); return () => window.removeEventListener('resize', chk); }, []);
  useEffect(() => { setStartDate(new Date()); }, []);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);
  const fmtSigned = (n: number) => Math.round(n) === 0 ? fmtC(0) : n < 0 ? `-${fmtC(Math.abs(n))}` : fmtC(n);

  const setDebts = (next: Debt[]) => updateSettings({ debts: next });
  const setExtraMonthly = (v: number) => updateSettings({ extraMonthly: v });
  const updateDebt = (id: string, patch: Partial<Debt>) => setDebts(debts.map(d => d.id === id ? { ...d, ...patch } : d));
  const addDebt = () => {
    if (debts.length >= MAX_DEBTS) return;
    setDebts([...debts, { id: nextId(), name: `Debt ${debts.length + 1}`, balance: 50000, rate: 18, minPayment: 2500 }]);
  };
  const removeDebt = (id: string) => {
    if (debts.length <= 1) return;
    setDebts(debts.filter(d => d.id !== id));
  };

  const sim = useMemo(() => simulateDebts(debts, extraMonthly, 'snowball'), [debts, extraMonthly]);
  const avalanche = useMemo(() => simulateDebts(debts, extraMonthly, 'avalanche'), [debts, extraMonthly]);
  const minimumOnly = useMemo(() => simulateDebts(debts, 0, 'minimum'), [debts]);

  const payoffOrder = sim.debts.filter(d => d.payoffMonth !== null);
  const stuck = sim.debts.filter(d => d.payoffMonth === null);
  const totalMinimums = sim.debts.reduce((s, d) => s + d.minPayment, 0);
  const principalPct = sim.totalPrincipal + sim.totalInterest > 0 ? Math.round((sim.totalPrincipal / (sim.totalPrincipal + sim.totalInterest)) * 100) : 0;
  const interestPct = 100 - principalPct;

  const monthLabel = (m: number) => {
    if (!startDate) return '';
    return new Date(startDate.getFullYear(), startDate.getMonth() + m, 1).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
  };
  const debtFreeValue = sim.capped ? `${MAX_MONTHS / 12}+ yr` : fmtMonths(sim.totalMonths);
  const interestSaved = minimumOnly.capped ? null : minimumOnly.totalInterest - sim.totalInterest;
  const vsAvalanche = sim.totalInterest - avalanche.totalInterest;
  const vsAvalancheLabel = sim.capped || avalanche.capped ? 'Not comparable' : vsAvalanche > 0 ? `${fmtC(vsAvalanche)} more` : vsAvalanche < 0 ? `${fmtC(-vsAvalanche)} less` : 'Same interest';

  const h2 = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const h3 = { fontSize: mobile ? 15 : 16, fontWeight: 700, color: C.ink, margin: '0 0 10px' } as React.CSSProperties;
  const p = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const li = { fontSize: 15, color: C.ink2, lineHeight: 1.75 } as React.CSSProperties;
  const olS = { margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12, listStyleType: 'decimal' } as React.CSSProperties;
  const ulS = { margin: '0 0 16px', paddingLeft: 20, listStyleType: 'disc' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } as React.CSSProperties;
  const thR = { ...thS, textAlign: 'right' as const };
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;
  const tdN = { ...tdR, textAlign: 'right' as const };
  const tdFirst = { ...tdL, fontWeight: 600, color: C.ink };
  const capS = { captionSide: 'bottom' as const, textAlign: 'left' as const, fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' };
  const tableS = { width: '100%', borderCollapse: 'collapse' as const, border: `1px solid ${C.border}`, fontSize: 13 };
  const linkS = { color: C.dark, fontWeight: 600 } as React.CSSProperties;
  const rowBg = (i: number) => ({ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' });
  const numInput = { fontSize: 13, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 6, padding: '6px 8px', outline: 'none', fontFamily: INTER, width: '100%' } as React.CSSProperties;
  const schedTh = { padding: '10px 14px', textAlign: 'right' as const, fontSize: 11, fontWeight: 700, color: C.ink, textTransform: 'uppercase' as const, letterSpacing: '0.06em', whiteSpace: 'nowrap' as const };
  const schedCap = { captionSide: 'bottom' as const, textAlign: 'left' as const, fontSize: 11.5, color: C.ink3, padding: mobile ? '8px 16px 16px' : '8px 44px 20px' };

  const methodRows = [
    { label: 'Snowball (this plan)', s: sim },
    { label: 'Avalanche, same budget', s: avalanche },
    { label: 'Minimums only', s: minimumOnly },
  ];

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>Debt Snowball Calculator</h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Add every debt you owe and get a snowball payoff plan: the order each debt clears, your debt-free date, total interest, and how the plan compares with the avalanche method.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <section aria-label="Debt Snowball Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>
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
                        {debts.map((debt, i) => {
                          const monthlyInterest = debt.balance * debt.rate / 12 / 100;
                          const belowInterest = debt.balance > 0 && debt.minPayment <= monthlyInterest;
                          return (
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
                                  <input type="number" min={0} value={debt.balance}
                                    onChange={e => updateDebt(debt.id, { balance: Math.max(0, parseFloat(e.target.value) || 0) })}
                                    aria-label={`${debt.name || 'Debt'} outstanding balance`} style={numInput} />
                                </label>
                                <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                  <span style={{ fontSize: 11, color: C.ink3 }}>Rate (% p.a.)</span>
                                  <input type="number" min={0} max={100} step={0.1} value={debt.rate}
                                    onChange={e => updateDebt(debt.id, { rate: Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)) })}
                                    aria-label={`${debt.name || 'Debt'} annual interest rate`} style={numInput} />
                                </label>
                                <label style={{ display: 'flex', flexDirection: 'column', gap: 4, gridColumn: '1 / -1' }}>
                                  <span style={{ fontSize: 11, color: C.ink3 }}>Minimum monthly payment or EMI</span>
                                  <input type="number" min={0} value={debt.minPayment}
                                    onChange={e => updateDebt(debt.id, { minPayment: Math.max(0, parseFloat(e.target.value) || 0) })}
                                    aria-label={`${debt.name || 'Debt'} minimum monthly payment`} style={numInput} />
                                </label>
                              </div>
                              {belowInterest && (
                                <p style={{ fontSize: 11.5, color: C.ink3, lineHeight: 1.55, margin: '8px 0 0' }}>
                                  This minimum does not cover the monthly interest of {fmtIN(monthlyInterest)}, so the balance grows until the snowball reaches it.
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                        {debts.length < MAX_DEBTS ? (
                          <button onClick={addDebt}
                            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.ink, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                            Add another debt
                          </button>
                        ) : <span style={{ fontSize: 12, color: C.ink3 }}>Up to {MAX_DEBTS} debts</span>}
                        <button onClick={() => setShowAdvanced(true)}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                          More settings
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Slider id="snowball-extra" label="Extra Monthly Payment" value={extraMonthly} min={0} max={100000} step={500}
                        fmt={fmtC} onChange={setExtraMonthly} compact={mobile} />

                      <div style={{ marginTop: 8, padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 24 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: C.ink, fontWeight: 700, marginBottom: 4 }}>
                          <span>Monthly debt budget</span>
                          <span>{fmtIN(sim.budget)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.ink2, marginBottom: 2 }}>
                          <span>Combined minimums</span>
                          <span>{fmtIN(totalMinimums)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.ink2 }}>
                          <span>Extra payment</span>
                          <span>{fmtIN(extraMonthly)}</span>
                        </div>
                      </div>

                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: '0 0 24px' }}>
                        This budget stays the same every month until you are debt-free. The extra amount goes to your smallest balance first, and each cleared debt&apos;s payment rolls onto the next one.
                      </p>
                      <button onClick={() => setShowAdvanced(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        Back
                      </button>
                    </>
                  )}
                </div>

                {/* ───── RESULTS PANEL ───── */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {sim.debts.length === 0 ? (
                    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.ink3}`, padding: 20, borderRadius: 12, width: '100%' }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: C.ink, marginBottom: 8 }}>No debts entered</div>
                      <div style={{ color: C.ink2, fontSize: 14, lineHeight: 1.5 }}>Add at least one debt with a balance above zero to see your snowball payoff plan.</div>
                    </div>
                  ) : (
                    <>
                      {/* Primary dark result box: two metrics */}
                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 8 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                          <div style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Debt-free in</div>
                          <div style={{ fontSize: 12, color: '#7A8087' }}>Total interest paid</div>
                        </div>
                        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                          <div aria-live="polite" aria-label={`Debt free in ${debtFreeValue}`} style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em', lineHeight: 1 }}>
                            {debtFreeValue}
                          </div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#101214', lineHeight: 1 }}>{sim.capped ? 'Budget too low' : fmtC(sim.totalInterest)}</div>
                        </div>
                      </div>

                      {sim.capped && (
                        <div style={{ width: '100%', background: C.white, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.ink3}`, padding: '14px 16px', borderRadius: 10, margin: '8px 0' }}>
                          <div style={{ fontWeight: 700, fontSize: 13.5, color: C.ink, marginBottom: 4 }}>This budget never clears every debt</div>
                          <div style={{ color: C.ink2, fontSize: 12.5, lineHeight: 1.5 }}>
                            Monthly interest is outrunning your total payments, so at least one balance is still open after {MAX_MONTHS / 12} years. Raise the extra payment or a minimum payment.
                          </div>
                        </div>
                      )}

                      {[
                        { label: 'Debt-free by', value: sim.capped ? 'Not within 50 years' : (monthLabel(sim.totalMonths) || fmtMonths(sim.totalMonths)) },
                        { label: 'Monthly payment, all debts', value: fmtIN(sim.budget) },
                        { label: 'Total amount paid', value: fmtC(sim.totalPaid) },
                        { label: 'Interest saved vs minimums only', value: sim.capped ? 'Not comparable' : interestSaved === null ? 'Minimums never clear' : fmtSigned(interestSaved) },
                        { label: 'Time saved vs minimums only', value: sim.capped ? 'Not comparable' : minimumOnly.capped ? 'Minimums never clear' : fmtMonths(Math.max(0, minimumOnly.totalMonths - sim.totalMonths)) },
                        { label: 'Interest vs avalanche', value: vsAvalancheLabel },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink, textAlign: 'right' }}>{value}</span>
                        </div>
                      ))}

                      {/* Payoff order */}
                      <div style={{ width: '100%', marginTop: 18 }}>
                        <p style={{ fontSize: 12, fontWeight: 700, color: C.ink3, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>Payoff order (smallest balance first)</p>
                        <ol style={{ display: 'flex', flexDirection: 'column', gap: 8, listStyle: 'none', margin: 0, padding: 0 }}>
                          {payoffOrder.map((d, i) => (
                            <li key={d.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 12px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                                <span aria-hidden="true" style={{ fontSize: 11, fontWeight: 700, color: '#101214', background: '#E9ECEE', border: '1px solid #D3D7DA', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
                                <span style={{ fontSize: 13, fontWeight: 600, color: C.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</span>
                                <span style={{ fontSize: 11, color: C.ink3, whiteSpace: 'nowrap' }}>{fmtC(d.startingBalance)}</span>
                              </div>
                              <span style={{ fontSize: 12, color: C.ink2, whiteSpace: 'nowrap' }}>
                                Month {d.payoffMonth}{!mobile && startDate ? ` · ${monthLabel(d.payoffMonth as number)}` : ''}
                              </span>
                            </li>
                          ))}
                          {stuck.map(d => (
                            <li key={d.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 12px' }}>
                              <span style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{d.name}</span>
                              <span style={{ fontSize: 12, color: C.ink3 }}>Not cleared</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Donut: top of panel on desktop, below stats on mobile */}
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                        <DonutChart principal={sim.totalPrincipal} interest={sim.totalInterest} />
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

                      <div style={{ width: '100%', marginTop: mobile ? 8 : 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 11.5, color: C.ink3 }}>Principal {principalPct}%</span>
                          <span style={{ fontSize: 11.5, color: C.ink3 }}>Interest {interestPct}%</span>
                        </div>
                        <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`Principal is ${principalPct}% of the total amount paid`}>
                          <div style={{ height: '100%', width: `${principalPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* ── Payoff schedule: chart + tables, inside the calculator card ── */}
              {sim.years.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowSchedule(v => !v)} aria-expanded={showSchedule} aria-controls="snowball-schedule-panel"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0, textAlign: 'left' }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Debt Repayment Schedule</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>Balance chart, method comparison and year-wise schedule</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {sim.years.length} yr · {sim.debts.length} debts
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showSchedule ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showSchedule && (
                    <div id="snowball-schedule-panel" style={{ borderTop: `1px solid ${C.border}` }}>
                      <style>{`@keyframes swipeHint { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }`}</style>

                      {/* Stacked balance chart */}
                      <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: mobile ? 'flex-start' : 'center', flexDirection: mobile ? 'column' : 'row', gap: 10, marginBottom: 14 }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>
                            Remaining balance {payoffStep(sim.totalMonths) === 1 ? 'by month' : payoffStep(sim.totalMonths) === 3 ? 'by quarter' : 'by year'}
                          </span>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px' }}>
                            {sim.debts.map((d, j) => (
                              <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <div style={{ width: 10, height: 10, borderRadius: 2, background: DEBT_COLORS[j % DEBT_COLORS.length] }} aria-hidden="true" />
                                <span style={{ fontSize: 11.5, color: C.ink2 }}>{d.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <PayoffChart points={sim.points} names={sim.debts.map(d => d.name)} mobile={mobile} fmt={fmtC} />
                        <p style={{ fontSize: 11.5, color: C.ink3, margin: '8px 0 20px', lineHeight: 1.6 }}>
                          Each bar stacks what you still owe on every debt. The smallest balance disappears first, then its payment rolls onto the next one.
                        </p>
                      </div>

                      {mobile && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '0 0 8px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                            style={{ animation: 'swipeHint 1.6s ease-in-out infinite' }}>
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                          <p style={{ fontSize: 11.5, color: C.ink3, margin: 0, fontFamily: INTER }}>Swipe to see all columns</p>
                        </div>
                      )}

                      {/* Method comparison */}
                      <div style={{ padding: mobile ? '0 16px 10px' : '0 44px 10px' }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>Snowball vs avalanche vs minimums only</span>
                      </div>
                      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
                        <table style={{ minWidth: 600, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={schedCap}>Same debts compared three ways. Avalanche uses the same monthly budget; minimums only pays each debt its own minimum with no extra and no rollover.</caption>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              <th scope="col" style={{ ...schedTh, textAlign: 'left', padding: `10px 14px 10px ${mobile ? 16 : 44}px` }}>Method</th>
                              <th scope="col" style={schedTh}>First Debt Cleared</th>
                              <th scope="col" style={schedTh}>Debt-Free In</th>
                              <th scope="col" style={schedTh}>Total Interest</th>
                              <th scope="col" style={{ ...schedTh, padding: `10px ${mobile ? 16 : 44}px 10px 14px` }}>Total Paid</th>
                            </tr>
                          </thead>
                          <tbody>
                            {methodRows.map(({ label, s }, i) => (
                              <tr key={label} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <th scope="row" style={{ padding: `11px 14px 11px ${mobile ? 16 : 44}px`, textAlign: 'left', fontWeight: 600, color: C.ink }}>{label}</th>
                                <td style={{ padding: '11px 14px', textAlign: 'right', color: C.ink2 }}>{s.firstCleared ? `Month ${s.firstCleared}` : 'None'}</td>
                                <td style={{ padding: '11px 14px', textAlign: 'right', color: C.ink2 }}>{s.capped ? `${MAX_MONTHS / 12}+ yr` : fmtMonths(s.totalMonths)}</td>
                                <td style={{ padding: '11px 14px', textAlign: 'right', fontWeight: 700, color: C.ink }}>{s.capped ? 'Never clears' : fmtC(s.totalInterest)}</td>
                                <td style={{ padding: `11px ${mobile ? 16 : 44}px 11px 14px`, textAlign: 'right', color: C.ink2 }}>{s.capped ? 'Never clears' : fmtC(s.totalPaid)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Per-debt breakdown */}
                      <div style={{ padding: mobile ? '20px 16px 10px' : '20px 44px 10px', borderTop: `1px solid ${C.border}` }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>Per-debt payoff breakdown</span>
                      </div>
                      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
                        <table style={{ minWidth: 640, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={schedCap}>Every debt in snowball order, with the month it clears and the interest it costs over the plan.</caption>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              <th scope="col" style={{ ...schedTh, textAlign: 'left', padding: `10px 14px 10px ${mobile ? 16 : 44}px` }}>Debt</th>
                              <th scope="col" style={schedTh}>Balance</th>
                              <th scope="col" style={schedTh}>Rate</th>
                              <th scope="col" style={schedTh}>Minimum</th>
                              <th scope="col" style={schedTh}>Cleared In</th>
                              <th scope="col" style={{ ...schedTh, padding: `10px ${mobile ? 16 : 44}px 10px 14px` }}>Interest Paid</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sim.debts.map((d, i) => (
                              <tr key={d.id} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <th scope="row" style={{ padding: `11px 14px 11px ${mobile ? 16 : 44}px`, textAlign: 'left', fontWeight: 600, color: C.ink }}>{i + 1}. {d.name}</th>
                                <td style={{ padding: '11px 14px', textAlign: 'right', color: C.ink2 }}>{fmtC(d.startingBalance)}</td>
                                <td style={{ padding: '11px 14px', textAlign: 'right', color: C.ink2 }}>{d.rate}%</td>
                                <td style={{ padding: '11px 14px', textAlign: 'right', color: C.ink2 }}>{fmtIN(d.minPayment)}</td>
                                <td style={{ padding: '11px 14px', textAlign: 'right', color: C.ink2 }}>{d.payoffMonth ? `Month ${d.payoffMonth}` : 'Not cleared'}</td>
                                <td style={{ padding: `11px ${mobile ? 16 : 44}px 11px 14px`, textAlign: 'right', fontWeight: 700, color: C.ink }}>{fmtC(d.interestPaid)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Year-by-year schedule */}
                      <div style={{ padding: mobile ? '20px 16px 10px' : '20px 44px 10px', borderTop: `1px solid ${C.border}` }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>Year-by-year repayment schedule</span>
                      </div>
                      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
                        <table style={{ minWidth: 680, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={schedCap}>What you pay each plan year, how much of it is interest, and the total balance left at year end.</caption>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              <th scope="col" style={{ ...schedTh, textAlign: 'left', padding: `10px 14px 10px ${mobile ? 16 : 44}px` }}>Year</th>
                              <th scope="col" style={schedTh}>Paid</th>
                              <th scope="col" style={schedTh}>Interest</th>
                              <th scope="col" style={schedTh}>Principal</th>
                              <th scope="col" style={schedTh}>Balance Left</th>
                              <th scope="col" style={{ ...schedTh, textAlign: 'left', padding: `10px ${mobile ? 16 : 44}px 10px 14px` }}>Debts Cleared</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sim.years.map((row, i) => (
                              <tr key={row.month} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <th scope="row" style={{ padding: `11px 14px 11px ${mobile ? 16 : 44}px`, textAlign: 'left', fontWeight: 600, color: C.ink, whiteSpace: 'nowrap' }}>
                                  Year {row.year}{row.month % 12 !== 0 && <span style={{ color: C.ink3, fontWeight: 400 }}> (to month {row.month})</span>}
                                </th>
                                <td style={{ padding: '11px 14px', textAlign: 'right', color: C.ink2 }}>{fmtC(row.paid)}</td>
                                <td style={{ padding: '11px 14px', textAlign: 'right', color: C.ink2 }}>{fmtC(row.interest)}</td>
                                <td style={{ padding: '11px 14px', textAlign: 'right', color: C.ink2 }}>{fmtSigned(row.paid - row.interest)}</td>
                                <td style={{ padding: '11px 14px', textAlign: 'right', fontWeight: 700, color: C.ink }}>{fmtC(row.remaining)}</td>
                                <td style={{ padding: `11px ${mobile ? 16 : 44}px 11px 14px`, textAlign: 'left', color: C.ink2 }}>{row.cleared.length ? row.cleared.join(', ') : 'None'}</td>
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

              <div style={sec} id="what-is-debt-snowball">
                <h2 style={h2}>What Is the Debt Snowball Method?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    The debt snowball method is a repayment plan where you pay the minimum on every debt and put all spare money on the smallest balance first. When that debt is gone, its payment rolls onto the next smallest.
                  </p>
                </div>
                <p style={p}>Interest rates do not decide the order. Balance size does. That is the whole idea behind &quot;pay smallest debt first&quot;: clear whole accounts quickly so you can see the plan working.</p>
                <p style={p}>Each payoff frees up a minimum payment, and that money joins the attack on the next debt. The payment grows like a snowball rolling downhill, which is where the name comes from.</p>
                <p style={p}>American author Dave Ramsey made the term famous through his books and radio show. The underlying habit of ordering debts and redirecting freed payments is older than the label.</p>
              </div>

              <div style={sec} id="how-snowball-works">
                <h2 style={h2}>How Does the Debt Snowball Method Work?</h2>
                <p style={p}>The debt snowball method works by fixing one monthly debt budget and pointing every spare rupee at a single target debt. The same five steps repeat until the last balance hits zero.</p>
                <ol style={olS}>
                  <li style={li}><strong style={{ color: C.ink }}>List every debt:</strong> Write down each credit card, loan and EMI with its outstanding balance, interest rate and minimum payment.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Sort by balance:</strong> Order the list from the smallest balance to the largest. Ignore the interest rate for ordering.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Pay every minimum:</strong> Keep every account current so nothing goes overdue or attracts late fees.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Attack the smallest:</strong> Send all extra money to the smallest balance on top of its minimum.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Roll the payment:</strong> When a debt clears, add its full payment to the next smallest debt. Your total monthly outgo never drops.</li>
                </ol>
                <p style={p}>That last step is the one people skip. If the freed EMI gets absorbed into everyday spending, the snowball stops growing and the plan slows to the pace of minimum payments.</p>
              </div>

              <div style={sec} id="snowball-formula">
                <h2 style={h2}>Debt Snowball Formula and Calculation</h2>
                <p style={p}>There is no single closed-form debt snowball formula, because the target debt changes every time one is paid off. The calculation runs as a month-by-month simulation using four rules.</p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16, overflowX: 'auto' }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark, lineHeight: 1.9, whiteSpace: 'pre' }}>
                    {'Monthly Budget = Sum of all minimums + Extra payment\n'}
                    {'Interest (each debt) = Balance × Annual rate / 12 / 100\n'}
                    {'Snowball Pool = Monthly Budget − Minimums actually paid\n'}
                    {'Target payment = min(Snowball Pool, Target balance)'}
                  </code>
                </div>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={tableS}>
                    <caption style={capS}>Variables used in the monthly snowball calculation.</caption>
                    <thead><tr><th style={thS} scope="col">Variable</th><th style={thS} scope="col">Meaning</th></tr></thead>
                    <tbody>
                      {[
                        ['Monthly Budget', 'Your fixed monthly debt outgo. It does not fall when a debt is cleared.'],
                        ['Minimum payment', 'The EMI or card minimum amount due on each open debt.'],
                        ['Snowball Pool', 'Budget left after minimums. It goes to the smallest open balance first.'],
                        ['Target balance', 'The smallest balance still open. Any pool left over after clearing it moves to the next one the same month.'],
                      ].map((r, i) => (
                        <tr key={r[0]} style={rowBg(i)}>
                          <td style={tdFirst}>{r[0]}</td>
                          <td style={tdL}>{r[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>Each month, interest is added to every open balance first. Then every minimum is paid, and the snowball pool goes to the target debt.</p>
                <p style={p}>Interest here uses a simple monthly rate: 36% a year becomes 3% a month. Banks usually compute card interest daily, so a statement can differ slightly from the simulation.</p>
              </div>

              <div style={sec} id="worked-example">
                <h2 style={h2}>Worked Example: A Debt Snowball Payoff Plan</h2>
                <p style={p}>This worked example uses the calculator&apos;s default debts: four balances totalling Rs 5.95 lakh, combined minimums of Rs 19,550, and Rs 5,000 extra a month. The monthly budget is Rs 24,550.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={tableS}>
                    <caption style={capS}>Snowball phases for the default debts, simulated month by month with the calculator&apos;s own engine.</caption>
                    <thead><tr>
                      <th style={thS} scope="col">Phase</th>
                      <th style={thS} scope="col">Target Debt</th>
                      <th style={thR} scope="col">Payment on Target</th>
                      <th style={thR} scope="col">Cleared In</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ['1', 'Credit Card: Rs 45,000 at 36%', 'Rs 7,250 (Rs 2,250 + Rs 5,000 extra)', 'Month 7'],
                        ['2', 'Bike Loan: Rs 70,000 at 12%', 'Rs 10,550 (Rs 3,300 + Rs 7,250 rolled)', 'Month 12'],
                        ['3', 'Personal Loan: Rs 1,80,000 at 14%', 'Rs 16,750 (Rs 6,200 + Rs 10,550 rolled)', 'Month 21'],
                        ['4', 'Car Loan: Rs 3,00,000 at 9.5%', 'Rs 24,550 (full budget)', 'Month 28'],
                      ].map((r, i) => (
                        <tr key={r[0]} style={rowBg(i)}>
                          <td style={tdFirst}>{r[0]}</td>
                          <td style={tdL}>{r[1]}</td>
                          <td style={tdN}>{r[2]}</td>
                          <td style={tdN}>{r[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>The card clears in month 7, so the first win arrives within a year. By the final phase, the car loan gets the entire Rs 24,550, more than three times its own EMI.</p>
                <p style={p}>Total interest across the plan is Rs 85,452 and the total paid is Rs 6,80,452. Principal makes up 87% of everything paid, which is the split the donut chart shows.</p>
                <h3 style={h3}>Year-by-year debt repayment schedule</h3>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={tableS}>
                    <caption style={capS}>Default debts, Rs 24,550 a month. Year 3 covers months 25 to 28.</caption>
                    <thead><tr>
                      <th style={thS} scope="col">Year</th>
                      <th style={thR} scope="col">Paid</th>
                      <th style={thR} scope="col">Interest</th>
                      <th style={thR} scope="col">Principal</th>
                      <th style={thR} scope="col">Balance Left</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ['Year 1', 'Rs 2,94,600', 'Rs 58,930', 'Rs 2,35,670', 'Rs 3,59,330'],
                        ['Year 2', 'Rs 2,94,600', 'Rs 24,825', 'Rs 2,69,775', 'Rs 89,555'],
                        ['Year 3', 'Rs 91,252', 'Rs 1,697', 'Rs 89,555', 'Rs 0'],
                      ].map((r, i) => (
                        <tr key={r[0]} style={rowBg(i)}>
                          <td style={tdFirst}>{r[0]}</td>
                          <td style={tdN}>{r[1]}</td>
                          <td style={tdN}>{r[2]}</td>
                          <td style={tdN}>{r[3]}</td>
                          <td style={tdN}>{r[4]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>Interest falls from Rs 58,930 in year one to Rs 24,825 in year two because the high-rate card and two smaller loans are already gone. Open the Debt Repayment Schedule above to see the same table for your own debts.</p>
              </div>

              <div style={sec} id="snowball-vs-avalanche">
                <h2 style={h2}>Debt Snowball vs Avalanche: Which Saves More?</h2>
                <p style={p}>The avalanche method always costs the same or less in interest, because it targets the highest rate first. The snowball clears its first account sooner. How big the gap is depends on your debts.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={tableS}>
                    <caption style={capS}>Factor-by-factor comparison of the two most common debt payoff strategies.</caption>
                    <thead><tr>
                      <th style={thS} scope="col">Factor</th>
                      <th style={thS} scope="col">Debt Snowball</th>
                      <th style={thS} scope="col">Debt Avalanche</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ['Payoff order', 'Smallest balance first', 'Highest interest rate first'],
                        ['Total interest', 'Same or higher', 'Lowest of any fixed order'],
                        ['First account cleared', 'Usually sooner', 'Can take much longer'],
                        ['Months to debt-free', 'Usually the same or within a month', 'Usually the same or within a month'],
                        ['Works best for', 'People who need visible progress to stay on track', 'People who stay disciplined without quick wins'],
                      ].map((r, i) => (
                        <tr key={r[0]} style={rowBg(i)}>
                          <td style={tdFirst}>{r[0]}</td>
                          <td style={tdL}>{r[1]}</td>
                          <td style={tdL}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <h3 style={h3}>Three real scenarios, simulated</h3>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={tableS}>
                    <caption style={capS}>Snowball vs avalanche on the same budget. All figures simulated month by month with this calculator&apos;s engine.</caption>
                    <thead><tr>
                      <th style={thS} scope="col">Scenario</th>
                      <th style={thR} scope="col">Snowball Interest</th>
                      <th style={thR} scope="col">Avalanche Interest</th>
                      <th style={thR} scope="col">First Debt Cleared</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ['Default four debts, Rs 5,000 extra', 'Rs 85,452', 'Rs 84,910', 'Month 7 vs 7'],
                        ['Rs 2 lakh card at 40% plus two small loans, Rs 8,000 extra', 'Rs 83,444', 'Rs 63,655', 'Month 5 vs 15'],
                        ['Smallest balance is also the highest rate', 'Rs 89,769', 'Rs 89,769', 'Month 6 vs 6'],
                      ].map((r, i) => (
                        <tr key={r[0]} style={rowBg(i)}>
                          <td style={tdFirst}>{r[0]}</td>
                          <td style={tdN}>{r[1]}</td>
                          <td style={tdN}>{r[2]}</td>
                          <td style={tdN}>{r[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>On the default debts, snowball costs just Rs 542 more and both finish in 28 months. The card is both the smallest and the costliest debt, so the two orders barely differ.</p>
                <p style={p}>The second scenario is where the choice matters. A Rs 2 lakh card at 40% sits last in snowball order behind a Rs 40,000 education loan and a Rs 60,000 bike loan.</p>
                <p style={p}>Snowball clears the education loan in month 5 but pays Rs 19,789 more interest overall. Avalanche waits until month 15 for its first payoff. Both plans finish within a month of each other.</p>
                <p style={p}>When the smallest debt also carries the highest rate, the two methods produce the identical plan. The calculator shows this gap for your own debts in the &quot;Interest vs avalanche&quot; row.</p>
              </div>

              <PromoBar title="Debt Avalanche Calculator" text="Run the same debts highest-rate-first and see the full avalanche schedule." href="/calculators/debt-avalanche-calculator" />

              <div style={sec} id="does-snowball-work">
                <h2 style={h2}>Does the Debt Snowball Actually Work?</h2>
                <p style={p}>Yes, for many people it does, and there is research behind the psychology. The method trades a little interest for a lot of follow-through.</p>
                <p style={p}>A study by David Gal and Blakeley McShane in the <a href="https://journals.sagepub.com/doi/abs/10.1509/jmr.11.0272" target="_blank" rel="noopener noreferrer" style={linkS}>Journal of Marketing Research (2012)</a> used data from a debt settlement firm.</p>
                <p style={p}>It found that closing individual debt accounts predicted eliminating debt overall, regardless of how large the closed balances were. Completing small, discrete tasks appears to keep people going.</p>
                <p style={p}>That is the snowball&apos;s real edge. A plan that saves Rs 5,000 on paper but gets abandoned in month six costs far more than a plan you finish.</p>
              </div>

              <div style={sec} id="how-to-pay-off-debt">
                <h2 style={h2}>How to Pay Off Debt: A 7-Step Snowball Plan</h2>
                <p style={p}>To pay off debt with the snowball method, fix a monthly debt budget, clear the smallest balance first and roll every freed payment forward. These seven steps turn that into a plan you can run.</p>
                <ol style={olS}>
                  <li style={li}><strong style={{ color: C.ink }}>Collect current statements:</strong> Use the latest card statements and loan account summaries for exact balances, rates and EMIs. Do not guess.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Stop adding new debt:</strong> Pause card spending and buy now, pay later purchases while the plan runs. New debt resets the order.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Keep a starter buffer:</strong> Hold a small cash reserve so a repair bill does not go back on a card.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Find your extra amount:</strong> Decide what you can add above the minimums every month and treat it as a fixed bill.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Order and attack:</strong> Sort smallest to largest, pay every minimum, and send the extra to the smallest balance.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Automate the minimums:</strong> Set up auto-debit for every EMI and card minimum so a missed payment never undoes your progress.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Roll and review:</strong> After each payoff, add the freed payment to the next target. Re-enter balances here every three months.</li>
                </ol>
                <p style={p}>For step 3, the <Link href="/calculators/emergency-fund-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Emergency Fund Calculator</Link> shows how large a buffer your monthly expenses call for.</p>
                <p style={p}>For step 4, map income and spending in the <Link href="/calculators/monthly-budget-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Monthly Budget Calculator</Link> to find a realistic extra amount rather than an optimistic one.</p>
                <p style={p}>If your EMIs already take up half your income, check the <Link href="/calculators/debt-to-income-ratio-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Debt-to-Income Ratio Calculator</Link> first. At that level, restructuring may need to come before an aggressive snowball.</p>
              </div>

              <div style={sec} id="credit-card-snowball">
                <h2 style={h2}>How to Pay Off Credit Card Debt with the Snowball</h2>
                <p style={p}>To pay off credit card debt with the snowball method, list every card by outstanding balance, pay each card&apos;s minimum amount due, and put all extra money on the smallest balance.</p>
                <p style={p}>Card debt is where this matters most. Indian card finance charges typically run 2.5% to 3.75% a month, roughly 30% to 45% a year, far above most loans.</p>
                <p style={p}>Carrying a balance past the due date also costs you the interest-free period. Most issuers then charge interest on new purchases from the transaction date, so revolving even a small amount gets expensive.</p>
                <h3 style={h3}>Three cards, one snowball</h3>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={tableS}>
                    <caption style={capS}>Cards of Rs 25,000 at 42%, Rs 60,000 at 36% and Rs 1,10,000 at 39%, with minimums of Rs 1,250, Rs 3,000 and Rs 5,500.</caption>
                    <thead><tr>
                      <th style={thS} scope="col">Plan</th>
                      <th style={thR} scope="col">Debt-Free In</th>
                      <th style={thR} scope="col">Total Interest</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ['Minimums only, no rollover', '35 months', 'Rs 1,22,291'],
                        ['Snowball with Rs 5,000 extra', '18 months', 'Rs 62,527'],
                        ['Avalanche with Rs 5,000 extra', '18 months', 'Rs 61,484'],
                      ].map((r, i) => (
                        <tr key={r[0]} style={rowBg(i)}>
                          <td style={tdFirst}>{r[0]}</td>
                          <td style={tdN}>{r[1]}</td>
                          <td style={tdN}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>The snowball roughly halves the interest bill against paying minimums only and clears the smallest card in month 5. Because card rates sit close together, avalanche saves just Rs 1,043 more.</p>
                <h3 style={h3}>What RBI rules say about card minimums</h3>
                <p style={p}>Under the RBI&apos;s <a href="https://rbidocs.rbi.org.in/rdocs/notification/PDFs/92MDCREDITDEBITCARDC423AFFB5E7945149C95CDD2F71E9158.PDF" target="_blank" rel="noopener noreferrer" style={linkS}>Credit Card and Debit Card Directions, 2022</a>, the minimum amount due must be set so it does not cause negative amortization.</p>
                <p style={p}>The same directions bar issuers from capitalising unpaid charges, levies and taxes for charging interest. Issuers must also explain what paying only the minimum amount due means for you.</p>
                <p style={p}>A card minimum keeps the account current, but it moves the balance slowly. To see the cost of paying only the minimum on one card, use the <Link href="/calculators/credit-card-interest-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Credit Card Interest Calculator</Link>.</p>
                <p style={p}>If a single large card balance is converted into an EMI, enter that EMI as the minimum here. The <Link href="/calculators/credit-card-emi-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Credit Card EMI Calculator</Link> shows what a conversion costs, including processing fees.</p>
              </div>

              <div style={sec} id="extra-payment-impact">
                <h2 style={h2}>How Extra Payment Changes Your Debt-Free Date</h2>
                <p style={p}>Every rupee of extra payment shortens your payoff time, and the first few thousand rupees move the date the most. The table runs the default four debts at different extra amounts.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={tableS}>
                    <caption style={capS}>Default debts: Rs 5.95 lakh across four balances, Rs 19,550 combined minimums. Simulated month by month.</caption>
                    <thead><tr>
                      <th style={thS} scope="col">Extra per Month</th>
                      <th style={thR} scope="col">Monthly Budget</th>
                      <th style={thR} scope="col">Debt-Free In</th>
                      <th style={thR} scope="col">First Debt Cleared</th>
                      <th style={thR} scope="col">Total Interest</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ['Minimums only, no rollover', 'Rs 19,550', '47 months', 'Month 24', 'Rs 1,34,054'],
                        ['Rs 0, with rollover', 'Rs 19,550', '37 months', 'Month 24', 'Rs 1,27,716'],
                        ['Rs 2,500', 'Rs 22,050', '32 months', 'Month 12', 'Rs 99,690'],
                        ['Rs 5,000', 'Rs 24,550', '28 months', 'Month 7', 'Rs 85,452'],
                        ['Rs 10,000', 'Rs 29,550', '23 months', 'Month 4', 'Rs 67,790'],
                        ['Rs 15,000', 'Rs 34,550', '19 months', 'Month 3', 'Rs 56,658'],
                        ['Rs 20,000', 'Rs 39,550', '17 months', 'Month 3', 'Rs 48,867'],
                      ].map((r, i) => (
                        <tr key={r[0]} style={rowBg(i)}>
                          <td style={tdFirst}>{r[0]}</td>
                          <td style={tdN}>{r[1]}</td>
                          <td style={tdN}>{r[2]}</td>
                          <td style={tdN}>{r[3]}</td>
                          <td style={tdN}>{r[4]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>Rolling freed minimums forward, with no extra money at all, already cuts 10 months and Rs 6,338 of interest. That is the snowball effect on its own.</p>
                <p style={p}>Adding Rs 5,000 a month brings the debt-free date down to 28 months and saves Rs 48,602 against minimums only. Going from Rs 15,000 to Rs 20,000 extra saves only two more months.</p>
                <p style={p}>That pattern holds for most debt lists. Payoff time depends roughly on total debt divided by the monthly budget, so each extra Rs 5,000 is a smaller share of a budget that is already larger.</p>
              </div>

              <div style={sec} id="debts-to-include">
                <h2 style={h2}>Which Debts Should Go in Your Snowball?</h2>
                <p style={p}>Include every consumer debt with a flexible payoff, and think twice about long, cheap loans such as a home loan. This table covers the common Indian debt types.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={tableS}>
                    <caption style={capS}>General guidance by debt type. Check your own loan agreement and Key Facts Statement for prepayment terms.</caption>
                    <thead><tr>
                      <th style={thS} scope="col">Debt Type</th>
                      <th style={thS} scope="col">Include?</th>
                      <th style={thS} scope="col">Why</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ['Credit card balances', 'Yes', 'Usually the costliest debt you hold, and payments are fully flexible.'],
                        ['Buy now, pay later and consumer EMIs', 'Yes', 'Small balances make ideal first wins. Check any foreclosure terms.'],
                        ['Personal loans', 'Yes', 'Unsecured and expensive. Fixed-rate loans may carry foreclosure charges.'],
                        ['Two-wheeler and car loans', 'Usually', 'Moderate rates. Clearing one frees a sizeable EMI for the snowball.'],
                        ['Education loan', 'Optional', 'Interest can be deducted under Section 80E in the old tax regime, which lowers its real cost.'],
                        ['Home loan', 'Usually not', 'Long tenure, lower rate and, in the old regime, a Section 24(b) interest deduction.'],
                        ['Money owed to family', 'Optional', 'Enter it at 0% with the monthly amount you agreed to pay.'],
                      ].map((r, i) => (
                        <tr key={r[0]} style={rowBg(i)}>
                          <td style={tdFirst}>{r[0]}</td>
                          <td style={tdR}>{r[1]}</td>
                          <td style={tdL}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>Dave Ramsey&apos;s version of the plan covers all debt except the house. A home loan at a single-digit rate can take decades to clear and would stall the snowball behind it.</p>
                <p style={p}>Prepayment rules matter here. Under the RBI&apos;s <a href="https://www.rbi.org.in/scripts/NotificationUser.aspx?Id=12878&Mode=0" target="_blank" rel="noopener noreferrer" style={linkS}>Pre-payment Charges on Loans Directions, 2025</a>, lenders cannot charge prepayment fees on floating-rate loans to individuals for non-business purposes.</p>
                <p style={p}>That rule applies to loans sanctioned or renewed on or after 1 January 2026. Fixed-rate loans can still carry charges, so read the Key Facts Statement before a large prepayment.</p>
                <p style={p}>To see what an extra payment does to one loan on its own, including tenure saved, use the <Link href="/calculators/loan-prepayment-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Loan Prepayment Calculator</Link>.</p>
              </div>

              <div style={sec} id="snowball-excel">
                <h2 style={h2}>Debt Snowball in Excel or Google Sheets</h2>
                <p style={p}>You can build a debt snowball spreadsheet with one block of five columns per debt and one shared snowball pool. Here is the layout for a single debt, repeated for each one.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={tableS}>
                    <caption style={capS}>Column layout for one debt in a month-by-month debt snowball sheet. Row 3 is month 2.</caption>
                    <thead><tr><th style={thS} scope="col">Column</th><th style={thS} scope="col">Content</th><th style={thS} scope="col">Example Formula</th></tr></thead>
                    <tbody>
                      {[
                        ['A: Month', 'Month number, 1 onward', '=A2+1'],
                        ['B: Opening balance', 'Previous month closing balance', '=F2'],
                        ['C: Interest', 'Opening balance times monthly rate', '=B3*Rate/12'],
                        ['D: Minimum paid', 'Minimum, capped at what is owed', '=MIN(MinPay, B3+C3)'],
                        ['E: Snowball payment', 'Pool share if this is the target debt', '=IF(Target, MIN(Pool, B3+C3-D3), 0)'],
                        ['F: Closing balance', 'Opening plus interest minus payments', '=B3+C3-D3-E3'],
                      ].map((r, i) => (
                        <tr key={r[0]} style={rowBg(i)}>
                          <td style={tdFirst}>{r[0]}</td>
                          <td style={tdL}>{r[1]}</td>
                          <td style={{ ...tdR, fontFamily: 'monospace', fontSize: 12 }}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>The pool is the fixed monthly budget minus the sum of every column D that month. The target is the first debt, in smallest-balance order, whose balance is still above zero.</p>
                <p style={p}>The hard part is the hand-off. When a target clears mid-month, its leftover pool must flow to the next debt in the same month, which needs a nested formula chain across every block.</p>
                <p style={p}>This calculator runs exactly that logic for up to six debts, so a sheet built this way should match its schedule to within rounding.</p>
              </div>

              <PromoBar title="Debt Consolidation Calculator" text="Compare your snowball with merging every balance into one lower-rate loan." href="/calculators/debt-consolidation-calculator" />

              <div style={sec} id="credit-score-impact">
                <h2 style={h2}>Does the Debt Snowball Affect Your CIBIL Score?</h2>
                <p style={p}>The debt snowball generally helps your CIBIL score, because it keeps every payment on time and steadily reduces what you owe. Two details decide how much it helps.</p>
                <ul style={ulS}>
                  <li style={{ ...li, marginBottom: 8 }}><strong style={{ color: C.ink }}>Payment history:</strong> The plan requires every minimum to be paid each month, which protects the factor lenders weigh most.</li>
                  <li style={{ ...li, marginBottom: 8 }}><strong style={{ color: C.ink }}>Card utilization:</strong> Paying down card balances lowers the share of your limit in use. The <Link href="/calculators/credit-utilization-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Credit Utilization Calculator</Link> shows where you stand.</li>
                  <li style={{ ...li, marginBottom: 8 }}><strong style={{ color: C.ink }}>Closing paid-off cards:</strong> Cancelling a card removes its limit, which can push utilization up on the cards you keep. A fee-free old card is often worth keeping open.</li>
                  <li style={{ ...li, marginBottom: 8 }}><strong style={{ color: C.ink }}>Closed loans:</strong> Collect a no-dues or closure letter for each loan, then check your credit report shows the account as closed.</li>
                </ul>
                <p style={p}>For a rough read on where your score sits today, try the <Link href="/calculators/credit-health-score-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Credit Health Score Calculator</Link>.</p>
              </div>

              <div style={sec} id="common-mistakes">
                <h2 style={h2}>Common Debt Snowball Mistakes</h2>
                <p style={p}>Most snowball plans fail on behaviour, not maths. These are the mistakes that stretch a two-year plan into four.</p>
                <ol style={olS}>
                  <li style={li}><strong style={{ color: C.ink }}>Spending the freed payment:</strong> Once a debt clears, its EMI must go to the next debt. Letting it drift into spending is the most common way the snowball stalls.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Splitting the extra money:</strong> Spreading spare cash across every debt slows each payoff and delays the first win.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Missing a minimum elsewhere:</strong> A late payment on a back-burner debt brings late fees and a credit report mark that outweigh months of progress.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Ignoring a growing balance:</strong> If a minimum does not cover the interest, that debt grows until the snowball reaches it. The calculator flags this on each debt.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Adding new card spending:</strong> A fresh balance can jump to the front of the queue and push every payoff date back.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Using old balances:</strong> Plans built from last quarter&apos;s numbers drift. Re-enter current balances every few months.</li>
                </ol>
              </div>

              <div style={sec} id="limitations">
                <h2 style={h2}>Limitations of This Calculator</h2>
                <p style={p}>This calculator gives a planning estimate, not a bank statement. Five simplifications can make real numbers differ from what you see here.</p>
                <p style={p}><strong style={{ color: C.ink }}>Rates are held constant.</strong> A floating-rate loan that resets, or a card promotional rate that expires, changes the real outcome partway through.</p>
                <p style={p}><strong style={{ color: C.ink }}>Minimums are fixed amounts.</strong> A card&apos;s minimum amount due usually falls as its balance falls. Here it stays at the amount you enter, so the minimums-only comparison understates how long a real card takes to clear.</p>
                <p style={p}><strong style={{ color: C.ink }}>No fees, charges or GST.</strong> Late fees, annual fees, foreclosure charges and the 18% GST on card finance charges are not included in total interest.</p>
                <p style={p}><strong style={{ color: C.ink }}>Monthly, not daily, interest.</strong> Banks usually compute card interest daily on the running balance. The monthly simulation is close but not identical.</p>
                <p style={p}><strong style={{ color: C.ink }}>Steady extra payment.</strong> The extra amount is assumed to be the same every month. A bonus or a missed month shifts the real payoff date.</p>
              </div>

              <div style={sec} id="how-to-use">
                <h2 style={h2}>How to Use This Debt Snowball Calculator</h2>
                <p style={p}>Using the debt snowball calculator takes about two minutes with your latest statements to hand.</p>
                <ol style={olS}>
                  <li style={li}><strong style={{ color: C.ink }}>Add your debts:</strong> Enter a name, outstanding balance, annual interest rate and minimum payment or EMI for each debt, up to six.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Set your extra payment:</strong> Open More settings and choose how much you can pay above the combined minimums each month.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Read your payoff plan:</strong> See the debt-free date, total interest, the order debts clear and the month each one closes.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Compare methods:</strong> Check the interest and time saved against paying minimums only, and the interest gap against the avalanche method.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Open the schedule:</strong> Expand Debt Repayment Schedule for the balance chart, the method comparison and the year-by-year table.</li>
                </ol>
              </div>


              <div style={{ margin: '0 0 44px' }} id="faq">
                <h2 style={h2}>Frequently Asked Questions</h2>
                <FAQ items={faqs} />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only, based on the balances, rates and payments you enter. Actual payoff dates depend on billing cycles, daily interest, fees, taxes and any rate changes your lenders apply. This calculator is for educational and planning purposes only and does not constitute financial advice. Consult a SEBI-registered investment adviser or a qualified credit counsellor before making debt repayment decisions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .debt-snowball-sidebar::-webkit-scrollbar { width: 5px; }
            .debt-snowball-sidebar::-webkit-scrollbar-track { background: transparent; }
            .debt-snowball-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .debt-snowball-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            aria-label="Related calculators"
            className="debt-snowball-sidebar"
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
            <SnowballQuickFacts />
            <SidebarList title="Popular Calculators" items={POPULAR} />
            <SidebarList title="More Calculators" items={MORE} />
          </aside>
        </div>
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

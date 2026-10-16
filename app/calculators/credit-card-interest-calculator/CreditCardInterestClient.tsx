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

/* ── Palette ───────────────────────────────────────────── */
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
const MAX_MONTHS = 600;     // 50-year simulation cap
const GST_RATE = 0.18;      // GST on credit card finance charges
const MIN_DUE_FLOOR = 200;  // common floor on the minimum amount due

/* ── Types ─────────────────────────────────────────────── */
type Plan = 'minimum' | 'fixed' | 'target';
type MinRule = 'percent' | 'interestPlus';

interface MonthRow {
  month: number;
  payment: number;
  interest: number;
  gst: number;
  principal: number;
  balance: number;
}

interface PayoffResult {
  rows: MonthRow[];
  months: number;
  capped: boolean;
  totalInterest: number;
  totalGst: number;
  totalPaid: number;
  firstPayment: number;
  payment: number; // fixed payment used (0 for minimum-due plans)
}

/* ── Payoff math ───────────────────────────────────────── */
// Payment that clears balance B in n months when each month adds rate r plus GST on it.
function requiredPayment(balance: number, monthlyRatePct: number, gstOn: boolean, n: number) {
  const i = (monthlyRatePct / 100) * (gstOn ? 1 + GST_RATE : 1);
  if (n <= 0) return balance;
  return i === 0 ? balance / n : (balance * i) / (1 - Math.pow(1 + i, -n));
}

// Each month: interest = balance x monthly rate, GST = 18% of that interest, both added to
// the balance, then the month's payment is taken off. Minimum due is either a % of the total
// due, or all interest and GST plus a % of the remaining balance, never below the floor.
function simulatePayoff(opts: {
  balance: number; monthlyRatePct: number; gstOn: boolean;
  plan: 'minimum' | 'fixed'; minRule: MinRule; minPct: number; payment: number;
}): PayoffResult {
  const { balance, monthlyRatePct, gstOn, plan, minRule, minPct, payment } = opts;
  const r = monthlyRatePct / 100;
  const rows: MonthRow[] = [];
  let bal = balance, totalInterest = 0, totalGst = 0, totalPaid = 0;

  while (bal > 0.5 && rows.length < MAX_MONTHS) {
    const interest = bal * r;
    const gst = gstOn ? interest * GST_RATE : 0;
    bal += interest + gst;
    let pay: number;
    if (plan === 'minimum') {
      pay = minRule === 'percent'
        ? Math.max(bal * (minPct / 100), MIN_DUE_FLOOR)
        : Math.max(interest + gst + (bal - interest - gst) * (minPct / 100), MIN_DUE_FLOOR);
    } else {
      pay = payment;
    }
    pay = Math.min(pay, bal);
    bal -= pay;
    totalInterest += interest;
    totalGst += gst;
    totalPaid += pay;
    rows.push({ month: rows.length + 1, payment: pay, interest, gst, principal: pay - interest - gst, balance: Math.max(0, bal) });
  }

  return {
    rows,
    months: rows.length,
    capped: bal > 0.5,
    totalInterest,
    totalGst,
    totalPaid,
    firstPayment: rows[0]?.payment ?? 0,
    payment: plan === 'minimum' ? 0 : payment,
  };
}

function fmtMonths(m: number) {
  const y = Math.floor(m / 12), r = m % 12;
  if (y === 0) return `${r} mo`;
  return r === 0 ? `${y} yr` : `${y} yr ${r} mo`;
}

interface PeriodRow { label: string; payment: number; interest: number; gst: number; principal: number; balance: number }

// Month-by-month for short plans, year-by-year for longer ones.
function groupRows(rows: MonthRow[]): { unit: 'month' | 'year'; periods: PeriodRow[] } {
  if (rows.length <= 36) {
    return { unit: 'month', periods: rows.map(r => ({ label: `Month ${r.month}`, payment: r.payment, interest: r.interest, gst: r.gst, principal: r.principal, balance: r.balance })) };
  }
  const periods: PeriodRow[] = [];
  for (let i = 0; i < rows.length; i += 12) {
    const slice = rows.slice(i, i + 12);
    const sum = (k: 'payment' | 'interest' | 'gst' | 'principal') => slice.reduce((s, r) => s + r[k], 0);
    const last = slice[slice.length - 1];
    periods.push({
      label: slice.length === 12 ? `Year ${i / 12 + 1}` : `Year ${i / 12 + 1} (to month ${last.month})`,
      payment: sum('payment'), interest: sum('interest'), gst: sum('gst'), principal: sum('principal'), balance: last.balance,
    });
  }
  return { unit: 'year', periods };
}

/* ── Slider (VPF) ──────────────────────────────────────── */
function Slider({ label, value, min, max, step, fmt, onChange, compact, id }: {
  label: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void; compact?: boolean; id: string;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
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

/* ── Preset pills (input panel, colorless) ─────────────── */
function Pills<T extends string>({ label, options, value, onChange }: {
  label: string; options: { value: T; label: string }[]; value: T; onChange: (v: T) => void;
}) {
  return (
    <div role="radiogroup" aria-label={label} style={{ marginBottom: 28 }}>
      <p style={{ fontSize: 14, color: C.ink2, margin: '0 0 10px' }}>{label}</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {options.map(o => {
          const active = o.value === value;
          return (
            <button key={o.value} role="radio" aria-checked={active} onClick={() => onChange(o.value)}
              style={{ padding: '7px 10px', fontSize: 12.5, background: active ? C.white : 'transparent', color: active ? C.ink : C.ink3, border: `${active ? 1.5 : 1}px solid ${active ? C.ink : C.border}`, fontWeight: active ? 700 : 500, borderRadius: 7, cursor: 'pointer', fontFamily: INTER, transition: 'all 0.15s' }}>
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Donut (VPF geometry: one track + one overlay arc) ─── */
function DonutChart({ principal, interest }: { principal: number; interest: number }) {
  const total = principal + interest;
  if (total <= 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const pArc = (principal / total) * circ;
  const pPct = Math.round((principal / total) * 100);
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Total repayment split: balance ${pPct}%, interest ${100 - pPct}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Balance</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
  );
}

/* ── Stacked bar chart: principal vs interest per period (VPF BarChart) ── */
function BarChart({ periods, unit, mobile }: { periods: PeriodRow[]; unit: 'month' | 'year'; mobile: boolean }) {
  if (periods.length === 0) return null;
  const W = mobile ? 400 : 800, H = 160, PADL = 4, PADB = 20;
  const vals = periods.map(p => ({ prin: Math.max(0, p.principal), int: p.interest + p.gst }));
  const maxTotal = Math.max(...vals.map(v => v.prin + v.int), 1);
  const slot = (W - PADL) / periods.length;
  const barW = Math.max(3, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;
  const every = Math.max(1, Math.ceil(periods.length / (mobile ? 8 : 18)));
  return (
    <svg role="img" aria-label={`Balance repaid and interest charged per ${unit}`}
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {vals.map((v, i) => {
        const totalH = ((v.prin + v.int) / maxTotal) * H;
        const prinH = v.prin + v.int > 0 ? (v.prin / (v.prin + v.int)) * totalH : 0;
        const x = PADL + i * slot + gap;
        return (
          <g key={i}>
            <title>{`${periods[i].label}: interest and GST ${Math.round(v.int)}, balance repaid ${Math.round(v.prin)}`}</title>
            <rect x={x} y={H - totalH} width={barW} height={totalH - prinH} fill={CHART_PAIR.secondary} rx={2} />
            <rect x={x} y={H - prinH} width={barW} height={prinH} fill={CHART_PAIR.primary} rx={2} />
            {i % every === 0 && (
              <text x={x + barW / 2} y={H + 14} textAnchor="middle" style={{ fontSize: 9, fill: C.ink3, fontFamily: INTER }}>
                {unit === 'month' ? `M${i + 1}` : `Y${i + 1}`}
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
function InterestQuickFacts() {
  const rows = [
    { label: 'Typical monthly rate',     value: '2.5% to 3.75%' },
    { label: 'Same rate a year (APR)',   value: '30% to 45%' },
    { label: 'GST on interest',          value: '18%' },
    { label: 'Interest-free period',     value: 'Only if paid in full' },
    { label: 'Late fee grace (RBI)',     value: 'Over 3 days late' },
    { label: 'Minimum due floor',        value: 'Often Rs 200' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', fontFamily: INTER, background: C.white, flexShrink: 0 }}>
      <div style={{ background: '#f4f5f6', padding: '12px 18px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink }}>Card Interest Quick Facts</span>
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

/* ── Table of contents ─────────────────────────────────── */
const TOC_ITEMS = [
  { id: 'what-is-credit-card-interest',   label: 'What is card interest' },
  { id: 'how-credit-card-interest-works', label: 'How it works in India' },
  { id: 'interest-formula',               label: 'Formula and calculation' },
  { id: 'worked-example',                 label: 'Worked example' },
  { id: 'average-daily-balance',          label: 'Average daily balance' },
  { id: 'apr-vs-monthly-rate',            label: 'Monthly rate vs APR' },
  { id: 'interest-by-balance',            label: 'Interest by balance' },
  { id: 'minimum-payment-trap',           label: 'Minimum payment trap' },
  { id: 'payoff-plans',                   label: 'How much to pay' },
  { id: 'interest-vs-emi',                label: 'Interest vs EMI vs loan' },
  { id: 'cash-withdrawals',               label: 'Cash withdrawals' },
  { id: 'rbi-rules',                      label: 'RBI rules and late fees' },
  { id: 'reduce-interest',                label: 'How to cut interest' },
  { id: 'common-mistakes',                label: 'Common mistakes' },
  { id: 'limitations',                    label: 'Limitations' },
  { id: 'how-to-use',                     label: 'How to use' },
  { id: 'faq',                            label: 'FAQs' },
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

/* ── Sidebar list (VPF) ────────────────────────────────── */
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
  { href: '/calculators/credit-card-emi-calculator',          label: 'Credit Card EMI Calculator' },
  { href: '/calculators/credit-utilization-calculator',       label: 'Credit Utilization Calculator' },
  { href: '/calculators/debt-snowball-calculator',            label: 'Debt Snowball Calculator' },
  { href: '/calculators/debt-avalanche-calculator',           label: 'Debt Avalanche Calculator' },
  { href: '/calculators/debt-consolidation-calculator',       label: 'Debt Consolidation Calculator' },
  { href: '/calculators/balance-transfer-savings-calculator', label: 'Balance Transfer Savings' },
  { href: '/calculators/personal-loan-calculator',            label: 'Personal Loan Calculator' },
];
const MORE = [
  { href: '/calculators/credit-health-score-calculator',      label: 'Credit Health Score Calculator' },
  { href: '/calculators/credit-card-comparison-calculator',   label: 'Credit Card Comparison Calculator' },
  { href: '/calculators/debt-to-income-ratio-calculator',     label: 'Debt-to-Income Ratio Calculator' },
  { href: '/calculators/monthly-budget-calculator',           label: 'Monthly Budget Calculator' },
  { href: '/calculators/emergency-fund-calculator',           label: 'Emergency Fund Calculator' },
];

/* ── FAQ (single-sourced via props from page.tsx) ──────── */
function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return <FAQBox items={items} />;
}

/* ── In-content promo bar ──────────────────────────────── */
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

/* ── Standard CA CTA (CLAUDE.md block) ─────────────────── */

const RBI_CARD_DIRECTIONS = 'https://rbidocs.rbi.org.in/rdocs/notification/PDFs/92MDCREDITDEBITCARDC423AFFB5E7945149C95CDD2F71E9158.PDF';

/* ════════════════════════════════════════════════════════ */
export default function CreditCardInterestClient({ faqs }: { faqs: { q: string; a: string }[] }) {
  const defaultSettings = {
    balance: 100000,
    monthlyRate: 3.5,
    plan: 'minimum' as Plan,
    minPct: 5,
    minRule: 'percent' as MinRule,
    fixedPayment: 10000,
    targetMonths: 12,
    gstOn: true,
  };
  const { settings, updateSettings } = useCalculatorSettings('credit-card-interest', defaultSettings);
  const balance: number = settings.balance ?? 100000;
  const monthlyRate: number = settings.monthlyRate ?? 3.5;
  const plan: Plan = settings.plan ?? 'minimum';
  const minPct: number = settings.minPct ?? 5;
  const minRule: MinRule = settings.minRule ?? 'percent';
  const fixedPayment: number = settings.fixedPayment ?? 10000;
  const targetMonths: number = settings.targetMonths ?? 12;
  const gstOn: boolean = settings.gstOn ?? true;

  const [mobile, setMobile] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const { minimum, result, in12, comparison } = useMemo(() => {
    const base = { balance, monthlyRatePct: monthlyRate, gstOn, minRule, minPct };
    const fixedFor = (payment: number) => simulatePayoff({ ...base, plan: 'fixed', payment });
    const minimum = simulatePayoff({ ...base, plan: 'minimum', payment: 0 });
    const result = plan === 'minimum' ? minimum
      : fixedFor(plan === 'fixed' ? fixedPayment : requiredPayment(balance, monthlyRate, gstOn, targetMonths));
    const in12 = fixedFor(requiredPayment(balance, monthlyRate, gstOn, 12));
    const comparison = [
      { label: 'Minimum due only', r: minimum, falling: true },
      ...(plan === 'minimum' ? [] : [{ label: plan === 'fixed' ? 'Your fixed payment' : `Your plan (${targetMonths} months)`, r: result, falling: false }]),
      ...[12, 24, 36].filter(n => !(plan === 'target' && n === targetMonths))
        .map(n => ({ label: `Clear in ${n} months`, r: fixedFor(requiredPayment(balance, monthlyRate, gstOn, n)), falling: false })),
    ];
    return { minimum, result, in12, comparison };
  }, [balance, monthlyRate, gstOn, minRule, minPct, plan, fixedPayment, targetMonths]);

  const schedule = useMemo(() => groupRows(result.rows), [result.rows]);

  const monthlyCharge = balance * (monthlyRate / 100) * (gstOn ? 1 + GST_RATE : 1);
  const dailyCharge = balance * (monthlyRate / 100) * 12 / 365 * (gstOn ? 1 + GST_RATE : 1);
  const effMonthly = monthlyRate * (gstOn ? 1 + GST_RATE : 1);
  const effAnnual = (Math.pow(1 + effMonthly / 100, 12) - 1) * 100;
  const totalCharges = result.totalInterest + result.totalGst;
  const principalPct = balance + totalCharges > 0 ? Math.round((balance / (balance + totalCharges)) * 100) : 0;
  const interestPct = 100 - principalPct;
  const chargeLabel = gstOn ? 'Interest + GST' : 'Interest';
  const firstMonthStuck = result.rows[0] ? result.rows[0].principal <= 0 : false;

  const planSlider = plan === 'minimum'
    ? <Slider label={minRule === 'percent' ? 'Minimum Due (% of total due)' : 'Minimum Due (% of balance, plus interest)'} id="cc-min-pct" value={minPct} min={1} max={10} step={0.5} fmt={v => `${v}%`} onChange={v => updateSettings({ minPct: v })} compact={mobile} />
    : plan === 'fixed'
      ? <Slider label="Monthly Payment" id="cc-fixed" value={fixedPayment} min={500} max={200000} step={500} fmt={fmtC} onChange={v => updateSettings({ fixedPayment: v })} compact={mobile} />
      : <Slider label="Pay Off In" id="cc-target" value={targetMonths} min={3} max={60} step={1} fmt={v => `${v} mo`} onChange={v => updateSettings({ targetMonths: v })} compact={mobile} />;

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const h3  = { fontSize: mobile ? 15 : 16, fontWeight: 700, color: C.ink, margin: '0 0 10px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const li  = { fontSize: 15, color: C.ink2, lineHeight: 1.75 } as React.CSSProperties;
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
  const schedTh = { padding: '10px 14px', textAlign: 'right' as const, fontSize: 11, fontWeight: 700, color: C.ink, textTransform: 'uppercase' as const, letterSpacing: '0.06em', whiteSpace: 'nowrap' as const };
  const schedCap = { captionSide: 'bottom' as const, textAlign: 'left' as const, fontSize: 11.5, color: C.ink3, padding: mobile ? '8px 16px 16px' : '8px 44px 20px' };
  const edge = mobile ? 16 : 44;
  const cell = { padding: '11px 14px', textAlign: 'right' as const, color: C.ink2 };

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Credit Card Interest Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Work out the interest and GST on your credit card balance, how long the minimum due takes to clear it, and what monthly payment clears it by your chosen date.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <section aria-label="Credit Card Interest Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* ───── INPUT PANEL (no fill colors) ───── */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{showAdvanced ? 'More Settings' : 'Your Card'}</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider label="Outstanding Balance" id="cc-balance" value={balance} min={1000} max={1000000} step={1000} fmt={fmtC} onChange={v => updateSettings({ balance: v })} compact={mobile} />
                      <Slider label="Monthly Interest Rate" id="cc-rate" value={monthlyRate} min={1} max={4.5} step={0.05} fmt={v => `${v.toFixed(2)}%`} onChange={v => updateSettings({ monthlyRate: v })} compact={mobile} />

                      <div style={{ marginTop: -8, padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 28 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 12.5, color: C.ink, fontWeight: 700, marginBottom: 4 }}>
                          <span>{gstOn ? 'Interest + GST this month' : 'Interest this month'}</span>
                          <span>{fmtIN(monthlyCharge)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 12, color: C.ink2, marginBottom: 2 }}>
                          <span>Per day</span>
                          <span>{fmtIN(dailyCharge)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 12, color: C.ink2 }}>
                          <span>Annual rate (APR)</span>
                          <span>{(monthlyRate * 12).toFixed(1)}%</span>
                        </div>
                      </div>

                      <Pills<Plan> label="Repayment Plan" value={plan} onChange={v => updateSettings({ plan: v })}
                        options={[{ value: 'minimum', label: 'Minimum due' }, { value: 'fixed', label: 'Fixed payment' }, { value: 'target', label: 'Pay by date' }]} />

                      {planSlider}

                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button onClick={() => setShowAdvanced(true)}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                          More settings
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Pills<'on' | 'off'> label="GST on Interest" value={gstOn ? 'on' : 'off'} onChange={v => updateSettings({ gstOn: v === 'on' })}
                        options={[{ value: 'on', label: 'Add 18% GST' }, { value: 'off', label: 'Leave out GST' }]} />
                      <Pills<MinRule> label="How Your Minimum Due Is Set" value={minRule} onChange={v => updateSettings({ minRule: v, minPct: v === 'percent' ? 5 : 2 })}
                        options={[{ value: 'percent', label: '% of total due' }, { value: 'interestPlus', label: 'Interest + % of balance' }]} />
                      {plan !== 'minimum' && (
                        <Slider label={minRule === 'percent' ? 'Minimum Due (% of total due)' : 'Minimum Due (% of balance, plus interest)'} id="cc-min-pct-adv" value={minPct} min={1} max={10} step={0.5} fmt={v => `${v}%`} onChange={v => updateSettings({ minPct: v })} compact={mobile} />
                      )}

                      <div style={{ padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 24 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 12.5, color: C.ink, fontWeight: 700, marginBottom: 4 }}>
                          <span>Minimum due this month</span>
                          <span>{fmtIN(minimum.firstPayment)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 12, color: C.ink2, marginBottom: 2 }}>
                          <span>Effective monthly charge</span>
                          <span>{effMonthly.toFixed(2)}%</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 12, color: C.ink2 }}>
                          <span>Effective annual rate</span>
                          <span>{effAnnual.toFixed(1)}%</span>
                        </div>
                      </div>

                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: '0 0 24px' }}>
                        Issuers set the minimum due differently. Some use a share of the total due, others charge all interest and GST plus a small share of the balance. Both have a floor of about Rs {MIN_DUE_FLOOR}. Check your statement.
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
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 8 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                      <div style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Debt-free in</div>
                      <div style={{ fontSize: 12, color: '#7A8087' }}>Total {gstOn ? 'interest + GST' : 'interest'}</div>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                      <div aria-live="polite" aria-label={`Debt free in ${result.capped ? 'more than 50 years' : fmtMonths(result.months)}`}
                        style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em', lineHeight: 1 }}>
                        {result.capped ? '50+ yr' : fmtMonths(result.months)}
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#101214', lineHeight: 1 }}>{result.capped ? 'Never clears' : fmtC(totalCharges)}</div>
                    </div>
                  </div>

                  {(result.capped || firstMonthStuck) && (
                    <div style={{ width: '100%', background: C.white, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.ink3}`, padding: '14px 16px', borderRadius: 10, margin: '8px 0' }}>
                      <div style={{ fontWeight: 700, fontSize: 13.5, color: C.ink, marginBottom: 4 }}>This payment does not cover the monthly charges</div>
                      <div style={{ color: C.ink2, fontSize: 12.5, lineHeight: 1.5 }}>
                        Interest{gstOn ? ' and GST' : ''} of {fmtIN(monthlyCharge)} a month is more than you are paying, so the balance grows. Pay more each month to make progress.
                      </div>
                    </div>
                  )}

                  {[
                    { label: plan === 'minimum' ? 'First minimum payment' : 'Monthly payment', value: fmtIN(plan === 'minimum' ? result.firstPayment : result.payment) },
                    { label: 'Total amount paid', value: result.capped ? 'Never clears' : fmtC(result.totalPaid) },
                    { label: 'Interest', value: result.capped ? 'Keeps growing' : fmtC(result.totalInterest) },
                    ...(gstOn ? [{ label: 'GST on interest (18%)', value: result.capped ? 'Keeps growing' : fmtC(result.totalGst) }] : []),                    ...(plan === 'minimum'
                      ? [
                          { label: 'To clear in 12 months, pay', value: `${fmtIN(in12.payment)} a month` },
                          { label: `${chargeLabel} if cleared in 12 months`, value: fmtC(in12.totalInterest + in12.totalGst) },
                        ]
                      : [
                          { label: 'Minimum due only would take', value: minimum.capped ? '50+ yr' : fmtMonths(minimum.months) },
                          { label: 'Saved vs minimum due', value: minimum.capped || result.capped ? 'Not comparable' : fmtC(Math.max(0, minimum.totalInterest + minimum.totalGst - totalCharges)) },
                        ]),
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink, textAlign: 'right' }}>{value}</span>
                    </div>
                  ))}

                  {/* Donut: top of panel on desktop, below stats on mobile */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    <DonutChart principal={balance} interest={result.capped ? 0 : totalCharges} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Balance {principalPct}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>{chargeLabel} {interestPct}%</span>
                    </div>
                  </div>

                  <div style={{ width: '100%', marginTop: mobile ? 8 : 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Balance {principalPct}%</span>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>{chargeLabel} {interestPct}%</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`Balance is ${principalPct}% of the total amount paid`}>
                      <div style={{ height: '100%', width: `${principalPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Payoff schedule: chart + tables, inside the calculator card ── */}
              {result.rows.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowSchedule(v => !v)} aria-expanded={showSchedule} aria-controls="cc-schedule-panel"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0, textAlign: 'left' }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Payoff Schedule</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>Payment plans compared and {schedule.unit}-by-{schedule.unit} breakdown</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {result.capped ? '50+ yr' : fmtMonths(result.months)} · {monthlyRate.toFixed(2)}%
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showSchedule ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showSchedule && (
                    <div id="cc-schedule-panel" style={{ borderTop: `1px solid ${C.border}` }}>
                      <style>{`@keyframes swipeHint { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }`}</style>

                      <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: mobile ? 'flex-start' : 'center', flexDirection: mobile ? 'column' : 'row', gap: 10, marginBottom: 14 }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>Where each {schedule.unit}&apos;s payment goes</span>
                          <div style={{ display: 'flex', gap: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} aria-hidden="true" />
                              <span style={{ fontSize: 11.5, color: C.ink2 }}>Balance repaid</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} aria-hidden="true" />
                              <span style={{ fontSize: 11.5, color: C.ink2 }}>{chargeLabel}</span>
                            </div>
                          </div>
                        </div>
                        <BarChart periods={schedule.periods} unit={schedule.unit} mobile={mobile} />
                        <p style={{ fontSize: 11.5, color: C.ink3, margin: '8px 0 20px', lineHeight: 1.6 }}>
                          The light part of each bar is money that went to {gstOn ? 'interest and GST' : 'interest'}, not to your balance. On a minimum-due plan it stays large for years.
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

                      <div style={{ padding: mobile ? '0 16px 10px' : '0 44px 10px' }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>Payment plans compared</span>
                      </div>
                      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
                        <table style={{ minWidth: 620, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={schedCap}>Same balance and rate paid off different ways. The minimum due shrinks as the balance falls.</caption>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              <th scope="col" style={{ ...schedTh, textAlign: 'left', padding: `10px 14px 10px ${edge}px` }}>Plan</th>
                              <th scope="col" style={schedTh}>Monthly Payment</th>
                              <th scope="col" style={schedTh}>Time</th>
                              <th scope="col" style={schedTh}>{chargeLabel}</th>
                              <th scope="col" style={{ ...schedTh, padding: `10px ${edge}px 10px 14px` }}>Total Paid</th>
                            </tr>
                          </thead>
                          <tbody>
                            {comparison.map((row, i) => (
                              <tr key={row.label} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <th scope="row" style={{ padding: `11px 14px 11px ${edge}px`, textAlign: 'left', fontWeight: 600, color: C.ink }}>{row.label}</th>
                                <td style={cell}>{row.falling ? `${fmtIN(row.r.firstPayment)}, falling` : fmtIN(row.r.payment)}</td>
                                <td style={cell}>{row.r.capped ? '50+ yr' : fmtMonths(row.r.months)}</td>
                                <td style={{ ...cell, fontWeight: 700, color: C.ink }}>{row.r.capped ? 'Never clears' : fmtC(row.r.totalInterest + row.r.totalGst)}</td>
                                <td style={{ ...cell, padding: `11px ${edge}px 11px 14px` }}>{row.r.capped ? 'Never clears' : fmtC(row.r.totalPaid)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div style={{ padding: mobile ? '20px 16px 10px' : '20px 44px 10px', borderTop: `1px solid ${C.border}` }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{schedule.unit === 'month' ? 'Month-by-month' : 'Year-by-year'} schedule for your plan</span>
                      </div>
                      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
                        <table style={{ minWidth: 640, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={schedCap}>
                            Payment, {gstOn ? 'interest, GST' : 'interest'} and balance for each {schedule.unit}{result.capped ? `, stopped at ${MAX_MONTHS / 12} years because the balance never clears` : ''}.
                          </caption>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              <th scope="col" style={{ ...schedTh, textAlign: 'left', padding: `10px 14px 10px ${edge}px` }}>{schedule.unit === 'month' ? 'Month' : 'Year'}</th>
                              <th scope="col" style={schedTh}>Paid</th>
                              <th scope="col" style={schedTh}>Interest</th>
                              {gstOn && <th scope="col" style={schedTh}>GST</th>}
                              <th scope="col" style={schedTh}>Balance Repaid</th>
                              <th scope="col" style={{ ...schedTh, padding: `10px ${edge}px 10px 14px` }}>Balance Left</th>
                            </tr>
                          </thead>
                          <tbody>
                            {schedule.periods.map((row, i) => (
                              <tr key={row.label} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <th scope="row" style={{ padding: `11px 14px 11px ${edge}px`, textAlign: 'left', fontWeight: 600, color: C.ink, whiteSpace: 'nowrap' }}>{row.label}</th>
                                <td style={cell}>{fmtIN(row.payment)}</td>
                                <td style={cell}>{fmtIN(row.interest)}</td>
                                {gstOn && <td style={cell}>{fmtIN(row.gst)}</td>}
                                <td style={cell}>{row.principal < 0 ? `-${fmtIN(-row.principal)}` : fmtIN(row.principal)}</td>
                                <td style={{ ...cell, padding: `11px ${edge}px 11px 14px`, fontWeight: 700, color: C.ink }}>{fmtIN(row.balance)}</td>
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

              <div style={sec} id="what-is-credit-card-interest">
                <h2 style={h2}>What Is Credit Card Interest?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Credit card interest is the charge a bank adds when you do not pay your full statement balance by the due date. It is quoted as a monthly rate and applies to the balance you carry forward.
                  </p>
                </div>
                <p style={p}>Banks also call it a finance charge. It only applies to revolving credit, where you pay part of the bill and roll the rest into the next month.</p>
                <p style={p}>Pay the full statement balance every month and you pay no interest on purchases at all. Carry any amount forward and interest applies, plus 18% GST on that interest.</p>
              </div>

              <div style={sec} id="how-credit-card-interest-works">
                <h2 style={h2}>How Credit Card Interest Works in India</h2>
                <p style={p}>Credit card interest works on the unpaid balance, charged daily at the monthly rate and billed once a month. Three rules decide how much you pay.</p>
                <ul style={ulS}>
                  <li style={{ ...li, marginBottom: 8 }}><strong style={{ color: C.ink }}>Interest-free period only when paid in full:</strong> The 20 to 50 day interest-free window applies only if you clear the whole statement by the due date.</li>
                  <li style={{ ...li, marginBottom: 8 }}><strong style={{ color: C.ink }}>Interest from the transaction date:</strong> Once you carry a balance, most issuers charge interest from the date of each purchase, and new purchases lose the interest-free period too.</li>
                  <li style={{ ...li, marginBottom: 8 }}><strong style={{ color: C.ink }}>GST on top:</strong> Interest and other card charges attract 18% GST, which appears as a separate line on your statement.</li>
                </ul>
                <p style={p}>This calculator models the monthly effect: interest on the balance you carry, GST on that interest, and the payment you make each month.</p>
              </div>

              <div style={sec} id="interest-formula">
                <h2 style={h2}>Credit Card Interest Formula: How to Calculate It</h2>
                <p style={p}>To calculate credit card interest, multiply the balance you carry by the monthly interest rate, then add 18% GST on that interest. For a daily figure, convert the monthly rate to a daily one.</p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16, overflowX: 'auto' }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark, lineHeight: 1.9, whiteSpace: 'pre' }}>
                    {'Monthly interest  = Balance × Monthly rate\n'}
                    {'GST               = Monthly interest × 18%\n'}
                    {'Daily rate        = Monthly rate × 12 ÷ 365\n'}
                    {'Interest per day  = Balance × Daily rate\n'}
                    {'APR               = Monthly rate × 12'}
                  </code>
                </div>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={tableS}>
                    <caption style={capS}>Terms used in the credit card interest calculation formula.</caption>
                    <thead><tr><th style={thS} scope="col">Term</th><th style={thS} scope="col">What It Means</th></tr></thead>
                    <tbody>
                      {[
                        ['Balance', 'What you carry past the due date. With daily interest, it is the average daily balance over the cycle.'],
                        ['Monthly rate', 'The finance charge printed in your card’s Most Important Terms and Conditions (MITC).'],
                        ['GST', '18% on the interest amount, not on the balance itself.'],
                        ['Minimum due', 'The smallest payment that keeps your account current. It does not stop interest.'],
                      ].map((row, i) => (
                        <tr key={row[0]} style={rowBg(i)}>
                          <td style={tdFirst}>{row[0]}</td>
                          <td style={tdL}>{row[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec} id="worked-example">
                <h2 style={h2}>Worked Example: Interest on a Rs 1 Lakh Balance</h2>
                <p style={p}>Take a Rs 1,00,000 balance at 3.5% a month, the calculator&apos;s default. One month of interest is 1,00,000 × 3.5% = Rs 3,500.</p>
                <p style={p}>GST at 18% adds Rs 630, so the month&apos;s charges come to Rs 4,130. Your total due becomes Rs 1,04,130.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={tableS}>
                    <caption style={capS}>First month on a Rs 1,00,000 balance at 3.5% a month with a 5% minimum due.</caption>
                    <thead><tr><th style={thS} scope="col">Item</th><th style={thR} scope="col">Amount</th></tr></thead>
                    <tbody>
                      {[
                        ['Balance carried forward', 'Rs 1,00,000'],
                        ['Interest at 3.5%', 'Rs 3,500'],
                        ['GST at 18% on interest', 'Rs 630'],
                        ['Total due', 'Rs 1,04,130'],
                        ['Minimum due at 5% of total', 'Rs 5,206.50'],
                        ['Part of that payment that cuts the balance', 'Rs 1,076.50'],
                      ].map((row, i) => (
                        <tr key={row[0]} style={rowBg(i)}>
                          <td style={tdFirst}>{row[0]}</td>
                          <td style={tdN}>{row[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>Of a Rs 5,206.50 minimum payment, Rs 4,130 goes to interest and GST. Only about a fifth of the payment reduces what you owe.</p>
              </div>

              <div style={sec} id="average-daily-balance">
                <h2 style={h2}>Average Daily Balance Method, Step by Step</h2>
                <p style={p}>Because interest accrues daily, the exact charge for a cycle depends on your balance each day. The average daily balance method adds those daily balances and divides by the days in the cycle.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={tableS}>
                    <caption style={capS}>A 30-day cycle at 3.5% a month. The daily rate is 3.5% × 12 ÷ 365, about 0.115%.</caption>
                    <thead><tr><th style={thS} scope="col">Days</th><th style={thS} scope="col">What Happened</th><th style={thR} scope="col">Daily Balance</th></tr></thead>
                    <tbody>
                      {[
                        ['Days 1 to 10', 'Rs 50,000 carried from the last statement', 'Rs 50,000'],
                        ['Days 11 to 20', 'Rs 20,000 paid on day 11', 'Rs 30,000'],
                        ['Days 21 to 30', 'Rs 10,000 new purchase on day 21', 'Rs 40,000'],
                        ['Average daily balance', '(10 × 50,000 + 10 × 30,000 + 10 × 40,000) ÷ 30', 'Rs 40,000'],
                      ].map((row, i) => (
                        <tr key={row[0]} style={rowBg(i)}>
                          <td style={tdFirst}>{row[0]}</td>
                          <td style={tdL}>{row[1]}</td>
                          <td style={tdN}>{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>Interest for the cycle is Rs 40,000 × 0.115% × 30 days, about Rs 1,380.82. GST adds Rs 248.55, for about Rs 1,629 in total.</p>
                <p style={p}>Paying part of the bill early in the cycle lowers the average, which is why a payment on day 11 costs less interest than the same payment on day 29.</p>
              </div>

              <div style={sec} id="apr-vs-monthly-rate">
                <h2 style={h2}>Monthly Rate vs APR vs Effective Annual Rate</h2>
                <p style={p}>Indian card issuers quote a monthly rate. The APR multiplies it by 12. The effective annual rate adds compounding, because unpaid interest itself attracts interest the next month.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={tableS}>
                    <caption style={capS}>Effective annual rate = (1 + monthly rate)^12 minus 1. With GST, the monthly rate is first multiplied by 1.18.</caption>
                    <thead><tr><th style={thS} scope="col">Monthly Rate</th><th style={thR} scope="col">APR</th><th style={thR} scope="col">Effective Annual</th><th style={thR} scope="col">Effective with GST</th></tr></thead>
                    <tbody>
                      {[
                        ['2.50%', '30.0%', '34.5%', '41.7%'],
                        ['3.00%', '36.0%', '42.6%', '51.8%'],
                        ['3.50%', '42.0%', '51.1%', '62.5%'],
                        ['3.75%', '45.0%', '55.5%', '68.1%'],
                      ].map((row, i) => (
                        <tr key={row[0]} style={rowBg(i)}>
                          <td style={tdFirst}>{row[0]}</td>
                          <td style={tdN}>{row[1]}</td>
                          <td style={tdN}>{row[2]}</td>
                          <td style={tdN}>{row[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>Typical Indian card rates run from about 2.5% to 3.75% a month, roughly 30% to 45% a year. Your exact rate is in your card&apos;s MITC and on your statement.</p>
                <p style={p}>A balance left untouched at 3.5% a month with GST grows by 62.5% in a year. That is the true cost of revolving, and why APR alone understates it.</p>
              </div>

              <div style={sec} id="interest-by-balance">
                <h2 style={h2}>How Much Interest Will You Pay on Your Balance?</h2>
                <p style={p}>At 3.5% a month, each Rs 1 lakh you carry costs Rs 3,500 in interest and Rs 4,130 with GST, every month it stays unpaid. The table scales that to common balances.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={tableS}>
                    <caption style={capS}>Charges at 3.5% a month with 18% GST, before any payment. Per-day figures use 3.5% × 12 ÷ 365.</caption>
                    <thead><tr><th style={thS} scope="col">Balance</th><th style={thR} scope="col">Interest per Month</th><th style={thR} scope="col">With GST</th><th style={thR} scope="col">Per Day with GST</th></tr></thead>
                    <tbody>
                      {[
                        ['Rs 25,000', 'Rs 875', 'Rs 1,033', 'Rs 34'],
                        ['Rs 50,000', 'Rs 1,750', 'Rs 2,065', 'Rs 68'],
                        ['Rs 1,00,000', 'Rs 3,500', 'Rs 4,130', 'Rs 136'],
                        ['Rs 2,00,000', 'Rs 7,000', 'Rs 8,260', 'Rs 272'],
                        ['Rs 5,00,000', 'Rs 17,500', 'Rs 20,650', 'Rs 679'],
                      ].map((row, i) => (
                        <tr key={row[0]} style={rowBg(i)}>
                          <td style={tdFirst}>{row[0]}</td>
                          <td style={tdN}>{row[1]}</td>
                          <td style={tdN}>{row[2]}</td>
                          <td style={tdN}>{row[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>The input panel above shows the same monthly and per-day figures for your own balance and rate.</p>
              </div>

              <div style={sec} id="minimum-payment-trap">
                <h2 style={h2}>The Minimum Payment Trap</h2>
                <p style={p}>Paying only the minimum due keeps your account current but clears the balance extremely slowly, because most of each payment goes to interest and GST.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={tableS}>
                    <caption style={capS}>Rs 1,00,000 at 3.5% a month with 18% GST, no new spending, minimum floor of Rs 200.</caption>
                    <thead><tr><th style={thS} scope="col">How the Minimum Is Set</th><th style={thR} scope="col">First Payment</th><th style={thR} scope="col">Time to Clear</th><th style={thR} scope="col">Interest + GST</th></tr></thead>
                    <tbody>
                      {[
                        ['5% of total due', 'Rs 5,207', '28 yr 5 mo', 'Rs 3,72,861'],
                        ['All interest and GST + 2% of balance', 'Rs 6,130', '16 yr 6 mo', 'Rs 2,02,035'],
                        ['All interest and GST + 5% of balance', 'Rs 9,130', '7 yr 6 mo', 'Rs 81,576'],
                      ].map((row, i) => (
                        <tr key={row[0]} style={rowBg(i)}>
                          <td style={tdFirst}>{row[0]}</td>
                          <td style={tdN}>{row[1]}</td>
                          <td style={tdN}>{row[2]}</td>
                          <td style={tdN}>{row[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>Issuers set the minimum differently. Some use 5% of the total due; SBI Card, for example, charges all interest, GST and fees plus 2% of the remaining balance. Your statement shows which applies.</p>
                <p style={p}>Under a 5% minimum, a Rs 1 lakh balance costs more than three times its size in interest and GST before it is gone. The minimum payment shrinks as the balance falls, which is what stretches it out.</p>
                <p style={p}>Choose your card&apos;s rule under More settings to see the trap for your own balance.</p>
              </div>

              <PromoBar title="Credit Card EMI Calculator" text="See what converting a large card balance into fixed EMIs would cost instead." href="/calculators/credit-card-emi-calculator" />

              <div style={sec} id="payoff-plans">
                <h2 style={h2}>How Much Should You Pay to Clear Your Card?</h2>
                <p style={p}>To clear a card balance by a set date, pay the fixed amount that covers each month&apos;s interest and GST and still cuts the balance. Pick a plan below or use &quot;Pay by date&quot; in the calculator.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={tableS}>
                    <caption style={capS}>Rs 1,00,000 at 3.5% a month with 18% GST and no new spending.</caption>
                    <thead><tr><th style={thS} scope="col">Clear In</th><th style={thR} scope="col">Monthly Payment</th><th style={thR} scope="col">Interest + GST</th><th style={thR} scope="col">Total Paid</th></tr></thead>
                    <tbody>
                      {[
                        ['6 months', 'Rs 19,157', 'Rs 14,942', 'Rs 1,14,942'],
                        ['12 months', 'Rs 10,736', 'Rs 28,829', 'Rs 1,28,829'],
                        ['18 months', 'Rs 7,983', 'Rs 43,694', 'Rs 1,43,694'],
                        ['24 months', 'Rs 6,646', 'Rs 59,510', 'Rs 1,59,510'],
                        ['36 months', 'Rs 5,384', 'Rs 93,834', 'Rs 1,93,834'],
                      ].map((row, i) => (
                        <tr key={row[0]} style={rowBg(i)}>
                          <td style={tdFirst}>{row[0]}</td>
                          <td style={tdN}>{row[1]}</td>
                          <td style={tdN}>{row[2]}</td>
                          <td style={tdN}>{row[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>The 36-month payment of Rs 5,384 is barely more than the first 5% minimum of Rs 5,207. Keeping the payment fixed instead of letting it shrink cuts 25 years off the plan.</p>
                <h3 style={h3}>Fixed monthly payments</h3>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={tableS}>
                    <caption style={capS}>Same Rs 1,00,000 balance, fixed payment each month until cleared.</caption>
                    <thead><tr><th style={thS} scope="col">Monthly Payment</th><th style={thR} scope="col">Time to Clear</th><th style={thR} scope="col">Interest + GST</th></tr></thead>
                    <tbody>
                      {[
                        ['Rs 5,000', '44 months', 'Rs 1,16,066'],
                        ['Rs 10,000', '14 months', 'Rs 31,664'],
                        ['Rs 15,000', '8 months', 'Rs 19,376'],
                        ['Rs 20,000', '6 months', 'Rs 14,390'],
                      ].map((row, i) => (
                        <tr key={row[0]} style={rowBg(i)}>
                          <td style={tdFirst}>{row[0]}</td>
                          <td style={tdN}>{row[1]}</td>
                          <td style={tdN}>{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>A Rs 5,000 payment barely clears the Rs 4,130 of first-month charges, so the balance moves slowly and interest ends up larger than the debt.</p>
              </div>

              <div style={sec} id="interest-vs-emi">
                <h2 style={h2}>Card Interest vs EMI Conversion vs a Personal Loan</h2>
                <p style={p}>Revolving interest is usually the most expensive way to carry a card balance. EMI conversion and a personal loan both replace it with a fixed rate and a fixed end date.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={tableS}>
                    <caption style={capS}>Compare the rate, fees and GST each option quotes you before switching.</caption>
                    <thead><tr><th style={thS} scope="col">Factor</th><th style={thS} scope="col">Revolving Interest</th><th style={thS} scope="col">Card EMI Conversion</th><th style={thS} scope="col">Personal Loan</th></tr></thead>
                    <tbody>
                      {[
                        ['Rate', 'Card finance charge, often 30% to 45% a year', 'Disclosed when you convert, usually lower', 'Set by the lender on your profile'],
                        ['End date', 'None, depends on what you pay', 'Fixed tenure', 'Fixed tenure'],
                        ['Extra costs', '18% GST on interest', 'Processing fee plus GST', 'Processing fee plus GST'],
                        ['Card limit', 'Balance uses your limit', 'Converted amount stays blocked', 'Card limit freed once repaid'],
                      ].map((row, i) => (
                        <tr key={row[0]} style={rowBg(i)}>
                          <td style={tdFirst}>{row[0]}</td>
                          <td style={tdL}>{row[1]}</td>
                          <td style={tdL}>{row[2]}</td>
                          <td style={tdL}>{row[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>To price a conversion, the <Link href="/calculators/credit-card-emi-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Credit Card EMI Calculator</Link> shows the EMI, interest and fees for a chosen tenure.</p>
                <p style={p}>To compare a loan offer, the <Link href="/calculators/personal-loan-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Personal Loan Calculator</Link> gives the EMI and total interest at the rate you are quoted.</p>
              </div>

              <div style={sec} id="cash-withdrawals">
                <h2 style={h2}>Cash Withdrawals on a Credit Card</h2>
                <p style={p}>Cash withdrawn on a credit card is charged interest from the day you take it out. There is no interest-free period on cash, even if you usually pay in full.</p>
                <p style={p}>Most issuers also charge a cash advance fee on each withdrawal, and GST applies to that fee. Check the cash advance rate and fee in your card&apos;s MITC.</p>
                <p style={p}>To see the interest on a cash withdrawal, enter the amount as the balance here and set the rate to your card&apos;s cash advance rate.</p>
              </div>

              <div style={sec} id="rbi-rules">
                <h2 style={h2}>RBI Rules on Card Interest, Minimum Due and Late Fees</h2>
                <p style={p}>The RBI&apos;s <a href={RBI_CARD_DIRECTIONS} target="_blank" rel="noopener noreferrer" style={linkS}>Credit Card and Debit Card Directions, 2022</a> limit how issuers can charge you when you do not pay in full.</p>
                <ul style={ulS}>
                  <li style={{ ...li, marginBottom: 8 }}><strong style={{ color: C.ink }}>No negative amortization:</strong> The minimum amount due must be set so that paying it does not make your balance grow.</li>
                  <li style={{ ...li, marginBottom: 8 }}><strong style={{ color: C.ink }}>No interest on unpaid charges:</strong> Unpaid charges, levies and taxes cannot be capitalised to charge or compound interest on them.</li>
                  <li style={{ ...li, marginBottom: 8 }}><strong style={{ color: C.ink }}>Three-day grace before late fees:</strong> Late payment charges apply, and the account is reported past due, only when payment is more than three days late.</li>
                  <li style={{ ...li, marginBottom: 8 }}><strong style={{ color: C.ink }}>Late fees on the unpaid amount:</strong> Late charges are levied on the amount still outstanding after the due date, not the whole bill.</li>
                  <li style={{ ...li, marginBottom: 8 }}><strong style={{ color: C.ink }}>Minimum due explained:</strong> Issuers must tell you what paying only the minimum amount due means for you.</li>
                </ul>
                <p style={p}>The grace period only stops a late fee. Interest still applies to any unpaid balance, so the only way to avoid it is to pay the full statement balance on time.</p>
              </div>

              <div style={sec} id="reduce-interest">
                <h2 style={h2}>How to Reduce Credit Card Interest</h2>
                <p style={p}>You reduce credit card interest by carrying a smaller balance for fewer days. These steps work from quickest to longest.</p>
                <ol style={olS}>
                  <li style={li}><strong style={{ color: C.ink }}>Pay the full statement balance:</strong> It is the only way to keep the interest-free period and pay no interest on purchases.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Pay more than the minimum, and keep it fixed:</strong> A payment that does not shrink with the balance clears it far sooner.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Pay early in the cycle:</strong> Under daily interest, a payment on day 5 cuts more interest than the same payment on day 25.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Stop new spending on the card:</strong> New purchases on a revolving card start costing interest from the day you make them.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Move the balance to a cheaper rate:</strong> EMI conversion, a balance transfer or a personal loan can replace the card rate.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Clear the costliest card first:</strong> With several cards, focus spare money on one at a time.</li>
                </ol>
                <p style={p}>For step 5, the <Link href="/calculators/balance-transfer-savings-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Balance Transfer Savings Calculator</Link> shows the net saving after transfer fees.</p>
                <p style={p}>For step 6, the <Link href="/calculators/debt-snowball-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Debt Snowball Calculator</Link> builds a month-by-month plan across all your cards and loans.</p>
                <p style={p}>A lower balance also lowers your utilization. The <Link href="/calculators/credit-utilization-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Credit Utilization Calculator</Link> shows your ratio per card and overall.</p>
              </div>

              <PromoBar title="Debt Snowball Calculator" text="Several cards carrying balances? Get a payoff order and a debt-free date." href="/calculators/debt-snowball-calculator" />

              <div style={sec} id="common-mistakes">
                <h2 style={h2}>Common Credit Card Interest Mistakes</h2>
                <p style={p}>Most people overpay on card interest because of a few habits, not one big decision.</p>
                <ol style={olS}>
                  <li style={li}><strong style={{ color: C.ink }}>Treating the minimum due as the bill:</strong> It avoids a late fee, not interest.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Paying almost all of the bill:</strong> Leaving even a small amount unpaid can cost the interest-free period on new purchases.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Comparing a monthly rate with an annual one:</strong> 3.5% a month is 42% a year before compounding and GST.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Forgetting GST:</strong> 18% GST on interest raises the real monthly charge from 3.5% to 4.13%.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Withdrawing cash on the card:</strong> Interest starts on day one, with a fee on top.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Letting the payment shrink:</strong> Paying whatever the minimum says each month stretches the debt out for years.</li>
                </ol>
              </div>

              <div style={sec} id="limitations">
                <h2 style={h2}>Limitations of This Calculator</h2>
                <p style={p}>This credit card interest calculator gives a close planning estimate. Your statement can differ for these reasons.</p>
                <p style={p}><strong style={{ color: C.ink }}>Monthly, not daily, interest.</strong> Banks charge interest daily on the running balance. The monthly model here is close but not identical, especially when payments land mid-cycle.</p>
                <p style={p}><strong style={{ color: C.ink }}>No new spending.</strong> The plan assumes you stop using the card. Any new purchase adds to the balance and the interest.</p>
                <p style={p}><strong style={{ color: C.ink }}>Constant rate.</strong> Issuers can change the rate on your card. The calculator holds it steady for the whole plan.</p>
                <p style={p}><strong style={{ color: C.ink }}>Fees left out.</strong> Late fees, annual fees and cash advance fees are not included. Only interest and GST on interest are.</p>
              </div>

              <div style={sec} id="how-to-use">
                <h2 style={h2}>How to Use This Credit Card Interest Calculator</h2>
                <p style={p}>Using the credit card interest calculator takes about a minute with your latest statement.</p>
                <ol style={olS}>
                  <li style={li}><strong style={{ color: C.ink }}>Enter your balance and rate:</strong> Use the outstanding balance and the monthly interest rate from your statement.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Read this month&apos;s charges:</strong> The box under the rate shows interest with GST for this month, per day and as an APR.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Pick a repayment plan:</strong> Choose minimum due, a fixed monthly payment, or a payoff date in months.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Match your card&apos;s rules:</strong> Open More settings to set how your minimum due works and whether GST is included.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Open the Payoff Schedule:</strong> Compare plans side by side and see where each payment goes.</li>
                </ol>
              </div>


              <div style={{ margin: '0 0 44px' }} id="faq">
                <h2 style={h2}>Frequently Asked Questions</h2>
                <FAQ items={faqs} />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only and based on the inputs you enter. Actual credit card interest depends on your issuer&apos;s billing cycle, daily interest method, minimum due rule, fees and any rate changes. Rates quoted are general market ranges; check your card&apos;s MITC and statement for exact figures. This calculator is for educational and planning purposes only and does not constitute financial advice.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .cc-interest-sidebar::-webkit-scrollbar { width: 5px; }
            .cc-interest-sidebar::-webkit-scrollbar-track { background: transparent; }
            .cc-interest-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .cc-interest-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            aria-label="Related calculators"
            className="cc-interest-sidebar"
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
            <InterestQuickFacts />
            <SidebarList title="Popular Calculators" items={POPULAR} />
            <SidebarList title="More Calculators" items={MORE} />
          </aside>
        </div>
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

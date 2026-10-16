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

/* ─── Loan types: typical rate and the tenure ceiling used by the calculator ── */
type LoanType = 'home' | 'personal' | 'car';
const TYPES: Record<LoanType, { label: string; rate: number; tenure: number; maxTenure: number; presets: number[] }> = {
  home:     { label: 'Home Loan',     rate: 8.5, tenure: 20, maxTenure: 30, presets: [10, 15, 20, 25, 30] },
  personal: { label: 'Personal Loan', rate: 12,  tenure: 5,  maxTenure: 6,  presets: [1, 2, 3, 4, 5, 6] },
  car:      { label: 'Car Loan',      rate: 9,   tenure: 5,  maxTenure: 7,  presets: [3, 4, 5, 6, 7] },
};

/* ─── Math ───────────────────────────────────────────────────── */
function calcEMI(p: number, annualRate: number, months: number): number {
  if (months <= 0 || p <= 0) return 0;
  if (annualRate === 0) return p / months;
  const r = annualRate / 12 / 100;
  const f = Math.pow(1 + r, months);
  return (p * r * f) / (f - 1);
}

/** Largest loan a given EMI can repay over `months` at `annualRate`. */
function maxLoanForEMI(emi: number, annualRate: number, months: number): number {
  if (months <= 0 || emi <= 0) return 0;
  if (annualRate === 0) return emi * months;
  const r = annualRate / 12 / 100;
  const f = Math.pow(1 + r, months);
  return (emi * (f - 1)) / (r * f);
}

/** RBI loan-to-value ceilings for individual housing loans (Master Circular on Housing Finance). */
function ltvFor(loan: number): number {
  if (loan <= 3000000) return 0.9;
  if (loan <= 7500000) return 0.8;
  return 0.75;
}

interface YearRow { year: number; opening: number; principal: number; interest: number; closing: number; }

function yearlySchedule(p: number, annualRate: number, months: number): YearRow[] {
  if (p <= 0 || months <= 0) return [];
  const r = annualRate / 12 / 100;
  const emi = calcEMI(p, annualRate, months);
  const rows: YearRow[] = [];
  let bal = p;
  for (let start = 0; start < months && bal > 0.005; start += 12) {
    const opening = bal;
    let principal = 0, interest = 0;
    for (let k = start; k < Math.min(start + 12, months) && bal > 0.005; k++) {
      const i = bal * r;
      const pr = Math.min(emi - i, bal);
      interest += i; principal += pr; bal = Math.max(0, bal - pr);
    }
    rows.push({ year: start / 12 + 1, opening, principal, interest, closing: bal });
  }
  return rows;
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
    <svg role="img" aria-label="Principal and interest paid in each year of the maximum loan"
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
              <text x={x + barW / 2} y={H + 14} textAnchor="middle" style={{ fontSize: rows.length > 20 ? 7 : 9, fill: C.ink3, fontFamily: INTER }}>
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
      aria-label={`Principal ${pPct}% of total repayment, interest ${100 - pPct}%`}
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

/* ─── Sidebar: Quick Facts ───────────────────────────────────── */
function AffordabilityQuickFacts() {
  const rows = [
    { label: 'Max LTV, loan up to Rs 30 L',   value: '90%' },
    { label: 'Max LTV, Rs 30 L to 75 L',     value: '80%' },
    { label: 'Max LTV, above Rs 75 L',       value: '75%' },
    { label: 'SBI home loan max tenure',     value: '30 yrs' },
    { label: 'Microfinance EMI cap (RBI)',   value: '50%' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', fontFamily: INTER, background: C.white }}>
      <div style={{ background: '#f4f5f6', padding: '12px 18px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink }}>Affordability Quick Facts</span>
      </div>
      {rows.map((r, i) => (
        <div key={r.label} style={{ padding: '11px 18px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12.5, color: C.ink2 }}>{r.label}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.ink, whiteSpace: 'nowrap' }}>{r.value}</span>
        </div>
      ))}
      <p style={{ fontSize: 11, color: C.ink3, lineHeight: 1.55, margin: 0, padding: '0 18px 12px' }}>
        LTV limits apply to individual housing loans. The 50% cap is of monthly household income.
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
  { href: '/calculators/home-loan-eligibility-calculator',     label: 'Home Loan Eligibility Calculator' },
  { href: '/calculators/loan-eligibility-calculator',          label: 'Loan Eligibility Calculator' },
  { href: '/calculators/property-affordability-calculator',    label: 'Property Affordability Calculator' },
  { href: '/calculators/debt-to-income-ratio-calculator',      label: 'Debt-to-Income Ratio Calculator' },
  { href: '/calculators/mortgage-calculator',                  label: 'Home Loan EMI Calculator' },
  { href: '/calculators/personal-loan-eligibility-calculator', label: 'Personal Loan Eligibility Calculator' },
  { href: '/calculators/car-loan-eligibility-calculator',      label: 'Car Loan Eligibility Calculator' },
];
const MORE = [
  { href: '/calculators/home-down-payment-calculator',         label: 'Home Down Payment Calculator' },
  { href: '/calculators/home-buying-total-cost-calculator',    label: 'Home Buying Total Cost Calculator' },
  { href: '/calculators/loan-amortization-calculator',         label: 'Loan Amortization Calculator' },
  { href: '/calculators/loan-prepayment-calculator',           label: 'Loan Prepayment Calculator' },
  { href: '/calculators/emi-calculator',                       label: 'EMI Calculator' },
];

/* ─── Table of contents ──────────────────────────────────────── */
const TOC_ITEMS = [
  { id: 'what-is-loan-affordability', label: 'What is loan affordability' },
  { id: 'how-lenders-decide',         label: 'How lenders decide' },
  { id: 'affordability-formula',      label: 'Affordability formula' },
  { id: 'loan-by-salary',             label: 'Loan by salary' },
  { id: 'home-loan-by-salary',        label: 'Home loan and property budget' },
  { id: 'maximum-tenure',             label: 'Maximum tenure' },
  { id: 'tenure-and-affordability',   label: 'Tenure and affordability' },
  { id: 'rate-and-affordability',     label: 'Rate and affordability' },
  { id: 'existing-emis',              label: 'Existing EMIs' },
  { id: 'foir-and-dti',               label: 'FOIR and DTI' },
  { id: 'down-payment-ltv',           label: 'Down payment and LTV' },
  { id: 'lender-max-vs-comfortable',  label: 'Lender max vs comfortable' },
  { id: 'increase-borrowing',         label: 'Borrow more' },
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

/* ─── Tables (one shared style system) ───────────────────────── */
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
                <td key={j} style={j === 0 ? { ...tdR, fontWeight: 600 } : numCols.includes(j) ? { ...tdR, ...right } : tdR}>{cell}</td>
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
export default function LoanAffordabilityClient({ faqs }: { faqs: { q: string; a: string }[] }) {
  const defaultSettings = {
    loanType: 'home' as LoanType,
    monthlyIncome: 60000,
    existingEmi: 0,
    rate: 8.5,
    tenureYr: 20,
    foir: 50,
    comfort: 40,
    age: 30,
    closeAge: 60,
  };
  const { settings, updateSettings } = useCalculatorSettings('loan-affordability', defaultSettings);
  const { loanType, monthlyIncome, existingEmi, rate, tenureYr, foir, comfort, age, closeAge } = settings;
  const type = TYPES[loanType] ?? TYPES.home;

  const setLoanType   = (t: LoanType) => updateSettings({ loanType: t, rate: TYPES[t].rate, tenureYr: TYPES[t].tenure });
  const setIncome     = (v: number) => updateSettings({ monthlyIncome: v });
  const setExisting   = (v: number) => updateSettings({ existingEmi: v });
  const setRate       = (v: number) => updateSettings({ rate: v });
  const setTenure     = (v: number) => updateSettings({ tenureYr: v });
  const setFoir       = (v: number) => updateSettings({ foir: v });
  const setComfort    = (v: number) => updateSettings({ comfort: v });
  const setAge        = (v: number) => updateSettings({ age: v });
  const setCloseAge   = (v: number) => updateSettings({ closeAge: v });

  const [mobile, setMobile] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  const { formatCurrency, convertCurrency, selectedCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  /* ── Core calculations ── */
  const ageCap = Math.max(1, closeAge - age);
  const tenureMax = Math.min(type.maxTenure, ageCap);
  const tenure = Math.max(1, Math.min(tenureYr, tenureMax));
  const cappedByAge = tenureYr > tenureMax && ageCap < type.maxTenure;
  const months = tenure * 12;

  const maxEmi = Math.max(0, (monthlyIncome * foir) / 100 - existingEmi);
  const comfortEmi = Math.max(0, (monthlyIncome * Math.min(comfort, foir)) / 100 - existingEmi);
  const maxLoan = maxLoanForEMI(maxEmi, rate, months);
  const comfortLoan = maxLoanForEMI(comfortEmi, rate, months);
  const totalRepay = maxEmi * months;
  const totalInterest = Math.max(0, totalRepay - maxLoan);
  const incomeLeft = Math.max(0, monthlyIncome - existingEmi - maxEmi);
  const loanToIncome = monthlyIncome > 0 ? maxLoan / (monthlyIncome * 12) : 0;

  const ltv = ltvFor(maxLoan);
  const propertyValue = maxLoan / ltv;
  const downPayment = propertyValue - maxLoan;

  const isDeficit = maxEmi <= 0;
  const principalPct = totalRepay > 0 ? Math.round((maxLoan / totalRepay) * 100) : 0;
  const interestPct = 100 - principalPct;

  const schedule = useMemo(() => yearlySchedule(maxLoan, rate, months), [maxLoan, rate, months]);
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
  const codeBox = { background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16, overflowX: 'auto' } as React.CSSProperties;
  const code = { fontFamily: 'monospace', fontSize: 14, color: C.dark, lineHeight: 1.9, whiteSpace: 'pre' } as React.CSSProperties;
  const cellTd: React.CSSProperties = { ...tdR, fontSize: 13 };
  const cellNum: React.CSSProperties = { ...cellTd, ...right };

  const resultRows = [
    { label: 'EMI at lender limit', value: fmtIN(maxEmi) },
    { label: `EMI at your ${Math.min(comfort, foir)}% limit`, value: fmtIN(comfortEmi) },
    { label: 'Income left after all EMIs', value: fmtC(incomeLeft) },
    { label: 'Tenure used', value: `${tenure} yr${cappedByAge ? ' (age cap)' : ''}` },
    { label: 'Total interest', value: fmtC(totalInterest) },
    { label: 'Loan to annual income', value: `${loanToIncome.toFixed(2)}x` },
    ...(loanType === 'home' ? [
      { label: `Property value (${Math.round(ltv * 100)}% LTV)`, value: fmtC(propertyValue) },
      { label: 'Minimum down payment', value: fmtC(downPayment) },
    ] : [
      { label: 'Total repayment', value: fmtC(totalRepay) },
      { label: 'Interest as % of loan', value: `${maxLoan > 0 ? ((totalInterest / maxLoan) * 100).toFixed(1) : '0.0'}%` },
    ]),
  ];

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Loan Affordability Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            See the maximum home, personal or car loan your income supports, how much stays comfortable after your other expenses, and the down payment a home needs under RBI rules.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            <section aria-label="Loan Affordability Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              {/* Loan type tabs */}
              <div role="tablist" aria-label="Loan type" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                {(Object.keys(TYPES) as LoanType[]).map(t => (
                  <button key={t} id={`tab-${t}`} role="tab" aria-selected={loanType === t} aria-controls={`panel-${t}`}
                    onClick={() => setLoanType(t)}
                    style={{ flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer', fontSize: mobile ? 12.5 : 13.5, fontWeight: loanType === t ? 700 : 400, color: loanType === t ? C.dark : C.ink3, borderBottom: loanType === t ? `2.5px solid ${C.dark}` : '2.5px solid transparent', transition: 'all 0.15s', fontFamily: INTER }}>
                    {TYPES[t].label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div id={`panel-${loanType}`} role="tabpanel" aria-labelledby={`tab-${loanType}`} style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{showAdvanced ? 'More Settings' : 'Inputs'}</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider label="Monthly Take-Home Income" id="la-income" value={monthlyIncome} min={10000} max={1000000} step={1000} fmt={fmtC} onChange={setIncome} compact={mobile} />
                      <Slider label="Existing Monthly EMIs" id="la-existing" value={existingEmi} min={0} max={200000} step={500} fmt={fmtC} onChange={setExisting} compact={mobile} />
                      <Slider label="Interest Rate (p.a.)" id="la-rate" value={rate} min={5} max={30} step={0.05} fmt={v => `${v.toFixed(2)}%`} onChange={setRate} compact={mobile} />
                      <Slider label="Loan Tenure" id="la-tenure" value={tenure} min={1} max={tenureMax} step={1} fmt={v => `${v} yr`} onChange={setTenure} compact={mobile}
                        extra={
                          <div role="group" aria-label="Tenure presets" style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 12 }}>
                            {type.presets.filter(y => y <= tenureMax).map(y => (
                              <button key={y} onClick={() => setTenure(y)} aria-pressed={tenure === y}
                                style={{ padding: '3px 8px', fontSize: 12, background: C.white, color: tenure === y ? C.ink : C.ink3, border: `${tenure === y ? 1.5 : 1}px solid ${tenure === y ? C.ink : C.border}`, fontWeight: tenure === y ? 700 : 500, borderRadius: 6, cursor: 'pointer', fontFamily: INTER, transition: 'all 0.15s' }}>
                                {y}Y
                              </button>
                            ))}
                          </div>
                        } />
                      <div style={{ padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 24 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: C.ink, fontWeight: 700, marginBottom: 4 }}>
                          <span>Available EMI for this loan</span>
                          <span>{fmtC(maxEmi)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.ink2, marginBottom: 2 }}>
                          <span>EMI budget ({foir}% of income)</span>
                          <span>{fmtC((monthlyIncome * foir) / 100)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.ink2 }}>
                          <span>Less existing EMIs</span>
                          <span>{fmtC(existingEmi)}</span>
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
                      <Slider label="Lender FOIR Limit" id="la-foir" value={foir} min={30} max={70} step={1} fmt={v => `${v}%`} onChange={setFoir} compact={mobile} />
                      <Slider label="Your Comfort Limit for EMIs" id="la-comfort" value={comfort} min={20} max={70} step={1} fmt={v => `${v}%`} onChange={setComfort} compact={mobile} />
                      <Slider label="Your Age" id="la-age" value={age} min={21} max={65} step={1} fmt={v => `${v} yr`} onChange={setAge} compact={mobile} />
                      <Slider label="Loan Must Close By Age" id="la-close" value={closeAge} min={55} max={75} step={1} fmt={v => `${v} yr`} onChange={setCloseAge} compact={mobile} />
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: '0 0 24px' }}>
                        FOIR limits and closing age vary by lender. The comfort limit is your own ceiling for all EMIs as a share of income; it never exceeds the lender limit.
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
                  {isDeficit ? (
                    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.ink3}`, padding: 20, borderRadius: 12, width: '100%' }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: C.ink, marginBottom: 8 }}>No room for a new EMI</div>
                      <div style={{ color: C.ink2, fontSize: 14, lineHeight: 1.6 }}>
                        Your existing EMIs of {fmtC(existingEmi)} already use the {foir}% limit on {fmtC(monthlyIncome)} of income. Closing a loan, adding a co-applicant or a higher lender limit would create room.
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 8 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                          <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Maximum Loan</span>
                          <span style={{ fontSize: 12, color: '#7A8087' }}>Comfortable Loan</span>
                        </div>
                        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                          <span aria-live="polite" aria-label={`Maximum loan: ${fmtIN(maxLoan)}`} style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                            {fmtC(maxLoan)}
                          </span>
                          <span style={{ fontSize: 15, fontWeight: 700, color: '#101214' }}>{fmtC(comfortLoan)}</span>
                        </div>
                      </div>

                      {resultRows.map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink, textAlign: 'right' }}>{value}</span>
                        </div>
                      ))}

                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                        <DonutChart principal={maxLoan} interest={totalInterest} />
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
                    </>
                  )}
                </div>
              </div>

              {/* Repayment schedule */}
              {!isDeficit && schedule.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowSchedule(v => !v)} aria-expanded={showSchedule} aria-controls="affordability-schedule"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0, textAlign: 'left' }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Repayment Schedule</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>For the maximum loan</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {tenure} yr · {rate.toFixed(2)}%
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showSchedule ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showSchedule && (
                    <div id="affordability-schedule" style={{ borderTop: `1px solid ${C.border}` }}>
                      <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                        <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>Principal</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>Interest</span>
                          </div>
                        </div>
                        <BarChart rows={schedule} />
                        <p style={{ fontSize: 11.5, color: C.ink3, margin: '6px 0 14px' }}>Principal and interest paid in each loan year.</p>
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
                      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
                        <table style={{ minWidth: 560, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: mobile ? '8px 16px 14px' : '8px 44px 16px' }}>
                            Year-by-year repayment of the maximum loan. All values in {currencyCode}.
                          </caption>
                          <thead>
                            <tr>
                              {['Year', 'Opening Balance', 'Principal', 'Interest', 'Closing Balance'].map((h, i) => (
                                <th key={h} scope="col" style={i === 0 ? thS : { ...thS, ...right }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {schedule.map((r, i) => (
                              <tr key={r.year} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ ...cellTd, fontWeight: 600 }}>{r.year}</td>
                                <td style={cellNum}>{fmtIN(r.opening)}</td>
                                <td style={cellNum}>{fmtIN(r.principal)}</td>
                                <td style={cellNum}>{fmtIN(r.interest)}</td>
                                <td style={cellNum}>{fmtIN(r.closing)}</td>
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

              <TableOfContents />

              <div style={sec}>
                <h2 style={h2} id="what-is-loan-affordability">What Is Loan Affordability?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Loan affordability is the largest loan you can repay from your income without falling behind, given your other EMIs, the interest rate and the tenure. It is worked backwards from the EMI your income can carry.
                  </p>
                </div>
                <p style={p}>
                  Two numbers matter. The lender maximum is the most a lender will approve under its own income rules. The comfortable amount is what you can repay while still covering rent, family costs and savings.
                </p>
                <p style={p}>
                  Most borrowers only see the first number, because that is what a lender quotes. This calculator shows both, so you can decide how much of the lender&apos;s offer to actually take.
                </p>
                <p style={p}>
                  Affordability is not the same as approval. A lender also checks your credit history, job or business stability and, for a home loan, the property itself. Use the <Link href="/calculators/loan-eligibility-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Loan Eligibility Calculator</Link> for a lender-style eligibility check.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-lenders-decide">How Lenders Decide How Much You Can Borrow</h2>
                <p style={p}>Lenders size a loan from five inputs, and income is only the first of them.</p>
                <ul style={ulS}>
                  <li style={li}><strong style={strong}>Income:</strong> regular monthly income, assessed from salary slips and bank statements, or from income tax returns if you are self-employed.</li>
                  <li style={li}><strong style={strong}>Existing EMIs:</strong> every EMI you already pay comes out of the same income before the new loan is sized.</li>
                  <li style={li}><strong style={strong}>FOIR limit:</strong> the share of income a lender allows for all EMIs together, set in its own credit policy.</li>
                  <li style={li}><strong style={strong}>Rate and tenure:</strong> together these decide how much loan each rupee of EMI can repay.</li>
                  <li style={li}><strong style={strong}>Age:</strong> lenders usually want the loan repaid by a set age, which caps the tenure for older borrowers.</li>
                </ul>
                <p style={p}>
                  For a home loan there is a sixth limit: the loan cannot exceed RBI&apos;s loan-to-value ceiling for the property, whatever your income supports.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="affordability-formula">Loan Affordability Formula</h2>
                <p style={p}>The maximum loan is found in two steps: first the EMI your income can carry, then the loan that EMI repays.</p>
                <div style={codeBox}>
                  <code style={code}>
                    Available EMI = Monthly income × FOIR limit − Existing EMIs{'\n'}
                    Maximum loan  = EMI × [(1 + r)^n − 1] ÷ [r × (1 + r)^n]{'\n'}
                    r = annual rate ÷ 12 ÷ 100,  n = tenure in months
                  </code>
                </div>
                <h3 style={h3}>Worked example</h3>
                <p style={p}>
                  Take a Rs 60,000 monthly income, a Rs 5,000 EMI on an existing car loan, a 50% FOIR limit, and a home loan at 8.5% for 20 years.
                </p>
                <ol style={olS}>
                  <li style={li}><strong style={strong}>EMI limit:</strong> 50% of Rs 60,000 is Rs 30,000.</li>
                  <li style={li}><strong style={strong}>Available for the new loan:</strong> Rs 30,000 − Rs 5,000 = Rs 25,000.</li>
                  <li style={li}><strong style={strong}>Loan factor:</strong> r = 0.0070833, n = 240, (1 + r)^240 = 5.441243, so each Rs 1 of EMI supports Rs 115.23 of loan.</li>
                  <li style={li}><strong style={strong}>Maximum loan:</strong> Rs 25,000 × 115.23 = about Rs 28.81 lakh.</li>
                </ol>
                <p style={p}>
                  Over 20 years that loan costs Rs 60 lakh in total repayments, of which Rs 31.19 lakh is interest. The loan is 4.0 times the borrower&apos;s annual income.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="loan-by-salary">How Much Loan Can I Get on My Salary?</h2>
                <p style={p}>
                  At a 50% FOIR limit with no other EMIs, half of your monthly income becomes the EMI budget. The table converts that budget into the maximum home, personal and car loan.
                </p>
                <DataTable
                  caption="50% FOIR limit, no existing EMIs. Home loan at 8.5% for 20 years, personal loan at 12% for 5 years, car loan at 9% for 5 years. Rates are illustrative, not lender quotes."
                  head={['Monthly Income', 'EMI Budget', 'Home Loan', 'Personal Loan', 'Car Loan']}
                  numCols={[1, 2, 3, 4]}
                  minWidth={600}
                  rows={[
                    ['Rs 25,000', 'Rs 12,500', 'Rs 14.40 L', 'Rs 5.62 L', 'Rs 6.02 L'],
                    ['Rs 30,000', 'Rs 15,000', 'Rs 17.28 L', 'Rs 6.74 L', 'Rs 7.23 L'],
                    ['Rs 40,000', 'Rs 20,000', 'Rs 23.05 L', 'Rs 8.99 L', 'Rs 9.63 L'],
                    ['Rs 50,000', 'Rs 25,000', 'Rs 28.81 L', 'Rs 11.24 L', 'Rs 12.04 L'],
                    ['Rs 60,000', 'Rs 30,000', 'Rs 34.57 L', 'Rs 13.49 L', 'Rs 14.45 L'],
                    ['Rs 75,000', 'Rs 37,500', 'Rs 43.21 L', 'Rs 16.86 L', 'Rs 18.07 L'],
                    ['Rs 1,00,000', 'Rs 50,000', 'Rs 57.62 L', 'Rs 22.48 L', 'Rs 24.09 L'],
                  ]} />
                <p style={p}>
                  The same EMI budget supports far less on a personal or car loan because the tenure is a quarter as long and the rate is higher. On a personal loan, lenders also apply their own maximum loan amounts, so treat these as ceilings.
                </p>
                <p style={p}>
                  For a personal loan on a Rs 60,000 income, the ceiling moves with the tenure: about Rs 9.03 lakh over 3 years, Rs 11.39 lakh over 4 years and Rs 13.49 lakh over 5 years at 12%.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="home-loan-by-salary">Home Loan and Property Budget by Salary</h2>
                <p style={p}>
                  A home loan is also capped by the property&apos;s value. RBI&apos;s loan-to-value limits decide the smallest down payment you can make, and the band changes with the loan size.
                </p>
                <DataTable
                  caption="50% FOIR limit, no existing EMIs, 8.5% for 20 years. Property value is the highest the loan can finance under RBI LTV limits, before stamp duty and registration."
                  head={['Monthly Income', 'Max Home Loan', 'LTV Band', 'Max Property Value', 'Min Down Payment']}
                  numCols={[1, 2, 3, 4]}
                  minWidth={620}
                  rows={[
                    ['Rs 20,000', 'Rs 11.52 L', '90%', 'Rs 12.80 L', 'Rs 1.28 L'],
                    ['Rs 30,000', 'Rs 17.28 L', '90%', 'Rs 19.21 L', 'Rs 1.92 L'],
                    ['Rs 40,000', 'Rs 23.05 L', '90%', 'Rs 25.61 L', 'Rs 2.56 L'],
                    ['Rs 50,000', 'Rs 28.81 L', '90%', 'Rs 32.01 L', 'Rs 3.20 L'],
                    ['Rs 60,000', 'Rs 34.57 L', '80%', 'Rs 43.21 L', 'Rs 8.64 L'],
                    ['Rs 75,000', 'Rs 43.21 L', '80%', 'Rs 54.01 L', 'Rs 10.80 L'],
                    ['Rs 1,00,000', 'Rs 57.62 L', '80%', 'Rs 72.02 L', 'Rs 14.40 L'],
                    ['Rs 1,50,000', 'Rs 86.42 L', '75%', 'Rs 1.15 Cr', 'Rs 28.81 L'],
                    ['Rs 2,00,000', 'Rs 1.15 Cr', '75%', 'Rs 1.54 Cr', 'Rs 38.41 L'],
                  ]} />
                <p style={p}>
                  Notice the jump between Rs 50,000 and Rs 60,000. Once the loan crosses Rs 30 lakh, the maximum LTV drops from 90% to 80%, so the minimum down payment more than doubles.
                </p>
                <p style={p}>
                  To plan how long it takes to save that down payment, use the <Link href="/calculators/home-down-payment-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Home Down Payment Calculator</Link>.
                </p>
              </div>

              <PromoBar href="/calculators/home-loan-eligibility-calculator" title="Home Loan Eligibility Calculator"
                text="Check your home loan limit with a lender-style eligibility view based on salary and credit score." />

              <div style={sec}>
                <h2 style={h2} id="maximum-tenure">Maximum Loan Tenure by Loan Type and Age</h2>
                <p style={p}>
                  The longest tenure you can get depends on the loan type and on your age, because lenders want the loan repaid by a set age.
                </p>
                <DataTable
                  caption="SBI's published maximums, shown as one reference point. Other lenders set their own limits."
                  head={['Loan Type', 'Maximum Tenure (SBI)', 'Age Condition']}
                  rows={[
                    ['Home loan', 'Up to 30 years', 'Repaid by age 70 (75 under some schemes)'],
                    ['Personal loan (Xpress Credit)', '6 months to 6 years', 'Within the lender’s age and service rules'],
                    ['Car loan, new car', 'Up to 7 years', 'Within the lender’s age rules'],
                    ['Car loan, used car', 'Up to 5 years', 'Within the lender’s age rules'],
                  ]} />
                <p style={p}>
                  Age often matters more than the product maximum. If a lender wants the loan closed by 60, a 45-year-old can borrow for 15 years at most. On a Rs 25,000 EMI at 8.5%, that caps the home loan at about Rs 25.39 lakh.
                </p>
                <p style={p}>
                  The same borrower with a lender that allows repayment up to 70 could take 25 years and about Rs 31.05 lakh. Set your age and the lender&apos;s closing age under More settings to see the effect.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="tenure-and-affordability">How Tenure Changes How Much You Can Borrow</h2>
                <p style={p}>A longer tenure lets the same EMI repay a bigger loan, but each extra year adds less loan and more interest.</p>
                <DataTable
                  caption="Rs 25,000 EMI (Rs 50,000 income at a 50% limit), home loan at 8.5%."
                  head={['Tenure', 'Maximum Loan', 'Total Interest']}
                  numCols={[1, 2]}
                  rows={[
                    ['10 years', 'Rs 20.16 L', 'Rs 9.84 L'],
                    ['15 years', 'Rs 25.39 L', 'Rs 19.61 L'],
                    ['20 years', 'Rs 28.81 L', 'Rs 31.19 L'],
                    ['25 years', 'Rs 31.05 L', 'Rs 43.95 L'],
                    ['30 years', 'Rs 32.51 L', 'Rs 57.49 L'],
                  ]} />
                <p style={p}>
                  Going from 20 to 30 years adds only Rs 3.70 lakh of loan but Rs 26.30 lakh of interest. A longer tenure is best used as a safety margin, paired with prepayments; the <Link href="/calculators/loan-prepayment-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Loan Prepayment Calculator</Link> shows how much that saves.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="rate-and-affordability">How the Interest Rate Changes How Much You Can Borrow</h2>
                <p style={p}>A higher rate means each rupee of EMI covers more interest and less principal, so the maximum loan falls.</p>
                <DataTable
                  caption="Rs 25,000 EMI, 20-year tenure."
                  head={['Interest Rate', 'Maximum Loan']}
                  numCols={[1]}
                  rows={[
                    ['7.5%', 'Rs 31.03 L'],
                    ['8.0%', 'Rs 29.89 L'],
                    ['8.5%', 'Rs 28.81 L'],
                    ['9.0%', 'Rs 27.79 L'],
                    ['9.5%', 'Rs 26.82 L'],
                    ['10.0%', 'Rs 25.91 L'],
                  ]} />
                <p style={p}>
                  Each 0.5% of rate moves the maximum loan by roughly Rs 1 lakh here. On a floating-rate loan the rate can also rise after you borrow, which is one reason to leave room below the lender maximum.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="existing-emis">How Existing EMIs Reduce Your Borrowing Capacity</h2>
                <p style={p}>Every rupee of existing EMI removes a rupee from the budget for the new loan, and on a long loan that rupee was worth a lot of principal.</p>
                <DataTable
                  caption="Rs 60,000 income, 50% limit, home loan at 8.5% for 20 years."
                  head={['Existing EMIs', 'EMI Left for New Loan', 'Maximum Home Loan', 'Capacity Lost']}
                  numCols={[1, 2, 3]}
                  rows={[
                    ['Nil', 'Rs 30,000', 'Rs 34.57 L', 'Nil'],
                    ['Rs 5,000', 'Rs 25,000', 'Rs 28.81 L', 'Rs 5.76 L'],
                    ['Rs 10,000', 'Rs 20,000', 'Rs 23.05 L', 'Rs 11.52 L'],
                    ['Rs 15,000', 'Rs 15,000', 'Rs 17.28 L', 'Rs 17.28 L'],
                  ]} />
                <p style={p}>
                  A Rs 10,000 car or personal loan EMI costs Rs 11.52 lakh of home loan capacity. If that loan has only a year or two left, closing it before applying can be the single biggest boost to what you can borrow.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="foir-and-dti">FOIR and Debt-to-Income Ratio</h2>
                <p style={p}>
                  FOIR (Fixed Obligation to Income Ratio) is the share of monthly income that goes to all loan EMIs, including the new one. Outside India the same idea is usually called the debt-to-income ratio.
                </p>
                <p style={p}>
                  For most retail loans, the FOIR limit is set by each lender&apos;s credit policy and can differ by income level, loan type and employment type. This calculator uses 50% by default; change it under More settings to match a lender.
                </p>
                <p style={p}>
                  RBI applies a hard cap of this kind to microfinance loans. Under its <a href="https://www.rbi.org.in/commonman/Upload/English/FAQs/PDFs/RFML30012025.pdf" target="_blank" rel="noopener noreferrer" style={lnk}>2022 microfinance framework</a>, repayments on all loans of a household cannot exceed 50% of monthly household income.
                </p>
                <p style={p}>
                  The <Link href="/calculators/debt-to-income-ratio-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Debt-to-Income Ratio Calculator</Link> shows where your current EMIs already put you.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="down-payment-ltv">Home Loan Down Payment and RBI LTV Limits</h2>
                <p style={p}>
                  RBI caps how much of a home&apos;s cost a lender can finance, so a home loan always needs a down payment from your own savings.
                </p>
                <DataTable
                  caption="Maximum loan-to-value ratio for individual housing loans, per the RBI Master Circular on Housing Finance."
                  head={['Loan Amount', 'Maximum LTV', 'Minimum Down Payment']}
                  numCols={[1, 2]}
                  rows={[
                    ['Up to Rs 30 lakh', '90%', '10% of property cost'],
                    ['Above Rs 30 lakh to Rs 75 lakh', '80%', '20% of property cost'],
                    ['Above Rs 75 lakh', '75%', '25% of property cost'],
                  ]} />
                <p style={p}>
                  The <a href="https://www.rbi.org.in/scripts/NotificationUser.aspx?Id=12243&Mode=0" target="_blank" rel="noopener noreferrer" style={lnk}>RBI Master Circular</a> also tells banks not to include stamp duty, registration and documentation charges in the property cost they finance. The one exception is a home costing up to Rs 10 lakh.
                </p>
                <p style={p}>
                  So the cash you need is the down payment plus stamp duty, registration and other costs. The <Link href="/calculators/home-buying-total-cost-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Home Buying Total Cost Calculator</Link> adds all of these up.
                </p>
              </div>

              <PromoBar href="/calculators/home-buying-total-cost-calculator" title="Home Buying Total Cost Calculator"
                text="Add stamp duty, registration and other costs to your down payment to see the full cash you need." />

              <div style={sec}>
                <h2 style={h2} id="lender-max-vs-comfortable">Lender Maximum vs Comfortable Loan</h2>
                <p style={p}>
                  The lender maximum is a ceiling, not a recommendation. It assumes your income stays the same, the rate never rises and no new big expense appears for 20 years.
                </p>
                <DataTable
                  caption="Rs 60,000 income, no existing EMIs, home loan at 8.5% for 20 years."
                  head={['EMI Limit', 'Monthly EMI', 'Maximum Loan', 'Left Each Month']}
                  numCols={[1, 2, 3]}
                  rows={[
                    ['50% (lender limit)', 'Rs 30,000', 'Rs 34.57 L', 'Rs 30,000'],
                    ['40% (comfort limit)', 'Rs 24,000', 'Rs 27.66 L', 'Rs 36,000'],
                  ]} />
                <p style={p}>
                  Borrowing Rs 6.91 lakh less keeps Rs 6,000 more each month for savings, insurance and emergencies. Set your own comfort limit under More settings; the result panel shows both loans side by side.
                </p>
                <p style={p}>
                  A useful test: could you still pay the EMI if the rate rose by 1% and a family expense doubled? If not, the comfortable figure is the one to plan around.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="increase-borrowing">How to Increase How Much You Can Borrow</h2>
                <ul style={ulS}>
                  <li style={li}><strong style={strong}>Add an earning co-applicant:</strong> combined income raises the EMI budget. A co-applicant earning Rs 40,000 lifts a Rs 60,000 earner&apos;s 20-year, 8.5% home loan from Rs 34.57 lakh to Rs 57.62 lakh at a 50% limit.</li>
                  <li style={li}><strong style={strong}>Close small loans first:</strong> clearing an Rs 8,000 EMI on a Rs 50,000 income frees about Rs 9.22 lakh of home loan capacity.</li>
                  <li style={li}><strong style={strong}>Choose a longer tenure:</strong> it lifts the maximum, but adds interest, as the tenure table above shows.</li>
                  <li style={li}><strong style={strong}>Qualify for a lower rate:</strong> a clean repayment history and a strong credit score help you get better pricing, and each 0.5% lower rate adds roughly Rs 1 lakh of capacity on a Rs 25,000 EMI.</li>
                  <li style={li}><strong style={strong}>Declare all regular income:</strong> documented rental or other recurring income can count, depending on the lender.</li>
                </ul>
              </div>

              <div style={sec}>
                <h2 style={h2} id="common-mistakes">Common Loan Affordability Mistakes</h2>
                <ul style={ulS}>
                  <li style={li}><strong style={strong}>Borrowing the full lender maximum:</strong> it leaves no margin for a rate rise or a drop in income.</li>
                  <li style={li}><strong style={strong}>Forgetting the down payment and fees:</strong> the loan never covers the whole home cost, stamp duty or registration.</li>
                  <li style={li}><strong style={strong}>Leaving out small EMIs:</strong> a phone EMI or a credit card EMI still counts against your FOIR limit.</li>
                  <li style={li}><strong style={strong}>Using a bonus-inflated income:</strong> one-off bonuses do not repay a monthly EMI; use regular take-home pay.</li>
                  <li style={li}><strong style={strong}>Picking the longest tenure by default:</strong> it raises the loan a little and the interest a lot.</li>
                </ul>
              </div>

              <div style={sec}>
                <h2 style={h2} id="limitations">Limitations of This Calculator</h2>
                <p style={p}><strong style={strong}>Lender rules vary.</strong> FOIR limits, how income is assessed and the closing age differ between lenders and loan products, so treat the result as an estimate.</p>
                <p style={p}><strong style={strong}>Credit checks are not modelled.</strong> Your credit score and history can lower the offer or raise the rate, which reduces the loan.</p>
                <p style={p}><strong style={strong}>Rates are held constant.</strong> A floating rate can change after you borrow, changing the EMI or the tenure.</p>
                <p style={p}><strong style={strong}>Lender caps are not applied.</strong> Personal and car loans also have maximum amounts set by each lender, and car loans have their own financing limits on the vehicle price.</p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This Loan Affordability Calculator</h2>
                <ol style={olS}>
                  <li style={li}><strong style={strong}>Loan type:</strong> pick Home Loan, Personal Loan or Car Loan. This sets a typical rate and tenure limit, both of which you can change.</li>
                  <li style={li}><strong style={strong}>Income and EMIs:</strong> enter regular monthly take-home income and the total of all EMIs you already pay.</li>
                  <li style={li}><strong style={strong}>Rate and tenure:</strong> enter the expected rate and tenure, or tap a preset.</li>
                  <li style={li}><strong style={strong}>More settings:</strong> set the lender FOIR limit, your own comfort limit, your age and the age by which the loan must close.</li>
                  <li style={li}><strong style={strong}>Read both answers:</strong> compare the maximum loan with the comfortable loan. For a home loan, check the property value and minimum down payment.</li>
                  <li style={li}><strong style={strong}>Repayment schedule:</strong> open it to see how the maximum loan is repaid year by year. The <Link href="/calculators/loan-amortization-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Loan Amortization Calculator</Link> shows the full monthly schedule.</li>
                </ol>
              </div>


              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ items={faqs} />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only and based on the inputs provided. Actual loan offers depend on each lender&apos;s credit policy, your credit history, income assessment, property valuation and current rates. Rates used in examples are illustrative, not lender quotes, and tenure limits cited are one lender&apos;s published terms. This calculator is for educational and planning purposes only and does not constitute financial advice. Consult your lender or a qualified CA before borrowing.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .loan-afford-sidebar::-webkit-scrollbar { width: 5px; }
            .loan-afford-sidebar::-webkit-scrollbar-track { background: transparent; }
            .loan-afford-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .loan-afford-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            aria-label="Related calculators"
            className="loan-afford-sidebar"
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
            <div style={{ flexShrink: 0 }}><AffordabilityQuickFacts /></div>
            <div style={{ flexShrink: 0 }}><SidebarList title="Popular Calculators" items={POPULAR} /></div>
            <div style={{ flexShrink: 0 }}><SidebarList title="More Calculators" items={MORE} /></div>
          </aside>

        </div>
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

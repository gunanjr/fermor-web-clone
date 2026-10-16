'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useEffect, useLayoutEffect, useMemo } from 'react';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { FAQBox } from '@/components/common/FAQBox';

/* Palette */
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

/* Settings type */
interface Settings {
  fdAmount: number;
  fdTenure: 1 | 2 | 3 | 5;
  isSenior: boolean;
  savingsAmount: number;
  homeLoanAmount: number;
  homeLoanTenure: 5 | 10 | 15 | 20 | 25 | 30;
  personalLoanAmount: number;
  personalLoanTenure: 1 | 2 | 3 | 5;
  goldLoanAmount: number;
  goldLoanTenure: number;
}

const DEFAULT_SETTINGS: Settings = {
  fdAmount: 500000,
  fdTenure: 1,
  isSenior: false,
  savingsAmount: 200000,
  homeLoanAmount: 7500000,
  homeLoanTenure: 20,
  personalLoanAmount: 500000,
  personalLoanTenure: 3,
  goldLoanAmount: 300000,
  goldLoanTenure: 1,
};

/* Bank Data */
interface FDBank {
  name: string;
  rates: Partial<Record<1 | 2 | 3 | 5, number>>;
  seniorExtra: number;
}

const FD_BANKS: FDBank[] = [
  { name: 'Yes Bank',        rates: { 1: 7.75, 2: 7.75, 3: 7.25, 5: 7.25 }, seniorExtra: 0.50 },
  { name: 'IDFC First Bank', rates: { 1: 7.50, 2: 7.50, 3: 7.50, 5: 7.00 }, seniorExtra: 0.50 },
  { name: 'IndusInd Bank',   rates: { 1: 7.25, 2: 7.25, 3: 7.25, 5: 7.25 }, seniorExtra: 0.50 },
  { name: 'Post Office (NSC)', rates: { 1: 7.10, 3: 7.70 },                  seniorExtra: 0.00 },
  { name: 'Axis Bank',       rates: { 1: 7.10, 2: 7.15, 3: 7.10, 5: 7.00 }, seniorExtra: 0.50 },
  { name: 'Kotak Mahindra',  rates: { 1: 7.10, 2: 7.10, 3: 7.10, 5: 6.20 }, seniorExtra: 0.50 },
  { name: 'HDFC Bank',       rates: { 1: 7.00, 2: 7.00, 3: 7.00, 5: 7.00 }, seniorExtra: 0.50 },
  { name: 'ICICI Bank',      rates: { 1: 6.90, 2: 7.00, 3: 7.00, 5: 7.00 }, seniorExtra: 0.50 },
  { name: 'Bank of Baroda',  rates: { 1: 6.85, 2: 7.00, 3: 7.00, 5: 6.50 }, seniorExtra: 0.50 },
  { name: 'SBI',             rates: { 1: 6.80, 2: 7.00, 3: 6.75, 5: 6.50 }, seniorExtra: 0.50 },
  { name: 'PNB',             rates: { 1: 6.80, 2: 6.80, 3: 6.80, 5: 6.50 }, seniorExtra: 0.80 },
  { name: 'Canara Bank',     rates: { 1: 6.70, 2: 6.80, 3: 6.70, 5: 6.70 }, seniorExtra: 0.50 },
];

interface SimpleBank {
  name: string;
  rate: number;
  note?: string;
}

const SAVINGS_BANKS: SimpleBank[] = [
  { name: 'Yes Bank',          rate: 7.00, note: 'Up to Rs 1 Cr' },
  { name: 'IDFC First Bank',   rate: 7.00, note: 'Up to Rs 1 Cr' },
  { name: 'IndusInd Bank',     rate: 4.00 },
  { name: 'Post Office Savings', rate: 4.00 },
  { name: 'Kotak Mahindra',    rate: 4.00, note: 'Above Rs 1L' },
  { name: 'Axis Bank',         rate: 3.50, note: 'Above Rs 50L' },
  { name: 'HDFC Bank',         rate: 3.50, note: 'Above Rs 50L' },
  { name: 'Canara Bank',       rate: 2.90 },
  { name: 'Bank of Baroda',    rate: 2.75 },
  { name: 'SBI',               rate: 2.70 },
  { name: 'PNB',               rate: 2.70 },
  { name: 'ICICI Bank',        rate: 3.00 },
];

const HOME_LOAN_BANKS: SimpleBank[] = [
  { name: 'Bank of Baroda',       rate: 7.15 },
  { name: 'SBI (EBLR-linked)',     rate: 7.25 },
  { name: 'Bank of India',         rate: 7.30 },
  { name: 'HDFC Bank',             rate: 7.35 },
  { name: 'PNB',                   rate: 7.40 },
  { name: 'Canara Bank',           rate: 7.40 },
  { name: 'LIC Housing Finance',   rate: 7.50 },
  { name: 'Axis Bank',             rate: 7.75 },
  { name: 'ICICI Bank',            rate: 7.90 },
  { name: 'Kotak Mahindra',        rate: 7.90 },
];

const PERSONAL_LOAN_BANKS: SimpleBank[] = [
  { name: 'SBI',          rate: 10.30 },
  { name: 'PNB',          rate: 10.40 },
  { name: 'Axis Bank',    rate: 10.49 },
  { name: 'IndusInd Bank', rate: 10.49 },
  { name: 'HDFC Bank',    rate: 10.50 },
  { name: 'Bank of Baroda', rate: 10.85 },
  { name: 'Kotak Mahindra', rate: 10.99 },
  { name: 'ICICI Bank',   rate: 10.65 },
  { name: 'Yes Bank',     rate: 11.99 },
];

const GOLD_LOAN_BANKS: SimpleBank[] = [
  { name: 'SBI',               rate: 8.75 },
  { name: 'Canara Bank',        rate: 8.75 },
  { name: 'PNB',               rate: 8.75 },
  { name: 'Bank of Baroda',     rate: 8.80 },
  { name: 'ICICI Bank',         rate: 9.00 },
  { name: 'HDFC Bank',          rate: 9.50 },
  { name: 'Axis Bank',          rate: 9.50 },
  { name: 'Muthoot Finance',    rate: 12.00 },
  { name: 'Manappuram',         rate: 12.00 },
];

/* Math helpers */
function calcFDMaturity(p: number, annualRate: number, years: number): number {
  if (p <= 0 || annualRate <= 0 || years <= 0) return p;
  return p * Math.pow(1 + annualRate / 400, 4 * years);
}

function calcEMI(p: number, annualRate: number, months: number): number {
  if (months === 0 || p === 0) return 0;
  if (annualRate === 0) return p / months;
  const r = annualRate / 12 / 100;
  return (p * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

function calcTotalInterest(p: number, annualRate: number, months: number): number {
  const emi = calcEMI(p, annualRate, months);
  return emi * months - p;
}

function calcSimpleInterest(p: number, annualRate: number, years: number): number {
  return p * (annualRate / 100) * years;
}

/* Formatter helper */
function fmtINR(n: number): string {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(n));
}

/* Slider component */
function Slider({
  label, id: idProp, value, min, max, step, display, onChange, compact,
}: {
  label: string; id?: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (v: number) => void; compact?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const inputId = idProp || label.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-input';
  const rangeId = `${inputId}-range`;
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };

  return (
    <div style={{ marginBottom: compact ? 18 : 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 8 : 12 }}>
        {label ? (
          <label htmlFor={editing ? inputId : rangeId}
            style={{ fontSize: compact ? 13 : 14.5, color: C.ink2, fontWeight: 400, fontFamily: INTER }}>{label}</label>
        ) : <span />}
        {editing ? (
          <input id={inputId} autoFocus value={raw}
            aria-label={`Enter ${label} value`}
            onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: '7px 12px', width: 130, outline: 'none', color: C.dark, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${display}. Click to edit.`}
            style={{ fontSize: compact ? 13 : 14, fontWeight: 700, color: C.dark, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '6px 12px' : '7px 16px', cursor: 'pointer', fontFamily: INTER, minWidth: 100, textAlign: 'center' }}
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
        <span style={{ fontSize: 11, color: C.ink3, fontFamily: INTER }}>{fmtINR(min)}</span>
        <span style={{ fontSize: 11, color: C.ink3, fontFamily: INTER }}>{fmtINR(max)}</span>
      </div>
    </div>
  );
}

/* 2-segment donut chart */
function DonutChart({
  val1,
  val2,
  label1 = 'Principal',
  label2 = 'Interest',
  color1 = CHART_PAIR.primary,
  color2 = CHART_PAIR.secondary,
}: {
  val1: number;
  val2: number;
  label1?: string;
  label2?: string;
  color1?: string;
  color2?: string;
}) {
  const total = val1 + val2;
  if (total <= 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const pct1 = Math.round((val1 / total) * 100);
  const pArc1 = (val1 / total) * circ;

  return (
    <svg role="img" aria-label={`${label1} vs ${label2}: ${pct1}% ${label1}, ${100 - pct1}% ${label2}`}
      width="216" height="216" viewBox="0 0 216 216" style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={color2} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={color1} strokeWidth={sw}
        strokeDasharray={`${pArc1} ${circ - pArc1}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>{label1}</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pct1}%</text>
    </svg>
  );
}

/* Results table */
interface ResultRow {
  rank: number;
  name: string;
  rate: number;
  primary: number;
  secondary?: number;
  diff: number;
  isWinner: boolean;
  note?: string;
  rateNA?: boolean;
}

function ResultsTable({
  rows,
  primaryLabel,
  secondaryLabel,
  fmtPrimary,
  fmtSecondary,
  isSavings,
  mobile,
}: {
  rows: ResultRow[];
  primaryLabel: string;
  secondaryLabel?: string;
  fmtPrimary: (n: number) => string;
  fmtSecondary?: (n: number) => string;
  isSavings?: boolean;
  mobile: boolean;
}) {
  const thS: React.CSSProperties = {
    padding: '9px 12px',
    fontSize: 11,
    fontWeight: 700,
    color: C.ink,
    background: '#f4f5f6',
    textAlign: 'left',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    border: `1px solid ${C.border}`,
    whiteSpace: 'nowrap',
    fontFamily: INTER,
  };
  const tdS = (isWinner: boolean): React.CSSProperties => ({
    padding: '10px 12px',
    fontSize: 13,
    color: isWinner ? '#101214' : C.ink2,
    border: `1px solid ${C.border}`,
    background: isWinner ? '#F4F5F6' : C.white,
    verticalAlign: 'middle',
    fontFamily: INTER,
  });
  const tdV = (isWinner: boolean): React.CSSProperties => ({
    padding: '10px 12px',
    fontSize: 13,
    fontWeight: 600,
    color: isWinner ? '#1F7A58' : C.ink,
    border: `1px solid ${C.border}`,
    background: isWinner ? '#F4F5F6' : C.white,
    textAlign: 'right',
    verticalAlign: 'middle',
    fontFamily: INTER,
  });

  return (
    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
      <table style={{ fontSize: 13, borderCollapse: 'collapse', width: '100%', minWidth: mobile ? 460 : '100%' }}>
        <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '6px 0', textAlign: 'left', fontFamily: INTER }}>
          Rates as of July 2026. Sorted best to worst for your inputs.
        </caption>
        <thead>
          <tr>
            <th style={{ ...thS, width: 28 }} scope="col">#</th>
            <th style={thS} scope="col">Bank</th>
            <th style={{ ...thS, textAlign: 'right' }} scope="col">Rate</th>
            <th style={{ ...thS, textAlign: 'right' }} scope="col">{primaryLabel}</th>
            {secondaryLabel && !mobile && <th style={{ ...thS, textAlign: 'right' }} scope="col">{secondaryLabel}</th>}
            <th style={{ ...thS, textAlign: 'right' }} scope="col">vs Best</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.name}>
              <td style={{ ...tdS(row.isWinner), fontWeight: 700 }}>{row.rank}</td>
              <td style={tdS(row.isWinner)}>
                <div style={{ fontWeight: row.isWinner ? 700 : 400, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {row.name}
                  {row.note && <span style={{ fontSize: 10.5, color: row.isWinner ? 'rgba(166,219,196,0.7)' : C.ink3 }}>{row.note}</span>}
                </div>
              </td>
              <td style={tdV(row.isWinner)}>
                {row.rateNA ? 'N/A' : `${row.rate.toFixed(2)}%`}
              </td>
              <td style={tdV(row.isWinner)}>
                {row.rateNA ? 'N/A' : fmtPrimary(row.primary)}
              </td>
              {secondaryLabel && !mobile && (
                <td style={tdV(row.isWinner)}>
                  {row.secondary !== undefined && !row.rateNA ? (fmtSecondary ? fmtSecondary(row.secondary) : fmtPrimary(row.secondary)) : 'N/A'}
                </td>
              )}
              <td style={{ ...tdV(row.isWinner), color: row.isWinner ? C.lime : C.ink2 }}>
                {row.isWinner ? 'Best' : (row.rateNA ? 'N/A' : (isSavings
                  ? `Rs ${fmtINR(Math.abs(row.diff))} less`
                  : `Rs ${fmtINR(Math.abs(row.diff))} more`))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Sidebar list */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
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

/* Rate snapshot sidebar widget */
function RateSnapshot() {
  const rows = [
    { label: 'Highest FD rate (1Y)', value: '7.75% (Yes Bank)' },
    { label: 'Post Office NSC (3Y)', value: '7.70%' },
    { label: 'Highest savings rate', value: '7.00% (Yes/IDFC)' },
    { label: 'Lowest home loan', value: '7.15% (Bank of Baroda)' },
    { label: 'Lowest personal loan', value: '10.30% (SBI)' },
    { label: 'Lowest gold loan', value: '8.75% (SBI/Canara/PNB)' },
    { label: 'RBI repo rate (Jul 2026)', value: '5.25%' },
    { label: 'DICGC deposit insurance', value: 'Rs 5 lakh per bank' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER, flexShrink: 0 }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Rate Snapshot (Jul 2026)</span>
      </div>
      {rows.map((r, i) => (
        <div key={r.label} style={{ padding: '10px 14px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: C.white, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <span style={{ fontSize: 12, color: C.ink2 }}>{r.label}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.ink, textAlign: 'right' }}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

/* FAQ data */
const FAQ_ITEMS = [
  {
    q: 'Which bank offers the highest FD rate in July 2026?',
    a: 'Yes Bank leads with 7.75% p.a. for 1-year and 2-year fixed deposits. IDFC First Bank follows at 7.50% for 1-year deposits. For 3-year tenure, Post Office NSC edges ahead at 7.70%, which is the highest single rate available across any comparable instrument.',
  },
  {
    q: 'Is Yes Bank FD safe?',
    a: 'Yes Bank FD deposits are insured up to Rs 5 lakh per depositor per bank under DICGC (Deposit Insurance and Credit Guarantee Corporation), a subsidiary of RBI. Yes Bank underwent a reconstruction scheme in 2020 and has since stabilized with improving financial metrics. For amounts above Rs 5 lakh, splitting deposits across multiple banks reduces risk.',
  },
  {
    q: 'What is the SBI FD interest rate for 1 year in 2026?',
    a: 'SBI offers 6.80% for a 1-year fixed deposit for general customers and 7.30% for senior citizens (adding 0.50%) as of July 2026. For a Rs 5 lakh deposit at 6.80%, the maturity amount after 1 year with quarterly compounding is approximately Rs 5,34,914.',
  },
  {
    q: 'What is the HDFC Bank FD rate for 2 years?',
    a: 'HDFC Bank offers 7.00% p.a. for 2-year fixed deposits. Senior citizens get 7.50% on the same tenure. For a Rs 5 lakh deposit at 7.00% for 2 years with quarterly compounding, the maturity amount is approximately Rs 5,72,947.',
  },
  {
    q: 'Can I avoid TDS on FD interest?',
    a: 'Yes. Submit Form 15G (if below 60 years and total income below taxable limit) or Form 15H (if 60 years and above and total income below taxable limit) to your bank at the start of each financial year. The form prevents TDS deduction on FD interest. Even with TDS, you must declare the interest as income and pay tax per your applicable slab.',
  },
  {
    q: 'Which bank has the lowest home loan interest rate right now?',
    a: 'Bank of Baroda currently offers the lowest home loan interest rate at 7.15% p.a. for floating-rate loans as of July 2026. SBI is at 7.25%, Bank of India at 7.30%, and HDFC Bank at 7.35%. All floating rates are linked to external benchmarks based on the RBI repo rate of 5.25%.',
  },
  {
    q: 'How is home loan EMI calculated?',
    a: 'Home loan EMI uses the reducing-balance formula: EMI = P x r x (1+r)^n / ((1+r)^n - 1), where P is the principal, r is the monthly interest rate (annual rate / 12 / 100), and n is the tenure in months. For a Rs 75 lakh loan at 7.25% for 20 years: monthly EMI is approximately Rs 59,279.',
  },
  {
    q: 'Is Post Office NSC better than a bank FD?',
    a: 'Post Office NSC at 7.70% for 3 years beats most bank FDs for that tenure. Additionally, NSC investments qualify for Section 80C deduction up to Rs 1.5 lakh per year, which bank FDs do not (except the 5-year tax-saving FD). NSC has sovereign guarantee backing versus the Rs 5 lakh DICGC limit for bank FDs. The trade-off is lower liquidity: NSC cannot be prematurely withdrawn unlike most bank FDs.',
  },
  {
    q: 'What is the gold loan interest rate in India?',
    a: 'Bank gold loan rates start at 8.75% (SBI, Canara Bank, PNB). ICICI Bank charges 9.00%, HDFC Bank and Axis Bank charge 9.50%. NBFCs like Muthoot Finance and Manappuram charge 12.00% but offer faster disbursal (sometimes within 30 minutes) and higher loan-to-value ratios of up to 75% of gold value versus approximately 70% at most banks.',
  },
  {
    q: 'How does a falling RBI repo rate affect my FD returns?',
    a: 'When RBI cuts the repo rate, banks reduce both lending rates and deposit rates over time to maintain net interest margins. After RBI\'s 125 bps cumulative cut from 6.50% to 5.25% through 2025, FD rates have generally fallen by 50-75 bps compared to 2023-24 levels. Locking in FDs at current rates for longer tenures (3-5 years) is a common strategy in falling-rate environments to secure today\'s rates before further cuts.',
  },
  {
    q: 'What is the personal loan rate for SBI Xpress Credit?',
    a: 'SBI\'s personal loan rate starts at 10.30% p.a. for salaried employees with a good credit profile, making it the most competitive rate among major banks in India as of July 2026. Rates vary based on CIBIL score, employer category, and income. Government and PSU employees typically get rates closer to the base.',
  },
  {
    q: 'Can I use this calculator if I am an NRI?',
    a: 'Yes. NRIs can invest in NRE and NRO fixed deposits. NRE FD interest is fully exempt from Indian income tax and the principal is freely repatriable. NRO FD interest is taxable in India at 30% TDS for non-residents. The rates in this calculator are for domestic fixed deposits; NRE FD rates may differ and should be checked directly with the bank.',
  },
  {
    q: 'How much does tenure affect FD maturity?',
    a: 'Tenure significantly amplifies the compounding effect. For Rs 5 lakh at 7.75% (Yes Bank): 1-year maturity is approximately Rs 5,40,048 (Rs 40,048 interest); 3-year maturity is approximately Rs 6,25,946 (Rs 1,25,946 interest). Over 5 years at 7.25% (IndusInd): maturity is approximately Rs 7,13,278 (Rs 2,13,278 interest on the same Rs 5 lakh). Quarterly compounding means each year builds on the previous quarter\'s compounded amount.',
  },
  {
    q: 'Are gold loan NBFCs safer than banks?',
    a: 'Banks are safer from a regulatory standpoint because they are supervised by RBI as scheduled commercial banks with strict capital requirements. Muthoot Finance and Manappuram are registered NBFCs regulated under the NBFC framework, not the full banking framework. Both are publicly listed and financially stable but not covered by DICGC deposit insurance. The loan itself is secured against gold, so the risk for the borrower is losing the pledged gold if they default.',
  },
  {
    q: 'What is the savings account interest rate of Kotak Mahindra Bank?',
    a: 'Kotak Mahindra Bank offers 3.50% savings account interest rate for balances up to Rs 1 lakh and 4.00% for balances above Rs 1 lakh as of July 2026. For a Rs 2 lakh balance: the bank pays 4.00% on the full balance since it is above the Rs 1 lakh threshold. Annual interest earned on Rs 2 lakh at 4.00% is Rs 8,000.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a free Indian fintech platform with 525+ financial calculators covering FD, SIP, home loans, income tax, retirement planning, and more. The bank interest rate comparison calculator is one of over 100 tools in the loans and investing categories.',
  },
];

/* Table styles (shared) */
const thS: React.CSSProperties = {
  padding: '9px 14px',
  fontSize: 11.5,
  fontWeight: 700,
  color: C.ink,
  background: '#f4f5f6',
  textAlign: 'left',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  border: `1px solid ${C.border}`,
  whiteSpace: 'nowrap',
  fontFamily: INTER,
};
const tdL: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'middle', fontFamily: INTER, textAlign: 'left' };
const tdR: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'middle', textAlign: 'right', fontFamily: INTER };

/* Main component */
export default function BankInterestComparisonClient() {
  const { settings, updateSettings } = useCalculatorSettings<Settings>('bank-comparison', DEFAULT_SETTINGS);
  const [mobile, setMobile] = useState(false);
  const [activeTab, setActiveTab] = useState<'fd' | 'savings' | 'home' | 'personal' | 'gold'>('fd');
  const [openFAQs, setOpenFAQs] = useState<Set<number>>(new Set([0]));

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);
  const fmtFull = (n: number) => formatCurrency(convertCurrency(n));

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk();
    window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const toggleFAQ = (i: number) => setOpenFAQs(prev => {
    const n = new Set(prev);
    n.has(i) ? n.delete(i) : n.add(i);
    return n;
  });

  /* FD results */
  const fdResults = useMemo((): ResultRow[] => {
    const tenure = settings.fdTenure as 1 | 2 | 3 | 5;
    const rows = FD_BANKS
      .map(bank => {
        const baseRate = bank.rates[tenure];
        if (baseRate === undefined) {
          return { name: bank.name, rate: 0, maturity: 0, rateNA: true, note: bank.name === 'Post Office (NSC)' ? 'Not available for this tenure' : undefined };
        }
        const effectiveRate = settings.isSenior ? baseRate + bank.seniorExtra : baseRate;
        const maturity = calcFDMaturity(settings.fdAmount, effectiveRate, tenure);
        return { name: bank.name, rate: effectiveRate, maturity, rateNA: false };
      });

    const validRows = rows.filter(r => !r.rateNA).sort((a, b) => b.maturity - a.maturity);
    const naRows = rows.filter(r => r.rateNA);
    const bestMaturity = validRows[0]?.maturity || 0;

    const result: ResultRow[] = [
      ...validRows.map((r, i) => ({
        rank: i + 1,
        name: r.name,
        rate: r.rate,
        primary: r.maturity,
        diff: bestMaturity - r.maturity,
        isWinner: i === 0,
        rateNA: false,
      })),
      ...naRows.map((r, i) => ({
        rank: validRows.length + i + 1,
        name: r.name,
        rate: 0,
        primary: 0,
        diff: 0,
        isWinner: false,
        rateNA: true,
        note: r.note,
      })),
    ];
    return result;
  }, [settings.fdAmount, settings.fdTenure, settings.isSenior]);

  /* Savings results */
  const savingsResults = useMemo((): ResultRow[] => {
    const sorted = [...SAVINGS_BANKS].sort((a, b) => b.rate - a.rate);
    const bestInterest = calcSimpleInterest(settings.savingsAmount, sorted[0]?.rate || 0, 1);
    return sorted.map((bank, i) => {
      const interest = calcSimpleInterest(settings.savingsAmount, bank.rate, 1);
      return {
        rank: i + 1,
        name: bank.name,
        rate: bank.rate,
        primary: interest,
        diff: bestInterest - interest,
        isWinner: i === 0,
        note: bank.note,
        rateNA: false,
      };
    });
  }, [settings.savingsAmount]);

  /* Home loan results */
  const homeResults = useMemo((): ResultRow[] => {
    const months = settings.homeLoanTenure * 12;
    const sorted = [...HOME_LOAN_BANKS].sort((a, b) => a.rate - b.rate);
    const bestInterest = calcTotalInterest(settings.homeLoanAmount, sorted[0]?.rate || 0, months);
    const bestEMI = calcEMI(settings.homeLoanAmount, sorted[0]?.rate || 0, months);
    return sorted.map((bank, i) => {
      const emi = calcEMI(settings.homeLoanAmount, bank.rate, months);
      const totalInterest = calcTotalInterest(settings.homeLoanAmount, bank.rate, months);
      return {
        rank: i + 1,
        name: bank.name,
        rate: bank.rate,
        primary: emi,
        secondary: totalInterest,
        diff: totalInterest - bestInterest,
        isWinner: i === 0,
        rateNA: false,
      };
    });
  }, [settings.homeLoanAmount, settings.homeLoanTenure]);

  /* Personal loan results */
  const personalResults = useMemo((): ResultRow[] => {
    const months = settings.personalLoanTenure * 12;
    const sorted = [...PERSONAL_LOAN_BANKS].sort((a, b) => a.rate - b.rate);
    const bestInterest = calcTotalInterest(settings.personalLoanAmount, sorted[0]?.rate || 0, months);
    return sorted.map((bank, i) => {
      const emi = calcEMI(settings.personalLoanAmount, bank.rate, months);
      const totalInterest = calcTotalInterest(settings.personalLoanAmount, bank.rate, months);
      return {
        rank: i + 1,
        name: bank.name,
        rate: bank.rate,
        primary: emi,
        secondary: totalInterest,
        diff: totalInterest - bestInterest,
        isWinner: i === 0,
        rateNA: false,
      };
    });
  }, [settings.personalLoanAmount, settings.personalLoanTenure]);

  /* Gold loan results */
  const goldResults = useMemo((): ResultRow[] => {
    const sorted = [...GOLD_LOAN_BANKS].sort((a, b) => a.rate - b.rate);
    const years = settings.goldLoanTenure;
    const bestInterest = calcSimpleInterest(settings.goldLoanAmount, sorted[0]?.rate || 0, years);
    return sorted.map((bank, i) => {
      const interest = calcSimpleInterest(settings.goldLoanAmount, bank.rate, years);
      return {
        rank: i + 1,
        name: bank.name,
        rate: bank.rate,
        primary: interest,
        diff: interest - bestInterest,
        isWinner: i === 0,
        rateNA: false,
      };
    });
  }, [settings.goldLoanAmount, settings.goldLoanTenure]);

  /* Derived chart data per tab */
  const chartBanks = useMemo(() => {
    if (activeTab === 'fd') return fdResults.filter(r => !r.rateNA).slice(0, 3).map(r => ({ name: r.name, rate: r.rate }));
    if (activeTab === 'savings') return savingsResults.slice(0, 3).map(r => ({ name: r.name, rate: r.rate }));
    if (activeTab === 'home') return homeResults.slice(0, 3).map(r => ({ name: r.name, rate: r.rate }));
    if (activeTab === 'personal') return personalResults.slice(0, 3).map(r => ({ name: r.name, rate: r.rate }));
    return goldResults.slice(0, 3).map(r => ({ name: r.name, rate: r.rate }));
  }, [activeTab, fdResults, savingsResults, homeResults, personalResults, goldResults]);

  const chartLabel = activeTab === 'fd' ? 'FD' : activeTab === 'savings' ? 'savings' : activeTab === 'home' ? 'home loan' : activeTab === 'personal' ? 'personal loan' : 'gold loan';

  /* Tab definitions */
  const TABS = [
    { id: 'fd' as const,       label: 'FD Rates',        shortLabel: 'FD' },
    { id: 'savings' as const,  label: 'Savings Account', shortLabel: 'Savings' },
    { id: 'home' as const,     label: 'Home Loan',       shortLabel: 'Home' },
    { id: 'personal' as const, label: 'Personal Loan',   shortLabel: 'Personal' },
    { id: 'gold' as const,     label: 'Gold Loan',       shortLabel: 'Gold' },
  ];

  const FD_TENURES: (1 | 2 | 3 | 5)[] = [1, 2, 3, 5];
  const HOME_TENURES: (5 | 10 | 15 | 20 | 25 | 30)[] = [5, 10, 15, 20, 25, 30];
  const PERSONAL_TENURES: (1 | 2 | 3 | 5)[] = [1, 2, 3, 5];
  const GOLD_TENURES: { val: number; label: string }[] = [
    { val: 0.5, label: '6M' },
    { val: 1, label: '1Y' },
    { val: 2, label: '2Y' },
    { val: 3, label: '3Y' },
  ];

  const pillActive: React.CSSProperties = { padding: '5px 14px', fontSize: 12.5, background: C.white, color: C.ink, border: `1.5px solid ${C.ink}`, fontWeight: 700, borderRadius: 6, cursor: 'pointer', fontFamily: INTER, transition: 'all 0.15s' };
  const pillInactive: React.CSSProperties = { padding: '5px 14px', fontSize: 12.5, background: 'transparent', color: C.ink3, border: `1px solid ${C.border}`, fontWeight: 500, borderRadius: 6, cursor: 'pointer', fontFamily: INTER, transition: 'all 0.15s' };

  /* Winner stat for aria-live */
  const winnerStat = useMemo(() => {
    if (activeTab === 'fd') {
      const w = fdResults[0];
      return w ? `Best FD rate: ${w.name} at ${w.rate.toFixed(2)}% giving maturity of ${fmtFull(w.primary)}` : '';
    }
    if (activeTab === 'savings') {
      const w = savingsResults[0];
      return w ? `Best savings rate: ${w.name} at ${w.rate.toFixed(2)}%` : '';
    }
    if (activeTab === 'home') {
      const w = homeResults[0];
      return w ? `Lowest home loan: ${w.name} at ${w.rate.toFixed(2)}% with EMI ${fmtFull(w.primary)}` : '';
    }
    if (activeTab === 'personal') {
      const w = personalResults[0];
      return w ? `Lowest personal loan: ${w.name} at ${w.rate.toFixed(2)}%` : '';
    }
    const w = goldResults[0];
    return w ? `Lowest gold loan: ${w.name} at ${w.rate.toFixed(2)}%` : '';
  }, [activeTab, fdResults, savingsResults, homeResults, personalResults, goldResults]);

  /* Render inputs per tab */
  const renderInputs = () => {
    if (activeTab === 'fd') {
      return (
        <div style={{ padding: mobile ? '20px 18px' : '40px 40px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.ink, fontFamily: INTER }}>Settings</span>
            <CurrencySelector />
          </div>
          <Slider
            label="Deposit Amount"
            id="fd-amount"
            value={settings.fdAmount}
            min={100000}
            max={5000000}
            step={50000}
            display={fmtC(settings.fdAmount)}
            onChange={v => updateSettings({ fdAmount: v })}
            compact={mobile}
          />
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 14.5, color: C.ink2, fontWeight: 400, fontFamily: INTER, display: 'block', marginBottom: 10 }}>Tenure</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {FD_TENURES.map(t => (
                <button key={t} onClick={() => updateSettings({ fdTenure: t })}
                  style={settings.fdTenure === t ? pillActive : pillInactive}>
                  {t}Y
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 14.5, color: C.ink2, fontWeight: 400, fontFamily: INTER, display: 'block', marginBottom: 10 }}>Senior Citizen (60+)</label>
            <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', width: 'fit-content' }}>
              {[false, true].map(val => (
                <button key={String(val)} onClick={() => updateSettings({ isSenior: val })}
                  style={{ padding: '7px 20px', border: 'none', background: settings.isSenior === val ? C.white : 'transparent', color: settings.isSenior === val ? C.ink : C.ink3, fontWeight: settings.isSenior === val ? 600 : 400, cursor: 'pointer', fontFamily: INTER, fontSize: 13, transition: 'all 0.15s' }}>
                  {val ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>
          <div style={{ padding: '14px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8 }}>
            <span style={{ fontSize: 13, color: C.ink, fontFamily: INTER }}>Maturity is calculated with quarterly compounding, the standard method used by every major Indian bank. TDS applies at 10% if interest from one bank exceeds Rs 40,000 in a year (Rs 50,000 for senior citizens).</span>
          </div>
        </div>
      );
    }
    if (activeTab === 'savings') {
      return (
        <div style={{ padding: mobile ? '20px 18px' : '40px 40px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.ink, fontFamily: INTER }}>Settings</span>
            <CurrencySelector />
          </div>
          <Slider
            label="Balance Amount"
            id="savings-amount"
            value={settings.savingsAmount}
            min={100000}
            max={5000000}
            step={50000}
            display={fmtC(settings.savingsAmount)}
            onChange={v => updateSettings({ savingsAmount: v })}
            compact={mobile}
          />
          <div style={{ padding: '14px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 13, color: C.ink, fontFamily: INTER }}>Showing 1-year interest earned on your balance at each bank.</span>
          </div>
          <div style={{ padding: '14px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8 }}>
            <span style={{ fontSize: 13, color: C.ink, fontFamily: INTER }}>Savings interest is calculated daily on the closing balance and credited quarterly. Under Section 80TTA, up to Rs 10,000 of savings interest is tax-free each year (Rs 50,000 under Section 80TTB for senior citizens).</span>
          </div>
        </div>
      );
    }
    if (activeTab === 'home') {
      return (
        <div style={{ padding: mobile ? '20px 18px' : '40px 40px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.ink, fontFamily: INTER }}>Settings</span>
            <CurrencySelector />
          </div>
          <Slider
            label="Loan Amount"
            id="home-amount"
            value={settings.homeLoanAmount}
            min={2000000}
            max={20000000}
            step={500000}
            display={fmtC(settings.homeLoanAmount)}
            onChange={v => updateSettings({ homeLoanAmount: v })}
            compact={mobile}
          />
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 14.5, color: C.ink2, fontWeight: 400, fontFamily: INTER, display: 'block', marginBottom: 10 }}>Tenure (Years)</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {HOME_TENURES.map(t => (
                <button key={t} onClick={() => updateSettings({ homeLoanTenure: t })}
                  style={settings.homeLoanTenure === t ? pillActive : pillInactive}>
                  {t}Y
                </button>
              ))}
            </div>
          </div>
          <div style={{ padding: '14px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8 }}>
            <span style={{ fontSize: 13, color: C.ink, fontFamily: INTER }}>Rates shown are floating, linked to each bank&apos;s External Benchmark Lending Rate (EBLR). The rate actually offered to you depends on your CIBIL score, income, and employer category, and can be 0.10-0.50% higher than the published base rate.</span>
          </div>
        </div>
      );
    }
    if (activeTab === 'personal') {
      return (
        <div style={{ padding: mobile ? '20px 18px' : '40px 40px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.ink, fontFamily: INTER }}>Settings</span>
            <CurrencySelector />
          </div>
          <Slider
            label="Loan Amount"
            id="personal-amount"
            value={settings.personalLoanAmount}
            min={100000}
            max={2500000}
            step={50000}
            display={fmtC(settings.personalLoanAmount)}
            onChange={v => updateSettings({ personalLoanAmount: v })}
            compact={mobile}
          />
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 14.5, color: C.ink2, fontWeight: 400, fontFamily: INTER, display: 'block', marginBottom: 10 }}>Tenure (Years)</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {PERSONAL_TENURES.map(t => (
                <button key={t} onClick={() => updateSettings({ personalLoanTenure: t })}
                  style={settings.personalLoanTenure === t ? pillActive : pillInactive}>
                  {t}Y
                </button>
              ))}
            </div>
          </div>
          <div style={{ padding: '14px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8 }}>
            <span style={{ fontSize: 13, color: C.ink, fontFamily: INTER }}>Personal loans are unsecured, so rates run well above home loan rates. CIBIL score is the single biggest factor: 750+ typically gets the published base rate, while 700-749 usually carries a 0.25-0.50% surcharge.</span>
          </div>
        </div>
      );
    }
    /* Gold loan */
    return (
      <div style={{ padding: mobile ? '20px 18px' : '40px 40px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.ink, fontFamily: INTER }}>Settings</span>
          <CurrencySelector />
        </div>
        <Slider
          label="Loan Amount"
          id="gold-amount"
          value={settings.goldLoanAmount}
          min={50000}
          max={2000000}
          step={50000}
          display={fmtC(settings.goldLoanAmount)}
          onChange={v => updateSettings({ goldLoanAmount: v })}
          compact={mobile}
        />
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 14.5, color: C.ink2, fontWeight: 400, fontFamily: INTER, display: 'block', marginBottom: 10 }}>Tenure</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {GOLD_TENURES.map(t => (
              <button key={t.val} onClick={() => updateSettings({ goldLoanTenure: t.val })}
                style={settings.goldLoanTenure === t.val ? pillActive : pillInactive}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ padding: '14px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8 }}>
          <span style={{ fontSize: 13, color: C.ink, fontFamily: INTER }}>Gold loan interest is charged as simple interest on the loan amount for the tenure, not compounded. Banks typically lend up to 75% of the gold&apos;s value (loan-to-value), against 22K or 24K gold jewellery or coins.</span>
        </div>
      </div>
    );
  };

  /* Render results per tab */
  const renderResults = () => {
    let bestBankName = '';
    let bestBankRate = 0;
    let principalVal = 0;
    let interestVal = 0;
    let totalVal = 0;
    let label1 = 'Principal';
    let label2 = 'Interest';
    let primaryLabel = '';
    let primaryDisplay = '';
    let secondaryDisplay = '';

    if (activeTab === 'fd') {
      const top = fdResults[0];
      bestBankName = top?.name || '';
      bestBankRate = top?.rate || 0;
      principalVal = settings.fdAmount;
      interestVal = Math.max(0, (top?.primary || 0) - settings.fdAmount);
      totalVal = top?.primary || 0;
      label1 = 'Principal';
      label2 = 'Interest';
      primaryLabel = 'Best Maturity (FD)';
      primaryDisplay = fmtFull(totalVal);
    } else if (activeTab === 'savings') {
      const top = savingsResults[0];
      bestBankName = top?.name || '';
      bestBankRate = top?.rate || 0;
      principalVal = settings.savingsAmount;
      interestVal = top?.primary || 0;
      totalVal = principalVal + interestVal;
      label1 = 'Balance';
      label2 = 'Interest';
      primaryLabel = 'Best Annual Interest';
      primaryDisplay = fmtFull(interestVal);
    } else if (activeTab === 'home') {
      const top = homeResults[0];
      bestBankName = top?.name || '';
      bestBankRate = top?.rate || 0;
      principalVal = settings.homeLoanAmount;
      interestVal = top?.secondary || 0;
      totalVal = principalVal + interestVal;
      label1 = 'Principal';
      label2 = 'Interest';
      primaryLabel = 'Lowest Monthly EMI';
      primaryDisplay = fmtFull(top?.primary || 0);
      secondaryDisplay = `Total interest: ${fmtFull(interestVal)}`;
    } else if (activeTab === 'personal') {
      const top = personalResults[0];
      bestBankName = top?.name || '';
      bestBankRate = top?.rate || 0;
      principalVal = settings.personalLoanAmount;
      interestVal = top?.secondary || 0;
      totalVal = principalVal + interestVal;
      label1 = 'Principal';
      label2 = 'Interest';
      primaryLabel = 'Lowest Monthly EMI';
      primaryDisplay = fmtFull(top?.primary || 0);
      secondaryDisplay = `Total interest: ${fmtFull(interestVal)}`;
    } else if (activeTab === 'gold') {
      const top = goldResults[0];
      bestBankName = top?.name || '';
      bestBankRate = top?.rate || 0;
      principalVal = settings.goldLoanAmount;
      interestVal = top?.primary || 0;
      totalVal = principalVal + interestVal;
      label1 = 'Principal';
      label2 = 'Interest';
      primaryLabel = 'Lowest Total Interest';
      primaryDisplay = fmtFull(interestVal);
    }

    const totalCalculated = principalVal + interestVal;
    const pPct = totalCalculated > 0 ? Math.round((principalVal / totalCalculated) * 100) : 0;
    const iPct = 100 - pPct;

    return (
      <div style={{ padding: mobile ? '20px 18px' : '40px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
        <div style={{ order: mobile ? 1 : -1, marginBottom: mobile ? 16 : 20, display: 'flex', justifyContent: 'center', width: '100%' }}>
          <DonutChart val1={principalVal} val2={interestVal} label1={label1} label2={label2} />
        </div>
        <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 20, marginBottom: mobile ? 16 : 24, flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
            <span style={{ fontSize: 13, color: C.ink2, fontFamily: INTER }}>{label1}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
            <span style={{ fontSize: 13, color: C.ink2, fontFamily: INTER }}>{label2}</span>
          </div>
        </div>

        <div style={{ width: '100%', order: 0 }}>
          <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#7A8087', fontFamily: INTER }}>{primaryLabel}</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#101214', fontFamily: INTER }}>{bestBankName} ({bestBankRate.toFixed(2)}%)</div>
            </div>
            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div aria-live="polite" aria-label={`${primaryLabel}: ${primaryDisplay}`}
                style={{ fontSize: 22, fontWeight: 800, color: '#1F7A58', lineHeight: 1.1, fontFamily: INTER }}>
                {primaryDisplay}
              </div>
              {secondaryDisplay && (
                <div style={{ fontSize: 11, color: '#7A8087', fontFamily: INTER }}>{secondaryDisplay}</div>
              )}
            </div>
          </div>

          {[
            { label: 'Best Partner', value: bestBankName },
            { label: 'Interest Rate', value: `${bestBankRate.toFixed(2)}% p.a.` },
            { label: activeTab === 'fd' || activeTab === 'savings' ? 'Principal' : 'Loan Amount', value: fmtFull(principalVal) },
            { label: activeTab === 'fd' || activeTab === 'savings' ? 'Interest Earned' : 'Total Interest', value: fmtFull(interestVal) },
            { label: activeTab === 'fd' || activeTab === 'savings' ? 'Total Value' : 'Total Cost', value: fmtFull(totalVal) },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
              <span style={{ fontSize: 13.5, color: C.ink2, fontFamily: INTER }}>{label}</span>
              <span style={{ fontSize: 13.5, fontWeight: 700, color: C.ink, fontFamily: INTER }}>{value}</span>
            </div>
          ))}

          <div style={{ width: '100%', marginTop: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: C.ink3, fontFamily: INTER }}>{label1} {pPct}%</span>
              <span style={{ fontSize: 12, color: C.ink3, fontFamily: INTER }}>{label2} {iPct}%</span>
            </div>
            <div style={{ height: 6, borderRadius: 99, background: C.lime2, overflow: 'hidden', position: 'relative' }}>
              <div style={{ height: '100%', width: `${pPct}%`, background: C.dark, borderRadius: 99, transition: 'width 0.4s ease' }} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <PageNav />
      <style>{`
        .bank-compare-sidebar::-webkit-scrollbar { width: 5px; }
        .bank-compare-sidebar::-webkit-scrollbar-track { background: transparent; }
        .bank-compare-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .bank-compare-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
      `}</style>
      <div style={{ background: C.bg, minHeight: '100vh', fontFamily: INTER }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

          {/* Page header */}
          <header style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em', fontFamily: INTER }}>
              Bank Interest Rate Comparison Calculator
            </h1>
            <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800, fontFamily: INTER }}>
              Compare FD rates, savings account interest, home loan, personal loan and gold loan interest rates across 12 major Indian banks. Enter your amount and see exact returns and costs at each bank.
            </p>
          </header>

          {/* Main grid: calculator + sidebar */}
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

            {/* Calculator card */}
            <div>
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

                {/* Tab strip */}
                <div role="tablist" aria-label="Product type" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                  {TABS.map(t => (
                    <button key={t.id} id={`tab-${t.id}`} role="tab"
                      aria-selected={activeTab === t.id}
                      aria-controls={`panel-${t.id}`}
                      onClick={() => setActiveTab(t.id)}
                      style={{
                        flex: 1, padding: mobile ? '13px 4px' : '15px 12px', background: 'none', border: 'none', cursor: 'pointer',
                        fontSize: mobile ? 11.5 : 13, fontWeight: activeTab === t.id ? 700 : 400,
                        color: activeTab === t.id ? C.dark : C.ink3,
                        borderBottom: activeTab === t.id ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                        transition: 'all 0.15s', fontFamily: INTER,
                      }}>
                      {mobile ? t.shortLabel : t.label}
                    </button>
                  ))}
                </div>

                {/* Tab panel - single active panel */}
                {TABS.map(t => (
                  <div key={t.id} id={`panel-${t.id}`} role="tabpanel" aria-labelledby={`tab-${t.id}`}
                    hidden={activeTab !== t.id}>
                    {activeTab === t.id && (
                    <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                      {renderInputs()}
                      {renderResults()}
                    </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* ── Comparison Rankings Table ── */}
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', marginBottom: 32, boxShadow: '0 1px 12px rgba(16,18,20,0.05)' }}>
                <div style={{ padding: '16px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: C.ink, fontFamily: INTER }}>Bank Interest Rate Rankings</div>
                    <div style={{ fontSize: 12, color: C.ink3, marginTop: 3, fontFamily: INTER }}>Live: updates as you change your inputs above</div>
                  </div>
                  <span style={{ fontSize: 11, color: C.ink3, background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 6, padding: '4px 10px', fontWeight: 600, fontFamily: INTER }}>
                    {activeTab === 'fd' ? `Tenure: ${settings.fdTenure}Y` : activeTab === 'home' ? `Tenure: ${settings.homeLoanTenure}Y` : activeTab === 'personal' ? `Tenure: ${settings.personalLoanTenure}Y` : activeTab === 'gold' ? `Tenure: ${settings.goldLoanTenure}Y` : '1Y'}
                  </span>
                </div>
                <div style={{ padding: mobile ? '16px 12px' : '24px 24px' }}>
                  {activeTab === 'fd' && (
                    <ResultsTable
                      rows={fdResults}
                      primaryLabel="Maturity"
                      fmtPrimary={fmtFull}
                      isSavings
                      mobile={mobile}
                    />
                  )}
                  {activeTab === 'savings' && (
                    <ResultsTable
                      rows={savingsResults}
                      primaryLabel="Annual Interest"
                      fmtPrimary={fmtFull}
                      isSavings
                      mobile={mobile}
                    />
                  )}
                  {activeTab === 'home' && (
                    <ResultsTable
                      rows={homeResults}
                      primaryLabel="Monthly EMI"
                      secondaryLabel="Total Interest"
                      fmtPrimary={fmtFull}
                      fmtSecondary={fmtFull}
                      isSavings={false}
                      mobile={mobile}
                    />
                  )}
                  {activeTab === 'personal' && (
                    <ResultsTable
                      rows={personalResults}
                      primaryLabel="Monthly EMI"
                      secondaryLabel="Total Interest"
                      fmtPrimary={fmtFull}
                      fmtSecondary={fmtFull}
                      isSavings={false}
                      mobile={mobile}
                    />
                  )}
                  {activeTab === 'gold' && (
                    <ResultsTable
                      rows={goldResults}
                      primaryLabel="Total Interest"
                      fmtPrimary={fmtFull}
                      isSavings={false}
                      mobile={mobile}
                    />
                  )}
                </div>
              </div>

              {/* WaitlistCard */}
              <SaveResultsCard mobile={mobile} />

              

              {/* Article */}
              <article itemScope itemType="https://schema.org/Article">

                {/* Section 1 */}
                <section style={{ marginBottom: 40 }}>
                  <h2 id="highest-fd-rates" style={{ fontSize: mobile ? 20 : 24, fontWeight: 700, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em', fontFamily: INTER }}>
                    Which bank offers the highest FD interest rate in India? (July 2026)
                  </h2>
                  <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 12px', fontFamily: INTER }}>
                    Yes Bank leads with 7.75% p.a. for 1-year and 2-year fixed deposits, with IDFC First Bank at 7.50% for the same tenures. For the 3-year bracket, Post Office NSC edges ahead at 7.70%, making it the single highest rate for that tenure across any comparable product available to retail investors in India.
                  </p>
                  <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 12px', fontFamily: INTER }}>
                    For senior citizens, the effective rate is higher at each bank. Yes Bank pays 8.25% to senior citizens on 1-year deposits. IndusInd Bank pays 7.75% and IDFC First Bank 8.00%. PNB, which offers only 6.80% to general customers for 1-year FDs, jumps to 7.60% for seniors, since PNB provides the highest senior citizen bonus of 0.80% compared to the standard 0.50% at other banks.
                  </p>
                  <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: 0, fontFamily: INTER }}>
                    Small finance banks (not included in this comparison) offer even higher FD rates of 8-9%, but they carry higher risk and are covered under the same Rs 5 lakh DICGC insurance limit. For deposits within that limit, they are worth considering as a higher-yield alternative.
                  </p>
                </section>

                {/* Section 2 */}
                <section style={{ marginBottom: 40 }}>
                  <h2 id="fd-comparison-table" style={{ fontSize: mobile ? 20 : 24, fontWeight: 700, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em', fontFamily: INTER }}>
                    FD interest rates comparison: SBI, HDFC, ICICI, Axis, Kotak (2026)
                  </h2>
                  <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 16px', fontFamily: INTER }}>
                    The table below shows current FD rates from major Indian banks across four standard tenures. These reflect rates as of July 2026, following the RBI repo rate cycle that brought the policy rate to 5.25% through cumulative 125 bps cuts.
                  </p>
                  <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginBottom: 8 }}>
                    <table style={{ fontSize: 13, borderCollapse: 'collapse', width: '100%', minWidth: 520 }}>
                      <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '6px 0', textAlign: 'left', fontFamily: INTER }}>Rates as of July 2026. Senior citizen extra in parentheses. N/A = tenure not available.</caption>
                      <thead>
                        <tr>
                          <th style={thS} scope="col">Bank</th>
                          <th style={{ ...thS, textAlign: 'right' }} scope="col">1 Year</th>
                          <th style={{ ...thS, textAlign: 'right' }} scope="col">2 Years</th>
                          <th style={{ ...thS, textAlign: 'right' }} scope="col">3 Years</th>
                          <th style={{ ...thS, textAlign: 'right' }} scope="col">5 Years</th>
                          <th style={{ ...thS, textAlign: 'right' }} scope="col">Sr Citizen</th>
                        </tr>
                      </thead>
                      <tbody>
                        {FD_BANKS.map(bank => (
                          <tr key={bank.name}>
                            <td style={tdL}>{bank.name}</td>
                            <td style={{ ...tdR }}>{bank.rates[1] !== undefined ? `${bank.rates[1]!.toFixed(2)}%` : 'N/A'}</td>
                            <td style={{ ...tdR }}>{bank.rates[2] !== undefined ? `${bank.rates[2]!.toFixed(2)}%` : 'N/A'}</td>
                            <td style={{ ...tdR }}>{bank.rates[3] !== undefined ? `${bank.rates[3]!.toFixed(2)}%` : 'N/A'}</td>
                            <td style={{ ...tdR }}>{bank.rates[5] !== undefined ? `${bank.rates[5]!.toFixed(2)}%` : 'N/A'}</td>
                            <td style={{ ...tdR }}>{bank.seniorExtra > 0 ? `+${bank.seniorExtra.toFixed(2)}%` : 'Same'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 12px', fontFamily: INTER }}>
                    The rate gap between the best and worst bank for 1-year FDs is 1.05 percentage points (7.75% vs 6.70%). On a Rs 5 lakh deposit, that translates to approximately Rs 5,343 in additional interest earned per year. Over 3 years with compounding, the gap widens further.
                  </p>
                  <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>FD Maturity Calculator</p>
                      <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>See exact maturity amounts for all 12 banks using your deposit size and tenure.</p>
                    </div>
                    <Link className="fx-btn" href="/calculators/fd-calculator" target="_blank" rel="noopener noreferrer"
                      style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                  </div>
                </section>

                {/* Section 3 */}
                <section style={{ marginBottom: 40 }}>
                  <h2 id="savings-account-rates" style={{ fontSize: mobile ? 20 : 24, fontWeight: 700, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em', fontFamily: INTER }}>
                    Savings account interest rates: which bank pays the most?
                  </h2>
                  <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 12px', fontFamily: INTER }}>
                    Yes Bank and IDFC First Bank both offer 7.00% savings account interest rate, by far the highest among major banks, on balances up to Rs 1 crore. On a Rs 2 lakh balance, that earns Rs 14,000 annually, compared to Rs 5,400 at SBI (2.70%). The difference of Rs 8,600 per year is significant for anyone maintaining large idle balances.
                  </p>
                  <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 12px', fontFamily: INTER }}>
                    Kotak Mahindra offers 4.00% for balances above Rs 1 lakh (3.50% below), making it the best option among traditional large private banks. IndusInd Bank and Post Office Savings account also offer 4.00% flat. HDFC and Axis Bank offer 3.50% for balances above Rs 50 lakh, with 3.00% below that.
                  </p>
                  <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: 0, fontFamily: INTER }}>
                    Savings account interest is calculated daily on the end-of-day balance and credited quarterly per RBI guidelines. The higher rates at Yes Bank and IDFC First Bank are genuine competitive offerings, not introductory rates. Both are regularly renewed and visible on their official rate cards per <a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>RBI</a> guidelines on interest rate deregulation.
                  </p>
                </section>

                {/* Section 4 */}
                <section style={{ marginBottom: 40 }}>
                  <h2 id="home-loan-rates" style={{ fontSize: mobile ? 20 : 24, fontWeight: 700, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em', fontFamily: INTER }}>
                    Home loan interest rates across banks (post-RBI rate cuts)
                  </h2>
                  <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 12px', fontFamily: INTER }}>
                    Bank of Baroda currently offers the lowest home loan rate at 7.15% p.a., followed by SBI at 7.25% (EBLR-linked). The RBI cut the repo rate by a total of 125 basis points from 6.50% in early 2025 to 5.25% by July 2026, and home loan rates have declined by approximately 100-125 bps in the same period. On a Rs 75 lakh loan for 20 years, the difference between 7.15% (Bank of Baroda) and 7.90% (ICICI/Kotak) adds up to approximately Rs 3.5 lakh in extra interest paid.
                  </p>
                  <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginBottom: 12 }}>
                    <table style={{ fontSize: 13, borderCollapse: 'collapse', width: '100%', minWidth: 380 }}>
                      <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '6px 0', textAlign: 'left', fontFamily: INTER }}>Floating rates as of July 2026. Actual rate depends on CIBIL score and income.</caption>
                      <thead>
                        <tr>
                          <th style={thS} scope="col">Bank</th>
                          <th style={{ ...thS, textAlign: 'right' }} scope="col">Rate (p.a.)</th>
                          <th style={{ ...thS, textAlign: 'right' }} scope="col">EMI on Rs 75L (20Y)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {HOME_LOAN_BANKS.map(bank => {
                          const emi = Math.round(calcEMI(7500000, bank.rate, 240));
                          return (
                            <tr key={bank.name}>
                              <td style={tdL}>{bank.name}</td>
                              <td style={tdR}>{bank.rate.toFixed(2)}%</td>
                              <td style={tdR}>Rs {fmtINR(emi)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: 0, fontFamily: INTER }}>
                    All rates shown are floating, linked to external benchmarks. The{' '}
                    <Link href="/calculators/mortgage-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Home Loan EMI Calculator</Link>{' '}
                    lets you run a full amortization schedule for any of these rates.
                  </p>
                </section>

                {/* Section 5 */}
                <section style={{ marginBottom: 40 }}>
                  <h2 id="personal-loan-rates" style={{ fontSize: mobile ? 20 : 24, fontWeight: 700, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em', fontFamily: INTER }}>
                    Personal loan interest rates: cheapest banks in India
                  </h2>
                  <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 12px', fontFamily: INTER }}>
                    SBI offers the lowest personal loan rate among major banks at 10.30% p.a. PNB follows at 10.40%, and both Axis Bank and IndusInd Bank offer 10.49%. HDFC Bank stands at 10.50%. Yes Bank is the most expensive at 11.99%, a premium of 169 basis points over SBI. On a Rs 5 lakh loan for 3 years, this rate gap translates to approximately Rs 13,400 in additional total interest.
                  </p>
                  <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 12px', fontFamily: INTER }}>
                    Personal loan rates are significantly higher than home loan rates because they are unsecured. Banks charge a premium for the absence of collateral. CIBIL score is the single biggest determinant of the rate a borrower is offered: a score of 750 and above typically qualifies for the published base rate, while scores between 700-749 carry a 0.25-0.50% surcharge.
                  </p>
                  <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Personal Loan EMI Calculator</p>
                      <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Calculate EMI and total interest for any personal loan amount and tenure.</p>
                    </div>
                    <Link className="fx-btn" href="/calculators/personal-loan-calculator" target="_blank" rel="noopener noreferrer"
                      style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                  </div>
                </section>

                {/* Section 6 */}
                <section style={{ marginBottom: 40 }}>
                  <h2 id="gold-loan-rates" style={{ fontSize: mobile ? 20 : 24, fontWeight: 700, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em', fontFamily: INTER }}>
                    Gold loan interest rates: banks vs NBFCs
                  </h2>
                  <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 12px', fontFamily: INTER }}>
                    Banks charge 8.75-9.50% on gold loans, while NBFCs like Muthoot Finance and Manappuram charge 12.00%, a premium of 250-325 basis points. The NBFC premium is explained by faster processing (disbursals in under 30 minutes), higher loan-to-value ratios (up to 75% of gold value versus 70% at most banks), and more flexible end-use terms. SBI, Canara Bank, and PNB all offer 8.75%, making them the cheapest option for borrowers who can wait the standard bank processing time.
                  </p>
                  <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: 0, fontFamily: INTER }}>
                    Gold loans use simple interest calculation for the interest component. The pledge period is typically 3-12 months at most banks, with extensions available. RBI mandates that LTV for gold loans by banks must not exceed 75% of the gold value at any point, per {' '}
                    <a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>RBI Master Direction on Gold Loans</a>.
                  </p>
                </section>

                {/* Section 7 */}
                <section style={{ marginBottom: 40 }}>
                  <h2 id="senior-citizen-fd-rates" style={{ fontSize: mobile ? 20 : 24, fontWeight: 700, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em', fontFamily: INTER }}>
                    Senior citizen FD rates: 0.50-0.80% extra at every bank
                  </h2>
                  <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 12px', fontFamily: INTER }}>
                    Every major bank mandatorily offers a senior citizen premium on FD rates, ranging from 0.50% (most banks) to 0.80% (PNB). Senior citizens are defined as customers who have completed 60 years of age. The premium is applied automatically on presentation of age proof and applies to deposits of all tenures. Post Office NSC does not carry a senior citizen premium.
                  </p>
                  <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginBottom: 8 }}>
                    <table style={{ fontSize: 13, borderCollapse: 'collapse', width: '100%', minWidth: 400 }}>
                      <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '6px 0', textAlign: 'left', fontFamily: INTER }}>Senior citizen FD rates for 1-year deposits as of July 2026.</caption>
                      <thead>
                        <tr>
                          <th style={thS} scope="col">Bank</th>
                          <th style={{ ...thS, textAlign: 'right' }} scope="col">General Rate (1Y)</th>
                          <th style={{ ...thS, textAlign: 'right' }} scope="col">Sr Citizen Bonus</th>
                          <th style={{ ...thS, textAlign: 'right' }} scope="col">Sr Citizen Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {FD_BANKS.map(bank => {
                          const base = bank.rates[1];
                          return (
                            <tr key={bank.name}>
                              <td style={tdL}>{bank.name}</td>
                              <td style={tdR}>{base !== undefined ? `${base.toFixed(2)}%` : 'N/A'}</td>
                              <td style={tdR}>{bank.seniorExtra > 0 ? `+${bank.seniorExtra.toFixed(2)}%` : 'None'}</td>
                              <td style={tdR}>{base !== undefined && bank.seniorExtra > 0 ? `${(base + bank.seniorExtra).toFixed(2)}%` : (base !== undefined ? `${base.toFixed(2)}%` : 'N/A')}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Section 8 */}
                <section style={{ marginBottom: 40 }}>
                  <h2 id="post-office-vs-bank" style={{ fontSize: mobile ? 20 : 24, fontWeight: 700, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em', fontFamily: INTER }}>
                    Post office vs bank FD: the key differences
                  </h2>
                  <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 12px', fontFamily: INTER }}>
                    Post Office NSC at 7.70% for 3 years beats every major bank for that specific tenure. The NSC also qualifies for Section 80C deduction up to Rs 1.5 lakh per year under the Income Tax Act, giving investors an immediate tax saving that bank FDs (except the 5-year tax-saving FD) do not provide. The accrued interest on NSC is also eligible for 80C every year, effectively compounding the tax benefit.
                  </p>
                  <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginBottom: 12 }}>
                    <table style={{ fontSize: 13, borderCollapse: 'collapse', width: '100%', minWidth: 420 }}>
                      <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '6px 0', textAlign: 'left', fontFamily: INTER }}>Post Office NSC vs bank FD comparison.</caption>
                      <thead>
                        <tr>
                          <th style={thS} scope="col">Feature</th>
                          <th style={{ ...thS, textAlign: 'center' }} scope="col">Post Office NSC</th>
                          <th style={{ ...thS, textAlign: 'center' }} scope="col">Bank FD</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { feature: 'Highest rate (3Y)', nsc: '7.70%', bank: '7.50% (IDFC First)' },
                          { feature: 'Section 80C eligible', nsc: 'Yes (up to Rs 1.5L)', bank: 'Only 5-year tax-saving FD' },
                          { feature: 'Government guarantee', nsc: 'Sovereign guarantee', bank: 'Rs 5L DICGC insurance' },
                          { feature: 'Premature withdrawal', nsc: 'Not allowed (except death)', bank: 'Allowed with penalty' },
                          { feature: 'Loan against investment', nsc: 'Allowed (pledge)', bank: 'Allowed (overdraft facility)' },
                          { feature: 'Senior citizen premium', nsc: 'None', bank: '+0.50 to +0.80%' },
                          { feature: 'TDS on interest', nsc: 'No TDS (report as income)', bank: '10% TDS above Rs 40,000' },
                        ].map(row => (
                          <tr key={row.feature}>
                            <td style={tdL}>{row.feature}</td>
                            <td style={{ ...tdR, textAlign: 'center' }}>{row.nsc}</td>
                            <td style={{ ...tdR, textAlign: 'center' }}>{row.bank}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Section 9 */}
                <section style={{ marginBottom: 40 }}>
                  <h2 id="rbi-repo-rate-effect" style={{ fontSize: mobile ? 20 : 24, fontWeight: 700, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em', fontFamily: INTER }}>
                    How the RBI repo rate affects bank interest rates
                  </h2>
                  <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 12px', fontFamily: INTER }}>
                    The RBI repo rate is the rate at which banks borrow from the Reserve Bank of India. When RBI cuts the repo rate, banks can borrow more cheaply, which reduces their marginal cost of funds. This flows through to lower lending rates (home loans, personal loans) and, with a lag, to lower deposit rates as banks reduce the cost they need to pay for funds. RBI cut rates by a cumulative 125 bps from 6.50% in early 2025 to 5.25% by July 2026, per{' '}
                    <a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>RBI Monetary Policy decisions</a>.
                  </p>
                  <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: 0, fontFamily: INTER }}>
                    Home loan borrowers with floating-rate loans (all new loans since October 2019 are mandated to be linked to external benchmarks like the repo rate) saw their effective rates decline by approximately 100 bps. FD investors who locked in long-tenure deposits before the rate cut cycle began in 2025 are now holding above-market rates. For new FD investors, locking in 3-5 year FDs at current rates is a way to protect against any future rate cuts.
                  </p>
                </section>

                {/* Section 10 */}
                <section style={{ marginBottom: 40 }}>
                  <h2 id="tds-on-interest" style={{ fontSize: mobile ? 20 : 24, fontWeight: 700, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em', fontFamily: INTER }}>
                    TDS on bank interest: what you actually earn after tax
                  </h2>
                  <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 12px', fontFamily: INTER }}>
                    Banks deduct TDS at 10% on FD interest income if the total interest from a single bank in a financial year exceeds Rs 40,000 (Rs 50,000 for senior citizens). If PAN is not furnished, TDS is deducted at 20%. TDS is deducted at source regardless of when the FD matures; banks compute accrued interest periodically and deduct accordingly. For a Rs 5 lakh FD at 7.75% for 1 year, the interest is approximately Rs 40,048, which is above the Rs 40,000 TDS threshold, so 10% TDS of approximately Rs 4,005 is deducted.
                  </p>
                  <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: 0, fontFamily: INTER }}>
                    Submit Form 15G (below 60 years, total income below taxable limit) or Form 15H (senior citizens) at the start of each financial year to prevent TDS deduction. TDS is a payment on account, not a final tax. Declare all FD interest as income under "Income from Other Sources" when filing your ITR, and the final tax liability is determined by your applicable income tax slab. Use the{' '}
                    <Link href="/calculators/tds-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>TDS Calculator</Link>{' '}
                    to see the exact TDS impact on any interest income.
                  </p>
                </section>

                {/* Section 11 */}
                <section style={{ marginBottom: 40 }}>
                  <h2 id="maximize-fd-returns" style={{ fontSize: mobile ? 20 : 24, fontWeight: 700, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em', fontFamily: INTER }}>
                    How to maximize your FD returns in a falling rate environment
                  </h2>
                  <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 12px', fontFamily: INTER }}>
                    With the RBI in a rate-cutting cycle, FD rates will likely continue to decline over the next 12-18 months. The most effective strategy is laddering: split your FD corpus across three or four tenures (1Y, 2Y, 3Y, 5Y) instead of placing it all in one deposit. As each shorter FD matures, reinvest it at whatever rate is available. This prevents the full corpus from maturing at a low rate while giving you partial liquidity at regular intervals.
                  </p>
                  <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 12px', fontFamily: INTER }}>
                    Locking in a meaningful portion in the 3-5 year range now secures the current rate for that period regardless of future RBI cuts. Yes Bank at 7.25% for 5 years and IndusInd at 7.25% for 5 years, or IDFC First at 7.00% for 5 years, are worth considering for the long end of the ladder.
                  </p>
                  <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: 0, fontFamily: INTER }}>
                    Also consider splitting deposits across multiple banks to stay within the Rs 5 lakh DICGC insurance limit per bank. A Rs 30 lakh FD corpus in one bank is insured for Rs 5 lakh, while the same corpus split six ways across six banks is fully insured.
                  </p>
                </section>

                {/* Section 12 */}
                <section style={{ marginBottom: 40 }}>
                  <h2 id="how-to-use" style={{ fontSize: mobile ? 20 : 24, fontWeight: 700, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em', fontFamily: INTER }}>
                    How to use this bank interest rate comparison tool
                  </h2>
                  <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 12px', fontFamily: INTER }}>
                    The calculator compares bank interest rates across five product types. Each tab runs independent inputs and shows a ranked comparison of all banks for your specific amount and tenure.
                  </p>
                  <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, fontFamily: INTER }}>
                      <strong style={{ color: C.ink }}>Select the product tab:</strong> Choose FD Rates, Savings Account, Home Loan, Personal Loan, or Gold Loan. Each tab has independent inputs.
                    </li>
                    <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, fontFamily: INTER }}>
                      <strong style={{ color: C.ink }}>Set your amount:</strong> Use the slider or click the value button to enter your deposit or loan amount. The slider range is preset for each product type.
                    </li>
                    <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, fontFamily: INTER }}>
                      <strong style={{ color: C.ink }}>Choose tenure:</strong> Click the tenure pill that matches your requirement. FDs support 1Y, 2Y, 3Y, 5Y; home loans support 5Y to 30Y.
                    </li>
                    <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, fontFamily: INTER }}>
                      <strong style={{ color: C.ink }}>Toggle senior citizen (FD tab only):</strong> Switch on the Senior Citizen toggle to see rates with bank-specific senior citizen bonuses (0.50-0.80% extra).
                    </li>
                    <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, fontFamily: INTER }}>
                      <strong style={{ color: C.ink }}>Read the ranked table:</strong> Banks are sorted from best (highest return or lowest cost) to worst. The winner is highlighted in green. The "vs Best" column shows how much more or less you gain or pay vs the best bank.
                    </li>
                  </ol>
                </section>

                

                {/* FAQ Section */}
                <section id="faq-section" style={{ marginBottom: 40 }}>
                  <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 700, color: C.ink, margin: '0 0 20px', letterSpacing: '-0.02em', fontFamily: INTER }}>
                    Frequently asked questions
                  </h2>
                  <FAQBox items={FAQ_ITEMS} />
                </section>

                {/* Disclaimer */}
                <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                  <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0, fontFamily: INTER }}>
                    <strong>Disclaimer:</strong> All rates shown reflect published rates from respective banks and institutions as of July 2026. Bank interest rates change frequently and without prior notice. This tool is for informational and comparison purposes only and does not constitute financial advice. Verify rates directly with the bank before investing or borrowing. Deposit insurance of Rs 5 lakh per depositor per bank is provided by DICGC, a wholly owned subsidiary of the Reserve Bank of India. Consult a SEBI-registered investment adviser before making investment decisions.
                  </p>
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <style>{`
              .bank-compare-sidebar::-webkit-scrollbar { width: 5px; }
              .bank-compare-sidebar::-webkit-scrollbar-track { background: transparent; }
              .bank-compare-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
              .bank-compare-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
            `}</style>
            <aside className="bank-compare-sidebar"
              style={{
                position: mobile ? 'static' : 'sticky',
                top: 20,
                alignSelf: 'start',
                maxHeight: mobile ? 'none' : 'calc(100vh - 40px)',
                overflowY: mobile ? 'visible' : 'auto',
                paddingRight: mobile ? 0 : 2,
                scrollbarWidth: 'thin',
                scrollbarColor: '#C4C9C4 transparent',
              } as React.CSSProperties}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <RateSnapshot />
                <SidebarList
                  title="Popular Calculators"
                  items={[
                    { href: '/calculators/fd-calculator', label: 'FD Calculator' },
                    { href: '/calculators/gold-loan-calculator', label: 'Gold Loan Calculator' },
                    { href: '/calculators/mortgage-calculator', label: 'Mortgage Calculator' },
                    { href: '/calculators/savings-account-interest-calculator', label: 'Savings Account Interest Calculator' },
                    { href: '/calculators/personal-loan-calculator', label: 'Personal Loan Calculator' },
                    { href: '/calculators/home-loan-eligibility-calculator', label: 'Home Loan Eligibility Calculator' },
                    { href: '/calculators/tds-calculator', label: 'TDS Calculator' },
                  ]}
                />
                <SidebarList
                  title="More Calculators"
                  items={[
                    { href: '/calculators/nsc-calculator', label: 'NSC Calculator' },
                    { href: '/calculators/scss-calculator', label: 'SCSS Calculator' },
                    { href: '/calculators/rd-calculator', label: 'RD Calculator' },
                    { href: '/calculators/ppf-calculator', label: 'PPF Calculator' },
                    { href: '/calculators/balance-transfer-savings-calculator', label: 'Balance Transfer Savings Calculator' },
                  ]}
                />
              </div>
            </aside>
          </div>
        </div>

        {/* Footer */}
        <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: [ '/calculators/fd-calculator|FD Calculator', '/calculators/mortgage-calculator|Mortgage', '/calculators/sip-calculator|SIP', '/calculators/gold-loan-calculator|Gold Loan', '/calculators/income-tax-calculator|Income Tax', '/calculators/emi-calculator|EMI', ]},
        { hd: 'Topics', links: ['/#|Fixed Deposits', '/#|Home Loans', '/#|Savings', '/#|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Rates are indicative. Not financial advice." />
      </div>
    </>
  );
}

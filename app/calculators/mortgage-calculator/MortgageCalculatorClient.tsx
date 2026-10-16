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
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { FAQS } from './faqData';
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

/* ── Math ──────────────────────────────────────────────── */
function calcEMI(p: number, annualRate: number, months: number): number {
  if (months === 0 || p === 0) return 0;
  if (annualRate === 0) return p / months;
  const r = annualRate / 12 / 100;
  return (p * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

interface YearRow {
  year: number;
  openingBal: number;
  principal: number;
  interest: number;
  closingBal: number;
}

function buildAmortization(p: number, annualRate: number, months: number, emi: number): YearRow[] {
  const rows: YearRow[] = [];
  let balance = p;
  const r = annualRate / 12 / 100;
  const startYear = new Date().getFullYear();
  for (let y = 0; y < Math.ceil(months / 12); y++) {
    const opening = balance;
    let yPrin = 0, yInt = 0;
    const mo = Math.min(12, months - y * 12);
    for (let m = 0; m < mo; m++) {
      const intPart = balance * r;
      const prinPart = Math.min(emi - intPart, balance);
      yInt += intPart;
      yPrin += prinPart;
      balance = Math.max(0, balance - prinPart);
    }
    rows.push({ year: startYear + y, openingBal: opening, principal: yPrin, interest: yInt, closingBal: balance });
    if (balance <= 0.01) break;
  }
  return rows;
}

interface PrepayResult {
  months: number;
  totalInterest: number;
}

function calcWithPrepay(p: number, annualRate: number, maxMonths: number, emi: number, extraMonthly: number): PrepayResult {
  let balance = p;
  let month = 0;
  let totalInterest = 0;
  const r = annualRate / 12 / 100;
  while (balance > 0.01 && month < maxMonths) {
    const intPart = balance * r;
    const prinPart = Math.min(emi - intPart, balance);
    totalInterest += intPart;
    balance -= prinPart;
    if (balance > 0.01) balance = Math.max(0, balance - extraMonthly);
    month++;
  }
  return { months: month, totalInterest };
}

function calcMaxLoan(grossMonthly: number, existingEMI: number, annualRate: number, months: number): number {
  const maxEMI = grossMonthly * 0.4 - existingEMI;
  if (maxEMI <= 0 || annualRate === 0 || months === 0) return 0;
  const r = annualRate / 12 / 100;
  return maxEMI * (Math.pow(1 + r, months) - 1) / (r * Math.pow(1 + r, months));
}

/* ── DonutChart ────────────────────────────────────────── */
function DonutChart({ principal, interest }: { principal: number; interest: number }) {
  const total = principal + interest;
  if (total === 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const pArc  = (principal / total) * circ;
  const pPct  = Math.round((principal / total) * 100);
  return (
    <svg role="img" aria-label={`Loan split: ${pPct}% principal, ${100 - pPct}% interest`}
      width="216" height="216" viewBox="0 0 216 216" style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Principal</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
  );
}

/* ── Bar Chart ─────────────────────────────────────────── */
function BarChart({ rows }: { rows: YearRow[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxAnnual = Math.max(...rows.map(r => r.principal + r.interest));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;

  return (
    <svg role="img" aria-label="Annual principal and interest breakdown bar chart"
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
                {row.year.toString().slice(2)}
              </text>
            )}
          </g>
        );
      })}
      <line x1={PADL} y1={H} x2={W} y2={H} stroke={C.border} strokeWidth={1} />
    </svg>
  );
}

/* ── Slider ────────────────────────────────────────────── */
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
    <div style={{ marginBottom: compact ? 18 : 36 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 8 : 14 }}>
        {label ? (
          <label htmlFor={editing ? inputId : rangeId}
            style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400 }}>{label}</label>
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
            style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: C.dark, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 18px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 90 : 110, textAlign: 'center' }}
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
        <span style={{ fontSize: 11, color: C.ink3 }}>{min}</span>
        <span style={{ fontSize: 11, color: C.ink3 }}>{max}</span>
      </div>
    </div>
  );
}

/* ── FAQ data lives in ./faqData.ts, shared with page.tsx schema (imported above) ── */

/* ── Market Accordion (State of the Indian Home Loan Market) ── */
const MARKET_SECTIONS = [
  {
    title: 'RBI Repo Rate Cycle',
    body: [
      'The RBI Monetary Policy Committee cut the repo rate four times through 2025, taking it from 6.50% to 5.25%, a cumulative reduction of 125 basis points. The June 2026 MPC meeting held the rate steady at 5.25%.',
      'Banks linked to RLLR or EBLR must pass a repo cut through within three months, per RBI mandate, which is why floating-rate EMIs fell in step through 2025.',
    ],
  },
  {
    title: 'Balance Transfer Trends',
    body: [
      "A balance transfer, India's equivalent of a US mortgage refinance, moves an existing loan to a new lender at a lower rate. It is worth doing once the rate gap is at least 0.5% and more than 5 years of tenure remain.",
      "Moving a Rs 50 lakh balance from 9% to 7.5% with 15 years remaining saves roughly Rs 4,363 a month, before the new lender's processing fee of 0.5-1%.",
    ],
  },
  {
    title: 'Banks vs Housing Finance Companies',
    body: [
      'Public and private banks price new loans on RBI-mandated external benchmarks like RLLR or EBLR, seen in 11 of the 12 lenders in the rate table above.',
      'LIC Housing Finance, a housing finance company rather than a bank, still prices part of its book on PLR-linked rates, which can adjust more slowly than a repo-linked bank loan.',
    ],
  },
  {
    title: 'Low Down Payment Support',
    body: [
      'PMAY remains the main government-backed route to reducing the effective cost of a down payment for first-time buyers, through the interest subsidy explained in the PMAY section above rather than a cash waiver.',
    ],
  },
];

function MarketAccordion() {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));
  const toggle = (i: number) => setOpen(p => { const n = new Set(p); n.has(i) ? n.delete(i) : n.add(i); return n; });
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
      {MARKET_SECTIONS.map((s, i) => {
        const o = open.has(i);
        return (
          <div key={s.title} style={{ borderBottom: i < MARKET_SECTIONS.length - 1 ? `1px solid ${C.border}` : 'none' }}>
            <button id={`market-btn-${i}`} onClick={() => toggle(i)}
              aria-expanded={o} aria-controls={`market-panel-${i}`}
              style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 14, fontFamily: INTER }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>{s.title}</span>
              <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={o ? C.dark : C.ink3} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: o ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {o && (
              <div id={`market-panel-${i}`} role="region" aria-labelledby={`market-btn-${i}`} style={{ padding: '0 20px 18px' }}>
                {s.body.map((p, j) => (
                  <p key={j} style={{ fontSize: 14, color: C.ink2, lineHeight: 1.75, margin: j < s.body.length - 1 ? '0 0 10px' : 0 }}>
                    {p}
                  </p>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── FAQ Accordion ─────────────────────────────────────── */
function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ── Sidebar Nav ───────────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ padding: '13px 20px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 14, color: C.ink2, transition: 'all 0.12s' }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = C.paleLime; (e.currentTarget as HTMLElement).style.color = C.dark; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink2; }}>
            {label}
          </div>
        </Link>
      ))}
    </div>
  );
}

/* ── Mortgage Snapshot (sidebar facts box) ─────────────── */
function MortgageSnapshot() {
  const rows = [
    { label: 'Lowest starting rate (PNB, BoB)', value: '7.15%' },
    { label: 'RBI repo rate (as of Jun 2026 MPC)', value: '5.25%' },
    { label: 'Cumulative repo cuts (2025 cycle)', value: '125 bps' },
    { label: 'Max loan tenure', value: '30 years' },
    { label: 'Standard down payment', value: '20%' },
    { label: 'PMAY max subsidy (Interest Subsidy Scheme)', value: 'Rs 1.8L' },
    { label: 'Prepayment penalty (floating rate)', value: 'Nil' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Home Loan Snapshot</span>
      </div>
      {rows.map((r, i) => (
        <div key={r.label} style={{ padding: '11px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: C.white, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12.5, color: C.ink2 }}>{r.label}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ── RelatedReads (white box, news interlinks) ─────────── */
function RelatedReads() {
  const links = [
    { href: '/blogs/income-tax-slabs-fy-2025-26', label: 'Income Tax Slabs FY 2025-26: New vs Old Regime Rates' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Related Reads</span>
      </div>
      {links.map(l => (
        <Link key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', padding: '13px 16px', textDecoration: 'none', background: C.white }}>
          <span style={{ fontSize: 13, color: C.dark, fontWeight: 500, lineHeight: 1.5, display: 'block' }}>{l.label}</span>
        </Link>
      ))}
    </div>
  );
}

const POPULAR = [
  { href: '/calculators/home-loan-eligibility-calculator',   label: 'Home Loan Eligibility Calculator' },
  { href: '/calculators/sbi-home-loan-calculator',           label: 'SBI Home Loan Calculator' },
  { href: '/calculators/emi-calculator',                     label: 'Personal Loan EMI Calculator' },
  { href: '/calculators/car-loan-calculator',                label: 'Car Loan EMI Calculator' },
  { href: '/calculators/education-loan-emi-calculator',      label: 'Education Loan Calculator' },
  { href: '/calculators/balance-transfer-savings-calculator',label: 'Loan Balance Transfer Savings' },
  { href: '/calculators/income-tax-calculator',              label: 'Income Tax Calculator' },
];
const MORE = [
  { href: '/calculators/sip-calculator',                     label: 'SIP Calculator' },
  { href: '/calculators/fd-calculator',                      label: 'FD Calculator' },
  { href: '/calculators/personal-loan-eligibility-calculator', label: 'Personal Loan Eligibility' },
  { href: '/calculators/business-loan-eligibility-calculator', label: 'Business Loan Eligibility' },
  { href: '/calculators/debt-to-income-ratio-calculator',    label: 'Debt-to-Income Ratio Calculator' },
];

/* ── Article table styles ──────────────────────────────── */
const thS: React.CSSProperties = {
  padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: '#16140F',
  background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase',
  letterSpacing: '0.05em', border: `1px solid #e3e6e8`, whiteSpace: 'nowrap',
  verticalAlign: 'middle',
};
const tdL: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: '#50565c', border: `1px solid #e3e6e8`, verticalAlign: 'middle', textAlign: 'left' };
const tdR: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: '#16140F', fontWeight: 500, border: `1px solid #e3e6e8`, verticalAlign: 'middle', textAlign: 'right' };

/* ── Year Presets ──────────────────────────────────────── */
const YR_PRESETS = [5, 10, 15, 20, 30];
const EXTRA_PAY_PRESETS = [2000, 5000, 10000, 15000, 25000];
const INCOME_PRESETS = [50000, 75000, 100000, 150000, 200000];

/* ── EMI lookup table rows (7.5% p.a.) ─────────────────── */
const EMI_TABLE_ROWS: [string, string, string, string, string, string, string][] = [
  ['Rs 18 lakh', '36,068', '21,366', '16,686', '14,501', '13,302', '12,586'],
  ['Rs 20 lakh', '40,076', '23,740', '18,540', '16,112', '14,780', '13,984'],
  ['Rs 25 lakh', '50,095', '29,675', '23,175', '20,140', '18,475', '17,480'],
  ['Rs 27 lakh', '54,102', '32,049', '25,029', '21,751', '19,953', '18,879'],
  ['Rs 30 lakh', '60,114', '35,611', '27,810', '24,168', '22,170', '20,976'],
  ['Rs 32 lakh', '64,121', '37,985', '29,664', '25,779', '23,648', '22,375'],
  ['Rs 38 lakh', '76,144', '45,107', '35,226', '30,613', '28,082', '26,570'],
  ['Rs 40 lakh', '80,152', '47,481', '37,080', '32,224', '29,560', '27,969'],
  ['Rs 45 lakh', '90,171', '53,416', '41,716', '36,252', '33,255', '31,465'],
  ['Rs 46 lakh', '92,175', '54,603', '42,643', '37,057', '33,994', '32,164'],
  ['Rs 50 lakh', '1,00,190', '59,351', '46,351', '40,280', '36,950', '34,961'],
  ['Rs 52 lakh', '1,04,197', '61,725', '48,205', '41,891', '38,428', '36,359'],
  ['Rs 54 lakh', '1,08,205', '64,099', '50,059', '43,502', '39,906', '37,758'],
  ['Rs 55 lakh', '1,10,209', '65,286', '50,986', '44,308', '40,645', '38,457'],
  ['Rs 58 lakh', '1,16,220', '68,847', '53,767', '46,724', '42,861', '40,554'],
  ['Rs 60 lakh', '1,20,228', '71,221', '55,621', '48,336', '44,339', '41,953'],
  ['Rs 65 lakh', '1,30,247', '77,156', '60,256', '52,364', '48,034', '45,449'],
  ['Rs 70 lakh', '1,40,266', '83,091', '64,891', '56,392', '51,729', '48,945'],
  ['Rs 80 lakh', '1,60,304', '94,961', '74,161', '64,447', '59,119', '55,937'],
  ['Rs 1 crore', '2,00,379', '1,18,702', '92,701', '80,559', '73,899', '69,921'],
  ['Rs 1.4 crore', '2,80,531', '1,66,182', '1,29,782', '1,12,783', '1,03,459', '97,890'],
  ['Rs 1.5 crore', '3,00,569', '1,78,053', '1,39,052', '1,20,839', '1,10,849', '1,04,882'],
  ['Rs 2 crore', '4,00,759', '2,37,404', '1,85,402', '1,61,119', '1,47,798', '1,39,843'],
  ['Rs 5 crore', '10,01,897', '5,93,509', '4,63,506', '4,02,797', '3,69,496', '3,49,607'],
];
const EMI_TABLE_DEFAULT_ROWS = 8;

/* ── Main Component ────────────────────────────────────── */
export default function MortgageCalculatorClient() {
  const defaultSettings = {
    homePrice: 7500000, downPaymentPct: 20, rate: 7.5,
    tenureYr: 20, tenureMode: 'yr', tenureMo: 240,
    propTaxAnnual: 0, homeInsAnnual: 0,
  };
  const { settings, updateSettings } = useCalculatorSettings('mortgage-calculator', defaultSettings);
  const { homePrice, downPaymentPct, rate, tenureYr, tenureMode, tenureMo, propTaxAnnual, homeInsAnnual } = settings;

  const setHomePrice      = (v: number) => updateSettings({ homePrice: v });
  const setDownPaymentPct = (v: number) => updateSettings({ downPaymentPct: v });
  const setRate           = (v: number) => updateSettings({ rate: v });
  const setTenureYr       = (v: number) => updateSettings({ tenureYr: v, tenureMo: v * 12 });
  const setTenureMode     = (v: string) => updateSettings({ tenureMode: v });
  const setTenureMo       = (v: number) => updateSettings({ tenureMo: v, tenureYr: Math.round(v / 12) });
  const setPropTax        = (v: number) => updateSettings({ propTaxAnnual: v });
  const setHomeIns        = (v: number) => updateSettings({ homeInsAnnual: v });

  const [mobile, setMobile]       = useState(false);
  const [activeTab, setActiveTab] = useState<'emi' | 'prepay' | 'eligibility'>('emi');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showAmort, setShowAmort] = useState(false);
  const [showChart, setShowChart] = useState(true);
  const [showAllEmiRows, setShowAllEmiRows] = useState(false);

  /* Prepayment tab state */
  const [extraMonthly, setExtraMonthly] = useState(5000);
  /* Eligibility tab state */
  const [monthlyIncome, setMonthlyIncome] = useState(100000);
  const [existingEMI, setExistingEMI]     = useState(0);

  /* Persist extra tab state */
  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-mortgage-tabs-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (d.extraMonthly !== undefined) setExtraMonthly(d.extraMonthly);
      if (d.monthlyIncome !== undefined) setMonthlyIncome(d.monthlyIncome);
      if (d.existingEMI  !== undefined) setExistingEMI(d.existingEMI);
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem('fermor-mortgage-tabs-v1', JSON.stringify({ extraMonthly, monthlyIncome, existingEMI })); } catch {}
  }, [extraMonthly, monthlyIncome, existingEMI]);

  const { formatCurrency, convertCurrency, selectedCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk();
    window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  /* Core derived values */
  const downPayment = homePrice * downPaymentPct / 100;
  const amount      = homePrice - downPayment;
  const months      = tenureMode === 'yr' ? tenureYr * 12 : tenureMo;
  const emi         = useMemo(() => calcEMI(amount, rate, months), [amount, rate, months]);
  const totalPayable   = emi * months;
  const totalInterest  = totalPayable - amount;
  const principalPct   = totalPayable > 0 ? Math.round((amount / totalPayable) * 100) : 0;
  const interestPct    = 100 - principalPct;

  const monthlyPropTax = propTaxAnnual / 12;
  const monthlyIns     = homeInsAnnual / 12;
  const totalMonthly   = emi + monthlyPropTax + monthlyIns;

  const emiPerLakh  = amount > 0 ? Math.round(emi / (amount / 100000)) : 0;
  const payoffDate  = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + months);
    return d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
  }, [months]);

  const amortRows = useMemo(() => buildAmortization(amount, rate, months, emi), [amount, rate, months, emi]);

  /* Prepayment derived values */
  const prepayResult = useMemo(() => {
    if (extraMonthly <= 0 || emi <= 0) return null;
    return calcWithPrepay(amount, rate, months, emi, extraMonthly);
  }, [amount, rate, months, emi, extraMonthly]);
  const monthsSaved    = prepayResult ? months - prepayResult.months : 0;
  const interestSaved  = prepayResult ? Math.max(0, totalInterest - prepayResult.totalInterest) : 0;

  /* Eligibility derived values */
  const eligMonths = tenureMode === 'yr' ? tenureYr * 12 : tenureMo;
  const maxLoan = useMemo(() => calcMaxLoan(monthlyIncome, existingEMI, rate, eligMonths),
    [monthlyIncome, existingEMI, rate, eligMonths]);
  const maxProperty = maxLoan / 0.8;
  const maxEligEMI  = Math.max(0, monthlyIncome * 0.4 - existingEMI);

  /* ── JSX ── */
  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        {/* Page header */}
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Home Loan EMI Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate your monthly EMI, total interest cost and full amortization schedule. Check prepayment savings and see how much loan you qualify for, all in one place.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          {/* LEFT */}
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>

              {/* Tab strip */}
              <div role="tablist" aria-label="Calculator mode"
                style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                {([
                  { id: 'emi',         label: 'EMI Calculator' },
                  { id: 'prepay',      label: 'Prepayment' },
                  { id: 'eligibility', label: 'Loan Eligibility' },
                ] as const).map(t => (
                  <button key={t.id} id={`tab-${t.id}`} role="tab"
                    aria-selected={activeTab === t.id} aria-controls={`panel-${t.id}`}
                    onClick={() => setActiveTab(t.id)}
                    style={{
                      flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: mobile ? 12 : 13.5, fontWeight: activeTab === t.id ? 700 : 400,
                      color: activeTab === t.id ? C.dark : C.ink3,
                      borderBottom: activeTab === t.id ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                      transition: 'all 0.15s', fontFamily: INTER, whiteSpace: 'nowrap',
                    }}>
                    {t.label}
                  </button>
                ))}
              </div>

              {/* ── TAB 1: EMI Calculator ── */}
              {activeTab === 'emi' && (
                <div id="panel-emi" role="tabpanel" aria-labelledby="tab-emi">
                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                    {/* Input panel */}
                    <div style={{ padding: mobile ? '20px 18px' : '40px 40px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                        <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Loan Details</p>
                        <CurrencySelector theme="light" />
                      </div>

                      {!showAdvanced ? (
                        <>
                          <Slider id="home-price" label="Home Price" value={homePrice} min={500000} max={100000000} step={50000}
                            display={fmtC(homePrice)} onChange={setHomePrice} compact={mobile} />
                          <Slider id="down-payment" label="Down Payment" value={downPaymentPct} min={0} max={50} step={1}
                            display={`${downPaymentPct}% (${fmtC(downPayment)})`} onChange={setDownPaymentPct} compact={mobile} />
                          <Slider id="interest-rate" label="Interest Rate (% p.a.)" value={rate} min={1} max={20} step={0.05}
                            display={`${rate.toFixed(2)}%`} onChange={setRate} compact={mobile} />
                          {/* Tenure */}
                          <div style={{ marginBottom: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: mobile ? 8 : 14 }}>
                              <label style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400 }}>Loan Tenure</label>
                              <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                                {(['yr', 'mo'] as const).map(m => (
                                  <button key={m} onClick={() => setTenureMode(m)}
                                    style={{ padding: mobile ? '5px 10px' : '6px 14px', border: 'none', borderRight: m === 'yr' ? `1px solid ${C.border}` : 'none', background: tenureMode === m ? C.white : 'transparent', color: tenureMode === m ? C.ink : C.ink3, fontFamily: INTER, fontSize: 13, fontWeight: tenureMode === m ? 600 : 400, cursor: 'pointer', transition: 'all 0.15s' }}>
                                    {m === 'yr' ? 'Years' : 'Months'}
                                  </button>
                                ))}
                              </div>
                            </div>
                            {/* Year presets */}
                            {tenureMode === 'yr' && (
                              <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
                                {YR_PRESETS.map(y => (
                                  <button key={y} onClick={() => setTenureYr(y)}
                                    style={{ padding: '4px 10px', fontSize: 12, fontWeight: tenureYr === y ? 700 : 500, background: C.white, color: tenureYr === y ? C.ink : C.ink3, border: `${tenureYr === y ? 1.5 : 1}px solid ${tenureYr === y ? C.ink : C.border}`, borderRadius: 6, cursor: 'pointer', fontFamily: INTER, transition: 'all 0.15s' }}>
                                    {y}Y
                                  </button>
                                ))}
                              </div>
                            )}
                            {tenureMode === 'yr'
                              ? <Slider id="tenure-yr" label="" value={tenureYr} min={1} max={30} step={1} display={`${tenureYr} yr`} onChange={setTenureYr} compact={mobile} />
                              : <Slider id="tenure-mo" label="" value={tenureMo} min={12} max={360} step={1} display={`${tenureMo} mo`} onChange={setTenureMo} compact={mobile} />}
                          </div>
                          <button onClick={() => setShowAdvanced(true)}
                            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                            More settings
                            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                          </button>
                        </>
                      ) : (
                        <>
                          <Slider id="prop-tax" label="Property Tax (per year)" value={propTaxAnnual} min={0} max={500000} step={1000}
                            display={fmtC(propTaxAnnual)} onChange={setPropTax} compact={mobile} />
                          <Slider id="home-ins" label="Home Insurance (per year)" value={homeInsAnnual} min={0} max={200000} step={1000}
                            display={fmtC(homeInsAnnual)} onChange={setHomeIns} compact={mobile} />
                          <button onClick={() => setShowAdvanced(false)}
                            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                            Back
                          </button>
                        </>
                      )}
                    </div>

                    {/* Results panel */}
                    <div style={{ padding: mobile ? '20px 18px' : '40px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      {/* Donut */}
                      <div style={{ order: mobile ? 1 : -1, marginBottom: mobile ? 16 : 20 }}>
                        <DonutChart principal={amount} interest={totalInterest} />
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

                      {/* Monthly EMI highlight */}
                      <div style={{ width: '100%', background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 12, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 700, color: C.dark }}>Monthly EMI</span>
                        <span aria-live="polite" aria-label={`Monthly EMI: ${fmtIN(emi)}`}
                          style={{ fontSize: mobile ? 20 : 26, fontWeight: 800, color: C.dark, letterSpacing: '-0.02em' }}>
                          {fmtIN(emi)}
                        </span>
                      </div>

                      {(propTaxAnnual > 0 || homeInsAnnual > 0) && (
                        <>
                          {[
                            { label: 'Property tax / mo', value: fmtC(monthlyPropTax) },
                            { label: 'Insurance / mo',    value: fmtC(monthlyIns) },
                          ].filter(r => parseFloat(r.value.replace(/[^0-9.]/g, '')) > 0).map(r => (
                            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: mobile ? '8px 0' : '10px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                              <span style={{ fontSize: 13, color: C.ink2 }}>{r.label}</span>
                              <span style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{r.value}</span>
                            </div>
                          ))}
                          <div style={{ display: 'flex', justifyContent: 'space-between', padding: mobile ? '8px 0' : '10px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                            <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Total monthly cost</span>
                            <span style={{ fontSize: 14, fontWeight: 800, color: C.dark }}>{fmtC(totalMonthly)}</span>
                          </div>
                        </>
                      )}

                      {[
                        { label: 'Loan amount',           value: fmtC(amount) },
                        { label: 'Down payment',          value: fmtC(downPayment) },
                        { label: 'Total interest',        value: fmtC(totalInterest) },
                        { label: 'Total amount payable',  value: fmtC(totalPayable) },
                        { label: 'EMI per lakh borrowed',  value: `${fmtIN(emiPerLakh)} / Rs 1L` },
                        { label: 'Estimated loan payoff',  value: payoffDate },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '14px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                        </div>
                      ))}

                      {/* Split bar */}
                      <div style={{ width: '100%', marginTop: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 12, color: C.ink3 }}>Principal {principalPct}%</span>
                          <span style={{ fontSize: 12, color: C.ink3 }}>Interest {interestPct}%</span>
                        </div>
                        <div style={{ height: 6, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${principalPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Amortization toggle */}
                  <div style={{ borderTop: `1px solid ${C.border}` }}>
                    <button onClick={() => setShowAmort(v => !v)} aria-expanded={showAmort} aria-controls="amort-panel"
                      style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '18px 40px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                      <div style={{ minWidth: 0 }}>
                        <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.ink }}>Amortization Schedule</span>
                        {!mobile && <span style={{ fontSize: 13, color: C.ink3, marginLeft: 10 }}>Year-by-year breakdown</span>}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 8 : 12, flexShrink: 0 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: C.dark, background: C.paleLime, border: `1px solid ${C.lime2}`, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                          {amortRows.length} yr
                        </span>
                        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          style={{ transform: showAmort ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </button>

                    {showAmort && (
                      <div id="amort-panel" style={{ borderTop: `1px solid ${C.border}` }}>
                        {/* Bar chart */}
                        <div style={{ padding: mobile ? '16px 16px 8px' : '24px 40px 12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>Payment breakdown by year</span>
                            <div style={{ display: 'flex', gap: 14 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                <div style={{ width: 10, height: 10, background: C.dark, borderRadius: 2 }} aria-hidden="true" />
                                <span style={{ fontSize: 11, color: C.ink3 }}>Principal</span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                <div style={{ width: 10, height: 10, background: C.lime2, borderRadius: 2 }} aria-hidden="true" />
                                <span style={{ fontSize: 11, color: C.ink3 }}>Interest</span>
                              </div>
                            </div>
                          </div>
                          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                            <BarChart rows={amortRows} />
                          </div>
                        </div>
                        {/* Table */}
                        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                          {mobile && <p style={{ padding: '0 16px 8px', fontSize: 11, color: C.ink3, margin: 0 }}>Swipe to see full table</p>}
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                            <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 24px', textAlign: 'left' }}>
                              Year-by-year home loan repayment schedule. All values in {selectedCurrency?.code || 'INR'}.
                            </caption>
                            <thead>
                              <tr>
                                {['Year', 'Opening Balance', 'Principal Paid', 'Interest Paid', 'Closing Balance'].map(h => (
                                  <th key={h} scope="col" style={thS}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {amortRows.map((row, i) => (
                                <tr key={row.year} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                  <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>{row.year}</td>
                                  <td style={tdR}>{fmtIN(row.openingBal)}</td>
                                  <td style={{ ...tdR, color: '#1f7a58', fontWeight: 600 }}>{fmtIN(row.principal)}</td>
                                  <td style={tdR}>{fmtIN(row.interest)}</td>
                                  <td style={tdR}>{fmtIN(row.closingBal)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── TAB 2: Prepayment ── */}
              {activeTab === 'prepay' && (
                <div id="panel-prepay" role="tabpanel" aria-labelledby="tab-prepay">
                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                    {/* Input */}
                    <div style={{ padding: mobile ? '20px 18px' : '40px 40px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 24px' }}>Prepayment Settings</p>
                      <div style={{ marginBottom: 16, padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.ink2 }}>
                        Using: {fmtC(amount)} loan at {rate.toFixed(2)}% for {tenureMode === 'yr' ? `${tenureYr} years` : `${tenureMo} months`}
                      </div>
                      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
                        {EXTRA_PAY_PRESETS.map(v => (
                          <button key={v} onClick={() => setExtraMonthly(v)}
                            style={{ padding: '4px 10px', fontSize: 12, fontWeight: extraMonthly === v ? 700 : 500, background: C.white, color: extraMonthly === v ? C.ink : C.ink3, border: `${extraMonthly === v ? 1.5 : 1}px solid ${extraMonthly === v ? C.ink : C.border}`, borderRadius: 6, cursor: 'pointer', fontFamily: INTER, transition: 'all 0.15s' }}>
                            {v >= 1000 ? `${v / 1000}k` : v}
                          </button>
                        ))}
                      </div>
                      <Slider id="extra-monthly" label="Extra Monthly Payment" value={extraMonthly} min={0} max={200000} step={500}
                        display={fmtC(extraMonthly)} onChange={setExtraMonthly} compact={mobile} />
                      <p style={{ fontSize: 13, color: C.ink3, lineHeight: 1.65, marginTop: 8 }}>
                        Extra payments reduce the outstanding principal directly, cutting both your interest cost and loan tenure. Per RBI guidelines, floating-rate home loans carry no prepayment penalty.
                      </p>
                      <p style={{ fontSize: 13, color: C.ink3, lineHeight: 1.65, marginTop: 8 }}>
                        Even a modest extra payment compounds: on a Rs 50 lakh loan at 7.5% for 20 years, an extra Rs 5,000 a month from year 1 cuts total interest by roughly Rs 11.52 lakh and shortens the tenure by about 4 years 3 months.
                      </p>
                    </div>
                    {/* Results */}
                    <div style={{ padding: mobile ? '20px 18px' : '40px 40px' }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 24px' }}>Savings Estimate</p>
                      {extraMonthly > 0 && prepayResult ? (
                        <>
                          {/* Savings highlight */}
                          <div style={{ background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 14, padding: '20px 22px', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'stretch' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                              <div style={{ fontSize: 13, fontWeight: 600, color: '#50565C' }}>Interest saved</div>
                              <div style={{ fontSize: 12, color: '#7A8087' }}>Time saved</div>
                            </div>
                            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                              <div aria-live="polite" aria-label={`Interest saved: ${fmtC(interestSaved)}`}
                                style={{ fontSize: 24, fontWeight: 800, color: '#1F7A58', lineHeight: 1 }}>
                                {fmtC(interestSaved)}
                              </div>
                              <div style={{ fontSize: 15, fontWeight: 700, color: '#101214', lineHeight: 1 }}>
                                {Math.floor(monthsSaved / 12)}y {monthsSaved % 12}m
                              </div>
                            </div>
                          </div>
                          {[
                            { label: 'Without prepayment', sub: 'Total interest', val: fmtC(totalInterest) },
                            { label: 'With extra payment', sub: `${fmtC(extraMonthly)}/mo`, val: fmtC(prepayResult.totalInterest) },
                            { label: 'Original tenure', sub: `${Math.floor(months/12)}y ${months%12}m`, val: `${months} months` },
                            { label: 'New tenure', sub: 'With prepayment', val: `${prepayResult.months} months` },
                          ].map(r => (
                            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${C.border}` }}>
                              <div>
                                <div style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{r.label}</div>
                                <div style={{ fontSize: 12, color: C.ink3 }}>{r.sub}</div>
                              </div>
                              <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{r.val}</span>
                            </div>
                          ))}
                        </>
                      ) : (
                        <div style={{ textAlign: 'center', padding: '40px 0', color: C.ink3 }}>
                          <svg aria-hidden="true" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={C.border} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 12 }}>
                            <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
                          </svg>
                          <p style={{ fontSize: 14, margin: 0 }}>Set an extra monthly payment to see how much you save.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ── TAB 3: Loan Eligibility ── */}
              {activeTab === 'eligibility' && (
                <div id="panel-eligibility" role="tabpanel" aria-labelledby="tab-eligibility">
                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                    {/* Input */}
                    <div style={{ padding: mobile ? '20px 18px' : '40px 40px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 24px' }}>Your Income Details</p>
                      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
                        {INCOME_PRESETS.map(v => (
                          <button key={v} onClick={() => setMonthlyIncome(v)}
                            style={{ padding: '4px 10px', fontSize: 12, fontWeight: monthlyIncome === v ? 700 : 500, background: C.white, color: monthlyIncome === v ? C.ink : C.ink3, border: `${monthlyIncome === v ? 1.5 : 1}px solid ${monthlyIncome === v ? C.ink : C.border}`, borderRadius: 6, cursor: 'pointer', fontFamily: INTER, transition: 'all 0.15s' }}>
                            {v >= 100000 ? `${v / 100000}L` : `${v / 1000}k`}
                          </button>
                        ))}
                      </div>
                      <Slider id="monthly-income" label="Gross Monthly Income" value={monthlyIncome} min={20000} max={2000000} step={5000}
                        display={fmtC(monthlyIncome)} onChange={setMonthlyIncome} compact={mobile} />
                      <Slider id="existing-emi" label="Existing Monthly EMIs" value={existingEMI} min={0} max={500000} step={1000}
                        display={fmtC(existingEMI)} onChange={setExistingEMI} compact={mobile} />
                      <div style={{ marginBottom: 16, padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.ink2 }}>
                        Using: {rate.toFixed(2)}% rate, {tenureMode === 'yr' ? `${tenureYr} years` : `${tenureMo} months`} tenure
                      </div>
                      <p style={{ fontSize: 13, color: C.ink3, lineHeight: 1.65 }}>
                        Eligibility is based on 40% FOIR, the standard used by SBI, HDFC Bank, and ICICI Bank. Actual approval depends on your CIBIL score, employer, and property type.
                      </p>
                    </div>
                    {/* Results */}
                    <div style={{ padding: mobile ? '20px 18px' : '40px 40px' }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 24px' }}>Eligibility Estimate</p>
                      {maxEligEMI > 0 ? (
                        <>
                          <div style={{ background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 14, padding: '20px 22px', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'stretch' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                              <div style={{ fontSize: 13, fontWeight: 600, color: '#50565C' }}>Max loan amount</div>
                              <div style={{ fontSize: 12, color: '#7A8087' }}>Max EMI capacity</div>
                            </div>
                            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                              <div aria-live="polite" aria-label={`Maximum eligible loan: ${fmtC(maxLoan)}`}
                                style={{ fontSize: 24, fontWeight: 800, color: '#1F7A58', lineHeight: 1 }}>
                                {fmtC(maxLoan)}
                              </div>
                              <div style={{ fontSize: 15, fontWeight: 700, color: '#101214', lineHeight: 1 }}>
                                {fmtC(maxEligEMI)}/mo
                              </div>
                            </div>
                          </div>
                          {[
                            { label: 'Max eligible loan',     val: fmtC(maxLoan) },
                            { label: 'Max property value',    val: fmtC(maxProperty) },
                            { label: 'Available EMI (40% FOIR)', val: fmtC(maxEligEMI) + '/mo' },
                            { label: 'Suggested down payment', val: fmtC(maxProperty * 0.2) },
                          ].map(r => (
                            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${C.border}` }}>
                              <span style={{ fontSize: 13, color: C.ink2 }}>{r.label}</span>
                              <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{r.val}</span>
                            </div>
                          ))}
                          <p style={{ fontSize: 12, color: C.ink3, marginTop: 12, lineHeight: 1.6 }}>
                            Max property value is estimated at 80% LTV (20% down payment required). Actual LTV limits vary by loan amount per RBI guidelines.
                          </p>
                        </>
                      ) : (
                        <div style={{ textAlign: 'center', padding: '40px 0', color: C.ink3 }}>
                          <p style={{ fontSize: 14, margin: 0 }}>Your existing EMIs exceed 40% of income. Reduce them or increase income to qualify for a home loan.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Save Results */}
            <div style={{ marginBottom: 0 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* Article */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>
              {(() => {
                const h2s: React.CSSProperties = { fontSize: mobile ? 19 : 22, fontWeight: 700, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.015em' };
                const h3s: React.CSSProperties = { fontSize: 16, fontWeight: 600, color: C.ink, margin: '0 0 8px' };
                const ps:  React.CSSProperties = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' };
                const sec: React.CSSProperties = { margin: '0 0 48px' };
                return (
                  <>
                    {/* 1 */}
                    <section style={sec}>
                      <h2 id="what-is-emi" style={h2s}>What Is a Home Loan EMI?</h2>
                      <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                        <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                          A home loan EMI (Equated Monthly Instalment) is the fixed monthly amount you repay to your lender until the loan is fully paid off, covering both the principal and the interest on the outstanding balance.
                        </p>
                      </div>
                      <p style={ps}>
                        Each EMI has two parts: a principal component that reduces your outstanding loan balance, and an interest component charged on that balance. In the early years, a disproportionately large share goes toward interest because the outstanding balance is at its highest.
                      </p>
                      <p style={ps}>
                        As the balance falls with each payment, more of each EMI goes toward principal.
                      </p>
                      <p style={ps}>
                        This reducing-balance method is mandated by the Reserve Bank of India for all retail loans. On a Rs 50 lakh loan at 7.5% for 20 years, your EMI is roughly Rs 40,280. Over 240 months, you pay about Rs 96.67 lakh in total, of which approximately Rs 46.67 lakh is interest.
                      </p>
                    </section>

                    {/* 2 */}
                    <section style={sec}>
                      <h2 id="emi-formula" style={h2s}>Home Loan EMI Formula</h2>
                      <p style={ps}>The EMI for a home loan is calculated using the standard reducing-balance formula:</p>
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 20px', marginBottom: 20, fontFamily: 'monospace' }}>
                        <p style={{ fontSize: 16, fontWeight: 700, color: C.ink, margin: '0 0 10px' }}>EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]</p>
                        <table style={{ fontSize: 13, borderCollapse: 'collapse', width: '100%' }}>
                          <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, paddingTop: 8, textAlign: 'left' }}>EMI formula variable definitions</caption>
                          <tbody>
                            {[
                              ['P', 'Principal loan amount (home price minus down payment)'],
                              ['R', 'Monthly interest rate = Annual rate / 12 / 100'],
                              ['N', 'Loan tenure in months (years x 12)'],
                            ].map(([sym, def]) => (
                              <tr key={sym}>
                                <td style={{ padding: '5px 16px 5px 0', fontWeight: 700, color: C.dark, whiteSpace: 'nowrap' }}>{sym}</td>
                                <td style={{ padding: '5px 0', color: C.ink2, fontFamily: INTER }}>{def}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <h3 style={h3s}>Worked example</h3>
                      <p style={ps}>For a Rs 50 lakh loan at 7.5% for 20 years:</p>
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 20px', marginBottom: 16, fontFamily: 'monospace', fontSize: 13, color: C.ink2, lineHeight: 2 }}>
                        P = Rs 50,00,000<br />
                        R = 7.5 / 12 / 100 = 0.00625<br />
                        N = 20 x 12 = 240<br />
                        EMI = [50,00,000 x 0.00625 x (1.00625)^240] / [(1.00625)^240 - 1]<br />
                        <strong style={{ color: C.dark }}>EMI = Rs 40,280 per month</strong>
                      </div>
                      <p style={ps}>Over 240 months, total repayment is Rs 96,67,118. Of this, Rs 50 lakh is the principal and Rs 46,67,118 is the total interest cost.</p>
                    </section>

                    {/* 3 */}
                    <section style={sec}>
                      <h2 id="emi-excel" style={h2s}>Home Loan EMI Formula in Excel</h2>
                      <p style={ps}>Excel has three methods to calculate a home loan EMI. The PMT function is the fastest for standard EMI calculation:</p>
                      <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>Excel formulas for a Rs 50 lakh loan at 7.5% for 20 years</caption>
                          <thead>
                            <tr>
                              <th scope="col" style={thS}>Method</th>
                              <th scope="col" style={thS}>Excel Formula</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Result</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={tdL}>PMT function</td>
                              <td style={{ ...tdL, fontFamily: 'monospace' }}>=PMT(7.5%/12, 240, -5000000)</td>
                              <td style={{ ...tdR, textAlign: 'right' as const }}>Rs 40,280</td>
                            </tr>
                            <tr style={{ background: '#fafafa' }}>
                              <td style={tdL}>Manual formula</td>
                              <td style={{ ...tdL, fontFamily: 'monospace', fontSize: 11 }}>=5000000*(7.5%/12*(1+7.5%/12)^240)/((1+7.5%/12)^240-1)</td>
                              <td style={{ ...tdR, textAlign: 'right' as const }}>Rs 40,280</td>
                            </tr>
                            <tr>
                              <td style={tdL}>Month 1 interest only</td>
                              <td style={{ ...tdL, fontFamily: 'monospace' }}>=IPMT(7.5%/12, 1, 240, -5000000)</td>
                              <td style={{ ...tdR, textAlign: 'right' as const }}>Rs 31,250</td>
                            </tr>
                            <tr style={{ background: '#fafafa' }}>
                              <td style={tdL}>Month 1 principal only</td>
                              <td style={{ ...tdL, fontFamily: 'monospace' }}>=PPMT(7.5%/12, 1, 240, -5000000)</td>
                              <td style={{ ...tdR, textAlign: 'right' as const }}>Rs 9,030</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p style={ps}>To build a full amortization schedule in Excel, use IPMT(rate/12, row_number, tenure_months, -loan) for monthly interest and PPMT for monthly principal in each row. This replicates the schedule shown in the amortization table of this calculator.</p>
                    </section>

                    {/* EMI Lookup Table */}
                    <section style={sec}>
                      <h2 id="emi-table" style={h2s}>Home Loan EMI Table for Common Loan Amounts</h2>
                      <p style={ps}>The table below shows the monthly EMI for loan amounts from Rs 18 lakh to Rs 5 crore at 7.5% per annum, the standard working rate for prime salaried borrowers as of July 2026 following the RBI&apos;s 2025 rate-cut cycle.</p>
                      <p style={ps}>Each row is a loan amount; each column is a tenure option from 5 to 30 years.</p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        {mobile && <p style={{ fontSize: 11, color: C.ink3, margin: '0 0 6px' }}>Swipe to see full table</p>}
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>Monthly EMI at 7.5% p.a., reducing balance. All figures in Indian Rupees. Use the sliders above for other rates.</caption>
                          <thead>
                            <tr>
                              <th scope="col" style={thS}>Loan Amount</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>5 yr</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>10 yr</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>15 yr</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>20 yr</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>25 yr</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>30 yr</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(showAllEmiRows ? EMI_TABLE_ROWS : EMI_TABLE_ROWS.slice(0, EMI_TABLE_DEFAULT_ROWS)).map(([amt, y5, y10, y15, y20, y25, y30], i) => (
                              <tr key={amt} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{amt}</td>
                                <td style={tdR}>Rs {y5}</td>
                                <td style={tdR}>Rs {y10}</td>
                                <td style={tdR}>Rs {y15}</td>
                                <td style={tdR}>Rs {y20}</td>
                                <td style={tdR}>Rs {y25}</td>
                                <td style={tdR}>Rs {y30}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {EMI_TABLE_ROWS.length > EMI_TABLE_DEFAULT_ROWS && (
                          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                            <button onClick={() => setShowAllEmiRows(v => !v)}
                              style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontFamily: INTER }}>
                              {showAllEmiRows ? 'Show fewer loan amounts' : `Show all ${EMI_TABLE_ROWS.length} loan amounts`}
                              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                style={{ transform: showAllEmiRows ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                                <polyline points="6 9 12 15 18 9" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                      <p style={ps}>To use this table: find your target loan amount in the first column, then read across to your preferred tenure. Each 0.25% change in rate adds or removes approximately Rs 15 per lakh in monthly EMI on a 20-year tenure.</p>
                      <p style={ps}>A Rs 50 lakh loan at 7.25% (SBI&apos;s current rate) costs about Rs 761 less per month than at 7.5%. Use the <Link href="/calculators/sbi-home-loan-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SBI Home Loan Calculator</Link> to get figures pre-loaded with SBI&apos;s latest EBLR rate.</p>
                    </section>

                    {/* Long-tail amount + tenure combos */}
                    <section style={sec}>
                      <h2 id="emi-by-tenure" style={h2s}>EMI for a Specific Loan Amount Over a Specific Tenure</h2>
                      <p style={ps}>The table below gives the exact monthly EMI and total interest for the specific loan amount and tenure pairings people search most often, at 7.5% p.a., so you can see the tradeoff without opening the calculator.</p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>Monthly EMI and total interest at 7.5% p.a. for specific amount-tenure combinations, July 2026.</caption>
                          <thead>
                            <tr>
                              <th scope="col" style={thS}>Loan &amp; Tenure</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Monthly EMI</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Total Interest</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Total Payable</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['Rs 38 lakh for 5 years',   '76,144',   '7,68,652',    '45,68,652'],
                              ['Rs 45 lakh for 10 years',  '53,416',   '19,09,896',   '64,09,896'],
                              ['Rs 50 lakh for 15 years',  '46,351',   '33,43,111',   '83,43,111'],
                              ['Rs 70 lakh for 15 years',  '64,891',   '46,80,356',   '1,16,80,356'],
                              ['Rs 55 lakh for 20 years',  '44,308',   '51,33,830',   '1,06,33,830'],
                              ['Rs 65 lakh for 25 years',  '48,034',   '79,10,328',   '1,44,10,328'],
                              ['Rs 80 lakh for 30 years',  '55,937',   '1,21,37,378', '2,01,37,378'],
                              ['Rs 1 crore for 25 years',  '73,899',   '1,21,69,735', '2,21,69,735'],
                            ].map(([label, emiV, interest, total], i) => (
                              <tr key={label} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{label}</td>
                                <td style={tdR}>Rs {emiV}</td>
                                <td style={tdR}>Rs {interest}</td>
                                <td style={tdR}>Rs {total}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={ps}>Notice how the interest cost, not the EMI, is what actually separates these loans. A Rs 38 lakh loan over 5 years costs Rs 7.69 lakh in interest, while a Rs 80 lakh loan over 30 years costs Rs 1.21 crore in interest, more than the principal itself.</p>
                      <p style={ps}>Enter your own amount and tenure in the calculator above for an exact figure at your specific rate.</p>
                    </section>

                    {/* EMI per lakh */}
                    <section style={sec}>
                      <h2 id="emi-per-lakh" style={h2s}>Home Loan EMI Per Lakh</h2>
                      <p style={ps}>EMI per lakh is the monthly payment on every Rs 1 lakh borrowed. It is the fastest way to scale a rate-and-tenure combination to any loan amount: multiply the figure below by the number of lakhs you plan to borrow.</p>
                      <p style={ps}>The calculator above shows this figure automatically as &quot;EMI per lakh borrowed&quot; once you enter your loan details.</p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>Monthly EMI per Rs 1 lakh borrowed, by rate and tenure, July 2026.</caption>
                          <thead>
                            <tr>
                              <th scope="col" style={thS}>Rate</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>5 yr</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>10 yr</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>15 yr</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>20 yr</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>25 yr</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>30 yr</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['7.15% (PNB, BoB)', '1,987', '1,169', '907', '784', '716', '675'],
                              ['7.25% (SBI)',      '1,992', '1,174', '913', '790', '723', '682'],
                              ['7.50%',            '2,004', '1,187', '927', '806', '739', '699'],
                              ['7.75%',            '2,016', '1,200', '941', '821', '755', '716'],
                              ['8.00%',            '2,028', '1,213', '956', '836', '772', '734'],
                            ].map(([r, y5, y10, y15, y20, y25, y30], i) => (
                              <tr key={r} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r}</td>
                                <td style={tdR}>Rs {y5}</td>
                                <td style={tdR}>Rs {y10}</td>
                                <td style={tdR}>Rs {y15}</td>
                                <td style={tdR}>Rs {y20}</td>
                                <td style={tdR}>Rs {y25}</td>
                                <td style={tdR}>Rs {y30}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={ps}>Example: at 7.5% for 20 years, EMI per lakh is Rs 806. For a Rs 65 lakh loan, multiply: 65 x Rs 806 = Rs 52,390 a month, close to the exact calculator figure of Rs 52,364.</p>
                    </section>

                    {/* 1 Crore EMI */}
                    <section style={sec}>
                      <h2 id="emi-1-crore" style={h2s}>EMI for Rs 1 Crore Home Loan</h2>
                      <p style={ps}>For a Rs 1 crore home loan at 7.5% for 20 years, the monthly EMI is Rs 80,559. Total repayment over 240 months is approximately Rs 1,93,34,237, of which Rs 93,34,237 is interest.</p>
                      <p style={ps}>Extending to 30 years drops the EMI to Rs 69,921, but total interest rises to approximately Rs 1,51,71,722.</p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>Monthly EMI for Rs 1 crore home loan across rates and tenures, July 2026. Figures are indicative.</caption>
                          <thead>
                            <tr>
                              <th scope="col" style={thS}>Interest Rate</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>15 yr</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>20 yr</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>25 yr</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>30 yr</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['7.25% (SBI)',   '91,286',   '79,038', '72,281', '68,218'],
                              ['7.50%',         '92,701',   '80,559', '73,899', '69,921'],
                              ['7.75%',         '94,128',   '82,095', '75,533', '71,641'],
                              ['7.90% (ICICI)', '94,989',   '83,023', '76,520', '72,681'],
                            ].map(([rate, y15, y20, y25, y30], i) => (
                              <tr key={rate} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{rate}</td>
                                <td style={{ ...tdR, textAlign: 'right' as const }}>Rs {y15}</td>
                                <td style={{ ...tdR, textAlign: 'right' as const }}>Rs {y20}</td>
                                <td style={{ ...tdR, textAlign: 'right' as const }}>Rs {y25}</td>
                                <td style={{ ...tdR, textAlign: 'right' as const }}>Rs {y30}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={ps}>A borrower paying ICICI&apos;s 7.90% who instead qualifies for SBI&apos;s 7.25% rate saves Rs 3,985 per month on a Rs 1 crore, 20-year loan, totalling Rs 9.56 lakh over the tenure.</p>
                      <p style={ps}>On a Rs 1 crore loan, the qualifying gross monthly income at 40% FOIR with no existing EMIs is approximately Rs 2.01 lakh at 7.5% for 20 years.</p>
                      <p style={ps}>Before applying, check your exact loan ceiling using the <Link href="/calculators/home-loan-eligibility-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Home Loan Eligibility Calculator</Link>.</p>
                    </section>

                    {/* 1.5 Crore EMI */}
                    <section style={sec}>
                      <h2 id="emi-1-5-crore" style={h2s}>EMI for Rs 1.5 Crore Home Loan</h2>
                      <p style={ps}>For a Rs 1.5 crore home loan at 7.5% for 20 years, the monthly EMI is Rs 1,20,839. Total repayment over 240 months is approximately Rs 2,90,01,355, of which Rs 1,40,01,355 is interest.</p>
                      <p style={ps}>To qualify for this loan at 40% FOIR, you need a gross monthly income of at least Rs 3.02 lakh with no other EMIs outstanding.</p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>Monthly EMI for Rs 1.5 crore home loan across rates and tenures, July 2026. Figures are indicative.</caption>
                          <thead>
                            <tr>
                              <th scope="col" style={thS}>Interest Rate</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>15 yr</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>20 yr</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>25 yr</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>30 yr</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['7.25% (SBI)',   '1,36,929', '1,18,556', '1,08,421', '1,02,326'],
                              ['7.50%',         '1,39,052', '1,20,839', '1,10,849', '1,04,882'],
                              ['7.75%',         '1,41,191', '1,23,142', '1,13,299', '1,07,462'],
                              ['7.90% (ICICI)', '1,42,483', '1,24,534', '1,14,781', '1,09,021'],
                            ].map(([rate, y15, y20, y25, y30], i) => (
                              <tr key={rate} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{rate}</td>
                                <td style={{ ...tdR, textAlign: 'right' as const }}>Rs {y15}</td>
                                <td style={{ ...tdR, textAlign: 'right' as const }}>Rs {y20}</td>
                                <td style={{ ...tdR, textAlign: 'right' as const }}>Rs {y25}</td>
                                <td style={{ ...tdR, textAlign: 'right' as const }}>Rs {y30}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={ps}>The difference between a 20-year and 30-year tenure on a Rs 1.5 crore loan at 7.5% is Rs 15,957 per month in EMI. The 30-year path, however, costs approximately Rs 87.56 lakh more in total interest.</p>
                      <p style={ps}>The Prepayment tab shows exactly how much you save by adding even Rs 15,000 extra per month from year 1.</p>
                    </section>

                    {/* 4 */}
                    <section style={sec}>
                      <h2 id="factors" style={h2s}>What Affects Your Home Loan EMI?</h2>
                      <p style={ps}>Four variables determine your monthly EMI. Changing any one of them has a measurable, immediate effect on the others.</p>
                      <h3 style={h3s}>Loan amount (principal)</h3>
                      <p style={ps}>The loan amount equals the home price minus your down payment. Every Rs 10 lakh increase in loan at 7.5% for 20 years adds roughly Rs 8,056 to the monthly EMI. A larger down payment reduces both the loan and the EMI proportionally.</p>
                      <h3 style={h3s}>Interest rate</h3>
                      <p style={ps}>A 0.25% increase in rate on a Rs 50 lakh loan adds approximately Rs 761 to the monthly EMI and Rs 1.83 lakh to total interest over 20 years. When the RBI cuts the repo rate, banks linked to RLLR (Repo-Linked Lending Rate) pass through the cut within three months, as mandated.</p>
                      <h3 style={h3s}>Loan tenure</h3>
                      <p style={ps}>Extending tenure from 20 to 30 years on a Rs 50 lakh loan at 7.5% drops the EMI from Rs 40,280 to Rs 34,961. But the total interest jumps from Rs 46.67 lakh to Rs 75.86 lakh. Shorter tenures hurt the monthly budget but save substantially on the total cost of borrowing.</p>
                      <h3 style={h3s}>Down payment</h3>
                      <p style={ps}>A higher down payment directly reduces the loan principal and therefore the EMI. Increasing down payment from 10% to 20% on a Rs 75 lakh property cuts the EMI by roughly Rs 6,042 per month at 7.5% for 20 years.</p>
                    </section>

                    {/* 5 */}
                    <section style={sec}>
                      <h2 id="fixed-vs-floating" style={h2s}>Fixed Rate vs Floating Rate Home Loans</h2>
                      <p style={ps}>Fixed rates guarantee an unchanging EMI for the full tenure, while floating rates move with the RBI repo rate. In India, the vast majority of home loan borrowers choose floating rates.</p>
                      <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>Comparison of fixed and floating rate home loans in India, July 2026</caption>
                          <thead>
                            <tr>
                              <th scope="col" style={thS}>Feature</th>
                              <th scope="col" style={thS}>Fixed Rate</th>
                              <th scope="col" style={thS}>Floating Rate</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['Typical rate range', '8.5% to 10%', '7.15% to 7.90%'],
                              ['EMI stability', 'Fixed for full tenure', 'Changes with RBI rate cuts/hikes'],
                              ['Prepayment penalty', '2 to 4% of outstanding', 'Nil (per RBI circular)'],
                              ['Rate cut benefit', 'None', 'Yes, within 3 months (RLLR)'],
                              ['Best for', 'Short tenure, rate certainty', 'Long tenure, falling rate cycle'],
                              ['Share of new loans', 'Under 5%', 'Over 95%'],
                            ].map(([feat, fix, flt], i) => (
                              <tr key={feat} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{feat}</td>
                                <td style={tdL}>{fix}</td>
                                <td style={tdL}>{flt}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={ps}>Under RBI Governor Sanjay Malhotra, the Monetary Policy Committee cut the repo rate four times through 2025. That took the rate from 6.50% down to 5.25%, a cumulative cut of 125 basis points. The June 2026 MPC meeting held it steady at 5.25%.</p>
                      <p style={ps}>Borrowers on floating rates tied to RLLR or EBLR have seen their EMIs fall in step with each cut. Anyone taking a new loan in July 2026 is better positioned on a floating rate, unless they specifically need payment certainty for cash-flow planning.</p>
                    </section>

                    {/* 6 */}
                    <section style={sec}>
                      <h2 id="best-rates" style={h2s}>Home Loan Interest Rates in India</h2>
                      <p style={ps}>Rates below reflect indicative starting rates for salaried borrowers with CIBIL scores above 750 as of July 2026, after the 2025 repo rate-cut cycle took the RBI repo rate from 6.50% to 5.25%. Actual rates vary based on loan amount, property type, and credit profile.</p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>Indicative home loan rates from major Indian lenders, July 2026. Source: respective lender websites.</caption>
                          <thead>
                            <tr>
                              <th scope="col" style={thS}>Lender</th>
                              <th scope="col" style={{ ...thS, textAlign: 'center' as const }}>Starting Rate</th>
                              <th scope="col" style={thS}>Benchmark</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['Punjab National Bank', '7.15%', 'RLLR'],
                              ['Bank of Baroda',       '7.15%', 'BRLLR'],
                              ['Bank of India',        '7.20%', 'RLLR'],
                              ['SBI',                  '7.25%', 'EBLR'],
                              ['Canara Bank',          '7.25%', 'RLLR'],
                              ['HDFC Bank',            '7.35%', 'T-MCLR'],
                              ['Federal Bank',         '7.40%', 'RLLR'],
                              ['Union Bank of India',  '7.40%', 'RLLR'],
                              ['LIC Housing Finance',  '7.50%', 'PLR-linked'],
                              ['Kotak Mahindra Bank',  '7.65%', 'RLLR'],
                              ['Axis Bank',            '7.85%', 'RLLR'],
                              ['ICICI Bank',           '7.90%', 'RLLR'],
                            ].map(([bank, rate, bench], i) => (
                              <tr key={bank} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{bank}</td>
                                <td style={{ ...tdR, textAlign: 'center' as const }}>{rate}</td>
                                <td style={tdL}>{bench}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={ps}>Women co-applicants get a 0.05% concession from most major lenders including SBI and HDFC Bank. Loans above Rs 75 lakh typically carry a 0.1-0.25% premium over the base rates shown here. For SBI&apos;s EBLR-linked rate pre-filled with current figures, see the <Link href="/calculators/sbi-home-loan-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SBI Home Loan Calculator</Link>.</p>
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: 200 }}>
                          <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>SBI Home Loan Calculator</p>
                          <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Get your exact EMI pre-filled with SBI&apos;s current EBLR-linked rate and eligibility rules.</p>
                        </div>
                        <Link className="fx-btn" href="/calculators/sbi-home-loan-calculator" target="_blank" rel="noopener noreferrer"
                          style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                      </div>
                    </section>

                    {/* PMAY */}
                    <section style={sec}>
                      <h2 id="pmay" style={h2s}>PMAY: Government Interest Subsidy on Home Loans</h2>
                      <p style={ps}>Pradhan Mantri Awas Yojana (PMAY) is the central government&apos;s flagship housing scheme, offering an interest subsidy on home loans to eligible first-time buyers.</p>
                      <p style={ps}>The subsidy is disbursed to the loan account via Direct Benefit Transfer, which directly reduces the effective interest cost.</p>
                      <p style={ps}>The active PMAY-Urban 2.0 Interest Subsidy Scheme, running through 2029, gives a fixed 4% interest subsidy on the first Rs 8 lakh of the loan, capped at 12 years of tenure.</p>
                      <p style={ps}>The maximum benefit works out to Rs 1.8 lakh, paid in 5 equal annual instalments of Rs 36,000 credited to the loan account.</p>
                      <p style={ps}>Eligibility needs annual household income up to Rs 6 lakh (EWS/LIG) or Rs 9 lakh (MIG). The loan cannot exceed Rs 25 lakh, on a property valued under Rs 35 lakh.</p>
                      <p style={ps}>Apply through your lending bank or HFC at the time of disbursement; it is not claimed separately after sanction. Scheme terms are revised periodically, so confirm current caps on the official PMAY portal or with your lender before applying.</p>
                    </section>

                    {/* 7 */}
                    <section style={sec}>
                      <h2 id="tax-benefits" style={h2s}>Tax Benefits on a Home Loan</h2>
                      <p style={ps}>Home loan borrowers under the old tax regime can claim deductions across three sections of the Income Tax Act, which together can reduce taxable income by up to Rs 5 lakh per year.</p>
                      <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>Home loan tax deductions under the old tax regime, FY 2025-26</caption>
                          <thead>
                            <tr>
                              <th scope="col" style={thS}>Section</th>
                              <th scope="col" style={thS}>Component</th>
                              <th scope="col" style={{ ...thS, textAlign: 'center' as const }}>Max Deduction</th>
                              <th scope="col" style={thS}>Conditions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['80C', 'Principal repayment', 'Rs 1.5 lakh/year', 'Includes stamp duty in year 1. Part of the overall 80C limit.'],
                              ['24(b)', 'Interest paid', 'Rs 2 lakh/year', 'Self-occupied property only. No cap for let-out properties.'],
                              ['80EEA', 'Interest paid (additional)', 'Rs 1.5 lakh/year', 'First-time buyer. Stamp duty value up to Rs 45 lakh. Loan sanctioned between Apr 2019 and Mar 2022.'],
                            ].map(([sec, comp, limit, cond], i) => (
                              <tr key={sec} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ ...tdL, fontWeight: 700, color: C.dark }}>{sec}</td>
                                <td style={tdL}>{comp}</td>
                                <td style={{ ...tdR, textAlign: 'center' as const }}>{limit}</td>
                                <td style={{ ...tdL, fontSize: 12 }}>{cond}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={ps}>Section 80C and Section 24(b) on a self-occupied property are available only under the old tax regime. The new default tax regime disallows both for a self-occupied home.</p>
                      <p style={ps}>It still allows Section 24(b) on a let-out property, where interest can be set off against rental income, capped at Rs 2 lakh per year.</p>
                      <p style={ps}>Section 80EEA is effectively obsolete for new home loans taken in 2026. It only applies to legacy borrowers whose loan was sanctioned between April 1, 2019 and March 31, 2022.</p>
                      <p style={ps}>Run the <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</Link> with and without the Section 24(b) deduction to see exactly how your net liability changes before choosing a regime.</p>
                    </section>

                    {/* 8 */}
                    <section style={sec}>
                      <h2 id="loan-eligibility" style={h2s}>How Much Home Loan Can You Get?</h2>
                      <p style={ps}>Most Indian banks calculate home loan eligibility using FOIR (Fixed Obligation to Income Ratio), capping total monthly loan obligations at 40-50% of gross income. The Eligibility tab above computes this automatically.</p>
                      <p style={ps}>The formula: Maximum eligible EMI = (Gross monthly income x 0.40) minus all existing EMIs. This figure is then reverse-calculated using the EMI formula to arrive at the maximum loan principal.</p>
                      <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>Sample home loan eligibility at 7.5% for 20 years, 40% FOIR, no existing EMIs</caption>
                          <thead>
                            <tr>
                              <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Monthly Income</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Max EMI (40%)</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Max Loan</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Max Property (80% LTV)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['Rs 50,000',   'Rs 20,000',  'Rs 24.83 lakh', 'Rs 31.03 lakh'],
                              ['Rs 75,000',   'Rs 30,000',  'Rs 37.24 lakh', 'Rs 46.55 lakh'],
                              ['Rs 1,00,000', 'Rs 40,000',  'Rs 49.65 lakh', 'Rs 62.07 lakh'],
                              ['Rs 1,50,000', 'Rs 60,000',  'Rs 74.48 lakh', 'Rs 93.10 lakh'],
                              ['Rs 2,00,000', 'Rs 80,000',  'Rs 99.31 lakh', 'Rs 1.24 crore'],
                              ['Rs 3,00,000', 'Rs 1,20,000','Rs 1.49 crore', 'Rs 1.86 crore'],
                            ].map(([inc, emi, loan, prop], i) => (
                              <tr key={inc} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ ...tdR, textAlign: 'right' as const }}>{inc}</td>
                                <td style={{ ...tdR, textAlign: 'right' as const }}>{emi}</td>
                                <td style={{ ...tdR, textAlign: 'right' as const }}>{loan}</td>
                                <td style={{ ...tdR, textAlign: 'right' as const }}>{prop}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={ps}>Other factors that affect eligibility: CIBIL score (below 700 typically leads to rejection), age (affects maximum tenure), employer category (PSU/MNC borrowers get more favourable treatment), and property valuation by the lender&apos;s empanelled valuer.</p>
                      <p style={ps}>For a more detailed breakdown that factors in CIBIL score band and employment type, use the dedicated <Link href="/calculators/home-loan-eligibility-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Home Loan Eligibility Calculator</Link>.</p>
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: 200 }}>
                          <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Home Loan Eligibility Calculator</p>
                          <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Factor in your CIBIL score, employment type, and co-applicant income for a precise eligibility figure.</p>
                        </div>
                        <Link className="fx-btn" href="/calculators/home-loan-eligibility-calculator" target="_blank" rel="noopener noreferrer"
                          style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                      </div>
                    </section>

                    {/* Costs beyond EMI */}
                    <section style={sec}>
                      <h2 id="costs-beyond-emi" style={h2s}>Costs of Buying a Home Beyond the EMI</h2>
                      <p style={ps}>Unlike a US mortgage, an Indian home loan EMI does not bundle property tax or insurance into the monthly payment. Those costs, along with several one-time charges at purchase, are billed separately and need their own line in your budget.</p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>Typical one-time and recurring costs when buying a home in India, beyond the EMI</caption>
                          <thead>
                            <tr>
                              <th scope="col" style={thS}>Cost</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Typical Range</th>
                              <th scope="col" style={thS}>Notes</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['Stamp duty', '3% to 8% of property value', 'Varies by state. Several states give women buyers a 1-2% concession.'],
                              ['Registration charges', 'Around 1% of property value', 'Some states cap the absolute amount regardless of property value.'],
                              ['GST (under-construction only)', '1% to 5% of property value', '1% for affordable housing under Rs 45 lakh, 5% for other units. Nil on ready-to-move-in property with a completion certificate.'],
                              ['Loan processing fee', '0.25% to 1% of loan amount', 'Plus 18% GST on the fee itself. Some lenders waive this during promotional periods.'],
                              ['Legal and valuation fees', 'Rs 5,000 to Rs 15,000', 'Flat charges for the lender-appointed valuer and legal title check.'],
                              ['Home insurance', 'Rs 1,500 to Rs 8,000 per year', 'Optional at most lenders but strongly recommended. Add it in "More settings" above.'],
                              ['Brokerage', '1% to 2% of property value', 'Applies only if you use a real estate agent for the purchase.'],
                            ].map(([item, range, note], i) => (
                              <tr key={item} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{item}</td>
                                <td style={tdR}>{range}</td>
                                <td style={{ ...tdL, fontSize: 12 }}>{note}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={ps}>On a Rs 75 lakh property, stamp duty and registration alone can add Rs 3 lakh to Rs 6.75 lakh upfront, on top of your down payment. Factor these costs into your savings plan before fixing a target home price in the calculator above.</p>
                    </section>

                    {/* 9 */}
                    <section style={sec}>
                      <h2 id="reduce-emi" style={h2s}>How to Reduce Your Home Loan EMI</h2>
                      <p style={ps}>There are five proven strategies for reducing monthly EMI burden without increasing the loan term unnecessarily.</p>
                      <ol style={{ margin: '0 0 16px', paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Increase the down payment:</strong> Every Rs 5 lakh extra upfront cuts the loan by the same amount. On a Rs 50 lakh loan at 7.5% for 20 years, an extra Rs 5 lakh down payment saves roughly Rs 4,028 per month in EMI.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Balance transfer to a lower rate:</strong> Moving from 9% to 7.5% on a Rs 50 lakh outstanding balance with 15 years remaining saves approximately Rs 4,363 per month in EMI. Use the <Link href="/calculators/balance-transfer-savings-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Balance Transfer Savings Calculator</Link> to quantify the net saving after processing fees and stamp duty.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Make lump-sum prepayments:</strong> A one-time prepayment of Rs 2 lakh in year 3 of a Rs 50 lakh loan at 7.5% can cut total interest by over Rs 5.2 lakh and shorten the tenure by approximately 17 months.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Add a co-applicant:</strong> Adding a spouse or parent with income not only increases eligibility but also qualifies for a 0.05% women co-applicant rate concession from most lenders.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Maintain a high CIBIL score:</strong> Borrowers with CIBIL scores above 800 often get rates 0.15-0.25% lower than those with scores between 700 and 750. On a 20-year loan, 0.25% fewer in rate saves approximately Rs 1.83 lakh in total interest.
                        </li>
                      </ol>
                      <p style={ps}>Any surplus freed up by a lower EMI or a successful prepayment is best put to work in a <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SIP</Link> rather than left idle in a savings account.</p>
                      <p style={ps}>Even Rs 5,000 per month invested in an equity fund at 12% CAGR over 15 years grows to approximately Rs 25 lakh, potentially more than the interest saved by prepaying the same amount.</p>
                    </section>

                    {/* 10 */}
                    <section style={sec}>
                      <h2 id="amortization" style={h2s}>What Is a Home Loan Amortization Schedule?</h2>
                      <p style={ps}>A home loan amortization schedule is a complete year-by-year or month-by-month breakdown of every payment, showing how much goes toward principal and how much toward interest, and the outstanding balance at the end of each period.</p>
                      <p style={ps}>In early years, the interest component dominates. For a 20-year loan at 7.5%, roughly 78% of your first EMI is interest. By year 10, the split narrows to close to 50-50, and by year 18, over 85% goes toward principal.</p>
                      <p style={ps}>The bar chart and table in the amortization section of this calculator show this progression for your exact inputs.</p>
                      <p style={ps}>The schedule is particularly useful for deciding when to prepay. Making a large extra payment in years 3-7, when the interest component is still substantial, produces greater savings than the same payment made in year 18.</p>
                    </section>

                    {/* History */}
                    <section style={sec}>
                      <h2 id="history" style={h2s}>A Brief History of Home Loans in India</h2>
                      <p style={ps}>Before the late 1970s, formal home loan lending barely existed in India. Most home purchases were funded through personal savings, employer housing advances, or informal family lending, since no dedicated retail mortgage market had developed.</p>
                      <p style={ps}>HDFC (Housing Development Finance Corporation), founded in 1977 by H.T. Parekh, is widely credited as India&apos;s first specialised housing finance company and the pioneer of the retail home loan model still used today.</p>
                      <p style={ps}>The National Housing Bank (NHB) was set up in 1988 as an apex refinancing institution to regulate and expand housing finance across the country. Regulatory oversight of housing finance companies moved from NHB to the RBI in 2019.</p>
                      <p style={ps}>The pricing benchmark for floating-rate loans has changed several times. The Benchmark Prime Lending Rate (BPLR) regime gave way to the Base Rate system in 2010, which was replaced by MCLR in April 2016.</p>
                      <p style={ps}>From October 2019, the RBI mandated that all new floating-rate retail loans link to an external benchmark like the repo rate, so rate cuts pass through faster.</p>
                    </section>

                    {/* 11 */}
                    <section style={sec}>
                      <h2 id="how-to-use" style={h2s}>How to Use This Home Loan EMI Calculator</h2>
                      <ol style={{ margin: '0 0 16px', paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>EMI tab:</strong> Enter home price, down payment, interest rate and tenure using the sliders. Use the year presets (5Y, 10Y, 15Y, 20Y, 30Y) to quickly compare how tenure affects your EMI. Click the amortization toggle to see the year-by-year bar chart and breakdown table.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Prepayment tab:</strong> Set an extra monthly payment to see how much interest you save and how many months you cut from your loan. The calculation automatically uses the same rate and tenure from the EMI tab.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Eligibility tab:</strong> Enter your gross monthly income and any existing EMI obligations. The calculator shows your maximum eligible loan at 40% FOIR, the resulting maximum property value at 20% down payment, and the suggested down payment.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Advanced settings:</strong> Click "More settings" inside the EMI tab to add property tax and home insurance as annual amounts. These are included in a total monthly housing cost figure alongside your EMI.
                        </li>
                      </ol>
                    </section>

                    {/* Market accordion */}
                    <section style={sec}>
                      <h2 id="market-2026" style={h2s}>State of the Indian Home Loan Market</h2>
                      <p style={ps}>A quick reference on where rates, refinancing, and lender types stand heading into the second half of 2026, drawn from figures already covered above.</p>
                      <MarketAccordion />
                    </section>

                    

                    {/* 12: FAQs */}
                    <section style={sec}>
                      <h2 id="faqs" style={h2s}>Frequently Asked Questions</h2>
                      <FAQ />
                    </section>

                    {/* Disclaimer */}
                    <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                        <strong>Disclaimer:</strong> All calculations on this page are indicative only and based on the inputs provided. EMI figures, interest totals, eligibility estimates, and prepayment savings are mathematical approximations and may differ from actual bank calculations due to rounding, processing fees, GST on charges, and lender-specific policies. Interest rates shown are indicative as of July 2026 and subject to change. Tax benefit information is based on the Income Tax Act provisions and is for general awareness only. This tool is for educational and planning purposes and does not constitute financial or legal advice. Consult a SEBI-registered investment adviser or a qualified CA before making financial decisions.
                      </p>
                    </div>
                  </>
                );
              })()}
            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.mortgage-sidebar::-webkit-scrollbar{width:5px}.mortgage-sidebar::-webkit-scrollbar-track{background:transparent}.mortgage-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.mortgage-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside
            className="mortgage-sidebar"
            style={{
              position: mobile ? 'static' : 'sticky',
              top: 20,
              alignSelf: 'start',
              maxHeight: mobile ? 'none' : 'calc(100vh - 40px)',
              overflowY: mobile ? 'visible' : 'auto',
              paddingRight: mobile ? 0 : 2,
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
            } as React.CSSProperties}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <MortgageSnapshot />
              <nav aria-label="Related Calculators" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <SidebarList title="Popular Calculators" items={POPULAR} />
                <SidebarList title="More Calculators" items={MORE} />
              </nav>
              <RelatedReads />
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: [ '/calculators/percentage-calculator|%', '/calculators/gst-calculator|GST', '/calculators/loan-calculator|Loan', '/calculators/sip-calculator|SIP', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/swp-calculator|SWP', '/calculators/emi-calculator|EMI', '/calculators/home-loan-calculator|Home Loan', '/calculators/mortgage-calculator|Mortgage', '/calculators/car-loan-calculator|Car Loan', '/calculators/fd-calculator|FD', '/calculators/compound-interest-calculator|Compound Int.', '/calculators/gratuity-calculator|Gratuity', ]},
        { hd: 'Topics', links: ['/#|Mutual Funds', '/#|Home Loans', '/#|Fixed Deposits', '/#|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

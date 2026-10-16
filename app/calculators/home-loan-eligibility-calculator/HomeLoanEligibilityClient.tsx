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

/* ── Math ──────────────────────────────────────────────── */
function calcMaxLoanForEMI(maxEmi: number, rate: number, months: number) {
  if (months === 0 || maxEmi <= 0) return 0;
  if (rate === 0) return maxEmi * months;
  const m = rate / 12 / 100;
  return maxEmi * (Math.pow(1 + m, months) - 1) / (m * Math.pow(1 + m, months));
}

function calcEMI(p: number, r: number, n: number) {
  if (n === 0 || p === 0) return 0;
  if (r === 0) return p / n;
  const m = r / 12 / 100;
  return (p * m * Math.pow(1 + m, n)) / (Math.pow(1 + m, n) - 1);
}

const BANK_RATES = [
  { name: 'SBI', rate: 7.50, maxLtv: 90, type: 'Public Bank' },
  { name: 'HDFC Bank', rate: 7.90, maxLtv: 90, type: 'Private Bank' },
  { name: 'ICICI Bank', rate: 7.70, maxLtv: 90, type: 'Private Bank' },
  { name: 'Axis Bank', rate: 8.35, maxLtv: 90, type: 'Private Bank' },
  { name: 'Kotak', rate: 7.65, maxLtv: 90, type: 'Private Bank' },
  { name: 'Bank of Baroda', rate: 7.45, maxLtv: 90, type: 'Public Bank' },
  { name: 'PNB', rate: 7.50, maxLtv: 90, type: 'Public Bank' },
  { name: 'LIC HFL', rate: 7.50, maxLtv: 90, type: 'NBFC' },
  { name: 'Canara Bank', rate: 7.50, maxLtv: 90, type: 'Public Bank' },
  { name: 'Union Bank', rate: 7.35, maxLtv: 90, type: 'Public Bank' },
];

/* ── Slider ────────────────────────────────────────────── */
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 8 : 14 }}>
        {label ? <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400 }}>{label}</label> : <span />}
        {editing ? (
          <div style={{ position: 'relative' }}>
            <input id={inputId} autoFocus value={raw} aria-label={`Enter ${label} value`}
              onChange={e => setRaw(e.target.value)} onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
              style={{ fontSize: 14, fontWeight: 700, textAlign: suffix ? 'left' : 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 130, outline: 'none', color: C.dark, fontFamily: INTER }} />
            {suffix && <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: C.ink3, pointerEvents: 'none', fontWeight: 700 }}>{suffix}</span>}
          </div>
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${display}. Click to edit.`}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}
            style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: C.dark, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 18px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 90 : 110, textAlign: 'center', transition: 'border-color 0.15s' }}>
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
        <span style={{ fontSize: 11, color: C.ink3 }}>{min}{suffix || ''}</span>
        <span style={{ fontSize: 11, color: C.ink3 }}>{max}{suffix || ''}</span>
      </div>
    </div>
  );
}

/* ── SidebarList ───────────────────────────────────────── */
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

/* ── HomeLoanSnapshot (white facts box) ───────────────────── */
function HomeLoanSnapshot() {
  const rows = [
    { label: 'Typical FOIR cap', value: '50% - 60%' },
    { label: 'Min CIBIL for best rate', value: '750' },
    { label: 'Max loan-to-value', value: '90%' },
    { label: 'Max tenure (salaried)', value: '30 years' },
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

/* ── RelatedReads (white box, news interlinks) ────────────── */
function RelatedReads() {
  const links = [
    { href: '/news/world-gdp-ranking-2026', label: 'World GDP Ranking 2026: How It Affects Home Loan Rates' },
    { href: '/news/itr-filing-last-date', label: 'ITR Filing Due Dates AY 2026-27: All Deadlines' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Related Reads</span>
      </div>
      {links.map((l, i) => (
        <Link key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', padding: '13px 16px', borderBottom: i < links.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: C.white }}>
          <span style={{ fontSize: 13, color: C.dark, fontWeight: 500, lineHeight: 1.5, display: 'block' }}>{l.label}</span>
        </Link>
      ))}
    </div>
  );
}

const POPULAR = [
  { href: '/calculators/mortgage-calculator',              label: 'Home Loan EMI Calculator' },
  { href: '/calculators/sbi-home-loan-calculator',         label: 'SBI Home Loan Calculator' },
  { href: '/calculators/personal-loan-eligibility-calculator', label: 'Personal Loan Eligibility' },
  { href: '/calculators/business-loan-eligibility-calculator', label: 'Business Loan Eligibility' },
  { href: '/calculators/income-tax-calculator',            label: 'Income Tax Calculator' },
  { href: '/calculators/emi-calculator',                   label: 'Personal Loan EMI Calculator' },
  { href: '/calculators/debt-to-income-ratio-calculator',  label: 'Debt-to-Income Ratio Calculator' },
];
const MORE = [
  { href: '/calculators/loan-eligibility-calculator',        label: 'Loan Eligibility Calculator' },
  { href: '/calculators/car-loan-calculator',                label: 'Car Loan Calculator' },
  { href: '/calculators/balance-transfer-savings-calculator', label: 'Loan Balance Transfer Savings' },
  { href: '/calculators/fd-calculator',                      label: 'FD Calculator' },
  { href: '/calculators/sip-calculator',                     label: 'SIP Calculator' },
];

/* ── FAQ (source of truth lives in page.tsx) ─────────────── */
function FAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  return <FAQBox items={faqs} />;
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
    <svg role="img" aria-label={`Loan split: ${pPct}% principal, ${100 - pPct}% interest`}
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

/* ── Amortization ──────────────────────────────────────── */
type YearRow = { year: number; principal: number; interest: number; balance: number };

function buildAmortization(loan: number, annualRate: number, months: number): YearRow[] {
  if (loan <= 0 || months <= 0) return [];
  const emi = calcEMI(loan, annualRate, months);
  const m = annualRate / 12 / 100;
  let balance = loan;
  const rows: YearRow[] = [];
  let year = 1, yPrincipal = 0, yInterest = 0;
  for (let month = 1; month <= months; month++) {
    const interest = balance * m;
    const principal = emi - interest;
    balance = Math.max(0, balance - principal);
    yPrincipal += principal;
    yInterest += interest;
    if (month % 12 === 0 || month === months) {
      rows.push({ year, principal: Math.round(yPrincipal), interest: Math.round(yInterest), balance: Math.round(balance) });
      year++; yPrincipal = 0; yInterest = 0;
    }
  }
  return rows;
}

function BarChart({ rows }: { rows: YearRow[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxAnnual = Math.max(...rows.map(r => r.principal + r.interest));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;
  return (
    <svg role="img" aria-label="Year-by-year principal and interest breakdown for your eligible loan"
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
                {row.year}
              </text>
            )}
          </g>
        );
      })}
      <line x1={PADL} y1={H} x2={W} y2={H} stroke={C.border} strokeWidth={1} />
    </svg>
  );
}

/* ── Article helpers ───────────────────────────────────── */
const h2S: React.CSSProperties = { fontSize: 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' };
const pS: React.CSSProperties = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' };
const secS: React.CSSProperties = { margin: '0 0 40px' };
const bulletS: React.CSSProperties = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 };
const thS: React.CSSProperties = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', verticalAlign: 'middle', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' };
const tdL: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'left', border: `1px solid ${C.border}`, verticalAlign: 'middle' };
const tdR: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, textAlign: 'left', border: `1px solid ${C.border}`, verticalAlign: 'middle' };
const tdC: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'center', border: `1px solid ${C.border}`, verticalAlign: 'middle' };

/* ════════════════════════════════════════════════════════ */
export default function HomeLoanEligibilityClient({ faqs }: { faqs: { q: string; a: string }[] }) {
  const defaultSettings = {
    monthlyIncome: 80000,
    coApplicantIncome: 0,
    hasCoApplicant: false,
    existingEmi: 0,
    rate: 7.5,
    tenureYr: 20,
    foir: 50,
    age: 35,
    employmentType: 'salaried' as 'salaried' | 'self-employed',
    cibilBand: null as string | null,
  };
  const { settings, updateSettings } = useCalculatorSettings('home-loan-eligibility', defaultSettings);
  const { monthlyIncome, coApplicantIncome, hasCoApplicant, existingEmi, rate, tenureYr, foir, age, employmentType, cibilBand } = settings;

  const setIncome = (v: number) => updateSettings({ monthlyIncome: v });
  const setCoIncome = (v: number) => updateSettings({ coApplicantIncome: v });
  const setExistingEmi = (v: number) => updateSettings({ existingEmi: v });
  const setRate = (v: number) => updateSettings({ rate: v, cibilBand: null });
  const setTenure = (v: number) => updateSettings({ tenureYr: v });
  const setFoir = (v: number) => updateSettings({ foir: v });
  const setAge = (v: number) => {
    // Auto-cap tenure based on age (retirement at 60)
    const maxTenure = Math.max(1, 60 - v);
    updateSettings({ age: v, tenureYr: Math.min(tenureYr, maxTenure) });
  };
  const setEmploymentType = (v: 'salaried' | 'self-employed') => {
    updateSettings({ employmentType: v, foir: v === 'self-employed' ? 45 : 50 });
  };
  const CIBIL_BANDS: { band: string; rate: number }[] = [
    { band: '750+', rate: 7.50 },
    { band: '700-749', rate: 7.75 },
    { band: '650-699', rate: 8.40 },
    { band: '<650', rate: 10.15 },
  ];
  const setCibilBand = (band: string, r: number) => updateSettings({ cibilBand: band, rate: r });

  const [mobile, setMobile] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showAmortization, setShowAmortization] = useState(false);
  useLayoutEffect(() => { const chk = () => setMobile(window.innerWidth < 1024); chk(); window.addEventListener('resize', chk); return () => window.removeEventListener('resize', chk); }, []);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  // Math
  const totalIncome = monthlyIncome + (hasCoApplicant ? coApplicantIncome : 0);
  const maxEmiCapacity = (totalIncome * foir) / 100;
  const availableEmi = Math.max(0, maxEmiCapacity - existingEmi);
  
  const tenureMo = tenureYr * 12;
  const eligibleLoan = Math.round(calcMaxLoanForEMI(availableEmi, rate, tenureMo));
  const totalInterest = calcEMI(eligibleLoan, rate, tenureMo) * tenureMo - eligibleLoan;
  
  const isDeficit = availableEmi <= 0;
  const maxPropertyValue = isDeficit ? 0 : Math.round(eligibleLoan / 0.80);
  const downPayment = isDeficit ? 0 : maxPropertyValue - eligibleLoan;
  const totalRepayable = Math.round(eligibleLoan + totalInterest);
  const principalPct = totalRepayable > 0 ? Math.round((eligibleLoan / totalRepayable) * 100) : 0;
  const interestPct = 100 - principalPct;

  const amortRows = useMemo(() => buildAmortization(eligibleLoan, rate, tenureMo), [eligibleLoan, rate, tenureMo]);

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>Home Loan Eligibility Calculator</h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Check your home loan eligibility based on salary, existing EMIs, and FOIR. Compare eligible amounts across SBI, HDFC, and ICICI.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Inputs */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 40px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Income & Obligations</p>
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider id="monthly-income" label="Net Monthly Income" value={monthlyIncome} min={20000} max={1000000} step={1000}
                        display={fmtIN(monthlyIncome)} onChange={setIncome} compact />

                      {/* Co-applicant Toggle */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, border: `1px solid ${C.border}`, padding: '10px 14px', borderRadius: 8, overflow: 'hidden' }}>
                        <span style={{ fontSize: 13, fontWeight: 400, color: C.ink2 }}>Add Co-applicant?</span>
                        <button onClick={() => updateSettings({ hasCoApplicant: !hasCoApplicant })}
                          aria-pressed={hasCoApplicant}
                          style={{ width: 40, height: 22, borderRadius: 11, background: hasCoApplicant ? C.ink : C.border, border: 'none', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
                          <div style={{ width: 18, height: 18, borderRadius: 9, background: C.white, position: 'absolute', top: 2, left: hasCoApplicant ? 20 : 2, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                        </button>
                      </div>

                      {hasCoApplicant && (
                        <Slider id="co-income" label="Co-applicant Income" value={coApplicantIncome} min={0} max={1000000} step={1000}
                          display={fmtIN(coApplicantIncome)} onChange={setCoIncome} compact />
                      )}

                      <Slider id="existing-emi" label="Existing Total EMIs" value={existingEmi} min={0} max={300000} step={500}
                        display={fmtIN(existingEmi)} onChange={setExistingEmi} compact />

                      <Slider id="tenure" label="Loan Tenure (Years)" value={tenureYr} min={1} max={30} step={1}
                        display={`${tenureYr} yrs`} onChange={setTenure} compact />

                      <Slider id="rate" label="Interest Rate (% p.a.)" value={rate} min={7} max={15} step={0.1}
                        display={`${rate.toFixed(2)}%`} onChange={setRate} compact />

                      <button onClick={() => setShowAdvanced(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        More settings
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <div style={{ marginBottom: 18 }}>
                        <label id="employment-type-label" style={{ display: 'block', fontSize: 14, color: C.ink2, fontWeight: 400, marginBottom: 8 }}>Employment Type</label>
                        <div role="group" aria-labelledby="employment-type-label" style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                          {(['salaried', 'self-employed'] as const).map(t => (
                            <button key={t} onClick={() => setEmploymentType(t)} aria-pressed={employmentType === t}
                              style={{ flex: 1, padding: '8px 10px', border: 'none', background: employmentType === t ? C.white : 'transparent',
                                color: employmentType === t ? C.ink : C.ink3, fontWeight: employmentType === t ? 600 : 400,
                                cursor: 'pointer', fontFamily: INTER, fontSize: 13, transition: 'all 0.15s' }}>
                              {t === 'salaried' ? 'Salaried' : 'Self-Employed'}
                            </button>
                          ))}
                        </div>
                      </div>
                      <Slider id="age" label="Your Age" value={age} min={21} max={60} step={1}
                        display={`${age} yrs`} onChange={setAge} compact />
                      <Slider id="foir" label="FOIR Cap (%)" value={foir} min={40} max={65} step={1}
                        display={`${foir}%`} onChange={setFoir} compact />
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: '0 0 16px' }}>
                        FOIR is the percentage of income banks allow for total EMIs. Salaried applicants default to 50%, self-employed to 45%. Age caps your maximum tenure: age plus tenure must not exceed 60.
                      </p>
                      <div style={{ marginBottom: 18 }}>
                        <label id="cibil-band-label" style={{ display: 'block', fontSize: 14, color: C.ink2, fontWeight: 400, marginBottom: 8 }}>Your CIBIL Score (sets typical rate)</label>
                        <div role="group" aria-labelledby="cibil-band-label" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          {CIBIL_BANDS.map(({ band, rate: r }) => (
                            <button key={band} onClick={() => setCibilBand(band, r)}
                              aria-pressed={cibilBand === band}
                              style={{ padding: '5px 12px', fontSize: 12.5, background: C.white,
                                color: cibilBand === band ? C.ink : C.ink3,
                                border: `${cibilBand === band ? 1.5 : 1}px solid ${cibilBand === band ? C.ink : C.border}`,
                                fontWeight: cibilBand === band ? 700 : 500, borderRadius: 6, cursor: 'pointer',
                                fontFamily: INTER, transition: 'all 0.15s' }}>
                              {band}
                            </button>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => setShowAdvanced(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        Back
                      </button>
                    </>
                  )}
                </div>

                {/* Results */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  {isDeficit ? (
                    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.ink3}`, padding: 20, borderRadius: 12, width: '100%' }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: C.ink, marginBottom: 8 }}>EMI Capacity Exceeded</div>
                      <div style={{ color: C.ink2, fontSize: 14, lineHeight: 1.5 }}>
                        Your existing EMIs ({fmtC(existingEmi)}) exceed your FOIR capacity ({fmtC(maxEmiCapacity)}). Close an existing loan or add a co-applicant.
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Donut */}
                      <div style={{ order: mobile ? 1 : -1, marginBottom: mobile ? 16 : 20 }}>
                        <DonutChart principal={eligibleLoan} interest={totalInterest} />
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

                      {/* Primary result: Eligible Loan */}
                      <div style={{ width: '100%', background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 12, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 700, color: C.dark }}>Eligible Loan</span>
                        <span aria-live="polite" style={{ fontSize: mobile ? 20 : 26, fontWeight: 800, color: C.dark, letterSpacing: '-0.02em' }}>
                          {fmtC(eligibleLoan)}
                        </span>
                      </div>

                      {/* Stat rows */}
                      {[
                        { label: 'Monthly EMI',          value: fmtIN(availableEmi) },
                        { label: 'Max property value',   value: fmtC(maxPropertyValue) },
                        { label: 'Down payment (20%)',   value: fmtC(downPayment) },
                        { label: 'Total interest',       value: fmtC(Math.round(totalInterest)) },
                        { label: 'Total repayable',      value: fmtC(totalRepayable) },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
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
                    </>
                  )}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}><SaveResultsCard mobile={mobile} /></div>

            {/* ── Bank Eligibility Comparison ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', marginBottom: 32, boxShadow: '0 1px 12px rgba(16,18,20,0.05)' }}>
              <div style={{ padding: '16px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>Bank-wise Eligible Loan</div>
                  <div style={{ fontSize: 12, color: C.ink3, marginTop: 3 }}>Live: updates as you change your inputs above</div>
                </div>
                <span style={{ fontSize: 11, color: C.ink3, background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 6, padding: '4px 10px', fontWeight: 600 }}>
                  {tenureYr} yr · {foir}% FOIR
                </span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 20px 12px' }}>Eligible loan amount at each bank&apos;s current headline rate, for the income and tenure entered above.</caption>
                  <thead>
                    <tr>
                      <th scope="col" style={thS}>Bank</th>
                      <th scope="col" style={{ ...thS, textAlign: 'center' }}>Type</th>
                      <th scope="col" style={{ ...thS, textAlign: 'center' }}>Rate</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Max Eligible Loan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isDeficit ? (
                      <tr><td colSpan={4} style={{ ...tdC, padding: '24px' }}>No eligibility: existing EMIs exceed FOIR capacity</td></tr>
                    ) : BANK_RATES.map((b, i) => {
                      const bLoan = Math.round(calcMaxLoanForEMI(availableEmi, b.rate, tenureMo));
                      const isLowest = b.rate === Math.min(...BANK_RATES.map(x => x.rate));
                      return (
                        <tr key={b.name} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdR }}>{b.name}</td>
                          <td style={tdC}>{b.type}</td>
                          <td style={tdC}>{b.rate}%</td>
                          <td style={{ ...tdR, textAlign: 'right', color: isLowest ? '#1f7a58' : C.ink }}>{fmtC(bLoan)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── Amortization Schedule for the Eligible Loan ── */}
            {!isDeficit && amortRows.length > 0 && (
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', marginBottom: 32, boxShadow: '0 1px 12px rgba(16,18,20,0.05)' }}>
                <button onClick={() => setShowAmortization(v => !v)} aria-expanded={showAmortization} aria-controls="eligible-amortization-panel"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: INTER }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>Year-by-Year Schedule for Your Eligible Loan</div>
                    <div style={{ fontSize: 12, color: C.ink3, marginTop: 3 }}>How {fmtC(eligibleLoan)} breaks into principal and interest over {tenureYr} years</div>
                  </div>
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transform: showAmortization ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}><polyline points="6 9 12 15 18 9" /></svg>
                </button>
                {showAmortization && (
                  <div id="eligible-amortization-panel" style={{ padding: '4px 24px 24px' }}>
                    <div style={{ marginBottom: 18 }}><BarChart rows={amortRows} /></div>
                    <div style={{ display: 'flex', gap: 20, marginBottom: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                        <span style={{ fontSize: 13, color: C.ink2 }}>Principal</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                        <span style={{ fontSize: 13, color: C.ink2 }}>Interest</span>
                      </div>
                    </div>
                    {mobile && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, fontSize: 11, color: C.ink3 }}>
                        <span>Swipe to see all years</span>
                        <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'swipeHint 1.6s ease-in-out infinite' }}><polyline points="9 18 15 12 9 6" /></svg>
                        <style>{`@keyframes swipeHint { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }`}</style>
                      </div>
                    )}
                    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: mobile ? 520 : 'auto' }}>
                        <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                          Year-by-year principal, interest, and remaining balance for a {fmtC(eligibleLoan)} loan at {rate.toFixed(2)}% over {tenureYr} years.
                        </caption>
                        <thead>
                          <tr>
                            <th scope="col" style={thS}>Year</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' }}>Principal Paid</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' }}>Interest Paid</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' }}>Balance Remaining</th>
                          </tr>
                        </thead>
                        <tbody>
                          {amortRows.map((r, i) => (
                            <tr key={r.year} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                              <td style={tdR}>{r.year}</td>
                              <td style={{ ...tdL, textAlign: 'right', color: '#166534' }}>{fmtC(r.principal)}</td>
                              <td style={{ ...tdL, textAlign: 'right' }}>{fmtC(r.interest)}</td>
                              <td style={{ ...tdL, textAlign: 'right' }}>{fmtC(r.balance)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}


            {/* ════════════════════ ARTICLE ════════════════════ */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={secS} id="what-is-eligibility">
                <h2 style={h2S}>What Is a Home Loan Eligibility Calculator?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    A home loan eligibility calculator estimates the maximum loan amount a bank will approve, based on your income, existing EMIs, age, and the lender&apos;s FOIR limit.
                  </p>
                </div>
                <p style={pS}>Banks do not lend against the property value alone. A credit team checks whether your monthly income can absorb the EMI on top of your current obligations, then works backward to a loan amount.</p>
                <p style={pS}>This calculator runs the same math banks use. The number you see here should land close to what SBI, HDFC, or ICICI would quote you.</p>
                <p style={pS}>&quot;Home loan eligibility calculator&quot;, &quot;housing loan eligibility calculator&quot;, and &quot;mortgage eligibility calculator&quot; all mean the same thing in India: how much a bank will lend you before you have picked a property.</p>
                <p style={pS}>Weighing a car loan or personal loan alongside the home loan? The general-purpose <Link href="/calculators/loan-eligibility-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Loan Eligibility Calculator</Link> runs the same FOIR logic across loan types. Eligibility is not the same as an EMI quote, a distinction covered further down this page.</p>
              </div>

              <div style={secS} id="eligibility-formula">
                <h2 style={h2S}>Home Loan Eligibility Formula (FOIR Method)</h2>
                <p style={pS}>Banks calculate eligibility using the <strong>Fixed Obligation to Income Ratio (FOIR)</strong>, the share of your gross monthly income that can go toward EMIs. The loan amount is then reverse-calculated from that EMI capacity.</p>
                <div style={{ background: '#f8f9f9', border: `1px solid ${C.border}`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, margin: '0 0 8px' }}>Step 1: Calculate Max EMI Capacity</p>
                  <code style={{ fontSize: 13 }}>Max EMI = (Monthly Income × FOIR%) - Existing EMIs</code>

                  <p style={{ fontSize: 14, fontWeight: 700, margin: '16px 0 8px' }}>Step 2: Reverse Calculate Loan Amount</p>
                  <code style={{ fontSize: 13 }}>Loan Amount = Max EMI × [ (1+r)^n - 1 ] / [ r × (1+r)^n ]</code>
                  <p style={{ fontSize: 12, color: C.ink3, marginTop: 4 }}>(Where r = monthly interest rate, n = tenure in months)</p>
                </div>
                <p style={{ ...pS, fontWeight: 600 }}>Worked example: Rs 75,000 salary, Rs 8,000 existing EMI, 50% FOIR, 7.5% for 20 years</p>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Max EMI capacity: 50% of Rs 75,000 = <strong>Rs 37,500</strong></span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Available EMI after existing loan: Rs 37,500 minus Rs 8,000 = <strong>Rs 29,500</strong></span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Eligible loan at 7.5% over 240 months: <strong>Rs 36,61,898</strong></span></div>
                <p style={pS}>Most banks set FOIR between 50% and 60% for salaried applicants. Track your overall debt load with the <Link href="/calculators/debt-to-income-ratio-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Debt-to-Income Ratio Calculator</Link> before you approach a lender.</p>
              </div>

              <div style={secS} id="eligibility-by-salary">
                <h2 style={h2S}>Home Loan Eligibility by Salary (No Existing EMIs)</h2>
                <p style={pS}>The table below shows eligible loan amounts across salary brackets at 7.5% interest, 20-year tenure, and 50% FOIR, with no existing EMIs.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>Eligible home loan amount by net monthly salary at 7.5% interest, 20-year tenure, 50% FOIR, no existing EMIs.</caption>
                    <thead><tr>
                      <th scope="col" style={thS}>Net Monthly Salary</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Max EMI Capacity (50%)</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Eligible Loan (Approx)</th>
                    </tr></thead>
                    <tbody>
                      {[
                        { s: 15000, e: 7500, l: 930991 },
                        { s: 20000, e: 10000, l: 1241321 },
                        { s: 30000, e: 15000, l: 1861982 },
                        { s: 40000, e: 20000, l: 2482643 },
                        { s: 50000, e: 25000, l: 3103303 },
                        { s: 60000, e: 30000, l: 3723964 },
                        { s: 70000, e: 35000, l: 4344625 },
                        { s: 75000, e: 37500, l: 4654955 },
                        { s: 80000, e: 40000, l: 4965285 },
                        { s: 100000, e: 50000, l: 6206607 },
                        { s: 150000, e: 75000, l: 9309910 },
                        { s: 200000, e: 100000, l: 12413213 },
                      ].map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>Rs {row.s.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>Rs {row.e.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdR, textAlign: 'right', color: '#1f7a58' }}>Rs {row.l.toLocaleString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={pS}>These figures assume no existing EMIs. Once you have a real eligible loan number from the calculator above, run it through the <Link href="/calculators/mortgage-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Home Loan EMI Calculator</Link> to see the exact monthly payment and the full year-by-year amortization schedule.</p>
              </div>

              <div style={secS} id="eligibility-by-bank">
                <h2 style={h2S}>Home Loan Eligibility by Bank: FOIR, Tenure and CIBIL Norms</h2>
                <p style={pS}>FOIR limits are not identical across lenders. Public sector banks tend to be more conservative. Private banks and housing finance companies stretch further for high-income or high-CIBIL applicants.</p>
                <p style={pS}>The table below is a typical-range guide, not a published guarantee from any bank.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>Typical FOIR range, maximum tenure, and minimum CIBIL score for the best rate slab, by lender.</caption>
                    <thead><tr>
                      <th scope="col" style={thS}>Bank / Lender</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Typical FOIR Range</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Max Tenure</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Min CIBIL for Best Rate</th>
                    </tr></thead>
                    <tbody>
                      {[
                        { b: 'SBI', f: '50% - 60%', t: '30 yrs', c: '750' },
                        { b: 'HDFC Bank', f: '55% - 65%', t: '30 yrs', c: '750' },
                        { b: 'ICICI Bank', f: '50% - 55%', t: '30 yrs', c: '750' },
                        { b: 'Axis Bank', f: '50% - 60%', t: '30 yrs', c: '750' },
                        { b: 'Kotak Mahindra Bank', f: '50% - 60%', t: '25 yrs', c: '750' },
                        { b: 'Bank of Baroda', f: '50% - 55%', t: '30 yrs', c: '750' },
                        { b: 'Punjab National Bank', f: '50% - 55%', t: '30 yrs', c: '750' },
                        { b: 'LIC Housing Finance', f: '50% - 60%', t: '30 yrs', c: '700' },
                        { b: 'Canara Bank', f: '50% - 55%', t: '30 yrs', c: '750' },
                        { b: 'Union Bank of India', f: '50% - 55%', t: '30 yrs', c: '750' },
                      ].map((row, i) => (
                        <tr key={row.b} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>{row.b}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>{row.f}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>{row.t}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>{row.c}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={pS}>The live bank comparison table above the article uses the current headline rate for each of these lenders to compute your eligible loan directly. The FOIR figures here explain why two banks can quote different eligible amounts for the exact same salary.</p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>SBI Home Loan Calculator</p>
                    <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Check the exact EMI at SBI&apos;s current EBLR rate once you know what you qualify for.</p>
                  </div>
                  <Link className="fx-btn" href="/calculators/sbi-home-loan-calculator" target="_blank" rel="noopener noreferrer" style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                </div>
              </div>

              <div style={secS} id="joint-applicant">
                <h2 style={h2S}>How a Joint Applicant Increases Eligibility</h2>
                <p style={pS}>Adding a co-applicant, typically a spouse, parent, or working child who will be a co-owner, is the fastest way to raise eligibility. The bank combines both incomes before applying the FOIR limit.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>Eligible loan amount at 7.5% interest, 20-year tenure, 50% FOIR, for a Rs 60,000 primary income with different co-applicants.</caption>
                    <thead><tr>
                      <th scope="col" style={thS}>Applicant Setup</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Combined Income</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Eligible Loan</th>
                    </tr></thead>
                    <tbody>
                      {[
                        { s: 'Solo applicant (Rs 60,000 salary)', i: 60000, l: 3723964 },
                        { s: '+ Spouse earning Rs 40,000', i: 100000, l: 6206607 },
                        { s: '+ Parent earning Rs 25,000', i: 85000, l: 5275616 },
                      ].map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdL}>{row.s}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>Rs {row.i.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdR, textAlign: 'right', color: '#1f7a58' }}>Rs {row.l.toLocaleString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={pS}>Adding the spouse&apos;s Rs 40,000 income in this example lifts eligibility by 66.7%, from Rs 37.24 lakh to Rs 62.07 lakh. Most banks also give a 0.05% rate concession when a woman is the primary applicant or co-applicant, which nudges eligibility up further.</p>
              </div>

              <div style={secS} id="sbi-eligibility">
                <h2 style={h2S}>SBI Home Loan Eligibility</h2>
                <p style={pS}>SBI publishes among the most transparent eligibility criteria of any Indian lender. It offers tenures up to 30 years, capped at age 70 at loan maturity.</p>
                <p style={pS}>SBI uses a tiered FOIR that rises with income:</p>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Net monthly income up to Rs 50,000: FOIR around 50%</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Net monthly income Rs 50,000 to Rs 1 lakh: FOIR around 55%</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Net monthly income above Rs 1 lakh: FOIR around 60%</span></div>
                <p style={pS}>The <Link href="/calculators/sbi-home-loan-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SBI Home Loan Calculator</Link> has SBI&apos;s current EBLR-linked rate pre-filled, so you can check the exact EMI on any amount you are eligible for.</p>
              </div>

              <div style={secS} id="hdfc-eligibility">
                <h2 style={h2S}>HDFC Bank Home Loan Eligibility</h2>
                <p style={pS}>HDFC Bank runs a wider FOIR band than most public banks, often 55% to 65% for high-income salaried applicants. It also counts income sources several public banks ignore.</p>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Average annual bonus and variable pay are factored into income.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Rental income from other owned properties counts toward eligibility.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>FOIR can reach 60% to 65% for high-net-worth applicants with a CIBIL score above 750.</span></div>
                <p style={pS}>ICICI Bank and Axis Bank sit closer to SBI&apos;s FOIR range, typically 50% to 60%, though both give a modest boost to applicants with a salary above Rs 1 lakh and a strong credit history.</p>
              </div>

              <div style={secS} id="self-employed-eligibility">
                <h2 style={h2S}>Home Loan Eligibility Calculator for Self-Employed Applicants</h2>
                <p style={pS}>Self-employed applicants do not have a fixed salary slip. Banks substitute the average net profit from the last two to three years of Income Tax Returns instead.</p>
                <p style={pS}>That annual figure is divided by 12 to get a monthly equivalent income. FOIR is then applied as usual, typically 40% to 50%, a few points lower than for salaried applicants.</p>
                <p style={{ ...pS, fontWeight: 600 }}>Worked example: average annual net profit Rs 9,00,000, FOIR 45%, 7.5% for 20 years</p>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Monthly equivalent income: Rs 9,00,000 ÷ 12 = <strong>Rs 75,000</strong></span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Max EMI capacity at 45% FOIR: <strong>Rs 33,750</strong></span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Eligible loan: <strong>Rs 41,89,459</strong></span></div>
                <p style={pS}>Banks also want GST returns for the same period and CA-certified financial statements. A profit that fluctuates sharply year to year, or a business under two years old, usually gets a more conservative FOIR.</p>
                <p style={pS}>Run your ITR-based numbers through the <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</Link> first. The profit figure banks use is the post-tax net profit reported in your return.</p>
              </div>

              <div style={secS} id="credit-score">
                <h2 style={h2S}>Credit Score and Home Loan Eligibility</h2>
                <p style={pS}>Your CIBIL score does not change the FOIR percentage. It changes the interest rate you are offered, and a higher rate quietly shrinks the loan a given EMI can support.</p>
                <p style={pS}>The table below holds income at Rs 80,000, FOIR at 50%, and tenure at 20 years. Only the rate changes by CIBIL band.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>Effect of CIBIL score band on interest rate and eligible loan amount, for a fixed Rs 40,000 EMI capacity over 20 years.</caption>
                    <thead><tr>
                      <th scope="col" style={thS}>CIBIL Score Band</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Typical Rate</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Eligible Loan</th>
                    </tr></thead>
                    <tbody>
                      {[
                        { c: '750 and above', r: '7.50%', l: 4965285 },
                        { c: '700 - 749', r: '7.75%', l: 4872412 },
                        { c: '650 - 699', r: '8.40%', l: 4643040 },
                        { c: 'Below 650 (NBFC only)', r: '10.15%', l: 4102645 },
                      ].map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>{row.c}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>{row.r}</td>
                          <td style={{ ...tdR, textAlign: 'right', color: '#1f7a58' }}>Rs {row.l.toLocaleString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={pS}>The gap between a 750+ score and a sub-650 score is Rs 8.63 lakh of eligibility on the same income and EMI capacity in this example. Most mainstream banks decline applications below 650 outright; those applicants typically go to a housing finance company (HFC) at a materially higher rate.</p>
              </div>

              <div style={secS} id="nri-eligibility">
                <h2 style={h2S}>NRI Home Loan Eligibility</h2>
                <p style={pS}>Non-Resident Indians can borrow in India to buy or construct property. The eligibility math is just more conservative than for resident applicants.</p>
                <p style={pS}>Foreign salary is converted to INR at a cautious exchange rate. FOIR is generally capped at 40% to 50% to account for the applicant&apos;s cost of living abroad.</p>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Foreign salary slips, an employment contract, and NRE or NRO bank statements are mandatory.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Maximum loan-to-value is often capped at 75% to 80%, versus 90% for resident borrowers on smaller loans.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>A Power of Attorney holder in India is usually required to handle documentation and disbursement.</span></div>
                <p style={pS}>An NRI earning the equivalent of Rs 1,50,000 a month at 45% FOIR, 7.5% for 20 years, has roughly Rs 67,500 in EMI capacity and qualifies for close to Rs 83.8 lakh, before accounting for the more conservative LTV cap on the property itself.</p>
              </div>

              <div style={secS} id="age-tenure-eligibility">
                <h2 style={h2S}>How Age and Loan Tenure Affect Eligibility</h2>
                <p style={pS}>Banks cap loan tenure so the loan closes by a set retirement age, usually 60 for salaried applicants and 65 to 70 for self-employed applicants. A shorter tenure raises the EMI for the same loan amount, which lowers how much you can borrow within your FOIR limit.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>Maximum tenure and eligible loan by age, for a fixed Rs 60,000 income, 50% FOIR, and 7.5% interest, capped at age 60.</caption>
                    <thead><tr>
                      <th scope="col" style={thS}>Age</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Max Tenure</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Eligible Loan</th>
                    </tr></thead>
                    <tbody>
                      {[
                        { a: 25, t: 30, l: 4290529 },
                        { a: 30, t: 30, l: 4290529 },
                        { a: 35, t: 25, l: 4059588 },
                        { a: 40, t: 20, l: 3723964 },
                        { a: 45, t: 15, l: 3236203 },
                        { a: 50, t: 10, l: 2527342 },
                        { a: 55, t: 5, l: 1497159 },
                      ].map((row, i) => (
                        <tr key={row.a} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>{row.a} years</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>{row.t} years</td>
                          <td style={{ ...tdR, textAlign: 'right', color: '#1f7a58' }}>Rs {row.l.toLocaleString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={pS}>A 25-year-old and a 30-year-old land on the same eligible amount here because both can still take the full 30-year maximum tenure most lenders offer. Past 30, every five years of age chips away more eligibility as retirement gets closer: roughly Rs 2.3 lakh is lost between 30 and 35, but the loss widens to over Rs 10 lakh between 50 and 55, since a shrinking tenure pushes up the EMI faster the closer it gets to the age cap.</p>
              </div>

              <div style={secS} id="documents-required">
                <h2 style={h2S}>Documents Required to Check Home Loan Eligibility</h2>
                <p style={pS}>Banks ask for different proof depending on whether you are salaried or self-employed. Having these ready before you apply speeds up formal approval once the calculator has told you your likely range.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>Documents required for salaried versus self-employed home loan applicants.</caption>
                    <thead><tr>
                      <th scope="col" style={thS}>Salaried Applicants</th>
                      <th scope="col" style={thS}>Self-Employed Applicants</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ['PAN and Aadhaar', 'PAN and Aadhaar'],
                        ["Last 3 months' salary slips", 'ITR for the last 3 years'],
                        ['Form 16 for the last 2 years', 'GST returns for the last 2 years'],
                        ["6 months' bank statements", "6 months' business and personal bank statements"],
                        ['Employment continuity proof', 'CA-certified profit and loss statement, balance sheet'],
                        ['Property documents (agreement, title chain)', 'Business registration and address proof'],
                      ].map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdL}>{row[0]}</td>
                          <td style={tdL}>{row[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={pS}>If annual rent paid by the property seller or any co-applicant exceeds Rs 1 lakh, the landlord&apos;s PAN is also required as part of KYC. Missing even one document is the most common reason a sanctioned-in-principle offer slips past its original timeline.</p>
              </div>

              <div style={secS} id="eligibility-vs-emi">
                <h2 style={h2S}>Home Loan Eligibility vs Home Loan EMI: What Is the Difference?</h2>
                <p style={pS}>Eligibility answers a question you ask before choosing a property: how much will a bank lend me. An EMI calculator answers a question you ask after you have a loan amount and a rate: what will I pay every month.</p>
                <p style={pS}>People searching for these two terms are often at different stages of the same decision. Already know the loan amount and rate you want to test? The <Link href="/calculators/mortgage-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Home Loan EMI Calculator</Link> gives you the monthly payment and full amortization schedule directly.</p>
                <p style={pS}>Do not yet know how much you can borrow? This page is the right starting point.</p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Home Loan EMI Calculator</p>
                    <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Enter your eligible loan amount to see the exact monthly payment and full amortization schedule.</p>
                  </div>
                  <Link className="fx-btn" href="/calculators/mortgage-calculator" target="_blank" rel="noopener noreferrer" style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                </div>
              </div>

              <div style={secS} id="common-mistakes">
                <h2 style={h2S}>Common Mistakes That Lower Your Eligibility Estimate</h2>
                <p style={pS}>Most applicants underestimate their own eligibility for reasons that have nothing to do with income. These are the mistakes that show up most often in loan files that get sanctioned for less than the applicant expected.</p>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Checking eligibility with a small unpaid EMI still on record:</strong> a Rs 3,000 credit card EMI or a near-closed personal loan can shave several lakh off eligibility because it sits inside your FOIR calculation until it is formally closed and reflected in your credit report.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Leaving out a spouse&apos;s income:</strong> applicants often check eligibility solo out of habit, then discover during the formal application that adding a co-applicant would have raised the number by 50% or more.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Not checking the CIBIL report for errors before applying:</strong> a wrongly reported missed payment or an old closed loan still showing as active is common, and it can push you into a worse rate band than you actually qualify for.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Comparing only one bank&apos;s FOIR:</strong> the same income can produce meaningfully different eligible amounts across lenders, as the bank-by-bank table above shows, so a single rejection does not mean the request itself was too high.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Ignoring how age caps tenure:</strong> two applicants earning the same salary can get very different eligible amounts once tenure is capped by age, a fact many first-time applicants only discover at the branch.</span></div>
              </div>

              <div style={secS} id="improve-eligibility">
                <h2 style={h2S}>How to Improve Your Home Loan Eligibility</h2>
                <p style={pS}>If the calculator shows a lower number than the property you want, these six levers close the gap, roughly in order of impact.</p>
                <ol style={{ paddingLeft: 24, margin: '0 0 16px', listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Add a working co-applicant:</strong> the single fastest lever, often raising eligibility by 50% to 70% as shown in the joint-applicant table above.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Clear existing short-term debt:</strong> paying off a <Link href="/calculators/car-loan-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>car loan</Link> or a <Link href="/calculators/personal-loan-eligibility-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>personal loan</Link> frees up FOIR capacity that goes straight into home loan eligibility.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Improve your CIBIL score above 750:</strong> a better rate band can add several lakh of eligibility on the same income, as the credit-score table above shows.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Extend the tenure where age allows:</strong> stretching from 15 to 25 years lowers the EMI on the same loan, letting a larger principal fit inside your FOIR limit.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Ask about a step-up EMI plan:</strong> some banks offer lower EMIs in the first 3 to 5 years, which qualifies you for a larger loan upfront if you expect income growth.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Declare all documented income sources:</strong> bonus, rental income, and other declared income can be added at HDFC and similar private banks, though most public banks weight it more conservatively.</li>
                </ol>
              </div>

              <div style={secS} id="tax-benefits-eligibility">
                <h2 style={h2S}>Home Loan Tax Benefits Affect Affordability, Not Eligibility</h2>
                <p style={pS}>Under the old tax regime, Section 24(b) allows a deduction of up to Rs 2 lakh a year on home loan interest for a self-occupied property, and Section 80C separately allows up to Rs 1.5 lakh on principal repayment, a combined Rs 3.5 lakh deduction ceiling.</p>
                <p style={pS}>Banks do not factor this tax saving into the FOIR calculation itself, since eligibility is based on gross EMI capacity. But the effective post-tax cost of the EMI is lower than the sticker EMI, which is worth knowing when deciding how much of your eligible amount to actually borrow. Neither deduction is available under the new tax regime.</p>
              </div>

              <div style={secS} id="pmay-subsidy-status">
                <h2 style={h2S}>Is the PMAY Interest Subsidy Still Available?</h2>
                <p style={pS}>Not automatically. The Credit Linked Subsidy Scheme (CLSS) component of <a href="https://pmay-urban.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Pradhan Mantri Awas Yojana-Urban</a>, which credited an upfront interest subsidy to eligible EWS, LIG, and MIG borrowers, had its original validity end on 31 March 2022.</p>
                <p style={pS}>PMAY-Urban continues under later phases with its own eligibility windows and target numbers. Do not assume this subsidy applies to your eligibility calculation. Check the current scheme status directly on the official portal before counting on it as part of your affordability plan.</p>
              </div>

              <div style={secS} id="balance-transfer-eligibility">
                <h2 style={h2S}>Home Loan Balance Transfer: Does the Same Eligibility Apply?</h2>
                <p style={pS}>Yes, largely. A balance transfer means foreclosing your current home loan and taking a new one with a different lender for the outstanding principal, so the new lender re-checks your income, FOIR, and CIBIL score just like a fresh application.</p>
                <p style={pS}>Since 1 January 2026, RBI rules require no prepayment or foreclosure charges on floating-rate home loans taken for personal use, whether closed with your own funds or through a balance transfer, which has made switching to a lower-rate lender significantly cheaper than it used to be.</p>
              </div>

              <div style={secS} id="eblr-rate-reset">
                <h2 style={h2S}>Why Your Home Loan Rate Changes Even If You Do Nothing</h2>
                <p style={pS}>Since October 2019, RBI has required banks to link floating-rate home loans to an External Benchmark Lending Rate (EBLR), typically the repo rate plus a bank-specific spread, rather than an internal benchmark the bank could adjust at its own discretion.</p>
                <p style={pS}>Banks must reset the EBLR-linked rate at least once every three months, so a change in the repo rate reaches your EMI within one quarter rather than being delayed indefinitely, which was a common complaint under the older MCLR system.</p>
              </div>

              <div style={secS} id="processing-fees">
                <h2 style={h2S}>Processing Fees Reduce the Loan Amount That Actually Reaches You</h2>
                <p style={pS}>Most banks charge a processing fee of 0.25% to 1% of the loan amount, plus 18% GST on that fee. On a Rs 50 lakh loan at 0.5%, that is Rs 25,000 plus Rs 4,500 GST, deducted upfront rather than added to the loan.</p>
                <p style={pS}>Some lenders cap the fee at a fixed rupee amount regardless of loan size, so it is worth asking for the exact figure before comparing two banks on rate alone. Unlike stamp duty, processing fees do not qualify for any income tax deduction.</p>
              </div>

              <div style={secS} id="pre-emi-vs-full-emi">
                <h2 style={h2S}>Pre-EMI vs Full EMI for an Under-Construction Property</h2>
                <p style={pS}>For an under-construction property, the loan is disbursed in stages as construction progresses. Pre-EMI means paying only the interest on the amount disbursed so far; full EMI means paying both principal and interest from the first payment, usually on the full sanctioned amount.</p>
                <p style={pS}>Pre-EMI keeps monthly outflow lower during construction but you can only claim the interest paid under Section 24(b), not any principal deduction, since none is being repaid yet. Full EMI costs more each month during construction but starts building equity and unlocks both interest and principal deductions immediately.</p>
              </div>

              <div style={secS} id="joint-loan-tax-benefit-split">
                <h2 style={h2S}>How Tax Benefits Split Between Co-Owners on a Joint Loan</h2>
                <p style={pS}>Each co-owner who is also a co-applicant on the loan can separately claim up to Rs 2 lakh under Section 24(b) and up to Rs 1.5 lakh under Section 80C, provided they are actually contributing to the EMI. The total interest claimed across all co-owners cannot exceed the total interest actually paid on the loan.</p>
                <p style={pS}>This means two working co-owners can together shelter up to Rs 7 lakh a year (Rs 3.5 lakh each) under the old tax regime, roughly double what a solo applicant can claim, which is a separate benefit from the eligibility boost a co-applicant's income already provides.</p>
              </div>

              <div style={secS} id="insurance-requirement">
                <h2 style={h2S}>Do Lenders Require Insurance Alongside the Loan?</h2>
                <p style={pS}>Property insurance covering the structure against fire and natural disasters is mandatory at most banks for the loan tenure, and is usually bundled into the loan amount or collected as a one-time premium at disbursement.</p>
                <p style={pS}>A separate loan protection or credit life insurance policy, which pays off the outstanding loan if the borrower dies, is commonly offered but not legally mandatory. Read the sanction letter carefully since some banks bundle this cost into the EMI by default unless you opt out.</p>
              </div>

              <div style={secS} id="second-home-loan-eligibility">
                <h2 style={h2S}>Can You Get a Second Home Loan, and What Changes?</h2>
                <p style={pS}>Yes, multiple home loans are allowed in India, and each is evaluated on its own FOIR, with your existing home loan EMI counted as an existing obligation that reduces available capacity for the new one.</p>
                <p style={pS}>Tax treatment shifts too: the Rs 1.5 lakh Section 80C principal deduction is a combined cap across both loans, not doubled, but Section 24(b) interest on a self-occupied second home stays capped at Rs 2 lakh, while a let-out or deemed-let-out second property allows the full interest paid as a deduction with no upper limit.</p>
              </div>

              <div style={secS} id="guarantor-vs-coapplicant">
                <h2 style={h2S}>Guarantor vs Co-Applicant: Only One Raises Your Eligibility</h2>
                <p style={pS}>A co-applicant's income is added to yours before FOIR is applied, directly raising the eligible loan amount, and they are equally liable for the EMI from day one. A guarantor's income is not counted toward eligibility at all; a guarantor only steps in to pay if you default, and typically has no ownership stake in the property.</p>
                <p style={pS}>Only a co-applicant who is also a co-owner can claim home loan tax benefits under Sections 24(b) and 80C. A guarantor cannot claim either deduction, since they never owned or serviced the loan under normal circumstances.</p>
              </div>

              <div style={secS} id="home-loan-vs-loan-against-property">
                <h2 style={h2S}>Home Loan Eligibility vs Loan Against Property Eligibility</h2>
                <p style={pS}>A home loan funds the purchase or construction of a residential property and can go up to 90% of the property's value for smaller loan slabs. A loan against property (LAP) uses a property you already own as collateral for funds usable for any purpose, but is capped lower, typically up to 70% of the mortgaged property's market value.</p>
                <p style={pS}>LAP interest rates usually run 1 to 3 percentage points higher than home loan rates, and eligibility depends more heavily on the pledged property's value, location, and legal clarity than on FOIR alone. If your goal is buying a home rather than raising funds against one you already own, a home loan is the cheaper and more appropriate route.</p>
              </div>

              <div style={secS} id="how-to-use">
                <h2 style={h2S}>How to Use This Calculator</h2>
                <p style={pS}>Four inputs get you an accurate eligibility estimate in under a minute.</p>
                <ol style={{ paddingLeft: 24, margin: '0 0 16px', listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Enter your net monthly income:</strong> use take-home salary, not CTC, and leave out variable bonus unless it is guaranteed.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Add existing EMIs:</strong> include every running EMI, car loan, personal loan, or credit card, so the FOIR calculation matches what a bank will actually see on your credit report.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Set tenure and age:</strong> the calculator automatically caps tenure so age plus tenure does not exceed 60, then adjusts your eligible amount in real time.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Check the eligible loan, the bank comparison table, and the amortization schedule:</strong> then use the <Link href="/calculators/mortgage-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Home Loan EMI Calculator</Link> to model the exact monthly payment on the amount you plan to borrow.</li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQ faqs={faqs} />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All figures on this page are indicative estimates based on standard FOIR assumptions and do not represent a loan offer from any bank. Actual eligibility depends on each lender&apos;s underwriting policy, your complete credit history, and property-specific factors that this calculator does not evaluate. This tool is for educational and planning purposes only and does not constitute financial advice. Consult your bank or a SEBI-registered financial adviser before making borrowing decisions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .hle-sidebar::-webkit-scrollbar { width: 5px; }
            .hle-sidebar::-webkit-scrollbar-track { background: transparent; }
            .hle-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .hle-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            className="hle-sidebar"
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
              <HomeLoanSnapshot />
              <nav aria-label="Related Calculators" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <SidebarList title="Related Calculators" items={POPULAR} />
                <SidebarList title="More Tools" items={MORE} />
              </nav>
              <RelatedReads />
            </div>
          </aside>
        </div>
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

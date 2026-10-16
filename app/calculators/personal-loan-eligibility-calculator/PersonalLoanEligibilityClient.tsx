'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useId } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { useEffect, useLayoutEffect } from 'react';
import { FAQBox } from '@/components/common/FAQBox';

/* ── Palette ──────────────────────────────────────────────── */
const C = {
  dark: '#101214', lime: '#a6dbc4', lime2: '#2d9970', paleLime: '#f4f5f6',
  ink: '#16140F', ink2: '#50565c', ink3: '#7a8087', white: '#ffffff',
  bg: '#f6f7f8', border: '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

/* ── Math ─────────────────────────────────────────────────── */
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

interface AmorRow { month: number; opening: number; emi: number; interest: number; principal: number; closing: number; }

function buildAmortization(loan: number, annualRate: number, months: number): AmorRow[] {
  if (loan <= 0 || months <= 0 || annualRate < 0) return [];
  const r = annualRate / 12 / 100;
  const emi = r === 0 ? loan / months : (loan * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  const rows: AmorRow[] = [];
  let bal = loan;
  for (let m = 1; m <= months; m++) {
    const interest = bal * r;
    const principal = Math.min(emi - interest, bal);
    const closing = Math.max(0, bal - principal);
    rows.push({ month: m, opening: bal, emi, interest, principal, closing });
    bal = closing;
  }
  return rows;
}

const SCORE_ADJUSTMENTS: Record<string, number> = {
  '750+': 0, '700-749': 1.5, '650-699': 3.5, 'Below 650': 6.0,
};

const BANK_RATES = [
  { name: 'SBI',           baseRate: 11.15 },
  { name: 'HDFC Bank',     baseRate: 10.50 },
  { name: 'ICICI Bank',    baseRate: 10.75 },
  { name: 'Axis Bank',     baseRate: 10.49 },
  { name: 'Kotak',         baseRate: 10.99 },
  { name: 'Bajaj Finserv', baseRate: 11.00 },
  { name: 'Tata Capital',  baseRate: 10.99 },
  { name: 'IndusInd Bank', baseRate: 10.49 },
  { name: 'IDFC First',    baseRate: 10.49 },
];

/* ── Donut Chart ──────────────────────────────────────────── */
function DonutChart({ principal, interest }: { principal: number; interest: number }) {
  const total = principal + interest;
  if (total <= 0) return null;
  const principalPct = Math.max(1, Math.min(99, Math.round((principal / total) * 100)));
  const R = 76, sw = 18, cx = 100, cy = 100;
  const circ = 2 * Math.PI * R;
  const pArc = (principalPct / 100) * circ;
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" role="img"
      aria-label={`Principal ${principalPct}%, Interest ${100 - principalPct}% of total repayment`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#2d9970" strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 10} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Principal</text>
      <text x={cx} y={cy + 16} textAnchor="middle" style={{ fontSize: 26, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{principalPct}%</text>
    </svg>
  );
}

/* ── Amortization Bar Chart (stacked SVG) ───────────────── */
function AmortBarChart({ rows }: { rows: AmorRow[] }) {
  if (rows.length === 0) return null;
  const years: { year: number; principal: number; interest: number }[] = [];
  rows.forEach(row => {
    const y = Math.ceil(row.month / 12);
    if (years[y - 1]) {
      years[y - 1].principal += row.principal;
      years[y - 1].interest += row.interest;
    } else {
      years[y - 1] = { year: y, principal: row.principal, interest: row.interest };
    }
  });
  if (years.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxTotal = Math.max(...years.map(d => d.principal + d.interest));
  const slot = (W - PADL) / years.length;
  const barW = Math.max(4, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;
  return (
    <svg role="img" aria-label="Year-by-year principal and interest breakdown"
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible', marginBottom: 8 }}>
      {years.map((d, i) => {
        const total = d.principal + d.interest;
        const totalH = maxTotal > 0 ? (total / maxTotal) * H : 0;
        const principalH = total > 0 ? (d.principal / total) * totalH : 0;
        const intH = totalH - principalH;
        const x = PADL + i * slot + gap;
        return (
          <g key={d.year}>
            <rect x={x} y={H - totalH} width={barW} height={intH} fill={CHART_PAIR.secondary} rx={2} />
            <rect x={x} y={H - principalH} width={barW} height={principalH} fill={CHART_PAIR.primary} rx={2} />
            <text x={x + barW / 2} y={H + 14} textAnchor="middle"
              style={{ fontSize: years.length > 5 ? 8 : 10, fill: C.ink3, fontFamily: INTER }}>
              Y{d.year}
            </text>
          </g>
        );
      })}
      <line x1={PADL} y1={H} x2={W} y2={H} stroke={C.border} strokeWidth={1} />
    </svg>
  );
}

/* ── Slider ───────────────────────────────────────────────── */
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
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 36 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 8 : 14 }}>
        {label ? <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 13.5 : 14, color: C.ink2, fontWeight: 400 }}>{label}</label> : <span />}
        {editing ? (
          <div style={{ position: 'relative' }}>
            <input id={inputId} autoFocus value={raw} aria-label={`Enter ${label} value`}
              onChange={e => setRaw(e.target.value)} onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
              style={{ fontSize: 14, fontWeight: 600, textAlign: suffix ? 'left' : 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '6px 10px' : '7px 12px', width: 120, outline: 'none', color: C.ink, fontFamily: INTER }} />
            {suffix && <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: C.ink3, pointerEvents: 'none', fontWeight: 700 }}>{suffix}</span>}
          </div>
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${display}. Click to edit.`}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}
            style={{ fontSize: compact ? 13 : 14, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '5px 12px' : '6px 14px', cursor: 'pointer', fontFamily: INTER, minWidth: compact ? 88 : 105, textAlign: 'center', transition: 'border-color 0.15s' }}>
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

/* ── SidebarList ──────────────────────────────────────────── */
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

const POPULAR = [
  { href: '/calculators/personal-loan-calculator', label: 'Personal Loan EMI Calculator' },
  { href: '/calculators/home-loan-eligibility-calculator', label: 'Home Loan Eligibility' },
  { href: '/calculators/emi-calculator', label: 'General EMI Calculator' },
  { href: '/calculators/debt-to-income-ratio-calculator', label: 'Debt-to-Income Ratio' },
  { href: '/calculators/business-loan-eligibility-calculator', label: 'Business Loan Eligibility' },
  { href: '/calculators/in-hand-salary-calculator', label: 'In-Hand Salary Calculator' },
];

/* ── FAQ data ─────────────────────────────────────────────── */
const FAQS = [
  { q: 'How is personal loan eligibility calculated?', a: 'Personal loan eligibility is calculated using the FOIR method: Available EMI = (Net Monthly Salary x FOIR%) minus Existing EMIs. The eligible loan amount is the maximum principal whose monthly EMI equals this available EMI at the given rate and tenure. At Rs 50,000 salary, 50% FOIR, 11% rate, 5 years: available EMI is Rs 25,000, eligible loan is approximately Rs 11.50 lakhs.' },
  { q: 'How much personal loan can I get on Rs 27,000 salary?', a: 'On Rs 27,000 monthly salary with no existing EMIs, at 11 per cent for 5 years and 50% FOIR, personal loan eligibility is approximately Rs 6.21 lakhs. The available EMI is Rs 13,500 per month. With a CIBIL score above 750, Axis Bank or HDFC Bank at lower rates can push this to approximately Rs 6.35 lakhs.' },
  { q: 'How much personal loan can I get on Rs 15,000 salary?', a: 'On Rs 15,000 monthly salary with no existing EMIs, at 11 per cent for 5 years, eligibility is approximately Rs 3.45 lakhs. Only SBI (Xpress Credit) accepts Rs 15,000 salary among major banks. Most private banks require a minimum salary of Rs 20,000 to Rs 25,000. Some NBFCs may approve smaller amounts at higher rates (18 to 24 per cent).' },
  { q: 'How much personal loan can I get on Rs 30,000 salary?', a: 'On Rs 30,000 monthly salary with no existing EMIs, at 11 per cent for 5 years, personal loan eligibility is approximately Rs 6.90 lakhs. With a CIBIL score above 750, HDFC Bank at 10.5 per cent offers approximately Rs 7.00 lakhs. SBI caps personal loans at 24 times monthly salary (Rs 7.2 lakhs at this salary), subject to FOIR validation.' },
  { q: 'How much personal loan can I get on Rs 50,000 salary?', a: 'On Rs 50,000 monthly salary with no existing EMIs, at 11 per cent for 5 years, eligibility is approximately Rs 11.50 lakhs. With a CIBIL score above 750, HDFC Bank at 10.5 per cent offers approximately Rs 11.63 lakhs. ICICI Bank at 30x multiplier offers up to Rs 15 lakhs subject to FOIR validation and credit underwriting.' },
  { q: 'How much personal loan can I get on Rs 70,000 salary?', a: 'On Rs 70,000 monthly salary with no existing obligations, at 11 per cent for 5 years, eligibility is approximately Rs 16.09 lakhs. Available EMI is Rs 35,000 per month. With CIBIL above 750 at HDFC (10.5%), eligibility rises to approximately Rs 16.28 lakhs. ICICI Bank at 30x multiplier gives a ceiling of Rs 21 lakhs.' },
  { q: 'How much personal loan can I get on Rs 1,00,000 salary?', a: 'On Rs 1,00,000 monthly salary with no existing obligations, at 11 per cent for 5 years, eligibility is approximately Rs 23.00 lakhs. Available EMI is Rs 50,000. ICICI Bank at 30x multiplier offers up to Rs 30 lakhs (subject to Rs 50 lakh cap), while SBI caps at Rs 20 to 30 lakhs. Final sanction depends on CIBIL score and employer category.' },
  { q: 'What CIBIL score is required for a personal loan?', a: 'Most major banks require a minimum CIBIL score of 750 for personal loan approval at the best rates. Scores between 700 and 749 may get approved at 1 to 3 per cent higher rates. Scores between 650 and 699 face rejection at tier-1 banks and may need NBFCs at 16 to 20 per cent. Scores below 650 are rejected by nearly all regulated lenders.' },
  { q: 'Does my employer affect my personal loan eligibility?', a: 'Yes, significantly. Banks categorize employers into tiers: Tier A (central government, PSUs, top MNCs like TCS, Infosys, Wipro) gets the highest multipliers (up to 30x) and lowest rates. Tier B (listed private companies) gets standard multipliers (up to 24x). Tier C (unlisted small companies) gets the lowest multipliers (10x to 15x) and highest rates. The employer tier also determines the minimum salary requirement.' },
  { q: 'What is the maximum tenure for a personal loan?', a: 'The standard maximum tenure for a personal loan is 5 years (60 months) across most Indian banks. SBI and HDFC Bank offer up to 6 years for select salary account holders. A few lenders like Bajaj Finserv and some NBFCs offer up to 8 years. Longer tenure reduces monthly EMI but increases total interest cost significantly.' },
  { q: 'How do existing EMIs affect personal loan eligibility?', a: 'Existing EMIs directly reduce your FOIR headroom. On Rs 50,000 salary with a 50% FOIR cap, maximum total EMI is Rs 25,000. If you already pay Rs 10,000 in car loan EMI, your available capacity for a new personal loan is Rs 15,000. At 11% for 5 years, Rs 15,000 available EMI supports a loan of approximately Rs 6.90 lakhs instead of Rs 11.50 lakhs.' },
  { q: 'Can self-employed individuals get personal loans?', a: 'Yes, but eligibility criteria are stricter. Self-employed applicants need ITRs for the last 2 to 3 years, minimum 3 years of business continuity, a CIBIL score above 700, and GST registration. Banks use the average net profit from ITRs (not the gross income) as the income base, and apply a lower FOIR of 40 to 45 per cent. Interest rates are 1 to 2 per cent higher than for salaried applicants.' },
  { q: 'What is the SBI personal loan eligibility for salaried employees?', a: 'SBI Xpress Credit is available to salaried employees with a minimum net monthly income of Rs 15,000 (one of the lowest minimums in the market). Eligibility is up to 24 times net monthly income, capped at Rs 20 to 30 lakhs depending on employer category. Central and state government employees, defence personnel, and SBI salary account holders get preferential rates starting at 11.15 per cent.' },
  { q: 'What is HDFC Bank personal loan eligibility based on salary?', a: 'HDFC Bank requires a minimum net monthly salary of Rs 25,000 for personal loans (Rs 50,000 in top metro cities). Eligibility is up to 27 times monthly salary, maximum Rs 40 lakhs, at rates starting 10.5 per cent for CIBIL 750+. Employees of MNCs (Super A category) get the best terms. Pre-approved instant loans are available for existing HDFC salary account holders within seconds.' },
  { q: 'What is ICICI Bank personal loan eligibility?', a: 'ICICI Bank offers personal loans to salaried applicants with minimum monthly income of Rs 25,000. The salary multiplier goes up to 30 times, with a maximum loan of Rs 50 lakhs, the highest among major banks. Interest rates start at 10.75 per cent for CIBIL 750+. Existing ICICI salary account holders and Millennia card holders get pre-approved offers with zero documentation.' },
  { q: 'What is Axis Bank personal loan eligibility?', a: 'Axis Bank requires a minimum monthly salary of Rs 25,000. The salary multiplier is up to 27 times with a maximum loan of Rs 40 lakhs. Interest rates start at 10.49 per cent (one of the lowest) for CIBIL 750+. Axis Burgundy and Axis Prestige customers get higher multipliers and faster processing. Axis offers tenures up to 60 months for personal loans.' },
  { q: 'How can I improve my personal loan eligibility?', a: 'To improve personal loan eligibility, close small existing loans first (each Rs 5,000 EMI freed adds roughly Rs 2.76 lakhs eligibility at 11% for 5 years), maintain CIBIL above 750, apply at your salary account bank for preferential treatment, extend tenure from 3 to 5 years to reduce required EMI, and add a co-applicant to combine incomes.' },
  { q: 'What documents are required for a personal loan?', a: 'For salaried applicants: identity proof (PAN or Aadhaar), address proof, last 3 months salary slips, last 6 months bank statements showing salary credits, and Form 16. For self-employed: PAN, Aadhaar, ITRs for last 2 to 3 years, CA-certified profit and loss statement, last 6 months business bank statements, and GST registration certificate. Pre-approved loans for existing bank customers require zero documentation.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ── Article style helpers ────────────────────────────────── */
const h2S: React.CSSProperties = { fontSize: 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' };
const h3S: React.CSSProperties = { fontSize: 16, fontWeight: 700, color: C.ink, margin: '0 0 8px' };
const pS: React.CSSProperties  = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' };
const secS: React.CSSProperties = { margin: '0 0 44px' };
const thS: React.CSSProperties = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' };
const thR: React.CSSProperties = { ...{ padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'right' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } };
const tdL: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' };
const tdR: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top', textAlign: 'right' as const };
const mono: React.CSSProperties = { fontFamily: 'monospace', background: '#f4f5f6', padding: '2px 7px', borderRadius: 4, fontSize: 13, color: C.dark };

/* ════════════════════════════════════════════════════════════ */
export default function PersonalLoanEligibilityClient() {
  const defaultSettings = {
    monthlyIncome: 50000, existingEmi: 0, rate: 11.0, tenureYr: 5,
    foir: 50, empType: 'Salaried', cibilScore: '750+' as keyof typeof SCORE_ADJUSTMENTS,
  };
  const { settings, updateSettings } = useCalculatorSettings('personal-loan-eligibility', defaultSettings);
  const { monthlyIncome, existingEmi, rate, tenureYr, foir, empType, cibilScore } = settings;

  const setIncome     = (v: number) => updateSettings({ monthlyIncome: v });
  const setExistingEmi = (v: number) => updateSettings({ existingEmi: v });
  const setRate       = (v: number) => updateSettings({ rate: v });
  const setTenure     = (v: number) => updateSettings({ tenureYr: v });
  const setFoir       = (v: number) => updateSettings({ foir: v });
  const setEmpType    = (v: string) => updateSettings({ empType: v });
  const setCibilScore = (v: string) => updateSettings({ cibilScore: v as keyof typeof SCORE_ADJUSTMENTS });

  const [mobile, setMobile]       = useState(false);
  const [showAmort, setShowAmort]   = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  const maxEmiCapacity = (monthlyIncome * foir) / 100;
  const availableEmi   = Math.max(0, maxEmiCapacity - existingEmi);
  const tenureMo       = tenureYr * 12;
  const cibilPenalty   = SCORE_ADJUSTMENTS[cibilScore] || 0;
  const empPenalty     = empType === 'Self-Employed' ? 1.5 : 0;
  const adjustedRate   = rate + empPenalty;

  const eligibleLoan   = Math.round(calcMaxLoanForEMI(availableEmi, adjustedRate, tenureMo));
  const totalInterest  = calcEMI(eligibleLoan, adjustedRate, tenureMo) * tenureMo - eligibleLoan;
  const isDeficit      = availableEmi <= 0;

  const amortRows = useMemo(
    () => (eligibleLoan > 0 ? buildAmortization(eligibleLoan, adjustedRate, tenureMo) : []),
    [eligibleLoan, adjustedRate, tenureMo]
  );

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Personal Loan Eligibility Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: 800 }}>
            Check your max eligible personal loan amount based on salary, existing EMIs, and credit score. Live bank-wise comparison across 9 lenders, CIBIL-adjusted. Free to use.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ════ CALCULATOR CARD ════ */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* ── Inputs ── */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Profile Details</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      {/* Employment Type */}
                      <div style={{ marginBottom: mobile ? 18 : 24 }}>
                        <label style={{ fontSize: mobile ? 13.5 : 14, color: C.ink2, fontWeight: 400, display: 'block', marginBottom: 10 }}>Employment Type</label>
                        <div role="group" aria-label="Employment type" style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                          {['Salaried', 'Self-Employed'].map(p => (
                            <button key={p} onClick={() => setEmpType(p)} aria-pressed={empType === p}
                              style={{ flex: 1, padding: '9px 0', fontSize: 13, fontWeight: empType === p ? 600 : 400, background: empType === p ? C.white : 'transparent', color: empType === p ? C.ink : C.ink3, border: 'none', cursor: 'pointer', fontFamily: INTER, transition: 'all 0.15s' }}>
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>

                      <Slider id="monthly-income" label={empType === 'Salaried' ? 'Net Monthly Salary' : 'Monthly Equivalent Profit'}
                        value={monthlyIncome} min={15000} max={500000} step={1000}
                        display={fmtIN(monthlyIncome)} onChange={setIncome} compact={mobile} />

                      <Slider id="existing-emi" label="Existing EMIs (Loans/Cards)"
                        value={existingEmi} min={0} max={200000} step={500}
                        display={fmtIN(existingEmi)} onChange={setExistingEmi} compact={mobile} />

                      {/* CIBIL Score */}
                      <div style={{ marginBottom: mobile ? 18 : 24 }}>
                        <label style={{ fontSize: mobile ? 13.5 : 14, color: C.ink2, fontWeight: 400, display: 'block', marginBottom: 10 }}>CIBIL Score Range</label>
                        <div role="group" aria-label="CIBIL score range" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                          {Object.keys(SCORE_ADJUSTMENTS).map(p => (
                            <button key={p} onClick={() => setCibilScore(p)} aria-pressed={cibilScore === p}
                              style={{ padding: '9px 0', fontSize: 13, fontWeight: cibilScore === p ? 700 : 500, background: cibilScore === p ? C.white : 'transparent', color: cibilScore === p ? C.ink : C.ink3, border: `${cibilScore === p ? 1.5 : 1}px solid ${cibilScore === p ? C.ink : C.border}`, borderRadius: 8, cursor: 'pointer', fontFamily: INTER, transition: 'all 0.15s' }}>
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button onClick={() => setShowAdvanced(true)}
                          style={{ fontSize: 12, fontWeight: 700, color: C.dark, background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: '6px 14px', cursor: 'pointer', fontFamily: INTER, display: 'flex', alignItems: 'center', gap: 5 }}>
                          More settings
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <Slider id="tenure" label="Tenure (Yrs)" value={tenureYr} min={1} max={7} step={1}
                          display={`${tenureYr} yrs`} onChange={setTenure} compact />
                        <Slider id="foir" label="FOIR Cap (%)" value={foir} min={30} max={65} step={1}
                          display={`${foir}%`} onChange={setFoir} compact />
                      </div>

                      <Slider id="rate" label="Interest Rate (% p.a.)" value={rate} min={9} max={24} step={0.25}
                        display={`${rate.toFixed(2)}%`} onChange={setRate} compact={mobile} />

                      {empType === 'Self-Employed' && (
                        <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', marginBottom: 24 }}>
                          <span style={{ fontSize: 12, color: C.ink2 }}>Effective rate: </span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{adjustedRate.toFixed(2)}% p.a.</span>
                          <span style={{ fontSize: 11.5, color: C.ink3 }}> (includes self-employed premium)</span>
                        </div>
                      )}

                      <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
                        <button onClick={() => setShowAdvanced(false)}
                          style={{ fontSize: 12, fontWeight: 600, color: C.ink2, background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, display: 'flex', alignItems: 'center', gap: 5, padding: 0 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
                          Back
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* ── Results ── */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', background: '#fafafa', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 16px', width: '100%' }}>Eligibility Summary</p>

                  {isDeficit ? (
                    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.ink3}`, padding: 20, borderRadius: 12, width: '100%' }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: C.ink, marginBottom: 8 }}>EMI Capacity Exceeded</div>
                      <div style={{ color: C.ink2, fontSize: 14, lineHeight: 1.5 }}>
                        Existing EMIs ({fmtC(existingEmi)}) exceed your {foir}% FOIR capacity ({fmtC(maxEmiCapacity)}). Close an existing loan to free up capacity before applying for a new personal loan.
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Donut: order -1 = top on desktop */}
                      <div style={{ display: 'flex', justifyContent: 'center', order: mobile ? 1 : -1 }}>
                        <DonutChart principal={eligibleLoan} interest={Math.max(0, totalInterest)} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 12, order: mobile ? 2 : -1, width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                          <span style={{ fontSize: 12, color: C.ink2 }}>Principal</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: '#2d9970' }} aria-hidden="true" />
                          <span style={{ fontSize: 12, color: C.ink2 }}>Interest</span>
                        </div>
                      </div>

                      {/* Main result dark box */}
                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 8 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                          <div style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Max Eligible Loan</div>
                          <div style={{ fontSize: mobile ? 12 : 13, color: '#7A8087' }}>{tenureYr} yr at {adjustedRate.toFixed(2)}%</div>
                        </div>
                        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                          <div aria-live="polite" aria-label={`Maximum eligible loan: ${fmtC(eligibleLoan)}`}
                            style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', lineHeight: 1 }}>
                            {fmtC(eligibleLoan)}
                          </div>
                          <div style={{ fontSize: mobile ? 12 : 13, fontWeight: 600, color: '#7A8087', lineHeight: 1 }}>EMI {fmtIN(availableEmi)}/mo</div>
                        </div>
                      </div>

                      {/* Secondary metrics */}
                      {[
                        { label: 'Total Repayment', val: fmtC(eligibleLoan + Math.max(0, totalInterest)) },
                        { label: 'Total Interest', val: fmtC(Math.max(0, totalInterest)) },
                        { label: 'Salary Multiplier', val: `${(eligibleLoan / monthlyIncome).toFixed(1)}x` },
                      ].map(({ label, val }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: 13, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{val}</span>
                        </div>
                      ))}
                    </>
                  )}

                  {/* CIBIL Warning */}
                  {cibilScore === 'Below 650' && (
                    <div style={{ marginTop: 16, padding: 14, background: '#FFF4E5', border: '1px solid #FFD8A8', borderRadius: 8, width: '100%' }}>
                      <p style={{ margin: 0, fontSize: 13, color: '#A15C00', lineHeight: 1.5 }}>
                        <strong>Note:</strong> A CIBIL score below 650 will result in rejection at most major banks. NBFCs may approve at 18 to 24 per cent interest.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* ── Amortization Schedule ── */}
              {!isDeficit && eligibleLoan > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowAmort(v => !v)} aria-expanded={showAmort} aria-controls="amort-panel"
                    style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: mobile ? '14px 18px' : '16px 32px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, fontSize: 13.5, fontWeight: 600, color: C.dark, textAlign: 'left' }}>
                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      style={{ transform: showAmort ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                    {showAmort ? 'Hide' : 'View'} Amortization Schedule ({tenureMo} months)
                  </button>
                  {showAmort && (
                    <div id="amort-panel" style={{ padding: mobile ? '0 18px 20px' : '0 32px 24px' }}>
                      <AmortBarChart rows={amortRows} />
                      <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} aria-hidden="true" />
                          <span style={{ fontSize: 12, color: C.ink2 }}>Principal</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} aria-hidden="true" />
                          <span style={{ fontSize: 12, color: C.ink2 }}>Interest</span>
                        </div>
                      </div>
                      {mobile && (
                        <p style={{ fontSize: 11.5, color: C.ink3, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                          Swipe to scroll
                        </p>
                      )}
                      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' as const }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 560 }}>
                          <caption style={{ captionSide: 'bottom', fontSize: 11.5, color: C.ink3, textAlign: 'left', paddingTop: 8 }}>
                            Month-by-month personal loan amortization for eligible loan of {fmtC(eligibleLoan)} at {adjustedRate.toFixed(2)}% p.a.
                          </caption>
                          <thead>
                            <tr>
                              {[['Month', false], ['Opening Balance', true], ['EMI', true], ['Interest', true], ['Principal', true], ['Closing Balance', true]].map(([h, right]) => (
                                <th key={h as string} scope="col" style={{ ...thS, textAlign: right ? 'right' : 'left', fontSize: 11 }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {amortRows.map(row => (
                              <tr key={row.month} style={{ background: row.month % 2 === 0 ? '#fafafa' : C.white }}>
                                <td style={{ ...tdL, fontSize: 12.5 }}>{row.month}</td>
                                <td style={{ ...tdR, fontSize: 12.5 }}>{fmtC(row.opening)}</td>
                                <td style={{ ...tdR, fontSize: 12.5 }}>{fmtC(row.emi)}</td>
                                <td style={{ ...tdR, fontSize: 12.5, color: C.ink2 }}>{fmtC(row.interest)}</td>
                                <td style={{ ...tdR, fontSize: 12.5, color: C.dark }}>{fmtC(row.principal)}</td>
                                <td style={{ ...tdR, fontSize: 12.5 }}>{fmtC(row.closing)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div style={{ marginBottom: 36 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ════ ARTICLE ════ */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={secS} id="what-is-eligibility">
                <h2 style={h2S}>What Is Personal Loan Eligibility?</h2>
                <p style={pS}>Personal loan eligibility is the maximum unsecured amount a bank will approve based on your income, existing obligations, and credit score. Unlike home loans, no collateral is required, so your income and repayment history are everything.</p>
                <p style={pS}>Banks use two methods to calculate eligibility: FOIR (Fixed Obligation to Income Ratio) as the primary method and Salary Multiplier as a secondary check. This calculator shows both methods and compares 9 banks in real time, showing what each lender will actually approve for your specific CIBIL score.</p>
              </div>

              <div style={secS} id="eligibility-by-salary">
                <h2 style={h2S}>How Much Personal Loan Can I Get?</h2>
                <p style={pS}>Personal loan eligibility scales directly with salary. Below shows what you can borrow at 50% FOIR, 11% interest, 5-year tenure, and zero existing obligations. Add your own income and existing EMIs to the calculator above for your exact figure.</p>
                <div style={{ overflowX: 'auto', marginBottom: 12 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11.5, color: C.ink3, textAlign: 'left', paddingTop: 6 }}>
                      Indicative personal loan eligibility at 11% p.a., 5-year tenure, 50% FOIR, zero existing obligations.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Monthly Salary</th>
                        <th scope="col" style={thR}>EMI Capacity (50%)</th>
                        <th scope="col" style={thR}>Eligible Loan</th>
                        <th scope="col" style={thR}>Multiplier</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Rs 12,000', 'Rs 6,000',  'Rs 2.76 L', '23.0x'],
                        ['Rs 15,000', 'Rs 7,500',  'Rs 3.45 L', '23.0x'],
                        ['Rs 17,000', 'Rs 8,500',  'Rs 3.91 L', '23.0x'],
                        ['Rs 20,000', 'Rs 10,000', 'Rs 4.60 L', '23.0x'],
                        ['Rs 23,000', 'Rs 11,500', 'Rs 5.29 L', '23.0x'],
                        ['Rs 25,000', 'Rs 12,500', 'Rs 5.75 L', '23.0x'],
                        ['Rs 27,000', 'Rs 13,500', 'Rs 6.21 L', '23.0x'],
                        ['Rs 30,000', 'Rs 15,000', 'Rs 6.90 L', '23.0x'],
                        ['Rs 31,000', 'Rs 15,500', 'Rs 7.13 L', '23.0x'],
                        ['Rs 32,000', 'Rs 16,000', 'Rs 7.36 L', '23.0x'],
                        ['Rs 35,000', 'Rs 17,500', 'Rs 8.05 L', '23.0x'],
                        ['Rs 40,000', 'Rs 20,000', 'Rs 9.20 L', '23.0x'],
                        ['Rs 50,000', 'Rs 25,000', 'Rs 11.50 L', '23.0x'],
                        ['Rs 70,000', 'Rs 35,000', 'Rs 16.09 L', '23.0x'],
                        ['Rs 1,00,000', 'Rs 50,000', 'Rs 23.00 L', '23.0x'],
                      ].map(([sal, emi, loan, mult], i) => (
                        <tr key={sal} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{sal}</td>
                          <td style={tdR}>{emi}</td>
                          <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>{loan}</td>
                          <td style={tdR}>{mult}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...pS, fontSize: 13, color: C.ink3, margin: '8px 0 0' }}>
                  Each Rs 5,000 of existing EMI reduces eligibility by approximately Rs 2.76 lakhs at these parameters. Use the calculator above to adjust for your actual situation.
                </p>
              </div>

              <div style={secS} id="eligibility-formula">
                <h2 style={h2S}>How Is Eligibility Calculated?</h2>
                <p style={pS}>Banks use the FOIR (Fixed Obligation to Income Ratio) method as the primary calculation. Available EMI equals (Net Salary x FOIR%) minus existing EMIs. The eligible loan is the maximum principal whose monthly EMI equals this available amount.</p>
                <p style={pS}>Example: Rs 30,000 salary, zero existing EMIs, 50% FOIR cap. Available EMI = Rs 15,000. At 11% for 5 years, this supports a loan of approximately Rs 6.90 lakhs.</p>
              </div>

              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 44, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' as const }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Need to calculate EMI?</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Use the Personal Loan EMI Calculator for exact monthly payments at any loan amount or rate.</p>
                </div>
                <Link className="fx-btn" href="/calculators/personal-loan-calculator" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap' as const, flexShrink: 0 }}>Open calculator</Link>
              </div>

              <div style={secS} id="eligibility-criteria">
                <h2 style={h2S}>Personal Loan Eligibility Criteria</h2>
                <p style={pS}>All banks assess these criteria during underwriting. Meet the minimums and you qualify for consideration.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11.5, color: C.ink3, textAlign: 'left', paddingTop: 6 }}>Standard personal loan eligibility criteria for salaried applicants at major Indian banks.</caption>
                    <thead><tr><th scope="col" style={thS}>Criterion</th><th scope="col" style={thS}>Salaried</th><th scope="col" style={thS}>Self-Employed</th></tr></thead>
                    <tbody>
                      {[
                        ['Age', '21 to 60 years at loan maturity', '25 to 65 years'],
                        ['Minimum Income', 'Rs 15,000/month (SBI), Rs 25,000/month (HDFC, ICICI, Axis)', 'Rs 25,000/month average net profit (from ITR)'],
                        ['Work Experience', '1 year total; 6 months at current employer', '3 years in same business'],
                        ['CIBIL Score', '750+ for best rates; 700 minimum at most banks', '700 minimum; stricter scrutiny'],
                        ['Employment Type', 'Government, PSU, MNC, listed private company', 'Proprietor, partnership, private limited company'],
                        ['FOIR Cap', '40% to 55% of net monthly income', '40% to 45% of net monthly income'],
                        ['Loan Tenure', 'Up to 5 years (some banks 6 to 7 years)', 'Up to 5 years'],
                        ['Maximum Loan', 'Up to Rs 50 lakhs (ICICI); Rs 20 to 40 lakhs at most banks', 'Up to Rs 25 to 30 lakhs at most banks'],
                      ].map(([c, s, se]) => (
                        <tr key={c}><td style={{ ...tdL, fontWeight: 600, color: C.ink, whiteSpace: 'nowrap' as const }}>{c}</td><td style={tdL}>{s}</td><td style={tdL}>{se}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={secS} id="sbi-eligibility">
                <h2 style={h2S}>SBI Personal Loan Eligibility</h2>
                <p style={pS}>SBI Xpress Credit accepts salaries as low as Rs 15,000 per month, lower than any major private bank. The interest rate is 11.15% for government and PSU employees, higher for others.</p>
                <div style={{ overflowX: 'auto', marginBottom: 12 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11.5, color: C.ink3, textAlign: 'left', paddingTop: 6 }}>SBI Xpress Credit personal loan eligibility details. Rates and limits as of June 2026.</caption>
                    <thead><tr><th scope="col" style={thS}>Parameter</th><th scope="col" style={thS}>Details</th></tr></thead>
                    <tbody>
                      {[
                        ['Minimum monthly income', 'Rs 15,000 (one of the lowest in the market)'],
                        ['Interest rate', '11.15% p.a. onwards (best for government employees)'],
                        ['Maximum loan amount', 'Rs 20 lakhs to Rs 30 lakhs depending on employer category'],
                        ['Salary multiplier', 'Up to 24x net monthly income'],
                        ['Maximum tenure', '72 months (6 years) for select salary account holders'],
                        ['Who qualifies', 'Central/state government, defence, PSU, and select corporate employees with SBI salary account'],
                      ].map(([p, d]) => (
                        <tr key={p}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{p}</td><td style={tdL}>{d}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={pS}>SBI eligibility at Rs 30,000 salary: available EMI at 50% FOIR is Rs 15,000; eligible loan at 11.15% for 5 years is approximately Rs 6.82 lakhs. SBI's 24x multiplier gives a ceiling of Rs 7.2 lakhs. The lower of the two (FOIR-based Rs 6.82 L) is the final sanction.</p>
              </div>

              <div style={secS} id="hdfc-eligibility">
                <h2 style={h2S}>HDFC Bank Personal Loan Eligibility</h2>
                <p style={pS}>HDFC Bank is India's largest personal loan lender and offers 10-second instant loans for pre-approved salary account holders. Minimum salary is Rs 25,000 (Rs 50,000 in top metros). Interest rate starts at 10.5% for CIBIL 750+ in Super A category jobs.</p>
                <div style={{ overflowX: 'auto', marginBottom: 12 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11.5, color: C.ink3, textAlign: 'left', paddingTop: 6 }}>HDFC Bank personal loan eligibility criteria and rate details. Rates as of June 2026.</caption>
                    <thead><tr><th scope="col" style={thS}>Parameter</th><th scope="col" style={thS}>Details</th></tr></thead>
                    <tbody>
                      {[
                        ['Minimum monthly income', 'Rs 25,000 (Rs 50,000 in top metro cities like Mumbai, Delhi NCR)'],
                        ['Interest rate', '10.5% p.a. for CIBIL 750+ (Super A employer category)'],
                        ['Maximum loan amount', 'Rs 40 lakhs'],
                        ['Salary multiplier', 'Up to 27x net monthly income'],
                        ['Employer categories', 'Super A (MNCs, Big 4, top IT firms), Cat A, Cat B, Cat C; lower category = higher rate'],
                        ['Best for', 'Existing HDFC salary account holders; instant pre-approved disbursal in 10 seconds'],
                      ].map(([p, d]) => (
                        <tr key={p}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{p}</td><td style={tdL}>{d}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={pS}>At Rs 50,000 salary with CIBIL 750+: available EMI is Rs 25,000, which supports approximately Rs 11.63 lakhs at 10.5% for 5 years. This is higher than SBI because the lower rate makes each EMI rupee go further. Existing HDFC salary account holders get instant approval within seconds.</p>
              </div>

              <div style={secS} id="icici-eligibility">
                <h2 style={h2S}>ICICI Bank Personal Loan Eligibility</h2>
                <p style={pS}>ICICI Bank offers the highest multiplier (30x) and highest loan cap (Rs 50 lakhs) among major private banks. Minimum salary is Rs 25,000. Interest rate starts at 10.75% for CIBIL 750+. Pre-approved loans available for existing ICICI salary account holders.</p>
                <div style={{ overflowX: 'auto', marginBottom: 12 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11.5, color: C.ink3, textAlign: 'left', paddingTop: 6 }}>ICICI Bank personal loan eligibility criteria. Rates as of June 2026.</caption>
                    <thead><tr><th scope="col" style={thS}>Parameter</th><th scope="col" style={thS}>Details</th></tr></thead>
                    <tbody>
                      {[
                        ['Minimum monthly income', 'Rs 25,000 (standard); Rs 30,000 in some cities'],
                        ['Interest rate', '10.75% p.a. for CIBIL 750+'],
                        ['Maximum loan amount', 'Rs 50 lakhs (highest cap among major banks)'],
                        ['Salary multiplier', 'Up to 30x net monthly income'],
                        ['Instant loan', 'Pre-approved in seconds for existing ICICI Millennia and ICICI salary account holders'],
                        ['Tenure', 'Up to 72 months (6 years) for select profiles'],
                      ].map(([p, d]) => (
                        <tr key={p}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{p}</td><td style={tdL}>{d}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={pS}>At Rs 70,000 salary with CIBIL 750+: FOIR method at 10.75% for 5 years gives Rs 16.09 lakhs. Multiplier method gives Rs 21 lakhs (30x). ICICI approves the lower amount, so FOIR-based Rs 16.09 lakhs is typically the final approval.</p>
              </div>

              <div style={secS} id="axis-eligibility">
                <h2 style={h2S}>Axis Bank Personal Loan Eligibility</h2>
                <p style={pS}>Axis Bank offers the lowest starting rate (10.49% p.a.) among major banks for CIBIL 750+ in Burgundy or Prestige tier. Minimum salary is Rs 25,000. Maximum loan is Rs 40 lakhs with up to 27x multiplier.</p>
                <div style={{ overflowX: 'auto', marginBottom: 12 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11.5, color: C.ink3, textAlign: 'left', paddingTop: 6 }}>Axis Bank personal loan eligibility criteria. Rates as of June 2026.</caption>
                    <thead><tr><th scope="col" style={thS}>Parameter</th><th scope="col" style={thS}>Details</th></tr></thead>
                    <tbody>
                      {[
                        ['Minimum monthly income', 'Rs 25,000'],
                        ['Interest rate', '10.49% p.a. for CIBIL 750+ (Burgundy / Prestige tier); higher for standard applicants'],
                        ['Maximum loan amount', 'Rs 40 lakhs'],
                        ['Salary multiplier', 'Up to 27x net monthly income'],
                        ['Tenure', 'Up to 60 months (5 years)'],
                        ['Best for', 'Axis Bank salary account holders; Axis Burgundy customers get higher multipliers'],
                      ].map(([p, d]) => (
                        <tr key={p}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{p}</td><td style={tdL}>{d}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={pS}>At Rs 50,000 salary with CIBIL 750+: available EMI is Rs 25,000, which supports Rs 11.63 lakhs at 10.49% for 5 years. This is the highest among major banks at this salary because Axis has the lowest rate.</p>
              </div>

              <div style={secS} id="credit-score">
                <h2 style={h2S}>CIBIL Score Impact on Eligibility</h2>
                <p style={pS}>Your CIBIL score controls both approval odds and the interest rate offered. A better score directly increases your eligible loan amount because the FOIR calculation uses your actual rate. Below shows the impact at Rs 50,000 salary, 5-year tenure.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11.5, color: C.ink3, textAlign: 'left', paddingTop: 6 }}>Impact of CIBIL score on personal loan eligibility at Rs 50,000 salary, 5-year tenure. Rate shown is HDFC Bank base rate with CIBIL adjustment.</caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>CIBIL Score</th>
                        <th scope="col" style={thR}>Est. Rate (HDFC)</th>
                        <th scope="col" style={thR}>Eligible Loan</th>
                        <th scope="col" style={thS}>Approval Likelihood</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['750+', '10.50%', 'Rs 11.63 L', 'High (instant pre-approval possible)'],
                        ['700-749', '12.00%', 'Rs 11.15 L', 'Moderate (approval likely, higher rate)'],
                        ['650-699', '14.00%', 'Rs 10.56 L', 'Low (private banks may reject; NBFC likely)'],
                        ['Below 650', '16.50%+', 'Rs 9.86 L', 'Very low (most banks reject; NBFC at 18-24%)'],
                      ].map(([cibil, rate, loan, likelihood], i) => (
                        <tr key={cibil} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{cibil}</td>
                          <td style={tdR}>{rate}</td>
                          <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>{loan}</td>
                          <td style={tdL}>{likelihood}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={pS}>Moving from 700 to 750 reduces your rate by about 1.5%, saving Rs 42,000 in total interest on a Rs 10 lakh, 5-year loan. It also changes your status from conditional approval to instant approval at most banks.</p>
              </div>

              <div style={secS} id="self-employed-eligibility">
                <h2 style={h2S}>Self-Employed Personal Loan Eligibility</h2>
                <p style={pS}>Self-employed applicants face stricter criteria because income is variable. Banks use average net profit from the last 2 to 3 years of ITRs (not gross revenue) divided by 12. A business with Rs 60 lakh turnover but Rs 10 lakh net profit is assessed on Rs 83,333 per month.</p>
                <div style={{ overflowX: 'auto', marginBottom: 12 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11.5, color: C.ink3, textAlign: 'left', paddingTop: 6 }}>Salaried vs self-employed personal loan criteria comparison.</caption>
                    <thead><tr><th scope="col" style={thS}>Factor</th><th scope="col" style={thS}>Salaried</th><th scope="col" style={thS}>Self-Employed</th></tr></thead>
                    <tbody>
                      {[
                        ['Income proof', 'Salary slips (3 months)', 'ITR for 2 to 3 years + CA-certified P&L'],
                        ['Income used', 'Net take-home salary', 'Average net profit from ITR / 12'],
                        ['Business continuity', 'Not required', 'Minimum 3 years in same business'],
                        ['FOIR cap', '40% to 55%', '40% to 45% (stricter)'],
                        ['Interest rate premium', '0% (base rate)', '+1% to 2% above salaried rate'],
                        ['CIBIL minimum', '700 (some banks 750)', '700 to 750 (stricter scrutiny)'],
                        ['Max tenure', 'Up to 6 to 7 years', 'Up to 5 years at most banks'],
                      ].map(([f, s, se]) => (
                        <tr key={f}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{f}</td><td style={tdL}>{s}</td><td style={tdL}>{se}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={secS} id="nri-eligibility">
                <h2 style={h2S}>NRI Personal Loan Eligibility</h2>
                <p style={pS}>NRIs can borrow from HDFC, ICICI, Axis, and SBI through NRI branches. Loans are disbursed into NRO or NRE accounts and must be used for India-based expenses only. You typically need an India-based co-applicant.</p>
                <div style={{ overflowX: 'auto', marginBottom: 12 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11.5, color: C.ink3, textAlign: 'left', paddingTop: 6 }}>NRI personal loan eligibility criteria across Indian banks.</caption>
                    <thead><tr><th scope="col" style={thS}>Criterion</th><th scope="col" style={thS}>Requirement</th></tr></thead>
                    <tbody>
                      {[
                        ['Residency', 'Non-Resident Indian (NRI) or Person of Indian Origin (PIO)'],
                        ['Age', '21 to 60 years at loan maturity'],
                        ['Minimum income', 'Equivalent of Rs 40,000 to Rs 60,000 per month in foreign currency (country-specific)'],
                        ['India-based co-applicant', 'Required by most banks; must be a resident Indian with income'],
                        ['Employment', 'Minimum 2 years abroad with current employer; government or MNC employment preferred'],
                        ['Account requirement', 'Active NRE or NRO account with the lending bank'],
                        ['Interest rate premium', '0.5% to 1% higher than resident rates'],
                        ['Loan purpose', 'Must be for India-based expenses (medical, marriage, home renovation); cannot be remitted abroad'],
                      ].map(([c, r]) => (
                        <tr key={c}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{c}</td><td style={tdL}>{r}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={pS}>NRI loans are assessed on Indian income or a co-applicant's income, not foreign earnings. A resident Indian co-applicant with regular income typically unlocks better terms and faster approval.</p>
              </div>

              <div style={secS} id="excel-formula">
                <h2 style={h2S}>Personal Loan Eligibility Formula for Excel</h2>
                <p style={pS}>Use Excel's PV and PMT functions to replicate FOIR calculations. Enter income in A2, existing EMIs in B2, annual rate in C2, and tenure in years in D2.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11.5, color: C.ink3, textAlign: 'left', paddingTop: 6 }}>Excel formulas to calculate personal loan eligibility using FOIR method.</caption>
                    <thead><tr><th scope="col" style={thS}>Calculation</th><th scope="col" style={thS}>Excel Formula</th></tr></thead>
                    <tbody>
                      {[
                        ['Available EMI (50% FOIR)', '=A2*50%-B2'],
                        ['Eligible loan amount', '=PV(C2/12, D2*12, -(A2*50%-B2))'],
                        ['Monthly EMI for the loan', '=PMT(C2/12, D2*12, -E2)  where E2 = eligible loan from above'],
                        ['Total interest payable', '=PMT(C2/12, D2*12, -E2)*D2*12-E2'],
                        ['Salary multiplier (x income)', '=E2/A2'],
                      ].map(([calc, formula]) => (
                        <tr key={calc}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{calc}</td><td style={{ ...tdL, fontFamily: 'monospace', color: C.dark, background: '#f4f5f6' }}>{formula}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={pS}>The PV function computes the present value of equal payments (your EMI stream). Note the negative sign: Excel treats outgoing payments as negative. The result is the maximum loan the available EMI can support.</p>
              </div>

              <div style={secS} id="documents-required">
                <h2 style={h2S}>Documents Required for Personal Loan</h2>
                <p style={pS}>Document requirements vary by employment type. Pre-approved loans at HDFC, ICICI, and SBI may need zero documents for existing customers.</p>
                <div style={{ overflowX: 'auto', marginBottom: 12 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11.5, color: C.ink3, textAlign: 'left', paddingTop: 6 }}>Standard personal loan document requirements for salaried and self-employed applicants.</caption>
                    <thead><tr><th scope="col" style={thS}>Document Type</th><th scope="col" style={thS}>Salaried</th><th scope="col" style={thS}>Self-Employed</th></tr></thead>
                    <tbody>
                      {[
                        ['Identity proof', 'PAN card (mandatory) + Aadhaar / passport / voter ID', 'PAN card (mandatory) + Aadhaar / passport'],
                        ['Address proof', 'Aadhaar / utility bill / rental agreement / passport', 'Aadhaar / utility bill / business address proof'],
                        ['Income proof', 'Last 3 months salary slips', 'ITR for last 2 to 3 years (with computation)'],
                        ['Bank statement', 'Last 6 months showing salary credits', 'Last 6 months business + personal account statements'],
                        ['Employment proof', 'Offer letter / Form 16 / appointment letter', 'GST registration / trade license / CA certificate'],
                        ['Additional', 'Form 16 (for large loans)', 'CA-certified P&L statement, balance sheet'],
                      ].map(([type, sal, se]) => (
                        <tr key={type}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{type}</td><td style={tdL}>{sal}</td><td style={tdL}>{se}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={secS} id="improve-eligibility">
                <h2 style={h2S}>How to Increase Your Eligibility</h2>
                <p style={pS}>Three ways to boost your eligible loan: close existing loans, raise your CIBIL score, or add a co-applicant. Each has a measurable impact.</p>
                <ol style={{ paddingLeft: 24, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[
                    ['Close small existing loans first', 'Each Rs 5,000 EMI you eliminate adds approximately Rs 2.76 lakhs of personal loan eligibility at 11% for 5 years. A Rs 10,000 monthly car EMI that you pre-close frees up Rs 5.52 lakhs of headroom.'],
                    ['Raise your CIBIL score above 750', 'A CIBIL score of 750+ unlocks the best rate at every bank. Moving from 700 to 750 cuts your rate by 1 to 1.5 per cent. On a Rs 10 lakh loan for 5 years, that saves Rs 30,000 to Rs 42,000 in total interest.'],
                    ['Extend the tenure', 'Increasing tenure from 3 years to 5 years reduces monthly EMI by 20 to 25 per cent, allowing you to borrow more for the same EMI capacity. At Rs 15,000 available EMI at 11%, 3-year tenure supports Rs 4.44 lakhs; 5-year tenure supports Rs 6.90 lakhs.'],
                    ['Apply at your salary account bank', 'Banks apply preferential FOIR caps and rates for salary account holders. HDFC Bank, SBI, and ICICI Bank all offer better terms and faster processing to applicants whose salary is credited with them.'],
                    ['Add a co-applicant', 'A working spouse or parent as co-applicant combines both incomes for the FOIR calculation. A co-applicant earning Rs 30,000 with no obligations adds approximately Rs 6.90 lakhs to joint eligibility.'],
                  ].map(([title, text], i) => (
                    <li key={i} style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                      <strong style={{ color: C.ink }}>{title}.</strong> {text}
                    </li>
                  ))}
                </ol>
              </div>

              <p style={pS}>If you own a business, the <Link href="/calculators/business-loan-eligibility-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Business Loan Eligibility Calculator</Link> may unlock higher amounts with a different assessment framework than personal loans.</p>

              <div style={secS} id="how-to-use">
                <h2 style={h2S}>How to Use This Calculator</h2>
                <ul style={{ paddingLeft: 24, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Employment Type:</strong> Salaried or self-employed. For self-employed, enter average monthly net profit from your ITR.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>CIBIL Score:</strong> Select your score range. This adjusts rates and eligible amounts in real time.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>FOIR Cap:</strong> Default is 50%. Move to 40% for conservative or 55% if your bank confirmed a higher limit.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Bank Comparison:</strong> The sidebar shows eligible loan amounts at 9 banks at their base rates, adjusted for your CIBIL score.</li>
                </ul>
              </div>


              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All results are indicative estimates only and do not guarantee loan approval or any specific loan amount. Personal loan eligibility is subject to lender underwriting, CIBIL bureau assessment, employment verification, and other factors assessed by each bank. Interest rates, multipliers, and maximum loan amounts shown are indicative based on publicly available information as of June 2026 and are subject to change. This tool is for financial education and planning purposes only and does not constitute financial advice. Consult your bank or a SEBI-registered financial advisor before applying.
                </p>
              </div>
            </article>
          </div>

          {/* ════ SIDEBAR ════ */}
          <style>{`
            .ple-sidebar::-webkit-scrollbar { width: 5px; }
            .ple-sidebar::-webkit-scrollbar-track { background: transparent; }
            .ple-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .ple-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            className="ple-sidebar"
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
            {/* Bank Eligibility Comparison */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>Bank Eligibility Comparison</div>
                <div style={{ fontSize: 11.5, color: C.ink3, marginTop: 3 }}>Based on your FOIR capacity, CIBIL-adjusted</div>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, textAlign: 'left', padding: '8px 14px' }}>
                  Rates adjusted for CIBIL score. Subject to employer tier and underwriting.
                </caption>
                <thead>
                  <tr style={{ background: '#f4f5f6' }}>
                    {['Lender', 'Est. Rate', 'Max Loan'].map(h => (
                      <th key={h} scope="col" style={{ padding: '9px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: C.ink, textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {!isDeficit ? BANK_RATES.map((b, i) => {
                    const bankRate = b.baseRate + cibilPenalty + empPenalty;
                    const bLoan = Math.round(calcMaxLoanForEMI(availableEmi, bankRate, tenureMo));
                    const isLowest = bankRate <= (Math.min(...BANK_RATES.map(x => x.baseRate)) + cibilPenalty + empPenalty + 0.01);
                    return (
                      <tr key={b.name} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                        <td style={{ padding: '10px 14px', fontSize: 13, fontWeight: 600, color: C.ink }}>{b.name}</td>
                        <td style={{ padding: '10px 14px', fontSize: 12, color: C.ink2 }}>{bankRate.toFixed(2)}%</td>
                        <td style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: isLowest ? C.dark : C.ink }}>{fmtC(bLoan)}</td>
                      </tr>
                    );
                  }) : (
                    <tr><td colSpan={3} style={{ padding: '20px', textAlign: 'center', fontSize: 13, color: C.ink3 }}>No eligibility: existing EMIs exceed FOIR limit</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <nav aria-label="Related Calculators" style={{ flexShrink: 0 }}>
              <SidebarList title="Related Calculators" items={POPULAR} />
            </nav>
          </aside>
        </div>
      </div>

      {/* ════ FOOTER ════ */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/personal-loan-calculator|Personal Loan EMI', '/calculators/home-loan-calculator|Home Loan', '/calculators/emi-calculator|EMI', '/calculators/sip-calculator|SIP', '/calculators/fd-calculator|FD', '/calculators/gst-calculator|GST'] },
        { hd: 'Topics', links: ['/calculators/home-loan-eligibility-calculator|Home Loan Eligibility', '/calculators/business-loan-eligibility-calculator|Business Loan Eligibility', '/calculators/in-hand-salary-calculator|Salary', '/calculators/income-tax-calculator|Income Tax'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

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
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { FAQBox } from '@/components/common/FAQBox';

const C = {
  dark:      '#101214',
  lime:      '#a6dbc4',
  lime2:     '#2d9970',
  paleLime:  '#f4f5f6',
  ink:       '#16140F',
  ink2:      '#50565c',
  ink3:      '#7a8087',
  white:     '#ffffff',
  bg:        '#f6f7f8',
  border:    '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

/* ── Core math ─────────────────────────────────────────── */
function calcEMI(p: number, annualRate: number, months: number): number {
  if (months <= 0) return 0;
  if (annualRate === 0) return p / months;
  const r = annualRate / 12 / 100;
  return (p * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

interface MonthRow { month: number; principal: number; interest: number; closingBal: number; }

function buildMonthlyRows(p: number, annualRate: number, maxMonths: number, emi: number, extra: number): MonthRow[] {
  const rows: MonthRow[] = [];
  let balance = p;
  const r = annualRate / 12 / 100;
  let m = 0;
  while (balance > 1 && m < maxMonths) {
    const intPart = balance * r;
    const prinPart = Math.min(emi - intPart + extra, balance);
    balance = Math.max(0, balance - prinPart);
    m++;
    rows.push({ month: m, principal: prinPart, interest: intPart, closingBal: balance });
  }
  return rows;
}

interface YearRow { year: number; principal: number; interest: number; closingBal: number; }

function buildYearlyRows(monthly: MonthRow[]): YearRow[] {
  const rows: YearRow[] = [];
  for (let i = 0; i < monthly.length; i += 12) {
    const slice = monthly.slice(i, i + 12);
    rows.push({
      year: rows.length + 1,
      principal: slice.reduce((s, r) => s + r.principal, 0),
      interest: slice.reduce((s, r) => s + r.interest, 0),
      closingBal: slice[slice.length - 1].closingBal,
    });
  }
  return rows;
}

/* ── Charts ────────────────────────────────────────────── */
function DonutChart({ principal, interest }: { principal: number; interest: number }) {
  const total = principal + interest;
  if (total <= 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const pArc = (principal / total) * circ;
  const pPct = Math.round((principal / total) * 100);
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

function BarChart({ rows }: { rows: YearRow[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxAnnual = Math.max(...rows.map(r => r.principal + r.interest));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;
  return (
    <svg role="img" aria-label="Yearly principal and interest breakdown bar chart"
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

/* ── Slider ────────────────────────────────────────────── */
function Slider({ label, id, value, min, max, step, display, onChange, compact }: {
  label: string; id?: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (v: number) => void; compact?: boolean;
}) {
  const inputId = id || label.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'slider';
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
    <div style={{ marginBottom: compact ? 18 : 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 8 : 14 }}>
        <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400 }}>{label}</label>
        {editing ? (
          <input id={inputId} autoFocus value={raw} aria-label={`Enter ${label} value`}
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

/* ── Sidebar ───────────────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
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
    </nav>
  );
}

const POPULAR = [
  { href: '/calculators/loan-eligibility-calculator',    label: 'Loan Eligibility Calculator' },
  { href: '/calculators/loan-prepayment-calculator',      label: 'Loan Prepayment Calculator' },
  { href: '/calculators/debt-to-income-ratio-calculator', label: 'Debt-to-Income Ratio Calculator' },
  { href: '/calculators/personal-loan-calculator',        label: 'Personal Loan EMI Calculator' },
  { href: '/calculators/home-loan-calculator',            label: 'Home Loan Calculator' },
  { href: '/calculators/car-loan-calculator',             label: 'Car Loan EMI Calculator' },
  { href: '/calculators/credit-card-emi-calculator',      label: 'Credit Card EMI Calculator' },
];
const MORE = [
  { href: '/calculators/education-loan-emi-calculator',      label: 'Education Loan EMI Calculator' },
  { href: '/calculators/gold-loan-calculator',                label: 'Gold Loan Calculator' },
  { href: '/calculators/loan-against-property-calculator',    label: 'Loan Against Property Calculator' },
  { href: '/calculators/business-loan-eligibility-calculator',label: 'Business Loan Eligibility Calculator' },
  { href: '/calculators/loan-balance-transfer-calculator',    label: 'Loan Balance Transfer Calculator' },
];

/* ── FAQ (single source of truth, mirrors FAQPage schema in page.tsx) ── */
const FAQS = [
  { q: 'How is loan EMI calculated?', a: 'Loan EMI is calculated using the reducing-balance formula: EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]. P is the principal loan amount, R is the monthly interest rate (annual rate divided by 12 divided by 100), and N is the number of monthly instalments. The EMI stays fixed for the entire tenure, but the split between principal and interest changes every month as the outstanding balance falls.' },
  { q: 'What is the difference between a flat rate and a reducing balance rate?', a: 'In the flat rate method, interest is charged on the full original principal for the entire tenure, which makes the real cost of the loan much higher than the quoted rate suggests. In the reducing balance method, interest is charged only on the outstanding principal, which falls every month. Every bank and NBFC in India uses the reducing balance method for EMI-based personal, home, and car loans.' },
  { q: 'Does prepayment actually save interest on a loan?', a: 'Yes. Prepayment reduces your outstanding principal immediately, which cuts the interest charged on every EMI after that point. On a floating-rate loan, RBI rules bar lenders from charging a prepayment penalty. On a fixed-rate personal loan, lenders can still charge a penalty of roughly 2 to 5 percent of the prepaid amount, so check your loan agreement before prepaying.' },
  { q: 'What is a loan moratorium and how does it affect my EMI?', a: 'A moratorium is an agreed period during which you do not pay any EMI, usually granted during construction of a property or the study period of an education loan. Interest still accrues during this window and gets added to your principal, so your EMI after the moratorium ends is higher than if repayment had started immediately. Use the advanced settings in this calculator to see the exact EMI increase for your loan.' },
  { q: 'What happens if I miss an EMI payment?', a: 'Missing an EMI attracts a late payment fee, a penal charge on the overdue amount, and a negative mark on your credit report that most lenders can see within 30 to 45 days. If EMIs are missed for 90 days in a row, the loan is classified as a Non-Performing Asset and the lender can start legal recovery. Setting up auto-debit from your salary account is the simplest way to avoid this.' },
  { q: 'Can I change my loan tenure after taking the loan?', a: 'Most lenders allow tenure changes through a loan restructuring request. Extending the tenure lowers your EMI but raises total interest paid. Shortening the tenure raises your EMI but cuts total interest. Some lenders charge a nominal restructuring fee, and a tenure change usually triggers a fresh credit check.' },
  { q: 'What credit score do I need for a loan?', a: 'A CIBIL score of 750 or above gets you the best rates from nearly every lender in India. Scores between 700 and 749 usually still get approved, but at a higher interest rate. Below 700, approval becomes difficult with banks and you may need to look at NBFCs, which charge more. Paying every EMI on time is the single biggest factor in keeping your score above 750.' },
  { q: 'How much loan can I get based on my salary?', a: 'Most Indian lenders use FOIR, the Fixed Obligation to Income Ratio, and cap all your EMIs combined at 40 to 50 percent of gross monthly income. On a salary of Rs 80,000 with no existing EMIs, a lender working with a 40 percent FOIR would allow a total EMI of up to Rs 32,000. The exact figure depends on your income, existing loans, interest rate, and tenure, which the loan eligibility calculator checks directly.' },
  { q: 'What is a top-up loan?', a: 'A top-up loan is additional credit sanctioned over an existing loan, usually a home loan, once you have built up repayment history and the property value has appreciated. Because it rides on an existing secured loan, the interest rate on a top-up is typically lower than a fresh personal loan, and disbursal is faster since the lender already has your documents on file.' },
  { q: 'What documents are needed for a loan application?', a: 'Salaried applicants typically need PAN, Aadhaar, the last three months of salary slips, six months of bank statements, and Form 16. Self-employed applicants need two to three years of ITR filings, profit and loss statements, and business bank statements. Secured loans such as home or car loans additionally need property or vehicle documents.' },
  { q: 'How does loan processing fee affect the total cost?', a: 'Processing fee is a one-time charge, usually 0.5 to 2.5 percent of the loan amount, deducted upfront or added to the loan. It does not change your EMI but it does raise the effective cost of borrowing. This calculator adds processing fee to the total amount payable so you see the real cost of the loan, not just the EMI and interest.' },
  { q: 'What is the maximum loan tenure for a personal loan?', a: 'Personal loan tenure in India typically ranges from 12 to 60 months, with a handful of lenders going up to 84 months. Home loans go up to 30 years and car loans up to 7 years. A longer tenure lowers the EMI but increases total interest paid, so tenure should be chosen based on what EMI fits your monthly budget, not the lowest number on offer.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India that combines calculator tools and an eligibility engine to help people move from a financial question to a decision they can act on. The calculators, including this loan calculator, are free to use and show you exactly what a loan will cost before you apply. A free account lets you save your calculations.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ── CA CTA (exact canonical block) ───────────────────────*/

/* ── Promo bar ─────────────────────────────────────────── */
function PromoBar({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>{title}</p>
        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>{desc}</p>
      </div>
      <Link className="fx-btn" href={href} target="_blank" rel="noopener noreferrer"
        style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
        Open calculator
      </Link>
    </div>
  );
}

/* ── Article table styles (shared, per calculator standards) ── */
const thS: React.CSSProperties = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap', verticalAlign: 'middle' };
const tdL: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'middle', textAlign: 'left' };
const tdR: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'middle', textAlign: 'right' };

const TENURE_PRESETS = [
  { m: 12,  label: '1Y' }, { m: 36,  label: '3Y' }, { m: 60,  label: '5Y' },
  { m: 120, label: '10Y' }, { m: 180, label: '15Y' }, { m: 240, label: '20Y' }, { m: 360, label: '30Y' },
];

interface Settings {
  amount: number; rate: number; months: number; processingFeePct: number;
  extraMonthly: number; moratoriumMonths: number;
}

export default function LoanCalculatorClient() {
  const defaultSettings: Settings = { amount: 500000, rate: 11, months: 60, processingFeePct: 1.5, extraMonthly: 0, moratoriumMonths: 0 };
  const { settings, updateSettings } = useCalculatorSettings<Settings>('loan-calculator', defaultSettings);
  const { amount, rate, months, processingFeePct, extraMonthly, moratoriumMonths } = settings;

  const setAmount = (v: number) => updateSettings({ amount: v });
  const setRate = (v: number) => updateSettings({ rate: v });
  const setMonths = (v: number) => updateSettings({ months: v, moratoriumMonths: Math.min(moratoriumMonths, Math.max(0, v - 1)) });
  const setFee = (v: number) => updateSettings({ processingFeePct: v });
  const setExtra = (v: number) => updateSettings({ extraMonthly: v });
  const setMoratorium = (v: number) => updateSettings({ moratoriumMonths: v });

  const [mobile, setMobile] = useState(false);
  const [tenureUnit, setTenureUnit] = useState<'yr' | 'mo'>('yr');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showAmort, setShowAmort] = useState(false);

  const { formatCurrency, convertCurrency, selectedCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const results = useMemo(() => {
    const r = rate / 12 / 100;
    const moratorium = Math.min(moratoriumMonths, Math.max(0, months - 1));
    const repaymentMonths = Math.max(1, months - moratorium);
    const effectivePrincipal = moratorium > 0 ? amount * Math.pow(1 + r, moratorium) : amount;
    const capitalizedInterest = effectivePrincipal - amount;
    const emi = calcEMI(effectivePrincipal, rate, repaymentMonths);

    const monthlyRows = buildMonthlyRows(effectivePrincipal, rate, repaymentMonths, emi, extraMonthly);
    const yearRows = buildYearlyRows(monthlyRows);

    const totalInterest = monthlyRows.reduce((s, row) => s + row.interest, 0);
    const totalPrincipalPaid = monthlyRows.reduce((s, row) => s + row.principal, 0);
    const totalPay = totalInterest + totalPrincipalPaid;
    const processingFee = amount * (processingFeePct / 100);
    const totalCost = totalPay + processingFee;
    const actualMonths = monthlyRows.length;

    let interestSaved = 0, monthsSaved = 0;
    if (extraMonthly > 0) {
      const baseline = buildMonthlyRows(effectivePrincipal, rate, repaymentMonths, emi, 0);
      const baselineInterest = baseline.reduce((s, row) => s + row.interest, 0);
      interestSaved = Math.max(0, baselineInterest - totalInterest);
      monthsSaved = Math.max(0, baseline.length - actualMonths);
    }

    const prinPct = totalPay > 0 ? Math.round((amount / (amount + totalInterest)) * 100) : 100;

    return { emi, repaymentMonths, effectivePrincipal, capitalizedInterest, monthlyRows, yearRows, totalInterest, totalPay, processingFee, totalCost, actualMonths, interestSaved, monthsSaved, prinPct };
  }, [amount, rate, months, processingFeePct, extraMonthly, moratoriumMonths]);

  const { emi, capitalizedInterest, yearRows, totalInterest, processingFee, totalCost, actualMonths, interestSaved, monthsSaved, prinPct } = results;
  const intPct = 100 - prinPct;

  const fmtTenure = (v: number) => tenureUnit === 'yr' ? `${(v / 12).toFixed(1)} yr` : `${v} mo`;
  const maxMoratorium = Math.min(60, Math.max(0, months - 1));

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>Loan Calculator</h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate EMI, total interest, processing fee, prepayment savings, and moratorium impact for any personal, home, car, or education loan in India.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          <div style={{ minWidth: 0 }}>

            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* ── Input panel ── */}
                <div style={{ padding: mobile ? '16px 18px' : '44px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
                      {showAdvanced ? 'Advanced Settings' : 'Loan Details'}
                    </p>
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider label="Loan Amount" value={amount} min={10000} max={50000000} step={10000}
                        display={fmtC(amount)} onChange={setAmount} compact={mobile} />

                      <Slider label="Rate of Interest (p.a.)" value={rate} min={1} max={36} step={0.05}
                        display={`${rate.toFixed(2)}%`} onChange={setRate} compact={mobile} />

                      <div style={{ marginBottom: mobile ? 10 : 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: mobile ? 8 : 14 }}>
                          <label htmlFor="loan-tenure-range" style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400 }}>Loan Tenure</label>
                          <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                            {(['yr', 'mo'] as const).map(u => (
                              <button key={u} onClick={() => setTenureUnit(u)}
                                style={{ padding: '5px 12px', border: 'none', background: tenureUnit === u ? C.white : 'transparent',
                                  color: tenureUnit === u ? C.ink : C.ink3, fontWeight: tenureUnit === u ? 600 : 400,
                                  cursor: 'pointer', fontFamily: INTER, fontSize: 12.5, transition: 'all 0.15s' }}>
                                {u === 'yr' ? 'Years' : 'Months'}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Slider label="" id="loan-tenure" value={months} min={1} max={360} step={1}
                        display={fmtTenure(months)} onChange={setMonths} compact={mobile} />

                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: -18, marginBottom: mobile ? 18 : 32 }}>
                        {TENURE_PRESETS.map(p => (
                          <button key={p.m} onClick={() => setMonths(p.m)}
                            style={{ padding: '4px 10px', fontSize: 12, background: C.white,
                              color: months === p.m ? C.ink : C.ink3,
                              border: `${months === p.m ? 1.5 : 1}px solid ${months === p.m ? C.ink : C.border}`,
                              fontWeight: months === p.m ? 700 : 500, borderRadius: 6, cursor: 'pointer',
                              fontFamily: INTER, transition: 'all 0.15s' }}>
                            {p.label}
                          </button>
                        ))}
                      </div>

                      <Slider label="Processing Fee" value={processingFeePct} min={0} max={5} step={0.1}
                        display={`${processingFeePct.toFixed(1)}%`} onChange={setFee} compact={mobile} />

                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button onClick={() => setShowAdvanced(true)}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: C.ink2, fontSize: 13, fontWeight: 600, fontFamily: INTER, padding: '6px 0' }}>
                          More settings
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Slider label="Extra Monthly Payment (Prepayment)" value={extraMonthly} min={0} max={100000} step={500}
                        display={fmtC(extraMonthly)} onChange={setExtra} compact={mobile} />

                      <Slider label="Moratorium Period (Months)" value={Math.min(moratoriumMonths, maxMoratorium)} min={0} max={Math.max(1, maxMoratorium)} step={1}
                        display={`${Math.min(moratoriumMonths, maxMoratorium)} mo`} onChange={setMoratorium} compact={mobile} />

                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 16px', marginBottom: mobile ? 16 : 24, fontSize: 13, color: C.ink2, lineHeight: 1.6 }}>
                        An extra monthly payment shortens your tenure and cuts total interest. A moratorium delays your first EMI but adds accrued interest to your principal, so the EMI that follows is higher than it would be without the moratorium.
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <button onClick={() => setShowAdvanced(false)}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: C.ink2, fontSize: 13, fontWeight: 600, fontFamily: INTER, padding: '6px 0' }}>
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 6 9 12 15 18" /></svg>
                          Back
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* ── Output panel ── */}
                <div style={{ padding: mobile ? '16px 18px' : '44px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: mobile ? '16px 18px' : '20px 24px', marginBottom: 8 }}>
                    <span style={{ display: 'block', fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C', marginBottom: 4 }}>Monthly EMI</span>
                    <span aria-live="polite" aria-label={`Monthly EMI: ${fmtIN(emi)}`}
                      style={{ display: 'block', fontSize: mobile ? 24 : 30, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>{fmtIN(emi)}</span>
                    {moratoriumMonths > 0 && (
                      <span style={{ display: 'block', fontSize: 11.5, color: '#7A8087', marginTop: 6 }}>
                        Starts after a {Math.min(moratoriumMonths, maxMoratorium)}-month moratorium
                      </span>
                    )}
                  </div>

                  {[
                    { label: 'Principal amount', value: fmtC(amount) },
                    { label: 'Processing fee', value: fmtC(processingFee) },
                    { label: 'Total interest', value: fmtC(totalInterest) },
                    { label: 'Total amount payable', value: fmtC(totalCost) },
                    ...(capitalizedInterest > 1 ? [{ label: 'Interest added during moratorium', value: fmtC(capitalizedInterest) }] : []),
                    ...(extraMonthly > 0 ? [
                      { label: 'Interest saved by prepayment', value: fmtC(interestSaved) },
                      { label: 'Tenure shortened by', value: `${monthsSaved} mo` },
                    ] : []),
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 24, order: mobile ? 1 : -1 }}>
                    <DonutChart principal={amount} interest={totalInterest} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 22, marginBottom: mobile ? 8 : 28, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Principal amount</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Interest amount</span>
                    </div>
                  </div>

                  <div style={{ width: '100%', marginTop: mobile ? 8 : 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Principal {prinPct}%</span>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Interest {intPct}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${prinPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Amortization toggle ── */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowAmort(v => !v)} aria-expanded={showAmort} aria-controls="amort-panel"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.ink }}>Amortization Schedule</span>
                    {!mobile && <span style={{ fontSize: 13, color: C.ink3, marginLeft: 10 }}>Year-by-year breakdown</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 8 : 12, flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.dark, background: C.paleLime, border: `1px solid ${C.lime2}`, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {yearRows.length} yr · {actualMonths} mo
                    </span>
                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      style={{ transform: showAmort ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {showAmort && (
                  <div id="amort-panel" style={{ borderTop: `1px solid ${C.border}` }}>
                    <div style={{ padding: mobile ? '16px 16px 8px' : '24px 44px 12px' }}>
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
                        <BarChart rows={yearRows} />
                      </div>
                    </div>
                    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                      {mobile && <p style={{ padding: '0 16px 8px', fontSize: 11, color: C.ink3, margin: 0 }}>Swipe to see full table</p>}
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 480 }}>
                        <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 24px', textAlign: 'left' }}>
                          Year-by-year loan repayment schedule. All values in {selectedCurrency?.code || 'INR'}.
                        </caption>
                        <thead>
                          <tr>
                            {['Year', 'Principal Paid', 'Interest Paid', 'Closing Balance'].map(h => (
                              <th key={h} scope="col" style={h === 'Year' ? thS : { ...thS, textAlign: 'right' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {yearRows.map((row, i) => (
                            <tr key={row.year} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                              <td style={{ ...tdL, fontWeight: 700, color: C.dark }}>Year {row.year}</td>
                              <td style={{ ...tdR, color: '#166534', fontWeight: 600 }}>{fmtIN(row.principal)}</td>
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

            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>


            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>
              {(() => {
                const h2 = { fontSize: mobile ? 18 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
                const h3 = { fontSize: 16, fontWeight: 600, color: C.ink, margin: '0 0 6px' } as React.CSSProperties;
                const p = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
                const sec = { margin: '0 0 40px' } as React.CSSProperties;
                const bullet = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 } as React.CSSProperties;
                const linkS = { color: C.dark, fontWeight: 600 } as React.CSSProperties;
                return (
                  <>
                    <div style={sec}>
                      <h2 id="what-is-a-loan" style={h2}>What Is a Loan?</h2>
                      <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                        <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                          A loan is a sum of money borrowed from a bank or NBFC that you repay with interest over a fixed tenure, usually through equal monthly instalments (EMI).
                        </p>
                      </div>
                      <p style={p}>
                        Personal loans, home loans, car loans, education loans, and loans against property are the common credit products in India. Each carries a different interest rate range, tenure, and eligibility bar set by the lender.
                      </p>
                      <p style={p}>
                        Personal loans are unsecured, so no collateral is required and the lender relies entirely on your credit score, income, and repayment history. That is why personal loan rates run higher than secured loans such as a home or car loan.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 id="how-it-helps" style={h2}>How This Loan Calculator Helps You</h2>
                      <p style={p}>This calculator gives you the full financial picture of a loan before you sign for it, not just a single EMI number.</p>
                      <div>
                        {[
                          'Get an accurate EMI, including processing fee, so you know the true monthly cost before you apply.',
                          'Model an extra monthly payment to see the exact interest you save and the months you cut off your tenure.',
                          'Model a moratorium period to see how much your EMI rises once repayment actually starts.',
                          'View a year-by-year amortization schedule that shows exactly how your outstanding balance falls over time.',
                        ].map((t, i) => (
                          <div key={i} style={bullet}>
                            <span style={{ flexShrink: 0, marginTop: 3 }}>&#8226;</span>
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={sec}>
                      <h2 id="emi-formula" style={h2}>Loan EMI Formula</h2>
                      <p style={p}>Every EMI-based loan in India uses the same reducing-balance formula, regardless of lender or loan type.</p>
                      <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, fontFamily: 'monospace', margin: '0 0 16px', padding: '12px 0' }}>
                        EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
                      </p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 420 }}>
                          <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>Variables used in the EMI formula.</caption>
                          <thead><tr><th scope="col" style={thS}>Symbol</th><th scope="col" style={thS}>Meaning</th></tr></thead>
                          <tbody>
                            <tr><td style={tdL}>P</td><td style={tdL}>Principal loan amount</td></tr>
                            <tr><td style={tdL}>R</td><td style={tdL}>Monthly interest rate (annual rate divided by 12 divided by 100)</td></tr>
                            <tr><td style={tdL}>N</td><td style={tdL}>Number of monthly instalments (tenure in months)</td></tr>
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>
                        On a Rs 5,00,000 loan at 11% for 60 months, the formula gives an EMI of about Rs 10,873, with total interest of roughly Rs 1,52,380 over the full tenure. Change any input in the calculator above to see the same formula applied to your own numbers.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 id="emi-excel" style={h2}>Loan EMI Formula in Excel</h2>
                      <p style={p}>Excel has a built-in PMT function that calculates EMI in one step, without writing out the full reducing-balance formula.</p>
                      <div style={{ overflowX: 'auto', marginBottom: 8 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 480 }}>
                          <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>Three ways to calculate EMI in Excel or Google Sheets.</caption>
                          <thead>
                            <tr>
                              <th scope="col" style={thS}>Method</th>
                              <th scope="col" style={thS}>Formula</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' }}>Result (5L, 11%, 60mo)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr><td style={tdL}>PMT function</td><td style={tdL}>=PMT(11%/12, 60, -500000)</td><td style={tdR}>{fmtIN(calcEMI(500000, 11, 60))}</td></tr>
                            <tr><td style={tdL}>Manual formula</td><td style={tdL}>=(P*R*(1+R)^N)/((1+R)^N-1)</td><td style={tdR}>{fmtIN(calcEMI(500000, 11, 60))}</td></tr>
                            <tr><td style={tdL}>RATE-based check</td><td style={tdL}>=RATE(60, -EMI, 500000)*12</td><td style={tdR}>11.00%</td></tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div style={sec}>
                      <h2 id="reverse-loan-calculator" style={h2}>Reverse Loan Calculator: Find Loan Amount From EMI</h2>
                      <p style={p}>
                        If you already know the EMI you can afford, you can work backward to the maximum loan amount using the same formula rearranged for P.
                      </p>
                      <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, fontFamily: 'monospace', margin: '0 0 16px', padding: '12px 0' }}>
                        P = EMI x [(1+R)^N - 1] / [R x (1+R)^N]
                      </p>
                      <p style={p}>
                        For example, if you can comfortably pay Rs 15,000 a month at 11% for 60 months, you can borrow roughly Rs 6.9 lakh. Use the{' '}
                        <Link href="/calculators/loan-eligibility-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Loan Eligibility Calculator</Link>{' '}
                        to check this against your actual income and existing EMIs.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 id="flat-vs-reducing" style={h2}>Flat Rate vs Reducing Balance Interest</h2>
                      <p style={p}>A flat rate loan charges interest on the full original principal for the entire tenure, while a reducing balance loan charges interest only on what you still owe.</p>
                      <div style={{ overflowX: 'auto', marginBottom: 8 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 420 }}>
                          <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>Same loan, two interest methods, on Rs 5,00,000 at a quoted 11% for 5 years.</caption>
                          <thead><tr><th scope="col" style={thS}>Method</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>Effective Rate</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>Total Interest</th></tr></thead>
                          <tbody>
                            <tr><td style={tdL}>Flat rate</td><td style={tdR}>~20.4% effective</td><td style={tdR}>{fmtIN(275000)}</td></tr>
                            <tr><td style={tdL}>Reducing balance</td><td style={tdR}>11.0% effective</td><td style={tdR}>{fmtIN(calcEMI(500000, 11, 60) * 60 - 500000)}</td></tr>
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>Always ask a lender whether a quoted rate is flat or reducing balance. A flat rate that sounds lower than a competitor's reducing balance rate can end up costing more in total interest.</p>
                    </div>

                    <div style={sec}>
                      <h2 id="types-of-loans" style={h2}>Types of Loan EMI Calculators in India</h2>
                      <p style={p}>Each loan type has its own eligibility rules and typical rate range, so it helps to use a calculator built for that specific loan once you know which one you need.</p>
                      <h3 style={h3}>Home Loan EMI</h3>
                      <p style={p}>
                        Home loans carry the lowest rates of any retail loan since the property is collateral, and tenure can run up to 30 years. Use the{' '}
                        <Link href="/calculators/home-loan-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Home Loan Calculator</Link>{' '}
                        for property-specific inputs like down payment.
                      </p>
                      <h3 style={h3}>Car Loan EMI</h3>
                      <p style={p}>
                        Car loans are secured against the vehicle, with tenures of 1 to 7 years. Try the{' '}
                        <Link href="/calculators/car-loan-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Car Loan EMI Calculator</Link>{' '}
                        for a vehicle-specific breakdown.
                      </p>
                      <h3 style={h3}>Personal Loan EMI</h3>
                      <p style={p}>
                        Personal loans are unsecured and carry the highest rates of the three, typically 10% to 24% depending on credit score. The{' '}
                        <Link href="/calculators/personal-loan-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Personal Loan EMI Calculator</Link>{' '}
                        adds income-based eligibility checks.
                      </p>
                      <h3 style={h3}>Education Loan EMI</h3>
                      <p style={p}>
                        Education loans almost always include a moratorium covering the course duration plus 6 to 12 months. The{' '}
                        <Link href="/calculators/education-loan-emi-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Education Loan EMI Calculator</Link>{' '}
                        is built specifically around that moratorium structure.
                      </p>
                    </div>

                    <PromoBar href="/calculators/loan-eligibility-calculator" title="Loan Eligibility Calculator"
                      desc="Check exactly how much loan you qualify for based on income, FOIR, and existing EMIs." />

                    <div style={sec}>
                      <h2 id="amortization-schedule" style={h2}>Loan Repayment Schedule and Amortization</h2>
                      <p style={p}>
                        An amortization schedule shows how each EMI splits between principal and interest across the life of the loan. In the early years, most of your EMI goes toward interest because the outstanding balance is at its highest.
                      </p>
                      <p style={p}>
                        On a 60-month loan at 11%, roughly 46% of the first EMI is interest, and that share falls to under 10% by the final year. The amortization panel above the calculator card shows this exact breakdown for your own inputs, with a bar chart and a year-by-year table.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 id="prepayment-foreclosure" style={h2}>Loan Prepayment and Foreclosure: How Much You Can Save</h2>
                      <p style={p}>
                        Prepayment means paying more than your scheduled EMI to reduce the outstanding principal faster, and it directly cuts the total interest you pay. Open More settings above and add an extra monthly payment to see your exact interest saved and tenure reduction.
                      </p>
                      <p style={p}>
                        Under RBI rules, banks and NBFCs cannot charge a prepayment penalty on floating-rate loans taken by individual borrowers. This applies to home loans, car loans, and most personal loans, though some fixed-rate personal loans still carry a 2 to 5 percent charge on the prepaid amount.
                      </p>
                      <p style={p}>
                        Foreclosure means paying off the entire remaining balance in one go rather than an extra monthly amount. The{' '}
                        <Link href="/calculators/loan-prepayment-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Loan Prepayment Calculator</Link>{' '}
                        handles both a lump-sum foreclosure and a recurring extra payment in one view.
                      </p>
                    </div>

                    <PromoBar href="/calculators/loan-prepayment-calculator" title="Loan Prepayment Calculator"
                      desc="Compare a lump-sum foreclosure against a recurring extra EMI to see which saves you more." />

                    <div style={sec}>
                      <h2 id="moratorium" style={h2}>What Is a Loan Moratorium and How EMI Changes After It</h2>
                      <p style={p}>
                        A loan moratorium is an agreed window, usually 6 to 24 months, during which you make no EMI payments at all. It is standard on education loans for the course duration and common on under-construction home loans until possession.
                      </p>
                      <p style={p}>
                        Interest keeps accruing during the moratorium and is added to your principal once it ends, so the loan you actually start repaying is larger than the amount you borrowed. Open More settings above and set a moratorium period to see the exact capitalized interest and the higher post-moratorium EMI for your loan.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 id="factors-affecting-emi" style={h2}>Factors That Affect Your Loan EMI</h2>
                      <p style={p}>Four variables determine your EMI, and understanding each one helps you negotiate a better deal.</p>
                      <h3 style={h3}>Loan Amount</h3>
                      <p style={p}>A higher principal means a higher EMI in direct proportion. A larger down payment on a home or car loan reduces the principal and lowers your EMI immediately.</p>
                      <h3 style={h3}>Interest Rate</h3>
                      <p style={p}>Personal loan rates in India range from about 10% to 24% a year, depending on the lender and your credit score. Even a 1 percentage point difference in rate changes total interest by thousands on a multi-year loan.</p>
                      <h3 style={h3}>Loan Tenure</h3>
                      <p style={p}>A longer tenure reduces your monthly EMI but raises total interest paid over the life of the loan. A shorter tenure means a higher EMI but a lower overall cost, so the right tenure balances monthly affordability against total cost.</p>
                      <h3 style={h3}>Income and FOIR</h3>
                      <p style={p}>
                        Lenders cap your total EMI obligations, existing plus new, at 40 to 50 percent of gross monthly income under the FOIR rule. Run the{' '}
                        <Link href="/calculators/debt-to-income-ratio-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Debt-to-Income Ratio Calculator</Link>{' '}
                        to check where you stand before applying.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 id="credit-score" style={h2}>What Is a Good Credit Score for Loan Approval?</h2>
                      <p style={p}>A CIBIL score of 750 or above is the benchmark most Indian lenders use to offer their lowest advertised rate.</p>
                      <div style={{ overflowX: 'auto', marginBottom: 8 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 420 }}>
                          <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>CIBIL score ranges and typical loan outcomes.</caption>
                          <thead><tr><th scope="col" style={thS}>CIBIL Score</th><th scope="col" style={thS}>Typical Outcome</th></tr></thead>
                          <tbody>
                            <tr><td style={tdL}>750 and above</td><td style={tdL}>Best available rate, fastest approval</td></tr>
                            <tr><td style={tdL}>700 to 749</td><td style={tdL}>Approval likely, at a rate premium</td></tr>
                            <tr><td style={tdL}>650 to 699</td><td style={tdL}>Approval possible mainly through NBFCs, higher rate</td></tr>
                            <tr><td style={tdL}>Below 650</td><td style={tdL}>Approval difficult with most lenders</td></tr>
                          </tbody>
                        </table>
                      </div>
                    </div>


                    <div style={sec}>
                      <h2 id="how-to-use" style={h2}>How to Use This Loan Calculator</h2>
                      <p style={p}>Getting an accurate EMI takes four inputs and about ten seconds.</p>
                      <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Loan Amount:</strong> set the principal you plan to borrow.</li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Rate of Interest:</strong> enter the annual rate quoted by your lender.</li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Loan Tenure:</strong> choose your repayment period in months or years.</li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Processing Fee:</strong> add the lender's upfront fee to see the real total cost.</li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>More settings:</strong> open this to model a prepayment or a moratorium period.</li>
                      </ol>
                    </div>

                    <div style={sec}>
                      <h2 id="faqs" style={h2}>Frequently Asked Questions</h2>
                      <FAQ />
                    </div>

                    <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                        <strong>Disclaimer:</strong> All calculations on this page are indicative only and based on the reducing-balance EMI method used by Indian lenders. Actual EMI, interest rate, and processing fee depend on your lender's underwriting policy and your credit profile. This calculator is for educational and planning purposes only and does not constitute financial advice. Consult your bank, NBFC, or a qualified financial adviser before taking a loan.
                      </p>
                    </div>
                  </>
                );
              })()}
            </article>
          </div>

          <style>{`.loan-sidebar::-webkit-scrollbar{width:5px}.loan-sidebar::-webkit-scrollbar-track{background:transparent}.loan-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.loan-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="loan-sidebar" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <SidebarList title="Popular Calculators" items={POPULAR} />
              <SidebarList title="More Loan Calculators" items={MORE} />
            </div>
          </aside>

        </div>
      </div>

      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/percentage-calculator|%', '/calculators/gst-calculator|GST', '/calculators/loan-calculator|Loan', '/calculators/sip-calculator|SIP', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/swp-calculator|SWP', '/calculators/emi-calculator|EMI', '/calculators/home-loan-calculator|Home Loan', '/calculators/mortgage-calculator|Mortgage', '/calculators/car-loan-calculator|Car Loan', '/calculators/fd-calculator|FD', '/calculators/compound-interest-calculator|Compound Int.', '/calculators/gratuity-calculator|Gratuity'] },
        { hd: 'Topics', links: ['/#|Mutual Funds', '/#|Home Loans', '/#|Fixed Deposits', '/#|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

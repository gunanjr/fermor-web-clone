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

function calcMaxLoan(grossMonthly: number, existingEMI: number, annualRate: number, months: number): number {
  const maxEMI = grossMonthly * 0.5 - existingEMI;
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
    <svg role="img" aria-label="Annual principal and interest breakdown"
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
        ) : <span />}
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

/* ── FAQ ───────────────────────────────────────────────── */
const FAQS = [
  { q: 'How is home loan EMI calculated?', a: 'Home loan EMI is calculated using the reducing-balance formula: EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]. P is the loan principal (property price minus down payment), R is the monthly interest rate (annual rate divided by 12 divided by 100), and N is the tenure in months. All banks in India use this method. The EMI stays fixed throughout, but the interest portion reduces each month as the balance falls.' },
  { q: 'What is the EMI for a 30 lakh home loan?', a: 'For a Rs 30 lakh home loan at 8.5% p.a. for 20 years, the EMI is approximately Rs 26,034 per month. At the current SBI rate of 8.25%, the EMI is approximately Rs 25,566 per month. Over 20 years at 8.5%, you pay approximately Rs 32.5 lakh as total interest on the Rs 30 lakh principal.' },
  { q: 'What is the EMI for a 50 lakh home loan?', a: 'For a Rs 50 lakh home loan at 8.5% p.a. for 20 years, the EMI is approximately Rs 43,391 per month. Over 20 years, total interest paid is approximately Rs 54 lakh, making the total repayment Rs 1.04 crore.' },
  { q: 'How much home loan can I get on Rs 50,000 monthly salary?', a: 'On a Rs 50,000 monthly salary with no existing EMIs, most banks will approve a home loan of approximately Rs 25 to 29 lakh. Banks cap total EMI at 50% of gross income (FOIR = Rs 25,000). At 8.5% for 20 years, Rs 25,000 monthly EMI supports a loan of approximately Rs 28.8 lakh.' },
  { q: 'How much home loan can I get on Rs 1 lakh monthly salary?', a: 'On a Rs 1 lakh per month salary with no existing EMIs, most banks will approve a home loan of approximately Rs 55 to 60 lakh. Using a 50% FOIR, the maximum EMI is Rs 50,000, which at 8.5% for 20 years corresponds to a loan of approximately Rs 57.6 lakh.' },
  { q: 'What is the minimum CIBIL score for a home loan?', a: 'Most major Indian banks require a minimum CIBIL score of 700 to 750 for home loan approval. Scores of 750 or above get the best available rates. Scores between 650 and 699 may get approval at a higher rate. Scores below 650 are typically declined by mainstream lenders.' },
  { q: 'What is the minimum down payment for a home loan in India?', a: 'Per RBI guidelines: for loans up to Rs 30 lakh, banks can fund up to 90% (minimum 10% down payment). For loans between Rs 30 and 75 lakh, up to 80% (minimum 20% down). For loans above Rs 75 lakh, up to 75% (minimum 25% down). A higher down payment reduces your EMI and total interest.' },
  { q: 'Is it better to choose 20-year or 30-year home loan tenure?', a: 'A 20-year tenure is better if you can afford the higher EMI, because total interest paid is significantly lower. On a Rs 30 lakh loan at 8.5%: 20-year EMI is Rs 26,034 with Rs 32.5 lakh total interest, vs 30-year EMI of Rs 23,064 with Rs 53 lakh total interest. The 30-year option costs Rs 20.5 lakh more in total interest.' },
  { q: 'Can I reduce my home loan EMI after taking the loan?', a: 'Yes. You can reduce your EMI by making a partial prepayment on the principal (RBI mandates zero prepayment charges on floating-rate bank loans), negotiating a rate reduction when the RBI cuts the repo rate, doing a balance transfer to a lender with a lower rate, or increasing your tenure if the lender allows it.' },
  { q: 'What is FOIR and how does it affect home loan eligibility?', a: 'FOIR (Fixed Obligation to Income Ratio) is the proportion of your gross monthly income allocated to all EMI payments. Most Indian banks cap FOIR at 50% for home loans. If you have existing EMIs (car loan, personal loan), they count toward FOIR and directly reduce the home loan amount you qualify for.' },
  { q: 'What are the tax benefits on a home loan?', a: 'Under the old tax regime: Section 80C allows up to Rs 1.5 lakh deduction per year on principal repayment. Section 24(b) allows up to Rs 2 lakh per year on interest for self-occupied property. The new tax regime (default from FY2024) does not allow these deductions. Consult a CA to determine which regime is optimal for your income.' },
  { q: 'What is the current SBI home loan interest rate?', a: 'SBI home loan interest rates start at 8.25% p.a. for salaried borrowers with CIBIL above 750, as of June 2026. SBI rates are linked to the EBLR (External Benchmark Lending Rate = RBI repo rate + spread). Women borrowers receive a 0.05% concession on the applicable rate.' },
  { q: 'How does down payment affect my home loan EMI?', a: 'A higher down payment reduces your loan amount and EMI proportionally. For a Rs 50 lakh property at 8.5% for 20 years: 10% down (Rs 5L) gives a loan of Rs 45L with EMI of Rs 39,052. 20% down (Rs 10L) gives a loan of Rs 40L with EMI of Rs 34,713, saving Rs 4,339 every month for 20 years.' },
  { q: 'What is the difference between home loan and mortgage in India?', a: 'In India, a home loan is money borrowed to purchase, construct, or renovate a residential property, with that property as collateral. A mortgage loan (or LAP, Loan Against Property) is a loan against an already-owned property. This calculator is for home purchase loans.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform built for India. All calculators are free with no sign-up required. Fermor is building an automated financial action system that connects real accounts through the Account Aggregator framework, sees the complete financial picture, and automates the decisions most people know they should make but never get around to.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ── Sidebar Nav ───────────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, marginBottom: 16 }}>
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
  { href: '/calculators/mortgage-calculator',            label: 'Mortgage Calculator with Prepayment' },
  { href: '/calculators/emi-calculator',                 label: 'Personal Loan EMI Calculator' },
  { href: '/calculators/education-loan-emi-calculator',  label: 'Education Loan Calculator' },
  { href: '/calculators/fd-calculator',                  label: 'FD Calculator' },
  { href: '/calculators/sip-calculator',                 label: 'SIP Calculator' },
  { href: '/calculators/compound-interest-calculator',   label: 'Compound Interest Calculator' },
];
const MORE = [
  { href: '/calculators/nps-calculator',         label: 'NPS Calculator' },
  { href: '/calculators/cagr-calculator',        label: 'CAGR Calculator' },
  { href: '/calculators/gst-calculator',         label: 'GST Calculator' },
  { href: '/calculators/percentage-calculator',  label: 'Percentage Calculator' },
  { href: '/calculators/gratuity-calculator',    label: 'Gratuity Calculator' },
];

/* ── Article table styles ──────────────────────────────── */
const thS: React.CSSProperties = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: '#16140F', background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid #e3e6e8`, whiteSpace: 'nowrap' };
const tdL: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: '#50565c', border: `1px solid #e3e6e8`, verticalAlign: 'top' };
const tdR: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: '#16140F', fontWeight: 500, border: `1px solid #e3e6e8`, verticalAlign: 'top' };

const YR_PRESETS = [5, 10, 15, 20, 25, 30];

/* ── Main Component ────────────────────────────────────── */
export default function HomeLoanCalculatorClient() {
  const pageTitle = 'Home Loan Calculator';

  const defaultSettings = { homePrice: 7500000, downPaymentPct: 20, rate: 8.5, tenureYr: 20, tenureMode: 'yr', tenureMo: 240 };
  const { settings, updateSettings } = useCalculatorSettings('home-loan-calculator', defaultSettings);
  const { homePrice, downPaymentPct, rate, tenureYr, tenureMode, tenureMo } = settings;

  const setHomePrice      = (v: number) => updateSettings({ homePrice: v });
  const setDownPaymentPct = (v: number) => updateSettings({ downPaymentPct: v });
  const setRate           = (v: number) => updateSettings({ rate: v });
  const setTenureYr       = (v: number) => updateSettings({ tenureYr: v, tenureMo: v * 12 });
  const setTenureMode     = (v: string) => updateSettings({ tenureMode: v });
  const setTenureMo       = (v: number) => updateSettings({ tenureMo: v, tenureYr: Math.round(v / 12) });

  const [mobile, setMobile] = useState(false);
  const [activeTab, setActiveTab] = useState<'emi' | 'eligibility'>('emi');
  const [showAmort, setShowAmort] = useState(false);

  const [monthlyIncome, setMonthlyIncome] = useState(100000);
  const [existingEMI, setExistingEMI]     = useState(0);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk();
    window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const { formatCurrency, convertCurrency, selectedCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  const downPayment    = homePrice * downPaymentPct / 100;
  const amount         = homePrice - downPayment;
  const months         = tenureMode === 'yr' ? tenureYr * 12 : tenureMo;
  const emi            = useMemo(() => calcEMI(amount, rate, months), [amount, rate, months]);
  const totalPayable   = emi * months;
  const totalInterest  = totalPayable - amount;
  const principalPct   = totalPayable > 0 ? Math.round((amount / totalPayable) * 100) : 0;
  const interestPct    = 100 - principalPct;

  const amortRows = useMemo(() => buildAmortization(amount, rate, months, emi), [amount, rate, months, emi]);

  const eligMonths  = months;
  const maxLoan     = useMemo(() => calcMaxLoan(monthlyIncome, existingEMI, rate, eligMonths), [monthlyIncome, existingEMI, rate, eligMonths]);
  const maxProperty = downPaymentPct < 100 ? maxLoan / (1 - downPaymentPct / 100) : 0;
  const maxEligEMI  = Math.max(0, monthlyIncome * 0.5 - existingEMI);

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        {/* Page header */}
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            {pageTitle}
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate your monthly EMI, total interest, and year-by-year amortization. Check how much loan you qualify for based on your salary. Works for SBI, HDFC, ICICI, and all major Indian banks.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          {/* LEFT */}
          <div style={{ minWidth: 0 }}>

            {/* CALCULATOR CARD */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>

              {/* Tab strip */}
              <div role="tablist" aria-label="Calculator mode"
                style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                {([
                  { id: 'emi',         label: 'EMI Calculator' },
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

              {/* TAB 1: EMI Calculator */}
              {activeTab === 'emi' && (
                <div id="panel-emi" role="tabpanel" aria-labelledby="tab-emi">
                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                    {/* Input panel */}
                    <div style={{ padding: mobile ? '20px 18px' : '40px 40px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                        <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Loan Details</p>
                        <CurrencySelector theme="light" />
                      </div>

                      <Slider id="home-price" label="Property Price" value={homePrice} min={500000} max={100000000} step={50000}
                        display={fmtC(homePrice)} onChange={setHomePrice} compact={mobile} />
                      <Slider id="down-payment" label="Down Payment" value={downPaymentPct} min={0} max={50} step={1}
                        display={`${downPaymentPct}% (${fmtC(downPayment)})`} onChange={setDownPaymentPct} compact={mobile} />

                      <div style={{ marginBottom: 28, padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: C.ink, fontWeight: 700 }}>
                          <span>Loan Amount</span>
                          <span>{fmtC(amount)}</span>
                        </div>
                      </div>

                      <Slider id="interest-rate" label="Interest Rate (% p.a.)" value={rate} min={1} max={20} step={0.05}
                        display={`${rate.toFixed(2)}%`} onChange={setRate} compact={mobile} />

                      {/* Tenure */}
                      <div style={{ marginBottom: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: mobile ? 8 : 14 }}>
                          <label style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400 }}>Loan Tenure</label>
                          <div style={{ display: 'flex', background: '#f4f5f6', borderRadius: 8, padding: 3 }}>
                            {(['yr', 'mo'] as const).map(m => (
                              <button key={m} onClick={() => setTenureMode(m)}
                                style={{ padding: mobile ? '4px 10px' : '5px 14px', borderRadius: 6, border: 'none', background: tenureMode === m ? C.white : 'transparent', color: tenureMode === m ? C.ink : C.ink3, fontFamily: INTER, fontSize: 13, fontWeight: 600, cursor: 'pointer', boxShadow: tenureMode === m ? '0 1px 4px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.15s' }}>
                                {m === 'yr' ? 'Years' : 'Months'}
                              </button>
                            ))}
                          </div>
                        </div>
                        {tenureMode === 'yr' && (
                          <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
                            {YR_PRESETS.map(y => (
                              <button key={y} onClick={() => setTenureYr(y)}
                                style={{ padding: '4px 10px', fontSize: 12, fontWeight: tenureYr === y ? 700 : 500, background: tenureYr === y ? C.dark : '#f4f5f6', color: tenureYr === y ? C.lime : C.ink2, border: 'none', borderRadius: 6, cursor: 'pointer', fontFamily: INTER, transition: 'all 0.15s' }}>
                                {y}Y
                              </button>
                            ))}
                          </div>
                        )}
                        {tenureMode === 'yr'
                          ? <Slider id="tenure-yr" label="" value={tenureYr} min={1} max={30} step={1} display={`${tenureYr} yr`} onChange={setTenureYr} compact={mobile} />
                          : <Slider id="tenure-mo" label="" value={tenureMo} min={12} max={360} step={1} display={`${tenureMo} mo`} onChange={setTenureMo} compact={mobile} />}
                      </div>
                    </div>

                    {/* Result panel */}
                    <div style={{ padding: mobile ? '20px 18px' : '40px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                      {/* Donut: order -1 on desktop so it appears at top */}
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

                      {/* Stat rows */}
                      {[
                        { label: 'Loan amount',          value: fmtC(amount) },
                        { label: 'Down payment',         value: fmtC(downPayment) },
                        { label: 'Total interest',       value: fmtC(totalInterest) },
                        { label: 'Total amount payable', value: fmtC(totalPayable) },
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
                        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                          {mobile && <p style={{ padding: '0 16px 8px', fontSize: 11, color: C.ink3, margin: 0 }}>Swipe to see full table</p>}
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                            <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 24px', textAlign: 'left' }}>
                              Year-by-year home loan repayment schedule. All values in {selectedCurrency?.code || 'INR'}.
                            </caption>
                            <thead>
                              <tr style={{ background: '#f4f5f6' }}>
                                {['Year', 'Opening Balance', 'Principal Paid', 'Interest Paid', 'Closing Balance'].map(h => (
                                  <th key={h} scope="col" style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {amortRows.map((row, i) => (
                                <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                  <td style={{ padding: '12px 24px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                                  <td style={{ padding: '12px 24px', color: C.ink2 }}>{fmtIN(row.openingBal)}</td>
                                  <td style={{ padding: '12px 24px', color: '#1f7a58', fontWeight: 600 }}>{fmtIN(row.principal)}</td>
                                  <td style={{ padding: '12px 24px', color: C.ink2 }}>{fmtIN(row.interest)}</td>
                                  <td style={{ padding: '12px 24px', color: C.ink2 }}>{fmtIN(row.closingBal)}</td>
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

              {/* TAB 2: Loan Eligibility */}
              {activeTab === 'eligibility' && (
                <div id="panel-eligibility" role="tabpanel" aria-labelledby="tab-eligibility">
                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                    {/* Input */}
                    <div style={{ padding: mobile ? '20px 18px' : '40px 40px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 24px' }}>Your Income Details</p>
                      <Slider id="monthly-income" label="Gross Monthly Income" value={monthlyIncome} min={20000} max={2000000} step={5000}
                        display={fmtC(monthlyIncome)} onChange={setMonthlyIncome} compact={mobile} />
                      <Slider id="existing-emi" label="Existing Monthly EMIs" value={existingEMI} min={0} max={500000} step={1000}
                        display={fmtC(existingEMI)} onChange={setExistingEMI} compact={mobile} />
                      <div style={{ marginBottom: 16, padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.ink2 }}>
                        Using: {rate.toFixed(2)}% rate, {tenureMode === 'yr' ? `${tenureYr} years` : `${tenureMo} months`} tenure
                      </div>
                      <p style={{ fontSize: 13, color: C.ink3, lineHeight: 1.65 }}>
                        Eligibility is based on 50% FOIR, the standard used by SBI, HDFC Bank, and most Indian lenders. Actual approval depends on your CIBIL score, employer, and property type.
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
                            { label: 'Max eligible loan',           val: fmtC(maxLoan) },
                            { label: 'Affordable property value',   val: fmtC(maxProperty) },
                            { label: 'Available EMI (50% FOIR)',    val: fmtC(maxEligEMI) + '/mo' },
                            { label: 'Suggested down payment',      val: fmtC(maxProperty * (downPaymentPct / 100)) },
                          ].map(r => (
                            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${C.border}` }}>
                              <span style={{ fontSize: 13, color: C.ink2 }}>{r.label}</span>
                              <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{r.val}</span>
                            </div>
                          ))}
                          <p style={{ fontSize: 12, color: C.ink3, marginTop: 12, lineHeight: 1.6 }}>
                            Affordable property value is calculated using your current down payment setting ({downPaymentPct}%). Per RBI guidelines, LTV varies by loan amount.
                          </p>
                        </>
                      ) : (
                        <div style={{ textAlign: 'center', padding: '40px 0', color: C.ink3 }}>
                          <p style={{ fontSize: 14, margin: 0 }}>Your existing EMIs exceed 50% of income. Reduce them or increase income to qualify for a home loan.</p>
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
            <article itemScope itemType="https://schema.org/Article">

              <h2 id="emi-calculator" style={{ fontSize: 20, fontWeight: 800, color: C.ink, margin: '0 0 10px', letterSpacing: '-0.02em' }}>What Is a Home Loan EMI Calculator?</h2>
              <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                  A home loan EMI calculator is a tool that computes your fixed monthly payment using the reducing-balance method, given three inputs: the loan amount (property price minus down payment), the annual interest rate, and the loan tenure in months.
                </p>
              </div>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 12px' }}>
                The calculator shows you the exact trade-off between your monthly outflow and the total interest you will pay over the loan lifetime before signing. A longer tenure lowers your monthly EMI but increases total interest significantly.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 28px' }}>
                This calculator works for all banks offering home loans in India: SBI, HDFC Bank, ICICI Bank, Axis Bank, Canara Bank, PNB, Kotak Mahindra, and LIC Housing Finance.
              </p>

              <h2 id="emi-formula" style={{ fontSize: 20, fontWeight: 800, color: C.ink, margin: '0 0 10px', letterSpacing: '-0.02em' }}>Home Loan EMI Formula</h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 12px' }}>All banks in India use the reducing-balance method:</p>
              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 20px', marginBottom: 12, fontFamily: 'monospace', fontSize: 15, color: C.ink }}>
                EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
              </div>
              <ul style={{ fontSize: 14, color: C.ink2, lineHeight: 1.75, margin: '0 0 12px', paddingLeft: 22 }}>
                <li><strong>P</strong>: Principal loan amount (property price minus down payment)</li>
                <li><strong>R</strong>: Monthly interest rate = annual rate / 12 / 100</li>
                <li><strong>N</strong>: Loan tenure in months (years x 12)</li>
              </ul>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 28px' }}>
                Example: Rs 50 lakh loan at 8.5% p.a. for 20 years. R = 0.007083. N = 240. EMI = Rs 43,391 per month. Total repayment = Rs 1.04 crore. Total interest = Rs 54.14 lakh.
              </p>

              <h2 id="emi-by-amount" style={{ fontSize: 20, fontWeight: 800, color: C.ink, margin: '0 0 10px', letterSpacing: '-0.02em' }}>Monthly EMI for Different Loan Amounts</h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 12px' }}>EMI at 8.5% p.a. for 20-year tenure:</p>
              <div style={{ overflowX: 'auto', marginBottom: 28, WebkitOverflowScrolling: 'touch' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }} aria-label="Home loan EMI at 8.5% for 20 years">
                  <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>
                    Values are approximate. Use the calculator above for exact figures.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" style={thS}>Loan Amount</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>EMI / Month</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Total Interest</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Total Repayment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Rs 10 lakh', 'Rs 8,678',  'Rs 10.83L', 'Rs 20.83L'],
                      ['Rs 20 lakh', 'Rs 17,356', 'Rs 21.65L', 'Rs 41.65L'],
                      ['Rs 25 lakh', 'Rs 21,695', 'Rs 27.07L', 'Rs 52.07L'],
                      ['Rs 30 lakh', 'Rs 26,034', 'Rs 32.48L', 'Rs 62.48L'],
                      ['Rs 40 lakh', 'Rs 34,712', 'Rs 43.31L', 'Rs 83.31L'],
                      ['Rs 50 lakh', 'Rs 43,391', 'Rs 54.14L', 'Rs 1.04Cr'],
                      ['Rs 60 lakh', 'Rs 52,069', 'Rs 64.97L', 'Rs 1.25Cr'],
                      ['Rs 70 lakh', 'Rs 60,747', 'Rs 75.79L', 'Rs 1.46Cr'],
                      ['Rs 80 lakh', 'Rs 69,426', 'Rs 86.62L', 'Rs 1.67Cr'],
                      ['Rs 1 crore', 'Rs 86,782', 'Rs 1.08Cr', 'Rs 2.08Cr'],
                    ].map(([amt, emi, int_, total], i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                        <td style={{ ...tdL, fontWeight: 600 }}>{amt}</td>
                        <td style={{ ...tdR, textAlign: 'right' as const, color: C.dark, fontWeight: 700 }}>{emi}</td>
                        <td style={{ ...tdR, textAlign: 'right' as const }}>{int_}</td>
                        <td style={{ ...tdR, textAlign: 'right' as const }}>{total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 id="down-payment" style={{ fontSize: 20, fontWeight: 800, color: C.ink, margin: '0 0 10px', letterSpacing: '-0.02em' }}>How Down Payment Reduces Your Home Loan EMI</h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 12px' }}>
                Every additional rupee in down payment reduces your loan amount and EMI proportionally. Impact on a Rs 50 lakh property at 8.5% p.a. for 20 years:
              </p>
              <div style={{ overflowX: 'auto', marginBottom: 12, WebkitOverflowScrolling: 'touch' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }} aria-label="Down payment impact on EMI">
                  <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>
                    Property value Rs 50 lakh. Rate 8.5% p.a. Tenure 20 years.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" style={thS}>Down Payment</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Loan Amount</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Monthly EMI</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Total Interest</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['10% (Rs 5L)',    'Rs 45L',   'Rs 39,052', 'Rs 48.72L'],
                      ['15% (Rs 7.5L)',  'Rs 42.5L', 'Rs 36,882', 'Rs 46.12L'],
                      ['20% (Rs 10L)',   'Rs 40L',   'Rs 34,713', 'Rs 43.31L'],
                      ['25% (Rs 12.5L)', 'Rs 37.5L', 'Rs 32,543', 'Rs 40.70L'],
                      ['30% (Rs 15L)',   'Rs 35L',   'Rs 30,374', 'Rs 37.90L'],
                      ['40% (Rs 20L)',   'Rs 30L',   'Rs 26,034', 'Rs 32.48L'],
                    ].map(([pct, loan, emi, int_], i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                        <td style={{ ...tdL, fontWeight: 700 }}>{pct}</td>
                        <td style={{ ...tdR, textAlign: 'right' as const }}>{loan}</td>
                        <td style={{ ...tdR, textAlign: 'right' as const, color: C.dark, fontWeight: 700 }}>{emi}</td>
                        <td style={{ ...tdR, textAlign: 'right' as const }}>{int_}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 28px' }}>
                Moving from 10% to 20% down on a Rs 50 lakh property saves Rs 4,339 per month for 20 years. That is Rs 10.4 lakh saved in EMI outflow, plus Rs 5.4 lakh less total interest. Per RBI guidelines, LTV is capped at 90% for loans up to Rs 30 lakh, 80% for Rs 30-75 lakh, and 75% above Rs 75 lakh.
              </p>

              <h2 id="eligibility" style={{ fontSize: 20, fontWeight: 800, color: C.ink, margin: '0 0 10px', letterSpacing: '-0.02em' }}>Check Your Home Loan Eligibility</h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 12px' }}>
                Banks use the FOIR (Fixed Obligation to Income Ratio) method to determine your maximum loan, alongside an <a href="https://www.rbi.org.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 700 }}>RBI</a>-directed Loan-to-Value cap on the property. Most Indian banks cap FOIR at 50% for home loans, meaning total monthly EMIs cannot exceed half your gross income. Use the Eligibility tab above to calculate your exact eligible loan amount.
              </p>
              <div style={{ overflowX: 'auto', marginBottom: 12, WebkitOverflowScrolling: 'touch' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }} aria-label="Home loan eligibility by monthly salary">
                  <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>
                    At 8.5% p.a. for 20 years. 50% FOIR. No existing EMIs.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" style={thS}>Monthly Gross Salary</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Max EMI (50% FOIR)</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Approx Eligible Loan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Rs 30,000',   'Rs 15,000',   'Rs 17.3L'],
                      ['Rs 50,000',   'Rs 25,000',   'Rs 28.8L'],
                      ['Rs 75,000',   'Rs 37,500',   'Rs 43.2L'],
                      ['Rs 1,00,000', 'Rs 50,000',   'Rs 57.6L'],
                      ['Rs 1,50,000', 'Rs 75,000',   'Rs 86.4L'],
                      ['Rs 2,00,000', 'Rs 1,00,000', 'Rs 1.15Cr'],
                    ].map(([sal, emi, loan], i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                        <td style={{ ...tdL, fontWeight: 600 }}>{sal}</td>
                        <td style={{ ...tdR, textAlign: 'right' as const }}>{emi}</td>
                        <td style={{ ...tdR, textAlign: 'right' as const, color: C.dark, fontWeight: 700 }}>{loan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 28px' }}>
                CIBIL score tiers: 750+ gets the best available rate. 700-749 adds 0.1-0.25% to the rate. 650-699 may add 0.5-1% or trigger collateral requirements. Below 650, most mainstream banks decline the application.
              </p>

              <h2 id="faq" style={{ fontSize: 20, fontWeight: 800, color: C.ink, margin: '0 0 16px', letterSpacing: '-0.02em' }}>Frequently Asked Questions</h2>
              <FAQ />

              <div id="disclaimer" itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All calculations on this page are indicative only. Actual EMI, eligibility, and interest rates from your lender may vary depending on your credit profile, property valuation, lender type, floating vs fixed rate choice, and applicable processing fees. Bank rates cited are as of June 2026 and subject to change. This is not financial advice. Consult a SEBI-registered investment adviser or CA before taking a home loan.
                </p>
              </div>
            </article>
          </div>

          {/* RIGHT: Sidebar */}
          <style>{`.home-loan-sidebar::-webkit-scrollbar{width:5px}.home-loan-sidebar::-webkit-scrollbar-track{background:transparent}.home-loan-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.home-loan-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside
            className="home-loan-sidebar"
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
              <nav aria-label="Related Calculators" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <SidebarList title="Popular Calculators" items={POPULAR} />
                <SidebarList title="More Calculators" items={MORE} />
              </nav>
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

'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useLayoutEffect } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { FAQBox } from '@/components/common/FAQBox';

/* ─── Palette ────────────────────────────────────────────────── */
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

/* ─── Math ──────────────────────────────────────────────────── */
function calcEMI(p: number, r: number, n: number) {
  if (n === 0) return 0;
  if (r === 0) return p / n;
  const m = r / 12 / 100;
  return (p * m * Math.pow(1 + m, n)) / (Math.pow(1 + m, n) - 1);
}
interface YRow { year: number; opening: number; prin: number; int: number; closing: number }
function buildAmort(p: number, r: number, n: number, emi: number): YRow[] {
  const rows: YRow[] = []; let bal = p;
  const m = r / 12 / 100, y0 = new Date().getFullYear();
  for (let y = 0; y < Math.ceil(n / 12); y++) {
    const open = bal; let yP = 0, yI = 0;
    const mo = Math.min(12, n - y * 12);
    for (let i = 0; i < mo; i++) {
      const iP = bal * m, pP = emi - iP;
      yI += iP; yP += pP; bal = Math.max(0, bal - pP);
    }
    rows.push({ year: y0 + y, opening: open, prin: yP, int: yI, closing: bal });
    if (bal <= 0) break;
  }
  return rows;
}

interface MRow { monthName: string; principal: number; interest: number; total: number }
interface YGroup { year: number; months: MRow[] }
const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function buildMonthlyAmort(p: number, r: number, n: number, emi: number): YGroup[] {
  const m = r / 12 / 100;
  const now = new Date();
  const s0 = now.getMonth(), y0 = now.getFullYear();
  let bal = p;
  const groups: YGroup[] = [];
  let curYear = y0;
  let cur: YGroup = { year: curYear, months: [] };
  for (let i = 0; i < n; i++) {
    if (bal <= 0) break;
    const abs = s0 + i;
    const yr = y0 + Math.floor(abs / 12);
    const mo = abs % 12;
    if (yr !== curYear) { groups.push(cur); curYear = yr; cur = { year: yr, months: [] }; }
    const interest = bal * m;
    const principal = Math.min(emi - interest, bal);
    bal = Math.max(0, bal - principal);
    cur.months.push({ monthName: MONTH_NAMES[mo], principal, interest, total: principal + interest });
  }
  if (cur.months.length) groups.push(cur);
  return groups;
}

/* ─── Prepayment savings calculator ─────────────────────────── */
function calcPrepayment(p: number, r: number, n: number, emi: number, extra: number) {
  const m = r / 12 / 100;
  let bal = p, mo = 0, totalInt = 0;
  while (bal > 0.5 && mo < n + 1) {
    const interest = bal * m;
    const principal = Math.min(emi + extra - interest, bal);
    if (principal <= 0) break;
    totalInt += interest;
    bal = Math.max(0, bal - principal);
    mo++;
  }
  return { newMonths: mo, totalInt };
}

const BANK_RATES = [
  { name: 'SBI',   rate: 11.45, processing: '1.50%', maxAmount: '20 Lakh' },
  { name: 'HDFC',  rate: 10.50, processing: '2.50%', maxAmount: '40 Lakh' },
  { name: 'ICICI', rate: 10.65, processing: '2.25%', maxAmount: '50 Lakh' },
  { name: 'Axis',  rate: 10.49, processing: '2.00%', maxAmount: '40 Lakh' },
  { name: 'Kotak', rate: 10.99, processing: '2.50%', maxAmount: '40 Lakh' },
  { name: 'BOB',   rate: 11.40, processing: '2.00%', maxAmount: '20 Lakh' },
  { name: 'PNB',   rate: 11.49, processing: '1.00%', maxAmount: '15 Lakh' },
  { name: 'Canara', rate: 12.05, processing: '1.00%', maxAmount: '10 Lakh' },
  { name: 'Bajaj',  rate: 11.00, processing: '3.00%', maxAmount: '35 Lakh' },
  { name: 'Tata Capital', rate: 10.99, processing: '2.75%', maxAmount: '35 Lakh' },
];

/* ─── Donut Chart ────────────────────────────────────────────── */
function DonutChart({ principal, interest }: { principal: number; interest: number }) {
  const total = principal + interest;
  if (total === 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const pArc  = (principal / total) * circ;
  const pPct  = Math.round((principal / total) * 100);
  return (
    <svg width="216" height="216" viewBox="0 0 216 216" style={{ display: 'block' }}
      role="img" aria-label={`Principal vs Interest: ${pPct}% principal, ${100 - pPct}% interest`}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Principal</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
  );
}

/* ─── Slider ─────────────────────────────────────────────────── */
function Slider({ label, id, value, min, max, step, fmt, onChange, compact }: {
  label: string; id?: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void; compact?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = ((value - min) / (max - min)) * 100;
  const inputId = id || label.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'slider';
  const rangeId = `${inputId}-range`;
  const display = fmt(value);
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 40 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 16 }}>
        {label
          ? <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400 }}>{label}</label>
          : <span />
        }
        {editing ? (
          <input id={inputId} autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            aria-label={`Enter ${label} value`}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 120, outline: 'none', color: C.dark, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${display}. Click to edit.`}
            onMouseOver={e => (e.currentTarget as HTMLElement).style.borderColor = '#AAAAAA'}
            onMouseOut={e => (e.currentTarget as HTMLElement).style.borderColor = C.border}
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
        <span style={{ fontSize: 11, color: C.ink3 }}>{fmt(min)}</span>
        <span style={{ fontSize: 11, color: C.ink3 }}>{fmt(max)}</span>
      </div>
    </div>
  );
}

/* ─── Sidebar List ──────────────────────────────────────────── */
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
  { href: '/calculators/emi-calculator',                    label: 'EMI Calculator' },
  { href: '/calculators/home-loan-calculator',              label: 'Home Loan Calculator' },
  { href: '/calculators/car-loan-calculator',               label: 'Car Loan Calculator' },
  { href: '/calculators/debt-to-income-ratio-calculator',   label: 'Debt-to-Income Ratio Calculator' },
  { href: '/calculators/credit-health-score-calculator',    label: 'Credit Health Score Calculator' },
];
const MORE = [
  { href: '/calculators/sip-calculator',        label: 'SIP Calculator' },
  { href: '/calculators/fd-calculator',         label: 'FD Calculator' },
  { href: '/calculators/loan-calculator',       label: 'Loan Calculator' },
  { href: '/calculators/gst-calculator',        label: 'GST Calculator' },
  { href: '/calculators/income-tax-calculator', label: 'Income Tax Calculator' },
];

/* ─── FAQ ───────────────────────────────────────────────────── */
const FAQS = [
  { q: 'Does a personal loan require collateral?', a: 'No, a personal loan is an unsecured loan. You do not need to pledge any asset or collateral (like gold, property, or FDs) to avail it. Lenders approve personal loans based strictly on your creditworthiness, income, and repayment capacity.' },
  { q: 'Does the EMI amount remain fixed throughout the loan tenure?', a: 'For fixed-rate personal loans, yes. Your EMI remains constant throughout the repayment tenure. The split between principal and interest changes over time, but your monthly cash outflow stays exactly the same. For floating-rate loans, the EMI may change when the bank revises its lending rate linked to the RBI repo rate.' },
  { q: 'How can I get a personal loan at a low interest rate?', a: 'To get the best personal loan interest rates, maintain a CIBIL score above 750, keep your debt-to-income ratio below 30%, and compare offers from multiple banks and NBFCs. Having a salary account with the lender, a stable employment history of 2+ years, and applying during festive seasons can also help negotiate better rates.' },
  { q: 'How is the personal loan EMI calculated?', a: 'Personal loan EMI is calculated using the formula: EMI = [P x R x (1+R)^N] / [(1+R)^N - 1], where P is the principal amount, R is the monthly interest rate (annual rate divided by 12 divided by 100), and N is the loan tenure in months. In Excel, you can use the PMT function: =PMT(rate/12, months, -principal).' },
  { q: 'What credit score is needed for a personal loan?', a: 'Most banks require a minimum CIBIL score of 700 to approve a personal loan. A score above 750 qualifies you for the best interest rates and higher loan amounts. Scores between 650-700 may get approval at higher rates. Below 650, approval is unlikely from major banks, though some NBFCs consider applications with additional documentation.' },
  { q: 'Can I prepay my personal loan without penalty?', a: 'Per RBI guidelines, banks cannot charge prepayment or foreclosure penalties on floating-rate personal loans. For fixed-rate loans, banks may charge 2-5% of the outstanding principal. Most personal loans in India are on floating rates, so prepayment is typically penalty-free after the initial lock-in period of 6-12 months.' },
  { q: 'What is FOIR and how does it affect loan eligibility?', a: 'FOIR (Fixed Obligation to Income Ratio) is the percentage of your monthly income that goes towards existing EMIs and loan obligations. Banks use FOIR to determine how much additional EMI you can afford. Most banks cap FOIR at 40-55% for personal loans. For example, if your monthly income is Rs 75,000 and existing EMIs are Rs 10,000, your available EMI capacity is Rs 27,500 (at 50% FOIR).' },
  { q: 'Is personal loan interest tax deductible?', a: 'Personal loan interest is generally not tax deductible under the Income Tax Act. However, if the loan is used for specific purposes, deductions may apply: home renovation (Section 24, up to Rs 30,000 per year), business purposes (deductible as business expense), or education (Section 80E). The principal repayment is not deductible in any case.' },
  { q: 'What documents are required for a personal loan?', a: 'Standard documents include: (1) Identity proof: Aadhaar, PAN, passport, or voter ID. (2) Address proof: Aadhaar, utility bill, or rent agreement. (3) Income proof: 3-6 months salary slips and bank statements for salaried applicants; ITR for 2-3 years for self-employed. (4) Employment proof: offer letter or employer ID. (5) Passport-size photographs.' },
  { q: 'What is the maximum personal loan amount and tenure?', a: 'Maximum amounts vary by bank: SBI offers up to Rs 20 lakh, HDFC Bank up to Rs 40 lakh, ICICI Bank up to Rs 50 lakh, and Axis Bank up to Rs 40 lakh for salaried individuals. Maximum tenure is typically 5-7 years (60-84 months). Higher amounts require higher income, better credit scores, and may need an existing banking relationship.' },
  { q: 'How to calculate personal loan EMI in Excel?', a: 'Use the PMT function: =PMT(rate/12, tenure_months, -principal). For a Rs 5 lakh loan at 11% for 5 years: =PMT(11%/12, 60, -500000) returns Rs 10,871. The negative sign on the principal is required. For Google Sheets, the same formula works. You can also calculate manually: =P*(R*(1+R)^N)/((1+R)^N-1) where R is the monthly rate.' },
  { q: 'What is the processing fee for a personal loan?', a: 'Processing fees range from 0.5% to 3% of the loan amount, plus 18% GST on the fee. SBI charges up to 1.5%, HDFC Bank up to 2.5%, ICICI Bank up to 2.25%, and Axis Bank up to 2%. Some banks waive processing fees during festive seasons. The fee is deducted upfront from the disbursed amount.' },
  { q: 'How does personal loan balance transfer work?', a: 'A balance transfer lets you move your outstanding personal loan to another bank offering a lower interest rate. The new bank pays off your existing loan and issues a fresh loan at its rate. You save on interest if the new rate is significantly lower, but factor in the processing fee of the new loan and any foreclosure charges on the old one.' },
  { q: 'What is the difference between flat rate and reducing balance rate?', a: 'Flat rate charges interest on the original loan amount throughout the tenure, making the effective cost higher. Reducing balance rate charges interest only on the outstanding principal, which decreases with each EMI payment. A 10% flat rate is roughly equivalent to an 18-19% reducing balance rate. All EMI calculators, including this one, use the reducing balance method.' },
  { q: 'How to reduce personal loan EMI?', a: 'Five ways to reduce your EMI: (1) Choose a longer tenure to spread payments. (2) Negotiate a lower interest rate by maintaining a credit score above 750. (3) Transfer the loan to a bank offering a lower rate. (4) Make part-prepayments to reduce outstanding principal. (5) Compare rates from multiple banks before applying.' },
  { q: 'Does taking a personal loan affect my credit score?', a: 'Applying triggers a hard inquiry, causing a small temporary dip, and multiple applications in a short window compound this. Once approved, on-time EMI payments build positive repayment history and can improve your score over time, while a missed or late EMI has a larger negative effect and is reported to credit bureaus within the same cycle.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform built for India. All calculators are free to use, with a free account available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.' },
];
function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ════════════════════════════════════════════════════════════ */

export default function PersonalLoanCalculatorClient() {
  const defaultSettings = { amount: 1500000, rate: 10.5, tenureYr: 5, tenureMode: 'yr', tenureMo: 60, prepayExtra: 5000, showAfford: false, monthlyIncome: 75000, existingEMI: 0, processingFee: 1.5 };
  const { settings, updateSettings } = useCalculatorSettings('personal-loan-calculator', defaultSettings);
  const { amount, rate, tenureYr, tenureMode, tenureMo, prepayExtra, showAfford, monthlyIncome, existingEMI, processingFee } = settings;
  const setAmount = (v: any) => updateSettings({ amount: typeof v === 'function' ? v(settings.amount) : v });
  const setRate = (v: any) => updateSettings({ rate: typeof v === 'function' ? v(settings.rate) : v });
  const setTenureYr = (v: any) => updateSettings({ tenureYr: typeof v === 'function' ? v(settings.tenureYr) : v });
  const setTenureMode = (v: any) => updateSettings({ tenureMode: typeof v === 'function' ? v(settings.tenureMode) : v });
  const setTenureMo = (v: any) => updateSettings({ tenureMo: typeof v === 'function' ? v(settings.tenureMo) : v });
  const setPrepayExtra = (v: any) => updateSettings({ prepayExtra: typeof v === 'function' ? v(settings.prepayExtra) : v });
  const setShowAfford = (v: any) => updateSettings({ showAfford: typeof v === 'function' ? v(settings.showAfford) : v });
  const setMonthlyIncome = (v: any) => updateSettings({ monthlyIncome: typeof v === 'function' ? v(settings.monthlyIncome) : v });
  const setExistingEMI = (v: any) => updateSettings({ existingEMI: typeof v === 'function' ? v(settings.existingEMI) : v });
  const setProcessingFee = (v: any) => updateSettings({ processingFee: typeof v === 'function' ? v(settings.processingFee) : v });
  const [mobile,     setMobile]     = useState(false);
  const [showAmort,   setShowAmort]   = useState(false);
  const [showTrueCost, setShowTrueCost] = useState(false);
  const [openYears,   setOpenYears]   = useState<Set<number>>(new Set());
  const [showPrepay,    setShowPrepay]    = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();

  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const months   = tenureMode === 'yr' ? tenureYr * 12 : tenureMo;
  const emi      = useMemo(() => calcEMI(amount, rate, months), [amount, rate, months]);
  const totalPay = emi * months;
  const totalInt = totalPay - amount;
  const prinPct  = Math.round((amount / totalPay) * 100);
  const intPct   = 100 - prinPct;
  const amortRows     = useMemo(() => buildAmort(amount, rate, months, emi), [amount, rate, months, emi]);
  const monthlyGroups = useMemo(() => buildMonthlyAmort(amount, rate, months, emi), [amount, rate, months, emi]);
  const originalInterest = emi * months - amount;
  const prepayResult   = useMemo(() => calcPrepayment(amount, rate, months, emi, prepayExtra), [amount, rate, months, emi, prepayExtra]);
  const monthsSaved    = Math.max(0, months - prepayResult.newMonths);
  const interestSaved  = Math.max(0, originalInterest - prepayResult.totalInt);
  const processingFeeAmt = amount * processingFee / 100;
  const gstOnFee       = processingFeeAmt * 0.18;
  const trueTotalCost  = amount + originalInterest + processingFeeAmt + gstOnFee;
  const maxEMIAllowed  = Math.max(0, monthlyIncome * 0.5 - existingEMI);
  const affordableAmt  = useMemo(() => {
    if (maxEMIAllowed <= 0) return 0;
    const r = rate / 12 / 100;
    return r === 0 ? maxEMIAllowed * months : (maxEMIAllowed * (Math.pow(1 + r, months) - 1)) / (r * Math.pow(1 + r, months));
  }, [maxEMIAllowed, rate, months]);

  /* ─── article style helpers ─── */
  const h2 = { fontSize: mobile ? 18 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const p  = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 40px' } as React.CSSProperties;
  const bullet = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      {/* NAV */}
      <PageNav />

      {/* BODY */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>Personal Loan EMI Calculator</h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate your monthly EMI, compare bank interest rates, view amortization schedule, and check loan eligibility instantly.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          {/* LEFT */}
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
                    {!mobile ? (
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{showAdvanced ? 'More Settings' : 'Loan Details'}</p>
                    ) : (
                      <div />
                    )}
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider label="Loan Amount" id="loan-amount" value={amount} min={10000} max={5000000} step={10000}
                        fmt={v => fmtC(v)} onChange={setAmount} compact={mobile} />
                      <Slider label="Rate of Interest (p.a.)" id="interest-rate" value={rate} min={8} max={24} step={0.1}
                        fmt={v => `${v.toFixed(1)}%`} onChange={setRate} compact={mobile} />

                      {/* Tenure + toggle */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: mobile ? 10 : 16 }}>
                          <label style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400 }}>Loan Tenure</label>
                          <div style={{ display: 'flex', background: '#f4f5f6', borderRadius: 8, padding: 3 }}>
                            {(['yr', 'mo'] as const).map(m => (
                              <button key={m} onClick={() => setTenureMode(m)} style={{ padding: mobile ? '4px 10px' : '5px 14px', borderRadius: 6, border: 'none', background: tenureMode === m ? C.white : 'transparent', color: tenureMode === m ? C.ink : C.ink3, fontFamily: INTER, fontSize: 13, fontWeight: 600, cursor: 'pointer', boxShadow: tenureMode === m ? '0 1px 4px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.15s' }}>
                                {m === 'yr' ? 'Years' : 'Months'}
                              </button>
                            ))}
                          </div>
                        </div>
                        {tenureMode === 'yr'
                          ? <Slider label="" id="tenure-years" value={tenureYr} min={1} max={7} step={1} fmt={v => `${v} Yr`} onChange={v => { setTenureYr(v); setTenureMo(v * 12); }} compact={mobile} />
                          : <Slider label="" id="tenure-months" value={tenureMo} min={12} max={84} step={1} fmt={v => `${v} Mo`} onChange={v => { setTenureMo(v); setTenureYr(Math.round(v / 12)); }} compact={mobile} />}
                      </div>

                      <button onClick={() => setShowAdvanced(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        More settings
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <Slider label="Processing Fee (%)" id="processing-fee-advanced" value={processingFee} min={0} max={3} step={0.1}
                        fmt={v => `${v.toFixed(1)}% (${fmtC(amount * v / 100)})`} onChange={setProcessingFee} compact={mobile} />
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: '0 0 24px' }}>
                        Set the processing fee your lender charges to see the true total cost of the loan, including 18% GST on the fee, in the "True Cost of Your Loan" card below.
                      </p>
                      <button onClick={() => setShowAdvanced(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        Back
                      </button>
                    </>
                  )}
                </div>

                {/* Results panel */}
                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  {/* Monthly EMI highlight box */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: mobile ? '14px 18px' : '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Monthly EMI</span>
                    <span aria-live="polite" aria-label={`Monthly EMI: ${fmtIN(emi)}`} style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>{fmtIN(emi)}</span>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: 'Principal amount',     value: fmtC(amount) },
                    { label: 'Total interest',       value: fmtC(totalInt) },
                    { label: 'Amount payable', value: fmtC(totalPay) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '15px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  {/* Donut */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 24, order: mobile ? 1 : -1 }}>
                    <DonutChart principal={amount} interest={totalInt} />
                  </div>

                  {/* Legend */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 22, marginBottom: mobile ? 8 : 28, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Principal amount</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Interest amount</span>
                    </div>
                  </div>

                  {/* Split bar */}
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

              {/* Amortization toggle */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowAmort(v => !v)}
                  aria-expanded={showAmort} aria-controls="amort-panel"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '20px 48px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: showAmort ? C.dark : C.ink }}>Your Amortization Details</span>
                    {!mobile && <span style={{ fontSize: 13, color: C.ink3, marginLeft: 10 }}>(Yearly / Monthly)</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 8 : 12, flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.dark, background: C.paleLime, border: `1px solid ${C.lime2}`, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {amortRows.length} yr · {months} mo
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={showAmort ? C.dark : C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      style={{ transform: showAmort ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s, stroke 0.2s', flexShrink: 0 }} aria-hidden="true">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {showAmort && (
                  <div id="amort-panel" style={{ borderTop: `1px solid ${C.border}` }}>
                    {mobile ? (
                      <div>
                        {monthlyGroups.map(g => {
                          const isOpen = openYears.has(g.year);
                          return (
                            <div key={g.year} style={{ borderBottom: `1px solid ${C.border}` }}>
                              <button
                                onClick={() => setOpenYears(prev => {
                                  const next = new Set(prev);
                                  isOpen ? next.delete(g.year) : next.add(g.year);
                                  return next;
                                })}
                                aria-expanded={isOpen} aria-controls={`amort-year-${g.year}`}
                                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER }}
                              >
                                <span style={{ fontSize: 15, fontWeight: 600, color: C.ink }}>{g.year}</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                  style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} aria-hidden="true">
                                  <polyline points="6 9 12 15 18 9" />
                                </svg>
                              </button>
                              {isOpen && (
                                <div id={`amort-year-${g.year}`} style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
                                  <table style={{ minWidth: 380, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 14px', textAlign: 'left' }}>Monthly EMI breakdown for {g.year}</caption>
                                    <thead>
                                      <tr style={{ background: '#f4f5f6' }}>
                                        {['Month', 'Principal Paid', 'Interest Charged', 'Total Payment'].map(h => (
                                          <th key={h} scope="col" style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {g.months.map((row, i) => (
                                        <tr key={i} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                          <td style={{ padding: '11px 14px', fontWeight: 600, color: C.ink }}>{row.monthName}</td>
                                          <td style={{ padding: '11px 14px', color: '#1f7a58', fontWeight: 600 }}>{fmtIN(row.principal)}</td>
                                          <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtIN(row.interest)}</td>
                                          <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtIN(row.total)}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '10px 24px', textAlign: 'left' }}>Year-by-year amortization schedule for your personal loan</caption>
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
                                <td style={{ padding: '13px 24px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                                <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.opening)}</td>
                                <td style={{ padding: '13px 24px', color: '#1f7a58', fontWeight: 600 }}>{fmtIN(row.prin)}</td>
                                <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.int)}</td>
                                <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.closing)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* ── PREPAYMENT CALCULATOR ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 18 }}>
              <button onClick={() => setShowPrepay(v => !v)}
                aria-expanded={showPrepay} aria-controls="prepay-panel"
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '20px 48px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                <div style={{ minWidth: 0, textAlign: 'left' }}>
                  <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: showPrepay ? C.dark : C.ink, display: 'block' }}>Prepayment & Interest Savings</span>
                  <span style={{ fontSize: 12, color: C.ink3, marginTop: 2, display: 'block' }}>See how much you save by paying extra every month</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={showPrepay ? C.dark : C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: showPrepay ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s, stroke 0.2s', flexShrink: 0 }} aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {showPrepay && (
                <div id="prepay-panel" style={{ borderTop: `1px solid ${C.border}`, padding: mobile ? '20px 18px' : '36px 48px' }}>
                  <Slider label="Extra payment per month" id="prepay-extra" value={prepayExtra} min={0} max={50000} step={500}
                    fmt={v => v === 0 ? '\u20B90' : fmtIN(v)} onChange={setPrepayExtra} compact={mobile} />

                  <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : '1fr 1fr 1fr', gap: 16 }}>
                    {[
                      { label: 'New Tenure',     value: prepayExtra > 0 ? `${prepayResult.newMonths} mo` : `${months} mo`, highlight: false },
                      { label: 'Months Saved',   value: prepayExtra > 0 ? `${monthsSaved} mo` : '\u2014', highlight: true },
                      { label: 'Interest Saved', value: prepayExtra > 0 ? fmtC(interestSaved) : '\u2014', highlight: true },
                    ].map(({ label, value, highlight }) => (
                      <div key={label} style={{ padding: '16px', background: highlight && prepayExtra > 0 ? C.paleLime : '#f8f9f9', border: `1px solid ${highlight && prepayExtra > 0 ? C.lime2 : C.border}`, borderRadius: 10 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: C.ink3, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{label}</div>
                        <div style={{ fontSize: mobile ? 16 : 20, fontWeight: 800, color: highlight && prepayExtra > 0 ? '#1f7a58' : C.ink, fontFamily: INTER }}>{value}</div>
                      </div>
                    ))}
                  </div>

                  {prepayExtra > 0 && (
                    <div style={{ marginTop: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: 200, padding: '14px 18px', background: '#f8f9f9', border: `1px solid ${C.border}`, borderRadius: 10 }}>
                        <div style={{ fontSize: 11, color: C.ink3, marginBottom: 4 }}>Without prepayment</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>Total interest: {fmtC(originalInterest)} over {months} mo</div>
                      </div>
                      <div style={{ flex: 1, minWidth: 200, padding: '14px 18px', background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 10 }}>
                        <div style={{ fontSize: 11, color: C.dark, marginBottom: 4 }}>With {fmtIN(prepayExtra)} extra/month</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#1f7a58' }}>Total interest: {fmtC(prepayResult.totalInt)} over {prepayResult.newMonths} mo</div>
                      </div>
                    </div>
                  )}

                  <p style={{ fontSize: 11, color: C.ink3, margin: '14px 0 0', lineHeight: 1.6 }}>
                    Assumes extra payment is applied directly to principal each month. Per RBI guidelines, floating-rate personal loans allow foreclosure without penalty. Check your loan agreement for prepayment terms.
                  </p>
                </div>
              )}
            </div>

            {/* ── PROCESSING FEE & TRUE COST ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 18 }}>
              <button onClick={() => setShowTrueCost(v => !v)}
                aria-expanded={showTrueCost} aria-controls="true-cost-panel"
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '20px 48px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                <div style={{ minWidth: 0, textAlign: 'left' }}>
                  <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: showTrueCost ? C.dark : C.ink, display: 'block' }}>True Cost of Your Loan</span>
                  <span style={{ fontSize: 12, color: C.ink3, marginTop: 2, display: 'block' }}>EMI + processing fee + GST: what you actually pay</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={showTrueCost ? C.dark : C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: showTrueCost ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s, stroke 0.2s', flexShrink: 0 }} aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {showTrueCost && (
                <div id="true-cost-panel" style={{ borderTop: `1px solid ${C.border}`, padding: mobile ? '20px 18px' : '24px 48px' }}>
                  <p style={{ fontSize: 12.5, color: C.ink3, margin: '0 0 16px' }}>
                    Processing fee: <strong style={{ color: C.ink }}>{processingFee.toFixed(1)}%</strong> ({fmtC(amount * processingFee / 100)}). Adjust this under <strong style={{ color: C.ink }}>More settings</strong> above.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 12, marginTop: 8 }}>
                    {[
                      { label: 'Principal',        value: fmtC(amount),             sub: 'loan amount' },
                      { label: 'Total Interest',   value: fmtC(originalInterest),   sub: 'over tenure' },
                      { label: 'Processing + GST', value: fmtC(processingFeeAmt + gstOnFee), sub: `${processingFee}% + 18% GST` },
                      { label: 'True Total Cost',  value: fmtC(trueTotalCost),       sub: 'everything included', highlight: true },
                    ].map(({ label, value, sub, highlight }) => (
                      <div key={label} style={{ padding: '14px', background: highlight ? C.paleLime : '#f8f9f9', border: `1px solid ${highlight ? C.lime2 : C.border}`, borderRadius: 10 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: C.ink3, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>{label}</div>
                        <div style={{ fontSize: mobile ? 14 : 16, fontWeight: 800, color: highlight ? '#1f7a58' : C.ink }}>{value}</div>
                        <div style={{ fontSize: 10, color: C.ink3, marginTop: 3 }}>{sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── LOAN AFFORDABILITY CHECK ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 18 }}>
              <button onClick={() => setShowAfford((v: boolean) => !v)}
                aria-expanded={showAfford as boolean} aria-controls="afford-panel"
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '20px 48px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                <div style={{ minWidth: 0, textAlign: 'left' }}>
                  <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.ink, display: 'block' }}>Can You Afford This Loan?</span>
                  <span style={{ fontSize: 12, color: C.ink3, marginTop: 2, display: 'block' }}>Check eligibility based on your monthly income</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: showAfford ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {showAfford && (
                <div id="afford-panel" style={{ borderTop: `1px solid ${C.border}`, padding: mobile ? '20px 18px' : '36px 48px' }}>
                  <Slider label="Monthly In-Hand Income" id="monthly-income" value={monthlyIncome} min={15000} max={500000} step={5000}
                    fmt={v => fmtIN(v)} onChange={setMonthlyIncome} compact={mobile} />
                  <Slider label="Existing EMI Obligations" id="existing-emi" value={existingEMI} min={0} max={100000} step={1000}
                    fmt={v => fmtIN(v)} onChange={setExistingEMI} compact={mobile} />
                  <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: 14 }}>
                    {[
                      { label: 'Max EMI Allowed',    value: fmtIN(maxEMIAllowed),   note: '50% FOIR rule' },
                      { label: 'Your Current EMI',   value: fmtIN(emi),             note: emi <= maxEMIAllowed ? '\u2713 Within limit' : '\u2717 Exceeds limit' },
                      { label: 'Max Loan Eligible',  value: fmtC(affordableAmt),    note: `at ${rate}% for ${tenureYr} yr` },
                    ].map(({ label, value, note }) => (
                      <div key={label} style={{ padding: '14px', background: '#f8f9f9', border: `1px solid ${C.border}`, borderRadius: 10 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: C.ink3, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>{label}</div>
                        <div style={{ fontSize: mobile ? 15 : 17, fontWeight: 800, color: C.ink }}>{value}</div>
                        <div style={{ fontSize: 11, color: note.startsWith('\u2713') ? '#1f7a58' : note.startsWith('\u2717') ? '#C0392B' : C.ink3, marginTop: 4, fontWeight: note.startsWith('\u2713') || note.startsWith('\u2717') ? 600 : 400 }}>{note}</div>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: 11, color: C.ink3, margin: '14px 0 0', lineHeight: 1.6 }}>
                    Based on 50% FOIR (Fixed Obligation to Income Ratio). Most banks use 40-55% FOIR for personal loans. A higher credit score may allow a higher FOIR.
                  </p>
                </div>
              )}
            </div>

            {/* WAITLIST + CA CTA */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>


            {/* ════════════════════ ARTICLE ════════════════════ */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              {/* ── Section 1: What Is ── */}
              <div style={sec} id="what-is-emi-calculator">
                <h2 style={h2}>What Is a Personal Loan EMI Calculator?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    A Personal Loan EMI Calculator is an online tool that computes the Equated Monthly Instalment (EMI) you pay on an unsecured personal loan, based on three inputs: loan amount, interest rate, and tenure.
                  </p>
                </div>
                <p style={p}>
                  Personal loans are the most widely used unsecured credit product in the Indian debt market. Per <a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>RBI</a> data, outstanding personal loans crossed Rs 50 lakh crore in FY2025, growing at over 15% annually. The unsecured nature makes them accessible without pledging collateral, but the interest rates are higher than secured loans like home or car loans.
                </p>
                <p style={p}>
                  Before borrowing, the most critical number to determine is your monthly EMI. This calculator goes beyond basic EMI computation. It includes a prepayment savings tool, a true cost calculator that factors in processing fees and GST, an affordability check based on FOIR, and a 10-bank interest rate comparison, all designed to help you make an informed borrowing decision.
                </p>
              </div>

              {/* ── Section 2: Formula ── */}
              <div style={sec} id="emi-formula">
                <h2 style={h2}>Personal Loan EMI Formula: How to Calculate EMI</h2>
                <p style={p}>
                  The EMI formula is the standard reducing balance method used by every bank and NBFC in India. It calculates equal monthly payments that cover both principal repayment and interest charges over the loan tenure.
                </p>
                <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, fontFamily: 'monospace', margin: '0 0 16px', padding: '12px 0', background: '#f8f9f9', borderRadius: 8, textAlign: 'center', border: `1px solid ${C.border}` }}>
                  EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 14px', textAlign: 'left' }}>Variables in the EMI formula</caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Variable</th>
                        <th scope="col" style={thS}>Meaning</th>
                        <th scope="col" style={thS}>Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { v: 'P', m: 'Principal loan amount', ex: 'Rs 10,00,000' },
                        { v: 'R', m: 'Monthly interest rate (Annual Rate / 12 / 100)', ex: '11% / 12 / 100 = 0.00917' },
                        { v: 'N', m: 'Loan tenure in months', ex: '5 years = 60 months' },
                        { v: 'EMI', m: 'Equated Monthly Instalment', ex: 'Rs 21,742' },
                      ].map((row, i) => (
                        <tr key={i}>
                          <td style={{ ...tdR, fontWeight: 700 }}>{row.v}</td>
                          <td style={tdL}>{row.m}</td>
                          <td style={tdR}>{row.ex}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, fontWeight: 600, color: C.ink }}>Worked Example: Rs 10 Lakh at 11% for 5 Years</p>
                <div style={bullet}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>P:</strong> Rs 10,00,000</span></div>
                <div style={bullet}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>R:</strong> 11% / 12 / 100 = 0.009167 per month</span></div>
                <div style={bullet}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>N:</strong> 5 years x 12 = 60 months</span></div>
                <div style={bullet}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>EMI:</strong> [10,00,000 x 0.009167 x (1.009167)^60] / [(1.009167)^60 - 1] = Rs 21,742</span></div>
                <div style={bullet}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Total Interest:</strong> (Rs 21,742 x 60) - Rs 10,00,000 = Rs 3,04,526</span></div>
                <div style={bullet}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Total Repayment:</strong> Rs 13,04,526</span></div>
              </div>

              {/* ── Section 3: Excel Formula ── */}
              <div style={sec} id="emi-formula-excel">
                <h2 style={h2}>Personal Loan EMI Formula in Excel and Google Sheets</h2>
                <p style={p}>
                  Excel and Google Sheets have a built-in PMT function that calculates EMI directly. Three methods work:
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 14px', textAlign: 'left' }}>Three methods to calculate personal loan EMI in Excel</caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Method</th>
                        <th scope="col" style={thS}>Formula</th>
                        <th scope="col" style={thS}>Example (Rs 5L, 11%, 5 yr)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { method: 'PMT Function', formula: '=PMT(rate/12, months, -principal)', example: '=PMT(11%/12, 60, -500000) = Rs 10,871' },
                        { method: 'Manual Formula', formula: '=P*(R*(1+R)^N)/((1+R)^N-1)', example: '=500000*(0.00917*(1.00917)^60)/((1.00917)^60-1)' },
                        { method: 'IPMT + PPMT', formula: 'Interest: =IPMT(...), Principal: =PPMT(...)', example: 'Use for month-by-month breakdown' },
                      ].map((row, i) => (
                        <tr key={i}>
                          <td style={tdR}>{row.method}</td>
                          <td style={{ ...tdL, fontFamily: 'monospace', fontSize: 12 }}>{row.formula}</td>
                          <td style={tdL}>{row.example}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The PMT function is the simplest. Enter a negative principal amount (the minus sign tells Excel that money is flowing out). The result is your monthly EMI. For a full amortization schedule in Excel, use IPMT and PPMT functions in adjacent columns for each month.
                </p>
              </div>

              {/* ── Section 4: Bank Comparison ── */}
              <div style={sec} id="bank-comparison">
                <h2 style={h2}>Personal Loan Interest Rates: 10 Banks Compared (June 2026)</h2>
                <p style={p}>
                  Interest rates for personal loans in India range from 10.49% to 12.05% p.a. across major banks and NBFCs. Your actual rate depends on credit score, employer category, income, and existing relationship with the lender. Below is a comparison of starting rates, processing fees, and maximum loan amounts.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 14px', textAlign: 'left' }}>Personal loan interest rates and fees across 10 lenders. Rates are indicative minimums as of June 2026.</caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Bank / NBFC</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Starting Rate (p.a.)</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Processing Fee</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Max Loan Amount</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>EMI per Rs 1 Lakh (5 yr)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {BANK_RATES.map((b, i) => {
                        const emiPer1L = calcEMI(100000, b.rate, 60);
                        return (
                          <tr key={b.name} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={tdR}>{b.name}</td>
                            <td style={{ ...tdL, textAlign: 'right' }}>{b.rate.toFixed(2)}%</td>
                            <td style={{ ...tdL, textAlign: 'right' }}>{b.processing}</td>
                            <td style={{ ...tdL, textAlign: 'right' }}>Rs {b.maxAmount}</td>
                            <td style={{ ...tdR, textAlign: 'right' }}>Rs {Math.round(emiPer1L).toLocaleString('en-IN')}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, fontSize: 13, color: C.ink3 }}>* Rates are indicative starting rates and subject to change based on the lender&#39;s policies. Verify current rates on the bank&#39;s official website.</p>
              </div>

              {/* ── Section 5: EMI Chart ── */}
              <div style={sec} id="emi-chart">
                <h2 style={h2}>Personal Loan EMI Chart: Rs 50,000 to Rs 50 Lakh</h2>
                <p style={p}>
                  This quick reference chart shows monthly EMI for common personal loan amounts at a standard 11% p.a. interest rate across five different tenures. Use the calculator above to check EMI for any custom amount and rate.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 14px', textAlign: 'left' }}>Personal loan EMI chart at 11% p.a. across different tenures</caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Loan Amount</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>1 Year</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>2 Years</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>3 Years</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>5 Years</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>7 Years</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[50000, 100000, 200000, 500000, 1000000, 2000000, 5000000].map((amt, i) => (
                        <tr key={amt} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>Rs {amt >= 100000 ? `${(amt / 100000).toFixed(0)} Lakh` : (amt / 1000).toFixed(0) + 'K'}</td>
                          {[12, 24, 36, 60, 84].map(m => (
                            <td key={m} style={{ ...tdL, textAlign: 'right' }}>Rs {Math.round(calcEMI(amt, 11, m)).toLocaleString('en-IN')}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ── Section 6: Eligibility ── */}
              <div style={sec} id="eligibility">
                <h2 style={h2}>Personal Loan Eligibility: FOIR, Credit Score & Income Requirements</h2>
                <p style={p}>
                  Banks assess personal loan eligibility based on three factors: your monthly income, existing debt obligations (FOIR), and credit score. Use the affordability tool above to check your eligibility instantly.
                </p>
                <div style={bullet}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>FOIR Rule:</strong> Most banks require total monthly EMIs (including the new loan) to be below 50% of your net monthly income. Some banks allow up to 55% for borrowers with high credit scores. Check your own ratio on the <Link href="/calculators/debt-to-income-ratio-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Debt-to-Income Ratio Calculator</Link>.</span></div>
                <div style={bullet}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Credit Score:</strong> A CIBIL score of 750+ gets you the best rates. Scores between 700-750 get approval at slightly higher rates. Below 700, approval chances drop significantly with major banks. Track and understand your score with the <Link href="/calculators/credit-health-score-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Credit Health Score Calculator</Link>.</span></div>
                <div style={bullet}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Minimum Income:</strong> SBI requires Rs 15,000/month, HDFC Bank requires Rs 25,000/month, and ICICI Bank requires Rs 17,500/month for salaried applicants. Self-employed applicants typically need higher income thresholds.</span></div>
                <div style={bullet}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Age:</strong> Most banks accept applicants between 21-60 years (salaried) and 25-65 years (self-employed). The loan tenure cannot extend beyond retirement age.</span></div>
                <div style={bullet}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Employment Stability:</strong> Salaried applicants need at least 1-2 years of work experience and 6 months with the current employer. Self-employed applicants need 2-3 years of business vintage.</span></div>
              </div>

              {/* ── Section 7: Prepayment Guide ── */}
              <div style={sec} id="prepayment-guide">
                <h2 style={h2}>How Prepayment Reduces Your Personal Loan Interest</h2>
                <p style={p}>
                  Prepaying even a small amount each month can save significant interest over the loan tenure. Per <a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>RBI</a> guidelines issued in 2014, banks cannot charge prepayment or foreclosure penalties on floating-rate personal loans.
                </p>
                <p style={p}>
                  Consider a Rs 10 lakh loan at 11% for 5 years. The standard EMI is Rs 21,742 with total interest of Rs 3,04,526. If you pay an extra Rs 5,000 per month, the loan closes in approximately 45 months instead of 60, saving Rs 77,000+ in interest. That is a 25% reduction in interest cost for a 23% increase in monthly payment.
                </p>
                <p style={p}>
                  The prepayment tool above lets you test different extra payment amounts. For fixed-rate personal loans, check your loan agreement for prepayment charges. These typically range from 2-5% of the outstanding principal.
                </p>
              </div>

              {/* ── Section 8: True Cost ── */}
              <div style={sec} id="true-cost">
                <h2 style={h2}>True Cost of a Personal Loan: Beyond the Interest Rate</h2>
                <p style={p}>
                  The advertised interest rate tells only part of the story. The actual cost of borrowing includes processing fees, GST on those fees, and insurance charges (if applicable). The true cost calculator above factors in these hidden costs.
                </p>
                <div style={bullet}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Processing Fee:</strong> Ranges from 0.5% to 3% of the loan amount. On a Rs 10 lakh loan, a 2% processing fee means Rs 20,000 upfront.</span></div>
                <div style={bullet}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>GST on Processing Fee:</strong> 18% GST applies on the processing fee. On a Rs 20,000 processing fee, GST adds Rs 3,600.</span></div>
                <div style={bullet}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Insurance Premium:</strong> Some banks bundle loan protection insurance. While optional per <a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>RBI</a> guidelines, branch staff sometimes present it as mandatory. You can decline it.</span></div>
                <div style={bullet}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Late Payment Charges:</strong> Banks charge 2-3% per month on overdue EMIs. Automate your payments through NACH or standing instruction to avoid this.</span></div>
              </div>

              {/* ── Section 9: Amortization ── */}
              <div style={sec} id="amortization-guide">
                <h2 style={h2}>Personal Loan Amortization Schedule: Principal vs Interest Breakdown</h2>
                <p style={p}>
                  Every EMI payment consists of two components: principal repayment and interest charged. An amortization schedule breaks down this composition across your entire loan tenure, month by month and year by year.
                </p>
                <p style={p}>
                  During the first few months, the majority of your EMI goes towards interest because the outstanding principal is at its highest. As you continue paying, the principal gradually decreases. This means the interest component shrinks and a larger portion of each EMI starts reducing your principal.
                </p>
                <p style={p}>
                  For a Rs 10 lakh loan at 11% for 5 years: in Month 1, Rs 9,167 goes to interest and Rs 12,575 to principal. By Month 55, interest drops to Rs 1,170 and principal rises to Rs 20,572. You can view your complete amortization schedule by expanding the details section in the calculator above.
                </p>
              </div>

              {/* ── Section 10: Loan Comparison ── */}
              <div style={sec} id="loan-comparison">
                <h2 style={h2}>Personal Loan vs Other Loan Types: Which Is Right for You?</h2>
                <p style={p}>
                  A personal loan is not always the cheapest borrowing option. If the purpose of borrowing fits a specific loan category, you may get a lower interest rate and longer tenure. Here is how personal loans compare with other credit products available in India:
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 14px', textAlign: 'left' }}>Comparison of personal loan with other loan types in India</caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Feature</th>
                        <th scope="col" style={thS}>Personal Loan</th>
                        <th scope="col" style={thS}>Home Loan</th>
                        <th scope="col" style={thS}>Gold Loan</th>
                        <th scope="col" style={thS}>Credit Card Loan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { f: 'Interest Rate', pl: '10.5-24%', hl: '8.5-10.5%', gl: '7-12%', cl: '15-42%' },
                        { f: 'Collateral', pl: 'None (unsecured)', hl: 'Property', gl: 'Gold jewellery', cl: 'None' },
                        { f: 'Max Tenure', pl: '5-7 years', hl: '30 years', gl: '1-3 years', cl: '5 years' },
                        { f: 'Processing Time', pl: '1-3 days', hl: '7-15 days', gl: 'Same day', cl: 'Instant' },
                        { f: 'Tax Benefit', pl: 'Limited', hl: 'Sec 24 + 80C', gl: 'None', cl: 'None' },
                        { f: 'Best For', pl: 'Any personal need', hl: 'Property purchase', gl: 'Short-term needs', cl: 'Small purchases' },
                      ].map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>{row.f}</td>
                          <td style={tdL}>{row.pl}</td>
                          <td style={tdL}>{row.hl}</td>
                          <td style={tdL}>{row.gl}</td>
                          <td style={tdL}>{row.cl}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  If you need funds for home renovation, a <Link href="/calculators/home-loan-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>home improvement loan</Link> at 8.5-10% is cheaper than a personal loan at 10.5%+. For short-term needs under Rs 5 lakh, a <Link href="/calculators/gold-loan-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>gold loan</Link> may offer lower rates if you have jewellery to pledge.
                </p>
              </div>

              <div style={sec} id="tax-benefits">
                <h2 style={h2}>Does a personal loan have any tax benefit?</h2>
                <p style={p}>
                  As a rule, no. Unlike a home loan, a personal loan taken for personal use (a wedding, travel, medical expenses, or debt consolidation) offers no deduction under the Income Tax Act.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  The two real exceptions: if you can prove the loan was used for home renovation or purchase, the interest paid can be claimed under Section 24(b) the same way a home loan's interest would be; and if it was used for business purposes, the interest is deductible as a business expense against that income. Both require documentation proving how the funds were actually used, not just the loan's stated purpose at sanction. Model the effect on your total tax liability with the <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</Link>.
                </p>
              </div>

              <div style={sec} id="credit-score-impact">
                <h2 style={h2}>How a personal loan affects your credit score</h2>
                <p style={p}>
                  Applying for a personal loan triggers a hard inquiry on your credit report, which typically causes a small, temporary dip in your score. Multiple applications in a short window compound this, since lenders read it as credit-hungry behaviour.
                </p>
                <p style={p}>
                  Once approved, the loan itself can help your score over time: on-time EMI payments build a positive repayment history, and adding an unsecured loan to a credit mix that is otherwise all credit cards can improve your credit mix score component.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  A missed or late EMI has the opposite, larger effect, and is reported to credit bureaus within the same cycle. Since a personal loan is unsecured, lenders weigh repayment discipline on it heavily when you apply for credit again later.
                </p>
              </div>

              {/* ── Section 11: How to Use ── */}
              <div style={sec} id="how-to-use">
                <h2 style={h2}>How to Use This Personal Loan EMI Calculator</h2>
                <p style={p}>
                  This calculator provides five tools in one page. Here is how to use each:
                </p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>EMI Calculator:</strong> Enter your loan amount, interest rate, and tenure. The monthly EMI, total interest, and total payable amount appear instantly with a principal vs interest donut chart.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Amortization Schedule:</strong> Click "Your Amortization Details" to see the year-by-year (or month-by-month on mobile) breakdown of how each EMI splits between principal and interest.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Prepayment Savings:</strong> Expand the prepayment section and adjust the extra monthly payment slider. See how many months you save and how much interest you avoid.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>True Cost:</strong> Adjust the processing fee percentage to see the actual total cost of your loan including the upfront fee and 18% GST on it.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Affordability Check:</strong> Enter your monthly income and existing EMIs. The tool shows your maximum eligible loan amount based on the 50% FOIR rule used by most banks.
                  </li>
                </ol>
              </div>

              

              {/* ── Section 12: FAQs ── */}
              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2}>Frequently Asked Questions (FAQs)</h2>
                <FAQ />
              </div>

              {/* ── Disclaimer ── */}
              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All calculations on this page are indicative only. EMI is computed using the standard reducing balance method and may differ from the actual EMI quoted by your bank due to rounding, day-count conventions, or additional charges. Interest rates shown are indicative starting rates as of June 2026 and are subject to change. This calculator is for educational and planning purposes only and does not constitute financial advice. Consult a SEBI-registered investment adviser or your bank before making borrowing decisions.
                </p>
              </div>
            </article>

          </div>

          {/* SIDEBAR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Bank Rate Comparison */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>Compare Bank Rates</div>
                <div style={{ fontSize: 11, color: C.ink3, marginTop: 3 }}>EMI for your {fmtC(amount)} · {months} mo loan</div>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f4f5f6' }}>
                    {['Bank', 'Rate', 'EMI/mo'].map(h => (
                      <th key={h} scope="col" style={{ padding: '9px 14px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: C.ink3, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {BANK_RATES.slice(0, 5).map((b, i) => {
                    const bankEMI = calcEMI(amount, b.rate, months);
                    const isLower = bankEMI < emi;
                    return (
                      <tr key={b.name} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                        <td style={{ padding: '10px 14px', fontSize: 13, fontWeight: 600, color: C.ink }}>{b.name}</td>
                        <td style={{ padding: '10px 14px', fontSize: 12, color: C.ink2 }}>{b.rate}%</td>
                        <td style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: isLower ? '#1f7a58' : C.ink }}>{fmtIN(bankEMI)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div style={{ padding: '10px 14px', borderTop: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 10, color: C.ink3 }}>Indicative minimum rates. Actual rates depend on credit score & profile.</span>
              </div>
            </div>

            <nav aria-label="Related Calculators">
              <SidebarList title="Popular Calculators" items={POPULAR} />
              <div style={{ marginTop: 16 }}>
                <SidebarList title="More Calculators" items={MORE} />
              </div>
            </nav>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/percentage-calculator|%', '/calculators/gst-calculator|GST', '/calculators/loan-calculator|Loan', '/calculators/sip-calculator|SIP', '/calculators/emi-calculator|EMI', '/calculators/personal-loan-calculator|Personal Loan', '/calculators/home-loan-calculator|Home Loan', '/calculators/car-loan-calculator|Car Loan', '/calculators/fd-calculator|FD'] },
        { hd: 'Topics', links: ['/#|Mutual Funds', '/#|Home Loans', '/#|Fixed Deposits', '/#|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} />
    </div>
  );
}

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

/* Palette */
const C = {
  dark: '#101214', lime: '#a6dbc4', lime2: '#2d9970', paleLime: '#f4f5f6',
  ink: '#16140F', ink2: '#50565c', ink3: '#7a8087', white: '#ffffff',
  bg: '#f6f7f8', border: '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

/* Math helpers */
function calcEMI(p: number, r: number, n: number): number {
  if (n === 0 || p === 0) return 0;
  if (r === 0) return p / n;
  const m = r / 12 / 100;
  return (p * m * Math.pow(1 + m, n)) / (Math.pow(1 + m, n) - 1);
}

function monthsRemainingCalc(balance: number, rate: number, emi: number): number {
  const m = rate / 12 / 100;
  if (m === 0) return emi > 0 ? Math.ceil(balance / emi) : 999;
  const denom = emi - balance * m;
  if (denom <= 0) return 999;
  return Math.ceil(Math.log(emi / denom) / Math.log(1 + m));
}

/* Slider */
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

/* SidebarList */
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

/* Donut Chart: Principal vs Current Remaining Interest */
function DonutChart({ principal, interest }: { principal: number; interest: number }) {
  const total = principal + interest;
  if (total === 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const pArc = (principal / total) * circ;
  const pPct = Math.round((principal / total) * 100);
  return (
    <svg role="img" aria-label={`Debt split: ${pPct}% principal, ${100 - pPct}% remaining interest at current rates`}
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

/* DebtField: click-to-edit inline number field */
function DebtField({ label, value, display, onEdit, placeholder }: {
  label: string; value: number; display: string; onEdit: (v: number) => void; placeholder?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n) && n >= 0) onEdit(n);
  };
  return (
    <div>
      <div style={{ fontSize: 11, color: C.ink3, marginBottom: 4, fontFamily: INTER }}>{label}</div>
      {editing ? (
        <input
          autoFocus type="text" value={raw}
          aria-label={`Enter ${label}`}
          placeholder={placeholder}
          onChange={e => setRaw(e.target.value)}
          onBlur={commit}
          onKeyDown={e => e.key === 'Enter' && commit()}
          style={{ width: '100%', fontSize: 13, fontWeight: 600, color: C.dark, background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 6, padding: '6px 8px', outline: 'none', fontFamily: INTER, boxSizing: 'border-box' }}
        />
      ) : (
        <button
          onClick={() => { setRaw(String(value)); setEditing(true); }}
          aria-label={`${label}: ${display}. Click to edit.`}
          onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
          onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}
          style={{ width: '100%', fontSize: 13, fontWeight: 600, color: C.dark, background: C.white, border: `1px solid ${C.border}`, borderRadius: 6, padding: '6px 8px', cursor: 'pointer', fontFamily: INTER, textAlign: 'left', transition: 'border-color 0.15s', boxSizing: 'border-box' }}
        >
          {display}
        </button>
      )}
    </div>
  );
}

const POPULAR = [
  { href: '/calculators/debt-snowball-calculator', label: 'Debt Snowball Calculator' },
  { href: '/calculators/debt-avalanche-calculator', label: 'Debt Avalanche Calculator' },
  { href: '/calculators/debt-to-income-ratio-calculator', label: 'Debt-to-Income Ratio Calculator' },
  { href: '/calculators/personal-loan-calculator', label: 'Personal Loan EMI Calculator' },
  { href: '/calculators/credit-card-interest-calculator', label: 'Credit Card Interest Calculator' },
  { href: '/calculators/balance-transfer-savings-calculator', label: 'Balance Transfer Savings' },
];
const MORE = [
  { href: '/calculators/credit-utilization-calculator', label: 'Credit Utilization Calculator' },
  { href: '/calculators/emi-calculator', label: 'EMI Calculator' },
  { href: '/calculators/income-tax-calculator', label: 'Income Tax Calculator' },
  { href: '/calculators/loan-prepayment-calculator', label: 'Loan Prepayment Calculator' },
  { href: '/calculators/fd-calculator', label: 'FD Calculator' },
];

/* FAQ */
const FAQS = [
  { q: 'What is debt consolidation?', a: 'Debt consolidation is the process of combining multiple loans and credit card balances into a single new loan, typically at a lower interest rate. Instead of paying 3 to 5 separate EMIs with different due dates, a borrower takes one personal loan, pays off all existing debts, and makes a single monthly payment on the consolidation loan.' },
  { q: 'How does a debt consolidation calculator work?', a: 'A debt consolidation calculator takes your current debt balances, interest rates, and monthly payments, then computes the new EMI at a single lower rate. It shows monthly savings (the difference between your current total EMI and the new EMI), total interest saved over the life of the consolidation loan, and how many months until the 1% processing fee is recovered.' },
  { q: 'Is debt consolidation a good idea in India?', a: 'Yes, debt consolidation is a good idea in India when your existing debts include credit cards at 36% to 42% p.a. or personal loans at 18% to 24% p.a. Replacing them with a personal loan at 10.5% to 14% p.a. typically saves 40% to 60% of remaining interest while reducing the monthly EMI. The break-even period on the processing fee is usually under 3 months.' },
  { q: 'What is the interest rate for debt consolidation loan in India?', a: 'Personal loan rates for debt consolidation in India range from 10.50% to 14% p.a. from major banks such as HDFC Bank (10.50%), SBI (11.45%), ICICI Bank (10.75%), and Axis Bank (11.25%) for salaried borrowers with a CIBIL score above 750. NBFC rates typically start at 14% to 18%.' },
  { q: 'Which debts can be consolidated?', a: 'Credit card balances, personal loans, consumer durable loans, and buy-now-pay-later debt can all be consolidated into a single personal loan. Home loans and car loans at 8% to 10% p.a. should not be included because a personal loan at 12% to 14% would increase rather than reduce the interest cost on those debts.' },
  { q: 'How much can I save by consolidating debt?', a: 'Savings depend on the gap between your current weighted average rate and the consolidation rate. Consolidating Rs 3.3 lakh of credit card and personal loan debt from a weighted average rate of 26% into a loan at 12% for 3 years reduces monthly payments from Rs 13,000 to Rs 10,961 and saves approximately Rs 89,400 in total interest.' },
  { q: 'Does debt consolidation hurt your credit score?', a: 'Debt consolidation causes a minor credit score dip of 5 to 10 points initially from the hard inquiry on your credit report. Over 6 to 12 months, closing high-utilization card accounts and making regular EMI payments on the consolidation loan typically improves the score by 30 to 60 points, producing a net positive outcome.' },
  { q: 'What is the difference between debt consolidation and balance transfer?', a: 'Debt consolidation uses a personal loan to pay off multiple debt types (cards, personal loans, consumer loans) and is suitable for large balances and longer tenures up to 5 years. A balance transfer moves a credit card balance to another card with a lower or 0% introductory rate for 3 to 12 months and works best for purely card debt that can be cleared within the promotional window.' },
  { q: 'Can I consolidate credit card debt with a personal loan?', a: 'Yes. Personal loans are the most common instrument for credit card debt consolidation in India. A Rs 3 lakh card balance at 36% p.a. replaced with a personal loan at 12% for 3 years saves over Rs 80,000 in interest and converts unpredictable minimum-payment obligations into a fixed monthly EMI.' },
  { q: 'What is the minimum CIBIL score for a debt consolidation loan?', a: 'Most banks require a minimum CIBIL score of 700 to approve a personal loan for debt consolidation. A score of 750 or above qualifies for the best rates, typically 10.50% to 11.25%. Scores between 650 and 700 face rates of 14% to 18%, which still beats credit card rates of 36% to 42% but reduces the total saving.' },
  { q: 'Which bank offers the best debt consolidation loan in India?', a: 'HDFC Bank offers the most competitive consolidation loan rate at 10.50% p.a. for top-tier salaried borrowers. SBI and ICICI Bank follow at 11.45% and 10.75% respectively. Bajaj Finance often processes approvals faster with pre-approved offers at rates starting from 11% p.a. The best lender depends on your salary account, CIBIL score, and employer category.' },
  { q: 'How long does debt consolidation take?', a: 'A debt consolidation loan is typically disbursed within 2 to 7 working days of approval for salaried borrowers with pre-approved offers. Applications with full documentation at a lender where you maintain a salary account often complete in 24 to 48 hours. Total debt clearance happens immediately upon disbursement when funds are used to close existing accounts.' },
  { q: 'What documents do I need for a debt consolidation loan?', a: 'You need PAN, Aadhaar, the last 3 months of salary slips, 6 months of bank statements, Form 16, and statements of all debts you intend to consolidate. Some banks also require the latest credit card statements showing the outstanding balance and a letter requesting foreclosure of existing loans.' },
  { q: 'Is it better to pay off debt or consolidate?', a: 'Paying off debt in full is better if you have savings earning less than your current debt interest rate and sufficient savings to clear the debt entirely. Consolidation is better when you are juggling multiple high-rate debts that cannot be cleared with available savings, when monthly cash flow is the constraint, or when the total interest saving exceeds what you would earn by keeping those funds invested.' },
  { q: 'What is the processing fee for a debt consolidation loan in India?', a: 'Processing fees for personal loans used in debt consolidation range from 0.5% to 2% of the loan amount. At 1%, a Rs 3 lakh consolidation loan carries a Rs 3,000 fee. This calculator includes a break-even calculation showing how many months of EMI savings are needed to recover that fee, typically 1 to 3 months for credit card consolidation scenarios.' },
  { q: 'Can self-employed borrowers get a debt consolidation loan in India?', a: 'Yes, but banks apply stricter criteria. Self-employed applicants need 3 years of ITR showing stable net profit, 2 years of GST returns, and CA-certified financials. FOIR is usually capped at 40% to 45%. Rates are typically 0.5% to 1% higher than for salaried borrowers with equivalent credit profiles.' },
  { q: 'What happens to credit cards after debt consolidation?', a: 'After consolidation, it is advisable to close high-fee credit cards to avoid accumulating new balances on accounts now paid off. However, keeping one card with a low credit limit active and paying it off monthly helps maintain credit utilization metrics and the age of your credit history, both of which support your CIBIL score.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them any time. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* Article helper styles */
const h2S: React.CSSProperties = { fontSize: 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' };
const pS: React.CSSProperties = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' };
const secS: React.CSSProperties = { margin: '0 0 40px' };
const bulletS: React.CSSProperties = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 };
const thS: React.CSSProperties = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', verticalAlign: 'middle', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' };
const tdL: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'left', border: `1px solid ${C.border}`, verticalAlign: 'middle' };
const tdR: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, textAlign: 'left', border: `1px solid ${C.border}`, verticalAlign: 'middle' };
const tdC: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'center', border: `1px solid ${C.border}`, verticalAlign: 'middle' };

/* CA CTA Component (standard, shared) */

/* Types */
type Debt = {
  id: number;
  name: string;
  balance: number;
  rate: number;
  emi: number;
};

const defaultSettings = {
  debts: [
    { id: 1, name: 'Credit Card 1', balance: 80000, rate: 36, emi: 4000 },
    { id: 2, name: 'Personal Loan', balance: 200000, rate: 18, emi: 6000 },
    { id: 3, name: 'Credit Card 2', balance: 50000, rate: 42, emi: 3000 },
  ] as Debt[],
  newRate: 12,
  newTenure: 36,
};

/* Main Component */
export default function DebtConsolidationClient() {
  const { settings, updateSettings } = useCalculatorSettings('debt-consolidation', defaultSettings);
  const { debts, newRate, newTenure } = settings;

  const [mobile, setMobile] = useState(false);
  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk();
    window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  /* Derived calculations */
  const totalBalance = useMemo(() => debts.reduce((s, d) => s + d.balance, 0), [debts]);
  const currentMonthlyPayment = useMemo(() => debts.reduce((s, d) => s + d.emi, 0), [debts]);

  const currentRemainingInterest = useMemo(() => debts.reduce((s, d) => {
    const months = monthsRemainingCalc(d.balance, d.rate, d.emi);
    return s + Math.max(0, d.emi * months - d.balance);
  }, 0), [debts]);

  const weightedAvgRate = useMemo(() => {
    if (totalBalance === 0) return 0;
    return debts.reduce((s, d) => s + d.rate * d.balance, 0) / totalBalance;
  }, [debts, totalBalance]);

  const newEMI = useMemo(() => calcEMI(totalBalance, newRate, newTenure), [totalBalance, newRate, newTenure]);
  const newTotalInterest = newEMI * newTenure - totalBalance;
  const newTotalPayment = newEMI * newTenure;
  const monthlySavings = currentMonthlyPayment - newEMI;
  const totalInterestSavings = currentRemainingInterest - newTotalInterest;
  const processingFee = totalBalance * 0.01;
  const breakEvenMonths = monthlySavings > 0 ? Math.ceil(processingFee / monthlySavings) : null;
  const currentTotalPayment = totalBalance + currentRemainingInterest;

  const principalPct = currentTotalPayment > 0 ? Math.round((totalBalance / currentTotalPayment) * 100) : 0;

  /* Debt management */
  const addDebt = () => {
    if (debts.length >= 6) return;
    const newId = debts.length > 0 ? Math.max(...debts.map(d => d.id)) + 1 : 1;
    updateSettings({ debts: [...debts, { id: newId, name: `Debt ${newId}`, balance: 50000, rate: 24, emi: 2000 }] });
  };

  const removeDebt = (id: number) => {
    if (debts.length <= 1) return;
    updateSettings({ debts: debts.filter(d => d.id !== id) });
  };

  const updateDebtField = (id: number, field: keyof Debt, value: string | number) => {
    updateSettings({ debts: debts.map(d => d.id === id ? { ...d, [field]: value } : d) });
  };

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Debt Consolidation Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Add your current debts, set a new loan rate, and see exactly how much you save per month and in total interest.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* Calculator Card */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '32px 32px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>

                  {/* Panel header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Your Current Debts</p>
                    <CurrencySelector theme="light" />
                  </div>

                  {/* Debt cards */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12 }}>
                    {debts.map(debt => (
                      <div key={debt.id} style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 14px', background: C.white }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                          <input
                            type="text"
                            value={debt.name}
                            aria-label="Debt name"
                            onChange={e => updateDebtField(debt.id, 'name', e.target.value)}
                            style={{ fontSize: 13, fontWeight: 600, color: C.ink, background: 'transparent', border: 'none', outline: 'none', flex: 1, fontFamily: INTER, padding: 0 }}
                          />
                          {debts.length > 1 && (
                            <button
                              onClick={() => removeDebt(debt.id)}
                              aria-label={`Remove ${debt.name}`}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.ink3, fontSize: 16, padding: '0 0 0 8px', lineHeight: 1 }}
                            >
                              &times;
                            </button>
                          )}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                          <DebtField
                            label="Balance (Rs)"
                            value={debt.balance}
                            display={fmtIN(debt.balance)}
                            onEdit={v => updateDebtField(debt.id, 'balance', v)}
                          />
                          <DebtField
                            label="Rate (% p.a.)"
                            value={debt.rate}
                            display={`${debt.rate}%`}
                            onEdit={v => updateDebtField(debt.id, 'rate', v)}
                          />
                          <DebtField
                            label="Monthly EMI"
                            value={debt.emi}
                            display={fmtIN(debt.emi)}
                            onEdit={v => updateDebtField(debt.id, 'emi', v)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Debt Button */}
                  <button
                    onClick={addDebt}
                    disabled={debts.length >= 6}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: debts.length >= 6 ? C.ink3 : C.dark,
                      background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px',
                      cursor: debts.length >= 6 ? 'default' : 'pointer', fontFamily: INTER, fontWeight: 600, marginBottom: 20,
                    }}
                  >
                    + Add Debt {debts.length >= 6 ? '(max 6)' : ''}
                  </button>

                  {/* Divider */}
                  <div style={{ borderTop: `1px solid ${C.border}`, margin: '4px 0 20px' }} />

                  {/* Consolidation Loan section */}
                  <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 16px' }}>Consolidation Loan</p>

                  <Slider
                    id="new-rate"
                    label="New Interest Rate (% p.a.)"
                    value={newRate}
                    min={7}
                    max={24}
                    step={0.25}
                    display={`${newRate.toFixed(2)}%`}
                    onChange={v => updateSettings({ newRate: v })}
                    compact
                  />

                  <div>
                    <label style={{ display: 'block', fontSize: 14, color: C.ink2, fontWeight: 400, marginBottom: 8 }}>Loan Tenure</label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {[12, 24, 36, 48, 60].map(t => (
                        <button
                          key={t}
                          onClick={() => updateSettings({ newTenure: t })}
                          aria-pressed={newTenure === t}
                          style={{
                            padding: '6px 12px', fontSize: 13, background: C.white,
                            color: newTenure === t ? C.ink : C.ink3,
                            border: `${newTenure === t ? 1.5 : 1}px solid ${newTenure === t ? C.ink : C.border}`,
                            fontWeight: newTenure === t ? 700 : 500, borderRadius: 6, cursor: 'pointer',
                            fontFamily: INTER, transition: 'all 0.15s',
                          }}
                        >
                          {t}m
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Output Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '32px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  {/* Donut: principal vs current remaining interest */}
                  <div style={{ order: mobile ? 1 : -1, marginBottom: mobile ? 16 : 20 }}>
                    <DonutChart principal={totalBalance} interest={currentRemainingInterest} />
                  </div>

                  {/* Legend */}
                  <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 20, marginBottom: mobile ? 12 : 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Principal</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Current Interest</span>
                    </div>
                  </div>

                  {/* Primary result: Monthly Savings */}
                  <div style={{ width: '100%', background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 12, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 700, color: C.dark }}>Monthly Savings</span>
                    <span aria-live="polite" style={{ fontSize: mobile ? 20 : 26, fontWeight: 800, color: C.dark, letterSpacing: '-0.02em' }}>
                      {fmtC(Math.max(0, monthlySavings))}
                    </span>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: 'New Monthly EMI', value: fmtIN(Math.round(newEMI)) },
                    { label: 'Current monthly payment', value: fmtIN(currentMonthlyPayment) },
                    { label: 'Total interest saved', value: fmtC(Math.round(Math.max(0, totalInterestSavings))) },
                    { label: 'New total payment', value: fmtC(Math.round(newTotalPayment)) },
                    { label: 'Break-even period', value: breakEvenMonths ? `${breakEvenMonths} month${breakEvenMonths === 1 ? '' : 's'}` : (monthlySavings <= 0 ? 'No savings' : 'N/A') },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '11px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  {/* Repayment comparison bars */}
                  <div style={{ width: '100%', marginTop: 16 }}>
                    <div style={{ fontSize: 12, color: C.ink3, marginBottom: 10, fontWeight: 600 }}>Total Repayment</div>
                    {[
                      { label: 'Current', value: currentTotalPayment, color: C.ink3 },
                      { label: 'After consolidation', value: newTotalPayment, color: C.dark },
                    ].map(({ label, value, color }) => {
                      const maxVal = Math.max(currentTotalPayment, newTotalPayment, 1);
                      const pct = (value / maxVal) * 100;
                      return (
                        <div key={label} style={{ marginBottom: 8 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                            <span style={{ fontSize: 12, color: C.ink3 }}>{label}</span>
                            <span style={{ fontSize: 12, fontWeight: 600, color: C.ink }}>{fmtC(Math.round(value))}</span>
                          </div>
                          <div style={{ height: 6, borderRadius: 99, background: C.border }}>
                            <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 99, transition: 'width 0.4s ease' }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Principal split bar */}
                  <div style={{ width: '100%', marginTop: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Principal {principalPct}%</span>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Interest {100 - principalPct}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${principalPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                    <div style={{ fontSize: 11, color: C.ink3, marginTop: 4 }}>Share of current total debt (principal vs interest)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Before vs After Comparison Table */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', marginBottom: 24, boxShadow: '0 1px 12px rgba(16,18,20,0.05)' }}>
              <div style={{ padding: '16px 24px', borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>Before vs After Consolidation</div>
                <div style={{ fontSize: 12, color: C.ink3, marginTop: 3 }}>Live: updates as you change inputs above</div>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 20px 12px' }}>
                    Comparison of current debt situation versus the proposed consolidation loan.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" style={thS}>Metric</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Before</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>After Consolidation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { metric: 'Monthly payment', before: fmtIN(currentMonthlyPayment), after: fmtIN(Math.round(newEMI)) },
                      { metric: 'Weighted interest rate', before: `${weightedAvgRate.toFixed(1)}%`, after: `${newRate.toFixed(2)}%` },
                      { metric: 'Total remaining interest', before: fmtC(Math.round(currentRemainingInterest)), after: fmtC(Math.round(newTotalInterest)) },
                      { metric: 'Number of payments', before: `${debts.length} EMIs`, after: '1 EMI' },
                      { metric: 'Total outstanding', before: fmtC(Math.round(currentTotalPayment)), after: fmtC(Math.round(newTotalPayment)) },
                    ].map((row, i) => (
                      <tr key={row.metric} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                        <td style={tdR}>{row.metric}</td>
                        <td style={{ ...tdL, textAlign: 'right' }}>{row.before}</td>
                        <td style={{ ...tdL, textAlign: 'right', color: '#1f7a58', fontWeight: 600 }}>{row.after}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* WaitlistCard */}
            <div style={{ marginBottom: 24 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* Article */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={secS} id="what-is-debt-consolidation">
                <h2 style={h2S}>What Is Debt Consolidation?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Debt consolidation is the process of combining multiple loans and credit card balances into a single new loan, typically at a lower interest rate, to reduce monthly payments and total interest cost.
                  </p>
                </div>
                <p style={pS}>In India, the typical consolidation route is a personal loan from a bank. The bank approves a loan for your total outstanding balance, disburses the funds, and you use them to close every existing credit card and loan account. You then make one monthly EMI on the consolidation loan instead of tracking three to six separate due dates.</p>
                <p style={pS}>The mathematics are compelling: the average Indian credit card charges 36% to 42% p.a. on outstanding balances, per Reserve Bank of India consumer finance data. A consolidation personal loan from SBI, HDFC, or ICICI costs 10.5% to 12% p.a. for salaried borrowers with a CIBIL score above 750. That rate difference is where the savings originate.</p>
                <p style={pS}>The <Link href="/calculators/debt-to-income-ratio-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Debt-to-Income Ratio Calculator</Link> is a useful companion: it shows what percentage of your income currently goes to EMIs, which directly determines whether a lender will approve the consolidation loan and at what rate.</p>
              </div>

              <div style={secS} id="how-consolidation-saves-money">
                <h2 style={h2S}>How Debt Consolidation Saves Money</h2>
                <p style={pS}>Consolidation saves money through two channels: a lower monthly EMI and significantly less total interest paid over the repayment period.</p>
                <p style={{ ...pS, fontWeight: 600 }}>Worked example: Rs 3.3 lakh across two credit cards and a personal loan</p>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Credit Card 1: Rs 80,000 at 36% p.a., EMI Rs 4,000, approximately 31 months remaining, remaining interest Rs 44,000</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Personal Loan: Rs 2,00,000 at 18% p.a., EMI Rs 6,000, approximately 47 months remaining, remaining interest Rs 82,000</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Credit Card 2: Rs 50,000 at 42% p.a., EMI Rs 3,000, approximately 26 months remaining, remaining interest Rs 28,000</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Total current: Rs 13,000 per month across 3 loans, Rs 1,54,000 in remaining interest</span></div>
                <p style={pS}>Consolidating the same Rs 3.3 lakh into a personal loan at 12% for 36 months: new EMI Rs 10,961, total interest Rs 64,596. Monthly savings: Rs 2,039. Total interest saved: Rs 89,404.</p>
                <p style={pS}>The savings grow when the gap between the current weighted average rate and the consolidation rate is wider. A borrower running two cards at 42% who qualifies for a loan at 10.5% sees proportionately larger savings than one currently at 18%.</p>
              </div>

              <div style={secS} id="when-to-consolidate">
                <h2 style={h2S}>When Should You Consolidate Debt?</h2>
                <p style={pS}>Consolidation makes financial sense when three conditions are met: your weighted average rate across all debts is materially higher than the consolidation loan rate, the processing fee (typically 1% to 2% of the loan amount) is recovered within 6 months of savings, and your income is stable enough to service the new EMI reliably.</p>
                <p style={pS}>Run the calculator above and check the break-even period. If it shows 3 months or fewer, consolidation is almost certainly the right move. If it shows 12 months or more, examine whether the rate differential justifies the commitment to a fixed tenure.</p>
                <p style={pS}>Avoid consolidation if you expect a significant income disruption in the next 12 months, or if the new loan tenure extends well beyond what you would have paid individually and the total interest ends up higher as a result of the longer timeline.</p>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Consolidate when:</strong> weighted rate exceeds consolidation rate by 5 or more percentage points, multiple EMIs make cash flow management difficult, and CIBIL score is 700 or above</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Skip consolidation when:</strong> the only debt is a home loan or car loan already at 8% to 10%, the consolidation tenure extends beyond your current payoff timeline without meaningful rate savings, or income is likely to drop</span></div>
              </div>

              <div style={secS} id="which-debts-to-consolidate">
                <h2 style={h2S}>Which Debts to Include in Consolidation</h2>
                <p style={pS}>Include every debt that carries a rate materially above the consolidation loan rate, in this priority order.</p>
                <p style={pS}>Credit card balances at 36% to 42% p.a. are the highest-priority candidates. Even a 6-month revolving balance accumulates more interest than most borrowers calculate until they see it in writing.</p>
                <p style={pS}>Personal loans at 18% to 24% p.a. are worth including when the consolidation rate is 12% or lower. The interest saving is smaller than for credit cards, but the combined effect on monthly cash flow from merging multiple EMIs into one can be significant.</p>
                <p style={pS}>Consumer durable loans for home appliances and electronics often carry effective rates of 16% to 22% under promotional zero-cost EMI schemes. These are worth consolidating if the actual rate (not the promotional headline) exceeds the consolidation loan rate.</p>
                <p style={pS}><strong>Leave out:</strong> home loans (8% to 10% p.a.) and car loans (9% to 11% p.a.). Including them in a personal loan consolidation at 12% would raise your cost, not reduce it. Use the <Link href="/calculators/loan-prepayment-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Loan Prepayment Calculator</Link> if you want to accelerate those debts instead.</p>
              </div>

              <div style={secS} id="consolidation-interest-rates">
                <h2 style={h2S}>Debt Consolidation Loan Interest Rates in India</h2>
                <p style={pS}>Personal loan rates for debt consolidation range from 10.50% to 14% p.a. at major banks for salaried borrowers with a CIBIL score above 750. Actual rates depend on employer category, salary, account relationship, and credit history.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                      Representative personal loan and balance transfer rates from major Indian lenders, applicable to debt consolidation (rates as of mid-2026; verify current rates with each lender before applying).
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Lender</th>
                        <th scope="col" style={thS}>Product</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Rate (p.a.)</th>
                        <th scope="col" style={thS}>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { l: 'SBI', p: 'Personal Loan', r: '11.45%', n: 'For CIBIL 750+' },
                        { l: 'HDFC Bank', p: 'Personal Loan', r: '10.50%', n: 'Salaried, top-tier' },
                        { l: 'ICICI Bank', p: 'Personal Loan', r: '10.75%', n: 'Select customers' },
                        { l: 'Axis Bank', p: 'Personal Loan', r: '11.25%', n: 'All segments' },
                        { l: 'Bajaj Finance', p: 'Personal Loan', r: '11.00%', n: 'Pre-approved offers' },
                        { l: 'HDFC Bank', p: 'Balance Transfer', r: '9.99% - 15%', n: 'Existing loan transfer' },
                      ].map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>{row.l}</td>
                          <td style={tdL}>{row.p}</td>
                          <td style={{ ...tdL, textAlign: 'right', fontWeight: 600, color: '#1f7a58' }}>{row.r}</td>
                          <td style={tdL}>{row.n}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={pS}>Per RBI monetary policy decisions in 2025, the repo rate was reduced by 125 basis points cumulatively, bringing it to 5.50%. Personal loan rates have followed, with top-tier lenders now offering below 11% for pre-approved customers. Rates change frequently; the figures above should be verified directly with each lender.</p>
              </div>

              <div style={secS} id="credit-card-consolidation">
                <h2 style={h2S}>Consolidating Credit Card Debt</h2>
                <p style={pS}>Credit card debt is the most expensive consumer credit in India, at 36% to 42% p.a., and it is also the most dangerous because minimum payments barely reduce the principal balance.</p>
                <p style={{ ...pS, fontWeight: 600 }}>The minimum payment trap: Rs 1 lakh card balance at 42% p.a.</p>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Monthly interest charge: Rs 3,500</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Minimum payment (5% of balance): Rs 5,000</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Principal reduced per month: Rs 1,500</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Time to clear at minimum payment: over 12 years</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Total interest over that period: approximately Rs 3.5 lakh</span></div>
                <p style={pS}>Replace that same Rs 1 lakh with a personal loan at 12% for 24 months: the EMI is Rs 4,707, the total interest is Rs 12,968, and the debt is completely eliminated in 2 years. The interest saving compared to minimum-payment behavior is over Rs 3.37 lakh.</p>
                <p style={pS}>For borrowers with Rs 3 lakh to Rs 5 lakh in card balances, credit card consolidation into a personal loan is one of the highest-return financial moves available, requiring no investment, no market timing, and no change in income.</p>

                {/* In-content promo bar: Balance Transfer Savings */}
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Balance Transfer Savings Calculator</p>
                    <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Compare balance transfer vs personal loan for your card debt and see which saves more after fees.</p>
                  </div>
                  <Link className="fx-btn" href="/calculators/balance-transfer-savings-calculator" target="_blank" rel="noopener noreferrer"
                    style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                </div>
              </div>

              <div style={secS} id="debt-consolidation-vs-balance-transfer">
                <h2 style={h2S}>Debt Consolidation vs Balance Transfer</h2>
                <p style={pS}>Balance transfer and debt consolidation both reduce the interest rate on your debt, but they work through different mechanisms and suit different borrower profiles.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                      Key differences between debt consolidation via personal loan and credit card balance transfer.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Factor</th>
                        <th scope="col" style={thS}>Debt Consolidation</th>
                        <th scope="col" style={thS}>Balance Transfer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { f: 'Instrument', c: 'Personal loan', bt: 'Credit card (new or existing)' },
                        { f: 'Applicable debts', c: 'Cards, personal loans, consumer loans', bt: 'Credit card balances only (most banks)' },
                        { f: 'Introductory rate', c: 'Fixed rate for full tenure', bt: '0% to 3% for 3 to 12 months, then reverts to full rate' },
                        { f: 'Tenure', c: '12 to 60 months', bt: '3 to 12 months (promotional period)' },
                        { f: 'Maximum balance', c: 'Up to Rs 25 to 40 lakh (personal loan limit)', bt: 'Limited by new card credit limit (typically Rs 50,000 to Rs 5 lakh)' },
                        { f: 'Processing fee', c: '0.5% to 2% of loan amount', bt: '1% to 2.5% of transferred balance' },
                        { f: 'Best for', c: 'Mixed debt types, large balances, longer tenure', bt: 'Pure card debt, smaller balances, ability to clear in under 12 months' },
                      ].map((row, i) => (
                        <tr key={row.f} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>{row.f}</td>
                          <td style={tdL}>{row.c}</td>
                          <td style={tdL}>{row.bt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={pS}>If your card balance is under Rs 1 lakh and you can clear it within 6 months, a balance transfer to a card offering a promotional 0% period is likely more cost-effective than a personal loan, since there is no interest at all during the window. Above Rs 2 lakh or with mixed debt types, a consolidation personal loan is usually more appropriate.</p>
              </div>

              <div style={secS} id="impact-on-credit-score">
                <h2 style={h2S}>Does Debt Consolidation Affect Your Credit Score?</h2>
                <p style={pS}>Debt consolidation has a net positive effect on your credit score over 6 to 12 months, though the first 30 to 60 days typically show a minor dip of 5 to 10 points.</p>
                <p style={pS}>The initial dip comes from two sources. First, the hard inquiry when the lender checks your credit bureau report at application, which CIBIL treats as a negative event for 12 months but weights lightly. Second, a new account opened recently lowers the average age of your credit accounts.</p>
                <p style={pS}>The positive effects accumulate quickly. Your credit utilization ratio (outstanding card balance as a percentage of total credit limit) drops sharply as card balances are paid off. Utilization below 30% meaningfully improves credit scores with CIBIL and Experian. Your on-time payment record stays perfect if you make all consolidation loan EMIs on time. Borrowers who consolidate high-utilization card debt and maintain regular EMI payments typically see a net score improvement of 30 to 60 points within 12 months.</p>
                <p style={pS}>The one risk: if you clear the credit cards and then continue using them, you can end up with both a consolidation loan EMI and new card balances simultaneously. This defeats the purpose and increases your overall debt load. The consolidation accounts should be closed or frozen after payoff.</p>

                {/* In-content promo bar: Debt Snowball */}
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Debt Snowball Calculator</p>
                    <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>If you prefer paying off debts individually rather than consolidating, the debt snowball strategy shows the optimal payment order.</p>
                  </div>
                  <Link className="fx-btn" href="/calculators/debt-snowball-calculator" target="_blank" rel="noopener noreferrer"
                    style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                </div>
              </div>

              <div style={secS} id="how-to-use">
                <h2 style={h2S}>How to Use This Calculator</h2>
                <p style={pS}>Four steps produce an accurate consolidation estimate in under 2 minutes.</p>
                <ol style={{ paddingLeft: 24, margin: '0 0 16px', listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Add your current debts:</strong> for each loan or card, enter the outstanding balance, annual interest rate, and current monthly EMI. The calculator comes pre-filled with a typical 3-debt scenario.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set the consolidation rate:</strong> drag the slider to the rate your bank has quoted, or use the benchmark rates from the comparison table in this article. The slider covers 7% to 24% p.a.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Choose a tenure:</strong> select 12, 24, 36, 48, or 60 months. Shorter tenures cost less total interest but raise the monthly EMI. Longer tenures lower the EMI but extend the repayment period.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Read the results:</strong> check monthly savings, total interest saved, the new EMI, and the break-even period. The before vs after table below the calculator summarizes the full picture at a glance. Use the <Link href="/calculators/personal-loan-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Personal Loan EMI Calculator</Link> to verify the EMI at any specific rate and tenure.
                  </li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All figures on this page are indicative estimates based on the inputs you provide and publicly available rate benchmarks. Actual loan approval, interest rates, and repayment terms depend on each lender&apos;s underwriting policy, your complete credit history, income verification, and other factors this calculator does not evaluate. This tool is for educational and planning purposes only and does not constitute financial advice. Consult a SEBI-registered financial adviser or a licensed loan officer before making borrowing decisions.
                </p>
              </div>

            </article>
          </div>

          {/* Sidebar */}
          <style>{`.debt-consol-sidebar::-webkit-scrollbar{width:5px}.debt-consol-sidebar::-webkit-scrollbar-track{background:transparent}.debt-consol-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.debt-consol-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside
            className="debt-consol-sidebar"
            aria-label="Related calculators"
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

      {/* Footer */}
      <SiteFooter columns={pipeColumns([
              { hd: 'Calculators', links: ['/calculators/personal-loan-calculator|Personal Loan', '/calculators/emi-calculator|EMI Calculator', '/calculators/debt-snowball-calculator|Debt Snowball', '/calculators/sip-calculator|SIP Calculator', '/calculators/fd-calculator|FD Calculator', '/calculators/income-tax-calculator|Income Tax'] },
              { hd: 'Topics', links: ['/#|Debt Management', '/#|Personal Loans', '/#|Credit Cards', '/#|Retirement'] },
              { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
        ])} />
    </div>
  );
}

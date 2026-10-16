'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect, useId } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { PageNav } from '../../../src/components/common/PageNav';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
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
function calcEMI(p: number, r: number, n: number) {
  if (n === 0 || p === 0) return 0;
  if (r === 0) return p / n;
  const m = r / 12 / 100;
  return (p * m * Math.pow(1 + m, n)) / (Math.pow(1 + m, n) - 1);
}

type AmortRow = { year: number; openingBal: number; principalPaid: number; interestPaid: number; closingBal: number };

function buildAmortization(originalPrincipal: number, rate: number, totalMonths: number, elapsedMonths: number, extraPrepayment: number): {
  outstandingBal: number;
  principalPaid: number;
  interestPaid: number;
  emisRemaining: number;
  paidPct: number;
  originalEmi: number;
  amortRows: AmortRow[];
} {
  const emi = calcEMI(originalPrincipal, rate, totalMonths);
  const m = rate / 12 / 100;

  let balance = originalPrincipal;
  let accumulatedPrincipal = 0;
  let accumulatedInterest = 0;
  let outstandingBal = originalPrincipal;

  const amortRows: AmortRow[] = [];
  let currentYear = 1;
  let yOpening = originalPrincipal;
  let yPrincipal = 0;
  let yInterest = 0;

  // Month-by-month calculation
  for (let month = 1; month <= totalMonths; month++) {
    if (balance <= 0) break;

    const interest = balance * m;
    const payment = Math.min(balance + interest, emi);
    const principal = payment - interest;

    yInterest += interest;
    yPrincipal += principal;

    balance = Math.max(0, balance - principal);

    if (month === elapsedMonths) {
      // Apply prepayment
      const prepayment = Math.min(balance, extraPrepayment);
      balance = Math.max(0, balance - prepayment);
      yPrincipal += prepayment;
      outstandingBal = balance;
      accumulatedPrincipal = originalPrincipal - outstandingBal;
      accumulatedInterest = yInterest + accumulatedInterest;
    }

    if (month < elapsedMonths) {
      // Track accumulated totals prior to target month
      // (will accumulate month-by-month)
    }

    if (month % 12 === 0 || month === totalMonths) {
      amortRows.push({
        year: currentYear,
        openingBal: Math.round(yOpening),
        principalPaid: Math.round(yPrincipal),
        interestPaid: Math.round(yInterest),
        closingBal: Math.round(balance),
      });
      currentYear++;
      yOpening = balance;
      yPrincipal = 0;
      yInterest = 0;
    }
  }

  // Calculate accumulated principal and interest up to the elapsed month
  balance = originalPrincipal;
  let sumP = 0;
  let sumI = 0;
  for (let month = 1; month <= elapsedMonths; month++) {
    if (balance <= 0) break;
    const interest = balance * m;
    const payment = Math.min(balance + interest, emi);
    const principal = payment - interest;
    sumP += principal;
    sumI += interest;
    balance = Math.max(0, balance - principal);
    if (month === elapsedMonths) {
      const prepayment = Math.min(balance, extraPrepayment);
      balance = Math.max(0, balance - prepayment);
      sumP += prepayment;
    }
  }

  outstandingBal = Math.round(balance);
  accumulatedPrincipal = Math.round(sumP);
  accumulatedInterest = Math.round(sumI);

  // Calculate remaining EMIs to pay off outstanding balance at the same EMI rate
  let remMonths = 0;
  if (outstandingBal > 0) {
    let tempBal = outstandingBal;
    while (tempBal > 0 && remMonths < 360) {
      const interest = tempBal * m;
      const payment = Math.min(tempBal + interest, emi);
      const principal = payment - interest;
      tempBal = Math.max(0, tempBal - principal);
      remMonths++;
    }
  }

  const paidPct = originalPrincipal > 0 ? Math.round((accumulatedPrincipal / originalPrincipal) * 100) : 0;

  return {
    outstandingBal,
    principalPaid: accumulatedPrincipal,
    interestPaid: accumulatedInterest,
    emisRemaining: remMonths,
    paidPct,
    originalEmi: Math.round(emi),
    amortRows,
  };
}

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
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
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
        <span style={{ fontSize: 11, color: C.ink3 }}>{min.toLocaleString('en-IN')}{suffix || ''}</span>
        <span style={{ fontSize: 11, color: C.ink3 }}>{max.toLocaleString('en-IN')}{suffix || ''}</span>
      </div>
    </div>
  );
}

/* ── Amortization Bar Chart (Stacked SVG) ──────────────── */
function BarChart({ rows }: { rows: AmortRow[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxAnnual = Math.max(...rows.map(r => r.principalPaid + r.interestPaid));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;
  return (
    <svg role="img" aria-label="Year-by-year outstanding balance principal and interest payoff graph"
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {rows.map((row, i) => {
        const total = row.principalPaid + row.interestPaid;
        const totalH = maxAnnual > 0 ? (total / maxAnnual) * H : 0;
        const prinH = total > 0 ? (row.principalPaid / total) * totalH : 0;
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

/* ── DonutChart ────────────────────────────────────────── */
function DonutChart({ paid, outstanding }: { paid: number; outstanding: number }) {
  const total = paid + outstanding;
  if (total === 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const pArc = (paid / total) * circ;
  const pPct = Math.round((paid / total) * 100);
  return (
    <svg role="img" aria-label={`Outstanding split: ${pPct}% paid off, ${100 - pPct}% outstanding`}
      width="216" height="216" viewBox="0 0 216 216" style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Paid Off</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
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

const POPULAR_LINKS = [
  { href: '/calculators/emi-calculator', label: 'EMI Calculator' },
  { href: '/calculators/mortgage-calculator', label: 'Mortgage Calculator' },
  { href: '/calculators/home-loan-eligibility-calculator', label: 'Home Loan Eligibility Calculator' },
  { href: '/calculators/balance-transfer-savings-calculator', label: 'Balance Transfer Savings' },
  { href: '/calculators/loan-prepayment-calculator', label: 'Loan Prepayment Calculator' },
  { href: '/calculators/loan-amortization-calculator', label: 'Loan Amortization Calculator' },
  { href: '/calculators/car-loan-calculator', label: 'Car Loan EMI Calculator' },
];
const MORE_LINKS = [
  { href: '/calculators/personal-loan-calculator', label: 'Personal Loan EMI Calculator' },
  { href: '/calculators/education-loan-emi-calculator', label: 'Education Loan EMI Calculator' },
  { href: '/calculators/sbi-home-loan-calculator', label: 'SBI Home Loan Calculator' },
  { href: '/calculators/debt-avalanche-calculator', label: 'Debt Avalanche Calculator' },
  { href: '/calculators/home-loan-prepayment-calculator', label: 'Home Loan Prepayment Calculator' },
];

const FAQS = [
  { q: 'What is an outstanding loan balance?', a: 'An outstanding loan balance is the remaining principal portion of a loan that a borrower still owes to the lender at any given point during the loan tenure, excluding future interest charges.' },
  { q: 'How is the outstanding loan balance calculated?', a: 'It is calculated using the amortization formula: Outstanding Balance = P * [((1 + r)^n - (1 + r)^p) / ((1 + r)^n - 1)] where P is the original principal, r is the monthly interest rate, n is the total months, and p is the number of months paid.' },
  { q: 'Does paying extra money reduce my outstanding balance?', a: 'Yes. Any prepayment you make goes directly toward reducing your outstanding principal balance. This reduces your future interest burden and loan tenure.' },
  { q: 'How do I check my outstanding loan balance with my bank?', a: 'You can check it by downloading your latest loan account statement via internet banking, visiting a branch, or checking your bank\'s mobile app.' },
  { q: 'Does the outstanding balance include future interest?', a: 'No. The outstanding balance is the current principal debt. Future interest is only charged on this remaining balance as time elapses.' },
  { q: 'Can I transfer my outstanding loan balance to another bank?', a: 'Yes. This is called a home loan balance transfer, allowing you to move your remaining principal to a new lender offering a lower interest rate.' },
  { q: 'Is there a penalty for foreclosing my outstanding loan?', a: 'Per RBI guidelines, banks cannot charge foreclosure or prepayment penalties on floating-rate individual loans. Fixed-rate loans may incur charges.' },
  { q: 'Why is my outstanding balance reducing so slowly in the first few years?', a: 'Early in the tenure, your loan balance is high, so a major portion of your EMI goes toward paying the monthly interest, leaving less to reduce the principal.' },
  { q: 'How does interest rate change affect my outstanding balance?', a: 'In a floating-rate loan, a rate hike increases the interest component of your EMI. Typically, banks extend the tenure to keep EMIs constant, which slows down principal reduction.' },
  { q: 'What is the difference between outstanding balance and foreclosure amount?', a: 'The outstanding balance is the remaining principal. The foreclosure amount is the total sum required to close the loan, which includes the outstanding balance plus any accrued interest up to the date of closure and minor admin fees.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later.' },
];

/* ── OutstandingLoanSnapshot ───────────────────────────── */
function OutstandingLoanSnapshot() {
  const rows = [
    { label: 'Standard Tenure Cap', value: '30 Years' },
    { label: 'Zero Prepayment Fee', value: 'Floating Rate Loans' },
    { label: 'Early Payments', value: 'Primarily Interest' },
    { label: 'Balance Transfer', value: 'Saves Cumulative Interest' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Loan Snapshot</span>
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

/* ── Article styles ────────────────────────────────────── */
const h2S: React.CSSProperties = { fontSize: 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' };
const pS: React.CSSProperties = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' };
const secS: React.CSSProperties = { margin: '0 0 40px' };
const thS: React.CSSProperties = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', verticalAlign: 'middle', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' };
const tdL: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'left', border: `1px solid ${C.border}`, verticalAlign: 'middle' };
const tdR: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, textAlign: 'left', border: `1px solid ${C.border}`, verticalAlign: 'middle' };
const tdC: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'center', border: `1px solid ${C.border}`, verticalAlign: 'middle' };

export default function OutstandingLoanCalculatorClient() {
  const defaultSettings = {
    loanAmount: 2500000,
    rate: 8.5,
    tenureYr: 20,
    elapsedMo: 24,
    extraPrepayment: 0,
    tenureMode: 'yr' as 'yr' | 'mo',
  };

  const { settings, updateSettings } = useCalculatorSettings('outstanding-loan', defaultSettings);
  const { loanAmount, rate, tenureYr, elapsedMo, extraPrepayment, tenureMode } = settings;

  const setLoanAmount = (v: number) => updateSettings({ loanAmount: v });
  const setRate = (v: number) => updateSettings({ rate: v });
  const setTenureYr = (v: number) => {
    updateSettings({ tenureYr: v, elapsedMo: Math.min(elapsedMo, v * 12) });
  };
  const setElapsedMo = (v: number) => updateSettings({ elapsedMo: v });
  const setExtraPrepayment = (v: number) => updateSettings({ extraPrepayment: v });
  const setTenureMode = (v: 'yr' | 'mo') => updateSettings({ tenureMode: v });

  const [mobile, setMobile] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showAmortization, setShowAmortization] = useState(false);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk();
    window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));

  const totalMonths = tenureYr * 12;

  // Run Amortization Calculations
  const results = useMemo(() => {
    return buildAmortization(loanAmount, rate, totalMonths, elapsedMo, extraPrepayment);
  }, [loanAmount, rate, totalMonths, elapsedMo, extraPrepayment]);

  const { outstandingBal, principalPaid, interestPaid, emisRemaining, paidPct, originalEmi, amortRows } = results;

  const interestPct = 100 - paidPct;

  // Calculate target pay off date (approximate based on current month)
  const today = new Date();
  const completionDate = new Date(today.getFullYear(), today.getMonth() + emisRemaining);
  const formattedCompletion = completionDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });


  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Outstanding Loan Balance Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Check your remaining loan balance, principal paid off, and interest splits. Learn how prepayments accelerate your path to debt freedom.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>
            {/* ── CALCULATOR CARD ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                {/* Inputs Panel (Colorless) */}
                <div style={{ padding: mobile ? '20px 18px' : '36px 36px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Current Loan Status</p>
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider id="loan-amount" label="Original Loan Principal" value={loanAmount} min={100000} max={50000000} step={50000}
                        display={fmtIN(loanAmount)} onChange={setLoanAmount} compact />

                      <Slider id="interest-rate" label="Interest Rate" value={rate} min={5} max={20} step={0.05}
                        display={`${rate}%`} onChange={setRate} compact suffix="%" />

                      <Slider id="original-tenure" label="Original Tenure" value={tenureYr} min={1} max={30} step={1}
                        display={`${tenureYr} Years`} onChange={setTenureYr} compact suffix="Y" />

                      {/* Tenure presets */}
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: -8, marginBottom: 20 }}>
                        {[5, 10, 15, 20, 25, 30].map(y => (
                          <button key={y} onClick={() => setTenureYr(y)}
                            style={{
                              padding: '4px 10px', fontSize: 12, background: C.white,
                              color: tenureYr === y ? C.ink : C.ink3,
                              border: `${tenureYr === y ? 1.5 : 1}px solid ${tenureYr === y ? C.ink : C.border}`,
                              fontWeight: tenureYr === y ? 700 : 500, borderRadius: 6, cursor: 'pointer',
                              fontFamily: INTER, transition: 'all 0.15s'
                            }}>
                            {y}Y
                          </button>
                        ))}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
                        <button onClick={() => setShowAdvanced(true)}
                          style={{ background: 'none', border: 'none', color: C.ink, fontWeight: 700, cursor: 'pointer', fontSize: 13.5, display: 'flex', alignItems: 'center', gap: 6, fontFamily: INTER }}>
                          Advanced Settings <span style={{ fontSize: 16 }}>→</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Tenure mode */}
                      <div style={{ marginBottom: 24 }}>
                        <span style={{ display: 'block', fontSize: 13, color: C.ink2, marginBottom: 8 }}>Track Time Elapsed In</span>
                        <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                          {(['yr', 'mo'] as const).map(mode => (
                            <button key={mode} onClick={() => setTenureMode(mode)}
                              style={{
                                flex: 1, padding: '8px 14px', border: 'none', background: tenureMode === mode ? C.white : 'transparent',
                                color: tenureMode === mode ? C.ink : C.ink3, fontWeight: tenureMode === mode ? 600 : 400,
                                cursor: 'pointer', fontFamily: INTER, fontSize: 13, transition: 'all 0.15s'
                              }}>
                              {mode === 'yr' ? 'Years' : 'Months'}
                            </button>
                          ))}
                        </div>
                      </div>

                      {tenureMode === 'yr' ? (
                        <Slider id="elapsed-time" label="Time Elapsed (Years)" value={Math.round(elapsedMo / 12)} min={1} max={tenureYr} step={1}
                          display={`${Math.round(elapsedMo / 12)} Years`} onChange={v => setElapsedMo(v * 12)} compact suffix="Y" />
                      ) : (
                        <Slider id="elapsed-time-mo" label="EMIs Already Paid" value={elapsedMo} min={1} max={totalMonths} step={1}
                          display={`${elapsedMo} Months`} onChange={setElapsedMo} compact suffix="Mo" />
                      )}

                      <Slider id="prepayment-amount" label="Lump-sum Prepayments Made" value={extraPrepayment} min={0} max={5000000} step={5000}
                        display={fmtIN(extraPrepayment)} onChange={setExtraPrepayment} compact />

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
                        <button onClick={() => setShowAdvanced(false)}
                          style={{ background: 'none', border: 'none', color: C.ink, fontWeight: 700, cursor: 'pointer', fontSize: 13.5, display: 'flex', alignItems: 'center', gap: 6, fontFamily: INTER }}>
                          <span>←</span> Basic Settings
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Outputs Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* Donut */}
                  <div style={{ order: mobile ? 1 : -1, marginBottom: mobile ? 16 : 20 }}>
                    <DonutChart paid={principalPaid} outstanding={outstandingBal} />
                  </div>

                  {/* Legend */}
                  <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 20, marginBottom: mobile ? 12 : 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Principal Paid</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Outstanding Balance</span>
                    </div>
                  </div>

                  {/* Primary result: Outstanding Balance */}
                  <div style={{ width: '100%', background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 12, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 700, color: C.dark }}>Outstanding Balance</span>
                    <span aria-live="polite" style={{ fontSize: mobile ? 20 : 26, fontWeight: 800, color: C.dark, letterSpacing: '-0.02em' }}>
                      {fmtIN(outstandingBal)}
                    </span>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: 'Original Monthly EMI', value: fmtIN(originalEmi) },
                    { label: 'Principal Repaid', value: fmtIN(principalPaid) },
                    { label: 'Interest Paid So Far', value: fmtIN(interestPaid) },
                    { label: 'Remaining EMIs', value: `${emisRemaining} Months` },
                    { label: 'Est. Payoff Completion', value: formattedCompletion },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  {/* Split bar */}
                  {principalPaid + outstandingBal > 0 && (
                    <div style={{ width: '100%', marginTop: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 12, color: C.ink3 }}>Principal Paid {paidPct}%</span>
                        <span style={{ fontSize: 12, color: C.ink3 }}>Outstanding {100 - paidPct}%</span>
                      </div>
                      <div style={{ height: 6, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${paidPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── Amortization Schedule (Stacked Chart + Table) ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24, marginBottom: 40 }}>
              <button onClick={() => setShowAmortization(!showAmortization)}
                aria-expanded={showAmortization} aria-controls="amort-panel"
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0, fontFamily: INTER }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: C.ink }}>Amortization Schedule</span>
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: showAmortization ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {showAmortization && (
                <div id="amort-panel" style={{ marginTop: 24 }}>
                  <div style={{ marginBottom: 24 }}>
                    <BarChart rows={amortRows} />
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 12, fontSize: 11.5, color: C.ink2 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 12, height: 12, borderRadius: 2, background: C.dark }} />
                        <span>Principal Repaid</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 12, height: 12, borderRadius: 2, background: C.lime2 }} />
                        <span>Interest Paid</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, marginTop: 8, textAlign: 'left' }}>
                        Year-by-year loan amortization schedule for the outstanding balance.
                      </caption>
                      <thead>
                        <tr>
                          <th style={thS} scope="col">Year</th>
                          <th style={{ ...thS, textAlign: 'right' }} scope="col">Opening Balance</th>
                          <th style={{ ...thS, textAlign: 'right' }} scope="col">Principal Paid</th>
                          <th style={{ ...thS, textAlign: 'right' }} scope="col">Interest Paid</th>
                          <th style={{ ...thS, textAlign: 'right' }} scope="col">Closing Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {amortRows.map(row => (
                          <tr key={row.year}>
                            <td style={tdC}>{row.year}</td>
                            <td style={{ ...tdL, textAlign: 'right' }}>{fmtIN(row.openingBal)}</td>
                            <td style={{ ...tdR, textAlign: 'right', color: '#166534' }}>{fmtIN(row.principalPaid)}</td>
                            <td style={{ ...tdL, textAlign: 'right', color: '#B45309' }}>{fmtIN(row.interestPaid)}</td>
                            <td style={{ ...tdR, textAlign: 'right' }}>{fmtIN(row.closingBal)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* ── WaitlistCard ── */}
            <div style={{ marginBottom: 32 }}>
              <SaveResultsCard mobile={mobile} />
            </div>

            

            {/* ── EDUCATIONAL CONTENT ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>
              {/* 1. What Is */}
              <section id="what-is-outstanding-balance" style={secS}>
                <h2 style={h2S}>What Is an Outstanding Loan Balance?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    An outstanding loan balance is the remaining principal amount that a borrower still owes to the financial institution at a specific point during the loan tenure. It excludes future unaccrued interest.
                  </p>
                </div>
                <p style={pS}>
                  When you make a payment on a standard amortized debt in India (such as a home loan or car loan), each EMI is divided. Part of the cash flow pays for the interest charged for that month, and the remainder pays off a portion of the borrowed principal.
                </p>
                <p style={pS}>
                  The outstanding balance represents this remaining principal portion. If you decide to prepay or foreclosure the loan, this outstanding balance is the base amount you must settle to clear the debt.
                </p>
              </section>

              {/* 2. Formula */}
              <section id="outstanding-balance-formula" style={secS}>
                <h2 style={h2S}>Outstanding Loan Balance Formula: The Exact Math</h2>
                <p style={pS}>
                  Lenders compute the remaining principal balance using the amortization formula. The outstanding principal balance after making p monthly payments is determined by:
                </p>
                <pre style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '16px 20px', borderRadius: 8, fontSize: 13.5, color: C.ink, overflowX: 'auto', marginBottom: 20, fontFamily: 'monospace' }}>
{`Outstanding Balance = P × [ (1 + r)^n - (1 + r)^p ] / [ (1 + r)^n - 1 ]
where:
P = Original loan principal amount
r = Monthly interest rate (Annual Rate / 12 / 100)
n = Total tenure in months (Years × 12)
p = Number of EMIs already paid`}
                </pre>
                <p style={pS}>
                  For example, let us take a home loan of Rs 25 lakh at an interest rate of 8.5% p.a. for a tenure of 20 years (240 months). The monthly EMI for this loan is Rs 21,696. Let us calculate the outstanding balance after 2 years (24 payments):
                </p>
                <p style={pS}>
                  Using the formula with P = Rs 2,500,000, r = 0.007083 (8.5% / 12 / 100), n = 240, and p = 24. The outstanding balance is approximately Rs 24.13 lakh. During these 24 months, the borrower paid Rs 5.20 lakh in EMIs, but only Rs 87,000 went toward principal repayment, with Rs 4.33 lakh going toward interest.
                </p>
              </section>

              {/* 3. Excel Methods */}
              <section id="excel-methods" style={secS}>
                <h2 style={h2S}>Outstanding Balance Calculator in Excel</h2>
                <p style={pS}>
                  You can track your remaining debt balance in Microsoft Excel using built-in financial formulas. The primary function for this is the Future Value (FV) function.
                </p>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 20 }}>
                  <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, marginTop: 8, textAlign: 'left' }}>
                    Excel financial functions used to determine outstanding loan parameters.
                  </caption>
                  <thead>
                    <tr>
                      <th style={thS} scope="col">Calculation Type</th>
                      <th style={thS} scope="col">Excel Formula</th>
                      <th style={thS} scope="col">Variable Reference</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={tdL}>Remaining Principal Balance</td>
                      <td style={tdR}><code>=FV(Rate/12, Paid_Months, EMI, -Original_Principal)</code></td>
                      <td style={tdL}>Calculates the outstanding principal balance after a specific number of monthly EMI payments.</td>
                    </tr>
                    <tr>
                      <td style={tdL}>Cumulative Principal Paid</td>
                      <td style={tdR}><code>=CUMPRINC(Rate/12, Total_Months, Original_Principal, Start_Month, End_Month, 0)</code></td>
                      <td style={tdL}>Determines total principal repaid during a specific window.</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* 4. Balance by Loan Type */}
              <section id="balance-by-loan-type" style={secS}>
                <h2 style={h2S}>Outstanding Balance by Loan Type: Home, Car, Personal, Education</h2>
                <p style={pS}>
                  Different loan categories follow distinct amortization and prepayment rules. Understanding these differences helps you manage payoff schedules:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Home Loans:</strong> Characterized by long tenures (20-30 years) and floating rates. RBI mandates zero prepayment charges, allowing you to reduce outstanding balance without penalties.
                  </li>
                  <li style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Car Loans:</strong> Typically fixed-rate structures spanning 3 to 7 years. Lenders may charge prepayment penalties (1% to 3%) on the outstanding principal if paid early.
                  </li>
                  <li style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Personal Loans:</strong> Unsecured financing with high interest rates (10% to 20%) and short tenures. Early closure often carries lock-in periods and foreclosure fees.
                  </li>
                </ul>
              </section>

              {/* 5. Prepayment Impact */}
              <section id="prepayment-impact" style={secS}>
                <h2 style={h2S}>How Prepayment Reduces Outstanding Balance</h2>
                <p style={pS}>
                  Making a lump-sum prepayment alters the trajectory of your debt payoff. Prepayments are applied directly to the outstanding principal balance, reducing the base on which subsequent interest is calculated.
                </p>
                <p style={pS}>
                  This reduction triggers compounding savings over time. By keeping your monthly EMI constant, the remaining tenure is shortened, helping you pay off the debt years ahead of the original schedule.
                </p>
              </section>

              {/* 6. Outstanding after 5Y Table */}
              <section id="outstanding-after-5y" style={secS}>
                <h2 style={h2S}>Outstanding Balance After 5 Years: Quick Reference Table</h2>
                <p style={pS}>
                  Long-term loans pay off principal slowly in the early years. The table below illustrates the remaining balance and accumulated interest after 5 years (60 payments) for different loan sizes, assuming an 8.5% interest rate and a 20-year tenure:
                </p>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 20 }}>
                  <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, marginTop: 8, textAlign: 'left' }}>
                    Outstanding loan balance and paid interest after 5 years for a 20-year tenure at an 8.5% interest rate.
                  </caption>
                  <thead>
                    <tr>
                      <th style={thS} scope="col">Original Principal</th>
                      <th style={{ ...thS, textAlign: 'right' }} scope="col">Monthly EMI</th>
                      <th style={{ ...thS, textAlign: 'right' }} scope="col">Balance After 5 Years</th>
                      <th style={{ ...thS, textAlign: 'right' }} scope="col">Cumulative Interest Paid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1000000, 2500000, 5000000, 7500000, 10000000].map(p => {
                      const emi = calcEMI(p, 8.5, 240);
                      const res = buildAmortization(p, 8.5, 240, 60, 0);
                      return (
                        <tr key={p}>
                          <td style={tdL}>{fmtIN(p)}</td>
                          <td style={{ ...tdR, textAlign: 'right' }}>{fmtIN(Math.round(emi))}</td>
                          <td style={{ ...tdR, textAlign: 'right' }}>{fmtIN(res.outstandingBal)}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>{fmtIN(res.interestPaid)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </section>

              {/* 7. Early Interest Breakdown */}
              <section id="early-interest-breakdown" style={secS}>
                <h2 style={h2S}>Outstanding Balance vs Principal Paid</h2>
                <p style={pS}>
                  The allocation of your EMI shifts over the loan lifecycle. In the early years, the outstanding principal is high, meaning most of your monthly cash flow is consumed by interest charges.
                </p>
                <p style={pS}>
                  As you pay off the principal, the outstanding balance decreases, which lowers the monthly interest calculation. Consequently, a larger portion of your monthly EMI is applied toward reducing the principal balance, accelerating payoff speed in the final years.
                </p>
              </section>

              {/* 8. How to Check */}
              <section id="how-to-check-balance" style={secS}>
                <h2 style={h2S}>How to Check Outstanding Balance with Your Bank</h2>
                <p style={pS}>
                  You can verify your exact remaining balance using digital channels. Log into your bank\'s online portal and navigate to the loan account summary page to view the current outstanding principal.
                </p>
                <p style={pS}>
                  You can also download a yearly loan statement showing the principal and interest breakdown. Alternatively, request a provisional foreclosure letter from the bank branch to see the exact amount needed for early payoff.
                </p>
              </section>

              {/* 9. RBI Rules */}
              <section id="rbi-foreclosure-rules" style={secS}>
                <h2 style={h2S}>RBI Guidelines on Loan Foreclosure and Balance Transfer</h2>
                <p style={pS}>
                  The RBI protects consumers against high exit barriers on personal debt. Under RBI circulars, commercial banks and NBFCs cannot levy prepayment penalties or foreclosure charges on floating-rate loans.
                </p>
                <p style={pS}>
                  This rule applies to home loans and individual loans that are not tied to business purposes. For fixed-rate loans, lenders can charge prepayment fees, which typically range from 2% to 4% of the outstanding balance.
                </p>
              </section>

              {/* 10. Balance Transfer */}
              <section id="balance-transfer-viability" style={secS}>
                <h2 style={h2S}>Outstanding Balance for Balance Transfer: When Does It Make Sense?</h2>
                <p style={pS}>
                  Refinancing or transferring your outstanding balance to a new bank makes sense if the interest rate gap is wide enough to justify the processing fees. Check if you are in the early phase of the loan, where interest costs are high.
                </p>
                <p style={pS}>
                  If you have already completed most of your tenure, a balance transfer provides marginal savings because the interest component has already been paid off. Ensure that processing charges (usually 0.5% of the loan amount) do not exceed the interest savings.
                </p>
              </section>

              {/* 11. Formula Limitations */}
              <section id="formula-limitations" style={secS}>
                <h2 style={h2S}>Limitations of the Outstanding Balance Formula</h2>
                <p style={pS}>
                  While mathematical models are useful, they carry limitations in real-world scenarios. Here are four limitations:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Interest Rate Fluctuations:</strong> Floating-rate loans experience periodic interest rate modifications, which recalculates the tenure and outstanding balance.
                  </li>
                  <li style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Varying Prepayment Timing:</strong> The formula assumes prepayments occur exactly at month ends, whereas banks calculate interest on daily reducing balances.
                  </li>
                  <li style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Excludes Processing Penalties:</strong> Late payment charges or legal check fees are not reflected in the basic mathematical model.
                  </li>
                  <li style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Disbursement Phasing:</strong> Education or home construction loans are disbursed in stages, accruing pre-construction interest that differs from standard amortization.
                  </li>
                </ul>
              </section>

              {/* 12. How to Use */}
              <section id="how-to-use" style={secS}>
                <h2 style={h2S}>How to Use This Outstanding Loan Balance Calculator</h2>
                <p style={pS}>
                  This tool calculates your remaining principal liabilities and tracks your loan paydown progress. Follow these steps:
                </p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Original Principal:</strong> Input the original amount you borrowed in the Loan Principal field.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Adjust Rate and Tenure:</strong> Input the annual interest rate and original loan tenure.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Input Elapsed Payments:</strong> Adjust the elapsed time slider to indicate how many EMIs you have paid off.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Simulate Prepayments:</strong> Enter any lump-sum payments in the Prepayments field to see the revised payoff schedule.
                  </li>
                </ol>
              </section>

              

              {/* 13. FAQ Accordion */}
              <section id="faq" style={secS}>
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQBox items={FAQS} />
              </section>

              {/* 14. Disclaimer */}
              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All calculations on this page are indicative only. Outstanding loan balance is a mathematical measure based on standard amortization formulas and does not predict bank foreclosure values. Actual payoff requirements are subject to lender interest rate recalculations and daily balance schedules. Consult a SEBI-registered financial adviser before making prepayment decisions.
                </p>
              </div>
            </article>
          </div>

          {/* Sticky Sidebar */}
          <aside className="outstanding-sidebar" style={{
            position: mobile ? 'static' : 'sticky',
            top: 20,
            alignSelf: 'start',
            maxHeight: mobile ? 'none' : 'calc(100vh - 40px)',
            overflowY: mobile ? 'visible' : 'auto',
            paddingRight: mobile ? 0 : 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            scrollbarWidth: 'thin',
            scrollbarColor: '#C4C9C4 transparent',
          } as React.CSSProperties}>
            <style>{`
              .outstanding-sidebar::-webkit-scrollbar { width: 5px; }
              .outstanding-sidebar::-webkit-scrollbar-track { background: transparent; }
              .outstanding-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
              .outstanding-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
            `}</style>

            <div style={{ flexShrink: 0 }}>
            </div>

            <div style={{ flexShrink: 0 }}>
              <OutstandingLoanSnapshot />
            </div>

            <div style={{ flexShrink: 0 }}>
              <SidebarList title="Popular Calculators" items={POPULAR_LINKS} />
            </div>

            <div style={{ flexShrink: 0 }}>
              <SidebarList title="More Calculators" items={MORE_LINKS} />
            </div>
          </aside>
        </div>
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

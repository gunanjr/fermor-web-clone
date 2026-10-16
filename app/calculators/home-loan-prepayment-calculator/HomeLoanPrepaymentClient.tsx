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

function outstandingBalance(p: number, annualRate: number, emi: number, monthsPaid: number): number {
  if (annualRate === 0) return Math.max(0, p - emi * monthsPaid);
  const r = annualRate / 12 / 100;
  return p * Math.pow(1 + r, monthsPaid) - emi * (Math.pow(1 + r, monthsPaid) - 1) / r;
}

function calcNewTenure(remainingBal: number, annualRate: number, emi: number): number {
  if (remainingBal <= 0) return 0;
  if (annualRate === 0) return Math.ceil(remainingBal / emi);
  const r = annualRate / 12 / 100;
  if (emi <= remainingBal * r) return 9999; // EMI doesn't cover interest
  return Math.ceil(-Math.log(1 - (remainingBal * r) / emi) / Math.log(1 + r));
}

interface YearRow {
  year: number;
  openingBal: number;
  principal: number;
  interest: number;
  closingBal: number;
}

function buildAmortization(
  p: number,
  annualRate: number,
  months: number,
  emi: number,
  prepayMonth: number,
  prepayAmt: number,
  mode: 'tenure' | 'emi',
): YearRow[] {
  const rows: YearRow[] = [];
  let balance = p;
  const r = annualRate === 0 ? 0 : annualRate / 12 / 100;
  const startYear = new Date().getFullYear();
  let currentEMI = emi;
  let totalMonths = months;
  let prepayApplied = false;

  let globalMonth = 0;
  let yearIdx = 0;

  while (balance > 0.01 && globalMonth < totalMonths + 1) {
    const opening = balance;
    let yPrin = 0;
    let yInt = 0;
    const monthsThisYear = Math.min(12, totalMonths - yearIdx * 12);
    if (monthsThisYear <= 0) break;

    for (let m = 0; m < monthsThisYear; m++) {
      globalMonth++;
      const intPart = balance * r;
      const prinPart = Math.min(currentEMI - intPart, balance);
      yInt += intPart;
      yPrin += prinPart;
      balance = Math.max(0, balance - prinPart);

      // Apply prepayment
      if (!prepayApplied && globalMonth === prepayMonth && balance > 0) {
        const prepayAppliedAmt = Math.min(prepayAmt, balance);
        balance = Math.max(0, balance - prepayAppliedAmt);
        prepayApplied = true;

        if (mode === 'emi' && balance > 0) {
          const remainingMonths = totalMonths - globalMonth;
          if (remainingMonths > 0) {
            currentEMI = calcEMI(balance, annualRate, remainingMonths);
          }
        } else if (mode === 'tenure' && balance > 0) {
          const newTen = calcNewTenure(balance, annualRate, currentEMI);
          totalMonths = globalMonth + newTen;
        }
      }

      if (balance <= 0.01) break;
    }

    rows.push({
      year: startYear + yearIdx,
      openingBal: opening,
      principal: yPrin,
      interest: yInt,
      closingBal: Math.max(0, balance),
    });
    yearIdx++;
    if (balance <= 0.01) break;
  }
  return rows;
}

interface PrepayResult {
  interestSaved: number;
  newTenureMonths: number;
  newEMI: number;
  totalInterestWithPrepay: number;
  totalInterestWithout: number;
  monthsSaved: number;
  newEMIMode: number;
}

function calcPrepaymentSavings(
  loanAmount: number,
  annualRate: number,
  tenureMonths: number,
  prepayAmount: number,
  prepayMonth: number,
  mode: 'tenure' | 'emi',
): PrepayResult {
  const emi = calcEMI(loanAmount, annualRate, tenureMonths);
  const totalInterestWithout = emi * tenureMonths - loanAmount;

  // Balance at prepay month
  const balAtPrepay = outstandingBalance(loanAmount, annualRate, emi, prepayMonth);
  const prepayApplied = Math.min(prepayAmount, Math.max(0, balAtPrepay));
  const newBalance = Math.max(0, balAtPrepay - prepayApplied);

  if (newBalance <= 0) {
    // Loan fully paid off
    const interestPaidBeforePrepay = emi * prepayMonth - (loanAmount - balAtPrepay);
    return {
      interestSaved: Math.max(0, totalInterestWithout - interestPaidBeforePrepay),
      newTenureMonths: prepayMonth,
      newEMI: 0,
      totalInterestWithPrepay: interestPaidBeforePrepay,
      totalInterestWithout,
      monthsSaved: tenureMonths - prepayMonth,
      newEMIMode: 0,
    };
  }

  const remainingMonths = tenureMonths - prepayMonth;

  if (mode === 'tenure') {
    const newTen = calcNewTenure(newBalance, annualRate, emi);
    const totalNewMonths = prepayMonth + newTen;
    const interestAfterPrepay = emi * newTen - newBalance;
    const interestBeforePrepay = emi * prepayMonth - (loanAmount - balAtPrepay);
    const totalInterestWithPrepay = interestBeforePrepay + interestAfterPrepay;

    return {
      interestSaved: Math.max(0, totalInterestWithout - totalInterestWithPrepay),
      newTenureMonths: totalNewMonths,
      newEMI: emi,
      totalInterestWithPrepay: Math.max(0, totalInterestWithPrepay),
      totalInterestWithout,
      monthsSaved: Math.max(0, tenureMonths - totalNewMonths),
      newEMIMode: emi,
    };
  } else {
    // Reduce EMI mode
    const newEMI = remainingMonths > 0 ? calcEMI(newBalance, annualRate, remainingMonths) : 0;
    const interestAfterPrepay = newEMI * remainingMonths - newBalance;
    const interestBeforePrepay = emi * prepayMonth - (loanAmount - balAtPrepay);
    const totalInterestWithPrepay = interestBeforePrepay + interestAfterPrepay;

    return {
      interestSaved: Math.max(0, totalInterestWithout - totalInterestWithPrepay),
      newTenureMonths: tenureMonths,
      newEMI: newEMI,
      totalInterestWithPrepay: Math.max(0, totalInterestWithPrepay),
      totalInterestWithout,
      monthsSaved: 0,
      newEMIMode: newEMI,
    };
  }
}

/* ── DonutChart ────────────────────────────────────────── */
function DonutChart({ interestSaved, interestPaid }: { interestSaved: number; interestPaid: number }) {
  const total = interestSaved + interestPaid;
  if (total === 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const savedArc = (interestSaved / total) * circ;
  const savedPct = Math.round((interestSaved / total) * 100);

  return (
    <svg
      role="img"
      aria-label={`Interest split: ${savedPct}% saved, ${100 - savedPct}% still paid`}
      width="216"
      height="216"
      viewBox="0 0 216 216"
      style={{ display: 'block' }}
    >
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle
        cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${savedArc} ${circ - savedArc}`}
        strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }}
      />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Interest saved</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{savedPct}%</text>
    </svg>
  );
}

/* ── BarChart ──────────────────────────────────────────── */
function BarChart({ rows }: { rows: YearRow[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxAnnual = Math.max(...rows.map(r => r.principal + r.interest));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;

  return (
    <svg
      role="img"
      aria-label="Annual principal and interest breakdown bar chart"
      viewBox={`0 0 ${W} ${H + PADB}`}
      width="100%"
      style={{ display: 'block', overflow: 'visible' }}
    >
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
              <text
                x={x + barW / 2} y={H + 14} textAnchor="middle"
                style={{ fontSize: rows.length > 20 ? 7 : 9, fill: C.ink3, fontFamily: INTER }}
              >
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
          <input
            id={inputId} autoFocus value={raw}
            aria-label={`Enter ${label} value`}
            onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 130, outline: 'none', color: C.dark, fontFamily: INTER }}
          />
        ) : (
          <button
            onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${display}. Click to edit.`}
            style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: C.dark, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 18px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 90 : 110, textAlign: 'center' }}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}
          >
            {display}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 20, height: 20, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 2px 8px rgba(16,18,20,0.22)', pointerEvents: 'none', zIndex: 1 }} />
        <input
          id={rangeId} type="range" min={min} max={max} step={step} value={value}
          aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
          onChange={e => onChange(+e.target.value)}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }}
        />
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
  {
    q: 'What is home loan prepayment?',
    a: 'Home loan prepayment is paying a lump sum toward the outstanding principal on top of your regular EMI. The outstanding balance drops immediately, which means less interest accrues in subsequent months. On a Rs 50 lakh loan at 8.5% for 20 years, the original EMI is Rs 43,391 and total interest is Rs 54.1 lakh. Prepaying Rs 5 lakh at month 12 reduces principal to Rs 44.4 lakh, cutting total interest to Rs 45.9 lakh, a saving of Rs 8.2 lakh.',
  },
  {
    q: 'Should I reduce tenure or EMI when prepaying?',
    a: 'Reduce tenure if your current EMI is manageable and your goal is to close the loan early. You save more interest because the loan ends sooner. Reduce EMI if you need lower monthly outgo or have better investment opportunities. For a Rs 50 lakh loan at 8.5% with a Rs 5 lakh prepayment at month 12, reducing tenure saves Rs 8.2 lakh in interest; reducing EMI saves Rs 6.6 lakh because the tenure stays the same.',
  },
  {
    q: 'What are home loan prepayment charges?',
    a: 'Per RBI guidelines effective October 2019, banks cannot charge prepayment penalties on floating-rate home loans to individual borrowers. SBI, HDFC Bank, ICICI Bank, Axis Bank, and LIC HFL all charge zero on part or full prepayment of floating-rate loans. Fixed-rate home loans typically carry a 2% penalty on the prepaid amount. Always confirm with your lender before paying.',
  },
  {
    q: 'How much can I save by prepaying my home loan?',
    a: 'Savings depend on loan amount, interest rate, remaining tenure, and prepayment timing. On a Rs 50 lakh loan at 8.5% for 20 years, prepaying Rs 5 lakh at month 12 saves approximately Rs 8.2 lakh in interest and cuts tenure by about 4 years. Prepaying Rs 10 lakh at the same time saves approximately Rs 16 lakh. A Rs 1 crore loan with a Rs 20 lakh prepayment at month 12 saves around Rs 32 lakh. Use this calculator to see exact savings for your loan.',
  },
  {
    q: 'When is the best time to prepay a home loan?',
    a: 'The earlier in the tenure, the more you save. In the first 5 years of an 8.5% home loan, over 70% of each EMI is interest. A Rs 5 lakh prepayment at month 12 saves Rs 8.2 lakh. The same Rs 5 lakh at month 60 saves roughly Rs 5.1 lakh, and at month 120 saves only about Rs 2.8 lakh. Front-loading prepayments maximizes interest savings.',
  },
  {
    q: 'What is partial or part prepayment of home loan?',
    a: 'Part prepayment is paying a lump sum toward the outstanding principal while the loan continues. The loan continues at either a shorter tenure (same EMI) or a lower EMI (same tenure). Unlike full prepayment which closes the loan entirely, part prepayment keeps the loan active while reducing overall interest cost. Both are penalty-free on floating-rate loans per RBI guidelines.',
  },
  {
    q: 'Can I prepay SBI home loan without penalty?',
    a: 'Yes. SBI charges zero prepayment penalty on floating-rate home loans for individual borrowers. You can prepay any amount at any time, multiple times per year, at no cost. SBI does not enforce a minimum prepayment amount, though branches may informally prefer at least one EMI. Contact your SBI branch to confirm current operational procedures.',
  },
  {
    q: 'How does prepayment reduce home loan tenure?',
    a: 'When you prepay, the outstanding principal drops immediately. Your EMI stays the same, but a higher portion of each subsequent EMI goes toward principal because interest is charged on the lower balance. The loan reaches zero balance faster, cutting the effective tenure. The new tenure is calculated by solving for the number of months needed to repay the post-prepayment balance at your unchanged EMI and rate.',
  },
  {
    q: 'What is the minimum prepayment amount for HDFC Bank?',
    a: 'HDFC Bank does not publish a fixed minimum for part-prepayments on floating-rate loans. Most branches process prepayments starting from one EMI equivalent, which typically ranges from Rs 10,000 to Rs 1 lakh depending on your loan size. For maximum clarity, call HDFC Bank customer care at 1800-202-6161 to confirm the current operational minimum for your specific loan.',
  },
  {
    q: 'Is it better to invest or prepay a home loan?',
    a: 'Compare your effective loan cost against post-tax investment returns. At 8.5% interest with no Section 24(b) benefit (new tax regime), prepaying gives a guaranteed 8.5% return. If your investments earn more than 8.5% post-tax consistently, invest instead. Most equity SIPs earn above 8.5% over 10 years, but not all years do. If uncertain, prepaying a floating-rate loan at 8-9% is a risk-free return.',
  },
  {
    q: 'Can I make multiple prepayments on my home loan per year?',
    a: 'Yes. RBI guidelines do not restrict the number of prepayments per year on floating-rate loans. You can make multiple part-prepayments in a single year without penalty. Individual banks may have operational requirements such as advance notice or processing time between prepayments. Check with your lender for their current process and whether they combine multiple small prepayments into one processing.',
  },
  {
    q: 'Does home loan prepayment affect my CIBIL score?',
    a: 'Part prepayment does not negatively affect your CIBIL score. It shows reduced loan liability, which can slightly improve your profile over time since it indicates timely payments and financial discipline. Closing a loan early (full prepayment) also does not hurt your score. Your CIBIL score stays positive as long as all EMIs are paid on time throughout the loan period.',
  },
  {
    q: 'How do I process a home loan prepayment with my bank?',
    a: 'Visit your bank branch with your loan account number, bank passbook, and cheque or net banking authorization. Most banks accept prepayment via net banking (fastest, instant) or cheque at the branch. Provide the amount and specify whether you want to reduce tenure or EMI. The bank will immediately recalculate your loan and issue a revised amortization schedule within 2-3 business days.',
  },
  {
    q: 'Which bank offers the best home loan interest rate in 2026?',
    a: 'As of September 2026, SBI floating-rate home loans start at approximately 8.25%, HDFC Bank at 8.35%, and ICICI Bank at 8.40%. The 15-basis-point difference between SBI and ICICI results in approximately Rs 1.3 lakh higher total interest over 20 years on a Rs 50 lakh loan. Compare base rate, spread, rate-pass-through speed, and reset frequency before choosing.',
  },
  {
    q: 'What are common mistakes people make with home loan prepayment?',
    a: 'Not prepaying in the first 5 years when interest cost is highest. Prepaying when emergency funds are low, risking personal loan debt. Prepaying fixed-rate loans without factoring in the 2% penalty. Confusing reduce-tenure with reduce-EMI and choosing the wrong mode for their cash flow. Using prepayment calculator results without verifying final numbers with the actual lender.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is an Indian fintech platform with 500+ free financial calculators and a financial eligibility engine that matches users with loans and investments they qualify for. All calculators are free with no sign-up. Available at fermor.in.',
  },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ── Sidebar ───────────────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div
            style={{ padding: '13px 20px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 14, color: C.ink2, transition: 'all 0.12s' }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = C.paleLime; (e.currentTarget as HTMLElement).style.color = C.dark; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink2; }}
          >
            {label}
          </div>
        </Link>
      ))}
    </div>
  );
}

const POPULAR = [
  { href: '/calculators/mortgage-calculator', label: 'Home Loan EMI Calculator' },
  { href: '/calculators/home-loan-eligibility-calculator', label: 'Home Loan Eligibility Calculator' },
  { href: '/calculators/sbi-home-loan-calculator', label: 'SBI Home Loan Calculator' },
  { href: '/calculators/emi-calculator', label: 'EMI Calculator' },
  { href: '/calculators/balance-transfer-savings-calculator', label: 'Balance Transfer Savings' },
  { href: '/calculators/income-tax-calculator', label: 'Income Tax Calculator' },
];
const MORE = [
  { href: '/calculators/car-loan-calculator', label: 'Car Loan EMI Calculator' },
  { href: '/calculators/personal-loan-eligibility-calculator', label: 'Personal Loan Eligibility' },
  { href: '/calculators/fd-calculator', label: 'FD Calculator' },
  { href: '/calculators/sip-calculator', label: 'SIP Calculator' },
];

/* ── Article table styles ──────────────────────────────── */
const thS: React.CSSProperties = {
  padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink,
  background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase',
  letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap',
};
const tdS: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' };
const tdBold: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 600, border: `1px solid ${C.border}`, verticalAlign: 'top' };

/* ── Main Component ────────────────────────────────────── */

export default function HomeLoanPrepaymentClient() {
  const defaultSettings = {
    loanAmount: 5000000,
    rate: 8.5,
    tenureYr: 20,
    prepayAmount: 500000,
    prepayMonth: 12,
    mode: 'tenure' as 'tenure' | 'emi',
  };

  const { settings, updateSettings } = useCalculatorSettings('home-loan-prepayment', defaultSettings);
  const { loanAmount, rate, tenureYr, prepayAmount, prepayMonth, mode } = settings;

  const setLoanAmount   = (v: number) => updateSettings({ loanAmount: v });
  const setRate         = (v: number) => updateSettings({ rate: v });
  const setTenureYr     = (v: number) => updateSettings({ tenureYr: v });
  const setPrepayAmount = (v: number) => updateSettings({ prepayAmount: v });
  const setPrepayMonth  = (v: number) => updateSettings({ prepayMonth: v });
  const setMode         = (v: 'tenure' | 'emi') => updateSettings({ mode: v });

  const [mobile, setMobile]       = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showAmort, setShowAmort] = useState(false);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk();
    window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const { formatCurrency, convertCurrency, selectedCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  const tenureMonths = tenureYr * 12;
  const emi = useMemo(() => calcEMI(loanAmount, rate, tenureMonths), [loanAmount, rate, tenureMonths]);
  const totalInterestWithout = emi * tenureMonths - loanAmount;

  const result = useMemo(
    () => calcPrepaymentSavings(loanAmount, rate, tenureMonths, prepayAmount, prepayMonth, mode),
    [loanAmount, rate, tenureMonths, prepayAmount, prepayMonth, mode],
  );

  const newTenureYr = Math.floor(result.newTenureMonths / 12);
  const newTenureMo = result.newTenureMonths % 12;
  const monthsSavedYr = Math.floor(result.monthsSaved / 12);
  const monthsSavedMo = result.monthsSaved % 12;

  const amortRowsWithPrepay = useMemo(
    () => buildAmortization(loanAmount, rate, tenureMonths, emi, prepayMonth, prepayAmount, mode),
    [loanAmount, rate, tenureMonths, emi, prepayMonth, prepayAmount, mode],
  );

  const amortRowsWithout = useMemo(
    () => buildAmortization(loanAmount, rate, tenureMonths, emi, 99999, 0, 'tenure'),
    [loanAmount, rate, tenureMonths, emi],
  );

  const clampedPrepayMonth = Math.min(prepayMonth, tenureMonths - 1);

  const YR_PRESETS = [5, 10, 15, 20, 25, 30];

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        {/* Header */}
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Home Loan Prepayment Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 820 }}>
            Enter your loan details and a lump-sum prepayment amount to see exactly how much interest you save and how many months drop off your tenure. Compare reduce-tenure vs reduce-EMI side by side.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          {/* LEFT column */}
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>

              {/* Mode toggle inside card */}
              <div role="tablist" aria-label="Prepayment mode"
                style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                {([
                  { id: 'tenure' as const, label: 'Reduce Tenure' },
                  { id: 'emi'    as const, label: 'Reduce EMI' },
                ] as const).map(t => (
                  <button
                    key={t.id} id={`tab-${t.id}`} role="tab"
                    aria-selected={mode === t.id} aria-controls={`panel-${t.id}`}
                    onClick={() => setMode(t.id)}
                    style={{
                      flex: 1, padding: mobile ? '13px 8px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: mobile ? 13 : 14, fontWeight: mode === t.id ? 700 : 400,
                      color: mode === t.id ? C.dark : C.ink3,
                      borderBottom: mode === t.id ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                      transition: 'all 0.15s', fontFamily: INTER,
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* ── Input + Output grid ── */}
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div style={{ padding: mobile ? '20px 18px' : '36px 36px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Loan Details</p>
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider
                        id="loan-amount" label="Loan Amount"
                        value={loanAmount} min={500000} max={50000000} step={100000}
                        display={fmtC(loanAmount)} onChange={setLoanAmount} compact={mobile}
                      />
                      <Slider
                        id="interest-rate" label="Interest Rate (% p.a.)"
                        value={rate} min={7} max={15} step={0.05}
                        display={`${rate.toFixed(2)}%`} onChange={setRate} compact={mobile}
                      />

                      <div style={{ marginBottom: mobile ? 18 : 32 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: mobile ? 8 : 14 }}>
                          <label style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400 }}>Original Tenure</label>
                        </div>
                        <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
                          {YR_PRESETS.map(y => (
                            <button key={y} onClick={() => setTenureYr(y)}
                              style={{ padding: '4px 10px', fontSize: 12, fontWeight: tenureYr === y ? 700 : 500, background: C.white, color: tenureYr === y ? C.ink : C.ink3, border: `${tenureYr === y ? 1.5 : 1}px solid ${tenureYr === y ? C.ink : C.border}`, borderRadius: 6, cursor: 'pointer', fontFamily: INTER, transition: 'all 0.15s' }}>
                              {y}Y
                            </button>
                          ))}
                        </div>
                        <Slider
                          id="tenure-yr" label=""
                          value={tenureYr} min={5} max={30} step={1}
                          display={`${tenureYr} yr`} onChange={setTenureYr} compact={mobile}
                        />
                      </div>

                      <Slider
                        id="prepay-amount" label="Prepayment Amount"
                        value={prepayAmount} min={100000} max={5000000} step={50000}
                        display={fmtC(prepayAmount)} onChange={setPrepayAmount} compact={mobile}
                      />

                      <button
                        onClick={() => setShowAdvanced(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}
                      >
                        More settings
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <Slider
                        id="prepay-month" label="Month of Prepayment"
                        value={clampedPrepayMonth} min={1} max={Math.min(120, tenureMonths - 1)} step={1}
                        display={`Month ${clampedPrepayMonth} (Yr ${Math.ceil(clampedPrepayMonth / 12)})`}
                        onChange={setPrepayMonth} compact={mobile}
                      />
                      <div style={{ marginBottom: 20, padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.ink2 }}>
                        Prepayment at month {clampedPrepayMonth} means after {Math.floor(clampedPrepayMonth / 12)} year{Math.floor(clampedPrepayMonth / 12) !== 1 ? 's' : ''}{clampedPrepayMonth % 12 > 0 ? ` and ${clampedPrepayMonth % 12} month${clampedPrepayMonth % 12 > 1 ? 's' : ''}` : ''} of EMI payments.
                      </div>
                      <button
                        onClick={() => setShowAdvanced(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}
                      >
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 18 9 12 15 6" />
                        </svg>
                        Back
                      </button>
                    </>
                  )}
                </div>

                {/* Output panel */}
                <div style={{ padding: mobile ? '20px 18px' : '36px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  {/* Donut */}
                  <div style={{ order: mobile ? 1 : -1, marginBottom: mobile ? 12 : 16 }}>
                    <DonutChart
                      interestSaved={result.interestSaved}
                      interestPaid={result.totalInterestWithPrepay}
                    />
                  </div>
                  {/* Legend */}
                  <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 18, marginBottom: mobile ? 12 : 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Interest saved</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Interest paid</span>
                    </div>
                  </div>

                  {/* Interest saved highlight */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: mobile ? '14px 16px' : '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#101214' }}>Interest Saved</span>
                    <span
                      aria-live="polite"
                      aria-label={`Interest saved: ${fmtIN(result.interestSaved)}`}
                      style={{ fontSize: mobile ? 20 : 26, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                    >
                      {fmtIN(result.interestSaved)}
                    </span>
                  </div>

                  {/* Tenure saved (only in reduce-tenure mode) */}
                  {mode === 'tenure' && result.monthsSaved > 0 && (
                    <div style={{ width: '100%', background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 10, padding: mobile ? '11px 16px' : '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: C.dark }}>Tenure Cut By</span>
                      <span style={{ fontSize: mobile ? 16 : 20, fontWeight: 800, color: C.dark }}>
                        {monthsSavedYr > 0 ? `${monthsSavedYr}y ` : ''}{monthsSavedMo > 0 ? `${monthsSavedMo}m` : ''}
                      </span>
                    </div>
                  )}

                  {/* New EMI (only in reduce-EMI mode) */}
                  {mode === 'emi' && (
                    <div style={{ width: '100%', background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 10, padding: mobile ? '11px 16px' : '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: C.dark }}>New EMI</span>
                      <span style={{ fontSize: mobile ? 16 : 20, fontWeight: 800, color: C.dark }}>{fmtIN(result.newEMIMode)}</span>
                    </div>
                  )}

                  {/* Metrics */}
                  {[
                    { label: 'Original EMI', value: fmtC(emi) },
                    { label: 'Total interest (without prepayment)', value: fmtC(totalInterestWithout) },
                    { label: 'Total interest (with prepayment)', value: fmtC(result.totalInterestWithPrepay) },
                    ...(mode === 'tenure' ? [{ label: 'New tenure', value: `${newTenureYr > 0 ? `${newTenureYr}y ` : ''}${newTenureMo > 0 ? `${newTenureMo}m` : ''}` }] : []),
                    { label: 'Total savings', value: fmtC(result.interestSaved) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12 : 13.5, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Amortization Schedule ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>
              <button
                onClick={() => setShowAmort(p => !p)}
                aria-expanded={showAmort}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '20px 28px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER }}
              >
                <span style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>Amortization Schedule (with prepayment)</span>
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: showAmort ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {showAmort && (
                <div style={{ padding: mobile ? '0 16px 20px' : '0 24px 24px' }}>
                  {/* Chart legend */}
                  <div style={{ display: 'flex', gap: 18, marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 2, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Principal</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 2, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Interest</span>
                    </div>
                  </div>

                  {/* Bar chart */}
                  <div style={{ marginBottom: 24 }}>
                    <BarChart rows={amortRowsWithPrepay} />
                  </div>

                  {/* Table */}
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <thead>
                        <tr>
                          <th style={thS}>Year</th>
                          <th style={{ ...thS, textAlign: 'right' }}>Opening Balance</th>
                          <th style={{ ...thS, textAlign: 'right' }}>Principal</th>
                          <th style={{ ...thS, textAlign: 'right' }}>Interest</th>
                          <th style={{ ...thS, textAlign: 'right' }}>Closing Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {amortRowsWithPrepay.map((row, i) => (
                          <tr key={row.year} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={tdBold}>{row.year}</td>
                            <td style={{ ...tdS, textAlign: 'right' }}>{fmtC(row.openingBal)}</td>
                            <td style={{ ...tdS, textAlign: 'right', color: C.dark, fontWeight: 600 }}>{fmtC(row.principal)}</td>
                            <td style={{ ...tdS, textAlign: 'right', color: '#B45309' }}>{fmtC(row.interest)}</td>
                            <td style={{ ...tdS, textAlign: 'right' }}>{fmtC(row.closingBal)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* ── WaitlistCard ── */}
            <SaveResultsCard mobile={mobile} />

            

            {/* ── Article ── */}
            <article>

              {/* Section 1 */}
              <section id="what-is-prepayment" style={{ marginBottom: 48 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>
                  What Is Home Loan Prepayment?
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' }}>
                  Home loan prepayment is paying a lump sum toward the outstanding principal on top of your regular EMI. The balance drops immediately, so less interest accrues in subsequent months.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' }}>
                  On a Rs 50 lakh loan at 8.5% for 20 years, prepaying Rs 5 lakh at month 12 cuts total interest from Rs 54.1 lakh to Rs 45.9 lakh, a saving of Rs 8.2 lakh.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' }}>
                  There are two types: part prepayment (loan continues) and full prepayment (loan closes). Both are penalty-free on floating-rate loans per RBI's 2019 guidelines. Fixed-rate loans typically charge 2%.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: 0 }}>
                  Early prepayment saves more interest. A Rs 5 lakh prepayment in year 1 saves twice as much as the same amount in year 10.
                </p>
              </section>

              {/* Section 2 */}
              <section id="prepayment-calculation" style={{ marginBottom: 48 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>
                  How Prepayment Saves Interest: The Math
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' }}>
                  Home loan interest is calculated on the reducing balance. The EMI formula is:
                </p>
                <pre style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 20px', fontSize: 13.5, color: C.ink, overflowX: 'auto', margin: '0 0 16px', fontFamily: 'monospace', lineHeight: 1.7 }}>
{`EMI = P x r x (1+r)^n / ((1+r)^n - 1)
where:
  P = loan principal
  r = monthly rate = annual rate / 12 / 100
  n = tenure in months`}
                </pre>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' }}>
                  Outstanding balance after M months of EMIs:
                </p>
                <pre style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 20px', fontSize: 13.5, color: C.ink, overflowX: 'auto', margin: '0 0 16px', fontFamily: 'monospace', lineHeight: 1.7 }}>
{`Balance(M) = P x (1+r)^M - EMI x ((1+r)^M - 1) / r`}
                </pre>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' }}>
                  For a Rs 50 lakh loan at 8.5%, the outstanding balance after 12 months is approximately Rs 49.38 lakh. A Rs 5 lakh prepayment reduces it to Rs 44.38 lakh.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' }}>
                  In reduce-tenure mode, the EMI stays at Rs 43,391, but tenure drops to 192 months (from 240), saving 48 months and Rs 8.2 lakh in interest.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: 0 }}>
                  In reduce-EMI mode, the EMI drops to Rs 39,640, but tenure stays at 228 months. Total interest is higher because the loan runs longer.
                </p>
              </section>

              {/* Section 3 */}
              <section id="reduce-tenure-vs-emi" style={{ marginBottom: 48 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>
                  Reduce Tenure vs Reduce EMI: Which Is Better?
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' }}>
                  Reduce tenure saves more interest because you eliminate future months entirely. Reduce EMI keeps the same tenure but lowers monthly outgo.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' }}>
                  For the same prepayment amount, tenure reduction always saves more interest than EMI reduction. The math is clear.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>
                  The comparison on a Rs 50 lakh loan at 8.5%, Rs 5 lakh prepayment at month 12:
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                      <tr>
                        <th style={thS}>Metric</th>
                        <th style={{ ...thS, textAlign: 'right' }}>Without Prepayment</th>
                        <th style={{ ...thS, textAlign: 'right' }}>Reduce Tenure</th>
                        <th style={{ ...thS, textAlign: 'right' }}>Reduce EMI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { metric: 'Monthly EMI', without: 'Rs 43,391', tenure: 'Rs 43,391', emi: 'Rs 39,640' },
                        { metric: 'Tenure', without: '240 months (20 yr)', tenure: '192 months (16 yr)', emi: '240 months (20 yr)' },
                        { metric: 'Total interest', without: 'Rs 54.1 lakh', tenure: 'Rs 45.9 lakh', emi: 'Rs 47.5 lakh' },
                        { metric: 'Interest saved', without: '--', tenure: 'Rs 8.2 lakh', emi: 'Rs 6.6 lakh' },
                      ].map((row, i) => (
                        <tr key={row.metric} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdBold}>{row.metric}</td>
                          <td style={{ ...tdS, textAlign: 'right' }}>{row.without}</td>
                          <td style={{ ...tdS, textAlign: 'right', color: C.dark, fontWeight: 600 }}>{row.tenure}</td>
                          <td style={{ ...tdS, textAlign: 'right' }}>{row.emi}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: 0 }}>
                  Choose reduce EMI only if you genuinely need the cash flow relief. If your job is stable and your current EMI is manageable, reduce tenure. The Rs 1.6 lakh difference in interest savings between the two modes on this example grows larger as the loan amount increases.
                </p>
              </section>

              {/* Section 4 */}
              <section id="prepayment-charges" style={{ marginBottom: 48 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>
                  Home Loan Prepayment Charges: Bank Comparison
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>
                  Per RBI's guidelines effective October 2019, no bank can charge prepayment penalties on floating-rate home loans to individual borrowers. This applies to both part and full prepayment. Fixed-rate home loans are exempt from this rule and typically carry a 2% penalty.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                      <tr>
                        <th style={thS}>Bank / Lender</th>
                        <th style={{ ...thS, textAlign: 'center' }}>Floating Rate</th>
                        <th style={{ ...thS, textAlign: 'center' }}>Fixed Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { bank: 'SBI', floating: 'Nil', fixed: '2%' },
                        { bank: 'HDFC Bank', floating: 'Nil', fixed: '2%' },
                        { bank: 'ICICI Bank', floating: 'Nil', fixed: '2%' },
                        { bank: 'Axis Bank', floating: 'Nil', fixed: '2%' },
                        { bank: 'LIC HFL', floating: 'Nil', fixed: '2% to 3%' },
                      ].map((row, i) => (
                        <tr key={row.bank} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdBold}>{row.bank}</td>
                          <td style={{ ...tdS, textAlign: 'center', color: C.ink, fontWeight: 600 }}>{row.floating}</td>
                          <td style={{ ...tdS, textAlign: 'center', color: C.ink, fontWeight: 600 }}>{row.fixed}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: 0 }}>
                  Rates are as of September 2026 and subject to change. Always verify directly with your lender before making a prepayment, especially if your loan has both floating and fixed rate segments.
                </p>
              </section>

              {/* Section 5 */}
              <section id="best-time-to-prepay" style={{ marginBottom: 48 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>
                  Best Time to Make a Prepayment
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' }}>
                  The best time is as early as possible. In year 1 of a 20-year loan at 8.5%, 71% of each EMI is interest. By year 10, the split is 50-50. Prepay early to cut years with high interest costs.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' }}>
                  A Rs 10 lakh prepayment on a Rs 50 lakh loan at 8.5% in year 1 saves approximately Rs 16 lakh in interest and cuts tenure by 8 years. This is a guaranteed return that no fixed deposit can match.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: 0 }}>
                  If you are in the old tax regime claiming Section 24(b), your effective interest cost drops by your tax bracket. At 30% tax, an 8.5% loan effective rate is 5.95%. Equity investments above 6% may match prepayment benefit in this case.
                </p>
              </section>

              {/* Section 5.5 - New: Interest Rate Strategy */}
              <section id="interest-rate-strategy" style={{ marginBottom: 48 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>
                  Home Loan Interest Rates: Choosing Between Banks
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' }}>
                  As of September 2026, SBI starts at 8.25%, HDFC Bank at 8.35%, and ICICI at 8.40%. On a Rs 50 lakh loan, this 15-basis-point difference costs approximately Rs 1.3 lakh more in total interest with ICICI.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' }}>
                  Compare the spread over RBI repo rate, reset frequency, and rate-cut history. SBI and HDFC pass on RBI cuts faster than smaller banks. During 2025's cut cycle, SBI moved within 1-2 months while others took 3-4 months.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: 0 }}>
                  For first-time buyers, SBI and HDFC offer the lowest rates. ICICI and Axis are strong for salaried employees with employer tie-ups. Choose based on your job type and 2-3 year rate outlook.
                </p>
              </section>

              {/* Section 6 - New: Prepayment Strategy by Amount */}
              <section id="prepayment-strategy" style={{ marginBottom: 48 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>
                  Prepayment Strategy: How Much Should You Prepay?
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' }}>
                  Keep 6 months of living expenses as liquid cash before prepaying regularly. Once that buffer exists, direct bonuses and windfalls toward prepayment.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' }}>
                  A 15-20% prepayment in year 1 is effective. On Rs 50 lakh, a Rs 7.5-10 lakh prepayment in year 1 saves Rs 11-16 lakh in interest.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' }}>
                  Small regular prepayments work too. Five years of Rs 50,000 annual prepayments total Rs 2.5 lakh but save Rs 4.1 lakh in interest.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: 0 }}>
                  Don't prepay if your emergency fund is thin or job is unstable. Clear personal loans (12-24%) and credit card debt (18-36%) first. A 20% personal loan rate always beats 8.5% home loan prepayment.
                </p>
              </section>

              {/* Section 6 */}
              <section id="how-to-use" style={{ marginBottom: 48 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>
                  How to Use This Prepayment Calculator
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>
                  The calculator requires four inputs and produces a complete savings breakdown in real time. Here is the exact sequence:
                </p>
                <ol style={{ paddingLeft: 20, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: 'Set the original loan amount:', text: 'Use the slider or click the value button to type. For example, Rs 50 lakh for a typical metro home purchase.' },
                    { label: 'Enter the annual interest rate:', text: 'Use your actual loan rate. SBI floating rate starts at 8.25% as of July 2026; HDFC starts at 8.35%. Adjust to match your sanction letter.' },
                    { label: 'Set the original tenure:', text: 'The tenure at which the loan was sanctioned. Use the year preset buttons (5Y, 10Y, 20Y) for quick selection.' },
                    { label: 'Enter the prepayment amount:', text: 'The lump sum you plan to pay. Start with what you have available and see the impact before committing.' },
                    { label: 'Set prepayment month in More settings:', text: 'Click "More settings" and drag the slider to indicate when in the tenure you will prepay. Month 12 means after your first year of EMIs.' },
                    { label: 'Toggle between Reduce Tenure and Reduce EMI:', text: 'Use the tab at the top of the calculator card. Compare both modes to decide which suits your situation.' },
                  ].map((item, i) => (
                    <li key={i} style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85 }}>
                      <strong style={{ color: C.ink }}>{item.label}</strong> {item.text}
                    </li>
                  ))}
                </ol>
              </section>

              {/* Section 7: Common Mistakes */}
              <section id="prepayment-mistakes" style={{ marginBottom: 48 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>
                  Common Mistakes to Avoid When Prepaying
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' }}>
                  The biggest mistake is waiting until year 10 to start prepaying. A Rs 5 lakh prepayment at month 12 saves Rs 8.2 lakh; that same amount at month 120 saves only Rs 2.8 lakh.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' }}>
                  Never deplete your emergency fund to prepay. A home loan at 8.5% is cheap money compared to a personal loan at 15-20%. Keep 6-12 months of living expenses liquid before prepaying.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' }}>
                  Confirm your loan type before prepaying. A 2% penalty on a Rs 10 lakh prepayment is Rs 2 lakh of your interest savings gone. Fixed-rate loans charge penalties; floating-rate loans don't.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: 0 }}>
                  Choose reduce EMI if your salary is variable. Choose reduce tenure if your salary is stable. Base your choice on your income pattern, not on what sounds better.
                </p>
              </section>

              {/* Section 8: Processing Prepayment */}
              <section id="how-to-process-prepayment" style={{ marginBottom: 48 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>
                  Step-by-Step Guide to Processing a Prepayment
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>
                  Once you have decided on the prepayment amount, here is the exact process:
                </p>
                <ol style={{ paddingLeft: 20, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: 'Gather your loan documents:', text: 'Collect your loan account number, original sanction letter, and recent passbook or statement.' },
                    { label: 'Check your loan type:', text: 'Confirm whether your loan is floating or fixed rate. Floating rate has zero prepayment charges; fixed rate typically charges 2%.' },
                    { label: 'Visit the bank or use net banking:', text: 'Most banks allow prepayment via net banking (fastest option) or in-branch with cheque. Net banking transactions are instant and require no paperwork.' },
                    { label: 'Specify the prepayment amount and mode:', text: 'Clearly mention whether you want to reduce tenure (same EMI, shorter loan) or reduce EMI (same tenure, lower monthly payment).' },
                    { label: 'Make the payment:', text: 'Transfer the funds via NEFT, cheque, or demand draft. The bank will deduct the amount from your loan principal immediately.' },
                    { label: 'Request a revised amortization schedule:', text: 'Ask the bank for an updated schedule showing the new EMI, new tenure, or new total interest, depending on your mode choice.' },
                    { label: 'Update your personal records:', text: 'Keep a copy of the revised schedule. Some borrowers update their home accounting software to track progress.' },
                  ].map((item, i) => (
                    <li key={i} style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85 }}>
                      <strong style={{ color: C.ink }}>{item.label}</strong> {item.text}
                    </li>
                  ))}
                </ol>
              </section>

              {/* Section 9: Multiple Prepayments Strategy */}
              <section id="multiple-prepayments" style={{ marginBottom: 48 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>
                  Strategy for Multiple Prepayments Over Time
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' }}>
                  RBI allows unlimited prepayments per year. Make smaller prepayments aligned with bonuses instead of one large payment.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' }}>
                  Example: on a Rs 50 lakh loan at 8.5%, prepay Rs 50,000 every April on your bonus. Over 5 years, this accumulates to Rs 2.5 lakh and saves Rs 4.1 lakh in interest.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' }}>
                  Salaried employees can plan prepayments around April bonuses. Freelancers should wait until they have 6-12 months emergency cash before starting.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: 0 }}>
                  The total amount matters more than frequency. Consistency over time beats waiting for one large sum.
                </p>
              </section>

              

              {/* Section 10: FAQ */}
              <section id="faq" style={{ marginBottom: 48 }}>
                <h2 style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 20px', letterSpacing: '-0.02em' }}>
                  Frequently Asked Questions
                </h2>
                <FAQ />
              </section>

            </article>
          </div>

          {/* RIGHT sidebar */}
          <style>{`.hl-prepay-sidebar::-webkit-scrollbar{width:5px}.hl-prepay-sidebar::-webkit-scrollbar-track{background:transparent}.hl-prepay-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.hl-prepay-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="hl-prepay-sidebar" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <SidebarList title="Popular calculators" items={POPULAR} />
              <SidebarList title="More tools" items={MORE} />

              {/* Context box */}
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px' }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: C.ink, margin: '0 0 8px' }}>About this calculator</p>
                <p style={{ fontSize: 13, color: C.ink2, lineHeight: 1.7, margin: '0 0 10px' }}>
                  This calculator uses the standard reducing-balance method used by all Indian lenders. It computes the outstanding balance at the prepayment month and recalculates tenure or EMI based on the chosen mode.
                </p>
                <p style={{ fontSize: 13, color: C.ink2, lineHeight: 1.7, margin: 0 }}>
                  Results are indicative. Actual savings may vary slightly based on your lender's interest compounding method and processing date.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/mortgage-calculator|Home Loan EMI', '/calculators/home-loan-eligibility-calculator|Eligibility', '/calculators/emi-calculator|EMI', '/calculators/balance-transfer-savings-calculator|Balance Transfer', '/calculators/sip-calculator|SIP', '/calculators/fd-calculator|FD', '/calculators/income-tax-calculator|Tax', '/calculators/personal-loan-calculator|Personal Loan'] },
        { hd: 'Topics', links: ['/calculators|All calculators', '/blogs|Articles', '/about|About', '/contact|Contact'] },
        { hd: 'Legal', links: ['/privacy|Privacy Policy', '/terms|Terms of Use'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useId, useRef } from 'react';
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
  dark: '#101214',
  lime: '#a6dbc4',
  lime2: '#2d9970',
  paleLime: '#f4f5f6',
  ink: '#16140F',
  ink2: '#50565c',
  ink3: '#7a8087',
  white: '#ffffff',
  bg: '#f6f7f8',
  border: '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

/* ── Table Styles ──────────────────────────────────────── */
const thS = {
  padding: '9px 14px',
  fontSize: 11.5,
  fontWeight: 700,
  color: C.ink,
  background: '#f4f5f6',
  textAlign: 'left' as const,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  border: `1px solid ${C.border}`,
  whiteSpace: 'nowrap' as const,
  verticalAlign: 'middle' as const,
};
const tdL = {
  padding: '10px 14px',
  fontSize: 13,
  color: C.ink2,
  border: `1px solid ${C.border}`,
  verticalAlign: 'middle' as const,
  textAlign: 'left' as const,
} as React.CSSProperties;
const tdR = {
  padding: '10px 14px',
  fontSize: 13,
  color: C.ink,
  fontWeight: 500,
  border: `1px solid ${C.border}`,
  verticalAlign: 'middle' as const,
  textAlign: 'right' as const,
} as React.CSSProperties;

/* ── Adsterra Banner (300×250) ─────────────────────────── */
function AdsterraBanner() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    (window as unknown as Record<string, unknown>).atOptions = {
      key: 'fc2a25af726d1df25423b6768dd402a9',
      format: 'iframe',
      height: 250,
      width: 300,
      params: {},
    };
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://www.highperformanceformat.com/fc2a25af726d1df25423b6768dd402a9/invoke.js';
    ref.current.appendChild(s);
  }, []);
  return <div ref={ref} style={{ width: 300, height: 250, overflow: 'hidden' }} />;
}

/* ── Slider ────────────────────────────────────────────── */
function Slider({
  label,
  id: idProp,
  value,
  min,
  max,
  step,
  display,
  onChange,
  compact,
  suffix,
}: {
  label: string;
  id?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
  compact?: boolean;
  suffix?: string;
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
    <div style={{ marginBottom: compact ? 18 : 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 8 : 12 }}>
        {label ? (
          <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 13.5 : 14.5, color: C.ink2, fontWeight: 400 }}>
            {label}
          </label>
        ) : (
          <span />
        )}
        {editing ? (
          <div style={{ position: 'relative' }}>
            <input
              id={inputId}
              autoFocus
              value={raw}
              aria-label={`Enter ${label} value`}
              onChange={e => setRaw(e.target.value)}
              onBlur={commit}
              onKeyDown={e => e.key === 'Enter' && commit()}
              style={{
                fontSize: 14,
                fontWeight: 700,
                textAlign: suffix ? 'left' : 'right',
                background: C.white,
                border: `1.5px solid ${C.dark}`,
                borderRadius: 8,
                padding: compact ? '5px 10px' : '7px 12px',
                width: 120,
                outline: 'none',
                color: C.dark,
                fontFamily: INTER,
              }}
            />
            {suffix && (
              <span
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: 13,
                  color: C.ink3,
                  pointerEvents: 'none',
                  fontWeight: 700,
                }}
              >
                {suffix}
              </span>
            )}
          </div>
        ) : (
          <button
            onClick={() => {
              setRaw(String(value));
              setEditing(true);
            }}
            aria-label={`${label}: ${display}. Click to edit.`}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}
            style={{
              fontSize: compact ? 13 : 14.5,
              fontWeight: 700,
              color: C.dark,
              background: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              padding: compact ? '5px 12px' : '7px 16px',
              cursor: 'pointer',
              fontFamily: INTER,
              letterSpacing: '-0.01em',
              minWidth: compact ? 80 : 100,
              textAlign: 'center',
              transition: 'border-color 0.15s',
            }}
          >
            {display}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 22, display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            position: 'absolute',
            inset: 'auto 0',
            height: 4,
            borderRadius: 99,
            background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: `${pct}%`,
            top: '50%',
            transform: 'translate(-50%,-50%)',
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: C.white,
            border: `2.5px solid ${C.dark}`,
            boxShadow: '0 2px 6px rgba(16,18,20,0.2)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
        <input
          id={rangeId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-label={label}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          onChange={e => onChange(+e.target.value)}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{ fontSize: 11, color: C.ink3 }}>
          {min}
          {suffix || ''}
        </span>
        <span style={{ fontSize: 11, color: C.ink3 }}>
          {max}
          {suffix || ''}
        </span>
      </div>
    </div>
  );
}

/* ── Donut Chart ───────────────────────────────────────── */
function DonutChart({
  equityValue,
  loanBalance,
}: {
  equityValue: number;
  loanBalance: number;
}) {
  const total = Math.max(1, equityValue + loanBalance);
  const eqPct = (equityValue / total) * 100;
  const r = 40;
  const circ = 2 * Math.PI * r;
  const strokeDashoffset = circ - (eqPct / 100) * circ;

  return (
    <svg
      width="140"
      height="140"
      viewBox="0 0 100 100"
      role="img"
      aria-label={`Property equity split: ${Math.round(eqPct)}% Home Equity Owned, ${Math.round(100 - eqPct)}% Outstanding Debt`}
    >
      <circle cx="50" cy="50" r={r} fill="none" stroke="#50565c" strokeWidth="16" />
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke={CHART_PAIR.primary}
        strokeWidth="16"
        strokeDasharray={circ}
        strokeDashoffset={strokeDashoffset}
        transform="rotate(-90 50 50)"
        style={{ transition: 'stroke-dashoffset 0.4s ease' }}
      />
      <text x="50" y="46" textAnchor="middle" fill={C.ink} fontSize="10" fontWeight="700" fontFamily={INTER}>
        Owned Equity
      </text>
      <text x="50" y="60" textAnchor="middle" fill={C.dark} fontSize="10" fontWeight="800" fontFamily={INTER}>
        {Math.round(eqPct)}%
      </text>
    </svg>
  );
}

/* ── Sidebar Component ─────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <div style={{ padding: '14px 18px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 13.5, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div
            style={{
              padding: '12px 18px',
              borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none',
              fontSize: 13,
              color: C.ink2,
              transition: 'all 0.12s',
            }}
            onMouseOver={e => {
              (e.currentTarget as HTMLElement).style.background = C.paleLime;
              (e.currentTarget as HTMLElement).style.color = C.dark;
            }}
            onMouseOut={e => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.color = C.ink2;
            }}
          >
            {label}
          </div>
        </Link>
      ))}
    </div>
  );
}

function EquitySnapshot() {
  const rows = [
    { label: 'Bank Max Top-up LTV', value: '80% Combined' },
    { label: 'Top-up Loan Rates', value: '8.75% - 9.50%' },
    { label: 'Sec 24(b) Top-up Benefit', value: 'Up to Rs 2 Lakh/yr' },
    { label: 'Tenure Available', value: 'Up to Remaining Loan' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>
          Top-Up Benchmarks
        </span>
      </div>
      {rows.map((r, i) => (
        <div
          key={r.label}
          style={{
            padding: '11px 16px',
            borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none',
            background: C.white,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 12.5, color: C.ink2 }}>{r.label}</span>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: C.ink }}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

function RelatedReads() {
  const links = [
    { href: '/calculators/home-loan-calculator', label: 'Home Loan EMI Calculator' },
    { href: '/calculators/balance-transfer-savings-calculator', label: 'Balance Transfer Calculator' },
    { href: '/calculators/annual-home-maintenance-calculator', label: 'Annual Home Maintenance Calculator' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>
          Related Reads
        </span>
      </div>
      {links.map((l, i) => (
        <Link
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            padding: '13px 16px',
            borderBottom: i < links.length - 1 ? `1px solid ${C.border}` : 'none',
            textDecoration: 'none',
            background: C.white,
          }}
        >
          <span style={{ fontSize: 13, color: C.dark, fontWeight: 500, lineHeight: 1.5, display: 'block' }}>{l.label}</span>
        </Link>
      ))}
    </div>
  );
}

const POPULAR_TOOLS = [
  { href: '/calculators/home-loan-calculator', label: 'Home Loan EMI Calculator' },
  { href: '/calculators/home-loan-eligibility-calculator', label: 'Home Loan Eligibility Calculator' },
  { href: '/calculators/down-payment-planner-calculator', label: 'Down Payment Planner Calculator' },
  { href: '/calculators/annual-home-maintenance-calculator', label: 'Annual Home Maintenance Calculator' },
  { href: '/calculators/home-buying-total-cost-calculator', label: 'Home Buying Total Cost Calculator' },
  { href: '/calculators/rental-yield-calculator', label: 'Rental Yield Calculator' },
  { href: '/calculators/state-wise-stamp-duty-calculator', label: 'State-Wise Stamp Duty Calculator' },
];
const MORE_TOOLS = [
  { href: '/calculators/balance-transfer-savings-calculator', label: 'Balance Transfer Calculator' },
  { href: '/calculators/loan-against-property-calculator', label: 'Loan Against Property Calculator' },
  { href: '/calculators/property-tax-estimator', label: 'Property Tax Estimator' },
  { href: '/calculators/home-insurance-coverage-calculator', label: 'Home Insurance Coverage Calculator' },
  { href: '/calculators/sip-calculator', label: 'SIP Calculator' },
];

/* ── FAQS ──────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What is home equity?',
    a: 'Home equity is the portion of your property that you truly own unencumbered by debt: Net Equity = Current Market Value minus Outstanding Home Loan Balance.',
  },
  {
    q: 'How does home equity grow over time?',
    a: 'Home equity increases in two ways: through property market value appreciation and by reducing your outstanding mortgage principal with monthly home loan EMI payments.',
  },
  {
    q: 'What is Loan-to-Value (LTV) ratio in India?',
    a: 'LTV ratio is the percentage of property value financed by a bank: LTV % = (Outstanding Loan Balance / Current Market Value) × 100. RBI caps initial home loan LTV between 75% to 90% depending on property value.',
  },
  {
    q: 'How much top-up loan can I get against home equity?',
    a: 'Most Indian banks (like SBI, HDFC Bank, ICICI Bank) sanction top-up home loans up to an 80% combined LTV limit: Borrowable Top-up = (Current Market Value × 80%) minus Outstanding Home Loan Balance.',
  },
  {
    q: 'Can I use home equity for home renovation or debt consolidation?',
    a: 'Yes, top-up home loans backed by home equity offer substantially lower interest rates (typically 8.75% to 9.5%) than unsecured personal loans (11% to 18%) and can fund renovation, higher education, or high-cost debt consolidation.',
  },
  {
    q: 'What interest rates apply to top-up home loans in India?',
    a: 'Top-up home loan interest rates are typically 0.25% to 0.75% higher than standard home loan rates, usually ranging between 8.75% to 9.75% per annum.',
  },
  {
    q: 'What happens to home equity if property prices drop?',
    a: 'If market property prices drop significantly, your home equity decreases. If prices fall below your remaining loan balance, it leads to negative equity (an underwater mortgage).',
  },
  {
    q: 'How does paying extra principal build home equity faster?',
    a: 'Making partial home loan prepayments reduces principal outstanding immediately, which directly increases your net home equity and lowers total interest paid.',
  },
  {
    q: 'Is a home equity top-up loan tax-deductible under Section 24?',
    a: 'Interest paid on a top-up loan is tax-deductible up to Rs 30,000 per year under Section 24(b) if used for repairs or renovation, or up to Rs 2 Lakh if used for property construction or acquisition.',
  },
  {
    q: 'What documents are required to apply for a top-up home loan?',
    a: 'Banks require property valuation reports, updated income slips, 6 months bank statements, and a clean track record of timely home loan EMI payments for at least 12 to 24 months.',
  },
  {
    q: 'How does this home equity calculator work?',
    a: 'This calculator computes current net equity, LTV percentage, borrowable top-up loan limit, and projects 5-year equity growth based on market value, loan balance, and appreciation rate.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.',
  },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

export default function HomeEquityClient() {
  const [mobile, setMobile] = useState<boolean>(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const { formatCurrency, selectedCurrency } = useCurrency();

  const [activeTab, setActiveTab] = useState<'equity' | 'topup'>('equity');

  // Input states
  const [currentMarketValue, setCurrentMarketValue] = useState<number>(12500000); // 1.25 Cr
  const [outstandingLoan, setOutstandingLoan] = useState<number>(5000000); // 50 Lakh
  const [appreciationRate, setAppreciationRate] = useState<number>(6.0); // 6% p.a.
  const [loanInterestRate, setLoanInterestRate] = useState<number>(8.5); // 8.5% p.a.
  const [remainingTenureYears, setRemainingTenureYears] = useState<number>(12); // 12 years
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Restore state
  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-home-equity-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (d.currentMarketValue !== undefined) setCurrentMarketValue(d.currentMarketValue);
      if (d.outstandingLoan !== undefined) setOutstandingLoan(d.outstandingLoan);
      if (d.appreciationRate !== undefined) setAppreciationRate(d.appreciationRate);
      if (d.loanInterestRate !== undefined) setLoanInterestRate(d.loanInterestRate);
      if (d.remainingTenureYears !== undefined) setRemainingTenureYears(d.remainingTenureYears);
    } catch {
      /* ignore */
    }
  }, []);

  // Save state
  useEffect(() => {
    try {
      localStorage.setItem(
        'fermor-home-equity-v1',
        JSON.stringify({
          currentMarketValue,
          outstandingLoan,
          appreciationRate,
          loanInterestRate,
          remainingTenureYears,
        })
      );
    } catch {
      /* ignore */
    }
  }, [currentMarketValue, outstandingLoan, appreciationRate, loanInterestRate, remainingTenureYears]);

  const currencySymbol = selectedCurrency?.symbol || '₹';
  const fmtC = (val: number) => {
    if (val >= 10000000) return `${currencySymbol}${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `${currencySymbol}${(val / 100000).toFixed(2)} L`;
    return formatCurrency(val);
  };
  const fmtIN = (val: number) => formatCurrency(val);

  // Math Calculations
  const calculations = useMemo(() => {
    const netEquity = Math.max(0, currentMarketValue - outstandingLoan);
    const equityPercentage = currentMarketValue > 0 ? (netEquity / currentMarketValue) * 100 : 0;
    const ltvRatio = currentMarketValue > 0 ? (outstandingLoan / currentMarketValue) * 100 : 0;

    // Bank max top-up at 80% combined LTV
    const maxPermissibleDebt = Math.round(currentMarketValue * 0.80);
    const maxTopUpLimit = Math.max(0, maxPermissibleDebt - outstandingLoan);

    // Monthly EMI calculation on remaining loan
    const r = loanInterestRate / 100 / 12;
    const n = remainingTenureYears * 12;
    let monthlyEMI = 0;
    if (r > 0 && n > 0 && outstandingLoan > 0) {
      monthlyEMI = Math.round((outstandingLoan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    }

    // 5-Year Equity Projection Schedule
    const projectionSchedule = [];
    let projVal = currentMarketValue;
    let projBal = outstandingLoan;

    for (let yr = 1; yr <= 5; yr++) {
      projVal = Math.round(projVal * (1 + appreciationRate / 100));

      // 12 months amortization
      for (let m = 0; m < 12; m++) {
        const interest = projBal * r;
        const principalPaid = monthlyEMI - interest;
        projBal = Math.max(0, projBal - principalPaid);
      }

      const projEquity = Math.max(0, projVal - projBal);
      const projEqPct = (projEquity / projVal) * 100;
      projectionSchedule.push({
        year: yr,
        marketValue: projVal,
        loanBalance: projBal,
        equityValue: projEquity,
        equityPct: projEqPct,
      });
    }

    return {
      netEquity,
      equityPercentage,
      ltvRatio,
      maxPermissibleDebt,
      maxTopUpLimit,
      monthlyEMI,
      projectionSchedule,
    };
  }, [currentMarketValue, outstandingLoan, appreciationRate, loanInterestRate, remainingTenureYears]);

  const secS = { marginBottom: 32 };
  const h2S = { fontSize: mobile ? 20 : 24, fontWeight: 700, color: C.ink, marginBottom: 14, letterSpacing: '-0.02em' };
  const pS = { fontSize: 15, color: C.ink2, lineHeight: 1.75, marginBottom: 14 };

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 24 : 32, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Home Equity Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate current net home equity, Loan-to-Value (LTV) ratio, borrowable top-up home loan limit, and 5-year projected equity growth in India.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>
            {/* ── CALCULATOR CARD WITH TABS ── */}
            <div
              style={{
                background: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 1px 16px rgba(16,18,20,0.06)',
                marginBottom: 36,
              }}
            >
              {/* Tabs at top of card */}
              <div role="tablist" aria-label="Calculator mode" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                <button
                  id="tab-equity"
                  role="tab"
                  aria-selected={activeTab === 'equity'}
                  aria-controls="panel-equity"
                  onClick={() => setActiveTab('equity')}
                  style={{
                    flex: 1,
                    padding: mobile ? '13px 6px' : '15px 20px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5,
                    fontWeight: activeTab === 'equity' ? 700 : 400,
                    color: activeTab === 'equity' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'equity' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s',
                    fontFamily: INTER,
                  }}
                >
                  Net Home Equity
                </button>
                <button
                  id="tab-topup"
                  role="tab"
                  aria-selected={activeTab === 'topup'}
                  aria-controls="panel-topup"
                  onClick={() => setActiveTab('topup')}
                  style={{
                    flex: 1,
                    padding: mobile ? '13px 6px' : '15px 20px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5,
                    fontWeight: activeTab === 'topup' ? 700 : 400,
                    color: activeTab === 'topup' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'topup' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s',
                    fontFamily: INTER,
                  }}
                >
                  Borrowable Top-Up Loan
                </button>
              </div>

              {/* Tab Panel */}
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                {/* Input Panel */}
                <div
                  style={{
                    padding: mobile ? '20px 18px' : '32px 36px',
                    borderRight: mobile ? 'none' : `1px solid ${C.border}`,
                    borderBottom: mobile ? `1px solid ${C.border}` : 'none',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
                      Property &amp; Loan Inputs
                    </p>
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider
                        id="market-val"
                        label="Current Property Market Value"
                        value={currentMarketValue}
                        min={2000000}
                        max={50000000}
                        step={500000}
                        display={fmtC(currentMarketValue)}
                        onChange={setCurrentMarketValue}
                        compact
                      />

                      <Slider
                        id="out-loan"
                        label="Outstanding Home Loan Balance"
                        value={outstandingLoan}
                        min={0}
                        max={currentMarketValue}
                        step={250000}
                        display={fmtC(outstandingLoan)}
                        onChange={setOutstandingLoan}
                        compact
                      />

                      <Slider
                        id="prop-apprec"
                        label="Expected Annual Appreciation (%)"
                        value={appreciationRate}
                        min={2.0}
                        max={15.0}
                        step={0.5}
                        display={`${appreciationRate}%`}
                        onChange={setAppreciationRate}
                        compact
                        suffix="%"
                      />

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                        <button
                          onClick={() => setShowAdvanced(true)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            fontSize: 13,
                            color: C.dark,
                            background: 'none',
                            border: `1px solid ${C.border}`,
                            borderRadius: 8,
                            padding: '7px 14px',
                            cursor: 'pointer',
                            fontFamily: INTER,
                            fontWeight: 600,
                          }}
                        >
                          Loan Terms &amp; Amortization
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Slider
                        id="loan-int-rate"
                        label="Home Loan Interest Rate (%)"
                        value={loanInterestRate}
                        min={6.5}
                        max={14.0}
                        step={0.25}
                        display={`${loanInterestRate}%`}
                        onChange={setLoanInterestRate}
                        compact
                        suffix="%"
                      />

                      <Slider
                        id="rem-tenure"
                        label="Remaining Loan Tenure (Years)"
                        value={remainingTenureYears}
                        min={1}
                        max={30}
                        step={1}
                        display={`${remainingTenureYears} Yr${remainingTenureYears > 1 ? 's' : ''}`}
                        onChange={setRemainingTenureYears}
                        compact
                        suffix=" Yrs"
                      />

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                        <button
                          onClick={() => setShowAdvanced(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            fontSize: 13,
                            color: C.dark,
                            background: 'none',
                            border: `1px solid ${C.border}`,
                            borderRadius: 8,
                            padding: '7px 14px',
                            cursor: 'pointer',
                            fontFamily: INTER,
                            fontWeight: 600,
                          }}
                        >
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                          </svg>
                          Basic
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Output Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '32px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* Donut Chart */}
                  <div style={{ order: mobile ? 1 : -1, marginBottom: mobile ? 14 : 18 }}>
                    <DonutChart equityValue={calculations.netEquity} loanBalance={outstandingLoan} />
                  </div>

                  {/* Donut Legend */}
                  <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 16, marginBottom: mobile ? 12 : 18 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Net Equity Owned</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: '#50565c' }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Outstanding Mortgage</span>
                    </div>
                  </div>

                  {/* Primary result box */}
                  <div
                    style={{
                      width: '100%',
                      background: '#F4F5F6', border: '1px solid #E3E6E8',
                      borderRadius: 12,
                      padding: mobile ? '14px 16px' : '16px 20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 12,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#50565C' }}>
                        {activeTab === 'equity' ? 'Net Home Equity Value' : 'Borrowable Top-Up Loan Limit'}
                      </div>
                      <div style={{ fontSize: 11, color: '#7A8087', marginTop: 2 }}>
                        {activeTab === 'equity'
                          ? `${calculations.equityPercentage.toFixed(1)}% of Property Value Owned`
                          : `At 80% Combined LTV Max Limit`}
                      </div>
                    </div>
                    <span
                      aria-live="polite"
                      aria-label={
                        activeTab === 'equity'
                          ? `Net Home Equity: ${fmtC(calculations.netEquity)}`
                          : `Borrowable Top-Up: ${fmtC(calculations.maxTopUpLimit)}`
                      }
                      style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                    >
                      {activeTab === 'equity' ? fmtC(calculations.netEquity) : fmtC(calculations.maxTopUpLimit)}
                    </span>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: 'Current Loan-to-Value (LTV)', value: `${calculations.ltvRatio.toFixed(1)}%` },
                    { label: 'Max Permissible Debt (80% LTV)', value: fmtC(calculations.maxPermissibleDebt) },
                    { label: 'Estimated Monthly Home Loan EMI', value: fmtIN(calculations.monthlyEMI) },
                    { label: '5-Year Projected Equity Value', value: fmtC(calculations.projectionSchedule[4]?.equityValue || 0) },
                    { label: '5-Year Projected Property Price', value: fmtC(calculations.projectionSchedule[4]?.marketValue || 0) },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 0',
                        borderBottom: `1px solid ${C.border}`,
                        width: '100%',
                      }}
                    >
                      <span style={{ fontSize: 13, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Waitlist Card */}
            <div style={{ marginBottom: 24 }}>
              <SaveResultsCard mobile={mobile} />
            </div>

            

            {/* ════════════════════ ARTICLE CONTENT ════════════════════ */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>
              <div style={secS} id="what-is-home-equity">
                <h2 style={h2S}>What Is Home Equity and How Does It Work in India?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Home equity is the true unencumbered market value of your real estate property after deducting all outstanding mortgage debt owed to banks or housing finance companies.
                  </p>
                </div>
                <p style={pS}>
                  When you initially purchase a home with a 20% down payment, your starting equity is exactly 20% of the property value. As you pay your monthly home loan EMIs, each payment chips away at the principal balance while the property market value compounds upward over time, expanding your net financial wealth.
                </p>
                <p style={pS}>
                  Plan your overall ongoing property upkeep costs with the{' '}
                  <Link href="/calculators/annual-home-maintenance-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    Annual Home Maintenance Calculator
                  </Link>.
                </p>
              </div>

              <div style={secS} id="how-equity-grows">
                <h2 style={h2S}>How Home Equity Grows: Appreciation vs Amortization</h2>
                <p style={pS}>
                  Home equity compounds through two distinct financial mechanisms:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Capital Appreciation:</strong> Indian residential real estate historically appreciates between 5% and 8% annually in thriving urban zones, lifting the gross asset value without requiring extra cash from the owner.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Principal Amortization:</strong> Every monthly EMI payment comprises both interest and principal repayment. In the early years of a home loan, interest dominates; however, as the loan matures, the principal reduction accelerates, building unencumbered equity rapidly.
                  </li>
                </ul>
                <p style={pS}>
                  Making partial voluntary prepayments directly reduces outstanding principal and compounds home equity even faster. Track your loan repayments with the{' '}
                  <Link href="/calculators/home-loan-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    Home Loan EMI Calculator
                  </Link>.
                </p>
              </div>

              <div style={secS} id="ltv-and-topup-limits">
                <h2 style={h2S}>Loan-to-Value (LTV) Ratios and Top-Up Loan Limits</h2>
                <p style={pS}>
                  Commercial banks evaluate your borrowing capacity using the Loan-to-Value (LTV) ratio, which expresses your total mortgage debt as a percentage of current property market value.
                </p>
                <p style={pS}>
                  Most leading Indian lenders (including SBI, HDFC Bank, and ICICI Bank) sanction top-up home loans up to a combined maximum LTV cap of 75% to 80%. The formula for available top-up credit is:
                </p>

                <div
                  style={{
                    background: '#F4F5F6', border: '1px solid #E3E6E8',
                    color: '#101214',
                    borderRadius: 10,
                    padding: '16px 20px',
                    fontFamily: 'monospace',
                    fontSize: 13,
                    lineHeight: 1.8,
                    marginBottom: 18,
                    overflowX: 'auto',
                  }}
                >
                  <div>Net Equity = Current Market Value - Outstanding Loan Balance</div>
                  <div>Max Permissible Debt = Current Market Value x 80%</div>
                  <div>Borrowable Top-Up Limit = Max Permissible Debt - Outstanding Loan Balance</div>
                </div>

                <p style={pS}>
                  For example, if your flat is valued at Rs 1.25 Crore and your remaining home loan balance is Rs 50 Lakh, your 80% LTV borrowing ceiling is Rs 1.00 Crore. You can sanction a top-up loan of up to Rs 50 Lakh (Rs 1.00 Cr minus Rs 50 Lakh).
                </p>
              </div>

              {/* In-Content Promo Bar */}
              <div
                style={{
                  margin: '28px 0 32px',
                  background: C.paleLime,
                  border: `1px solid ${C.border}`,
                  borderRadius: 12,
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: C.dark, margin: '0 0 4px', fontFamily: INTER }}>
                    Compare Home Loan Balance Transfer
                  </p>
                  <p style={{ fontSize: 13, color: C.ink2, margin: 0, fontFamily: INTER }}>
                    Refinance your mortgage at lower interest rates to increase your monthly savings and top-up eligibility.
                  </p>
                </div>
                <Link className="fx-btn"
                  href="/calculators/balance-transfer-savings-calculator"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    background: '#E9ECEE', border: '1px solid #D3D7DA',
                    color: '#101214',
                    padding: '10px 20px',
                    borderRadius: 8,
                    textDecoration: 'none',
                    fontFamily: INTER,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Open calculator
                </Link>
              </div>

              <div style={secS} id="topup-vs-personal-loans">
                <h2 style={h2S}>Top-Up Home Loan vs Personal Loan vs Gold Loan</h2>
                <p style={pS}>
                  Leveraging home equity via a top-up home loan offers significant cost advantages over unsecured borrowing alternatives:
                </p>

                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                      Comparison of top-up home loans against personal loans and gold loans in India.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Feature Parameter</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Top-Up Home Loan</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Unsecured Personal Loan</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Gold Loan</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={tdL}>Interest Rate Range</td>
                        <td style={tdR}>8.75% - 9.50% p.a.</td>
                        <td style={tdR}>11.0% - 18.0% p.a.</td>
                        <td style={tdR}>9.0% - 14.0% p.a.</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>Maximum Loan Tenure</td>
                        <td style={tdR}>Up to 15-20 Years</td>
                        <td style={tdR}>Up to 5 Years</td>
                        <td style={tdR}>Up to 2-3 Years</td>
                      </tr>
                      <tr>
                        <td style={tdL}>Collateral Required</td>
                        <td style={tdR}>Existing House Property</td>
                        <td style={tdR}>None (Unsecured)</td>
                        <td style={tdR}>Physical Gold Ornaments</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>Tax Deductibility</td>
                        <td style={tdR}>Available under Sec 24(b)</td>
                        <td style={tdR}>No Tax Benefits</td>
                        <td style={tdR}>No Tax Benefits</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={secS} id="tax-benefits-topup">
                <h2 style={h2S}>Tax Deductions on Top-Up Home Loans Under Section 24(b)</h2>
                <p style={pS}>
                  Under Section 24(b) of the Income Tax Act, 1961, interest paid on a top-up loan is tax-deductible if the loan proceeds are utilized for home improvement, repair, or renovation.
                </p>
                <p style={pS}>
                  For a self-occupied property, the deduction for repair and renovation is capped at Rs 30,000 per financial year (within the overall Rs 2 Lakh limit for home loan interest). If the top-up loan is utilized to construct an additional floor, wing, or acquire another residential asset, interest is deductible up to the full Rs 2,00,000 limit. Borrowers must retain invoices, contractor receipts, and completion certificates to claim these deductions during ITR filing.
                </p>
              </div>

              <div style={secS} id="projected-equity-table">
                <h2 style={h2S}>5-Year Home Equity Growth and Amortization Schedule</h2>
                <p style={pS}>
                  The table below models projected property valuation, loan amortization, and net equity accumulation over a 5-year period based on your inputs:
                </p>

                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                      5-Year projected equity growth based on property appreciation and loan repayment.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Timeline</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Projected Market Value</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Remaining Loan Debt</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Net Owned Equity</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Owned Share %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {calculations.projectionSchedule.map(row => (
                        <tr key={row.year} style={{ background: row.year % 2 === 0 ? '#fafafa' : C.white }}>
                          <td style={tdL}>End of Year {row.year}</td>
                          <td style={tdR}>{fmtC(row.marketValue)}</td>
                          <td style={tdR}>{fmtC(row.loanBalance)}</td>
                          <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>{fmtC(row.equityValue)}</td>
                          <td style={{ ...tdR, fontWeight: 700 }}>{row.equityPct.toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p style={pS}>
                  Evaluate rental yields and annual returns on your real estate assets using our{' '}
                  <Link href="/calculators/rental-yield-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    Rental Yield Calculator
                  </Link>.
                </p>
              </div>

              <div style={secS} id="how-to-use">
                <h2 style={h2S}>How to Use This Home Equity Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Current Market Valuation:</strong> Input today&#39;s estimated market value of your property.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Outstanding Loan Balance:</strong> Input your current remaining mortgage principal amount.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set Appreciation and Interest Rate:</strong> Adjust expected property growth rate and current home loan interest rate.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Review Equity and Top-Up Limit:</strong> View net owned equity in Rupees, LTV ratio, and maximum borrowable top-up credit.
                  </li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> Home equity estimates and top-up loan limits are calculated for informational planning purposes. Actual top-up loan sanctions and LTV caps depend on independent property valuation and bank credit approval.
                </p>
              </div>
            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .he-sidebar::-webkit-scrollbar { width: 5px; }
            .he-sidebar::-webkit-scrollbar-track { background: transparent; }
            .he-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .he-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            className="he-sidebar"
            style={
              {
                position: mobile ? 'static' : 'sticky',
                top: 20,
                alignSelf: 'start',
                maxHeight: mobile ? 'none' : 'calc(100vh - 40px)',
                overflowY: mobile ? 'visible' : 'auto',
                paddingRight: mobile ? 0 : 2,
                scrollbarWidth: 'thin',
                scrollbarColor: '#C4C9C4 transparent',
              } as React.CSSProperties
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ flexShrink: 0 }}><AdsterraBanner /></div>
              <div style={{ flexShrink: 0 }}><EquitySnapshot /></div>
              <nav aria-label="Related Calculators" style={{ display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0 }}>
                <SidebarList title="Popular Property Tools" items={POPULAR_TOOLS} />
                <SidebarList title="More Financial Calculators" items={MORE_TOOLS} />
              </nav>
              <div style={{ flexShrink: 0 }}><RelatedReads /></div>
            </div>
          </aside>
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: [ '/calculators/home-loan-calculator|Home Loan EMI', '/calculators/home-loan-eligibility-calculator|Loan Eligibility', '/calculators/down-payment-planner-calculator|Down Payment Planner', '/calculators/home-buying-total-cost-calculator|Total House Cost', '/calculators/annual-home-maintenance-calculator|Home Maintenance', '/calculators/rental-yield-calculator|Rental Yield', ], },
        { hd: 'Topics', links: ['/#|Home Equity', '/#|Top-Up Home Loan', '/#|LTV Limits', '/#|Section 24(b)'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} />
    </div>
  );
}

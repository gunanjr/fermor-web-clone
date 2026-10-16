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
  grownSavings,
  sipContributions,
  growthReturns,
}: {
  grownSavings: number;
  sipContributions: number;
  growthReturns: number;
}) {
  const total = Math.max(1, grownSavings + sipContributions + growthReturns);
  const savPct = (grownSavings / total) * 100;
  const sipPct = (sipContributions / total) * 100;
  const r = 40;
  const circ = 2 * Math.PI * r;
  const strokeDashoffset1 = circ - (savPct / 100) * circ;
  const strokeDashoffset2 = circ - ((savPct + sipPct) / 100) * circ;

  return (
    <svg
      width="140"
      height="140"
      viewBox="0 0 100 100"
      role="img"
      aria-label={`Down payment funding sources: ${Math.round(savPct)}% Existing Savings, ${Math.round(sipPct)}% Fresh SIP Contributions, ${Math.round(100 - savPct - sipPct)}% Compounded Returns`}
    >
      <circle cx="50" cy="50" r={r} fill="none" stroke={CHART_PAIR.secondary} strokeWidth="16" />
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke="#50565c"
        strokeWidth="16"
        strokeDasharray={circ}
        strokeDashoffset={strokeDashoffset2}
        transform="rotate(-90 50 50)"
      />
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke={CHART_PAIR.primary}
        strokeWidth="16"
        strokeDasharray={circ}
        strokeDashoffset={strokeDashoffset1}
        transform="rotate(-90 50 50)"
        style={{ transition: 'stroke-dashoffset 0.4s ease' }}
      />
      <text x="50" y="46" textAnchor="middle" fill={C.ink} fontSize="9" fontWeight="700" fontFamily={INTER}>
        Target Corpus
      </text>
      <text x="50" y="60" textAnchor="middle" fill={C.dark} fontSize="10" fontWeight="800" fontFamily={INTER}>
        Rs {(total / 100000).toFixed(1)}L
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

function PlanningSnapshot() {
  const rows = [
    { label: 'RBI Standard LTV Cap', value: '80% (20% Down)' },
    { label: 'Avg Property Inflation', value: '6.0% Per Year' },
    { label: 'Expected Mutual Fund Return', value: '12.0% Per Year' },
    { label: 'Stamp Duty + Registration', value: '5% - 7% Extra Cash' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>
          Benchmark Assumptions
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
    { href: '/calculators/home-buying-total-cost-calculator', label: 'Home Buying Total Cost Calculator' },
    { href: '/calculators/home-loan-eligibility-calculator', label: 'Home Loan Eligibility Calculator' },
    { href: '/calculators/state-wise-stamp-duty-calculator', label: 'State-Wise Stamp Duty Calculator' },
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
  { href: '/calculators/home-buying-total-cost-calculator', label: 'Home Buying Total Cost Calculator' },
  { href: '/calculators/home-loan-eligibility-calculator', label: 'Home Loan Eligibility Calculator' },
  { href: '/calculators/state-wise-stamp-duty-calculator', label: 'State-Wise Stamp Duty Calculator' },
  { href: '/calculators/home-equity-calculator', label: 'Home Equity Calculator' },
  { href: '/calculators/annual-home-maintenance-calculator', label: 'Annual Home Maintenance Calculator' },
  { href: '/calculators/rental-yield-calculator', label: 'Rental Yield Calculator' },
  { href: '/calculators/sip-calculator', label: 'SIP Calculator' },
];
const MORE_TOOLS = [
  { href: '/calculators/epf-calculator', label: 'EPF Calculator' },
  { href: '/calculators/step-up-sip-calculator', label: 'Step-Up SIP Calculator' },
  { href: '/calculators/home-insurance-coverage-calculator', label: 'Home Insurance Coverage Calculator' },
  { href: '/calculators/emergency-fund-calculator', label: 'Emergency Fund Calculator' },
  { href: '/calculators/cagr-calculator', label: 'CAGR Calculator' },
];

/* ── FAQS ──────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'How much down payment is required for a home loan in India?',
    a: 'Per RBI guidelines, banks finance up to 75% to 90% of a property agreement value depending on loan size, requiring home buyers to contribute at least 10% to 25% upfront as an equity down payment.',
  },
  {
    q: 'How does property price inflation impact down payment goals?',
    a: 'Property price inflation (typically 5% to 8% per annum in Indian metropolitan hubs) compounds future house prices, meaning a 20% down payment target grows significantly larger each year purchase is delayed.',
  },
  {
    q: 'What is the best investment asset to accumulate a home down payment?',
    a: 'For horizons under 3 years, conservative arbitrage funds or multi-asset debt funds protect capital. For 3 to 7 year horizons, hybrid balanced advantage or flexicap equity mutual fund SIPs provide optimal inflation-adjusted growth.',
  },
  {
    q: 'Does down payment include stamp duty and registration charges?',
    a: 'No, commercial banks are prohibited by RBI from financing stamp duty (4% to 7%) or registration fees (1%). Home buyers must fund all statutory taxes entirely from out-of-pocket cash savings.',
  },
  {
    q: 'Can I withdraw EPF balance for a house down payment in India?',
    a: 'Yes, under Paragraph 68B of the EPF Scheme, employees with at least 5 years of continuous service can withdraw up to 90% of their provident fund balance for acquiring or constructing a residential house.',
  },
  {
    q: 'How is monthly SIP calculated for a down payment target?',
    a: 'Monthly SIP is calculated using the Future Value annuity formula: Monthly SIP = Net Savings Gap × [ r / ((1 + r)^n - 1) ], where r is the monthly expected return rate and n is the total investment horizon in months.',
  },
  {
    q: 'What are RBI Loan-to-Value (LTV) ratio limits?',
    a: 'RBI mandates maximum LTV caps: 90% for loans up to Rs 30 Lakh, 80% for loans between Rs 30 Lakh and Rs 75 Lakh, and 75% for loans above Rs 75 Lakh.',
  },
  {
    q: 'Is paying a higher down payment beneficial for home loan borrowers?',
    a: 'Yes, paying a higher down payment lowers loan principal, reduces monthly EMI burden, improves loan approval terms, and saves lakhs of rupees in cumulative interest over a 20-year tenure.',
  },
  {
    q: 'How to calculate down payment for a 1 Crore flat in India?',
    a: 'For a 1 Crore flat with an 80% LTV bank loan, the 20% down payment is Rs 20 Lakh. Additionally, budget approx 6% (Rs 6 Lakh) for stamp duty and registration plus Rs 3 Lakh for builder deposits and legal fees.',
  },
  {
    q: 'What is the 3-20-30-40 rule of home buying?',
    a: 'The 3-20-30-40 rule advises: property price under 3x annual household income, at least 20% down payment saved, monthly EMI under 30% of gross salary, and holding 40% of property value in liquid net worth.',
  },
  {
    q: 'How does this down payment planner calculator work?',
    a: 'This calculator projects inflation-adjusted house price, total down payment required, net savings gap after compounding existing savings, and exact monthly SIP needed to reach your target on schedule.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.',
  },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

export default function DownPaymentPlannerClient() {
  const [mobile, setMobile] = useState<boolean>(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const { formatCurrency, selectedCurrency } = useCurrency();

  const [activeTab, setActiveTab] = useState<'sip' | 'time'>('sip');

  // Input states
  const [currentHousePrice, setCurrentHousePrice] = useState<number>(8000000); // 80 Lakh
  const [downPaymentPct, setDownPaymentPct] = useState<number>(20); // 20%
  const [targetYears, setTargetYears] = useState<number>(5); // 5 years
  const [propertyInflationRate, setPropertyInflationRate] = useState<number>(6.0); // 6%
  const [existingSavings, setExistingSavings] = useState<number>(500000); // 5 Lakh
  const [savingsReturnRate, setSavingsReturnRate] = useState<number>(8.0); // 8% p.a.
  const [sipReturnRate, setSipReturnRate] = useState<number>(12.0); // 12% p.a.
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Restore state
  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-down-payment-planner-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (d.currentHousePrice !== undefined) setCurrentHousePrice(d.currentHousePrice);
      if (d.downPaymentPct !== undefined) setDownPaymentPct(d.downPaymentPct);
      if (d.targetYears !== undefined) setTargetYears(d.targetYears);
      if (d.propertyInflationRate !== undefined) setPropertyInflationRate(d.propertyInflationRate);
      if (d.existingSavings !== undefined) setExistingSavings(d.existingSavings);
      if (d.savingsReturnRate !== undefined) setSavingsReturnRate(d.savingsReturnRate);
      if (d.sipReturnRate !== undefined) setSipReturnRate(d.sipReturnRate);
    } catch {
      /* ignore */
    }
  }, []);

  // Save state
  useEffect(() => {
    try {
      localStorage.setItem(
        'fermor-down-payment-planner-v1',
        JSON.stringify({
          currentHousePrice,
          downPaymentPct,
          targetYears,
          propertyInflationRate,
          existingSavings,
          savingsReturnRate,
          sipReturnRate,
        })
      );
    } catch {
      /* ignore */
    }
  }, [currentHousePrice, downPaymentPct, targetYears, propertyInflationRate, existingSavings, savingsReturnRate, sipReturnRate]);

  const currencySymbol = selectedCurrency?.symbol || '₹';
  const fmtC = (val: number) => {
    if (val >= 10000000) return `${currencySymbol}${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `${currencySymbol}${(val / 100000).toFixed(2)} L`;
    return formatCurrency(val);
  };
  const fmtIN = (val: number) => formatCurrency(val);

  // Math Calculations
  const calculations = useMemo(() => {
    const years = Math.max(1, targetYears);
    const months = years * 12;

    // Future House Price with inflation
    const futureHousePrice = Math.round(currentHousePrice * Math.pow(1 + propertyInflationRate / 100, years));

    // Target Down Payment
    const targetDownPayment = Math.round(futureHousePrice * (downPaymentPct / 100));

    // Grown Existing Savings
    const grownSavings = Math.round(existingSavings * Math.pow(1 + savingsReturnRate / 100, years));

    // Net Savings Gap needed from fresh SIP
    const netSavingsGap = Math.max(0, targetDownPayment - grownSavings);

    // Monthly SIP required
    const monthlyRate = sipReturnRate / 100 / 12;
    let monthlySIP = 0;
    if (monthlyRate > 0 && months > 0 && netSavingsGap > 0) {
      monthlySIP = Math.round(netSavingsGap * (monthlyRate / (Math.pow(1 + monthlyRate, months) - 1)));
    } else if (months > 0 && netSavingsGap > 0) {
      monthlySIP = Math.round(netSavingsGap / months);
    }

    const totalSipInvested = monthlySIP * months;
    const totalCompoundedReturns = Math.max(0, netSavingsGap - totalSipInvested);

    // Extra Cash (Stamp Duty ~6%, Registration ~1%, Society Corpus ~2%)
    const estimatedExtraCashNeeded = Math.round(futureHousePrice * 0.08);
    const totalOutofPocketRequired = targetDownPayment + estimatedExtraCashNeeded;

    return {
      futureHousePrice,
      targetDownPayment,
      grownSavings,
      netSavingsGap,
      monthlySIP,
      totalSipInvested,
      totalCompoundedReturns,
      estimatedExtraCashNeeded,
      totalOutofPocketRequired,
    };
  }, [currentHousePrice, downPaymentPct, targetYears, propertyInflationRate, existingSavings, savingsReturnRate, sipReturnRate]);

  const secS = { marginBottom: 32 };
  const h2S = { fontSize: mobile ? 20 : 24, fontWeight: 700, color: C.ink, marginBottom: 14, letterSpacing: '-0.02em' };
  const pS = { fontSize: 15, color: C.ink2, lineHeight: 1.75, marginBottom: 14 };

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 24 : 32, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Down Payment Planner Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Plan your home down payment target with property price inflation, existing savings growth, and target monthly SIP investment in India.
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
                  id="tab-sip"
                  role="tab"
                  aria-selected={activeTab === 'sip'}
                  aria-controls="panel-sip"
                  onClick={() => setActiveTab('sip')}
                  style={{
                    flex: 1,
                    padding: mobile ? '13px 6px' : '15px 20px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5,
                    fontWeight: activeTab === 'sip' ? 700 : 400,
                    color: activeTab === 'sip' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'sip' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s',
                    fontFamily: INTER,
                  }}
                >
                  Monthly SIP Required
                </button>
                <button
                  id="tab-time"
                  role="tab"
                  aria-selected={activeTab === 'time'}
                  aria-controls="panel-time"
                  onClick={() => setActiveTab('time')}
                  style={{
                    flex: 1,
                    padding: mobile ? '13px 6px' : '15px 20px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5,
                    fontWeight: activeTab === 'time' ? 700 : 400,
                    color: activeTab === 'time' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'time' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s',
                    fontFamily: INTER,
                  }}
                >
                  All-Inclusive Outlay
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
                      Home Buying Goal Inputs
                    </p>
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider
                        id="curr-house-price"
                        label="Current Property Price"
                        value={currentHousePrice}
                        min={2000000}
                        max={50000000}
                        step={500000}
                        display={fmtC(currentHousePrice)}
                        onChange={setCurrentHousePrice}
                        compact
                      />

                      <Slider
                        id="dp-pct"
                        label="Target Down Payment %"
                        value={downPaymentPct}
                        min={10}
                        max={50}
                        step={5}
                        display={`${downPaymentPct}%`}
                        onChange={setDownPaymentPct}
                        compact
                        suffix="%"
                      />

                      <Slider
                        id="target-yrs"
                        label="Years to Buy Home"
                        value={targetYears}
                        min={1}
                        max={15}
                        step={1}
                        display={`${targetYears} Yr${targetYears > 1 ? 's' : ''}`}
                        onChange={setTargetYears}
                        compact
                        suffix=" Yrs"
                      />

                      <Slider
                        id="existing-sav"
                        label="Existing Savings Available"
                        value={existingSavings}
                        min={0}
                        max={5000000}
                        step={50000}
                        display={fmtC(existingSavings)}
                        onChange={setExistingSavings}
                        compact
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
                          Inflation &amp; Returns
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Slider
                        id="prop-infl"
                        label="Property Price Inflation (% p.a.)"
                        value={propertyInflationRate}
                        min={2.0}
                        max={15.0}
                        step={0.5}
                        display={`${propertyInflationRate}%`}
                        onChange={setPropertyInflationRate}
                        compact
                        suffix="%"
                      />

                      <Slider
                        id="sav-ret"
                        label="Existing Savings Growth (% p.a.)"
                        value={savingsReturnRate}
                        min={4.0}
                        max={14.0}
                        step={0.5}
                        display={`${savingsReturnRate}%`}
                        onChange={setSavingsReturnRate}
                        compact
                        suffix="%"
                      />

                      <Slider
                        id="sip-ret"
                        label="Expected SIP Return (% p.a.)"
                        value={sipReturnRate}
                        min={6.0}
                        max={18.0}
                        step={0.5}
                        display={`${sipReturnRate}%`}
                        onChange={setSipReturnRate}
                        compact
                        suffix="%"
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
                    <DonutChart
                      grownSavings={calculations.grownSavings}
                      sipContributions={calculations.totalSipInvested}
                      growthReturns={calculations.totalCompoundedReturns}
                    />
                  </div>

                  {/* Donut Legend */}
                  <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 16, marginBottom: mobile ? 12 : 18 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Existing Savings</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: '#50565c' }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>SIP Invested</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>SIP Returns</span>
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
                        {activeTab === 'sip' ? 'Recommended Monthly Mutual Fund SIP' : 'Total Upfront Cash Needed (DP + Taxes)'}
                      </div>
                      <div style={{ fontSize: 11, color: '#7A8087', marginTop: 2 }}>
                        Target in {targetYears} Year{targetYears > 1 ? 's' : ''} ({propertyInflationRate}% inflation)
                      </div>
                    </div>
                    <span
                      aria-live="polite"
                      aria-label={
                        activeTab === 'sip'
                          ? `Monthly SIP Target: ${fmtIN(calculations.monthlySIP)}`
                          : `Total Upfront Outlay: ${fmtC(calculations.totalOutofPocketRequired)}`
                      }
                      style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                    >
                      {activeTab === 'sip' ? `${fmtIN(calculations.monthlySIP)}/mo` : fmtC(calculations.totalOutofPocketRequired)}
                    </span>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: 'Future Property Price (in ' + targetYears + 'y)', value: fmtC(calculations.futureHousePrice) },
                    { label: 'Target Down Payment (' + downPaymentPct + '%)', value: fmtC(calculations.targetDownPayment) },
                    { label: 'Grown Existing Savings Value', value: fmtC(calculations.grownSavings) },
                    { label: 'Net Down Payment Savings Gap', value: fmtC(calculations.netSavingsGap) },
                    { label: 'Est. Stamp Duty & Taxes (~8%)', value: fmtC(calculations.estimatedExtraCashNeeded) },
                    { label: 'Bank Home Loan Amount (' + (100 - downPaymentPct) + '%)', value: fmtC(calculations.futureHousePrice - calculations.targetDownPayment) },
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
              <div style={secS} id="what-is-down-payment">
                <h2 style={h2S}>What Is a Home Down Payment?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    A home down payment is the upfront equity contribution paid directly by the property buyer from personal savings, representing the portion of the property agreement value not financed by a commercial bank mortgage.
                  </p>
                </div>
                <p style={pS}>
                  Under Reserve Bank of India (RBI) prudential norms, banks are prohibited from offering 100% financing on residential property acquisitions. Home buyers must furnish a mandatory minimum margin (typically 10% to 25% of agreement value) to ensure sufficient equity skin-in-the-game and mitigate systemic mortgage default risks.
                </p>
                <p style={pS}>
                  Accumulating this down payment through dedicated monthly SIP investments prevents premature liquidation of retirement assets or relying on high-interest personal loans. Calculate all ancillary acquisition fees with the{' '}
                  <Link href="/calculators/home-buying-total-cost-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    Home Buying Total Cost Calculator
                  </Link>.
                </p>
              </div>

              <div style={secS} id="rbi-ltv-norms">
                <h2 style={h2S}>RBI Loan-to-Value (LTV) Caps and Down Payment Mandates</h2>
                <p style={pS}>
                  The Reserve Bank of India mandates strict statutory caps on the Loan-to-Value (LTV) ratio that commercial banks and housing finance companies (HFCs) can offer Indian property buyers:
                </p>

                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                      Official RBI Loan-to-Value (LTV) caps and minimum down payment requirements.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Home Loan Ticket Size</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Maximum Permissible LTV</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Mandatory Down Payment %</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={tdL}>Loans up to Rs 30 Lakh</td>
                        <td style={tdR}>90%</td>
                        <td style={tdR}>10% of Agreement Value</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>Loans between Rs 30 Lakh and Rs 75 Lakh</td>
                        <td style={tdR}>80%</td>
                        <td style={tdR}>20% of Agreement Value</td>
                      </tr>
                      <tr>
                        <td style={tdL}>Loans above Rs 75 Lakh</td>
                        <td style={tdR}>75%</td>
                        <td style={tdR}>25% of Agreement Value</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p style={pS}>
                  Check your monthly borrowing capacity and debt-to-income limits using the{' '}
                  <Link href="/calculators/home-loan-eligibility-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    Home Loan Eligibility Calculator
                  </Link>.
                </p>
              </div>

              <div style={secS} id="inflation-impact">
                <h2 style={h2S}>Property Price Inflation and The Compounding Down Payment Gap</h2>
                <p style={pS}>
                  Real estate price inflation in Indian metropolitan centers historically averages between 5% and 8% annually, which causes the nominal down payment requirement to escalate substantially over a 3 to 7 year saving window.
                </p>
                <p style={pS}>
                  For example, an apartment valued at Rs 80 Lakh today with 6% annual inflation will cost approximately Rs 1.07 Crore in 5 years. A 20% down payment on this property increases from Rs 16 Lakh today to Rs 21.4 Lakh at the time of purchase. Failing to factor in property inflation leaves home buyers with a severe capital deficit when they are ready to transact.
                </p>
              </div>

              <div style={secS} id="sip-formula">
                <h2 style={h2S}>Monthly SIP Down Payment Formula</h2>
                <p style={pS}>
                  The monthly SIP amount required to bridge your home down payment savings gap is calculated by solving the future value annuity compounding equation:
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
                  <div>Future House Price = Current Price x (1 + i)^t</div>
                  <div>Target Down Payment = Future House Price x Down Payment %</div>
                  <div>Grown Existing Savings = Existing Savings x (1 + r_s)^t</div>
                  <div>Net Savings Gap = Target Down Payment - Grown Existing Savings</div>
                  <div>Monthly SIP = Net Savings Gap x [ r_m / ((1 + r_m)^n - 1) ]</div>
                </div>

                <p style={pS}>
                  Where <em>i</em> is the annual property price inflation rate, <em>t</em> is the planning horizon in years, <em>r_s</em> is the return on existing funds, <em>r_m</em> is the monthly mutual fund return rate, and <em>n</em> is the total number of monthly SIP instalments.
                </p>
                <p style={pS}>
                  Explore how systematically increasing your monthly SIP each year with salary hikes lowers your initial commitment with the{' '}
                  <Link href="/calculators/step-up-sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    Step-Up SIP Calculator
                  </Link>.
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
                    Compare State-Wise Stamp Duty
                  </p>
                  <p style={{ fontSize: 13, color: C.ink2, margin: 0, fontFamily: INTER }}>
                    Check statutory stamp duty rates and female buyer discounts across all Indian states.
                  </p>
                </div>
                <Link className="fx-btn"
                  href="/calculators/state-wise-stamp-duty-calculator"
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

              <div style={secS} id="out-of-pocket-expenses">
                <h2 style={h2S}>Out-of-Pocket Expenses Beyond the Down Payment</h2>
                <p style={pS}>
                  Home buyers must maintain additional liquid reserves of 6% to 10% of property value to cover statutory taxes, registration fees, and builder deposits that banks cannot include in the home loan principal.
                </p>
                <p style={pS}>
                  Per RBI directives, banks cannot finance stamp duty (4% to 7% across states) and registration fees (1%). Furthermore, under-construction properties attract 1% or 5% GST without input tax credit, while builders collect advance society maintenance and sinking fund corpus deposits (Rs 1 Lakh to Rs 3 Lakh) directly in cash at possession.
                </p>
                <p style={pS}>
                  Calculate state-specific registration fees and metro cess with the{' '}
                  <Link href="/calculators/state-wise-stamp-duty-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    State-Wise Stamp Duty Calculator
                  </Link>.
                </p>
              </div>

              <div style={secS} id="epf-withdrawal">
                <h2 style={h2S}>Utilizing EPF and Financial Assets for Home Down Payment</h2>
                <p style={pS}>
                  Salaried employees can access partial non-refundable withdrawals from their Employees Provident Fund (EPF) balance to supplement their home down payment corpus.
                </p>
                <p style={pS}>
                  Under Paragraph 68B of the Employees Provident Funds Scheme, 1952, members with a minimum of 5 years of continuous service can withdraw up to 90% of the total employee and employer share (including accrued interest) for purchasing a residential flat or building a house. Track your available accumulated provident fund balance using the{' '}
                  <Link href="/calculators/epf-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    EPF Calculator
                  </Link>.
                </p>
              </div>

              <div style={secS} id="city-wise-matrix">
                <h2 style={h2S}>Down Payment Planning Matrix Across Indian Metros</h2>
                <p style={pS}>
                  The table below highlights typical down payment and upfront cash requirements across key Indian residential real estate markets:
                </p>

                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                      Benchmark down payment and statutory outlay for 2BHK/3BHK flats across major Indian metros.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Metropolitan City</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Typical 2/3 BHK Price</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>20% Down Payment</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Stamp Duty &amp; Reg.</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Total Cash Needed</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={tdL}>Mumbai MMR</td>
                        <td style={tdR}>Rs 1,60,00,000</td>
                        <td style={tdR}>Rs 32,00,000</td>
                        <td style={tdR}>Rs 11,20,000 (7%)</td>
                        <td style={tdR}>Rs 43,20,000</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>Bengaluru</td>
                        <td style={tdR}>Rs 1,10,00,000</td>
                        <td style={tdR}>Rs 22,00,000</td>
                        <td style={tdR}>Rs 7,26,000 (6.6%)</td>
                        <td style={tdR}>Rs 29,26,000</td>
                      </tr>
                      <tr>
                        <td style={tdL}>Delhi NCR (Gurugram)</td>
                        <td style={tdR}>Rs 1,30,00,000</td>
                        <td style={tdR}>Rs 26,00,000</td>
                        <td style={tdR}>Rs 9,10,000 (7%)</td>
                        <td style={tdR}>Rs 35,10,000</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>Hyderabad</td>
                        <td style={tdR}>Rs 95,00,000</td>
                        <td style={tdR}>Rs 19,00,000</td>
                        <td style={tdR}>Rs 7,12,500 (7.5%)</td>
                        <td style={tdR}>Rs 26,12,500</td>
                      </tr>
                      <tr>
                        <td style={tdL}>Pune</td>
                        <td style={tdR}>Rs 85,00,000</td>
                        <td style={tdR}>Rs 17,00,000</td>
                        <td style={tdR}>Rs 5,95,000 (7%)</td>
                        <td style={tdR}>Rs 22,95,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p style={pS}>
                  Learn how home equity accumulates as you repay your mortgage over time using the{' '}
                  <Link href="/calculators/home-equity-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    Home Equity Calculator
                  </Link>.
                </p>
              </div>

              <div style={secS} id="how-to-use">
                <h2 style={h2S}>How to Use This Down Payment Planner Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Current Target House Price:</strong> Input the agreement value of your desired property in today&#39;s market.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select Down Payment Share:</strong> Choose your target down payment percentage (typically 20% to 25%).
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set Horizon &amp; Inflation:</strong> Set your target timeline in years and expected property price growth rate.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Review Monthly SIP Target:</strong> View the exact monthly mutual fund SIP required to achieve your down payment goal on time.
                  </li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> Down payment savings projections are based on assumed investment return and property inflation rates. Mutual fund investments are subject to market risks. Actual loan eligibility and LTV ratios are subject to individual bank underwriting and credit assessment.
                </p>
              </div>
            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .dpp-sidebar::-webkit-scrollbar { width: 5px; }
            .dpp-sidebar::-webkit-scrollbar-track { background: transparent; }
            .dpp-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .dpp-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            className="dpp-sidebar"
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
              <div style={{ flexShrink: 0 }}><PlanningSnapshot /></div>
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
              {
                hd: 'Calculators',
                links: [
                  '/calculators/home-buying-total-cost-calculator|Total House Cost',
                  '/calculators/home-loan-eligibility-calculator|Loan Eligibility',
                  '/calculators/state-wise-stamp-duty-calculator|Stamp Duty',
                  '/calculators/home-equity-calculator|Home Equity',
                  '/calculators/annual-home-maintenance-calculator|Home Maintenance',
                  '/calculators/sip-calculator|SIP',
                ],
              },
              { hd: 'Topics', links: ['/#|Down Payment', '/#|Home Buying Goal', '/#|RBI LTV Caps', '/#|EPF 68B'] },
              { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
        ])} />
    </div>
  );
}

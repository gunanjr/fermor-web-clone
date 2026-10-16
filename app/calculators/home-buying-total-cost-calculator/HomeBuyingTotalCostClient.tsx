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
  agreementPrice,
  statutoryTaxes,
  interiorsAndFees,
}: {
  agreementPrice: number;
  statutoryTaxes: number;
  interiorsAndFees: number;
}) {
  const total = Math.max(1, agreementPrice + statutoryTaxes + interiorsAndFees);
  const agreePct = (agreementPrice / total) * 100;
  const taxPct = (statutoryTaxes / total) * 100;
  const r = 40;
  const circ = 2 * Math.PI * r;
  const strokeDashoffset1 = circ - (agreePct / 100) * circ;
  const strokeDashoffset2 = circ - ((agreePct + taxPct) / 100) * circ;

  return (
    <svg
      width="140"
      height="140"
      viewBox="0 0 100 100"
      role="img"
      aria-label={`Home buying cost breakdown: ${Math.round(agreePct)}% Agreement Price, ${Math.round(taxPct)}% Taxes & Registration, ${Math.round(100 - agreePct - taxPct)}% Interiors & Ancillary`}
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
        Total Acquisition
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

function BuyingCostSnapshot() {
  const rows = [
    { label: 'Avg Stamp Duty & Reg.', value: '5.0% - 7.0%' },
    { label: 'GST on Under-Construction', value: '1% / 5% (No ITC)' },
    { label: 'Ready-to-Move OC Flat', value: '0% GST Exempt' },
    { label: 'Interiors & Woodwork', value: 'Rs 1,200 - 1,800/sqft' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>
          Cost Benchmarks
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
    { href: '/calculators/down-payment-planner-calculator', label: 'Down Payment Planner Calculator' },
    { href: '/calculators/state-wise-stamp-duty-calculator', label: 'State-Wise Stamp Duty Calculator' },
    { href: '/calculators/home-loan-calculator', label: 'Home Loan EMI Calculator' },
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
  { href: '/calculators/down-payment-planner-calculator', label: 'Down Payment Planner Calculator' },
  { href: '/calculators/state-wise-stamp-duty-calculator', label: 'State-Wise Stamp Duty Calculator' },
  { href: '/calculators/annual-home-maintenance-calculator', label: 'Annual Home Maintenance Calculator' },
  { href: '/calculators/home-equity-calculator', label: 'Home Equity Calculator' },
  { href: '/calculators/home-loan-eligibility-calculator', label: 'Home Loan Eligibility Calculator' },
  { href: '/calculators/rental-yield-calculator', label: 'Rental Yield Calculator' },
  { href: '/calculators/home-insurance-coverage-calculator', label: 'Home Insurance Coverage Calculator' },
];
const MORE_TOOLS = [
  { href: '/calculators/property-tax-estimator', label: 'Property Tax Estimator' },
  { href: '/calculators/gst-calculator', label: 'GST Calculator' },
  { href: '/calculators/balance-transfer-savings-calculator', label: 'Balance Transfer Savings Calculator' },
  { href: '/calculators/emergency-fund-calculator', label: 'Emergency Fund Calculator' },
  { href: '/calculators/sip-calculator', label: 'SIP Calculator' },
];

/* ── FAQS ──────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What hidden costs are involved in buying a house in India?',
    a: 'Beyond the base agreement price, home buyers must fund statutory stamp duty (4% to 7%), registration fees (1%), GST on under-construction flats (1% to 5%), society corpus sinking deposits, legal search fees, bank processing fees, and interior woodwork expenses.',
  },
  {
    q: 'How much upfront cash is needed to buy a house in India?',
    a: 'Home buyers typically require 25% to 35% of total property value in liquid cash to finance the mandatory 20% down payment plus non-fundable taxes, registration charges, and possession deposits.',
  },
  {
    q: 'Is GST applicable on ready-to-move-in flats in India?',
    a: 'No, GST is not applicable on completed residential properties that have received a valid Occupancy Certificate (OC) or Completion Certificate from municipal authorities.',
  },
  {
    q: 'What is the GST rate on under-construction flats?',
    a: 'GST is levied at 1% without Input Tax Credit (ITC) for affordable housing (carpet area up to 60/90 sqm and value up to Rs 45 Lakh) and 5% without ITC for standard residential projects.',
  },
  {
    q: 'Does a bank home loan cover stamp duty and interior costs?',
    a: 'No, under RBI directives, commercial banks are prohibited from adding stamp duty, registration charges, or interior fitout costs into the sanctioned home loan principal amount.',
  },
  {
    q: 'What is a builder society maintenance corpus fund?',
    a: 'A corpus fund is a one-time non-refundable deposit (typically Rs 1 Lakh to Rs 3 Lakh) collected by builders at handover and transferred to the RWA to fund long-term structural repairs.',
  },
  {
    q: 'How much does legal verification and title search cost in India?',
    a: 'Independent advocate verification and 30-year title search generally cost between Rs 15,000 and Rs 35,000 depending on location and documentation complexity.',
  },
  {
    q: 'What is the average cost of residential interiors per sq ft in India?',
    a: 'Basic modular kitchen and wardrobes cost Rs 800 to Rs 1,200 per sq ft, standard full-home interiors cost Rs 1,300 to Rs 1,800 per sq ft, and premium luxury finishes exceed Rs 2,200 per sq ft.',
  },
  {
    q: 'How to calculate total home purchase cost for an 80 Lakh flat?',
    a: 'For an 80 Lakh flat, budget approx Rs 4.8L stamp duty (6%), Rs 80k registration (1%), Rs 2L society corpus, Rs 25k legal fee, and Rs 6L interiors, totaling approx Rs 93.85 Lakh.',
  },
  {
    q: 'What is bank home loan processing fee in India?',
    a: 'Bank home loan processing charges range from 0.25% to 0.50% of the loan amount, typically capped between Rs 5,000 and Rs 25,000 plus 18% GST.',
  },
  {
    q: 'How does this home buying total cost calculator work?',
    a: 'This calculator aggregates agreement price, state stamp duty, registration, GST, builder deposits, advocate fees, and interior budgets to compute all-inclusive acquisition cost and total out-of-pocket cash.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.',
  },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

export default function HomeBuyingTotalCostClient() {
  const [mobile, setMobile] = useState<boolean>(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const { formatCurrency, selectedCurrency } = useCurrency();

  const [activeTab, setActiveTab] = useState<'total' | 'cash'>('total');

  // Input states
  const [agreementPrice, setAgreementPrice] = useState<number>(8500000); // 85 Lakh
  const [stampDutyRate, setStampDutyRate] = useState<number>(6.0); // 6%
  const [registrationRate, setRegistrationRate] = useState<number>(1.0); // 1%
  const [propertyStatus, setPropertyStatus] = useState<'under_construction' | 'ready_oc'>('ready_oc');
  const [isAffordableGst, setIsAffordableGst] = useState<boolean>(false);
  const [societyCorpusDeposit, setSocietyCorpusDeposit] = useState<number>(200000); // 2 Lakh
  const [interiorBudget, setInteriorBudget] = useState<number>(600000); // 6 Lakh
  const [legalAndBankFee, setLegalAndBankFee] = useState<number>(45000); // 45k
  const [downPaymentPct, setDownPaymentPct] = useState<number>(20); // 20%
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Restore state
  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-home-buying-total-cost-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (d.agreementPrice !== undefined) setAgreementPrice(d.agreementPrice);
      if (d.stampDutyRate !== undefined) setStampDutyRate(d.stampDutyRate);
      if (d.registrationRate !== undefined) setRegistrationRate(d.registrationRate);
      if (d.propertyStatus !== undefined) setPropertyStatus(d.propertyStatus);
      if (d.societyCorpusDeposit !== undefined) setSocietyCorpusDeposit(d.societyCorpusDeposit);
      if (d.interiorBudget !== undefined) setInteriorBudget(d.interiorBudget);
      if (d.legalAndBankFee !== undefined) setLegalAndBankFee(d.legalAndBankFee);
      if (d.downPaymentPct !== undefined) setDownPaymentPct(d.downPaymentPct);
    } catch {
      /* ignore */
    }
  }, []);

  // Save state
  useEffect(() => {
    try {
      localStorage.setItem(
        'fermor-home-buying-total-cost-v1',
        JSON.stringify({
          agreementPrice,
          stampDutyRate,
          registrationRate,
          propertyStatus,
          societyCorpusDeposit,
          interiorBudget,
          legalAndBankFee,
          downPaymentPct,
        })
      );
    } catch {
      /* ignore */
    }
  }, [agreementPrice, stampDutyRate, registrationRate, propertyStatus, societyCorpusDeposit, interiorBudget, legalAndBankFee, downPaymentPct]);

  const currencySymbol = selectedCurrency?.symbol || '₹';
  const fmtC = (val: number) => {
    if (val >= 10000000) return `${currencySymbol}${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `${currencySymbol}${(val / 100000).toFixed(2)} L`;
    return formatCurrency(val);
  };
  const fmtIN = (val: number) => formatCurrency(val);

  // Math Calculations
  const calculations = useMemo(() => {
    const stampDutyAmount = Math.round(agreementPrice * (stampDutyRate / 100));
    const registrationAmount = Math.round(agreementPrice * (registrationRate / 100));

    // GST calculation
    let gstRate = 0;
    if (propertyStatus === 'under_construction') {
      gstRate = isAffordableGst ? 1.0 : 5.0;
    }
    const gstAmount = Math.round(agreementPrice * (gstRate / 100));

    const totalStatutoryTaxes = stampDutyAmount + registrationAmount + gstAmount;
    const totalAncillaryAndInteriors = societyCorpusDeposit + interiorBudget + legalAndBankFee;

    const totalAllInclusiveCost = agreementPrice + totalStatutoryTaxes + totalAncillaryAndInteriors;

    // Home loan financing (banks fund max (100 - downPaymentPct)% of agreement value only)
    const bankLoanAmount = Math.round(agreementPrice * ((100 - downPaymentPct) / 100));
    const homeLoanDownPayment = Math.round(agreementPrice * (downPaymentPct / 100));

    // Net upfront cash out of pocket required
    const totalUpfrontCashNeeded = homeLoanDownPayment + totalStatutoryTaxes + totalAncillaryAndInteriors;
    const cashPercentageOfTotal = (totalUpfrontCashNeeded / totalAllInclusiveCost) * 100;

    return {
      stampDutyAmount,
      registrationAmount,
      gstRate,
      gstAmount,
      totalStatutoryTaxes,
      totalAncillaryAndInteriors,
      totalAllInclusiveCost,
      bankLoanAmount,
      homeLoanDownPayment,
      totalUpfrontCashNeeded,
      cashPercentageOfTotal,
    };
  }, [agreementPrice, stampDutyRate, registrationRate, propertyStatus, isAffordableGst, societyCorpusDeposit, interiorBudget, legalAndBankFee, downPaymentPct]);

  const secS = { marginBottom: 32 };
  const h2S = { fontSize: mobile ? 20 : 24, fontWeight: 700, color: C.ink, marginBottom: 14, letterSpacing: '-0.02em' };
  const pS = { fontSize: 15, color: C.ink2, lineHeight: 1.75, marginBottom: 14 };

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 24 : 32, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Home Buying Total Cost Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate all-inclusive home acquisition cost in India including agreement price, stamp duty, registration, GST, society corpus fund, and interiors.
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
                  id="tab-total"
                  role="tab"
                  aria-selected={activeTab === 'total'}
                  aria-controls="panel-total"
                  onClick={() => setActiveTab('total')}
                  style={{
                    flex: 1,
                    padding: mobile ? '13px 6px' : '15px 20px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5,
                    fontWeight: activeTab === 'total' ? 700 : 400,
                    color: activeTab === 'total' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'total' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s',
                    fontFamily: INTER,
                  }}
                >
                  All-Inclusive Total Outlay
                </button>
                <button
                  id="tab-cash"
                  role="tab"
                  aria-selected={activeTab === 'cash'}
                  aria-controls="panel-cash"
                  onClick={() => setActiveTab('cash')}
                  style={{
                    flex: 1,
                    padding: mobile ? '13px 6px' : '15px 20px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5,
                    fontWeight: activeTab === 'cash' ? 700 : 400,
                    color: activeTab === 'cash' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'cash' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s',
                    fontFamily: INTER,
                  }}
                >
                  Upfront Cash Required
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
                      Property Purchase Inputs
                    </p>
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider
                        id="agree-price"
                        label="Base Agreement Price"
                        value={agreementPrice}
                        min={2000000}
                        max={50000000}
                        step={500000}
                        display={fmtC(agreementPrice)}
                        onChange={setAgreementPrice}
                        compact
                      />

                      <Slider
                        id="stamp-rate"
                        label="Stamp Duty Rate (%)"
                        value={stampDutyRate}
                        min={3.0}
                        max={10.0}
                        step={0.5}
                        display={`${stampDutyRate}%`}
                        onChange={setStampDutyRate}
                        compact
                        suffix="%"
                      />

                      {/* Construction Status Toggle */}
                      <div style={{ marginBottom: 18 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                          <span style={{ fontSize: 13.5, color: C.ink2 }}>Property Status</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>
                            {propertyStatus === 'ready_oc' ? 'Ready OC (0% GST)' : 'Under Construction'}
                          </span>
                        </div>
                        <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                          {(['ready_oc', 'under_construction'] as const).map(s => (
                            <button
                              key={s}
                              onClick={() => setPropertyStatus(s)}
                              style={{
                                flex: 1,
                                padding: '7px 0',
                                border: 'none',
                                background: propertyStatus === s ? C.white : 'transparent',
                                color: propertyStatus === s ? C.ink : C.ink3,
                                fontWeight: propertyStatus === s ? 700 : 400,
                                cursor: 'pointer',
                                fontFamily: INTER,
                                fontSize: 12.5,
                                transition: 'all 0.15s',
                              }}
                            >
                              {s === 'ready_oc' ? 'Ready (OC)' : 'Under Construction'}
                            </button>
                          ))}
                        </div>
                      </div>

                      <Slider
                        id="interiors"
                        label="Interior &amp; Woodwork Budget"
                        value={interiorBudget}
                        min={0}
                        max={3000000}
                        step={50000}
                        display={fmtC(interiorBudget)}
                        onChange={setInteriorBudget}
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
                          Registration, Corpus &amp; Loan
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Slider
                        id="reg-rate"
                        label="Registration Fee (%)"
                        value={registrationRate}
                        min={0.5}
                        max={2.0}
                        step={0.5}
                        display={`${registrationRate}%`}
                        onChange={setRegistrationRate}
                        compact
                        suffix="%"
                      />

                      <Slider
                        id="corpus-dep"
                        label="Society Corpus &amp; Sinking Deposit"
                        value={societyCorpusDeposit}
                        min={50000}
                        max={1000000}
                        step={25000}
                        display={fmtC(societyCorpusDeposit)}
                        onChange={setSocietyCorpusDeposit}
                        compact
                      />

                      <Slider
                        id="legal-bank"
                        label="Legal Title Search &amp; Bank Fees"
                        value={legalAndBankFee}
                        min={10000}
                        max={150000}
                        step={5000}
                        display={fmtIN(legalAndBankFee)}
                        onChange={setLegalAndBankFee}
                        compact
                      />

                      <Slider
                        id="dp-plan"
                        label="Home Loan Down Payment (%)"
                        value={downPaymentPct}
                        min={10}
                        max={40}
                        step={5}
                        display={`${downPaymentPct}%`}
                        onChange={setDownPaymentPct}
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
                      agreementPrice={agreementPrice}
                      statutoryTaxes={calculations.totalStatutoryTaxes}
                      interiorsAndFees={calculations.totalAncillaryAndInteriors}
                    />
                  </div>

                  {/* Donut Legend */}
                  <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 16, marginBottom: mobile ? 12 : 18 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Agreement Price</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: '#50565c' }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Taxes &amp; Reg.</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Interiors &amp; Fees</span>
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
                        {activeTab === 'total' ? 'All-Inclusive Acquisition Outlay' : 'Net Upfront Cash Out-of-Pocket'}
                      </div>
                      <div style={{ fontSize: 11, color: '#7A8087', marginTop: 2 }}>
                        {activeTab === 'total'
                          ? `Includes Agreement, Taxes & Interiors`
                          : `${calculations.cashPercentageOfTotal.toFixed(1)}% of Total Acquisition Cost`}
                      </div>
                    </div>
                    <span
                      aria-live="polite"
                      aria-label={
                        activeTab === 'total'
                          ? `Total House Cost: ${fmtC(calculations.totalAllInclusiveCost)}`
                          : `Total Upfront Cash: ${fmtC(calculations.totalUpfrontCashNeeded)}`
                      }
                      style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                    >
                      {activeTab === 'total' ? fmtC(calculations.totalAllInclusiveCost) : fmtC(calculations.totalUpfrontCashNeeded)}
                    </span>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: 'Base Agreement Value', value: fmtC(agreementPrice) },
                    { label: 'Stamp Duty (' + stampDutyRate + '%)', value: fmtIN(calculations.stampDutyAmount) },
                    { label: 'Registration Fee (' + registrationRate + '%)', value: fmtIN(calculations.registrationAmount) },
                    { label: 'GST on Property (' + calculations.gstRate + '%)', value: fmtIN(calculations.gstAmount) },
                    { label: 'Society Corpus & Legal Fees', value: fmtIN(societyCorpusDeposit + legalAndBankFee) },
                    { label: 'Bank Home Loan (' + (100 - downPaymentPct) + '%)', value: fmtC(calculations.bankLoanAmount) },
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
              <div style={secS} id="what-is-total-home-cost">
                <h2 style={h2S}>What Is the Total Cost of Buying a House in India?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    The total cost of buying a house in India is the all-inclusive sum of the base agreement value plus statutory taxes (stamp duty, registration, GST), builder possession deposits (corpus fund, electrification, club charges), legal fees, and interior outfitting.
                  </p>
                </div>
                <p style={pS}>
                  Real estate advertisements typically quote only the base agreement rate (e.g. Rs 5,000 per sq ft), omitting statutory levies and ancillary fees that add 15% to 25% to the final transaction price. A flat advertised for Rs 80 Lakh ultimately requires an all-inclusive outlay of Rs 92 Lakh to Rs 1 Crore before move-in.
                </p>
                <p style={pS}>
                  Prepare your target monthly savings roadmap with the{' '}
                  <Link href="/calculators/down-payment-planner-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    Down Payment Planner Calculator
                  </Link>.
                </p>
              </div>

              <div style={secS} id="upfront-cash-rule">
                <h2 style={h2S}>The 25% to 35% Upfront Cash Rule for Home Buyers</h2>
                <p style={pS}>
                  Under Reserve Bank of India (RBI) housing finance directives, commercial banks are permitted to finance only up to 75% to 80% of the property base agreement value, requiring home buyers to furnish 25% to 35% of the total acquisition budget in liquid cash.
                </p>
                <p style={pS}>
                  Banks are strictly prohibited from funding statutory stamp duty, property registration fees, GST, society corpus deposits, or interior woodwork within the primary home loan principal. Consequently, a home buyer purchasing an Rs 80 Lakh property with an Rs 64 Lakh bank loan needs over Rs 28 Lakh in hard cash to complete the transaction.
                </p>
              </div>

              <div style={secS} id="statutory-taxes">
                <h2 style={h2S}>Statutory Taxes: Stamp Duty, Registration, &amp; Metro Cess</h2>
                <p style={pS}>
                  Stamp duty and registration charges are compulsory state-level transaction taxes levied under the Indian Stamp Act, 1899, to establish legal title and admissibility of sale deeds in courts of law.
                </p>
                <p style={pS}>
                  Stamp duty rates range between 4% and 7% across Indian states, with several jurisdictions offering concessions for female buyers (e.g., Delhi levies 4% for women vs 6% for men). In urban municipal zones like Mumbai and Pune, an additional 1% Metro Cess applies. Registration fees are typically 1% of agreement value, though states like Maharashtra (capped at Rs 30,000) and Uttar Pradesh (capped at Rs 20,000) enforce statutory maximum limits.
                </p>
                <p style={pS}>
                  Compare state-specific rate slabs and gender rebates using our{' '}
                  <Link href="/calculators/state-wise-stamp-duty-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    State-Wise Stamp Duty Calculator
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
                    Estimate Ongoing Upkeep
                  </p>
                  <p style={{ fontSize: 13, color: C.ink2, margin: 0, fontFamily: INTER }}>
                    Calculate society maintenance bills, 1% upkeep rules, and emergency sinking funds for your new flat.
                  </p>
                </div>
                <Link className="fx-btn"
                  href="/calculators/annual-home-maintenance-calculator"
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

              <div style={secS} id="gst-regulations">
                <h2 style={h2S}>GST Rules on Under-Construction vs Ready-to-Move Flats</h2>
                <p style={pS}>
                  Goods and Services Tax (GST) applies exclusively to under-construction properties, while ready-to-move-in flats with a valid Occupancy Certificate (OC) are completely GST-exempt.
                </p>
                <p style={pS}>
                  Per CBIC notifications, under-construction residential properties are taxed at two effective non-ITC rates:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Affordable Housing (1% GST):</strong> Properties with agreement value up to Rs 45 Lakh and carpet area up to 60 sq meters (in metro cities) or 90 sq meters (in non-metros) attract an effective GST rate of 1% without Input Tax Credit.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Standard Residential Housing (5% GST):</strong> All properties exceeding Rs 45 Lakh or carpet area thresholds attract an effective GST rate of 5% without Input Tax Credit.
                  </li>
                </ul>
              </div>

              <div style={secS} id="ancillary-builder-charges">
                <h2 style={h2S}>Builder &amp; Society Ancillary Charges and Deposits</h2>
                <p style={pS}>
                  At the time of possession, builders collect substantial non-agreement charges that must be settled prior to receiving flat keys:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Society Sinking &amp; Corpus Fund:</strong> A mandatory one-time reserve (Rs 1 Lakh to Rs 3 Lakh) handed over to the incoming Resident Welfare Association.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Advance Maintenance:</strong> 12 to 24 months of advance society upkeep charges (Rs 50,000 to Rs 1.5 Lakh).
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Utility &amp; Meter Infrastructure:</strong> Dual electric meter connection, piped gas connection, and diesel generator backup setup fees (Rs 75,000 to Rs 2 Lakh).
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Legal &amp; Documentation:</strong> Builder advocate drafting charges for sale agreements (Rs 20,000 to Rs 50,000).
                  </li>
                </ul>
              </div>

              <div style={secS} id="interior-furnishing-budget">
                <h2 style={h2S}>Interior Renovation and Furnishing Budget Guidelines</h2>
                <p style={pS}>
                  New residential apartments are delivered in bare-shell or semi-finished condition, requiring significant capital outlay for modular kitchens, wardrobes, false ceilings, electrical fixtures, and painting before occupancy.
                </p>
                <p style={pS}>
                  In Indian metros, basic functional interiors average Rs 800 to Rs 1,200 per sq ft of built-up area (Rs 8 Lakh to Rs 12 Lakh for a 1,000 sq ft 2BHK). Premium designer interiors with veneer finishes, concealed air conditioning, and smart lighting range from Rs 1,500 to Rs 2,500 per sq ft.
                </p>
                <p style={pS}>
                  Protect your home structure and newly fitted furnishings with the{' '}
                  <Link href="/calculators/home-insurance-coverage-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    Home Insurance Coverage Calculator
                  </Link>.
                </p>
              </div>

              <div style={secS} id="all-inclusive-breakdown-table">
                <h2 style={h2S}>All-Inclusive Home Acquisition Cost Breakdown Table</h2>
                <p style={pS}>
                  The table below presents a realistic acquisition cost model for three standard residential price points in India:
                </p>

                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                      All-inclusive acquisition cost breakdown and upfront cash required in India.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Expense Item</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Mid-Market 2BHK</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Premium 3BHK</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Luxury 4BHK</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={tdL}>Base Agreement Price</td>
                        <td style={tdR}>Rs 60,00,000</td>
                        <td style={tdR}>Rs 1,20,00,000</td>
                        <td style={tdR}>Rs 2,50,00,000</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>Stamp Duty (6%)</td>
                        <td style={tdR}>Rs 3,60,000</td>
                        <td style={tdR}>Rs 7,20,000</td>
                        <td style={tdR}>Rs 15,00,000</td>
                      </tr>
                      <tr>
                        <td style={tdL}>Registration Fee (1% or capped)</td>
                        <td style={tdR}>Rs 30,000</td>
                        <td style={tdR}>Rs 30,000</td>
                        <td style={tdR}>Rs 30,000</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>Society Corpus &amp; Utility Deposits</td>
                        <td style={tdR}>Rs 1,50,000</td>
                        <td style={tdR}>Rs 2,75,000</td>
                        <td style={tdR}>Rs 5,50,000</td>
                      </tr>
                      <tr>
                        <td style={tdL}>Legal &amp; Bank Processing Fees</td>
                        <td style={tdR}>Rs 35,000</td>
                        <td style={tdR}>Rs 50,000</td>
                        <td style={tdR}>Rs 75,000</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>Interior Renovation &amp; Woodwork</td>
                        <td style={tdR}>Rs 5,00,000</td>
                        <td style={tdR}>Rs 12,00,000</td>
                        <td style={tdR}>Rs 25,00,000</td>
                      </tr>
                      <tr>
                        <td style={{ ...tdL, fontWeight: 700 }}>Total All-Inclusive Outlay</td>
                        <td style={{ ...tdR, fontWeight: 700 }}>Rs 70,75,000</td>
                        <td style={{ ...tdR, fontWeight: 700 }}>Rs 1,42,75,000</td>
                        <td style={{ ...tdR, fontWeight: 700 }}>Rs 2,96,55,000</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={{ ...tdL, fontWeight: 700, color: C.dark }}>Net Upfront Cash Needed (20% DP)</td>
                        <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>Rs 22,75,000</td>
                        <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>Rs 46,75,000</td>
                        <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>Rs 96,55,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p style={pS}>
                  Track your accumulated net equity and top-up borrowing capacity over time with the{' '}
                  <Link href="/calculators/home-equity-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    Home Equity Calculator
                  </Link>.
                </p>
              </div>

              <div style={secS} id="how-to-use">
                <h2 style={h2S}>How to Use This Home Buying Total Cost Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Base Agreement Value:</strong> Input the quoted property price before taxes.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set Stamp Duty and Property Status:</strong> Input state stamp duty percentage and select Ready OC or Under Construction.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Adjust Interiors &amp; Ancillary Costs:</strong> Enter estimated furnishing, legal, and corpus fund deposits.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Review Total Outlay &amp; Cash Requirement:</strong> View all-inclusive acquisition cost and total out-of-pocket cash needed.
                  </li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> Calculations are based on standard Indian real estate practices and statutory tax slabs. Actual stamp duty, GST applicability, and builder ancillary deposits may vary according to state government notifications and specific project agreements.
                </p>
              </div>
            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .hbtc-sidebar::-webkit-scrollbar { width: 5px; }
            .hbtc-sidebar::-webkit-scrollbar-track { background: transparent; }
            .hbtc-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .hbtc-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            className="hbtc-sidebar"
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
              <div style={{ flexShrink: 0 }}><BuyingCostSnapshot /></div>
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
        { hd: 'Calculators', links: [ '/calculators/down-payment-planner-calculator|Down Payment Planner', '/calculators/state-wise-stamp-duty-calculator|State Stamp Duty', '/calculators/annual-home-maintenance-calculator|Home Maintenance', '/calculators/home-equity-calculator|Home Equity', '/calculators/home-insurance-coverage-calculator|Home Insurance', '/calculators/rental-yield-calculator|Rental Yield', ], },
        { hd: 'Topics', links: ['/#|Total House Cost', '/#|Stamp Duty India', '/#|GST on Flats', '/#|Interior Budget'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} />
    </div>
  );
}

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
  netIncome,
  expenses,
}: {
  netIncome: number;
  expenses: number;
}) {
  const total = Math.max(1, netIncome + expenses);
  const netPct = Math.max(0, Math.min(100, (netIncome / total) * 100));
  const r = 40;
  const circ = 2 * Math.PI * r;
  const strokeDashoffset = circ - (netPct / 100) * circ;

  return (
    <svg
      width="140"
      height="140"
      viewBox="0 0 100 100"
      role="img"
      aria-label={`Rental income split: ${Math.round(netPct)}% Net Operating Income, ${Math.round(100 - netPct)}% Expenses & Taxes`}
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
      <text x="50" y="46" textAnchor="middle" fill={C.ink} fontSize="9" fontWeight="700" fontFamily={INTER}>
        Net Margin
      </text>
      <text x="50" y="60" textAnchor="middle" fill={C.dark} fontSize="10" fontWeight="800" fontFamily={INTER}>
        {Math.round(netPct)}%
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

function YieldSnapshot() {
  const rows = [
    { label: 'Bengaluru Residential', value: '3.5% - 4.5%' },
    { label: 'Mumbai Residential', value: '2.5% - 3.2%' },
    { label: 'Gurugram Commercial', value: '7.5% - 9.0%' },
    { label: 'Sec 24(a) Standard Ded.', value: '30% of NAV Flat' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>
          Market Benchmarks
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
    { href: '/calculators/annual-home-maintenance-calculator', label: 'Annual Home Maintenance Calculator' },
    { href: '/calculators/home-equity-calculator', label: 'Home Equity Calculator' },
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
  { href: '/calculators/annual-home-maintenance-calculator', label: 'Annual Home Maintenance Calculator' },
  { href: '/calculators/home-equity-calculator', label: 'Home Equity Calculator' },
  { href: '/calculators/down-payment-planner-calculator', label: 'Down Payment Planner Calculator' },
  { href: '/calculators/state-wise-stamp-duty-calculator', label: 'State-Wise Stamp Duty Calculator' },
  { href: '/calculators/property-tax-estimator', label: 'Property Tax Estimator' },
  { href: '/calculators/home-loan-calculator', label: 'Home Loan EMI Calculator' },
];
const MORE_TOOLS = [
  { href: '/calculators/home-insurance-coverage-calculator', label: 'Home Insurance Coverage Calculator' },
  { href: '/calculators/balance-transfer-savings-calculator', label: 'Balance Transfer Savings Calculator' },
  { href: '/calculators/sip-calculator', label: 'SIP Calculator' },
  { href: '/calculators/cagr-calculator', label: 'CAGR Calculator' },
  { href: '/calculators/emergency-fund-calculator', label: 'Emergency Fund Calculator' },
];

/* ── FAQS ──────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What is rental yield and how is it calculated in India?',
    a: 'Rental yield is the annual rental income generated by a property expressed as a percentage of its total purchase cost: Gross Rental Yield % = (Annual Rent / Total Property Cost) × 100.',
  },
  {
    q: 'What is the average residential rental yield in Indian cities?',
    a: 'Residential rental yields in major Indian metros range between 2.5% and 4.5% per annum, with Bengaluru, Hyderabad, and Pune leading the market.',
  },
  {
    q: 'What is the difference between gross and net rental yield?',
    a: 'Gross yield compares annual rent directly to property cost, while net yield deducts recurring expenses like society maintenance, property tax, insurance, and vacancy downtime: Net Yield % = (Net Operating Income / Total Property Cost) × 100.',
  },
  {
    q: 'How does commercial real estate rental yield compare to residential?',
    a: 'Commercial real estate (offices, retail, warehouses) generates substantially higher rental yields of 7% to 10% per annum, though it carries higher capital entry barriers and longer vacancy risks.',
  },
  {
    q: 'What is the standard 30% deduction on rental income under Section 24?',
    a: 'Under Section 24(a) of the Income Tax Act, 1961, owners receive a flat statutory 30% deduction from Net Annual Value (NAV) for repairs and maintenance, regardless of actual expenditures incurred.',
  },
  {
    q: 'Is municipal property tax deductible from rental income?',
    a: 'Yes, municipal property taxes actually paid during the financial year are directly deducted from Gross Rent Received to arrive at Net Annual Value (NAV) under Section 23.',
  },
  {
    q: 'How does tenant vacancy affect net rental yield?',
    a: 'Each vacant month reduces annual gross rental income by 8.33%, which sharply compresses net rental yield and annual cash flow.',
  },
  {
    q: 'How can Indian landlords increase rental yields?',
    a: 'Landlords can increase yields by outfitting properties with full modular furnishings, converting units into student/executive co-living spaces, or short-term vacation rentals (Airbnb).',
  },
  {
    q: 'Is rental income taxable under the New Tax Regime in India?',
    a: 'Yes, rental income is taxable under the New Tax Regime. The standard 30% deduction under Section 24(a) and municipal tax deductions under Section 23 remain fully available.',
  },
  {
    q: 'Can home loan interest be deducted against rental income?',
    a: 'For let-out properties, the full interest paid on a home loan is deductible under Section 24(b), but loss from house property that can be set off against salary/other income is capped at Rs 2 Lakh per year.',
  },
  {
    q: 'How does this rental yield calculator work?',
    a: 'This calculator computes gross rental yield %, deducts society maintenance, taxes, and vacancy to calculate net yield %, and applies Section 24(a) rules to determine taxable income and cash flow.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.',
  },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

export default function RentalYieldClient() {
  const [mobile, setMobile] = useState<boolean>(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const { formatCurrency, selectedCurrency } = useCurrency();

  const [activeTab, setActiveTab] = useState<'gross_net' | 'tax_cashflow'>('gross_net');

  // Input states
  const [propertyPurchaseCost, setPropertyPurchaseCost] = useState<number>(8500000); // 85 Lakh
  const [monthlyRent, setMonthlyRent] = useState<number>(28000); // Rs 28,000/mo
  const [annualSocietyMaintenance, setAnnualSocietyMaintenance] = useState<number>(36000); // Rs 36k/yr
  const [annualPropertyTax, setAnnualPropertyTax] = useState<number>(12000); // Rs 12k/yr
  const [vacancyMonths, setVacancyMonths] = useState<number>(0.5); // 0.5 months
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Restore state
  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-rental-yield-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (d.propertyPurchaseCost !== undefined) setPropertyPurchaseCost(d.propertyPurchaseCost);
      if (d.monthlyRent !== undefined) setMonthlyRent(d.monthlyRent);
      if (d.annualSocietyMaintenance !== undefined) setAnnualSocietyMaintenance(d.annualSocietyMaintenance);
      if (d.annualPropertyTax !== undefined) setAnnualPropertyTax(d.annualPropertyTax);
      if (d.vacancyMonths !== undefined) setVacancyMonths(d.vacancyMonths);
    } catch {
      /* ignore */
    }
  }, []);

  // Save state
  useEffect(() => {
    try {
      localStorage.setItem(
        'fermor-rental-yield-v1',
        JSON.stringify({
          propertyPurchaseCost,
          monthlyRent,
          annualSocietyMaintenance,
          annualPropertyTax,
          vacancyMonths,
        })
      );
    } catch {
      /* ignore */
    }
  }, [propertyPurchaseCost, monthlyRent, annualSocietyMaintenance, annualPropertyTax, vacancyMonths]);

  const currencySymbol = selectedCurrency?.symbol || '₹';
  const fmtC = (val: number) => {
    if (val >= 10000000) return `${currencySymbol}${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `${currencySymbol}${(val / 100000).toFixed(2)} L`;
    return formatCurrency(val);
  };
  const fmtIN = (val: number) => formatCurrency(val);

  // Math Calculations
  const calculations = useMemo(() => {
    const grossAnnualRent = monthlyRent * 12;
    const vacancyLoss = Math.round(monthlyRent * vacancyMonths);
    const effectiveGrossRent = Math.max(0, grossAnnualRent - vacancyLoss);

    const grossRentalYield = propertyPurchaseCost > 0 ? (grossAnnualRent / propertyPurchaseCost) * 100 : 0;

    // Net Operating Income (NOI)
    const totalOperatingExpenses = annualSocietyMaintenance + annualPropertyTax + vacancyLoss;
    const netOperatingIncome = Math.max(0, grossAnnualRent - totalOperatingExpenses);
    const netRentalYield = propertyPurchaseCost > 0 ? (netOperatingIncome / propertyPurchaseCost) * 100 : 0;

    // Income Tax Under Section 24
    // Net Annual Value (NAV) = Gross Rent Received minus Municipal Property Taxes Paid
    const netAnnualValue = Math.max(0, effectiveGrossRent - annualPropertyTax);
    const section24aDeduction = Math.round(netAnnualValue * 0.30); // 30% statutory flat deduction
    const taxableRentalIncome = Math.max(0, netAnnualValue - section24aDeduction);

    return {
      grossAnnualRent,
      vacancyLoss,
      effectiveGrossRent,
      grossRentalYield,
      totalOperatingExpenses,
      netOperatingIncome,
      netRentalYield,
      netAnnualValue,
      section24aDeduction,
      taxableRentalIncome,
    };
  }, [propertyPurchaseCost, monthlyRent, annualSocietyMaintenance, annualPropertyTax, vacancyMonths]);

  const secS = { marginBottom: 32 };
  const h2S = { fontSize: mobile ? 20 : 24, fontWeight: 700, color: C.ink, marginBottom: 14, letterSpacing: '-0.02em' };
  const pS = { fontSize: 15, color: C.ink2, lineHeight: 1.75, marginBottom: 14 };

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 24 : 32, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Rental Yield Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate gross rental yield %, net rental yield %, post-tax annual cash flow, and Section 24 standard deduction in India.
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
                  id="tab-yields"
                  role="tab"
                  aria-selected={activeTab === 'gross_net'}
                  aria-controls="panel-yields"
                  onClick={() => setActiveTab('gross_net')}
                  style={{
                    flex: 1,
                    padding: mobile ? '13px 6px' : '15px 20px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5,
                    fontWeight: activeTab === 'gross_net' ? 700 : 400,
                    color: activeTab === 'gross_net' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'gross_net' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s',
                    fontFamily: INTER,
                  }}
                >
                  Gross &amp; Net Rental Yield
                </button>
                <button
                  id="tab-taxes"
                  role="tab"
                  aria-selected={activeTab === 'tax_cashflow'}
                  aria-controls="panel-taxes"
                  onClick={() => setActiveTab('tax_cashflow')}
                  style={{
                    flex: 1,
                    padding: mobile ? '13px 6px' : '15px 20px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5,
                    fontWeight: activeTab === 'tax_cashflow' ? 700 : 400,
                    color: activeTab === 'tax_cashflow' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'tax_cashflow' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s',
                    fontFamily: INTER,
                  }}
                >
                  Section 24 Tax Breakdown
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
                      Property &amp; Rental Inputs
                    </p>
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider
                        id="prop-total-cost"
                        label="Total Property Purchase Cost"
                        value={propertyPurchaseCost}
                        min={2000000}
                        max={50000000}
                        step={500000}
                        display={fmtC(propertyPurchaseCost)}
                        onChange={setPropertyPurchaseCost}
                        compact
                      />

                      <Slider
                        id="monthly-rent"
                        label="Expected Monthly Rent"
                        value={monthlyRent}
                        min={5000}
                        max={300000}
                        step={1000}
                        display={fmtIN(monthlyRent)}
                        onChange={setMonthlyRent}
                        compact
                      />

                      <Slider
                        id="society-maint-yr"
                        label="Annual Society Maintenance"
                        value={annualSocietyMaintenance}
                        min={0}
                        max={200000}
                        step={2000}
                        display={fmtIN(annualSocietyMaintenance)}
                        onChange={setAnnualSocietyMaintenance}
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
                          Taxes &amp; Vacancy Downtime
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Slider
                        id="prop-tax-yr"
                        label="Annual Municipal Property Tax"
                        value={annualPropertyTax}
                        min={0}
                        max={100000}
                        step={1000}
                        display={fmtIN(annualPropertyTax)}
                        onChange={setAnnualPropertyTax}
                        compact
                      />

                      <Slider
                        id="vac-months"
                        label="Annual Vacancy Buffer (Months)"
                        value={vacancyMonths}
                        min={0}
                        max={3.0}
                        step={0.5}
                        display={`${vacancyMonths} Mo${vacancyMonths > 1 ? 's' : ''}`}
                        onChange={setVacancyMonths}
                        compact
                        suffix=" Mo"
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
                    <DonutChart netIncome={calculations.netOperatingIncome} expenses={calculations.totalOperatingExpenses} />
                  </div>

                  {/* Donut Legend */}
                  <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 16, marginBottom: mobile ? 12 : 18 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Net Operating Rent</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: '#50565c' }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Operating Costs</span>
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
                        {activeTab === 'gross_net' ? 'Net Rental Yield (Annual)' : 'Net Operating Income (NOI)'}
                      </div>
                      <div style={{ fontSize: 11, color: '#7A8087', marginTop: 2 }}>
                        {activeTab === 'gross_net'
                          ? `Gross Yield: ${calculations.grossRentalYield.toFixed(2)}% p.a.`
                          : `After Maintenance, Taxes & Vacancy`}
                      </div>
                    </div>
                    <span
                      aria-live="polite"
                      aria-label={
                        activeTab === 'gross_net'
                          ? `Net Rental Yield: ${calculations.netRentalYield.toFixed(2)}%`
                          : `Net Income: ${fmtIN(calculations.netOperatingIncome)}`
                      }
                      style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                    >
                      {activeTab === 'gross_net' ? `${calculations.netRentalYield.toFixed(2)}%` : fmtIN(calculations.netOperatingIncome)}
                    </span>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: 'Gross Annual Rent (12 Mo)', value: fmtIN(calculations.grossAnnualRent) },
                    { label: 'Gross Rental Yield %', value: `${calculations.grossRentalYield.toFixed(2)}%` },
                    { label: 'Net Annual Value (NAV under Sec 23)', value: fmtIN(calculations.netAnnualValue) },
                    { label: 'Sec 24(a) 30% Standard Deduction', value: fmtIN(calculations.section24aDeduction) },
                    { label: 'Net Taxable Rental Income', value: fmtIN(calculations.taxableRentalIncome) },
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
              <div style={secS} id="what-is-rental-yield">
                <h2 style={h2S}>What Is Rental Yield and Why Is It Crucial in India?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Rental yield is the annual percentage return generated by an investment property through tenant rental income relative to its total acquisition cost.
                  </p>
                </div>
                <p style={pS}>
                  While property capital appreciation provides long-term wealth growth, rental yield determines immediate cash flow liquidity and covers holding costs like loan EMIs, society maintenance, and municipal taxes.
                </p>
                <p style={pS}>
                  Estimate your all-inclusive property purchase outlays with the{' '}
                  <Link href="/calculators/home-buying-total-cost-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    Home Buying Total Cost Calculator
                  </Link>.
                </p>
              </div>

              <div style={secS} id="gross-vs-net-yield">
                <h2 style={h2S}>Gross Rental Yield vs Net Rental Yield Formulas</h2>
                <p style={pS}>
                  Real estate investors differentiate between top-line gross yield and bottom-line net operating yield:
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
                  <div>Gross Rental Yield % = (Annual Rent / Total Property Cost) x 100</div>
                  <div>Net Operating Income (NOI) = Annual Rent - Maintenance - Property Tax - Vacancy</div>
                  <div>Net Rental Yield % = (Net Operating Income / Total Property Cost) x 100</div>
                </div>

                <p style={pS}>
                  For example, an Rs 85 Lakh apartment generating Rs 28,000 monthly rent yields 3.95% gross. After deducting Rs 36,000 annual maintenance, Rs 12,000 municipal tax, and Rs 14,000 vacancy downtime, the Net Operating Income is Rs 2.74 Lakh, resulting in a net yield of 3.22%.
                </p>
              </div>

              <div style={secS} id="residential-vs-commercial">
                <h2 style={h2S}>Residential vs Commercial Rental Yields in Indian Metros</h2>
                <p style={pS}>
                  In Indian real estate, yield dynamics differ drastically between asset classes:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Residential Real Estate (2.5% to 4.5%):</strong> Residential properties feature lower capital barriers and steady tenant demand but deliver modest cash yields. IT-centric micro-markets in Bengaluru (Whitefield, Sarjapur) and Hyderabad (Hitec City, Gachibowli) lead with 4.0% to 4.5% yields, whereas south and central Mumbai average 2.5% to 3.0%.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Commercial Real Estate (7.0% to 10.0%):</strong> Grade-A office spaces, bank branches, and retail storefronts deliver attractive yields with long 5-to-9 year lock-in leases and periodic 15% rent escalations, though with higher initial capital outlays.
                  </li>
                </ul>
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
                    Track Accumulated Home Equity
                  </p>
                  <p style={{ fontSize: 13, color: C.ink2, margin: 0, fontFamily: INTER }}>
                    Calculate your unencumbered property equity and borrowable top-up home loan limits as your asset appreciates.
                  </p>
                </div>
                <Link className="fx-btn"
                  href="/calculators/home-equity-calculator"
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

              <div style={secS} id="taxation-section-24">
                <h2 style={h2S}>Taxation of Rental Income Under Section 24(a) Standard 30% Deduction</h2>
                <p style={pS}>
                  Under the Income Tax Act, 1961, rental income is classified under &#34;Income from House Property&#34; and enjoys significant statutory tax shelters:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Municipal Taxes Deduction (Section 23):</strong> Property taxes paid to the local municipal corporation are directly subtracted from gross rent.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Standard 30% Deduction (Section 24(a)):</strong> A flat 30% statutory allowance is deducted from Net Annual Value (NAV) for repairs, irrespective of whether the landlord spent money on maintenance.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Home Loan Interest (Section 24(b)):</strong> Full mortgage interest paid on let-out properties is deductible, with inter-head loss set-off capped at Rs 2 Lakh per financial year.
                  </li>
                </ul>
              </div>

              <div style={secS} id="optimizing-yields">
                <h2 style={h2S}>Strategies to Maximize Rental Yields: Co-Living &amp; Furnishing</h2>
                <p style={pS}>
                  Property owners can enhance baseline rental yields through intentional asset positioning:
                </p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Full Furnishing:</strong> Fully furnished apartments with modular kitchens, ACs, and appliances command 25% to 35% higher rent over unfurnished units, boosting gross yields by 0.8% to 1.2%.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Co-Living / Executive Leasing:</strong> Renting per-bed or per-room to corporate professionals near IT corridors generates 5.5% to 6.5% gross returns compared to traditional family tenancies.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Minimizing Tenant Turnover:</strong> Multi-year lease renewals and prompt maintenance prevent vacant months that erode annual NOI.
                  </li>
                </ol>
              </div>

              <div style={secS} id="city-yield-benchmarks">
                <h2 style={h2S}>Indian Major Metros Rental Yield Benchmark Matrix</h2>
                <p style={pS}>
                  The table below presents current average residential and commercial rental yield benchmarks across prime Indian cities:
                </p>

                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                      City-wise rental yield benchmarks in India across asset classes.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>City / Micro-Market</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Residential Gross Yield</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Commercial Gross Yield</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Avg Capital Growth</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={tdL}>Bengaluru (Outer Ring Rd / Sarjapur)</td>
                        <td style={tdR}>3.8% - 4.6%</td>
                        <td style={tdR}>7.5% - 9.0%</td>
                        <td style={tdR}>7.0% - 9.0% p.a.</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>Hyderabad (Hitec City / Financial Dist)</td>
                        <td style={tdR}>3.5% - 4.2%</td>
                        <td style={tdR}>8.0% - 9.5%</td>
                        <td style={tdR}>8.0% - 10.0% p.a.</td>
                      </tr>
                      <tr>
                        <td style={tdL}>Pune (Hinjewadi / Kharadi)</td>
                        <td style={tdR}>3.3% - 4.0%</td>
                        <td style={tdR}>7.0% - 8.5%</td>
                        <td style={tdR}>6.0% - 8.0% p.a.</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>Delhi NCR (Gurugram Golf Course Ext)</td>
                        <td style={tdR}>3.0% - 3.8%</td>
                        <td style={tdR}>7.5% - 9.0%</td>
                        <td style={tdR}>6.5% - 8.5% p.a.</td>
                      </tr>
                      <tr>
                        <td style={tdL}>Mumbai MMR (Thane / Western Suburbs)</td>
                        <td style={tdR}>2.5% - 3.2%</td>
                        <td style={tdR}>6.5% - 8.0%</td>
                        <td style={tdR}>5.0% - 7.0% p.a.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p style={pS}>
                  Calculate your ongoing property maintenance expenses with the{' '}
                  <Link href="/calculators/annual-home-maintenance-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    Annual Home Maintenance Calculator
                  </Link>.
                </p>
              </div>

              <div style={secS} id="how-to-use">
                <h2 style={h2S}>How to Use This Rental Yield Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Total Purchase Cost:</strong> Input all-inclusive property acquisition expenditure.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Monthly Expected Rent:</strong> Input expected rent received from tenants.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Input Maintenance, Taxes &amp; Vacancy:</strong> Adjust annual society upkeep, municipal property tax, and vacancy downtime.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Review Yields &amp; Tax Deduction:</strong> View Gross &amp; Net Yield %, Net Operating Income, and Section 24 30% deduction.
                  </li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> Rental yields and income tax deductions are calculated for educational planning purposes. Actual rental agreements and tax liabilities depend on local market demand, tenant terms, and individual income tax slab rates.
                </p>
              </div>
            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .ry-sidebar::-webkit-scrollbar { width: 5px; }
            .ry-sidebar::-webkit-scrollbar-track { background: transparent; }
            .ry-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .ry-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            className="ry-sidebar"
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
              <div style={{ flexShrink: 0 }}><YieldSnapshot /></div>
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
        { hd: 'Calculators', links: [ '/calculators/home-buying-total-cost-calculator|Total House Cost', '/calculators/annual-home-maintenance-calculator|Home Maintenance', '/calculators/home-equity-calculator|Home Equity', '/calculators/down-payment-planner-calculator|Down Payment Planner', '/calculators/state-wise-stamp-duty-calculator|Stamp Duty', '/calculators/home-insurance-coverage-calculator|Home Insurance', ], },
        { hd: 'Topics', links: ['/#|Rental Yield India', '/#|Gross vs Net Yield', '/#|Section 24(a)', '/#|Commercial Real Estate'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} />
    </div>
  );
}

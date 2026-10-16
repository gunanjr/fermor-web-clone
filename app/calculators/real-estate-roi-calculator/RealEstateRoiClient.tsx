'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect, useId, useRef } from 'react';
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
  dark: '#101214', lime: '#a6dbc4', lime2: '#2d9970', paleLime: '#f4f5f6',
  ink: '#16140F', ink2: '#50565c', ink3: '#7a8087', white: '#ffffff',
  bg: '#f6f7f8', border: '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

/* ── Table Styles ──────────────────────────────────────── */
const thS = {
  padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink,
  background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const,
  letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const,
  verticalAlign: 'middle' as const,
};
const tdL = { padding: '10px 14px', fontSize: 13, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'middle' as const, textAlign: 'left' as const } as React.CSSProperties;
const tdR = { padding: '10px 14px', fontSize: 13, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'middle' as const, textAlign: 'right' as const } as React.CSSProperties;

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
    <div style={{ marginBottom: compact ? 18 : 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 8 : 12 }}>
        {label ? <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 13.5 : 14.5, color: C.ink2, fontWeight: 400 }}>{label}</label> : <span />}
        {editing ? (
          <div style={{ position: 'relative' }}>
            <input id={inputId} autoFocus value={raw} aria-label={`Enter ${label} value`}
              onChange={e => setRaw(e.target.value)} onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
              style={{ fontSize: 14, fontWeight: 700, textAlign: suffix ? 'left' : 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '5px 10px' : '7px 12px', width: 120, outline: 'none', color: C.dark, fontFamily: INTER }} />
            {suffix && <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: C.ink3, pointerEvents: 'none', fontWeight: 700 }}>{suffix}</span>}
          </div>
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${display}. Click to edit.`}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}
            style={{ fontSize: compact ? 13 : 14.5, fontWeight: 700, color: C.dark, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '5px 12px' : '7px 16px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 80 : 100, textAlign: 'center', transition: 'border-color 0.15s' }}>
            {display}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 22, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 18, height: 18, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 2px 6px rgba(16,18,20,0.2)', pointerEvents: 'none', zIndex: 1 }} />
        <input id={rangeId} type="range" min={min} max={max} step={step} value={value}
          aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
          onChange={e => onChange(+e.target.value)}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{ fontSize: 11, color: C.ink3 }}>{min}{suffix || ''}</span>
        <span style={{ fontSize: 11, color: C.ink3 }}>{max}{suffix || ''}</span>
      </div>
    </div>
  );
}

/* ── Donut Chart ───────────────────────────────────────── */
function DonutChart({ rentalCashflow, capitalAppreciation }: { rentalCashflow: number; capitalAppreciation: number }) {
  const total = Math.max(1, rentalCashflow + capitalAppreciation);
  const rentalPct = (rentalCashflow / total) * 100;
  const r = 40;
  const circ = 2 * Math.PI * r;
  const strokeDashoffset = circ - (rentalPct / 100) * circ;
  return (
    <svg width="140" height="140" viewBox="0 0 100 100" role="img" aria-label={`Real estate return split: ${Math.round(rentalPct)}% Net Rental Income, ${Math.round(100 - rentalPct)}% Capital Appreciation`}>
      <circle cx="50" cy="50" r={r} fill="none" stroke={CHART_PAIR.secondary} strokeWidth="16" />
      <circle cx="50" cy="50" r={r} fill="none" stroke={CHART_PAIR.primary} strokeWidth="16"
        strokeDasharray={circ} strokeDashoffset={strokeDashoffset}
        transform="rotate(-90 50 50)" style={{ transition: 'stroke-dashoffset 0.4s ease' }} />
      <text x="50" y="46" textAnchor="middle" fill={C.ink} fontSize="10" fontWeight="700" fontFamily={INTER}>Total Return</text>
      <text x="50" y="60" textAnchor="middle" fill={C.dark} fontSize="10" fontWeight="800" fontFamily={INTER}>
        Rs {(total / 100000).toFixed(0)}L
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
          <div style={{ padding: '12px 18px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 13, color: C.ink2, transition: 'all 0.12s' }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = C.paleLime; (e.currentTarget as HTMLElement).style.color = C.dark; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink2; }}>
            {label}
          </div>
        </Link>
      ))}
    </div>
  );
}

function RealEstateSnapshot() {
  const rows = [
    { label: 'Residential Gross Yield', value: '2.8% - 3.8%' },
    { label: 'Commercial Gross Yield', value: '7.0% - 9.5%' },
    { label: 'Warehousing / Logistics', value: '8.5% - 10.0%' },
    { label: 'Sec 24 Standard Deduction', value: '30% of Net Rent' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Indian Real Estate Yields</span>
      </div>
      {rows.map((r, i) => (
        <div key={r.label} style={{ padding: '11px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: C.white, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12.5, color: C.ink2 }}>{r.label}</span>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: C.ink }}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

function RelatedReads() {
  const links = [
    { href: '/calculators/property-appreciation-calculator', label: 'Property Appreciation Calculator: CAGR %' },
    { href: '/calculators/stamp-duty-calculator', label: 'Stamp Duty Calculator: State Rates' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Related Reads</span>
      </div>
      {links.map((l, i) => (
        <Link key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', padding: '13px 16px', borderBottom: i < links.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: C.white }}>
          <span style={{ fontSize: 13, color: C.dark, fontWeight: 500, lineHeight: 1.5, display: 'block' }}>{l.label}</span>
        </Link>
      ))}
    </div>
  );
}

const POPULAR_TOOLS = [
  { href: '/calculators/property-appreciation-calculator', label: 'Property Appreciation Calculator' },
  { href: '/calculators/home-down-payment-calculator', label: 'Home Down Payment Calculator' },
  { href: '/calculators/stamp-duty-calculator', label: 'Stamp Duty Calculator' },
  { href: '/calculators/home-loan-calculator', label: 'Home Loan Calculator' },
];
const MORE_TOOLS = [
  { href: '/calculators/swp-calculator', label: 'SWP Calculator' },
  { href: '/calculators/cagr-calculator', label: 'CAGR Calculator' },
  { href: '/calculators/fire-calculator', label: 'FIRE Calculator' },
];

/* ── FAQS ──────────────────────────────────────────────── */
const FAQS = [
  { q: 'What is real estate ROI in India?', a: 'Real estate ROI (Return on Investment) measures total gains from a property investment, combining net rental cashflow income and property capital value appreciation over time.' },
  { q: 'How to calculate rental yield in Indian cities?', a: 'Gross rental yield is calculated as: Gross Yield % = (Annual Rental Income / Property Purchase Price) × 100.' },
  { q: 'What is a good rental yield for residential property in India?', a: 'Average residential rental yields in major Indian metro cities range from 2.5% to 4.0% per year, whereas commercial property yields range between 7.0% and 9.5%.' },
  { q: 'What is the difference between gross yield and net rental yield?', a: 'Gross rental yield considers only annual rent vs property price. Net rental yield subtracts annual maintenance charges, property taxes, insurance, and vacancy losses from gross rent before dividing by price.' },
  { q: 'How does capital appreciation affect total real estate ROI?', a: 'Capital appreciation represents price growth of the property. In India, capital appreciation typically accounts for 60% to 80% of total long-term real estate returns.' },
  { q: 'How is rental income taxed under Section 24 of Income Tax Act?', a: 'Rental income is taxed under Income from House Property. Owners get a flat 30% standard deduction for maintenance, plus tax deductions on home loan interest under Section 24(b).' },
  { q: 'Can property management fees be deducted from rental yield?', a: 'Yes, in net rental yield calculations, property manager commissions, society maintenance fees, and annual municipal property taxes must be deducted from gross rent.' },
  { q: 'How does home loan EMI affect real estate cash flow?', a: 'If a property is mortgaged, monthly home loan EMI reduces net cash flow. If monthly rent exceeds EMI and maintenance, the property generates positive cash flow.' },
  { q: 'Why are commercial property yields higher than residential yields in India?', a: 'Commercial properties carry longer lease commitments (5 to 9 years), triple-net lease terms, and higher tenant creditworthiness, yielding 7% to 9.5% compared to 3% for residential flats.' },
  { q: 'How does this real estate ROI calculator work?', a: 'This calculator computes gross rental yield %, net rental yield %, total rupee cashflow, capital appreciation, total ROI %, and year-by-year cashflow projections.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

export default function RealEstateRoiClient() {
  const [mobile, setMobile] = useState(false);
  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);
  const { formatCurrency, selectedCurrency } = useCurrency();

  const [activeTab, setActiveTab] = useState<'total' | 'rental'>('total');

  // Input states
  const [purchasePrice, setPurchasePrice] = useState<number>(7500000); // 75 Lakhs
  const [monthlyRent, setMonthlyRent] = useState<number>(25000); // 25k / mo
  const [annualExpenses, setAnnualExpenses] = useState<number>(40000); // Maintenance + Property Tax
  const [capitalGrowthRate, setCapitalGrowthRate] = useState<number>(7.0); // 7% p.a.
  const [holdingYears, setHoldingYears] = useState<number>(10); // 10 years
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [showTable, setShowTable] = useState<boolean>(false);

  // Restore state
  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-real-estate-roi-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (d.purchasePrice !== undefined) setPurchasePrice(d.purchasePrice);
      if (d.monthlyRent !== undefined) setMonthlyRent(d.monthlyRent);
      if (d.annualExpenses !== undefined) setAnnualExpenses(d.annualExpenses);
      if (d.capitalGrowthRate !== undefined) setCapitalGrowthRate(d.capitalGrowthRate);
      if (d.holdingYears !== undefined) setHoldingYears(d.holdingYears);
    } catch { /* ignore */ }
  }, []);

  // Save state
  useEffect(() => {
    try {
      localStorage.setItem('fermor-real-estate-roi-v1', JSON.stringify({
        purchasePrice, monthlyRent, annualExpenses, capitalGrowthRate, holdingYears
      }));
    } catch { /* ignore */ }
  }, [purchasePrice, monthlyRent, annualExpenses, capitalGrowthRate, holdingYears]);

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
    const netAnnualRent = Math.max(0, grossAnnualRent - annualExpenses);
    
    const grossYieldPct = purchasePrice > 0 ? (grossAnnualRent / purchasePrice) * 100 : 0;
    const netYieldPct = purchasePrice > 0 ? (netAnnualRent / purchasePrice) * 100 : 0;

    // Over holding period
    const totalNetRentalIncome = netAnnualRent * holdingYears;
    const futurePropertyValue = Math.round(purchasePrice * Math.pow(1 + capitalGrowthRate / 100, holdingYears));
    const capitalAppreciationGain = Math.max(0, futurePropertyValue - purchasePrice);

    const totalReturnRupees = totalNetRentalIncome + capitalAppreciationGain;
    const totalRoiPct = purchasePrice > 0 ? (totalReturnRupees / purchasePrice) * 100 : 0;

    // Annualized Total ROI (CAGR)
    const totalFinalValue = purchasePrice + totalReturnRupees;
    const annualizedRoiPct = holdingYears > 0 && purchasePrice > 0
      ? (Math.pow(totalFinalValue / purchasePrice, 1 / holdingYears) - 1) * 100
      : 0;

    // Schedule
    const yearlySchedule: { year: number; rentalCum: number; propVal: number; totalGain: number }[] = [];
    let curVal = purchasePrice;
    let cumRent = 0;

    for (let y = 1; y <= Math.min(30, holdingYears); y++) {
      curVal = Math.round(curVal * (1 + capitalGrowthRate / 100));
      cumRent += netAnnualRent;
      const totalG = cumRent + (curVal - purchasePrice);
      yearlySchedule.push({
        year: y,
        rentalCum: cumRent,
        propVal: curVal,
        totalGain: totalG,
      });
    }

    return {
      grossAnnualRent,
      netAnnualRent,
      grossYieldPct,
      netYieldPct,
      totalNetRentalIncome,
      futurePropertyValue,
      capitalAppreciationGain,
      totalReturnRupees,
      totalRoiPct,
      annualizedRoiPct,
      yearlySchedule,
    };
  }, [purchasePrice, monthlyRent, annualExpenses, capitalGrowthRate, holdingYears]);

  const secS = { marginBottom: 32 };
  const h2S = { fontSize: mobile ? 20 : 24, fontWeight: 700, color: C.ink, marginBottom: 14, letterSpacing: '-0.02em' };
  const pS = { fontSize: 15, color: C.ink2, lineHeight: 1.75, marginBottom: 14 };

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 24 : 32, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Real Estate ROI Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate gross &amp; net rental yield, maintenance expenses, property capital appreciation, and total real estate ROI in India.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD WITH TABS ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 36 }}>
              
              {/* Tabs at top of card */}
              <div role="tablist" aria-label="Calculator mode" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                <button id="tab-total" role="tab" aria-selected={activeTab === 'total'} aria-controls="panel-total"
                  onClick={() => setActiveTab('total')}
                  style={{
                    flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5, fontWeight: activeTab === 'total' ? 700 : 400,
                    color: activeTab === 'total' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'total' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s', fontFamily: INTER,
                  }}>
                  Rental + Appreciation ROI
                </button>
                <button id="tab-rental" role="tab" aria-selected={activeTab === 'rental'} aria-controls="panel-rental"
                  onClick={() => setActiveTab('rental')}
                  style={{
                    flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5, fontWeight: activeTab === 'rental' ? 700 : 400,
                    color: activeTab === 'rental' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'rental' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s', fontFamily: INTER,
                  }}>
                  Pure Rental Yield
                </button>
              </div>

              {/* Tab Panel */}
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '32px 36px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Investment Parameters</p>
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider id="purchase-price" label="Property Purchase Price" value={purchasePrice} min={2000000} max={50000000} step={500000}
                        display={fmtC(purchasePrice)} onChange={setPurchasePrice} compact />

                      <Slider id="monthly-rent" label="Monthly Rental Income" value={monthlyRent} min={5000} max={200000} step={1000}
                        display={fmtIN(monthlyRent)} onChange={setMonthlyRent} compact />

                      <Slider id="holding-years" label="Holding Horizon (Years)" value={holdingYears} min={1} max={30} step={1}
                        display={`${holdingYears} Yrs`} onChange={setHoldingYears} compact suffix="Yrs" />

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                        <button onClick={() => setShowAdvanced(true)}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                          Expenses &amp; Growth
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Slider id="annual-expenses" label="Annual Maintenance &amp; Property Taxes" value={annualExpenses} min={5000} max={200000} step={5000}
                        display={fmtIN(annualExpenses)} onChange={setAnnualExpenses} compact />

                      <Slider id="capital-growth" label="Annual Capital Appreciation %" value={capitalGrowthRate} min={3.0} max={15.0} step={0.5}
                        display={`${capitalGrowthRate.toFixed(1)}%`} onChange={setCapitalGrowthRate} compact suffix="%" />

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                        <button onClick={() => setShowAdvanced(false)}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
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
                    <DonutChart rentalCashflow={calculations.totalNetRentalIncome} capitalAppreciation={calculations.capitalAppreciationGain} />
                  </div>

                  {/* Donut Legend */}
                  <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 16, marginBottom: mobile ? 12 : 18 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Net Rental Cashflow</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Capital Appreciation</span>
                    </div>
                  </div>

                  {/* Primary result box */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: mobile ? '14px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#50565C' }}>
                        {activeTab === 'total' ? 'Total Real Estate Return' : 'Net Rental Yield'}
                      </div>
                      <div style={{ fontSize: 11, color: '#7A8087', marginTop: 2 }}>
                        {activeTab === 'total' ? `Annualized CAGR: ${calculations.annualizedRoiPct.toFixed(1)}%` : 'After Maintenance & Taxes'}
                      </div>
                    </div>
                    <span aria-live="polite" aria-label={activeTab === 'total' ? `Total Real Estate Return: ${fmtC(calculations.totalReturnRupees)}` : `Net Rental Yield: ${calculations.netYieldPct.toFixed(2)}%`}
                      style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {activeTab === 'total' ? fmtC(calculations.totalReturnRupees) : `${calculations.netYieldPct.toFixed(2)}% p.a.`}
                    </span>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: 'Gross Rental Yield', value: `${calculations.grossYieldPct.toFixed(2)}%` },
                    { label: 'Net Rental Yield (Post Expenses)', value: `${calculations.netYieldPct.toFixed(2)}%` },
                    { label: 'Net Annual Rental Income', value: `${fmtIN(calculations.netAnnualRent)}/yr` },
                    { label: `Total Rental Income (${holdingYears} Yrs)`, value: fmtC(calculations.totalNetRentalIncome) },
                    { label: 'Property Capital Growth', value: fmtC(calculations.capitalAppreciationGain) },
                    { label: 'Overall Investment ROI', value: `${calculations.totalRoiPct.toFixed(1)}%` },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: 13, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* Collapsible Year-by-Year Schedule */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', marginBottom: 24 }}>
              <button aria-expanded={showTable} aria-controls="roi-by-year-table"
                onClick={() => setShowTable(!showTable)}
                style={{ width: '100%', padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: INTER }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>Year-by-Year Cash Flow &amp; Valuation Projection</span>
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.dark} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              {showTable && (
                <div id="roi-by-year-table" style={{ padding: '0 20px 20px' }}>
                  <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                        Yearly breakdown of cumulative rental income, property valuation, and net wealth gain.
                      </caption>
                      <thead>
                        <tr>
                          <th scope="col" style={thS}>Year</th>
                          <th scope="col" style={{ ...thS, textAlign: 'right' }}>Cumulative Rent</th>
                          <th scope="col" style={{ ...thS, textAlign: 'right' }}>Property Value</th>
                          <th scope="col" style={{ ...thS, textAlign: 'right' }}>Total Wealth Gain</th>
                        </tr>
                      </thead>
                      <tbody>
                        {calculations.yearlySchedule.map(r => (
                          <tr key={r.year} style={{ background: r.year % 2 === 0 ? '#fafafa' : C.white }}>
                            <td style={tdL}>Year {r.year}</td>
                            <td style={tdR}>{fmtC(r.rentalCum)}</td>
                            <td style={tdR}>{fmtC(r.propVal)}</td>
                            <td style={tdR}>{fmtC(r.totalGain)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Waitlist Card */}
            <div style={{ marginBottom: 24 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ════════════════════ ARTICLE CONTENT ════════════════════ */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={secS} id="what-is-real-estate-roi">
                <h2 style={h2S}>What Is Real Estate ROI?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Real estate Return on Investment (ROI) evaluates the total financial profit generated by a real estate property, combining net rental cashflow income and capital appreciation relative to the purchase cost basis.
                  </p>
                </div>
                <p style={pS}>In India, property returns come from two distinct streams: regular monthly rental income and long-term capital price appreciation when the asset is sold.</p>
                <p style={pS}>This calculator isolates both cash flows, subtracts annual society maintenance fees and municipal taxes, and projects net lifetime returns for residential and commercial property investments.</p>
              </div>

              <div style={secS} id="rental-yield-formula">
                <h2 style={h2S}>Rental Yield Calculation Formula</h2>
                <p style={pS}>Rental yield is the percentage rate of income generated by a real estate property annually relative to its purchase value.</p>
                
                <div style={{ background: '#f8f9f9', border: `1px solid ${C.border}`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, margin: '0 0 8px' }}>Net Rental Yield Formula</p>
                  <code style={{ fontSize: 13, color: C.dark }}>Net Yield % = [(Annual Rent - Annual Maintenance &amp; Taxes) / Purchase Price] × 100</code>
                </div>

                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                      Comparison of residential and commercial property rental yields across Indian tier-1 cities.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Property Type</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Gross Rental Yield %</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Net Yield % (Post Expenses)</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Capital Growth Expectation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={tdL}>Residential Apartments (Mumbai / Delhi)</td>
                        <td style={tdR}>2.8% - 3.4%</td>
                        <td style={tdR}>2.1% - 2.6%</td>
                        <td style={tdR}>6% - 8% p.a.</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>IT Corridor Flats (Bangalore / Pune)</td>
                        <td style={tdR}>3.5% - 4.2%</td>
                        <td style={tdR}>2.8% - 3.4%</td>
                        <td style={tdR}>8% - 11% p.a.</td>
                      </tr>
                      <tr>
                        <td style={tdL}>Commercial Office Spaces (Grade A)</td>
                        <td style={tdR}>7.5% - 9.0%</td>
                        <td style={tdR}>6.8% - 8.2%</td>
                        <td style={tdR}>4% - 6% p.a.</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>Warehousing &amp; Industrial Parks</td>
                        <td style={tdR}>8.5% - 10.0%</td>
                        <td style={tdR}>7.8% - 9.1%</td>
                        <td style={tdR}>5% - 7% p.a.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={secS} id="how-to-use">
                <h2 style={h2S}>How to Use This Real Estate ROI Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select Calculation Mode:</strong> Choose between "Rental + Appreciation ROI" and "Pure Rental Yield".
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Property Cost:</strong> Set total purchase price and monthly rental income.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Maintenance &amp; Taxes:</strong> Input annual society maintenance charges and municipal property tax.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set Capital Growth Rate:</strong> Adjust expected annual property appreciation percentage.
                  </li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> Figures provided by this calculator are estimates for evaluation purposes. Real estate investments in India carry vacancy risk, property tax variations, maintenance hikes, and illiquidity risks. Rental income taxation under Section 24 of the Income Tax Act should be confirmed with a qualified Chartered Accountant.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .reroi-sidebar::-webkit-scrollbar { width: 5px; }
            .reroi-sidebar::-webkit-scrollbar-track { background: transparent; }
            .reroi-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .reroi-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            className="reroi-sidebar"
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
              <AdsterraBanner />
              <RealEstateSnapshot />
              <nav aria-label="Related Calculators" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <SidebarList title="Popular Property Tools" items={POPULAR_TOOLS} />
                <SidebarList title="More Financial Calculators" items={MORE_TOOLS} />
              </nav>
              <RelatedReads />
            </div>
          </aside>
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/property-appreciation-calculator|Property Appreciation', '/calculators/stamp-duty-calculator|Stamp Duty', '/calculators/home-loan-calculator|Home Loan', '/calculators/sip-calculator|SIP', '/calculators/swp-calculator|SWP', '/calculators/gst-calculator|GST'] },
        { hd: 'Topics', links: ['/#|Real Estate ROI', '/#|Rental Yield', '/#|Property Cash Flow', '/#|Home Buying'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} />
    </div>
  );
}

'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useId, useRef } from 'react';
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

/* ── Slider Component ──────────────────────────────────── */
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

/* ── Donut Chart Component ─────────────────────────────── */
function DonutChart({ initialCapital, capitalGain, netRentalIncome }: { initialCapital: number; capitalGain: number; netRentalIncome: number }) {
  const total = Math.max(1, initialCapital + capitalGain + netRentalIncome);
  const capitalPct = (initialCapital / total) * 100;
  const gainPct = (capitalGain / total) * 100;
  const r = 40;
  const circ = 2 * Math.PI * r;
  const strokeDashoffset1 = circ - (capitalPct / 100) * circ;
  const strokeDashoffset2 = circ - ((capitalPct + gainPct) / 100) * circ;

  return (
    <svg width="140" height="140" viewBox="0 0 100 100" role="img" aria-label={`Total wealth split: ${Math.round(capitalPct)}% Initial Capital, ${Math.round(gainPct)}% Capital Appreciation`}>
      <circle cx="50" cy="50" r={r} fill="none" stroke={CHART_PAIR.secondary} strokeWidth="16" />
      <circle cx="50" cy="50" r={r} fill="none" stroke="#50565c" strokeWidth="16"
        strokeDasharray={circ} strokeDashoffset={strokeDashoffset2}
        transform="rotate(-90 50 50)" />
      <circle cx="50" cy="50" r={r} fill="none" stroke={CHART_PAIR.primary} strokeWidth="16"
        strokeDasharray={circ} strokeDashoffset={strokeDashoffset1}
        transform="rotate(-90 50 50)" style={{ transition: 'stroke-dashoffset 0.4s ease' }} />
      <text x="50" y="46" textAnchor="middle" fill={C.ink} fontSize="10" fontWeight="700" fontFamily={INTER}>Final Value</text>
      <text x="50" y="60" textAnchor="middle" fill={C.dark} fontSize="10" fontWeight="800" fontFamily={INTER}>
        Rs {(total / 100000).toFixed(2)}L
      </text>
    </svg>
  );
}

/* ── Sidebar Components ─────────────────────────────────── */
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

function ReturnBenchmarkSnapshot() {
  const rows = [
    { label: 'Residential Rental Yield', value: '2.5% - 4.5% / Year' },
    { label: 'Commercial Rental Yield', value: '6.5% - 9.5% / Year' },
    { label: 'Historical Capital Growth', value: '5.0% - 8.0% / Year' },
    { label: 'Target Equity Multiple', value: '2.0x - 3.5x' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Real Estate Benchmarks</span>
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
    { href: '/calculators/real-estate-roi-calculator', label: 'Real Estate ROI Calculator: Yield & Gains' },
    { href: '/calculators/rental-income-tax-calculator', label: 'Rental Income Tax Calculator: Section 24' },
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
  { href: '/calculators/real-estate-roi-calculator', label: 'Real Estate ROI Calculator' },
  { href: '/calculators/rental-income-tax-calculator', label: 'Rental Income Tax Calculator' },
  { href: '/calculators/property-appreciation-calculator', label: 'Property Appreciation Calculator' },
  { href: '/calculators/home-loan-calculator', label: 'Home Loan Calculator' },
];
const MORE_TOOLS = [
  { href: '/calculators/stamp-duty-calculator', label: 'Stamp Duty Calculator' },
  { href: '/calculators/cagr-calculator', label: 'CAGR Calculator' },
  { href: '/calculators/gst-calculator', label: 'GST Calculator' },
];

/* ── FAQS ──────────────────────────────────────────────── */
const FAQS = [
  { q: 'What is return on investment (ROI) in real estate?', a: 'Real estate ROI measures total financial gains earned from a property (net rental cashflow plus capital appreciation) expressed as a percentage of total initial capital invested.' },
  { q: 'What is Cap Rate in real estate investing?', a: 'Cap Rate (Capitalization Rate) is the ratio of Net Operating Income (NOI = Gross Rent minus Operating Expenses) to property acquisition price: Cap Rate = (NOI / Property Price) × 100.' },
  { q: 'What is a good rental yield in Indian cities?', a: 'In India, gross residential rental yield typically ranges between 2.5% to 4.5% per year, while commercial real estate yields range higher between 6.5% to 9.5% per year.' },
  { q: 'How is capital appreciation calculated for property in India?', a: 'Capital appreciation is the increase in property market value over time. Annualized CAGR return is calculated as: ((Final Valuation / Initial Price)^(1 / Holding Years) - 1) × 100.' },
  { q: 'What is Equity Multiple in property investments?', a: 'Equity Multiple is total cash distributions received plus sale proceeds divided by initial cash invested. An equity multiple of 2.0x means your initial investment doubled.' },
  { q: 'How do operating expenses affect net rental yields?', a: 'Operating expenses like property taxes, society maintenance fees, insurance, and vacancy periods reduce gross rent, resulting in net operating income (NOI).' },
  { q: 'Is real estate leverage (home loan) good for returns?', a: 'Using a home loan increases return on equity (ROE) if capital appreciation and rental yield exceed borrowing interest rates, but increases financial risk during market downturns.' },
  { q: 'How does capital gains tax impact property returns in India?', a: 'Long-term capital gains (LTCG) on property held over 24 months is taxed at 12.5% without indexation (or 20% with indexation for pre-2024 assets) under Budget 2024 provisions.' },
  { q: 'How to calculate total net profit on property sale?', a: 'Total Net Profit = Final Sale Value + Net Cumulative Rent Received - Purchase Price - Acquisition Costs (Stamp Duty/Reg) - Operating Expenses.' },
  { q: 'How does this property investment return calculator work?', a: 'This calculator computes total profit, net rental yield, cap rate, equity multiple, and annualized CAGR returns based on property price, rental income, expenses, and holding tenure.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

export default function PropertyInvestmentReturnClient() {
  const [mobile, setMobile] = useState<boolean>(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const { formatCurrency, selectedCurrency } = useCurrency();

  const [activeTab, setActiveTab] = useState<'total' | 'annualized'>('total');

  // Input states
  const [purchasePrice, setPurchasePrice] = useState<number>(10000000); // 1 Crore
  const [stampDutyPct, setStampDutyPct] = useState<number>(7); // 7% acquisition cost
  const [monthlyRent, setMonthlyRent] = useState<number>(35000); // Rs 35,000 / mo
  const [annualExpenses, setAnnualExpenses] = useState<number>(60000); // Rs 60,000 / yr
  const [appreciationRate, setAppreciationRate] = useState<number>(6.0); // 6% / yr
  const [tenureYears, setTenureYears] = useState<number>(10); // 10 years
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Restore state
  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-property-investment-return-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (d.purchasePrice !== undefined) setPurchasePrice(d.purchasePrice);
      if (d.stampDutyPct !== undefined) setStampDutyPct(d.stampDutyPct);
      if (d.monthlyRent !== undefined) setMonthlyRent(d.monthlyRent);
      if (d.annualExpenses !== undefined) setAnnualExpenses(d.annualExpenses);
      if (d.appreciationRate !== undefined) setAppreciationRate(d.appreciationRate);
      if (d.tenureYears !== undefined) setTenureYears(d.tenureYears);
    } catch { /* ignore */ }
  }, []);

  // Save state
  useEffect(() => {
    try {
      localStorage.setItem('fermor-property-investment-return-v1', JSON.stringify({
        purchasePrice, stampDutyPct, monthlyRent, annualExpenses, appreciationRate, tenureYears
      }));
    } catch { /* ignore */ }
  }, [purchasePrice, stampDutyPct, monthlyRent, annualExpenses, appreciationRate, tenureYears]);

  const currencySymbol = selectedCurrency?.symbol || '₹';
  const fmtC = (val: number) => {
    if (val >= 10000000) return `${currencySymbol}${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `${currencySymbol}${(val / 100000).toFixed(2)} L`;
    return formatCurrency(val);
  };
  const fmtIN = (val: number) => formatCurrency(val);

  // Math Calculations
  const calculations = useMemo(() => {
    const acquisitionCosts = Math.round(purchasePrice * (stampDutyPct / 100));
    const totalInitialOutlay = purchasePrice + acquisitionCosts;

    // Future Valuation = Price * (1 + appreciation%)^years
    const futureValuation = Math.round(purchasePrice * Math.pow(1 + appreciationRate / 100, tenureYears));
    const grossCapitalGain = futureValuation - purchasePrice;

    // Cumulative Rent & Expenses over tenure
    const grossCumulativeRent = monthlyRent * 12 * tenureYears;
    const totalCumulativeExpenses = annualExpenses * tenureYears;
    const netCumulativeRent = Math.max(0, grossCumulativeRent - totalCumulativeExpenses);

    // Total Wealth Created = Future Valuation + Net Cumulative Rent
    const totalFinalValue = futureValuation + netCumulativeRent;
    const totalNetProfit = totalFinalValue - totalInitialOutlay;

    // Rental Yields
    const grossAnnualRent = monthlyRent * 12;
    const grossRentalYieldPct = purchasePrice > 0 ? (grossAnnualRent / purchasePrice) * 100 : 0;
    const netOperatingIncome = Math.max(0, grossAnnualRent - annualExpenses);
    const capRatePct = purchasePrice > 0 ? (netOperatingIncome / purchasePrice) * 100 : 0;

    // ROI & Equity Multiple & CAGR
    const totalRoiPct = totalInitialOutlay > 0 ? (totalNetProfit / totalInitialOutlay) * 100 : 0;
    const equityMultiple = totalInitialOutlay > 0 ? totalFinalValue / totalInitialOutlay : 0;
    const annualizedCagrPct = (totalInitialOutlay > 0 && tenureYears > 0)
      ? (Math.pow(totalFinalValue / totalInitialOutlay, 1 / tenureYears) - 1) * 100
      : 0;

    // Year-by-Year Growth Table
    const yearlySchedule = [];
    let currentVal = purchasePrice;
    let accumRent = 0;
    for (let yr = 1; yr <= tenureYears; yr++) {
      currentVal = Math.round(currentVal * (1 + appreciationRate / 100));
      accumRent += netOperatingIncome;
      yearlySchedule.push({
        year: yr,
        propertyValuation: currentVal,
        cumulativeRent: accumRent,
        totalPortfolioValue: currentVal + accumRent,
      });
    }

    return {
      acquisitionCosts,
      totalInitialOutlay,
      futureValuation,
      grossCapitalGain,
      grossCumulativeRent,
      totalCumulativeExpenses,
      netCumulativeRent,
      totalFinalValue,
      totalNetProfit,
      grossRentalYieldPct,
      netOperatingIncome,
      capRatePct,
      totalRoiPct,
      equityMultiple,
      annualizedCagrPct,
      yearlySchedule,
    };
  }, [purchasePrice, stampDutyPct, monthlyRent, annualExpenses, appreciationRate, tenureYears]);

  const secS = { marginBottom: 32 };
  const h2S = { fontSize: mobile ? 20 : 24, fontWeight: 700, color: C.ink, marginBottom: 14, letterSpacing: '-0.02em' };
  const pS = { fontSize: 15, color: C.ink2, lineHeight: 1.75, marginBottom: 14 };

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 24 : 32, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Property Investment Return Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate real estate ROI, total net profit, rental yields, cap rate, equity multiple, and annualized CAGR growth on Indian property investments.
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
                  Total Return &amp; Net Profit
                </button>
                <button id="tab-annualized" role="tab" aria-selected={activeTab === 'annualized'} aria-controls="panel-annualized"
                  onClick={() => setActiveTab('annualized')}
                  style={{
                    flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5, fontWeight: activeTab === 'annualized' ? 700 : 400,
                    color: activeTab === 'annualized' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'annualized' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s', fontFamily: INTER,
                  }}>
                  Annualized CAGR &amp; Cap Rate
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

                      <Slider id="monthly-rent-inv" label="Monthly Rent Collected" value={monthlyRent} min={5000} max={300000} step={2000}
                        display={fmtIN(monthlyRent)} onChange={setMonthlyRent} compact />

                      <Slider id="appreciation-rate" label="Annual Property Growth Rate %" value={appreciationRate} min={1} max={15} step={0.5}
                        display={`${appreciationRate}%`} onChange={setAppreciationRate} compact suffix="%" />

                      <Slider id="tenure-years" label="Holding Period (Years)" value={tenureYears} min={1} max={30} step={1}
                        display={`${tenureYears} Yrs`} onChange={setTenureYears} compact suffix=" Yrs" />

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                        <button onClick={() => setShowAdvanced(true)}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                          Acquisition &amp; Expenses
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Slider id="stamp-duty-pct" label="Stamp Duty &amp; Reg Fee %" value={stampDutyPct} min={3} max={12} step={0.5}
                        display={`${stampDutyPct}%`} onChange={setStampDutyPct} compact suffix="%" />

                      <Slider id="annual-expenses" label="Annual Maintenance &amp; Property Tax" value={annualExpenses} min={0} max={200000} step={5000}
                        display={fmtIN(annualExpenses)} onChange={setAnnualExpenses} compact />

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
                    <DonutChart initialCapital={calculations.totalInitialOutlay} capitalGain={calculations.grossCapitalGain} netRentalIncome={calculations.netCumulativeRent} />
                  </div>

                  {/* Donut Legend */}
                  <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 16, marginBottom: mobile ? 12 : 18 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Initial Cost</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: '#50565c' }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Capital Gain</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Net Rent</span>
                    </div>
                  </div>

                  {/* Primary result box */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: mobile ? '14px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#50565C' }}>
                        {activeTab === 'total' ? 'Total Net Profit' : 'Annualized CAGR Return'}
                      </div>
                      <div style={{ fontSize: 11, color: '#7A8087', marginTop: 2 }}>
                        {activeTab === 'total' ? `${calculations.equityMultiple.toFixed(2)}x Equity Multiple` : `Cap Rate: ${calculations.capRatePct.toFixed(2)}%`}
                      </div>
                    </div>
                    <span aria-live="polite" aria-label={activeTab === 'total' ? `Total Net Profit: ${fmtIN(calculations.totalNetProfit)}` : `Annualized CAGR Return: ${calculations.annualizedCagrPct.toFixed(2)}%`}
                      style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {activeTab === 'total' ? fmtIN(calculations.totalNetProfit) : `${calculations.annualizedCagrPct.toFixed(2)}%`}
                    </span>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: 'Initial Outlay (Price + Duty)', value: fmtIN(calculations.totalInitialOutlay) },
                    { label: `Future Property Value (${tenureYears} Yrs)`, value: fmtC(calculations.futureValuation) },
                    { label: 'Net Cumulative Rent Collected', value: fmtIN(calculations.netCumulativeRent) },
                    { label: 'Cap Rate (NOI / Purchase Price)', value: `${calculations.capRatePct.toFixed(2)}%` },
                    { label: 'Gross Rental Yield', value: `${calculations.grossRentalYieldPct.toFixed(2)}%` },
                    { label: 'Total Portfolio Value', value: fmtC(calculations.totalFinalValue) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: 13, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* Collapsible Year-by-Year Growth Table */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', marginBottom: 24 }}>
              <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>Year-by-Year Property Growth Schedule</span>
              </div>
              <div style={{ padding: '0 20px 20px' }}>
                <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                      Projected annual growth of property valuation and cumulative net rent collected over {tenureYears} years.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Year</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Property Valuation</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Net Cumulative Rent</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Total Portfolio Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {calculations.yearlySchedule.map(row => (
                        <tr key={row.year} style={{ background: row.year % 2 === 0 ? '#fafafa' : C.white }}>
                          <td style={tdL}>Year {row.year}</td>
                          <td style={tdR}>{fmtIN(row.propertyValuation)}</td>
                          <td style={tdR}>{fmtIN(row.cumulativeRent)}</td>
                          <td style={{ ...tdR, fontWeight: 700 }}>{fmtIN(row.totalPortfolioValue)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Waitlist Card */}
            <div style={{ marginBottom: 24 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ════════════════════ ARTICLE CONTENT ════════════════════ */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={secS} id="what-is-property-return">
                <h2 style={h2S}>What Is Property Investment Return?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Real estate investment return is the total financial yield generated by property ownership, combining ongoing rental cash flows (Net Operating Income) and long-term capital appreciation upon eventual property sale.
                  </p>
                </div>
                <p style={pS}>Unlike fixed deposits or stocks, real estate generates dual revenue streams: predictable monthly rental cash flow plus asset value growth driven by urban expansion and inflation.</p>
                <p style={pS}>To evaluate real estate accurately, savvy investors calculate Cap Rate, Net Rental Yield, Equity Multiple, and Annualized CAGR Return.</p>
              </div>

              <div style={secS} id="real-estate-metrics-table">
                <h2 style={h2S}>Real Estate Metrics and Formulas</h2>
                <p style={pS}>The table below outlines key metrics used by institutional property investors in India:</p>
                
                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                      Key real estate investment metrics and mathematical formulas.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Metric</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Mathematical Formula</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Target Benchmark (India)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={tdL}>1. Gross Rental Yield</td>
                        <td style={tdR}>(Gross Annual Rent / Property Price) × 100</td>
                        <td style={tdR}>2.5% - 4.5% (Residential)</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>2. Cap Rate (NOI Yield)</td>
                        <td style={tdR}>(Net Operating Income / Property Price) × 100</td>
                        <td style={tdR}>5.5% - 8.5% (Commercial)</td>
                      </tr>
                      <tr>
                        <td style={tdL}>3. Equity Multiple</td>
                        <td style={tdR}>Total Cash Collected / Initial Capital Invested</td>
                        <td style={tdR}>2.0x - 3.5x over 10 yrs</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>4. Annualized CAGR Return</td>
                        <td style={tdR}>((Total Final Value / Initial Outlay)^(1 / Years) - 1) × 100</td>
                        <td style={tdR}>10.0% - 14.0% Total CAGR</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={secS} id="how-to-use">
                <h2 style={h2S}>How to Use This Property Investment Return Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Purchase Price:</strong> Input property acquisition price and stamp duty % cost.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Monthly Rent &amp; Expenses:</strong> Input monthly rental income and annual property maintenance expenses.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select Growth &amp; Tenure:</strong> Set expected annual capital appreciation rate and holding period in years.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Review ROI &amp; Cap Rate:</strong> View total net profit, cap rate, equity multiple, and year-by-year growth table.
                  </li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> Property investment projections are based on user inputs and historical market growth trends. Real estate market prices and rental vacancy rates fluctuate based on local economic conditions. Consult a qualified financial advisor before executing high-value property transactions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .pir-sidebar::-webkit-scrollbar { width: 5px; }
            .pir-sidebar::-webkit-scrollbar-track { background: transparent; }
            .pir-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .pir-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            className="pir-sidebar"
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
              <ReturnBenchmarkSnapshot />
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
        { hd: 'Calculators', links: ['/calculators/real-estate-roi-calculator|Real Estate ROI', '/calculators/rental-income-tax-calculator|Rental Tax', '/calculators/property-appreciation-calculator|Property Appreciation', '/calculators/home-loan-calculator|Home Loan', '/calculators/sip-calculator|SIP', '/calculators/gst-calculator|GST'] },
        { hd: 'Topics', links: ['/#|Property ROI', '/#|Cap Rate', '/#|Rental Yield', '/#|Equity Multiple'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} />
    </div>
  );
}

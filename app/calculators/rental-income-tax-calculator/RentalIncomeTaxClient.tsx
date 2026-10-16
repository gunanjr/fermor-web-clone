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
function DonutChart({ netTaxable, taxDeductions }: { netTaxable: number; taxDeductions: number }) {
  const total = Math.max(1, netTaxable + taxDeductions);
  const netPct = (netTaxable / total) * 100;
  const r = 40;
  const circ = 2 * Math.PI * r;
  const strokeDashoffset = circ - (netPct / 100) * circ;
  return (
    <svg width="140" height="140" viewBox="0 0 100 100" role="img" aria-label={`Gross rent split: ${Math.round(netPct)}% Net Taxable Income, ${Math.round(100 - netPct)}% Total Tax Deductions`}>
      <circle cx="50" cy="50" r={r} fill="none" stroke={CHART_PAIR.secondary} strokeWidth="16" />
      <circle cx="50" cy="50" r={r} fill="none" stroke={CHART_PAIR.primary} strokeWidth="16"
        strokeDasharray={circ} strokeDashoffset={strokeDashoffset}
        transform="rotate(-90 50 50)" style={{ transition: 'stroke-dashoffset 0.4s ease' }} />
      <text x="50" y="46" textAnchor="middle" fill={C.ink} fontSize="10" fontWeight="700" fontFamily={INTER}>Gross Rent</text>
      <text x="50" y="60" textAnchor="middle" fill={C.dark} fontSize="10" fontWeight="800" fontFamily={INTER}>
        Rs {(total / 100000).toFixed(2)}L
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

function Section24Snapshot() {
  const rows = [
    { label: 'Sec 24(a) Standard Ded.', value: 'Flat 30% of NAV' },
    { label: 'Municipal Taxes', value: 'Deductible (Cash Paid)' },
    { label: 'Sec 24(b) Loan Interest', value: 'Full Interest (Let-Out)' },
    { label: 'House Loss Set-Off Cap', value: 'Max Rs 2 Lakh/Yr' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Section 24 Tax Rules</span>
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
    { href: '/calculators/hra-calculator', label: 'HRA Exemption Calculator' },
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
  { href: '/calculators/hra-calculator', label: 'HRA Exemption Calculator' },
  { href: '/calculators/old-vs-new-tax-regime-calculator', label: 'Old vs New Tax Regime Calculator' },
  { href: '/calculators/in-hand-salary-calculator', label: 'In-Hand Salary Calculator' },
];
const MORE_TOOLS = [
  { href: '/calculators/property-appreciation-calculator', label: 'Property Appreciation Calculator' },
  { href: '/calculators/stamp-duty-calculator', label: 'Stamp Duty Calculator' },
  { href: '/calculators/gst-calculator', label: 'GST Calculator' },
];

/* ── FAQS ──────────────────────────────────────────────── */
const FAQS = [
  { q: 'How is rental income taxed under Indian Income Tax Act?', a: 'Rental income is taxed under the head Income from House Property. Gross annual rent is reduced by municipal taxes paid, followed by a flat 30% standard deduction under Section 24(a) and home loan interest under Section 24(b).' },
  { q: 'What is the Section 24(a) standard deduction on rental income?', a: 'Section 24(a) grants a flat 30% standard deduction on Net Annual Value (NAV) of let-out property. This deduction is allowed regardless of your actual expenditure on repairs, painting, or maintenance.' },
  { q: 'Can municipal property taxes be deducted from rental income?', a: 'Yes, municipal property taxes paid by the property owner during the financial year can be fully deducted from Gross Annual Rent to arrive at Net Annual Value (NAV).' },
  { q: 'How much home loan interest is deductible on let-out property?', a: 'For let-out property, the entire home loan interest paid during the year is deductible under Section 24(b). However, set-off of net loss under house property against other income (salary/business) is capped at Rs 2 Lakh per financial year.' },
  { q: 'Is rental income taxable under New Tax Regime Section 115BAC?', a: 'Under the New Tax Regime, rental income is still entitled to municipal tax deduction and Section 24(a) 30% standard deduction. However, loss under house property cannot be set off against salary or business income.' },
  { q: 'Is TDS deducted on rental income in India?', a: 'Yes, under Section 194I, if annual rent paid by a corporate tenant exceeds Rs 2.4 Lakh, TDS is deducted at 10%. For individual tenants paying rent over Rs 50,000/month, TDS is 5% under Section 194IB.' },
  { q: 'What happens if a property remains vacant for part of the year?', a: 'If a property is vacant during part of the year, Gross Annual Value is based on actual rent received for the occupied period, providing relief for vacancy loss.' },
  { q: 'Are maintenance fees paid to society deductible from rent?', a: 'If society maintenance is paid directly by the tenant or included in rent, only the net rent retained by the landlord is considered Gross Annual Value.' },
  { q: 'How to calculate net taxable income from rented house?', a: 'Taxable Rental Income = (Gross Rent - Municipal Taxes) - 30% Standard Deduction - Home Loan Interest Paid.' },
  { q: 'How does this rental income tax calculator work?', a: 'This calculator computes Gross Annual Value, NAV, Section 24(a) 30% deduction, Section 24(b) interest deduction, net taxable rental income, and income tax payable.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

export default function RentalIncomeTaxClient() {
  const [mobile, setMobile] = useState<boolean>(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const { formatCurrency, selectedCurrency } = useCurrency();

  const [activeTab, setActiveTab] = useState<'sec24' | 'aftertax'>('sec24');

  // Input states
  const [monthlyRent, setMonthlyRent] = useState<number>(35000); // 35k / mo
  const [municipalTaxes, setMunicipalTaxes] = useState<number>(15000); // 15k / yr
  const [homeLoanInterest, setHomeLoanInterest] = useState<number>(180000); // 1.8L / yr
  const [taxSlabPct, setTaxSlabPct] = useState<number>(30); // 30% slab
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Restore state
  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-rental-income-tax-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (d.monthlyRent !== undefined) setMonthlyRent(d.monthlyRent);
      if (d.municipalTaxes !== undefined) setMunicipalTaxes(d.municipalTaxes);
      if (d.homeLoanInterest !== undefined) setHomeLoanInterest(d.homeLoanInterest);
      if (d.taxSlabPct !== undefined) setTaxSlabPct(d.taxSlabPct);
    } catch { /* ignore */ }
  }, []);

  // Save state
  useEffect(() => {
    try {
      localStorage.setItem('fermor-rental-income-tax-v1', JSON.stringify({
        monthlyRent, municipalTaxes, homeLoanInterest, taxSlabPct
      }));
    } catch { /* ignore */ }
  }, [monthlyRent, municipalTaxes, homeLoanInterest, taxSlabPct]);

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
    const netAnnualValue = Math.max(0, grossAnnualRent - municipalTaxes);
    
    // Sec 24(a) 30% standard deduction
    const standardDeduction = Math.round(netAnnualValue * 0.30);
    
    // Net Income / (Loss) from House Property
    const netHouseIncomeRaw = netAnnualValue - standardDeduction - homeLoanInterest;
    const netHouseIncome = Math.max(0, netHouseIncomeRaw);
    const housePropertyLoss = netHouseIncomeRaw < 0 ? Math.abs(netHouseIncomeRaw) : 0;

    // Income tax payable on rental income
    const taxPayableOnRent = Math.round(netHouseIncome * (taxSlabPct / 100));

    // Tax savings from home loan interest & standard deduction
    const totalDeductions = municipalTaxes + standardDeduction + homeLoanInterest;
    const taxSavedByDeductions = Math.round((standardDeduction + Math.min(200000, homeLoanInterest)) * (taxSlabPct / 100));

    // Net after-tax cashflow from rent
    const netAfterTaxCashflow = grossAnnualRent - municipalTaxes - taxPayableOnRent;

    return {
      grossAnnualRent,
      netAnnualValue,
      standardDeduction,
      netHouseIncome,
      housePropertyLoss,
      taxPayableOnRent,
      totalDeductions,
      taxSavedByDeductions,
      netAfterTaxCashflow,
    };
  }, [monthlyRent, municipalTaxes, homeLoanInterest, taxSlabPct]);

  const secS = { marginBottom: 32 };
  const h2S = { fontSize: mobile ? 20 : 24, fontWeight: 700, color: C.ink, marginBottom: 14, letterSpacing: '-0.02em' };
  const pS = { fontSize: 15, color: C.ink2, lineHeight: 1.75, marginBottom: 14 };

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 24 : 32, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Rental Income Tax Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate Net Annual Value (NAV), Section 24(a) 30% standard deduction, home loan interest deduction, and net income tax on rent in India.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD WITH TABS ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 36 }}>
              
              {/* Tabs at top of card */}
              <div role="tablist" aria-label="Calculator mode" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                <button id="tab-sec24" role="tab" aria-selected={activeTab === 'sec24'} aria-controls="panel-sec24"
                  onClick={() => setActiveTab('sec24')}
                  style={{
                    flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5, fontWeight: activeTab === 'sec24' ? 700 : 400,
                    color: activeTab === 'sec24' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'sec24' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s', fontFamily: INTER,
                  }}>
                  Section 24 Tax Computation
                </button>
                <button id="tab-aftertax" role="tab" aria-selected={activeTab === 'aftertax'} aria-controls="panel-aftertax"
                  onClick={() => setActiveTab('aftertax')}
                  style={{
                    flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5, fontWeight: activeTab === 'aftertax' ? 700 : 400,
                    color: activeTab === 'aftertax' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'aftertax' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s', fontFamily: INTER,
                  }}>
                  Net After-Tax Cash Flow
                </button>
              </div>

              {/* Tab Panel */}
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '32px 36px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Rental Income Parameters</p>
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider id="monthly-rent" label="Monthly Rent Collected" value={monthlyRent} min={5000} max={300000} step={1000}
                        display={fmtIN(monthlyRent)} onChange={setMonthlyRent} compact />

                      <Slider id="municipal-taxes" label="Annual Municipal Taxes Paid" value={municipalTaxes} min={0} max={100000} step={2000}
                        display={fmtIN(municipalTaxes)} onChange={setMunicipalTaxes} compact />

                      <Slider id="home-loan-interest" label="Annual Home Loan Interest Paid" value={homeLoanInterest} min={0} max={1000000} step={25000}
                        display={fmtC(homeLoanInterest)} onChange={setHomeLoanInterest} compact />

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                        <button onClick={() => setShowAdvanced(true)}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                          Tax Slab Rate
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Tax Slab Selector Pill */}
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                          <span style={{ fontSize: 13.5, color: C.ink2 }}>Income Tax Slab</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{taxSlabPct}% Tax Bracket</span>
                        </div>
                        <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                          {[5, 10, 15, 20, 30].map(s => (
                            <button key={s} onClick={() => setTaxSlabPct(s)}
                              style={{ flex: 1, padding: '7px 0', border: 'none', background: taxSlabPct === s ? C.white : 'transparent',
                                color: taxSlabPct === s ? C.ink : C.ink3, fontWeight: taxSlabPct === s ? 700 : 400,
                                cursor: 'pointer', fontFamily: INTER, fontSize: 12.5, transition: 'all 0.15s' }}>
                              {s}%
                            </button>
                          ))}
                        </div>
                      </div>

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
                    <DonutChart netTaxable={calculations.netHouseIncome} taxDeductions={calculations.totalDeductions} />
                  </div>

                  {/* Donut Legend */}
                  <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 16, marginBottom: mobile ? 12 : 18 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Net Taxable Rental Income</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Deductions &amp; Interest</span>
                    </div>
                  </div>

                  {/* Primary result box */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: mobile ? '14px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#50565C' }}>
                        {activeTab === 'sec24' ? 'Income Tax Payable on Rent' : 'Net After-Tax Cashflow'}
                      </div>
                      <div style={{ fontSize: 11, color: '#7A8087', marginTop: 2 }}>
                        {activeTab === 'sec24' ? `At ${taxSlabPct}% Income Tax Slab` : 'Actual Net Cash Retained'}
                      </div>
                    </div>
                    <span aria-live="polite" aria-label={activeTab === 'sec24' ? `Income Tax Payable on Rent: ${fmtIN(calculations.taxPayableOnRent)}` : `Net After-Tax Cashflow: ${fmtIN(calculations.netAfterTaxCashflow)}`}
                      style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {activeTab === 'sec24' ? fmtIN(calculations.taxPayableOnRent) : `${fmtIN(calculations.netAfterTaxCashflow)}/yr`}
                    </span>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: 'Gross Annual Rent Collected', value: fmtIN(calculations.grossAnnualRent) },
                    { label: 'Net Annual Value (NAV)', value: fmtIN(calculations.netAnnualValue) },
                    { label: 'Sec 24(a) 30% Standard Deduction', value: fmtIN(calculations.standardDeduction) },
                    { label: 'Sec 24(b) Home Loan Interest Deduction', value: fmtIN(homeLoanInterest) },
                    { label: 'Net Taxable Rental Income', value: fmtIN(calculations.netHouseIncome) },
                    { label: 'Estimated Tax Saved via Deductions', value: fmtIN(calculations.taxSavedByDeductions) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: 13, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* Waitlist Card */}
            <div style={{ marginBottom: 24 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ════════════════════ ARTICLE CONTENT ════════════════════ */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={secS} id="what-is-rental-income-tax">
                <h2 style={h2S}>What Is Rental Income Tax?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Rental income tax in India is calculated under the head Income from House Property under Section 24 of the Income Tax Act, 1961, which provides a flat 30% standard deduction and home loan interest tax deductions.
                  </p>
                </div>
                <p style={pS}>Rent received from letting out residential or commercial property is taxable at your applicable income tax slab rate.</p>
                <p style={pS}>However, the Income Tax Act allows significant tax relief: municipal taxes actually paid are subtracted first, followed by an automatic 30% standard deduction for maintenance, plus interest paid on home loans used to purchase or construct the property.</p>
              </div>

              <div style={secS} id="section-24-rules">
                <h2 style={h2S}>Section 24 Deductions and Computation Rules</h2>
                <p style={pS}>Here is the step-by-step mathematical breakdown for computing net taxable rental income:</p>
                
                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                      Step-by-step Section 24 rental income tax computation for a Rs 35,000/month rented flat.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Computation Step</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Formula / Legal Clause</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Amount (Rs)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={tdL}>1. Gross Annual Value (GAV)</td>
                        <td style={tdR}>Actual Rent Received (Rs 35k × 12)</td>
                        <td style={tdR}>Rs 4,20,000</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>2. Less: Municipal Property Taxes Paid</td>
                        <td style={tdR}>Taxes paid to local body in FY</td>
                        <td style={tdR}>- Rs 15,000</td>
                      </tr>
                      <tr>
                        <td style={tdL}>3. Net Annual Value (NAV)</td>
                        <td style={tdR}>GAV minus Municipal Taxes</td>
                        <td style={tdR}>Rs 4,05,000</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>4. Less: Sec 24(a) 30% Standard Deduction</td>
                        <td style={tdR}>Flat 30% of NAV</td>
                        <td style={tdR}>- Rs 1,21,500</td>
                      </tr>
                      <tr>
                        <td style={tdL}>5. Less: Sec 24(b) Home Loan Interest</td>
                        <td style={tdR}>Actual Home Loan Interest Paid</td>
                        <td style={tdR}>- Rs 1,80,000</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={{ ...tdL, fontWeight: 700 }}>6. Net Taxable Rental Income</td>
                        <td style={{ ...tdR, fontWeight: 700 }}>NAV - Std Ded - Loan Interest</td>
                        <td style={{ ...tdR, fontWeight: 700 }}>Rs 1,03,500</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={secS} id="how-to-use">
                <h2 style={h2S}>How to Use This Rental Income Tax Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Monthly Rent:</strong> Input total monthly rent received from your tenant.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Municipal Taxes:</strong> Input annual property taxes paid to municipal corporation.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Home Loan Interest:</strong> Input total annual home loan interest paid.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select Income Tax Slab:</strong> Choose your personal tax bracket (5%, 10%, 15%, 20%, or 30%).
                  </li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> Rental income tax calculations follow provisions under Section 24 of the Income Tax Act, 1961. Set-off of house property losses under the New Tax Regime (Section 115BAC) should be verified with a qualified Chartered Accountant during ITR filing.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .rit-sidebar::-webkit-scrollbar { width: 5px; }
            .rit-sidebar::-webkit-scrollbar-track { background: transparent; }
            .rit-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .rit-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            className="rit-sidebar"
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
              <Section24Snapshot />
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
        { hd: 'Calculators', links: ['/calculators/real-estate-roi-calculator|Real Estate ROI', '/calculators/hra-calculator|HRA Exemption', '/calculators/old-vs-new-tax-regime-calculator|Old vs New Tax', '/calculators/in-hand-salary-calculator|In-Hand Salary', '/calculators/sip-calculator|SIP', '/calculators/gst-calculator|GST'] },
        { hd: 'Topics', links: ['/#|Rental Tax', '/#|Section 24(a)', '/#|Section 24(b)', '/#|House Property'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} />
    </div>
  );
}

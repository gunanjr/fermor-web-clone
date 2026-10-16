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
function DonutChart({ netTax, rebate }: { netTax: number; rebate: number }) {
  const total = Math.max(1, netTax + rebate);
  const netPct = (netTax / total) * 100;
  const r = 40;
  const circ = 2 * Math.PI * r;
  const strokeDashoffset = circ - (netPct / 100) * circ;
  return (
    <svg width="140" height="140" viewBox="0 0 100 100" role="img" aria-label={`Property tax split: ${Math.round(netPct)}% Net Tax Payable, ${Math.round(100 - netPct)}% Early Bird Rebate Savings`}>
      <circle cx="50" cy="50" r={r} fill="none" stroke={CHART_PAIR.secondary} strokeWidth="16" />
      <circle cx="50" cy="50" r={r} fill="none" stroke={CHART_PAIR.primary} strokeWidth="16"
        strokeDasharray={circ} strokeDashoffset={strokeDashoffset}
        transform="rotate(-90 50 50)" style={{ transition: 'stroke-dashoffset 0.4s ease' }} />
      <text x="50" y="46" textAnchor="middle" fill={C.ink} fontSize="10" fontWeight="700" fontFamily={INTER}>Annual Tax</text>
      <text x="50" y="60" textAnchor="middle" fill={C.dark} fontSize="10" fontWeight="800" fontFamily={INTER}>
        Rs {(netTax).toLocaleString('en-IN')}
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

function MunicipalSnapshot() {
  const rows = [
    { label: 'BBMP Bangalore', value: 'UAV Zone System' },
    { label: 'MCGM Mumbai', value: 'Capital Value System' },
    { label: 'MCD Delhi', value: 'Unit Area Method' },
    { label: 'Early Payment Rebate', value: '5% Off (Paid by Q1)' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Municipal Tax Systems</span>
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
    { href: '/calculators/rental-income-tax-calculator', label: 'Rental Income Tax Calculator: Section 24' },
    { href: '/calculators/home-buying-total-cost-calculator', label: 'Home Buying Total Cost Calculator' },
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
  { href: '/calculators/rental-income-tax-calculator', label: 'Rental Income Tax Calculator' },
  { href: '/calculators/stamp-duty-calculator', label: 'Stamp Duty Calculator' },
  { href: '/calculators/property-registration-calculator', label: 'Property Registration Calculator' },
  { href: '/calculators/home-loan-calculator', label: 'Home Loan Calculator' },
];
const MORE_TOOLS = [
  { href: '/calculators/property-appreciation-calculator', label: 'Property Appreciation Calculator' },
  { href: '/calculators/real-estate-roi-calculator', label: 'Real Estate ROI Calculator' },
  { href: '/calculators/gst-calculator', label: 'GST Calculator' },
];

/* ── FAQS ──────────────────────────────────────────────── */
const FAQS = [
  { q: 'How is property tax calculated in Indian municipal corporations?', a: 'Property tax in India is calculated using either the Unit Area Value (UAV) method or Capital Value system: Tax = Built-up Area × Base Unit Rate × Occupancy Factor × Building Age Factor × Tax Rate %.' },
  { q: 'What is Unit Area Value (UAV) method in property tax?', a: 'Unit Area Value assigns a per-square-foot annual rental rate based on location category, building age, and structure type to compute standardized municipal property tax.' },
  { q: 'Do municipal corporations offer early payment property tax rebates?', a: 'Yes, most municipal bodies (such as BBMP Bangalore, MCD Delhi, and GHMC Hyderabad) offer a 5% early bird rebate on property tax if paid before April 30th or May 31st of the financial year.' },
  { q: 'Is property tax higher for rented properties than self-occupied?', a: 'Yes, municipal corporations apply higher occupancy multipliers (typically 1.25x to 2.0x) for rented properties compared to self-occupied residential flats.' },
  { q: 'What happens if municipal property tax is paid late?', a: 'Late property tax payments attract simple interest penalties of 1% to 2% per month (12% to 24% per year) calculated from the due date until full clearance.' },
  { q: 'Is municipal property tax deductible from rental income under Section 24?', a: 'Yes, property tax actually paid during the financial year is fully deductible from Gross Annual Rent under Section 24 of the Income Tax Act.' },
  { q: 'How does building age reduce municipal property tax?', a: 'Municipal corporations apply age depreciation factors (e.g. 1.0 for under 5 years, 0.9 for 5-10 years, 0.8 for 10-20 years) reducing property tax for older structures.' },
  { q: 'Can property tax be paid online across Indian cities?', a: 'Yes, all major municipal corporations operate online portals (such as BBMP Online, MCD Online, MCGM Portal) where property owners pay via UPI, net banking, or debit card.' },
  { q: 'How to calculate property tax for a 1200 sq ft flat in Bangalore?', a: 'For a 1200 sq ft flat in BBMP Zone B, annual property tax is computed using Unit Area Value formulas, typically amounting to approx Rs 3,200 to Rs 6,500 per year.' },
  { q: 'How does this property tax estimator work?', a: 'This estimator computes annual property tax payable, 5% early bird rebate savings, late payment penalty risks, and net payable amount based on built-up area and occupancy.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

export default function PropertyTaxEstimatorClient() {
  const [mobile, setMobile] = useState<boolean>(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const { formatCurrency, selectedCurrency } = useCurrency();

  const [activeTab, setActiveTab] = useState<'uav' | 'rebate'>('uav');

  // Input states
  const [builtUpArea, setBuiltUpArea] = useState<number>(1200); // 1200 sq ft
  const [unitRatePerSqFt, setUnitRatePerSqFt] = useState<number>(15); // Rs 15/sq ft/yr base
  const [isRented, setIsRented] = useState<boolean>(false); // Self-occupied vs Rented
  const [buildingAgeCategory, setBuildingAgeCategory] = useState<'new' | 'mid' | 'old'>('new'); // 0-5y, 5-15y, 15+y
  const [taxRatePct, setTaxRatePct] = useState<number>(20); // 20% municipal tax rate on UAV
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Restore state
  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-property-tax-estimator-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (d.builtUpArea !== undefined) setBuiltUpArea(d.builtUpArea);
      if (d.unitRatePerSqFt !== undefined) setUnitRatePerSqFt(d.unitRatePerSqFt);
      if (d.isRented !== undefined) setIsRented(d.isRented);
      if (d.buildingAgeCategory !== undefined) setBuildingAgeCategory(d.buildingAgeCategory);
      if (d.taxRatePct !== undefined) setTaxRatePct(d.taxRatePct);
    } catch { /* ignore */ }
  }, []);

  // Save state
  useEffect(() => {
    try {
      localStorage.setItem('fermor-property-tax-estimator-v1', JSON.stringify({
        builtUpArea, unitRatePerSqFt, isRented, buildingAgeCategory, taxRatePct
      }));
    } catch { /* ignore */ }
  }, [builtUpArea, unitRatePerSqFt, isRented, buildingAgeCategory, taxRatePct]);

  const fmtIN = (val: number) => formatCurrency(val);

  // Math Calculations
  const calculations = useMemo(() => {
    const occupancyFactor = isRented ? 1.5 : 1.0;
    const ageFactor = buildingAgeCategory === 'new' ? 1.0 : buildingAgeCategory === 'mid' ? 0.9 : 0.8;

    // Unit Area Annual Value (UAV) = Area * Unit Rate * 10 Months * Occupancy * Age
    const annualRentalValue = Math.round(builtUpArea * unitRatePerSqFt * 10 * occupancyFactor * ageFactor);
    
    // Gross Annual Property Tax = ARV * TaxRate %
    const grossAnnualTax = Math.round(annualRentalValue * (taxRatePct / 100));

    // 5% Early Bird Rebate
    const earlyBirdRebate = Math.round(grossAnnualTax * 0.05);
    const netTaxWithRebate = Math.max(0, grossAnnualTax - earlyBirdRebate);

    // Half-yearly installment
    const halfYearlyPayment = Math.round(grossAnnualTax / 2);

    return {
      occupancyFactor,
      ageFactor,
      annualRentalValue,
      grossAnnualTax,
      earlyBirdRebate,
      netTaxWithRebate,
      halfYearlyPayment,
    };
  }, [builtUpArea, unitRatePerSqFt, isRented, buildingAgeCategory, taxRatePct]);

  const secS = { marginBottom: 32 };
  const h2S = { fontSize: mobile ? 20 : 24, fontWeight: 700, color: C.ink, marginBottom: 14, letterSpacing: '-0.02em' };
  const pS = { fontSize: 15, color: C.ink2, lineHeight: 1.75, marginBottom: 14 };

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 24 : 32, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Property Tax Estimator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate municipal house tax, Unit Area Value (UAV), 5% early bird rebates, and net payable tax across Indian cities.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD WITH TABS ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 36 }}>
              
              {/* Tabs at top of card */}
              <div role="tablist" aria-label="Calculator mode" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                <button id="tab-uav" role="tab" aria-selected={activeTab === 'uav'} aria-controls="panel-uav"
                  onClick={() => setActiveTab('uav')}
                  style={{
                    flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5, fontWeight: activeTab === 'uav' ? 700 : 400,
                    color: activeTab === 'uav' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'uav' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s', fontFamily: INTER,
                  }}>
                  Unit Area Tax Calculation
                </button>
                <button id="tab-rebate" role="tab" aria-selected={activeTab === 'rebate'} aria-controls="panel-rebate"
                  onClick={() => setActiveTab('rebate')}
                  style={{
                    flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5, fontWeight: activeTab === 'rebate' ? 700 : 400,
                    color: activeTab === 'rebate' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'rebate' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s', fontFamily: INTER,
                  }}>
                  5% Early Payment Rebate
                </button>
              </div>

              {/* Tab Panel */}
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '32px 36px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Building Parameters</p>
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider id="builtup-area" label="Covered Built-Up Area (Sq Ft)" value={builtUpArea} min={300} max={5000} step={50}
                        display={`${builtUpArea} sq ft`} onChange={setBuiltUpArea} compact suffix=" sq ft" />

                      <Slider id="unit-rate" label="Municipal Base Rate per Sq Ft" value={unitRatePerSqFt} min={5} max={50} step={1}
                        display={`${fmtIN(unitRatePerSqFt)}/sq ft`} onChange={setUnitRatePerSqFt} compact />

                      {/* Occupancy Status Toggle */}
                      <div style={{ marginBottom: 18 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                          <span style={{ fontSize: 13.5, color: C.ink2 }}>Occupancy Status</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{isRented ? 'Rented Out (1.5x)' : 'Self-Occupied (1.0x)'}</span>
                        </div>
                        <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                          {[false, true].map(r => (
                            <button key={String(r)} onClick={() => setIsRented(r)}
                              style={{ flex: 1, padding: '7px 0', border: 'none', background: isRented === r ? C.white : 'transparent',
                                color: isRented === r ? C.ink : C.ink3, fontWeight: isRented === r ? 700 : 400,
                                cursor: 'pointer', fontFamily: INTER, fontSize: 12.5, transition: 'all 0.15s' }}>
                              {r ? 'Rented Out' : 'Self-Occupied'}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                        <button onClick={() => setShowAdvanced(true)}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                          Age &amp; Tax Rate
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Building Age Group */}
                      <div style={{ marginBottom: 18 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                          <span style={{ fontSize: 13.5, color: C.ink2 }}>Building Age Group</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{buildingAgeCategory === 'new' ? 'Under 5 Yrs (1.0x)' : buildingAgeCategory === 'mid' ? '5-15 Yrs (0.9x)' : '15+ Yrs (0.8x)'}</span>
                        </div>
                        <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                          {(['new', 'mid', 'old'] as const).map(a => (
                            <button key={a} onClick={() => setBuildingAgeCategory(a)}
                              style={{ flex: 1, padding: '7px 0', border: 'none', background: buildingAgeCategory === a ? C.white : 'transparent',
                                color: buildingAgeCategory === a ? C.ink : C.ink3, fontWeight: buildingAgeCategory === a ? 700 : 400,
                                cursor: 'pointer', fontFamily: INTER, fontSize: 12.5, transition: 'all 0.15s' }}>
                              {a === 'new' ? '< 5 Yrs' : a === 'mid' ? '5-15 Yrs' : '15+ Yrs'}
                            </button>
                          ))}
                        </div>
                      </div>

                      <Slider id="tax-rate-pct" label="Municipal Tax Rate %" value={taxRatePct} min={10} max={30} step={1}
                        display={`${taxRatePct}%`} onChange={setTaxRatePct} compact suffix="%" />

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
                    <DonutChart netTax={calculations.netTaxWithRebate} rebate={calculations.earlyBirdRebate} />
                  </div>

                  {/* Donut Legend */}
                  <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 16, marginBottom: mobile ? 12 : 18 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Net Property Tax</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>5% Early Bird Rebate</span>
                    </div>
                  </div>

                  {/* Primary result box */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: mobile ? '14px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#50565C' }}>
                        {activeTab === 'uav' ? 'Annual Property Tax Payable' : 'Net Tax with 5% Rebate'}
                      </div>
                      <div style={{ fontSize: 11, color: '#7A8087', marginTop: 2 }}>
                        {activeTab === 'uav' ? 'Standard Annual Due' : 'If Paid in First Quarter (Q1)'}
                      </div>
                    </div>
                    <span aria-live="polite" aria-label={activeTab === 'uav' ? `Annual Property Tax: ${fmtIN(calculations.grossAnnualTax)}` : `Net Tax with Rebate: ${fmtIN(calculations.netTaxWithRebate)}`}
                      style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {activeTab === 'uav' ? `${fmtIN(calculations.grossAnnualTax)}/yr` : `${fmtIN(calculations.netTaxWithRebate)}/yr`}
                    </span>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: 'Assessed Annual Rental Value (ARV)', value: fmtIN(calculations.annualRentalValue) },
                    { label: 'Gross Annual Property Tax', value: fmtIN(calculations.grossAnnualTax) },
                    { label: '5% Early Bird Rebate Savings', value: fmtIN(calculations.earlyBirdRebate) },
                    { label: 'Net Tax (With 5% Rebate)', value: fmtIN(calculations.netTaxWithRebate) },
                    { label: 'Half-Yearly Installment (x2)', value: fmtIN(calculations.halfYearlyPayment) },
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

              <div style={secS} id="what-is-property-tax">
                <h2 style={h2S}>What Is Municipal Property Tax?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Municipal property tax is an annual local real estate tax levied by urban local bodies (ULBs) in India to fund civic infrastructure, sewage systems, street lighting, and road maintenance.
                  </p>
                </div>
                <p style={pS}>In major Indian cities, property tax is computed using either the Unit Area Value (UAV) method (Bangalore BBMP, Delhi MCD, Hyderabad GHMC) or the Capital Value System (Mumbai MCGM).</p>
                <p style={pS}>Paying property tax before Q1 deadlines grants an automatic 5% rebate, whereas late payments attract monthly simple interest penalties of 1% to 2%.</p>
              </div>

              <div style={secS} id="uav-formula">
                <h2 style={h2S}>Unit Area Value (UAV) Property Tax Formula</h2>
                <p style={pS}>The Unit Area Value method calculates property tax based on covered area and location unit rates:</p>
                
                <div style={{ background: '#f8f9f9', border: `1px solid ${C.border}`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, margin: '0 0 8px' }}>Unit Area Property Tax Formula</p>
                  <code style={{ fontSize: 13, color: C.dark }}>Property Tax = Area (Sq Ft) × Base Rate × 10 Months × Occupancy Factor × Age Factor × Tax %</code>
                </div>

                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                      Comparison of municipal property tax computation systems in Indian cities.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Municipal Corporation</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Tax System Used</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Early Bird Rebate %</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Sample Tax (1200 Sq Ft Flat)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={tdL}>BBMP (Bangalore)</td>
                        <td style={tdR}>Unit Area Value (Zones A-F)</td>
                        <td style={tdR}>5% (Before April 30)</td>
                        <td style={tdR}>Rs 3,800 - Rs 6,200</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>MCGM (Mumbai)</td>
                        <td style={tdR}>Capital Value System</td>
                        <td style={tdR}>Rebate for early payment</td>
                        <td style={tdR}>Rs 5,500 - Rs 14,000</td>
                      </tr>
                      <tr>
                        <td style={tdL}>MCD (Delhi)</td>
                        <td style={tdR}>Unit Area Method (Cats A-H)</td>
                        <td style={tdR}>15% (Before June 30)</td>
                        <td style={tdR}>Rs 4,200 - Rs 9,500</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>GHMC (Hyderabad)</td>
                        <td style={tdR}>Annual Rental Value</td>
                        <td style={tdR}>5% (Early Bird Scheme)</td>
                        <td style={tdR}>Rs 2,900 - Rs 5,400</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={secS} id="how-to-use">
                <h2 style={h2S}>How to Use This Property Tax Estimator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Built-up Area:</strong> Input total covered area in square feet.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set Base Unit Rate:</strong> Input municipal rate per sq ft (default Rs 15).
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select Occupancy &amp; Age:</strong> Choose Self-Occupied vs Rented and select building age group.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Review Net Tax &amp; Rebate:</strong> View gross annual property tax and net tax after 5% early bird rebate savings.
                  </li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> Municipal property tax rules, Unit Area Values, and rebate deadlines are set by respective Municipal Corporations (BBMP, MCD, MCGM, GHMC). Verify exact property SAS number tax dues on your official municipal tax portal.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .pte-sidebar::-webkit-scrollbar { width: 5px; }
            .pte-sidebar::-webkit-scrollbar-track { background: transparent; }
            .pte-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .pte-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            className="pte-sidebar"
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
              <MunicipalSnapshot />
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
        { hd: 'Calculators', links: ['/calculators/rental-income-tax-calculator|Rental Tax', '/calculators/stamp-duty-calculator|Stamp Duty', '/calculators/property-registration-calculator|Property Registration', '/calculators/home-buying-total-cost-calculator|Total House Cost', '/calculators/sip-calculator|SIP', '/calculators/gst-calculator|GST'] },
        { hd: 'Topics', links: ['/#|Property Tax', '/#|Unit Area Value', '/#|BBMP / MCD Tax', '/#|Early Bird Rebate'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} />
    </div>
  );
}

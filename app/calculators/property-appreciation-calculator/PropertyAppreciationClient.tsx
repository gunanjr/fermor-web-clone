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
function DonutChart({ initialCapital, capitalGain }: { initialCapital: number; capitalGain: number }) {
  const total = initialCapital + capitalGain;
  const initialPct = total > 0 ? (initialCapital / total) * 100 : 50;
  const r = 40;
  const circ = 2 * Math.PI * r;
  const strokeDashoffset = circ - (initialPct / 100) * circ;
  return (
    <svg width="140" height="140" viewBox="0 0 100 100" role="img" aria-label={`Property value split: ${Math.round(initialPct)}% Initial Capital, ${Math.round(100 - initialPct)}% Capital Appreciation Gain`}>
      <circle cx="50" cy="50" r={r} fill="none" stroke={CHART_PAIR.secondary} strokeWidth="16" />
      <circle cx="50" cy="50" r={r} fill="none" stroke={CHART_PAIR.primary} strokeWidth="16"
        strokeDasharray={circ} strokeDashoffset={strokeDashoffset}
        transform="rotate(-90 50 50)" style={{ transition: 'stroke-dashoffset 0.4s ease' }} />
      <text x="50" y="46" textAnchor="middle" fill={C.ink} fontSize="10" fontWeight="700" fontFamily={INTER}>Final Value</text>
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

function AppreciationSnapshot() {
  const rows = [
    { label: 'Mumbai Metro Avg CAGR', value: '8.2% p.a.' },
    { label: 'Bangalore Tech Corridor', value: '10.5% p.a.' },
    { label: 'Delhi NCR Suburbs', value: '7.8% p.a.' },
    { label: 'Long Term Capital Gains', value: 'LTCG Tax Sec 54' },
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
    { href: '/calculators/home-down-payment-calculator', label: 'Home Down Payment Calculator: Savings Goal' },
    { href: '/calculators/stamp-duty-calculator', label: 'Stamp Duty Calculator: State-Wise Property Fees' },
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
  { href: '/calculators/home-down-payment-calculator', label: 'Home Down Payment Calculator' },
  { href: '/calculators/stamp-duty-calculator', label: 'Stamp Duty Calculator' },
  { href: '/calculators/property-registration-calculator', label: 'Property Registration Calculator' },
  { href: '/calculators/home-loan-calculator', label: 'Home Loan Calculator' },
];
const MORE_TOOLS = [
  { href: '/calculators/cagr-calculator', label: 'CAGR Calculator' },
  { href: '/calculators/fire-calculator', label: 'FIRE Calculator' },
  { href: '/calculators/gst-calculator', label: 'GST Calculator' },
];

/* ── FAQS ──────────────────────────────────────────────── */
const FAQS = [
  { q: 'What is property appreciation rate in real estate?', a: 'Property appreciation rate is the annual percentage increase in the market value of a real estate asset over time due to inflation, demand, infrastructure development, and location quality.' },
  { q: 'How is real estate CAGR calculated in India?', a: 'Real estate Compound Annual Growth Rate (CAGR) is calculated using the formula: CAGR = (Final Property Value / Initial Purchase Price)^(1 / Holding Years) - 1.' },
  { q: 'What is the average real estate appreciation rate in India?', a: 'Average residential property appreciation in major Indian metro cities ranges between 6% and 10% CAGR over a 10 to 15 year holding period, with developing suburban corridors experiencing higher growth spikes.' },
  { q: 'Does property appreciation include rental income?', a: 'No, property appreciation measures only the capital price growth of the building or land. Total real estate ROI combines capital appreciation with net rental yield.' },
  { q: 'How does capital improvements impact property value?', a: 'Renovations, interior upgrades, structural extensions, and modern amenities directly increase a property\'s market value and add to the cost of acquisition for tax indexation calculations.' },
  { q: 'How are capital gains taxed on appreciated property in India?', a: 'Long Term Capital Gains (LTCG) on property held for over 24 months are taxed under the Income Tax Act with options under Section 54 to reinvest gains into another residential house for tax exemption.' },
  { q: 'What factors drive real estate appreciation in Indian cities?', a: 'Key drivers include metro line expansion, highway connectivity, commercial IT park developments, civic infrastructure upgrades, and local supply-demand dynamics.' },
  { q: 'Is land appreciation higher than apartment appreciation?', a: 'Generally, independent plots of land appreciate faster than apartment flats because land is a scarce asset that does not suffer structural building depreciation.' },
  { q: 'How to calculate future property value after 10 years?', a: 'Future Property Value is calculated using compound growth: Future Value = Current Purchase Price × (1 + Appreciation Rate %)^10.' },
  { q: 'How does this property appreciation calculator work?', a: 'This calculator computes exact property CAGR %, total capital gains, capital return percentage, and projects future year-by-year property valuations based on your inputs.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

export default function PropertyAppreciationClient() {
  const [mobile, setMobile] = useState(false);
  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);
  const { formatCurrency, selectedCurrency } = useCurrency();

  const [activeTab, setActiveTab] = useState<'cagr' | 'future'>('cagr');

  // Input states
  const [initialPrice, setInitialPrice] = useState<number>(5000000); // 50 Lakhs
  const [currentValuation, setCurrentValuation] = useState<number>(10000000); // 1 Crore
  const [appreciationRate, setAppreciationRate] = useState<number>(8.0); // 8% p.a.
  const [holdingYears, setHoldingYears] = useState<number>(10); // 10 years
  const [renovationCost, setRenovationCost] = useState<number>(500000); // 5 Lakhs
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [showTable, setShowTable] = useState<boolean>(false);

  // Restore state from localStorage
  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-property-appreciation-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (d.initialPrice !== undefined) setInitialPrice(d.initialPrice);
      if (d.currentValuation !== undefined) setCurrentValuation(d.currentValuation);
      if (d.appreciationRate !== undefined) setAppreciationRate(d.appreciationRate);
      if (d.holdingYears !== undefined) setHoldingYears(d.holdingYears);
      if (d.renovationCost !== undefined) setRenovationCost(d.renovationCost);
    } catch { /* ignore */ }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fermor-property-appreciation-v1', JSON.stringify({
        initialPrice, currentValuation, appreciationRate, holdingYears, renovationCost
      }));
    } catch { /* ignore */ }
  }, [initialPrice, currentValuation, appreciationRate, holdingYears, renovationCost]);

  const currencySymbol = selectedCurrency?.symbol || '₹';
  const fmtC = (val: number) => {
    if (val >= 10000000) return `${currencySymbol}${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `${currencySymbol}${(val / 100000).toFixed(2)} L`;
    return formatCurrency(val);
  };
  const fmtIN = (val: number) => formatCurrency(val);

  // Math Calculations
  const calculations = useMemo(() => {
    const totalBasisCost = initialPrice + renovationCost;

    let finalVal = currentValuation;
    let cagrPct = 0;

    if (activeTab === 'cagr') {
      finalVal = currentValuation;
      if (holdingYears > 0 && totalBasisCost > 0) {
        cagrPct = (Math.pow(finalVal / totalBasisCost, 1 / holdingYears) - 1) * 100;
      }
    } else {
      // Future Value mode
      if (holdingYears > 0) {
        finalVal = Math.round(totalBasisCost * Math.pow(1 + appreciationRate / 100, holdingYears));
        cagrPct = appreciationRate;
      }
    }

    const netCapitalGain = Math.max(0, finalVal - totalBasisCost);
    const returnPct = totalBasisCost > 0 ? (netCapitalGain / totalBasisCost) * 100 : 0;
    const annualizedGain = holdingYears > 0 ? Math.round(netCapitalGain / holdingYears) : 0;

    // Year-by-year growth table
    const yearlySchedule: { year: number; val: number; gain: number }[] = [];
    const r = (activeTab === 'cagr' ? cagrPct : appreciationRate) / 100;
    let currentV = totalBasisCost;

    for (let y = 1; y <= Math.min(30, holdingYears); y++) {
      currentV = Math.round(currentV * (1 + r));
      yearlySchedule.push({
        year: y,
        val: currentV,
        gain: currentV - totalBasisCost,
      });
    }

    return {
      totalBasisCost,
      finalVal,
      cagrPct,
      netCapitalGain,
      returnPct,
      annualizedGain,
      yearlySchedule,
    };
  }, [activeTab, initialPrice, currentValuation, appreciationRate, holdingYears, renovationCost]);

  const secS = { marginBottom: 32 };
  const h2S = { fontSize: mobile ? 20 : 24, fontWeight: 700, color: C.ink, marginBottom: 14, letterSpacing: '-0.02em' };
  const pS = { fontSize: 15, color: C.ink2, lineHeight: 1.75, marginBottom: 14 };

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 24 : 32, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Property Appreciation Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate real estate Compound Annual Growth Rate (CAGR), capital gains, and future property value in India.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD WITH TABS ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 36 }}>
              
              {/* Tabs at top of card */}
              <div role="tablist" aria-label="Calculator mode" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                <button id="tab-cagr" role="tab" aria-selected={activeTab === 'cagr'} aria-controls="panel-cagr"
                  onClick={() => setActiveTab('cagr')}
                  style={{
                    flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5, fontWeight: activeTab === 'cagr' ? 700 : 400,
                    color: activeTab === 'cagr' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'cagr' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s', fontFamily: INTER,
                  }}>
                  Calculate CAGR %
                </button>
                <button id="tab-future" role="tab" aria-selected={activeTab === 'future'} aria-controls="panel-future"
                  onClick={() => setActiveTab('future')}
                  style={{
                    flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5, fontWeight: activeTab === 'future' ? 700 : 400,
                    color: activeTab === 'future' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'future' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s', fontFamily: INTER,
                  }}>
                  Project Future Value
                </button>
              </div>

              {/* Tab Panel */}
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '32px 36px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Property Parameters</p>
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider id="initial-price" label="Initial Purchase Price" value={initialPrice} min={1000000} max={50000000} step={500000}
                        display={fmtC(initialPrice)} onChange={setInitialPrice} compact />

                      {activeTab === 'cagr' ? (
                        <Slider id="current-val" label="Current / Final Property Value" value={currentValuation} min={1500000} max={100000000} step={500000}
                          display={fmtC(currentValuation)} onChange={setCurrentValuation} compact />
                      ) : (
                        <Slider id="appreciation-rate" label="Expected Appreciation Rate" value={appreciationRate} min={3.0} max={15.0} step={0.5}
                          display={`${appreciationRate.toFixed(1)}%`} onChange={setAppreciationRate} compact suffix="%" />
                      )}

                      <Slider id="holding-years" label="Holding Period (Years)" value={holdingYears} min={1} max={30} step={1}
                        display={`${holdingYears} Yrs`} onChange={setHoldingYears} compact suffix="Yrs" />

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                        <button onClick={() => setShowAdvanced(true)}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                          Renovation cost
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Slider id="renovation-cost" label="Renovation &amp; Improvement Cost" value={renovationCost} min={0} max={5000000} step={100000}
                        display={fmtC(renovationCost)} onChange={setRenovationCost} compact />

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                        <button onClick={() => setShowAdvanced(false)}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                          Back
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Output Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '32px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* Donut Chart */}
                  <div style={{ order: mobile ? 1 : -1, marginBottom: mobile ? 14 : 18 }}>
                    <DonutChart initialCapital={calculations.totalBasisCost} capitalGain={calculations.netCapitalGain} />
                  </div>

                  {/* Donut Legend */}
                  <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 16, marginBottom: mobile ? 12 : 18 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Initial Cost Basis</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Capital Gain</span>
                    </div>
                  </div>

                  {/* Primary result box */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: mobile ? '14px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#50565C' }}>
                        {activeTab === 'cagr' ? 'Annualized Growth Rate' : 'Projected Future Value'}
                      </div>
                      <div style={{ fontSize: 11, color: '#7A8087', marginTop: 2 }}>
                        {activeTab === 'cagr' ? 'Real Estate CAGR %' : `In ${holdingYears} Years`}
                      </div>
                    </div>
                    <span aria-live="polite" aria-label={activeTab === 'cagr' ? `Real Estate CAGR: ${calculations.cagrPct.toFixed(2)}%` : `Projected Future Value: ${fmtC(calculations.finalVal)}`}
                      style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {activeTab === 'cagr' ? `${calculations.cagrPct.toFixed(2)}% p.a.` : fmtC(calculations.finalVal)}
                    </span>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: 'Total Net Capital Gain', value: fmtC(calculations.netCapitalGain) },
                    { label: 'Total Return Percentage', value: `${calculations.returnPct.toFixed(1)}%` },
                    { label: 'Average Annual Rupee Gain', value: `${fmtIN(calculations.annualizedGain)}/yr` },
                    { label: 'Total Cost Basis (Price + Impr)', value: fmtC(calculations.totalBasisCost) },
                    { label: 'Final Property Valuation', value: fmtC(calculations.finalVal) },
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
              <button aria-expanded={showTable} aria-controls="year-by-year-table"
                onClick={() => setShowTable(!showTable)}
                style={{ width: '100%', padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: INTER }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>Year-by-Year Property Valuation Schedule</span>
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.dark} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              {showTable && (
                <div id="year-by-year-table" style={{ padding: '0 20px 20px' }}>
                  <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                        Year-by-year projected property valuation and cumulative capital gains.
                      </caption>
                      <thead>
                        <tr>
                          <th scope="col" style={thS}>Year</th>
                          <th scope="col" style={{ ...thS, textAlign: 'right' }}>Property Valuation</th>
                          <th scope="col" style={{ ...thS, textAlign: 'right' }}>Cumulative Gain</th>
                        </tr>
                      </thead>
                      <tbody>
                        {calculations.yearlySchedule.map(r => (
                          <tr key={r.year} style={{ background: r.year % 2 === 0 ? '#fafafa' : C.white }}>
                            <td style={tdL}>Year {r.year}</td>
                            <td style={tdR}>{fmtC(r.val)}</td>
                            <td style={tdR}>{fmtC(r.gain)}</td>
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

              <div style={secS} id="what-is-property-appreciation">
                <h2 style={h2S}>What Is a Property Appreciation Calculator?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    A property appreciation calculator computes the exact Compound Annual Growth Rate (CAGR), capital gains, and future valuation of a real estate asset in India based on holding duration and price trends.
                  </p>
                </div>
                <p style={pS}>Real estate in India is a major asset class for wealth building. Evaluating property returns using simple percentage growth can be misleading over long durations like 10 or 20 years.</p>
                <p style={pS}>This calculator applies annualized compounding math to measure true real estate CAGR, accounting for initial acquisition price, capital renovation expenses, and market appreciation across major Indian cities.</p>
              </div>

              <div style={secS} id="appreciation-formula">
                <h2 style={h2S}>Real Estate CAGR Calculation Formula</h2>
                <p style={pS}>Property Compound Annual Growth Rate (CAGR) measures the smooth annual rate of return required for an investment to grow from its initial cost basis to its final market value.</p>
                
                <div style={{ background: '#f8f9f9', border: `1px solid ${C.border}`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, margin: '0 0 8px' }}>Real Estate CAGR Formula</p>
                  <code style={{ fontSize: 13, color: C.dark }}>CAGR = (Final Property Value / Cost Basis)^(1 / Holding Years) - 1</code>
                </div>

                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                      Historical real estate appreciation benchmarks across major Indian cities.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Metro City / Micro-Market</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Average 10-Yr CAGR %</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Sample Growth (Rs 50L to Final)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={tdL}>Bangalore (Outer Ring Road / Whitefield)</td>
                        <td style={tdR}>10.2% p.a.</td>
                        <td style={tdR}>Rs 1.32 Crore</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>Mumbai MMR (Thane / Navi Mumbai)</td>
                        <td style={tdR}>8.5% p.a.</td>
                        <td style={tdR}>Rs 1.13 Crore</td>
                      </tr>
                      <tr>
                        <td style={tdL}>Hyderabad (Gachibowli / HITEC City)</td>
                        <td style={tdR}>11.0% p.a.</td>
                        <td style={tdR}>Rs 1.42 Crore</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>Pune (Hinjewadi / Wakad)</td>
                        <td style={tdR}>7.8% p.a.</td>
                        <td style={tdR}>Rs 1.06 Crore</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={secS} id="how-to-use">
                <h2 style={h2S}>How to Use This Property Appreciation Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select Calculation Mode:</strong> Choose between "Calculate CAGR %" and "Project Future Value".
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Initial Price:</strong> Input original property purchase price.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Valuation or Rate:</strong> Input current market value or expected annual growth percentage.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Review Growth Schedule:</strong> Expand the year-by-year valuation schedule to track property wealth accumulation over time.
                  </li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> Figures provided by this calculator are illustrative estimates based on compound interest math. Real estate markets in India carry local market risks, liquidity constraints, and price volatility. Long-term capital gains tax calculations should be verified with a qualified Chartered Accountant under Section 54 of the Income Tax Act.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .pac-sidebar::-webkit-scrollbar { width: 5px; }
            .pac-sidebar::-webkit-scrollbar-track { background: transparent; }
            .pac-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .pac-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            className="pac-sidebar"
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
              <AppreciationSnapshot />
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
        { hd: 'Calculators', links: ['/calculators/stamp-duty-calculator|Stamp Duty', '/calculators/property-registration-calculator|Property Registration', '/calculators/home-loan-calculator|Home Loan', '/calculators/sip-calculator|SIP', '/calculators/fd-calculator|FD', '/calculators/gst-calculator|GST'] },
        { hd: 'Topics', links: ['/#|Real Estate', '/#|Property CAGR', '/#|Capital Gains', '/#|Home Buying'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} />
    </div>
  );
}

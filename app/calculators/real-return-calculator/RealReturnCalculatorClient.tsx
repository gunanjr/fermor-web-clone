'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useEffect, useLayoutEffect, useMemo, useId } from 'react';
import Link from 'next/link';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import { FAQBox } from '@/components/common/FAQBox';

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

/* ── Donut chart ──────────────────────────────────────── */
function DonutChart({ capitalPct, rentalPct, cagrStr }: { capitalPct: number; rentalPct: number; cagrStr: string }) {
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const capArc = Math.max(0, Math.min((capitalPct / 100) * circ, circ));
  const renArc = Math.max(0, Math.min((rentalPct  / 100) * circ, circ - capArc));
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Capital gain ${capitalPct.toFixed(0)}%, rental income ${rentalPct.toFixed(0)}% of total profit`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.border} strokeWidth={sw} />
      {capArc > 0 && (
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
          strokeDasharray={`${capArc} ${circ - capArc}`} strokeDashoffset={circ / 4}
          style={{ transition: 'stroke-dasharray 0.4s ease, stroke-dashoffset 0.4s ease' }} />
      )}
      {renArc > 0 && (
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw}
          strokeDasharray={`${renArc} ${circ - renArc}`} strokeDashoffset={circ / 4 - capArc}
          style={{ transition: 'stroke-dasharray 0.4s ease, stroke-dashoffset 0.4s ease' }} />
      )}
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>CAGR</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{cagrStr}</text>
    </svg>
  );
}

/* ── Slider ──────────────────────────────────────────── */
function Slider({ label, id: idProp, value, min, max, step, display, onChange, compact }: {
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
    <div style={{ marginBottom: compact ? 18 : 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        {label
          ? <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: 13.5, color: C.ink2, fontWeight: 400, fontFamily: INTER }}>{label}</label>
          : <span />
        }
        {editing ? (
          <div style={{ position: 'relative' }}>
            <input id={inputId} autoFocus value={raw} aria-label={`Enter ${label} value`}
              onChange={e => setRaw(e.target.value)} onBlur={commit}
              onKeyDown={e => e.key === 'Enter' && commit()}
              style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: '6px 12px', width: 130, outline: 'none', color: C.dark, fontFamily: INTER }} />
          </div>
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${display}. Click to edit.`}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}
            style={{ fontSize: 13, fontWeight: 700, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: '6px 13px', cursor: 'pointer', fontFamily: INTER, minWidth: 80, textAlign: 'center', transition: 'border-color 0.15s' }}>
            {display}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 18, height: 18, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 1px 6px rgba(16,18,20,0.18)', pointerEvents: 'none', zIndex: 1 }} />
        <input id={rangeId} type="range" min={min} max={max} step={step} value={value}
          aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
          onChange={e => onChange(+e.target.value)}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
        <span style={{ fontSize: 10.5, color: C.ink3 }}>{min}</span>
        <span style={{ fontSize: 10.5, color: C.ink3 }}>{max}</span>
      </div>
    </div>
  );
}

/* ── Sidebar sub-components ──────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.ink, fontFamily: INTER }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ padding: '13px 20px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 14, color: C.ink2, fontFamily: INTER, transition: 'all 0.12s' }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = C.paleLime; (e.currentTarget as HTMLElement).style.color = C.dark; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink2; }}>
            {label}
          </div>
        </Link>
      ))}
    </div>
  );
}

function PropertySnapshot() {
  const rows = [
    { label: 'Metro gross yield (typical)', value: '3-4%' },
    { label: 'Tier-2 gross yield (typical)', value: '4-6%' },
    { label: 'LTCG on property (after 24m)', value: '12.5%' },
    { label: 'RBI HPI appreciation (10y avg)', value: '7.3%' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Property Quick Facts</span>
      </div>
      {rows.map((r, i) => (
        <div key={r.label} style={{ padding: '11px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: C.white, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12.5, color: C.ink2 }}>{r.label}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

function RelatedReads() {
  const links = [
    { href: '/news/ltcg-on-property-sale-2025', label: 'LTCG Tax on Property Sale 2025: Rates and Form 26QB' },
    { href: '/news/home-loan-interest-rates-2025', label: 'Home Loan Interest Rates: All Banks Compared 2025' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Related Reads</span>
      </div>
      {links.map((l, i) => (
        <Link key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', padding: '13px 16px', borderBottom: i < links.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: C.white }}>
          <span style={{ fontSize: 13, color: C.dark, fontWeight: 500, lineHeight: 1.5, display: 'block', fontFamily: INTER }}>{l.label}</span>
        </Link>
      ))}
    </div>
  );
}

/* ── CA CTA ──────────────────────────────────────────── */

const POPULAR = [
  { href: '/calculators/home-loan-eligibility-calculator', label: 'Home Loan Eligibility' },
  { href: '/calculators/emi-calculator', label: 'EMI Calculator' },
  { href: '/calculators/nps-calculator', label: 'NPS Calculator' },
  { href: '/calculators/sip-calculator', label: 'SIP Calculator' },
  { href: '/calculators/fd-calculator', label: 'FD Calculator' },
];
const MORE = [
  { href: '/calculators/retirement-corpus-calculator', label: 'Retirement Corpus Calculator' },
  { href: '/calculators/savings-account-interest-calculator', label: 'Savings Interest Calculator' },
  { href: '/calculators/term-insurance-calculator', label: 'Term Insurance Calculator' },
  { href: '/calculators/performance-bonus-tax-calculator', label: 'Bonus Tax Calculator' },
];

/* ── FAQ (source of truth lives in page.tsx) ─────────── */
function FAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  return <FAQBox items={faqs} />;
}

/* ── Article style constants ─────────────────────────── */
const h2S: React.CSSProperties = { fontSize: 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' };
const pS:  React.CSSProperties = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' };
const sec: React.CSSProperties = { margin: '0 0 44px' };
const thS: React.CSSProperties = { padding: '9px 14px', fontSize: 12, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', border: `1px solid ${C.border}`, whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.05em' };
const tdS: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}` };

/* ════════════════════════════════════════════════════ */
export default function RealReturnCalculatorClient({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [mobile, setMobile] = useState(false);
  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  /* ── State ────────────────────────────────────────── */
  const [propertyValue, setPropertyValue] = useState(5000000);
  const [monthlyRent,   setMonthlyRent]   = useState(15000);
  const [holdingYears,  setHoldingYears]  = useState(10);
  const [appreciation,  setAppreciation]  = useState(7);
  const [costPct,       setCostPct]       = useState(1.5);
  const [inflation,     setInflation]     = useState(6);
  const [showAdvanced,  setShowAdvanced]  = useState(false);
  const [hydrated,      setHydrated]      = useState(false);
  const [showTable,     setShowTable]     = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('fermor-real-return-v1');
      if (raw) {
        const d = JSON.parse(raw);
        if (typeof d.propertyValue === 'number') setPropertyValue(d.propertyValue);
        if (typeof d.monthlyRent   === 'number') setMonthlyRent(d.monthlyRent);
        if (typeof d.holdingYears  === 'number') setHoldingYears(d.holdingYears);
        if (typeof d.appreciation  === 'number') setAppreciation(d.appreciation);
        if (typeof d.costPct       === 'number') setCostPct(d.costPct);
        if (typeof d.inflation     === 'number') setInflation(d.inflation);
      }
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem('fermor-real-return-v1', JSON.stringify({ propertyValue, monthlyRent, holdingYears, appreciation, costPct, inflation }));
    } catch { /* ignore */ }
  }, [propertyValue, monthlyRent, holdingYears, appreciation, costPct, inflation, hydrated]);

  /* ── Math ─────────────────────────────────────────── */
  const result = useMemo(() => {
    const grossYield      = (monthlyRent * 12 / propertyValue) * 100;
    const annualCostAmt   = propertyValue * (costPct / 100);
    const netAnnualRent   = monthlyRent * 12 - annualCostAmt;
    const netYield        = (netAnnualRent / propertyValue) * 100;
    const totalNetRental  = Math.max(0, netAnnualRent * holdingYears);
    const exitValue       = propertyValue * Math.pow(1 + appreciation / 100, holdingYears);
    const capitalGain     = exitValue - propertyValue;
    const totalProfit     = totalNetRental + capitalGain;
    const totalValue      = exitValue + totalNetRental;
    const cagr            = (Math.pow(totalValue / propertyValue, 1 / holdingYears) - 1) * 100;
    const realReturn      = ((1 + cagr / 100) / (1 + inflation / 100) - 1) * 100;
    const totalROI        = (totalProfit / propertyValue) * 100;
    const capitalSharePct = totalProfit > 0 ? (capitalGain / totalProfit) * 100 : 0;
    const rentalSharePct  = totalProfit > 0 ? (totalNetRental / totalProfit) * 100 : 0;
    return { grossYield, netYield, totalNetRental, exitValue, capitalGain, totalProfit, cagr, realReturn, totalROI, capitalSharePct, rentalSharePct };
  }, [propertyValue, monthlyRent, holdingYears, appreciation, costPct, inflation]);

  const yearlyRows = useMemo(() => {
    const annualCostAmt = propertyValue * (costPct / 100);
    const netAnnualRent = Math.max(0, monthlyRent * 12 - annualCostAmt);
    const rows: { year: number; propertyValue: number; netRent: number; cumulativeRent: number; totalValue: number }[] = [];
    const startYear = new Date().getFullYear();
    for (let i = 1; i <= holdingYears; i++) {
      const yearPropertyValue = propertyValue * Math.pow(1 + appreciation / 100, i);
      const cumulativeRent = netAnnualRent * i;
      rows.push({
        year: startYear + i,
        propertyValue: yearPropertyValue,
        netRent: netAnnualRent,
        cumulativeRent,
        totalValue: yearPropertyValue + cumulativeRent,
      });
    }
    return rows;
  }, [propertyValue, monthlyRent, holdingYears, appreciation, costPct]);

  const fP = (v: number) => v.toFixed(2) + '%';

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <style>{`
        .rr-sidebar::-webkit-scrollbar { width: 5px; }
        .rr-sidebar::-webkit-scrollbar-track { background: transparent; }
        .rr-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .rr-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
      `}</style>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 id="rental-yield-calculator" style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Real Return Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate gross rental yield, net yield, property appreciation ROI, and the inflation-adjusted real return on any Indian real estate investment.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── Calculator card ──────────────────── */}
            <section aria-label="Real Return Calculator"
              style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0, fontFamily: INTER }}>
                      {showAdvanced ? 'Advanced Settings' : 'Property Details'}
                    </p>
                    {showAdvanced
                      ? <button onClick={() => setShowAdvanced(false)} style={{ fontSize: 12, fontWeight: 600, color: C.ink2, background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, textDecoration: 'underline', padding: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
                          Back
                        </button>
                      : <CurrencySelector theme="light" />
                    }
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider id="rr-property" label="Property Value" value={propertyValue} min={500000} max={50000000} step={100000}
                        display={fmtC(propertyValue)} onChange={setPropertyValue} compact={mobile} />
                      <Slider id="rr-rent" label="Monthly Rent" value={monthlyRent} min={2000} max={300000} step={500}
                        display={fmtC(monthlyRent)} onChange={setMonthlyRent} compact={mobile} />
                      <Slider id="rr-years" label="Holding Period" value={holdingYears} min={1} max={30} step={1}
                        display={`${holdingYears} yr`} onChange={setHoldingYears} compact={mobile} />
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
                        <button onClick={() => setShowAdvanced(true)}
                          style={{ fontSize: 12, fontWeight: 700, color: C.ink2, background: 'none', border: `1px solid ${C.border}`, borderRadius: 7, padding: '6px 14px', cursor: 'pointer', fontFamily: INTER, display: 'flex', alignItems: 'center', gap: 5 }}>
                          More Settings
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Slider id="rr-apprec" label="Annual Appreciation" value={appreciation} min={0} max={20} step={0.5}
                        display={`${appreciation}%`} onChange={setAppreciation} compact={mobile} />
                      <Slider id="rr-cost" label="Annual Costs (% of value)" value={costPct} min={0} max={5} step={0.1}
                        display={`${costPct}%`} onChange={setCostPct} compact={mobile} />
                      <Slider id="rr-inflation" label="Inflation Rate" value={inflation} min={1} max={15} step={0.5}
                        display={`${inflation}%`} onChange={setInflation} compact={mobile} />
                    </>
                  )}
                </div>

                {/* Result panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 10 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                      <div style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Annualised Return (CAGR)</div>
                      <div style={{ fontSize: mobile ? 12 : 13, color: '#7A8087' }}>Rent + appreciation combined</div>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                      <div style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', lineHeight: 1 }}
                        aria-live="polite" aria-label={`Annualised return: ${fP(result.cagr)}`}>
                        {fP(result.cagr)}
                      </div>
                      <div style={{ fontSize: mobile ? 12 : 13, fontWeight: 600, color: '#101214' }}>
                        {fP(result.realReturn)} real (after inflation)
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : -6, order: mobile ? 1 : -1 }}>
                    <DonutChart capitalPct={result.capitalSharePct} rentalPct={result.rentalSharePct} cagrStr={fP(result.cagr)} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 6, order: mobile ? 2 : -1, width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Capital gain ({result.capitalSharePct.toFixed(0)}%)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Rental income ({result.rentalSharePct.toFixed(0)}%)</span>
                    </div>
                  </div>

                  {[
                    { label: 'Gross Rental Yield',           value: fP(result.grossYield),      note: 'Annual rent / property value' },
                    { label: 'Net Rental Yield',             value: fP(result.netYield),        note: 'After maintenance + vacancy' },
                    { label: 'Total Net Rental Income',      value: fmtC(result.totalNetRental), note: `Over ${holdingYears} years` },
                    { label: 'Property Value at Exit',       value: fmtC(result.exitValue),     note: `At ${appreciation}% p.a. appreciation` },
                    { label: 'Capital Gain',                 value: fmtC(result.capitalGain),   note: 'Exit value minus purchase price' },
                    { label: 'Total Profit',                 value: fmtC(result.totalProfit),   note: 'Rental income + capital gain' },
                    { label: 'Total ROI (Absolute)',         value: fP(result.totalROI),        note: 'Total profit / investment' },
                    { label: 'Real Return (Post-Inflation)', value: fP(result.realReturn),      note: 'Fisher equation adjusted' },
                  ].map(({ label, value, note }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: mobile ? '8px 0' : '10px 0', borderBottom: `1px solid ${C.border}`, width: '100%', gap: 8 }}>
                      <div>
                        <span style={{ fontSize: mobile ? 12.5 : 13, color: C.ink2, display: 'block' }}>{label}</span>
                        <span style={{ fontSize: 10.5, color: C.ink3, display: 'block' }}>{note}</span>
                      </div>
                      <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 700, color: C.ink, whiteSpace: 'nowrap' }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {yearlyRows.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowTable(v => !v)}
                    aria-expanded={showTable} aria-controls="rr-growth-table"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Year-by-Year Property Growth</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>({yearlyRows.length} years)</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {fmtC(yearlyRows[yearlyRows.length - 1].totalValue)}
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showTable && (
                    <div id="rr-growth-table" style={{ borderTop: `1px solid ${C.border}`, overflowX: 'auto', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
                      <table style={{ minWidth: 560, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead>
                          <tr style={{ background: '#f4f5f6' }}>
                            {['Year', 'Property Value', 'Net Rent (that year)', 'Cumulative Rent', 'Total Value'].map(h => (
                              <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }} scope="col">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {yearlyRows.map((row, i) => (
                            <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                              <td style={{ padding: '11px 14px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                              <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtC(row.propertyValue)}</td>
                              <td style={{ padding: '11px 14px', color: '#1f7a58', fontWeight: 600 }}>{fmtC(row.netRent)}</td>
                              <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtC(row.cumulativeRent)}</td>
                              <td style={{ padding: '11px 14px', fontWeight: 700, color: C.dark }}>{fmtC(row.totalValue)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </section>

            <div style={{ marginBottom: 32 }}><SaveResultsCard mobile={mobile} /></div>


            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 id="what-is-rental-yield" style={h2S}>What Is Rental Yield and Why Does It Matter?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Rental yield is the annual income from a property expressed as a percentage of its purchase price. It answers the key question: how much income does this property generate relative to what you paid for it?
                  </p>
                </div>
                <p style={pS}>
                  Indian metro markets typically deliver gross yields of 2.5% to 4%, while Tier-2 cities offer 4% to 6%. <strong>Gross rental yield</strong> = (Annual Rent / Property Value) x 100. A Rs 60 lakh property renting at Rs 18,000/month earns Rs 2,16,000 annually, giving 3.6% gross yield. <strong>Net yield</strong> adjusts for costs: maintenance typically runs 0.5-1.5% annually, and one month of vacancy per year cuts gross rent by about 8.3%.
                </p>
                <p style={{ ...pS, margin: 0 }}>
                  With home loan rates at 8.5-9%, Indian metro rental yields of 2.5-3.5% mean leveraged properties typically generate negative monthly cash flow. Investors buy expecting capital appreciation to compensate, making accurate total ROI calculation (yield + appreciation) essential before any purchase decision.
                </p>
              </div>

              <div style={sec}>
                <h2 id="how-property-roi-calculated" style={h2S}>How Is Property ROI Calculated? The Complete Formula</h2>
                <p style={pS}>Property ROI over a holding period combines cumulative rental income and capital appreciation at exit:</p>
                <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 18px', marginBottom: 14, fontFamily: 'monospace', fontSize: 13, lineHeight: 1.9 }}>
                  <div style={{ color: C.ink }}>Net Annual Rent = (Monthly Rent x 12) - (Property Value x Cost %)</div>
                  <div style={{ color: C.ink }}>Exit Value = Property Value x (1 + Appreciation%)<sup>Years</sup></div>
                  <div style={{ color: C.ink }}>Total Profit = (Net Annual Rent x Years) + Capital Gain</div>
                  <div style={{ color: C.ink, fontWeight: 700 }}>CAGR = (Total Value / Property Value)<sup>(1/Years)</sup> - 1</div>
                </div>
                <p style={{ ...pS, margin: 0 }}>
                  Example: A Rs 1 crore property with Rs 25,000/month rent, 7% appreciation, and 1.5% annual costs over 10 years yields approximately Rs 27.5 lakh net rental income + Rs 96.7 lakh capital gain = Rs 1.24 crore total profit. That is 124% absolute ROI or about 8.6% annualised CAGR.
                </p>
              </div>

              <div style={sec}>
                <h2 id="real-vs-nominal-return" style={h2S}>Real Return vs Nominal Return: The Fisher Equation Explained</h2>
                <p style={pS}>
                  The nominal return is the raw CAGR including rental income and appreciation. The real return strips out inflation to show actual purchasing-power growth. With India's long-run CPI averaging 5-7%, this adjustment is significant.
                </p>
                <p style={{ ...pS, margin: 0 }}>
                  Precise formula (Fisher equation): <strong>Real Return = [(1 + Nominal CAGR) / (1 + Inflation)] - 1</strong>. If your property delivers 9% CAGR and inflation is 6%, real return is (1.09 / 1.06) - 1 = 2.83%, not the common approximation of 3%. Over 15 years, this 0.17% error compounds into a meaningful planning mistake.
                </p>
              </div>

              <div style={sec}>
                <h2 id="city-wise-rental-yields" style={h2S}>City-wise Rental Yields in India: 2025 Data</h2>
                <p style={pS}>Rental yields vary widely across Indian cities. These are approximate gross yields based on 2024-25 market data:</p>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, textAlign: 'left', paddingTop: 8 }}>Data based on residential real estate market averages; individual properties vary significantly.</caption>
                    <thead>
                      <tr>
                        {['City', 'Gross Yield', '10Y Appreciation', 'Market Type'].map(h => (
                          <th key={h} scope="col" style={thS}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Mumbai',       '2.5-3%',  '7-9% CAGR',   'Premium metro'],
                        ['Delhi NCR',    '2.8-3.5%','6-8% CAGR',   'Premium metro'],
                        ['Bengaluru',    '3-4%',    '8-10% CAGR',  'Tech hub'],
                        ['Hyderabad',    '3.5-4.5%','9-12% CAGR',  'High growth'],
                        ['Pune',         '3.5-4.5%','8-10% CAGR',  'Mid-size IT'],
                        ['Chennai',      '3-4%',    '7-9% CAGR',   'Stable metro'],
                        ['Ahmedabad',    '4-5%',    '8-11% CAGR',  'Emerging'],
                        ['Tier-2 cities','4-6%',    '8-12% CAGR',  'High growth'],
                      ].map((row, i) => (
                        <tr key={row[0]} style={{ background: i % 2 === 0 ? C.white : C.bg }}>
                          {row.map((cell, j) => <td key={j} style={tdS}>{cell}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* In-Content Promo Bar */}
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginTop: 16, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Home Loan Eligibility Calculator</p>
                    <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Check how much home loan you qualify for before making an investment decision. Rates vary significantly across banks.</p>
                  </div>
                  <Link className="fx-btn" href="/calculators/home-loan-eligibility-calculator" target="_blank" rel="noopener noreferrer"
                    style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    Open calculator
                  </Link>
                </div>
              </div>

              <div style={sec}>
                <h2 id="property-vs-mutual-funds" style={h2S}>Property vs Mutual Funds: Which Delivers Better Real Returns?</h2>
                <p style={pS}>
                  Over 2010-2024, diversified equity mutual funds delivered 12-15% CAGR. Residential property in metro cities delivered 8-11% CAGR (rent + appreciation combined). However, property benefits from leverage: with 20% down, return on equity can exceed 25% in rising markets.
                </p>
                <p style={{ ...pS, margin: 0 }}>
                  Key differences: property has 5-8% transaction costs (stamp duty + registration), is illiquid, and requires active management. Mutual funds have minimal transaction costs and are liquid. Real (inflation-adjusted) returns have historically averaged 4-7% for both asset classes over 15-year periods in India.
                </p>
              </div>

              <div style={sec}>
                <h2 id="tax-on-rental-income" style={h2S}>Tax on Rental Income and Property Sale: What to Know</h2>
                <p style={pS}>
                  Rental income is taxable under "Income from House Property" in India. A 30% standard deduction is allowed on net annual value, plus full home loan interest deduction. TDS at 2% under Section 194-IB applies when monthly rent exceeds Rs 50,000, a rate cut from 5% effective 1 October 2024.
                </p>
                <p style={{ ...pS, margin: 0 }}>
                  Capital gains on property held over 24 months are Long-Term (LTCG) taxed at 12.5% without indexation (post Budget 2024). Short-term gains (under 24 months) are taxed at slab rates. Section 54 exempts LTCG if you reinvest in another residential property within 2 years of sale. Use the{' '}
                  <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</Link>{' '}
                  to estimate your total liability including rental income.
                </p>
              </div>

              <div style={sec}>
                <h2 id="common-roi-mistakes" style={h2S}>Common Mistakes When Calculating Property ROI</h2>
                {[
                  { title: 'Ignoring transaction costs', body: 'Stamp duty (3-8%), registration (1%), broker fees (1-2%), and society charges increase effective purchase price by 5-11%, reducing actual ROI significantly. Always base yield calculation on all-in cost.' },
                  { title: 'Using gross yield as investment return', body: 'Gross yield ignores vacancy, maintenance, and property taxes. Net yield after costs is typically 1.5-2 percentage points lower. For accurate ROI, use net yield.' },
                  { title: 'Not accounting for inflation', body: 'A 10% nominal property return during 7% inflation delivers only 2.8% real return, barely ahead of a savings account in purchasing-power terms.' },
                  { title: 'Assuming linear appreciation', body: 'Property markets cycle. Overbuilding periods like 2014-2018 in many Indian cities produced near-zero real appreciation. Always stress-test with lower appreciation scenarios, especially for long holding periods.' },
                ].map((item, i) => (
                  <div key={i} style={{ padding: '13px 16px', border: `1px solid ${C.border}`, borderRadius: 8, background: C.bg, marginBottom: 10 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{i + 1}. {item.title}: </span>
                    <span style={{ fontSize: 14, color: C.ink2, lineHeight: 1.7 }}>{item.body}</span>
                  </div>
                ))}

                {/* In-Content Promo Bar #2 */}
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginTop: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Retirement Corpus Calculator</p>
                    <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Planning to retire on rental income? Calculate how much total corpus you need to cover all expenses through retirement.</p>
                  </div>
                  <Link className="fx-btn" href="/calculators/retirement-corpus-calculator" target="_blank" rel="noopener noreferrer"
                    style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    Open calculator
                  </Link>
                </div>
              </div>

              <div style={sec}>
                <h2 id="home-loan-interest-letout" style={h2S}>Home Loan Interest Deduction Is Uncapped for Rented Property</h2>
                <p style={pS}>
                  Yes, unlike a self-occupied home. Under <a href="https://www.incometax.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Section 24(b)</a>, a self-occupied property caps home loan interest deduction at Rs 2 lakh a year, but a let-out property has no ceiling at all, the full interest paid against rental income can be claimed.
                </p>
                <p style={{ ...pS, margin: 0 }}>
                  This makes a leveraged rental property meaningfully more tax-efficient than the raw cash-on-cash numbers suggest, since a large interest outgo that looks like a drag on cash flow is fully deductible against the rental income it generates.
                </p>
              </div>

              <div style={sec}>
                <h2 id="rera-registration" style={h2S}>Is the Project You Are Buying Into RERA-Registered</h2>
                <p style={pS}>
                  Check before you buy. Under the <a href="https://mohua.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Real Estate (Regulation and Development) Act, 2016</a>, any project larger than 500 square metres or with more than 8 apartments must be registered with the state RERA authority.
                </p>
                <p style={{ ...pS, margin: 0 }}>
                  Registration means the promoter has disclosed project timelines, land title, and approvals, and must deposit 70% of buyer funds in an escrow account earmarked for construction. An unregistered project of this size is a red flag, not a formality being skipped.
                </p>
              </div>

              <div style={sec}>
                <h2 id="circle-rate-capital-gains" style={h2S}>Why Selling Below Circle Rate Can Still Trigger Higher Tax</h2>
                <p style={pS}>
                  Under Section 50C of the Income Tax Act, if you sell a property below its stamp duty value (circle rate), capital gains are computed on the higher circle rate, not your actual sale price, unless the difference is within a 10% tolerance band.
                </p>
                <p style={{ ...pS, margin: 0 }}>
                  The same gap can also be taxed as "income from other sources" in the buyer's hands under Section 56(2)(x). Always check the applicable circle rate before agreeing on a sale price, since it directly affects both parties' tax bills.
                </p>
              </div>

              <div style={sec}>
                <h2 id="gst-property-purchase" style={h2S}>Does GST Apply When You Buy the Property</h2>
                <p style={pS}>
                  Only if it is under construction. Under-construction residential property attracts 5% GST without input tax credit, or 1% for affordable housing (carpet area up to 60 sq m in metros, priced at Rs 45 lakh or below), per <a href="https://www.cbic.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>CBIC</a> rules.
                </p>
                <p style={{ ...pS, margin: 0 }}>
                  A ready-to-move property, where the full consideration is paid after the completion certificate, and any resale property sold by an individual owner, attract no GST at all. This is a meaningful cost difference to factor in when comparing a new launch against a resale flat.
                </p>
              </div>

              <div style={sec}>
                <h2 id="nri-rental-tds" style={h2S}>NRI Landlords Face a Much Higher TDS Rate on Rent</h2>
                <p style={pS}>
                  If your landlord is an NRI, the tenant must deduct TDS at 30% (31.2% with cess) under Section 195, from the very first rupee of rent, unlike the Rs 50,000/month threshold that applies to resident landlords under Section 194-IB.
                </p>
                <p style={{ ...pS, margin: 0 }}>
                  This affects the net rental income NRI property investors actually receive. A lower TDS rate is possible only with a valid Section 197 certificate or applicable DTAA relief, which the NRI landlord must arrange in advance.
                </p>
              </div>

              <div style={sec}>
                <h2 id="how-to-use" style={h2S}>How to Use This Calculator</h2>
                <ol style={{ paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, margin: 0, listStyleType: 'decimal' }}>
                  {[
                    ['Enter the property purchase price', 'include stamp duty and registration for accuracy.'],
                    ['Enter the monthly rent', 'use current rent received or expected rent for a planned purchase.'],
                    ['Set the holding period', 'the number of years before you plan to sell.'],
                    ['Click "More Settings"', 'to adjust annual appreciation %, annual costs %, and inflation rate.'],
                    ['Read the results', 'gross yield, net yield, exit value, total ROI, CAGR, and real return update instantly. The donut shows how much of total profit comes from capital gain vs rental income.'],
                  ].map(([label, body], i) => (
                    <li key={i} style={{ fontSize: 15, color: C.ink2, lineHeight: 1.65 }}>
                      <strong style={{ color: C.ink }}>{label}:</strong> {body}
                    </li>
                  ))}
                </ol>
              </div>

              

              <div style={sec} id="faq">
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQ faqs={faqs} />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only and assume constant rent, appreciation, and inflation rates over the holding period. Actual real estate returns vary by property type, location, and market cycle. Capital gains tax treatment depends on your total income and applicable Budget year rules. This calculator is for educational and planning purposes only and does not constitute financial or investment advice. Consult a registered investment adviser or RERA-registered agent before making property investment decisions. 
                </p>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <aside
            className="rr-sidebar"
            aria-label="Related calculators"
            style={{
              position: mobile ? 'static' : 'sticky',
              top: 20,
              alignSelf: 'start',
              maxHeight: mobile ? 'none' : 'calc(100vh - 40px)',
              overflowY: mobile ? 'visible' : 'auto',
              paddingRight: mobile ? 0 : 2,
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            } as React.CSSProperties}
          >
            <div style={{ flexShrink: 0 }}><PropertySnapshot /></div>
            <nav aria-label="Popular calculators" style={{ flexShrink: 0 }}>
              <SidebarList title="Popular Calculators" items={POPULAR} />
            </nav>
            <nav aria-label="More calculators" style={{ flexShrink: 0 }}>
              <SidebarList title="More Tools" items={MORE} />
            </nav>
            <div style={{ flexShrink: 0 }}><RelatedReads /></div>
          </aside>
        </div>
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

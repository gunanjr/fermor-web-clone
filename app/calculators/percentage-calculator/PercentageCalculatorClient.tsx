'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { FAQBox } from '@/components/common/FAQBox';

const C = {
  dark: '#101214', lime: '#a6dbc4', lime2: '#2d9970', paleLime: '#f4f5f6',
  ink: '#16140F', ink2: '#50565c', ink3: '#7a8087', white: '#ffffff',
  bg: '#f6f7f8', border: '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

type Mode = 'pctOf' | 'whatPct' | 'findWhole' | 'increase' | 'reverse' | 'diff' | 'change';

function Slider({ label, value, min, max, step, fmt, onChange, compact, id }: {
  label: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void; compact?: boolean; id?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = ((value - min) / (max - min)) * 100;
  const inputId = id || label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.-]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 30 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 14 }}>
        <label htmlFor={inputId} style={{ fontSize: compact ? 13.5 : 14, color: C.ink2, fontWeight: 400 }}>{label}</label>
        {editing ? (
          <input id={inputId} autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            aria-label={`Enter ${label} value`}
            style={{ fontSize: 14, fontWeight: 600, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 7, padding: compact ? '6px 10px' : '7px 12px', width: 120, outline: 'none', color: C.ink, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${fmt(value)}. Click to edit.`}
            style={{ fontSize: compact ? 13 : 14, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: compact ? '5px 12px' : '6px 14px', cursor: 'pointer', fontFamily: INTER, minWidth: compact ? 88 : 105, textAlign: 'center', transition: 'border-color 0.15s' }}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}>
            {fmt(value)}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 18, height: 18, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 1px 6px rgba(16,18,20,0.18)', pointerEvents: 'none', zIndex: 1 }} />
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(+e.target.value)}
          aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">{fmt(min)}</span>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">{fmt(max)}</span>
      </div>
    </div>
  );
}

function DonutChart({ part, whole }: { part: number; whole: number }) {
  const pctVal = whole === 0 ? 0 : Math.min(100, Math.max(0, (part / whole) * 100));
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const pArc = (pctVal / 100) * circ;
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Result: ${pctVal.toFixed(1)}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Result</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pctVal.toFixed(1)}%</text>
    </svg>
  );
}

function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <div style={{ padding: '14px 20px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 13.5, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ padding: '12px 20px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 13.5, color: C.ink2, transition: 'all 0.12s' }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = C.paleLime; (e.currentTarget as HTMLElement).style.color = C.dark; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink2; }}>
            {label}
          </div>
        </Link>
      ))}
    </nav>
  );
}

const POPULAR = [
  { href: '/calculators/cagr-calculator', label: 'CAGR Calculator' },
  { href: '/calculators/sip-calculator', label: 'SIP Calculator' },
  { href: '/calculators/gst-calculator', label: 'GST Calculator' },
  { href: '/calculators/compound-interest-calculator', label: 'Compound Interest Calculator' },
  { href: '/calculators/fd-calculator', label: 'FD Calculator' },
  { href: '/calculators/income-tax-calculator', label: 'Income Tax Calculator' },
  { href: '/calculators/emi-calculator', label: 'EMI Calculator' },
];
const MORE = [
  { href: '/calculators/lumpsum-calculator', label: 'Lumpsum Calculator' },
  { href: '/calculators/swp-calculator', label: 'SWP Calculator' },
  { href: '/calculators/home-loan-calculator', label: 'Home Loan EMI Calculator' },
  { href: '/calculators/mortgage-calculator', label: 'Mortgage Calculator' },
  { href: '/calculators/gratuity-calculator', label: 'Gratuity Calculator' },
];

const FAQS = [
  {
    q: 'How do you calculate a percentage of a number?',
    a: 'Multiply the number by the percentage and divide by 100. For example, 15% of 200 = (15 x 200) / 100 = 30. In decimal form, this is 0.15 x 200 = 30. This is the most fundamental percentage operation and applies to computing GST on bills, finding commissions, and estimating returns.',
  },
  {
    q: 'How do you find what percent one number is of another?',
    a: 'Divide the part by the whole and multiply by 100. For example, if you scored 340 out of 500 in an exam: (340 / 500) x 100 = 68%. This method is used for portfolio allocation analysis, budget utilisation tracking, and scoring percentages.',
  },
  {
    q: 'How do you calculate percentage increase?',
    a: 'Percentage increase = ((New Value - Original Value) / Original Value) x 100. If your salary rises from 50,000 to 60,000: ((60,000 - 50,000) / 50,000) x 100 = 20% increase. This calculation is standard for salary hike analysis, investment return measurement, and GDP growth reporting.',
  },
  {
    q: 'How do you calculate percentage decrease?',
    a: 'Percentage decrease = ((Original Value - New Value) / Original Value) x 100. If a stock falls from 1,200 to 960: ((1,200 - 960) / 1,200) x 100 = 20% decrease. Note that a 20% decrease from 1,200 does not return to the original with a 20% increase: 960 x 1.20 = 1,152, not 1,200. This asymmetry is why the reverse percentage calculation matters.',
  },
  {
    q: 'What is the difference between percentage change and percentage difference?',
    a: 'Percentage change measures growth or decline relative to a starting value: ((New - Old) / Old) x 100. It is directional: up or down. Percentage difference measures the gap relative to the average of two values: |V1 - V2| / ((V1 + V2)/2) x 100. It is symmetric: the result is the same regardless of which value you call first. Use change when comparing growth over time; use difference when comparing two options.',
  },
  {
    q: 'How do you reverse a percentage increase to find the original value?',
    a: 'Divide the new value by (1 + percentage/100). For example, if 250 is 25% more than the original: 250 / 1.25 = 200. The original value was 200. This is essential for understanding pre-GST prices, pre-discount prices, and pre-increase salary figures.',
  },
  {
    q: 'How is percentage used in Indian GST calculations?',
    a: 'GST rates in India are 5%, 12%, 18%, or 28% under the Goods and Services Tax regime. To find GST on a product priced at 1,000 at 18%: 1,000 x 0.18 = 180. Total price = 1,180. To extract the pre-GST price from an inclusive amount: 1,180 / 1.18 = 1,000. Use the GST Calculator for CGST, SGST, and IGST breakdowns.',
  },
  {
    q: 'How do you calculate discount percentage?',
    a: 'Discount % = ((Original Price - Sale Price) / Original Price) x 100. A shirt marked 2,000 sold for 1,400: ((2,000 - 1,400) / 2,000) x 100 = 30% discount. To find the sale price from a discount: Sale Price = Original x (1 - Discount/100). A 30% discount on 2,000 = 2,000 x 0.70 = 1,400.',
  },
  {
    q: 'What is percentage point vs percent difference?',
    a: 'A percentage point is the arithmetic difference between two percentages. If a mutual fund returned 12% last year and 15% this year, the return increased by 3 percentage points. The percentage increase in the return itself is ((15 - 12) / 12) x 100 = 25%. In RBI policy, when the repo rate moves from 6.50% to 6.25%, it is described as a 25 basis point cut (0.25 percentage points), not a 0.25% cut.',
  },
  {
    q: 'How do you calculate percentage from a fraction?',
    a: 'Multiply the fraction by 100. For example, 3/4 = 0.75 x 100 = 75%. To convert a percentage to a fraction: divide by 100 and simplify. 45% = 45/100 = 9/20. This conversion is useful for comparing exam scores, understanding investment ratios, and reading financial statements.',
  },
  {
    q: 'How do you calculate CAGR using percentages?',
    a: 'CAGR is a special type of percentage calculation that measures annualised growth: CAGR = ((Final Value / Initial Value)^(1/n) - 1) x 100, where n is the number of years. Use the CAGR Calculator for this computation, or the XIRR Calculator for SIPs with multiple cash flows.',
  },
  {
    q: 'Can a percentage be negative or greater than 100%?',
    a: 'Yes, both are mathematically valid. A negative percentage represents a decrease (a portfolio down 12% for the year), and a percentage over 100% simply means the new value is more than double the original (a stock up 150% has tripled). Neither case breaks the standard percentage formula, it only changes how the result should be read in context.',
  },
  {
    q: 'How do you calculate a percentage of a percentage?',
    a: 'Convert both percentages to decimals and multiply them, then convert back to a percentage. For example, 20% of 50% is 0.20 x 0.50 = 0.10, or 10%. This comes up when applying a discount on top of an already-discounted price, or calculating an effective tax rate after multiple deductions.',
  },
  {
    q: 'What is a weighted average percentage?',
    a: 'A weighted average percentage accounts for the size of each component, not just its individual rate. For a portfolio with 60% in an asset returning 10% and 40% in an asset returning 4%, the weighted average return is (0.60 x 10%) + (0.40 x 4%) = 7.6%, not the simple average of 7%. This is the correct way to combine returns, interest rates, or scores across unequal-sized groups.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
  },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

export default function PercentageCalculatorClient({ region = 'in' }: { region?: string }) {
  const defaultSettings = {
    mode: 'pctOf' as Mode,
    pctA: 15, numA: 200,
    partB: 30, wholeB: 200,
    partC: 30, pctC: 15,
    origD: 200, incD: 25,
    newE: 250, incE: 25,
    val1F: 10, val2F: 6,
    origG: 500, newG: 550,
  };
  const { settings, updateSettings } = useCalculatorSettings('percentage-calculator', defaultSettings);
  const { mode, pctA, numA, partB, wholeB, partC, pctC, origD, incD, newE, incE, val1F, val2F, origG, newG } = settings;
  const setMode = (v: any) => updateSettings({ mode: typeof v === 'function' ? v(settings.mode) : v });
  const setPctA = (v: any) => updateSettings({ pctA: typeof v === 'function' ? v(settings.pctA) : v });
  const setNumA = (v: any) => updateSettings({ numA: typeof v === 'function' ? v(settings.numA) : v });
  const setPartB = (v: any) => updateSettings({ partB: typeof v === 'function' ? v(settings.partB) : v });
  const setWholeB = (v: any) => updateSettings({ wholeB: typeof v === 'function' ? v(settings.wholeB) : v });
  const setPartC = (v: any) => updateSettings({ partC: typeof v === 'function' ? v(settings.partC) : v });
  const setPctC = (v: any) => updateSettings({ pctC: typeof v === 'function' ? v(settings.pctC) : v });
  const setOrigD = (v: any) => updateSettings({ origD: typeof v === 'function' ? v(settings.origD) : v });
  const setIncD = (v: any) => updateSettings({ incD: typeof v === 'function' ? v(settings.incD) : v });
  const setNewE = (v: any) => updateSettings({ newE: typeof v === 'function' ? v(settings.newE) : v });
  const setIncE = (v: any) => updateSettings({ incE: typeof v === 'function' ? v(settings.incE) : v });
  const setVal1F = (v: any) => updateSettings({ val1F: typeof v === 'function' ? v(settings.val1F) : v });
  const setVal2F = (v: any) => updateSettings({ val2F: typeof v === 'function' ? v(settings.val2F) : v });
  const setOrigG = (v: any) => updateSettings({ origG: typeof v === 'function' ? v(settings.origG) : v });
  const setNewG = (v: any) => updateSettings({ newG: typeof v === 'function' ? v(settings.newG) : v });

  const [mobile, setMobile] = useState(false);
  const [showRef, setShowRef] = useState(false);
  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const resA = useMemo(() => (pctA / 100) * numA, [pctA, numA]);
  const resB = useMemo(() => wholeB > 0 ? (partB / wholeB) * 100 : 0, [partB, wholeB]);
  const resC = useMemo(() => pctC > 0 ? partC / (pctC / 100) : 0, [partC, pctC]);
  const resD = useMemo(() => origD * (1 + incD / 100), [origD, incD]);
  const resE = useMemo(() => newE / (1 + incE / 100), [newE, incE]);
  const resF = useMemo(() => {
    const avg = (val1F + val2F) / 2;
    return avg > 0 ? (Math.abs(val1F - val2F) / avg) * 100 : 0;
  }, [val1F, val2F]);
  const resG = useMemo(() => origG > 0 ? ((newG - origG) / origG) * 100 : 0, [origG, newG]);

  const fmt = (v: number) => v % 1 === 0 ? String(v) : v.toFixed(2);

  const tabs = [
    { id: 'pctOf' as Mode, label: '% of Number' },
    { id: 'whatPct' as Mode, label: 'What Percent' },
    { id: 'findWhole' as Mode, label: 'Find Whole' },
    { id: 'increase' as Mode, label: 'Increase %' },
    { id: 'reverse' as Mode, label: 'Reverse %' },
    { id: 'diff' as Mode, label: '% Difference' },
    { id: 'change' as Mode, label: '% Change' },
  ];

  const h2 = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const h3 = { fontSize: 15.5, fontWeight: 600, color: C.ink, margin: '0 0 6px' } as React.CSSProperties;
  const p = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } as React.CSSProperties;
  const bul = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Percentage Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Find percentages, calculate changes, reverse percentages, and compare values. Instant results with seven calculation modes.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="Percentage Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div role="tabpanel" id={`panel-${mode}`} style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  <div style={{ marginBottom: 28 }}>
                    <label htmlFor="pct-mode" style={{ fontSize: mobile ? 13.5 : 14, color: C.ink2, fontWeight: 400, display: 'block', marginBottom: 10 }}>Calculation Mode</label>
                    <div style={{ position: 'relative' }}>
                      <select id="pct-mode" value={mode} onChange={e => setMode(e.target.value as Mode)}
                        style={{
                          width: '100%', appearance: 'none', fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.ink,
                          background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8,
                          padding: mobile ? '10px 36px 10px 14px' : '12px 40px 12px 16px',
                          cursor: 'pointer', fontFamily: INTER, outline: 'none',
                        }}>
                        {tabs.map(tab => <option key={tab.id} value={tab.id}>{tab.label}</option>)}
                      </select>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>

                  {mode === 'pctOf' && <>
                    <Slider label="Percentage" id="pct-pct" value={pctA} min={0} max={100} step={0.5} fmt={v => `${v}%`} onChange={setPctA} compact={mobile} />
                    <Slider label="Of Number" id="pct-num" value={numA} min={0} max={100000} step={100} fmt={fmtC} onChange={setNumA} compact={mobile} />
                  </>}

                  {mode === 'whatPct' && <>
                    <Slider label="Part Value" id="wp-part" value={partB} min={0} max={100000} step={100} fmt={fmtC} onChange={setPartB} compact={mobile} />
                    <Slider label="Whole Value" id="wp-whole" value={wholeB} min={1} max={100000} step={100} fmt={fmtC} onChange={setWholeB} compact={mobile} />
                  </>}

                  {mode === 'findWhole' && <>
                    <Slider label="Part Value" id="fw-part" value={partC} min={0} max={100000} step={100} fmt={fmtC} onChange={setPartC} compact={mobile} />
                    <Slider label="Percentage" id="fw-pct" value={pctC} min={0.1} max={100} step={0.5} fmt={v => `${v}%`} onChange={setPctC} compact={mobile} />
                  </>}

                  {mode === 'increase' && <>
                    <Slider label="Original Value" id="inc-orig" value={origD} min={0} max={100000} step={100} fmt={fmtC} onChange={setOrigD} compact={mobile} />
                    <Slider label="Increase by" id="inc-pct" value={incD} min={-100} max={500} step={0.5} fmt={v => `${v}%`} onChange={setIncD} compact={mobile} />
                  </>}

                  {mode === 'reverse' && <>
                    <Slider label="New Value" id="rev-new" value={newE} min={0} max={100000} step={100} fmt={fmtC} onChange={setNewE} compact={mobile} />
                    <Slider label="Increase %" id="rev-pct" value={incE} min={-100} max={500} step={0.5} fmt={v => `${v}%`} onChange={setIncE} compact={mobile} />
                  </>}

                  {mode === 'diff' && <>
                    <Slider label="Value 1" id="diff-v1" value={val1F} min={0} max={100000} step={100} fmt={fmtC} onChange={setVal1F} compact={mobile} />
                    <Slider label="Value 2" id="diff-v2" value={val2F} min={0} max={100000} step={100} fmt={fmtC} onChange={setVal2F} compact={mobile} />
                  </>}

                  {mode === 'change' && <>
                    <Slider label="Original Value" id="chg-orig" value={origG} min={0} max={100000} step={100} fmt={fmtC} onChange={setOrigG} compact={mobile} />
                    <Slider label="New Value" id="chg-new" value={newG} min={0} max={100000} step={100} fmt={fmtC} onChange={setNewG} compact={mobile} />
                  </>}
                </div>

                {/* Result panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {mode === 'pctOf' && (
                    <>
                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Result</span>
                        <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                          aria-live="polite" aria-label={`Result: ${fmt(resA)}`}>
                          {fmt(resA)}
                        </span>
                      </div>
                      {[
                        { label: 'Percentage', value: `${pctA}%` },
                        { label: 'Of Number', value: fmtC(numA) },
                        { label: 'Remaining', value: fmtC(numA - resA) },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                        </div>
                      ))}
                      <div style={{ width: '100%', marginTop: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                          <span style={{ fontSize: 12, color: C.ink3 }}>Result {numA > 0 ? Math.round((resA / numA) * 100) : 0}%</span>
                          <span style={{ fontSize: 12, color: C.ink3 }}>Remaining {numA > 0 ? 100 - Math.round((resA / numA) * 100) : 0}%</span>
                        </div>
                        <div style={{ height: 6, borderRadius: 99, background: C.lime2, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${numA > 0 ? Math.min(100, (resA / numA) * 100) : 0}%`, background: C.dark, borderRadius: 99, transition: 'width 0.4s ease' }} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                        <DonutChart part={resA} whole={numA} />
                      </div>
                    </>
                  )}

                  {mode === 'whatPct' && (
                    <>
                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Percentage</span>
                        <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                          aria-live="polite" aria-label={`Result: ${resB.toFixed(2)}%`}>
                          {resB.toFixed(2)}%
                        </span>
                      </div>
                      {[
                        { label: 'Part', value: fmtC(partB) },
                        { label: 'Whole', value: fmtC(wholeB) },
                        { label: 'Remaining', value: fmtC(wholeB - partB) },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                        </div>
                      ))}
                      <div style={{ width: '100%', marginTop: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                          <span style={{ fontSize: 12, color: C.ink3 }}>Part {wholeB > 0 ? Math.round((partB / wholeB) * 100) : 0}%</span>
                          <span style={{ fontSize: 12, color: C.ink3 }}>Remaining {wholeB > 0 ? 100 - Math.round((partB / wholeB) * 100) : 0}%</span>
                        </div>
                        <div style={{ height: 6, borderRadius: 99, background: C.lime2, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${wholeB > 0 ? Math.min(100, (partB / wholeB) * 100) : 0}%`, background: C.dark, borderRadius: 99, transition: 'width 0.4s ease' }} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                        <DonutChart part={partB} whole={wholeB} />
                      </div>
                    </>
                  )}

                  {mode === 'findWhole' && (
                    <>
                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Whole Value</span>
                        <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                          aria-live="polite" aria-label={`Result: ${fmt(resC)}`}>
                          {fmt(resC)}
                        </span>
                      </div>
                      {[
                        { label: 'Part', value: fmtC(partC) },
                        { label: 'Percentage', value: `${pctC}%` },
                        { label: 'Remaining', value: fmtC(resC - partC) },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                        </div>
                      ))}
                      <div style={{ width: '100%', marginTop: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                          <span style={{ fontSize: 12, color: C.ink3 }}>Part {pctC}%</span>
                          <span style={{ fontSize: 12, color: C.ink3 }}>Remaining {100 - pctC}%</span>
                        </div>
                        <div style={{ height: 6, borderRadius: 99, background: C.lime2, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${Math.min(100, pctC)}%`, background: C.dark, borderRadius: 99, transition: 'width 0.4s ease' }} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                        <DonutChart part={pctC} whole={100} />
                      </div>
                    </>
                  )}

                  {mode === 'increase' && (
                    <>
                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>New Value</span>
                        <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                          aria-live="polite" aria-label={`Result: ${fmt(resD)}`}>
                          {fmt(resD)}
                        </span>
                      </div>
                      {[
                        { label: 'Original', value: fmtC(origD) },
                        { label: 'Increase', value: `${incD}%` },
                        { label: 'Difference', value: fmtC(resD - origD) },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                        </div>
                      ))}
                      <div style={{ width: '100%', marginTop: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                          <span style={{ fontSize: 12, color: C.ink3 }}>Original {resD > 0 ? Math.round((origD / resD) * 100) : 0}%</span>
                          <span style={{ fontSize: 12, color: C.ink3 }}>Added {resD > 0 ? 100 - Math.round((origD / resD) * 100) : 0}%</span>
                        </div>
                        <div style={{ height: 6, borderRadius: 99, background: C.lime2, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${resD > 0 ? Math.min(100, (origD / resD) * 100) : 0}%`, background: C.dark, borderRadius: 99, transition: 'width 0.4s ease' }} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                        <DonutChart part={resD} whole={resD} />
                      </div>
                    </>
                  )}

                  {mode === 'reverse' && (
                    <>
                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Original Value</span>
                        <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                          aria-live="polite" aria-label={`Result: ${fmt(resE)}`}>
                          {fmt(resE)}
                        </span>
                      </div>
                      {[
                        { label: 'New value', value: fmtC(newE) },
                        { label: 'Increase %', value: `${incE}%` },
                        { label: 'Difference', value: fmtC(newE - resE) },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                        </div>
                      ))}
                      <div style={{ width: '100%', marginTop: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                          <span style={{ fontSize: 12, color: C.ink3 }}>Original {newE > 0 ? Math.round((resE / newE) * 100) : 0}%</span>
                          <span style={{ fontSize: 12, color: C.ink3 }}>Added {newE > 0 ? 100 - Math.round((resE / newE) * 100) : 0}%</span>
                        </div>
                        <div style={{ height: 6, borderRadius: 99, background: C.lime2, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${newE > 0 ? Math.min(100, (resE / newE) * 100) : 0}%`, background: C.dark, borderRadius: 99, transition: 'width 0.4s ease' }} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                        <DonutChart part={resE} whole={newE} />
                      </div>
                    </>
                  )}

                  {mode === 'diff' && (
                    <>
                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Percentage Difference</span>
                        <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                          aria-live="polite" aria-label={`Result: ${resF.toFixed(2)}%`}>
                          {resF.toFixed(2)}%
                        </span>
                      </div>
                      {[
                        { label: 'Value 1', value: fmtC(val1F) },
                        { label: 'Value 2', value: fmtC(val2F) },
                        { label: 'Absolute gap', value: fmtC(Math.abs(val1F - val2F)) },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                        </div>
                      ))}
                      <div style={{ width: '100%', marginTop: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                          <span style={{ fontSize: 12, color: C.ink3 }}>Value 1 {(val1F + val2F) > 0 ? Math.round((val1F / (val1F + val2F)) * 100) : 0}%</span>
                          <span style={{ fontSize: 12, color: C.ink3 }}>Value 2 {(val1F + val2F) > 0 ? 100 - Math.round((val1F / (val1F + val2F)) * 100) : 0}%</span>
                        </div>
                        <div style={{ height: 6, borderRadius: 99, background: C.lime2, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${(val1F + val2F) > 0 ? Math.min(100, (val1F / (val1F + val2F)) * 100) : 0}%`, background: C.dark, borderRadius: 99, transition: 'width 0.4s ease' }} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                        <DonutChart part={Math.abs(val1F - val2F)} whole={(val1F + val2F) / 2} />
                      </div>
                    </>
                  )}

                  {mode === 'change' && (
                    <>
                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Percentage Change</span>
                        <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                          aria-live="polite" aria-label={`Result: ${resG >= 0 ? '+' : ''}${resG.toFixed(2)}%`}>
                          {resG >= 0 ? '+' : ''}{resG.toFixed(2)}%
                        </span>
                      </div>
                      {[
                        { label: 'Original', value: fmtC(origG) },
                        { label: 'New', value: fmtC(newG) },
                        { label: 'Change', value: `${resG >= 0 ? '+' : ''}${fmtC(newG - origG)}` },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                        </div>
                      ))}
                      <div style={{ width: '100%', marginTop: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                          <span style={{ fontSize: 12, color: C.ink3 }}>Original {Math.max(origG, newG) > 0 ? Math.round((Math.min(origG, newG) / Math.max(origG, newG)) * 100) : 0}%</span>
                          <span style={{ fontSize: 12, color: C.ink3 }}>{resG >= 0 ? 'Increase' : 'Decrease'} {Math.max(origG, newG) > 0 ? 100 - Math.round((Math.min(origG, newG) / Math.max(origG, newG)) * 100) : 0}%</span>
                        </div>
                        <div style={{ height: 6, borderRadius: 99, background: C.lime2, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${Math.max(origG, newG) > 0 ? Math.min(100, (Math.min(origG, newG) / Math.max(origG, newG)) * 100) : 0}%`, background: C.dark, borderRadius: 99, transition: 'width 0.4s ease' }} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                        <DonutChart part={Math.abs(newG - origG)} whole={Math.max(origG, newG)} />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Reference table toggle */}
              <div id="reference-table" style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowRef(v => !v)} aria-expanded={showRef} aria-controls="pct-reference-panel"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '20px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.ink }}>Common Percentages in Indian Finance</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 8 : 12, flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      aria-hidden="true" style={{ transform: showRef ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {showRef && (
                  <div id="pct-reference-panel" style={{ borderTop: `1px solid ${C.border}`, overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <thead>
                        <tr style={{ background: '#f4f5f6' }}>
                          <th style={thS}>Context</th>
                          <th style={thS}>Percentage</th>
                          <th style={thS}>Source</th>
                        </tr>
                      </thead>
                      <tbody>
                        {([
                          ['PPF interest rate', '7.1% p.a.', 'Government of India', null],
                          ['EPF interest rate', '8.25% p.a.', 'EPFO', 'https://www.epfindia.gov.in'],
                          ['GST (standard)', '18%', 'CBIC', null],
                          ['LTCG tax on equities', '10% above 1L', 'Income Tax Act', null],
                          ['STCG tax on equities', '15%', 'Income Tax Act', null],
                          ['Nifty 50 (10-year CAGR)', '~11.5 to 13%', 'NSE India', 'https://www.nseindia.com'],
                          ['Bank FD rate (5yr)', '6.5 to 7.5%', 'RBI', 'https://www.rbi.org.in'],
                          ['Home loan rate', '8.25 to 9.5%', 'RBI', 'https://www.rbi.org.in'],
                          ['EPF contribution', '12% of basic', 'EPFO', 'https://www.epfindia.gov.in'],
                          ['Professional Tax (max)', '2.5%', 'State governments', null],
                        ] as [string, string, string, string | null][]).map(([ctx, pct, src, href], i) => (
                          <tr key={i} style={{ borderTop: i === 0 ? 'none' : `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={tdL}>{ctx}</td>
                            <td style={{ ...tdR, fontWeight: 700 }}>{pct}</td>
                            <td style={tdL}>
                              {href ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>{src}</a> : src}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p style={{ fontSize: 12.5, color: C.ink3, lineHeight: 1.6, padding: mobile ? '14px 20px' : '16px 44px', margin: 0, borderTop: `1px solid ${C.border}` }}>
                      These are reference figures, not live data, and can go stale as rates change. Each linked source (RBI, EPFO, NSE) takes you to the body that actually sets or publishes that rate, so you can check the current number directly rather than trust a number frozen on this page.
                    </p>
                  </div>
                )}
              </div>
            </section>

            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>
              {/* 1 */}
              <div style={sec}>
                <h2 style={h2} id="what-is-percentage">What Is a Percentage?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    A percentage is a dimensionless ratio expressed as a fraction of 100, denoted by the % symbol. From the Latin <em>per centum</em> (&quot;by the hundred&quot;), it is the standard convention for expressing proportional relationships across finance, commerce, and statistics.
                  </p>
                </div>
                <p style={p}>
                  Mathematically, 45% = 45/100 = 0.45. In India, percentages govern virtually every financial instrument: PPF earns 7.1% per annum, equity mutual funds target 12 to 15% CAGR, GST is levied at 5%, 12%, 18%, or 28%, and home loan rates fluctuate by basis points (1 bps = 0.01%).
                </p>
                <p style={p}>
                  Proficiency with percentages is not optional for financial decision-making. It is prerequisite. Whether you are evaluating a salary hike, comparing FD rates, or reading a company&apos;s quarterly earnings report, percentage literacy determines how quickly and accurately you can make decisions.
                </p>
              </div>

              {/* 2 */}
              <div style={sec}>
                <h2 style={h2} id="percentage-formula">The Percentage Formula</h2>
                <p style={p}>
                  Every percentage problem reduces to the same relationship: <strong>P x V1 = V2</strong>, where P is the percentage in decimal form, V1 is the base value, and V2 is the result. Rearranging gives three solved forms:
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                      <tr style={{ background: '#f4f5f6' }}>
                        <th style={thS}>Operation</th>
                        <th style={thS}>Formula</th>
                        <th style={thS}>Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={tdL}>Find the result</td>
                        <td style={tdL}>V2 = P x V1</td>
                        <td style={tdR}>15% of 200 = 0.15 x 200 = 30</td>
                      </tr>
                      <tr>
                        <td style={tdL}>Find the percentage</td>
                        <td style={tdL}>P = V2 / V1 x 100</td>
                        <td style={tdR}>30 is (30/200) x 100 = 15%</td>
                      </tr>
                      <tr>
                        <td style={tdL}>Find the base</td>
                        <td style={tdL}>V1 = V2 / P</td>
                        <td style={tdR}>30 is 15% of 30/0.15 = 200</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The calculator above handles all three rearrangements across seven different modes. Each mode solves for a different unknown while the others are entered.
                </p>
              </div>

              {/* 3 */}
              <div style={sec}>
                <h2 style={h2} id="percentage-change-vs-difference">Percentage Change vs. Percentage Difference</h2>
                <p style={p}>
                  These two metrics are frequently confused but serve different analytical purposes. <strong>Percentage change</strong> measures directional growth or decline relative to a baseline: Change = ((New - Original) / Original) x 100. A Nifty move from 25,000 to 27,500 is a 10% increase; the reverse move is a 9.09% decrease.
                </p>
                <p style={p}>
                  <strong>Percentage difference</strong> measures the absolute gap relative to the average of two values: Difference = |V1 - V2| / ((V1 + V2)/2) x 100. It is symmetric and directionless: the difference between 10 and 6 is 50% irrespective of order. Use change for growth metrics; use difference for symmetric comparisons.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                      <tr style={{ background: '#f4f5f6' }}>
                        <th style={thS}>Scenario</th>
                        <th style={thS}>Correct Metric</th>
                        <th style={thS}>Formula</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={tdL}>Salary increased from 50K to 60K</td>
                        <td style={tdL}>Percentage Change</td>
                        <td style={tdR}>((60K - 50K) / 50K) x 100 = 20%</td>
                      </tr>
                      <tr>
                        <td style={tdL}>Comparing two funds: 12% and 15% return</td>
                        <td style={tdL}>Percentage Difference</td>
                        <td style={tdR}>|12 - 15| / ((12+15)/2) x 100 = 22.2%</td>
                      </tr>
                      <tr>
                        <td style={tdL}>Stock fell from 1200 to 960</td>
                        <td style={tdL}>Percentage Change (decrease)</td>
                        <td style={tdR}>((1200 - 960) / 1200) x 100 = 20%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 4 */}
              <div style={sec}>
                <h2 style={h2} id="gst-percentage">Percentage in GST Calculations</h2>
                <p style={p}>
                  India&apos;s Goods and Services Tax uses four primary slabs: 5%, 12%, 18%, and 28%. Calculating GST on a product requires finding the percentage of the base price and adding it. A product priced at 1,000 at 18% GST costs 1,000 + (1,000 x 0.18) = 1,180.
                </p>
                <p style={p}>
                  The reverse calculation is equally common: extracting the pre-GST price from an inclusive amount. If a restaurant bill shows 1,180 and you know GST is 18%, the food cost is 1,180 / 1.18 = 1,000. For CGST/SGST split: the 18% is divided equally (9% CGST + 9% SGST for intra-state transactions). Use the <Link href="/calculators/gst-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>GST Calculator</Link> for complete CGST, SGST, and IGST breakdowns.
                </p>
              </div>

              {/* 5 */}
              <div style={sec}>
                <h2 style={h2} id="discount-percentage">Discount and Markup Percentages</h2>
                <p style={p}>
                  A discount percentage is the reduction from the original price expressed as a percentage. A product marked 2,000 and sold for 1,400 carries a ((2,000 - 1,400) / 2,000) x 100 = 30% discount. The sale price is 2,000 x (1 - 0.30) = 1,400.
                </p>
                <p style={p}>
                  Markups work in the opposite direction: a 30% markup on a cost of 1,400 means selling price = 1,400 x 1.30 = 1,820. Note that a 30% discount on 2,000 (selling at 1,400) and a 30% markup on 1,400 (selling at 1,820) produce different prices. The base matters. This asymmetry is why businesses track both discount percentages and markup percentages separately.
                </p>
              </div>

              {/* 6 */}
              <div style={sec}>
                <h2 style={h2} id="percentage-point">Percentage Points vs. Percent</h2>
                <p style={p}>
                  A percentage point is the arithmetic difference between two percentages. When the RBI cuts the repo rate from 6.50% to 6.25%, it is a 25 basis point cut (0.25 percentage points), not a 0.25% cut. The percentage change in the rate itself is ((6.50 - 6.25) / 6.50) x 100 = 3.85%.
                </p>
                <p style={p}>
                  This distinction matters in finance: if a mutual fund returned 12% last year and 15% this year, its return increased by 3 percentage points, but the year-on-year improvement is 25%. Conflating the two leads to misinterpretation of performance data, interest rate movements, and tax rate changes.
                </p>
              </div>

              {/* 7 */}
              <div style={sec}>
                <h2 style={h2} id="common-percentages">Common Percentages in Indian Finance</h2>
                <p style={{ ...p, margin: 0 }}>
                  These are the percentages that show up most often in Indian personal finance, from PPF and EPF interest rates to GST and capital gains tax. Expand the <strong style={{ color: C.ink }}>Common Percentages in Indian Finance</strong> section at the bottom of the calculator above for the full reference table, each rate linked to its official source (RBI, EPFO, NSE, SEBI, AMFI) where one applies.
                </p>
              </div>

              {/* 7b */}
              <div style={sec}>
                <h2 style={h2} id="percentage-ratios">Percentage ratios every investor should track</h2>
                <p style={p}>
                  Beyond one-off calculations, a handful of percentage-based ratios are worth checking on a regular basis, since each one flags a different kind of financial risk.
                </p>
                <h3 style={h3}>Savings rate</h3>
                <p style={p}>
                  Savings Rate = (Income - Expenses) / Income x 100. A savings rate below 20% for a working professional is usually a sign that expenses need a closer look, not just income growth.
                </p>
                <h3 style={h3}>Debt-to-income ratio</h3>
                <p style={p}>
                  Debt-to-Income = Total Monthly EMIs / Monthly Income x 100. Most Indian lenders cap this around 40 to 50% when approving a new loan; a higher ratio reduces how much additional credit you can get approved for.
                </p>
                <h3 style={h3}>Expense ratio (mutual funds)</h3>
                <p style={{ ...p, margin: 0 }}>
                  Expense Ratio is the percentage of a mutual fund's assets deducted annually to cover fund management costs. A 1% difference in expense ratio compounds meaningfully over a long holding period, which is why it is worth checking before comparing two funds on returns alone. Model the long-term impact on the <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SIP Calculator</Link>.
                </p>
              </div>

              {/* 8 */}
              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This Percentage Calculator</h2>
                <p style={p}>Seven calculation modes cover every common percentage operation:</p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>% of Number:</strong> enter a percentage and a base number. The calculator returns the percentage value and the remaining amount.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>What Percent:</strong> enter a part and a whole. The calculator returns what percentage the part is of the whole.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Find Whole:</strong> enter a known part and its percentage. The calculator returns the total whole value.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Increase %:</strong> enter an original value and a percentage increase. The calculator returns the new value after the increase.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Reverse %:</strong> enter the new value and the percentage increase that was applied. The calculator returns the original value before the increase.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>% Difference:</strong> enter two values. The calculator returns the symmetric percentage gap between them.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>% Change:</strong> enter an original and a new value. The calculator returns the directional percentage change (positive or negative).
                  </li>
                </ol>
                <p style={{ ...p, margin: 0 }}>
                  Click any input value to type a precise number. The currency selector converts all displayed amounts to USD, EUR, GBP, or other currencies. Useful for NRI investors who want to see values in their resident country&apos;s currency.
                </p>
              </div>

              

              {/* FAQ */}
              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              {/* Disclaimer */}
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only. This calculator is for educational and general informational purposes and does not constitute financial advice. Verify all calculations independently before making financial decisions. Consult a SEBI-registered investment adviser before making investment decisions.
                </p>
              </div>
            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.pct-sidebar::-webkit-scrollbar{width:5px}.pct-sidebar::-webkit-scrollbar-track{background:transparent}.pct-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.pct-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="pct-sidebar" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <SidebarList title="Popular Calculators" items={POPULAR} />
              <SidebarList title="More Calculators" items={MORE} />
            </div>
          </aside>
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/percentage-calculator|%', '/calculators/gst-calculator|GST', '/calculators/loan-calculator|Loan', '/calculators/sip-calculator|SIP', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/swp-calculator|SWP', '/calculators/emi-calculator|EMI', '/calculators/home-loan-calculator|Home Loan', '/calculators/mortgage-calculator|Mortgage', '/calculators/car-loan-calculator|Car Loan', '/calculators/fd-calculator|FD', '/calculators/compound-interest-calculator|Compound Int.', '/calculators/gratuity-calculator|Gratuity'] },
        { hd: 'Topics', links: ['/#|Mutual Funds', '/#|Home Loans', '/#|Fixed Deposits', '/#|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

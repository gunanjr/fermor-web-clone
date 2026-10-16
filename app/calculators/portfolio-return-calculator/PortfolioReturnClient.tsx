'use client';

import { seriesColor } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect, useCallback } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { PORTFOLIO_RETURN_FAQS } from './faqData';
import PortfolioReturnGuide from './PortfolioReturnGuide';
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
const SLICE_COLORS = Array.from({ length: 8 }, (_, i) => seriesColor(i));

const PRESET_NAMES = ['FD', 'Mutual Funds', 'Stocks', 'EPF', 'PPF', 'Real Estate', 'Gold', 'NPS'];

interface Investment {
  id: number;
  name: string;
  amount: number;
  returnRate: number;
}

function defaultInvestments(): Investment[] {
  return [
    { id: 1, name: 'FD', amount: 500000, returnRate: 7 },
    { id: 2, name: 'Mutual Funds', amount: 500000, returnRate: 12 },
  ];
}

function nextInvestmentId(investments: Investment[]) {
  return Math.max(0, ...investments.map(investment => investment.id)) + 1;
}

/* Slider */
function Slider({ label, value, min, max, step, fmt, onChange, compact, id }: {
  label: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void; compact?: boolean; id?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = ((value - min) / (max - min)) * 100;
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 36 }}>
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

/* ─── Donut (multi-segment) ──────────────────────────────────── */
function DonutChart({ entries }: { entries: { value: number; color: string }[] }) {
  const total = entries.reduce((s, e) => s + Math.abs(e.value), 0);
  if (total === 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  let cumulative = 0;
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label="Portfolio allocation by investment"
      style={{ display: 'block' }}>
      {entries.map((e, i) => {
        const segLen = (Math.abs(e.value) / total) * circ;
        const offset = circ / 4 - cumulative;
        cumulative += segLen;
        return (
          <circle key={i} cx={cx} cy={cy} r={R} fill="none" stroke={e.color} strokeWidth={sw}
            strokeDasharray={`${segLen} ${circ - segLen}`}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dasharray 0.4s ease' }} />
        );
      })}
      {/* inner label */}
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>
        {entries.length > 0 ? 'Total' : ''}
      </text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 24, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>
        {entries.length > 0 ? `${entries.length}` : '0'}
      </text>
      <text x={cx} y={cy + 34} textAnchor="middle" style={{ fontSize: 10, fill: C.ink3, fontFamily: INTER }}>
        {entries.length === 1 ? 'asset' : 'assets'}
      </text>
    </svg>
  );
}

/* ─── Sidebar list ───────────────────────────────────────────── */
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

function PromoBar({ href, name, blurb }: { href: string; name: string; blurb: string }) {
  return (
    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>{name}</p>
        <p style={{ fontSize: 13, color: C.ink2, margin: 0 }}>{blurb}</p>
      </div>
      <Link className="fx-btn" href={href} target="_blank" rel="noopener noreferrer" style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
        Open calculator
      </Link>
    </div>
  );
}

const POPULAR = [
  { href: '/calculators/xirr-calculator',                  label: 'XIRR Calculator' },
  { href: '/calculators/lumpsum-calculator',               label: 'Lumpsum Calculator' },
  { href: '/calculators/cagr-calculator',                  label: 'CAGR Calculator' },
  { href: '/calculators/rule-of-72-calculator',            label: 'Rule of 72 Calculator' },
  { href: '/calculators/compound-interest-calculator',     label: 'Compound Interest Calculator' },
  { href: '/calculators/real-return-calculator',           label: 'Real Return Calculator' },
  { href: '/calculators/investment-comparison-calculator', label: 'Investment Comparison' },
];
const MORE = [
  { href: '/calculators/sip-calculator',           label: 'SIP Calculator' },
  { href: '/calculators/fd-calculator',            label: 'FD Calculator' },
  { href: '/calculators/ppf-calculator',           label: 'PPF Calculator' },
  { href: '/calculators/retirement-calculator',    label: 'Retirement Calculator' },
  { href: '/calculators/wealth-growth-calculator', label: 'Wealth Growth Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What is portfolio return?',
    a: 'Portfolio return is the weighted average rate of return earned on a collection of investments. It combines the individual returns of each investment in proportion to their share of the total portfolio value. A portfolio with a large FD allocation earning 7% and a smaller equity allocation earning 15% will have a blended return somewhere between 7% and 15%, depending on the exact weights.',
  },
  {
    q: 'How to calculate weighted average portfolio return?',
    a: 'Multiply the amount invested in each asset by its return rate, sum all those values, then divide by the total amount invested. Example: FD of Rs 5 lakh at 7% returns Rs 35,000 and mutual funds of Rs 5 lakh at 12% returns Rs 60,000. Sum = Rs 95,000. Total invested = Rs 10,00,000. Portfolio return = 95,000 divided by 10,00,000 = 9.5%.',
  },
  {
    q: 'What is the portfolio return formula?',
    a: 'Portfolio Return = (w1 x r1) + (w2 x r2) + ... + (wn x rn), where wi is the weight of investment i (amount invested in i divided by total portfolio value) and ri is the return rate of investment i. Multiply by 100 to get a percentage. The formula is used by portfolio managers at SEBI-registered investment advisers across India to measure blended performance.',
  },
  {
    q: 'How do I calculate my total portfolio return with multiple investments?',
    a: 'Start by listing every investment you hold along with its current market value and individual return rate. Add up all the values to find your total portfolio value. For each investment, divide its value by the total to find its portfolio weight. Multiply each weight by the investment return rate and add all the results. This gives your blended weighted portfolio return.',
  },
  {
    q: 'What is a good portfolio return in India?',
    a: 'A conservative portfolio (70% fixed income, 30% equity) typically returns 8 to 10% annually. A balanced portfolio (50% fixed income, 50% equity) targets 10 to 12%. An aggressive portfolio (20% fixed income, 80% equity) aims for 12 to 15% or higher. The Nifty 50 has delivered approximately 12 to 13% CAGR over the past 10 years, according to NSE India data.',
  },
  {
    q: 'What is the difference between portfolio return and CAGR?',
    a: 'CAGR measures the annualised growth of a single investment from start to finish at a specific point in time. Portfolio return measures the blended weighted return of multiple investments. CAGR is a historical measure. Portfolio return can be either historical (based on actual trailing returns) or forward-looking (based on expected returns).',
  },
  {
    q: 'How does asset allocation affect portfolio return?',
    a: 'Asset allocation determines the majority of your portfolio return variability. Academic research shows that more than 90% of a portfolio return comes from the allocation decision, not from individual stock or fund selection. A portfolio skewed toward equity will have higher expected returns with higher volatility. A portfolio heavy on fixed income will have lower but more stable returns.',
  },
  {
    q: 'Can I use this calculator for mutual fund portfolio return?',
    a: 'Yes. Add each mutual fund scheme as a separate investment entry. Enter your current fund value and its trailing return from the AMFI fact sheet or your broker app. The calculator shows how each fund contributes to your overall portfolio weighted return. You can compare how your large-cap fund allocation affects total return versus your mid-cap allocation.',
  },
  {
    q: 'How do I find the return rate for each investment?',
    a: 'Use a return rate for the same period and on the same basis for every asset. For a review, use published trailing returns or account statements. For planning, enter assumptions you can explain and revisit; do not treat past performance as a forecast.',
  },
  {
    q: 'What types of investments can I add?',
    a: 'Up to 8 investments. Preset buttons cover FD, Mutual Funds, Stocks, EPF, PPF, Real Estate, Gold, and NPS. You can also type a custom name for any other investment type such as corporate bonds, debt funds, Sovereign Gold Bonds, ULIPs, cash equivalents, or any other asset you hold in your portfolio.',
  },
  {
    q: 'How does the contribution percentage work?',
    a: 'Contribution percentage shows how much each investment contributes to the total portfolio return. It is calculated as (investment amount x investment return rate) divided by total weighted return. An investment that makes up 30% of the portfolio value at 15% return contributes more to overall return than a 40% allocation at 6% return.',
  },
  {
    q: 'Should I use actual or expected returns in this calculator?',
    a: 'Use actual trailing returns for a backward-looking review of your current portfolio performance. Use conservative expected returns for forward-looking asset allocation planning. A common approach is to run the calculator both ways: once with actual returns to assess current performance, and once with expected returns to plan future allocation.',
  },
  {
    q: 'What happens if I add an investment with zero amount or zero return?',
    a: 'An investment with zero amount is excluded from the weighted return calculation because it contributes nothing to the total. An investment with a zero return rate still appears in the breakdown but contributes zero to the weighted return. You can remove an investment entirely using the remove button, or set its amount and return to see how various allocations affect your portfolio.',
  },
  {
    q: 'What is the maximum number of investments I can add?',
    a: 'You can add up to 8 investments. This covers the typical range of asset classes in an Indian individual portfolio: two to three mutual funds, one or two fixed income instruments, some direct stocks, EPF, PPF, gold, and possibly real estate or NPS. If you have more than 8, consider grouping similar assets together for a cleaner analysis.',
  },
];

function FAQ() {
  return <FAQBox items={PORTFOLIO_RETURN_FAQS} />;
}

/* ─── Main ───────────────────────────────────────────────────── */
export default function PortfolioReturnClient({ region = 'in' }: { region?: string }) {
  const defaultSettings = { investments: defaultInvestments() };
  const { settings, updateSettings } = useCalculatorSettings('portfolio-return', defaultSettings);
  const [investments, setInvestmentsRaw] = useState<Investment[]>(settings.investments);
  const [mobile, setMobile] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const updateInvestments = useCallback((fn: (prev: Investment[]) => Investment[]) => {
    setInvestmentsRaw(prev => {
      const next = fn(prev);
      updateSettings({ investments: next });
      return next;
    });
  }, [updateSettings]);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const addInvestment = () => {
    if (investments.length >= 8) return;
    const used = new Set(investments.map(i => i.name));
    const name = PRESET_NAMES.find(n => !used.has(n)) || `Investment ${investments.length + 1}`;
    updateInvestments(prev => [...prev, { id: nextInvestmentId(prev), name, amount: 100000, returnRate: 10 }]);
  };

  const removeInvestment = (id: number) => {
    if (investments.length <= 1) return;
    updateInvestments(prev => prev.filter(i => i.id !== id));
  };

  const updateName = (id: number, name: string) => {
    updateInvestments(prev => prev.map(i => i.id === id ? { ...i, name } : i));
  };

  const updateAmount = (id: number, amount: number) => {
    updateInvestments(prev => prev.map(i => i.id === id ? { ...i, amount } : i));
  };

  const updateReturn = (id: number, returnRate: number) => {
    updateInvestments(prev => prev.map(i => i.id === id ? { ...i, returnRate } : i));
  };

  const totalInvested = useMemo(() => investments.reduce((s, i) => s + i.amount, 0), [investments]);

  const result = useMemo(() => {
    if (totalInvested <= 0) return null;
    const weightedSum = investments.reduce((s, i) => s + i.amount * i.returnRate, 0);
    const weightedReturn = weightedSum / totalInvested;
    const breakdown = investments.map(i => {
      const weight = totalInvested > 0 ? (i.amount / totalInvested) * 100 : 0;
      const contribution = totalInvested > 0 ? (i.amount * i.returnRate) / weightedSum * 100 : 0;
      return { ...i, weight, contribution: isNaN(contribution) ? 0 : contribution, weightedContribution: (i.amount / totalInvested) * i.returnRate };
    });
    const sorted = [...breakdown].sort((a, b) => b.amount - a.amount);
    return { weightedReturn, estimatedAnnualReturn: weightedSum / 100, breakdown, sorted };
  }, [investments, totalInvested]);

  const donutEntries = useMemo(() => {
    if (!result) return [];
    return result.sorted.map((item, i) => ({
      value: item.amount,
      color: SLICE_COLORS[i % SLICE_COLORS.length],
      label: item.name,
    }));
  }, [result]);

  const visibleInvestments = mobile && !showMore ? investments.slice(0, 2) : investments;
  const leftInvestmentCount = mobile ? visibleInvestments.length : Math.ceil(visibleInvestments.length / 2);

  const renderInvestmentInput = (inv: Investment, idx: number, groupLength: number) => (
    <div key={inv.id} style={{ marginBottom: mobile ? 24 : 36, paddingBottom: mobile ? 20 : 28, borderBottom: idx < groupLength - 1 ? `1px solid ${C.border}` : 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            #{investments.findIndex(item => item.id === inv.id) + 1}
          </span>
          <input value={inv.name} onChange={e => updateName(inv.id, e.target.value)}
            aria-label={`Investment ${investments.findIndex(item => item.id === inv.id) + 1} name`}
            style={{ fontSize: 14, fontWeight: 600, color: C.ink, background: 'transparent', border: `1px solid ${C.border}`, borderRadius: 6, padding: '6px 10px', width: 140, outline: 'none', fontFamily: INTER }} />
        </div>
        {investments.length > 1 && (
          <button onClick={() => removeInvestment(inv.id)} aria-label={`Remove ${inv.name}`}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: C.ink3, fontSize: 16, lineHeight: 1, fontFamily: INTER }} title="Remove">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
      <Slider label="Invested Amount" id={`amount-${inv.id}`} value={inv.amount} min={0} max={100000000} step={10000} fmt={fmtC} onChange={v => updateAmount(inv.id, v)} compact={mobile} />
      <Slider label="Return Rate %" id={`rate-${inv.id}`} value={inv.returnRate} min={0} max={50} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={v => updateReturn(inv.id, v)} compact={mobile} />
    </div>
  );

  const h2 = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const h3 = { fontSize: 15.5, fontWeight: 600, color: C.ink, margin: '0 0 6px' } as React.CSSProperties;
  const p = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 13, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Portfolio Return Calculator
          </h1>
          <p style={{ fontSize: 14.5, color: C.ink3, margin: 0 }}>
            Calculate the weighted average return of your investment portfolio with multiple assets
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="Portfolio Return Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gridTemplateAreas: mobile ? "'controls' 'investments' 'results'" : "'controls results' 'investments investments'" }}>

                {/* Input panel */}
                <div style={{ gridArea: 'controls', padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                    <button onClick={addInvestment} disabled={investments.length >= 8}
                      aria-label="Add investment"
                      style={{ fontSize: 12.5, fontWeight: 600, color: C.dark, background: 'transparent', border: `1.5px dashed ${C.border}`, borderRadius: 8, padding: '8px 16px', cursor: investments.length >= 8 ? 'not-allowed' : 'pointer', fontFamily: INTER, opacity: investments.length >= 8 ? 0.4 : 1, transition: 'all 0.12s' }}>
                      + Add investment
                    </button>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'center' }}>
                      {PRESET_NAMES.filter(n => !investments.some(i => i.name === n)).slice(0, 4).map(name => (
                        <button key={name} onClick={() => {
                          if (investments.length >= 8) return;
                          updateInvestments(prev => [...prev, { id: nextInvestmentId(prev), name, amount: 100000, returnRate: 10 }]);
                        }}
                          style={{ fontSize: 11, fontWeight: 500, color: C.ink3, background: 'transparent', border: `1px solid ${C.border}`, borderRadius: 99, padding: '3px 10px', cursor: 'pointer', fontFamily: INTER }}>
                          + {name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <p style={{ fontSize: 11.5, color: C.ink3, margin: '8px 0 0' }}>Max 8 investments</p>
                </div>

                <div style={{ gridArea: 'investments', padding: mobile ? '20px 18px' : '32px 44px', borderTop: `1px solid ${C.border}` }}>
                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gridTemplateRows: mobile ? 'none' : `repeat(${leftInvestmentCount}, auto)`, gridAutoFlow: mobile ? 'row' : 'column', columnGap: mobile ? 0 : 36, alignItems: 'start' }}>
                    {visibleInvestments.map((inv, idx) => {
                      const inLeftColumn = idx < leftInvestmentCount;
                      const columnIndex = inLeftColumn ? idx : idx - leftInvestmentCount;
                      const columnLength = inLeftColumn ? leftInvestmentCount : visibleInvestments.length - leftInvestmentCount;
                      return renderInvestmentInput(inv, columnIndex, columnLength);
                    })}
                  </div>

                  {mobile && investments.length > 2 && (
                    <div style={{ marginBottom: 16 }}>
                      <button onClick={() => setShowMore(p => !p)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, fontSize: 13, fontWeight: 600, color: C.dark, padding: '8px 0' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.dark} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                          aria-hidden="true" style={{ transform: showMore ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                        {showMore ? 'Back' : `More settings (${investments.length - 2} more)`}
                      </button>
                    </div>
                  )}
                </div>

                {/* Result panel */}
                <div style={{ gridArea: 'results', padding: mobile ? '20px 18px' : '40px 44px', borderLeft: mobile ? 'none' : `1px solid ${C.border}`, borderTop: mobile ? `1px solid ${C.border}` : 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {result ? (
                    <>
                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>
                          Portfolio Return
                        </span>
                        <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                          aria-live="polite" aria-label={`Result: ${result.weightedReturn.toFixed(2)} percent`}>
                          {result.weightedReturn.toFixed(2)}%
                        </span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                        <DonutChart entries={donutEntries} />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                        {result.sorted.slice(0, 4).map((item, i) => (
                          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <div style={{ width: 9, height: 9, borderRadius: 3, background: SLICE_COLORS[i % SLICE_COLORS.length] }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>{item.name}</span>
                          </div>
                        ))}
                      </div>

                      <div style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderTop: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>Total invested</span>
                          <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{fmtC(totalInvested)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderTop: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>Estimated annual return</span>
                          <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{fmtC(result.estimatedAnnualReturn)}</span>
                        </div>
                      </div>

                    </>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, color: C.ink3, fontSize: 14 }}>
                      Add investments to see result
                    </div>
                  )}
                </div>
              </div>

              {/* Breakdown table */}
              {result && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <div style={{ padding: mobile ? '14px 20px' : '18px 44px' }}>
                    <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Investment Breakdown</span>
                  </div>
                  {mobile && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '0 0 6px' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                        style={{ animation: 'swipeHint 1.6s ease-in-out infinite' }}>
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                      <p style={{ fontSize: 11.5, color: C.ink3, margin: 0, fontFamily: INTER }}>Swipe to see all columns</p>
                    </div>
                  )}
                  <style>{`@keyframes swipeHint { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }`}</style>
                  <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
                    <table style={{ minWidth: 500, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <thead>
                        <tr style={{ background: '#f4f5f6' }}>
                          {['Investment', 'Amount', 'Return Rate', 'Allocation %', 'Contribution %'].map(h => (
                            <th key={h} style={{ padding: '10px 20px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 13, whiteSpace: 'nowrap', borderBottom: `1px solid ${C.border}` }} scope="col">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {result.sorted.map((item, i) => (
                          <tr key={item.id} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={{ padding: '11px 20px', fontWeight: 600, color: C.ink }}>{item.name}</td>
                            <td style={{ padding: '11px 20px', color: C.ink2 }}>{fmtIN(item.amount)}</td>
                            <td style={{ padding: '11px 20px', fontWeight: 600, color: C.dark }}>{item.returnRate.toFixed(1)}%</td>
                            <td style={{ padding: '11px 20px', color: C.ink2 }}>{item.weight.toFixed(1)}%</td>
                            <td style={{ padding: '11px 20px', fontWeight: 600, color: '#1f7a58' }}>{item.contribution.toFixed(1)}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>

            {/* ── WAITLIST CARD ── */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-portfolio-return">What Is Portfolio Return?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Portfolio return is the weighted average rate of return earned on a collection of investments held by an individual or institution. It combines each investment individual return rate with its proportion of the total portfolio value to produce a single blended rate.
                  </p>
                </div>
                <p style={p}>
                  Most investors hold several types of assets, each with a different return. A weighted portfolio return combines the rates you enter according to each holding&apos;s share of the portfolio.
                </p>
                <p style={p}>
                  Portfolio return is the single most important number for evaluating whether your asset allocation is working as intended. A high-return equity allocation can be dragged down by a heavy FD position. The portfolio return reveals the net effect.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-calculate">How to Calculate Weighted Average Portfolio Return</h2>
                <p style={p}>The weighted average portfolio return uses a simple formula that accounts for both the return rate and the size of each investment.</p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 15, fontWeight: 700, color: C.dark }}>
                    Portfolio Return = sum of (Amount_i divided by Total amount) x Return rate_i
                  </code>
                </div>
                <p style={p}>
                  <strong>Step 1:</strong> List every investment with its current value and annual return rate. Treat the rates in a worked example as assumptions, not current offers or forecasts.
                </p>
                <p style={p}>
                  <strong>Step 2:</strong> Multiply each investment value by its return rate. For example, Rs 4,00,000 at an assumed 7% contributes Rs 28,000 to the weighted annual return amount.
                </p>
                <p style={p}>
                  <strong>Step 3:</strong> Add the weighted return amounts for all investments.
                </p>
                <p style={p}>
                  <strong>Step 4:</strong> Divide the sum by the total portfolio value. That gives the weighted average portfolio return.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="why-portfolio-return-matters">Why Portfolio Return Matters</h2>
                <p style={p}>
                  A portfolio return tells you whether your asset allocation is aligned with your financial goals. If you need 10% annual growth to reach your retirement target but your portfolio is returning only 7.5%, either the allocation needs to shift toward higher-return assets or the goal timeline needs to extend.
                </p>
                <p style={p}>
                  Portfolio return also reveals concentration risk. A portfolio where 70% of returns come from one asset class is dangerously undiversified. The contribution metric in the breakdown table highlights exactly this : if a single investment is driving most of the return, the portfolio has a single point of failure.
                </p>
                <p style={p}>
                  For retirees and near-retirees, portfolio return matters differently. The goal shifts from maximising return to generating stable income with capital preservation. A portfolio returning 7% with low volatility may be superior to one returning 10% with high volatility when withdrawals are regular.
                </p>
                <p style={p}>
                  SEBI-registered investment advisers in India use portfolio return analysis to review client portfolios. The difference between your portfolio return and a relevant benchmark , such as the Nifty 50 for equity-heavy portfolios or the CRISIL composite for balanced portfolios, tells you whether active decisions are adding value.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This Portfolio Return Calculator</h2>
                <p style={p}>
                  Start by adding each investment you hold. Use the preset buttons for common Indian asset classes: FD, Mutual Funds, Stocks, EPF, PPF, Real Estate, Gold, and NPS. You can also type a custom name for bonds, debt funds, or other instruments.
                </p>
                <p style={p}>
                  For each investment, enter the current market value and the annual return rate. Use actual trailing returns from your investment statements for a backward-looking review. Use conservative expected returns for forward-looking allocation planning. The calculator automatically computes the weighted blend.
                </p>
                <p style={p}>
                  The results panel shows your total invested amount and the weighted average portfolio return. The donut chart visualises how your portfolio is allocated across assets. The breakdown table reveals each investment exact contribution to the overall return, sorted from largest to smallest allocation.
                </p>
                <p style={p}>
                  Use the multi-currency selector to view amounts in your preferred currency. NRIs can enter values in rupees and switch to USD, EUR, or GBP for overseas planning. Remove any investment using the X button. Add up to 8 investments for a complete picture.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  For a deeper analysis of individual investment performance, use the <Link href="/calculators/cagr-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>CAGR Calculator</Link> for lumpsum holdings or the <Link href="/calculators/xirr-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>XIRR Calculator</Link> for SIP portfolios.
                </p>
              </div>

              <PortfolioReturnGuide mobile={mobile} />

              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only. Portfolio return is a mathematical measure of blended investment performance and does not predict future returns. Past performance of any investment does not guarantee future results. This calculator is for educational and planning purposes and does not constitute financial advice. Consult a SEBI-registered investment adviser before making investment decisions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.portfolio-sidebar::-webkit-scrollbar{width:5px}.portfolio-sidebar::-webkit-scrollbar-track{background:transparent}.portfolio-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.portfolio-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="portfolio-sidebar" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <SidebarList title="Popular Calculators" items={POPULAR} />
              <SidebarList title="More Calculators" items={MORE} />
            </div>
          </aside>

        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/sip-calculator|SIP', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/cagr-calculator|CAGR', '/calculators/swp-calculator|SWP', '/calculators/emi-calculator|EMI', '/calculators/fd-calculator|FD', '/calculators/ppf-calculator|PPF', '/calculators/xirr-calculator|XIRR', '/calculators/compound-interest-calculator|Compound Int.'] },
        { hd: 'Topics', links: ['/calculators/sip-calculator|Mutual Funds', '/calculators/home-loan-calculator|Home Loans', '/calculators/fd-calculator|Fixed Deposits', '/calculators/retirement-calculator|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

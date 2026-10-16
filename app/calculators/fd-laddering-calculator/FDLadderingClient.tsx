'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect, useId } from 'react';
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

/* ── Math ──────────────────────────────────────────────── */
// Cumulative FD: A = P * (1 + r/n)^(n*t)
function calcFDMaturity(principal: number, annualRatePct: number, tenureDays: number, compoundFreq: number): number {
  if (principal <= 0 || tenureDays <= 0 || annualRatePct <= 0) return principal;
  const r = annualRatePct / 100;
  const t = tenureDays / 365;
  const n = compoundFreq;
  return principal * Math.pow(1 + r / n, n * t);
}

// Non-cumulative monthly payout
function calcMonthlyPayout(principal: number, annualRatePct: number): number {
  return (principal * annualRatePct) / 100 / 12;
}

// Effective Annual Yield
function calcEAY(annualRatePct: number, compoundFreq: number): number {
  const r = annualRatePct / 100;
  const n = compoundFreq;
  return (Math.pow(1 + r / n, n) - 1) * 100;
}

// Ladder: tranche i (1-indexed), tenure = i years, rate = base + (i-1)*0.1%
function calcLadderTranches(totalInvestment: number, baseRatePct: number): LadderTranche[] {
  const tranches: LadderTranche[] = [];
  const perTranche = totalInvestment / 5;
  for (let i = 1; i <= 5; i++) {
    const rate = baseRatePct + (i - 1) * 0.1;
    const maturity = perTranche * Math.pow(1 + rate / 100 / 4, 4 * i);
    const interest = maturity - perTranche;
    tranches.push({ tranche: i, principal: perTranche, rate, tenure: i, maturity, interest });
  }
  return tranches;
}

interface LadderTranche {
  tranche: number;
  principal: number;
  rate: number;
  tenure: number;
  maturity: number;
  interest: number;
}

// Year-by-year growth table for single FD
interface FDYearRow {
  year: number;
  openingBalance: number;
  interestEarned: number;
  closingBalance: number;
}

function buildFDYearTable(principal: number, annualRatePct: number, tenureDays: number, compoundFreq: number): FDYearRow[] {
  const rows: FDYearRow[] = [];
  const r = annualRatePct / 100;
  const n = compoundFreq;
  const years = tenureDays / 365;
  const fullYears = Math.floor(years);
  let balance = principal;
  for (let y = 1; y <= Math.max(1, fullYears); y++) {
    const opening = balance;
    const closing = principal * Math.pow(1 + r / n, n * y);
    rows.push({ year: y, openingBalance: opening, interestEarned: closing - opening, closingBalance: closing });
    balance = closing;
  }
  // partial final year if tenure is not a whole number of years
  if (years > fullYears && fullYears > 0) {
    const opening = balance;
    const closing = principal * Math.pow(1 + r / n, n * years);
    rows.push({ year: fullYears + 1, openingBalance: opening, interestEarned: closing - opening, closingBalance: closing });
  } else if (fullYears === 0) {
    const closing = calcFDMaturity(principal, annualRatePct, tenureDays, compoundFreq);
    rows[0] = { year: 1, openingBalance: principal, interestEarned: closing - principal, closingBalance: closing };
  }
  return rows;
}

/* ── Tenure Presets ─────────────────────────────────────── */
const TENURE_PRESETS = [
  { label: '7D',  days: 7 },
  { label: '15D', days: 15 },
  { label: '1M',  days: 30 },
  { label: '3M',  days: 91 },
  { label: '6M',  days: 182 },
  { label: '1Y',  days: 365 },
  { label: '2Y',  days: 730 },
  { label: '3Y',  days: 1095 },
  { label: '5Y',  days: 1825 },
];

const COMPOUND_OPTS = [
  { label: 'Monthly',   value: 12 },
  { label: 'Quarterly', value: 4 },
  { label: 'Annually',  value: 1 },
];

/* ── DonutChart ────────────────────────────────────────── */
function DonutChart({ principal, interest, label }: { principal: number; interest: number; label?: string }) {
  const total = principal + interest;
  if (total === 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const pArc  = (principal / total) * circ;
  const pPct  = Math.round((principal / total) * 100);
  return (
    <svg role="img" aria-label={`${label || 'FD'} split: ${pPct}% principal, ${100 - pPct}% interest`}
      width="216" height="216" viewBox="0 0 216 216" style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Principal</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
  );
}

/* ── Slider ────────────────────────────────────────────── */
function Slider({
  label, id: idProp, value, min, max, step, display, onChange, compact,
}: {
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
    <div style={{ marginBottom: compact ? 18 : 36 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 8 : 14 }}>
        {label ? (
          <label htmlFor={editing ? inputId : rangeId}
            style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400 }}>{label}</label>
        ) : (
          <span />
        )}
        {editing ? (
          <input id={inputId} autoFocus value={raw}
            aria-label={`Enter ${label} value`}
            onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 130, outline: 'none', color: C.dark, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${display}. Click to edit.`}
            style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: C.dark, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 18px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 90 : 110, textAlign: 'center' }}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}>
            {display}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 20, height: 20, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 2px 8px rgba(16,18,20,0.22)', pointerEvents: 'none', zIndex: 1 }} />
        <input id={rangeId} type="range" min={min} max={max} step={step} value={value}
          aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
          onChange={e => onChange(+e.target.value)}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontSize: 11, color: C.ink3 }}>{min}</span>
        <span style={{ fontSize: 11, color: C.ink3 }}>{max}</span>
      </div>
    </div>
  );
}

/* ── Sidebar Nav ───────────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ padding: '13px 20px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 14, color: C.ink2, transition: 'all 0.12s' }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = C.paleLime; (e.currentTarget as HTMLElement).style.color = C.dark; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink2; }}>
            {label}
          </div>
        </Link>
      ))}
    </div>
  );
}

const POPULAR = [
  { href: '/calculators/sip-calculator',              label: 'SIP Calculator' },
  { href: '/calculators/ppf-calculator',              label: 'PPF Calculator' },
  { href: '/calculators/rd-calculator',               label: 'RD Calculator' },
  { href: '/calculators/fd-maturity-calculator',      label: 'FD Maturity Calculator' },
  { href: '/calculators/scss-calculator',             label: 'SCSS Calculator' },
  { href: '/calculators/nsc-calculator',              label: 'NSC Calculator' },
  { href: '/calculators/income-tax-calculator',       label: 'Income Tax Calculator' },
];
const MORE = [
  { href: '/calculators/compound-interest-calculator', label: 'Compound Interest Calculator' },
  { href: '/calculators/nps-calculator',               label: 'NPS Calculator' },
  { href: '/calculators/epf-calculator',               label: 'EPF Calculator' },
  { href: '/calculators/lumpsum-calculator',           label: 'Lumpsum Calculator' },
  { href: '/calculators/savings-account-interest-calculator', label: 'Savings Account Interest' },
];

/* ── Article table styles ──────────────────────────────── */
const thS: React.CSSProperties = {
  padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: '#16140F',
  background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase',
  letterSpacing: '0.05em', border: `1px solid #e3e6e8`, whiteSpace: 'nowrap',
  verticalAlign: 'middle',
};
const thR: React.CSSProperties = { ...thS, textAlign: 'right' as const };
const tdL: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: '#50565c', border: `1px solid #e3e6e8`, verticalAlign: 'middle', textAlign: 'left' };
const tdR: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: '#16140F', fontWeight: 500, border: `1px solid #e3e6e8`, verticalAlign: 'middle', textAlign: 'right' };

/* ── FD Snapshot (sidebar facts) ──────────────────────── */
function FDSnapshot() {
  const rows = [
    { label: 'Highest bank FD rate (Jul 2026)', value: '7.75%' },
    { label: 'SBI 1Y FD rate', value: '6.80%' },
    { label: 'HDFC Bank 2Y FD rate', value: '7.00%' },
    { label: 'DICGC insurance per bank', value: 'Rs 5 lakh' },
    { label: 'TDS threshold (annual interest)', value: 'Rs 40,000' },
    { label: 'Senior citizen TDS threshold', value: 'Rs 50,000' },
    { label: 'Post office NSC rate (3Y)', value: '7.70%' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>FD Quick Facts</span>
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

/* ── FAQ Accordion ─────────────────────────────────────── */
function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return <FAQBox items={items} />;
}

/* ── CA CTA ────────────────────────────────────────────── */

/* ── Main Component ────────────────────────────────────── */
export default function FDLadderingClient({ faqItems }: { faqItems: { q: string; a: string }[] }) {
  const [mobile, setMobile] = useState(false);
  const [activeTab, setActiveTab] = useState<'fd' | 'ladder'>('fd');

  // FD Calculator state
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7.0);
  const [tenurePreset, setTenurePreset] = useState('1Y');
  const [tenureDays, setTenureDays] = useState(365);
  const [compoundFreq, setCompoundFreq] = useState(4);
  const [payoutMode, setPayoutMode] = useState<'cumulative' | 'noncumulative'>('cumulative');
  const [showYearTable, setShowYearTable] = useState(false);

  // Ladder state
  const [ladderTotal, setLadderTotal] = useState(500000);
  const [ladderBaseRate, setLadderBaseRate] = useState(7.0);

  // Restore from localStorage
  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-fd-laddering-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (d.principal      !== undefined) setPrincipal(d.principal);
      if (d.rate           !== undefined) setRate(d.rate);
      if (d.tenurePreset   !== undefined) setTenurePreset(d.tenurePreset);
      if (d.tenureDays     !== undefined) setTenureDays(d.tenureDays);
      if (d.compoundFreq   !== undefined) setCompoundFreq(d.compoundFreq);
      if (d.payoutMode     !== undefined) setPayoutMode(d.payoutMode);
      if (d.ladderTotal    !== undefined) setLadderTotal(d.ladderTotal);
      if (d.ladderBaseRate !== undefined) setLadderBaseRate(d.ladderBaseRate);
    } catch { /* fail silently */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('fermor-fd-laddering-v1', JSON.stringify({
        principal, rate, tenurePreset, tenureDays, compoundFreq, payoutMode,
        ladderTotal, ladderBaseRate,
      }));
    } catch { /* ignore */ }
  }, [principal, rate, tenurePreset, tenureDays, compoundFreq, payoutMode, ladderTotal, ladderBaseRate]);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk();
    window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const { formatCurrency, convertCurrency, selectedCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  // FD Calculator derived
  const maturity = useMemo(() => {
    if (payoutMode === 'cumulative') {
      return calcFDMaturity(principal, rate, tenureDays, compoundFreq);
    } else {
      return principal; // principal returned at maturity for non-cumulative
    }
  }, [principal, rate, tenureDays, compoundFreq, payoutMode]);

  const totalInterest = useMemo(() => {
    if (payoutMode === 'cumulative') {
      return maturity - principal;
    } else {
      // total interest = monthly payout * tenure months
      const months = tenureDays / 30.4375;
      return calcMonthlyPayout(principal, rate) * months;
    }
  }, [maturity, principal, rate, tenureDays, payoutMode]);

  const monthlyPayout = useMemo(() => calcMonthlyPayout(principal, rate), [principal, rate]);
  const eay = useMemo(() => calcEAY(rate, compoundFreq), [rate, compoundFreq]);
  const yearTable = useMemo(() => buildFDYearTable(principal, rate, tenureDays, compoundFreq), [principal, rate, tenureDays, compoundFreq]);

  // Ladder derived
  const ladderTranches = useMemo(() => calcLadderTranches(ladderTotal, ladderBaseRate), [ladderTotal, ladderBaseRate]);
  const ladderCorpus = useMemo(() => ladderTranches.reduce((s, t) => s + t.maturity, 0), [ladderTranches]);
  const ladderTotalInterest = useMemo(() => ladderCorpus - ladderTotal, [ladderCorpus, ladderTotal]);
  const ladderPrincipalPct = useMemo(() => ladderCorpus > 0 ? Math.round((ladderTotal / ladderCorpus) * 100) : 0, [ladderTotal, ladderCorpus]);

  // Comparison: single 5Y FD vs ladder
  const single5YMaturity = useMemo(() => {
    const singleRate = ladderBaseRate + 0.4; // same as 5th tranche rate
    return ladderTotal * Math.pow(1 + singleRate / 100 / 4, 4 * 5);
  }, [ladderTotal, ladderBaseRate]);

  const handleTenurePreset = (preset: string, days: number) => {
    setTenurePreset(preset);
    setTenureDays(days);
  };

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <style>{`
        .fdl-sidebar::-webkit-scrollbar { width: 5px; }
        .fdl-sidebar::-webkit-scrollbar-track { background: transparent; }
        .fdl-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .fdl-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
        @keyframes swipeHint { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }
      `}</style>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        {/* Page header */}
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            FD Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate fixed deposit maturity, interest earned, and monthly payouts. Switch to the FD Ladder tab to build a laddering strategy across 5 tenures for steady annual liquidity.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          {/* LEFT COLUMN */}
          <div style={{ minWidth: 0 }}>

            {/* CALCULATOR CARD */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>

              {/* Tab strip */}
              <div role="tablist" aria-label="Calculator mode"
                style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                {([
                  { id: 'fd',     label: 'FD Calculator' },
                  { id: 'ladder', label: 'FD Ladder' },
                ] as const).map(t => (
                  <button key={t.id} id={`tab-${t.id}`} role="tab"
                    aria-selected={activeTab === t.id} aria-controls={`panel-${t.id}`}
                    onClick={() => setActiveTab(t.id)}
                    style={{
                      flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: mobile ? 13 : 14, fontWeight: activeTab === t.id ? 700 : 400,
                      color: activeTab === t.id ? C.dark : C.ink3,
                      borderBottom: activeTab === t.id ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                      transition: 'all 0.15s', fontFamily: INTER,
                    }}>
                    {t.label}
                  </button>
                ))}
              </div>

              {/* TAB 1: FD Calculator */}
              {activeTab === 'fd' && (
                <div id="panel-fd" role="tabpanel" aria-labelledby="tab-fd">
                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                    {/* Input panel */}
                    <div style={{ padding: mobile ? '20px 18px' : '40px 40px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                        <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>FD Details</p>
                        <CurrencySelector theme="light" />
                      </div>

                      <Slider id="fd-principal" label="Principal Amount" value={principal} min={10000} max={5000000} step={10000}
                        display={fmtC(principal)} onChange={setPrincipal} compact={mobile} />

                      <Slider id="fd-rate" label="Interest Rate (% p.a.)" value={rate} min={4} max={10} step={0.05}
                        display={`${rate.toFixed(2)}%`} onChange={setRate} compact={mobile} />

                      {/* Tenure presets */}
                      <div style={{ marginBottom: 36 }}>
                        <label style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400, display: 'block', marginBottom: 10 }}>Tenure</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {TENURE_PRESETS.map(p => (
                            <button key={p.label} onClick={() => handleTenurePreset(p.label, p.days)}
                              aria-pressed={tenurePreset === p.label}
                              style={{
                                padding: '5px 11px', fontSize: 12.5,
                                fontWeight: tenurePreset === p.label ? 700 : 500,
                                background: C.white,
                                color: tenurePreset === p.label ? C.ink : C.ink3,
                                border: `${tenurePreset === p.label ? 1.5 : 1}px solid ${tenurePreset === p.label ? C.ink : C.border}`,
                                borderRadius: 6, cursor: 'pointer', fontFamily: INTER, transition: 'all 0.15s',
                              }}>
                              {p.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Compounding frequency */}
                      <div style={{ marginBottom: 24 }}>
                        <label style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400, display: 'block', marginBottom: 10 }}>Compounding</label>
                        <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                          {COMPOUND_OPTS.map((opt, idx) => (
                            <button key={opt.value} onClick={() => setCompoundFreq(opt.value)}
                              style={{
                                flex: 1, padding: '7px 4px', border: 'none',
                                borderRight: idx < COMPOUND_OPTS.length - 1 ? `1px solid ${C.border}` : 'none',
                                background: compoundFreq === opt.value ? C.white : 'transparent',
                                color: compoundFreq === opt.value ? C.ink : C.ink3,
                                fontFamily: INTER, fontSize: 12.5,
                                fontWeight: compoundFreq === opt.value ? 600 : 400,
                                cursor: 'pointer', transition: 'all 0.15s',
                              }}>
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Interest payout toggle */}
                      <div style={{ marginBottom: 8 }}>
                        <label style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400, display: 'block', marginBottom: 10 }}>Interest Payout</label>
                        <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                          {([
                            { id: 'cumulative',    label: 'Cumulative' },
                            { id: 'noncumulative', label: 'Non-Cumulative' },
                          ] as const).map((opt, idx) => (
                            <button key={opt.id} onClick={() => setPayoutMode(opt.id)}
                              style={{
                                flex: 1, padding: '7px 4px', border: 'none',
                                borderRight: idx === 0 ? `1px solid ${C.border}` : 'none',
                                background: payoutMode === opt.id ? C.white : 'transparent',
                                color: payoutMode === opt.id ? C.ink : C.ink3,
                                fontFamily: INTER, fontSize: 12.5,
                                fontWeight: payoutMode === opt.id ? 600 : 400,
                                cursor: 'pointer', transition: 'all 0.15s',
                              }}>
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Results panel */}
                    <div style={{ padding: mobile ? '20px 18px' : '40px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      {/* Donut */}
                      <div style={{ order: mobile ? 1 : -1, marginBottom: mobile ? 16 : 20 }}>
                        <DonutChart principal={principal} interest={totalInterest} label="FD" />
                      </div>
                      {/* Legend */}
                      <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 20, marginBottom: mobile ? 12 : 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                          <span style={{ fontSize: 13, color: C.ink2 }}>Principal</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                          <span style={{ fontSize: 13, color: C.ink2 }}>Interest</span>
                        </div>
                      </div>

                      {/* Maturity amount highlight */}
                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 14, padding: mobile ? '14px 18px' : '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 8 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#50565C' }}>Maturity Amount</div>
                          <div style={{ fontSize: 12, color: '#7A8087' }}>
                            {payoutMode === 'cumulative' ? 'Principal + Interest' : 'Principal returned'}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                          <span
                            aria-live="polite"
                            aria-label={`Maturity amount: ${fmtIN(maturity)}`}
                            style={{ fontSize: mobile ? 22 : 26, fontWeight: 800, color: '#1F7A58', lineHeight: 1 }}>
                            {fmtIN(maturity)}
                          </span>
                          {payoutMode === 'noncumulative' && (
                            <span style={{ fontSize: 13, fontWeight: 700, color: '#101214', lineHeight: 1 }}>
                              {fmtIN(monthlyPayout)}/mo
                            </span>
                          )}
                        </div>
                      </div>

                      {[
                        { label: 'Total interest earned', value: fmtC(totalInterest) },
                        ...(payoutMode === 'noncumulative'
                          ? [{ label: 'Monthly interest payout', value: fmtC(monthlyPayout) }]
                          : []),
                        { label: 'Principal invested', value: fmtC(principal) },
                        ...(compoundFreq !== 1 ? [{ label: 'Effective annual yield', value: `${eay.toFixed(2)}%` }] : []),
                        { label: 'Tenure', value: TENURE_PRESETS.find(p => p.label === tenurePreset)?.label || `${tenureDays}D` },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                        </div>
                      ))}

                      {/* Split bar */}
                      {(() => {
                        const tot = principal + totalInterest;
                        const pPct = tot > 0 ? Math.round((principal / tot) * 100) : 100;
                        const iPct = 100 - pPct;
                        return (
                          <div style={{ width: '100%', marginTop: 16 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                              <span style={{ fontSize: 12, color: C.ink3 }}>Principal {pPct}%</span>
                              <span style={{ fontSize: 12, color: C.ink3 }}>Interest {iPct}%</span>
                            </div>
                            <div style={{ height: 6, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }}>
                              <div style={{ height: '100%', width: `${pPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Year-by-year growth table toggle */}
                  <div style={{ borderTop: `1px solid ${C.border}` }}>
                    <button onClick={() => setShowYearTable(v => !v)} aria-expanded={showYearTable} aria-controls="fd-year-table"
                      style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '18px 40px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                      <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.ink }}>Year-by-Year Growth</span>
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        style={{ transform: showYearTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    {showYearTable && (
                      <div id="fd-year-table" style={{ borderTop: `1px solid ${C.border}` }}>
                        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                          {mobile && (
                            <p style={{ padding: '8px 16px 0', fontSize: 11, color: C.ink3, margin: 0, animation: 'swipeHint 1.2s ease-in-out' }}>
                              Swipe to see full table
                            </p>
                          )}
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                            <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 24px', textAlign: 'left' }}>
                              Year-by-year FD growth. All values in {selectedCurrency?.code || 'INR'}.
                            </caption>
                            <thead>
                              <tr>
                                <th scope="col" style={thS}>Year</th>
                                <th scope="col" style={thR}>Opening Balance</th>
                                <th scope="col" style={thR}>Interest Earned</th>
                                <th scope="col" style={thR}>Closing Balance</th>
                              </tr>
                            </thead>
                            <tbody>
                              {yearTable.map((row, i) => (
                                <tr key={row.year} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                  <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>{row.year}</td>
                                  <td style={tdR}>{fmtIN(row.openingBalance)}</td>
                                  <td style={{ ...tdR, color: '#166534', fontWeight: 600 }}>{fmtIN(row.interestEarned)}</td>
                                  <td style={tdR}>{fmtIN(row.closingBalance)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: FD Ladder */}
              {activeTab === 'ladder' && (
                <div id="panel-ladder" role="tabpanel" aria-labelledby="tab-ladder">
                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                    {/* Input panel */}
                    <div style={{ padding: mobile ? '20px 18px' : '40px 40px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                        <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Ladder Settings</p>
                        <CurrencySelector theme="light" />
                      </div>

                      <Slider id="ladder-total" label="Total Investment" value={ladderTotal} min={100000} max={10000000} step={50000}
                        display={fmtC(ladderTotal)} onChange={setLadderTotal} compact={mobile} />

                      <Slider id="ladder-rate" label="Base Interest Rate (% p.a.)" value={ladderBaseRate} min={4} max={10} step={0.05}
                        display={`${ladderBaseRate.toFixed(2)}%`} onChange={setLadderBaseRate} compact={mobile} />

                      <div style={{ padding: '14px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.ink2, lineHeight: 1.6 }}>
                        <strong style={{ color: C.ink }}>How this works:</strong> Your total investment is split equally into 5 tranches. Tranche 1 earns the base rate. Each subsequent tranche earns 0.1% more, reflecting how longer tenures get better bank rates. Compounding is quarterly throughout.
                      </div>
                    </div>

                    {/* Results panel */}
                    <div style={{ padding: mobile ? '20px 18px' : '40px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      {/* Donut */}
                      <div style={{ order: mobile ? 1 : -1, marginBottom: mobile ? 16 : 20 }}>
                        <DonutChart principal={ladderTotal} interest={ladderTotalInterest} label="Ladder" />
                      </div>
                      {/* Legend */}
                      <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 20, marginBottom: mobile ? 12 : 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                          <span style={{ fontSize: 13, color: C.ink2 }}>Principal</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                          <span style={{ fontSize: 13, color: C.ink2 }}>Interest</span>
                        </div>
                      </div>

                      {/* Total corpus highlight */}
                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 14, padding: mobile ? '14px 18px' : '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 8 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#50565C' }}>Total Corpus (5 Years)</div>
                          <div style={{ fontSize: 12, color: '#7A8087' }}>Sum of all 5 tranches</div>
                        </div>
                        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                          <span
                            aria-live="polite"
                            aria-label={`Total corpus: ${fmtIN(ladderCorpus)}`}
                            style={{ fontSize: mobile ? 22 : 26, fontWeight: 800, color: '#1F7A58', lineHeight: 1 }}>
                            {fmtIN(ladderCorpus)}
                          </span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: '#101214', lineHeight: 1 }}>
                            {fmtIN(ladderTranches[0].maturity)}/yr from year 1
                          </span>
                        </div>
                      </div>

                      {[
                        { label: 'Total interest earned', value: fmtC(ladderTotalInterest) },
                        { label: 'Principal invested', value: fmtC(ladderTotal) },
                        { label: 'Per tranche (1/5th)', value: fmtC(ladderTotal / 5) },
                        { label: 'Single 5Y FD comparison', value: fmtC(single5YMaturity) },
                        { label: 'Ladder advantage', value: `+${fmtC(Math.max(0, ladderCorpus - single5YMaturity))}` },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                        </div>
                      ))}

                      {/* Split bar */}
                      {(() => {
                        const tot = ladderTotal + ladderTotalInterest;
                        const pPct = tot > 0 ? Math.round((ladderTotal / tot) * 100) : 100;
                        const iPct = 100 - pPct;
                        return (
                          <div style={{ width: '100%', marginTop: 16 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                              <span style={{ fontSize: 12, color: C.ink3 }}>Principal {pPct}%</span>
                              <span style={{ fontSize: 12, color: C.ink3 }}>Interest {iPct}%</span>
                            </div>
                            <div style={{ height: 6, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }}>
                              <div style={{ height: '100%', width: `${pPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Ladder timeline table */}
                  <div style={{ borderTop: `1px solid ${C.border}`, padding: mobile ? '16px 18px' : '24px 40px' }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: C.ink, margin: '0 0 16px' }}>Tranche-by-Tranche Maturity Timeline</p>
                    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                      {mobile && <p style={{ fontSize: 11, color: C.ink3, margin: '0 0 8px', animation: 'swipeHint 1.2s ease-in-out' }}>Swipe to see full table</p>}
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>
                          FD ladder: 5 equal tranches, each maturing 1 year apart. Rates increase by 0.10% per tranche.
                        </caption>
                        <thead>
                          <tr>
                            <th scope="col" style={thS}>Tranche</th>
                            <th scope="col" style={thS}>Tenure</th>
                            <th scope="col" style={thR}>Rate</th>
                            <th scope="col" style={thR}>Principal</th>
                            <th scope="col" style={thR}>Maturity</th>
                            <th scope="col" style={thR}>Interest</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ladderTranches.map((t, i) => (
                            <tr key={t.tranche} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                              <td style={{ ...tdL, fontWeight: 700, color: C.dark }}>Tranche {t.tranche}</td>
                              <td style={tdL}>{t.tenure} year{t.tenure > 1 ? 's' : ''}</td>
                              <td style={tdR}>{t.rate.toFixed(2)}%</td>
                              <td style={tdR}>{fmtIN(t.principal)}</td>
                              <td style={{ ...tdR, color: '#166534', fontWeight: 700 }}>{fmtIN(t.maturity)}</td>
                              <td style={tdR}>{fmtIN(t.interest)}</td>
                            </tr>
                          ))}
                          <tr style={{ background: C.bg }}>
                            <td colSpan={3} style={{ ...tdL, fontWeight: 700, color: C.dark }}>Total</td>
                            <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>{fmtIN(ladderTotal)}</td>
                            <td style={{ ...tdR, fontWeight: 800, color: C.dark }}>{fmtIN(ladderCorpus)}</td>
                            <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>{fmtIN(ladderTotalInterest)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bank FD Rate Table */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, marginBottom: 36, overflow: 'hidden' }}>
              <div style={{ padding: mobile ? '16px 20px' : '20px 32px', borderBottom: `1px solid ${C.border}` }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: C.ink, margin: 0 }}>FD Interest Rates: Major Banks (July 2026)</h2>
              </div>
              <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', padding: mobile ? '0' : '0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '10px 24px', textAlign: 'left' }}>
                    Rates are indicative and subject to change. Senior citizen rates include the additional premium. Verify with your bank before investing.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" style={thS}>Bank</th>
                      <th scope="col" style={thR}>1 Year</th>
                      <th scope="col" style={thR}>2 Year</th>
                      <th scope="col" style={thR}>3 Year</th>
                      <th scope="col" style={thR}>5 Year</th>
                      <th scope="col" style={thR}>Senior Citizen (extra)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { bank: 'SBI',             r1: '6.80%', r2: '7.00%', r3: '6.75%', r5: '6.50%', sc: '+0.50%' },
                      { bank: 'HDFC Bank',        r1: '7.00%', r2: '7.00%', r3: '7.00%', r5: '7.00%', sc: '+0.50%' },
                      { bank: 'ICICI Bank',       r1: '6.90%', r2: '7.00%', r3: '7.00%', r5: '7.00%', sc: '+0.50%' },
                      { bank: 'Axis Bank',        r1: '7.10%', r2: '7.15%', r3: '7.10%', r5: '7.00%', sc: '+0.50%' },
                      { bank: 'Kotak Mahindra',   r1: '7.10%', r2: '7.10%', r3: '7.10%', r5: '6.20%', sc: '+0.50%' },
                      { bank: 'Bank of Baroda',   r1: '6.85%', r2: '7.00%', r3: '7.00%', r5: '6.50%', sc: '+0.50%' },
                      { bank: 'Canara Bank',      r1: '6.70%', r2: '6.80%', r3: '6.70%', r5: '6.70%', sc: '+0.50%' },
                      { bank: 'PNB',              r1: '6.80%', r2: '6.80%', r3: '6.80%', r5: '6.50%', sc: '+0.80%' },
                      { bank: 'Yes Bank',         r1: '7.75%', r2: '7.75%', r3: '7.25%', r5: '7.25%', sc: '+0.50%' },
                      { bank: 'IndusInd Bank',    r1: '7.25%', r2: '7.25%', r3: '7.25%', r5: '7.25%', sc: '+0.50%' },
                      { bank: 'IDFC First Bank',  r1: '7.50%', r2: '7.50%', r3: '7.50%', r5: '7.00%', sc: '+0.50%' },
                      { bank: 'Post Office (NSC)',r1: '7.10%', r2: 'N/A',   r3: '7.70%', r5: 'N/A',   sc: 'Same' },
                    ].map((row, i) => (
                      <tr key={row.bank} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.dark }}>{row.bank}</td>
                        <td style={tdR}>{row.r1}</td>
                        <td style={tdR}>{row.r2}</td>
                        <td style={tdR}>{row.r3}</td>
                        <td style={tdR}>{row.r5}</td>
                        <td style={tdR}>{row.sc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* WaitlistCard */}
            <SaveResultsCard mobile={mobile} />

            

            {/* Article */}
            <article itemScope itemType="https://schema.org/Article">

              <h2 id="what-is-fd-calculator" style={{ fontSize: mobile ? 20 : 23, fontWeight: 700, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.015em' }}>
                What is a fixed deposit (FD) calculator?
              </h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 16px' }}>
                A fixed deposit calculator computes the exact maturity amount and total interest earned on a bank FD by applying the compound interest formula to your principal, rate, tenure, and compounding frequency. Instead of working through the math manually, you enter your deposit details and get the maturity value instantly.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 24px' }}>
                This calculator covers both cumulative and non-cumulative modes, handles tenures as short as 7 days, and shows the effective annual yield when compounding is more frequent than annual. The FD Ladder tab adds a second dimension: it shows how splitting one large deposit into five staggered tranches generates more interest while releasing a portion every year.
              </p>

              <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 24 }}>
                <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                  A fixed deposit (FD) is a financial instrument offered by Indian banks and post offices that locks a sum at a guaranteed interest rate for a fixed tenure ranging from 7 days to 10 years. Per RBI guidelines, all bank FDs in India are insured up to Rs 5 lakh per depositor per bank under the DICGC scheme.
                </p>
              </div>

              <h2 id="fd-interest-calculation" style={{ fontSize: mobile ? 20 : 23, fontWeight: 700, color: C.ink, margin: '32px 0 14px', letterSpacing: '-0.015em' }}>
                How FD interest is calculated in India
              </h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 14px' }}>
                Indian banks use compound interest for cumulative FDs. The formula is A = P x (1 + r/n)^(n x t), where P is principal, r is annual rate as a decimal, n is compounding frequency per year, and t is tenure in years. Most banks compound quarterly (n = 4), which is the market standard. Monthly compounding (n = 12) yields slightly more.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 14px' }}>
                A Rs 1 lakh FD at 7% for 1 year compounded quarterly matures at Rs 1,07,186. The same FD compounded monthly returns Rs 1,07,229. The difference widens with longer tenures and higher rates.
              </p>
              <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginBottom: 24 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>
                    FD maturity on Rs 1 lakh at 7% p.a. by compounding frequency and tenure.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" style={thS}>Tenure</th>
                      <th scope="col" style={thR}>Monthly (n=12)</th>
                      <th scope="col" style={thR}>Quarterly (n=4)</th>
                      <th scope="col" style={thR}>Annually (n=1)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { t: '1 year',  m: 'Rs 1,07,229', q: 'Rs 1,07,186', a: 'Rs 1,07,000' },
                      { t: '2 years', m: 'Rs 1,15,026', q: 'Rs 1,14,889', a: 'Rs 1,14,490' },
                      { t: '3 years', m: 'Rs 1,23,333', q: 'Rs 1,23,144', a: 'Rs 1,22,504' },
                      { t: '5 years', m: 'Rs 1,41,783', q: 'Rs 1,41,478', a: 'Rs 1,40,255' },
                    ].map((r, i) => (
                      <tr key={r.t} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                        <td style={tdL}>{r.t}</td>
                        <td style={tdR}>{r.m}</td>
                        <td style={tdR}>{r.q}</td>
                        <td style={tdR}>{r.a}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 id="fd-rates-2026" style={{ fontSize: mobile ? 20 : 23, fontWeight: 700, color: C.ink, margin: '32px 0 14px', letterSpacing: '-0.015em' }}>
                FD interest rates: SBI, HDFC, ICICI, Axis, Kotak (2026)
              </h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 14px' }}>
                Yes Bank leads among mainstream banks at 7.75% for 1-year and 2-year FDs as of July 2026. IDFC First Bank offers 7.50% for most tenures. SBI, the largest public-sector bank, offers 6.80% for 1 year rising to 7.00% for 2 years. The full comparison table is above the article, with rates for all 12 banks including Post Office NSC.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 24px' }}>
                Use the <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SIP Calculator</Link> alongside this FD calculator if you want to compare whether deploying the same capital in a monthly mutual fund SIP would deliver a better risk-adjusted return over your planned tenure.
              </p>

              <h2 id="cumulative-vs-noncumulative" style={{ fontSize: mobile ? 20 : 23, fontWeight: 700, color: C.ink, margin: '32px 0 14px', letterSpacing: '-0.015em' }}>
                Cumulative vs non-cumulative FD: which pays more?
              </h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 14px' }}>
                Cumulative FDs pay more total interest because the interest reinvests and itself earns returns. A Rs 2 lakh FD at 7.50% for 3 years cumulative matures at Rs 2,48,432, whereas the non-cumulative version returns just Rs 2 lakh at maturity (with Rs 45,000 paid out in Rs 1,250 monthly instalments across 36 months). The cumulative version earns Rs 3,432 more.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 24px' }}>
                Non-cumulative FDs suit retirees whose monthly expenses depend on investment income. If you do not need the monthly cash flow, cumulative is always the higher-return choice.
              </p>

              {/* In-content promo bar */}
              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>PPF Calculator</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Compare FD returns against PPF at 7.10% with EEE tax status over 15 years.</p>
                </div>
                <Link className="fx-btn" href="/calculators/ppf-calculator" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  Open calculator
                </Link>
              </div>

              <h2 id="fd-laddering" style={{ fontSize: mobile ? 20 : 23, fontWeight: 700, color: C.ink, margin: '32px 0 14px', letterSpacing: '-0.015em' }}>
                What is FD laddering and why does it work?
              </h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 14px' }}>
                FD laddering divides a lump sum across multiple FDs with staggered maturities (1 year, 2 years, 3 years, and so on) so a portion matures every year rather than all at once. The annual maturity gives steady liquidity without requiring a premature withdrawal that would trigger a penalty.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 14px' }}>
                Laddering also reduces interest rate risk. If rates rise in year 2, only one tranche comes up for renewal; the rest continue at their locked-in rates. If rates fall, the long tranches protect you by continuing to earn the higher original rate.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 24px' }}>
                A five-tranche ladder typically earns more total interest than parking everything in a single 1-year FD renewed every year, because the 3-year and 5-year tranches earn higher rates. The FD Ladder tab above calculates the precise difference.
              </p>

              <h2 id="fd-ladder-example" style={{ fontSize: mobile ? 20 : 23, fontWeight: 700, color: C.ink, margin: '32px 0 14px', letterSpacing: '-0.015em' }}>
                How to build an FD ladder with Rs 5 lakh
              </h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 14px' }}>
                Divide Rs 5 lakh into five tranches of Rs 1 lakh each. Tranche 1 goes into a 1-year FD at the current 1-year rate. Tranche 2 into a 2-year FD, and so on through tranche 5 in a 5-year FD at the best available long-term rate. As each tranche matures annually, reinvest it in a new 5-year FD.
              </p>
              <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginBottom: 24 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>
                    Illustrative 5-lakh FD ladder at a 7% base rate (quarterly compounding). Rates step up 0.10% per tranche.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" style={thS}>Tranche</th>
                      <th scope="col" style={thR}>Tenure</th>
                      <th scope="col" style={thR}>Rate</th>
                      <th scope="col" style={thR}>Principal</th>
                      <th scope="col" style={thR}>Maturity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { t: 'Tranche 1', tenure: '1 year',  rate: '7.00%', p: 'Rs 1,00,000', m: 'Rs 1,07,186' },
                      { t: 'Tranche 2', tenure: '2 years', rate: '7.10%', p: 'Rs 1,00,000', m: 'Rs 1,14,972' },
                      { t: 'Tranche 3', tenure: '3 years', rate: '7.20%', p: 'Rs 1,00,000', m: 'Rs 1,23,654' },
                      { t: 'Tranche 4', tenure: '4 years', rate: '7.30%', p: 'Rs 1,00,000', m: 'Rs 1,33,328' },
                      { t: 'Tranche 5', tenure: '5 years', rate: '7.40%', p: 'Rs 1,00,000', m: 'Rs 1,43,198' },
                    ].map((r, i) => (
                      <tr key={r.t} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.dark }}>{r.t}</td>
                        <td style={tdR}>{r.tenure}</td>
                        <td style={tdR}>{r.rate}</td>
                        <td style={tdR}>{r.p}</td>
                        <td style={{ ...tdR, color: '#166534', fontWeight: 700 }}>{r.m}</td>
                      </tr>
                    ))}
                    <tr style={{ background: C.bg }}>
                      <td colSpan={3} style={{ ...tdL, fontWeight: 700, color: C.dark }}>Total (5 tranches)</td>
                      <td style={{ ...tdR, fontWeight: 700 }}>Rs 5,00,000</td>
                      <td style={{ ...tdR, fontWeight: 800, color: C.dark }}>Rs 6,22,338</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 24px' }}>
                After year 5, all tranches are on 5-year cycles at the best available rate. You receive Rs 1 lakh+ annually without ever breaking an active FD early.
              </p>

              <h2 id="senior-citizen-fd" style={{ fontSize: mobile ? 20 : 23, fontWeight: 700, color: C.ink, margin: '32px 0 14px', letterSpacing: '-0.015em' }}>
                Senior citizen FD rates: 0.25-0.80% extra across banks
              </h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 14px' }}>
                Senior citizens (aged 60 and above) receive an additional 0.25% to 0.80% interest above the regular rate at most Indian banks. SBI, HDFC Bank, ICICI Bank, Axis Bank, and Kotak Mahindra all offer a standard +0.50% premium. PNB offers up to +0.80% on some tenures.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 14px' }}>
                The Senior Citizen Savings Scheme (SCSS) from the post office currently earns 8.20% per annum, payable quarterly, and is the highest government-guaranteed rate available to senior citizens. It has a 5-year tenure extendable by 3 years, with a maximum deposit of Rs 30 lakh. Use the <Link href="/calculators/scss-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SCSS Calculator</Link> to check your exact quarterly payout.
              </p>

              <h2 id="post-office-fd" style={{ fontSize: mobile ? 20 : 23, fontWeight: 700, color: C.ink, margin: '32px 0 14px', letterSpacing: '-0.015em' }}>
                Post office FD vs bank FD: which is better?
              </h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 14px' }}>
                Post office time deposits carry sovereign guarantee (backed by the central government), while bank FDs are insured only up to Rs 5 lakh per depositor per bank under the DICGC scheme. For amounts above Rs 5 lakh in a single bank, post office schemes offer a meaningful safety advantage.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 24px' }}>
                On returns, IDFC First Bank (7.50%) and Yes Bank (7.75%) offer higher rates than the post office (7.10% for 1-year NSC) but without the sovereign guarantee. The 3-year post office NSC at 7.70% is competitive with the best private bank rates and carries no credit risk.
              </p>

              <h2 id="tax-on-fd" style={{ fontSize: mobile ? 20 : 23, fontWeight: 700, color: C.ink, margin: '32px 0 14px', letterSpacing: '-0.015em' }}>
                Tax on FD interest: TDS and how to avoid it with Form 15G/15H
              </h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 14px' }}>
                FD interest is fully taxable as income in the year it accrues, even for cumulative FDs where interest is not physically received. Banks deduct TDS at 10% once FD interest exceeds Rs 40,000 per financial year (Rs 50,000 for senior citizens), per the Income Tax Act.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 14px' }}>
                If your total income is below the basic exemption limit (Rs 3 lakh for general taxpayers, Rs 3.5 lakh for senior citizens under the new regime), submit Form 15G (below 60 years) or Form 15H (above 60 years) to your bank at the start of each April. This stops TDS deduction at source. Submitting these forms does not eliminate tax liability; you must still declare the income in your ITR.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 24px' }}>
                For high-income depositors in the 30% tax bracket, the post-tax yield on a 7% FD falls to approximately 4.9%. In this case, the <Link href="/calculators/ppf-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>PPF Calculator</Link> is worth running: PPF earns 7.10% with EEE tax status (exempt at contribution, accumulation, and maturity), making it materially more efficient for long-term savings in higher tax brackets.
              </p>

              <h2 id="fd-vs-rd-vs-ppf" style={{ fontSize: mobile ? 20 : 23, fontWeight: 700, color: C.ink, margin: '32px 0 14px', letterSpacing: '-0.015em' }}>
                FD vs RD vs PPF: which is right for your goal?
              </h2>
              <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginBottom: 24 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>
                    FD vs RD vs PPF comparison for Indian investors. Rates as of July 2026.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" style={thS}>Feature</th>
                      <th scope="col" style={thS}>FD</th>
                      <th scope="col" style={thS}>RD</th>
                      <th scope="col" style={thS}>PPF</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { f: 'Rate (Jul 2026)',        fd: '6.50-7.75%',    rd: '5.50-6.80%',    ppf: '7.10%' },
                      { f: 'Minimum deposit',        fd: 'Rs 1,000',      rd: 'Rs 100/month',   ppf: 'Rs 500/year' },
                      { f: 'Lock-in',                fd: '7D to 10Y',     rd: '6M to 10Y',      ppf: '15 years' },
                      { f: 'Tax on interest',        fd: 'Fully taxable', rd: 'Fully taxable',  ppf: 'Exempt (EEE)' },
                      { f: 'Premature withdrawal',   fd: 'Penalty 0.5-1%',rd: 'Penalty 1-2%',   ppf: 'After 5Y (partial)' },
                      { f: 'Suitable for',           fd: 'Short/medium',  rd: 'Monthly savers', ppf: 'Long-term (15Y+)' },
                    ].map((r, i) => (
                      <tr key={r.f} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                        <td style={{ ...tdL, fontWeight: 600 }}>{r.f}</td>
                        <td style={tdL}>{r.fd}</td>
                        <td style={tdL}>{r.rd}</td>
                        <td style={tdL}>{r.ppf}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* In-content promo bar 2 */}
              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>RD Calculator</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Calculate recurring deposit maturity and compare against FD for the same monthly saving amount.</p>
                </div>
                <Link className="fx-btn" href="/calculators/rd-calculator" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  Open calculator
                </Link>
              </div>

              <h2 id="breaking-fd-early" style={{ fontSize: mobile ? 20 : 23, fontWeight: 700, color: C.ink, margin: '32px 0 14px', letterSpacing: '-0.015em' }}>
                How to break an FD early without losing too much interest
              </h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 14px' }}>
                Breaking an FD before maturity triggers a penalty that most banks set at 0.50% to 1.00% below the rate applicable for the holding period. If you invested at 7.50% for 3 years and break after 18 months, the bank applies the 18-month rate (say 7.00%) minus a 1% penalty, so you earn 6.00% instead of 7.50% for the time you held it.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 24px' }}>
                A better alternative: take a loan against your FD. Most banks offer overdraft facilities at 1-2% above the FD rate, letting you access funds without breaking the deposit. For a Rs 3 lakh FD earning 7.50%, a loan at 8.50% costs much less than the interest loss from breaking the FD early, especially if you need the money for a short period.
              </p>

              <h2 id="how-to-use" style={{ fontSize: mobile ? 20 : 23, fontWeight: 700, color: C.ink, margin: '32px 0 14px', letterSpacing: '-0.015em' }}>
                How to use this FD calculator
              </h2>
              <ol style={{ margin: '0 0 24px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>FD Calculator tab:</strong> Set principal (Rs 10K to Rs 50L), interest rate (4% to 10%), and choose a tenure preset from 7 days to 5 years. Pick compounding frequency (Quarterly is the Indian bank standard). Toggle Cumulative to see total maturity; toggle Non-Cumulative to see monthly payouts.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Year-by-year table:</strong> Click "Year-by-Year Growth" below the calculator to expand the annual breakdown showing opening balance, interest earned, and closing balance for each year.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>FD Ladder tab:</strong> Enter your total investment (Rs 1L to Rs 1Cr) and base rate. The calculator splits it across 5 equal tranches (1Y to 5Y) with rates stepping up by 0.10% per tranche, compounding quarterly. Compare the total corpus against a single 5Y FD and see the liquidity benefit.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Bank rate table:</strong> The table below the calculator shows July 2026 rates for 12 banks. Use these to set a realistic rate in the slider, or check whether your bank's current offer is competitive.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Currency conversion:</strong> Click the currency selector at the top-right of the input panel to convert all amounts to USD, EUR, GBP, or other currencies for NRI planning.
                </li>
              </ol>

              

              <h2 id="faq" style={{ fontSize: mobile ? 20 : 23, fontWeight: 700, color: C.ink, margin: '32px 0 16px', letterSpacing: '-0.015em' }}>
                Frequently asked questions
              </h2>
              <FAQ items={faqItems} />

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All calculations on this page are indicative only. Interest rates shown are based on publicly available data as of July 2026 and are subject to change without notice. Verify current rates directly with your bank before investing. This calculator is for educational and planning purposes only and does not constitute financial advice. FD returns are not guaranteed beyond the DICGC insurance limit of Rs 5 lakh per depositor per bank. Consult a SEBI-registered investment adviser before making investment decisions.
                </p>
              </div>
            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .fdl-sidebar::-webkit-scrollbar { width: 5px; }
            .fdl-sidebar::-webkit-scrollbar-track { background: transparent; }
            .fdl-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .fdl-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            className="fdl-sidebar"
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
              <div style={{ flexShrink: 0 }}>
                <FDSnapshot />
              </div>
              <div style={{ flexShrink: 0 }}>
                <nav aria-label="Related Calculators">
                  <SidebarList title="Popular Calculators" items={POPULAR} />
                </nav>
              </div>
              <div style={{ flexShrink: 0 }}>
                <nav aria-label="More Calculators">
                  <SidebarList title="More Calculators" items={MORE} />
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: [ '/calculators/sip-calculator|SIP', '/calculators/fd-laddering-calculator|FD Calculator', '/calculators/ppf-calculator|PPF', '/calculators/rd-calculator|RD', '/calculators/nps-calculator|NPS', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/emi-calculator|EMI', '/calculators/income-tax-calculator|Income Tax', ]},
        { hd: 'Topics', links: ['/#|Fixed Deposits', '/#|Mutual Funds', '/#|Home Loans', '/#|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}


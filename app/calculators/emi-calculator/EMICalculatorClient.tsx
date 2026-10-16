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

/* ─── Palette - keep exactly from screenshot ────────────────── */
const C = {
  dark:      '#101214',
  lime:      '#a6dbc4',
  lime2:     '#2d9970',   /* chip border, donut interest ring   */
  paleLime:  '#f4f5f6',   /* chip bg, EMI box bg                */
  ink:       '#16140F',
  ink2:      '#50565c',
  ink3:      '#7a8087',
  white:     '#ffffff',
  bg:        '#f6f7f8',   /* page background                    */
  border:    '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

/* ─── Helpers ───────────────────────────────────────────────── */
// fmtIN and fmtC will be initialized inside the component using the currency context

/* ─── Math ──────────────────────────────────────────────────── */
function calcEMI(p: number, r: number, n: number) {
  if (n === 0) return 0;
  if (r === 0) return p / n;
  const m = r / 12 / 100;
  return (p * m * Math.pow(1 + m, n)) / (Math.pow(1 + m, n) - 1);
}
interface YRow { year: number; opening: number; prin: number; int: number; closing: number }
function buildAmort(p: number, r: number, n: number, emi: number): YRow[] {
  const rows: YRow[] = []; let bal = p;
  const m = r / 12 / 100, y0 = new Date().getFullYear();
  for (let y = 0; y < Math.ceil(n / 12); y++) {
    const open = bal; let yP = 0, yI = 0;
    const mo = Math.min(12, n - y * 12);
    for (let i = 0; i < mo; i++) {
      const iP = bal * m, pP = emi - iP;
      yI += iP; yP += pP; bal = Math.max(0, bal - pP);
    }
    rows.push({ year: y0 + y, opening: open, prin: yP, int: yI, closing: bal });
    if (bal <= 0) break;
  }
  return rows;
}

interface MRow { monthName: string; principal: number; interest: number; total: number }
interface YGroup { year: number; months: MRow[] }
const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function buildMonthlyAmort(p: number, r: number, n: number, emi: number): YGroup[] {
  const m = r / 12 / 100;
  const now = new Date();
  const s0 = now.getMonth(), y0 = now.getFullYear();
  let bal = p;
  const groups: YGroup[] = [];
  let curYear = y0;
  let cur: YGroup = { year: curYear, months: [] };
  for (let i = 0; i < n; i++) {
    if (bal <= 0) break;
    const abs = s0 + i;
    const yr = y0 + Math.floor(abs / 12);
    const mo = abs % 12;
    if (yr !== curYear) { groups.push(cur); curYear = yr; cur = { year: yr, months: [] }; }
    const interest = bal * m;
    const principal = Math.min(emi - interest, bal);
    bal = Math.max(0, bal - principal);
    cur.months.push({ monthName: MONTH_NAMES[mo], principal, interest, total: principal + interest });
  }
  if (cur.months.length) groups.push(cur);
  return groups;
}

/* ─── Donut - two-tone ring with center label ───────────────── */
function DonutChart({ principal, interest }: { principal: number; interest: number }) {
  const total = principal + interest;
  if (total === 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const pArc  = (principal / total) * circ;
  const pPct  = Math.round((principal / total) * 100);
  return (
    <svg width="216" height="216" viewBox="0 0 216 216" style={{ display: 'block' }}>
      {/* interest ring (background) */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      {/* principal arc (foreground) */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      {/* center label */}
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Principal</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
  );
}

/* ─── Slider ─────────────────────────────────────────────────── */
function Slider({ label, value, min, max, step, fmt, onChange, compact }: {
  label: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void; compact?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = ((value - min) / (max - min)) * 100;
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 40 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 16 }}>
        <label style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400 }}>{label}</label>
        {editing ? (
          <input autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.paleLime, border: `1.5px solid ${C.lime2}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 120, outline: 'none', color: C.dark, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: C.dark, background: C.paleLime, border: `1.5px solid ${C.lime2}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 18px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 90 : 110, textAlign: 'center' }}>
            {fmt(value)}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 20, height: 20, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 2px 8px rgba(16,18,20,0.22)', pointerEvents: 'none', zIndex: 1 }} />
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(+e.target.value)}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontSize: 11, color: C.ink3 }}>{fmt(min)}</span>
        <span style={{ fontSize: 11, color: C.ink3 }}>{fmt(max)}</span>
      </div>
    </div>
  );
}

/* ─── Sidebar list ──────────────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={label} href={href} style={{ textDecoration: 'none', display: 'block' }}>
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
  { href: '/calculators/sip-calculator',     label: 'SIP Calculator' },
  { href: '/calculators/lumpsum-calculator', label: 'Lumpsum Calculator' },
  { href: '/calculators/swp-calculator',     label: 'SWP Calculator' },
  { href: '/calculators/fd-calculator',      label: 'FD Calculator' },
  { href: '/calculators/gratuity-calculator',label: 'Gratuity Calculator' },
];
const MORE = [
  { href: '/calculators/home-loan-calculator',  label: 'Home Loan EMI Calculator' },
  { href: '/calculators/mortgage-calculator',   label: 'Mortgage Calculator' },
  { href: '/calculators/car-loan-calculator',   label: 'Car Loan EMI Calculator' },
];

/* ─── FAQ ───────────────────────────────────────────────────── */
const FAQS = [
  { q: 'How is EMI calculated?', a: 'EMI = [P × R × (1+R)^N] / [(1+R)^N – 1], where P is the principal, R is the monthly interest rate (annual ÷ 12 ÷ 100), and N is loan tenure in months. Banks use the reducing-balance method. Your EMI stays fixed but the principal-to-interest split changes every month.' },
  { q: 'Does a higher down payment lower my EMI?', a: 'Yes. EMI is directly proportional to the loan principal. Every extra rupee you pay as a down payment reduces the amount you borrow, which lowers your monthly instalment and total interest paid.' },
  { q: 'Shorter vs longer loan tenure: which is better?', a: 'Shorter tenure = higher EMI but far less total interest. Longer tenure = comfortable EMI but you pay more overall. Use the amortization schedule below to see the exact rupee difference before deciding.' },
  { q: 'What happens to my EMI when the RBI cuts rates?', a: 'For floating-rate loans linked to the repo rate, a rate cut usually reduces your EMI or shortens your tenure within 1–3 months. Fixed-rate loans are unaffected. Check your loan agreement.' },
  { q: 'Is prepayment always a good idea?', a: 'Prepayment saves interest but has an opportunity cost. Those funds could earn returns elsewhere. Compare your loan rate (after tax benefit, if applicable) against expected investment returns before deciding.' },
  { q: 'What is an amortization schedule?', a: 'An amortization schedule breaks down every EMI into its principal and interest components, year by year. In early years most of your EMI is interest; over time the principal component grows. Scroll down to see yours.' },
  { q: 'Fixed-rate vs floating-rate loan: what should I choose?', a: 'Fixed rate: predictable EMI, better for budgeting, slightly higher rate. Floating rate: fluctuates with the RBI benchmark, lower in rate-cut cycles, risky if rates rise. Most home loans in India today are floating-rate.' },
];
function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ════════════════════════════════════════════════════════════ */

export default function EMICalculatorClient() {
  const title = null;
  const defaultSettings = { amount: 2000000, rate: 9.0, tenureYr: 10, tenureMode: 'yr', tenureMo: 120 };
  const { settings, updateSettings } = useCalculatorSettings('emi-calculator', defaultSettings);
  const { amount, rate, tenureYr, tenureMode, tenureMo } = settings;
  const setAmount = (v: any) => updateSettings({ amount: typeof v === 'function' ? v(settings.amount) : v });
  const setRate = (v: any) => updateSettings({ rate: typeof v === 'function' ? v(settings.rate) : v });
  const setTenureYr = (v: any) => updateSettings({ tenureYr: typeof v === 'function' ? v(settings.tenureYr) : v });
  const setTenureMode = (v: any) => updateSettings({ tenureMode: typeof v === 'function' ? v(settings.tenureMode) : v });
  const setTenureMo = (v: any) => updateSettings({ tenureMo: typeof v === 'function' ? v(settings.tenureMo) : v });
          const [mobile,     setMobile]     = useState(false);
  const [showAmort,  setShowAmort]  = useState(false);
  const [openYears,  setOpenYears]  = useState<Set<number>>(new Set());

  const { formatCurrency, convertCurrency, selectedCurrency } = useCurrency();

  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const months   = tenureMode === 'yr' ? tenureYr * 12 : tenureMo;
  const emi      = useMemo(() => calcEMI(amount, rate, months), [amount, rate, months]);
  const totalPay = emi * months;
  const totalInt = totalPay - amount;
  const prinPct  = Math.round((amount / totalPay) * 100);
  const intPct   = 100 - prinPct;
  const amortRows    = useMemo(() => buildAmort(amount, rate, months, emi), [amount, rate, months, emi]);
  const monthlyGroups = useMemo(() => buildMonthlyAmort(amount, rate, months, emi), [amount, rate, months, emi]);

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      {/* NAV */}
      <PageNav />

      {/* BODY */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 28px', letterSpacing: '-0.025em' }}>{title || `EMI Calculator`}</h1>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          {/* LEFT */}
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
                    {!mobile ? (
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Loan Details</p>
                    ) : (
                      <div />
                    )}
                    <CurrencySelector theme="light" />
                  </div>

                  <Slider label="Loan Amount" value={amount} min={10000} max={50000000} step={10000}
                    fmt={v => fmtC(v)} onChange={setAmount} compact={mobile} />
                  <Slider label="Rate of Interest (p.a.)" value={rate} min={1} max={36} step={0.05}
                    fmt={v => `${v.toFixed(2)}%`} onChange={setRate} compact={mobile} />

                  {/* Tenure + toggle */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: mobile ? 10 : 16 }}>
                      <label style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400 }}>Loan Tenure</label>
                      <div style={{ display: 'flex', background: '#f4f5f6', borderRadius: 8, padding: 3 }}>
                        {(['yr', 'mo'] as const).map(m => (
                          <button key={m} onClick={() => setTenureMode(m)} style={{ padding: mobile ? '4px 10px' : '5px 14px', borderRadius: 6, border: 'none', background: tenureMode === m ? C.white : 'transparent', color: tenureMode === m ? C.ink : C.ink3, fontFamily: INTER, fontSize: 13, fontWeight: 600, cursor: 'pointer', boxShadow: tenureMode === m ? '0 1px 4px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.15s' }}>
                            {m === 'yr' ? 'Years' : 'Months'}
                          </button>
                        ))}
                      </div>
                    </div>
                    {tenureMode === 'yr'
                      ? <Slider label="" value={tenureYr} min={1} max={30} step={1} fmt={v => `${v} Yr`} onChange={v => { setTenureYr(v); setTenureMo(v * 12); }} compact={mobile} />
                      : <Slider label="" value={tenureMo} min={1} max={360} step={1} fmt={v => `${v} Mo`} onChange={v => { setTenureMo(v); setTenureYr(Math.round(v / 12)); }} compact={mobile} />}
                  </div>
                </div>

                {/* Results panel */}
                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  {/* On mobile: show EMI + stats FIRST, donut below */}

                  {/* Monthly EMI highlight box */}
                  <div style={{ width: '100%', background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 12, padding: mobile ? '12px 16px' : '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.dark }}>Monthly EMI</span>
                    <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: C.dark, letterSpacing: '-0.02em' }}>{fmtIN(emi)}</span>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: 'Principal amount',     value: fmtC(amount) },
                    { label: 'Total interest',       value: fmtC(totalInt) },
                    { label: 'Total amount payable', value: fmtC(totalPay) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '15px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  {/* Donut - below stats on mobile, above on desktop */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 24, order: mobile ? 1 : -1 }}>
                    <DonutChart principal={amount} interest={totalInt} />
                  </div>

                  {/* Legend */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 22, marginBottom: mobile ? 8 : 28, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Principal amount</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Interest amount</span>
                    </div>
                  </div>

                  {/* Split bar */}
                  <div style={{ width: '100%', marginTop: mobile ? 8 : 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Principal {prinPct}%</span>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Interest {intPct}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${prinPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>

                </div>
              </div>

              {/* Amortization toggle */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowAmort(v => !v)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '20px 48px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.ink }}>Your Amortization Details</span>
                    {!mobile && <span style={{ fontSize: 13, color: C.ink3, marginLeft: 10 }}>(Yearly / Monthly)</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 8 : 12, flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.dark, background: C.paleLime, border: `1px solid ${C.lime2}`, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {amortRows.length} yr · {months} mo
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      style={{ transform: showAmort ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {showAmort && (
                  <div style={{ borderTop: `1px solid ${C.border}` }}>
                    {mobile ? (
                      /* ── MOBILE: year accordion with monthly rows ── */
                      <div>
                        {monthlyGroups.map(g => {
                          const isOpen = openYears.has(g.year);
                          return (
                            <div key={g.year} style={{ borderBottom: `1px solid ${C.border}` }}>
                              <button
                                onClick={() => setOpenYears(prev => {
                                  const next = new Set(prev);
                                  isOpen ? next.delete(g.year) : next.add(g.year);
                                  return next;
                                })}
                                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER }}
                              >
                                <span style={{ fontSize: 15, fontWeight: 600, color: C.ink }}>{g.year}</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                  style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                                  <polyline points="6 9 12 15 18 9" />
                                </svg>
                              </button>
                              {isOpen && (
                                <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
                                  <table style={{ minWidth: 380, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                                    <thead>
                                      <tr style={{ background: '#f4f5f6' }}>
                                        {['Month', 'Principal Paid', 'Interest Charged', 'Total Payment'].map(h => (
                                          <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {g.months.map((row, i) => (
                                        <tr key={i} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                          <td style={{ padding: '11px 14px', fontWeight: 600, color: C.ink }}>{row.monthName}</td>
                                          <td style={{ padding: '11px 14px', color: '#1f7a58', fontWeight: 600 }}>{fmtIN(row.principal)}</td>
                                          <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtIN(row.interest)}</td>
                                          <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtIN(row.total)}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      /* ── DESKTOP: yearly summary table ── */
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              {['Year', 'Opening Balance', 'Principal Paid', 'Interest Paid', 'Closing Balance'].map(h => (
                                <th key={h} style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {amortRows.map((row, i) => (
                              <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ padding: '13px 24px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                                <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.opening)}</td>
                                <td style={{ padding: '13px 24px', color: '#1f7a58', fontWeight: 600 }}>{fmtIN(row.prin)}</td>
                                <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.int)}</td>
                                <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.closing)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* ARTICLE */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>
            <article style={{ fontFamily: INTER }}>

              {/* shared prose styles */}
              {(() => {
                const h2 = { fontSize: mobile ? 18 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
                const h3 = { fontSize: 16, fontWeight: 600, color: C.ink, margin: '0 0 6px' } as React.CSSProperties;
                const p  = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
                const sec = { margin: '0 0 40px' } as React.CSSProperties;
                const tdL = { padding: '11px 16px', fontSize: 14, color: C.ink2, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
                const tdR = { padding: '11px 16px', fontSize: 14, color: C.ink, fontWeight: 500, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
                const thS = { padding: '10px 16px', fontSize: 12, fontWeight: 600, color: C.ink3, background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap' } as React.CSSProperties;
                const bullet = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 } as React.CSSProperties;
                return (
                  <>
                    {/* 1 */}
                    <div style={sec}>
                      <h2 style={h2}>What is EMI?</h2>
                      <p style={p}>
                        EMI stands for Equated Monthly Instalment. It is the fixed amount a borrower pays to the lender on a set date every month until the loan is fully repaid. Each instalment has two components: the principal, which is the portion of the loan being repaid, and the interest charged on the outstanding balance.
                      </p>
                      <p style={p}>
                        The Indian credit market is currently passing through a phase of strong-rooted financial growth. It is one of the fastest growing credit markets in the world, recording a CAGR of over 11% year on year. A large number of individuals are availing personal loans, home loans, and car loans to meet their financial goals. Knowing your EMI before you borrow helps you plan your monthly budget and avoid repayment stress.
                      </p>
                    </div>

                    {/* 2 */}
                    <div style={sec}>
                      <h2 style={h2}>How can this EMI calculator help you?</h2>
                      <p style={p}>
                        Regardless of the type of loan, it is important to know the monthly instalment you will need to pay before you avail it. This EMI calculator helps you in the following ways:
                      </p>
                      <div>
                        {[
                          'It gives you an accurate estimate of your monthly EMI so you can plan your finances accordingly.',
                          'It saves time. You do not have to perform complex calculations manually.',
                          'It eliminates the possibility of a calculation error and gives you a precise result every time.',
                          'It lets you compare multiple scenarios instantly by changing the loan amount, rate, or tenure.',
                          'It generates a year-wise amortization schedule so you can see how your outstanding balance reduces over time.',
                        ].map((t, i) => (
                          <div key={i} style={bullet}>
                            <span style={{ flexShrink: 0, marginTop: 3 }}>&#8226;</span>
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3 */}
                    <div style={sec}>
                      <h2 style={h2}>The formula to calculate EMI</h2>
                      <p style={p}>The following standardised formula is used to calculate the EMI for any loan:</p>
                      <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, fontFamily: 'monospace', margin: '0 0 16px', padding: '12px 0' }}>
                        EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
                      </p>
                      <p style={{ ...p, margin: '0 0 16px' }}>In the formula the letters represent the following:</p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}` }}>
                          <thead>
                            <tr>
                              <th style={{ ...thS, width: 80 }}>Variable</th>
                              <th style={thS}>Meaning</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['P', 'The principal loan amount'],
                              ['R', 'The monthly interest rate (annual rate divided by 12 divided by 100)'],
                              ['N', 'The number of monthly instalments (loan tenure in months)'],
                              ['EMI', 'Equated Monthly Instalment'],
                            ].map(([v, m]) => (
                              <tr key={v}>
                                <td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{v}</td>
                                <td style={tdR}>{m}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 4 */}
                    <div style={sec}>
                      <h2 style={h2}>Example of EMI calculation</h2>
                      <p style={p}>
                        If the principal amount is Rs. 10 Lakh with a rate of interest of 10% per annum and a tenure of 5 years (60 months), the monthly interest rate R = 10 / 12 / 100 = 0.00833.
                      </p>
                      <p style={{ ...p, fontFamily: 'monospace', fontWeight: 600, color: C.ink }}>
                        EMI = [10,00,000 x 0.00833 x (1.00833)^60] / [(1.00833)^60 - 1] = Rs. 21,247
                      </p>
                      <p style={p}>
                        The EMI you will be liable to pay is Rs. 21,247 per month. Over 60 months you will pay a total of Rs. 12,74,820, of which Rs. 2,74,820 is the total interest and Rs. 10,00,000 is the principal repaid.
                      </p>
                    </div>

                    {/* 5 */}
                    <div style={sec}>
                      <h2 style={h2}>Factors affecting your EMI amount</h2>
                      <p style={p}>
                        There are three key factors you need to consider when calculating your equated monthly instalment:
                      </p>
                      <h3 style={h3}>Loan Amount</h3>
                      <p style={p}>
                        The loan amount is the principal you borrow from the lender. A higher loan amount results in a higher EMI for the same interest rate and tenure. Making a larger down payment reduces the principal and therefore reduces your monthly outgo.
                      </p>
                      <h3 style={h3}>Rate of Interest</h3>
                      <p style={p}>
                        The interest rate is the cost charged by the lender on the outstanding principal. Even a difference of 0.25% can add a meaningful amount to your total interest over a long tenure. Comparing rates from at least three lenders before taking a loan is advisable.
                      </p>
                      <h3 style={h3}>Loan Tenure</h3>
                      <p style={{ ...p, margin: 0 }}>
                        A longer tenure reduces your monthly EMI but increases the total interest you pay over the life of the loan. A shorter tenure means a higher monthly payment but significantly lower total interest. Use the amortization schedule in the calculator above to see the exact rupee difference for your specific loan.
                      </p>
                    </div>

                    {/* 6 */}
                    <div style={sec}>
                      <h2 style={h2}>Types of EMI calculators</h2>
                      <p style={p}>
                        The same EMI formula applies to all loan types. The parameters that differ are the applicable interest rate range, maximum tenure, and eligibility conditions.
                      </p>
                      <h3 style={h3}>Home Loan EMI Calculator</h3>
                      <p style={p}>
                        Home loans involve large principal amounts and long tenures of up to 30 years. A small difference in the interest rate can result in lakhs of rupees of additional interest over the full tenure. Use this calculator to evaluate different lenders and decide on a tenure that balances your monthly budget against total interest cost.
                      </p>
                      <h3 style={h3}>Car Loan EMI Calculator</h3>
                      <p style={p}>
                        Car loans typically run from 1 to 7 years at interest rates between 8% and 14% per annum. Calculating your EMI before visiting the showroom helps you determine how much down payment to make and ensures the monthly instalment fits within your budget.
                      </p>
                      <h3 style={h3}>Personal Loan EMI Calculator</h3>
                      <p style={p}>
                        Personal loans are unsecured loans that carry relatively higher interest rates, typically between 10% and 24% per annum, with tenures of 1 to 5 years. Because the rate is higher, the total interest can be a significant portion of the principal. Calculating the real cost before applying helps you decide whether borrowing is the right choice.
                      </p>
                      <h3 style={h3}>Education Loan EMI Calculator</h3>
                      <p style={{ ...p, margin: 0 }}>
                        Education loans often include a moratorium period covering the study duration plus 6 to 12 months after graduation. Repayment begins only after this period ends. Using a calculator helps you plan your finances for the post-graduation phase well in advance.
                      </p>
                    </div>

                    {/* 7 */}
                    <div style={sec}>
                      <h2 style={h2}>How to use this EMI calculator</h2>
                      <p style={p}>The calculator requires three inputs:</p>
                      <div>
                        {[
                          { label: 'Loan Amount', text: 'Enter the total amount you plan to borrow. You can use the slider or click the displayed value to type a specific number.' },
                          { label: 'Rate of Interest', text: 'Enter the annual interest rate quoted by your bank or lender.' },
                          { label: 'Loan Tenure', text: 'Select whether you want to enter tenure in years or months, then set the value using the slider.' },
                        ].map((it, i) => (
                          <div key={i} style={bullet}>
                            <span style={{ flexShrink: 0, marginTop: 3 }}>&#8226;</span>
                            <span><strong>{it.label}:</strong> {it.text}</span>
                          </div>
                        ))}
                      </div>
                      <p style={{ ...p, margin: '12px 0 0' }}>
                        Once you enter the values, the monthly EMI, total interest, and total amount payable are calculated and displayed instantly. You can also expand the amortization schedule to see a year-by-year breakdown of principal repaid, interest paid, and the outstanding balance.
                      </p>
                    </div>

                    {/* 8 */}
                    <div style={{ margin: '0 0 40px' }}>
                      <h2 style={h2}>Frequently asked questions</h2>
            <FAQ />
                    </div>
                  </>
                );
              })()}
            </article>

          </div>

          {/* SIDEBAR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SidebarList title="Popular Calculators" items={POPULAR} />
            <SidebarList title="More EMI Calculators" items={MORE} />
          </div>

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

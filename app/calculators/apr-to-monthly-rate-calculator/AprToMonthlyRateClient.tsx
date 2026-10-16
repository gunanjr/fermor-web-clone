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
function DonutChart({ principal, annualInterest }: { principal: number; annualInterest: number }) {
  const total = principal + annualInterest;
  const principalPct = total > 0 ? (principal / total) * 100 : 80;
  const r = 40;
  const circ = 2 * Math.PI * r;
  const strokeDashoffset = circ - (principalPct / 100) * circ;
  return (
    <svg width="140" height="140" viewBox="0 0 100 100" role="img" aria-label={`Balance split: ${Math.round(principalPct)}% Principal, ${Math.round(100 - principalPct)}% Annual Interest Amount`}>
      <circle cx="50" cy="50" r={r} fill="none" stroke={CHART_PAIR.secondary} strokeWidth="16" />
      <circle cx="50" cy="50" r={r} fill="none" stroke={CHART_PAIR.primary} strokeWidth="16"
        strokeDasharray={circ} strokeDashoffset={strokeDashoffset}
        transform="rotate(-90 50 50)" style={{ transition: 'stroke-dashoffset 0.4s ease' }} />
      <text x="50" y="46" textAnchor="middle" fill={C.ink} fontSize="10" fontWeight="700" fontFamily={INTER}>Annual Total</text>
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

function AprSnapshot() {
  const rows = [
    { label: 'Credit Card 42% APR', value: '3.5% / month' },
    { label: 'Personal Loan 18% APR', value: '1.5% / month' },
    { label: 'Home Loan 8.5% APR', value: '0.71% / month' },
    { label: 'Gold Loan 12% APR', value: '1.0% / month' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Common Rate Benchmarks</span>
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
    { href: '/calculators/credit-card-interest-calculator', label: 'Credit Card Interest Calculator: Minimum Due Math' },
    { href: '/calculators/personal-loan-calculator', label: 'Personal Loan EMI Calculator: Reducing Rate vs Flat Rate' },
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
  { href: '/calculators/credit-card-interest-calculator', label: 'Credit Card Interest Calculator' },
  { href: '/calculators/personal-loan-calculator', label: 'Personal Loan Calculator' },
  { href: '/calculators/emi-calculator', label: 'EMI Calculator' },
  { href: '/calculators/compound-interest-calculator', label: 'Compound Interest Calculator' },
];
const MORE_TOOLS = [
  { href: '/calculators/cagr-calculator', label: 'CAGR Calculator' },
  { href: '/calculators/gst-calculator', label: 'GST Calculator' },
  { href: '/calculators/inflation-calculator', label: 'Inflation Calculator' },
];

/* ── FAQS ──────────────────────────────────────────────── */
const FAQS = [
  { q: 'How do I convert APR to monthly interest rate?', a: 'To convert APR to nominal monthly interest rate, divide the Annual Percentage Rate by 12 (Monthly Rate % = APR / 12).' },
  { q: 'What is monthly interest rate on 36% APR credit card in India?', a: 'A credit card with 36% APR has a monthly interest rate of 3.0% per month (36% / 12 = 3.0% pm).' },
  { q: 'What is the difference between APR and Effective Annual Rate (EAR)?', a: 'APR is the simple annual nominal rate excluding intra-year compounding, whereas Effective Annual Rate (EAR) incorporates monthly or daily compounding frequency.' },
  { q: 'How is daily interest rate calculated from APR?', a: 'Daily interest rate is calculated by dividing APR by 365 days (Daily Rate % = APR / 365).' },
  { q: 'Why do Indian credit cards quote monthly rates like 3.5% pm?', a: 'Indian credit card issuers frequently quote monthly interest rates like 3.5% per month, which equals an Annual Percentage Rate (APR) of 42% p.a. (3.5% × 12).' },
  { q: 'Does APR include processing fees and loan charges?', a: 'Under RBI guidelines, total effective APR for personal and home loans includes the headline interest rate plus mandatory upfront processing fees and documentation charges annualized over loan tenure.' },
  { q: 'How does compounding frequency affect total interest paid?', a: 'More frequent compounding (e.g. daily compounding vs annual compounding) increases the Effective Annual Rate (EAR) and total interest payout on overdue balances.' },
  { q: 'How does this APR converter work?', a: 'This calculator converts your input APR percentage into nominal monthly rate, daily interest rate, effective annual rate (EAR), and calculates exact rupee interest amounts on your principal.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

export default function AprToMonthlyRateClient() {
  const [mobile, setMobile] = useState(false);
  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);
  const { formatCurrency, selectedCurrency } = useCurrency();

  const [activeTab, setActiveTab] = useState<'nominal' | 'compounded'>('nominal');

  // Input states
  const [aprRate, setAprRate] = useState<number>(36.0); // 36% APR default (typical credit card)
  const [principal, setPrincipal] = useState<number>(100000); // Rs 1 Lakh
  const [compoundFreq, setCompoundFreq] = useState<'monthly' | 'daily' | 'quarterly'>('monthly');

  // Restore state from localStorage
  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-apr-to-monthly-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (d.aprRate !== undefined) setAprRate(d.aprRate);
      if (d.principal !== undefined) setPrincipal(d.principal);
      if (d.compoundFreq !== undefined) setCompoundFreq(d.compoundFreq);
    } catch { /* ignore */ }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fermor-apr-to-monthly-v1', JSON.stringify({
        aprRate, principal, compoundFreq
      }));
    } catch { /* ignore */ }
  }, [aprRate, principal, compoundFreq]);

  const currencySymbol = selectedCurrency?.symbol || '₹';
  const fmtC = (val: number) => {
    if (val >= 10000000) return `${currencySymbol}${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `${currencySymbol}${(val / 100000).toFixed(2)} L`;
    return formatCurrency(val);
  };
  const fmtIN = (val: number) => formatCurrency(val);

  // Math Calculations
  const calculations = useMemo(() => {
    // Nominal monthly rate %
    const nominalMonthlyPct = aprRate / 12;
    // Daily rate %
    const dailyPct = aprRate / 365;

    // Compounding compounding periods per year
    let n = 12;
    if (compoundFreq === 'daily') n = 365;
    else if (compoundFreq === 'quarterly') n = 4;

    // Effective Annual Rate EAR %: EAR = (1 + r/n)^n - 1
    const earPct = (Math.pow(1 + (aprRate / 100) / n, n) - 1) * 100;
    
    // Effective Monthly Rate % (accounting for compounding frequency):
    const effectiveMonthlyPct = (Math.pow(1 + earPct / 100, 1 / 12) - 1) * 100;

    // Monthly interest in Rs
    const activeMonthlyPct = activeTab === 'nominal' ? nominalMonthlyPct : effectiveMonthlyPct;
    const monthlyInterestRs = Math.round(principal * (activeMonthlyPct / 100));

    // Daily interest in Rs
    const dailyInterestRs = Math.round(principal * (dailyPct / 100));

    // Annual interest in Rs
    const annualInterestRs = Math.round(principal * (earPct / 100));

    return {
      nominalMonthlyPct,
      dailyPct,
      earPct,
      effectiveMonthlyPct,
      activeMonthlyPct,
      monthlyInterestRs,
      dailyInterestRs,
      annualInterestRs,
    };
  }, [activeTab, aprRate, principal, compoundFreq]);

  const secS = { marginBottom: 32 };
  const h2S = { fontSize: mobile ? 20 : 24, fontWeight: 700, color: C.ink, marginBottom: 14, letterSpacing: '-0.02em' };
  const pS = { fontSize: 15, color: C.ink2, lineHeight: 1.75, marginBottom: 14 };

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 24 : 32, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            APR to Monthly Interest Rate Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Convert Annual Percentage Rate (APR) to nominal monthly interest rate, daily rate, and Effective Annual Rate (EAR).
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD WITH TABS ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 36 }}>
              
              {/* Tabs at top of card */}
              <div role="tablist" aria-label="Calculator mode" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                <button id="tab-nominal" role="tab" aria-selected={activeTab === 'nominal'} aria-controls="panel-nominal"
                  onClick={() => setActiveTab('nominal')}
                  style={{
                    flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5, fontWeight: activeTab === 'nominal' ? 700 : 400,
                    color: activeTab === 'nominal' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'nominal' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s', fontFamily: INTER,
                  }}>
                  Nominal Monthly Rate
                </button>
                <button id="tab-compounded" role="tab" aria-selected={activeTab === 'compounded'} aria-controls="panel-compounded"
                  onClick={() => setActiveTab('compounded')}
                  style={{
                    flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5, fontWeight: activeTab === 'compounded' ? 700 : 400,
                    color: activeTab === 'compounded' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'compounded' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s', fontFamily: INTER,
                  }}>
                  Compounded Rate (EAR)
                </button>
              </div>

              {/* Tab Panel */}
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '32px 36px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Interest Inputs</p>
                    <CurrencySelector theme="light" />
                  </div>

                  <Slider id="apr-rate" label="Annual Percentage Rate (APR %)" value={aprRate} min={1.0} max={60.0} step={0.5}
                    display={`${aprRate.toFixed(1)}%`} onChange={setAprRate} compact suffix="%" />

                  <Slider id="principal-val" label="Loan / Outstanding Balance" value={principal} min={5000} max={2000000} step={5000}
                    display={fmtC(principal)} onChange={setPrincipal} compact />

                  {/* Compounding Frequency Selector */}
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontSize: 13.5, color: C.ink2, marginBottom: 8 }}>Compounding Frequency</label>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {[
                        { id: 'monthly', label: 'Monthly' },
                        { id: 'daily', label: 'Daily' },
                        { id: 'quarterly', label: 'Quarterly' },
                      ].map(item => (
                        <button key={item.id} onClick={() => setCompoundFreq(item.id as typeof compoundFreq)}
                          style={{ flex: 1, padding: '7px 8px', border: `1px solid ${C.border}`, borderRadius: 6, background: compoundFreq === item.id ? C.white : 'transparent', color: compoundFreq === item.id ? C.ink : C.ink3, fontWeight: compoundFreq === item.id ? 700 : 400, cursor: 'pointer', fontFamily: INTER, fontSize: 12, transition: 'all 0.15s' }}>
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Output Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '32px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* Donut Chart */}
                  <div style={{ order: mobile ? 1 : -1, marginBottom: mobile ? 14 : 18 }}>
                    <DonutChart principal={principal} annualInterest={calculations.annualInterestRs} />
                  </div>

                  {/* Donut Legend */}
                  <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 16, marginBottom: mobile ? 12 : 18 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Principal</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Annual Interest</span>
                    </div>
                  </div>

                  {/* Primary result box */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: mobile ? '14px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#50565C' }}>Monthly Interest Rate</div>
                      <div style={{ fontSize: 11, color: '#7A8087', marginTop: 2 }}>{activeTab === 'nominal' ? 'Nominal APR/12' : 'Effective Compounded'}</div>
                    </div>
                    <span aria-live="polite" aria-label={`Monthly Interest Rate: ${calculations.activeMonthlyPct.toFixed(2)}%`}
                      style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {calculations.activeMonthlyPct.toFixed(2)}% / mo
                    </span>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: 'Monthly Interest Amount (Rs)', value: `${fmtIN(calculations.monthlyInterestRs)}/mo` },
                    { label: 'Daily Interest Rate (%)', value: `${calculations.dailyPct.toFixed(4)}% / day` },
                    { label: 'Daily Interest Amount (Rs)', value: `${fmtIN(calculations.dailyInterestRs)}/day` },
                    { label: 'Effective Annual Rate (EAR %)', value: `${calculations.earPct.toFixed(2)}% p.a.` },
                    { label: 'Total Annual Interest (Rs)', value: fmtIN(calculations.annualInterestRs) },
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

              <div style={secS} id="what-is-apr-calculator">
                <h2 style={h2S}>What Is an APR to Monthly Rate Calculator?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    An APR to monthly rate calculator converts Annual Percentage Rates (APR) quoted by banks and credit card issuers into equivalent monthly interest percentages, daily interest rates, and rupee interest charges.
                  </p>
                </div>
                <p style={pS}>In Indian banking, credit card companies quote interest as monthly rates like 3.5% per month, whereas personal loan and home loan agreements quote annual rates like 14% to 18% APR.</p>
                <p style={pS}>This calculator translates between annual rates and monthly/daily rates while accounting for compounding frequency to compute Effective Annual Rate (EAR).</p>
              </div>

              <div style={secS} id="apr-conversion-formula">
                <h2 style={h2S}>APR to Monthly Interest Conversion Formulas</h2>
                <p style={pS}>Nominal monthly interest rate is computed by dividing APR by 12, whereas Effective Annual Rate (EAR) incorporates compound interest frequency.</p>
                
                <div style={{ background: '#f8f9f9', border: `1px solid ${C.border}`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, margin: '0 0 8px' }}>Nominal Monthly Rate Formula</p>
                  <code style={{ fontSize: 13, color: C.dark }}>Monthly Rate % = APR / 12</code>
                  
                  <p style={{ fontSize: 14, fontWeight: 700, margin: '16px 0 8px' }}>Effective Annual Rate (EAR) Formula</p>
                  <code style={{ fontSize: 13, color: C.dark }}>EAR % = ((1 + (APR / 100) / n)^n - 1) × 100</code>
                </div>

                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                      Common APR to monthly interest rate conversion table.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Annual Percentage Rate (APR)</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Nominal Monthly Rate (%)</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Effective Annual Rate (EAR - Monthly Compounding)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={tdL}>8.50% APR (Home Loan)</td>
                        <td style={tdR}>0.71% / mo</td>
                        <td style={tdR}>8.84% p.a.</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>12.00% APR (Gold Loan)</td>
                        <td style={tdR}>1.00% / mo</td>
                        <td style={tdR}>12.68% p.a.</td>
                      </tr>
                      <tr>
                        <td style={tdL}>18.00% APR (Personal Loan)</td>
                        <td style={tdR}>1.50% / mo</td>
                        <td style={tdR}>19.56% p.a.</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>36.00% APR (Standard Credit Card)</td>
                        <td style={tdR}>3.00% / mo</td>
                        <td style={tdR}>42.58% p.a.</td>
                      </tr>
                      <tr>
                        <td style={tdL}>42.00% APR (Premium Credit Card Overdue)</td>
                        <td style={tdR}>3.50% / mo</td>
                        <td style={tdR}>51.11% p.a.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={secS} id="how-to-use">
                <h2 style={h2S}>How to Use This APR to Monthly Rate Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter APR Percentage:</strong> Input annual percentage rate quoted on your loan or credit card.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Principal Amount:</strong> Input loan or outstanding balance amount.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select Compounding Frequency:</strong> Choose Monthly, Daily, or Quarterly compounding.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Review Monthly &amp; EAR Rates:</strong> View exact nominal monthly rate %, daily interest %, EAR %, and rupee payouts.
                  </li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> Figures provided by this calculator are mathematical interest rate conversions based on standard banking formulas in India. Actual credit card finance charges, GST on interest, and late payment penalties vary by financial institution under RBI regulations.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .atmr-sidebar::-webkit-scrollbar { width: 5px; }
            .atmr-sidebar::-webkit-scrollbar-track { background: transparent; }
            .atmr-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .atmr-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            className="atmr-sidebar"
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
              <AprSnapshot />
              <nav aria-label="Related Calculators" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <SidebarList title="Popular Loan Tools" items={POPULAR_TOOLS} />
                <SidebarList title="More Financial Calculators" items={MORE_TOOLS} />
              </nav>
              <RelatedReads />
            </div>
          </aside>
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
              { hd: 'Calculators', links: ['/calculators/credit-card-interest-calculator|Credit Card Interest', '/calculators/personal-loan-calculator|Personal Loan', '/calculators/emi-calculator|EMI', '/calculators/sip-calculator|SIP', '/calculators/fd-calculator|FD', '/calculators/gst-calculator|GST'] },
              { hd: 'Topics', links: ['/#|APR Rates', '/#|Interest Rates', '/#|Credit Cards', '/#|Loans'] },
              { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
            ])} />
    </div>
  );
}

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
function DonutChart({ purchasePrice, totalPayout }: { purchasePrice: number; totalPayout: number }) {
  const gains = Math.max(0, totalPayout - purchasePrice);
  const principalPct = totalPayout > 0 ? (purchasePrice / totalPayout) * 100 : 50;
  const r = 40;
  const circ = 2 * Math.PI * r;
  const strokeDashoffset = circ - (principalPct / 100) * circ;
  return (
    <svg width="140" height="140" viewBox="0 0 100 100" role="img" aria-label={`Payout split: ${Math.round(principalPct)}% Purchase Price, ${Math.round(100 - principalPct)}% Total Pension Gain`}>
      <circle cx="50" cy="50" r={r} fill="none" stroke={CHART_PAIR.secondary} strokeWidth="16" />
      <circle cx="50" cy="50" r={r} fill="none" stroke={CHART_PAIR.primary} strokeWidth="16"
        strokeDasharray={circ} strokeDashoffset={strokeDashoffset}
        transform="rotate(-90 50 50)" style={{ transition: 'stroke-dashoffset 0.4s ease' }} />
      <text x="50" y="46" textAnchor="middle" fill={C.ink} fontSize="10" fontWeight="700" fontFamily={INTER}>Lifetime Return</text>
      <text x="50" y="60" textAnchor="middle" fill={C.dark} fontSize="10" fontWeight="800" fontFamily={INTER}>
        Rs {(totalPayout / 100000).toFixed(0)}L
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

function AnnuitySnapshot() {
  const rows = [
    { label: 'Current Annuity Rates', value: '6.5% - 7.5% p.a.' },
    { label: 'Mandatory NPS Annuity', value: '40% of Corpus' },
    { label: 'Payout Options', value: 'ROPP / Life / Joint' },
    { label: 'Taxation Status', value: 'Taxed at Slab Rate' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Annuity Snapshot</span>
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
    { href: '/calculators/nps-calculator', label: 'NPS Calculator: Pension Corpus and Payout Estimate' },
    { href: '/calculators/swp-calculator', label: 'SWP Calculator: Systematic Withdrawal vs Annuity' },
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
  { href: '/calculators/nps-calculator', label: 'NPS Calculator' },
  { href: '/calculators/swp-calculator', label: 'SWP Calculator' },
  { href: '/calculators/retirement-calculator', label: 'Retirement Calculator' },
  { href: '/calculators/pension-calculator', label: 'Pension Calculator' },
];
const MORE_TOOLS = [
  { href: '/calculators/epf-calculator', label: 'EPF Calculator' },
  { href: '/calculators/vpf-calculator', label: 'VPF Calculator' },
  { href: '/calculators/scss-calculator', label: 'SCSS Calculator' },
];

/* ── FAQS ──────────────────────────────────────────────── */
const FAQS = [
  { q: 'How much monthly pension do I get on Rs 1 crore annuity in India?', a: 'At a typical current annuity rate of 7.0% per annum with return of purchase price, a Rs 1 crore lump sum purchase price generates approximately Rs 58,333 per month in guaranteed lifelong pension.' },
  { q: 'What is an annuity plan?', a: 'An annuity plan is a contract with a life insurance provider where you pay a lump sum purchase price in exchange for regular guaranteed income payouts for life or a specified period.' },
  { q: 'What is the difference between immediate annuity and deferred annuity?', a: 'An immediate annuity starts paying monthly or annual pension income immediately after paying the lump sum, whereas a deferred annuity starts paying pension after a deferment period of 1 to 10 years.' },
  { q: 'How much pension do I get from NPS annuity component at age 60?', a: 'PFRDA mandates that at least 40% of your NPS retirement corpus must be converted into an annuity plan. On a Rs 1 crore NPS corpus, Rs 40 lakh invested in annuity at 7% gives roughly Rs 23,333 per month.' },
  { q: 'What is annuity with return of purchase price (ROPP)?', a: 'In an annuity with return of purchase price, you receive guaranteed pension for life, and upon the death of the annuitant, the 100% original lump sum purchase price is refunded to your nominee.' },
  { q: 'Is annuity income taxable in India?', a: 'Yes, annuity income received periodically is fully taxable as income from other sources and added to your total annual income, taxed at your applicable income tax slab rate under both old and new regimes.' },
  { q: 'What is a joint life annuity policy?', a: 'A joint life annuity pays guaranteed pension for as long as either you or your spouse is alive, with 100% or 50% pension continuing to the surviving spouse after the death of the primary annuitant.' },
  { q: 'Which life insurance company offers the highest annuity rates in India?', a: 'Annuity rates vary between 6.5% and 7.8% depending on entry age, annuity option, and provider among LIC of India, HDFC Life, ICICI Prudential Life, SBI Life, and Max Life.' },
  { q: 'Does annuity rate change over time once locked in?', a: 'No, once an immediate annuity plan is purchased, the annuity rate and pension amount are locked guaranteed for life and cannot be reduced by the insurance company.' },
  { q: 'How does deferment period increase annuity income?', a: 'Deferring annuity payouts by 5 to 10 years allows your initial corpus to compound during the deferment phase, yielding significantly higher annuity rates and monthly payouts when payments begin.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

export default function AnnuityIncomeClient() {
  const [mobile, setMobile] = useState(false);
  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);
  const { formatCurrency, selectedCurrency } = useCurrency();

  const [activeTab, setActiveTab] = useState<'immediate' | 'deferred'>('immediate');

  // Input states
  const [purchasePrice, setPurchasePrice] = useState<number>(5000000); // 50 Lakhs
  const [annuityRate, setAnnuityRate] = useState<number>(7.0); // 7%
  const [annuityOption, setAnnuityOption] = useState<'ropp' | 'life' | 'joint'>('ropp');
  const [payoutFreq, setPayoutFreq] = useState<'monthly' | 'quarterly' | 'annual'>('monthly');
  const [defermentYrs, setDefermentYrs] = useState<number>(5);
  const [horizonYrs, setHorizonYrs] = useState<number>(25); // 25 yrs pension
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Restore state from localStorage
  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-annuity-income-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (d.purchasePrice !== undefined) setPurchasePrice(d.purchasePrice);
      if (d.annuityRate !== undefined) setAnnuityRate(d.annuityRate);
      if (d.annuityOption !== undefined) setAnnuityOption(d.annuityOption);
      if (d.payoutFreq !== undefined) setPayoutFreq(d.payoutFreq);
      if (d.defermentYrs !== undefined) setDefermentYrs(d.defermentYrs);
      if (d.horizonYrs !== undefined) setHorizonYrs(d.horizonYrs);
    } catch { /* ignore */ }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fermor-annuity-income-v1', JSON.stringify({
        purchasePrice, annuityRate, annuityOption, payoutFreq, defermentYrs, horizonYrs
      }));
    } catch { /* ignore */ }
  }, [purchasePrice, annuityRate, annuityOption, payoutFreq, defermentYrs, horizonYrs]);

  const currencySymbol = selectedCurrency?.symbol || '₹';
  const fmtC = (val: number) => {
    if (val >= 10000000) return `${currencySymbol}${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `${currencySymbol}${(val / 100000).toFixed(2)} L`;
    return formatCurrency(val);
  };
  const fmtIN = (val: number) => formatCurrency(val);

  // Calculations
  const calculations = useMemo(() => {
    // Effective Rate adjustment based on option & deferment
    let effectiveRate = annuityRate;
    if (annuityOption === 'ropp') {
      effectiveRate = annuityRate * 0.95; // Return of purchase price yields slightly lower rate
    } else if (annuityOption === 'joint') {
      effectiveRate = annuityRate * 0.92; // Joint life yields slightly lower rate
    }

    let effectiveCorpus = purchasePrice;
    if (activeTab === 'deferred') {
      // Deferment compounds corpus at a conservative 6.5% interest
      effectiveCorpus = purchasePrice * Math.pow(1 + 0.065, defermentYrs);
      effectiveRate += defermentYrs * 0.25; // rate increases slightly with deferment
    }

    const annualPension = Math.round(effectiveCorpus * (effectiveRate / 100));
    const monthlyPension = Math.round(annualPension / 12);
    const quarterlyPension = Math.round(annualPension / 4);

    const periodPayout = payoutFreq === 'monthly' ? monthlyPension : payoutFreq === 'quarterly' ? quarterlyPension : annualPension;

    const totalLifetimePayout = Math.round(annualPension * horizonYrs);
    const netProfitGained = Math.max(0, totalLifetimePayout - purchasePrice);

    return {
      effectiveCorpus,
      effectiveRate,
      annualPension,
      monthlyPension,
      periodPayout,
      totalLifetimePayout,
      netProfitGained
    };
  }, [activeTab, purchasePrice, annuityRate, annuityOption, payoutFreq, defermentYrs, horizonYrs]);

  const secS = { marginBottom: 32 };
  const h2S = { fontSize: mobile ? 20 : 24, fontWeight: 700, color: C.ink, marginBottom: 14, letterSpacing: '-0.02em' };
  const pS = { fontSize: 15, color: C.ink2, lineHeight: 1.75, marginBottom: 14 };

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 24 : 32, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Annuity Income Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate guaranteed monthly pension and total lifetime annuity income from your retirement or NPS corpus.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD WITH TABS ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 36 }}>
              
              {/* Tabs at top of card */}
              <div role="tablist" aria-label="Calculator mode" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                <button id="tab-immediate" role="tab" aria-selected={activeTab === 'immediate'} aria-controls="panel-immediate"
                  onClick={() => setActiveTab('immediate')}
                  style={{
                    flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5, fontWeight: activeTab === 'immediate' ? 700 : 400,
                    color: activeTab === 'immediate' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'immediate' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s', fontFamily: INTER,
                  }}>
                  Immediate Annuity
                </button>
                <button id="tab-deferred" role="tab" aria-selected={activeTab === 'deferred'} aria-controls="panel-deferred"
                  onClick={() => setActiveTab('deferred')}
                  style={{
                    flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5, fontWeight: activeTab === 'deferred' ? 700 : 400,
                    color: activeTab === 'deferred' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'deferred' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s', fontFamily: INTER,
                  }}>
                  Deferred Annuity
                </button>
              </div>

              {/* Tab Panel */}
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '32px 36px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Annuity Parameters</p>
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider id="purchase-price" label="Purchase Price / Corpus" value={purchasePrice} min={100000} max={50000000} step={100000}
                        display={fmtC(purchasePrice)} onChange={setPurchasePrice} compact />

                      <Slider id="annuity-rate" label="Headline Annuity Rate" value={annuityRate} min={4.0} max={12.0} step={0.1}
                        display={`${annuityRate.toFixed(1)}%`} onChange={setAnnuityRate} compact suffix="%" />

                      {activeTab === 'deferred' && (
                        <Slider id="deferment-yrs" label="Deferment Period" value={defermentYrs} min={1} max={15} step={1}
                          display={`${defermentYrs} Yrs`} onChange={setDefermentYrs} compact suffix="Yrs" />
                      )}

                      {/* Option Toggle */}
                      <div style={{ marginBottom: 20 }}>
                        <label style={{ display: 'block', fontSize: 13.5, color: C.ink2, marginBottom: 8 }}>Annuity Plan Option</label>
                        <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                          <button onClick={() => setAnnuityOption('ropp')}
                            style={{ flex: 1, padding: '7px 8px', border: 'none', background: annuityOption === 'ropp' ? C.white : 'transparent', color: annuityOption === 'ropp' ? C.ink : C.ink3, fontWeight: annuityOption === 'ropp' ? 600 : 400, cursor: 'pointer', fontFamily: INTER, fontSize: 12, transition: 'all 0.15s' }}>
                            ROPP (100% Refund)
                          </button>
                          <button onClick={() => setAnnuityOption('life')}
                            style={{ flex: 1, padding: '7px 8px', border: 'none', background: annuityOption === 'life' ? C.white : 'transparent', color: annuityOption === 'life' ? C.ink : C.ink3, fontWeight: annuityOption === 'life' ? 600 : 400, cursor: 'pointer', fontFamily: INTER, fontSize: 12, transition: 'all 0.15s' }}>
                            Life Annuity
                          </button>
                          <button onClick={() => setAnnuityOption('joint')}
                            style={{ flex: 1, padding: '7px 8px', border: 'none', background: annuityOption === 'joint' ? C.white : 'transparent', color: annuityOption === 'joint' ? C.ink : C.ink3, fontWeight: annuityOption === 'joint' ? 600 : 400, cursor: 'pointer', fontFamily: INTER, fontSize: 12, transition: 'all 0.15s' }}>
                            Joint Life
                          </button>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                        <button onClick={() => setShowAdvanced(true)}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                          More settings
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Payout Frequency Toggle */}
                      <div style={{ marginBottom: 24 }}>
                        <label style={{ display: 'block', fontSize: 13.5, color: C.ink2, marginBottom: 8 }}>Payout Frequency</label>
                        <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                          {(['monthly', 'quarterly', 'annual'] as const).map(f => (
                            <button key={f} onClick={() => setPayoutFreq(f)}
                              style={{ flex: 1, padding: '7px 10px', border: 'none', background: payoutFreq === f ? C.white : 'transparent', color: payoutFreq === f ? C.ink : C.ink3, fontWeight: payoutFreq === f ? 600 : 400, cursor: 'pointer', fontFamily: INTER, fontSize: 12.5, textTransform: 'capitalize', transition: 'all 0.15s' }}>
                              {f}
                            </button>
                          ))}
                        </div>
                      </div>

                      <Slider id="horizon-yrs" label="Retirement Horizon (Payout Years)" value={horizonYrs} min={10} max={40} step={1}
                        display={`${horizonYrs} Yrs`} onChange={setHorizonYrs} compact suffix="Yrs" />

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
                    <DonutChart purchasePrice={purchasePrice} totalPayout={calculations.totalLifetimePayout} />
                  </div>

                  {/* Donut Legend */}
                  <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 20, marginBottom: mobile ? 12 : 18 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12.5, color: C.ink2 }}>Purchase Price</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12.5, color: C.ink2 }}>Total Pension Gain</span>
                    </div>
                  </div>

                  {/* Primary result box */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: mobile ? '14px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#50565C' }}>Guaranteed Monthly Pension</div>
                      <div style={{ fontSize: 11, color: '#7A8087', marginTop: 2 }}>Lifelong guaranteed payout</div>
                    </div>
                    <span aria-live="polite" aria-label={`Guaranteed Monthly Pension: ${fmtIN(calculations.monthlyPension)}`}
                      style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {fmtIN(calculations.monthlyPension)}
                    </span>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: 'Annual Pension Payout', value: `${fmtIN(calculations.annualPension)}/yr` },
                    { label: 'Effective Annuity Rate', value: `${calculations.effectiveRate.toFixed(2)}% p.a.` },
                    { label: `Total Payout (${horizonYrs} Yrs)`, value: fmtC(calculations.totalLifetimePayout) },
                    { label: 'Nominee Return of Corpus', value: annuityOption === 'ropp' ? fmtC(purchasePrice) : 'Nil' },
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

              <div style={secS} id="what-is-annuity">
                <h2 style={h2S}>What Is an Annuity Income Calculator?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    An annuity income calculator computes the exact monthly or annual pension you receive when investing a lump sum retirement corpus into an annuity policy.
                  </p>
                </div>
                <p style={pS}>When retiring in India, investors convert accumulated wealth from the National Pension System (NPS), EPF, or mutual funds into guaranteed lifetime income through insurance providers like LIC of India, HDFC Life, ICICI Prudential, and SBI Life.</p>
                <p style={pS}>This calculator factors in annuity option types (Life Annuity vs Return of Purchase Price vs Joint Life), payout frequencies, and deferment periods to project guaranteed regular income.</p>
              </div>

              <div style={secS} id="annuity-formula">
                <h2 style={h2S}>Annuity Pension Calculation Formula</h2>
                <p style={pS}>Annuity payouts are calculated based on the purchase price and the prevailing headline annuity rate offered by the life insurance company at the time of policy purchase.</p>
                <div style={{ background: '#f8f9f9', border: `1px solid ${C.border}`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, margin: '0 0 8px' }}>Annual Pension Formula</p>
                  <code style={{ fontSize: 13, color: C.dark }}>Annual Pension = Purchase Price × (Effective Annuity Rate / 100)</code>
                  
                  <p style={{ fontSize: 14, fontWeight: 700, margin: '16px 0 8px' }}>Monthly Pension Formula</p>
                  <code style={{ fontSize: 13, color: C.dark }}>Monthly Pension = Annual Pension / 12</code>
                </div>
                <p style={{ ...pS, fontWeight: 600 }}>Worked example: Rs 1 Crore corpus invested at 7.0% annuity rate with Return of Purchase Price (0.95x option adjustment = 6.65% effective):</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                  <div style={{ fontSize: 14, color: C.ink2 }}>&#8226; Annual Pension = Rs 1,00,000,000 × 6.65% = <strong>Rs 6,65,000 per year</strong></div>
                  <div style={{ fontSize: 14, color: C.ink2 }}>&#8226; Monthly Pension = Rs 6,65,000 / 12 = <strong>Rs 55,417 per month</strong></div>
                  <div style={{ fontSize: 14, color: C.ink2 }}>&#8226; 25-Year Lifetime Payout = Rs 6,65,000 × 25 = <strong>Rs 1.66 Crore</strong> (plus Rs 1 Crore refunded to nominee)</div>
                </div>
              </div>

              <div style={secS} id="immediate-vs-deferred">
                <h2 style={h2S}>Immediate vs Deferred Annuity Plans</h2>
                <p style={pS}>Immediate annuity plans begin paying monthly income immediately upon policy inception. Deferred annuity plans allow your corpus to compound during a 1 to 10 year deferment window before monthly income commences.</p>

                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                      Comparison of Immediate and Deferred Annuity Features in India.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Feature</th>
                        <th scope="col" style={{ ...thS, textAlign: 'left' }}>Immediate Annuity</th>
                        <th scope="col" style={{ ...thS, textAlign: 'left' }}>Deferred Annuity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={tdL}>Income Start Date</td>
                        <td style={tdL}>Next month after payment</td>
                        <td style={tdL}>After 1 to 10 years deferment</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>Ideal Target Audience</td>
                        <td style={tdL}>People retiring today (Age 60)</td>
                        <td style={tdL}>Early retirement planners (Age 45-55)</td>
                      </tr>
                      <tr>
                        <td style={tdL}>Annuity Rate Benefit</td>
                        <td style={tdL}>Rate locked at purchase</td>
                        <td style={tdL}>Higher rate due to compounding</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={secS} id="taxation-on-annuity">
                <h2 style={h2S}>Income Tax on Pension Annuities in India</h2>
                <p style={pS}>Unlike SWP withdrawals from equity mutual funds which enjoy LTCG tax relief, monthly annuity income received from life insurance companies or NPS is classified as Income from Other Sources under the Income Tax Act.</p>
                <p style={pS}>Annuity payouts are added to your total annual taxable income and taxed at your applicable slab rate under both the Old Tax Regime and New Tax Regime.</p>
              </div>

              <div style={secS} id="how-to-use">
                <h2 style={h2S}>How to Use This Annuity Income Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select Annuity Mode:</strong> Choose between Immediate Annuity (for current retirees) and Deferred Annuity (for future retirement).
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Purchase Price:</strong> Input your retirement lump sum or NPS annuity allotment amount.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set Annuity Rate &amp; Option:</strong> Choose Return of Purchase Price (ROPP), Life Annuity, or Joint Life.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>View Pension Breakdown:</strong> See your guaranteed monthly pension and total lifetime payout projections.
                  </li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All figures and rates displayed by this calculator are illustrative and based on general insurance parameters in India. Actual annuity rates are determined by individual life insurance companies like LIC, HDFC Life, ICICI Prudential, and SBI Life at the time of policy issuance based on gender, exact age, and medical underwriting. This tool is for educational purposes and does not constitute financial advice.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .aic-sidebar::-webkit-scrollbar { width: 5px; }
            .aic-sidebar::-webkit-scrollbar-track { background: transparent; }
            .aic-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .aic-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            className="aic-sidebar"
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
              <AnnuitySnapshot />
              <nav aria-label="Related Calculators" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <SidebarList title="Popular Retirement Tools" items={POPULAR_TOOLS} />
                <SidebarList title="More Financial Calculators" items={MORE_TOOLS} />
              </nav>
              <RelatedReads />
            </div>
          </aside>
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/nps-calculator|NPS', '/calculators/swp-calculator|SWP', '/calculators/retirement-calculator|Retirement', '/calculators/sip-calculator|SIP', '/calculators/fd-calculator|FD', '/calculators/gst-calculator|GST'] },
        { hd: 'Topics', links: ['/#|Annuity Income', '/#|NPS Pension', '/#|Mutual Funds', '/#|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} />
    </div>
  );
}

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
function DonutChart({ cardANet, cardBNet }: { cardANet: number; cardBNet: number }) {
  const total = Math.max(1, cardANet + cardBNet);
  const cardAPct = total > 0 ? Math.max(0, Math.min(100, (cardANet / total) * 100)) : 50;
  const r = 40;
  const circ = 2 * Math.PI * r;
  const strokeDashoffset = circ - (cardAPct / 100) * circ;
  return (
    <svg width="140" height="140" viewBox="0 0 100 100" role="img" aria-label={`Net return split: ${Math.round(cardAPct)}% Card A Value, ${Math.round(100 - cardAPct)}% Card B Value`}>
      <circle cx="50" cy="50" r={r} fill="none" stroke={CHART_PAIR.secondary} strokeWidth="16" />
      <circle cx="50" cy="50" r={r} fill="none" stroke={CHART_PAIR.primary} strokeWidth="16"
        strokeDasharray={circ} strokeDashoffset={strokeDashoffset}
        transform="rotate(-90 50 50)" style={{ transition: 'stroke-dashoffset 0.4s ease' }} />
      <text x="50" y="46" textAnchor="middle" fill={C.ink} fontSize="10" fontWeight="700" fontFamily={INTER}>Net Advantage</text>
      <text x="50" y="60" textAnchor="middle" fill={C.dark} fontSize="10" fontWeight="800" fontFamily={INTER}>
        Rs {Math.abs(Math.round(cardANet - cardBNet))}
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

function ComparisonSnapshot() {
  const rows = [
    { label: 'SBI Cashback vs Amazon ICICI', value: 'SBI wins above 10k online' },
    { label: 'Axis Ace vs Flipkart Axis', value: 'Ace wins on offline / bills' },
    { label: 'Swiggy HDFC vs HDFC Millennia', value: 'Swiggy wins for foodies' },
    { label: 'HDFC Regalia Gold vs Axis Atlas', value: 'Atlas wins on travel/miles' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Comparison Matchups</span>
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
    { href: '/calculators/cashback-earnings-calculator', label: 'Cashback Earnings Calculator: Maximize Card Rewards' },
    { href: '/calculators/credit-card-emi-calculator', label: 'Credit Card EMI Calculator: Interest & Processing Fees' },
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
  { href: '/calculators/cashback-earnings-calculator', label: 'Cashback Earnings Calculator' },
  { href: '/calculators/credit-card-emi-calculator', label: 'Credit Card EMI Calculator' },
  { href: '/calculators/credit-utilization-calculator', label: 'Credit Utilization Calculator' },
  { href: '/calculators/personal-loan-calculator', label: 'Personal Loan Calculator' },
];
const MORE_TOOLS = [
  { href: '/calculators/cagr-calculator', label: 'CAGR Calculator' },
  { href: '/calculators/gst-calculator', label: 'GST Calculator' },
  { href: '/calculators/emergency-fund-calculator', label: 'Emergency Fund Calculator' },
];

/* ── FAQS ──────────────────────────────────────────────── */
const FAQS = [
  { q: 'How do I compare two credit cards in India effectively?', a: 'To compare credit cards effectively, evaluate net annual returns by subtracting annual renewal fees from projected annual cashback and reward point value based on your actual spending habits.' },
  { q: 'Is a paid credit card better than a lifetime free credit card?', a: 'A paid credit card with an annual fee is better if the additional cashback and benefits (like airport lounge access, golf access, or accelerated online rewards) significantly exceed the fee amount.' },
  { q: 'What is reward point conversion rate in credit cards?', a: 'Reward point conversion rate is the monetary cash value of 1 reward point when redeemed for statement credit, catalog vouchers, air miles, or hotel points (typically ranging from Rs 0.20 to Rs 1.00 per point).' },
  { q: 'How do milestone bonus rewards work on premium credit cards?', a: 'Milestone bonus rewards grant extra reward points, flight vouchers, or annual fee waivers when you achieve specific annual spend targets (such as Rs 1 Lakh, Rs 2.5 Lakh, or Rs 4 Lakh spend in a year).' },
  { q: 'What is airport lounge access valuation on credit cards?', a: 'Complimentary airport lounge access in India is valued at roughly Rs 1,000 to Rs 1,500 per visit, providing complimentary food, beverages, and comfortable seating before flights.' },
  { q: 'How does this credit card comparison calculator work?', a: 'This calculator computes gross annual cashback/rewards for two cards based on your monthly spending profile, subtracts respective annual fees, factors in milestone waivers, and displays side-by-side net monetary value.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

export default function CreditCardComparisonClient() {
  const [mobile, setMobile] = useState(false);
  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);
  const { formatCurrency, selectedCurrency } = useCurrency();

  const [activeTab, setActiveTab] = useState<'custom' | 'preset'>('custom');

  // Input states
  const [monthlySpend, setMonthlySpend] = useState<number>(30000); // 30k monthly spend
  
  // Card A: Premium Paid Cashback Card (e.g. SBI Cashback)
  const [cardARewardRate, setCardARewardRate] = useState<number>(5.0); // 5%
  const [cardAFee, setCardAFee] = useState<number>(999);
  const [cardAWaiver, setCardAWaiver] = useState<number>(200000);

  // Card B: Lifetime Free Baseline Card (e.g. Amazon Pay ICICI)
  const [cardBRewardRate, setCardBRewardRate] = useState<number>(2.0); // 2% avg
  const [cardBFee, setCardBFee] = useState<number>(0); // Rs 0
  const [cardBWaiver, setCardBWaiver] = useState<number>(0);

  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Restore state from localStorage
  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-credit-card-comparison-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (d.monthlySpend !== undefined) setMonthlySpend(d.monthlySpend);
      if (d.cardARewardRate !== undefined) setCardARewardRate(d.cardARewardRate);
      if (d.cardAFee !== undefined) setCardAFee(d.cardAFee);
      if (d.cardAWaiver !== undefined) setCardAWaiver(d.cardAWaiver);
      if (d.cardBRewardRate !== undefined) setCardBRewardRate(d.cardBRewardRate);
      if (d.cardBFee !== undefined) setCardBFee(d.cardBFee);
      if (d.cardBWaiver !== undefined) setCardBWaiver(d.cardBWaiver);
    } catch { /* ignore */ }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fermor-credit-card-comparison-v1', JSON.stringify({
        monthlySpend, cardARewardRate, cardAFee, cardAWaiver, cardBRewardRate, cardBFee, cardBWaiver
      }));
    } catch { /* ignore */ }
  }, [monthlySpend, cardARewardRate, cardAFee, cardAWaiver, cardBRewardRate, cardBFee, cardBWaiver]);

  const currencySymbol = selectedCurrency?.symbol || '₹';
  const fmtC = (val: number) => {
    if (val >= 10000000) return `${currencySymbol}${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `${currencySymbol}${(val / 100000).toFixed(2)} L`;
    return formatCurrency(val);
  };
  const fmtIN = (val: number) => formatCurrency(val);

  // Math Calculations
  const calculations = useMemo(() => {
    const annualSpend = monthlySpend * 12;

    // Card A
    const grossA = Math.round(annualSpend * (cardARewardRate / 100));
    const isAWaived = cardAWaiver > 0 && annualSpend >= cardAWaiver;
    const feePaidA = isAWaived ? 0 : Math.round(cardAFee * 1.18);
    const netA = Math.max(0, grossA - feePaidA);

    // Card B
    const grossB = Math.round(annualSpend * (cardBRewardRate / 100));
    const isBWaived = cardBWaiver > 0 && annualSpend >= cardBWaiver;
    const feePaidB = isBWaived ? 0 : Math.round(cardBFee * 1.18);
    const netB = Math.max(0, grossB - feePaidB);

    const diff = netA - netB;
    const winner = diff > 0 ? 'Card A' : diff < 0 ? 'Card B' : 'Equal Value';

    return {
      annualSpend,
      grossA,
      feePaidA,
      netA,
      grossB,
      feePaidB,
      netB,
      diff,
      winner,
    };
  }, [monthlySpend, cardARewardRate, cardAFee, cardAWaiver, cardBRewardRate, cardBFee, cardBWaiver]);

  const secS = { marginBottom: 32 };
  const h2S = { fontSize: mobile ? 20 : 24, fontWeight: 700, color: C.ink, marginBottom: 14, letterSpacing: '-0.02em' };
  const pS = { fontSize: 15, color: C.ink2, lineHeight: 1.75, marginBottom: 14 };

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 24 : 32, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Credit Card Comparison Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Compare two credit cards side-by-side on annual cashback, reward points, renewal fees, and net monetary gains.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD WITH TABS ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 36 }}>
              
              {/* Tabs at top of card */}
              <div role="tablist" aria-label="Calculator mode" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                <button id="tab-custom" role="tab" aria-selected={activeTab === 'custom'} aria-controls="panel-custom"
                  onClick={() => setActiveTab('custom')}
                  style={{
                    flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5, fontWeight: activeTab === 'custom' ? 700 : 400,
                    color: activeTab === 'custom' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'custom' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s', fontFamily: INTER,
                  }}>
                  Custom Card Comparison
                </button>
                <button id="tab-preset" role="tab" aria-selected={activeTab === 'preset'} aria-controls="panel-preset"
                  onClick={() => { setActiveTab('preset'); setCardARewardRate(5.0); setCardAFee(999); setCardBRewardRate(2.0); setCardBFee(0); }}
                  style={{
                    flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5, fontWeight: activeTab === 'preset' ? 700 : 400,
                    color: activeTab === 'preset' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'preset' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s', fontFamily: INTER,
                  }}>
                  Preset Matchup (SBI vs Amazon)
                </button>
              </div>

              {/* Tab Panel */}
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '32px 36px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Spend &amp; Card Parameters</p>
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider id="monthly-spend" label="Estimated Monthly Spend" value={monthlySpend} min={5000} max={200000} step={2500}
                        display={fmtC(monthlySpend)} onChange={setMonthlySpend} compact />

                      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14, marginBottom: 14 }}>
                        <p style={{ fontSize: 12, fontWeight: 700, color: C.dark, margin: '0 0 10px' }}>Card A (e.g. Paid Reward Card)</p>
                        <Slider id="carda-rate" label="Card A Reward Rate (%)" value={cardARewardRate} min={0.5} max={10.0} step={0.5}
                          display={`${cardARewardRate.toFixed(1)}%`} onChange={setCardARewardRate} compact suffix="%" />
                        <Slider id="carda-fee" label="Card A Annual Fee" value={cardAFee} min={0} max={5000} step={250}
                          display={fmtIN(cardAFee)} onChange={setCardAFee} compact />
                      </div>

                      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14, marginBottom: 14 }}>
                        <p style={{ fontSize: 12, fontWeight: 700, color: C.dark, margin: '0 0 10px' }}>Card B (e.g. Free / Baseline Card)</p>
                        <Slider id="cardb-rate" label="Card B Reward Rate (%)" value={cardBRewardRate} min={0.5} max={10.0} step={0.5}
                          display={`${cardBRewardRate.toFixed(1)}%`} onChange={setCardBRewardRate} compact suffix="%" />
                        <Slider id="cardb-fee" label="Card B Annual Fee" value={cardBFee} min={0} max={5000} step={250}
                          display={fmtIN(cardBFee)} onChange={setCardBFee} compact />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                        <button onClick={() => setShowAdvanced(true)}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                          Fee waiver thresholds
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Slider id="carda-waiver" label="Card A Fee Waiver Milestone" value={cardAWaiver} min={0} max={500000} step={25000}
                        display={cardAWaiver === 0 ? 'No Waiver' : fmtC(cardAWaiver)} onChange={setCardAWaiver} compact />

                      <Slider id="cardb-waiver" label="Card B Fee Waiver Milestone" value={cardBWaiver} min={0} max={500000} step={25000}
                        display={cardBWaiver === 0 ? 'No Waiver' : fmtC(cardBWaiver)} onChange={setCardBWaiver} compact />

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
                    <DonutChart cardANet={calculations.netA} cardBNet={calculations.netB} />
                  </div>

                  {/* Donut Legend */}
                  <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 16, marginBottom: mobile ? 12 : 18 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Card A Net Return</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Card B Net Return</span>
                    </div>
                  </div>

                  {/* Primary result box */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: mobile ? '14px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#50565C' }}>Recommended Winner</div>
                      <div style={{ fontSize: 11, color: '#7A8087', marginTop: 2 }}>
                        {calculations.diff >= 0 ? `Card A wins by ${fmtIN(calculations.diff)}` : `Card B wins by ${fmtIN(-calculations.diff)}`}
                      </div>
                    </div>
                    <span aria-live="polite" aria-label={`Winning Card: ${calculations.winner}`}
                      style={{ fontSize: mobile ? 18 : 22, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {calculations.winner}
                    </span>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: 'Card A Gross Rewards (Annual)', value: fmtIN(calculations.grossA) },
                    { label: 'Card A Net Return (After Fee)', value: fmtIN(calculations.netA) },
                    { label: 'Card B Gross Rewards (Annual)', value: fmtIN(calculations.grossB) },
                    { label: 'Card B Net Return (After Fee)', value: fmtIN(calculations.netB) },
                    { label: 'Annual Net Difference', value: fmtIN(Math.abs(calculations.diff)) },
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

              <div style={secS} id="what-is-card-comparison">
                <h2 style={h2S}>What Is a Credit Card Comparison Calculator?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    A credit card comparison calculator evaluates two competing credit cards side-by-side by computing expected annual reward earnings minus renewal fees based on your personal monthly spending.
                  </p>
                </div>
                <p style={pS}>With hundreds of credit cards available in India from issuers like SBI Card, HDFC Bank, ICICI Bank, and Axis Bank, choosing between a paid card with high rewards and a lifetime free card requires precise math.</p>
                <p style={pS}>This calculator factors in effective reward percentages, annual renewal fees, GST on annual fees, and annual milestone waivers to identify which card delivers maximum net value.</p>
              </div>

              <div style={secS} id="comparison-formula">
                <h2 style={h2S}>Net Reward Comparison Formula</h2>
                <p style={pS}>The true value of a credit card is its Net Annual Return, computed as gross rewards earned minus annual fees paid.</p>
                
                <div style={{ background: '#f8f9f9', border: `1px solid ${C.border}`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, margin: '0 0 8px' }}>Net Card Return Formula</p>
                  <code style={{ fontSize: 13, color: C.dark }}>Net Return = (Annual Spend × Reward Rate %) - Effective Annual Fee</code>
                </div>

                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                      Worked comparison: SBI Cashback Card vs Amazon Pay ICICI Card at Rs 30,000 monthly spend (Rs 3.6 Lakh annual).
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Metric</th>
                        <th scope="col" style={{ ...thS, textAlign: 'left' }}>SBI Cashback Card (Paid)</th>
                        <th scope="col" style={{ ...thS, textAlign: 'left' }}>Amazon Pay ICICI (Free)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={tdL}>Annual Spend</td>
                        <td style={tdL}>Rs 3,60,000</td>
                        <td style={tdL}>Rs 3,60,000</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>Gross Rewards (5% vs 2%)</td>
                        <td style={tdL}>Rs 18,000</td>
                        <td style={tdL}>Rs 7,20,000</td>
                      </tr>
                      <tr>
                        <td style={tdL}>Annual Renewal Fee</td>
                        <td style={tdL}>Rs 0 (Waived at 2L spend)</td>
                        <td style={tdL}>Rs 0 (Lifetime Free)</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}><strong>Net Annual Advantage</strong></td>
                        <td style={tdL}><strong>Rs 18,000 Net Return</strong></td>
                        <td style={tdL}>Rs 7,200 Net Return</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={secS} id="how-to-use">
                <h2 style={h2S}>How to Use This Credit Card Comparison Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Monthly Spend:</strong> Input your expected average monthly spending across all categories.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set Card A Parameters:</strong> Enter Card A expected reward rate (%) and annual renewal fee.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set Card B Parameters:</strong> Enter Card B expected reward rate (%) and annual renewal fee.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Review Winner &amp; Difference:</strong> View net annual return for each card and see the net monetary advantage.
                  </li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> Credit card reward comparison figures are illustrative estimates based on user-entered reward rates and standard card fees in India. Actual credit card benefits, reward point redemption ratios, exclusion categories, and milestone waivers depend on specific issuer policies from SBI, ICICI, HDFC, or Axis Bank.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .cccc-sidebar::-webkit-scrollbar { width: 5px; }
            .cccc-sidebar::-webkit-scrollbar-track { background: transparent; }
            .cccc-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .cccc-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            className="cccc-sidebar"
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
              <ComparisonSnapshot />
              <nav aria-label="Related Calculators" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <SidebarList title="Popular Credit Tools" items={POPULAR_TOOLS} />
                <SidebarList title="More Financial Calculators" items={MORE_TOOLS} />
              </nav>
              <RelatedReads />
            </div>
          </aside>
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/cashback-earnings-calculator|Cashback Calculator', '/calculators/credit-card-emi-calculator|Credit Card EMI', '/calculators/credit-utilization-calculator|Credit Utilization', '/calculators/sip-calculator|SIP', '/calculators/fd-calculator|FD', '/calculators/gst-calculator|GST'] },
        { hd: 'Topics', links: ['/#|Credit Cards', '/#|Card Comparison', '/#|Rewards', '/#|Personal Finance'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} />
    </div>
  );
}

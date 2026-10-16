'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect, useId } from 'react';
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

/* ── Benchmark Credit Cards Data ──────────────────────── */
const CARD_BENCHMARKS = [
  { name: 'SBI Cashback Card', fee: 999, waiver: 200000, rewardRate: 5.0, loungeVal: 0, type: 'Cashback' },
  { name: 'HDFC Regalia Gold', fee: 2500, waiver: 300000, rewardRate: 2.6, loungeVal: 4000, type: 'Travel & Rewards' },
  { name: 'Axis Bank Atlas', fee: 5000, waiver: 1500000, rewardRate: 4.0, loungeVal: 8000, type: 'Miles & Travel' },
  { name: 'ICICI Sapphiro', fee: 3500, waiver: 600000, rewardRate: 1.5, loungeVal: 5000, type: 'Premium Dual' },
  { name: 'HDFC Infinia Metal', fee: 12500, waiver: 1000000, rewardRate: 3.3, loungeVal: 12000, type: 'Super Premium' },
  { name: 'Axis Bank Ace', fee: 499, waiver: 200000, rewardRate: 2.0, loungeVal: 1600, type: 'Utility Cashback' },
];

/* ── Slider Component ─────────────────────────────────── */
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
    <div style={{ marginBottom: compact ? 18 : 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 8 : 12 }}>
        {label ? <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 13.5 : 14, color: C.ink2, fontWeight: 400 }}>{label}</label> : <span />}
        {editing ? (
          <div style={{ position: 'relative' }}>
            <input id={inputId} autoFocus value={raw} aria-label={`Enter ${label} value`}
              onChange={e => setRaw(e.target.value)} onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
              style={{ fontSize: 14, fontWeight: 700, textAlign: suffix ? 'left' : 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 130, outline: 'none', color: C.dark, fontFamily: INTER }} />
            {suffix && <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: C.ink3, pointerEvents: 'none', fontWeight: 700 }}>{suffix}</span>}
          </div>
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${display}. Click to edit.`}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}
            style={{ fontSize: compact ? 13 : 14.5, fontWeight: 700, color: C.dark, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '5px 12px' : '7px 16px', cursor: 'pointer', fontFamily: INTER, minWidth: compact ? 85 : 105, textAlign: 'center', transition: 'border-color 0.15s' }}>
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
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{ fontSize: 11, color: C.ink3 }}>{min}{suffix || ''}</span>
        <span style={{ fontSize: 11, color: C.ink3 }}>{max}{suffix || ''}</span>
      </div>
    </div>
  );
}

/* ── Sidebar Component ─────────────────────────────────── */
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

function CardSnapshot() {
  const rows = [
    { label: 'Avg India Reward Yield', value: '1.5% - 3.5%' },
    { label: 'Top Cashback Rate', value: '5.0%' },
    { label: 'Lounge Visit Valuation', value: 'Rs 800 - Rs 1,200' },
    { label: 'Fee Waiver Standard', value: 'Rs 2L - Rs 10L spend' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Credit Card Snapshot</span>
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
    { href: '/blogs/world-gdp-ranking-2026', label: 'World GDP Ranking 2026: Economy & Credit Card Spending Trends' },
    { href: '/blogs/itr-filing-last-date-fy-2025-26', label: 'ITR Filing Due Dates AY 2026-27: Claiming Card Fees & Expenses' },
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

const POPULAR = [
  { href: '/calculators/cashback-earnings-calculator',     label: 'Cashback Earnings Calculator' },
  { href: '/calculators/credit-card-comparison-calculator',label: 'Credit Card Comparison' },
  { href: '/calculators/credit-card-emi-calculator',       label: 'Credit Card EMI Calculator' },
  { href: '/calculators/credit-utilization-calculator',     label: 'Credit Utilization Calculator' },
  { href: '/calculators/credit-health-score-calculator',    label: 'Credit Health Score Calculator' },
];
const MORE = [
  { href: '/calculators/personal-loan-calculator',         label: 'Personal Loan Calculator' },
  { href: '/calculators/debt-consolidation-calculator',     label: 'Debt Consolidation Calculator' },
  { href: '/calculators/in-hand-salary-calculator',        label: 'In-Hand Salary Calculator' },
  { href: '/calculators/income-tax-calculator',            label: 'Income Tax Calculator' },
];

/* ── FAQ Section ───────────────────────────────────────── */
const FAQS = [
  { q: 'What is net card value for a credit card?', a: 'Net card value is the total monetary benefit earned from a credit card over one year (cashback, reward points, lounge access, milestone vouchers) minus the effective annual fee paid after applying fee waivers.' },
  { q: 'How do you calculate net credit card reward return rate?', a: 'Net reward return rate is calculated by dividing your Net Annual Card Value (total perks minus fee paid) by your total annual spend, then multiplying by 100 to get a net percentage yield.' },
  { q: 'How does an annual fee waiver threshold work?', a: 'Most premium Indian credit cards waive the upcoming year\'s annual fee if your total spend in the preceding 12 months meets or exceeds a specified threshold, such as Rs 2 lakh for HDFC Regalia Gold or Rs 10 lakh for HDFC Infinia.' },
  { q: 'What is the monetary value of airport lounge access?', a: 'Domestic airport lounge access in India is typically valued at Rs 800 to Rs 1,200 per visit based on walk-in rates, while international lounge access via Priority Pass or DreamFolks is valued at Rs 2,000 to Rs 3,000 per visit.' },
  { q: 'Is SBI Cashback Card worth the Rs 999 annual fee?', a: 'Yes. SBI Cashback offers 5% cashback on online spends up to Rs 5,000 monthly. Spending Rs 20,000 monthly online yields Rs 12,000 annual cashback, far exceeding the Rs 999 fee, which is also waived on Rs 2 lakh annual spend.' },
  { q: 'How do milestone bonuses affect credit card value?', a: 'Milestone bonuses provide extra reward points, flight tickets, or brand vouchers when you reach specific annual spend milestones, effectively boosting your overall return rate by 1% to 3% on targeted spend tiers.' },
  { q: 'Should I keep a credit card if the net annual value is negative?', a: 'If a credit card generates negative net annual value and offers no non-monetary benefits like credit history length or emergency protection, you should consider upgrading, downgrading to a lifetime free card, or closing it.' },
  { q: 'What is a good net reward rate for an Indian credit card?', a: 'A net reward rate of 1.5% to 3% is considered good for general spending cards, while specialized cashback or travel cards like SBI Cashback, Axis Atlas, or HDFC Infinia can deliver net returns between 4% and 10% on optimized spend.' },
  { q: 'How does GST affect credit card annual fees?', a: 'Credit card annual fees in India attract 18% GST. A nominal fee of Rs 1,000 costs Rs 1,180 in total, which must be factored into your net annual fee calculation.' },
  { q: 'What is a lifetime free (LTF) credit card?', a: 'A lifetime free credit card charges zero joining fee and zero annual recurring fee unconditionally, ensuring every rupee of reward or cashback earned is 100% net profit.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ── Donut Chart ──────────────────────────────────────── */
function DonutChart({ rewards, perks, fee }: { rewards: number; perks: number; fee: number }) {
  const total = rewards + perks + fee;
  if (total === 0) return null;
  const R = 80, sw = 22, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const rewardsArc = (rewards / total) * circ;
  const perksArc = (perks / total) * circ;
  const feeArc = (fee / total) * circ;
  const netValue = rewards + perks - fee;

  return (
    <svg role="img" aria-label={`Card rewards split: ${Math.round((rewards/total)*100)}% rewards, ${Math.round((perks/total)*100)}% perks, ${Math.round((fee/total)*100)}% fee`}
      width="212" height="212" viewBox="0 0 212 212" style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.border} strokeWidth={sw} />
      {/* Rewards arc */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw}
        strokeDasharray={`${rewardsArc} ${circ - rewardsArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      {/* Perks arc */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${perksArc} ${circ - perksArc}`} strokeDashoffset={(circ / 4) - rewardsArc}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Net Benefit</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 22, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>
        {netValue >= 0 ? `+Rs ${Math.round(netValue).toLocaleString('en-IN')}` : `-Rs ${Math.abs(Math.round(netValue)).toLocaleString('en-IN')}`}
      </text>
    </svg>
  );
}

/* ── Bar Chart ────────────────────────────────────────── */
function BarChart({ monthlySpend, rewardRate, fee }: { monthlySpend: number; rewardRate: number; fee: number }) {
  const tiers = [10000, 25000, 50000, 75000, 100000, 150000, 200000];
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const rows = tiers.map(s => {
    const annualS = s * 12;
    const gross = (annualS * rewardRate) / 100;
    const net = gross - fee;
    return { spend: s, gross, net: Math.max(0, net) };
  });
  const maxNet = Math.max(...rows.map(r => r.gross));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(8, Math.min(32, slot * 0.7));
  const gap = (slot - barW) / 2;

  return (
    <svg role="img" aria-label="Spend tier versus net annual card value chart"
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {rows.map((r, i) => {
        const h = maxNet > 0 ? (r.gross / maxNet) * H : 0;
        const netH = maxNet > 0 ? (r.net / maxNet) * H : 0;
        const x = PADL + i * slot + gap;
        return (
          <g key={r.spend}>
            <rect x={x} y={H - h} width={barW} height={h} fill={CHART_PAIR.secondary} rx={3} />
            <rect x={x} y={H - netH} width={barW} height={netH} fill={CHART_PAIR.primary} rx={3} />
            <text x={x + barW / 2} y={H + 14} textAnchor="middle" style={{ fontSize: 9, fill: C.ink3, fontFamily: INTER }}>
              {r.spend >= 100000 ? `${r.spend / 100000}L` : `${r.spend / 1000}k`}
            </text>
          </g>
        );
      })}
      <line x1={PADL} y1={H} x2={W} y2={H} stroke={C.border} strokeWidth={1} />
    </svg>
  );
}

/* ── Article Style Constants ──────────────────────────── */
const h2S: React.CSSProperties = { fontSize: 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' };
const pS: React.CSSProperties = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' };
const secS: React.CSSProperties = { margin: '0 0 40px' };
const bulletS: React.CSSProperties = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 };
const thS: React.CSSProperties = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', verticalAlign: 'middle', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' };
const tdL: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'left', border: `1px solid ${C.border}`, verticalAlign: 'middle' };
const tdR: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, textAlign: 'left', border: `1px solid ${C.border}`, verticalAlign: 'middle' };
const tdC: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'center', border: `1px solid ${C.border}`, verticalAlign: 'middle' };

/* ════════════════════════════════════════════════════════ */
export default function NetCardValueClient() {
  const defaultSettings = {
    annualFee: 3000,
    monthlySpend: 50000,
    rewardRate: 3.0,
    feeWaiverThreshold: 200000,
    loungePerkValue: 4000,
  };
  const { settings, updateSettings } = useCalculatorSettings('net-card-value', defaultSettings);
  const { annualFee, monthlySpend, rewardRate, feeWaiverThreshold, loungePerkValue } = settings;

  const [mobile, setMobile] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  useLayoutEffect(() => { const chk = () => setMobile(window.innerWidth < 1024); chk(); window.addEventListener('resize', chk); return () => window.removeEventListener('resize', chk); }, []);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  // Math Calculations
  const annualSpend = monthlySpend * 12;
  const isFeeWaived = annualSpend >= feeWaiverThreshold && feeWaiverThreshold > 0;
  const gstOnFee = Math.round(annualFee * 0.18);
  const totalFeeWithGst = annualFee + gstOnFee;
  const effectiveFeePaid = isFeeWaived ? 0 : totalFeeWithGst;
  const grossCashback = Math.round((annualSpend * rewardRate) / 100);
  const totalBenefits = grossCashback + loungePerkValue;
  const netCardValue = totalBenefits - effectiveFeePaid;
  const netReturnRate = annualSpend > 0 ? ((netCardValue / annualSpend) * 100).toFixed(2) : '0.00';

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>Net Card Value Calculator</h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate the true annual value of your credit card after annual fees, fee waiver milestones, category rewards, and airport lounge perks.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>
              
              {/* Card Outer Frame */}
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Inputs Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '36px 36px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Card Fees & Spend</p>
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider id="monthly-spend" label="Average Monthly Spend" value={monthlySpend} min={5000} max={1000000} step={1000}
                        display={fmtIN(monthlySpend)} onChange={v => updateSettings({ monthlySpend: v })} compact />

                      <Slider id="annual-fee" label="Annual Card Fee (excl GST)" value={annualFee} min={0} max={50000} step={500}
                        display={fmtIN(annualFee)} onChange={v => updateSettings({ annualFee: v })} compact />

                      <Slider id="reward-rate" label="Average Reward Rate (%)" value={rewardRate} min={0.5} max={15} step={0.1}
                        display={`${rewardRate.toFixed(1)}%`} onChange={v => updateSettings({ rewardRate: v })} compact />

                      <Slider id="fee-waiver" label="Fee Waiver Spend Threshold" value={feeWaiverThreshold} min={0} max={1500000} step={10000}
                        display={fmtIN(feeWaiverThreshold)} onChange={v => updateSettings({ feeWaiverThreshold: v })} compact />

                      <button onClick={() => setShowAdvanced(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        More settings
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <Slider id="lounge-perks" label="Lounge Access & Milestone Perks (Rs/yr)" value={loungePerkValue} min={0} max={50000} step={500}
                        display={fmtIN(loungePerkValue)} onChange={v => updateSettings({ loungePerkValue: v })} compact />

                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: 14, marginBottom: 20 }}>
                        <div style={{ fontSize: 12, color: C.ink3, marginBottom: 4 }}>Annual Fee Status</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: isFeeWaived ? '#166534' : C.ink }}>
                          {isFeeWaived ? 'Waived (Spend meets threshold)' : `Payable (${fmtIN(totalFeeWithGst)} incl 18% GST)`}
                        </div>
                      </div>

                      <button onClick={() => setShowAdvanced(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        Back
                      </button>
                    </>
                  )}
                </div>

                {/* Output Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '36px 36px', background: '#fafafa', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Donut Chart - Desktop order -1 */}
                    <div style={{ order: mobile ? 1 : -1, marginBottom: 16 }}>
                      <DonutChart rewards={grossCashback} perks={loungePerkValue} fee={effectiveFeePaid} />
                    </div>

                    {/* Donut Legend - Desktop order -1 */}
                    <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 14, marginBottom: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                        <span style={{ fontSize: 12, color: C.ink2 }}>Cashback</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                        <span style={{ fontSize: 12, color: C.ink2 }}>Lounge/Perks</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: C.border }} aria-hidden="true" />
                        <span style={{ fontSize: 12, color: C.ink2 }}>Fee Paid</span>
                      </div>
                    </div>

                    {/* Dark Result Box */}
                    <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 14, padding: '20px 24px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'stretch' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#50565C' }}>Net Annual Card Value</div>
                        <div style={{ fontSize: 12, color: '#7A8087' }}>Net Reward Return Rate</div>
                      </div>
                      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                        <div style={{ fontSize: 24, fontWeight: 800, color: netCardValue >= 0 ? C.lime : '#FFB4B4', lineHeight: 1 }}>
                          <span aria-live="polite" aria-label={`Net annual value: ${fmtIN(netCardValue)}`}>{fmtIN(netCardValue)}</span>
                        </div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: '#101214', lineHeight: 1 }}>
                          {netReturnRate}% yield
                        </div>
                      </div>
                    </div>

                    {/* Breakdown Stat Rows */}
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, borderBottom: `1px solid ${C.border}`, paddingBottom: 6 }}>
                        <span style={{ color: C.ink2 }}>Annual Total Spend</span>
                        <span style={{ fontWeight: 600, color: C.ink }}>{fmtC(annualSpend)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, borderBottom: `1px solid ${C.border}`, paddingBottom: 6 }}>
                        <span style={{ color: C.ink2 }}>Gross Rewards & Cashback</span>
                        <span style={{ fontWeight: 600, color: '#166534' }}>+{fmtC(grossCashback)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, borderBottom: `1px solid ${C.border}`, paddingBottom: 6 }}>
                        <span style={{ color: C.ink2 }}>Lounge & Milestone Perks</span>
                        <span style={{ fontWeight: 600, color: '#166534' }}>+{fmtC(loungePerkValue)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                        <span style={{ color: C.ink2 }}>Effective Fee (incl GST)</span>
                        <span style={{ fontWeight: 600, color: isFeeWaived ? '#166534' : C.ink }}>
                          {isFeeWaived ? 'Rs 0 (Waived)' : `-${fmtC(effectiveFeePaid)}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div style={{ marginBottom: 24 }}><SaveResultsCard mobile={mobile} /></div>

            {/* ── Benchmark Credit Cards Table ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', marginBottom: 32, boxShadow: '0 1px 12px rgba(16,18,20,0.05)' }}>
              <div style={{ padding: '16px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>Benchmark Cards Net Value at {fmtC(annualSpend)} Annual Spend</div>
                  <div style={{ fontSize: 12, color: C.ink3, marginTop: 3 }}>Net return calculated at your current spend level</div>
                </div>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 20px 12px' }}>Net annual monetary value across popular Indian credit cards for the spend entered above.</caption>
                  <thead>
                    <tr>
                      <th scope="col" style={thS}>Card Name</th>
                      <th scope="col" style={{ ...thS, textAlign: 'center' }}>Type</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Annual Fee</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Waiver Limit</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Net Annual Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CARD_BENCHMARKS.map((b, i) => {
                      const waived = annualSpend >= b.waiver;
                      const feePaid = waived ? 0 : Math.round(b.fee * 1.18);
                      const rewardsEarned = Math.round((annualSpend * b.rewardRate) / 100);
                      const netVal = rewardsEarned + b.loungeVal - feePaid;
                      const isHighest = netVal === Math.max(...CARD_BENCHMARKS.map(x => Math.round((annualSpend * x.rewardRate)/100) + x.loungeVal - (annualSpend >= x.waiver ? 0 : Math.round(x.fee * 1.18))));
                      return (
                        <tr key={b.name} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>{b.name}</td>
                          <td style={tdC}>{b.type}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>Rs {b.fee.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>Rs {b.waiver.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdR, textAlign: 'right', color: isHighest ? '#1f7a58' : C.ink }}>{fmtC(netVal)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── Spend vs Net Value Visual ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', marginBottom: 32, padding: '20px 24px', boxShadow: '0 1px 12px rgba(16,18,20,0.05)' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.ink, marginBottom: 4 }}>Spend Tier vs Net Card Return</div>
              <div style={{ fontSize: 12, color: C.ink3, marginBottom: 16 }}>Gross rewards (lime) vs net profit after annual fee (dark green) across monthly spend levels</div>
              <BarChart monthlySpend={monthlySpend} rewardRate={rewardRate} fee={effectiveFeePaid} />
              <div style={{ display: 'flex', gap: 20, marginTop: 14, justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} aria-hidden="true" />
                  <span style={{ fontSize: 12, color: C.ink2 }}>Gross Rewards</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} aria-hidden="true" />
                  <span style={{ fontSize: 12, color: C.ink2 }}>Net Value (after fee)</span>
                </div>
              </div>
            </div>

            

            {/* ════════════════════ ARTICLE ════════════════════ */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={secS} id="what-is-net-value">
                <h2 style={h2S}>What Is Net Card Value?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Net Card Value is the monetary profit earned from a credit card over one year after subtracting annual fees and 18% GST from total cashback, reward points, and lounge access perks.
                  </p>
                </div>
                <p style={pS}>Most credit card marketing emphasizes headline reward rates like "up to 5% cashback" or "complimentary lounge access". However, expensive annual fees, restrictive fee-waiver thresholds, and capping limits can reduce real-world returns.</p>
                <p style={pS}>This calculator accounts for your actual monthly spend, average category reward rate, annual fee waiver thresholds, and airport lounge visit valuations to compute your exact net annual profit in rupees.</p>
                <p style={pS}>Comparing cards for general cashback or specific expense categories? Use the <Link href="/calculators/cashback-earnings-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Cashback Earnings Calculator</Link> to analyze monthly category limits or the <Link href="/calculators/credit-card-comparison-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Credit Card Comparison Calculator</Link> for side-by-side card evaluation.</p>
              </div>

              <div style={secS} id="net-value-formula">
                <h2 style={h2S}>Net Card Value Formula</h2>
                <p style={pS}>The calculation follows a clear two-step mathematical structure: sum up all annual benefits, then subtract the effective annual fee paid after applying fee waivers.</p>
                <div style={{ background: '#f8f9f9', border: `1px solid ${C.border}`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, margin: '0 0 8px' }}>Step 1: Calculate Total Benefits</p>
                  <code style={{ fontSize: 13 }}>Total Benefits = (Annual Spend × Reward Rate %) + Lounge Perk Value + Milestone Vouchers</code>

                  <p style={{ fontSize: 14, fontWeight: 700, margin: '16px 0 8px' }}>Step 2: Determine Effective Fee & Net Value</p>
                  <code style={{ fontSize: 13 }}>Effective Fee = (Annual Spend ≥ Waiver Limit) ? 0 : (Annual Fee × 1.18)</code>
                  <br />
                  <code style={{ fontSize: 13 }}>Net Card Value = Total Benefits - Effective Fee</code>
                </div>
                <p style={{ ...pS, fontWeight: 600 }}>Worked example: Rs 50,000 monthly spend (Rs 6,00,000/yr), Rs 3,000 annual fee (waiver at Rs 2,00,000), 3% reward rate, Rs 4,000 lounge value</p>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Gross cashback: Rs 6,00,000 × 3% = <strong>Rs 18,000</strong></span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Fee status: Rs 6,00,000 spend exceeds Rs 2,00,000 threshold → <strong>Fee Waived (Rs 0 paid)</strong></span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Net Card Value: Rs 18,000 + Rs 4,000 lounge perks = <strong>Rs 22,000 net profit (3.67% yield)</strong></span></div>
              </div>

              <div style={secS} id="fee-waiver-rules">
                <h2 style={h2S}>Annual Fee Waiver Thresholds in India</h2>
                <p style={pS}>Indian banks offer automatic annual fee waivers when your annual spend exceeds pre-defined milestones. Achieving a waiver converts an expensive card into a zero-cost asset.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>Annual fees, fee waiver thresholds, and net spend required per month to trigger waiver.</caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Card Variant</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Annual Fee (excl GST)</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Waiver Spend Limit</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Min Monthly Spend for Waiver</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { c: 'SBI Cashback Card', f: 999, w: 200000, m: 16667 },
                        { c: 'HDFC Regalia Gold', f: 2500, w: 300000, m: 25000 },
                        { c: 'Axis Bank Atlas', f: 5000, w: 1500000, m: 125000 },
                        { c: 'ICICI Sapphiro', f: 3500, w: 600000, m: 50000 },
                        { c: 'HDFC Infinia Metal', f: 12500, w: 1000000, m: 83333 },
                        { c: 'Axis Bank Ace', f: 499, w: 200000, m: 16667 },
                      ].map((row, i) => (
                        <tr key={row.c} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>{row.c}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>Rs {row.f.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>Rs {row.w.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdR, textAlign: 'right', color: '#166534' }}>Rs {row.m.toLocaleString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={secS} id="card-comparison">
                <h2 style={h2S}>Top Credit Cards Net Value Comparison</h2>
                <p style={pS}>Evaluating credit card performance requires comparing net return yield across identical annual spend tiers.</p>
                <p style={pS}>Specialized cashback cards like SBI Cashback deliver high flat returns on lower spends, while premium travel cards like Axis Atlas or HDFC Infinia unlock higher net value at multi-lakh spend tiers through flight transfer partners and milestone vouchers.</p>
              </div>

              <div style={secS} id="lounge-milestone-perks">
                <h2 style={h2S}>Valuing Lounge Access and Milestone Perks</h2>
                <p style={pS}>Airport lounge access, hotel memberships, and flight vouchers carry real monetary value, but only if you actively use them.</p>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Domestic Lounge Access:</strong> valued conservatively at Rs 800 to Rs 1,000 per visit based on food, beverages, and quiet workspace.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>International Lounge Access:</strong> Priority Pass or DreamFolks visits valued at Rs 2,000 to Rs 2,800 per international visit.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Milestone Vouchers:</strong> vouchers for Taj, Marriott, Yatra, or Amazon should be valued at 80% of face value to adjust for brand restrictions.</span></div>
              </div>

              <div style={secS} id="cashback-vs-reward-points">
                <h2 style={h2S}>Cashback vs Reward Points Net Value</h2>
                <p style={pS}>Direct cashback offers immediate 1:1 rupee value credited to your credit card statement. Reward points require careful evaluation of point-to-rupee redemption ratios.</p>
                <p style={pS}>For example, HDFC Reward Points redeem at Rs 1.00 per point for flight bookings on SmartBuy, but drop to Rs 0.30 per point for statement cash conversion. Always use true redemption value when calculating reward rate percentage.</p>
              </div>

              <div style={secS} id="excel-formula">
                <h2 style={h2S}>Net Card Value Formula in Excel</h2>
                <p style={pS}>You can model net card value in Microsoft Excel or Google Sheets using standard conditional IF formulas.</p>
                <div style={{ background: '#f8f9f9', border: `1px solid ${C.border}`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  <code style={{ fontSize: 13, display: 'block', marginBottom: 8 }}>A1: Monthly Spend | B1: Annual Fee | C1: Reward Rate % | D1: Waiver Limit | E1: Perks</code>
                  <code style={{ fontSize: 13, color: '#166534' }}>=IF((A1*12)&gt;=D1, 0, B1*1.18) + (A1*12*(C1/100)) + E1</code>
                </div>
              </div>

              <div style={secS} id="spend-table">
                <h2 style={h2S}>Spend vs Net Value Table</h2>
                <p style={pS}>The table below shows net annual profit across spend tiers for a standard card charging Rs 2,500 fee (waiver at Rs 3,00,000) with a 2.5% reward rate and Rs 3,000 perk value.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>Net annual value by monthly spend tier.</caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Monthly Spend</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Annual Spend</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Fee Paid (incl GST)</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Net Annual Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { m: 15000, a: 180000, f: 2950, n: 4550 },
                        { m: 25000, a: 300000, f: 0, n: 10500 },
                        { m: 50000, a: 600000, f: 0, n: 18000 },
                        { m: 100000, a: 1200000, f: 0, n: 33000 },
                      ].map((row, i) => (
                        <tr key={row.m} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>Rs {row.m.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>Rs {row.a.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>Rs {row.f.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdR, textAlign: 'right', color: '#166534' }}>Rs {row.n.toLocaleString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={secS} id="common-mistakes">
                <h2 style={h2S}>Common Mistakes in Credit Card Valuation</h2>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Ignoring 18% GST on annual fees:</strong> a Rs 5,000 fee costs Rs 5,900 after GST, reducing net return by Rs 900.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Overvaluing unused lounge perks:</strong> counting 8 lounge visits when you only travel twice a year inflates net value.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Overlooking category spend caps:</strong> 5% cashback capped at Rs 5,000/mo yields zero extra on spends beyond Rs 1,00,000.</span></div>
              </div>

              <div style={secS} id="how-to-maximize">
                <h2 style={h2S}>How to Maximize Net Card Value</h2>
                <ol style={{ paddingLeft: 24, margin: '0 0 16px', listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Consolidate spends to trigger fee waivers:</strong> route fixed utility bills and insurance payments through one primary card to clear annual waiver thresholds.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Optimize for transfer partners:</strong> transfer reward points to airline miles (e.g. Vistara, KrisFlyer, Accor) where 1 point can yield Rs 1.50 to Rs 2.50 in value.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Track category caps:</strong> switch to an alternate card once you hit monthly cashback limits on cards like SBI Cashback or Axis Ace.</li>
                </ol>
              </div>

              <div style={secS} id="how-to-use">
                <h2 style={h2S}>How to Use This Calculator</h2>
                <ol style={{ paddingLeft: 24, margin: '0 0 16px', listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Enter average monthly spend:</strong> set your regular monthly credit card expenditure.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Set card annual fee and waiver limit:</strong> enter the fee and the annual spend needed for fee waiver.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Enter reward rate % and lounge perks:</strong> add average reward yield and annual lounge perk values.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Review net annual value:</strong> check your net rupee profit, fee waiver status, and benchmark card comparison table.</li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All figures on this page are indicative estimates based on user inputs and standard card reward terms. Actual credit card rewards depend on individual bank terms, spend categories, exclusions, and reward redemption choices. This tool is for educational purposes only and does not constitute financial advice. Consult your card issuer or financial adviser before making credit card decisions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .net-card-sidebar::-webkit-scrollbar { width: 5px; }
            .net-card-sidebar::-webkit-scrollbar-track { background: transparent; }
            .net-card-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .net-card-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            className="net-card-sidebar"
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
              <CardSnapshot />
              <SidebarList title="Related Calculators" items={POPULAR} />
              <SidebarList title="More Tools" items={MORE} />
              <RelatedReads />
            </div>
          </aside>
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/personal-loan-calculator|Personal Loan', '/calculators/home-loan-calculator|Home Loan', '/calculators/emi-calculator|EMI', '/calculators/sip-calculator|SIP', '/calculators/fd-calculator|FD', '/calculators/gst-calculator|GST'] },
        { hd: 'Topics', links: ['/#|Mutual Funds', '/#|Home Loans', '/#|Fixed Deposits', '/#|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} />
    </div>
  );
}

'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect } from 'react';
import Link from 'next/link';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
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

/* ─── Math ───────────────────────────────────────────────────── */
// Weights are the commonly cited CIBIL factor breakdown (payment history ~35%, utilization ~30%,
// credit age ~15%, credit mix ~10%, new inquiries ~10%). CIBIL's actual algorithm is proprietary
// and not published in full; these are the widely reported figures used across major lenders and
// credit-education sites, not Fermor's own invention.
type PaymentHistory = 'never' | '1-2' | '3-5' | '6+';
type CreditMix = 'both' | 'unsecured' | 'secured' | 'none';
type Inquiries = '0' | '1-2' | '3-4' | '5+';

function paymentScore(v: PaymentHistory): number {
  return { never: 100, '1-2': 65, '3-5': 35, '6+': 10 }[v];
}
function utilizationScore(u: number): number {
  return u <= 30 ? 100 - (u / 30) * 20 : 80 - ((u - 30) / 70) * 80;
}
function historyScore(years: number): number {
  return Math.min(100, (years / 7) * 100);
}
function mixScore(v: CreditMix): number {
  return { both: 100, unsecured: 60, secured: 70, none: 20 }[v];
}
function inquiryScore(v: Inquiries): number {
  return { '0': 100, '1-2': 75, '3-4': 45, '5+': 15 }[v];
}

interface ScoreResult {
  composite: number;
  midpoint: number;
  rangeLow: number;
  rangeHigh: number;
  band: string;
  factorScores: { label: string; weight: number; score: number }[];
}

function calcScore(payment: PaymentHistory, utilization: number, years: number, mix: CreditMix, inquiries: Inquiries): ScoreResult {
  const pScore = paymentScore(payment);
  const uScore = utilizationScore(utilization);
  const hScore = historyScore(years);
  const mScore = mixScore(mix);
  const iScore = inquiryScore(inquiries);
  const composite = 0.35 * pScore + 0.30 * uScore + 0.15 * hScore + 0.10 * mScore + 0.10 * iScore;
  const midpoint = Math.round(300 + composite * 6);
  const rangeLow = Math.max(300, midpoint - 40);
  const rangeHigh = Math.min(900, midpoint + 40);
  let band = 'Poor';
  if (midpoint >= 750) band = 'Excellent';
  else if (midpoint >= 650) band = 'Good';
  else if (midpoint >= 550) band = 'Fair';
  return {
    composite,
    midpoint,
    rangeLow,
    rangeHigh,
    band,
    factorScores: [
      { label: 'Payment History', weight: 35, score: pScore },
      { label: 'Credit Utilization', weight: 30, score: uScore },
      { label: 'Credit History Length', weight: 15, score: hScore },
      { label: 'Credit Mix', weight: 10, score: mScore },
      { label: 'New Inquiries', weight: 10, score: iScore },
    ],
  };
}

/* ─── Donut Chart: composite strength vs room to improve ──────── */
function DonutChart({ composite }: { composite: number }) {
  const pct = Math.round(composite);
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const arc = (composite / 100) * circ;
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Score strength: ${pct}% of maximum possible`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${arc} ${circ - arc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Score strength</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pct}%</text>
    </svg>
  );
}

/* ─── Slider ─────────────────────────────────────────────────── */
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
    <div style={{ marginBottom: compact ? 18 : 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 12 }}>
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

const POPULAR = [
  { href: '/calculators/credit-utilization-calculator',        label: 'Credit Utilization Calculator' },
  { href: '/calculators/credit-card-interest-calculator',      label: 'Credit Card Interest Calculator' },
  { href: '/calculators/home-loan-eligibility-calculator',     label: 'Home Loan Eligibility Calculator' },
  { href: '/calculators/personal-loan-eligibility-calculator', label: 'Personal Loan Eligibility Calculator' },
  { href: '/calculators/debt-to-income-ratio-calculator',      label: 'Debt-to-Income Ratio Calculator' },
  { href: '/calculators/credit-card-emi-calculator',           label: 'Credit Card EMI Calculator' },
  { href: '/calculators/balance-transfer-savings-calculator',  label: 'Balance Transfer Savings Calculator' },
  { href: '/calculators/emi-calculator',                       label: 'EMI Calculator' },
];
const MORE = [
  { href: '/calculators/car-loan-eligibility-calculator', label: 'Car Loan Eligibility Calculator' },
  { href: '/calculators/emergency-fund-calculator',       label: 'Emergency Fund Calculator' },
  { href: '/calculators/income-tax-calculator',           label: 'Income Tax Calculator' },
  { href: '/calculators/cagr-calculator',                 label: 'CAGR Calculator' },
  { href: '/calculators/sip-calculator',                  label: 'SIP Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What is a CIBIL score?',
    a: 'A CIBIL score is a 3-digit number between 300 and 900, calculated by TransUnion CIBIL, one of four credit bureaus licensed by the RBI in India, based on your credit history: how you have repaid loans and credit cards over time. Lenders use it to judge how likely you are to repay a new loan on time.',
  },
  {
    q: 'What is a good CIBIL score?',
    a: 'A score of 750 to 900 is considered excellent and gets the best interest rates and fastest approvals. 650 to 749 is considered good and generally qualifies for most loans. 550 to 649 is fair, with fewer lenders willing to approve and higher rates when they do. 300 to 549 is poor and usually means an unpaid default or serious delinquency on record.',
  },
  {
    q: 'How is CIBIL score calculated?',
    a: 'CIBIL weighs five factors: payment history (about 35%), credit utilization (about 30%), length of credit history (about 15%), credit mix between secured and unsecured credit (about 10%), and recent credit inquiries (about 10%). The exact algorithm is proprietary and not published in full, but these weights are the commonly cited breakdown from CIBIL and major lenders.',
  },
  {
    q: 'How can I check my real CIBIL score for free?',
    a: 'The RBI requires all four credit bureaus, including CIBIL, to give every individual one free full credit report and score check per calendar year. Get your real, official score directly at cibil.com/freecibilscore. This calculator estimates a likely range from your financial behavior; it does not pull your actual bureau score.',
  },
  {
    q: 'Does checking my own CIBIL score lower it?',
    a: 'No. Checking your own score, called a soft inquiry, has no effect on your CIBIL score no matter how often you do it. Only a hard inquiry, triggered when a lender checks your score because you applied for a loan or credit card, can have a small, temporary effect.',
  },
  {
    q: 'What is credit utilization ratio and why does it matter?',
    a: 'Credit utilization ratio is the percentage of your total available credit card limit that you are currently using. Keeping it under 30% across all your cards is the widely cited threshold for a healthy score; consistently maxing out cards, even if you pay on time, signals higher risk to lenders and pulls your score down.',
  },
  {
    q: 'How does payment history affect my credit score?',
    a: 'Payment history is the single largest factor in a CIBIL score, at roughly 35% weight. A single payment more than 30 days late can stay on your credit report for years and meaningfully lower your score, while a long streak of on-time EMI and credit card payments is the most reliable way to build a strong score over time.',
  },
  {
    q: 'What is a good credit mix?',
    a: 'A good credit mix means holding both secured credit (a home loan or car loan, backed by collateral) and unsecured credit (a credit card or personal loan, not backed by collateral), rather than only one type. Lenders read a mix as evidence you can manage different kinds of credit responsibly, though it carries a smaller weight (about 10%) than payment history or utilization.',
  },
  {
    q: 'How many credit inquiries are too many?',
    a: 'More than 3 to 4 hard inquiries (loan or credit card applications) within a 6-month window is generally seen as a sign of credit hunger and can lower your score, even if every application is later approved. Spacing out applications, and only applying when you actually intend to take the loan or card, protects this part of your score.',
  },
  {
    q: 'What CIBIL score do I need for a home loan?',
    a: 'Most Indian lenders require a minimum CIBIL score of around 700 to approve a home loan, but a score of 750 or above is what actually gets you the best interest rate and fastest processing. Below 700, approval becomes harder and, where it happens, usually comes with a higher rate or a co-applicant requirement.',
  },
  {
    q: 'What CIBIL score do I need for a personal loan?',
    a: 'Banks generally look for 750 or above for their best personal loan rates, while NBFCs and fintech lenders sometimes approve applicants in the 650 to 700 range, typically at a higher interest rate to offset the added risk. Below 650, approval odds drop sharply at most lenders.',
  },
  {
    q: 'Can this calculator show my exact CIBIL score?',
    a: 'No, and no calculator that is not connected to a credit bureau can. This tool estimates a likely range using the same factors CIBIL weighs, based on what you enter, but it has no access to your actual credit report. For your real, exact score, use the free official check at cibil.com/freecibilscore.',
  },
  {
    q: 'How long does it take to improve a credit score?',
    a: 'Meaningful improvement typically takes 4 to 6 months of consistent on-time payments and lower credit utilization to show up, since bureaus update records monthly and lenders report data with some lag. Recovering from a serious default or settlement can take much longer, often 1 to 2 years of clean repayment history.',
  },
  {
    q: 'What is the difference between CIBIL, Experian, Equifax, and CRIF High Mark?',
    a: 'These are the four credit bureaus licensed by the RBI to operate in India. Each collects data independently from banks and lenders, so your score can differ slightly across all four, sometimes by 20 to 50 points, even though they use broadly similar factors. CIBIL is the oldest and most widely referenced by Indian lenders, but many banks also check one or more of the other three.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
  },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ─── Main ───────────────────────────────────────────────────── */
export default function CreditHealthScoreClient() {
  const defaultSettings = {
    payment: 'never' as PaymentHistory,
    utilization: 30,
    years: 5,
    mix: 'both' as CreditMix,
    inquiries: '0' as Inquiries,
  };
  const { settings, updateSettings } = useCalculatorSettings('credit-health-score', defaultSettings);
  const { payment, utilization, years, mix, inquiries } = settings;

  const setPayment     = (v: PaymentHistory) => updateSettings({ payment: v });
  const setUtilization = (v: number) => updateSettings({ utilization: v });
  const setYears        = (v: number) => updateSettings({ years: v });
  const setMix          = (v: CreditMix) => updateSettings({ mix: v });
  const setInquiries    = (v: Inquiries) => updateSettings({ inquiries: v });

  const [mobile, setMobile] = useState(false);
  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const result = useMemo(() => calcScore(payment, utilization, years, mix, inquiries), [payment, utilization, years, mix, inquiries]);

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const, verticalAlign: 'middle' as const } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'middle' as const, textAlign: 'left' as const } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'middle' as const, textAlign: 'right' as const } as React.CSSProperties;

  const pillActive: React.CSSProperties = { padding: '5px 14px', fontSize: 12.5, background: C.white, color: C.ink, border: `1.5px solid ${C.ink}`, fontWeight: 700, borderRadius: 6, cursor: 'pointer', fontFamily: INTER, transition: 'all 0.15s' };
  const pillInactive: React.CSSProperties = { padding: '5px 14px', fontSize: 12.5, background: 'transparent', color: C.ink3, border: `1px solid ${C.border}`, fontWeight: 500, borderRadius: 6, cursor: 'pointer', fontFamily: INTER, transition: 'all 0.15s' };

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Credit Health Score Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Estimate your likely credit score range from payment history, credit utilization, and credit mix. This is not your real CIBIL score; get that free at cibil.com.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            <section aria-label="Credit Health Score Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div role="tabpanel" style={{ padding: mobile ? '20px 18px' : '32px 36px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 20px' }}>Inputs</p>

                  <div style={{ marginBottom: 24 }}>
                    <label style={{ fontSize: 14.5, color: C.ink2, fontWeight: 400, fontFamily: INTER, display: 'block', marginBottom: 10 }}>Missed or late payments (last 2 years)</label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {([['never', 'Never'], ['1-2', '1-2 times'], ['3-5', '3-5 times'], ['6+', '6+ times']] as [PaymentHistory, string][]).map(([k, l]) => (
                        <button key={k} onClick={() => setPayment(k)} style={payment === k ? pillActive : pillInactive}>{l}</button>
                      ))}
                    </div>
                  </div>

                  <Slider label="Credit Utilization" id="chs-util" value={utilization} min={0} max={100} step={5} fmt={v => `${v}%`} onChange={setUtilization} compact={mobile} />
                  <Slider label="Credit History Length" id="chs-years" value={years} min={0} max={20} step={1} fmt={v => `${v} yr`} onChange={setYears} compact={mobile} />

                  <div style={{ marginBottom: 24 }}>
                    <label style={{ fontSize: 14.5, color: C.ink2, fontWeight: 400, fontFamily: INTER, display: 'block', marginBottom: 10 }}>Credit Mix</label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {([['both', 'Both types'], ['unsecured', 'Only unsecured'], ['secured', 'Only secured'], ['none', 'No active credit']] as [CreditMix, string][]).map(([k, l]) => (
                        <button key={k} onClick={() => setMix(k)} style={mix === k ? pillActive : pillInactive}>{l}</button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={{ fontSize: 14.5, color: C.ink2, fontWeight: 400, fontFamily: INTER, display: 'block', marginBottom: 10 }}>New credit applications (last 6 months)</label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {(['0', '1-2', '3-4', '5+'] as Inquiries[]).map(k => (
                        <button key={k} onClick={() => setInquiries(k)} style={inquiries === k ? pillActive : pillInactive}>{k}</button>
                      ))}
                    </div>
                  </div>

                  <div style={{ padding: '14px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8 }}>
                    <span style={{ fontSize: 13, color: C.ink, fontFamily: INTER }}>This is a self-reported estimate, not a bureau pull. Get your real, free CIBIL score at <a href="https://www.cibil.com/freecibilscore" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>cibil.com/freecibilscore</a>.</span>
                  </div>
                </div>

                {/* Result panel */}
                <div style={{ padding: mobile ? '20px 18px' : '32px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>
                      Estimated Score Range
                    </span>
                    <span aria-live="polite" aria-label={`Estimated score range: ${result.rangeLow} to ${result.rangeHigh}, band ${result.band}`}
                      style={{ fontSize: mobile ? 20 : 26, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {result.rangeLow} - {result.rangeHigh}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                    <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>Credit Band</span>
                    <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{result.band}</span>
                  </div>

                  {result.factorScores.map(f => (
                    <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{f.label} ({f.weight}% weight)</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{Math.round(f.score)}/100</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    <DonutChart composite={result.composite} />
                  </div>
                </div>
              </div>
            </section>

            {/* Waitlist */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-credit-health-score">What Is a Credit Health Score?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    A credit health score is an estimate of your likely CIBIL score range, built from the same factors CIBIL actually weighs: payment history, credit utilization, credit age, credit mix, and recent inquiries. It is not a substitute for your real bureau score.
                  </p>
                </div>
                <p style={p}>
                  Fermor has no connection to CIBIL, Experian, Equifax, or CRIF High Mark, so this calculator cannot and does not pull your actual credit report. What it does is apply the publicly known scoring weights to what you tell it about your own credit behavior, giving you a realistic range and a sense of which factor is holding your score back.
                </p>
                <p style={p}>
                  For your real, exact score, use the free annual check every credit bureau is required to offer under RBI rules, at <a href="https://www.cibil.com/freecibilscore" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>cibil.com/freecibilscore</a>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="calculation-formula">How This Estimate Is Calculated</h2>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark }}>
                    Composite = 0.35 x Payment + 0.30 x Utilization + 0.15 x History + 0.10 x Mix + 0.10 x Inquiries
                  </code>
                </div>
                <p style={p}>
                  Each factor is scored 0 to 100 based on your inputs, then combined using the weights above, the most commonly cited breakdown of CIBIL's own methodology across major Indian lenders and credit-education sources. The composite is then mapped onto the real 300-900 CIBIL scale, and a 40-point band is shown on either side to reflect that this is an estimate, not an exact figure.
                </p>
              </div>

              <div style={sec} id="score-ranges">
                <h2 style={h2}>CIBIL Score Ranges</h2>
                <div style={{ overflowX: 'auto', marginBottom: 8 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>CIBIL score bands and what they mean for lending</caption>
                    <thead><tr><th style={thS} scope="col">Range</th><th style={thS} scope="col">Band</th><th style={thS} scope="col">What It Means</th></tr></thead>
                    <tbody>
                      {[
                        ['750 - 900', 'Excellent', 'Best rates, fastest approvals across almost all lenders'],
                        ['650 - 749', 'Good', 'Positive credit behaviour, qualifies for most loans'],
                        ['550 - 649', 'Fair', 'Fewer willing lenders, higher rates where approved'],
                        ['300 - 549', 'Poor', 'Usually indicates an unpaid default or serious delinquency'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 700, color: C.dark }}>{r[0]}</td>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[1]}</td>
                          <td style={tdL}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec} id="payment-history">
                <h2 style={h2}>Payment History: The Biggest Factor</h2>
                <p style={p}>
                  Payment history carries roughly 35% of the weight, more than any other factor. A payment more than 30 days late can stay on your credit report for years, while a consistent record of on-time EMI and credit card payments is the single most reliable way to build a strong score.
                </p>
              </div>

              <div style={sec} id="credit-utilization">
                <h2 style={h2}>Credit Utilization Ratio: Why 30% Is the Threshold</h2>
                <p style={p}>
                  Credit utilization, roughly 30% of the weight, is the share of your total credit card limit you are currently using. Staying under 30% across all cards combined is the widely cited healthy threshold; running balances close to your limit signals risk even if you pay on time every month.
                </p>
                <p style={p}>
                  Use the <Link href="/calculators/credit-utilization-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Credit Utilization Calculator</Link> to work out exactly how much to pay down across your cards to get under 30%.
                </p>
              </div>

              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Credit Card Interest Calculator</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Carrying a revolving balance? See exactly what it is costing you and how fast it pays off.</p>
                </div>
                <Link className="fx-btn" href="/calculators/credit-card-interest-calculator" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
              </div>

              <div style={sec} id="credit-history-length">
                <h2 style={h2}>Credit History Length</h2>
                <p style={p}>
                  Credit history length, roughly 15% of the weight, rewards how long you have held credit accounts. Closing your oldest credit card, even one you rarely use, can shorten your average account age and quietly reduce this part of your score.
                </p>
              </div>

              <div style={sec} id="credit-mix">
                <h2 style={h2}>Credit Mix</h2>
                <p style={p}>
                  Credit mix, roughly 10% of the weight, compares secured credit (a home or car loan, backed by collateral) against unsecured credit (a credit card or personal loan). Holding both, rather than only one type, signals to lenders that you can manage different kinds of credit responsibly.
                </p>
              </div>

              <div style={sec} id="new-inquiries">
                <h2 style={h2}>New Credit Inquiries</h2>
                <p style={p}>
                  New inquiries, roughly 10% of the weight, tracks hard inquiries from loan or credit card applications in the recent past. More than 3 to 4 in a 6-month window reads as credit hunger to lenders, even if every application was eventually approved.
                </p>
              </div>

              <div style={sec} id="score-by-loan-type">
                <h2 style={h2}>Score Requirements by Loan Type</h2>
                <div style={{ overflowX: 'auto', marginBottom: 8 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Commonly cited minimum and ideal CIBIL scores by loan type</caption>
                    <thead><tr><th style={thS} scope="col">Loan Type</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Minimum</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Ideal (Best Rate)</th></tr></thead>
                    <tbody>
                      {[
                        ['Home Loan', '700', '750+'],
                        ['Personal Loan (Bank)', '700', '750+'],
                        ['Personal Loan (NBFC/Fintech)', '650', '700+'],
                        ['Car Loan', '700', '750+'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{r[1]}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const, fontWeight: 700, color: C.dark }}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Use the <Link href="/calculators/home-loan-eligibility-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Home Loan Eligibility Calculator</Link> or the <Link href="/calculators/personal-loan-eligibility-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Personal Loan Eligibility Calculator</Link> to check what you actually qualify for at your income and score level.
                </p>
              </div>

              <div style={sec} id="check-real-score">
                <h2 style={h2}>How to Check Your Real CIBIL Score for Free</h2>
                <p style={p}>
                  RBI rules require every licensed credit bureau, including CIBIL, to provide one free full credit report and score check per person per calendar year. Visit <a href="https://www.cibil.com/freecibilscore" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>cibil.com/freecibilscore</a> directly, provide your PAN and identity details, and you will see your actual score, not an estimate.
                </p>
              </div>

              <div style={sec} id="improve-score">
                <h2 style={h2}>How to Improve Your Credit Score</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Never miss a payment:</strong> set up auto-pay for at least the minimum due on every card and loan.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Keep utilization under 30%:</strong> pay down balances mid-cycle rather than waiting for the statement date if you are close to your limit.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Keep old accounts open:</strong> a longer average credit age helps, even on cards you use rarely.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Space out new applications:</strong> apply only when you actually need the credit, not speculatively.
                  </li>
                </ol>
              </div>

              <div style={sec} id="bureau-comparison">
                <h2 style={h2}>CIBIL vs Experian vs Equifax vs CRIF High Mark</h2>
                <p style={p}>
                  All four are RBI-licensed credit bureaus operating in India, and each collects data independently from banks and lenders, so your score can differ by 20 to 50 points across them even though the underlying factors are similar. CIBIL is the most widely referenced by Indian lenders, but many banks also pull one or more of the other three before approving a loan.
                </p>
              </div>

              <div style={sec} id="limitations">
                <h2 style={h2}>Limitations of This Calculator</h2>
                <p style={p}>
                  <strong>This is not your real CIBIL score.</strong> It has no connection to any credit bureau and cannot see your actual repayment history, existing loans, or defaults.
                </p>
                <p style={p}>
                  <strong>The exact CIBIL algorithm is not public.</strong> The 35/30/15/10/10 weighting is the commonly cited industry breakdown, not a figure CIBIL has published in full detail.
                </p>
                <p style={p}>
                  <strong>Self-reported inputs are only as accurate as your own memory.</strong> If you are unsure of your exact utilization or number of late payments, the estimate will be less precise; check your actual statements for the real figures.
                </p>
              </div>

              <div style={sec} id="how-to-use">
                <h2 style={h2}>How to Use This Credit Health Score Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Rate your payment history:</strong> select how many times you have missed or been late in the last 2 years.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set your credit utilization:</strong> the percentage of your total credit card limit you typically use. Calculate your precise card ratio using our <Link href="/calculators/credit-utilization-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Credit Utilization Calculator</Link>.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set credit history length and mix:</strong> how many years you have held credit, and whether you hold both secured and unsecured credit. Check revolving charges in our <Link href="/calculators/credit-card-interest-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Credit Card Interest Calculator</Link> or evaluate debt capacity in our <Link href="/calculators/debt-to-income-ratio-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Debt-to-Income Ratio Calculator</Link>.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set recent inquiries and read your estimate:</strong> the result panel shows your estimated range, band, and a breakdown by factor.
                  </li>
                </ol>
              </div>


              <div style={{ margin: '44px 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> This calculator produces a self-reported estimate only and is not connected to CIBIL, Experian, Equifax, CRIF High Mark, or any credit bureau. It cannot see your actual credit report, existing loans, or repayment history, and the range shown may differ meaningfully from your real score. For your actual CIBIL score, use the free official check at cibil.com/freecibilscore. This calculator is for educational purposes only and does not constitute financial advice. Consult a SEBI-registered investment adviser or a chartered accountant before making borrowing decisions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .chs-sidebar::-webkit-scrollbar { width: 5px; }
            .chs-sidebar::-webkit-scrollbar-track { background: transparent; }
            .chs-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .chs-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            aria-label="Related calculators"
            className="chs-sidebar"
            style={{
              display: 'flex', flexDirection: 'column', gap: 16,
              position: mobile ? 'static' : 'sticky',
              top: 20, alignSelf: 'start',
              maxHeight: mobile ? 'none' : 'calc(100vh - 40px)',
              overflowY: mobile ? 'visible' : 'auto',
              paddingRight: mobile ? 0 : 2,
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
            } as React.CSSProperties}
          >
            <div style={{ flexShrink: 0 }}><SidebarList title="Popular Calculators" items={POPULAR} /></div>
            <div style={{ flexShrink: 0 }}><SidebarList title="More Calculators" items={MORE} /></div>
          </aside>

        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter legalNote="Results are indicative. Not financial advice." columns={pipeColumns([
              { hd: 'Calculators', links: ['/calculators/credit-card-interest-calculator|Credit Card Interest', '/calculators/home-loan-eligibility-calculator|Home Loan Eligibility', '/calculators/personal-loan-eligibility-calculator|Personal Loan Eligibility', '/calculators/debt-to-income-ratio-calculator|Debt-to-Income Ratio', '/calculators/emi-calculator|EMI', '/calculators/balance-transfer-savings-calculator|Balance Transfer'] },
              { hd: 'Topics',      links: ['/calculators/credit-card-interest-calculator|Credit Cards', '/calculators/home-loan-eligibility-calculator|Home Loans', '/calculators/income-tax-calculator|Tax Planning'] },
              { hd: 'Company',     links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
        ])} />
    </div>
  );
}

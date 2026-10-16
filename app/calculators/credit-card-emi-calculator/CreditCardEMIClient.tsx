'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect } from 'react';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
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

const STORAGE_KEY = 'fermor-credit-card-emi-v1';

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

/* ─── Month presets ──────────────────────────────────────────── */
function MonthPresets({ current, onChange }: { current: number; onChange: (v: number) => void }) {
  const presets = [3, 6, 9, 12, 18, 24];
  return (
    <div role="group" aria-label="Tenure presets" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: -22, marginBottom: 20 }}>
      {presets.map(m => {
        const active = current === m;
        return (
          <button key={m} onClick={() => onChange(m)} aria-pressed={active} aria-label={`Set tenure to ${m} months`}
            style={{ fontSize: 11.5, fontWeight: active ? 700 : 500, color: active ? C.white : C.ink3, background: active ? C.dark : 'transparent', border: `1px solid ${active ? C.dark : C.border}`, borderRadius: 99, padding: '3px 9px', cursor: 'pointer', fontFamily: INTER, transition: 'all 0.12s' }}>
            {m}M
          </button>
        );
      })}
    </div>
  );
}

/* ─── Amortization schedule ──────────────────────────────────── */
interface ScheduleRow { period: number; principal: number; interest: number; balance: number; }

function buildEMISchedule(loanAmount: number, annualRate: number, months: number): ScheduleRow[] {
  if (loanAmount <= 0 || months <= 0) return [];
  const r = annualRate / 1200;
  const rows: ScheduleRow[] = [];
  let bal = loanAmount;
  if (r === 0) {
    const flat = loanAmount / months;
    for (let m = 1; m <= months; m++) {
      bal -= flat;
      rows.push({ period: m, principal: flat, interest: 0, balance: Math.max(0, bal) });
    }
    return rows;
  }
  const emi = loanAmount * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
  for (let m = 1; m <= months; m++) {
    const interest = bal * r;
    const principal = emi - interest;
    bal -= principal;
    rows.push({ period: m, principal, interest, balance: Math.max(0, bal) });
  }
  return rows;
}

/* ─── Bar Chart ──────────────────────────────────────────────── */
function ScheduleBarChart({ rows, unitLabel }: { rows: ScheduleRow[]; unitLabel: string }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxTotal = Math.max(...rows.map(r => r.principal + r.interest));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(2, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;
  return (
    <svg role="img" aria-label={`${unitLabel}-by-${unitLabel} principal and interest breakdown`}
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {rows.map((row, i) => {
        const total = row.principal + row.interest;
        const totalH = maxTotal > 0 ? (total / maxTotal) * H : 0;
        const princH = total > 0 ? (row.principal / total) * totalH : 0;
        const intH = totalH - princH;
        const x = PADL + i * slot + gap;
        return (
          <g key={row.period}>
            <rect x={x} y={H - totalH} width={barW} height={intH} fill={CHART_PAIR.secondary} rx={2} />
            <rect x={x} y={H - princH} width={barW} height={princH} fill={CHART_PAIR.primary} rx={2} />
            {rows.length <= 30 && (
              <text x={x + barW / 2} y={H + 14} textAnchor="middle"
                style={{ fontSize: rows.length > 20 ? 7 : 9, fill: C.ink3, fontFamily: INTER }}>
                {row.period}
              </text>
            )}
          </g>
        );
      })}
      <line x1={PADL} y1={H} x2={W} y2={H} stroke={C.border} strokeWidth={1} />
    </svg>
  );
}

/* ─── Donut ──────────────────────────────────────────────────── */
function DonutChart({ principal, totalInterest, principalPct }: { principal: number; totalInterest: number; principalPct: number }) {
  const total = principal + Math.abs(totalInterest);
  if (total === 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const pArc = (principal / total) * circ;
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Principal ${principalPct}% of total repayment, interest ${100 - principalPct}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc.toFixed(3)} ${(circ - pArc).toFixed(3)}`} strokeDashoffset={(circ / 4).toFixed(3)}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Principal</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{principalPct}%</text>
    </svg>
  );
}

/* ─── Waitlist CTA ───────────────────────────────────────────── */
function WaitlistCard({ mobile }: { mobile: boolean }) {
  const [email, setEmail]   = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    try {
      if (!localStorage.getItem('fermor-waitlist-joined')) setHidden(false);
    } catch {
      setHidden(false);
    }
  }, []);

  if (hidden) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'credit-card-emi-calculator' }),
      });
      if (res.ok) {
        setStatus('done');
        try { localStorage.setItem('fermor-waitlist-joined', '1'); } catch { /* ignore */ }
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: mobile ? '18px' : '20px 24px', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 12 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1f7a58" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12" /></svg>
        <div>
          <p style={{ color: C.ink, fontWeight: 600, fontSize: 14, margin: 0 }}>Done. Check your email to complete sign up.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: mobile ? '18px' : '20px 24px', marginBottom: 40 }}>
      <p style={{ color: C.ink, fontWeight: 600, fontSize: 14, margin: '0 0 4px' }}>
        Save your results
      </p>
      <p style={{ color: C.ink3, fontSize: 13, margin: '0 0 14px', lineHeight: 1.6 }}>
        Sign up to save this calculation and access your results any time.
      </p>
      <form onSubmit={submit} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          aria-label="Email address"
          style={{ flex: 1, minWidth: 200, padding: '9px 13px', borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.ink, fontSize: 13.5, fontFamily: INTER, outline: 'none' }}
        />
        <button className="fx-btn" type="submit" disabled={status === 'loading'}
          style={{ padding: '9px 20px', background: '#E9ECEE', color: '#101214', fontWeight: 600, fontSize: 13.5, borderRadius: 8, border: '1px solid #D3D7DA', cursor: status === 'loading' ? 'wait' : 'pointer', fontFamily: INTER, whiteSpace: 'nowrap', opacity: status === 'loading' ? 0.65 : 1, transition: 'opacity 0.15s' }}>
          {status === 'loading' ? 'Saving...' : 'Sign up free'}
        </button>
      </form>
      {status === 'error' && (
        <p style={{ color: '#C0392B', fontSize: 12.5, margin: '10px 0 0' }}>Something went wrong. Try again in a moment.</p>
      )}
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
  { href: '/calculators/emi-calculator',                  label: 'EMI Calculator' },
  { href: '/calculators/personal-loan-calculator',         label: 'Personal Loan Calculator' },
  { href: '/calculators/loan-eligibility-calculator',     label: 'Loan Eligibility Calculator' },
  { href: '/calculators/home-loan-calculator',            label: 'Home Loan Calculator' },
  { href: '/calculators/car-loan-calculator',             label: 'Car Loan Calculator' },
  { href: '/calculators/loan-calculator',                 label: 'Loan Calculator' },
  { href: '/calculators/fd-calculator',                   label: 'FD Calculator' },
];
const MORE = [
  { href: '/calculators/income-tax-calculator',           label: 'Income Tax Calculator' },
  { href: '/calculators/in-hand-salary-calculator',       label: 'In-Hand Salary Calculator' },
  { href: '/calculators/old-vs-new-tax-regime-calculator', label: 'Old vs New Tax Regime' },
  { href: '/calculators/ppf-calculator',                  label: 'PPF Calculator' },
  { href: '/calculators/sip-calculator',                  label: 'SIP Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
function FAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  return <FAQBox items={faqs} />;
}

/* ─── Main ───────────────────────────────────────────────────── */

export default function CreditCardEMIClient({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [mobile, setMobile] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showTable, setShowTable] = useState(false);

  /* calculator state */
  const [purchaseAmount, setPurchaseAmount] = useState(50000);
  const [interestRate, setInterestRate] = useState(24);
  const [tenure, setTenure] = useState(12);
  const [processingFee, setProcessingFee] = useState(0);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  /* localStorage persistence */
  useEffect(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (!s) return;
      const d = JSON.parse(s);
      if (d.purchaseAmount != null) setPurchaseAmount(d.purchaseAmount);
      if (d.interestRate != null) setInterestRate(d.interestRate);
      if (d.tenure != null) setTenure(d.tenure);
      if (d.processingFee != null) setProcessingFee(d.processingFee);
    } catch { /* fail silently */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ purchaseAmount, interestRate, tenure, processingFee }));
    } catch { /* ignore */ }
  }, [purchaseAmount, interestRate, tenure, processingFee]);

  const result = useMemo(() => {
    if (purchaseAmount <= 0 || tenure <= 0 || interestRate <= 0) return null;
    const monthlyRate = interestRate / 12 / 100;
    const emi = purchaseAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure) / (Math.pow(1 + monthlyRate, tenure) - 1);
    const totalPayment = emi * tenure;
    const totalInterest = totalPayment - purchaseAmount;
    const totalRepayment = totalPayment + processingFee;
    const effectiveAnnualRate = (Math.pow(1 + monthlyRate, 12) - 1) * 100;
    return { emi, totalPayment, totalInterest, totalRepayment, processingFee, effectiveAnnualRate, principal: purchaseAmount };
  }, [purchaseAmount, interestRate, tenure, processingFee]);

  const prinPct    = result ? Math.round((result.principal / result.totalRepayment) * 100) : 50;
  const interestPct = 100 - prinPct;

  const schedule = useMemo(() => buildEMISchedule(purchaseAmount, interestRate, tenure), [purchaseAmount, interestRate, tenure]);

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const h3  = { fontSize: 15.5, fontWeight: 600, color: C.ink, margin: '0 0 6px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } as React.CSSProperties;
  const bul = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 } as React.CSSProperties;
  const mono = { fontFamily: 'monospace', background: '#f4f5f6', padding: '2px 7px', borderRadius: 4, fontSize: 13.5, color: C.dark } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        {/* H1: primary keyword target */}
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Credit Card EMI Calculator
          </h1>
          <p style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate your monthly EMI on credit card purchases, total interest payable, total processing fee, and total repayment
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="Credit Card EMI Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider label="Purchase Amount" id="purchase-amount" value={purchaseAmount} min={1000} max={10000000} step={1000} fmt={fmtC} onChange={setPurchaseAmount} compact={mobile} />
                      <Slider label="Interest Rate" id="interest-rate" value={interestRate} min={1} max={36} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={setInterestRate} compact={mobile} />
                      <Slider label="Tenure" id="tenure" value={tenure} min={3} max={60} step={1} fmt={v => `${v} Mo`} onChange={setTenure} compact={mobile} />
                      <MonthPresets current={tenure} onChange={setTenure} />
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button onClick={() => setShowAdvanced(true)}
                          style={{ fontSize: 12.5, fontWeight: 600, color: C.dark, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontFamily: INTER, display: 'flex', alignItems: 'center', gap: 6, transition: 'border-color 0.15s' }}
                          onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
                          onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}>
                          More settings
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.dark} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Slider label="Processing Fee" id="processing-fee" value={processingFee} min={0} max={5000} step={100} fmt={fmtC} onChange={setProcessingFee} compact={mobile} />
                      <p style={{ fontSize: 12.5, color: C.ink3, lineHeight: 1.6, margin: '4px 0 0', fontStyle: 'italic' }}>
                        One-time processing fee charged by your bank for converting a purchase to EMI. Typical range: Rs 99 to Rs 999.
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
                        <button onClick={() => setShowAdvanced(false)}
                          style={{ fontSize: 12.5, fontWeight: 600, color: C.dark, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontFamily: INTER, display: 'flex', alignItems: 'center', gap: 6, transition: 'border-color 0.15s' }}
                          onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
                          onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.dark} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
                          Back
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Result panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {result ? (
                    <>
                      {/* Dark result box with 2 metrics: alignItems stretch */}
                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 8 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                          <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>
                            Monthly EMI
                          </span>
                          <span style={{ fontSize: mobile ? 12 : 13, color: '#7A8087' }}>
                            Total Repayment
                          </span>
                        </div>
                        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                          <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                            aria-live="polite" aria-label={`Monthly EMI: ${fmtIN(result.emi)}`}>
                            {fmtIN(result.emi)}
                          </span>
                          <span style={{ fontSize: mobile ? 15 : 18, fontWeight: 700, color: '#1F7A58', letterSpacing: '-0.02em' }}
                            aria-live="polite" aria-label={`Total repayment: ${fmtIN(result.totalRepayment)}`}>
                            {fmtIN(result.totalRepayment)}
                          </span>
                        </div>
                      </div>

                      {[
                        { label: 'Total Interest Payable', value: fmtC(result.totalInterest) },
                        { label: 'Total Processing Fee',   value: fmtC(result.processingFee) },
                        { label: 'Effective Annual Rate',  value: `${result.effectiveAnnualRate.toFixed(2)}%` },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                        </div>
                      ))}

                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                        <DonutChart principal={result.principal} totalInterest={result.totalInterest} principalPct={prinPct} />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                          <span style={{ fontSize: 12, color: C.ink2 }}>Principal {prinPct}%</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                          <span style={{ fontSize: 12, color: C.ink2 }}>Interest {interestPct}%</span>
                        </div>
                      </div>

                      <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 11.5, color: C.ink3 }}>Principal {prinPct}%</span>
                          <span style={{ fontSize: 11.5, color: C.ink3 }}>Interest {interestPct}%</span>
                        </div>
                        <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`Principal is ${prinPct}% of total repayment`}>
                          <div style={{ height: '100%', width: `${prinPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                        </div>
                      </div>

                    </>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, color: C.ink3, fontSize: 14 }}>
                      Adjust inputs to see result
                    </div>
                  )}
                </div>
              </div>

              {/* Amortization schedule */}
              {schedule.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowTable(v => !v)}
                    aria-expanded={showTable} aria-controls="cc-emi-schedule"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Month-by-Month EMI Schedule</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>Reducing balance</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {tenure} mo &middot; {interestRate.toFixed(1)}%
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showTable && (
                    <div id="cc-emi-schedule" style={{ borderTop: `1px solid ${C.border}` }}>
                      <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                        <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>Principal</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>Interest</span>
                          </div>
                        </div>
                        <ScheduleBarChart rows={schedule} unitLabel="month" />
                      </div>
                      <div style={{ overflowX: 'auto', padding: mobile ? '16px' : '24px 44px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 480 }}>
                          <thead style={{ background: '#f4f5f6', borderBottom: `1px solid ${C.border}` }}>
                            <tr>
                              <th style={{ padding: '10px 12px', fontSize: 11.5, fontWeight: 700, color: C.ink, textAlign: 'left' }}>Month</th>
                              <th style={{ padding: '10px 12px', fontSize: 11.5, fontWeight: 700, color: C.ink, textAlign: 'right' }}>Principal</th>
                              <th style={{ padding: '10px 12px', fontSize: 11.5, fontWeight: 700, color: C.ink, textAlign: 'right' }}>Interest</th>
                              <th style={{ padding: '10px 12px', fontSize: 11.5, fontWeight: 700, color: C.ink, textAlign: 'right' }}>Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {schedule.map(row => (
                              <tr key={row.period} style={{ borderBottom: `1px solid ${C.border}` }}>
                                <td style={{ padding: '10px 12px', color: C.ink2 }}>{row.period}</td>
                                <td style={{ padding: '10px 12px', textAlign: 'right', color: C.ink }}>{fmtC(row.principal)}</td>
                                <td style={{ padding: '10px 12px', textAlign: 'right', color: '#B45309' }}>{fmtC(row.interest)}</td>
                                <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600, color: C.ink }}>{fmtC(row.balance)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            <WaitlistCard mobile={mobile} />


            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-credit-card-emi">What Is Credit Card EMI?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Credit Card EMI (Equated Monthly Instalment) is a facility that allows you to convert a large credit card purchase of Rs 2,500 or more into fixed monthly payments over a chosen tenure, instead of paying the full amount at once. The EMI amount includes both principal repayment and interest.
                  </p>
                </div>
                <p style={p}>
                  Indian banks including HDFC, SBI, ICICI, and Axis offer EMI conversion on most purchases above Rs 2,500, either at the point of sale or after the transaction is billed. The purchase is converted using the reducing balance method, where interest applies only to the outstanding principal.
                </p>
                <p style={p}>
                  Per RBI guidelines, banks must disclose the APR, processing fees, and foreclosure charges before converting a transaction to EMI. Check these charges before opting for conversion.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="credit-card-emi-formula">Credit Card EMI Formula: How to Calculate Credit Card EMI</h2>
                <p style={p}>The formula uses the reducing balance method, which is the standard across all Indian banks:</p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 15, fontWeight: 700, color: C.dark }}>
                    EMI = [P x r x (1+r)^n] / [(1+r)^n - 1]
                  </code>
                </div>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={{ ...thS, width: 110 }} scope="col">Variable</th><th style={thS} scope="col">Meaning</th></tr></thead>
                    <tbody>
                      {[
                        ['P', 'Purchase amount (principal)'],
                        ['r', 'Monthly interest rate = Annual rate / 12 / 100'],
                        ['n', 'Number of monthly instalments'],
                        ['EMI', 'Fixed monthly payment including principal and interest'],
                      ].map(([v, m]) => (
                        <tr key={v as string}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{v}</td><td style={tdR}>{m}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  <strong>Worked example:</strong> You convert a Rs 50,000 purchase to EMI at 24% per annum interest for 12 months.
                  Monthly rate r = 24/12/100 = 0.02. EMI = 50000 x 0.02 x (1.02)^12 / ((1.02)^12 - 1) = Rs 4,724 per month.
                  Total payment over 12 months = Rs 4,724 x 12 = Rs 56,691. Total interest = Rs 56,691 minus Rs 50,000 = Rs 6,691.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="credit-card-emi-calculation">Credit Card EMI Calculation Example</h2>
                <p style={p}>
                  Here is how the EMI, total interest, and total repayment change across different purchase amounts and tenures at a 24% per annum interest rate:
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>Credit card EMI at 24% per annum across different purchase amounts and tenures</caption>
                    <thead><tr><th style={thS} scope="col">Purchase Amount</th><th style={thS} scope="col">Tenure</th><th style={thS} scope="col">Monthly EMI</th><th style={thS} scope="col">Total Interest</th><th style={thS} scope="col">Total Repayment</th></tr></thead>
                    <tbody>
                      {[
                        ['Rs 10,000', '3 months', 'Rs 3,467', 'Rs 401', 'Rs 10,401'],
                        ['Rs 10,000', '6 months', 'Rs 1,785', 'Rs 710', 'Rs 10,710'],
                        ['Rs 25,000', '6 months', 'Rs 4,462', 'Rs 1,774', 'Rs 26,774'],
                        ['Rs 25,000', '12 months', 'Rs 2,362', 'Rs 3,346', 'Rs 28,346'],
                        ['Rs 50,000', '12 months', 'Rs 4,724', 'Rs 6,691', 'Rs 56,691'],
                        ['Rs 50,000', '24 months', 'Rs 2,642', 'Rs 13,416', 'Rs 63,416'],
                        ['Rs 1,00,000', '12 months', 'Rs 9,448', 'Rs 13,383', 'Rs 1,13,383'],
                        ['Rs 1,00,000', '24 months', 'Rs 5,285', 'Rs 26,832', 'Rs 1,26,832'],
                      ].map(([amt, ten, emi, int, total]) => (
                        <tr key={`${amt}-${ten}`} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{amt}</td>
                          <td style={tdR}>{ten}</td>
                          <td style={{ ...tdR, fontWeight: 600 }}>{emi}</td>
                          <td style={{ ...tdR, color: '#B91C1C', fontWeight: 600 }}>{int}</td>
                          <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>{total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Longer tenures reduce your monthly EMI but increase the total interest paid. A Rs 50,000 purchase over 12 months costs Rs 4,724 per month with Rs 6,691 in total interest. The same purchase over 24 months costs only Rs 2,642 per month but the total interest doubles to Rs 13,416.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="credit-card-emi-vs-personal-loan">Credit Card EMI vs Personal Loan: Which Is Better?</h2>
                <p style={p}>
                  Choosing between credit card EMI and a personal loan depends on the amount, tenure, and your immediate liquidity. Personal loans offer lower interest rates but require a separate application and documentation.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>Credit card EMI vs personal loan comparison</caption>
                    <thead><tr><th style={thS} scope="col">Factor</th><th style={thS} scope="col">Credit Card EMI</th><th style={thS} scope="col">Personal Loan</th></tr></thead>
                    <tbody>
                      {[
                        ['Interest Rate', '18% to 36% per annum', '10% to 24% per annum'],
                        ['Processing Fee', 'Rs 99 to Rs 999', '0.5% to 2% of loan amount'],
                        ['Application', 'Instant via app or SMS', 'Separate application and KYC'],
                        ['Documentation', 'None required', 'Income proof, address proof'],
                        ['Disbursal', 'Instant', '24 to 72 hours'],
                        ['Tenure', '3 to 60 months', '12 to 72 months'],
                        ['Foreclosure Charge', 'Rs 100 to Rs 500', '3% to 5% of outstanding'],
                        ['Best for', 'Small purchases under Rs 50,000', 'Large expenses over Rs 1 lakh'],
                      ].map(([f, cc, pl]) => (
                        <tr key={f as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{f}</td>
                          <td style={tdR}>{cc}</td>
                          <td style={tdR}>{pl}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  For a Rs 50,000 expense over 12 months, credit card EMI at 24% costs Rs 6,691 in interest. A personal loan at 15% for the same amount would cost Rs 4,148 in interest a saving of Rs 2,543. For small amounts with short tenures, the convenience of credit card EMI often outweighs the slightly higher cost. Use the <Link href="/calculators/personal-loan-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Personal Loan Calculator</Link> to compare the exact figures for your scenario.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="credit-card-emi-charges">Credit Card EMI Charges and Fees</h2>
                <p style={p}>
                  Converting a credit card purchase to EMI involves more than just the interest rate. Indian banks levy several charges that affect the total cost of the conversion.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>Typical credit card EMI charges across major Indian banks</caption>
                    <thead><tr><th style={thS} scope="col">Charge Type</th><th style={thS} scope="col">Typical Amount</th><th style={thS} scope="col">Notes</th></tr></thead>
                    <tbody>
                      {[
                        ['Processing Fee', 'Rs 99 to Rs 999 + GST', 'One-time, added to first EMI'],
                        ['Interest Rate', '12% to 36% per annum', 'Varies by bank and card type'],
                        ['Foreclosure Fee', 'Rs 100 to Rs 500 + GST', 'If you prepay the EMI'],
                        ['Late Payment Fee', 'Up to Rs 1,300 per month', 'If EMI payment is missed'],
                        ['GST on Fees', '18% on processing/foreclosure', 'Applied on all bank fees'],
                        ['Overdue Interest', '36% to 48% per annum', 'On missed EMI amounts'],
                      ].map(([t, a, n]) => (
                        <tr key={t as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{t}</td>
                          <td style={tdR}>{a}</td>
                          <td style={tdL}>{n}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The processing fee is charged upfront even if you decide to prepay the entire outstanding later. Banks disclose all charges in the EMI conversion terms, and per RBI guidelines, you must be informed of the total cost before the conversion is processed.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="credit-card-emi-foreclosure">Credit Card EMI Foreclosure and Prepayment</h2>
                <p style={p}>
                  Foreclosure means repaying the entire outstanding EMI amount before the scheduled tenure ends. Most Indian banks allow this but charge a fee for doing so. The foreclosure fee is typically Rs 100 to Rs 500 plus GST, regardless of the outstanding amount. Some banks also collect the remaining unpaid interest, though this practice has been discouraged by RBI guidelines.
                </p>
                <p style={p}>
                  To foreclose a credit card EMI, you call the bank customer care or use the mobile banking app. The bank calculates the outstanding principal plus applicable foreclosure charges and generates a payment link. Once paid, the EMI plan is closed and no further instalments are debited.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Foreclosure makes financial sense if you have surplus cash, because it stops future interest from accruing. The savings equal the remaining interest that would have been charged over the rest of the tenure, minus the foreclosure fee. Use this calculator to compare the remaining interest versus the foreclosure charge before deciding.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="credit-card-emi-rbi-rules">RBI Rules That Protect Credit Card EMI Users</h2>
                <p style={p}>
                  The Reserve Bank of India regulates credit card conduct through its Master Directions on Credit Card and Debit Card Issuance and Conduct, first issued in 2022 and amended in 2024. Several of these rules apply directly to EMI conversions and the underlying credit card account.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>Key RBI protections for credit card and EMI users, per the RBI Master Directions on Credit Card and Debit Card Issuance and Conduct</caption>
                    <thead><tr><th style={thS} scope="col">Rule</th><th style={thS} scope="col">What It Means for You</th></tr></thead>
                    <tbody>
                      {[
                        ['3-day grace period (effective October 2024)', 'A payment is reported as overdue and a late fee applies only if it remains unpaid 3 days past the due date, not from the due date itself.'],
                        ['Late fee capped by slab', 'Late payment fees are capped between Rs 100 and Rs 1,300 depending on the outstanding amount, and can only be charged on the amount actually overdue, not the full bill.'],
                        ['Right to opt out', 'Cardholders have the right to decline an EMI or loan conversion scheme offered by the issuer without being auto-enrolled.'],
                        ['APR disclosure', 'Card issuers must publish the annual percentage rate for purchases, cash withdrawals, and EMI conversions on their website and in the welcome kit.'],
                        ['Transparent EMI terms', 'The EMI conversion must clearly break down the principal, interest, and any discount at the time of conversion, and reflect this in the monthly statement.'],
                      ].map(([rule, meaning]) => (
                        <tr key={rule as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{rule}</td>
                          <td style={tdR}>{meaning}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  These are cardholder rights, not optional courtesies. If a bank reports a payment as overdue before the 3-day window has passed, or charges a late fee on the full bill rather than the overdue portion, that is grounds for a complaint to the bank and, if unresolved, to the <a href="https://rbi.org.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>RBI</a> Banking Ombudsman.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="credit-card-emi-bank-comparison">How Major Indian Banks Structure EMI Conversion</h2>
                <p style={p}>
                  Each bank names and windows its EMI conversion facility slightly differently, though the underlying reducing-balance math is the same across all of them.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>EMI conversion facility names and conversion windows by bank</caption>
                    <thead><tr><th style={thS} scope="col">Bank</th><th style={thS} scope="col">Facility Name</th><th style={thS} scope="col">Typical Conversion Window</th></tr></thead>
                    <tbody>
                      {[
                        ['HDFC Bank', 'SmartEMI', 'Within 60 days of the purchase'],
                        ['SBI Card', 'Flexipay', 'Within 30 days of the purchase'],
                        ['ICICI Bank', 'EMI on Call / iMobile', 'Within 60 days of the purchase'],
                        ['Axis Bank', 'EMI conversion via app', 'Within 60 days of the purchase'],
                      ].map(([bank, facility, window]) => (
                        <tr key={bank as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{bank}</td>
                          <td style={tdR}>{facility}</td>
                          <td style={tdR}>{window}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  Exact interest rates and processing fees vary by card variant and by promotional offer running at the time, so the figure shown at checkout or in the bank app is the one that applies, not a generic published rate. Always confirm the exact rate and processing fee in the bank app before confirming the conversion.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="credit-card-emi-cibil-impact">How Credit Card EMI Affects Your CIBIL Score</h2>
                <p style={p}>
                  Converting a purchase to EMI touches your credit score through two separate channels: credit utilisation and payment history, and they can pull in opposite directions.
                </p>
                <p style={p}>
                  <strong style={{ color: C.ink }}>Credit utilisation:</strong> the moment a purchase converts to EMI, the full outstanding principal is blocked against your credit limit, the same as an unpaid purchase would be. If this pushes your utilisation ratio above 30% of your total limit, it can temporarily lower your score, even though you are repaying on schedule.
                </p>
                <p style={p}>
                  <strong style={{ color: C.ink }}>Payment history:</strong> each on-time EMI instalment is reported to CIBIL, Experian, and Equifax as a regular repayment, which builds positive history over time. A single missed instalment, once it crosses the RBI-mandated 3-day grace period, is reported as overdue and can cause a sharper score drop than the utilisation effect ever would.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Net effect: a well-managed EMI on a card with headroom to spare is broadly neutral to positive for your score. An EMI that consumes most of your available limit, or one where a payment is missed, is where the damage happens.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="credit-card-emi-limitations">Limitations of Credit Card EMI</h2>
                <div>
                  {[
                    ['High interest rate', 'Credit card EMI rates of 18% to 36% are significantly higher than personal loan rates of 10% to 24%. For large purchases or long tenures, the total interest can be substantial. Always compare with a personal loan before opting for credit card EMI.'],
                    ['Processing fee adds to cost', 'The one-time processing fee of Rs 99 to Rs 999 is non-refundable. On smaller purchases, the fee can represent a meaningful percentage of the total cost. Factor this into your decision.'],
                    ['Credit utilisation impact', 'Converting a purchase to EMI blocks your credit card limit for the outstanding amount. This reduces the available credit for other purchases and can increase your credit utilisation ratio, which may lower your CIBIL score.'],
                    ['Foreclosure charge', 'If you decide to prepay, the foreclosure fee eats into your savings. On small outstanding amounts, the fee may make prepayment not worth it. Check the fee before converting.'],
                  ].map(([title, text], i) => (
                    <div key={i} style={{ ...bul, marginBottom: 14, gap: 0, flexDirection: 'column' as const }}>
                      <strong style={{ fontSize: 15, color: C.ink, marginBottom: 4 }}>{title}</strong>
                      <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This Credit Card EMI Calculator</h2>
                <p style={p}>Follow these steps to calculate your credit card EMI:</p>

                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Purchase Amount:</strong> Type or slide to set the purchase amount you want to convert to EMI.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Interest Rate:</strong> Enter your credit card annual interest rate. Check your bank card terms for the exact EMI conversion rate.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select Tenure:</strong> Choose the repayment period in months. Use the preset buttons to quickly switch between common tenures.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Add Processing Fee (optional):</strong> Under More settings, enter the processing fee charged by your bank for a more accurate total repayment figure.
                  </li>
                </ol>
                <p style={{ ...p, margin: 0 }}>
                  Click any input value to type a precise number. Use the month preset buttons (3M, 6M, 9M, 12M, 18M, 24M) to switch tenure quickly. The donut chart shows what portion of your total repayment goes toward the principal versus interest. For other loan types, try the <Link href="/calculators/emi-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>EMI Calculator</Link> for home loans, car loans, and personal loans.
                </p>
              </div>


              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ faqs={faqs} />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only. The EMI amount depends on your bank specific interest rate, processing fee, and terms. Past credit usage does not guarantee future EMI approval. This calculator is for educational and planning purposes only and does not constitute financial advice. Consult your bank or a SEBI-registered financial adviser before making financial decisions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.cc-emi-sidebar::-webkit-scrollbar{width:5px}.cc-emi-sidebar::-webkit-scrollbar-track{background:transparent}.cc-emi-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.cc-emi-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="cc-emi-sidebar" aria-label="Related calculators" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <SidebarList title="Popular Calculators" items={POPULAR} />
              <SidebarList title="More Calculators" items={MORE} />
            </div>
          </aside>

        </div>
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

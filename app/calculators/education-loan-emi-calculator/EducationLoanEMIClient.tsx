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

const LS_KEY = 'fermor-education-loan-emi-v1';

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

/* ─── Year presets for tenure ─────────────────────────────────── */
function YearPresets({ current, onChange }: { current: number; onChange: (v: number) => void }) {
  const presets = [5, 7, 10, 12, 15, 20];
  return (
    <div role="group" aria-label="Duration presets" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: -22, marginBottom: 20 }}>
      {presets.map(y => {
        const active = current === y;
        return (
          <button key={y} onClick={() => onChange(y)} aria-pressed={active} aria-label={`Set tenure to ${y} years`}
            style={{ fontSize: 11.5, fontWeight: active ? 700 : 500, color: active ? C.white : C.ink3, background: active ? C.dark : 'transparent', border: `1px solid ${active ? C.dark : C.border}`, borderRadius: 99, padding: '3px 9px', cursor: 'pointer', fontFamily: INTER, transition: 'all 0.12s' }}>
            {y}Y
          </button>
        );
      })}
    </div>
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
        body: JSON.stringify({ email, source: 'education-loan-emi-calculator' }),
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
  { href: '/calculators/loan-eligibility-calculator',          label: 'Loan Eligibility Calculator' },
  { href: '/calculators/emi-calculator',                       label: 'EMI Calculator' },
  { href: '/calculators/personal-loan-calculator',             label: 'Personal Loan Calculator' },
  { href: '/calculators/education-corpus-calculator',          label: 'Education Corpus Calculator' },
  { href: '/calculators/home-loan-calculator',                 label: 'Home Loan Calculator' },
  { href: '/calculators/car-loan-calculator',                  label: 'Car Loan Calculator' },
  { href: '/calculators/fd-calculator',                        label: 'FD Calculator' },
];
const MORE = [
  { href: '/calculators/income-tax-calculator',                label: 'Income Tax Calculator' },
  { href: '/calculators/ppf-calculator',                       label: 'PPF Calculator' },
  { href: '/calculators/sip-calculator',                       label: 'SIP Calculator' },
  { href: '/calculators/in-hand-salary-calculator',            label: 'In-Hand Salary Calculator' },
  { href: '/calculators/old-vs-new-tax-regime-calculator',     label: 'Old vs New Tax Regime' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
function FAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  return <FAQBox items={faqs} />;
}

/* ─── Calculator logic ───────────────────────────────────────── */
function calcEMI(principal: number, annualRate: number, tenureYears: number, moratoriumMonths: number) {
  const rateDecimal = annualRate / 100;

  // Simple interest accrued during moratorium
  const moratoriumInterest = principal * rateDecimal * (moratoriumMonths / 12);

  // Capitalised principal at start of repayment
  const capitalisedPrincipal = principal + moratoriumInterest;

  // Monthly rate
  const r = annualRate / (12 * 100);
  const n = tenureYears * 12;

  let emi = 0;
  if (r === 0) {
    emi = capitalisedPrincipal / n;
  } else {
    const factor = Math.pow(1 + r, n);
    emi = capitalisedPrincipal * r * factor / (factor - 1);
  }

  const totalRepayment = emi * n;
  const totalInterest = totalRepayment - principal;

  return { emi, totalInterest, totalRepayment, capitalisedPrincipal, moratoriumInterest };
}

interface EduScheduleRow { year: number; principal: number; interest: number; balance: number; }

function buildEduSchedule(capitalisedPrincipal: number, annualRate: number, tenureYears: number): EduScheduleRow[] {
  if (capitalisedPrincipal <= 0 || tenureYears <= 0) return [];
  const r = annualRate / 1200;
  const months = tenureYears * 12;
  const emi = r === 0 ? capitalisedPrincipal / months : capitalisedPrincipal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
  let bal = capitalisedPrincipal;
  const rows: EduScheduleRow[] = [];
  for (let y = 1; y <= tenureYears; y++) {
    let yearPrincipal = 0, yearInterest = 0;
    for (let m = 0; m < 12; m++) {
      const interest = r === 0 ? 0 : bal * r;
      const principal = emi - interest;
      bal -= principal;
      yearPrincipal += principal;
      yearInterest += interest;
    }
    rows.push({ year: y, principal: yearPrincipal, interest: yearInterest, balance: Math.max(0, bal) });
  }
  return rows;
}

function EduScheduleBarChart({ rows }: { rows: EduScheduleRow[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxTotal = Math.max(...rows.map(r => r.principal + r.interest));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;
  return (
    <svg role="img" aria-label="Year-by-year principal and interest breakdown"
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {rows.map((row, i) => {
        const total = row.principal + row.interest;
        const totalH = maxTotal > 0 ? (total / maxTotal) * H : 0;
        const princH = total > 0 ? (row.principal / total) * totalH : 0;
        const intH = totalH - princH;
        const x = PADL + i * slot + gap;
        return (
          <g key={row.year}>
            <rect x={x} y={H - totalH} width={barW} height={intH} fill={CHART_PAIR.secondary} rx={2} />
            <rect x={x} y={H - princH} width={barW} height={princH} fill={CHART_PAIR.primary} rx={2} />
            {rows.length <= 30 && (
              <text x={x + barW / 2} y={H + 14} textAnchor="middle"
                style={{ fontSize: rows.length > 20 ? 7 : 9, fill: C.ink3, fontFamily: INTER }}>
                {row.year}
              </text>
            )}
          </g>
        );
      })}
      <line x1={PADL} y1={H} x2={W} y2={H} stroke={C.border} strokeWidth={1} />
    </svg>
  );
}

/* ─── Main ───────────────────────────────────────────────────── */
export default function EducationLoanEMIClient({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [mobile, setMobile] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(10.5);
  const [tenure, setTenure] = useState(10);
  const [moratorium, setMoratorium] = useState(24);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  /* ── localStorage ── */
  useEffect(() => {
    try {
      const s = localStorage.getItem(LS_KEY);
      if (!s) return;
      const d = JSON.parse(s);
      if (typeof d.loanAmount === 'number') setLoanAmount(d.loanAmount);
      if (typeof d.interestRate === 'number') setInterestRate(d.interestRate);
      if (typeof d.tenure === 'number') setTenure(d.tenure);
      if (typeof d.moratorium === 'number') setMoratorium(d.moratorium);
    } catch { /* fail silently */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ loanAmount, interestRate, tenure, moratorium }));
    } catch { /* ignore */ }
  }, [loanAmount, interestRate, tenure, moratorium]);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const result = useMemo(() => {
    if (loanAmount <= 0 || interestRate <= 0 || tenure <= 0) return null;
    return calcEMI(loanAmount, interestRate, tenure, moratorium);
  }, [loanAmount, interestRate, tenure, moratorium]);

  const schedule = useMemo(() => result ? buildEduSchedule(result.capitalisedPrincipal, interestRate, tenure) : [], [result, interestRate, tenure]);

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

        {/* H1 */}
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Education Loan EMI Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate your monthly EMI on education loans, total interest payable, and total repayment including the impact of the moratorium period. No sign-up required.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="Education Loan EMI Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              {/* Input panel - full width card, no tabs */}
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  <Slider label="Loan Amount" id="loan-amount" value={loanAmount} min={50000} max={10000000} step={50000} fmt={fmtC} onChange={setLoanAmount} compact={mobile} />
                  <Slider label="Interest Rate" id="interest-rate" value={interestRate} min={1} max={20} step={0.25} fmt={v => `${v.toFixed(2)}%`} onChange={setInterestRate} compact={mobile} />
                  <Slider label="Tenure" id="tenure" value={tenure} min={1} max={20} step={1} fmt={v => `${v} Yr`} onChange={setTenure} compact={mobile} />
                  <YearPresets current={tenure} onChange={setTenure} />
                  <Slider label="Moratorium Period" id="moratorium" value={moratorium} min={0} max={48} step={1} fmt={v => `${v} Mo`} onChange={setMoratorium} compact={mobile} />
                  <p style={{ fontSize: 12.5, color: C.ink3, lineHeight: 1.6, margin: '4px 0 0', fontStyle: 'italic' }}>
                    During the moratorium period, simple interest accrues on the loan amount. This accrued interest is added to the principal at the start of repayment, increasing the EMI.
                  </p>
                </div>

                {/* Result panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {result ? (
                    <>
                      {/* Dark result box: 2 labels + 2 values with alignItems stretch + justifyContent space-between */}
                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '14px 18px' : '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 8 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                          <div style={{ fontSize: mobile ? 12 : 13, fontWeight: 600, color: '#50565C' }}>Monthly EMI</div>
                          <div style={{ fontSize: mobile ? 10.5 : 12, color: '#7A8087' }}>Total Repayment</div>
                        </div>
                        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                          <div style={{ fontSize: mobile ? 22 : 26, fontWeight: 800, color: '#1F7A58', lineHeight: 1 }}
                            aria-live="polite" aria-label={`Monthly EMI: ${fmtIN(result.emi)}`}>
                            {fmtIN(result.emi)}
                          </div>
                          <div style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: '#101214', lineHeight: 1 }}
                            aria-label={`Total repayment: ${fmtIN(result.totalRepayment)}`}>
                            {fmtIN(result.totalRepayment)}
                          </div>
                        </div>
                      </div>

                      {[
                        { label: 'Loan amount', value: fmtC(loanAmount) },
                        { label: 'Interest accrued during moratorium', value: fmtC(result.moratoriumInterest) },
                        { label: 'Total due at start of repayment', value: fmtC(result.capitalisedPrincipal) },
                        { label: 'Total interest payable', value: fmtC(result.totalInterest) },
                        { label: 'Interest rate', value: `${interestRate.toFixed(2)}%` },
                        { label: 'Tenure after moratorium', value: `${tenure} yr` },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                        </div>
                      ))}

                      {(() => {
                        const total = loanAmount + result.totalInterest;
                        if (total === 0) return null;
                        const R = 80, sw = 20, cx = 106, cy = 106;
                        const circ = 2 * Math.PI * R;
                        const pPct = Math.round((loanAmount / total) * 100);
                        const pArc = (loanAmount / total) * circ;
                        return (
                          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginTop: mobile ? 20 : 16, order: mobile ? 6 : -1 }}>
                            <svg width="212" height="212" viewBox="0 0 212 212" role="img" aria-label={`Principal ${pPct}% of total repayment, interest ${100 - pPct}%`} style={{ display: 'block' }}>
                              <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
                              <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
                                strokeDasharray={`${pArc.toFixed(3)} ${(circ - pArc).toFixed(3)}`} strokeDashoffset={(circ / 4).toFixed(3)}
                                style={{ transition: 'stroke-dasharray 0.4s ease' }} />
                              <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Principal</text>
                              <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
                            </svg>
                            <div style={{ display: 'flex', gap: 20, fontSize: 12, color: C.ink2 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} />
                                <span>Principal ({fmtC(loanAmount)})</span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} />
                                <span>Interest ({fmtC(result.totalInterest)})</span>
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      {(() => {
                        const total = loanAmount + result.totalInterest;
                        if (total === 0) return null;
                        const pPct = Math.round((loanAmount / total) * 100);
                        return (
                          <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                              <span style={{ fontSize: 11.5, color: C.ink3 }}>Principal {pPct}%</span>
                              <span style={{ fontSize: 11.5, color: C.ink3 }}>Interest {100 - pPct}%</span>
                            </div>
                            <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`Principal is ${pPct}% of total repayment`}>
                              <div style={{ height: '100%', width: `${pPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                            </div>
                          </div>
                        );
                      })()}

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
                    aria-expanded={showTable} aria-controls="edu-emi-schedule"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Year-by-Year Repayment Schedule</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>After moratorium</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {tenure} yr &middot; {interestRate.toFixed(2)}%
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showTable && (
                    <div id="edu-emi-schedule" style={{ borderTop: `1px solid ${C.border}` }}>
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
                        <EduScheduleBarChart rows={schedule} />
                      </div>
                      <div style={{ overflowX: 'auto', padding: mobile ? '16px' : '24px 44px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 480 }}>
                          <thead style={{ background: '#f4f5f6', borderBottom: `1px solid ${C.border}` }}>
                            <tr>
                              <th style={{ padding: '10px 12px', fontSize: 11.5, fontWeight: 700, color: C.ink, textAlign: 'left' }}>Year</th>
                              <th style={{ padding: '10px 12px', fontSize: 11.5, fontWeight: 700, color: C.ink, textAlign: 'right' }}>Principal</th>
                              <th style={{ padding: '10px 12px', fontSize: 11.5, fontWeight: 700, color: C.ink, textAlign: 'right' }}>Interest</th>
                              <th style={{ padding: '10px 12px', fontSize: 11.5, fontWeight: 700, color: C.ink, textAlign: 'right' }}>Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {schedule.map(row => (
                              <tr key={row.year} style={{ borderBottom: `1px solid ${C.border}` }}>
                                <td style={{ padding: '10px 12px', color: C.ink2 }}>{row.year}</td>
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

              {/* 1. What Is Education Loan EMI */}
              <div style={sec}>
                <h2 style={h2} id="what-is-education-loan-emi">What Is Education Loan EMI?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Education Loan EMI (Equated Monthly Instalment) is the fixed monthly payment a borrower makes to a bank or NBFC to repay an education loan after the moratorium period ends. It includes both a principal component and an interest component, structured so the loan is fully paid off by the end of the tenure.
                  </p>
                </div>
                <p style={p}>
                  Unlike a personal loan where repayment starts immediately, an education loan offers a moratorium period covering the course duration plus 6 to 12 months, during which no EMI is paid but simple interest keeps accruing. This accrued interest is capitalised, added to the principal before the EMI calculation begins.
                </p>
                <p style={p}>
                  Under{' '}
                  <a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    RBI
                  </a>{' '}
                  guidelines, lenders must clearly disclose the moratorium interest capitalisation policy and effective interest rate at sanction. The EMI depends on four factors: loan amount, interest rate, tenure, and moratorium period.
                </p>
              </div>

              {/* 2. Education Loan EMI Formula */}
              <div style={sec}>
                <h2 style={h2} id="education-loan-emi-formula">Education Loan EMI Formula</h2>
                <p style={p}>The education loan EMI is calculated in two stages: first, the interest accrued during the moratorium period is computed, and then the standard EMI formula is applied to the capitalised principal.</p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark }}>
                    Moratorium Interest = Loan Amount x (Annual Rate / 100) x (Moratorium Months / 12)<br />
                    Capitalised Principal = Loan Amount + Moratorium Interest<br />
                    EMI = P x r x (1 + r)^n / ((1 + r)^n - 1)
                  </code>
                </div>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Variable</th><th style={thS} scope="col">Meaning</th></tr></thead>
                    <tbody>
                      {[
                        ['P', 'Capitalised principal (original loan + moratorium interest)'],
                        ['r', 'Monthly interest rate (annual rate divided by 12, then divided by 100)'],
                        ['n', 'Total number of monthly instalments (tenure in years x 12)'],
                        ['EMI', 'Equated Monthly Instalment payable after the moratorium period'],
                        ['Moratorium Interest', 'Simple interest accrued during the course and grace period'],
                      ].map(([v, m]) => (
                        <tr key={v}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{v}</td><td style={tdR}>{m}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  <strong>Worked example:</strong> Borrow Rs 10 lakh at 10.5% per annum for 10 years with a 24-month moratorium. The interest accrued during moratorium is Rs 10,00,000 x 0.105 x (24/12) = Rs 2,10,000. The capitalised principal is Rs 12,10,000. Using the formula, the EMI works out to approximately Rs 16,330 per month after the moratorium ends.
                </p>
              </div>

              {/* 3. How Moratorium Period Affects Your EMI */}
              <div style={sec}>
                <h2 style={h2} id="education-loan-moratorium">How Moratorium Period Affects Your EMI</h2>
                <p style={p}>
                  The moratorium period directly increases the effective cost of the loan because interest keeps accruing on the principal even when no payments are being made. A longer moratorium period means more interest is capitalised, which increases the principal on which EMI is calculated.
                </p>
                <p style={p}>
                  <strong>Example of moratorium impact:</strong> A loan of Rs 7.5 lakh at 11% interest for 10 years would have a standard EMI of approximately Rs 10,325 without any moratorium. With a 36-month moratorium (typical for a 3-year postgraduate course), the accrued interest amounts to Rs 2,47,500, bringing the capitalised principal to Rs 9,97,500 and raising the EMI to about Rs 13,735 per month.
                </p>
                <p style={p}>
                  This is why some students opt to pay the interest during the moratorium period, known as a partial moratorium or interest-servicing option. Paying the simple interest each year during the course period prevents capitalisation and results in significantly lower EMIs once repayment begins. Many banks offer this as a flexible option in their education loan products.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Under the Central Sector Interest Subsidy Scheme (CSIS), eligible students from economically weaker backgrounds get the full interest during the moratorium period paid by the government. This subsidy covers the course period plus one year, effectively eliminating the capitalisation impact for qualifying borrowers.
                </p>
              </div>

              {/* 4. Education Loan Tax Benefits Under Section 80E */}
              <div style={sec}>
                <h2 style={h2} id="education-loan-tax-benefits">Education Loan Tax Benefits Under Section 80E</h2>
                <p style={p}>
                  Section 80E of the Income Tax Act provides a deduction for the entire interest paid on an education loan with no upper limit. This is one of the most valuable tax benefits available for higher education financing because the deduction applies to the full interest amount, unlike Section 80C which has a Rs 1.5 lakh cap.
                </p>
                <p style={p}>
                  The deduction is available only to individuals, not to HUFs or companies. The loan must be taken from a bank or approved financial institution for the purpose of higher education. Higher education includes all full-time courses pursued after completing the Senior Secondary Examination (Class 12), both in India and abroad, across all fields including professional, vocational, and technical courses.
                </p>
                <p style={p}>
                  The benefit is available for a maximum of 8 consecutive years from the year in which the borrower starts repaying the loan. If the loan is fully repaid before 8 years, the deduction stops in that year. Importantly, only the interest component is deductible, not the principal repayment. The total tax savings under Section 80E can run into several lakh rupees over the loan tenure for a borrower in the 30% tax bracket.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Use the{' '}
                  <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    Income Tax Calculator
                  </Link>{' '}
                  to see how the Section 80E deduction lowers your overall tax liability.
                </p>
              </div>

              {/* 5. Education Loan vs Personal Loan for Studies */}
              <div style={sec}>
                <h2 style={h2} id="education-loan-vs-personal-loan">Education Loan vs Personal Loan for Studies</h2>
                <p style={p}>
                  An education loan is the correct choice for financing higher studies in virtually every scenario. The table below shows why a personal loan should only be considered for very small amounts with a very short repayment window.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>Education loan vs personal loan for study financing</caption>
                    <thead><tr><th style={thS} scope="col">Factor</th><th style={thS} scope="col">Education Loan</th><th style={thS} scope="col">Personal Loan</th></tr></thead>
                    <tbody>
                      {[
                        ['Interest rate', '8% to 15% per annum', '12% to 24% per annum'],
                        ['Maximum tenure', 'Up to 15 years', '1 to 5 years'],
                        ['Moratorium period', 'Course duration + 6-12 months', 'None (repayment starts immediately)'],
                        ['Loan amount', 'Up to Rs 1.5 crore or more', 'Typically up to Rs 25 lakh'],
                        ['Tax benefit', 'Section 80E on full interest', 'None'],
                        ['Collateral required', 'Above Rs 7.5 lakh', 'Usually none for smaller amounts'],
                        ['Processing time', '2 to 4 weeks', '1 to 3 days'],
                        ['Prepayment penalty', 'None on floating-rate loans', '2% to 5% typically'],
                      ].map(([factor, edu, personal]) => (
                        <tr key={factor} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{factor}</td>
                          <td style={tdR}>{edu}</td>
                          <td style={tdR}>{personal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  For a loan of Rs 10 lakh at 10.5% over 5 years, a personal loan at 16% would cost approximately Rs 24,318 per month in EMI and Rs 4,59,000 in total interest. An education loan with the same principal and a 24-month moratorium at 10.5% over 10 years would cost approximately Rs 16,330 per month and Rs 9,59,000 in total interest, spread over a much longer tenure with a far lower monthly burden. The education loan also offers Section 80E tax savings on the interest.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Compare your options using the{' '}
                  <Link href="/calculators/personal-loan-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    Personal Loan Calculator
                  </Link>{' '}
                  to see the difference side by side.
                </p>
              </div>

              {/* 6. Education Loan Repayment Strategies */}
              <div style={sec}>
                <h2 style={h2} id="education-loan-repayment-strategies">Education Loan Repayment Strategies</h2>
                <p style={p}>
                  Paying the interest during the moratorium period is the single most effective strategy to reduce the total cost of an education loan. By servicing the simple interest each year while studying, the borrower prevents interest capitalisation and the EMI is calculated on the original loan amount rather than a significantly inflated principal.
                </p>
                <p style={p}>
                  <strong>Strategy 1: Interest-servicing during moratorium.</strong> If the borrower or co-borrower can pay the simple interest every year during the course period, the principal remains unchanged at the start of repayment. On a Rs 10 lakh loan at 10.5% with a 24-month moratorium, this saves approximately Rs 1,30,000 in total cost over the loan tenure compared to letting the moratorium interest capitalise into the principal.
                </p>
                <p style={p}>
                  <strong>Strategy 2: Partial prepayment after employment.</strong> Most graduates start earning within 6 to 12 months of completing their course. Making a lump sum prepayment of Rs 1 lakh to Rs 2 lakh in the first year of repayment can reduce the total interest outgo by 15% to 25% and shorten the effective tenure by 2 to 3 years.
                </p>
                <p style={p}>
                  <strong>Strategy 3: Reduce the tenure at the start.</strong> Choosing a 7-year tenure instead of 12 years increases the EMI by approximately 38% but reduces the total interest by roughly 37%. Use this calculator to find the tenure that balances monthly affordability with total interest cost.
                </p>
                <p style={p}>
                  <strong>Strategy 4: Transfer the loan if a better rate is available.</strong> If another lender offers a lower interest rate, applying for an education loan balance transfer can reduce both the EMI and the total interest. A 1% rate reduction on a Rs 15 lakh loan with 8 years remaining saves approximately Rs 75,000 in total interest.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  The{' '}
                  <Link href="/calculators/loan-eligibility-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    Loan Eligibility Calculator
                  </Link>{' '}
                  helps you estimate how much you can borrow based on your income and existing obligations.
                </p>
              </div>

              {/* 6b. Government Schemes */}
              <div style={sec}>
                <h2 style={h2} id="education-loan-govt-schemes">Government Schemes That Reduce Education Loan Cost</h2>
                <p style={p}>
                  Beyond bank-specific rates, the Indian government runs two schemes that directly lower the effective cost of an education loan for eligible students.
                </p>
                <p style={p}>
                  <strong style={{ color: C.ink }}>PM-Vidyalakshmi Scheme (launched November 2024):</strong> a unified application portal at{' '}
                  <a href="https://pmvidyalaxmi.co.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>pmvidyalaxmi.co.in</a>{' '}
                  lets students submit a single Common Education Loan Application Form to up to three lenders at once, and compare loan amount, interest rate, moratorium, and repayment terms side by side. The scheme adds collateral-free loans, a credit guarantee, and interest subvention for students admitted to Quality Higher Education Institutions (QHEIs), replacing the older Vidya Lakshmi portal.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  <strong style={{ color: C.ink }}>Central Sector Interest Subsidy Scheme (CSIS):</strong> as covered above, this pays the full moratorium-period interest for students from families with annual income up to Rs 4.5 lakh, taken for professional or technical courses from a scheduled bank. Applying through PM-Vidyalakshmi does not automatically enrol a student in CSIS. Eligible students must separately confirm CSIS applicability with their lending bank at the time of disbursement.
                </p>
              </div>

              {/* 6c. Documents and NRI considerations */}
              <div style={sec}>
                <h2 style={h2} id="education-loan-documents-nri">Documents Required and Considerations for NRI Applicants</h2>
                <p style={p}>
                  A typical education loan application needs proof of admission, academic records, identity and address proof, income proof for the co-applicant (usually a parent or guardian), and collateral documents if the loan exceeds Rs 7.5 lakh. Banks also ask for a cost sheet from the institution breaking down tuition, accommodation, and other expenses the loan is meant to cover.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  For NRI students or those studying abroad, most Indian banks still require a resident Indian co-applicant, typically a parent, since the loan is disbursed and recovered in India. Interest rates for study-abroad loans are often 0.5 to 1 percentage point higher than domestic study loans, and margin money requirements (the portion of the total cost the borrower funds independently) are typically higher for loans above Rs 4 lakh for overseas study, usually around 15%, compared to 5% for studies in India.
                </p>
              </div>

              {/* 7. Limitations */}
              <div style={sec}>
                <h2 style={h2} id="education-loan-emi-limitations">Limitations of Education Loan EMI Calculators</h2>
                <div>
                  {[
                    ['Assumes constant interest rate', 'Education loan EMI calculators assume the interest rate remains fixed for the entire tenure. In reality, floating-rate loans change when the bank benchmark rate or repo rate changes. A rate increase of even 1% can raise the EMI by 6% to 8%.'],
                    ['Does not account for prepayments', 'The standard calculation assumes regular monthly payments for the full tenure without any prepayments. Most education loan calculators do not model the impact of partial prepayments or lump sum payments that reduce the principal faster.'],
                    ['Simple interest assumption during moratorium', 'The calculator uses simple interest for the moratorium period, which is the standard industry practice. However, some lenders may compound interest at different intervals during the moratorium, leading to a slightly higher capitalised principal.'],
                    ['No processing fees or insurance', 'The calculator does not include processing fees (typically 0.5% to 2% of the loan amount), loan insurance premiums, or other charges that add to the effective cost of borrowing. The actual total cost is higher than the calculated EMI-based total.'],
                  ].map(([title, text], i) => (
                    <div key={i} style={{ ...bul, marginBottom: 14, gap: 0, flexDirection: 'column' as const }}>
                      <strong style={{ fontSize: 15, color: C.ink, marginBottom: 4 }}>{title}</strong>
                      <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 8. How to Use */}
              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This Education Loan EMI Calculator</h2>
                <p style={p}>Four inputs control every variable that affects your education loan EMI:</p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Loan amount, interest rate, and tenure:</strong> the core inputs that determine your EMI once repayment starts.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Moratorium period:</strong> set the course duration plus grace period in months. The longer the moratorium, the more interest accrues and capitalises, increasing the EMI. The calculator shows the interest accrued during moratorium and the total due at repayment start.
                  </li>
                </ol>
                <p style={{ ...p, margin: 0 }}>
                  Click any input value to type a precise number. Use the year preset buttons (5Y, 7Y, 10Y, 12Y, 15Y, 20Y) to switch tenures quickly. The currency selector converts all displayed amounts to USD, EUR, GBP, or other currencies for NRI students planning education loans. Use the moratorium slider to see how different course durations affect the final EMI.
                </p>
              </div>

              {/* 9. FAQ */}

              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ faqs={faqs} />
              </div>

              {/* 10. Disclaimer */}
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only. Education loan EMI is a mathematical estimate based on the inputs provided and does not constitute a loan offer or sanction. Actual EMIs depend on the lender interest rate, the moratorium capitalisation policy, processing fees, and other terms applied at the time of loan disbursement. Consult a SEBI-registered financial adviser or your bank loan officer before making borrowing decisions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.edu-emi-sidebar::-webkit-scrollbar{width:5px}.edu-emi-sidebar::-webkit-scrollbar-track{background:transparent}.edu-emi-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.edu-emi-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="edu-emi-sidebar" style={{
            position: mobile ? 'static' : 'sticky',
            top: 20,
            alignSelf: 'start',
            maxHeight: mobile ? 'none' : 'calc(100vh - 40px)',
            overflowY: mobile ? 'visible' : 'auto',
            paddingRight: mobile ? 0 : 2,
            scrollbarWidth: 'thin',
            scrollbarColor: '#C4C9C4 transparent',
          } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <nav aria-label="Related Calculators" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <SidebarList title="Popular Calculators" items={POPULAR} />
                <SidebarList title="More Calculators" items={MORE} />
              </nav>
            </div>
          </aside>

        </div>
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

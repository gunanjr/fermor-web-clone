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

/* ─── Year presets ───────────────────────────────────────────── */
function YearPresets({ current, onChange }: { current: number; onChange: (v: number) => void }) {
  const presets = [1, 3, 5, 7, 10, 15, 20, 30];
  return (
    <div role="group" aria-label="Tenure presets" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: -22, marginBottom: 20 }}>
      {presets.map(y => {
        const active = current === y;
        return (
          <button key={y} onClick={() => onChange(y)} aria-pressed={active} aria-label={`Set tenure to ${y} year${y > 1 ? 's' : ''}`}
            style={{ fontSize: 11.5, fontWeight: active ? 700 : 500, color: active ? C.white : C.ink3, background: active ? C.dark : 'transparent', border: `1px solid ${active ? C.dark : C.border}`, borderRadius: 99, padding: '3px 9px', cursor: 'pointer', fontFamily: INTER, transition: 'all 0.12s' }}>
            {y}Y
          </button>
        );
      })}
    </div>
  );
}

/* ─── Amortization schedule ──────────────────────────────────── */
interface EligScheduleRow { year: number; principal: number; interest: number; balance: number; }

function buildEligSchedule(loanAmount: number, annualRate: number, tenureYears: number): EligScheduleRow[] {
  if (loanAmount <= 0 || tenureYears <= 0) return [];
  const r = annualRate / 1200;
  const months = tenureYears * 12;
  const emi = r === 0 ? loanAmount / months : loanAmount * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
  let bal = loanAmount;
  const rows: EligScheduleRow[] = [];
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

function EligScheduleBarChart({ rows }: { rows: EligScheduleRow[] }) {
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

/* ─── Donut - two-tone ring with center label ───────────────── */
function DonutChart({ principal, interest }: { principal: number; interest: number }) {
  const total = principal + interest;
  if (total === 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const pArc  = (principal / total) * circ;
  const pPct  = Math.round((principal / total) * 100);
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img" aria-label={`Principal ${pPct}% of total repayment, interest ${100 - pPct}%`} style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc.toFixed(3)} ${(circ - pArc).toFixed(3)}`} strokeDashoffset={(circ / 4).toFixed(3)}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Principal</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
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
        body: JSON.stringify({ email, source: 'loan-eligibility-calculator' }),
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
      <p style={{ color: C.ink, fontWeight: 600, fontSize: 14, margin: '0 0 4px' }}>Save your results</p>
      <p style={{ color: C.ink3, fontSize: 13, margin: '0 0 14px', lineHeight: 1.6 }}>Sign up to save this calculation and access your results any time.</p>
      <form onSubmit={submit} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required aria-label="Email address"
          style={{ flex: 1, minWidth: 200, padding: '9px 13px', borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.ink, fontSize: 13.5, fontFamily: INTER, outline: 'none' }} />
        <button className="fx-btn" type="submit" disabled={status === 'loading'}
          style={{ padding: '9px 20px', background: '#E9ECEE', color: '#101214', fontWeight: 600, fontSize: 13.5, borderRadius: 8, border: '1px solid #D3D7DA', cursor: status === 'loading' ? 'wait' : 'pointer', fontFamily: INTER, whiteSpace: 'nowrap', opacity: status === 'loading' ? 0.65 : 1, transition: 'opacity 0.15s' }}>
          {status === 'loading' ? 'Saving...' : 'Sign up free'}
        </button>
      </form>
      {status === 'error' && <p style={{ color: '#C0392B', fontSize: 12.5, margin: '10px 0 0' }}>Something went wrong. Try again in a moment.</p>}
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
  { href: '/calculators/emi-calculator', label: 'EMI Calculator' },
  { href: '/calculators/home-loan-calculator', label: 'Home Loan Calculator' },
  { href: '/calculators/personal-loan-calculator', label: 'Personal Loan Calculator' },
  { href: '/calculators/car-loan-calculator', label: 'Car Loan Calculator' },
  { href: '/calculators/loan-calculator', label: 'Loan Calculator' },
  { href: '/calculators/education-corpus-calculator', label: 'Education Corpus Calculator' },
  { href: '/calculators/fd-calculator', label: 'FD Calculator' },
];
const MORE = [
  { href: '/calculators/income-tax-calculator', label: 'Income Tax Calculator' },
  { href: '/calculators/old-vs-new-tax-regime-calculator', label: 'Old vs New Tax Regime' },
  { href: '/calculators/in-hand-salary-calculator', label: 'In-Hand Salary Calculator' },
  { href: '/calculators/ppf-calculator', label: 'PPF Calculator' },
  { href: '/calculators/sip-calculator', label: 'SIP Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
function FAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  return <FAQBox items={faqs} />;
}

/* ─── Main ───────────────────────────────────────────────────── */

export default function LoanEligibilityClient({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [mobile, setMobile] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const [monthlyIncome, setMonthlyIncome] = useState(75000);
  const [existingObligations, setExistingObligations] = useState(0);
  const [interestRate, setInterestRate] = useState(10.5);
  const [tenure, setTenure] = useState(5);
  const [foirPercent, setFoirPercent] = useState(50);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  /* localStorage */
  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-loan-eligibility-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (d.monthlyIncome) setMonthlyIncome(d.monthlyIncome);
      if (d.existingObligations) setExistingObligations(d.existingObligations);
      if (d.interestRate) setInterestRate(d.interestRate);
      if (d.tenure) setTenure(d.tenure);
      if (d.foirPercent) setFoirPercent(d.foirPercent);
    } catch { /* fail silently */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('fermor-loan-eligibility-v1', JSON.stringify({ monthlyIncome, existingObligations, interestRate, tenure, foirPercent }));
    } catch { /* ignore */ }
  }, [monthlyIncome, existingObligations, interestRate, tenure, foirPercent]);

  const result = useMemo(() => {
    const monthlyRate = interestRate / 100 / 12;
    const months = tenure * 12;
    const availableEMI = (monthlyIncome * foirPercent / 100) - existingObligations;
    if (availableEMI <= 0 || monthlyRate <= 0) return null;
    const factor = Math.pow(1 + monthlyRate, months);
    const loanAmount = availableEMI * (factor - 1) / (monthlyRate * factor);
    const emi = loanAmount * monthlyRate * factor / (factor - 1);
    const totalInterest = emi * months - loanAmount;
    const totalPayment = emi * months;
    return { loanAmount, emi, totalInterest, totalPayment, availableEMI, months };
  }, [monthlyIncome, existingObligations, interestRate, tenure, foirPercent]);

  const schedule = useMemo(() => result ? buildEligSchedule(result.loanAmount, interestRate, tenure) : [], [result, interestRate, tenure]);

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const h3  = { fontSize: 15.5, fontWeight: 600, color: C.ink, margin: '0 0 6px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 600, color: C.ink3, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } as React.CSSProperties;
  const bul = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 } as React.CSSProperties;
  const mono = { fontFamily: 'monospace', background: '#f4f5f6', padding: '2px 7px', borderRadius: 4, fontSize: 13.5, color: C.dark } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>Loan Eligibility Calculator</h1>
          <p style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>Calculate how much loan you qualify for based on your monthly income, existing obligations, and loan terms using the FOIR method.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>
            <section aria-label="Loan Eligibility Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>
                  {!showAdvanced ? (
                    <>
                      <Slider label="Monthly Income" id="income" value={monthlyIncome} min={5000} max={5000000} step={5000} fmt={fmtC} onChange={setMonthlyIncome} compact={mobile} />
                      <Slider label="Existing Obligations" id="obligations" value={existingObligations} min={0} max={500000} step={1000} fmt={fmtC} onChange={setExistingObligations} compact={mobile} />
                      <Slider label="Interest Rate" id="rate" value={interestRate} min={1} max={30} step={0.25} fmt={v => `${v.toFixed(2)}%`} onChange={setInterestRate} compact={mobile} />
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
                      <Slider label="Tenure" id="tenure" value={tenure} min={1} max={30} step={1} fmt={v => `${v} Yr`} onChange={setTenure} compact={mobile} />
                      <YearPresets current={tenure} onChange={setTenure} />
                      <Slider label="FOIR Percentage" id="foir" value={foirPercent} min={30} max={70} step={1} fmt={v => `${v}%`} onChange={setFoirPercent} compact={mobile} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {result ? (
                    <>
                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 8 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#50565C' }}>Eligible Loan Amount</div>
                          <div style={{ fontSize: 12, color: '#7A8087' }}>Monthly EMI</div>
                        </div>
                        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                          <div style={{ fontSize: mobile ? 22 : 26, fontWeight: 800, color: '#1F7A58', lineHeight: 1 }} aria-live="polite" aria-label={`Eligible loan amount: ${fmtIN(result.loanAmount)}`}>{fmtIN(result.loanAmount)}</div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#101214', lineHeight: 1 }}>{fmtIN(result.emi)}</div>
                        </div>
                      </div>

                      {/* Donut Chart */}
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 24, order: mobile ? 1 : -1 }}>
                        <DonutChart principal={result.loanAmount} interest={result.totalInterest} />
                      </div>

                      <div style={{ width: '100%' }}>
                        {[
                          { label: 'Available EMI capacity', value: fmtC(result.availableEMI) },
                          { label: 'Total interest payable', value: fmtC(Math.abs(result.totalInterest)) },
                          { label: 'Total repayment', value: fmtC(result.totalPayment) },
                          { label: 'Loan tenure', value: `${result.months} months` },
                          { label: 'FOIR used', value: `${foirPercent}%` },
                        ].map(({ label, value }) => (
                          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                            <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                            <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Legend */}
                      <div style={{ display: 'flex', justifyContent: 'center', gap: 22, marginTop: mobile ? 16 : 0, marginBottom: mobile ? 8 : 28, order: mobile ? 2 : -1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} />
                          <span style={{ fontSize: 13, color: C.ink2 }}>Principal</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} />
                          <span style={{ fontSize: 13, color: C.ink2 }}>Interest</span>
                        </div>
                      </div>

                      {(() => {
                        const total = result.loanAmount + Math.abs(result.totalInterest);
                        if (total === 0) return null;
                        const pPct = Math.round((result.loanAmount / total) * 100);
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
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, color: C.ink3, fontSize: 14 }}>Adjust inputs to see result</div>
                  )}
                </div>
              </div>

              {/* Amortization schedule */}
              {schedule.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowTable(v => !v)}
                    aria-expanded={showTable} aria-controls="loan-elig-schedule"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Year-by-Year Repayment Schedule</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>For the eligible loan amount</span>}
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
                    <div id="loan-elig-schedule" style={{ borderTop: `1px solid ${C.border}` }}>
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
                        <EligScheduleBarChart rows={schedule} />
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


            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>
              <div style={sec}>
                <h2 style={h2} id="what-is-loan-eligibility">What Is Loan Eligibility?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Loan eligibility is the maximum amount a lender is willing to offer you based on your income, existing debt obligations, the interest rate, and the repayment tenure. It is expressed as a rupee amount.
                  </p>
                </div>
                <p style={p}>Lenders calculate eligibility to check whether you can comfortably repay a loan without defaulting, capping your total monthly EMI at a fixed share of income, typically 50 per cent, known as FOIR (Fixed Obligation to Income Ratio). Each lender sets its own FOIR ceiling, usually between 40 and 55 per cent, depending on the loan type and risk profile.</p>
                <p style={p}>The RBI mandates that lenders verify repayment capacity before sanctioning a loan, and FOIR is the primary tool banks and NBFCs use for this. Some lenders instead use the multiplier method for personal loans, where eligibility is a fixed multiple of annual income.</p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="loan-eligibility-formula">Loan Eligibility Formula: How It Works</h2>
                <p style={p}>The formula for loan eligibility involves two steps: finding your available EMI capacity and then solving for the loan amount that fits.</p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark }}>
                    Step 1: Available EMI = (Monthly Income x FOIR%) minus Existing Obligations<br />
                    Step 2: Loan Amount = EMI x ((1 + r)^n - 1) / (r x (1 + r)^n)<br />
                    where r = monthly interest rate and n = number of months
                  </code>
                </div>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}` }}>
                    <thead><tr><th style={thS} scope="col">Variable</th><th style={thS} scope="col">Meaning</th></tr></thead>
                    <tbody>
                      {[
                        ['Monthly Income', 'Your total monthly earnings before tax'],
                        ['Existing Obligations', 'Total EMI you already pay on other loans'],
                        ['FOIR %', 'The percentage cap on total EMIs (typically 50%)'],
                        ['Interest Rate', 'Annual interest rate divided by 12 for monthly rate'],
                        ['Tenure', 'Loan repayment period in months'],
                        ['Eligible Loan Amount', 'The maximum loan you can afford given the constraints'],
                      ].map(([v, m]) => (
                        <tr key={v}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{v}</td><td style={tdR}>{m}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}><strong>Worked example:</strong> Monthly income of Rs 80,000, existing obligations of Rs 10,000, interest rate of 10.5%, tenure of 5 years. Available EMI = (80,000 x 50%) minus 10,000 = Rs 30,000 per month. The eligible loan amount at 10.5% for 60 months is approximately Rs 13,95,745. Your monthly EMI would be Rs 30,000, total interest payable is Rs 4,04,255, and total repayment is Rs 18,00,000.</p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="loan-eligibility-foir">FOIR Calculation Method: What Lenders Use</h2>
                <p style={p}>The FOIR method is the standard eligibility assessment used by most Indian banks and NBFCs. It calculates what percentage of your monthly income is already committed to loan repayments and caps the total at a threshold, usually 50 per cent. If your FOIR is below 50 per cent, you have capacity for a new loan. If it is above 50 per cent, your application may be rejected or sanctioned at a lower amount.</p>
                <p style={p}>Different loan types have different FOIR thresholds. Home loans, being secured, often allow up to 55 to 60 per cent FOIR for high-income borrowers. Personal loans, being unsecured, are stricter at 40 to 50 per cent. Some lenders also factor in your age, with younger borrowers getting higher FOIR limits because they have longer earning potential.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}` }}>
                    <thead><tr><th style={thS} scope="col">Loan Type</th><th style={thS} scope="col">Typical FOIR Cap</th><th style={thS} scope="col">Notes</th></tr></thead>
                    <tbody>
                      {[
                        ['Home Loan', '50 to 60%', 'Higher for co-applicant income inclusion'],
                        ['Personal Loan', '40 to 50%', 'Stricter due to unsecured nature'],
                        ['Car Loan', '45 to 55%', 'Vehicle acts as collateral'],
                        ['Education Loan', '45 to 55%', 'Moratorium period considered'],
                        ['Credit Card', '30 to 40%', 'Based on credit limit utilisation'],
                      ].map(([lt, fc, n]) => (
                        <tr key={lt} style={{ borderBottom: `1px solid ${C.border}` }}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{lt}</td><td style={tdR}>{fc}</td><td style={tdL}>{n}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="factors-affecting-eligibility">Factors Affecting Loan Eligibility</h2>
                <p style={p}>Several factors determine how much a lender is willing to offer. Income is the most significant variable, but it interacts with other elements that can increase or decrease your eligible amount.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Factor</th><th style={thS} scope="col">Impact on Eligibility</th></tr></thead>
                    <tbody>
                      {[
                        ['Monthly Income', 'Higher income increases eligibility proportionally'],
                        ['Existing Obligations', 'Higher existing EMIs reduce available EMI capacity'],
                        ['Interest Rate', 'Higher rates reduce the loan amount for the same EMI'],
                        ['Loan Tenure', 'Longer tenure increases eligibility but adds interest'],
                        ['Credit Score', 'Below 750 may reduce eligibility or attract higher rates'],
                        ['Age', 'Younger applicants qualify for longer tenures'],
                        ['Employer Profile', 'Government or MNC employers get higher multipliers'],
                      ].map(([f, i]) => (
                        <tr key={f} style={{ borderBottom: `1px solid ${C.border}` }}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{f}</td><td style={tdR}>{i}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="improve-loan-eligibility">How to Improve Your Loan Eligibility</h2>
                <p style={p}>A low eligibility does not mean you cannot get a loan. These strategies can increase the amount a lender is willing to sanction.</p>
                {[
                  ['Add a co-applicant', 'Including your spouse, parent, or sibling as a co-applicant adds their income to the calculation. This can increase eligibility by 30 to 50 per cent. Home loans with joint applicants have significantly higher sanction amounts.'],
                  ['Extend the tenure', 'A longer repayment period reduces the EMI, which increases the loan amount you can afford for the same monthly capacity. At 10 per cent interest, extending a 5-year loan to 10 years increases eligibility by roughly 60 per cent for the same available EMI, though total interest paid rises as well.'],
                  ['Reduce existing debt', 'Prepaying an outstanding personal loan or credit card balance reduces your existing obligations. Every Rs 1,000 of reduced EMI adds roughly Rs 75,000 to your eligibility at 10 per cent over 10 years.'],
                  ['Improve your credit score', 'A CIBIL score above 750 unlocks lower interest rates and higher eligibility. Pay all EMIs and credit card bills on time for 12 consecutive months to build score. Dispute any errors on your credit report.'],
                ].map(([title, text], i) => (
                  <div key={i} style={{ ...bul, marginBottom: 14, gap: 0, flexDirection: 'column' as const }}>
                    <strong style={{ fontSize: 15, color: C.ink, marginBottom: 4 }}>{title}</strong>
                    <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                  </div>
                ))}
              </div>

              <div style={sec}>
                <h2 style={h2} id="loan-eligibility-by-income">Loan Eligibility by Income Level</h2>
                <p style={p}>The table below shows approximate loan eligibility for different income levels, assuming no existing obligations, at 10.5 per cent interest, with a 5-year tenure and 50 per cent FOIR.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Monthly Income</th><th style={thS} scope="col">FOIR 50%</th><th style={thS} scope="col">Eligible Loan (5yr)</th><th style={thS} scope="col">Monthly EMI</th></tr></thead>
                    <tbody>
                      {[
                        ['Rs 25,000', 'Rs 12,500', 'Rs 5.82 L', 'Rs 12,500'],
                        ['Rs 50,000', 'Rs 25,000', 'Rs 11.63 L', 'Rs 25,000'],
                        ['Rs 75,000', 'Rs 37,500', 'Rs 17.45 L', 'Rs 37,500'],
                        ['Rs 1,00,000', 'Rs 50,000', 'Rs 23.26 L', 'Rs 50,000'],
                        ['Rs 2,00,000', 'Rs 1,00,000', 'Rs 46.52 L', 'Rs 1,00,000'],
                        ['Rs 5,00,000', 'Rs 2,50,000', 'Rs 1.16 Cr', 'Rs 2,50,000'],
                      ].map(([mi, f, el, em]) => (
                        <tr key={mi} style={{ borderBottom: `1px solid ${C.border}` }}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{mi}</td><td style={tdR}>{f}</td><td style={tdR}>{el}</td><td style={tdR}>{em}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="home-loan-vs-personal-loan-eligibility">Home Loan vs Personal Loan Eligibility</h2>
                <p style={p}>Home loans and personal loans have different eligibility criteria because one is secured by property and the other is unsecured. Home loans typically offer 3 to 5 times higher eligibility than personal loans for the same income.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Factor</th><th style={thS} scope="col">Home Loan</th><th style={thS} scope="col">Personal Loan</th></tr></thead>
                    <tbody>
                      {[
                        ['Typical FOIR Cap', '50 to 60%', '40 to 50%'],
                        ['Maximum Tenure', 'Up to 30 years', 'Up to 5 years'],
                        ['Interest Rate', '8.5 to 10%', '10.5 to 24%'],
                        ['Co-applicant', 'Allowed and encouraged', 'Limited or not allowed'],
                        ['Loan Amount', 'Up to 80 to 90% of property value', 'Up to 15 to 30x monthly income'],
                        ['Processing Time', '1 to 3 weeks', '1 to 3 days'],
                      ].map(([f, hl, pl]) => (
                        <tr key={f} style={{ borderBottom: `1px solid ${C.border}` }}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{f}</td><td style={tdR}>{hl}</td><td style={tdR}>{pl}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="loan-eligibility-excel">Loan Eligibility in Excel: Using the PMT Function</h2>
                <p style={p}>The <code style={mono}>PMT</code> function in Excel lets you calculate the EMI for a given loan amount, or you can reverse it to find eligibility. Assume A2 holds the monthly income, B2 holds existing obligations, and C2 holds the interest rate, and D2 holds tenure in years.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Calculation</th><th style={thS} scope="col">Excel Formula</th></tr></thead>
                    <tbody>
                      {[
                        ['Available EMI', '=A2*50%-B2'],
                        ['EMI for a loan', '=PMT(C2/12,D2*12,-E2) where E2 is loan amount'],
                        ['Max loan from EMI', '=PV(C2/12,D2*12,-F2) where F2 is available EMI'],
                        ['Total Payment', '=G2*D2*12 where G2 is EMI'],
                      ].map(([c, f]) => (
                        <tr key={c} style={{ borderBottom: `1px solid ${C.border}` }}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{c}</td><td style={tdR}><code style={mono}>{f}</code></td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>The <code style={mono}>PV</code> function is particularly useful. It directly calculates the loan amount you can afford given your available EMI, interest rate, and tenure.</p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="loan-eligibility-self-employed">Loan Eligibility for Self-Employed Applicants</h2>
                <p style={p}>Self-employed applicants are assessed differently from salaried employees because income is variable and harder to verify from a single payslip.</p>
                <p style={p}>Lenders typically use the average net profit from the last 2 to 3 years of Income Tax Returns, converted to a monthly equivalent (annual average divided by 12), in place of a fixed monthly salary. Business owners and professionals such as doctors, chartered accountants, and consultants usually need to submit IT returns, GST filings, bank statements for the last 6 to 12 months, and a CA-certified profit and loss statement and balance sheet.</p>
                <p style={{ ...p, margin: 0 }}>
                  Because business income can fluctuate year to year, some lenders apply a more conservative FOIR (often 40 to 45 per cent instead of 50 per cent) for self-employed applicants, and may average across a declining or volatile income trend rather than simply using the most recent year. A consistent, growing income trend across the last 2 to 3 years generally strengthens eligibility more than a single strong year.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="loan-eligibility-nri">Loan Eligibility for NRIs</h2>
                <p style={p}>NRI loan eligibility follows the same FOIR logic but with adjustments for foreign income and cross-border risk.</p>
                <p style={p}>
                  Lenders convert foreign income to INR at the prevailing exchange rate and typically apply a stricter FOIR of 40 to 50 per cent to account for currency fluctuation risk. Required documents usually include an employment contract or offer letter, salary slips from the country of residence, overseas bank statements, a valid passport and visa, and often a resident Indian co-applicant, since recovery in case of default is easier within India.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  NRI home loans in India also typically require a higher down payment (lower loan-to-value ratio) than resident home loans, and interest rates may carry a small premium over resident rates at some lenders.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="limitations-of-loan-eligibility-calculators">Limitations of Loan Eligibility Calculators</h2>
                {[
                  ['Does not consider credit score', 'This calculator shows the maximum eligible amount based purely on income and obligations. Your actual sanction depends on your CIBIL score, which lenders weigh heavily. A low score can reduce the sanctioned amount or result in rejection regardless of your income.'],
                  ['Standard FOIR may not match your lender', 'Different lenders use different FOIR caps. Some go as high as 60 per cent for home loans, while personal loan lenders may cap at 40 per cent. The 50 per cent default is a middle estimate, not a universal rule.'],
                  ['Does not factor job stability', 'Lenders consider how long you have been employed, whether you are on probation, and your employment type. A freelancer with high income but short history may get lower eligibility than an equally paid government employee.'],
                  ['Excludes other financial commitments', 'The calculator only considers explicit EMIs. Lenders also assess other regular expenses, minimum credit card payments, insurance premiums, and dependent obligations which may reduce your actual eligibility.'],
                ].map(([title, text], i) => (
                  <div key={i} style={{ ...bul, marginBottom: 14, gap: 0, flexDirection: 'column' as const }}>
                    <strong style={{ fontSize: 15, color: C.ink, marginBottom: 4 }}>{title}</strong>
                    <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                  </div>
                ))}
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This Loan Eligibility Calculator</h2>
                <p style={p}>The calculator uses the FOIR method to determine your maximum eligible loan amount:</p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Enter your monthly income:</strong> the total pre-tax income from all regular sources.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Enter existing obligations:</strong> the total EMI on any current loans or credit card debt.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Set interest rate and tenure:</strong> the expected loan interest rate and repayment period.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Adjust FOIR percentage:</strong> change it to match your lender threshold, or leave it at 50 per cent.</li>
                </ol>
                <p style={{ ...p, margin: 0 }}>The result panel shows your eligible loan amount, monthly EMI, total interest payable, and total repayment. Click any input value to type a precise number. Use the currency selector to switch between INR, USD, EUR, GBP, and other currencies.</p>
              </div>


              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ faqs={faqs} />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only. Loan eligibility is a mathematical estimate based on the FOIR method and does not guarantee loan approval or sanction at the displayed amount. Actual loan eligibility depends on lender policies, credit score, document verification, and other factors assessed during underwriting. This calculator is for educational and planning purposes only and does not constitute financial advice. Consult a SEBI-registered investment adviser or your lender before making borrowing decisions.
                </p>
              </div>
            </article>
          </div>

          <style>{`.loan-elig-sidebar::-webkit-scrollbar{width:5px}.loan-elig-sidebar::-webkit-scrollbar-track{background:transparent}.loan-elig-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.loan-elig-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="loan-elig-sidebar" aria-label="Related calculators" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
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

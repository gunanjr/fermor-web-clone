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

/* ─── Category breakdown bar chart ───────────────────────────── */
interface CategoryRow { label: string; value: number; kind: 'asset' | 'liability'; }

function CategoryBarChart({ rows }: { rows: CategoryRow[] }) {
  const nonZero = rows.filter(r => r.value > 0);
  if (nonZero.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 34;
  const maxVal = Math.max(...nonZero.map(r => r.value));
  const slot = (W - PADL) / nonZero.length;
  const barW = Math.max(10, Math.min(70, slot * 0.6));
  const gap = (slot - barW) / 2;
  return (
    <svg role="img" aria-label="Asset and liability category breakdown"
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {nonZero.map((row, i) => {
        const barH = maxVal > 0 ? (row.value / maxVal) * H : 0;
        const x = PADL + i * slot + gap;
        return (
          <g key={row.label}>
            <rect x={x} y={H - barH} width={barW} height={barH} fill={row.kind === 'asset' ? CHART_PAIR.primary : CHART_PAIR.secondary} rx={3} />
            <text x={x + barW / 2} y={H + 16} textAnchor="middle"
              style={{ fontSize: nonZero.length > 6 ? 8 : 10, fill: C.ink3, fontFamily: INTER }}>
              {row.label}
            </text>
          </g>
        );
      })}
      <line x1={PADL} y1={H} x2={W} y2={H} stroke={C.border} strokeWidth={1} />
    </svg>
  );
}

/* ─── Donut - two-tone ring with center label ───────────────── */
function DonutChart({ assets, liabilities }: { assets: number; liabilities: number }) {
  const total = assets + liabilities;
  if (total === 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const pArc  = (assets / total) * circ;
  const pPct  = Math.round((assets / total) * 100);
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img" aria-label={`Assets ${pPct}% of combined total, liabilities ${100 - pPct}%`} style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc.toFixed(3)} ${(circ - pArc).toFixed(3)}`} strokeDashoffset={(circ / 4).toFixed(3)}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Assets</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
  );
}

/* ─── Section group header ───────────────────────────────────── */
function SectionHeader({ label, color }: { label: string; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, paddingBottom: 6, borderBottom: `1px solid ${C.border}` }}>
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
      <span style={{ fontSize: 13, fontWeight: 700, color: C.ink, letterSpacing: '0.02em', textTransform: 'uppercase' }}>{label}</span>
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
        body: JSON.stringify({ email, source: 'net-worth-calculator' }),
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
  { href: '/calculators/retirement-calculator',    label: 'Retirement Calculator' },
  { href: '/calculators/fd-calculator',             label: 'FD Calculator' },
  { href: '/calculators/ppf-calculator',            label: 'PPF Calculator' },
  { href: '/calculators/sip-calculator',            label: 'SIP Calculator' },
  { href: '/calculators/lumpsum-calculator',        label: 'Lumpsum Calculator' },
  { href: '/calculators/nps-calculator',            label: 'NPS Calculator' },
  { href: '/calculators/emergency-fund-calculator', label: 'Emergency Fund Calculator' },
];
const MORE = [
  { href: '/calculators/fire-calculator',           label: 'FIRE Calculator' },
  { href: '/calculators/goal-planning-calculator',  label: 'Goal Planning Calculator' },
  { href: '/calculators/wealth-growth-calculator',  label: 'Wealth Growth Calculator' },
  { href: '/calculators/mutual-fund-calculator',    label: 'Mutual Fund Calculator' },
  { href: '/calculators/income-tax-calculator',     label: 'Income Tax Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
function FAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  return <FAQBox items={faqs} />;
}

/* ─── Main ───────────────────────────────────────────────────── */

export default function NetWorthClient({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [mobile, setMobile] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showTable, setShowTable] = useState(false);

  /* Asset inputs */
  const [cashBank,     setCashBank]     = useState(500000);
  const [investments,  setInvestments]  = useState(800000);
  const [property,     setProperty]     = useState(5000000);
  const [vehicles,     setVehicles]     = useState(500000);

  /* Liability inputs */
  const [homeLoan,      setHomeLoan]      = useState(1500000);
  const [personalLoan,  setPersonalLoan]  = useState(0);
  const [carLoan,       setCarLoan]       = useState(0);
  const [educationLoan, setEducationLoan] = useState(0);
  const [creditCard,    setCreditCard]    = useState(0);
  const [otherLoans,    setOtherLoans]    = useState(0);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  /* local storage */
  useEffect(() => {
    try {
      const saved = localStorage.getItem('fermor-net-worth-v1');
      if (saved) {
        const d = JSON.parse(saved);
        if (d.cashBank !== undefined) setCashBank(d.cashBank);
        if (d.investments !== undefined) setInvestments(d.investments);
        if (d.property !== undefined) setProperty(d.property);
        if (d.vehicles !== undefined) setVehicles(d.vehicles);
        if (d.homeLoan !== undefined) setHomeLoan(d.homeLoan);
        if (d.personalLoan !== undefined) setPersonalLoan(d.personalLoan);
        if (d.carLoan !== undefined) setCarLoan(d.carLoan);
        if (d.educationLoan !== undefined) setEducationLoan(d.educationLoan);
        if (d.creditCard !== undefined) setCreditCard(d.creditCard);
        if (d.otherLoans !== undefined) setOtherLoans(d.otherLoans);
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('fermor-net-worth-v1', JSON.stringify({
        cashBank, investments, property, vehicles,
        homeLoan, personalLoan, carLoan, educationLoan, creditCard, otherLoans,
      }));
    } catch { /* ignore */ }
  }, [cashBank, investments, property, vehicles, homeLoan, personalLoan, carLoan, educationLoan, creditCard, otherLoans]);

  const totalAssets = cashBank + investments + property + vehicles;
  const totalLiabilities = homeLoan + personalLoan + carLoan + educationLoan + creditCard + otherLoans;
  const netWorth = totalAssets - totalLiabilities;
  const assetLiabilityRatio = totalLiabilities > 0 ? totalAssets / totalLiabilities : 0;
  const liquidAssets = cashBank + investments;
  const liquidNetWorth = liquidAssets - (personalLoan + creditCard + otherLoans);

  const categoryRows: CategoryRow[] = [
    { label: 'Cash & Bank', value: cashBank, kind: 'asset' },
    { label: 'Investments', value: investments, kind: 'asset' },
    { label: 'Property', value: property, kind: 'asset' },
    { label: 'Vehicles', value: vehicles, kind: 'asset' },
    { label: 'Home Loan', value: homeLoan, kind: 'liability' },
    { label: 'Personal Loan', value: personalLoan, kind: 'liability' },
    { label: 'Car Loan', value: carLoan, kind: 'liability' },
    { label: 'Education Loan', value: educationLoan, kind: 'liability' },
    { label: 'Credit Card', value: creditCard, kind: 'liability' },
    { label: 'Other Loans', value: otherLoans, kind: 'liability' },
  ];

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const h3  = { fontSize: 15.5, fontWeight: 600, color: C.ink, margin: '0 0 6px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 600, color: C.ink3, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } as React.CSSProperties;
  const bul = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        {/* H1 */}
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Net Worth Calculator
          </h1>
          <p style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate your net worth by adding all assets and subtracting all liabilities. Track your financial health over time.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="Net Worth Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Your Finances</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      {/* Assets */}
                      <SectionHeader label="Assets" color="#1f7a58" />
                      <Slider label="Cash and Bank Accounts" id="nw-cash" value={cashBank} min={0} max={50000000} step={10000} fmt={fmtC} onChange={setCashBank} compact={mobile} />
                      <Slider label="Investments" id="nw-investments" value={investments} min={0} max={50000000} step={10000} fmt={fmtC} onChange={setInvestments} compact={mobile} />
                      <Slider label="Property Value" id="nw-property" value={property} min={0} max={50000000} step={100000} fmt={fmtC} onChange={setProperty} compact={mobile} />
                      <Slider label="Vehicles and Other Assets" id="nw-vehicles" value={vehicles} min={0} max={10000000} step={10000} fmt={fmtC} onChange={setVehicles} compact={mobile} />
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
                      {/* Liabilities */}
                      <SectionHeader label="Liabilities" color="#C0392B" />
                      <Slider label="Home Loan Outstanding" id="nw-home-loan" value={homeLoan} min={0} max={50000000} step={10000} fmt={fmtC} onChange={setHomeLoan} compact={mobile} />
                      <Slider label="Personal Loan" id="nw-personal-loan" value={personalLoan} min={0} max={10000000} step={10000} fmt={fmtC} onChange={setPersonalLoan} compact={mobile} />
                      <Slider label="Car Loan" id="nw-car-loan" value={carLoan} min={0} max={10000000} step={10000} fmt={fmtC} onChange={setCarLoan} compact={mobile} />
                      <Slider label="Education Loan" id="nw-education-loan" value={educationLoan} min={0} max={10000000} step={10000} fmt={fmtC} onChange={setEducationLoan} compact={mobile} />
                      <Slider label="Credit Card Debt" id="nw-credit-card" value={creditCard} min={0} max={1000000} step={5000} fmt={fmtC} onChange={setCreditCard} compact={mobile} />
                      <Slider label="Other Loans" id="nw-other-loans" value={otherLoans} min={0} max={10000000} step={10000} fmt={fmtC} onChange={setOtherLoans} compact={mobile} />
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

                {/* Result panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column' }}>
                  {/* Net worth result */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '16px' : '20px 24px', marginBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontSize: mobile ? 12 : 13, fontWeight: 500, color: '#7A8087' }}>Net Worth</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: netWorth >= 0 ? C.lime : '#FF6B6B', background: 'rgba(16,18,20,0.05)', borderRadius: 99, padding: '2px 8px' }}>
                        {netWorth >= 0 ? 'Positive' : 'Negative'}
                      </span>
                    </div>
                    <span style={{ fontSize: mobile ? 24 : 30, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                      aria-live="polite" aria-label={`Net worth: ${fmtIN(Math.abs(netWorth))}`}>
                      {netWorth >= 0 ? fmtIN(netWorth) : `-${fmtIN(Math.abs(netWorth))}`}
                    </span>
                  </div>

                  {/* Donut Chart */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 0 : 0, marginBottom: mobile ? 0 : 24, order: mobile ? 1 : -1 }}>
                    <DonutChart assets={totalAssets} liabilities={totalLiabilities} />
                  </div>

                  {/* Breakdown rows */}
                  <div style={{ width: '100%' }}>
                    {[
                      { label: 'Net Worth', value: netWorth >= 0 ? fmtIN(netWorth) : `-${fmtIN(Math.abs(netWorth))}`, color: netWorth >= 0 ? '#1f7a58' : '#C0392B' },
                      { label: 'Total Assets', value: fmtIN(totalAssets), color: C.ink },
                      { label: 'Total Liabilities', value: fmtIN(totalLiabilities), color: C.ink },
                      { label: 'Asset-Liability Ratio', value: totalLiabilities > 0 ? assetLiabilityRatio.toFixed(2) : 'No liabilities', color: C.ink },
                      { label: 'Liquid Net Worth', value: liquidNetWorth >= 0 ? fmtIN(liquidNetWorth) : `-${fmtIN(Math.abs(liquidNetWorth))}`, color: C.ink },
                    ].map(({ label, value, color }) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                        <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                        <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color }}>{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Legend */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 22, marginTop: mobile ? 16 : 0, marginBottom: mobile ? 8 : 28, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Assets</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Liabilities</span>
                    </div>
                  </div>

                  {(() => {
                    const total = totalAssets + totalLiabilities;
                    if (total === 0) return null;
                    const aPct = Math.round((totalAssets / total) * 100);
                    return (
                      <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 11.5, color: C.ink3 }}>Assets {aPct}%</span>
                          <span style={{ fontSize: 11.5, color: C.ink3 }}>Liabilities {100 - aPct}%</span>
                        </div>
                        <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`Assets are ${aPct}% of combined total`}>
                          <div style={{ height: '100%', width: `${aPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Asset & Liability Breakdown */}
              {(totalAssets + totalLiabilities) > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowTable(v => !v)}
                    aria-expanded={showTable} aria-controls="nw-breakdown"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Asset & Liability Breakdown</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>By category</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {categoryRows.filter(r => r.value > 0).length} categories
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showTable && (
                    <div id="nw-breakdown" style={{ borderTop: `1px solid ${C.border}` }}>
                      <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                        <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>Assets</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>Liabilities</span>
                          </div>
                        </div>
                        <CategoryBarChart rows={categoryRows} />
                      </div>
                      <div style={{ overflowX: 'auto', padding: mobile ? '16px' : '24px 44px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 420 }}>
                          <thead style={{ background: '#f4f5f6', borderBottom: `1px solid ${C.border}` }}>
                            <tr>
                              <th style={{ padding: '10px 12px', fontSize: 11.5, fontWeight: 700, color: C.ink, textAlign: 'left' }}>Category</th>
                              <th style={{ padding: '10px 12px', fontSize: 11.5, fontWeight: 700, color: C.ink, textAlign: 'left' }}>Type</th>
                              <th style={{ padding: '10px 12px', fontSize: 11.5, fontWeight: 700, color: C.ink, textAlign: 'right' }}>Amount</th>
                              <th style={{ padding: '10px 12px', fontSize: 11.5, fontWeight: 700, color: C.ink, textAlign: 'right' }}>% of Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {categoryRows.filter(r => r.value > 0).map(row => (
                              <tr key={row.label} style={{ borderBottom: `1px solid ${C.border}` }}>
                                <td style={{ padding: '10px 12px', color: C.ink2 }}>{row.label}</td>
                                <td style={{ padding: '10px 12px', color: row.kind === 'asset' ? '#1f7a58' : '#B45309', fontWeight: 600 }}>{row.kind === 'asset' ? 'Asset' : 'Liability'}</td>
                                <td style={{ padding: '10px 12px', textAlign: 'right', color: C.ink }}>{fmtC(row.value)}</td>
                                <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600, color: C.ink }}>{Math.round((row.value / (row.kind === 'asset' ? totalAssets : totalLiabilities)) * 100)}%</td>
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

              {/* What Is Net Worth */}
              <div style={sec}>
                <h2 style={h2} id="what-is-net-worth">What Is Net Worth?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Net worth is the difference between what you own and what you owe. Net worth = Total Assets minus Total Liabilities. A positive net worth means your assets exceed your debts. A negative net worth means you owe more than you own.
                  </p>
                </div>
                <p style={p}>
                  Net worth is your most comprehensive financial health metric: salary tells you what you earn, net worth tells you what you keep. Two people earning the same income can have vastly different net worths based on their saving, investing, and debt patterns. Tracking quarterly reveals whether your financial decisions are working.
                </p>
              </div>

              {/* Net Worth Formula */}
              <div style={sec}>
                <h2 style={h2} id="net-worth-formula">Net Worth Formula: How to Calculate Your Net Worth</h2>
                <p style={p}>The formula has two parts: everything you own minus everything you owe.</p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 15, fontWeight: 700, color: C.dark }}>
                    Net Worth = Total Assets minus Total Liabilities
                  </code>
                </div>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Component</th><th style={thS} scope="col">What It Includes</th><th style={thS} scope="col">Example</th></tr></thead>
                    <tbody>
                      {[
                        ['Total Assets', 'Cash, investments, property, vehicles, gold', 'Rs 30,00,000'],
                        ['Total Liabilities', 'Home loan, personal loan, car loan, credit cards', 'Rs 8,00,000'],
                        ['Net Worth', 'Assets minus liabilities', 'Rs 22,00,000'],
                      ].map(([c, i, e]) => (
                        <tr key={c as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{c}</td>
                          <td style={tdR}>{i}</td>
                          <td style={{ ...tdR, fontWeight: 700, color: C.ink }}>{e}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  <strong>Worked example:</strong> Rs 30 lakh in assets minus Rs 8 lakh in liabilities equals a net worth of Rs 22 lakh. A person with Rs 50 lakh in assets and Rs 60 lakh in liabilities has a net worth of negative Rs 10 lakh.
                </p>
              </div>

              {/* What to Include */}
              <div style={sec}>
                <h2 style={h2} id="what-to-include">What to Include in Your Net Worth Calculation</h2>
                <h3 style={h3}>Assets</h3>
                <p style={p}>Include bank balances, fixed deposits, stocks, mutual funds, PPF, EPF, NPS, gold, real estate at current market value, and vehicles at resale value. Use today's market prices for your home, not the purchase price.</p>
                <h3 style={h3}>Liabilities</h3>
                <p style={p}>Include home loan outstanding, personal loan, car loan, education loan, credit card balances, and any borrowed money you intend to repay. Exclude monthly bills like utilities or rent that are not cumulative debts.</p>
                <h3 style={h3}>What to exclude</h3>
                <p style={{ ...p, margin: 0 }}>Exclude clothing, electronics, furniture, and household items unless exceptionally valuable. Exclude future income or expected bonuses. Count only what you own today at current realisable value.</p>
              </div>

              {/* Net Worth by Age */}
              <div style={sec}>
                <h2 style={h2} id="net-worth-by-age">Net Worth by Age in India</h2>
                <p style={p}>These age-bracket ranges are planning guides, not official government data. No RBI survey breaks down net worth by individual age band, so benchmarks vary by income level, city, and family background.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Age Group</th><th style={thS} scope="col">Typical Net Worth Range</th><th style={thS} scope="col">Notes</th></tr></thead>
                    <tbody>
                      {[
                        ['25 to 30', 'Rs 1 to 10 lakh', 'Early career, student loans, building emergency fund'],
                        ['30 to 35', 'Rs 5 to 25 lakh', 'Career growth, home down payment, starting investments'],
                        ['35 to 40', 'Rs 15 to 50 lakh', 'Equity compounding begins, home equity builds'],
                        ['40 to 45', 'Rs 30 lakh to 1 crore', 'Peak earning years, portfolio growth accelerates'],
                        ['45 to 50', 'Rs 60 lakh to 2 crore', 'Maximum savings period, debt reduction'],
                        ['50 to 55', 'Rs 1 to 3 crore', 'Pre-retirement accumulation, children education funded'],
                        ['55 to 60', 'Rs 1.5 to 5 crore', 'Peak net worth before retirement drawdown'],
                      ].map(([age, range, note]) => (
                        <tr key={age as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{age}</td>
                          <td style={{ ...tdR, fontWeight: 700, color: C.ink }}>{range}</td>
                          <td style={tdL}>{note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Your target net worth depends on expenses, not age. A useful benchmark: 10 to 15 times annual expenses by retirement age. Track your own progress rather than comparing to averages.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  The <a href="https://rbidocs.rbi.org.in/rdocs/PublicationReport/Pdfs/HFCRA28D0415E2144A009112DD314ECF5C07.PDF" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>RBI Household Finance Committee report (2017)</a> found the average urban Indian household held Rs 27.2 lakh net worth: 64% real estate, 11% gold and jewellery, 17% financial assets, 8% other. Only 23% of households actively save for retirement.
                </p>
              </div>

              {/* How to Improve */}
              <div style={sec}>
                <h2 style={h2} id="improve-net-worth">How to Improve Your Net Worth</h2>
                <div>
                  {[
                    ['Increase savings rate', 'Save at least 20% of income. A 30% savings rate doubles wealth accumulation compared to 15%. Automate transfers to investment accounts on payday.'],
                    ['Reduce high-interest debt', 'Credit card debt at 36-48% and personal loans at 10-24% destroy net worth faster than investments build it. Pay these off first.'],
                    ['Invest in appreciating assets', 'Equity mutual funds, PPF, EPF, NPS, and real estate appreciate over time. Keep cash only for emergencies. Cash loses 4-6% yearly to inflation.'],
                    ['Avoid lifestyle inflation', 'When income grows, increase savings first, not spending. A promotion with new car EMI and larger home loan just increases obligations, not net worth.'],
                    ['Track quarterly', 'Measuring net worth every quarter changes behaviour. People who track consistently save more and spend less because the number becomes visible and real.'],
                  ].map(([title, text], i) => (
                    <div key={i} style={{ ...bul, marginBottom: 14, gap: 0, flexDirection: 'column' as const }}>
                      <strong style={{ fontSize: 15, color: C.ink, marginBottom: 4 }}>{title}</strong>
                      <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Liquid vs Total Net Worth */}
              <div style={sec}>
                <h2 style={h2} id="liquid-vs-total-net-worth">Liquid Net Worth vs Total Net Worth</h2>
                <p style={p}>Total net worth includes your home, car, EPF, and gold. Liquid net worth includes only assets convertible to cash within 30 days: savings, matured FDs, stocks, and mutual funds. Track both to understand your overall wealth and emergency flexibility.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Metric</th><th style={thS} scope="col">Includes</th><th style={thS} scope="col">Best For</th></tr></thead>
                    <tbody>
                      {[
                        ['Total Net Worth', 'All assets minus all liabilities', 'Overall financial health, long-term wealth tracking'],
                        ['Liquid Net Worth', 'Cash, FDs, stocks, mutual funds minus short-term debt', 'Emergency preparedness, financial flexibility'],
                      ].map(([m, i, b]) => (
                        <tr key={m as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{m}</td>
                          <td style={tdR}>{i}</td>
                          <td style={tdL}>{b}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  Example: Rs 1 crore home with Rs 90 lakh loan = Rs 10 lakh net worth but cash-poor. Rs 20 lakh in mutual funds with no debt = Rs 20 lakh net worth but much more flexibility. Track both.
                </p>
              </div>

              {/* Tracking Frequency */}
              <div style={sec}>
                <h2 style={h2} id="net-worth-tracking">How Often Should You Track Your Net Worth?</h2>
                <p style={p}>Quarterly is ideal for most people. Monthly works if actively reducing debt. Annual is the minimum. Check on the same day each quarter using consistent market values for investments. Skip daily tracking: market noise obscures real trends.</p>
              </div>

              {/* NRI net worth tracking */}
              <div style={sec}>
                <h2 style={h2} id="nri-net-worth-tracking">Net Worth Tracking for NRIs</h2>
                <p style={p}>
                  NRIs face currency complications: assets in INR and foreign currency, where exchange rate movement shifts net worth even when nothing else changed.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Pick one reporting currency you think in daily. Convert every Indian asset and liability quarterly using a consistent exchange rate snapshot, not daily rates. Include NRE/NRO balances, Indian property, PPF/NPS, and Indian home loans the same way a resident would.
                </p>
              </div>

              {/* Limitations */}
              <div style={sec}>
                <h2 style={h2} id="net-worth-limitations">Limitations of Net Worth as a Financial Metric</h2>
                <div>
                  {[
                    ['Does not measure cash flow', 'High net worth does not mean cash available. Rs 2 crore in EPF and Rs 1.5 crore in home value cannot pay today bills. Net worth is not liquidity.'],
                    ['Ignores human capital', 'Earning potential over your career is often your biggest asset but does not appear in net worth. A young doctor with student debt may have negative net worth but enormous earning power.'],
                    ['Values change constantly', 'Real estate and stock values fluctuate daily. Your net worth this morning differs from tonight. It is a directional indicator, not a precise number.'],
                    ['Incomplete financial picture', 'Net worth does not show insurance adequacy, emergency funds, or asset allocation. It is one number in a complete financial planning framework.'],
                  ].map(([title, text], i) => (
                    <div key={i} style={{ ...bul, marginBottom: 14, gap: 0, flexDirection: 'column' as const }}>
                      <strong style={{ fontSize: 15, color: C.ink, marginBottom: 4 }}>{title}</strong>
                      <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* How to Use */}
              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This Net Worth Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter assets:</strong> cash, investments, property, and vehicles at current market values.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter liabilities:</strong> all loans and debts with outstanding balances (not EMI amounts).
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Review results:</strong> net worth, total assets, total liabilities, ratios, and liquid net worth.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Track quarterly:</strong> values save locally. Return next quarter to see wealth progress.
                  </li>
                </ol>
                <p style={{ ...p, margin: 0 }}>
                  Click values to type precisely. Currency selector switches between INR, USD, EUR, GBP for NRI users. All inputs save in your browser for next visit.
                </p>
              </div>


              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ faqs={faqs} />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only. Net worth is a snapshot based on the values you enter. Market values of assets fluctuate. This calculator is for educational and planning purposes and does not constitute financial advice. Consult a SEBI-registered investment adviser for personalised financial planning.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.net-worth-sidebar::-webkit-scrollbar{width:5px}.net-worth-sidebar::-webkit-scrollbar-track{background:transparent}.net-worth-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.net-worth-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="net-worth-sidebar" aria-label="Related calculators" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
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

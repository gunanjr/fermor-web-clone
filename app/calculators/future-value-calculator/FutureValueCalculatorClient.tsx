'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useEffect, useMemo, useLayoutEffect } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { FAQBox } from '@/components/common/FAQBox';

const C = {
  dark: '#101214', lime: '#a6dbc4', lime2: '#2d9970', paleLime: '#f4f5f6',
  ink: '#16140F', ink2: '#50565c', ink3: '#7a8087', white: '#ffffff',
  bg: '#f6f7f8', border: '#e3e6e8',
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
    <div style={{ marginBottom: compact ? 18 : 30 }}>
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

/* ─── Compounding toggle ─────────────────────────────────────── */
const COMPOUNDING_OPTIONS: { id: number; label: string }[] = [
  { id: 1, label: 'Yearly' },
  { id: 2, label: 'Half-Yearly' },
  { id: 4, label: 'Quarterly' },
  { id: 12, label: 'Monthly' },
];

function CompoundingToggle({ value, onChange, compact }: { value: number; onChange: (v: number) => void; compact?: boolean }) {
  return (
    <div style={{ marginBottom: compact ? 18 : 30 }}>
      <label style={{ fontSize: compact ? 13.5 : 14, color: C.ink2, fontWeight: 400, display: 'block', marginBottom: 10 }}>
        Compounding on lumpsum
      </label>
      <div role="group" aria-label="Compounding frequency" style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
        {COMPOUNDING_OPTIONS.map(opt => {
          const active = value === opt.id;
          return (
            <button key={opt.id} type="button" onClick={() => onChange(opt.id)} aria-pressed={active}
              style={{
                flex: 1, padding: compact ? '8px 4px' : '9px 6px', border: 'none', cursor: 'pointer',
                fontSize: compact ? 11.5 : 12.5, fontFamily: INTER,
                background: active ? C.white : 'transparent',
                color: active ? C.ink : C.ink3,
                fontWeight: active ? 600 : 400,
                borderRight: opt.id !== 12 ? `1px solid ${C.border}` : 'none',
              }}>
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Donut chart ─────────────────────────────────────────────── */
function DonutChart({ invested, returns }: { invested: number; returns: number }) {
  const total = invested + returns;
  if (total <= 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const pArc = (invested / total) * circ;
  const pPct = Math.round((invested / total) * 100);
  return (
    <svg width="216" height="216" viewBox="0 0 216 216" role="img" aria-label={`Investment ${pPct}% of future value, returns ${100 - pPct}%`} style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Invested</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
  );
}

/* ─── Year-by-year growth schedule ────────────────────────────── */
type GrowthRow = { year: number; invested: number; returns: number; fv: number };

function buildGrowthSchedule(lumpsum: number, monthly: number, rate: number, years: number, compounding: number): GrowthRow[] {
  if (years <= 0) return [];
  const startYear = new Date().getFullYear();
  const monthlyRate = rate > 0 ? Math.pow(1 + rate / 100, 1 / 12) - 1 : 0;
  return Array.from({ length: Math.min(years, 40) }, (_, i) => {
    const t = i + 1;
    const months = t * 12;
    const fvL = rate === 0 ? lumpsum : lumpsum * Math.pow(1 + rate / (100 * compounding), compounding * t);
    const fvS = rate === 0 ? monthly * months : monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const fv = fvL + fvS;
    const invested = lumpsum + monthly * months;
    return { year: startYear + t, invested, returns: fv - invested, fv };
  });
}

function BarChart({ rows }: { rows: GrowthRow[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxVal = Math.max(...rows.map(r => r.fv));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;
  return (
    <svg role="img" aria-label="Invested amount versus returns by year" viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {rows.map((row, i) => {
        const totalH = maxVal > 0 ? (row.fv / maxVal) * H : 0;
        const investedH = row.fv > 0 ? (row.invested / row.fv) * totalH : 0;
        const returnsH = totalH - investedH;
        const x = PADL + i * slot + gap;
        return (
          <g key={row.year}>
            <rect x={x} y={H - totalH} width={barW} height={returnsH} fill={CHART_PAIR.secondary} rx={2} />
            <rect x={x} y={H - investedH} width={barW} height={investedH} fill={CHART_PAIR.primary} rx={2} />
            {rows.length <= 30 && (
              <text x={x + barW / 2} y={H + 14} textAnchor="middle" style={{ fontSize: rows.length > 20 ? 7 : 9, fill: C.ink3, fontFamily: INTER }}>{row.year}</text>
            )}
          </g>
        );
      })}
      <line x1={PADL} y1={H} x2={W} y2={H} stroke={C.border} strokeWidth={1} />
    </svg>
  );
}

/* ─── CA CTA ─────────────────────────────────────────────────── */

/* ─── Waitlist card ──────────────────────────────────────────── */
function WaitlistCard({ mobile }: { mobile: boolean }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    try {
      if (!localStorage.getItem('fermor-waitlist-joined')) setHidden(false);
    } catch { setHidden(false); }
  }, []);

  if (hidden) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'future-value-calculator' }),
      });
      if (res.ok) {
        setStatus('done');
        try { localStorage.setItem('fermor-waitlist-joined', '1'); } catch { /* ignore */ }
      } else { setStatus('error'); }
    } catch { setStatus('error'); }
  };

  if (status === 'done') {
    return (
      <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: mobile ? '18px' : '20px 24px', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 12 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1f7a58" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12" /></svg>
        <p style={{ color: C.ink, fontWeight: 600, fontSize: 14, margin: 0 }}>Done. Check your email to complete sign up.</p>
      </div>
    );
  }

  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: mobile ? '18px' : '20px 24px', marginBottom: 40 }}>
      <p style={{ color: C.ink, fontWeight: 600, fontSize: 14, margin: '0 0 4px' }}>Save your results</p>
      <p style={{ color: C.ink3, fontSize: 13, margin: '0 0 14px', lineHeight: 1.6 }}>
        Sign up to save this calculation and access your results any time.
      </p>
      <form onSubmit={submit} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required
          aria-label="Email address"
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

/* ─── Sidebar ────────────────────────────────────────────────── */
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
  { href: '/calculators/sip-calculator', label: 'SIP Calculator' },
  { href: '/calculators/lumpsum-calculator', label: 'Lumpsum Calculator' },
  { href: '/calculators/present-value-calculator', label: 'Present Value Calculator' },
  { href: '/calculators/goal-planning-calculator', label: 'Goal Planning Calculator' },
  { href: '/calculators/cagr-calculator', label: 'CAGR Calculator' },
  { href: '/calculators/npv-calculator', label: 'NPV Calculator' },
  { href: '/calculators/retirement-calculator', label: 'Retirement Calculator' },
  { href: '/calculators/wealth-growth-calculator', label: 'Wealth Growth Calculator' },
];
const MORE = [
  { href: '/calculators/compound-interest-calculator', label: 'Compound Interest Calculator' },
  { href: '/calculators/fd-calculator', label: 'FD Calculator' },
  { href: '/calculators/ppf-calculator', label: 'PPF Calculator' },
  { href: '/calculators/real-return-calculator', label: 'Real Return Calculator' },
  { href: '/calculators/emi-calculator', label: 'EMI Calculator' },
  { href: '/calculators/gratuity-calculator', label: 'Gratuity Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
const FAQS = [
  { q: 'What is future value?', a: 'Future value (FV) is what a sum of money invested today, or invested regularly, will grow to by a specific future date at an assumed rate of return. It is the core calculation behind every long-term investment plan, from an SIP to a retirement corpus.' },
  { q: 'What is the future value formula?', a: 'For a lumpsum: FV = PV × (1 + r/m)^(m×n), where PV is the initial amount, r is the annual rate, m is the compounding frequency, and n is the number of years. For an SIP: FV = P × [((1 + i)^t − 1) / i] × (1 + i), where P is the monthly amount, i is the monthly rate, and t is the number of months.' },
  { q: 'What is an FV calculator used for?', a: 'An FV calculator, sometimes searched as an "fv calculator" or "future value calculator online", projects what a lumpsum, an SIP, or a combination of both will be worth at a future date. It removes the need to work out compound interest by hand across dozens of years.' },
  { q: 'How do I calculate the future value of an SIP?', a: 'Enter the monthly SIP amount, the expected annual return, and the investment tenure in this calculator, leaving the lumpsum field at zero. The SIP future value formula compounds each monthly instalment separately from the date it is invested, since each contribution has a different amount of time left to grow.' },
  { q: 'How do I calculate the future value of a lumpsum mutual fund investment?', a: 'Enter the one-time amount in the Lumpsum Investment field and leave the Monthly Addition field at zero. The calculator applies FV = PV × (1 + r/m)^(m×n) using the compounding frequency you select, giving the projected value of a single mutual fund or FD investment.' },
  { q: 'What return rate should I assume for equity mutual funds?', a: 'A commonly used long-term planning range for diversified equity mutual funds is 10 to 12 percent per year, based on historical category averages published by AMFI. Actual returns vary by fund and by market cycle, and past performance is not a guarantee of future returns.' },
  { q: 'What return rate should I use for debt funds or fixed deposits?', a: 'Debt funds and bank fixed deposits typically fall in the 6 to 8 percent range, closer to prevailing interest rates than to equity-style growth. A balanced or hybrid portfolio, mixing equity and debt, is often modelled at 8 to 10 percent.' },
  { q: 'Does compounding frequency change the future value?', a: 'Yes. More frequent compounding, such as monthly instead of yearly, produces a slightly higher future value for the same nominal annual rate, because interest is added back into the principal more often. This calculator lets you switch the lumpsum compounding between yearly, half-yearly, quarterly, and monthly.' },
  { q: 'Is future value the same as maturity value?', a: 'They describe the same idea in different contexts. "Maturity value" is usually the term used by a bank FD or insurance policy for the amount paid out at the end of the term, while "future value" is the general financial term for the same projected number.' },
  { q: 'How is future value different from present value?', a: 'Future value compounds an amount of money forward in time to see what it will grow to. Present value works in the opposite direction: it discounts a future amount backward to see what it is worth today. The Present Value Calculator handles that reverse calculation.' },
  { q: 'Can I use this as a future value calculator for retirement?', a: 'Yes, by entering your current retirement savings as the lumpsum, your monthly SIP or NPS contribution as the monthly addition, and your years left to retirement as the time period. For working backward from a target retirement corpus to the required monthly investment, the Goal Planning Calculator or Retirement Calculator is a better fit.' },
  { q: 'What is the future value of Rs 5,000 invested monthly for 20 years at 12 percent?', a: 'At a 12 percent annual return compounded monthly, an SIP of Rs 5,000 a month for 20 years (240 instalments) grows to approximately Rs 45.99 lakh, against a total investment of Rs 12 lakh. The remaining roughly Rs 33.99 lakh comes purely from compounding.' },
  { q: 'Why is the future value of an SIP different from a lumpsum of the same total amount?', a: 'A lumpsum starts compounding on the full amount from day one, while an SIP invests smaller amounts every month, each of which has less time left to grow. Over the same period and rate, a lumpsum almost always produces a higher future value than an SIP that adds up to the same total invested amount, purely because more of the lumpsum money has been compounding for longer.' },
  { q: 'Does inflation reduce the future value shown by this calculator?', a: 'No, the future value shown here is in nominal rupees, not adjusted for inflation. To see what that future amount is worth in today\'s purchasing power, use the Real Return Calculator to convert the nominal return into an inflation-adjusted real return first.' },
  { q: 'What is the difference between future value and compound interest?', a: 'Compound interest is the mechanism, interest calculated on both the principal and previously earned interest. Future value is the outcome, the total amount an investment grows to once compound interest has been applied over the full period.' },
  { q: 'Can this calculator handle a lumpsum and an SIP together?', a: 'Yes. Enter both a lumpsum amount and a monthly addition, and the calculator projects each separately, using the compounding frequency you select for the lumpsum and monthly compounding for the SIP, then adds the two figures together for the total future value.' },
  { q: 'Why does my bank RD or FD show a slightly different maturity value than this calculator?', a: 'Banks typically compound fixed and recurring deposits quarterly, and some apply day-count conventions that differ slightly from a clean monthly or yearly model. Selecting quarterly compounding in this calculator gets closest to how most Indian bank FDs actually compound.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform built for India. All calculators are free to use, with a free account available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

export default function FutureValueCalculatorClient() {
  const [mobile, setMobile] = useState(false);
  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const defaultSettings = { lumpsum: 100000, monthly: 5000, rate: 12, years: 10, compounding: 1 };
  const { settings, updateSettings } = useCalculatorSettings('future-value-calculator', defaultSettings);
  const { lumpsum, monthly, rate, years, compounding } = settings;
  const setLumpsum = (v: any) => updateSettings({ lumpsum: typeof v === 'function' ? v(settings.lumpsum) : v });
  const setMonthly = (v: any) => updateSettings({ monthly: typeof v === 'function' ? v(settings.monthly) : v });
  const setRate = (v: any) => updateSettings({ rate: typeof v === 'function' ? v(settings.rate) : v });
  const setYears = (v: any) => updateSettings({ years: typeof v === 'function' ? v(settings.years) : v });
  const setCompounding = (v: number) => updateSettings({ compounding: v });

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  const months = years * 12;
  const monthlyRate = rate > 0 ? Math.pow(1 + rate / 100, 1 / 12) - 1 : 0;

  const fvLumpsum = useMemo(() => {
    if (rate === 0) return lumpsum;
    return lumpsum * Math.pow(1 + rate / (100 * compounding), compounding * years);
  }, [lumpsum, rate, years, compounding]);

  const fvSIP = useMemo(() => {
    if (months === 0) return 0;
    if (rate === 0) return monthly * months;
    return monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  }, [monthly, monthlyRate, months]);

  const totalFV = fvLumpsum + fvSIP;
  const totalInvested = lumpsum + monthly * months;
  const totalReturns = totalFV - totalInvested;
  const growthMultiple = totalInvested > 0 ? totalFV / totalInvested : 0;

  const [showTable, setShowTable] = useState(false);
  const growthSchedule = useMemo(() => buildGrowthSchedule(lumpsum, monthly, rate, years, compounding), [lumpsum, monthly, rate, years, compounding]);

  const h2 = { fontSize: mobile ? 18 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const p = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 40px' } as React.CSSProperties;
  const bullet = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 } as React.CSSProperties;
  const thS = { padding: '10px 16px', fontSize: 13, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const };
  const tdL = { padding: '11px 16px', fontSize: 14, color: C.ink2, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
  const tdR = { padding: '11px 16px', fontSize: 14, color: C.ink, fontWeight: 500, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Future Value Calculator
          </h1>
          <p style={{ fontSize: 14.5, color: C.ink3, margin: 0 }}>
            Project the future value of a lumpsum, an SIP, or both together, with your choice of compounding frequency
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>
            <section aria-label="Future Value Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                <div style={{ padding: mobile ? '16px 18px' : '44px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Investment Details</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>
                  <Slider label="Lumpsum Investment" id="fv-lumpsum" value={lumpsum} min={0} max={10000000} step={1000} fmt={v => fmtC(v)} onChange={setLumpsum} compact={mobile} />
                  <Slider label="Monthly Addition (SIP)" id="fv-monthly" value={monthly} min={0} max={500000} step={100} fmt={v => fmtC(v)} onChange={setMonthly} compact={mobile} />
                  <Slider label="Expected Return (p.a.)" id="fv-rate" value={rate} min={1} max={30} step={0.25} fmt={v => `${v.toFixed(2)}%`} onChange={setRate} compact={mobile} />
                  <Slider label="Time Period" id="fv-years" value={years} min={1} max={40} step={1} fmt={v => `${v} Yr`} onChange={setYears} compact={mobile} />
                  <CompoundingToggle value={compounding} onChange={setCompounding} compact={mobile} />
                </div>
                <div style={{ padding: mobile ? '16px 18px' : '44px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 12, padding: mobile ? '12px 16px' : '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.dark }}>Future Value</span>
                    <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: C.dark, letterSpacing: '-0.02em' }}>{fmtIN(totalFV)}</span>
                  </div>
                  {[
                    { label: 'Total invested', value: fmtC(totalInvested) },
                    { label: 'Total returns', value: fmtC(totalReturns) },
                    { label: 'Lumpsum grows to', value: fmtC(fvLumpsum) },
                    { label: 'SIP grows to', value: fmtC(fvSIP) },
                    { label: 'Growth multiple', value: `${growthMultiple.toFixed(2)}x` },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 20, order: mobile ? 1 : -1 }}>
                    <DonutChart invested={totalInvested} returns={totalReturns} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 22, marginBottom: mobile ? 8 : 24, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Investment</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Returns</span>
                    </div>
                  </div>
                </div>
              </div>

              {growthSchedule.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowTable(v => !v)}
                    aria-expanded={showTable} aria-controls="fv-growth-table"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '20px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.ink }}>Year-by-Year Growth Schedule</span>
                      {!mobile && <span style={{ fontSize: 13, color: C.ink3, marginLeft: 10 }}>How invested amount and returns build up over the tenure</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 8 : 12, flexShrink: 0 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: C.dark, background: C.paleLime, border: `1px solid ${C.lime2}`, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {years} Yr &middot; {rate.toFixed(2)}%
                      </span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>
                  {showTable && (
                    <div id="fv-growth-table" style={{ borderTop: `1px solid ${C.border}` }}>
                      <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                        <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>Invested</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>Returns</span>
                          </div>
                        </div>
                        <BarChart rows={growthSchedule} />
                      </div>
                      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
                        <table style={{ minWidth: 480, width: '100%', borderCollapse: 'collapse', fontSize: 13, marginTop: 16 }}>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              {['Year', 'Total Invested', 'Total Returns', 'Future Value'].map(h => (
                                <th key={h} style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }} scope="col">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {growthSchedule.map((row, i) => (
                              <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ padding: '13px 24px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                                <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.invested)}</td>
                                <td style={{ padding: '13px 24px', color: '#1f7a58', fontWeight: 600 }}>{fmtIN(row.returns)}</td>
                                <td style={{ padding: '13px 24px', color: C.ink, fontWeight: 700 }}>{fmtIN(row.fv)}</td>
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

            <article style={{ fontFamily: INTER }}>
              <div style={sec}>
                <h2 style={h2} id="what-is-future-value">What is future value?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Future value (FV) is what a sum of money invested today, or invested regularly over time, will be worth at a specified future date, once compound growth is applied.
                  </p>
                </div>
                <p style={p}>
                  It is the forward-looking half of the time value of money: a rupee invested today is worth more than a rupee received in the future, because that rupee can earn a return in the meantime.
                </p>
                <p style={p}>
                  This calculator handles the two most common Indian investing patterns. Enter a one-time lumpsum, a monthly SIP amount, or both together, and it projects each separately before adding them into a single total.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="fv-formula">The future value formula</h2>
                <p style={p}>
                  This calculator applies two related formulas, one for a lumpsum and one for a series of monthly contributions.
                </p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark, display: 'block', marginBottom: 8 }}>
                    FV (lumpsum) = PV &times; (1 + r/m) ^ (m &times; n)
                  </code>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark, display: 'block' }}>
                    FV (SIP) = P &times; [((1 + i)^t &minus; 1) / i] &times; (1 + i)
                  </code>
                </div>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={{ ...thS, width: 80 }} scope="col">Variable</th><th style={thS} scope="col">Meaning</th></tr></thead>
                    <tbody>
                      {[
                        ['PV', 'Present value: the one-time lumpsum invested today'],
                        ['r', 'Annual expected return, entered as a percentage'],
                        ['m', 'Compounding frequency per year (1, 2, 4, or 12)'],
                        ['n', 'Number of years the lumpsum stays invested'],
                        ['P', 'The fixed monthly SIP contribution'],
                        ['i', 'The equivalent monthly rate, derived from the annual rate'],
                        ['t', 'Number of months the SIP runs'],
                      ].map(([v, m]) => (
                        <tr key={v}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink, fontFamily: 'monospace' }}>{v}</td>
                          <td style={tdR}>{m}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The total future value shown by the calculator is simply the sum of both results, useful when you plan to invest a lumpsum and add a monthly SIP at the same time.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="fv-worked-example">Worked example: how return rate changes the outcome</h2>
                <p style={p}>
                  Take an SIP of Rs 10,000 a month for 15 years. The assumed annual return changes the final corpus by lakhs of rupees, even though the monthly contribution never changes.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Assumed Return</th><th style={thS} scope="col">Future Value After 15 Years</th></tr></thead>
                    <tbody>
                      {[
                        ['8% p.a.', 'Rs 33.98 lakh'],
                        ['10% p.a.', 'Rs 40.16 lakh'],
                        ['12% p.a.', 'Rs 47.59 lakh'],
                        ['14% p.a.', 'Rs 56.52 lakh'],
                      ].map(([r, v]) => (
                        <tr key={r} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r}</td>
                          <td style={tdR}>{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Total invested across all four scenarios is the same Rs 18 lakh (Rs 10,000 for 180 months). The gap between Rs 33.98 lakh and Rs 56.52 lakh comes entirely from the assumed rate, which is why a realistic return assumption matters more than most people expect.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="lumpsum-vs-sip">Lumpsum versus SIP: which grows faster</h2>
                <p style={p}>
                  A lumpsum invested today almost always produces a higher future value than an SIP that adds up to the same total invested amount, because the full sum starts compounding immediately.
                </p>
                <p style={p}>
                  A Rs 5 lakh lumpsum at 12 percent for 20 years grows to roughly Rs 48.23 lakh. An SIP of about Rs 2,083 a month at the same rate over the same 20 years, which also totals Rs 5 lakh invested, grows to only about Rs 19.16 lakh, since most of that money is contributed much later in the tenure.
                </p>
                <p style={p}>
                  This does not make an SIP a worse choice. Most people do not have a large lumpsum sitting idle, and an SIP is what turns monthly income into long-term wealth in a disciplined way.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="fv-compounding-frequency">How compounding frequency changes the future value</h2>
                <p style={p}>
                  More frequent compounding produces a marginally higher future value for the same nominal annual rate, since returns are added back into the principal more often.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Compounding</th><th style={thS} scope="col">Rs 1 Lakh at 10% for 10 Years</th></tr></thead>
                    <tbody>
                      {[
                        ['Yearly', 'Rs 2,59,374'],
                        ['Half-Yearly', 'Rs 2,65,330'],
                        ['Quarterly', 'Rs 2,68,506'],
                        ['Monthly', 'Rs 2,70,704'],
                      ].map(([f, v]) => (
                        <tr key={f} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{f}</td>
                          <td style={tdR}>{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The gap widens with a larger sum and a longer tenure. A Rs 10 lakh lumpsum at 12 percent for 20 years reaches about Rs 96.46 lakh with yearly compounding, but about Rs 1.09 crore with monthly compounding, a difference of over Rs 12.4 lakh from compounding frequency alone.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="fv-choosing-return-rate">Choosing a realistic return rate</h2>
                <p style={p}>
                  The return rate you assume should match the type of product the money is actually invested in, not an optimistic round number.
                </p>
                <p style={p}>
                  Diversified equity mutual funds are commonly modelled at 10 to 12 percent per year over the long term, based on historical category averages tracked by <a href="https://www.amfiindia.com" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>AMFI</a>. Debt funds and bank fixed deposits sit closer to 6 to 8 percent, and a balanced portfolio of both is often modelled at 8 to 10 percent.
                </p>
                <p style={p}>
                  For a risk-free, government-backed reference point, the <a href="https://www.nsiindia.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>current PPF rate</a> of 7.1 percent per annum has been unchanged since April 2020. Overestimating the return assumption is one of the most common ways a future value projection ends up misleading a real financial plan.
                </p>
              </div>

              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Present Value Calculator</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Going the other direction? Discount a future amount back to what it is worth today.</p>
                </div>
                <Link className="fx-btn" href="/calculators/present-value-calculator" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
              </div>

              <div style={sec}>
                <h2 style={h2} id="fv-in-indian-planning">Future value in Indian retirement and savings planning</h2>
                <p style={p}>
                  Future value calculations sit behind nearly every long-term Indian savings product, not just mutual funds.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <p style={p}>
                    <strong style={{ color: C.ink }}>Employee Provident Fund (EPF).</strong> The <a href="https://www.epfindia.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>EPFO</a> credits interest annually on the combined employee and employer contribution, compounding a salaried employee's retirement balance over an entire working career.
                  </p>
                  <p style={p}>
                    <strong style={{ color: C.ink }}>Public Provident Fund (PPF).</strong> A 15-year, government-backed instrument that compounds annually, commonly used as a low-risk anchor within a retirement future value projection alongside higher-return equity SIPs.
                  </p>
                  <p style={p}>
                    <strong style={{ color: C.ink }}>National Pension System (NPS).</strong> A market-linked retirement account where the equity, corporate debt, and government bond allocation each carry a different expected return, meaning a single blended future value assumption is only an approximation of what NPS will actually deliver.
                  </p>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to use this calculator</h2>
                <p style={p}>This calculator takes four inputs, plus one optional setting:</p>
                <div>
                  {[
                    { label: 'Lumpsum Investment', text: 'A one-time amount invested today. Leave this at zero for an SIP-only projection.' },
                    { label: 'Monthly Addition (SIP)', text: 'A fixed amount invested every month for the full tenure. Leave this at zero for a lumpsum-only projection.' },
                    { label: 'Expected Return', text: 'The annual growth rate assumed for the investment, matched to the type of product it is actually held in.' },
                    { label: 'Time Period', text: 'The number of years the money stays invested.' },
                    { label: 'Compounding', text: 'How often the lumpsum compounds each year. The SIP portion always compounds monthly, since that is how each instalment is contributed.' },
                  ].map((it, i) => (
                    <div key={i} style={bullet}>
                      <span style={{ flexShrink: 0, marginTop: 3 }}>&#8226;</span>
                      <span><strong>{it.label}:</strong> {it.text}</span>
                    </div>
                  ))}
                </div>
                <p style={{ ...p, margin: '12px 0 0' }}>
                  The future value, donut chart, and year-by-year growth schedule update instantly as any input changes.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="fv-limitations">Limitations of this calculator</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <p style={p}>
                    <strong style={{ color: C.ink }}>It assumes a constant rate of return.</strong> Real markets move up and down year to year. A single flat rate applied across the full tenure smooths out that volatility and cannot capture a bad sequence of early years.
                  </p>
                  <p style={p}>
                    <strong style={{ color: C.ink }}>It does not account for step-up contributions.</strong> Many investors increase their SIP amount every year as income grows. For that scenario, the Step-Up SIP Calculator gives a more accurate projection.
                  </p>
                  <p style={p}>
                    <strong style={{ color: C.ink }}>It shows nominal value, not inflation-adjusted value.</strong> The rupee figure shown is what the account balance will read on paper, not what that money will actually buy at a future date. Use the Real Return Calculator to convert the assumed return into an inflation-adjusted figure first.
                  </p>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="fv-common-mistakes">Common mistakes when projecting future value</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <p style={p}>
                    <strong style={{ color: C.ink }}>Using the same return rate for equity and debt.</strong> Blending a 12 percent equity assumption with a 12 percent debt allocation overstates the debt portion's realistic growth by several percentage points.
                  </p>
                  <p style={p}>
                    <strong style={{ color: C.ink }}>Ignoring taxes on withdrawal.</strong> The future value shown is pre-tax. Equity mutual fund gains, FD interest, and debt fund gains are each taxed differently, so the amount actually available to spend is lower than the projected figure.
                  </p>
                  <p style={p}>
                    <strong style={{ color: C.ink }}>Forgetting to increase the SIP amount over time.</strong> Keeping a fixed monthly SIP for 20 or 30 years while ignoring salary growth understates what is realistically achievable. A step-up approach usually reaches a target corpus faster with a smaller starting SIP.
                  </p>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="fv-vs-pv">Future value versus present value</h2>
                <p style={p}>
                  Future value and present value are the same relationship viewed from opposite ends of the timeline.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={{ ...thS, width: '30%' }} scope="col"></th><th style={thS} scope="col">Future Value</th><th style={thS} scope="col">Present Value</th></tr></thead>
                    <tbody>
                      {[
                        ['Question answered', "What will today's amount grow to?", 'What is a future amount worth today?'],
                        ['Direction', 'Compounds forward from today', 'Discounts backward from a future date'],
                        ['Typical use', "Projecting an investment's growth", 'Pricing a future payout or settlement'],
                      ].map((row, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{row[0]}</td>
                          <td style={tdL}>{row[1]}</td>
                          <td style={tdL}>{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Use the <Link href="/calculators/present-value-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Present Value Calculator</Link> to work backward from a future amount, or the <Link href="/calculators/npv-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>NPV Calculator</Link> when there are multiple cash flows across different years to evaluate.
                </p>
              </div>


              <div style={sec}>
                <h2 style={h2} id="faq">Frequently asked questions</h2>
                <FAQ />
              </div>
            </article>
          </div>

          <style>{`.future-val-sidebar::-webkit-scrollbar{width:5px}.future-val-sidebar::-webkit-scrollbar-track{background:transparent}.future-val-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.future-val-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="future-val-sidebar" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <SidebarList title="Popular Calculators" items={POPULAR} />
              <SidebarList title="More Calculators" items={MORE} />
            </div>
          </aside>
        </div>
      </div>
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/percentage-calculator|%', '/calculators/gst-calculator|GST', '/calculators/loan-calculator|Loan', '/calculators/sip-calculator|SIP', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/swp-calculator|SWP', '/calculators/emi-calculator|EMI', '/calculators/home-loan-calculator|Home Loan', '/calculators/mortgage-calculator|Mortgage', '/calculators/car-loan-calculator|Car Loan', '/calculators/fd-calculator|FD', '/calculators/compound-interest-calculator|Compound Int.', '/calculators/gratuity-calculator|Gratuity', '/calculators/goal-planning-calculator|Goal Planning', '/calculators/future-value-calculator|Future Value', '/calculators/present-value-calculator|Present Value'] },
        { hd: 'Topics', links: ['/#|Mutual Funds', '/#|Home Loans', '/#|Fixed Deposits', '/#|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

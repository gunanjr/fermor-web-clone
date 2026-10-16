'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
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

/* ─── Math ──────────────────────────────────────────────────── */
function calcRD(monthlyDeposit: number, rate: number, months: number) {
  if (months === 0 || monthlyDeposit === 0) return { invested: 0, maturity: 0, interest: 0 };
  const r = rate / 100;
  let maturity = 0;
  for (let i = 1; i <= months; i++) {
    const tenureMonths = months - i + 1;
    const tenureYears = tenureMonths / 12;
    maturity += monthlyDeposit * Math.pow(1 + r / 4, 4 * tenureYears);
  }
  const invested = monthlyDeposit * months;
  const interest = maturity - invested;
  return { invested, maturity, interest };
}

/* ─── Growth table data ─────────────────────────────────────── */
function calcGrowthTable(monthlyDeposit: number, rate: number, months: number) {
  const rows: { year: number; invested: number; maturity: number; interest: number }[] = [];
  const r = rate / 100;
  for (let y = 1; y <= Math.ceil(months / 12); y++) {
    const totalMonths = Math.min(y * 12, months);
    let totalMaturity = 0;
    for (let i = 1; i <= totalMonths; i++) {
      const tenureMonths = totalMonths - i + 1;
      const tenureYears = tenureMonths / 12;
      totalMaturity += monthlyDeposit * Math.pow(1 + r / 4, 4 * tenureYears);
    }
    const totalInvested = monthlyDeposit * totalMonths;
    rows.push({ year: y, invested: totalInvested, maturity: totalMaturity, interest: totalMaturity - totalInvested });
  }
  return rows;
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
  const presets = [1, 2, 3, 5, 8, 10];
  return (
    <div role="group" aria-label="Duration presets" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: -22, marginBottom: 20 }}>
      {presets.map(y => {
        const active = current === y;
        return (
          <button key={y} onClick={() => onChange(y)} aria-pressed={active} aria-label={`Set duration to ${y} year${y > 1 ? 's' : ''}`}
            style={{ fontSize: 11.5, fontWeight: active ? 700 : 500, color: active ? C.white : C.ink3, background: active ? C.dark : 'transparent', border: `1px solid ${active ? C.dark : C.border}`, borderRadius: 99, padding: '3px 9px', cursor: 'pointer', fontFamily: INTER, transition: 'all 0.12s' }}>
            {y}Y
          </button>
        );
      })}
    </div>
  );
}

/* ─── Donut ──────────────────────────────────────────────────── */
function DonutChart({ principal, gains, principalPct }: { principal: number; gains: number; principalPct: number }) {
  const total = principal + Math.abs(gains);
  if (total === 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const pArc = (principal / total) * circ;
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Principal ${principalPct}% of final value, returns ${100 - principalPct}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Principal</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{principalPct}%</text>
    </svg>
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
  { href: '/calculators/fd-calculator',          label: 'FD Calculator' },
  { href: '/calculators/sip-calculator',         label: 'SIP Calculator' },
  { href: '/calculators/ppf-calculator',         label: 'PPF Calculator' },
  { href: '/calculators/ssy-calculator',         label: 'SSY Calculator' },
  { href: '/calculators/compound-interest-calculator', label: 'Compound Interest Calculator' },
  { href: '/calculators/nsc-calculator',         label: 'NSC Calculator' },
  { href: '/calculators/kvp-calculator',         label: 'KVP Calculator' },
];
const MORE = [
  { href: '/calculators/emi-calculator',           label: 'EMI Calculator' },
  { href: '/calculators/home-loan-calculator',     label: 'Home Loan Calculator' },
  { href: '/calculators/retirement-calculator',    label: 'Retirement Calculator' },
  { href: '/calculators/nps-calculator',           label: 'NPS Calculator' },
  { href: '/calculators/swp-calculator',           label: 'SWP Calculator' },
  { href: '/calculators/post-office-mis-calculator', label: 'Post Office MIS Calculator' },
  { href: '/calculators/scss-calculator',          label: 'SCSS Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What is an RD Calculator?',
    a: 'An RD calculator is a financial tool that computes the maturity amount of a Recurring Deposit account. It uses the RD formula with quarterly compounding to calculate how much each monthly deposit earns over the full tenure, showing the total invested amount, total interest earned, and final maturity value.',
  },
  {
    q: 'How is RD interest calculated?',
    a: 'RD interest is calculated using quarterly compounding. Each monthly deposit earns interest from the month it is deposited until the end of the tenure. The formula is A = P x (1 + R/400)^(4 x t), applied to every deposit and summed. R is the annual interest rate and t is the time in years each deposit remains in the account. Most Indian banks and post offices follow this quarterly compounding method approved by RBI.',
  },
  {
    q: 'Is TDS applicable on RD interest?',
    a: 'Yes, interest earned on a Recurring Deposit is fully taxable. If the total interest income from all deposits with a bank exceeds Rs 40,000 in a financial year (Rs 50,000 for senior citizens), the bank deducts TDS at 10%. If PAN is not provided, TDS is deducted at 20%. The interest is added to your income and taxed as per your income tax slab.',
  },
  {
    q: 'What is the minimum and maximum tenure for an RD?',
    a: 'The tenure for a Recurring Deposit typically ranges from 6 months to 10 years across most Indian banks and the Post Office. Some banks allow tenure in multiples of 3 months within this range. The Post Office RD has a fixed tenure of 5 years with an option to extend for another 5 years.',
  },
  {
    q: 'What is the minimum monthly deposit for an RD account?',
    a: 'The minimum monthly deposit varies by institution. The Post Office RD requires a minimum of Rs 100 per month. Most banks set the minimum between Rs 500 and Rs 1,000 per month. There is no upper limit, though amounts above Rs 10 lakh may require additional documentation as per RBI anti-money laundering norms.',
  },
  {
    q: 'Can I close my RD before the maturity date?',
    a: 'Yes, most banks allow premature closure of an RD account. However, a penalty typically applies, usually a 1% to 2% reduction in the applicable interest rate for the period the deposit was held. Some banks do not allow closure within the first 3 to 6 months of opening the account.',
  },
  {
    q: 'What is better, RD or FD?',
    a: 'FD is better if you have a lump sum amount to invest at one time, as FDs typically offer slightly higher interest rates. RD is better if you want to build a corpus through monthly savings without the discipline of investing a lump sum. For salaried individuals creating a saving habit, RD is more practical. Both carry similar risk levels as they are fixed-income products.',
  },
  {
    q: 'Which bank offers the highest RD interest rate in India?',
    a: 'Among major banks, small finance banks like AU Small Finance Bank and Equitas Small Finance Bank offer RD rates between 7.5% and 9%, depending on tenure. Among large private banks, Yes Bank and Axis Bank frequently offer competitive rates. The Post Office RD currently pays 6.7% per annum, compounded quarterly. Rates are updated periodically and vary by deposit tenure.',
  },
  {
    q: 'Can NRIs open an RD account in India?',
    a: 'Yes, NRIs can open an RD account in India, typically through an NRO (Non-Resident Ordinary) account or NRE (Non-Resident External) account. Interest earned on an NRE RD account is tax-free in India. Interest on an NRO RD account is taxable. The currency selector in this calculator allows NRIs to view maturity amounts in their preferred currency.',
  },
  {
    q: 'How does quarterly compounding work in RD?',
    a: 'Quarterly compounding means interest is calculated and added to the deposit balance every 3 months. In an RD, each monthly deposit earns compound interest that is recalculated every quarter. The formula uses N=4 (four compounding periods per year). This is the standard method prescribed by the Indian Banks Association and used across all banks and the Post Office.',
  },
  {
    q: 'Can I have multiple RD accounts at the same time?',
    a: 'Yes, you can hold multiple RD accounts simultaneously with the same bank or across different banks. Each account operates independently. Some investors use multiple RDs to stagger maturities, so they receive payouts at different points in time rather than one large lump sum at the end of a single RD.',
  },
  {
    q: 'What happens if I miss an RD monthly payment?',
    a: 'Missing an RD instalment typically results in a penalty. Most banks charge a default fee ranging from Rs. 1 to Rs. 5 per Rs. 100 of the missed instalment. If too many instalments are missed, the RD account may be converted to a savings account or closed prematurely. Some banks offer a grace period of a few days before imposing the penalty.',
  },
  {
    q: 'Is the RD interest rate fixed once the account is opened?',
    a: 'Yes. The rate that applies on the day you open the RD stays fixed for the entire tenure, regardless of how the bank changes its rates afterward. This works in your favor if rates fall after you open the account, and against you if rates rise, since you cannot switch to the new, higher rate without closing and reopening the RD.',
  },
  {
    q: 'Can I take a loan against my RD account?',
    a: 'Most banks allow a loan or overdraft against an RD, typically up to 80 to 90% of the deposit value accumulated so far. This is a useful way to access funds for a short-term need without breaking the RD and losing the interest benefit or paying a premature withdrawal penalty.',
  },
  {
    q: 'What documents are required to open an RD account?',
    a: 'Opening an RD needs standard KYC documents: proof of identity such as a PAN card or Aadhaar, proof of address, and a recent photograph. Most banks and the Post Office also let you open an RD entirely online through net banking or a mobile app if you already hold a savings account with them.',
  },
  {
    q: 'Does an RD qualify for tax deduction like a tax-saving FD?',
    a: 'No. A regular RD does not qualify for deduction under Section 80C, unlike a 5-year tax-saving fixed deposit. The interest earned on an RD is also fully taxable at your income tax slab rate. If the tax deduction is the priority, a tax-saving FD, PPF, or ELSS is the appropriate instrument instead of an RD.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. All calculators are free to use, with a free account available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.',
  },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ─── CA CTA ─────────────────────────────────────────────────── */

/* ═════════════════════════════════════════════════════════════ */
export default function RDCalculatorClient() {
  const defaultSettings = { monthlyDeposit: 5000, rate: 6.5, tenureYr: 3, tenureMode: 'yr', tenureMo: 36, showTable: false };
  const { settings, updateSettings } = useCalculatorSettings('rd-calculator', defaultSettings);
  const { monthlyDeposit, rate, tenureYr, tenureMode, tenureMo, showTable } = settings;
  const setMonthlyDeposit = (v: any) => updateSettings({ monthlyDeposit: typeof v === 'function' ? v(settings.monthlyDeposit) : v });
  const setRate = (v: any) => updateSettings({ rate: typeof v === 'function' ? v(settings.rate) : v });
  const setTenureYr = (v: any) => updateSettings({ tenureYr: typeof v === 'function' ? v(settings.tenureYr) : v });
  const setTenureMode = (v: any) => updateSettings({ tenureMode: typeof v === 'function' ? v(settings.tenureMode) : v });
  const setTenureMo = (v: any) => updateSettings({ tenureMo: typeof v === 'function' ? v(settings.tenureMo) : v });
  const setShowTable = (v: any) => updateSettings({ showTable: typeof v === 'function' ? v(settings.showTable) : v });
  const [mobile,    setMobile]    = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const months = tenureMode === 'yr' ? tenureYr * 12 : tenureMo;
  const result = useMemo(() => calcRD(monthlyDeposit, rate, months), [monthlyDeposit, rate, months]);

  const growthRows = useMemo(() => {
    if (!result || result.maturity === 0) return [];
    return calcGrowthTable(monthlyDeposit, rate, months);
  }, [monthlyDeposit, rate, months, result]);

  const prinPct    = result && result.maturity > 0 ? Math.round((result.invested / result.maturity) * 100) : 50;
  const returnsPct = 100 - prinPct;

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const h3  = { fontSize: 15.5, fontWeight: 600, color: C.ink, margin: '0 0 6px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } as React.CSSProperties;
  const bul = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 } as React.CSSProperties;
  const mono = { fontFamily: 'monospace', background: '#f4f5f6', padding: '2px 7px', borderRadius: 4, fontSize: 13.5, color: C.dark } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            RD Calculator
          </h1>
          <p style={{ fontSize: 14.5, color: C.ink3, margin: 0 }}>
            Recurring Deposit Calculator: calculate quarterly compounding maturity, total interest earned, and year-by-year growth for your RD investment
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="RD Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Investment Details</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  <Slider label="Monthly investment" id="rd-monthly" value={monthlyDeposit} min={500} max={100000} step={500}
                    fmt={v => fmtC(v)} onChange={setMonthlyDeposit} compact={mobile} />
                  <Slider label="Rate of interest (p.a)" id="rd-rate" value={rate} min={1} max={15} step={0.1}
                    fmt={v => `${v.toFixed(1)}%`} onChange={setRate} compact={mobile} />

                  {/* Tenure toggle */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: mobile ? 10 : 14 }}>
                      <label style={{ fontSize: mobile ? 13.5 : 14, color: C.ink2, fontWeight: 400 }}>Time period</label>
                      <div style={{ display: 'flex', background: '#f4f5f6', borderRadius: 8, padding: 3 }}>
                        {(['yr', 'mo'] as const).map(m => (
                          <button key={m} onClick={() => setTenureMode(m)}
                            style={{ padding: mobile ? '4px 10px' : '5px 14px', borderRadius: 6, border: 'none', background: tenureMode === m ? C.white : 'transparent', color: tenureMode === m ? C.ink : C.ink3, fontFamily: INTER, fontSize: 13, fontWeight: 600, cursor: 'pointer', boxShadow: tenureMode === m ? '0 1px 4px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.15s' }}>
                            {m === 'yr' ? 'Years' : 'Months'}
                          </button>
                        ))}
                      </div>
                    </div>
                    {tenureMode === 'yr'
                      ? <Slider label="" id="rd-tenure-yr" value={tenureYr} min={1} max={10} step={1} fmt={v => `${v} Yr`} onChange={v => { setTenureYr(v); setTenureMo(v * 12); }} compact={mobile} />
                      : <Slider label="" id="rd-tenure-mo" value={tenureMo} min={6} max={120} step={6} fmt={v => `${v} Mo`} onChange={v => { setTenureMo(v); setTenureYr(Math.round(v / 12)); }} compact={mobile} />}
                    {tenureMode === 'yr' && <YearPresets current={tenureYr} onChange={v => { setTenureYr(v); setTenureMo(v * 12); }} />}
                  </div>
                </div>

                {/* Result panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {result && result.maturity > 0 ? (
                    <>

                      {/* Primary result */}
                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>
                          Maturity Value
                        </span>
                        <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                          aria-live="polite" aria-label={`Maturity value: ${fmtIN(result.maturity)}`}>
                          {fmtIN(result.maturity)}
                        </span>
                      </div>

                      {[
                        { label: 'Invested amount', value: fmtC(result.invested) },
                        { label: 'Total interest',  value: fmtC(result.interest) },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                        </div>
                      ))}

                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                        <DonutChart principal={result.invested} gains={result.interest} principalPct={prinPct} />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                          <span style={{ fontSize: 12, color: C.ink2 }}>Principal {prinPct}%</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                          <span style={{ fontSize: 12, color: C.ink2 }}>Interest {returnsPct}%</span>
                        </div>
                      </div>

                      <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 11.5, color: C.ink3 }}>Principal {prinPct}%</span>
                          <span style={{ fontSize: 11.5, color: C.ink3 }}>Interest {returnsPct}%</span>
                        </div>
                        <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`Principal is ${prinPct}% of maturity value`}>
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

              {/* Year-by-year table */}
              {result && result.maturity > 0 && growthRows.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowTable((v: boolean) => !v)}
                    aria-expanded={showTable} aria-controls="growth-table-rd"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Year-by-Year Growth Table</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>Quarterly compounding breakdown</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {Math.ceil(months / 12)} yr · {rate.toFixed(1)}% p.a
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showTable && (
                    <div id="growth-table-rd" style={{ borderTop: `1px solid ${C.border}` }}>
                      {mobile && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '6px 0 4px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                            style={{ animation: 'swipeHint 1.6s ease-in-out infinite' }}>
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                          <p style={{ fontSize: 11.5, color: C.ink3, margin: 0, fontFamily: INTER }}>Swipe to see all columns</p>
                        </div>
                      )}
                      <style>{`@keyframes swipeHint { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }`}</style>
                      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
                        <table style={{ minWidth: 400, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              {['Year', 'Invested', 'Interest Earned', 'Maturity Value'].map(h => (
                                <th key={h} style={{ padding: '10px 20px', textAlign: 'left', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }} scope="col">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {growthRows.map((row, i) => (
                              <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ padding: '11px 20px', fontWeight: 700, color: C.dark }}>Year {row.year}</td>
                                <td style={{ padding: '11px 20px', color: C.ink2 }}>{fmtIN(row.invested)}</td>
                                <td style={{ padding: '11px 20px', color: '#1f7a58', fontWeight: 600 }}>{fmtIN(row.interest)}</td>
                                <td style={{ padding: '11px 20px', color: C.ink, fontWeight: 600 }}>{fmtIN(row.maturity)}</td>
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

            {/* ── ARTICLE ── */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-rd">What Is a Recurring Deposit?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    A Recurring Deposit (RD) is a fixed-income investment product offered by banks and post offices where you invest a fixed amount every month and earn interest compounded quarterly. It is designed for individuals who want to build a savings corpus through regular monthly instalments.
                  </p>
                </div>
                <p style={p}>
                  Unlike a Fixed Deposit where you invest a lump sum at once, an RD allows you to contribute modest amounts monthly, making it ideal for salaried individuals and anyone looking to build a saving habit. The minimum monthly deposit at the Post Office is just Rs 100, and most banks accept as little as Rs 500 per month.
                </p>
                <p style={p}>
                  RDs are governed by RBI guidelines and offer guaranteed returns irrespective of market movements. The interest rate is fixed at the time of opening the account and remains constant for the entire tenure, making RD one of the safest investment options available in India. Per RBI data, scheduled commercial banks held over Rs 3.5 lakh crore in RD deposits as of March 2025.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="rd-formula">RD Formula and Calculation Method</h2>
                <p style={p}>The standard formula for calculating RD maturity in Indian banking uses quarterly compounding. Each monthly deposit earns interest independently from the month it is deposited until the end of the tenure.</p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark }}>
                    M = P x (1 + R/400)^(4 x t1) + P x (1 + R/400)^(4 x t2) + ... + P x (1 + R/400)^(4 x tn)
                  </code>
                </div>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={{ ...thS, width: 110 }} scope="col">Variable</th><th style={thS} scope="col">Meaning</th></tr></thead>
                    <tbody>
                      {[
                        ['M', 'Total maturity amount'],
                        ['P', 'Monthly deposit amount'],
                        ['R', 'Annual interest rate (in %)'],
                        ['t', 'Time in years for each deposit'],
                      ].map(([v, m]) => (
                        <tr key={v as string}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{v}</td><td style={tdR}>{m}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  <strong>Worked example:</strong> You deposit Rs 5,000 every month for 3 years at an 8% quarterly-compounded rate. The first deposit earns interest for 36 months (3 years), the second for 35 months, and so on. The maturity value is the sum of each deposit with its compounded interest. This calculator performs that series automatically.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="rd-vs-fd">RD vs FD: Key Differences</h2>
                <p style={p}>
                  The primary difference between RD and FD is the investment pattern. An FD requires a one-time lump sum deposit, while an RD accepts monthly instalments. Both offer fixed, guaranteed returns and are among the safest fixed-income instruments in India.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Feature</th><th style={thS} scope="col">RD</th><th style={thS} scope="col">FD</th></tr></thead>
                    <tbody>
                      {[
                        ['Investment pattern', 'Monthly instalments', 'One-time lump sum'],
                        ['Minimum amount', 'Rs 100 to Rs 500 per month', 'Rs 1,000 to Rs 10,000'],
                        ['Interest rate', 'Slightly lower than FD', 'Higher than RD typically'],
                        ['Compounding', 'Quarterly (standard)', 'Quarterly (standard)'],
                        ['Tenure range', '6 months to 10 years', '7 days to 10 years'],
                        ['Premature closure', 'Allowed with penalty', 'Allowed with penalty'],
                        ['TDS applicable', 'Yes, above Rs 40,000', 'Yes, above Rs 40,000'],
                        ['Best for', 'Monthly savers', 'Lump sum investors'],
                      ].map(([feature, rd, fd]) => (
                        <tr key={feature as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{feature}</td>
                          <td style={tdR}>{rd}</td>
                          <td style={tdR}>{fd}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  For salaried individuals with no large lump sum, an RD is the more practical instrument. For those with a significant amount ready to invest, FDs generally offer a slightly higher rate. Many banks offer 0.25% to 0.50% higher rates on FDs compared to RDs for the same tenure. Compare both using the <Link href="/calculators/fd-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>FD Calculator</Link>.
                </p>
              </div>

              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>FD Calculator</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Have a lump sum instead of monthly savings? See the fixed deposit projection at the same tenure and rate.</p>
                </div>
                <Link className="fx-btn" href="/calculators/fd-calculator" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
              </div>

              <div style={sec}>
                <h2 style={h2} id="quarterly-compounding">Quarterly Compounding in RD Explained</h2>
                <p style={p}>
                  Quarterly compounding means the interest is calculated and added to the principal once every three months. In RD, this is the standard method prescribed by the Indian Banks Association. The compounding frequency of 4 times per year (N=4) means each monthly deposit earns compound interest that grows faster than simple interest but slower than monthly compounding.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Compounding Frequency</th><th style={thS} scope="col">Formula (for 1 year at 8%)</th><th style={thS} scope="col">Effective Annual Rate</th></tr></thead>
                    <tbody>
                      {[
                        ['Yearly (N=1)', '(1 + 0.08/1)^1 - 1', '8.000%'],
                        ['Half-yearly (N=2)', '(1 + 0.08/2)^2 - 1', '8.160%'],
                        ['Quarterly (N=4)', '(1 + 0.08/4)^4 - 1', '8.243%'],
                        ['Monthly (N=12)', '(1 + 0.08/12)^12 - 1', '8.300%'],
                      ].map(([freq, formula, ear]) => (
                        <tr key={freq as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{freq}</td>
                          <td style={tdR}><code style={mono}>{formula}</code></td>
                          <td style={{ ...tdR, color: '#1f7a58', fontWeight: 700 }}>{ear}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The effective annual rate increases with compounding frequency. Quarterly compounding, which all Indian banks use for RDs, gives an effective rate of 8.243% when the nominal rate is 8%. Over long tenures, this difference compounds significantly. A monthly deposit of Rs 5,000 at 8% for 10 years earns approximately Rs 1,08,000 more than the simple interest equivalent.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="rd-taxation">RD Taxation: How RD Returns Are Taxed</h2>
                <p style={p}>
                  RD interest is fully taxable as per your income tax slab. Unlike PPF or EPF, RD does not enjoy EEE (Exempt-Exempt-Exempt) status. The interest earned is added to your total income and taxed at your applicable slab rate. No tax deduction under Section 80C is available on the principal amount invested in an RD.
                </p>
                <h3 style={h3}>TDS on RD Interest</h3>
                <p style={p}>
                  Banks deduct TDS at 10% if the total interest from all deposits with that bank exceeds Rs 40,000 in a financial year. For senior citizens, the threshold is Rs 50,000. If you have not submitted your PAN to the bank, the TDS rate becomes 20%. The TDS is reflected in your Form 26AS and can be claimed as credit while filing your income tax return.
                </p>
                <h3 style={h3}>Tax Planning Tip</h3>
                <p style={{ ...p, margin: 0 }}>
                  If your total income is below the taxable threshold, submit Form 15G (or Form 15H for senior citizens) to the bank at the start of the financial year to avoid TDS deduction. The interest will still be taxable, but you can avoid the upfront deduction and pay any applicable tax at the time of filing. For tax-efficient fixed-income investing, PPF offers EEE status under Section 80C. Use the <Link href="/calculators/ppf-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>PPF Calculator</Link> to compare.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="current-rd-rates">Current RD Interest Rates in India</h2>
                <p style={p}>
                  RD interest rates are reviewed and updated periodically by banks and the Post Office. These rates are typically 0.25% to 0.50% lower than the corresponding FD rates for the same tenure. Below are indicative rates across major institutions as of mid-2026.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>Indicative RD rates across major Indian institutions</caption>
                    <thead><tr><th style={thS} scope="col">Institution</th><th style={thS} scope="col">Rate (p.a)</th><th style={thS} scope="col">Tenure Range</th></tr></thead>
                    <tbody>
                      {[
                        ['Post Office RD', '6.7%', '5 years'],
                        ['State Bank of India', '5.5 to 7.0%', '1 to 10 years'],
                        ['ICICI Bank', '5.5 to 7.25%', '6 months to 10 years'],
                        ['HDFC Bank', '5.5 to 7.25%', '6 months to 10 years'],
                        ['Axis Bank', '5.5 to 7.5%', '6 months to 10 years'],
                        ['Yes Bank', '6.0 to 7.75%', '1 to 10 years'],
                        ['AU Small Finance Bank', '7.0 to 9.0%', '1 to 10 years'],
                        ['Equitas Small Finance Bank', '7.0 to 8.5%', '1 to 10 years'],
                      ].map(([bank, rate, tenure]) => (
                        <tr key={bank as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{bank}</td>
                          <td style={{ ...tdR, fontWeight: 600 }}>{rate}</td>
                          <td style={tdR}>{tenure}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Senior citizens typically receive 0.50% to 0.75% higher rates on RDs, similar to FDs. Small finance banks offer higher rates because they need to attract deposits to meet priority sector lending norms under RBI regulations. Per RBI data, small finance banks held approximately Rs 25,000 crore in RD deposits as of Q4 FY25.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="rd-limitations">Limitations of Recurring Deposits</h2>
                <div>
                  {[
                    ['Lower returns than market-linked products', 'Equity mutual funds historically deliver 12 to 15% CAGR over long periods, while RD rates are in the 5.5 to 7.5% range. For long-term wealth creation, RDs underperform equities significantly after adjusting for inflation.'],
                    ['No tax benefits under Section 80C', 'Unlike PPF, ELSS, and life insurance premiums, the amount invested in RD does not qualify for tax deduction under Section 80C of the Income Tax Act. Only the interest is taxed, which is an additional disadvantage.'],
                    ['Interest rate locked in', 'When you open an RD, the rate is fixed for the full tenure. If market rates rise, you cannot benefit. Conversely, if rates fall, your RD continues at the higher rate. Some banks offer floating-rate RDs, but the standard product is fixed.'],
                    ['TDS on interest', 'RD interest exceeding Rs 40,000 (Rs 50,000 for senior citizens) attracts TDS at 10%. For investors in higher tax brackets, the post-tax return can be significantly lower than the headline rate.'],
                  ].map(([title, text], i) => (
                    <div key={i} style={{ ...bul, marginBottom: 14, gap: 0, flexDirection: 'column' as const }}>
                      <strong style={{ fontSize: 15, color: C.ink, marginBottom: 4 }}>{title}</strong>
                      <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use-rd">How to Use This RD Calculator</h2>
                <p style={p}>This calculator is free and requires no sign-up or personal information. Three inputs control the entire calculation:</p>

                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Monthly investment:</strong> use the slider to set the amount you intend to deposit each month, ranging from Rs 500 to Rs 1,00,000.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Rate of interest:</strong> enter the annual interest rate offered by your bank or the Post Office, adjustable from 1% to 15% in 0.1% steps.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Time period:</strong> choose between years or months using the toggle, then adjust the slider. Quick preset buttons let you switch between 1, 2, 3, 5, 8, and 10-year durations instantly.
                  </li>
                </ol>
                <p style={p}>
                  The donut chart instantly shows your total principal vs interest split. The year-by-year growth table (expandable by clicking the section below the calculator) shows how the investment builds over each completed year. Click any input value to type an exact number, or use the slider for quick adjustments.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  The currency selector on the top right converts all displayed amounts to your preferred currency. Useful for NRI investors who want to see RD returns in their resident currency. The results update in real-time as you adjust any input.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="rd-vs-sip">RD vs SIP: Which Should You Choose?</h2>
                <p style={p}>
                  An RD and a mutual fund SIP both let you invest a fixed amount every month, but the similarity ends there. An RD is a fixed-income bank deposit with a guaranteed, locked-in rate, while a SIP buys mutual fund units at the market price on each investment date, so its return is not fixed and can be negative in the short term.
                </p>
                <p style={p}>
                  Choose RD when the goal is capital safety and a known, guaranteed maturity amount, such as a short-term goal within 1 to 3 years or an emergency fund top-up. Choose a SIP into equity mutual funds when the goal is more than 5 to 7 years away and you can tolerate market ups and downs in exchange for potentially higher long-term returns. The <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SIP Calculator</Link> projects the market-linked alternative side by side with this RD projection.
                </p>
              </div>


              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only. RD interest rates vary by bank and are subject to change. This calculator uses the standard quarterly compounding formula prescribed by the Indian Banks Association. Actual maturity amounts may differ slightly due to rounding and individual bank policies. This calculator is for educational and planning purposes and does not constitute financial advice. Consult a SEBI-registered investment adviser before making investment decisions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.rd-sidebar::-webkit-scrollbar{width:5px}.rd-sidebar::-webkit-scrollbar-track{background:transparent}.rd-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.rd-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="rd-sidebar" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <SidebarList title="Popular Calculators" items={POPULAR} />
              <SidebarList title="More Calculators" items={MORE} />
            </div>
          </aside>

        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/sip-calculator|SIP', '/calculators/fd-calculator|FD', '/calculators/ppf-calculator|PPF', '/calculators/rd-calculator|RD', '/calculators/emi-calculator|EMI', '/calculators/home-loan-calculator|Home Loan', '/calculators/retirement-calculator|Retirement', '/calculators/nps-calculator|NPS'] },
        { hd: 'Topics', links: ['/calculators/sip-calculator|Mutual Funds', '/calculators/home-loan-calculator|Home Loans', '/calculators/fd-calculator|Fixed Deposits', '/calculators/retirement-calculator|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

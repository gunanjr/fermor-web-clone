'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect } from 'react';
import Link from 'next/link';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
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

/* ─── Math ───────────────────────────────────────────────────── */
const MIS_TENURE_MONTHS = 60;

// Same per-month-forward-compounding formula already used by rd-calculator, reused here so an
// MIS payout reinvested into an RD produces the identical number a user would get running the
// two calculators separately.
function calcRD(monthlyDeposit: number, rate: number, months: number): { invested: number; maturity: number; interest: number } {
  if (months <= 0 || monthlyDeposit <= 0) return { invested: 0, maturity: 0, interest: 0 };
  const r = rate / 100;
  let maturity = 0;
  for (let i = 1; i <= months; i++) {
    const tenureMonths = months - i + 1;
    const tenureYears = tenureMonths / 12;
    maturity += monthlyDeposit * Math.pow(1 + r / 4, 4 * tenureYears);
  }
  const invested = monthlyDeposit * months;
  return { invested, maturity, interest: maturity - invested };
}

interface YearRow {
  year: number;
  cumulativeMisIncome: number;
  rdBalance: number;
}

function buildYearRows(monthlyIncome: number, rdRate: number, reinvest: boolean): YearRow[] {
  const rows: YearRow[] = [];
  for (let y = 1; y <= 5; y++) {
    const monthsSoFar = y * 12;
    const cumulativeMisIncome = monthlyIncome * monthsSoFar;
    const rdBalance = reinvest ? calcRD(monthlyIncome, rdRate, monthsSoFar).maturity : 0;
    rows.push({ year: y, cumulativeMisIncome, rdBalance });
  }
  return rows;
}

/* ─── Donut Chart: principal vs total interest/income ────────── */
function DonutChart({ principal, totalIncome }: { principal: number; totalIncome: number }) {
  const total = principal + totalIncome;
  if (total <= 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const principalPct = Math.round((principal / total) * 100);
  const principalArc = (principal / total) * circ;
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Principal is ${principalPct}% of total value, monthly income earned is ${100 - principalPct}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${principalArc} ${circ - principalArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Principal</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{principalPct}%</text>
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
  { href: '/calculators/rd-calculator',                        label: 'RD Calculator' },
  { href: '/calculators/fd-laddering-calculator',              label: 'FD Calculator' },
  { href: '/calculators/liquid-fund-vs-fd-calculator',         label: 'Liquid Fund vs FD Calculator' },
  { href: '/calculators/bank-interest-comparison-calculator',  label: 'Bank Interest Rate Comparison' },
  { href: '/calculators/ppf-calculator',                       label: 'PPF Calculator' },
  { href: '/calculators/pension-calculator',                   label: 'Pension Calculator' },
  { href: '/calculators/income-tax-calculator',                label: 'Income Tax Calculator' },
];
const MORE = [
  { href: '/calculators/retirement-calculator',   label: 'Retirement Calculator' },
  { href: '/calculators/compound-interest-calculator', label: 'Compound Interest Calculator' },
  { href: '/calculators/inflation-calculator',    label: 'Inflation Calculator' },
  { href: '/calculators/cagr-calculator',         label: 'CAGR Calculator' },
  { href: '/calculators/sip-calculator',          label: 'SIP Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What is the Post Office Monthly Income Scheme (MIS)?',
    a: 'Post Office MIS is a government-backed savings scheme that pays a fixed monthly income on a lump sum deposit, currently at 7.4% per annum, over a fixed 5-year tenure. The principal is returned in full at maturity, and the monthly payout is calculated on the original deposit, not compounded within the scheme.',
  },
  {
    q: 'What is the current Post Office MIS interest rate?',
    a: 'The Post Office MIS interest rate is 7.4% per annum for the April-June 2026 quarter, fixed for the full 5-year term of the account once opened. The rate is reviewed every quarter by the Ministry of Finance and can change for accounts opened in a later quarter.',
  },
  {
    q: 'What is the maximum amount I can invest in Post Office MIS?',
    a: 'The maximum investment is Rs 9 lakh for a single account and Rs 15 lakh for a joint account, with each joint holder\'s effective share capped at Rs 9 lakh. The minimum investment is Rs 1,000, in multiples of Rs 100 thereafter.',
  },
  {
    q: 'How is the Post Office MIS monthly income calculated?',
    a: 'Monthly income equals your deposit multiplied by the annual interest rate, divided by 12. On a Rs 9 lakh deposit at 7.4%, that works out to Rs 5,550 a month for 60 months, a total payout of Rs 3,33,000 over the 5-year term, with the original Rs 9 lakh returned separately at maturity.',
  },
  {
    q: 'Can I reinvest my Post Office MIS monthly income into an RD?',
    a: 'Yes, many investors deposit their MIS payout into a Post Office Recurring Deposit each month rather than spending it, effectively compounding an otherwise non-compounding scheme. On a Rs 9 lakh MIS at 7.4% with the payout reinvested into an RD at the current 6.7% rate, the RD portion alone grows to approximately Rs 3,96,080 by year 5, on top of the Rs 9 lakh MIS principal.',
  },
  {
    q: 'What happens if I withdraw from Post Office MIS before 5 years?',
    a: 'Withdrawal is not permitted before 1 year under any circumstance. Between 1 and 3 years, a 2% deduction is made from the principal before refund. Between 3 and 5 years, the deduction reduces to 1% of the principal. After 5 years, the full principal is returned with no deduction.',
  },
  {
    q: 'Is Post Office MIS interest taxable?',
    a: 'Yes, the entire monthly interest is added to your total income and taxed at your applicable income tax slab rate. The post office does not deduct TDS on MIS interest, but this does not make it tax-free; you must declare it while filing your return.',
  },
  {
    q: 'Does Post Office MIS qualify for Section 80C deduction?',
    a: 'No. Unlike 5-year tax-saving bank FDs, NSC, or PPF, the amount invested in Post Office MIS does not qualify for a deduction under Section 80C. It is a pure income-generating scheme, not a tax-saving one.',
  },
  {
    q: 'What is the difference between Post Office MIS and a bank FD?',
    a: 'An FD compounds interest (usually quarterly) and pays it out at maturity or on a chosen payout frequency you select, while MIS pays a fixed sum every month by design and does not compound within the scheme. MIS has a fixed 5-year tenure and a Rs 9 lakh (single) investment cap; FDs have flexible tenures and generally no upper investment limit.',
  },
  {
    q: 'What is the difference between Post Office MIS and Senior Citizen Savings Scheme (SCSS)?',
    a: 'SCSS is restricted to individuals aged 60 and above (55+ for retirees under superannuation or VRS), pays a higher rate, and has an investment cap of Rs 30 lakh with quarterly payouts. MIS has no age restriction, pays monthly rather than quarterly, and caps the investment at Rs 9 lakh single or Rs 15 lakh joint.',
  },
  {
    q: 'Can I open a joint Post Office MIS account?',
    a: 'Yes, up to three adults can jointly hold an MIS account. The Rs 15 lakh joint limit applies to the account as a whole, and each joint holder\'s individual share is capped at Rs 9 lakh. Income is typically split equally among joint holders for tax purposes unless agreed otherwise.',
  },
  {
    q: 'How do I open a Post Office MIS account?',
    a: 'Visit any India Post branch with your identity proof, address proof, PAN card, and passport-size photographs, and fill in the MIS account opening form. You can also transfer funds from an existing post office savings account. A nomination facility is available and recommended at account opening.',
  },
  {
    q: 'Can NRIs invest in Post Office MIS?',
    a: 'No. NRIs are not eligible to open a new Post Office MIS account. If a resident Indian account holder later becomes an NRI, the existing account must be closed, since the scheme is restricted to resident Indian citizens.',
  },
  {
    q: 'What happens to Post Office MIS at maturity?',
    a: 'At the end of the 5-year term, the original principal is returned in full, either credited to a linked savings account or paid out directly. Many investors reinvest the matured principal into a fresh MIS account at whatever rate is current at that time, or move it to another scheme.',
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
export default function PostOfficeMISClient() {
  const defaultSettings = {
    principal: 900000,
    accountType: 'single' as 'single' | 'joint',
    misRate: 7.4,
    reinvest: false,
    rdRate: 6.7,
  };
  const { settings, updateSettings } = useCalculatorSettings('post-office-mis', defaultSettings);
  const { principal, accountType, misRate, reinvest, rdRate } = settings;

  const setPrincipal   = (v: number) => updateSettings({ principal: v });
  const setAccountType = (v: 'single' | 'joint') => updateSettings({ accountType: v, principal: Math.min(principal, v === 'single' ? 900000 : 1500000) });
  const setMisRate      = (v: number) => updateSettings({ misRate: v });
  const setReinvest     = (v: boolean) => updateSettings({ reinvest: v });
  const setRdRate        = (v: number) => updateSettings({ rdRate: v });

  const [mobile, setMobile] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const maxPrincipal = accountType === 'single' ? 900000 : 1500000;

  const monthlyIncome = principal * misRate / 100 / 12;
  const totalMisIncome = monthlyIncome * MIS_TENURE_MONTHS;
  const rdResult = useMemo(() => reinvest ? calcRD(monthlyIncome, rdRate, MIS_TENURE_MONTHS) : null, [reinvest, monthlyIncome, rdRate]);
  const combinedMaturity = principal + (rdResult ? rdResult.maturity : totalMisIncome);

  const schedule = useMemo(() => buildYearRows(monthlyIncome, rdRate, reinvest), [monthlyIncome, rdRate, reinvest]);

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const, verticalAlign: 'middle' as const } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'middle' as const, textAlign: 'left' as const } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'middle' as const, textAlign: 'right' as const } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Post Office MIS Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate your Post Office Monthly Income Scheme payout at 7.4%, over the fixed 5-year term, with an optional MIS plus RD reinvestment projection.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            <section aria-label="Post Office MIS Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div role="tabpanel" style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <p style={{ fontSize: 14, color: C.ink2, marginBottom: 10 }}>Account Type</p>
                    <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', width: 'fit-content' }}>
                      {(['single', 'joint'] as const).map(t => (
                        <button key={t} onClick={() => setAccountType(t)}
                          style={{ padding: '7px 20px', border: 'none', background: accountType === t ? C.white : 'transparent', color: accountType === t ? C.ink : C.ink3, fontWeight: accountType === t ? 600 : 400, cursor: 'pointer', fontFamily: INTER, fontSize: 13, transition: 'all 0.15s' }}>
                          {t === 'single' ? 'Single (max 9L)' : 'Joint (max 15L)'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Slider label="Deposit Amount" id="mis-principal" value={principal} min={1000} max={maxPrincipal} step={1000} fmt={fmtC} onChange={setPrincipal} compact={mobile} />
                  <Slider label="MIS Interest Rate" id="mis-rate" value={misRate} min={5} max={9} step={0.1} fmt={v => `${v.toFixed(1)}%`} onChange={setMisRate} compact={mobile} />

                  <div style={{ marginBottom: 20 }}>
                    <p style={{ fontSize: 14, color: C.ink2, marginBottom: 10 }}>Reinvest monthly income into an RD?</p>
                    <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', width: 'fit-content' }}>
                      {[false, true].map(val => (
                        <button key={String(val)} onClick={() => setReinvest(val)}
                          style={{ padding: '7px 20px', border: 'none', background: reinvest === val ? C.white : 'transparent', color: reinvest === val ? C.ink : C.ink3, fontWeight: reinvest === val ? 600 : 400, cursor: 'pointer', fontFamily: INTER, fontSize: 13, transition: 'all 0.15s' }}>
                          {val ? 'Yes' : 'No'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {reinvest && (
                    <Slider label="Post Office RD Rate" id="mis-rdrate" value={rdRate} min={4} max={9} step={0.1} fmt={v => `${v.toFixed(1)}%`} onChange={setRdRate} compact={mobile} />
                  )}

                  <div style={{ padding: '14px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8 }}>
                    <span style={{ fontSize: 13, color: C.ink, fontFamily: INTER }}>MIS has a fixed 5-year tenure. Interest does not compound within the scheme; your monthly payout stays the same for all 60 months at the rate locked in when you open the account.</span>
                  </div>
                </div>

                {/* Result panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>
                      Monthly Income
                    </span>
                    <span aria-live="polite" aria-label={`Monthly income: ${fmtIN(monthlyIncome)}`}
                      style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {fmtIN(monthlyIncome)}
                    </span>
                  </div>

                  {[
                    { label: 'Deposit (Principal)', value: fmtC(principal) },
                    { label: 'Total Income Over 5 Years', value: fmtC(totalMisIncome) },
                    ...(reinvest && rdResult ? [
                      { label: 'RD Maturity Value (if reinvested)', value: fmtC(rdResult.maturity) },
                      { label: 'Combined Value at Year 5', value: fmtC(combinedMaturity) },
                    ] : [
                      { label: 'Principal Returned at Maturity', value: fmtC(principal) },
                    ]),
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    <DonutChart principal={principal} totalIncome={totalMisIncome} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Principal</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Income earned</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Year-by-year table */}
              {schedule.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowTable(v => !v)}
                    aria-expanded={showTable} aria-controls="growth-table"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Year-by-Year MIS Income{reinvest ? ' and RD Growth' : ''}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        5 yr · {misRate.toFixed(1)}%
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showTable && (
                    <div id="growth-table" style={{ borderTop: `1px solid ${C.border}` }}>
                      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
                        <table style={{ minWidth: 480, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
                            Year-by-year cumulative MIS income{reinvest ? ' and RD reinvestment balance' : ''}
                          </caption>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }} scope="col">Year</th>
                              <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }} scope="col">Cumulative MIS Income</th>
                              {reinvest && <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }} scope="col">RD Balance</th>}
                            </tr>
                          </thead>
                          <tbody>
                            {schedule.map((row, i) => (
                              <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ padding: '11px 14px', fontWeight: 700, color: C.dark }}>Year {row.year}</td>
                                <td style={{ padding: '11px 14px', color: C.ink2, textAlign: 'right' }}>{fmtIN(row.cumulativeMisIncome)}</td>
                                {reinvest && <td style={{ padding: '11px 14px', color: '#166534', fontWeight: 600, textAlign: 'right' }}>{fmtIN(row.rdBalance)}</td>}
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

            {/* Waitlist */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-mis">What Is Post Office MIS?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Post Office Monthly Income Scheme (MIS) is a government-backed savings scheme run through India Post that pays a fixed monthly income on a lump sum deposit, at 7.4% per annum, over a fixed 5-year term.
                  </p>
                </div>
                <p style={p}>
                  MIS is built for a specific job: a predictable monthly payout, not growth. The interest does not compound inside the account. It is calculated once a year on the original deposit and paid out in equal monthly instalments, and the deposit itself comes back in full when the account matures.
                </p>
                <p style={p}>
                  The scheme is offered under the Post Office Savings Schemes framework governed by the Ministry of Finance, the same authority that reviews the interest rate every quarter alongside PPF, NSC, and SCSS.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="mis-formula">MIS Monthly Income Formula</h2>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark }}>
                    Monthly Income = Deposit x Annual Rate / 12 / 100
                  </code>
                </div>
                <p style={p}>
                  On a Rs 9 lakh deposit at the current 7.4% rate, monthly income is Rs 9,00,000 x 7.4 / 12 / 100, which comes to Rs 5,550 a month. Over the full 60-month term, that totals Rs 3,33,000, with the Rs 9 lakh principal returned separately at maturity.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 8 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>MIS monthly income in Excel: two equivalent methods</caption>
                    <thead><tr><th style={thS} scope="col">Method</th><th style={thS} scope="col">Formula</th></tr></thead>
                    <tbody>
                      {[
                        ['Direct formula', '=Deposit*Rate/12/100'],
                        ['With a named rate cell', '=Deposit*$Rate$/12/100 (fill down for each month, rate stays constant)'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={tdR}><code>{r[1]}</code></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec} id="mis-by-deposit">
                <h2 style={h2}>MIS Monthly Income by Deposit Amount</h2>
                <p style={p}>
                  Monthly income scales directly with your deposit at the same 7.4% rate. The table below covers common deposit sizes up to the Rs 9 lakh single-account cap.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 8 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Monthly income at 7.4% for common deposit amounts</caption>
                    <thead><tr><th style={thS} scope="col">Deposit</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Monthly Income</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Total Over 5 Years</th></tr></thead>
                    <tbody>
                      {[
                        [100000, 100000*7.4/1200, 100000*7.4/1200*60],
                        [300000, 300000*7.4/1200, 300000*7.4/1200*60],
                        [500000, 500000*7.4/1200, 500000*7.4/1200*60],
                        [700000, 700000*7.4/1200, 700000*7.4/1200*60],
                        [900000, 900000*7.4/1200, 900000*7.4/1200*60],
                        [1500000, 1500000*7.4/1200, 1500000*7.4/1200*60],
                      ].map(([dep, monthly, total], i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>Rs {dep.toLocaleString('en-IN')}{dep === 1500000 ? ' (joint)' : ''}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>Rs {Math.round(monthly).toLocaleString('en-IN')}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const, fontWeight: 700, color: C.dark }}>Rs {Math.round(total).toLocaleString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec} id="mis-plus-rd">
                <h2 style={h2}>MIS Plus RD: Turning a Non-Compounding Scheme Into a Compounding One</h2>
                <p style={p}>
                  MIS interest does not compound, since it is paid out every month rather than added back to the deposit. A common workaround is redirecting the monthly payout into a Post Office Recurring Deposit instead of spending it, which lets that portion of the money compound quarterly.
                </p>
                <p style={p}>
                  On a Rs 9 lakh MIS at 7.4% (Rs 5,550 a month) redirected into an RD at the current 6.7% rate, the RD builds to approximately Rs 3,96,080 by the end of year 5, against Rs 3,33,000 invested into it, an extra Rs 63,080 earned purely from the reinvestment. Toggle "Reinvest monthly income into an RD" above to see this for your own numbers.
                </p>
              </div>

              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>RD Calculator</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Run the RD math on its own, with any monthly deposit and tenure.</p>
                </div>
                <Link className="fx-btn" href="/calculators/rd-calculator" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
              </div>

              <div style={sec} id="mis-vs-fd">
                <h2 style={h2}>MIS vs Bank FD: What&apos;s the Difference?</h2>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>MIS vs bank FD comparison</caption>
                    <thead><tr><th style={thS} scope="col">Feature</th><th style={thS} scope="col">Post Office MIS</th><th style={thS} scope="col">Bank FD</th></tr></thead>
                    <tbody>
                      {[
                        ['Payout style', 'Fixed monthly income, principal at maturity', 'Compounds; payout at maturity or chosen frequency'],
                        ['Tenure', 'Fixed 5 years', 'Flexible, 7 days to 10 years'],
                        ['Investment cap', 'Rs 9 lakh single, Rs 15 lakh joint', 'No upper limit'],
                        ['Guarantee', 'Government of India, sovereign-backed', 'DICGC insured up to Rs 5 lakh per bank'],
                        ['80C benefit', 'None', 'Only on the specific 5-year tax-saving FD'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={tdR}>{r[1]}</td>
                          <td style={tdR}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Compare exact numbers on the <Link href="/calculators/liquid-fund-vs-fd-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Liquid Fund vs FD Calculator</Link> or the <Link href="/calculators/bank-interest-comparison-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Bank Interest Rate Comparison Calculator</Link> before deciding between MIS and a bank FD.
                </p>
              </div>

              <div style={sec} id="mis-vs-scss">
                <h2 style={h2}>MIS vs SCSS: Which Should You Choose?</h2>
                <p style={p}>
                  Senior Citizen Savings Scheme (SCSS) is restricted to those aged 60 and above (55+ for VRS or superannuated retirees), pays a higher rate than MIS, and allows deposits up to Rs 30 lakh with quarterly rather than monthly payouts. MIS has no age restriction and pays monthly, which suits anyone wanting a shorter commitment or a strictly monthly cash flow, not just retirees.
                </p>
              </div>

              <div style={sec} id="premature-withdrawal">
                <h2 style={h2}>Premature Withdrawal Rules</h2>
                <p style={p}>
                  MIS cannot be closed at all before 1 year. Closing between 1 and 3 years costs a 2% deduction from the principal. Closing between 3 and 5 years costs a 1% deduction. After 5 years, the full principal comes back with no deduction.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 8 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Premature withdrawal deduction by holding period</caption>
                    <thead><tr><th style={thS} scope="col">Holding Period</th><th style={thS} scope="col">Deduction</th></tr></thead>
                    <tbody>
                      {[
                        ['Before 1 year', 'Withdrawal not allowed'],
                        ['1 to 3 years', '2% of principal'],
                        ['3 to 5 years', '1% of principal'],
                        ['After 5 years (maturity)', 'None, full principal returned'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={tdR}>{r[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec} id="mis-taxation">
                <h2 style={h2}>MIS Taxation</h2>
                <p style={p}>
                  MIS interest is fully taxable at your income tax slab rate, added to your total income for the year it is received. The post office does not deduct TDS on this interest, unlike a bank FD above the TDS threshold, but the income must still be declared. MIS does not qualify for Section 80C, unlike NSC, the 5-year tax-saving bank FD, or PPF.
                </p>
              </div>

              <div style={sec} id="limitations">
                <h2 style={h2}>Limitations of This Calculator</h2>
                <p style={p}>
                  <strong>The rate changes quarterly.</strong> 7.4% applies to accounts opened in the April-June 2026 quarter. An account opened in a later quarter locks in whatever rate the Ministry of Finance notifies for that quarter, not necessarily 7.4%.
                </p>
                <p style={p}>
                  <strong>RD reinvestment assumes perfect discipline.</strong> The MIS + RD projection assumes every single monthly payout is redirected into the RD without exception. Skipping even one month reduces the final RD value below what is shown here.
                </p>
                <p style={p}>
                  <strong>Tax is not deducted from the figures shown.</strong> Monthly income and totals shown are gross, before your own income tax liability on that interest.
                </p>
              </div>

              <div style={sec} id="how-to-use">
                <h2 style={h2}>How to Use This Post Office MIS Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Choose account type:</strong> single (up to Rs 9 lakh) or joint (up to Rs 15 lakh).
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter your deposit amount:</strong> the lump sum you plan to invest, within the applicable limit.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Check the rate:</strong> defaults to the current 7.4%; adjust if a new quarterly rate has been notified.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Toggle MIS + RD reinvestment:</strong> turn this on to see the combined value if your monthly payout goes into an RD instead of being spent.
                  </li>
                </ol>
              </div>


              <div style={{ margin: '44px 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only. The Post Office MIS interest rate is reviewed quarterly by the Ministry of Finance and applies only to accounts opened in that quarter; it may change for future quarters. MIS + RD reinvestment figures assume every monthly payout is redirected without exception and use the current Post Office RD rate as an assumption. Interest shown is gross and does not account for your personal income tax liability. This calculator is for educational and planning purposes only and does not constitute financial advice. Consult a SEBI-registered investment adviser or a chartered accountant before making investment or tax decisions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .pomis-sidebar::-webkit-scrollbar { width: 5px; }
            .pomis-sidebar::-webkit-scrollbar-track { background: transparent; }
            .pomis-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .pomis-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            aria-label="Related calculators"
            className="pomis-sidebar"
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
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 250, flexShrink: 0 }}>
              <span style={{ fontSize: 12, color: C.ink3, fontWeight: 500 }}>Advertisement</span>
            </div>
            <div style={{ flexShrink: 0 }}><SidebarList title="Popular Calculators" items={POPULAR} /></div>
            <div style={{ flexShrink: 0 }}><SidebarList title="More Calculators" items={MORE} /></div>
          </aside>

        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/rd-calculator|RD', '/calculators/fd-laddering-calculator|FD', '/calculators/liquid-fund-vs-fd-calculator|Liquid Fund vs FD', '/calculators/ppf-calculator|PPF', '/calculators/pension-calculator|Pension', '/calculators/sip-calculator|SIP', '/calculators/cagr-calculator|CAGR'] },
        { hd: 'Topics', links: ['/calculators/rd-calculator|Post Office Schemes', '/calculators/bank-interest-comparison-calculator|Bank Rates', '/calculators/income-tax-calculator|Tax Planning', '/calculators/retirement-calculator|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

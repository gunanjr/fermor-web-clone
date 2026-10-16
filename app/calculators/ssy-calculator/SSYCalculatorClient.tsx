'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { FAQBox } from '@/components/common/FAQBox';

/* ─── Palette ─────────────────────────────────────────────────── */
const C = {
  dark:      '#101214',
  lime:      '#a6dbc4',
  lime2:     '#2d9970',
  paleLime:  '#f4f5f6',
  ink:       '#16140F',
  ink2:      '#50565c',
  ink3:      '#7a8087',
  white:     '#ffffff',
  bg:        '#f6f7f8',
  border:    '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

/* ─── Helpers ───────────────────────────────────────────────── */
const fmtIN = (n: number) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(n));
const fmtC = (n: number) => {
  if (n >= 1e7) return `${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `${(n / 1e5).toFixed(2)} L`;
  return fmtIN(n);
};

/* ─── Math ──────────────────────────────────────────────────── */
const SSY_DEPOSIT_YEARS = 15;
const SSY_MATURITY_YEARS = 21;

interface GrowthRow {
  year: number;
  age: number;
  opening: number;
  deposited: number;
  interest: number;
  closing: number;
}

function buildSSYGrowth(annual: number, rate: number, currentAge: number): GrowthRow[] {
  const rows: GrowthRow[] = [];
  const r = rate / 100;
  let balance = 0;
  for (let y = 1; y <= SSY_MATURITY_YEARS; y++) {
    const opening = balance;
    const deposited = y <= SSY_DEPOSIT_YEARS ? annual : 0;
    const interest = Math.round((balance + deposited) * r);
    balance = Math.round((balance + deposited) * (1 + r));
    rows.push({ year: y, age: currentAge + y, opening, deposited, interest, closing: balance });
  }
  return rows;
}

/* ─── Donut ──────────────────────────────────────────────────── */
function DonutChart({ invested, interest }: { invested: number; interest: number }) {
  const total = invested + interest;
  if (total === 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const pArc  = (invested / total) * circ;
  const pPct  = Math.round((invested / total) * 100);
  return (
    <svg width="216" height="216" viewBox="0 0 216 216" style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Invested</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
  );
}

/* ─── Slider ─────────────────────────────────────────────────── */
function Slider({ label, value, min, max, step, fmt, onChange, compact }: {
  label: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void; compact?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = ((value - min) / (max - min)) * 100;
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 40 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 16 }}>
        <label style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400 }}>{label}</label>
        {editing ? (
          <input autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.paleLime, border: `1.5px solid ${C.lime2}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 120, outline: 'none', color: C.dark, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: C.dark, background: C.paleLime, border: `1.5px solid ${C.lime2}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 18px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 90 : 110, textAlign: 'center' }}>
            {fmt(value)}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 20, height: 20, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 2px 8px rgba(16,18,20,0.22)', pointerEvents: 'none', zIndex: 1 }} />
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(+e.target.value)}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontSize: 11, color: C.ink3 }}>{fmt(min)}</span>
        <span style={{ fontSize: 11, color: C.ink3 }}>{fmt(max)}</span>
      </div>
    </div>
  );
}

/* ─── CA CTA ────────────────────────────────────────────────── */

/* ─── Sidebar list ──────────────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ padding: '13px 20px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 14, color: C.ink2, transition: 'all 0.12s' }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = C.paleLime; (e.currentTarget as HTMLElement).style.color = C.dark; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink2; }}>
            {label}
          </div>
        </Link>
      ))}
    </div>
  );
}

const POPULAR = [
  { href: '/calculators/ppf-calculator',        label: 'PPF Calculator' },
  { href: '/calculators/fd-calculator',         label: 'FD Calculator' },
  { href: '/calculators/sip-calculator',        label: 'SIP Calculator' },
  { href: '/calculators/nps-calculator',        label: 'NPS Calculator' },
  { href: '/calculators/income-tax-calculator', label: 'Income Tax Calculator' },
];
const MORE = [
  { href: '/calculators/lumpsum-calculator',           label: 'Lumpsum Calculator' },
  { href: '/calculators/compound-interest-calculator', label: 'Compound Interest Calculator' },
  { href: '/calculators/swp-calculator',               label: 'SWP Calculator' },
  { href: '/calculators/gratuity-calculator',          label: 'Gratuity Calculator' },
];

/* ─── FAQ ───────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What is the SSY interest rate for FY 2025-26?',
    a: 'The Sukanya Samriddhi Yojana interest rate is 8.2% per annum for FY 2025-26, compounded annually. The government reviews and announces the SSY rate every quarter, though it has remained at 8.2% since April 2023, the highest rate among all government-backed small savings schemes, ahead of PPF (7.1%) and the 5-year NSC (7.7%).',
  },
  {
    q: 'Who is eligible to open an SSY account?',
    a: 'A parent or legal guardian can open an SSY account for a girl child who is an Indian resident and below 10 years of age. The account can be opened any time from birth until the girl turns 10. A family can open SSY accounts for a maximum of two girl children, with a third account allowed only in the case of twins or triplets.',
  },
  {
    q: 'How much can I deposit in an SSY account?',
    a: 'You can deposit a minimum of ₹250 and a maximum of ₹1,50,000 in a financial year, in multiples of ₹50. Deposits can be made as a lump sum or in instalments throughout the year. The full amount deposited qualifies for deduction under Section 80C of the Income Tax Act, within the overall ₹1.5 lakh limit.',
  },
  {
    q: 'For how many years do I need to make deposits?',
    a: 'Deposits are required for 15 years from the date the account is opened. After that, no further deposits are needed, and the account continues to earn interest on the accumulated balance until it matures, 21 years after it was opened.',
  },
  {
    q: 'When does an SSY account mature, and can I withdraw early?',
    a: 'The account matures 21 years from the date of opening, or when the girl marries after turning 18, whichever is earlier. Partial withdrawal of up to 50% of the balance (as it stood at the end of the preceding financial year) is allowed once the girl turns 18, for higher education or marriage expenses, on submission of proof.',
  },
  {
    q: 'Is the maturity amount from SSY taxable?',
    a: 'No. SSY follows the EEE (Exempt-Exempt-Exempt) tax structure. Your annual deposits qualify for an 80C deduction, the interest credited each year is tax-free, and the entire maturity amount, including all accumulated interest, is exempt from tax on withdrawal.',
  },
  {
    q: 'What happens if I miss a yearly deposit?',
    a: 'If the minimum deposit of ₹250 is not made in a financial year, the account becomes "irregular". It can be revived by paying the minimum deposit for each missed year plus a penalty of ₹50 per year, any time before the account completes 15 years from opening.',
  },
  {
    q: 'Can the SSY account be transferred?',
    a: 'Yes. An SSY account can be transferred free of cost between post offices and authorised banks anywhere in India, typically when the family relocates. The account number, balance, and deposit history carry over to the new branch without affecting the maturity timeline.',
  },
  {
    q: 'Can an NRI open or continue an SSY account?',
    a: 'No. SSY is open only to a girl child who is an Indian resident. If the account holder becomes an NRI after the account was opened, the account must be closed, since the scheme rules require continued Indian residency for it to stay active.',
  },
  {
    q: 'Can I open an SSY account or apply online?',
    a: 'Most banks that offer SSY let an existing customer open the account through net banking or their mobile app once KYC is already on file. Opening one at a post office still requires visiting the branch in person with the required documents.',
  },
  {
    q: 'Can I open more than one SSY account for the same girl child?',
    a: 'No. Only one SSY account is allowed per girl child. A family can open accounts for a maximum of two girl children, with a third account permitted only if the second delivery resulted in twins or triplets, or if the first delivery itself resulted in three girls.',
  },
  {
    q: 'Can grandparents open an SSY account for a granddaughter?',
    a: 'Only a parent or a legal guardian can open an SSY account, not a grandparent unless they are the girl\'s legally appointed guardian. A grandparent can still contribute money toward the deposits; they just cannot be the account-opening applicant unless they hold legal guardianship.',
  },
  {
    q: 'What happens to the SSY account if the girl child dies before maturity?',
    a: 'The account is closed immediately on the death of the account holder. The balance, including interest accrued up to the date of death, is paid out to the guardian on submission of a death certificate and the required closure documents at the post office or bank branch.',
  },
  {
    q: 'Does SSY offer a loan facility against the balance, like PPF does?',
    a: 'No. Unlike PPF, which allows a loan against the balance after the third year, SSY has no loan facility. The only way to access funds before maturity is the partial withdrawal allowed once the girl turns 18, or one of the specific premature closure grounds.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. All calculators are free to use, with a free account available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.',
  },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

export default function SSYCalculatorClient() {
  const title = null;
  const defaultSettings = { annual: 50000, rate: 8.2, currentAge: 5, showGrowth: false };
  const { settings, updateSettings } = useCalculatorSettings('ssy-calculator', defaultSettings);
  const { annual, rate, currentAge, showGrowth } = settings;
  const setAnnual = (v: any) => updateSettings({ annual: typeof v === 'function' ? v(settings.annual) : v });
  const setRate = (v: any) => updateSettings({ rate: typeof v === 'function' ? v(settings.rate) : v });
  const setCurrentAge = (v: any) => updateSettings({ currentAge: typeof v === 'function' ? v(settings.currentAge) : v });
  const setShowGrowth = (v: any) => updateSettings({ showGrowth: typeof v === 'function' ? v(settings.showGrowth) : v });
      const [mobile,     setMobile]     = useState(false);
  
  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const growthRows = useMemo(() => buildSSYGrowth(annual, rate, currentAge), [annual, rate, currentAge]);
  const maturity = growthRows[growthRows.length - 1].closing;
  const invested = annual * SSY_DEPOSIT_YEARS;
  const interestEarned = maturity - invested;
  const invPct = maturity > 0 ? Math.round((invested / maturity) * 100) : 0;
  const interestPct = 100 - invPct;
  const maturityYear = new Date().getFullYear() + SSY_MATURITY_YEARS;
  const ageAtMaturity = currentAge + SSY_MATURITY_YEARS;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      {/* NAV */}
      <PageNav />

      {/* BODY */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 28px', letterSpacing: '-0.025em' }}>{title || `Sukanya Samriddhi Yojana (SSY) Calculator`}</h1>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          {/* LEFT */}
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 36px' }}>SSY Account Details</p>}

                  <Slider label="Yearly Investment" value={annual} min={250} max={150000} step={250}
                    fmt={v => `₹${fmtC(v)}`} onChange={setAnnual} compact={mobile} />
                  <Slider label="Girl's Current Age" value={currentAge} min={0} max={9} step={1}
                    fmt={v => `${v} Yr`} onChange={setCurrentAge} compact={mobile} />
                  <Slider label="SSY Interest Rate (p.a.)" value={rate} min={6} max={10} step={0.1}
                    fmt={v => `${v.toFixed(1)}%`} onChange={setRate} compact={mobile} />
                </div>

                {/* Results panel */}
                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  {/* Maturity highlight box */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: mobile ? '12px 16px' : '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: '#101214' }}>Maturity Value</span>
                    <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>₹{fmtIN(maturity)}</span>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: `Total invested (${SSY_DEPOSIT_YEARS} yrs)`, value: `₹${fmtC(invested)}` },
                    { label: 'Total interest earned',                     value: `₹${fmtC(interestEarned)}` },
                    { label: 'Maturity year',                             value: `${maturityYear} (age ${ageAtMaturity})` },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '15px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  {/* Donut */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 24, order: mobile ? 1 : -1 }}>
                    <DonutChart invested={invested} interest={interestEarned} />
                  </div>

                  {/* Legend */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 22, marginBottom: mobile ? 8 : 28, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Total invested</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Interest earned</span>
                    </div>
                  </div>

                  {/* Split bar */}
                  <div style={{ width: '100%', marginTop: mobile ? 8 : 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Invested {invPct}%</span>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Interest {interestPct}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${invPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>

                </div>
              </div>

              {/* Year-wise growth schedule toggle */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowGrowth((v: boolean) => !v)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '20px 48px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.ink }}>Year-wise Growth</span>
                    {!mobile && <span style={{ fontSize: 13, color: C.ink3, marginLeft: 10 }}>(Deposits + compounding to maturity)</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 8 : 12, flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.dark, background: C.paleLime, border: `1px solid ${C.lime2}`, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {SSY_MATURITY_YEARS} Yr
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      style={{ transform: showGrowth ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {showGrowth && (
                  <div style={{ borderTop: `1px solid ${C.border}`, overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <thead>
                        <tr style={{ background: '#f4f5f6' }}>
                          {['Year', "Daughter's Age", 'Opening Balance', 'Deposited', 'Interest Earned', 'Closing Balance'].map(h => (
                            <th key={h} style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {growthRows.map((row, i) => (
                          <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={{ padding: '13px 24px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                            <td style={{ padding: '13px 24px', color: C.ink2 }}>{row.age}</td>
                            <td style={{ padding: '13px 24px', color: C.ink2 }}>₹{fmtIN(row.opening)}</td>
                            <td style={{ padding: '13px 24px', color: C.ink2 }}>₹{fmtIN(row.deposited)}</td>
                            <td style={{ padding: '13px 24px', color: '#1f7a58', fontWeight: 600 }}>₹{fmtIN(row.interest)}</td>
                            <td style={{ padding: '13px 24px', color: C.ink2 }}>₹{fmtIN(row.closing)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* ARTICLE */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>
            <article style={{ fontFamily: INTER }}>
              {(() => {
                const h2 = { fontSize: mobile ? 18 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
                const h3 = { fontSize: 16, fontWeight: 600, color: C.ink, margin: '0 0 6px' } as React.CSSProperties;
                const p  = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
                const sec = { margin: '0 0 40px' } as React.CSSProperties;
                const tdL = { padding: '11px 16px', fontSize: 14, color: C.ink2, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
                const tdR = { padding: '11px 16px', fontSize: 14, color: C.ink, fontWeight: 500, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
                const thS = { padding: '10px 16px', fontSize: 12, fontWeight: 600, color: C.ink3, background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap' } as React.CSSProperties;
                const bullet = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 } as React.CSSProperties;
                return (
                  <>
                    {/* 1 */}
                    <div style={sec}>
                      <h2 style={h2}>What is Sukanya Samriddhi Yojana (SSY)?</h2>
                      <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                        <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                          Sukanya Samriddhi Yojana is a government-backed small savings scheme launched in January 2015 under the &ldquo;Beti Bachao, Beti Padhao&rdquo; campaign, designed to help parents build a dedicated corpus for a girl child&rsquo;s education and marriage.
                        </p>
                      </div>
                      <p style={p}>
                        The account can be opened at any post office or authorised bank in the name of a girl child below 10 years of age.
                      </p>
                      <p style={p}>
                        SSY currently offers 8.2% p.a., compounded annually, the highest interest rate among all government-backed small savings instruments, including PPF (7.1%) and the 5-year NSC (7.7%). Like PPF, it follows the EEE (Exempt-Exempt-Exempt) tax model, making it one of the most tax-efficient long-term savings options available for a daughter&rsquo;s future.
                      </p>
                    </div>

                    {/* 2 */}
                    <div style={sec}>
                      <h2 style={h2}>How the SSY calculator works</h2>
                      <p style={p}>
                        Deposits into an SSY account are required for 15 years from the date it is opened. After that, no further deposits are needed, and the balance simply continues to compound until the account matures, 21 years after it was opened. This calculator splits the projection into those two phases.
                      </p>
                      <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, fontFamily: 'monospace', margin: '0 0 4px', padding: '12px 0 0' }}>
                        A = P x [((1+r)^15 - 1) / r] x (1+r)
                      </p>
                      <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, fontFamily: 'monospace', margin: '0 0 16px' }}>
                        M = A x (1+r)^6
                      </p>
                      <p style={{ ...p, margin: '0 0 16px' }}>In the formula the letters represent the following:</p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}` }}>
                          <thead>
                            <tr>
                              <th style={{ ...thS, width: 80 }}>Variable</th>
                              <th style={thS}>Meaning</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['P', 'The amount you deposit every year for the first 15 years'],
                              ['r', 'The annual SSY interest rate'],
                              ['A', 'The balance at the end of year 15, when deposits stop'],
                              ['M', 'The maturity value at the end of year 21'],
                            ].map(([v, m]) => (
                              <tr key={v}>
                                <td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{v}</td>
                                <td style={tdR}>{m}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>
                        In practice, deposits can be made any time during the financial year and SSY interest is computed monthly on the lowest balance between the 5th and the last day of the month, then credited annually. The actual maturity amount may differ slightly from the figure shown here based on the timing of your deposits and any change in the SSY rate over the 21-year period. This calculator assumes the rate you select stays constant throughout.
                      </p>
                    </div>

                    {/* 3 */}
                    <div style={sec}>
                      <h2 style={h2}>Eligibility and account rules</h2>
                      <div>
                        {[
                          'The girl must be an Indian resident and below 10 years of age when the account is opened.',
                          'A family can open SSY accounts for up to two girl children. A third account is allowed only if the second birth resulted in twins or triplets.',
                          'Minimum deposit is ₹250 and maximum is ₹1,50,000 per financial year, in multiples of ₹50.',
                          'Required documents: SSY account opening form, the girl’s birth certificate, and identity & address proof (KYC) of the parent or guardian.',
                        ].map((t, i) => (
                          <div key={i} style={bullet}>
                            <span style={{ flexShrink: 0, marginTop: 3 }}>&#8226;</span>
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 4 */}
                    <div style={sec}>
                      <h2 style={h2}>How to open an SSY account</h2>
                      <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {[
                          ['Pick a branch:', 'any post office, or an authorised bank such as SBI, ICICI, HDFC, or another that offers SSY accounts.'],
                          ['Fill the SSY account opening form:', 'available at the branch or on the bank\'s website, along with an initial deposit of at least ₹250.'],
                          ['Submit documents:', 'the girl\'s birth certificate, and identity and address proof (KYC) of the parent or guardian opening the account.'],
                          ['Collect the passbook:', 'the branch issues an SSY passbook recording the account number, opening deposit, and interest rate, used to track deposits going forward.'],
                        ].map(([label, text]) => (
                          <li key={label} style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                            <strong style={{ color: C.ink }}>{label}</strong> {text}
                          </li>
                        ))}
                      </ol>
                      <p style={{ ...p, margin: 0 }}>
                        Some banks allow an existing customer to open an SSY account through net banking or their mobile app once KYC is already on file, but a first-time application at a post office still requires an in-person visit.
                      </p>
                    </div>

                    {/* 5 */}
                    <div style={sec}>
                      <h2 style={h2}>SSY vs other savings options</h2>
                      <h3 style={h3}>SSY vs PPF</h3>
                      <p style={p}>
                        SSY currently pays a higher rate than PPF (8.2% vs 7.1%) and is purpose-built for a girl child&rsquo;s education and marriage, maturing 21 years after opening. The <Link href="/calculators/ppf-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>PPF calculator</Link> is open to anyone, has a 15-year lock-in, and can be extended indefinitely in 5-year blocks. Both are sovereign-guaranteed and follow the EEE tax model.
                      </p>
                      <h3 style={h3}>SSY vs Bank FD</h3>
                      <p style={p}>
                        Fixed deposit interest is fully taxable as per your income slab, while SSY interest and maturity proceeds are completely tax-free. Run the numbers on the <Link href="/calculators/fd-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>FD calculator</Link> to compare: SSY pays a meaningfully higher rate than most FDs, but FDs can be broken any time with a penalty, while SSY funds are locked until the girl turns 18 except for specific purposes.
                      </p>
                      <h3 style={h3}>SSY vs Child Mutual Fund SIP</h3>
                      <p style={{ ...p, margin: 0 }}>
                        An equity SIP for a child&rsquo;s goals carries market risk but has historically delivered higher long-term returns than fixed-income instruments. SSY offers a guaranteed, risk-free return with no market exposure. Many parents use both, treating SSY as the safe, guaranteed core of a daughter&rsquo;s corpus and an SIP for additional growth.
                      </p>
                    </div>

                    {/* 6 */}
                    <div style={sec}>
                      <h2 style={h2}>Withdrawal and maturity rules</h2>
                      <h3 style={h3}>Partial withdrawal at 18</h3>
                      <p style={p}>
                        Once the account holder turns 18, up to 50% of the balance, as it stood at the end of the preceding financial year, can be withdrawn for higher education or to meet marriage expenses, on submission of proof such as an admission offer or marriage notice.
                      </p>
                      <h3 style={h3}>Premature closure</h3>
                      <p style={p}>
                        The account can be closed before maturity if the girl marries after turning 18 (the closure must be requested between one month before and three months after the marriage date), in the event of the death of the account holder, or on compassionate grounds such as a life-threatening medical condition, with the approval of the relevant authority.
                      </p>
                      <h3 style={h3}>At maturity</h3>
                      <p style={{ ...p, margin: 0 }}>
                        The account matures 21 years after it was opened. Unlike PPF, an SSY account does not earn further interest once it has matured and not been closed, so it is worth withdrawing and closing the account at maturity rather than leaving the balance untouched.
                      </p>
                    </div>

                    {/* 7 */}
                    <div style={sec}>
                      <h2 style={h2}>How to use this SSY calculator</h2>
                      <p style={p}>The calculator needs three inputs:</p>
                      <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {[
                          ['Yearly Investment:', 'the amount you plan to deposit each year, between ₹250 and ₹1,50,000.'],
                          ['Girl\'s Current Age:', 'her age today, which sets how many years remain until the account matures.'],
                          ['SSY Interest Rate:', 'defaults to the current 8.2% rate, adjustable to see how a future rate change would affect the maturity value.'],
                        ].map(([label, text]) => (
                          <li key={label} style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                            <strong style={{ color: C.ink }}>{label}</strong> {text}
                          </li>
                        ))}
                      </ol>
                      <p style={{ ...p, margin: 0 }}>
                        The calculator projects deposits for the first 15 years, then compounds the balance untouched until it matures 21 years after opening, and shows the maturity value, total invested, and interest earned above.
                      </p>
                    </div>

                    

                    {/* 8 */}
                    <div style={{ margin: '0 0 40px' }}>
                      <h2 style={h2}>Frequently asked questions</h2>
            <FAQ />
                    </div>
                  </>
                );
              })()}
            </article>

          </div>

          {/* SIDEBAR */}
          <style>{`.ssy-sidebar::-webkit-scrollbar{width:5px}.ssy-sidebar::-webkit-scrollbar-track{background:transparent}.ssy-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.ssy-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="ssy-sidebar" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <SidebarList title="Popular Calculators" items={POPULAR} />
                <SidebarList title="More Calculators" items={MORE} />
            </div>
          </aside>

        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/percentage-calculator|%', '/calculators/gst-calculator|GST', '/calculators/loan-calculator|Loan', '/calculators/income-tax-calculator|Income Tax', '/calculators/capital-gains-calculator|Capital Gains', '/calculators/sip-calculator|SIP', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/swp-calculator|SWP', '/calculators/emi-calculator|EMI', '/calculators/home-loan-calculator|Home Loan', '/calculators/mortgage-calculator|Mortgage', '/calculators/car-loan-calculator|Car Loan', '/calculators/fd-calculator|FD', '/calculators/ppf-calculator|PPF', '/calculators/ssy-calculator|SSY', '/calculators/nps-calculator|NPS', '/calculators/compound-interest-calculator|Compound Int.', '/calculators/gratuity-calculator|Gratuity'] },
        { hd: 'Topics', links: ['/calculators/sip-calculator|Mutual Funds', '/calculators/home-loan-calculator|Home Loans', '/calculators/fd-calculator|Fixed Deposits', '/calculators/nps-calculator|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

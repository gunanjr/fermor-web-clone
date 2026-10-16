'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useLayoutEffect } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { FAQBox } from '@/components/common/FAQBox';

/* ─── Palette - matching EMI & Compound calculators ────────────────── */
const C = {
  dark:      '#101214',
  lime:      '#a6dbc4',
  lime2:     '#2d9970',   /* chip border, donut interest ring   */
  paleLime:  '#f4f5f6',   /* chip bg, EMI box bg                */
  ink:       '#16140F',
  ink2:      '#50565c',
  ink3:      '#7a8087',
  white:     '#ffffff',
  bg:        '#f6f7f8',   /* page background                    */
  border:    '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

/* ─── Math ──────────────────────────────────────────────────── */
interface SWPYearRow {
  year: number;
  openingBal: number;
  withdrawals: number;
  returns: number;
  closingBal: number;
  monthlyWithdrawal: number;
}

function buildSWPSchedule(corpus: number, monthlyWithdrawal: number, annualRate: number, years: number, stepUpPct: number): SWPYearRow[] {
  const rows: SWPYearRow[] = [];
  let balance = corpus;
  let currentMonthly = monthlyWithdrawal;
  const r = annualRate / 12 / 100;
  const startYear = new Date().getFullYear();
  for (let y = 0; y < years; y++) {
    const opening = balance;
    let yearWithdrawals = 0;
    for (let m = 0; m < 12; m++) {
      if (balance <= 0) break;
      balance -= currentMonthly;
      yearWithdrawals += currentMonthly;
      if (balance > 0) {
        balance *= (1 + r);
      }
    }
    const yearReturns = balance - (opening - yearWithdrawals);
    rows.push({ year: startYear + y, openingBal: opening, withdrawals: yearWithdrawals, returns: yearReturns, closingBal: Math.max(0, balance), monthlyWithdrawal: currentMonthly });
    if (balance <= 0) break;
    currentMonthly = currentMonthly * (1 + stepUpPct / 100);
  }
  return rows;
}

/* ─── Donut - two-tone ring with center label ───────────────── */
function DonutChart({ withdrawals, remaining }: { withdrawals: number; remaining: number }) {
  const total = withdrawals + remaining;
  if (total === 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const wArc = (withdrawals / total) * circ;
  const wPct = Math.round((withdrawals / total) * 100);
  return (
    <svg width="216" height="216" viewBox="0 0 216 216" role="img" aria-label={`Total withdrawn ${wPct}% of corpus lifecycle, remaining corpus ${100 - wPct}%`} style={{ display: 'block' }}>
      {/* remaining ring (background) */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      {/* withdrawals arc (foreground) */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${wArc} ${circ - wArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      {/* center label */}
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Withdrawn</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{wPct}%</text>
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
    <div style={{ marginBottom: compact ? 18 : 36 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 14 }}>
        <label htmlFor={inputId} style={{ fontSize: compact ? 13.5 : 15, color: C.ink2, fontWeight: 400 }}>{label}</label>
        {editing ? (
          <input id={inputId} autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            aria-label={`Enter ${label} value`}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 120, outline: 'none', color: C.dark, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${fmt(value)}. Click to edit.`}
            style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 18px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 90 : 110, textAlign: 'center', transition: 'border-color 0.15s' }}
            onMouseOver={e => (e.currentTarget as HTMLButtonElement).style.borderColor = '#AAAAAA'}
            onMouseOut={e => (e.currentTarget as HTMLButtonElement).style.borderColor = C.border}>
            {fmt(value)}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 20, height: 20, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 2px 8px rgba(16,18,20,0.22)', pointerEvents: 'none', zIndex: 1 }} />
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(+e.target.value)}
          aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">{fmt(min)}</span>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">{fmt(max)}</span>
      </div>
    </div>
  );
}

/* ─── Step-up presets (colorless pill style per input-panel rule) ──── */
function StepUpPresets({ current, onChange }: { current: number; onChange: (v: number) => void }) {
  const presets = [{ v: 0, l: 'No step-up' }, { v: 5, l: '5%' }, { v: 6, l: '6% (inflation)' }, { v: 8, l: '8%' }, { v: 10, l: '10%' }];
  return (
    <div role="group" aria-label="Annual step-up presets" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: -20, marginBottom: 24 }}>
      {presets.map(({ v, l }) => {
        const active = current === v;
        return (
          <button key={v} onClick={() => onChange(v)} aria-pressed={active}
            style={{
              fontSize: 12, fontWeight: active ? 700 : 500, color: active ? C.ink : C.ink3,
              background: active ? C.white : 'transparent',
              border: `${active ? 1.5 : 1}px solid ${active ? C.ink : C.border}`,
              borderRadius: 99, padding: '4px 11px', cursor: 'pointer', fontFamily: INTER, transition: 'all 0.12s',
            }}>
            {l}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Sidebar list ──────────────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
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
    </nav>
  );
}

const POPULAR = [
  { href: '/calculators/sip-calculator',            label: 'SIP Calculator' },
  { href: '/calculators/lumpsum-calculator',        label: 'Lumpsum Calculator' },
  { href: '/calculators/mutual-fund-calculator',    label: 'Mutual Fund Returns Calculator' },
  { href: '/calculators/xirr-calculator',           label: 'XIRR Calculator' },
  { href: '/calculators/sip-vs-lumpsum-calculator', label: 'SIP vs Lumpsum Calculator' },
];
const RETIREMENT = [
  { href: '/calculators/retirement-calculator',        label: 'Retirement Calculator' },
  { href: '/calculators/pension-calculator',            label: 'Pension Calculator' },
  { href: '/calculators/retirement-corpus-calculator',  label: 'Retirement Corpus Calculator' },
  { href: '/calculators/step-up-sip-calculator',        label: 'Step-Up SIP Calculator' },
];

/* ─── In-content promo bar ──────────────────────────────────── */
function PromoBar({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', margin: '8px 0 24px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>{title}</p>
        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>{desc}</p>
      </div>
      <Link className="fx-btn" href={href} target="_blank" rel="noopener noreferrer"
        style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
    </div>
  );
}

/* ─── CA CTA (exact standard component, reused twice) ───────── */

/* ─── FAQ ───────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What is an SWP in mutual funds?',
    a: 'SWP stands for Systematic Withdrawal Plan. It lets you withdraw a fixed amount from your mutual fund investment at regular intervals, usually monthly. SWPs are commonly used by retirees to generate a regular income stream from their corpus while the remaining invested amount continues to earn returns.',
  },
  {
    q: 'How does an SWP calculator work?',
    a: 'An SWP calculator uses your initial investment corpus, expected annual return rate, monthly withdrawal amount, and time period to simulate how your balance moves month by month. Each month, the withdrawal is deducted first and the remaining balance earns a return at your assumed rate. The calculator shows how long your money lasts, total withdrawals made, and the final remaining balance.',
  },
  {
    q: 'What is a safe SWP withdrawal rate in India?',
    a: 'A commonly used safe withdrawal rate for a 25 to 30 year retirement horizon in India is 4 to 6% of your initial corpus per year. On a corpus of Rs 1 crore, that works out to withdrawing Rs 33,000 to 50,000 a month without depleting the principal, assuming a return of 8 to 10%. The exact safe rate depends on your actual returns, inflation, and how long you need the corpus to last.',
  },
  {
    q: 'Can I run out of money with an SWP?',
    a: 'Yes. If your monthly withdrawal consistently exceeds the return your remaining corpus earns, the balance shrinks every month and eventually reaches zero. For example, a Rs 50 lakh corpus earning 10% a year supports a withdrawal of about Rs 41,600 a month indefinitely, but withdrawing Rs 60,000 a month from the same corpus depletes it in about 12 years.',
  },
  {
    q: 'What is the difference between SWP and the dividend (IDCW) option?',
    a: 'In an SWP, you redeem a fixed number of units each period to receive a predictable, self-decided payout. In the dividend option, now called IDCW (Income Distribution cum Capital Withdrawal), the fund house pays out from realised profits at its own discretion, so the amount and timing are not guaranteed. SWP gives you control over both the amount and the tax treatment.',
  },
  {
    q: 'Is SWP taxable?',
    a: 'Yes, each SWP withdrawal is treated as a unit redemption and taxed on the capital gains portion. For equity mutual funds, units held over 12 months attract long-term capital gains tax at 12.5%, with the first Rs 1.25 lakh of gains in a financial year exempt, per current capital gains rules. Units held under 12 months are taxed at 20% as short-term gains. For debt funds, all gains are added to your income and taxed at your slab rate.',
  },
  {
    q: 'How much corpus do I need to withdraw Rs 50,000 a month forever?',
    a: 'To sustain a Rs 50,000 monthly withdrawal indefinitely, your corpus needs to earn at least as much as you withdraw each year. The formula is corpus equals annual withdrawal divided by expected return rate. At an 8% return you need about Rs 75 lakh, at 10% about Rs 60 lakh, and at 12% about Rs 50 lakh. A higher assumed return lowers the corpus you need, but also carries more risk.',
  },
  {
    q: 'Which mutual funds are commonly used for SWP?',
    a: 'Balanced advantage funds, equity savings funds, and conservative hybrid funds are widely used for SWP because they carry lower volatility than pure equity funds while still outperforming debt funds over time. Pure equity funds can also work for SWP over long horizons of 15 years or more. For withdrawal periods under 3 years, liquid or short-duration debt funds reduce the risk of redeeming units at a depressed NAV. Speak to a SEBI-registered investment adviser before choosing a specific fund.',
  },
  {
    q: 'What happens to an SWP during a market downturn?',
    a: 'When the market falls, the NAV of your fund drops, so each SWP instalment has to redeem more units to raise the same fixed withdrawal amount. This is called sequence-of-returns risk, and it accelerates corpus depletion during a prolonged downturn. Some retirees hold 12 to 24 months of withdrawal amount in a liquid fund and pause equity SWP during a fall, a method known as the bucket strategy.',
  },
  {
    q: 'What is a step-up SWP and how does it model inflation?',
    a: 'A step-up SWP increases your monthly withdrawal by a fixed percentage every year, so your income keeps pace with rising costs. Setting the step-up percentage equal to your expected inflation rate keeps your withdrawal at roughly the same real purchasing power each year. For example, a Rs 30,000 monthly withdrawal stepped up 6% annually grows to about Rs 50,700 a month by year 10 and about Rs 90,800 a month by year 20. Use the More Settings panel on this calculator to turn on step-up and set the percentage.',
  },
  {
    q: 'Can I combine SIP and SWP in the same financial plan?',
    a: 'Yes, and this is the standard lifecycle approach used by most Indian investors. You run an SIP for 20 to 30 years during your working years to build the corpus, then switch to SWP after retirement to draw income from it. Some investors run both at once during the last few years before retirement, continuing a smaller SIP in one fund while starting SWP in another as a transition. Use the SIP calculator to plan the accumulation phase and this calculator for the withdrawal phase.',
  },
  {
    q: 'What is the difference between an SWP and a one-time lumpsum withdrawal?',
    a: 'A lumpsum withdrawal redeems your entire investment in one transaction, which triggers capital gains tax on the full gain at once and stops any further compounding on that money. An SWP redeems only what you need each period, so the rest of the corpus keeps earning returns and the tax liability is spread across withdrawals and financial years. For anyone drawing a regular income, SWP is almost always more tax-efficient than a single lumpsum withdrawal.',
  },
  {
    q: 'How do I find the exact sustainable withdrawal rate for my own corpus?',
    a: 'Divide your expected annual return rate by 12 and multiply by your corpus to get the monthly withdrawal your corpus can sustain forever, since the corpus then earns back roughly what you take out. This calculator shows this figure automatically as the sustainable monthly withdrawal in the results panel, recalculated live as you change the corpus or return rate.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India with free calculators covering loans, investments, tax, and retirement planning. Every calculator on the site runs in your browser and can be saved to your account for free.',
  },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

export default function SWPCalculatorClient() {
  const defaultSettings = { corpus: 10000000, monthlyWithdrawal: 40000, rate: 10, years: 25, stepUpPct: 0 };
  const { settings, updateSettings } = useCalculatorSettings('swp-calculator', defaultSettings);
  const { corpus, monthlyWithdrawal, rate, years, stepUpPct } = settings;
  const setCorpus = (v: number) => updateSettings({ corpus: v });
  const setMonthlyWithdrawal = (v: number) => updateSettings({ monthlyWithdrawal: v });
  const setRate = (v: number) => updateSettings({ rate: v });
  const setYears = (v: number) => updateSettings({ years: v });
  const setStepUpPct = (v: number) => updateSettings({ stepUpPct: v });

  const [mobile, setMobile] = useState(false);
  const [showAmort, setShowAmort] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();

  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const schedule = useMemo(
    () => buildSWPSchedule(corpus, monthlyWithdrawal, rate, years, stepUpPct),
    [corpus, monthlyWithdrawal, rate, years, stepUpPct]
  );

  const totalWithdrawals = schedule.reduce((sum, r) => sum + r.withdrawals, 0);
  const finalRemaining = schedule.length > 0 ? schedule[schedule.length - 1].closingBal : 0;
  const corpusLastedYears = schedule.length;

  const wPct = totalWithdrawals + finalRemaining > 0
    ? Math.round((totalWithdrawals / (totalWithdrawals + finalRemaining)) * 100)
    : 0;

  const effectiveWithdrawalRate = corpus > 0 ? (monthlyWithdrawal * 12 / corpus) * 100 : 0;
  const sustainableMonthly = corpus * (rate / 100) / 12;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      {/* NAV */}
      <PageNav />

      {/* BODY */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>SWP Calculator</h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>Calculate how long your mutual fund corpus lasts with systematic monthly withdrawals, model a step-up SWP that keeps pace with inflation, and find your safe withdrawal rate.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          {/* LEFT */}
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
                    {!mobile ? (
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{showAdvanced ? 'Step-up settings' : 'Withdrawal details'}</p>
                    ) : (
                      <div />
                    )}
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider id="swp-corpus" label="Total Investment Corpus" value={corpus} min={500000} max={100000000} step={50000}
                        fmt={v => fmtC(v)} onChange={setCorpus} compact={mobile} />
                      <Slider id="swp-withdrawal" label="Monthly Withdrawal" value={monthlyWithdrawal} min={1000} max={500000} step={1000}
                        fmt={v => fmtIN(v)} onChange={setMonthlyWithdrawal} compact={mobile} />
                      <Slider id="swp-rate" label="Expected Return Rate (p.a.)" value={rate} min={1} max={25} step={0.25}
                        fmt={v => `${v.toFixed(2)}%`} onChange={setRate} compact={mobile} />
                      <Slider id="swp-years" label="Time Period" value={years} min={1} max={50} step={1}
                        fmt={v => `${v} Yr`} onChange={setYears} compact={mobile} />

                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 16px', marginBottom: 20 }}>
                        <div style={{ fontSize: 12, color: C.ink, fontWeight: 700 }}>
                          Monthly compounding simulation
                          <span style={{ color: C.ink2, fontWeight: 400, marginLeft: 6 }}>balance is recalculated every month</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button onClick={() => setShowAdvanced(true)}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                          More settings
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ marginBottom: 6 }}>
                        <label style={{ fontSize: 15, color: C.ink2, fontWeight: 400 }}>Annual Step-Up in Withdrawal</label>
                      </div>
                      <p style={{ fontSize: 12.5, color: C.ink3, margin: '0 0 16px', lineHeight: 1.6 }}>
                        Increase your monthly withdrawal every year, for example to keep pace with inflation. Set this to your expected inflation rate to model a fixed real income.
                      </p>
                      <Slider id="swp-stepup" label="Step-Up Rate" value={stepUpPct} min={0} max={15} step={0.5}
                        fmt={v => `${v.toFixed(1)}%`} onChange={setStepUpPct} compact={mobile} />
                      <StepUpPresets current={stepUpPct} onChange={setStepUpPct} />

                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 16px', marginBottom: 24 }}>
                        <div style={{ fontSize: 12, color: C.ink, fontWeight: 700 }}>
                          {stepUpPct === 0 ? 'Step-up is off' : `Withdrawal grows ${stepUpPct.toFixed(1)}% every year`}
                          <span style={{ color: C.ink2, fontWeight: 400, marginLeft: 6 }}>
                            {stepUpPct === 0 ? 'Your monthly withdrawal stays fixed for the full period.' : `Starting at ${fmtIN(monthlyWithdrawal)}, this reaches roughly ${fmtIN(monthlyWithdrawal * Math.pow(1 + stepUpPct / 100, 9))} a month by year 10.`}
                          </span>
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

                {/* Results panel */}
                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  {/* Highlight box */}
                  <div style={{ width: '100%', background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 12, padding: mobile ? '12px 16px' : '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.dark }}>Total Withdrawals</span>
                    <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: C.dark, letterSpacing: '-0.02em' }}>{fmtIN(totalWithdrawals)}</span>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: 'Initial corpus', value: fmtC(corpus) },
                    { label: 'Total withdrawn', value: fmtC(totalWithdrawals) },
                    { label: 'Remaining corpus', value: fmtC(finalRemaining) },
                    {
                      label: 'Corpus lasted',
                      value: corpusLastedYears < years ? `${corpusLastedYears} of ${years} Yr (depleted)` : `${years} Yr`,
                      color: corpusLastedYears < years ? C.ink2 : undefined,
                    },
                    { label: 'Your effective withdrawal rate', value: `${effectiveWithdrawalRate.toFixed(1)}% / yr` },
                    { label: 'Sustainable withdrawal (perpetual)', value: `${fmtIN(sustainableMonthly)} / mo` },
                  ].map(({ label, value, color }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '14px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: color || C.ink }}>{value}</span>
                    </div>
                  ))}

                  {/* Donut */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 24, order: mobile ? 1 : -1 }}>
                    <DonutChart withdrawals={totalWithdrawals} remaining={finalRemaining} />
                  </div>

                  {/* Legend */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 22, marginBottom: mobile ? 8 : 28, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Total withdrawn</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Remaining corpus</span>
                    </div>
                  </div>

                  {/* Split bar */}
                  <div style={{ width: '100%', marginTop: mobile ? 8 : 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Withdrawn {wPct}%</span>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Remaining {100 - wPct}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${wPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>

                </div>
              </div>

              {/* Year-wise growth schedule toggle */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowAmort(v => !v)} aria-expanded={showAmort}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '20px 48px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.ink }}>Your Withdrawal Schedule</span>
                    {!mobile && <span style={{ fontSize: 13, color: C.ink3, marginLeft: 10 }}>(Yearly breakdown)</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 8 : 12, flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.dark, background: C.paleLime, border: `1px solid ${C.lime2}`, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {corpusLastedYears} Yr Lasted
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      style={{ transform: showAmort ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {showAmort && (
                  <div style={{ borderTop: `1px solid ${C.border}`, overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <thead>
                        <tr style={{ background: '#f4f5f6' }}>
                          {['Year', 'Opening Balance', 'Monthly Withdrawal', 'Withdrawals', 'Returns', 'Closing Balance'].map(h => (
                            <th key={h} style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {schedule.map((row, i) => (
                          <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={{ padding: '13px 24px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                            <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.openingBal)}</td>
                            <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.monthlyWithdrawal)}</td>
                            <td style={{ padding: '13px 24px', color: '#1f7a58', fontWeight: 600 }}>{fmtIN(row.withdrawals)}</td>
                            <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.returns)}</td>
                            <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.closingBal)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* SAVE RESULTS */}
            <SaveResultsCard mobile={mobile} />

            

            {/* ARTICLE */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>
              {(() => {
                const h2 = { fontSize: mobile ? 18 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
                const h3 = { fontSize: 16, fontWeight: 600, color: C.ink, margin: '0 0 6px' } as React.CSSProperties;
                const p  = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
                const sec = { margin: '0 0 40px' } as React.CSSProperties;
                const bullet = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 } as React.CSSProperties;
                const thStyle = { padding: '10px 16px', textAlign: 'left' as const, fontWeight: 700, color: C.ink, fontSize: 13 };
                const tdStyle = { padding: '10px 16px', color: C.ink2, fontSize: 13, borderTop: `1px solid ${C.border}` };
                const tableWrap = { overflowX: 'auto' as const, marginBottom: 20, border: `1px solid ${C.border}`, borderRadius: 10 };
                const table = { width: '100%', borderCollapse: 'collapse' as const, fontSize: 13 };

                return (
                  <>
                    {/* 1 */}
                    <div style={sec} id="what-is-swp">
                      <h2 style={h2}>What is a Systematic Withdrawal Plan (SWP)?</h2>
                      <p style={p}>
                        A Systematic Withdrawal Plan lets you withdraw a fixed amount from your mutual fund investment at regular intervals, typically monthly. Unlike the dividend (IDCW) option, where payouts depend on the fund&rsquo;s distributable surplus, an SWP redeems specific units of your holding each period, so the amount and timing are entirely under your control.
                      </p>
                      <p style={p}>
                        SWPs are widely used by retirees in India to build a pension-like income stream from their corpus. The remaining invested amount keeps earning returns, which can extend the life of your corpus by decades over a flat withdrawal. If the withdrawal rate consistently exceeds the return rate, though, the corpus will eventually run out, which is exactly what this calculator is built to show you in advance.
                      </p>
                    </div>

                    {/* 2 */}
                    <div style={sec} id="swp-formula">
                      <h2 style={h2}>How SWP is calculated</h2>
                      <p style={p}>
                        Each month, the calculator deducts your withdrawal amount from the opening balance, then applies your assumed annual return, divided by 12, to whatever remains. This repeats every month until the corpus is exhausted or the selected time period ends.
                      </p>
                      <p style={p}>
                        A month-by-month run on a Rs 50,000 corpus with a Rs 1,000 monthly withdrawal at 12% annual return looks like this:
                      </p>
                      <div style={tableWrap}>
                        <table style={table}>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              <th style={thStyle}>Month</th>
                              <th style={thStyle}>Opening Balance</th>
                              <th style={thStyle}>Withdrawal</th>
                              <th style={thStyle}>Return Earned</th>
                              <th style={thStyle}>Closing Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              [1, 50000, 1000, 490, 49490],
                              [2, 49490, 1000, 485, 48975],
                              [3, 48975, 1000, 480, 48455],
                              [4, 48455, 1000, 475, 47929],
                              [6, 47398, 1000, 464, 46862],
                              [9, 45774, 1000, 448, 45222],
                              [12, 44101, 1000, 431, 43532],
                            ].map(([m, ob, w, r2, cb]) => (
                              <tr key={m}>
                                <td style={tdStyle}>{m}</td>
                                <td style={tdStyle}>Rs {ob.toLocaleString('en-IN')}</td>
                                <td style={tdStyle}>Rs {w.toLocaleString('en-IN')}</td>
                                <td style={tdStyle}>Rs {r2.toLocaleString('en-IN')}</td>
                                <td style={{ ...tdStyle, fontWeight: 600, color: C.ink }}>Rs {cb.toLocaleString('en-IN')}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>
                        Over a full year, the return earned only partly offsets the withdrawals, so the balance drifts down. Whether it eventually reaches zero, and when, depends entirely on how your withdrawal rate compares with your return rate, which is what the sections below cover.
                      </p>
                    </div>

                    {/* 3 */}
                    <div style={sec} id="safe-withdrawal-rate">
                      <h2 style={h2}>What is a safe SWP withdrawal rate in India?</h2>
                      <p style={p}>
                        A safe withdrawal rate is the annual withdrawal, as a percentage of your initial corpus, that your investment returns can sustain without shrinking the principal. In India, 4 to 6% a year is the commonly used range for a 25 to 30 year retirement, though the exact figure depends on your actual returns.
                      </p>
                      <p style={p}>
                        The table below shows the monthly withdrawal a Rs 1 crore corpus can sustain forever at different return rates, calculated as annual return divided by 12:
                      </p>
                      <div style={tableWrap}>
                        <table style={table}>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              <th style={thStyle}>Return Rate</th>
                              <th style={thStyle}>Sustainable Monthly Withdrawal on Rs 1 Crore</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[[6, 50000], [7, 58333], [8, 66667], [9, 75000], [10, 83333], [11, 91667], [12, 100000]].map(([r2, amt]) => (
                              <tr key={r2}>
                                <td style={tdStyle}>{r2}%</td>
                                <td style={{ ...tdStyle, fontWeight: 600, color: C.ink }}>Rs {amt.toLocaleString('en-IN')}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>
                        Withdrawing above the sustainable figure for your assumed return rate draws down the principal itself, not just the returns on it. A corpus of Rs 50 lakh withdrawing Rs 60,000 a month at a 10% return, for instance, is above the sustainable rate and depletes entirely in about 12 years, even though the corpus keeps earning a return the whole time.
                      </p>
                    </div>

                    {/* 4 */}
                    <div style={sec} id="step-up-swp">
                      <h2 style={h2}>What is a step-up SWP and how do I model inflation?</h2>
                      <p style={p}>
                        A step-up SWP increases your monthly withdrawal by a fixed percentage every year instead of keeping it flat, so your income keeps pace with rising living costs. Setting the step-up rate equal to your expected inflation rate is the standard way to model an inflation-adjusted SWP, since it keeps your withdrawal at roughly constant real purchasing power each year.
                      </p>
                      <p style={p}>
                        Turn this on from the More Settings panel above. A withdrawal starting at Rs 30,000 a month with a 6% annual step-up grows like this:
                      </p>
                      <div style={tableWrap}>
                        <table style={table}>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              <th style={thStyle}>Year</th>
                              <th style={thStyle}>Monthly Withdrawal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[[1, 30000], [5, 37874], [10, 50684], [15, 67827], [20, 90768]].map(([y, amt]) => (
                              <tr key={y}>
                                <td style={tdStyle}>{y}</td>
                                <td style={{ ...tdStyle, fontWeight: 600, color: C.ink }}>Rs {amt.toLocaleString('en-IN')}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>
                        A step-up SWP depletes a fixed corpus faster than a flat SWP at the same starting withdrawal, since the withdrawal grows every year while the corpus does not get any larger. On a Rs 1 crore corpus at 10% return, a flat Rs 50,000 monthly withdrawal never runs out, but the same withdrawal stepped up 6% a year depletes the corpus by year 30. Model both scenarios with this calculator before committing to a step-up rate.
                      </p>
                    </div>

                    {/* 5 - promo bar + sip/swp strategy */}
                    <div style={sec} id="sip-swp-strategy">
                      <h2 style={h2}>Should you combine SIP and SWP?</h2>
                      <p style={p}>
                        Yes, running an SIP during your working years and switching to an SWP after retirement is the standard two-phase approach used by most Indian investors, and the two calculators are meant to be used together, one for each phase.
                      </p>
                      <p style={p}>
                        You accumulate a corpus through SIP for 20 to 30 years, then switch that same fund, or move to a lower-volatility fund, into SWP mode once you stop earning a salary. Some investors run both at once in the years just before retirement: a smaller SIP continues in one fund while SWP begins in another, as a gradual transition rather than a single switch on the retirement date.
                      </p>
                      <PromoBar
                        title="SIP Calculator"
                        desc="Plan the accumulation phase before you start withdrawing. See how much a monthly SIP grows into by the time you retire."
                        href="/calculators/sip-calculator"
                      />
                    </div>

                    {/* 6 */}
                    <div style={sec} id="swp-vs-lumpsum">
                      <h2 style={h2}>SWP vs lumpsum withdrawal: which is better?</h2>
                      <p style={p}>
                        SWP is better than a lumpsum withdrawal for anyone who needs regular income rather than a one-time sum, because it spreads out both the tax impact and the loss of compounding. A lumpsum withdrawal redeems your entire investment at once, which triggers capital gains tax on the full gain in a single financial year and stops any further compounding on that money immediately. An SWP redeems only what you need each period, so tax is spread across withdrawals and years, and the untouched portion of the corpus keeps compounding.
                      </p>
                      <p style={p}>
                        A lumpsum withdrawal makes sense mainly when the entire amount is needed immediately, for example to fund a large one-time expense. Outside that case, SWP is almost always the more tax-efficient and financially sound choice.
                      </p>
                    </div>

                    {/* 7 */}
                    <div style={sec} id="swp-vs-dividend">
                      <h2 style={h2}>SWP vs the dividend (IDCW) option</h2>
                      <p style={p}>
                        In an SWP, you redeem a fixed number of units each period to receive a predictable, self-decided payout, and the transaction is treated as a capital gain for tax purposes. In the dividend option, now called Income Distribution cum Capital Withdrawal per <a href="https://www.sebi.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SEBI</a> nomenclature, the fund house distributes returns from realised profits at its own discretion, so the amount and timing are not guaranteed.
                      </p>
                      <p style={p}>
                        SWP gives investors more predictability and generally better tax efficiency, which is why it has become the default choice for retirement income planning over the dividend option.
                      </p>
                    </div>

                    {/* 8 */}
                    <div style={sec} id="swp-tax">
                      <h2 style={h2}>How is SWP taxed?</h2>
                      <p style={p}>
                        Every SWP withdrawal is treated as a partial redemption of units and taxed on the gain portion, not the full withdrawal amount. For equity mutual funds, units held over 12 months are taxed at 12.5% as long-term capital gains, with the first Rs 1.25 lakh of gains in a financial year exempt. Units held under 12 months are taxed at 20% as short-term gains.
                      </p>
                      <p style={p}>
                        For debt mutual funds, all gains from an SWP are added to your income and taxed at your applicable slab rate, per the Finance Act 2023 amendment that removed indexation benefits on debt funds. Check the latest capital gains provisions on the <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Department</a> website.
                      </p>
                    </div>

                    {/* 9 */}
                    <div style={sec} id="how-to-use">
                      <h2 style={h2}>How to use this calculator</h2>
                      <div>
                        {[
                          <><strong>Total Investment Corpus:</strong> enter the amount you already have invested, or plan to invest, before withdrawals begin.</>,
                          <><strong>Monthly Withdrawal:</strong> enter the fixed amount you want to withdraw each month at the start of your plan.</>,
                          <><strong>Expected Return Rate:</strong> use a realistic assumption. 10 to 12% for equity-oriented portfolios, 6 to 8% for debt or conservative hybrid portfolios.</>,
                          <><strong>Time Period:</strong> set how many years you want to model. If your corpus depletes earlier, the schedule stops there and shows you exactly when.</>,
                          <><strong>More settings:</strong> turn on step-up if you want your withdrawal to grow every year, and set the percentage. Use your expected inflation rate to keep pace with rising costs.</>,
                        ].map((t, i) => (
                          <div key={i} style={bullet}>
                            <span style={{ flexShrink: 0, marginTop: 3 }}>&#8226;</span>
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                      <p style={{ ...p, marginTop: 16 }}>
                        The results panel updates live as you adjust any input, with no sign-up required to run a calculation. Creating a free account saves your last calculation so it loads automatically the next time you visit.
                      </p>
                    </div>

                    

                    {/* 10 */}
                    <div style={sec} id="faq">
                      <h2 style={h2}>Frequently asked questions</h2>
                      <FAQ />
                    </div>
                  </>
                );
              })()}
            </article>

          </div>

          {/* SIDEBAR */}
          <style>{`.swp-sidebar::-webkit-scrollbar{width:5px}.swp-sidebar::-webkit-scrollbar-track{background:transparent}.swp-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.swp-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="swp-sidebar" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <SidebarList title="Popular Calculators" items={POPULAR} />
              <SidebarList title="Retirement Planning" items={RETIREMENT} />
            </div>
          </aside>

        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/percentage-calculator|%', '/calculators/gst-calculator|GST', '/calculators/loan-calculator|Loan', '/calculators/sip-calculator|SIP', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/swp-calculator|SWP', '/calculators/emi-calculator|EMI', '/calculators/home-loan-calculator|Home Loan', '/calculators/mortgage-calculator|Mortgage', '/calculators/car-loan-calculator|Car Loan', '/calculators/fd-calculator|FD', '/calculators/compound-interest-calculator|Compound Int.', '/calculators/gratuity-calculator|Gratuity'] },
        { hd: 'Topics', links: ['/#|Mutual Funds', '/#|Home Loans', '/#|Fixed Deposits', '/#|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

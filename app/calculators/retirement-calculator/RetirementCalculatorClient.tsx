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

/* ─── Palette ────────────────────────────────────────────────── */
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

/* ─── Math ──────────────────────────────────────────────────── */
function calcRetirement(age: number, expense: number, lifestyleMult: number, preRetireReturn: number) {
  const retireAge: number = 60;
  const lifeExpectancy: number = 85;
  const inflation: number = 0.06;
  const postRetireReturn: number = 0.07;
  
  const yearsToRetire = Math.max(0, retireAge - age);
  const yearsInRetirement = Math.max(0, lifeExpectancy - retireAge);
  
  if (yearsToRetire === 0 || yearsInRetirement === 0) {
    return { corpus: 0, monthlySip: 0, months: 0 };
  }

  // Future Monthly Expense at age 60
  const futureMonthlyExpense = expense * lifestyleMult * Math.pow(1 + inflation, yearsToRetire);
  const annualFutureExpense = futureMonthlyExpense * 12;

  // Present Value of Growing Annuity (Corpus Required)
  const g = inflation;
  const r = postRetireReturn;
  let corpus = 0;
  if (r === g) {
    corpus = annualFutureExpense * yearsInRetirement;
  } else {
    corpus = annualFutureExpense * (1 - Math.pow((1 + g) / (1 + r), yearsInRetirement)) / (r - g);
  }

  // Monthly SIP needed to reach Corpus
  const months = yearsToRetire * 12;
  const i = preRetireReturn / 100 / 12;
  
  let monthlySip = 0;
  if (i === 0) {
    monthlySip = corpus / months;
  } else {
    // FV = SIP * (((1+i)^n - 1) / i) * (1+i)
    monthlySip = corpus / ((((Math.pow(1 + i, months) - 1) / i)) * (1 + i));
  }

  return { corpus, monthlySip, months };
}

type GrowthRow = { year: number; opening: number; contribution: number; growth: number; closing: number };

function buildRetirementSchedule(age: number, monthlySip: number, preRetireReturn: number): GrowthRow[] {
  const retireAge = 60;
  const yearsToRetire = Math.max(0, retireAge - age);
  if (yearsToRetire === 0 || monthlySip <= 0) return [];
  const i = preRetireReturn / 100 / 12;
  const rows: GrowthRow[] = [];
  const startYear = new Date().getFullYear();
  let balance = 0;
  for (let y = 0; y < yearsToRetire; y++) {
    const opening = balance;
    let contribThisYear = 0;
    for (let m = 0; m < 12; m++) {
      balance += monthlySip;
      contribThisYear += monthlySip;
      balance += i === 0 ? 0 : balance * i;
    }
    const growthThisYear = balance - opening - contribThisYear;
    rows.push({ year: startYear + y, opening, contribution: contribThisYear, growth: growthThisYear, closing: balance });
  }
  return rows;
}

/* ─── Bar Chart ──────────────────────────────────────────────── */
function BarChart({ rows }: { rows: GrowthRow[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxAnnual = Math.max(...rows.map(r => r.contribution + r.growth));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;
  return (
    <svg role="img" aria-label="Year-by-year contribution and growth breakdown"
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {rows.map((row, idx) => {
        const total = row.contribution + row.growth;
        const totalH = maxAnnual > 0 ? (total / maxAnnual) * H : 0;
        const contribH = total > 0 ? (row.contribution / total) * totalH : 0;
        const growthH = totalH - contribH;
        const x = PADL + idx * slot + gap;
        return (
          <g key={row.year}>
            <rect x={x} y={H - totalH} width={barW} height={growthH} fill={CHART_PAIR.secondary} rx={2} />
            <rect x={x} y={H - contribH} width={barW} height={contribH} fill={CHART_PAIR.primary} rx={2} />
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

/* ─── Components ─────────────────────────────────────────────── */
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

function RadioGroup({ label, options, value, onChange, compact }: {
  label: string; options: { label: string; value: any; subtext?: string }[]; value: any; onChange: (v: any) => void; compact?: boolean;
}) {
  return (
    <div style={{ marginBottom: compact ? 18 : 40 }}>
      <label style={{ display: 'block', fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400, marginBottom: compact ? 10 : 16 }}>{label}</label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {options.map(opt => {
          const active = value === opt.value;
          return (
            <button key={opt.label} onClick={() => onChange(opt.value)}
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', background: active ? C.paleLime : C.white, border: `1.5px solid ${active ? C.lime2 : C.border}`, borderRadius: 10, cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left' }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${active ? C.dark : '#ccc'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {active && <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.dark }} />}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: active ? 700 : 500, color: C.ink, fontFamily: INTER }}>{opt.label}</div>
                {opt.subtext && <div style={{ fontSize: 12, color: C.ink3, marginTop: 2, fontFamily: INTER }}>{opt.subtext}</div>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}


function DonutChart({ contribution, growth }: { contribution: number; growth: number }) {
  const total = contribution + growth;
  if (total <= 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const pArc = (contribution / total) * circ;
  const pPct = Math.round((contribution / total) * 100);
  return (
    <svg width="216" height="216" viewBox="0 0 216 216" style={{ display: 'block' }} role="img" aria-label={`Your contribution: ${pPct}%, investment growth: ${100 - pPct}%`}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Your Contribution</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
  );
}

function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={label} href={href} style={{ textDecoration: 'none', display: 'block' }}>
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
  { href: '/calculators/sip-calculator',        label: 'SIP Calculator' },
  { href: '/calculators/nps-calculator',        label: 'NPS Calculator' },
  { href: '/calculators/ppf-calculator',        label: 'PPF Calculator' },
  { href: '/calculators/apy-calculator',        label: 'Atal Pension Yojana Calculator' },
  { href: '/calculators/annuity-income-calculator', label: 'Annuity Income Calculator' },
  { href: '/calculators/epf-calculator',        label: 'EPF Calculator' },
  { href: '/calculators/gratuity-calculator',   label: 'Gratuity Calculator' },
];
const MORE = [
  { href: '/calculators/swp-calculator',                label: 'SWP Calculator' },
  { href: '/calculators/fd-calculator',                 label: 'FD Calculator' },
  { href: '/calculators/lumpsum-calculator',            label: 'Lumpsum Calculator' },
  { href: '/calculators/compound-interest-calculator',  label: 'Compound Interest Calculator' },
  { href: '/calculators/step-up-sip-calculator',        label: 'Step-Up SIP Calculator' },
  { href: '/calculators/inflation-calculator',          label: 'Inflation Calculator' },
];

/* ─── FAQ ───────────────────────────────────────────────────── */
const FAQS = [
  { q: 'What is a good retirement corpus in India?', a: 'A "good" corpus entirely depends on your post-retirement monthly expenses. Financial advisors generally recommend accumulating 25 to 30 times your annual post-retirement expenses. This calculator does that math for you by factoring in inflation to give you an exact target figure.' },
  { q: 'How does inflation affect my retirement savings?', a: 'Inflation reduces the purchasing power of your money over time. Assuming an average inflation of 6%, something that costs Rs. 50,000 today will cost nearly Rs. 1,60,000 in 20 years. Retirement planning must account for both pre-retirement and post-retirement inflation to ensure your money does not run out.' },
  { q: 'How does this retirement calculator work out my corpus and monthly SIP?', a: 'The calculator first inflates your current monthly expenses to their value at retirement age using the 6% inflation assumption, then finds the present value of a growing annuity for your years in retirement, growing each year with inflation and discounted at the 7% post-retirement return. That present value is your target corpus. The monthly SIP is then the amount that, invested every month at your chosen pre-retirement return until retirement, grows to exactly that corpus, using the standard SIP future value formula.' },
  { q: 'Where should I invest for retirement?', a: 'Your investment strategy should ideally shift as you age. In your 20s and 30s, you can afford to be "Aggressive" with high allocations in equity mutual funds. As you near retirement (in your 50s), shifting a significant portion to "Safe" assets like FDs, PPF, and debt funds is recommended to protect your accumulated wealth.' },
  { q: 'Is EPF alone enough for retirement?', a: 'The Employee Provident Fund is an excellent tax-saving and fixed-income instrument, but relying on it alone is rarely enough because of inflation and rising healthcare costs. Supplementing EPF with equity investments, such as mutual funds through SIPs, is usually needed to build a corpus large enough to sustain your expenses.' },
  { q: 'What is the difference between a retirement calculator and a pension calculator?', a: 'A retirement calculator like this one works out the total corpus you need to fund your own expenses after you stop working, and the monthly SIP to build it. A pension calculator is narrower: it estimates the payout from a specific pension product, such as NPS or the Atal Pension Yojana, based on your contributions to that scheme. Most people need the broader retirement calculation first, since a pension is usually only one part of total retirement income.' },
  { q: 'How much of my income should I save for retirement?', a: 'A commonly used starting point is saving at least 15 to 20% of your income towards retirement, increasing this share as your income grows. The exact figure depends more on how many years you have left until retirement and your desired lifestyle than on a single fixed rule, which is why calculating your specific target corpus is more useful than following a generic percentage.' },
  { q: 'Does NPS count towards my retirement corpus?', a: 'Yes. The National Pension System is one of the main retirement-specific investment vehicles in India, alongside EPF, PPF, and mutual fund SIPs. Any amount you already hold or plan to contribute to NPS should be counted as part of your total retirement savings when working out how much more you still need to save.' },
  { q: 'What return rate should I assume for retirement planning?', a: 'The right assumption depends on how your money is actually invested. A portfolio mostly in equity mutual funds has historically supported a higher long-term assumption than one mostly in fixed-income instruments like PPF or FDs. This calculator lets you pick between a Safe, Balanced, or Aggressive investment style, each using a different assumed return, so the projection matches how you actually plan to invest.' },
  { q: 'Can I retire before age 60 in India?', a: 'Yes, nothing prevents early retirement, but retiring earlier means your savings have fewer years to grow and need to last more years in retirement, both of which significantly increase the monthly SIP required today. Anyone targeting early retirement should treat the corpus and monthly savings figures from a calculator like this as a minimum, and revisit them regularly as actual returns and expenses become clearer.' },
  { q: 'What is the current EPF interest rate for FY 2025-26?', a: 'EPFO has notified an 8.25% interest rate on EPF deposits for FY 2025-26, the third year in a row at this level, with interest credited to member accounts by mid-July 2026. This is the rate used by the EPF Calculator for projecting your provident fund balance.' },
  { q: 'What is the current PPF interest rate?', a: 'PPF currently earns 7.1% per annum, a rate that has stayed unchanged since the April-June 2020 quarter, the longest stable run in the scheme\'s history. The government reviews and notifies small savings rates, including PPF, every quarter, so check the PPF Calculator for the rate applicable when you actually invest.' },
  { q: 'How many times can I withdraw partially from my NPS account before retirement?', a: 'PFRDA rules allow up to three partial withdrawals over the life of an NPS account, and only after you have been a member for at least three years. Each withdrawal is capped at 25% of your own contributions and is limited to specific purposes such as a child\'s higher education or marriage, or buying or building a home.' },
  { q: 'Has the government changed the retirement age for central government employees?', a: 'No. The standard retirement age for central government employees remains 60 years under Fundamental Rule 56(a), and as of 2026 there is no official proposal to raise it to 62. Specific categories such as judges, teachers, and doctors can have different, department-specific retirement ages, but 60 remains the general benchmark this calculator uses by default.' },
  { q: 'Is all my EPF interest tax-free?', a: 'Not entirely. Interest earned on your own EPF and VPF contributions is tax-free only up to Rs. 2.5 lakh combined per year; interest on contributions above that threshold is taxed as regular income, with TDS deducted. This mainly affects high earners who elect a large voluntary PF contribution on top of the mandatory 12%.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform built for India. All calculators are free to use, with a free account available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.' },
];
function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ════════════════════════════════════════════════════════════ */

export default function RetirementCalculatorClient() {
  const defaultSettings = { age: 30, expense: 50000, lifestyle: 1.0, investStyle: 12 };
  const { settings, updateSettings } = useCalculatorSettings('retirement-calculator', defaultSettings);
  const { age, expense, lifestyle, investStyle } = settings;
  const setAge = (v: any) => updateSettings({ age: typeof v === 'function' ? v(settings.age) : v });
  const setExpense = (v: any) => updateSettings({ expense: typeof v === 'function' ? v(settings.expense) : v });
  const setLifestyle = (v: any) => updateSettings({ lifestyle: typeof v === 'function' ? v(settings.lifestyle) : v });
  const setInvestStyle = (v: any) => updateSettings({ investStyle: typeof v === 'function' ? v(settings.investStyle) : v });
        const [mobile,      setMobile]      = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();

  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const { corpus, monthlySip, months } = useMemo(() => calcRetirement(age, expense, lifestyle, investStyle), [age, expense, lifestyle, investStyle]);
  const contribution = Math.min(corpus, monthlySip * months);
  const growth = Math.max(0, corpus - contribution);
  const contribPct = corpus > 0 ? Math.round((contribution / corpus) * 100) : 0;
  const growthPct = 100 - contribPct;
  const schedule = useMemo(() => buildRetirementSchedule(age, monthlySip, investStyle), [age, monthlySip, investStyle]);
  const [showTable, setShowTable] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const yearsToRetire = Math.max(0, 60 - age);

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      {/* NAV */}
      <PageNav />

      {/* BODY */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 28px', letterSpacing: '-0.025em' }}>Retirement Calculator</h1>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          {/* LEFT */}
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1.2fr 1fr' }}>

                <div style={{ padding: mobile ? '16px 18px' : '40px 40px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
                    {!mobile ? (
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{showAdvanced ? 'More Settings' : 'Your Details'}</p>
                    ) : (
                      <div />
                    )}
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider label="How old are you?" value={age} min={18} max={59} step={1}
                        fmt={v => `${v} Yr`} onChange={setAge} compact={mobile} />
                      <Slider label="Current Monthly Expenses" value={expense} min={5000} max={1000000} step={5000}
                        fmt={v => fmtC(v)} onChange={setExpense} compact={mobile} />

                      <RadioGroup
                        label="What kind of retirement do you want?"
                        value={lifestyle}
                        onChange={setLifestyle}
                        options={[
                          { label: 'Like a King', value: 1.5, subtext: '150% of current expenses' },
                          { label: 'Happy the way I am', value: 1.0, subtext: '100% of current expenses' },
                          { label: 'Like a Monk', value: 0.7, subtext: '70% of current expenses' },
                        ]}
                        compact={mobile}
                      />

                      <button onClick={() => setShowAdvanced(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        More settings
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <RadioGroup
                        label="Where are you saving for your retirement?"
                        value={investStyle}
                        onChange={setInvestStyle}
                        options={[
                          { label: 'Safe', value: 8, subtext: 'PF, FD, etc. (~8% return)' },
                          { label: 'Balanced', value: 10, subtext: 'Mix of Debt and Equity (~10% return)' },
                          { label: 'Aggressive', value: 12, subtext: 'Mutual Funds, Equity, etc. (~12% return)' },
                        ]}
                        compact={mobile}
                      />

                      <button onClick={() => setShowAdvanced(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        Back
                      </button>
                    </>
                  )}

                </div>

                {/* Results panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', marginBottom: 8 }}>
                    <div style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C', marginBottom: 6 }}>Corpus required for retirement</div>
                    <div aria-live="polite" aria-label={`Corpus required: ${fmtIN(corpus)}`}
                      style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {fmtIN(corpus)}
                    </div>
                  </div>

                  {[
                    { label: 'Monthly savings needed', value: `${fmtC(monthlySip)}/mo` },
                    { label: 'Retirement Age', value: '60 Years' },
                    { label: 'Life Expectancy', value: '85 Years' },
                    { label: 'Inflation Rate', value: '6% p.a.' },
                    { label: 'Post-retire Return', value: '7% p.a.' },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    <DonutChart contribution={contribution} growth={growth} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Your Contribution {contribPct}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Investment Growth {growthPct}%</span>
                    </div>
                  </div>

                  <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Your Contribution {contribPct}%</span>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Investment Growth {growthPct}%</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`Your contribution is ${contribPct}% of the retirement corpus`}>
                      <div style={{ height: '100%', width: `${contribPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>

                </div>
              </div>

              {/* Year-by-year table */}
              {schedule.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowTable(v => !v)}
                    aria-expanded={showTable} aria-controls="retirement-growth-table"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Year-by-Year Corpus Growth</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>Compounding at {investStyle}%</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {yearsToRetire} yr · {investStyle}% rate
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showTable && (
                    <div id="retirement-growth-table" style={{ borderTop: `1px solid ${C.border}` }}>
                      <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                        <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>Contribution</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>Growth</span>
                          </div>
                        </div>
                        <BarChart rows={schedule} />
                      </div>
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
                        <table style={{ minWidth: 500, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              {['Year', 'Opening', 'Contribution', 'Growth', 'Closing'].map(h => (
                                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }} scope="col">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {schedule.map((row, i) => (
                              <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ padding: '11px 14px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                                <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtIN(row.opening)}</td>
                                <td style={{ padding: '11px 14px', color: '#1f7a58', fontWeight: 600 }}>{fmtIN(row.contribution)}</td>
                                <td style={{ padding: '11px 14px', color: '#166534', fontWeight: 700 }}>{fmtIN(row.growth)}</td>
                                <td style={{ padding: '11px 14px', color: C.ink, fontWeight: 600 }}>{fmtIN(row.closing)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* ARTICLE */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>
            <article style={{ fontFamily: INTER }}>
              {(() => {
                const h2 = { fontSize: mobile ? 18 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
                const p  = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
                const sec = { margin: '0 0 40px' } as React.CSSProperties;
                const bullet = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 } as React.CSSProperties;
                return (
                  <>
                    <div style={sec}>
                      <h2 style={h2}>Plan for a Comfortable Retirement</h2>
                      <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                        <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                          A retirement corpus is the total lump sum you need to have saved by your retirement age so that withdrawing from it every year, adjusted for inflation, can cover your living expenses for the rest of your life without running out.
                        </p>
                      </div>
                      <p style={p}>
                        Retiring comfortably is entirely possible if you systematically save and invest wisely during your active working years. A core part of financial independence involves estimating your future expenses and creating a targeted investment strategy to reach that goal. This is where an online <strong>Retirement Calculator</strong> becomes an essential tool.
                      </p>
                      <p style={p}>
                        Retirement planning matters most for salaried and self-employed Indians, where social security is limited. Your <a href="https://www.epfo.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>EPFO</a>-administered EPF and NPS already cover part of the gap, projected separately by the <Link href="/calculators/epf-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>EPF Calculator</Link> and <Link href="/calculators/nps-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>NPS Calculator</Link>. Knowing exactly how much more you need beyond them is what brings real clarity to your savings plan.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 style={h2}>How does this Retirement Calculator help you?</h2>
                      <p style={p}>
                        Our retirement calculator is designed to provide actionable financial insights to help secure your future. It benefits you in several ways:
                      </p>
                      <div>
                        {[
                          'Identifies Your Target Corpus: It calculates the exact lump sum amount you need to maintain your desired lifestyle after retirement, factoring in inflation.',
                          'Determines Monthly Savings: It tells you exactly how much you need to invest every month (like a SIP) from today until your retirement age to reach your corpus goal.',
                          'Accounts for Inflation: Inflation erodes purchasing power. This calculator adjusts your current expenses to their future value so you don\'t fall short of funds.',
                          'Scenario Analysis: You can instantly compare how saving aggressively versus safely changes your monthly investment requirements.',
                        ].map((t, i) => (
                          <div key={i} style={bullet}>
                            <span style={{ flexShrink: 0, marginTop: 3 }}>&#8226;</span>
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={sec}>
                      <h2 style={h2}>Understanding the Calculation Logic</h2>
                      <p style={p}>
                        The calculator uses the compound interest and present value of growing annuity formulas to ensure highly accurate projections.
                      </p>
                      <p style={p}>
                        First, it takes your current monthly expenses and inflates them to your retirement age (defaulted at 60 years) assuming a standard 6% inflation rate. For example, if your current monthly expense is Rs. 50,000 and you are 30 years old, the cost of the same lifestyle at age 60 will be significantly higher.
                      </p>
                      <p style={p}>
                        Next, it calculates the total corpus required to sustain this inflated lifestyle from age 60 up to an assumed life expectancy of 85 years (25 years in retirement). We conservatively assume your retirement corpus will yield a safe 7% return while continuing to face 6% inflation post-retirement. 
                      </p>
                      <p style={p}>
                        Finally, based on your chosen pre-retirement investment strategy (Safe at 8%, Balanced at 10%, or Aggressive at 12%), it calculates the monthly SIP required today to build that corpus.
                      </p>
                    </div>

                    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Step-Up SIP Calculator</p>
                        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>See how increasing your monthly SIP each year can shrink the gap to your retirement corpus faster than a flat monthly amount.</p>
                      </div>
                      <Link className="fx-btn" href="/calculators/step-up-sip-calculator" target="_blank" rel="noopener noreferrer"
                        style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                    </div>

                    <div style={sec}>
                      <h2 style={h2}>Why is earlier better?</h2>
                      <p style={p}>
                        The magic of compounding heavily favors those who start early. A 25-year-old and a 40-year-old aiming for the exact same retirement corpus will have drastically different monthly savings requirements. The 40-year-old will have to save exponentially more each month to catch up. By using our retirement planning calculator today, you can leverage time to let your money work for you, requiring smaller out-of-pocket investments over the long term.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 style={h2}>Common Sources of Retirement Income in India</h2>
                      <p style={p}>
                        Most people in India build their retirement corpus from a mix of instruments rather than a single one. Each has a different structure, and this calculator's corpus and SIP targets are meant to be filled by whichever combination fits your situation.
                      </p>
                      <div style={bullet}>
                        <span style={{ flexShrink: 0, marginTop: 3 }}>&#8226;</span>
                        <span><strong>Employee Provident Fund (EPF):</strong> Mandatory for most salaried employees, with contributions matched by the employer and administered by the EPFO. Check the <Link href="/calculators/epf-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>EPF Calculator</Link> for a standalone projection.</span>
                      </div>
                      <div style={bullet}>
                        <span style={{ flexShrink: 0, marginTop: 3 }}>&#8226;</span>
                        <span><strong>Public Provident Fund (PPF):</strong> Open to anyone, including the self-employed, with a fixed lock-in and a government-set interest rate reviewed every quarter. The <Link href="/calculators/ppf-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>PPF Calculator</Link> shows the current rate and maturity value.</span>
                      </div>
                      <div style={bullet}>
                        <span style={{ flexShrink: 0, marginTop: 3 }}>&#8226;</span>
                        <span><strong>National Pension System (NPS):</strong> Market-linked, regulated by the PFRDA, and allows a mix of equity, corporate debt, and government securities that can be rebalanced by age. The <Link href="/calculators/nps-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>NPS Calculator</Link> projects the maturity corpus and annuity split.</span>
                      </div>
                      <div style={bullet}>
                        <span style={{ flexShrink: 0, marginTop: 3 }}>&#8226;</span>
                        <span><strong>Equity mutual fund SIPs:</strong> Not retirement-specific, but the most commonly used instrument to bridge the gap this calculator identifies, since a SIP has no lock-in and lets you choose the underlying fund and risk level directly.</span>
                      </div>
                    </div>

                    <div style={sec}>
                      <h2 style={h2}>Retirement Planning Mistakes That Shrink Your Corpus</h2>
                      <p style={p}>
                        Certain habits consistently work against the corpus this calculator projects, regardless of the return rate assumed.
                      </p>
                      <div style={bullet}>
                        <span style={{ flexShrink: 0, marginTop: 3 }}>&#8226;</span>
                        <span><strong>Starting late:</strong> Delaying by even five to ten years forces a much higher monthly SIP later, since there are fewer years left for compounding to do the work. Re-run this calculator with a slightly older age to see the exact jump.</span>
                      </div>
                      <div style={bullet}>
                        <span style={{ flexShrink: 0, marginTop: 3 }}>&#8226;</span>
                        <span><strong>Ignoring inflation:</strong> Planning around today's expenses instead of their inflated value at retirement age is one of the most common ways people undersave, since a target set in today's rupees is guaranteed to fall short decades later.</span>
                      </div>
                      <div style={bullet}>
                        <span style={{ flexShrink: 0, marginTop: 3 }}>&#8226;</span>
                        <span><strong>Withdrawing from retirement savings early:</strong> Breaking into EPF, PPF, or NPS before retirement for an unrelated goal, such as a home down payment, resets the compounding clock on that withdrawn amount.</span>
                      </div>
                      <div style={bullet}>
                        <span style={{ flexShrink: 0, marginTop: 3 }}>&#8226;</span>
                        <span><strong>Staying entirely in fixed-income instruments for decades:</strong> A portfolio that never holds any equity allocation tends to grow slower over a long working life than one that shifts toward equity early and back toward safety only closer to retirement.</span>
                      </div>
                    </div>

                    <div style={sec}>
                      <h2 style={h2}>How to Use This Retirement Calculator</h2>
                      <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12, listStyleType: 'decimal' }}>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Current Age:</strong> Enter how old you are today. The calculator assumes a fixed retirement age of 60, so this sets how many years you have left to save.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Current Monthly Expenses:</strong> Enter what you spend monthly today. This gets inflated to your retirement age to estimate your future cost of living.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Lifestyle:</strong> Choose whether your retirement spending will exceed, match, or fall below your current expenses.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Investment Style:</strong> Under More settings, pick Safe, Balanced, or Aggressive to set the return rate used for the monthly SIP calculation.
                        </li>
                      </ol>
                    </div>

                    <div style={sec}>
                      <h2 style={h2}>Limitations of This Calculator</h2>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <p style={p}>
                          <strong style={{ color: C.ink }}>Retirement age and life expectancy are fixed, not adjustable.</strong> The corpus target always assumes retirement at 60 and a life expectancy of 85. If you plan to retire earlier or later, treat the monthly SIP figure as an approximation rather than an exact number.
                        </p>
                        <p style={p}>
                          <strong style={{ color: C.ink }}>It does not account for savings you already have.</strong> The corpus and monthly SIP shown are the full amounts needed from zero. If you already hold EPF, PPF, NPS, or other investments earmarked for retirement, subtract their projected future value from the corpus shown here to find your real remaining gap.
                        </p>
                        <p style={p}>
                          <strong style={{ color: C.ink }}>A single flat return rate does not reflect real market volatility.</strong> The Safe, Balanced, and Aggressive options use one constant annual return for the entire period leading up to retirement, while actual equity and debt returns vary year to year.
                        </p>
                        <p style={p}>
                          <strong style={{ color: C.ink }}>Other retirement income is not modeled.</strong> Rental income, a pension from a specific employer, or an annuity you already hold are not factored into the corpus target, since those are highly individual and cannot be assumed by default.
                        </p>
                      </div>
                    </div>


                    <div style={{ margin: '0 0 40px' }}>
                      <h2 style={h2}>Frequently Asked Questions (FAQs)</h2>
            <FAQ />
                    </div>
                  </>
                );
              })()}
            </article>

          </div>

          {/* SIDEBAR */}
          <style>{`.retirement-sidebar::-webkit-scrollbar{width:5px}.retirement-sidebar::-webkit-scrollbar-track{background:transparent}.retirement-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.retirement-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="retirement-sidebar" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <SidebarList title="Popular Calculators" items={POPULAR} />
                <SidebarList title="More Calculators" items={MORE} />
            </div>
          </aside>

        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/percentage-calculator|%', '/calculators/gst-calculator|GST', '/calculators/sip-calculator|SIP', '/calculators/emi-calculator|EMI', '/calculators/retirement-calculator|Retirement', '/calculators/home-loan-calculator|Home Loan', '/calculators/fd-calculator|FD'] },
        { hd: 'Topics', links: ['/#|Mutual Funds', '/#|Home Loans', '/#|Fixed Deposits', '/#|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} />
    </div>
  );
}

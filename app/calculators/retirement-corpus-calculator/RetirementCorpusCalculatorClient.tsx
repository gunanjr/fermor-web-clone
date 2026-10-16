'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useEffect, useLayoutEffect, useId, useMemo } from 'react';
import Link from 'next/link';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { useCurrency } from '../../../src/hooks/useCurrency';
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

/* ── Donut chart ─────────────────────────────────────── */
function DonutChart({ yourMoneyPct, returnsPct, corpusLabel }: {
  yourMoneyPct: number; returnsPct: number; corpusLabel: string;
}) {
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const yourArc = Math.max(0, Math.min((yourMoneyPct / 100) * circ, circ));
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Corpus split: ${yourMoneyPct.toFixed(0)}% your SIP contributions, ${returnsPct.toFixed(0)}% investment returns`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${yourArc.toFixed(2)} ${(circ - yourArc).toFixed(2)}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 12} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Corpus needed</text>
      <text x={cx} y={cy + 16} textAnchor="middle" style={{ fontSize: 14, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{corpusLabel}</text>
    </svg>
  );
}

/* ── Slider ──────────────────────────────────────────── */
function Slider({ label, id: idProp, value, min, max, step, display, onChange, compact }: {
  label: string; id?: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (v: number) => void; compact?: boolean;
}) {
  const autoId = useId();
  const inputId = idProp || autoId;
  const rangeId = `${inputId}-range`;
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 8 : 12 }}>
        {label
          ? <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 13.5 : 14.5, color: C.ink2, fontWeight: 400, fontFamily: INTER }}>{label}</label>
          : <span />
        }
        {editing ? (
          <input id={inputId} autoFocus value={raw} aria-label={`Enter ${label} value`}
            onChange={e => setRaw(e.target.value)} onBlur={commit}
            onKeyDown={e => e.key === 'Enter' && commit()}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 130, outline: 'none', color: C.dark, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${display}. Click to edit.`}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}
            style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: C.dark, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 18px', cursor: 'pointer', fontFamily: INTER, minWidth: compact ? 88 : 110, textAlign: 'center', transition: 'border-color 0.15s', letterSpacing: '-0.01em' }}>
            {display}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 20, height: 20, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 2px 8px rgba(16,18,20,0.22)', pointerEvents: 'none', zIndex: 1 }} />
        <input id={rangeId} type="range" min={min} max={max} step={step} value={value}
          aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
          onChange={e => onChange(+e.target.value)}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontSize: 11, color: C.ink3 }}>{min}</span>
        <span style={{ fontSize: 11, color: C.ink3 }}>{max}</span>
      </div>
    </div>
  );
}

/* ── SidebarList ─────────────────────────────────────── */
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

/* ── RetirementSnapshot ──────────────────────────────── */
function RetirementSnapshot() {
  const rows = [
    { label: 'SCSS interest rate',            value: '8.2% p.a.' },
    { label: 'PPF interest rate',             value: '7.1% p.a.' },
    { label: 'EPF interest rate',             value: '8.25% p.a.' },
    { label: 'NPS extra deduction (80CCD1B)', value: 'Rs 50,000' },
    { label: 'EPF employer contribution',     value: '12% of basic' },
    { label: 'EPF/VPF tax-free interest cap', value: 'Rs 2.5 L/yr' },
    { label: 'Gratuity tax exemption limit',  value: 'Rs 20 L' },
    { label: 'Safe withdrawal rate (India)',  value: '3-3.5%' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Retirement Quick Facts</span>
      </div>
      {rows.map((r, i) => (
        <div key={r.label} style={{ padding: '11px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: C.white, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12.5, color: C.ink2 }}>{r.label}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.ink, whiteSpace: 'nowrap' }}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ── RelatedReads ────────────────────────────────────── */
function RelatedReads() {
  const links = [
    { href: '/news/nps-vs-epf-which-is-better-for-retirement', label: 'NPS vs EPF: Which Is Better for Retirement?' },
    { href: '/news/senior-citizens-savings-scheme-scss-2025', label: 'SCSS 2025: Interest Rate, Eligibility, How to Open' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Related Reads</span>
      </div>
      {links.map((l, i) => (
        <Link key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', padding: '13px 16px', borderBottom: i < links.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: C.white }}>
          <span style={{ fontSize: 13, color: C.dark, fontWeight: 500, lineHeight: 1.5, display: 'block' }}>{l.label}</span>
        </Link>
      ))}
    </div>
  );
}

/* ── CA CTA ──────────────────────────────────────────── */

const POPULAR = [
  { href: '/calculators/sip-calculator',                      label: 'SIP Calculator' },
  { href: '/calculators/nps-calculator',                      label: 'NPS Calculator' },
  { href: '/calculators/epf-calculator',                      label: 'EPF Calculator' },
  { href: '/calculators/ppf-calculator',                      label: 'PPF Calculator' },
  { href: '/calculators/fd-calculator',                       label: 'FD Calculator' },
  { href: '/calculators/step-up-sip-calculator',              label: 'Step-up SIP Calculator' },
  { href: '/calculators/swp-calculator',                      label: 'SWP Calculator' },
];
const MORE = [
  { href: '/calculators/real-return-calculator',              label: 'Real Return Calculator' },
  { href: '/calculators/emergency-fund-calculator',            label: 'Emergency Fund Calculator' },
  { href: '/calculators/savings-account-interest-calculator', label: 'Savings Interest Calculator' },
  { href: '/calculators/term-insurance-calculator',           label: 'Term Insurance Calculator' },
  { href: '/calculators/home-loan-eligibility-calculator',    label: 'Home Loan Eligibility' },
  { href: '/calculators/cagr-calculator',                     label: 'CAGR Calculator' },
];

/* ── FAQ ──────────────────────────────────────────────── */
function FAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  return <FAQBox items={faqs} />;
}

/* ── Article style constants ─────────────────────────── */
const h2S: React.CSSProperties = { fontSize: 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' };
const pS:  React.CSSProperties = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' };
const secS: React.CSSProperties = { margin: '0 0 44px' };
const thS: React.CSSProperties = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', verticalAlign: 'middle', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' };
const tdL: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'left', border: `1px solid ${C.border}`, verticalAlign: 'middle' };
const tdR: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, textAlign: 'left', border: `1px solid ${C.border}`, verticalAlign: 'middle' };

/* ════════════════════════════════════════════════════ */
export default function RetirementCorpusCalculatorClient({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [mobile, setMobile] = useState(false);
  const [showTable, setShowTable] = useState(false);
  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));

  /* ── State ────────────────────────────────────────── */
  const [currentAge,       setCurrentAge]       = useState(30);
  const [retireAge,        setRetireAge]        = useState(60);
  const [lifeExpectancy,   setLifeExpectancy]   = useState(85);
  const [monthlyExpense,   setMonthlyExpense]   = useState(50000);
  const [inflation,        setInflation]        = useState(6);
  const [postRetireReturn, setPostRetireReturn] = useState(8);
  const [showAdvanced,     setShowAdvanced]     = useState(false);
  const [hydrated,         setHydrated]         = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('fermor-retirement-corpus-v1');
      if (raw) {
        const d = JSON.parse(raw);
        if (typeof d.currentAge       === 'number') setCurrentAge(d.currentAge);
        if (typeof d.retireAge        === 'number') setRetireAge(d.retireAge);
        if (typeof d.lifeExpectancy   === 'number') setLifeExpectancy(d.lifeExpectancy);
        if (typeof d.monthlyExpense   === 'number') setMonthlyExpense(d.monthlyExpense);
        if (typeof d.inflation        === 'number') setInflation(d.inflation);
        if (typeof d.postRetireReturn === 'number') setPostRetireReturn(d.postRetireReturn);
      }
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem('fermor-retirement-corpus-v1', JSON.stringify({ currentAge, retireAge, lifeExpectancy, monthlyExpense, inflation, postRetireReturn }));
    } catch { /* ignore */ }
  }, [currentAge, retireAge, lifeExpectancy, monthlyExpense, inflation, postRetireReturn, hydrated]);

  /* ── Math ─────────────────────────────────────────── */
  const result = useMemo(() => {
    const yearsToRetire  = Math.max(1, retireAge - currentAge);
    const retireDuration = Math.max(1, lifeExpectancy - retireAge);
    const monthsToRetire = yearsToRetire * 12;
    const retireMonths   = retireDuration * 12;
    const expenseAtRetire = monthlyExpense * Math.pow(1 + inflation / 100, yearsToRetire);
    const g = inflation / 1200;
    const r = postRetireReturn / 1200;
    const n = retireMonths;
    const corpus = Math.abs(r - g) < 1e-9
      ? expenseAtRetire * n
      : expenseAtRetire * (1 - Math.pow((1 + g) / (1 + r), n)) / (r - g);
    const preM = 12 / 1200;
    const sipDenom = (Math.pow(1 + preM, monthsToRetire) - 1) / preM * (1 + preM);
    const monthlySIP = corpus / sipDenom;
    const totalContributions = monthlySIP * monthsToRetire;
    const investmentGains = Math.max(0, corpus - totalContributions);
    const yourMoneyPct = Math.min(100, (totalContributions / corpus) * 100);
    const returnsPct   = Math.max(0, (investmentGains / corpus) * 100);
    return { expenseAtRetire, corpus, retireDuration, yearsToRetire, monthlySIP, totalContributions, investmentGains, yourMoneyPct, returnsPct };
  }, [currentAge, retireAge, lifeExpectancy, monthlyExpense, inflation, postRetireReturn]);

  const yearlyRows = useMemo(() => {
    const rows: { year: number; age: number; opening: number; contribution: number; returns: number; closing: number }[] = [];
    const preM = 12 / 1200;
    let balance = 0;
    const startYear = new Date().getFullYear();
    for (let i = 0; i < result.yearsToRetire; i++) {
      const opening = balance;
      let yearContrib = 0;
      let yearReturns = 0;
      for (let m = 0; m < 12; m++) {
        balance += result.monthlySIP;
        yearContrib += result.monthlySIP;
        const interest = balance * preM;
        balance += interest;
        yearReturns += interest;
      }
      rows.push({
        year: startYear + i,
        age: currentAge + i + 1,
        opening: Math.round(opening),
        contribution: Math.round(yearContrib),
        returns: Math.round(yearReturns),
        closing: Math.round(balance),
      });
    }
    return rows;
  }, [currentAge, result.yearsToRetire, result.monthlySIP]);

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <style>{`
        .rc-sidebar::-webkit-scrollbar { width: 5px; }
        .rc-sidebar::-webkit-scrollbar-track { background: transparent; }
        .rc-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .rc-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
      `}</style>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Retirement Corpus Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate exactly how much money you need to retire in India, accounting for inflation, life expectancy, and post-retirement investment returns.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── Calculator card ──────────────────── */}
            <section id="retirement-corpus-calculator" aria-label="Retirement Corpus Calculator"
              style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div style={{ padding: mobile ? '20px 18px' : '36px 36px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0, fontFamily: INTER }}>
                      {showAdvanced ? 'Advanced Settings' : 'Retirement Details'}
                    </p>
                    {showAdvanced
                      ? <button onClick={() => setShowAdvanced(false)}
                          style={{ fontSize: 12, fontWeight: 600, color: C.ink2, background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
                          Back
                        </button>
                      : <CurrencySelector theme="light" />
                    }
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider id="rc-expense" label="Current Monthly Expenses"
                        value={monthlyExpense} min={10000} max={500000} step={5000}
                        display={fmtC(monthlyExpense)} onChange={setMonthlyExpense} compact={mobile} />
                      <Slider id="rc-age" label="Current Age"
                        value={currentAge} min={20} max={55} step={1}
                        display={`${currentAge} yr`} onChange={v => { setCurrentAge(v); if (v >= retireAge) setRetireAge(v + 5); }} compact={mobile} />
                      <Slider id="rc-retire" label="Retirement Age"
                        value={retireAge} min={currentAge + 1} max={70} step={1}
                        display={`${retireAge} yr`} onChange={setRetireAge} compact={mobile} />
                      <Slider id="rc-life" label="Life Expectancy"
                        value={lifeExpectancy} min={retireAge + 5} max={100} step={1}
                        display={`${lifeExpectancy} yr`} onChange={setLifeExpectancy} compact={mobile} />
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button onClick={() => setShowAdvanced(true)}
                          style={{ fontSize: 12, fontWeight: 700, color: C.ink2, background: 'none', border: `1px solid ${C.border}`, borderRadius: 7, padding: '6px 14px', cursor: 'pointer', fontFamily: INTER, display: 'flex', alignItems: 'center', gap: 5 }}>
                          More settings
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Slider id="rc-inflation" label="Inflation Rate"
                        value={inflation} min={2} max={15} step={0.5}
                        display={`${inflation}%`} onChange={setInflation} compact={mobile} />
                      <Slider id="rc-postreturn" label="Post-Retirement Return"
                        value={postRetireReturn} min={4} max={15} step={0.5}
                        display={`${postRetireReturn}%`} onChange={setPostRetireReturn} compact={mobile} />
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', marginTop: 8 }}>
                        <span style={{ fontSize: 12.5, color: C.ink3, fontFamily: INTER }}>
                          Monthly SIP assumes 12% pre-retirement CAGR (equity mutual funds benchmark)
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Result panel */}
                <div style={{ padding: mobile ? '20px 18px' : '36px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  {/* Primary dark box */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '14px 18px' : '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 12 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                      <div style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Corpus Needed</div>
                      <div style={{ fontSize: mobile ? 12 : 13, color: '#7A8087' }}>{result.retireDuration} yr retirement</div>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                      <div style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', lineHeight: 1 }}
                        aria-live="polite" aria-label={`Corpus needed: ${fmtC(result.corpus)}`}>
                        {fmtC(result.corpus)}
                      </div>
                      <div style={{ fontSize: mobile ? 12 : 13, fontWeight: 600, color: '#101214' }}>
                        {fmtC(result.monthlySIP)}/mo SIP needed
                      </div>
                    </div>
                  </div>

                  {/* Donut: order -1 on desktop (renders first), 1 on mobile (renders after stats) */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 6, order: mobile ? 1 : -1 }}>
                    <DonutChart yourMoneyPct={result.yourMoneyPct} returnsPct={result.returnsPct} corpusLabel={fmtC(result.corpus)} />
                  </div>
                  {/* Legend */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 8, order: mobile ? 2 : -1, width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Your SIP ({result.yourMoneyPct.toFixed(0)}%)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Returns ({result.returnsPct.toFixed(0)}%)</span>
                    </div>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: 'Expense at Retirement',   value: fmtC(result.expenseAtRetire), note: `Per month, at ${inflation}% inflation` },
                    { label: 'Retirement Duration',     value: `${result.retireDuration} years`,       note: `Age ${retireAge} to ${lifeExpectancy}` },
                    { label: 'Years to Build Corpus',   value: `${result.yearsToRetire} years`,        note: 'Your savings horizon' },
                    { label: 'Monthly SIP Required',    value: fmtC(result.monthlySIP),       note: 'At 12% pre-retirement CAGR' },
                    { label: 'Total SIP Contributions', value: fmtC(result.totalContributions), note: 'Your money over saving period' },
                    { label: 'Investment Returns',      value: fmtC(result.investmentGains),  note: 'Compounding does the rest' },
                  ].map(({ label, value, note }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: mobile ? '8px 0' : '10px 0', borderBottom: `1px solid ${C.border}`, width: '100%', gap: 8 }}>
                      <div>
                        <span style={{ fontSize: mobile ? 12.5 : 13, color: C.ink2, display: 'block' }}>{label}</span>
                        <span style={{ fontSize: 10.5, color: C.ink3, display: 'block' }}>{note}</span>
                      </div>
                      <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 700, color: C.ink, whiteSpace: 'nowrap' }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {yearlyRows.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowTable(v => !v)}
                    aria-expanded={showTable} aria-controls="rc-growth-table"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Year-by-Year SIP Growth</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>({yearlyRows.length} years)</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {fmtC(yearlyRows[yearlyRows.length - 1].closing)}
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showTable && (
                    <div id="rc-growth-table" style={{ borderTop: `1px solid ${C.border}`, overflowX: 'auto', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
                      <table style={{ minWidth: 560, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead>
                          <tr style={{ background: '#f4f5f6' }}>
                            {['Year', 'Age', 'Opening', 'Yearly Contribution', 'Returns Earned', 'Closing'].map(h => (
                              <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }} scope="col">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {yearlyRows.map((row, i) => (
                            <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                              <td style={{ padding: '11px 14px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                              <td style={{ padding: '11px 14px', fontWeight: 600, color: C.ink2 }}>{row.age}</td>
                              <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtIN(row.opening)}</td>
                              <td style={{ padding: '11px 14px', color: '#1f7a58', fontWeight: 600 }}>{fmtIN(row.contribution)}</td>
                              <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtIN(row.returns)}</td>
                              <td style={{ padding: '11px 14px', fontWeight: 700, color: C.dark }}>{fmtIN(row.closing)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* WaitlistCard */}
            <div style={{ marginBottom: 32 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* Article */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={secS}>
                <h2 id="what-is-retirement-corpus" style={h2S}>What Is Retirement Corpus?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Retirement corpus is the total investable wealth you need at retirement to fund all living expenses for the rest of your life, without drawing down the principal. It grows with investment returns while expenses grow with inflation.
                  </p>
                </div>
                <p style={pS}>
                  A useful shortcut is the "25x rule": you need 25 times your annual expenses at retirement. For Rs 60,000/month (Rs 7.2 lakh/year) expenses, the rough corpus target is Rs 1.8 crore. This assumes a 4% safe withdrawal rate, which may be aggressive for India due to structurally higher inflation.
                </p>
                <p style={{ ...pS, margin: 0 }}>
                  This calculator uses the more precise growing annuity formula, which accounts for both inflation-driven expense growth and post-retirement investment returns simultaneously. The result is almost always different from the 25x shortcut, and increasingly diverges over longer retirements.
                </p>
              </div>

              <div style={secS}>
                <h2 id="how-corpus-is-calculated" style={h2S}>How Is Retirement Corpus Calculated? The Growing Annuity Formula</h2>
                <p style={pS}>The growing annuity formula calculates the lump sum needed to fund a series of payments that grow at inflation rate g, discounted at return rate r, for n months:</p>
                <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 18px', marginBottom: 14, fontFamily: 'monospace', fontSize: 13, lineHeight: 2 }}>
                  <div style={{ color: C.ink }}>Expense at Retirement = Current Expense x (1 + Inflation%)<sup>Years to Retire</sup></div>
                  <div style={{ color: C.ink }}>g = Annual Inflation / 1200 (monthly rate)</div>
                  <div style={{ color: C.ink }}>r = Post-Retire Return / 1200 (monthly rate)</div>
                  <div style={{ color: C.ink }}>n = Retirement Duration in months</div>
                  <div style={{ color: C.ink, fontWeight: 700 }}>Corpus = Expense at Retire x [(1 - ((1+g)/(1+r))<sup>n</sup>) / (r-g)]</div>
                </div>
                <p style={pS}>
                  Example: Rs 50,000/month today, retiring in 30 years with 6% inflation and 8% post-retirement return, 25-year retirement. Expense at retirement: Rs 50,000 x (1.06)<sup>30</sup> = Rs 2,87,175. Corpus needed: approximately Rs 6.75 crore using the growing annuity formula.
                </p>
                <p style={{ ...pS, margin: 0 }}>
                  The donut chart above shows the split between your SIP contributions (typically 10-20% of total corpus) and investment returns (80-90%). That gap is why starting early is so powerful: compound growth, not your contribution rate, builds most of your corpus.
                </p>
              </div>

              <div style={secS}>
                <h2 id="safe-withdrawal-rate" style={h2S}>What Is a Safe Withdrawal Rate in India?</h2>
                <p style={pS}>
                  The safe withdrawal rate (SWR) is the maximum percentage of your corpus you can withdraw annually without running out of money over your retirement. The US 4% rule (from the Trinity Study, 1998) does not translate directly to India.
                </p>
                <p style={pS}>
                  For India, 3-3.5% annual withdrawal is more conservative and appropriate for a 25-30 year retirement. Rs 1 crore corpus at 3% SWR supports Rs 2.5 lakh annual withdrawal (Rs 20,800/month). For FIRE scenarios covering 40+ years, 2.5-3% is more prudent.
                </p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 16px', marginBottom: 14 }}>
                  <p style={{ fontSize: 14, color: C.ink2, margin: 0, lineHeight: 1.6 }}>
                    <strong style={{ color: C.ink }}>Post-retirement portfolio strategy:</strong> A balanced allocation (60% debt, 40% equity) at age 60-70 has historically returned 8-10% in India. The Senior Citizens Savings Scheme (SCSS) currently pays 8.2% p.a., as notified by the Finance Ministry, forming a reliable debt core alongside government bonds. As you age, shift progressively toward SCSS and other government-backed instruments for capital protection.
                  </p>
                </div>
                {/* In-Content Promo Bar */}
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>NPS Calculator</p>
                    <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Estimate your NPS corpus at 60, then subtract it from your retirement corpus target to find the gap you need to fill.</p>
                  </div>
                  <Link className="fx-btn" href="/calculators/nps-calculator" target="_blank" rel="noopener noreferrer"
                    style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    Open calculator
                  </Link>
                </div>
              </div>

              <div style={secS}>
                <h2 id="fire-corpus" style={h2S}>FIRE Corpus for Early Retirement in India</h2>
                <p style={pS}>
                  FIRE (Financial Independence, Retire Early) requires a larger corpus because retirement can last 40-50 years instead of 25. Check early retirement projections in our <Link href="/calculators/fire-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>FIRE Calculator</Link> or evaluate historical price erosion using our <Link href="/calculators/inflation-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Inflation Calculator</Link>.
                </p>
                <p style={{ ...pS, margin: 0 }}>
                  For Rs 80,000/month (Rs 9.6 lakh/year) expenses, FIRE corpus is Rs 2.9-3.2 crore. Early retirement in India has additional considerations: no EPF or NPS maturity until age 60, longer equity exposure required to sustain the corpus, and rising healthcare costs in the 50-65 age band. You can also evaluate safe tax-exempt wealth compounding in our <Link href="/calculators/ppf-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>PPF Calculator</Link> or systematic income strategies in our <Link href="/calculators/swp-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SWP Calculator</Link>. Set life expectancy to 95-100 in this calculator when planning for FIRE.
                </p>
              </div>

              <div style={secS}>
                <h2 id="nps-retirement-corpus" style={h2S}>NPS and Retirement Corpus: How They Fit Together</h2>
                <p style={pS}>
                  The National Pension System (NPS) is one of the most tax-efficient retirement savings vehicles in India. Contributions up to Rs 1.5 lakh per year qualify under Section 80CCD(1), and an additional Rs 50,000 is deductible under Section 80CCD(1B), saving Rs 15,600 in tax annually for those in the 30% slab.
                </p>
                <p style={pS}>
                  Under 2026 <a href="https://www.pfrda.org.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>PFRDA</a> rules, non-government NPS subscribers can withdraw up to 80% as a lump sum, with a 20% minimum funding an annuity at roughly 5.7-8.1% p.a.
                </p>
                <p style={pS}>
                  Only 60% of the withdrawal stays tax-free under Section 10(12A); any lump sum beyond that is taxed at your slab rate. Use the{' '}
                  <Link href="/calculators/nps-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>NPS Calculator</Link>{' '}
                  to estimate your projected corpus and subtract it from this page's total.
                </p>
                <p style={{ ...pS, margin: 0 }}>
                  For EPF, the standard calculation uses 12% of basic salary from both employee and employer, compounded at the EPFO-notified 8.25% p.a. rate. Use the{' '}
                  <Link href="/calculators/epf-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>EPF Calculator</Link>{' '}
                  to project your EPF corpus, then subtract both from the total to find your mutual fund gap.
                </p>
              </div>

              <div style={secS}>
                <h2 id="corpus-by-age-table" style={h2S}>Retirement Corpus by Age and Monthly Expense</h2>
                <p style={pS}>Approximate corpus needed (6% inflation, 8% post-retirement return, retirement at 60, life expectancy 85, 12% pre-retirement CAGR):</p>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, textAlign: 'left', paddingTop: 8 }}>SIP amount assumes 12% annual CAGR. Actual results depend on exact inputs.</caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Current Age</th>
                        <th scope="col" style={thS}>Monthly Expense Today</th>
                        <th scope="col" style={thS}>Expense at Retirement</th>
                        <th scope="col" style={thS}>Corpus Needed</th>
                        <th scope="col" style={thS}>Monthly SIP Needed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['25 yrs', 'Rs 30,000', 'Rs 2.31 L/mo', 'Rs 5.42 Cr', 'Rs 8,343'],
                        ['30 yrs', 'Rs 50,000', 'Rs 2.87 L/mo', 'Rs 6.75 Cr', 'Rs 19,120'],
                        ['35 yrs', 'Rs 70,000', 'Rs 3.00 L/mo', 'Rs 7.06 Cr', 'Rs 37,209'],
                        ['40 yrs', 'Rs 1,00,000', 'Rs 3.21 L/mo', 'Rs 7.54 Cr', 'Rs 75,440'],
                        ['45 yrs', 'Rs 1,50,000', 'Rs 3.59 L/mo', 'Rs 8.45 Cr', 'Rs 1.67 L'],
                      ].map((row, i) => (
                        <tr key={row[0]} style={{ background: i % 2 === 0 ? C.white : C.bg }}>
                          <td style={tdL}>{row[0]}</td>
                          <td style={tdL}>{row[1]}</td>
                          <td style={tdR}>{row[2]}</td>
                          <td style={tdR}>{row[3]}</td>
                          <td style={tdR}>{row[4]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={secS}>
                <h2 id="how-to-use" style={h2S}>How to Use This Retirement Corpus Calculator</h2>
                <p style={pS}>Five inputs determine your required corpus:</p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Current monthly expenses:</strong> enter all household expenses today. The calculator inflates these to your retirement date automatically.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Current age and retirement age:</strong> the gap is your savings horizon. Starting at 25 vs 35 can cut the monthly SIP required by 50% or more.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Life expectancy:</strong> plan for at least 25 years post-retirement. Set 90 or 95 if you have a family history of longevity, or if you are planning for FIRE.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>More settings (inflation and return rate):</strong> click "More settings" to adjust the inflation rate (default 6%) and post-retirement portfolio return (default 8%). Adjust these together to stress-test different scenarios.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Read the results:</strong> the dark box shows total corpus needed and monthly SIP required. The donut shows how much of that corpus will come from your contributions vs investment returns. The stat rows break down the expense at retirement, retirement duration, and compounding contribution.
                  </li>
                </ol>
              </div>

              <div style={secS}>
                <h2 id="gratuity-in-corpus" style={h2S}>Gratuity as Part of Your Retirement Corpus</h2>
                <p style={pS}>
                  Gratuity is a lump sum paid on retirement after 5+ years of service, calculated as Last Drawn Salary x 15 x Years of Service / 26 under the Payment of Gratuity Act.
                </p>
                <p style={pS}>
                  For private-sector employees, gratuity is tax-exempt up to Rs 20 lakh under Section 10(10) of the Income Tax Act, per the <a href="https://www.incometaxindia.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Department</a>. Government employees get a full exemption with no ceiling.
                </p>
                <p style={{ ...pS, margin: 0 }}>
                  Add your expected gratuity payout to Existing Retirement Corpus if you are close to retirement, since it is a real, one-time addition to your investable wealth.
                </p>
              </div>

              <div style={secS}>
                <h2 id="epfo-rate" style={h2S}>EPFO Interest Rate and Your Retirement Corpus</h2>
                <p style={pS}>
                  EPF currently earns 8.25% per annum, as notified by the <a href="https://www.epfindia.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>EPFO</a>, credited annually on the running balance in your account.
                </p>
                <p style={{ ...pS, margin: 0 }}>
                  This rate is reviewed and can change each financial year, so treat 8.25% as a strong current anchor rather than a permanent guarantee when projecting decades ahead.
                </p>
              </div>

              <div style={secS}>
                <h2 id="scss-retirement" style={h2S}>Senior Citizen Savings Scheme in Retirement Planning</h2>
                <p style={pS}>
                  The Senior Citizen Savings Scheme (SCSS) pays 8.2% per annum for the July-September 2026 quarter, as notified by the <a href="https://www.nsiindia.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>National Savings Institute</a>, unchanged for eight straight quarters.
                </p>
                <p style={{ ...pS, margin: 0 }}>
                  Open to retirees aged 60+, SCSS pays interest quarterly and is a common government-backed anchor for the debt portion of a post-retirement portfolio.
                </p>
              </div>

              <div style={secS}>
                <h2 id="ups-govt-employees" style={h2S}>The Unified Pension Scheme for Government Employees</h2>
                <p style={pS}>
                  The Unified Pension Scheme (UPS), effective from 1 April 2025, gives existing Central Government employees under NPS an assured payout of 50% of the last 12 months&apos; average basic pay after 25 years of service, per <a href="https://www.pfrda.org.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>PFRDA</a>.
                </p>
                <p style={{ ...pS, margin: 0 }}>
                  UPS does not apply to private-sector employees; this calculator's corpus-and-annuity model is the relevant one if you are not a Central Government employee.
                </p>
              </div>

              <div style={secS}>
                <h2 id="ppf-anchor" style={h2S}>PPF as a Tax-Free Retirement Anchor</h2>
                <p style={pS}>
                  The Public Provident Fund pays 7.1% per annum for the July-September 2026 quarter, as notified by the <a href="https://www.nsiindia.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>National Savings Institute</a>, unchanged since April 2020.
                </p>
                <p style={{ ...pS, margin: 0 }}>
                  PPF is Exempt-Exempt-Exempt (EEE): contributions, interest, and maturity are all tax-free, with a 15-year lock-in that suits long retirement horizons.
                </p>
              </div>

              <div style={secS}>
                <h2 id="vpf-threshold" style={h2S}>Voluntary Provident Fund and the Rs 2.5 Lakh Tax Threshold</h2>
                <p style={pS}>
                  VPF lets you contribute beyond the mandatory 12% of basic salary into your EPF account at the same EPFO-notified rate, currently 8.25%.
                </p>
                <p style={{ ...pS, margin: 0 }}>
                  Under Budget 2021 rules, interest on combined EPF and VPF employee contributions above Rs 2.5 lakh per year (Rs 5 lakh for government employees with no employer contribution) becomes taxable.
                </p>
              </div>

              <div style={secS}>
                <h2 id="tax-regime-retirement" style={h2S}>Old vs New Tax Regime and Retirement Savings</h2>
                <p style={pS}>
                  Deductions for PPF, VPF, and NPS Section 80CCD(1B) (the extra Rs 50,000) are available only under the old tax regime.
                </p>
                <p style={{ ...pS, margin: 0 }}>
                  Under the new regime, only your employer's NPS contribution under Section 80CCD(2) remains deductible, so compare both regimes before assuming these retirement deductions apply to you.
                </p>
              </div>

              <div style={secS}>
                <h2 id="epf-withdrawal-timing" style={h2S}>EPF and VPF Withdrawal Timing: The 5-Year Rule</h2>
                <p style={pS}>
                  EPF and VPF withdrawals are tax-free only after 5 years of continuous service; withdrawing earlier makes the amount taxable.
                </p>
                <p style={{ ...pS, margin: 0 }}>
                  If you switch jobs, transfer your EPF account to the new employer instead of withdrawing, so your continuous-service clock keeps running toward retirement.
                </p>
              </div>

              

              <div style={secS} id="faq">
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQ faqs={faqs} />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only. The growing annuity formula produces a mathematical estimate based on the inputs provided and assumes constant inflation and return rates throughout retirement. Actual returns vary year to year. This calculator is for educational and planning purposes only and does not constitute financial advice. Consult a SEBI-registered investment adviser before making retirement planning decisions. 
                </p>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <style>{`
            .rc-sidebar::-webkit-scrollbar { width: 5px; }
            .rc-sidebar::-webkit-scrollbar-track { background: transparent; }
            .rc-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .rc-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            className="rc-sidebar"
            aria-label="Related calculators"
            style={{
              position: mobile ? 'static' : 'sticky',
              top: 20,
              alignSelf: 'start',
              maxHeight: mobile ? 'none' : 'calc(100vh - 40px)',
              overflowY: mobile ? 'visible' : 'auto',
              paddingRight: mobile ? 0 : 2,
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            } as React.CSSProperties}
          >
            <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
            </div>
            <div style={{ flexShrink: 0 }}><RetirementSnapshot /></div>
            <nav aria-label="Popular calculators" style={{ flexShrink: 0 }}>
              <SidebarList title="Popular Calculators" items={POPULAR} />
            </nav>
            <nav aria-label="More calculators" style={{ flexShrink: 0 }}>
              <SidebarList title="More Tools" items={MORE} />
            </nav>
            <div style={{ flexShrink: 0 }}><RelatedReads /></div>
          </aside>
        </div>
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

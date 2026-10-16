'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useEffect, useLayoutEffect, useMemo } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import { FAQBox } from '@/components/common/FAQBox';

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

/* ─── UI Components (matching VPF calculator exactly) ────────── */
function Slider({ label, value, min, max, step, fmt, onChange, compact, id, suffix }: {
  label: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void; compact?: boolean; id?: string; suffix?: string;
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
        <label htmlFor={inputId} style={{ fontSize: compact ? 13.5 : 14, color: C.ink2, fontWeight: 400 }}>
          {label} {suffix && <span style={{ fontSize: 12, color: C.ink3 }}>{suffix}</span>}
        </label>
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

function FAQ({ faqs }: { faqs: {q: string, a: string}[] }) {
  return <FAQBox items={faqs} />;
}

interface ELSSYearRow { year: number; openingBal: number; invested: number; growth: number; closingBal: number }

function BarChart({ rows }: { rows: ELSSYearRow[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxAnnual = Math.max(...rows.map(r => r.invested + r.growth));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;
  return (
    <svg role="img" aria-label="Year-by-year invested amount and growth breakdown"
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {rows.map((row, i) => {
        const total = row.invested + row.growth;
        const totalH = maxAnnual > 0 ? (total / maxAnnual) * H : 0;
        const investedH = total > 0 ? (row.invested / total) * totalH : 0;
        const growthH = totalH - investedH;
        const x = PADL + i * slot + gap;
        return (
          <g key={row.year}>
            <rect x={x} y={H - totalH} width={barW} height={growthH} fill={CHART_PAIR.secondary} rx={2} />
            <rect x={x} y={H - investedH} width={barW} height={investedH} fill={CHART_PAIR.primary} rx={2} />
            {rows.length <= 30 && (
              <text x={x + barW / 2} y={H + 14} textAnchor="middle"
                style={{ fontSize: rows.length > 20 ? 7 : 9, fill: C.ink3, fontFamily: INTER }}>
                Y{row.year}
              </text>
            )}
          </g>
        );
      })}
      <line x1={PADL} y1={H} x2={W} y2={H} stroke={C.border} strokeWidth={1} />
    </svg>
  );
}

export default function ELSSClient({ region = 'in', faqs }: { region?: string, faqs: any[] }) {
  const defaultSettings = { type: 'SIP', amount: 5000, rate: 12, years: 10, other80C: 0, inflationRate: 6, stepUp: 0 };
  const { settings, updateSettings } = useCalculatorSettings('elss-calculator', defaultSettings);
  const { type, amount, rate, years, other80C, inflationRate, stepUp } = settings;
  const setType = (v: any) => updateSettings({ type: typeof v === 'function' ? v(settings.type) : v });
  const setAmount = (v: any) => updateSettings({ amount: typeof v === 'function' ? v(settings.amount) : v });
  const setRate = (v: any) => updateSettings({ rate: typeof v === 'function' ? v(settings.rate) : v });
  const setYears = (v: any) => updateSettings({ years: typeof v === 'function' ? v(settings.years) : v });
  const setOther80C = (v: any) => updateSettings({ other80C: typeof v === 'function' ? v(settings.other80C) : v });
  const setInflationRate = (v: any) => updateSettings({ inflationRate: typeof v === 'function' ? v(settings.inflationRate) : v });
  const setStepUp = (v: any) => updateSettings({ stepUp: typeof v === 'function' ? v(settings.stepUp) : v });
        const [taxBracket, setTaxBracket] = useState(30);
  
  
  const [showAdvanced, setShowAdvanced] = useState(false);
    
  const [mobile, setMobile] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  // Set defaults based on type
  useEffect(() => {
    if (type === 'SIP') {
      if (amount > 100000) setAmount(5000);
    } else {
      if (amount < 10000) setAmount(100000);
    }
  }, [type, amount]);

  // Core Calculations
  const calculations = useMemo(() => {
    let invested = 0;
    let corpus = 0;
    const data = [{ year: 0, invested: 0, returns: 0 }];
    
    if (type === 'SIP') {
      const monthlyRate = rate / 12 / 100;
      let currentSip = amount;
      for (let y = 1; y <= years; y++) {
        for (let m = 1; m <= 12; m++) {
          invested += currentSip;
          corpus = (corpus + currentSip) * (1 + monthlyRate);
        }
        data.push({ year: y, invested, returns: corpus - invested });
        currentSip = currentSip * (1 + stepUp / 100);
      }
    } else {
      invested = amount;
      corpus = amount * Math.pow(1 + rate / 100, years);
      for (let y = 1; y <= years; y++) {
        const yrCorpus = amount * Math.pow(1 + rate / 100, y);
        data.push({ year: y, invested, returns: yrCorpus - invested });
      }
    }
    
    const returns = corpus - invested;
    const realCorpus = corpus / Math.pow(1 + inflationRate / 100, years);

    // Section 80C calculation for Year 1
    const max80C = 150000;
    const elssInvestmentY1 = type === 'SIP' ? amount * 12 : amount;
    const remainingLimitBeforeELSS = Math.max(0, max80C - other80C);
    const eligibleELSSAmount = Math.min(elssInvestmentY1, remainingLimitBeforeELSS);
    
    // Total Tax Savings (Assuming 4% cess added to tax bracket)
    const effectiveTaxRate = taxBracket * 1.04; 
    const taxSavedY1 = eligibleELSSAmount * (effectiveTaxRate / 100);

    return { invested, returns, corpus, realCorpus, data, elssInvestmentY1, remainingLimitBeforeELSS, eligibleELSSAmount, taxSavedY1 };
  }, [type, amount, rate, years, stepUp, inflationRate, other80C, taxBracket]);

  const { invested, returns, corpus, realCorpus, data, elssInvestmentY1, eligibleELSSAmount, taxSavedY1 } = calculations;

  const yearRows: ELSSYearRow[] = useMemo(() => {
    const rows: ELSSYearRow[] = [];
    for (let y = 1; y < data.length; y++) {
      const opening = data[y - 1].invested + data[y - 1].returns;
      const closing = data[y].invested + data[y].returns;
      const investedThisYear = data[y].invested - data[y - 1].invested;
      const growthThisYear = closing - opening - investedThisYear;
      rows.push({ year: y, openingBal: opening, invested: investedThisYear, growth: growthThisYear, closingBal: closing });
    }
    return rows;
  }, [data]);

  const POPULAR = [
    { href: '/calculators/section-80c-calculator',  label: 'Section 80C Calculator' },
    { href: '/calculators/ppf-calculator',          label: 'PPF Calculator' },
    { href: '/calculators/tax-saving-calculator',   label: 'Tax Saving Calculator' },
    { href: '/calculators/income-tax-calculator',   label: 'Income Tax Calculator' },
    { href: '/calculators/sip-calculator',          label: 'SIP Calculator' },
    { href: '/calculators/lumpsum-calculator',      label: 'Lumpsum Calculator' },
    { href: '/calculators/nps-calculator',          label: 'NPS Calculator' },
  ];
  const MORE = [
    { href: '/calculators/swp-calculator',                  label: 'SWP Calculator' },
    { href: '/calculators/cagr-calculator',                 label: 'CAGR Calculator' },
    { href: '/calculators/investment-comparison-calculator',label: 'Investment Comparison' },
    { href: '/calculators/fd-calculator',                   label: 'FD Calculator' },
    { href: '/calculators/capital-gains-calculator',        label: 'Capital Gains Calculator' },
  ];

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            ELSS Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Estimate ELSS SIP or lumpsum returns, Section 80C tax savings and maturity value for your 3-year lock-in investment.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>

          <div style={{ minWidth: 0 }}>

            <section aria-label="ELSS Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div role="tabpanel" style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!showAdvanced ? (
                      <div style={{ display: 'flex', background: C.border, borderRadius: 8, overflow: 'hidden' }}>
                        <button onClick={() => setType('SIP')} aria-pressed={type === 'SIP'} style={{ padding: '8px 16px', fontSize: 13, fontWeight: 700, border: 'none', background: type === 'SIP' ? C.white : 'transparent', color: type === 'SIP' ? C.dark : C.ink3, cursor: 'pointer' }}>Monthly SIP</button>
                        <button onClick={() => setType('Lumpsum')} aria-pressed={type === 'Lumpsum'} style={{ padding: '8px 16px', fontSize: 13, fontWeight: 700, border: 'none', background: type === 'Lumpsum' ? C.white : 'transparent', color: type === 'Lumpsum' ? C.dark : C.ink3, cursor: 'pointer' }}>Lumpsum</button>
                      </div>
                    ) : (
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>More Settings</p>
                    )}
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider label={type === 'SIP' ? 'Monthly Investment' : 'Total Investment'} id="elss-amount" value={amount} min={500} max={type === 'SIP' ? 100000 : 1500000} step={500} fmt={fmtC} onChange={setAmount} compact={mobile} />
                      <Slider label="Expected Return Rate" id="elss-rate" value={rate} min={1} max={30} step={0.5} fmt={v => `${v}%`} onChange={setRate} compact={mobile} />
                      <Slider label="Time Period" id="elss-years" value={years} min={3} max={30} step={1} fmt={v => `${v} yrs`} onChange={setYears} compact={mobile} />

                      <div style={{ marginBottom: 24 }}>
                        <label id="elss-tax-bracket-label" style={{ fontSize: 13.5, color: C.ink2, fontWeight: 400, display: 'block', marginBottom: 12 }}>Your Income Tax Bracket</label>
                        <div role="group" aria-labelledby="elss-tax-bracket-label" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                          {[5, 10, 20, 30].map(tb => (
                            <button key={tb} onClick={() => setTaxBracket(tb)} aria-pressed={taxBracket === tb}
                              aria-label={`Income tax bracket ${tb} percent`}
                              style={{ padding: '10px 0', borderRadius: 8, border: `${taxBracket === tb ? 1.5 : 1}px solid ${taxBracket === tb ? C.ink : C.border}`, background: C.white, color: taxBracket === tb ? C.ink : C.ink3, fontSize: 14, fontWeight: taxBracket === tb ? 700 : 500, cursor: 'pointer', transition: 'all 0.15s' }}>
                              {tb}%
                            </button>
                          ))}
                        </div>
                      </div>

                      <Slider label="Other 80C Investments" id="elss-other80c" value={other80C} min={0} max={150000} step={5000} fmt={fmtC} onChange={setOther80C} compact={mobile} suffix="(PPF, LIC, EPF)" />

                      <button onClick={() => setShowAdvanced(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        More settings
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                      </button>
                    </>
                  ) : (
                    <>
                      {type === 'SIP' && <Slider label="Annual Step-Up" id="elss-stepup" value={stepUp} min={0} max={20} step={1} fmt={v => `${v}%`} onChange={setStepUp} compact={mobile} />}
                      <Slider label="Expected Inflation" id="elss-inflation" value={inflationRate} min={0} max={12} step={0.5} fmt={v => `${v}%`} onChange={setInflationRate} compact={mobile} />
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: '0 0 24px' }}>
                        {type === 'SIP' ? 'Step-up increases your SIP amount each year, matching typical salary growth. ' : ''}
                        Inflation adjustment shows the real purchasing power of your corpus at redemption.
                      </p>
                      <button onClick={() => setShowAdvanced(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        Back
                      </button>
                    </>
                  )}
                </div>

                {/* Result panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>
                      Estimated Corpus
                    </span>
                    <span aria-live="polite" aria-label={`Estimated corpus: ${fmtIN(corpus)}`}
                      style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {fmtIN(corpus)}
                    </span>
                  </div>

                  <div style={{ width: '100%', background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 10, padding: mobile ? '12px 16px' : '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 12.5 : 13.5, fontWeight: 600, color: C.dark }}>
                      Tax Saved (Year 1, {taxBracket}% slab + 4% cess)
                    </span>
                    <span style={{ fontSize: mobile ? 16 : 19, fontWeight: 800, color: C.dark }}>
                      {fmtIN(taxSavedY1)}
                    </span>
                  </div>

                  {[
                    { label: 'Total Investment', value: fmtC(invested) },
                    { label: 'Total Gains', value: fmtC(returns) },
                    { label: 'Other 80C Investments', value: fmtC(other80C) },
                    { label: 'Year 1 ELSS Investment', value: fmtC(elssInvestmentY1) },
                    { label: 'Eligible ELSS for Deduction', value: fmtC(eligibleELSSAmount) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  {eligibleELSSAmount < elssInvestmentY1 && (
                    <div style={{ fontSize: 11, color: C.ink2, marginTop: 8, lineHeight: 1.4, width: '100%' }}>
                      Your total 80C investments exceed Rs 1.5L. The surplus amount will not provide additional tax benefits.
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    {(() => {
                      const total = invested + returns;
                      if (total === 0) return null;
                      const R = 80, sw = 20, cx = 106, cy = 106;
                      const circ = 2 * Math.PI * R;
                      const pArc = (invested / total) * circ;
                      const pPct = Math.round((invested / total) * 100);
                      return (
                        <svg width="212" height="212" viewBox="0 0 212 212" role="img" aria-label={`Invested vs returns: ${pPct}% invested, ${100 - pPct}% returns`} style={{ display: 'block' }}>
                          <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
                          <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
                            strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
                            style={{ transition: 'stroke-dasharray 0.4s ease' }} />
                          <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Invested</text>
                          <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
                        </svg>
                      );
                    })()}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Invested {Math.round((invested / (invested + returns || 1)) * 100)}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Returns {100 - Math.round((invested / (invested + returns || 1)) * 100)}%</span>
                    </div>
                  </div>

                  <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Invested {Math.round((invested / (invested + returns || 1)) * 100)}%</span>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Returns {100 - Math.round((invested / (invested + returns || 1)) * 100)}%</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`Invested amount is ${Math.round((invested / (invested + returns || 1)) * 100)}% of corpus`}>
                      <div style={{ height: '100%', width: `${Math.round((invested / (invested + returns || 1)) * 100)}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>

                  {inflationRate > 0 && (
                    <div style={{ textAlign: 'center', marginTop: 14, fontSize: 12, color: C.ink2 }}>
                      Inflation-adjusted corpus (real purchasing power): <strong style={{ color: C.ink }}>{fmtC(realCorpus)}</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Year-by-year table */}
              {yearRows.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowTable(v => !v)}
                    aria-expanded={showTable} aria-controls="elss-growth-table"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Year-by-Year ELSS Growth</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>{years} years at {rate}%</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {years} yr &middot; {rate}% rate
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showTable && (
                    <div id="elss-growth-table" style={{ borderTop: `1px solid ${C.border}` }}>
                      <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                        <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>Invested</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>Growth</span>
                          </div>
                        </div>
                        <BarChart rows={yearRows} />
                      </div>
                      {mobile && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '6px 0 4px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                            style={{ animation: 'elssSwipeHint 1.6s ease-in-out infinite' }}>
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                          <p style={{ fontSize: 11.5, color: C.ink3, margin: 0, fontFamily: INTER }}>Swipe to see all columns</p>
                        </div>
                      )}
                      <style>{`@keyframes elssSwipeHint { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }`}</style>
                      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
                        <table style={{ minWidth: 500, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Year-by-year ELSS invested amount, growth, and closing balance</caption>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              {['Year', 'Opening', 'Invested', 'Growth', 'Closing'].map(h => (
                                <th key={h} scope="col" style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {yearRows.map((row, i) => (
                              <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ padding: '11px 14px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                                <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtC(row.openingBal)}</td>
                                <td style={{ padding: '11px 14px', color: '#1f7a58', fontWeight: 600 }}>{fmtC(row.invested)}</td>
                                <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtC(row.growth)}</td>
                                <td style={{ padding: '11px 14px', color: C.ink, fontWeight: 600 }}>{fmtC(row.closingBal)}</td>
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

            {/* ARTICLE & FAQ */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>
              {(() => {
                const h2 = { fontSize: mobile ? 18 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
                const p  = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
                const sec = { margin: '0 0 40px' } as React.CSSProperties;
                const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const };
                const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' as const };
                const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top' as const, textAlign: 'right' as const };
                return (
                  <>
                    <div style={sec} id="what-is-elss">
                      <h2 style={h2}>What Is ELSS?</h2>
                      <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                        <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                          ELSS (Equity Linked Savings Scheme) is a diversified equity mutual fund category that qualifies for a Section 80C tax deduction of up to Rs 1.5 lakh, with a mandatory 3-year lock-in on every unit purchased.
                        </p>
                      </div>
                      <p style={p}>
                        Section 80C of the Income Tax Act allows a deduction of up to Rs 1.5 lakh per financial year across several instruments, including PPF, tax-saver FDs, NSC, life insurance premiums, and ELSS. ELSS is the only one of these that is a pure equity investment, meaning the tax-saving money is invested directly in listed company shares rather than in a fixed-return debt instrument.
                      </p>
                      <p style={p}>
                        Run your full deduction mix through the <Link href="/calculators/section-80c-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Section 80C Calculator</Link> to see exactly how much room remains for ELSS once EPF, life insurance, and other existing 80C commitments are accounted for.
                      </p>
                    </div>

                    <div style={sec} id="best-tax-saving-options-80c">
                      <h2 style={h2}>Best Tax Saving Options Under 80C</h2>
                      <p style={p}>
                        Investors choosing an 80C instrument are usually weighing ELSS against PPF, tax-saver fixed deposits, and NSC. Each trades off differently between lock-in period, safety, and return potential.
                      </p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Comparison of common Section 80C investment options</caption>
                          <thead><tr><th scope="col" style={thS}>Instrument</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>Lock-in</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>Typical Return</th><th scope="col" style={thS}>Return Type</th><th scope="col" style={thS}>Risk Profile</th></tr></thead>
                          <tbody>
                            <tr><td style={tdL}>ELSS</td><td style={tdR}>3 years</td><td style={tdR}>Market-linked</td><td style={tdL}>Equity, not guaranteed</td><td style={tdL}>Moderately high</td></tr>
                            <tr><td style={tdL}>PPF</td><td style={tdR}>15 years</td><td style={tdR}>7.1%</td><td style={tdL}>Fixed, government-backed</td><td style={tdL}>Risk-free</td></tr>
                            <tr><td style={tdL}>Tax-saver FD</td><td style={tdR}>5 years</td><td style={tdR}>6.5-7.5%</td><td style={tdL}>Fixed, taxable interest</td><td style={tdL}>Risk-free</td></tr>
                            <tr><td style={tdL}>NSC</td><td style={tdR}>5 years</td><td style={tdR}>~7.7%</td><td style={tdL}>Fixed, government-backed</td><td style={tdL}>Risk-free</td></tr>
                          </tbody>
                        </table>
                      </div>
                      <p style={{ fontSize: 12.5, color: C.ink3, margin: 0 }}>
                        PPF and NSC rates are set by the government and revised periodically; figures shown are current indicative rates, not a guarantee for future quarters.
                      </p>
                      <p style={p}>
                        For a broader side-by-side view across every common 80C option at once, use the <Link href="/calculators/tax-saving-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Tax Saving Calculator</Link>.
                      </p>
                    </div>

                    <div style={sec} id="tax-saving-worked-example">
                      <h2 style={h2}>How Much Tax Does ELSS Actually Save?</h2>
                      <p style={p}>
                        The tax saved depends on your income tax slab, since a Section 80C deduction reduces taxable income, not tax payable directly. Investing the full Rs 1.5 lakh limit in ELSS, for someone in the 30% tax bracket including a 4% health and education cess, saves approximately Rs 46,800 in tax for that financial year alone.
                      </p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Tax saved on a full Rs 1.5 lakh ELSS investment by tax bracket</caption>
                          <thead><tr><th scope="col" style={thS}>Tax Bracket</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>Tax Saved on Rs 1.5L Investment</th></tr></thead>
                          <tbody>
                            <tr><td style={tdL}>5%</td><td style={tdR}>Rs 7,800</td></tr>
                            <tr><td style={tdL}>20%</td><td style={tdR}>Rs 31,200</td></tr>
                            <tr><td style={tdL}>30%</td><td style={tdR}>Rs 46,800</td></tr>
                          </tbody>
                        </table>
                      </div>
                      <p style={{ fontSize: 12.5, color: C.ink3, margin: 0 }}>
                        Figures include the 4% cess and assume the full 80C limit is not already used by other deductions such as EPF or life insurance premiums.
                      </p>
                      <p style={p}>
                        Check the <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</Link> to see how this ELSS deduction changes your total tax liability for the year, old regime versus new regime.
                      </p>
                    </div>

                    <div style={sec} id="elss-lock-in-example">
                      <h2 style={h2}>How the 3-Year Lock-in Actually Works</h2>
                      <p style={p}>
                        Each ELSS instalment carries its own independent 3-year lock-in from its purchase date, not one lock-in for the whole investment. A monthly SIP of Rs 12,500 (matching the full Rs 1.5 lakh annual 80C limit spread across 12 months) invested for 3 years puts in a total of Rs 4,50,000. At a 12% assumed annual return, that grows to approximately Rs 5,43,846 by the end of year 3, but only the first month&apos;s instalment is actually unlocked at that point. The instalment made in month 36 remains locked until its own 3-year anniversary, roughly 3 years and 11 months after the SIP began.
                      </p>
                    </div>

                    <div style={sec} id="advantages-and-risks">
                      <h2 style={h2}>Advantages and Risks of ELSS Funds</h2>
                      <p style={p}>
                        The core advantage of ELSS is dual utility: the same rupee reduces this year&apos;s tax bill and participates in equity market growth. The core risk is market volatility during the lock-in: if markets fall in the final months before an instalment&apos;s 3-year unlock date, that unit is still locked and cannot be sold to avoid the loss. For this reason, ELSS suits a 5 to 7 year holding horizon in practice, even though units become legally redeemable after 3 years.
                      </p>
                    </div>

                    <div style={sec} id="elss-vs-ppf">
                      <h2 style={h2}>ELSS vs PPF: What Is the Difference?</h2>
                      <p style={p}>
                        PPF is a government-backed, fixed-return instrument with a 15-year tenure and fully tax-free maturity proceeds under the EEE (Exempt-Exempt-Exempt) structure. ELSS is a market-linked equity investment with a much shorter 3-year lock-in but no guaranteed return, and its gains are taxed as equity capital gains on redemption, not fully tax-free like PPF. A common approach is splitting the Rs 1.5 lakh 80C limit between both: PPF for the guaranteed, long-term debt portion of a portfolio, and ELSS for the growth-oriented equity portion.
                      </p>
                      <p style={p}>
                        Run the same monthly amount through the <Link href="/calculators/ppf-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>PPF Calculator</Link> to compare the guaranteed PPF maturity value against this calculator&apos;s ELSS projection side by side.
                      </p>
                    </div>

                    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>PPF Calculator</p>
                        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>See the guaranteed, tax-free PPF maturity value for the same monthly amount.</p>
                      </div>
                      <Link className="fx-btn" href="/calculators/ppf-calculator" target="_blank" rel="noopener noreferrer"
                        style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                    </div>

                    <div style={sec} id="elss-taxation">
                      <h2 style={h2}>How Are ELSS Returns Taxed on Redemption?</h2>
                      <p style={p}>
                        ELSS is taxed exactly like any other equity mutual fund on exit, since by the time units unlock at 3 years, they automatically qualify as long-term. Gains above Rs 1.25 lakh in a financial year, across all equity shares and equity mutual funds combined, are taxed at 12.5% long-term capital gains (LTCG). There is no separate, more favourable tax treatment for ELSS gains specifically compared to any other equity fund held for over a year.
                      </p>
                    </div>

                    <div style={sec} id="limitations">
                      <h2 style={h2}>Limitations of This Calculator</h2>
                      <p style={p}>
                        <strong style={{ color: C.ink }}>Assumes a constant return rate:</strong> equity markets do not deliver the same return every year. Actual ELSS fund performance will differ from this smooth projection.
                      </p>
                      <p style={p}>
                        <strong style={{ color: C.ink }}>Tax savings shown are for Year 1 only:</strong> if you continue investing the same amount every year, each year&apos;s eligible investment generates its own separate tax deduction, which this calculator does not sum across years.
                      </p>
                      <p style={p}>
                        <strong style={{ color: C.ink }}>Assumes the full 80C limit is available:</strong> if EPF, life insurance, or other 80C instruments already use part of the Rs 1.5 lakh limit, less room remains for ELSS, which the &quot;Other 80C investments&quot; field accounts for, but only if entered accurately.
                      </p>
                    </div>

                    <div style={sec} id="how-to-use">
                      <h2 style={h2}>How to Use This ELSS Calculator</h2>
                      <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Choose SIP or Lumpsum:</strong> a monthly instalment or a one-time investment.</li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Enter the amount, expected return, and tenure:</strong> and any other 80C investments already committed elsewhere.</li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Set your income tax bracket:</strong> to see the actual rupee amount of tax saved this year.</li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Review the projected corpus and tax saved:</strong> shown together, since ELSS is the one 80C option that does both.</li>
                      </ol>
                    </div>

                    

                    <div style={sec} id="faq">
                      <h2 style={h2}>Frequently Asked Questions</h2>
                      <FAQ faqs={faqs} />
                    </div>

                    <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                        <strong>Disclaimer:</strong> This calculator projects ELSS returns using a constant assumed rate; actual equity mutual fund returns vary year to year and are not guaranteed. Tax savings shown are for the current financial year only and depend on your actual taxable income and other Section 80C claims. This calculator is for educational and planning purposes only and does not constitute tax or investment advice. Consult a SEBI-registered investment adviser or chartered accountant before making investment or tax decisions.
                      </p>
                    </div>
                  </>
                );
              })()}
            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .elss-sidebar::-webkit-scrollbar { width: 5px; }
            .elss-sidebar::-webkit-scrollbar-track { background: transparent; }
            .elss-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .elss-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            aria-label="Related calculators"
            className="elss-sidebar"
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
            <SidebarList title="Popular Calculators" items={POPULAR} />
            <SidebarList title="More Calculators" items={MORE} />
          </aside>

        </div>
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

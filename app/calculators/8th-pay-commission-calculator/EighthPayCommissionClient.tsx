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

/* ─── Verified 7th CPC pay matrix, index-1 (starting) basic pay per level ─── */
const PAY_LEVELS: { level: number; basic: number }[] = [
  { level: 1, basic: 18000 }, { level: 2, basic: 19900 }, { level: 3, basic: 21700 },
  { level: 4, basic: 25500 }, { level: 5, basic: 29200 }, { level: 6, basic: 35400 },
  { level: 7, basic: 44900 }, { level: 8, basic: 47600 }, { level: 9, basic: 53100 },
  { level: 10, basic: 56100 }, { level: 11, basic: 67700 }, { level: 12, basic: 78800 },
  { level: 13, basic: 123100 }, { level: 14, basic: 144200 }, { level: 15, basic: 182200 },
  { level: 16, basic: 205400 }, { level: 17, basic: 225000 }, { level: 18, basic: 250000 },
];

const HRA_RATES: Record<'X' | 'Y' | 'Z', number> = { X: 30, Y: 20, Z: 10 };

type Tab = 'salary' | 'pension';

/* ─── Donut Chart: revised basic vs revised allowances ────────── */
function DonutChart({ basic, allowances }: { basic: number; allowances: number }) {
  const total = basic + allowances;
  if (total <= 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const basicPct = Math.round((basic / total) * 100);
  const basicArc = (basic / total) * circ;
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Revised basic pay is ${basicPct}% of projected gross, allowances are ${100 - basicPct}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${basicArc} ${circ - basicArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Basic Pay</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{basicPct}%</text>
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
  { href: '/calculators/income-tax-calculator',          label: 'Income Tax Calculator' },
  { href: '/calculators/old-vs-new-tax-regime-calculator', label: 'Old vs New Tax Regime' },
  { href: '/calculators/in-hand-salary-calculator',      label: 'In-Hand Salary Calculator' },
  { href: '/calculators/gratuity-calculator',            label: 'Gratuity Calculator' },
  { href: '/calculators/pension-calculator',             label: 'Pension Calculator' },
  { href: '/calculators/nps-calculator',                 label: 'NPS Calculator' },
  { href: '/calculators/retirement-calculator',          label: 'Retirement Calculator' },
];
const MORE = [
  { href: '/calculators/hra-calculator',        label: 'HRA Calculator' },
  { href: '/calculators/salary-hike-calculator', label: 'Salary Hike Calculator' },
  { href: '/calculators/inflation-calculator',   label: 'Inflation Calculator' },
  { href: '/calculators/ctc-calculator',         label: 'CTC Calculator' },
  { href: '/calculators/epf-calculator',         label: 'EPF Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
const FAQS = [
  { q: 'When will the 8th Pay Commission be implemented?', a: 'The 8th Pay Commission was formally constituted on November 3, 2025, with an 18-month tenure to submit its recommendations, putting the final report around mid-2027. January 1, 2026 is the official reference date the Terms of Reference point to, so if implementation happens after the report is submitted and accepted, arrears would apply retrospectively to that date.' },
  { q: 'What is the fitment factor in the 8th Pay Commission?', a: 'The fitment factor is the multiplier applied to your current basic pay to arrive at the revised basic pay under the new pay commission. The 7th Pay Commission used a fitment factor of 2.57; for the 8th, employee federations have proposed factors as high as 2.86 to 3.83, but the government has not accepted or finalised any figure yet.' },
  { q: 'Is the 8th Pay Commission applicable to state government employees?', a: 'No, the 8th Pay Commission covers only central government employees and pensioners directly. Most state governments historically adopt a similar revised pay structure after their own independent review and cabinet approval, typically with a delay of one to two years after the central recommendations are implemented.' },
  { q: 'How much will pension increase after the 8th Pay Commission?', a: 'There is no confirmed pension increase figure yet, since it depends on the final fitment factor the government approves. Pensioner associations have proposed raising the minimum pension to 67% of Last Pay Drawn and introducing an age-based enhancement up to 100% of Last Pay Drawn for pensioners aged 90 and above, but these remain unapproved proposals under consultation.' },
  { q: 'Is the 8th Pay Commission applicable to bank employees?', a: 'No. Public sector bank employees have their pay revised separately under agreements negotiated through the Indian Banks\' Association (IBA), not through the Central Pay Commission process that applies to central government departments.' },
  { q: 'How much will salaries increase under the 8th Pay Commission?', a: 'The exact increase depends entirely on the final fitment factor and revised HRA and DA structure, none of which the government has approved yet. Using the calculator above with different fitment factor scenarios shows a realistic range for your own pay level, since even the same fitment factor produces very different rupee increases depending on your current basic pay.' },
  { q: 'Will Dearness Allowance become zero under the 8th Pay Commission?', a: 'Yes, but only from the date of implementation. DA continues to be revised twice a year under the existing mechanism until then; once the new pay structure takes effect, the existing DA is absorbed into the revised basic pay and the DA rate resets to zero, with future DA increases starting fresh from that new base.' },
  { q: 'Why is there a delay in implementing the 8th Pay Commission?', a: 'The delay reflects the scale of the exercise: the Commission is still collecting workforce data from ministries and departments (extended to July 31, 2026), running regional consultations with employee and pensioner federations across multiple cities, and has an 18-month mandate from its November 2025 constitution before it needs to submit recommendations at all.' },
  { q: 'Is the fitment factor applicable to pensioners as well?', a: 'Yes, in principle. Historically, past pay commissions have applied the same or a closely related fitment factor to revise pensions alongside serving employee pay, and the 8th Pay Commission\'s Terms of Reference explicitly include pension revision for those who retired on or before December 31, 2025.' },
  { q: 'How do I check my revised salary using a fitment factor calculator?', a: 'Enter your current basic pay or select your 7th CPC pay level, choose a fitment factor scenario (conservative, moderate, or the employee union proposal), and select your city classification for HRA. The calculator above shows your projected revised basic pay, DA, HRA, and total gross salary side by side with your current figures.' },
  { q: 'Can higher allowances compensate for a lower fitment factor?', a: 'Not entirely. The fitment factor determines your revised basic pay, which is the base figure used to calculate Dearness Allowance, House Rent Allowance, and several other allowances. A lower fitment factor produces a lower basic pay and therefore a lower overall salary revision, even when specific allowances are increased separately.' },
  { q: 'What is the current Dearness Allowance rate for central government employees?', a: 'Dearness Allowance stands at 60% of basic pay and pension, effective from January 1, 2026, after the Union Cabinet approved a 2% increase from the earlier 58%. This DA revision is a routine, separate process from the 8th Pay Commission and does not indicate that the new pay structure has been implemented.' },
  { q: 'What are the current HRA rates for central government employees?', a: 'House Rent Allowance is 30% of basic pay in X-classified cities, 20% in Y-classified cities, and 10% in Z-classified cities. These rates already reflect the automatic revision that applies once DA crosses 50%, which happened in January 2024, and remain in effect at the current 60% DA level.' },
  { q: 'Will there be arrears when the 8th Pay Commission is implemented?', a: 'Likely yes, if implementation happens after the January 1, 2026 reference date, which looks probable given the Commission\'s 18-month mandate running to around mid-2027. Arrears would cover the gap between the reference date and the actual notification date, paid as a lump sum once the government approves the final recommendations, though eligibility and exact amounts depend entirely on the final notification.' },
  { q: 'How many employees and pensioners does the 8th Pay Commission cover?', a: 'The Commission\'s review is expected to affect roughly 50 lakh central government employees and 69 lakh pensioners, based on figures cited alongside the Cabinet\'s approval of its Terms of Reference.' },
  { q: 'Is Dearness Allowance being merged with basic pay under the 8th Pay Commission?', a: 'No standalone merger proposal is currently under consideration, according to the government\'s own clarification to employee unions. What does happen at implementation is different: the DA percentage accumulated up to that point gets absorbed into the newly calculated basic pay through the fitment factor, after which DA itself resets to zero and starts accruing again from the new base.' },
  { q: 'What is the 8th Pay Commission pay matrix?', a: 'The pay matrix is the table structure, carried forward in concept from the 7th Pay Commission, that maps every pay level (Level 1 through Level 18) to a basic pay figure and its progression through annual increments. The 8th Pay Commission is expected to publish a revised matrix once the fitment factor and any structural changes are finalised; until then, only the 7th CPC matrix is official.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ─── Main ───────────────────────────────────────────────────── */
export default function EighthPayCommissionClient() {
  const defaultSettings = {
    tab: 'salary' as Tab,
    payLevel: 6,
    basicPay: 35400,
    fitmentFactor: 2.57,
    city: 'X' as 'X' | 'Y' | 'Z',
    daRate: 60,
    lastPayDrawn: 35400,
  };
  const { settings, updateSettings } = useCalculatorSettings('8th-pay-commission', defaultSettings);
  const { tab, payLevel, basicPay, fitmentFactor, city, daRate, lastPayDrawn } = settings;

  const setTab            = (v: Tab) => updateSettings({ tab: v });
  const setPayLevel       = (v: number) => {
    const found = PAY_LEVELS.find(p => p.level === v);
    updateSettings({ payLevel: v, basicPay: found ? found.basic : basicPay });
  };
  const setBasicPay       = (v: number) => updateSettings({ basicPay: v });
  const setFitmentFactor  = (v: number) => updateSettings({ fitmentFactor: v });
  const setCity           = (v: 'X' | 'Y' | 'Z') => updateSettings({ city: v });
  const setDaRate         = (v: number) => updateSettings({ daRate: v });
  const setLastPayDrawn   = (v: number) => updateSettings({ lastPayDrawn: v });

  const [mobile, setMobile] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const hraRate = HRA_RATES[city];

  /* Salary tab math */
  const currentDaAmt  = basicPay * daRate / 100;
  const currentHraAmt = basicPay * hraRate / 100;
  const currentGross  = basicPay + currentDaAmt + currentHraAmt;

  const revisedBasic   = basicPay * fitmentFactor;
  const revisedDaAmt   = 0; // DA resets to zero at implementation, absorbed into revised basic
  const revisedHraAmt  = revisedBasic * hraRate / 100;
  const revisedGross   = revisedBasic + revisedDaAmt + revisedHraAmt;

  const hikeAmt = revisedGross - currentGross;
  const hikePct = currentGross > 0 ? (hikeAmt / currentGross) * 100 : 0;
  const monthlyArrearPerDelay = hikeAmt;

  /* Pension tab math */
  const currentPensionBasic  = lastPayDrawn * 0.5;
  const currentPensionDaAmt  = currentPensionBasic * daRate / 100;
  const currentPensionGross  = currentPensionBasic + currentPensionDaAmt;

  const revisedPensionBasic  = (lastPayDrawn * fitmentFactor) * 0.5;
  const revisedPensionGross  = revisedPensionBasic; // DA resets to zero

  const pensionHikeAmt = revisedPensionGross - currentPensionGross;
  const pensionHikePct = currentPensionGross > 0 ? (pensionHikeAmt / currentPensionGross) * 100 : 0;

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
            8th Pay Commission Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Estimate your projected salary and pension hike under the 8th Pay Commission using your current basic pay, a fitment factor scenario, and city classification.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            <section aria-label="8th Pay Commission Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              {/* Tabs */}
              <div role="tablist" aria-label="Calculator mode" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                {(['salary', 'pension'] as Tab[]).map(t => (
                  <button key={t} id={`tab-${t}`} role="tab" aria-selected={tab === t} aria-controls={`panel-${t}`}
                    onClick={() => setTab(t)}
                    style={{
                      flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: mobile ? 12.5 : 13.5, fontWeight: tab === t ? 700 : 400,
                      color: tab === t ? C.dark : C.ink3,
                      borderBottom: tab === t ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                      transition: 'all 0.15s', fontFamily: INTER,
                    }}>
                    {t === 'salary' ? 'Salary' : 'Pension'}
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`} style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  {tab === 'salary' ? (
                    <>
                      <div style={{ marginBottom: 20 }}>
                        <p style={{ fontSize: 14, color: C.ink2, marginBottom: 10 }}>7th CPC Pay Level</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {PAY_LEVELS.map(pl => (
                            <button key={pl.level} onClick={() => setPayLevel(pl.level)}
                              style={{ padding: '4px 10px', fontSize: 12, background: C.white,
                                color: payLevel === pl.level ? C.ink : C.ink3,
                                border: `${payLevel === pl.level ? 1.5 : 1}px solid ${payLevel === pl.level ? C.ink : C.border}`,
                                fontWeight: payLevel === pl.level ? 700 : 500, borderRadius: 6, cursor: 'pointer',
                                fontFamily: INTER, transition: 'all 0.15s' }}>
                              L{pl.level}
                            </button>
                          ))}
                        </div>
                      </div>

                      <Slider label="Current Basic Pay" id="basic-pay" value={basicPay} min={18000} max={250000} step={100} fmt={fmtC} onChange={setBasicPay} compact={mobile} />
                      <Slider label="Fitment Factor" id="fitment-factor" value={fitmentFactor} min={1.83} max={3.83} step={0.01} fmt={v => `${v.toFixed(2)}x`} onChange={setFitmentFactor} compact={mobile} />

                      <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
                        {[
                          { label: 'Conservative', val: 1.90 },
                          { label: 'Moderate (7th CPC)', val: 2.57 },
                          { label: 'Union Proposal', val: 3.83 },
                        ].map(s => (
                          <button key={s.label} onClick={() => setFitmentFactor(s.val)}
                            style={{ flex: 1, padding: '6px 8px', fontSize: 11, background: C.white,
                              color: fitmentFactor === s.val ? C.ink : C.ink3,
                              border: `${fitmentFactor === s.val ? 1.5 : 1}px solid ${fitmentFactor === s.val ? C.ink : C.border}`,
                              fontWeight: fitmentFactor === s.val ? 700 : 500, borderRadius: 6, cursor: 'pointer',
                              fontFamily: INTER, transition: 'all 0.15s' }}>
                            {s.label}
                          </button>
                        ))}
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <p style={{ fontSize: 14, color: C.ink2, marginBottom: 10 }}>City Classification (for HRA)</p>
                        <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', width: 'fit-content' }}>
                          {(['X', 'Y', 'Z'] as const).map(c => (
                            <button key={c} onClick={() => setCity(c)}
                              style={{ padding: '7px 18px', border: 'none', background: city === c ? C.white : 'transparent', color: city === c ? C.ink : C.ink3, fontWeight: city === c ? 600 : 400, cursor: 'pointer', fontFamily: INTER, fontSize: 13, transition: 'all 0.15s' }}>
                              {c} ({HRA_RATES[c]}%)
                            </button>
                          ))}
                        </div>
                      </div>

                      <Slider label="Current DA Rate" id="da-rate" value={daRate} min={0} max={70} step={1} fmt={v => `${v}%`} onChange={setDaRate} compact={mobile} />

                      <div style={{ padding: '14px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8 }}>
                        <span style={{ fontSize: 13, color: C.ink, fontFamily: INTER }}>The fitment factor, revised pay matrix, and HRA structure have not been finalised by the government. These figures are illustrative scenarios based on employee union proposals and past pay commission history.</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <Slider label="Last Pay Drawn (Basic)" id="last-pay-drawn" value={lastPayDrawn} min={18000} max={250000} step={100} fmt={fmtC} onChange={setLastPayDrawn} compact={mobile} />
                      <Slider label="Fitment Factor" id="fitment-factor-pension" value={fitmentFactor} min={1.83} max={3.83} step={0.01} fmt={v => `${v.toFixed(2)}x`} onChange={setFitmentFactor} compact={mobile} />

                      <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
                        {[
                          { label: 'Conservative', val: 1.90 },
                          { label: 'Moderate (7th CPC)', val: 2.57 },
                          { label: 'Union Proposal', val: 3.83 },
                        ].map(s => (
                          <button key={s.label} onClick={() => setFitmentFactor(s.val)}
                            style={{ flex: 1, padding: '6px 8px', fontSize: 11, background: C.white,
                              color: fitmentFactor === s.val ? C.ink : C.ink3,
                              border: `${fitmentFactor === s.val ? 1.5 : 1}px solid ${fitmentFactor === s.val ? C.ink : C.border}`,
                              fontWeight: fitmentFactor === s.val ? 700 : 500, borderRadius: 6, cursor: 'pointer',
                              fontFamily: INTER, transition: 'all 0.15s' }}>
                            {s.label}
                          </button>
                        ))}
                      </div>

                      <Slider label="Current DA Rate (on Pension)" id="da-rate-pension" value={daRate} min={0} max={70} step={1} fmt={v => `${v}%`} onChange={setDaRate} compact={mobile} />

                      <div style={{ padding: '14px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8 }}>
                        <span style={{ fontSize: 13, color: C.ink, fontFamily: INTER }}>Basic pension is calculated as 50% of Last Pay Drawn, the standard central government formula. Employee and pensioner associations have proposed raising this, but no change has been approved.</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Result panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {tab === 'salary' ? (
                    <>
                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>
                          Projected Gross Salary
                        </span>
                        <span aria-live="polite" aria-label={`Projected gross salary: ${fmtIN(revisedGross)}`}
                          style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                          {fmtIN(revisedGross)}
                        </span>
                      </div>

                      {[
                        { label: 'Current Gross Salary', value: fmtC(currentGross) },
                        { label: 'Revised Basic Pay', value: fmtC(revisedBasic) },
                        { label: 'Revised HRA', value: fmtC(revisedHraAmt) },
                        { label: 'Hike Amount', value: `+${fmtC(hikeAmt)} (${hikePct.toFixed(1)}%)` },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                        </div>
                      ))}

                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                        <DonutChart basic={revisedBasic} allowances={revisedHraAmt} />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                          <span style={{ fontSize: 12, color: C.ink2 }}>Basic pay</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                          <span style={{ fontSize: 12, color: C.ink2 }}>HRA</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>
                          Projected Pension (Gross)
                        </span>
                        <span aria-live="polite" aria-label={`Projected pension: ${fmtIN(revisedPensionGross)}`}
                          style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                          {fmtIN(revisedPensionGross)}
                        </span>
                      </div>

                      {[
                        { label: 'Current Pension (Gross)', value: fmtC(currentPensionGross) },
                        { label: 'Revised Basic Pension', value: fmtC(revisedPensionBasic) },
                        { label: 'Hike Amount', value: `+${fmtC(pensionHikeAmt)} (${pensionHikePct.toFixed(1)}%)` },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                        </div>
                      ))}

                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                        <DonutChart basic={revisedPensionBasic} allowances={0.0001} />
                      </div>
                      <p style={{ fontSize: 12, color: C.ink3, marginTop: 12, textAlign: 'center' }}>
                        Basic pension is 50% of Last Pay Drawn. DA on pension resets to 0% at implementation, same as for serving employees.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Pay matrix reference table */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowMatrix(v => !v)}
                  aria-expanded={showMatrix} aria-controls="matrix-table"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Full Pay Matrix: All 18 Levels at This Fitment Factor</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    aria-hidden="true" style={{ transform: showMatrix ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {showMatrix && (
                  <div id="matrix-table" style={{ borderTop: `1px solid ${C.border}`, overflowX: 'auto' }}>
                    <table style={{ minWidth: 480, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
                        7th CPC basic pay vs projected 8th CPC basic pay at the selected fitment factor, all 18 levels
                      </caption>
                      <thead>
                        <tr style={{ background: '#f4f5f6' }}>
                          <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }} scope="col">Level</th>
                          <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }} scope="col">7th CPC Basic</th>
                          <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }} scope="col">Projected 8th CPC Basic</th>
                        </tr>
                      </thead>
                      <tbody>
                        {PAY_LEVELS.map((pl, i) => (
                          <tr key={pl.level} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={{ padding: '11px 14px', fontWeight: 700, color: C.dark }}>Level {pl.level}</td>
                            <td style={{ padding: '11px 14px', color: C.ink2, textAlign: 'right' }}>{fmtIN(pl.basic)}</td>
                            <td style={{ padding: '11px 14px', color: '#166534', fontWeight: 600, textAlign: 'right' }}>{fmtIN(pl.basic * fitmentFactor)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>

            {/* Waitlist */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="status-update">8th Pay Commission Status: What&apos;s Confirmed as of Today</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    The 8th Pay Commission was formally constituted on November 3, 2025, chaired by Justice Ranjana Prakash Desai, and is currently in the data collection and consultation stage with no fitment factor or pay matrix finalised yet.
                  </p>
                </div>
                <p style={p}>
                  The Commission has an 18-month mandate from its constitution date to submit recommendations, putting the final report around mid-2027. Its data collection portal deadline for ministries and departments to submit workforce data was extended to July 31, 2026.
                </p>
                <p style={p}>
                  Separately, the Union Cabinet approved a 2% Dearness Allowance increase effective January 1, 2026, raising DA from 58% to 60% of basic pay and pension. This is a routine, twice-yearly DA revision under the existing 7th CPC formula, unrelated to whether the 8th Pay Commission itself has been implemented.
                </p>
                <p style={p}>
                  Regional consultations are continuing beyond the initial round held earlier in 2026. The Commission's own notice board lists a Mumbai consultation for October 22-23, 2026, along with a further round for Bengaluru, extending the same city-by-city consultation format used since April 2026.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="fitment-factor-formula">Fitment Factor Formula: How the Revised Basic Pay Is Calculated</h2>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark }}>
                    Revised Basic Pay = Current Basic Pay x Fitment Factor
                  </code>
                </div>
                <p style={p}>
                  On a Level 6 basic pay of Rs 35,400, a fitment factor of 2.57 (the same factor the 7th Pay Commission used) gives a revised basic of Rs 90,978. At the employee unions&apos; proposed 3.83, the same basic pay rises to Rs 1,35,582. Neither figure is official; both are scenarios you can test in the calculator above.
                </p>
                <p style={p}>
                  Once the revised basic pay is set, Dearness Allowance resets to 0% and starts accruing fresh from that new base, while House Rent Allowance is recalculated on the new, higher basic pay at whatever HRA percentage applies to your city.
                </p>
              </div>

              <div style={sec} id="fitment-scenarios">
                <h2 style={h2}>Fitment Factor Scenarios: Conservative, Moderate, and Union Proposal</h2>
                <p style={p}>
                  No fitment factor has been approved. The range below reflects publicly available estimates and proposals as of this writing, not government decisions.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 8 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Fitment factor scenarios under discussion for the 8th Pay Commission</caption>
                    <thead><tr><th style={thS} scope="col">Scenario</th><th style={thS} scope="col">Fitment Factor</th><th style={thS} scope="col">Status</th></tr></thead>
                    <tbody>
                      {[
                        ['Conservative estimate', '1.83 - 2.00', 'Independent expert projections'],
                        ['Moderate estimate (7th CPC level)', '2.00 - 2.57', 'Matches the factor the 7th Pay Commission actually used'],
                        ['Employee union proposal', 'Around 2.86 - 3.83', 'Submitted by NC-JCM Staff Side and other federations, not accepted'],
                        ['Final fitment factor', 'Not yet decided', 'Awaiting government decision after consultations conclude'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={tdR}>{r[1]}</td>
                          <td style={tdL}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>HRA Calculator</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Work out your House Rent Allowance exemption for tax purposes on your current or projected basic pay.</p>
                </div>
                <Link className="fx-btn" href="/calculators/hra-calculator" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
              </div>

              <div style={sec} id="timeline">
                <h2 style={h2}>8th Pay Commission Timeline: Constitution to Consultations</h2>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Key 8th Pay Commission milestones</caption>
                    <thead><tr><th style={thS} scope="col">Milestone</th><th style={thS} scope="col">Status / Date</th></tr></thead>
                    <tbody>
                      {[
                        ['Cabinet approval of Terms of Reference', 'Approved, October 2025'],
                        ['Formal constitution (Gazette notification)', 'November 3, 2025'],
                        ['Chairperson', 'Justice Ranjana Prakash Desai (former Supreme Court judge)'],
                        ['Reference date for pay and pension revision', 'January 1, 2026'],
                        ['DA/DR increase (separate from 8th CPC)', '58% to 60%, effective January 1, 2026'],
                        ['Data collection portal deadline', 'Extended to July 31, 2026'],
                        ['New Delhi regional consultation', 'April 28-30, 2026'],
                        ['Hyderabad regional consultation', 'May 18-19, 2026'],
                        ['Srinagar and Jammu & Kashmir consultation', 'June 1-4, 2026'],
                        ['Ladakh consultation', 'June 8, 2026'],
                        ['Lucknow regional consultation', 'June 22-23, 2026'],
                        ['Mumbai regional consultation', 'October 22-23, 2026'],
                        ['Bengaluru regional consultation', 'Announced on the Commission\'s notice board, exact date pending confirmation'],
                        ['Fitment factor and pay matrix', 'Not yet finalised'],
                        ['Expected final report', 'Around mid-2027 (18 months from constitution)'],
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

              <div style={sec} id="da-hra-current">
                <h2 style={h2}>Current DA and HRA Rates: The Baseline Before Implementation</h2>
                <p style={p}>
                  Until the 8th Pay Commission is implemented, Dearness Allowance and House Rent Allowance continue under the existing 7th CPC framework, which is what the calculator above uses for your current gross salary figure.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 8 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Current DA and HRA rates for central government employees</caption>
                    <thead><tr><th style={thS} scope="col">Allowance</th><th style={thS} scope="col">Current Rate</th><th style={thS} scope="col">Notes</th></tr></thead>
                    <tbody>
                      {[
                        ['Dearness Allowance (DA/DR)', '60% of basic pay/pension', 'Effective January 1, 2026; revised every January and July'],
                        ['HRA, X-classified cities', '30% of basic pay', 'Cities with population 50 lakh and above'],
                        ['HRA, Y-classified cities', '20% of basic pay', 'Cities with population 5 to 50 lakh'],
                        ['HRA, Z-classified cities', '10% of basic pay', 'All other locations'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={tdR}>{r[1]}</td>
                          <td style={tdL}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  HRA rates automatically step up by 25% whenever DA crosses the 25% and 50% thresholds, without a separate notification. Since DA passed 50% in January 2024 and now stands at 60%, the 30/20/10% rates above are the current, correct figures, not the original 24/16/8% base rates from when the 7th CPC was first implemented.
                </p>
              </div>

              <div style={sec} id="pension-reform">
                <h2 style={h2}>Pension Reform Proposals Under Discussion</h2>
                <p style={p}>
                  Pensioner associations have submitted several proposals during the consultation process, none of which the government has approved.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Proposed age-based pension enhancement (unapproved proposal)</caption>
                    <thead><tr><th style={thS} scope="col">Age of Pensioner</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Proposed Pension Level</th></tr></thead>
                    <tbody>
                      {[
                        ['65 years', '70% of Last Pay Drawn'],
                        ['70 years', '75% of Last Pay Drawn'],
                        ['75 years', '80% of Last Pay Drawn'],
                        ['80 years', '85% of Last Pay Drawn'],
                        ['85 years', '90% of Last Pay Drawn'],
                        ['90 years and above', '100% of Last Pay Drawn'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{r[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Other pensioner demands include raising the minimum pension to 67% of Last Pay Drawn, reducing the commutation restoration period from 15 years to 10-12 years, increasing the gratuity ceiling, and expanding family pension benefits. The 8th Pay Commission&apos;s Terms of Reference explicitly cover pension revision for those who retired on or before December 31, 2025.
                </p>
              </div>

              <div style={sec} id="arrears">
                <h2 style={h2}>8th Pay Commission Arrears: What They Are and Who Gets Them</h2>
                <p style={p}>
                  Arrears arise when a pay revision is applied retrospectively but paid out later than its effective date. Since the reference date is January 1, 2026, any implementation after that date is likely to trigger an arrears payment covering the gap.
                </p>
                <p style={p}>
                  The calculator above shows your monthly gross salary differential, which is the building block for an arrears estimate: multiply that monthly hike amount by the number of months between January 2026 and whenever the revised structure is actually notified. A delay of 12 to 18 months at a meaningful fitment factor can produce arrears running into several months of revised salary.
                </p>
                <p style={p}>
                  Arrears are not guaranteed and depend entirely on the government&apos;s final notification. Pensioners may also receive arrears on revised pension amounts under the same logic, once the pension formula itself is finalised.
                </p>
              </div>

              <div style={sec} id="limitations">
                <h2 style={h2}>Limitations of This Calculator</h2>
                <p style={p}>
                  <strong>No fitment factor is official.</strong> Every scenario in this calculator, conservative, moderate, or the employee union proposal, is illustrative. The actual figure could fall anywhere in this range or outside it, and will only be confirmed when the government approves the Commission&apos;s final report.
                </p>
                <p style={p}>
                  <strong>HRA structure is assumed unchanged.</strong> The calculator applies the current 30/20/10% HRA rates to the revised basic pay. The 8th Pay Commission could recommend a different HRA structure entirely, which would change this figure.
                </p>
                <p style={p}>
                  <strong>Transport Allowance and other allowances are excluded.</strong> This calculator covers Basic Pay, DA, and HRA only. Your actual gross salary includes Transport Allowance and other pay-level-specific allowances not modelled here, so real gross figures will be somewhat higher than shown.
                </p>
              </div>

              <div style={sec} id="how-to-use">
                <h2 style={h2}>How to Use This 8th Pay Commission Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select your pay level or enter basic pay:</strong> choose your 7th CPC pay level to auto-fill the standard basic pay, or enter your exact figure directly.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Choose a fitment factor scenario:</strong> pick conservative, moderate, or the union proposal, or drag the slider to any value between 1.83 and 3.83.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select your city classification:</strong> X, Y, or Z, to apply the correct HRA percentage.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Switch to the Pension tab:</strong> to estimate a projected pension using your Last Pay Drawn instead of a serving employee&apos;s basic pay.
                  </li>
                </ol>
              </div>


              <div style={{ margin: '44px 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> The 8th Pay Commission has not finalised its fitment factor, revised pay matrix, HRA structure, or pension revision formula as of the date on this page. All figures shown by this calculator are illustrative scenarios based on publicly available proposals, past pay commission history, and the current 7th CPC framework, not official government figures. This calculator is for educational and planning purposes only and does not constitute financial advice. Rely only on official government notifications for confirmed figures.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .epc-sidebar::-webkit-scrollbar { width: 5px; }
            .epc-sidebar::-webkit-scrollbar-track { background: transparent; }
            .epc-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .epc-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            aria-label="Related calculators"
            className="epc-sidebar"
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
            </div>
            <div style={{ flexShrink: 0 }}><SidebarList title="Popular Calculators" items={POPULAR} /></div>
            <div style={{ flexShrink: 0 }}><SidebarList title="More Calculators" items={MORE} /></div>
          </aside>

        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/income-tax-calculator|Income Tax', '/calculators/hra-calculator|HRA', '/calculators/gratuity-calculator|Gratuity', '/calculators/pension-calculator|Pension', '/calculators/nps-calculator|NPS', '/calculators/epf-calculator|EPF', '/calculators/ctc-calculator|CTC'] },
        { hd: 'Topics', links: ['/calculators/salary-hike-calculator|Salary Revision', '/calculators/old-vs-new-tax-regime-calculator|Tax Regime', '/calculators/retirement-calculator|Retirement', '/calculators/inflation-calculator|Inflation'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

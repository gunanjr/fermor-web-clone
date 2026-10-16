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

/* ─── LTA Calculation ─────────────────────────────────────────── */
function getMarginalRate(income: number): number {
  if (income <= 250000) return 0;
  if (income <= 500000) return 5;
  if (income <= 1000000) return 20;
  return 30;
}

/* ─── Slider ─────────────────────────────────────────────────── */
function Slider({ label, value, min, max, step, fmt, onChange, compact, id }: {
  label: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void; compact?: boolean; id?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 32 }}>
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

/* ─── Mode selection toggles ─────────────────────────────────── */
function ToggleGroup({ label, options, value, onChange }: {
  label: string; options: { value: string; label: string }[]; value: string; onChange: (v: any) => void;
}) {
  return (
    <div style={{ marginBottom: 32 }}>
      <p style={{ fontSize: 14, color: C.ink2, fontWeight: 400, margin: '0 0 12px' }}>{label}</p>
      <div role="radiogroup" aria-label={label} style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
        {options.map(opt => (
          <button key={opt.value}
            role="radio" aria-checked={value === opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              flex: 1, padding: '10px 6px', fontFamily: INTER, fontSize: 13, cursor: 'pointer',
              border: 'none', background: value === opt.value ? C.white : 'transparent',
              color: value === opt.value ? C.ink : C.ink3,
              fontWeight: value === opt.value ? 600 : 400,
              transition: 'all 0.12s',
            }}>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Donut Chart ─────────────────────────────────────────────── */
function DonutChart({ exemptPct }: { exemptPct: number }) {
  const taxablePct = 100 - exemptPct;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const eArc = (exemptPct / 100) * circ;
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Exempt LTA ${exemptPct.toFixed(0)}%, taxable LTA ${taxablePct.toFixed(0)}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${eArc} ${circ - eArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Exempt</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{exemptPct.toFixed(0)}%</text>
    </svg>
  );
}

/* ─── Sidebar list ────────────────────────────────────────────── */
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
  { href: '/calculators/income-tax-calculator',            label: 'Income Tax Calculator' },
  { href: '/calculators/old-tax-regime-calculator',       label: 'Old Tax Regime Calculator' },
  { href: '/calculators/new-tax-regime-calculator',       label: 'New Tax Regime Calculator' },
  { href: '/calculators/old-vs-new-tax-regime-calculator', label: 'Old vs New Tax Regime' },
  { href: '/calculators/hra-calculator',                   label: 'HRA Calculator' },
];
const MORE = [
  { href: '/calculators/leave-encashment-tax-calculator',  label: 'Leave Encashment Calculator' },
  { href: '/calculators/salary-breakdown-calculator',      label: 'Salary Breakdown Calculator' },
  { href: '/calculators/ctc-calculator',                   label: 'CTC Calculator' },
  { href: '/calculators/gratuity-calculator',              label: 'Gratuity Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
const FAQS = [
  { q: 'What is Leave Travel Allowance (LTA)?', a: 'Leave Travel Allowance (LTA) is an allowance paid by employers to employees to cover travel expenses incurred while on leave with family within India. It qualifies for a tax exemption under Section 10(5) of the Income Tax Act. The exemption is only available under the old tax regime.' },
  { q: 'What is the maximum tax exemption under Section 10(5)?', a: 'The maximum tax exemption is the actual cost of air, rail, or public transport tickets incurred by the employee for themselves and their family by the shortest route. Exemption is capped at the lower of the actual ticket expenses, the LTA component received, or the class-specific fare limits.' },
  { q: 'What are the travel class restrictions for LTA exemption?', a: 'Travel class limits apply: for air travel, only economy class fare of the national carrier is exempt; for rail, AC First Class fare is exempt; for other recognized public transport, first class or deluxe class fare qualifies.' },
  { q: 'How many times can I claim LTA tax exemption?', a: 'LTA tax exemption can be claimed for only 2 journeys in a block of 4 calendar years. The current block is 2022-2025, and the next block is 2026-2029. If you do not claim LTA in a block, you can carry forward 1 journey to the first year of the next block.' },
  { q: 'Who is considered family for LTA exemption?', a: 'Family includes your spouse, up to two children (born on or after October 1, 1998, with exceptions for twins/multiple births), and parents, brothers, or sisters who are wholly or mainly dependent on you.' },
  { q: 'Can I claim LTA exemption under the new tax regime?', a: 'No. LTA exemption is completely scrapped under the new tax regime. You can only claim this exemption if you stay in the old tax regime and have LTA as a component in your CTC.' },
  { q: 'What expenses are excluded from LTA exemption?', a: 'Only travel fare (air, train, or bus tickets) is eligible for exemption. Expenses for hotel stays, local sightseeing, meals, taxi fares, or other incidental expenses are completely excluded and remain taxable.' },
  { q: 'Can I carry forward an unclaimed LTA journey?', a: 'Yes. If you have not claimed LTA for one or both journeys in a 4-year block, you can carry forward one journey to the next block. However, you must perform the carry-over journey in the first calendar year of the new block.' },
  { q: 'Is international travel eligible for LTA tax exemption?', a: 'No. Section 10(5) restricts LTA exemption to travel within the geographical boundaries of India. The origin, destination, and transit of the journey must all be within India.' },
  { q: 'Do I need to submit physical bills to claim LTA exemption?', a: 'Yes. Employers are required by the Income Tax Department to collect and verify proof of travel (such as boarding passes, air tickets, or train tickets) before granting the LTA exemption. Keep all original tickets safely.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ─── CA CTA ─────────────────────────────────────────────────── */

/* ─── Main Client Component ───────────────────────────────────── */

export default function LTACalculatorClient() {
  const defaultSettings = {
    grossSalary: 1200000,
    ltaReceived: 50000,
    actualExpense: 35000,
    travelMode: 'air' as 'air' | 'rail' | 'public' | 'other',
    journeyInBlock: 'allowed' as 'allowed' | 'notAllowed',
  };
  const { settings, updateSettings } = useCalculatorSettings('lta-calculator', defaultSettings);
  const { grossSalary, ltaReceived, actualExpense, travelMode, journeyInBlock } = settings;

  const setGrossSalary = (v: any) => updateSettings({ grossSalary: typeof v === 'function' ? v(settings.grossSalary) : v });
  const setLtaReceived = (v: any) => updateSettings({ ltaReceived: typeof v === 'function' ? v(settings.ltaReceived) : v });
  const setActualExpense = (v: any) => updateSettings({ actualExpense: typeof v === 'function' ? v(settings.actualExpense) : v });
  const setTravelMode = (v: any) => updateSettings({ travelMode: typeof v === 'function' ? v(settings.travelMode) : v });
  const setJourneyInBlock = (v: any) => updateSettings({ journeyInBlock: typeof v === 'function' ? v(settings.journeyInBlock) : v });

  const [mobile, setMobile] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-lta-calculator-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (typeof d.grossSalary === 'number') setGrossSalary(d.grossSalary);
      if (typeof d.ltaReceived === 'number') setLtaReceived(d.ltaReceived);
      if (typeof d.actualExpense === 'number') setActualExpense(d.actualExpense);
      if (d.travelMode === 'air' || d.travelMode === 'rail' || d.travelMode === 'public' || d.travelMode === 'other') setTravelMode(d.travelMode);
      if (d.journeyInBlock === 'allowed' || d.journeyInBlock === 'notAllowed') setJourneyInBlock(d.journeyInBlock);
    } catch { /* ignore */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('fermor-lta-calculator-v1', JSON.stringify({ grossSalary, ltaReceived, actualExpense, travelMode, journeyInBlock }));
    } catch { /* ignore */ }
  }, [grossSalary, ltaReceived, actualExpense, travelMode, journeyInBlock]);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const result = useMemo(() => {
    let exemptAmount = 0;
    if (journeyInBlock === 'allowed') {
      exemptAmount = Math.min(ltaReceived, actualExpense);
    }
    const taxableAmount = Math.max(0, ltaReceived - exemptAmount);
    const marginalRate = getMarginalRate(grossSalary);
    const taxSaved = Math.round(exemptAmount * (marginalRate / 100) * 1.04);
    const exemptPct = ltaReceived > 0 ? (exemptAmount / ltaReceived) * 100 : 0;

    return { exemptAmount, taxableAmount, marginalRate, taxSaved, exemptPct };
  }, [grossSalary, ltaReceived, actualExpense, journeyInBlock]);

  const h2 = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const p = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;

  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'middle' as const } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'middle' as const } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            LTA Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate your Leave Travel Allowance tax exemption under Section 10(5) and optimize your salary package
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="LTA Tax Exemption Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                
                {/* Inputs */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  <Slider label="Annual Gross Income" id="lta-gross-salary" value={grossSalary} min={300000} max={25000000} step={50000} fmt={fmtC} onChange={setGrossSalary} compact={mobile} />
                  <Slider label="LTA Allowance Received" id="lta-received" value={ltaReceived} min={0} max={500000} step={2000} fmt={fmtC} onChange={setLtaReceived} compact={mobile} />
                  <Slider label="Actual Travel Expense Incurred" id="lta-expense" value={actualExpense} min={0} max={ltaReceived || 200000} step={2000} fmt={fmtC} onChange={setActualExpense} compact={mobile} />
                  
                  <ToggleGroup label="Mode of Travel"
                    options={[
                      { value: 'air', label: 'Air Economy' },
                      { value: 'rail', label: 'Rail AC I' },
                      { value: 'public', label: 'Public Transport' },
                      { value: 'other', label: 'Other/No Rail' },
                    ]}
                    value={travelMode} onChange={setTravelMode} />

                  <ToggleGroup label="Journeys claimed in this block (Max 2)"
                    options={[
                      { value: 'allowed', label: '1st or 2nd Journey' },
                      { value: 'notAllowed', label: '3rd or More' },
                    ]}
                    value={journeyInBlock} onChange={setJourneyInBlock} />
                </div>

                {/* Outputs */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                      <span style={{ fontSize: mobile ? 12 : 13, fontWeight: 600, color: '#50565C' }}>Tax Saved</span>
                      <p style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', margin: '2px 0 0', letterSpacing: '-0.02em' }}
                        aria-live="polite" aria-label={`You save ${fmtIN(result.taxSaved)} in tax`}>
                        {fmtIN(result.taxSaved)}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: mobile ? 12 : 13, fontWeight: 600, color: '#50565C' }}>Exempt LTA Amount</span>
                      <p style={{ fontSize: mobile ? 18 : 22, fontWeight: 700, color: '#101214', margin: '2px 0 0', opacity: 0.9 }}>
                        {fmtIN(result.exemptAmount)}
                      </p>
                    </div>
                  </div>

                  {[
                    { label: 'Total LTA component', value: fmtIN(ltaReceived) },
                    { label: 'Taxable LTA component', value: fmtIN(result.taxableAmount) },
                    { label: 'Estimated marginal tax rate', value: `${result.marginalRate}% + 4% cess` },
                    { label: 'Exemption status', value: journeyInBlock === 'allowed' ? 'Eligible' : 'Not Eligible (Exceeded Limit)' },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    <DonutChart exemptPct={result.exemptPct} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Exempt {result.exemptPct.toFixed(0)}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Taxable {(100 - result.exemptPct).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Save Results Card */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-lta">What Is an LTA Calculator?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    An LTA calculator is a specialized digital tool designed to help salaried individuals in India estimate their tax-free travel allowance. This LTA exemption calculator computes tax benefits under Section 10(5) of the Income Tax Act.
                  </p>
                </div>
                <p style={p}>
                  Salaried professionals frequently receive a Leave Travel Allowance (LTA) as part of their structured Cost to Company (CTC). By utilizing our LTA calculator online, you can quickly break down how much of your travel allowance remains tax-free and how much falls into the taxable bracket. Understanding these metrics is vital for planning annual family vacations and optimizing your overall income tax liability.
                </p>
                <p style={p}>
                  To see how this fits into your broader financial plan, you can combine this analysis with our <a href="/calculators/salary-breakdown-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Salary Breakdown Calculator</a> to map out all cash components and deductions.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="lta-exemption-rules">Section 10(5) LTA Exemption Rules and Limitations</h2>
                <p style={p}>
                  The LTA tax calculator operates strictly based on Section 10(5) of the Income Tax Act, 1961. This section regulates the tax-free status of travel allowances. Under these statutory guidelines, a salaried taxpayer can claim exemption only for actual travel tickets and fares incurred for themselves and their dependent family members.
                </p>
                <p style={p}>
                  Key rules enforced by the Income Tax Department include:
                </p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Travel within India:</strong> The entire journey must take place within the geographical boundaries of India. International flights or cruises are completely ineligible.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Actual expenses:</strong> The exemption is restricted to actual tickets purchased. If you receive Rs 50,000 as LTA but spend only Rs 30,000 on tickets, the exemption is capped at Rs 30,000.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Exclusion of ancillary costs:</strong> Hotel lodging, restaurant bills, local sightseeing cabs, and food expenses are entirely excluded from the exemption and remain fully taxable.
                  </li>
                </ol>
              </div>

              <div style={sec}>
                <h2 style={h2} id="travel-class-limitations">Travel Class Limitations for LTA Exemption</h2>
                <p style={p}>
                  Even if your actual tickets are expensive, the income tax department enforces strict class-specific limits. An LTA exemption calculator must evaluate these caps based on the mode of transport:
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Maximum allowable LTA travel class exemption limits</caption>
                    <thead>
                      <tr style={{ background: '#f4f5f6' }}>
                        <th style={thS} scope="col">Transport Mode</th>
                        <th style={thS} scope="col">Maximum Exemption Capping</th>
                        <th style={thS} scope="col">Shortest Route Requirement</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: `1px solid ${C.border}`, background: C.white }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>Air Travel</td>
                        <td style={tdR}>Economy Class Fare of national carrier (Air India) by shortest route</td>
                        <td style={tdL}>Required</td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>Rail Travel</td>
                        <td style={tdR}>AC First Class Fare by shortest route</td>
                        <td style={tdL}>Required</td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${C.border}`, background: C.white }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>Public Transport Connected</td>
                        <td style={tdR}>First Class or Deluxe Class Public Transport Fare</td>
                        <td style={tdL}>Required</td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>Private Vehicle (No Rail Connection)</td>
                        <td style={tdR}>Equivalent AC First Class Rail Fare by shortest route</td>
                        <td style={tdL}>Required</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-calculator-works">How the LTA Exemption Calculator Works</h2>
                <p style={p}>
                  This tool processes your annual basic income, total LTA allowance, actual ticket costs, transport mode, and eligibility conditions. If you are within the allowed two journeys per block year, the tool compares your actual tickets against class-specific caps and your allowance.
                </p>
                <p style={p}>
                  It determines the tax-exempt amount as:
                  <code style={{ display: 'block', background: '#f6f7f8', padding: 12, borderRadius: 6, margin: '10px 0', fontFamily: 'monospace', fontSize: 14 }}>
                    Exempt LTA = Math.min(Allowance Received, Actual Travel Cost, Travel Mode Cap Limit)
                  </code>
                  The remaining portion is calculated as taxable income. The tool then applies your marginal tax rate to calculate your estimated tax savings. To evaluate this alongside other major tax deductions, check our <a href="/calculators/hra-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>HRA Calculator</a>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="carry-forward">Carry Forward of Unclaimed LTA Journey</h2>
                <p style={p}>
                  A unique aspect of Section 10(5) is the carry-forward concession. If you are unable to utilize one or both of your journeys in a designated four-year block, you can carry forward one journey to the subsequent block.
                </p>
                <p style={p}>
                  However, the carried-forward journey must be utilized in the first calendar year of the new block. For example, if you did not claim one journey in the 2022-2025 block, you can carry it forward and perform the travel in 2026. If you fail to travel and claim it in 2026, the carried-forward journey lapses permanently.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="family-rules">LTA Rules for Family Members and Dependents</h2>
                <p style={p}>
                  You can claim LTA exemption for yourself as well as your family members. Family is strictly defined under Section 10(5) as:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li style={{ fontSize: 15, color: C.ink2 }}>Your spouse and up to two children (born on or after October 1, 1998, unless they are multiple births on the second occasion).</li>
                  <li style={{ fontSize: 15, color: C.ink2 }}>Your parents, brothers, and sisters, provided they are wholly or mainly dependent on you.</li>
                </ul>
                <p style={p}>
                  Note that if you travel alone while your family stays home, you can claim the exemption. However, if your family travels without you, no exemption can be claimed under your name.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="old-vs-new">LTA Exemption in Old vs New Tax Regime</h2>
                <p style={p}>
                  The selection of your tax regime directly affects your LTA tax benefit. Under the Old Tax Regime, LTA remains a valuable deduction. Under the New Tax Regime, the Section 10(5) exemption is completely abolished. All LTA components received in the new regime are fully taxable under your slab rates.
                </p>
                <p style={p}>
                  To compare your comprehensive tax liability under both regimes, use our <a href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Old vs New Tax Regime Calculator</a>. It estimates your tax under both systems using your exact deductions.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="fy-comparison">LTA Calculator for FY 2020-21 vs FY 2021-22</h2>
                <p style={p}>
                  For historic tax filings or audits, the LTA calculator for FY 2020 21 and the LTA calculator for FY 2021 22 must account for special COVID-19 relief schemes. Due to travel restrictions during the pandemic, the Government of India introduced the LTA Cash Voucher Scheme.
                </p>
                <p style={p}>
                  Under this scheme, employees could claim tax exemptions by purchasing goods or services with a GST rate of 12% or more instead of actual travel. The purchases had to be made between October 12, 2020, and March 31, 2021, paid digitally, and equal to three times the deemed LTA fare value. Standard travel tickets resumed as the sole eligible expense starting FY 2022-23.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="lta-vs-hmrc">Difference Between Indian LTA and HMRC Lifetime Allowance</h2>
                <p style={p}>
                  It is important not to confuse the Indian LTA (Leave Travel Allowance) with the UK HMRC Lifetime Allowance. If you are searching for a lifetime allowance calculator hmrc or hmrc lifetime allowance calculator, you are looking for UK pension tax rules.
                </p>
                <p style={p}>
                  The HMRC Lifetime Allowance refers to the maximum amount of pension savings you can accumulate over your lifetime without facing an extra tax charge. This UK pension policy is entirely unrelated to India&apos;s Section 10(5) travel allowance exemption. Our tool is optimized strictly for the Indian Income Tax Act.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="documents-required">Documents and Proofs Required for LTA Exemption</h2>
                <p style={p}>
                  To claim the tax benefit, your employer&apos;s HR department will require valid travel proof. The Supreme Court of India has ruled that employers must collect and verify travel proof before granting the exemption.
                </p>
                <p style={p}>
                  Required documents include:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Air travel:</strong> Original boarding passes, flight tickets, and payment invoices.</li>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Rail travel:</strong> Train tickets showing class (AC I, II, etc.) and names of passengers.</li>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Road travel:</strong> Deluxe bus tickets or car rental receipt alongside toll plaza slips.</li>
                </ul>
              </div>

              <div style={sec}>
                <h2 style={h2} id="block-years">Eligible Journeys and Block Years (2022-2025 and 2026-2029)</h2>
                <p style={p}>
                  LTA block years are calendar years (January to December), not financial years. The blocks are set in 4-year cycles. The current active block is 2022 to 2025. The next block will be 2026 to 2029.
                </p>
                <p style={p}>
                  You are permitted to claim exemption for only 2 journeys in each block. If you do not travel or claim exemption during a block, you can carry forward only one journey, which must be utilized in the first calendar year of the next block.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="common-mistakes">Common Mistakes When Claiming LTA Exemption</h2>
                <p style={p}>
                  Taxpayers often make simple mistakes that lead to tax exemption rejections by their payroll teams:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Claiming two journeys in one year:</strong> While you can travel twice in a single year, you must ensure you have not exceeded the block limit of 2 journeys.</li>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Submitting hotel bills:</strong> Hotel stay charges are fully taxable and cannot be claimed. Only the travel tickets are exempt.</li>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Lost boarding passes:</strong> Many employers reject air travel claims if original boarding passes are not submitted alongside flight tickets.</li>
                </ul>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This LTA Calculator Online</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Input Annual Gross Income:</strong> Drag the slider to set your gross salary. This helps estimate your tax saving based on your old regime tax bracket.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Provide LTA Allowance:</strong> Input the annual LTA component specified in your CTC structure.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Input Actual Travel Cost:</strong> Enter the actual ticket expenses incurred for the eligible journey.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select Transport Mode:</strong> Choose from Air Economy, Rail AC I, Public Transport, or Other.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select Journey Eligibility:</strong> Toggle whether this journey is within your block limits (1st or 2nd journey) to calculate your exemption instantly.
                  </li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only. Exemption approvals depend on your employer&apos;s verify protocol, submission of correct proof of travel, and compliance with Section 10(5) of the Income Tax Act. Consult a qualified Chartered Accountant for personalised tax planning advice. LTA deductions are only available under the old tax regime. 
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <aside className="lta-sidebar" aria-label="Related calculators" style={{
            display: mobile ? 'none' : 'flex', flexDirection: 'column', gap: 16,
            overflowY: 'auto', position: 'sticky', top: 24,
            maxHeight: 'calc(100vh - 100px)',
          } as React.CSSProperties}>
            <style>{`
              .lta-sidebar::-webkit-scrollbar { width: 5px; }
              .lta-sidebar::-webkit-scrollbar-track { background: transparent; }
              .lta-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
              .lta-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
            `}</style>
            <div className="lta-sidebar" style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
              display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0,
            }}>
              <SidebarList title="Tax & Income Calculators" items={POPULAR} />
              <SidebarList title="More Salary Tools" items={MORE} />
            </div>
          </aside>

        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/sip-calculator|SIP', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/cagr-calculator|CAGR', '/calculators/swp-calculator|SWP', '/calculators/emi-calculator|EMI', '/calculators/fd-calculator|FD', '/calculators/ppf-calculator|PPF', '/calculators/xirr-calculator|XIRR', '/calculators/compound-interest-calculator|Compound Int.'] },
        { hd: 'Topics', links: ['/calculators/sip-calculator|Mutual Funds', '/calculators/home-loan-calculator|Home Loans', '/calculators/fd-calculator|Fixed Deposits', '/calculators/retirement-calculator|Retirement'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

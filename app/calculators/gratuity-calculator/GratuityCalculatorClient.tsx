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
import { FAQ_ITEMS } from './faqData';
import { FAQBox } from '@/components/common/FAQBox';

/* ─── Palette ───────────────────────────────────────────────── */
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

/* ─── Constants ─────────────────────────────────────────────── */
const GRATUITY_TAX_EXEMPT_CAP = 2500000;
const MIN_SERVICE_YEARS_FOR_ELIGIBILITY = 5;
const MIN_SALARY = 10000;
const MAX_SALARY = 1000000;
const MIN_TENURE_YEARS = 1;
const MAX_TENURE_YEARS = 50;
const TENURE_YEAR_PRESETS = [5, 10, 15, 20, 25, 30];

/* ─── Math (single source of truth) ────────────────────────── */
interface AccrualRow {
  year: number;
  yearsCompleted: number;
  gratuity: number;
  taxFree: number;
  taxable: number;
}

function calcGratuity(salary: number, effectiveYears: number): number {
  if (effectiveYears < MIN_SERVICE_YEARS_FOR_ELIGIBILITY) return 0;
  return Math.round((15 * salary * effectiveYears) / 26);
}

function buildAccrualSchedule(salary: number): AccrualRow[] {
  const rows: AccrualRow[] = [];
  for (let y = MIN_SERVICE_YEARS_FOR_ELIGIBILITY; y <= 30; y++) {
    const gratuity = calcGratuity(salary, y);
    const taxFree = Math.min(gratuity, GRATUITY_TAX_EXEMPT_CAP);
    const taxable = Math.max(0, gratuity - GRATUITY_TAX_EXEMPT_CAP);
    rows.push({ year: new Date().getFullYear() + (y - MIN_SERVICE_YEARS_FOR_ELIGIBILITY), yearsCompleted: y, gratuity, taxFree, taxable });
  }
  return rows;
}

/* ─── Donut ─────────────────────────────────────────────────── */
function DonutChart({ taxFree, taxable }: { taxFree: number; taxable: number }) {
  const total = taxFree + taxable;
  if (total <= 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const freeArc = (taxFree / total) * circ;
  const freePct = Math.round((taxFree / total) * 100);
  return (
    <svg width="216" height="216" viewBox="0 0 216 216" style={{ display: 'block' }} role="img"
      aria-label={`Gratuity split: ${freePct}% tax-free, ${100 - freePct}% taxable`}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${freeArc} ${circ - freeArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Tax Free</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{freePct}%</text>
    </svg>
  );
}

/* ─── Slider ─────────────────────────────────────────────────── */
function Slider({ label, id, value, min, max, step, fmt, onChange, compact }: {
  label: string; id?: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void; compact?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const inputId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'slider');
  const rangeId = `${inputId}-range`;
  const pct = ((value - min) / (max - min)) * 100;
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 40 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 16 }}>
        {label
          ? <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400 }}>{label}</label>
          : <span />}
        {editing ? (
          <input id={inputId} autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            aria-label={`Enter ${label || 'value'}`}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 120, outline: 'none', color: C.dark, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label || 'Value'}: ${fmt(value)}. Click to edit.`}
            style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 18px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 90 : 110, textAlign: 'center' }}
            onMouseOver={e => (e.currentTarget as HTMLButtonElement).style.borderColor = '#AAAAAA'}
            onMouseOut={e => (e.currentTarget as HTMLButtonElement).style.borderColor = C.border}>
            {fmt(value)}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 20, height: 20, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 2px 8px rgba(16,18,20,0.22)', pointerEvents: 'none', zIndex: 1 }} />
        <input id={rangeId} type="range" min={min} max={max} step={step} value={value}
          aria-label={label || 'Value'} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
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

/* ─── Sidebar list ──────────────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, flexShrink: 0 }}>
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

/* Retirement Calculator and Income Tax Calculator go first: this article links to both
   directly (retirement income context, tax treatment section). */
const POPULAR = [
  { href: '/calculators/retirement-calculator',    label: 'Retirement Calculator' },
  { href: '/calculators/income-tax-calculator',    label: 'Income Tax Calculator' },
  { href: '/calculators/in-hand-salary-calculator', label: 'In-Hand Salary Calculator' },
  { href: '/calculators/nps-calculator',           label: 'NPS Calculator' },
  { href: '/calculators/sip-calculator',           label: 'SIP Calculator' },
  { href: '/calculators/pension-calculator',       label: 'Pension Calculator' },
  { href: '/calculators/fd-calculator',            label: 'FD Calculator' },
];
const MORE = [
  { href: '/calculators/lumpsum-calculator',           label: 'Lumpsum Calculator' },
  { href: '/calculators/home-loan-calculator',         label: 'Home Loan EMI Calculator' },
  { href: '/calculators/compound-interest-calculator', label: 'Compound Interest Calculator' },
  { href: '/calculators/epf-calculator',               label: 'EPF Calculator' },
  { href: '/calculators/ctc-calculator',               label: 'CTC Calculator' },
];

/* ─── FAQ ───────────────────────────────────────────────────── */
function FAQ() {
  return <FAQBox items={FAQ_ITEMS} />;
}

/* ─── CA CTA ────────────────────────────────────────────────── */

export default function GratuityCalculatorClient() {
  const defaultSettings = { salary: 50000, tenureYr: 10, tenureMode: 'yr', tenureMo: 120 };
  const { settings, updateSettings } = useCalculatorSettings('gratuity-calculator', defaultSettings);
  const { salary, tenureYr, tenureMode, tenureMo } = settings;
  const setSalary = (v: number) => updateSettings({ salary: v });
  const setTenureYr = (v: number) => updateSettings({ tenureYr: v });
  const setTenureMode = (v: 'yr' | 'mo') => updateSettings({ tenureMode: v });
  const setTenureMo = (v: number) => updateSettings({ tenureMo: v });

  const [mobile, setMobile] = useState(false);
  const [showAmort, setShowAmort] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();

  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const { effectiveYears, remainderMonths, gratuityPayable, taxFree, taxable, isEligible } = useMemo(() => {
    const totalMonths = tenureMode === 'yr' ? tenureYr * 12 : tenureMo;
    const wholeYears = Math.floor(totalMonths / 12);
    const remainderMonths = totalMonths % 12;
    const effectiveYears = remainderMonths >= 6 ? wholeYears + 1 : wholeYears;
    const isEligible = effectiveYears >= MIN_SERVICE_YEARS_FOR_ELIGIBILITY;
    const gratuityPayable = calcGratuity(salary, effectiveYears);
    const taxFree = Math.min(gratuityPayable, GRATUITY_TAX_EXEMPT_CAP);
    const taxable = Math.max(0, gratuityPayable - GRATUITY_TAX_EXEMPT_CAP);
    return { effectiveYears, remainderMonths, gratuityPayable, taxFree, taxable, isEligible };
  }, [salary, tenureYr, tenureMode, tenureMo]);

  const taxFreePct = gratuityPayable > 0 ? Math.round((taxFree / gratuityPayable) * 100) : 100;
  const taxablePct = 100 - taxFreePct;

  const accrualRows = useMemo(() => buildAccrualSchedule(salary), [salary]);

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      <style>{`
        .gratuity-sidebar::-webkit-scrollbar { width: 5px; }
        .gratuity-sidebar::-webkit-scrollbar-track { background: transparent; }
        .gratuity-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .gratuity-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
      `}</style>

      {/* NAV */}
      <PageNav />

      {/* BODY */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>Gratuity Calculator</h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>Calculate your gratuity payout under the Payment of Gratuity Act, 1972. See the tax-free versus taxable split and the full accrual schedule.</p>
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
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Employment Details</p>
                    ) : (
                      <div />
                    )}
                    <CurrencySelector theme="light" />
                  </div>

                  <Slider label="Last Drawn Monthly Salary (Basic + DA)" id="gratuity-salary" value={salary} min={MIN_SALARY} max={MAX_SALARY} step={1000}
                    fmt={v => fmtC(v)} onChange={setSalary} compact={mobile} />

                  {/* Tenure + toggle (no fill colors, border only, per input panel color rules) */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: mobile ? 10 : 16 }}>
                      <label htmlFor="gratuity-tenure-range" style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400 }}>Years of Service</label>
                      <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                        {(['yr', 'mo'] as const).map(m => (
                          <button key={m} onClick={() => setTenureMode(m)}
                            style={{ padding: mobile ? '4px 10px' : '5px 14px', border: 'none', background: tenureMode === m ? C.white : 'transparent', color: tenureMode === m ? C.ink : C.ink3, fontFamily: INTER, fontSize: 13, fontWeight: tenureMode === m ? 600 : 400, cursor: 'pointer', transition: 'all 0.15s' }}>
                            {m === 'yr' ? 'Years' : 'Months'}
                          </button>
                        ))}
                      </div>
                    </div>
                    {tenureMode === 'yr'
                      ? <Slider label="" id="gratuity-tenure" value={tenureYr} min={MIN_TENURE_YEARS} max={MAX_TENURE_YEARS} step={1} fmt={v => `${v} Yr`} onChange={v => { setTenureYr(v); setTenureMo(v * 12); }} compact={mobile} />
                      : <Slider label="" id="gratuity-tenure" value={tenureMo} min={1} max={600} step={1} fmt={v => `${v} Mo`} onChange={v => { setTenureMo(v); setTenureYr(Math.round(v / 12)); }} compact={mobile} />}

                    {tenureMode === 'yr' && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
                        {TENURE_YEAR_PRESETS.map(y => (
                          <button key={y} onClick={() => { setTenureYr(y); setTenureMo(y * 12); }}
                            aria-label={`Set years of service to ${y} years`}
                            style={{ padding: '4px 10px', fontSize: 12, background: C.white,
                              color: tenureYr === y ? C.ink : C.ink3,
                              border: `${tenureYr === y ? 1.5 : 1}px solid ${tenureYr === y ? C.ink : C.border}`,
                              fontWeight: tenureYr === y ? 700 : 500, borderRadius: 6, cursor: 'pointer',
                              fontFamily: INTER, transition: 'all 0.15s' }}>
                            {y}Y
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Eligibility Alert */}
                  <div style={{
                    padding: '12px 16px',
                    borderRadius: 10,
                    background: isEligible ? '#F0FDF4' : '#FFF7ED',
                    border: `1px solid ${isEligible ? '#BBF7D0' : '#FED7AA'}`,
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <span style={{ fontSize: 15 }} aria-hidden="true">{isEligible ? '✓' : '⚠'}</span>
                    <span style={{ fontSize: 12, color: isEligible ? '#15803D' : '#C2410C', fontWeight: 600 }}>
                      {isEligible
                        ? `Eligible, ${effectiveYears} years counted${remainderMonths >= 6 ? ' (rounded up)' : ''}`
                        : `Not yet eligible, need ${MIN_SERVICE_YEARS_FOR_ELIGIBILITY - effectiveYears} more year${MIN_SERVICE_YEARS_FOR_ELIGIBILITY - effectiveYears !== 1 ? 's' : ''}`}
                    </span>
                  </div>

                </div>

                {/* Results panel */}
                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  {/* Gratuity highlight box */}
                  <div style={{ width: '100%', background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 12, padding: mobile ? '12px 16px' : '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.dark }}>Gratuity Payable</span>
                    <span aria-live="polite" aria-label={`Gratuity payable: ${fmtIN(gratuityPayable)}`}
                      style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: C.dark, letterSpacing: '-0.02em' }}>{fmtIN(gratuityPayable)}</span>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: 'Tax-Free amount', value: fmtC(taxFree) },
                    { label: 'Taxable amount', value: fmtC(taxable) },
                    { label: 'Total gratuity', value: fmtC(gratuityPayable) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '15px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  {/* Donut */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 24, order: mobile ? 1 : -1 }}>
                    <DonutChart taxFree={taxFree} taxable={taxable} />
                  </div>

                  {/* Legend */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 22, marginBottom: mobile ? 8 : 28, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Tax-Free</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Taxable</span>
                    </div>
                  </div>

                  {/* Split bar */}
                  <div style={{ width: '100%', marginTop: mobile ? 8 : 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Tax-Free {taxFreePct}%</span>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Taxable {taxablePct}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${taxFreePct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>

                </div>
              </div>

              {/* Accrual schedule toggle */}
              <div id="accrual-schedule" style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowAmort(v => !v)} aria-expanded={showAmort} aria-controls="gratuity-accrual-panel"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '20px 48px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.ink }}>Gratuity Accrual Schedule</span>
                    {!mobile && <span style={{ fontSize: 13, color: C.ink3, marginLeft: 10 }}>(At current salary)</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 8 : 12, flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.dark, background: C.paleLime, border: `1px solid ${C.lime2}`, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {fmtC(salary)} &middot; Month
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      aria-hidden="true" style={{ transform: showAmort ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {showAmort && (
                  <div id="gratuity-accrual-panel" style={{ borderTop: `1px solid ${C.border}`, overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, padding: '10px 24px' }}>
                        Year-by-year gratuity accrual at a fixed {fmtC(salary)} monthly salary, from 5 to 30 years of service.
                      </caption>
                      <thead>
                        <tr style={{ background: '#f4f5f6' }}>
                          {['Year', 'Service completed', 'Gratuity', 'Tax-Free', 'Taxable'].map(h => (
                            <th key={h} scope="col" style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {accrualRows.map((row, i) => (
                          <tr key={row.yearsCompleted} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={{ padding: '13px 24px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                            <td style={{ padding: '13px 24px', color: C.ink2 }}>{row.yearsCompleted} Yr</td>
                            <td style={{ padding: '13px 24px', color: C.ink, fontWeight: 600 }}>{fmtIN(row.gratuity)}</td>
                            <td style={{ padding: '13px 24px', color: '#166534', fontWeight: 600 }}>{fmtIN(row.taxFree)}</td>
                            <td style={{ padding: '13px 24px', color: row.taxable > 0 ? C.ink2 : C.ink3 }}>{fmtIN(row.taxable)}</td>
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
                const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const, verticalAlign: 'middle' as const };
                const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'middle' as const, textAlign: 'left' as const } as React.CSSProperties;

                return (
                  <>
                    {/* 1: What is gratuity */}
                    <div id="what-is-gratuity" style={sec}>
                      <h2 style={h2}>What Is Gratuity?</h2>
                      <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                        <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                          Gratuity is a lump-sum payment made by an employer to an employee as recognition for long, continuous service. It is governed by the Payment of Gratuity Act, 1972, one of India&apos;s core labour laws.
                        </p>
                      </div>
                      <p style={p}>
                        The Act mandates gratuity for employees who complete at least 5 years of continuous service at an organisation with 10 or more people.
                      </p>
                      <p style={p}>
                        Unlike a provident fund, gratuity comes entirely from the employer, with no deduction from the employee&apos;s salary.
                      </p>
                      <p style={p}>
                        It is separate from other retirement income like <Link href="/calculators/nps-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>NPS</Link> or EPF, and factors into an overall <Link href="/calculators/retirement-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>retirement</Link> plan as a lump sum, not a recurring payout.
                      </p>
                    </div>

                    {/* 2: Formula */}
                    <div id="gratuity-formula" style={sec}>
                      <h2 style={h2}>Gratuity Formula: How to Calculate Gratuity</h2>
                      <p style={p}>Employers in India calculate gratuity using the statutory formula:</p>
                      <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, fontFamily: 'monospace', margin: '0 0 16px', padding: '12px 0' }}>
                        Gratuity = (15 &times; Last Drawn Salary &times; Years of Service) / 26
                      </p>
                      <p style={p}>
                        Here, 15 is the days of salary paid per completed year, salary means Basic Pay plus DA only, and 26 is the statutory average working days in a month.
                      </p>
                      <p style={p}>
                        Employees effectively receive close to half a month&apos;s basic salary for every year of completed service.
                      </p>
                      <h3 style={h3}>Worked example</h3>
                      <p style={p}>
                        A basic salary of Rs 50,000 a month for 5 years works out to {fmtIN(calcGratuity(50000, 5))}. At Rs 1,00,000 a month for the same 5 years, it is {fmtIN(calcGratuity(100000, 5))}. Enter your own numbers in the calculator above for an exact figure.
                      </p>
                    </div>

                    {/* 3: Eligibility */}
                    <div id="eligibility" style={sec}>
                      <h2 style={h2}>Gratuity Eligibility Criteria</h2>
                      <p style={p}>
                        Not every employee automatically qualifies for gratuity. These are the conditions under the Act:
                      </p>
                      <h3 style={h3}>5 years of continuous service</h3>
                      <p style={p}>
                        You must have worked with the same employer for 5 continuous years. A partial year beyond 6 months rounds up to a full year.
                      </p>
                      <h3 style={h3}>Organisation with 10 or more employees</h3>
                      <p style={p}>
                        The Act applies to organisations with 10 or more employees on any day in the preceding twelve months.
                      </p>
                      <h3 style={h3}>Exception: death or disablement</h3>
                      <p style={p}>
                        If service ends due to death or permanent disablement, the 5-year requirement is waived entirely.
                      </p>
                      <h3 style={h3}>Contractual and temporary staff</h3>
                      <p style={p}>
                        Temporary, contractual, and permanent employees are all covered under the Act once eligibility conditions are met.
                      </p>
                    </div>

                    {/* 4: Tax treatment */}
                    <div id="tax-treatment" style={sec}>
                      <h2 style={h2}>Gratuity Tax Treatment</h2>
                      <p style={p}>
                        Up to Rs 25 lakh of gratuity received by a private-sector employee is exempt from tax under Section 10(10). Anything above that is taxed at your slab rate.
                      </p>
                      <p style={p}>
                        This is a lifetime ceiling across every employer, not per employer. Government employees get full tax exemption on their entire gratuity, with no ceiling.
                      </p>
                      <p style={p}>
                        To see how a taxable gratuity portion affects your total tax bill for the year, run it through the <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</Link> alongside your regular salary income.
                      </p>
                    </div>

                    {/* 5: Private vs government */}
                    <div id="private-vs-government" style={sec}>
                      <h2 style={h2}>Private vs Government Employee Gratuity</h2>
                      <p style={p}>
                        Government employees do not use the Payment of Gratuity Act formula. They receive Death-cum-Retirement Gratuity (DCRG) instead, calculated differently and capped differently.
                      </p>
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 8 }}>
                          <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, padding: '8px 0 0' }}>
                            Private-sector Gratuity Act formula compared with government DCRG.
                          </caption>
                          <thead>
                            <tr>
                              <th style={thS} scope="col">Factor</th>
                              <th style={thS} scope="col">Private Sector (Gratuity Act)</th>
                              <th style={thS} scope="col">Government (DCRG)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={tdL}>Formula</td>
                              <td style={tdL}>(15 &times; Salary &times; Years) / 26</td>
                              <td style={tdL}>(6-month periods of service) &times; Last Pay / 4</td>
                            </tr>
                            <tr>
                              <td style={tdL}>Tax exemption</td>
                              <td style={tdL}>Up to Rs 25 lakh</td>
                              <td style={tdL}>Fully exempt, no ceiling</td>
                            </tr>
                            <tr>
                              <td style={tdL}>Statutory maximum payout</td>
                              <td style={tdL}>No ceiling on the formula result</td>
                              <td style={tdL}>Capped at Rs 20 lakh</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* In-content promo bar */}
                    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Retirement Calculator</p>
                        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>See how gratuity fits alongside EPF, NPS, and savings in your full retirement corpus.</p>
                      </div>
                      <Link className="fx-btn" href="/calculators/retirement-calculator" target="_blank" rel="noopener noreferrer"
                        style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                    </div>

                    {/* 6: How to use */}
                    <div id="how-to-use" style={sec}>
                      <h2 style={h2}>How to Use This Gratuity Calculator</h2>
                      <p style={p}>The calculator needs two inputs:</p>
                      <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {[
                          { label: 'Basic Salary + DA', text: 'enter your last drawn basic salary plus Dearness Allowance. Exclude HRA, bonuses, commissions, or other allowances.' },
                          { label: 'Years of Service', text: 'set the total duration of your employment, switching between years and months for a precise entry.' },
                          { label: 'Check eligibility', text: 'the calculator shows whether you meet the 5-year minimum, and whether the 6-month rounding rule applied.' },
                          { label: 'Review the result', text: 'read the gratuity payable, the tax-free and taxable split, and expand the accrual schedule to see growth over time.' },
                        ].map((it, i) => (
                          <li key={i} style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                            <strong style={{ color: C.ink }}>{it.label}:</strong> {it.text}
                          </li>
                        ))}
                      </ol>
                    </div>

                    

                    {/* 7: FAQ */}
                    <div id="faq" style={sec}>
                      <h2 style={h2}>Frequently Asked Questions</h2>
                      <FAQ />
                    </div>
                  </>
                );
              })()}
            </article>

            {/* DISCLAIMER */}
            <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
              <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                <strong>Disclaimer:</strong> All calculations on this page are indicative only. Gratuity amounts depend on your actual employment terms and your employer&apos;s payroll definitions. This calculator is for educational and planning purposes only and does not constitute legal or financial advice. Consult a qualified legal or financial professional for specific advice.
              </p>
            </div>

          </div>

          {/* SIDEBAR */}
          <aside
            className="gratuity-sidebar"
            style={{
              display: 'flex', flexDirection: 'column', gap: 16,
              position: mobile ? 'static' : 'sticky',
              top: 20,
              alignSelf: 'start',
              maxHeight: mobile ? 'none' : 'calc(100vh - 40px)',
              overflowY: mobile ? 'visible' : 'auto',
              paddingRight: mobile ? 0 : 2,
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
            } as React.CSSProperties}
          >
            <nav aria-label="Related Calculators" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <SidebarList title="Popular Calculators" items={POPULAR} />
              <SidebarList title="More Calculators" items={MORE} />
            </nav>
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

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
import { INFLATION_RETURN_FAQS } from './faqData';
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
  const presets = [1, 3, 5, 10, 15, 20, 30];
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
  { href: '/calculators/cagr-calculator',                    label: 'CAGR Calculator' },
  { href: '/calculators/xirr-calculator',                    label: 'XIRR Calculator' },
  { href: '/calculators/lumpsum-calculator',                 label: 'Lumpsum Calculator' },
  { href: '/calculators/future-value-calculator',            label: 'Future Value Calculator' },
  { href: '/calculators/rule-of-72-calculator',              label: 'Rule of 72 Calculator' },
  { href: '/calculators/compound-interest-calculator',       label: 'Compound Interest Calculator' },
  { href: '/calculators/real-return-calculator',             label: 'Real Return Calculator' },
  { href: '/calculators/investment-comparison-calculator',   label: 'Investment Comparison' },
];
const MORE = [
  { href: '/calculators/sip-calculator',           label: 'SIP Calculator' },
  { href: '/calculators/fd-calculator',            label: 'FD Calculator' },
  { href: '/calculators/ppf-calculator',           label: 'PPF Calculator' },
  { href: '/calculators/retirement-calculator',    label: 'Retirement Calculator' },
  { href: '/calculators/wealth-growth-calculator', label: 'Wealth Growth Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
function FAQ() {
  return <FAQBox items={INFLATION_RETURN_FAQS} />;
}

/* ─── Main ───────────────────────────────────────────────────── */

export default function InflationAdjustedReturnClient({ region = 'in' }: { region?: string }) {
  const defaultSettings = { initialValue: 100000, nominalRate: 12, inflationRate: 6, duration: 10, showTable: false };
  const { settings, updateSettings } = useCalculatorSettings('inflation-adjusted-return-calculator', defaultSettings);
  const { initialValue, nominalRate, inflationRate, duration, showTable } = settings;
  const setInitialValue = (v: any) => updateSettings({ initialValue: typeof v === 'function' ? v(settings.initialValue) : v });
  const setNominalRate = (v: any) => updateSettings({ nominalRate: typeof v === 'function' ? v(settings.nominalRate) : v });
  const setInflationRate = (v: any) => updateSettings({ inflationRate: typeof v === 'function' ? v(settings.inflationRate) : v });
  const setDuration = (v: any) => updateSettings({ duration: typeof v === 'function' ? v(settings.duration) : v });
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

  const result = useMemo(() => {
    if (duration <= 0 || initialValue <= 0) return null;
    const nominalRateDecimal = nominalRate / 100;
    const inflationRateDecimal = inflationRate / 100;
    const realRateDecimal = (1 + nominalRateDecimal) / (1 + inflationRateDecimal) - 1;
    const realRate = realRateDecimal * 100;
    const nominalFv = initialValue * Math.pow(1 + nominalRateDecimal, duration);
    const realFv = initialValue * Math.pow(1 + realRateDecimal, duration);
    const nominalGain = nominalFv - initialValue;
    const realGain = realFv - initialValue;
    const inflationErosion = nominalFv - realFv;
    return { nominalFv, realFv, nominalGain, realGain, inflationErosion, realRate, principal: initialValue, years: duration };
  }, [initialValue, nominalRate, inflationRate, duration]);

  const growthRows = useMemo(() => {
    if (!result) return [];
    const { principal, realRate } = result;
    const nominalRateDecimal = nominalRate / 100;
    const inflationRateDecimal = inflationRate / 100;
    const realRateDecimal = realRate / 100;
    const totalYears = Math.min(duration, 50);
    const startYear = new Date().getFullYear();
    return Array.from({ length: totalYears }, (_, idx) => {
      const y = idx + 1;
      const nominalValue = principal * Math.pow(1 + nominalRateDecimal, y);
      const realValue = principal * Math.pow(1 + realRateDecimal, y);
      const inflationImpact = nominalValue - realValue;
      return { year: startYear + y, nominalValue, realValue, inflationImpact };
    });
  }, [result, nominalRate, duration]);

  const principalPct = result ? Math.round((result.principal / result.nominalFv) * 100) : 50;
  const returnsPct = 100 - principalPct;

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const h3  = { fontSize: 15.5, fontWeight: 600, color: C.ink, margin: '0 0 6px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'middle', textAlign: 'left' } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'middle', textAlign: 'left' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } as React.CSSProperties;
  const bul = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 } as React.CSSProperties;
  const mono = { fontFamily: 'monospace', background: '#f4f5f6', padding: '2px 7px', borderRadius: 4, fontSize: 13.5, color: C.dark } as React.CSSProperties;
  const comparisonRows = [6, 8, 10, 12, 15, 20].map(nominal => {
    const nominalRateDecimal = nominal / 100;
    const realRateDecimal = (1 + nominalRateDecimal) / 1.06 - 1;
    const nominalValue = 100000 * Math.pow(1 + nominalRateDecimal, 10);
    const realValue = 100000 * Math.pow(1 + realRateDecimal, 10);
    return {
      nominal: `${nominal}%`,
      realRate: `${(realRateDecimal * 100).toFixed(2)}%`,
      nominalValue: Math.round(nominalValue),
      realValue: Math.round(realValue),
      erosion: Math.round(nominalValue - realValue),
    };
  });

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        {/* H1: primary keyword target */}
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Inflation Adjusted Return Calculator
          </h1>
          <p style={{ fontSize: 14.5, color: C.ink3, margin: 0 }}>
            Calculate real rate of return after adjusting for inflation using the Fisher equation
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="Inflation Adjusted Return Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  <Slider label="Initial Investment" id="initial-value" value={initialValue} min={1000} max={100000000} step={10000} fmt={fmtC} onChange={setInitialValue} compact={mobile} />
                  <Slider label="Nominal Return Rate" id="nominal-rate" value={nominalRate} min={1} max={50} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={setNominalRate} compact={mobile} />
                  <Slider label="Inflation Rate" id="inflation-rate" value={inflationRate} min={0} max={30} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={setInflationRate} compact={mobile} />
                  <Slider label="Time Period" id="duration" value={duration} min={1} max={40} step={1} fmt={v => `${v} Yr`} onChange={setDuration} compact={mobile} />
                  <YearPresets current={duration} onChange={setDuration} />
                </div>

                {/* Result panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {result ? (
                    <>

                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>
                          Real Rate of Return
                        </span>
                        <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                          aria-live="polite" aria-label={`Real rate of return: ${result.realRate.toFixed(2)}%`}>
                          {result.realRate.toFixed(2)}%
                        </span>
                      </div>

                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>
                          Nominal Future Value
                        </span>
                        <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                          aria-live="polite" aria-label={`Nominal future value: ${fmtIN(result.nominalFv)}`}>
                          {fmtIN(result.nominalFv)}
                        </span>
                      </div>

                      {[
                        { label: 'Initial investment',    value: fmtC(result.principal) },
                        { label: 'Real future value',     value: fmtC(result.realFv) },
                        { label: 'Nominal gain',          value: fmtC(result.nominalGain) },
                        { label: 'Real gain',             value: fmtC(result.realGain) },
                        { label: 'Inflation erosion',     value: fmtC(result.inflationErosion) },
                        { label: 'Nominal return',        value: `${nominalRate.toFixed(1)}%` },
                        { label: 'Inflation rate',        value: `${inflationRate.toFixed(1)}%` },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                        </div>
                      ))}

                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                        <DonutChart principal={result.principal} gains={result.nominalGain} principalPct={principalPct} />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                          <span style={{ fontSize: 12, color: C.ink2 }}>Principal {principalPct}%</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                          <span style={{ fontSize: 12, color: C.ink2 }}>Returns {returnsPct}%</span>
                        </div>
                      </div>

                      <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 11.5, color: C.ink3 }}>Principal {principalPct}%</span>
                          <span style={{ fontSize: 11.5, color: C.ink3 }}>Returns {returnsPct}%</span>
                        </div>
                        <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`Principal is ${principalPct}% of final value`}>
                          <div style={{ height: '100%', width: `${principalPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
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
              {result && growthRows.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowTable((v: boolean) => !v)}
                    aria-expanded={showTable} aria-controls="growth-table"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Year-by-Year Inflation Impact Table</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>Nominal vs real value breakdown</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {result.years} yr · {nominalRate.toFixed(1)}% nominal
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showTable && (
                    <div id="growth-table" style={{ borderTop: `1px solid ${C.border}` }}>
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
                              {['Year', 'Nominal Value', 'Real Value', 'Inflation Impact'].map(h => (
                                <th key={h} style={{ padding: '10px 20px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap', border: `1px solid ${C.border}` }} scope="col">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {growthRows.map((row, i) => (
                              <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ padding: '11px 20px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                                <td style={{ padding: '11px 20px', color: C.ink2 }}>{fmtIN(row.nominalValue)}</td>
                                <td style={{ padding: '11px 20px', color: '#1f7a58', fontWeight: 600 }}>{fmtIN(row.realValue)}</td>
                                <td style={{ padding: '11px 20px', color: C.ink, fontWeight: 600 }}>{fmtIN(Math.abs(row.inflationImpact))}</td>
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

              <div style={{ ...sec, marginBottom: 28 }}>
                {/* TODO: Add the name of a qualified reviewer before publication. */}
                <p style={{ ...p, fontSize: 12.5, marginBottom: 10 }}>
                  Last updated: <time dateTime="2026-09-28">28 September 2026</time>. Reviewer: Pending qualified review.
                </p>
              </div>

              <p style={{ ...p, fontSize: 15.5, fontWeight: 600, color: C.ink }}>
                <strong>Quick answer:</strong> Inflation adjusted return, also called the real rate of return, equals ((1 + nominal return) / (1 + inflation rate)) - 1. A 12% nominal return with 6% inflation produces a 5.66% real return. This shows how purchasing power changes after inflation, not just how the account balance grows.
              </p>

              {/* AEO: definition block targets Google's definition featured snippet */}
              <div style={sec}>
                <h2 style={h2} id="what-is-inflation-adjusted-return">What Is Inflation Adjusted Return?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Inflation adjusted return, also called the real rate of return, is the annual percentage gain on an investment after removing the effect of inflation. It measures the actual increase in purchasing power, not just the nominal growth in your account balance.
                  </p>
                </div>
                <p style={p}>
                  For an illustration, a fixed deposit earning 7.5% while inflation is 6% produces a real return of about 1.42% before tax. These are example assumptions, not a quote for a current deposit or inflation forecast. Official CPI data is published by the Ministry of Statistics and Programme Implementation.
                </p>
                <p style={p}>
                  The nominal return is what the bank or fund reports. The real return is what your money can actually buy. For long-term investors, the real return is the only number that matters for planning.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="inflation-adjusted-return-formula">Inflation Adjusted Return Formula</h2>
                <p style={p}>The formula uses the Fisher equation, named after economist Irving Fisher:</p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 15, fontWeight: 700, color: C.dark }}>
                    Real Rate = ((1 + Nominal Rate) / (1 + Inflation Rate)) minus 1
                  </code>
                </div>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={{ ...thS, width: 140 }} scope="col">Variable</th><th style={thS} scope="col">Meaning</th></tr></thead>
                    <tbody>
                      {[
                        ['Nominal Rate', 'The reported annual return before inflation adjustment'],
                        ['Inflation Rate', 'The annual CPI inflation rate over the investment period'],
                        ['Real Rate', 'The actual return adjusted for inflation (result)'],
                      ].map(([v, m]) => (
                        <tr key={v}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{v}</td><td style={tdR}>{m}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  <strong>Worked example:</strong> Nominal return of 12% with inflation at 6%. Real rate = ((1.12 / 1.06) minus 1) = 0.0566 = 5.66%. Your investment grows 12% in nominal terms but only 5.66% in real purchasing power. The remaining 6.34% is consumed by inflation. Simple subtraction would give 6%, but the Fisher equation gives the exact number.
                </p>
                <p style={p}>
                  To find the real future value: Rs 1 lakh at 12% nominal for 10 years gives a nominal future value of Rs 3,10,585. At 6% inflation, the exact real future value is Rs 1,73,429. The purchasing power difference is Rs 1,37,156.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="nominal-return-vs-real-return">Nominal Return vs Real Return: Why the Difference Matters</h2>
                <p style={p}>
                  Nominal return is what you see on your mutual fund statement, FD certificate, or stock portfolio. Real return is what you can actually spend. The gap between them is inflation, and it compounds just like your returns do.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>How nominal vs real returns differ at 6% inflation over 10 years on Rs 1 lakh</caption>
                    <thead><tr><th style={thS} scope="col">Nominal Return</th><th style={thS} scope="col">Real Return</th><th style={thS} scope="col">Nominal FV</th><th style={thS} scope="col">Real FV</th><th style={thS} scope="col">Inflation Erosion</th></tr></thead>
                    <tbody>
                      {comparisonRows.map(row => (
                        <tr key={row.nominal} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{row.nominal}</td>
                          <td style={{ ...tdR, color: '#1f7a58', fontWeight: 700 }}>{row.realRate}</td>
                          <td style={tdR}>Rs {row.nominalValue.toLocaleString('en-IN')}</td>
                          <td style={tdR}>Rs {row.realValue.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdR, color: C.ink, fontWeight: 700 }}>Rs {row.erosion.toLocaleString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  At every nominal return level, inflation erodes purchasing power. Even at 20% nominal return, about Rs 2,73,430 of the Rs 6,19,174 nominal value is lost to inflation over this example period. The longer the period, the larger the cumulative effect.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="inflation-adjusted-return-excel">Inflation Adjusted Return in Excel: Three Methods</h2>
                <p style={p}>
                  Calculating inflation-adjusted returns in Excel can be done using the Fisher equation formula or built-in financial functions.
                </p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 700, color: C.dark }}>
                    = ((1 + nominal_rate) / (1 + inflation_rate)) - 1
                  </code>
                </div>
                <p style={p}>
                  To find the real rate of return when nominal rate is in cell A1 (e.g. 12%) and inflation rate is in cell A2 (e.g. 6%), enter `=((1+A1)/(1+A2))-1` and format the result as a percentage. If A3 is principal and A4 is years, use `=A3*((1+A1)/(1+A2))^A4` for the inflation-adjusted future value.
                </p>
                <ol style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={p}><strong style={{ color: C.ink }}>Fisher real rate:</strong> enter `=((1+A1)/(1+A2))-1`, where A1 is nominal return and A2 is inflation.</li>
                  <li style={p}><strong style={{ color: C.ink }}>Real future value:</strong> enter `=A3*((1+A1)/(1+A2))^A4`, where A3 is the starting amount and A4 is the number of years.</li>
                  <li style={p}><strong style={{ color: C.ink }}>Year-by-year deflator:</strong> if B2 contains the nominal value for a year and A2 contains annual inflation, divide by the accumulated price index. For one year, use `=B2/(1+$A$2)`; for multiple years, compound the inflation factor for the matching year count.</li>
                </ol>
              </div>

              <div style={sec}>
                <h2 style={h2} id="reverse-inflation-adjusted-calculator">Reverse Real Return Calculation: Target Purchasing Power</h2>
                <p style={p}>
                  A reverse real return calculation determines the nominal return required to achieve a target increase in real purchasing power.
                </p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 700, color: C.dark }}>
                    Required Nominal Rate = (1 + Target Real Rate) &times; (1 + Expected Inflation) - 1
                  </code>
                </div>
                <p style={p}>
                  If you want your wealth to grow by a net 6% real rate of return above an expected 6% inflation rate, you need a nominal return of `(1.06 &times; 1.06) - 1 = 12.36%` per annum. Aiming for a 12% nominal return in a 6% inflation environment will only deliver a 5.66% real return, falling short of your target.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="fd-vs-equity-real-return">Real Rate of Return on Fixed Deposits vs Equities in India</h2>
                <p style={p}>
                  Bank fixed deposits in India often deliver near-zero or negative real returns after accounting for both CPI inflation and income tax on interest earned. Test fixed income interest in our <Link href="/calculators/fd-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>FD Calculator</Link> or evaluate tax-exempt compounding in our <Link href="/calculators/ppf-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>PPF Calculator</Link>.
                </p>
                <p style={p}>
                  In an illustrative case, a 7.0% FD return taxed at a 30% marginal rate leaves 4.9% before cess. At 6% inflation, that is a real return of about -1.04%. Equity returns also need tax treatment based on the asset and holding period; compare like-for-like net returns using the <Link href="/calculators/cagr-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>CAGR Calculator</Link> and current official tax guidance.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="inflation-erosion-retirement">Impact of Inflation Erosion on Long-Term Wealth & Retirement Planning</h2>
                <p style={p}>
                  Inflation erosion compounds aggressively over multi-decade horizons, drastically shrinking the purchasing power of your retirement corpus. You can calculate total retirement target needs using our <Link href="/calculators/retirement-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Retirement Calculator</Link>.
                </p>
                <p style={p}>
                  A retirement target of Rs 5 crore in 25 years sounds substantial, but at an average inflation rate of 6% p.a., its real purchasing power drops to just Rs 1.16 crore in today&apos;s terms. Financial planners recommend estimating retirement expenses using real rates of return rather than nominal numbers to ensure your accumulated corpus supports your expected lifestyle.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="nri-real-return">Real Rate of Return for NRI Investors: Dual Inflation & Currency Effect</h2>
                <p style={p}>
                  NRI investors evaluating Indian investments must account for both domestic CPI inflation in India and currency exchange rate movements against their home currency.
                </p>
                <p style={p}>
                  For an NRI investing USD into INR assets earning a 12% nominal return, if INR depreciates by 3% annually against USD and USD inflation runs at 3%, the net USD real rate of return is approximately 5.7%. Evaluating real returns in the investor&apos;s functional home currency ensures an accurate comparison with global investment options.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="sip-inflation-adjusted-return">How Inflation Adjusted Return Applies to SIP Investments</h2>
                <p style={p}>
                  Systematic Investment Plans (SIPs) help counter inflation by dollar-cost averaging, but the returns reported on broker dashboards remain nominal figures. Check mutual fund cashflows in our <Link href="/calculators/xirr-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>XIRR Calculator</Link> or simulate ongoing monthly investments in our <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SIP Calculator</Link> alongside a single investment in our <Link href="/calculators/lumpsum-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Lumpsum Calculator</Link>.
                </p>
                <p style={p}>
                  When an equity SIP reports a 14% XIRR over 15 years, adjusting for 6% annual inflation lowers the real rate of return to approximately 7.55%. To maintain constant purchasing power of your monthly contribution over time, consider using a Step-Up SIP that increases your investment amount annually at or above the expected inflation rate.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="real-return-limitations">Limitations of Real Rate of Return Calculations</h2>
                <p style={p}>
                  While the Fisher equation provides accurate mathematical models, investors should keep four practical limitations in mind when using real return calculations.
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Personal inflation variance:</strong> Headline CPI inflation measured by the government may differ from your personal lifestyle inflation, particularly in healthcare, higher education, and housing.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Tax impact excluded:</strong> Standard real return formulas calculate pre-tax real returns. Income tax on interest or capital gains further reduces net purchasing power.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Fluctuating annual rates:</strong> Inflation and nominal returns fluctuate from year to year; assuming a constant rate over 20 years is a simplifying model.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Reinvestment risk:</strong> Fixed income instruments may mature into lower-rate environments, altering real returns over time.
                  </li>
                </ul>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This Inflation Adjusted Return Calculator</h2>
                <p style={p}>The calculator has four inputs and returns the real rate of return plus the inflation adjusted future value:</p>

                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Initial Investment:</strong> enter the amount you plan to invest or have invested as a lumpsum.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Nominal Return Rate:</strong> enter the expected annual return. For mutual funds, use the historical CAGR. For FDs, use the interest rate.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Inflation Rate:</strong> enter an assumption suited to your time horizon and goal. Test a lower and higher scenario because no single rate predicts future costs.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Time Period:</strong> select the number of years. Use the year presets (1Y to 30Y) or drag the slider.
                  </li>
                </ol>
                <p style={{ ...p, margin: 0 }}>
                  The result panel shows the real rate of return, nominal and real future values, nominal gain, real gain, and inflation erosion. Expand the year-by-year table to see how inflation impacts your investment in each individual year. Click any input value to type a precise number.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="real-return-cheat-sheet">Real Return Cheat Sheet: 12% Nominal Return at Different Inflation Rates</h2>
                <p style={p}>At a fixed 12% nominal return, each higher inflation assumption lowers the real return calculated with the Fisher equation.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' }}>Real annual return at 12% nominal return</caption>
                    <thead><tr><th style={thS} scope="col">Inflation rate</th><th style={thS} scope="col">Real return</th></tr></thead>
                    <tbody>{[[4, '7.69%'], [5, '6.67%'], [6, '5.66%'], [7, '4.67%'], [8, '3.70%'], [10, '1.82%']].map(([inflation, real]) => (
                      <tr key={inflation}><th scope="row" style={{ ...tdL, fontWeight: 700, color: C.ink }}>{inflation}%</th><td style={tdR}>{real}</td></tr>
                    ))}</tbody>
                  </table>
                </div>
                <p style={p}>Near these assumptions, another percentage point of inflation costs close to one percentage point of real return. The exact difference depends on both rates.</p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="purchasing-power-loss">How Much Purchasing Power Does Rs 1 Lakh Lose to Inflation?</h2>
                <p style={p}>At constant inflation, Rs 1 lakh buys less over time; the figures below show its value in today’s rupees.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' }}>Purchasing power of Rs 1,00,000 in today’s money</caption>
                    <thead><tr><th style={thS} scope="col">Years</th><th style={thS} scope="col">At 5% inflation</th><th style={thS} scope="col">At 6% inflation</th><th style={thS} scope="col">At 7% inflation</th></tr></thead>
                    <tbody>{[
                      ['10', 'Rs 61,391', 'Rs 55,839', 'Rs 50,835'],
                      ['20', 'Rs 37,689', 'Rs 31,180', 'Rs 25,842'],
                      ['30', 'Rs 23,138', 'Rs 17,411', 'Rs 13,137'],
                    ].map(row => <tr key={row[0]}>{row.map((cell, i) => i === 0 ? <th key={cell} scope="row" style={{ ...tdL, fontWeight: 700, color: C.ink }}>{cell}</th> : <td key={cell} style={tdR}>{cell}</td>)}</tr>)}</tbody>
                  </table>
                </div>
                <p style={p}>To match the buying power of Rs 1 lakh today, you would need about Rs 1.79 lakh in 10 years, Rs 3.21 lakh in 20 years, and Rs 5.74 lakh in 30 years at 6% inflation. The Rule of 72 estimates that prices double in about 12 years at 6% inflation.</p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="worked-example">Step-by-Step Example: Rs 1 Lakh at 12%, 6% Inflation, 10 Years</h2>
                <p style={p}>A Rs 1 lakh investment earning 12% nominally for 10 years has a real future value of about Rs 1.73 lakh when inflation is 6%.</p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ ...p, margin: 0 }}><strong style={{ color: C.ink }}>Real rate:</strong> (1.12 / 1.06) - 1 = 5.66% a year.</li>
                  <li style={{ ...p, margin: 0 }}><strong style={{ color: C.ink }}>Nominal future value:</strong> Rs 1,00,000 × 1.12^10 = Rs 3,10,585.</li>
                  <li style={{ ...p, margin: 0 }}><strong style={{ color: C.ink }}>Real future value:</strong> Rs 1,00,000 × (1.12 / 1.06)^10 = Rs 1,73,429.</li>
                  <li style={{ ...p, margin: 0 }}><strong style={{ color: C.ink }}>Purchasing power difference:</strong> Rs 3,10,585 - Rs 1,73,429 = Rs 1,37,156.</li>
                </ol>
                <p style={p}>The year-10 balance is Rs 3.1 lakh, but it buys roughly what Rs 1.73 lakh buys today. Exact displayed amounts can vary by rounding.</p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="fisher-exact-vs-approximate">Fisher Equation: Exact Return Versus the Approximation</h2>
                <p style={p}>Subtracting inflation from nominal return is a quick estimate; the Fisher equation gives the exact real rate for annual growth assumptions.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' }}>Approximation error in percentage points</caption>
                    <thead><tr><th style={thS} scope="col">Nominal / inflation</th><th style={thS} scope="col">Approximate</th><th style={thS} scope="col">Exact</th><th style={thS} scope="col">Error</th></tr></thead>
                    <tbody>{[
                      ['8% / 6%', '2.00%', '1.89%', '0.11'],
                      ['12% / 6%', '6.00%', '5.66%', '0.34'],
                      ['20% / 10%', '10.00%', '9.09%', '0.91'],
                    ].map(row => <tr key={row[0]}>{row.map((cell, i) => i === 0 ? <th key={cell} scope="row" style={{ ...tdL, fontWeight: 700, color: C.ink }}>{cell}</th> : <td key={cell} style={tdR}>{cell}</td>)}</tr>)}</tbody>
                  </table>
                </div>
                <p style={p}>The error grows as the nominal and inflation rates rise. Economist Irving Fisher developed the relationship between nominal rates, real rates and inflation.</p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="required-return">What Nominal Return Do You Need?</h2>
                <p style={p}>To target a real return, combine the target with expected inflation instead of adding the two rates.</p>
                <p style={p}><strong style={{ color: C.ink }}>Required nominal return = (1 + target real return) × (1 + inflation) - 1.</strong> At 6% inflation, these are the nominal rates needed for each illustrative real target:</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' }}>Required nominal annual return at 6% inflation</caption>
                    <thead><tr><th style={thS} scope="col">Target real return</th><th style={thS} scope="col">Required nominal return</th></tr></thead>
                    <tbody>{[['3%', '9.18%'], ['5%', '11.30%'], ['6%', '12.36%'], ['7%', '13.42%'], ['8%', '14.48%']].map(row => <tr key={row[0]}><th scope="row" style={{ ...tdL, fontWeight: 700, color: C.ink }}>{row[0]}</th><td style={tdR}>{row[1]}</td></tr>)}</tbody>
                  </table>
                </div>
                <p style={p}>Use the <Link href="/calculators/cagr-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>CAGR Calculator</Link> for a lumpsum’s annual growth, or the <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SIP Calculator</Link> to project recurring contributions.</p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="post-tax-real-return">Post-Tax Real Return: FD, Equity and PPF</h2>
                <p style={p}>Post-tax real return adjusts the return left after tax for inflation, and its result depends on each investor’s tax position and the rules for that asset.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' }}>Illustrations at 6% inflation, not current product-rate quotes</caption>
                    <thead><tr><th style={thS} scope="col">Instrument and assumed return</th><th style={thS} scope="col">Tax treatment to check</th><th style={thS} scope="col">Illustrative real return</th></tr></thead>
                    <tbody>{[
                      ['FD: 7.0%', 'Interest is generally taxed at the investor’s applicable slab rate.', '-1.04% after assuming a 30% tax rate, before cess'],
                      ['Equity: 12.0%', 'Tax depends on the instrument, holding period and current capital-gains rules.', '5.66% before tax'],
                      ['PPF: 7.1% example input', 'PPF interest is tax-exempt under current scheme rules; verify current rate and eligibility.', '1.04% using the example rate'],
                      ['Savings: 3.5%', 'Tax treatment depends on account type and individual circumstances.', '-2.36% before tax'],
                    ].map(row => <tr key={row[0]}><th scope="row" style={{ ...tdL, fontWeight: 700, color: C.ink }}>{row[0]}</th><td style={tdL}>{row[1]}</td><td style={tdR}>{row[2]}</td></tr>)}</tbody>
                  </table>
                </div>
                <p style={p}>The PPF figure is an example input supplied for this page, not a claim about the current notified rate. Confirm the applicable rate with the <a href="https://www.nsiindia.gov.in/InternalPage.aspx?Id_Pk=55" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>National Savings Institute</a>. Tax rules change; check the <a href="https://www.incometax.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Department</a> guidance or consult a tax professional before acting.</p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="inflation-assumption">Which Inflation Rate Should You Use?</h2>
                <p style={p}>Use an inflation assumption that reflects the goal’s likely expenses, then test more than one scenario rather than relying on a single forecast.</p>
                <p style={p}>India’s CPI inflation target is 4%, with a 2% to 6% tolerance band. This is a policy target, not a promise that personal costs will rise at that pace. The <a href="https://www.rbi.org.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Reserve Bank of India</a> publishes monetary policy material, while <a href="https://www.mospi.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>MoSPI</a> publishes official CPI data.</p>
                <p style={p}>For education and healthcare goals, model a higher scenario if those costs matter heavily to your plan. For an optimistic case, test a lower rate as well. The right assumption depends on the expense, not just the national CPI figure.</p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="real-return-mistakes">Common Mistakes When Calculating Real Returns</h2>
                <p style={p}>Real-return estimates become misleading when the return, inflation, tax and time period do not use consistent assumptions.</p>
                <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {[
                    'Subtracting inflation instead of using the exact Fisher equation can overstate the real rate.',
                    'Ignoring tax and fees makes a pre-tax result look like spendable growth.',
                    'Headline CPI may not match personal inflation for education, housing or healthcare.',
                    'Comparing a nominal FD rate with a real equity return mixes unlike measures.',
                    'Assuming one return and inflation rate will hold for 30 years hides uncertainty.',
                  ].map(item => <li key={item} style={{ ...p, margin: 0 }}>{item}</li>)}
                </ul>
              </div>

              <div style={sec}>
                <h2 style={h2} id="who-should-use">Who Should Use This Calculator?</h2>
                <p style={p}>This calculator is useful when you have an annual nominal return and want to understand its purchasing-power effect.</p>
                <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 9 }}>
                  <li style={p}>FD and debt investors can compare an interest rate with inflation using the <Link href="/calculators/fd-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>FD Calculator</Link>.</li>
                  <li style={p}>Long-term equity investors can adjust an annualised result from the <Link href="/calculators/cagr-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>CAGR Calculator</Link>.</li>
                  <li style={p}>SIP investors should calculate dated cash flows with the <Link href="/calculators/xirr-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>XIRR Calculator</Link>, then compare that return with inflation.</li>
                  <li style={p}>Retirement planners can model a future corpus with the <Link href="/calculators/retirement-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Retirement Calculator</Link>.</li>
                </ul>
              </div>

              <div style={sec}>
                <h2 style={h2} id="related-calculators">Related Calculators</h2>
                <p style={p}>Use a return calculator that matches the investment type and cash-flow pattern before adjusting the result for inflation.</p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>XIRR Calculator</p>
                    <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Measure the annualised return on SIPs and irregular cash flows.</p>
                  </div>
                  <Link className="fx-btn" href="/calculators/xirr-calculator" target="_blank" rel="noopener noreferrer" style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                </div>
                <ul style={{ margin: 0, paddingLeft: 22, columns: mobile ? 1 : 2 }}>
                  {[
                    ['/calculators/cagr-calculator', 'CAGR Calculator: annualised growth for a lumpsum'],
                    ['/calculators/xirr-calculator', 'XIRR Calculator: SIPs and dated cash flows'],
                    ['/calculators/sip-calculator', 'SIP Calculator: monthly investment projections'],
                    ['/calculators/lumpsum-calculator', 'Lumpsum Calculator: one-time investment growth'],
                    ['/calculators/step-up-sip-calculator', 'Step-Up SIP Calculator: rising contributions'],
                    ['/calculators/fd-calculator', 'FD Calculator: fixed deposit maturity'],
                    ['/calculators/ppf-calculator', 'PPF Calculator: public provident fund projections'],
                    ['/calculators/epf-calculator', 'EPF Calculator: provident fund maturity'],
                    ['/calculators/inflation-calculator', 'Inflation Calculator: purchasing power over time'],
                    ['/calculators/retirement-calculator', 'Retirement Calculator: future income planning'],
                  ].map(([href, label]) => <li key={href} style={{ fontSize: 13.5, lineHeight: 1.9, breakInside: 'avoid' }}><Link href={href} target="_blank" rel="noopener noreferrer" style={{ color: C.dark }}>{label}</Link></li>)}
                </ul>
              </div>

              

              <div>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> Calculations and rates on this page are illustrative, not investment or tax advice, and can change. Check current data with the <a href="https://www.mospi.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Ministry of Statistics and Programme Implementation</a>, <a href="https://www.rbi.org.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>RBI</a>, <a href="https://www.nsiindia.gov.in/InternalPage.aspx?Id_Pk=55" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>National Savings Institute</a> and the <a href="https://www.incometax.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Department</a>. Consult a qualified CA or financial adviser before making major investment decisions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.infl-adj-sidebar::-webkit-scrollbar{width:5px}.infl-adj-sidebar::-webkit-scrollbar-track{background:transparent}.infl-adj-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.infl-adj-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="infl-adj-sidebar" aria-label="Related calculators" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ flexShrink: 0 }}><SidebarList title="Popular Calculators" items={POPULAR} /></div>
              <div style={{ flexShrink: 0 }}><SidebarList title="More Calculators" items={MORE} /></div>
            </div>
          </aside>

        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/sip-calculator|SIP', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/cagr-calculator|CAGR', '/calculators/swp-calculator|SWP', '/calculators/emi-calculator|EMI', '/calculators/fd-calculator|FD', '/calculators/ppf-calculator|PPF', '/calculators/xirr-calculator|XIRR', '/calculators/compound-interest-calculator|Compound Int.'] },
        { hd: 'Topics', links: ['/calculators/sip-calculator|Mutual Funds', '/calculators/home-loan-calculator|Home Loans', '/calculators/fd-calculator|Fixed Deposits', '/calculators/retirement-calculator|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

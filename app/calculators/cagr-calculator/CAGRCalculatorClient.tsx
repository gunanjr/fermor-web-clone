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
import { faqItems } from './faqData';
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

type Mode = 'cagr' | 'fv' | 'years';

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
  { href: '/calculators/xirr-calculator',                  label: 'XIRR Calculator' },
  { href: '/calculators/lumpsum-calculator',               label: 'Lumpsum Calculator' },
  { href: '/calculators/future-value-calculator',          label: 'Future Value Calculator' },
  { href: '/calculators/rule-of-72-calculator',            label: 'Rule of 72 Calculator' },
  { href: '/calculators/compound-interest-calculator',     label: 'Compound Interest Calculator' },
  { href: '/calculators/real-return-calculator',           label: 'Real Return Calculator' },
  { href: '/calculators/investment-comparison-calculator', label: 'Investment Comparison' },
];
const MORE = [
  { href: '/calculators/sip-calculator',           label: 'SIP Calculator' },
  { href: '/calculators/fd-calculator',            label: 'FD Calculator' },
  { href: '/calculators/ppf-calculator',           label: 'PPF Calculator' },
  { href: '/calculators/retirement-calculator',    label: 'Retirement Calculator' },
  { href: '/calculators/wealth-growth-calculator', label: 'Wealth Growth Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
/* Single source of truth lives in faqData.ts (plain module, no 'use client'),
   so both this client component and the server page.tsx schema can import it
   without crossing the RSC client-boundary with a non-component export. */

/* ─── In-content promo bar ───────────────────────────────────────── */
function PromoBar({ href, name, blurb }: { href: string; name: string; blurb: string }) {
  return (
    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>{name}</p>
        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>{blurb}</p>
      </div>
      <Link className="fx-btn" href={href} target="_blank" rel="noopener noreferrer"
        style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
        Open calculator
      </Link>
    </div>
  );
}

function FAQ() {
  return <FAQBox items={faqItems} />;
}

/* ─── Main ───────────────────────────────────────────────────── */

export default function CAGRCalculatorClient({ region = 'in' }: { region?: string }) {
  const defaultSettings = { mode: 'cagr', showTable: false, initialValue: 100000, finalValue: 200000, duration: 5, fvInitial: 100000, fvCagr: 12, fvYears: 10, yrInitial: 100000, yrTarget: 500000, yrCagr: 15 };
  const { settings, updateSettings } = useCalculatorSettings('cagr-calculator', defaultSettings);
  const { mode, showTable, initialValue, finalValue, duration, fvInitial, fvCagr, fvYears, yrInitial, yrTarget, yrCagr } = settings;
  const setMode = (v: any) => updateSettings({ mode: typeof v === 'function' ? v(settings.mode) : v });
  const setShowTable = (v: any) => updateSettings({ showTable: typeof v === 'function' ? v(settings.showTable) : v });
  const setInitialValue = (v: any) => updateSettings({ initialValue: typeof v === 'function' ? v(settings.initialValue) : v });
  const setFinalValue = (v: any) => updateSettings({ finalValue: typeof v === 'function' ? v(settings.finalValue) : v });
  const setDuration = (v: any) => updateSettings({ duration: typeof v === 'function' ? v(settings.duration) : v });
  const setFvInitial = (v: any) => updateSettings({ fvInitial: typeof v === 'function' ? v(settings.fvInitial) : v });
  const setFvCagr = (v: any) => updateSettings({ fvCagr: typeof v === 'function' ? v(settings.fvCagr) : v });
  const setFvYears = (v: any) => updateSettings({ fvYears: typeof v === 'function' ? v(settings.fvYears) : v });
  const setYrInitial = (v: any) => updateSettings({ yrInitial: typeof v === 'function' ? v(settings.yrInitial) : v });
  const setYrTarget = (v: any) => updateSettings({ yrTarget: typeof v === 'function' ? v(settings.yrTarget) : v });
  const setYrCagr = (v: any) => updateSettings({ yrCagr: typeof v === 'function' ? v(settings.yrCagr) : v });
  const [mobile,    setMobile]    = useState(false);
  
  /* calculator state: defaults match common use cases */
                  
  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const result = useMemo(() => {
    if (mode === 'cagr') {
      if (duration <= 0 || initialValue <= 0 || finalValue <= 0) return null;
      const cagr = (Math.pow(finalValue / initialValue, 1 / duration) - 1) * 100;
      const gain = finalValue - initialValue;
      return { type: 'cagr' as const, cagr, absoluteReturn: (gain / initialValue) * 100, gain, principal: initialValue, fv: finalValue, years: duration };
    }
    if (mode === 'fv') {
      if (fvYears <= 0 || fvInitial <= 0) return null;
      const fv   = fvInitial * Math.pow(1 + fvCagr / 100, fvYears);
      const gain = fv - fvInitial;
      return { type: 'fv' as const, cagr: fvCagr, absoluteReturn: (gain / fvInitial) * 100, gain, principal: fvInitial, fv, years: fvYears };
    }
    if (yrCagr <= 0 || yrInitial <= 0 || yrTarget <= yrInitial) return null;
    const years = Math.log(yrTarget / yrInitial) / Math.log(1 + yrCagr / 100);
    const gain  = yrTarget - yrInitial;
    return { type: 'years' as const, cagr: yrCagr, absoluteReturn: (gain / yrInitial) * 100, gain, principal: yrInitial, fv: yrTarget, years };
  }, [mode, initialValue, finalValue, duration, fvInitial, fvCagr, fvYears, yrInitial, yrTarget, yrCagr]);

  const growthRows = useMemo(() => {
    if (!result) return [];
    const { principal, cagr, years } = result;
    const rate = cagr / 100;
    const totalYears = Math.min(Math.ceil(Math.abs(years)), 50);
    const startYear = new Date().getFullYear();
    return Array.from({ length: totalYears }, (_, idx) => {
      const y = idx + 1;
      const value = principal * Math.pow(1 + rate, y);
      return { year: startYear + y, value, gain: value - principal, pct: ((value / principal) - 1) * 100 };
    });
  }, [result]);

  const prinPct    = result ? Math.round((result.principal / result.fv) * 100) : 50;
  const returnsPct = 100 - prinPct;

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const h3  = { fontSize: 15.5, fontWeight: 600, color: C.ink, margin: '0 0 6px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 600, color: C.ink3, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } as React.CSSProperties;
  const bul = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 } as React.CSSProperties;
  const mono = { fontFamily: 'monospace', background: '#f4f5f6', padding: '2px 7px', borderRadius: 4, fontSize: 13.5, color: C.dark } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        {/* H1: primary keyword target */}
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            CAGR Calculator
          </h1>
          <p style={{ fontSize: 14.5, color: C.ink3, margin: 0 }}>
            Compound Annual Growth Rate Calculator: find CAGR %, project future value, or use reverse CAGR to find duration
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="CAGR Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              {/* Tabs */}
              <div role="tablist" aria-label="Calculator mode" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                {([
                  { id: 'cagr',  label: 'CAGR %',        desc: 'Calculate compound annual growth rate from start and end values' },
                  { id: 'fv',    label: 'Future Value',   desc: 'Project future value at a given CAGR' },
                  { id: 'years', label: 'Reverse CAGR',   desc: 'Find how many years to reach a target value' },
                ] as { id: Mode; label: string; desc: string }[]).map(tab => (
                  <button key={tab.id}
                    role="tab" aria-selected={mode === tab.id} aria-controls={`panel-${tab.id}`}
                    onClick={() => { setMode(tab.id); setShowTable(false); }}
                    title={tab.desc}
                    style={{
                      flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: mobile ? 12.5 : 13.5, fontWeight: mode === tab.id ? 700 : 400,
                      color: mode === tab.id ? C.dark : C.ink3,
                      borderBottom: mode === tab.id ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                      transition: 'all 0.15s', fontFamily: INTER,
                    }}>
                    {tab.label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div role="tabpanel" id={`panel-${mode}`} style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  {mode === 'cagr' && <>
                    <Slider label="Initial Investment" id="cagr-initial" value={initialValue} min={10000} max={10000000} step={10000} fmt={fmtC} onChange={setInitialValue} compact={mobile} />
                    <Slider label="Final Value" id="cagr-final" value={finalValue} min={10000} max={100000000} step={10000} fmt={fmtC} onChange={setFinalValue} compact={mobile} />
                    <Slider label="Duration" id="cagr-duration" value={duration} min={1} max={30} step={1} fmt={v => `${v} Yr`} onChange={setDuration} compact={mobile} />
                    <YearPresets current={duration} onChange={setDuration} />
                  </>}

                  {mode === 'fv' && <>
                    <Slider label="Initial Investment" id="fv-initial" value={fvInitial} min={10000} max={10000000} step={10000} fmt={fmtC} onChange={setFvInitial} compact={mobile} />
                    <Slider label="Expected CAGR" id="fv-cagr" value={fvCagr} min={1} max={50} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={setFvCagr} compact={mobile} />
                    <Slider label="Duration" id="fv-duration" value={fvYears} min={1} max={30} step={1} fmt={v => `${v} Yr`} onChange={setFvYears} compact={mobile} />
                    <YearPresets current={fvYears} onChange={setFvYears} />
                  </>}

                  {mode === 'years' && <>
                    <Slider label="Initial Investment" id="yr-initial" value={yrInitial} min={10000} max={10000000} step={10000} fmt={fmtC} onChange={setYrInitial} compact={mobile} />
                    <Slider label="Target Value" id="yr-target" value={yrTarget} min={10000} max={100000000} step={10000} fmt={fmtC} onChange={setYrTarget} compact={mobile} />
                    <Slider label="Expected CAGR" id="yr-cagr" value={yrCagr} min={1} max={50} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={setYrCagr} compact={mobile} />
                    <p style={{ fontSize: 12.5, color: C.ink3, lineHeight: 1.6, margin: '4px 0 0', fontStyle: 'italic' }}>
                      Enter start amount, target, and expected CAGR. The calculator returns the number of years needed.
                    </p>
                  </>}
                </div>

                {/* Result panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {result ? (
                    <>
                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>
                          {mode === 'cagr' ? 'CAGR' : mode === 'fv' ? 'Future Value' : 'Time Needed'}
                        </span>
                        <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                          aria-live="polite" aria-label={`Result: ${mode === 'cagr' ? result.cagr.toFixed(2) + '% CAGR' : mode === 'fv' ? fmtIN(result.fv) : result.years.toFixed(1) + ' years'}`}>
                          {mode === 'cagr'  && `${result.cagr.toFixed(2)}%`}
                          {mode === 'fv'    && fmtIN(result.fv)}
                          {mode === 'years' && `${result.years.toFixed(1)} Yrs`}
                        </span>
                      </div>

                      {[
                        { label: 'Initial investment',   value: fmtC(result.principal) },
                        { label: mode === 'years' ? 'Target value' : 'Final value', value: fmtC(result.fv) },
                        { label: 'Total gain',           value: fmtC(Math.abs(result.gain)) },
                        { label: 'Absolute return',      value: `${result.absoluteReturn.toFixed(1)}%` },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                        </div>
                      ))}

                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                        <DonutChart principal={result.principal} gains={result.gain} principalPct={prinPct} />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                          <span style={{ fontSize: 12, color: C.ink2 }}>Principal {prinPct}%</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                          <span style={{ fontSize: 12, color: C.ink2 }}>Returns {returnsPct}%</span>
                        </div>
                      </div>

                      <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 11.5, color: C.ink3 }}>Principal {prinPct}%</span>
                          <span style={{ fontSize: 11.5, color: C.ink3 }}>Returns {returnsPct}%</span>
                        </div>
                        <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`Principal is ${prinPct}% of final value`}>
                          <div style={{ height: '100%', width: `${prinPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
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
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Year-by-Year Growth Table</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>Compounding breakdown</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {Math.ceil(result.years)} yr · {result.cagr.toFixed(2)}% CAGR
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
                              {['Year', 'Portfolio Value', 'Total Gain', 'Return %'].map(h => (
                                <th key={h} style={{ padding: '10px 20px', textAlign: 'left', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }} scope="col">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {growthRows.map((row, i) => (
                              <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ padding: '11px 20px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                                <td style={{ padding: '11px 20px', color: C.ink2 }}>{fmtIN(row.value)}</td>
                                <td style={{ padding: '11px 20px', color: '#1f7a58', fontWeight: 600 }}>{fmtIN(Math.abs(row.gain))}</td>
                                <td style={{ padding: '11px 20px', color: '#1f7a58', fontWeight: 600 }}>{row.pct.toFixed(1)}%</td>
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

              {/* AEO: definition block targets Google's definition featured snippet */}
              <div style={sec}>
                <h2 style={h2} id="what-is-cagr">What Is CAGR?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    CAGR (Compound Annual Growth Rate) is the annualised rate at which an investment grew from its starting value to its ending value, assuming profits were reinvested each year. It is expressed as a percentage per annum.
                  </p>
                </div>
                <p style={p}>
                  Year-by-year performance swings sharply. A fund might return 32% in one year and lose 18% the next. CAGR converts that entire journey into one annual rate so you can compare investments on the same footing.
                </p>
                <p style={p}>
                  Under{' '}
                  <a href="https://www.amfiindia.com" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    AMFI
                  </a>{' '}
                  guidelines issued by{' '}
                  <a href="https://www.sebi.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    SEBI
                  </a>
                  , all mutual fund performance data for periods exceeding one year must be reported as CAGR. When a fund fact sheet says its 5-year return is 16.4%, that number is CAGR. It is the standard unit of measurement for comparing any investment that runs longer than twelve months.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="cagr-formula">CAGR Formula: How to Calculate Compound Annual Growth Rate</h2>
                <p style={p}>The formula has three inputs and one output:</p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 15, fontWeight: 700, color: C.dark }}>
                    CAGR = (Final Value / Initial Value) ^ (1 / n) minus 1
                  </code>
                </div>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}` }}>
                    <thead><tr><th style={{ ...thS, width: 110 }} scope="col">Variable</th><th style={thS} scope="col">Meaning</th></tr></thead>
                    <tbody>
                      {[
                        ['Final Value (FV)', 'The ending value of the investment'],
                        ['Initial Value (PV)', 'The starting amount originally invested'],
                        ['n', 'The number of years held'],
                        ['CAGR', 'Result is a decimal. Multiply by 100 for the percentage.'],
                      ].map(([v, m]) => (
                        <tr key={v}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{v}</td><td style={tdR}>{m}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  <strong>Worked example:</strong> Rs 1 lakh grows to Rs 2.5 lakh over 7 years.
                  CAGR = (2,50,000 / 1,00,000)^(1/7) minus 1 = 13.99% per annum.
                  Each individual year would have looked different, but 13.99% is the equivalent steady rate that produced the same final result.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="cagr-excel">CAGR Formula in Excel: Three Methods</h2>
                <p style={p}>
                  Assume <code style={mono}>A2</code> holds the initial value, <code style={mono}>B2</code> holds the final value, and <code style={mono}>C2</code> holds the number of years.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}` }}>
                    <thead><tr><th style={thS} scope="col">Method</th><th style={thS} scope="col">Formula</th><th style={thS} scope="col">Notes</th></tr></thead>
                    <tbody>
                      {[
                        ['Direct formula', '=((B2/A2)^(1/C2))-1', 'Works in all Excel versions. Format as %.'],
                        ['POWER function', '=POWER(B2/A2,1/C2)-1', 'Equivalent, more readable.'],
                        ['RRI function', '=RRI(C2,A2,B2)', 'Simplest. Excel 2013 and later only.'],
                      ].map(([m, f, n]) => (
                        <tr key={m as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink, whiteSpace: 'nowrap' }}>{m}</td>
                          <td style={tdR}><code style={mono}>{f}</code></td>
                          <td style={tdL}>{n}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The <code style={mono}>RRI</code> function is the easiest. Type <code style={mono}>=RRI(5,A2,B2)</code> for a 5-year CAGR, format the cell as a percentage, and you are done. Most finance professionals who calculate CAGR frequently in Excel use the RRI function.
                </p>
                <p style={p}>
                  <strong>5-year CAGR in Excel:</strong> <code style={mono}>=((B2/A2)^(1/5))-1</code><br />
                  <strong>10-year CAGR in Excel:</strong> <code style={mono}>=((B2/A2)^(1/10))-1</code>
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="reverse-cagr">Reverse CAGR Calculator: Finding Duration and Target Value</h2>
                <p style={p}>
                  The standard CAGR formula finds the growth rate when you know the start and end values. A reverse CAGR calculator works the other way. Given a starting amount, a target, and an assumed annual growth rate, it tells you how many years are needed.
                </p>
                <p style={p}>
                  The <strong>Reverse CAGR</strong> tab handles this. The formula it uses: n = log(Final Value / Initial Value) divided by log(1 + CAGR). Most long-term investors use this to answer questions like "at 12% CAGR, how long before my portfolio of Rs 20 lakh reaches Rs 1 crore?" The answer is 17.1 years.
                </p>
                <p style={{ ...p, margin: '0 0 12px' }}>
                  <strong>Rule of 72:</strong> Divide 72 by the CAGR percentage to get a rough estimate of how many years it takes to double your money. At 12%, that is 6 years. At 8%, it is 9 years. The exact figures are in the table below.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 0 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}` }}>
                    <thead><tr><th style={thS} scope="col">CAGR</th><th style={thS} scope="col">Rule of 72 estimate</th><th style={thS} scope="col">Exact years to double</th></tr></thead>
                    <tbody>
                      {[
                        ['6%', '12 years', '11.9 years'],
                        ['8%', '9 years', '9.0 years'],
                        ['10%', '7.2 years', '7.3 years'],
                        ['12%', '6 years', '6.1 years'],
                        ['15%', '4.8 years', '5.0 years'],
                        ['20%', '3.6 years', '3.8 years'],
                      ].map(([c, r, e]) => (
                        <tr key={c as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{c}</td>
                          <td style={tdR}>{r}</td>
                          <td style={{ ...tdR, color: '#1f7a58', fontWeight: 700 }}>{e}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="monthly-cagr">Monthly CAGR Formula and Calculation</h2>
                <p style={p}>
                  Monthly CAGR is the equivalent monthly growth rate for a given annual CAGR. You need it when working with monthly return data or comparing investments that report returns on a monthly basis.
                </p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark }}>
                    Monthly CAGR = (1 + Annual CAGR) ^ (1 / 12) minus 1
                  </code>
                </div>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}` }}>
                    <thead><tr><th style={thS} scope="col">Annual CAGR</th><th style={thS} scope="col">Monthly CAGR</th><th style={thS} scope="col">Typical use</th></tr></thead>
                    <tbody>
                      {[
                        ['6%', '0.487%', 'PPF, conservative debt'],
                        ['8%', '0.643%', 'EPF, hybrid funds'],
                        ['10%', '0.797%', 'Large-cap equity planning'],
                        ['12%', '0.949%', 'Standard equity assumption'],
                        ['15%', '1.171%', 'Flexicap, diversified equity'],
                        ['20%', '1.531%', 'Midcap, smallcap (historical)'],
                      ].map(([a, m, u]) => (
                        <tr key={a as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td>
                          <td style={{ ...tdR, color: '#1f7a58', fontWeight: 700 }}>{m}</td>
                          <td style={tdL}>{u}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  To calculate monthly CAGR from raw monthly data: <code style={mono}>(Final Value / Initial Value)^(1 / total months) minus 1</code>. To annualise a monthly CAGR back: <code style={mono}>(1 + monthly rate)^12 minus 1</code>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="lumpsum-cagr">Lumpsum CAGR Calculator: What It Measures</h2>
                <p style={p}>
                  This is a lumpsum CAGR calculator. It measures the annualised return on a single, one-time investment. Put money in once, leave it untouched, check the value later. The CAGR tells you how fast it grew each year, on average.
                </p>
                <p style={p}>
                  SIP returns cannot use CAGR. Each monthly SIP instalment is invested at a different NAV on a different date, so the holding period differs for every unit purchased. The correct measure for SIP portfolios is XIRR, which accounts for the exact timing of every cash flow. The return shown on your broker app for a SIP portfolio is always XIRR.
                </p>
                <PromoBar href="/calculators/xirr-calculator" name="XIRR Calculator" blurb="Find the annualised return on a SIP or any portfolio with multiple cash flows at different dates." />
              </div>

              <div style={sec}>
                <h2 style={h2} id="cagr-vs-absolute-return">CAGR vs Absolute Return: What Is the Difference?</h2>
                <p style={p}>
                  Absolute return measures the total gain with no reference to time. If Rs 1 lakh became Rs 2 lakh, the absolute return is 100%, whether that took 2 years or 20. CAGR adjusts for how long the investment ran and converts the gain into an annual rate, making it possible to compare investments held for different durations.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}` }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>Same absolute return, very different CAGR depending on duration</caption>
                    <thead><tr><th style={thS} scope="col">Scenario: Rs 1 lakh to Rs 2 lakh</th><th style={thS} scope="col">Absolute Return</th><th style={thS} scope="col">CAGR per year</th></tr></thead>
                    <tbody>
                      {[
                        ['In 2 years', '100%', '41.4%'],
                        ['In 5 years', '100%', '14.87%'],
                        ['In 7 years', '100%', '10.41%'],
                        ['In 10 years', '100%', '7.18%'],
                      ].map(([s, a, c]) => (
                        <tr key={s as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={tdL}>{s}</td>
                          <td style={tdR}>{a}</td>
                          <td style={{ ...tdR, color: '#1f7a58', fontWeight: 700 }}>{c}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  This is why comparing funds using absolute return is misleading. Two funds both showing 60% absolute returns look equal, but if one achieved it in 3 years (CAGR: 17.2%) and the other took 7 years (CAGR: 7.0%), they are entirely different propositions.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="good-cagr-india">What Is a Good CAGR for Indian Investments?</h2>
                {/* GEO: specific data with implicit source context */}
                <p style={p}>
                  The answer depends on the asset class and time horizon. Based on historical data from NSE India and AMFI fund fact sheets, these are the typical CAGR ranges for common Indian financial instruments over a 10-year holding period.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}` }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>10-year historical CAGR benchmarks for India (approximate)</caption>
                    <thead><tr><th style={thS} scope="col">Asset / Benchmark</th><th style={thS} scope="col">10-Year CAGR (approx)</th><th style={thS} scope="col">Risk level</th></tr></thead>
                    <tbody>
                      {[
                        ['Bank savings account', '3.5 to 4%', 'None'],
                        ['Fixed deposit (major banks)', '6 to 7.5%', 'Very low'],
                        ['Public Provident Fund (PPF)', '7.1%', 'None (government-backed)'],
                        ['EPF (EPFO)', '8.25%', 'None (government-backed)'],
                        ['Debt mutual funds', '6 to 8%', 'Low'],
                        ['Nifty 50 Index Fund', '11 to 13%', 'Moderate'],
                        ['Large-cap equity mutual funds', '11 to 14%', 'Moderate to high'],
                        ['Flexicap and multicap funds', '13 to 17%', 'High'],
                        ['Midcap and smallcap funds', '15 to 22%', 'Very high'],
                      ].map(([asset, cagr, risk]) => (
                        <tr key={asset as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={tdL}>{asset}</td>
                          <td style={{ ...tdR, fontWeight: 600 }}>{cagr}</td>
                          <td style={tdL}>{risk}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  For long-term financial planning, 10 to 12% is the commonly used equity CAGR assumption in India. Midcap and smallcap funds have historically produced higher numbers, but the volatility is substantial. The Nifty 50 has delivered roughly 11.9% CAGR over the past 10 years on a price return basis. Past CAGR does not guarantee future performance.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="cagr-mutual-funds">CAGR for Mutual Funds in India</h2>
                <p style={p}>
                  SEBI, through its circular on performance disclosure, mandates that all mutual fund schemes report returns as CAGR for periods of one year and above. This covers all categories: equity, debt, hybrid, and solution-oriented funds. AMFI publishes these figures monthly on amfiindia.com. The trailing return figures on Groww, Zerodha Coin, and Kuvera all pull from this AMFI data.
                </p>
                <h3 style={h3}>Trailing returns vs rolling returns</h3>
                <p style={p}>
                  Trailing CAGR measures from a fixed historical date to today. The number you see on a fact sheet right now is the 1-year, 3-year, 5-year, and 10-year trailing CAGR as of the current month. The problem is that it is sensitive to where the start date falls in a market cycle. A fund whose 5-year window starts at a market trough will show inflated trailing returns. Rolling returns average the CAGR across every possible 5-year window within a longer period. A fund with strong rolling returns is a consistently performing fund, not one that got lucky with the measurement date.
                </p>
                <h3 style={h3}>How to use this calculator for mutual funds</h3>
                <p style={{ ...p, margin: 0 }}>
                  Enter your initial NAV or investment amount as the starting value. Enter the current NAV or portfolio value as the final value. Enter the years since you first invested. To compare two funds, run the calculation for each and compare the resulting CAGR percentages directly.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="cagr-stocks">CAGR Calculator for Stocks</h2>
                <p style={p}>
                  Enter the price at which you bought the stock as the initial value, the current price as the final value, and the number of years you have held it. The result is the stock&apos;s annualised price CAGR.
                </p>
                <p style={p}>
                  <strong>Example:</strong> You bought Infosys shares at Rs 800 in 2019. The price today is Rs 1,640. Holding period: 6 years. CAGR = (1,640 / 800)^(1/6) minus 1 = 12.75% per annum.
                </p>
                <p style={p}>
                  This is price return only. It does not include dividends. For total return, add all dividends received during the holding period to the current price before entering it as the final value.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  If you bought shares across multiple purchase dates at different prices, CAGR will be inaccurate. Use the <Link href="/calculators/xirr-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>XIRR Calculator</Link> instead.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="sip-cagr">SIP Returns and CAGR: Which to Use?</h2>
                <p style={p}>
                  A SIP sends a fixed amount into a fund every month. Each monthly purchase happens at a different NAV on a different date, so the holding period for each unit is different. CAGR was designed for a single investment with one entry and one exit. It cannot handle this.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  XIRR does the job correctly. It finds the discount rate that makes the present value of all your investments equal to the current portfolio value, accounting for exact investment dates. When you see a &quot;12% return&quot; on your SIP portfolio in Zerodha or Groww, that is XIRR, not CAGR. A fund&apos;s fact sheet showing &quot;12% CAGR over 5 years&quot; refers to a lumpsum investment made exactly 5 years ago. Your actual SIP return will differ. Use our <Link href="/calculators/xirr-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>XIRR Calculator</Link> to find it.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="cagr-vs-xirr">CAGR vs XIRR vs IRR</h2>
                <h3 style={h3}>CAGR</h3>
                <p style={p}>Single lumpsum investment. One entry date, one exit date, no cash flows in between. This is the right tool for evaluating the performance of a single investment made at a single point in time.</p>
                <h3 style={h3}>XIRR</h3>
                <p style={p}>Multiple cash flows at irregular dates: monthly SIP instalments, partial withdrawals, dividend reinvestments. XIRR is the extended version of IRR that handles uneven gaps between transactions. It is the only correct way to measure a SIP portfolio&apos;s return.</p>
                <h3 style={h3}>IRR</h3>
                <p style={{ ...p, margin: 0 }}>Used in corporate finance for projects with regular periodic cash flows. For personal investing, CAGR and XIRR between them cover all common scenarios.</p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="cagr-limitations">Limitations of CAGR</h2>
                <div>
                  {[
                    ['Hides volatility', 'Two investments can have identical 10-year CAGRs but completely different year-by-year experiences. One may have dropped 40% in year 3 while the other moved steadily upward. CAGR shows neither the pain nor the smoothness of the journey.'],
                    ['Cannot handle cash flows', 'Any additional investment or withdrawal during the holding period makes CAGR invalid. Use XIRR for those situations.'],
                    ['Sensitive to dates', 'Measuring from a market low produces a much higher CAGR than measuring from a market peak. The same fund can show wildly different trailing CAGRs depending on which month you check.'],
                    ['Ignores risk', 'A 15% CAGR from a volatile smallcap fund and a 15% CAGR from a stable large-cap fund look identical as numbers. The actual risk undertaken is not captured.'],
                  ].map(([title, text], i) => (
                    <div key={i} style={{ ...bul, marginBottom: 14, gap: 0, flexDirection: 'column' as const }}>
                      <strong style={{ fontSize: 15, color: C.ink, marginBottom: 4 }}>{title}</strong>
                      <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This CAGR Calculator</h2>
                <p style={p}>There are three modes. Select the tab that matches what you need to find:</p>

                {/* AEO: visible numbered steps match the HowTo schema */}
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>CAGR %:</strong> enter the initial investment, the final or current value, and the number of years. The calculator returns the compound annual growth rate.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Future Value:</strong> enter the initial investment, an assumed CAGR, and the number of years. The calculator projects the value your investment would reach.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Reverse CAGR:</strong> enter the starting amount, the target value you want to reach, and an assumed CAGR. The calculator returns the number of years needed.
                  </li>
                </ol>
                <p style={{ ...p, margin: 0 }}>
                  Click any input value to type a precise number. Use the year preset buttons (1Y, 3Y, 5Y, 10Y, 15Y, 20Y, 30Y) to switch duration quickly. The currency selector converts all displayed amounts to USD, EUR, GBP, or other currencies. Useful for NRI investors who want to see Indian portfolio values in their resident country&apos;s currency. Expand the year-by-year table to see how compounding builds value at each milestone.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="why-this-calculator">Why Use This CAGR Calculator</h2>
                <p style={p}>
                  This tool runs three calculations in one place: CAGR from start and end values, future value at an assumed CAGR, and reverse CAGR to find how many years a target will take. Most calculators online only do the first.
                </p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Free, no sign-up needed to calculate:</strong> results appear instantly as you move a slider. An account is optional and only needed to save past calculations for later.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Multi-currency for NRI investors:</strong> switch the currency selector to see Indian investment values in USD, EUR, GBP, and other currencies without recalculating.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Year-by-year growth table:</strong> see exactly how compounding builds the final value at every milestone year, not just the final number.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Your last calculation is saved automatically:</strong> the calculator remembers your inputs in the browser, so returning users see their previous scenario instead of starting over.
                  </li>
                </ol>
                <p style={{ ...p, margin: 0 }}>
                  A CAGR percentage on its own does not tell you whether an investment was a good decision. Compare the result against the benchmarks in the table above, and run the numbers through a{' '}
                  <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>tax calculator</Link>{' '}
                  to see what the gain looks like after LTCG tax.
                </p>
              </div>


              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only. CAGR is a mathematical measure of historical growth and does not predict future returns. Past performance of any investment does not guarantee future results. This calculator is for educational and planning purposes and does not constitute financial advice. Consult a SEBI-registered investment adviser before making investment decisions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.cagr-sidebar::-webkit-scrollbar{width:5px}.cagr-sidebar::-webkit-scrollbar-track{background:transparent}.cagr-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.cagr-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="cagr-sidebar" aria-label="Related calculators" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <SidebarList title="Popular Calculators" items={POPULAR} />
              <SidebarList title="More Calculators" items={MORE} />
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

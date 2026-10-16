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

type Mode = 'lumpsum' | 'sip';

/* ─── Math ──────────────────────────────────────────────────────── */
function calcLumpsum(principal: number, rate: number, years: number) {
  if (rate === 0) return principal;
  return principal * Math.pow(1 + rate / 100, years);
}

function calcSIP(monthly: number, rate: number, months: number) {
  if (months === 0) return 0;
  if (rate === 0) return monthly * months;
  const i = Math.pow(1 + rate / 100, 1 / 12) - 1;
  return monthly * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
}

interface GrowthRow { year: number; invested: number; value: number; gain: number; }

function buildLumpsumGrowth(principal: number, rate: number, years: number): GrowthRow[] {
  const startYear = new Date().getFullYear();
  return Array.from({ length: years }, (_, i) => {
    const y = i + 1;
    const val = rate === 0 ? principal : principal * Math.pow(1 + rate / 100, y);
    return { year: startYear + i, invested: principal, value: val, gain: val - principal };
  });
}

function buildSIPGrowth(monthly: number, rate: number, totalMonths: number): GrowthRow[] {
  const startYear = new Date().getFullYear();
  const i = rate === 0 ? 0 : Math.pow(1 + rate / 100, 1 / 12) - 1;
  let corpus = 0, cumInvested = 0;
  const totalYears = Math.ceil(totalMonths / 12);
  return Array.from({ length: totalYears }, (_, idx) => {
    const monthsThisYear = Math.min(12, totalMonths - idx * 12);
    for (let m = 0; m < monthsThisYear; m++) {
      corpus = i === 0 ? corpus + monthly : (corpus + monthly) * (1 + i);
      cumInvested += monthly;
    }
    return { year: startYear + idx, invested: cumInvested, value: corpus, gain: corpus - cumInvested };
  });
}

/* ─── Donut ─────────────────────────────────────────────────────── */
function DonutChart({ invested, returns: ret, pct }: { invested: number; returns: number; pct: number }) {
  const total = invested + Math.max(0, ret);
  if (total === 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const pArc = (invested / total) * circ;
  return (
    <svg width="216" height="216" viewBox="0 0 216 216" role="img"
      aria-label={`Invested amount ${pct}% of total value, estimated returns ${100 - pct}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Invested</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pct}%</text>
    </svg>
  );
}

/* ─── Slider (colorless input panel) ───────────────────────────── */
function Slider({ label, id, value, min, max, step, fmt, onChange, compact }: {
  label: string; id?: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void; compact?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const inputId = id || label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const rangeId = `${inputId}-range`;
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 36 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 14 }}>
        <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 13.5 : 14, color: C.ink2, fontWeight: 400 }}>{label}</label>
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
        <input id={rangeId} type="range" min={min} max={max} step={step} value={value}
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

/* ─── Duration presets (colorless) ───────────────────────────────── */
function YearPresets({ current, onChange }: { current: number; onChange: (v: number) => void }) {
  const presets = [1, 3, 5, 10, 15, 20, 30];
  return (
    <div role="group" aria-label="Duration presets" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: -20, marginBottom: 20 }}>
      {presets.map(y => {
        const active = current === y;
        return (
          <button key={y} onClick={() => onChange(y)} aria-pressed={active} aria-label={`Set duration to ${y} year${y > 1 ? 's' : ''}`}
            style={{
              fontSize: 11.5, padding: '4px 10px', borderRadius: 6, cursor: 'pointer', fontFamily: INTER, transition: 'all 0.12s',
              background: C.white,
              color: active ? C.ink : C.ink3,
              border: `${active ? 1.5 : 1}px solid ${active ? C.ink : C.border}`,
              fontWeight: active ? 700 : 500,
            }}>
            {y}Y
          </button>
        );
      })}
    </div>
  );
}

/* ─── CA CTA (exact standard component) ───────────────────────────── */

/* ─── In-content promo bar ─────────────────────────────────────────── */
function PromoBar({ name, blurb, href }: { name: string; blurb: string; href: string }) {
  return (
    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>{name}</p>
        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>{blurb}</p>
      </div>
      <Link className="fx-btn" href={href} target="_blank" rel="noopener noreferrer"
        style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
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
  { href: '/calculators/sip-calculator',            label: 'SIP Calculator' },
  { href: '/calculators/lumpsum-calculator',        label: 'Lumpsum Calculator' },
  { href: '/calculators/xirr-calculator',           label: 'XIRR Calculator' },
  { href: '/calculators/cagr-calculator',           label: 'CAGR Calculator' },
  { href: '/calculators/swp-calculator',            label: 'SWP Calculator' },
];
const MORE = [
  { href: '/calculators/step-up-sip-calculator',    label: 'Step-Up SIP Calculator' },
  { href: '/calculators/ppf-calculator',            label: 'PPF Calculator' },
  { href: '/calculators/fd-calculator',             label: 'FD Calculator' },
  { href: '/calculators/emi-calculator',            label: 'EMI Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────────── */
function FAQ() {
  return <FAQBox items={faqItems} />;
}

/* ─── Main component ─────────────────────────────────────────────── */

export default function MutualFundCalculatorClient() {
  const defaultSettings = { mode: 'lumpsum', principal: 100000, sipAmount: 10000, rate: 12, years: 10, showTable: false };
  const { settings, updateSettings } = useCalculatorSettings('mutual-fund-calculator', defaultSettings);
  const { mode, principal, sipAmount, rate, years, showTable } = settings;
  const setMode = (v: any) => updateSettings({ mode: typeof v === 'function' ? v(settings.mode) : v });
  const setPrincipal = (v: any) => updateSettings({ principal: typeof v === 'function' ? v(settings.principal) : v });
  const setSipAmount = (v: any) => updateSettings({ sipAmount: typeof v === 'function' ? v(settings.sipAmount) : v });
  const setRate = (v: any) => updateSettings({ rate: typeof v === 'function' ? v(settings.rate) : v });
  const setYears = (v: any) => updateSettings({ years: typeof v === 'function' ? v(settings.years) : v });
  const setShowTable = (v: any) => updateSettings({ showTable: typeof v === 'function' ? v(settings.showTable) : v });
  const [mobile, setMobile] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const months = years * 12;

  const { maturity, invested, gain } = useMemo(() => {
    if (mode === 'lumpsum') {
      const m = calcLumpsum(principal, rate, years);
      return { maturity: m, invested: principal, gain: m - principal };
    } else {
      const m = calcSIP(sipAmount, rate, months);
      const inv = sipAmount * months;
      return { maturity: m, invested: inv, gain: m - inv };
    }
  }, [mode, principal, sipAmount, rate, years, months]);

  const prinPct    = maturity > 0 ? Math.round((invested / maturity) * 100) : 50;
  const returnsPct = 100 - prinPct;

  const growthRows = useMemo(() => {
    if (mode === 'lumpsum') return buildLumpsumGrowth(principal, rate, years);
    return buildSIPGrowth(sipAmount, rate, months);
  }, [mode, principal, sipAmount, rate, years, months]);

  // Reverse calculation: amount required today / per month to reach a Rs 1 crore target
  const targetCorpus = 10000000;
  const reverseLumpsum = rate > 0 ? targetCorpus / Math.pow(1 + rate / 100, years) : targetCorpus;
  const reverseSIP = useMemo(() => {
    const n = years * 12;
    const i = rate === 0 ? 0 : Math.pow(1 + rate / 100, 1 / 12) - 1;
    if (i === 0) return targetCorpus / n;
    return targetCorpus / (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
  }, [rate, years]);

  const h2    = { fontSize: mobile ? 18 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const h3    = { fontSize: 16, fontWeight: 600, color: C.ink, margin: '20px 0 8px' } as React.CSSProperties;
  const p     = { fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 12px' } as React.CSSProperties;
  const sec   = { margin: '0 0 40px' } as React.CSSProperties;
  const thS   = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const, verticalAlign: 'middle' as const };
  const tdL   = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'middle' as const, textAlign: 'left' as const };
  const tdR   = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'middle' as const, textAlign: 'left' as const } as React.CSSProperties;
  const bullet = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Mutual Fund Returns Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Project SIP or lumpsum mutual fund growth in India at any return rate and duration, with a year-by-year corpus breakdown.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          {/* LEFT */}
          <div style={{ minWidth: 0 }}>

            {/* CALCULATOR CARD */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel, colorless */}
                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile ? (
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Investment Details</p>
                    ) : <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  {/* Mode toggle, colorless per input panel rules */}
                  <div style={{ marginBottom: mobile ? 18 : 32 }}>
                    <label id="investment-type-label" style={{ fontSize: mobile ? 13.5 : 14, color: C.ink2, fontWeight: 400, display: 'block', marginBottom: mobile ? 10 : 14 }}>Investment Type</label>
                    <div role="group" aria-labelledby="investment-type-label" style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                      {([['lumpsum', 'Lumpsum'], ['sip', 'Monthly SIP']] as [Mode, string][]).map(([m, label]) => (
                        <button key={m} onClick={() => setMode(m)} aria-pressed={mode === m}
                          style={{
                            flex: 1, padding: mobile ? '8px 4px' : '9px 16px', border: 'none',
                            background: mode === m ? C.white : 'transparent',
                            color: mode === m ? C.ink : C.ink3,
                            fontFamily: INTER, fontSize: mobile ? 12 : 13.5, fontWeight: mode === m ? 600 : 400,
                            cursor: 'pointer', transition: 'all 0.15s',
                          }}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {mode === 'lumpsum' ? (
                    <Slider label="Investment Amount" value={principal} min={1000} max={10000000} step={1000}
                      fmt={v => fmtC(v)} onChange={setPrincipal} compact={mobile} />
                  ) : (
                    <Slider label="Monthly SIP Amount" value={sipAmount} min={500} max={500000} step={500}
                      fmt={v => fmtC(v)} onChange={setSipAmount} compact={mobile} />
                  )}

                  <Slider label="Expected Return Rate (p.a.)" value={rate} min={1} max={30} step={0.5}
                    fmt={v => `${v.toFixed(1)}%`} onChange={setRate} compact={mobile} />

                  <Slider label="Investment Duration" value={years} min={1} max={40} step={1}
                    fmt={v => `${v} Yr`} onChange={setYears} compact={mobile} />
                  <YearPresets current={years} onChange={setYears} />
                </div>

                {/* Results panel */}
                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: mobile ? '14px 18px' : '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: '#50565C' }}>Total Value</span>
                    <span aria-live="polite" aria-label={`Total value: ${fmtIN(maturity)}`}
                      style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>{fmtIN(maturity)}</span>
                  </div>

                  {[
                    { label: mode === 'lumpsum' ? 'Invested amount' : 'Total invested', value: fmtC(invested) },
                    { label: 'Est. returns',   value: fmtC(gain) },
                    { label: 'Total value',    value: fmtC(maturity) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '15px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 24, order: mobile ? 1 : -1 }}>
                    <DonutChart invested={invested} returns={gain} pct={prinPct} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 22, marginBottom: mobile ? 8 : 28, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Invested amount</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Est. returns</span>
                    </div>
                  </div>

                  <div style={{ width: '100%', marginTop: mobile ? 8 : 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Invested {prinPct}%</span>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Returns {returnsPct}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${prinPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Year-by-year growth table */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowTable((v: boolean) => !v)} aria-expanded={showTable} aria-controls="growth-table-panel"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '20px 48px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.ink }}>Year-by-Year Growth</span>
                    {!mobile && <span style={{ fontSize: 13, color: C.ink3, marginLeft: 10 }}>(Compounding breakdown)</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 8 : 12, flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.dark, background: C.paleLime, border: `1px solid ${C.lime2}`, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {years} Yr &middot; {rate}% p.a.
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                      style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {showTable && (
                  <div id="growth-table-panel" style={{ borderTop: `1px solid ${C.border}`, overflowX: 'auto', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
                    <table style={{ minWidth: 440, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <caption style={{ captionSide: 'bottom', textAlign: 'left', padding: '10px 24px', fontSize: 12, color: C.ink3 }}>
                        Year-by-year projected value of a {mode === 'lumpsum' ? 'lumpsum' : 'monthly SIP'} investment at {rate}% p.a. over {years} years.
                      </caption>
                      <thead>
                        <tr style={{ background: '#f4f5f6' }}>
                          {['Year', 'Amount Invested', 'Est. Returns', 'Total Value'].map(h => (
                            <th key={h} scope="col" style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {growthRows.map((row, i) => (
                          <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={{ padding: '13px 24px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                            <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.invested)}</td>
                            <td style={{ padding: '13px 24px', color: '#166534', fontWeight: 600 }}>{fmtIN(row.gain)}</td>
                            <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.value)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            <SaveResultsCard mobile={mobile} />

            {/* ARTICLE */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 id="what-is-mutual-fund-calculator" style={h2}>What Is a Mutual Fund Returns Calculator?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    A mutual fund returns calculator projects how a lumpsum or SIP investment grows over time at an assumed annual return rate. It runs the same compounding math that fund houses use to illustrate potential outcomes.
                  </p>
                </div>
                <p style={p}>
                  Choose Lumpsum or Monthly SIP, enter the amount, expected return, and duration. The calculator returns your final corpus, the amount you invested, and the estimated gains.
                </p>
                <p style={p}>
                  This is a projection tool, not a prediction. Actual returns depend on which fund you pick, how equity and debt markets perform, and fund expenses over your holding period. Every mutual fund's actual performance data is published on <a href="https://www.amfiindia.com" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>amfiindia.com</a>.
                </p>
              </div>

              <div style={sec}>
                <h2 id="mutual-fund-return-formula" style={h2}>Mutual Fund Return Formula: Lumpsum and SIP</h2>
                <h3 style={h3}>Lumpsum formula</h3>
                <p style={p}>For a one-time investment, the formula is:</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, fontFamily: 'monospace', margin: '0 0 12px', padding: '10px 0' }}>
                  A = P &times; (1 + r)^t
                </p>
                <p style={p}>
                  A is the final value, P is the principal, r is the annual rate as a decimal, and t is years. At 12 percent over 10 years, Rs 1 lakh becomes approximately Rs 3.11 lakh.
                </p>
                <h3 style={h3}>SIP formula</h3>
                <p style={p}>For monthly investments, the formula is:</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, fontFamily: 'monospace', margin: '0 0 12px', padding: '10px 0' }}>
                  M = P &times; [((1 + i)^n &minus; 1) / i] &times; (1 + i)
                </p>
                <p style={p}>
                  M is the maturity amount, P is the monthly instalment, n is the total number of months, and i is the monthly rate derived as (1 + annual rate)^(1/12) &minus; 1.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  This calculator uses the exact compound conversion for i, not the common approximation of dividing the annual rate by 12, which understates a SIP's true compounding.
                </p>
              </div>

              <div style={sec}>
                <h2 id="mutual-fund-formula-excel" style={h2}>Mutual Fund Return Formula in Excel</h2>
                <p style={p}>
                  Excel has a built-in function for each mode. Both take the same inputs this calculator uses: rate, duration, and amount.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', padding: '8px 0', fontSize: 12, color: C.ink3 }}>Excel formulas for projecting mutual fund maturity value.</caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Mode</th>
                        <th scope="col" style={thS}>Excel Formula</th>
                        <th scope="col" style={thS}>Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Lumpsum', '=FV(rate,years,0,-principal)', '=FV(12%,10,0,-100000) → Rs 3,10,585'],
                        ['Monthly SIP', '=FV(rate/12,months,-monthly,0,1)', '=FV(12%/12,120,-10000,0,1) → Rs 23,23,391'],
                      ].map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{row[0]}</td>
                          <td style={{ ...tdL, fontFamily: 'monospace' }}>{row[1]}</td>
                          <td style={tdL}>{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  The final argument <code>1</code> in the SIP formula tells Excel each instalment is paid at the start of the period, which matches how SIP debits actually happen.
                </p>
              </div>

              <div style={sec}>
                <h2 id="sip-vs-lumpsum" style={h2}>SIP vs Lumpsum: Which Should You Choose?</h2>
                <p style={p}>
                  Neither mode is universally better. The right choice depends on whether you have a one-time amount or a recurring monthly surplus to invest.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', padding: '8px 0', fontSize: 12, color: C.ink3 }}>Comparison of lumpsum and monthly SIP investing in mutual funds.</caption>
                    <thead>
                      <tr>
                        <th scope="col" style={{ ...thS, width: '26%' }}></th>
                        <th scope="col" style={thS}>Lumpsum</th>
                        <th scope="col" style={thS}>Monthly SIP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Suited for',          'One-time large amount',                          'Monthly savings from salary'],
                        ['Entry price risk',    'Full amount exposed at one price',               'Averaged over many entry points'],
                        ['Best market timing',  'Strong returns if deployed at a market low',     'Removes the need to time the market'],
                        ['Compounding start',   'Entire principal compounds from day one',        'Each instalment compounds from its own date'],
                        ['Best suited for',     'Bonuses, inheritance, windfall amounts',         'Salaried professionals, regular savers'],
                      ].map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{row[0]}</td>
                          <td style={tdL}>{row[1]}</td>
                          <td style={tdL}>{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  Run the same amount through both modes on the calculator above. For a recurring monthly surplus, the <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SIP Calculator</Link> adds step-up and pause features built specifically for that use case.
                </p>
              </div>

              <div style={sec}>
                <h2 id="reverse-mutual-fund-calculator" style={h2}>Reverse Calculation: How Much to Invest for a Target Corpus</h2>
                <p style={p}>
                  Instead of asking what an amount grows into, you can work backward from a goal. At your current {rate}% assumed rate over {years} years, reaching a Rs 1 crore target needs either a lumpsum today or a monthly SIP.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', padding: '8px 0', fontSize: 12, color: C.ink3 }}>Investment required today to reach a Rs 1 crore corpus at your selected rate and duration.</caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Route</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Amount Required</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ background: C.white }}>
                        <td style={tdL}>One-time lumpsum today</td>
                        <td style={{ ...tdR, textAlign: 'right' as const }}>{fmtIN(reverseLumpsum)}</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>Monthly SIP</td>
                        <td style={{ ...tdR, textAlign: 'right' as const }}>{fmtIN(reverseSIP)} / month</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  The formula reverses algebraically: for lumpsum, P = Target / (1 + r)^t. For SIP, P = Target / [((1 + i)^n &minus; 1) / i &times; (1 + i)]. Change the rate or duration sliders above and this table recalculates.
                </p>
              </div>

              <div style={sec}>
                <h2 id="mutual-fund-returns-by-category" style={h2}>Expected Returns by Mutual Fund Category</h2>
                <p style={p}>
                  The return rate you enter is your own assumption. This table gives indicative ranges from long-term historical performance across Indian mutual fund categories.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', padding: '8px 0', fontSize: 12, color: C.ink3 }}>10-year historical return ranges by mutual fund category, per AMFI NAV data.</caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Fund Category</th>
                        <th scope="col" style={thS}>Risk Level</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>10-Year Return Range</th>
                        <th scope="col" style={thS}>Who It Suits</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Large-cap equity',      'Moderate-High', '11% to 14%', 'Long-term investors, moderate risk appetite'],
                        ['Mid-cap equity',        'High',          '14% to 18%', '7+ year horizon, higher risk tolerance'],
                        ['Small-cap equity',      'Very High',     '15% to 22%', 'Investors who can hold through sharp drawdowns'],
                        ['Flexi-cap / Multi-cap', 'Moderate-High', '12% to 16%', 'Diversified exposure across market caps'],
                        ['Hybrid equity-oriented','Moderate',      '9% to 13%',  'Equity returns with lower volatility'],
                        ['ELSS (tax-saving)',     'High',          '12% to 16%', '80C deduction plus equity returns'],
                        ['Debt: corporate bond',  'Low-Moderate',  '6% to 8%',   'Conservative investors, 3-year horizon'],
                        ['Liquid funds',          'Low',           '6% to 7%',   'Parking idle cash for up to 90 days'],
                      ].map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{row[0]}</td>
                          <td style={tdL}>{row[1]}</td>
                          <td style={{ ...tdL, fontWeight: 600, color: '#166534', textAlign: 'right' as const }}>{row[2]}</td>
                          <td style={tdL}>{row[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  Source: historical NAV data from <a href="https://www.amfiindia.com" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>AMFI India</a>. Past performance does not guarantee future returns.
                </p>
              </div>

              <PromoBar name="CAGR Calculator" blurb="Already know a fund's start and end value? Find its exact annualised growth rate." href="/calculators/cagr-calculator" />

              <div style={sec}>
                <h2 id="mutual-fund-tax" style={h2}>Tax on Mutual Fund Returns in India</h2>
                <p style={p}>
                  Mutual fund gains are taxed at redemption, not during the holding period. The rate depends on fund type and how long you held the units.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', padding: '8px 0', fontSize: 12, color: C.ink3 }}>Capital gains tax on mutual fund redemptions in India, post Budget 2024-25.</caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Fund Type</th>
                        <th scope="col" style={thS}>Holding Period</th>
                        <th scope="col" style={thS}>Tax Rate</th>
                        <th scope="col" style={thS}>Exemption</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Equity (≥65% in equity)',    'More than 12 months', '12.5% LTCG', 'First Rs 1.25 lakh per year tax-free'],
                        ['Equity (≥65% in equity)',    '12 months or fewer',  '20% STCG',   'No exemption'],
                        ['Debt funds (from Apr 2023)', 'Any period',          'Slab rate',  'No indexation, no LTCG benefit'],
                        ['Hybrid: equity-oriented',    'More than 12 months', '12.5% LTCG', 'First Rs 1.25 lakh per year tax-free'],
                        ['Hybrid: debt-oriented',       'Any period',          'Slab rate',  'No LTCG benefit since Apr 2023'],
                      ].map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{row[0]}</td>
                          <td style={tdL}>{row[1]}</td>
                          <td style={{ ...tdL, fontWeight: 600 }}>{row[2]}</td>
                          <td style={tdL}>{row[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  The Rs 1.25 lakh LTCG exemption applies per financial year across all your equity fund redemptions combined. Rules are set under the <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Act</a> and updated by each Union Budget.
                </p>
              </div>

              <div style={sec}>
                <h2 id="direct-vs-regular-plans" style={h2}>Direct vs Regular Mutual Fund Plans</h2>
                <p style={p}>
                  A regular plan is bought through a distributor who earns a commission, built into a slightly higher expense ratio. A direct plan is bought straight from the fund house or a SEBI-registered platform with no commission.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  The gap is typically 0.5 to 1 percent a year. On a Rs 10,000 monthly SIP over 20 years at 12 percent, switching from regular to direct can add several lakh rupees to the final corpus, purely from the lower fee compounding over time.
                </p>
              </div>

              <div style={sec}>
                <h2 id="nav-and-expense-ratio" style={h2}>NAV and Expense Ratio Explained</h2>
                <p style={p}>
                  NAV, or Net Asset Value, is a fund's per-unit price, published once a day by dividing total portfolio value by outstanding units. You buy and sell units at that day's NAV, and unlike a stock price, it does not move intraday.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  The expense ratio is the annual management fee, already deducted before NAV is published. Index funds typically charge 0.05 to 0.20 percent; actively managed equity funds charge up to 1.05 percent under SEBI's expense ratio caps.
                </p>
              </div>

              <div style={sec}>
                <h2 id="limitations" style={h2}>Limitations of This Calculator</h2>
                <p style={p}>
                  No calculator can predict what a mutual fund will actually return. Keep these four limitations in mind before treating any output as a plan.
                </p>
                {[
                  { t: 'It assumes a constant rate.', d: 'Real markets deliver a bumpy sequence of gains and losses, not a flat annual percentage. Two funds with the same average can arrive at very different actual corpuses.' },
                  { t: 'It ignores expense ratio and exit load.', d: 'Enter a net-of-fee return assumption if you want the result to reflect what actually reaches your account.' },
                  { t: 'It ignores tax on redemption.', d: 'The total value shown is pre-tax. Use the tax table above to estimate your actual take-home amount.' },
                  { t: 'Past category averages may not repeat.', d: 'A fund category that returned 15% over the last decade is not guaranteed to repeat that figure over the next one.' },
                ].map((it, i) => (
                  <p key={i} style={p}><strong style={{ color: C.ink }}>{it.t}</strong> {it.d}</p>
                ))}
                <p style={{ ...p, margin: 0 }}>
                  For evaluating your actual SIP portfolio using exact transaction dates, use the <Link href="/calculators/xirr-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>XIRR Calculator</Link>.
                </p>
              </div>

              <div style={sec}>
                <h2 id="how-to-use" style={h2}>How to Use This Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select investment type:</strong> choose Lumpsum for a one-time amount or Monthly SIP for a fixed monthly investment.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter the amount:</strong> the total for lumpsum, or the monthly instalment for SIP.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set the expected return rate:</strong> refer to the fund category table above for a realistic range, and use the lower end for a conservative plan.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set the duration:</strong> compounding accelerates meaningfully beyond 7 to 10 years.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Read the results:</strong> expand the year-by-year table to see how the corpus builds at each annual milestone.
                  </li>
                </ol>
              </div>


              <div style={sec}>
                <h2 id="faq" style={h2}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All calculations on this page are indicative only and do not predict actual mutual fund performance. Past performance of any fund or category does not guarantee future results. This calculator is for educational and planning purposes only and does not constitute financial advice. Consult a SEBI-registered investment adviser before making investment decisions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.mutual-fund-sidebar::-webkit-scrollbar{width:5px}.mutual-fund-sidebar::-webkit-scrollbar-track{background:transparent}.mutual-fund-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.mutual-fund-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="mutual-fund-sidebar" aria-label="Related calculators" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <SidebarList title="Popular Calculators" items={POPULAR} />
              <SidebarList title="More Calculators" items={MORE} />
            </div>
          </aside>

        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/sip-calculator|SIP', '/calculators/mutual-fund-calculator|Mutual Fund', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/cagr-calculator|CAGR', '/calculators/xirr-calculator|XIRR', '/calculators/swp-calculator|SWP', '/calculators/emi-calculator|EMI', '/calculators/fd-calculator|FD', '/calculators/ppf-calculator|PPF'] },
        { hd: 'Topics', links: ['/#|Mutual Funds', '/#|Home Loans', '/#|Fixed Deposits', '/#|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

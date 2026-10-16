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

type YearRow = {
  year: number;
  monthlySip: number;
  annualContribution: number;
  cumulativeInvested: number;
  interest: number;
  corpus: number;
};

function SIPSnapshot() {
  const rows = [
    { label: 'Default Step-Up Rate', value: '10% / Year' },
    { label: 'Long-term Equity CAGR', value: '12.0% - 14.0%' },
    { label: '10-Yr Corpus vs Normal SIP', value: '1.5x' },
    { label: 'Tax on LTCG (>Rs 1.25L)', value: '12.5% Flat' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>
          Step-Up Benchmarks
        </span>
      </div>
      {rows.map((r, i) => (
        <div
          key={r.label}
          style={{
            padding: '11px 16px',
            borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none',
            background: C.white,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 12.5, color: C.ink2 }}>{r.label}</span>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: C.ink }}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

function RelatedReads() {
  const links = [
    { href: '/calculators/sip-calculator', label: 'SIP Calculator' },
    { href: '/calculators/cagr-calculator', label: 'CAGR Calculator' },
    { href: '/calculators/down-payment-planner-calculator', label: 'Down Payment Planner Calculator' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>
          Related Reads
        </span>
      </div>
      {links.map((l, i) => (
        <Link
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            padding: '13px 16px',
            borderBottom: i < links.length - 1 ? `1px solid ${C.border}` : 'none',
            textDecoration: 'none',
            background: C.white,
          }}
        >
          <span style={{ fontSize: 13, color: C.dark, fontWeight: 500, lineHeight: 1.5, display: 'block' }}>{l.label}</span>
        </Link>
      ))}
    </div>
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
            style={{ fontSize: 11.5, fontWeight: active ? 700 : 500, color: active ? C.ink : C.ink3, background: active ? C.white : 'transparent', border: active ? `1.5px solid ${C.ink}` : `1px solid ${C.border}`, borderRadius: 99, padding: '3px 9px', cursor: 'pointer', fontFamily: INTER, transition: 'all 0.12s' }}>
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
      aria-label={`Invested ${principalPct}% of final corpus, returns ${100 - principalPct}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Invested</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{principalPct}%</text>
    </svg>
  );
}

/* ─── Stacked bar chart: invested vs interest earned each year ── */
function BarChart({ rows }: { rows: YearRow[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxAnnual = Math.max(...rows.map(r => r.annualContribution + Math.max(0, r.interest)));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;
  return (
    <svg role="img" aria-label="Year-by-year amount invested and interest earned"
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {rows.map((row, i) => {
        const contrib = row.annualContribution;
        const interest = Math.max(0, row.interest);
        const total = contrib + interest;
        const totalH = maxAnnual > 0 ? (total / maxAnnual) * H : 0;
        const contribH = total > 0 ? (contrib / total) * totalH : 0;
        const intH = totalH - contribH;
        const x = PADL + i * slot + gap;
        return (
          <g key={row.year}>
            <rect x={x} y={H - totalH} width={barW} height={intH} fill={CHART_PAIR.secondary} rx={2} />
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
  { href: '/calculators/sip-calculator',              label: 'SIP Calculator' },
  { href: '/calculators/xirr-calculator',             label: 'XIRR Calculator' },
  { href: '/calculators/lumpsum-calculator',          label: 'Lumpsum Calculator' },
  { href: '/calculators/cagr-calculator',             label: 'CAGR Calculator' },
  { href: '/calculators/future-value-calculator',     label: 'Future Value Calculator' },
  { href: '/calculators/swp-calculator',              label: 'SWP Calculator' },
  { href: '/calculators/compound-interest-calculator',label: 'Compound Interest Calculator' },
];
const MORE = [
  { href: '/calculators/retirement-calculator',    label: 'Retirement Calculator' },
  { href: '/calculators/wealth-growth-calculator', label: 'Wealth Growth Calculator' },
  { href: '/calculators/fd-calculator',            label: 'FD Calculator' },
  { href: '/calculators/ppf-calculator',           label: 'PPF Calculator' },
  { href: '/calculators/nps-calculator',           label: 'NPS Calculator' },
];

/* ─── FAQ (items are passed in from page.tsx, the single source) ─ */
function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return <FAQBox items={items} />;
}

/* ─── CA CTA (exact standard component) ──────────────────────── */

/* ─── Main ───────────────────────────────────────────────────── */
export default function StepUpSIPClient({ faqItems }: { faqItems: { q: string; a: string }[] }) {
  const defaultSettings = { monthlySip: 5000, stepUp: 10, returnRate: 12, period: 15, showTable: false };
  const { settings, updateSettings } = useCalculatorSettings('step-up-sip-v1', defaultSettings);
  const { monthlySip, stepUp, returnRate, period, showTable } = settings;
  const setMonthlySip = (v: any) => updateSettings({ monthlySip: typeof v === 'function' ? v(settings.monthlySip) : v });
  const setStepUp     = (v: any) => updateSettings({ stepUp: typeof v === 'function' ? v(settings.stepUp) : v });
  const setReturnRate = (v: any) => updateSettings({ returnRate: typeof v === 'function' ? v(settings.returnRate) : v });
  const setPeriod     = (v: any) => updateSettings({ period: typeof v === 'function' ? v(settings.period) : v });
  const setShowTable  = (v: any) => updateSettings({ showTable: typeof v === 'function' ? v(settings.showTable) : v });
  const [mobile, setMobile] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const result = useMemo(() => {
    if (period <= 0 || monthlySip <= 0) return null;
    const monthlyRate = Math.pow(1 + returnRate / 100, 1 / 12) - 1;
    let corpus = 0;
    let normalCorpus = 0;
    let totalInvested = 0;
    let openingCorpus = 0;
    const rows: YearRow[] = [];
    const totalMonths = period * 12;
    const startYear = new Date().getFullYear();

    for (let m = 0; m < totalMonths; m++) {
      const yearIndex = Math.floor(m / 12);
      const currentMonthlySip = monthlySip * Math.pow(1 + stepUp / 100, yearIndex);
      corpus = corpus * (1 + monthlyRate) + currentMonthlySip;
      normalCorpus = normalCorpus * (1 + monthlyRate) + monthlySip;
      totalInvested += currentMonthlySip;

      if (m % 12 === 11) {
        const annualContribution = currentMonthlySip * 12;
        rows.push({
          year: startYear + yearIndex,
          monthlySip: currentMonthlySip,
          annualContribution,
          cumulativeInvested: totalInvested,
          interest: corpus - openingCorpus - annualContribution,
          corpus,
        });
        openingCorpus = corpus;
      }
    }

    const wealthGain = corpus - totalInvested;
    const normalTotalInvested = monthlySip * totalMonths;
    const extraCorpus = corpus - normalCorpus;
    const finalSip = monthlySip * Math.pow(1 + stepUp / 100, period - 1);
    const multiple = normalCorpus > 0 ? corpus / normalCorpus : 1;

    return { corpus, totalInvested, wealthGain, normalCorpus, normalTotalInvested, extraCorpus, finalSip, multiple, rows };
  }, [monthlySip, stepUp, returnRate, period]);

  const prinPct    = result ? Math.round((result.totalInvested / result.corpus) * 100) : 50;
  const returnsPct = 100 - prinPct;

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const lnk = { color: C.dark, fontWeight: 600 } as React.CSSProperties;
  const thS = { padding: '10px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', verticalAlign: 'middle', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'left', verticalAlign: 'middle', border: `1px solid ${C.border}` } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, textAlign: 'right', verticalAlign: 'middle', border: `1px solid ${C.border}` } as React.CSSProperties;
  const thR = { ...thS, textAlign: 'right' } as React.CSSProperties;
  const tableBox = { overflowX: 'auto', maxWidth: '100%', marginBottom: 12 } as React.CSSProperties;
  const tbl = { width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 } as React.CSSProperties;
  const code = { fontFamily: 'monospace', background: '#f4f5f6', padding: '1px 5px', borderRadius: 4, fontSize: 13 } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Step-Up SIP Calculator
          </h1>
          <p style={{ fontSize: 14.5, color: C.ink3, margin: 0 }}>
            Estimate how much your SIP grows when you increase the investment amount by a fixed percentage every year
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="Step-Up SIP Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'minmax(0, 1fr)' : 'minmax(0, 1fr) minmax(0, 1fr)' }}>

                {/* Input panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  <Slider label="Monthly SIP Amount" id="stepup-monthly" value={monthlySip} min={500} max={500000} step={500} fmt={fmtC} onChange={setMonthlySip} compact={mobile} />
                  <Slider label="Annual Step-Up %" id="stepup-pct" value={stepUp} min={0} max={50} step={1} fmt={v => `${v}%`} onChange={setStepUp} compact={mobile} />
                  <Slider label="Expected Return Rate % p.a." id="stepup-rate" value={returnRate} min={1} max={30} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={setReturnRate} compact={mobile} />
                  <Slider label="Investment Period" id="stepup-period" value={period} min={1} max={40} step={1} fmt={v => `${v} Yr`} onChange={setPeriod} compact={mobile} />
                  <YearPresets current={period} onChange={setPeriod} />

                  {result && (
                    <div style={{ marginTop: 8, padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 12.5, color: C.ink, fontWeight: 700, marginBottom: 4 }}>
                        <span>Monthly SIP in year 1</span>
                        <span>{fmtC(monthlySip)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 12, color: C.ink2, marginBottom: 2 }}>
                        <span>Monthly SIP in year {period}</span>
                        <span>{fmtC(result.finalSip)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 12, color: C.ink2 }}>
                        <span>Total over {period} {period === 1 ? 'year' : 'years'}</span>
                        <span>{fmtC(result.totalInvested)}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Result panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {result ? (
                    <>
                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>
                          Final Corpus
                        </span>
                        <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                          aria-live="polite" aria-label={`Result: ${fmtIN(result.corpus)}`}>
                          {fmtIN(result.corpus)}
                        </span>
                      </div>

                      {[
                        { label: 'Total invested',       value: fmtC(result.totalInvested) },
                        { label: 'Wealth gain',          value: fmtC(result.wealthGain) },
                        { label: 'Normal SIP corpus',    value: fmtC(result.normalCorpus) },
                        { label: 'Extra with step-up',   value: fmtC(result.extraCorpus) },
                        { label: 'Corpus vs normal SIP', value: `${result.multiple.toFixed(2)}x` },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                        </div>
                      ))}

                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                        <DonutChart principal={result.totalInvested} gains={result.wealthGain} principalPct={prinPct} />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                          <span style={{ fontSize: 12, color: C.ink2 }}>Invested {prinPct}%</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                          <span style={{ fontSize: 12, color: C.ink2 }}>Returns {returnsPct}%</span>
                        </div>
                      </div>

                      <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 11.5, color: C.ink3 }}>Invested {prinPct}%</span>
                          <span style={{ fontSize: 11.5, color: C.ink3 }}>Returns {returnsPct}%</span>
                        </div>
                        <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`Invested is ${prinPct}% of final corpus`}>
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

              {/* Year-by-year schedule: bar chart above table */}
              {result && result.rows.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowTable((v: boolean) => !v)}
                    aria-expanded={showTable} aria-controls="stepup-table"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Year-by-Year Step-Up Growth</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>Compounding at {returnRate}%</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {result.rows.length} yr · {stepUp}% step-up
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showTable && (
                    <div id="stepup-table" style={{ borderTop: `1px solid ${C.border}` }}>
                      <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                        <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>Invested</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>Interest earned</span>
                          </div>
                        </div>
                        <BarChart rows={result.rows} />
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
                      <div style={{ overflowX: 'auto', maxWidth: '100%', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
                        <table style={{ minWidth: 640, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0 0', textAlign: 'left' }}>Year-by-year step-up SIP schedule at the inputs above.</caption>
                          <thead>
                            <tr>
                              <th style={thS} scope="col">Year</th>
                              <th style={thR} scope="col">Monthly SIP</th>
                              <th style={thR} scope="col">Invested this year</th>
                              <th style={thR} scope="col">Total invested</th>
                              <th style={thR} scope="col">Interest</th>
                              <th style={thR} scope="col">Closing corpus</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.rows.map((row, i) => (
                              <tr key={row.year} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ ...tdL, fontWeight: 700, color: C.dark }}>{row.year}</td>
                                <td style={tdR}>{fmtIN(row.monthlySip)}</td>
                                <td style={{ ...tdR, color: '#166534', fontWeight: 600 }}>{fmtIN(row.annualContribution)}</td>
                                <td style={tdR}>{fmtIN(row.cumulativeInvested)}</td>
                                <td style={{ ...tdR, color: '#B45309' }}>{fmtIN(row.interest)}</td>
                                <td style={{ ...tdR, fontWeight: 700 }}>{fmtIN(row.corpus)}</td>
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

            {/* ── WAITLIST + CA CTA ── */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>


            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-step-up-sip">What Is a Step-Up SIP?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    A step-up SIP is a systematic investment plan where the monthly contribution rises by a fixed percentage every year. A Rs 10,000 SIP with a 10% step-up becomes Rs 11,000 in year 2 and Rs 12,100 in year 3, so your investing keeps pace with your income.
                  </p>
                </div>
                <p style={p}>
                  A standard SIP keeps the same amount for the whole tenure. If you start at Rs 5,000 a month at 25, you are still investing Rs 5,000 at 40, even though your salary has probably tripled.
                </p>
                <p style={p}>
                  A step-up SIP fixes that with a standing instruction. Your own SIP rises by a percentage you pick, and the extra money compounds alongside everything already invested. Mutual fund SIPs themselves follow the framework published by <a href="https://www.amfiindia.com" target="_blank" rel="noopener noreferrer" style={lnk}>AMFI</a> and the <a href="https://www.sebi.gov.in" target="_blank" rel="noopener noreferrer" style={lnk}>SEBI</a> mutual fund regulations.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-step-up-sip-works">How Does a Step-Up SIP Work?</h2>
                <p style={p}>
                  A step-up SIP holds the monthly amount fixed inside each year and raises it at the start of the next year by the step-up percentage.
                </p>
                <p style={p}>
                  The table below follows a Rs 10,000 SIP with a 10% step-up at a 12% return. By year 10 the monthly SIP is Rs 23,579 and the corpus is Rs 32.38 lakh.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                      <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0 0', textAlign: 'left' }}>Rs 10,000 starting SIP, 10% annual step-up, 12% return, as computed by the calculator above.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Year</th><th style={thR} scope="col">Monthly SIP</th><th style={thR} scope="col">Total invested</th><th style={thR} scope="col">Corpus at year end</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['1', 'Rs 10,000', 'Rs 1,20,000', 'Rs 1,26,465'],
                        ['2', 'Rs 11,000', 'Rs 2,52,000', 'Rs 2,80,752'],
                        ['3', 'Rs 12,100', 'Rs 3,97,200', 'Rs 4,67,465'],
                        ['4', 'Rs 13,310', 'Rs 5,56,920', 'Rs 6,91,886'],
                        ['5', 'Rs 14,641', 'Rs 7,32,612', 'Rs 9,60,070'],
                        ['6', 'Rs 16,105', 'Rs 9,25,873', 'Rs 12,78,951'],
                        ['7', 'Rs 17,716', 'Rs 11,38,461', 'Rs 16,56,466'],
                        ['8', 'Rs 19,487', 'Rs 13,72,307', 'Rs 21,01,686'],
                        ['9', 'Rs 21,436', 'Rs 16,29,537', 'Rs 26,24,977'],
                        ['10', 'Rs 23,579', 'Rs 19,12,491', 'Rs 32,38,172'],
                      ].map(([y, s, inv, c]) => (
                        <tr key={y}><td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{y}</td><td style={tdR}>{s}</td><td style={tdR}>{inv}</td><td style={{ ...tdR, color: '#166534', fontWeight: 700 }}>{c}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Each month the existing corpus earns one month of return and the new instalment is added at the end of the month.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="step-up-sip-formula">Step-Up SIP Formula and Calculation</h2>
                <p style={p}>
                  The step-up SIP corpus is a geometric series of annual SIP blocks, each compounded to the end of the tenure.
                </p>
                <pre style={{ fontFamily: 'monospace', fontSize: 13, background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 16px', margin: '0 0 16px', overflowX: 'auto', lineHeight: 1.8, color: C.ink }}>
{`Monthly rate  i = (1 + annual return)^(1/12) - 1
Year-1 factor A = ((1 + i)^12 - 1) / i
Corpus = S x A x SUM over k = 0 to n-1 of  g^k x (1 + i)^(12 x (n - 1 - k))

S = starting monthly SIP,  g = 1 + step-up rate,  n = years`}
                </pre>
                <p style={p}>
                  The calculator runs the same maths month by month. For Rs 10,000, a 10% step-up, 12% return and 20 years, both routes give Rs 1,84,56,256.
                </p>
                <p style={p}>
                  The annual return is converted to an effective monthly rate, and each instalment lands at month end. Calculators that divide the annual rate by 12 show a higher corpus: Rs 1.97 crore for this same example.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="step-up-vs-normal-sip">Step-Up SIP vs Normal SIP: How Big Is the Difference?</h2>
                <p style={p}>
                  A 10% step-up roughly doubles the corpus over 20 years, but it also takes nearly three times the money.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                      <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0 0', textAlign: 'left' }}>20 years, 12% annual return. Figures from the calculator formula above.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Metric</th><th style={thR} scope="col">Normal SIP</th><th style={thR} scope="col">Step-up SIP (10%)</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Monthly SIP in year 1', 'Rs 10,000', 'Rs 10,000'],
                        ['Monthly SIP in year 20', 'Rs 10,000', 'Rs 61,159'],
                        ['Total invested', 'Rs 24,00,000', 'Rs 68,73,000'],
                        ['Final corpus (12% return)', 'Rs 91,12,111', 'Rs 1,84,56,256'],
                        ['Wealth gain', 'Rs 67,12,111', 'Rs 1,15,83,256'],
                      ].map(([metric, normal, stepped]) => (
                        <tr key={metric}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{metric}</td>
                          <td style={tdR}>{normal}</td>
                          <td style={{ ...tdR, color: '#166534', fontWeight: 700 }}>{stepped}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  A flat SIP of about Rs 20,255 a month would reach the same Rs 1.85 crore with Rs 48.6 lakh invested. The step-up wins on affordability, not efficiency: it starts at half the outlay.
                </p>
                <p style={p}>
                  Use the <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>SIP Calculator</Link> to model a flat SIP, and the <Link href="/calculators/lumpsum-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Lumpsum Calculator</Link> for a one-time investment.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="step-up-sip-by-tenure">How Do Tenure and Return Rate Change Step-Up SIP Returns?</h2>
                <p style={p}>
                  Tenure matters more than return rate: the step-up advantage over a flat SIP grows from 1.19x at 5 years to 2.59x at 30 years.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                      <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0 0', textAlign: 'left' }}>Rs 10,000 starting SIP, 10% step-up, 12% return.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Years</th><th style={thR} scope="col">Invested</th><th style={thR} scope="col">Step-up corpus</th><th style={thR} scope="col">Normal SIP corpus</th><th style={thR} scope="col">Multiple</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['5', 'Rs 7,32,612', 'Rs 9,60,070', 'Rs 8,03,413', '1.19x'],
                        ['10', 'Rs 19,12,491', 'Rs 32,38,172', 'Rs 22,19,300', '1.46x'],
                        ['15', 'Rs 38,12,698', 'Rs 81,96,939', 'Rs 47,14,578', '1.74x'],
                        ['20', 'Rs 68,73,000', 'Rs 1,84,56,256', 'Rs 91,12,111', '2.03x'],
                        ['25', 'Rs 1,18,01,647', 'Rs 3,89,85,096', 'Rs 1,68,62,065', '2.31x'],
                        ['30', 'Rs 1,97,39,283', 'Rs 7,91,07,132', 'Rs 3,05,20,133', '2.59x'],
                      ].map(([y, inv, s, n, m]) => (
                        <tr key={y}><td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{y}</td><td style={tdR}>{inv}</td><td style={{ ...tdR, color: '#166534', fontWeight: 700 }}>{s}</td><td style={tdR}>{n}</td><td style={{ ...tdR, fontWeight: 600 }}>{m}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The return rate shifts the 20-year corpus on the same Rs 68.73 lakh invested.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                      <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0 0', textAlign: 'left' }}>Rs 10,000 starting SIP, 10% step-up, 20 years.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Return rate</th><th style={thR} scope="col">Corpus after 20 years</th><th style={thR} scope="col">Invested</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['8%', 'Rs 1,28,47,579'],
                        ['10%', 'Rs 1,53,39,356'],
                        ['12%', 'Rs 1,84,56,256'],
                        ['14%', 'Rs 2,23,66,605'],
                      ].map(([r, c]) => (
                        <tr key={r}><td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{r}</td><td style={{ ...tdR, fontWeight: 700 }}>{c}</td><td style={tdR}>Rs 68,73,000</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Compare the result with your own fund&apos;s record using the <Link href="/calculators/cagr-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>CAGR Calculator</Link>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="choosing-step-up-percentage">What Step-Up Percentage Should You Choose?</h2>
                <p style={p}>
                  Choose a step-up close to your expected salary growth, usually 5% to 10%, and raise it only if your income supports it.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                      <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0 0', textAlign: 'left' }}>Rs 10,000 starting SIP, 12% return, 20 years.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Step-up</th><th style={thR} scope="col">Monthly SIP in year 20</th><th style={thR} scope="col">Total invested</th><th style={thR} scope="col">Corpus</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['0%', 'Rs 10,000', 'Rs 24,00,000', 'Rs 91,12,111'],
                        ['5%', 'Rs 25,270', 'Rs 39,67,914', 'Rs 1,26,33,843'],
                        ['10%', 'Rs 61,159', 'Rs 68,73,000', 'Rs 1,84,56,256'],
                        ['15%', 'Rs 1,42,318', 'Rs 1,22,93,230', 'Rs 2,83,29,185'],
                        ['20%', 'Rs 3,19,480', 'Rs 2,24,02,560', 'Rs 4,53,55,569'],
                      ].map(([g, s, inv, c]) => (
                        <tr key={g}><td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{g}</td><td style={tdR}>{s}</td><td style={tdR}>{inv}</td><td style={{ ...tdR, color: '#166534', fontWeight: 700 }}>{c}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The 20% row shows the catch. A Rs 3.19 lakh monthly SIP in year 20 is only realistic if your income grew by a similar factor.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="step-up-sip-in-excel">How Do You Calculate a Step-Up SIP in Excel?</h2>
                <p style={p}>
                  A step-up SIP in Excel takes one row per year and one <code style={code}>FV()</code> formula, chained from the previous year&apos;s closing balance.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                      <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0 0', textAlign: 'left' }}>Column layout for a year-wise step-up SIP sheet in Excel or Google Sheets.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Column</th><th style={thS} scope="col">Content</th><th style={thS} scope="col">Formula</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['A: Year', 'Year number, 1 to N', 'Fill down'],
                        ['B: Monthly SIP', 'Starting SIP raised by the step-up', '=Start*(1+Step)^(A2-1)'],
                        ['C: Opening corpus', 'Closing corpus of the previous row', '=F1 (previous row)'],
                        ['D: Monthly rate', 'Effective monthly rate', '=(1+Rate)^(1/12)-1'],
                        ['E: Interest', 'Interest earned in the year', '=F2-C2-B2*12'],
                        ['F: Closing corpus', 'FV of opening balance and 12 instalments', '=FV(D2,12,-B2,-C2)'],
                      ].map(([col, content, f]) => (
                        <tr key={col}><td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{col}</td><td style={tdL}>{content}</td><td style={{ ...tdL, fontFamily: 'monospace', fontSize: 12.5 }}>{f}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The sheet matches the calculator to within rounding because <code style={code}>FV()</code> with a negative payment treats each instalment as paid at month end. To check a real SIP against actual dates, use the <Link href="/calculators/xirr-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>XIRR Calculator</Link>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="reverse-step-up-sip">How Much Should You Start With to Reach a Target?</h2>
                <p style={p}>
                  To reach Rs 1 crore in 20 years, a 10% step-up lets you start at Rs 5,419 a month instead of the Rs 10,975 a flat SIP needs.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                      <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0 0', textAlign: 'left' }}>20 years, 10% annual step-up, 12% return. Starting SIP rounded up to the next rupee.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Target corpus</th><th style={thR} scope="col">Starting step-up SIP</th><th style={thR} scope="col">Flat SIP needed</th><th style={thR} scope="col">Step-up total invested</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Rs 1 crore', 'Rs 5,419', 'Rs 10,975', 'Rs 37,24,479'],
                        ['Rs 2 crore', 'Rs 10,837', 'Rs 21,949', 'Rs 74,48,270'],
                        ['Rs 5 crore', 'Rs 27,092', 'Rs 54,873', 'Rs 1,86,20,331'],
                        ['Rs 10 crore', 'Rs 54,183', 'Rs 1,09,745', 'Rs 3,72,39,976'],
                      ].map(([t, s, f, inv]) => (
                        <tr key={t}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{t}</td><td style={{ ...tdR, color: '#166534', fontWeight: 700 }}>{s}</td><td style={tdR}>{f}</td><td style={tdR}>{inv}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Set the sliders above until the final corpus matches your target. For a goal-first view, the <Link href="/calculators/monthly-investment-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Monthly Investment Calculator</Link> solves for the SIP directly.
                </p>
              </div>

              {/* In-Content Promo Bar */}
              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', margin: '0 0 44px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Down Payment Planner Calculator</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Work out the monthly step-up SIP needed to reach a property down payment target on schedule.</p>
                </div>
                <Link className="fx-btn" href="/calculators/down-payment-planner-calculator" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
              </div>

              <div style={sec}>
                <h2 style={h2} id="step-up-vs-top-up-sip">Step-Up SIP vs Top-Up SIP vs Flat SIP</h2>
                <p style={p}>
                  In India, step-up and top-up SIP mean the same thing: a SIP that increases on a schedule, either by a percentage or by a fixed rupee amount.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                      <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0 0', textAlign: 'left' }}>Both options invest at the fund NAV on each instalment date.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Feature</th><th style={thS} scope="col">Flat SIP</th><th style={thS} scope="col">Step-up SIP</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Monthly amount', 'Same every year', 'Rises by a percentage or fixed amount each year'],
                        ['Starting outlay', 'High, to reach a given goal', 'Lower, to reach the same goal'],
                        ['Fit with salary growth', 'Falls behind', 'Keeps pace'],
                        ['Total money invested', 'Lower', 'Higher'],
                        ['Needs a standing instruction', 'One SIP mandate', 'Step-up option on the mandate'],
                        ['Market risk', 'Yes, no guaranteed return', 'Yes, no guaranteed return'],
                      ].map(([f, a, b]) => (
                        <tr key={f}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{f}</td><td style={tdL}>{a}</td><td style={tdL}>{b}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  A manual increase, where you edit the SIP when you remember, is not the same. It works only as long as you remember to do it.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="step-up-sip-tax">How Is a Step-Up SIP Taxed?</h2>
                <p style={p}>
                  A step-up SIP is taxed like any equity fund investment, with the holding period counted separately for every instalment.
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Long-term gains:</strong> units held for more than 12 months are taxed at 12.5% on the gain above Rs 1.25 lakh in a financial year.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Short-term gains:</strong> units sold within 12 months are taxed at 20%.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>ELSS:</strong> every instalment has its own three-year lock-in, so a step-up ELSS SIP unlocks one year of instalments at a time.
                  </li>
                </ul>
                <p style={p}>
                  Debt and hybrid funds follow different rules. Confirm current rates on the <a href="https://incometaxindia.gov.in" target="_blank" rel="noopener noreferrer" style={lnk}>Income Tax Department</a> site before you redeem.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="step-up-sip-risks">What Are the Limitations of a Step-Up SIP?</h2>
                <p style={p}>
                  A step-up SIP does not remove market risk, and its result depends on assumptions you cannot guarantee.
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Returns are not fixed:</strong> the 12% in the calculator is an assumption. A fund can return less over any period.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Income may not keep up:</strong> a 15% step-up becomes a burden if your salary rises 6%. A SIP you stop in year six loses the larger late instalments.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Inflation is not included:</strong> a Rs 1.85 crore corpus in 20 years buys less than it does today. The <Link href="/calculators/real-return-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Real Return Calculator</Link> adjusts for it.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Short goals are exposed:</strong> equity funds can fall just before you need the money, so keep goals under five years in safer products.
                  </li>
                </ul>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This Step-Up SIP Calculator</h2>
                <p style={p}>This calculator has four inputs. Adjust the sliders and the result updates instantly.</p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Monthly SIP Amount:</strong> the amount you invest each month in year 1. Drag the slider or click the value to type a number.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Annual Step-Up %:</strong> how much the monthly SIP rises each year. The default of 10% is close to typical salary growth.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Expected Return Rate % p.a.:</strong> the yearly return you assume. Test a lower figure to see how much margin your goal has.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Investment Period:</strong> the number of years you will run the SIP. Use the preset buttons for quick selection.
                  </li>
                </ol>
                <p style={{ ...p, margin: 0 }}>
                  The result panel shows the final corpus, total invested, wealth gain and how the corpus compares with a flat SIP. Open the year-by-year section for the bar chart and the full schedule. The currency selector converts every figure.
                </p>
              </div>

              

              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ items={faqItems} />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only. Projected returns are based on the assumed rate of return and do not guarantee future performance. Past performance of any investment or market index does not guarantee future results. Tax figures reflect the rules as understood at the time of writing. This calculator is for educational and planning purposes and does not constitute financial advice. Consult a SEBI-registered investment adviser before making investment decisions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.step-up-sip-sidebar::-webkit-scrollbar{width:5px}.step-up-sip-sidebar::-webkit-scrollbar-track{background:transparent}.step-up-sip-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.step-up-sip-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="step-up-sip-sidebar" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ flexShrink: 0 }}><SIPSnapshot /></div>
              <nav aria-label="Related Calculators" style={{ display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0 }}>
                <SidebarList title="Popular Calculators" items={POPULAR} />
                <SidebarList title="More Calculators" items={MORE} />
              </nav>
              <div style={{ flexShrink: 0 }}><RelatedReads /></div>
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

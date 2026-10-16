'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { calculateFutureWealth } from '../../../src/lib/wealthForecast';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import { FAQBox } from '@/components/common/FAQBox';

const C = {
  dark: '#101214', lime: '#a6dbc4', lime2: '#2d9970', paleLime: '#f4f5f6',
  ink: '#16140F', ink2: '#50565c', ink3: '#7a8087', white: '#ffffff',
  bg: '#f6f7f8', border: '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

/* ── Article table styles ──────────────────────────────── */
const thS: React.CSSProperties = {
  padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink,
  background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase',
  letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap',
  verticalAlign: 'middle',
};
const tdL: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'middle', textAlign: 'left' };
const tdR: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'middle', textAlign: 'right' };
const tdC: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'middle', textAlign: 'center' };

interface YearRow { year: number; age: number; opening: number; contribution: number; returns: number; closing: number }

function buildProjection(
  years: number, monthlyInvestment: number, existingWealth: number, returnRate: number
): YearRow[] {
  if (years <= 0) return [];
  const rows: YearRow[] = [];
  let prevClosing = existingWealth;
  const yearlyContrib = monthlyInvestment * 12;
  for (let i = 0; i < years; i++) {
    const closing = calculateFutureWealth(existingWealth, monthlyInvestment, returnRate, i + 1);
    const returnsEarned = closing - prevClosing - yearlyContrib;
    rows.push({
      year: new Date().getFullYear() + i,
      age: i + 1,
      opening: Math.round(prevClosing),
      contribution: Math.round(yearlyContrib),
      returns: Math.round(returnsEarned),
      closing: Math.round(closing),
    });
    prevClosing = closing;
  }
  return rows;
}

function DonutChart({ contributions, returns }: { contributions: number; returns: number }) {
  const total = contributions + returns;
  if (total === 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const pArc = (contributions / total) * circ;
  const pPct = Math.round((contributions / total) * 100);
  return (
    <svg role="img" aria-label={`Contribution split: ${pPct}% contributions, ${100 - pPct}% returns`}
      width="212" height="212" viewBox="0 0 212 212" style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Contributions</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
  );
}

function BarChart({ rows }: { rows: YearRow[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxAnnual = Math.max(...rows.map(r => r.contribution + r.returns));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;
  return (
    <svg role="img" aria-label="Year-by-year investment and returns breakdown for your wealth growth projection"
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {rows.map((row, i) => {
        const total = row.contribution + row.returns;
        const totalH = maxAnnual > 0 ? (total / maxAnnual) * H : 0;
        const contribH = total > 0 ? (row.contribution / total) * totalH : 0;
        const x = PADL + i * slot + gap;
        return (
          <g key={row.year}>
            <rect x={x} y={H - totalH} width={barW} height={totalH - contribH} fill={CHART_PAIR.secondary} rx={2} />
            <rect x={x} y={H - contribH} width={barW} height={contribH} fill={CHART_PAIR.primary} rx={2} />
            {rows.length <= 30 && (
              <text x={x + barW / 2} y={H + 14} textAnchor="middle" style={{ fontSize: rows.length > 20 ? 7 : 9, fill: C.ink3, fontFamily: INTER }}>
                {row.age}
              </text>
            )}
          </g>
        );
      })}
      <line x1={PADL} y1={H} x2={W} y2={H} stroke={C.border} strokeWidth={1} />
    </svg>
  );
}

function GrowthCurve({ rows, formatValue }: { rows: YearRow[]; formatValue: (value: number) => string }) {
  if (rows.length === 0) return null;
  const W = 800, H = 190, PAD = { top: 18, right: 12, bottom: 28, left: 12 };
  const maxValue = Math.max(...rows.map(row => row.closing), 1);
  const chartWidth = W - PAD.left - PAD.right;
  const chartHeight = H - PAD.top - PAD.bottom;
  const points = rows.map((row, index) => {
    const x = PAD.left + (rows.length === 1 ? chartWidth / 2 : (index / (rows.length - 1)) * chartWidth);
    const y = PAD.top + chartHeight - (row.closing / maxValue) * chartHeight;
    return { x, y, row };
  });
  const line = points.map(point => `${point.x},${point.y}`).join(' ');
  const area = `${PAD.left},${PAD.top + chartHeight} ${line} ${PAD.left + chartWidth},${PAD.top + chartHeight}`;
  const labelPoints = points.length > 12 ? points.filter((_, index) => index === 0 || index === points.length - 1 || index % Math.ceil(points.length / 6) === 0) : points;

  return (
    <div>
      <svg role="img" aria-label="Estimated wealth growth curve over the investment period" viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          <linearGradient id="wealth-growth-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={C.lime2} stopOpacity="0.35" />
            <stop offset="100%" stopColor={C.lime2} stopOpacity="0.03" />
          </linearGradient>
        </defs>
        <line x1={PAD.left} y1={PAD.top + chartHeight} x2={W - PAD.right} y2={PAD.top + chartHeight} stroke={C.border} />
        <polygon points={area} fill="url(#wealth-growth-fill)" />
        <polyline points={line} fill="none" stroke={C.dark} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {labelPoints.map(point => (
          <g key={point.row.year}>
            <circle cx={point.x} cy={point.y} r="4" fill={C.white} stroke={C.dark} strokeWidth="2" />
            <text x={point.x} y={H - 6} textAnchor="middle" style={{ fontSize: 10, fill: C.ink3, fontFamily: INTER }}>{point.row.age}</text>
          </g>
        ))}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2, color: C.ink3, fontSize: 11 }}>
        <span>Year 1: {formatValue(rows[0].closing)}</span>
        <span>Year {rows.length}: {formatValue(rows[rows.length - 1].closing)}</span>
      </div>
    </div>
  );
}

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
            aria-label={`Enter ${label} value`}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 120, outline: 'none', color: C.dark, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${fmt(value)}. Click to edit.`}
            style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: C.dark, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 18px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 90 : 110, textAlign: 'center' }}>
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

/* ── Wealth Snapshot (sidebar facts box) ────────────────── */
function WealthSnapshot() {
  const rows = [
    { label: 'Historical equity fund CAGR (10yr+)', value: '12-15%' },
    { label: 'Crossover point (returns > invested)', value: '~Year 11' },
    { label: 'LTCG tax on equity funds (above Rs 1.25L/yr)', value: '12.5%' },
    { label: 'Section 80C limit (ELSS, old regime)', value: 'Rs 1.5L' },
    { label: 'SIP step-up typically recommended', value: '10% / year' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Wealth Growth Snapshot</span>
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

/* ── RelatedReads (white box, news interlinks) ─────────── */
function RelatedReads() {
  const links = [
    { href: '/news/income-tax-slabs-fy-2025-26', label: 'Income Tax Slabs FY 2025-26: New vs Old Regime Rates' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Related Reads</span>
      </div>
      {links.map(l => (
        <Link key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', padding: '13px 16px', textDecoration: 'none', background: C.white }}>
          <span style={{ fontSize: 13, color: C.dark, fontWeight: 500, lineHeight: 1.5, display: 'block' }}>{l.label}</span>
        </Link>
      ))}
    </div>
  );
}

const POPULAR = [
  { href: '/calculators/cagr-calculator', label: 'CAGR Calculator' },
  { href: '/calculators/sip-calculator', label: 'SIP Calculator' },
  { href: '/calculators/step-up-sip-calculator', label: 'Step-Up SIP Calculator' },
  { href: '/calculators/lumpsum-calculator', label: 'Lumpsum Calculator' },
  { href: '/calculators/real-return-calculator', label: 'Real Return Calculator' },
  { href: '/calculators/compound-interest-calculator', label: 'Compound Interest Calculator' },
  { href: '/calculators/goal-planning-calculator', label: 'Goal Planning Calculator' },
];
const MORE = [
  { href: '/calculators/xirr-calculator', label: 'XIRR Calculator' },
  { href: '/calculators/future-value-calculator', label: 'Future Value Calculator' },
  { href: '/calculators/present-value-calculator', label: 'Present Value Calculator' },
  { href: '/calculators/retirement-corpus-calculator', label: 'Retirement Corpus Calculator' },
  { href: '/calculators/elss-calculator', label: 'ELSS Calculator' },
];

function FAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  return <FAQBox items={faqs} />;
}

export default function WealthGrowthCalculatorClient({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [mobile, setMobile] = useState(false);
  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const defaultSettings = { monthlyInvestment: 10000, returnRate: 12, years: 10, existingWealth: 0 };
  const { settings, updateSettings } = useCalculatorSettings('wealth-growth-calculator', defaultSettings);
  const { monthlyInvestment, returnRate, years, existingWealth } = settings;
  const setMonthlyInvestment = (v: number) => updateSettings({ monthlyInvestment: v });
  const setReturnRate        = (v: number) => updateSettings({ returnRate: v });
  const setYears              = (v: number) => updateSettings({ years: v });
  const setExistingWealth    = (v: number) => updateSettings({ existingWealth: v });

  const [showTable, setShowTable] = useState(true);
  const [chartView, setChartView] = useState<'curve' | 'breakdown'>('curve');
  const [showScenario, setShowScenario] = useState(true);

  const { formatCurrency, convertCurrency, selectedCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmt   = (n: number) => formatCurrency(convertCurrency(n), true);
          
  const rows = useMemo(() =>
    buildProjection(years, monthlyInvestment, existingWealth, returnRate),
    [years, monthlyInvestment, existingWealth, returnRate]
  );

  const totalMaturity = rows.length > 0 ? rows[rows.length - 1].closing : existingWealth;
  const totalInvestment = rows.reduce((s, r) => s + r.contribution, 0) + existingWealth;
  const totalReturns = totalMaturity - totalInvestment;
  const contribPct = totalMaturity > 0 ? Math.round((totalInvestment / totalMaturity) * 100) : 0;
  const returnsPct = 100 - contribPct;
  const returnMultiple = totalInvestment > 0 ? totalMaturity / totalInvestment : 0;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>Wealth Growth Calculator</h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Project how your regular investments grow over time, with a year-by-year breakdown of contributions versus compounding returns.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          <div style={{ minWidth: 0 }}>

            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                <div style={{ padding: mobile ? '20px 18px' : '40px 40px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Investment Details</p>
                    <CurrencySelector theme="light" />
                  </div>
                  <Slider label="Monthly Investment" value={monthlyInvestment} min={500} max={500000} step={500}
                    fmt={v => fmtIN(v)} onChange={setMonthlyInvestment} compact={mobile} />
                  <Slider label="Expected Return (p.a.)" value={returnRate} min={1} max={25} step={0.5}
                    fmt={v => `${v.toFixed(1)}%`} onChange={setReturnRate} compact={mobile} />
                  <Slider label="Investment Period" value={years} min={1} max={40} step={1}
                    fmt={v => `${v} Yr`} onChange={setYears} compact={mobile} />
                  <Slider label="Existing Wealth" value={existingWealth} min={0} max={10000000} step={50000}
                    fmt={v => fmtIN(v)} onChange={setExistingWealth} compact={mobile} />
                </div>

                <div style={{ padding: mobile ? '20px 18px' : '40px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 12, padding: mobile ? '12px 16px' : '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.dark }}>Total Maturity Amount</span>
                    <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: C.dark, letterSpacing: '-0.02em' }}>{fmt(totalMaturity)}</span>
                  </div>

                  {[
                    { label: 'Total Investment', value: fmt(totalInvestment) },
                    { label: 'Total Returns', value: fmt(totalReturns) },
                    { label: 'Return Multiple', value: `${returnMultiple.toFixed(2)}x` },
                    { label: 'Monthly Investment', value: fmtIN(monthlyInvestment) },
                    { label: 'Return Rate', value: `${returnRate.toFixed(1)}%` },
                    { label: 'Period', value: `${years} Yr` },
                    { label: 'Existing Wealth', value: fmtIN(existingWealth) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '15px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 24, order: mobile ? 1 : -1 }}>
                    <DonutChart contributions={totalInvestment} returns={totalReturns} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 22, marginBottom: mobile ? 8 : 28, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Contributions</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Returns</span>
                    </div>
                  </div>

                  <div style={{ width: '100%', marginTop: mobile ? 8 : 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Contributions {contribPct}%</span>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Returns {returnsPct}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${contribPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* ── Year-by-Year Growth (its own card, matching Bank-wise/Scenario cards) ── */}
            {rows.length > 0 && (
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', marginBottom: 32, boxShadow: '0 1px 12px rgba(16,18,20,0.05)' }}>
                <button onClick={() => setShowTable(v => !v)} aria-expanded={showTable} aria-controls="year-panel"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: INTER }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>Year-by-Year Growth</div>
                    <div style={{ fontSize: 12, color: C.ink3, marginTop: 3 }}>How {fmt(totalMaturity)} breaks into contributions and returns over {rows.length} years</div>
                  </div>
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}><polyline points="6 9 12 15 18 9" /></svg>
                </button>

                {showTable && (
                  <div id="year-panel" style={{ padding: '4px 24px 24px' }}>
                    <div role="tablist" aria-label="Forecast chart views" style={{ display: 'flex', gap: 24, borderBottom: `1px solid ${C.border}`, marginBottom: 18 }}>
                      {[
                        { key: 'curve' as const, label: 'Growth curve' },
                        { key: 'breakdown' as const, label: 'Annual breakdown' },
                      ].map(view => (
                        <button key={view.key} role="tab" aria-selected={chartView === view.key} onClick={() => setChartView(view.key)}
                          style={{ padding: '10px 0', border: 'none', borderBottom: chartView === view.key ? `2.5px solid ${C.dark}` : '2.5px solid transparent', background: 'none', color: chartView === view.key ? C.dark : C.ink3, fontSize: 13, fontWeight: chartView === view.key ? 700 : 500, cursor: 'pointer', fontFamily: INTER }}>
                          {view.label}
                        </button>
                      ))}
                    </div>
                    {chartView === 'curve' ? <GrowthCurve rows={rows} formatValue={fmt} /> : <BarChart rows={rows} />}
                    <div style={{ marginBottom: 18 }}>
                      <div style={{ display: 'flex', gap: 20, marginTop: 14 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                          <span style={{ fontSize: 13, color: C.ink2 }}>{chartView === 'curve' ? 'Projected corpus' : 'Investment'}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                          <span style={{ fontSize: 13, color: C.ink2 }}>{chartView === 'curve' ? 'Growth area' : 'Returns'}</span>
                        </div>
                      </div>
                    </div>
                    {mobile && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, fontSize: 11, color: C.ink3 }}>
                        <span>Swipe to see all years</span>
                        <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'swipeHint 1.6s ease-in-out infinite' }}><polyline points="9 18 15 12 9 6" /></svg>
                        <style>{`@keyframes swipeHint { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }`}</style>
                      </div>
                    )}
                    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: mobile ? 520 : 'auto' }}>
                        <caption style={{ captionSide: 'bottom', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0', textAlign: 'left' }}>
                          Year-by-year wealth growth projection at {returnRate.toFixed(1)}% p.a. All values in Indian Rupees.
                        </caption>
                        <thead>
                          <tr>
                            <th scope="col" style={thS}>Year</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' }}>Opening</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' }}>Investment</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' }}>Returns</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' }}>Closing</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row, i) => (
                            <tr key={row.year} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                              <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>{row.year}</td>
                              <td style={tdR}>{fmtIN(row.opening)}</td>
                              <td style={{ ...tdR, color: '#166534', fontWeight: 600 }}>{fmtIN(row.contribution)}</td>
                              <td style={tdR}>{fmtIN(row.returns)}</td>
                              <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>{fmtIN(row.closing)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── Return Scenario Comparison ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', marginBottom: 32, boxShadow: '0 1px 12px rgba(16,18,20,0.05)' }}>
              <button onClick={() => setShowScenario(v => !v)} aria-expanded={showScenario} aria-controls="scenario-panel"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: INTER, gap: 8, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>Corpus by Return Scenario</div>
                  <div style={{ fontSize: 12, color: C.ink3, marginTop: 3 }}>Live: updates as you change your inputs above</div>
                </div>
                <span style={{ fontSize: 11, color: C.ink3, background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 6, padding: '4px 10px', fontWeight: 600 }}>
                  {fmtIN(monthlyInvestment)}/mo &#183; {years} yr
                </span>
              </button>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 20px 12px' }}>Corpus for your current monthly investment, tenure, and existing wealth, recomputed at each scenario&apos;s return rate.</caption>
                  <thead>
                    <tr>
                      <th scope="col" style={thS}>Scenario</th>
                      <th scope="col" style={{ ...thS, textAlign: 'center' }}>Typical Category</th>
                      <th scope="col" style={{ ...thS, textAlign: 'center' }}>Rate</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Corpus After {years} Yr</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: 'Conservative', category: 'Debt funds / FD', rate: 7 },
                      { label: 'Moderate', category: 'Hybrid / balanced advantage', rate: 10 },
                      { label: 'Growth', category: 'Large cap / flexi cap', rate: 12 },
                      { label: 'Aggressive Growth', category: 'Mid cap / multi cap', rate: 14 },
                      { label: 'High Growth', category: 'Small cap', rate: 16 },
                    ].map((s, i) => {
                      const corpus = calculateFutureWealth(existingWealth, monthlyInvestment, s.rate, years);
                      const isSelected = Math.abs(s.rate - returnRate) < 0.5;
                      return (
                        <tr key={s.label} style={{ background: isSelected ? C.paleLime : i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{s.label}</td>
                          <td style={tdC}>{s.category}</td>
                          <td style={tdC}>{s.rate}%</td>
                          <td style={{ ...tdR, fontWeight: isSelected ? 800 : 500, color: isSelected ? C.dark : C.ink }}>{fmt(corpus)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ marginBottom: 0 }}><SaveResultsCard mobile={mobile} /></div>

            

            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>
              {(() => {
                const h2 = { fontSize: mobile ? 19 : 22, fontWeight: 700, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.015em' } as React.CSSProperties;
                const h3 = { fontSize: 16, fontWeight: 600, color: C.ink, margin: '0 0 8px' } as React.CSSProperties;
                const p = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
                const sec = { margin: '0 0 48px' } as React.CSSProperties;
                return (
                  <>
                    {/* 1 */}
                    <section style={sec}>
                      <h2 id="what-is-wealth-growth" style={h2}>What Is Wealth Growth?</h2>
                      <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                        <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                          Wealth growth is the increase in your total net worth through regular investments and compounding, where the returns your money earns start generating returns of their own.
                        </p>
                      </div>
                      <p style={p}>
                        In the early years, your own contributions make up most of your corpus. As time passes, the accumulated returns become the bigger driver of growth. For a Rs 10,000 monthly investment at 12% annual returns with no starting capital, returns overtake total contributions by year 11.
                      </p>
                      <p style={p}>
                        This calculator projects that exact crossover point for your own numbers, along with a full year-by-year breakdown of contributions versus returns.
                      </p>
                    </section>

                    {/* 2 */}
                    <section style={sec}>
                      <h2 id="wealth-growth-formula" style={h2}>Wealth Growth Formula: How Compounding Is Calculated</h2>
                      <p style={p}>Wealth growth combines two components: the future value of your existing wealth, and the future value of your regular monthly investments (a SIP annuity).</p>
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 20px', marginBottom: 20, fontFamily: 'monospace' }}>
                        <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, margin: '0 0 6px' }}>FV = E &times; (1+r)^n + P &times; [((1+r)^n - 1) / r] &times; (1+r)</p>
                        <table style={{ fontSize: 13, borderCollapse: 'collapse', width: '100%' }}>
                          <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, paddingTop: 8, textAlign: 'left' }}>Wealth growth formula variable definitions</caption>
                          <tbody>
                            {[
                              ['E', 'Existing wealth (lumpsum you already hold)'],
                              ['P', 'Monthly investment (SIP amount)'],
                              ['r', 'Monthly rate of return = Annual rate / 12 / 100'],
                              ['n', 'Number of months invested (years x 12)'],
                            ].map(([sym, def]) => (
                              <tr key={sym}>
                                <td style={{ padding: '5px 16px 5px 0', fontWeight: 700, color: C.dark, whiteSpace: 'nowrap' }}>{sym}</td>
                                <td style={{ padding: '5px 0', color: C.ink2, fontFamily: INTER }}>{def}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <h3 style={h3}>Worked example</h3>
                      <p style={p}>For Rs 10,000 invested monthly at 12% for 30 years, with no existing wealth:</p>
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 20px', marginBottom: 16, fontFamily: 'monospace', fontSize: 13, color: C.ink2, lineHeight: 2 }}>
                        P = Rs 10,000, r = 12 / 12 / 100 = 0.01, n = 30 x 12 = 360<br />
                        FV = 10,000 &times; [(1.01^360 - 1) / 0.01] &times; 1.01<br />
                        <strong style={{ color: C.dark }}>FV = Rs 3,52,99,138 (approximately Rs 3.53 crore)</strong>
                      </div>
                      <p style={p}>Of this Rs 3.53 crore, your own contributions total Rs 36 lakh (Rs 10,000 x 360 months). The remaining Rs 3.17 crore, nearly 90% of the final corpus, comes entirely from compounding.</p>
                    </section>

                    {/* 3 */}
                    <section style={sec}>
                      <h2 id="power-of-compounding" style={h2}>The Power of Compounding</h2>
                      <p style={p}>Compounding means your returns start earning returns of their own, on top of your original contributions. This creates a snowball effect where growth accelerates the longer you stay invested.</p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>Rs 10,000 monthly investment at 12% p.a., contribution vs returns split by year</caption>
                          <thead>
                            <tr>
                              <th scope="col" style={thS}>Year</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' }}>Total Invested</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' }}>Total Returns</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' }}>Corpus</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' }}>Returns Share</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              [5, '6,00,000', '2,24,864', '8,24,864', '27%'],
                              [10, '12,00,000', '11,23,391', '23,23,391', '48%'],
                              [15, '18,00,000', '32,45,760', '50,45,760', '64%'],
                              [20, '24,00,000', '75,91,479', '99,91,479', '76%'],
                              [25, '30,00,000', '1,59,76,351', '1,89,76,351', '84%'],
                              [30, '36,00,000', '3,16,99,138', '3,52,99,138', '90%'],
                            ].map(([yr, inv, ret, tot, pct], i) => (
                              <tr key={yr} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{yr}</td>
                                <td style={tdR}>Rs {inv}</td>
                                <td style={tdR}>Rs {ret}</td>
                                <td style={{ ...tdR, fontWeight: 700 }}>Rs {tot}</td>
                                <td style={tdR}>{pct}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>By year 30, returns make up 90% of the final corpus. This is why starting early matters more than the exact amount you invest: an extra 5-10 years in the market outweighs almost any increase in monthly contribution.</p>
                    </section>

                    {/* 4 */}
                    <section style={sec}>
                      <h2 id="cagr-vs-wealth-growth" style={h2}>CAGR vs Wealth Growth: What Is the Difference?</h2>
                      <p style={p}>CAGR (Compound Annual Growth Rate) measures the annualised growth rate of a single lumpsum between two points in time. Wealth growth, as calculated here, measures the final corpus from a combination of a lumpsum and ongoing monthly contributions.</p>
                      <p style={p}>CAGR answers "what rate did my investment grow at," while a wealth growth calculator answers "how much will my regular investing habit be worth." If you already know a fund&apos;s CAGR, plug that rate directly into the return rate slider above to project your own contributions at that pace.</p>
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: 200 }}>
                          <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>CAGR Calculator</p>
                          <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Work out the exact annualised return rate for an existing investment before projecting it forward here.</p>
                        </div>
                        <Link className="fx-btn" href="/calculators/cagr-calculator" target="_blank" rel="noopener noreferrer"
                          style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                      </div>
                    </section>

                    {/* 5 */}
                    <section style={sec}>
                      <h2 id="corpus-per-1000" style={h2}>Wealth Growth Per Rs 1,000 Invested Monthly</h2>
                      <p style={p}>The table below shows the corpus built from investing Rs 1,000 every month at a 12% annual return, across different time horizons. Multiply the figure by the number of thousands you invest monthly to estimate your own corpus.</p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>Corpus built from Rs 1,000 invested monthly at 12% p.a., reducing to a lump figure for scaling</caption>
                          <thead>
                            <tr>
                              <th scope="col" style={thS}>Tenure</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' }}>Corpus (per Rs 1,000/mo)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['5 years', '82,486'], ['10 years', '2,32,339'], ['15 years', '5,04,576'],
                              ['20 years', '9,99,148'], ['25 years', '18,97,635'], ['30 years', '35,29,914'],
                            ].map(([tenure, val], i) => (
                              <tr key={tenure} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{tenure}</td>
                                <td style={tdR}>Rs {val}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>Example: for a Rs 25,000 monthly SIP over 20 years, multiply 25 x Rs 9,99,148 = approximately Rs 2.5 crore, close to the calculator&apos;s exact figure of Rs 2.5 crore at the same inputs.</p>
                    </section>

                    {/* 6 */}
                    <section style={sec}>
                      <h2 id="existing-wealth-impact" style={h2}>Impact of Existing Wealth on Your Corpus</h2>
                      <p style={p}>Existing wealth compounds on its own from day one, independent of any new monthly investment, which is why it has an outsized effect on your final corpus.</p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>Effect of existing wealth on a 20-year projection at 12% p.a.</caption>
                          <thead>
                            <tr>
                              <th scope="col" style={thS}>Scenario</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' }}>Corpus After 20 Years</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['Rs 10,000/month SIP only, no existing wealth', '99,91,479'],
                              ['Rs 5 lakh existing wealth only, no SIP', '54,46,277'],
                              ['Rs 10 lakh existing wealth only, no SIP', '1,08,92,554'],
                              ['Rs 10,000/month SIP + Rs 5 lakh existing wealth', '1,54,37,756'],
                            ].map(([label, val], i) => (
                              <tr key={label} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{label}</td>
                                <td style={tdR}>Rs {val}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>Adding Rs 5 lakh of existing wealth to the same SIP does not just add Rs 54.46 lakh (what it would earn alone), it adds Rs 54.46 lakh to a base that is already compounding, which is exactly what the combined scenario shows.</p>
                    </section>

                    {/* 7 */}
                    <section style={sec}>
                      <h2 id="returns-by-fund-category" style={h2}>Historical Returns by Mutual Fund Category</h2>
                      <p style={p}>Different equity mutual fund categories carry different risk and return profiles. Use these as broad planning ranges, not guarantees, since actual fund performance (including specific funds like those from Nippon India, HDFC, Axis, SBI, or Kotak) varies by scheme and time period.</p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>Typical long-term (10yr+) return ranges by equity mutual fund category</caption>
                          <thead>
                            <tr>
                              <th scope="col" style={thS}>Category</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' }}>Typical CAGR Range</th>
                              <th scope="col" style={thS}>Risk Level</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['Large cap funds', '10-13%', 'Moderate'],
                              ['Flexi cap / multi cap funds', '11-14%', 'Moderate to High'],
                              ['Large and mid cap funds', '11-14%', 'Moderate to High'],
                              ['Mid cap funds', '12-16%', 'High'],
                              ['Small cap funds', '13-18%', 'Very High'],
                              ['Balanced advantage / hybrid funds', '8-11%', 'Low to Moderate'],
                            ].map(([cat, range, risk], i) => (
                              <tr key={cat} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{cat}</td>
                                <td style={tdR}>{range}</td>
                                <td style={tdL}>{risk}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>Small and mid cap categories carry higher return potential alongside sharper drawdowns in falling markets. A common approach is to check a fund&apos;s actual 10-year rolling CAGR using the <Link href="/calculators/cagr-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>CAGR Calculator</Link>, then use that verified rate here instead of a category-wide assumption.</p>
                    </section>

                    {/* 8 */}
                    <section style={sec}>
                      <h2 id="sip-vs-stepup-vs-lumpsum" style={h2}>SIP vs Step-Up SIP vs Lumpsum: Which Grows Wealth Faster?</h2>
                      <p style={p}>A step-up SIP, where you increase your monthly investment by a fixed percentage every year, builds noticeably more wealth than a flat SIP of the same starting amount, since your later, higher contributions still get decades to compound.</p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>Rs 10,000 monthly starting investment, 20 years, 12% p.a., by strategy</caption>
                          <thead>
                            <tr>
                              <th scope="col" style={thS}>Strategy</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' }}>Corpus After 20 Years</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['Flat SIP, Rs 10,000/month, no increase', '99,91,479'],
                              ['Step-up SIP, Rs 10,000/month, +10% every year', '1,98,88,715'],
                              ['One-time lumpsum of Rs 24 lakh (equal to 20yr of flat SIP)', '2,61,42,129'],
                            ].map(([label, val], i) => (
                              <tr key={label} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{label}</td>
                                <td style={tdR}>Rs {val}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>The lumpsum wins here only because the entire amount gets 20 years to compound at once, which is rarely realistic for someone building wealth from salary income. Between the two realistic options, a step-up SIP nearly doubles the flat SIP&apos;s outcome for the same starting contribution. Use the <Link href="/calculators/lumpsum-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Lumpsum Calculator</Link> if you are investing a one-time amount instead.</p>
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: 200 }}>
                          <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Step-Up SIP Calculator</p>
                          <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Model your own annual step-up percentage and see the exact corpus difference versus a flat SIP.</p>
                        </div>
                        <Link className="fx-btn" href="/calculators/step-up-sip-calculator" target="_blank" rel="noopener noreferrer"
                          style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                      </div>
                    </section>

                    {/* 9 */}
                    <section style={sec}>
                      <h2 id="rule-of-72" style={h2}>Rule of 72: Quick Way to Estimate Doubling Time</h2>
                      <p style={p}>The Rule of 72 is a shortcut that estimates how many years it takes an investment to double at a given annual rate: divide 72 by the rate. It is accurate within a few months for rates between 6% and 20%.</p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>Doubling time by annual return rate, using the Rule of 72</caption>
                          <thead>
                            <tr>
                              <th scope="col" style={{ ...thS, textAlign: 'right' }}>Annual Rate</th>
                              <th scope="col" style={{ ...thS, textAlign: 'right' }}>Years to Double</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['6%', '12.0'], ['8%', '9.0'], ['10%', '7.2'], ['12%', '6.0'],
                              ['15%', '4.8'], ['18%', '4.0'], ['20%', '3.6'],
                            ].map(([rate, yrs], i) => (
                              <tr key={rate} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ ...tdR, textAlign: 'right' }}>{rate}</td>
                                <td style={tdR}>{yrs} years</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>At a 12% return, Rs 10 lakh doubles to Rs 20 lakh in roughly 6 years, then doubles again to Rs 40 lakh in the next 6, which is the same compounding effect the year-by-year table above shows in full detail.</p>
                    </section>

                    {/* 10 */}
                    <section style={sec}>
                      <h2 id="real-return" style={h2}>Real (Inflation-Adjusted) Wealth Growth</h2>
                      <p style={p}>The corpus shown by this calculator is in nominal rupees, not adjusted for inflation. Since prices rise over time, the real purchasing power of your final corpus is lower than the headline number.</p>
                      <p style={p}>At 12% nominal returns and 6% average inflation, a 20-year, Rs 10,000-a-month SIP builds a nominal corpus of Rs 99.91 lakh, but its purchasing power in today&apos;s rupees is closer to Rs 44.60 lakh. Use the <Link href="/calculators/real-return-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Real Return Calculator</Link> to convert any nominal projection here into today&apos;s purchasing power for your own inflation assumption.</p>
                    </section>

                    {/* 11 */}
                    <section style={sec}>
                      <h2 id="tax-efficiency" style={h2}>Tax Efficiency and Wealth Growth</h2>
                      <p style={p}>Taxes on withdrawal reduce your effective corpus, so factor them in when comparing wealth growth across investment types.</p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>Tax treatment of common wealth-building instruments, FY 2025-26</caption>
                          <thead>
                            <tr>
                              <th scope="col" style={thS}>Instrument</th>
                              <th scope="col" style={thS}>Tax on Gains</th>
                              <th scope="col" style={thS}>80C Benefit</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['Equity mutual funds (held over 1 year)', 'LTCG: 12.5% above Rs 1.25L/year', 'No'],
                              ['ELSS (equity-linked savings scheme)', 'LTCG: 12.5% above Rs 1.25L/year', 'Yes, up to Rs 1.5L (old regime)'],
                              ['Debt mutual funds', 'Taxed at income slab rate', 'No'],
                              ['PPF', 'Fully tax-free (EEE)', 'Yes, up to Rs 1.5L (old regime)'],
                            ].map(([inst, tax, benefit], i) => (
                              <tr key={inst} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{inst}</td>
                                <td style={tdL}>{tax}</td>
                                <td style={tdL}>{benefit}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>ELSS is the only equity mutual fund category that combines Section 80C deduction with equity-level growth potential, though it comes with a mandatory 3-year lock-in. Use the <Link href="/calculators/elss-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>ELSS Calculator</Link> to see how the tax saving changes your effective return.</p>
                    </section>

                    {/* 12 */}
                    <section style={sec}>
                      <h2 id="diy-vs-wealth-management" style={h2}>DIY Wealth Growth vs Professional Wealth Management</h2>
                      <p style={p}>This calculator gives you the maths, but a wealth management firm or financial advisor adds portfolio construction, tax planning, and behavioural discipline around it, which is worth paying for once your portfolio grows complex enough to need active oversight.</p>
                      <p style={p}>Wealth management services typically charge 0.5-2% of assets managed annually, or a flat advisory fee, and make the most sense once your investable corpus crosses roughly Rs 25-50 lakh, or when you are juggling multiple goals (retirement, a child&apos;s education, a home purchase) that need coordinated planning. Below that, a well-chosen SIP into a diversified fund, reviewed once or twice a year, captures most of the same growth without the fee drag.</p>
                    </section>

                    {/* 13 */}
                    <section style={sec}>
                      <h2 id="common-mistakes" style={h2}>Common Mistakes That Slow Wealth Growth</h2>
                      <ol style={{ margin: '0 0 16px', paddingLeft: 22, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Stopping SIPs during a market fall:</strong> Pausing investments during a downturn locks in lower unit purchases and breaks the averaging effect that SIPs are built for.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Never increasing the SIP amount:</strong> A flat SIP ignores rising income. A 10% annual step-up on the same starting amount nearly doubled the 20-year corpus in the comparison above.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Chasing last year&apos;s best-performing fund:</strong> Category leadership rotates. A fund&apos;s trailing 1-year return says little about its next 10.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Ignoring taxes and inflation:</strong> A headline corpus figure overstates what you can actually spend once LTCG tax and inflation are accounted for.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Withdrawing early:</strong> Since returns only overtake contributions after roughly a decade at typical equity rates, withdrawing in years 1-10 sacrifices most of the compounding benefit still to come.
                        </li>
                      </ol>
                    </section>

                    {/* 14 */}
                    <section style={sec}>
                      <h2 id="how-to-use" style={h2}>How to Use This Wealth Growth Calculator</h2>
                      <ol style={{ margin: '0 0 16px', paddingLeft: 22, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Monthly Investment:</strong> Enter how much you invest every month, or plan to invest.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Expected Return:</strong> Set the annual return rate. Use 10-13% for large cap equity, 12-16% for mid/small cap, or a fund&apos;s actual CAGR if you have checked it.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Investment Period:</strong> Set how many years you plan to stay invested.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Existing Wealth:</strong> Enter any lumpsum you already hold that will keep compounding alongside your new contributions.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Year-by-Year Growth:</strong> Click to expand the bar chart and table showing exactly when your returns overtake your contributions.
                        </li>
                      </ol>
                    </section>

                    

                    {/* 15: FAQ */}
                    <section style={sec}>
                      <h2 id="faqs" style={h2}>Frequently Asked Questions</h2>
                      <FAQ faqs={faqs} />
                    </section>

                    {/* Disclaimer */}
                    <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                        <strong>Disclaimer:</strong> All calculations on this page are indicative only and based on the inputs provided. Wealth growth projections assume a constant annual return, which real investments do not deliver; actual mutual fund and market returns vary year to year and can be negative in some years. Category return ranges cited are historical averages and are not a promise of future performance. Tax figures are based on Income Tax Act provisions as of FY 2025-26 and are for general awareness only. This tool is for educational and planning purposes and does not constitute investment advice. Consult a SEBI-registered investment adviser before making investment decisions. 
                      </p>
                    </div>
                  </>
                );
              })()}
            </article>

          </div>

          <style>{`
            .wg-sidebar::-webkit-scrollbar { width: 5px; }
            .wg-sidebar::-webkit-scrollbar-track { background: transparent; }
            .wg-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .wg-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            className="wg-sidebar"
            style={{
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
              <WealthSnapshot />
              <SidebarList title="Popular Calculators" items={POPULAR} />
              <SidebarList title="More Calculators" items={MORE} />
              <RelatedReads />
            </nav>
          </aside>

        </div>
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

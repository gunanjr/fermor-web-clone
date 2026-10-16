'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect, useRef } from 'react';
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
  dark: '#101214', lime: '#a6dbc4', lime2: '#2d9970', paleLime: '#f4f5f6',
  ink: '#16140F', ink2: '#50565c', ink3: '#7a8087', white: '#ffffff',
  bg: '#f6f7f8', border: '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

interface YearRow { year: number; age: number; opening: number; contribution: number; returns: number; closing: number }

/* Monthly-compounding SIP + lumpsum projection (matches VPF calculator's schedule method).
   Previous version used a simplified annual approximation (corpus*r + yearlyContrib*(r/2))
   which understates the true corpus, same bug class documented for wealth-growth-calculator. */
function buildProjection(
  yearsToEdu: number, childAge: number, monthlySIP: number,
  existingCorpus: number, returnRate: number
): YearRow[] {
  if (yearsToEdu <= 0) return [];
  const rows: YearRow[] = [];
  let corpus = existingCorpus;
  const monthlyRate = returnRate / 100 / 12;
  const startYear = new Date().getFullYear();
  for (let i = 0; i < yearsToEdu; i++) {
    const age = childAge + i;
    const opening = corpus;
    let yearContrib = 0;
    let yearReturns = 0;
    for (let m = 0; m < 12; m++) {
      corpus += monthlySIP;
      yearContrib += monthlySIP;
      const interest = corpus * monthlyRate;
      corpus += interest;
      yearReturns += interest;
    }
    rows.push({
      year: startYear + i,
      age,
      opening: Math.round(opening),
      contribution: Math.round(yearContrib),
      returns: Math.round(yearReturns),
      closing: Math.round(corpus),
    });
  }
  return rows;
}

function DonutChart({ contributions, returns, fmt }: { contributions: number; returns: number; fmt: (n: number) => string }) {
  const total = contributions + returns;
  if (total === 0) return null;
  const [hovered, setHovered] = useState<'contrib' | 'returns' | null>(null);
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const contribArc = (contributions / total) * circ;
  const pPct = Math.round((contributions / total) * 100);
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Contributions ${pPct}% of projected corpus, returns ${100 - pPct}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw}
        onMouseEnter={() => setHovered('returns')}
        onMouseLeave={() => setHovered(null)}
        cursor="pointer" />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${contribArc} ${circ - contribArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }}
        onMouseEnter={() => setHovered('contrib')}
        onMouseLeave={() => setHovered(null)}
        cursor="pointer" />
      {hovered === 'contrib' ? (
        <>
          <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 10, fill: C.ink3, fontFamily: INTER }}>Contributions</text>
          <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 20, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{fmt(contributions)}</text>
        </>
      ) : hovered === 'returns' ? (
        <>
          <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 10, fill: C.ink3, fontFamily: INTER }}>Returns</text>
          <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 20, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{fmt(returns)}</text>
        </>
      ) : (
        <>
          <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Contributions</text>
          <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
        </>
      )}
    </svg>
  );
}

function BarChart({ rows, hoveredBar, setHoveredBar }: { rows: YearRow[]; hoveredBar: number | null; setHoveredBar: (v: number | null) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [chartW, setChartW] = useState(600);
  useEffect(() => {
    const update = () => { if (ref.current) setChartW(ref.current.clientWidth); };
    update();
    const obs = new ResizeObserver(update);
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  if (rows.length === 0 || chartW < 50) return null;
  const maxVal = Math.max(...rows.map(r => r.closing));
  const h = 280, padL = 50, padR = 20, padT = 24, padB = 40;
  const barW = Math.max(6, Math.min(28, (chartW - padL - padR - 8) / rows.length - 4));
  const scale = (v: number) => padT + (h - padT - padB) * (1 - v / maxVal);
  const fmtY = (n: number) => n >= 1e7 ? `${(n / 1e7).toFixed(1)}Cr` : n >= 1e5 ? `${(n / 1e5).toFixed(1)}L` : `${Math.round(n / 1e3)}K`;
  const fmtV = (n: number) => n >= 1e7 ? `₹${(n / 1e7).toFixed(2)} Cr` : n >= 1e5 ? `₹${(n / 1e5).toFixed(2)} L` : `₹${Math.round(n).toLocaleString('en-IN')}`;
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(f => Math.round(f * maxVal));
  return (
    <div ref={ref} style={{ width: '100%', overflowX: 'auto', position: 'relative' }}>
      <svg width={chartW} height={h + 20} viewBox={`0 0 ${chartW} ${h + 20}`} style={{ display: 'block', fontFamily: INTER }}>
        {yTicks.map(y => (
          <g key={y}>
            <line x1={padL} y1={scale(y)} x2={chartW - padR} y2={scale(y)} stroke={C.border} strokeWidth={1} />
            <text x={padL - 6} y={scale(y) + 4} textAnchor="end" style={{ fontSize: 9, fill: C.ink3 }}>{fmtY(y)}</text>
          </g>
        ))}
        {rows.map((r, i) => {
          const x = padL + i * (barW + 4);
          const barH = Math.max(1, scale(0) - scale(r.closing));
          const isHovered = hoveredBar === i;
          return (
            <g key={i}>
              {isHovered && (
                <rect x={x - 4} y={scale(r.closing) - 22} width={barW + 8} height={18} rx={3} fill={C.dark} />
              )}
              {isHovered && (
                <text x={x + barW / 2} y={scale(r.closing) - 8} textAnchor="middle" style={{ fontSize: 9, fontWeight: 700, fill: '#fff' }}>{fmtV(r.closing)}</text>
              )}
              <rect x={x} y={scale(r.closing)} width={barW} height={barH}
                fill={isHovered ? C.lime : C.dark} rx={2}
                style={{ transition: 'all 0.2s ease', cursor: 'pointer' }}
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)} />
              {rows.length <= 20 && (
                <text x={x + barW / 2} y={h - padB + 16} textAnchor="middle"
                  style={{ fontSize: 9, fill: isHovered ? C.dark : C.ink3, fontWeight: isHovered ? 700 : 400 }}>{r.age}</text>
              )}
            </g>
          );
        })}
        {rows.length <= 20 && <text x={padL + rows.length * (barW + 4) / 2} y={h + 18} textAnchor="middle" style={{ fontSize: 10, fill: C.ink3, fontWeight: 600 }}>Age</text>}
      </svg>
    </div>
  );
}

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

function EducationSnapshot() {
  const rows = [
    { label: 'Education inflation (planning est.)', value: '10-12%' },
    { label: 'Typical equity SIP return (10y+)', value: '10-12%' },
    { label: 'Sukanya Samriddhi Yojana rate', value: '8.2%' },
    { label: 'Section 80E loan interest cap', value: 'None (8 yrs)' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Education Quick Facts</span>
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

const POPULAR = [
  { href: '/calculators/sip-calculator', label: 'SIP Calculator' },
  { href: '/calculators/education-corpus-calculator', label: 'Education Corpus Calculator' },
  { href: '/calculators/ssy-calculator', label: 'Sukanya Samriddhi Yojana' },
  { href: '/calculators/goal-planning-calculator', label: 'Goal Planning Calculator' },
  { href: '/calculators/lumpsum-calculator', label: 'Lumpsum Calculator' },
];
const MORE = [
  { href: '/calculators/future-value-calculator', label: 'Future Value Calculator' },
  { href: '/calculators/wealth-growth-calculator', label: 'Wealth Growth Calculator' },
  { href: '/calculators/retirement-corpus-calculator', label: 'Retirement Corpus Calculator' },
  { href: '/calculators/compound-interest-calculator', label: 'Compound Interest Calculator' },
];


function FAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  return <FAQBox items={faqs} />;
}

export default function ChildEducationPlannerClient({ faqs }: { faqs: { q: string; a: string }[] }) {
  const defaultSettings: { childAge: number; eduStartAge: number; currentCost: number; eduInflation: number; existingCorpus: number; returnRate: number; monthlySIP: number; showAdvanced: boolean; showTable: boolean; hoveredBar: number | null } =
    { childAge: 5, eduStartAge: 18, currentCost: 500000, eduInflation: 10, existingCorpus: 0, returnRate: 12, monthlySIP: 5000, showAdvanced: false, showTable: false, hoveredBar: null };
  const { settings, updateSettings } = useCalculatorSettings('child-education-planner-calculator', defaultSettings);
  const { childAge, eduStartAge, currentCost, eduInflation, existingCorpus, returnRate, monthlySIP, showAdvanced, showTable, hoveredBar } = settings;
  const setChildAge = (v: number) => updateSettings({ childAge: v });
  const setEduStartAge = (v: number) => updateSettings({ eduStartAge: v });
  const setCurrentCost = (v: number) => updateSettings({ currentCost: v });
  const setEduInflation = (v: number) => updateSettings({ eduInflation: v });
  const setExistingCorpus = (v: number) => updateSettings({ existingCorpus: v });
  const setReturnRate = (v: number) => updateSettings({ returnRate: v });
  const setMonthlySIP = (v: number) => updateSettings({ monthlySIP: v });
  const setShowAdvanced = (v: boolean) => updateSettings({ showAdvanced: v });
  const setShowTable = (v: boolean) => updateSettings({ showTable: v });
  const setHoveredBar = (v: number | null) => updateSettings({ hoveredBar: v });

  const [mobile, setMobile] = useState(false);
  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  const yearsToEdu = Math.max(0, eduStartAge - childAge);
  const futureCost = currentCost * Math.pow(1 + eduInflation / 100, yearsToEdu);

  const rows = useMemo(() =>
    buildProjection(yearsToEdu, childAge, monthlySIP, existingCorpus, returnRate),
    [yearsToEdu, childAge, monthlySIP, existingCorpus, returnRate]
  );

  const projectedCorpus = rows.length > 0 ? rows[rows.length - 1].closing : existingCorpus;
  const totalContributions = rows.reduce((s, r) => s + r.contribution, 0) + existingCorpus;
  const totalReturns = projectedCorpus - totalContributions;
  const shortfall = Math.max(0, futureCost - projectedCorpus);
  const goalStatus = projectedCorpus >= futureCost ? 'on_track' : 'shortfall';
  const contribPct = projectedCorpus > 0 ? Math.round((totalContributions / projectedCorpus) * 100) : 0;
  const returnsPct = 100 - contribPct;

  const rM = returnRate / 100 / 12;
  const nMonths = yearsToEdu * 12;
  const additionalSIP = rM > 0 && nMonths > 0 && shortfall > 0
    ? Math.round(shortfall * rM / (Math.pow(1 + rM, nMonths) - 1) / (1 + rM))
    : 0;

  const fmt = (n: number) => fmtC(n);

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <style>{`
        .child-edu-sidebar::-webkit-scrollbar { width: 5px; }
        .child-edu-sidebar::-webkit-scrollbar-track { background: transparent; }
        .child-edu-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .child-edu-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
      `}</style>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Child Education Planner Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Plan your monthly SIP investments to reach your child&rsquo;s education corpus goal. See how much you need to save and whether you&rsquo;re on track.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>

          <div style={{ minWidth: 0 }}>

            <section aria-label="Child Education Planner Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{showAdvanced ? 'Savings & Returns' : 'Child Details'}</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider label="Child's Current Age" id="cep-age" value={childAge} min={2} max={17} step={1} fmt={v => `${v} yr`} onChange={setChildAge} compact={mobile} />
                      <Slider label="Education Start Age" id="cep-start" value={eduStartAge} min={childAge + 1} max={25} step={1} fmt={v => `${v} yr`} onChange={setEduStartAge} compact={mobile} />
                      <Slider label="Current Education Cost" id="cep-cost" value={currentCost} min={50000} max={5000000} step={25000} fmt={fmtC} onChange={setCurrentCost} compact={mobile} />
                      <Slider label="Education Inflation" id="cep-inflation" value={eduInflation} min={5} max={18} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={setEduInflation} compact={mobile} />
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
                        <button onClick={() => setShowAdvanced(true)}
                          style={{ fontSize: 12, fontWeight: 700, color: C.ink2, background: 'none', border: `1px solid ${C.border}`, borderRadius: 7, padding: '6px 14px', cursor: 'pointer', fontFamily: INTER, display: 'flex', alignItems: 'center', gap: 5 }}>
                          Savings &amp; returns
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Slider label="Existing Corpus" id="cep-existing" value={existingCorpus} min={0} max={5000000} step={25000} fmt={fmtC} onChange={setExistingCorpus} compact={mobile} />
                      <Slider label="Expected Return (p.a.)" id="cep-return" value={returnRate} min={6} max={18} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={setReturnRate} compact={mobile} />
                      <Slider label="Monthly SIP Investment" id="cep-sip" value={monthlySIP} min={500} max={200000} step={500} fmt={fmtC} onChange={setMonthlySIP} compact={mobile} />
                      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 6 }}>
                        <button onClick={() => setShowAdvanced(false)}
                          style={{ fontSize: 12, fontWeight: 700, color: C.ink2, background: 'none', border: `1px solid ${C.border}`, borderRadius: 7, padding: '6px 14px', cursor: 'pointer', fontFamily: INTER, display: 'flex', alignItems: 'center', gap: 5 }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
                          Back
                        </button>
                      </div>
                    </>
                  )}
                </div>

                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Future Education Cost</span>
                    <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                      aria-live="polite" aria-label={`Future education cost: ${fmtC(futureCost)}`}>
                      {fmtC(futureCost)}
                    </span>
                  </div>

                  {goalStatus === 'shortfall' && shortfall > 0 && (
                    <div style={{ width: '100%', background: '#FFF4E5', border: '1px solid #FFD699', borderRadius: 10, padding: mobile ? '10px 14px' : '12px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 4 }}>
                      <span style={{ fontSize: mobile ? 12 : 13, color: '#8B5F00' }}>Shortfall of {fmtC(shortfall)}</span>
                      <span style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: '#CC7A00' }}>Additional {fmtC(additionalSIP)}/mo</span>
                    </div>
                  )}

                  {goalStatus === 'on_track' && projectedCorpus > 0 && (
                    <div style={{ width: '100%', background: '#f4f5f6', border: `1px solid ${C.lime2}`, borderRadius: 10, padding: mobile ? '10px 14px' : '12px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 4 }}>
                      <span style={{ fontSize: mobile ? 12 : 13, color: '#1f7a58' }}>On track</span>
                      <span style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: '#1f7a58' }}>+{fmtC(projectedCorpus - futureCost)} surplus</span>
                    </div>
                  )}

                  {[
                    { label: 'Projected Corpus', value: fmt(projectedCorpus) },
                    { label: 'Monthly SIP', value: fmtC(monthlySIP) },
                    { label: 'Existing Corpus', value: fmtC(existingCorpus) },
                    { label: 'Years to Education', value: `${yearsToEdu} yr` },
                    { label: 'Total Contributions', value: fmt(totalContributions) },
                    { label: 'Total Returns', value: fmt(totalReturns) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    <DonutChart contributions={totalContributions} returns={totalReturns} fmt={fmt} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Contributions {contribPct}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Returns {returnsPct}%</span>
                    </div>
                  </div>

                  <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Contributions {contribPct}%</span>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Returns {returnsPct}%</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`Contributions are ${contribPct}% of projected corpus`}>
                      <div style={{ height: '100%', width: `${contribPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>
                </div>

              </div>

              {rows.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowTable(!showTable)}
                    aria-expanded={showTable} aria-controls="cep-growth-table"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Year-by-Year Growth</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>({rows.length} years)</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {fmt(projectedCorpus)}
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showTable && (
                    <div id="cep-growth-table" style={{ borderTop: `1px solid ${C.border}` }}>
                      <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                        <BarChart rows={rows} hoveredBar={hoveredBar} setHoveredBar={setHoveredBar} />
                      </div>
                      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
                        <table style={{ minWidth: 600, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              {['Year', 'Age', 'Opening Corpus', 'Yearly Contribution', 'Returns Earned', 'Closing Corpus'].map(h => (
                                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }} scope="col">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {rows.map((row, i) => (
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
                    </div>
                  )}
                </div>
              )}
            </section>

            <div style={{ marginBottom: 32 }}><SaveResultsCard mobile={mobile} /></div>


            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 id="what-is-child-education-plan" style={h2}>What Is a Child Education Plan?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    A child education plan is the process of calculating the future cost of your child&rsquo;s higher education and systematically investing to reach that goal. Because education costs rise at 10-12% per year in India, a course costing <strong>{fmtC(currentCost)}</strong> today could cost <strong>{fmtC(futureCost)}</strong> by the time your child is ready.
                  </p>
                </div>
                <p style={p}>
                  This calculator shows both the target corpus needed and whether your current monthly SIP of <strong>{fmtC(monthlySIP)}</strong> is enough to reach it. If there is a shortfall, it tells you exactly how much additional you need to invest each month to bridge the gap.
                </p>
              </div>

              <div style={sec}>
                <h2 id="how-to-plan-education-costs" style={h2}>How to Plan for Education Costs: Three Steps</h2>
                <ol style={{ paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, margin: 0, listStyleType: 'decimal' }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Estimate the future cost:</strong> take the current cost of the course your child is likely to pursue and apply the expected education inflation rate over the years until they start. This calculator does this automatically using Future Cost = Current Cost x (1 + Inflation)<sup>Years</sup>.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Calculate the required monthly investment:</strong> based on the target corpus, existing savings, years available, and expected return, adjust the monthly SIP slider until the projected corpus matches or exceeds the future education cost.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Choose appropriate investment vehicles:</strong> for horizons of 10+ years, invest in equity-oriented mutual funds via SIP for growth. As the goal approaches within 3-5 years, gradually shift to debt funds or fixed deposits to protect the corpus from market volatility.
                  </li>
                </ol>
              </div>

              <div style={sec}>
                <h2 id="sip-formula-education" style={h2}>The SIP Growth Formula Behind This Calculator</h2>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark }}>
                    Monthly Compounding: Corpus += Monthly SIP, then Corpus += Corpus x (Annual Return / 12 / 100)
                  </code>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  This calculator compounds monthly rather than using a flat annual approximation, matching how mutual fund NAVs actually accrue returns. A monthly SIP of Rs 10,000 for 13 years at 12% grows to approximately {fmtIN(10000 * ((Math.pow(1 + 0.12 / 12, 13 * 12) - 1) / (0.12 / 12)) * (1 + 0.12 / 12))}, of which roughly {Math.round((1 - (10000 * 13 * 12) / (10000 * ((Math.pow(1 + 0.12 / 12, 13 * 12) - 1) / (0.12 / 12)) * (1 + 0.12 / 12))) * 100)}% is investment growth, not principal.
                </p>
              </div>

              <div style={sec}>
                <h2 id="insurance-vs-mutual-fund-education" style={h2}>Should You Use Insurance Plans for Education Savings?</h2>
                <p style={p}>
                  Generally, no. Child education insurance plans combine insurance with investment, but typically invest in debt instruments and charge high commissions, resulting in net returns of just 5-7%.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  A separate <Link href="/calculators/term-insurance-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>term insurance</Link> plan for protection, combined with an equity mutual fund SIP for growth, gives both adequate life cover and higher corpus growth than a bundled plan, an approach often called &ldquo;buy term, invest the rest.&rdquo;
                </p>
              </div>

              <div style={sec}>
                <h2 id="ssy-for-girl-child" style={h2}>Sukanya Samriddhi Yojana for a Girl Child</h2>
                <p style={p}>
                  For a girl child under 10, Sukanya Samriddhi Yojana currently pays 8.2% per annum, tax-free and government-backed, with Section 80C benefit on contributions. Up to 50% of the balance can be withdrawn once she turns 18 or completes class 10, specifically for education.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Use the <Link href="/calculators/ssy-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Sukanya Samriddhi Yojana Calculator</Link> alongside this planner. SSY works well as the guaranteed, lower-risk portion of a broader education corpus, with an equity SIP covering the rest.
                </p>
              </div>

              <div style={sec}>
                <h2 id="section-80e-loan-bridge" style={h2}>Bridging a Shortfall With an Education Loan</h2>
                <p style={p}>
                  If the shortfall shown above is large, an education loan can cover the gap. Under Section 80E, the entire interest paid is deductible with no upper limit, for up to 8 years from when repayment starts or until the interest is fully paid, whichever comes first.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Many families use a combination: the accumulated corpus covers 60-70% of the cost, with a loan covering the remainder, keeping post-course EMIs manageable. PM-Vidyalaxmi also offers collateral-free loans up to Rs 7.5 lakh at select institutions.
                </p>
              </div>

              <div style={sec}>
                <h2 id="scholarships-education-plan" style={h2}>Can Scholarships Reduce What You Need to Save?</h2>
                <p style={p}>
                  Yes, but be conservative. If your child is likely to qualify for merit-based scholarships, you can reduce the target corpus by the expected amount. It is safer, however, to plan for the full cost and treat any scholarship as a bonus that lowers your actual outlay.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  The National Scholarship Portal lists 140+ central and state scholarship schemes. Check eligibility early since most applications open each June with an October 31 deadline for the academic year.
                </p>
              </div>

              <div style={sec}>
                <h2 id="step-up-sip-education" style={h2}>A Step-Up SIP Closes the Gap With Education Inflation Faster</h2>
                <p style={p}>
                  Yes, meaningfully. A flat Rs 10,000/month SIP at 12% for 20 years grows to roughly Rs 1 crore. The same SIP with a 10% annual step-up, increasing the monthly amount every year in line with a typical salary increment, grows to roughly Rs 2.4 crore, nearly 2.4 times more.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  A step-up SIP is a better match for education planning than a flat SIP, since education costs themselves compound at 10-12% a year. Use the <Link href="/calculators/wealth-growth-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Wealth Growth Calculator</Link> to model a step-up scenario for this same goal.
                </p>
              </div>

              <div style={sec}>
                <h2 id="ltcg-tax-education-corpus" style={h2}>How the Final Corpus Gets Taxed When You Withdraw</h2>
                <p style={p}>
                  Equity mutual fund gains held over 12 months are long-term capital gains, taxed at 12.5% on the amount above a Rs 1.25 lakh annual exemption, per Budget 2024 rules. Gains held under 12 months are short-term and taxed at 20%.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Because the exemption applies per financial year, withdrawing the corpus over 2-3 years around the admission date, rather than all at once, can meaningfully reduce the tax on the final payout compared to a single lump-sum redemption.
                </p>
              </div>

              <div style={sec}>
                <h2 id="minor-child-income-clubbing" style={h2}>If a Grandparent Gifts Money, Whose Income Is It for Tax</h2>
                <p style={p}>
                  A gift itself is not taxed since grandparents are relatives under the Income Tax Act. Any investment income earned on that gifted money, interest, dividends, or capital gains, is clubbed with the income of whichever parent has the higher total income, under Section 64(1A).
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Parents get a small exemption of Rs 1,500 per child per year against this clubbed income. If a large sum is being invested toward this corpus, factor the clubbing rule into which parent&rsquo;s tax slab absorbs the impact.
                </p>
              </div>

              <div style={sec}>
                <h2 id="how-to-use" style={h2}>How to Use This Calculator</h2>
                <ol style={{ paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, margin: 0, listStyleType: 'decimal' }}>
                  {[
                    ['Enter your child\'s current age and education start age', 'this sets the number of years available to invest.'],
                    ['Enter current education cost and inflation rate', 'the calculator projects the future cost automatically.'],
                    ['Click "Savings & returns"', 'to enter existing corpus, expected return, and your planned monthly SIP.'],
                    ['Check the shortfall or surplus banner', 'if there is a shortfall, the calculator shows the additional monthly SIP needed to close it.'],
                    ['Expand "Year-by-Year Growth"', 'to see the full projection table and bar chart of how the corpus builds each year.'],
                  ].map(([label, body], i) => (
                    <li key={i} style={{ fontSize: 15, color: C.ink2, lineHeight: 1.65 }}>
                      <strong style={{ color: C.ink }}>{label}:</strong> {body}
                    </li>
                  ))}
                </ol>
              </div>


              <div style={sec} id="faq">
                <h2 style={h2}>Frequently Asked Questions</h2>
                <FAQ faqs={faqs} />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative estimates based on the inputs you provide and assume constant inflation and return rates over the full horizon. Actual mutual fund returns and fee increases vary by year. This calculator is for educational and planning purposes only and does not constitute financial advice. 
                </p>
              </div>

            </article>
          </div>

          <aside
            className="child-edu-sidebar"
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
            <div style={{ flexShrink: 0 }}><EducationSnapshot /></div>
            <nav aria-label="Popular calculators" style={{ flexShrink: 0 }}>
              <SidebarList title="Popular Calculators" items={POPULAR} />
            </nav>
            <nav aria-label="More calculators" style={{ flexShrink: 0 }}>
              <SidebarList title="More Calculators" items={MORE} />
            </nav>
          </aside>

        </div>
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

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

function buildProjection(
  currentAge: number, retireAge: number, monthlySIP: number,
  existingCorpus: number, returnRate: number, annualIncrement: number
): YearRow[] {
  if (retireAge <= currentAge) return [];
  const rows: YearRow[] = [];
  let corpus = existingCorpus;
  const r = returnRate / 100 / 12;
  for (let age = currentAge; age < retireAge; age++) {
    const yearIndex = age - currentAge;
    const monthlyContrib = monthlySIP * Math.pow(1 + annualIncrement / 100, yearIndex);
    const opening = corpus;
    let contribThisYear = 0;
    for (let m = 0; m < 12; m++) {
      corpus = corpus * (1 + r) + monthlyContrib;
      contribThisYear += monthlyContrib;
    }
    const returnsThisYear = corpus - opening - contribThisYear;
    rows.push({
      year: new Date().getFullYear() + yearIndex,
      age,
      opening: Math.round(opening),
      contribution: Math.round(contribThisYear),
      returns: Math.round(returnsThisYear),
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
  const pArc = (contributions / total) * circ;
  const pPct = Math.round((contributions / total) * 100);
  return (
    <svg role="img" aria-label={`Contributions ${pPct}% of corpus, returns ${100 - pPct}%`}
      width="212" height="212" viewBox="0 0 212 212" style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={hovered === 'returns' ? C.lime : C.lime2} strokeWidth={sw}
        style={{ transition: 'stroke 0.2s ease' }}
        onMouseEnter={() => setHovered('returns')}
        onMouseLeave={() => setHovered(null)}
        cursor="pointer" />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={hovered === 'contrib' ? C.lime : C.dark} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke 0.2s ease, stroke-dasharray 0.4s ease' }}
        onMouseEnter={() => setHovered('contrib')}
        onMouseLeave={() => setHovered(null)}
        cursor="pointer" />
      {hovered === 'contrib' ? (
        <>
          <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Contributions</text>
          <text x={cx} y={cy + 16} textAnchor="middle" style={{ fontSize: 22, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{fmt(contributions)}</text>
        </>
      ) : hovered === 'returns' ? (
        <>
          <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Returns</text>
          <text x={cx} y={cy + 16} textAnchor="middle" style={{ fontSize: 22, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{fmt(returns)}</text>
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
    <div style={{ marginBottom: compact ? 18 : 30 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 16 }}>
        <label style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400 }}>{label}</label>
        {editing ? (
          <input autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 120, outline: 'none', color: C.dark, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            style={{ fontSize: compact ? 13 : 14, fontWeight: 700, color: C.dark, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 16px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 90 : 100, textAlign: 'center' }}>
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


function FAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  return <FAQBox items={faqs} />;
}

export default function PensionCalculatorClient({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [mobile, setMobile] = useState(false);
  const defaultSettings = { currentAge: 30, retireAge: 60, monthlySIP: 10000, existingCorpus: 500000, returnRate: 10, annualIncrement: 10, desiredPension: 50000, annuityRatio: 40, annuityRate: 6, inputStep: 1, showTable: true, hoveredBar: null };
  const { settings, updateSettings } = useCalculatorSettings('pension-calculator', defaultSettings);
  const { currentAge, retireAge, monthlySIP, existingCorpus, returnRate, annualIncrement, desiredPension, annuityRatio, annuityRate, inputStep, showTable, hoveredBar } = settings;
  const setCurrentAge = (v: any) => updateSettings({ currentAge: typeof v === 'function' ? v(settings.currentAge) : v });
  const setRetireAge = (v: any) => updateSettings({ retireAge: typeof v === 'function' ? v(settings.retireAge) : v });
  const setMonthlySIP = (v: any) => updateSettings({ monthlySIP: typeof v === 'function' ? v(settings.monthlySIP) : v });
  const setExistingCorpus = (v: any) => updateSettings({ existingCorpus: typeof v === 'function' ? v(settings.existingCorpus) : v });
  const setReturnRate = (v: any) => updateSettings({ returnRate: typeof v === 'function' ? v(settings.returnRate) : v });
  const setAnnualIncrement = (v: any) => updateSettings({ annualIncrement: typeof v === 'function' ? v(settings.annualIncrement) : v });
  const setDesiredPension = (v: any) => updateSettings({ desiredPension: typeof v === 'function' ? v(settings.desiredPension) : v });
  const setAnnuityRatio = (v: any) => updateSettings({ annuityRatio: typeof v === 'function' ? v(settings.annuityRatio) : v });
  const setAnnuityRate = (v: any) => updateSettings({ annuityRate: typeof v === 'function' ? v(settings.annuityRate) : v });
  const setInputStep = (v: any) => updateSettings({ inputStep: typeof v === 'function' ? v(settings.inputStep) : v });
  const setShowTable = (v: any) => updateSettings({ showTable: typeof v === 'function' ? v(settings.showTable) : v });
  const setHoveredBar = (v: any) => updateSettings({ hoveredBar: typeof v === 'function' ? v(settings.hoveredBar) : v });

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtC = (n: number) => formatCurrency(convertCurrency(n));
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n), true);
  const fmt = (n: number) => {
    if (n >= 1e7) return `${(n / 1e7).toFixed(2)} Cr`;
    if (n >= 1e5) return `${(n / 1e5).toFixed(2)} L`;
    return fmtIN(n);
  };

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const rows = useMemo(() =>
    buildProjection(currentAge, retireAge, monthlySIP, existingCorpus, returnRate, annualIncrement),
    [currentAge, retireAge, monthlySIP, existingCorpus, returnRate, annualIncrement]
  );

  const totalCorpus = rows.length > 0 ? rows[rows.length - 1].closing : 0;
  const totalContributions = rows.reduce((s, r) => s + r.contribution, 0) + existingCorpus;
  const totalReturns = totalCorpus - totalContributions;
  const annuityAmount = totalCorpus * annuityRatio / 100;
  const monthlyPension = Math.round(annuityAmount * annuityRate / 100 / 12);
  const lumpsum = totalCorpus - annuityAmount;
  const pensionDeficit = desiredPension - monthlyPension;
  const contribPct = totalCorpus > 0 ? Math.round((totalContributions / totalCorpus) * 100) : 0;
  const returnsPct = 100 - contribPct;

  const POPULAR = [
    { href: '/calculators/nps-calculator',       label: 'NPS Calculator' },
    { href: '/calculators/epf-calculator',       label: 'EPF Calculator' },
    { href: '/calculators/retirement-calculator', label: 'Retirement Calculator' },
    { href: '/calculators/fire-calculator',      label: 'FIRE Calculator' },
    { href: '/calculators/swp-calculator',       label: 'SWP Calculator' },
    { href: '/calculators/sip-calculator',       label: 'SIP Calculator' },
  ];
  const MORE = [
    { href: '/calculators/ppf-calculator',                  label: 'PPF Calculator' },
    { href: '/calculators/gratuity-calculator',              label: 'Gratuity Calculator' },
    { href: '/calculators/retirement-corpus-calculator',     label: 'Retirement Corpus Calculator' },
    { href: '/calculators/atal-pension-yojana-calculator',   label: 'Atal Pension Yojana Calculator' },
    { href: '/calculators/compound-interest-calculator',     label: 'Compound Interest Calculator' },
  ];

  const inputPad = mobile ? '20px 18px' : '24px 26px';
  const h2 = { fontSize: mobile ? 17 : 19, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const p = { fontSize: 14.5, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' } as React.CSSProperties;
  const sec = { margin: '0 0 36px' } as React.CSSProperties;

  const promoBar = (href: string, title: string, desc: string) => (
    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>{title}</p>
        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>{desc}</p>
      </div>
      <Link className="fx-btn" href={href} target="_blank" rel="noopener noreferrer"
        style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
        Open calculator
      </Link>
    </div>
  );

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>Pension Calculator</h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Project your retirement corpus and monthly pension based on your current savings, monthly contributions, and expected returns.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          <div style={{ minWidth: 0 }}>

            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 20 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                <div style={{
                  padding: inputPad,
                  borderRight: mobile ? 'none' : `1px solid ${C.border}`,
                  borderBottom: mobile ? `1px solid ${C.border}` : 'none',
                  display: 'flex', flexDirection: 'column',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: C.ink3, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                      {inputStep === 1 ? 'YOUR DETAILS' : 'ADVANCED ASSUMPTIONS'}
                    </span>
                    <CurrencySelector theme="light" />
                  </div>

                  {inputStep === 1 && (
                    <>
                      <Slider label="Current Age" value={currentAge} min={18} max={70} step={1}
                        fmt={v => `${v} yr`} onChange={setCurrentAge} compact={mobile} />
                      <Slider label="Retirement Age" value={retireAge} min={currentAge + 1} max={85} step={1}
                        fmt={v => `${v} yr`} onChange={setRetireAge} compact={mobile} />
                      <Slider label="Monthly Investment (SIP)" value={monthlySIP} min={500} max={200000} step={500}
                        fmt={v => fmtIN(v)} onChange={setMonthlySIP} compact={mobile} />
                      <Slider label="Annual Increment in Contributions" value={annualIncrement} min={0} max={30} step={1}
                        fmt={v => `${v}%`} onChange={setAnnualIncrement} compact={mobile} />
                    </>
                  )}

                  {inputStep === 2 && (
                    <>
                      <Slider label="Existing Retirement Corpus" value={existingCorpus} min={0} max={10000000} step={25000}
                        fmt={v => fmtC(v)} onChange={setExistingCorpus} compact={mobile} />
                      <Slider label="Expected Return (p.a.)" value={returnRate} min={1} max={20} step={0.5}
                        fmt={v => `${v.toFixed(1)}%`} onChange={setReturnRate} compact={mobile} />
                      <Slider label="Annuity Ratio" value={annuityRatio} min={20} max={80} step={1}
                        fmt={v => `${v}%`} onChange={setAnnuityRatio} compact={mobile} />
                      <Slider label="Annuity Rate (p.a.)" value={annuityRate} min={4} max={9} step={0.1}
                        fmt={v => `${v.toFixed(1)}%`} onChange={setAnnuityRate} compact={mobile} />
                      <Slider label="Desired Monthly Pension" value={desiredPension} min={5000} max={500000} step={5000}
                        fmt={v => fmtIN(v)} onChange={setDesiredPension} compact={mobile} />
                    </>
                  )}

                  <div style={{ marginTop: 'auto', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${C.border}` }}>
                    {inputStep === 2 ? (
                      <button onClick={() => setInputStep(1)}
                        style={{ fontSize: 12, fontWeight: 600, color: C.ink2, background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, display: 'flex', alignItems: 'center', gap: 5, padding: 0 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
                        Back
                      </button>
                    ) : <span />}
                    {inputStep === 1 ? (
                      <button onClick={() => setInputStep(2)}
                        style={{ fontSize: 12, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: '6px 14px', cursor: 'pointer', fontFamily: INTER, display: 'flex', alignItems: 'center', gap: 5, marginLeft: 'auto' }}>
                        More settings
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
                      </button>
                    ) : (
                      <span style={{ fontSize: 11, color: C.ink3 }}>Adjust assumptions</span>
                    )}
                  </div>
                </div>

                <div style={{ padding: mobile ? '20px 18px' : '24px 26px', display: 'flex', flexDirection: 'column', gap: 11 }}>

                  <div style={{ order: mobile ? 1 : -1, display: 'flex', justifyContent: 'center', paddingBottom: 4 }}>
                    <DonutChart contributions={totalContributions} returns={totalReturns} fmt={fmt} />
                  </div>
                  <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 20, justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Contributions</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Returns</span>
                    </div>
                  </div>

                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Monthly Pension</span>
                    <span aria-live="polite" style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>{fmtIN(monthlyPension)}</span>
                  </div>

                  {pensionDeficit > 0 ? (
                    <div style={{ width: '100%', background: '#FFF4E5', border: '1px solid #FFD8A8', borderRadius: 9, padding: mobile ? '10px 14px' : '12px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: mobile ? 12 : 13, color: '#A15C00' }}>Shortfall vs target</span>
                      <span style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: '#A15C00' }}>-{fmtIN(pensionDeficit)}</span>
                    </div>
                  ) : totalCorpus > 0 && (
                    <div style={{ width: '100%', background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 9, padding: mobile ? '10px 14px' : '12px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: mobile ? 12 : 13, color: C.dark }}>Target achieved</span>
                      <span style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: C.dark }}>+{fmtIN(-pensionDeficit)}</span>
                    </div>
                  )}

                  {[
                    { label: 'Total corpus at retirement', value: fmt(totalCorpus) },
                    { label: 'Lump sum withdrawal', value: fmt(lumpsum) },
                    { label: 'Annuity investment', value: fmt(annuityAmount) },
                    { label: 'Total contributions', value: fmt(totalContributions) },
                    { label: 'Total returns earned', value: fmt(totalReturns) },
                    { label: 'Target monthly pension', value: fmtIN(desiredPension) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: `1px solid ${C.border}` }}>
                      <span style={{ fontSize: 12.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                      <span style={{ fontSize: 11, color: C.ink3 }}>Contributions {contribPct}%</span>
                      <span style={{ fontSize: 11, color: C.ink3 }}>Returns {returnsPct}%</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`Contributions are ${contribPct}% of total corpus`}>
                      <div style={{ height: '100%', width: `${contribPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>
                </div>

              </div>

              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowTable((v: boolean) => !v)}
                  aria-expanded={showTable} aria-controls="pension-growth-table"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '18px 26px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 14 : 14.5, fontWeight: 700, color: C.ink }}>Year-by-Year Growth</span>
                    {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>({rows.length} years)</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 8 : 12, flexShrink: 0 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {fmt(totalCorpus)}
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      aria-hidden="true" style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {showTable && (
                  <div id="pension-growth-table">
                    <div style={{ borderTop: `1px solid ${C.border}`, padding: mobile ? '20px 18px' : '24px 26px' }}>
                      <BarChart rows={rows} hoveredBar={hoveredBar} setHoveredBar={setHoveredBar} />
                    </div>

                    <div style={{ borderTop: `1px solid ${C.border}`, overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead>
                          <tr style={{ background: '#f4f5f6' }}>
                            {['Year', 'Age', 'Opening Corpus', 'Yearly Contribution', 'Returns Earned', 'Closing Corpus'].map(h => (
                              <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row, i) => (
                            <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                              <td style={{ padding: '13px 20px', fontWeight: 700, color: C.dark, whiteSpace: 'nowrap' }}>{row.year}</td>
                              <td style={{ padding: '13px 20px', fontWeight: 600, color: C.ink2, whiteSpace: 'nowrap' }}>{row.age}</td>
                              <td style={{ padding: '13px 20px', color: C.ink2, whiteSpace: 'nowrap' }}>{fmtIN(row.opening)}</td>
                              <td style={{ padding: '13px 20px', color: '#1f7a58', fontWeight: 600, whiteSpace: 'nowrap' }}>{fmtIN(row.contribution)}</td>
                              <td style={{ padding: '13px 20px', color: C.ink2, whiteSpace: 'nowrap' }}>{fmtIN(row.returns)}</td>
                              <td style={{ padding: '13px 20px', fontWeight: 700, color: C.dark, whiteSpace: 'nowrap' }}>{fmtIN(row.closing)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

            </div>

            <div style={{ marginBottom: 32 }}><SaveResultsCard mobile={mobile} /></div>

            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec} id="what-is-pension-calculator">
                <h2 style={h2}>What Is a Pension Calculator?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    A pension calculator estimates the retirement corpus your regular savings will build and the monthly pension that corpus can generate once converted into an annuity.
                  </p>
                </div>
                <p style={p}>
                  Enter your current age, target retirement age, monthly savings, existing corpus, and expected return to see a year-by-year projection.
                </p>
                <p style={p}>
                  The calculator also checks whether your projected pension meets your target, so you know how much to adjust your savings if there is a shortfall.
                </p>
              </div>

              <div style={sec} id="how-it-helps">
                <h2 style={h2}>How This Pension Calculator Helps You</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: 'Corpus projection:', text: 'see your total retirement corpus from monthly savings, existing corpus, and compounding returns.' },
                    { label: 'Monthly pension estimate:', text: 'see the pension your annuity ratio and annuity rate would generate at retirement.' },
                    { label: 'Shortfall check:', text: 'compare the projected pension against your target and see the exact gap in rupees.' },
                    { label: 'Year-by-year detail:', text: 'view the interactive bar chart and table showing how the corpus builds every year.' },
                  ].map((it, i) => (
                    <li key={i} style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.75 }}>
                      <strong style={{ color: C.ink }}>{it.label}</strong> {it.text}
                    </li>
                  ))}
                </ol>
              </div>

              {promoBar('/calculators/nps-calculator', 'NPS Calculator', 'Project your National Pension System corpus separately using NPS-specific contribution rules.')}

              <div style={sec} id="annuity-explained">
                <h2 style={h2}>How the Annuity Split Works</h2>
                <p style={p}>
                  At retirement, a portion of your corpus (the Annuity Ratio slider) is used to buy an annuity, a product that pays a fixed monthly income for life.
                </p>
                <p style={p}>
                  The rest is available as a lump sum. Monthly pension equals the annuity amount multiplied by the annuity rate, divided by 12.
                </p>
                <p style={p}>
                  Annuity rates from Indian providers currently range from roughly 5.7% to 8.1% per annum depending on the plan and your age at purchase, so adjust the Annuity Rate slider to match a quote you have received.
                </p>
              </div>

              <div style={sec} id="nps-2026-rules">
                <h2 style={h2}>The 2026 NPS Withdrawal Rules</h2>
                <p style={p}>
                  PFRDA now allows non-government NPS subscribers to withdraw up to 80% of their corpus as a lump sum, down from the earlier mandatory 40% annuity purchase.
                </p>
                <p style={p}>
                  A minimum of 20% must still be annuitized for corpora above Rs 5 lakh, which is why the Annuity Ratio slider in this calculator goes as low as 20%.
                </p>
                <p style={p}>
                  If your total NPS corpus is Rs 5 lakh or less, PFRDA allows a full lump sum withdrawal with no mandatory annuity at all.
                </p>
              </div>

              <div style={sec} id="taxation">
                <h2 style={h2}>How Your Pension Is Taxed</h2>
                <p style={p}>
                  The lump sum withdrawn from NPS is tax-exempt up to 60% of the corpus under Section 10(12A) of the Income Tax Act.
                </p>
                <p style={p}>
                  Any lump sum taken beyond that 60% (available since the 2026 PFRDA rule change) is taxed at your income slab rate.
                </p>
                <p style={p}>
                  The monthly pension you receive from the annuity itself is fully taxable at your slab rate in the year you receive it, regardless of the exemption on the original withdrawal.
                </p>
              </div>

              {promoBar('/calculators/retirement-corpus-calculator', 'Retirement Corpus Calculator', 'Work backwards from your desired retirement lifestyle to see the total corpus you need.')}

              <div style={sec} id="assumptions">
                <h2 style={h2}>Key Assumptions Explained</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: 'Annuity ratio:', text: 'the share of your corpus converted into an annuity. PFRDA\'s 2026 rules set a 20% regulatory minimum for larger NPS corpora, adjustable up to 80% here.' },
                    { label: 'Annuity rate:', text: 'the annual payout rate on the annuity portion. Current Indian annuity rates run roughly 5.7-8.1% depending on the provider and plan.' },
                    { label: 'Annual increment:', text: 'the yearly percentage increase in your monthly contribution, meant to mirror salary growth. Set this to 0% if you do not plan to increase contributions.' },
                    { label: 'Expected return:', text: 'the annual return on your corpus before retirement. A diversified equity-heavy portfolio has historically returned 10-12% CAGR over long periods in India.' },
                  ].map((it, i) => (
                    <li key={i} style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.75 }}>
                      <strong style={{ color: C.ink }}>{it.label}</strong> {it.text}
                    </li>
                  ))}
                </ol>
              </div>

              <div style={sec} id="limitations">
                <h2 style={h2}>Limitations of This Projection</h2>
                <p style={p}>
                  This is a deterministic projection using one fixed return rate every year, which real markets never deliver exactly.
                </p>
                <p style={p}>
                  It also does not model inflation on your target pension, taxes on annuity income, or expense ratios on your investments, so treat the output as a planning estimate rather than a guarantee.
                </p>
              </div>

              <div style={sec} id="eps">
                <h2 style={h2}>EPS: The Employees&apos; Pension Scheme</h2>
                <p style={p}>
                  The Employees&apos; Pension Scheme, 1995 is a separate EPFO scheme funded by 8.33% of the employer&apos;s contribution plus 1.16% from the Central Government, both subject to the statutory wage ceiling.
                </p>
                <p style={p}>
                  The monthly pension is calculated as Pensionable Salary multiplied by Pensionable Service, divided by 70, and requires a minimum of 10 years of eligible service.
                </p>
                <p style={p}>
                  EPS is distinct from your EPF savings balance and should be treated as a separate, additional pension source, not added into this calculator&apos;s SIP-based corpus.
                </p>
              </div>

              <div style={sec} id="atal-pension-yojana">
                <h2 style={h2}>Atal Pension Yojana: A Government-Backed Pension Option</h2>
                <p style={p}>
                  The Atal Pension Yojana is a Central Government guaranteed pension scheme for the unorganized sector, open to anyone aged 18 to 40 with a savings bank or post office account.
                </p>
                <p style={p}>
                  Subscribers choose a fixed monthly contribution today in exchange for a guaranteed pension of Rs 1,000, 2,000, 3,000, 4,000, or 5,000 per month starting at age 60, for life.
                </p>
                <p style={p}>
                  After the subscriber&apos;s death, the spouse receives the same pension for life, making it a useful guaranteed floor alongside a market-linked corpus like the one this calculator projects.
                </p>
              </div>

              <div style={sec} id="scss">
                <h2 style={h2}>Senior Citizen Savings Scheme as a Pension Income Alternative</h2>
                <p style={p}>
                  The Senior Citizen Savings Scheme (SCSS) is a government-backed fixed-income option for retirees aged 60 and above, currently paying 8.2% per annum as notified by the Finance Ministry for the July-September 2026 quarter.
                </p>
                <p style={p}>
                  Interest is paid out quarterly rather than monthly, so many retirees use SCSS alongside an annuity to diversify their guaranteed retirement income between two government-linked sources.
                </p>
              </div>

              <div style={sec} id="ups">
                <h2 style={h2}>The Unified Pension Scheme for Government Employees</h2>
                <p style={p}>
                  The Unified Pension Scheme (UPS), effective from 1 April 2025, is an option under NPS for existing Central Government employees, offering an assured payout of 50% of the last 12 months&apos; average basic pay after 25 years of qualifying service.
                </p>
                <p style={p}>
                  A minimum guaranteed payout of Rs 10,000 per month applies after at least 10 years of service, with a family pension of 60% of the employee&apos;s pension on death.
                </p>
                <p style={p}>
                  UPS applies only to Central Government employees covered under NPS, not to private-sector savers using this calculator, but it is a useful reference point when comparing guaranteed versus market-linked retirement income.
                </p>
              </div>


              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2}>Frequently Asked Questions</h2>
                <FAQ faqs={faqs} />
              </div>

            </article>

          </div>

          <style>{`.pension-sidebar::-webkit-scrollbar{width:5px}.pension-sidebar::-webkit-scrollbar-track{background:transparent}.pension-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.pension-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside
            className="pension-sidebar"
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
            <div style={{ flexShrink: 0 }}><SidebarList title="Popular Calculators" items={POPULAR} /></div>
            <div style={{ flexShrink: 0 }}><SidebarList title="More Calculators" items={MORE} /></div>
          </aside>

        </div>
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

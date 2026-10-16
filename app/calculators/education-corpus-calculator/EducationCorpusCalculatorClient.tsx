'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useLayoutEffect } from 'react';
import Link from 'next/link';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
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

/* ── Donut chart ──────────────────────────────────────── */
function DonutChart({ todayCost, inflationGrowth }: { todayCost: number; inflationGrowth: number }) {
  const total = todayCost + inflationGrowth;
  if (total === 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const pArc = (todayCost / total) * circ;
  const pPct = Math.round((todayCost / total) * 100);
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Today's cost ${pPct}% of future cost, inflation growth ${100 - pPct}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Today&apos;s Cost</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
  );
}

/* ── Slider ───────────────────────────────────────────── */
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

/* ── Sidebar ──────────────────────────────────────────── */
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
    { label: 'Private education inflation (est.)', value: '10-12%' },
    { label: 'MOSPI CPI education (official)', value: '~3.5-4.7%' },
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
  { href: '/calculators/child-education-planner-calculator', label: 'Child Education Planner' },
  { href: '/calculators/sip-calculator', label: 'SIP Calculator' },
  { href: '/calculators/ssy-calculator', label: 'Sukanya Samriddhi Yojana' },
  { href: '/calculators/goal-planning-calculator', label: 'Goal Planning Calculator' },
  { href: '/calculators/future-value-calculator', label: 'Future Value Calculator' },
];
const MORE = [
  { href: '/calculators/lumpsum-calculator', label: 'Lumpsum Calculator' },
  { href: '/calculators/wealth-growth-calculator', label: 'Wealth Growth Calculator' },
  { href: '/calculators/retirement-corpus-calculator', label: 'Retirement Corpus Calculator' },
  { href: '/calculators/education-loan-emi-calculator', label: 'Education Loan EMI Calculator' },
];

/* ── CA CTA ───────────────────────────────────────────── */

/* ── FAQ ──────────────────────────────────────────────── */
function FAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  return <FAQBox items={faqs} />;
}

function fmtIN(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString('en-IN')}`;
}

export default function EducationCorpusCalculatorClient({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [mobile, setMobile] = useState(false);
  const [showTable, setShowTable] = useState(false);
  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const defaultSettings = { childAge: 5, eduStartAge: 18, currentCost: 500000, eduInflation: 10 };
  const { settings, updateSettings } = useCalculatorSettings('education-corpus-calculator', defaultSettings);
  const { childAge, eduStartAge, currentCost, eduInflation } = settings;
  const setChildAge = (v: number) => updateSettings({ childAge: v });
  const setEduStartAge = (v: number) => updateSettings({ eduStartAge: v });
  const setCurrentCost = (v: number) => updateSettings({ currentCost: v });
  const setEduInflation = (v: number) => updateSettings({ eduInflation: v });

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  const yearsToEdu = Math.max(0, eduStartAge - childAge);
  const futureCost = useMemo(() => {
    if (yearsToEdu === 0) return currentCost;
    return currentCost * Math.pow(1 + eduInflation / 100, yearsToEdu);
  }, [currentCost, eduInflation, yearsToEdu]);

  const yearlyRows = useMemo(() => {
    const rows: { year: number; age: number; cost: number }[] = [];
    const startYear = new Date().getFullYear();
    for (let i = 1; i <= yearsToEdu; i++) {
      rows.push({
        year: startYear + i,
        age: childAge + i,
        cost: currentCost * Math.pow(1 + eduInflation / 100, i),
      });
    }
    return rows;
  }, [currentCost, eduInflation, yearsToEdu, childAge]);

  const inflationGrowth = Math.max(0, futureCost - currentCost);
  const todayPct = futureCost > 0 ? Math.round((currentCost / futureCost) * 100) : 100;
  const growthPct = 100 - todayPct;

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <style>{`
        .educ-sidebar::-webkit-scrollbar { width: 5px; }
        .educ-sidebar::-webkit-scrollbar-track { background: transparent; }
        .educ-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .educ-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
      `}</style>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Education Corpus Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate the future cost of your child&rsquo;s higher education based on today&rsquo;s fees and expected education inflation.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            <section aria-label="Education Corpus Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Child Details</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>
                  <Slider label="Child's Current Age" id="ec-age" value={childAge} min={0} max={17} step={1} fmt={v => `${v} Yr`} onChange={setChildAge} compact={mobile} />
                  <Slider label="Education Start Age" id="ec-start" value={eduStartAge} min={childAge + 1} max={25} step={1} fmt={v => `${v} Yr`} onChange={setEduStartAge} compact={mobile} />
                  <Slider label="Current Education Cost" id="ec-cost" value={currentCost} min={50000} max={5000000} step={25000} fmt={fmtC} onChange={setCurrentCost} compact={mobile} />
                  <Slider label="Education Inflation" id="ec-inflation" value={eduInflation} min={5} max={18} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={setEduInflation} compact={mobile} />
                </div>

                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Future Education Cost</span>
                    <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                      aria-live="polite" aria-label={`Future education cost: ${fmtC(futureCost)}`}>
                      {fmtC(futureCost)}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    <DonutChart todayCost={currentCost} inflationGrowth={inflationGrowth} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Today&apos;s Cost {todayPct}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Inflation Growth {growthPct}%</span>
                    </div>
                  </div>

                  {[
                    { label: 'Current cost', value: fmtC(currentCost) },
                    { label: 'Years to education', value: `${yearsToEdu} Yr` },
                    { label: 'Education inflation', value: `${eduInflation.toFixed(1)}%` },
                    { label: 'Cost increase', value: fmtC(inflationGrowth) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Today&apos;s Cost {todayPct}%</span>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Inflation Growth {growthPct}%</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`Today's cost is ${todayPct}% of future education cost`}>
                      <div style={{ height: '100%', width: `${todayPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>

                  {yearsToEdu > 0 && (
                    <p style={{ fontSize: 13, color: C.ink2, textAlign: 'center', margin: '16px 0 0', lineHeight: 1.6 }}>
                      Cost will increase by <strong style={{ color: C.dark }}>{((futureCost / currentCost - 1) * 100).toFixed(0)}%</strong> over {yearsToEdu} years.
                    </p>
                  )}
                </div>
              </div>

              {yearlyRows.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowTable(v => !v)}
                    aria-expanded={showTable} aria-controls="ec-growth-table"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Year-by-Year Cost Growth</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>({yearlyRows.length} years)</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {fmtC(yearlyRows[yearlyRows.length - 1].cost)}
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showTable && (
                    <div id="ec-growth-table" style={{ borderTop: `1px solid ${C.border}`, overflowX: 'auto', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
                      <table style={{ minWidth: 400, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead>
                          <tr style={{ background: '#f4f5f6' }}>
                            {['Year', 'Child Age', 'Projected Cost'].map(h => (
                              <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }} scope="col">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {yearlyRows.map((row, i) => (
                            <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                              <td style={{ padding: '11px 14px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                              <td style={{ padding: '11px 14px', color: C.ink2 }}>{row.age} yr</td>
                              <td style={{ padding: '11px 14px', fontWeight: 700, color: C.dark }}>{fmtC(row.cost)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </section>

            <div style={{ marginBottom: 32 }}><SaveResultsCard mobile={mobile} /></div>


            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 id="what-is-education-corpus" style={h2}>What Is Education Corpus?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Education corpus is the total amount you need to have saved by the time your child begins higher education. Because education costs rise faster than general inflation, the same course that costs <strong>{fmtC(currentCost)}</strong> today could cost <strong>{fmtC(futureCost)}</strong> in {yearsToEdu} years.
                  </p>
                </div>
                <p style={p}>
                  This calculator focuses on a single number: the future cost. Use the <Link href="/calculators/child-education-planner-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Child Education Planner</Link> to work out how much to invest each month to reach this corpus.
                </p>
              </div>

              <div style={sec}>
                <h2 id="education-corpus-formula" style={h2}>How the Future Cost Is Calculated</h2>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark }}>
                    Future Cost = Current Cost x (1 + Education Inflation Rate)<sup>Years</sup>
                  </code>
                </div>
                <p style={p}>
                  The number of years is the gap between your child&rsquo;s current age and the planned education start age. A course costing <strong>Rs 5,00,000</strong> today with education inflation at <strong>10%</strong> over <strong>13 years</strong> grows to <strong>{fmtIN(500000 * Math.pow(1.1, 13))}</strong>. The longer the horizon, the more dramatic the effect of compounding inflation.
                </p>
              </div>

              <div style={sec}>
                <h2 id="education-inflation-rate-india" style={h2}>Education Inflation Rate in India: Official vs Planning Figures</h2>
                <p style={p}>
                  MOSPI&apos;s <a href="https://www.mospi.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Consumer Price Index</a> tracks an education services sub-group separately from headline CPI, and this official figure has run close to 3.5-4.7% recently. This is much lower than the 10-12% figure commonly used for private college fee planning.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  The gap exists because the CPI basket weights lower-cost government and budget private schools far more heavily than premier private colleges. For planning purposes, most financial advisors continue to recommend 8-12% for private higher education, closer to actual observed fee hikes at competitive institutions.
                </p>
              </div>

              <div style={sec}>
                <h2 id="education-cost-by-course" style={h2}>Education Cost by Course: Current Estimates</h2>
                <p style={p}>Approximate total course costs at today&rsquo;s prices, before inflation adjustment:</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Course</th><th style={thS} scope="col">Government/Public</th><th style={thS} scope="col">Private</th></tr></thead>
                    <tbody>
                      {[
                        ['Engineering (B.Tech, 4 yr)', 'Rs 8-10 L (IIT/NIT)', 'Rs 4-10 L'],
                        ['MBBS (5.5 yr)', 'Rs 1-6 L', 'Rs 50 L - 1 Cr+'],
                        ['MBA (2 yr)', 'Rs 15-25 L (IIM)', 'Rs 20-30 L'],
                        ['Undergraduate abroad (3-4 yr)', '-', 'Rs 60 L - 1.5 Cr'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={tdR}>{r[1]}</td>
                          <td style={tdR}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  These are indicative ranges and vary widely by institution and city. Enter your target institution&rsquo;s actual current fee as the current cost for the most accurate projection.
                </p>
              </div>

              <div style={sec}>
                <h2 id="section-80e-education-loan" style={h2}>Section 80E: Education Loan Interest Is Fully Deductible</h2>
                <p style={p}>
                  Yes, with no upper limit. Under <a href="https://www.incometax.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Section 80E</a>, the entire interest paid on an education loan is deductible, for up to 8 years from the year repayment starts or until the interest is fully paid, whichever is earlier.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Only interest qualifies, not principal repayment, and the loan must be from a bank or approved financial institution. This makes a loan-plus-corpus combination a realistic bridge if your saved corpus falls short of the actual cost.
                </p>
              </div>

              <div style={sec}>
                <h2 id="sukanya-samriddhi-education" style={h2}>Sukanya Samriddhi Yojana for a Girl Child&rsquo;s Education</h2>
                <p style={p}>
                  For a girl child under 10, Sukanya Samriddhi Yojana currently pays 8.2% per annum, among the highest rates of any government-backed small savings scheme, and qualifies for Section 80C deduction.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Up to 50% of the balance can be withdrawn once she turns 18 or completes class 10, specifically for education expenses. Use the <Link href="/calculators/ssy-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Sukanya Samriddhi Yojana Calculator</Link> to project the maturity value alongside this education corpus target.
                </p>
              </div>

              <div style={sec}>
                <h2 id="foreign-education-planning" style={h2}>Planning for Foreign Education</h2>
                <p style={p}>
                  Adjust the current cost to reflect international fees in Rupees, and use a higher inflation rate of 12-15%, since foreign tuition and living costs typically rise faster than domestic education.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  The Rupee has also depreciated against major currencies over most long periods, which compounds on top of tuition inflation. Many planners build in an additional 2-3% a year specifically for currency depreciation on top of the destination country&rsquo;s own fee inflation.
                </p>
              </div>

              <div style={sec}>
                <h2 id="pm-vidyalaxmi-scheme" style={h2}>PM-Vidyalaxmi: Collateral-Free Education Loans up to Rs 7.5 Lakh</h2>
                <p style={p}>
                  Yes, for students admitted to a designated institution. Under <a href="https://www.education.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>PM-Vidyalaxmi</a>, students at any of 1,425 listed Quality Higher Education Institutions can get education loans up to Rs 7.5 lakh with no collateral or guarantor, backed by a 75% government credit guarantee.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Eligible students from lower-income families also get government interest support during the study period. Management quota and NRI quota admissions do not qualify, so check your admission category before applying.
                </p>
              </div>

              <div style={sec}>
                <h2 id="education-loan-collateral-rules" style={h2}>When Does an Education Loan Need Collateral</h2>
                <p style={p}>
                  It depends on the loan size. Under the IBA Model Education Loan Scheme, loans up to Rs 4 lakh need no collateral or guarantor at all, loans between Rs 4 lakh and Rs 7.5 lakh accept a third-party guarantee with no tangible collateral, and loans above Rs 7.5 lakh require tangible collateral such as property or a fixed deposit.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  This tiered structure is exactly why PM-Vidyalaxmi&rsquo;s Rs 7.5 lakh collateral-free cap matters: it covers the full range where banks would otherwise ask for a guarantor or collateral.
                </p>
              </div>

              <div style={sec}>
                <h2 id="section-80c-tuition-fees" style={h2}>Tuition Fees Also Qualify for Section 80C, Separately From 80E</h2>
                <p style={p}>
                  Yes, actual tuition fees paid for full-time education of up to two children are deductible under Section 80C, within the overall Rs 1.5 lakh combined 80C limit. If both parents pay tax, each can claim for up to two children, covering up to four children in a family.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  This is separate from the Section 80E loan interest deduction discussed above and is only available under the old tax regime, alongside other 80C investments like PPF, ELSS, and life insurance premiums.
                </p>
              </div>

              <div style={sec}>
                <h2 id="national-scholarship-portal" style={h2}>Government Scholarships Can Reduce the Corpus You Need</h2>
                <p style={p}>
                  Check the <a href="https://scholarships.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>National Scholarship Portal (NSP)</a> before finalising your target corpus. It brings together 140+ central and state scholarship schemes covering Class 1 through PhD, including merit, minority, SC/ST/OBC/EWS, and disability categories, all disbursed by direct bank transfer.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  A scholarship covering even 10-20% of course fees meaningfully reduces the corpus target from this calculator. Applications typically open each June, with most deadlines around October 31 for the academic year.
                </p>
              </div>

              <div style={sec}>
                <h2 id="how-to-use" style={h2}>How to Use This Calculator</h2>
                <ol style={{ paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, margin: 0, listStyleType: 'decimal' }}>
                  {[
                    ['Enter your child\'s current age', 'in completed years.'],
                    ['Enter the education start age', 'typically 18, or earlier for some diploma or foundation courses.'],
                    ['Enter the current education cost', 'the total course cost at today\'s prices, including tuition and accommodation.'],
                    ['Set the education inflation rate', '8-12% is typical for Indian private institutions; use 12-15% for foreign education.'],
                    ['Read the results', 'future education cost, years to education, and the split between today\'s cost and inflation growth update instantly.'],
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
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative estimates based on the inputs you provide and assume a constant education inflation rate over the full horizon. Actual fee increases vary by institution and year. This calculator is for educational and planning purposes only and does not constitute financial advice. 
                </p>
              </div>

            </article>
          </div>

          <aside
            className="educ-sidebar"
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

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

/* ─── Donut Chart ────────────────────────────────────────────── */
function DonutChart({ exemptPct }: { exemptPct: number }) {
  const taxablePct = 100 - exemptPct;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const eArc = (exemptPct / 100) * circ;
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`HRA exempt is ${exemptPct}% of HRA received, taxable is ${taxablePct}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${eArc} ${circ - eArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Exempt</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{exemptPct}%</text>
    </svg>
  );
}

/* ─── N-Year HRA Projection (VPF pattern: collapsible stacked bar chart + table) ─── */
interface HRAYear { year: number; basic: number; hraReceived: number; rent: number; exempt: number; taxable: number; binding: 'A' | 'B' | 'C'; }

function buildHRAProjection(basic: number, da: number, hraReceived: number, rent: number, metro: boolean, salaryGrowthPct: number, rentGrowthPct: number, years: number): HRAYear[] {
  const rows: HRAYear[] = [];
  const sRate = Math.max(0, salaryGrowthPct) / 100;
  const rRate = Math.max(0, rentGrowthPct) / 100;
  for (let y = 1; y <= years; y++) {
    const basicY = basic * Math.pow(1 + sRate, y);
    const daY = da * Math.pow(1 + sRate, y);
    const hraY = hraReceived * Math.pow(1 + sRate, y);
    const rentY = rent * Math.pow(1 + rRate, y);
    const salaryForHRAY = basicY + daY;
    const a = hraY;
    const b = rentY - 0.1 * salaryForHRAY;
    const c = metro ? 0.5 * salaryForHRAY : 0.4 * salaryForHRAY;
    const rawMin = Math.min(a, b, c);
    const exempt = Math.max(0, rawMin);
    const binding: 'A' | 'B' | 'C' = rawMin === a ? 'A' : rawMin === b ? 'B' : 'C';
    rows.push({ year: y, basic: basicY, hraReceived: hraY, rent: rentY, exempt, taxable: Math.max(0, hraY - exempt), binding });
  }
  return rows;
}

function HRAProjectionChart({ rows }: { rows: HRAYear[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxVal = Math.max(...rows.map(r => r.hraReceived), 1);
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(30, slot * 0.6));
  const gap = (slot - barW) / 2;
  return (
    <svg role="img" aria-label={`HRA exemption versus taxable HRA over ${rows.length} years`}
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {rows.map((row, i) => {
        const exemptH = (row.exempt / maxVal) * H;
        const totalH = (row.hraReceived / maxVal) * H;
        const taxableH = Math.max(0, totalH - exemptH);
        const x = PADL + i * slot + gap;
        return (
          <g key={row.year}>
            <rect x={x} y={H - totalH} width={barW} height={taxableH} fill={CHART_PAIR.secondary} rx={2} />
            <rect x={x} y={H - exemptH} width={barW} height={exemptH} fill={CHART_PAIR.primary} rx={2} />
            {rows.length <= 20 && (
              <text x={x + barW / 2} y={H + 14} textAnchor="middle"
                style={{ fontSize: rows.length > 12 ? 8 : 9, fill: C.ink3, fontFamily: INTER }}>
                Y{row.year}
              </text>
            )}
          </g>
        );
      })}
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
  { href: '/calculators/income-tax-calculator',              label: 'Income Tax Calculator' },
  { href: '/calculators/old-vs-new-tax-regime-calculator',   label: 'Old vs New Tax Regime' },
  { href: '/calculators/in-hand-salary-calculator',          label: 'In-Hand Salary Calculator' },
  { href: '/calculators/ctc-calculator',                     label: 'CTC Calculator' },
  { href: '/calculators/gratuity-calculator',                label: 'Gratuity Calculator' },
  { href: '/calculators/home-loan-calculator',               label: 'Home Loan Calculator' },
  { href: '/calculators/mortgage-calculator',                label: 'Mortgage Calculator' },
];
const MORE = [
  { href: '/calculators/emi-calculator',                     label: 'EMI Calculator' },
  { href: '/calculators/percentage-calculator',              label: 'Percentage Calculator' },
  { href: '/calculators/gst-calculator',                     label: 'GST Calculator' },
  { href: '/calculators/ppf-calculator',                     label: 'PPF Calculator' },
  { href: '/calculators/compound-interest-calculator',       label: 'Compound Interest Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
function FAQ() {
  return <FAQBox items={faqItems} />;
}

/* ─── Main ───────────────────────────────────────────────────── */

export default function HRACalculatorClient() {
  const [mobile, setMobile] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showProjection, setShowProjection] = useState(false);

  const defaultSettings = { basic: 50000, da: 0, hraReceived: 20000, rent: 18000, metro: true, salaryGrowth: 8, rentGrowth: 8, projectionYears: 5 };
  const { settings, updateSettings } = useCalculatorSettings('hra-calculator', defaultSettings);
  const { basic, da, hraReceived, rent, metro, salaryGrowth, rentGrowth, projectionYears } = settings;
  const setBasic = (v: any) => updateSettings({ basic: typeof v === 'function' ? v(settings.basic) : v });
  const setDa = (v: any) => updateSettings({ da: typeof v === 'function' ? v(settings.da) : v });
  const setHraReceived = (v: any) => updateSettings({ hraReceived: typeof v === 'function' ? v(settings.hraReceived) : v });
  const setRent = (v: any) => updateSettings({ rent: typeof v === 'function' ? v(settings.rent) : v });
  const setMetro = (v: any) => updateSettings({ metro: typeof v === 'function' ? v(settings.metro) : v });
  const setSalaryGrowth = (v: any) => updateSettings({ salaryGrowth: typeof v === 'function' ? v(settings.salaryGrowth) : v });
  const setRentGrowth = (v: any) => updateSettings({ rentGrowth: typeof v === 'function' ? v(settings.rentGrowth) : v });
  const setProjectionYears = (v: any) => updateSettings({ projectionYears: typeof v === 'function' ? v(settings.projectionYears) : v });

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtC = (n: number) => formatCurrency(convertCurrency(n));
  const fmtIN = (n: number) => `Rs ${Math.round(n).toLocaleString('en-IN')}`;

  const salaryForHRA = basic + da;
  const hraExempt = useMemo(() => {
    const a = hraReceived;
    const b = rent - 0.1 * salaryForHRA;
    const c = metro ? 0.5 * salaryForHRA : 0.4 * salaryForHRA;
    return Math.max(0, Math.min(a, b, c));
  }, [salaryForHRA, hraReceived, rent, metro]);

  const taxableHRA = hraReceived - hraExempt;
  const annualSavings = hraExempt * 12;
  const exemptPct = hraReceived > 0 ? Math.max(0, Math.min(100, Math.round((hraExempt / hraReceived) * 100))) : 0;

  const projection = useMemo(() => buildHRAProjection(basic, da, hraReceived, rent, metro, salaryGrowth, rentGrowth, projectionYears), [basic, da, hraReceived, rent, metro, salaryGrowth, rentGrowth, projectionYears]);
  const bindingLabel = { A: 'HRA received', B: 'Rent − 10% of salary', C: metro ? '50% of salary' : '40% of salary' } as const;
  const projectionBindingChanges = projection.some(r => r.binding !== projection[0]?.binding);

  const Row = ({ label, value }: { label: string; value: string }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${C.border}` }}>
      <span style={{ fontSize: 13, color: C.ink2 }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{value}</span>
    </div>
  );

  const Btn = (p: { active: boolean; children: React.ReactNode; onClick: () => void }) => (
    <button onClick={p.onClick}
      style={{ padding: mobile ? '6px 14px' : '8px 20px', borderRadius: 8, border: `1.5px solid ${p.active ? C.dark : C.border}`, background: p.active ? C.dark : C.white, color: p.active ? C.white : C.ink, fontFamily: INTER, fontSize: mobile ? 13 : 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}>
      {p.children}
    </button>
  );

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const h3  = { fontSize: 15.5, fontWeight: 600, color: C.ink, margin: '0 0 6px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            HRA Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            House Rent Allowance Exemption Calculator under Section 10(13A) with metro and non-metro city options
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="HRA Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider label="Basic Salary (Monthly)" id="hra-basic" value={basic} min={1000} max={500000} step={1000} fmt={v => fmtC(v)} onChange={setBasic} compact={mobile} />
                      <Slider label="HRA Received (Monthly)" id="hra-received" value={hraReceived} min={0} max={200000} step={500} fmt={v => fmtC(v)} onChange={setHraReceived} compact={mobile} />
                      <Slider label="Rent Paid (Monthly)" id="hra-rent" value={rent} min={0} max={200000} step={500} fmt={v => fmtC(v)} onChange={setRent} compact={mobile} />
                      <div style={{ marginBottom: mobile ? 18 : 36 }}>
                        <label style={{ fontSize: mobile ? 13.5 : 14, color: C.ink2, fontWeight: 400, display: 'block', marginBottom: mobile ? 10 : 14 }}>City Type</label>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <Btn active={metro} onClick={() => setMetro(true)}>Metro (50% of Basic)</Btn>
                          <Btn active={!metro} onClick={() => setMetro(false)}>Non-Metro (40% of Basic)</Btn>
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button onClick={() => setShowAdvanced(true)}
                          style={{ fontSize: 12, fontWeight: 700, color: C.dark, background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 7, padding: '6px 14px', cursor: 'pointer', fontFamily: INTER, display: 'flex', alignItems: 'center', gap: 5 }}>
                          More settings
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Slider label="Dearness Allowance (Monthly)" id="hra-da" value={da} min={0} max={200000} step={500} fmt={v => fmtC(v)} onChange={setDa} compact={mobile} />
                      <p style={{ fontSize: 12.5, color: C.ink3, lineHeight: 1.6, margin: '0 0 20px' }}>
                        Only applies if your Dearness Allowance counts towards retirement benefits, which mainly affects government and PSU employees. Leave at Rs 0 otherwise.
                      </p>
                      <Slider label="Annual Salary Growth" id="hra-salary-growth" value={salaryGrowth} min={0} max={20} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={setSalaryGrowth} compact={mobile} />
                      <Slider label="Annual Rent Growth" id="hra-rent-growth" value={rentGrowth} min={0} max={20} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={setRentGrowth} compact={mobile} />
                      <Slider label="Projection Years" id="hra-years" value={projectionYears} min={2} max={15} step={1} fmt={v => `${v} yr`} onChange={setProjectionYears} compact={mobile} />
                      <p style={{ fontSize: 12.5, color: C.ink3, lineHeight: 1.6, margin: '0 0 20px' }}>
                        Salary growth, rent growth, and projection years feed the N-Year HRA Projection below the calculator, which tracks how your exemption and its binding constraint shift over time.
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <button onClick={() => setShowAdvanced(false)}
                          style={{ fontSize: 12, fontWeight: 600, color: C.ink2, background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, display: 'flex', alignItems: 'center', gap: 5, padding: 0 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
                          Basic
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Result panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 16 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                      <div style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>HRA Exemption</div>
                      <div style={{ fontSize: mobile ? 12 : 13, color: '#7A8087' }}>monthly</div>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                      <div style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', lineHeight: 1 }}
                        aria-live="polite" aria-label={`HRA exemption: ${fmtIN(hraExempt)} per month`}>
                        {fmtIN(hraExempt)}
                      </div>
                      <div style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: '#101214', lineHeight: 1 }}>per month</div>
                    </div>
                  </div>

                  <Row label="Actual HRA Received" value={fmtIN(hraReceived)} />
                  <Row label={da > 0 ? 'Rent minus 10% of Basic+DA' : 'Rent minus 10% of Basic'} value={fmtIN(Math.max(0, Math.round(rent - 0.1 * salaryForHRA)))} />
                  <Row label={`${metro ? '50%' : '40%'} of ${da > 0 ? 'Basic+DA' : 'Basic Salary'}`} value={fmtIN(Math.round((metro ? 0.5 : 0.4) * salaryForHRA))} />
                  <Row label="Taxable HRA" value={fmtIN(Math.round(taxableHRA))} />
                  <Row label="Annual Tax Saving" value={fmtIN(Math.round(annualSavings))} />

                  <div style={{ order: mobile ? 1 : -1, marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16 }}>
                    <DonutChart exemptPct={exemptPct} />
                  </div>
                  <div style={{ order: mobile ? 2 : -1, display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 16, width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary, display: 'inline-block' }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Exempt {exemptPct}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary, display: 'inline-block' }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Taxable {100 - exemptPct}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* N-Year HRA Projection (collapsible, VPF pattern) */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowProjection(v => !v)}
                  aria-expanded={showProjection} aria-controls="hra-projection-table"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>N-Year HRA Projection</span>
                    {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>If your salary and rent keep growing every year</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {projectionYears} yr &middot; {salaryGrowth.toFixed(1)}%/{rentGrowth.toFixed(1)}%
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      aria-hidden="true" style={{ transform: showProjection ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {showProjection && (
                  <div id="hra-projection-table" style={{ borderTop: `1px solid ${C.border}` }}>
                    <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                      <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} aria-hidden="true" />
                          <span style={{ fontSize: 11.5, color: C.ink2 }}>Exempt HRA</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} aria-hidden="true" />
                          <span style={{ fontSize: 11.5, color: C.ink2 }}>Taxable HRA</span>
                        </div>
                      </div>
                      <HRAProjectionChart rows={projection} />
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
                    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
                      <table style={{ minWidth: 600, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead>
                          <tr style={{ background: '#f4f5f6' }}>
                            {['Year', 'Basic (Monthly)', 'Rent (Monthly)', 'Monthly Exemption', 'Binding Component'].map(h => (
                              <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }} scope="col">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {projection.map((row, i) => (
                            <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                              <td style={{ padding: '11px 14px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                              <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtIN(row.basic)}</td>
                              <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtIN(row.rent)}</td>
                              <td style={{ padding: '11px 14px', color: C.ink, fontWeight: 700 }}>{fmtIN(row.exempt)}</td>
                              <td style={{ padding: '11px 14px', color: C.ink2 }}>{bindingLabel[row.binding]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div style={{ padding: mobile ? '16px' : '20px 44px 28px' }}>
                      <p style={{ fontSize: 12.5, color: C.ink2, lineHeight: 1.7, margin: 0 }}>
                        {projectionBindingChanges
                          ? `As salary and rent both grow, the binding constraint changes at least once over the next ${projectionYears} years, from ${bindingLabel[projection[0]?.binding ?? 'B']} to a different component later in the projection. This is the same "Which Part of the Formula Actually Applies to You?" effect described above, just playing out over time instead of across different starting numbers.`
                          : `At ${salaryGrowth.toFixed(1)}% salary growth and ${rentGrowth.toFixed(1)}% rent growth, ${bindingLabel[projection[0]?.binding ?? 'B']} stays the binding constraint for all ${projectionYears} projected years, so the shape of your exemption does not change, only its size.`}
                        {' '}This assumes HRA received grows in the same proportion as basic salary, which is typical when HRA is a fixed percentage of basic in your salary structure, but check your own payslip if your employer restructures pay differently.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>



            {/* ── ARTICLE ── */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-hra-exemption">What Is HRA Exemption Under Section 10(13A)?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    HRA exemption under Section 10(13A) of the Income Tax Act allows salaried employees living in rented accommodation to reduce their taxable income by the least of three amounts: actual HRA received, rent paid minus 10 per cent of basic salary, or 50 per cent (metro) or 40 per cent (non-metro) of basic salary.
                  </p>
                </div>
                <p style={p}>
                  The exemption is calculated monthly and applies only if you actually live in rented accommodation and pay rent. The amount that remains after the exemption (taxable HRA) is added to your gross salary and taxed at your applicable slab rate. For FY 2026-27, salaried employees opting for the old tax regime can claim this benefit.
                </p>
                <p style={p}>
                  Per <a href="https://www.incometaxindia.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Department</a> Rule 2A, proper documentation, including rent receipts and landlord PAN where required, is essential to claim HRA exemption during tax filing.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  It is worth separating two different numbers here. The HRA you actually <em>receive</em> is set by your employer&apos;s salary policy, or for central government employees by the 7th Pay Commission&apos;s city classification (24 per cent, 16 per cent, or 8 per cent of basic plus DA). The HRA that is <em>exempt from tax</em> is a separate calculation under Section 10(13A), the one this calculator performs, and it is very often lower than what you receive.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="hra-conditions">Conditions for Claiming HRA Exemption</h2>
                <p style={p}>
                  All of the following must be true at the same time. Missing any one of them means the exemption does not apply for that period, regardless of how the three-part formula works out.
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>You must be a salaried employee. Section 10(13A) exempts a salary component, so it does not apply to freelancers, consultants, or business owners, who use Section 80GG instead.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>HRA must actually be a named component of your salary structure. If your CTC has no HRA line, there is nothing to exempt, again pointing you to Section 80GG.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>You must live in rented accommodation and genuinely pay rent for it, ideally traceable through a bank transfer.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>You must have opted for the old tax regime for that financial year. The new regime does not allow this exemption at all.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>You cannot pay rent to your spouse and claim HRA on it, since the law does not recognise that as a genuine landlord-tenant arrangement.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>You cannot claim HRA for a property you own and live in yourself, even if you also have a home loan on it.</li>
                </ul>
              </div>

              <div style={sec}>
                <h2 style={h2} id="hra-exemption-formula">HRA Exemption Formula</h2>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark }}>
                    HRA Exemption = Minimum of (A, B, C)
                  </code>
                </div>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Three components of HRA exemption under Section 10(13A)</caption>
                    <thead><tr><th style={thS} scope="col">Component</th><th style={thS} scope="col">Formula</th><th style={thS} scope="col">Notes</th></tr></thead>
                    <tbody>
                      {[
                        ['A', 'Actual HRA received from employer', 'The HRA amount in your salary slip'],
                        ['B', 'Rent paid minus 10 per cent of salary', 'Only the excess rent over 10% of salary qualifies'],
                        ['C (Metro)', '50 per cent of salary', 'Delhi, Mumbai, Chennai, Kolkata'],
                        ['C (Non-Metro)', '40 per cent of salary', 'All other Indian cities'],
                      ].map(([comp, formula, notes]) => (
                        <tr key={comp as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 700, color: C.ink, width: 30 }}>{comp}</td>
                          <td style={tdR}>{formula}</td>
                          <td style={tdL}>{notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  <strong>Worked example:</strong> Basic salary Rs 50,000 per month, HRA received Rs 20,000, rent paid Rs 18,000 in a metro city. A = Rs 20,000. B = Rs 18,000 minus Rs 5,000 (10% of basic) = Rs 13,000. C = 50% of Rs 50,000 = Rs 25,000. Exemption = min(Rs 20,000, Rs 13,000, Rs 25,000) = Rs 13,000 per month. Taxable HRA = Rs 20,000 minus Rs 13,000 = Rs 7,000.
                </p>
                <p style={p}>
                  "Salary" for this formula means basic salary plus Dearness Allowance, but only if your DA counts towards retirement benefits, which mainly applies to government and PSU employees. Most private-sector employees have no separate DA component, so basic salary alone is the right figure. Enter your DA in More Settings only if it applies to you.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  <strong>Worked example with DA:</strong> A government employee has basic salary Rs 40,000 and DA of Rs 20,000 a month, so salary for HRA purposes is Rs 60,000. They receive HRA of Rs 14,400 (the 7th Pay Commission&apos;s X-class rate of 24% of basic plus DA) and pay rent of Rs 25,000 in a metro city. A = Rs 14,400. B = Rs 25,000 minus Rs 6,000 (10% of Rs 60,000) = Rs 19,000. C = 50% of Rs 60,000 = Rs 30,000. Exemption = min(Rs 14,400, Rs 19,000, Rs 30,000) = Rs 14,400, the full HRA received, since A is the smallest of the three here.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="hra-excel-formula">HRA Exemption Formula in Excel</h2>
                <p style={p}>
                  Since the exemption is the minimum of three values, a single Excel <code style={{ fontFamily: 'monospace', background: '#f4f5f6', padding: '1px 5px', borderRadius: 4 }}>MIN()</code> formula computes it directly, with an <code style={{ fontFamily: 'monospace', background: '#f4f5f6', padding: '1px 5px', borderRadius: 4 }}>IF()</code> for the metro/non-metro ceiling.
                </p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 13.5, color: C.dark, wordBreak: 'break-word' }}>
                    =MIN(HRA_received, Rent_paid - 0.1*Salary, IF(Is_Metro, 0.5, 0.4)*Salary)
                  </code>
                </div>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Suggested spreadsheet layout for the HRA exemption formula</caption>
                    <thead><tr><th style={thS} scope="col">Cell</th><th style={thS} scope="col">Content</th></tr></thead>
                    <tbody>
                      {[
                        ['B1', 'Basic salary + DA (monthly), e.g. 50000'],
                        ['B2', 'HRA received (monthly), e.g. 20000'],
                        ['B3', 'Rent paid (monthly), e.g. 18000'],
                        ['B4', '"Metro" or "Non-Metro"'],
                        ['B5', '=MIN(B2, B3-0.1*B1, IF(B4="Metro",0.5,0.4)*B1)'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 700, color: C.ink, width: 50 }}>{r[0]}</td>
                          <td style={{ ...tdR, fontFamily: r[0] === 'B5' ? 'monospace' : INTER }}>{r[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  Wrap the result in <code style={{ fontFamily: 'monospace', background: '#f4f5f6', padding: '1px 5px', borderRadius: 4 }}>MAX(0, ...)</code> if you want the sheet to handle a case where rent is lower than 10% of salary, since B can otherwise go negative.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="metro-vs-non-metro">Metro vs Non-Metro HRA Exemption</h2>
                <p style={p}>
                  The city classification matters because the third component of the HRA formula changes. Four cities are classified as metro for HRA purposes: Delhi, Mumbai, Chennai, and Kolkata. For these cities, the ceiling is 50 per cent of basic salary. For all other Indian cities and towns, the ceiling is 40 per cent of basic salary.
                </p>
                <p style={p}>
                  If you live in a metro city but work for a company headquartered elsewhere, your HRA ceiling depends on the city where you actually reside and pay rent, not where your employer is based. Bangalore, Hyderabad, Pune, and Ahmedabad are all classified as non-metro for HRA exemption, even though they are major metropolitan areas.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>HRA exemption percentage by city type</caption>
                    <thead><tr><th style={thS} scope="col">City Type</th><th style={thS} scope="col">Cities Included</th><th style={thS} scope="col">HRA Ceiling (% of Basic)</th></tr></thead>
                    <tbody>
                      {[
                        ['Metro', 'Delhi, Mumbai, Chennai, Kolkata', '50%'],
                        ['Non-Metro', 'Bangalore, Hyderabad, Pune, Ahmedabad, and all others', '40%'],
                      ].map(([t, c, pct]) => (
                        <tr key={t as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{t}</td>
                          <td style={tdR}>{c}</td>
                          <td style={{ ...tdR, fontWeight: 600 }}>{pct}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="hra-metro-satellite-towns">Does Gurgaon, Noida, or Navi Mumbai Count as Metro for HRA?</h2>
                <p style={p}>
                  No. The Section 10(13A) metro classification is tied to the municipal limits of the four named cities themselves, Delhi, Mumbai, Chennai, and Kolkata, not the wider metropolitan region around them.
                </p>
                <p style={p}>
                  Gurugram (Gurgaon), Noida, Ghaziabad, and Faridabad are all part of the National Capital Region and sit right next to Delhi, but none of them is Delhi for this formula, so they use the 40 per cent non-metro ceiling. The same applies to Navi Mumbai, Thane, and Kalyan around Mumbai, and to satellite areas around Chennai and Kolkata.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  This catches out a lot of employees who work for a Delhi-headquartered or Mumbai-headquartered company but actually live and pay rent in a satellite town. What matters for the exemption ceiling is the city where you reside and pay rent, and only the exact municipal area of the four named cities qualifies for the higher 50 per cent ceiling.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="hra-govt-employees">HRA for Government Employees: X, Y, Z City Classification</h2>
                <p style={p}>
                  Central government employees receive HRA under a completely separate classification system from the metro/non-metro exemption ceiling covered above, and confusing the two is a common mistake.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>7th Pay Commission HRA rates by city class, as a percentage of Basic Pay plus DA.</caption>
                    <thead><tr><th style={thS} scope="col">City Class</th><th style={thS} scope="col">Population</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">HRA Rate</th></tr></thead>
                    <tbody>
                      {[
                        ['X (8 cities)', '50 lakh and above: Delhi, Mumbai, Kolkata, Chennai, Bengaluru, Hyderabad, Ahmedabad, Pune', '24%'],
                        ['Y', '5 to 50 lakh', '16%'],
                        ['Z', 'Below 5 lakh', '8%'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={tdL}>{r[1]}</td>
                          <td style={{ ...tdR, fontWeight: 600 }}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  This X/Y/Z system decides how much HRA a government employee <em>receives</em>, it is not the exemption formula. A government employee in Bengaluru is in an X-class city and receives 24 per cent HRA, but Bengaluru is still non-metro for the Section 10(13A) exemption ceiling, so component C in the formula above still uses 40 per cent, not 50 per cent. The two systems only agree on Delhi, Mumbai, Kolkata, and Chennai, which are X-class under both.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="hra-calculation-example">HRA Calculation Example: Metro vs Non-Metro</h2>
                <p style={p}>
                  Consider an employee with basic salary of Rs 60,000 per month and HRA of Rs 25,000 per month, paying rent of Rs 22,000 per month.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>HRA calculation comparison: metro vs non-metro</caption>
                    <thead><tr><th style={thS} scope="col">Component</th><th style={thS} scope="col">Metro City</th><th style={thS} scope="col">Non-Metro City</th></tr></thead>
                    <tbody>
                      {[
                        ['Actual HRA Received', 'Rs 25,000', 'Rs 25,000'],
                        ['Rent minus 10% of Basic', 'Rs 22,000 minus Rs 6,000 = Rs 16,000', 'Rs 22,000 minus Rs 6,000 = Rs 16,000'],
                        ['Ceiling (% of Basic)', '50% = Rs 30,000', '40% = Rs 24,000'],
                        ['HRA Exemption', 'Rs 16,000 (lowest of the three)', 'Rs 16,000 (lowest of the three)'],
                        ['Taxable HRA', 'Rs 9,000', 'Rs 9,000'],
                      ].map(([comp, metroV, nonMetroV]) => (
                        <tr key={comp as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{comp}</td>
                          <td style={tdR}>{metroV}</td>
                          <td style={tdR}>{nonMetroV}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  In this example, the result is the same because the rent minus 10 per cent of basic (Rs 16,000) is the lowest in both cases. The metro ceiling only matters when rent is high relative to basic salary. Use the <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Old vs New Tax Regime Calculator</Link> to see whether opting for the old regime to claim HRA is worthwhile for your situation.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="hra-binding-constraint">Which Part of the Formula Actually Applies to You?</h2>
                <p style={p}>
                  Only one of the three values in the formula ever determines your exemption: whichever is smallest. Most employees never notice this because their salary structure keeps one component consistently lowest, but the binding constraint can be any of the three depending on your numbers.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Three scenarios showing which formula component binds, all metro city</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Scenario</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">A: HRA Received</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">B: Rent − 10% Basic</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">C: 50% Basic</th>
                        <th style={thS} scope="col">Exemption</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Low rent (basic Rs 50,000, HRA Rs 20,000, rent Rs 8,000)', 'Rs 20,000', 'Rs 3,000', 'Rs 25,000', 'B binds: Rs 3,000'],
                        ['High HRA, high rent (basic Rs 30,000, HRA Rs 25,000, rent Rs 40,000)', 'Rs 25,000', 'Rs 37,000', 'Rs 15,000', 'C binds: Rs 15,000'],
                        ['Low HRA relative to rent (basic Rs 80,000, HRA Rs 10,000, rent Rs 50,000)', 'Rs 10,000', 'Rs 42,000', 'Rs 40,000', 'A binds: Rs 10,000'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdL}>{r[0]}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{r[1]}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{r[2]}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{r[3]}</td>
                          <td style={{ ...tdR, fontWeight: 700 }}>{r[4]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  In practice, most salaried employees in metro cities with company-set HRA around 40-50 per cent of basic find that B, rent minus 10 per cent of salary, is the binding constraint, which is why increasing your declared rent (up to what you actually pay) is usually the most direct way to raise your exemption.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="hra-reference-table">HRA Exemption Reference Table by Basic Salary</h2>
                <p style={p}>
                  The table below shows the exemption at common basic salary levels, assuming HRA of 50 per cent of basic and rent of 55 per cent of basic, a structure high enough that the metro and non-metro ceilings genuinely differ. Enter your own numbers in the calculator above for an exact figure.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Illustrative monthly HRA exemption assuming HRA is 50% of basic and rent is 55% of basic</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Basic Salary</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">HRA Received</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Rent Paid</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Exemption (Metro)</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Exemption (Non-Metro)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Rs 20,000', 'Rs 10,000', 'Rs 11,000', 'Rs 9,000', 'Rs 8,000'],
                        ['Rs 30,000', 'Rs 15,000', 'Rs 16,500', 'Rs 13,500', 'Rs 12,000'],
                        ['Rs 40,000', 'Rs 20,000', 'Rs 22,000', 'Rs 18,000', 'Rs 16,000'],
                        ['Rs 50,000', 'Rs 25,000', 'Rs 27,500', 'Rs 22,500', 'Rs 20,000'],
                        ['Rs 75,000', 'Rs 37,500', 'Rs 41,250', 'Rs 33,750', 'Rs 30,000'],
                        ['Rs 1,00,000', 'Rs 50,000', 'Rs 55,000', 'Rs 45,000', 'Rs 40,000'],
                        ['Rs 1,50,000', 'Rs 75,000', 'Rs 82,500', 'Rs 67,500', 'Rs 60,000'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{r[1]}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{r[2]}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const, fontWeight: 700 }}>{r[3]}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const, fontWeight: 700 }}>{r[4]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  At this rent level, the metro exemption is consistently 5 per cent of basic salary higher than non-metro, because rent minus 10 per cent of salary (45 per cent of basic here) sits between the two ceilings: below the 50 per cent metro cap but above the 40 per cent non-metro cap, so metro exemption is capped by B while non-metro is capped by its lower ceiling. At lower rent-to-basic ratios, as in the earlier worked example, city classification often makes no difference at all.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="hra-tax-savings-by-slab">How Much Does HRA Actually Save You in Tax?</h2>
                <p style={p}>
                  The exemption amount itself is not the tax saving. The actual rupee saving is the exemption multiplied by your marginal tax rate, so the same exemption is worth very different amounts to different earners.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Annual tax saved from an Rs 1,56,000 HRA exemption (the Rs 13,000 monthly exemption from the worked example above), by old-regime tax slab, including 4% cess.</caption>
                    <thead><tr><th style={thS} scope="col">Marginal Tax Slab</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Effective Rate (incl. cess)</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Tax Saved</th></tr></thead>
                    <tbody>
                      {[
                        ['5%', '5.20%', 8112],
                        ['20%', '20.80%', 32448],
                        ['30%', '31.20%', 48672],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600 }}>{r[0]}</td>
                          <td style={tdR}>{r[1]}</td>
                          <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>{fmtC(r[2] as number)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  On a larger exemption, the gap widens further: the Rs 45,000-a-month metro exemption from the Rs 1,00,000-basic row of the reference table above, Rs 5,40,000 a year, saves about {fmtC(112320)} at the 20 per cent slab but about {fmtC(168480)} at the 30 per cent slab, a difference of over {fmtC(56160)} for an identical exemption amount. This is also why the old-versus-new regime decision matters more for higher earners with a large HRA component: the exemption is worth more to them in absolute rupees even at the same percentage.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="hra-rent-receipts">Rent Receipts and Landlord PAN Requirements</h2>
                <p style={p}>
                  To claim HRA exemption, you need proper documentation. If your annual rent is Rs 1,00,000 or less, you need rent receipts showing the landlord name, address, amount, and period of rent. If the annual rent exceeds Rs 1,00,000, you must provide the landlord PAN in addition to rent receipts. The landlord must also declare the rental income in their income tax return.
                </p>
                <p style={p}>
                  Without the landlord PAN, your employer may deduct TDS at a higher rate on the HRA component, and the income tax department may disallow the HRA exemption if the PAN requirement is not met. It is advisable to obtain the landlord PAN at the start of the tenancy to avoid last-minute issues during tax filing.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="hra-documents-checklist">Documents Required for HRA Exemption</h2>
                <p style={p}>
                  Beyond the rent receipts and landlord PAN already covered, keep these on hand for a smooth claim, whether your employer asks for them during the year or the income tax department asks during assessment.
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Rent agreement:</strong> a signed agreement covering the claim period, ideally registered if the tenancy runs 12 months or more.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Rent receipts:</strong> one for each month claimed, or a consolidated receipt covering the full period, signed by the landlord.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Landlord PAN:</strong> mandatory once annual rent crosses Rs 1,00,000. If the landlord has no PAN, a signed declaration from them is required instead.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Proof of payment:</strong> bank transfer records, UPI receipts, or cheque copies showing rent actually moving from you to the landlord. Cash payments are harder to substantiate if questioned.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Form 12BB:</strong> the declaration you submit to your employer at the start of the financial year (or when asked) listing your HRA claim along with other deduction declarations.</li>
                </ul>
                <p style={{ ...p, margin: 0 }}>
                  Keep copies even if your employer never explicitly requests them. If your employer&apos;s payroll team does not adjust HRA in your TDS for any reason, you can still submit these documents yourself while filing your return.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="hra-mid-year-change">HRA Exemption When Salary, Rent, or City Changes Mid-Year</h2>
                <p style={p}>
                  HRA exemption is not computed once a year on annual totals. It must be worked out separately for each period in which your basic salary, HRA, rent, or city of residence stays constant, then the period-wise amounts are added together. A single annual calculation can understate or overstate your real exemption whenever any of these change during the financial year.
                </p>
                <p style={p}>
                  <strong>Worked example:</strong> An employee spends April to September in Pune (non-metro) on a basic salary of Rs 40,000, HRA of Rs 16,000, and rent of Rs 15,000 a month. In October, they transfer to Mumbai (metro), with basic rising to Rs 45,000, HRA to Rs 22,500, and rent to Rs 28,000.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Period-wise HRA exemption when basic salary, rent, and city change mid-year</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Period</th>
                        <th style={thS} scope="col">City</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Monthly Exemption</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">6-Month Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['April to September', 'Pune (non-metro)', 'Rs 11,000', 'Rs 66,000'],
                        ['October to March', 'Mumbai (metro)', 'Rs 22,500', 'Rs 1,35,000'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={tdL}>{r[1]}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{r[2]}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const, fontWeight: 700 }}>{r[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  Total exemption for the year is Rs 66,000 plus Rs 1,35,000, or Rs 2,01,000. There is no single "annual basic" or "annual rent" figure you could plug into the formula once and get this same answer, since the Pune months use the 40 per cent non-metro ceiling and the Mumbai months use the 50 per cent metro ceiling. Run each stable period through the calculator above separately and add the results.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="hra-and-old-regime">HRA Under the Old Tax Regime</h2>
                <p style={p}>
                  HRA exemption under Section 10(13A) is available only under the old tax regime. The new tax regime, which has been the default since FY 2023-24, does not allow this exemption. If you want to claim HRA benefit, you must explicitly opt for the old regime when filing your ITR.
                </p>
                <p style={p}>
                  For salaried employees with significant HRA components, the old regime often results in lower total tax despite the higher slab rates, because the HRA exemption can reduce taxable income by thousands per month. This is especially true for employees in metro cities paying high rent relative to their basic salary.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="hra-with-home-loan">HRA When You Also Have a Home Loan</h2>
                <p style={p}>
                  You can claim HRA exemption and home loan interest deduction under Section 24(b) in the same year, as long as they relate to different situations. The common case is working in a city other than the one where you own a home loan property.
                </p>
                <p style={p}>
                  <strong>Worked example:</strong> An employee works in Bengaluru (non-metro) on a basic salary of Rs 60,000 a month, receives HRA of Rs 24,000, and pays rent of Rs 20,000 for a rented flat near the office. HRA exemption = min(Rs 24,000, Rs 20,000 minus Rs 6,000, Rs 24,000) = Rs 14,000 a month, or Rs 1,68,000 a year. Separately, they pay Rs 2,00,000 a year in interest on a home loan for a flat they own in another city, which is vacant or let out. Both the HRA exemption and the full Section 24(b) interest deduction can be claimed in the same return.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  The one situation where this does not work is claiming HRA for rent paid on the very same property your home loan financed. If you live in your own home loan property, you can claim the interest deduction, but not HRA, since you are not paying rent to anyone. Use the <Link href="/calculators/mortgage-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Mortgage Calculator</Link> to work out your home loan EMI and interest for the year.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="hra-rent-to-parents">Can You Pay Rent to Parents and Claim HRA?</h2>
                <p style={p}>
                  Yes, this is allowed, provided the arrangement is genuine and properly documented. The restriction in the conditions above is specifically on paying rent to a spouse, not to parents.
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>The property must actually belong to the parent, not to you or your spouse. You cannot pay rent to a parent for a house that is legally yours.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>Rent must genuinely move from you to your parent, ideally by bank transfer, not just exist as paperwork with no real payment.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>Your parent must declare the rent received as income from house property in their own tax return. They can claim a flat 30 per cent standard deduction against it, and deduct any home loan interest on that property, which often keeps their incremental tax low or nil.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>A simple rent agreement between you and your parent, plus the same rent receipts and landlord PAN rules covered above, still apply.</li>
                </ul>
                <p style={{ ...p, margin: 0 }}>
                  This is a commonly used, legitimate structure when an employee lives with parents who own the home: the employee claims HRA exemption on genuine rent paid, and the parent reports modest rental income that is often largely offset by the standard deduction and any home loan interest on the property. It does not work if the parents themselves are dependent on the employee and the "rent" is really just household money changing hands informally.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="hra-vs-80gg">HRA vs Section 80GG: What Is the Difference?</h2>
                <p style={p}>
                  Section 80GG is a deduction available to individuals who live in rented accommodation but do not receive HRA from their employer. This applies to self-employed professionals, freelancers, and employees whose salary structure does not include an HRA component. The deduction under Section 80GG is limited to the minimum of: rent paid minus 10 per cent of total income, Rs 5,000 per month, or 25 per cent of total income.
                </p>
                <p style={p}>
                  The key difference is that HRA exemption under Section 10(13A) is available only to salaried employees who receive HRA, while Section 80GG is available to any individual paying rent regardless of whether they receive HRA. The HRA exemption is also more generous because it is based on actual HRA and basic salary, with no upper cap of Rs 5,000 per month.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="hra-self-employed">Can Self-Employed Individuals and Freelancers Claim HRA?</h2>
                <p style={p}>
                  No, not under Section 10(13A). That exemption is written specifically for a salary component paid by an employer, so it does not exist for anyone without an employer-employee relationship: freelancers, consultants, business owners, and other self-employed professionals.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Section 80GG is the equivalent relief for this group. It works on total income rather than basic salary, and it caps the deduction at Rs 5,000 a month regardless of how high your actual rent is, which is why it is usually far less generous than a genuine HRA exemption would be for an equivalent income and rent.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="hra-for-nri">HRA for NRI Employees</h2>
                <p style={p}>
                  NRI employees earning salary income in India are eligible to claim HRA exemption under Section 10(13A) if they satisfy the conditions: they receive HRA as part of their salary, live in rented accommodation in India, and actually pay rent. The same calculation rules apply with metro and non-metro classifications.
                </p>
                <p style={p}>
                  NRIs should be aware that if they claim HRA exemption under the old regime, they forego the lower tax rates of the new regime. Since NRIs often have different income compositions, it is important to compare both regimes before deciding. The multi-currency selector in this calculator converts amounts to your preferred currency for easier understanding.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="hra-mistakes">Common HRA Claim Mistakes</h2>
                <div>
                  {[
                    ['Not having a rent agreement', 'A written rent agreement is the primary document for HRA claims. Verbal arrangements are not accepted by the income tax department during scrutiny. Ensure the agreement is registered if the lease is for 12 months or more.'],
                    ['Ignoring the landlord PAN requirement', 'If annual rent exceeds Rs 1,00,000, the landlord PAN is mandatory. Without it, the HRA claim can be disallowed. Obtain the PAN at the start of the tenancy itself.'],
                    ['Claiming HRA without actually paying rent', 'HRA exemption requires actual rent payment through bank transfer or other traceable means. Paying rent in cash to family members without declaration can lead to tax notice.'],
                    ['Not declaring rental income from sub-letting', 'If you receive rent from a sub-tenant while also claiming HRA, the rental income must be declared. The income tax department cross-references property data, and undeclared rental income can trigger an assessment.'],
                  ].map(([title, text]) => (
                    <div key={title as string} style={{ marginBottom: 14 }}>
                      <strong style={{ fontSize: 15, color: C.ink, display: 'block', marginBottom: 4 }}>{title}</strong>
                      <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="calculator-limitations">Limitations of This Calculator</h2>
                {[
                  ['It computes one stable period at a time:', 'If your basic salary, HRA, rent, or city changes mid-year, this calculator gives you the exemption for whichever set of numbers you enter, not an automatic year-wide blend. Run each stable period separately and add the results, as shown in the mid-year example above.'],
                  ['The annual tax saving is an estimate, not a slab-based computation:', 'The figure shown multiplies your monthly exemption by 12; it does not apply your actual marginal tax slab. Use the table in "How Much Does HRA Actually Save You in Tax?" above, or the Old vs New Tax Regime Calculator, for the real rupee impact at your slab.'],
                  ['Metro classification is a simple toggle, not an address lookup:', 'The calculator trusts whichever city type you select. It does not verify that your actual city (or satellite town, see the Gurgaon/Noida section above) genuinely qualifies as metro under Section 10(13A).'],
                  ['It does not check documentation eligibility:', 'The result assumes you can support the claim with a valid rent agreement, receipts, and landlord PAN where required. A mathematically correct exemption can still be disallowed on audit if the paperwork behind it is missing.'],
                ].map(([title, text]) => (
                  <div key={title} style={{ marginBottom: 14 }}>
                    <strong style={{ fontSize: 15, color: C.ink }}>{title}</strong>{' '}
                    <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                  </div>
                ))}
              </div>

              <div style={sec}>
                <h2 style={h2} id="key-takeaways">Key Takeaways</h2>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>HRA exemption is the smallest of three numbers, and for most metro-city employees with company-set HRA around 40-50 per cent of basic, it is rent minus 10 per cent of salary that actually binds, not the HRA you receive or the city ceiling.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>Only Delhi, Mumbai, Chennai, and Kolkata count as metro for the exemption ceiling, a narrower list than the eight X-class cities government employees use for their HRA rate, and narrower still than the wider metropolitan regions (Gurgaon, Noida, Navi Mumbai) people often assume are included.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>The exemption is only available under the old tax regime, so a large HRA claim is one of the main reasons the old regime can still beat the new regime despite its higher slab rates, worth checking on the Old vs New Tax Regime Calculator before assuming the new regime automatically wins.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>Documentation, not the formula, is where most real-world claims fail: a rent agreement, traceable rent payment, and landlord PAN above Rs 1 lakh annual rent are all required regardless of how the arithmetic works out.</li>
                </ul>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This HRA Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter basic salary:</strong> enter your monthly basic salary as shown in your salary slip. Basic salary is the foundation for the HRA calculation.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter HRA and rent:</strong> enter the monthly HRA amount your employer pays and the actual monthly rent you pay for your accommodation.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select city type:</strong> choose between metro (Delhi, Mumbai, Chennai, Kolkata) or non-metro. The calculator adjusts the ceiling automatically. Click More settings only if your Dearness Allowance counts towards retirement benefits.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>See the breakdown:</strong> the result panel shows the three components of the formula, the exempt amount, taxable HRA, and annual tax saving estimate.
                  </li>
                </ol>
                <p style={{ ...p, margin: 0 }}>
                  Click any value to type a precise number. Use the currency selector to view amounts in your preferred currency. The annual tax saving shown is an estimate based on your marginal tax rate.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="hra-glossary">HRA Glossary: Key Terms Explained</h2>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Term</th><th style={thS} scope="col">Meaning</th></tr></thead>
                    <tbody>
                      {[
                        ['Basic Salary', 'The core, non-allowance component of salary that the HRA exemption formula is calculated against, along with DA where applicable.'],
                        ['Dearness Allowance (DA)', 'An allowance mainly paid to government and PSU employees. Only counted in the HRA formula\'s "salary" figure if it counts towards retirement benefits.'],
                        ['Salary for HRA purposes', 'Basic salary plus DA (where applicable). This is the figure the 10% deduction and the 40%/50% ceiling are both calculated against, not your full CTC.'],
                        ['HRA Received', 'The actual House Rent Allowance amount paid by your employer, shown on your payslip. This is component A of the exemption formula.'],
                        ['HRA Exemption', 'The portion of HRA received that is not taxed, computed as the smallest of the three formula components under Section 10(13A).'],
                        ['Taxable HRA', 'HRA received minus the exemption. This portion is added to your taxable salary and taxed at your slab rate.'],
                        ['Binding Constraint', 'Whichever of the three formula components (A, B, or C) turns out smallest, and therefore actually determines your exemption.'],
                        ['Section 80GG', 'The rent deduction available to taxpayers who do not receive HRA, capped at Rs 5,000 a month, far less generous than a genuine HRA exemption.'],
                        ['Form 12BB', 'The declaration submitted to an employer listing HRA, 80C, and other deduction claims for the financial year, used to adjust TDS.'],
                      ].map((r) => (
                        <tr key={r[0]} style={{ background: C.white }}>
                          <td style={{ ...tdL, fontWeight: 600, whiteSpace: 'nowrap' }}>{r[0]}</td>
                          <td style={tdL}>{r[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              

              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All calculations on this page are indicative only. HRA exemption depends on your actual salary structure, rent paid, city classification, and compliance with documentation requirements under the Income Tax Act. This calculator is for educational and planning purposes only and does not constitute financial advice. Consult a SEBI-registered investment adviser or a qualified chartered accountant for personalised tax planning.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.hra-sidebar::-webkit-scrollbar{width:5px}.hra-sidebar::-webkit-scrollbar-track{background:transparent}.hra-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.hra-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="hra-sidebar" aria-label="Related calculators" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER, background: C.white }}>
                <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Quick Facts</span>
                </div>
                <div style={{ padding: '4px 16px' }}>
                  {[
                    ['Metro HRA ceiling', '50% of salary'],
                    ['Non-metro HRA ceiling', '40% of salary'],
                    ['Metro cities', 'Delhi, Mumbai, Chennai, Kolkata'],
                    ['Landlord PAN needed above', 'Rs 1L annual rent'],
                    ['Available in', 'Old regime only'],
                    ['No HRA? Use instead', 'Section 80GG, up to Rs 5,000/month'],
                  ].map(([label, val], i, arr) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, padding: '9px 0', borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                      <span style={{ fontSize: 12.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: C.dark, textAlign: 'right' }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
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

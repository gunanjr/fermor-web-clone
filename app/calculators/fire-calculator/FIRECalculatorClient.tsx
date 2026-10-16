'use client';

import { CHART_PAIR, seriesColor } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect, useCallback } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import { FAQBox } from '@/components/common/FAQBox';

/* ─── Palette ─────────────────────────────────────────────────── */
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

/* ─── Helpers ─────────────────────────────────────────────────── */
const fmtIN = (n: number) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(n));
const fmtC = (n: number) => {
  if (n >= 1e7) return `${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `${(n / 1e5).toFixed(2)} L`;
  return fmtIN(n);
};

/* ─── Types ───────────────────────────────────────────────────── */
interface TrajPoint { age: number; corpus: number; phase: 'acc' | 'wd'; }
interface Expense   { id: string; name: string; age: number; amount: number; }
interface FIREResult {
  annualExpense: number;
  annualExpenseAtRetirement: number;
  leanFIRE: number;
  standardFIRE: number;
  fatFIRE: number;
  coastFIRE: number;
  projectedCorpus: number;
  additionalSIPNeeded: number;
  onTrack: boolean;
  years: number;
  trajectory: TrajPoint[];
  fireAchievedAge: number | null;
  corpusRunsOutAge: number | null;
  sipAtRetirement: number;
}

/* ─── Math ────────────────────────────────────────────────────── */
function calcFIRE(
  monthlyExpense: number, currentAge: number, retireAge: number,
  lifeExpectancy: number, inflation: number, expectedReturn: number,
  postRetirementReturn: number, monthlySIP: number, stepUpRate: number,
  currentInvestments: number, annualLumpsum: number, lifeExpenses: Expense[],
): FIREResult | null {
  const years = retireAge - currentAge;
  if (years <= 0 || monthlyExpense <= 0) return null;

  const r = expectedReturn / 100 / 12;
  const annualExpense = monthlyExpense * 12;
  const annualExpenseAtRetirement = annualExpense * Math.pow(1 + inflation / 100, years);
  const leanFIRE     = annualExpenseAtRetirement * 20;
  const standardFIRE = annualExpenseAtRetirement * 25;
  const fatFIRE      = annualExpenseAtRetirement * 40;
  const coastFIRE    = standardFIRE / Math.pow(1 + expectedReturn / 100, years);

  const trajectory: TrajPoint[] = [];
  let corpus = currentInvestments;
  trajectory.push({ age: currentAge, corpus: Math.round(corpus), phase: 'acc' });
  let fireAchievedAge: number | null = null;

  for (let y = 1; y <= years; y++) {
    const age = currentAge + y;
    const monthly = monthlySIP * Math.pow(1 + stepUpRate / 100, y - 1);
    for (let m = 0; m < 12; m++) corpus = corpus * (1 + r) + monthly;
    corpus += annualLumpsum;
    for (const exp of lifeExpenses) {
      if (exp.age === age && exp.amount > 0) {
        corpus = Math.max(0, corpus - exp.amount * Math.pow(1 + inflation / 100, y));
      }
    }
    trajectory.push({ age, corpus: Math.round(corpus), phase: 'acc' });
    if (!fireAchievedAge && corpus >= standardFIRE) fireAchievedAge = age;
  }

  const projectedCorpus = Math.round(corpus);
  const sipAtRetirement = Math.round(monthlySIP * Math.pow(1 + stepUpRate / 100, Math.max(0, years - 1)));

  const postR = postRetirementReturn / 100 / 12;
  let wCorpus = corpus;
  let corpusRunsOutAge: number | null = null;
  const retYears = Math.max(0, lifeExpectancy - retireAge);

  for (let y = 1; y <= retYears; y++) {
    const mWithdraw = (annualExpenseAtRetirement * Math.pow(1 + inflation / 100, y)) / 12;
    for (let m = 0; m < 12; m++) {
      wCorpus = wCorpus * (1 + postR) - mWithdraw;
      if (wCorpus < 0 && !corpusRunsOutAge) { corpusRunsOutAge = retireAge + y; wCorpus = 0; }
    }
    trajectory.push({ age: retireAge + y, corpus: Math.round(Math.max(0, wCorpus)), phase: 'wd' });
  }

  const shortfall = standardFIRE - projectedCorpus;
  const n = years * 12;
  const additionalSIPNeeded = shortfall > 0 && r > 0 && n > 0
    ? Math.max(0, Math.round(shortfall / (((Math.pow(1 + r, n) - 1) / r) * (1 + r))))
    : 0;

  return {
    annualExpense: Math.round(annualExpense),
    annualExpenseAtRetirement: Math.round(annualExpenseAtRetirement),
    leanFIRE: Math.round(leanFIRE),
    standardFIRE: Math.round(standardFIRE),
    fatFIRE: Math.round(fatFIRE),
    coastFIRE: Math.round(coastFIRE),
    projectedCorpus,
    additionalSIPNeeded,
    onTrack: projectedCorpus >= standardFIRE,
    years,
    trajectory,
    fireAchievedAge,
    corpusRunsOutAge,
    sipAtRetirement,
  };
}

/* ─── Wealth Chart ────────────────────────────────────────────── */
interface TipState { svgX: number; svgY: number; pctX: number; pctY: number; age: number; corpus: number; phase: 'acc' | 'wd'; }

function WealthChart({ result, retireAge }: { result: FIREResult; retireAge: number }) {
  const [tip, setTip] = useState<TipState | null>(null);

  const pts = result.trajectory;
  if (pts.length < 2) return null;

  const accPts = pts.filter(p => p.phase === 'acc');
  const wdPts  = pts.filter(p => p.phase === 'wd');
  const maxCorpus = Math.max(...pts.map(p => p.corpus), result.standardFIRE) * 1.1;

  const W = 700, H = 260, PL = 62, PR = 16, PT = 22, PB = 38;
  const cW = W - PL - PR, cH = H - PT - PB;
  const minAge = pts[0].age, maxAge = pts[pts.length - 1].age;
  const toX = (a: number) => PL + ((a - minAge) / (maxAge - minAge)) * cW;
  const toY = (v: number) => PT + (1 - Math.min(v / maxCorpus, 1)) * cH;

  const accPath = accPts.map((p, i) => `${i === 0 ? 'M' : 'L'}${toX(p.age).toFixed(1)},${toY(p.corpus).toFixed(1)}`).join(' ');
  const accArea = `${accPath} L${toX(accPts[accPts.length - 1].age).toFixed(1)},${(PT + cH).toFixed(1)} L${toX(accPts[0].age).toFixed(1)},${(PT + cH).toFixed(1)}Z`;
  const wdAll  = [accPts[accPts.length - 1], ...wdPts];
  const wdPath = wdAll.map((p, i) => `${i === 0 ? 'M' : 'L'}${toX(p.age).toFixed(1)},${toY(p.corpus).toFixed(1)}`).join(' ');
  const wdArea = wdPts.length > 0 ? `${wdPath} L${toX(maxAge).toFixed(1)},${(PT + cH).toFixed(1)} L${toX(retireAge).toFixed(1)},${(PT + cH).toFixed(1)}Z` : '';

  const fireY   = toY(result.standardFIRE);
  const retireX = toX(retireAge);
  const gridFracs = [0, 0.25, 0.5, 0.75, 1];
  const span = maxAge - minAge;
  const step = span <= 20 ? 2 : span <= 40 ? 5 : 10;
  const xTicks: number[] = [];
  for (let a = Math.ceil(minAge / step) * step; a <= maxAge; a += step) xTicks.push(a);

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGRectElement>) => {
    const svg = (e.currentTarget as SVGRectElement).closest('svg') as SVGSVGElement;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const svgX = (relX / rect.width) * W;
    const rawAge = minAge + ((svgX - PL) / cW) * (maxAge - minAge);
    const nearest = pts.reduce((p, c) => Math.abs(c.age - rawAge) < Math.abs(p.age - rawAge) ? c : p);
    const nX = toX(nearest.age), nY = toY(nearest.corpus);
    setTip({ svgX: nX, svgY: nY, pctX: relX / rect.width, pctY: nY / H, age: nearest.age, corpus: nearest.corpus, phase: nearest.phase });
  }, [pts, minAge, maxAge, cW]);

  return (
    <div style={{ position: 'relative' }}>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', overflow: 'visible' }}
        onMouseLeave={() => setTip(null)}>
        <defs>
          <linearGradient id="fc-acc" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#101214" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#101214" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="fc-wd" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#7a8087" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#7a8087" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {wdPts.length > 0 && <rect x={retireX} y={PT} width={Math.max(0, W - PR - retireX)} height={cH} fill="#F9FAF8" />}

        {gridFracs.map(fr => {
          const y = PT + (1 - fr) * cH;
          const v = fr * maxCorpus;
          const lbl = v === 0 ? '0' : v >= 1e7 ? `${(v / 1e7).toFixed(1)}Cr` : `${(v / 1e5).toFixed(0)}L`;
          return (
            <g key={fr}>
              <line x1={PL} y1={y} x2={W - PR} y2={y} stroke={C.border} strokeWidth={1} />
              <text x={PL - 6} y={y + 4} textAnchor="end" style={{ fontSize: 10, fill: C.ink3, fontFamily: INTER }}>{lbl}</text>
            </g>
          );
        })}

        <path d={accArea} fill="url(#fc-acc)" />
        {wdArea && <path d={wdArea} fill="url(#fc-wd)" />}

        {fireY >= PT && fireY <= PT + cH && (
          <>
            <line x1={PL} y1={fireY} x2={W - PR} y2={fireY} stroke={C.lime2} strokeWidth={1.5} strokeDasharray="6,3" />
            <text x={W - PR - 5} y={fireY > PT + 14 ? fireY - 5 : fireY + 13}
              textAnchor="end" style={{ fontSize: 9, fill: C.lime2, fontWeight: 700, fontFamily: INTER }}>
              FIRE {fmtC(result.standardFIRE)}
            </text>
          </>
        )}

        <line x1={retireX} y1={PT} x2={retireX} y2={PT + cH} stroke={C.ink3} strokeWidth={1} strokeDasharray="5,3" />

        <path d={accPath} fill="none" stroke={C.dark} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        {wdPts.length > 0 && <path d={wdPath} fill="none" stroke={C.ink3} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />}

        <circle cx={retireX} cy={toY(accPts[accPts.length - 1].corpus)} r={5} fill={C.dark} stroke={C.white} strokeWidth={2.5} />

        <text x={retireX} y={PT + cH + 22} textAnchor="middle"
          style={{ fontSize: 9, fill: C.ink2, fontFamily: INTER, fontWeight: 600 }}>
          Retire {retireAge}
        </text>

        {xTicks.map(a => (
          <text key={a} x={toX(a)} y={H - PB + 16} textAnchor="middle"
            style={{ fontSize: 9, fill: C.ink3, fontFamily: INTER }}>{a}</text>
        ))}
        <text x={W / 2} y={H} textAnchor="middle" style={{ fontSize: 9, fill: C.ink3, fontFamily: INTER }}>Age</text>

        {tip && (
          <>
            <line x1={tip.svgX} y1={PT} x2={tip.svgX} y2={PT + cH} stroke="rgba(16,18,20,0.12)" strokeWidth={1} />
            <circle cx={tip.svgX} cy={tip.svgY} r={4.5} fill={tip.phase === 'acc' ? C.dark : C.ink3} stroke={C.white} strokeWidth={2} />
          </>
        )}

        <rect x={PL} y={PT} width={cW} height={cH} fill="transparent"
          style={{ cursor: 'crosshair' }} onMouseMove={handleMouseMove} />
      </svg>

      {tip && (
        <div style={{
          position: 'absolute',
          left: tip.pctX > 0.65 ? `calc(${tip.pctX * 100}% - 148px)` : `calc(${tip.pctX * 100}% + 14px)`,
          top: `calc(${tip.pctY * 100}% - 54px)`,
          background: '#F4F5F6', border: '1px solid #E3E6E8', color: '#101214',
          padding: '8px 13px', borderRadius: 9, fontSize: 12, fontFamily: INTER,
          pointerEvents: 'none', zIndex: 10, whiteSpace: 'nowrap',
          boxShadow: '0 4px 16px rgba(0,0,0,0.22)',
        }}>
          <div style={{ fontWeight: 700, marginBottom: 3 }}>Age {tip.age}</div>
          <div style={{ color: '#50565C', marginBottom: 2 }}>Wealth: {fmtC(tip.corpus)}</div>
          <div style={{ color: '#101214', fontSize: 11 }}>Target: {fmtC(result.standardFIRE)}</div>
        </div>
      )}
    </div>
  );
}

/* ─── Donut Chart ─────────────────────────────────────────────── */
function DonutChart({ segments, centerLabel, centerSub, size = 120, ariaLabel }: {
  segments: { color: string; pct: number; label: string }[];
  centerLabel: string; centerSub: string; size?: number; ariaLabel?: string;
}) {
  const cx = size / 2, cy = size / 2;
  const r = size * 0.33;
  const strokeW = size * 0.14;
  const total = segments.reduce((s, g) => s + g.pct, 0);
  const gapDeg = 3;
  let angleDeg = -90;

  const toX = (deg: number) => cx + r * Math.cos(deg * Math.PI / 180);
  const toY = (deg: number) => cy + r * Math.sin(deg * Math.PI / 180);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
      role="img" aria-label={ariaLabel || `Portfolio allocation: ${segments.map(s => `${s.label} ${s.pct}%`).join(', ')}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.border} strokeWidth={strokeW} />
      {segments.map((seg, i) => {
        if (!seg.pct) return null;
        const sweep = (seg.pct / total) * 360 - gapDeg;
        const s = angleDeg + gapDeg / 2;
        const e = s + sweep;
        angleDeg += (seg.pct / total) * 360;
        const large = sweep > 180 ? 1 : 0;
        return (
          <path key={i}
            d={`M ${toX(s).toFixed(2)},${toY(s).toFixed(2)} A ${r},${r} 0 ${large},1 ${toX(e).toFixed(2)},${toY(e).toFixed(2)}`}
            fill="none" stroke={seg.color} strokeWidth={strokeW} strokeLinecap="round" />
        );
      })}
      <text x={cx} y={cy + 2} textAnchor="middle"
        style={{ fontSize: size * 0.1, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>
        {centerLabel}
      </text>
      <text x={cx} y={cy + size * 0.135} textAnchor="middle"
        style={{ fontSize: size * 0.08, fill: C.ink3, fontFamily: INTER }}>
        {centerSub}
      </text>
    </svg>
  );
}

/* ─── Progress Donut (result panel) ──────────────────────────── */
function ProgressDonut({ pct }: { pct: number }) {
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const arc = (pct / 100) * circ;
  return (
    <svg role="img" aria-label={`Corpus progress: ${pct}% of FIRE number achieved`}
      width="212" height="212" viewBox="0 0 212 212" style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${arc.toFixed(2)} ${(circ - arc).toFixed(2)}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 12} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Progress</text>
      <text x={cx} y={cy + 16} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pct}%</text>
      <text x={cx} y={cy + 34} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>of FIRE number</text>
    </svg>
  );
}

/* ─── Asset Allocation Card ───────────────────────────────────── */
function AllocationCard({ currentAge, projectedCorpus, standardFIRE, mobile, open, onToggle }: {
  currentAge: number; projectedCorpus: number; standardFIRE: number; mobile: boolean;
  open: boolean; onToggle: () => void;
}) {
  const todayEquity = Math.min(85, Math.max(40, Math.round(100 - currentAge)));
  const todayGold   = 10;
  const todayDebt   = 100 - todayEquity - todayGold;

  const mkSegs = (eq: number, debt: number, gold: number) => [
    { pct: eq,   color: CHART_PAIR.primary,     label: 'Equity' },
    { pct: debt, color: CHART_PAIR.secondary,    label: 'Fixed Income' },
    { pct: gold, color: seriesColor(2),  label: 'Gold' },
  ];

  const panels = [
    { title: "TODAY'S PORTFOLIO", segs: mkSegs(todayEquity, todayDebt, todayGold), center: `${fmtC(projectedCorpus)}`, sub: 'Current' },
    { title: 'AT RETIREMENT',     segs: mkSegs(25, 65, 10),                        center: `${fmtC(standardFIRE)}`,   sub: 'FIRE Target' },
  ];

  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', marginBottom: 20, boxShadow: '0 2px 16px rgba(16,18,20,0.06)' }}>
      <button onClick={onToggle} aria-expanded={open} aria-controls="allocation-body"
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: mobile ? '18px 16px' : '22px 28px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, textAlign: 'left' }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: C.ink }}>Suggested Asset Allocation</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div id="allocation-body" style={{ padding: mobile ? '0 16px 18px' : '0 28px 22px', borderTop: `1px solid ${C.border}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: mobile ? 16 : 28, paddingTop: 24 }}>
            {panels.map(({ title, segs, center, sub }) => (
              <div key={title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', alignSelf: 'flex-start' }}>{title}</div>
                <DonutChart segments={segs} centerLabel={center} centerSub={sub} size={mobile ? 140 : 168}
                  ariaLabel={`${title}: ${segs.map(s => `${s.label} ${s.pct}%`).join(', ')}`} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9, width: '100%', maxWidth: 170 }}>
                  {segs.map(s => (
                    <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 12.5, color: C.ink2, flex: 1 }}>{s.label}</span>
                      <span style={{ fontSize: 12.5, fontWeight: 700, color: C.dark }}>{s.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── FIRE Milestone Timeline ─────────────────────────────────── */
function MilestoneTimeline({ result, currentAge, currentInvestments, mobile, open, onToggle }: {
  result: FIREResult; currentAge: number; currentInvestments: number; mobile: boolean;
  open: boolean; onToggle: () => void;
}) {
  const milestones = useMemo(() => {
    const pts = result.trajectory;
    const reach = (target: number) => {
      if (currentInvestments >= target) return currentAge;
      return pts.find(p => p.corpus >= target)?.age ?? null;
    };

    return [
      { label: 'Emergency Fund (6 months)', amount: result.annualExpense / 2 },
      { label: 'First Rs 10 Lakh',          amount: 1_000_000 },
      { label: 'First Rs 1 Crore',          amount: 10_000_000 },
      { label: 'Coast FIRE',                amount: result.coastFIRE },
      { label: '50% of FIRE Number',        amount: result.standardFIRE / 2 },
      { label: 'FIRE Number Achieved',      amount: result.standardFIRE, isFire: true },
      { label: 'Fat FIRE',                  amount: result.fatFIRE },
    ].filter(t => t.amount > 0).map(t => ({ ...t, age: reach(t.amount) }));
  }, [result, currentAge, currentInvestments]);

  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 16px rgba(16,18,20,0.06)', marginBottom: 20 }}>
      <button onClick={onToggle} aria-expanded={open} aria-controls="milestones-body"
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: mobile ? '16px 18px 12px' : '18px 28px 14px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, textAlign: 'left' }}>
        <div>
          <span style={{ fontSize: 16, fontWeight: 700, color: C.ink }}>FIRE Milestones</span>
          <span style={{ fontSize: 12, color: C.ink3, marginLeft: 8 }}>Your wealth journey, step by step</span>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
      <div id="milestones-body" style={{ padding: mobile ? '16px 18px' : '20px 28px', borderTop: `1px solid ${C.border}` }}>
        {milestones.map((m, i) => {
          const achieved = m.age !== null && m.age <= currentAge;
          const reachable = m.age !== null;
          const isLast = i === milestones.length - 1;
          const isFire = !!(m as { isFire?: boolean }).isFire;

          return (
            <div key={m.label} style={{ display: 'flex', gap: 16, position: 'relative' }}>
              {!isLast && (
                <div style={{
                  position: 'absolute', left: 10, top: 22, width: 2, bottom: -2,
                  background: achieved ? C.lime2 : C.border,
                }} />
              )}
              <div style={{
                flexShrink: 0, width: 22, height: 22, borderRadius: '50%', zIndex: 1, marginTop: 1,
                border: `2px solid ${achieved ? C.lime2 : reachable ? C.dark : C.border}`,
                background: achieved ? C.paleLime : C.white,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {achieved && (
                  <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden="true">
                    <polyline points="1.5,5 4,7.5 8.5,2" fill="none" stroke={C.dark} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {!achieved && isFire && reachable && (
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.dark }} />
                )}
              </div>
              <div style={{ flex: 1, paddingBottom: isLast ? 0 : 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: isFire ? 700 : 500, color: achieved ? C.dark : reachable ? C.ink : C.ink3 }}>
                      {m.label}
                    </div>
                    <div style={{ fontSize: 11.5, color: C.ink3, marginTop: 2 }}>Rs {fmtC(m.amount)}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: achieved ? C.lime2 : reachable ? C.dark : C.ink3, letterSpacing: '-0.01em' }}>
                      {m.age !== null ? `Age ${m.age}` : 'Beyond plan'}
                    </div>
                    <div style={{ fontSize: 11, color: C.ink3, marginTop: 2 }}>
                      {achieved ? 'Achieved' : m.age !== null ? `in ${m.age - currentAge} yrs` : ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      )}
    </div>
  );
}

/* ─── Life Expenses Table ─────────────────────────────────────── */
function LifeExpensesTable({ expenses, currentAge, onChange }: {
  expenses: Expense[]; currentAge: number;
  onChange: (expenses: Expense[]) => void;
}) {
  const add = () => onChange([...expenses, { id: Date.now().toString(), name: '', age: currentAge + 10, amount: 500000 }]);
  const del = (id: string) => onChange(expenses.filter(e => e.id !== id));
  const upd = (id: string, field: keyof Expense, val: string | number) =>
    onChange(expenses.map(e => e.id === id ? { ...e, [field]: val } : e));

  const inp: React.CSSProperties = {
    fontSize: 12, fontFamily: INTER, color: C.ink, background: '#F8FAFB',
    border: `1px solid ${C.border}`, borderRadius: 6, padding: '5px 8px',
    outline: 'none', width: '100%',
  };

  return (
    <div>
      <div style={{ fontSize: 11, color: C.ink3, marginBottom: 10, lineHeight: 1.5 }}>
        Big one-time outflows (home, car, education) in today's value. Inflation-adjusted automatically.
      </div>
      {expenses.length > 0 && (
        <div style={{ marginBottom: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 52px 88px 20px', gap: 6, marginBottom: 6 }}>
            {['Expense', 'Age', 'Amount', ''].map(h => (
              <span key={h} style={{ fontSize: 10, fontWeight: 600, color: C.ink3, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</span>
            ))}
          </div>
          {expenses.map(exp => (
            <div key={exp.id} style={{ display: 'grid', gridTemplateColumns: '1fr 52px 88px 20px', gap: 6, marginBottom: 6, alignItems: 'center' }}>
              <input style={inp} placeholder="e.g. Home" value={exp.name} onChange={e => upd(exp.id, 'name', e.target.value)} />
              <input style={inp} type="number" min={currentAge + 1} max={100} value={exp.age} onChange={e => upd(exp.id, 'age', +e.target.value)} />
              <input style={inp} type="number" min={0} value={exp.amount} onChange={e => upd(exp.id, 'amount', +e.target.value)} />
              <button onClick={() => del(exp.id)} aria-label="Remove expense" style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.ink3, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
      <button onClick={add} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: '6px 12px', cursor: 'pointer', fontFamily: INTER }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add expense
      </button>
    </div>
  );
}

/* ─── Slider ──────────────────────────────────────────────────── */
function Slider({ label, value, min, max, step, fmt, onChange }: {
  label: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = ((value - min) / (max - min)) * 100;
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 }}>
        <label htmlFor={editing ? id : `${id}-range`} style={{ fontSize: 13, color: C.ink2, fontWeight: 400 }}>{label}</label>
        {editing ? (
          <input id={id} autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            aria-label={`Enter ${label} value`}
            style={{ fontSize: 13, fontWeight: 700, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 7, padding: '4px 9px', width: 94, outline: 'none', color: C.dark, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${fmt(value)}. Click to edit.`}
            style={{ fontSize: 13, fontWeight: 700, color: C.dark, background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: '4px 11px', cursor: 'pointer', fontFamily: INTER, minWidth: 84, textAlign: 'center' }}
            onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#AAAAAA'; }}
            onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.border; }}>
            {fmt(value)}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 18, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 17, height: 17, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 2px 6px rgba(16,18,20,0.2)', pointerEvents: 'none', zIndex: 1 }} />
        <input id={`${id}-range`} type="range" min={min} max={max} step={step} value={value}
          aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
          onChange={e => onChange(+e.target.value)}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{ fontSize: 10, color: C.ink3 }}>{fmt(min)}</span>
        <span style={{ fontSize: 10, color: C.ink3 }}>{fmt(max)}</span>
      </div>
    </div>
  );
}

/* ─── Sidebar list ────────────────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <div style={{ padding: '14px 18px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ padding: '12px 18px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 13, color: C.ink2, transition: 'all 0.12s' }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = C.paleLime; (e.currentTarget as HTMLElement).style.color = C.dark; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink2; }}>
            {label}
          </div>
        </Link>
      ))}
    </div>
  );
}

const POPULAR = [
  { href: '/calculators/sip-calculator',              label: 'SIP Calculator' },
  { href: '/calculators/nps-calculator',              label: 'NPS Calculator' },
  { href: '/calculators/retirement-calculator',       label: 'Retirement Calculator' },
  { href: '/calculators/asset-allocation-calculator', label: 'Asset Allocation Calculator' },
  { href: '/calculators/ppf-calculator',              label: 'PPF Calculator' },
  { href: '/calculators/swp-calculator',              label: 'SWP Calculator' },
  { href: '/calculators/step-up-sip-calculator',      label: 'Step-Up SIP Calculator' },
];
const MORE = [
  { href: '/calculators/inflation-calculator',           label: 'Inflation Calculator' },
  { href: '/calculators/lumpsum-calculator',             label: 'Lumpsum Calculator' },
  { href: '/calculators/atal-pension-yojana-calculator', label: 'APY Calculator' },
  { href: '/calculators/epf-calculator',                 label: 'EPF Calculator' },
  { href: '/calculators/income-tax-calculator',          label: 'Income Tax Calculator' },
];

/* ─── CA CTA ─────────────────────────────────────────────────── */

/* ─── FAQ ─────────────────────────────────────────────────────── */
const FAQS = [
  { q: 'What is a FIRE number and how is it calculated?', a: 'A FIRE number is the invested corpus that can sustain your annual expenses indefinitely through withdrawals, typically using the 25x rule (annual expenses multiplied by 25, the inverse of a 4% withdrawal rate). It is calculated by projecting your current monthly expenses forward to your retirement age using an inflation rate, then multiplying the resulting annual figure by the chosen multiplier.' },
  { q: 'Is the 4% rule valid in India?', a: "The 4% rule was derived from US market data with inflation averaging 2-3%. India's CPI has averaged 5.5-6.5% over the last decade per RBI data, which makes a 4% withdrawal more aggressive here. Many planners targeting retirements longer than 30 years use a 3-3.5% withdrawal rate (28x-33x multiplier). The 25x shown is the minimum baseline, not the recommended ceiling." },
  { q: 'What is Coast FIRE?', a: 'Coast FIRE is the amount you need invested today that will compound to your full FIRE number by retirement age with no further contributions. Once reached, you can stop saving for retirement and only work to cover current expenses. It is particularly relevant for people in their 20s who start early and reach this milestone before 35.' },
  { q: 'What is Annual SIP Step-up and why does it matter?', a: 'A step-up means increasing your SIP by a fixed percentage each year. At 10% step-up, a starting SIP of Rs 15,000 becomes Rs 16,500 in year 2, Rs 18,150 in year 3, and so on. Over a 17-year horizon, a 10% annual step-up can roughly double the final corpus compared to a flat SIP at the same starting amount.' },
  { q: 'How does inflation change the FIRE number?', a: "Inflation is the most commonly underestimated variable. At 6% per year, expenses double in 12 years. If you spend Rs 50,000 per month today and retire in 17 years, your monthly need at retirement will be around Rs 1.35 lakh. The FIRE number is built on that future figure. Using 2-3% inflation significantly understates the required corpus." },
  { q: 'What return rate should I use after retirement?', a: 'Post-retirement portfolios typically shift toward fixed income, reducing equity exposure. A 60/40 equity-debt mix might return 8-9%. Using a lower post-retirement return (8%) than the accumulation rate (12%) is more realistic and builds in a margin for sequence-of-returns risk.' },
  { q: 'Should I include my home in the FIRE corpus?', a: "Only if you plan to sell or generate rental income from it. Owning your home removes rent from your expense calculation, which reduces your FIRE number. But the property value itself is not part of the investable corpus unless you monetize it. Most planners exclude the primary residence and adjust monthly expenses downward to reflect zero rent." },
  { q: 'What is the difference between Lean, Barista, and Fat FIRE?', a: 'Lean FIRE (20x) targets early retirement with lower spending, typically in a smaller city. Barista FIRE (12.5x) is semi-retirement where the corpus covers part of expenses and part-time work covers the rest. Fat FIRE (40x) builds a larger buffer drawing only 2.5% per year, leaving room for lifestyle growth and healthcare cost surprises.' },
  { q: 'Can I retire on Rs 5 crore in India?', a: "At a 4% withdrawal rate, Rs 5 crore generates Rs 20 lakh per year, or about Rs 1.67 lakh per month. Whether that covers your needs depends on when you retire. If you retire 15-20 years from now, your inflation-adjusted monthly expenses at that point will be significantly higher than today's Rs 50,000-70,000 estimate. Use this calculator to see the exact inflation-adjusted figure at your target retirement age." },
  { q: 'How do EPF and NPS count toward my FIRE corpus?', a: 'Your projected EPF balance and NPS corpus at retirement are part of your investable assets. Add both to the Existing Investments field to get a full picture of whether your SIP is on track. EPF at 8.25% per EPFO rates and NPS Tier I at 10-11% CAGR historically are meaningful contributors, especially for salaried earners with 15+ years of contributions.' },
  { q: 'What risks does a FIRE number not account for?', a: "Sequence-of-returns risk is the biggest: a major market fall in the first two or three years of retirement is far more damaging than one later, because you are drawing down at low prices. Healthcare cost inflation in India runs at 10-14% annually, well above CPI. Longevity risk means a 25-30 year projection may not be long enough if you retire at 40 and live to 90. Build a 15-20% buffer above your FIRE number." },
  { q: 'At what age should I start planning for FIRE?', a: "Starting at 22 versus 30 gives you 8 extra years of compounding. At 12% annual return, money doubles roughly every 6 years. Starting earlier means dramatically less monthly saving for the same corpus. Even beginning at 35 with aggressive saving and a step-up SIP can pull forward a standard retirement age meaningfully." },
  { q: 'What is Barista FIRE and how does it work?', a: "Barista FIRE (the name comes from working a low-stress part-time job like a barista while your corpus is partially invested) is when your corpus covers roughly 50-60% of your expenses at a 4% withdrawal rate, and part-time income covers the rest. The 12.5x multiplier reflects that only half your expenses come from the corpus. It lets you leave a high-pressure career early without needing a full 25x corpus." },
  { q: 'How much should I save monthly to reach my FIRE number?', a: 'It depends on your current corpus, years to retirement, and expected return, but the calculator solves for this directly: enter your target retirement age and it shows the SIP needed to close the gap. As a rule of thumb, at a 12% return, money roughly doubles every 6 years (the Rule of 72), so starting 6 years earlier can cut the required monthly SIP nearly in half for the same target corpus.' },
  { q: 'How are withdrawals from my FIRE corpus taxed in India?', a: 'Equity mutual fund gains held over 12 months are taxed as long-term capital gains at 12.5% on amounts above Rs 1.25 lakh per financial year, under the Finance (No. 2) Act, 2024. Debt fund gains are taxed at your income slab rate regardless of holding period. Structuring withdrawals through a Systematic Withdrawal Plan (SWP) spreads redemptions across years, which helps use the Rs 1.25 lakh exemption repeatedly instead of triggering a large one-time gain.' },
  { q: 'Should I use an SWP or lump sum withdrawal after reaching FIRE?', a: 'A Systematic Withdrawal Plan (SWP) that pays out monthly is generally better than lump sum withdrawals for a FIRE corpus, since it keeps the remaining balance invested and compounding while you draw a fixed income. Lump sum withdrawals also crystallize capital gains tax in one year rather than spreading it, which typically means a higher effective tax rate than staggered SWP redemptions.' },
  { q: 'How do the 2026 NPS withdrawal rules affect FIRE planning?', a: 'PFRDA now allows non-government NPS subscribers to withdraw up to 80% of the corpus as a lump sum at exit, up from the earlier 60% cap, with a minimum of 20% still mandatorily annuitized. Tax law under Section 10(12A) has not been updated to match: only 60% of the withdrawal remains tax-free, so the additional 20% lump sum is taxed at your income slab rate. Factor this into your post-FIRE cash flow if NPS is part of your corpus.' },
  { q: 'How does health insurance factor into a FIRE plan in India?', a: 'Once you leave a salaried job, employer-provided group health cover typically ends, so a standalone family floater policy becomes essential before you retire early. Healthcare cost inflation in India runs at 10-14% annually, well above general CPI, which means a policy sized for today\'s medical costs will fall short 15-20 years into retirement. Most FIRE planners budget a separate health insurance premium line item and a medical emergency buffer outside the core FIRE corpus.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform built for India. All calculators are free to use, with a free account available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ════════════════════════════════════════════════════════════════ */
export default function FIRECalculatorClient() {
  const defaultSettings = { monthlyExpense: 40000, currentAge: 28, retireAge: 45, lifeExpectancy: 80, inflation: 6, expectedReturn: 12, postReturnRate: 8, monthlySIP: 15000, stepUpRate: 10, currentInvestments: 500000, annualLumpsum: 0, lifeExpenses: [], inputStep: 1 };
  const { settings, updateSettings } = useCalculatorSettings('fire-calculator', defaultSettings);
  const { monthlyExpense, currentAge, retireAge, lifeExpectancy, inflation, expectedReturn, postReturnRate, monthlySIP, stepUpRate, currentInvestments, annualLumpsum, lifeExpenses, inputStep } = settings;
  const setMonthlyExpense = (v: number) => updateSettings({ monthlyExpense: v });
  const setCurrentAge = (v: number) => updateSettings({ currentAge: v });
  const setRetireAge = (v: number) => updateSettings({ retireAge: v });
  const setLifeExpectancy = (v: number) => updateSettings({ lifeExpectancy: v });
  const setInflation = (v: number) => updateSettings({ inflation: v });
  const setExpectedReturn = (v: number) => updateSettings({ expectedReturn: v });
  const setPostReturnRate = (v: number) => updateSettings({ postReturnRate: v });
  const setMonthlySIP = (v: number) => updateSettings({ monthlySIP: v });
  const setStepUpRate = (v: number) => updateSettings({ stepUpRate: v });
  const setCurrentInvestments = (v: number) => updateSettings({ currentInvestments: v });
  const setAnnualLumpsum = (v: number) => updateSettings({ annualLumpsum: v });
  const setLifeExpenses = (v: Expense[]) => updateSettings({ lifeExpenses: v as never[] });
  const setInputStep = (v: number) => updateSettings({ inputStep: v });
  const [mobile, setMobile] = useState(false);
  const [showChart, setShowChart] = useState(true);
  const [showAllocation, setShowAllocation] = useState(true);
  const [showMilestones, setShowMilestones] = useState(true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const result = useMemo(
    () => calcFIRE(monthlyExpense, currentAge, retireAge, lifeExpectancy, inflation, expectedReturn, postReturnRate, monthlySIP, stepUpRate, currentInvestments, annualLumpsum, lifeExpenses),
    [monthlyExpense, currentAge, retireAge, lifeExpectancy, inflation, expectedReturn, postReturnRate, monthlySIP, stepUpRate, currentInvestments, annualLumpsum, lifeExpenses],
  );

  const corpusPct = result && result.standardFIRE > 0
    ? Math.min(100, Math.round((result.projectedCorpus / result.standardFIRE) * 100))
    : 0;

  const inputPad = mobile ? '20px 18px' : '24px 26px';

  /* ── Article styles ── */
  const h2  = { fontSize: mobile ? 17 : 19, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const p   = { fontSize: 14.5, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' } as React.CSSProperties;
  const sec = { margin: '0 0 36px' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top' as const, whiteSpace: 'nowrap' as const } as React.CSSProperties;

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
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            FIRE Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate your Financial Independence, Retire Early number. Know your FIRE corpus, track your journey milestone by milestone.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          {/* ── MAIN COLUMN ── */}
          <div style={{ minWidth: 0 }}>

            {/* CALCULATOR CARD */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* ── INPUTS ── */}
                <div style={{
                  padding: inputPad,
                  borderRight: mobile ? 'none' : `1px solid ${C.border}`,
                  borderBottom: mobile ? `1px solid ${C.border}` : 'none',
                  display: 'flex', flexDirection: 'column',
                }}>
                  <div style={{ marginBottom: 20 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: C.ink3, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                      {inputStep === 1 ? 'CORE INPUTS' : 'ADVANCED SETTINGS'}
                    </span>
                  </div>

                  {inputStep === 1 && (
                    <>
                      <Slider label="Monthly Expenses" value={monthlyExpense} min={5000} max={500000} step={1000} fmt={v => `Rs ${fmtC(v)}`} onChange={setMonthlyExpense} />
                      <Slider label="Current Age" value={currentAge} min={18} max={60} step={1} fmt={v => `${v} Yr`} onChange={setCurrentAge} />
                      <Slider label="Retirement Age" value={retireAge} min={30} max={70} step={1} fmt={v => `${v} Yr`} onChange={setRetireAge} />
                      <Slider label="Life Expectancy" value={lifeExpectancy} min={60} max={100} step={1} fmt={v => `${v} Yr`} onChange={setLifeExpectancy} />
                      <Slider label="Monthly SIP" value={monthlySIP} min={0} max={200000} step={1000} fmt={v => `Rs ${fmtC(v)}`} onChange={setMonthlySIP} />
                    </>
                  )}

                  {inputStep === 2 && (
                    <>
                      <Slider label="Existing Investments" value={currentInvestments} min={0} max={10000000} step={50000} fmt={v => `Rs ${fmtC(v)}`} onChange={setCurrentInvestments} />
                      <Slider label="Expected Return (p.a.)" value={expectedReturn} min={5} max={20} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={setExpectedReturn} />
                      <Slider label="Inflation Rate (p.a.)" value={inflation} min={3} max={15} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={setInflation} />
                      <Slider label="Annual SIP Step-up" value={stepUpRate} min={0} max={25} step={1} fmt={v => `${v}%`} onChange={setStepUpRate} />
                      <Slider label="Annual Lumpsum (Bonus)" value={annualLumpsum} min={0} max={2000000} step={10000} fmt={v => `Rs ${fmtC(v)}`} onChange={setAnnualLumpsum} />
                      <Slider label="Post-Retirement Return" value={postReturnRate} min={4} max={14} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={setPostReturnRate} />
                      <div style={{ marginBottom: 16 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>MAJOR LIFE EXPENSES</div>
                        <LifeExpensesTable expenses={lifeExpenses} currentAge={currentAge} onChange={setLifeExpenses} />
                      </div>
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

                {/* ── RESULTS ── */}
                <div style={{ padding: mobile ? '20px 18px' : '24px 26px', display: 'flex', flexDirection: 'column', gap: 11 }}>

                  {/* Donut - corpus progress */}
                  {result && (
                    <div style={{ order: mobile ? 1 : -1, display: 'flex', justifyContent: 'center', paddingBottom: 4 }}>
                      <ProgressDonut pct={corpusPct} />
                    </div>
                  )}
                  {/* Donut legend */}
                  {result && (
                    <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 20, justifyContent: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                        <span style={{ fontSize: 12, color: C.ink2 }}>Projected</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                        <span style={{ fontSize: 12, color: C.ink2 }}>Remaining</span>
                      </div>
                    </div>
                  )}

                  <div style={{ background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 13, padding: '18px 20px' }}>
                    <div style={{ fontSize: 10, color: '#7A8087', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 7 }}>
                      FIRE Number (25x)
                    </div>
                    <div aria-live="polite" aria-label={result ? `FIRE number: Rs ${fmtC(result.standardFIRE)}` : 'Set retirement age greater than current age'}
                      style={{ fontSize: mobile ? 30 : 40, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 7 }}>
                      {result ? `Rs ${fmtC(result.standardFIRE)}` : 'N/A'}
                    </div>
                    <div style={{ fontSize: 11.5, color: '#7A8087' }}>
                      {result
                        ? `${result.years} yrs · Expense at ${retireAge}: Rs ${fmtC(result.annualExpenseAtRetirement)}/yr`
                        : 'Set retirement age greater than current age'}
                    </div>
                  </div>

                  {result && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      <div style={{ background: '#F8FAFB', border: `1px solid ${C.border}`, borderRadius: 11, padding: '12px 14px' }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: C.ink3, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Projected Corpus</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: C.dark, letterSpacing: '-0.02em' }}>Rs {fmtC(result.projectedCorpus)}</div>
                        <div style={{ fontSize: 10.5, color: C.ink3, marginTop: 3 }}>at age {retireAge}</div>
                      </div>
                      <div style={{
                        background: result.onTrack ? C.paleLime : '#F8FAFB',
                        border: `1px solid ${result.onTrack ? C.lime2 : C.border}`,
                        borderRadius: 11, padding: '12px 14px',
                      }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: C.ink3, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>FIRE Status</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: C.dark }}>
                          {result.onTrack ? 'On Track' : 'Off Track'}
                        </div>
                        <div style={{ fontSize: 10.5, color: C.ink2, marginTop: 3 }}>
                          {result.onTrack ? `retire at ${retireAge}` : `need +Rs ${fmtC(result.additionalSIPNeeded)}/mo`}
                        </div>
                      </div>
                    </div>
                  )}

                  {result && (
                    <div>
                      {([
                        { label: 'Annual Expense',          value: `Rs ${fmtC(result.annualExpense)}`,             note: 'today' },
                        { label: `Expense at ${retireAge}`, value: `Rs ${fmtC(result.annualExpenseAtRetirement)}`, note: 'inflation adj.' },
                        { label: 'Lean FIRE (20x)',         value: `Rs ${fmtC(result.leanFIRE)}` },
                        { label: 'Fat FIRE (40x)',          value: `Rs ${fmtC(result.fatFIRE)}` },
                        { label: 'Coast FIRE',              value: `Rs ${fmtC(result.coastFIRE)}`,                 note: "today's value" },
                        { label: 'SIP at retirement',       value: `Rs ${fmtC(result.sipAtRetirement)}/mo`,        note: `${result.years * 12} SIPs` },
                      ] as { label: string; value: string; note?: string }[]).map(({ label, value, note }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: `1px solid ${C.border}` }}>
                          <span style={{ fontSize: 12.5, color: C.ink2 }}>{label}</span>
                          <div style={{ textAlign: 'right', minWidth: 110 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{value}</div>
                            {note && <div style={{ fontSize: 10, color: C.ink3, marginTop: 1 }}>{note}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {result && (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                        <span style={{ fontSize: 11, color: C.ink3 }}>Corpus progress</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: C.dark }}>{corpusPct}% of FIRE</span>
                      </div>
                      <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`Corpus progress is ${corpusPct}% of FIRE number`}>
                        <div style={{ height: '100%', width: `${corpusPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                        <span style={{ fontSize: 10, color: C.ink3 }}>Rs {fmtC(result.projectedCorpus)}</span>
                        <span style={{ fontSize: 10, color: C.ink3 }}>Rs {fmtC(result.standardFIRE)}</span>
                      </div>
                    </div>
                  )}

                  {result && result.corpusRunsOutAge && (
                    <div style={{ background: '#FFF4E5', border: '1px solid #FFD8A8', borderRadius: 9, padding: '9px 13px' }}>
                      <span style={{ fontSize: 11.5, color: '#A15C00', fontWeight: 600 }}>
                        At life expectancy {lifeExpectancy}, corpus runs out at age {result.corpusRunsOutAge}. Increase SIP, return, or lower withdrawal to close the gap.
                      </span>
                    </div>
                  )}

                  {!result && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, minHeight: 160, color: C.ink3, fontSize: 14 }}>
                      Set a retirement age greater than your current age.
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* WEALTH CHART */}
            {result && (
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', marginBottom: 20, boxShadow: '0 2px 16px rgba(16,18,20,0.06)' }}>
                <button onClick={() => setShowChart(v => !v)}
                  aria-expanded={showChart} aria-controls="wealth-chart-body"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: mobile ? '18px 16px' : '20px 26px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, flexWrap: 'wrap', textAlign: 'left' }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>Wealth Trajectory</span>
                  {result.fireAchievedAge && (
                    <span style={{ fontSize: 11, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '2px 9px', borderRadius: 20 }}>
                      FIRE at {result.fireAchievedAge}
                    </span>
                  )}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    aria-hidden="true" style={{ marginLeft: 'auto', transform: showChart ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {showChart && (
                  <div id="wealth-chart-body" style={{ padding: mobile ? '0 16px 18px' : '0 26px 20px', borderTop: `1px solid ${C.border}` }}>
                    <div style={{ display: 'flex', gap: 16, marginTop: 14, marginBottom: 12, flexWrap: 'wrap' }}>
                      {[{ color: C.dark, label: 'Accumulation' }, { color: C.ink3, label: 'Withdrawal' }].map(({ color, label }) => (
                        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 18, height: 2.5, background: color, borderRadius: 2 }} />
                          <span style={{ fontSize: 11, color: C.ink2 }}>{label}</span>
                        </div>
                      ))}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <svg width="18" height="5" viewBox="0 0 18 5" aria-hidden="true"><line x1="0" y1="2.5" x2="18" y2="2.5" stroke={C.lime2} strokeWidth="2" strokeDasharray="5,2" /></svg>
                        <span style={{ fontSize: 11, color: C.ink2 }}>FIRE number</span>
                      </div>
                      <span style={{ fontSize: 11, color: C.ink3, marginLeft: 'auto' }}>Hover for details</span>
                    </div>
                    <WealthChart result={result} retireAge={retireAge} />
                  </div>
                )}
              </div>
            )}

            {/* ASSET ALLOCATION */}
            {result && (
              <AllocationCard
                currentAge={currentAge}
                projectedCorpus={result.projectedCorpus}
                standardFIRE={result.standardFIRE}
                mobile={mobile}
                open={showAllocation}
                onToggle={() => setShowAllocation(v => !v)}
              />
            )}

            {/* MILESTONES */}
            {result && (
              <MilestoneTimeline
                result={result}
                currentAge={currentAge}
                currentInvestments={currentInvestments}
                mobile={mobile}
                open={showMilestones}
                onToggle={() => setShowMilestones(v => !v)}
              />
            )}

            {/* WAITLIST + CA CTA */}
            <div style={{ marginBottom: 32 }}><SaveResultsCard mobile={mobile} /></div>

            {/* ARTICLE */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              {/* Section 1 */}
              <div style={sec} id="what-is-fire">
                <h2 style={h2}>What Is FIRE?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    FIRE (Financial Independence, Retire Early) is a strategy of saving and investing aggressively, typically 50-70% of income, until your portfolio generates enough annual return to cover all living expenses indefinitely, making paid work optional well before the standard retirement age of 60.
                  </p>
                </div>
                <p style={p}>The core benchmark is a corpus equal to 25 times your annual expenses, drawn down at 4% per year. A diversified portfolio at that withdrawal rate has historically sustained withdrawals for 30+ years across most market cycles, per the original 1994 research by financial planner William Bengen that established this rule.</p>
                <p style={p}>India's version is more demanding. Higher inflation (India's CPI averaged 5.7% annually over the past decade per <a href="https://rbi.org.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>RBI data</a>), absent social security, and healthcare cost inflation running at 10-14% annually mean the 25x baseline is a starting point, not a comfortable endpoint.</p>
              </div>

              {/* Section 2 */}
              <div style={sec} id="fire-number-formula">
                <h2 style={h2}>The FIRE Number Formula</h2>
                <p style={p}>Your FIRE number is calculated in two steps: first inflation-adjust your current expenses to retirement date, then multiply by 25.</p>
                <div style={{ fontFamily: 'monospace', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 16px', marginBottom: 14 }}>
                  <div style={{ fontSize: 13, color: C.ink2, marginBottom: 6 }}>Step 1: Expense at Retirement = (Monthly Expense x 12) x (1 + Inflation)^Years</div>
                  <div style={{ fontSize: 13, color: C.ink2 }}>Step 2: FIRE Number = Annual Expense at Retirement x 25</div>
                </div>
                <p style={p}>Example: Monthly expenses of Rs 50,000 today, 6% inflation, retiring in 15 years. Annual expense at retirement = Rs 6 lakh x 2.40 = Rs 14.38 lakh. FIRE number = Rs 14.38 lakh x 25 = Rs 3.59 Cr.</p>
                <p style={p}>The 25x multiplier comes from inverting the 4% withdrawal rate: 1 divided by 0.04 equals 25. Inverting 3.5% gives 28.6x, and 3% gives 33.3x: the conservative buffers many Indian FIRE planners use instead.</p>
              </div>

              {/* Section 3 */}
              <div style={sec} id="fire-variants">
                <h2 style={h2}>FIRE Variants: Lean, Barista, Fat and Coast FIRE</h2>
                <p style={p}>Five FIRE variants target different spending levels, each with a different multiplier and withdrawal rate:</p>
                <div style={{ overflowX: 'auto', marginBottom: 8 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, textAlign: 'left', paddingTop: 8 }}>
                      Multiplier assumes 100% of expenses come from corpus except Barista FIRE where part-time income covers the remainder.
                    </caption>
                    <thead>
                      <tr>
                        {['Type', 'Multiplier', 'Withdrawal Rate', 'Who It Suits'].map(h => <th key={h} style={thS} scope="col">{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Lean FIRE',     '20x',   '5%',             'Frugal retirement, smaller cities, minimal dependents'],
                        ['Barista FIRE',  '12.5x', '4% + part-time', 'Semi-retirement: corpus covers 50%, part-time income covers the rest'],
                        ['Standard FIRE', '25x',   '4%',             'Full retirement on corpus alone, standard target'],
                        ['Fat FIRE',      '40x',   '2.5%',           'High spending with large safety buffer, no lifestyle compromises'],
                        ['Coast FIRE',    'Varies', '0% now',        'Invested corpus grows to FIRE target by retirement with no further contributions'],
                      ].map(([type, mult, wd, desc], i) => (
                        <tr key={type}>
                          <td style={{ ...tdR, fontWeight: 700 }}>{type}</td>
                          <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>{mult}</td>
                          <td style={tdL}>{wd}</td>
                          <td style={tdL}>{desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 4 */}
              <div style={sec} id="four-percent-rule-india">
                <h2 style={h2}>Is the 4% Rule Valid for India?</h2>
                <p style={p}>The 4% rule is aggressive for India. It was calibrated on US equity and bond return data from 1926-1994, with inflation averaging 2-3%. India's CPI averaged 5.7% over the past decade, nearly three times higher. At 5.7% inflation, expenses double in about 12.5 years, meaning your withdrawals grow much faster than in the US model.</p>
                <p style={p}>Many Indian FIRE planners default to a 3-3.5% withdrawal rate, corresponding to a 28x-33x multiplier. For a 40-year-old retiring at 45 with a 45-year retirement horizon, the 4% rule has failed in many historical scenarios due to sustained high inflation. The 3% rule has succeeded in almost all.</p>
                <p style={p}>This calculator uses 25x (4% withdrawal) as the standard FIRE number because it is the most cited benchmark and a good planning anchor. Think of it as the minimum, not the target, for a comfortable, inflation-proof Indian retirement.</p>
              </div>

              {/* Section 5 */}
              <div style={sec} id="fire-by-expense">
                <h2 style={h2}>FIRE Number by Monthly Expense: Reference Table</h2>
                <p style={p}>The table below shows your FIRE number at different spending levels, assuming 6% annual inflation over 15 years. All figures assume the 25x standard multiplier.</p>
                <div style={{ overflowX: 'auto', marginBottom: 8 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, textAlign: 'left', paddingTop: 8 }}>
                      Assumes 6% annual inflation, 15-year horizon to retirement, 25x FIRE multiplier.
                    </caption>
                    <thead>
                      <tr>
                        {['Monthly Expense (Today)', 'At Retirement (15yr, 6%)', 'FIRE Number (25x)', 'Lean FIRE (20x)', 'Fat FIRE (40x)'].map(h => <th key={h} style={{ ...thS, textAlign: h === 'Monthly Expense (Today)' ? 'left' : 'right' as const }} scope="col">{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Rs 25,000',  'Rs 59,914',   'Rs 1.80 Cr',  'Rs 1.44 Cr', 'Rs 2.88 Cr'],
                        ['Rs 40,000',  'Rs 95,862',   'Rs 2.88 Cr',  'Rs 2.30 Cr', 'Rs 4.60 Cr'],
                        ['Rs 50,000',  'Rs 1.20 lakh','Rs 3.59 Cr',  'Rs 2.87 Cr', 'Rs 5.75 Cr'],
                        ['Rs 75,000',  'Rs 1.80 lakh','Rs 5.39 Cr',  'Rs 4.31 Cr', 'Rs 8.62 Cr'],
                        ['Rs 1 lakh',  'Rs 2.40 lakh','Rs 7.19 Cr',  'Rs 5.75 Cr', 'Rs 11.50 Cr'],
                        ['Rs 1.5 lakh','Rs 3.59 lakh','Rs 10.78 Cr', 'Rs 8.63 Cr', 'Rs 17.25 Cr'],
                      ].map(([exp, ret, fire, lean, fat]) => (
                        <tr key={exp}>
                          <td style={{ ...tdL, whiteSpace: 'nowrap' }}>{exp}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{ret}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const, fontWeight: 700, color: C.dark }}>{fire}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{lean}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{fat}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {promoBar('/calculators/step-up-sip-calculator', 'Step-Up SIP Calculator', 'See how increasing your SIP by 10% each year changes your FIRE timeline.')}

              {/* Section 6 */}
              <div style={sec} id="inflation-fire">
                <h2 style={h2}>How Inflation Changes Your FIRE Number</h2>
                <p style={p}>The inflation rate you assume is the single most powerful input in FIRE planning. A 2% difference in the inflation assumption can change your FIRE number by 30-50%. The table below shows the impact on a Rs 50,000/month expense level over 15 years.</p>
                <div style={{ overflowX: 'auto', marginBottom: 8 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, textAlign: 'left', paddingTop: 8 }}>
                      Base: Rs 50,000/month current expenses, 15-year horizon, 25x multiplier.
                    </caption>
                    <thead>
                      <tr>
                        {['Inflation Rate', 'Monthly at Retirement', 'Annual at Retirement', 'FIRE Number (25x)'].map(h => <th key={h} style={{ ...thS, textAlign: h === 'Inflation Rate' ? 'left' : 'right' as const }} scope="col">{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['4% (optimistic)',   'Rs 90,047',   'Rs 10.81 lakh', 'Rs 2.70 Cr'],
                        ['5%',                'Rs 1.04 lakh','Rs 12.47 lakh', 'Rs 3.12 Cr'],
                        ['6% (RBI mid-range)','Rs 1.20 lakh','Rs 14.38 lakh', 'Rs 3.59 Cr'],
                        ['7%',                'Rs 1.38 lakh','Rs 16.55 lakh', 'Rs 4.14 Cr'],
                        ['8%',                'Rs 1.59 lakh','Rs 19.03 lakh', 'Rs 4.76 Cr'],
                        ['10%',               'Rs 2.09 lakh','Rs 25.03 lakh', 'Rs 6.26 Cr'],
                      ].map(([rate, monthly, annual, fire]) => (
                        <tr key={rate}>
                          <td style={{ ...tdL, whiteSpace: 'nowrap' }}>{rate}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{monthly}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{annual}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const, fontWeight: 700, color: C.dark }}>{fire}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>Between 4% and 8% inflation, the FIRE number nearly doubles. Healthcare inflation in India runs at 10-14%, significantly above CPI. Planners with major future medical needs should model at 7-8% or higher.</p>
              </div>

              {promoBar('/calculators/asset-allocation-calculator', 'Asset Allocation Calculator', 'Find the right equity, debt, gold and international mix for your age and FIRE goal.')}

              {/* Section 7 */}
              <div style={sec} id="fire-corpus">
                <h2 style={h2}>What Counts in Your FIRE Corpus</h2>
                <p style={p}>Your investable FIRE corpus is the sum of all assets that can be liquidated or generate income during retirement. Include all of the following:</p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: 'Equity mutual funds, direct stocks, ETFs and index funds:', text: 'the most liquid and typically highest-returning components.' },
                    { label: 'EPF balance at retirement:', text: 'project your balance using the EPF Calculator and add it to Existing Investments.' },
                    { label: 'NPS Tier I corpus at retirement:', text: 'under PFRDA 2026 rules, non-government subscribers can take up to 80% as a lump sum, but only 60% of the withdrawal stays tax-free and a minimum 20% must still be annuitized. Factor the annuity portion into your post-retirement income plan.' },
                    { label: 'PPF maturity if reinvested:', text: 'PPF itself is illiquid during its 15-year term but the maturity corpus can be redeployed.' },
                    { label: 'Rental property net yield:', text: 'if you own a second property that generates rental income, treat the income as reducing your annual withdrawal need rather than adding the property value to corpus.' },
                  ].map((it, i) => (
                    <li key={i} style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.75 }}>
                      <strong style={{ color: C.ink }}>{it.label}</strong> {it.text}
                    </li>
                  ))}
                </ol>
                <p style={p}>Do not include your primary home unless you plan to sell it or refinance it. An owned home reduces your expense (no rent), which lowers your FIRE number. That is the correct way to account for it, not by adding the property value to the corpus.</p>
              </div>

              {/* Section 8 */}
              <div style={sec} id="fire-risks">
                <h2 style={h2}>Risks the FIRE Number Does Not Capture</h2>
                <p style={p}>A FIRE number is a deterministic projection. It does not simulate market volatility or extreme scenarios. Four structural risks require a buffer beyond the base 25x number:</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 8 }}>
                  {[
                    { title: 'Sequence-of-returns risk', body: 'A 30% market crash in year one of retirement is far more damaging than the same crash in year 10. You are selling units at low prices to meet expenses, permanently reducing the corpus available for recovery. Many planners keep 2-3 years of expenses in fixed deposits to avoid selling equity during downturns.' },
                    { title: 'Healthcare cost inflation', body: 'Medical inflation in India runs at 10-14% annually, well above the CPI headline figure. A hospitalization that costs Rs 5 lakh today will cost Rs 13 lakh in 10 years at 10% medical inflation. An adequate health insurance cover and a dedicated medical contingency fund, separate from the FIRE corpus, are essential.' },
                    { title: 'Longevity risk', body: 'If you retire at 40 and live to 90, your corpus must last 50 years. The 4% rule was designed for 30-year retirements. A 50-year retirement at 4% withdrawal has a meaningful failure probability in historical simulations. Build to 28x-30x if planning for a very long retirement.' },
                    { title: 'Tax and regulatory changes', body: 'Long-term capital gains tax on equity was reintroduced in 2018 at 10% above Rs 1 lakh annually, then revised in Budget 2024. Future changes to tax treatment of mutual funds, EPF, or NPS cannot be modeled. A 2-3 Cr buffer above your base FIRE number provides resilience against adverse rule changes.' },
                  ].map(({ title, body }) => (
                    <div key={title}>
                      <p style={{ fontSize: 14.5, fontWeight: 700, color: C.ink, margin: '0 0 4px' }}>{title}</p>
                      <p style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.75, margin: 0 }}>{body}</p>
                    </div>
                  ))}
                </div>
              </div>

              

              {/* Section 9 */}
              <div style={sec} id="how-to-use">
                <h2 style={h2}>How to Use This Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { label: 'Enter monthly expenses:', text: 'Use your total household outflow including rent or EMI, groceries, utilities, insurance, subscriptions, and discretionary spending. Exclude your current SIP and savings; those are inputs separately.' },
                    { label: 'Set your ages:', text: 'Enter current age, target retirement age, and life expectancy. Use 85-90 years for conservative planning. The gap between retirement and life expectancy determines how long your corpus must last.' },
                    { label: 'Enter SIP and existing corpus:', text: 'Enter your current monthly SIP and the total value of all investable assets today: equity mutual funds, EPF balance, NPS corpus, stocks, and liquid FDs. Exclude your primary home.' },
                    { label: 'Open More settings:', text: 'Set your annual SIP step-up (10% mirrors typical salary growth), expected return (12% for a diversified equity-heavy portfolio), and inflation rate (6-7% for India). Add any major planned expenses like a home purchase or education.' },
                    { label: 'Read your FIRE outputs:', text: 'The calculator shows your FIRE number (25x), Lean FIRE (20x), Fat FIRE (40x), Coast FIRE, and whether your trajectory puts you on track. The wealth chart shows accumulation and withdrawal phases. The milestone timeline shows when you cross each corpus threshold.' },
                  ].map((it, i) => (
                    <li key={i} style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                      <strong style={{ color: C.ink }}>{it.label}</strong> {it.text}
                    </li>
                  ))}
                </ol>
                <p style={p}>The <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SIP Calculator</Link> can help you verify the corpus your current SIP builds before entering it here. The <Link href="/calculators/inflation-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Inflation Calculator</Link> shows exactly how purchasing power erodes at different inflation rates over your planning horizon.</p>
              </div>

              {/* Section 10: FAQ */}
              <div style={{ margin: '0 0 40px' }} id="fire-faq">
                <h2 style={h2}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              {/* Disclaimer */}
              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All calculations on this page are indicative only. FIRE projections are based on assumed returns, inflation, and time horizons that may not reflect actual future conditions. Past performance of any investment does not guarantee future results. The 4% rule and corpus multipliers are planning heuristics, not financial guarantees. This calculator is for educational and planning purposes only and does not constitute financial advice. Consult a <a href="https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=13" target="_blank" rel="noopener noreferrer" style={{ color: C.dark }}>SEBI-registered investment adviser</a> before making retirement planning decisions.
                </p>
              </div>

            </article>

          </div>

          {/* ── SIDEBAR ── */}
          <style>{`.fire-sidebar::-webkit-scrollbar{width:5px}.fire-sidebar::-webkit-scrollbar-track{background:transparent}.fire-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.fire-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside
            className="fire-sidebar"
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <nav aria-label="Related Calculators" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <SidebarList title="Popular Calculators" items={POPULAR} />
                <SidebarList title="More Calculators" items={MORE} />
              </nav>
            </div>
          </aside>

        </div>
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

'use client';

import { useMemo, useState } from 'react';

const INTER = 'system-ui, -apple-system, sans-serif';

const MF = {
  green: '#2D9970',
  greenDark: '#1f7a58',
  ink: '#101214',
  ink3: '#565c62',
  border: '#e3e6e8',
};

export interface NavPoint {
  label: string;
  date: string;
  nav: number;
}

const PERIOD_DAYS: Record<string, number> = { '1M': 30, '3M': 91, '6M': 182, '1Y': 365, '3Y': 1095, '5Y': 1825 };
const PERIOD_ORDER = ['1M', '3M', '6M', '1Y', '3Y', '5Y', 'All'];

function tooltipStyle(xPercent: number): React.CSSProperties {
  if (xPercent < 15) return { left: `${xPercent}%`, transform: 'translateX(0%)' };
  if (xPercent > 85) return { left: `${xPercent}%`, transform: 'translateX(-100%)' };
  return { left: `${xPercent}%`, transform: 'translateX(-50%)' };
}

// A period tab here filters the SAME real, AMFI-sourced anchor points down to the ones that fall
// within that window - it never swaps in a fabricated dense daily series. Shorter periods
// legitimately show fewer real points (that is what Fermor actually has on record), rather than
// a smooth line manufactured to look denser than the underlying data.
export function NavHistoryChart({ points, schemeName }: { points: NavPoint[]; schemeName: string }) {
  const availablePeriods = useMemo(
    () => PERIOD_ORDER.filter(p => p === 'All' || points.some(pt => pt.label === p)),
    [points]
  );
  const [period, setPeriod] = useState(availablePeriods.includes('1Y') ? '1Y' : availablePeriods[0] ?? 'All');
  const [hover, setHover] = useState<number | null>(null);

  const shown = useMemo(() => {
    if (period === 'All') return points;
    const cutoffDays = PERIOD_DAYS[period];
    const now = points[points.length - 1]?.date ? new Date(points[points.length - 1].date).getTime() : Date.now();
    return points.filter(p => (now - new Date(p.date).getTime()) / 86_400_000 <= cutoffDays + 3);
  }, [points, period]);

  if (points.length < 2) return null;

  const W = 600, H = 200;
  const navValues = shown.map(p => p.nav);
  const maxNav = Math.max(...navValues);
  const minNav = Math.min(...navValues);
  const span = maxNav - minNav || maxNav * 0.05 || 1;
  const padTop = 10, padBottom = 6;
  const plotH = H - padTop - padBottom;

  const xy = (i: number) => {
    const x = shown.length > 1 ? (i / (shown.length - 1)) * W : W / 2;
    const y = padTop + plotH - ((shown[i].nav - minNav) / span) * plotH;
    return { x, y };
  };

  const linePts = shown.map((_, i) => { const { x, y } = xy(i); return `${x.toFixed(1)},${y.toFixed(1)}`; }).join(' ');
  const areaPts = `0,${H} ${linePts} ${W},${H}`;
  const hovered = hover !== null ? shown[hover] : null;
  const startReturn = shown.length > 1 ? ((shown[shown.length - 1].nav / shown[0].nav - 1) * 100) : 0;
  const slot = shown.length > 1 ? W / shown.length : W;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 22 }}>
        <span style={{ font: `700 30px/1 ${INTER}`, letterSpacing: '-0.01em', color: startReturn >= 0 ? MF.greenDark : '#C0392B' }}>
          {startReturn >= 0 ? '+' : ''}{startReturn.toFixed(2)}%
        </span>
        <span style={{ font: `500 14px ${INTER}`, color: MF.ink3 }}>
          {period === 'All' ? 'all recorded history' : `over ${period}`}
        </span>
      </div>
      <div style={{ position: 'relative' }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={260} style={{ display: 'block' }} preserveAspectRatio="none"
          role="img" aria-label={`NAV trend for ${schemeName} over ${period}`}>
          <defs>
            <linearGradient id="navfill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={MF.green} stopOpacity="0.20" />
              <stop offset="100%" stopColor={MF.green} stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={areaPts} fill="url(#navfill)" />
          <polyline points={linePts} fill="none" stroke={MF.greenDark} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          {hovered && (() => {
            const { x, y } = xy(hover as number);
            return (
              <>
                <line x1={x} y1={0} x2={x} y2={H} stroke={MF.border} strokeWidth={1} aria-hidden="true" />
                <circle cx={x} cy={y} r={4} fill={MF.greenDark} stroke="#fff" strokeWidth={1.5} />
              </>
            );
          })()}
          {shown.map((p, i) => {
            const { x } = xy(i);
            return (
              <rect key={p.label + p.date} x={x - slot / 2} y={0} width={slot} height={H} fill="transparent"
                onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} />
            );
          })}
        </svg>
        {hovered && (
          <div style={{
            position: 'absolute', top: -6, ...tooltipStyle((xy(hover as number).x / W) * 100),
            background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 8, padding: '8px 12px',
            font: `12px ${INTER}`, boxShadow: '0 4px 14px rgba(18,32,22,0.18)', whiteSpace: 'nowrap', pointerEvents: 'none',
          }}>
            <div style={{ fontWeight: 700, color: '#101214' }}>&#8377;{hovered.nav.toFixed(4)}</div>
            <div style={{ color: '#c4c9cd', fontSize: 11 }}>
              {new Date(hovered.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 20, flexWrap: 'wrap' }}>
        {availablePeriods.map(p => (
          <button key={p} onClick={() => setPeriod(p)}
            style={{
              padding: '7px 16px', borderRadius: 20, cursor: 'pointer', font: `600 12.5px ${INTER}`,
              border: `1px solid ${period === p ? MF.green : MF.border}`,
              background: period === p ? '#f1f3f4' : '#fff',
              color: period === p ? '#14663A' : MF.ink3,
            }}>
            {p}
          </button>
        ))}
      </div>
      <p style={{ font: `11.5px ${INTER}`, color: '#80868c', margin: '14px 0 0' }}>
        Plotted from the real NAV points Fermor has on record for this scheme, not an interpolated daily series.
      </p>
    </div>
  );
}

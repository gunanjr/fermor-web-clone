'use client';

import { useState } from 'react';
import type { GDPYearRow } from './country-types';

const INTER = 'var(--font-inter), Inter, sans-serif';

const C = {
  dark: '#111111',
  ink: '#333333',
  ink3: '#888888',
  border: '#E5E5E5',
  blue: '#1D4ED8',
  blueFill: '#EFF6FF',
  lime: '#84CC16',
};

function formatGDPFull(billions: number): string {
  return `$${Math.round(billions * 1e9).toLocaleString('en-US')}`;
}
function formatGDPShort(billions: number): string {
  if (billions >= 1000) return `$${(billions / 1000).toFixed(2)}T`;
  return `$${billions.toFixed(1)}B`;
}

// Keeps the tooltip inside the chart's horizontal bounds instead of always centering on the
// hover point, which overflows the container when the point sits near the left/right edge.
function tooltipStyle(xPercent: number): React.CSSProperties {
  if (xPercent < 15) return { left: `${xPercent}%`, transform: 'translateX(0%)' };
  if (xPercent > 85) return { left: `${xPercent}%`, transform: 'translateX(-100%)' };
  return { left: `${xPercent}%`, transform: 'translateX(-50%)' };
}

export function GDPLineChart({ rows, countryName }: { rows: GDPYearRow[]; countryName: string }) {
  const [hover, setHover] = useState<number | null>(null);
  if (rows.length === 0) return null;
  const W = 800, H = 260, PADL = 84, PADR = 4, PADB = 24, PADT = 14;
  const maxGDP = Math.max(...rows.map(r => r.gdp));
  const minYear = rows[0].year;
  const maxYear = rows[rows.length - 1].year;
  const yearSpan = maxYear - minYear || 1;
  const plotW = W - PADL - PADR;
  const plotH = H - PADT - PADB;

  const xy = (r: GDPYearRow) => {
    const x = PADL + ((r.year - minYear) / yearSpan) * plotW;
    const y = PADT + plotH - (r.gdp / maxGDP) * plotH;
    return { x, y };
  };
  const points = rows.map(r => { const { x, y } = xy(r); return `${x},${y}`; }).join(' ');
  const yearLabels = rows.filter((_, i) => i % Math.ceil(rows.length / 8) === 0);
  const hovered = hover !== null ? rows[hover] : null;
  const gridSteps = 4;
  const gridLines = Array.from({ length: gridSteps + 1 }, (_, i) => {
    const frac = i / gridSteps;
    const y = PADT + plotH - frac * plotH;
    const value = maxGDP * frac;
    return { y, value };
  });

  return (
    <div style={{ position: 'relative', marginBottom: 28 }}>
      <svg role="img" aria-label={`${countryName} GDP trend, ${minYear} to ${maxYear}`}
        viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
        {gridLines.map(g => (
          <text key={g.y} x={PADL - 8} y={g.y + 4} textAnchor="end" style={{ fontSize: 10.5, fill: C.ink3, fontFamily: INTER }}>
            {formatGDPShort(g.value)}
          </text>
        ))}
        <line x1={PADL} y1={PADT} x2={PADL} y2={PADT + plotH} stroke={C.border} strokeWidth={1} />
        <line x1={PADL} y1={PADT + plotH} x2={W - PADR} y2={PADT + plotH} stroke={C.border} strokeWidth={1} />
        <polyline points={points} fill="none" stroke={C.blue} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        {hovered && (() => {
          const { x, y } = xy(hovered);
          return (
            <g>
              <line x1={x} y1={y} x2={x} y2={PADT + plotH} stroke={C.lime} strokeWidth={1} strokeDasharray="3,3" />
              <line x1={PADL} y1={y} x2={x} y2={y} stroke={C.lime} strokeWidth={1} strokeDasharray="3,3" />
            </g>
          );
        })()}
        {rows.map((r, i) => {
          const { x, y } = xy(r);
          return (
            <g key={r.year}>
              {hover === i && <circle cx={x} cy={y} r={4} fill={C.blue} stroke="#fff" strokeWidth={1.5} />}
              <rect x={x - (plotW / rows.length) / 2} y={PADT} width={plotW / rows.length} height={plotH}
                fill="transparent" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} />
            </g>
          );
        })}
        {yearLabels.map(r => {
          const { x } = xy(r);
          return (
            <text key={r.year} x={x} y={H - 4} textAnchor="middle" style={{ fontSize: 10, fill: C.ink3, fontFamily: INTER }}>
              {r.year}
            </text>
          );
        })}
      </svg>
      {hovered && (
        <div style={{
          position: 'absolute', top: 6, ...tooltipStyle((xy(hovered).x / W) * 100),
          background: '#fff', border: `1px solid ${C.border}`, borderRadius: 8, padding: '6px 10px',
          fontFamily: INTER, fontSize: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', whiteSpace: 'nowrap', pointerEvents: 'none',
        }}>
          <div style={{ fontWeight: 700, color: C.dark }}>{hovered.year}</div>
          <div style={{ color: C.ink }}>{countryName} GDP: {formatGDPFull(hovered.gdp)}</div>
        </div>
      )}
    </div>
  );
}

export function GDPGrowthBarChart({ rows, countryName }: { rows: GDPYearRow[]; countryName: string }) {
  const [hover, setHover] = useState<number | null>(null);
  const withGrowth = rows.filter(r => r.growth !== null);
  if (withGrowth.length === 0) return null;
  const W = 800, H = 240, PADL = 60, PADR = 4;
  const plotW = W - PADL - PADR;
  const maxAbs = Math.max(...withGrowth.map(r => Math.abs(r.growth as number)), 1);
  const zeroY = H / 2;
  const slot = plotW / withGrowth.length;
  const barW = Math.max(2, Math.min(14, slot * 0.7));
  const yearLabels = withGrowth.filter((_, i) => i % Math.ceil(withGrowth.length / 8) === 0);
  const hovered = hover !== null ? withGrowth[hover] : null;
  const topValue = Math.ceil(maxAbs / 5) * 5 || 5;

  return (
    <div style={{ position: 'relative', marginBottom: 28 }}>
      <svg role="img" aria-label={`${countryName} GDP growth rate by year`}
        viewBox={`0 0 ${W} ${H + 20}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
        <line x1={PADL} y1={zeroY - (H / 2 - 6)} x2={W - PADR} y2={zeroY - (H / 2 - 6)} stroke={C.border} strokeWidth={1} />
        <text x={PADL - 8} y={zeroY - (H / 2 - 6) + 4} textAnchor="end" style={{ fontSize: 10.5, fill: C.ink3, fontFamily: INTER }}>{topValue.toFixed(1)}%</text>
        <text x={PADL - 8} y={zeroY + 4} textAnchor="end" style={{ fontSize: 10.5, fill: C.ink3, fontFamily: INTER }}>0.0%</text>
        {withGrowth.map((row, i) => {
          const g = row.growth as number;
          const barH = (Math.abs(g) / topValue) * (H / 2 - 6);
          const x = PADL + i * slot + (slot - barW) / 2;
          const y = g >= 0 ? zeroY - barH : zeroY;
          return (
            <g key={row.year}>
              <rect x={x} y={y} width={barW} height={Math.max(1, barH)} fill={hover === i ? C.dark : C.blue} rx={1} />
              <rect x={PADL + i * slot} y={0} width={slot} height={H} fill="transparent"
                onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} />
            </g>
          );
        })}
        {yearLabels.map(row => {
          const i = withGrowth.indexOf(row);
          const x = PADL + i * slot + slot / 2;
          return (
            <text key={row.year} x={x} y={H + 16} textAnchor="middle" style={{ fontSize: 10, fill: C.ink3, fontFamily: INTER }}>
              {row.year}
            </text>
          );
        })}
        <line x1={PADL} y1={zeroY} x2={W - PADR} y2={zeroY} stroke={C.border} strokeWidth={1} />
      </svg>
      {hovered && (
        <div style={{
          position: 'absolute', top: 6, ...tooltipStyle(((PADL + withGrowth.indexOf(hovered) * slot + slot / 2) / W) * 100),
          background: '#fff', border: `1px solid ${C.border}`, borderRadius: 8, padding: '6px 10px',
          fontFamily: INTER, fontSize: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', whiteSpace: 'nowrap', pointerEvents: 'none',
        }}>
          <div style={{ fontWeight: 700, color: C.dark }}>{hovered.year}</div>
          <div style={{ color: C.ink }}>{countryName} GDP Change: {hovered.growth}%</div>
        </div>
      )}
    </div>
  );
}

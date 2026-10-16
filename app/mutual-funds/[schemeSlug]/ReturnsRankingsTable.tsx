'use client';

import { useState } from 'react';

const INTER = 'system-ui, -apple-system, sans-serif';
const MF = { ink: '#101214', ink2: '#565c62', border: '#e3e6e8', panel: '#f4f5f6', green: '#2D9970', greenDark: '#1f7a58' };

export interface BenchmarkPeriod {
  label: string;
  fundReturnPct: number | null;
  fundAbsoluteReturnPct: number | null;
  categoryAverageReturnPct: number | null;
  categoryAverageAbsoluteReturnPct: number | null;
  rank: number | null;
  peerCount: number;
}

function fmt(v: number | null): string {
  if (v == null) return '--';
  return `${v >= 0 ? '+' : ''}${v.toFixed(2)}%`;
}

export function ReturnsRankingsTable({ periods, categoryShort }: { periods: BenchmarkPeriod[]; categoryShort: string }) {
  const [mode, setMode] = useState<'annualised' | 'absolute'>('annualised');
  if (periods.length === 0) return null;

  // Every period with a real rank gets its own slider - not just the headline 1Y - since the
  // table above already shows 1Y/3Y/5Y side by side and a reader comparing them benefits from
  // seeing whether this fund's category position holds up or drifts across periods.
  const rankedPeriods = periods.filter(p => p.rank != null && p.peerCount > 0);

  return (
    <div>
      <div style={{ display: 'inline-flex', background: MF.panel, borderRadius: 24, padding: 4, marginBottom: 20 }}>
        {(['annualised', 'absolute'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            style={{
              border: 'none', borderRadius: 20, padding: '9px 20px', font: `600 13px ${INTER}`, cursor: 'pointer',
              background: mode === m ? MF.ink : 'transparent', color: mode === m ? '#fff' : MF.ink2,
            }}>
            {m === 'annualised' ? 'Annualised returns' : 'Absolute returns'}
          </button>
        ))}
      </div>
      <div style={{ border: `1px solid ${MF.border}`, borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 480, fontSize: 14 }}>
            <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
              Fund returns versus category average and rank
            </caption>
            <thead>
              <tr style={{ background: MF.panel }}>
                <th scope="col" style={{ ...th, textAlign: 'left' }}>Name</th>
                {periods.map(p => <th key={p.label} scope="col" style={th}>{p.label}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ ...td, fontWeight: 700, textAlign: 'left' }}>Fund returns</td>
                {periods.map(p => (
                  <td key={p.label} style={{ ...td, color: MF.greenDark, fontWeight: 600 }}>
                    {fmt(mode === 'annualised' ? p.fundReturnPct : p.fundAbsoluteReturnPct)}
                  </td>
                ))}
              </tr>
              <tr style={{ borderTop: `1px solid #e3e6e8` }}>
                <td style={{ ...td, color: MF.ink2, textAlign: 'left' }}>Category average ({categoryShort})</td>
                {periods.map(p => (
                  <td key={p.label} style={{ ...td, color: MF.ink2, fontWeight: 600 }}>
                    {fmt(mode === 'annualised' ? p.categoryAverageReturnPct : p.categoryAverageAbsoluteReturnPct)}
                  </td>
                ))}
              </tr>
              <tr style={{ borderTop: `1px solid #e3e6e8` }}>
                <td style={{ ...td, color: MF.ink, textAlign: 'left' }}>Rank ({categoryShort})</td>
                {periods.map(p => (
                  <td key={p.label} style={{ ...td, color: MF.ink, fontWeight: 600 }}>
                    {p.rank != null ? `${p.rank} of ${p.peerCount}` : '--'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <p style={{ font: `11.5px ${INTER}`, color: '#80868c', margin: '10px 0 0 0' }}>
        Rank and category average are computed live from every AMFI-registered Direct Plan, Growth option scheme sharing this fund&apos;s category, not sourced from a third party.
      </p>

      {rankedPeriods.length > 0 && (
        <div style={{ border: `1px solid ${MF.border}`, borderRadius: 12, padding: '20px 22px', marginTop: 20 }}>
          <div style={{ font: `700 11px ${INTER}`, letterSpacing: '.06em', textTransform: 'uppercase', color: MF.ink2, marginBottom: 18 }}>
            Category Position: Where This Fund Sits Among Its Peers
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {rankedPeriods.map(p => {
              const topPercent = Math.max(1, Math.ceil((p.rank! / p.peerCount) * 100));
              const positionPct = p.peerCount > 1 ? ((p.rank! - 1) / (p.peerCount - 1)) * 100 : 0;
              return (
                <div key={p.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10, flexWrap: 'wrap', gap: 6 }}>
                    <span style={{ font: `700 14px ${INTER}`, color: MF.ink }}>{periodWord(p.label)}</span>
                    <span style={{ font: `600 13px ${INTER}`, color: MF.ink2 }}>Rank {p.rank} of {p.peerCount} &middot; top {topPercent}%</span>
                  </div>
                  <div style={{ position: 'relative', height: 4, borderRadius: 99, background: 'linear-gradient(90deg, #C7E8B8 0%, #e3e6e8 100%)' }}
                    role="img" aria-label={`Ranked ${p.rank} of ${p.peerCount} in category, top ${topPercent} percent`}>
                    <div style={{
                      position: 'absolute', top: '50%', left: `${positionPct}%`, transform: 'translate(-50%, -50%)',
                      width: 18, height: 18, borderRadius: '50%', background: MF.ink, border: `3px solid ${MF.green}`, boxShadow: '0 1px 3px rgba(0,0,0,.2)',
                    }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, font: `500 11.5px ${INTER}`, color: MF.ink2 }}>
                    <span>Best in category</span>
                    <span>Lowest</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function periodWord(label: string): string {
  const n = label.replace(/[^0-9]/g, '');
  return `${n} ${n === '1' ? 'year' : 'years'}`;
}

const th: React.CSSProperties = { padding: '12px 18px', font: `600 12px ${INTER}`, color: MF.ink2, textAlign: 'right' };
const td: React.CSSProperties = { padding: '14px 18px', font: `14px ${INTER}`, textAlign: 'right', borderTop: `1px solid #e3e6e8` };

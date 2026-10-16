'use client';

import { useState } from 'react';
import Link from 'next/link';
import { buildSchemeSlug } from '../../../src/utils/mutualFundSlug';
import { INTER, MF, fmtReturn, CompareCard } from '../MutualFundCompareCard';

const MAX_PEERS = 3;

export interface CompareFund {
  schemeCode: string;
  schemeName: string;
  amcName: string | null;
  nav: number;
  oneYearReturnPct: number | null;
}

export interface MainCompareFund {
  schemeCode: string;
  schemeName: string;
  nav: number;
  oneYearReturnPct: number | null;
  aaumCr: number | null;
  riskTier: string | null;
}

export function CompareSimilarFunds({ mainFund, peers }: { mainFund: MainCompareFund; peers: CompareFund[] }) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (schemeCode: string) => {
    setSelected(prev => {
      if (prev.includes(schemeCode)) return prev.filter(c => c !== schemeCode);
      if (prev.length >= MAX_PEERS) return prev;
      return [...prev, schemeCode];
    });
  };

  const selectedPeers = peers.filter(p => selected.includes(p.schemeCode));

  return (
    <div>
      <p style={{ font: `13.5px ${INTER}`, color: MF.ink2, margin: '0 0 14px' }}>
        Select up to three peers from the same category to compare side by side with this fund.
      </p>
      <div style={{ border: `1px solid ${MF.border}`, borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 480, fontSize: 14 }}>
            <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Similar funds in the same category</caption>
            <thead>
              <tr style={{ background: MF.panel }}>
                <th scope="col" style={{ width: 40, padding: '12px 8px' }}><span className="sr-only" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }}>Select</span></th>
                <th scope="col" style={{ padding: '12px 18px', font: `600 12px ${INTER}`, color: MF.ink2, textAlign: 'left' }}>Name</th>
                <th scope="col" style={{ padding: '12px 18px', font: `600 12px ${INTER}`, color: MF.ink2, textAlign: 'right' }}>NAV</th>
                <th scope="col" style={{ padding: '12px 18px', font: `600 12px ${INTER}`, color: MF.ink2, textAlign: 'right' }}>1Y Return</th>
              </tr>
            </thead>
            <tbody>
              {peers.map(f => {
                const isChecked = selected.includes(f.schemeCode);
                const ret = fmtReturn(f.oneYearReturnPct);
                const disabled = !isChecked && selected.length >= MAX_PEERS;
                return (
                  <tr key={f.schemeCode} style={{ borderTop: `1px solid ${MF.border}`, background: isChecked ? MF.paleLime : 'transparent' }}>
                    <td style={{ padding: '14px 8px', textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        disabled={disabled}
                        onChange={() => toggle(f.schemeCode)}
                        aria-label={`Compare ${f.schemeName}`}
                        style={{ width: 16, height: 16, cursor: disabled ? 'not-allowed' : 'pointer' }}
                      />
                    </td>
                    <td style={{ padding: '14px 18px', font: `14px ${INTER}` }}>
                      <Link href={`/mutual-funds/${buildSchemeSlug(f.schemeCode, f.schemeName)}`} target="_blank" rel="noopener noreferrer"
                        style={{ color: MF.ink, fontWeight: 600, textDecoration: 'none' }}>
                        {f.schemeName}
                      </Link>
                      {f.amcName && <div style={{ font: `11.5px ${INTER}`, color: MF.ink3, marginTop: 2 }}>{f.amcName}</div>}
                    </td>
                    <td style={{ padding: '14px 18px', font: `14px ${INTER}`, textAlign: 'right' }}>&#8377;{f.nav.toFixed(2)}</td>
                    <td style={{ padding: '14px 18px', font: `14px ${INTER}`, textAlign: 'right', fontWeight: 600, color: ret.color }}>{ret.text}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selectedPeers.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <div style={{ font: `700 11px ${INTER}`, letterSpacing: '.06em', textTransform: 'uppercase', color: MF.ink2, marginBottom: 12 }}>
            Side-by-Side Comparison
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <CompareCard fund={mainFund} isMain />
            {selectedPeers.map(p => (
              <CompareCard key={p.schemeCode} fund={{ ...p, aaumCr: null, riskTier: mainFund.riskTier }} />
            ))}
          </div>
        </div>
      )}

      <p style={{ font: `11.5px ${INTER}`, color: MF.ink3, margin: '14px 0 0' }}>
        Peers are AMFI-registered schemes in the same category from different AMCs; NAV and 1-year return are computed from the same daily AMFI feed as this page.
        Risk shown for peers reflects the shared category, not an individually disclosed riskometer reading. AAUM is only sourced for this page&apos;s own scheme today.
      </p>
    </div>
  );
}

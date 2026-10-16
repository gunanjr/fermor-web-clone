// Shared by the scheme page's "Compare similar funds" (CompareSimilarFunds.tsx) and the
// standalone /mutual-funds/compare page - one card component for both instead of two near-copies.
export const INTER = 'system-ui, -apple-system, sans-serif';
export const MF = { ink: '#101214', ink2: '#565c62', ink3: '#80868c', border: '#e3e6e8', panel: '#f4f5f6', paleLime: '#f4f5f6', green: '#2D9970', greenDark: '#1f7a58', riskText: '#B4463B' };

export interface CompareCardFund {
  schemeCode: string;
  schemeName: string;
  nav: number;
  oneYearReturnPct: number | null;
  aaumCr: number | null;
  riskTier: string | null;
}

export function fmtReturn(v: number | null): { text: string; color: string } {
  if (v == null) return { text: 'Not available', color: MF.ink3 };
  return { text: `${v >= 0 ? '+' : ''}${v}%`, color: v >= 0 ? MF.greenDark : '#C0392B' };
}

export function CompareCard({ fund, isMain }: { fund: CompareCardFund; isMain?: boolean }) {
  const ret = fmtReturn(fund.oneYearReturnPct);
  return (
    <div style={{
      flex: '1 1 200px', minWidth: 200, border: `1px solid ${isMain ? MF.ink : MF.border}`, borderRadius: 12, padding: 16,
      background: isMain ? MF.panel : '#fff',
    }}>
      <div style={{ font: `700 10.5px ${INTER}`, letterSpacing: '.06em', textTransform: 'uppercase', color: MF.ink3, marginBottom: 6 }}>
        {isMain ? 'This Fund' : 'Peer'}
      </div>
      <div style={{ font: `700 14px ${INTER}`, color: MF.ink, marginBottom: 12, lineHeight: 1.35 }}>{fund.schemeName}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Row label="NAV" value={`₹${fund.nav.toFixed(2)}`} />
        <Row label="1Y return" value={ret.text} color={ret.color} />
        <Row label="AAUM" value={fund.aaumCr != null ? `₹${fund.aaumCr.toLocaleString('en-IN', { maximumFractionDigits: 2 })} Cr` : 'Not sourced yet'} />
        <Row label="Risk" value={fund.riskTier ?? 'Varies'} color={fund.riskTier ? MF.riskText : undefined} />
      </div>
    </div>
  );
}

export function Row({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', font: `13px ${INTER}` }}>
      <span style={{ color: MF.ink2 }}>{label}</span>
      <span style={{ fontWeight: 600, color: color ?? MF.ink }}>{value}</span>
    </div>
  );
}

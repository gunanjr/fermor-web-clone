'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

const INTER = 'system-ui, -apple-system, sans-serif';
const MF = {
  green: '#2D9970',
  greenDark: '#1f7a58',
  ink: '#101214',
  ink2: '#565c62',
  ink3: '#80868c',
  border: '#e3e6e8',
  panel: '#f4f5f6',
  pill: '#f4f5f6',
};

interface SchemeReturn {
  label: string;
  returnPct: number | null;
  anchorNav: number | null;
  anchorDate: string | null;
}

const PERIOD_PHRASE: Record<string, string> = {
  '1M': '1 month ago', '3M': '3 months ago', '6M': '6 months ago',
  '1Y': '1 year ago', '3Y': '3 years ago', '5Y': '5 years ago',
};

function fmtINR(n: number): string {
  return `₹${Math.round(n).toLocaleString('en-IN')}`;
}

function tabStyle(active: boolean): React.CSSProperties {
  return active
    ? { border: 'none', background: MF.ink, color: '#fff', padding: '9px 20px', borderRadius: 20, font: `600 13px ${INTER}`, cursor: 'pointer' }
    : { border: 'none', background: 'transparent', color: MF.ink2, padding: '9px 20px', borderRadius: 20, font: `600 13px ${INTER}`, cursor: 'pointer' };
}

export function InvestmentGrowthCalculator({ schemeName, returns }: { schemeName: string; returns: SchemeReturn[] }) {
  const availablePeriods = useMemo(() => returns.filter(r => r.returnPct !== null && r.anchorNav !== null), [returns]);
  const defaultLumpPeriod = availablePeriods.find(r => r.label === '1Y') ?? availablePeriods[0];

  const [mode, setMode] = useState<'sip' | 'lump'>('sip');
  const [sipAmount, setSipAmount] = useState(5000);
  const [sipYears, setSipYears] = useState(10);
  const [lumpAmount, setLumpAmount] = useState(100000);
  const [lumpPeriodLabel, setLumpPeriodLabel] = useState(defaultLumpPeriod?.label ?? '1Y');

  const trailingCagr = returns.find(r => r.label === '5Y' && r.returnPct !== null)
    ?? returns.find(r => r.label === '3Y' && r.returnPct !== null)
    ?? null;
  const assumedRate = trailingCagr?.returnPct ?? 12;

  const sipMonths = sipYears * 12;
  const sipMonthlyRate = Math.pow(1 + assumedRate / 100, 1 / 12) - 1;
  const sipInvested = sipAmount * sipMonths;
  const sipFv = sipMonthlyRate === 0
    ? sipInvested
    : sipAmount * ((Math.pow(1 + sipMonthlyRate, sipMonths) - 1) / sipMonthlyRate) * (1 + sipMonthlyRate);
  const sipGain = sipFv - sipInvested;

  const lumpPeriod = availablePeriods.find(r => r.label === lumpPeriodLabel) ?? availablePeriods[0];
  const lumpWorth = lumpPeriod ? lumpAmount * (1 + (lumpPeriod.returnPct as number) / 100) : lumpAmount;
  const lumpGain = lumpWorth - lumpAmount;
  const lumpIsGain = lumpGain >= 0;

  if (availablePeriods.length === 0) {
    return (
      <p style={{ font: `14px ${INTER}`, color: MF.ink3, margin: 0 }}>
        {schemeName} does not yet have enough historical NAV data on Fermor for a real return calculation.
        Use the <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: MF.ink, fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3 }}>SIP Calculator</Link> with
        your own assumed return instead.
      </p>
    );
  }

  return (
    <div>
      <div style={{ display: 'inline-flex', background: MF.pill, borderRadius: 24, padding: 4, marginBottom: 24 }}>
        <button onClick={() => setMode('sip')} style={tabStyle(mode === 'sip')}>Monthly SIP</button>
        <button onClick={() => setMode('lump')} style={tabStyle(mode === 'lump')}>Lumpsum</button>
      </div>

      {mode === 'sip' ? (
        <div className="mf2-calc-grid">
          <div>
            <div style={{ font: `13px ${INTER}`, color: MF.ink2, marginBottom: 6 }}>Monthly investment</div>
            <div style={{ font: `700 28px ${INTER}`, marginBottom: 14, color: MF.ink }}>{fmtINR(sipAmount)}</div>
            <input type="range" min={100} max={50000} step={100} value={sipAmount}
              onChange={e => setSipAmount(Number(e.target.value))} aria-label="Monthly SIP amount" style={{ width: '100%' }} />
            <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
              {[3, 5, 10].map(y => (
                <button key={y} onClick={() => setSipYears(y)}
                  style={{
                    padding: '8px 18px', borderRadius: 20, cursor: 'pointer', font: `600 13px ${INTER}`,
                    border: `1px solid ${sipYears === y ? MF.green : MF.border}`,
                    background: sipYears === y ? '#f1f3f4' : '#fff',
                    color: sipYears === y ? '#14663A' : MF.ink2,
                  }}>
                  {y}Y
                </button>
              ))}
            </div>
          </div>
          <div style={{ background: MF.panel, borderRadius: 14, padding: 22 }}>
            <Row label="Total invested" value={fmtINR(sipInvested)} valueColor={MF.ink} />
            <Row label="Would grow to" value={fmtINR(sipFv)} valueColor={MF.greenDark} bold />
            <Row label="Est. gains" value={`${fmtINR(sipGain)} (${((sipGain / sipInvested) * 100).toFixed(1)}%)`} valueColor={MF.greenDark} last />
            <p style={{ margin: '16px 0 0', font: `12px ${INTER}`, color: MF.ink3, lineHeight: 1.5 }}>
              Projected using {schemeName}&apos;s own trailing {trailingCagr ? PERIOD_PHRASE[trailingCagr.label]?.replace(' ago', '') : 'historical'} annualised
              return ({assumedRate >= 0 ? '+' : ''}{assumedRate.toFixed(2)}%). Actual future returns will vary.
            </p>
          </div>
        </div>
      ) : (
        <div className="mf2-calc-grid">
          <div>
            <div style={{ font: `13px ${INTER}`, color: MF.ink2, marginBottom: 6 }}>Amount invested</div>
            <input type="number" min={100} value={lumpAmount}
              onChange={e => setLumpAmount(Math.max(0, Number(e.target.value) || 0))}
              aria-label="Lumpsum amount invested"
              style={{ width: '100%', font: `700 22px ${INTER}`, border: `1px solid ${MF.border}`, borderRadius: 10, padding: '10px 14px', marginBottom: 14, boxSizing: 'border-box', color: MF.ink }} />
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {availablePeriods.map(r => (
                <button key={r.label} onClick={() => setLumpPeriodLabel(r.label)}
                  style={{
                    padding: '8px 16px', borderRadius: 20, cursor: 'pointer', font: `600 13px ${INTER}`,
                    border: `1px solid ${lumpPeriodLabel === r.label ? MF.green : MF.border}`,
                    background: lumpPeriodLabel === r.label ? '#f1f3f4' : '#fff',
                    color: lumpPeriodLabel === r.label ? '#14663A' : MF.ink2,
                  }}>
                  {r.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ background: MF.panel, borderRadius: 14, padding: 22 }}>
            <Row label={`Invested ${lumpPeriod ? PERIOD_PHRASE[lumpPeriod.label] : ''}`} value={fmtINR(lumpAmount)} valueColor={MF.ink} />
            <Row label="Worth today" value={fmtINR(lumpWorth)} valueColor={lumpIsGain ? MF.greenDark : '#C0392B'} bold />
            <Row
              label={lumpIsGain ? 'Gain' : 'Loss'}
              value={`${fmtINR(Math.abs(lumpGain))} (${lumpPeriod?.returnPct != null ? (lumpPeriod.returnPct >= 0 ? '+' : '') + lumpPeriod.returnPct.toFixed(2) : '0.00'}%)`}
              valueColor={lumpIsGain ? MF.greenDark : '#C0392B'}
              last
            />
            <p style={{ margin: '16px 0 0', font: `12px ${INTER}`, color: MF.ink3, lineHeight: 1.5 }}>
              Computed from this fund&apos;s own real historical NAV, not a forward projection.
            </p>
          </div>
        </div>
      )}
      <p style={{ font: `12.5px ${INTER}`, color: MF.ink3, margin: '18px 0 0' }}>
        Want a fuller projection with your own assumptions? Use the{' '}
        <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: MF.ink, fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3 }}>SIP Calculator</Link> or{' '}
        <Link href="/calculators/lumpsum-calculator" target="_blank" rel="noopener noreferrer" style={{ color: MF.ink, fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3 }}>Lumpsum Calculator</Link>.
      </p>
    </div>
  );
}

function Row({ label, value, valueColor, bold, last }: { label: string; value: string; valueColor: string; bold?: boolean; last?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', font: `14px ${INTER}`, color: MF.ink2, marginBottom: last ? 0 : 10 }}>
      <span>{label}</span>
      <span style={{ color: valueColor, fontWeight: bold ? 700 : 600 }}>{value}</span>
    </div>
  );
}

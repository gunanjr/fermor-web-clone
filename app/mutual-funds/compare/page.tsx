import type { Metadata } from 'next';
import Link from 'next/link';
import { MutualFundsHeader, MutualFundsFooter, MUTUAL_FUNDS_CHROME_CSS } from '../MutualFundsChrome';
import { INTER, MF, CompareCard, type CompareCardFund } from '../MutualFundCompareCard';
import { riskProfile } from '../../../src/utils/mutualFundRisk';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.fermor.in';
const MAX_COMPARE = 4;

// Combinatorial (any 2-4 scheme codes a visitor picks), not unique indexable content - same
// reasoning already applied to non-canonical scheme variants elsewhere in this vertical.
export const metadata: Metadata = {
  title: 'Compare Mutual Funds',
  robots: { index: false, follow: true },
};

interface SchemeDetail {
  schemeCode: string;
  schemeName: string;
  category: string;
  nav: number;
  aaumCr: number | null;
  returns: { label: string; returnPct: number | null }[];
}

async function getFund(schemeCode: string): Promise<SchemeDetail | null> {
  try {
    const res = await fetch(`${API_BASE}/mutual-funds/${schemeCode}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ codes?: string }> }) {
  const { codes: codesParam } = await searchParams;
  const codes = (codesParam ?? '').split(',').map(c => c.trim()).filter(Boolean).slice(0, MAX_COMPARE);

  const details = codes.length > 0 ? await Promise.all(codes.map(getFund)) : [];
  const funds: CompareCardFund[] = details
    .filter((f): f is SchemeDetail => f !== null)
    .map(f => ({
      schemeCode: f.schemeCode,
      schemeName: f.schemeName,
      nav: f.nav,
      oneYearReturnPct: f.returns.find(r => r.label === '1Y')?.returnPct ?? null,
      aaumCr: f.aaumCr,
      riskTier: riskProfile(f.category).tier,
    }));

  return (
    <>
      <style>{MUTUAL_FUNDS_CHROME_CSS}</style>
      <div style={{ fontFamily: INTER, background: '#f4f5f6', minHeight: '100vh' }}>
        <MutualFundsHeader />

        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px 64px' }}>
          <h1 style={{ margin: '0 0 8px', font: `700 24px ${INTER}`, color: MF.ink, letterSpacing: '-0.01em' }}>
            Compare mutual funds
          </h1>

          {funds.length === 0 ? (
            <div style={{ marginTop: 16 }}>
              <p style={{ font: `14px/1.6 ${INTER}`, color: MF.ink2, margin: '0 0 16px' }}>
                No funds selected yet. Pick funds to compare from the mutual funds list.
              </p>
              <Link href="/mutual-funds" style={{ color: MF.ink, fontWeight: 600, font: `14px ${INTER}`, textDecoration: 'none' }}>
                &larr; Browse mutual funds
              </Link>
            </div>
          ) : (
            <>
              <p style={{ margin: '0 0 24px', font: `14px/1.6 ${INTER}`, color: MF.ink2 }}>
                {funds.length} fund{funds.length === 1 ? '' : 's'} selected. NAV and 1-year return are computed from the same daily AMFI feed as every scheme page. Risk reflects the fund&apos;s AMFI category, not an individually disclosed riskometer reading.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                {funds.map((f, i) => (
                  <CompareCard key={f.schemeCode} fund={f} isMain={i === 0} />
                ))}
              </div>
            </>
          )}
        </div>

        <MutualFundsFooter />
      </div>
    </>
  );
}

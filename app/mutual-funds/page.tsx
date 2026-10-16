import type { Metadata } from 'next';
import Link from 'next/link';
import { MutualFundsSearchClient } from './MutualFundsSearchClient';
import { MutualFundsHeader, MutualFundsFooter, MUTUAL_FUNDS_CHROME_CSS } from './MutualFundsChrome';
import { MutualFundsFilterBar, MutualFundsResultsTable, type FilterOption, type DisplayFund } from './MutualFundsListClient';
import { riskProfile, RISK_TIERS } from '../../src/utils/mutualFundRisk';
import { getAmcLogo } from '../../src/utils/amcLogos';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.fermor.in';
const INTER = 'system-ui, -apple-system, sans-serif';
const PAGE_SIZE = 30;

interface AmcRow {
  amcName: string;
  fundCount: number;
}

interface FundListRow {
  schemeCode: string;
  schemeName: string;
  amcName: string | null;
  category: string;
  nav: number;
  navDate: string;
  oneYearReturnPct: number | null;
  threeYearReturnPct: number | null;
  fiveYearReturnPct: number | null;
}

interface FundsListResponse {
  funds: FundListRow[];
  categories: string[];
}

async function getFundsList(): Promise<FundsListResponse> {
  try {
    const res = await fetch(`${API_BASE}/mutual-funds/list`, { next: { revalidate: 86400 } });
    if (!res.ok) return { funds: [], categories: [] };
    return await res.json();
  } catch {
    return { funds: [], categories: [] };
  }
}

async function getAmcs(): Promise<AmcRow[]> {
  try {
    const res = await fetch(`${API_BASE}/mutual-funds/amcs`, { next: { revalidate: 86400 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.amcs ?? [];
  } catch {
    return [];
  }
}

// AMFI's real category strings look like "Open Ended Schemes(Equity Scheme - Large Cap Fund)" -
// strip the wrapper for display, same helper AmcFundTable.tsx already uses (kept as its own small
// copy here rather than a forced shared import, same as this codebase's existing initials()/
// shortCategory() duplication across the AMC pages).
function shortCategory(category: string): string {
  return category.replace(/^(Open|Close|Interval) ?Ended Schemes?\(/i, '').replace(/\)$/, '');
}

const QUICK_GROUPS: { label: string; match: (shortCat: string) => boolean }[] = [
  { label: 'Equity', match: c => c.includes('equity') && !c.includes('elss') },
  { label: 'Debt', match: c => c.includes('debt') },
  { label: 'Hybrid', match: c => c.includes('hybrid') },
  { label: 'Index Funds', match: c => c.includes('index') },
  { label: 'ELSS Tax Saver', match: c => c.includes('elss') },
  { label: 'International', match: c => c.includes('overseas') || c.includes('international') || c.includes('global') },
];

function parseList(v: string | string[] | undefined): string[] {
  const s = Array.isArray(v) ? v[0] : v;
  return s ? s.split(',').filter(Boolean) : [];
}

function toggled(current: string[], value: string): string[] {
  return current.includes(value) ? current.filter(v => v !== value) : [...current, value];
}

function buildHref(base: URLSearchParams, key: string, values: string[]): string {
  const params = new URLSearchParams(base);
  params.delete('page'); // any filter change resets pagination
  if (values.length > 0) params.set(key, values.join(',')); else params.delete(key);
  const qs = params.toString();
  return qs ? `/mutual-funds?${qs}` : '/mutual-funds';
}

export async function generateMetadata(): Promise<Metadata> {
  const amcs = await getAmcs();
  const description = `Browse and compare ${amcs.length || 50}+ fund houses and their mutual fund schemes by category, risk, and 1Y/3Y/5Y returns, or search NAV for 14,000+ AMFI-registered schemes directly. Updated daily from AMFI. Free to use.`;
  return {
    title: 'Mutual Funds: Browse, Filter & Compare 2,400+ Schemes',
    description,
    keywords: [
      'mutual fund screener', 'best mutual funds india', 'mutual fund nav search', 'compare mutual funds',
      'mutual fund nav today', 'amfi nav', 'mutual fund nav india', 'mutual fund scheme search',
      'mutual fund amc list', 'asset management company india', 'browse mutual funds by category',
      'mutual fund houses india', 'top performing mutual funds',
    ],
    alternates: { canonical: 'https://fermor.in/mutual-funds' },
    openGraph: {
      title: 'Mutual Funds: Browse, Filter & Compare 2,400+ Schemes - Fermor',
      description,
      type: 'website',
      url: 'https://fermor.in/mutual-funds',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Mutual Funds: Browse, Filter & Compare 2,400+ Schemes',
      description,
    },
  };
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Mutual Funds', item: 'https://fermor.in/mutual-funds' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Mutual Funds Screener',
  description: 'Browse, filter, and compare AMFI-registered mutual fund schemes in India by category, risk, and returns. Updated daily.',
  url: 'https://fermor.in/mutual-funds',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, mutual fund investors, NRI investors',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
};

export default async function MutualFundsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const [{ funds: rawFunds, categories }, amcs] = await Promise.all([getFundsList(), getAmcs()]);

  const selCategories = parseList(sp.category);
  const selRisk = parseList(sp.risk);
  const selAmc = parseList(sp.amc);
  const sortKey = (Array.isArray(sp.sort) ? sp.sort[0] : sp.sort) ?? '1y';
  const sortDir = (Array.isArray(sp.dir) ? sp.dir[0] : sp.dir) === 'asc' ? 'asc' : 'desc';
  const page = Math.max(1, parseInt((Array.isArray(sp.page) ? sp.page[0] : sp.page) ?? '1', 10) || 1);

  const withRisk = rawFunds.map(f => ({ ...f, riskTier: riskProfile(f.category).tier }));

  let filtered = withRisk;
  if (selCategories.length) filtered = filtered.filter(f => selCategories.includes(f.category));
  if (selRisk.length) filtered = filtered.filter(f => f.riskTier && selRisk.includes(f.riskTier));
  if (selAmc.length) filtered = filtered.filter(f => f.amcName && selAmc.includes(f.amcName));

  const sortField = sortKey === '3y' ? 'threeYearReturnPct' : sortKey === '5y' ? 'fiveYearReturnPct' : sortKey === 'name' ? 'schemeName' : 'oneYearReturnPct';
  const dirMul = sortDir === 'asc' ? 1 : -1;
  filtered = [...filtered].sort((a, b) => {
    const av = a[sortField as keyof typeof a];
    const bv = b[sortField as keyof typeof b];
    if (av == null && bv == null) return 0;
    if (av == null) return 1;
    if (bv == null) return -1;
    if (typeof av === 'string' || typeof bv === 'string') return String(av).localeCompare(String(bv)) * dirMul;
    return ((av as number) - (bv as number)) * dirMul;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const clampedPage = Math.min(page, totalPages);
  const pageFunds: DisplayFund[] = filtered.slice((clampedPage - 1) * PAGE_SIZE, clampedPage * PAGE_SIZE);

  const baseParams = new URLSearchParams();
  if (selCategories.length) baseParams.set('category', selCategories.join(','));
  if (selRisk.length) baseParams.set('risk', selRisk.join(','));
  if (selAmc.length) baseParams.set('amc', selAmc.join(','));
  if (sortKey !== '1y') baseParams.set('sort', sortKey);
  if (sortDir !== 'desc') baseParams.set('dir', sortDir);

  const categoryOptions: FilterOption[] = categories.map(c => ({
    label: shortCategory(c),
    href: buildHref(baseParams, 'category', toggled(selCategories, c)),
    active: selCategories.includes(c),
  }));
  const riskOptions: FilterOption[] = RISK_TIERS.map(tier => ({
    label: tier,
    href: buildHref(baseParams, 'risk', toggled(selRisk, tier)),
    active: selRisk.includes(tier),
  }));
  const amcOptions: FilterOption[] = amcs.map(a => ({
    label: a.amcName.replace(/ Mutual Fund$/i, ''),
    href: buildHref(baseParams, 'amc', toggled(selAmc, a.amcName)),
    active: selAmc.includes(a.amcName),
    logo: getAmcLogo(a.amcName),
  }));

  const anyFiltersActive = selCategories.length > 0 || selRisk.length > 0 || selAmc.length > 0;
  const clearAllHref = anyFiltersActive ? '/mutual-funds' : null;

  const quickPills = QUICK_GROUPS.map(group => {
    const matchingCats = categories.filter(c => group.match(shortCategory(c).toLowerCase()));
    if (matchingCats.length === 0) return null;
    const isActive = matchingCats.every(c => selCategories.includes(c));
    const nextCategories = isActive
      ? selCategories.filter(c => !matchingCats.includes(c))
      : [...new Set([...selCategories, ...matchingCats])];
    return { label: group.label, href: buildHref(baseParams, 'category', nextCategories), active: isActive };
  }).filter((p): p is { label: string; href: string; active: boolean } => p !== null);

  const avgReturn = (matcher: (c: string) => boolean): number | null => {
    const items = withRisk.filter(f => matcher(shortCategory(f.category).toLowerCase()) && f.oneYearReturnPct != null);
    if (!items.length) return null;
    return Math.round((items.reduce((sum, f) => sum + (f.oneYearReturnPct ?? 0), 0) / items.length) * 100) / 100;
  };
  const fmtPct = (v: number | null) => v == null ? '—' : `${v >= 0 ? '+' : ''}${v.toFixed(2)}%`;
  const pctColor = (v: number | null) => v == null ? '#80868c' : v >= 0 ? '#1f7a58' : '#C0392B';
  const equityAvg = avgReturn(c => c.includes('equity') && !c.includes('elss'));
  const debtAvg = avgReturn(c => c.includes('debt'));
  // Not gold/silver: AMFI has no canonical (Direct + Growth) gold/silver category in this data -
  // ETFs trade on-exchange with no plan/option split, so that tile would always show "—". Hybrid
  // always has real data, so it's the fourth tile instead.
  const hybridAvg = avgReturn(c => c.includes('hybrid'));

  const pagePath = (n: number) => {
    const params = new URLSearchParams(baseParams);
    if (n > 1) params.set('page', String(n)); else params.delete('page');
    const qs = params.toString();
    return qs ? `/mutual-funds?${qs}` : '/mutual-funds';
  };

  // Clicking the already-active sort key flips direction; clicking a different key switches to it
  // at the default (desc) direction - matching how every other sortable table on this site behaves.
  const sortHref = (key: string): string => {
    const params = new URLSearchParams(baseParams);
    params.delete('page');
    if (key === sortKey) {
      const nextDir = sortDir === 'desc' ? 'asc' : 'desc';
      if (key === '1y' && nextDir === 'desc') params.delete('sort'); else params.set('sort', key);
      if (nextDir === 'desc') params.delete('dir'); else params.set('dir', nextDir);
    } else {
      if (key === '1y') params.delete('sort'); else params.set('sort', key);
      params.delete('dir');
    }
    const qs = params.toString();
    return qs ? `/mutual-funds?${qs}` : '/mutual-funds';
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <style>{`
        ${MUTUAL_FUNDS_CHROME_CSS}
        .mfh-insight-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; }
        .mfh-pill-row { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 6px; }
      `}</style>

      <div style={{ fontFamily: INTER, background: '#f4f5f6', minHeight: '100vh' }}>
        <MutualFundsHeader />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 0' }}>
          <h1 style={{ margin: '0 0 6px', font: `700 26px ${INTER}`, color: '#101214', letterSpacing: '-0.01em' }}>
            All Mutual Funds
          </h1>
          <p style={{ margin: '0 0 22px', font: `14px ${INTER}`, color: '#565c62' }}>
            Compare returns and risk across every AMFI-registered scheme on Fermor, updated daily.
          </p>

          <div style={{ background: '#fff', border: '1px solid #e3e6e8', borderRadius: 12, padding: 18, marginBottom: 26 }}>
            <MutualFundsSearchClient />
          </div>

          <div className="mfh-insight-grid" style={{ marginBottom: 26 }}>
            <InsightCard label="Equity Avg · 1Y" value={fmtPct(equityAvg)} color={pctColor(equityAvg)} />
            <InsightCard label="Debt Avg · 1Y" value={fmtPct(debtAvg)} color={pctColor(debtAvg)} />
            <InsightCard label="Hybrid Avg · 1Y" value={fmtPct(hybridAvg)} color={pctColor(hybridAvg)} />
            <InsightCard label="Showing" value={String(filtered.length)} color="#101214" sub={`of ${withRisk.length} funds`} />
          </div>

          {quickPills.length > 0 && (
            <div className="mfh-pill-row" style={{ marginBottom: 20 }}>
              {quickPills.map(p => (
                <Link key={p.label} href={p.href} style={{
                  flexShrink: 0, padding: '9px 16px', borderRadius: 10, fontSize: 13.5, fontWeight: 600,
                  whiteSpace: 'nowrap', textDecoration: 'none',
                  background: p.active ? '#101214' : '#fff', color: p.active ? '#fff' : '#101214',
                  border: `1px solid ${p.active ? '#101214' : '#e3e6e8'}`,
                }}>
                  {p.label}
                </Link>
              ))}
            </div>
          )}

          <MutualFundsFilterBar categoryOptions={categoryOptions} riskOptions={riskOptions} amcOptions={amcOptions} clearAllHref={clearAllHref} />

          <div style={{ display: 'flex', gap: 10, marginBottom: 16, fontSize: 12.5, color: '#80868c', alignItems: 'center', flexWrap: 'wrap' }}>
            <span>Sort by:</span>
            {[{ key: '1y', label: '1Y' }, { key: '3y', label: '3Y' }, { key: '5y', label: '5Y' }, { key: 'name', label: 'Name' }].map(s => (
              <Link key={s.key} href={sortHref(s.key)}
                style={{ fontWeight: sortKey === s.key ? 700 : 500, color: sortKey === s.key ? '#1f7a58' : '#565c62', textDecoration: 'none' }}>
                {s.label}{sortKey === s.key ? (sortDir === 'desc' ? ' ▼' : ' ▲') : ''}
              </Link>
            ))}
          </div>

          <MutualFundsResultsTable funds={pageFunds} />

          {totalPages > 1 && (
            <nav aria-label="Pagination" style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 40, fontFamily: INTER }}>
              {clampedPage > 1 && (
                <Link href={pagePath(clampedPage - 1)} style={pageLinkStyle(false)}>&larr; Prev</Link>
              )}
              <span style={{ padding: '8px 14px', fontSize: 13.5, color: '#565c62' }}>Page {clampedPage} of {totalPages}</span>
              {clampedPage < totalPages && (
                <Link href={pagePath(clampedPage + 1)} style={pageLinkStyle(false)}>Next &rarr;</Link>
              )}
            </nav>
          )}

          {/* P2 content CTA cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: 16, marginBottom: 40 }}>
            <Link className="fx-btn" href="/calculators/sip-calculator" style={{ display: 'block', background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', borderRadius: 14, padding: 22, textDecoration: 'none' }}>
              <div style={{ font: `600 12.5px ${INTER}`, color: '#a6dbc4', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 8 }}>Tool</div>
              <div style={{ font: `700 17px ${INTER}`, marginBottom: 6 }}>SIP Calculator</div>
              <div style={{ font: `13.5px ${INTER}`, color: '#c4c9cd' }}>See how a monthly SIP could grow over time.</div>
            </Link>
            <div style={{ display: 'block', background: '#fff', border: '1px solid #e3e6e8', borderRadius: 14, padding: 22 }}>
              <div style={{ font: `600 12.5px ${INTER}`, color: '#1f7a58', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 8 }}>Compare</div>
              <div style={{ font: `700 17px ${INTER}`, color: '#101214', marginBottom: 6 }}>Compare up to 4 funds</div>
              <div style={{ font: `13.5px ${INTER}`, color: '#565c62' }}>Tick funds in the table above, then compare them side by side.</div>
            </div>
            <Link href="/mutual-funds/amc" style={{ display: 'block', background: '#fff', border: '1px solid #e3e6e8', borderRadius: 14, padding: 22, textDecoration: 'none' }}>
              <div style={{ font: `600 12.5px ${INTER}`, color: '#1f7a58', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 8 }}>Browse</div>
              <div style={{ font: `700 17px ${INTER}`, color: '#101214', marginBottom: 6 }}>Browse by fund house</div>
              <div style={{ font: `13.5px ${INTER}`, color: '#565c62' }}>Pick an AMC, then choose from every scheme it runs.</div>
            </Link>
          </div>
        </div>

        <MutualFundsFooter />
      </div>
    </>
  );
}

function InsightCard({ label, value, color, sub }: { label: string; value: string; color: string; sub?: string }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e3e6e8', borderRadius: 12, padding: '16px 18px' }}>
      <div style={{ font: `600 12.5px ${INTER}`, color: '#80868c', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 8 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: 'monospace', fontSize: 21, fontWeight: 600, color }}>{value}</span>
        {sub && <span style={{ font: `12.5px ${INTER}`, color: '#80868c' }}>{sub}</span>}
      </div>
    </div>
  );
}

function pageLinkStyle(active: boolean): React.CSSProperties {
  return {
    padding: '8px 14px', borderRadius: 8, fontSize: 13.5, fontWeight: 600, textDecoration: 'none',
    background: active ? '#101214' : '#fff', color: active ? '#fff' : '#101214', border: '1px solid #e3e6e8',
  };
}

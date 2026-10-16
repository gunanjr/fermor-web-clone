'use client';

import { useMemo, useState } from 'react';
import type { GDPYearRow, PPPYearRow } from './country-types';

const INTER = 'var(--font-inter), Inter, sans-serif';
const C = {
  dark: '#111111',
  ink: '#333333',
  ink2: '#555555',
  ink3: '#888888',
  border: '#E5E5E5',
  bg: '#F7F7F7',
  blue: '#1D4ED8',
};

type Tab = 'nominal' | 'ppp';
type SortDir = 'asc' | 'desc';

function formatGDP(billions: number): string {
  return `$${Math.round(billions * 1e9).toLocaleString('en-US')}`;
}

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={active ? C.blue : C.ink3} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
      style={{ marginLeft: 4, transform: active && dir === 'asc' ? 'rotate(180deg)' : 'none', flexShrink: 0 }}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function CountryGDPTableClient({
  nominal, ppp, countryName, hasPPP,
}: {
  nominal: GDPYearRow[];
  ppp: PPPYearRow[];
  countryName: string;
  hasPPP: boolean;
}) {
  const [tab, setTab] = useState<Tab>('nominal');
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<string>('year');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const isFiltered = search.trim() !== '' || sortKey !== 'year' || sortDir !== 'desc';

  function toggleSort(key: string) {
    if (sortKey === key) setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('desc'); }
  }

  const nominalRows = useMemo(() => {
    let rows = nominal;
    if (search.trim()) rows = rows.filter(r => r.year.toString().includes(search.trim()));
    return [...rows].sort((a, b) => {
      const av = (a as unknown as Record<string, number | null>)[sortKey] ?? -Infinity;
      const bv = (b as unknown as Record<string, number | null>)[sortKey] ?? -Infinity;
      return sortDir === 'asc' ? av - bv : bv - av;
    });
  }, [nominal, search, sortKey, sortDir]);

  const pppRows = useMemo(() => {
    let rows = ppp;
    if (search.trim()) rows = rows.filter(r => r.year.toString().includes(search.trim()));
    return [...rows].sort((a, b) => {
      const av = (a as unknown as Record<string, number | null>)[sortKey] ?? -Infinity;
      const bv = (b as unknown as Record<string, number | null>)[sortKey] ?? -Infinity;
      return sortDir === 'asc' ? av - bv : bv - av;
    });
  }, [ppp, search, sortKey, sortDir]);

  const thStyle: React.CSSProperties = { padding: '10px 14px', textAlign: 'right', fontFamily: INTER, fontSize: 11.5, fontWeight: 700, color: C.ink, letterSpacing: '.03em', textTransform: 'uppercase', borderBottom: `2px solid ${C.border}`, background: C.bg, cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap' };
  const tdStyle: React.CSSProperties = { padding: '9px 14px', textAlign: 'right', fontFamily: INTER, fontSize: 13, color: C.ink, borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap' };

  return (
    <div style={{ fontFamily: INTER }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, borderBottom: `1px solid ${C.border}` }}>
        <button onClick={() => { setTab('nominal'); setSortKey('year'); setSortDir('desc'); }}
          style={{ background: 'none', border: 'none', padding: '8px 4px', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: tab === 'nominal' ? C.dark : C.ink3, borderBottom: tab === 'nominal' ? `2px solid ${C.blue}` : '2px solid transparent', marginBottom: -1 }}>
          Nominal GDP
        </button>
        {hasPPP && (
          <button onClick={() => { setTab('ppp'); setSortKey('year'); setSortDir('desc'); }}
            style={{ background: 'none', border: 'none', padding: '8px 4px', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: tab === 'ppp' ? C.dark : C.ink3, borderBottom: tab === 'ppp' ? `2px solid ${C.blue}` : '2px solid transparent', marginBottom: -1 }}>
            PPP GDP
          </button>
        )}
      </div>

      <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <div style={{ maxWidth: 220, flex: '1 1 220px' }}>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search year..."
            aria-label="Search by year"
            style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: `1px solid ${C.border}`, fontFamily: INTER, fontSize: 13, color: C.dark, outline: 'none', boxSizing: 'border-box' }} />
        </div>
        {isFiltered && (
          <button
            onClick={() => { setSearch(''); setSortKey('year'); setSortDir('desc'); }}
            style={{
              padding: '7px 13px', borderRadius: 7, fontFamily: INTER, fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
              border: `1px solid ${C.border}`, background: '#fff', color: C.ink3,
              display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /></svg>
            Reset
          </button>
        )}
      </div>

      <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          {tab === 'nominal' ? (
            <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 520 }}>
              <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{countryName} nominal GDP by year</caption>
              <thead>
                <tr>
                  <th scope="col" style={{ ...thStyle, textAlign: 'left' }} onClick={() => toggleSort('year')}>
                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>Year <SortIcon active={sortKey === 'year'} dir={sortDir} /></span>
                  </th>
                  <th scope="col" style={thStyle} onClick={() => toggleSort('gdp')}>
                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>GDP Nominal (Current USD) <SortIcon active={sortKey === 'gdp'} dir={sortDir} /></span>
                  </th>
                  <th scope="col" style={thStyle} onClick={() => toggleSort('growth')}>
                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>GDP Growth <SortIcon active={sortKey === 'growth'} dir={sortDir} /></span>
                  </th>
                  <th scope="col" style={thStyle} onClick={() => toggleSort('perCapita')}>
                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>GDP per capita <SortIcon active={sortKey === 'perCapita'} dir={sortDir} /></span>
                  </th>
                  <th scope="col" style={thStyle} onClick={() => toggleSort('popChangePct')}>
                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>Pop. Change <SortIcon active={sortKey === 'popChangePct'} dir={sortDir} /></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {nominalRows.map((r, i) => (
                  <tr key={r.year} style={{ background: i % 2 === 1 ? '#FAFAFA' : '#fff' }}>
                    <td style={{ ...tdStyle, textAlign: 'left', fontWeight: 600 }}>{r.year}</td>
                    <td style={{ ...tdStyle, fontWeight: 700 }}>{formatGDP(r.gdp)}</td>
                    <td style={{ ...tdStyle, color: r.growth !== null && r.growth < 0 ? C.ink2 : C.ink2, fontWeight: 700 }}>{r.growth === null ? '—' : `${r.growth}%`}</td>
                    <td style={tdStyle}>{r.perCapita === null ? '—' : `$${Math.round(r.perCapita).toLocaleString('en-US')}`}</td>
                    <td style={tdStyle}>{r.popChangePct === null ? '—' : `${r.popChangePct}%`}</td>
                  </tr>
                ))}
                {nominalRows.length === 0 && <tr><td colSpan={5} style={{ padding: 20, textAlign: 'center', color: C.ink3 }}>No year matches &quot;{search}&quot;.</td></tr>}
              </tbody>
            </table>
          ) : (
            <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 520 }}>
              <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{countryName} PPP GDP by year</caption>
              <thead>
                <tr>
                  <th scope="col" style={{ ...thStyle, textAlign: 'left' }} onClick={() => toggleSort('year')}>
                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>Year <SortIcon active={sortKey === 'year'} dir={sortDir} /></span>
                  </th>
                  <th scope="col" style={thStyle} onClick={() => toggleSort('gdpPPP')}>
                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>GDP PPP <SortIcon active={sortKey === 'gdpPPP'} dir={sortDir} /></span>
                  </th>
                  <th scope="col" style={thStyle} onClick={() => toggleSort('perCapitaPPP')}>
                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>GDP PPP per Capita <SortIcon active={sortKey === 'perCapitaPPP'} dir={sortDir} /></span>
                  </th>
                  <th scope="col" style={thStyle} onClick={() => toggleSort('perCapitaPPPChangePct')}>
                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>PPP Per Capita Change <SortIcon active={sortKey === 'perCapitaPPPChangePct'} dir={sortDir} /></span>
                  </th>
                  <th scope="col" style={thStyle} onClick={() => toggleSort('popChangePct')}>
                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>Pop. Change <SortIcon active={sortKey === 'popChangePct'} dir={sortDir} /></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {pppRows.map((r, i) => (
                  <tr key={r.year} style={{ background: i % 2 === 1 ? '#FAFAFA' : '#fff' }}>
                    <td style={{ ...tdStyle, textAlign: 'left', fontWeight: 600 }}>{r.year}</td>
                    <td style={{ ...tdStyle, fontWeight: 700 }}>{formatGDP(r.gdpPPP)}</td>
                    <td style={tdStyle}>{r.perCapitaPPP === null ? '—' : `$${Math.round(r.perCapitaPPP).toLocaleString('en-US')}`}</td>
                    <td style={tdStyle}>{r.perCapitaPPPChangePct === null ? '—' : `${r.perCapitaPPPChangePct}%`}</td>
                    <td style={tdStyle}>{r.popChangePct === null ? '—' : `${r.popChangePct}%`}</td>
                  </tr>
                ))}
                {pppRows.length === 0 && <tr><td colSpan={5} style={{ padding: 20, textAlign: 'center', color: C.ink3 }}>No year matches &quot;{search}&quot;.</td></tr>}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

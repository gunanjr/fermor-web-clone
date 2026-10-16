'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { GDP_DATA_FULL, type GDPRow } from '../../blogs/world-gdp-ranking-2026/gdpData';

const C = {
  dark:   '#111111',
  dg:     '#101214',
  ink:    '#333333',
  ink2:   '#555555',
  ink3:   '#888888',
  border: '#E5E5E5',
  bg:     '#F7F7F7',
  green:  '#166534',
};
const INTER   = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

type SortKey = 'rank' | 'country' | 'gdpFull' | 'growth' | 'perCapita';
type Region = 'All' | 'Asia' | 'Africa' | 'Europe' | 'Americas' | 'Oceania';

function formatGDP(v: number): string {
  if (v >= 1e12) return `$${(v / 1e12).toFixed(2)}T`;
  if (v >= 1e9) return `$${(v / 1e9).toFixed(2)}B`;
  return `$${(v / 1e6).toFixed(2)}M`;
}

function SortIcon({ active, dir }: { active: boolean; dir: 'asc' | 'desc' }) {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={active ? C.dg : C.ink3} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
      style={{ marginLeft: 4, transform: active && dir === 'asc' ? 'rotate(180deg)' : 'none', flexShrink: 0 }}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function GDPHubTableClient({ builtSlugs, slugOf }: { builtSlugs: string[]; slugOf: Record<string, string> }) {
  const builtSet = useMemo(() => new Set(builtSlugs), [builtSlugs]);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState<Region>('All');
  const [sortKey, setSortKey] = useState<SortKey>('rank');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const isFiltered = search.trim() !== '' || region !== 'All' || sortKey !== 'rank' || sortDir !== 'asc';

  const rows = useMemo(() => {
    let filtered: GDPRow[] = GDP_DATA_FULL;
    if (region !== 'All') filtered = filtered.filter(r => r.region === region);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter(r => r.country.toLowerCase().includes(q));
    }
    return [...filtered].sort((a, b) => {
      let av: number | string = a[sortKey];
      let bv: number | string = b[sortKey];
      if (typeof av === 'string') av = av.toLowerCase();
      if (typeof bv === 'string') bv = bv.toLowerCase();
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [search, region, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  }

  const regions: Region[] = ['All', 'Asia', 'Africa', 'Europe', 'Americas', 'Oceania'];
  const hasNotes = rows.some(r => r.note);

  const headerCell = (key: SortKey, label: string, align: 'left' | 'right' = 'right') => (
    <th
      scope="col"
      role="columnheader"
      aria-sort={sortKey === key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
      style={{
        padding: '10px 12px', textAlign: align, fontFamily: INTER, fontSize: 11.5, fontWeight: 700, color: C.ink,
        letterSpacing: '.04em', textTransform: 'uppercase', borderBottom: `2px solid ${C.border}`, cursor: 'pointer',
        userSelect: 'none', whiteSpace: 'nowrap', background: C.bg,
      }}
    >
      <button
        onClick={() => toggleSort(key)}
        style={{ all: 'unset', display: 'inline-flex', alignItems: 'center', cursor: 'pointer', justifyContent: align === 'right' ? 'flex-end' : 'flex-start', width: '100%' }}
        aria-label={`Sort by ${label}`}
      >
        {label}
        <SortIcon active={sortKey === key} dir={sortDir} />
      </button>
    </th>
  );

  return (
    <div style={{ fontFamily: INTER, marginBottom: 8 }}>
      <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 220px', minWidth: 200 }}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search a country..."
            aria-label="Search countries by name"
            style={{
              width: '100%', padding: '9px 14px', borderRadius: 8, border: `1px solid ${C.border}`,
              fontFamily: INTER, fontSize: 13.5, color: C.dark, outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {regions.map(r => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              aria-pressed={region === r}
              style={{
                padding: '7px 13px', borderRadius: 7, fontFamily: INTER, fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
                border: region === r ? `1.5px solid ${C.dark}` : `1px solid ${C.border}`,
                background: region === r ? C.dark : '#fff',
                color: region === r ? '#fff' : C.ink2,
              }}
            >
              {r}
            </button>
          ))}
          {isFiltered && (
            <button
              onClick={() => { setSearch(''); setRegion('All'); setSortKey('rank'); setSortDir('asc'); }}
              style={{
                padding: '7px 13px', borderRadius: 7, fontFamily: INTER, fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
                border: `1px solid ${C.border}`, background: '#fff', color: C.ink3,
                display: 'flex', alignItems: 'center', gap: 5,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /></svg>
              Reset
            </button>
          )}
        </div>
      </div>

      <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 620 }}>
            <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
              GDP by country, all {GDP_DATA_FULL.length} countries and territories
            </caption>
            <thead>
              <tr>
                {headerCell('rank', '#', 'left')}
                {headerCell('country', 'Country', 'left')}
                {headerCell('gdpFull', 'GDP', 'right')}
                {headerCell('growth', 'Growth', 'right')}
                {headerCell('perCapita', 'Per Capita', 'right')}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const slug = slugOf[row.country];
                const hasPage = slug ? builtSet.has(slug) : false;
                return (
                  <tr key={row.country} style={{ background: i % 2 === 1 ? '#FAFAFA' : '#fff' }}>
                    <td style={{ padding: '9px 12px', fontSize: 12.5, color: C.ink3, borderBottom: `1px solid ${C.border}` }}>{row.rank}</td>
                    <td style={{ padding: '9px 12px', fontSize: 13.5, borderBottom: `1px solid ${C.border}` }}>
                      {hasPage ? (
                        <Link href={`/gdp/${slug}`} target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600, textDecoration: 'none' }}>{row.country}</Link>
                      ) : (
                        <span style={{ color: C.ink }}>{row.country}</span>
                      )}
                      {row.note ? <sup title={`Latest available estimate: ${row.note}, not a 2026 projection`} style={{ color: C.ink3, marginLeft: 2, cursor: 'help' }}>†</sup> : null}
                    </td>
                    <td style={{ padding: '9px 12px', fontSize: 13, textAlign: 'right', fontFamily: POPPINS, fontWeight: 500, color: C.ink, borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap' }}>{formatGDP(row.gdpFull)}</td>
                    <td style={{ padding: '9px 12px', fontSize: 12.5, textAlign: 'right', color: row.growth > 5 ? C.green : C.ink2, fontWeight: row.growth > 5 ? 700 : 400, borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap' }}>{row.growth > 0 ? '+' : ''}{row.growth}%</td>
                    <td style={{ padding: '9px 12px', fontSize: 12.5, textAlign: 'right', color: C.ink2, borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap' }}>${row.perCapita.toLocaleString('en-US')}</td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr><td colSpan={5} style={{ padding: '24px 16px', textAlign: 'center', fontSize: 13.5, color: C.ink3 }}>No country matches &quot;{search}&quot;.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '9px 16px', background: C.bg, borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: 11.5, color: C.ink3 }}>Showing {rows.length} of {GDP_DATA_FULL.length} countries and territories. {builtSlugs.length} have a detailed page live so far. Source: IMF World Economic Outlook (April 2026).</span>
          {hasNotes && <span style={{ fontSize: 11.5, color: C.ink3 }}>† Not a 2026 projection; latest available estimate.</span>}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { buildSchemeSlug } from '../../../../src/utils/mutualFundSlug';

const INTER = 'system-ui, -apple-system, sans-serif';

export interface AmcFundRow {
  schemeCode: string;
  schemeName: string;
  category: string;
  nav: number;
  navDate: string;
  oneYearReturnPct: number | null;
}

function shortCategory(category: string): string {
  return category.replace(/^(Open|Close|Interval) ?Ended Schemes?\(/i, '').replace(/\)$/, '');
}

// A single unfiltered table is fine for a small AMC (3-30 schemes) but unusable for the biggest
// ones - Nippon alone runs 400+ canonical schemes, mostly close-ended FMP/interval series each
// with its own code. Filtering by category (real data already on every row, not a new field)
// is what makes "browse this AMC's funds manually" actually work at that scale, matching the
// manual AMC -> fund -> scheme page flow the homepage's search alternative promises.
export function AmcFundTable({ funds }: { funds: AmcFundRow[] }) {
  const categories = useMemo(() => {
    const set = new Set(funds.map(f => shortCategory(f.category)));
    return ['All categories', ...Array.from(set).sort()];
  }, [funds]);
  const [category, setCategory] = useState('All categories');

  const filtered = category === 'All categories' ? funds : funds.filter(f => shortCategory(f.category) === category);

  return (
    <div style={{ fontFamily: INTER }}>
      {categories.length > 2 && (
        <div style={{ marginBottom: 14 }}>
          <label htmlFor="amc-category-filter" style={{ display: 'block', font: '600 12px system-ui', color: '#565c62', marginBottom: 6 }}>
            Filter by category
          </label>
          <select
            id="amc-category-filter"
            value={category}
            onChange={e => setCategory(e.target.value)}
            style={{
              width: '100%', maxWidth: 320, padding: '9px 12px', borderRadius: 8,
              border: '1px solid #e3e6e8', font: '13.5px system-ui,sans-serif', color: '#101214',
              background: '#fff',
            }}
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      )}

      <div style={{ border: '1px solid #e3e6e8', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 600, fontSize: 13 }}>
            <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
              Mutual fund schemes in the selected category
            </caption>
            <thead>
              <tr>
                <th scope="col" style={thS}>Scheme</th>
                <th scope="col" style={thS}>Category</th>
                <th scope="col" style={{ ...thS, textAlign: 'right' }}>NAV</th>
                <th scope="col" style={{ ...thS, textAlign: 'right' }}>1Y Return</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((f, i) => (
                <tr key={f.schemeCode} style={{ background: i % 2 === 1 ? '#fafafa' : '#fff' }}>
                  <td style={tdL}>
                    <Link
                      href={`/mutual-funds/${buildSchemeSlug(f.schemeCode, f.schemeName)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#101214', fontWeight: 600, textDecoration: 'none' }}
                    >
                      {f.schemeName}
                    </Link>
                  </td>
                  <td style={{ ...tdL, color: '#80868c' }}>{shortCategory(f.category)}</td>
                  <td style={tdR}>&#8377;{f.nav.toFixed(2)}</td>
                  <td style={{ ...tdR, color: f.oneYearReturnPct == null ? '#80868c' : f.oneYearReturnPct >= 0 ? '#1f7a58' : '#C0392B' }}>
                    {f.oneYearReturnPct == null ? '-' : `${f.oneYearReturnPct >= 0 ? '+' : ''}${f.oneYearReturnPct.toFixed(2)}%`}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: '24px 16px', textAlign: 'center', fontSize: 13.5, color: '#80868c' }}>
                    No schemes in this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '9px 16px', background: '#f4f5f6', borderTop: '1px solid #e3e6e8' }}>
          <span style={{ fontSize: 11.5, color: '#80868c' }}>
            Showing {filtered.length} of {funds.length} schemes. 1Y return is point-to-point, not annualised.
          </span>
        </div>
      </div>
    </div>
  );
}

const thS: React.CSSProperties = {
  padding: '10px 12px', textAlign: 'left', fontFamily: INTER, fontSize: 11.5, fontWeight: 700, color: '#101214',
  letterSpacing: '.04em', textTransform: 'uppercase', borderBottom: '2px solid #e3e6e8', background: '#f4f5f6',
  whiteSpace: 'nowrap',
};
const tdL: React.CSSProperties = { padding: '10px 12px', fontSize: 13.5, color: '#565c62', borderBottom: '1px solid #e3e6e8', verticalAlign: 'top' };
const tdR: React.CSSProperties = { padding: '10px 12px', fontSize: 13, textAlign: 'right', fontWeight: 600, borderBottom: '1px solid #e3e6e8', whiteSpace: 'nowrap', verticalAlign: 'top' };

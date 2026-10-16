'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { buildSchemeSlug } from '../../src/utils/mutualFundSlug';

const C = {
  dark:   '#101214',
  ink:    '#16140F',
  ink2:   '#50565c',
  ink3:   '#7a8087',
  border: '#e3e6e8',
  bg:     '#f6f7f8',
  green:  '#166534',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

interface MutualFundNav {
  schemeCode: string;
  schemeName: string;
  amcName: string | null;
  category: string;
  nav: number;
  navDate: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.fermor.in';

export function MutualFundsSearchClient() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MutualFundNav[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setResults([]);
      setStatus('idle');
      return;
    }
    setStatus('loading');
    const controller = new AbortController();
    // One silent retry before surfacing an error: a single failed fetch on a serverless API is
    // more often a cold-start or transient network blip than a real outage, and a user typing a
    // search query shouldn't see "unavailable" for something that would have succeeded a second
    // later. Only the second failure in a row is treated as a genuine error.
    const fetchResults = async (attempt: number): Promise<void> => {
      try {
        const res = await fetch(`${API_BASE}/mutual-funds/search?q=${encodeURIComponent(q)}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error('search failed');
        const data = await res.json();
        setResults(data.results ?? []);
        setStatus('done');
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        if (attempt === 0) {
          await new Promise(r => setTimeout(r, 600));
          if (!controller.signal.aborted) await fetchResults(1);
        } else {
          setStatus('error');
        }
      }
    };
    const timer = setTimeout(() => fetchResults(0), 300);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const navDateLabel = useMemo(() => {
    const first = results[0];
    if (!first) return null;
    return new Date(first.navDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }, [results]);

  return (
    <div style={{ fontFamily: INTER, marginBottom: 8 }}>
      <div style={{ position: 'relative', marginBottom: 14, maxWidth: 480 }}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search a mutual fund scheme, e.g. Parag Parikh Flexi Cap"
          aria-label="Search mutual fund schemes by name"
          style={{
            width: '100%', padding: '11px 14px', borderRadius: 8, border: `1px solid ${C.border}`,
            fontFamily: INTER, fontSize: 14, color: C.ink, outline: 'none', boxSizing: 'border-box',
          }}
        />
      </div>

      {status === 'idle' && query.trim().length === 0 && (
        <p style={{ fontSize: 13.5, color: C.ink3, margin: '0 0 8px' }}>
          Type at least 2 characters to search across 14,000+ mutual fund schemes, updated daily from AMFI.
        </p>
      )}
      {status === 'idle' && query.trim().length === 1 && (
        <p style={{ fontSize: 13.5, color: C.ink3, margin: '0 0 8px' }}>Keep typing to search.</p>
      )}
      {status === 'loading' && (
        <p style={{ fontSize: 13.5, color: C.ink3, margin: '0 0 8px' }}>Searching...</p>
      )}
      {status === 'error' && (
        <p style={{ fontSize: 13.5, color: C.ink3, margin: '0 0 8px' }}>
          Search is temporarily unavailable. Try again in a moment.
        </p>
      )}

      {status === 'done' && (
        <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 560, fontSize: 13 }}>
              <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
                Mutual fund search results for &quot;{query}&quot;
              </caption>
              <thead>
                <tr>
                  <th scope="col" style={thS}>Scheme</th>
                  <th scope="col" style={thS}>AMC</th>
                  <th scope="col" style={{ ...thS, textAlign: 'right' }}>NAV</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={r.schemeCode} style={{ background: i % 2 === 1 ? '#fafafa' : '#fff' }}>
                    <td style={tdL}>
                      <Link
                        href={`/mutual-funds/${buildSchemeSlug(r.schemeCode, r.schemeName)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: C.dark, fontWeight: 600, textDecoration: 'none' }}
                      >
                        {r.schemeName}
                      </Link>
                      <div style={{ fontSize: 11.5, color: C.ink3, marginTop: 2 }}>{r.category}</div>
                    </td>
                    <td style={tdL}>{r.amcName ?? '-'}</td>
                    <td style={tdR}>&#8377;{r.nav.toFixed(4)}</td>
                  </tr>
                ))}
                {results.length === 0 && (
                  <tr>
                    <td colSpan={3} style={{ padding: '24px 16px', textAlign: 'center', fontSize: 13.5, color: C.ink3 }}>
                      No scheme matches &quot;{query}&quot;.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {results.length > 0 && (
            <div style={{ padding: '9px 16px', background: C.bg, borderTop: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 11.5, color: C.ink3 }}>
                Showing top {results.length} matches. NAV as of {navDateLabel}, per AMFI.
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const thS: React.CSSProperties = {
  padding: '10px 12px', textAlign: 'left', fontFamily: INTER, fontSize: 11.5, fontWeight: 700, color: C.ink,
  letterSpacing: '.04em', textTransform: 'uppercase', borderBottom: `2px solid ${C.border}`, background: C.bg,
  whiteSpace: 'nowrap',
};
const tdL: React.CSSProperties = { padding: '10px 12px', fontSize: 13.5, color: C.ink2, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' };
const tdR: React.CSSProperties = { padding: '10px 12px', fontSize: 13, textAlign: 'right', color: C.green, fontWeight: 600, borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap', verticalAlign: 'top' };

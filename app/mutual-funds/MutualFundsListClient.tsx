'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { buildSchemeSlug } from '../../src/utils/mutualFundSlug';
import { getAmcLogo } from '../../src/utils/amcLogos';

const INTER = 'system-ui, -apple-system, sans-serif';
const MAX_COMPARE = 4;

export interface FilterOption {
  label: string;
  href: string;
  active: boolean;
  logo?: string | null;
}

export interface DisplayFund {
  schemeCode: string;
  schemeName: string;
  amcName: string | null;
  category: string;
  nav: number;
  oneYearReturnPct: number | null;
  threeYearReturnPct: number | null;
  fiveYearReturnPct: number | null;
  riskTier: string | null;
}

// Same fixed-color initials badge already used on the AMC directory pages, for AMCs without a
// verified real logo file (see src/utils/amcLogos.ts).
function initials(name: string): string {
  return name.replace(/Mutual Fund$/i, '').trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function AmcAvatar({ amcName, size = 34 }: { amcName: string | null; size?: number }) {
  const logo = getAmcLogo(amcName);
  if (logo) {
    return (
      <div style={{ width: size, height: size, borderRadius: 9, overflow: 'hidden', flexShrink: 0, border: '1px solid #e3e6e8', background: '#fff' }}>
        <Image src={logo} alt="" width={size} height={size} style={{ width: '100%', height: '100%', objectFit: 'contain' }} unoptimized />
      </div>
    );
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: 9, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#f1f3f4', color: '#1f7a58', fontSize: size * 0.36, fontWeight: 700, fontFamily: INTER,
    }}>
      {amcName ? initials(amcName) : '—'}
    </div>
  );
}

function fmtPct(v: number | null): string {
  return v == null ? '-' : `${v >= 0 ? '+' : ''}${v.toFixed(2)}%`;
}
function pctColor(v: number | null): string {
  return v == null ? '#80868c' : v >= 0 ? '#1f7a58' : '#C0392B';
}

// Dropdown open/close and outside-click-to-close - the only reason this table needs to be a
// client component at all. The fund rows themselves (and their <Link>s to real scheme pages) are
// present in the initial server-rendered HTML regardless, same as AmcFundTable.tsx.
function FilterDropdown({ label, options, name, showLogos }: { label: string; options: FilterOption[]; name: string; showLogos?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const anyActive = options.some(o => o.active);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label={`Filter by ${name}`}
        style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '9px 14px', borderRadius: 20,
          fontSize: 13.5, fontWeight: 600, cursor: 'pointer', background: '#fff', fontFamily: INTER,
          border: `1px solid ${anyActive ? '#2D9970' : '#e3e6e8'}`, color: anyActive ? '#1f7a58' : '#101214',
        }}
      >
        {label} <span style={{ fontSize: 10 }}>&#9662;</span>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', left: 0, background: '#fff', border: '1px solid #e3e6e8',
          borderRadius: 12, boxShadow: '0 12px 32px rgba(22,32,26,0.14)', padding: 8, minWidth: 220,
          maxHeight: 320, overflowY: 'auto', zIndex: 36,
        }}>
          {options.map(opt => (
            <Link
              key={opt.label}
              href={opt.href}
              onClick={() => setOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: 9, padding: '8px 8px', borderRadius: 7,
                fontSize: 13.5, fontFamily: INTER, textDecoration: 'none', color: '#101214',
              }}
            >
              <span style={{
                width: 16, height: 16, borderRadius: 4, border: `1.5px solid ${opt.active ? '#2D9970' : '#D8D5CC'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff',
                background: opt.active ? '#101214' : 'transparent', flexShrink: 0,
              }}>{opt.active ? '✓' : ''}</span>
              {showLogos && (
                opt.logo
                  ? <Image src={opt.logo} alt="" width={18} height={18} style={{ width: 18, height: 18, borderRadius: 4, objectFit: 'contain', flexShrink: 0 }} unoptimized />
                  : <span style={{ width: 18, height: 18, borderRadius: 4, flexShrink: 0 }} />
              )}
              {opt.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function MutualFundsFilterBar({
  categoryOptions, riskOptions, amcOptions, clearAllHref,
}: {
  categoryOptions: FilterOption[]; riskOptions: FilterOption[]; amcOptions: FilterOption[]; clearAllHref: string | null;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
      <FilterDropdown label="Categories" options={categoryOptions} name="category" />
      <FilterDropdown label="Risk" options={riskOptions} name="risk" />
      <FilterDropdown label="Fund House" options={amcOptions} name="fund house" showLogos />
      {clearAllHref && (
        <Link href={clearAllHref} style={{ marginLeft: 'auto', fontSize: 13.5, color: '#80868c', fontWeight: 500, textDecoration: 'none', padding: '9px 4px' }}>
          Clear all
        </Link>
      )}
    </div>
  );
}

export function MutualFundsResultsTable({ funds }: { funds: DisplayFund[] }) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (code: string) => {
    setSelected(prev => {
      if (prev.includes(code)) return prev.filter(c => c !== code);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, code];
    });
  };

  return (
    <div>
      {/* Desktop table */}
      <div className="mf-screener-desktop" style={{ background: '#fff', border: '1px solid #e3e6e8', borderRadius: 14, overflow: 'hidden', marginBottom: 28 }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '34px 2.2fr 1.2fr 0.85fr 0.85fr 0.85fr 1fr', alignItems: 'center',
          gap: 8, padding: '14px 20px', background: '#f4f5f6', borderBottom: '1px solid #e3e6e8',
          fontSize: 12, fontWeight: 700, color: '#80868c', textTransform: 'uppercase', letterSpacing: '.03em', fontFamily: INTER,
        }}>
          <div />
          <div>Fund Name</div>
          <div>Category</div>
          <div>1Y</div>
          <div>3Y</div>
          <div>5Y</div>
          <div>Risk</div>
        </div>
        {funds.map((f, i) => (
          <div key={f.schemeCode} style={{
            display: 'grid', gridTemplateColumns: '34px 2.2fr 1.2fr 0.85fr 0.85fr 0.85fr 1fr', alignItems: 'center',
            gap: 8, padding: '14px 20px', borderBottom: i === funds.length - 1 ? 'none' : '1px solid #F0EEE8',
          }}>
            <input
              type="checkbox"
              checked={selected.includes(f.schemeCode)}
              disabled={!selected.includes(f.schemeCode) && selected.length >= MAX_COMPARE}
              onChange={() => toggle(f.schemeCode)}
              aria-label={`Select ${f.schemeName} to compare`}
              style={{ width: 16, height: 16, cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
              <AmcAvatar amcName={f.amcName} />
              <div style={{ minWidth: 0 }}>
                <Link href={`/mutual-funds/${buildSchemeSlug(f.schemeCode, f.schemeName)}`} style={{ fontSize: 14, fontWeight: 600, color: '#101214', textDecoration: 'none' }}>
                  {f.schemeName}
                </Link>
                <div style={{ fontSize: 12, color: '#80868c', marginTop: 2 }}>{f.amcName ?? '—'}</div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: '#565c62' }}>{f.category}</div>
            <div style={{ fontFamily: 'monospace', fontSize: 13.5, fontWeight: 600, color: pctColor(f.oneYearReturnPct) }}>{fmtPct(f.oneYearReturnPct)}</div>
            <div style={{ fontFamily: 'monospace', fontSize: 13.5, fontWeight: 600, color: pctColor(f.threeYearReturnPct) }}>{fmtPct(f.threeYearReturnPct)}</div>
            <div style={{ fontFamily: 'monospace', fontSize: 13.5, fontWeight: 600, color: pctColor(f.fiveYearReturnPct) }}>{fmtPct(f.fiveYearReturnPct)}</div>
            <div style={{ fontSize: 12, color: '#565c62' }}>{f.riskTier ?? 'Varies'}</div>
          </div>
        ))}
        {funds.length === 0 && (
          <div style={{ padding: '60px 20px', textAlign: 'center', color: '#80868c', fontSize: 14 }}>No funds match these filters. Try clearing a few.</div>
        )}
      </div>

      {/* Mobile cards */}
      <div className="mf-screener-mobile" style={{ display: 'none', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        {funds.map(f => (
          <div key={f.schemeCode} style={{ background: '#fff', border: '1px solid #e3e6e8', borderRadius: 14, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
              <input
                type="checkbox"
                checked={selected.includes(f.schemeCode)}
                disabled={!selected.includes(f.schemeCode) && selected.length >= MAX_COMPARE}
                onChange={() => toggle(f.schemeCode)}
                aria-label={`Select ${f.schemeName} to compare`}
                style={{ width: 18, height: 18, marginTop: 3, cursor: 'pointer', flexShrink: 0 }}
              />
              <AmcAvatar amcName={f.amcName} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <Link href={`/mutual-funds/${buildSchemeSlug(f.schemeCode, f.schemeName)}`} style={{ fontSize: 14.5, fontWeight: 600, color: '#101214', textDecoration: 'none' }}>
                  {f.schemeName}
                </Link>
                <div style={{ fontSize: 12, color: '#80868c', marginTop: 2 }}>{f.category}</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 11, color: '#80868c', marginBottom: 3 }}>1Y</div>
                <div style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 600, color: pctColor(f.oneYearReturnPct) }}>{fmtPct(f.oneYearReturnPct)}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#80868c', marginBottom: 3 }}>3Y</div>
                <div style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 600, color: pctColor(f.threeYearReturnPct) }}>{fmtPct(f.threeYearReturnPct)}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#80868c', marginBottom: 3 }}>5Y</div>
                <div style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 600, color: pctColor(f.fiveYearReturnPct) }}>{fmtPct(f.fiveYearReturnPct)}</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: '#565c62' }}>Risk: {f.riskTier ?? 'Varies'}</div>
          </div>
        ))}
        {funds.length === 0 && (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#80868c', fontSize: 14 }}>No funds match these filters. Try clearing a few.</div>
        )}
      </div>

      {selected.length > 0 && (
        <div style={{
          position: 'sticky', bottom: 0, zIndex: 45, background: '#F4F5F6', border: '1px solid #E3E6E8', color: '#101214', padding: '14px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, boxShadow: '0 -8px 24px rgba(0,0,0,0.15)',
          borderRadius: '14px 14px 0 0', marginBottom: 28, fontFamily: INTER, flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: 14, color: '#c4c9cd' }}>{selected.length} fund{selected.length === 1 ? '' : 's'} selected for comparison</span>
          {selected.length >= 2 ? (
            <Link href={`/mutual-funds/compare?codes=${selected.join(',')}`} style={{ background: '#fff', color: '#101214', padding: '9px 20px', borderRadius: 8, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
              Compare Now
            </Link>
          ) : (
            <span style={{ fontSize: 13, color: '#80868c' }}>Pick at least one more to compare</span>
          )}
          <button type="button" onClick={() => setSelected([])} style={{ background: 'none', border: 'none', font: `13px ${INTER}`, color: '#9aa0a6', cursor: 'pointer', textDecoration: 'underline' }}>
            Clear
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 760px) {
          .mf-screener-desktop { display: none !important; }
          .mf-screener-mobile { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

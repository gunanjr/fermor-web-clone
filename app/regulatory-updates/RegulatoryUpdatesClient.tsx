'use client';

import { useMemo, useState } from 'react';

const INTER = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

const C = {
  dark: '#1A3530',
  ink: '#16140F',
  ink2: '#5A5A52',
  ink3: '#8A8F86',
  white: '#ffffff',
  bg: '#F4F8F5',
  border: '#E2EBE0',
};

export interface GovUpdate {
  id: string;
  source: 'SEBI' | 'EPFO' | 'INCOME_TAX';
  title: string;
  url: string;
  publishedAt: string | null;
  detectedAt: string;
}

type FilterKey = 'ALL' | GovUpdate['source'];

const SOURCE_META: Record<GovUpdate['source'], { shortLabel: string; fullLabel: string; logo: string; logoWidth: number; site: string }> = {
  SEBI: {
    shortLabel: 'SEBI',
    fullLabel: 'Securities and Exchange Board of India',
    logo: '/logos/sebi-logo.png',
    logoWidth: 88,
    site: 'https://www.sebi.gov.in',
  },
  INCOME_TAX: {
    shortLabel: 'Income Tax',
    fullLabel: 'Income Tax Department, Government of India',
    logo: '/logos/income-tax-logo.png',
    logoWidth: 84,
    site: 'https://www.incometax.gov.in',
  },
  EPFO: {
    shortLabel: 'EPFO',
    fullLabel: 'Employees’ Provident Fund Organisation',
    logo: '/logos/epfo-logo.svg',
    logoWidth: 84,
    site: 'https://www.epfindia.gov.in',
  },
};

// EPFO has no working tracker yet - epfindia.gov.in's circulars page has no provider built
// against it (the site actively resets a direct fetch, unlike SEBI and Income Tax which both
// confirmed real static content), so there's no filter tab for it. Showing a tab that claims to
// check a source that nothing actually checks would be a real falsehood on a page whose entire
// point is "just what changed, and when we detected it." Add it back once a real EpfoCircularsProvider
// exists in fermor-backend (see gov-updates.service.ts).
const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'ALL', label: 'All' },
  { key: 'SEBI', label: 'SEBI' },
  { key: 'INCOME_TAX', label: 'Income Tax' },
];

const PAGE_SIZE = 12;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function AgencyLogo({ source }: { source: GovUpdate['source'] }) {
  const meta = SOURCE_META[source];
  return (
    <div style={{
      width: 56, height: 56, borderRadius: 10, border: `1px solid ${C.border}`, background: C.white,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: 6,
    }}>
      <img src={meta.logo} alt={meta.fullLabel} style={{ maxWidth: meta.logoWidth, maxHeight: 28, width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }} />
    </div>
  );
}

function UpdateCard({ update }: { update: GovUpdate }) {
  const meta = SOURCE_META[update.source];
  return (
    <a
      href={update.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <article className="ru-card" style={{
        display: 'flex', gap: 16, padding: '20px 22px', border: `1px solid ${C.border}`, borderRadius: 12,
        background: C.white, transition: 'border-color .15s, box-shadow .15s',
      }}>
        <AgencyLogo source={update.source} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: INTER, fontSize: 10.5, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase',
              color: C.dark, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 5, padding: '3px 8px',
            }}>
              {meta.shortLabel}
            </span>
            <span style={{ fontFamily: INTER, fontSize: 12.5, color: C.ink3 }}>
              Detected on {formatDate(update.detectedAt)}
            </span>
          </div>
          <h3 style={{
            fontFamily: POPPINS, fontSize: 15.5, fontWeight: 600, color: C.dark, lineHeight: 1.4, margin: '0 0 10px',
          }}>
            {update.title}
          </h3>
          <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: C.dark }}>
            View original &#8599;
          </span>
        </div>
      </article>
    </a>
  );
}

function EmptySourceNote({ source }: { source: GovUpdate['source'] }) {
  const meta = SOURCE_META[source];
  return (
    <div style={{
      display: 'flex', gap: 16, padding: '24px 22px', border: `1px solid ${C.border}`, borderRadius: 12, background: C.white,
    }}>
      <AgencyLogo source={source} />
      <div>
        <p style={{ fontFamily: POPPINS, fontSize: 15, fontWeight: 600, color: C.dark, margin: '0 0 6px' }}>
          No {meta.shortLabel} updates captured yet
        </p>
        <p style={{ fontFamily: INTER, fontSize: 13.5, color: C.ink2, lineHeight: 1.6, margin: 0, maxWidth: 480 }}>
          The tracker checks {meta.fullLabel}&apos;s official site daily. This list fills in automatically the moment a real circular or notice is detected, nothing is shown here until then.
        </p>
      </div>
    </div>
  );
}

function Pagination({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (p: number) => void }) {
  if (totalPages <= 1) return null;
  const pages: (number | 'ellipsis')[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) pages.push(i);
    else if (pages[pages.length - 1] !== 'ellipsis') pages.push('ellipsis');
  }
  return (
    <nav aria-label="Pagination" style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        style={{
          fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '8px 14px', borderRadius: 8,
          border: `1px solid ${C.border}`, background: C.white, color: page === 1 ? C.ink3 : C.dark,
          cursor: page === 1 ? 'default' : 'pointer',
        }}
      >
        Prev
      </button>
      {pages.map((p, i) => p === 'ellipsis' ? (
        <span key={`e${i}`} style={{ fontFamily: INTER, fontSize: 13, color: C.ink3, padding: '8px 4px' }}>&hellip;</span>
      ) : (
        <button
          key={p}
          onClick={() => onChange(p)}
          aria-current={p === page ? 'page' : undefined}
          style={{
            fontFamily: INTER, fontSize: 13, fontWeight: 700, minWidth: 36, padding: '8px 10px', borderRadius: 8,
            border: `1px solid ${p === page ? C.dark : C.border}`,
            background: p === page ? C.dark : C.white,
            color: p === page ? '#fff' : C.ink2,
            cursor: 'pointer',
          }}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        style={{
          fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '8px 14px', borderRadius: 8,
          border: `1px solid ${C.border}`, background: C.white, color: page === totalPages ? C.ink3 : C.dark,
          cursor: page === totalPages ? 'default' : 'pointer',
        }}
      >
        Next
      </button>
    </nav>
  );
}

export function RegulatoryUpdatesClient({ updates }: { updates: GovUpdate[] }) {
  const [filter, setFilter] = useState<FilterKey>('ALL');
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => filter === 'ALL' ? updates : updates.filter(u => u.source === filter),
    [updates, filter]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilter = (key: FilterKey) => {
    setFilter(key);
    setPage(1);
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => handleFilter(f.key)}
            style={{
              fontFamily: INTER, fontSize: 13.5, fontWeight: 600, padding: '9px 18px', borderRadius: 999,
              border: `1px solid ${f.key === filter ? C.dark : C.border}`,
              background: f.key === filter ? C.dark : C.white,
              color: f.key === filter ? '#fff' : C.ink2,
              cursor: 'pointer',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {pageItems.length === 0 ? (
        filter === 'ALL' ? (
          <p style={{ fontFamily: INTER, fontSize: 14, color: C.ink3 }}>No updates to show right now.</p>
        ) : (
          <EmptySourceNote source={filter as GovUpdate['source']} />
        )
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {pageItems.map(u => <UpdateCard key={u.id} update={u} />)}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      <style>{`
        .ru-card:hover { border-color: ${C.dark}; box-shadow: 0 2px 10px rgba(26,53,48,0.08); }
      `}</style>
    </div>
  );
}

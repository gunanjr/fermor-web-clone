'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'fermor-mf-bookmarks-v1';

function readBookmarks(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function BookmarkButton({ schemeCode }: { schemeCode: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(readBookmarks().includes(schemeCode));
  }, [schemeCode]);

  const toggle = () => {
    const current = readBookmarks();
    const next = current.includes(schemeCode) ? current.filter(c => c !== schemeCode) : [...current, schemeCode];
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
    setSaved(!saved);
  };

  return (
    <button
      onClick={toggle}
      aria-label={saved ? 'Remove from saved funds' : 'Save fund'}
      aria-pressed={saved}
      style={{
        width: 38, height: 38, borderRadius: 10, border: '1px solid #e3e6e8', background: '#fff',
        cursor: 'pointer', fontSize: 16, color: saved ? '#1f7a58' : '#80868c',
      }}
    >
      {saved ? '★' : '☆'}
    </button>
  );
}

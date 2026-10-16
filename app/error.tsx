'use client';

import * as React from 'react';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  React.useEffect(() => { console.error(error); }, [error]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: '#1A3530', padding: '24px', textAlign: 'center', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
      <div style={{ maxWidth: 480 }}>
        <div style={{ width: 64, height: 64, borderRadius: 18, background: 'rgba(200,241,53,0.15)', border: '1px solid rgba(200,241,53,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8F135" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: 'white', marginBottom: 12, fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
          Something went wrong
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 32, lineHeight: 1.6 }}>
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={reset} style={{ background: '#C8F135', color: '#1A3530', border: 'none', padding: '12px 28px', borderRadius: 10, fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
            Try Again
          </button>
          <button onClick={() => window.location.href = '/'} style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.12)', padding: '12px 28px', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}



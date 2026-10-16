'use client';

import * as React from 'react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  React.useEffect(() => { console.error(error); }, [error]);

  return (
    <html lang="en">
      <body style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: '#1A3530', padding: '24px', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ maxWidth: 480 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: 'white', marginBottom: 12 }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 32, lineHeight: 1.6 }}>
            {error.message || 'An unexpected error occurred.'}
          </p>
          <button onClick={reset} style={{ background: '#C8F135', color: '#1A3530', border: 'none', padding: '12px 28px', borderRadius: 10, fontSize: 14, fontWeight: 800, cursor: 'pointer' }}>
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}

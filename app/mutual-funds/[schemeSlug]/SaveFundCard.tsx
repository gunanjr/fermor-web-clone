'use client';

import { useState } from 'react';

const INTER = 'system-ui, -apple-system, sans-serif';

// The design this page is based on had a decorative "Invest now" button with no real destination
// (Fermor has no live investment/affiliate flow for mutual fund schemes yet). This posts to the
// same real /api/waitlist endpoint every other calculator's signup card uses, so the button
// actually does something rather than being a dead click.
export function SaveFundCard({ schemeCode }: { schemeCode: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  return (
    <div id="save-fund" style={{ background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 16, padding: 26, color: '#101214' }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(16,18,20,0.05)', border: '1px solid #E3E6E8', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="/fermor-mark-2026.svg" alt="Fermor" width={26} height={20} style={{ width: 26, height: 'auto' }} />
      </div>
      <h2 style={{ margin: '0 0 8px', font: `700 17px ${INTER}` }}>Track this fund</h2>
      <p style={{ margin: '0 0 18px', font: `13px/1.6 ${INTER}`, color: '#c4c9cd' }}>
        Sign up free to save this scheme and get notified when Fermor adds holdings, expense ratio, and portfolio analysis.
      </p>
      {status === 'done' ? (
        <p style={{ margin: 0, font: `600 13px ${INTER}`, color: '#4FE08A' }}>You&apos;re on the list. We&apos;ll email you.</p>
      ) : (
        <form
          onSubmit={async e => {
            e.preventDefault();
            if (!email) return;
            setStatus('loading');
            try {
              const res = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, source: `mf-scheme-${schemeCode}` }),
              });
              setStatus(res.ok ? 'done' : 'error');
            } catch {
              setStatus('error');
            }
          }}
        >
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            aria-label="Email address to track this fund"
            style={{
              width: '100%', boxSizing: 'border-box', padding: '11px 14px', marginBottom: 10, borderRadius: 8,
              border: '1px solid #3A3F44', background: '#1B1F23', color: '#101214', font: `14px ${INTER}`, outline: 'none',
            }}
          />
          <button type="submit" disabled={status === 'loading'} style={{
            width: '100%', background: '#fff', color: '#101214', border: 'none', borderRadius: 10,
            padding: 13, font: `600 14px ${INTER}`, cursor: 'pointer',
          }}>
            {status === 'loading' ? 'Saving...' : 'Sign up free'}
          </button>
          {status === 'error' && <p style={{ margin: '8px 0 0', font: `12px ${INTER}`, color: '#F0806B' }}>Something went wrong. Try again.</p>}
        </form>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserAuthModal } from './UserAuthModal';

const C = {
  dark:   '#101214',
  lime:   '#a6dbc4',
  lime2:  '#2d9970',
  ink:    '#16140F',
  ink2:   '#50565c',
  ink3:   '#7a8087',
  white:  '#ffffff',
  border: '#e3e6e8',
  bg:     '#f6f7f8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

export function SaveResultsCard({ mobile }: { mobile: boolean }) {
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);

  if (user) {
    return (
      <div style={{
        marginTop: 40, marginBottom: 40, padding: mobile ? 20 : 28,
        background: C.bg, border: `1px solid ${C.border}`, borderRadius: 16,
        display: 'flex', alignItems: 'center', gap: 16, fontFamily: INTER,
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%', background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, fontWeight: 700, flexShrink: 0,
        }}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: 600, fontSize: 15, color: C.ink }}>Signed in as {user.name}</p>
          <p style={{ margin: '2px 0 0', fontSize: 13, color: C.ink3 }}>{user.email}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{
        marginTop: 40, marginBottom: 40, padding: mobile ? 20 : 28,
        background: C.bg, border: `1px solid ${C.border}`, borderRadius: 16,
        fontFamily: INTER,
      }}>
        <p style={{ color: C.ink, fontWeight: 700, fontSize: 16, margin: '0 0 4px' }}>
          Get the best of Fermor, free
        </p>
        <p style={{ color: C.ink3, fontSize: 14, margin: '0 0 16px', lineHeight: 1.6 }}>
          Join to get financial tips, calculator updates, and insights in your inbox.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email) setShowModal(true);
          }}
          style={{ display: 'flex', gap: 10, flexDirection: mobile ? 'column' : 'row' }}
        >
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            aria-label="Email address"
            style={{
              flex: 1, padding: '11px 16px', fontSize: 14,
              border: `1px solid ${C.border}`, borderRadius: 8,
              outline: 'none', background: C.white, color: C.ink,
              fontFamily: INTER,
            }}
          />
          <button className="fx-btn"
            type="submit"
            style={{
              padding: '11px 22px', background: '#E9ECEE', color: '#101214',
              border: '1px solid #D3D7DA', borderRadius: 8, fontSize: 14, fontWeight: 700,
              cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: INTER,
            }}
          >
            Join free
          </button>
        </form>
      </div>

      {showModal && (
        <UserAuthModal
          initialEmail={email}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

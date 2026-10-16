'use client';

import { useEffect, useState } from 'react';

const INTER = 'system-ui, -apple-system, sans-serif';
const MF = { ink: '#101214', ink2: '#565c62', border: '#e3e6e8', green: '#2D9970' };

export function StickyNavBar({ schemeName, nav }: { schemeName: string; nav: number }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed', left: 0, right: 0, bottom: 0, background: '#fff', borderTop: `1px solid ${MF.border}`,
      boxShadow: '0 -4px 20px rgba(0,0,0,.08)', zIndex: 50, transition: 'transform 0.25s ease',
      transform: show ? 'translateY(0)' : 'translateY(100%)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <div style={{ font: `600 14px ${INTER}`, color: MF.ink }}>{schemeName}</div>
          <div style={{ font: `13px ${INTER}`, color: MF.ink2 }}>&#8377;{nav.toFixed(4)} NAV</div>
        </div>
        <a className="fx-btn" href="#save-fund" style={{
          background: '#E9ECEE', color: '#101214', border: '1px solid #D3D7DA', borderRadius: 10, padding: '11px 22px',
          font: `600 14px ${INTER}`, cursor: 'pointer', textDecoration: 'none',
        }}>
          Save this fund
        </a>
      </div>
    </div>
  );
}

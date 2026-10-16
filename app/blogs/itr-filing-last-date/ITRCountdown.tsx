'use client';
import { useState, useEffect } from 'react';

const DEADLINES = [
  { label: 'July 31: ITR-1 & ITR-2', sub: 'Salary, capital gains filers', date: new Date('2026-07-31T23:59:59+05:30') },
  { label: 'Aug 31: ITR-3 & ITR-4', sub: 'Business income (no audit)', date: new Date('2026-08-31T23:59:59+05:30') },
];

const BORDER = '#E5E5E5';
const BG = '#F7F7F7';
const DARK = '#101214';
const INK3 = '#888888';
const INTER = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

function getDiff(target: Date) {
  const now = new Date();
  const diff = Math.max(0, target.getTime() - now.getTime());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    passed: diff <= 0,
  };
}

export function ITRCountdown() {
  const [diffs, setDiffs] = useState(DEADLINES.map(d => getDiff(d.date)));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setDiffs(DEADLINES.map(d => getDiff(d.date))), 60000);
    return () => clearInterval(t);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
      {DEADLINES.map((d, i) => {
        const { days, hours, passed } = diffs[i];
        const urgent = !passed && days < 14;
        return (
          <div key={d.label} style={{ flex: '1 1 220px', border: `1px solid ${BORDER}`, borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ background: BG, padding: '9px 16px', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <span style={{ fontFamily: INTER, fontSize: 10.5, fontWeight: 700, color: INK3, letterSpacing: '.06em', textTransform: 'uppercase' as const }}>{d.label}</span>
              {urgent && (
                <span style={{ fontFamily: INTER, fontSize: 9.5, fontWeight: 700, color: DARK, letterSpacing: '.04em', textTransform: 'uppercase' as const }}>Closing soon</span>
              )}
            </div>
            <div style={{ padding: '14px 16px', background: '#fff' }}>
              {passed ? (
                <div style={{ fontFamily: INTER, fontSize: 13, color: INK3 }}>Deadline passed. File a belated return by Dec 31, 2026.</div>
              ) : (
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ textAlign: 'center' as const }}>
                    <div style={{ fontFamily: POPPINS, fontSize: 28, fontWeight: 700, color: DARK, lineHeight: 1 }}>{String(days).padStart(2, '0')}</div>
                    <div style={{ fontFamily: INTER, fontSize: 9, color: INK3, marginTop: 2, letterSpacing: '.04em' }}>DAYS</div>
                  </div>
                  <div style={{ fontFamily: POPPINS, fontSize: 20, color: INK3 }}>:</div>
                  <div style={{ textAlign: 'center' as const }}>
                    <div style={{ fontFamily: POPPINS, fontSize: 28, fontWeight: 700, color: DARK, lineHeight: 1 }}>{String(hours).padStart(2, '0')}</div>
                    <div style={{ fontFamily: INTER, fontSize: 9, color: INK3, marginTop: 2, letterSpacing: '.04em' }}>HRS</div>
                  </div>
                  <div style={{ fontFamily: INTER, fontSize: 12.5, color: '#555555', lineHeight: 1.4 }}>{d.sub}</div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

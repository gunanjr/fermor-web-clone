'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CreditCardData } from '../../data/creditCards';

const C = {
  dark:      '#1A3530',
  lime:      '#C8F135',
  lime2:     '#95CC42',
  paleLime:  '#EDFBBC',
  ink:       '#16140F',
  ink2:      '#5A5A52',
  ink3:      '#8A8F86',
  white:     '#ffffff',
  bg:        '#F4F8F5',
  border:    '#E2EBE0',
};

const INTER = 'var(--font-inter), Inter, sans-serif';

interface Props {
  selectedCards: CreditCardData[];
  onRemove: (slug: string) => void;
  onClear: () => void;
}

export function CreditCardCompare({ selectedCards, onRemove, onClear }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  if (selectedCards.length === 0) return null;

  return (
    <>
      {/* Sticky Bottom Bar */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: C.white, borderTop: `1px solid ${C.border}`, boxShadow: '0 -4px 20px rgba(0,0,0,0.05)', zIndex: 100, fontFamily: INTER }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>
              Comparing {selectedCards.length} {selectedCards.length === 1 ? 'card' : 'cards'}
              <span style={{ fontWeight: 400, color: C.ink3, marginLeft: 8 }}>(max 3)</span>
            </div>
            
            <div style={{ display: 'flex', gap: 12 }}>
              {selectedCards.map(c => (
                <div key={c.slug} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F8FAFB', padding: '6px 12px', borderRadius: 999, border: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.ink, whiteSpace: 'nowrap', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</span>
                  <button onClick={() => onRemove(c.slug)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.ink3, padding: 0, display: 'flex' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button onClick={onClear} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: C.ink3 }}>Clear All</button>
            <button 
              onClick={() => setModalOpen(true)}
              disabled={selectedCards.length < 2}
              style={{ background: selectedCards.length > 1 ? C.dark : '#E0E5E2', color: selectedCards.length > 1 ? C.white : '#9EA6A1', padding: '10px 24px', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: selectedCards.length > 1 ? 'pointer' : 'not-allowed', border: 'none', transition: 'background 0.2s' }}
            >
              Compare Cards
            </button>
          </div>

        </div>
      </div>

      {/* Comparison Modal */}
      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(22,20,15,0.6)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 20px', fontFamily: INTER }}>
          <div style={{ background: C.white, width: '100%', maxWidth: 1000, maxHeight: '100%', borderRadius: 16, display: 'flex', flexDirection: 'column', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            
            {/* Modal Header */}
            <div style={{ padding: '24px 32px', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: C.ink }}>Card Comparison</h2>
              <button onClick={() => setModalOpen(false)} style={{ background: '#F8FAFB', border: `1px solid ${C.border}`, borderRadius: '50%', width: 36, height: 36, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', color: C.ink2 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            {/* Modal Body / Table */}
            <div style={{ padding: 32, overflowY: 'auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: `140px repeat(${selectedCards.length}, 1fr)`, gap: 16 }}>
                
                {/* Headers */}
                <div />
                {selectedCards.map(c => (
                  <div key={c.slug} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12 }}>
                    <div style={{ width: 140, height: 88, position: 'relative' }}>
                      <Image 
                        src={`/images/credit-cards/${c.slug}.png`} 
                        alt={c.name} 
                        fill
                        style={{ objectFit: 'contain' }}
                        unoptimized
                      />
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: C.ink }}>{c.name}</div>
                    <div style={{ fontSize: 13, color: C.ink2 }}>{c.bank}</div>
                    <a href={c.affiliateUrl ?? c.applyUrl} target="_blank" rel="noopener noreferrer" style={{ background: C.dark, color: C.white, padding: '8px 24px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 13, marginTop: 8 }}>
                      Apply Now
                    </a>
                  </div>
                ))}

                {/* Rows */}
                {/* Annual Fee */}
                <div style={{ padding: '24px 0 16px', fontSize: 13, fontWeight: 700, color: C.ink3, borderBottom: `1px solid ${C.border}` }}>Annual Fee</div>
                {selectedCards.map(c => (
                  <div key={c.slug} style={{ padding: '24px 16px 16px', fontSize: 14, fontWeight: 600, color: C.ink, borderBottom: `1px solid ${C.border}`, textAlign: 'center' }}>
                    {c.annualFee}
                  </div>
                ))}

                {/* Rewards Rate */}
                <div style={{ padding: '24px 0 16px', fontSize: 13, fontWeight: 700, color: C.ink3, borderBottom: `1px solid ${C.border}` }}>Rewards Rate</div>
                {selectedCards.map(c => (
                  <div key={c.slug} style={{ padding: '24px 16px 16px', fontSize: 14, fontWeight: 600, color: C.ink, borderBottom: `1px solid ${C.border}`, textAlign: 'center' }}>
                    {c.rewardsRate}
                  </div>
                ))}

                {/* Welcome Bonus */}
                <div style={{ padding: '24px 0 16px', fontSize: 13, fontWeight: 700, color: C.ink3, borderBottom: `1px solid ${C.border}` }}>Welcome Bonus</div>
                {selectedCards.map(c => (
                  <div key={c.slug} style={{ padding: '24px 16px 16px', fontSize: 14, fontWeight: 600, color: C.ink, borderBottom: `1px solid ${C.border}`, textAlign: 'center' }}>
                    {c.welcomeBonus}
                  </div>
                ))}

                {/* Lounge Access */}
                <div style={{ padding: '24px 0 16px', fontSize: 13, fontWeight: 700, color: C.ink3, borderBottom: `1px solid ${C.border}` }}>Lounge Access</div>
                {selectedCards.map(c => (
                  <div key={c.slug} style={{ padding: '24px 16px 16px', fontSize: 14, fontWeight: 600, color: C.ink, borderBottom: `1px solid ${C.border}`, textAlign: 'center' }}>
                    {c.loungeAccess}
                  </div>
                ))}

                {/* Foreign Transaction Fee */}
                <div style={{ padding: '24px 0 16px', fontSize: 13, fontWeight: 700, color: C.ink3, borderBottom: `1px solid ${C.border}` }}>Forex Fee</div>
                {selectedCards.map(c => (
                  <div key={c.slug} style={{ padding: '24px 16px 16px', fontSize: 14, fontWeight: 600, color: C.ink, borderBottom: `1px solid ${C.border}`, textAlign: 'center' }}>
                    {c.cardDetails.find(d => d.label === 'Foreign Transaction Fee')?.value}
                  </div>
                ))}

                {/* Network */}
                <div style={{ padding: '24px 0 16px', fontSize: 13, fontWeight: 700, color: C.ink3, borderBottom: `1px solid ${C.border}` }}>Network</div>
                {selectedCards.map(c => (
                  <div key={c.slug} style={{ padding: '24px 16px 16px', fontSize: 14, fontWeight: 600, color: C.ink, borderBottom: `1px solid ${C.border}`, textAlign: 'center' }}>
                    {c.cardDetails.find(d => d.label === 'Card Network')?.value}
                  </div>
                ))}

                {/* Best For */}
                <div style={{ padding: '24px 0 16px', fontSize: 13, fontWeight: 700, color: C.ink3 }}>Best For</div>
                {selectedCards.map(c => (
                  <div key={c.slug} style={{ padding: '24px 16px 16px', fontSize: 13, fontWeight: 500, color: C.ink2, textAlign: 'center', lineHeight: 1.5 }}>
                    {c.fermorsTake.split('.')[0]}.
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

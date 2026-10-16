'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CreditCardData } from '../../data/creditCards';

const C = {
  dark:      '#1A3530',
  lime:      '#C8F135',
  ink:       '#16140F',
  ink2:      '#5A5A52',
  ink3:      '#8A8F86',
  white:     '#ffffff',
  bg:        '#F4F8F5',
  border:    '#E2EBE0',
  applyBg:   '#1A7340',
  badgeBg:   '#E5FCF4',
  badgeText: '#008236',
};

const INTER = 'var(--font-inter), Inter, sans-serif';

interface Props {
  card: CreditCardData;
  isCompared: boolean;
  onCompareToggle: (slug: string) => void;
}

export function CreditCardTile({ card, isCompared, onCompareToggle }: Props) {
  const [imageFailed, setImageFailed] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (sec: string) => setOpenSection(p => p === sec ? null : sec);
  
  const applyLink = card.affiliateUrl ?? card.applyUrl;

  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, marginBottom: 24, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', fontFamily: INTER }}>
      
      {/* Top Badge */}
      {card.badge && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: C.badgeBg, color: C.badgeText, padding: '6px 14px', borderRadius: 8, margin: '20px 20px 0', fontSize: 13, fontWeight: 600 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          {card.badge}
        </div>
      )}

      <div style={{ padding: card.badge ? '16px 24px 20px' : '24px 24px 20px' }}>
        <div className="card-tile-grid">
          
          {/* Column 1: Card Image */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {!imageFailed ? (
              <a href={applyLink} target="_blank" rel="noopener noreferrer" style={{ position: 'relative', width: 220, height: 160, display: 'block' }}>
                <Image 
                  src={`/images/credit-cards/${card.slug}${card.imageExt || '.png'}`} 
                  alt={card.name} 
                  fill
                  style={{ objectFit: 'contain' }}
                  onError={() => setImageFailed(true)}
                  unoptimized
                />
              </a>
            ) : (
              // Fallback UI
              <a href={applyLink} target="_blank" rel="noopener noreferrer" style={{ width: 220, height: 160, background: '#F1F3F5', borderRadius: 12, border: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 16, textAlign: 'center', textDecoration: 'none' }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: '#343A40', marginBottom: 4 }}>{card.bank}</span>
                <span style={{ fontSize: 12, color: '#868E96', fontWeight: 600 }}>{card.cardDetails.find(d => d.label === 'Card Network')?.value || 'Credit Card'}</span>
              </a>
            )}
          </div>

          {/* Column 2: Card Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a href={applyLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <h2 style={{ fontSize: 24, fontWeight: 600, color: C.ink, margin: 0, letterSpacing: '-0.01em' }}>{card.name}</h2>
            </a>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < Math.floor(card.rating) ? '#FFC107' : 'none'} stroke={i < Math.floor(card.rating) ? '#FFC107' : '#E2EBE0'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
                <span style={{ fontSize: 15, fontWeight: 600, color: C.ink, marginLeft: 4 }}>{card.rating.toFixed(1)}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }} title="Based on Fermor's independent analysis of rewards and fees">
                <span style={{ fontSize: 14, color: '#0066CC', textDecoration: 'underline' }}>Fermor rating</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#D1D5DB" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" stroke="#ffffff" /><line x1="12" y1="8" x2="12.01" y2="8" stroke="#ffffff" />
                </svg>
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginTop: 4 }}>
              <input 
                type="checkbox" 
                checked={isCompared}
                onChange={() => onCompareToggle(card.slug)}
                style={{ width: 18, height: 18, cursor: 'pointer', accentColor: C.applyBg }} 
              />
              <span style={{ fontSize: 15, fontWeight: 500, color: '#374151' }}>Add to compare</span>
            </label>
          </div>

          {/* Column 3: Apply Action */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <a href={applyLink} target="_blank" rel="noopener noreferrer" style={{ background: C.applyBg, color: C.white, padding: '12px 24px', borderRadius: 6, textDecoration: 'none', fontWeight: 600, fontSize: 15, display: 'flex', alignItems: 'center', gap: 8, width: '100%', justifyContent: 'center', transition: 'background 0.2s', letterSpacing: '0.02em' }} onMouseOver={e => e.currentTarget.style.background = '#145c33'} onMouseOut={e => e.currentTarget.style.background = C.applyBg}>
              APPLY NOW
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
            <span style={{ fontSize: 13, color: '#6B7280' }}>on {card.bank}&apos;s website</span>
            <a href={applyLink} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: '#0066CC', textDecoration: 'underline', marginTop: 0 }}>Rates & Fees</a>
          </div>

        </div>

        {/* 4-Col Stats Grid */}
        <div style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, margin: '20px 0 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }} className="stats-grid">
            <div style={{ padding: '16px 0' }}>
              <div style={{ fontSize: 13, color: '#6B7280', fontWeight: 500, marginBottom: 8 }}>Annual fee</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.ink }}>{card.annualFee.split(' ')[0]}</div>
            </div>
            <div className="stat-border-left" style={{ padding: '16px 0 16px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#6B7280', fontWeight: 500, marginBottom: 8 }}>
                Rewards rate
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#D1D5DB" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" stroke="#ffffff" /><line x1="12" y1="8" x2="12.01" y2="8" stroke="#ffffff" /></svg>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.ink }}>{card.rewardsRate}</div>
            </div>
            <div className="stat-border-left" style={{ padding: '16px 0 16px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#6B7280', fontWeight: 500, marginBottom: 8 }}>
                Welcome offer
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#D1D5DB" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" stroke="#ffffff" /><line x1="12" y1="8" x2="12.01" y2="8" stroke="#ffffff" /></svg>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>{card.welcomeBonus}</div>
            </div>
            <div className="stat-border-left" style={{ padding: '16px 0 16px 20px' }}>
              <div style={{ fontSize: 13, color: '#6B7280', fontWeight: 500, marginBottom: 8 }}>Recommended credit score</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.ink, marginBottom: 4 }}>{card.creditScore}</div>
              <a href="#" style={{ fontSize: 12, color: '#0066CC', textDecoration: 'underline' }}>Get your free credit score</a>
            </div>
          </div>
        </div>

        {/* 3-Col APR Grid */}
        <div style={{ borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }} className="stats-grid">
            <div style={{ padding: '16px 0' }}>
              <div style={{ fontSize: 13, color: '#6B7280', fontWeight: 500, marginBottom: 8 }}>Purchase intro APR</div>
              <div style={{ fontSize: 14, color: C.ink, lineHeight: 1.4 }}>{card.purchaseIntroApr || '0% intro APR on purchases for 15 months'}</div>
            </div>
            <div className="stat-border-left" style={{ padding: '16px 0 16px 20px' }}>
              <div style={{ fontSize: 13, color: '#6B7280', fontWeight: 500, marginBottom: 8 }}>Balance transfer intro APR</div>
              <div style={{ fontSize: 14, color: C.ink, lineHeight: 1.4 }}>{card.balanceTransferApr || '0% intro APR on balance transfers for 15 months'}</div>
            </div>
            <div className="stat-border-left" style={{ padding: '16px 0 16px 20px' }}>
              <div style={{ fontSize: 13, color: '#6B7280', fontWeight: 500, marginBottom: 8 }}>Regular APR</div>
              <div style={{ fontSize: 14, color: C.ink, lineHeight: 1.4 }}>{card.regularApr || '18.24%-27.74% Variable APR'}</div>
            </div>
          </div>
        </div>

      </div>

      {/* Accordions */}
      <div style={{ padding: '0 24px 16px' }}>
        {/* Rewards Breakdown */}
        <div>
          <button onClick={() => toggleSection('rewards')} style={{ width: '100%', padding: '16px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', borderBottom: openSection === 'rewards' ? 'none' : `1px solid ${C.border}`, cursor: 'pointer', fontFamily: INTER }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 700, color: '#374151' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
              Rewards breakdown
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: openSection === 'rewards' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {openSection === 'rewards' && (
            <div style={{ padding: '16px 4px', background: C.white, borderBottom: `1px solid ${C.border}` }}>
              <ul style={{ margin: 0, paddingLeft: 20, color: '#4B5563', fontSize: 14, lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {card.rewardsBreakdown.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* Card Details */}
        <div>
          <button onClick={() => toggleSection('details')} style={{ width: '100%', padding: '16px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', borderBottom: openSection === 'details' ? 'none' : `1px solid ${C.border}`, cursor: 'pointer', fontFamily: INTER }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 700, color: '#374151' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
              Card details
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: openSection === 'details' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {openSection === 'details' && (
            <div style={{ padding: '16px 4px', background: C.white, borderBottom: `1px solid ${C.border}` }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px 24px' }}>
                {card.cardDetails.map((d, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 600, marginBottom: 2 }}>{d.label}</div>
                    <div style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>{d.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Fermor's Take */}
        <div>
          <button onClick={() => toggleSection('take')} style={{ width: '100%', padding: '16px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', borderBottom: openSection === 'take' ? 'none' : `1px solid ${C.border}`, cursor: 'pointer', fontFamily: INTER }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 700, color: '#374151' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h10M4 18h6"/></svg>
              Fermor&apos;s take
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: openSection === 'take' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {openSection === 'take' && (
            <div style={{ padding: '16px 4px', background: C.white, borderBottom: `1px solid ${C.border}` }}>
              <p style={{ margin: 0, fontSize: 14, color: '#4B5563', lineHeight: 1.6 }}>{card.fermorsTake}</p>
            </div>
          )}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .card-tile-grid {
          display: grid;
          grid-template-columns: 200px 1fr 180px;
          gap: 24px;
          align-items: start;
        }
        .stat-border-left {
          border-left: 1px solid ${C.border};
        }
        @media (max-width: 768px) {
          .card-tile-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .card-tile-grid > div:nth-child(2) {
            text-align: center;
            align-items: center;
          }
          .card-tile-grid > div:nth-child(2) > div {
            justify-content: center;
          }
          .card-tile-grid > div:nth-child(2) > label {
            justify-content: center;
          }
          .stat-border-left {
            border-left: none;
            border-top: 1px solid ${C.border};
            padding-left: 0;
            padding-top: 16px;
          }
        }
      `}} />
    </div>
  );
}

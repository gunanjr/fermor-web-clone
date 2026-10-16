'use client';

import React from 'react';
import { CardCategory } from '../../data/creditCards';

const C = {
  dark:      '#1A3530',
  lime:      '#C8F135',
  applyBg:   '#1A7340',
  ink:       '#16140F',
  ink2:      '#5A5A52',
  ink3:      '#8A8F86',
  white:     '#ffffff',
  bg:        '#F4F8F5',
  border:    '#E2EBE0',
};

const INTER = 'var(--font-inter), Inter, sans-serif';

const CATEGORIES: { cat: CardCategory; icon: React.ReactNode }[] = [
  { cat: 'All Cards', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
  { cat: 'Best Cashback', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
  { cat: 'Best Travel', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="5" width="10" height="14" rx="2" ry="2"/><path d="M10 5V3a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="16" y2="14"/></svg> },
  { cat: 'Best Rewards', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="14" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="22"/><path d="M12 8l4-4a3.5 3.5 0 1 0-7-0 3.5 3.5 0 1 0 7 0 3.5 3.5 0 1 0-7 0 3.5 3.5 0 1 0 7 0Z"/></svg> },
  { cat: 'Lifetime Free', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg> },
  { cat: 'Best for Beginners', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg> },
  { cat: 'Premium Cards', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
  { cat: 'Fuel Cards', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="12" height="20" rx="2" ry="2"/><line x1="4" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="12" y2="10"/><path d="M16 14h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2"/></svg> },
  { cat: 'Shopping Cards', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> },
  { cat: 'Dining Cards', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7 3 9 3 9h6s3-2 3-9"/><line x1="12" y1="2" x2="12" y2="22"/><line x1="8" y1="17" x2="16" y2="17"/></svg> },
];

interface Props {
  activeCategory: CardCategory;
  onSelect: (cat: CardCategory) => void;
}

export function CreditCardFilters({ activeCategory, onSelect }: Props) {
  return (
    <div style={{ background: C.white, borderBottom: `1px solid ${C.border}` }}>
      <div 
        style={{ 
          maxWidth: 1000,
          margin: '0 auto',
          display: 'flex', 
          gap: 32, 
          overflowX: 'auto', 
          fontFamily: INTER,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          padding: '0 28px',
        }}
        className="cc-filters-scroll"
      >
        <style dangerouslySetInnerHTML={{__html: `
          .cc-filters-scroll::-webkit-scrollbar {
            display: none;
          }
        `}} />
        
        {CATEGORIES.map(({ cat, icon }) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                padding: '20px 0',
                background: 'none',
                border: 'none',
                borderBottom: `3px solid ${isActive ? C.applyBg : 'transparent'}`,
                color: isActive ? C.applyBg : C.ink2,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
              onMouseOver={e => {
                if (!isActive) {
                  e.currentTarget.style.color = C.applyBg;
                }
              }}
              onMouseOut={e => {
                if (!isActive) {
                  e.currentTarget.style.color = C.ink2;
                }
              }}
            >
              <div style={{ 
                width: 48, 
                height: 48, 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: isActive ? C.applyBg : '#F4F8F5',
                color: isActive ? C.white : C.applyBg,
                transition: 'all 0.2s',
              }}>
                {icon}
              </div>
              <span style={{ fontSize: 13, fontWeight: 700 }}>{cat}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

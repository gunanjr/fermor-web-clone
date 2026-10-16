'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useCurrency } from '../../hooks/useCurrency';
import { CurrencyInfo } from '../../types/currency';

export function CurrencySelector({ theme = 'dark' }: { theme?: 'dark' | 'light' }) {
  const { selectedCurrency, supportedCurrencies, setSelectedCurrency, loading, error, rates } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = supportedCurrencies.filter(
    c => c.code.toLowerCase().includes(search.toLowerCase()) || 
         c.name.toLowerCase().includes(search.toLowerCase())
  );

  const isDark = theme === 'dark';

  let exchangeRateText = null;
  if (rates && selectedCurrency.code !== rates.baseCurrency && rates.rates[selectedCurrency.code]) {
    const rateToInr = 1 / rates.rates[selectedCurrency.code];
    exchangeRateText = `* 1 ${selectedCurrency.code} = ${rateToInr.toFixed(2)} ${rates.baseCurrency}`;
  }

  return (
    <div className="currency-selector" ref={dropdownRef} style={{ position: 'relative' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: isDark ? 'rgba(255,255,255,0.08)' : '#f6f7f8',
          border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid #e3e6e8',
          borderRadius: '8px',
          padding: '6px 12px',
          color: isDark ? 'white' : '#101214',
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'var(--font-inter), Inter, sans-serif'
        }}
      >
        {selectedCurrency.symbol !== selectedCurrency.code && (
          <span style={{ color: isDark ? '#a6dbc4' : '#101214', fontWeight: 800 }}>{selectedCurrency.symbol}</span>
        )}
        <span>{selectedCurrency.code}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '8px',
          width: '200px',
          background: isDark ? '#101214' : 'white',
          border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid #e3e6e8',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          overflow: 'hidden',
          zIndex: 1000
        }}>
          {error && (
            <div style={{ padding: '8px 12px', fontSize: '11px', color: '#A15C00', background: '#FFF4E5', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              Using last available rates
            </div>
          )}
          <div style={{ padding: '8px' }}>
            <input 
              type="text" 
              placeholder="Search..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              autoFocus
              style={{
                width: '100%',
                background: isDark ? 'rgba(0,0,0,0.2)' : '#f6f7f8',
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e3e6e8',
                borderRadius: '6px',
                padding: '6px 10px',
                color: isDark ? 'white' : '#101214',
                fontSize: '13px',
                outline: 'none',
                fontFamily: 'var(--font-inter), Inter, sans-serif'
              }}
            />
          </div>
          <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
            {loading && supportedCurrencies.length === 0 ? (
              <div style={{ padding: '12px', color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(16,18,20,0.5)', fontSize: '13px', textAlign: 'center' }}>Loading...</div>
            ) : filtered.length > 0 ? (
              filtered.map(c => (
                <button
                  key={c.code}
                  onClick={() => {
                    setSelectedCurrency(c);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '14px',
                    padding: '12px 14px',
                    background: selectedCurrency.code === c.code
                      ? (isDark ? 'rgba(166,219,196,0.1)' : 'rgba(166,219,196,0.2)')
                      : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                    {c.symbol !== c.code && (
                      <span style={{
                        color: selectedCurrency.code === c.code
                          ? (isDark ? '#a6dbc4' : '#101214')
                          : (isDark ? 'rgba(255,255,255,0.6)' : 'rgba(16,18,20,0.6)'),
                        minWidth: '20px', fontWeight: 600, fontSize: '14px'
                      }}>
                        {c.symbol}
                      </span>
                    )}
                    <span style={{
                      color: selectedCurrency.code === c.code 
                        ? (isDark ? 'white' : '#101214') 
                        : (isDark ? 'rgba(255,255,255,0.8)' : 'rgba(16,18,20,0.8)'), 
                      fontSize: '13px', fontWeight: 500, fontFamily: 'var(--font-inter), Inter, sans-serif' 
                    }}>
                      {c.code}
                    </span>
                  </div>
                  <span style={{
                    color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(16,18,20,0.4)',
                    fontSize: '11px', fontFamily: 'var(--font-inter), Inter, sans-serif',
                    textAlign: 'right', lineHeight: 1.4
                  }}>
                    {c.name}
                  </span>
                </button>
              ))
            ) : (
              <div style={{ padding: '12px', color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(16,18,20,0.5)', fontSize: '13px', textAlign: 'center' }}>No results</div>
            )}
          </div>
        </div>
      )}

      {exchangeRateText && !isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          marginTop: '4px',
          fontSize: '10px',
          color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(16,18,20,0.5)',
          whiteSpace: 'nowrap',
          fontFamily: 'var(--font-inter), Inter, sans-serif'
        }}>
          {exchangeRateText}
        </div>
      )}
    </div>
  );
}


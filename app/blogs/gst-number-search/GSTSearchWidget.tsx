'use client';

import { useState } from 'react';
import { decodeGSTIN, GstinDecodeResult } from '../../../src/utils/gstin';

const INTER = 'var(--font-inter), Inter, sans-serif';
const C = {
  dark: '#111111',
  dg: '#101214',
  ink: '#333333',
  ink2: '#555555',
  ink3: '#888888',
  border: '#E5E5E5',
  bg: '#F7F7F7',
  green: '#166534',
  paleDg: '#f1f3f4',
};

interface LiveGstinResult {
  gstin: string;
  legalName: string;
  tradeName: string;
  status: string;
  registrationDate: string;
  constitutionOfBusiness: string;
  taxpayerType: string;
  natureOfBusiness: string[];
  stateJurisdiction: string;
  centreJurisdiction: string;
  cancellationDate: string | null;
  lastUpdated: string | null;
  eInvoiceEnabled: boolean;
  address: string | null;
}

type SearchState =
  | { phase: 'idle' }
  | { phase: 'loading' }
  | { phase: 'success'; result: LiveGstinResult }
  | { phase: 'not-found' }
  | { phase: 'unavailable' };

function StatusBadge({ status }: { status: string }) {
  const isActive = status.toLowerCase() === 'active';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: INTER, fontSize: 12, fontWeight: 700,
      padding: '3px 10px', borderRadius: 999,
      background: isActive ? '#F0FDF4' : '#FEF2F2',
      color: isActive ? '#15803D' : '#B91C1C',
      border: `1px solid ${isActive ? '#BBF7D0' : '#FECACA'}`,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: isActive ? '#22C55E' : '#EF4444' }} />
      {status}
    </span>
  );
}

export function GSTSearchWidget() {
  const [gstin, setGstin] = useState('');
  const [decoded, setDecoded] = useState<GstinDecodeResult | null>(null);
  const [search, setSearch] = useState<SearchState>({ phase: 'idle' });

  function handleInput(val: string) {
    const cleaned = val.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 15);
    setGstin(cleaned);
    setSearch({ phase: 'idle' });
    setDecoded(cleaned.length >= 2 ? decodeGSTIN(cleaned) : null);
  }

  async function runSearch() {
    if (!decoded?.valid) return;
    setSearch({ phase: 'loading' });
    try {
      const res = await fetch(`/api/gst/verify/${gstin}`);
      if (res.status === 404) { setSearch({ phase: 'not-found' }); return; }
      if (!res.ok) { setSearch({ phase: 'unavailable' }); return; }
      const body = await res.json();
      setSearch({ phase: 'success', result: body.data });
    } catch {
      setSearch({ phase: 'unavailable' });
    }
  }

  const hasErrors = decoded && decoded.errors.length > 0;
  const isComplete = gstin.length === 15;
  const canSearch = isComplete && decoded?.valid && search.phase !== 'loading';

  return (
    <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '24px', marginBottom: 28 }}>
      <p style={{ fontFamily: INTER, fontSize: 13, fontWeight: 700, color: C.dg, letterSpacing: '.05em', textTransform: 'uppercase', marginBottom: 12, marginTop: 0 }}>
        GST Number Search
      </p>
      <p style={{ fontFamily: INTER, fontSize: 13.5, color: C.ink2, marginBottom: 16, marginTop: 0, lineHeight: 1.5 }}>
        Enter a 15-digit GSTIN. Format and check-digit validation runs instantly; click Search for live registration details from the government GSTIN database.
      </p>

      {/* Input */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16 }}>
        <input
          type="text"
          value={gstin}
          onChange={e => handleInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && canSearch && runSearch()}
          placeholder="e.g. 27AAPFU0939F1ZV"
          maxLength={15}
          spellCheck={false}
          style={{
            flex: 1, minWidth: 200,
            fontFamily: 'monospace, monospace',
            fontSize: 16, letterSpacing: '0.12em',
            padding: '11px 14px',
            border: `1.5px solid ${isComplete && hasErrors ? '#D97706' : isComplete && decoded?.valid ? '#22C55E' : C.border}`,
            borderRadius: 8, outline: 'none',
            background: '#fff', color: C.dark,
            textTransform: 'uppercase',
          }}
          aria-label="Enter GSTIN to search"
        />
        <button
          onClick={runSearch}
          disabled={!canSearch}
          style={{
            fontFamily: INTER, fontSize: 13, fontWeight: 700,
            background: canSearch ? C.dg : '#B8C4C0',
            color: '#fff',
            padding: '11px 20px', borderRadius: 8,
            border: 'none', cursor: canSearch ? 'pointer' : 'not-allowed',
            whiteSpace: 'nowrap', flexShrink: 0,
          }}
        >
          {search.phase === 'loading' ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Character count */}
      <p style={{ fontFamily: INTER, fontSize: 12, color: C.ink3, margin: '0 0 14px', textAlign: 'right' }}>
        {gstin.length}/15 characters
      </p>

      {/* Format preview */}
      {gstin.length > 0 && (
        <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: 16, fontFamily: 'monospace, monospace' }}>
          {[
            { label: 'State', chars: gstin.slice(0, 2), color: '#1D4ED8', bg: '#EFF6FF' },
            { label: 'PAN', chars: gstin.slice(2, 12), color: '#7C3AED', bg: '#F5F3FF' },
            { label: 'Entity', chars: gstin.slice(12, 13), color: '#15803D', bg: '#F0FDF4' },
            { label: 'Z', chars: gstin.slice(13, 14), color: '#B45309', bg: '#FFFBEB' },
            { label: 'Check', chars: gstin.slice(14, 15), color: '#9F1239', bg: '#FFF1F2' },
          ].map((seg, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <div style={{ background: seg.bg, border: `1.5px solid ${seg.color}30`, borderRadius: 6, padding: '6px 10px', color: seg.color, fontWeight: 700, fontSize: 14, letterSpacing: '0.12em', minHeight: 34, display: 'flex', alignItems: 'center' }}>
                {seg.chars || Array(i === 1 ? 10 : 1).fill('·').join('')}
              </div>
              <span style={{ fontSize: 10, color: seg.color, fontFamily: INTER, fontWeight: 600 }}>{seg.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Validation errors */}
      {isComplete && hasErrors && (
        <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 8, padding: '12px 14px', marginBottom: 12 }}>
          <p style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#92400E', margin: '0 0 6px' }}>Format issues found:</p>
          <ul style={{ margin: 0, padding: '0 0 0 16px' }}>
            {decoded!.errors.map((e, i) => (
              <li key={i} style={{ fontFamily: INTER, fontSize: 12.5, color: '#92400E', lineHeight: 1.5 }}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Live search result */}
      {search.phase === 'success' && (
        <div style={{ background: C.paleDg, border: '1px solid #c9ced2', borderRadius: 10, padding: '18px 20px', marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
            <p style={{ fontFamily: INTER, fontSize: 12, fontWeight: 700, color: C.dg, letterSpacing: '.06em', textTransform: 'uppercase', margin: 0 }}>
              Live Registration Details
            </p>
            <StatusBadge status={search.result.status} />
          </div>
          <p style={{ fontFamily: INTER, fontSize: 17, fontWeight: 700, color: C.dark, margin: '0 0 2px' }}>{search.result.legalName}</p>
          {search.result.tradeName && search.result.tradeName !== search.result.legalName && (
            <p style={{ fontFamily: INTER, fontSize: 13.5, color: C.ink2, margin: '0 0 14px' }}>Trade name: {search.result.tradeName}</p>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px 20px', marginTop: 14 }}>
            {[
              ['Registration Date', search.result.registrationDate || '—'],
              ['Constitution', search.result.constitutionOfBusiness || '—'],
              ['Taxpayer Type', search.result.taxpayerType || '—'],
              ['e-Invoice Enabled', search.result.eInvoiceEnabled ? 'Yes' : 'No'],
            ].map(([label, value], i) => (
              <div key={i}>
                <p style={{ fontFamily: INTER, fontSize: 11.5, color: C.ink3, margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '.04em' }}>{label}</p>
                <p style={{ fontFamily: INTER, fontSize: 13.5, fontWeight: 600, color: C.dark, margin: 0 }}>{value}</p>
              </div>
            ))}
          </div>
          {search.result.address && (
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #D1E8E0' }}>
              <p style={{ fontFamily: INTER, fontSize: 11.5, color: C.ink3, margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '.04em' }}>Principal Place of Business</p>
              <p style={{ fontFamily: INTER, fontSize: 13.5, color: C.ink, margin: 0, lineHeight: 1.5 }}>{search.result.address}</p>
            </div>
          )}
          {search.result.natureOfBusiness?.length > 0 && (
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #D1E8E0' }}>
              <p style={{ fontFamily: INTER, fontSize: 11.5, color: C.ink3, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '.04em' }}>Nature of Business</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {search.result.natureOfBusiness.map((n, i) => (
                  <span key={i} style={{ fontFamily: INTER, fontSize: 12, color: C.dg, background: '#fff', border: '1px solid #c9ced2', borderRadius: 6, padding: '4px 9px' }}>{n}</span>
                ))}
              </div>
            </div>
          )}
          {search.result.status.toLowerCase() !== 'active' && (
            <p style={{ fontFamily: INTER, fontSize: 12.5, color: '#B91C1C', margin: '14px 0 0', lineHeight: 1.5 }}>
              This GSTIN is not currently active. Invoices from a cancelled or suspended GSTIN cannot be used to claim Input Tax Credit.
            </p>
          )}
        </div>
      )}

      {search.phase === 'not-found' && (
        <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 8, padding: '14px 16px', marginBottom: 12 }}>
          <p style={{ fontFamily: INTER, fontSize: 13.5, fontWeight: 600, color: '#92400E', margin: '0 0 4px' }}>GSTIN not found</p>
          <p style={{ fontFamily: INTER, fontSize: 12.5, color: '#92400E', lineHeight: 1.5, margin: 0 }}>
            The format is valid, but this GSTIN was not found in government records. Double-check the number, or verify directly on the{' '}
            <a href="https://services.gst.gov.in/services/searchtp" target="_blank" rel="noopener noreferrer" style={{ color: '#92400E', textDecoration: 'underline' }}>GST portal</a>.
          </p>
        </div>
      )}

      {search.phase === 'unavailable' && (
        <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 16px', marginBottom: 12 }}>
          <p style={{ fontFamily: INTER, fontSize: 13.5, fontWeight: 600, color: C.ink, margin: '0 0 4px' }}>Live lookup temporarily unavailable</p>
          <p style={{ fontFamily: INTER, fontSize: 12.5, color: C.ink2, lineHeight: 1.5, margin: 0 }}>
            The format decode below is still accurate. For live registration status, check directly on the{' '}
            <a href="https://services.gst.gov.in/services/searchtp" target="_blank" rel="noopener noreferrer" style={{ color: C.ink, textDecoration: 'underline' }}>GST portal</a>.
          </p>
        </div>
      )}

      {/* Decoded format result (always shown once valid, regardless of live search state) */}
      {decoded?.valid && search.phase !== 'success' && (
        <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 16px' }}>
          <p style={{ fontFamily: INTER, fontSize: 12, fontWeight: 700, color: C.dg, letterSpacing: '.06em', textTransform: 'uppercase', margin: '0 0 10px' }}>
            Decoded Format
          </p>
          {[
            ['State Code', `${decoded.stateCode} (${decoded.stateName})`],
            ['PAN Number', decoded.pan!],
            ['Entity Type', decoded.entityType!],
            ['Entity Number', decoded.entityNumber!],
            ['Check Digit', `${decoded.checkDigit} (verified)`],
          ].map(([label, value], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: i < 4 ? `1px solid ${C.border}` : 'none', gap: 8 }}>
              <span style={{ fontFamily: INTER, fontSize: 12.5, color: C.ink2 }}>{label}</span>
              <span style={{ fontFamily: 'monospace, monospace', fontSize: 13, fontWeight: 700, color: C.dg }}>{value}</span>
            </div>
          ))}
        </div>
      )}

      {gstin.length === 0 && (
        <p style={{ fontFamily: INTER, fontSize: 12.5, color: C.ink3, margin: 0, lineHeight: 1.5 }}>
          Format and check-digit validation happens instantly as you type. Click Search once the GSTIN is complete for live registration details.
        </p>
      )}
    </div>
  );
}

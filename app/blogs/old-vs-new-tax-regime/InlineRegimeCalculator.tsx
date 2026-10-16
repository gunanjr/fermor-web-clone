'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const INTER = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';
const DARK = '#101214';
const LIME = '#a6dbc4';
const BORDER = '#E5E5E5';
const INK2 = '#555555';
const INK3 = '#888888';

function calcTaxNew(income: number) {
  const taxable = Math.max(0, income - 75000);
  const slabs: [number, number][] = [
    [400000, 0], [800000, 0.05], [1200000, 0.1], [1600000, 0.15],
    [2000000, 0.2], [2400000, 0.25], [Infinity, 0.3],
  ];
  let tax = 0;
  let prev = 0;
  for (const [limit, rate] of slabs) {
    if (taxable > prev) tax += (Math.min(taxable, limit) - prev) * rate;
    prev = limit;
  }
  if (taxable <= 1200000) tax = 0;
  else tax = Math.min(tax, taxable - 1200000);
  return Math.round(tax * 1.04);
}

function calcTaxOld(income: number) {
  const taxable = Math.max(0, income - 50000);
  const slabs: [number, number][] = [
    [250000, 0], [500000, 0.05], [1000000, 0.2], [Infinity, 0.3],
  ];
  let tax = 0;
  let prev = 0;
  for (const [limit, rate] of slabs) {
    if (taxable > prev) tax += (Math.min(taxable, limit) - prev) * rate;
    prev = limit;
  }
  if (taxable <= 500000) tax = 0;
  return Math.round(tax * 1.04);
}

function fmt(n: number) {
  return '₹' + n.toLocaleString('en-IN');
}

export function InlineRegimeCalculator() {
  const [salary, setSalary] = useState(1200000);
  const [input, setInput] = useState('12,00,000');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const oldTax = calcTaxOld(salary);
  const newTax = calcTaxNew(salary);
  const recommended = newTax <= oldTax ? 'new' : 'old';

  function handleChange(raw: string) {
    const digits = raw.replace(/[^0-9]/g, '');
    setInput(digits ? Number(digits).toLocaleString('en-IN') : '');
    const n = Number(digits);
    if (!isNaN(n)) setSalary(Math.min(n, 100000000));
  }

  if (!mounted) return null;

  return (
    <div style={{ border: `1px solid ${BORDER}`, borderRadius: 14, overflow: 'hidden', margin: '8px 0 28px', boxShadow: '0 1px 12px rgba(16,18,20,0.05)' }}>
      <div style={{ background: '#f4f5f6', padding: '14px 22px', borderBottom: `1px solid ${BORDER}`, textAlign: 'center' as const }}>
        <span style={{ fontFamily: POPPINS, fontSize: 14, fontWeight: 700, color: DARK }}>Old vs New Regime: Instant Check</span>
      </div>
      <div style={{ padding: '22px', display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: '1 1 220px', minWidth: 200 }}>
          <label htmlFor="regime-salary" style={{ display: 'block', fontFamily: INTER, fontSize: 12.5, color: INK2, marginBottom: 8, fontWeight: 600 }}>
            Enter your annual salary
          </label>
          <div style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${DARK}`, borderRadius: 10, padding: '10px 14px', background: '#fff' }}>
            <span style={{ fontFamily: POPPINS, fontSize: 17, fontWeight: 700, color: DARK, marginRight: 4 }}>₹</span>
            <input
              id="regime-salary"
              type="text"
              inputMode="numeric"
              value={input}
              onChange={e => handleChange(e.target.value)}
              aria-label="Annual salary"
              style={{ border: 'none', outline: 'none', fontFamily: POPPINS, fontSize: 17, fontWeight: 700, color: DARK, width: '100%', background: 'transparent' }}
            />
          </div>
          <p style={{ fontFamily: INTER, fontSize: 11.5, color: INK3, marginTop: 8, marginBottom: 0 }}>
            For individuals under 60, no deductions besides standard deduction.
          </p>
        </div>

        <div style={{ flex: '1 1 260px', display: 'flex', gap: 12, minWidth: 240 }}>
          <div style={{ flex: 1, textAlign: 'center' as const, padding: '14px 8px', borderRadius: 10, border: `1px solid ${recommended === 'old' ? DARK : BORDER}`, background: recommended === 'old' ? '#f4f5f6' : '#fff' }}>
            <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase' as const, color: INK3, marginBottom: 6 }}>Old regime</div>
            <div aria-live="polite" style={{ fontFamily: POPPINS, fontSize: 20, fontWeight: 800, color: DARK }}>{fmt(oldTax)}</div>
            {recommended === 'old' && <div style={{ marginTop: 6, display: 'inline-block', background: DARK, color: LIME, fontFamily: INTER, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 5 }}>Recommended</div>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', fontFamily: INTER, fontSize: 12, color: INK3, fontWeight: 600 }}>vs</div>
          <div style={{ flex: 1, textAlign: 'center' as const, padding: '14px 8px', borderRadius: 10, border: `1px solid ${recommended === 'new' ? DARK : BORDER}`, background: recommended === 'new' ? '#f4f5f6' : '#fff' }}>
            <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase' as const, color: INK3, marginBottom: 6 }}>New regime</div>
            <div aria-live="polite" style={{ fontFamily: POPPINS, fontSize: 20, fontWeight: 800, color: DARK }}>{fmt(newTax)}</div>
            {recommended === 'new' && <div style={{ marginTop: 6, display: 'inline-block', background: DARK, color: LIME, fontFamily: INTER, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 5 }}>Recommended</div>}
          </div>
        </div>
      </div>
      <div style={{ background: '#fafafa', borderTop: `1px solid ${BORDER}`, padding: '14px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: INTER, fontSize: 12.5, color: INK2 }}>Have 80C, HRA, or home loan deductions? Get the full breakdown.</span>
        <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ background: DARK, color: '#fff', fontFamily: INTER, fontSize: 12.5, fontWeight: 700, padding: '9px 16px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap' as const }}>
            Open full calculator
        </Link>
      </div>
    </div>
  );
}

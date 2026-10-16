'use client';

import { useState, useMemo, useEffect, useLayoutEffect } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { FAQBox } from '@/components/common/FAQBox';

const C = {
  dark:     '#101214',
  lime:     '#a6dbc4',
  lime2:    '#2d9970',
  paleLime: '#f4f5f6',
  ink:      '#16140F',
  ink2:     '#50565c',
  ink3:     '#7a8087',
  white:    '#ffffff',
  bg:       '#f6f7f8',
  border:   '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

const fmtIN = (n: number) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(Math.max(0, n)));
const fmtC = (n: number) => {
  if (n === 0) return '₹0';
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`;
  return `₹${fmtIN(n)}`;
};
const fmtPct = (n: number) => `${n.toFixed(1)}%`;

const SAL_LOG_MIN  = 100_000;
const SAL_MAX      = 50_000_000;
const SAL_LOG_BASE = Math.log(SAL_MAX / SAL_LOG_MIN);

function salaryToPos(v: number): number {
  if (v <= 0) return 0;
  if (v >= SAL_MAX) return 1000;
  if (v <= SAL_LOG_MIN) return Math.round((v / SAL_LOG_MIN) * 50);
  return Math.round(50 + 950 * (Math.log(v / SAL_LOG_MIN) / SAL_LOG_BASE));
}

function posToSalary(pos: number): number {
  if (pos <= 0) return 0;
  if (pos >= 1000) return SAL_MAX;
  if (pos <= 50) return Math.round(((pos / 50) * SAL_LOG_MIN) / 10_000) * 10_000;
  const raw = SAL_LOG_MIN * Math.exp(((pos - 50) / 950) * SAL_LOG_BASE);
  if (raw < 2_000_000)  return Math.round(raw / 25_000) * 25_000;
  if (raw < 10_000_000) return Math.round(raw / 100_000) * 100_000;
  return Math.round(raw / 500_000) * 500_000;
}

const SAL_TICKS: [number, string][] = [
  [0,           '₹0'],
  [1_000_000,  '₹10L'],
  [3_000_000,  '₹30L'],
  [10_000_000, '₹1Cr'],
  [50_000_000, '₹5Cr'],
];

interface Slab { min: number; max: number; rate: number; label: string }
interface SlabHit { label: string; rate: number; taxable: number; tax: number }

const NEW_SLABS: Slab[] = [
  { min: 0,       max: 400000,   rate: 0,    label: 'Up to ₹4L' },
  { min: 400000,  max: 800000,   rate: 0.05, label: '₹4L - ₹8L' },
  { min: 800000,  max: 1200000,  rate: 0.10, label: '₹8L - ₹12L' },
  { min: 1200000, max: 1600000,  rate: 0.15, label: '₹12L - ₹16L' },
  { min: 1600000, max: 2000000,  rate: 0.20, label: '₹16L - ₹20L' },
  { min: 2000000, max: 2400000,  rate: 0.25, label: '₹20L - ₹24L' },
  { min: 2400000, max: Infinity, rate: 0.30, label: 'Above ₹24L' },
];

const NEW_SLABS_2425: Slab[] = [
  { min: 0,       max: 300000,   rate: 0,    label: 'Up to ₹3L' },
  { min: 300000,  max: 600000,   rate: 0.05, label: '₹3L - ₹6L' },
  { min: 600000,  max: 900000,   rate: 0.10, label: '₹6L - ₹9L' },
  { min: 900000,  max: 1200000,  rate: 0.15, label: '₹9L - ₹12L' },
  { min: 1200000, max: 1500000,  rate: 0.20, label: '₹12L - ₹15L' },
  { min: 1500000, max: Infinity, rate: 0.30, label: 'Above ₹15L' },
];

const OLD_SLABS: Record<string, Slab[]> = {
  below60: [
    { min: 0,       max: 250000,   rate: 0,    label: 'Up to ₹2.5L' },
    { min: 250000,  max: 500000,   rate: 0.05, label: '₹2.5L - ₹5L' },
    { min: 500000,  max: 1000000,  rate: 0.20, label: '₹5L - ₹10L' },
    { min: 1000000, max: Infinity, rate: 0.30, label: 'Above ₹10L' },
  ],
  senior: [
    { min: 0,       max: 300000,   rate: 0,    label: 'Up to ₹3L' },
    { min: 300000,  max: 500000,   rate: 0.05, label: '₹3L - ₹5L' },
    { min: 500000,  max: 1000000,  rate: 0.20, label: '₹5L - ₹10L' },
    { min: 1000000, max: Infinity, rate: 0.30, label: 'Above ₹10L' },
  ],
  superSenior: [
    { min: 0,       max: 500000,   rate: 0,    label: 'Up to ₹5L' },
    { min: 500000,  max: 1000000,  rate: 0.20, label: '₹5L - ₹10L' },
    { min: 1000000, max: Infinity, rate: 0.30, label: 'Above ₹10L' },
  ],
};

const SLAB_COLOURS: Record<number, string> = {
  0:    '#EEEEEA',
  0.05: '#D6D6CE',
  0.10: '#BFBFB4',
  0.15: '#A3A39A',
  0.20: '#7a8087',
  0.25: '#50565c',
  0.30: '#16140F',
};
const SLAB_TEXT_DARK = [0.20, 0.25, 0.30];

function slabCalc(income: number, slabs: Slab[]): { total: number; hits: SlabHit[] } {
  let total = 0;
  const hits: SlabHit[] = [];
  for (const s of slabs) {
    if (income <= s.min) break;
    const taxable = Math.min(income, s.max === Infinity ? income : s.max) - s.min;
    const tax = taxable * s.rate;
    total += tax;
    hits.push({ label: s.label, rate: s.rate, taxable, tax });
  }
  return { total, hits };
}

function getSurcharge(tax: number, income: number, isNew: boolean): number {
  if (income > 50_000_000) return tax * (isNew ? 0.25 : 0.37);
  if (income > 20_000_000) return tax * 0.25;
  if (income > 10_000_000) return tax * 0.15;
  if (income > 5_000_000)  return tax * 0.10;
  return 0;
}

function calcHRAExemption(basic: number, hraReceived: number, rentPaid: number, isMetro: boolean): number {
  if (basic <= 0 || hraReceived <= 0 || rentPaid <= 0) return 0;
  const metroFactor = isMetro ? 0.5 : 0.4;
  const rentMinusBasicPct = Math.max(0, rentPaid - 0.1 * basic);
  return Math.min(hraReceived, metroFactor * basic, rentMinusBasicPct);
}

function getMarginalRate(taxableIncome: number, slabs: Slab[]): number {
  let rate = 0;
  for (const s of slabs) {
    if (taxableIncome > s.min) rate = s.rate;
  }
  return rate;
}

export interface TaxInput {
  salary:          number;
  exemptIncome:    number;
  otherIncome:     number;
  interestIncome:  number;
  rentalIncome:    number;
  digitalAssets:   number;
  sec80C:          number;
  sec80D:          number;
  sec80CCD1B:      number;
  sec80CCD2:       number;
  sec80TTA:        number;
  sec80G:          number;
  sec80E:          number;
  homeLoanSelf:    number;
  age:             'below60' | 'senior' | 'superSenior';
  basic:           number;
  hraReceived:     number;
  rentPaid:        number;
  isMetro:         boolean;
}

export interface RegimeResult {
  regime:           'new' | 'old';
  grossIncome:      number;
  stdDeduction:     number;
  hraExemption:     number;
  totalDeductions:  number;
  taxableIncome:    number;
  slabTax:          number;
  rebate:           number;
  taxAfterRebate:   number;
  specialTax:       number;
  surcharge:        number;
  cess:             number;
  totalTax:         number;
  effectiveRate:    number;
  monthlyTDS:       number;
  slabHits:         SlabHit[];
}

function calcRegime(inp: TaxInput, regime: 'new' | 'old', fy: string): RegimeResult {
  const isNew  = regime === 'new';
  const is2425 = fy === '2024';

  const hraExemption = !isNew ? calcHRAExemption(inp.basic, inp.hraReceived, inp.rentPaid, inp.isMetro) : 0;
  const totalExempt  = inp.exemptIncome + hraExemption;
  const netSalary    = Math.max(0, inp.salary - totalExempt);
  const rentalNet    = inp.rentalIncome * 0.7;
  const grossIncome  = netSalary + inp.otherIncome + inp.interestIncome + rentalNet + inp.digitalAssets;

  const stdDeduction = inp.salary > 0 ? (isNew ? (is2425 ? 50_000 : 75_000) : 50_000) : 0;

  let chapVIA = 0;
  if (!isNew) {
    chapVIA += Math.min(inp.sec80C,       150_000);
    chapVIA += Math.min(inp.sec80D,       100_000);
    chapVIA += Math.min(inp.sec80CCD1B,    50_000);
    chapVIA += Math.min(inp.sec80TTA,      10_000);
    chapVIA += inp.sec80G;
    chapVIA += inp.sec80E;
    chapVIA += Math.min(inp.homeLoanSelf, 200_000);
  }
  const totalDeductions = chapVIA;

  const ccd2 = Math.min(inp.sec80CCD2, inp.salary * 0.14);
  const regularIncome = grossIncome - inp.digitalAssets;
  const taxableIncome = Math.max(0, regularIncome - stdDeduction - totalDeductions - ccd2);

  const specialTax = Math.round(inp.digitalAssets * 0.30);

  const slabs = isNew ? (is2425 ? NEW_SLABS_2425 : NEW_SLABS) : (OLD_SLABS[inp.age] ?? OLD_SLABS.below60);
  const { total: rawSlabTax, hits: slabHits } = slabCalc(taxableIncome, slabs);

  let rebate = 0;
  if (isNew) {
    rebate = is2425
      ? (taxableIncome <= 700_000 ? Math.min(rawSlabTax, 25_000) : 0)
      : (rawSlabTax <= 60_000 ? rawSlabTax : 0);
  } else {
    rebate = rawSlabTax <= 12_500 ? rawSlabTax : 0;
  }

  const slabTax        = rawSlabTax;
  const taxAfterRebate = slabTax - rebate + specialTax;
  const sc             = getSurcharge(taxAfterRebate, taxableIncome + inp.digitalAssets, isNew);
  const cess           = (taxAfterRebate + sc) * 0.04;
  const totalTax       = Math.round(taxAfterRebate + sc + cess);
  const effectiveRate  = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;
  const monthlyTDS     = totalTax / 12;

  return {
    regime, grossIncome, stdDeduction, hraExemption, totalDeductions, taxableIncome,
    slabTax, rebate, taxAfterRebate, specialTax, surcharge: sc, cess, totalTax,
    effectiveRate, monthlyTDS, slabHits,
  };
}

function NumInput({ label, value, onChange, max, hint, placeholder = '0' }: {
  label: string; value: number; onChange: (v: number) => void;
  max?: number; hint?: string; placeholder?: string;
}) {
  const [raw, setRaw]     = useState('');
  const [focus, setFocus] = useState(false);
  const display = focus ? raw : (value > 0 ? fmtIN(value) : '');
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <label style={{ fontSize: 13, color: C.ink2, fontWeight: 500 }}>{label}</label>
        {hint && <span style={{ fontSize: 11, color: C.ink3 }}>{hint}</span>}
      </div>
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: C.ink3, pointerEvents: 'none' }}>₹</span>
        <input type="text" inputMode="numeric" value={display} placeholder={placeholder}
          onFocus={() => { setRaw(value > 0 ? String(value) : ''); setFocus(true); }}
          onChange={e => setRaw(e.target.value.replace(/[^0-9]/g, ''))}
          onBlur={() => {
            setFocus(false);
            const n = parseInt(raw || '0', 10);
            onChange(max !== undefined ? Math.min(n, max) : n);
          }}
          style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px 9px 28px', border: `1.5px solid ${focus ? C.ink : C.border}`, borderRadius: 8, fontSize: 14, fontWeight: 600, color: C.ink, outline: 'none', fontFamily: INTER, background: C.white, transition: 'all 0.15s' }}
        />
      </div>
    </div>
  );
}

function Slider({ label, value, min, max, step, fmt, onChange }: {
  label: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw]         = useState('');
  const fill = ((value - min) / (max - min)) * 100;
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <label style={{ fontSize: 14, color: C.ink2, fontWeight: 400 }}>{label}</label>
        {editing ? (
          <input autoFocus value={raw} onChange={e => setRaw(e.target.value)} onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.white, border: `1.5px solid ${C.ink}`, borderRadius: 8, padding: '7px 12px', width: 130, outline: 'none', color: C.ink, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            style={{ fontSize: 14, fontWeight: 700, color: C.ink, background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: '7px 16px', cursor: 'pointer', fontFamily: INTER, minWidth: 120, textAlign: 'center' }}>
            {fmt(value)}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${fill}%, ${C.border} ${fill}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${fill}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 20, height: 20, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 2px 8px rgba(16,18,20,0.22)', pointerEvents: 'none', zIndex: 1 }} />
        <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(+e.target.value)}
          aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontSize: 11, color: C.ink3 }}>{fmt(min)}</span>
        <span style={{ fontSize: 11, color: C.ink3 }}>{fmt(max)}</span>
      </div>
    </div>
  );
}

function SalarySlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw]         = useState('');
  const pos  = salaryToPos(value);
  const fill = Math.min(pos / 10, 100);
  const commit = () => {
    setEditing(false);
    const n = parseInt(raw.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(n) && n >= 0) onChange(n);
  };
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <label style={{ fontSize: 14, color: C.ink2, fontWeight: 400 }}>Gross Salary (Annual)</label>
        {editing ? (
          <input autoFocus value={raw} onChange={e => setRaw(e.target.value)} onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.white, border: `1.5px solid ${C.ink}`, borderRadius: 8, padding: '7px 12px', width: 140, outline: 'none', color: C.ink, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            style={{ fontSize: 14, fontWeight: 700, color: C.ink, background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: '7px 16px', cursor: 'pointer', fontFamily: INTER, minWidth: 130, textAlign: 'center' }}>
            {fmtC(value)}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${fill}%, ${C.border} ${fill}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${fill}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 20, height: 20, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 2px 8px rgba(16,18,20,0.22)', pointerEvents: 'none', zIndex: 1 }} />
        <input type="range" min={0} max={1000} step={1} value={Math.min(pos, 1000)} onChange={e => onChange(posToSalary(+e.target.value))}
          aria-label="Gross Annual Salary" aria-valuenow={value} aria-valuemin={0} aria-valuemax={SAL_MAX}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ position: 'relative', marginTop: 6, height: 16 }}>
        {SAL_TICKS.map(([v, lbl], i) => {
          const pct = salaryToPos(v) / 10;
          return (
            <span key={v} style={{ position: 'absolute', left: i === 0 ? '0%' : i === SAL_TICKS.length - 1 ? '100%' : `${pct}%`, transform: i === 0 ? 'none' : i === SAL_TICKS.length - 1 ? 'translateX(-100%)' : 'translateX(-50%)', fontSize: 10, color: C.ink3, whiteSpace: 'nowrap' }}>
              {lbl}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function SlabBar({ taxableIncome, slabs, mobile, fmt, selectedRegime, setSelectedRegime }: {
  taxableIncome: number; slabs: Slab[]; mobile: boolean; fmt: (n: number) => string;
  selectedRegime: 'new' | 'old'; setSelectedRegime: (r: 'new' | 'old') => void;
}) {
  const regimeDropdown = (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <select value={selectedRegime} onChange={e => setSelectedRegime(e.target.value as 'new' | 'old')}
        aria-label="Regime for slab visualizer"
        style={{ appearance: 'none', WebkitAppearance: 'none', fontSize: 12, fontWeight: 700, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: '6px 28px 6px 12px', cursor: 'pointer', fontFamily: INTER }}>
        <option value="new">New Regime</option>
        <option value="old">Old Regime</option>
      </select>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
        style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );
  if (taxableIncome <= 0) {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>{regimeDropdown}</div>
        <div style={{ padding: '20px 0', textAlign: 'center', color: C.ink3, fontSize: 13 }}>Enter your income to see the slab breakdown.</div>
      </div>
    );
  }
  const displayMax = Math.max(taxableIncome * 1.15, 2_500_000);
  const segs = slabs.map(s => {
    const segMin = s.min;
    const segMax = s.max === Infinity ? displayMax : Math.min(s.max, displayMax);
    if (segMin >= displayMax) return null;
    const widthPct = ((segMax - segMin) / displayMax) * 100;
    const filledIncome = Math.min(taxableIncome, segMax) - segMin;
    const fillPct = filledIncome > 0 ? (filledIncome / (segMax - segMin)) * 100 : 0;
    return { s, segMin, segMax, widthPct, fillPct, taxInSlab: filledIncome * s.rate, filledIncome };
  }).filter(Boolean);
  const markerPct = Math.min((taxableIncome / displayMax) * 100, 99.5);
  return (
    <div style={{ fontFamily: INTER }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 10 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: C.ink3, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Slab Breakdown: Taxable Income {fmt(taxableIncome)}
        </div>
        {regimeDropdown}
      </div>
      <div style={{ position: 'relative', height: 40, display: 'flex', borderRadius: 8, overflow: 'hidden', border: `1px solid ${C.border}` }}>
        {segs.map((seg, i) => {
          if (!seg) return null;
          const isDark = SLAB_TEXT_DARK.includes(seg.s.rate);
          return (
            <div key={i} style={{ width: `${seg.widthPct}%`, position: 'relative', flexShrink: 0, background: '#f4f5f6', borderRight: i < segs.length - 1 ? `1px solid ${C.border}` : 'none' }}>
              {seg.fillPct > 0 && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${seg.fillPct}%`, background: SLAB_COLOURS[seg.s.rate], transition: 'width 0.35s ease' }} />}
              {seg.widthPct > 6 && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: mobile ? 10 : 11, fontWeight: 700, color: seg.fillPct > 50 && isDark ? C.white : seg.fillPct > 50 && !isDark ? C.dark : C.ink3, pointerEvents: 'none', zIndex: 1 }}>
                  {seg.s.rate === 0 ? 'Nil' : `${seg.s.rate * 100}%`}
                </div>
              )}
            </div>
          );
        })}
        <div style={{ position: 'absolute', left: `${markerPct}%`, top: 0, bottom: 0, width: 2, background: C.dark, zIndex: 3, boxShadow: '0 0 4px rgba(16,18,20,0.5)' }} />
      </div>
      <div style={{ display: 'flex', marginTop: 4 }}>
        {segs.map((seg, i) => !seg ? null : (
          <div key={i} style={{ width: `${seg.widthPct}%`, overflow: 'hidden', paddingRight: 2 }}>
            {seg.widthPct > 8 && <div style={{ fontSize: 10, color: C.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{fmt(seg.segMin)}</div>}
          </div>
        ))}
      </div>
      {!mobile && (
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {segs.map((seg, i) => {
            if (!seg || seg.filledIncome <= 0) return null;
            return (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 12px', borderRadius: 7, background: '#f4f5f6', border: `1px solid ${C.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: SLAB_COLOURS[seg.s.rate], border: `1px solid ${C.border}` }} />
                  <span style={{ fontSize: 12, color: C.ink2 }}>{seg.s.label}</span>
                </div>
                <div style={{ display: 'flex', gap: 20 }}>
                  <span style={{ fontSize: 12, color: C.ink3 }}>Income: {fmt(seg.filledIncome)}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: seg.s.rate === 0 ? C.ink3 : C.dark }}>Tax: {seg.s.rate === 0 ? 'Nil' : fmt(seg.taxInSlab)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function TaxDonut({ totalTax, grossIncome, fmt }: { totalTax: number; grossIncome: number; fmt: (n: number) => string }) {
  const R = 80, cx = 106, cy = 106, sw = 20;
  const circ   = 2 * Math.PI * R;
  const taxPct = grossIncome > 0 ? Math.min(totalTax / grossIncome, 1) : 0;
  const isZero = totalTax === 0 || grossIncome === 0;
  const taxDash = isZero ? 0 : taxPct * circ;
  return (
    <svg width={212} height={212} viewBox="0 0 212 212" role="img" aria-label={isZero ? 'Zero tax payable' : `Tax ${fmtPct(taxPct * 100)}, net income ${fmtPct((1 - taxPct) * 100)}`} style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#e3e6e8" strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={isZero ? C.lime2 : C.dark} strokeWidth={sw}
        strokeDasharray={`${isZero ? circ : taxDash} ${circ}`}
        strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 10} textAnchor="middle" style={{ fontSize: 13, fill: C.ink3, fontFamily: INTER }}>{isZero ? 'Zero' : 'Tax'}</text>
      <text x={cx} y={cy + 16} textAnchor="middle" style={{ fontSize: isZero ? 18 : 26, fontWeight: 800, fill: isZero ? C.lime2 : C.dark, fontFamily: INTER }}>{isZero ? `${fmt(0)} Tax` : fmtPct(taxPct * 100)}</text>
    </svg>
  );
}

function RegimeCard({ res, winner, mobile, onClick, selected, fmt }: {
  res: RegimeResult; winner: boolean; mobile: boolean; onClick: () => void; selected: boolean; fmt: (n: number) => string;
}) {
  return (
    <button onClick={onClick}
      style={{ flex: 1, border: `${selected ? 2 : 1}px solid ${selected ? C.dark : C.border}`, borderRadius: 12, padding: mobile ? '12px 10px' : '16px 18px', textAlign: 'left', background: selected ? C.white : C.bg, cursor: 'pointer', fontFamily: INTER, transition: 'all 0.15s', position: 'relative', minWidth: 0 }}>
      {winner && (
        <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: '#F4F5F6', border: '1px solid #E3E6E8', color: '#101214', fontSize: 10, fontWeight: 700, padding: '2px 9px', borderRadius: 99, whiteSpace: 'nowrap', letterSpacing: '0.06em' }}>BETTER</div>
      )}
      <div style={{ fontSize: 10.5, fontWeight: 700, color: C.ink3, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>{res.regime === 'new' ? 'New Regime' : 'Old Regime'}</div>
      <div aria-live="polite" aria-label={`${res.regime === 'new' ? 'New' : 'Old'} Regime Total Tax: ${fmt(res.totalTax)}`} style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, letterSpacing: '-0.02em', marginBottom: 2 }}>{fmt(res.totalTax)}</div>
      <div style={{ fontSize: 11.5, color: C.ink3 }}>{fmtPct(res.effectiveRate)} effective</div>
      {res.rebate > 0 && (
        <div style={{ marginTop: 6, fontSize: 11, color: C.ink3, borderTop: `1px solid ${C.border}`, paddingTop: 6 }}>
          87A rebate: {fmt(res.rebate)} off
        </div>
      )}
    </button>
  );
}

function BreakdownTable({ res, mobile, fmt }: { res: RegimeResult; mobile: boolean; fmt: (n: number) => string }) {
  const rows: [string, string, boolean?][] = [
    ['Gross Income', fmt(res.grossIncome)],
    ...(res.hraExemption > 0 ? [['HRA Exemption (in gross income)', `(${fmt(res.hraExemption)})`] as [string, string]] : []),
    ['Standard Deduction', `(${fmt(res.stdDeduction)})`],
    ...(res.totalDeductions > 0 ? [['Chapter VI-A Deductions', `(${fmt(res.totalDeductions)})`] as [string, string]] : []),
    ['Taxable Income', fmt(res.taxableIncome), true],
    ['Income Tax (Slab)', fmt(res.slabTax)],
    ...(res.rebate > 0 ? [['Less: Rebate u/s 87A', `(${fmt(res.rebate)})`] as [string, string]] : []),
    ...(res.specialTax > 0 ? [['Digital Assets Tax (30%)', fmt(res.specialTax)] as [string, string]] : []),
    ...(res.surcharge > 0 ? [['Surcharge', fmt(res.surcharge)] as [string, string]] : []),
    ['Health & Education Cess (4%)', fmt(res.cess)],
    ['Total Tax Payable', fmt(res.totalTax), true],
    ['Monthly TDS', fmt(res.monthlyTDS)],
    ['Effective Tax Rate', fmtPct(res.effectiveRate)],
  ];
  const td: React.CSSProperties  = { padding: mobile ? '9px 10px' : '11px 16px', fontSize: 13, borderBottom: `1px solid ${C.border}`, color: C.ink2 };
  const tdB: React.CSSProperties = { ...td, fontWeight: 700, color: C.ink, background: '#F8FBF6' };
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>
        <tbody>
          {rows.map(([label, val, bold], i) => (
            <tr key={i}>
              <td style={bold ? { ...tdB, borderLeft: `3px solid ${C.lime2}` } : td}>{label}</td>
              <td style={{ ...(bold ? tdB : td), textAlign: 'right' }}>{val}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const FAQS = [
  { q: 'How is income tax calculated on salary in India?', a: 'Start with your gross salary. Subtract exempt allowances (HRA, LTA, old regime only). Subtract the standard deduction (₹75,000 new / ₹50,000 old). Subtract eligible Chapter VI-A deductions (only old regime). Apply the slab tax rates to the remaining taxable income. Apply Section 87A rebate if eligible. Add surcharge if income exceeds ₹50 lakh. Finally add 4% Health and Education Cess.' },
  { q: 'Zero tax on ₹12 lakh: how does it work?', a: 'For a salaried person with gross salary of ₹12.75 lakh under the new regime: after the standard deduction of ₹75,000, taxable income is ₹12 lakh. The slab tax on ₹12 lakh is ₹60,000 (₹20,000 at 5% + ₹40,000 at 10%). This equals the Section 87A rebate limit of ₹60,000, so the entire tax is rebated and net tax is zero.' },
  { q: 'At what income level does the old regime become better than the new?', a: 'For incomes above ₹15 lakh, the old regime beats the new regime only if you can claim deductions exceeding roughly ₹3.75 lakh (80C ₹1.5L + NPS ₹50K + 80D ₹25K + home loan interest ₹2L). For most salaried individuals without a home loan or large 80C investments, the new regime is better across all income levels.' },
  { q: 'What is the surcharge on income tax?', a: 'Surcharge is an additional tax on your income tax (not on income). For FY 2026-27: 5% surcharge if income is ₹50L to ₹1Cr; 15% for ₹1Cr to ₹2Cr; 25% for ₹2Cr to ₹5Cr under both regimes; 25% above ₹5Cr under new regime (37% under old). Surcharge and tax together are subject to a 4% Health and Education Cess.' },
  { q: 'Is rental income taxable? How is it calculated?', a: 'Yes, rental income is taxable as "Income from House Property." However, you get a standard deduction of 30% on the gross rent before it is added to your total income; this covers repairs and maintenance without requiring bills. The net rental income (70% of gross rent) is then taxed at slab rates.' },
  { q: 'How are digital assets (cryptocurrency) taxed in India?', a: 'Income from virtual digital assets (VDA/crypto) is taxed at a flat 30% rate regardless of your income slab or tax regime. Additionally, a 1% TDS applies on transfers above ₹10,000. Losses from VDA cannot be set off against other income or carried forward.' },
  { q: 'What is the difference between taxable income and gross income?', a: 'Gross income is the total of all your income sources before any deductions. Taxable income is what remains after subtracting the standard deduction and all eligible Chapter VI-A deductions. Tax is calculated on taxable income, not gross income. The difference between the two is what you save through legitimate deductions.' },
  { q: 'Can I claim both 80CCD(1B) and 80CCD(2) NPS deductions?', a: "80CCD(2) is the employer's contribution to NPS, allowed under both old and new regime with no upper cap (subject to 14% of basic salary). 80CCD(1B) is the employee's additional voluntary NPS contribution of up to ₹50,000, allowed only under the old regime. Using both in the old regime gives you a combined NPS deduction of up to ₹2 lakh (₹1.5L in 80C + ₹50K in 80CCD(1B))." },
  { q: 'What is the HRA exemption and how is it calculated?', a: "HRA exemption is available only under the old tax regime. The exempt amount is the lowest of three: (a) actual HRA received from employer, (b) 50% of basic salary if you live in a metro city (Mumbai, Delhi, Kolkata, Chennai) or 40% for other cities, and (c) actual rent paid minus 10% of basic salary. You must be paying rent and should have rent receipts and the landlord's PAN if annual rent exceeds ₹1 lakh." },
  { q: 'What is Section 80E deduction for education loan interest?', a: 'Section 80E allows you to deduct the entire interest paid on an education loan, with no upper limit. The deduction is available for up to 8 assessment years from the year repayment begins. The loan must be taken from a recognised financial institution or approved charitable institution for higher education (full-time studies after Class 12). This deduction is available only under the old tax regime.' },
  { q: 'Can I switch between old and new tax regime every year?', a: 'Salaried employees can switch between regimes every financial year by informing their employer at the start of the year. Self-employed individuals with business income can switch from old to new only once and cannot revert. For salaried employees, the decision must be made before April of the financial year so the employer deducts TDS correctly. The final election can also be made when filing the ITR before 31 July.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <div style={{ padding: '14px 18px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ padding: '12px 18px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 13, color: C.ink2 }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = C.paleLime; (e.currentTarget as HTMLElement).style.color = C.dark; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink2; }}>
            {label}
          </div>
        </Link>
      ))}
    </div>
  );
}

const TAX_CALCS = [
  { href: '/calculators/old-vs-new-tax-regime-calculator', label: 'Old vs New Regime' },
  { href: '/calculators/hra-calculator',                   label: 'HRA Calculator' },
  { href: '/calculators/in-hand-salary-calculator',        label: 'In-Hand Salary' },
  { href: '/calculators/nps-calculator',                   label: 'NPS Calculator' },
  { href: '/calculators/gratuity-calculator',               label: 'Gratuity Calculator' },
  { href: '/calculators/capital-gains-calculator',          label: 'Capital Gains' },
  { href: '/calculators/ppf-calculator',                    label: 'PPF Calculator' },
];

const DEFAULT_INPUT: TaxInput = {
  salary: 1500000, exemptIncome: 0, otherIncome: 0, interestIncome: 0,
  rentalIncome: 0, digitalAssets: 0, sec80C: 150000, sec80D: 25000,
  sec80CCD1B: 50000, sec80CCD2: 0, sec80TTA: 0, sec80G: 0, sec80E: 0,
  homeLoanSelf: 0, age: 'below60', basic: 0, hraReceived: 0, rentPaid: 0, isMetro: true,
};

export default function IncomeTaxCalculatorClient() {
  const title = null;

  const defaultSettings = { inp: DEFAULT_INPUT, showDeductions: true, selectedRegime: 'new', showMore: false, fy: '2026', showHRA: false };
  const { settings, updateSettings } = useCalculatorSettings('income-tax-calculator', defaultSettings);
  const { inp, showDeductions, selectedRegime, showMore, fy, showHRA } = settings;

  const setInp           = (v: any) => updateSettings({ inp: typeof v === 'function' ? v(settings.inp) : v });
  const setShowDeductions = (v: any) => updateSettings({ showDeductions: typeof v === 'function' ? v(settings.showDeductions) : v });
  const setSelectedRegime = (v: any) => updateSettings({ selectedRegime: typeof v === 'function' ? v(settings.selectedRegime) : v });
  const setShowMore      = (v: any) => updateSettings({ showMore: typeof v === 'function' ? v(settings.showMore) : v });
  const setFy            = (v: any) => updateSettings({ fy: typeof v === 'function' ? v(settings.fy) : v });
  const setShowHRA       = (v: any) => updateSettings({ showHRA: typeof v === 'function' ? v(settings.showHRA) : v });

  const [inputPage, setInputPage] = useState<'basic' | 'advanced'>('basic');
  const [mobile, setMobile] = useState(false);
  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtCc  = (n: number) => formatCurrency(convertCurrency(n), true);
  const fmtINc = (n: number) => formatCurrency(convertCurrency(n));

  const safeInp: TaxInput = { ...DEFAULT_INPUT, ...(inp || {}) };
  const set = <K extends keyof TaxInput>(k: K, v: TaxInput[K]) =>
    setInp((p: TaxInput) => ({ ...p, [k]: v }));

  const currentFy = fy || '2026';
  const newRes = useMemo(() => calcRegime(safeInp, 'new', currentFy), [safeInp, currentFy]);
  const oldRes = useMemo(() => calcRegime(safeInp, 'old', currentFy), [safeInp, currentFy]);

  const newWins = newRes.totalTax <= oldRes.totalTax;
  const savings  = Math.abs(newRes.totalTax - oldRes.totalTax);
  const selRes   = selectedRegime === 'new' ? newRes : oldRes;

  const oldSlabs    = OLD_SLABS[safeInp.age] ?? OLD_SLABS.below60;
  const marginalRate = getMarginalRate(oldRes.taxableIncome, oldSlabs);
  const breakEvenDeductions = newWins && marginalRate > 0 && savings > 0
    ? Math.ceil(savings / (marginalRate * 1.04) / 5000) * 5000
    : 0;

  const computedHRA   = calcHRAExemption(safeInp.basic, safeInp.hraReceived, safeInp.rentPaid, safeInp.isMetro);
  const monthlyInHand = safeInp.salary > 0
    ? safeInp.salary / 12 - selRes.monthlyTDS - (safeInp.basic > 0 ? safeInp.basic * 0.12 / 12 : 0) - 200
    : 0;

  const p: React.CSSProperties   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' };
  const h2s: React.CSSProperties = { fontSize: mobile ? 18 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' };
  const h3s: React.CSSProperties = { fontSize: 16, fontWeight: 600, color: C.ink, margin: '0 0 10px' };
  const sec: React.CSSProperties = { margin: '0 0 40px' };
  const thS: React.CSSProperties = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap', verticalAlign: 'middle' };
  const tdL: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' };
  const tdR: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top' };
  const fyLabel = (y: string) => y === '2026' ? 'FY 2026-27' : y === '2025' ? 'FY 2025-26' : 'FY 2024-25';

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 24px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            {title || 'Income Tax Calculator'}
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            FY 2026-27 (AY 2027-28) &nbsp;&middot;&nbsp; New Regime vs Old Regime &nbsp;&middot;&nbsp; HRA, 80C, NPS, monthly take-home &nbsp;&middot;&nbsp; Updated June 2026
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          <div style={{ minWidth: 0 }}>

            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 28 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 0 }}>

                {/* INPUT */}
                <div style={{ padding: mobile ? '18px' : '28px 32px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none', display: 'flex', flexDirection: 'column' }}>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{inputPage === 'basic' ? 'Inputs' : 'More Settings'}</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  {inputPage === 'basic' ? (
                    <>
                      {/* FY + Age inside input panel */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 7 }}>Financial Year</div>
                          <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                            {(['2026', '2025', '2024'] as const).map((y, idx) => (
                              <button key={y} onClick={() => setFy(y)}
                                style={{ flex: 1, padding: '7px 0', border: 'none', borderRight: idx < 2 ? `1px solid ${C.border}` : 'none', background: currentFy === y ? C.white : 'transparent', color: currentFy === y ? C.ink : C.ink3, fontFamily: INTER, fontSize: 11.5, fontWeight: currentFy === y ? 700 : 400, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                                {y === '2026' ? '2026-27' : y === '2025' ? '2025-26' : '2024-25'}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 7 }}>Age</div>
                          <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                            {([['below60', '< 60'], ['senior', '60-80'], ['superSenior', '80+']] as const).map(([v, l], idx) => (
                              <button key={v} onClick={() => set('age', v)}
                                style={{ flex: 1, padding: '7px 0', border: 'none', borderRight: idx < 2 ? `1px solid ${C.border}` : 'none', background: safeInp.age === v ? C.white : 'transparent', color: safeInp.age === v ? C.ink : C.ink3, fontFamily: INTER, fontSize: 11.5, fontWeight: safeInp.age === v ? 700 : 400, cursor: 'pointer' }}>
                                {l}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <SalarySlider value={safeInp.salary} onChange={v => set('salary', v)} />
                      <NumInput label="Other Exempt Allowances (LTA etc.)" value={safeInp.exemptIncome} onChange={v => set('exemptIncome', v)} hint="Old regime" />
                      <NumInput label="Other Income (Business / Freelance)" value={safeInp.otherIncome} onChange={v => set('otherIncome', v)} />
                      <NumInput label="Interest Income (FD, Savings etc.)" value={safeInp.interestIncome} onChange={v => set('interestIncome', v)} />
                      <Slider label="Section 80C (PPF, ELSS, PF, LIC)" value={safeInp.sec80C} min={0} max={150000} step={5000} fmt={fmtC} onChange={v => set('sec80C', v)} />
                      <NumInput label="Health Insurance 80D" value={safeInp.sec80D} onChange={v => set('sec80D', v)} hint="Self ₹25K + parents ₹50K" />
                      <NumInput label="Employer NPS 80CCD(2)" value={safeInp.sec80CCD2} onChange={v => set('sec80CCD2', v)} hint={safeInp.salary > 0 ? `Both regimes, limit ${fmtC(safeInp.salary * 0.14)}` : 'Both regimes, 14% of salary'} />

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
                        <button onClick={() => setInputPage('advanced')}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: C.dark, background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 7, padding: '6px 14px', cursor: 'pointer', fontFamily: INTER }}>
                          More settings
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>HRA, Deductions &amp; More</div>

                      {/* Rental / Digital */}
                      <NumInput label="Rental Income (Gross Annual Rent)" value={safeInp.rentalIncome} onChange={v => set('rentalIncome', v)} hint="30% std deduction applied" />
                      <NumInput label="Digital Assets / Crypto Income" value={safeInp.digitalAssets} onChange={v => set('digitalAssets', v)} hint="Taxed flat 30%" />

                      {/* HRA */}
                      <div style={{ marginTop: 8, marginBottom: 4, borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
                        <button onClick={() => setShowHRA((v: boolean) => !v)} aria-expanded={showHRA} aria-controls="hra-panel"
                          style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 14px', fontFamily: INTER }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.08em', textTransform: 'uppercase' }}>HRA Exemption (Old Regime)</span>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: showHRA ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}><polyline points="6 9 12 15 18 9" /></svg>
                        </button>
                        {showHRA && (
                          <div id="hra-panel" role="region" aria-label="HRA Exemption inputs">
                            <NumInput label="Basic Salary (Annual)" value={safeInp.basic} onChange={v => set('basic', v)} hint="For HRA + EPF" />
                            <NumInput label="HRA Received (Annual)" value={safeInp.hraReceived} onChange={v => set('hraReceived', v)} />
                            <NumInput label="Rent Paid (Annual)" value={safeInp.rentPaid} onChange={v => set('rentPaid', v)} />
                            <div style={{ marginBottom: 16 }}>
                              <div style={{ fontSize: 13, color: C.ink2, fontWeight: 500, marginBottom: 8 }}>City Type</div>
                              <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                                {([true, false] as const).map((v, idx) => (
                                  <button key={String(v)} onClick={() => set('isMetro', v)}
                                    style={{ flex: 1, padding: '8px 0', border: 'none', borderRight: idx === 0 ? `1px solid ${C.border}` : 'none', background: safeInp.isMetro === v ? C.white : 'transparent', color: safeInp.isMetro === v ? C.ink : C.ink3, fontFamily: INTER, fontSize: 12, fontWeight: safeInp.isMetro === v ? 600 : 400, cursor: 'pointer' }}>
                                    {v ? 'Metro (50%)' : 'Non-Metro (40%)'}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', marginBottom: 4 }}>
                              <div style={{ fontSize: 11, color: C.ink3, marginBottom: 3 }}>Computed HRA Exemption</div>
                              <div style={{ fontSize: 16, fontWeight: 700, color: C.ink }}>{fmtC(computedHRA)}</div>
                              {safeInp.basic > 0 && computedHRA === 0 && safeInp.rentPaid > 0 && (
                                <div style={{ fontSize: 11, color: C.ink3, marginTop: 4 }}>Rent must exceed 10% of basic ({fmtC(safeInp.basic * 0.1)}/yr) to claim HRA.</div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Deductions */}
                      <div style={{ marginTop: 4, borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
                        <button onClick={() => setShowDeductions((v: boolean) => !v)} aria-expanded={showDeductions} aria-controls="deductions-panel"
                          style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 14px', fontFamily: INTER }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Deductions (Old Regime)</span>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: showDeductions ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}><polyline points="6 9 12 15 18 9" /></svg>
                        </button>
                        {showDeductions && (
                          <div id="deductions-panel" role="region" aria-label="Deductions inputs">
                            <NumInput label="NPS 80CCD(1B): Voluntary contribution" value={safeInp.sec80CCD1B} onChange={v => set('sec80CCD1B', Math.min(v, 50000))} hint="Old regime only, max ₹50K" />
                            <NumInput label="Home Loan Interest, self-occupied" value={safeInp.homeLoanSelf} onChange={v => set('homeLoanSelf', Math.min(v, 200000))} hint="Old regime, max ₹2L" />
                            <NumInput label="Education Loan Interest 80E" value={safeInp.sec80E} onChange={v => set('sec80E', v)} hint="Old regime, no limit" />
                            <NumInput label="Savings Interest 80TTA" value={safeInp.sec80TTA} onChange={v => set('sec80TTA', Math.min(v, 10000))} hint="Old regime, max ₹10K" />
                            <NumInput label="Donations 80G" value={safeInp.sec80G} onChange={v => set('sec80G', v)} />
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
                        <button onClick={() => setInputPage('basic')}
                          style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: C.ink2, background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, padding: 0 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
                          Back
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* RESULTS */}
                <div style={{ padding: mobile ? '18px' : '28px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  {/* Primary dark result box */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 8 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#50565C' }}>Total Tax ({selectedRegime === 'new' ? 'New' : 'Old'} Regime)</div>
                      <div style={{ fontSize: 12, color: '#7A8087' }}>{fmtPct(selRes.effectiveRate)} effective rate</div>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                      <div style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', lineHeight: 1 }}
                        aria-live="polite" aria-label={`Total tax: ${fmtCc(selRes.totalTax)}`}>
                        {fmtCc(selRes.totalTax)}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#101214', lineHeight: 1 }}>{fmtCc(selRes.monthlyTDS)}/mo TDS</div>
                    </div>
                  </div>

                  {savings > 0 && (
                    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 14px', textAlign: 'center', marginBottom: 8, width: '100%' }}>
                      <span style={{ fontSize: 12.5, color: C.ink2 }}>{newWins ? 'New' : 'Old'} Regime saves <strong style={{ color: C.ink }}>{fmtCc(savings)}</strong> vs the other</span>
                    </div>
                  )}

                  {/* Donut: order -1 on desktop floats above dark box */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    <TaxDonut totalTax={selRes.totalTax} grossIncome={selRes.grossIncome} fmt={fmtCc} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1, fontSize: 12, color: C.ink2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: selRes.totalTax === 0 ? C.lime2 : C.dark }} aria-hidden="true" />
                      <span>Tax: {fmtCc(selRes.totalTax)}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: '#e3e6e8' }} aria-hidden="true" />
                      <span>Net: {fmtCc(Math.max(0, selRes.grossIncome - selRes.totalTax))}</span>
                    </div>
                  </div>

                  {/* Regime selection */}
                  <div style={{ display: 'flex', gap: 8, width: '100%', marginTop: 14, marginBottom: 12 }}>
                    <RegimeCard res={newRes} winner={newWins} mobile={mobile} selected={selectedRegime === 'new'} onClick={() => setSelectedRegime('new')} fmt={fmtCc} />
                    <RegimeCard res={oldRes} winner={!newWins} mobile={mobile} selected={selectedRegime === 'old'} onClick={() => setSelectedRegime('old')} fmt={fmtCc} />
                  </div>

                  {/* Stat rows */}
                  {([
                    ['Gross Income',   fmtCc(selRes.grossIncome)],
                    ['Taxable Income', fmtCc(selRes.taxableIncome)],
                    ['Total Tax',      fmtCc(selRes.totalTax)],
                    ['Monthly TDS',    fmtCc(selRes.monthlyTDS)],
                  ] as [string, string][]).map(([label, val]) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: 13, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{val}</span>
                    </div>
                  ))}

                  {/* Monthly take-home */}
                  {safeInp.salary > 0 && (
                    <>
                      <div style={{ fontSize: 10.5, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '12px 0 4px', width: '100%' }}>Monthly Take-Home</div>
                      {([
                        ['Gross Monthly', fmtCc(safeInp.salary / 12), false],
                        ['Less: TDS',     `(${fmtCc(selRes.monthlyTDS)})`, false],
                        ...(safeInp.basic > 0 ? [['Less: EPF 12%', `(${fmtCc(safeInp.basic * 0.12 / 12)})`, false] as [string, string, boolean]] : []),
                        ['Less: Prof. Tax', '(₹200)', false],
                        ['In-hand / month', fmtCc(Math.max(0, monthlyInHand)), true],
                      ] as [string, string, boolean][]).map(([label, val, bold]) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: 13, color: bold ? C.ink2 : C.ink3 }}>{label}</span>
                          <span style={{ fontSize: bold ? 15 : 13, fontWeight: bold ? 700 : 500, color: bold ? C.ink : C.ink2 }}>{val}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>

              {/* Slab Visualizer */}
              <details open style={{ borderTop: `1px solid ${C.border}` }}>
                <summary style={{ padding: mobile ? '14px 18px' : '18px 32px', cursor: 'pointer', fontSize: 13, fontWeight: 700, color: C.ink, listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Live Slab Visualizer: {selectedRegime === 'new' ? 'New' : 'Old'} Regime</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </summary>
                <div style={{ padding: mobile ? '0 18px 18px' : '0 32px 24px' }}>
                  <SlabBar
                    taxableIncome={selRes.taxableIncome}
                    slabs={selectedRegime === 'new' ? (currentFy === '2024' ? NEW_SLABS_2425 : NEW_SLABS) : (OLD_SLABS[safeInp.age] ?? OLD_SLABS.below60)}
                    mobile={mobile}
                    fmt={fmtCc}
                    selectedRegime={selectedRegime as 'new' | 'old'}
                    setSelectedRegime={setSelectedRegime}
                  />
                </div>
              </details>

              {/* Detailed Breakdown */}
              <details style={{ borderTop: `1px solid ${C.border}` }}>
                <summary style={{ padding: mobile ? '14px 18px' : '18px 32px', cursor: 'pointer', fontSize: 13, fontWeight: 700, color: C.ink, listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Detailed Calculation: {selectedRegime === 'new' ? 'New' : 'Old'} Regime</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </summary>
                <div style={{ padding: mobile ? '0 18px 18px' : '0 32px 24px' }}>
                  <BreakdownTable res={selRes} mobile={mobile} fmt={fmtINc} />
                </div>
              </details>
            </div>

            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              {/* SECTION 1 */}
              <div style={sec}>
                <h2 id="what-is-income-tax" style={h2s}>What is Income Tax?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Income tax is a direct tax levied by the Government of India on an individual&apos;s total income earned during a financial year, governed by the Income Tax Act, 2025, which replaced the Income Tax Act, 1961. India uses a progressive slab system with two parallel regime options for FY 2026-27.
                  </p>
                </div>
                <p style={p}>The new tax regime is the default from FY 2023-24 onwards. Salaried taxpayers must actively opt out if they prefer the old regime. Each regime has distinct slab rates, standard deduction amounts, and deduction eligibility rules.</p>
                <p style={p}>Only income within each slab bracket is taxed at that bracket&apos;s rate. A taxable income of ₹15 lakh is not entirely taxed at 15%; the first ₹4 lakh faces nil tax, the next ₹4 lakh faces 5%, and so on progressively.</p>
              </div>

              {/* SECTION 2 */}
              <div style={sec}>
                <h2 id="how-income-tax-is-calculated" style={h2s}>How Income Tax is Calculated: Eight Steps</h2>
                <p style={p}>Computing income tax on salary for FY 2026-27 follows eight steps, identical for both regimes with different numbers at each step.</p>
                {[
                  { title: 'Calculate Gross Total Income', text: 'Add all income sources: salary, house property income, capital gains, business income, and other sources including FD interest and rental income.' },
                  { title: 'Subtract Exempt Allowances', text: 'Under the old regime, deduct exempt components like LTA and HRA (computed separately). Under the new regime, no exemptions apply.' },
                  { title: 'Subtract Standard Deduction', text: 'Deduct ₹75,000 (new regime) or ₹50,000 (old regime) if salaried or a pensioner. No documentation required.' },
                  { title: 'Apply Chapter VI-A Deductions (Old Regime Only)', text: 'Under old regime, subtract 80C (up to ₹1.5L), 80D, HRA exemption already deducted above, 80CCD(1B) NPS (₹50,000), home loan interest (₹2L), education loan interest 80E (no limit), and others.' },
                  { title: 'Arrive at Taxable Income', text: 'Taxable Income = Gross Total Income minus standard deduction minus all Chapter VI-A deductions. Apply slab rates to this figure.' },
                  { title: 'Apply Slab Tax Rates Progressively', text: 'Apply the rate for each bracket only to income within that bracket. Sum all brackets to arrive at total slab tax.' },
                  { title: 'Apply Section 87A Rebate', text: 'New regime: full rebate if slab tax does not exceed ₹60,000 (taxable income up to ₹12 lakh). Old regime: full rebate if slab tax does not exceed ₹12,500 (taxable income up to ₹5 lakh).' },
                  { title: 'Add Surcharge (if applicable) and 4% Cess', text: 'If taxable income exceeds ₹50 lakh, add surcharge on the base tax. Multiply (tax + surcharge) by 1.04 to include Health and Education Cess.' },
                ].map((step, i) => (
                  <p key={i} style={p}>
                    <strong style={{ color: C.ink }}>{step.title}:</strong> {step.text}
                  </p>
                ))}
              </div>

              {/* SECTION 3 */}
              <div style={sec}>
                <h2 id="new-regime-slabs" style={h2s}>New Tax Regime Slabs for FY 2026-27 (AY 2027-28)</h2>
                <p style={p}>The new tax regime for FY 2026-27 has seven slabs, unchanged from FY 2025-26: 0% up to ₹4 lakh, 5% on ₹4-8 lakh, 10% on ₹8-12 lakh, 15% on ₹12-16 lakh, 20% on ₹16-20 lakh, 25% on ₹20-24 lakh, and 30% above ₹24 lakh.</p>
                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', fontSize: 13 }}>
                    <caption style={{ fontFamily: INTER, fontSize: 12, color: C.ink3, textAlign: 'left', captionSide: 'top', paddingBottom: 6 }}>New Tax Regime: Income Tax Slabs for FY 2026-27 (AY 2027-28)</caption>
                    <thead>
                      <tr style={{ background: '#f4f5f6' }}>
                        <th scope="col" style={thS}>Taxable Income Slab</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Tax Rate</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Max Tax in Slab</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[['Up to ₹4 lakh','0%','Nil'],['₹4 lakh to ₹8 lakh','5%','₹20,000'],['₹8 lakh to ₹12 lakh','10%','₹40,000'],['₹12 lakh to ₹16 lakh','15%','₹60,000'],['₹16 lakh to ₹20 lakh','20%','₹80,000'],['₹20 lakh to ₹24 lakh','25%','₹1,00,000'],['Above ₹24 lakh','30%','Uncapped']].map(([range, rate, max], i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa', borderTop: `1px solid ${C.border}` }}>
                          <td style={tdL}>{range}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{rate}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{max}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, borderLeft: `3px solid ${C.lime2}`, paddingLeft: 14 }}>
                  <strong>Zero-tax limit:</strong> A salaried person with gross salary up to ₹12,75,000 pays zero tax under the new regime for FY 2026-27. After the ₹75,000 standard deduction, taxable income is ₹12 lakh. The slab tax of ₹60,000 is fully offset by the Section 87A rebate, resulting in zero net tax.
                </p>
                <p style={p}>Key features of the new regime: standard deduction of ₹75,000, Section 87A rebate up to ₹60,000 (for slab tax not exceeding ₹60,000), NPS employer contribution 80CCD(2) allowed (14% of basic salary), and maximum surcharge capped at 25%. No Chapter VI-A deductions like 80C, 80D, or HRA exemption are available.</p>
              </div>

              {/* SECTION 4 */}
              <div style={sec}>
                <h2 id="old-regime-slabs" style={h2s}>Old Tax Regime Slabs for FY 2026-27 (AY 2027-28)</h2>
                <p style={p}>The old tax regime for FY 2026-27 retains the three-slab structure unchanged from prior years, with slab boundaries that vary by age category.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', fontSize: 13 }}>
                    <caption style={{ fontFamily: INTER, fontSize: 12, color: C.ink3, textAlign: 'left', captionSide: 'top', paddingBottom: 6 }}>Old Tax Regime Slabs FY 2026-27 by Age Category</caption>
                    <thead>
                      <tr style={{ background: '#f4f5f6' }}>
                        <th scope="col" style={thS}>Income Slab</th>
                        <th scope="col" style={{ ...thS, textAlign: 'center' as const }}>Below 60</th>
                        <th scope="col" style={{ ...thS, textAlign: 'center' as const }}>Senior (60-80)</th>
                        <th scope="col" style={{ ...thS, textAlign: 'center' as const }}>Super Senior (80+)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[['Up to ₹2.5L','0%','-','-'],['Up to ₹3L','-','0%','-'],['Up to ₹5L','-','-','0%'],['₹2.5L to ₹5L','5%','5%','-'],['₹3L to ₹5L','-','5%','-'],['₹5L to ₹10L','20%','20%','20%'],['Above ₹10L','30%','30%','30%']].map(([s, b, sr, ss], i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa', borderTop: `1px solid ${C.border}` }}>
                          <td style={tdL}>{s}</td>
                          <td style={{ ...tdL, textAlign: 'center' as const, color: b === '-' ? C.border : C.ink2 }}>{b}</td>
                          <td style={{ ...tdL, textAlign: 'center' as const, color: sr === '-' ? C.border : C.ink2 }}>{sr}</td>
                          <td style={{ ...tdL, textAlign: 'center' as const, color: ss === '-' ? C.border : C.ink2 }}>{ss}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>Under the old regime, standard deduction is ₹50,000 and the Section 87A rebate limit is ₹12,500 (for taxable income up to ₹5 lakh). Senior and super senior citizens additionally benefit from higher basic exemption limits and are exempt from advance tax under Section 207 if they have no business income.</p>
              </div>

              {/* SECTION 5 */}
              <div style={sec}>
                <h2 id="87a-rebate" style={h2s}>Section 87A Rebate: How Zero Tax on ₹12.75 Lakh Works</h2>
                <p style={p}>Section 87A eliminates income tax entirely when computed slab tax does not exceed the rebate ceiling: ₹60,000 under the new regime (taxable income up to ₹12 lakh) or ₹12,500 under the old regime (taxable income up to ₹5 lakh).</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', fontSize: 13 }}>
                    <caption style={{ fontFamily: INTER, fontSize: 12, color: C.ink3, textAlign: 'left', captionSide: 'top', paddingBottom: 6 }}>Step-by-step: Zero Tax on ₹12.75 Lakh Gross Salary (New Regime, FY 2026-27)</caption>
                    <tbody>
                      {[['Gross Salary','₹12,75,000'],['Less: Standard Deduction (New Regime)','₹75,000'],['Taxable Income','₹12,00,000'],['Tax: ₹0 to ₹4L at 0%','₹0'],['Tax: ₹4L to ₹8L at 5%','₹20,000'],['Tax: ₹8L to ₹12L at 10%','₹40,000'],['Total Slab Tax Before Rebate','₹60,000'],['Less: Section 87A Rebate (slab tax does not exceed ₹60,000)','₹60,000'],['Tax After Rebate','₹0'],['Health and Education Cess at 4%','₹0'],['Final Tax Payable','₹0']].map(([label, val], i) => {
                        const bold = label === 'Final Tax Payable' || label === 'Taxable Income';
                        return (
                          <tr key={i} style={{ background: bold ? '#f4f5f6' : i % 2 === 0 ? C.white : '#fafafa', borderTop: `1px solid ${C.border}` }}>
                            <td style={{ ...tdL, fontWeight: bold ? 700 : 400, color: bold ? C.ink : C.ink2, borderLeft: bold ? `3px solid ${C.lime2}` : '3px solid transparent' }}>{label}</td>
                            <td style={{ ...tdR, textAlign: 'right' as const, fontWeight: bold ? 700 : 500 }}>{val}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p style={p}>The 87A rebate is all-or-nothing. A gross salary of ₹12,75,001 means taxable income becomes ₹12,00,001, which exceeds the ₹12 lakh threshold. The full ₹60,000 rebate is lost. However, marginal relief applies to ensure the additional tax payable does not exceed the additional income above the threshold.</p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '12px 16px', marginBottom: 16 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, color: C.ink2, margin: 0, lineHeight: 1.65 }}>
                    <strong>Section 87A under old regime:</strong> For old regime taxpayers, the rebate is ₹12,500 when taxable income does not exceed ₹5 lakh. A salaried person with gross salary of ₹5.5 lakh claiming ₹50,000 standard deduction gets taxable income of ₹5 lakh and pays zero tax.
                  </p>
                </div>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Old vs New Regime Calculator</p>
                    <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>See exactly which regime saves more with your specific deductions.</p>
                  </div>
                  <Link className="fx-btn" href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                </div>
              </div>

              {/* SECTION 6 */}
              <div style={sec}>
                <h2 id="new-vs-old-regime" style={h2s}>New Regime vs Old Regime: Income-Wise Tax Comparison</h2>
                <p style={p}>The table below shows actual tax at common salary levels. &quot;Old (no deductions)&quot; uses only the standard deduction. &quot;Old (max deductions)&quot; assumes 80C ₹1.5L + 80D ₹25K + NPS ₹50K + home loan interest ₹2L.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', fontSize: 13 }}>
                    <caption style={{ fontFamily: INTER, fontSize: 12, color: C.ink3, textAlign: 'left', captionSide: 'top', paddingBottom: 6 }}>Income Tax Comparison: New Regime vs Old Regime FY 2026-27 (Salaried, FY 2026-27)</caption>
                    <thead>
                      <tr style={{ background: '#f4f5f6' }}>
                        <th scope="col" style={thS}>Gross Salary</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>New Regime</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Old (no ded.)</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Old (max ded.)</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Saving (New)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[['₹8L','₹0 (Rebate)','₹75,400','₹0','₹75,400'],['₹10L','₹0 (Rebate)','₹1,17,000','₹0','₹1,17,000'],['₹12L','₹0 (Rebate)','₹1,79,400','₹0','₹1,79,400'],['₹12.75L','₹0 (Rebate)','₹2,03,750','₹0','₹2,03,750'],['₹15L','₹97,500','₹2,73,000','₹1,32,600','₹35,100'],['₹20L','₹2,08,000','₹4,29,000','₹2,21,000','Old wins*'],['₹25L','₹3,43,200','₹5,85,000','₹2,41,800','Old wins*']].map(([sal, nw, ow1, ow2, sav], i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa', borderTop: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600 }}>{sal}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const, fontWeight: 700 }}>{nw}</td>
                          <td style={{ ...tdL, textAlign: 'right' as const }}>{ow1}</td>
                          <td style={{ ...tdL, textAlign: 'right' as const }}>{ow2}</td>
                          <td style={{ ...tdL, textAlign: 'right' as const, fontWeight: 600, color: C.ink }}>{sav}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, fontSize: 12.5, color: C.ink3 }}>* At ₹20L and above, the old regime with maximum deductions can save more, but only when those investments are actually made and claimed. Use the <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Old vs New Regime Calculator</Link> to compare your precise deduction set.</p>
              </div>

              {/* SECTION 7 */}
              <div style={sec}>
                <h2 id="old-regime-deductions" style={h2s}>Deductions Available Under the Old Tax Regime</h2>
                <p style={p}>The old tax regime allows 12 categories of deductions under Chapter VI-A that reduce taxable income before slab rates apply. None of these are available under the new regime except Section 80CCD(2).</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', fontSize: 13 }}>
                    <caption style={{ fontFamily: INTER, fontSize: 12, color: C.ink3, textAlign: 'left', captionSide: 'top', paddingBottom: 6 }}>Chapter VI-A Deductions: Old Regime vs New Regime FY 2026-27</caption>
                    <thead>
                      <tr style={{ background: '#f4f5f6' }}>
                        <th scope="col" style={thS}>Deduction</th>
                        <th scope="col" style={{ ...thS, textAlign: 'center' as const }}>Limit</th>
                        <th scope="col" style={{ ...thS, textAlign: 'center' as const }}>Old</th>
                        <th scope="col" style={{ ...thS, textAlign: 'center' as const }}>New</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[['Standard Deduction','₹50K / ₹75K','₹50,000','₹75,000'],['Section 80C (PPF, ELSS, PF, LIC, ULIP)','₹1,50,000','Yes','No'],['Section 80D (Health insurance premiums)','₹25K to ₹1L','Yes','No'],['HRA Exemption (Section 10(13A))','Actual / formula','Yes','No'],['Home Loan Interest, self-occupied (Sec 24b)','₹2,00,000','Yes','No'],['NPS 80CCD(1B): Employee voluntary','₹50,000','Yes','No'],['NPS 80CCD(2): Employer contribution','14% of salary','Yes','Yes'],['Section 80E: Education Loan Interest','No cap, 8 years','Yes','No'],['Section 80TTA: Savings interest','₹10,000','Yes','No'],['Section 80G: Charitable donations','Varies','Yes','No'],['Home Loan Interest (let-out property)','Actual','Yes','Yes'],['Section 87A Rebate','₹12,500 or ₹60,000','Yes (≤₹5L taxable)','Yes (tax ≤₹60K)']].map(([ded, lim, old, nw], i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa', borderTop: `1px solid ${C.border}` }}>
                          <td style={tdL}>{ded}</td>
                          <td style={{ ...tdL, textAlign: 'center' as const, fontSize: 12 }}>{lim}</td>
                          <td style={{ ...tdL, textAlign: 'center' as const, fontWeight: 700, color: old === 'Yes' ? '#166534' : old === 'No' ? C.ink3 : C.dark }}>{old}</td>
                          <td style={{ ...tdL, textAlign: 'center' as const, fontWeight: 700, color: nw === 'Yes' ? '#166534' : nw === 'No' ? C.ink3 : C.dark }}>{nw}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>Section 80CCD(2) is the most valuable deduction available in both regimes. Employer contributions to NPS up to 14% of basic salary can be claimed without any absolute cap, making it a powerful tax-saving tool regardless of which regime you choose.</p>
              </div>

              {/* SECTION 8 */}
              <div style={sec}>
                <h2 id="hra-exemption" style={h2s}>HRA Exemption: Formula, Calculation, and Conditions</h2>
                <p style={p}>HRA exemption under Section 10(13A) reduces taxable salary for salaried employees who pay rent, available only under the old tax regime. The exempt amount is the minimum of three values computed as follows.</p>
                <div style={{ marginBottom: 16 }}>
                  {[
                    { label: 'Actual HRA received from employer', desc: 'The annual HRA component paid by your employer.' },
                    { label: '50% of basic salary (metro) or 40% (non-metro)', desc: 'Metro cities: Mumbai, Delhi, Kolkata, Chennai. All other cities are non-metro.' },
                    { label: 'Rent paid minus 10% of basic salary', desc: 'Annual rent paid to landlord, reduced by 10% of basic salary. Must be positive to claim any exemption.' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
                      <span style={{ flexShrink: 0, width: 7, height: 7, borderRadius: '50%', background: C.dark, display: 'block', marginTop: 8 }} />
                      <span style={{ fontFamily: INTER, fontSize: 14.5, color: C.ink, lineHeight: 1.7 }}><strong style={{ color: C.ink }}>{item.label}:</strong> {item.desc}</span>
                    </div>
                  ))}
                </div>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', fontSize: 13 }}>
                    <caption style={{ fontFamily: INTER, fontSize: 12, color: C.ink3, textAlign: 'left', captionSide: 'top', paddingBottom: 6 }}>HRA Exemption Example: Metro City (FY 2026-27)</caption>
                    <thead>
                      <tr style={{ background: '#f4f5f6' }}>
                        <th scope="col" style={thS}>Component</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Annual Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[['Basic Salary','₹6,00,000'],['HRA Received','₹2,40,000'],['Annual Rent Paid','₹1,80,000'],['Value 1: Actual HRA Received','₹2,40,000'],['Value 2: 50% of Basic (Metro)','₹3,00,000'],['Value 3: Rent Paid minus 10% of Basic','₹1,20,000'],['HRA Exemption (lowest of 3 values)','₹1,20,000']].map(([label, val], i) => {
                        const bold = label === 'HRA Exemption (lowest of 3 values)';
                        return (
                          <tr key={i} style={{ background: bold ? '#f4f5f6' : i % 2 === 0 ? C.white : '#fafafa', borderTop: `1px solid ${C.border}` }}>
                            <td style={{ ...tdL, fontWeight: bold ? 700 : 400, borderLeft: bold ? `3px solid ${C.lime2}` : '3px solid transparent' }}>{label}</td>
                            <td style={{ ...tdR, textAlign: 'right' as const, fontWeight: bold ? 700 : 500 }}>{val}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p style={p}>If rent paid minus 10% of basic salary is negative or zero, no HRA exemption is available regardless of how much HRA you receive. You must also have rent receipts and the landlord&apos;s PAN if annual rent exceeds ₹1 lakh. Use the <Link href="/calculators/hra-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>HRA Calculator</Link> to compute your exact exempt amount.</p>
              </div>

              {/* SECTION 9 */}
              <div style={sec}>
                <h2 id="income-tax-worked-examples" style={h2s}>Income Tax Worked Examples for FY 2026-27</h2>

                <h3 style={h3s}>Example 1: Ms. Divya, ₹15 Lakh Salary (New Regime)</h3>
                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', fontSize: 13 }}>
                    <caption style={{ fontFamily: INTER, fontSize: 12, color: C.ink3, textAlign: 'left', captionSide: 'top', paddingBottom: 6 }}>Tax Calculation: ₹15L Salary, New Regime, FY 2026-27</caption>
                    <tbody>
                      {[['Gross Salary','₹15,00,000'],['Less: Standard Deduction','₹75,000'],['Taxable Income','₹14,25,000'],['Tax: ₹0 to ₹4L at 0%','₹0'],['Tax: ₹4L to ₹8L at 5%','₹20,000'],['Tax: ₹8L to ₹12L at 10%','₹40,000'],['Tax: ₹12L to ₹14.25L at 15%','₹33,750'],['Total Slab Tax','₹93,750'],['Section 87A Rebate (taxable income exceeds ₹12L)','Nil'],['Health and Education Cess at 4%','₹3,750'],['Total Tax Payable','₹97,500'],['Monthly TDS','₹8,125']].map(([label, val], i) => {
                        const bold = label === 'Total Tax Payable' || label === 'Taxable Income';
                        return (
                          <tr key={i} style={{ background: bold ? '#f4f5f6' : i % 2 === 0 ? C.white : '#fafafa', borderTop: `1px solid ${C.border}` }}>
                            <td style={{ ...tdL, fontWeight: bold ? 700 : 400, borderLeft: bold ? `3px solid ${C.lime2}` : '3px solid transparent' }}>{label}</td>
                            <td style={{ ...tdR, textAlign: 'right' as const, fontWeight: bold ? 700 : 500 }}>{val}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <h3 style={h3s}>Example 2: Mr. Arjun, ₹25 Lakh Salary, Both Regimes with Deductions</h3>
                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', fontSize: 13 }}>
                    <caption style={{ fontFamily: INTER, fontSize: 12, color: C.ink3, textAlign: 'left', captionSide: 'top', paddingBottom: 6 }}>Tax Comparison: ₹25L Salary, Both Regimes FY 2026-27</caption>
                    <thead>
                      <tr style={{ background: '#f4f5f6' }}>
                        <th scope="col" style={thS}>Item</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>New Regime</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Old Regime</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[['Gross Salary','₹25,00,000','₹25,00,000'],['Standard Deduction','₹75,000','₹50,000'],['Section 80C','Not allowed','₹1,50,000'],['NPS 80CCD(1B)','Not allowed','₹50,000'],['Section 80D','Not allowed','₹25,000'],['Taxable Income','₹24,25,000','₹22,25,000'],['Tax on Slab','₹3,06,250','₹4,80,000'],['Health and Education Cess 4%','₹12,250','₹19,200'],['Total Tax Payable','₹3,18,500','₹4,99,200']].map(([item, nw, old], i) => {
                        const bold = item === 'Total Tax Payable' || item === 'Taxable Income';
                        return (
                          <tr key={i} style={{ background: bold ? '#f4f5f6' : i % 2 === 0 ? C.white : '#fafafa', borderTop: `1px solid ${C.border}` }}>
                            <td style={{ ...tdL, fontWeight: bold ? 700 : 400, borderLeft: bold ? `3px solid ${C.lime2}` : '3px solid transparent' }}>{item}</td>
                            <td style={{ ...tdR, textAlign: 'right' as const, fontWeight: bold ? 700 : 500 }}>{nw}</td>
                            <td style={{ ...tdL, textAlign: 'right' as const, fontWeight: bold ? 700 : 400 }}>{old}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p style={p}>Mr. Arjun saves ₹1,80,700 with the new regime even with ₹2.25 lakh in deductions. He would need approximately ₹8 lakh in total Chapter VI-A deductions for the old regime to match the new regime at ₹25 lakh income. At ₹30 lakh, the NPS Calculator shows that employer NPS 80CCD(2) of ₹4.2 lakh (14% of ₹30L) alone can shift the balance.</p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>NPS Calculator</p>
                    <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Compute your NPS corpus and 80CCD(2) employer deduction at retirement.</p>
                  </div>
                  <Link className="fx-btn" href="/calculators/nps-calculator" target="_blank" rel="noopener noreferrer" style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                </div>
              </div>

              {/* SECTION 10 */}
              <div style={sec}>
                <h2 id="monthly-take-home" style={h2s}>Monthly Take-Home After Tax: What You Actually Receive</h2>
                <p style={p}>Monthly in-hand salary is gross salary divided by 12, minus monthly TDS, minus EPF deduction, minus professional tax. The calculator shows this estimate in the results panel once you enter your salary and basic pay.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', fontSize: 13 }}>
                    <caption style={{ fontFamily: INTER, fontSize: 12, color: C.ink3, textAlign: 'left', captionSide: 'top', paddingBottom: 6 }}>Monthly Take-Home Estimate: ₹15L Salary, New Regime (FY 2026-27)</caption>
                    <tbody>
                      {[['Gross Monthly (₹15L / 12)','₹1,25,000'],['Less: Monthly TDS (₹97,500 / 12)','₹8,125'],['Less: Employee EPF (12% of basic, e.g. ₹50K basic)','₹5,000'],['Less: Professional Tax (approximate)','₹200'],['Monthly In-Hand','₹1,11,675']].map(([label, val], i) => {
                        const bold = label === 'Monthly In-Hand';
                        return (
                          <tr key={i} style={{ background: bold ? '#f4f5f6' : i % 2 === 0 ? C.white : '#fafafa', borderTop: `1px solid ${C.border}` }}>
                            <td style={{ ...tdL, fontWeight: bold ? 700 : 400, borderLeft: bold ? `3px solid ${C.lime2}` : '3px solid transparent' }}>{label}</td>
                            <td style={{ ...tdR, textAlign: 'right' as const, fontWeight: bold ? 700 : 500 }}>{val}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p style={p}>EPF is compulsory for employees earning up to ₹15,000 per month basic pay under the EPFO regulations. For higher earners, many employers continue EPF on the actual basic salary; enter your basic pay in the HRA section of this calculator to get the correct EPF deduction in the monthly take-home estimate. Use the <Link href="/calculators/in-hand-salary-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>In-Hand Salary Calculator</Link> for a detailed CTC-to-take-home breakdown.</p>
              </div>

              {/* SECTION 11 */}
              <div style={sec}>
                <h2 id="surcharge-cess" style={h2s}>Surcharge and Education Cess for FY 2026-27</h2>
                <p style={p}>Surcharge is an additional levy on income tax for high earners, calculated on base tax (after rebate, before cess). A 4% Health and Education Cess then applies on the combined tax plus surcharge.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', fontSize: 13 }}>
                    <caption style={{ fontFamily: INTER, fontSize: 12, color: C.ink3, textAlign: 'left', captionSide: 'top', paddingBottom: 6 }}>Surcharge Rates FY 2026-27: New Regime vs Old Regime</caption>
                    <thead>
                      <tr style={{ background: '#f4f5f6' }}>
                        <th scope="col" style={thS}>Total Income</th>
                        <th scope="col" style={{ ...thS, textAlign: 'center' as const }}>Old Regime Surcharge</th>
                        <th scope="col" style={{ ...thS, textAlign: 'center' as const }}>New Regime Surcharge</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[['Up to ₹50 lakh','Nil','Nil'],['₹50 lakh to ₹1 crore','10%','10%'],['₹1 crore to ₹2 crore','15%','15%'],['₹2 crore to ₹5 crore','25%','25%'],['Above ₹5 crore','37%','25% (capped)']].map(([lvl, old, nw], i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa', borderTop: `1px solid ${C.border}` }}>
                          <td style={tdL}>{lvl}</td>
                          <td style={{ ...tdL, textAlign: 'center' as const }}>{old}</td>
                          <td style={{ ...tdR, textAlign: 'center' as const }}>{nw}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>Above ₹5 crore, the old regime surcharge of 37% results in an effective tax rate up to 42.74% (30% tax + 37% surcharge + 4% cess on both). The new regime caps surcharge at 25%, making the maximum effective rate 39%. This is the primary driver of the new regime advantage for very high earners without significant deductions.</p>
              </div>

              {/* SECTION 12 */}
              <div style={sec}>
                <h2 id="budget-2025-changes" style={h2s}>Budget 2025 Key Changes to Income Tax</h2>
                <p style={p}>Union Budget 2025, presented on 1 February 2025, introduced five major changes to income tax effective from FY 2025-26, all of which carry forward to FY 2026-27 unchanged.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { title: 'Section 87A rebate raised to ₹60,000 (new regime)', text: 'Previously ₹25,000, the rebate now covers the full slab tax for taxable income up to ₹12 lakh, making gross salary up to ₹12.75 lakh completely tax-free for salaried individuals.' },
                    { title: 'New regime slabs revised', text: 'Zero-tax bracket extended to ₹4 lakh (from ₹3 lakh). A new 25% slab added for ₹20-24 lakh. The 30% slab now starts at ₹24 lakh (previously ₹15 lakh), substantially reducing tax for middle-income earners.' },
                    { title: 'Standard deduction raised to ₹75,000 (new regime)', text: 'Increased from ₹50,000 to ₹75,000 under the new regime. Combined with the revised slabs and higher 87A rebate, this is what makes ₹12.75 lakh salary tax-free.' },
                    { title: 'NPS employer contribution deduction at 14%', text: 'Section 80CCD(2) deduction for employer NPS contribution raised from 10% of salary to 14% under the new regime, providing additional tax saving for employees in NPS-linked organisations.' },
                    { title: 'TDS threshold on rent raised to ₹50,000 per month', text: 'Section 194-IB TDS on rent now triggers at ₹50,000 per month (previously ₹50,000 per year for individuals), reducing TDS compliance burden for most salaried tenants.' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <div style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '50%', background: C.lime2, color: C.dark, fontFamily: INTER, fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>{i + 1}</div>
                      <div>
                        <p style={{ fontFamily: INTER, fontSize: 14.5, fontWeight: 600, color: C.ink, margin: '0 0 3px', lineHeight: 1.3 }}>{item.title}</p>
                        <p style={{ fontFamily: INTER, fontSize: 14, color: C.ink2, margin: 0, lineHeight: 1.65 }}>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p style={{ ...p, marginTop: 16 }}>For detailed slab history comparing FY 2023-24, FY 2024-25, and FY 2025-26, see the <Link href="/blogs/income-tax-slabs-fy-2025-26" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Slabs FY 2025-26 analysis</Link> which includes the full slab evolution table and worked examples.</p>
              </div>

              {/* SECTION 13 */}
              <div style={{ margin: '0 0 40px' }}>
                <h2 id="income-by-salary-level" style={h2s}>Income Tax by Salary Level: Detailed Breakdowns</h2>
                <p style={p}>Each guide below has a slab-by-slab tax computation, old vs new regime comparison, Section 87A rebate analysis, and monthly in-hand salary breakup for that specific salary level.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8, marginTop: 14 }}>
                  {[{lakh:3,slug:'income-tax-on-3-lakh-salary',zero:true},{lakh:4,slug:'income-tax-on-4-lakh-salary',zero:true},{lakh:5,slug:'income-tax-on-5-lakh-salary',zero:true},{lakh:6,slug:'income-tax-on-6-lakh-salary',zero:true},{lakh:7,slug:'income-tax-on-7-lakh-salary',zero:true},{lakh:8,slug:'income-tax-on-8-lakh-salary',zero:true},{lakh:9,slug:'income-tax-on-9-lakh-salary',zero:true},{lakh:10,slug:'income-tax-on-10-lakh-salary',zero:true},{lakh:11,slug:'income-tax-on-11-lakh-salary',zero:true},{lakh:12,slug:'income-tax-on-12-lakh-salary',zero:true},{lakh:13,slug:'income-tax-on-13-lakh-salary',zero:false},{lakh:14,slug:'income-tax-on-14-lakh-salary',zero:false},{lakh:15,slug:'income-tax-on-15-lakh-salary',zero:false},{lakh:18,slug:'income-tax-on-18-lakh-salary',zero:false},{lakh:20,slug:'income-tax-on-20-lakh-salary',zero:false},{lakh:25,slug:'income-tax-on-25-lakh-salary',zero:false},{lakh:30,slug:'income-tax-on-30-lakh-salary',zero:false},{lakh:35,slug:'income-tax-on-35-lakh-salary',zero:false},{lakh:40,slug:'income-tax-on-40-lakh-salary',zero:false},{lakh:50,slug:'income-tax-on-50-lakh-salary',zero:false},{lakh:60,slug:'income-tax-on-60-lakh-salary',zero:false},{lakh:75,slug:'income-tax-on-75-lakh-salary',zero:false},{lakh:100,slug:'income-tax-on-100-lakh-salary',zero:false}].map(({ lakh, slug, zero }) => (
                    <a key={lakh} href={`/tax/${slug}`} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 13px', background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, textDecoration: 'none', gap: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>Rs {lakh}L</span>
                      {zero ? <span style={{ fontSize: 11, fontWeight: 700, color: '#166534', background: '#f4f5f6', borderRadius: 99, padding: '2px 7px' }}>Zero</span> : <span style={{ fontSize: 11, color: C.ink3 }}>View</span>}
                    </a>
                  ))}
                </div>
              </div>

              {/* SECTION 14 */}
              <div style={sec}>
                <h2 id="how-to-use-calculator" style={h2s}>How to Use This Income Tax Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter gross salary:</strong> Use the log-scale slider or click the value to type an exact amount. The slider covers ₹0 to ₹5 crore with ₹20 lakh at the centre position.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select financial year and age:</strong> Choose FY 2026-27, FY 2025-26, or FY 2024-25. Pick your age category to apply the correct old regime slab boundaries.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Add HRA details (old regime):</strong> Click &quot;HRA Exemption&quot; to expand the section and enter basic salary, HRA received, and annual rent paid. Select metro or non-metro city. The calculator applies the HRA formula automatically.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter deductions (old regime):</strong> Expand &quot;Deductions&quot; to enter 80C, 80D, NPS, home loan interest, education loan interest (80E), savings interest (80TTA), and donations (80G). The employer NPS 80CCD(2) field applies to both regimes.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Compare regimes:</strong> Both regime tax results appear side by side. Click either card to select it and see the detailed breakdown. The winning regime is marked automatically.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Check monthly take-home:</strong> The results panel shows monthly in-hand after TDS, EPF, and professional tax. Enter your basic salary in the HRA section for an accurate EPF deduction in the take-home estimate.
                  </li>
                </ol>
                <p style={p}>Your inputs are saved automatically in your browser. Refreshing the page restores your last calculation. No account or sign-up required.</p>
              </div>

              {/* SECTION 15 */}
              <div style={{ margin: '0 0 40px' }}>
                <h2 id="faq" style={h2s}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0, fontFamily: INTER }}>
                  <strong>Disclaimer:</strong> All calculations on this page are indicative only. Income tax rules are subject to change. This calculator is for educational and planning purposes only and does not constitute tax or financial advice. Verify your exact tax liability with a SEBI-registered investment adviser or a chartered accountant before filing your ITR. Results assume standard employment income and do not account for special assessment orders, retrospective amendments, or income from foreign sources.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.income-tax-sidebar::-webkit-scrollbar{width:5px}.income-tax-sidebar::-webkit-scrollbar-track{background:transparent}.income-tax-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.income-tax-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="income-tax-sidebar" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Quick Reference */}
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 20px' }}>
                <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dark, marginBottom: 14 }}>FY 2026-27 Quick Reference</div>
                {([
                  ['Standard Deduction (New)', '₹75,000'],
                  ['Standard Deduction (Old)', '₹50,000'],
                  ['87A Rebate Limit (New)', '₹12L taxable income'],
                  ['87A Rebate Limit (Old)', '₹5L taxable income'],
                  ['Max Rebate (New)', '₹60,000'],
                  ['Basic Exemption (New)', '₹4 lakh'],
                  ['Basic Exemption (Old)', '₹2.5 lakh'],
                  ['Cess on Tax', '4%'],
                  ['Surcharge Starts From', '₹50 lakh income'],
                  ['Max Surcharge (New)', '25%'],
                  ['Max Surcharge (Old)', '37%'],
                  ['Tax-Free Salary (New)', '₹12.75 lakh gross'],
                ] as [string, string][]).map(([label, val], i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, padding: '7px 0', borderBottom: `1px solid ${C.border}` }}>
                    <span style={{ fontFamily: INTER, fontSize: 12.5, color: C.ink2 }}>{label}</span>
                    <span style={{ fontFamily: INTER, fontSize: 12.5, fontWeight: 600, color: C.dark, textAlign: 'right' }}>{val}</span>
                  </div>
                ))}
              </div>

              {/* Related Tax Calculators */}
              <nav aria-label="Tax Calculators">
                <SidebarList title="Tax Calculators" items={TAX_CALCS} />
              </nav>

              {/* ITR Deadlines */}
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 18px' }}>
                <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dark, marginBottom: 14 }}>ITR Deadlines AY 2026-27</div>
                {([
                  ['July 31, 2026', 'Salaried individuals'],
                  ['October 31, 2026', 'Audit cases and companies'],
                  ['November 30, 2026', 'Transfer pricing cases'],
                  ['December 31, 2026', 'Belated ITR filing'],
                ] as [string, string][]).map(([date, label], i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, padding: '7px 0', borderBottom: i < 3 ? `1px solid ${C.border}` : 'none', alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: INTER, fontSize: 12.5, fontWeight: 700, color: C.dark, minWidth: 90, flexShrink: 0 }}>{date}</span>
                    <span style={{ fontFamily: INTER, fontSize: 12.5, color: C.ink2 }}>{label}</span>
                  </div>
                ))}
                <div style={{ marginTop: 12 }}>
                  <Link href="/blogs/itr-filing-last-date" target="_blank" rel="noopener noreferrer" style={{ fontFamily: INTER, fontSize: 12.5, color: C.dark, fontWeight: 600, textDecoration: 'none' }}>Full ITR deadline guide &#8250;</Link>
                </div>
              </div>

              {/* Related Articles */}
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 18px' }}>
                <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dark, marginBottom: 14 }}>Related Articles</div>
                {([
                  ['/blogs/income-tax-slabs-fy-2025-26', 'Income Tax Slabs FY 2025-26: New and Old Regime Rates, Senior Citizen Slabs'],
                  ['/blogs/itr-filing-last-date', 'ITR Filing Last Date FY 2025-26: Every Deadline You Need to Know'],
                ] as [string, string][]).map(([href, title], i) => (
                  <div key={i} style={{ paddingBottom: 12, marginBottom: 12, borderBottom: i === 0 ? `1px solid ${C.border}` : 'none' }}>
                    <Link href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: INTER, fontSize: 13, fontWeight: 500, color: C.dark, textDecoration: 'none', lineHeight: 1.5 }}>
                      {title}
                    </Link>
                  </div>
                ))}
              </div>

              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: '14px 18px' }}>
                <div style={{ fontSize: 11, color: C.ink3, marginBottom: 4, fontFamily: INTER }}>Last Updated</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.ink, fontFamily: INTER }}>June 2026, Budget 2025 changes</div>
                <div style={{ fontSize: 11, color: C.ink3, marginTop: 6, lineHeight: 1.6, fontFamily: INTER }}>Calculations follow the Income Tax Act, 2025. Results are indicative and not tax advice.</div>
              </div>

            </div>
          </aside>

        </div>
      </div>

      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/percentage-calculator|%','/calculators/gst-calculator|GST','/calculators/loan-calculator|Loan','/calculators/income-tax-calculator|Income Tax','/calculators/capital-gains-calculator|Capital Gains','/calculators/sip-calculator|SIP','/calculators/lumpsum-calculator|Lumpsum','/calculators/swp-calculator|SWP','/calculators/emi-calculator|EMI','/calculators/home-loan-calculator|Home Loan','/calculators/mortgage-calculator|Mortgage','/calculators/car-loan-calculator|Car Loan','/calculators/fd-calculator|FD','/calculators/ppf-calculator|PPF','/calculators/ssy-calculator|SSY','/calculators/nps-calculator|NPS','/calculators/compound-interest-calculator|Compound Int.','/calculators/gratuity-calculator|Gratuity'] },
        { hd: 'Topics', links: ['/calculators/sip-calculator|Mutual Funds','/calculators/home-loan-calculator|Home Loans','/calculators/fd-calculator|Fixed Deposits','/calculators/nps-calculator|Retirement'] },
        { hd: 'Company', links: ['/about|About','/privacy|Privacy Policy','/terms|Terms of Use','/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice. Verify with a CA for tax filing." />
    </div>
  );
}
